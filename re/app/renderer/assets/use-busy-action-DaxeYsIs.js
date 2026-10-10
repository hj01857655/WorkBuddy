import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/collab/permissions.ts
/**
* 权限位驱动的操作判断（新代码唯一入口）。
*
* @example
* ```ts
* const ctx = createPermissionContext(project.permissions);
* if (canDo(ctx, 'skill.edit')) { showEditButton(); }
* ```
*/
function canDo(ctx, permId) {
	return ctx.permissions.has(permId);
}
/**
* 从后端下发的 permissions 数组创建 PermissionContext。
* 当 permissions 为空/undefined 时返回空 Set（最小权限原则）。
*/
function createPermissionContext(permissions) {
	return { permissions: new Set(permissions ?? []) };
}
/** @deprecated 把 legacy 'owner' 映射为 PRD 规范的 'admin'。 */
function normalizeRole(role) {
	return role === "owner" ? "admin" : role;
}
/**
* 项目级权限判断 — 权限位驱动 + 角色 Fallback。
*
* 后端在项目详情/列表接口下发 `permissions: string[]`，前端通过
* ACTION_TO_PERMISSION 映射到对应权限点进行 Set.has 判断。
*
* 当 permissions 为空/undefined（后端未下发）时，fallback 到角色矩阵：
*   - owner / admin → 等同 'admin'（拥有完整管理权限）
*   - 其他角色 → 最小权限原则，全部拒绝
*
* leave 操作由前端独立判断（permissions 中不含 "leave" 的操作点）。
*/
function canProject(project, action) {
	if (action === "leave") {
		if (project.permissions && project.permissions.length > 0) return !project.permissions.includes("project.delete");
		if (project.roleId !== void 0) return project.roleId !== "project.owner";
		return normalizeRole(project.role) !== "admin";
	}
	if (project.permissions && project.permissions.length > 0) {
		const permId = ACTION_TO_PERMISSION[action];
		if (!permId) return false;
		return canDo(createPermissionContext(project.permissions), permId);
	}
	const role = normalizeRole(project.role);
	if (project.roleId !== void 0) {
		if (action === "delete") return project.roleId === "project.owner";
		if (action === "rename") return project.roleId === "project.owner" || project.roleId === "project.admin";
	}
	return ROLE_MATRIX_FALLBACK[action]?.(role) ?? false;
}
function canTaskRow(ctx, action) {
	const projectAction = action === "rename" ? "renameTask" : action === "archive" ? "archiveTask" : action === "delete" ? "deleteTask" : "shareTask";
	if (!canProject(ctx.project, projectAction)) return false;
	return ctx.isTaskOwner;
}
function getProjectCardMenuItems(project) {
	const items = [];
	if (canProject(project, "rename")) items.push("rename");
	if (canProject(project, "archive") && !project.archived) items.push("archive");
	if (canProject(project, "delete")) items.push("delete");
	if (canProject(project, "leave")) items.push("leave");
	return items;
}
/**
* 把 legacy Project 投影成权限上下文。
*
* @param project       legacy `types.ts` 的 Project（含 `members[]`）
* @param currentUserId 当前登录用户 id
* @param overrides     可选覆盖位（如 archived / isDemo / permissions）
* @returns             权限上下文
*/
function toPermissionContext(project, currentUserId, overrides) {
	return {
		role: project.members.find((m) => m.id === currentUserId)?.role ?? project.role ?? "viewer",
		roleId: overrides?.roleId ?? project.roleId,
		archived: overrides?.archived ?? project.archived ?? false,
		isDemo: overrides?.isDemo ?? project.isDemo ?? false,
		permissions: overrides?.permissions ?? project.permissions
	};
}
var adminOnly, adminOrEditor, allRoles, editorOrViewer, ROLE_MATRIX_FALLBACK, ACTION_TO_PERMISSION;
var init_permissions = __esmMin((() => {
	adminOnly = (r) => r === "admin";
	adminOrEditor = (r) => r === "admin" || r === "editor";
	allRoles = (_) => true;
	editorOrViewer = (r) => r === "editor" || r === "viewer";
	ROLE_MATRIX_FALLBACK = {
		rename: adminOrEditor,
		delete: adminOnly,
		archive: adminOnly,
		leave: editorOrViewer,
		editInstructions: adminOrEditor,
		editSkills: adminOrEditor,
		editExperts: adminOrEditor,
		viewConnectors: allRoles,
		editConnectors: adminOrEditor,
		editPublicConnector: adminOrEditor,
		editPersonalConnector: allRoles,
		viewPublicConnectorLog: adminOnly,
		viewMembers: allRoles,
		changeMemberRole: adminOrEditor,
		removeMember: adminOrEditor,
		inviteMember: allRoles,
		approveInvite: adminOrEditor,
		setJoinMode: adminOrEditor,
		createTask: allRoles,
		shareTask: allRoles,
		archiveTask: allRoles,
		deleteTask: allRoles,
		renameTask: allRoles,
		viewActivity: allRoles,
		viewAssets: allRoles,
		enterAssetFolder: allRoles,
		previewAsset: allRoles,
		downloadAsset: allRoles,
		addAssetToTask: allRoles,
		uploadAsset: allRoles,
		createAssetFolder: allRoles,
		moveAsset: adminOrEditor,
		renameAsset: adminOrEditor,
		deleteAsset: adminOrEditor,
		saveArtifactToLibrary: allRoles,
		viewAssetVersion: allRoles,
		restoreAssetVersion: allRoles,
		createSchedule: allRoles,
		pauseOrResumeSchedule: allRoles,
		deleteSchedule: allRoles,
		runScheduleNow: allRoles
	};
	ACTION_TO_PERMISSION = {
		rename: "project.rename",
		delete: "project.delete",
		archive: "project.archive",
		leave: null,
		editInstructions: "instruction.edit",
		editSkills: "skill.edit",
		editExperts: "expert.edit",
		viewConnectors: "connector.public.view",
		editConnectors: "connector.public.edit",
		editPublicConnector: "connector.public.edit",
		editPersonalConnector: "connector.personal.edit_list",
		viewPublicConnectorLog: "connector.public.view",
		viewMembers: "file.view",
		changeMemberRole: "member.modify_role",
		removeMember: "member.remove",
		inviteMember: "file.view",
		approveInvite: "member.approve_join",
		setJoinMode: "member.set_join_mode",
		createTask: "task.create",
		shareTask: "task.create",
		archiveTask: "task.create",
		deleteTask: "task.create",
		renameTask: "task.create",
		viewActivity: "file.view",
		viewAssets: "file.view",
		enterAssetFolder: "file.view",
		previewAsset: "file.view",
		downloadAsset: "file.download",
		addAssetToTask: "file.share_to_task",
		uploadAsset: "file.upload",
		createAssetFolder: "file.create_folder",
		moveAsset: "file.move",
		renameAsset: "file.rename",
		deleteAsset: "file.delete",
		saveArtifactToLibrary: "file.save_from_task",
		viewAssetVersion: "file.version.view",
		restoreAssetVersion: "file.version.restore",
		createSchedule: "automation.create",
		pauseOrResumeSchedule: "automation.create",
		deleteSchedule: "automation.create",
		runScheduleNow: "automation.create"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/services/use-busy-action.ts
function useBusyAction() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	/** ref 守门：避免 React 状态尚未刷新前的并发点击穿透 */
	const busyRef = (0, import_react.useRef)(false);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	return {
		busy,
		run: (0, import_react.useCallback)(async (fn) => {
			if (busyRef.current) return false;
			busyRef.current = true;
			setBusy(true);
			try {
				await fn();
				return true;
			} finally {
				busyRef.current = false;
				if (mountedRef.current) setBusy(false);
			}
		}, [])
	};
}
var import_react;
var init_use_busy_action = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
export { getProjectCardMenuItems as a, toPermissionContext as c, canTaskRow as i, useBusyAction as n, init_permissions as o, canProject as r, normalizeRole as s, init_use_busy_action as t };
