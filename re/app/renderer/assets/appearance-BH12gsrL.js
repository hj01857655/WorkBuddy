import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $$ as AgentTelemetryEvents, Cq as init_telemetry_context, D1 as useI18n, E1 as init_useI18n, L3 as init_account_context, LQ as init_account, O1 as useTranslation, Q as init_app_providers, R3 as useAccount, RQ as isIOAUser, S7 as Loading, b0 as writeRendererLog, cR as useAppearanceFeatureStatus, et as useAgentServices, krt as Button, lR as init_use_appearance_edition, m5 as init_src, sR as init_use_appearance_feature, t1 as init_types, uR as useAppearanceEdition, v4 as APPEARANCE_RUNTIME_CHECK_EVENT, wq as useAgentTelemetry, zZ as init_http_logger } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { A as init_skin, B as useUpgradeAction, D as appearanceThemeApplier, E as writeLocalState, H as init_resource_policy, I as init_browser, N as getSkinManager, O as init_appearance_theme_applier, R as isThemeResource, T as writeLastAppliedTheme, V as getSafeThemeResourceUrl, a as resolveAppearanceRuntime, c as buildSkinApplyPayload, f as init_appearance_cloud_sync, i as normalizeExpireAt, j as getVipLevelResolver, l as init_appearance_skin_apply_telemetry, n as init_appearance_runtime, p as saveCloudThemeSelection, r as mergeBuiltinThemes, v as init_appearance_storage, x as readLocalState, z as init_use_upgrade } from "./appearance-runtime-eV3bJxTA.js";
import { i as pushAppearanceToAuthority, r as pushAppearanceModeToAuthority, t as init_appearance_cross_window_sync } from "./appearance-cross-window-sync-6GAxuwjy.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/appearance.less
var init_appearance$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/theme-cards.tsx
function VipBadge({ vipLevel, t }) {
	if (vipLevel === "free") return null;
	const key = VIP_LEVEL_LABEL_KEY$1[vipLevel];
	if (!key) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
		className: `appearance-badge ${VIP_LEVEL_TAG_CLASS$1[vipLevel]}`,
		children: t(key)
	});
}
/** `YYYY-MM-DD` → `YYYY.MM.DD`；非预期格式原样返回 */
function formatValidityDate(date) {
	return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.replace(/-/g, ".") : date;
}
/** 有效期角标：限时皮肤显示截止日期，无有效期即永久有效 */
function ValidityBadge({ theme, t }) {
	const validTo = theme?.validTo;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
		className: "appearance-badge appearance-badge--validity",
		children: validTo ? t("settings.appearance.validity.until", { date: formatValidityDate(validTo) }) : t("settings.appearance.validity.permanent")
	});
}
/** 效果预览区：大预览图，背景走 CSS 兜底；应用主题期间叠加 loading 遮罩。 */
function PreviewStage({ theme, applying, t }) {
	const previewUrl = theme?.series === "base" ? theme.previewUrl : getSafeThemeResourceUrl(theme?.previewUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "appearance-preview",
		children: [
			previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
				className: "appearance-preview__image",
				src: previewUrl,
				alt: t("settings.appearance.preview")
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "appearance-preview__image appearance-preview__image--empty",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ValidityBadge, {
				theme,
				t
			}),
			applying && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "appearance-preview__loading",
				role: "status",
				"aria-live": "polite",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Loading, { size: "large" })
			})
		]
	});
}
function ThemeCard({ theme, selected, usable, onSelect, showVipBadge, t }) {
	const { locale } = useI18n();
	const name = locale.startsWith("zh") ? theme.nameZh : theme.nameEn;
	const coverUrl = getSafeThemeResourceUrl(theme.coverUrl);
	const isDarkPreview = theme.appearance === "dark";
	const showBadge = showVipBadge && theme.series !== "base";
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "appearance-card-cell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
			type: "button",
			className: `appearance-card appearance-card--${isDarkPreview ? "dark" : "light"}` + (selected ? " appearance-card--selected" : "") + (usable ? "" : " appearance-card--trial"),
			style: coverUrl ? { backgroundImage: `url("${coverUrl}")` } : void 0,
			onClick: () => onSelect(theme),
			"aria-pressed": selected,
			children: showBadge && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(VipBadge, {
				vipLevel: theme.vipLevel,
				t
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
			className: "appearance-card__name",
			children: name
		})]
	});
}
/** 敬请期待占位卡：跟真皮肤卡等宽，不可点、无版本徽章；文案居中放卡内，卡下不再重复 */
function ComingSoonCard({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "appearance-card-cell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "appearance-card appearance-card--coming-soon",
			"aria-disabled": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "appearance-card__coming-soon-text",
				children: t("settings.appearance.comingSoon")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
			className: "appearance-card__name appearance-card__name--placeholder",
			"aria-hidden": "true",
			children: "\xA0"
		})]
	});
}
function ThemeCards({ themes, selectedThemeId, previewThemeId, applying, canUse, onSelect, showVipBadge = true, t }) {
	const previewTheme = themes.find((theme) => theme.resourceKey === previewThemeId) ?? themes[0];
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "appearance-layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(PreviewStage, {
				theme: previewTheme,
				applying,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "appearance-list__header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "appearance-list__title",
					children: t("settings.appearance.allThemes")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "appearance-list",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "appearance-card-grid",
					children: [themes.map((theme) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ThemeCard, {
						theme,
						selected: theme.resourceKey === selectedThemeId,
						usable: canUse(theme),
						onSelect,
						showVipBadge,
						t
					}, theme.resourceKey)), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ComingSoonCard, { t })]
				})
			})
		]
	});
}
var import_jsx_runtime$2, VIP_LEVEL_LABEL_KEY$1, VIP_LEVEL_TAG_CLASS$1;
var init_theme_cards = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_resource_policy();
	import_jsx_runtime$2 = require_jsx_runtime();
	VIP_LEVEL_LABEL_KEY$1 = {
		free: "settings.appearance.vipLevel.free",
		pro: "settings.appearance.vipLevel.pro",
		advanced: "settings.appearance.vipLevel.advanced",
		ultimate: "settings.appearance.vipLevel.ultimate"
	};
	VIP_LEVEL_TAG_CLASS$1 = {
		free: "appearance-badge--free",
		pro: "appearance-badge--pro",
		advanced: "appearance-badge--advanced",
		ultimate: "appearance-badge--ultimate"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/upgrade-guide-bar.less
var init_upgrade_guide_bar$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/upgrade-guide-bar.tsx
function UpgradeGuideBar({ theme, t }) {
	const { openUpgrade } = useUpgradeAction();
	const { locale } = useI18n();
	const themeName = locale.startsWith("zh") ? theme.nameZh : theme.nameEn;
	const levelKey = VIP_LEVEL_LABEL_KEY[theme.vipLevel];
	const levelLabel = levelKey ? t(levelKey) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "appearance-upgrade-bar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "appearance-upgrade-bar__head",
			children: [levelLabel && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: `appearance-badge ${VIP_LEVEL_TAG_CLASS[theme.vipLevel]}`,
				children: levelLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "appearance-upgrade-bar__title",
				children: t("settings.appearance.upgradeGuide.title", { name: themeName })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "appearance-upgrade-bar__actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "appearance-upgrade-bar__desc",
				children: t("settings.appearance.upgradeGuide.desc", { level: levelLabel })
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
				variant: "primary",
				className: "appearance-upgrade-bar__btn",
				onClick: openUpgrade,
				children: t("settings.appearance.upgradeGuide.upgrade")
			})]
		})]
	});
}
var import_jsx_runtime$1, VIP_LEVEL_LABEL_KEY, VIP_LEVEL_TAG_CLASS;
var init_upgrade_guide_bar = __esmMin((() => {
	init_upgrade_guide_bar$1();
	init_src();
	require_react();
	init_useI18n();
	init_use_upgrade();
	import_jsx_runtime$1 = require_jsx_runtime();
	VIP_LEVEL_LABEL_KEY = {
		free: "",
		pro: "settings.appearance.upgradeGuide.level.pro",
		advanced: "settings.appearance.upgradeGuide.level.advanced",
		ultimate: "settings.appearance.upgradeGuide.level.ultimate"
	};
	VIP_LEVEL_TAG_CLASS = {
		free: "appearance-badge--free",
		pro: "appearance-badge--pro",
		advanced: "appearance-badge--advanced",
		ultimate: "appearance-badge--ultimate"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/use-appearance.ts
/**
* 本地状态负责首帧恢复，云端选择由 user-asset 接口跨设备同步。
*
* key 按账号维度隔离（eid + uid），避免同设备切账号相互覆盖 #74055。
* 个人用户无 enterpriseId 时用 'personal' 占位。
* 账号未就绪（uid 空）时用 legacy key，读到就迁移一次到目标 key。
*/
function useAppearance() {
	const facade = useAgentServices()?.appearance;
	const featureStatus = useAppearanceFeatureStatus();
	const hasAppearanceFeature = featureStatus === "enabled";
	const { account } = useAccount();
	const { locale } = useI18n();
	const { reportEvent } = useAgentTelemetry();
	const { editionType, expireAt, ready: editionReady, identityKey: accountIdentityKey } = useAppearanceEdition();
	const gatingLoading = featureStatus === "pending" || account != null && !editionReady;
	const uid = account?.uid;
	const eid = account?.enterpriseId;
	const accountType = account?.type;
	const showVipBadge = !isIOAUser(eid?.trim() ?? "");
	const lang = locale.startsWith("zh") ? "zh" : "en";
	const [themes, setThemes] = (0, import_react$1.useState)([]);
	const [catalogReady, setCatalogReady] = (0, import_react$1.useState)(false);
	const [stateIdentityKey, setStateIdentityKey] = (0, import_react$1.useState)(accountIdentityKey);
	const [serverState, setServerState] = (0, import_react$1.useState)(null);
	const [selectedThemeId, setSelectedThemeId] = (0, import_react$1.useState)("");
	const [previewThemeId, setPreviewThemeId] = (0, import_react$1.useState)("");
	const [applying, setApplying] = (0, import_react$1.useState)(false);
	const [trialTheme, setTrialTheme] = (0, import_react$1.useState)(null);
	const [loading, setLoading] = (0, import_react$1.useState)(true);
	const promotionGenerationRef = (0, import_react$1.useRef)(0);
	const promotingThemeRef = (0, import_react$1.useRef)("");
	const currentAccountIdentityRef = (0, import_react$1.useRef)(accountIdentityKey);
	currentAccountIdentityRef.current = accountIdentityKey;
	const [runtimeTick, setRuntimeTick] = (0, import_react$1.useState)(0);
	const [loadError, setLoadError] = (0, import_react$1.useState)(null);
	/** 手动重试计数：递增会重新触发 useEffect 拉资源 */
	const [reloadTick, setReloadTick] = (0, import_react$1.useState)(0);
	/** 本次进入外观页最后选中的皮肤；关闭设置页时复核权限，通过才算"真正使用" */
	const pendingApplyThemeRef = (0, import_react$1.useRef)(null);
	(0, import_react$1.useEffect)(() => {
		const handleRuntimeCheck = () => setRuntimeTick((value) => value + 1);
		window.addEventListener(APPEARANCE_RUNTIME_CHECK_EVENT, handleRuntimeCheck);
		return () => window.removeEventListener(APPEARANCE_RUNTIME_CHECK_EVENT, handleRuntimeCheck);
	}, []);
	const runtimeNow = (0, import_react$1.useMemo)(() => Date.now(), [
		editionType,
		expireAt,
		runtimeTick
	]);
	const canUse = (0, import_react$1.useCallback)((theme) => {
		if (editionType == null) return false;
		const expiresAt = normalizeExpireAt(expireAt);
		const effectiveEditionType = expiresAt != null && expiresAt <= runtimeNow ? "free" : editionType;
		return getVipLevelResolver().canUse(theme, effectiveEditionType);
	}, [
		editionType,
		expireAt,
		runtimeNow
	]);
	const applyThemeById = (0, import_react$1.useCallback)(async (themeId) => {
		const theme = themes.find((item) => item.resourceKey === themeId);
		if (!theme) return false;
		try {
			return await appearanceThemeApplier.apply(theme);
		} catch (error) {
			const zipHost = (() => {
				try {
					return theme.zipUrl ? new URL(theme.zipUrl).hostname : "<no-zip>";
				} catch {
					return "<parse-fail>";
				}
			})();
			writeRendererLog("appearance", "error", `[useAppearance] apply-error theme=${theme.resourceKey} zipHost=${zipHost} error=${String(error?.message ?? error)}`);
			return false;
		}
	}, [themes]);
	const saveTheme = (0, import_react$1.useCallback)((theme, source) => {
		const next = { currentTheme: theme.resourceKey };
		if (facade && uid) saveCloudThemeSelection({
			facade,
			resourceKey: theme.resourceKey,
			eid,
			uid,
			source: `settings-${source}`
		}).catch(() => void 0);
		else writeLocalState(next, eid, uid);
		writeLastAppliedTheme(theme, eid, uid, accountIdentityKey);
		pushAppearanceToAuthority(theme.resourceKey);
		if (!theme.zipUrl && (theme.appearance === "light" || theme.appearance === "dark")) pushAppearanceModeToAuthority(theme.appearance);
		setServerState(next);
		setTrialTheme(null);
		writeRendererLog("appearance", "info", `[useAppearance] theme-save source=${source} theme=${theme.resourceKey} editionType=${String(editionType)} eid=${String(eid)} uid=${String(uid)}`);
	}, [
		accountIdentityKey,
		editionType,
		eid,
		facade,
		uid
	]);
	(0, import_react$1.useEffect)(() => {
		if (featureStatus === "pending") return;
		if (!hasAppearanceFeature) {
			setThemes([]);
			setCatalogReady(false);
			setServerState(null);
			setSelectedThemeId("");
			setPreviewThemeId("");
			setApplying(false);
			setTrialTheme(null);
			setLoading(false);
			return;
		}
		let alive = true;
		setStateIdentityKey(accountIdentityKey);
		setCatalogReady(false);
		setThemes(mergeBuiltinThemes([]));
		setServerState(readLocalState(eid, uid));
		setSelectedThemeId("");
		setPreviewThemeId("");
		setApplying(false);
		setTrialTheme(null);
		setLoading(Boolean(facade));
		setLoadError(null);
		if (facade) {
			writeRendererLog("appearance", "info", `[useAppearance] resources-load-start account=${accountIdentityKey || "<empty>"} lang=${lang}`);
			facade.listResources({ lang }).then((list) => {
				if (!alive) return;
				const themeList = list.filter(isThemeResource);
				setThemes(mergeBuiltinThemes(themeList));
				setCatalogReady(true);
				writeRendererLog("appearance", "info", `[useAppearance] resources-load-resolved count=${themeList.length}`);
			}).catch((error) => {
				if (!alive) return;
				console.warn("[AppearanceDomain] load appearance failed:", String(error));
				setLoadError(String(error));
				writeRendererLog("appearance", "warn", `[useAppearance] resources-load-failed error=${String(error)}`);
			}).finally(() => {
				if (!alive) return;
				setLoading(false);
				writeRendererLog("appearance", "info", "[useAppearance] resources-load-settled loading=false");
			});
		}
		return () => {
			alive = false;
		};
	}, [
		accountIdentityKey,
		accountType,
		facade,
		hasAppearanceFeature,
		lang,
		reloadTick,
		eid,
		uid
	]);
	const reload = (0, import_react$1.useCallback)(() => setReloadTick((v) => v + 1), []);
	(0, import_react$1.useEffect)(() => {
		if (!serverState) return;
		setSelectedThemeId((prev) => prev || serverState.currentTheme);
		setPreviewThemeId((prev) => prev || serverState.currentTheme);
	}, [serverState]);
	(0, import_react$1.useEffect)(() => {
		const generation = ++promotionGenerationRef.current;
		let active = true;
		const isCurrentPromotion = () => active && promotionGenerationRef.current === generation && currentAccountIdentityRef.current === accountIdentityKey;
		if (stateIdentityKey !== accountIdentityKey || themes.length === 0) return () => {
			active = false;
		};
		if (trialTheme) {
			if (!canUse(trialTheme) || promotingThemeRef.current === trialTheme.resourceKey) return () => {
				active = false;
			};
			if (getSkinManager().getCurrentThemeId() === trialTheme.resourceKey) {
				setSelectedThemeId(trialTheme.resourceKey);
				setPreviewThemeId(trialTheme.resourceKey);
				saveTheme(trialTheme, "upgrade");
				return () => {
					active = false;
				};
			}
			promotingThemeRef.current = trialTheme.resourceKey;
			setApplying(true);
			writeRendererLog("appearance", "info", `[useAppearance] trial-promote-start theme=${trialTheme.resourceKey} editionType=${String(editionType)}`);
			applyThemeById(trialTheme.resourceKey).then((applied) => {
				writeRendererLog("appearance", applied ? "info" : "warn", `[useAppearance] trial-promote-result theme=${trialTheme.resourceKey} applied=${applied}`);
				if (!applied || !isCurrentPromotion()) {
					if (applied) writeRendererLog("appearance", "warn", `[useAppearance] trial-promote-stale theme=${trialTheme.resourceKey}`);
					return;
				}
				setSelectedThemeId(trialTheme.resourceKey);
				setPreviewThemeId(trialTheme.resourceKey);
				saveTheme(trialTheme, "upgrade");
			}).catch((error) => {
				writeRendererLog("appearance", "error", `[useAppearance] trial-promote-failed theme=${trialTheme.resourceKey} error=${String(error)}`);
			}).finally(() => {
				if (!isCurrentPromotion()) return;
				promotingThemeRef.current = "";
				setApplying(false);
			});
			return () => {
				active = false;
				if (promotingThemeRef.current === trialTheme.resourceKey) promotingThemeRef.current = "";
			};
		}
		if (serverState && (catalogReady || !facade)) {
			const result = resolveAppearanceRuntime(serverState, themes, editionType, expireAt, runtimeNow);
			if (result) {
				const currentThemeId = getSkinManager().getCurrentThemeId();
				setSelectedThemeId(result.targetThemeId);
				if (currentThemeId === result.targetThemeId) setPreviewThemeId(result.targetThemeId);
				else {
					setApplying(true);
					writeRendererLog("appearance", "info", `[useAppearance] runtime-sync-start from=${currentThemeId ?? "<none>"} to=${result.targetThemeId} requested=${result.requestedThemeId} expired=${result.themeExpired}`);
					applyThemeById(result.targetThemeId).then((applied) => {
						const current = isCurrentPromotion();
						writeRendererLog("appearance", applied ? "info" : "warn", `[useAppearance] runtime-sync-result target=${result.targetThemeId} applied=${applied} current=${current}`);
						if (!current) return;
						if (applied) {
							setPreviewThemeId(result.targetThemeId);
							const appliedTheme = themes.find((theme) => theme.resourceKey === result.targetThemeId);
							if (appliedTheme) writeLastAppliedTheme(appliedTheme, eid, uid, accountIdentityKey);
						} else {
							const actualThemeId = getSkinManager().getCurrentThemeId() ?? result.requestedThemeId;
							setSelectedThemeId(actualThemeId);
							setPreviewThemeId(actualThemeId);
						}
					}).catch((error) => {
						writeRendererLog("appearance", "error", `[useAppearance] runtime-sync-failed target=${result.targetThemeId} error=${String(error)}`);
					}).finally(() => {
						if (isCurrentPromotion()) setApplying(false);
					});
				}
			}
		}
		return () => {
			active = false;
		};
	}, [
		accountIdentityKey,
		applyThemeById,
		canUse,
		catalogReady,
		editionType,
		expireAt,
		facade,
		runtimeNow,
		saveTheme,
		serverState,
		stateIdentityKey,
		themes,
		trialTheme
	]);
	const selectTheme = (0, import_react$1.useCallback)(async (theme) => {
		if (!hasAppearanceFeature) return;
		const usable = canUse(theme);
		setSelectedThemeId(theme.resourceKey);
		setApplying(true);
		if (!usable) {
			setTrialTheme(theme);
			writeRendererLog("appearance", "info", `[useAppearance] select-trial theme=${theme.resourceKey}`);
		}
		let applied = false;
		try {
			applied = await applyThemeById(theme.resourceKey);
		} finally {
			setApplying(false);
		}
		if (!applied) {
			writeRendererLog("appearance", "warn", `[useAppearance] select-apply-failed theme=${theme.resourceKey}`);
			return;
		}
		setPreviewThemeId(theme.resourceKey);
		pendingApplyThemeRef.current = theme;
		if (usable) saveTheme(theme, "select");
	}, [
		applyThemeById,
		canUse,
		hasAppearanceFeature,
		saveTheme
	]);
	const revertToSaved = (0, import_react$1.useCallback)(async () => {
		const state = serverState ?? (() => {
			const defaultTheme = themes.find((item) => item.vipLevel === "free");
			return defaultTheme ? { currentTheme: defaultTheme.resourceKey } : null;
		})();
		if (!state) return;
		const result = resolveAppearanceRuntime(state, themes, editionType, expireAt);
		if (!result) return;
		setSelectedThemeId(result.targetThemeId);
		setApplying(true);
		let applied = false;
		try {
			applied = await applyThemeById(result.targetThemeId);
		} finally {
			setApplying(false);
		}
		if (!applied) return;
		setPreviewThemeId(result.targetThemeId);
		setTrialTheme(null);
		writeRendererLog("appearance", "info", `[useAppearance] revert-to-saved theme=${result.targetThemeId}`);
	}, [
		serverState,
		themes,
		editionType,
		expireAt,
		applyThemeById
	]);
	const trialRef = (0, import_react$1.useRef)(trialTheme);
	trialRef.current = trialTheme;
	const revertRef = (0, import_react$1.useRef)(revertToSaved);
	revertRef.current = revertToSaved;
	const canUseRef = (0, import_react$1.useRef)(canUse);
	canUseRef.current = canUse;
	const editionTypeRef = (0, import_react$1.useRef)(editionType);
	editionTypeRef.current = editionType;
	const reportEventRef = (0, import_react$1.useRef)(reportEvent);
	reportEventRef.current = reportEvent;
	/** 置空 pending 保证同一次选择只上报一次（unmount 与卸载事件抢先者生效）。 */
	const flushSkinApplyReport = (0, import_react$1.useCallback)(() => {
		const pending = pendingApplyThemeRef.current;
		pendingApplyThemeRef.current = null;
		if (!pending || !canUseRef.current(pending)) return;
		reportEventRef.current(AgentTelemetryEvents.AppearanceSkinApply, buildSkinApplyPayload({
			action: "apply",
			source: "settings_close",
			theme: pending,
			editionType: editionTypeRef.current
		}));
		writeRendererLog("appearance", "info", `[useAppearance] skin-apply-report action=apply theme=${pending.resourceKey} editionType=${String(editionTypeRef.current)}`);
	}, []);
	(0, import_react$1.useEffect)(() => {
		window.addEventListener("beforeunload", flushSkinApplyReport);
		window.addEventListener("pagehide", flushSkinApplyReport);
		return () => {
			window.removeEventListener("beforeunload", flushSkinApplyReport);
			window.removeEventListener("pagehide", flushSkinApplyReport);
			if (trialRef.current) revertRef.current();
			flushSkinApplyReport();
		};
	}, [flushSkinApplyReport]);
	return (0, import_react$1.useMemo)(() => ({
		loading: loading || gatingLoading,
		themes,
		selectedThemeId,
		previewThemeId,
		applying,
		canUse,
		showVipBadge,
		selectTheme,
		revertToSaved,
		trialTheme,
		loadError,
		reload
	}), [
		loading,
		gatingLoading,
		themes,
		selectedThemeId,
		previewThemeId,
		applying,
		canUse,
		showVipBadge,
		selectTheme,
		revertToSaved,
		trialTheme,
		loadError,
		reload
	]);
}
var import_react$1;
var init_use_appearance = __esmMin((() => {
	init_browser();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_account_context();
	init_useI18n();
	init_app_providers();
	init_telemetry_context();
	init_types();
	init_account();
	init_http_logger();
	init_skin();
	init_appearance_theme_applier();
	init_appearance_cloud_sync();
	init_appearance_cross_window_sync();
	init_appearance_skin_apply_telemetry();
	init_use_appearance_edition();
	init_use_appearance_feature();
	init_appearance_runtime();
	init_appearance_storage();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/appearance/index.tsx
function AppearanceSettingsPanel() {
	const t = useTranslation();
	const { loading, themes, selectedThemeId, previewThemeId, applying, canUse, showVipBadge, selectTheme, trialTheme, loadError, reload } = useAppearance();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "appearance-panel appearance-panel--loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {
			size: "large",
			tip: t("common.loading")
		})
	});
	if (themes.length === 0) {
		if (loadError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "appearance-panel appearance-panel--empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.appearance.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: reload,
				children: t("settings.appearance.retry")
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "appearance-panel appearance-panel--empty",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.appearance.unavailable") })
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "appearance-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "appearance-panel__body",
			children: [loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "appearance-panel__load-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.appearance.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "small",
					onClick: reload,
					children: t("settings.appearance.retry")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCards, {
				themes,
				selectedThemeId,
				previewThemeId,
				applying,
				canUse,
				onSelect: selectTheme,
				showVipBadge,
				t
			})]
		}), trialTheme && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeGuideBar, {
			theme: trialTheme,
			t
		})]
	});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_appearance$1();
	init_src();
	require_react();
	init_useI18n();
	init_theme_cards();
	init_upgrade_guide_bar();
	init_use_appearance();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { AppearanceSettingsPanel, AppearanceSettingsPanel as default };
