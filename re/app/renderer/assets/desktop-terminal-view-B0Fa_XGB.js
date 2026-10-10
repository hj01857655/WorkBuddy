import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cu as o, Su as init_addon_fit, bu as Dl, wu as init_xterm, xu as init_xterm$1 } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { o as writeClipboardText, r as readClipboardText } from "./locale-utils-TanlkH9x.js";
import { t as useTranslation } from "./useTranslation-DoKXWcey.js";
import { i as createRendererLogger } from "./local-docs-facade-Cr4Rvoow.js";
//#region ../../packages/workbuddy-app/src/components/desktop-terminal-theme.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
init_xterm();
init_addon_fit();
init_xterm$1();
var LIGHT_THEME_FALLBACK = {
	background: "#ffffff",
	foreground: "#4d4d4d",
	cursor: "#00c29a",
	selectionBackground: "rgba(0, 0, 0, 0.9)",
	selectionForeground: "#ffffff"
};
var DARK_THEME_FALLBACK = {
	background: "#1f1f1f",
	foreground: "rgba(255, 255, 255, 0.65)",
	cursor: "#22cba8",
	selectionBackground: "#22cba8",
	selectionForeground: "#ffffff"
};
function isDarkTheme(element, theme) {
	if (theme !== "auto") return theme === "dark";
	const { body, documentElement } = element.ownerDocument;
	const themeKind = body?.getAttribute("data-vscode-theme-kind");
	return documentElement.getAttribute("data-theme") === "dark" || documentElement.classList.contains("dark") || documentElement.classList.contains("vscode-dark") || body?.classList.contains("dark") || body?.classList.contains("vscode-dark") || themeKind === "vscode-dark" || themeKind === "vscode-high-contrast";
}
function readThemeColor(style, property, fallback) {
	const visited = /* @__PURE__ */ new Set();
	let value = style.getPropertyValue(property).trim();
	while (value) {
		const reference = /^var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)$/.exec(value);
		if (!reference) return value;
		const [, referencedProperty, referencedFallback] = reference;
		if (visited.has(referencedProperty)) return referencedFallback?.trim() || fallback;
		visited.add(referencedProperty);
		value = style.getPropertyValue(referencedProperty).trim() || referencedFallback?.trim() || "";
	}
	return fallback;
}
/**
* xterm renders through canvas and cannot consume CSS variables directly.
* Resolve the shared WorkBuddy semantic tokens whenever the application theme changes.
*/
function getDesktopTerminalTheme(element, theme) {
	const fallback = isDarkTheme(element, theme) ? DARK_THEME_FALLBACK : LIGHT_THEME_FALLBACK;
	const style = element.ownerDocument.defaultView?.getComputedStyle(element);
	if (!style) return {
		...fallback,
		selectionInactiveBackground: fallback.selectionBackground,
		overviewRulerBorder: fallback.background
	};
	const background = readThemeColor(style, "--wb-bg-primary", fallback.background);
	const selectionBackground = readThemeColor(style, "--wb-control-selected-bg", fallback.selectionBackground);
	return {
		background,
		foreground: readThemeColor(style, "--wb-color-text-secondary", fallback.foreground),
		cursor: readThemeColor(style, "--wb-color-accent-brand", fallback.cursor),
		selectionBackground,
		selectionInactiveBackground: selectionBackground,
		selectionForeground: readThemeColor(style, "--wb-control-selected-fg", fallback.selectionForeground),
		overviewRulerBorder: background
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/terminal-context-menu.tsx
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_jsx_runtime = require_jsx_runtime();
function MenuIcon({ type }) {
	if (type === "copy") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: "matrix(1 0 0 1 1.58943 0.657074)",
			fillRule: "evenodd",
			d: "M3.7804 11.4101Q3.1921 11.4035 2.9264 11.3839Q2.2536 11.3344 1.8193 11.1371Q0.7581 10.6552 0.2762 9.5941Q0.079 9.1598 0.0294 8.487Q0 8.0876 0 6.9589L0 4.8155Q0 3.3828 0.0469 2.8798Q0.126 2.0311 0.4397 1.5078Q0.84 0.84 1.5078 0.4397Q2.0311 0.126 2.8798 0.0469Q3.3828 0 4.8155 0L6.0922 0Q6.7465 0 6.9587 0.0294Q7.9864 0.1715 8.7229 0.908Q9.4594 1.6445 9.6016 2.6722Q9.6309 2.8845 9.6309 3.5387L8.6137 3.5387C10.3989 3.5399 11.3221 3.5643 11.9644 4.0633C12.1299 4.1918 12.2788 4.3407 12.4073 4.5062C12.9319 5.1815 12.9319 6.1672 12.9319 8.1386L12.9319 9.2787C12.9319 11.2501 12.9319 12.2358 12.4073 12.9111C12.2788 13.0766 12.1299 13.2255 11.9644 13.354C11.2891 13.8786 10.3034 13.8786 8.332 13.8786C6.3605 13.8786 5.3748 13.8786 4.6995 13.354C4.534 13.2255 4.3852 13.0766 4.2566 12.9111C3.9691 12.5411 3.8392 12.0778 3.7804 11.4101ZM3.7346 10.205Q2.6043 10.1757 2.3155 10.0445Q1.6645 9.7489 1.3689 9.0979Q1.2 8.7261 1.2 6.9589L1.2 4.8155Q1.2 3.4386 1.2417 2.9911Q1.2955 2.4141 1.4689 2.1248Q1.7148 1.7148 2.1248 1.4689Q2.4141 1.2955 2.9911 1.2417Q3.4386 1.2 4.8155 1.2L6.0922 1.2Q6.6639 1.2 6.7943 1.218Q7.4229 1.305 7.8744 1.7565Q8.326 2.208 8.4129 2.8366Q8.4309 2.967 8.4309 3.5387L8.332 3.5387C6.3605 3.5387 5.3748 3.5387 4.6995 4.0633C4.534 4.1918 4.3852 4.3407 4.2566 4.5062C3.732 5.1815 3.732 6.1672 3.732 8.1386L3.732 9.2787C3.732 9.615 3.732 9.9226 3.7346 10.205ZM4.932 8.1386L4.932 9.2787Q4.932 10.9357 4.9899 11.4455Q5.0502 11.9767 5.2042 12.1749Q5.3054 12.3052 5.4357 12.4064Q5.6339 12.5604 6.1651 12.6207Q6.6749 12.6786 8.332 12.6786Q9.989 12.6786 10.4988 12.6207Q11.03 12.5604 11.2282 12.4064Q11.3585 12.3052 11.4597 12.1749Q11.6137 11.9767 11.674 11.4455Q11.7319 10.9357 11.7319 9.2787L11.7319 8.1386Q11.7319 6.4816 11.674 5.9718Q11.6137 5.4406 11.4597 5.2424Q11.3585 5.1121 11.2282 5.0109Q11.03 4.8569 10.4988 4.7966Q9.989 4.7387 8.332 4.7387Q6.6749 4.7387 6.1651 4.7966Q5.6339 4.8569 5.4357 5.0109Q5.3054 5.1121 5.2042 5.2424Q5.0502 5.4406 4.9899 5.9718Q4.932 6.4816 4.932 8.1386Z"
		})
	});
	if (type === "paste") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				transform: "matrix(1 0 0 1 1.76561 1.63308)",
				fillRule: "evenodd",
				d: "M12.8344 6.9769L12.8344 6.4172Q12.8344 4.0594 12.7322 3.2518Q12.5622 1.9087 11.8986 1.1788Q11.8408 1.1152 11.78 1.0544Q11.7192 0.9936 11.6555 0.9358Q10.9257 0.2722 9.5826 0.1022Q8.775 0 6.4172 0Q4.0594 0 3.2518 0.1022Q1.9087 0.2722 1.1788 0.9358Q1.117 0.992 1.0578 1.0511Q0.9952 1.1135 0.9358 1.1789Q0.2722 1.9087 0.1022 3.2518Q0 4.0594 0 6.4172L0 6.6555Q-0.0001 9.1121 0.1142 9.9547Q0.3047 11.36 1.0445 12.1056L1.0536 12.1148L1.0636 12.1247Q1.81 12.8653 3.2153 13.0558Q4.058 13.1701 6.5146 13.17L6.6033 13.17L6.6033 11.97L6.5146 11.97Q4.139 11.9701 3.3765 11.8667Q2.3697 11.7302 1.9105 11.2745L1.9038 11.2679L1.8963 11.2604Q1.4398 10.8003 1.3033 9.7936Q1.2 9.0311 1.2 6.6555L1.2 6.4172Q1.2 4.135 1.2927 3.4025Q1.4151 2.4354 1.8236 1.9861Q1.8634 1.9424 1.9052 1.9007Q1.9448 1.8612 1.9861 1.8236Q2.4354 1.4151 3.4025 1.2927Q4.135 1.2 6.4172 1.2Q8.6994 1.2 9.4319 1.2927Q10.3989 1.4151 10.8483 1.8236Q10.8908 1.8623 10.9314 1.903Q10.9721 1.9436 11.0107 1.9861Q11.4193 2.4354 11.5417 3.4025Q11.6344 4.135 11.6344 6.4172L11.6344 6.9769L12.8344 6.9769Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				transform: "matrix(1 0 0 1 5.18271 5.94669)",
				y: "-0.6",
				width: "6",
				height: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				transform: "matrix(1 0 0 1 5.18271 8.82034)",
				y: "-0.6",
				width: "3.21",
				height: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				transform: "matrix(1 0 0 1 9.59958 9.69877)",
				d: "M3.32 2.12L3.32 0L2.12 0L2.12 2.12L0 2.12L0 3.32L2.12 3.32L2.12 5.44L3.32 5.44L3.32 3.32L5.44 3.32L5.44 2.12L3.32 2.12Z"
			})
		]
	});
	if (type === "add") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: "matrix(1 0 0 1 1.5 1.49609)",
			fillRule: "evenodd",
			d: "M7.1 7.1L7.1 13L5.9 13L5.9 7.1L0 7.1L0 5.9L5.9 5.9L5.9 0L7.1 0L7.1 5.9L13 5.9L13 7.1L7.1 7.1Z"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: "matrix(1 0 0 1 0.773201 0.777823)",
			fillRule: "evenodd",
			d: "M7.5868 0.0001C7.4989 -0.0001 7.4143 0 7.3333 0.0001C7.297 0.0001 7.2614 0.0001 7.2266 0.0001C7.1914 0.0001 7.1555 0.0001 7.1189 0.0001C6.4253 -0.0005 5.4656 -0.0012 4.5 0.17C3.4838 0.3502 2.392 0.7316 1.5605 1.5636C0.1676 2.9577 0 4.8385 0 6.2804C0 7.7222 0.1678 9.6021 1.5605 10.9962C2.45 11.8863 3.5897 12.2648 4.6387 12.4298L4.7324 11.837L4.8252 11.2442C3.9083 11.1001 3.0494 10.7892 2.4092 10.1485C1.3802 9.1185 1.1993 7.6782 1.1992 6.2804C1.1992 4.8825 1.3801 3.4423 2.4092 2.4122C2.9967 1.8242 3.8153 1.5103 4.71 1.3517C5.5722 1.1988 6.4412 1.1991 7.1478 1.1993L7.2266 1.1993L7.3052 1.1993C7.3965 1.1993 7.4905 1.1993 7.5868 1.1996L7.5868 0.0001ZM13.2418 6.861C13.1877 8.0684 12.9308 9.2608 12.0439 10.1485C11.4695 10.7233 10.7192 11.0335 9.9062 11.1954C9.0891 11.3581 8.2533 11.3624 7.5342 11.3604C6.8348 11.3587 6.2261 11.7597 5.7373 12.2286C5.2367 12.709 4.7714 13.3484 4.3535 14.005L5.3662 14.6495C5.7651 14.0227 6.17 13.4771 6.5684 13.0948C6.9785 12.7013 7.2983 12.56 7.5312 12.5606C8.2453 12.5626 9.1916 12.5611 10.1406 12.3721C11.0936 12.1824 12.094 11.7954 12.8926 10.9962C14.1048 9.7828 14.389 8.2013 14.4423 6.861L13.2418 6.861Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: "matrix(1 0 0 1 9.19556 0.777834)",
			fillRule: "evenodd",
			d: "M3.61 3.6L3.61 6L2.41 6L2.41 3.6L0 3.6L0 2.4L2.41 2.4L2.41 0L3.61 0L3.61 2.4L6.02 2.4L6.02 3.6L3.61 3.6Z"
		})]
	});
}
function TerminalContextMenu({ x, y, canUseSelection, onClose, onAddToChat, onCopy, onPaste, onCreate }) {
	const menuRef = (0, import_react.useRef)(null);
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {
		const handlePointerDown = (event) => {
			if (!menuRef.current?.contains(event.target)) onClose();
		};
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("pointerdown", handlePointerDown, true);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, true);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: menuRef,
		className: "terminal-context-menu",
		role: "menu",
		style: {
			left: x,
			top: y
		},
		onContextMenu: (event) => event.preventDefault(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				"aria-label": t("terminal:addToChat"),
				disabled: !canUseSelection,
				onClick: onAddToChat,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, { type: "chat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("terminal:addToChat") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				"aria-label": t("terminal:copy"),
				disabled: !canUseSelection,
				onClick: onCopy,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, { type: "copy" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("terminal:copy") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ctrl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "C" })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				"aria-label": t("terminal:paste"),
				onClick: onPaste,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, { type: "paste" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("terminal:paste") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ctrl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "V" })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				"aria-label": `${t("terminal:new")} ${t("terminal:name")}`,
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, { type: "add" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					t("terminal:new"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "terminal-context-menu__mono",
						children: t("terminal:name")
					})
				] })]
			})
		]
	}), document.body);
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/terminal-replay.ts
function decodeTerminalBase64(data) {
	const binary = atob(data);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}
/**
* Restore the VT stream under the dimensions that were active when each output
* epoch was produced, then return the emulator to its fitted view dimensions.
*/
function writeTerminalData(terminal, data) {
	return new Promise((resolve) => terminal.write(data, resolve));
}
async function replayInitialTerminalOutput(terminal, replay, fallbackData) {
	const fittedCols = terminal.cols;
	const fittedRows = terminal.rows;
	if (replay?.length) for (const segment of replay) {
		terminal.resize(segment.cols, segment.rows);
		await writeTerminalData(terminal, decodeTerminalBase64(segment.data));
	}
	else if (fallbackData) await writeTerminalData(terminal, decodeTerminalBase64(fallbackData));
	terminal.resize(fittedCols, fittedRows);
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/terminal-resize-scheduler.ts
/**
* Coalesce a burst of container resize notifications into one trailing commit.
* The terminal emulator and backing PTY must consume the same settled layout.
*/
function createTerminalResizeScheduler(callback, settleMs) {
	let timer;
	return {
		schedule() {
			if (timer !== void 0) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = void 0;
				callback();
			}, settleMs);
		},
		dispose() {
			if (timer !== void 0) {
				clearTimeout(timer);
				timer = void 0;
			}
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/terminal-selection-menu.tsx
function AddToChatIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: "matrix(1 0 0 1 0.773201 0.777823)",
			fillRule: "evenodd",
			d: "M7.5868 0.0013C7.4989 0.0011 7.4143 0.0012 7.3333 0.0012C7.297 0.0013 7.2614 0.0013 7.2266 0.0013C7.1914 0.0013 7.1555 0.0013 7.1189 0.0012C6.4253 0.0007 5.4656 0 4.5 0.1712C3.4838 0.3514 2.392 0.7328 1.5605 1.5647C0.1676 2.9589 0 4.8397 0 6.2816C0 7.7233 0.1678 9.6033 1.5605 10.9974C2.45 11.8875 3.5897 12.266 4.6387 12.431L4.7324 11.8382L4.8252 11.2454C3.9083 11.1013 3.0494 10.7904 2.4092 10.1497C1.3802 9.1197 1.1993 7.6794 1.1992 6.2816C1.1992 4.8836 1.3801 3.4435 2.4092 2.4134C2.9967 1.8254 3.8153 1.5115 4.71 1.3528C5.5722 1.2 6.4412 1.2003 7.1478 1.2005L7.2266 1.2005L7.3052 1.2005C7.3965 1.2005 7.4905 1.2004 7.5868 1.2007L7.5868 0.0013ZM13.2418 6.8622C13.1877 8.0696 12.9308 9.262 12.0439 10.1497C11.4695 10.7245 10.7192 11.0347 9.9062 11.1966C9.0891 11.3593 8.2533 11.3636 7.5342 11.3616C6.8348 11.3599 6.2261 11.7609 5.7373 12.2298C5.2367 12.7102 4.7714 13.3496 4.3535 14.0062L5.3662 14.6507C5.7651 14.0239 6.17 13.4783 6.5684 13.096C6.9785 12.7025 7.2983 12.5612 7.5312 12.5618C8.2453 12.5638 9.1916 12.5623 10.1406 12.3733C11.0936 12.1836 12.094 11.7966 12.8926 10.9974C14.1048 9.784 14.389 8.2025 14.4423 6.8622L13.2418 6.8622Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: "matrix(1 0 0 1 9.19556 0.777834)",
			fillRule: "evenodd",
			d: "M3.61 3.6L3.61 6L2.41 6L2.41 3.6L0 3.6L0 2.4L2.41 2.4L2.41 0L3.61 0L3.61 2.4L6.02 2.4L6.02 3.6L3.61 3.6Z"
		})]
	});
}
function TerminalSelectionMenu({ x, y, onClose, onAddToChat }) {
	const menuRef = (0, import_react.useRef)(null);
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {
		const handlePointerDown = (event) => {
			if (!menuRef.current?.contains(event.target)) onClose();
		};
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("pointerdown", handlePointerDown, true);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, true);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: menuRef,
		className: "terminal-selection-menu",
		role: "menu",
		style: {
			left: x,
			top: y
		},
		onContextMenu: (event) => event.preventDefault(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			role: "menuitem",
			"aria-label": t("terminal:addToChat"),
			onClick: onAddToChat,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddToChatIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("terminal:addToChat") })]
		})
	}), document.body);
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/desktop-terminal-view.tsx
var terminalLog = createRendererLogger("desktop-terminal");
var TERMINAL_SCROLLBACK_LINES = 1e4;
var TERMINAL_CONTENT_PADDING = 20;
var XTERM_SCROLLBAR_WIDTH = 14;
var DATA_BUFFER_FLUSH_MS = 5;
var EVENT_POLL_MS = 16;
var INITIAL_FIT_MAX_FRAMES = 6;
var RESIZE_SETTLE_MS = 100;
var SELECTION_MENU_WIDTH = 118;
var SELECTION_MENU_HEIGHT = 40;
var SELECTION_MENU_VIEWPORT_GAP = 8;
var CONTEXT_MENU_WIDTH = 160;
var CONTEXT_MENU_HEIGHT = 150;
function getTerminalBridge() {
	return window.__workbuddyDevtoolsTerminal;
}
function DesktopTerminalView({ sessionId, className, onAddSelectionToChat, onCreateTerminal, theme = "auto" }) {
	const containerRef = (0, import_react.useRef)(null);
	const terminalRef = (0, import_react.useRef)();
	const themeRef = (0, import_react.useRef)(theme);
	const selectionPointerStartRef = (0, import_react.useRef)();
	const [errorMessage, setErrorMessage] = (0, import_react.useState)();
	const [selectionMenu, setSelectionMenu] = (0, import_react.useState)();
	const [contextMenu, setContextMenu] = (0, import_react.useState)();
	themeRef.current = theme;
	const closeSelectionMenu = (0, import_react.useCallback)(() => setSelectionMenu(void 0), []);
	const closeContextMenu = (0, import_react.useCallback)(() => setContextMenu(void 0), []);
	const handleTerminalPointerDown = (0, import_react.useCallback)((event) => {
		closeSelectionMenu();
		closeContextMenu();
		selectionPointerStartRef.current = event.button === 0 ? {
			pointerId: event.pointerId,
			x: event.clientX,
			y: event.clientY
		} : void 0;
	}, [closeContextMenu, closeSelectionMenu]);
	const finishSelectionAction = (0, import_react.useCallback)(() => {
		terminalRef.current?.clearSelection();
		setSelectionMenu(void 0);
	}, []);
	const handleTerminalPointerUp = (0, import_react.useCallback)((event) => {
		const pointerStart = selectionPointerStartRef.current;
		selectionPointerStartRef.current = void 0;
		if (event.button !== 0) return;
		if (!(pointerStart && pointerStart.pointerId === event.pointerId && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) >= 3)) {
			setSelectionMenu(void 0);
			return;
		}
		closeContextMenu();
		if (!onAddSelectionToChat) {
			setSelectionMenu(void 0);
			return;
		}
		const { clientX, clientY } = event;
		requestAnimationFrame(() => {
			const selectedText = terminalRef.current?.getSelection() ?? "";
			if (!selectedText.trim()) {
				setSelectionMenu(void 0);
				return;
			}
			const maxX = Math.max(SELECTION_MENU_VIEWPORT_GAP, window.innerWidth - SELECTION_MENU_WIDTH - SELECTION_MENU_VIEWPORT_GAP);
			const maxY = Math.max(SELECTION_MENU_VIEWPORT_GAP, window.innerHeight - SELECTION_MENU_HEIGHT - SELECTION_MENU_VIEWPORT_GAP);
			setSelectionMenu({
				selectedText,
				x: Math.min(Math.max(clientX, SELECTION_MENU_VIEWPORT_GAP), maxX),
				y: Math.min(Math.max(clientY + SELECTION_MENU_VIEWPORT_GAP, SELECTION_MENU_VIEWPORT_GAP), maxY)
			});
		});
	}, [closeContextMenu, onAddSelectionToChat]);
	const handleTerminalContextMenu = (0, import_react.useCallback)((event) => {
		event.preventDefault();
		event.stopPropagation();
		closeSelectionMenu();
		const selectedText = terminalRef.current?.getSelection() ?? "";
		const maxX = Math.max(SELECTION_MENU_VIEWPORT_GAP, window.innerWidth - CONTEXT_MENU_WIDTH - SELECTION_MENU_VIEWPORT_GAP);
		const maxY = Math.max(SELECTION_MENU_VIEWPORT_GAP, window.innerHeight - CONTEXT_MENU_HEIGHT - SELECTION_MENU_VIEWPORT_GAP);
		setContextMenu({
			selectedText,
			x: Math.min(Math.max(event.clientX, SELECTION_MENU_VIEWPORT_GAP), maxX),
			y: Math.min(Math.max(event.clientY, SELECTION_MENU_VIEWPORT_GAP), maxY)
		});
	}, [closeSelectionMenu]);
	(0, import_react.useEffect)(() => {
		setSelectionMenu(void 0);
		setContextMenu(void 0);
		const container = containerRef.current;
		const bridge = getTerminalBridge();
		if (!container || !bridge) {
			setErrorMessage("Local terminal is unavailable in this environment");
			return;
		}
		let subscriptionId;
		let terminal;
		let fitAddon;
		let resizeObserver;
		let resizeScheduler;
		let resizeSubscription;
		let pollTimer;
		let flushTimer;
		let resizeTail = Promise.resolve();
		let disposed = false;
		let dataBuffer = [];
		const reportError = (error) => {
			if (!disposed) setErrorMessage(error instanceof Error ? error.message : String(error));
		};
		const reportDetachError = (targetSubscriptionId, error) => {
			terminalLog.error("[DesktopTerminal] failed to detach subscription", {
				sessionId,
				subscriptionId: targetSubscriptionId,
				error: error instanceof Error ? error.message : String(error)
			});
		};
		const flushData = () => {
			if (disposed) {
				dataBuffer = [];
				flushTimer = void 0;
				return;
			}
			const chunks = dataBuffer;
			dataBuffer = [];
			flushTimer = void 0;
			for (const chunk of chunks) terminal?.write(chunk);
		};
		const stopPolling = () => {
			if (pollTimer !== void 0) {
				clearInterval(pollTimer);
				pollTimer = void 0;
			}
			const activeSubscriptionId = subscriptionId;
			subscriptionId = void 0;
			if (activeSubscriptionId) bridge.detach(activeSubscriptionId).catch((error) => {
				reportError(error);
				reportDetachError(activeSubscriptionId, error);
			});
		};
		const init = async () => {
			setErrorMessage(void 0);
			terminal = new Dl({
				cursorBlink: true,
				cursorStyle: "bar",
				fontSize: 14,
				fontFamily: "Menlo, Monaco, Consolas, monospace",
				allowTransparency: false,
				theme: getDesktopTerminalTheme(container, themeRef.current),
				scrollback: TERMINAL_SCROLLBACK_LINES,
				overviewRuler: { width: XTERM_SCROLLBAR_WIDTH },
				reflowCursorLine: false
			});
			terminalRef.current = terminal;
			fitAddon = new o();
			terminal.loadAddon(fitAddon);
			terminal.open(container);
			const fitTerminal = () => {
				const dimensions = fitAddon?.proposeDimensions();
				if (!dimensions || !terminal) return;
				if (dimensions.cols !== terminal.cols || dimensions.rows !== terminal.rows) terminal.resize(dimensions.cols, dimensions.rows);
				return dimensions;
			};
			let previousFit;
			for (let attempt = 0; attempt < INITIAL_FIT_MAX_FRAMES; attempt += 1) {
				await new Promise((resolve) => requestAnimationFrame(() => resolve()));
				if (disposed) return;
				const fitted = fitTerminal();
				if (fitted && previousFit && fitted.cols === previousFit.cols && fitted.rows === previousFit.rows) {
					previousFit = fitted;
					break;
				}
				previousFit = fitted;
			}
			if (!previousFit) throw new Error("Terminal layout is unavailable");
			await bridge.resize(sessionId, terminal.cols, terminal.rows);
			if (disposed) return;
			const attached = await bridge.attach(sessionId);
			if (disposed) {
				await bridge.detach(attached.subscriptionId).catch((error) => {
					reportDetachError(attached.subscriptionId, error);
				});
				return;
			}
			subscriptionId = attached.subscriptionId;
			await replayInitialTerminalOutput(terminal, attached.initialReplay, attached.initialData);
			if (disposed) return;
			const queuePtyResize = (cols, rows) => {
				resizeTail = resizeTail.then(async () => {
					if (!disposed) await bridge.resize(sessionId, cols, rows);
				}).catch(reportError);
			};
			resizeSubscription = terminal.onResize(({ cols, rows }) => {
				queuePtyResize(cols, rows);
			});
			resizeScheduler = createTerminalResizeScheduler(() => {
				fitTerminal();
			}, RESIZE_SETTLE_MS);
			resizeObserver = new ResizeObserver((entries) => {
				const { width, height } = entries[0].contentRect;
				if (width <= 0 || height <= 0) return;
				resizeScheduler?.schedule();
			});
			resizeObserver.observe(container);
			terminal.onData((data) => {
				if (subscriptionId) bridge.input(subscriptionId, data).catch(reportError);
			});
			pollTimer = setInterval(() => {
				if (!subscriptionId || disposed) return;
				for (const event of bridge.poll(subscriptionId).events) if (event.type === "data") {
					dataBuffer.push(decodeTerminalBase64(event.data));
					if (flushTimer === void 0) flushTimer = setTimeout(flushData, DATA_BUFFER_FLUSH_MS);
				} else if (event.type === "error") {
					setErrorMessage(event.message);
					stopPolling();
				} else {
					setErrorMessage("Terminal process exited");
					stopPolling();
				}
			}, EVENT_POLL_MS);
		};
		init().catch(reportError);
		return () => {
			disposed = true;
			if (pollTimer !== void 0) clearInterval(pollTimer);
			if (flushTimer !== void 0) clearTimeout(flushTimer);
			if (subscriptionId) {
				const activeSubscriptionId = subscriptionId;
				bridge.detach(activeSubscriptionId).catch((error) => {
					reportDetachError(activeSubscriptionId, error);
				});
			}
			resizeObserver?.disconnect();
			resizeScheduler?.dispose();
			resizeSubscription?.dispose();
			fitAddon?.dispose();
			if (terminalRef.current === terminal) terminalRef.current = void 0;
			terminal?.dispose();
		};
	}, [sessionId]);
	(0, import_react.useEffect)(() => {
		const terminal = terminalRef.current;
		const container = containerRef.current;
		if (!terminal || !container) return;
		terminal.options.theme = getDesktopTerminalTheme(container, theme);
		terminal.refresh(0, Math.max(0, terminal.rows - 1));
	}, [theme]);
	const handleAddSelectionToChat = (0, import_react.useCallback)(() => {
		if (selectionMenu && onAddSelectionToChat) onAddSelectionToChat(selectionMenu.selectedText);
		finishSelectionAction();
	}, [
		finishSelectionAction,
		onAddSelectionToChat,
		selectionMenu
	]);
	const finishContextMenuAction = (0, import_react.useCallback)(() => {
		terminalRef.current?.clearSelection();
		terminalRef.current?.focus();
		setContextMenu(void 0);
	}, []);
	const handleContextAddToChat = (0, import_react.useCallback)(() => {
		if (contextMenu?.selectedText.trim() && onAddSelectionToChat) onAddSelectionToChat(contextMenu.selectedText);
		finishContextMenuAction();
	}, [
		contextMenu,
		finishContextMenuAction,
		onAddSelectionToChat
	]);
	const handleContextCopy = (0, import_react.useCallback)(() => {
		const selectedText = contextMenu?.selectedText ?? "";
		if (selectedText) {
			const fallback = navigator.clipboard?.writeText ? navigator.clipboard.writeText.bind(navigator.clipboard) : void 0;
			writeClipboardText(selectedText, fallback).catch((error) => {
				terminalLog.warn("[DesktopTerminal] failed to copy selection", error);
			});
		}
		finishContextMenuAction();
	}, [contextMenu, finishContextMenuAction]);
	const handleContextPaste = (0, import_react.useCallback)(() => {
		finishContextMenuAction();
		const fallback = navigator.clipboard?.readText ? navigator.clipboard.readText.bind(navigator.clipboard) : void 0;
		readClipboardText(fallback).then((text) => {
			if (text) {
				terminalRef.current?.paste(text);
				requestAnimationFrame(() => {
					terminalRef.current?.clearSelection();
					terminalRef.current?.focus();
				});
			}
		}).catch((error) => {
			terminalLog.warn("[DesktopTerminal] failed to read clipboard", error);
		});
	}, [finishContextMenuAction]);
	const handleContextCreate = (0, import_react.useCallback)(() => {
		finishContextMenuAction();
		Promise.resolve().then(() => onCreateTerminal?.()).catch((error) => {
			terminalLog.warn("[DesktopTerminal] failed to create terminal", error);
		});
	}, [finishContextMenuAction, onCreateTerminal]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		"data-component": "desktop-terminal-view",
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			paddingBlock: TERMINAL_CONTENT_PADDING,
			paddingInlineStart: TERMINAL_CONTENT_PADDING,
			paddingInlineEnd: 6,
			background: "var(--wb-bg-primary)",
			color: "var(--wb-color-text-secondary)",
			boxSizing: "border-box"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				style: {
					position: "relative",
					width: "100%",
					height: "100%",
					caretColor: "transparent"
				},
				onPointerDown: handleTerminalPointerDown,
				onPointerUp: handleTerminalPointerUp,
				onPointerCancel: () => {
					selectionPointerStartRef.current = void 0;
				},
				onContextMenuCapture: handleTerminalContextMenu
			}),
			errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					inset: 0,
					display: "grid",
					placeItems: "center",
					color: "var(--wb-color-text-tertiary)",
					fontSize: 13
				},
				children: errorMessage
			}) : null,
			selectionMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalSelectionMenu, {
				x: selectionMenu.x,
				y: selectionMenu.y,
				onClose: closeSelectionMenu,
				onAddToChat: handleAddSelectionToChat
			}) : null,
			contextMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalContextMenu, {
				x: contextMenu.x,
				y: contextMenu.y,
				canUseSelection: Boolean(contextMenu.selectedText.trim() && onAddSelectionToChat),
				onClose: closeContextMenu,
				onAddToChat: handleContextAddToChat,
				onCopy: handleContextCopy,
				onPaste: handleContextPaste,
				onCreate: handleContextCreate
			}) : null
		]
	});
}
//#endregion
export { DesktopTerminalView };
