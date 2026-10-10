const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ui-docs-viewer-Bo02yf1Q.js","./rolldown-runtime-V4kyJ4NV.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A7 as Input, B3 as init_adapter_context, C1 as useThemeListener, Ch as saveLoadingTipsEnabled, Dz as useAssistantDisplay, E1 as init_useI18n, Ez as init_use_assistant_display, H as init_auth_context, H7 as EditToolIcon, J5 as Select, O1 as useTranslation, R5 as Switch, Sh as loadingTipsDismissedPreference, Tz as init_use_assistant_display$1, U as useAccountService, V3 as useAdapter, _R as isShowFileChangesEnabled, bE as init_errors, bI as SettingSection, bh as isEnterpriseLoadingTipsAccount, c7 as Modal, gR as init_file_changes_preference, i7 as Tooltip, krt as Button, l7 as ModalBody, m5 as init_src, vE as extractErrorMessage, vR as saveShowFileChangesEnabled, x1 as init_useTheme, xI as init_setting_section, xh as isLoadingTipsEnabled, yR as showFileChangesPreference, yh as init_loading_tips_preference } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Ov as __vitePreload, Tv as require_jsx_runtime, kv as init_preload_helper, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/PersonalizationPanel.less
var init_PersonalizationPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-memory/LocalMemoryCard.tsx
/**
* 本地长期记忆 - 展示 / 编辑基元。
*
* 对齐设计稿的两类形态：
*  - LocalMemoryIdentityRow：称呼与身份合并卡内的单行（标签 + 描边胶囊，点击胶囊就地编辑）。
*  - LocalMemoryLongSection：人设 / 关于我 分区（标题行 + 右侧「编辑」入口 + 下方预览框）。
*
* 纯受控展示组件，自身不持有编辑状态。
*/
function fieldPlaceholder(t, opts) {
	if (opts.loading) return { text: t("settings.personalization.localMemory.loading") };
	if (opts.malformed) return {
		text: t("settings.personalization.localMemory.malformed"),
		error: true
	};
	return { text: opts.exists ? t("settings.personalization.localMemory.empty") : t("settings.personalization.localMemory.notCreated") };
}
function LocalMemoryIdentityRow(props) {
	const { title, value, loading, exists, malformed, editing, draft, saving, onDraftChange, onEditStart, onEditSave, onEditCancel } = props;
	const t = useTranslation();
	const hasContent = !loading && !malformed && value.trim().length > 0;
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "local-memory-identity-row local-memory-identity-row--editing",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "local-memory-identity-row__label",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "local-memory-identity-row__edit",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
				value: draft ?? "",
				onChange: (e) => onDraftChange?.(e.target.value),
				autoFocus: true,
				disabled: saving,
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.nativeEvent.isComposing) {
						e.preventDefault();
						onEditSave?.();
					} else if (e.key === "Escape") {
						e.stopPropagation();
						onEditCancel?.();
					}
				},
				onBlur: () => {
					if (!saving) onEditCancel?.();
				}
			})
		})]
	});
	const placeholder = hasContent ? null : fieldPlaceholder(t, {
		loading,
		malformed,
		exists
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "local-memory-identity-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "local-memory-identity-row__label",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
			type: "button",
			className: "local-memory-pill",
			onClick: onEditStart,
			disabled: loading,
			title: t("settings.personalization.localMemory.edit"),
			children: hasContent ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "local-memory-pill__value",
				children: value
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: `local-memory-pill__placeholder${placeholder?.error ? " local-memory-pill__placeholder--error" : ""}`,
				children: placeholder?.text
			})
		})]
	});
}
function LocalMemoryLongSection(props) {
	const { title, value, loading, exists, malformed, editable = true, onOpenEditor } = props;
	const t = useTranslation();
	const hasContent = !loading && !malformed && value.trim().length > 0;
	const placeholder = hasContent ? null : fieldPlaceholder(t, {
		loading,
		malformed,
		exists
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "local-memory-long",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "local-memory-long__header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "local-memory-section__group-label",
				children: title
			}), editable && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
				variant: "ghost",
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(EditToolIcon, { size: 16 }),
				onClick: onOpenEditor,
				disabled: loading,
				children: t("settings.personalization.localMemory.edit")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "local-memory-long__preview",
			onClick: editable && !loading ? onOpenEditor : void 0,
			role: editable ? "button" : void 0,
			tabIndex: editable && !loading ? 0 : void 0,
			children: hasContent ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "local-memory-long__value",
				children: value
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: `local-memory-long__placeholder${placeholder?.error ? " local-memory-long__placeholder--error" : ""}`,
				children: placeholder?.text
			})
		})]
	});
}
var import_jsx_runtime$3;
var init_LocalMemoryCard = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-memory/LocalMemoryEditModal.tsx
function LocalMemoryEditModal(props) {
	const { open, title, initialValue, onClose, onSave } = props;
	const t = useTranslation();
	const { theme } = useThemeListener();
	const editorTheme = theme === "light" ? "light" : "dark";
	const editorRef = (0, import_react$2.useRef)(null);
	const contentRef = (0, import_react$2.useRef)(initialValue);
	const pendingResolveRef = (0, import_react$2.useRef)(null);
	(0, import_react$2.useEffect)(() => {
		if (open) contentRef.current = initialValue;
	}, [open, initialValue]);
	const captureContent = (0, import_react$2.useCallback)((content) => {
		contentRef.current = content;
		pendingResolveRef.current?.(content);
		pendingResolveRef.current = null;
	}, []);
	const flushLatest = (0, import_react$2.useCallback)(async () => {
		const captured = new Promise((resolve) => {
			pendingResolveRef.current = resolve;
		});
		const fallback = new Promise((resolve) => {
			setTimeout(() => resolve(contentRef.current), 300);
		});
		editorRef.current?.onSave()?.catch(() => void 0);
		const value = await Promise.race([captured, fallback]);
		pendingResolveRef.current = null;
		return value;
	}, []);
	const handleOk = (0, import_react$2.useCallback)(async () => {
		const content = await flushLatest();
		return onSave(content);
	}, [flushLatest, onSave]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Modal, {
		open,
		onOpenChange: (next) => {
			if (!next) onClose();
		},
		title,
		size: "small",
		className: "local-memory-edit-modal",
		closeOnOverlayClick: false,
		okText: t("settings.personalization.localMemory.save"),
		cancelText: t("settings.personalization.localMemory.cancel"),
		onOk: handleOk,
		onCancel: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "local-memory-editor-host",
			children: open && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_react$2.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "local-memory-editor-loading",
					children: t("settings.personalization.localMemory.loading")
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LazyMarkdownEditor, {
					ref: editorRef,
					content: initialValue,
					onSave: captureContent,
					themeName: editorTheme
				})
			})
		}) })
	});
}
var import_react$2, import_jsx_runtime$2, LazyMarkdownEditor;
var init_LocalMemoryEditModal = __esmMin((() => {
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_useTheme();
	import_jsx_runtime$2 = require_jsx_runtime();
	init_preload_helper();
	LazyMarkdownEditor = import_react$2.lazy(() => __vitePreload(() => import("./ui-docs-viewer-Bo02yf1Q.js").then((n) => (n.K6(), n.q6)).then((m) => ({ default: m.MarkdownEditorComponent })), __vite__mapDeps([0,1,2,3,4,5]), import.meta.url));
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-memory/local-memory.less
var init_local_memory$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-memory/to-preview.ts
/**
* 将 markdown 正文转为干净的纯文本预览（卡片只读展示用）。
*
* 处理：
*  - 跳过开头的标题行（`# xxx`）与空行（PRD：不展示标题头）
*  - 去除强调符号 `**` / `__` / `*` / `_` / 行内 code 反引号（避免 `_我是..._` 直接暴露）
*  - 折叠多余空行并 trim
*
* 仅用于展示；编辑态使用未经处理的原始正文，保证写回结构不被破坏。
*/
function toPlainPreview(md) {
	if (!md) return "";
	const lines = md.split(/\r?\n/);
	let start = 0;
	while (start < lines.length && (/^\s*#{1,6}\s+/.test(lines[start]) || lines[start].trim() === "")) start += 1;
	return lines.slice(start).map((line) => line.replace(/^\s*#{1,6}\s+/, "")).join("\n").replace(/\*\*(.+?)\*\*/g, "$1").replace(/__(.+?)__/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/_(.+?)_/g, "$1").replace(/`([^`]+?)`/g, "$1").replace(/\n{3,}/g, "\n\n").trim();
}
var init_to_preview = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-memory/LocalMemorySection.tsx
function LocalMemorySection() {
	const t = useTranslation();
	const adapter = useAdapter();
	const { name: productName = "WorkBuddy" } = useAssistantDisplay(adapter);
	const [loading, setLoading] = (0, import_react$1.useState)(true);
	const [userCallName, setUserCallName] = (0, import_react$1.useState)(EMPTY_FIELD);
	const [aiName, setAiName] = (0, import_react$1.useState)(EMPTY_FIELD);
	const [soul, setSoul] = (0, import_react$1.useState)(EMPTY_FIELD);
	const [memory, setMemory] = (0, import_react$1.useState)(EMPTY_FIELD);
	const [inlineKey, setInlineKey] = (0, import_react$1.useState)(null);
	const [draft, setDraft] = (0, import_react$1.useState)("");
	const [savingInline, setSavingInline] = (0, import_react$1.useState)(false);
	/** 长文本编辑弹窗目标：soul / memory（均为本地文件）/ null（关闭） */
	const [editorTarget, setEditorTarget] = (0, import_react$1.useState)(null);
	const disposedRef = (0, import_react$1.useRef)(false);
	const reload = (0, import_react$1.useCallback)(async () => {
		if (!adapter?.getLocalMemoryFiles) {
			setLoading(false);
			return;
		}
		const filesResult = await adapter.getLocalMemoryFiles().catch(() => void 0);
		if (disposedRef.current) return;
		const files = filesResult;
		setUserCallName(files?.userCallName ?? EMPTY_FIELD);
		setAiName(files?.aiName ?? EMPTY_FIELD);
		setSoul(files ? {
			value: files.soul.content,
			exists: files.soul.exists,
			malformed: files.soul.malformed
		} : EMPTY_FIELD);
		setMemory(files ? {
			value: files.memory.content,
			exists: files.memory.exists,
			malformed: files.memory.malformed
		} : EMPTY_FIELD);
		setLoading(false);
	}, [adapter]);
	(0, import_react$1.useEffect)(() => {
		disposedRef.current = false;
		reload().catch(() => void 0);
		return () => {
			disposedRef.current = true;
		};
	}, [reload]);
	const startInline = (0, import_react$1.useCallback)((key, current) => {
		setInlineKey(key);
		setDraft(current);
	}, []);
	const cancelInline = (0, import_react$1.useCallback)(() => {
		setInlineKey(null);
		setDraft("");
	}, []);
	const saveInline = (0, import_react$1.useCallback)(async () => {
		const name = draft.trim();
		if (!name || !inlineKey) return;
		setSavingInline(true);
		try {
			const res = inlineKey === "user" ? await adapter.updateUserCallName?.(name) : await adapter.updateAiName?.(name);
			if (res?.success) {
				toast.success(t("settings.personalization.localMemory.updated"));
				setInlineKey(null);
				setDraft("");
				await reload();
			} else toast.error(res?.error || t("settings.personalization.localMemory.saveError"));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("settings.personalization.localMemory.saveError"));
		} finally {
			if (!disposedRef.current) setSavingInline(false);
		}
	}, [
		adapter,
		draft,
		inlineKey,
		reload,
		t
	]);
	const saveSoul = (0, import_react$1.useCallback)(async (body) => {
		try {
			const res = await adapter.updateSoulBody?.(body);
			if (res?.success) {
				toast.success(t("settings.personalization.localMemory.updated"));
				await reload();
				return true;
			}
			toast.error(res?.error || t("settings.personalization.localMemory.saveError"));
			return false;
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("settings.personalization.localMemory.saveError"));
			return false;
		}
	}, [
		adapter,
		reload,
		t
	]);
	const saveMemory = (0, import_react$1.useCallback)(async (content) => {
		try {
			const res = await adapter.updateMemoryBody?.(content);
			if (res?.success) {
				toast.success(t("settings.personalization.localMemory.updated"));
				await reload();
				return true;
			}
			toast.error(res?.error || t("settings.personalization.localMemory.saveError"));
			return false;
		} catch (error) {
			toast.error(error instanceof Error ? error.message : t("settings.personalization.localMemory.saveError"));
			return false;
		}
	}, [
		adapter,
		reload,
		t
	]);
	if (!adapter?.getLocalMemoryFiles) return null;
	const editorConfig = editorTarget === "soul" ? {
		title: t("settings.personalization.localMemory.soul", { name: productName }),
		initialValue: soul.value,
		onSave: saveSoul
	} : editorTarget === "memory" ? {
		title: t("settings.personalization.localMemory.memory", { name: productName }),
		initialValue: memory.value,
		onSave: saveMemory
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "general-settings-panel__group local-memory-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "local-memory-list",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "local-memory-section__group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "local-memory-section__group-label",
						children: t("settings.personalization.localMemory.groupIdentity")
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "local-memory-identity-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocalMemoryIdentityRow, {
							title: t("settings.personalization.localMemory.userCallName", { name: productName }),
							value: userCallName.value,
							exists: userCallName.exists,
							malformed: userCallName.malformed,
							loading,
							editing: inlineKey === "user",
							draft: inlineKey === "user" ? draft : void 0,
							saving: savingInline,
							onDraftChange: setDraft,
							onEditStart: () => startInline("user", userCallName.value),
							onEditSave: saveInline,
							onEditCancel: cancelInline
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocalMemoryIdentityRow, {
							title: t("settings.personalization.localMemory.aiName", { name: productName }),
							value: aiName.value,
							exists: aiName.exists,
							malformed: aiName.malformed,
							loading,
							editing: inlineKey === "identity",
							draft: inlineKey === "identity" ? draft : void 0,
							saving: savingInline,
							onDraftChange: setDraft,
							onEditStart: () => startInline("identity", aiName.value),
							onEditSave: saveInline,
							onEditCancel: cancelInline
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocalMemoryLongSection, {
					title: t("settings.personalization.localMemory.soul", { name: productName }),
					value: toPlainPreview(soul.value),
					exists: soul.exists,
					malformed: soul.malformed,
					loading,
					onOpenEditor: () => setEditorTarget("soul")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocalMemoryLongSection, {
					title: t("settings.personalization.localMemory.memory", { name: productName }),
					value: toPlainPreview(memory.value),
					exists: memory.exists,
					malformed: memory.malformed,
					loading,
					editable: Boolean(adapter.updateMemoryBody),
					onOpenEditor: () => setEditorTarget("memory")
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocalMemoryEditModal, {
		open: editorTarget !== null,
		title: editorConfig?.title ?? "",
		initialValue: editorConfig?.initialValue ?? "",
		onClose: () => setEditorTarget(null),
		onSave: async (value) => {
			const ok = await editorConfig?.onSave(value) ?? false;
			if (ok) setEditorTarget(null);
			return ok;
		}
	})] });
}
var import_react$1, import_jsx_runtime$1, EMPTY_FIELD;
var init_LocalMemorySection = __esmMin((() => {
	init_local_memory$1();
	init_src$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_use_assistant_display();
	init_useI18n();
	init_LocalMemoryCard();
	init_LocalMemoryEditModal();
	init_to_preview();
	import_jsx_runtime$1 = require_jsx_runtime();
	EMPTY_FIELD = {
		value: "",
		exists: false
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/local-memory/index.ts
var init_local_memory = __esmMin((() => {
	init_LocalMemoryCard();
	init_LocalMemoryEditModal();
	init_LocalMemorySection();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/personalization-save-error.ts
/**
* 把个性化设置写盘失败转成 toast 文案。
* 只展示 i18n 原因，原始系统错误（含本地路径）留在 console.error 里排查。
*/
function formatPersonalizationSaveError(error, t) {
	const reason = resolvePersonalizationSaveErrorReason(error, t);
	if (!reason) return t("settings.personalization.saveError");
	return t("settings.personalization.saveErrorWithReason", { reason });
}
function resolvePersonalizationSaveErrorReason(error, t) {
	const raw = extractErrorMessage(error, "").trim();
	if (!raw) return "";
	if (/not supported/i.test(raw)) return t("settings.personalization.saveErrorReason.unsupported");
	if (/\bENOSPC\b/i.test(raw) || /no space left/i.test(raw)) return t("settings.personalization.saveErrorReason.diskFull");
	if (/\bEROFS\b/i.test(raw) || /read-only file system/i.test(raw)) return t("settings.personalization.saveErrorReason.readOnly");
	if (/\bEACCES\b|\bEPERM\b/i.test(raw) || /permission denied/i.test(raw)) return t("settings.personalization.saveErrorReason.permission");
	if (/\bENOENT\b/i.test(raw) || /no such file or directory/i.test(raw)) return t("settings.personalization.saveErrorReason.pathMissing");
	if (/\bENOTDIR\b/i.test(raw) || /not a directory/i.test(raw)) return t("settings.personalization.saveErrorReason.pathInvalid");
	if (/\bEISDIR\b/i.test(raw) || /illegal operation on a directory/i.test(raw)) return t("settings.personalization.saveErrorReason.pathIsDir");
	return t("settings.personalization.saveErrorReason.unknown");
}
var init_personalization_save_error = __esmMin((() => {
	init_errors();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/PersonalizationPanel.tsx
function PersonalizationPanel() {
	const t = useTranslation();
	const adapter = useAdapter();
	const { account } = useAccountService();
	const { name: productName = "WorkBuddy" } = useAssistantDisplay(adapter);
	const [toneStyle, setToneStyle] = (0, import_react.useState)("");
	const [customPrompt, setCustomPrompt] = (0, import_react.useState)("");
	const [loadingTipsEnabled, setLoadingTipsEnabled] = (0, import_react.useState)(() => isLoadingTipsEnabled(account));
	const [showFileChanges, setShowFileChanges] = (0, import_react.useState)(() => isShowFileChangesEnabled(account));
	const initialRef = (0, import_react.useRef)({
		toneStyle: "",
		customPrompt: ""
	});
	(0, import_react.useEffect)(() => {
		if (adapter?.getPersonalization) adapter.getPersonalization().then((data) => {
			if (data) {
				const style = data.toneStyle || "";
				const prompt = data.customPrompt || "";
				setToneStyle(style);
				setCustomPrompt(prompt);
				initialRef.current = {
					toneStyle: style,
					customPrompt: prompt
				};
			}
		});
	}, [adapter]);
	const accountUid = account?.uid?.trim() ?? "";
	const isEnterpriseAccount = isEnterpriseLoadingTipsAccount(account);
	const canToggleLoadingTips = Boolean(accountUid) && !isEnterpriseAccount;
	(0, import_react.useEffect)(() => {
		setLoadingTipsEnabled(isLoadingTipsEnabled(account));
	}, [account]);
	(0, import_react.useEffect)(() => {
		setShowFileChanges(isShowFileChangesEnabled(account));
	}, [account]);
	(0, import_react.useEffect)(() => {
		if (!accountUid) return;
		const offLoadingTips = loadingTipsDismissedPreference.subscribe((dismissed) => {
			setLoadingTipsEnabled(!dismissed && !isEnterpriseAccount);
		});
		const offFileChanges = showFileChangesPreference.subscribe(setShowFileChanges);
		return () => {
			offLoadingTips();
			offFileChanges();
		};
	}, [accountUid, isEnterpriseAccount]);
	const handleLoadingTipsToggle = (0, import_react.useCallback)((checked) => {
		if (!canToggleLoadingTips) return;
		setLoadingTipsEnabled(checked);
		if (!saveLoadingTipsEnabled(account, checked)) {
			setLoadingTipsEnabled(isLoadingTipsEnabled(account));
			toast.error(t("settings.personalization.loadingTipsSaveError"));
		}
	}, [
		account,
		canToggleLoadingTips,
		t
	]);
	const handleLoadingTipsSwitchChange = (0, import_react.useCallback)((event) => {
		handleLoadingTipsToggle(event.currentTarget.checked);
	}, [handleLoadingTipsToggle]);
	const handleShowFileChangesToggle = (0, import_react.useCallback)((checked) => {
		setShowFileChanges(checked);
		if (!saveShowFileChangesEnabled(account, checked)) {
			setShowFileChanges(isShowFileChangesEnabled(account));
			toast.error(t("settings.personalization.saveError"));
		}
	}, [account, t]);
	const handleShowFileChangesSwitchChange = (0, import_react.useCallback)((event) => {
		handleShowFileChangesToggle(event.currentTarget.checked);
	}, [handleShowFileChangesToggle]);
	const handleCustomPromptChange = (0, import_react.useCallback)((e) => {
		const value = e.target.value;
		if (value.length > MAX_CUSTOM_PROMPT_LENGTH) return;
		setCustomPrompt(value);
	}, []);
	const savePersonalizationValues = (0, import_react.useCallback)((nextToneStyle, nextCustomPrompt) => {
		if (!adapter?.savePersonalization) {
			toast.error(formatPersonalizationSaveError(/* @__PURE__ */ new Error("Personalization settings are not supported"), t));
			return;
		}
		if (nextToneStyle === initialRef.current.toneStyle && nextCustomPrompt === initialRef.current.customPrompt) return;
		adapter.savePersonalization({
			toneStyle: nextToneStyle,
			customPrompt: nextCustomPrompt
		}).then(() => {
			initialRef.current = {
				toneStyle: nextToneStyle,
				customPrompt: nextCustomPrompt
			};
			toast.success(t("settings.personalization.saved"));
		}).catch((error) => {
			console.error("[PersonalizationPanel] Failed to save:", error);
			toast.error(formatPersonalizationSaveError(error, t));
		});
	}, [adapter, t]);
	const handleCustomPromptBlur = (0, import_react.useCallback)(() => {
		savePersonalizationValues(toneStyle, customPrompt);
	}, [
		savePersonalizationValues,
		toneStyle,
		customPrompt
	]);
	const handleStyleSelect = (0, import_react.useCallback)((key) => {
		setToneStyle(key);
		savePersonalizationValues(key, customPrompt);
	}, [savePersonalizationValues, customPrompt]);
	const charCount = customPrompt.length;
	const charClass = charCount > MAX_CUSTOM_PROMPT_LENGTH ? "personalization-panel__char-count--over" : charCount > 1200 ? "personalization-panel__char-count--warn" : "";
	const toneSelectOptions = TONE_STYLE_OPTIONS.map((option) => ({
		value: option.key,
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "personalization-panel__option-text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "personalization-panel__option-name",
				children: t(option.labelKey)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "personalization-panel__option-hint",
				children: t(option.hintKey)
			})]
		})
	}));
	const toneDropdown = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "personalization-panel__dropdown",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			className: "personalization-panel__tone-trigger",
			popoverClassName: "personalization-panel__tone-popover",
			placement: "bottom-end",
			value: toneStyle,
			options: toneSelectOptions,
			onChange: (value) => handleStyleSelect(value)
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "general-settings-panel personalization-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "general-settings-panel__group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "general-settings-panel__group-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							plain: true,
							title: t("settings.personalization.toneStyle"),
							description: t("settings.personalization.toneStyleDesc", { name: productName }),
							action: toneDropdown
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							plain: true,
							title: t("settings.personalization.loadingTips"),
							description: t("settings.personalization.loadingTipsDesc", { name: productName }),
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "general-settings-panel__switch-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: isEnterpriseAccount ? t("settings.personalization.loadingTipsEnterpriseDesc") : void 0,
									placement: "bottom",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "general-settings-panel__switch-tooltip-trigger",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: loadingTipsEnabled,
											disabled: !canToggleLoadingTips,
											onChange: handleLoadingTipsSwitchChange,
											size: "large"
										})
									})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							plain: true,
							title: t("settings.personalization.fileChanges"),
							description: t("settings.personalization.fileChangesDesc"),
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "general-settings-panel__switch-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: showFileChanges,
									onChange: handleShowFileChangesSwitchChange,
									size: "large"
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "general-settings-panel__group personalization-panel__instruction",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "personalization-panel__instruction-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "personalization-panel__setting-name",
						children: t("settings.personalization.customPrompt")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "personalization-panel__setting-desc",
						children: t("settings.personalization.customPromptDesc", { name: productName })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "personalization-panel__textarea-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "personalization-panel__textarea",
						value: customPrompt,
						onChange: handleCustomPromptChange,
						onBlur: handleCustomPromptBlur,
						placeholder: t("settings.personalization.customPromptPlaceholder"),
						maxLength: MAX_CUSTOM_PROMPT_LENGTH
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `personalization-panel__char-count ${charClass}`,
						children: [
							charCount,
							" / ",
							MAX_CUSTOM_PROMPT_LENGTH
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalMemorySection, {})
		]
	});
}
var import_react, import_jsx_runtime, TONE_STYLE_OPTIONS, MAX_CUSTOM_PROMPT_LENGTH;
//#endregion
__esmMin((() => {
	init_PersonalizationPanel$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_auth_context();
	init_useI18n();
	init_use_assistant_display$1();
	init_loading_tips_preference();
	init_file_changes_preference();
	init_local_memory();
	init_personalization_save_error();
	init_setting_section();
	import_jsx_runtime = require_jsx_runtime();
	TONE_STYLE_OPTIONS = [
		{
			key: "",
			labelKey: "settings.personalization.style.default",
			hintKey: "settings.personalization.style.defaultHint"
		},
		{
			key: "professional",
			labelKey: "settings.personalization.style.professional",
			hintKey: "settings.personalization.style.professionalHint"
		},
		{
			key: "friendly",
			labelKey: "settings.personalization.style.friendly",
			hintKey: "settings.personalization.style.friendlyHint"
		},
		{
			key: "straightforward",
			labelKey: "settings.personalization.style.straightforward",
			hintKey: "settings.personalization.style.straightforwardHint"
		},
		{
			key: "creative",
			labelKey: "settings.personalization.style.creative",
			hintKey: "settings.personalization.style.creativeHint"
		},
		{
			key: "efficient",
			labelKey: "settings.personalization.style.efficient",
			hintKey: "settings.personalization.style.efficientHint"
		},
		{
			key: "sarcastic",
			labelKey: "settings.personalization.style.sarcastic",
			hintKey: "settings.personalization.style.sarcasticHint"
		},
		{
			key: "socratic",
			labelKey: "settings.personalization.style.socratic",
			hintKey: "settings.personalization.style.socraticHint"
		}
	];
	MAX_CUSTOM_PROMPT_LENGTH = 1500;
}))();
export { PersonalizationPanel };
