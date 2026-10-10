import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cv as init_purify_es, Ev as require_react, Tv as require_jsx_runtime, wv as purify } from "./lib-chat-ui-D8Ji0f8n.js";
import { a as TaskApplyIcon, i as ProjectApplyIcon, n as getExtText, o as init_project_task_source_icons, r as init_project_task_source_chip, t as ProjectTaskSourceChip } from "./project-task-source-chip-Dc67nI1W.js";
//#region ../../packages/agent-ui/src/modules/collab/message-cards/teams-invite-body.tsx
var import_jsx_runtime, TeamsInviteBody;
//#endregion
__esmMin((() => {
	init_purify_es();
	require_react();
	init_project_task_source_chip();
	init_project_task_source_icons();
	import_jsx_runtime = require_jsx_runtime();
	TeamsInviteBody = ({ message }) => {
		const isTask = message.biz_type.includes("task");
		const ext = message.ext || {};
		const hasProjectData = !!(getExtText(ext, ["project_id", "projectId"]) || getExtText(ext, ["project_name", "projectName"]));
		const fallbackSummary = message.summary || message.content || "";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "notification-line",
			dangerouslySetInnerHTML: { __html: purify.sanitize(message.title) }
		}), hasProjectData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTaskSourceChip, {
			message,
			isTask,
			fallbackProjectName: fallbackSummary,
			fallbackTaskName: fallbackSummary
		}) : message.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				gap: 4,
				marginTop: 2
			},
			children: [isTask ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskApplyIcon, {
				width: 16,
				height: 16,
				style: {
					flexShrink: 0,
					marginTop: 2,
					color: "var(--wb-color-text-tertiary)"
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectApplyIcon, {
				width: 16,
				height: 16,
				style: {
					flexShrink: 0,
					marginTop: 2,
					color: "var(--wb-color-text-tertiary)"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "notification-desc",
				style: { margin: 0 },
				children: message.summary
			})]
		})] });
	};
}))();
export { TeamsInviteBody as default };
