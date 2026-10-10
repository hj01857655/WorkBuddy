import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, A5 as Breadcrumb, A7 as Input, BI as init_use_auto_update_preference$1, Bb as textMatchesKeyword, Bp as init_knot_identity, CL as skillListRefresh$, Cm as init_context, D1 as useI18n, DL as notifySkillsUpdateBadgeRefresh, E1 as init_useI18n, EM as wasBatchUpdateModalShownToday, Em as SkillAvatar, Ex as useMarketPageLoad, FI as isFailedScanResult, Fm as formatBytes, II as isNonHighRiskScanResult, Im as init_format_bytes, Ip as init_use_pinned_installed$1, K2 as init_environment, LI as isPendingScanResult, Lp as usePinnedInstalled, MI as securityAutoInstallPreference, MM as isBuiltinSkill, MO as init_market_perf, NI as createFailedScanResult, NO as getMarketPageLoadStore, Nnt as ChevronLeftIcon, O1 as useTranslation, OL as pluginListRefresh$, Om as init_SkillAvatar, PI as init_skill_security_result, Qrt as init_common, R1 as toZhEnLocale, S1 as useTheme, SL as setUploadModalVisible, TM as markBatchUpdateModalShownToday, Trt as AddCircleIcon, Tx as init_use_market_page_load, Up as getPluginInstalledAt, VI as useAutoUpdatePreference, Vp as knotSkillKey, X5 as Checkbox, XV as McpIcon, Xf as init_use_delayed_visible, Zf as useDelayedVisible, _A as consumeScanResult, _L as init_skill_perf_log, _N as init_use_narrow_layout, _it as getBuiltinMarketSkillId, _m as init_use_skill_upload_policy, ad as init_common$1, bL as init_high_risk_notification_store, cm as getDesktopDialogOpen, d0 as useModuleHost, dC as SidebarNewTaskButton, dm as isMacDesktop, e4 as isWorkBuddyDesktop, fm as pickDesktopSkillFolder, gA as init_async_security_scan_service, hA as asyncSecurityScanService, hC as useTopBarRootClassName, i7 as Tooltip, iR as useNamedPageShow, j1 as init_i18n, jI as init_skills_security_types, k1 as getLocale, krt as Button, lm as getDesktopPlatform, m5 as init_src, mm as resolveSkillRootDirFromSelectedPath, n7 as Dropdown, nH as InstalledSkillIcon, nR as init_use_named_page_show, pC as init_workbuddy_topbar, pm as pickDesktopSkillZipFile, srt as ApiKeyIcon, stt as RefreshCwIcon, uC as SidebarExpandButton, um as init_desktop_skill_source_picker, vA as init_security_scan_store, vL as skillPerfLog, vN as useNarrowLayout, vm as useSkillUploadPolicy, wL as init_extension_refresh_events, x1 as init_useTheme, xL as notifySkillListRefresh, yA as scanResultMap$, zb as init_keyword_match, znt as CheckIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip$1, Ei as toast, Ev as require_react, G as Switch, Kh as require_react_dom, N as AddMarketplaceModal, Ra as Button$1, Tv as require_jsx_runtime, U as Checkbox$1, j as PluginDetail, ji as ConfirmDialog, l as ScrollList, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { $ as isWarningDismissed, A as SortIcon, B as init_market_service_context, C as EditIcon, Ct as SKILLHUB_MARKET_URL, D as PlusIcon, E as PinIcon, Et as CollectionsStatus, F as init_icons$1, G as getBuiltinCardDescription, H as useService, I as init_use_skill_detail, J as init_skill_utils, K as getEnterpriseCardDescription, L as init_icon, M as TrashIcon, N as UnpinIcon, O as RiskWarningIcon, Ot as InstallStatus, P as UseSkillIcon, Q as init_cache, R as resolveIconUrl, S as DownloadIcon, St as SKILLHUB_MARKET_LABEL, T as FolderIcon, Tt as init_constants, U as ServiceKey, V as useMarketServices, X as resolveCollectionTitle, Y as isSkillModelInvocationDisabled, Z as resolveRecommendationReason, _ as CategoryMoreIcon, _t as CollectionSubType, a as init_skill_detail_content, at as formatNumber, b as CloseCircleIcon, bt as KNOT_MARKET_LABEL, c as init_use_skill_detail_actions, ct as getInstalledSkillDisplayName, d as init_toast, dt as needsApiKeyFromLabels, et as setWarningDismissed, f as toastSkillActionError, ft as pickI18nText, g as CardMoreIcon, gt as ClientTabId, h as AddIcon, ht as isAllCategory, i as init_skill_detail_modal$1, it as coerceSkillText, j as StarIcon, k as SettingsIcon, l as init_use_skill_creator_actions, lt as getLocalizedImportSkillError, m as init_use_pending_try_after_install, mt as init_collection, nt as init_enterprise, o as init_use_skill_related_cases, ot as getBuiltinMarketDisplayName, p as toastSkillInstallSuccess, pt as pickLocalizedExamples, q as getHubLikeCardDescription, r as SkillDetailModal, rt as resolveEnterpriseDisplayName, s as init_use_skill_detail_overview, st as getInstalledSkillDescription, t as init_standalone_skill_detail_modal, tt as enrichInstalledSkillsWithEnterpriseIcons, u as useSkillCreatorActions, ut as init_text, v as CheckCircleIcon, vt as MarketView, w as ExternalLinkIcon, wt as SKILLHUB_SORT_OPTIONS, x as DisableIcon, xt as KNOT_MARKET_URL, y as ChevronDownIcon, yt as init_types$2, z as MarketServiceProvider } from "./standalone-skill-detail-modal-CjJ8dPut.js";
import { n as useTrySkill, t as init_use_try_skill } from "./use-try-skill-DGODl3WX.js";
import { i as useScrollToTop, n as init_ArrowUpIcon, r as init_use_scroll_to_top, t as ArrowUpIcon } from "./ArrowUpIcon-8ojowetW.js";
import { n as useSecurityPreference, t as init_use_security_preference$1 } from "./use-security-preference-DZ4XMBSm.js";
//#region ../../packages/agent-ui/src/modules/skill-market/styles/skill-market.less
var init_skill_market = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/back-to-top-button/style.less
var init_style$15 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/back-to-top-button/index.tsx
function BackToTopButton(props) {
	if (!props.visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("button", {
		type: "button",
		className: "sm-back-to-top",
		onClick: props.onClick,
		"aria-label": "Back to top",
		children: /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(ArrowUpIcon, {})
	});
}
var import_jsx_runtime$39;
var init_back_to_top_button = __esmMin((() => {
	init_style$15();
	require_react();
	init_ArrowUpIcon();
	import_jsx_runtime$39 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/batch-update-modal/style.less
var init_style$14 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/batch-update-modal/index.tsx
function BatchUpdateModal(props) {
	const { visible, updatableSkills, updating, onClose, onConfirm } = props;
	const t = useTranslation();
	if (!visible || updatableSkills.length === 0) return null;
	return import_react_dom$2.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
		className: "sm-batch-update-modal-overlay",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
			className: "sm-batch-update-modal",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
					className: "sm-batch-update-modal-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("span", { children: t("skills.batchUpdate.title") }), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("button", {
						type: "button",
						className: "sm-batch-update-modal-close",
						onClick: onClose,
						disabled: updating,
						children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("path", {
								d: "M12 4L4 12M4 4l8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
					className: "sm-batch-update-modal-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("p", {
						className: "sm-batch-update-description",
						children: t("skills.batchUpdate.description", { count: String(updatableSkills.length) })
					}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("ul", {
						className: "sm-batch-update-list",
						children: updatableSkills.map(({ skill, currentVersion, latestVersion }) => /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("li", {
							className: "sm-batch-update-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("span", {
								className: "sm-batch-update-item-name",
								children: skill.name
							}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("span", {
								className: "sm-batch-update-item-version",
								children: currentVersion ? `${currentVersion} → ${latestVersion}` : latestVersion
							})]
						}, skill.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
					className: "sm-batch-update-modal-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(Button$1, {
						variant: "secondary",
						onClick: onClose,
						disabled: updating,
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(Button$1, {
						variant: "primary",
						onClick: onConfirm,
						disabled: updating,
						style: { backgroundColor: "#4cd964" },
						children: updating ? t("skills.batchUpdate.updating") : t("skills.batchUpdate.confirmUpdate")
					})]
				})
			]
		})
	}), document.body);
}
var import_react_dom$2, import_jsx_runtime$38;
var init_batch_update_modal = __esmMin((() => {
	init_style$14();
	init_src$1();
	require_react();
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	import_jsx_runtime$38 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/details/style.less
var init_style$13 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/details/plugin-detail-view.tsx
function PluginDetailView() {
	const t = useTranslation();
	const isDesktop = isWorkBuddyDesktop();
	const detailService = useService(ServiceKey.DetailService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const marketLayoutService = useService(ServiceKey.MarketLayoutService);
	const uiService = useService(ServiceKey.UIService);
	const selectedPluginKey = detailService.useStore((s) => s.selectedPluginKey);
	const installedPlugins = pluginsService.useStore((s) => s.installedPlugins);
	const marketplacePlugins = pluginsService.useStore((s) => s.marketplacePlugins);
	const currentMarketplace = pluginsService.useStore((s) => s.currentMarketplace);
	const plugin = import_react$47.useMemo(() => detailService.resolveSelectedPlugin(), [
		detailService,
		selectedPluginKey,
		installedPlugins,
		marketplacePlugins
	]);
	if (!plugin) return /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("div", { children: t("skills.title") });
	const handleBack = () => uiService.backFromDetail();
	const handleMarketplaceChange = (marketplaceName) => {
		const pluginsTab = marketLayoutService.useStore.getState().tabs.find((tab) => tab.source === CollectionSubType.Plugins);
		if (pluginsTab) marketLayoutService.setActiveTab(pluginsTab);
		pluginsService.changeMarketplace(marketplaceName);
	};
	const handleUninstall = async (p, scope) => {
		if (await pluginsService.uninstall(p, scope)) uiService.backFromDetail();
	};
	const handleMarketplaceClick = (marketplaceName) => {
		handleBack();
		if (currentMarketplace !== marketplaceName) handleMarketplaceChange(marketplaceName);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)(PluginDetail, {
		plugin,
		isZhLocale: toZhEnLocale(getLocale()) === "zh",
		userScopeOnly: true,
		hideToggleInMenu: true,
		backText: t("skills.title"),
		onBack: handleBack,
		onUpdate: isDesktop ? (p) => pluginsService.update(p) : void 0,
		onToggleStatus: (p, enabled, scope) => pluginsService.toggle(p, enabled, scope),
		onUninstall: handleUninstall,
		onInstall: (p, scope) => pluginsService.install(p, scope),
		onOpenInFolder: isDesktop ? (p) => pluginsService.openFolder(p) : void 0,
		onOpenHomepage: (homepage) => pluginsService.openHomepage(homepage),
		hasProjectPath: () => pluginsService.hasProjectPath(),
		onMarketplaceClick: handleMarketplaceClick
	});
}
var import_react$47, import_jsx_runtime$37;
var init_plugin_detail_view = __esmMin((() => {
	init_style$13();
	init_src$1();
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_useI18n();
	init_environment();
	init_market_service_context();
	init_types$2();
	import_jsx_runtime$37 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/details/unified-market-detail-view.tsx
/**
* 统一市场详情视图：顶栏（含返回按钮）+ 详情内容。
* 返回目标 / fromInstalled 从 uiService 读取，无需 Panel 透传。
*/
function UnifiedMarketDetailView(props) {
	const { renderDetailBack, children } = props;
	const t = useTranslation();
	const topBarRootClassName = useTopBarRootClassName();
	const uiService = useService(ServiceKey.UIService);
	const fromInstalled = uiService.useStore((s) => s.returnView) === MarketView.Installed;
	const handleBackToInstalled = () => {
		uiService.backFromDetail();
	};
	const handleBackToMarket = () => {
		uiService.backFromDetail();
		uiService.setView(MarketView.Market);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
		className: "skill-market skill-market--detail",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("header", {
			className: `${topBarRootClassName} ec-topbar ec-topbar--subpage`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
				className: "ec-topbar__left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(SidebarExpandButton, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(SidebarNewTaskButton, {}),
					renderDetailBack?.({
						fromInstalled,
						onBackToInstalled: handleBackToInstalled,
						onBackToMarket: handleBackToMarket
					}) ?? /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("button", {
						type: "button",
						className: "ec-topbar__back",
						onClick: handleBackToInstalled,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(ChevronLeftIcon, {
							width: 16,
							height: 16
						}), /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("span", { children: t("skills.title") })]
					})
				]
			})
		}), children]
	});
}
var import_jsx_runtime$36;
var init_unified_market_detail_view = __esmMin((() => {
	init_style$13();
	init_src();
	require_react();
	init_workbuddy_topbar();
	init_useI18n();
	init_market_service_context();
	init_types$2();
	import_jsx_runtime$36 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/details/index.ts
var init_details = __esmMin((() => {
	init_plugin_detail_view();
	init_unified_market_detail_view();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/discover-section/style.less
var init_style$12 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-min-height-lock.ts
/**
* 最小高度锁定
* 作用：锁定容器的最小高度，防止内容高度变化时，容器高度立马跟着变化
*/
function useMinHeightLock(delay = 300) {
	const containerRef = (0, import_react$45.useRef)(null);
	const [minHeight, setMinHeight] = (0, import_react$45.useState)(void 0);
	const timeoutRef = (0, import_react$45.useRef)(null);
	const lockHeight = (0, import_react$45.useCallback)(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (containerRef.current) setMinHeight(containerRef.current.offsetHeight);
		timeoutRef.current = setTimeout(() => {
			setMinHeight(void 0);
			timeoutRef.current = null;
		}, delay);
	}, [delay]);
	return {
		containerRef,
		minHeight,
		lockHeight,
		wrapWithLock: (0, import_react$45.useCallback)((fn) => (...args) => {
			lockHeight();
			return fn(...args);
		}, [lockHeight])
	};
}
var import_react$45;
var init_use_min_height_lock = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/style.less
var init_style$11 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/category-chip.tsx
/**
* 公共分类标签 chip，复用于各 marketplace 分类滤条。
*/
function CategoryChip(props) {
	const { label, active = false, onClick, loading = false, moreMenu, className = "", track } = props;
	const menuRef = (0, import_react$44.useRef)(null);
	(0, import_react$44.useEffect)(() => {
		if (!moreMenu?.open) return;
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) moreMenu.onToggle();
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [moreMenu?.open, moreMenu?.onToggle]);
	return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("button", {
		type: "button",
		className: `sm-category-chip${active ? " sm-category-chip--active" : ""} ${className}`.trim(),
		onClick,
		...track ? {
			"data-track-id": track.elementId,
			"data-track-name": track.elementName,
			...track.props ? { "data-track-props": JSON.stringify(track.props) } : {}
		} : {},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
				className: "sm-category-chip-label",
				children: label
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", { className: "sm-category-chip-loading" }),
			moreMenu && /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
				className: "sm-category-chip-more",
				ref: moreMenu.open ? menuRef : null,
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
					className: "sm-category-chip-more-btn",
					onClick: (e) => {
						e.stopPropagation();
						moreMenu.onToggle();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(CategoryMoreIcon, {})
				}), moreMenu.open && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
					className: "sm-category-chip-dropdown",
					children: moreMenu.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
						className: `sm-category-chip-dropdown-item${item.danger ? " sm-category-chip-dropdown-item--danger" : ""}`,
						onClick: () => {
							item.onClick();
						},
						children: item.label
					}, idx))
				})]
			})
		]
	});
}
var import_react$44, import_jsx_runtime$35;
var init_category_chip = __esmMin((() => {
	init_style$11();
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
	init_icons$1();
	import_jsx_runtime$35 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/collection-categories.tsx
/**
* 运营 Collection 子分类滤条。
*/
function CollectionCategories(props) {
	const { collectionId } = props;
	const { locale } = useI18n();
	const contentLocale = toZhEnLocale(locale);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const categories = marketBuiltinService.useStore((s) => s.collections[collectionId]?.categories ?? []);
	const categoryId = marketBuiltinService.useStore((s) => s.collections[collectionId]?.categoryId ?? "");
	const handleCategoryClick = (nextCategoryId) => {
		marketBuiltinService.setCollectionCategory(collectionId, nextCategoryId);
	};
	if (categories.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
		className: "sm-category-filter-bar",
		children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(ScrollList, {
			className: "sm-categories",
			gap: 6,
			children: categories.map((cat) => {
				const isAll = isAllCategory(cat);
				const isActive = categoryId === cat.id;
				const label = contentLocale === "en" ? cat.name.en || cat.name.zh : cat.name.zh || cat.name.en;
				return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(CategoryChip, {
					label,
					active: isActive,
					onClick: () => handleCategoryClick(cat.id),
					track: {
						elementId: "skill_market_category_switch",
						elementName: "行业分类切换",
						props: {
							type: isAll ? "all" : cat.id,
							collection: collectionId
						}
					}
				}, cat.id);
			})
		})
	});
}
var import_jsx_runtime$34;
var init_collection_categories = __esmMin((() => {
	init_style$11();
	init_src$1();
	require_react();
	init_i18n();
	init_useI18n();
	init_market_service_context();
	init_collection();
	init_category_chip();
	import_jsx_runtime$34 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/enterprise-categories.tsx
/**
* 企业 Skill 分类滤条。
*/
function EnterpriseCategories() {
	const t = useTranslation();
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const categories = enterpriseService.useStore((s) => s.categories);
	const selectedCategory = enterpriseService.useStore((s) => s.selectedCategory);
	const handleSelectAll = () => {
		enterpriseService.setCategory("");
	};
	const handleSelectCategory = (id) => {
		enterpriseService.setCategory(id);
	};
	if (categories.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
		className: "sm-category-filter-bar",
		children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)(ScrollList, {
			className: "sm-categories",
			gap: 6,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(CategoryChip, {
				label: t("skills.recommend.allTags"),
				active: !selectedCategory,
				onClick: handleSelectAll
			}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(CategoryChip, {
				label: cat.name,
				active: selectedCategory === cat.id,
				onClick: () => handleSelectCategory(cat.id)
			}, cat.id))]
		})
	});
}
var import_jsx_runtime$33;
var init_enterprise_categories = __esmMin((() => {
	init_style$11();
	init_src$1();
	require_react();
	init_useI18n();
	init_market_service_context();
	init_category_chip();
	import_jsx_runtime$33 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/knot-categories.tsx
/**
* Knot 分类滤条：优先 tags，否则 categories。
*/
function KnotCategories() {
	const t = useTranslation();
	const knotService = useService(ServiceKey.KnotService);
	const categories = knotService.useStore((s) => s.categories);
	const tags = knotService.useStore((s) => s.tags);
	const selectedCategory = knotService.useStore((s) => s.selectedCategory);
	const selectedTag = knotService.useStore((s) => s.selectedTag);
	const handleSelectAllTags = () => {
		knotService.setSelectedTag("");
	};
	const handleSelectTag = (id) => {
		knotService.setSelectedTag(id);
	};
	const handleSelectAllCategories = () => {
		knotService.setCategory("");
	};
	const handleSelectCategory = (key) => {
		knotService.setCategory(key);
	};
	const handleOpenMarket = (e) => {
		e.preventDefault();
		window.open(KNOT_MARKET_URL, "_blank", "noopener,noreferrer");
	};
	const handleMarketKeyDown = (e) => {
		if (e.key === "Enter") handleOpenMarket(e);
	};
	const hasTags = tags.length > 0;
	const hasCategories = categories.length > 0;
	if (!hasTags && !hasCategories) return null;
	const marketLink = /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("span", {
		className: "sm-hub-link",
		role: "link",
		tabIndex: 0,
		title: KNOT_MARKET_LABEL,
		onClick: handleOpenMarket,
		onKeyDown: handleMarketKeyDown,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ExternalLinkIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", { children: KNOT_MARKET_LABEL })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
		className: "sm-category-filter-bar",
		children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
			className: "sm-categories",
			children: [hasTags ? /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(ScrollList, {
				className: "sm-categories-scroll",
				gap: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(CategoryChip, {
					label: t("skills.knot.allTags"),
					active: !selectedTag,
					onClick: handleSelectAllTags
				}), tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(CategoryChip, {
					label: tag.display_name || tag.tag_name,
					active: selectedTag === tag.id,
					onClick: () => handleSelectTag(tag.id)
				}, tag.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(ScrollList, {
				className: "sm-categories-scroll",
				gap: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(CategoryChip, {
					label: t("skills.knot.allCategories"),
					active: !selectedCategory,
					onClick: handleSelectAllCategories
				}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(CategoryChip, {
					label: toZhEnLocale(getLocale()) === "zh" ? cat.name : cat.nameEn,
					active: selectedCategory === cat.key,
					onClick: () => handleSelectCategory(cat.key)
				}, cat.key))]
			}), marketLink]
		})
	});
}
var import_jsx_runtime$32;
var init_knot_categories = __esmMin((() => {
	init_style$11();
	init_src$1();
	require_react();
	init_i18n();
	init_useI18n();
	init_constants();
	init_market_service_context();
	init_icons$1();
	init_category_chip();
	import_jsx_runtime$32 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/plugins-categories.tsx
/**
* 插件市场源滤条（marketplace chips + 添加）与相关弹窗。
*/
function PluginsCategories() {
	const t = useTranslation();
	const pluginsService = useService(ServiceKey.PluginsService);
	const pluginMarketplaces = pluginsService.useStore((s) => s.marketplaces);
	const currentPluginMarketplace = pluginsService.useStore((s) => s.currentMarketplace);
	const refreshingMarketplaces = pluginsService.useStore((s) => s.refreshing);
	const showAddMarketplaceModal = pluginsService.useStore((s) => s.showAddMarketplaceModal);
	const addMarketplaceLoading = pluginsService.useStore((s) => s.addMarketplaceLoading);
	const addMarketplaceError = pluginsService.useStore((s) => s.addMarketplaceError);
	const deleteConfirmVisible = pluginsService.useStore((s) => s.deleteConfirmVisible);
	const pendingDeletePluginNames = pluginsService.useStore((s) => s.pendingDeletePluginNames);
	const deleteConfirmLoading = pluginsService.useStore((s) => s.deleteConfirmLoading);
	const [openMarketplaceMenu, setOpenMarketplaceMenu] = (0, import_react$40.useState)(null);
	const [addMarketplaceLoadingMessage, setAddMarketplaceLoadingMessage] = (0, import_react$40.useState)("");
	const handleMarketplaceChange = (name) => {
		pluginsService.changeMarketplace(name);
	};
	const handleToggleMarketplaceMenu = (name) => {
		setOpenMarketplaceMenu(openMarketplaceMenu === name ? null : name);
	};
	const handleRefreshMarketplace = (name) => {
		setOpenMarketplaceMenu(null);
		pluginsService.refreshMarketplace(name);
	};
	const handleDeleteMarketplace = (id) => {
		setOpenMarketplaceMenu(null);
		pluginsService.deleteMarketplace(id);
	};
	const handleShowAddMarketplace = () => {
		pluginsService.setShowAddMarketplaceModal(true);
	};
	const handleAddMarketplace = (source) => pluginsService.addMarketplace(source);
	const handleCancelAddMarketplace = () => {
		pluginsService.setShowAddMarketplaceModal(false);
		pluginsService.setAddMarketplaceError("");
	};
	const handleCancelDeleteMarketplace = () => {
		pluginsService.cancelDeleteMarketplace();
	};
	const handleConfirmDeleteMarketplace = () => {
		pluginsService.confirmDeleteMarketplace();
	};
	(0, import_react$40.useEffect)(() => {
		if (!addMarketplaceLoading) return;
		setAddMarketplaceLoadingMessage(t("plugins.addMarketplace.downloading") || "Downloading marketplace...");
		const messages = [
			t("plugins.addMarketplace.downloading") || "Downloading marketplace...",
			t("plugins.addMarketplace.extracting") || "Extracting marketplace...",
			t("plugins.addMarketplace.installing") || "Installing marketplace..."
		];
		let messageIndex = 0;
		const interval = setInterval(() => {
			messageIndex = (messageIndex + 1) % messages.length;
			setAddMarketplaceLoadingMessage(messages[messageIndex]);
		}, 3e3);
		return () => clearInterval(interval);
	}, [addMarketplaceLoading, t]);
	return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
		className: "sm-plugins-marketplace-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
				className: "sm-plugins-marketplace-tabs",
				children: [pluginMarketplaces.map((marketplace) => {
					const isRefreshing = refreshingMarketplaces.has(marketplace.name);
					const isSelected = currentPluginMarketplace === marketplace.name;
					return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(CategoryChip, {
						label: marketplace.name,
						active: isSelected,
						loading: isRefreshing,
						onClick: () => handleMarketplaceChange(marketplace.name),
						moreMenu: {
							open: openMarketplaceMenu === marketplace.name,
							onToggle: () => handleToggleMarketplaceMenu(marketplace.name),
							items: [{
								label: t("plugins.marketplace.refresh"),
								onClick: () => handleRefreshMarketplace(marketplace.name)
							}, {
								label: t("plugins.marketplace.delete"),
								onClick: () => handleDeleteMarketplace(marketplace.id),
								danger: true
							}]
						}
					}, marketplace.name);
				}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("button", {
					type: "button",
					className: "sm-plugins-add-marketplace-btn sm-plugins-add-marketplace-btn--inline",
					onClick: handleShowAddMarketplace,
					title: t("plugins.addMarketplace"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(AddIcon, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(AddMarketplaceModal, {
				show: showAddMarketplaceModal,
				title: t("plugins.addMarketplace"),
				sourceLabel: t("plugins.addMarketplace.sourceLabel"),
				sourceTip: t("plugins.addMarketplace.sourceTip"),
				placeholder: t("plugins.addMarketplace.placeholder"),
				submitText: t("plugins.addMarketplace.submit"),
				cancelText: t("common.cancel"),
				errorMessage: addMarketplaceError,
				loading: addMarketplaceLoading,
				loadingMessage: addMarketplaceLoadingMessage,
				errorBrief: t("plugins.addMarketplace.errorBrief"),
				showDetailsText: t("plugins.addMarketplace.showDetails"),
				hideDetailsText: t("plugins.addMarketplace.hideDetails"),
				onSubmit: handleAddMarketplace,
				onCancel: handleCancelAddMarketplace
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(ConfirmDialog, {
				visible: deleteConfirmVisible,
				title: t("plugins.deleteMarketplace.confirmTitle"),
				content: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", { children: t("plugins.deleteMarketplace.confirmDesc") }), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(ScrollList, {
					direction: "vertical",
					fadeSize: 16,
					draggable: false,
					hideScrollbar: true,
					style: {
						marginTop: 8,
						maxHeight: 120
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
						style: { fontWeight: "bold" },
						children: pendingDeletePluginNames.join(", ")
					})
				})] }),
				confirmText: t("plugins.deleteMarketplace.confirmButton"),
				cancelText: t("common.cancel"),
				confirmVariant: "danger",
				confirmLoading: deleteConfirmLoading,
				onClose: handleCancelDeleteMarketplace,
				onConfirm: handleConfirmDeleteMarketplace
			})
		]
	});
}
var import_react$40, import_jsx_runtime$31;
var init_plugins_categories = __esmMin((() => {
	init_style$11();
	init_src$1();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_market_service_context();
	init_icons$1();
	init_category_chip();
	import_jsx_runtime$31 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/skillhub-categories.tsx
/**
* SkillHub 排序下拉：按评分 / 下载量等切换列表排序。
*/
function SortDropdown(props) {
	const { sortBy, onSortChange } = props;
	const t = useTranslation();
	const [open, setOpen] = (0, import_react$39.useState)(false);
	const ref = (0, import_react$39.useRef)(null);
	(0, import_react$39.useEffect)(() => {
		if (!open) return;
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);
	const currentLabel = SKILLHUB_SORT_OPTIONS.find((o) => o.value === sortBy)?.labelKey ?? SKILLHUB_SORT_OPTIONS[0].labelKey;
	return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
		className: "sm-sort-dropdown",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("button", {
			type: "button",
			className: "sm-sort-dropdown-btn",
			onClick: () => setOpen((prev) => !prev),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(SortIcon, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", { children: t(currentLabel) }),
				/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(ChevronDownIcon, {})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
			className: "sm-sort-dropdown-menu",
			children: SKILLHUB_SORT_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: `sm-sort-dropdown-option${sortBy === opt.value ? " sm-sort-dropdown-option--active" : ""}`,
				onClick: () => {
					onSortChange(opt.value);
					setOpen(false);
				},
				"data-track-id": "skill_market_hub_sort",
				"data-track-name": "skillhub排序",
				"data-track-props": JSON.stringify({
					type: opt.value,
					mode: CollectionSubType.SkillHub
				}),
				children: t(opt.labelKey)
			}, opt.value))
		})]
	});
}
/**
* SkillHub 分类滤条：全部分类 + 各分类 chip、官方站外链与排序下拉。
*/
function SkillhubCategories() {
	const t = useTranslation();
	const skillhubService = useService(ServiceKey.SkillhubService);
	const categories = skillhubService.useStore((s) => s.categories);
	const selectedCategory = skillhubService.useStore((s) => s.selectedCategory);
	const sortBy = skillhubService.useStore((s) => s.sortBy);
	const handleSelectAll = () => {
		skillhubService.setCategory("");
	};
	const handleSelectCategory = (key) => {
		skillhubService.setCategory(key);
	};
	const handleOpenMarket = (e) => {
		e.preventDefault();
		window.open(SKILLHUB_MARKET_URL, "_blank", "noopener,noreferrer");
	};
	const handleMarketKeyDown = (e) => {
		if (e.key === "Enter") handleOpenMarket(e);
	};
	const handleSortChange = (value) => {
		skillhubService.setSortBy(value);
	};
	if (categories.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
		className: "sm-category-filter-bar",
		children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
			className: "sm-categories",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(ScrollList, {
					className: "sm-categories-scroll",
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(CategoryChip, {
						label: t("skills.skillhub.allCategories"),
						active: !selectedCategory,
						onClick: handleSelectAll,
						track: {
							elementId: "skill_market_hub_category",
							elementName: "skillhub分类",
							props: {
								type: "all",
								mode: CollectionSubType.SkillHub
							}
						}
					}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(CategoryChip, {
						label: toZhEnLocale(getLocale()) === "zh" ? cat.name : cat.nameEn,
						active: selectedCategory === cat.key,
						onClick: () => handleSelectCategory(cat.key),
						track: {
							elementId: "skill_market_hub_category",
							elementName: "skillhub分类",
							props: {
								type: cat.key,
								mode: CollectionSubType.SkillHub
							}
						}
					}, cat.key))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("span", {
					className: "sm-hub-link",
					role: "link",
					tabIndex: 0,
					title: SKILLHUB_MARKET_LABEL,
					onClick: handleOpenMarket,
					onKeyDown: handleMarketKeyDown,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(ExternalLinkIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", { children: SKILLHUB_MARKET_LABEL })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(SortDropdown, {
					sortBy,
					onSortChange: handleSortChange
				})
			]
		})
	});
}
var import_react$39, import_jsx_runtime$30;
var init_skillhub_categories = __esmMin((() => {
	init_style$11();
	init_src$1();
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_useI18n();
	init_constants();
	init_market_service_context();
	init_icons$1();
	init_types$2();
	init_category_chip();
	import_jsx_runtime$30 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/categories/index.ts
var init_categories = __esmMin((() => {
	init_category_chip();
	init_collection_categories();
	init_enterprise_categories();
	init_knot_categories();
	init_plugins_categories();
	init_skillhub_categories();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/discover-tab-bar/style.less
var init_style$10 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/discover-tab-bar/index.tsx
/**
* Tab 栏组件
*/
function DiscoverTabBar(props) {
	const { activeTabId, tabs, showMcpButton, onMcpClick, onTabChange } = props;
	const t = useTranslation();
	const handleClick = (tab) => {
		onTabChange(tab);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
		className: "sm-segment-bar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
			className: "sm-segment-group",
			children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("button", {
				type: "button",
				className: `sm-segment-item${activeTabId === tab.id ? " sm-segment-item--active" : ""}`,
				onClick: () => handleClick(tab),
				children: [pickI18nText(tab.name), tab.hasNewBadge && /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", {
					className: "sm-segment-badge-new",
					"aria-label": "NEW"
				})]
			}, tab.id))
		}), showMcpButton && /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("button", {
			type: "button",
			className: "sm-segment-mcp",
			onClick: onMcpClick,
			title: t("mcp.title"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(McpIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("span", { children: t("mcp.title") })]
		})]
	});
}
var import_jsx_runtime$29;
var init_discover_tab_bar = __esmMin((() => {
	init_style$10();
	require_react();
	init_icons();
	init_useI18n();
	init_text();
	import_jsx_runtime$29 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/market-status-view/style.less
var init_style$9 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-grid-columns.ts
/** 按容器宽度与最小列宽、间距推算可容纳列数 */
function resolveGridColumns(width) {
	return Math.max(1, Math.floor((width + 12) / 300));
}
/**
* 按容器宽度实测网格列数。
*/
function useGridColumns(options = {}) {
	const { defaultColumns = 3, defaultVisibleRows = 3 } = options;
	const [columns, setColumns] = (0, import_react$37.useState)(defaultColumns);
	const nodeRef = (0, import_react$37.useRef)(null);
	const observerRef = (0, import_react$37.useRef)(null);
	const gridRef = (0, import_react$37.useCallback)((node) => {
		observerRef.current?.disconnect();
		observerRef.current = null;
		nodeRef.current = node;
		if (!node) return;
		const observer = new ResizeObserver(() => {
			const width = node.clientWidth;
			if (width <= 0) return;
			setColumns(resolveGridColumns(width));
		});
		observer.observe(node);
		observerRef.current = observer;
	}, []);
	(0, import_react$37.useLayoutEffect)(() => {
		const width = nodeRef.current?.clientWidth ?? 0;
		if (width > 0) setColumns(resolveGridColumns(width));
		return () => observerRef.current?.disconnect();
	}, []);
	return {
		gridRef,
		columns,
		defaultVisibleCount: columns * defaultVisibleRows
	};
}
var import_react$37;
var init_use_grid_columns = __esmMin((() => {
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	init_constants();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/style.less
var init_style$8 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/card-batch-checkbox.tsx
/**
* 批量模式下的视觉勾选框；点击由整卡 onClick 处理。
*/
function CardBatchCheckbox(props) {
	const { selected } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("label", {
		className: "sm-checkbox",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("input", {
			type: "checkbox",
			checked: selected,
			readOnly: true,
			tabIndex: -1
		}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("span", { className: "sm-checkbox-mark" })]
	});
}
var import_jsx_runtime$28;
var init_card_batch_checkbox = __esmMin((() => {
	init_style$8();
	require_react();
	import_jsx_runtime$28 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/card-frame.tsx
/**
* 技能/插件卡片公共外框：图标、标题、描述、统计与操作槽。
*/
function CardFrame(props) {
	const { title, description, iconUrl, downloads = 0, stars = 0, sourceLabel, badgeText, builtinBadgeText, reasonLabel, needsApiKey = false, riskResult, updateStatus = "none", className, installed = false, installedListMode = false, disabled = false, batchMode = false, selected = false, onToggleSelect, onUpdate, onOpen, actions, isFirst = false } = props;
	const t = useTranslation();
	const safeTitle = coerceSkillText(title);
	const safeDescription = coerceSkillText(description);
	const safeSourceLabel = coerceSkillText(sourceLabel);
	const safeBadgeText = coerceSkillText(badgeText);
	const safeBuiltinBadgeText = coerceSkillText(builtinBadgeText);
	const hasStats = downloads > 0 || stars > 0;
	const showUpdate = updateStatus === "available" || updateStatus === "updating";
	const isUpdating = updateStatus === "updating";
	const nameRef = (0, import_react$35.useRef)(null);
	const descRef = (0, import_react$35.useRef)(null);
	const [isNameOverflow, setIsNameOverflow] = (0, import_react$35.useState)(false);
	const [isDescOverflow, setIsDescOverflow] = (0, import_react$35.useState)(false);
	(0, import_react$35.useEffect)(() => {
		const nameElement = nameRef.current;
		if (nameElement) setIsNameOverflow(nameElement.scrollWidth > nameElement.clientWidth);
	}, [safeTitle]);
	(0, import_react$35.useEffect)(() => {
		const descriptionElement = descRef.current;
		if (descriptionElement) setIsDescOverflow(descriptionElement.scrollHeight > descriptionElement.clientHeight);
	}, [safeDescription]);
	const getRiskTooltipContent = (result) => {
		const riskDescription = result.tags[0]?.desc || result.fileAnalysis[0]?.description || t("skills.security.riskTooltip.default");
		if (result.riskLevel === "high") return t("skills.security.riskTooltip.high", { desc: riskDescription });
		if (result.riskLevel === "medium") return t("skills.security.riskTooltip.medium", { desc: riskDescription });
		return t("skills.security.riskTooltip.low", { desc: riskDescription });
	};
	const handleUpdate = (e) => {
		e.stopPropagation();
		if (!isUpdating) onUpdate?.();
	};
	const handleCardClick = batchMode ? onToggleSelect : onOpen;
	const cardClassNames = [
		"sm-card",
		installed && "sm-card--installed",
		installedListMode && "sm-card--installed-list-mode",
		showUpdate && "sm-card--has-update",
		disabled && "sm-card--disabled",
		batchMode && "sm-card--batch-mode",
		selected && "sm-card--selected",
		badgeText && "sm-card--plugin",
		className
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
		className: cardClassNames,
		"data-market-perf": isFirst ? "first-item" : void 0,
		"data-track-id": "skill_card_click",
		"data-track-name": "点击技能卡片",
		"data-track-props": JSON.stringify({ source: safeTitle }),
		role: batchMode ? "checkbox" : void 0,
		"aria-checked": batchMode ? selected : void 0,
		onClick: handleCardClick,
		children: [
			batchMode && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CardBatchCheckbox, { selected }),
			reasonLabel && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
				className: "sm-card-reason",
				children: reasonLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
				className: "sm-card-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
						className: "sm-card-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(SkillAvatar, {
							name: safeTitle,
							iconUrl,
							size: 28
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
						className: "sm-card-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
							className: "sm-card-body",
							children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
								className: "sm-card-name-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Tooltip$1, {
										content: isNameOverflow ? safeTitle : "",
										placement: "top",
										maxWidth: 250,
										children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
											ref: nameRef,
											className: "sm-card-name",
											children: safeTitle
										})
									}),
									safeSourceLabel && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
										className: "sm-card-source",
										children: safeSourceLabel
									}),
									safeBadgeText && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
										className: "sm-card-badge sm-card-badge--plugin",
										children: safeBadgeText
									}),
									safeBuiltinBadgeText && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
										className: "sm-card-badge sm-card-badge--builtin",
										children: safeBuiltinBadgeText
									}),
									riskResult && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Tooltip$1, {
										content: getRiskTooltipContent(riskResult),
										placement: "top",
										maxWidth: 280,
										children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
											className: `sm-risk-badge sm-risk-badge--${riskResult.riskLevel}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(RiskWarningIcon, { className: "sm-risk-badge__icon" })
										})
									}),
									needsApiKey && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Tooltip$1, {
										content: t("skills.needsApiKey"),
										placement: "top",
										children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
											className: "sm-card-name-status-icon sm-card-name-status-icon--api-key",
											children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(ApiKeyIcon, {
												width: 14,
												height: 14
											})
										})
									}),
									showUpdate && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
										className: `sm-update-icon${isUpdating ? " sm-update-icon--updating" : ""}`,
										onClick: handleUpdate,
										role: "button",
										tabIndex: 0,
										children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
											className: "sm-update-icon__label",
											children: isUpdating ? t("skills.skillhub.updating") : t("skills.skillhub.updatable")
										})
									})
								]
							})
						})
					}),
					actions
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Tooltip$1, {
				content: isDescOverflow ? safeDescription || "" : "",
				placement: "top",
				maxWidth: 250,
				children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
					ref: descRef,
					className: "sm-card-desc sm-card-desc--two-lines",
					children: safeDescription || "-"
				})
			}),
			hasStats && /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
				className: "sm-card-stats",
				children: [downloads > 0 && /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("span", {
					className: "sm-card-stat",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(DownloadIcon, {}),
						" ",
						formatNumber(downloads)
					]
				}), stars > 0 && /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("span", {
					className: "sm-card-stat",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(StarIcon, {}),
						" ",
						formatNumber(stars)
					]
				})]
			})
		]
	});
}
var import_react$35, import_jsx_runtime$27;
var init_card_frame = __esmMin((() => {
	init_style$8();
	init_src$1();
	init_src();
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_SkillAvatar();
	init_useI18n();
	init_icons$1();
	init_text();
	init_card_batch_checkbox();
	import_jsx_runtime$27 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/card-overflow-menu.tsx
/**
* 卡片右上角 ⋯ 溢出菜单（试一试 / 启停 / 编辑 / 打开文件夹 / 卸载）。
*/
function CardOverflowMenu(props) {
	const { trackSource, disabled = false, showEnableDisable = false, onToggleEnable, onTry, onEdit, onOpenFolder, onUninstall } = props;
	const t = useTranslation();
	const [menuOpen, setMenuOpen] = (0, import_react$34.useState)(false);
	const menuRef = (0, import_react$34.useRef)(null);
	(0, import_react$34.useEffect)(() => {
		if (!menuOpen) return;
		const handleOutsideClick = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [menuOpen]);
	const closeMenu = () => {
		setMenuOpen(false);
	};
	const handleMenuToggle = (event) => {
		event.stopPropagation();
		setMenuOpen((current) => !current);
	};
	const handleTry = (event) => {
		event.stopPropagation();
		onTry?.();
		closeMenu();
	};
	const handleToggleEnable = (event) => {
		event.stopPropagation();
		onToggleEnable?.();
		closeMenu();
	};
	const handleEdit = (event) => {
		event.stopPropagation();
		onEdit?.();
		closeMenu();
	};
	const handleOpenFolder = (event) => {
		event.stopPropagation();
		onOpenFolder?.();
		closeMenu();
	};
	const handleUninstall = (event) => {
		event.stopPropagation();
		onUninstall?.();
		closeMenu();
	};
	if (!!!(showEnableDisable && onToggleEnable || onTry || onEdit || onOpenFolder || onUninstall)) return null;
	const toggleTrackProps = !disabled ? {
		"data-track-id": "skill_post_install_dismiss",
		"data-track-name": "安装后关闭",
		"data-track-props": JSON.stringify({ source: trackSource })
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
		className: "sm-card-menu-wrap",
		ref: menuRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("button", {
			type: "button",
			className: `sm-card-menu-btn${menuOpen ? " is-open" : ""}`,
			onClick: handleMenuToggle,
			"aria-label": "more",
			children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(CardMoreIcon, {})
		}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
			className: "sm-card-menu",
			children: [
				onTry && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "sm-card-menu-item",
					onClick: handleTry,
					"data-track-id": "skill_action",
					"data-track-name": "去对话",
					"data-track-props": JSON.stringify({
						source: trackSource,
						type: "try"
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(UseSkillIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: t("skills.card.goChat") })]
				}),
				showEnableDisable && onToggleEnable && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "sm-card-menu-item",
					onClick: handleToggleEnable,
					...toggleTrackProps,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(DisableIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: disabled ? t("skills.card.enable") : t("skills.card.disable") })]
				}),
				onEdit && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "sm-card-menu-item",
					onClick: handleEdit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(EditIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: t("skills.card.edit") })]
				}),
				onOpenFolder && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "sm-card-menu-item",
					onClick: handleOpenFolder,
					"data-track-id": "skill_action",
					"data-track-name": "打开文件夹",
					"data-track-props": JSON.stringify({
						source: trackSource,
						type: "open_folder"
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(FolderIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: t("skills.openInFolder") })]
				}),
				onUninstall && /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "sm-card-menu-item sm-card-menu-item--danger",
					onClick: handleUninstall,
					"data-track-id": "skill_action",
					"data-track-name": "卸载技能",
					"data-track-props": JSON.stringify({
						source: trackSource,
						type: "uninstall"
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(TrashIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: t("skills.card.uninstall") })]
				})
			]
		})]
	});
}
var import_react$34, import_jsx_runtime$26;
var init_card_overflow_menu = __esmMin((() => {
	init_style$8();
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_icons$1();
	import_jsx_runtime$26 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/check-or-try-button.tsx
/**
* 已安装态 ✓ / 「试一试」切换按钮。
*/
function CheckOrTryButton(props) {
	const { onTry } = props;
	const t = useTranslation();
	const handleTry = (event) => {
		event.stopPropagation();
		onTry?.();
	};
	if (onTry) return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Tooltip$1, {
		content: t("skills.tryNow"),
		placement: "top",
		children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("button", {
			type: "button",
			className: "sm-card-installed-check sm-card-installed-check--actionable",
			"aria-label": t("skills.tryNow"),
			onClick: handleTry,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "sm-card-installed-check__default",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(CheckIcon, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "sm-card-installed-check__hover",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(UseSkillIcon, {})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
		className: "sm-card-installed-check",
		"aria-label": t("skills.card.installed"),
		title: t("skills.card.installed"),
		children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(CheckIcon, {})
	});
}
var import_jsx_runtime$25;
var init_check_or_try_button = __esmMin((() => {
	init_style$8();
	init_src$1();
	init_src();
	require_react();
	init_useI18n();
	init_icons$1();
	import_jsx_runtime$25 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/market-plugin-card.tsx
/**
* 市场 Plugin 卡片：安装 / 安装中 / 已装（不做列表更新态）。
*/
function MarketPluginCard(props) {
	const { cardInfo, status, enabled = true, className, onOpen, onInstall, onToggle, onUninstall, onOpenFolder } = props;
	const isInstalled = status === InstallStatus.Installed;
	const isInstalling = status === InstallStatus.Installing;
	const handleStopPropagation = (e) => {
		e.stopPropagation();
	};
	const handleInstall = async (e) => {
		e.stopPropagation();
		if (!isInstalling) await onInstall?.();
	};
	let actions = null;
	if (isInstalled) actions = /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
		className: "sm-status",
		onClick: handleStopPropagation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(CardOverflowMenu, {
			trackSource: cardInfo.title,
			disabled: !enabled,
			showEnableDisable: !!onToggle,
			onToggleEnable: onToggle,
			onOpenFolder,
			onUninstall
		}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(CheckOrTryButton, {})]
	});
	else if (onInstall || isInstalling) actions = /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("button", {
		type: "button",
		className: `sm-add-btn${isInstalling ? " sm-add-btn--loading" : ""}`,
		onClick: handleInstall,
		disabled: isInstalling,
		"data-track-id": "skill_action",
		"data-track-name": "直接安装技能",
		"data-track-props": JSON.stringify({
			source: cardInfo.title,
			type: "install",
			mode: "list"
		}),
		children: isInstalling ? /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", { className: "sm-install-loading" }) : /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(PlusIcon, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(CardFrame, {
		title: cardInfo.title,
		description: cardInfo.description,
		iconUrl: cardInfo.iconUrl,
		badgeText: cardInfo.badgeText,
		className,
		installed: isInstalled,
		disabled: isInstalled && !enabled,
		onOpen,
		actions
	});
}
var import_jsx_runtime$24;
var init_market_plugin_card = __esmMin((() => {
	init_style$8();
	require_react();
	init_constants();
	init_icons$1();
	init_card_frame();
	init_card_overflow_menu();
	init_check_or_try_button();
	import_jsx_runtime$24 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/market-skill-card.tsx
/**
* 市场 Skill 卡片：按 InstallStatus 展示安装 / 更新 / 已装操作。
*/
function MarketSkillCard(props) {
	const { cardInfo, status, useTryWhenInstalled = false, enabled = true, className, onOpen, onInstall, onTry, onToggle, onUninstall, onEdit, onOpenFolder, isFirst = false } = props;
	const t = useTranslation();
	const isInstalledSlot = status === InstallStatus.Installed && !useTryWhenInstalled;
	const showTryButton = status === InstallStatus.Installed && useTryWhenInstalled;
	const isInstalling = status === InstallStatus.Installing;
	const isUpdate = status === InstallStatus.Update;
	const handleStopPropagation = (e) => {
		e.stopPropagation();
	};
	const handleTry = async (e) => {
		e.stopPropagation();
		await onTry?.();
	};
	const handleInstall = async (e) => {
		e.stopPropagation();
		if (!isInstalling) await onInstall?.();
	};
	let actions = null;
	if (isInstalledSlot) actions = /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
		className: "sm-status",
		onClick: handleStopPropagation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(CardOverflowMenu, {
			trackSource: cardInfo.title,
			disabled: !enabled,
			showEnableDisable: !!onToggle,
			onToggleEnable: onToggle,
			onEdit,
			onOpenFolder,
			onUninstall
		}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(CheckOrTryButton, { onTry })]
	});
	else if (showTryButton) actions = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Tooltip$1, {
		content: t("skills.tryNow"),
		placement: "top",
		children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("button", {
			type: "button",
			className: "sm-add-btn sm-use-btn",
			onClick: handleTry,
			children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(UseSkillIcon, {})
		})
	});
	else if (onInstall || isInstalling) actions = /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("button", {
		type: "button",
		className: `sm-add-btn${isInstalling ? " sm-add-btn--loading" : ""}`,
		disabled: isInstalling,
		title: isUpdate ? t("skills.recommend.update") : void 0,
		"aria-label": isUpdate ? t("skills.recommend.update") : void 0,
		"data-track-id": "skill_action",
		"data-track-name": "直接安装技能",
		"data-track-props": JSON.stringify({
			source: cardInfo.title,
			type: isUpdate ? "update" : "install",
			mode: "list"
		}),
		onClick: handleInstall,
		children: isInstalling ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", { className: "sm-install-loading" }) : /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(PlusIcon, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(CardFrame, {
		title: cardInfo.title,
		description: cardInfo.description,
		iconUrl: cardInfo.iconUrl,
		downloads: cardInfo.downloads,
		stars: cardInfo.stars,
		sourceLabel: cardInfo.sourceLabel,
		reasonLabel: cardInfo.reasonLabel,
		needsApiKey: cardInfo.needsApiKey,
		className,
		installed: isInstalledSlot,
		disabled: isInstalledSlot && !enabled,
		onOpen,
		actions,
		isFirst
	});
}
var import_jsx_runtime$23;
var init_market_skill_card = __esmMin((() => {
	init_style$8();
	init_src$1();
	require_react();
	init_useI18n();
	init_constants();
	init_icons$1();
	init_card_frame();
	init_card_overflow_menu();
	init_check_or_try_button();
	import_jsx_runtime$23 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/my-plugin-card.tsx
/**
* 「我的」已装 Plugin 卡片：浏览态 pin+Switch，搜索态 ⋯+✓，支持批量。
*/
function MyPluginCard(props) {
	const { cardInfo, className, variant = "browse", enabled, pinned, batchMode = false, selected = false, onToggleSelect, onOpen, onToggle, onUninstall, onOpenFolder, onTogglePin } = props;
	const t = useTranslation();
	const isBrowse = variant === "browse";
	const disabled = !enabled;
	const handleStopPropagation = (e) => {
		e.stopPropagation();
	};
	const handleTogglePin = async (e) => {
		e.stopPropagation();
		await onTogglePin?.(!pinned);
	};
	const handleToggle = async (next) => {
		await onToggle(next);
	};
	const handleToggleFromMenu = async () => {
		await onToggle(disabled);
	};
	const actions = isBrowse ? /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
		className: "sm-status",
		onClick: handleStopPropagation,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(CardOverflowMenu, {
				trackSource: cardInfo.title,
				onOpenFolder,
				onUninstall
			}),
			onTogglePin && /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Tooltip$1, {
				content: pinned ? t("skills.card.unpin") : t("skills.card.pin"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("button", {
					type: "button",
					className: `sm-card-pin${pinned ? " sm-card-pin--active" : ""}`,
					"aria-label": pinned ? t("skills.card.unpin") : t("skills.card.pin"),
					"aria-pressed": !!pinned,
					onClick: handleTogglePin,
					"data-track-id": "skill_action",
					"data-track-name": pinned ? "取消置顶" : "置顶",
					"data-track-props": JSON.stringify({
						source: cardInfo.title,
						type: pinned ? "unpin" : "pin"
					}),
					children: pinned ? /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(UnpinIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(PinIcon, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Tooltip$1, {
				content: disabled ? t("skills.card.enable") : t("skills.card.disable"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
					className: "sm-card-switch-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Switch, {
						size: "small",
						checked: enabled,
						onChange: handleToggle,
						"aria-label": disabled ? t("skills.card.enable") : t("skills.card.disable")
					})
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
		className: "sm-status",
		onClick: handleStopPropagation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(CardOverflowMenu, {
			trackSource: cardInfo.title,
			disabled,
			showEnableDisable: true,
			onToggleEnable: handleToggleFromMenu,
			onOpenFolder,
			onUninstall
		}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(CheckOrTryButton, {})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(CardFrame, {
		title: cardInfo.title,
		description: cardInfo.description,
		iconUrl: cardInfo.iconUrl,
		badgeText: cardInfo.badgeText,
		builtinBadgeText: cardInfo.builtinBadgeText,
		className,
		installed: true,
		installedListMode: isBrowse,
		disabled,
		batchMode,
		selected,
		onToggleSelect,
		onOpen,
		actions
	});
}
var import_jsx_runtime$22;
var init_my_plugin_card = __esmMin((() => {
	init_style$8();
	init_src$1();
	require_react();
	init_useI18n();
	init_icons$1();
	init_card_frame();
	init_card_overflow_menu();
	init_check_or_try_button();
	import_jsx_runtime$22 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/my-skill-card.tsx
/**
* 「我的」已装 Skill 卡片：浏览态 pin+Switch，搜索态 ⋯+✓，支持批量与更新。
*/
function MySkillCard(props) {
	const { cardInfo, className, variant = "browse", enabled, pinned, updateStatus = "none", onUpdate, batchMode = false, selected = false, onToggleSelect, onOpen, onToggle, onUninstall, onEdit, onOpenFolder, onTry, onTogglePin } = props;
	const t = useTranslation();
	const isBrowse = variant === "browse";
	const disabled = !enabled;
	const handleStopPropagation = (event) => {
		event.stopPropagation();
	};
	const handleTogglePin = async (event) => {
		event.stopPropagation();
		await onTogglePin?.(!pinned);
	};
	const handleToggle = async (next) => {
		await onToggle(next);
	};
	const handleToggleFromMenu = async () => {
		await onToggle(disabled);
	};
	const actions = isBrowse ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
		className: "sm-status",
		onClick: handleStopPropagation,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CardOverflowMenu, {
				trackSource: cardInfo.title,
				onTry,
				onEdit,
				onOpenFolder,
				onUninstall
			}),
			onTogglePin && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Tooltip$1, {
				content: pinned ? t("skills.card.unpin") : t("skills.card.pin"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("button", {
					type: "button",
					className: `sm-card-pin${pinned ? " sm-card-pin--active" : ""}`,
					"aria-label": pinned ? t("skills.card.unpin") : t("skills.card.pin"),
					"aria-pressed": !!pinned,
					onClick: handleTogglePin,
					"data-track-id": "skill_action",
					"data-track-name": pinned ? "取消置顶" : "置顶",
					"data-track-props": JSON.stringify({
						source: cardInfo.title,
						type: pinned ? "unpin" : "pin"
					}),
					children: pinned ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(UnpinIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(PinIcon, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Tooltip$1, {
				content: disabled ? t("skills.card.enable") : t("skills.card.disable"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
					className: "sm-card-switch-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Switch, {
						size: "small",
						checked: enabled,
						onChange: handleToggle,
						"aria-label": disabled ? t("skills.card.enable") : t("skills.card.disable")
					})
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
		className: "sm-status",
		onClick: handleStopPropagation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CardOverflowMenu, {
			trackSource: cardInfo.title,
			disabled,
			showEnableDisable: true,
			onToggleEnable: handleToggleFromMenu,
			onEdit,
			onOpenFolder,
			onUninstall
		}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CheckOrTryButton, {})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(CardFrame, {
		title: cardInfo.title,
		description: cardInfo.description,
		iconUrl: cardInfo.iconUrl,
		downloads: cardInfo.downloads,
		stars: cardInfo.stars,
		sourceLabel: cardInfo.sourceLabel,
		builtinBadgeText: cardInfo.builtinBadgeText,
		needsApiKey: cardInfo.needsApiKey,
		riskResult: cardInfo.riskResult,
		updateStatus,
		className,
		installed: true,
		installedListMode: isBrowse,
		disabled,
		batchMode,
		selected,
		onToggleSelect,
		onOpen,
		onUpdate,
		actions
	});
}
var import_jsx_runtime$21;
var init_my_skill_card = __esmMin((() => {
	init_style$8();
	init_src$1();
	require_react();
	init_useI18n();
	init_icons$1();
	init_card_frame();
	init_card_overflow_menu();
	init_check_or_try_button();
	import_jsx_runtime$21 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/skill-card-skeleton.tsx
/**
* 技能卡片加载骨架。
*/
function SkillCardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
		className: "sm-card sm-card--skeleton",
		children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
			className: "sm-card-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", { className: "sm-card-icon sm-card-skeleton-block" }),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "sm-card-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", { className: "sm-card-skeleton-line sm-card-skeleton-line--name" }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", { className: "sm-card-skeleton-line sm-card-skeleton-line--desc" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", { className: "sm-card-skeleton-toggle" })
			]
		})
	});
}
var import_jsx_runtime$20;
var init_skill_card_skeleton = __esmMin((() => {
	init_style$8();
	require_react();
	import_jsx_runtime$20 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/cards/index.ts
var init_cards = __esmMin((() => {
	init_card_batch_checkbox();
	init_card_frame();
	init_card_overflow_menu();
	init_check_or_try_button();
	init_market_plugin_card();
	init_market_skill_card();
	init_my_plugin_card();
	init_my_skill_card();
	init_skill_card_skeleton();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/market-status-view/index.tsx
/**
* Tab 栏骨架占位。
*/
function TabBarSkeleton() {
	const widths = (0, import_react$27.useMemo)(() => [
		72,
		96,
		64,
		88
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
		className: "sm-segment-bar",
		children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
			className: "sm-segment-group",
			children: widths.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", { style: {
				...skeletonLineStyle,
				width: w,
				height: 32,
				borderRadius: 8
			} }, `tab-skel-${i}`))
		})
	});
}
/**
* 分类筛选栏骨架占位。
*/
function CategoryBarSkeleton() {
	const widths = (0, import_react$27.useMemo)(() => [
		56,
		80,
		64,
		72,
		48
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
		className: "sm-discover-filters",
		style: {
			display: "flex",
			gap: 8,
			flexWrap: "wrap"
		},
		children: widths.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", { style: {
			...skeletonLineStyle,
			width: w,
			height: 28,
			borderRadius: 6
		} }, `cat-skel-${i}`))
	});
}
/**
* 精选推荐区骨架占位。
*/
function FeaturedSkeleton() {
	const { gridRef, columns } = useGridColumns();
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		className: "sm-featured-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
			className: "sm-featured-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", { style: {
				...skeletonLineStyle,
				width: 96,
				height: 20,
				borderRadius: 4
			} })
		}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
			className: "sm-grid",
			ref: gridRef,
			children: Array.from({ length: columns }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(SkillCardSkeleton, {}, `featured-skel-${i}`))
		})]
	});
}
/**
* 市场面板骨架屏（精选 + Tab + 分类 + 卡片网格）。
*/
function MarketSkeleton(props) {
	const { tabs: tabCount } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		className: "sm-discover sm-discover--loading",
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(FeaturedSkeleton, {}),
			tabCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(TabBarSkeleton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(CategoryBarSkeleton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
				className: "sm-grid",
				children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(SkillCardSkeleton, {}, `market-skel-${i}`))
			})
		]
	});
}
/**
* 市场面板错误态与重试。
*/
function MarketError(props) {
	const { message, retryLabel, onRetry } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
		className: "sm-discover sm-discover--error",
		children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(MarketListError, {
			message,
			retryLabel,
			onRetry
		})
	});
}
/**
* 列表区硬错误与重试（Discover / 父级外置；不订 service）。
*/
function MarketListError(props) {
	const { message, retryLabel, onRetry } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		className: "sm-market-error",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("p", { children: message }), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("button", {
			type: "button",
			className: "sm-market-retry-btn",
			onClick: onRetry,
			children: retryLabel
		})]
	});
}
/**
* 列表顶部错误 banner 与重试。
*/
function MarketListErrorBanner(props) {
	const { message, retryLabel, onRetry } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		className: "sm-market-error-banner",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", { children: message }), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("button", {
			type: "button",
			className: "sm-market-error-banner-retry",
			onClick: onRetry,
			children: retryLabel
		})]
	});
}
var import_react$27, import_jsx_runtime$19, skeletonLineStyle;
var init_market_status_view = __esmMin((() => {
	init_style$9();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_constants();
	init_use_grid_columns();
	init_cards();
	import_jsx_runtime$19 = require_jsx_runtime();
	skeletonLineStyle = {
		background: [
			"linear-gradient(90deg,",
			"color-mix(in srgb, var(--wb-border-subtle) 50%, transparent) 25%,",
			"var(--wb-bg-hover) 50%,",
			"color-mix(in srgb, var(--wb-border-subtle) 50%, transparent) 75%)"
		].join(" "),
		backgroundSize: "200% 100%",
		animation: "sm-skeleton-shimmer 1.5s ease-in-out infinite"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/style.less
var init_style$7 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-infinite-scroll.ts
/**
* 无限滚动哨兵：sentinel 进入可视区时触发 onLoadMore。
*
* - `scrollRoot`：滚动容器；不传则相对视口观察（适合页面级滚动）。
* - 有 `scrollRoot` 时额外挂 scroll 兜底，避免 1px sentinel + 快速滚动漏触发。
*/
function useInfiniteScroll(onLoadMore, enabled, scrollRoot) {
	const [sentinelElement, setSentinelElement] = (0, import_react$26.useState)(null);
	const onLoadMoreRef = (0, import_react$26.useRef)(onLoadMore);
	onLoadMoreRef.current = onLoadMore;
	(0, import_react$26.useEffect)(() => {
		if (!enabled || !sentinelElement) return;
		const root = scrollRoot?.current ?? null;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMoreRef.current();
		}, {
			root,
			rootMargin: "200px"
		});
		observer.observe(sentinelElement);
		const handleScroll = () => {
			if (!root) return;
			if (root.scrollHeight - (root.scrollTop + root.clientHeight) < 200) onLoadMoreRef.current();
		};
		if (root) root.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			observer.disconnect();
			if (root) root.removeEventListener("scroll", handleScroll);
		};
	}, [
		enabled,
		scrollRoot,
		sentinelElement
	]);
	return (0, import_react$26.useCallback)((node) => {
		setSentinelElement(node);
	}, []);
}
var import_react$26;
var init_use_infinite_scroll = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/collection-panel.tsx
/**
* 运营 Collection 列表：技能网格（分类条 / 错误壳由 DiscoverSection 组装）。
*/
function CollectionPanel(props) {
	const { skills, loading, emptyText, hasMore = false, onLoadMore } = props;
	const t = useTranslation();
	const uiService = useService(ServiceKey.UIService);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const detailService = useService(ServiceKey.DetailService);
	const handleTrySkill = useTrySkill();
	const { editSkill } = useSkillCreatorActions();
	const isDesktop = isWorkBuddyDesktop();
	const installingSkillId = marketBuiltinService.useStore((s) => s.installingSkillId);
	const localVersionMap = marketBuiltinService.useStore((s) => s.localVersionMap);
	const remoteVersionMap = marketBuiltinService.useStore((s) => s.remoteVersionMap);
	const recentlyInstalledIds = marketBuiltinService.useStore((s) => s.recentlyInstalledIds);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const cards = (0, import_react$25.useMemo)(() => {
		const installSources = {
			installingSkillId,
			localVersionMap,
			remoteVersionMap,
			installedSkills,
			recentlyInstalledIds
		};
		return skills.map((skill) => {
			const skillId = getBuiltinMarketSkillId(skill);
			const query = {
				skillId,
				name: skill.name
			};
			const local = installedSkillsService.findInstalledMatch(query, installedSkills);
			const labels = skill.labels;
			return {
				skill,
				skillId,
				query,
				installStatus: marketBuiltinService.computeInstallState(skill, installSources).status,
				needsApiKey: needsApiKeyFromLabels(labels),
				enabled: local ? !isSkillModelInvocationDisabled(local) : true,
				hasLocal: !!local
			};
		});
	}, [
		skills,
		installingSkillId,
		localVersionMap,
		remoteVersionMap,
		recentlyInstalledIds,
		installedSkills,
		installedSkillsService,
		marketBuiltinService
	]);
	const sentinelRef = useInfiniteScroll(() => {
		if (!loading) onLoadMore?.();
	}, hasMore && !loading && !!onLoadMore);
	const handleSkillClick = (skill) => {
		uiService.openRemoteSkillDetail(skill);
	};
	const handleInstallOrUpdate = async (skill) => {
		const isUpdate = marketBuiltinService.resolveInstallState(skill).status === InstallStatus.Update;
		const runUpdate = async () => {
			try {
				const result = await (isUpdate ? marketBuiltinService.update(skill) : marketBuiltinService.install(skill));
				if (!result.success) {
					toastSkillActionError(result.errorMessage || t("skills.toast.installFailed"));
					return;
				}
				const display = getBuiltinMarketDisplayName(skill);
				toastSkillInstallSuccess({
					message: t(isUpdate ? "skills.recommend.updateSuccess" : "skills.recommend.installSuccess", { name: display }),
					trySkill: handleTrySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill),
					displayText: display,
					skillId: getBuiltinMarketSkillId(skill)
				});
			} catch {
				toastSkillActionError(t("skills.toast.installFailed"));
			}
		};
		if (isUpdate) {
			if (installedSkillsService.findInstalledMatch({
				skillId: getBuiltinMarketSkillId(skill),
				name: skill.name
			})?.userModified) {
				uiService.setPendingModifiedUpdate(runUpdate);
				return;
			}
		}
		await runUpdate();
	};
	const handleTryInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		handleTrySkill(current.name, pickLocalizedExamples(current), current.name, current.skillId);
	};
	const handleToggleInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.toggleSkill(current.filePath, isSkillModelInvocationDisabled(current));
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleUninstallInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.uninstall(current);
		if (result.success) toast({
			message: t("skills.batch.uninstallSuccess", { count: "1" }),
			type: "success"
		});
		else toastSkillActionError(result.errorMessage || t("skills.toast.deleteFailed"));
	};
	const handleEditInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		editSkill(current);
	};
	const handleOpenFolderInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		await detailService.openFolder(current);
	};
	const resolvedEmpty = emptyText ?? t("skills.collection.empty");
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
		cards.length === 0 && !loading ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			className: "sm-empty",
			"data-market-perf": "empty",
			children: resolvedEmpty
		}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			className: "sm-grid",
			children: loading && skills.length === 0 ? Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(SkillCardSkeleton, {}, `collection-skeleton-${index}`)) : cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(MarketSkillCard, {
				isFirst: index === 0,
				cardInfo: {
					title: getBuiltinMarketDisplayName(card.skill),
					description: getBuiltinCardDescription(card.skill),
					iconUrl: resolveIconUrl(card.skill.icon_url, card.skill.icon),
					needsApiKey: card.needsApiKey
				},
				status: card.installStatus,
				enabled: card.enabled,
				onOpen: () => handleSkillClick(card.skill),
				onInstall: () => handleInstallOrUpdate(card.skill),
				onTry: card.hasLocal ? () => handleTryInstalled(card.query) : void 0,
				onToggle: card.hasLocal ? () => handleToggleInstalled(card.query) : void 0,
				onUninstall: card.hasLocal ? () => handleUninstallInstalled(card.query) : void 0,
				onEdit: isDesktop && card.hasLocal ? () => handleEditInstalled(card.query) : void 0,
				onOpenFolder: isDesktop && card.hasLocal ? () => handleOpenFolderInstalled(card.query) : void 0
			}, card.skillId))
		}),
		hasMore && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			ref: sentinelRef,
			className: "sm-scroll-sentinel"
		}),
		loading && skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			className: "sm-panel-loading-more",
			children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { className: "sm-skeleton-line sm-skeleton-line--medium" })
		})
	] });
}
var import_react$25, import_jsx_runtime$18;
var init_collection_panel = __esmMin((() => {
	init_style$7();
	init_common();
	init_src$1();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_constants();
	init_market_service_context();
	init_use_infinite_scroll();
	init_use_skill_creator_actions();
	init_use_try_skill();
	init_icon();
	init_skill_utils();
	init_text();
	init_toast();
	init_cards();
	import_jsx_runtime$18 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/enterprise-panel.tsx
/**
* 企业 Skill 列表：技能网格（分类条 / 错误壳由 DiscoverSection 组装）。
*/
function EnterprisePanel(props) {
	const { skills, loading, emptyText, hasMore = false, onLoadMore } = props;
	const t = useTranslation();
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const detailService = useService(ServiceKey.DetailService);
	const handleTrySkill = useTrySkill();
	const { editSkill } = useSkillCreatorActions();
	const isDesktop = isWorkBuddyDesktop();
	const installingId = enterpriseService.useStore((s) => s.installingId);
	const recentlyInstalledIds = enterpriseService.useStore((s) => s.recentlyInstalledIds);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const cards = (0, import_react$24.useMemo)(() => {
		const installSources = {
			installingId,
			recentlyInstalledIds,
			installedSkills
		};
		return skills.map((skill) => {
			const query = {
				skillId: skill.id,
				name: skill.name
			};
			const local = installedSkillsService.findInstalledMatch(query, installedSkills);
			return {
				skill,
				skillId: skill.id,
				query,
				installStatus: enterpriseService.computeInstallState(skill, installSources).status,
				enabled: local ? !isSkillModelInvocationDisabled(local) : true,
				hasLocal: !!local
			};
		});
	}, [
		skills,
		installingId,
		recentlyInstalledIds,
		installedSkills
	]);
	const sentinelRef = useInfiniteScroll(() => {
		if (loading || !hasMore) return;
		onLoadMore?.();
	}, hasMore && !loading && !!onLoadMore);
	const handleSkillClick = (skill) => {
		uiService.openRemoteSkillDetail({
			...skill,
			source: skill.source ?? "custom"
		});
	};
	const handleInstall = async (skill) => {
		const displayName = resolveEnterpriseDisplayName(skill);
		try {
			const result = await enterpriseService.install(skill);
			if (!result.success) {
				toastSkillActionError(result.errorMessage || t("skills.recommend.installFailed", { name: displayName }));
				return;
			}
			toastSkillInstallSuccess({
				message: t("skills.recommend.installSuccess", { name: displayName }),
				trySkill: handleTrySkill,
				skillName: skill.name,
				displayText: displayName
			});
		} catch {
			toastSkillActionError(t("skills.recommend.installFailed", { name: displayName }));
		}
	};
	const handleTryInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		handleTrySkill(current.name, pickLocalizedExamples(current), current.name, current.skillId);
	};
	const handleToggleInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.toggleSkill(current.filePath, isSkillModelInvocationDisabled(current));
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleUninstallInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.uninstall(current);
		if (result.success) toast({
			message: t("skills.batch.uninstallSuccess", { count: "1" }),
			type: "success"
		});
		else toastSkillActionError(result.errorMessage || t("skills.toast.deleteFailed"));
	};
	const handleEditInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		editSkill(current);
	};
	const handleOpenFolderInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		await detailService.openFolder(current);
	};
	const resolvedEmpty = emptyText ?? t("skills.enterprise.empty");
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
			className: "sm-grid",
			children: loading && skills.length === 0 ? Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(SkillCardSkeleton, {}, `enterprise-skeleton-${index}`)) : cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(MarketSkillCard, {
				cardInfo: {
					title: resolveEnterpriseDisplayName(card.skill),
					description: getEnterpriseCardDescription(card.skill),
					iconUrl: resolveIconUrl(card.skill.icon_url)
				},
				status: card.installStatus,
				enabled: card.enabled,
				onOpen: () => handleSkillClick(card.skill),
				onInstall: () => handleInstall(card.skill),
				onTry: card.hasLocal ? () => handleTryInstalled(card.query) : void 0,
				onToggle: card.hasLocal ? () => handleToggleInstalled(card.query) : void 0,
				onUninstall: card.hasLocal ? () => handleUninstallInstalled(card.query) : void 0,
				onEdit: isDesktop && card.hasLocal ? () => handleEditInstalled(card.query) : void 0,
				onOpenFolder: isDesktop && card.hasLocal ? () => handleOpenFolderInstalled(card.query) : void 0
			}, card.skillId))
		}),
		cards.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
			className: "sm-empty",
			children: resolvedEmpty
		}),
		hasMore && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
			ref: sentinelRef,
			className: "sm-scroll-sentinel"
		}),
		loading && skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
			className: "sm-panel-loading-more",
			children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", { className: "sm-skeleton-line sm-skeleton-line--medium" })
		})
	] });
}
var import_react$24, import_jsx_runtime$17;
var init_enterprise_panel = __esmMin((() => {
	init_style$7();
	init_src$1();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_constants();
	init_market_service_context();
	init_use_infinite_scroll();
	init_use_skill_creator_actions();
	init_use_try_skill();
	init_enterprise();
	init_icon();
	init_skill_utils();
	init_text();
	init_toast();
	init_cards();
	import_jsx_runtime$17 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/knot-panel.tsx
/**
* Knot 列表：技能网格（分类条 / 错误壳由 DiscoverSection 组装）。
*/
function KnotPanel(props) {
	const { skills, loading, emptyText, hasMore = false, onLoadMore } = props;
	const t = useTranslation();
	const knotService = useService(ServiceKey.KnotService);
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const detailService = useService(ServiceKey.DetailService);
	const handleTrySkill = useTrySkill();
	const { editSkill } = useSkillCreatorActions();
	const isDesktop = isWorkBuddyDesktop();
	const installingSlug = knotService.useStore((s) => s.installingSlug);
	const localVersionMap = knotService.useStore((s) => s.localVersionMap);
	const remoteVersionMap = knotService.useStore((s) => s.remoteVersionMap);
	const recentlyInstalledSlugs = knotService.useStore((s) => s.recentlyInstalledSlugs);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const cards = (0, import_react$23.useMemo)(() => {
		const installSources = {
			installingSlug,
			installedSkills,
			localVersionMap,
			remoteVersionMap,
			recentlyInstalledSlugs
		};
		return skills.map((skill) => {
			const query = {
				slug: skill.slug,
				name: skill.name
			};
			const local = installedSkillsService.findInstalledMatch(query, installedSkills);
			const labels = skill.labels;
			const knotSkill = skill;
			return {
				skill,
				slug: skill.slug,
				key: knotSkillKey(knotSkill),
				query,
				installStatus: knotService.computeInstallState(knotSkill, installSources).status,
				needsApiKey: needsApiKeyFromLabels(labels),
				enabled: local ? !isSkillModelInvocationDisabled(local) : true,
				hasLocal: !!local
			};
		});
	}, [
		skills,
		installingSlug,
		localVersionMap,
		remoteVersionMap,
		recentlyInstalledSlugs,
		installedSkills,
		installedSkillsService,
		knotService
	]);
	const sentinelRef = useInfiniteScroll(() => {
		if (!loading) onLoadMore?.();
	}, hasMore && !loading && !!onLoadMore);
	const handleSkillClick = (skill) => {
		uiService.openRemoteSkillDetail(skill);
	};
	const handleInstallOrUpdate = async (skill) => {
		const knotSkill = skill;
		const isUpdate = knotService.resolveInstallState(knotSkill).status === InstallStatus.Update;
		const runUpdate = async () => {
			try {
				const result = await (isUpdate ? knotService.update(knotSkill) : knotService.install(knotSkill));
				if (!result.success) {
					toastSkillActionError(result.errorMessage || t("skills.knot.installFailed.package"));
					return;
				}
				toastSkillInstallSuccess({
					message: t(isUpdate ? "skills.knot.updateSuccess" : "skills.knot.installSuccess", { name: skill.name }),
					trySkill: handleTrySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill)
				});
			} catch {
				toastSkillActionError(t("skills.knot.installFailed.package"));
			}
		};
		if (isUpdate) {
			if (installedSkillsService.findInstalledMatch({
				slug: skill.slug,
				name: skill.name
			})?.userModified) {
				uiService.setPendingModifiedUpdate(runUpdate);
				return;
			}
		}
		await runUpdate();
	};
	const handleTryInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		handleTrySkill(current.name, pickLocalizedExamples(current), current.name, current.skillId);
	};
	const handleToggleInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.toggleSkill(current.filePath, isSkillModelInvocationDisabled(current));
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleUninstallInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.uninstall(current);
		if (result.success) toast({
			message: t("skills.batch.uninstallSuccess", { count: "1" }),
			type: "success"
		});
		else toastSkillActionError(result.errorMessage || t("skills.toast.deleteFailed"));
	};
	const handleEditInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		editSkill(current);
	};
	const handleOpenFolderInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		await detailService.openFolder(current);
	};
	const resolvedEmpty = emptyText ?? t("skills.knot.empty");
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)(import_jsx_runtime$16.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "sm-grid",
			children: loading && cards.length === 0 ? Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(SkillCardSkeleton, {}, `knot-skeleton-${index}`)) : cards.map((card) => {
				const hubSkill = card.skill;
				return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(MarketSkillCard, {
					cardInfo: {
						title: card.skill.name,
						description: getHubLikeCardDescription(card.skill),
						iconUrl: resolveIconUrl(card.skill.iconUrl),
						downloads: card.skill.downloads,
						stars: card.skill.stars,
						needsApiKey: card.needsApiKey
					},
					status: card.installStatus,
					enabled: card.enabled,
					onOpen: () => handleSkillClick(hubSkill),
					onInstall: () => handleInstallOrUpdate(hubSkill),
					onTry: card.hasLocal ? () => handleTryInstalled(card.query) : void 0,
					onToggle: card.hasLocal ? () => handleToggleInstalled(card.query) : void 0,
					onUninstall: card.hasLocal ? () => handleUninstallInstalled(card.query) : void 0,
					onEdit: isDesktop && card.hasLocal ? () => handleEditInstalled(card.query) : void 0,
					onOpenFolder: isDesktop && card.hasLocal ? () => handleOpenFolderInstalled(card.query) : void 0
				}, card.key);
			})
		}),
		cards.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "sm-empty",
			children: resolvedEmpty
		}),
		hasMore && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			ref: sentinelRef,
			className: "sm-scroll-sentinel"
		}),
		loading && skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "sm-panel-loading-more",
			children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", { className: "sm-skeleton-line sm-skeleton-line--medium" })
		})
	] });
}
var import_react$23, import_jsx_runtime$16;
var init_knot_panel = __esmMin((() => {
	init_style$7();
	init_src$1();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_constants();
	init_market_service_context();
	init_use_infinite_scroll();
	init_use_skill_creator_actions();
	init_use_try_skill();
	init_icon();
	init_knot_identity();
	init_skill_utils();
	init_text();
	init_toast();
	init_cards();
	import_jsx_runtime$16 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/plugins-panel.tsx
/**
* 插件市场列表网格（市场源滤条与添加/删除弹窗由 PluginsCategories 组装）。
*/
function PluginsPanel(props) {
	const { plugins, loading, emptyText } = props;
	const t = useTranslation();
	const isDesktop = isWorkBuddyDesktop();
	const pluginsService = useService(ServiceKey.PluginsService);
	const uiService = useService(ServiceKey.UIService);
	const installingPluginKeys = pluginsService.useStore((s) => s.installingPluginKeys);
	const installedPlugins = pluginsService.useStore((s) => s.installedPlugins);
	const recentlyInstalledKeys = pluginsService.useStore((s) => s.recentlyInstalledKeys);
	const handlePluginClick = (plugin) => {
		uiService.openPluginDetail(plugin);
	};
	const handleInstallPlugin = async (plugin, scope = "user") => {
		await pluginsService.install(plugin, scope);
	};
	const handleTogglePlugin = async (plugin, enabled) => {
		const scope = plugin.installedScopes?.[0] ?? "user";
		await pluginsService.toggle(plugin, !enabled, scope);
	};
	const handleUninstallPlugin = async (plugin) => {
		const scope = plugin.installedScopes?.[0] ?? "user";
		await pluginsService.uninstall(plugin, scope);
	};
	const handleOpenFolder = async (plugin) => {
		await pluginsService.openFolder(plugin);
	};
	const displayItems = (0, import_react$22.useMemo)(() => {
		const sources = {
			installingPluginKeys,
			installedPlugins,
			recentlyInstalledKeys
		};
		return plugins.map((plugin) => {
			const installedPlugin = installedPlugins.find((installed) => installed.name === plugin.name && installed.marketplaceName === plugin.marketplaceName);
			return {
				plugin,
				installedPlugin,
				enabled: installedPlugin ? !pluginsService.isDisabled(installedPlugin) : true,
				installStatus: pluginsService.computeInstallState(plugin, sources).status
			};
		});
	}, [
		plugins,
		installingPluginKeys,
		installedPlugins,
		recentlyInstalledKeys,
		pluginsService
	]);
	const resolvedEmpty = emptyText ?? t("skills.plugins.marketplaceEmpty");
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
		className: "sm-plugins-section",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "sm-grid",
			children: Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(SkillCardSkeleton, {}, `marketplace-sm-plugins-skeleton-${index}`))
		}) : /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)(import_jsx_runtime$15.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "sm-grid",
			children: displayItems.map(({ plugin, installedPlugin, enabled, installStatus }) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(MarketPluginCard, {
				cardInfo: {
					title: plugin.name,
					description: plugin.description
				},
				status: installStatus,
				enabled,
				onOpen: () => handlePluginClick(installedPlugin ?? plugin),
				onInstall: () => handleInstallPlugin(plugin),
				onToggle: installedPlugin ? () => handleTogglePlugin(installedPlugin, enabled) : void 0,
				onUninstall: installedPlugin ? () => handleUninstallPlugin(installedPlugin) : void 0,
				onOpenFolder: installedPlugin && isDesktop ? () => handleOpenFolder(installedPlugin) : void 0
			}, `marketplace-${plugin.marketplaceName}/${plugin.name}`))
		}), displayItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "sm-empty",
			children: resolvedEmpty
		})] })
	});
}
var import_react$22, import_jsx_runtime$15;
var init_plugins_panel = __esmMin((() => {
	init_style$7();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_constants();
	init_market_service_context();
	init_cards();
	import_jsx_runtime$15 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/skillhub-panel.tsx
/**
* SkillHub 列表：技能网格（分类条 / 错误壳由 DiscoverSection 组装）。
*/
function SkillhubPanel(props) {
	const { skills, loading, emptyText, hasMore = false, onLoadMore } = props;
	const t = useTranslation();
	const skillhubService = useService(ServiceKey.SkillhubService);
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const detailService = useService(ServiceKey.DetailService);
	const handleTrySkill = useTrySkill();
	const { editSkill } = useSkillCreatorActions();
	const isDesktop = isWorkBuddyDesktop();
	const installingSlug = skillhubService.useStore((s) => s.installingSlug);
	const localVersionMap = skillhubService.useStore((s) => s.localVersionMap);
	const remoteVersionMap = skillhubService.useStore((s) => s.remoteVersionMap);
	const recentlyInstalledSlugs = skillhubService.useStore((s) => s.recentlyInstalledSlugs);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const cards = (0, import_react$21.useMemo)(() => {
		const installSources = {
			installingSlug,
			installedSkills,
			localVersionMap,
			remoteVersionMap,
			recentlyInstalledSlugs
		};
		return skills.map((skill) => {
			const query = {
				slug: skill.slug,
				name: skill.name
			};
			const local = installedSkillsService.findInstalledMatch(query, installedSkills);
			const labels = skill.labels;
			return {
				skill,
				slug: skill.slug,
				query,
				installStatus: skillhubService.computeInstallState(skill, installSources).status,
				needsApiKey: needsApiKeyFromLabels(labels),
				enabled: local ? !isSkillModelInvocationDisabled(local) : true,
				hasLocal: !!local
			};
		});
	}, [
		skills,
		installingSlug,
		localVersionMap,
		remoteVersionMap,
		recentlyInstalledSlugs,
		installedSkills,
		installedSkillsService,
		skillhubService
	]);
	const sentinelRef = useInfiniteScroll(() => {
		if (!loading) onLoadMore?.();
	}, hasMore && !loading && !!onLoadMore);
	const handleSkillClick = (skill) => {
		uiService.openRemoteSkillDetail(skill);
	};
	const handleInstallOrUpdate = async (skill) => {
		const isUpdate = skillhubService.resolveInstallState(skill).status === InstallStatus.Update;
		const runUpdate = async () => {
			try {
				const result = await (isUpdate ? skillhubService.update(skill) : skillhubService.install(skill));
				if (!result.success) {
					toastSkillActionError(result.errorMessage || t("skills.skillhub.installFailed.package"));
					return;
				}
				toastSkillInstallSuccess({
					message: t(isUpdate ? "skills.skillhub.updateSuccess" : "skills.skillhub.installSuccess", { name: skill.name }),
					trySkill: handleTrySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill)
				});
			} catch {
				toastSkillActionError(t("skills.skillhub.installFailed.package"));
			}
		};
		if (isUpdate) {
			if (installedSkillsService.findInstalledMatch({
				slug: skill.slug,
				name: skill.name
			})?.userModified) {
				uiService.setPendingModifiedUpdate(runUpdate);
				return;
			}
		}
		await runUpdate();
	};
	const handleTryInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		handleTrySkill(current.name, pickLocalizedExamples(current), current.name, current.skillId);
	};
	const handleToggleInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.toggleSkill(current.filePath, isSkillModelInvocationDisabled(current));
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleUninstallInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.uninstall(current);
		if (result.success) toast({
			message: t("skills.batch.uninstallSuccess", { count: "1" }),
			type: "success"
		});
		else toastSkillActionError(result.errorMessage || t("skills.toast.deleteFailed"));
	};
	const handleEditInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		editSkill(current);
	};
	const handleOpenFolderInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		await detailService.openFolder(current);
	};
	const resolvedEmpty = emptyText ?? t("skills.skillhub.empty");
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "sm-grid",
			children: loading && cards.length === 0 ? Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(SkillCardSkeleton, {}, `hub-skeleton-${index}`)) : cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(MarketSkillCard, {
				cardInfo: {
					title: card.skill.name,
					description: getHubLikeCardDescription(card.skill),
					iconUrl: resolveIconUrl(card.skill.iconUrl),
					downloads: card.skill.downloads,
					stars: card.skill.stars,
					needsApiKey: card.needsApiKey
				},
				status: card.installStatus,
				enabled: card.enabled,
				onOpen: () => handleSkillClick(card.skill),
				onInstall: () => handleInstallOrUpdate(card.skill),
				onTry: card.hasLocal ? () => handleTryInstalled(card.query) : void 0,
				onToggle: card.hasLocal ? () => handleToggleInstalled(card.query) : void 0,
				onUninstall: card.hasLocal ? () => handleUninstallInstalled(card.query) : void 0,
				onEdit: isDesktop && card.hasLocal ? () => handleEditInstalled(card.query) : void 0,
				onOpenFolder: isDesktop && card.hasLocal ? () => handleOpenFolderInstalled(card.query) : void 0
			}, card.slug))
		}),
		cards.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "sm-empty",
			children: resolvedEmpty
		}),
		hasMore && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			ref: sentinelRef,
			className: "sm-scroll-sentinel"
		}),
		loading && skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "sm-panel-loading-more",
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "sm-skeleton-line sm-skeleton-line--medium" })
		})
	] });
}
var import_react$21, import_jsx_runtime$14;
var init_skillhub_panel = __esmMin((() => {
	init_style$7();
	init_src$1();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_constants();
	init_market_service_context();
	init_use_infinite_scroll();
	init_use_skill_creator_actions();
	init_use_try_skill();
	init_icon();
	init_skill_utils();
	init_text();
	init_toast();
	init_cards();
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/panels/index.ts
var init_panels = __esmMin((() => {
	init_collection_panel();
	init_enterprise_panel();
	init_knot_panel();
	init_plugins_panel();
	init_skillhub_panel();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/spotlight-rail/style.less
var init_style$6 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/spotlight-rail/index.tsx
/**
* Spotlight 单个推荐分区：标题 + 技能卡片横滑/网格。
*/
function SpotlightRailSection(props) {
	const { collection, templateId } = props;
	const t = useTranslation();
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const detailService = useService(ServiceKey.DetailService);
	const { editSkill } = useSkillCreatorActions();
	const isDesktop = isWorkBuddyDesktop();
	const recentlyInstalledIds = marketBuiltinService.useStore((s) => s.recentlyInstalledIds);
	const installingSkillId = marketBuiltinService.useStore((s) => s.installingSkillId);
	const localVersionMap = marketBuiltinService.useStore((s) => s.localVersionMap);
	const remoteVersionMap = marketBuiltinService.useStore((s) => s.remoteVersionMap);
	const rawSkills = marketBuiltinService.useStore((s) => s.collections[collection.id]?.skills ?? []);
	const loading = marketBuiltinService.useStore((s) => s.collections[collection.id]?.loading ?? false);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const isEn = toZhEnLocale(getLocale()) === "en";
	const cards = (0, import_react$20.useMemo)(() => {
		const installSources = {
			installingSkillId,
			localVersionMap,
			remoteVersionMap,
			installedSkills,
			recentlyInstalledIds
		};
		return rawSkills.filter((skill) => marketBuiltinService.computeIsRecentlyInstalled(skill, { recentlyInstalledIds }) || !marketBuiltinService.computeIsInstalled(skill, {
			localVersionMap,
			installedSkills
		})).map((skill) => {
			const skillId = getBuiltinMarketSkillId(skill);
			const query = {
				skillId,
				name: skill.name
			};
			const local = installedSkillsService.findInstalledMatch(query, installedSkills);
			const labels = skill.labels;
			return {
				skill,
				skillId,
				query,
				installStatus: marketBuiltinService.computeInstallState(skill, installSources).status,
				reasonLabel: resolveRecommendationReason(skill, isEn),
				needsApiKey: needsApiKeyFromLabels(labels),
				enabled: local ? !isSkillModelInvocationDisabled(local) : true,
				hasLocal: !!local
			};
		});
	}, [
		rawSkills,
		recentlyInstalledIds,
		installingSkillId,
		localVersionMap,
		remoteVersionMap,
		marketBuiltinService,
		installedSkillsService,
		isEn,
		installedSkills
	]);
	const handleTrySkill = useTrySkill();
	const { gridRef, columns } = useGridColumns();
	const [offset, setOffset] = (0, import_react$20.useState)(0);
	const visibleCards = Array.from({ length: Math.min(columns, cards.length) }, (_, i) => cards[(offset + i) % cards.length]);
	const title = resolveCollectionTitle(collection, isEn, t("skills.recommend.featured"));
	const hasAnyReason = visibleCards.some((card) => Boolean(card.reasonLabel));
	const canRefresh = cards.length > columns;
	const showSkeleton = loading && cards.length === 0;
	const handleRefresh = () => {
		setOffset((current) => current + columns);
	};
	const handleSkillClick = (skill) => {
		uiService.openRemoteSkillDetail(skill);
	};
	const handleInstallOrUpdate = async (skill) => {
		const isUpdate = marketBuiltinService.resolveInstallState(skill).status === InstallStatus.Update;
		const runUpdate = async () => {
			try {
				const result = await (isUpdate ? marketBuiltinService.update(skill) : marketBuiltinService.install(skill));
				if (!result.success) {
					toastSkillActionError(result.errorMessage || t("skills.toast.installFailed"));
					return;
				}
				const display = getBuiltinMarketDisplayName(skill);
				toastSkillInstallSuccess({
					message: t(isUpdate ? "skills.recommend.updateSuccess" : "skills.recommend.installSuccess", { name: display }),
					trySkill: handleTrySkill,
					skillName: skill.name,
					examples: pickLocalizedExamples(skill),
					displayText: display,
					skillId: getBuiltinMarketSkillId(skill)
				});
			} catch {
				toastSkillActionError(t("skills.toast.installFailed"));
			}
		};
		if (isUpdate) {
			if (installedSkillsService.findInstalledMatch({
				skillId: getBuiltinMarketSkillId(skill),
				name: skill.name
			})?.userModified) {
				uiService.setPendingModifiedUpdate(runUpdate);
				return;
			}
		}
		await runUpdate();
	};
	const handleTryInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		handleTrySkill(current.name, pickLocalizedExamples(current), current.name, current.skillId);
	};
	const handleToggleInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.toggleSkill(current.filePath, isSkillModelInvocationDisabled(current));
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleUninstallInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		const result = await installedSkillsService.uninstall(current);
		if (result.success) toast({
			message: t("skills.batch.uninstallSuccess", { count: "1" }),
			type: "success"
		});
		else toastSkillActionError(result.errorMessage || t("skills.toast.deleteFailed"));
	};
	const handleEditInstalled = (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		editSkill(current);
	};
	const handleOpenFolderInstalled = async (query) => {
		const current = installedSkillsService.findInstalledMatch(query);
		if (!current) {
			toastSkillActionError(t("skills.toast.toggleFailed"));
			return;
		}
		await detailService.openFolder(current);
	};
	(0, import_react$20.useEffect)(() => {
		marketBuiltinService.enterCollection({
			collectionId: collection.id,
			subType: collection.subType,
			templateId,
			pageSize: 100
		});
	}, [
		collection.id,
		collection.subType,
		templateId
	]);
	if (!loading && cards.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		className: `sm-featured-section${hasAnyReason ? " sm-featured-section--has-reasons" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "sm-featured-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
				className: "sm-featured-title",
				children: title
			}), canRefresh && /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("button", {
				type: "button",
				className: "sm-featured-refresh-btn",
				onClick: handleRefresh,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(RefreshCwIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: t("skills.recommend.refresh") })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "sm-grid",
			ref: gridRef,
			children: showSkeleton ? Array.from({ length: columns }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(SkillCardSkeleton, {}, `spotlight-skeleton-${index}`)) : visibleCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(MarketSkillCard, {
				cardInfo: {
					title: getBuiltinMarketDisplayName(card.skill),
					description: getBuiltinCardDescription(card.skill),
					iconUrl: resolveIconUrl(card.skill.icon_url, card.skill.icon),
					reasonLabel: card.reasonLabel,
					needsApiKey: card.needsApiKey
				},
				status: card.installStatus,
				useTryWhenInstalled: card.installStatus === InstallStatus.Installed,
				enabled: card.enabled,
				onOpen: () => handleSkillClick(card.skill),
				onInstall: () => handleInstallOrUpdate(card.skill),
				onTry: card.hasLocal ? () => handleTryInstalled(card.query) : void 0,
				onToggle: card.hasLocal ? () => handleToggleInstalled(card.query) : void 0,
				onUninstall: card.hasLocal ? () => handleUninstallInstalled(card.query) : void 0,
				onEdit: isDesktop && card.hasLocal ? () => handleEditInstalled(card.query) : void 0,
				onOpenFolder: isDesktop && card.hasLocal ? () => handleOpenFolderInstalled(card.query) : void 0
			}, card.skillId))
		})]
	});
}
/**
* Spotlight 推荐轨：按 featured collection 渲染多个分区。
*/
function SpotlightRail(props) {
	const { templateId } = props;
	const featured = useService(ServiceKey.MarketLayoutService).useStore((s) => s.featured);
	if (featured.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(import_jsx_runtime$13.Fragment, { children: featured.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(SpotlightRailSection, {
		collection,
		templateId
	}, collection.id)) });
}
var import_react$20, import_jsx_runtime$13;
var init_spotlight_rail = __esmMin((() => {
	init_style$6();
	init_common();
	init_src$1();
	init_src();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_useI18n();
	init_environment();
	init_constants();
	init_market_service_context();
	init_use_grid_columns();
	init_use_skill_creator_actions();
	init_use_try_skill();
	init_icon();
	init_skill_utils();
	init_text();
	init_toast();
	init_cards();
	import_jsx_runtime$13 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/discover-section/index.tsx
/** 行业版技能市场「发现」页：展示 Spotlight、源 Tab，以及当前源的分类与技能列表。 */
function DiscoverSection(props) {
	const { templateId, showMcpButton, onMcpClick } = props;
	const t = useTranslation();
	const marketLayoutService = useService(ServiceKey.MarketLayoutService);
	const tabs = marketLayoutService.useStore((s) => s.tabs);
	const activeTabId = marketLayoutService.useStore((s) => s.activeTabId);
	const { containerRef: panelRef, minHeight: panelMinHeight, wrapWithLock } = useMinHeightLock();
	const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? marketLayoutService.resolveDefaultActiveTab();
	const handleTabChange = wrapWithLock((tab) => marketLayoutService.setActiveTab(tab));
	(0, import_react$19.useEffect)(() => {
		if (tabs.length > 0 && !tabs.some((tab) => tab.id === activeTabId)) {
			const defaultTab = marketLayoutService.resolveDefaultActiveTab();
			if (defaultTab) marketLayoutService.setActiveTab(defaultTab);
		}
	}, [activeTabId, tabs]);
	const renderCategories = (tab) => {
		switch (tab.source) {
			case CollectionSubType.Recommend: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CollectionCategories, { collectionId: tab.id });
			case CollectionSubType.Default: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CollectionCategories, { collectionId: tab.id });
			case CollectionSubType.SkillHub: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SkillhubCategories, {});
			case ClientTabId.Knot: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(KnotCategories, {});
			case CollectionSubType.Plugins: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(PluginsCategories, {});
			case ClientTabId.Enterprise: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(EnterpriseCategories, {});
			default: return null;
		}
	};
	const renderPanel = (tab) => {
		switch (tab.source) {
			case CollectionSubType.Recommend: {
				const recommendEmptyText = t("skills.recommend.empty");
				return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverCollectionPanel, {
					collectionId: tab.id,
					emptyText: recommendEmptyText
				});
			}
			case CollectionSubType.Default: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverCollectionPanel, { collectionId: tab.id });
			case CollectionSubType.SkillHub: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverSkillhubPanel, {});
			case ClientTabId.Knot: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverKnotPanel, {});
			case CollectionSubType.Plugins: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverPluginsPanel, {});
			case ClientTabId.Enterprise: return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverEnterprisePanel, {});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		className: "sm-discover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SpotlightRail, { templateId }),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DiscoverTabBar, {
				activeTabId,
				tabs,
				showMcpButton,
				onMcpClick,
				onTabChange: handleTabChange
			}),
			activeTab && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
				className: "sm-discover-filters",
				children: renderCategories(activeTab)
			}),
			activeTab && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
				className: "sm-discover-panel",
				ref: panelRef,
				style: { minHeight: panelMinHeight },
				children: renderPanel(activeTab)
			})
		]
	});
}
/** Collection：订数 + 过滤 + 错误壳 */
function DiscoverCollectionPanel(props) {
	const { collectionId, emptyText } = props;
	const t = useTranslation();
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const rawSkills = marketBuiltinService.useStore((s) => s.collections[collectionId]?.skills ?? []);
	const loading = marketBuiltinService.useStore((s) => s.collections[collectionId]?.loading ?? false);
	const error = marketBuiltinService.useStore((s) => s.collections[collectionId]?.error ?? false);
	const total = marketBuiltinService.useStore((s) => s.collections[collectionId]?.total ?? 0);
	const recentlyInstalledIds = marketBuiltinService.useStore((s) => s.recentlyInstalledIds);
	const localVersionMap = marketBuiltinService.useStore((s) => s.localVersionMap);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const skills = (0, import_react$19.useMemo)(() => {
		const installedSources = {
			localVersionMap,
			installedSkills
		};
		const recentSources = { recentlyInstalledIds };
		return rawSkills.filter((skill) => marketBuiltinService.computeIsRecentlyInstalled(skill, recentSources) || !marketBuiltinService.computeIsInstalled(skill, installedSources));
	}, [
		rawSkills,
		recentlyInstalledIds,
		localVersionMap,
		installedSkills,
		marketBuiltinService
	]);
	const handleReload = () => marketBuiltinService.reloadCollection(collectionId);
	if (error && !loading && rawSkills.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListError, {
		message: t("skills.market.loadError"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [error && rawSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListErrorBanner, {
		message: t("skills.market.loadError"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CollectionPanel, {
		skills,
		loading,
		emptyText,
		hasMore: rawSkills.length < total,
		onLoadMore: () => marketBuiltinService.loadMoreCollection(collectionId)
	})] });
}
/** SkillHub：订数 + 过滤 + 错误壳 */
function DiscoverSkillhubPanel() {
	const t = useTranslation();
	const skillhubService = useService(ServiceKey.SkillhubService);
	const rawSkills = skillhubService.useStore((s) => s.skills);
	const loading = skillhubService.useStore((s) => s.loading);
	const error = skillhubService.useStore((s) => s.error);
	const total = skillhubService.useStore((s) => s.total);
	const page = skillhubService.useStore((s) => s.page);
	const recentlyInstalledSlugs = skillhubService.useStore((s) => s.recentlyInstalledSlugs);
	const localVersionMap = skillhubService.useStore((s) => s.localVersionMap);
	const installedSkills = useService(ServiceKey.InstalledSkillsService).useStore((s) => s.skills);
	const skills = (0, import_react$19.useMemo)(() => rawSkills.filter((skill) => skillhubService.computeIsRecentlyInstalled(skill, { recentlyInstalledSlugs }) || !skillhubService.computeIsInstalled(skill, {
		installedSkills,
		localVersionMap
	})), [
		rawSkills,
		recentlyInstalledSlugs,
		localVersionMap,
		installedSkills,
		skillhubService
	]);
	const handleReload = () => skillhubService.loadPage(1);
	if (error && !loading && rawSkills.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListError, {
		message: t("skills.skillhub.error"),
		retryLabel: t("skills.skillhub.retry"),
		onRetry: handleReload
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [error && rawSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListErrorBanner, {
		message: t("skills.market.loadError"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SkillhubPanel, {
		skills,
		loading,
		hasMore: rawSkills.length < total,
		onLoadMore: () => skillhubService.loadPage(page + 1, true)
	})] });
}
/** Knot：订数 + 过滤 + 错误壳 */
function DiscoverKnotPanel() {
	const t = useTranslation();
	const knotService = useService(ServiceKey.KnotService);
	const rawSkills = knotService.useStore((s) => s.skills);
	const loading = knotService.useStore((s) => s.loading);
	const error = knotService.useStore((s) => s.error);
	const total = knotService.useStore((s) => s.total);
	const page = knotService.useStore((s) => s.page);
	const recentlyInstalledSlugs = knotService.useStore((s) => s.recentlyInstalledSlugs);
	const localVersionMap = knotService.useStore((s) => s.localVersionMap);
	const installedSkills = useService(ServiceKey.InstalledSkillsService).useStore((s) => s.skills);
	const skills = (0, import_react$19.useMemo)(() => rawSkills.filter((skill) => knotService.computeIsRecentlyInstalled(skill, { recentlyInstalledSlugs }) || !knotService.computeIsInstalled(skill, {
		installedSkills,
		localVersionMap
	})), [
		rawSkills,
		recentlyInstalledSlugs,
		localVersionMap,
		installedSkills,
		knotService
	]);
	const handleReload = () => knotService.loadPage(1);
	if (error && !loading && rawSkills.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListError, {
		message: t("skills.knot.error"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [error && rawSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListErrorBanner, {
		message: t("skills.market.loadError"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(KnotPanel, {
		skills,
		loading,
		hasMore: rawSkills.length < total,
		onLoadMore: () => knotService.loadPage(page + 1, true)
	})] });
}
/** Enterprise：订数 + 过滤 + 错误壳 */
function DiscoverEnterprisePanel() {
	const t = useTranslation();
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const allSkills = enterpriseService.useStore((s) => s.skills);
	const loading = enterpriseService.useStore((s) => s.loading);
	const error = enterpriseService.useStore((s) => s.error);
	const total = enterpriseService.useStore((s) => s.total);
	const page = enterpriseService.useStore((s) => s.page);
	const recentlyInstalledIds = enterpriseService.useStore((s) => s.recentlyInstalledIds);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const skills = (0, import_react$19.useMemo)(() => {
		const installedSources = { installedSkills };
		const recentSources = { recentlyInstalledIds };
		return allSkills.filter((skill) => enterpriseService.computeIsRecentlyInstalled(skill, recentSources) || !enterpriseService.computeIsInstalled(skill, installedSources));
	}, [
		allSkills,
		recentlyInstalledIds,
		installedSkills,
		enterpriseService
	]);
	const handleReload = () => enterpriseService.loadPage(1);
	if (error && !loading && allSkills.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListError, {
		message: t("skills.market.loadError"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [error && allSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(MarketListErrorBanner, {
		message: t("skills.market.loadError"),
		retryLabel: t("skills.knot.retry"),
		onRetry: handleReload
	}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(EnterprisePanel, {
		skills,
		loading,
		hasMore: allSkills.length < total,
		onLoadMore: () => enterpriseService.loadPage(page + 1)
	})] });
}
/** Plugins：订数 + 浏览过滤 + 传列表 */
function DiscoverPluginsPanel() {
	const pluginsService = useService(ServiceKey.PluginsService);
	const marketplacePlugins = pluginsService.useStore((s) => s.marketplacePlugins);
	const marketplacePluginsLoading = pluginsService.useStore((s) => s.marketplacePluginsLoading);
	const installedPlugins = pluginsService.useStore((s) => s.installedPlugins);
	const recentlyInstalledKeys = pluginsService.useStore((s) => s.recentlyInstalledKeys);
	const plugins = (0, import_react$19.useMemo)(() => marketplacePlugins.filter((plugin) => pluginsService.computeIsRecentlyInstalled(plugin, { recentlyInstalledKeys }) || !pluginsService.computeIsInstalled(plugin, { installedPlugins })), [
		marketplacePlugins,
		installedPlugins,
		recentlyInstalledKeys,
		pluginsService
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(PluginsPanel, {
		plugins,
		loading: marketplacePluginsLoading
	});
}
var import_react$19, import_jsx_runtime$12;
var init_discover_section = __esmMin((() => {
	init_style$12();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_market_service_context();
	init_use_min_height_lock();
	init_types$2();
	init_categories();
	init_discover_tab_bar();
	init_market_status_view();
	init_panels();
	init_spotlight_rail();
	import_jsx_runtime$12 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/installed-section/style.less
var init_style$5 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-auto-update-preference.ts
var init_use_auto_update_preference = __esmMin((() => {
	init_use_auto_update_preference$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-batch-actions.ts
/**
* 管理批量选择状态与批量操作（启用 / 禁用 / 卸载）。
*/
function useBatchActions(options) {
	const t = useTranslation();
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const [batchMode, setBatchMode] = (0, import_react$18.useState)(false);
	const [selectedSkillPaths, setSelectedSkillPaths] = (0, import_react$18.useState)(/* @__PURE__ */ new Set());
	const [selectedPluginKeys, setSelectedPluginKeys] = (0, import_react$18.useState)(/* @__PURE__ */ new Set());
	const [uninstallConfirmVisible, setUninstallConfirmVisible] = (0, import_react$18.useState)(false);
	const [batchActionInProgress, setBatchActionInProgress] = (0, import_react$18.useState)(false);
	const inProgressRef = (0, import_react$18.useRef)(false);
	(0, import_react$18.useEffect)(() => {
		if (options.skills.length === 0 && options.plugins.length === 0 && batchMode) {
			setBatchMode(false);
			setSelectedSkillPaths(/* @__PURE__ */ new Set());
			setSelectedPluginKeys(/* @__PURE__ */ new Set());
			setUninstallConfirmVisible(false);
		}
	}, [
		options.skills.length,
		options.plugins.length,
		batchMode
	]);
	const handleEnterBatchMode = () => {
		setBatchMode(true);
		setSelectedSkillPaths(/* @__PURE__ */ new Set());
		setSelectedPluginKeys(/* @__PURE__ */ new Set());
		setUninstallConfirmVisible(false);
	};
	const handleExitBatchMode = () => {
		setBatchMode(false);
		setSelectedSkillPaths(/* @__PURE__ */ new Set());
		setSelectedPluginKeys(/* @__PURE__ */ new Set());
		setUninstallConfirmVisible(false);
	};
	const handleSelectAll = () => {
		const allSkillPaths = new Set(options.skills.map((s) => s.filePath));
		const allPluginKeys = new Set(options.plugins.map((p) => `${p.marketplaceName}/${p.name}`));
		setSelectedSkillPaths(allSkillPaths);
		setSelectedPluginKeys(allPluginKeys);
	};
	const handleDeselectAll = () => {
		setSelectedSkillPaths(/* @__PURE__ */ new Set());
		setSelectedPluginKeys(/* @__PURE__ */ new Set());
	};
	const handleToggleSelectSkill = (filePath) => {
		setSelectedSkillPaths((prev) => {
			const next = new Set(prev);
			if (next.has(filePath)) next.delete(filePath);
			else next.add(filePath);
			return next;
		});
	};
	const handleToggleSelectPlugin = (pluginKey) => {
		setSelectedPluginKeys((prev) => {
			const next = new Set(prev);
			if (next.has(pluginKey)) next.delete(pluginKey);
			else next.add(pluginKey);
			return next;
		});
	};
	const batchUninstallSkills = async (items) => {
		const result = await installedSkillsService.batchUninstall(items);
		if (result.successCount > 0) toast({
			message: t("skills.batch.uninstallSuccess", { count: String(result.successCount) }),
			type: "success"
		});
		else if (items.length > 0) toastSkillActionError(t("skills.toast.deleteFailed"));
		if (result.failedNames.length > 0) toast({
			message: t("skills.batch.togglePartialFailed", { names: result.failedNames.join(", ") }),
			type: "error"
		});
	};
	const batchToggleSkills = async (items, enabled) => {
		const result = await installedSkillsService.batchToggle(items, enabled);
		if (result.successCount > 0) toast({
			message: t(enabled ? "skills.batch.enableSuccess" : "skills.batch.disableSuccess", { count: String(result.successCount) }),
			type: "success"
		});
		if (result.failedNames.length > 0) toast({
			message: t("skills.batch.togglePartialFailed", { names: result.failedNames.join(", ") }),
			type: "error"
		});
	};
	const handleBatchAction = async (action) => {
		if (inProgressRef.current) {
			skillPerfLog("ui.batchAction.rejected", { action });
			return;
		}
		const selectedSkillListRaw = options.skills.filter((s) => selectedSkillPaths.has(s.filePath));
		const selectedSkillList = action === BatchAction.Uninstall ? selectedSkillListRaw.filter((s) => !isBuiltinSkill(s)) : selectedSkillListRaw;
		const selectedPluginListRaw = options.plugins.filter((p) => selectedPluginKeys.has(`${p.marketplaceName}/${p.name}`));
		const selectedPluginList = action === BatchAction.Uninstall ? selectedPluginListRaw.filter((p) => !p.isBuiltIn) : selectedPluginListRaw;
		if (selectedSkillList.length === 0 && selectedPluginList.length === 0) return;
		inProgressRef.current = true;
		setBatchActionInProgress(true);
		const t0 = Date.now();
		skillPerfLog("ui.batchAction.start", {
			action,
			skillN: selectedSkillList.length,
			pluginN: selectedPluginList.length
		});
		try {
			if (selectedSkillList.length > 0) {
				if (action === BatchAction.Uninstall) await batchUninstallSkills(selectedSkillList);
				else await batchToggleSkills(selectedSkillList, action === BatchAction.Enable);
			}
			if (selectedPluginList.length > 0) {
				if (action === BatchAction.Uninstall) await pluginsService.batchUninstall(selectedPluginList);
				else await pluginsService.batchToggle(selectedPluginList, action === BatchAction.Enable);
			}
			setSelectedSkillPaths(/* @__PURE__ */ new Set());
			setSelectedPluginKeys(/* @__PURE__ */ new Set());
		} finally {
			inProgressRef.current = false;
			setBatchActionInProgress(false);
			skillPerfLog("ui.batchAction.done", {
				action,
				skillN: selectedSkillList.length,
				pluginN: selectedPluginList.length,
				totalMs: Date.now() - t0
			});
		}
	};
	/**
	* 请求批量操作。
	* - {@link BatchAction.Uninstall}：仅当存在已选项时弹出二次确认弹窗，确认后由 `handleConfirmBatchUninstall` 真正执行；
	* - {@link BatchAction.Enable} / {@link BatchAction.Disable}：保持原有立即执行行为，无需二次确认。
	*/
	const handleRequestBatchAction = (action) => {
		if (inProgressRef.current) return;
		if (action === BatchAction.Uninstall) {
			if (selectedSkillPaths.size === 0 && selectedPluginKeys.size === 0) return;
			setUninstallConfirmVisible(true);
			return;
		}
		handleBatchAction(action).catch((err) => {
			console.error("[useBatchActions] batch action failed", err);
		});
	};
	const handleCancelBatchUninstall = () => {
		setUninstallConfirmVisible(false);
	};
	const handleConfirmBatchUninstall = async () => {
		setUninstallConfirmVisible(false);
		await handleBatchAction(BatchAction.Uninstall);
	};
	return {
		batchMode,
		selectedSkillPaths,
		selectedPluginKeys,
		selectedCount: selectedSkillPaths.size + selectedPluginKeys.size,
		batchActionInProgress,
		uninstallConfirmVisible,
		handleEnterBatchMode,
		handleExitBatchMode,
		handleSelectAll,
		handleDeselectAll,
		handleToggleSelectSkill,
		handleToggleSelectPlugin,
		handleRequestBatchAction,
		handleCancelBatchUninstall,
		handleConfirmBatchUninstall
	};
}
var import_react$18, BatchAction;
var init_use_batch_actions = __esmMin((() => {
	init_src$1();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_skill_perf_log();
	init_market_service_context();
	init_skill_utils();
	init_toast();
	BatchAction = {
		Uninstall: "uninstall",
		Enable: "enable",
		Disable: "disable"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-batch-update-prompt.ts
/**
* 批量更新调度：自动更新开启时静默安装并 toast；关闭时每日弹一次确认窗。
* 「今日是否已弹」经 CacheKey.batchUpdateModalDate 与通用版共享，见 utils/cache.ts。
*/
function useBatchUpdatePrompt(options) {
	const { visible, active } = options;
	const t = useTranslation();
	const { autoUpdateEnabled } = useAutoUpdatePreference();
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const skillhubService = useService(ServiceKey.SkillhubService);
	const knotService = useService(ServiceKey.KnotService);
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const batchUpdating = installedSkillsService.useStore((s) => s.batchUpdating);
	const skillhubUpdateCheckCompleted = skillhubService.useStore((s) => s.updateCheckCompleted);
	const knotUpdateCheckCompleted = knotService.useStore((s) => s.updateCheckCompleted);
	const builtinUpdateCheckCompleted = marketBuiltinService.useStore((s) => s.updateCheckCompleted);
	const enterpriseUpdateCheckCompleted = enterpriseService.useStore((s) => s.updateCheckCompleted);
	const updateCheckCompleted = skillhubUpdateCheckCompleted && knotUpdateCheckCompleted && builtinUpdateCheckCompleted && enterpriseUpdateCheckCompleted;
	const updatableSkills = (0, import_react$17.useMemo)(() => installedSkillsService.getUpdatableSkills(installedSkills).filter((item) => !item.skill.userModified), [installedSkillsService, installedSkills]);
	const modalUpdatableSkills = autoUpdateEnabled ? [] : updatableSkills;
	const autoUpdatableSkills = autoUpdateEnabled ? updatableSkills : [];
	const autoUpdateTargetKey = autoUpdatableSkills.map((item) => item.skill.name).sort().join("|");
	const [showBatchUpdateModal, setShowBatchUpdateModal] = (0, import_react$17.useState)(false);
	const batchUpdateShownRef = (0, import_react$17.useRef)(false);
	/** 本面板会话内已调度过的 autoUpdateTargetKey；离开面板清空 */
	const autoUpdateAttemptedForRef = (0, import_react$17.useRef)("");
	const toastBatchUpdateResult = (result) => {
		if (result.successCount > 0) toast({
			message: t("skills.batchUpdate.success", { count: String(result.successCount) }),
			type: "success"
		});
		if (result.failedNames.length > 0) toast({
			message: t("skills.batchUpdate.partialFailed", { names: result.failedNames.join(", ") }),
			type: "error"
		});
	};
	(0, import_react$17.useEffect)(() => {
		if (!visible || !active) {
			autoUpdateAttemptedForRef.current = "";
			return;
		}
		if (!updateCheckCompleted || batchUpdating) return;
		if (autoUpdatableSkills.length === 0) return;
		if (autoUpdateAttemptedForRef.current === autoUpdateTargetKey) return;
		autoUpdateAttemptedForRef.current = autoUpdateTargetKey;
		const skillsToUpdate = autoUpdatableSkills;
		const runAutoUpdate = async () => {
			const result = await installedSkillsService.batchUpdate(skillsToUpdate);
			toastBatchUpdateResult(result);
		};
		runAutoUpdate();
	}, [
		visible,
		active,
		updateCheckCompleted,
		batchUpdating,
		autoUpdateTargetKey
	]);
	(0, import_react$17.useEffect)(() => {
		if (visible && active && updateCheckCompleted && modalUpdatableSkills.length > 0 && !batchUpdateShownRef.current && !wasBatchUpdateModalShownToday()) {
			batchUpdateShownRef.current = true;
			setShowBatchUpdateModal(true);
			markBatchUpdateModalShownToday();
		}
		if (!visible || !active) batchUpdateShownRef.current = false;
	}, [
		visible,
		active,
		updateCheckCompleted,
		modalUpdatableSkills.length
	]);
	const handleCloseBatchUpdateModal = () => {
		setShowBatchUpdateModal(false);
	};
	const handleConfirmBatchUpdate = async () => {
		const result = await installedSkillsService.batchUpdate(modalUpdatableSkills);
		toastBatchUpdateResult(result);
		setShowBatchUpdateModal(false);
	};
	return {
		showBatchUpdateModal,
		modalUpdatableSkills,
		batchUpdating,
		handleCloseBatchUpdateModal,
		handleConfirmBatchUpdate
	};
}
var import_react$17;
var init_use_batch_update_prompt = __esmMin((() => {
	init_src$1();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_market_service_context();
	init_cache();
	init_use_auto_update_preference();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-market-layout-bootstrap.ts
/**
* 行业路由壳：在前台时启动 Layout（collections + 企业探测）。
* 与 useMarketPanelLifecycle 解耦，保证 collections 只有这一处触发。
*/
function useMarketLayoutBootstrap(options) {
	const { visible, active } = options;
	const marketLayoutService = useService(ServiceKey.MarketLayoutService);
	(0, import_react$16.useEffect)(() => {
		if (!visible || !active) return;
		marketLayoutService.setup();
	}, [visible, active]);
}
var import_react$16;
var init_use_market_layout_bootstrap = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_market_service_context();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-market-panel-lifecycle.ts
/**
* 开启各市场源的版本更新检测。
* SkillHub / Knot / Enterprise / OP(Builtin) 一并开启。
* 面板前台或已安装列表变化时调用。
*/
function refreshUpdateChecks(services, installedSkills, installedLoading) {
	services.skillhubService.checkUpdates(true, installedLoading, installedSkills);
	services.knotService.checkUpdates(true, installedSkills);
	services.enterpriseService.checkUpdates(true);
	services.marketBuiltinService.checkUpdates(true);
}
/**
* 首次预取已安装 Skills 与已安装 Plugins。
* 有本地 cache 时 silent，避免首屏闪 loading。
* skipNextVisibility：同一次进入若已预取，跳过紧随其后的静默刷新。
*/
function runInitialInstalledPrefetch(options) {
	options.prefetchedRef.current = true;
	options.skipNextVisibilityRefreshRef.current = options.skipNextVisibility;
	const silent = options.installedSkillsService.useStore.getState().skills.length > 0;
	options.installedSkillsService.loadSkills().catch(() => void 0);
	options.installedSkillsService.loadSkills(silent);
	options.pluginsService.loadInstalled(silent);
}
/**
* 按面板可见/激活同步已安装列表的预取与静默刷新。
* 首次有 adapter：走 runInitialInstalledPrefetch。
* 已预取且再次前台：silent 刷新；若刚预取过则消费 skipNext 跳过一次。
*/
function syncInstalledPrefetch(options) {
	if (options.adapterReady && !options.prefetchedRef.current) {
		runInitialInstalledPrefetch({
			skipNextVisibility: true,
			prefetchedRef: options.prefetchedRef,
			skipNextVisibilityRefreshRef: options.skipNextVisibilityRefreshRef,
			installedSkillsService: options.installedSkillsService,
			pluginsService: options.pluginsService
		});
		return;
	}
	if (options.skipNextVisibilityRefreshRef.current) {
		options.skipNextVisibilityRefreshRef.current = false;
		return;
	}
	if (options.prefetchedRef.current && options.panelVisible && options.panelActive) {
		options.installedSkillsService.loadSkills(true);
		options.pluginsService.loadInstalled(true);
	}
}
/**
* 面板级生命周期编排入口。
*
* 负责：外部事件订阅、已安装预取/静默刷新、更新检测。
* collections / 企业探测由 useMarketLayoutBootstrap 启动。
* Service 只提供方法；UI Service 不编排数据。
*/
function useMarketPanelLifecycle(options) {
	const { visible, active, skillRiskMap } = options;
	const uiService = useService(ServiceKey.UIService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const skillhubService = useService(ServiceKey.SkillhubService);
	const knotService = useService(ServiceKey.KnotService);
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const { adapter } = useModuleHost();
	const adapterReady = !!adapter;
	const adapterRef = (0, import_react$15.useRef)(adapter);
	adapterRef.current = adapter;
	const prefetchedRef = (0, import_react$15.useRef)(false);
	const skipNextVisibilityRefreshRef = (0, import_react$15.useRef)(false);
	(0, import_react$15.useEffect)(() => {
		installedSkillsService.setSkillRiskMap(skillRiskMap ?? /* @__PURE__ */ new Map());
	}, [skillRiskMap, installedSkillsService]);
	/**
	* 外部广播 → Service 方法（订阅归 hook，Service 不绑事件）。
	*/
	(0, import_react$15.useEffect)(() => {
		const skillListRefreshSub = skillListRefresh$.subscribe(() => {
			installedSkillsService.loadSkills(true);
		});
		const pluginListRefreshSub = pluginListRefresh$.subscribe(() => {
			pluginsService.loadInstalled(true);
		});
		return () => {
			skillListRefreshSub.unsubscribe();
			pluginListRefreshSub.unsubscribe();
		};
	}, []);
	/**
	* 本地已安装列表变化时：仅面板前台重跑各源 checkUpdates（版本角标 / 批量更新）；后台不打请求。
	*/
	(0, import_react$15.useEffect)(() => installedSkillsService.useStore.subscribe((state, prev) => {
		if (state.skills === prev.skills && state.loading === prev.loading) return;
		const { panelVisible, panelActive } = uiService.useStore.getState();
		if (panelVisible && panelActive) refreshUpdateChecks({
			skillhubService,
			knotService,
			enterpriseService,
			marketBuiltinService
		}, state.skills, state.loading);
	}), []);
	/**
	* 宿主 visible / active 变化时的面板生命周期。
	* deps 只有 visible/active：adapter 晚到不重跑本 effect，避免重复 update checks。
	* adapter 是否就绪用 adapterRef 读取；晚到补预取由下方 effect 负责。
	*
	* 1. 写入 UI store 的 panelVisible / panelActive
	* 2. 预取/静默刷新已安装 Skills + Plugins（首次或再次前台）
	* 3. 前台：开启各源更新检测（collections 由 useMarketLayoutBootstrap 负责）
	* 4. 非前台：关闭各源更新检测，清掉进行中的检查状态
	*/
	(0, import_react$15.useEffect)(() => {
		const panelVisible = !!visible;
		const panelActive = !!active;
		uiService.useStore.setState({
			panelVisible,
			panelActive
		});
		syncInstalledPrefetch({
			panelVisible,
			panelActive,
			adapterReady: !!adapterRef.current,
			prefetchedRef,
			skipNextVisibilityRefreshRef,
			installedSkillsService,
			pluginsService
		});
		if (panelVisible && panelActive) {
			const installed = installedSkillsService.useStore.getState();
			refreshUpdateChecks({
				skillhubService,
				knotService,
				enterpriseService,
				marketBuiltinService
			}, installed.skills, installed.loading);
		} else {
			skillhubService.checkUpdates(false, false, []);
			knotService.checkUpdates(false, []);
			enterpriseService.checkUpdates(false);
			marketBuiltinService.checkUpdates(false);
		}
	}, [visible, active]);
	/**
	* adapter 晚于首屏出现时的补预取。
	* 只跑首次已安装 Skills/Plugins 加载；不重跑 update checks。
	* 原因：已安装列表依赖 adapter（读取本地技能/插件 API），
	* 而 update checks 不依赖 adapter，已在 visible+active 时跑过，无需补。
	* collections 由路由壳 bootstrap 负责，此处不触发。
	* 若此刻已在前台，这次预取就是首屏加载，不必再 skip 下一次 visibility 静默刷新。
	*/
	(0, import_react$15.useEffect)(() => {
		if (!adapterReady || prefetchedRef.current) return;
		const { panelVisible, panelActive } = uiService.useStore.getState();
		runInitialInstalledPrefetch({
			skipNextVisibility: !(panelVisible && panelActive),
			prefetchedRef,
			skipNextVisibilityRefreshRef,
			installedSkillsService,
			pluginsService
		});
	}, [adapterReady]);
}
var import_react$15;
var init_use_market_panel_lifecycle = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_high_risk_notification_store();
	init_market_service_context();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-personal-skill-desktop-pick.ts
/**
* @param runImportFlow 主 hook 提供的导入执行函数，接受可选 folderPath
*/
function useDesktopSkillPick(runImportFlow) {
	const t = useTranslation();
	const desktopDialogOpen = (0, import_react$14.useMemo)(() => getDesktopDialogOpen(), []);
	const desktopPlatform = (0, import_react$14.useMemo)(() => getDesktopPlatform(), []);
	const useWindowsStyleDesktopPick = Boolean(desktopDialogOpen && desktopPlatform && !isMacDesktop(desktopPlatform));
	const uploadTitle = t("skills.upload.modal.title");
	const pickPathFromDesktopDialog = (0, import_react$14.useCallback)(async (mode) => {
		if (!desktopDialogOpen) return;
		if (mode === "zip") return pickDesktopSkillZipFile(desktopDialogOpen, uploadTitle);
		return pickDesktopSkillFolder(desktopDialogOpen, {
			title: uploadTitle,
			platform: desktopPlatform
		});
	}, [
		desktopDialogOpen,
		desktopPlatform,
		uploadTitle
	]);
	return {
		useWindowsStyleDesktopPick,
		handleUploadConfirm: (0, import_react$14.useCallback)(async () => {
			const selectedPath = await pickPathFromDesktopDialog("folder");
			if (selectedPath) {
				await runImportFlow(resolveSkillRootDirFromSelectedPath(selectedPath));
				return;
			}
			if (!desktopDialogOpen) await runImportFlow();
		}, [
			pickPathFromDesktopDialog,
			desktopDialogOpen,
			runImportFlow
		]),
		handleUploadConfirmZip: (0, import_react$14.useCallback)(async () => {
			const selectedPath = await pickPathFromDesktopDialog("zip");
			if (selectedPath) await runImportFlow(resolveSkillRootDirFromSelectedPath(selectedPath));
		}, [pickPathFromDesktopDialog, runImportFlow])
	};
}
var import_react$14;
var init_use_personal_skill_desktop_pick = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_desktop_skill_source_picker();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/utils/file-path.ts
function getDesktopFilePath(file) {
	if (typeof window === "undefined") return;
	if (typeof window.vscode?.webUtils?.getPathForFile === "function") try {
		return window.vscode.webUtils.getPathForFile(file) || void 0;
	} catch {
		return;
	}
}
/**
* 安全获取 File 对象的绝对路径
* Electron 新版本中 File.path 已废弃，需使用 vscode.webUtils.getPathForFile
*/
function getFilePathSafe(file) {
	const desktopPath = getDesktopFilePath(file);
	if (desktopPath) return desktopPath;
	return file.path || void 0;
}
var init_file_path = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-scan-result-subscription.ts
/**
* 监听指定 md5 的异步安全检测结果
*/
function useScanResultSubscription(md5, onResult) {
	(0, import_react$13.useEffect)(() => {
		if (!md5) return;
		const subscription = scanResultMap$.subscribe((map) => {
			if (!map.has(md5)) return;
			const entry = consumeScanResult(md5);
			if (entry) onResult(entry.result);
		});
		return () => subscription.unsubscribe();
	}, [md5, onResult]);
}
var import_react$13;
var init_use_scan_result_subscription = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_security_scan_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-personal-skill-import.ts
/**
* 个人 Skill 本地导入流程 hook。
*
* 注意：此 hook 通过 useModuleHost() 取 personalSkills facade，所以必须在 ModuleHost
* 上下文内挂载（任何 agent-ui 模块组件都满足此前提）。
*/
function usePersonalSkillImport(options = {}) {
	const t = useTranslation();
	const { scanEnabled = true, onSuccess, autoInstallNonHighRisk: externalAutoInstall, onAutoInstallNonHighRiskChange: externalOnAutoInstallChange } = options;
	const host = useModuleHost();
	const personalSkills = host.facades.personalSkills;
	const [showUploadModal, setShowUploadModal] = (0, import_react$12.useState)(false);
	const [uploading, setUploading] = (0, import_react$12.useState)(false);
	const [isDraggingOver, setIsDraggingOver] = (0, import_react$12.useState)(false);
	const [uploadScanResult, setUploadScanResult] = (0, import_react$12.useState)(null);
	/** 被安全检测阻止时的文件路径，用于确认安装时重新调用 installByPath */
	const [pendingInstallPath, setPendingInstallPath] = (0, import_react$12.useState)(null);
	/** 标记是否通过"跳过扫描"已安装 skill，避免弹窗关闭时误取消轮询 */
	const skipInstalledRef = (0, import_react$12.useRef)(false);
	const isExternallyControlled = externalAutoInstall !== void 0 && externalOnAutoInstallChange !== void 0;
	const [internalAutoInstall, setInternalAutoInstallState] = (0, import_react$12.useState)(() => securityAutoInstallPreference.get());
	const autoInstallNonHighRisk = isExternallyControlled ? externalAutoInstall : internalAutoInstall;
	const setAutoInstallNonHighRisk = (0, import_react$12.useCallback)((enabled) => {
		if (isExternallyControlled) {
			externalOnAutoInstallChange(enabled);
			return;
		}
		setInternalAutoInstallState(enabled);
		securityAutoInstallPreference.set(enabled);
	}, [isExternallyControlled, externalOnAutoInstallChange]);
	(0, import_react$12.useEffect)(() => {
		if (isExternallyControlled) return;
		return securityAutoInstallPreference.subscribe(setInternalAutoInstallState);
	}, [isExternallyControlled]);
	(0, import_react$12.useEffect)(() => {
		if (showUploadModal) return;
		if (uploadScanResult?.md5 && !uploadScanResult.verdict && !skipInstalledRef.current) asyncSecurityScanService.removeTask(uploadScanResult.md5);
		skipInstalledRef.current = false;
		setUploading(false);
		setIsDraggingOver(false);
		setUploadScanResult(null);
		setPendingInstallPath(null);
	}, [showUploadModal]);
	(0, import_react$12.useEffect)(() => {
		setUploadModalVisible(showUploadModal);
	}, [showUploadModal]);
	const pendingMd5 = isPendingScanResult(uploadScanResult) ? uploadScanResult.md5 : null;
	const showUploadModalRef = (0, import_react$12.useRef)(showUploadModal);
	(0, import_react$12.useEffect)(() => {
		showUploadModalRef.current = showUploadModal;
	}, [showUploadModal]);
	useScanResultSubscription(pendingMd5, (0, import_react$12.useCallback)(async (result) => {
		if (!showUploadModalRef.current) return;
		if (isFailedScanResult(result)) {
			setUploadScanResult(result);
			return;
		}
		if (isNonHighRiskScanResult(result) && autoInstallNonHighRisk) {
			if (personalSkills && pendingInstallPath) {
				setUploadScanResult(null);
				setUploading(true);
				try {
					const installResult = await personalSkills.installByPath({
						source: "userSettings",
						folderPath: pendingInstallPath
					});
					if (installResult.success) {
						setShowUploadModal(false);
						setPendingInstallPath(null);
						notifySkillListRefresh();
						onSuccess?.(installResult.skillName ?? "");
						toast({
							message: t("skills.toast.imported"),
							type: "success"
						});
					} else toast.error(getLocalizedImportSkillError(installResult.error));
				} catch (error) {
					toast.error(getLocalizedImportSkillError(error instanceof Error ? error.message : void 0));
				} finally {
					setUploading(false);
				}
			} else {
				setUploadScanResult(null);
				setShowUploadModal(false);
			}
			return;
		}
		setUploadScanResult(result);
		if (result.verdict === "black") toast.error(t("skill.importError.securityCheckBlocked"));
	}, [
		autoInstallNonHighRisk,
		personalSkills,
		pendingInstallPath,
		t,
		onSuccess
	]));
	const handleImportSkill = (0, import_react$12.useCallback)(() => {
		setShowUploadModal(true);
	}, []);
	const runImportFlow = (0, import_react$12.useCallback)(async (folderPath) => {
		if (!personalSkills) return;
		setUploading(true);
		try {
			let appKey;
			if (scanEnabled) try {
				appKey = (await host.adapter?.getProductConfiguration?.())?.skillSecurityAppKey;
			} catch {}
			const result = await personalSkills.importFromPath({
				source: "userSettings",
				folderPath,
				securityCheck: scanEnabled,
				appKey
			});
			const { preCheck } = result;
			const showScanWarning = (scan, installPath) => {
				setUploadScanResult(scan);
				setPendingInstallPath(installPath || folderPath || null);
			};
			if (!result.success && preCheck && (result.error === "security_check_blocked" || !preCheck.scanResult)) {
				if (preCheck.error) {
					showScanWarning(createFailedScanResult(preCheck.md5 || "", "error", preCheck.error), preCheck.selectedPath);
					return;
				}
				const scan = preCheck?.scanResult ?? {
					md5: preCheck?.md5 || "",
					hashHit: false,
					threatLevel: 0,
					riskLevel: "safe",
					verdict: "",
					description: "",
					tags: [],
					fileAnalysis: [],
					virusName: []
				};
				if (isNonHighRiskScanResult(scan) && autoInstallNonHighRisk) {
					const installPath = preCheck.selectedPath || folderPath;
					if (installPath) {
						const installResult = await personalSkills.installByPath({
							source: "userSettings",
							folderPath: installPath
						});
						if (installResult.success) {
							notifySkillListRefresh();
							onSuccess?.(installResult.skillName ?? "");
							setShowUploadModal(false);
							toast({
								message: t("skills.toast.imported"),
								type: "success"
							});
						} else toast.error(getLocalizedImportSkillError(installResult.error));
					}
					return;
				}
				showScanWarning(scan, preCheck.selectedPath);
				if (scan.verdict === "black" || scan.verdict === "suspicious") toast.error(t("skill.importError.securityCheckBlocked"));
				if (preCheck?.md5 && !scan.verdict) {
					asyncSecurityScanService.setPersonalSkillsFacade(personalSkills);
					asyncSecurityScanService.addTask({
						md5: preCheck.md5,
						skillName: result.skillName ?? "",
						skillFilePath: preCheck.selectedPath || folderPath || "",
						startTime: Date.now()
					});
				}
				return;
			}
			if (!result.success) {
				toast.error(getLocalizedImportSkillError(result.error));
				return;
			}
			notifySkillListRefresh();
			onSuccess?.(result.skillName ?? "");
			setShowUploadModal(false);
			setUploadScanResult(null);
			toast({
				message: t("skills.toast.imported"),
				type: "success"
			});
		} catch (error) {
			toast.error(getLocalizedImportSkillError(error instanceof Error ? error.message : void 0));
		} finally {
			setUploading(false);
		}
	}, [
		personalSkills,
		scanEnabled,
		autoInstallNonHighRisk,
		t,
		onSuccess,
		host.adapter
	]);
	const desktopPick = useDesktopSkillPick(runImportFlow);
	const handleDragOver = (0, import_react$12.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(true);
	}, []);
	const handleDragLeave = (0, import_react$12.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(false);
	}, []);
	const handleDrop = (0, import_react$12.useCallback)(async (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(false);
		const droppedFile = Array.from(e.dataTransfer.files)[0];
		if (!droppedFile) {
			await runImportFlow();
			return;
		}
		const folderPath = getFilePathSafe(droppedFile);
		if (!folderPath) {
			await runImportFlow();
			return;
		}
		await runImportFlow(folderPath);
	}, [runImportFlow]);
	const handleCancelScanResult = (0, import_react$12.useCallback)(() => {
		setUploadScanResult(null);
		setPendingInstallPath(null);
	}, []);
	/**
	* 通用的"跳过安全检测 / 确认有风险后安装"逻辑
	* @param isSkipScan true: 跳过扫描场景（保留异步轮询，Toast 提示后台检测）
	*                   false: 确认有风险安装场景（Toast 提示安装成功）
	*/
	const executeInstallByPath = (0, import_react$12.useCallback)(async (isSkipScan) => {
		if (!personalSkills || !pendingInstallPath) return;
		const installPath = pendingInstallPath;
		const taskMd5 = isSkipScan && isPendingScanResult(uploadScanResult) ? uploadScanResult?.md5 : void 0;
		if (isSkipScan) {
			skipInstalledRef.current = true;
			setShowUploadModal(false);
		}
		setUploadScanResult(null);
		setPendingInstallPath(null);
		setUploading(true);
		try {
			const result = await personalSkills.installByPath({
				source: "userSettings",
				folderPath: installPath
			});
			if (!result.success) {
				toast.error(getLocalizedImportSkillError(result.error));
				if (taskMd5) asyncSecurityScanService.removeTask(taskMd5);
				return;
			}
			notifySkillListRefresh();
			onSuccess?.(result.skillName ?? "");
			if (taskMd5 && result.skillName) asyncSecurityScanService.updateTask(taskMd5, { skillName: result.skillName });
			if (taskMd5) toast({
				message: t("skills.security.async.backgroundRunning"),
				type: "info"
			});
			else {
				setShowUploadModal(false);
				toast({
					message: t("skills.toast.imported"),
					type: "success"
				});
			}
		} catch (error) {
			toast.error(getLocalizedImportSkillError(error instanceof Error ? error.message : void 0));
		} finally {
			setUploading(false);
		}
	}, [
		personalSkills,
		pendingInstallPath,
		uploadScanResult,
		t,
		onSuccess
	]);
	/** verdict 为空时点击"跳过"→ 直接安装成功（无弹窗），Toast 提示后台检测 */
	const handleSkipScanResult = (0, import_react$12.useCallback)(() => executeInstallByPath(true), [executeInstallByPath]);
	/** 用户在安全检测警告中点击"确认安装" */
	const handleConfirmRiskyInstall = (0, import_react$12.useCallback)(() => executeInstallByPath(false), [executeInstallByPath]);
	return {
		showUploadModal,
		setShowUploadModal,
		uploading,
		isDraggingOver,
		uploadScanResult,
		autoInstallNonHighRisk,
		setAutoInstallNonHighRisk,
		handleImportSkill,
		handleUploadConfirm: desktopPick.handleUploadConfirm,
		handleUploadConfirmZip: desktopPick.handleUploadConfirmZip,
		useWindowsStyleDesktopPick: desktopPick.useWindowsStyleDesktopPick,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleCancelScanResult,
		handleConfirmRiskyInstall,
		handleSkipScanResult
	};
}
var import_react$12;
var init_use_personal_skill_import = __esmMin((() => {
	init_src$1();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_skill_security_result();
	init_common$1();
	init_async_security_scan_service();
	init_high_risk_notification_store();
	init_skills_security_types();
	init_file_path();
	init_text();
	init_use_personal_skill_desktop_pick();
	init_use_scan_result_subscription();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-pinned-installed.ts
var init_use_pinned_installed = __esmMin((() => {
	init_use_pinned_installed$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-security-preference.ts
var init_use_security_preference = __esmMin((() => {
	init_use_security_preference$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/index.ts
var init_hooks = __esmMin((() => {
	init_use_auto_update_preference();
	init_use_batch_actions();
	init_use_batch_update_prompt();
	init_use_grid_columns();
	init_use_infinite_scroll();
	init_use_market_layout_bootstrap();
	init_use_market_panel_lifecycle();
	init_use_min_height_lock();
	init_use_pending_try_after_install();
	init_use_personal_skill_desktop_pick();
	init_use_personal_skill_import();
	init_use_pinned_installed();
	init_use_security_preference();
	init_use_skill_creator_actions();
	init_use_skill_detail();
	init_use_skill_detail_actions();
	init_use_skill_detail_overview();
	init_use_skill_related_cases();
	init_use_try_skill();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/batch-uninstall-confirm-modal/index.tsx
/**
* 批量卸载二次确认弹窗。复用 cb-chat-ui `<ConfirmDialog>`，
* 与归档任务等其它确认弹窗视觉一致。
*/
function BatchUninstallConfirmModal(props) {
	const { visible, count, onCancel, onConfirm, theme } = props;
	const t = useTranslation();
	if (count <= 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ConfirmDialog, {
		visible,
		theme,
		showCloseButton: true,
		title: t("skills.batchUninstall.title"),
		content: t("skills.batchUninstall.description", { count: String(count) }),
		confirmText: t("skills.batchUninstall.confirm"),
		cancelText: t("common.cancel"),
		onClose: onCancel,
		onConfirm
	});
}
var import_jsx_runtime$11;
var init_batch_uninstall_confirm_modal = __esmMin((() => {
	init_src$1();
	require_react();
	init_useI18n();
	import_jsx_runtime$11 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/installed-section/installed-header.tsx
/**
* 已安装列表的批量操作栏。
*/
function BatchHeader(props) {
	const { selectedCount, onSelectAll, onDeselectAll, onBatchAction, onExit, batchActionInProgress = false } = props;
	const t = useTranslation();
	const actionDisabled = selectedCount === 0 || batchActionInProgress;
	const handleEnable = () => {
		onBatchAction(BatchAction.Enable);
	};
	const handleDisable = () => {
		onBatchAction(BatchAction.Disable);
	};
	const handleUninstall = () => {
		onBatchAction(BatchAction.Uninstall);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		className: "sm-batch-toolbar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "sm-batch-toolbar-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
					className: "sm-batch-selected",
					children: t("skills.batch.selected", { count: String(selectedCount) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
					type: "button",
					className: "sm-batch-select-all",
					onClick: onSelectAll,
					disabled: batchActionInProgress,
					children: t("skills.batch.selectAll")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
					type: "button",
					className: "sm-batch-select-all",
					onClick: onDeselectAll,
					disabled: actionDisabled,
					children: t("skills.batch.deselectAll")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "sm-batch-toolbar-right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
					type: "button",
					className: "sm-batch-action-btn",
					onClick: handleEnable,
					disabled: actionDisabled,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(CheckCircleIcon, {}), t("skills.batch.enable")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
					type: "button",
					className: "sm-batch-action-btn",
					onClick: handleDisable,
					disabled: actionDisabled,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(CloseCircleIcon, {}), t("skills.batch.disable")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
					type: "button",
					className: "sm-batch-action-btn sm-batch-action-btn--danger",
					onClick: handleUninstall,
					disabled: actionDisabled,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(TrashIcon, {}), t("skills.batch.uninstall")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
					type: "button",
					className: "sm-batch-action-btn sm-batch-action-btn--cancel",
					onClick: onExit,
					children: t("common.cancel")
				})
			]
		})]
	});
}
/**
* 已安装页顶栏：标题、数量、批量管理入口、本地搜索。
*/
function InstalledPageHeader(props) {
	const { installedCount, showInstalledCount = true, batchMode, searchValue, onEnterBatchMode, onSearchChange } = props;
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
		className: "sm-installed-subpage",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "sm-installed-subpage-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("h2", {
				className: "sm-installed-subpage-title",
				children: [t("unifiedMarket.myInstalled"), showInstalledCount && installedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
					className: "sm-installed-subpage-count",
					children: installedCount
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "sm-installed-subpage-actions",
				children: [!batchMode && installedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
					type: "button",
					className: "sm-installed-batch-manage",
					onClick: onEnterBatchMode,
					"data-track-id": "skill_market_batch_manage",
					"data-track-name": "批量管理已安装技能",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: t("skills.batchManage") }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SettingsIcon, {})]
				}), installedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "ec-search-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Input.Search, {
						allowClear: true,
						placeholder: t("skills.installed.searchPlaceholder"),
						value: searchValue,
						onChange: onSearchChange
					})
				})]
			})]
		})
	});
}
var import_jsx_runtime$10;
var init_installed_header = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_use_batch_actions();
	init_icons$1();
	import_jsx_runtime$10 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/installed-section/installed-list.tsx
/**
* 「我的」已装 Skill / Plugin 列表网格；卡片动作在内部注入服务处理。
*/
function InstalledList(props) {
	const { visibleSkills, visiblePlugins, sortedOrder, batchMode, selectedSkillPaths, selectedPluginKeys, onToggleSelectSkill, onToggleSelectPlugin, onUserOperate, installedGridRef, skillRiskMap, isSearchMode = false, pinnedMap, onTogglePin } = props;
	const t = useTranslation();
	const isDesktop = isWorkBuddyDesktop();
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const marketBuiltinService = useService(ServiceKey.MarketBuiltinService);
	const skillhubService = useService(ServiceKey.SkillhubService);
	const knotService = useService(ServiceKey.KnotService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const detailService = useService(ServiceKey.DetailService);
	const uiService = useService(ServiceKey.UIService);
	const handleTrySkill = useTrySkill();
	const { editSkill } = useSkillCreatorActions();
	const builtinInstallingSkillId = marketBuiltinService.useStore((s) => s.installingSkillId);
	const builtinLocalVersionMap = marketBuiltinService.useStore((s) => s.localVersionMap);
	const builtinRemoteVersionMap = marketBuiltinService.useStore((s) => s.remoteVersionMap);
	const hubInstallingSlug = skillhubService.useStore((s) => s.installingSlug);
	const hubSkills = skillhubService.useStore((s) => s.skills);
	const hubLocalVersionMap = skillhubService.useStore((s) => s.localVersionMap);
	const hubRemoteVersionMap = skillhubService.useStore((s) => s.remoteVersionMap);
	const knotInstallingSlug = knotService.useStore((s) => s.installingSlug);
	const knotSkills = knotService.useStore((s) => s.skills);
	const knotLocalVersionMap = knotService.useStore((s) => s.localVersionMap);
	const knotRemoteVersionMap = knotService.useStore((s) => s.remoteVersionMap);
	const enterpriseInstallingId = enterpriseService.useStore((s) => s.installingId);
	const enterpriseLocalVersionMap = enterpriseService.useStore((s) => s.localVersionMap);
	const enterpriseRemoteVersionMap = enterpriseService.useStore((s) => s.remoteVersionMap);
	const skillsMap = (0, import_react$9.useMemo)(() => new Map(visibleSkills.map((skill) => [skill.filePath, skill])), [visibleSkills]);
	const pluginsMap = (0, import_react$9.useMemo)(() => new Map(visiblePlugins.map((plugin) => [`plugin-${plugin.marketplaceName}/${plugin.name}`, plugin])), [visiblePlugins]);
	const variant = isSearchMode ? "search" : "browse";
	const handleSkillCardClick = (skill) => {
		uiService.openSkillDetail(skill);
	};
	const handlePluginCardClick = (plugin) => {
		uiService.openPluginDetail(plugin);
	};
	const handleToggleSkill = async (filePath, enabled) => {
		onUserOperate?.();
		const result = await installedSkillsService.toggleSkill(filePath, enabled);
		if (!result.success) toastSkillActionError(result.errorMessage || t("skills.toast.toggleFailed"));
	};
	const handleToggleInstalledPlugin = (plugin, enabled) => {
		onUserOperate?.();
		const scope = plugin.installedScopes?.[0] || "user";
		return pluginsService.toggle(plugin, enabled, scope);
	};
	const handleUninstallSkill = async (skill) => {
		const result = await installedSkillsService.batchUninstall([skill]);
		if (result.successCount > 0) toast({
			message: t("skills.batch.uninstallSuccess", { count: String(result.successCount) }),
			type: "success"
		});
		else toastSkillActionError(t("skills.toast.deleteFailed"));
	};
	const handleUninstallPlugin = (plugin) => {
		pluginsService.batchUninstall([plugin]);
	};
	const handleEditSkill = isDesktop ? editSkill : void 0;
	const handleOpenFolderSkill = isDesktop ? async (skill) => {
		await detailService.openFolder(skill);
	} : void 0;
	const handleOpenFolderPlugin = isDesktop ? async (plugin) => {
		await pluginsService.openFolder(plugin);
	} : void 0;
	const handleUpdateMarketplaceSkill = (skill) => {
		const runUpdate = async () => {
			const result = await installedSkillsService.updateSkill(skill);
			if (!result.success) {
				toastSkillActionError(result.errorMessage || t("skills.recommend.installFailed", { name: skill.name }));
				return;
			}
			const toastKey = result.source ? UPDATE_TOAST_KEY[result.source] : UPDATE_TOAST_KEY.builtin;
			toastSkillInstallSuccess({
				message: t(toastKey, { name: skill.name }),
				trySkill: handleTrySkill,
				skillName: skill.name,
				examples: pickLocalizedExamples(skill),
				skillId: skill.skillId
			});
		};
		if (skill.userModified) {
			uiService.setPendingModifiedUpdate(() => {
				runUpdate();
			});
			return;
		}
		runUpdate();
	};
	const handleUpdateHubSkill = (hubSkill) => {
		const runUpdate = async () => {
			try {
				const result = await skillhubService.update(hubSkill);
				if (!result.success) {
					toastSkillActionError(result.errorMessage || t("skills.skillhub.installFailed.package"));
					return;
				}
				toastSkillInstallSuccess({
					message: t("skills.skillhub.updateSuccess", { name: hubSkill.name }),
					trySkill: handleTrySkill,
					skillName: hubSkill.name,
					examples: pickLocalizedExamples(hubSkill)
				});
				notifySkillsUpdateBadgeRefresh();
			} catch {
				toastSkillActionError(t("skills.skillhub.installFailed.package"));
			}
		};
		if (installedSkillsService.findInstalledMatch({
			slug: hubSkill.slug,
			name: hubSkill.name
		})?.userModified) {
			uiService.setPendingModifiedUpdate(() => {
				runUpdate();
			});
			return;
		}
		runUpdate();
	};
	const handleUpdateKnotSkill = (skill) => {
		const runUpdate = async () => {
			try {
				const knotSkill = await knotService.resolveSkillForUpdate(skill);
				if (!knotSkill) {
					toastSkillActionError(t("skills.knot.installFailed.package"));
					return;
				}
				const result = await knotService.update(knotSkill);
				if (!result.success) {
					toastSkillActionError(result.errorMessage || t("skills.knot.installFailed.package"));
					return;
				}
				toastSkillInstallSuccess({
					message: t("skills.knot.updateSuccess", { name: knotSkill.name }),
					trySkill: handleTrySkill,
					skillName: knotSkill.name,
					examples: pickLocalizedExamples(knotSkill)
				});
				notifySkillsUpdateBadgeRefresh();
			} catch {
				toastSkillActionError(t("skills.knot.installFailed.package"));
			}
		};
		if (skill.userModified) {
			uiService.setPendingModifiedUpdate(() => {
				runUpdate();
			});
			return;
		}
		runUpdate();
	};
	const handleUpdateSkill = (skill) => {
		const hubUpdate = skillhubService.computeUpdateInfo(skill, {
			skills: hubSkills,
			localVersionMap: hubLocalVersionMap,
			remoteVersionMap: hubRemoteVersionMap,
			installingSlug: hubInstallingSlug
		});
		if (hubUpdate.hasUpdate || hubUpdate.isUpdating) {
			handleUpdateHubSkill(hubUpdate.hubSkill ?? {
				slug: hubUpdate.slug,
				name: skill.name,
				version: hubUpdate.remoteVersion
			});
			return;
		}
		const knotUpdate = knotService.computeUpdateInfo(skill, {
			skills: knotSkills,
			remoteVersionMap: knotRemoteVersionMap,
			localVersionMap: knotLocalVersionMap,
			installingSlug: knotInstallingSlug
		});
		if (knotUpdate.hasUpdate || knotUpdate.isUpdating) {
			handleUpdateKnotSkill(skill);
			return;
		}
		const enterpriseUpdate = enterpriseService.computeUpdateInfo(skill, {
			localVersionMap: enterpriseLocalVersionMap,
			remoteVersionMap: enterpriseRemoteVersionMap,
			installingId: enterpriseInstallingId
		});
		if (enterpriseUpdate.hasUpdate || enterpriseUpdate.isUpdating) {
			handleUpdateMarketplaceSkill(skill);
			return;
		}
		const builtinUpdate = marketBuiltinService.computeUpdateInfo(skill, {
			installingSkillId: builtinInstallingSkillId,
			remoteVersionMap: builtinRemoteVersionMap,
			localVersionMap: builtinLocalVersionMap
		});
		if (builtinUpdate.hasUpdate || builtinUpdate.isUpdating) handleUpdateMarketplaceSkill(skill);
	};
	const handleTrySkillForCard = (skill) => {
		handleTrySkill(skill.name, pickLocalizedExamples(skill), skill.name, skill.skillId);
	};
	const renderSkill = (skill) => {
		const hubUpdate = skillhubService.computeUpdateInfo(skill, {
			skills: hubSkills,
			localVersionMap: hubLocalVersionMap,
			remoteVersionMap: hubRemoteVersionMap,
			installingSlug: hubInstallingSlug
		});
		const knotUpdate = knotService.computeUpdateInfo(skill, {
			skills: knotSkills,
			remoteVersionMap: knotRemoteVersionMap,
			localVersionMap: knotLocalVersionMap,
			installingSlug: knotInstallingSlug
		});
		const enterpriseUpdate = enterpriseService.computeUpdateInfo(skill, {
			localVersionMap: enterpriseLocalVersionMap,
			remoteVersionMap: enterpriseRemoteVersionMap,
			installingId: enterpriseInstallingId
		});
		const builtinUpdate = marketBuiltinService.computeUpdateInfo(skill, {
			installingSkillId: builtinInstallingSkillId,
			remoteVersionMap: builtinRemoteVersionMap,
			localVersionMap: builtinLocalVersionMap
		});
		const showUpdate = hubUpdate.hasUpdate || hubUpdate.isUpdating || knotUpdate.hasUpdate || knotUpdate.isUpdating || enterpriseUpdate.hasUpdate || enterpriseUpdate.isUpdating || builtinUpdate.hasUpdate || builtinUpdate.isUpdating;
		const isUpdating = hubUpdate.isUpdating || knotUpdate.isUpdating || enterpriseUpdate.isUpdating || builtinUpdate.isUpdating;
		const enabled = !isSkillModelInvocationDisabled(skill);
		const isBuiltIn = isBuiltinSkill(skill);
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MySkillCard, {
			cardInfo: {
				title: getInstalledSkillDisplayName(skill),
				description: getInstalledSkillDescription(skill),
				iconUrl: resolveIconUrl(skill.iconUrl, skill.iconSource),
				riskResult: skillRiskMap?.get(skill.filePath),
				needsApiKey: needsApiKeyFromLabels(skill.labels),
				builtinBadgeText: isBuiltIn ? t("plugins.builtinBadge") : void 0
			},
			variant,
			enabled,
			pinned: !!pinnedMap?.[skill.filePath],
			updateStatus: isUpdating ? "updating" : showUpdate ? "available" : "none",
			batchMode,
			selected: selectedSkillPaths.has(skill.filePath),
			onUpdate: () => handleUpdateSkill(skill),
			onToggleSelect: () => onToggleSelectSkill(skill.filePath),
			onOpen: () => handleSkillCardClick(skill),
			onToggle: (next) => handleToggleSkill(skill.filePath, next),
			onUninstall: isBuiltIn ? void 0 : () => handleUninstallSkill(skill),
			onEdit: handleEditSkill && !isBuiltIn ? () => handleEditSkill(skill) : void 0,
			onOpenFolder: handleOpenFolderSkill ? () => handleOpenFolderSkill(skill) : void 0,
			onTry: !isSearchMode && enabled ? () => handleTrySkillForCard(skill) : void 0,
			onTogglePin: onTogglePin ? (next) => onTogglePin(skill.filePath, next) : void 0
		}, skill.filePath);
	};
	const renderPlugin = (plugin) => {
		const enabled = !pluginsService.isDisabled(plugin);
		const pluginKey = `${plugin.marketplaceName}/${plugin.name}`;
		const pluginPinKey = `plugin-${pluginKey}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MyPluginCard, {
			cardInfo: {
				title: plugin.name,
				description: plugin.description,
				badgeText: t("skills.tab.plugins"),
				builtinBadgeText: plugin.isBuiltIn ? t("plugins.builtinBadge") : void 0
			},
			variant,
			enabled,
			pinned: !!pinnedMap?.[pluginPinKey],
			batchMode,
			selected: selectedPluginKeys.has(pluginKey),
			onToggleSelect: () => onToggleSelectPlugin(pluginKey),
			onOpen: () => handlePluginCardClick(plugin),
			onToggle: (next) => handleToggleInstalledPlugin(plugin, next),
			onUninstall: plugin.isBuiltIn || plugin.canRemove === false ? void 0 : () => handleUninstallPlugin(plugin),
			onOpenFolder: handleOpenFolderPlugin ? () => handleOpenFolderPlugin(plugin) : void 0,
			onTogglePin: onTogglePin ? (next) => onTogglePin(pluginPinKey, next) : void 0
		}, pluginPinKey);
	};
	const renderItem = (key) => {
		const skill = skillsMap.get(key);
		if (skill) return renderSkill(skill);
		const plugin = pluginsMap.get(key);
		return plugin ? renderPlugin(plugin) : null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
		className: "sm-grid",
		ref: installedGridRef,
		children: sortedOrder.map(renderItem)
	});
}
var import_react$9, import_jsx_runtime$9, UPDATE_TOAST_KEY;
var init_installed_list = __esmMin((() => {
	init_src$1();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_extension_refresh_events();
	init_market_service_context();
	init_use_skill_creator_actions();
	init_use_try_skill();
	init_icon();
	init_skill_utils();
	init_text();
	init_toast();
	init_cards();
	import_jsx_runtime$9 = require_jsx_runtime();
	UPDATE_TOAST_KEY = {
		enterprise: "skills.recommend.updateSuccess",
		builtin: "skills.recommend.updateSuccess",
		hub: "skills.skillhub.updateSuccess",
		knot: "skills.knot.updateSuccess"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/installed-section/installed-sort.ts
function isSkillDisabled(skill) {
	return isSkillModelInvocationDisabled(skill);
}
function getInstalledItemKey(item) {
	if (item.type === "skill") return item.item.filePath;
	return getPluginKey(item.item);
}
function getPluginKey(plugin) {
	return `plugin-${plugin.marketplaceName}/${plugin.name}`;
}
function sortByInstalledAt(items) {
	items.sort((left, right) => right.installedAt - left.installedAt);
}
/**
* 合并已安装 Skill / Plugin，并按置顶、启用、禁用分组排序。
* @param isPluginDisabled 由 PluginsService.isDisabled 注入，避免纯函数依赖 service 实例
*/
function getMergedAndSortedItems(skills, plugins, isPluginDisabled, pinnedMap) {
	const pinnedItems = [];
	const enabledItems = [];
	const disabledItems = [];
	const appendItem = (item, key) => {
		const pinnedAt = pinnedMap?.[key];
		if (pinnedAt !== void 0) pinnedItems.push({
			...item,
			pinnedAt
		});
		else if (item.disabled) disabledItems.push(item);
		else enabledItems.push(item);
	};
	for (const skill of skills) appendItem({
		type: "skill",
		item: skill,
		installedAt: skill.installedAt ?? 0,
		disabled: isSkillDisabled(skill)
	}, skill.filePath);
	for (const plugin of plugins) appendItem({
		type: "plugin",
		item: plugin,
		installedAt: getPluginInstalledAt(plugin.name, plugin.marketplaceName),
		disabled: isPluginDisabled(plugin)
	}, getPluginKey(plugin));
	pinnedItems.sort((left, right) => right.pinnedAt - left.pinnedAt);
	sortByInstalledAt(enabledItems);
	sortByInstalledAt(disabledItems);
	return [
		...pinnedItems,
		...enabledItems,
		...disabledItems
	];
}
function collectVisibleItems(orderedKeys, skillsMap, pluginsMap, visibleCount) {
	const visibleSkills = [];
	const visiblePlugins = [];
	const sortedOrder = [];
	for (const key of orderedKeys.slice(0, visibleCount)) {
		const plugin = pluginsMap.get(key);
		if (plugin) {
			visiblePlugins.push(plugin);
			sortedOrder.push(key);
			continue;
		}
		const skill = skillsMap.get(key);
		if (skill) {
			visibleSkills.push(skill);
			sortedOrder.push(key);
		}
	}
	return {
		visibleSkills,
		visiblePlugins,
		sortedOrder
	};
}
function buildLookupMaps(skills, plugins) {
	return {
		skillsMap: new Map(skills.map((skill) => [skill.filePath, skill])),
		pluginsMap: new Map(plugins.map((plugin) => [getPluginKey(plugin), plugin]))
	};
}
/**
* 首次进入、搜索或置顶变化时重新生成完整顺序。
*/
function getVisibleItemsWithFreshSort(skills, plugins, visibleCount, isPluginDisabled, pinnedMap) {
	const fullSortedOrder = getMergedAndSortedItems(skills, plugins, isPluginDisabled, pinnedMap).map(getInstalledItemKey);
	const { skillsMap, pluginsMap } = buildLookupMaps(skills, plugins);
	return {
		...collectVisibleItems(fullSortedOrder, skillsMap, pluginsMap, visibleCount),
		fullSortedOrder,
		totalCount: fullSortedOrder.length
	};
}
/**
* 判定成员集合（key 与个数）是否与上次完全一致。只比 key 不比开关态：
* 开关变化不影响顺序，正是要靠这里短路掉的场景。
*/
function sameKeyMembership(prevSkills, nextSkills, prevPlugins, nextPlugins) {
	if (!prevSkills || !prevPlugins) return false;
	if (prevSkills.length !== nextSkills.length || prevPlugins.length !== nextPlugins.length) return false;
	for (let i = 0; i < nextSkills.length; i += 1) if (prevSkills[i].filePath !== nextSkills[i].filePath) return false;
	for (let i = 0; i < nextPlugins.length; i += 1) if (prevPlugins[i].name !== nextPlugins[i].name || prevPlugins[i].marketplaceName !== nextPlugins[i].marketplaceName) return false;
	return true;
}
/**
* 用户操作后保持既有位置；仅将新安装项按安装时间插入列表顶部。
*/
function getVisibleItemsWithStableOrder(skills, plugins, visibleCount, stableOrder) {
	if (stableOrderCache.fullSortedOrder !== void 0 && stableOrderCache.stableOrder === stableOrder && sameKeyMembership(stableOrderCache.skills, skills, stableOrderCache.plugins, plugins)) {
		const cachedOrder = stableOrderCache.fullSortedOrder;
		const { skillsMap, pluginsMap } = buildLookupMaps(skills, plugins);
		return {
			...collectVisibleItems(cachedOrder, skillsMap, pluginsMap, visibleCount),
			fullSortedOrder: cachedOrder,
			totalCount: cachedOrder.length
		};
	}
	const { skillsMap, pluginsMap } = buildLookupMaps(skills, plugins);
	const currentKeys = /* @__PURE__ */ new Set([...skillsMap.keys(), ...pluginsMap.keys()]);
	const existingOrder = [];
	for (const key of stableOrder) {
		if (!currentKeys.has(key)) continue;
		existingOrder.push(key);
		currentKeys.delete(key);
	}
	const newItems = [...currentKeys].map((key) => {
		const plugin = pluginsMap.get(key);
		const skill = skillsMap.get(key);
		return {
			key,
			installedAt: plugin ? getPluginInstalledAt(plugin.name, plugin.marketplaceName) : skill?.installedAt ?? 0
		};
	});
	newItems.sort((left, right) => right.installedAt - left.installedAt);
	const fullSortedOrder = [...newItems.map((item) => item.key), ...existingOrder];
	stableOrderCache.skills = skills;
	stableOrderCache.plugins = plugins;
	stableOrderCache.stableOrder = stableOrder;
	stableOrderCache.fullSortedOrder = fullSortedOrder;
	return {
		...collectVisibleItems(fullSortedOrder, skillsMap, pluginsMap, visibleCount),
		fullSortedOrder,
		totalCount: fullSortedOrder.length
	};
}
var stableOrderCache;
var init_installed_sort = __esmMin((() => {
	init_cache();
	init_skill_utils();
	stableOrderCache = {};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/installed-section/installed-status.tsx
/**
* 已安装列表加载骨架。
*/
function InstalledSkeletonGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
		className: "sm-grid",
		children: Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillCardSkeleton, {}, `skeleton-${index}`))
	});
}
/**
* 已启用技能过多时的提示条。
*/
function InstalledWarningBanner(props) {
	const { onDismiss } = props;
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "sm-enabled-warning",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
				className: "sm-enabled-warning-icon",
				children: "⚠"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
				className: "sm-enabled-warning-text",
				children: t("skills.enabledWarning")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
				type: "button",
				className: "sm-enabled-warning-dismiss",
				onClick: onDismiss,
				children: t("skills.enabledWarning.dismiss")
			})
		]
	});
}
/**
* 已安装空态 / 搜索无结果。
*/
function InstalledEmptyState(props) {
	const { kind } = props;
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
		className: "sm-installed-empty",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "sm-installed-empty-title",
			children: t(kind === "empty" ? "skills.installed.empty.title" : "skills.installed.searchNoMatch.title")
		})
	});
}
var import_jsx_runtime$8;
var init_installed_status = __esmMin((() => {
	require_react();
	init_useI18n();
	init_constants();
	init_cards();
	import_jsx_runtime$8 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/installed-section/index.tsx
function filterSkills(skills, keyword) {
	if (!keyword) return skills;
	return skills.filter((skill) => {
		return [
			skill.name,
			skill.description,
			skill.description_zh,
			skill.description_en
		].some((value) => textMatchesKeyword(value?.toLowerCase() ?? "", keyword));
	});
}
function filterPlugins(plugins, keyword) {
	if (!keyword) return plugins;
	return plugins.filter((plugin) => textMatchesKeyword(plugin.name.toLowerCase(), keyword) || textMatchesKeyword(plugin.description?.toLowerCase() ?? "", keyword));
}
/**
* 「我的」已装页：标题栏、批量管理与已装列表。
*/
function InstalledSection(props) {
	const { scrollRef } = props;
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const enterpriseService = useService(ServiceKey.EnterpriseService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const uiService = useService(ServiceKey.UIService);
	const { gridRef, defaultVisibleCount } = useGridColumns();
	const { pinnedMap, togglePin } = usePinnedInstalled();
	const { theme: appTheme } = useTheme();
	const rawSkills = installedSkillsService.useStore((s) => s.skills);
	const installedCountFromRpc = installedSkillsService.useStore((s) => s.installedCount);
	const installedListReady = installedSkillsService.useStore((s) => s.installedListReady);
	const loadingSkills = installedSkillsService.useStore((s) => s.loading);
	const skillRiskMap = installedSkillsService.useStore((s) => s.skillRiskMap);
	const enterpriseIconMap = enterpriseService.useStore((s) => s.iconMap);
	const pluginList = pluginsService.useStore((s) => s.installedPlugins);
	const loadingPlugins = pluginsService.useStore((s) => s.installedLoading);
	const panelActive = uiService.useStore((s) => s.panelActive);
	const [searchValue, setSearchValue] = (0, import_react$7.useState)("");
	const [warningDismissed, setWarningDismissed$1] = (0, import_react$7.useState)(() => isWarningDismissed());
	const [visibleCount, setVisibleCount] = (0, import_react$7.useState)(defaultVisibleCount);
	const stableSortOrderRef = (0, import_react$7.useRef)([]);
	const hasUserOperatedRef = (0, import_react$7.useRef)(false);
	const skills = (0, import_react$7.useMemo)(() => enrichInstalledSkillsWithEnterpriseIcons(rawSkills, enterpriseIconMap), [rawSkills, enterpriseIconMap]);
	const keyword = searchValue.trim().toLowerCase();
	const isSearchMode = keyword.length > 0;
	const displaySkills = (0, import_react$7.useMemo)(() => filterSkills(skills, keyword), [keyword, skills]);
	const displayPlugins = (0, import_react$7.useMemo)(() => filterPlugins(pluginList, keyword), [keyword, pluginList]);
	const listBasedCount = skills.length + pluginList.length;
	const totalInstalledCount = Math.max(installedCountFromRpc ?? 0, listBasedCount);
	const showTotalInstalledCount = installedListReady && totalInstalledCount > 0;
	(0, import_react$7.useEffect)(() => {
		if (loadingSkills || loadingPlugins) return;
		if (installedCountFromRpc === null || installedCountFromRpc === listBasedCount) return;
		skillPerfLog("ui.installedCount.mismatch", {
			rpcCount: installedCountFromRpc,
			listCount: listBasedCount,
			skills: skills.length,
			plugins: pluginList.length,
			delta: listBasedCount - installedCountFromRpc
		});
	}, [
		installedCountFromRpc,
		listBasedCount,
		loadingSkills,
		loadingPlugins,
		skills.length,
		pluginList.length
	]);
	const enabledCount = (0, import_react$7.useMemo)(() => {
		let count = 0;
		for (const skill of skills) if (!isSkillDisabled(skill)) count += 1;
		for (const plugin of pluginList) if (!pluginsService.isDisabled(plugin)) count += 1;
		return count;
	}, [
		skills,
		pluginList,
		pluginsService
	]);
	const isLoading = loadingSkills || loadingPlugins;
	const showWarningBanner = enabledCount > 80 && !warningDismissed;
	const dialogTheme = appTheme === "dark" ? "dark" : "light";
	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};
	const { batchMode, selectedSkillPaths, selectedPluginKeys, selectedCount, batchActionInProgress, uninstallConfirmVisible, handleEnterBatchMode, handleExitBatchMode, handleSelectAll, handleDeselectAll, handleToggleSelectSkill, handleToggleSelectPlugin, handleRequestBatchAction, handleCancelBatchUninstall, handleConfirmBatchUninstall } = useBatchActions({
		skills: displaySkills,
		plugins: displayPlugins
	});
	(0, import_react$7.useEffect)(() => {
		if (enabledCount <= 80 && warningDismissed) {
			setWarningDismissed$1(false);
			setWarningDismissed(false);
		}
	}, [enabledCount, warningDismissed]);
	(0, import_react$7.useEffect)(() => {
		setVisibleCount((previous) => Math.max(previous, defaultVisibleCount));
	}, [defaultVisibleCount]);
	(0, import_react$7.useEffect)(() => {
		setVisibleCount(defaultVisibleCount);
	}, [searchValue]);
	const handleDismissWarning = () => {
		setWarningDismissed$1(true);
		setWarningDismissed(true);
	};
	const handleUserOperate = () => {
		hasUserOperatedRef.current = true;
	};
	const handleTogglePin = (key, next) => {
		stableSortOrderRef.current = [];
		togglePin(key, next);
	};
	const visibleItems = (0, import_react$7.useMemo)(() => {
		if (!(displaySkills.length > 0 || displayPlugins.length > 0)) return {
			visibleSkills: [],
			visiblePlugins: [],
			sortedOrder: [],
			fullSortedOrder: isSearchMode ? stableSortOrderRef.current : [],
			totalCount: 0
		};
		if (isSearchMode) return {
			...getVisibleItemsWithFreshSort(displaySkills, displayPlugins, visibleCount, (plugin) => pluginsService.isDisabled(plugin), pinnedMap),
			fullSortedOrder: stableSortOrderRef.current
		};
		if (panelActive && !hasUserOperatedRef.current || stableSortOrderRef.current.length === 0) {
			const result = getVisibleItemsWithFreshSort(displaySkills, displayPlugins, visibleCount, (plugin) => pluginsService.isDisabled(plugin), pinnedMap);
			stableSortOrderRef.current = result.fullSortedOrder;
			return result;
		}
		return getVisibleItemsWithStableOrder(displaySkills, displayPlugins, visibleCount, stableSortOrderRef.current);
	}, [
		displayPlugins,
		displaySkills,
		isSearchMode,
		panelActive,
		pinnedMap,
		pluginsService,
		visibleCount
	]);
	(0, import_react$7.useEffect)(() => {
		if (!isSearchMode && visibleItems.fullSortedOrder.length > 0) stableSortOrderRef.current = visibleItems.fullSortedOrder;
	}, [isSearchMode, visibleItems.fullSortedOrder]);
	const hasMore = visibleItems.sortedOrder.length < visibleItems.totalCount;
	const sentinelRef = useInfiniteScroll(() => setVisibleCount((previous) => previous + INSTALLED_SCROLL_BATCH_SIZE), hasMore, scrollRef);
	const hasNoSearchResult = isSearchMode && totalInstalledCount > 0 && displaySkills.length === 0 && displayPlugins.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: "sm-installed-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InstalledPageHeader, {
				installedCount: totalInstalledCount,
				showInstalledCount: showTotalInstalledCount,
				batchMode,
				searchValue,
				onEnterBatchMode: handleEnterBatchMode,
				onSearchChange: handleSearchChange
			}),
			showWarningBanner && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InstalledWarningBanner, { onDismiss: handleDismissWarning }),
			batchMode && totalInstalledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(BatchHeader, {
				selectedCount,
				onSelectAll: handleSelectAll,
				onDeselectAll: handleDeselectAll,
				onBatchAction: handleRequestBatchAction,
				onExit: handleExitBatchMode,
				batchActionInProgress
			}),
			isLoading && totalInstalledCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InstalledSkeletonGrid, {}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InstalledList, {
					visibleSkills: visibleItems.visibleSkills,
					visiblePlugins: visibleItems.visiblePlugins,
					sortedOrder: visibleItems.sortedOrder,
					batchMode,
					selectedSkillPaths,
					selectedPluginKeys,
					onToggleSelectSkill: handleToggleSelectSkill,
					onToggleSelectPlugin: handleToggleSelectPlugin,
					onUserOperate: handleUserOperate,
					installedGridRef: gridRef,
					skillRiskMap,
					isSearchMode,
					pinnedMap,
					onTogglePin: handleTogglePin
				}),
				hasMore && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					ref: sentinelRef,
					className: "sm-scroll-sentinel"
				}),
				!isLoading && totalInstalledCount === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InstalledEmptyState, { kind: "empty" }),
				hasNoSearchResult && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InstalledEmptyState, { kind: "noSearchResult" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(BatchUninstallConfirmModal, {
				visible: uninstallConfirmVisible,
				count: selectedCount,
				onCancel: handleCancelBatchUninstall,
				onConfirm: handleConfirmBatchUninstall,
				theme: dialogTheme
			})
		]
	});
}
var import_react$7, import_jsx_runtime$7, INSTALLED_SCROLL_BATCH_SIZE;
var init_installed_section = __esmMin((() => {
	init_style$5();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_keyword_match();
	init_useTheme();
	init_skill_perf_log();
	init_constants();
	init_market_service_context();
	init_hooks();
	init_use_batch_actions();
	init_use_grid_columns();
	init_use_infinite_scroll();
	init_cache();
	init_enterprise();
	init_batch_uninstall_confirm_modal();
	init_installed_header();
	init_installed_list();
	init_installed_sort();
	init_installed_status();
	import_jsx_runtime$7 = require_jsx_runtime();
	INSTALLED_SCROLL_BATCH_SIZE = 100;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/market-top-bar/style.less
var init_style$4 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/market-top-bar/index.tsx
/** 市场顶栏：搜索 + 已安装入口 + 添加技能（当前仅挂本地导入；Web 云端上传待补回） */
function MarketTopBar(props) {
	const { headerLeft } = props;
	const t = useTranslation();
	const uiService = useService(ServiceKey.UIService);
	const searchService = useService(ServiceKey.SearchService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const { findSkill, createSkill, importSkill } = useSkillCreatorActions();
	const searchValue = searchService.useStore((s) => s.inputValue);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const installedSkillCount = installedSkillsService.useStore((s) => s.installedCount);
	const installedListReady = installedSkillsService.useStore((s) => s.installedListReady);
	const installedPlugins = pluginsService.useStore((s) => s.installedPlugins);
	const { policy: uploadPolicy } = useSkillUploadPolicy();
	const installedCount = (installedSkillCount ?? installedSkills.length) + (installedPlugins?.length ?? 0);
	const showInstalledCount = installedListReady && installedCount > 0;
	const allowAddSkill = uploadPolicy?.allowed ?? true;
	const installedLabel = t("unifiedMarket.myInstalled");
	const topBarRootClassName = useTopBarRootClassName();
	const { screenWidth } = useNarrowLayout();
	const isTopbarNarrow = screenWidth > 0 && screenWidth < 980;
	const addSkillMenuItems = [
		{
			key: "find",
			label: t("skills.find.button")
		},
		{
			key: "upload",
			label: t("skills.import.button"),
			trackId: "skill_upload",
			trackName: "上传技能",
			trackProps: { type: "upload" }
		},
		{
			key: "create",
			label: t("skills.create.button"),
			trackId: "skill_create_new",
			trackName: "创建技能",
			trackProps: { type: "create" }
		}
	];
	const handleSearchChange = (value) => {
		searchService.search(value);
	};
	const handleOpenInstalled = () => {
		uiService.setView(MarketView.Installed);
	};
	const handleAddSkill = (key) => {
		if (key === "find") findSkill();
		if (key === "upload") importSkill();
		if (key === "create") createSkill();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("header", {
		className: `${topBarRootClassName} ec-topbar`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "ec-topbar__left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SidebarExpandButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SidebarNewTaskButton, {}),
				headerLeft
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "ec-topbar__right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "ec-search-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Input.Search, {
						placeholder: t("unifiedMarket.search.skills"),
						value: searchValue,
						onChange: (e) => handleSearchChange(e.target.value),
						allowClear: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
					content: isTopbarNarrow ? installedLabel : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(Button, {
						variant: "grey",
						iconOnly: isTopbarNarrow,
						"aria-label": installedLabel,
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(InstalledSkillIcon, {}),
						onClick: handleOpenInstalled,
						"data-track-id": "skill_market_my_installed_open",
						"data-track-name": "技能市场-我的已安装",
						children: [!isTopbarNarrow && installedLabel, showInstalledCount && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "sm-topbar-installed-count",
							children: installedCount
						})]
					})
				}),
				allowAddSkill && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
					content: isTopbarNarrow ? t("unifiedMarket.addSkill") : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Dropdown, {
						placement: "bottom-end",
						items: addSkillMenuItems,
						onSelect: handleAddSkill,
						trigger: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
							variant: "grey",
							iconOnly: isTopbarNarrow,
							"aria-label": t("unifiedMarket.addSkill"),
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AddCircleIcon, {}),
							children: !isTopbarNarrow && t("unifiedMarket.addSkill")
						})
					})
				})
			]
		})]
	});
}
/**
* 路由壳顶栏（加载 / 错误 / 降级等待）：只保留侧栏按钮与 headerLeft，不含搜索与已安装
*/
function MarketShellTopBar(props) {
	const { headerLeft } = props;
	const topBarRootClassName = useTopBarRootClassName();
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("header", {
		className: `${topBarRootClassName} ec-topbar`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "ec-topbar__left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SidebarExpandButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SidebarNewTaskButton, {}),
				headerLeft
			]
		})
	});
}
/** 已安装页顶栏：面包屑返回市场 */
function InstalledTopBar() {
	const t = useTranslation();
	const uiService = useService(ServiceKey.UIService);
	const topBarRootClassName = useTopBarRootClassName();
	const handleBack = () => {
		uiService.setView(MarketView.Market);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("header", {
		className: `${topBarRootClassName} ec-topbar ec-topbar--subpage`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "ec-topbar__left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SidebarExpandButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SidebarNewTaskButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Breadcrumb, {
					leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronLeftIcon, {
						width: 16,
						height: 16
					}),
					onLeadingIconClick: handleBack,
					leadingIconAriaLabel: t("skills.backToAll"),
					items: [{
						key: "all-skills",
						label: t("skills.backToAll"),
						onClick: (e) => {
							e.preventDefault();
							handleBack();
						}
					}]
				})
			]
		})
	});
}
var import_jsx_runtime$6;
var init_market_top_bar = __esmMin((() => {
	init_style$4();
	init_src();
	require_react();
	init_icons();
	init_workbuddy_topbar();
	init_use_narrow_layout();
	init_useI18n();
	init_use_skill_upload_policy();
	init_market_service_context();
	init_use_skill_creator_actions();
	init_types$2();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/search-results/style.less
var init_style$3 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/search-results/index.tsx
/**
* 市场全局搜索结果列表：Tab / 隐藏已装 / 错误提示 + 复用各源 Panel。
*/
function SearchResults() {
	const t = useTranslation();
	const searchService = useService(ServiceKey.SearchService);
	const installedSkillsService = useService(ServiceKey.InstalledSkillsService);
	const pluginsService = useService(ServiceKey.PluginsService);
	const searchBuckets = searchService.useStore((s) => s.buckets);
	const searchError = searchService.useStore((s) => s.error);
	const hideInstalled = searchService.useStore((s) => s.hideInstalled);
	const searchCollectionId = searchService.useStore((s) => s.searchCollectionId);
	const autoSelectPending = searchService.useStore((s) => s.autoSelectPending);
	const userPickedTab = searchService.useStore((s) => s.userPickedTab);
	const installedSkills = installedSkillsService.useStore((s) => s.skills);
	const installedPlugins = pluginsService.useStore((s) => s.installedPlugins);
	const autoSelectPendingRef = (0, import_react$5.useRef)(autoSelectPending);
	const userPickedTabRef = (0, import_react$5.useRef)(userPickedTab);
	autoSelectPendingRef.current = autoSelectPending;
	userPickedTabRef.current = userPickedTab;
	(0, import_react$5.useEffect)(() => {
		if (!hideInstalled) return;
		searchService.refreshBuckets();
	}, [
		hideInstalled,
		installedSkills,
		installedPlugins,
		searchService
	]);
	const currentBucket = searchBuckets.find((bucket) => bucket.id === searchCollectionId) ?? searchBuckets[0];
	const totalCount = searchBuckets.reduce((sum, bucket) => sum + bucket.items.length, 0);
	(0, import_react$5.useEffect)(() => {
		if (!autoSelectPendingRef.current || userPickedTabRef.current) return;
		if (!currentBucket || currentBucket.loading) return;
		if (currentBucket.items.length > 0) {
			searchService.markAutoSelectDone();
			return;
		}
		const firstWithItems = searchBuckets.find((bucket) => bucket.items.length > 0);
		if (firstWithItems) {
			searchService.autoSelectSearchCollectionId(firstWithItems.id);
			searchService.markAutoSelectDone();
			return;
		}
		if (searchBuckets.every((bucket) => !bucket.loading)) searchService.markAutoSelectDone();
	}, [searchBuckets, currentBucket]);
	const handleSelectBucket = (id) => {
		searchService.setSearchCollectionId(id);
	};
	const handleHideInstalledChange = (e) => {
		searchService.setHideInstalled(e.target.checked);
	};
	let emptyText = totalCount === 0 ? t("skills.skillhub.searchEmpty") : t("skills.search.tabEmpty");
	if (searchError) emptyText = t("skills.search.allFail");
	else if (currentBucket?.error) emptyText = t("skills.search.tabFail");
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "sm-search-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "sm-segment-bar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "sm-segment-group",
				children: searchBuckets.map((bucket) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
					type: "button",
					className: `sm-segment-item${currentBucket?.id === bucket.id ? " sm-segment-item--active" : ""}`,
					onClick: () => handleSelectBucket(bucket.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: pickI18nText(bucket.collection.name) }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "sm-installed-pill-badge",
						children: bucket.items.length
					})]
				}, bucket.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Checkbox, {
				className: "sm-hide-installed-checkbox",
				label: t("skills.filter.hideInstalled"),
				size: "small",
				checked: hideInstalled,
				onChange: handleHideInstalledChange
			})]
		}), currentBucket && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SearchBucketPanel, {
			bucket: currentBucket,
			emptyText
		})]
	});
}
/**
* 按 bucket.source 挂载对应受控 Panel。
*/
function SearchBucketPanel(props) {
	const { bucket, emptyText } = props;
	const searchService = useService(ServiceKey.SearchService);
	const source = bucket.collection.source;
	const loading = bucket.loading || !!bucket.loadingMore;
	const hasMore = bucket.hasMore;
	const handleLoadMore = () => searchService.loadMore(bucket.id);
	if (source === CollectionSubType.Recommend || source === CollectionSubType.Default) {
		const skills = bucket.items.filter((item) => item.kind === "builtin").map((item) => item.value);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CollectionPanel, {
			skills,
			loading,
			emptyText,
			hasMore,
			onLoadMore: handleLoadMore
		});
	}
	if (source === CollectionSubType.SkillHub) {
		const skills = bucket.items.filter((item) => item.kind === "skillhub").map((item) => item.value);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillhubPanel, {
			skills,
			loading,
			emptyText,
			hasMore,
			onLoadMore: handleLoadMore
		});
	}
	if (source === ClientTabId.Knot) {
		const skills = bucket.items.filter((item) => item.kind === "knot").map((item) => item.value);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(KnotPanel, {
			skills,
			loading,
			emptyText,
			hasMore,
			onLoadMore: handleLoadMore
		});
	}
	if (source === ClientTabId.Enterprise) {
		const skills = bucket.items.filter((item) => item.kind === "enterprise").map((item) => item.value);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(EnterprisePanel, {
			skills,
			loading,
			emptyText,
			hasMore,
			onLoadMore: handleLoadMore
		});
	}
	if (source === CollectionSubType.Plugins) {
		const plugins = bucket.items.filter((item) => item.kind === "plugin").map((item) => item.value);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PluginsPanel, {
			plugins,
			loading,
			emptyText
		});
	}
	return null;
}
var import_react$5, import_jsx_runtime$5;
var init_search_results = __esmMin((() => {
	init_style$3();
	init_src();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_market_service_context();
	init_types$2();
	init_text();
	init_panels();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-detail-modal/index.ts
var init_skill_detail_modal = __esmMin((() => {
	init_skill_detail_modal$1();
	init_skill_detail_content();
	init_standalone_skill_detail_modal();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/upload-modal/style.less
var init_style$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/security-warning-block/style.less
var init_style$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/security-warning-block/index.tsx
/**
* 安全检测信息展示区域（不含按钮）。
*
* - verdict 为空：无内容（等待态信息已在 overlay 展示）。
* - verdict 不为空且非 white：展示风险等级、描述、标签。
*/
function SecurityWarningBlock(props) {
	const { scanResult } = props;
	if (isPendingScanResult(scanResult)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(RiskInfoBlock, { scanResult });
}
function SecurityWarningActions(props) {
	const { scanResult, onCancel, onConfirmInstall, onSkipScan } = props;
	const t = useTranslation();
	if (isPendingScanResult(scanResult)) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		className: "sm-security-warning-actions sm-security-warning-actions--center",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			type: "button",
			className: "sm-security-warning-btn sm-security-warning-btn--skip",
			onClick: onSkipScan,
			children: t("skills.security.skipDirectInstall")
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(RiskActions, {
		scanResult,
		onCancel,
		onConfirmInstall: isFailedScanResult(scanResult) ? onSkipScan ?? onConfirmInstall : onConfirmInstall
	});
}
function RiskInfoBlock(props) {
	const { scanResult } = props;
	const t = useTranslation();
	const scanFailed = isFailedScanResult(scanResult);
	const failedKey = scanResult.failureReason === "timeout" ? "timeout" : "error";
	const isSuspicious = scanResult.verdict === "suspicious";
	const riskLevelClass = isSuspicious || scanFailed ? "sm-security-warning--suspicious" : `sm-security-warning--${scanResult.riskLevel}`;
	const titleKey = scanFailed ? `skills.security.failed.${failedKey}Title` : isSuspicious ? "skills.security.verdict.grey" : `skills.security.result.${scanResult.riskLevel}`;
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: `sm-security-warning ${riskLevelClass}`,
		role: scanFailed ? "alert" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "sm-security-warning-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "sm-security-warning-icon",
					children: "⚠"
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "sm-security-warning-title",
					children: t(titleKey)
				})]
			}),
			(scanFailed || scanResult.description) && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
				className: "sm-security-warning-desc",
				children: scanFailed ? t(`skills.security.failed.${failedKey}Content`) : scanResult.description
			}),
			scanResult.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "sm-security-warning-tags",
				children: scanResult.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "sm-security-warning-tag",
					children: tag.desc || tag.tag
				}, tag.tag))
			})
		]
	});
}
function RiskActions(props) {
	const { scanResult, onCancel, onConfirmInstall } = props;
	const t = useTranslation();
	const isHighRisk = !(scanResult.verdict === "suspicious") && scanResult.riskLevel === "high";
	const [countdown, setCountdown] = (0, import_react$4.useState)(isHighRisk ? HIGH_RISK_COUNTDOWN_SECONDS : 0);
	(0, import_react$4.useEffect)(() => {
		if (!isHighRisk) {
			setCountdown(0);
			return;
		}
		setCountdown(HIGH_RISK_COUNTDOWN_SECONDS);
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, [isHighRisk, scanResult]);
	const handleConfirm = (0, import_react$4.useCallback)(() => {
		if (countdown > 0) return;
		onConfirmInstall();
	}, [countdown, onConfirmInstall]);
	const confirmDisabled = countdown > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "sm-security-warning-actions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			type: "button",
			className: "sm-security-warning-btn sm-security-warning-btn--confirm",
			disabled: confirmDisabled,
			onClick: handleConfirm,
			children: confirmDisabled ? t("skills.security.confirmCountdown", { seconds: String(countdown) }) : t(isFailedScanResult(scanResult) ? "skills.security.skipDirectInstall" : "skills.security.continueInstall")
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			type: "button",
			className: "sm-security-warning-btn sm-security-warning-btn--cancel",
			onClick: onCancel,
			children: t("skills.security.cancelInstall")
		})]
	});
}
var import_react$4, import_jsx_runtime$4, HIGH_RISK_COUNTDOWN_SECONDS;
var init_security_warning_block = __esmMin((() => {
	init_style$1();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_skill_security_result();
	import_jsx_runtime$4 = require_jsx_runtime();
	HIGH_RISK_COUNTDOWN_SECONDS = 5;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/upload-modal/index.tsx
/** 4 个 reason 映射到对应 i18n key（与 `use-installed-skills.ts` 一致）。 */
function policyReasonKey(reason) {
	switch (reason) {
		case "DISABLED": return "skills.upload.policy.disabled";
		case "NOT_IN_WHITELIST": return "skills.upload.policy.notInWhitelist";
		case "IN_BLACKLIST": return "skills.upload.policy.inBlacklist";
		default: return "skills.upload.policy.invalidMode";
	}
}
function UploadModal(props) {
	const { isDraggingOver, showUploadOverlay, scanEnabled, autoInstallNonHighRisk, onAutoInstallNonHighRiskChange, uploadScanResult, policy, onClose, onConfirm, useWindowsStyleDesktopPick, onConfirmZip, onDragOver, onDragLeave, onDrop, onCancelScanResult, onConfirmRiskyInstall, onSkipScan } = props;
	const t = useTranslation();
	const hasVerdict = !!uploadScanResult?.verdict;
	const scanFailed = isFailedScanResult(uploadScanResult);
	const isSecurityScanning = showUploadOverlay && scanEnabled || uploadScanResult && !hasVerdict && !scanFailed;
	const policyBlocked = policy?.allowed === false;
	const dropZoneDisabled = isSecurityScanning || policyBlocked;
	return import_react_dom$1.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: "sm-upload-modal-overlay",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "sm-upload-modal",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "sm-upload-modal-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: t("skills.upload.modal.title") }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
						type: "button",
						className: "sm-upload-modal-close",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
								d: "M12 4L4 12M4 4l8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				policyBlocked && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "sm-upload-requirements-list-item",
					style: {
						color: "var(--cb-error-foreground)",
						padding: "8px 12px"
					},
					role: "alert",
					children: t(policyReasonKey(policy?.reason))
				}),
				!hasVerdict && !scanFailed && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: [
						"sm-upload-drop-zone",
						isDraggingOver && "sm-upload-drop-zone--dragging",
						dropZoneDisabled && "sm-upload-drop-zone--disabled"
					].filter(Boolean).join(" "),
					onClick: dropZoneDisabled ? void 0 : onConfirm,
					onDragOver: dropZoneDisabled ? void 0 : onDragOver,
					onDragLeave: dropZoneDisabled ? void 0 : onDragLeave,
					onDrop: dropZoneDisabled ? void 0 : onDrop,
					"aria-disabled": policyBlocked || void 0,
					title: policyBlocked ? t(policyReasonKey(policy?.reason)) : void 0,
					children: [
						(showUploadOverlay || uploadScanResult && !hasVerdict) && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "sm-upload-overlay",
							children: scanEnabled ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
								className: "sm-upload-overlay-icon",
								children: "⏳"
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "sm-upload-overlay-text",
								children: t("skills.upload.modal.securityChecking")
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "sm-upload-overlay-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "sm-upload-overlay-text",
								children: t("skills.upload.modal.uploadingText")
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "sm-upload-drop-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
								width: "32",
								height: "32",
								viewBox: "0 0 32 32",
								fill: "none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("rect", {
										x: "3",
										y: "6",
										width: "26",
										height: "20",
										rx: "2",
										stroke: "currentColor",
										strokeWidth: "1.6",
										fill: "none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
										d: "M3 11h26",
										stroke: "currentColor",
										strokeWidth: "1.6"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
										d: "M10 6V3M22 6V3",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
										d: "M16 17v5M13 20l3-3 3 3",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "sm-upload-drop-title",
							children: isDraggingOver ? t("skills.upload.modal.dragging") : t("skills.upload.modal.dropTitle")
						})
					]
				}),
				isSecurityScanning && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "sm-upload-requirements-list-item",
					children: t("skills.security.intent.pendingContent")
				}),
				scanEnabled && !hasVerdict && !scanFailed && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Checkbox$1, {
					checked: autoInstallNonHighRisk,
					onChange: (checked) => onAutoInstallNonHighRiskChange?.(checked),
					label: t("skills.security.autoInstall")
				}),
				uploadScanResult && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SecurityWarningBlock, { scanResult: uploadScanResult }),
				uploadScanResult && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SecurityWarningActions, {
					scanResult: uploadScanResult,
					onCancel: onCancelScanResult,
					onConfirmInstall: onConfirmRiskyInstall,
					onSkipScan
				}),
				!showUploadOverlay && !uploadScanResult && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "sm-upload-requirements",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "sm-upload-requirements-title",
							children: t("skills.upload.modal.requirementsTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("ul", {
							className: "sm-upload-requirements-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("li", {
									className: "sm-upload-requirements-list-item",
									children: t("skills.upload.modal.requirementFolder")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("li", {
									className: "sm-upload-requirements-list-item",
									children: t("skills.upload.modal.requirementMd")
								}),
								policy && policy.max_size_bytes > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("li", {
									className: "sm-upload-requirements-list-item",
									children: t("skills.upload.policy.tooLarge", { limit: formatBytes(policy.max_size_bytes) })
								})
							]
						}),
						useWindowsStyleDesktopPick && onConfirmZip && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
							type: "button",
							className: "sm-upload-pick-zip-link",
							onClick: onConfirmZip,
							children: t("skills.upload.modal.pickZipFile")
						})
					]
				})
			]
		})
	}), document.body);
}
var import_react_dom$1, import_jsx_runtime$3;
var init_upload_modal = __esmMin((() => {
	init_style$2();
	init_src$1();
	require_react();
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_format_bytes();
	init_skill_security_result();
	init_security_warning_block();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-import-modal/index.tsx
function SkillImportModal(props) {
	const { flow, scanEnabled, showUploadOverlay } = props;
	if (!flow.showUploadModal) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(UploadModal, {
		isDraggingOver: flow.isDraggingOver,
		showUploadOverlay,
		scanEnabled,
		autoInstallNonHighRisk: flow.autoInstallNonHighRisk,
		onAutoInstallNonHighRiskChange: flow.setAutoInstallNonHighRisk,
		uploadScanResult: flow.uploadScanResult ?? null,
		onClose: () => flow.setShowUploadModal(false),
		onConfirm: flow.handleUploadConfirm,
		useWindowsStyleDesktopPick: flow.useWindowsStyleDesktopPick,
		onConfirmZip: flow.useWindowsStyleDesktopPick ? flow.handleUploadConfirmZip : void 0,
		onDragOver: flow.handleDragOver,
		onDragLeave: flow.handleDragLeave,
		onDrop: flow.handleDrop,
		onCancelScanResult: flow.handleCancelScanResult,
		onConfirmRiskyInstall: flow.handleConfirmRiskyInstall,
		onSkipScan: flow.handleSkipScanResult
	});
}
var import_jsx_runtime$2;
var init_skill_import_modal = __esmMin((() => {
	require_react();
	init_upload_modal();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-update-confirm-modal/style.less
var init_style = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/components/skill-update-confirm-modal/index.tsx
/** Issue #41287：用户编辑过的 marketplace skill 触发更新时的二次确认弹窗。 */
function SkillUpdateConfirmModal(props) {
	const { visible, onCancel, onConfirm } = props;
	const t = useTranslation();
	if (!visible) return null;
	return import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "sm-update-confirm-modal-overlay",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "sm-update-confirm-modal",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "sm-update-confirm-modal-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("skills.update.modifiedConfirm.title") }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						type: "button",
						className: "sm-update-confirm-modal-close",
						onClick: onCancel,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M12 4L4 12M4 4l8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "sm-update-confirm-modal-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
						className: "sm-update-confirm-description",
						children: t("skills.update.modifiedConfirm.desc")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "sm-update-confirm-modal-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button$1, {
						variant: "secondary",
						onClick: onCancel,
						children: t("skills.update.modifiedConfirm.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button$1, {
						variant: "primary",
						onClick: onConfirm,
						children: t("skills.update.modifiedConfirm.confirm")
					})]
				})
			]
		})
	}), document.body);
}
var import_react_dom, import_jsx_runtime$1;
var init_skill_update_confirm_modal = __esmMin((() => {
	init_style();
	init_src$1();
	require_react();
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skill-market/skills-market.tsx
/**
* 行业技能市场入口：持有 Service Provider，按 collectionsStatus 分流骨架 / 错误 / 行业内容；
* 降级由 onDowngrade 交给外层切换，不在 Provider 内挂通用版。
*/
function SkillsMarket(props) {
	const { templateId } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketServiceProvider, {
		templateId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustrySkillsRouteShell, { ...props })
	});
}
/**
* 行业路由壳：bootstrap Layout，订阅 collectionsStatus 决定渲染。
* Idle / Loading / Downgrade / Error 共用精简顶栏，Ready 才挂载行业内容。
*/
function IndustrySkillsRouteShell(props) {
	const { visible, active, headerLeft, onDowngrade, initialLevel1Tab } = props;
	const t = useTranslation();
	const services = useMarketServices();
	const marketLayoutService = services.marketLayoutService;
	const uiService = services.uiService;
	const marketBuiltinService = services.marketBuiltinService;
	const collectionsStatus = marketLayoutService.useStore((s) => s.collectionsStatus);
	const tabs = marketLayoutService.useStore((s) => s.tabs);
	const firstScreenCollectionId = (tabs.find((tab) => tab.source === CollectionSubType.Recommend) ?? tabs.find((tab) => tab.source === CollectionSubType.Default))?.id;
	const firstScreenLoading = marketBuiltinService.useStore((s) => (firstScreenCollectionId ? s.collections[firstScreenCollectionId]?.loading : false) ?? false);
	const firstScreenError = marketBuiltinService.useStore((s) => (firstScreenCollectionId ? s.collections[firstScreenCollectionId]?.error : false) ?? false);
	const firstScreenItemCount = marketBuiltinService.useStore((s) => (firstScreenCollectionId ? s.collections[firstScreenCollectionId]?.skills.length : 0) ?? 0);
	const view = services.uiService.useStore((s) => s.view);
	const isSkeleton = collectionsStatus === CollectionsStatus.Idle || collectionsStatus === CollectionsStatus.Loading || collectionsStatus === CollectionsStatus.Downgrade;
	const isCollectionsError = collectionsStatus === CollectionsStatus.Error;
	const trackSkillsMarketList = !!(visible && active && collectionsStatus !== CollectionsStatus.Downgrade && view === MarketView.Market);
	useMarketPageLoad({
		tab: "skills",
		active: trackSkillsMarketList,
		store: getMarketPageLoadStore(),
		loading: isSkeleton || firstScreenLoading,
		loadFailed: isCollectionsError || !!firstScreenError && firstScreenItemCount === 0,
		itemCount: firstScreenItemCount
	});
	(0, import_react.useLayoutEffect)(() => {
		if (visible && active && !trackSkillsMarketList) delete getMarketPageLoadStore().openStarts.skills;
	}, [
		visible,
		active,
		trackSkillsMarketList
	]);
	useMarketLayoutBootstrap({
		visible,
		active
	});
	(0, import_react.useLayoutEffect)(() => {
		if (initialLevel1Tab === "installed") uiService.setView(MarketView.Installed);
	}, [initialLevel1Tab, uiService]);
	(0, import_react.useEffect)(() => {
		if (collectionsStatus === CollectionsStatus.Downgrade) onDowngrade();
	}, [collectionsStatus, onDowngrade]);
	const handleRetry = () => {
		marketLayoutService.reloadCollections();
	};
	if (collectionsStatus === CollectionsStatus.Idle || collectionsStatus === CollectionsStatus.Loading || collectionsStatus === CollectionsStatus.Downgrade) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "skill-market",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketShellTopBar, { headerLeft }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "skill-market__content",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketSkeleton, { tabs: 0 })
		})]
	});
	if (collectionsStatus === CollectionsStatus.Error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "skill-market",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketShellTopBar, { headerLeft }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "skill-market__content",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketError, {
				message: t("skills.market.loadError"),
				retryLabel: t("skills.knot.retry"),
				onRetry: handleRetry
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsMarketContent, {
		...props,
		services
	});
}
function SkillsMarketContent(props) {
	const { visible, active, showMcpButton, onMcpClick, skillRiskMap, autoInstallNonHighRisk: autoInstallNonHighRiskProp, onAutoInstallNonHighRiskChange: onAutoInstallNonHighRiskChangeProp, scanEnabled, headerLeft, renderDetailBack, templateId, services } = props;
	const isDesktop = isWorkBuddyDesktop();
	const host = useModuleHost();
	const securityPreference = useSecurityPreference(host.adapter);
	const { scrollRef, showBackToTop, scrollToTop } = useScrollToTop();
	const { uiService, installedSkillsService, searchService } = services;
	useMarketPanelLifecycle({
		visible,
		active,
		skillRiskMap
	});
	useNamedPageShow({
		active: !!(visible && active),
		elementId: "skill_market_page_show",
		elementName: "技能市场页面"
	});
	const view = uiService.useStore((s) => s.view);
	const returnView = uiService.useStore((s) => s.returnView);
	const modifiedConfirmVisible = uiService.useStore((s) => s.pendingModifiedUpdate !== null);
	const isSearching = searchService.useStore((s) => s.inputValue.trim().length > 0);
	const listView = view === MarketView.SkillDetail ? returnView : view;
	const showMarketList = view === MarketView.Market || view === MarketView.Installed || view === MarketView.SkillDetail;
	const importFlow = usePersonalSkillImport({
		scanEnabled: scanEnabled ?? securityPreference.scanEnabled,
		autoInstallNonHighRisk: autoInstallNonHighRiskProp ?? securityPreference.autoInstallNonHighRisk,
		onAutoInstallNonHighRiskChange: onAutoInstallNonHighRiskChangeProp ?? securityPreference.toggleAutoInstall,
		onSuccess: () => {
			installedSkillsService.scheduleReconcile();
		}
	});
	const showUploadOverlay = useDelayedVisible(importFlow.uploading, 3e3);
	const importModalRequested = uiService.useStore((s) => s.showUploadModal);
	(0, import_react.useEffect)(() => {
		if (!importModalRequested) return;
		importFlow.setShowUploadModal(true);
		uiService.clearImportModalRequest();
	}, [importModalRequested, importFlow]);
	const { showBatchUpdateModal, modalUpdatableSkills, batchUpdating, handleCloseBatchUpdateModal, handleConfirmBatchUpdate } = useBatchUpdatePrompt({
		visible,
		active
	});
	const handleCancelModifiedUpdate = () => {
		uiService.cancelModifiedUpdate();
	};
	const handleConfirmModifiedUpdate = () => {
		uiService.confirmModifiedUpdate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		showMarketList && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "skill-market",
			children: [
				listView === MarketView.Market && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketTopBar, { headerLeft }),
				listView === MarketView.Installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstalledTopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "skill-market__content",
					ref: scrollRef,
					children: [listView === MarketView.Market && (isSearching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResults, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverSection, {
						templateId,
						showMcpButton,
						onMcpClick
					})), listView === MarketView.Installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstalledSection, { scrollRef })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTopButton, {
					visible: showBackToTop,
					onClick: scrollToTop
				})
			]
		}),
		view === MarketView.SkillDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillDetailModal, {}),
		view === MarketView.PluginDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifiedMarketDetailView, {
			renderDetailBack,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginDetailView, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchUpdateModal, {
			visible: showBatchUpdateModal,
			updatableSkills: modalUpdatableSkills,
			updating: batchUpdating,
			onClose: handleCloseBatchUpdateModal,
			onConfirm: handleConfirmBatchUpdate
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillUpdateConfirmModal, {
			visible: modifiedConfirmVisible,
			onCancel: handleCancelModifiedUpdate,
			onConfirm: handleConfirmModifiedUpdate
		}),
		isDesktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillImportModal, {
			flow: importFlow,
			scanEnabled: scanEnabled ?? true,
			showUploadOverlay
		})
	] });
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_skill_market();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_delayed_visible();
	init_use_market_page_load();
	init_use_named_page_show();
	init_use_scroll_to_top();
	init_useI18n();
	init_environment();
	init_market_perf();
	init_context();
	init_back_to_top_button();
	init_batch_update_modal();
	init_details();
	init_discover_section();
	init_installed_section();
	init_market_status_view();
	init_market_top_bar();
	init_search_results();
	init_skill_detail_modal();
	init_skill_import_modal();
	init_skill_update_confirm_modal();
	init_constants();
	init_market_service_context();
	init_hooks();
	init_types$2();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { SkillsMarket };
