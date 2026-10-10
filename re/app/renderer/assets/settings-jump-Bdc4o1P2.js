import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/components/setting/utils/settings-jump.ts
/**
* navigateMain 可用时跨窗口投递；失败时保留当前设置窗口，避免在缺少主窗
* Router Context 的独立 renderer 内执行 fallback 后只关窗、不跳转。
* 未注入 navigateMain 时才执行同窗口 fallback。
*
* 返回 void（fire-and-forget）：navigateMain 是异步投递，本函数自己 catch 兜底，
* 调用方按普通事件处理器直接调用即可，无需 await / void。
*/
function jumpFromSettings(options) {
	const { navigateMain, route, payload, fallback } = options;
	if (!navigateMain) {
		fallback();
		return;
	}
	Promise.resolve(navigateMain({
		route,
		payload
	})).catch((error) => {
		console.warn("[settings-jump] navigateMain failed; keeping settings window open:", error);
	});
}
var init_settings_jump = __esmMin((() => {}));
//#endregion
export { jumpFromSettings as n, init_settings_jump as t };
