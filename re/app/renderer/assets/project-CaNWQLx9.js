import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { d as init_cloud_repo, h as init_quota_errors, r as init_project_chat_service } from "./browser-CX1Llsmu.js";
//#region ../../packages/workbuddy-server/src/project/_internal/todo-errors.ts
function collectErrorMessages(reason) {
	if (typeof reason === "string") return [reason];
	if (!reason || typeof reason !== "object") return reason instanceof Error ? [reason.message] : [];
	const err = reason;
	const details = Array.isArray(err.details) ? err.details : [];
	return [
		err.message,
		err.response?.data?.message,
		err.response?.data?.msg,
		...details
	].filter((item) => typeof item === "string" && item.trim().length > 0);
}
function extractErrorCode(reason) {
	if (!reason || typeof reason !== "object") return;
	const err = reason;
	const code = err.code ?? err.response?.data?.code;
	if (typeof code === "number" || typeof code === "string") return code;
}
function isTodoNotFoundError(reason) {
	if (reason instanceof TodoNotFoundError) return true;
	const code = extractErrorCode(reason);
	if (code === TODO_ERROR_CODES.notFound || code === String(TODO_ERROR_CODES.notFound)) return true;
	return collectErrorMessages(reason).some((item) => /todo not found|get todo returned empty todo/i.test(item));
}
var TODO_ERROR_CODES, TodoNotFoundError;
var init_todo_errors = __esmMin((() => {
	TODO_ERROR_CODES = { 
	/** 17301 · Todo 不存在或已软删除。 */
notFound: 17301 };
	TodoNotFoundError = class TodoNotFoundError extends Error {
		constructor(message = "Todo not found") {
			super(message);
			this.code = TODO_ERROR_CODES.notFound;
			this.name = "TodoNotFoundError";
			Object.setPrototypeOf(this, TodoNotFoundError.prototype);
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/local-task-resource-service.ts
var LocalTaskResourceService;
var init_local_task_resource_service = __esmMin((() => {
	LocalTaskResourceService = class {
		constructor(expertProvider, projectProvider, connectorRegistry, skillManifest, connectorPreferences) {
			this.expertProvider = expertProvider;
			this.projectProvider = projectProvider;
			this.connectorRegistry = connectorRegistry;
			this.skillManifest = skillManifest;
			this.connectorPreferences = connectorPreferences;
		}
		/**
		* 获取专家列表：
		* - 有 projectId → 返回项目配置的专家（转为 RecentExpert 格式）
		* - 无 projectId → 走原 ExpertFacade 全局历史
		*/
		async getRecentExperts(params) {
			if (params.projectId) return { experts: ((await this.projectProvider.listExperts(params.projectId)).items ?? []).map((item) => ({
				id: item.expertId,
				name: item.displayNameZh || item.displayNameEn || item.expertId,
				profession: item.professionZh || item.professionEn || "",
				avatarUrl: item.icon || "",
				summonedAt: Date.now(),
				industryId: item.categories?.[0] || ""
			})) };
			return this.expertProvider.getRecent({ sessionId: params.sessionId });
		}
		/**
		* 获取项目本地任务所需的全部资源（connector skill/MCP + 项目 skill）。
		* 仅在有 projectId 时调用；普通本地任务不会走这里。
		*
		* best-effort：任何接口失败不阻塞，返回部分结果。
		*/
		async getProjectResources(projectId) {
			const [connectors, skills] = await Promise.all([this.fetchConnectorResources(projectId), this.fetchProjectSkills(projectId)]);
			return {
				connectorResources: connectors.items,
				projectSkills: skills.items,
				partial: !connectors.ok || !skills.ok
			};
		}
		async getProjectSessionResources(projectId) {
			const { connectorResources, projectSkills, partial } = await this.getProjectResources(projectId);
			return {
				partial,
				connectorSkills: connectorResources.filter((item) => item.skillId && item.skillDownloadUrl).map((item) => ({
					skillId: item.skillId,
					downloadUrl: item.skillDownloadUrl,
					connectorName: item.name
				})),
				mcpServers: connectorResources.filter((item) => item.mcpServerName && item.mcpGatewayUrl).map((item) => ({
					serverName: item.mcpServerName,
					gatewayUrl: item.mcpGatewayUrl,
					transport: item.mcpTransport || "http",
					connectorName: item.name
				})),
				projectSkills
			};
		}
		/**
		* ok=false 表示接口真的失败了（区别于「没配置 registry」和「项目就是没有 connector」，
		* 后两者是合法的空）。偏好接口单独失败不算 ok=false：拿不到偏好只会退化成不过滤，
		* 产出的是 active 集合的超集，对下游清理决策是保守方向，不会误删。
		*/
		async fetchConnectorResources(projectId) {
			if (!this.connectorRegistry) return {
				items: [],
				ok: true
			};
			try {
				const [result, preferences] = await Promise.all([this.connectorRegistry.listRegistry({
					scope: "all",
					projectId
				}), this.connectorPreferences?.listProjectUserConnectorPreferences(projectId).catch(() => void 0)]);
				const preferenceItems = preferences?.connectors ?? [];
				const hasPreferences = preferenceItems.length > 0;
				const activePublicConnectorNames = new Set(preferenceItems.filter((item) => item.authMode === "public" && item.activeStatus).map((item) => item.name));
				return {
					items: (result.list ?? []).filter((item) => item.isConnected && item.capabilities?.includes("public_auth_supported")).filter((item) => !hasPreferences || activePublicConnectorNames.has(item.name)).map((item) => {
						const skillData = item.data?.skill;
						const mcpData = item.mcp;
						return {
							name: item.name,
							displayName: item.displayName,
							skillDownloadUrl: skillData?.download_url || void 0,
							skillId: skillData?.skill_id || void 0,
							mcpGatewayUrl: mcpData?.gateway_url || void 0,
							mcpServerName: mcpData?.ide_server_name || void 0,
							mcpTransport: mcpData?.transport || void 0
						};
					}).filter((item) => item.skillDownloadUrl || item.mcpGatewayUrl),
					ok: true
				};
			} catch (err) {
				console.warn("[LocalTaskResourceService] fetchConnectorResources failed:", err);
				return {
					items: [],
					ok: false
				};
			}
		}
		/** ok 语义同 fetchConnectorResources。 */
		async fetchProjectSkills(projectId) {
			if (!this.skillManifest) return {
				items: [],
				ok: true
			};
			try {
				return {
					items: ((await this.skillManifest.getManifestPreview(projectId)).skills ?? []).map((s) => ({
						name: s.name,
						downloadUrl: s.downloadUrl || s.download_url || "",
						source: s.source
					})).filter((s) => !!s.downloadUrl),
					ok: true
				};
			} catch (err) {
				console.warn("[LocalTaskResourceService] fetchProjectSkills failed:", err);
				return {
					items: [],
					ok: false
				};
			}
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/index.ts
var init_project = __esmMin((() => {
	init_cloud_repo();
	init_quota_errors();
	init_todo_errors();
	init_project_chat_service();
	init_local_task_resource_service();
}));
//#endregion
export { isTodoNotFoundError as a, init_todo_errors as i, LocalTaskResourceService as n, init_local_task_resource_service as r, init_project as t };
