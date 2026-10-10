import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/utils/disable-agent-teams.ts
/**
* 读取「禁用智能体团队」开关状态。
*
* - 未设置时返回默认值 `true`（即默认禁用 teams）。
* - 仅读 localStorage 镜像；主进程值通过 {@link syncDisableAgentTeamsFromValue}
*   在启动时一次性写入。
*/
function getDisableAgentTeams() {
	if (typeof localStorage === "undefined") return true;
	const stored = localStorage.getItem(DISABLE_AGENT_TEAMS_STORAGE_KEY);
	if (stored === null) return true;
	return stored === "true";
}
/**
* 保存「禁用智能体团队」开关状态。
*
* - 写 localStorage 镜像。
* - 派发 `disable-agent-teams-change` 自定义事件，通知同页面内的其它组件。
*
* 注意：本函数 **不** 直接写主进程 AppConfig；调用方需在写入后通过 adapter
* 触发 `save-disable-agent-teams` 事件，让 desktop adapter 把值同步到
* `AppConfigService`。
*/
function saveDisableAgentTeams(enabled) {
	if (typeof localStorage !== "undefined") localStorage.setItem(DISABLE_AGENT_TEAMS_STORAGE_KEY, String(enabled));
	if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(DISABLE_AGENT_TEAMS_CHANGE_EVENT, { detail: { enabled } }));
}
/**
* 用主进程读到的值同步 localStorage 镜像。
*
* 启动时由 desktop renderer 调用一次：先 `configGet('disableAgentTeams')`，
* 拿到值后调用本函数写入 localStorage，使两端保持一致。
*
* - `value === undefined / null` 时不动 localStorage（保留 UI 默认值逻辑）。
* - 不派发事件（仅初始化场景使用，避免 UI 闪烁）。
*/
function syncDisableAgentTeamsFromValue(value) {
	if (typeof localStorage === "undefined") return;
	if (value === void 0 || value === null) return;
	if (typeof value !== "boolean") return;
	localStorage.setItem(DISABLE_AGENT_TEAMS_STORAGE_KEY, String(value));
}
var DISABLE_AGENT_TEAMS_STORAGE_KEY, DISABLE_AGENT_TEAMS_CHANGE_EVENT;
var init_disable_agent_teams = __esmMin((() => {
	DISABLE_AGENT_TEAMS_STORAGE_KEY = "CODEBUDDY_DISABLE_AGENT_TEAMS";
	DISABLE_AGENT_TEAMS_CHANGE_EVENT = "disable-agent-teams-change";
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/local-skills-memory.ts
/**
* 读取「本地技能与记忆沉淀」开关状态。
*
* - 未设置时返回默认值 `true`（默认启用沉淀，保持与历史行为一致）。
* - 仅读 localStorage 镜像；主进程值通过 {@link syncLocalSkillsMemoryEnabledFromValue}
*   在启动时一次性写入。
*/
function getLocalSkillsMemoryEnabled() {
	if (typeof localStorage === "undefined") return true;
	const stored = localStorage.getItem(LOCAL_SKILLS_MEMORY_STORAGE_KEY);
	if (stored === null) return true;
	return stored === "true";
}
/**
* 保存「本地技能与记忆沉淀」开关状态。
*
* - 写 localStorage 镜像。
* - 派发 `local-skills-memory-change` 自定义事件，通知同页面内的其它组件。
*
* 注意：本函数 **不** 直接写主进程 AppConfig；调用方需在写入后通过 adapter
* 触发 `save-local-skills-memory` 事件，让 desktop adapter 把值同步到
* `AppConfigService`（adapter 内部会翻译成 `disableLocalSkillsMemory`）。
*/
function saveLocalSkillsMemoryEnabled(enabled) {
	if (typeof localStorage !== "undefined") localStorage.setItem(LOCAL_SKILLS_MEMORY_STORAGE_KEY, String(enabled));
	if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(LOCAL_SKILLS_MEMORY_CHANGE_EVENT, { detail: { enabled } }));
}
/**
* 用主进程读到的值同步 localStorage 镜像。
*
* 启动时由 desktop renderer 调用一次：先 `configGet('disableLocalSkillsMemory')`，
* 拿到值后翻译为 `enabled = !disable` 再调用本函数，使两端保持一致。
*
* - `value === undefined / null` 时不动 localStorage（保留 UI 默认值逻辑）。
* - 不派发事件（仅初始化场景使用，避免 UI 闪烁）。
*/
function syncLocalSkillsMemoryEnabledFromValue(value) {
	if (typeof localStorage === "undefined") return;
	if (value === void 0 || value === null) return;
	if (typeof value !== "boolean") return;
	localStorage.setItem(LOCAL_SKILLS_MEMORY_STORAGE_KEY, String(value));
}
var LOCAL_SKILLS_MEMORY_STORAGE_KEY, LOCAL_SKILLS_MEMORY_CHANGE_EVENT;
var init_local_skills_memory = __esmMin((() => {
	LOCAL_SKILLS_MEMORY_STORAGE_KEY = "CODEBUDDY_LOCAL_SKILLS_MEMORY_ENABLED";
	LOCAL_SKILLS_MEMORY_CHANGE_EVENT = "local-skills-memory-change";
}));
//#endregion
export { syncLocalSkillsMemoryEnabledFromValue as a, init_disable_agent_teams as c, saveLocalSkillsMemoryEnabled as i, saveDisableAgentTeams as l, getLocalSkillsMemoryEnabled as n, DISABLE_AGENT_TEAMS_CHANGE_EVENT as o, init_local_skills_memory as r, getDisableAgentTeams as s, LOCAL_SKILLS_MEMORY_CHANGE_EVENT as t, syncDisableAgentTeamsFromValue as u };
