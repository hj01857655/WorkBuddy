import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { m5 as init_src, n7 as Dropdown } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/conversation-list/split-action-button.tsx
/** 向上查找第一个可滚动祖先 */
function findScrollableAncestor(el) {
	let current = el.parentElement;
	while (current) {
		const { overflow, overflowY } = getComputedStyle(current);
		if (/(auto|scroll)/.test(overflow + overflowY)) return current;
		current = current.parentElement;
	}
	return null;
}
var import_react, import_jsx_runtime, PRIMARY_MENU_KEY, ChevronIcon, SplitActionButton;
var init_split_action_button = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime = require_jsx_runtime();
	PRIMARY_MENU_KEY = "__primary__";
	ChevronIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 6L8 10L12 6",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	SplitActionButton = ({ primaryLabel, onPrimaryClick, secondaryItems = [], disabled = false, className, moreLabel = "更多操作", includePrimaryInMenu = false }) => {
		const [open, setOpen] = (0, import_react.useState)(false);
		const groupRef = (0, import_react.useRef)(null);
		const handlePrimary = (0, import_react.useCallback)((e) => {
			e.stopPropagation();
			onPrimaryClick();
		}, [onPrimaryClick]);
		(0, import_react.useEffect)(() => {
			if (!open || !groupRef.current) return;
			const scrollParent = findScrollableAncestor(groupRef.current);
			if (!scrollParent) return;
			const handleScroll = () => setOpen(false);
			scrollParent.addEventListener("scroll", handleScroll, { passive: true });
			return () => scrollParent.removeEventListener("scroll", handleScroll);
		}, [open]);
		if (!(secondaryItems.length > 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "notification-action primary",
			disabled,
			onClick: handlePrimary,
			children: primaryLabel
		});
		const dropdownItems = [];
		if (includePrimaryInMenu) dropdownItems.push({
			key: PRIMARY_MENU_KEY,
			label: primaryLabel
		});
		for (const item of secondaryItems) dropdownItems.push({
			key: item.key,
			label: item.label,
			danger: item.danger,
			disabled: item.disabled
		});
		const handleSelect = (0, import_react.useCallback)((key) => {
			if (key === PRIMARY_MENU_KEY) {
				onPrimaryClick();
				return;
			}
			secondaryItems.find((i) => i.key === key)?.onClick();
		}, [secondaryItems, onPrimaryClick]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `notification-action-group${className ? ` ${className}` : ""}`,
			ref: groupRef,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "notification-action primary",
				disabled,
				onClick: handlePrimary,
				children: primaryLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
				trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "notification-action-dropdown-trigger",
					disabled,
					"aria-label": moreLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronIcon, {})
				}),
				items: dropdownItems,
				onSelect: handleSelect,
				placement: "bottom-end",
				offsetDistance: 4,
				open,
				onOpenChange: setOpen,
				disabled,
				className: "notification-action-menu",
				portalRoot: "body"
			})]
		});
	};
}));
//#endregion
export { init_split_action_button as n, SplitActionButton as t };
