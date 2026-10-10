import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A7 as Input, E1 as init_useI18n, O1 as useTranslation, m5 as init_src } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime, la as EditorIcon, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/tools/renderers/exit-plan-mode/exit-plan-mode-floating.less
var init_exit_plan_mode_floating$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/exit-plan-mode/exit-plan-mode-floating.tsx
var import_react, import_jsx_runtime, ExitPlanModeFloating;
//#endregion
__esmMin((() => {
	init_exit_plan_mode_floating$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	ExitPlanModeFloating = (props) => {
		const { sessionId, requestId, toolCallId, adapter, permissionOptions, onAdjustSubmit, onToolStatusChange, onDismissed } = props;
		const t = useTranslation();
		const [decision, setDecision] = (0, import_react.useState)("pending");
		const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
		const [adjustText, setAdjustText] = (0, import_react.useState)("");
		const adjustInputRef = (0, import_react.useRef)(null);
		const [optionSelected, setOptionSelected] = (0, import_react.useState)(true);
		(0, import_react.useEffect)(() => {
			setDecision("pending");
			setAdjustText("");
			setIsSubmitting(false);
			setOptionSelected(true);
		}, [toolCallId]);
		/**
		* 调整输入与选项互斥（对齐 questionFloating）：
		* - 输入有文字 → 取消"开始执行"选中态
		* - 清空输入 → 恢复选中态
		*/
		const handleAdjustTextChange = (0, import_react.useCallback)((value) => {
			setAdjustText(value);
			if (value.trim().length > 0) setOptionSelected(false);
			else setOptionSelected(true);
		}, []);
		/**
		* 处理主操作"开始执行"。
		* - allow → 批准执行，切换 bypassPermissions，并把 tool.status 写为 'executed'
		*/
		const handleApprove = (0, import_react.useCallback)(async () => {
			if (!adapter || isSubmitting) return;
			const allowOption = permissionOptions.find((o) => o.kind === "allow_once" || o.kind === "allow_always");
			if (!allowOption) {
				console.warn("[ExitPlanModeFloating] No allow option found");
				return;
			}
			setIsSubmitting(true);
			try {
				await adapter.respondToPermission(sessionId, requestId, [allowOption]);
				try {
					await adapter.setMode(sessionId, "bypassPermissions");
				} catch (err) {
					console.error("[ExitPlanModeFloating] Failed to switch to bypassPermissions:", err);
				}
				setDecision("approved");
				onToolStatusChange?.("executed");
			} catch (err) {
				console.error("[ExitPlanModeFloating] Failed to approve:", err);
			} finally {
				setIsSubmitting(false);
			}
		}, [
			adapter,
			sessionId,
			requestId,
			permissionOptions,
			isSubmitting,
			onToolStatusChange
		]);
		/**
		* 提交调整意见（#82046：调整意见走「发送新消息」通道，且**保持在 Plan 模式**）：
		*   ① respondToPermission(**reject**) —— `reject` 是协议原意的"继续规划、不退出
		*      Plan 模式"（cbc 侧不切换权限模式），本轮 deny 会中断当前 run，会话随后回到
		*      IDLE。**不再**把调整意见随决策结构化回传。
		*   ② 同步 UI 状态：decision / adjustText / optionSelected / tool.status
		*   ③ 父级 onAdjustSubmit 把用户输入文本作为一条**新的用户消息**发送到同一会话
		*      （由 main-content-core 暂存、等会话回到 IDLE 后再发，避免命中 TALKING 闸门）。
		*   ④ 关闭浮层
		*
		* 说明：
		*   - 选 `reject`（而非 `reject_and_exit_plan`）以**保持 Plan 模式**——后者会真的退出
		*     Plan 模式（cbc 侧切回 prePlanMode），与"调整计划、继续规划"的预期相反。
		*   - 调整意见不经 permission 协议传递，而是由父级补发一条新用户消息触发下一轮规划。
		*/
		const handleAdjustSubmit = (0, import_react.useCallback)(async () => {
			if (!adapter || isSubmitting) return;
			const rejectOption = permissionOptions.find((o) => o.optionId === "reject") ?? permissionOptions.find((o) => o.kind === "reject_once");
			if (!rejectOption) {
				console.warn("[ExitPlanModeFloating] No reject option found");
				return;
			}
			setIsSubmitting(true);
			const text = adjustText.trim();
			if (!text) {
				setIsSubmitting(false);
				return;
			}
			try {
				await adapter.respondToPermission(sessionId, requestId, [rejectOption]);
				setDecision("keep-planning");
				setAdjustText("");
				setOptionSelected(true);
				onToolStatusChange?.("cancelled");
				if (onAdjustSubmit) await onAdjustSubmit(text);
				onDismissed?.();
			} catch (err) {
				console.error("[ExitPlanModeFloating] Failed to submit adjustment:", err);
			} finally {
				setIsSubmitting(false);
			}
		}, [
			adapter,
			sessionId,
			requestId,
			permissionOptions,
			isSubmitting,
			onToolStatusChange,
			onAdjustSubmit,
			onDismissed,
			adjustText
		]);
		const isResolved = decision === "approved" || decision === "keep-planning";
		const decisionText = (() => {
			switch (decision) {
				case "approved": return t("tool.exitPlanMode.approved");
				case "keep-planning": return t("tool.exitPlanMode.adjusted");
				default: return "";
			}
		})();
		const handleAdjustKeyDown = (0, import_react.useCallback)((e) => {
			const nativeEvent = e.nativeEvent;
			if (e.key === "Enter" && !nativeEvent.isComposing) {
				e.preventDefault();
				if (adjustText.trim()) handleAdjustSubmit();
				else if (optionSelected) handleApprove();
			}
		}, [
			handleAdjustSubmit,
			handleApprove,
			adjustText,
			optionSelected
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "exit-plan-mode-floating",
			children: [
				!isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "exit-plan-mode-floating__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "exit-plan-mode-floating__title",
						children: t("tool.exitPlanMode.confirmTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "exit-plan-mode-floating__description",
						children: t("tool.exitPlanMode.confirmDescription")
					})]
				}),
				!isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "exit-plan-mode-floating__content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `exit-plan-mode-floating__option${optionSelected ? " exit-plan-mode-floating__option--selected" : ""}`,
						role: "button",
						tabIndex: isSubmitting ? -1 : 0,
						onClick: handleApprove,
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								handleApprove();
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "exit-plan-mode-floating__option-num",
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "exit-plan-mode-floating__option-text",
								children: t("tool.exitPlanMode.yes")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "exit-plan-mode-floating__option-arrow",
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "exit-plan-mode-floating__adjust-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "exit-plan-mode-floating__adjust-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorIcon, {
								width: 14,
								height: 14,
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							ref: adjustInputRef,
							className: "exit-plan-mode-floating__adjust-input",
							placeholder: t("tool.exitPlanMode.adjustPlaceholder"),
							value: adjustText,
							onChange: (e) => handleAdjustTextChange(e.target.value),
							onKeyDown: handleAdjustKeyDown,
							disabled: isSubmitting
						})]
					})]
				}),
				!isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "exit-plan-mode-floating__footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "exit-plan-mode-floating__divider" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "exit-plan-mode-floating__send-btn",
						onClick: handleAdjustSubmit,
						disabled: isSubmitting || !adjustText.trim(),
						"aria-label": t("tool.exitPlanMode.adjustSubmit"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "32",
							height: "32",
							viewBox: "0 0 32 32",
							fill: "none",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "currentColor",
								d: "M16 19.2104C15.5529 19.2104 15.1342 19.4074 14.2968 19.8015L12.9369 20.4415C12.6768 20.5639 12.4283 20.6835 12.1915 20.7975C10.6375 21.5456 9.588 22.0508 9.0686 21.5057C8.5493 20.9605 9.1048 19.9367 9.9273 18.4208C10.0527 18.1898 10.1842 17.9474 10.3191 17.6935L14.2338 10.3247C14.3137 10.1743 14.3891 10.03 14.461 9.8925C15.0315 8.8018 15.3821 8.1315 16 8.1315C16.6179 8.1315 16.9685 8.8018 17.539 9.8925C17.6109 10.03 17.6863 10.1743 17.7662 10.3247L21.6809 17.6935C21.8158 17.9474 21.9473 18.1898 22.0727 18.4208C22.8952 19.9367 23.4507 20.9605 22.9314 21.5057C22.412 22.0508 21.3625 21.5456 19.8085 20.7975C19.5717 20.6835 19.3232 20.5639 19.0631 20.4415L17.7032 19.8015C16.8658 19.4074 16.4471 19.2104 16 19.2104Z"
							})
						})
					})]
				}),
				isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `exit-plan-mode-floating__decision exit-plan-mode-floating__decision--${decision}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "exit-plan-mode-floating__decision-text",
						children: decisionText
					})
				})
			]
		});
	};
}))();
export { ExitPlanModeFloating };
