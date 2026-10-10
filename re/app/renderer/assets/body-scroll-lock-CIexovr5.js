import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/lightbox-shell/body-scroll-lock.mjs
function n() {
	e === 0 && (t = document.body.style.overflow, document.body.style.overflow = `hidden`), e += 1;
}
function r() {
	e = Math.max(0, e - 1), e === 0 && t !== null && (document.body.style.overflow = t, t = null);
}
var e, t;
var init_body_scroll_lock = __esmMin((() => {
	e = 0;
	t = null;
}));
//#endregion
export { n, r, init_body_scroll_lock as t };
