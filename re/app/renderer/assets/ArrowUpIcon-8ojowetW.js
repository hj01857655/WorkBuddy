import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/hooks/use-scroll-to-top.ts
/**
* Hook that tracks scroll position and provides a smooth scroll-to-top action.
* Shows the back-to-top indicator once scrollTop exceeds the given threshold.
*/
function useScrollToTop(threshold = 300) {
	const scrollRef = (0, import_react$1.useRef)(null);
	const [showBackToTop, setShowBackToTop] = (0, import_react$1.useState)(false);
	(0, import_react$1.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const onScroll = () => {
			setShowBackToTop(el.scrollTop > threshold);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, [threshold]);
	return {
		scrollRef,
		showBackToTop,
		scrollToTop: (0, import_react$1.useCallback)(() => {
			if (scrollRef.current) scrollRef.current.scrollTop = 0;
		}, [])
	};
}
var import_react$1;
var init_use_scroll_to_top = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
})), import_jsx_runtime, ArrowUpIcon;
var init_ArrowUpIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime = require_jsx_runtime();
	ArrowUpIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 3L8 13",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3.5 7L8 3L12.5 7",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}));
//#endregion
export { useScrollToTop as i, init_ArrowUpIcon as n, init_use_scroll_to_top as r, ArrowUpIcon as t };
