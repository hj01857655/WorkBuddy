import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cv as init_purify_es, Ev as require_react, Tv as require_jsx_runtime, wv as purify } from "./lib-chat-ui-D8Ji0f8n.js";
import { At as ExpandableText, Mt as init_user_menu_avatar, Nt as user_menu_avatar_default, Ot as openMsgCenterActionUrl, Tt as init_msg_center_popup_utils, jt as init_expandable_text } from "./locale-utils-TanlkH9x.js";
import { n as init_split_action_button, t as SplitActionButton } from "./split-action-button-DcQLraVx.js";
//#region ../../packages/agent-ui/src/modules/openplatform/message-cards/subject-entity-chip.tsx
/** 从 ext.subject_display 提取主体信息；字段缺失或非法时返回 null */
function getSubjectDisplay(ext) {
	const raw = ext?.subject_display;
	if (!raw || typeof raw !== "object") return null;
	const { name, avatar_url } = raw;
	if (typeof name !== "string" || !name.trim()) return null;
	return {
		name: name.trim(),
		avatar_url: typeof avatar_url === "string" ? avatar_url.trim() : ""
	};
}
/** 基于主体名称的稳定颜色 hash，保证同一个主体颜色不变 */
function stableAvatarColor(seed) {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i) | 0;
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
var import_react$1, import_jsx_runtime$1, AVATAR_COLORS, SubjectEntityChip, SubjectAvatar, SubjectAvatarFallback;
var init_subject_entity_chip = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$1 = require_jsx_runtime();
	AVATAR_COLORS = [
		"#5AC57A",
		"#607D8B",
		"#3498DB",
		"#8B5CF6",
		"#F59E0B"
	];
	SubjectEntityChip = ({ ext }) => {
		const subject = getSubjectDisplay(ext);
		if (!subject) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "notification-subject-chip",
			children: [subject.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SubjectAvatar, {
				avatarUrl: subject.avatar_url,
				name: subject.name
			}, subject.avatar_url) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SubjectAvatarFallback, { name: subject.name }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "notification-subject-chip__name",
				children: subject.name
			})]
		});
	};
	SubjectAvatar = ({ avatarUrl, name }) => {
		const [failed, setFailed] = (0, import_react$1.useState)(false);
		if (failed) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SubjectAvatarFallback, { name });
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
			className: "notification-subject-chip__avatar",
			src: avatarUrl,
			alt: "",
			onError: () => setFailed(true)
		});
	};
	SubjectAvatarFallback = ({ name }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
		className: "notification-subject-chip__avatar notification-subject-chip__avatar--fallback",
		style: { background: stableAvatarColor(name) },
		children: name.charAt(0)
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/openplatform/message-cards/openplatform-card.tsx
var import_react, import_jsx_runtime, OpenplatformCard;
//#endregion
__esmMin((() => {
	init_purify_es();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_user_menu_avatar();
	init_expandable_text();
	init_msg_center_popup_utils();
	init_split_action_button();
	init_subject_entity_chip();
	import_jsx_runtime = require_jsx_runtime();
	OpenplatformCard = ({ message, onMarkRead, onClose, onNavigate }) => {
		const [expanded, setExpanded] = (0, import_react.useState)(false);
		const [canExpand, setCanExpand] = (0, import_react.useState)(false);
		const contentText = message.content || message.summary;
		const primaryAction = message.actions?.[0];
		const handleToggle = (0, import_react.useCallback)(() => {
			if (canExpand) setExpanded((prev) => !prev);
			if (!message.is_read) onMarkRead();
		}, [
			canExpand,
			message.is_read,
			onMarkRead
		]);
		const handleViewDetail = (0, import_react.useCallback)(async () => {
			if (!message.is_read) onMarkRead();
			const url = primaryAction?.url;
			if (!url) return;
			if (url.startsWith("/")) {
				onNavigate?.(url);
				return;
			}
			if (await openMsgCenterActionUrl(url)) onClose?.();
		}, [
			message.is_read,
			onMarkRead,
			primaryAction,
			onNavigate,
			onClose
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: `notification-card notification-card-openplatform${!message.is_read ? " is-unread" : ""}${expanded ? " is-expanded" : ""}`,
			onClick: handleToggle,
			children: [
				!message.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "notification-unread-dot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notification-card-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "notification-avatar",
						src: user_menu_avatar_default,
						alt: ""
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "notification-card-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "notification-line",
							dangerouslySetInnerHTML: { __html: purify.sanitize(message.title) }
						}),
						contentText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableText, {
							text: contentText,
							expanded,
							onExpandedChange: setExpanded,
							onOverflowChange: setCanExpand
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectEntityChip, { ext: message.ext })
					]
				}),
				primaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notification-card-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitActionButton, {
						primaryLabel: primaryAction.text,
						onPrimaryClick: handleViewDetail
					})
				})
			]
		});
	};
}))();
export { OpenplatformCard as default };
