import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, B3 as init_adapter_context, Dz as useAssistantDisplay, E1 as init_useI18n, Ftt as MemoryErrorIcon, K2 as init_environment, L3 as init_account_context, Ntt as MemorySendIcon, O1 as useTranslation, Q2 as isOverseas, R3 as useAccount, R5 as Switch, T1 as init_clipboard, Tz as init_use_assistant_display, V3 as useAdapter, Vtt as LoadingIcon, c7 as Modal, dz as init_use_product_feature, fz as useProductFeature, jtt as MemorySendLoadingIcon, krt as Button, ktt as MemorySuccessIcon, m5 as init_src, w1 as copyToClipboard } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, er as ChatInput, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/MemorySettingsPanel.less
var init_MemorySettingsPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/MemoryModals.less
var init_MemoryModals = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/MemoryImportModal.tsx
/**
* 记忆导入弹窗
*/
function MemoryImportModal({ visible, onClose, onUpdateCompleted }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { name: productName = "WorkBuddy" } = useAssistantDisplay(adapter);
	const importPromptTemplate = t("settings.memory.modal.import.promptTemplate");
	const getLocalizedErrorMessage = (0, import_react$3.useCallback)((error) => {
		if (!error) return t("settings.memory.modal.import.importFailed");
		if (error.includes("another update is in progress")) return t("settings.memory.errors.updatingInProgress");
		if (error.includes("user not logged in")) return t("settings.memory.errors.notLoggedIn");
		if (error.includes("check memory updating failed")) return t("settings.memory.errors.checkUpdatingFailed");
		return t("settings.memory.modal.import.importFailed");
	}, [t]);
	const [content, setContent] = (0, import_react$3.useState)("");
	const [importState, setImportState] = (0, import_react$3.useState)("idle");
	const [errorMessage, setErrorMessage] = (0, import_react$3.useState)("");
	const [copied, setCopied] = (0, import_react$3.useState)(false);
	const [isMemoryUpdating, setIsMemoryUpdating] = (0, import_react$3.useState)(false);
	const [updatingCheckError, setUpdatingCheckError] = (0, import_react$3.useState)("");
	const prevIsMemoryUpdatingRef = (0, import_react$3.useRef)(false);
	const hasUserImportedRef = (0, import_react$3.useRef)(false);
	(0, import_react$3.useEffect)(() => {
		if (!visible) {
			setContent("");
			setImportState("idle");
			setErrorMessage("");
			setCopied(false);
			setIsMemoryUpdating(false);
			setUpdatingCheckError("");
			prevIsMemoryUpdatingRef.current = false;
			hasUserImportedRef.current = false;
		}
	}, [visible]);
	(0, import_react$3.useEffect)(() => {
		if (!visible) return;
		setUpdatingCheckError("");
		const frameId = window.requestAnimationFrame(() => {
			adapter.checkMemoryUpdating?.().then((result) => {
				const updating = result?.isUpdating ?? false;
				setIsMemoryUpdating(updating);
				if (result?.error) setUpdatingCheckError(getLocalizedErrorMessage(result.error));
				console.log("[MemoryImportModal] memory_update_lock_check", {
					entry: "import_modal",
					is_updating: updating
				});
			}).catch((error) => {
				setUpdatingCheckError(error instanceof Error ? error.message : String(error));
			});
		});
		console.log("[MemoryImportModal] memorySettingsImportExposure", {
			entry: "memory_import_modal",
			action: "exposure"
		});
		return () => window.cancelAnimationFrame(frameId);
	}, [
		visible,
		adapter,
		getLocalizedErrorMessage
	]);
	(0, import_react$3.useEffect)(() => {
		if (!visible || !isMemoryUpdating) return;
		prevIsMemoryUpdatingRef.current = true;
		const POLL_INTERVAL = 2500;
		let timerId = null;
		const pollUpdatingStatus = async () => {
			try {
				const result = await adapter.checkMemoryUpdating?.();
				const stillUpdating = result?.isUpdating ?? false;
				if (result?.error && !hasUserImportedRef.current) setUpdatingCheckError(getLocalizedErrorMessage(result.error));
				if (!stillUpdating && prevIsMemoryUpdatingRef.current) {
					console.log("[MemoryImportModal] memory update completed, transitioning from updating to idle");
					setIsMemoryUpdating(false);
					if (hasUserImportedRef.current) {
						onUpdateCompleted?.("import");
						onClose();
					}
					prevIsMemoryUpdatingRef.current = false;
				}
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				if (!hasUserImportedRef.current) setUpdatingCheckError(getLocalizedErrorMessage(msg));
			}
		};
		timerId = setInterval(pollUpdatingStatus, POLL_INTERVAL);
		return () => {
			if (timerId) clearInterval(timerId);
		};
	}, [
		visible,
		isMemoryUpdating,
		adapter,
		getLocalizedErrorMessage,
		onUpdateCompleted
	]);
	/** 关闭弹窗 */
	const handleClose = (0, import_react$3.useCallback)(() => {
		if (importState === "importing") return;
		onClose();
	}, [onClose, importState]);
	/** 复制提示词 */
	const handleCopyPrompt = (0, import_react$3.useCallback)(async () => {
		console.log("[MemoryImportModal] memorySettingsImportClick", {
			entry: "memory_import_modal",
			action: "click_copy_prompt"
		});
		if (await copyToClipboard(importPromptTemplate)) {
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} else console.error("[MemoryImportModal] Failed to copy prompt text");
	}, [importPromptTemplate]);
	/** 校验导入内容 */
	const validateContent = (0, import_react$3.useCallback)((text) => {
		const trimmed = text.trim();
		if (!trimmed) return t("settings.memory.modal.import.emptyContent");
		if (trimmed.length < MIN_CONTENT_LENGTH) return t("settings.memory.modal.import.contentTooShort");
		return null;
	}, [t]);
	/** 导入记忆 */
	const handleImport = (0, import_react$3.useCallback)(async () => {
		console.log("[MemoryImportModal] memorySettingsImportClick", {
			entry: "memory_import_modal",
			action: "click_import"
		});
		const validationError = validateContent(content);
		if (validationError) {
			setErrorMessage(validationError);
			setImportState("error");
			return;
		}
		setImportState("importing");
		setErrorMessage("");
		console.log("[MemoryImportModal] memorySettingsImportSubmit", {
			entry: "memory_import_modal",
			action: "submit",
			contentLength: content.trim().length
		});
		try {
			const result = await adapter.importMemoryContent?.({ content: content.trim() });
			if (!result) throw new Error("importMemoryContent is unavailable");
			if (!result.success || !result.imported) throw new Error(result.error || "Memory import was not completed");
			setIsMemoryUpdating(true);
			setImportState("success");
			setErrorMessage("");
			setUpdatingCheckError("");
			hasUserImportedRef.current = true;
			console.log("[MemoryImportModal] memorySettingsImportResult", {
				entry: "memory_import_modal",
				action: "result",
				result_code: "SUCCESS"
			});
		} catch (error) {
			setImportState("error");
			const detail = error instanceof Error ? error.message : String(error);
			setErrorMessage(getLocalizedErrorMessage(detail));
			console.log("[MemoryImportModal] memorySettingsImportResult", {
				entry: "memory_import_modal",
				action: "result",
				result_code: "FAIL",
				error: String(error)
			});
		}
	}, [
		adapter,
		content,
		validateContent,
		onClose,
		t,
		getLocalizedErrorMessage
	]);
	const isImportDisabled = !content.trim() || importState === "importing" || isMemoryUpdating;
	const isUpdatingBlocked = isMemoryUpdating && importState !== "importing";
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(Modal, {
		open: visible,
		onOpenChange: (next) => {
			if (!next) handleClose();
		},
		title: t("settings.memory.modal.import.title", { name: productName }),
		width: 640,
		height: 560,
		closeOnEscape: importState !== "importing",
		closeOnOverlayClick: importState !== "importing",
		className: "memory-modal--import",
		footer: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
			variant: "secondary",
			size: "medium",
			onClick: handleClose,
			disabled: importState === "importing",
			children: t("settings.memory.modal.import.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
			variant: "primary",
			size: "medium",
			onClick: handleImport,
			loading: importState === "importing" || isUpdatingBlocked,
			disabled: isImportDisabled,
			children: importState === "importing" ? t("settings.memory.modal.import.importing") : isUpdatingBlocked ? t("settings.memory.updating.short") : t("settings.memory.modal.import.import")
		})] }),
		children: [
			updatingCheckError && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "memory-modal__feedback memory-modal__feedback--error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(MemoryErrorIcon, {}), updatingCheckError]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "memory-modal__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "memory-modal__step-header memory-modal__step-header--with-action",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "memory-modal__step-number",
							children: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("label", {
							className: "memory-modal__label",
							children: t("settings.memory.modal.import.step1")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "primary",
							size: "medium",
							onClick: handleCopyPrompt,
							children: copied ? t("settings.memory.modal.import.copied") : t("settings.memory.modal.import.copyPrompt")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "memory-modal__prompt-box memory-modal__prompt-box--scrollable",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
						className: "memory-modal__prompt-text memory-modal__prompt-text--pre",
						children: importPromptTemplate
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "memory-modal__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "memory-modal__step-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "memory-modal__step-number",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("label", {
						className: "memory-modal__label",
						children: t("settings.memory.modal.import.step2", { name: productName })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("textarea", {
					className: "memory-modal__textarea memory-modal__textarea--large",
					placeholder: t("settings.memory.modal.import.placeholder"),
					value: content,
					onChange: (e) => {
						setContent(e.target.value);
						if (importState === "error") {
							setImportState("idle");
							setErrorMessage("");
						}
					},
					disabled: importState === "importing"
				})]
			}),
			importState === "error" && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "memory-modal__feedback memory-modal__feedback--error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(MemoryErrorIcon, {}), errorMessage]
			})
		]
	});
}
var import_react$3, import_jsx_runtime$3, MIN_CONTENT_LENGTH;
var init_MemoryImportModal = __esmMin((() => {
	init_MemoryModals();
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_useI18n();
	init_clipboard();
	init_use_assistant_display();
	import_jsx_runtime$3 = require_jsx_runtime();
	MIN_CONTENT_LENGTH = 20;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/memory-text-formatter.ts
/**
* 解析记忆文本中的 **标题** 格式
*
* 将 `**xxx**` 转换为 `{ type: 'bold', text: 'xxx' }`
* 其他文本转换为 `{ type: 'text', text: 'xxx' }`
*
* @param content 原始记忆文本
* @returns 解析后的文本片段数组
*
* @example
* parseMemoryText('**工作背景**\n用户负责...')
* // => [
* //   { type: 'bold', text: '工作背景' },
* //   { type: 'text', text: '\n用户负责...' }
* // ]
*/
function parseMemoryText(content) {
	if (!content) return [];
	const segments = [];
	const regex = /\*\*(.+?)\*\*/g;
	let lastIndex = 0;
	let match;
	while ((match = regex.exec(content)) !== null) {
		if (match.index > lastIndex) segments.push({
			type: "text",
			text: content.slice(lastIndex, match.index)
		});
		segments.push({
			type: "bold",
			text: match[1]
		});
		lastIndex = regex.lastIndex;
	}
	if (lastIndex < content.length) segments.push({
		type: "text",
		text: content.slice(lastIndex)
	});
	return segments;
}
var init_memory_text_formatter = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/FormattedMemoryText.tsx
/**
* 格式化记忆文本组件
*
* 解析并渲染记忆内容，将 **xxx** 格式的标题渲染为加粗样式
*/
function FormattedMemoryText({ content, className }) {
	const displayContent = (0, import_react$2.useMemo)(() => content.replace(/\n{2,}(?=\*\*)/g, "\n").replace(/\n{3,}/g, "\n\n").trim(), [content]);
	const segments = (0, import_react$2.useMemo)(() => parseMemoryText(displayContent), [displayContent]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("pre", {
		className: `memory-modal__memory-text${className ? ` ${className}` : ""}`,
		children: segments.map((segment, index) => segment.type === "bold" ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("strong", {
			className: "memory-modal__memory-title",
			children: segment.text
		}, index) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: segment.text }, index))
	});
}
var import_react$2, import_jsx_runtime$2;
var init_FormattedMemoryText = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_memory_text_formatter();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/MemoryManageModal.tsx
/**
* 按指定宽度测量编辑区的自然高度。
*
* 多行布局会把输入区从「输入框 + 发送按钮横排」切成上下结构，使真实编辑区变宽。
* 如果继续观察真实编辑区，高度会因重新变成单行而回落，进而形成布局振荡。
* 隐藏副本始终使用横排状态下的宽度，因此测量结果不受当前 class 影响。
*/
function measureEditableHeightAtWidth(editable, width) {
	const clone = editable.cloneNode(true);
	clone.removeAttribute("data-slate-editor");
	clone.removeAttribute("contenteditable");
	clone.setAttribute("aria-hidden", "true");
	clone.style.setProperty("position", "fixed", "important");
	clone.style.setProperty("left", "-100000px", "important");
	clone.style.setProperty("top", "0", "important");
	clone.style.setProperty("visibility", "hidden", "important");
	clone.style.setProperty("pointer-events", "none", "important");
	clone.style.setProperty("width", `${Math.max(width, 1)}px`, "important");
	clone.style.setProperty("min-height", "0", "important");
	clone.style.setProperty("max-height", "none", "important");
	clone.style.setProperty("height", "auto", "important");
	clone.style.setProperty("overflow-y", "auto", "important");
	clone.style.setProperty("scrollbar-gutter", "stable", "important");
	editable.parentElement?.appendChild(clone);
	const height = clone.scrollHeight;
	clone.remove();
	return height;
}
function getSubmitSuggestion(blocks) {
	return blocks.map((block) => block.type === "text" ? block.text ?? "" : "").join("").trim();
}
/** WorkBuddy 圆形发送按钮（与 settings-v2 记忆编辑输入一致） */
function renderSendButton(loading, disabled) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MemorySendLoadingIcon, {
		size: 32,
		"aria-hidden": "true"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MemorySendIcon, {
		size: 32,
		"aria-hidden": "true",
		color: disabled ? "color-mix(in srgb, var(--cb-input-button-foreground, #D2D3E0) 40%, transparent)" : void 0
	});
}
/**
* 记忆管理内联内容 —— 对齐 settings-v2 Card3
*
* 布局: 记忆卡片(标题 + 编辑/重置按钮 + 记忆内容 + 更新中 banner + 内联编辑输入框 + 反馈)
*/
function MemoryManageInline({ onImport, refreshToken = 0, onUpdateCompleted, onResetCompleted }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { account, isInitialized: accountInitialized } = useAccount();
	const memoryOwnerReady = accountInitialized && Boolean(account?.uid);
	const getLocalizedErrorMessage = (0, import_react$1.useCallback)((error) => {
		if (!error) return t("settings.memory.modal.manage.submitFailed");
		if (error.includes("another update is in progress")) return t("settings.memory.errors.updatingInProgress");
		if (error.includes("user not logged in")) return t("settings.memory.errors.notLoggedIn");
		if (error.includes("check memory updating failed")) return t("settings.memory.errors.checkUpdatingFailed");
		return t("settings.memory.modal.manage.submitFailed");
	}, [t]);
	const [memoryContent, setMemoryContent] = (0, import_react$1.useState)("");
	const [loadState, setLoadState] = (0, import_react$1.useState)("idle");
	const [isEditing, setIsEditing] = (0, import_react$1.useState)(false);
	const [memoryInputBlocks, setMemoryInputBlocks] = (0, import_react$1.useState)([]);
	const submitSuggestion = (0, import_react$1.useMemo)(() => getSubmitSuggestion(memoryInputBlocks), [memoryInputBlocks]);
	const [submitState, setSubmitState] = (0, import_react$1.useState)("idle");
	const [submitErrorMessage, setSubmitErrorMessage] = (0, import_react$1.useState)("");
	const [isMemoryUpdating, setIsMemoryUpdating] = (0, import_react$1.useState)(false);
	const [updatingCheckError, setUpdatingCheckError] = (0, import_react$1.useState)("");
	const prevIsMemoryUpdatingRef = (0, import_react$1.useRef)(false);
	const hasLocalSubmitRef = (0, import_react$1.useRef)(false);
	const chatInputWrapRef = (0, import_react$1.useRef)(null);
	const [isChatInputMultiline, setIsChatInputMultiline] = (0, import_react$1.useState)(false);
	const isChatInputMultilineRef = (0, import_react$1.useRef)(false);
	const chatInputRowReservedWidthRef = (0, import_react$1.useRef)(0);
	const [resetConfirmVisible, setResetConfirmVisible] = (0, import_react$1.useState)(false);
	const [resetSubmitting, setResetSubmitting] = (0, import_react$1.useState)(false);
	const isMemoryEmpty = !memoryContent.trim();
	const isMemoryBusy = resetSubmitting || isMemoryUpdating || submitState === "submitting";
	/**
	* 加载记忆内容
	*/
	const loadMemoryContent = (0, import_react$1.useCallback)(async () => {
		if (!memoryOwnerReady) return;
		setLoadState("loading");
		setUpdatingCheckError("");
		try {
			const memory = (await adapter.getMemoryProfile?.())?.memoryBlock || "";
			let updating = false;
			try {
				const updatingResult = await adapter.checkMemoryUpdating?.();
				updating = updatingResult?.isUpdating ?? false;
				if (updatingResult?.error) setUpdatingCheckError(getLocalizedErrorMessage(updatingResult.error));
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				setUpdatingCheckError(getLocalizedErrorMessage(msg));
			}
			setMemoryContent(memory);
			setIsMemoryUpdating(updating);
			setLoadState("success");
			console.log("[MemoryManageInline] memory_update_lock_check", {
				entry: "manage_modal",
				is_updating: updating
			});
			console.log("[MemoryManageInline] memorySettingsManageExposure", {
				entry: "memory_manage_modal",
				action: "exposure",
				hasContent: !!memory
			});
		} catch (error) {
			setLoadState("error");
			console.log("[MemoryManageInline] memorySettingsManageResult", {
				entry: "memory_manage_modal",
				action: "load_result",
				result_code: "FAIL",
				error: String(error)
			});
		}
	}, [
		adapter,
		getLocalizedErrorMessage,
		memoryOwnerReady
	]);
	(0, import_react$1.useEffect)(() => {
		if (loadState === "idle" && memoryOwnerReady) {
			const frameId = window.requestAnimationFrame(() => {
				loadMemoryContent().catch((error) => {
					console.error("[MemoryManageInline] loadMemoryContent failed:", error);
				});
			});
			return () => window.cancelAnimationFrame(frameId);
		}
	}, [
		loadState,
		loadMemoryContent,
		memoryOwnerReady
	]);
	(0, import_react$1.useEffect)(() => {
		if (refreshToken > 0) setLoadState("idle");
	}, [refreshToken]);
	(0, import_react$1.useEffect)(() => {
		if (!isMemoryUpdating) return;
		prevIsMemoryUpdatingRef.current = true;
		const pollUpdatingStatus = async () => {
			try {
				const result = await adapter.checkMemoryUpdating?.();
				const stillUpdating = result?.isUpdating ?? false;
				if (result?.error) setUpdatingCheckError(getLocalizedErrorMessage(result.error));
				if (!stillUpdating && prevIsMemoryUpdatingRef.current) {
					console.log("[MemoryManageInline] memory update completed, transitioning from updating to idle");
					const localSubmitted = hasLocalSubmitRef.current;
					setIsMemoryUpdating(false);
					setLoadState("idle");
					if (localSubmitted) {
						setSubmitState("idle");
						setMemoryInputBlocks([]);
						setIsEditing(false);
					}
					onUpdateCompleted?.(localSubmitted ? "submit" : "unknown");
					hasLocalSubmitRef.current = false;
					prevIsMemoryUpdatingRef.current = false;
				}
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				setUpdatingCheckError(getLocalizedErrorMessage(msg));
			}
		};
		const timerId = setInterval(pollUpdatingStatus, MEMORY_UPDATE_POLL_INTERVAL);
		return () => clearInterval(timerId);
	}, [
		isMemoryUpdating,
		adapter,
		getLocalizedErrorMessage,
		onUpdateCompleted
	]);
	/** 显示编辑框 */
	const handleShowEdit = (0, import_react$1.useCallback)(() => {
		setIsEditing(true);
	}, []);
	const chatInputClassName = [
		"memory-modal__chat-input",
		isMemoryUpdating ? "memory-modal__chat-input--disabled" : "",
		isChatInputMultiline ? "memory-modal__chat-input--multiline" : ""
	].filter(Boolean).join(" ");
	/** 取消编辑：退出编辑态并清空未提交的输入 */
	const handleCancelEdit = (0, import_react$1.useCallback)(() => {
		setIsEditing(false);
		setMemoryInputBlocks([]);
	}, []);
	(0, import_react$1.useEffect)(() => {
		if (!isEditing) return;
		const id = requestAnimationFrame(() => {
			chatInputWrapRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest"
			});
		});
		return () => cancelAnimationFrame(id);
	}, [isEditing]);
	(0, import_react$1.useEffect)(() => {
		if (!isEditing) return;
		const wrapEl = chatInputWrapRef.current;
		if (!wrapEl) return;
		let resizeObserver = null;
		let mutationObserver = null;
		let measureRafId = null;
		const rafId = requestAnimationFrame(() => {
			const editable = wrapEl.querySelector("[data-slate-editor=\"true\"]");
			if (!editable) return;
			const measureLayout = () => {
				const mainArea = editable.closest("[class*=\"_mainArea_\"]");
				if (!mainArea) return;
				const editableRect = editable.getBoundingClientRect();
				const style = getComputedStyle(mainArea);
				const contentWidth = mainArea.clientWidth - (Number.parseFloat(style.paddingLeft) || 0) - (Number.parseFloat(style.paddingRight) || 0);
				if (!isChatInputMultilineRef.current) {
					chatInputRowReservedWidthRef.current = Math.max(0, contentWidth - editableRect.width);
					if (editableRect.height > CHAT_INPUT_ENTER_MULTILINE_HEIGHT) {
						isChatInputMultilineRef.current = true;
						setIsChatInputMultiline(true);
					}
					return;
				}
				const rowEditableWidth = contentWidth - chatInputRowReservedWidthRef.current;
				if (measureEditableHeightAtWidth(editable, rowEditableWidth) < CHAT_INPUT_EXIT_MULTILINE_HEIGHT) {
					isChatInputMultilineRef.current = false;
					setIsChatInputMultiline(false);
				}
			};
			const scheduleMeasure = () => {
				if (measureRafId !== null) return;
				measureRafId = requestAnimationFrame(() => {
					measureRafId = null;
					measureLayout();
				});
			};
			resizeObserver = new ResizeObserver(scheduleMeasure);
			resizeObserver.observe(editable);
			mutationObserver = new MutationObserver(scheduleMeasure);
			mutationObserver.observe(editable, {
				childList: true,
				subtree: true,
				characterData: true
			});
			scheduleMeasure();
		});
		return () => {
			cancelAnimationFrame(rafId);
			if (measureRafId !== null) cancelAnimationFrame(measureRafId);
			resizeObserver?.disconnect();
			mutationObserver?.disconnect();
			isChatInputMultilineRef.current = false;
			chatInputRowReservedWidthRef.current = 0;
			setIsChatInputMultiline(false);
		};
	}, [isEditing]);
	/**
	* 打开重置确认弹窗
	* - 记忆为空 / 正在更新 / 正在提交时直接忽略
	*/
	const handleOpenResetConfirm = (0, import_react$1.useCallback)(() => {
		if (isMemoryEmpty || isMemoryBusy) return;
		setResetConfirmVisible(true);
		console.log("[MemoryManageInline] memory_reset_open_confirm", {
			entry: "manage_modal",
			action: "open_confirm",
			result_code: "SUCCESS"
		});
	}, [isMemoryBusy, isMemoryEmpty]);
	/** 取消重置（Cancel / ESC / 遮罩） */
	const handleCancelResetConfirm = (0, import_react$1.useCallback)(() => {
		if (resetSubmitting) return;
		setResetConfirmVisible(false);
		console.log("[MemoryManageInline] memory_reset_cancel", {
			entry: "manage_modal",
			action: "cancel",
			result_code: "SUCCESS"
		});
	}, [resetSubmitting]);
	/** 确认重置：调用 adapter.clearMemory，并降级到 importMemoryContent */
	const handleConfirmResetMemory = (0, import_react$1.useCallback)(async () => {
		if (isMemoryBusy) return;
		console.log("[MemoryManageInline] memory_reset_confirm", {
			entry: "manage_modal",
			action: "confirm",
			result_code: "SUCCESS"
		});
		setResetSubmitting(true);
		try {
			if (adapter.clearMemory) {
				const clearResult = await adapter.clearMemory();
				if (!clearResult.success) throw new Error(clearResult.error || "clear memory failed");
			} else {
				const importResult = await adapter.importMemoryContent?.({ content: "" });
				if (importResult && (!importResult.success || !importResult.imported)) throw new Error(importResult.error || "reset memory failed");
			}
			setMemoryContent("");
			setResetConfirmVisible(false);
			toast.success(t("settings.memory.reset.toast.success"));
			onResetCompleted?.();
			console.log("[MemoryManageInline] memoryResetResult", {
				entry: "manage_modal",
				action: "reset_result",
				result_code: "SUCCESS"
			});
		} catch (error) {
			toast.error(t("settings.memory.reset.toast.fail"));
			console.log("[MemoryManageInline] memoryResetResult", {
				entry: "manage_modal",
				action: "reset_result",
				result_code: "FAIL",
				error: String(error)
			});
		} finally {
			setResetSubmitting(false);
		}
	}, [
		adapter,
		isMemoryBusy,
		onResetCompleted,
		t
	]);
	/** 提交修改建议 */
	const handleSubmit = (0, import_react$1.useCallback)(async () => {
		if (!submitSuggestion || submitState === "submitting") return;
		console.log("[MemoryManageInline] memorySettingsManageClick", {
			entry: "memory_manage_modal",
			action: "click_submit"
		});
		setSubmitState("submitting");
		setSubmitErrorMessage("");
		console.log("[MemoryManageInline] memorySettingsManageSubmit", {
			entry: "memory_manage_modal",
			action: "submit",
			suggestionLength: submitSuggestion.length
		});
		try {
			const result = await adapter.submitMemorySuggestion?.({
				suggestion: submitSuggestion,
				currentMemory: memoryContent
			});
			if (!result) throw new Error("submitMemorySuggestion is unavailable");
			if (!result.success || !result.accepted) throw new Error(result.error || "Memory suggestion was not accepted");
			setIsMemoryUpdating(true);
			setSubmitState("success");
			hasLocalSubmitRef.current = true;
			console.log("[MemoryManageInline] memorySettingsManageResult", {
				entry: "memory_manage_modal",
				action: "result",
				result_code: "SUCCESS"
			});
		} catch (error) {
			setSubmitState("error");
			const detail = error instanceof Error ? error.message : String(error);
			setSubmitErrorMessage(getLocalizedErrorMessage(detail));
			console.log("[MemoryManageInline] memorySettingsManageResult", {
				entry: "memory_manage_modal",
				action: "result",
				result_code: "FAIL",
				error: String(error)
			});
		}
	}, [
		submitSuggestion,
		submitState,
		adapter,
		memoryContent,
		getLocalizedErrorMessage
	]);
	const visibleLoadState = loadState === "idle" ? "loading" : loadState;
	const hasMemory = visibleLoadState === "success" && !isMemoryEmpty;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "memory-modal memory-modal--manage memory-modal--inline",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "memory-modal__detail-item",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "memory-modal__detail-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "memory-modal__detail-copy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", {
							className: "memory-modal__detail-name",
							children: t("settings.memory.importMemory")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
							className: "memory-modal__detail-desc",
							children: t("settings.memory.importMemory.description")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "memory-modal__detail-actions",
						children: [visibleLoadState === "success" && !hasMemory && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							variant: "secondary",
							size: "medium",
							onClick: onImport,
							children: t("settings.memory.importMemory.button")
						}), hasMemory && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "secondary",
								danger: true,
								size: "medium",
								onClick: handleOpenResetConfirm,
								disabled: isMemoryBusy,
								children: t("common.reset")
							}),
							isEditing ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								onClick: handleCancelEdit,
								disabled: isMemoryUpdating,
								children: t("common.cancel")
							}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								onClick: handleShowEdit,
								loading: isMemoryUpdating,
								disabled: isMemoryUpdating,
								children: t("common.edit")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								onClick: onImport,
								disabled: isMemoryUpdating,
								children: t("settings.memory.importMemory.button")
							})
						] })]
					})]
				}),
				hasMemory && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "memory-modal__detail-divider" }),
				visibleLoadState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "memory-modal__loading",
					children: t("settings.memory.modal.manage.loading")
				}),
				visibleLoadState === "error" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "memory-modal__error",
					children: t("settings.memory.modal.manage.loadFailed")
				}),
				hasMemory && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FormattedMemoryText, {
					content: memoryContent,
					className: isMemoryUpdating ? "memory-modal__memory-text--updating" : void 0
				}),
				isMemoryUpdating && !isEditing && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "memory-modal__updating-banner memory-modal__updating-banner--floating",
					role: "status",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "memory-modal__updating-spinner",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LoadingIcon, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "memory-modal__updating-title",
						children: t("settings.memory.updating.title")
					})]
				}),
				!isMemoryUpdating && updatingCheckError && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "memory-modal__feedback memory-modal__feedback--error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MemoryErrorIcon, {}), updatingCheckError]
				}),
				isEditing && hasMemory && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "memory-modal__chat-input-wrap",
					ref: chatInputWrapRef,
					children: [isMemoryUpdating && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "memory-modal__updating-banner memory-modal__updating-banner--above-input",
						role: "status",
						"aria-live": "polite",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "memory-modal__updating-spinner",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LoadingIcon, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "memory-modal__updating-title",
							children: t("settings.memory.updating.title")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChatInput, {
						className: chatInputClassName,
						placeholder: t("settings.memory.modal.manage.suggestionPlaceholder"),
						value: memoryInputBlocks,
						onChange: setMemoryInputBlocks,
						onSubmit: handleSubmit,
						disabled: isMemoryUpdating || submitState === "submitting",
						resizeDisabled: true,
						hideTopArea: true,
						minInputHeight: 32,
						rememberHeight: false,
						renderSendButtonContent: renderSendButton,
						modelSelectorPlacement: "beforeSendButton",
						disableContextUsage: true,
						attachmentConfig: CHAT_INPUT_ATTACHMENT_CONFIG
					})]
				}),
				submitState === "success" && !isMemoryUpdating && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "memory-modal__feedback memory-modal__feedback--success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MemorySuccessIcon, {}), t("settings.memory.modal.manage.submitSuccess")]
				}),
				submitState === "error" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "memory-modal__feedback memory-modal__feedback--error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MemoryErrorIcon, {}), submitErrorMessage || t("settings.memory.modal.manage.submitFailed")]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Modal, {
		open: resetConfirmVisible,
		onOpenChange: (next) => {
			if (!next) handleCancelResetConfirm();
		},
		variant: "confirm",
		width: 480,
		title: t("settings.memory.chatMemoryResetModalTitle"),
		okText: t("settings.memory.chatMemoryResetModalConfirm"),
		cancelText: t("common.cancel"),
		okType: "danger",
		confirmLoading: resetSubmitting,
		onOk: handleConfirmResetMemory,
		onCancel: handleCancelResetConfirm,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "memory-modal__reset-confirm-desc cb-font-size-fixed",
			children: t("settings.memory.chatMemoryResetModalDesc")
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "memory-modal__reset-confirm-hint cb-font-size-fixed",
			children: t("settings.memory.chatMemoryResetModalHint")
		})]
	})] });
}
var import_react$1, import_jsx_runtime$1, MEMORY_UPDATE_POLL_INTERVAL, CHAT_INPUT_ATTACHMENT_CONFIG, CHAT_INPUT_ENTER_MULTILINE_HEIGHT, CHAT_INPUT_EXIT_MULTILINE_HEIGHT;
var init_MemoryManageModal = __esmMin((() => {
	init_MemoryModals();
	init_src$1();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_account_context();
	init_adapter_context();
	init_useI18n();
	init_FormattedMemoryText();
	import_jsx_runtime$1 = require_jsx_runtime();
	MEMORY_UPDATE_POLL_INTERVAL = 2500;
	CHAT_INPUT_ATTACHMENT_CONFIG = { enabled: false };
	CHAT_INPUT_ENTER_MULTILINE_HEIGHT = 40;
	CHAT_INPUT_EXIT_MULTILINE_HEIGHT = 36;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/MemorySettingsPanel.tsx
function updateMemorySettingsSnapshot(patch) {
	memorySettingsSnapshot = {
		generateMemoryEnabled: true,
		localMemoryEnabled: false,
		memoryPreview: "",
		memoryUpdatedAt: "",
		...memorySettingsSnapshot,
		...patch
	};
}
/**
* Memory Settings Panel
* 记忆设置面板 - 设计稿 v1 版本
*/
function MemorySettingsPanel() {
	const t = useTranslation();
	const adapter = useAdapter();
	const { account, isInitialized: accountInitialized } = useAccount();
	const memoryOwnerReady = accountInitialized && Boolean(account?.uid);
	const { name: productName = "WorkBuddy" } = useAssistantDisplay(adapter);
	const [generateMemoryEnabled, setGenerateMemoryEnabled] = (0, import_react.useState)(() => memorySettingsSnapshot?.generateMemoryEnabled ?? true);
	const [localMemoryEnabled, setLocalMemoryEnabled] = (0, import_react.useState)(() => memorySettingsSnapshot?.localMemoryEnabled ?? false);
	const [memorySettingSubmitting, setMemorySettingSubmitting] = (0, import_react.useState)(false);
	const [memoryImportModalVisible, setMemoryImportModalVisible] = (0, import_react.useState)(false);
	const [memoryManageRefreshToken, setMemoryManageRefreshToken] = (0, import_react.useState)(0);
	const [, setMemoryPreview] = (0, import_react.useState)(() => memorySettingsSnapshot?.memoryPreview ?? "");
	const [, setMemoryUpdatedAt] = (0, import_react.useState)(() => memorySettingsSnapshot?.memoryUpdatedAt ?? "");
	const disposedRef = (0, import_react.useRef)(false);
	const lastToastRef = (0, import_react.useRef)(null);
	/**
	* 统一 toast 方法，支持 submit/import/unknown 三类文案映射
	* 包含轻量去重逻辑，避免 modal 回调与 adapter.on('memory-update-toast') 短时间内重复弹
	*/
	const showMemoryUpdateToast = (0, import_react.useCallback)((source) => {
		const now = Date.now();
		const last = lastToastRef.current;
		if (last && last.source === source && now - last.timestamp < TOAST_DEDUP_INTERVAL) {
			console.log("[MemorySettingsPanel] toast deduplicated", {
				source,
				lastTimestamp: last.timestamp
			});
			return;
		}
		lastToastRef.current = {
			source,
			timestamp: now
		};
		let toastMessage;
		if (source === "submit") toastMessage = t("settings.memory.updating.toast.submit");
		else if (source === "import") toastMessage = t("settings.memory.updating.toast.import");
		else toastMessage = t("settings.memory.updating.toast");
		toast.success(toastMessage);
		console.log("[MemorySettingsPanel] toast shown", {
			source,
			message: toastMessage
		});
	}, [t]);
	const loadMemorySettings = (0, import_react.useCallback)(async () => {
		if (!memoryOwnerReady) return;
		try {
			const profile = await adapter.getMemoryProfile?.();
			if (disposedRef.current || !profile) return;
			let nextGenerateMemoryEnabled = memorySettingsSnapshot?.generateMemoryEnabled ?? true;
			let nextLocalMemoryEnabled = memorySettingsSnapshot?.localMemoryEnabled ?? false;
			let nextMemoryPreview = "";
			let nextMemoryUpdatedAt = "";
			if (typeof profile.generateMemoryEnabled === "boolean") {
				nextGenerateMemoryEnabled = profile.generateMemoryEnabled;
				setGenerateMemoryEnabled(nextGenerateMemoryEnabled);
			}
			if (typeof profile.localMemoryEnabled === "boolean") {
				nextLocalMemoryEnabled = profile.localMemoryEnabled;
				setLocalMemoryEnabled(nextLocalMemoryEnabled);
			}
			const memoryBlock = profile.memoryBlock || "";
			if (memoryBlock) {
				nextMemoryPreview = memoryBlock.substring(0, 200) + (memoryBlock.length > 200 ? "..." : "");
				setMemoryPreview(nextMemoryPreview);
			} else {
				setMemoryPreview("");
				console.log("[MemorySettingsPanel] memory_empty_state_shown", {
					entry: "settings_panel",
					trigger: "initial_load",
					result_code: "SUCCESS"
				});
			}
			if (isValidUpdatedAt(profile.updatedAt)) {
				nextMemoryUpdatedAt = formatTimeAgo(profile.updatedAt);
				setMemoryUpdatedAt(nextMemoryUpdatedAt);
			} else setMemoryUpdatedAt("");
			updateMemorySettingsSnapshot({
				generateMemoryEnabled: nextGenerateMemoryEnabled,
				localMemoryEnabled: nextLocalMemoryEnabled,
				memoryPreview: nextMemoryPreview,
				memoryUpdatedAt: nextMemoryUpdatedAt
			});
		} catch (error) {
			console.error("[MemorySettingsPanel] Failed to load memory settings:", error);
		}
	}, [adapter, memoryOwnerReady]);
	(0, import_react.useEffect)(() => {
		disposedRef.current = false;
		loadMemorySettings();
		return () => {
			disposedRef.current = true;
		};
	}, [loadMemorySettings]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter.on("memory-update-toast", (data) => {
			const payload = data;
			console.log("[MemorySettingsPanel] memory-update-toast received:", payload);
			const source = payload?.source || "unknown";
			showMemoryUpdateToast(source);
		});
		return () => {
			unsubscribe?.();
		};
	}, [adapter, showMemoryUpdateToast]);
	/**
	* 判断后端返回的 updatedAt 是否为有效时间
	* - 空字符串 / falsy 视为无效
	* - Go 零值时间 "0001-01-01T00:00:00Z" 视为无效（删除后接口会返回该值）
	* - 无法解析为合法 Date 的字符串视为无效
	*/
	const isValidUpdatedAt = (dateStr) => {
		if (!dateStr) return false;
		if (dateStr.startsWith("0001-01-01")) return false;
		const ts = new Date(dateStr).getTime();
		return Number.isFinite(ts) && ts > 0;
	};
	/**
	* 格式化时间差
	*/
	const formatTimeAgo = (dateStr) => {
		if (!isValidUpdatedAt(dateStr)) return "";
		try {
			const date = new Date(dateStr);
			const diffMs = (/* @__PURE__ */ new Date()).getTime() - date.getTime();
			const diffMin = Math.floor(diffMs / 6e4);
			if (diffMin < 1) return t("settings.memory.chatMemoryUpdated").replace("{time}", t("settings.memory.time.justNow"));
			if (diffMin < 60) return t("settings.memory.chatMemoryUpdated").replace("{time}", t("settings.memory.time.minutesAgo").replace("{count}", String(diffMin)));
			const diffHours = Math.floor(diffMin / 60);
			if (diffHours < 24) return t("settings.memory.chatMemoryUpdated").replace("{time}", t("settings.memory.time.hoursAgo").replace("{count}", String(diffHours)));
			const diffDays = Math.floor(diffHours / 24);
			return t("settings.memory.chatMemoryUpdated").replace("{time}", t("settings.memory.time.daysAgo").replace("{count}", String(diffDays)));
		} catch {
			return "";
		}
	};
	/**
	* 处理生成对话记忆开关变更
	*/
	const handleGenerateMemoryChange = (0, import_react.useCallback)(async (checked) => {
		const previousValue = generateMemoryEnabled;
		console.log("[MemorySettingsPanel] memorySettingsToggleClick", {
			entry: "memory_settings",
			action: "toggle_click",
			newValue: checked
		});
		setGenerateMemoryEnabled(checked);
		updateMemorySettingsSnapshot({ generateMemoryEnabled: checked });
		setMemorySettingSubmitting(true);
		console.log("[MemorySettingsPanel] memorySettingsToggleSubmit", {
			entry: "memory_settings",
			action: "toggle_submit",
			value: checked
		});
		try {
			const result = await adapter.saveMemorySettings?.({
				generateMemoryEnabled: checked,
				localMemoryEnabled
			});
			const finalValue = typeof result?.generateMemoryEnabled === "boolean" ? result.generateMemoryEnabled : checked;
			setGenerateMemoryEnabled(finalValue);
			updateMemorySettingsSnapshot({ generateMemoryEnabled: finalValue });
			console.log("[MemorySettingsPanel] memorySettingsToggleResult", {
				entry: "memory_settings",
				action: "toggle_result",
				result_code: "SUCCESS",
				value: finalValue
			});
		} catch (error) {
			setGenerateMemoryEnabled(previousValue);
			updateMemorySettingsSnapshot({ generateMemoryEnabled: previousValue });
			console.log("[MemorySettingsPanel] memorySettingsToggleResult", {
				entry: "memory_settings",
				action: "toggle_result",
				result_code: "FAIL",
				value: previousValue,
				error: String(error)
			});
		} finally {
			setMemorySettingSubmitting(false);
		}
	}, [
		adapter,
		generateMemoryEnabled,
		localMemoryEnabled
	]);
	/**
	* 处理本地记忆开关变更
	*/
	const handleLocalMemoryChange = (0, import_react.useCallback)(async (checked) => {
		const previousValue = localMemoryEnabled;
		setLocalMemoryEnabled(checked);
		updateMemorySettingsSnapshot({ localMemoryEnabled: checked });
		setMemorySettingSubmitting(true);
		try {
			const result = await adapter.saveMemorySettings?.({
				generateMemoryEnabled,
				localMemoryEnabled: checked
			});
			const finalValue = typeof result?.localMemoryEnabled === "boolean" ? result.localMemoryEnabled : checked;
			setLocalMemoryEnabled(finalValue);
			updateMemorySettingsSnapshot({ localMemoryEnabled: finalValue });
		} catch (error) {
			setLocalMemoryEnabled(previousValue);
			updateMemorySettingsSnapshot({ localMemoryEnabled: previousValue });
			console.error("[MemorySettingsPanel] Failed to update local memory setting:", error);
		} finally {
			setMemorySettingSubmitting(false);
		}
	}, [
		adapter,
		generateMemoryEnabled,
		localMemoryEnabled
	]);
	/**
	* 打开记忆导入弹窗
	*/
	const handleOpenMemoryImport = (0, import_react.useCallback)(() => {
		setMemoryImportModalVisible(true);
		console.log("[MemorySettingsPanel] memorySettingsImportClick", {
			entry: "memory_settings",
			action: "open_import_modal"
		});
	}, []);
	/**
	* 重置完成后刷新预览（toast 已在管理组件内部弹出）
	*/
	const handleMemoryResetCompleted = (0, import_react.useCallback)(() => {
		setMemoryPreview("");
		setMemoryUpdatedAt("");
		updateMemorySettingsSnapshot({
			generateMemoryEnabled,
			localMemoryEnabled,
			memoryPreview: "",
			memoryUpdatedAt: ""
		});
		loadMemorySettings().catch((error) => {
			console.error("[MemorySettingsPanel] refresh after reset failed:", error);
		});
		console.log("[MemorySettingsPanel] memory_empty_state_shown", {
			entry: "settings_panel",
			trigger: "reset",
			result_code: "SUCCESS"
		});
	}, [
		generateMemoryEnabled,
		loadMemorySettings,
		localMemoryEnabled
	]);
	const handleMemoryManageUpdateCompleted = (0, import_react.useCallback)((source) => {
		showMemoryUpdateToast(source);
		loadMemorySettings().catch((error) => {
			console.error("[MemorySettingsPanel] refresh after inline manage completion failed:", error);
		});
	}, [loadMemorySettings, showMemoryUpdateToast]);
	const handleCloseMemoryImport = (0, import_react.useCallback)(() => {
		setMemoryImportModalVisible(false);
	}, []);
	const handleMemoryImportUpdateCompleted = (0, import_react.useCallback)((source) => {
		showMemoryUpdateToast(source);
		setMemoryManageRefreshToken((token) => token + 1);
		loadMemorySettings().catch((error) => {
			console.error("[MemorySettingsPanel] refresh after import modal completion failed:", error);
		});
	}, [loadMemorySettings, showMemoryUpdateToast]);
	const isLocalMode = adapter?.environmentType === "local";
	const shouldHideLocalMemorySetting = isWorkBuddy() && isLocalMode;
	const showPrivacyPolicyLink = useProductFeature("DisableLoginLegalLinks");
	const privacyPolicyUrl = isOverseas() ? "https://www.workbuddy.ai/document/privacy-policy" : "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966";
	const handleOpenPrivacyPolicy = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		if (isLocalMode) adapter?.emit("open-external", privacyPolicyUrl);
		else window.open(privacyPolicyUrl, "_blank", "noopener,noreferrer");
	}, [adapter, isLocalMode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "memory-settings-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "memory-settings-panel__intro",
				children: [t("settings.memory.intro", { name: productName }), showPrivacyPolicyLink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "memory-settings-panel__privacy-prefix",
						children: t("settings.memory.privacy.prefix")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "memory-settings-panel__privacy-link",
						href: privacyPolicyUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: handleOpenPrivacyPolicy,
						children: t("settings.memory.privacy.linkText", { name: productName })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "memory-settings-panel__privacy-suffix",
						children: t("settings.memory.privacy.suffix")
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `memory-settings-panel__generate-memory-group ${generateMemoryEnabled ? "memory-settings-panel__generate-memory-group--expanded" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "memory-settings-panel__setting-row memory-settings-panel__setting-row--in-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "memory-settings-panel__setting-text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "memory-settings-panel__setting-name",
							children: t("settings.memory.generateMemory")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "memory-settings-panel__setting-desc",
							children: t("settings.memory.generateMemory.description", { name: productName })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: generateMemoryEnabled,
						onChange: (e) => handleGenerateMemoryChange(e.target.checked),
						disabled: memorySettingSubmitting,
						size: "large"
					}) })]
				}), !shouldHideLocalMemorySetting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "memory-settings-panel__setting-row memory-settings-panel__setting-row--in-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "memory-settings-panel__setting-text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "memory-settings-panel__setting-name",
							children: t("settings.memory.localMemory")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "memory-settings-panel__setting-desc",
							children: t("settings.memory.localMemory.description")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: localMemoryEnabled,
						onChange: (e) => handleLocalMemoryChange(e.target.checked),
						disabled: memorySettingSubmitting,
						size: "large"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "memory-settings-panel__manage-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryManageInline, {
					onImport: handleOpenMemoryImport,
					refreshToken: memoryManageRefreshToken,
					onUpdateCompleted: handleMemoryManageUpdateCompleted,
					onResetCompleted: handleMemoryResetCompleted
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryImportModal, {
				visible: memoryImportModalVisible,
				onClose: handleCloseMemoryImport,
				onUpdateCompleted: handleMemoryImportUpdateCompleted
			})
		]
	});
}
var import_react, import_jsx_runtime, TOAST_DEDUP_INTERVAL, memorySettingsSnapshot;
//#endregion
__esmMin((() => {
	init_MemorySettingsPanel$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_account_context();
	init_adapter_context();
	init_use_product_feature();
	init_useI18n();
	init_environment();
	init_use_assistant_display();
	init_MemoryImportModal();
	init_MemoryManageModal();
	import_jsx_runtime = require_jsx_runtime();
	TOAST_DEDUP_INTERVAL = 3e3;
	memorySettingsSnapshot = null;
}))();
export { MemorySettingsPanel };
