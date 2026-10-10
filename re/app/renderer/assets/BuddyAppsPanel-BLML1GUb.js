import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, I5 as Tabs, O1 as useTranslation, Q as init_app_providers, S7 as Loading, T0 as init_app_core, V3 as useAdapter, V5 as message, c7 as Modal, cq as init_fetch_templates, et as useAgentServices, f3 as wb, krt as Button, lq as unwrapIndustryApiEnvelope, m5 as init_src, sz as init_SettingsContext, uz as useSettingsNavigate } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as switchAwayFromDisconnectedApp, t as init_switch_away_from_disconnected_app } from "./switch-away-from-disconnected-app-nibTA6gc.js";
import { n as jumpFromSettings, t as init_settings_jump } from "./settings-jump-Bdc4o1P2.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/BuddyAppsPanel.less
var init_BuddyAppsPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/buddy-apps-cleanup-registry.ts
function registerBuddyAppCleanup(applicationType, fn) {
	const key = applicationType.trim();
	if (!key) return;
	registry.set(key, fn);
}
async function runBuddyAppCleanup(applicationType, applicationId, context) {
	const fn = registry.get(applicationType?.trim() ?? "");
	if (!fn) return [];
	return fn(applicationId, context);
}
var registry;
var init_buddy_apps_cleanup_registry = __esmMin((() => {
	registry = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/buddy-apps-fetch.ts
/** 解析全局 wb.http；未就绪或缺少 post 时返回 null。 */
function getBuddyAppsFetchHttp() {
	const http = globalThis.wb?.http;
	if (typeof http?.post !== "function") return null;
	return { post: http.post.bind(http) };
}
function nextAuthorizedAppsCursor(cursor, fetchedCount) {
	return cursor + fetchedCount;
}
function hasMoreAuthorizedApps(cursor, total) {
	return cursor < total;
}
function nextAuthorizedAppsPage(cursor, pageSize) {
	return Math.floor(cursor / pageSize) + 1;
}
/**
* 后续页成功但 0 条：服务端已无更多数据（即使 total 仍偏大）。
* 将 total 钳到 cursor，使 hasMore 为 false，避免 IntersectionObserver 空转。
*/
function resolveAuthorizedAppsTotal(options) {
	if (!options.replace && options.fetchedCount === 0) return options.cursor;
	return options.reportedTotal;
}
/**
* 从 authorize/applications 响应取出 `{ applications, total, page, page_size }`。
* 兼容：直出 body / axios `{ data }` / industry `{ code, data }`。
*/
function extractAuthorizedAppsBody(resp) {
	if (!resp || typeof resp !== "object") return {};
	const asRecord = resp;
	if (Array.isArray(asRecord.applications)) return asRecord;
	const nestedData = asRecord.data;
	if (nestedData && typeof nestedData === "object") {
		const nested = nestedData;
		if (Array.isArray(nested.applications)) return nested;
		if (nested.data && typeof nested.data === "object" && Array.isArray(nested.data.applications)) return nested.data;
	}
	return unwrapIndustryApiEnvelope(resp);
}
function mapAuthorizedApplication(raw) {
	if (!raw || typeof raw !== "object") return null;
	const item = raw;
	const id = typeof item.application_id === "string" ? item.application_id.trim() : "";
	if (!id) return null;
	const mapped = {
		id,
		name: typeof item.application_name === "string" && item.application_name.trim() ? item.application_name.trim() : id
	};
	if (typeof item.icon_url === "string" && item.icon_url.trim()) mapped.icon = item.icon_url.trim();
	if (typeof item.description === "string" && item.description.trim()) mapped.description = item.description.trim();
	if (typeof item.application_type === "string" && item.application_type.trim()) mapped.applicationType = item.application_type.trim();
	if (typeof item.last_used_at === "string" && item.last_used_at.trim()) mapped.lastUsedAt = item.last_used_at.trim();
	return mapped;
}
async function fetchAuthorizedAppsPage(http, page, pageSize = 20, applicationType) {
	const requestBody = {
		page,
		page_size: pageSize
	};
	if (applicationType) requestBody.application_type = applicationType;
	const body = extractAuthorizedAppsBody(await http.post(AUTHORIZED_APPS_PATH, requestBody));
	return {
		applications: Array.isArray(body.applications) ? body.applications.map(mapAuthorizedApplication).filter((item) => item !== null) : [],
		total: typeof body.total === "number" ? body.total : 0,
		page: typeof body.page === "number" ? body.page : page,
		pageSize: typeof body.page_size === "number" ? body.page_size : pageSize
	};
}
var AUTHORIZED_APPS_PATH;
var init_buddy_apps_fetch = __esmMin((() => {
	init_fetch_templates();
	AUTHORIZED_APPS_PATH = "/workbuddyopen/v1/authorize/applications";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/buddy-apps-revoke.ts
/** 解析全局 wb.http；未就绪时返回 null（测试 / 非宿主环境）。 */
function getBuddyAppsHttp() {
	const http = globalThis.wb?.http;
	if (!http?.delete) return null;
	return http;
}
/**
* 撤销用户对指定应用的授权关系。
* @param applicationId op_application.application_id / op_user_authorize_record.application_id
*/
async function revokeBuddyAppAuthorization(applicationId, http) {
	const client = http ?? getBuddyAppsHttp();
	if (!client) throw new Error("WorkbuddySDK http is not available");
	const id = applicationId.trim();
	if (!id) throw new Error("application_id is required");
	await client.delete(`${BUDDY_APP_REVOKE_PATH_PREFIX}/${encodeURIComponent(id)}`);
}
var BUDDY_APP_REVOKE_PATH_PREFIX;
var init_buddy_apps_revoke = __esmMin((() => {
	BUDDY_APP_REVOKE_PATH_PREFIX = "/openapi/v2/authorizations";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/AuthorizedAppsList.tsx
function toErrorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
/** 将后端 `last_used_at`（RFC3339）格式化为 `YYYY-MM-DD HH:mm:ss` 本地时区串；解析失败返回 undefined（不展示）。 */
function formatLastUsedAt(iso) {
	if (!iso) return;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return;
	const pad = (n) => String(n).padStart(2, "0");
	return [
		date.getFullYear(),
		pad(date.getMonth() + 1),
		pad(date.getDate())
	].join("-") + " " + [
		pad(date.getHours()),
		pad(date.getMinutes()),
		pad(date.getSeconds())
	].join(":");
}
/** 按 id 去重，保留首次出现的顺序；用于防止后端返回重复记录导致 React key 冲突。 */
function dedupeApplicationsById(apps) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const app of apps) {
		if (seen.has(app.id)) continue;
		seen.add(app.id);
		result.push(app);
	}
	return result;
}
async function runLocalStep(step) {
	try {
		await step();
		return;
	} catch (error) {
		return toErrorMessage(error);
	}
}
async function cleanupLocalBuddyResources(applicationId, removeBuddySkills) {
	return [await runLocalStep(async () => {
		const result = await wb.buddyApps.removeMcpDependency(applicationId);
		if (!result.ok) throw new Error(result.message);
	}), await runLocalStep(async () => {
		const result = await removeBuddySkills?.({ applicationId });
		if (result && result.success === false) throw new Error("remove buddy skills failed");
	})].filter((item) => Boolean(item));
}
function AuthorizedAppsList({ applicationType, showGuide }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { navigateMain } = useSettingsNavigate();
	const personalSkills = useAgentServices()?.personalSkills;
	const isLocalMode = adapter?.environmentType === "local";
	const isThirdParty = applicationType === "app";
	const [apps, setApps] = (0, import_react$1.useState)([]);
	const [loadState, setLoadState] = (0, import_react$1.useState)("loading");
	const [cursor, setCursor] = (0, import_react$1.useState)(0);
	const [total, setTotal] = (0, import_react$1.useState)(0);
	const [laterPageError, setLaterPageError] = (0, import_react$1.useState)(false);
	const [isLoadingMore, setIsLoadingMore] = (0, import_react$1.useState)(false);
	const inFlightRef = (0, import_react$1.useRef)(false);
	const cursorRef = (0, import_react$1.useRef)(0);
	const totalRef = (0, import_react$1.useRef)(0);
	const laterPageErrorRef = (0, import_react$1.useRef)(false);
	const listRef = (0, import_react$1.useRef)(null);
	const sentinelRef = (0, import_react$1.useRef)(null);
	const loadPage = (0, import_react$1.useCallback)(async (nextPage, replace) => {
		if (inFlightRef.current) return;
		inFlightRef.current = true;
		if (replace) {
			setLoadState("loading");
			setLaterPageError(false);
			laterPageErrorRef.current = false;
		} else {
			setLaterPageError(false);
			laterPageErrorRef.current = false;
			setIsLoadingMore(true);
		}
		try {
			const http = getBuddyAppsFetchHttp();
			if (!http) throw new Error("WorkbuddySDK http is not available");
			const result = await fetchAuthorizedAppsPage(http, nextPage, 20, applicationType);
			const dedupedPage = dedupeApplicationsById(result.applications);
			setApps((prev) => {
				if (replace) return dedupedPage;
				const seenIds = new Set(prev.map((item) => item.id));
				const deduped = dedupedPage.filter((item) => !seenIds.has(item.id));
				return [...prev, ...deduped];
			});
			const nextCursor = replace ? nextAuthorizedAppsCursor(0, result.applications.length) : nextAuthorizedAppsCursor(cursorRef.current, result.applications.length);
			cursorRef.current = nextCursor;
			setCursor(nextCursor);
			const nextTotal = resolveAuthorizedAppsTotal({
				replace,
				fetchedCount: result.applications.length,
				cursor: nextCursor,
				reportedTotal: result.total
			});
			totalRef.current = nextTotal;
			setTotal(nextTotal);
			setLoadState("ready");
		} catch {
			if (replace) {
				setApps([]);
				cursorRef.current = 0;
				setCursor(0);
				totalRef.current = 0;
				setTotal(0);
				setLoadState("error");
			} else {
				laterPageErrorRef.current = true;
				setLaterPageError(true);
			}
		} finally {
			inFlightRef.current = false;
			setIsLoadingMore(false);
		}
	}, [applicationType]);
	(0, import_react$1.useEffect)(() => {
		loadPage(1, true).catch(() => void 0);
	}, [loadPage]);
	(0, import_react$1.useEffect)(() => {
		const node = sentinelRef.current;
		const root = listRef.current;
		if (!node || !root || !root.contains(node) || loadState !== "ready" || apps.length === 0) return;
		const observer = new IntersectionObserver((entries) => {
			if (!entries.some((entry) => entry.isIntersecting)) return;
			if (laterPageErrorRef.current) return;
			if (!hasMoreAuthorizedApps(cursorRef.current, totalRef.current)) return;
			loadPage(nextAuthorizedAppsPage(cursorRef.current, 20), false).catch(() => void 0);
		}, {
			root,
			rootMargin: `0px 0px 104px 0px`,
			threshold: 0
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, [
		apps.length,
		cursor,
		loadPage,
		loadState,
		laterPageError,
		total
	]);
	const openGuide = (0, import_react$1.useCallback)((event) => {
		event.preventDefault();
		if (isLocalMode) {
			adapter?.emit("open-external", BUDDY_APPS_GUIDE_URL);
			return;
		}
		window.open(BUDDY_APPS_GUIDE_URL, "_blank", "noopener,noreferrer");
	}, [adapter, isLocalMode]);
	const handleDisconnect = (0, import_react$1.useCallback)((app) => {
		Modal.confirm({
			title: t("settings.buddyApps.confirmDisconnect", { name: app.name }),
			content: t("settings.buddyApps.confirmDisconnectContent"),
			okText: t("settings.buddyApps.confirmDisconnectAction"),
			okType: "danger",
			cancelText: t("common.cancel"),
			onOk: async () => {
				try {
					await revokeBuddyAppAuthorization(app.id);
				} catch (error) {
					message.error(t("settings.buddyApps.disconnectError", { error: toErrorMessage(error) }));
					return false;
				}
				const localErrors = isLocalMode ? await runBuddyAppCleanup(app.applicationType ?? applicationType, app.id, { removeBuddySkills: personalSkills?.removeBuddySkills }) : [];
				for (const detail of localErrors) message.error(t("settings.buddyApps.disconnectError", { error: detail }));
				switchAwayFromDisconnectedApp(app.id);
				jumpFromSettings({
					navigateMain,
					route: "exit-buddy-app",
					payload: { applicationId: app.id },
					fallback: () => void 0
				});
				await loadPage(1, true);
				if (localErrors.length === 0) message.success(t("settings.buddyApps.disconnectSuccess"));
			}
		});
	}, [
		applicationType,
		isLocalMode,
		loadPage,
		navigateMain,
		personalSkills,
		t
	]);
	const retryFirstPage = (0, import_react$1.useCallback)(() => {
		cursorRef.current = 0;
		setCursor(0);
		totalRef.current = 0;
		setTotal(0);
		loadPage(1, true).catch(() => void 0);
	}, [loadPage]);
	const retryLaterPage = (0, import_react$1.useCallback)(() => {
		loadPage(nextAuthorizedAppsPage(cursorRef.current, 20), false).catch(() => void 0);
	}, [loadPage]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "buddy-apps-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
				className: "buddy-apps-panel__description",
				children: [
					t(isThirdParty ? "settings.buddyApps.thirdPartyDescription" : "settings.buddyApps.description"),
					" ",
					showGuide && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
						className: "buddy-apps-panel__guide-link",
						href: "https://www.workbuddy.cn/space/d/XUVU6uYVDGgMtcNhy5GbIl",
						onClick: openGuide,
						children: t("settings.buddyApps.guideLink")
					})
				]
			}),
			loadState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "buddy-apps-panel__state buddy-apps-panel__state--loading",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Loading, {})
			}),
			loadState === "error" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "buddy-apps-panel__state",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("settings.buddyApps.loadError") }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					variant: "secondary",
					size: "small",
					onClick: retryFirstPage,
					children: t("settings.buddyApps.retry")
				})]
			}),
			loadState === "ready" && apps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "buddy-apps-panel__state buddy-apps-panel__state--empty",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t(isThirdParty ? "settings.buddyApps.thirdPartyEmpty" : "settings.buddyApps.empty") })
			}),
			loadState === "ready" && apps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("ul", {
				ref: listRef,
				className: "buddy-apps-panel__list",
				children: [apps.map((app) => {
					const lastUsedAt = formatLastUsedAt(app.lastUsedAt);
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("li", {
						className: "buddy-apps-panel__card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "buddy-apps-panel__card-icon",
								"aria-hidden": "true",
								children: app.icon ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
									src: app.icon,
									alt: "",
									draggable: false
								}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "buddy-apps-panel__card-icon-fallback" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "buddy-apps-panel__card-info",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
										className: "buddy-apps-panel__card-name-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: "buddy-apps-panel__card-name",
											children: app.name
										}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: "buddy-apps-panel__card-tag",
											children: t("settings.buddyApps.authorizedBadge")
										})]
									}),
									app.description && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
										className: "buddy-apps-panel__card-desc",
										children: app.description
									}),
									lastUsedAt && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
										className: "buddy-apps-panel__card-time",
										children: lastUsedAt
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								className: "buddy-apps-panel__card-disconnect",
								variant: "secondary",
								size: "medium",
								danger: true,
								onClick: (event) => {
									event.stopPropagation();
									handleDisconnect(app);
								},
								children: t("settings.buddyApps.disconnect")
							})
						]
					}, app.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("li", {
					ref: sentinelRef,
					className: "buddy-apps-panel__sentinel",
					children: laterPageError ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
						variant: "secondary",
						size: "small",
						onClick: retryLaterPage,
						children: t("settings.buddyApps.retry")
					}) : isLoadingMore ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
						className: "buddy-apps-panel__sentinel-loading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Loading, { size: "small" }), t("common.loading")]
					}) : null
				})]
			})
		]
	});
}
var import_react$1, import_jsx_runtime$1, BUDDY_APPS_GUIDE_URL;
var init_AuthorizedAppsList = __esmMin((() => {
	init_BuddyAppsPanel$1();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_contexts();
	init_useI18n();
	init_switch_away_from_disconnected_app();
	init_app_providers();
	init_SettingsContext();
	init_settings_jump();
	init_buddy_apps_cleanup_registry();
	init_buddy_apps_fetch();
	init_buddy_apps_revoke();
	import_jsx_runtime$1 = require_jsx_runtime();
	BUDDY_APPS_GUIDE_URL = "https://www.workbuddy.cn/space/d/XUVU6uYVDGgMtcNhy5GbIl";
	registerBuddyAppCleanup("buddy_app", async (applicationId, context) => cleanupLocalBuddyResources(applicationId, context?.removeBuddySkills));
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/BuddyAppsPanel.tsx
function BuddyAppsPanel() {
	const t = useTranslation();
	const [activeTab, setActiveTab] = (0, import_react.useState)("buddyApps");
	const tabItems = (0, import_react.useMemo)(() => [{
		key: "buddyApps",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "cb-font-size-fixed",
			children: t("settings.buddyApps.buddyTab")
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorizedAppsList, {
			applicationType: "buddy_app",
			showGuide: true
		})
	}, {
		key: "thirdParty",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "cb-font-size-fixed",
			children: t("settings.buddyApps.thirdPartyTab")
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorizedAppsList, { applicationType: "app" })
	}], [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "buddy-apps-panel-tabs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "buddy-apps-panel-tabs__tabs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				className: "buddy-apps-panel-tabs__inner",
				type: "button",
				size: "m",
				items: tabItems,
				activeKey: activeTab,
				onChange: setActiveTab
			})
		})
	});
}
var import_react, import_jsx_runtime;
var init_BuddyAppsPanel = __esmMin((() => {
	init_BuddyAppsPanel$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_AuthorizedAppsList();
	import_jsx_runtime = require_jsx_runtime();
	init_switch_away_from_disconnected_app();
}));
//#endregion
init_switch_away_from_disconnected_app();
init_BuddyAppsPanel();
export { BuddyAppsPanel, switchAwayFromDisconnectedApp };
