import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Dz as useAssistantDisplay, E as init_contexts, E1 as init_useI18n, O1 as useTranslation, Tz as init_use_assistant_display, V3 as useAdapter } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ad as Keyboard, Ba as Tooltip, Ev as require_react, Rd as HardDrive, Tv as require_jsx_runtime, Yl as init_lucide_react, nu as Workflow, t as init_src, up as CalendarDays } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/SystemPermissionsPanel.less
var init_SystemPermissionsPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SystemPermissionsPanel.tsx
/**
* System Permissions Panel
*/
function SystemPermissionsPanel({ permissionStatusMap, onAuthorizeClicked }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { name: productName = "WorkBuddy" } = useAssistantDisplay(adapter);
	const permissions = (0, import_react.useMemo)(() => [
		{
			id: "fullDiskAccess",
			titleKey: "settings.systemPermissions.fullDiskAccess",
			descriptionKey: "settings.systemPermissions.fullDiskAccessDesc",
			status: permissionStatusMap.fullDiskAccess
		},
		{
			id: "accessibility",
			titleKey: "settings.systemPermissions.accessibility",
			descriptionKey: "settings.systemPermissions.accessibilityDesc",
			status: permissionStatusMap.accessibility
		},
		{
			id: "automation",
			titleKey: "settings.systemPermissions.automation",
			descriptionKey: "settings.systemPermissions.automationDesc",
			status: permissionStatusMap.automation
		}
	], [permissionStatusMap]);
	/**
	* macOS 系统设置 URL 映射
	* - 完全磁盘访问权限: 隐私与安全性 → 完全磁盘访问权限
	* - 辅助功能: 隐私与安全性 → 辅助功能
	* - 自动化: 隐私与安全性 → 自动化
	* - 通知: 通知 → WorkBuddy
	* - 日历访问: 隐私与安全性 → 日历
	*/
	const PERMISSION_SYSTEM_URLS = {
		fullDiskAccess: "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles",
		accessibility: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility",
		automation: "x-apple.systempreferences:com.apple.preference.security?Privacy_Automation",
		calendarAccess: "x-apple.systempreferences:com.apple.preference.security?Privacy_Calendars"
	};
	const handleAuthorize = (0, import_react.useCallback)((permissionId) => {
		const url = PERMISSION_SYSTEM_URLS[permissionId];
		if (adapter && url) {
			console.log("[SystemPermissionsPanel] 用户点击\"去授权\"按钮, permissionId:", permissionId);
			onAuthorizeClicked?.(permissionId);
			adapter.emit("open-external", url);
		}
	}, [adapter, onAuthorizeClicked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "system-permissions-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "system-permissions-panel__subtitle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.systemPermissions.subtitle", { name: productName }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("settings.systemPermissions.helpTip"),
				placement: "bottom",
				maxWidth: 260,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "system-permissions-panel__help-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpIcon, {})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "system-permissions-panel__list",
			children: permissions.map((permission) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "system-permissions-panel__item",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "system-permissions-panel__item-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionTypeIcon, { permissionId: permission.id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "system-permissions-panel__item-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "system-permissions-panel__item-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "system-permissions-panel__item-title",
								children: t(permission.titleKey)
							}), !permission.hideBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `system-permissions-panel__item-badge ${permission.status === "authorized" ? "system-permissions-panel__item-badge--authorized" : "system-permissions-panel__item-badge--unauthorized"}`,
								children: permission.status === "authorized" ? t("settings.systemPermissions.authorized") : t("settings.systemPermissions.unauthorized")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "system-permissions-panel__item-desc",
							children: t(permission.descriptionKey)
						})]
					}),
					permission.status === "unauthorized" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "system-permissions-panel__item-action",
						onClick: () => handleAuthorize(permission.id),
						children: t("settings.systemPermissions.authorize")
					})
				]
			}, permission.id))
		})]
	});
}
var import_react, import_jsx_runtime, PERMISSION_ICONS, PermissionTypeIcon, HelpIcon;
//#endregion
__esmMin((() => {
	init_SystemPermissionsPanel$1();
	init_src();
	init_lucide_react();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_use_assistant_display();
	import_jsx_runtime = require_jsx_runtime();
	PERMISSION_ICONS = {
		fullDiskAccess: HardDrive,
		accessibility: Keyboard,
		automation: Workflow,
		calendarAccess: CalendarDays
	};
	PermissionTypeIcon = ({ permissionId }) => {
		const Icon = PERMISSION_ICONS[permissionId];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			"aria-hidden": "true",
			width: 18,
			height: 18,
			strokeWidth: 2
		});
	};
	HelpIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "17",
				x2: "12.01",
				y2: "17"
			})
		]
	});
}))();
export { SystemPermissionsPanel };
