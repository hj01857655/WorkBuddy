import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, BE as MenuItem, DJ as init_use_login_error_handler, E as init_contexts, E1 as init_useI18n, LF as init_setting, LQ as init_account$1, O1 as useTranslation, VE as init_MenuItem, xE as init_LogoutOverlay } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { Ct as getEditionConfig, wt as init_edition_config } from "./locale-utils-TanlkH9x.js";
import { B as init_LogoutItem, F as init_AccountMenuPanel, I as init_MenuSeparator, J as init_menu_icons, N as init_AccountMenuPopover, S as init_logout_confirm_dialog, V as AppearanceIcon, c as init_PlanActionButton, f as init_CreditsMenuItem, j as init_AccountAvatar, k as init_AccountMenuTrigger, n as init_UserMenu, u as init_DesktopAccountMenuItems } from "./UserMenu-Bs05nlMA.js";
var init_AccountButton = __esmMin((() => {
	require_react();
	init_contexts();
	init_useI18n();
	init_account$1();
	init_icons();
	init_use_login_error_handler();
	init_setting();
	init_AccountAvatar();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/AppearanceThemeSwitchItem.tsx
/** 主窗与独立窗口共享的浅色/深色快捷分段菜单项。 */
function AppearanceThemeSwitchItem({ theme, onThemeChange }) {
	const t = useTranslation();
	const isDark = theme === "dark" || theme === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppearanceIcon, {}),
		label: t("account.menu.appearance"),
		trackId: "avatar_menu_appearance",
		trackName: "外观设置",
		value: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
			className: "user-menu-theme-switcher",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: `user-menu-theme-switcher-thumb ${isDark ? "user-menu-theme-switcher-thumb--right" : ""}` }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: `user-menu-theme-option ${!isDark ? "user-menu-theme-option--active" : ""}`,
					onClick: (event) => {
						event.stopPropagation();
						if (isDark) onThemeChange("light");
					},
					children: t("settings.theme.light")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: `user-menu-theme-option ${isDark ? "user-menu-theme-option--active" : ""}`,
					onClick: (event) => {
						event.stopPropagation();
						if (!isDark) onThemeChange("dark");
					},
					children: t("settings.theme.dark")
				})
			]
		})
	});
}
var import_jsx_runtime$1;
var init_AppearanceThemeSwitchItem = __esmMin((() => {
	require_react();
	init_useI18n();
	init_menu_icons();
	init_MenuItem();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/EditionBadge.tsx
/**
* Edition Badge
* 显示版本类型徽章，支持 free/pro/ultimate/exclusive
*/
function EditionBadge({ editionType, hideFree = true, className }) {
	if (hideFree && (!editionType || editionType === "free")) return null;
	const config = getEditionConfig(editionType);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		style: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "flex-start",
			gap: "2px",
			height: "20px",
			padding: "0 4px",
			fontSize: "12px",
			fontWeight: 400,
			lineHeight: "20px",
			borderRadius: "6px",
			color: "var(--wb-color-text-secondary, rgba(0, 0, 0, 0.70))",
			background: "var(--wb-color-bg-primary-default, #F2F2F2)",
			textDecoration: "none"
		},
		children: config.label
	});
}
var import_jsx_runtime;
var init_EditionBadge = __esmMin((() => {
	require_react();
	init_edition_config();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/account/index.ts
var init_account = __esmMin((() => {
	init_AccountAvatar();
	init_AccountMenuPanel();
	init_AccountMenuPopover();
	init_AccountMenuTrigger();
	init_AccountButton();
	init_AppearanceThemeSwitchItem();
	init_CreditsMenuItem();
	init_DesktopAccountMenuItems();
	init_EditionBadge();
	init_edition_config();
	init_logout_confirm_dialog();
	init_LogoutOverlay();
	init_LogoutItem();
	init_MenuItem();
	init_menu_icons();
	init_MenuSeparator();
	init_UserMenu();
	init_PlanActionButton();
}));
//#endregion
export { init_AppearanceThemeSwitchItem as a, AppearanceThemeSwitchItem as i, EditionBadge as n, init_EditionBadge as r, init_account as t };
