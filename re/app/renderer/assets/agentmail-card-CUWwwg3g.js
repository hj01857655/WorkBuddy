import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation, ad as init_common, d0 as useModuleHost, m5 as init_src, prt as AgentMailBrandIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Cv as init_purify_es, Ev as require_react, Tv as require_jsx_runtime, wv as purify } from "./lib-chat-ui-D8Ji0f8n.js";
import { At as ExpandableText, jt as init_expandable_text } from "./locale-utils-TanlkH9x.js";
import { n as init_split_action_button, t as SplitActionButton } from "./split-action-button-DcQLraVx.js";
//#region ../../packages/agent-ui/src/modules/agent-mail/message-cards/agentmail-card.tsx
/** 判断当前是否已经在"我的邮箱"页面，避免重复触发同路由跳转。 */
function isAgentMailRoute(path) {
	return path === AGENT_MAIL_INBOX_ROUTE || path.startsWith(`${AGENT_MAIL_INBOX_ROUTE}/`);
}
/** 从消息中心 ext 里读取 Agent Mail 侧真实邮件 ID，兼容不同后端字段名。 */
function getMailMessageId(message) {
	const ext = message.ext ?? {};
	const value = ext.message_id ?? ext.messageId ?? ext.mail_message_id;
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
/**
* 构造"我的邮箱"路由导航选项。
* - 非收件类通知：直接返回路由路径，无附加 state。
* - 收件类通知：通过 navigation state（而非 URL query）传递目标邮件 ID 和单调递增的 nonce，
*   确保每次点击都能触发 inbox-view 的 useEffect，即使路径或 messageId 与上次完全相同
*   （例如用户关闭弹窗后再次点击同一封邮件的通知）。
*/
function buildMailboxNavArgs(message) {
	if (message.biz_type !== "agentmail.received") return { path: AGENT_MAIL_INBOX_ROUTE };
	const messageId = getMailMessageId(message);
	return {
		path: AGENT_MAIL_INBOX_ROUTE,
		state: {
			openMessageId: messageId,
			nonce: Date.now()
		}
	};
}
var import_react, import_jsx_runtime, AGENT_MAIL_INBOX_ROUTE, AgentMailCard;
//#endregion
__esmMin((() => {
	init_src();
	init_purify_es();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_expandable_text();
	init_split_action_button();
	init_useI18n();
	init_common();
	import_jsx_runtime = require_jsx_runtime();
	AGENT_MAIL_INBOX_ROUTE = "/library/agent-mail";
	AgentMailCard = ({ message, onMarkRead, onClose }) => {
		const t = useTranslation();
		const host = useModuleHost();
		const [expanded, setExpanded] = import_react.useState(false);
		const [canExpand, setCanExpand] = import_react.useState(false);
		const contentText = message.content || message.summary;
		const handleToggle = (0, import_react.useCallback)(() => {
			if (canExpand) setExpanded((prev) => !prev);
			if (!message.is_read) onMarkRead();
		}, [
			canExpand,
			message.is_read,
			onMarkRead
		]);
		const handleGotoMailbox = (0, import_react.useCallback)(() => {
			if (!message.is_read) onMarkRead();
			if (isAgentMailRoute(host.navigation.currentPath)) {
				if (message.biz_type !== "agentmail.received") {
					onClose?.();
					return;
				}
			}
			const { path, state } = buildMailboxNavArgs(message);
			host.navigation.navigate(path, state ? { state } : void 0);
			onClose?.();
		}, [
			host.navigation,
			message,
			onMarkRead,
			onClose
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: `notification-card notification-card-mail${!message.is_read ? " is-unread" : ""}${expanded ? " is-expanded" : ""}`,
			onClick: handleToggle,
			children: [
				!message.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "notification-unread-dot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notification-card-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMailBrandIcon, { size: 32 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "notification-card-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "notification-line",
						dangerouslySetInnerHTML: { __html: purify.sanitize(message.title) }
					}), contentText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableText, {
						text: contentText,
						expanded,
						onExpandedChange: setExpanded,
						onOverflowChange: setCanExpand
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notification-card-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitActionButton, {
						primaryLabel: t("msgCenter.agentMail.gotoMailbox"),
						onPrimaryClick: handleGotoMailbox
					})
				})
			]
		});
	};
}))();
export { AgentMailCard as default };
