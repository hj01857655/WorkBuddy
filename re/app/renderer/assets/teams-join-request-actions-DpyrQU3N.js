import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation, ad as init_common, d0 as useModuleHost } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_split_action_button, t as SplitActionButton } from "./split-action-button-DcQLraVx.js";
import { i as init_beacon_report, n as TEAMS_EVENT, o as useTeamsReport, t as TEAMS_ELEMENT } from "./beacon-report-BU-rcz1s.js";
import { n as QuotaToast, t as init_quota_toast } from "./quota-toast-CE8bROUb.js";
import { d as useQuotaErrorPresenter, l as init_use_quota_error, n as buildProjectApplicationApprovalPayload, s as init_teams_telemetry_fields, u as resolveMemberQuotaErrorData } from "./teams-telemetry-fields-rMwcjn6F.js";
import { n as useMembersStore, t as init_members_store } from "./members-store-BIlOz4aY.js";
//#region ../../packages/agent-ui/src/modules/collab/message-cards/teams-join-request-actions.tsx
function getInitialState(msg) {
	const finalExt = {
		...msg.ext,
		...msg.user_ext
	};
	if (finalExt?.join_status === "approved") return "approved";
	if (finalExt?.join_status === "rejected") return "rejected";
	if (finalExt?.join_status === "invalid") return "invalid";
	return "idle";
}
var import_react, import_react_dom, import_jsx_runtime, ERR_JOIN_REQUEST_NOT_PENDING, TeamsJoinRequestActions;
//#endregion
__esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_split_action_button();
	init_useI18n();
	init_common();
	init_beacon_report();
	init_quota_toast();
	init_use_quota_error();
	init_members_store();
	init_teams_telemetry_fields();
	import_jsx_runtime = require_jsx_runtime();
	ERR_JOIN_REQUEST_NOT_PENDING = 17271;
	TeamsJoinRequestActions = (props) => {
		const { message, onMarkRead, onRefresh } = props;
		const t = useTranslation();
		const [state, setState] = (0, import_react.useState)(() => getInitialState(message));
		const host = useModuleHost();
		const projectFacade = host.facades.project;
		const msgCenterFacade = host.facades.msgCenter;
		const currentUid = host.accountInfo?.userId;
		const teamsReport = useTeamsReport();
		const [memberQuotaError, setMemberQuotaError] = (0, import_react.useState)(null);
		const [showQuotaToast, setShowQuotaToast] = (0, import_react.useState)(false);
		const { presentMemberQuota } = useQuotaErrorPresenter();
		const ext = message.ext || {};
		const requestId = ext.request_id;
		const projectId = ext.project_id;
		(0, import_react.useEffect)(() => {
			const latest = getInitialState(message);
			if (latest !== "idle") setState(latest);
		}, [message.user_ext]);
		const handleApprove = (0, import_react.useCallback)(async () => {
			if (!projectId || !requestId || !projectFacade) return;
			setState("loading");
			try {
				await projectFacade.approveProjectJoinRequest(projectId, requestId, currentUid);
				await useMembersStore.getState().refreshIfActiveProject(projectId);
				teamsReport(TEAMS_EVENT.ELEMENT_CLICK, {
					elementName: TEAMS_ELEMENT.PROJECT_APPLICATION_APPROVAL_CLICK,
					...buildProjectApplicationApprovalPayload({
						result: "approved",
						kind: "project",
						ext,
						requestedAt: message.created_at,
						source: "message_center"
					})
				});
				await msgCenterFacade?.updateUserExt({
					msg_id: message.msg_id,
					user_ext: { join_status: "approved" }
				});
				setState("approved");
				onMarkRead();
			} catch (e) {
				setState("idle");
				const quotaError = resolveMemberQuotaErrorData(e, currentUid);
				if (quotaError) {
					setMemberQuotaError(quotaError);
					setShowQuotaToast(true);
					return;
				}
				if (e?.code === ERR_JOIN_REQUEST_NOT_PENDING) {
					toast.info(t("collab.joinRequest.alreadyHandled"), { duration: 2400 });
					onRefresh?.();
					return;
				}
				console.warn("[JoinRequestNotify] approve failed:", e);
				const errMsg = e instanceof Error && e.message ? e.message : t("collab.joinRequest.approve");
				toast.error(errMsg, { duration: 2400 });
			}
		}, [
			projectId,
			requestId,
			projectFacade,
			msgCenterFacade,
			message,
			onMarkRead,
			t,
			currentUid,
			teamsReport,
			ext
		]);
		const handleReject = (0, import_react.useCallback)(async () => {
			if (!projectId || !requestId || !projectFacade) return;
			setState("loading");
			try {
				await projectFacade.rejectProjectJoinRequest(projectId, requestId);
				teamsReport(TEAMS_EVENT.ELEMENT_CLICK, {
					elementName: TEAMS_ELEMENT.PROJECT_APPLICATION_APPROVAL_CLICK,
					...buildProjectApplicationApprovalPayload({
						result: "rejected",
						kind: "project",
						ext,
						requestedAt: message.created_at,
						source: "message_center"
					})
				});
				await msgCenterFacade?.updateUserExt({
					msg_id: message.msg_id,
					user_ext: { join_status: "rejected" }
				});
				setState("rejected");
				onMarkRead();
			} catch (e) {
				console.warn("[JoinRequestNotify] reject failed:", e);
				setState("idle");
				if (e?.code === ERR_JOIN_REQUEST_NOT_PENDING) {
					toast.info(t("collab.joinRequest.alreadyHandled"), { duration: 2400 });
					onRefresh?.();
					return;
				}
				const errMsg = e instanceof Error && e.message ? e.message : t("collab.joinRequest.reject");
				toast.error(errMsg, { duration: 2400 });
			}
		}, [
			projectId,
			requestId,
			projectFacade,
			msgCenterFacade,
			message,
			onMarkRead,
			t,
			teamsReport,
			ext
		]);
		if (state === "approved") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "notification-read-state",
			children: t("collab.joinRequest.approved")
		});
		if (state === "rejected") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "notification-read-state",
			children: t("collab.joinRequest.rejected")
		});
		if (state === "invalid") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "notification-read-state",
			children: t("collab.joinRequest.invalid")
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "notification-actions",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitActionButton, {
				primaryLabel: t("collab.joinRequest.approve"),
				onPrimaryClick: handleApprove,
				disabled: state === "loading",
				includePrimaryInMenu: true,
				secondaryItems: [{
					key: "reject",
					label: t("collab.joinRequest.reject"),
					onClick: handleReject
				}]
			}), memberQuotaError && showQuotaToast && (0, import_react_dom.createPortal)((() => {
				const presentation = presentMemberQuota(memberQuotaError);
				const action = presentation.action ? {
					...presentation.action,
					onClick: presentation.action.variant === "secondary" ? () => setShowQuotaToast(false) : presentation.action.onClick
				} : void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotaToast, {
					title: presentation.title,
					message: presentation.message,
					action,
					onClose: () => setShowQuotaToast(false),
					singletonKey: "collab-member-quota",
					style: {
						position: "fixed",
						top: 80,
						right: 24,
						zIndex: 9999
					}
				});
			})(), document.body)]
		});
	};
}))();
export { TeamsJoinRequestActions as default };
