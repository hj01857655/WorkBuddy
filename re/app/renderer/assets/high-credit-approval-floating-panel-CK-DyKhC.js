import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation, Qs as init_high_credit_approval_rules, Zs as getHighCreditApprovalChoices } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/high-credit-approval/high-credit-approval-floating-panel.less
var init_high_credit_approval_floating_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/high-credit-approval/high-credit-approval-floating-panel.tsx
var import_react, import_jsx_runtime, HighCreditApprovalFloatingPanel;
//#endregion
__esmMin((() => {
	init_high_credit_approval_floating_panel$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_high_credit_approval_rules();
	import_jsx_runtime = require_jsx_runtime();
	HighCreditApprovalFloatingPanel = (props) => {
		const { sessionId, requestId, toolCallId, toolKind, approvalScope, adapter, permissionOptions, onToolStatusChange, onDismissed } = props;
		const t = useTranslation();
		const [decision, setDecision] = (0, import_react.useState)("pending");
		const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
		const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
		(0, import_react.useEffect)(() => {
			setDecision("pending");
			setIsSubmitting(false);
			setSelectedIndex(0);
		}, [toolCallId]);
		const approvalChoices = (0, import_react.useMemo)(() => getHighCreditApprovalChoices(permissionOptions, approvalScope), [approvalScope, permissionOptions]);
		const approveOption = approvalChoices.primary;
		const alwaysAllowOption = approvalChoices.secondary;
		const respond = (0, import_react.useCallback)(async (option) => {
			if (!adapter || isSubmitting) return;
			setIsSubmitting(true);
			try {
				if (option) {
					await adapter.respondToPermission(sessionId, requestId, [option]);
					onToolStatusChange?.("executed");
					setDecision("approved");
				} else {
					await adapter.respondToPermission(sessionId, requestId, []);
					onToolStatusChange?.("cancelled");
					setDecision("rejected");
				}
				onDismissed?.();
			} catch (err) {
				console.error("[HighCreditApprovalFloatingPanel] respond failed", err);
			} finally {
				setIsSubmitting(false);
			}
		}, [
			adapter,
			isSubmitting,
			sessionId,
			requestId,
			onToolStatusChange,
			onDismissed
		]);
		const handleApprove = (0, import_react.useCallback)(() => {
			if (approveOption) respond(approveOption);
		}, [respond, approveOption]);
		const handleAlwaysAllow = (0, import_react.useCallback)(() => {
			if (alwaysAllowOption) respond(alwaysAllowOption);
		}, [respond, alwaysAllowOption]);
		const handleReject = (0, import_react.useCallback)(() => {
			respond(void 0);
		}, [respond]);
		const isResolved = decision !== "pending";
		const confirmTitle = t(`tool.approval.confirmTitle.${toolKind}`);
		const riskTag = t(`tool.approval.riskTag.${toolKind}`);
		const creditHint = t(`tool.approval.creditHint.${toolKind}`);
		const approveLabel = approvalScope === "session" ? t("tool.approval.allow") : t("tool.approval.confirm");
		const showAlwaysAllowOption = approvalScope === void 0 || Boolean(alwaysAllowOption);
		const rejectOptionIndex = showAlwaysAllowOption ? 2 : 1;
		const alwaysAllowLabel = toolKind === "computerUse" && approvalScope === void 0 ? t("tool.approval.alwaysAllowThisLaunch") : t("tool.approval.alwaysAllow");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "high-credit-approval-floating",
			role: "dialog",
			"aria-label": confirmTitle,
			children: [
				!isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "high-credit-approval-floating__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "high-credit-approval-floating__title-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "high-credit-approval-floating__title",
							children: confirmTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "high-credit-approval-floating__risk-tag",
							children: riskTag
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "high-credit-approval-floating__description",
						children: creditHint
					})]
				}),
				!isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "high-credit-approval-floating__content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `high-credit-approval-floating__option${selectedIndex === 0 ? " high-credit-approval-floating__option--selected" : ""}`,
							role: "button",
							tabIndex: isSubmitting || !approveOption ? -1 : 0,
							onClick: handleApprove,
							onMouseEnter: () => setSelectedIndex(0),
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleApprove();
								}
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "high-credit-approval-floating__option-num",
									children: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "high-credit-approval-floating__option-text",
									children: approveLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "high-credit-approval-floating__option-arrow",
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M3 8H13M13 8L10 5M13 8L10 11",
										stroke: "currentColor",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})
							]
						}),
						showAlwaysAllowOption && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `high-credit-approval-floating__option${selectedIndex === 1 ? " high-credit-approval-floating__option--selected" : ""}`,
							role: "button",
							tabIndex: isSubmitting || !alwaysAllowOption ? -1 : 0,
							onClick: handleAlwaysAllow,
							onMouseEnter: () => setSelectedIndex(1),
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleAlwaysAllow();
								}
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "high-credit-approval-floating__option-num",
									children: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "high-credit-approval-floating__option-text",
									children: alwaysAllowLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "high-credit-approval-floating__option-arrow",
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M3 8H13M13 8L10 5M13 8L10 11",
										stroke: "currentColor",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "high-credit-approval-floating__option high-credit-approval-floating__option--reject" + (selectedIndex === rejectOptionIndex ? " high-credit-approval-floating__option--selected" : ""),
							role: "button",
							tabIndex: isSubmitting ? -1 : 0,
							onClick: handleReject,
							onMouseEnter: () => setSelectedIndex(rejectOptionIndex),
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleReject();
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "high-credit-approval-floating__option-num",
								children: rejectOptionIndex + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "high-credit-approval-floating__option-text",
								children: t("tool.approval.reject")
							})]
						})
					]
				}),
				isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `high-credit-approval-floating__decision high-credit-approval-floating__decision--${decision}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "high-credit-approval-floating__decision-text",
						children: decision === "approved" ? t("tool.approval.decisionApproved") : t("tool.approval.decisionRejected")
					})
				})
			]
		});
	};
}))();
export { HighCreditApprovalFloatingPanel };
