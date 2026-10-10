import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, Mv as init_plan_upgrade, O1 as useTranslation, Pv as openPlanUpgrade, ad as init_common, f0 as useOptionalModuleHost } from "./ui-docs-viewer-Bo02yf1Q.js";
import { _ as tryParseMemberQuotaError, p as MemberQuotaExceededError, t as init_browser, y as tryUseNormalizedMemberQuotaData } from "./browser-CX1Llsmu.js";
//#region ../../packages/agent-ui/src/modules/collab/hooks/use-quota-error.ts
/** 判定该 tier 是否走「去升级」CTA 分组（否则只显示关闭按钮）。 */
function canUpgrade(tier) {
	return TIERS_WITH_UPGRADE_CTA.has(tier);
}
/**
* 差额判定：已创建数量 > 上限 → 'exceeded'（用户已经多创建了，文案用「已超过」）；
* 否则（== 上限的正常触顶）→ 'reached'（文案用「已达到」）。
*/
function pickScenario(count, limit) {
	return count > limit ? "exceeded" : "reached";
}
function useQuotaErrorPresenter() {
	const t = useTranslation();
	const adapter = useOptionalModuleHost()?.adapter ?? null;
	const dismissAction = (onDismiss) => ({
		label: t("collab.quota.action.dismiss"),
		variant: "secondary",
		onClick: onDismiss
	});
	/**
	* 「去升级」CTA —— 统一走 `openPlanUpgrade`，与账号菜单/助理配额同一套落地逻辑
	* （端内弹购买弹窗、海外外跳、Web 新标签页）。不要在这里自己拼 pricing URL。
	*/
	const upgradeAction = (source) => ({
		label: t("collab.quota.action.upgrade"),
		variant: "primary",
		onClick: () => {
			openPlanUpgrade({
				source,
				adapter
			});
		}
	});
	/** 取版本显示名（i18n label），6 档全量。 */
	const versionLabel = (tier) => t(`collab.quota.version.${tier}`);
	/** 取触顶场景对应的动词文案（「已达到」/「已超过」），供标题 + 正文共用。 */
	const reachWord = (scenario) => t(`collab.quota.reach.${scenario}`);
	/**
	* 格式化 limit 数字 — V2.5 限免态下追加「（限免）」后缀，并按资源类型拼单位。
	*
	* 设计：
	*   - 区分 `member`（成员=人）与 `project`（项目=个），单位走中文 i18n
	*   - 仅依赖 freeTrial 标志，不判 tier；后端在 ultimate 档不会下发 freeTrial=true，
	*     因此本函数对企业档天然 no-op
	*
	* @param resource 'member' | 'project'，决定单位（人 / 个）
	* @param limit    后端下发的成员/项目上限
	* @param freeTrial data.freeTrial（V2.5 字段，可选）
	* @returns 渲染用的字符串：「5 人」/ 「5 人（限免）」/ 「10 个」/ 「5 个（限免）」
	*/
	const formatLimit = (resource, limit, freeTrial) => {
		const key = freeTrial === true ? `collab.quota.${resource}.limit.freeTrial` : `collab.quota.${resource}.limit.normal`;
		return t(key, { limit: String(limit) });
	};
	/** 非 owner 成员触顶文案（沿用 v1 结构，按差额注入「已达到」/「已超过」）。 */
	const buildMemberNonOwner = (data) => {
		const reach = reachWord(pickScenario(data.memberCount, data.memberLimit));
		const title = t("collab.quota.member.title", { reach });
		const ownerName = data.ownerName && data.ownerName.length > 0 ? data.ownerName : t("collab.quota.member.fallbackOwnerLabel");
		const message = t("collab.quota.member.body.nonOwner", {
			ownerName,
			reach
		});
		return {
			title,
			message,
			action: dismissAction(),
			bannerCompactMessage: t("collab.quota.member.banner.nonOwner", { ownerName }),
			bannerBlock: {
				title,
				message
			}
		};
	};
	/** owner 成员触顶文案（按 tier 派生 CTA 分组，按差额派生「已达到」/「已超过」）。 */
	const buildMemberOwner = (data) => {
		const reach = reachWord(pickScenario(data.memberCount, data.memberLimit));
		const title = t("collab.quota.member.title", { reach });
		const tier = data.version;
		const isUpgradable = canUpgrade(tier);
		const interp = {
			reach,
			version: versionLabel(tier),
			limit: formatLimit("member", data.memberLimit, data.freeTrial)
		};
		const message = t(isUpgradable ? "collab.quota.member.upgradable.owner" : "collab.quota.member.terminal.owner", interp);
		return {
			title,
			message,
			action: isUpgradable ? upgradeAction(UPGRADE_SOURCE_MEMBER) : dismissAction(),
			bannerCompactMessage: message,
			bannerBlock: {
				title,
				message
			}
		};
	};
	/** 成员数触顶（场景 1）入口分发。 */
	const presentMemberQuota = (data) => data.isOwner ? buildMemberOwner(data) : buildMemberNonOwner(data);
	/** 项目数触顶（场景 3）· 按 tier 派生 CTA 分组、按差额派生「已达到」/「已超过」（项目数没有非 owner 视角）。 */
	const presentProjectQuota = (data) => {
		const reach = reachWord(pickScenario(data.projectCount, data.projectLimit));
		const title = t("collab.quota.project.title", { reach });
		const tier = data.version;
		const isUpgradable = canUpgrade(tier);
		const interp = {
			reach,
			version: versionLabel(tier),
			limit: formatLimit("project", data.projectLimit, data.freeTrial)
		};
		const message = t(isUpgradable ? "collab.quota.project.upgradable" : "collab.quota.project.terminal", interp);
		return {
			title,
			message,
			action: isUpgradable ? upgradeAction(UPGRADE_SOURCE_PROJECT) : void 0,
			bannerCompactMessage: message,
			bannerBlock: {
				title,
				message
			}
		};
	};
	return {
		presentMemberQuota,
		presentProjectQuota
	};
}
/**
* 从任意异常中提取成员 quota 数据。
* Web 直连通常保留 MemberQuotaExceededError 原型；Desktop RPC 跨 contextBridge 后会变成带 code/data 的普通 Error，
* 这里统一兼容，避免审批触顶时退化成普通错误 toast。
*
* 顺序很重要（issue #55563 回归修复）：
*   1. instanceof 命中（Web 同 realm）→ 直接用归一化后的 error.data
*   2. Desktop RPC 退化成 RpcError 时，error.data 已是 daemon 侧归一化过的
*      MemberQuotaErrorData（含 version/memberLimit），必须 tryUseNormalizedMemberQuotaData
*      原样复用；**不能**再交给 tryParseMemberQuotaError 当原始 envelope 二次解析，
*      否则缺 ownerPlan/personalTier → planToTier 兜底 experience，标准版被误显示成体验版
*   3. 都不命中才按原始 envelope 解析（灰度 / 未归一化路径兜底）
*/
function resolveMemberQuotaErrorData(error, currentUid) {
	if (error instanceof MemberQuotaExceededError) return error.data;
	const normalized = tryUseNormalizedMemberQuotaData(error);
	if (normalized) return normalized;
	return tryParseMemberQuotaError(error, currentUid);
}
var UPGRADE_SOURCE_PROJECT, UPGRADE_SOURCE_MEMBER, TIERS_WITH_UPGRADE_CTA;
var init_use_quota_error = __esmMin((() => {
	init_browser();
	init_useI18n();
	init_plan_upgrade();
	init_common();
	UPGRADE_SOURCE_PROJECT = "collab_project_quota";
	UPGRADE_SOURCE_MEMBER = "collab_member_quota";
	TIERS_WITH_UPGRADE_CTA = /* @__PURE__ */ new Set([
		"experience",
		"youth",
		"standard",
		"advanced"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/utils/teams-telemetry-fields.ts
function joinIds(items, getter) {
	return items?.map(getter).filter(Boolean).join(", ") || "";
}
function pickStringField(record, keys) {
	if (!record) return;
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "string" && value.trim()) return value.trim();
	}
}
/** 构造 project_create_submit 的业务字段，模板来源以弹窗最终选择为准。 */
function buildProjectCreateSubmitPayload(input) {
	const templateId = input.templateId?.trim();
	return {
		type: templateId ? "template" : "custom",
		source: templateId ? "template" : "new_project",
		action: templateId || "",
		promptLength: input.instruction?.length ?? 0,
		ext1: joinIds(input.connectors, (connector) => connector.connectorName),
		skills: joinIds(input.skills, (skill) => skill.skillId),
		expertId: joinIds(input.experts, (expert) => expert.expertId)
	};
}
/** 将项目进入来源归一到数据字典枚举。 */
function normalizeProjectDetailSource(source) {
	if (source === "new_project") return "new_project";
	if (source === "invitation_url" || source === "url_link" || source === "invite_link") return "invitation_url";
	return "existing_project";
}
/** 将项目角色归一到 project_detail_view.mode。 */
function resolveProjectDetailMode(input) {
	if (input.roleId) {
		if (OWNER_ROLE_IDS.has(input.roleId)) return "owner_view";
		if (MEMBER_ROLE_IDS.has(input.roleId)) return "member_view";
	}
	if (input.permissions?.some((permission) => OWNER_PERMISSION_HINTS.has(permission))) return "owner_view";
	return input.role === "admin" || input.role === "editor" ? "owner_view" : "member_view";
}
function readBooleanFlag(value) {
	if (!value || typeof value !== "object") return;
	const record = value;
	for (const key of ONBOARDING_KEYS) if (typeof record[key] === "boolean") return record[key];
}
/**
* 推导新手引导项目标记。
*
* 后端字段可能随灰度出现在根对象或 extraInfo/metadata/meta/onboarding 中，前端按优先级读取；没有信号时降级为 false。
*/
function resolveProjectIsNewFile(project) {
	const direct = readBooleanFlag(project);
	if (typeof direct === "boolean") return direct;
	if (!project || typeof project !== "object") return false;
	const record = project;
	const nestedCandidates = [
		record.extraInfo,
		record.metadata,
		record.meta,
		record.onboarding
	];
	for (const candidate of nestedCandidates) {
		const resolved = readBooleanFlag(candidate);
		if (typeof resolved === "boolean") return resolved;
	}
	return false;
}
/** 构造 project_detail_view 的业务字段。 */
function buildProjectDetailViewPayload(input) {
	return {
		ext6: resolveProjectDetailMode(input),
		isNewFile: resolveProjectIsNewFile(input.project),
		source: normalizeProjectDetailSource(input.entrySource)
	};
}
/** 复制邀请链接时写入复制时间，用于打开/申请耗时计算；不影响埋点上报通道。 */
function appendInviteCopiedAt(url, copiedAt = Date.now()) {
	try {
		const parsed = new URL(url);
		parsed.searchParams.set(INVITE_COPIED_AT_QUERY_KEY, String(copiedAt));
		return parsed.toString();
	} catch {
		return url;
	}
}
function readInviteCopiedAt(url) {
	const href = url ?? (typeof window !== "undefined" ? window.location.href : "");
	if (!href) return;
	try {
		const value = new URL(href).searchParams.get(INVITE_COPIED_AT_QUERY_KEY);
		if (!value) return;
		const copiedAt = Number(value);
		return Number.isFinite(copiedAt) && copiedAt > 0 ? copiedAt : void 0;
	} catch {
		return;
	}
}
/** 将申请页场景归一为埋点邀请类型。 */
function normalizeProjectInviteType(type) {
	if (type === "todo") return "todo";
	if (type === "task" || TASK_APPLY_TYPES.has(type)) return "task";
	return "project";
}
/** 当前用户是否已在项目内：只有 taskMember 场景是项目内成员申请任务协作。 */
function resolveProjectInviteIsBuiltIn(type) {
	return type === "taskMember";
}
/** 将 UI/后端角色归一到数据字典的 admin/member。 */
function normalizeProjectInviteApplyRole(role) {
	if (role === "editor" || role === "admin" || role === "project.admin") return "admin";
	return "member";
}
/** 计算复制链接到当前行为的耗时；缺少复制时间信号时只能降级为 0。 */
function resolveProjectInviteCost(input) {
	const copiedAt = readInviteCopiedAt(input.currentURL);
	if (copiedAt == null) return 0;
	const now = input.now ?? Date.now();
	return Math.max(0, now - copiedAt);
}
/** 构造 project_invite_link_view 的业务字段。 */
function buildProjectInviteViewPayload(input) {
	return {
		ext1: normalizeProjectInviteType(input.type),
		isBuiltIn: resolveProjectInviteIsBuiltIn(input.type),
		cost: resolveProjectInviteCost(input)
	};
}
/** 构造 project_invite_link_apply 的业务字段。 */
function buildProjectInviteApplyPayload(input) {
	return {
		...buildProjectInviteViewPayload(input),
		ext2: normalizeProjectInviteApplyRole(input.selectedRole)
	};
}
function parseTimestamp(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (value instanceof Date) {
		const time = value.getTime();
		return Number.isFinite(time) ? time : void 0;
	}
	if (typeof value === "string" && value.trim()) {
		const numeric = Number(value);
		if (Number.isFinite(numeric)) return numeric;
		const parsed = Date.parse(value);
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
function resolveApprovalCreatedAt(input) {
	return parseTimestamp(input.requestedAt) ?? parseTimestamp(pickStringField(input.ext, APPROVAL_CREATED_AT_KEYS));
}
function resolveApprovalType(input) {
	return normalizeProjectInviteType(pickStringField(input.ext, APPROVAL_TYPE_KEYS) ?? input.kind ?? "project");
}
function resolveApprovalRole(input) {
	return normalizeProjectInviteApplyRole(input.role ?? pickStringField(input.ext, APPROVAL_ROLE_KEYS));
}
function resolveApprovalCost(input) {
	const createdAt = resolveApprovalCreatedAt(input);
	if (createdAt == null) return;
	return Math.max(0, (input.now ?? Date.now()) - createdAt);
}
/**
* 构造 project_application_approval_click 的业务字段。
*
* 字段语义（收口，避免各审批入口手写字面量散落）：
* - `ext1` = 被审批资源类型（project/task/todo），从 ext.request_type 等派生 —— 看板「资源类型」维度取此字段
* - `source` = 审批入口渠道（activity/message_center），由调用点传入 —— 表达「从哪个页面审批」
* 二者语义不同：从消息中心审批 project 申请时，`source=message_center` 且 `ext1=project`。
*/
function buildProjectApplicationApprovalPayload(input) {
	const cost = resolveApprovalCost(input);
	return {
		ext1: resolveApprovalType(input),
		ext2: input.result,
		ext3: resolveApprovalRole(input),
		source: input.source,
		...cost == null ? {} : { cost }
	};
}
var INVITE_COPIED_AT_QUERY_KEY, OWNER_ROLE_IDS, MEMBER_ROLE_IDS, OWNER_PERMISSION_HINTS, ONBOARDING_KEYS, TASK_APPLY_TYPES, APPROVAL_TYPE_KEYS, APPROVAL_ROLE_KEYS, APPROVAL_CREATED_AT_KEYS;
var init_teams_telemetry_fields = __esmMin((() => {
	INVITE_COPIED_AT_QUERY_KEY = "wb_invite_copied_at";
	OWNER_ROLE_IDS = /* @__PURE__ */ new Set(["project.owner", "project.admin"]);
	MEMBER_ROLE_IDS = /* @__PURE__ */ new Set(["project.member"]);
	OWNER_PERMISSION_HINTS = /* @__PURE__ */ new Set([
		"project.update",
		"project.rename",
		"project.archive",
		"project.delete"
	]);
	ONBOARDING_KEYS = [
		"isNewFile",
		"isNew",
		"isDemo",
		"isOnboarding",
		"isOnboardingProject"
	];
	TASK_APPLY_TYPES = /* @__PURE__ */ new Set(["taskMember", "taskOutsider"]);
	APPROVAL_TYPE_KEYS = [
		"request_type",
		"invite_type",
		"approval_type",
		"type",
		"resource_type"
	];
	APPROVAL_ROLE_KEYS = [
		"requested_role",
		"apply_role",
		"role",
		"role_id"
	];
	APPROVAL_CREATED_AT_KEYS = [
		"request_created_at",
		"created_at",
		"createdAt",
		"apply_created_at"
	];
}));
//#endregion
export { buildProjectInviteApplyPayload as a, resolveProjectIsNewFile as c, useQuotaErrorPresenter as d, buildProjectDetailViewPayload as i, init_use_quota_error as l, buildProjectApplicationApprovalPayload as n, buildProjectInviteViewPayload as o, buildProjectCreateSubmitPayload as r, init_teams_telemetry_fields as s, appendInviteCopiedAt as t, resolveMemberQuotaErrorData as u };
