import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/modules/connector/panel/oneid-refresh-throttle.ts
/**
* 判断当前时刻是否允许刷新（已过节流窗口）。
*
* @param lastRefreshAt 上次刷新的时间戳（0 表示从未刷新过）
* @param now 当前时间戳，默认 Date.now()
* @returns true 表示允许刷新（应同时更新 lastRefreshAt），false 表示被节流跳过
*/
function shouldRefreshOneidApplications(lastRefreshAt, now = Date.now()) {
	return now - lastRefreshAt >= ONEID_REFRESH_THROTTLE_MS;
}
var ONEID_REFRESH_THROTTLE_MS;
var init_oneid_refresh_throttle = __esmMin((() => {
	ONEID_REFRESH_THROTTLE_MS = 3e4;
}));
//#endregion
export { shouldRefreshOneidApplications as n, init_oneid_refresh_throttle as t };
