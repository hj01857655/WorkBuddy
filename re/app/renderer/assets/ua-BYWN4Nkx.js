import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/utils/ua.ts
/**
* 是否在微信小程序内嵌 webview 中。
* 普通微信浏览器（MicroMessenger）不会注入 'miniProgram'，只有 web-view 组件
* 加载的页面 UA 才会含此关键字。
*/
function isWXMiniProgram() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	return /miniProgram/i.test(ua);
}
var init_ua = __esmMin((() => {}));
//#endregion
export { isWXMiniProgram as n, init_ua as t };
