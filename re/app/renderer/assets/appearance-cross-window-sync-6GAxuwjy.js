import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { C4 as init_appearance_storage_namespace, Qrt as init_common, b0 as writeRendererLog, c3 as getWb, l3 as init_wb_singleton, u3 as isAppCoreReady, y4 as APPEARANCE_SELECTION_CHANGED_EVENT, zZ as init_http_logger, zit as accountService } from "./ui-docs-viewer-Bo02yf1Q.js";
import { E as writeLocalState, v as init_appearance_storage } from "./appearance-runtime-eV3bJxTA.js";
//#region ../../packages/agent-ui/src/components/appearance/appearance-cross-window-sync.ts
/**
* 把当前选中的皮肤推送到 wb.config 权威源，叫醒其它窗口重读。
* 失败静默：本窗口已经生效，下次变更或对端冷启动 hydrate 时再对齐。
*/
function pushAppearanceToAuthority(resourceKey) {
	if (!isAppCoreReady() || !resourceKey || resourceKey === lastSynced) return;
	const revision = ++syncRevision;
	Promise.resolve(getWb().config.setPreference(APPEARANCE_PREF_KEY, resourceKey)).then(() => {
		if (revision === syncRevision) lastSynced = resourceKey;
	}).catch(() => {});
}
/**
* 把内置明暗推送到既有 `theme` 权威键。
*
* 主窗口已订阅该键的 changed 事件并调 `setAgentUiTheme`，所以这条通道不需要接收端。
*/
function pushAppearanceModeToAuthority(mode) {
	if (!isAppCoreReady()) return;
	Promise.resolve(getWb().config.setTheme(mode)).catch(() => {});
}
/**
* 安装跨窗口订阅：其它窗口切皮肤后，对齐本窗口 localState 并补发轻量重判事件，
* 由 AppearanceRuntimeHost 走既有的重判 → apply 链路。返回 dispose。
*/
function installAppearanceCrossWindowSync() {
	if (!isAppCoreReady()) {
		writeRendererLog("appearance", "warn", "[xwin] install-skipped reason=app-core-not-ready");
		return () => void 0;
	}
	const applyAuthoritative = (value) => {
		if (value === lastSynced) return;
		lastSynced = value;
		syncRevision += 1;
		const account = accountService.getAccount();
		if (account?.uid) writeLocalState({ currentTheme: value }, account.enterpriseId, account.uid);
		if (typeof window !== "undefined") window.dispatchEvent(new Event(APPEARANCE_SELECTION_CHANGED_EVENT));
	};
	const wb = getWb();
	const off = wb.on(APPEARANCE_PREF_CHANGED_EVENT, (payload) => {
		const value = payload && typeof payload.value === "string" ? payload.value : void 0;
		if (!value) return;
		applyAuthoritative(value);
	});
	Promise.resolve(wb.config.preference(APPEARANCE_PREF_KEY)).then((value) => {
		if (typeof value === "string" && value) applyAuthoritative(value);
	}).catch(() => {});
	return off;
}
var APPEARANCE_PREF_KEY, APPEARANCE_PREF_CHANGED_EVENT, lastSynced, syncRevision;
var init_appearance_cross_window_sync = __esmMin((() => {
	init_common();
	init_wb_singleton();
	init_http_logger();
	init_appearance_storage_namespace();
	init_appearance_storage();
	APPEARANCE_PREF_KEY = "appearanceTheme";
	APPEARANCE_PREF_CHANGED_EVENT = `config.preference.${APPEARANCE_PREF_KEY}.changed`;
	lastSynced = null;
	syncRevision = 0;
}));
//#endregion
export { pushAppearanceToAuthority as i, installAppearanceCrossWindowSync as n, pushAppearanceModeToAuthority as r, init_appearance_cross_window_sync as t };
