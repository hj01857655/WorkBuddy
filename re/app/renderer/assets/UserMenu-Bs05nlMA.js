import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, A7 as Input, AR as useClawControl, B3 as init_adapter_context, BE as MenuItem, BL as init_locale_host_persistence, B_ as CREDITS_INSUFFICIENT_DISMISS_EVENT, Bv as openPurchaseModal, C3 as useLocation, C4 as init_appearance_storage_namespace, Cq as init_telemetry_context, D1 as useI18n, DI as clientNotificationPreference, DJ as init_use_login_error_handler, E as init_contexts, E1 as init_useI18n, E7 as Card, EI as tipSoundPlayer, F1 as setLocaleAsync, FE as init_slot, Fi as FeedbackModal, Fv as refreshPlanStateWhenPageVisibleAgain, G2 as getWebsiteUrl, Gnt as BellIcon, H as init_auth_context, HE as MenuSigninSlot, HX as useCheckinFeature, I1 as t, IE as MenuGrowthSlot, Iv as init_purchase, J3 as useConversations, J7 as XCloseIcon, K2 as init_environment, K3 as init_conversations_context, KE as AvatarTopSlot, L1 as toStorageLocale, L3 as init_account_context, LF as init_setting, LQ as init_account, LT as emitProjectChange, Li as init_FeedbackModal, Mv as init_plan_upgrade, Nv as openCreditsPurchase, O1 as useTranslation, OI as init_client_notification, OJ as useLoginErrorHandler, OR as init_use_claw_control, P5 as Segmented, Pv as openPlanUpgrade, Qrt as init_common$2, R3 as useAccount, R5 as Switch, RH as CheckIcon$1, RO as init_keyboard_shortcuts, RQ as isIOAUser, RT as init_project_change_bus, S1 as useTheme, S7 as Loading, T0 as init_app_core, T7 as useFloatingLayer, TE as formatNumber, TI as init_tip_sound_player, Ttt as MoreMenuInspirationIcon, U as useAccountService, U_ as clearPendingCreditsInsufficientMessage, V3 as useAdapter, V5 as message, VE as init_MenuItem, VL as persistLocaleToHost, VO as formatShortcutCompact, V_ as CREDITS_INSUFFICIENT_SHOWN_EVENT, W as useAuth, W2 as getWebsiteOrigin, W_ as dismissCreditsInsufficientOnRecovered, X2 as isInternationalVersion, XG as init_use_floating_layer$1, YX as useEnterpriseConsoleFeature, Y_ as init_credits_insufficient_events, ZG as useFloatingLayer$1, _4 as APPEARANCE_MODE_KEY_PREFIX, _6 as ADDON_CREDITS_PER_PACK, _I as isPowerSaveBlockerEnabled, aE as openLoginExpiredDialog, aR as init_use_help_feedback_feature, aT as openInviteCreditsDialog, aV as init_UserIcon, ad as init_common$1, ait as pickActivePlanBase, bR as init_synced_preference, c3 as getWb, c7 as Modal, cD as init_deeplink, cR as useAppearanceFeatureStatus, dit as CommodityCode, dz as init_use_product_feature, e4 as isWorkBuddyDesktop, e7 as Notification, f0 as useOptionalModuleHost, f3 as wb, fT as subscribeConversationCreditBannerInteractions, fz as useProductFeature, gI as init_power_save_blocker, gz as useMemoryPersonalizationFeature, h7 as init_floating, hI as getPowerSaveBlockerModeForToggle, hl as useQrDataUrl, hz as init_use_memory_personalization_feature, iV as UserIcon, j1 as init_i18n, j6 as ProductFeature, jY as init_product_features, jrt as Avatar, jv as ADDON_PURCHASE_DIALOG_OPEN_EVENT, k1 as getLocale, krt as Button, l3 as init_wb_singleton, lB as useShellSidebar, lZ as useShowCreditsBalanceFeature, lz as useSettings, m5 as init_src, m6 as init_account$1, mD as setPendingDeepLinkUrl, mG as init_router, ml as init_use_qr_data_url, n1 as init_use_poll_scheduler, nT as init_credit_banner, oD as init_open_web_with_login, oE as subscribeAuthExpired, oR as useHelpFeedbackFeature, oit as suppressesLowerPlanBase, p7 as Popover, pC as init_workbuddy_topbar, pZ as useSubscriptionUsageEntryFeature, qT as init_utils, qX as useCreditsEntryFeature, q_ as emitCreditsInsufficientShow, r1 as usePollScheduler, rE as init_auth_expired_detector, sD as openWebWithLogin, sR as init_use_appearance_feature, tZ as useInternationalBillingFeature, u3 as isAppCoreReady, uC as SidebarExpandButton, uQ as init_utils$1, uT as getCreditBannerAccountKey, uZ as useShowUsageEntryFeature, vI as powerSaveBlockerPreference, vZ as useWechatMiniProgramIntegrationFeature, wE as formatDateTime, wq as useAgentTelemetry, x0 as writeRendererLogFileOnly, x6 as init_common, x7 as useFloating, xR as useSyncedPreference, z3 as AdapterContext, z4 as getCurrentBinding, zH as init_CheckIcon, zL as getLastPersistedLocale, zQ as shouldUseRealAvatar, zZ as init_http_logger, z_ as CREDITS_INSUFFICIENT_ACTION_EVENT } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Cp as flip, Cv as init_purify_es, Dp as offset, Ei as toast, Ev as require_react, Kh as require_react_dom, Op as shift, Tv as require_jsx_runtime, gs as useRole, jp as autoUpdate, kp as size, ls as useClick, ms as useInteractions, os as FloatingPortal, qh as require_classnames, t as init_src$1, us as useDismiss, wv as purify } from "./lib-chat-ui-D8Ji0f8n.js";
import { At as ExpandableText, Ct as getEditionConfig, Dt as normalizePopupDisplays, Et as isAppVisible, Mt as init_user_menu_avatar, Nt as user_menu_avatar_default, Ot as openMsgCenterActionUrl, Tt as init_msg_center_popup_utils, jt as init_expandable_text, kt as sendMsgCenterSystemNotification, wt as init_edition_config } from "./locale-utils-TanlkH9x.js";
import { n as init_split_action_button, t as SplitActionButton } from "./split-action-button-DcQLraVx.js";
import { s as triggerCheckForUpdates, t as init_update_toast } from "./update-toast-CQ2GsaP4.js";
//#region ../../packages/agent-ui/src/components/account/UserMenu.less
var init_UserMenu$1 = __esmMin((() => {}));
var init_wb_mobile_connect = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/mobile-connect-popup.less
var init_mobile_connect_popup = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/qrcode-workbuddy-app.png
var qrcode_workbuddy_app_default;
var init_qrcode_workbuddy_app = __esmMin((() => {
	qrcode_workbuddy_app_default = "" + new URL("qrcode-workbuddy-app-Cju32Aid.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/qrcode-workbuddy-ioa.jpg
var qrcode_workbuddy_ioa_default;
var init_qrcode_workbuddy_ioa = __esmMin((() => {
	qrcode_workbuddy_ioa_default = "" + new URL("qrcode-workbuddy-ioa-DWwd01T1.jpg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/qrcode-workbuddy-public.jpg
var qrcode_workbuddy_public_default;
var init_qrcode_workbuddy_public = __esmMin((() => {
	qrcode_workbuddy_public_default = "" + new URL("qrcode-workbuddy-public-Bg27mQy_.jpg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/MobileConnectPopup.tsx
function MobileConnectPopup({ isTencentUser, initialWechatMpStatus }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const appOnly = useProductFeature(ProductFeature.MobileConnectAppOnly, { mode: "enable" });
	const clawControl = useClawControl();
	const miniProgramBlocked = clawControl.channels.wechatmp === "disabled";
	const appBlocked = clawControl.channels.mobileApp === "disabled";
	const [wechatMpStatus, setWechatMpStatus] = (0, import_react$33.useState)(initialWechatMpStatus ?? "idle");
	const [powerSaveMode, setPowerSaveMode] = useSyncedPreference(powerSaveBlockerPreference);
	const [selectedTab, setSelectedTab] = (0, import_react$33.useState)("miniprogram");
	const options = (0, import_react$33.useMemo)(() => {
		return (appOnly ? [{
			value: "app",
			label: t("mobileConnect.tab.app")
		}] : [{
			value: "miniprogram",
			label: t("mobileConnect.tab.miniprogram")
		}, {
			value: "app",
			label: t("mobileConnect.tab.app")
		}]).filter((o) => o.value === "miniprogram" ? !miniProgramBlocked : !appBlocked);
	}, [
		appOnly,
		miniProgramBlocked,
		appBlocked,
		t
	]);
	(0, import_react$33.useEffect)(() => {
		if (options.length > 0 && !options.some((o) => o.value === selectedTab)) setSelectedTab(options[0].value);
	}, [options, selectedTab]);
	const activeTab = appOnly ? "app" : selectedTab;
	(0, import_react$33.useEffect)(() => {
		if (!adapter) return;
		const unsubEnabled = adapter.on("claw:wechatmp-enabled-result", (data) => {
			const { enabled } = data;
			setWechatMpStatus(enabled ? "registered" : "idle");
		});
		return () => {
			unsubEnabled?.();
		};
	}, [adapter]);
	if (!clawControl.loaded) return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
		className: "mobile-connect-popup",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "mobile-connect-popup__header",
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "mobile-connect-popup__title",
				children: t("mobileConnect.title")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "mobile-connect-popup__loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", { className: "mobile-connect-popup__loading-spinner" })
		})]
	});
	if (options.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
		className: "mobile-connect-popup",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "mobile-connect-popup__header",
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "mobile-connect-popup__title",
				children: t("mobileConnect.title")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "mobile-connect-popup__empty",
			children: t("mobileConnect.empty")
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
		className: "mobile-connect-popup",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				className: "mobile-connect-popup__header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
					className: "mobile-connect-popup__title",
					children: t("mobileConnect.title")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Segmented, {
				options,
				value: activeTab,
				onChange: setSelectedTab,
				fullWidth: true,
				className: "mobile-connect-popup__segmented"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				className: "mobile-connect-popup__qr-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
					className: "mobile-connect-popup__qr-wrapper",
					children: activeTab === "miniprogram" ? /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("img", {
						src: isTencentUser ? qrcode_workbuddy_ioa_default : qrcode_workbuddy_public_default,
						alt: "Mini Program QR",
						className: "mobile-connect-popup__qr-img"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("img", {
						src: qrcode_workbuddy_app_default,
						alt: "App QR",
						className: "mobile-connect-popup__qr-img"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
					className: "mobile-connect-popup__qr-desc",
					children: activeTab === "miniprogram" ? t("mobileConnect.qr.miniprogram.desc") : t("mobileConnect.qr.app.desc")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				className: "mobile-connect-popup__switches",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Switch, {
					className: "mobile-connect-popup__switch",
					checked: wechatMpStatus === "registered",
					label: t("mobileConnect.switch.allowConnect"),
					onChange: (e) => {
						const checked = e.target.checked;
						setWechatMpStatus(checked ? "registered" : "idle");
						adapter?.emit("claw:wechatmp-enabled", { enabled: checked });
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Switch, {
					className: "mobile-connect-popup__switch",
					checked: isPowerSaveBlockerEnabled(powerSaveMode),
					label: t("mobileConnect.switch.preventSleep"),
					onChange: (e) => {
						const nextMode = getPowerSaveBlockerModeForToggle(e.target.checked);
						setPowerSaveMode(nextMode);
					}
				})]
			})
		]
	});
}
var import_react$33, import_jsx_runtime$25;
var init_MobileConnectPopup = __esmMin((() => {
	init_mobile_connect_popup();
	init_common();
	init_src();
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	init_qrcode_workbuddy_app();
	init_qrcode_workbuddy_ioa();
	init_qrcode_workbuddy_public();
	init_contexts();
	init_use_claw_control();
	init_use_product_feature();
	init_useI18n();
	init_power_save_blocker();
	init_synced_preference();
	import_jsx_runtime$25 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center-panel.less
var init_msg_center_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/icons/bell-icon.tsx
var init_bell_icon = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/notifications-panel.less
var init_notifications_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/notifications-panel.tsx
/**
* 通知中心的主内容区弹层。
*
* 通过铃铛所在 Sidebar 的实时右边缘定位，避免将浮层盖在左侧导航上；Sidebar 尺寸
* 由 split-grid 控制，因此不能使用固定宽度。
*/
function NotificationsPanel({ anchorRef, children, closeAriaLabel, onClose, onListScroll, open, repositionSignal, title }) {
	const [sidebarRight, setSidebarRight] = (0, import_react$32.useState)(null);
	const closeButtonRef = (0, import_react$32.useRef)(null);
	const previouslyOpenRef = (0, import_react$32.useRef)(open);
	const zIndex = useFloatingLayer(open);
	const { collapsed: sidebarCollapsed, drawerOpen: sidebarDrawerOpen, isDesktopMac, isFullscreen } = useShellSidebar();
	const macTrafficLightOffset = isDesktopMac && sidebarCollapsed && !isFullscreen;
	const showExpandButton = sidebarCollapsed && !sidebarDrawerOpen;
	const updateSidebarRight = (0, import_react$32.useCallback)(() => {
		const sidebar = anchorRef.current?.closest(".conversation-sidebar") ?? document.querySelector(".conversation-sidebar");
		setSidebarRight(Math.max(0, sidebar?.getBoundingClientRect().right ?? 0));
	}, [anchorRef]);
	(0, import_react$32.useLayoutEffect)(() => {
		if (!open) {
			setSidebarRight(null);
			return;
		}
		updateSidebarRight();
		const sidebar = anchorRef.current?.closest(".conversation-sidebar") ?? document.querySelector(".conversation-sidebar");
		let observer = null;
		if (sidebar && typeof ResizeObserver !== "undefined") {
			observer = new ResizeObserver(updateSidebarRight);
			observer.observe(sidebar);
		}
		window.addEventListener("resize", updateSidebarRight);
		let rafId = 0;
		const trackStart = performance.now();
		const trackDrawerEdge = (now) => {
			updateSidebarRight();
			if (now - trackStart < 340) rafId = window.requestAnimationFrame(trackDrawerEdge);
		};
		rafId = window.requestAnimationFrame(trackDrawerEdge);
		return () => {
			observer?.disconnect();
			window.removeEventListener("resize", updateSidebarRight);
			window.cancelAnimationFrame(rafId);
		};
	}, [
		anchorRef,
		open,
		updateSidebarRight,
		repositionSignal,
		sidebarDrawerOpen
	]);
	(0, import_react$32.useEffect)(() => {
		if (previouslyOpenRef.current && !open) anchorRef.current?.focus();
		previouslyOpenRef.current = open;
	}, [anchorRef, open]);
	(0, import_react$32.useEffect)(() => {
		if (!open) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			window.clearTimeout(focusTimer);
		};
	}, [onClose, open]);
	if (!open || sidebarRight === null || typeof document === "undefined") return null;
	return (0, import_react_dom$2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("section", {
		className: "notifications-panel",
		style: {
			left: sidebarRight,
			zIndex
		},
		role: "dialog",
		"aria-modal": "false",
		"aria-label": title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
			className: `notifications-panel__header${macTrafficLightOffset ? " notifications-panel__header--mac-collapsed" : ""}`,
			children: [
				showExpandButton && /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
					className: "notifications-panel__expand",
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SidebarExpandButton, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("h2", {
					className: "notification-title",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
					ref: closeButtonRef,
					className: "notifications-panel__close",
					variant: "ghost",
					iconOnly: true,
					"aria-label": closeAriaLabel,
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(XCloseIcon, { size: 16 })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
			className: "notification-list",
			onScroll: onListScroll,
			children
		})]
	}), document.body);
}
var import_react$32, import_react_dom$2, import_jsx_runtime$24;
var init_notifications_panel = __esmMin((() => {
	init_notifications_panel$1();
	init_src();
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_workbuddy_topbar();
	import_jsx_runtime$24 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/message-card.tsx
/** 基于 msg_id 的稳定颜色 hash，保证同一条消息颜色不变 */
function stableAvatarColor(seed) {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i) | 0;
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
/** 获取头像文字：从 title 第一个空格前提取名字末字符 */
function getAvatarText(title) {
	const stripped = title.replace(/<[^>]*>/g, "");
	const match = stripped.match(/^(.{1,3})\s/);
	if (match) {
		const name = match[1];
		return name.charAt(name.length - 1);
	}
	return stripped.charAt(0) || "通";
}
/** 根据 biz_type 获取卡片类型 class */
function getCardTypeClass(msg) {
	const bt = msg.biz_type;
	if (bt.startsWith("teams.project_invite") || bt.startsWith("teams.member")) return "notification-card-request";
	if (bt.startsWith("agentmail.")) return "notification-card-mail";
	if (bt.startsWith("system.") || bt === "system") return "notification-card-system";
	if (bt.startsWith("teams.task")) return "notification-card-task";
	if (bt.startsWith("teams.mention") || bt.includes(".mention")) return "notification-card-mention";
	return "notification-card-default";
}
/** join_request.approved 旧消息（ext 无 project_id/project_name）应走默认可展开布局，不按 slot 右栏模式 */
function isLegacyJoinApproved(msg) {
	if (!msg.biz_type.startsWith("teams.") || !msg.biz_type.endsWith("join_request.approved")) return false;
	const ext = msg.ext || {};
	return !(ext.project_id || ext.projectId || ext.project_name || ext.projectName);
}
var import_react$31, import_react_dom$1, import_jsx_runtime$23, AVATAR_COLORS, MessageCard;
var init_message_card = __esmMin((() => {
	init_purify_es();
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_user_menu_avatar();
	init_use_floating_layer$1();
	init_useI18n();
	init_split_action_button();
	init_expandable_text();
	import_jsx_runtime$23 = require_jsx_runtime();
	AVATAR_COLORS = [
		"#5AC57A",
		"#607D8B",
		"#3498DB",
		"#8B5CF6",
		"#F59E0B"
	];
	MessageCard = ({ msg, onAction, onMarkRead, onDelete, onRefresh, onClose, onNavigate, slots, expanded, onExpand, onCollapse }) => {
		const t = useTranslation();
		const markRead = (0, import_react$31.useCallback)(() => onMarkRead(msg.msg_id), [onMarkRead, msg.msg_id]);
		const [ctxMenu, setCtxMenu] = (0, import_react$31.useState)(null);
		const [descOverflow, setDescOverflow] = (0, import_react$31.useState)(false);
		const ctxMenuRef = (0, import_react$31.useRef)(null);
		const ctxMenuZIndex = useFloatingLayer$1(ctxMenu !== null);
		const RenderCard = slots?.renderCard;
		const RenderBody = slots?.renderBody;
		const RenderActions = slots?.renderActions;
		(0, import_react$31.useEffect)(() => {
			if (!ctxMenu) return;
			const handleDown = (e) => {
				if (ctxMenuRef.current && !ctxMenuRef.current.contains(e.target)) setCtxMenu(null);
			};
			const handleKey = (e) => {
				if (e.key === "Escape") setCtxMenu(null);
			};
			document.addEventListener("mousedown", handleDown);
			document.addEventListener("keydown", handleKey);
			return () => {
				document.removeEventListener("mousedown", handleDown);
				document.removeEventListener("keydown", handleKey);
			};
		}, [ctxMenu]);
		const handleContextMenu = (0, import_react$31.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			setCtxMenu({
				x: e.clientX,
				y: e.clientY
			});
		}, []);
		if (RenderCard) return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(import_react$31.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(RenderCard, {
				message: msg,
				onMarkRead: markRead,
				onRefresh,
				onClose,
				onNavigate
			})
		});
		const hasSlot = !!RenderActions && !isLegacyJoinApproved(msg);
		const isTeamsCard = msg.biz_type.startsWith("teams.");
		const avatarText = getAvatarText(msg.title);
		const avatarColor = stableAvatarColor(msg.msg_id);
		const visibleActions = msg.actions.filter((action) => !(msg.is_read && action.key === "ack"));
		const hasDetailContent = !!(msg.content || msg.summary);
		const expandable = !hasSlot && hasDetailContent && descOverflow;
		/** 默认卡片点击：展开/收起 + 标已读 */
		const handleCardClick = (0, import_react$31.useCallback)(() => {
			if (hasSlot) {
				if (!msg.is_read) markRead();
				return;
			}
			if (!expandable) {
				if (!msg.is_read) markRead();
				return;
			}
			if (expanded) onCollapse?.();
			else {
				onExpand?.();
				if (!msg.is_read) markRead();
			}
		}, [
			hasSlot,
			expandable,
			expanded,
			onExpand,
			onCollapse,
			msg.is_read,
			markRead
		]);
		/** 摘要区「展开/收起」按钮：与整卡点击同一套展开协议；展开时顺带标已读（对齐整卡点击行为） */
		const handleDescExpandedChange = (0, import_react$31.useCallback)((next) => {
			if (next) {
				onExpand?.();
				if (!msg.is_read) markRead();
			} else onCollapse?.();
		}, [
			onExpand,
			onCollapse,
			msg.is_read,
			markRead
		]);
		const avatarNode = isTeamsCard ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
			className: "notification-avatar",
			style: {
				background: avatarColor,
				color: "#fff"
			},
			children: avatarText
		}) : /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("img", {
			className: "notification-avatar",
			src: user_menu_avatar_default,
			alt: ""
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("article", {
			className: [
				"notification-card",
				getCardTypeClass(msg),
				!msg.is_read ? " is-unread" : "",
				expandable ? " is-expandable" : "",
				!hasSlot && expanded ? " is-expanded" : ""
			].filter(Boolean).join(" "),
			onClick: handleCardClick,
			onContextMenu: handleContextMenu,
			children: [
				!msg.is_read && /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
					className: "notification-unread-dot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
					className: "notification-card-left",
					children: avatarNode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
					className: "notification-card-center",
					children: hasSlot ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(import_react$31.Suspense, {
						fallback: null,
						children: RenderBody && /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(RenderBody, {
							message: msg,
							onMarkRead: markRead,
							onRefresh,
							onClose,
							onNavigate
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [RenderBody ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(import_react$31.Suspense, {
						fallback: null,
						children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(RenderBody, {
							message: msg,
							onMarkRead: markRead,
							onClose,
							onNavigate
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("p", {
						className: "notification-line",
						dangerouslySetInnerHTML: { __html: purify.sanitize(msg.title) }
					}), hasDetailContent && /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ExpandableText, {
						text: msg.content || msg.summary || "",
						expanded,
						onOverflowChange: setDescOverflow,
						onExpandedChange: handleDescExpandedChange
					})] })
				}),
				hasSlot && RenderActions && /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
					className: "notification-card-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(import_react$31.Suspense, {
						fallback: null,
						children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(RenderActions, {
							message: msg,
							onMarkRead: markRead,
							onRefresh,
							onClose,
							onNavigate
						})
					})
				}),
				!hasSlot && visibleActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
					className: "notification-card-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(SplitActionButton, {
						primaryLabel: visibleActions[0].text,
						onPrimaryClick: () => onAction(msg, visibleActions[0]),
						secondaryItems: visibleActions.slice(1).map((action) => ({
							key: action.key,
							label: action.text,
							onClick: () => onAction(msg, action)
						})),
						includePrimaryInMenu: visibleActions.length > 1
					})
				})
			]
		}), ctxMenu && (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
			className: "notification-ctx-menu",
			ref: ctxMenuRef,
			style: {
				position: "fixed",
				top: ctxMenu.y,
				left: ctxMenu.x,
				zIndex: ctxMenuZIndex
			},
			onClick: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("button", {
				type: "button",
				className: "notification-ctx-menu-item",
				onClick: () => {
					setCtxMenu(null);
					onDelete(msg.msg_id);
				},
				children: t("msgCenter.delete")
			})
		}), document.body)] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/msg-center-list-result.ts
function parseNotificationListResult(result) {
	if (result == null) return { ok: false };
	return {
		ok: true,
		items: result.items ?? [],
		nextCursor: result.nextCursor ?? "",
		hasMore: result.nextCursor != null
	};
}
var init_msg_center_list_result = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/msg-center-popup.less
var init_msg_center_popup = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/msg-center-popup-host.tsx
/** 直接使用后台下发的 actions，不额外追加按钮 */
function buildActions(message) {
	return message.actions ?? [];
}
/** 渲染当前 app 内通知弹框；队列逻辑由上层 dispatcher hook 管理。 */
function MsgCenterPopupHost({ messages, onClose, onAction, onRead, onShown }) {
	const t = useTranslation();
	const rootRef = (0, import_react$30.useRef)(null);
	const shownIdsRef = (0, import_react$30.useRef)(/* @__PURE__ */ new Set());
	const handleExpandedChange = (0, import_react$30.useCallback)((message, expanded) => {
		if (expanded) onRead(message);
	}, [onRead]);
	(0, import_react$30.useEffect)(() => {
		if (messages.length === 0) return;
		const frame = window.requestAnimationFrame(() => {
			if (!rootRef.current?.isConnected) return;
			for (const message of messages) if (!shownIdsRef.current.has(message.msg_id)) {
				shownIdsRef.current.add(message.msg_id);
				onShown(message);
			}
		});
		return () => window.cancelAnimationFrame(frame);
	}, [messages, onShown]);
	if (messages.length === 0 || typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
		ref: rootRef,
		className: "msg-center-popup-host",
		children: messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Notification, {
			data: {
				msgId: message.msg_id,
				title: message.title,
				summary: message.summary,
				content: message.content,
				actions: buildActions(message)
			},
			expandText: t("msgCenter.viewDetail"),
			collapseText: t("msgCenter.collapse"),
			closeAriaLabel: t("common.close"),
			onClose: () => onClose(message),
			onActionClick: (action) => onAction(message, action),
			onExpandedChange: (expanded) => handleExpandedChange(message, expanded)
		}, message.msg_id))
	}), document.body);
}
var import_react$30, import_react_dom, import_jsx_runtime$22;
var init_msg_center_popup_host = __esmMin((() => {
	init_msg_center_popup();
	init_src();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	import_jsx_runtime$22 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/use-credits-insufficient-interactions.ts
function stripEmbedParam$1(url) {
	try {
		const parsed = new URL(url, window.location.origin);
		parsed.searchParams.delete("embed");
		return parsed.pathname + parsed.search + parsed.hash;
	} catch {
		return url.replace(/[?&]embed=1/, "");
	}
}
/** 统一承接 legacy 事件与 shared store interaction 的后端副作用。 */
function useCreditsInsufficientInteractions({ notifyShown, refreshSummary }) {
	const adapter = useAdapter();
	const isLocalMode = adapter?.environmentType === "local";
	const isInternationalBilling = useInternationalBillingFeature() || isInternationalVersion();
	const { reportEvent, Events } = useAgentTelemetry();
	(0, import_react$29.useEffect)(() => {
		const markReadAndRefresh = (msgId) => {
			notifyShown([{
				msg_id: msgId,
				display: "in_app"
			}]).catch(() => void 0);
			wb.notifications.markAsRead({ msg_ids: [msgId] }).catch(() => void 0);
			Promise.resolve(refreshSummary?.()).catch(() => void 0);
		};
		const executeAction = (action) => {
			if (action.key === "go_invite" || action.type === "invite") {
				openInviteCreditsDialog();
				return;
			}
			if (action.type === "callback" && action.url) {
				wb.notifications.executeCallbackAction(action.url);
				return;
			}
			if (action.type !== "url" && action.type !== "deeplink" || !action.url) return;
			if (action.key === "go_upgrade") {
				openPlanUpgrade({
					source: "credits_insufficient",
					adapter
				});
				return;
			}
			if (action.key === "go_purchase") {
				openCreditsPurchase({
					source: "credits_insufficient",
					adapter
				});
				return;
			}
			if (isInternationalBilling) {
				if (isLocalMode && adapter) openWebWithLogin(adapter, { target: action.url });
				else window.open(getWebsiteUrl(action.url), "_blank");
			} else if (isLocalMode) openPurchaseModal({
				url: action.url,
				source: "credits_insufficient"
			});
			else window.open(stripEmbedParam$1(action.url), "_blank");
		};
		const handleCreditsDismiss = (event) => {
			const { msgId } = event.detail;
			markReadAndRefresh(msgId);
		};
		const handleCreditsShown = (event) => {
			const { msgId } = event.detail;
			notifyShown([{
				msg_id: msgId,
				display: "in_app"
			}]).catch(() => void 0);
		};
		const handleCreditsAction = (event) => {
			executeAction(event.detail.action);
		};
		const handleConversationInteraction = (interaction) => {
			if (interaction.banner.source !== "messageCenter") return;
			const quotaMode = interaction.banner.bizType === "billing.credit_low_5" ? "5pct" : "0pct";
			const planType = interaction.banner.planType ?? "free";
			if (interaction.type === "shown") {
				reportEvent(Events.SubscribeQuotaTrigger, {
					ext1: "show",
					quotaMode,
					type: planType
				});
				notifyShown([{
					msg_id: interaction.banner.id,
					display: "in_app"
				}]).catch(() => void 0);
				return;
			}
			const actionName = interaction.type === "dismiss" ? "close" : interaction.action.key === "go_invite" ? "invite" : interaction.action.key === "go_purchase" ? "buy_credits" : interaction.action.key === "dismiss_forever" ? "dismiss" : "upgrade";
			reportEvent(Events.SubscribeQuotaTrigger, {
				ext1: "click",
				quotaMode,
				action: actionName,
				type: planType
			});
			clearPendingCreditsInsufficientMessage(interaction.banner.accountKey);
			if (interaction.type === "action") executeAction(interaction.action);
			markReadAndRefresh(interaction.banner.id);
		};
		window.addEventListener(CREDITS_INSUFFICIENT_DISMISS_EVENT, handleCreditsDismiss);
		window.addEventListener(CREDITS_INSUFFICIENT_SHOWN_EVENT, handleCreditsShown);
		window.addEventListener(CREDITS_INSUFFICIENT_ACTION_EVENT, handleCreditsAction);
		const unsubscribe = subscribeConversationCreditBannerInteractions(handleConversationInteraction);
		return () => {
			window.removeEventListener(CREDITS_INSUFFICIENT_DISMISS_EVENT, handleCreditsDismiss);
			window.removeEventListener(CREDITS_INSUFFICIENT_SHOWN_EVENT, handleCreditsShown);
			window.removeEventListener(CREDITS_INSUFFICIENT_ACTION_EVENT, handleCreditsAction);
			unsubscribe();
		};
	}, [
		Events,
		adapter,
		isInternationalBilling,
		isLocalMode,
		notifyShown,
		refreshSummary,
		reportEvent
	]);
}
var import_react$29;
var init_use_credits_insufficient_interactions = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_adapter_context();
	init_product_features();
	init_credit_banner();
	init_telemetry_context();
	init_environment();
	init_open_web_with_login();
	init_plan_upgrade();
	init_purchase();
	init_credits_insufficient_events();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/use-msg-center-popup-actions.ts
function stripEmbedParam(url) {
	try {
		const parsed = new URL(url, window.location.origin);
		parsed.searchParams.delete("embed");
		return parsed.pathname + parsed.search + parsed.hash;
	} catch {
		return url.replace(/[?&]embed=1/, "");
	}
}
function isExpireRemindMessage(message) {
	return message.biz_type === BIZ_VIP_EXPIRE_2D || message.biz_type === BIZ_VIP_EXPIRE_1D || message.biz_type === BIZ_VIP_EXPIRE_0D;
}
function getExpireRemindMode(bizType) {
	if (bizType === BIZ_VIP_EXPIRE_1D) return "1";
	if (bizType === BIZ_VIP_EXPIRE_0D) return "0";
	return "2";
}
function getPlanTypeFromMessage(message) {
	return message.ext?.plan_type || "free";
}
function useMsgCenterPopupActions({ notifyShown, closePopup, refreshSummary, shownIdsRef }) {
	const adapter = useAdapter();
	const isLocalMode = adapter?.environmentType === "local";
	const isInternationalBilling = useInternationalBillingFeature() || isInternationalVersion();
	const { reportEvent, Events } = useAgentTelemetry();
	const readIdsRef = (0, import_react$28.useRef)(/* @__PURE__ */ new Set());
	const markPopupRead = (0, import_react$28.useCallback)(async (message) => {
		if (message.is_read || readIdsRef.current.has(message.msg_id)) return;
		if (await wb.notifications.markAsRead({ msg_ids: [message.msg_id] }) != null) {
			readIdsRef.current.add(message.msg_id);
			Promise.resolve(refreshSummary?.()).catch(() => void 0);
		}
	}, [refreshSummary]);
	return {
		handlePopupShown: (0, import_react$28.useCallback)((message) => {
			if (shownIdsRef.current.has(message.msg_id)) return;
			shownIdsRef.current.add(message.msg_id);
			notifyShown([{
				msg_id: message.msg_id,
				display: "in_app"
			}]).catch(() => void 0);
			if (isExpireRemindMessage(message)) reportEvent(Events.SubscribeExpireRemind, {
				ext1: "show",
				expireMode: getExpireRemindMode(message.biz_type),
				type: getPlanTypeFromMessage(message)
			});
		}, [
			Events,
			notifyShown,
			reportEvent
		]),
		handlePopupRead: (0, import_react$28.useCallback)((message) => {
			markPopupRead(message).catch(() => void 0);
		}, [markPopupRead]),
		handlePopupAction: (0, import_react$28.useCallback)(async (message, action) => {
			if (action.key === VIEW_INTERNAL_ACTION_KEY && action.url) {
				if (!await openMsgCenterActionUrl(action.url, adapter)) return;
				await markPopupRead(message);
				closePopup(message.msg_id);
				return;
			}
			if ((action.key === VIEW_DETAIL_ACTION_KEY || action.key === VIEW_EXTERNAL_ACTION_KEY) && action.url) {
				await markPopupRead(message);
				await openMsgCenterActionUrl(action.url, adapter);
				return;
			}
			if (action.key === "go_purchase" && action.url) {
				if (isExpireRemindMessage(message)) reportEvent(Events.SubscribeExpireRemind, {
					ext1: "click",
					expireMode: getExpireRemindMode(message.biz_type),
					action: isInternationalBilling ? "resubscribe" : "renew",
					type: getPlanTypeFromMessage(message)
				});
				if (isInternationalBilling) {
					if (isLocalMode && adapter) openWebWithLogin(adapter, { target: action.url });
					else window.open(getWebsiteUrl(action.url), "_blank");
				} else if (isLocalMode) openPurchaseModal({
					url: action.url,
					source: "renewal_reminder"
				});
				else window.open(stripEmbedParam(action.url), "_blank");
				closePopup(message.msg_id);
				return;
			}
			if (isExpireRemindMessage(message)) reportEvent(Events.SubscribeExpireRemind, {
				ext1: "click",
				expireMode: getExpireRemindMode(message.biz_type),
				action: "close",
				type: getPlanTypeFromMessage(message)
			});
			await markPopupRead(message);
			closePopup(message.msg_id);
		}, [
			Events,
			adapter,
			closePopup,
			isInternationalBilling,
			isLocalMode,
			markPopupRead,
			reportEvent
		]),
		handlePopupClose: (0, import_react$28.useCallback)((message) => {
			if (isExpireRemindMessage(message)) reportEvent(Events.SubscribeExpireRemind, {
				ext1: "click",
				expireMode: getExpireRemindMode(message.biz_type),
				action: "close",
				type: getPlanTypeFromMessage(message)
			});
			closePopup(message.msg_id);
		}, [
			Events,
			closePopup,
			reportEvent
		])
	};
}
var import_react$28, VIEW_DETAIL_ACTION_KEY, VIEW_EXTERNAL_ACTION_KEY, VIEW_INTERNAL_ACTION_KEY, BIZ_VIP_EXPIRE_2D, BIZ_VIP_EXPIRE_1D, BIZ_VIP_EXPIRE_0D;
var init_use_msg_center_popup_actions = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_adapter_context();
	init_product_features();
	init_telemetry_context();
	init_environment();
	init_open_web_with_login();
	init_purchase();
	init_credits_insufficient_events();
	init_msg_center_popup_utils();
	VIEW_DETAIL_ACTION_KEY = "view_detail";
	VIEW_EXTERNAL_ACTION_KEY = "view_external";
	VIEW_INTERNAL_ACTION_KEY = "view_internal";
	BIZ_VIP_EXPIRE_2D = "billing.vip_expire_2d";
	BIZ_VIP_EXPIRE_1D = "billing.vip_expire_1d";
	BIZ_VIP_EXPIRE_0D = "billing.vip_expire_0d";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/use-msg-center-popup-dispatcher.tsx
/**
* 负责 msg-center 打断式通知分发：pending-displays → app 内队列 / 系统通知 → notify-shown。
* 不启动独立 summary 轮询；由 MsgCenterBell 将已有 summary 结果传入。
*/
function useMsgCenterPopupDispatcher({ refreshSummary }) {
	const { account } = useAccountService();
	const accountKey = getCreditBannerAccountKey(account);
	const [clientNotificationEnabled] = useSyncedPreference(clientNotificationPreference);
	const [popupState, setPopupState] = (0, import_react$27.useState)({
		visible: [],
		queued: []
	});
	const creditsInsufficientEmittedRef = (0, import_react$27.useRef)(false);
	const lastScanAtRef = (0, import_react$27.useRef)(0);
	const scanningRef = (0, import_react$27.useRef)(false);
	const sessionShownInAppIdsRef = (0, import_react$27.useRef)(/* @__PURE__ */ new Set());
	const ackedShownKeysRef = (0, import_react$27.useRef)(/* @__PURE__ */ new Set());
	const lastSystemFailureAtRef = (0, import_react$27.useRef)(0);
	const notifyShown = (0, import_react$27.useCallback)(async (items) => {
		if (items.length === 0) return;
		const deduped = items.filter((item) => !ackedShownKeysRef.current.has(`${item.msg_id}:${item.display}`));
		if (deduped.length === 0) return;
		if (await wb.notifications.notifyShown({ items: deduped })) deduped.forEach((item) => ackedShownKeysRef.current.add(`${item.msg_id}:${item.display}`));
	}, []);
	const enqueueInAppBatch = (0, import_react$27.useCallback)((messages) => {
		if (messages.length === 0) return;
		tipSoundPlayer.playCurrentPreference();
		setPopupState((prev) => {
			const visible = [...prev.visible];
			const queued = [...prev.queued];
			const existingIds = new Set([...visible, ...queued].map((message) => message.msg_id));
			const incoming = [...messages].filter((message) => !sessionShownInAppIdsRef.current.has(message.msg_id) && !existingIds.has(message.msg_id)).sort((a, b) => b.created_at - a.created_at);
			for (const message of incoming) {
				if (visible.length < MAX_VISIBLE_POPUPS) {
					visible.push(message);
					existingIds.add(message.msg_id);
					continue;
				}
				if (visible.length + queued.length >= POPUP_LIMIT) break;
				queued.push(message);
				existingIds.add(message.msg_id);
			}
			return {
				visible: visible.sort((a, b) => b.created_at - a.created_at),
				queued: queued.sort((a, b) => b.created_at - a.created_at)
			};
		});
	}, []);
	const canTrySystemNotification = (0, import_react$27.useCallback)(() => Date.now() - lastSystemFailureAtRef.current > SYSTEM_FAILURE_COOLDOWN_MS, []);
	const dispatchSystemNotification = (0, import_react$27.useCallback)(async (message, shownDisplaysAfterSystemNotification) => {
		if (!canTrySystemNotification()) return;
		if (!await sendMsgCenterSystemNotification(message)) {
			lastSystemFailureAtRef.current = Date.now();
			return;
		}
		await notifyShown(shownDisplaysAfterSystemNotification.map((display) => ({
			msg_id: message.msg_id,
			display
		})));
	}, [canTrySystemNotification, notifyShown]);
	const scanPendingDisplays = (0, import_react$27.useCallback)(async () => {
		if (scanningRef.current) return;
		scanningRef.current = true;
		lastScanAtRef.current = Date.now();
		try {
			const items = (await wb.notifications.pendingDisplays({
				display: ["in_app", "system"],
				limit: POPUP_LIMIT
			}))?.items ?? [];
			const foreground = isAppVisible();
			const inAppMessages = [];
			const systemNotifications = [];
			const silentAckItems = [];
			for (const message of items) {
				if (message.ext?.position === POSITION_CHAT_INPUT_TOP) {
					if (!creditsInsufficientEmittedRef.current) {
						creditsInsufficientEmittedRef.current = true;
						emitCreditsInsufficientShow(message, accountKey);
					}
					continue;
				}
				const displays = normalizePopupDisplays(message.notify_displays);
				const hasInApp = displays.includes("in_app");
				const hasSystem = displays.includes("system");
				if (hasInApp) {
					if (clientNotificationEnabled && foreground) inAppMessages.push(message);
					else if (clientNotificationEnabled && !foreground) {} else silentAckItems.push({
						msg_id: message.msg_id,
						display: "in_app"
					});
				}
				const shownDisplaysAfterSystemNotification = [];
				const fallbackInAppToSystem = clientNotificationEnabled && hasInApp && !foreground;
				if (hasSystem) shownDisplaysAfterSystemNotification.push("system");
				if (fallbackInAppToSystem) shownDisplaysAfterSystemNotification.push("in_app");
				if (shownDisplaysAfterSystemNotification.length > 0) systemNotifications.push({
					message,
					shownDisplays: shownDisplaysAfterSystemNotification
				});
			}
			enqueueInAppBatch(inAppMessages);
			for (const item of systemNotifications) await dispatchSystemNotification(item.message, item.shownDisplays);
			if (silentAckItems.length > 0) await notifyShown(silentAckItems);
		} catch (error) {
			console.warn("[MsgCenterPopup] scan pending displays failed:", error);
		} finally {
			scanningRef.current = false;
		}
	}, [
		accountKey,
		clientNotificationEnabled,
		dispatchSystemNotification,
		enqueueInAppBatch,
		notifyShown
	]);
	const handleSummary = (0, import_react$27.useCallback)((summary) => {
		if ((summary.pending_popup ?? 0) > 0 || Date.now() - lastScanAtRef.current > FALLBACK_SCAN_INTERVAL_MS) scanPendingDisplays().catch(() => void 0);
	}, [scanPendingDisplays]);
	(0, import_react$27.useEffect)(() => {
		if (!clientNotificationEnabled) setPopupState({
			visible: [],
			queued: []
		});
	}, [clientNotificationEnabled]);
	const { handlePopupAction, handlePopupClose, handlePopupRead, handlePopupShown } = useMsgCenterPopupActions({
		notifyShown,
		closePopup: (0, import_react$27.useCallback)((messageId) => {
			setPopupState((prev) => {
				const visible = prev.visible.filter((message) => message.msg_id !== messageId);
				const queued = [...prev.queued];
				while (visible.length < MAX_VISIBLE_POPUPS && queued.length > 0) {
					const next = queued.shift();
					if (next) visible.push(next);
				}
				return {
					visible: visible.sort((a, b) => b.created_at - a.created_at),
					queued
				};
			});
		}, []),
		refreshSummary,
		shownIdsRef: sessionShownInAppIdsRef
	});
	useCreditsInsufficientInteractions({
		notifyShown,
		refreshSummary
	});
	(0, import_react$27.useEffect)(() => {
		const handleCreditsDismiss = () => {
			creditsInsufficientEmittedRef.current = false;
		};
		window.addEventListener(CREDITS_INSUFFICIENT_DISMISS_EVENT, handleCreditsDismiss);
		return () => {
			window.removeEventListener(CREDITS_INSUFFICIENT_DISMISS_EVENT, handleCreditsDismiss);
		};
	}, []);
	const popupHost = (0, import_react$27.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(MsgCenterPopupHost, {
		messages: popupState.visible,
		onClose: handlePopupClose,
		onAction: handlePopupAction,
		onRead: handlePopupRead,
		onShown: handlePopupShown
	}), [
		handlePopupAction,
		handlePopupClose,
		handlePopupRead,
		handlePopupShown,
		popupState.visible
	]);
	return (0, import_react$27.useMemo)(() => ({
		handleSummary,
		popupHost
	}), [handleSummary, popupHost]);
}
var import_react$27, import_jsx_runtime$21, FALLBACK_SCAN_INTERVAL_MS, POPUP_LIMIT, MAX_VISIBLE_POPUPS, SYSTEM_FAILURE_COOLDOWN_MS, POSITION_CHAT_INPUT_TOP;
var init_use_msg_center_popup_dispatcher = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_auth_context();
	init_credit_banner();
	init_client_notification();
	init_synced_preference();
	init_tip_sound_player();
	init_credits_insufficient_events();
	init_msg_center_popup_host();
	init_msg_center_popup_utils();
	init_use_credits_insufficient_interactions();
	init_use_msg_center_popup_actions();
	import_jsx_runtime$21 = require_jsx_runtime();
	FALLBACK_SCAN_INTERVAL_MS = 18e4;
	POPUP_LIMIT = 5;
	MAX_VISIBLE_POPUPS = 3;
	SYSTEM_FAILURE_COOLDOWN_MS = 3e5;
	POSITION_CHAT_INPUT_TOP = "chat_input_top";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/msg-center-context.tsx
function isSupportedMessage(msg) {
	return !DEPRECATED_BIZ_TYPES.includes(msg.biz_type);
}
/**
* 从 biz_type 派生业务域（biz_type 第一段），后端协议里业务域不作为独立字段下发，与 msg_biz_type.domain 列语义一致
* （详见 services/cmd/msg-center/internal/service/types.go MessageItem 注释）。
*/
function getBizTypeDomain(bizType) {
	return bizType.split(".")[0];
}
/** 获取消息的日期分组标签（今天 HH:MM / 昨天 / YYYY-MM-DD） */
function getDateGroupLabel(ts, t) {
	const d = new Date(ts);
	const now = /* @__PURE__ */ new Date();
	const isToday = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	const isYesterday = d.getFullYear() === yesterday.getFullYear() && d.getMonth() === yesterday.getMonth() && d.getDate() === yesterday.getDate();
	if (isToday) {
		const hh = String(d.getHours()).padStart(2, "0");
		const mm = String(d.getMinutes()).padStart(2, "0");
		return `${t("msgCenter.timeToday")} ${hh}:${mm}`;
	}
	if (isYesterday) return t("msgCenter.timeYesterday");
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/** 获取消息的日期 key（用于分组判断） */
function getDateKey(ts) {
	const d = new Date(ts);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/**
* 消息中心状态与面板宿主的 Consumer hook。
* 必须在 MsgCenterProvider 内使用（bell 按钮等触发端）。
*/
function useMsgCenter() {
	const ctx = (0, import_react$26.useContext)(MsgCenterContext);
	if (!ctx) throw new Error("[useMsgCenter] Must be used within MsgCenterProvider.");
	return ctx;
}
function MsgCenterProvider({ children }) {
	const t = useTranslation();
	const host = useOptionalModuleHost();
	const navigation = host?.navigation;
	const location = useLocation();
	const { account } = useAccountService();
	const { sidebarCollapsed } = useConversations();
	const cardSlots = (0, import_react$26.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		const resolvedRegistry = host?.registry;
		if (!resolvedRegistry) return map;
		const contributions = resolvedRegistry.getContributions("messageCards");
		for (const { contribution } of contributions) if (!map.has(contribution.bizType)) {
			const slots = {};
			if (contribution.actionsSlot) slots.renderActions = contribution.actionsSlot;
			if (contribution.renderCard) slots.renderCard = contribution.renderCard;
			if (contribution.renderBody) slots.renderBody = contribution.renderBody;
			if (contribution.renderActions) slots.renderActions = contribution.renderActions;
			map.set(contribution.bizType, slots);
		}
		return map;
	}, [host]);
	const defaultCardSlots = (0, import_react$26.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		const resolvedRegistry = host?.registry;
		if (!resolvedRegistry) return map;
		const contributions = resolvedRegistry.getContributions("defaultMessageCards");
		for (const { contribution } of contributions) if (!map.has(contribution.domain)) {
			const slots = {};
			if (contribution.renderCard) slots.renderCard = contribution.renderCard;
			if (contribution.renderBody) slots.renderBody = contribution.renderBody;
			if (contribution.renderActions) slots.renderActions = contribution.renderActions;
			map.set(contribution.domain, slots);
		}
		return map;
	}, [host]);
	const [unreadCount, setUnreadCount] = (0, import_react$26.useState)(0);
	const [hasRedDot, setHasRedDot] = (0, import_react$26.useState)(false);
	const [messages, setMessages] = (0, import_react$26.useState)([]);
	const [loadingMore, setLoadingMore] = (0, import_react$26.useState)(false);
	const [panelOpen, setPanelOpen] = (0, import_react$26.useState)(false);
	const [loadingList, setLoadingList] = (0, import_react$26.useState)(false);
	/** 首屏 /list 失败（HTTP 5xx 或业务码非 0）。不能当成空收件箱（#106710）。 */
	const [listError, setListError] = (0, import_react$26.useState)(false);
	/** 当前展开的卡片 ID（同一时间只有一个展开） */
	const [expandedId, setExpandedId] = (0, import_react$26.useState)(null);
	const expandedIdRef = (0, import_react$26.useRef)(null);
	expandedIdRef.current = expandedId;
	/** bell 按钮锚点：UserMenu 挂载时注册、卸载时清空；面板定位与 focus 回退用 */
	const bellButtonRef = (0, import_react$26.useRef)(null);
	const pollIntervalRef = (0, import_react$26.useRef)(DEFAULT_POLL_INTERVAL_MS);
	const nextCursorRef = (0, import_react$26.useRef)("");
	const hasMoreRef = (0, import_react$26.useRef)(false);
	const loadingMoreRef = (0, import_react$26.useRef)(false);
	const refreshSummaryRef = (0, import_react$26.useRef)(void 0);
	/**
	* 上一次 summary 的未读总数（issue #60445）。
	* fetchSummary 是唯一不依赖消息中心面板是否打开就常驻运行的入口（Provider 挂载即启动的
	* 后台轮询，30s 一次 + 页面重新可见时立即拉一次）。相比把 emitProjectChange() 挂在
	* 某个具体通知卡片的 useEffect 里（那类卡片只有面板展开时才会 mount，
	* 与 issue 描述的"B 全程未打开消息中心"场景不符），这里在首次拉到非零未读或
	* 后续未读数增长时统一广播一次项目列表失效信号，不需要判断具体 biz_type，
	* 天然覆盖"面板未打开"的失败场景。
	*/
	const lastUnreadTotalRef = (0, import_react$26.useRef)(null);
	/**
	* 递增 generation：每次登出 / 账号切换时 bump，在途的 fetchSummary / loadList
	* resolve 时如果 generation 已变，说明是旧账号的迟到响应，直接丢弃，防止
	* setMessages / setUnreadCount 把清空后的状态覆盖回旧账号数据。
	*/
	const generationRef = (0, import_react$26.useRef)(0);
	const { handleSummary: handlePopupSummary, popupHost } = useMsgCenterPopupDispatcher({ refreshSummary: () => refreshSummaryRef.current?.() });
	const isLoggedIn = account != null;
	const fetchSummary = (0, import_react$26.useCallback)(async () => {
		if (!isLoggedIn) return false;
		const gen = generationRef.current;
		try {
			const result = await wb.notifications.summary();
			if (gen !== generationRef.current) return true;
			if (!result) return false;
			setUnreadCount(result.total);
			setHasRedDot(result.total > 0);
			if (result.poll_interval > 0) pollIntervalRef.current = result.poll_interval * 1e3;
			const prevTotal = lastUnreadTotalRef.current;
			if (prevTotal === null ? result.total > 0 : result.total > prevTotal) emitProjectChange();
			lastUnreadTotalRef.current = result.total;
			handlePopupSummary(result);
			return true;
		} catch {
			return false;
		}
	}, [handlePopupSummary, isLoggedIn]);
	(0, import_react$26.useEffect)(() => {
		refreshSummaryRef.current = async () => {
			await fetchSummary();
		};
	}, [fetchSummary]);
	usePollScheduler({
		enabled: isLoggedIn,
		getIntervalMs: () => pollIntervalRef.current,
		getMinIntervalMs: () => typeof document !== "undefined" && document.visibilityState !== "visible" ? Math.min(pollIntervalRef.current * HIDDEN_POLL_INTERVAL_MULTIPLIER, HIDDEN_POLL_INTERVAL_CAP_MS) : void 0,
		immediate: true,
		pauseWhenDocumentHidden: true,
		resetKey: account?.uid ?? "",
		run: fetchSummary
	});
	const resetMsgCenterState = (0, import_react$26.useCallback)(() => {
		generationRef.current++;
		setUnreadCount(0);
		setHasRedDot(false);
		setPanelOpen(false);
		setMessages([]);
		setExpandedId(null);
		setLoadingList(false);
		setLoadingMore(false);
		setListError(false);
		loadingMoreRef.current = false;
		lastUnreadTotalRef.current = null;
	}, []);
	(0, import_react$26.useEffect)(() => {
		if (!isLoggedIn) resetMsgCenterState();
	}, [isLoggedIn, resetMsgCenterState]);
	const accountUid = account?.uid;
	const prevUidRef = (0, import_react$26.useRef)(void 0);
	(0, import_react$26.useEffect)(() => {
		const prevUid = prevUidRef.current;
		prevUidRef.current = accountUid;
		if (prevUid && prevUid !== accountUid) resetMsgCenterState();
	}, [accountUid, resetMsgCenterState]);
	const loadList = (0, import_react$26.useCallback)(async (cursor = "") => {
		const gen = generationRef.current;
		if (cursor === "") {
			setListError(false);
			setLoadingList(true);
		} else setLoadingMore(true);
		loadingMoreRef.current = true;
		try {
			let raw;
			try {
				raw = await wb.notifications.list(cursor || void 0, LIST_LIMIT);
			} catch {
				raw = void 0;
			}
			if (gen !== generationRef.current) return false;
			const parsed = parseNotificationListResult(raw ?? null);
			if (!parsed.ok) {
				if (cursor === "") setListError(true);
				else message.error(t("msgCenter.loadFailed"));
				return false;
			}
			const items = parsed.items;
			if (cursor === "") setMessages(items);
			else setMessages((prev) => [...prev, ...items]);
			nextCursorRef.current = parsed.nextCursor;
			hasMoreRef.current = parsed.hasMore;
			return true;
		} finally {
			if (gen === generationRef.current) {
				setLoadingList(false);
				setLoadingMore(false);
				loadingMoreRef.current = false;
			}
		}
	}, [t]);
	const markAllRead = (0, import_react$26.useCallback)(async () => {
		try {
			if (await wb.notifications.markAsRead({ all: true }) != null) {
				setUnreadCount(0);
				setHasRedDot(false);
				setMessages((prev) => prev.map((m) => ({
					...m,
					is_read: true
				})));
			}
		} finally {
			fetchSummary();
		}
	}, [fetchSummary]);
	(0, import_react$26.useEffect)(() => {
		if (!panelOpen) return;
		markAllRead().finally(() => loadList());
	}, [
		panelOpen,
		markAllRead,
		loadList
	]);
	const handleTogglePanel = (0, import_react$26.useCallback)(() => {
		if (!panelOpen) setLoadingList(true);
		setPanelOpen((open) => !open);
	}, [panelOpen]);
	const handleClosePanel = (0, import_react$26.useCallback)(() => {
		setPanelOpen(false);
	}, []);
	(0, import_react$26.useEffect)(() => {
		setPanelOpen(false);
	}, [location.key]);
	const handleNavigate = (0, import_react$26.useCallback)((path) => {
		navigation?.navigate(path);
		handleClosePanel();
	}, [navigation, handleClosePanel]);
	const handleScroll = (0, import_react$26.useCallback)((e) => {
		if (loadingMoreRef.current || !hasMoreRef.current) return;
		const el = e.currentTarget;
		if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) {
			loadingMoreRef.current = true;
			loadList(nextCursorRef.current);
		}
	}, [loadList]);
	const handleMarkRead = (0, import_react$26.useCallback)(async (msgId) => {
		if (await wb.notifications.markAsRead({ msg_ids: [msgId] }) != null) {
			setMessages((prev) => prev.map((m) => m.msg_id === msgId ? {
				...m,
				is_read: true
			} : m));
			fetchSummary();
		}
	}, [fetchSummary]);
	const handleAction = (0, import_react$26.useCallback)(async (msg, action) => {
		if (!msg.is_read) await handleMarkRead(msg.msg_id);
		if (msg.biz_type === "growth.travel_arrival") {
			if (msg.ext?.claim_status === "unclaimed") {
				if (await wb.notifications.claimTravelReward()) message.success(t("msgCenter.creditClaimed", { credit: msg.ext.reward_credit ?? 0 }));
			}
			if (isWorkBuddyDesktop() && msg.ext?.card_id) {
				setPendingDeepLinkUrl("workbuddy://" + msg.ext.card_id);
				handleClosePanel();
				return;
			}
		}
		if (action.url) {
			if (action.url.startsWith("http")) {
				window.open(action.url, "_blank", "noopener,noreferrer");
				handleClosePanel();
				return;
			}
			if (action.url.startsWith("workbuddy://")) {
				if (await openMsgCenterActionUrl(action.url)) handleClosePanel();
				return;
			}
			if (action.url.startsWith("/")) {
				navigation?.navigate(action.url);
				handleClosePanel();
			}
		}
	}, [
		handleMarkRead,
		handleClosePanel,
		navigation,
		t
	]);
	const messagesRef = (0, import_react$26.useRef)(messages);
	messagesRef.current = messages;
	const handleDelete = (0, import_react$26.useCallback)(async (msgId) => {
		if (expandedIdRef.current === msgId) setExpandedId(null);
		const removedIndex = messagesRef.current.findIndex((m) => m.msg_id === msgId);
		const removed = removedIndex >= 0 ? messagesRef.current[removedIndex] : void 0;
		setMessages((prev) => prev.filter((m) => m.msg_id !== msgId));
		let ok = false;
		try {
			ok = await wb.notifications.delete(msgId) != null;
		} catch {
			ok = false;
		}
		if (!ok) {
			if (removed) setMessages((prev) => {
				if (prev.some((m) => m.msg_id === msgId)) return prev;
				const next = [...prev];
				const insertAt = Math.min(removedIndex, next.length);
				next.splice(insertAt, 0, {
					...removed,
					is_read: true
				});
				return next;
			});
			message.error(t("msgCenter.deleteFailed"));
			return;
		}
		if (removed && !removed.is_read) fetchSummary();
	}, [fetchSummary, t]);
	/** bell 锚点注册（callback ref） */
	const handleSetBellButton = (0, import_react$26.useCallback)((node) => {
		bellButtonRef.current = node;
	}, []);
	const contextValue = (0, import_react$26.useMemo)(() => ({
		panelOpen,
		unreadCount,
		hasRedDot,
		togglePanel: handleTogglePanel,
		closePanel: handleClosePanel,
		setBellButton: handleSetBellButton
	}), [
		panelOpen,
		unreadCount,
		hasRedDot,
		handleTogglePanel,
		handleClosePanel,
		handleSetBellButton
	]);
	const filteredMessages = messages.filter(isSupportedMessage);
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(MsgCenterContext.Provider, {
		value: contextValue,
		children: [
			children,
			popupHost,
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(NotificationsPanel, {
				anchorRef: bellButtonRef,
				closeAriaLabel: t("common.close"),
				onClose: handleClosePanel,
				onListScroll: handleScroll,
				open: panelOpen,
				repositionSignal: sidebarCollapsed,
				title: t("msgCenter.title"),
				children: [
					loadingList && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: "notification-loading",
						children: t("msgCenter.loading")
					}),
					!loadingList && listError && /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
						className: "notification-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", { children: t("msgCenter.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
							className: "notification-empty-retry",
							size: "small",
							variant: "link",
							onClick: () => {
								loadList();
							},
							children: t("common.retry")
						})]
					}),
					!loadingList && !listError && filteredMessages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: "notification-empty",
						children: t("msgCenter.empty")
					}),
					!loadingList && !listError && filteredMessages.map((msg, idx) => {
						const showDateGroup = getDateKey(msg.created_at) !== (idx > 0 ? getDateKey(filteredMessages[idx - 1].created_at) : null);
						return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_react$26.Fragment, { children: [showDateGroup && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
							className: "notification-time-group",
							children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
								className: "notification-time-label",
								children: getDateGroupLabel(msg.created_at, t)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(MessageCard, {
							msg,
							onAction: handleAction,
							onMarkRead: handleMarkRead,
							onDelete: handleDelete,
							onRefresh: loadList,
							onClose: handleClosePanel,
							onNavigate: handleNavigate,
							slots: cardSlots.get(msg.biz_type) ?? defaultCardSlots.get(getBizTypeDomain(msg.biz_type)),
							expanded: expandedId === msg.msg_id,
							onExpand: () => setExpandedId(msg.msg_id),
							onCollapse: () => setExpandedId(null)
						})] }, msg.msg_id);
					}),
					loadingMore && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: "notification-empty",
						children: t("msgCenter.loading")
					})
				]
			})
		]
	});
}
var import_react$26, import_jsx_runtime$20, DEPRECATED_BIZ_TYPES, MsgCenterContext, DEFAULT_POLL_INTERVAL_MS, LIST_LIMIT, HIDDEN_POLL_INTERVAL_MULTIPLIER, HIDDEN_POLL_INTERVAL_CAP_MS;
var init_msg_center_context = __esmMin((() => {
	init_msg_center_panel$1();
	init_src();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_auth_context();
	init_conversations_context();
	init_use_poll_scheduler();
	init_useI18n();
	init_common$1();
	init_deeplink();
	init_router();
	init_environment();
	init_project_change_bus();
	init_notifications_panel();
	init_message_card();
	init_msg_center_list_result();
	init_msg_center_popup_utils();
	init_use_msg_center_popup_dispatcher();
	import_jsx_runtime$20 = require_jsx_runtime();
	DEPRECATED_BIZ_TYPES = ["teams.invite"];
	MsgCenterContext = (0, import_react$26.createContext)(null);
	MsgCenterContext.displayName = "MsgCenterContext";
	DEFAULT_POLL_INTERVAL_MS = 3e4;
	LIST_LIMIT = 20;
	HIDDEN_POLL_INTERVAL_MULTIPLIER = 4;
	HIDDEN_POLL_INTERVAL_CAP_MS = 12e4;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center-panel.tsx
var import_react$25, import_jsx_runtime$19, MsgCenterBellInner, MsgCenterBell;
var init_msg_center_panel = __esmMin((() => {
	init_msg_center_panel$1();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_bell_icon();
	init_msg_center_context();
	import_jsx_runtime$19 = require_jsx_runtime();
	MsgCenterBellInner = ({ className }) => {
		const t = useTranslation();
		const { panelOpen, unreadCount, hasRedDot, togglePanel, setBellButton } = useMsgCenter();
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("button", {
			ref: setBellButton,
			type: "button",
			className: `msg-center-bell-btn${className ? ` ${className}` : ""}`,
			title: t("msgCenter.title"),
			"aria-label": t("msgCenter.title"),
			"aria-expanded": panelOpen,
			onClick: togglePanel,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(BellIcon, {
				width: 16,
				height: 16
			}), unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
				className: "msg-center-badge",
				children: unreadCount > 99 ? "99+" : unreadCount
			}) : hasRedDot ? /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", { className: "msg-center-dot" }) : null]
		});
	};
	MsgCenterBell = import_react$25.memo(MsgCenterBellInner);
	MsgCenterBell.displayName = "MsgCenterBell";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/SubscriptionUsagePanel.less
var init_SubscriptionUsagePanel = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/addon-purchase-model.ts
/**
* 有效期截止日期：下单时刻 + ADDON_VALIDITY_DAYS。
* 后端未下发该字段，按前端约定算，格式对齐本页设计稿的 `2026/07/30`。
*
* 用 setDate 走日历加法而非 `+ n * 86400000`：后者在夏令时切换的时区会差 1 小时，
* 当前时刻靠近午夜时日期会偏一天。
*/
function formatAddonExpiryDate(now = Date.now()) {
	const date = new Date(now);
	date.setDate(date.getDate() + 30);
	const pad = (value) => String(value).padStart(2, "0");
	return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
}
/** 把数量夹紧到 [1, ADDON_MAX_QUANTITY] */
function clampAddonQuantity(quantity) {
	if (!Number.isFinite(quantity)) return 1;
	return Math.max(1, Math.min(99, Math.floor(quantity)));
}
/**
* 手工输入的数量文本清洗。
*
* 输入中途允许空串（用户全选删除后再输），所以返回文本而不是数字；
* 非数字字符与前导零直接丢弃，长度按上限位数截断，避免 "1e5" / "007" 这类值进到下单参数。
*/
function sanitizeAddonQuantityInput(raw) {
	const digits = raw.replace(/\D/g, "").replace(/^0+/, "").slice(0, String(99).length);
	if (!digits) return "";
	return String(clampAddonQuantity(Number(digits)));
}
/**
* 金额展示：整数不带小数，有小数保留两位。
* 后端返回的是分，换算后可能出现 179 / 179.5 两种形态。
*/
function formatAddonAmount(yuan) {
	if (!Number.isFinite(yuan)) return "--";
	return Number.isInteger(yuan) ? String(yuan) : yuan.toFixed(2);
}
/**
* 构造支付中转页 URL。中转页消费 orderIds 唤起微信支付，用户扫码在手机上完成。
*
* 桌面端没有官网 cookie，origin 必须由发行版推导而非取 window.location。
*/
function buildAddonPayBridgeUrl(input) {
	const params = new URLSearchParams({
		action: "pay",
		payParams: JSON.stringify({
			OrderIds: input.orderIds,
			VoucherIds: [],
			ContractOrder: 0,
			PayOption: "earmarkPay",
			PayScene: "wechat_pay",
			Platform: "pc"
		}),
		openId: input.ownerUin,
		uid: input.authCode || "",
		purchaseType: "extra",
		autoRenew: "0",
		planTier: "addon",
		ideType: "pro",
		payPlatform: isWorkBuddy() ? "workbuddy" : "codebuddy"
	});
	return `${getWebsiteOrigin()}/profile/pay?${params.toString()}`;
}
var ADDON_QRCODE_TTL_MS, ADDON_POLL_INTERVAL_MS, ADDON_SETTLE_POLL_INTERVAL_MS;
var init_addon_purchase_model = __esmMin((() => {
	init_environment();
	ADDON_QRCODE_TTL_MS = 12e4;
	ADDON_POLL_INTERVAL_MS = 3e3;
	ADDON_SETTLE_POLL_INTERVAL_MS = 5e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/subscription-usage-model.ts
/**
* 判定资源包所属分组。
* `freeMon` / `gift` 的归属随发行版摆动：国内版 freeMon 算版本基础用量，国际版 freeMon 与 gift 都算权益赠送包。
*/
function resolveCreditGroup(packageCode, isIntl) {
	if (!packageCode) return null;
	if (PLAN_BASE_CODES.includes(packageCode)) return "planBase";
	if (!isIntl && packageCode === CommodityCode.freeMon) return "planBase";
	if (PLAN_BONUS_CODES.includes(packageCode)) return "planBonus";
	if (ADDON_CODES.includes(packageCode)) return "addon";
	if (BENEFIT_CODES.includes(packageCode)) return "benefit";
	if (isIntl && (packageCode === CommodityCode.freeMon || packageCode === CommodityCode.gift)) return "benefit";
	return null;
}
/**
* 分组包含的 packageCode 全集，与 resolveCreditGroup 互为反向。
*
* 供「已失效」明细按分组做服务端精确过滤：不带 PackageCodes 时服务端分页返回的是全分组混合，
* 前端再按分组过滤会出现整页被滤空、被滚动加载误判成「没有更多」。
*/
function resolveCreditGroupPackageCodes(kind, isIntl) {
	switch (kind) {
		case "planBase": return isIntl ? PLAN_BASE_CODES : [...PLAN_BASE_CODES, CommodityCode.freeMon];
		case "planBonus": return PLAN_BONUS_CODES;
		case "addon": return ADDON_CODES;
		case "benefit": return isIntl ? [
			...BENEFIT_CODES,
			CommodityCode.freeMon,
			CommodityCode.gift
		] : BENEFIT_CODES;
	}
}
/** 是否为体验版套餐基础包 */
function isTrialPlanBaseCode(packageCode) {
	return !!packageCode && TRIAL_PLAN_BASE_CODES.includes(packageCode);
}
/** 取两个可选时间戳中较早的一个 */
function earlier(current, next) {
	if (!isPositiveFinite(next)) return current;
	if (!isPositiveFinite(current)) return next;
	return Math.min(current, next);
}
function isPositiveFinite(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}
/** 负数 / 非法数值一律按 0，避免污染累加与百分比 */
function toSafeCount(value) {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return 0;
	return value;
}
/**
* 额度是否已耗尽（等价于后端 Status=3，`PlanResource` 映射时丢了 Status 只能按余量判）。
*
* `total <= 0` 是拿不到容量的异常数据，不当成已用完，避免正常包被误判。
*/
function isCreditResourceExhausted(resource) {
	return toSafeCount(resource.total) > 0 && toSafeCount(resource.left) <= 0;
}
/**
* 是否已过有效期。每日刷新的包（isDaily）的 expireAt 只是当日周期末，不是有效期，恒不算过期。
*/
function isCreditResourceExpired(resource, now) {
	if (resource.isDaily) return false;
	return isPositiveFinite(resource.expireAt) && resource.expireAt <= now;
}
/**
* 按分组聚合资源包。未识别 packageCode 的资源整体丢弃（不并入任何分组，避免污染既有档位数字）；
* 返回结果按 CREDIT_GROUP_ORDER 排序，且只保留有资源的分组。
*
* `planBase` 的口径随发行版摆动（见 suppressesLowerPlanBase）：国内版同档互斥，只取最高档那一条
* （见 pickActivePlanBase），provider 侧已在源头剔除被压制的低档包以保证总积分口径一致，这里再选
* 一次是幂等兜底，防止未净化的 resources 直连；国际版多笔并存，与其余分组一样照常累加。
*/
function buildCreditGroups(resources, isIntl, now = Date.now()) {
	const buckets = /* @__PURE__ */ new Map();
	const planBaseSuppressed = suppressesLowerPlanBase(isIntl);
	for (const resource of resources ?? []) {
		const kind = resolveCreditGroup(resource?.packageCode, isIntl);
		if (!kind) continue;
		if (kind === "planBase" && planBaseSuppressed) continue;
		if (kind !== "planBase" && isCreditResourceExpired(resource, now)) continue;
		const bucket = buckets.get(kind) ?? {
			kind,
			total: 0,
			used: 0,
			left: 0
		};
		if (kind === "planBase") bucket.isTrialPlanBase = (bucket.isTrialPlanBase ?? true) && isTrialPlanBaseCode(resource.packageCode);
		bucket.total += toSafeCount(resource.total);
		bucket.used += toSafeCount(resource.used);
		bucket.left += toSafeCount(resource.left);
		if (!resource.isDaily) {
			bucket.nearestExpireAt = earlier(bucket.nearestExpireAt, resource.expireAt);
			if (!isCreditResourceExhausted(resource)) bucket.nearestUsableExpireAt = earlier(bucket.nearestUsableExpireAt, resource.expireAt);
		}
		bucket.refreshAt = earlier(bucket.refreshAt, resource.refreshAt);
		buckets.set(kind, bucket);
	}
	const activePlanBase = pickActivePlanBase(resources, isIntl);
	if (activePlanBase) {
		const planBaseExpireAt = activePlanBase.isDaily || !isPositiveFinite(activePlanBase.expireAt) ? void 0 : activePlanBase.expireAt;
		buckets.set("planBase", {
			kind: "planBase",
			total: toSafeCount(activePlanBase.total),
			used: toSafeCount(activePlanBase.used),
			left: toSafeCount(activePlanBase.left),
			nearestExpireAt: planBaseExpireAt,
			nearestUsableExpireAt: isCreditResourceExhausted(activePlanBase) ? void 0 : planBaseExpireAt,
			refreshAt: isPositiveFinite(activePlanBase.refreshAt) ? activePlanBase.refreshAt : void 0,
			isTrialPlanBase: isTrialPlanBaseCode(activePlanBase.packageCode)
		});
	}
	return CREDIT_GROUP_ORDER.map((kind) => buckets.get(kind)).filter((item) => !!item);
}
/** 剩余百分比（向下取整到整数，0-100）；total 为 0 时按 0 处理，避免除零 */
function calcRemainPercent(total, left) {
	if (!Number.isFinite(total) || total <= 0) return 0;
	const safeLeft = toSafeCount(left);
	return Math.max(0, Math.min(100, Math.floor(safeLeft / total * 100)));
}
/** 已使用百分比。设计稿进度条填充的是「已使用」占比，不是剩余占比。 */
function calcUsedPercent(total, used) {
	if (!Number.isFinite(total) || total <= 0) return 0;
	const safeUsed = toSafeCount(used);
	return Math.max(0, Math.min(100, Math.round(safeUsed / total * 100)));
}
/**
* 到期预警档位。已过期、无到期时间、超出 3 天窗口都返回 null（不展示标签）。
* 阈值与文案后续可能随需求文档调整，改这里的常量即可。
*/
function resolveExpiryLevel(expireAt, now) {
	if (!isPositiveFinite(expireAt)) return null;
	const remain = expireAt - now;
	if (remain <= 0) return null;
	if (remain <= 864e5) return "critical";
	if (remain <= 2592e5) return "warning";
	return null;
}
/**
* 分组行「时间文案」的基准。加量包 / 权益赠送包看最近到期，套餐类分组看下次刷新。
*
* 与预警基准（见 resolveGroupExpiryLevel）刻意分开：文案要如实反映组内最近到期时间，
* 即使那个包已经用完；预警只关心还有余量的包。
*/
function resolveGroupTimeBasis(group) {
	return GROUPS_SHOW_EXPIRE.includes(group.kind) ? group.nearestExpireAt : group.refreshAt;
}
/**
* 分组行的到期预警档位。套餐类分组的积分刷新即清零，临近刷新就等于组内积分即将到期，
* 故基准取 refreshAt；加量包 / 权益包取组内**还有余量**的包的最近到期时间。
*
* 两种「已用完不预警」：整组余量为 0（覆盖走 refreshAt 的套餐类分组）、临期包已用完
* （`nearestUsableExpireAt` 会跳过它）。余量为 0 时催「3 天内过期」没有意义。
*
* 组内多个包时基准已在聚合阶段取到最早，因此 24 小时档自然优先于 3 天档。
* 体验版的套餐基础积分是例外：每期自动重置、用户也无从续期，刷新临近不构成「即将到期」提醒。
* 判据取包的 packageCode 而非 account.editionType —— 后者异步 enrich，未就绪时会误伤付费账号。
*/
function resolveGroupExpiryLevel(group, now) {
	if (group.kind === "planBase" && group.isTrialPlanBase) return null;
	if (isCreditResourceExhausted(group)) return null;
	return resolveExpiryLevel(GROUPS_SHOW_EXPIRE.includes(group.kind) ? group.nearestUsableExpireAt : group.refreshAt, now);
}
/**
* 用量页的时间格式，顺序与分隔符由产品语言决定：中文 `2026/07/04 16:28:48`，英文 `04/07/2026, 16:28:48`。
*/
function formatUsageDateTime(timestamp) {
	return formatDateTime(timestamp);
}
var CREDIT_GROUP_ORDER, OVERVIEW_METRIC_ORDER, GROUPS_SHOW_EXPIRE, PLAN_BASE_CODES, TRIAL_PLAN_BASE_CODES, PLAN_BONUS_CODES, ADDON_CODES, BENEFIT_CODES;
var init_subscription_usage_model = __esmMin((() => {
	init_common$2();
	init_utils();
	CREDIT_GROUP_ORDER = [
		"planBase",
		"planBonus",
		"addon",
		"benefit"
	];
	OVERVIEW_METRIC_ORDER = [
		"planBase",
		"planBonus",
		"benefit",
		"addon"
	];
	GROUPS_SHOW_EXPIRE = ["addon", "benefit"];
	PLAN_BASE_CODES = [
		CommodityCode.proMon,
		CommodityCode.proMonPlus,
		CommodityCode.proYear,
		CommodityCode.youth,
		CommodityCode.advanced,
		CommodityCode.flagship,
		CommodityCode.freeMonIntl,
		CommodityCode.proTrialMon,
		CommodityCode.proTrialYear
	];
	TRIAL_PLAN_BASE_CODES = [CommodityCode.freeMon, CommodityCode.freeMonIntl];
	PLAN_BONUS_CODES = [CommodityCode.bonus28, CommodityCode.bonusIntl];
	ADDON_CODES = [
		CommodityCode.extra,
		CommodityCode.extra38,
		CommodityCode.extraIntl
	];
	BENEFIT_CODES = [
		CommodityCode.activity,
		CommodityCode.bonus29,
		CommodityCode.bonus30
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/use-addon-purchase.ts
/** 取 addon 分组总积分，用于比对支付前后的增量 */
function readAddonTotal(resources, isIntl) {
	return buildCreditGroups(resources, isIntl).find((group) => group.kind === "addon")?.total ?? 0;
}
function useAddonPurchase(account, open) {
	const adapter = useAdapter();
	const isIntl = isInternationalVersion();
	const [stage, setStage] = (0, import_react$24.useState)("quantity");
	const [quantityText, setQuantityTextState] = (0, import_react$24.useState)("1");
	const [unitPriceYuan, setUnitPriceYuan] = (0, import_react$24.useState)(null);
	const [priceLoading, setPriceLoading] = (0, import_react$24.useState)(false);
	const [submitting, setSubmitting] = (0, import_react$24.useState)(false);
	const [payUrl, setPayUrl] = (0, import_react$24.useState)("");
	const [grantedCredits, setGrantedCredits] = (0, import_react$24.useState)(0);
	const [errorMessage, setErrorMessage] = (0, import_react$24.useState)("");
	/** 空输入按 1 计价，避免用户清空输入框时总价 / 按钮态跳成 NaN */
	const quantity = quantityText === "" ? 1 : Number(quantityText);
	const pollTimerRef = (0, import_react$24.useRef)(null);
	const expireTimerRef = (0, import_react$24.useRef)(null);
	/** 下单时的 addon 总积分基线，轮询靠它判断是否到账 */
	const baselineTotalRef = (0, import_react$24.useRef)(0);
	/** 已确认到账的 addon 总积分，settle 轮询与关闭前补拉共用同一进度 */
	const settledTotalRef = (0, import_react$24.useRef)(0);
	const clearTimers = (0, import_react$24.useCallback)(() => {
		if (pollTimerRef.current) {
			clearTimeout(pollTimerRef.current);
			pollTimerRef.current = null;
		}
		if (expireTimerRef.current) {
			clearTimeout(expireTimerRef.current);
			expireTimerRef.current = null;
		}
	}, []);
	const reset = (0, import_react$24.useCallback)(() => {
		clearTimers();
		setStage("quantity");
		setQuantityTextState("1");
		setPayUrl("");
		setSubmitting(false);
		setGrantedCredits(0);
		setErrorMessage("");
	}, [clearTimers]);
	(0, import_react$24.useEffect)(() => clearTimers, [clearTimers]);
	/**
	* 回到出码前的占位态。数量一变旧订单金额就对不上，必须重新点「立即购买」换码，
	* 同时停掉针对旧订单的轮询与过期计时。
	*/
	const collapseQrcode = (0, import_react$24.useCallback)(() => {
		setStage((prev) => {
			if (prev !== "qrcode" && prev !== "expired") return prev;
			clearTimers();
			setPayUrl("");
			setErrorMessage("");
			return "quantity";
		});
	}, [clearTimers]);
	(0, import_react$24.useEffect)(() => {
		if (!open) return;
		let cancelled = false;
		setPriceLoading(true);
		setErrorMessage("");
		const addonPrice = wb.account.addonPrice?.bind(wb.account);
		if (!addonPrice) {
			setUnitPriceYuan(null);
			setPriceLoading(false);
			return () => {
				cancelled = true;
			};
		}
		addonPrice().then((price) => {
			if (cancelled) return;
			setUnitPriceYuan(price ? price.unitPriceYuan : null);
		}).catch(() => {
			if (!cancelled) setUnitPriceYuan(null);
		}).finally(() => {
			if (!cancelled) setPriceLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [open]);
	const setQuantity = (0, import_react$24.useCallback)((next) => {
		setQuantityTextState(String(clampAddonQuantity(next)));
		collapseQrcode();
	}, [collapseQrcode]);
	const setQuantityText = (0, import_react$24.useCallback)((raw) => {
		setQuantityTextState(sanitizeAddonQuantityInput(raw));
		collapseQrcode();
	}, [collapseQrcode]);
	const normalizeQuantityText = (0, import_react$24.useCallback)(() => {
		setQuantityTextState((prev) => prev === "" ? "1" : prev);
	}, []);
	/**
	* 成功态继续补齐到账积分：后端发放不是原子的，首次命中可能只到一部分，
	* 所以按固定次数复查，取到更大增量就刷新展示并提前结束。
	*/
	const startSettlePolling = (0, import_react$24.useCallback)((settledTotal) => {
		let times = 0;
		settledTotalRef.current = settledTotal;
		const tick = async () => {
			times += 1;
			try {
				const latestTotal = readAddonTotal((await adapter?.getAccountUsage?.())?.resources, isIntl);
				if (latestTotal > settledTotalRef.current) {
					settledTotalRef.current = latestTotal;
					const delta = latestTotal - baselineTotalRef.current;
					if (delta > 0) setGrantedCredits((prev) => Math.max(prev, delta));
					clearTimers();
					return;
				}
			} catch {}
			if (times < 6) pollTimerRef.current = setTimeout(tick, ADDON_SETTLE_POLL_INTERVAL_MS);
		};
		pollTimerRef.current = setTimeout(tick, ADDON_SETTLE_POLL_INTERVAL_MS);
	}, [
		adapter,
		clearTimers,
		isIntl
	]);
	/**
	* 关闭前补拉一次到账结果。轮询间隔放宽到 5s 后，用户点「知道了」可能早于首个 tick，
	* 此时直接关闭会让外层面板拿到发放前的数据。
	*/
	const settleNow = (0, import_react$24.useCallback)(async () => {
		clearTimers();
		try {
			const latestTotal = readAddonTotal((await adapter?.getAccountUsage?.())?.resources, isIntl);
			if (latestTotal > settledTotalRef.current) settledTotalRef.current = latestTotal;
		} catch {}
	}, [
		adapter,
		clearTimers,
		isIntl
	]);
	/**
	* 下单前的 addon 基线，必须与轮询走同一个接口。
	*
	* `account.resources` 是页面级快照，`getAccount` / `useAuth` 那份可能缺加量包
	* （实测同一时刻 authAccount 5 个包、getAccountUsage 8 个包），基线因此偏小，
	* 出码后第一次轮询就把历史已有积分当成本次到账，未支付也弹成功。
	* 返回 null 表示没有可信基线，此时不启用「按增量判成功」。
	*/
	const fetchBaselineTotal = (0, import_react$24.useCallback)(async () => {
		try {
			const usage = await adapter?.getAccountUsage?.();
			if (!usage) return null;
			return readAddonTotal(usage.resources, isIntl);
		} catch {
			return null;
		}
	}, [adapter, isIntl]);
	/** 轮询积分到账。用户在手机上支付，端上没有回调，只能比对总量。 */
	const startPolling = (0, import_react$24.useCallback)(() => {
		const tick = async () => {
			try {
				const latestTotal = readAddonTotal((await adapter?.getAccountUsage?.())?.resources, isIntl);
				if (latestTotal > baselineTotalRef.current) {
					clearTimers();
					setGrantedCredits(latestTotal - baselineTotalRef.current);
					setStage("success");
					startSettlePolling(latestTotal);
					return;
				}
			} catch {}
			pollTimerRef.current = setTimeout(tick, ADDON_POLL_INTERVAL_MS);
		};
		pollTimerRef.current = setTimeout(tick, ADDON_POLL_INTERVAL_MS);
	}, [
		adapter,
		clearTimers,
		isIntl,
		startSettlePolling
	]);
	const createOrderAndShowCode = (0, import_react$24.useCallback)(async () => {
		if (!account?.uid) {
			setErrorMessage("needLogin");
			return;
		}
		const ownerUin = account.uin;
		if (!ownerUin) {
			setErrorMessage("missingCloudAccount");
			return;
		}
		clearTimers();
		setSubmitting(true);
		setErrorMessage("");
		setPayUrl("");
		try {
			const createAddonOrder = wb.account.createAddonOrder?.bind(wb.account);
			if (!createAddonOrder) {
				setErrorMessage("createOrderFailed");
				return;
			}
			const baseline = await fetchBaselineTotal();
			baselineTotalRef.current = baseline ?? 0;
			const order = await createAddonOrder(quantity);
			setPayUrl(buildAddonPayBridgeUrl({
				orderIds: order.orderIds,
				authCode: order.authCode,
				ownerUin
			}));
			setStage("qrcode");
			writeRendererLogFileOnly("credits-diag", "info", `[addon-purchase] ordered quantity=${quantity} baseline=${baseline ?? "unavailable"} snapshotBaseline=${readAddonTotal(account.resources, isIntl)} snapshotResources=${account.resources?.length ?? "absent"}`);
			if (baseline !== null) startPolling();
			expireTimerRef.current = setTimeout(() => {
				clearTimers();
				setStage("expired");
			}, ADDON_QRCODE_TTL_MS);
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : "orderFailed");
		} finally {
			setSubmitting(false);
		}
	}, [
		account,
		clearTimers,
		fetchBaselineTotal,
		isIntl,
		quantity,
		startPolling
	]);
	return {
		stage,
		quantity,
		quantityText,
		setQuantity,
		setQuantityText,
		normalizeQuantityText,
		unitPriceYuan,
		priceLoading,
		submitting,
		payUrl,
		grantedCredits,
		errorMessage,
		submit: createOrderAndShowCode,
		refresh: createOrderAndShowCode,
		settleNow,
		reset
	};
}
var import_react$24;
var init_use_addon_purchase = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_contexts();
	init_environment();
	init_http_logger();
	init_addon_purchase_model();
	init_subscription_usage_model();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/AddonPurchaseDialog.tsx
/** 成功态倒计时自动关闭 */
function useAutoCloseCountdown(active, onDone) {
	const [remain, setRemain] = (0, import_react$23.useState)(6);
	(0, import_react$23.useEffect)(() => {
		if (!active) {
			setRemain(6);
			return;
		}
		const timer = setInterval(() => {
			setRemain((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					onDone();
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, [active, onDone]);
	return remain;
}
function AddonPurchaseDialog({ open, account, creditsPerPack, onPurchased, onClose }) {
	const t = useTranslation();
	const purchase = useAddonPurchase(account, open);
	const { stage, quantity, quantityText, setQuantity, setQuantityText, normalizeQuantityText, unitPriceYuan, priceLoading, submitting, payUrl, grantedCredits, errorMessage } = purchase;
	const qrDataUrl = useQrDataUrl(stage === "qrcode" || stage === "expired" ? payUrl : "");
	const handleClose = () => {
		if (stage === "success") purchase.settleNow().finally(() => onPurchased?.());
		purchase.reset();
		onClose();
	};
	const countdown = useAutoCloseCountdown(stage === "success", handleClose);
	if (!open) return null;
	const totalAmount = unitPriceYuan === null ? null : unitPriceYuan * quantity;
	const totalCredits = creditsPerPack * quantity;
	const qrExpanded = stage === "qrcode" || stage === "expired";
	const priceFailed = !priceLoading && unitPriceYuan === null;
	const renderQuantityStage = () => /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
		className: "addon-purchase__body",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "addon-purchase__qty-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "addon-purchase__hero",
					children: [formatNumber(totalCredits), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
						className: "addon-purchase__hero-unit",
						children: t("subscriptionUsage.addon.creditsUnit")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "addon-purchase__stepper",
					role: "group",
					"aria-label": t("subscriptionUsage.addon.quantity"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
							type: "button",
							className: "addon-purchase__stepper-btn",
							onClick: () => setQuantity(quantity - 1),
							disabled: quantity <= 1,
							"aria-label": t("subscriptionUsage.addon.decrease"),
							children: "−"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
							className: "addon-purchase__stepper-input",
							variant: "filled",
							inputMode: "numeric",
							value: quantityText,
							onChange: (event) => setQuantityText(event.target.value),
							onBlur: normalizeQuantityText,
							"aria-label": t("subscriptionUsage.addon.quantity")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
							type: "button",
							className: "addon-purchase__stepper-btn",
							onClick: () => setQuantity(quantity + 1),
							disabled: quantity >= 99,
							"aria-label": t("subscriptionUsage.addon.increase"),
							children: "+"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Card, {
				variant: "flat",
				padding: "medium",
				className: "addon-purchase__desc",
				children: t("subscriptionUsage.addon.description")
			}),
			renderQrcodePanel(),
			priceFailed && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", {
				className: "addon-purchase__error",
				children: t("subscriptionUsage.addon.priceFailed")
			}),
			errorMessage && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", {
				className: "addon-purchase__error",
				children: errorMessage === "missingCloudAccount" ? t("subscriptionUsage.addon.missingCloudAccount") : t("subscriptionUsage.addon.orderFailed")
			})
		]
	});
	const renderQrcodePanel = () => /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(Card, {
		variant: "outlined",
		padding: "medium",
		className: "addon-purchase__qr-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "addon-purchase__qr",
			children: [
				qrExpanded && (qrDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("img", {
					src: qrDataUrl,
					alt: t("subscriptionUsage.addon.scanToPay")
				}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Loading, { size: "small" })),
				!qrExpanded && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
					className: "addon-purchase__qr-ghost",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
					type: "button",
					className: "addon-purchase__qr-placeholder",
					onClick: () => {
						purchase.submit();
					},
					disabled: submitting || priceLoading || unitPriceYuan === null,
					children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Loading, { size: "small" }) : t("subscriptionUsage.addon.qrPlaceholder")
				})] }),
				stage === "expired" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
					type: "button",
					className: "addon-purchase__qr-refresh",
					onClick: () => {
						purchase.refresh();
					},
					disabled: submitting,
					children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Loading, { size: "small" }) : t("subscriptionUsage.addon.qrPlaceholder")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "addon-purchase__qr-info",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "addon-purchase__qr-tip",
				children: t("subscriptionUsage.addon.scanToPay")
			}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "addon-purchase__qr-order",
				children: [totalAmount !== null && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "addon-purchase__qr-amount",
					children: ["¥", formatAddonAmount(totalAmount)]
				}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("dl", {
					className: "addon-purchase__qr-rows",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "addon-purchase__qr-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("dt", { children: t("subscriptionUsage.addon.summaryCredits") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("dd", { children: formatNumber(totalCredits) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "addon-purchase__qr-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("dt", { children: t("subscriptionUsage.addon.summaryExpiry") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("dd", { children: formatAddonExpiryDate() })]
					})]
				})]
			})]
		})]
	});
	const renderSuccessStage = () => /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
		className: "addon-purchase__body addon-purchase__body--success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "addon-purchase__success-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
					className: "addon-purchase__success-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(CheckIcon$1, {
						width: 12,
						height: 12
					})
				}), t("subscriptionUsage.addon.paid")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "addon-purchase__success-granted",
				children: [
					"+",
					formatNumber(grantedCredits),
					" ",
					t("subscriptionUsage.addon.creditsUnit")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "addon-purchase__success-hint",
				children: t("subscriptionUsage.addon.settleHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "addon-purchase__actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
					variant: "primary",
					fullWidth: true,
					onClick: handleClose,
					children: t("subscriptionUsage.addon.gotIt", { seconds: countdown })
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		open: true,
		onOpenChange: (next) => {
			if (!next) handleClose();
		},
		title: t("subscriptionUsage.addon.title"),
		width: 480,
		footer: null,
		closeOnOverlayClick: !qrExpanded,
		className: "addon-purchase-modal",
		children: stage === "success" ? renderSuccessStage() : renderQuantityStage()
	});
}
var import_react$23, import_jsx_runtime$18;
var init_AddonPurchaseDialog = __esmMin((() => {
	init_SubscriptionUsagePanel();
	init_src();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_use_qr_data_url();
	init_useI18n();
	init_utils();
	init_CheckIcon();
	init_addon_purchase_model();
	init_use_addon_purchase();
	import_jsx_runtime$18 = require_jsx_runtime();
})), import_jsx_runtime$17, LocalAccountIcon, EnterpriseIcon, PersonalIcon, CreditsIcon, UsageIcon, SettingsIcon, AppearanceIcon, HelpFeedbackIcon, CheckUpdateIcon, LogoutIcon, ChevronRightIcon, CheckIcon, RefreshIcon, CreditsLoadingIcon, CreditsErrorIcon;
var init_menu_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$17 = require_jsx_runtime();
	LocalAccountIcon = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106zm-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993zm-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023.144-.32.336-.607.576-.847.24-.24.528-.431.848-.575.32-.144.672-.208 1.024-.208.368 0 .704.064 1.024.208.32.144.608.336.848.575.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848 2.84 2.84 0 0 1-.848.575 2.715 2.715 0 0 1-2.064 0 2.84 2.84 0 0 1-.848-.575 2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406 4.883 4.883 0 0 0-1.088-1.135 5.207 5.207 0 0 0-1.04-.608 2.82 2.82 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.624 3.624 0 0 0 .528-1.934 3.71 3.71 0 0 0-.288-1.47 3.799 3.799 0 0 0-.816-1.199 3.845 3.845 0 0 0-1.2-.8 3.72 3.72 0 0 0-1.472-.287 3.72 3.72 0 0 0-1.472.288 3.631 3.631 0 0 0-1.2.815 3.84 3.84 0 0 0-.8 1.199 3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007.096.336.224.64.4.927.16.288.384.544.624.784.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907z" })
	});
	EnterpriseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 1.39997 1.03582)",
			d: "M8.2001 5.3796L8.2001 1.7898Q8.2001 1.7489 8.2002 1.6707Q8.2013 1.1703 8.1687 0.969Q8.0922 0.4975 7.7625 0.2487Q7.4327 0 6.9584 0.056Q6.7558 0.08 6.2749 0.2185Q6.1998 0.2401 6.1605 0.2513L4.7869 0.6438Q2.9199 1.1772 2.2881 1.4408Q1.2388 1.8785 0.7248 2.5606Q0.2118 3.2416 0.0796 4.3699Q0.0001 5.0493 0 6.9899L0 9.0191Q0 10.6741 0.0787 11.251Q0.2161 12.2576 0.7616 12.803Q1.307 13.3485 2.3136 13.4859Q2.8905 13.5646 4.5455 13.5645L9.8058 13.5645Q11.0101 13.5645 11.3976 13.4398Q12.6666 13.0311 13.0753 11.7621Q13.2001 11.3746 13.2001 10.1703Q13.2001 8.4042 13.0258 7.8657Q12.7587 7.0402 12.1413 6.4249Q11.5239 5.8096 10.6975 5.5453Q10.3315 5.4283 9.4003 5.3934L9.4003 6.5915Q10.1065 6.6162 10.332 6.6883Q11.505 7.0634 11.8841 8.2351Q12.0001 8.5935 12 10.1703Q12.0001 11.1862 11.933 11.3943Q11.713 12.0775 11.0298 12.2975Q10.94 12.3264 10.7 12.3429L10.7 8.9642L9.5 8.9642L9.5 12.3645L8.2001 12.3645L8.2001 6.5796L8.2002 6.5796L8.2002 5.3796L8.2001 5.3796ZM7 1.7898L7 12.3645L4.5454 12.3645Q2.9719 12.3646 2.4759 12.2969Q1.8698 12.2142 1.6101 11.9545Q1.3504 11.6948 1.2677 11.0887Q1.2 10.5926 1.2001 9.0192L1.2001 6.9899Q1.2001 5.1194 1.2715 4.5095Q1.3658 3.704 1.6832 3.2827Q2.0012 2.8607 2.7501 2.5483Q3.3171 2.3118 5.1166 1.7976L6.4902 1.4052Q6.5307 1.3936 6.6071 1.3716Q6.8611 1.2984 6.9937 1.2679Q7.0008 1.4038 7.0002 1.6681Q7.0001 1.7477 7 1.7898ZM4.7 5.9642L4.7 4.4642L3.5 4.4642L3.5 5.9642L4.7 5.9642Z",
			fillRule: "evenodd"
		})
	});
	PersonalIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 1.33512 1.33501)",
			d: "M6.665 0Q8.1831 0 9.2566 1.0735Q10.33 2.1469 10.33 3.665Q10.33 5.1831 9.2566 6.2565Q8.1831 7.33 6.665 7.33Q5.1469 7.33 4.0735 6.2565Q3 5.1831 3 3.665Q3 2.1469 4.0735 1.0735Q5.1469 0 6.665 0ZM6.665 1.33Q5.6978 1.33 5.0139 2.0139Q4.33 2.6978 4.33 3.665Q4.33 4.6322 5.0139 5.3161Q5.6978 6 6.665 6Q7.6322 6 8.3161 5.3161Q9 4.6322 9 3.665Q9 2.6978 8.3161 2.0139Q7.6322 1.33 6.665 1.33ZM7.1198 9.9829L7.1197 9.9829C6.9021 10.3094 6.7932 10.4727 6.8109 10.6506C6.8285 10.8284 6.9672 10.9672 7.2447 11.2447L9.9579 13.9579C10.2899 14.2898 10.4558 14.4579 10.665 14.4579C10.8742 14.4579 11.0402 14.2898 11.3721 13.9579L14.0853 11.2447C14.3628 10.9672 14.5016 10.8284 14.5192 10.6506C14.5368 10.4727 14.428 10.3094 14.2103 9.9829L14.2103 9.9829L12.9619 8.1103C12.8166 7.8923 12.7439 7.7833 12.6333 7.7242C12.5228 7.665 12.3918 7.665 12.1298 7.665L9.2002 7.665C8.9382 7.665 8.8072 7.665 8.6967 7.7242C8.5861 7.7833 8.5135 7.8923 8.3681 8.1103L7.1198 9.9829ZM4.0936 9.33L6.665 9.33L6.665 8L4.0936 8Q3.4573 8 3.2519 8.0231Q1.981 8.1659 1.0735 9.0734Q0.1659 9.981 0.0231 11.2519Q0 11.4573 0 12.0936Q0 12.2328 0.0078 12.3Q0.0545 12.7021 0.3412 12.9888Q0.628 13.2755 1.03 13.3222Q1.0972 13.33 1.2365 13.33L6.665 13.33L6.665 12L1.3301 12Q1.3313 11.5205 1.3448 11.4005Q1.4356 10.5922 2.0139 10.0139Q2.5922 9.4356 3.4005 9.3447Q3.5318 9.33 4.0936 9.33ZM10.665 12.7841L8.3764 10.4955L9.3768 8.995L11.9532 8.995L12.9536 10.4955L10.665 12.7841Z",
			fillRule: "evenodd"
		})
	});
	`
M7.6 0C9.6987 0 11.49 0.742 12.974 2.226C14.458 3.71 15.2 5.5013 15.2 7.6
C15.2 9.6987 14.458 11.49 12.974 12.974C11.49 14.458 9.6987 15.2 7.6 15.2
C5.5013 15.2 3.71 14.458 2.226 12.974C0.742 11.49 0 9.6987 0 7.6
C0 5.5013 0.742 3.71 2.226 2.226C3.71 0.742 5.5013 0 7.6 0ZM7.6 1.2
C5.8327 1.2 4.3242 1.8248 3.0745 3.0745C1.8248 4.3242 1.2 5.8327 1.2 7.6
C1.2 9.3673 1.8248 10.8758 3.0745 12.1255C4.3242 13.3752 5.8327 14 7.6 14
C9.3673 14 10.8758 13.3752 12.1255 12.1255C13.3752 10.8758 14 9.3673 14 7.6
C14 5.8327 13.3752 4.3242 12.1255 3.0745C10.8758 1.8248 9.3673 1.2 7.6 1.2Z
`.trim();
	`
M3.025 4.4635L1.4628 0L0 0L2.389 6.2788C2.4398 6.4386 2.5418 6.5528 2.695 6.6212
C2.844 6.6983 2.9968 6.7068 3.1535 6.6469C3.2313 6.62 3.3005 6.5786 3.3609 6.5227
C3.4218 6.4673 3.469 6.402 3.5025 6.3268L5.0141 2.9675L6.5258 6.3268
C6.5902 6.4817 6.7017 6.5866 6.8602 6.6416C7.0152 6.7055 7.1682 6.7009 7.3192 6.6277
C7.3944 6.5942 7.4597 6.5471 7.5151 6.4861C7.571 6.4257 7.6124 6.3566 7.6393 6.2788
L10 0L8.5655 0L7.0032 4.4635L5.5613 1.2592C5.5314 1.1922 5.4904 1.1329 5.4384 1.0811
C5.3867 1.0291 5.3273 0.9882 5.2603 0.9583C5.1094 0.885 4.9564 0.8804 4.8013 0.9444
C4.6428 0.9994 4.5314 1.1043 4.467 1.2592L3.025 4.4635Z
`.trim();
	`
M0.6 1.2L2.8337 1.2L2.8337 0L0 0L0 1.2L0.6 1.2ZM9.1 1.2L11.2 1.2L11.2 0L8.5 0L8.5 1.2L9.1 1.2Z
`.trim();
	CreditsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(0.707107 0.707107 -0.707107 0.707107 7.99991 -0.000306168)",
			d: "M10.7915 2.3866L10.7922 2.3851L10.8082 2.3531L10.8324 2.3046L10.8434 2.2826L10.8509 2.2674Q11.0516 1.8517 10.9643 1.4155Q10.8844 1.0156 10.5912 0.7226Q10.2981 0.4295 9.8983 0.3495Q9.4621 0.2624 9.0509 0.4609L9.034 0.4693L9.0092 0.4817L8.96 0.5062L8.9285 0.5219Q7.3825 1.2844 5.657 1.2845Q3.9315 1.2845 2.3841 0.5215L2.3525 0.5058L2.3047 0.4819L2.2826 0.4709L2.2674 0.4633Q1.8516 0.2627 1.4155 0.3499Q1.0156 0.4298 0.7225 0.7229Q0.4295 1.016 0.3495 1.4159Q0.2623 1.852 0.4608 2.2632L0.4692 2.2802L0.4817 2.3052L0.5062 2.3544L0.5219 2.3859Q1.2843 3.9319 1.2843 5.6573Q1.2843 7.3828 0.5213 8.9301L0.5056 8.9617L0.4817 9.0095L0.4707 9.0316L0.4632 9.0468Q0.2625 9.4625 0.3497 9.8987Q0.4296 10.2985 0.7227 10.5916Q1.0158 10.8847 1.4157 10.9647Q1.8518 11.0519 2.263 10.8534L2.28 10.845L2.305 10.8326L2.3542 10.8079L2.3859 10.7922Q3.9318 10.0299 5.6571 10.03Q7.3824 10.03 8.9297 10.793L8.9615 10.8087L9.0092 10.8326L9.0313 10.8437L9.0466 10.8512Q9.4623 11.0519 9.8984 10.9647Q10.2983 10.8848 10.5914 10.5917Q10.8845 10.2986 10.9644 9.8987Q11.0516 9.4626 10.8532 9.0514L10.8448 9.0343L10.8323 9.0093L10.8076 8.9598L10.7917 8.9278Q10.0296 7.3822 10.0296 5.6572Q10.0296 3.933 10.7915 2.3866ZM9.7333 1.8196L9.7166 1.8531L9.7159 1.8546Q8.8296 3.6525 8.8296 5.6572Q8.8297 7.662 9.7168 9.4613L9.7341 9.4961L9.7589 9.5457L9.7686 9.5651L9.7725 9.5731Q9.8182 9.6678 9.7429 9.7431Q9.6675 9.8185 9.5774 9.775L9.5677 9.7702L9.5456 9.7592L9.495 9.7339L9.4604 9.7167Q7.6622 8.83 5.6571 8.83Q3.6521 8.8299 1.8524 9.7173L1.8179 9.7345L1.7686 9.7591L1.7493 9.7687L1.7413 9.7727Q1.6466 9.8184 1.5713 9.7431Q1.4959 9.6678 1.5394 9.5775L1.5442 9.568L1.5552 9.5459L1.5805 9.4953L1.5975 9.4609Q2.4843 7.6625 2.4843 5.6573Q2.4843 3.6521 1.5967 1.8524L1.5797 1.818L1.5551 1.7687L1.5454 1.7494L1.5415 1.7415Q1.4958 1.6468 1.5711 1.5714Q1.6464 1.4961 1.7366 1.5396L1.7462 1.5443L1.7683 1.5554L1.8189 1.5807L1.8533 1.5977Q3.6518 2.4845 5.6571 2.4845Q7.6624 2.4844 9.4621 1.5967L9.4965 1.5797L9.5456 1.5551L9.5648 1.5454L9.5727 1.5416Q9.6674 1.4958 9.7428 1.5711Q9.8181 1.6465 9.7746 1.7367L9.7699 1.7462L9.7589 1.7683L9.7333 1.8196Z",
			fillRule: "evenodd"
		})
	});
	UsageIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M2 2C2.4 2 2.67 2.27 2.67 2.67V12.67H13.33C13.73 12.67 14 12.93 14 13.33C14 13.73 13.73 14 13.33 14H2C1.6 14 1.33 13.73 1.33 13.33V2.67C1.33 2.27 1.6 2 2 2Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M5 7.33C5.4 7.33 5.67 7.6 5.67 8V11.33H4.33V8C4.33 7.6 4.6 7.33 5 7.33Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M8 5.33C8.4 5.33 8.67 5.6 8.67 6V11.33H7.33V6C7.33 5.6 7.6 5.33 8 5.33Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M11 8.67C11.4 8.67 11.67 8.93 11.67 9.33V11.33H10.33V9.33C10.33 8.93 10.6 8.67 11 8.67Z" })
		]
	});
	SettingsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 0.709401 1.33782)",
			d: "M13.6555 4.3622Q14.1634 5.2418 14.3164 5.5797Q14.5812 6.1642 14.5812 6.6622Q14.5812 7.1602 14.3164 7.7447Q14.1634 8.0826 13.6555 8.9622L12.4649 11.0244Q11.9571 11.904 11.741 12.2055Q11.3672 12.727 10.9359 12.976Q10.5046 13.225 9.866 13.288Q9.4969 13.3244 8.4812 13.3244L6.1 13.3244Q5.0843 13.3244 4.7152 13.288Q4.0766 13.225 3.6453 12.976Q3.214 12.727 2.8402 12.2055Q2.6241 11.904 2.1163 11.0244L0.9257 8.9622Q0.4178 8.0826 0.2648 7.7447Q0 7.1602 0 6.6622Q0 6.1642 0.2648 5.5797Q0.4178 5.2418 0.9257 4.3622L2.1163 2.3Q2.6241 1.4204 2.8402 1.1189Q3.214 0.5973 3.6453 0.3483Q4.0766 0.0993 4.7152 0.0364Q5.0843 0 6.1 0L8.4812 0Q9.4969 0 9.866 0.0364Q10.5046 0.0993 10.9359 0.3483Q11.3672 0.5973 11.741 1.1189Q11.7677 1.1562 11.7989 1.2023L8.8057 1.2023Q8.6509 1.2 8.4812 1.2L6.1 1.2Q4.5702 1.2 4.2453 1.3876Q3.9204 1.5751 3.1555 2.9L1.9649 4.9622Q1.2 6.287 1.2 6.6622Q1.2 7.0373 1.9649 8.3622L3.1555 10.4244Q3.9204 11.7492 4.2453 11.9368Q4.5702 12.1244 6.1 12.1244L8.4812 12.1244Q10.011 12.1244 10.3359 11.9368Q10.6608 11.7492 11.4257 10.4244L12.6163 8.3622Q13.3812 7.0373 13.3812 6.6622Q13.3812 6.287 12.6163 4.9622L11.4257 2.9Q11.2681 2.627 11.1292 2.4023L12.524 2.4023L13.6555 4.3622ZM7.2911 3.6622Q8.5337 3.6622 9.4124 4.5409Q10.2911 5.4195 10.2911 6.6622Q10.2911 7.9048 9.4124 8.7835Q8.5337 9.6622 7.2911 9.6622Q6.0484 9.6622 5.1698 8.7835Q4.2911 7.9048 4.2911 6.6622Q4.2911 5.4195 5.1698 4.5409Q6.0484 3.6622 7.2911 3.6622ZM7.2911 4.8622Q6.5455 4.8622 6.0183 5.3894Q5.4911 5.9166 5.4911 6.6622Q5.4911 7.4078 6.0183 7.935Q6.5455 8.4622 7.2911 8.4622Q8.0367 8.4622 8.5639 7.935Q9.0911 7.4078 9.0911 6.6622Q9.0911 5.9166 8.5639 5.3894Q8.0367 4.8622 7.2911 4.8622Z",
			fillRule: "evenodd"
		})
	});
	AppearanceIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 8.66754e-05 -8.66797e-05 1 0.621274 1.09985)",
			d: "M0.5871 4.1991C0.1957 5.0584 0 5.9587 0 6.9C0 7.8413 0.1957 8.7416 0.5871 9.601C0.9636 10.4275 1.4942 11.1587 2.1789 11.7945C2.8604 12.4273 3.6422 12.9169 4.5244 13.2634C5.4353 13.6211 6.3887 13.8 7.3846 13.8C8.3839 13.8 9.1044 13.48 9.5461 12.8401C9.7142 12.5965 9.8462 12.2956 9.942 11.9375C9.9939 11.7434 10.0514 11.4505 10.1147 11.0589C10.1854 10.6206 10.2514 10.3122 10.3125 10.1338C10.3942 9.8955 10.5047 9.7221 10.644 9.6134C10.772 9.5136 10.9538 9.4436 11.1893 9.4032C11.3609 9.3738 11.6452 9.3543 12.0422 9.3445C12.4266 9.3351 12.7138 9.3175 12.9037 9.2917C13.2624 9.243 13.5649 9.1465 13.8115 9.002C14.1504 8.8033 14.3994 8.5126 14.5584 8.13L12.4119 8.1302C12.2984 8.1362 12.1653 8.1411 12.0128 8.1449C11.5576 8.1561 11.2156 8.1812 10.9868 8.2205C10.5529 8.2948 10.1927 8.4436 9.9061 8.6671C9.5791 8.9221 9.3362 9.2813 9.1773 9.7447C9.0941 9.9877 9.0116 10.362 8.93 10.8676C8.8732 11.2192 8.8241 11.4725 8.7827 11.6275C8.7227 11.8518 8.648 12.0288 8.5585 12.1584C8.3553 12.4528 7.964 12.6 7.3846 12.6C6.5401 12.6 5.733 12.4488 4.9631 12.1465C4.2219 11.8553 3.566 11.4449 2.9955 10.9151C2.4281 10.3883 1.9893 9.7844 1.6792 9.1035C1.3597 8.4022 1.2 7.6677 1.2 6.9C1.2 6.1323 1.3597 5.3978 1.6792 4.6965C1.9893 4.0156 2.4281 3.4117 2.9955 2.8849C3.566 2.3551 4.2218 1.9447 4.9631 1.6536C5.733 1.3512 6.5401 1.2 7.3846 1.2C8.2291 1.2 9.0363 1.3512 9.8062 1.6536C10.5474 1.9447 11.2033 2.3551 11.7738 2.8849C12.3412 3.4117 12.7799 4.0156 13.09 4.6965C13.4095 5.3978 13.5692 6.1323 13.5692 6.9C13.5692 6.9101 13.5692 6.9201 13.5691 6.9301L14.7691 6.93C14.7692 6.92 14.7692 6.91 14.7692 6.9C14.7692 5.9587 14.5735 5.0584 14.1821 4.1991C13.8056 3.3725 13.275 2.6413 12.5903 2.0056C11.9089 1.3727 11.127 0.8831 10.2448 0.5366C9.334 0.1789 8.3806 0 7.3846 0C6.3887 0 5.4353 0.1789 4.5244 0.5366C3.6422 0.8831 2.8604 1.3727 2.1789 2.0056C1.4942 2.6413 0.9636 3.3725 0.5871 4.1991ZM8.587 2.9931C8.7823 3.1883 8.8799 3.424 8.8799 3.7002C8.8799 3.9763 8.7823 4.212 8.587 4.4073C8.3918 4.6026 8.1561 4.7002 7.8799 4.7002C7.6038 4.7002 7.3681 4.6026 7.1728 4.4073C6.9776 4.212 6.88 3.9763 6.8799 3.7002C6.88 3.424 6.9776 3.1883 7.1728 2.9931C7.3681 2.7978 7.6038 2.7002 7.8799 2.7002C8.1561 2.7002 8.3918 2.7978 8.587 2.9931ZM5.5871 3.993C5.3918 3.7977 5.1561 3.7001 4.8799 3.7001C4.6038 3.7001 4.3681 3.7977 4.1728 3.993C3.9776 4.1883 3.88 4.424 3.8799 4.7001C3.88 4.9762 3.9776 5.2119 4.1728 5.4072C4.3681 5.6025 4.6038 5.7001 4.8799 5.7001C5.1561 5.7001 5.3918 5.6025 5.5871 5.4072C5.7823 5.2119 5.88 4.9762 5.8799 4.7001C5.88 4.424 5.7823 4.1883 5.5871 3.993ZM4.5871 6.993C4.7823 7.1883 4.88 7.424 4.8799 7.7002C4.88 7.9763 4.7823 8.212 4.5871 8.4073C4.3918 8.6025 4.1561 8.7002 3.8799 8.7002C3.6038 8.7002 3.3681 8.6025 3.1728 8.4073C2.9776 8.212 2.88 7.9763 2.88 7.7002C2.88 7.424 2.9776 7.1883 3.1728 6.993C3.3681 6.7978 3.6038 6.7002 3.8799 6.7002C4.1561 6.7002 4.3918 6.7978 4.5871 6.993Z",
			fillRule: "evenodd"
		})
	});
	HelpFeedbackIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 0.899994 0.899994)",
			d: "M10.7207 2.4413Q9.1261 1.2 7.1 1.2Q4.6561 1.2 2.9281 2.9281Q1.2 4.6561 1.2 7.1Q1.2 9.5439 2.9281 11.2719Q4.6561 13 7.1 13Q9.5439 13 11.2719 11.2719Q13 9.5439 13 7.1Q13 5.2447 11.9429 3.7291L12.9272 3.0426Q14.2 4.8675 14.2 7.1Q14.2 10.0409 12.1205 12.1205Q10.0409 14.2 7.1 14.2Q4.1591 14.2 2.0796 12.1205Q0 10.0409 0 7.1Q0 4.1591 2.0796 2.0796Q4.1591 0 7.1 0Q9.5381 0 11.4578 1.4943L10.7207 2.4413ZM6.4969 9.2499L6.4969 8.4999C6.497 7.98 6.7311 7.5558 6.9927 7.234C7.2517 6.9155 7.5771 6.6494 7.8387 6.4433C8.1189 6.2226 8.297 5.8822 8.297 5.4999C8.297 4.8372 7.7597 4.2999 7.097 4.2999C6.5754 4.2999 6.1301 4.633 5.9651 5.0998L5.7651 5.6656L4.6337 5.2656L4.8337 4.6999C5.1629 3.7686 6.051 3.0999 7.097 3.0999C8.4224 3.0999 9.497 4.1744 9.4969 5.4999C9.497 6.2654 9.1379 6.9474 8.5813 7.3859C8.3224 7.5899 8.0912 7.7852 7.9238 7.9911C7.7591 8.1937 7.697 8.3571 7.697 8.4999L7.697 9.2499L6.4969 9.2499ZM7.6992 11.0522L6.4968 11.0522L6.4968 9.8499L7.6992 9.8499L7.6992 11.0522Z",
			fillRule: "evenodd"
		})
	});
	CheckUpdateIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 0.899994 0.899994)",
			d: "M7.1 1.2Q9.1261 1.2 10.7207 2.4413L11.4578 1.4943Q9.5381 0 7.1 0Q4.1591 0 2.0796 2.0796Q0 4.1591 0 7.1Q0 10.0409 2.0796 12.1205Q4.1591 14.2 7.1 14.2Q10.0409 14.2 12.1205 12.1205Q14.2 10.0409 14.2 7.1Q14.2 4.8675 12.9272 3.0426L11.9429 3.7291Q13 5.2447 13 7.1Q13 9.5439 11.2719 11.2719Q9.5439 13 7.1 13Q4.6561 13 2.9281 11.2719Q1.2 9.5439 1.2 7.1Q1.2 4.6561 2.9281 2.9281Q4.6561 1.2 7.1 1.2ZM7.7 5.5485L9.6758 7.5243L10.5243 6.6758L8.2314 4.3828L8.2217 4.3732Q7.9076 4.059 7.7673 3.9525Q7.4444 3.7071 7.1 3.7071Q6.7556 3.7071 6.4327 3.9525Q6.2924 4.059 5.9783 4.3732L5.9686 4.3828L3.6758 6.6758L4.5243 7.5243L6.5 5.5485L6.5 10.6L7.7 10.6L7.7 5.5485Z",
			fillRule: "evenodd"
		})
	});
	LogoutIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 1.89999 1.39999)",
			d: "M3.292 13.1187Q4.013 13.2 6.1 13.2L6.1 12Q4.0804 12 3.4264 11.9263Q2.5612 11.8288 2.1391 11.5043Q1.8884 11.3116 1.6957 11.0609Q1.3713 10.6388 1.2737 9.7736Q1.2 9.1196 1.2 7.1L1.2 6.1Q1.2 4.0804 1.2737 3.4264Q1.3713 2.5612 1.6957 2.1391Q1.8884 1.8884 2.1391 1.6957Q2.5612 1.3713 3.4264 1.2737Q4.0804 1.2 6.1 1.2L6.1 0Q4.013 0 3.292 0.0813Q2.0948 0.2162 1.4078 0.7442Q1.0326 1.0326 0.7442 1.4078Q0.2162 2.0948 0.0813 3.292Q0 4.013 0 6.1L0 7.1Q0 9.187 0.0813 9.908Q0.2162 11.1052 0.7442 11.7922Q1.0326 12.1674 1.4078 12.4558Q2.0948 12.9838 3.292 13.1187ZM10.6515 6L4.1 6L4.1 7.2L10.6515 7.2L8.1758 9.6758L9.0243 10.5243L11.8172 7.7314L11.8268 7.7217Q12.141 7.4076 12.2476 7.2673Q12.4929 6.9444 12.4929 6.6Q12.4929 6.2556 12.2476 5.9327Q12.141 5.7925 11.8268 5.4783L11.8172 5.4686L9.0243 2.6758L8.1758 3.5243L10.6515 6Z",
			fillRule: "evenodd"
		})
	});
	ChevronRightIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(0 -1 1 0 5.25 10.5)",
			d: "M3.5 2.7575L0.3712 -0.3712L-0.3712 0.3712L3.1288 3.8712L3.5 4.2425L7.3712 0.3712L6.6288 -0.3712L3.5 2.7575Z",
			fillRule: "evenodd"
		})
	});
	CheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("polyline", { points: "20 6 9 17 4 12" })
	});
	RefreshIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			transform: "matrix(1 0 0 1 0.787495 0.787495)",
			d: "M12.425 6.2125Q12.425 8.7858 10.6054 10.6054Q8.7858 12.425 6.2125 12.425Q3.6392 12.425 1.8196 10.6054Q0 8.7858 0 6.2125Q0 3.6392 1.8196 1.8196Q3.6392 0 6.2125 0Q8.1866 0 9.7937 1.1354Q10.6881 1.7674 11.2905 2.6215L11.2905 0.61L12.3405 0.61L12.3405 3.1069Q12.3405 3.9311 12.0586 4.213Q11.7766 4.495 10.9524 4.495L8.4555 4.495L8.4555 3.445L10.5768 3.445Q10.0429 2.5972 9.1878 1.993Q7.8531 1.05 6.2125 1.05Q4.0741 1.05 2.5621 2.5621Q1.05 4.0741 1.05 6.2125Q1.05 8.3509 2.5621 9.863Q4.0741 11.375 6.2125 11.375Q8.3509 11.375 9.863 9.863Q11.375 8.3509 11.375 6.2125L12.425 6.2125Z",
			fillRule: "evenodd"
		})
	});
	CreditsLoadingIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		className: "credits-loading-spinner",
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.5",
		strokeLinecap: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", { d: "M12 2a10 10 0 0 1 10 10" })
	});
	CreditsErrorIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
				x1: "12",
				y1: "8",
				x2: "12",
				y2: "12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
				x1: "12",
				y1: "16",
				x2: "12.01",
				y2: "16"
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/LogoutItem.tsx
function LogoutItem({ onLogout }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
		className: "user-menu-footer",
		children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(MenuItem, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(LogoutIcon, {}),
			label: t("account.signOut"),
			onClick: onLogout,
			className: "user-menu-item--logout"
		})
	});
}
var import_jsx_runtime$16;
var init_LogoutItem = __esmMin((() => {
	require_react();
	init_useI18n();
	init_menu_icons();
	init_MenuItem();
	import_jsx_runtime$16 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AmbassadorBadge.less
var init_AmbassadorBadge$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AmbassadorBadge.tsx
/**
* Nova 标识 - 用户名旁展示
*/
function AmbassadorBadge() {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
		className: "ambassador-badge",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("svg", {
			className: "ambassador-badge-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
					d: "M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
					d: "M18 1L18.6 3.4L21 4L18.6 4.6L18 7L17.4 4.6L15 4L17.4 3.4Z",
					fill: "currentColor",
					opacity: "0.8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("circle", {
					cx: "6",
					cy: "18",
					r: "1",
					fill: "currentColor",
					opacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("circle", {
					cx: "20",
					cy: "16",
					r: "0.8",
					fill: "currentColor",
					opacity: "0.35"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
			className: "ambassador-badge-text",
			children: t("account.ambassador.badge")
		})]
	});
}
/**
* 头像星冠装饰 - 包裹头像，在左上角展示星冠
*/
function AmbassadorAvatarWrapper({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
		className: "ambassador-avatar-wrapper",
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("svg", {
				className: "ambassador-avatar-star",
				viewBox: "0 0 24 24",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("linearGradient", {
					id: "ambassadorStarGrad",
					x1: "4",
					y1: "2",
					x2: "20",
					y2: "18",
					gradientUnits: "userSpaceOnUse",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("stop", {
							className: "ambassador-avatar-stop ambassador-avatar-stop--start",
							offset: "0%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("stop", {
							className: "ambassador-avatar-stop ambassador-avatar-stop--middle",
							offset: "50%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("stop", {
							className: "ambassador-avatar-stop ambassador-avatar-stop--end",
							offset: "100%"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
					d: "M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5Z",
					fill: "url(#ambassadorStarGrad)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("svg", {
				className: "ambassador-avatar-sparkle ambassador-avatar-sparkle-1",
				viewBox: "0 0 24 24",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
					className: "ambassador-avatar-sparkle-path ambassador-avatar-sparkle-path--primary",
					d: "M12 4L13 9L18 10L13 11L12 16L11 11L6 10L11 9Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("svg", {
				className: "ambassador-avatar-sparkle ambassador-avatar-sparkle-2",
				viewBox: "0 0 24 24",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
					className: "ambassador-avatar-sparkle-path ambassador-avatar-sparkle-path--secondary",
					d: "M12 4L13 9L18 10L13 11L12 16L11 11L6 10L11 9Z"
				})
			})
		]
	});
}
var import_jsx_runtime$15;
var init_AmbassadorBadge = __esmMin((() => {
	init_AmbassadorBadge$1();
	require_react();
	init_useI18n();
	import_jsx_runtime$15 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/MenuHeader.tsx
function CopyIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("rect", {
			x: "5",
			y: "5",
			width: "9",
			height: "9",
			rx: "1.5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("path", {
			d: "M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5V9.5A1.5 1.5 0 0 0 3.5 11H5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		})]
	});
}
function MenuHeader({ account, isAmbassador, copyUid, onCopyUidSuccess, onCopyUidError }) {
	const { t } = useI18n();
	const displayName = account.displayName || account.enterpriseUserName || account.nickname;
	const subtitle = account.type !== "personal" && account.enterpriseId ? account.enterpriseName : void 0;
	const handleCopyUid = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		const uid = account.uid;
		const fallbackCopy = (text) => {
			const el = document.createElement("textarea");
			el.value = text;
			el.style.position = "fixed";
			el.style.opacity = "0";
			document.body.appendChild(el);
			el.select();
			const copied = document.execCommand("copy");
			document.body.removeChild(el);
			if (!copied) throw new Error("copy command failed");
		};
		try {
			if (copyUid) await copyUid(uid);
			else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(uid).catch(() => fallbackCopy(uid));
			else fallbackCopy(uid);
			if (onCopyUidSuccess) onCopyUidSuccess();
			else toast.success(t("account.copyUidSuccess"));
		} catch (error) {
			if (onCopyUidError) onCopyUidError(error);
			else toast.error(t("account.copyUidFailed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
		className: "user-menu-header",
		children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "user-menu-header-info",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "user-menu-header-name",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
						className: "user-menu-header-name-text",
						children: displayName
					}),
					isAmbassador && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(AmbassadorBadge, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Tooltip, {
						content: t("account.copyUid"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
							className: "user-menu-header-copy-uid",
							onClick: (event) => {
								handleCopyUid(event).catch(() => void 0);
							},
							type: "button",
							"aria-label": t("account.copyUid"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CopyIcon, {})
						})
					})
				]
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
				className: "user-menu-header-subtitle",
				children: subtitle
			})]
		})
	});
}
var import_jsx_runtime$14;
var init_MenuHeader = __esmMin((() => {
	init_src$1();
	require_react();
	init_useI18n();
	init_AmbassadorBadge();
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/MenuSeparator.tsx
/**
* 分割线组件
*/
function MenuSeparator({ noMarginBottom }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { className: `user-menu-separator${noMarginBottom ? " user-menu-separator--no-margin-bottom" : ""}` });
}
var import_jsx_runtime$13;
var init_MenuSeparator = __esmMin((() => {
	require_react();
	import_jsx_runtime$13 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AccountMenuPanel.tsx
/** 主窗与独立窗口共享的账户菜单 DOM 外壳。 */
function AccountMenuPanel({ account, isAmbassador = false, children, onLogout, copyUid, onCopyUidSuccess, onCopyUidError }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		className: "user-menu-panel",
		"data-account-menu-panel": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MenuHeader, {
				account,
				isAmbassador,
				copyUid,
				onCopyUidSuccess,
				onCopyUidError
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MenuSeparator, {}),
			children,
			onLogout && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(LogoutItem, { onLogout })
		]
	});
}
var import_jsx_runtime$12;
var init_AccountMenuPanel = __esmMin((() => {
	require_react();
	init_LogoutItem();
	init_MenuHeader();
	init_MenuSeparator();
	import_jsx_runtime$12 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AccountMenuPopover.tsx
/**
* 账户菜单统一浮层控制器：点击切换、外点/ESC 关闭、Portal 与 fixed 定位均在此收口。
*/
function AccountMenuPopover({ open, onOpenChange, placement = "top-start", renderTrigger, children, portal = true, localStyle = true, className }) {
	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange,
		placement,
		strategy: portal ? "fixed" : "absolute",
		whileElementsMounted: open ? (reference, floating, update) => autoUpdate(reference, floating, update, { animationFrame: true }) : void 0,
		middleware: [
			offset(8),
			flip({ padding: 8 }),
			shift({ padding: 8 }),
			size({
				padding: 8,
				apply({ availableHeight, elements }) {
					elements.floating.style.maxHeight = `${Math.max(0, availableHeight - 48)}px`;
				}
			})
		]
	});
	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "menu" });
	const { getReferenceProps: getFloatingReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role
	]);
	const refsLatest = (0, import_react$16.useRef)(refs);
	refsLatest.current = refs;
	const referenceElementRef = (0, import_react$16.useRef)(null);
	const lastFloatingElementRef = (0, import_react$16.useRef)(null);
	const wasOpenRef = (0, import_react$16.useRef)(open);
	const referenceRef = (0, import_react$16.useCallback)((node) => {
		referenceElementRef.current = node;
		refsLatest.current.setReference(node);
	}, []);
	const floatingRef = (0, import_react$16.useCallback)((node) => {
		if (node) lastFloatingElementRef.current = node;
		refsLatest.current.setFloating(node);
	}, []);
	(0, import_react$16.useLayoutEffect)(() => {
		const wasOpen = wasOpenRef.current;
		wasOpenRef.current = open;
		if (!wasOpen || open) return;
		const activeElement = document.activeElement;
		if (activeElement === document.body || lastFloatingElementRef.current?.contains(activeElement)) referenceElementRef.current?.focus({ preventScroll: true });
	}, [open]);
	const getReferenceProps = (0, import_react$16.useCallback)((props = {}) => getFloatingReferenceProps(props), [getFloatingReferenceProps]);
	const popover = open ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
		ref: floatingRef,
		className: [
			"user-menu-popover",
			localStyle ? "user-menu-popover--local" : "",
			portal ? "user-menu-popover--portal" : "",
			className
		].filter(Boolean).join(" "),
		style: floatingStyles,
		...getFloatingProps(),
		children
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [renderTrigger({
		open,
		referenceRef,
		getReferenceProps
	}), portal && popover ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FloatingPortal, { children: popover }) : popover] });
}
var import_react$16, import_jsx_runtime$11;
var init_AccountMenuPopover = __esmMin((() => {
	init_UserMenu$1();
	init_floating();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$11 = require_jsx_runtime();
}));
var init_enterprise_badge = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AccountAvatar.tsx
/**
* 账户头像的多级图片兜底。
*
* 基于 foundation Avatar 的加载失败处理，按 sources 顺序逐级降级，
* 最终回退到业务传入的图标或文字节点。
*/
function AccountAvatarInner({ sources, fallback, children, ...avatarProps }) {
	const normalizedSources = Array.from(new Set(sources.filter((source) => typeof source === "string").map((source) => source.trim()).filter(Boolean)));
	let avatar = /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Avatar, {
		...avatarProps,
		icon: fallback,
		children
	});
	for (let index = normalizedSources.length - 1; index >= 0; index -= 1) avatar = /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Avatar, {
		...avatarProps,
		src: normalizedSources[index],
		icon: avatar
	});
	return avatar;
}
var import_react$15, import_jsx_runtime$10, AccountAvatar;
var init_AccountAvatar = __esmMin((() => {
	init_src();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$10 = require_jsx_runtime();
	AccountAvatar = import_react$15.memo(AccountAvatarInner);
	AccountAvatar.displayName = "AccountAvatar";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AccountMenuTrigger.tsx
var import_react$14, import_jsx_runtime$9, AccountMenuTrigger;
var init_AccountMenuTrigger = __esmMin((() => {
	init_src$1();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_enterprise_badge();
	init_UserIcon();
	init_AccountAvatar();
	init_AmbassadorBadge();
	import_jsx_runtime$9 = require_jsx_runtime();
	AccountMenuTrigger = (0, import_react$14.forwardRef)(function AccountMenuTrigger({ variant = "collapsed", avatarSize, avatarSources, displayName, isAmbassador = false, showEnterpriseBadge = false, enterpriseBadgeLabel, showTooltip = true, tooltipPlacement = "right", className, ...buttonProps }, ref) {
		const size = avatarSize ?? (variant === "collapsed" ? 28 : 32);
		const fallback = (0, import_react$14.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(UserIcon, {
			width: size,
			height: size
		}), [size]);
		const avatar = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(AccountAvatar, {
			sources: avatarSources,
			size,
			alt: displayName,
			className: variant === "expanded" ? "user-menu-trigger-avatar-img" : void 0,
			fallback
		});
		const wrappedAvatar = isAmbassador ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(AmbassadorAvatarWrapper, { children: avatar }) : avatar;
		const triggerClassName = [
			"user-menu-trigger",
			variant === "expanded" ? "user-menu-trigger--workbuddy" : "user-menu-trigger--workbuddy-collapsed",
			className
		].filter(Boolean).join(" ");
		const button = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
			...buttonProps,
			ref,
			type: "button",
			className: triggerClassName,
			title: variant === "expanded" ? buttonProps.title ?? displayName : buttonProps.title,
			"data-track-id": buttonProps["data-track-id"] ?? "user_avatar_menu",
			"data-track-name": buttonProps["data-track-name"] ?? "头像菜单",
			children: variant === "expanded" ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: "user-menu-trigger-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "user-menu-trigger-avatar",
					children: [wrappedAvatar, showEnterpriseBadge && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("img", {
						src: "data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.5'%20y='0.5'%20width='9'%20height='9'%20rx='4.5'%20fill='url(%23paint0_linear_175_6015)'/%3e%3crect%20x='0.5'%20y='0.5'%20width='9'%20height='9'%20rx='4.5'%20stroke='%23F4F5F5'%20style='stroke:%23F4F5F5;stroke:color(display-p3%200.9569%200.9608%200.9608);stroke-opacity:1;'/%3e%3cg%20clip-path='url(%23clip0_175_6015)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M2.64062%203.43586C2.64062%203.34101%202.70298%203.25745%202.79391%203.23044L5.57962%202.40317C5.71699%202.36238%205.85491%202.4653%205.85491%202.60859V7.57142H2.85491C2.73656%207.57142%202.64062%207.47548%202.64062%207.35713V3.43586Z'%20fill='url(%23paint1_linear_175_6015)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.32254%204.35716V3.92859H3.17969V4.35716H5.32254Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.17969%205.21422V4.78564H4.25112V5.21422H3.17969Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.85938%203.67557C5.85938%203.50658%206.04586%203.40409%206.18852%203.49467L7.25995%204.17494C7.32186%204.21425%207.35938%204.2825%207.35938%204.35584V7.35711C7.35938%207.47546%207.26344%207.5714%207.14509%207.5714H5.85938V3.67557Z'%20fill='url(%23paint2_linear_175_6015)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_175_6015'%20x1='5'%20y1='1'%20x2='5'%20y2='9'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23818181'%20style='stop-color:%23818181;stop-color:color(display-p3%200.5059%200.5059%200.5059);stop-opacity:1;'/%3e%3cstop%20offset='1'%20stop-color='%23393939'%20style='stop-color:%23393939;stop-color:color(display-p3%200.2235%200.2235%200.2235);stop-opacity:1;'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_175_6015'%20x1='2.80632'%20y1='2.32142'%20x2='2.80632'%20y2='7.57142'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23E7D5B0'%20style='stop-color:%23E7D5B0;stop-color:color(display-p3%200.9059%200.8353%200.6902);stop-opacity:1;'/%3e%3cstop%20offset='1'%20stop-color='%23FBE6BD'%20style='stop-color:%23FBE6BD;stop-color:color(display-p3%200.9843%200.9020%200.7412);stop-opacity:1;'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint2_linear_175_6015'%20x1='7.42265'%20y1='7.5714'%20x2='7.42265'%20y2='3.28568'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C0A36D'%20style='stop-color:%23C0A36D;stop-color:color(display-p3%200.7529%200.6392%200.4275);stop-opacity:1;'/%3e%3cstop%20offset='1'%20stop-color='%23DDC28F'%20style='stop-color:%23DDC28F;stop-color:color(display-p3%200.8667%200.7608%200.5608);stop-opacity:1;'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_175_6015'%3e%3crect%20width='6'%20height='6'%20fill='white'%20style='fill:white;fill-opacity:1;'%20transform='translate(2%202)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
						alt: "",
						className: "user-menu-trigger-avatar-badge",
						width: 10,
						height: 10
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "user-menu-trigger-name-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "user-menu-trigger-name",
						children: displayName
					}), showEnterpriseBadge && enterpriseBadgeLabel && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "user-menu-enterprise-badge",
						children: enterpriseBadgeLabel
					})]
				})]
			}) : wrappedAvatar
		});
		if (variant === "collapsed" && showTooltip) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Tooltip, {
			content: displayName,
			placement: tooltipPlacement,
			children: button
		});
		return button;
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/checkin-bubble-dismiss.ts
function getCheckinBubbleDismissKey(uid) {
	return `${CHECKIN_BUBBLE_DISMISSED_KEY}:${uid || "anonymous"}`;
}
/** 获取本地时区的当前日期字符串（YYYY-MM-DD），本地 0 点即翻篇 */
function getLocalDateString(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function readCheckinBubbleDismissed(uid) {
	if (typeof window === "undefined" || typeof localStorage === "undefined") return false;
	try {
		const stored = localStorage.getItem(getCheckinBubbleDismissKey(uid));
		if (!stored) return false;
		return stored === getLocalDateString();
	} catch {
		return false;
	}
}
function writeCheckinBubbleDismissed(uid) {
	if (typeof window === "undefined" || typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(getCheckinBubbleDismissKey(uid), getLocalDateString());
	} catch {}
}
function clearCheckinBubbleDismissed(uid) {
	if (typeof window === "undefined" || typeof localStorage === "undefined") return;
	try {
		localStorage.removeItem(getCheckinBubbleDismissKey(uid));
	} catch {}
}
var CHECKIN_BUBBLE_DISMISSED_KEY;
var init_checkin_bubble_dismiss = __esmMin((() => {
	CHECKIN_BUBBLE_DISMISSED_KEY = "agent-ui.checkin-bubble.dismissed";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/CheckinIndicator.tsx
function CheckinIndicator({ credits, onClick }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "checkin-indicator",
		onClick,
		role: "button",
		tabIndex: 0,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { className: "checkin-indicator-dot" }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
			className: "checkin-indicator-text",
			children: t("account.checkin.indicator", { credits: String(credits) })
		})]
	});
}
var import_jsx_runtime$8;
var init_CheckinIndicator = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$8 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/LanguageSubmenu.tsx
function LanguageSubmenu({ currentLocale, supportedLocales, showSubmenu, onHoverChange, onLanguageSelect, getCurrentLanguageDisplayName }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: `user-menu-item-with-submenu ${showSubmenu ? "user-menu-item-with-submenu--active" : ""}`,
		onMouseEnter: () => onHoverChange(true),
		onMouseLeave: () => onHoverChange(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
				className: "user-menu-item-label",
				children: t("settings.language")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
				className: "user-menu-item-value",
				children: getCurrentLanguageDisplayName()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ChevronRightIcon, {}),
			showSubmenu && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "user-menu-submenu-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "user-menu-submenu",
					children: supportedLocales.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(MenuItem, {
						label: loc.label,
						value: currentLocale === loc.value ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(CheckIcon, {}) : void 0,
						onClick: () => onLanguageSelect(loc.value),
						selected: currentLocale === loc.value,
						isSubmenuItem: true
					}, loc.value))
				})
			})
		]
	});
}
var import_jsx_runtime$7;
var init_LanguageSubmenu = __esmMin((() => {
	require_react();
	init_useI18n();
	init_menu_icons();
	init_MenuItem();
	import_jsx_runtime$7 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/logout-confirm-dialog.ts
/**
* 弹出退出登录二次确认。
*
* 视觉直接用设计系统**标准** `Modal.confirm`，不做任何业务样式覆盖：
* - 无分割线、紧凑标题
* - 右上角 × 关闭出口（`closable` 默认 true，此处显式写出以防后续被误改）
* - 底部 secondary(取消) + primary·danger(退出登录)
*
* 确认按钮走 `okType: 'danger'`（红底白字）：退出登录会中断进行中的任务、
* 且需要重新登录验证才能恢复，属于破坏性操作，不能与普通 primary 同权。
*/
function showLogoutConfirmDialog({ isLocalMode, onConfirm }) {
	Modal.confirm({
		title: t("logout.confirmTitle"),
		content: isLocalMode ? t("logout.confirmContent.local") : t("logout.confirmContent.cloud"),
		okText: t("logout.confirmLogout"),
		cancelText: t("common.cancel"),
		okType: "danger",
		closable: true,
		onOk: () => onConfirm()
	});
}
var init_logout_confirm_dialog = __esmMin((() => {
	init_src();
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/use-credits-redirect-url.ts
async function fetchAndApplyLinks(adapter, forceUpdate, requestGeneration = bootstrapGeneration) {
	if (!adapter.getProductLinks) return;
	try {
		const links = await adapter.getProductLinks(forceUpdate);
		if (requestGeneration !== bootstrapGeneration || sharedAdapter !== adapter) return;
		const nextUrl = links?.creditsRedirectUrl?.trim() || void 0;
		const prevUrl = cachedCreditsRedirectUrl;
		cachedCreditsRedirectUrl = nextUrl;
		cachedResolved = true;
		if (prevUrl === nextUrl && sharedStateListeners.size === 0) return;
		sharedStateListeners.forEach((listener) => {
			try {
				listener(nextUrl);
			} catch {}
		});
	} catch {}
}
function detachSharedAdapterSubscription() {
	if (sharedAdapterUnsubscribe) {
		sharedAdapterUnsubscribe();
		sharedAdapterUnsubscribe = void 0;
	}
}
function ensureSharedSubscription(adapter) {
	if (sharedAdapter === adapter && (sharedAdapterUnsubscribe || sharedBootstrapPromise)) return;
	if (sharedAdapter && sharedAdapter !== adapter) {
		detachSharedAdapterSubscription();
		sharedBootstrapPromise = null;
		bootstrapGeneration += 1;
	}
	sharedAdapter = adapter;
	if (adapter.onProductConfigChanged && !sharedAdapterUnsubscribe) sharedAdapterUnsubscribe = adapter.onProductConfigChanged(() => {
		fetchAndApplyLinks(adapter, true);
	});
	if (adapter.getProductLinks && !sharedBootstrapPromise) {
		const forceUpdate = shouldForceNextBootstrap;
		const requestGeneration = bootstrapGeneration;
		shouldForceNextBootstrap = false;
		sharedBootstrapPromise = fetchAndApplyLinks(adapter, forceUpdate, requestGeneration).finally(() => {
			if (requestGeneration === bootstrapGeneration) sharedBootstrapPromise = null;
		});
	}
}
/**
* 重置「积分跳转链接」Hook 的模块级缓存。
* 用于账号切换（退登/切户），由 App.tsx::resetSessionStates 调用。
* 重置后 hook 会在下次 mount 或 productConfigChanged 触发时重新拉取。
*/
function resetCreditsRedirectUrlCache() {
	const currentAdapter = sharedAdapter;
	detachSharedAdapterSubscription();
	sharedAdapter = void 0;
	sharedBootstrapPromise = null;
	cachedCreditsRedirectUrl = void 0;
	cachedResolved = false;
	shouldForceNextBootstrap = true;
	bootstrapGeneration += 1;
	sharedStateListeners.forEach((listener) => {
		try {
			listener(void 0);
		} catch {}
	});
	if (currentAdapter && sharedStateListeners.size > 0) ensureSharedSubscription(currentAdapter);
}
/**
* 获取「积分余额」菜单点击跳转链接（IOA 等环境通过 productLinks 下发）
*
* @returns
* - `string` 非空：跳转该 URL
* - `undefined`：未配置或未决态，消费端走默认跳转逻辑
*/
function useCreditsRedirectUrl() {
	const adapter = (0, import_react$11.useContext)(AdapterContext);
	const [url, setUrl] = (0, import_react$11.useState)(cachedCreditsRedirectUrl);
	(0, import_react$11.useEffect)(() => {
		if (!adapter?.getProductLinks) return;
		const listener = (nextUrl) => {
			setUrl((prev) => prev === nextUrl ? prev : nextUrl);
		};
		sharedStateListeners.add(listener);
		if (cachedResolved) listener(cachedCreditsRedirectUrl);
		ensureSharedSubscription(adapter);
		return () => {
			sharedStateListeners.delete(listener);
			if (sharedStateListeners.size === 0) {
				detachSharedAdapterSubscription();
				sharedAdapter = void 0;
				sharedBootstrapPromise = null;
				bootstrapGeneration += 1;
			}
		};
	}, [adapter]);
	return url;
}
var import_react$11, cachedCreditsRedirectUrl, cachedResolved, sharedAdapter, sharedAdapterUnsubscribe, sharedBootstrapPromise, shouldForceNextBootstrap, bootstrapGeneration, sharedStateListeners;
var init_use_credits_redirect_url = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	cachedCreditsRedirectUrl = void 0;
	cachedResolved = false;
	sharedBootstrapPromise = null;
	shouldForceNextBootstrap = false;
	bootstrapGeneration = 0;
	sharedStateListeners = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/legacy-appearance-mode-storage.ts
function parseMode(value) {
	if (value === "light" || value === "dark" || value === "auto") return value;
	return null;
}
function readOldGlobalMode(storage) {
	try {
		const raw = storage.getItem(LEGACY_THEME_STORAGE_KEY);
		if (!raw) return null;
		const config = JSON.parse(raw);
		return config.followSystem ? "auto" : parseMode(config.theme ?? null);
	} catch {
		return null;
	}
}
function ensureSnapshot(storage) {
	if (storage.getItem(LEGACY_MODE_SNAPSHOT_KEY) !== null) return;
	const mode = readOldGlobalMode(storage);
	try {
		storage.setItem(LEGACY_MODE_SNAPSHOT_KEY, mode ?? EMPTY_SNAPSHOT);
	} catch {}
}
function ensureLegacyAppearanceModeSnapshot() {
	const storage = window.localStorage;
	if (storage) ensureSnapshot(storage);
}
function buildLegacyAppearanceModeKey(eid, uid, accountType) {
	return `${MODE_KEY_PREFIX}::${accountType ?? "unknown"}::${eid ?? "personal"}::${uid ?? "anonymous"}`;
}
function readLegacyAppearanceMode(eid, uid, accountType) {
	const storage = window.localStorage;
	if (!storage) return null;
	const key = buildLegacyAppearanceModeKey(eid, uid, accountType);
	const scoped = parseMode(storage.getItem(key));
	if (scoped) return scoped;
	if (uid && eid && accountType && accountType !== "personal") {
		const provisional = parseMode(storage.getItem(buildLegacyAppearanceModeKey(void 0, uid, accountType)));
		if (provisional) {
			try {
				storage.setItem(key, provisional);
			} catch {}
			return provisional;
		}
	}
	ensureSnapshot(storage);
	const legacy = parseMode(storage.getItem(LEGACY_MODE_SNAPSHOT_KEY));
	if (legacy) try {
		storage.setItem(key, legacy);
	} catch {}
	return legacy;
}
function writeLegacyAppearanceMode(mode, eid, uid, accountType) {
	try {
		window.localStorage.setItem(buildLegacyAppearanceModeKey(eid, uid, accountType), mode);
	} catch {}
}
var LEGACY_THEME_STORAGE_KEY, MODE_KEY_PREFIX, LEGACY_MODE_SNAPSHOT_KEY, EMPTY_SNAPSHOT;
var init_legacy_appearance_mode_storage = __esmMin((() => {
	init_appearance_storage_namespace();
	LEGACY_THEME_STORAGE_KEY = "agent-ui-theme";
	MODE_KEY_PREFIX = APPEARANCE_MODE_KEY_PREFIX;
	LEGACY_MODE_SNAPSHOT_KEY = `${MODE_KEY_PREFIX}::legacy-snapshot`;
	EMPTY_SNAPSHOT = "none";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/use-appearance-menu-badge.ts
function useAppearanceMenuBadge(enabled) {
	const [badgeVisible, setBadgeVisible] = (0, import_react$10.useState)(false);
	(0, import_react$10.useEffect)(() => {
		setBadgeVisible(false);
		if (!enabled || !isAppCoreReady()) return;
		let disposed = false;
		wb.storage.user.get(BADGE_NAMESPACE, SEEN_KEY, false).then((seen) => {
			if (!disposed) setBadgeVisible(!seen);
		}).catch(() => {});
		return () => {
			disposed = true;
		};
	}, [enabled]);
	return {
		badgeVisible,
		dismissBadge: (0, import_react$10.useCallback)(() => {
			setBadgeVisible(false);
			if (!isAppCoreReady()) return;
			wb.storage.user.set(BADGE_NAMESPACE, SEEN_KEY, true).catch(() => {});
		}, [])
	};
}
var import_react$10, BADGE_NAMESPACE, SEEN_KEY;
var init_use_appearance_menu_badge = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	BADGE_NAMESPACE = "appearanceEntryBadge";
	SEEN_KEY = "menuEntrySeen";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AppearanceMenuItem.tsx
function AppearanceMenuItem({ isLocalMode, openSettings }) {
	const t = useTranslation();
	const { account } = useAccount();
	const { theme, setTheme } = useTheme();
	const featureStatus = useAppearanceFeatureStatus();
	const restoredIdentityRef = (0, import_react$9.useRef)("");
	const uid = account?.uid;
	const eid = account?.enterpriseId;
	const accountType = account?.type;
	const identityKey = uid ? `${accountType ?? ""}::${eid ?? ""}::${uid}` : "";
	const { badgeVisible, dismissBadge } = useAppearanceMenuBadge(isLocalMode && isWorkBuddy() && featureStatus === "enabled");
	(0, import_react$9.useEffect)(() => {
		if (featureStatus !== "disabled") return;
		if (!identityKey || restoredIdentityRef.current === identityKey) return;
		const savedMode = readLegacyAppearanceMode(eid, uid, accountType);
		if (savedMode) setTheme(savedMode);
		restoredIdentityRef.current = identityKey;
	}, [
		accountType,
		eid,
		featureStatus,
		identityKey,
		setTheme,
		uid
	]);
	if (!isLocalMode || !isWorkBuddy()) return null;
	if (featureStatus === "enabled") return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(MenuItem, {
		className: "user-menu-item--appearance",
		icon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AppearanceIcon, {}),
		label: t("account.menu.appearance"),
		onClick: () => {
			dismissBadge();
			openSettings("appearance");
		},
		trackId: "avatar_menu_appearance",
		trackName: "外观设置",
		value: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
			badgeVisible && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { className: "user-menu-item-badge user-menu-item-badge--leading" }),
			t("account.menu.appearanceNew"),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronRightIcon, {})
		] })
	});
	const isDark = theme === "dark" || theme === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
	const applyTheme = (nextTheme) => {
		setTheme(nextTheme);
		if (featureStatus === "disabled") writeLegacyAppearanceMode(nextTheme, eid, uid, accountType);
		if (isAppCoreReady()) getWb().config.setTheme(nextTheme).catch(() => {});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(MenuItem, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AppearanceIcon, {}),
		label: t("account.menu.appearance"),
		trackId: "avatar_menu_appearance",
		trackName: "外观设置",
		value: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
			className: "user-menu-theme-switcher",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { className: `user-menu-theme-switcher-thumb ${isDark ? "user-menu-theme-switcher-thumb--right" : ""}` }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					type: "button",
					className: `user-menu-theme-option ${!isDark ? "user-menu-theme-option--active" : ""}`,
					onClick: (e) => {
						e.stopPropagation();
						if (isDark) applyTheme("light");
					},
					children: t("settings.theme.light")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					type: "button",
					className: `user-menu-theme-option ${isDark ? "user-menu-theme-option--active" : ""}`,
					onClick: (e) => {
						e.stopPropagation();
						if (!isDark) applyTheme("dark");
					},
					children: t("settings.theme.dark")
				})
			]
		})
	});
}
var import_react$9, import_jsx_runtime$6;
var init_AppearanceMenuItem = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_wb_singleton();
	init_account_context();
	init_useI18n();
	init_utils();
	init_environment();
	init_use_appearance_feature();
	init_legacy_appearance_mode_storage();
	init_menu_icons();
	init_MenuItem();
	init_use_appearance_menu_badge();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/credits-display-state.ts
/**
* 根据获取状态和数值计算展示态。
*
* @param fetchStatus 当前获取状态
* @param rawUsageLeft 当前 billingAccount 上的 usageLeft 原始字符串（可能为空，企业不限量时为 'unlimited'）
* @param lowThreshold 判定低积分的阈值
*/
function resolveCreditsDisplayState(fetchStatus, rawUsageLeft, lowThreshold) {
	if (fetchStatus === "success" && rawUsageLeft === "unlimited") return { kind: "unlimited" };
	const numericValue = rawUsageLeft != null && rawUsageLeft !== "" ? typeof rawUsageLeft === "number" ? rawUsageLeft : parseFloat(String(rawUsageLeft)) : null;
	if (fetchStatus === "error") {
		if (rawUsageLeft === "unlimited") return { kind: "unlimited" };
		if (numericValue != null && !Number.isNaN(numericValue)) return {
			kind: "stale",
			value: numericValue
		};
		return { kind: "failed-no-cache" };
	}
	if (fetchStatus === "success" && numericValue != null && !Number.isNaN(numericValue)) return {
		kind: "success",
		value: numericValue,
		isLow: numericValue < lowThreshold
	};
	return { kind: "loading" };
}
/**
* 低积分警告是否应展示（仅在数据可信时触发，避免把获取失败误报为积分归零）
*/
function shouldShowLowCreditsWarning(state) {
	return state.kind === "success" && state.isLow;
}
var UNLIMITED_SENTINEL;
var init_credits_display_state = __esmMin((() => {
	UNLIMITED_SENTINEL = "unlimited";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/CreditsMenuItem.tsx
/** 主窗与独立窗口共享的积分余额菜单行。 */
function CreditsMenuItem({ showBalance, usageLeft, fetchStatus, isRefreshing = false, onRefresh, onBuyCredits, onClick }) {
	const t = useTranslation();
	const creditsState = resolveCreditsDisplayState(fetchStatus, usageLeft, 0);
	const renderValue = () => {
		switch (creditsState.kind) {
			case "stale": return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
				content: t("account.credits.staleDesc"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
					className: "user-menu-credits-value-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: formatNumber(creditsState.value) }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "user-menu-credits-status user-menu-credits-status--stale",
						children: t("account.credits.stale")
					})]
				})
			});
			case "failed-no-cache": return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
				content: t("account.credits.fetchFailedDesc"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
					className: "user-menu-credits-status user-menu-credits-status--failed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CreditsErrorIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: t("account.credits.fetchFailed") })]
				})
			});
			case "success": return formatNumber(creditsState.value);
			case "unlimited": return t("account.credits.unlimited");
			case "loading": return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
				content: t("account.credits.fetchLoadingDesc"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
					className: "user-menu-credits-status user-menu-credits-status--loading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CreditsLoadingIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: t("account.credits.fetchLoading") })]
				})
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(MenuItem, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CreditsIcon, {}),
		label: showBalance ? t("account.menu.credits") : t("account.menu.viewCredits"),
		value: showBalance ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
			onRefresh && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				className: (0, import_classnames.default)("user-menu-credits-refresh", { "is-loading": isRefreshing }),
				onClick: (event) => {
					event.stopPropagation();
					if (!isRefreshing) onRefresh();
				},
				disabled: isRefreshing,
				title: t("account.credits.refresh"),
				"aria-label": t("account.credits.refresh"),
				type: "button",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(RefreshIcon, {})
			}),
			renderValue(),
			onBuyCredits ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Button, {
				variant: "primary",
				size: "small",
				onClick: (event) => {
					event.stopPropagation();
					onBuyCredits();
				},
				children: t("subscriptionUsage.buyCredits")
			}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ChevronRightIcon, {})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ChevronRightIcon, {}),
		onClick,
		className: "user-menu-item--billing-credits",
		trackId: "avatar_menu_view_credit",
		trackName: "积分余额"
	});
}
var import_classnames, import_jsx_runtime$5;
var init_CreditsMenuItem = __esmMin((() => {
	init_src$1();
	init_src();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_useI18n();
	init_utils();
	init_credits_display_state();
	init_menu_icons();
	init_MenuItem();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/DesktopAccountMenuItems.tsx
/**
* Desktop 主窗与 Office 独立窗共用的账号菜单顺序和基础交互。
*
* 套餐、签到、积分、用量和成长运营位由宿主组成 billingItems；固定菜单项在这里
* 统一名称、图标、埋点与顺序，避免两个窗口各维护一份 JSX。
*/
function DesktopAccountMenuItems({ billingItems, settingsValue, showMemory = false, appearanceItem, showHelpFeedback = false, showCheckForUpdates = false, openSettings, onOpenFeedback, onCheckForUpdates }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
		billingItems,
		billingItems && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MenuItem, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SettingsIcon, {}),
			label: t("account.menu.clawSettings"),
			value: settingsValue,
			onClick: () => openSettings("settings"),
			trackId: "settings_system_entry",
			trackName: "系统设置"
		}),
		showMemory && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MenuItem, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MoreMenuInspirationIcon, {}),
			label: t("account.menu.memory"),
			onClick: () => openSettings("memory"),
			trackId: "settings_memory_entry",
			trackName: "记忆与进化"
		}),
		appearanceItem,
		showHelpFeedback && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MenuItem, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(HelpFeedbackIcon, {}),
			label: t("account.menu.helpFeedback"),
			onClick: onOpenFeedback,
			trackId: "avatar_menu_feedback",
			trackName: "帮助与反馈"
		}),
		showCheckForUpdates && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MenuItem, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CheckUpdateIcon, {}),
			label: t("account.menu.checkForUpdates"),
			onClick: onCheckForUpdates
		})
	] });
}
var import_jsx_runtime$4;
var init_DesktopAccountMenuItems = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_menu_icons();
	init_MenuItem();
	init_MenuSeparator();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/PlanActionButton.tsx
/**
* 根据账号类型和版本显示对应的操作按钮
* - 个人用户 + Free/Pro Trial → 显示 "Upgrade"
* - 海外版 + Pro → 不显示（已是可售最高档）
* - 其他情况不显示
*/
function PlanActionButton({ account, size = "medium", variant = "primary", className }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { reportEvent, Events } = useAgentTelemetry();
	const isPersonalUser = account.type === "personal";
	const isFree = !account.editionType || account.editionType === "free";
	const isProTrial = account.editionType === "pro_trial";
	const isPro = account.editionType === "pro";
	const isYouth = account.editionType === "youth";
	const isAdvanced = account.editionType === "advanced";
	const isFlagship = account.editionType === "flagship";
	const hasPaidPlan = isPro || isYouth || isAdvanced || isFlagship;
	const isOversea = useInternationalBillingFeature() || isInternationalVersion();
	/** 获取当前订阅版本用于埋点 */
	const getPlanType = () => {
		if (isFlagship) return "flagship";
		if (isAdvanced) return "advanced";
		if (isProTrial) return "pro_trial";
		if (isPro) return isOversea ? "pro" : "standard";
		if (isYouth) return "youth";
		return "free";
	};
	const handleUpgrade = (e) => {
		e.stopPropagation();
		let isSuccessful = true;
		try {
			openPlanUpgrade({
				source: "upgrade",
				adapter
			});
		} catch {
			isSuccessful = false;
		}
		reportEvent(Events.SubscribeEntryClick, {
			action: "upgrade",
			type: getPlanType(),
			isSuccessful
		});
	};
	const handleManage = (e) => {
		e.stopPropagation();
		let isSuccessful = true;
		try {
			openPlanUpgrade({
				source: "renew",
				adapter
			});
		} catch {
			isSuccessful = false;
		}
		reportEvent(Events.SubscribeEntryClick, {
			action: isOversea ? "buy_credits" : "manage",
			type: getPlanType(),
			isSuccessful
		});
	};
	if (!isPersonalUser) return null;
	if (isOversea && isPro) return null;
	if (isFree || isProTrial) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
		variant,
		size,
		className,
		onClick: handleUpgrade,
		children: t("account.upgrade")
	});
	if (isFlagship) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
		variant,
		size,
		className,
		onClick: handleManage,
		children: isOversea ? t("account.buyExtra") : t("account.subscriptionManage")
	});
	if (hasPaidPlan) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
		variant,
		size,
		className,
		onClick: handleUpgrade,
		children: isOversea ? t("account.buyExtra") : t("account.upgrade")
	});
	return null;
}
var import_jsx_runtime$3;
var init_PlanActionButton = __esmMin((() => {
	init_src();
	require_react();
	init_contexts();
	init_product_features();
	init_useI18n();
	init_telemetry_context();
	init_environment();
	init_plan_upgrade();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/MenuItems.tsx
function MenuItems({ isLocalMode, isCloudMode = false, isDesktopOnly = false, openSettings, onOpenFeedback, onNavigate, renderLanguageMenuItem, renderWecomMenuItem, onCheckForUpdates, account, creditsFetchStatus = "loading", checkinShouldShow, checkinIsClaimed, checkinTodayCredit = 0, checkinStreakDays = 0, checkinNextStreakDay = 0, checkinTodayCheckedIn = false, checkinIsStreakDay = false, checkinClaimResult, checkinStreakBonusDays = 7, checkinStreakBonusCredit = 1e3, checkinTotalCredits, checkinEndTime, checkinActivityName, checkinThemeName, checkinSeason, checkinClaimButtonText, checkinActionButton, checkinClaiming = false, onCheckinClaim, checkinData, onRefreshCredits, isRefreshingCredits = false, onBuyCredits, onReopenBubble }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { hasBilling } = useAuth();
	const openSettingsBinding = getCurrentBinding("open-settings");
	const openSettingsShortcut = openSettingsBinding ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
		className: "user-menu-item-shortcut",
		children: formatShortcutCompact(openSettingsBinding)
	}) : void 0;
	const helpFeedbackEnabled = useHelpFeedbackFeature();
	const memoryPersonalizationEnabled = useMemoryPersonalizationFeature();
	const isVersionShowNameEnabled = useProductFeature("DisableVersionShowName");
	const isCreditsEntryEnabled = useCreditsEntryFeature();
	const subscriptionUsageEntryEnabled = useSubscriptionUsageEntryFeature();
	const showCreditsBalance = useShowCreditsBalanceFeature() !== false;
	const creditsRedirectUrl = useCreditsRedirectUrl();
	/**
	* editionType 粘性保留（与下方 usageLeft 同一范式）。
	*
	* editionType == null 是「未决态」而非「免费版」：Desktop 先把 daemon 返回的裸 account
	* 写进 accountService，editionType 由计费接口异步补齐；而每次打开菜单都会重新刷一遍账号，
	* 期间 account 会短暂不带 editionType。裸读会落到 getEditionConfig 的 `|| 'free'` 兜底，
	* 付费用户先看到 Free 再跳成 Pro，反复开合还会让这一行状态来回抖。
	* 因此只在拿到有效值时更新，account 不带 editionType 时保留上次已知版本。
	*/
	const [editionType, setEditionType] = (0, import_react$5.useState)(account?.editionType);
	(0, import_react$5.useEffect)(() => {
		if (account?.editionType != null) setEditionType(account.editionType);
	}, [account]);
	const isEditionPending = !!account && editionType == null;
	const editionConfig = getEditionConfig(editionType);
	const canBuyCredits = editionType != null && editionType !== "free";
	const showBilling = (!isLocalMode || isWorkBuddy()) && account && hasBilling;
	const isIOA = isIOAUser(account?.enterpriseId ?? "");
	const isPersonalUser = !!account && !account.enterpriseId;
	const [usageLeft, setUsageLeft] = (0, import_react$5.useState)(account?.usageLeft != null ? account.usageLeft : null);
	(0, import_react$5.useEffect)(() => {
		if (account?.usageLeft != null) setUsageLeft(account.usageLeft);
	}, [account]);
	const [, setShowWorkBuddyBanner] = (0, import_react$5.useState)(false);
	const enterpriseConsoleEnabled = useEnterpriseConsoleFeature();
	(0, import_react$5.useEffect)(() => {
		if (!isWorkBuddy() || !adapter?.getProductFeatures) return;
		let cancelled = false;
		adapter.getProductFeatures().then((features) => {
			if (!cancelled && features?.WorkBuddyBanner && !isIOA) setShowWorkBuddyBanner(true);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter]);
	const handleCreditsClick = () => {
		if (isRefreshingCredits) return;
		if (creditsRedirectUrl) {
			adapter?.emit("open-external", creditsRedirectUrl);
			return;
		}
		openSettings(isPersonalUser && subscriptionUsageEntryEnabled ? "subscriptionUsage" : "account");
	};
	const showUsageEntry = useShowUsageEntryFeature();
	const handleUsageClick = async () => {
		try {
			const endpoint = (await adapter?.getProductConfiguration?.())?.endpoint?.replace(/\/+$/, "");
			const target = endpoint ? `${endpoint}/profile/usage` : getWebsiteUrl("/profile/usage");
			adapter?.emit("open-external", target);
		} catch {
			adapter?.emit("open-external", getWebsiteUrl("/profile/usage"));
		}
	};
	const handleAdminConsoleClick = () => {
		adapter?.emit("open-external", "https://tencent.sso.copilot.tencent.com/admin/overview");
	};
	const showAdminConsole = isIOA && !!account?.enterpriseId && enterpriseConsoleEnabled;
	const handlePlanRowClick = () => {
		openSettings("account");
	};
	const planAccount = account && editionType != null ? {
		...account,
		editionType
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "user-menu-items",
		children: [
			showBilling && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
				isVersionShowNameEnabled && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuItem, {
					icon: showAdminConsole ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(EnterpriseIcon, {}) : isPersonalUser ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(PersonalIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(EnterpriseIcon, {}),
					label: showAdminConsole ? t("account.enterpriseEdition") : isEditionPending ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", {
						className: "user-menu-credits-status user-menu-credits-status--loading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CreditsLoadingIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("account.credits.fetchLoading") })]
					}) : editionConfig.label,
					value: showAdminConsole ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [t("account.menu.adminConsole"), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChevronRightIcon, {})] }) : planAccount ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(PlanActionButton, {
						size: "small",
						account: planAccount
					}) : void 0,
					onClick: showAdminConsole ? handleAdminConsoleClick : handlePlanRowClick,
					className: "user-menu-item--billing-plan"
				}),
				isCreditsEntryEnabled && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CreditsMenuItem, {
					showBalance: showCreditsBalance,
					usageLeft,
					fetchStatus: creditsFetchStatus,
					isRefreshing: isRefreshingCredits,
					onRefresh: onRefreshCredits,
					onBuyCredits: onBuyCredits && canBuyCredits ? onBuyCredits : void 0,
					onClick: handleCreditsClick
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuSigninSlot, {
					checkinData,
					onCheckinClaim,
					onNavigate,
					onReopenBubble
				}),
				showUsageEntry && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuItem, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(UsageIcon, {}),
					label: t("account.menu.usage"),
					value: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChevronRightIcon, {}),
					onClick: handleUsageClick,
					className: "user-menu-item--billing-usage",
					trackId: "avatar_menu_view_usage",
					trackName: "用量"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuGrowthSlot, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuSeparator, {})
			] }),
			!isLocalMode && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuItem, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(PersonalIcon, {}),
				label: t("account.menu.account"),
				onClick: () => openSettings("account")
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MenuItem, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SettingsIcon, {}),
				label: t("account.menu.settings"),
				value: openSettingsShortcut,
				onClick: () => openSettings("settings")
			})] }),
			isLocalMode && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DesktopAccountMenuItems, {
				settingsValue: openSettingsShortcut,
				showMemory: isDesktopOnly && memoryPersonalizationEnabled,
				appearanceItem: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AppearanceMenuItem, {
					isLocalMode,
					openSettings
				}),
				showHelpFeedback: isDesktopOnly && helpFeedbackEnabled,
				showCheckForUpdates: isDesktopOnly && !!onCheckForUpdates,
				openSettings,
				onOpenFeedback,
				onCheckForUpdates
			})
		]
	});
}
var import_react$5, import_jsx_runtime$2;
var init_MenuItems = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_auth_context();
	init_product_features();
	init_use_credits_redirect_url();
	init_use_help_feedback_feature();
	init_use_memory_personalization_feature();
	init_use_product_feature();
	init_useI18n();
	init_utils$1();
	init_slot();
	init_environment();
	init_keyboard_shortcuts();
	init_AppearanceMenuItem();
	init_CreditsMenuItem();
	init_DesktopAccountMenuItems();
	init_edition_config();
	init_menu_icons();
	init_MenuItem();
	init_MenuSeparator();
	init_PlanActionButton();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/useAmbassadorStatus.ts
/**
* 获取当前用户是否为大使
*
* - 在账号就绪后调用一次 GET /console/activity/ambassador/status
* - 当账号变化时自动重新拉取
*
* @param adapter AgentAdapter 实例
* @param accountId 当前账号 ID，未登录时为空
* @returns isAmbassador 是否为大使
*/
function useAmbassadorStatus(adapter, accountId) {
	const [isAmbassador, setIsAmbassador] = (0, import_react$4.useState)(false);
	(0, import_react$4.useEffect)(() => {
		if (!accountId || !adapter?.getAmbassadorStatus) {
			setIsAmbassador(false);
			return;
		}
		let cancelled = false;
		adapter.getAmbassadorStatus().then((result) => {
			if (!cancelled) setIsAmbassador(result?.isAmbassador ?? false);
		}).catch((error) => {
			if (!cancelled) setIsAmbassador(false);
			console.error("[AmbassadorStatus] Failed to fetch ambassador status:", error);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter, accountId]);
	return isAmbassador;
}
var import_react$4;
var init_useAmbassadorStatus = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/useCheckinService.ts
function isCheckinClaimError(result) {
	return "code" in result && "msg" in result && !("credit" in result);
}
/**
* 用 claim 成功结果合成"今日已领取"状态。
*
* ⚠️ prev 为 null 时**必须**造出一个新的 status，不能沿用 null：
* getCheckinStatus 超时 / 返回空时 status 就是 null（线上 15s 超时是常态），
* 此时若成功分支不写 status，`status?.today_checked_in` 守卫永远为假，
* 用户再点一次就会重复发起 claim → 第二次超时 → 弹"领取失败"却已经领到了。
*/
function mergeClaimedStatus(prev, result) {
	return {
		...prev ?? {
			active: true,
			today_checked_in: false,
			streak_days: 0,
			daily_credit: result.credit,
			today_credit: result.credit,
			is_streak_day: false,
			next_streak_day: 0,
			checkin_dates: []
		},
		today_checked_in: true,
		streak_days: result.streak_days,
		is_streak_day: result.is_streak_day,
		today_credit: result.credit
	};
}
function useCheckinService(isLoggedIn, isPersonalUser, hasBillingAccess, adapter, accountUid) {
	const checkinEnabled = useCheckinFeature();
	const [status, setStatus] = (0, import_react$3.useState)(null);
	const [uiState, setUiState] = (0, import_react$3.useState)("loading");
	const [claimResult, setClaimResult] = (0, import_react$3.useState)(null);
	/**
	* "领取成功"事件计数器：仅在 claim 接口真正成功时自增。
	*
	* 不能用 claimResult 代替 —— 它同时是展示数据，refreshStatus() 每次拉到 active 都会
	* 用新对象覆盖，作为 effect 依赖会被引用变化误触发（曾导致每次签到状态刷新都连带
	* 请求一次 get-user-resource）。
	*/
	const [claimSuccessSeq, setClaimSuccessSeq] = (0, import_react$3.useState)(0);
	/**
	* 全局 claim 进行中标识：bubble / banner 等多个签到 UI 入口共享。
	* 任意入口触发签到都会置 true，等接口返回（成功或失败）才置回 false，
	* 这样不论用户从哪一个入口点击"立即领取"，所有入口的按钮都同步进入 loading 不可点击状态。
	*/
	const [claiming, setClaiming] = (0, import_react$3.useState)(false);
	const mountedRef = (0, import_react$3.useRef)(true);
	const claimPromiseRef = (0, import_react$3.useRef)(null);
	const latestAccountUidRef = (0, import_react$3.useRef)(accountUid);
	latestAccountUidRef.current = accountUid;
	const requestSeqRef = (0, import_react$3.useRef)(0);
	const lastVisibilityRefreshAtRef = (0, import_react$3.useRef)(0);
	/**
	* status 的同步镜像：handleClaim 的守卫必须读它，不能读 render 闭包里的 status。
	* 闭包值是上一次 render 的快照，claim 成功到 re-render 之间的连点会读到旧值而放行重复请求。
	*/
	const statusRef = (0, import_react$3.useRef)(null);
	/** status 唯一写入口：state（驱动渲染）与 ref（供守卫同步读取）双写，避免两者漂移 */
	const applyStatus = (0, import_react$3.useCallback)((next) => {
		const resolved = typeof next === "function" ? next(statusRef.current) : next;
		statusRef.current = resolved;
		setStatus(resolved);
	}, []);
	const resetCheckinState = (0, import_react$3.useCallback)((nextUiState = "loading") => {
		applyStatus(null);
		setClaimResult(null);
		setClaimSuccessSeq(0);
		setClaiming(false);
		setUiState(nextUiState);
		claimPromiseRef.current = null;
	}, [applyStatus]);
	const checkinLog = (0, import_react$3.useCallback)((level, message, data) => {
		const tag = `[Checkin] ${message}`;
		if (level === "error") console.error(tag, data ?? "");
		else if (level === "warn") console.warn(tag, data ?? "");
		else console.info(tag, data ?? "");
		adapter?.logQueueDiag?.(level, tag, data);
	}, [adapter]);
	const fetchCheckinStatus = (0, import_react$3.useCallback)(async () => {
		if (!adapter?.getCheckinStatus) {
			checkinLog("warn", "fetchCheckinStatus skipped: adapter or getCheckinStatus not available");
			return null;
		}
		const startedAt = Date.now();
		checkinLog("info", "fetchCheckinStatus start");
		try {
			const data = await adapter.getCheckinStatus();
			checkinLog("info", "fetchCheckinStatus success", {
				costMs: Date.now() - startedAt,
				active: data?.active,
				today_checked_in: data?.today_checked_in,
				streak_days: data?.streak_days,
				is_streak_day: data?.is_streak_day,
				next_streak_day: data?.next_streak_day,
				today_credit: data?.today_credit,
				streak_bonus_days: data?.streak_bonus_days,
				streak_bonus_credit: data?.streak_bonus_credit
			});
			return data;
		} catch (error) {
			checkinLog("error", "fetchCheckinStatus failed", {
				costMs: Date.now() - startedAt,
				error: String(error)
			});
			return null;
		}
	}, [adapter, checkinLog]);
	const claimDailyCheckin = (0, import_react$3.useCallback)(async () => {
		if (!adapter?.claimDailyCheckin) {
			checkinLog("error", "claimDailyCheckin aborted: adapter or claimDailyCheckin not available");
			throw new Error("adapter or claimDailyCheckin not available");
		}
		const startedAt = Date.now();
		checkinLog("info", "claimDailyCheckin request start");
		try {
			const result = await adapter.claimDailyCheckin();
			if (isCheckinClaimError(result)) checkinLog("warn", "claimDailyCheckin returned business error", {
				costMs: Date.now() - startedAt,
				code: result.code,
				msg: result.msg
			});
			else checkinLog("info", "claimDailyCheckin success", {
				costMs: Date.now() - startedAt,
				credit: result.credit,
				streak_days: result.streak_days,
				is_streak_day: result.is_streak_day
			});
			return result;
		} catch (error) {
			checkinLog("error", "claimDailyCheckin threw exception", {
				costMs: Date.now() - startedAt,
				error: String(error)
			});
			throw error;
		}
	}, [adapter, checkinLog]);
	const refreshStatus = (0, import_react$3.useCallback)(async () => {
		if (!isLoggedIn || !isPersonalUser || !hasBillingAccess || !checkinEnabled) {
			checkinLog("info", "refreshStatus skipped: feature not applicable", {
				isLoggedIn,
				isPersonalUser,
				hasBillingAccess,
				checkinEnabled
			});
			setUiState("inactive");
			return null;
		}
		checkinLog("info", "refreshStatus start", { accountUid });
		const requestAccountUid = accountUid;
		const requestSeq = ++requestSeqRef.current;
		const data = await fetchCheckinStatus();
		if (!mountedRef.current) {
			checkinLog("info", "refreshStatus aborted: component unmounted");
			return null;
		}
		if (latestAccountUidRef.current !== requestAccountUid || requestSeqRef.current !== requestSeq) {
			checkinLog("info", "refreshStatus ignored: stale account/request", {
				requestAccountUid,
				latestAccountUid: latestAccountUidRef.current,
				requestSeq,
				latestSeq: requestSeqRef.current
			});
			return null;
		}
		if (!data) {
			if (statusRef.current) {
				checkinLog("warn", "refreshStatus: empty response, keep previous status", { today_checked_in: statusRef.current.today_checked_in });
				return null;
			}
			checkinLog("info", "refreshStatus -> inactive", { hasData: false });
			applyStatus(null);
			setUiState("inactive");
			return null;
		}
		if (!data.active) {
			checkinLog("info", "refreshStatus -> inactive", {
				hasData: true,
				active: data.active
			});
			applyStatus(null);
			setUiState("inactive");
			return null;
		}
		applyStatus(data);
		const nextUiState = data.today_checked_in ? "claimed" : "available";
		checkinLog("info", "refreshStatus -> active", {
			uiState: nextUiState,
			today_checked_in: data.today_checked_in,
			streak_days: data.streak_days,
			is_streak_day: data.is_streak_day
		});
		setUiState(nextUiState);
		setClaimResult({
			credit: data.today_credit,
			/** 签到后的连续签到天数 */
			streak_days: data.streak_days,
			/** 本次签到是否为连续签到奖励日 */
			is_streak_day: data.is_streak_day
		});
		return data;
	}, [
		accountUid,
		isLoggedIn,
		isPersonalUser,
		hasBillingAccess,
		checkinEnabled,
		fetchCheckinStatus,
		checkinLog,
		applyStatus
	]);
	(0, import_react$3.useEffect)(() => {
		mountedRef.current = true;
		requestSeqRef.current += 1;
		if (!isLoggedIn || !accountUid || !isPersonalUser || !hasBillingAccess || !checkinEnabled) {
			resetCheckinState("inactive");
			return;
		}
		resetCheckinState("loading");
		refreshStatus();
		const VISIBILITY_REFRESH_THROTTLE_MS = 3e4;
		const refreshOnVisible = () => {
			if (!mountedRef.current) return;
			const now = Date.now();
			if (now - lastVisibilityRefreshAtRef.current < VISIBILITY_REFRESH_THROTTLE_MS) return;
			lastVisibilityRefreshAtRef.current = now;
			checkinLog("info", "refresh triggered by window focus / page visible");
			refreshStatus().catch((error) => {
				checkinLog("warn", "refreshStatus on visible failed (ignored)", { error: String(error) });
			});
		};
		const handleFocus = () => refreshOnVisible();
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") refreshOnVisible();
		};
		window.addEventListener("focus", handleFocus);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			mountedRef.current = false;
			requestSeqRef.current += 1;
			window.removeEventListener("focus", handleFocus);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [
		accountUid,
		isLoggedIn,
		isPersonalUser,
		hasBillingAccess,
		checkinEnabled,
		refreshStatus,
		resetCheckinState,
		checkinLog
	]);
	const handleClaim = (0, import_react$3.useCallback)(async () => {
		const latestStatus = statusRef.current;
		if (latestStatus?.today_checked_in) {
			checkinLog("info", "handleClaim skipped: today already checked in", {
				streak_days: latestStatus.streak_days,
				today_credit: latestStatus.today_credit
			});
			return null;
		}
		if (claimPromiseRef.current) {
			checkinLog("info", "handleClaim skipped: claim already in-flight, returning pending promise");
			return claimPromiseRef.current;
		}
		checkinLog("info", "handleClaim triggered", {
			uiState,
			streak_days: latestStatus?.streak_days,
			next_streak_day: latestStatus?.next_streak_day,
			today_credit: latestStatus?.today_credit
		});
		setClaiming(true);
		const claimAccountUid = accountUid;
		const claimSeq = ++requestSeqRef.current;
		const isStaleClaim = () => latestAccountUidRef.current !== claimAccountUid || requestSeqRef.current !== claimSeq;
		const claimPromise = (async () => {
			const result = await claimDailyCheckin();
			if (isStaleClaim()) {
				checkinLog("info", "handleClaim ignored: stale account/request", {
					claimAccountUid,
					latestAccountUid: latestAccountUidRef.current,
					claimSeq,
					latestSeq: requestSeqRef.current
				});
				return null;
			}
			if (isCheckinClaimError(result)) {
				checkinLog("warn", "handleClaim received business error", {
					code: result.code,
					msg: result.msg
				});
				if (mountedRef.current) refreshStatus().catch((error) => {
					checkinLog("warn", "background refreshStatus after claim business error failed (ignored)", { error: String(error) });
				});
				return result;
			}
			if (!mountedRef.current) {
				checkinLog("info", "handleClaim completed after unmount, skip state update", {
					credit: result.credit,
					streak_days: result.streak_days
				});
				return result;
			}
			setClaimResult(result);
			setUiState("claimed");
			setClaimSuccessSeq((seq) => seq + 1);
			applyStatus((prev) => mergeClaimedStatus(prev, result));
			dismissCreditsInsufficientOnRecovered();
			checkinLog("info", "handleClaim applied local state, will refresh from server in background", {
				credit: result.credit,
				streak_days: result.streak_days,
				is_streak_day: result.is_streak_day
			});
			refreshStatus().catch((error) => {
				checkinLog("warn", "background refreshStatus after claim failed (ignored)", { error: String(error) });
			});
			return result;
		})();
		claimPromiseRef.current = claimPromise;
		try {
			return await claimPromise;
		} catch (error) {
			checkinLog("error", "handleClaim unexpected error", { error: String(error) });
			if (mountedRef.current) refreshStatus().catch((refreshErr) => {
				checkinLog("warn", "refreshStatus after claim error failed (ignored)", { error: String(refreshErr) });
			});
			throw error;
		} finally {
			claimPromiseRef.current = null;
			if (mountedRef.current) setClaiming(false);
		}
	}, [
		accountUid,
		uiState,
		claimDailyCheckin,
		refreshStatus,
		checkinLog,
		applyStatus
	]);
	/** 是否应该展示签到入口 */
	const shouldShow = uiState === "available" && checkinEnabled;
	/** 是否已领取（用于判断 claimed 后隐藏） */
	const isClaimed = uiState === "claimed";
	/** 今日可领取的 credits */
	const todayCredit = status?.today_credit ?? 0;
	/** 连续签到天数 */
	const streakDays = status?.streak_days ?? 0;
	return {
		status,
		uiState,
		claimResult,
		/** 领取成功计数器（单调递增，0 = 尚未成功领取过） */
		claimSuccessSeq,
		shouldShow,
		isClaimed,
		todayCredit,
		streakDays,
		nextStreakDay: status?.next_streak_day ?? 0,
		todayCheckedIn: !!status?.today_checked_in,
		isStreakDay: !!status?.is_streak_day,
		streakBonusDays: status?.streak_bonus_days ?? 7,
		streakBonusCredit: status?.streak_bonus_credit ?? 1e3,
		totalCredits: status?.total_credits ?? streakDays * todayCredit,
		endTime: status?.end_time,
		startTime: status?.start_time,
		themeName: status?.theme_name,
		season: status?.season,
		activityName: status?.activity_name,
		claimButtonText: status?.claim_button_text,
		actionButton: status?.action_button,
		/** 是否正在领取中（bubble / banner 共享，用于按钮 loading 态） */
		claiming,
		handleClaim,
		refreshStatus
	};
}
var import_react$3;
var init_useCheckinService = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_product_features();
	init_credits_insufficient_events();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/useUserMenu.tsx
function useUserMenu({ adapter, locale, isLocalMode }) {
	const [isOpen, setIsOpen] = (0, import_react$2.useState)(false);
	const [isLoggingIn, setIsLoggingIn] = (0, import_react$2.useState)(false);
	const [showLanguageSubmenu, setShowLanguageSubmenu] = (0, import_react$2.useState)(false);
	const [showWecomSubmenu, setShowWecomSubmenu] = (0, import_react$2.useState)(false);
	const [wecomConnected, setWecomConnected] = (0, import_react$2.useState)(false);
	const menuRef = (0, import_react$2.useRef)(null);
	const triggerRef = (0, import_react$2.useRef)(null);
	const { setAccount } = useAccount();
	const { logout } = useAuth();
	const handleLoginError = useLoginErrorHandler(adapter);
	(0, import_react$2.useEffect)(() => {
		if (!isLocalMode) return;
		const unsubscribe = adapter.on("wecom-status-response", (data) => {
			if (typeof data === "string") setWecomConnected(data === "connected");
			else if (typeof data === "boolean") setWecomConnected(data);
		});
		adapter.emit(WECOM_STATUS_EVENT);
		return unsubscribe;
	}, [adapter, isLocalMode]);
	/**
	* 清理「从菜单内拖到菜单外」残留的跨容器文本选区（Issue #92420）。
	*
	* 菜单项虽是 role=button 的控件，内部文案仍会被原生选区命中。用户在菜单项上
	* 按住左键拖到菜单外释放时，Chromium 会把选区从菜单一路延伸到 body，把侧栏、
	* 资料库、右侧列表全部框进同一个 Range。
	*
	* 只拦「起手在菜单内、释放在菜单外」这一种组合。浮层外点/ESC 关闭改由
	* AccountMenuPopover 的 useDismiss 处理。
	*/
	(0, import_react$2.useEffect)(() => {
		if (!isOpen) return;
		let draggingFromMenu = false;
		const isInsideMenu = (node) => {
			if (!node) return false;
			const el = node instanceof Element ? node : node.parentElement;
			if (!el) return false;
			return !!el.closest("[data-account-menu-panel=\"true\"], .user-menu-trigger, .user-menu-trigger-wrapper");
		};
		const endDragTracking = () => {
			draggingFromMenu = false;
			document.documentElement.classList.remove(MENU_DRAG_SELECT_CLASS);
		};
		const clearStraySelection = () => {
			const selection = window.getSelection();
			if (!selection || selection.isCollapsed) return;
			selection.removeAllRanges();
		};
		const handlePointerDown = (event) => {
			if (event.button !== 0) {
				endDragTracking();
				return;
			}
			draggingFromMenu = isInsideMenu(event.target);
			if (draggingFromMenu) document.documentElement.classList.add(MENU_DRAG_SELECT_CLASS);
		};
		const handlePointerUp = (event) => {
			if (!draggingFromMenu) return;
			const releasedInsideMenu = isInsideMenu(event.target);
			endDragTracking();
			if (releasedInsideMenu) return;
			clearStraySelection();
		};
		const handlePointerCancel = () => {
			if (!draggingFromMenu) return;
			endDragTracking();
			clearStraySelection();
		};
		const handleWindowBlur = () => {
			if (!draggingFromMenu) return;
			endDragTracking();
			clearStraySelection();
		};
		document.addEventListener("pointerdown", handlePointerDown, true);
		window.addEventListener("pointerup", handlePointerUp, true);
		window.addEventListener("pointercancel", handlePointerCancel, true);
		window.addEventListener("blur", handleWindowBlur);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, true);
			window.removeEventListener("pointerup", handlePointerUp, true);
			window.removeEventListener("pointercancel", handlePointerCancel, true);
			window.removeEventListener("blur", handleWindowBlur);
			document.documentElement.classList.remove(MENU_DRAG_SELECT_CLASS);
		};
	}, [isOpen]);
	const handleLogin = async () => {
		setIsLoggingIn(true);
		try {
			await adapter.login();
			const accountInfo = await adapter.getAccount();
			if (accountInfo) setAccount(accountInfo);
		} catch (error) {
			handleLoginError(error, "UserMenu");
		} finally {
			setIsLoggingIn(false);
		}
	};
	/**
	* 关闭用户菜单。
	*
	* 退出登录的"确认弹窗"现在由 UserMenu 组件用命令式 `Modal.confirm({...})` 触发，
	* 不再走 hook 内的 `showLogoutConfirm` state（参考 antd Modal.confirm 设计）。
	* 这里只负责把菜单收起；真正执行登出走 `executeLogout`。
	*/
	const closeMenu = () => {
		setIsOpen(false);
	};
	/** 真正执行登出（命令式确认弹窗里的 onOk 调用） */
	const executeLogout = async () => {
		await logout();
	};
	const handleMenuItemClick = (action) => {
		setIsOpen(false);
		action();
	};
	const handleWecomStart = () => {
		adapter.emit(WECOM_START_EVENT);
		setWecomConnected(true);
	};
	const handleWecomStop = () => {
		adapter.emit(WECOM_STOP_EVENT);
		setWecomConnected(false);
	};
	const handleCheckForUpdates = () => {
		triggerCheckForUpdates();
	};
	const getCurrentLanguageDisplayName = () => {
		if (locale === "en") return "English";
		if (locale === "zh-tw") return "繁體中文";
		if (locale === "pt-br") return "Português (Brasil)";
		if (locale === "id-id") return "Bahasa Indonesia";
		return "简体中文";
	};
	const handleLanguageSelect = async (selectedLocale) => {
		if (selectedLocale === locale) return;
		const previousLocale = getLocale();
		const result = await setLocaleAsync(selectedLocale);
		if (result === "superseded") return;
		if (result === "failed") {
			toast.error(t("settings.language.changeFailed"));
			return;
		}
		const persistedLocale = toStorageLocale(selectedLocale);
		const previousPersistedLocale = toStorageLocale(previousLocale);
		try {
			await persistLocaleToHost(adapter, persistedLocale, previousPersistedLocale);
		} catch (error) {
			console.error("[UserMenu] Failed to persist locale to host:", error);
			if (toStorageLocale(getLocale()) === persistedLocale) {
				await setLocaleAsync(getLastPersistedLocale(adapter, previousPersistedLocale));
				toast.error(t("settings.language.changeFailed"));
			}
			return;
		}
		if (toStorageLocale(getLocale()) !== persistedLocale) return;
		setShowLanguageSubmenu(false);
		setIsOpen(false);
	};
	return {
		isOpen,
		setIsOpen,
		isLoggingIn,
		showLanguageSubmenu,
		setShowLanguageSubmenu,
		showWecomSubmenu,
		setShowWecomSubmenu,
		wecomConnected,
		handleWecomStart,
		handleWecomStop,
		handleCheckForUpdates,
		menuRef,
		triggerRef,
		handleLogin,
		closeMenu,
		executeLogout,
		handleMenuItemClick,
		getCurrentLanguageDisplayName,
		handleLanguageSelect
	};
}
var import_react$2, WECOM_STATUS_EVENT, WECOM_START_EVENT, WECOM_STOP_EVENT, MENU_DRAG_SELECT_CLASS;
var init_useUserMenu = __esmMin((() => {
	init_src$1();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_i18n();
	init_locale_host_persistence();
	init_use_login_error_handler();
	init_update_toast();
	WECOM_STATUS_EVENT = "wecom-status";
	WECOM_START_EVENT = "wecom-start";
	WECOM_STOP_EVENT = "wecom-stop";
	MENU_DRAG_SELECT_CLASS = "wb-user-menu-drag-select";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/WecomSubmenu.tsx
function WecomSubmenu({ wecomConnected, showSubmenu, onHoverChange, onWecomStart, onWecomStop }) {
	const t = useTranslation();
	const statusLabel = wecomConnected ? t("account.menu.wecom.connected") : t("account.menu.wecom.disconnected");
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: `user-menu-item-with-submenu ${showSubmenu ? "user-menu-item-with-submenu--active" : ""}`,
		onMouseEnter: () => onHoverChange(true),
		onMouseLeave: () => onHoverChange(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "user-menu-item-label",
				children: t("account.menu.wecom")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "user-menu-item-value",
				children: statusLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronRightIcon, {}),
			showSubmenu && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "user-menu-submenu-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "user-menu-submenu",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem, {
						label: t("account.menu.wecom.start"),
						value: wecomConnected ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CheckIcon, {}) : void 0,
						onClick: () => {
							if (!wecomConnected) onWecomStart();
						},
						selected: wecomConnected,
						isSubmenuItem: true
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem, {
						label: t("account.menu.wecom.stop"),
						value: !wecomConnected ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CheckIcon, {}) : void 0,
						onClick: () => {
							if (wecomConnected) onWecomStop();
						},
						selected: !wecomConnected,
						isSubmenuItem: true
					})]
				})
			})
		]
	});
}
var import_jsx_runtime$1;
var init_WecomSubmenu = __esmMin((() => {
	require_react();
	init_useI18n();
	init_menu_icons();
	init_MenuItem();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/UserMenu.tsx
var UserMenu_exports = /* @__PURE__ */ __exportAll({ UserMenu: () => UserMenu });
function isSameAccountIdentity(left, right) {
	return !!left && !!right && left.uid === right.uid && (left.enterpriseId ?? "") === (right.enterpriseId ?? "") && (left.type ?? "") === (right.type ?? "");
}
/**
* 在 `base` 上只覆盖「资料」字段（Issue #91021）。
*
* `base` 里的用量与套餐字段来自 `getAccountUsage`，是唯一权威值；而 daemon 裸 account
* 和 props.account 携带的用量都是上一轮的旧快照，整体合并会让余额从消耗后闪回消耗前。
*/
function mergeAccountProfile(base, profile) {
	return {
		...base,
		nickname: profile.nickname,
		avatarUrl: profile.avatarUrl,
		enterpriseUserName: profile.enterpriseUserName,
		enterpriseName: profile.enterpriseName,
		enterpriseLogo: profile.enterpriseLogo,
		products: profile.products,
		isAdmin: profile.isAdmin
	};
}
function UserMenuInner({ account, adapter, environmentType = "cloud", collapsed = false }) {
	const settings = useSettings();
	const portugueseEnabled = useProductFeature(ProductFeature.EnablePortugueseLocale, {
		mode: "enable",
		defaultEnabled: false,
		missingKeyEnabled: false
	});
	const traditionalChineseEnabled = useProductFeature(ProductFeature.EnableTraditionalChineseLocale, {
		mode: "enable",
		defaultEnabled: false,
		missingKeyEnabled: false
	});
	const indonesianEnabled = useProductFeature(ProductFeature.EnableIndonesianLocale, {
		mode: "enable",
		defaultEnabled: false,
		missingKeyEnabled: false
	});
	const i18n = useI18n({
		portugueseEnabled,
		traditionalChineseEnabled,
		indonesianEnabled
	});
	const auth = useAuth();
	const agentAdapter = useAdapter();
	const { openSettings } = settings;
	const { t, locale, supportedLocales } = i18n;
	const { isAuthenticated, hasBilling } = auth;
	const isLocalMode = environmentType === "local";
	const isCloudMode = environmentType === "cloud";
	/**
	* 弹窗 UI 是否走 "local 风格"。
	* - Desktop (local) 与 WorkBuddy Web (cloud + isWorkBuddy()) 视觉/行为对齐：
	*   都用 Portal 弹窗 + WorkBuddy 风格菜单项（主题切换、语言切换、设置等）。
	* - 非 WorkBuddy 的 cloud 模式（如老 codebuddy web）保持原 cloud 简化菜单。
	* 注意：此值只影响"弹窗壳层 + MenuItems 内部 isLocalMode 判断"，
	* 不影响 useUserMenu / 账号用量请求等真实运行时分支（仍按 environmentType 走）。
	*/
	const treatAsLocalUI = isLocalMode || isWorkBuddy();
	const showBilling = (!isLocalMode || isWorkBuddy()) && account && hasBilling;
	const isTencentUser = isIOAUser(account?.enterpriseId ?? "");
	const isPersonalUser = account?.type === "personal";
	const userMenu = useUserMenu({
		adapter,
		locale,
		isLocalMode
	});
	const [isAuthExpired, setIsAuthExpired] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => subscribeAuthExpired(setIsAuthExpired), []);
	const [feedbackVisible, setFeedbackVisible] = (0, import_react.useState)(false);
	const moduleRegistry = useOptionalModuleHost()?.registry;
	const isCreditsEntryEnabled = useCreditsEntryFeature();
	const showCreditsBalanceFeature = useShowCreditsBalanceFeature();
	const canFetchCreditsBalance = isCreditsEntryEnabled && showCreditsBalanceFeature === true;
	const showEnterpriseBadge = useEnterpriseConsoleFeature();
	const isWechatMiniProgramIntegrationEnabled = useWechatMiniProgramIntegrationFeature();
	const { enabled: isMessageCenterEntryEnabled, loading: isMessageCenterEntryLoading } = useProductFeature("DisableMessageCenterEntry", { withLoading: true });
	const showWechatMpIcon = !!(account && isLocalMode && isWechatMiniProgramIntegrationEnabled);
	const showMessageCenterEntry = !isMessageCenterEntryLoading && isMessageCenterEntryEnabled;
	const [wechatMpStatus, setWechatMpStatus] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		if (!adapter || !showWechatMpIcon) return;
		const unsubEnabled = adapter.on("claw:wechatmp-enabled-result", (data) => {
			const { enabled } = data;
			setWechatMpStatus(enabled ? "registered" : "idle");
		});
		adapter.emit("claw:get-wechatmp-enabled");
		return () => {
			unsubEnabled?.();
		};
	}, [adapter, showWechatMpIcon]);
	const [refreshedAccount, setRefreshedAccount] = (0, import_react.useState)(null);
	const accountRefreshPromiseRef = (0, import_react.useRef)(null);
	const effectiveAccount = isSameAccountIdentity(refreshedAccount, account) ? refreshedAccount : account;
	const latestAccountRef = (0, import_react.useRef)(account);
	latestAccountRef.current = account;
	const getFreshAccount = (0, import_react.useCallback)(() => {
		if (accountRefreshPromiseRef.current) return accountRefreshPromiseRef.current;
		const refreshPromise = Promise.resolve().then(() => adapter.refreshSession?.()).catch(() => void 0).then(() => adapter.getAccount()).then((nextAccount) => {
			const current = latestAccountRef.current;
			if (nextAccount && current && isSameAccountIdentity(nextAccount, current)) return {
				...current,
				...nextAccount
			};
			return nextAccount;
		}).finally(() => {
			if (accountRefreshPromiseRef.current === refreshPromise) accountRefreshPromiseRef.current = null;
		});
		accountRefreshPromiseRef.current = refreshPromise;
		return refreshPromise;
	}, [adapter]);
	const [creditsFetchStatus, setCreditsFetchStatus] = (0, import_react.useState)(() => account?.usageLeft != null ? "success" : "loading");
	const fetchCreditsData = (isCancelled = () => false) => {
		if (isLocalMode && isWorkBuddy() && agentAdapter?.getAccountUsage) return agentAdapter.getAccountUsage().then((usage) => {
			if (isCancelled()) return;
			if (usage) {
				setRefreshedAccount((prev) => {
					const base = prev ?? account;
					return base ? {
						...base,
						...usage
					} : null;
				});
				setCreditsFetchStatus("success");
			} else setCreditsFetchStatus("error");
		});
		if (!isLocalMode) return getFreshAccount().then((newAccount) => {
			if (isCancelled()) return;
			if (isSameAccountIdentity(newAccount, latestAccountRef.current)) {
				setRefreshedAccount(newAccount);
				setCreditsFetchStatus(newAccount.usageLeft != null ? "success" : "error");
			} else setCreditsFetchStatus("error");
		});
		return Promise.resolve().then(() => {
			if (!isCancelled()) setCreditsFetchStatus(isLocalMode ? "success" : "error");
		});
	};
	const [buyCreditsOpen, setBuyCreditsOpen] = (0, import_react.useState)(false);
	const extraOnPurchasedRef = (0, import_react.useRef)();
	const [isRefreshingCredits, setIsRefreshingCredits] = (0, import_react.useState)(false);
	const handleRefreshCredits = () => {
		if (isRefreshingCredits || !canFetchCreditsBalance) return;
		setIsRefreshingCredits(true);
		setCreditsFetchStatus("loading");
		fetchCreditsData().catch((error) => {
			console.error("[UserMenu] manual refresh credits failed:", error);
			setCreditsFetchStatus("error");
		}).finally(() => setIsRefreshingCredits(false));
	};
	(0, import_react.useEffect)(() => {
		const handleOpen = (event) => {
			extraOnPurchasedRef.current = event.detail?.onPurchased;
			setBuyCreditsOpen(true);
		};
		window.addEventListener(ADDON_PURCHASE_DIALOG_OPEN_EVENT, handleOpen);
		return () => window.removeEventListener(ADDON_PURCHASE_DIALOG_OPEN_EVENT, handleOpen);
	}, []);
	const handleAddonPurchased = () => {
		extraOnPurchasedRef.current?.();
		extraOnPurchasedRef.current = void 0;
		handleRefreshCredits();
	};
	const handleBuyCredits = () => {
		userMenu.setIsOpen(false);
		if (openCreditsPurchase({
			source: "avatar_menu_buy_credits",
			adapter
		}) !== "embedModal") refreshPlanStateWhenPageVisibleAgain(handleRefreshCredits);
	};
	const checkin = useCheckinService(isAuthenticated && !!account, isPersonalUser, !!showBilling, adapter, account?.uid);
	const isAmbassador = useAmbassadorStatus(adapter, account?.uid);
	/**
	* 头像图源：使用 admin 后台「企业设置 → 基础设置 →（WorkBuddy/CodeBuddy）
	* 产品信息 → 产品图标」上传的 productIcon。
	*
	* issue #54419：私有化客户在 admin 配的产品图标未在客户端左下角生效，
	* 始终显示默认 user-menu-avatar.png（hardcode 引入）。
	*
	* 字段来源：后端 ExclusiveAccount.Products[productCode].ProductIcon
	* （services/cmd/console/app/path/api/enterprise/models/response.go），
	* 经 /console/accounts 透传到 Account.products[productCode].productIcon。
	*
	* - 公网 SaaS：个人账号无 enterpriseId，buildExclusiveAccounts 跳过填充，
	*   account.products undefined → 走默认 PNG，行为与改动前完全一致
	* - 专享版客户没在该产品行启用 / 没上传图标 → productIcon falsy → 走默认 PNG
	*
	* 不接 enterpriseLogo 兜底：admin UI「企业 logo」与「产品图标」是两个独立配置区块，
	* 语义不应互相覆盖（避免客户误以为产品图标设置生效）。
	*/
	const productCode = isWorkBuddy() ? "workbuddy" : "codebuddy";
	const customProductIcon = effectiveAccount?.products?.[productCode]?.productIcon;
	/**
	* iOA 与个人账号优先使用真实头像；为空或加载失败时逐级回退原有图源。
	* 非目标账号仍从 productIcon 开始，保持旧行为。
	*/
	const realAvatarSrc = shouldUseRealAvatar(effectiveAccount) ? effectiveAccount?.avatarUrl : void 0;
	const collapsedAvatarSources = import_react.useMemo(() => [realAvatarSrc], [realAvatarSrc]);
	const expandedAvatarSources = import_react.useMemo(() => [
		realAvatarSrc,
		customProductIcon,
		user_menu_avatar_default
	], [realAvatarSrc, customProductIcon]);
	/**
	* 退出登录确认弹窗。
	*
	* 弹窗本体（文案 / 按钮 / × 出口 / 关闭时序）收敛在 `showLogoutConfirmDialog`，
	* 与「设置中心 · 账号」共用同一份实现，保证两个入口的二次确认完全一致（#111914）。
	* 这里只负责先把菜单收起，再把登出动作交给它。
	*/
	const requestLogout = () => {
		userMenu.closeMenu();
		showLogoutConfirmDialog({
			isLocalMode,
			onConfirm: () => userMenu.executeLogout()
		});
	};
	const handleCheckinBubbleClose = () => {
		writeCheckinBubbleDismissed(account?.uid);
		setCheckinBubbleDismissed(true);
		setCheckinBubbleInitialView("compact");
	};
	const handleReopenCheckinBubble = () => {
		clearCheckinBubbleDismissed(account?.uid);
		setCheckinBubbleDismissed(false);
		setCheckinBubbleInitialView("expanded");
		setCheckinBubbleReopenCount((count) => count + 1);
	};
	const [checkinBubbleDismissed, setCheckinBubbleDismissed] = (0, import_react.useState)(() => readCheckinBubbleDismissed(account?.uid));
	const [checkinBubbleInitialView, setCheckinBubbleInitialView] = (0, import_react.useState)("compact");
	const [checkinBubbleReopenCount, setCheckinBubbleReopenCount] = (0, import_react.useState)(0);
	const latestUidRef = (0, import_react.useRef)(account?.uid);
	latestUidRef.current = account?.uid;
	const prevUidRef = (0, import_react.useRef)(account?.uid);
	(0, import_react.useEffect)(() => {
		if (prevUidRef.current !== account?.uid) {
			prevUidRef.current = account?.uid;
			setCheckinBubbleDismissed(readCheckinBubbleDismissed(account?.uid));
			setCheckinBubbleInitialView("compact");
		}
	}, [account?.uid]);
	const { reportEvent, Events } = useAgentTelemetry();
	const streakBonusDays = checkin.streakBonusDays || DEFAULT_CHECKIN_CYCLE_DAYS;
	const streakBonusCredit = checkin.streakBonusCredit || 1e3;
	(0, import_react.useEffect)(() => {
		accountRefreshPromiseRef.current = null;
		setRefreshedAccount((prev) => account && isSameAccountIdentity(prev, account) ? mergeAccountProfile(prev, account) : null);
	}, [account]);
	(0, import_react.useEffect)(() => {
		if (!userMenu.isOpen || !isWorkBuddy()) return;
		let cancelled = false;
		const requestedAccount = latestAccountRef.current;
		getFreshAccount().then((nextAccount) => {
			if (cancelled || !isSameAccountIdentity(requestedAccount, latestAccountRef.current) || !isSameAccountIdentity(nextAccount, latestAccountRef.current)) return;
			setRefreshedAccount((prev) => {
				if (!nextAccount || !prev || !isSameAccountIdentity(prev, nextAccount)) return nextAccount;
				return mergeAccountProfile(prev, nextAccount);
			});
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [
		account?.enterpriseId,
		account?.type,
		account?.uid,
		getFreshAccount,
		userMenu.isOpen
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		if (canFetchCreditsBalance && checkin.claimSuccessSeq > 0 && agentAdapter?.getAccountUsage) agentAdapter.getAccountUsage().then((usage) => {
			if (cancelled) return;
			if (usage?.usageLeft != null) {
				setRefreshedAccount((prev) => prev ? {
					...prev,
					...usage
				} : prev);
				setCreditsFetchStatus("success");
			}
		}).catch((error) => {
			if (cancelled) return;
			console.error("[UserMenu] getAccountUsage after claim failed:", error);
			setCreditsFetchStatus("error");
		});
		return () => {
			cancelled = true;
		};
	}, [
		agentAdapter,
		canFetchCreditsBalance,
		checkin.claimSuccessSeq
	]);
	(0, import_react.useEffect)(() => {
		if (!userMenu.isOpen) return;
		let cancelled = false;
		console.info("[Checkin][UserMenu] menu opened, refresh status", {
			isLocalMode,
			isWorkBuddy: isWorkBuddy(),
			uid: account?.uid
		});
		checkin.refreshStatus();
		if (!canFetchCreditsBalance) {
			if (!cancelled) setCreditsFetchStatus("success");
			return () => {
				cancelled = true;
			};
		}
		setCreditsFetchStatus("loading");
		fetchCreditsData(() => cancelled).catch((error) => {
			if (cancelled) return;
			console.error("[UserMenu] credits fetch on menu open failed:", error);
			setCreditsFetchStatus("error");
		});
		return () => {
			cancelled = true;
		};
	}, [
		account,
		agentAdapter,
		canFetchCreditsBalance,
		checkin.refreshStatus,
		isLocalMode,
		userMenu.isOpen
	]);
	if (!account) {
		if (isLocalMode) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "user-menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: userMenu.triggerRef,
				className: "user-menu-trigger",
				onClick: () => userMenu.handleLogin(),
				disabled: userMenu.isLoggingIn,
				title: t("account.signIn"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalAccountIcon, {})
			})
		});
		return null;
	}
	if (isAuthExpired) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "user-menu",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "user-menu-trigger user-menu-trigger--relogin",
			onClick: () => openLoginExpiredDialog(),
			title: t("auth.expired.relogin"),
			"data-track-id": "user_relogin",
			"data-track-name": "点击登录",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserIcon, {
				width: 28,
				height: 28
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "user-menu-trigger-name",
				children: t("auth.expired.relogin")
			})]
		})
	});
	const displayAccount = effectiveAccount ?? account;
	const displayName = displayAccount.enterpriseUserName || displayAccount.nickname;
	const displayFullName = displayAccount.displayName || (displayAccount.enterpriseName ? `${displayName}[${displayAccount.enterpriseName}]` : displayName);
	const handleIndicatorClick = () => {
		console.info("[Checkin][Indicator] clicked", {
			isWorkBuddy: isWorkBuddy(),
			checkinClaiming: checkin.claiming,
			checkinShouldShow: checkin.shouldShow,
			checkinIsClaimed: checkin.isClaimed,
			todayCheckedIn: checkin.todayCheckedIn,
			streakDays: checkin.streakDays,
			todayCredit: checkin.todayCredit
		});
		userMenu.setIsOpen(true);
		if (checkin.claiming || checkin.isClaimed || !checkin.shouldShow) {
			console.info("[Checkin][Indicator] skip auto-claim", { reason: checkin.claiming ? "claiming" : checkin.isClaimed ? "alreadyClaimed" : "notShown" });
			return;
		}
		setTimeout(() => {
			console.info("[Checkin][Indicator] trigger handleClaim after menu open");
			checkin.handleClaim().then((result) => {
				if (result && isCheckinClaimError(result)) {
					console.warn("[Checkin][Indicator] claim business error", {
						code: result.code,
						msg: result.msg
					});
					toast.error(result.msg);
					reportEvent(Events.CheckinClaimClick, {
						source: "bubble",
						stage: "failed",
						streak_days: checkin.streakDays,
						today_credit: checkin.todayCredit,
						error_code: result.code,
						error_msg: result.msg
					});
				} else if (result) {
					console.info("[Checkin][Indicator] claim success", {
						credit: result.credit,
						streak_days: result.streak_days,
						is_streak_day: result.is_streak_day
					});
					reportEvent(Events.CheckinClaimClick, {
						source: "bubble",
						stage: "success",
						streak_days: result.streak_days,
						today_credit: checkin.todayCredit,
						credit: result.credit
					});
				} else {
					console.info("[Checkin][Indicator] claim returned null (already checked in)");
					reportEvent(Events.CheckinClaimClick, {
						source: "bubble",
						stage: "failed",
						streak_days: checkin.streakDays,
						today_credit: checkin.todayCredit,
						error_code: "already_claimed"
					});
				}
			}).catch((err) => {
				console.error("[Checkin][Indicator] claim threw exception", err);
				toast.error(t("account.checkin.claimFailed"));
				reportEvent(Events.CheckinClaimClick, {
					source: "bubble",
					stage: "failed",
					streak_days: checkin.streakDays,
					today_credit: checkin.todayCredit,
					error_code: "exception",
					error_msg: String(err?.message ?? err)
				});
			});
		}, 50);
	};
	const renderAccountMenuTrigger = ({ referenceRef, getReferenceProps }) => {
		if (isWorkBuddy() && collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenuTrigger, {
			ref: referenceRef,
			...getReferenceProps(),
			avatarSources: collapsedAvatarSources,
			displayName: displayFullName,
			isAmbassador
		});
		if (isWorkBuddy()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "user-menu-trigger-wrapper",
			children: [
				!checkinBubbleDismissed && checkin.uiState !== "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarTopSlot, {
					onClose: handleCheckinBubbleClose,
					initialView: checkinBubbleInitialView,
					checkinData: checkin.uiState !== "inactive" ? {
						active: true,
						todayCheckedIn: checkin.todayCheckedIn,
						todayCredit: checkin.todayCredit,
						streakDays: checkin.streakDays,
						nextStreakDay: checkin.nextStreakDay,
						isStreakDay: checkin.isStreakDay,
						streakBonusDays: checkin.streakBonusDays,
						streakBonusCredit: checkin.streakBonusCredit,
						totalCredits: checkin.totalCredits ?? 0,
						endTime: checkin.endTime,
						themeName: checkin.themeName,
						season: checkin.season,
						activityName: checkin.activityName,
						claimButtonText: checkin.claimButtonText,
						actionButton: checkin.actionButton
					} : null,
					onCheckinClaim: checkin.handleClaim,
					onRefreshCheckin: checkin.refreshStatus
				}, `${account?.uid ?? "anonymous"}:${checkinBubbleReopenCount}`),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenuTrigger, {
					ref: referenceRef,
					...getReferenceProps(),
					variant: "expanded",
					avatarSources: expandedAvatarSources,
					displayName,
					title: displayFullName,
					isAmbassador,
					showEnterpriseBadge,
					enterpriseBadgeLabel: t("account.enterpriseEdition")
				}),
				showMessageCenterEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MsgCenterBell, {
					className: "user-menu-trigger-msg-center",
					registry: moduleRegistry
				}),
				showWechatMpIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
					trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "user-menu-trigger-miniprogram",
						title: t("sidebar.miniprogram.title"),
						"aria-label": t("sidebar.miniprogram.title"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='8.4%208.9%2015.2%2014.2'%3e%3cpath%20fill='currentColor'%20fill-opacity='0.85'%20transform='matrix(1%200%200%201%208.89999%209.39999)'%20d='M6%2010.7L5.35%2010.7Q3.4627%2010.7%202.8102%2010.6208Q1.7057%2010.4866%201.0863%209.957Q0.9944%209.8784%200.9089%209.793Q0.8224%209.7066%200.743%209.6137Q0.2134%208.9943%200.0793%207.8898Q0%207.2373%200%205.35Q0%203.4627%200.0793%202.8102Q0.2134%201.7057%200.743%201.0863Q0.822%200.9939%200.908%200.908Q0.9939%200.822%201.0863%200.743Q1.7057%200.2134%202.8102%200.0793Q3.4627%200%205.35%200L8.6%200Q9.8511%200%2010.2925%200.036Q11.0366%200.0968%2011.5088%200.338Q12.4044%200.7956%2012.862%201.6912Q13.1033%202.1634%2013.164%202.9075Q13.2%203.3489%2013.2%204.6L12%204.6Q12%202.6416%2011.7934%202.2372Q11.5125%201.6875%2010.9629%201.4066Q10.5584%201.2%208.6%201.2L5.35%201.2Q3.5353%201.2%202.9549%201.2705Q2.2101%201.361%201.8661%201.6551Q1.8094%201.7037%201.7565%201.7565Q1.7037%201.8093%201.6551%201.8661Q1.361%202.2101%201.2705%202.9549Q1.2%203.5353%201.2%205.35Q1.2%207.1647%201.2705%207.7451Q1.361%208.4899%201.6551%208.8339Q1.7039%208.891%201.7571%208.9441Q1.8097%208.9966%201.8661%209.0449Q2.2101%209.339%202.9549%209.4295Q3.5353%209.5%205.35%209.5L8.6%209.5L8.6%2010.7L7.2%2010.7L7.2%2012L9.1%2012L9.1%2013.2L4.1%2013.2L4.1%2012L6%2012L6%2010.7ZM9.6%208.1C9.6%207.1642%209.6%206.6962%209.8013%206.3489C9.9328%206.122%2010.122%205.9328%2010.3489%205.8013C10.6962%205.6%2011.1642%205.6%2012.1%205.6C13.0359%205.6%2013.5038%205.6%2013.8511%205.8013C14.078%205.9328%2014.2672%206.122%2014.3987%206.3489C14.6%206.6962%2014.6%207.1642%2014.6%208.1L14.6%2011.1C14.6%2012.0359%2014.6%2012.5038%2014.3987%2012.8511C14.2672%2013.078%2014.078%2013.2672%2013.8511%2013.3987C13.5038%2013.6%2013.0359%2013.6%2012.1%2013.6C11.1642%2013.6%2010.6962%2013.6%2010.3489%2013.3987C10.122%2013.2672%209.9328%2013.078%209.8013%2012.8511C9.6%2012.5038%209.6%2012.0359%209.6%2011.1L9.6%208.1ZM10.8%208.1L10.8%2011.1Q10.8%2012.1812%2010.8395%2012.2494Q10.8803%2012.3197%2010.9507%2012.3605Q11.0189%2012.4%2012.1%2012.4Q13.1812%2012.4%2013.2494%2012.3605Q13.3197%2012.3197%2013.3605%2012.2494Q13.4%2012.1812%2013.4%2011.1L13.4%208.1Q13.4%207.0189%2013.3605%206.9507Q13.3197%206.8803%2013.2494%206.8395Q13.1812%206.8%2012.1%206.8Q11.0189%206.8%2010.9507%206.8395Q10.8803%206.8803%2010.8395%206.9507Q10.8%207.0189%2010.8%208.1Z'%20fill-rule='evenodd'/%3e%3c/svg%3e",
							alt: ""
						})
					}),
					triggerMode: "hover",
					placement: "top-start",
					role: "dialog",
					ariaLabel: t("sidebar.miniprogram.title"),
					className: "mobile-connect-popup-layer",
					trackReferenceMove: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileConnectPopup, {
						isTencentUser,
						initialWechatMpStatus: wechatMpStatus
					})
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: referenceRef,
			className: "user-menu-trigger",
			title: displayFullName,
			"data-track-id": "user_avatar_menu",
			"data-track-name": "头像菜单",
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalAccountIcon, {})
		});
	};
	const accountMenuPanel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenuPanel, {
		account: displayAccount,
		isAmbassador,
		onLogout: requestLogout,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItems, {
			isLocalMode: treatAsLocalUI,
			isCloudMode,
			isDesktopOnly: isLocalMode,
			openSettings: (page) => userMenu.handleMenuItemClick(() => openSettings(page)),
			onNavigate: (action) => userMenu.handleMenuItemClick(action),
			onOpenFeedback: () => userMenu.handleMenuItemClick(() => setFeedbackVisible(true)),
			account: displayAccount,
			creditsFetchStatus,
			onRefreshCredits: handleRefreshCredits,
			isRefreshingCredits,
			onBuyCredits: !displayAccount.enterpriseId ? handleBuyCredits : void 0,
			checkinShouldShow: checkin.shouldShow,
			checkinIsClaimed: checkin.isClaimed,
			checkinTodayCredit: checkin.todayCredit,
			checkinStreakDays: checkin.streakDays,
			checkinNextStreakDay: checkin.nextStreakDay,
			checkinTodayCheckedIn: checkin.todayCheckedIn,
			checkinIsStreakDay: checkin.isStreakDay,
			checkinClaimResult: checkin.claimResult,
			checkinStreakBonusDays: streakBonusDays,
			checkinStreakBonusCredit: streakBonusCredit,
			checkinTotalCredits: checkin.totalCredits,
			checkinEndTime: checkin.endTime,
			checkinActivityName: checkin.activityName,
			checkinThemeName: checkin.themeName,
			checkinSeason: checkin.season,
			checkinClaimButtonText: checkin.claimButtonText,
			checkinActionButton: checkin.actionButton,
			checkinClaiming: checkin.claiming,
			onCheckinClaim: checkin.handleClaim,
			onReopenBubble: handleReopenCheckinBubble,
			checkinData: checkin.shouldShow || checkin.isClaimed ? {
				active: true,
				todayCheckedIn: checkin.todayCheckedIn,
				todayCredit: checkin.todayCredit,
				streakDays: checkin.streakDays,
				nextStreakDay: checkin.nextStreakDay,
				isStreakDay: checkin.isStreakDay,
				streakBonusDays,
				streakBonusCredit,
				totalCredits: checkin.totalCredits ?? 0,
				endTime: checkin.endTime,
				themeName: checkin.themeName,
				season: checkin.season,
				activityName: checkin.activityName,
				claimButtonText: checkin.claimButtonText,
				actionButton: checkin.actionButton
			} : null,
			renderLanguageMenuItem: () => treatAsLocalUI && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSubmenu, {
				currentLocale: locale,
				supportedLocales,
				showSubmenu: userMenu.showLanguageSubmenu,
				onHoverChange: userMenu.setShowLanguageSubmenu,
				onLanguageSelect: userMenu.handleLanguageSelect,
				getCurrentLanguageDisplayName: userMenu.getCurrentLanguageDisplayName
			}),
			renderWecomMenuItem: () => treatAsLocalUI && isTencentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WecomSubmenu, {
				wecomConnected: userMenu.wecomConnected,
				showSubmenu: userMenu.showWecomSubmenu,
				onHoverChange: userMenu.setShowWecomSubmenu,
				onWecomStart: userMenu.handleWecomStart,
				onWecomStop: userMenu.handleWecomStop
			}),
			onCheckForUpdates: isLocalMode ? () => userMenu.handleMenuItemClick(userMenu.handleCheckForUpdates) : void 0
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "user-menu",
		children: [
			!isLocalMode && !isCloudMode && checkin.shouldShow && showBilling && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckinIndicator, {
				credits: checkin.todayCredit,
				onClick: handleIndicatorClick
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenuPopover, {
				open: userMenu.isOpen,
				onOpenChange: userMenu.setIsOpen,
				placement: "top-start",
				portal: treatAsLocalUI,
				localStyle: treatAsLocalUI,
				renderTrigger: renderAccountMenuTrigger,
				children: accountMenuPanel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackModal, {
				visible: feedbackVisible,
				onClose: () => setFeedbackVisible(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddonPurchaseDialog, {
				open: buyCreditsOpen,
				account: displayAccount,
				creditsPerPack: ADDON_CREDITS_PER_PACK,
				onPurchased: handleAddonPurchased,
				onClose: () => {
					extraOnPurchasedRef.current = void 0;
					setBuyCreditsOpen(false);
				}
			})
		]
	});
}
var import_react, import_jsx_runtime, DEFAULT_CHECKIN_CYCLE_DAYS, UserMenu;
var init_UserMenu = __esmMin((() => {
	init_UserMenu$1();
	init_src$1();
	init_common();
	init_src();
	init_account$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_user_menu_avatar();
	init_wb_mobile_connect();
	init_contexts();
	init_auth_context();
	init_product_features();
	init_use_product_feature();
	init_useI18n();
	init_common$1();
	init_utils$1();
	init_slot();
	init_telemetry_context();
	init_utils();
	init_account();
	init_auth_expired_detector();
	init_plan_upgrade();
	init_MobileConnectPopup();
	init_msg_center_panel();
	init_UserIcon();
	init_setting();
	init_FeedbackModal();
	init_AddonPurchaseDialog();
	init_AccountMenuPanel();
	init_AccountMenuPopover();
	init_AccountMenuTrigger();
	init_checkin_bubble_dismiss();
	init_CheckinIndicator();
	init_LanguageSubmenu();
	init_logout_confirm_dialog();
	init_menu_icons();
	init_MenuItems();
	init_useAmbassadorStatus();
	init_useCheckinService();
	init_useUserMenu();
	init_WecomSubmenu();
	import_jsx_runtime = require_jsx_runtime();
	DEFAULT_CHECKIN_CYCLE_DAYS = 7;
	UserMenu = import_react.memo(UserMenuInner);
	UserMenu.displayName = "UserMenu";
}));
//#endregion
export { calcRemainPercent as $, AccountAvatar as A, init_LogoutItem as B, showLogoutConfirmDialog as C, writeCheckinBubbleDismissed as D, readCheckinBubbleDismissed as E, init_AccountMenuPanel as F, EnterpriseIcon as G, ChevronRightIcon as H, init_MenuSeparator as I, init_menu_icons as J, PersonalIcon as K, AmbassadorAvatarWrapper as L, AccountMenuPopover as M, init_AccountMenuPopover as N, AccountMenuTrigger as O, AccountMenuPanel as P, buildCreditGroups as Q, AmbassadorBadge as R, init_logout_confirm_dialog as S, init_checkin_bubble_dismiss as T, CreditsErrorIcon as U, AppearanceIcon as V, CreditsLoadingIcon as W, GROUPS_SHOW_EXPIRE as X, CREDIT_GROUP_ORDER as Y, OVERVIEW_METRIC_ORDER as Z, ensureLegacyAppearanceModeSnapshot as _, init_useAmbassadorStatus as a, resolveCreditGroupPackageCodes as at, init_use_credits_redirect_url as b, init_PlanActionButton as c, resolveGroupTimeBasis as ct, CreditsMenuItem as d, MsgCenterProvider as dt, calcUsedPercent as et, init_CreditsMenuItem as f, init_msg_center_context as ft, shouldShowLowCreditsWarning as g, resolveCreditsDisplayState as h, useCheckinService as i, resolveCreditGroup as it, init_AccountAvatar as j, init_AccountMenuTrigger as k, DesktopAccountMenuItems as l, toSafeCount as lt, init_credits_display_state as m, init_UserMenu as n, init_subscription_usage_model as nt, useAmbassadorStatus as o, resolveExpiryLevel as ot, UNLIMITED_SENTINEL as p, UsageIcon as q, init_useCheckinService as r, isCreditResourceExhausted as rt, PlanActionButton as s, resolveGroupExpiryLevel as st, UserMenu_exports as t, formatUsageDateTime as tt, init_DesktopAccountMenuItems as u, init_SubscriptionUsagePanel as ut, init_legacy_appearance_mode_storage as v, clearCheckinBubbleDismissed as w, resetCreditsRedirectUrlCache as x, readLegacyAppearanceMode as y, init_AmbassadorBadge as z };
