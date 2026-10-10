import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Fm as formatBytes, I1 as t, Im as init_format_bytes, Mv as init_plan_upgrade, Pv as openPlanUpgrade, Qrt as init_common, c7 as Modal, j1 as init_i18n, krt as Button, m5 as init_src, zit as accountService } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { $ as netDriveServiceStore, Ct as getEditionConfig, Q as init_netdrive_service, it as init_storage_quota_exceeded_dialog, nt as STORAGE_QUOTA_DIALOG_OPEN_EVENT, rt as consumePendingStorageQuotaDialog, tt as STORAGE_QUOTA_DIALOG_CLOSE_EVENT, wt as init_edition_config } from "./locale-utils-TanlkH9x.js";
import { i as init_store, o as loadStorageCapacity, s as myFilesStore } from "./store-B9VMId-K.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/storage-quota-exceeded-dialog-host.tsx
init_common();
init_src();
var import_react = /* @__PURE__ */ __toESM(require_react());
init_i18n();
init_format_bytes();
init_plan_upgrade();
init_storage_quota_exceeded_dialog();
init_edition_config();
init_netdrive_service();
init_store();
var import_jsx_runtime = require_jsx_runtime();
/** 「去升级」埋点来源，与 `openPlanUpgrade` 约定一致 */
var PLAN_UPGRADE_SOURCE = "storage_quota_exceeded";
/**
* 读取当前账号版本显示名（如「体验版 / 标准版 / 旗舰版」）。
* 非 React 环境同步读取：`accountService.getAccount()`（`PurchaseModalHost` 同款）。
*/
function resolveEditionLabel() {
	const editionType = accountService.getAccount()?.editionType;
	return getEditionConfig(editionType).label;
}
/**
* 是否为 B 端企业账号：口径同项目通用做法，账号带非空 `enterpriseId` 视为企业账号，
* 否则视为 C 端个人账号。企业账号容量由管理员统一管理，弹窗只做纯提示、不引导个人升级。
*/
function resolveIsEnterprise() {
	return Boolean(accountService.getAccount()?.enterpriseId);
}
/**
* 拼接正文。总容量缺失时省略括号部分（用不带容量的文案模板），避免出现空括号。
* - 个人账号：「…如需更多存储空间，可升级为更高版本。」
* - 企业账号：「…如需更多存储空间，请联系企业管理员。」
*/
function buildBodyText(editionLabel, totalText, isEnterprise) {
	if (isEnterprise) return totalText ? t("share.storageQuota.bodyEnterprise", {
		edition: editionLabel,
		total: totalText
	}) : t("share.storageQuota.bodyEnterpriseNoTotal", { edition: editionLabel });
	return totalText ? t("share.storageQuota.body", {
		edition: editionLabel,
		total: totalText
	}) : t("share.storageQuota.bodyNoTotal", { edition: editionLabel });
}
/** 超容弹窗宿主：放在 App 顶层，监听 open/close 事件。 */
function StorageQuotaExceededDialogHost() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [totalCapacity, setTotalCapacity] = (0, import_react.useState)(() => myFilesStore.getState().storageCapacity?.total ?? 0);
	(0, import_react.useEffect)(() => {
		const handleOpen = () => {
			setOpen(true);
		};
		const handleClose = () => {
			setOpen(false);
		};
		window.addEventListener(STORAGE_QUOTA_DIALOG_OPEN_EVENT, handleOpen);
		window.addEventListener(STORAGE_QUOTA_DIALOG_CLOSE_EVENT, handleClose);
		if (consumePendingStorageQuotaDialog()) setOpen(true);
		return () => {
			window.removeEventListener(STORAGE_QUOTA_DIALOG_OPEN_EVENT, handleOpen);
			window.removeEventListener(STORAGE_QUOTA_DIALOG_CLOSE_EVENT, handleClose);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		return myFilesStore.subscribe((state) => {
			setTotalCapacity(state.storageCapacity?.total ?? 0);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if ((myFilesStore.getState().storageCapacity?.total ?? 0) > 0) return;
		let fetched = false;
		const isSvcReady = (svc = netDriveServiceStore.getState()) => Boolean(svc.adapter && svc.initialized && svc.tokenInfo);
		const fetchOnce = () => {
			if (fetched) return;
			if ((myFilesStore.getState().storageCapacity?.total ?? 0) > 0) return;
			fetched = true;
			loadStorageCapacity(() => netDriveServiceStore.getState().getClient(), myFilesStore, { silent: true }).catch(() => {});
		};
		if (isSvcReady()) {
			fetchOnce();
			return;
		}
		const unsubscribe = netDriveServiceStore.subscribe((svc) => {
			if (isSvcReady(svc)) {
				fetchOnce();
				unsubscribe();
			}
		});
		return unsubscribe;
	}, [open]);
	const handleClose = (0, import_react.useCallback)(() => {
		setOpen(false);
	}, []);
	const handleUpgrade = (0, import_react.useCallback)(() => {
		setOpen(false);
		openPlanUpgrade({ source: PLAN_UPGRADE_SOURCE });
	}, []);
	const isEnterprise = resolveIsEnterprise();
	const totalText = totalCapacity > 0 ? formatBytes(totalCapacity) : "";
	const bodyText = open ? buildBodyText(resolveEditionLabel(), totalText, isEnterprise) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open,
		onOpenChange: (nextOpen) => {
			if (!nextOpen) handleClose();
		},
		title: t("share.storageQuota.title"),
		variant: "confirm",
		width: 480,
		centered: true,
		wrapClassName: "storage-quota-modal-overlay",
		footer: isEnterprise ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			size: "small",
			onClick: handleClose,
			children: t("share.storageQuota.confirm")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			size: "small",
			onClick: handleClose,
			children: t("share.storageQuota.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			size: "small",
			onClick: handleUpgrade,
			children: t("share.storageQuota.upgrade")
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				color: "var(--wb-text-secondary, #595959)",
				fontSize: 14,
				lineHeight: "22px"
			},
			children: bodyText
		})
	});
}
//#endregion
export { StorageQuotaExceededDialogHost };
