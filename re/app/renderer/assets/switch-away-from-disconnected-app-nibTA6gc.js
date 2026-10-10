import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { CY as init_industry_store, SY as industryStore, yY as clearIndustrySelection } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/agent-ui/src/modules/industry/switch-away-from-disconnected-app.ts
/**
* 撤销授权后若当前就在该 Buddy 应用里，切回通用版。
* 返回是否确实清了选中（供主窗口决定要不要回首页）。
*/
function switchAwayFromDisconnectedApp(applicationId) {
	const id = applicationId.trim();
	if (!id) return false;
	const state = industryStore.getState();
	if ((state.currentContext?.applicationId?.trim() || state.templates.find((item) => item.templateId === state.selectedTemplateId)?.applicationId?.trim()) !== id) return false;
	clearIndustrySelection();
	return true;
}
var init_switch_away_from_disconnected_app = __esmMin((() => {
	init_industry_store();
}));
//#endregion
export { switchAwayFromDisconnectedApp as n, init_switch_away_from_disconnected_app as t };
