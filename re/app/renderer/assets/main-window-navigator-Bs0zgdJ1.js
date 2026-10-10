//#region ../../packages/workbuddy-app/src/desktop/main-window-navigator.ts
var MAIN_WINDOW_NAVIGATION_ERROR_CODES = { NAVIGATE_UNAVAILABLE: "WB_WINDOWS_NAVIGATE_UNAVAILABLE" };
function resolveNavigator(windows) {
	const navigate = windows?.navigate ?? window.wb?.windows?.navigate;
	if (!navigate) throw new Error(MAIN_WINDOW_NAVIGATION_ERROR_CODES.NAVIGATE_UNAVAILABLE);
	return navigate;
}
/**
* 独立窗口统一的回主窗口导航端口。
*
* 本文件只保留投递侧最小依赖，不能静态引入主窗口 Router、资料库或设置模块。
*/
async function navigateMainWindow(request, windows) {
	await resolveNavigator(windows)({
		target: { appId: "main" },
		route: request.route,
		payload: request.payload,
		createIfMissing: true
	});
}
//#endregion
export { navigateMainWindow as t };
