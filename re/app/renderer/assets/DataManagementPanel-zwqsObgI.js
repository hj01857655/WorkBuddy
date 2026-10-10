import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { AD as openLibraryTarget, Aw as init_use_genie_agent_enabled, Dtt as MoreDotsIcon, E as init_contexts, E1 as init_useI18n, E9 as WbUnpublishIcon, F6 as init_src$1, FK as init_conversations, H2 as getShareBaseUrl, H9 as WbJumpIcon, I5 as Tabs, K2 as init_environment, K3 as init_conversations_context, Mv as init_plan_upgrade, O1 as useTranslation, P8 as WbAppArtifactIcon, PX as useArchivedTasksFeature, Pv as openPlanUpgrade, Q3 as useOptionalConversations, QL as useSettingsHeaderOverride, SQ as init_use_is_enterprise_admin, T0 as init_app_core, T1 as init_clipboard, U2 as getSharePlatformId, Uet as ShareUnlinkIcon, Utt as LibraryIcon, V3 as useAdapter, VR as init_services, ZL as init_SettingsHeaderOverrideContext, a4 as getCurrentWebBasename, c2 as WB_CONVERSATION_DELETED, c3 as getWb, cZ as useShareFeature, dnt as DownloadTrayIcon, f3 as wb, g2 as isConversationDeleteCancelled, gT as init_constants, go as createCloudServiceApiClient, hT as ARCHIVED_LIST_UNPAGED_SIZE, i7 as Tooltip, iet as UploadCloudIcon, j1 as init_i18n, jY as init_product_features, jw as useGenieAgentEnabled, k1 as getLocale, kD as init_library_target, krt as Button, lz as useSettings, m5 as init_src, n7 as Dropdown, o4 as init_basename, oet as UnarchiveIcon, pnt as DeleteIcon, q2 as isAgentsWeb, qet as ShareCopyIcon, s2 as WB_CONVERSATION_ARCHIVED, sZ as usePublishedAppsFeature, sz as init_SettingsContext, tt as useAppProviders, u2 as WB_CONVERSATION_UNARCHIVED, u3 as isAppCoreReady, uz as useSettingsNavigate, w1 as copyToClipboard, w3 as useNavigate, wQ as useIsEnterpriseEdition, y3 as init_dist, ynt as CloudDatabaseIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, ji as ConfirmDialog, t as init_src$2 } from "./lib-chat-ui-D8Ji0f8n.js";
import { c as probeAppApiCall, d as init_use_sites_page_show, f as useSitesPageShow, i as createStorageApiClient, n as CloudServiceManager, o as init_app_api_probe, t as init_cloud_service } from "./cloud-service-BFhTyraS.js";
import { n as jumpFromSettings, t as init_settings_jump } from "./settings-jump-Bdc4o1P2.js";
import { n as init_miniprogram_qrcode_preview, t as QrcodePreview } from "./miniprogram-qrcode-preview-DsOZkxcK.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/DataManagementPanel.less
var init_DataManagementPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ArchivedTasksList.tsx
function toArchivedTask(conversation) {
	return {
		id: conversation.id,
		title: conversation.title,
		timestamp: new Date(conversation.lastActivityAt),
		transport: conversation.transport
	};
}
/** Archived Tasks List 内容组件（Tab 内嵌，无 back-header） */
function ArchivedTasksList() {
	const t = useTranslation();
	const refreshConversationList = useOptionalConversations()?.refreshConversationList;
	const [archivedTasks, setArchivedTasks] = (0, import_react$14.useState)([]);
	const [loading, setLoading] = (0, import_react$14.useState)(true);
	const [unarchivingIds, setUnarchivingIds] = (0, import_react$14.useState)(/* @__PURE__ */ new Set());
	const [deletingIds, setDeletingIds] = (0, import_react$14.useState)(/* @__PURE__ */ new Set());
	const [deleteDialogVisible, setDeleteDialogVisible] = (0, import_react$14.useState)(false);
	const [pendingDeleteTask, setPendingDeleteTask] = (0, import_react$14.useState)(null);
	const [deleteLoading, setDeleteLoading] = (0, import_react$14.useState)(false);
	const loadArchivedTasks = (0, import_react$14.useCallback)(async (silent = false) => {
		if (!silent) setLoading(true);
		try {
			const [localResult, genieTasks, cloudTasks] = await Promise.all([
				wb.conversations.local.list({
					view: "archived",
					size: ARCHIVED_LIST_UNPAGED_SIZE
				}),
				wb.conversations.genie.list({
					view: "archived",
					size: ARCHIVED_LIST_UNPAGED_SIZE
				}).then((result) => result.items.map(toArchivedTask)).catch((error) => {
					console.error("Failed to load archived Genie tasks:", error);
					return [];
				}),
				wb.conversations.cloud.list({
					view: "archived",
					size: ARCHIVED_LIST_UNPAGED_SIZE
				}).then((result) => result.items.map(toArchivedTask)).catch((error) => {
					console.error("Failed to load archived cloud tasks:", error);
					return [];
				})
			]);
			const localTasks = localResult.items.map(toArchivedTask);
			const seenIds = new Set(localTasks.map((task) => task.id));
			const merged = [...localTasks];
			for (const task of [...genieTasks, ...cloudTasks]) {
				if (seenIds.has(task.id)) continue;
				seenIds.add(task.id);
				merged.push(task);
			}
			setArchivedTasks(merged);
		} catch (error) {
			console.error("Failed to load archived tasks:", error);
			if (!silent) toast.error(t("archive.toast.failed"));
		} finally {
			if (!silent) setLoading(false);
		}
	}, [t]);
	(0, import_react$14.useEffect)(() => {
		loadArchivedTasks();
	}, [loadArchivedTasks]);
	(0, import_react$14.useEffect)(() => {
		const handleArchivedTaskChanged = () => {
			loadArchivedTasks(true);
		};
		window.addEventListener("archived-task-changed", handleArchivedTaskChanged);
		return () => {
			window.removeEventListener("archived-task-changed", handleArchivedTaskChanged);
		};
	}, [loadArchivedTasks]);
	(0, import_react$14.useEffect)(() => {
		if (!isAppCoreReady()) return;
		const wbApi = getWb();
		const reload = () => {
			loadArchivedTasks(true).catch(() => void 0);
		};
		const unsubscribers = [
			wbApi.on(WB_CONVERSATION_ARCHIVED, reload),
			wbApi.on(WB_CONVERSATION_UNARCHIVED, reload),
			wbApi.on(WB_CONVERSATION_DELETED, reload)
		];
		return () => {
			for (const unsubscribe of unsubscribers) unsubscribe();
		};
	}, [loadArchivedTasks]);
	const finishUnarchive = (0, import_react$14.useCallback)((task) => {
		setArchivedTasks((prev) => prev.filter((item) => item.id !== task.id));
		toast.success(t("archive.unarchive.success"));
		refreshConversationList?.(true);
	}, [refreshConversationList, t]);
	const handleUnarchive = (0, import_react$14.useCallback)(async (task) => {
		if (unarchivingIds.has(task.id)) return;
		setUnarchivingIds((prev) => new Set(prev).add(task.id));
		try {
			await wb.conversations.unarchive(task.id, task.transport);
			finishUnarchive(task);
		} catch (error) {
			console.error("Failed to unarchive task:", error);
			toast.error(t("archive.unarchive.failed"));
		} finally {
			setUnarchivingIds((prev) => {
				const next = new Set(prev);
				next.delete(task.id);
				return next;
			});
		}
	}, [
		finishUnarchive,
		unarchivingIds,
		t
	]);
	const handleDeleteClick = (0, import_react$14.useCallback)((task) => {
		setPendingDeleteTask(task);
		setDeleteDialogVisible(true);
	}, []);
	const handleDeleteConfirm = (0, import_react$14.useCallback)(async (task) => {
		if (deletingIds.has(task.id)) return;
		setDeleteLoading(true);
		setDeletingIds((prev) => new Set(prev).add(task.id));
		try {
			const result = await wb.conversations.delete(task.id, task.transport);
			if (isConversationDeleteCancelled(result)) return;
			setArchivedTasks((prev) => prev.filter((item) => item.id !== task.id));
			toast.success(t("delete.toast.success"));
		} catch (error) {
			console.error("Failed to delete task:", error);
			toast.error(t("delete.toast.failed"));
		} finally {
			setDeletingIds((prev) => {
				const next = new Set(prev);
				next.delete(task.id);
				return next;
			});
			setDeleteLoading(false);
			setDeleteDialogVisible(false);
			setPendingDeleteTask(null);
		}
	}, [deletingIds, t]);
	const formatTime = (0, import_react$14.useCallback)((timestamp) => {
		return new Date(timestamp).toLocaleString(getLocale().startsWith("zh") ? "zh-CN" : "en-GB", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "data-management-panel__tab-content",
		children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "data-management-panel__list-status",
			children: t("settings.dataManagement.sharedTasks.loading")
		}) : archivedTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "data-management-panel__list-status",
			children: t("archive.page.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "data-management-panel__list",
			children: archivedTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "data-management-panel__list-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					className: "data-management-panel__list-info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: "data-management-panel__list-title",
						title: task.title,
						children: task.title
					}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: "data-management-panel__list-subtitle",
						children: formatTime(task.timestamp)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					className: "data-management-panel__actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip, {
						content: t("contextMenu.deleteTask"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DeleteIcon, {}),
							disabled: deletingIds.has(task.id),
							"aria-label": t("contextMenu.deleteTask"),
							onClick: () => handleDeleteClick(task)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip, {
						content: t("archive.unarchive"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(UnarchiveIcon, {}),
							disabled: unarchivingIds.has(task.id),
							"aria-label": t("archive.unarchive"),
							onClick: () => handleUnarchive(task)
						})
					})]
				})]
			}, task.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ConfirmDialog, {
			visible: deleteDialogVisible,
			title: t("delete.dialog.title"),
			content: t("delete.dialog.content"),
			confirmText: t("delete.dialog.confirm"),
			cancelText: t("delete.dialog.cancel"),
			confirmVariant: "danger",
			confirmLoading: deleteLoading,
			onClose: () => {
				setDeleteDialogVisible(false);
				setPendingDeleteTask(null);
			},
			onConfirm: () => {
				if (pendingDeleteTask) handleDeleteConfirm(pendingDeleteTask);
			}
		})]
	});
}
var import_react$14, import_jsx_runtime$8;
var init_ArchivedTasksList = __esmMin((() => {
	init_src$2();
	init_src();
	init_conversations();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_conversations_context();
	init_i18n();
	init_useI18n();
	init_constants();
	import_jsx_runtime$8 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/format.ts
/** Published Apps List 的纯展示格式化工具（无 React 依赖）。 */
/**
* 时间戳 → 展示串，格式 `YYYY-MM-DD HH:mm:ss`。
*
* ⚠️ **无效时间必须回落成 `'-'`，不能直接 `new Date(ts)`**：
* 云端列表的 `updatedAt` 可能缺失（映射层为保住整条记录会兜成 `0`），
* 而 `new Date(0)` 会渲染出「1970-01-01 08:00:00」—— 一个看起来像真数据的假时间，
* 比留空更容易误导（用户会以为应用真的是那天更新的）。
*
* 负数同样拒绝：epoch 之前的时间对「更新时间」这一列没有任何合法语义，
* 出现就说明上游给了脏数据。
*
* ⚠️ 不要改回 `2026年5月6日 12:45` 这种中文格式：设计稿要求补到秒（同一应用一天内
* 可能多次发布，只到分钟分不清哪条更新），且数字格式与语言无关，不需要按 locale 分岔。
*/
function formatDate(ts) {
	if (typeof ts !== "number" || !Number.isFinite(ts) || ts <= 0) return "-";
	const d = new Date(ts);
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
var init_format = __esmMin((() => {}));
var init_cloud_service_deactivate_button = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	require_jsx_runtime();
}));
var init_use_app_cloud_service_actions = __esmMin((() => {
	init_src();
	require_react();
	init_cloud_service();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/hooks/use-app-cloud-service-provision.ts
function useAppCloudServiceProvision() {
	/**
	* Client **惰性创建**（第一次点启用/重新创建时才建），缓存在 ref 里。
	*
	* ⚠️ 不能写成 `useMemo(() => createCloudServiceApiClient(), [])`：那个工厂的默认参数是
	* `http = wb.http`，在 render 期就会读全局 `wb`。设置页的「发布的应用」列表在 jsdom
	* 单测里没有 `wb`，组件一挂载就抛 `ReferenceError: wb is not defined` 整棵树炸掉；
	* 真实环境里也可能出现在 SDK 装配完成之前就挂载的时序（同
	* `use-app-cloud-service-actions` 的处理）。
	*/
	const clientRef = (0, import_react$11.useRef)(null);
	/**
	* 依赖数组为空 —— 返回的回调必须**全程同一个引用**。
	*
	* 设置页会把它传进云服务二级页，而那一层还持有 `useSettingsHeaderOverride`；
	* 回调每帧换引用会让外层 header 每帧 setState → 重渲染 → 又是新回调 →
	* `Maximum update depth exceeded`（`use-app-cloud-service-actions` 注释里记的真实事故）。
	*/
	return (0, import_react$11.useCallback)(async ({ action, applicationId }) => {
		clientRef.current ??= createCloudServiceApiClient();
		const client = clientRef.current;
		await probeAppApiCall(PROVISION_API, {
			applicationId,
			action
		}, () => client.activate(applicationId));
	}, []);
}
var import_react$11, PROVISION_API;
var init_use_app_cloud_service_provision = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_cloud_service();
	init_app_api_probe();
	PROVISION_API = "POST /v2/as/genie-baas/control/cloud-services";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/index.ts
var init_application = __esmMin((() => {
	init_cloud_service_deactivate_button();
	init_use_app_cloud_service_actions();
	init_use_app_cloud_service_provision();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/PublishedAppCloudServiceView.tsx
function PublishedAppCloudServiceView({ applicationId, appName, applicationType }) {
	const adapter = useAdapter();
	/** Storage 页面 Adapter 的后端 Client；与 Chat 宿主同一份工厂。 */
	const storageClient = (0, import_react$10.useMemo)(() => createStorageApiClient(), []);
	/**
	* 启用 / 重新创建。与 Chat 应用空间云服务页**共用同一个 hook**，
	* 保证两个宿主打同一个绑定端点、同一套探针与错误语义。
	*/
	const handleProvisionRequest = useAppCloudServiceProvision();
	/**
	* 企业版不接个人版购买链路（Issue #108353）。
	*
	* 与 Chat 应用空间的 `cloud-service-slot` 同一口径：端内升级弹窗只能询个人版价，
	* 企业账号询不出来会得到一个价格全空的弹窗，所以直接不给入口。
	* 传 `undefined` 而非 no-op —— 组件靠 `Boolean(onUpgrade)` 决定按钮显隐。
	*/
	const isEnterpriseEdition = useIsEnterpriseEdition();
	/** 额度不足 / 耗尽时复用全局套餐升级入口，统一处理 Desktop、Web 与海外版。 */
	const handleUpgradeRequest = (0, import_react$10.useCallback)(() => {
		openPlanUpgrade({
			source: "cloud_service_quota",
			adapter
		});
	}, [adapter]);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
		className: "published-apps-list__cloud-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CloudServiceManager, {
			applicationId,
			applicationName: appName,
			applicationType,
			surface: "application_settings",
			defaultModule: "database",
			storageClient,
			onProvisionRequest: handleProvisionRequest,
			onUpgradeRequest: isEnterpriseEdition ? void 0 : handleUpgradeRequest
		})
	});
}
var import_react$10, import_jsx_runtime$6;
var init_PublishedAppCloudServiceView = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_is_enterprise_admin();
	init_application();
	init_cloud_service();
	init_plan_upgrade();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/miniprogram-management-api.ts
function unwrap(envelope, operation) {
	if (typeof envelope.code === "number" && envelope.code !== 0) throw new Error(envelope.msg || `${operation}失败（${envelope.code}）`);
	if (envelope.data === void 0 || envelope.data === null) throw new Error(`${operation}返回为空`);
	return envelope.data;
}
async function fetchPublishQrcode(applicationId) {
	return unwrap(await wb.http.get(`${MINIPROGRAM_CONTROL_PREFIX}/publish/qrcode`, { params: { applicationId } }), "小程序码查询");
}
async function offlineMiniprogram(applicationId) {
	unwrap(await wb.http.post(`${MINIPROGRAM_CONTROL_PREFIX}/offline`, { applicationId }), "下线小程序");
}
var MINIPROGRAM_CONTROL_PREFIX;
var init_miniprogram_management_api = __esmMin((() => {
	init_app_core();
	MINIPROGRAM_CONTROL_PREFIX = "/v2/as/genie-baas/control/miniprogram";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/use-miniprogram-qrcode.ts
function cacheKey(applicationId, updatedAtKey) {
	return `${applicationId}:${updatedAtKey}`;
}
async function loadCached(key, applicationId) {
	const cached = resultCache.get(key);
	if (cached) return cached;
	const pending = requestCache.get(key);
	if (pending) return pending;
	const request = fetchPublishQrcode(applicationId).then((result) => {
		resultCache.set(key, result);
		return result;
	}).finally(() => {
		requestCache.delete(key);
	});
	requestCache.set(key, request);
	return request;
}
/**
* 应用管理行的小程序码懒加载。
*
* 缓存键包含应用 updatedAt：重新发布后列表刷新会自然切到新键，不会展示旧码。
* 同键请求 singleflight，避免快速反复 hover 产生重复请求。
*/
function useMiniprogramQrcode(applicationId, updatedAtKey, enabled) {
	const key = cacheKey(applicationId, updatedAtKey);
	const activeKeyRef = (0, import_react$9.useRef)(key);
	const [data, setData] = (0, import_react$9.useState)(enabled ? resultCache.get(key) ?? null : null);
	const [loading, setLoading] = (0, import_react$9.useState)(false);
	const [failed, setFailed] = (0, import_react$9.useState)(false);
	(0, import_react$9.useEffect)(() => {
		activeKeyRef.current = key;
		setData(enabled ? resultCache.get(key) ?? null : null);
		setLoading(false);
		setFailed(false);
		return () => {
			if (activeKeyRef.current === key) activeKeyRef.current = "";
		};
	}, [enabled, key]);
	const load = (0, import_react$9.useCallback)((force = false) => {
		if (!enabled || !applicationId || loading) return;
		if (force) {
			resultCache.delete(key);
			requestCache.delete(key);
		} else {
			const cached = resultCache.get(key);
			if (cached) {
				setData(cached);
				return;
			}
		}
		setLoading(true);
		setFailed(false);
		loadCached(key, applicationId).then((result) => {
			if (activeKeyRef.current === key) {
				setData(result);
				setLoading(false);
			}
		}, (error) => {
			console.warn("[PublishedApps] miniprogram qrcode load failed:", error);
			if (activeKeyRef.current === key) {
				setFailed(true);
				setLoading(false);
			}
		});
	}, [
		applicationId,
		enabled,
		key,
		loading
	]);
	return {
		data,
		loading,
		failed,
		onOpenChange: (0, import_react$9.useCallback)((open) => {
			if (open) load();
		}, [load]),
		retry: (0, import_react$9.useCallback)(() => {
			load(true);
		}, [load])
	};
}
var import_react$9, resultCache, requestCache;
var init_use_miniprogram_qrcode = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_miniprogram_management_api();
	resultCache = /* @__PURE__ */ new Map();
	requestCache = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/published-app-qrcode-action.tsx
function resolveVersionLabel(t, bindingType, qrcodeType) {
	if (qrcodeType === "published") return t("application.miniprogram.version.formal");
	if (bindingType === "trial") return t("application.miniprogram.version.trial");
	return t("application.miniprogram.version.experience");
}
function PublishedAppQrcodeAction({ item }) {
	const t = useTranslation();
	const enabled = item.applicationType === "wechat-mini-program" && item.miniprogramPublished && Boolean(item.appActionId);
	const qrcode = useMiniprogramQrcode(item.appActionId ?? "", item.publishedAt, enabled);
	const available = qrcode.data?.status === "published" && Boolean(qrcode.data.qrcodeUrl);
	const label = resolveVersionLabel(t, qrcode.data?.bindingType, qrcode.data?.qrcodeType);
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(QrcodePreview, {
		imageUrl: available ? qrcode.data?.qrcodeUrl : null,
		label,
		buttonSize: "small",
		showCopy: false,
		onOpenChange: qrcode.onOpenChange,
		loadError: qrcode.failed || Boolean(qrcode.data && !available),
		onRetryLoad: qrcode.retry
	});
}
var import_jsx_runtime$5;
var init_published_app_qrcode_action = __esmMin((() => {
	require_react();
	init_miniprogram_qrcode_preview();
	init_useI18n();
	init_use_miniprogram_qrcode();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/published-app-row.tsx
function PublishedAppRow({ item, onTaskClick, onCopyLink, onOpenCloudService, onRequestUnpublish, onRequestDelete, onRequestPublish, publishing = false, unpublishing = false }) {
	const t = useTranslation();
	const cloudServiceEnabled = item.hasCloudService;
	const isMiniprogram = item.applicationType === "wechat-mini-program";
	const menuItems = (0, import_react$7.useMemo)(() => {
		const actions = [];
		if (!isMiniprogram) actions.push({
			key: "copyLink",
			label: t("settings.dataManagement.publishedApps.copyPublishLink"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ShareCopyIcon, {}),
			disabled: item.shareLink === "-"
		});
		const appActionId = item.appActionId;
		if (!isMiniprogram && (appActionId || item.conversationId) && item.unpublished && item.absolutePath) actions.push({
			key: "publish",
			label: publishing ? t("settings.dataManagement.publishedApps.publishing") : t("settings.dataManagement.publishedApps.publish"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(UploadCloudIcon, {}),
			disabled: publishing
		});
		if (isMiniprogram && appActionId) actions.push({
			key: "unpublish",
			label: unpublishing ? t("settings.dataManagement.publishedApps.miniprogramOfflining") : t("settings.dataManagement.publishedApps.miniprogramOffline"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WbUnpublishIcon, {}),
			disabled: unpublishing || !item.miniprogramPublished || !item.miniprogramFormalPublished
		});
		else if ((appActionId || item.conversationId) && !item.unpublished) actions.push({
			key: "unpublish",
			label: unpublishing ? t("settings.dataManagement.publishedApps.unpublishing") : t("settings.dataManagement.publishedApps.unpublish"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ShareUnlinkIcon, {}),
			disabled: unpublishing
		});
		if (appActionId) actions.push({
			key: "delete",
			label: t("settings.dataManagement.publishedApps.delete"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DeleteIcon, {}),
			danger: true,
			divider: actions.length > 0
		});
		return actions;
	}, [
		isMiniprogram,
		item.appActionId,
		item.absolutePath,
		item.conversationId,
		item.miniprogramPublished,
		item.miniprogramFormalPublished,
		item.shareLink,
		item.unpublished,
		publishing,
		unpublishing,
		t
	]);
	const handleSelect = (0, import_react$7.useCallback)((key) => {
		switch (key) {
			case "copyLink":
				onCopyLink(item);
				break;
			case "publish":
				onRequestPublish(item);
				break;
			case "unpublish":
				onRequestUnpublish(item);
				break;
			case "delete": onRequestDelete(item);
		}
	}, [
		item,
		onCopyLink,
		onRequestDelete,
		onRequestPublish,
		onRequestUnpublish
	]);
	const handleTaskNameClick = (0, import_react$7.useCallback)(() => {
		onTaskClick(item.taskSessionId);
	}, [item.taskSessionId, onTaskClick]);
	/** 任务名是 `role="link"` 的 span（不是 <a>，没有 href），键盘可达要自己补。 */
	const handleTaskNameKeyDown = (0, import_react$7.useCallback)((e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onTaskClick(item.taskSessionId);
		}
	}, [item.taskSessionId, onTaskClick]);
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "data-management-panel__list-row data-management-panel__list-row--app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "data-management-panel__list-info",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "data-management-panel__list-title-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "published-apps-list__type-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WbAppArtifactIcon, {
								appType: isMiniprogram ? "miniprogram" : "web",
								size: 16
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "data-management-panel__list-title data-management-panel__list-title--strong",
							title: item.absolutePath,
							children: item.name
						}),
						!item.unpublished && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "published-apps-list__status-tag",
							children: t("settings.dataManagement.publishedApps.statusPublished")
						})
					]
				}),
				item.taskSessionId && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "published-apps-list__meta-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "published-apps-list__meta-label",
						children: t("settings.dataManagement.publishedApps.taskNameLabel")
					}), item.taskDeleted ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
						content: t("settings.dataManagement.publishedApps.taskMaybeMissing"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "published-apps-list__task-name published-apps-list__link--muted",
							children: item.taskName
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
						content: item.taskMaybeMissing ? t("settings.dataManagement.publishedApps.taskMaybeMissing") : t("settings.dataManagement.publishedApps.goToLatestTask"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "published-apps-list__task-name",
							role: "link",
							tabIndex: 0,
							title: item.taskName,
							onClick: handleTaskNameClick,
							onKeyDown: handleTaskNameKeyDown,
							children: item.taskName
						})
					})]
				}),
				!isMiniprogram ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "published-apps-list__meta-row published-apps-list__meta-row--link",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "published-apps-list__meta-label",
							children: t("settings.dataManagement.publishedApps.publishLinkLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: `data-management-panel__list-link${item.shareLink === "-" ? " published-apps-list__link--muted" : ""}`,
							title: item.shareLink === "-" ? void 0 : item.shareLink,
							onClick: item.shareLink !== "-" ? () => {
								window.open(item.shareLink, "_blank");
							} : void 0,
							children: item.shareLink
						}),
						item.shareLink !== "-" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
							content: t("settings.dataManagement.publishedApps.copyLink"),
							placement: "top",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								className: "published-apps-list__copy-link",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ShareCopyIcon, {}),
								"aria-label": t("settings.dataManagement.publishedApps.copyLink"),
								onClick: () => onCopyLink(item)
							})
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "data-management-panel__list-subtitle",
					children: item.publishedAt
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "data-management-panel__actions",
			children: [
				isMiniprogram && item.appActionId && item.miniprogramPublished ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PublishedAppQrcodeAction, { item }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
					content: cloudServiceEnabled ? t("settings.dataManagement.publishedApps.cloudServiceViewTitle") : t("settings.dataManagement.publishedApps.cloudServiceDisabled"),
					placement: "top",
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "published-apps-list__cloud-entry",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							disabled: !cloudServiceEnabled,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CloudDatabaseIcon, {}),
							"aria-label": cloudServiceEnabled ? t("settings.dataManagement.publishedApps.cloudServiceViewTitle") : t("settings.dataManagement.publishedApps.cloudServiceDisabled"),
							onClick: () => onOpenCloudService(item)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Dropdown, {
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
						variant: "ghost",
						size: "small",
						iconOnly: true,
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MoreDotsIcon, {}),
						"aria-label": t("settings.dataManagement.publishedApps.moreActions")
					}),
					items: menuItems,
					placement: "bottom-end",
					portalRoot: "body",
					onSelect: handleSelect
				})
			]
		})]
	});
}
var import_react$7, import_jsx_runtime$4;
var init_published_app_row = __esmMin((() => {
	init_src$1();
	init_src();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_published_app_qrcode_action();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/data/application-list.ts
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
/** 非空字符串才算有值；`null` / `''` 一律收成 `undefined`。 */
function str(value) {
	return typeof value === "string" && value !== "" ? value : void 0;
}
/** 有限数值才算有值。`null` / `NaN` 收成 `undefined`。 */
function num(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
/** 枚举收窄：不在白名单内一律 `undefined`，绝不强转。 */
function oneOf(value, allowed) {
	return typeof value === "string" && allowed.includes(value) ? value : void 0;
}
/**
* `publish` → `release`。
*
* 未知 / 缺失 status 回退 `'never'` 而不是 `'published'`：把没发布的显示成已发布
* 会给出一条点不开的死链，反过来只是少一个标记。
*/
function mapRelease(raw) {
	if (!isRecord(raw)) return { status: "never" };
	return {
		status: oneOf(raw.status, RELEASE_STATUSES) ?? "never",
		shareLink: str(raw.shareLink),
		sandboxId: str(raw.sandboxId),
		publishedAt: num(raw.publishedAt),
		unpublishedAt: num(raw.unpublishedAt)
	};
}
/**
* `cloudService: {...} | null` → `AppCloudServiceInfo`。
*
* 两个易错点：
*
* 1. **`null` 必须显式转成 `{ activated: false }`**。UI 与 `resolveAppCapabilities`
*    都直接读 `.activated`，给个 `null` 会在渲染期抛。
* 2. **出参的 `status` 是「环境供给状态」，要落到 `provisionStatus`**，
*    不是 `billingStatus`。两个都是状态字段、名字又都叫 status，填反了不报错：
*    界面只会永远不显示「供给中」并把计费标签算错。
*
* `publicConfig` 仅在 `resourceId` 与 `endpoint` **都**有值时才给：它的语义是
* 「供给完成、可以拿去连数据面」，缺一半的配置拿出去只会让调用方拼出坏 URL。
*/
function mapCloudService(raw) {
	if (!isRecord(raw)) return { activated: false };
	const resourceId = str(raw.resourceId);
	const endpoint = str(raw.endpoint);
	return {
		activated: true,
		publicConfig: resourceId && endpoint ? {
			resourceId,
			endpoint
		} : void 0,
		billingStatus: oneOf(raw.billingStatus, BILLING_STATUSES),
		provisionStatus: oneOf(raw.status, PROVISION_STATUSES)
	};
}
function mapLatestTask(raw) {
	if (!isRecord(raw)) return;
	const taskConversationId = str(raw.taskConversationId);
	if (!taskConversationId) return;
	return {
		taskConversationId,
		title: str(raw.title) ?? "",
		updatedAt: num(raw.updatedAt) ?? 0,
		deleted: raw.deleted === true
	};
}
/**
* 映射单条。返回 `undefined` 表示该条数据不可用、应跳过。
*
* `createdAt` / `updatedAt` 缺失时给 `0` 而不是丢弃整条：时间只影响排序与「更新时间」
* 一列的展示，为它丢掉一个真实存在的应用（连带取消发布入口）不成比例。
*/
function mapApplicationListItem(raw) {
	if (!isRecord(raw)) return;
	const appId = str(raw.appId);
	if (!appId) return;
	return {
		appId,
		appName: str(raw.appName) ?? appId,
		applicationType: oneOf(raw.applicationType, APPLICATION_TYPES) ?? "unknown",
		createdAt: num(raw.createdAt) ?? 0,
		updatedAt: num(raw.updatedAt) ?? 0,
		release: mapRelease(raw.publish),
		cloudService: mapCloudService(raw.cloudService),
		latestTask: mapLatestTask(raw.latestTask),
		taskCount: num(raw.taskCount) ?? 0,
		localDir: str(raw.localDir),
		miniprogramPublished: raw.miniprogramPublished === true,
		miniprogramFormalPublished: raw.miniprogramFormalPublished === true
	};
}
/**
* 映射整页。
*
* `total` 缺失时回退成 `items.length` 而不是 0：分页组件拿 0 会直接判定「无数据」
* 并隐藏整个列表，即使 items 里有内容。
*/
function mapApplicationListResult(raw) {
	const rawItems = isRecord(raw) && Array.isArray(raw.items) ? raw.items : [];
	const items = [];
	let skipped = 0;
	for (const entry of rawItems) {
		const mapped = mapApplicationListItem(entry);
		if (mapped) items.push(mapped);
		else skipped += 1;
	}
	return {
		items,
		total: (isRecord(raw) ? num(raw.total) : void 0) ?? items.length,
		hasMore: isRecord(raw) && raw.hasMore === true,
		skipped
	};
}
var RELEASE_STATUSES, BILLING_STATUSES, PROVISION_STATUSES, APPLICATION_TYPES;
var init_application_list = __esmMin((() => {
	RELEASE_STATUSES = [
		"never",
		"published",
		"unpublished",
		"publishing",
		"failed",
		"blocked"
	];
	BILLING_STATUSES = [
		"normal",
		"expiring",
		"credits_exhausted",
		"destroyed"
	];
	PROVISION_STATUSES = [
		"ordering",
		"creating",
		"configuring",
		"ready",
		"assigned",
		"failed",
		"destroying",
		"destroyed"
	];
	APPLICATION_TYPES = [
		"web",
		"wechat-mini-program",
		"unknown"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/task-session-cwd-index.ts
/**
* 目录归一化：统一分隔符 → 去尾部斜杠 → 转小写。
*
* 转小写是为 macOS / Windows 默认大小写不敏感的文件系统服务（桌面端主场景）。
* 理论上会让 Linux 上仅大小写不同的两个目录互相匹配，但那种目录命名本身极罕见，
* 且后果止于任务名，权衡后取兼容性。
*/
function normalizeDir(value) {
	if (!value) return "";
	return value.replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
}
/**
* 建索引。按 `root` 长度倒序，使 `matchTaskSessionByCwd` 首个命中即最深命中。
*
* 无 `cwd`、无 `id`、**无 `title`** 的会话都不收：索引的唯一用途是把任务名认回来，
* 收了没标题的条目只会让调用方拿到空标题，继而被判成「任务已删除」而灰显 ——
* 那还不如不匹配。
*/
function buildTaskSessionCwdIndex(infos) {
	const entries = [];
	for (const info of infos) {
		const root = normalizeDir(info.space?.cwd);
		if (!root || !info.id || !info.title) continue;
		entries.push({
			root,
			id: info.id,
			title: info.title
		});
	}
	return entries.sort((a, b) => b.root.length - a.root.length);
}
/**
* 按部署目录反查任务会话。命中不唯一时返回 `undefined`（宁缺毋滥，见模块顶注）。
*
* @param index - `buildTaskSessionCwdIndex` 的产物（必须保持其排序）
* @param absolutePath - 部署记录里的发布目录
*/
function matchTaskSessionByCwd(index, absolutePath) {
	const target = normalizeDir(absolutePath);
	if (!target) return;
	const matched = index.filter((entry) => target === entry.root || target.startsWith(`${entry.root}/`));
	if (matched.length === 0) return;
	const deepest = matched[0].root;
	const candidates = matched.filter((entry) => entry.root === deepest);
	return new Set(candidates.map((entry) => entry.id)).size === 1 ? candidates[0] : void 0;
}
var init_task_session_cwd_index = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/map-flat-items.ts
/**
* 云端列表 → 列表行。
*
* 三处刻意的取值：
*
* - `publishedAt` 展示的是 **`updatedAt`**（最近一次编辑或发布），不是 `publishedAt`。
*   PRD §3.6 的列名就是「更新时间」，用发布时间会让「改完没发布」的应用一直显示旧时间。
* - `unpublished` 判定用 `!== 'published'` 而不是 `=== 'unpublished'`：
*   `never`（开了云服务从没发过）也必须显示成未发布，用后者会把它错标成已发布。
* - `taskName` **本地会话表优先、云端 title 兜底**，见下方。
*
* ## 任务名判定（#101251 + #108396）
*
* 云端的 `latestTask.title` / `deleted` 来自 `LEFT JOIN t_conversations`：
*
* - `deleted === false`：云端明确存在且未删（JOIN 命中 + status 非 deleted），任务在。
* - `deleted === true`：云端「已不存在」—— 要么真删（云端软删，`title` 残留），
*   要么本地任务从不上云（JOIN 落空，#101251 的假阳性）。
*
* 「是否删除」只用 `deleted` + 本地会话表判断，**不拿 title 做验证**：
* 云端已不存在时查本地表（在 = 本地任务可点，不在 = 真删 → `'-'` 不可点）。
* title 全程只负责展示文字。
*
* 展示文字则**本地优先**：云端那份是发布时刻的快照、之后不再同步，用户改名后
* 只有本地表是新的。查不到本地记录才退回云端快照（换设备 / 本地已清理）。
*/
function mapCloudItems(raw, taskTitles) {
	return mapApplicationListResult(raw).items.map((item) => {
		const taskSessionId = item.latestTask?.taskConversationId ?? "";
		const cloudDeleted = item.latestTask?.deleted === true;
		const localTitle = taskSessionId ? taskTitles.get(taskSessionId) : void 0;
		const taskTitle = cloudDeleted ? localTitle : localTitle || item.latestTask?.title;
		return {
			id: item.appId,
			name: item.appName,
			applicationType: item.applicationType,
			miniprogramPublished: item.miniprogramPublished,
			miniprogramFormalPublished: item.miniprogramFormalPublished,
			taskSessionId,
			taskName: taskTitle || "-",
			taskDeleted: cloudDeleted && !localTitle,
			taskMaybeMissing: !!taskSessionId && !taskTitle,
			shareLink: item.release.status === "published" ? item.release.shareLink ?? "-" : "-",
			conversationId: "",
			unpublished: item.release.status !== "published",
			publishedAt: formatDate(item.updatedAt),
			updatedAtMs: typeof item.updatedAt === "number" ? item.updatedAt : 0,
			absolutePath: item.localDir ?? "",
			entryHtml: "",
			source: "cloud",
			hasCloudService: item.cloudService.activated,
			appActionId: item.appId
		};
	});
}
/**
* 本机部署历史 → 列表行（降级路径）。
*/
function mapLocalItems(raw, deployConversationIds, taskTitles, taskCwdIndex = []) {
	if (!Array.isArray(raw)) return [];
	return raw.filter((t) => t.history.length > 0).filter((t) => deployConversationIds.has(t.history[0].conversationId)).map((target) => {
		const latest = target.history[0];
		const recordedSessionId = latest.taskSessionId || "";
		const backfilled = recordedSessionId ? void 0 : matchTaskSessionByCwd(taskCwdIndex, latest.absolutePath);
		const taskSessionId = recordedSessionId || backfilled?.id || "";
		const taskTitle = recordedSessionId ? taskTitles.get(recordedSessionId) : backfilled?.title;
		return {
			id: target.deployTargetId,
			name: target.title,
			applicationType: "web",
			miniprogramPublished: false,
			miniprogramFormalPublished: false,
			taskSessionId,
			taskName: taskTitle || "-",
			taskDeleted: !!taskSessionId && !taskTitle,
			taskMaybeMissing: !!taskSessionId && !taskTitle,
			shareLink: target.unpublished ? "-" : latest.shareLink || "-",
			conversationId: latest.conversationId,
			unpublished: !!target.unpublished,
			publishedAt: formatDate(latest.createdTimestamp),
			updatedAtMs: typeof latest.createdTimestamp === "number" ? latest.createdTimestamp : 0,
			absolutePath: latest.absolutePath,
			entryHtml: latest.entryHtml,
			source: "local",
			hasCloudService: false,
			appId: latest.appId,
			appActionId: latest.appId
		};
	});
}
var init_map_flat_items = __esmMin((() => {
	init_application_list();
	init_format();
	init_task_session_cwd_index();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/use-published-apps-source.ts
/**
* 取本地会话表，产出任务标题表与目录反查索引。查询失败只让任务名回落 '-'，
* 不连累整个列表。
*
* 两份产物共用**同一次**请求：`ConversationInfo` 里 `title` 与 `space.cwd` 本就
* 同时返回（`toSpace()` 各分支均填充 `cwd`），分两次查纯属浪费一个 RTT。
*
* ⚠️ **不要改回 `useConversations()` 的内存数组 `find()`**：那个数组因 App.tsx 硬编码
* `skipLegacyConversationListLoad` 永不加载历史会话（侧栏另走 `ensureList`），
* 重启后整列任务名必然回落兜底值 —— 这是 #101251 的另一半根因。
*
* ⚠️ **不要传 `view`**：local provider 只在 `view` 存在时才按 `status === 'archived'`
* 分流，不传才能同时覆盖活跃与已归档任务。
*
* ⚠️ 也不要换成看着更精准的 `listByIds`：聚合层按 locator 分流，未定位的 id 一律发往
* cloud（`locatedProvider(id) ?? 'cloud'`），而这里的 id 是本地会话，冷启动必然查空。
*
* ⚠️ 也不必改成全量 `list()`：实测 713 条会话里带 `cwd` 的仅 325 条，且全部落在
* `local` 视图内（其余是无 cwd 的部署沙箱会话与云端助理），换全量不会多认回一条，
* 只会白拉一倍数据（#116570）。
*/
async function fetchTaskSessionLookup() {
	try {
		const result = await wb.conversations.local.list({ size: TASK_TITLE_FETCH_SIZE });
		const titles = /* @__PURE__ */ new Map();
		for (const info of result.items) if (info.title) titles.set(info.id, info.title);
		return {
			titles,
			cwdIndex: buildTaskSessionCwdIndex(result.items)
		};
	} catch (error) {
		console.warn("[PublishedApps] failed to list local conversations for task titles:", error);
		return {
			titles: /* @__PURE__ */ new Map(),
			cwdIndex: []
		};
	}
}
/**
* 取当前账号在 workbuddy-deploy space 下现存会话的 id 集合，作为「应用是否还在」的判据。
*
* 走只读的 `listScope` 而不是 `ensureList`：后者会广播 ListChange 覆盖侧栏主列表快照，
* 设置面板的独立查询不能污染主列表（#86017）。
*
* 查询失败（含 SDK 尚未初始化）时返回空集合，即过滤掉全部记录：本地部署历史是机器级的、
* 不带账号维度，放行会把上一个登录账号的应用暴露给当前账号（#91344）。
*/
async function fetchDeployConversationIds() {
	try {
		const result = await wb.conversations.listScope("workbuddy-deploy", {
			page: 1,
			size: DEPLOY_CONVERSATION_FETCH_SIZE
		});
		return new Set(result.items.map((info) => info.id));
	} catch (error) {
		console.warn("[PublishedApps] failed to list workbuddy-deploy conversations:", error);
		return /* @__PURE__ */ new Set();
	}
}
function usePublishedAppsSource(publishedApps) {
	const [items, setItems] = (0, import_react$6.useState)([]);
	const [loading, setLoading] = (0, import_react$6.useState)(true);
	const [source, setSource] = (0, import_react$6.useState)("cloud");
	const [fetchVersion, setFetchVersion] = (0, import_react$6.useState)(0);
	/**
	* 标记「本次 effect 是否由 refresh 触发」。
	*
	* refresh 是动作成功后（删除 / 取消发布）的重拉，此时列表已有数据，不该把
	* loading 置回 true —— 否则整列先闪成「加载中」再回来（#102511）。
	* 用 ref 而非 state：不进 effect 依赖，且能跨一次 setFetchVersion 传递意图。
	*/
	const refreshingRef = (0, import_react$6.useRef)(false);
	const refresh = (0, import_react$6.useCallback)(() => {
		refreshingRef.current = true;
		setFetchVersion((v) => v + 1);
	}, []);
	(0, import_react$6.useEffect)(() => {
		let cancelled = false;
		const isRefresh = refreshingRef.current;
		refreshingRef.current = false;
		if (!isRefresh) setLoading(true);
		(async () => {
			try {
				const taskSessionPromise = fetchTaskSessionLookup();
				let cloudItems = [];
				let cloudOk = false;
				if (typeof publishedApps?.getApplicationList === "function") try {
					const [cloud, taskSessions] = await Promise.all([publishedApps.getApplicationList({
						sort: "updatedAt",
						pageSize: CLOUD_APPLICATION_FETCH_SIZE
					}), taskSessionPromise]);
					if (cancelled) return;
					cloudItems = mapCloudItems(cloud, taskSessions.titles);
					cloudOk = !!cloud && typeof cloud === "object" && Array.isArray(cloud.items);
				} catch (err) {
					console.warn("[PublishedApps] cloud list unavailable, fallback to local history:", err);
				}
				let localItems = [];
				if (typeof publishedApps?.getDeployHistory === "function") try {
					const [deployConversationIds, taskSessions, local] = await Promise.all([
						fetchDeployConversationIds(),
						taskSessionPromise,
						publishedApps.getDeployHistory()
					]);
					if (cancelled) return;
					localItems = mapLocalItems(local, deployConversationIds, taskSessions.titles, taskSessions.cwdIndex);
				} catch (err) {
					console.warn("[PublishedApps] local history load failed:", err);
				}
				if (cancelled) return;
				const cloudAppIds = new Set(cloudItems.map((item) => item.id));
				const legacyLocalItems = localItems.filter((item) => !item.appId);
				const merged = cloudOk ? [...cloudItems, ...legacyLocalItems] : [...cloudItems, ...localItems.filter((item) => !item.appId || !cloudAppIds.has(item.appId))];
				merged.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
				setItems(merged);
				setSource(cloudOk ? "cloud" : "local");
			} catch (err) {
				if (!cancelled) {
					console.warn("[PublishedApps] load list failed:", err);
					setItems([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [fetchVersion, publishedApps]);
	return {
		items,
		loading,
		source,
		refresh
	};
}
var import_react$6, CLOUD_APPLICATION_FETCH_SIZE, DEPLOY_CONVERSATION_FETCH_SIZE, TASK_TITLE_FETCH_SIZE;
var init_use_published_apps_source = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_map_flat_items();
	init_task_session_cwd_index();
	CLOUD_APPLICATION_FETCH_SIZE = 200;
	DEPLOY_CONVERSATION_FETCH_SIZE = 100;
	TASK_TITLE_FETCH_SIZE = 1e5;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/index.ts
var init_published_apps = __esmMin((() => {
	init_PublishedAppCloudServiceView();
	init_published_app_row();
	init_use_published_apps_source();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/published-apps/build-deploy-params.ts
/**
* 按行现有的身份字段构造发布入参。调用方需先保证 `absolutePath` 非空，
* 且 `appActionId` / `conversationId` 至少有其一（否则 daemon 会按目录猜沙箱）。
*/
function buildDeployParams(item) {
	const params = {
		directory: item.absolutePath,
		triggerType: "manual",
		taskSessionId: item.taskSessionId || void 0
	};
	if (item.appActionId) {
		params.appId = item.appActionId;
		params.appName = item.name;
	}
	if (item.conversationId) params.deployConversationId = item.conversationId;
	return params;
}
var init_build_deploy_params = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/use-visible-refresh.ts
function useVisibleRefresh({ reload, enabled = true }) {
	const reloadRef = (0, import_react$5.useRef)(reload);
	reloadRef.current = reload;
	(0, import_react$5.useEffect)(() => {
		if (!enabled) return;
		const fire = () => {
			reloadRef.current();
		};
		const onFocus = () => {
			fire();
		};
		const onVisibilityChange = () => {
			if (!document.hidden) fire();
		};
		window.addEventListener("focus", onFocus);
		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => {
			window.removeEventListener("focus", onFocus);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [enabled]);
}
var import_react$5;
var init_use_visible_refresh = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/PublishedAppsList.tsx
function PublishedAppsList({ onSubViewChange } = {}) {
	const t = useTranslation();
	const setJumpToConversationId = useOptionalConversations()?.setJumpToConversationId;
	const { closeSettings } = useSettings();
	const { navigateMain } = useSettingsNavigate();
	const publishedApps = useAppProviders()?.publishedApps;
	const [pendingDelete, setPendingDelete] = (0, import_react$4.useState)(null);
	/** 删除请求进行中：确认按钮进入「删除中…」并禁用，防止重复提交（#102511）。 */
	const [deleting, setDeleting] = (0, import_react$4.useState)(false);
	/** 等待「取消发布」二确的应用。null = 没有待确认的请求。 */
	const [pendingUnpublish, setPendingUnpublish] = (0, import_react$4.useState)(null);
	/**
	* 正在发布 / 取消发布的应用 id（#109383 后续）。
	*
	* 用 id 而非布尔：列表里每行都有自己的入口，只有发起的那一行该转圈。
	* 两个动作各占一个 state —— 同一行的这两个入口互斥出现（发布态决定谁显示），
	* 但合成一个会让「正在发布」意外禁掉别的行的取消发布。
	*/
	const [publishingId, setPublishingId] = (0, import_react$4.useState)(null);
	const [unpublishingId, setUnpublishingId] = (0, import_react$4.useState)(null);
	/**
	* 进入「云服务」二级页的应用。null = 停留在列表页。
	*
	* 用面板内局部 state 而非 settings subRoute：云服务是「某个应用」的二级页，
	* 需要携带 applicationId，hash 子路由目前只支持无参数的固定 subRoute。
	*/
	const [cloudServiceApp, setCloudServiceApp] = (0, import_react$4.useState)(null);
	const handleTaskClick = (0, import_react$4.useCallback)((sessionId) => {
		if (!sessionId) return;
		jumpFromSettings({
			navigateMain,
			route: "conversation",
			payload: { conversationId: sessionId },
			fallback: () => {
				setJumpToConversationId?.(sessionId);
				closeSettings();
			}
		});
	}, [
		navigateMain,
		setJumpToConversationId,
		closeSettings
	]);
	const { items, loading, refresh } = usePublishedAppsSource(publishedApps);
	useVisibleRefresh({ reload: refresh });
	const handlePublish = (0, import_react$4.useCallback)(async (item) => {
		if (publishingId) return;
		setPublishingId(item.id);
		const progressKey = `published-apps-publish-${item.id}`;
		toast({
			type: "loading",
			message: t("settings.dataManagement.publishedApps.publishing"),
			dedupKey: progressKey,
			duration: 0
		});
		try {
			if (typeof publishedApps?.deploy !== "function") throw new Error("deploy API not available");
			if (!item.appActionId && !item.conversationId) throw new Error("missing applicationId");
			if (!item.absolutePath) throw new Error(t("settings.dataManagement.publishedApps.publishNoLocalDir"));
			await publishedApps.deploy(buildDeployParams(item));
			toast.success(t("settings.dataManagement.publishedApps.publishSuccess"), {
				dedupKey: progressKey,
				duration: RESULT_TOAST_DURATION_MS
			});
			refresh();
		} catch (err) {
			console.error("[PublishedApps] publish failed:", err);
			const detail = err instanceof Error ? err.message : String(err);
			toast.error(`${t("settings.dataManagement.publishedApps.publishFailed")}: ${detail}`, {
				dedupKey: progressKey,
				duration: RESULT_TOAST_DURATION_MS
			});
		} finally {
			setPublishingId(null);
		}
	}, [
		publishedApps,
		publishingId,
		t,
		refresh
	]);
	/**
	* 删除应用 [P-3.6.1 差异项 11] —— **终态，不可恢复**。
	*
	* `deleteApplication({ appId })` → `sites:deleteApplication` →
	* `POST /genie-baas/control/applications/delete`。云端一次调用级联四件事：
	* 终止发布 + 解绑云服务 + 释放子域名 + 软删应用。
	*
	* ## 为什么这里是「删除」而不是「取消发布」
	*
	* PRD §3.6.1 差异项 11 定的就是删除（连带下线 + 处理云服务 + 释放名额）。
	* 曾经这个动作接的是 `publishedApps.destroy`（`sites:destroy`，语义只是取消发布），
	* 表现是「按钮写着删除、实际只让链接失效，云服务和应用都还在」，已改正。
	*
	* ⚠️ **不要用 `unpublishApplication` 实现它**：那条是可恢复的临时下线（保留子域名），
	* 见 `handleUnpublish`。两者现在都在「更多」⋮ 菜单里，是并列的两条能力。
	*
	* ## 出参四个布尔位全 false 是**成功**，不是失败
	*
	* 删除幂等，重复点时云端返回 `deleted:false` 等（云端 docs §5.5）。
	* 这里刻意**不校验**这些位、不据此报错 —— 用户重复点删除是常见操作，
	* 报错只会让人以为删失败了。
	*
	* ⚠️ 成功文案**不能写「已彻底清除」**：云端只把云服务转入 `unbound` 待回收
	* （docs §5.3），TCB 侧数据库 / 存储 / 终端用户账号此刻仍在。
	*
	* ## 不做数据源分岔（与 `handleUnpublish` 不同）
	*
	* 删除只有 `appId` 一条入参，云端接口本身不需要 `conversationId`，因此
	* cloud / local 两源都能调。**但菜单项只在 cloud 源展示** —— local 源的
	* `item.id` 是 deployTargetId 而不是 applicationId，拿它去删必然 Forbidden
	* （云端按 applicationId 校验归属）。判断在 `PublishedAppRow` 的 `menuItems` 里。
	*/
	const handleDelete = (0, import_react$4.useCallback)(async (item) => {
		try {
			if (typeof publishedApps?.deleteApplication !== "function") throw new Error("deleteApplication API not available");
			const appActionId = item.appActionId;
			if (!appActionId) throw new Error("missing applicationId");
			await publishedApps.deleteApplication({ appId: appActionId });
			toast.success(t("settings.dataManagement.publishedApps.deleteSuccess"));
			refresh();
		} catch (err) {
			console.error("[PublishedApps] delete failed:", err);
			const detail = err instanceof Error ? err.message : String(err);
			toast.error(`${t("settings.dataManagement.publishedApps.deleteFailed")}: ${detail}`);
		}
	}, [
		publishedApps,
		t,
		refresh
	]);
	/**
	* 删除确认框的确认动作。与 `handleDelete` 分开：删除接口可能较慢（云端级联
	* 终止发布 + 解绑云服务 + 释放子域名 + 软删应用），期间让确认按钮进入
	* 「删除中…」并在完成前**不关闭弹窗**，避免用户对着空列表干等（#102511）。
	* 失败也不在这里二次提示 —— `handleDelete` 已 toast 具体原因，这里只管复位。
	*/
	const confirmDelete = (0, import_react$4.useCallback)(async () => {
		if (!pendingDelete || deleting) return;
		setDeleting(true);
		try {
			await handleDelete(pendingDelete);
		} finally {
			setDeleting(false);
			setPendingDelete(null);
		}
	}, [
		pendingDelete,
		deleting,
		handleDelete
	]);
	/**
	* 取消发布 —— **可恢复的临时下线**，与 `handleDelete` 是两件事。
	*
	* `unpublishApplication({ appId })` → `sites:unpublishApplication` →
	* `POST /genie-baas/control/applications/unpublish`。公开链接立即失效，
	* **应用 / 云服务 / 子域名全部保留**，重新发布能拿回原链接。
	*
	* ## 为什么管理页又有这个入口了
	*
	* 曾按 PRD §3.6.1 差异项 9 把它从管理页整条删掉（理由是「取消发布属于发布态管理，
	* 该留在应用空间的发布面板」）。设计稿 8/17 改版把它**放回管理页的「更多」⋮ 菜单**：
	* 菜单里三条能力语义分层清晰（复制链接 / 取消发布 / 删除），不再是当初担心的
	* 「两个破坏性 icon 并排容易点错」。应用空间发布面板里的那份下线入口继续保留，
	* 两处共用同一个 daemon 接口。
	*
	* ## 只走 cloud 源
	*
	* 入参只有 `appId`，但 local 降级源的 `item.id` 是 **deployTargetId** 而非
	* applicationId，拿它去下线必然 Forbidden。菜单项因此在 local 源**隐藏**而不是置灰
	* （点下去必然失败），判断在 `PublishedAppRow` 的 `menuItems` 里。
	*
	* ⚠️ 不要为了「local 源也能下线」改去调 `publishedApps.destroy`：那条会销毁沙箱，
	* 与「取消发布后云服务不受影响」完全相反（facade 注释 + PRD 3.6.1）。
	*/
	const handleUnpublish = (0, import_react$4.useCallback)(async (item) => {
		setUnpublishingId(item.id);
		const isMiniprogram = item.applicationType === "wechat-mini-program";
		const progressKey = `published-apps-unpublish-${item.id}`;
		toast({
			type: "loading",
			message: t(isMiniprogram ? "settings.dataManagement.publishedApps.miniprogramOfflining" : "settings.dataManagement.publishedApps.unpublishing"),
			dedupKey: progressKey,
			duration: 0
		});
		try {
			const appActionId = item.appActionId;
			if (isMiniprogram) {
				if (!appActionId) throw new Error("missing applicationId");
				await offlineMiniprogram(appActionId);
			} else if (appActionId) {
				if (typeof publishedApps?.unpublishApplication !== "function") throw new Error("unpublishApplication API not available");
				await publishedApps.unpublishApplication({ appId: appActionId });
			} else if (item.conversationId) {
				if (typeof publishedApps?.destroy !== "function") throw new Error("destroy API not available");
				await publishedApps.destroy({ conversationId: item.conversationId });
			} else throw new Error("missing applicationId and conversationId");
			toast.success(t(isMiniprogram ? "settings.dataManagement.publishedApps.miniprogramOfflineSuccess" : "settings.dataManagement.publishedApps.unpublishSuccess"), {
				dedupKey: progressKey,
				duration: RESULT_TOAST_DURATION_MS
			});
			refresh();
		} catch (err) {
			console.error("[PublishedApps] unpublish failed:", err);
			const detail = err instanceof Error ? err.message : String(err);
			toast.error(`${t(isMiniprogram ? "settings.dataManagement.publishedApps.miniprogramOfflineFailed" : "settings.dataManagement.publishedApps.unpublishFailed")}: ${detail}`, {
				dedupKey: progressKey,
				duration: RESULT_TOAST_DURATION_MS
			});
		} finally {
			setUnpublishingId(null);
		}
	}, [
		publishedApps,
		t,
		refresh
	]);
	const handleCopyLink = (0, import_react$4.useCallback)(async (item) => {
		if (item.shareLink && item.shareLink !== "-") {
			if (await copyToClipboard(item.shareLink)) toast.success(t("settings.dataManagement.publishedApps.copyLinkSuccess"));
			else toast.error(t("settings.dataManagement.publishedApps.copyLinkFailed"));
		}
	}, [t]);
	const closeCloudService = (0, import_react$4.useCallback)(() => setCloudServiceApp(null), []);
	(0, import_react$4.useEffect)(() => {
		onSubViewChange?.(cloudServiceApp !== null);
	}, [cloudServiceApp, onSubViewChange]);
	(0, import_react$4.useEffect)(() => () => onSubViewChange?.(false), [onSubViewChange]);
	/**
	* 云服务二级页：复用外层 settings header 的返回按钮与标题覆盖，
	* 二级页自身不再画标题栏（与安全中心二级页同一机制）。
	* 最新产品口径已移除「销毁云服务」入口，因此 header 不再提供右侧破坏性操作。
	*
	* ⚠️ 必须 `useMemo`：`useSettingsHeaderOverride` 的 effect 依赖整个对象，
	* 每帧重建会让外层 header 反复 setState。
	*/
	const headerOverride = (0, import_react$4.useMemo)(() => cloudServiceApp ? {
		title: t("settings.dataManagement.publishedApps.cloudServiceViewTitle"),
		onBack: closeCloudService
	} : null, [
		cloudServiceApp,
		t,
		closeCloudService
	]);
	useSettingsHeaderOverride(headerOverride);
	if (cloudServiceApp) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: "published-apps-list",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(PublishedAppCloudServiceView, {
			applicationId: cloudServiceApp.id,
			appName: cloudServiceApp.name,
			applicationType: cloudServiceApp.applicationType
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "published-apps-list",
		children: [
			loading ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "data-management-panel__list-status",
				children: t("settings.dataManagement.publishedApps.loading")
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "data-management-panel__list-status",
				children: t("settings.dataManagement.publishedApps.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "data-management-panel__list",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(PublishedAppRow, {
					item,
					onTaskClick: handleTaskClick,
					onCopyLink: handleCopyLink,
					onOpenCloudService: setCloudServiceApp,
					onRequestUnpublish: setPendingUnpublish,
					onRequestDelete: setPendingDelete,
					onRequestPublish: handlePublish,
					publishing: publishingId === item.id,
					unpublishing: unpublishingId === item.id
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ConfirmDialog, {
				visible: !!pendingUnpublish,
				title: t(pendingUnpublish?.applicationType === "wechat-mini-program" ? "settings.dataManagement.publishedApps.miniprogramOfflineConfirmTitle" : "settings.dataManagement.publishedApps.unpublishConfirmTitle"),
				content: t(pendingUnpublish?.applicationType === "wechat-mini-program" ? "settings.dataManagement.publishedApps.miniprogramOfflineConfirmContent" : "settings.dataManagement.publishedApps.unpublishConfirmContent"),
				confirmText: t(pendingUnpublish?.applicationType === "wechat-mini-program" ? "settings.dataManagement.publishedApps.miniprogramOfflineConfirmBtn" : "settings.dataManagement.publishedApps.unpublishConfirmBtn"),
				cancelText: t("settings.dataManagement.publishedApps.unpublishCancelBtn"),
				onClose: () => setPendingUnpublish(null),
				onConfirm: () => {
					if (pendingUnpublish) {
						handleUnpublish(pendingUnpublish);
						setPendingUnpublish(null);
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ConfirmDialog, {
				visible: !!pendingDelete,
				title: t("settings.dataManagement.publishedApps.deleteConfirmTitle"),
				content: t("settings.dataManagement.publishedApps.deleteConfirmContent", { name: pendingDelete?.name || "" }),
				confirmText: deleting ? t("settings.dataManagement.publishedApps.deleting") : t("settings.dataManagement.publishedApps.deleteConfirmBtn"),
				confirmDisabled: deleting,
				cancelText: t("settings.dataManagement.publishedApps.deleteCancelBtn"),
				onClose: () => {
					if (!deleting) setPendingDelete(null);
				},
				onConfirm: confirmDelete
			})
		]
	});
}
var import_react$4, import_jsx_runtime$3, RESULT_TOAST_DURATION_MS;
var init_PublishedAppsList = __esmMin((() => {
	init_DataManagementPanel$1();
	init_src$2();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_conversations_context();
	init_useI18n();
	init_services();
	init_clipboard();
	init_SettingsContext();
	init_SettingsHeaderOverrideContext();
	init_settings_jump();
	init_published_apps();
	init_build_deploy_params();
	init_miniprogram_management_api();
	init_use_visible_refresh();
	import_jsx_runtime$3 = require_jsx_runtime();
	RESULT_TOAST_DURATION_MS = 5e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/use-infinite-scroll.ts
function useInfiniteScroll(options) {
	const { hasMore, loading, onLoadMore, rootMargin = 120 } = options;
	const rootRef = (0, import_react$3.useRef)(null);
	const sentinelRef = (0, import_react$3.useRef)(null);
	const stateRef = (0, import_react$3.useRef)({
		hasMore,
		loading,
		onLoadMore
	});
	stateRef.current = {
		hasMore,
		loading,
		onLoadMore
	};
	const tryLoad = (0, import_react$3.useCallback)(() => {
		const { hasMore: more, loading: busy, onLoadMore: load } = stateRef.current;
		if (more && !busy) load();
	}, []);
	(0, import_react$3.useEffect)(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) tryLoad();
		}, {
			root: rootRef.current ?? null,
			rootMargin: `0px 0px ${rootMargin}px 0px`,
			threshold: 0
		});
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [
		tryLoad,
		rootMargin,
		hasMore,
		loading
	]);
	(0, import_react$3.useEffect)(() => {
		const sentinel = sentinelRef.current;
		const root = rootRef.current;
		if (!sentinel || !root || !hasMore || loading) return;
		const sRect = sentinel.getBoundingClientRect();
		const rRect = root.getBoundingClientRect();
		if (sRect.top <= rRect.bottom + rootMargin) tryLoad();
	}, [
		hasMore,
		loading,
		rootMargin,
		tryLoad
	]);
	return {
		rootRef,
		sentinelRef
	};
}
var import_react$3;
var init_use_infinite_scroll = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SharedFilesList.tsx
/** Shared Files List 内容组件（Tab 内嵌，无 back-header） */
function SharedFilesList() {
	const t = useTranslation();
	const adapter = useAdapter();
	const setJumpToConversationId = useOptionalConversations()?.setJumpToConversationId;
	const { closeSettings } = useSettings();
	const { navigateMain } = useSettingsNavigate();
	const [files, setFiles] = (0, import_react$2.useState)([]);
	const [loading, setLoading] = (0, import_react$2.useState)(true);
	const [loadingMore, setLoadingMore] = (0, import_react$2.useState)(false);
	const [hasMore, setHasMore] = (0, import_react$2.useState)(false);
	const [currentPage, setCurrentPage] = (0, import_react$2.useState)(1);
	const handleTaskClick = (0, import_react$2.useCallback)((taskId) => {
		if (!taskId) return;
		jumpFromSettings({
			navigateMain,
			route: "conversation",
			payload: { conversationId: taskId },
			fallback: () => {
				setJumpToConversationId?.(taskId);
				closeSettings();
			}
		});
	}, [
		navigateMain,
		setJumpToConversationId,
		closeSettings
	]);
	const handleCopyLink = (0, import_react$2.useCallback)(async (file) => {
		if (file.shareUrl) {
			if (await copyToClipboard(file.shareUrl)) toast.success(t("settings.dataManagement.sharedFiles.copyLinkSuccess"));
			else toast.error(t("settings.dataManagement.sharedFiles.copyLinkFailed"));
		}
	}, [t]);
	const handleDownload = (0, import_react$2.useCallback)(async (file) => {
		if (!file.shareCode) {
			toast.error("Missing share code");
			return;
		}
		const backendProvider = adapter?.getBackendProvider?.();
		if (!backendProvider?.downloadShareFile) {
			console.warn(`${LOG_PREFIX} downloadShareFile not available`);
			toast.error("Download not available");
			return;
		}
		try {
			const result = await backendProvider.downloadShareFile(file.shareCode);
			if (!result.success) {
				console.error(`${LOG_PREFIX} downloadShareFile failed:`, JSON.stringify(result));
				toast.error(result.error || "Download failed");
				return;
			}
			if (!result.downloadUrl) return;
			if (adapter?.saveFileToLocal) {
				const saveResult = await adapter.saveFileToLocal(result.downloadUrl, file.name);
				if (!saveResult.success && saveResult.error !== "User cancelled") toast.error(saveResult.error || "Download failed");
				return;
			}
			if (adapter?.openExternal) adapter.openExternal(result.downloadUrl);
			else window.open(result.downloadUrl, "_blank");
		} catch (err) {
			console.error(`${LOG_PREFIX} downloadShareFile error:`, err);
			toast.error("Download failed");
		}
	}, [adapter]);
	/**
	* 取消分享的底层执行：把「收回公开权限 / 取消发布网站 / 禁用网盘链接」三个接口
	* 统一收敛到 Promise.all 并行执行，返回每个步骤的成败，供上层按步骤提示。
	* - 普通文件：仅执行「禁用网盘链接」；
	* - 资料库文件：执行「收回公开权限」+（HTML 产物）「取消发布网站」+（有 shareCode 时）「禁用网盘链接」。
	* 每个子接口自身 catch，单个接口失败不中断其他接口，最终汇总到 failedSteps。
	*/
	const performCancelShare = (0, import_react$2.useCallback)(async (file) => {
		const backendProvider = adapter?.getBackendProvider?.();
		const failedSteps = [];
		const tasks = [];
		if (file.isLibrary) {
			const nodeId = file.libraryNodeId;
			if (!nodeId || !backendProvider?.setPublicPermission) {
				console.warn(`${LOG_PREFIX} setPublicPermission unavailable:`, {
					nodeId,
					hasApi: !!backendProvider?.setPublicPermission
				});
				failedSteps.push("permission");
			} else tasks.push(backendProvider.setPublicPermission({
				nodeId,
				policy: "private"
			}).then((res) => {
				if (!res?.success) {
					console.error(`${LOG_PREFIX} setPublicPermission failed:`, JSON.stringify(res));
					failedSteps.push("permission");
				}
			}).catch((err) => {
				console.error(`${LOG_PREFIX} setPublicPermission error:`, err);
				failedSteps.push("permission");
			}));
			if (/\.html?$/i.test(file.name)) {
				if (!nodeId || !backendProvider?.unpublishPage) {
					console.warn(`${LOG_PREFIX} unpublishPage unavailable:`, {
						nodeId,
						hasApi: !!backendProvider?.unpublishPage
					});
					failedSteps.push("unpublish");
				} else tasks.push(backendProvider.unpublishPage({ fileId: nodeId }).then((res) => {
					if (res == null) {
						console.error(`${LOG_PREFIX} unpublishPage failed:`, JSON.stringify(res));
						failedSteps.push("unpublish");
					}
				}).catch((err) => {
					console.error(`${LOG_PREFIX} unpublishPage error:`, err);
					failedSteps.push("unpublish");
				}));
			}
		}
		if (file.shareCode) {
			if (!backendProvider?.setShareEnabled) {
				console.warn(`${LOG_PREFIX} setShareEnabled unavailable:`, {
					shareCode: file.shareCode,
					hasApi: !!backendProvider?.setShareEnabled
				});
				failedSteps.push("disableLink");
			} else tasks.push(backendProvider.setShareEnabled(file.shareCode, false).then((res) => {
				if (!res.success) {
					console.error(`${LOG_PREFIX} setShareEnabled failed:`, JSON.stringify(res));
					failedSteps.push("disableLink");
				}
			}).catch((err) => {
				console.error(`${LOG_PREFIX} setShareEnabled error:`, err);
				failedSteps.push("disableLink");
			}));
		} else if (!file.isLibrary) {
			console.warn(`${LOG_PREFIX} missing shareCode for non-library file:`, {
				id: file.id,
				name: file.name
			});
			failedSteps.push("disableLink");
		}
		await Promise.all(tasks);
		return {
			success: failedSteps.length === 0,
			failedSteps
		};
	}, [adapter]);
	const handleCancelShare = (0, import_react$2.useCallback)(async (file) => {
		const outcome = await performCancelShare(file);
		if (outcome.success) {
			toast.success(t("settings.dataManagement.sharedFiles.cancelShareSuccess"));
			setFiles((prev) => prev.filter((item) => item.id !== file.id));
			return;
		}
		const sep = getLocale() === "en" ? ", " : "、";
		const steps = outcome.failedSteps.map((step) => t(STEP_I18N_KEYS[step])).join(sep);
		toast.error(t("settings.dataManagement.sharedFiles.cancelShareFailedWithSteps", { steps }));
	}, [
		performCancelShare,
		setFiles,
		t
	]);
	const handleGoToLibrary = (0, import_react$2.useCallback)((file) => {
		jumpFromSettings({
			navigateMain,
			route: "space-library",
			payload: file.libraryNodeId ? { nodeId: file.libraryNodeId } : {},
			fallback: () => {
				closeSettings();
				openLibraryTarget(file.libraryNodeId ? {
					kind: "node",
					nodeId: file.libraryNodeId
				} : { kind: "home" }).catch(() => void 0);
			}
		});
	}, [navigateMain, closeSettings]);
	const mapRecordsToItems = (0, import_react$2.useCallback)((records) => records.map((record) => {
		const isLibrary = record.metadata?.source === "library";
		const libraryNodeId = typeof record.metadata?.nodeBlockId === "string" && record.metadata.nodeBlockId ? record.metadata.nodeBlockId : void 0;
		const shareUrl = isLibrary && typeof record.shareUrl === "string" && record.shareUrl ? record.shareUrl : record.shareCode ? `${getShareBaseUrl()}${getCurrentWebBasename()}/share/${record.shareCode}?platform=${getSharePlatformId()}` : void 0;
		return {
			id: String(record.id),
			name: record.name,
			taskName: record.metadata?.taskName || record.filePaths?.[0] || record.name,
			taskId: record.metadata?.taskId,
			sharedAt: record.createdAt ? new Date(record.createdAt).toLocaleString(getLocale().startsWith("zh") ? "zh-CN" : "en-GB", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit"
			}) : "",
			shareUrl,
			shareCode: record.shareCode,
			isLibrary,
			libraryNodeId
		};
	}), []);
	const fetchShareList = (0, import_react$2.useCallback)((page, append, silent = false) => {
		const backendProvider = adapter?.getBackendProvider?.();
		if (!backendProvider?.getShareList) {
			console.warn(`${LOG_PREFIX} getShareList not available`);
			setLoading(false);
			return;
		}
		if (append) setLoadingMore(true);
		else if (!silent) setLoading(true);
		backendProvider.getShareList({
			page,
			pageSize: PAGE_SIZE
		}).then((result) => {
			if (result.success) {
				const items = mapRecordsToItems(result.records);
				setFiles((prev) => append ? [...prev, ...items] : items);
				setCurrentPage(result.page);
				setHasMore(result.page * PAGE_SIZE < result.total);
			} else {
				console.error(`${LOG_PREFIX} getShareList failed:`, JSON.stringify(result));
				if (!append && !silent) setFiles([]);
			}
		}).catch((err) => {
			console.error(`${LOG_PREFIX} getShareList error:`, err);
			if (!append && !silent) setFiles([]);
		}).finally(() => {
			if (!silent) setLoading(false);
			setLoadingMore(false);
		});
	}, [adapter, mapRecordsToItems]);
	const handleLoadMore = (0, import_react$2.useCallback)(() => {
		if (loadingMore || !hasMore) return;
		fetchShareList(currentPage + 1, true);
	}, [
		loadingMore,
		hasMore,
		currentPage,
		fetchShareList
	]);
	const { rootRef: listScrollRef, sentinelRef } = useInfiniteScroll({
		hasMore,
		loading: loading || loadingMore,
		onLoadMore: handleLoadMore
	});
	(0, import_react$2.useEffect)(() => {
		fetchShareList(1, false);
	}, [fetchShareList]);
	useVisibleRefresh({ reload: (0, import_react$2.useCallback)(() => {
		fetchShareList(1, false, true);
	}, [fetchShareList]) });
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "data-management-panel__tab-content",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "data-management-panel__list-status",
			children: t("settings.dataManagement.sharedFiles.loading")
		}) : files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "data-management-panel__list-status",
			children: t("settings.dataManagement.sharedFiles.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "data-management-panel__list",
			ref: listScrollRef,
			children: [
				files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "data-management-panel__list-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "data-management-panel__list-info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "data-management-panel__list-title-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "data-management-panel__list-title",
								title: file.name,
								children: file.name
							}), file.taskId && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
								content: t("settings.dataManagement.sharedTasks.viewTask"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
									variant: "ghost",
									size: "small",
									iconOnly: true,
									className: "data-management-panel__list-jump",
									"aria-label": t("settings.dataManagement.sharedTasks.viewTask"),
									onClick: () => handleTaskClick(file.taskId),
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(WbJumpIcon, {})
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "data-management-panel__list-subtitle",
							children: file.sharedAt
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "data-management-panel__actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
								content: t("settings.dataManagement.sharedFiles.copyLink"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
									variant: "ghost",
									size: "small",
									iconOnly: true,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ShareCopyIcon, {}),
									"aria-label": t("settings.dataManagement.sharedFiles.copyLink"),
									"data-track-id": "data_manage_copy_link",
									"data-track-name": "复制链接",
									onClick: () => handleCopyLink(file)
								})
							}),
							file.isLibrary && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
								content: t("settings.dataManagement.sharedFiles.goToLibrary"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
									variant: "ghost",
									size: "small",
									iconOnly: true,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LibraryIcon, {}),
									"aria-label": t("settings.dataManagement.sharedFiles.goToLibrary"),
									"data-track-id": "data_manage_go_library",
									"data-track-name": "去资料库管理",
									onClick: () => handleGoToLibrary(file)
								})
							}),
							!file.isLibrary && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
								content: t("settings.dataManagement.sharedFiles.download"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
									variant: "ghost",
									size: "small",
									iconOnly: true,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DownloadTrayIcon, {}),
									"aria-label": t("settings.dataManagement.sharedFiles.download"),
									"data-track-id": "data_manage_download",
									"data-track-name": "下载",
									onClick: () => handleDownload(file)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
								content: t("settings.dataManagement.sharedFiles.cancelShare"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
									variant: "ghost",
									size: "small",
									iconOnly: true,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ShareUnlinkIcon, {}),
									"aria-label": t("settings.dataManagement.sharedFiles.cancelShare"),
									"data-track-id": "data_manage_cancel_share",
									"data-track-name": "取消分享",
									onClick: () => handleCancelShare(file)
								})
							})
						]
					})]
				}, file.id)),
				loadingMore && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "data-management-panel__list-loading-more",
					children: t("settings.dataManagement.sharedFiles.loading")
				}),
				hasMore && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					ref: sentinelRef,
					className: "data-management-panel__list-sentinel",
					"aria-hidden": true
				})
			]
		})
	});
}
var import_react$2, import_jsx_runtime$2, PAGE_SIZE, LOG_PREFIX, STEP_I18N_KEYS;
var init_SharedFilesList = __esmMin((() => {
	init_src$2();
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_conversations_context();
	init_i18n();
	init_useI18n();
	init_library_target();
	init_basename();
	init_clipboard();
	init_environment();
	init_SettingsContext();
	init_settings_jump();
	init_use_infinite_scroll();
	init_use_visible_refresh();
	import_jsx_runtime$2 = require_jsx_runtime();
	PAGE_SIZE = 10;
	LOG_PREFIX = "[SharedFilesList]";
	STEP_I18N_KEYS = {
		permission: "settings.dataManagement.sharedFiles.cancelStepPermission",
		unpublish: "settings.dataManagement.sharedFiles.cancelStepUnpublish",
		disableLink: "settings.dataManagement.sharedFiles.cancelStepDisableLink"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SharedTasksList.tsx
/** Shared Tasks List 内容组件（Tab 内嵌，无 back-header） */
function SharedTasksList() {
	const t = useTranslation();
	const adapter = useAdapter();
	const [tasks, setTasks] = (0, import_react$1.useState)([]);
	const [loading, setLoading] = (0, import_react$1.useState)(true);
	const [loadingMore, setLoadingMore] = (0, import_react$1.useState)(false);
	const [hasMore, setHasMore] = (0, import_react$1.useState)(false);
	const [currentPage, setCurrentPage] = (0, import_react$1.useState)(1);
	const handleCopyLink = (0, import_react$1.useCallback)(async (task) => {
		if (task.shareUrl) {
			if (await copyToClipboard(task.shareUrl)) toast.success(t("settings.dataManagement.sharedTasks.copyLinkSuccess"));
			else toast.error(t("settings.dataManagement.sharedTasks.copyLinkFailed"));
		}
	}, [t]);
	const handleCancelShare = (0, import_react$1.useCallback)(async (task) => {
		if (!task.shareCode) {
			toast.error("Missing share code");
			return;
		}
		const backendProvider = adapter?.getBackendProvider?.();
		if (!backendProvider?.deleteTaskShare) {
			console.warn("[DataManagementPanel] deleteTaskShare not available");
			toast.error("Cancel share not available");
			return;
		}
		try {
			const result = await backendProvider.deleteTaskShare(task.shareCode);
			if (result.success) {
				toast.success(t("settings.dataManagement.sharedTasks.cancelShareSuccess"));
				setTasks((prev) => prev.filter((item) => item.id !== task.id));
			} else toast.error(result.error || t("settings.dataManagement.sharedTasks.cancelShareFailed"));
		} catch (err) {
			console.error("[DataManagementPanel] deleteTaskShare error:", err);
			toast.error(t("settings.dataManagement.sharedTasks.cancelShareFailed"));
		}
	}, [t, adapter]);
	const mapRecordsToItems = (0, import_react$1.useCallback)((records) => records.map((record) => ({
		id: String(record.id),
		name: record.name || "",
		artifactCount: record.artifactCount ?? 0,
		sharedAt: record.createdAt ? new Date(record.createdAt).toLocaleString(getLocale().startsWith("zh") ? "zh-CN" : "en-GB", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		}) : "",
		shareUrl: record.shareUrl || (record.shareCode ? `${getShareBaseUrl()}${getCurrentWebBasename()}/tasks/share/${record.shareCode}` : void 0),
		shareCode: record.shareCode,
		status: record.status,
		isPermanent: record.isPermanent
	})), []);
	const fetchTaskShareList = (0, import_react$1.useCallback)((page, append, silent = false) => {
		const backendProvider = adapter?.getBackendProvider?.();
		if (!backendProvider?.getTaskShareList) {
			console.warn("[DataManagementPanel] getTaskShareList not available");
			setLoading(false);
			return;
		}
		if (append) setLoadingMore(true);
		else if (!silent) setLoading(true);
		backendProvider.getTaskShareList({
			page,
			pageSize: TASK_PAGE_SIZE
		}).then((result) => {
			if (result.success) {
				const items = mapRecordsToItems(result.records);
				setTasks((prev) => append ? [...prev, ...items] : items);
				setCurrentPage(result.page);
				setHasMore(result.page * TASK_PAGE_SIZE < result.total);
			} else {
				console.error("[DataManagementPanel] getTaskShareList failed:", result.error);
				if (!append && !silent) setTasks([]);
			}
		}).catch((err) => {
			console.error("[DataManagementPanel] getTaskShareList error:", err);
			if (!append && !silent) setTasks([]);
		}).finally(() => {
			if (!silent) setLoading(false);
			setLoadingMore(false);
		});
	}, [adapter, mapRecordsToItems]);
	const handleLoadMore = (0, import_react$1.useCallback)(() => {
		if (loadingMore || !hasMore) return;
		fetchTaskShareList(currentPage + 1, true);
	}, [
		loadingMore,
		hasMore,
		currentPage,
		fetchTaskShareList
	]);
	const { rootRef: listScrollRef, sentinelRef } = useInfiniteScroll({
		hasMore,
		loading: loading || loadingMore,
		onLoadMore: handleLoadMore
	});
	(0, import_react$1.useEffect)(() => {
		fetchTaskShareList(1, false);
	}, [fetchTaskShareList]);
	useVisibleRefresh({ reload: (0, import_react$1.useCallback)(() => {
		fetchTaskShareList(1, false, true);
	}, [fetchTaskShareList]) });
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "data-management-panel__tab-content",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "data-management-panel__list-status",
			children: t("settings.dataManagement.sharedTasks.loading")
		}) : tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "data-management-panel__list-status",
			children: t("settings.dataManagement.sharedTasks.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "data-management-panel__list",
			ref: listScrollRef,
			children: [
				tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "data-management-panel__list-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "data-management-panel__list-info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "data-management-panel__list-title",
							title: task.name,
							children: task.name
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "data-management-panel__list-subtitle",
							children: task.sharedAt
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "data-management-panel__actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
							content: t("settings.dataManagement.sharedTasks.copyLink"),
							placement: "top",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareCopyIcon, {}),
								"aria-label": t("settings.dataManagement.sharedTasks.copyLink"),
								onClick: () => handleCopyLink(task)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
							content: t("settings.dataManagement.sharedTasks.cancelShare"),
							placement: "top",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareUnlinkIcon, {}),
								"aria-label": t("settings.dataManagement.sharedTasks.cancelShare"),
								onClick: () => handleCancelShare(task)
							})
						})]
					})]
				}, task.id)),
				loadingMore && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "data-management-panel__list-loading-more",
					children: t("settings.dataManagement.sharedTasks.loading")
				}),
				hasMore && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					ref: sentinelRef,
					className: "data-management-panel__list-sentinel",
					"aria-hidden": true
				})
			]
		})
	});
}
var import_react$1, import_jsx_runtime$1, TASK_PAGE_SIZE;
var init_SharedTasksList = __esmMin((() => {
	init_src$2();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_i18n();
	init_useI18n();
	init_basename();
	init_clipboard();
	init_environment();
	init_use_infinite_scroll();
	init_use_visible_refresh();
	import_jsx_runtime$1 = require_jsx_runtime();
	TASK_PAGE_SIZE = 10;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/DataManagementPanel.tsx
/** Genie 应用跳转提示：发布应用 Tab 的内容，点击「前往应用」跳转到 /genie 应用列表页。 */
function GoToGenieApps({ onGo }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "data-management-panel__go-genie",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			size: "small",
			onClick: onGo,
			children: t("settings.dataManagement.goToApps")
		})
	});
}
/** Data Management Panel */
function DataManagementPanel({ subRoute }) {
	const t = useTranslation();
	const isShareEnabled = useShareFeature();
	const isPublishedAppsEnabled = usePublishedAppsFeature() && !isAgentsWeb();
	const isArchivedTasksEnabled = useArchivedTasksFeature();
	const { closeSettings } = useSettings();
	const { navigateMain } = useSettingsNavigate();
	const navigate = useNavigate();
	const { enabled: genieAgentEnabled, loading: genieAgentLoading } = useGenieAgentEnabled();
	const shouldGoToGenie = genieAgentEnabled && !genieAgentLoading;
	/**
	* 「发布的应用」是否进入了二级页（云服务）。
	*
	* 二级页要独占整个面板：外层 header 已被二级页覆盖成「返回 + 云服务」，
	* 此时四个 Tab 还留在下面会让人以为仍在列表层级，且 Tab 一点就跳走、把二级页顶掉。
	* 所以进二级页就把 Tab 条藏掉（内容仍在 Tab 内渲染，不动 PublishedAppsList 的挂载）。
	*/
	const [subViewOpen, setSubViewOpen] = (0, import_react.useState)(false);
	const goToGenie = (0, import_react.useCallback)(() => {
		jumpFromSettings({
			navigateMain,
			route: "genie",
			fallback: () => {
				closeSettings();
				navigate("/genie");
			}
		});
	}, [
		navigateMain,
		closeSettings,
		navigate
	]);
	const tabItems = [];
	if (isShareEnabled) {
		tabItems.push({
			key: "files",
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "cb-font-size-fixed",
				children: t("settings.dataManagement.sharedFiles")
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedFilesList, {})
		});
		tabItems.push({
			key: "tasks",
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "cb-font-size-fixed",
				children: t("settings.dataManagement.sharedTasks")
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedTasksList, {})
		});
	}
	if (isPublishedAppsEnabled) tabItems.push({
		key: "apps",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "cb-font-size-fixed",
			children: t("settings.dataManagement.publishedApps")
		}),
		children: shouldGoToGenie ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoToGenieApps, { onGo: goToGenie }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishedAppsList, { onSubViewChange: setSubViewOpen })
	});
	if (isArchivedTasksEnabled) tabItems.push({
		key: "archived",
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "cb-font-size-fixed",
			children: t("settings.dataManagement.archivedTasks")
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivedTasksList, {})
	});
	const resolveSubRouteTab = (0, import_react.useCallback)(() => {
		if (subRoute === "archivedTasks" && isArchivedTasksEnabled) return "archived";
		if (subRoute === "publishedApps" && isPublishedAppsEnabled) return "apps";
	}, [
		subRoute,
		isArchivedTasksEnabled,
		isPublishedAppsEnabled
	]);
	const defaultTab = resolveSubRouteTab() ?? tabItems[0]?.key ?? "files";
	const [activeTab, setActiveTab] = (0, import_react.useState)(defaultTab);
	(0, import_react.useEffect)(() => {
		const target = resolveSubRouteTab();
		if (target) setActiveTab(target);
	}, [
		subRoute,
		isArchivedTasksEnabled,
		isPublishedAppsEnabled,
		resolveSubRouteTab
	]);
	(0, import_react.useEffect)(() => {
		if (tabItems.length === 0) return;
		if (!tabItems.some((item) => item.key === activeTab)) setActiveTab(tabItems[0].key);
	}, [
		isShareEnabled,
		isPublishedAppsEnabled,
		isArchivedTasksEnabled,
		shouldGoToGenie,
		activeTab,
		tabItems
	]);
	useSitesPageShow({
		active: activeTab === "apps",
		pageURL: "sites_app_management"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `data-management-panel${subViewOpen ? " data-management-panel--subview" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "data-management-panel__tabs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				className: "data-management-panel__tabs-inner",
				type: subViewOpen ? "default" : "button",
				size: "m",
				items: tabItems,
				activeKey: activeTab,
				onChange: setActiveTab
			})
		})
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_DataManagementPanel$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_product_features();
	init_use_genie_agent_enabled();
	init_use_sites_page_show();
	init_useI18n();
	init_environment();
	init_SettingsContext();
	init_settings_jump();
	init_ArchivedTasksList();
	init_PublishedAppsList();
	init_SharedFilesList();
	init_SharedTasksList();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { DataManagementPanel };
