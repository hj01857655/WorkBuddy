import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, EW as AddToChatIcon, G as useCurrentAccount, O1 as useTranslation, Ok as useAccountScopedWebviewPartition, P5 as Segmented, SQ as init_use_is_enterprise_admin, T1 as init_clipboard, UR as useTencentDocsFacade, V3 as useAdapter, VR as init_services, YW as init_ui_icons, aU as reportAttachTDocChooser, b as SearchField, c as tencentDocsStore, dW as useOneidAppStatus, gQ as init_use_vpc_connector_policy, h as isFileViewModelCheckable, iU as init_telemetry, l as useTencentDocsStore, m as init_constants, m5 as init_src, s as init_store, uW as init_use_oneid_app_status, v as ListType, vQ as usePrivateHostedDeployment, w1 as copyToClipboard, wQ as useIsEnterpriseEdition, x as init_types } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Bu as SearchX, Ei as toast, Ev as require_react, Kh as require_react_dom, Ru as Search, Tv as require_jsx_runtime, U as Checkbox, Yl as init_lucide_react, eu as X, ja as MentionSkeleton, t as init_src$1, uf as Ellipsis } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_network_error_state, t as NetworkErrorState } from "./network-error-state-DrLREio3.js";
import { a as VirtualList, d as AuthGuide, f as init_auth_guide, i as useFileList, l as EmptyState, m as syncTencentDocsThemeCookie, n as useTdocCheckAuthGate, o as init_file_list, p as init_tencent_docs_theme_cookie, r as init_use_file_list, t as init_use_tdoc_check_auth_gate, u as init_empty_state } from "./use-tdoc-check-auth-gate-CPJZSL92.js";
import { a as init_utils, f as init_file_type_icon, n as formatTime, u as FileTypeIcon } from "./utils-C65Aew35.js";
import { a as init_tdoc_columns, c as ActionPopover, i as init_folder_breadcrumb, n as useFileSearch, o as useTDocColumns, p as SelectionBar, r as FolderBreadcrumb, s as init_action_popover, t as init_use_file_search, u as init_shared } from "./use-file-search-BckALiMI.js";
import { X as init_document_upload_task_store, Y as documentUploadStore, c as createSaasImportTask, d as nextBatchId, et as useDocumentUploadStore, s as cancelTask, u as init_document_upload_runner } from "./document-upload-runner-Df4UE8mW.js";
import { n as init_oneid_activation_guide, t as OneidActivationGuide } from "./oneid-activation-guide-DuXXdo_H.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-bar/search-bar.less
var init_search_bar$2 = __esmMin((() => {})), import_jsx_runtime$5, ClearIcon;
var init_clear_icon = __esmMin((() => {
	require_react();
	import_jsx_runtime$5 = require_jsx_runtime();
	ClearIcon = ({ size = 14, className }) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M8.00064 1.3335C4.31875 1.3335 1.33398 4.31827 1.33398 8.00017C1.33398 11.682 4.31874 14.6668 8.00064 14.6668C11.6826 14.6668 14.6673 11.682 14.6673 8.00017C14.6673 4.31827 11.6826 1.3335 8.00064 1.3335ZM5.40769 9.65035L4.93629 10.1217L5.8791 11.0645L6.3505 10.5931L8.00065 8.94301L9.65033 10.5927L10.1218 11.0641L11.0646 10.1213L10.5932 9.6499L8.94346 8.00021L10.5932 6.35052L11.0646 5.87911L10.1218 4.9363L9.65033 5.40771L8.00065 7.0574L6.3505 5.40725L5.8791 4.93585L4.93629 5.87866L5.40769 6.35006L7.05784 8.00021L5.40769 9.65035Z",
			fill: "currentColor"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-bar/search-bar.tsx
var import_react$6, import_jsx_runtime$4, SearchBar;
var init_search_bar$1 = __esmMin((() => {
	init_search_bar$2();
	init_lucide_react();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_clear_icon();
	import_jsx_runtime$4 = require_jsx_runtime();
	SearchBar = ({ onSearch, placeholder }) => {
		const t = useTranslation();
		const [value, setValue] = (0, import_react$6.useState)("");
		const [focused, setFocused] = (0, import_react$6.useState)(false);
		const [submitted, setSubmitted] = (0, import_react$6.useState)(false);
		const submit = (0, import_react$6.useCallback)(() => {
			const trimmed = value.trim();
			if (!trimmed) return;
			onSearch(trimmed);
			setSubmitted(true);
		}, [value, onSearch]);
		const handleKeyDown = (0, import_react$6.useCallback)((e) => {
			if (e.key === "Enter") submit();
		}, [submit]);
		const handleChange = (0, import_react$6.useCallback)((e) => {
			setValue(e.target.value);
			setSubmitted(false);
		}, []);
		const handleClear = (0, import_react$6.useCallback)(() => {
			setValue("");
			setSubmitted(false);
		}, []);
		const handleFocus = (0, import_react$6.useCallback)(() => setFocused(true), []);
		const handleBlur = (0, import_react$6.useCallback)(() => setFocused(false), []);
		const showTip = focused && value.trim().length > 0 && !submitted;
		const iconLabel = t("knowledgeBase.search.iconButtonLabel");
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "tencent-docs-search-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
					type: "button",
					className: "tencent-docs-search-bar__icon-btn",
					onClick: submit,
					onMouseDown: (e) => e.preventDefault(),
					disabled: !value.trim(),
					"aria-label": iconLabel,
					title: iconLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Search, {
						size: 16,
						strokeWidth: 1.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("input", {
					className: "tencent-docs-search-bar__input",
					type: "text",
					value,
					onChange: handleChange,
					onKeyDown: handleKeyDown,
					onFocus: handleFocus,
					onBlur: handleBlur,
					placeholder: placeholder ?? t("knowledgeBase.search.placeholder")
				}),
				value && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
					className: "tencent-docs-search-bar__clear",
					onClick: handleClear,
					onMouseDown: (e) => e.preventDefault(),
					type: "button",
					"aria-label": t("common.clear"),
					title: t("common.clear"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ClearIcon, { size: 14 })
				}),
				showTip && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "tencent-docs-search-bar__tip",
					role: "tooltip",
					children: t("knowledgeBase.search.triggerTip")
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-bar/index.ts
var init_search_bar = __esmMin((() => {
	init_search_bar$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-result-modal/search-result-modal.less
var init_search_result_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-result-modal/search-result-modal.tsx
var import_react$5, import_react_dom$2, import_jsx_runtime$3, SEARCH_TABS, highlightKeyword, ItemMoreButton, SearchResultModal;
var init_search_result_modal$1 = __esmMin((() => {
	init_search_result_modal$2();
	init_src$1();
	init_src();
	init_lucide_react();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_clipboard();
	init_ui_icons();
	init_constants();
	init_shared();
	init_types();
	init_utils();
	init_action_popover();
	init_file_type_icon();
	import_jsx_runtime$3 = require_jsx_runtime();
	SEARCH_TABS = [{
		key: SearchField.FILE_NAME,
		labelKey: "knowledgeBase.search.tabFileName"
	}, {
		key: SearchField.OWNER_NAME,
		labelKey: "knowledgeBase.search.tabOwnerName"
	}];
	highlightKeyword = (text, keyword) => {
		if (!keyword) return text;
		const lowerText = text.toLowerCase();
		const lowerKeyword = keyword.toLowerCase();
		const index = lowerText.indexOf(lowerKeyword);
		if (index === -1) return text;
		const before = text.slice(0, index);
		const match = text.slice(index, index + keyword.length);
		const after = text.slice(index + keyword.length);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
			before,
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "search-result-modal__highlight",
				children: match
			}),
			after
		] });
	};
	ItemMoreButton = ({ file, items, onAction }) => {
		const [open, setOpen] = (0, import_react$5.useState)(false);
		const [menuPos, setMenuPos] = (0, import_react$5.useState)({
			top: 0,
			bottom: 0,
			left: 0
		});
		const btnRef = (0, import_react$5.useRef)(null);
		const handleToggle = (0, import_react$5.useCallback)((e) => {
			e.stopPropagation();
			setOpen((prev) => {
				if (!prev && btnRef.current) {
					const rect = btnRef.current.getBoundingClientRect();
					setMenuPos({
						top: rect.top,
						bottom: rect.bottom,
						left: rect.left + rect.width / 2
					});
				}
				return !prev;
			});
		}, []);
		const handleItemClick = (0, import_react$5.useCallback)((key) => {
			setOpen(false);
			onAction(key, file);
		}, [file, onAction]);
		const handleClose = (0, import_react$5.useCallback)(() => {
			setOpen(false);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
			ref: btnRef,
			className: "search-result-modal__item-more",
			type: "button",
			onClick: handleToggle,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Ellipsis, { size: 16 })
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ActionPopover, {
			open,
			anchorPos: menuPos,
			items,
			onItemClick: handleItemClick,
			onClose: handleClose,
			triggerRef: btnRef
		})] });
	};
	SearchResultModal = ({ fileSearch, onClose, hideRowActions = false, onAddToTask, onItemClick, onOpenFile }) => {
		const t = useTranslation();
		const [inputValue, setInputValue] = (0, import_react$5.useState)(fileSearch.keyword);
		const [checkedKeys, setCheckedKeys] = (0, import_react$5.useState)(/* @__PURE__ */ new Set());
		const segmentedOptions = (0, import_react$5.useMemo)(() => SEARCH_TABS.map((tab) => ({
			value: tab.key,
			label: t(tab.labelKey)
		})), [t]);
		const actionItems = (0, import_react$5.useMemo)(() => [{
			key: "open",
			label: t("tdoc.action.open")
		}, {
			key: "copyLink",
			label: t("tdoc.action.copyLink")
		}], [t]);
		const handleAction = (0, import_react$5.useCallback)((key, file) => {
			if (key === "open") onOpenFile?.(file);
			else if (key === "copyLink" && file.url) copyToClipboard(file.url).then((ok) => {
				if (ok) toast.success(t("tdoc.action.linkCopied"));
			});
		}, [t, onOpenFile]);
		(0, import_react$5.useEffect)(() => {
			const handleKeyDown = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [onClose]);
		const handleTabChange = (0, import_react$5.useCallback)((field) => {
			fileSearch.setField(field);
			setCheckedKeys(/* @__PURE__ */ new Set());
		}, [fileSearch]);
		const handleKeyDown = (0, import_react$5.useCallback)((e) => {
			if (e.key === "Enter") {
				const trimmed = inputValue.trim();
				if (trimmed) {
					fileSearch.search(trimmed);
					setCheckedKeys(/* @__PURE__ */ new Set());
				}
			}
		}, [inputValue, fileSearch]);
		const handleClearInput = (0, import_react$5.useCallback)(() => {
			setInputValue("");
		}, []);
		const handleOverlayClick = (0, import_react$5.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		const handleScroll = (0, import_react$5.useCallback)((e) => {
			const target = e.currentTarget;
			if (target.scrollHeight - target.scrollTop - target.clientHeight < 100) fileSearch.loadMore();
		}, [fileSearch]);
		return (0, import_react_dom$2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "search-result-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "search-result-modal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "search-result-modal__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "search-result-modal__search-input",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Search, {
								className: "search-result-modal__search-icon",
								size: 16
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("input", {
								type: "text",
								value: inputValue,
								onChange: (e) => setInputValue(e.target.value),
								onKeyDown: handleKeyDown,
								placeholder: t("knowledgeBase.search.placeholder"),
								autoFocus: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "search-result-modal__header-actions",
							children: [inputValue && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
								className: "search-result-modal__input-clear",
								onClick: handleClearInput,
								type: "button",
								"aria-label": t("common.clear"),
								title: t("common.clear"),
								children: t("common.clear")
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
								className: "search-result-modal__header-divider",
								"aria-hidden": "true"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
								className: "search-result-modal__close",
								onClick: onClose,
								type: "button",
								"aria-label": t("common.close"),
								title: t("common.close"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(X, { size: 16 })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "search-result-modal__tabs",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Segmented, {
							options: segmentedOptions,
							value: fileSearch.field,
							onChange: handleTabChange,
							"aria-label": t("knowledgeBase.search.placeholder")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "search-result-modal__body",
						onScroll: handleScroll,
						children: [
							fileSearch.loading && fileSearch.results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "search-result-modal__status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "search-result-modal__loading-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: t("common.loading") })]
							}),
							fileSearch.isTimeout && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "search-result-modal__status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
									className: "search-result-modal__status-text",
									children: t("knowledgeBase.search.timeout")
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
									className: "search-result-modal__retry-btn",
									onClick: () => fileSearch.search(fileSearch.keyword),
									type: "button",
									children: t("common.retry")
								})]
							}),
							fileSearch.error && !fileSearch.isTimeout && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "search-result-modal__status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
									className: "search-result-modal__status-text",
									children: fileSearch.error
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
									className: "search-result-modal__retry-btn",
									onClick: () => fileSearch.search(fileSearch.keyword),
									type: "button",
									children: t("common.retry")
								})]
							}),
							!fileSearch.loading && !fileSearch.isTimeout && !fileSearch.error && fileSearch.results.length === 0 && fileSearch.keyword && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "search-result-modal__status",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "search-result-modal__empty-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SearchX, {
											size: 48,
											strokeWidth: 1,
											opacity: .3
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
										className: "search-result-modal__empty-title",
										children: t("knowledgeBase.search.emptyTitle")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
										className: "search-result-modal__empty-desc",
										children: t("knowledgeBase.search.emptyDescription")
									})
								]
							}),
							fileSearch.results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "search-result-modal__list",
								children: [
									fileSearch.results.map((file) => {
										const checkable = isFileViewModelCheckable(file);
										const checked = checkedKeys.has(file.id);
										const handleRowClick = () => {
											if (onItemClick) onItemClick(file);
											else if (onAddToTask && checkable) setCheckedKeys((prev) => {
												const next = new Set(prev);
												if (next.has(file.id)) next.delete(file.id);
												else next.add(file.id);
												return next;
											});
										};
										const itemClassName = [
											"search-result-modal__item",
											checked ? "search-result-modal__item--checked" : "",
											onItemClick ? "search-result-modal__item--clickable" : ""
										].filter(Boolean).join(" ");
										return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
											className: itemClassName,
											onClick: handleRowClick,
											children: [
												onAddToTask && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
													className: "search-result-modal__item-checkbox",
													onClick: (e) => e.stopPropagation(),
													children: !checkable ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
														content: t("tdoc.selection.unsupportedType"),
														placement: "bottom",
														children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
															className: "search-result-modal__checkbox-wrapper",
															children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Checkbox, {
																size: "small",
																checked,
																disabled: !checkable,
																onChange: (val) => {
																	setCheckedKeys((prev) => {
																		const next = new Set(prev);
																		if (val) next.add(file.id);
																		else next.delete(file.id);
																		return next;
																	});
																}
															})
														})
													}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Checkbox, {
														size: "small",
														checked,
														disabled: !checkable,
														onChange: (val) => {
															setCheckedKeys((prev) => {
																const next = new Set(prev);
																if (val) next.add(file.id);
																else next.delete(file.id);
																return next;
															});
														}
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FileTypeIcon, {
													type: file.type,
													ext: file.ext,
													isFolder: file.isFolder,
													size: 24
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
													className: "search-result-modal__item-content",
													children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
														className: "search-result-modal__item-name-row",
														children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
															className: "search-result-modal__item-name",
															children: highlightKeyword(file.name, fileSearch.keyword)
														}), onAddToTask && checkable && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
															content: t("tdoc.selection.addToTask"),
															placement: "bottom",
															children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
																className: "search-result-modal__add-task-btn",
																onClick: (e) => {
																	e.stopPropagation();
																	onAddToTask([file]);
																},
																children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AddToChatIcon, { size: 14 })
															})
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
														className: "search-result-modal__item-meta",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: fileSearch.field === SearchField.OWNER_NAME ? highlightKeyword(file.ownerName, fileSearch.keyword) : file.ownerName }),
															/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
																className: "search-result-modal__item-meta-sep",
																children: "|"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: formatTime(file.modifiedTimeRaw) })
														]
													})]
												}),
												!hideRowActions && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ItemMoreButton, {
													file,
													items: actionItems,
													onAction: handleAction
												})
											]
										}, file.id);
									}),
									fileSearch.loading && fileSearch.results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "search-result-modal__load-more",
										children: t("common.loadingMore")
									}),
									!fileSearch.hasMore && fileSearch.results.length > 0 && !fileSearch.loading && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "search-result-modal__load-more",
										children: t("knowledgeBase.search.loadedAll")
									})
								]
							})
						]
					}),
					onAddToTask && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SelectionBar, {
						count: checkedKeys.size,
						onAddToTask: () => {
							onAddToTask(fileSearch.results.filter((f) => checkedKeys.has(f.id)));
						}
					})
				]
			})
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-result-modal/index.ts
var init_search_result_modal = __esmMin((() => {
	init_search_result_modal$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/tdoc-import-iframe-modal.tsx
/**
* 从 preload 转发过来的腾讯文档 message 中提取 action 字段。
*
* 腾讯文档真正抛出的消息结构通常形如 `{ action: 1, ...payload }`，
* 但也存在外面套一层 `{ data: {...} }` 的可能（不同版本 / 不同子页面），
* 这里做鲁棒解析：自身有 number 类型 action 直接用，否则尝试常见包装层。
*/
function extractAction(raw) {
	const tryRead = (obj) => {
		if (obj && typeof obj === "object") {
			const a = obj.action;
			if (typeof a === "number") return a;
			if (typeof a === "string" && /^\d+$/.test(a)) return Number(a);
		}
		return null;
	};
	const candidates = [raw];
	if (raw && typeof raw === "object") {
		const obj = raw;
		candidates.push(obj.data, obj.payload, obj.detail);
	}
	for (const c of candidates) {
		const n = tryRead(c);
		if (n !== null && n >= 1 && n <= 6) return n;
	}
	return null;
}
var import_react$3, import_react_dom$1, import_jsx_runtime$2, import_react$4, SELECTOR_URL, TdocImportIframeModal;
var init_tdoc_import_iframe_modal = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_tencent_docs_theme_cookie();
	import_jsx_runtime$2 = require_jsx_runtime();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	SELECTOR_URL = "https://docs.qq.com/desktop?type=selector&maxNumber=20&showMoreActions=1";
	TdocImportIframeModal = ({ visible, onClose, onPicked }) => {
		const [preloadUrl, setPreloadUrl] = (0, import_react$3.useState)(void 0);
		const [authMode, setAuthMode] = (0, import_react$3.useState)(false);
		const [webviewReady, setWebviewReady] = (0, import_react$3.useState)(false);
		const webviewRef = (0, import_react$3.useRef)(null);
		const adapter = useAdapter();
		const tdocImportPartition = useAccountScopedWebviewPartition("tdoc-import");
		const openDevToolsRef = (0, import_react$3.useRef)(null);
		const isDevEnv = false;
		(0, import_react$3.useEffect)(() => {
			if (!visible) {
				setPreloadUrl(void 0);
				setAuthMode(false);
				setWebviewReady(false);
				return;
			}
			if (!tdocImportPartition) {
				setPreloadUrl(void 0);
				return;
			}
			let cancelled = false;
			const resolver = window.__getTdocImportPreloadUrl;
			if (typeof resolver !== "function") {
				setPreloadUrl(null);
				return;
			}
			Promise.resolve().then(() => syncTencentDocsThemeCookie(SELECTOR_URL, tdocImportPartition, "TdocImport")).then(() => resolver(tdocImportPartition)).then((url) => {
				if (cancelled) return;
				setPreloadUrl(typeof url === "string" && url.length > 0 ? url : null);
			}).catch(() => {
				if (cancelled) return;
				setPreloadUrl(null);
			});
			return () => {
				cancelled = true;
			};
		}, [visible, tdocImportPartition]);
		(0, import_react$3.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [visible, onClose]);
		(0, import_react$3.useEffect)(() => {
			if (!visible || preloadUrl === void 0) return;
			const webview = webviewRef.current;
			if (!webview) return;
			const handleIpcMessage = (event) => {
				const evt = event;
				if (evt?.channel === "tdoc-import:open-external") {
					const linkPayload = evt.args?.[0];
					const url = linkPayload?.url;
					if (typeof url !== "string" || url.length === 0) return;
					console.info("[TdocImport] preload captured external link → browser", {
						url,
						reason: linkPayload?.reason,
						frame: linkPayload?.frame
					});
					if (adapter && typeof adapter.openExternal === "function") adapter.openExternal(url).catch((err) => {
						console.warn("[TdocImport] openExternal failed", err);
						window.open(url, "_blank", "noopener,noreferrer");
					});
					else window.open(url, "_blank", "noopener,noreferrer");
					return;
				}
				if (evt?.channel !== "tdoc-import:picked") return;
				const payload = evt.args?.[0];
				const raw = payload?.data;
				const action = extractAction(raw);
				console.info("[TdocImport] ipc-message", "action=", action, "origin=", payload?.origin, "frame=", payload?.frame, "data=", raw);
				if (action === null) return;
				switch (action) {
					case 1:
						setAuthMode(false);
						onPicked({
							action,
							raw
						});
						break;
					case 2:
						onClose();
						break;
					case 5:
						setAuthMode(false);
						break;
					case 3:
					case 4:
						setAuthMode(true);
						break;
					case 6:
						setAuthMode(false);
						break;
					default: ((_) => void 0)(action);
				}
			};
			const handleConsoleMessage = (event) => {
				const evt = event;
				const msg = evt?.message ?? "";
				if (msg.includes("[tdoc-import-preload]") || (evt?.level ?? 0) >= 2) console.info("[TdocImport][webview]", `lvl=${evt?.level}`, msg, evt?.sourceId ? `(${evt.sourceId}:${evt.line})` : "");
			};
			const handleDidFailLoad = (event) => {
				const evt = event;
				if (evt?.errorCode === -3) return;
				console.warn("[TdocImport] webview did-fail-load", evt);
			};
			const openGuestDevTools = () => {
				const wv = webviewRef.current;
				try {
					if (wv?.isDevToolsOpened?.()) return;
					wv?.openDevTools?.();
					console.info("[TdocImport] guest webview devtools opened");
				} catch (err) {
					console.warn("[TdocImport] openDevTools failed", err);
				}
			};
			openDevToolsRef.current = openGuestDevTools;
			const handleDomReady = () => {
				setWebviewReady(true);
				console.info("[TdocImport] webview dom-ready, preload =", preloadUrl, "| 点击右上角 DevTools 按钮 / Cmd+Ctrl+Shift+D 打开 guest DevTools");
			};
			const handleBeforeInput = (event) => {
				const evt = event;
				if (evt?.type !== "keyDown") return;
				if (!evt.shift) return;
				if (!(evt.control || evt.meta)) return;
				if (evt.key !== "D" && evt.key !== "d") return;
				openGuestDevTools();
			};
			const handleHostKeyDown = (e) => {
				if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "d" || e.key === "D")) {
					e.preventDefault();
					openGuestDevTools();
				}
			};
			webview.addEventListener("ipc-message", handleIpcMessage);
			webview.addEventListener("console-message", handleConsoleMessage);
			webview.addEventListener("did-fail-load", handleDidFailLoad);
			webview.addEventListener("dom-ready", handleDomReady);
			webview.addEventListener("before-input-event", handleBeforeInput);
			document.addEventListener("keydown", handleHostKeyDown);
			return () => {
				webview.removeEventListener("ipc-message", handleIpcMessage);
				webview.removeEventListener("console-message", handleConsoleMessage);
				webview.removeEventListener("did-fail-load", handleDidFailLoad);
				webview.removeEventListener("dom-ready", handleDomReady);
				webview.removeEventListener("before-input-event", handleBeforeInput);
				document.removeEventListener("keydown", handleHostKeyDown);
				openDevToolsRef.current = null;
			};
		}, [
			visible,
			preloadUrl,
			onPicked,
			onClose,
			adapter,
			tdocImportPartition
		]);
		(0, import_react$3.useEffect)(() => () => {
			const webview = webviewRef.current;
			try {
				webview?.stop?.();
				if (webview) webview.src = "about:blank";
			} catch {}
		}, []);
		const handleOverlayClick = (0, import_react$3.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		if (!visible) return null;
		return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "tdoc-import-iframe-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "tdoc-import-iframe-modal" + (authMode ? " tdoc-import-iframe-modal--auth" : ""),
				children: [isDevEnv, preloadUrl !== void 0 && Boolean(tdocImportPartition) && /* @__PURE__ */ (0, import_react$4.createElement)("webview", {
					ref: webviewRef,
					className: "tdoc-import-iframe-modal__webview" + (webviewReady ? " tdoc-import-iframe-modal__webview--ready" : ""),
					src: SELECTOR_URL,
					...typeof preloadUrl === "string" ? { preload: preloadUrl } : {},
					partition: tdocImportPartition,
					key: tdocImportPartition,
					webpreferences: "contextIsolation=yes,nodeIntegrationInSubFrames=yes",
					nodeintegration: false
				})]
			})
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-personal-tdoc-import.ts
function findListInObject(obj) {
	for (const k of KNOWN_LIST_KEYS) {
		const v = obj[k];
		if (Array.isArray(v) && v.length > 0) return v;
	}
	return null;
}
function extractDocList(raw) {
	if (Array.isArray(raw)) return raw;
	if (!raw || typeof raw !== "object") return null;
	const obj = raw;
	const payload = obj.payload;
	if (payload && typeof payload === "object" && !Array.isArray(payload)) {
		const files = payload.files;
		if (Array.isArray(files) && files.length > 0) return files;
	}
	const top = findListInObject(obj);
	if (top) return top;
	for (const v of Object.values(obj)) if (v && typeof v === "object" && !Array.isArray(v)) {
		const inner = findListInObject(v);
		if (inner) return inner;
	}
	return null;
}
function extractTitle(item) {
	if (typeof item === "string") return item;
	if (item && typeof item === "object") {
		const obj = item;
		for (const k of TITLE_KEYS) {
			const v = obj[k];
			if (typeof v === "string" && v.length > 0) return v;
		}
		for (const k of URL_KEYS) {
			const v = obj[k];
			if (typeof v === "string" && v.length > 0) {
				const tail = v.split("?")[0].split("/").filter(Boolean).pop();
				if (tail) return tail;
			}
		}
	}
	return null;
}
function usePersonalTdocImport(options = {}) {
	const t = useTranslation();
	const tencentDocs = useTencentDocsFacade();
	const currentAccount = useCurrentAccount();
	const [showImport, setShowImport] = (0, import_react$2.useState)(false);
	return {
		showImport,
		openImport: (0, import_react$2.useCallback)(() => setShowImport(true), []),
		closeImport: (0, import_react$2.useCallback)(() => setShowImport(false), []),
		handlePicked: (0, import_react$2.useCallback)((event) => {
			const data = event.raw;
			const list = extractDocList(data);
			if (!list || list.length === 0) {
				toast(t("tdoc.import.personalTdoc.pickedPrefix"));
				setShowImport(false);
				return;
			}
			if (list.map(extractTitle).filter((s) => !!s).length === 0) {
				toast(`${t("tdoc.import.personalTdoc.pickedPrefix")}${list.length}`);
				setShowImport(false);
				return;
			}
			const importItems = [];
			for (const item of list) {
				if (!item || typeof item !== "object") continue;
				const obj = item;
				const docIdRaw = obj.docId;
				const docId = typeof docIdRaw === "string" ? docIdRaw.trim() : "";
				if (!docId) continue;
				const titleRaw = extractTitle(item);
				const fileName = titleRaw && titleRaw.length > 0 ? titleRaw : docId;
				const mimeTypeRaw = obj.mimeType;
				const mimeType = typeof mimeTypeRaw === "string" && mimeTypeRaw.length > 0 ? mimeTypeRaw : void 0;
				importItems.push({
					docId,
					fileName,
					mimeType
				});
			}
			if (importItems.length === 0) {
				toast(`${t("tdoc.import.personalTdoc.pickedPrefix")}${list.length}`);
				setShowImport(false);
				return;
			}
			const enterpriseId = currentAccount?.enterpriseId?.trim() ?? "";
			if (!enterpriseId) {
				toast.error(t("tdoc.import.personalTdoc.pickedPrefix"));
				setShowImport(false);
				return;
			}
			const enqueueImports = async () => {
				let cookie = "";
				let hostUnavailable = false;
				try {
					if (tencentDocs?.getPersonalTdocCookie) cookie = await tencentDocs.getPersonalTdocCookie();
					else {
						hostUnavailable = true;
						console.warn("[TdocImport] tencentDocs.getPersonalTdocCookie not available");
					}
				} catch (err) {
					hostUnavailable = true;
					console.warn("[TdocImport] getPersonalTdocCookie failed:", err);
				}
				cookie = (cookie ?? "").trim();
				if (hostUnavailable) {
					toast.error(t("tdoc.import.personalTdoc.hostUnavailable"));
					return;
				}
				if (!cookie) {
					toast.error(t("tdoc.import.personalTdoc.noLogin"));
					return;
				}
				const targetFolderId = options.getTargetFolderId?.() ?? null;
				const batchId = nextBatchId();
				const tasks = importItems.map((it) => createSaasImportTask({
					personalDocId: it.docId,
					fileName: it.fileName,
					mimeType: it.mimeType,
					enterpriseId,
					tdocCookie: cookie,
					targetFolderId,
					batchId
				}));
				documentUploadStore.getState().enqueue(tasks);
				options.onEnqueued?.(tasks.map((task) => task.id));
				const preview = importItems.slice(0, 3).map((i) => i.fileName).join("、");
				const suffix = importItems.length > 3 ? `… (${importItems.length})` : "";
				toast(`${t("tdoc.import.personalTdoc.pickedPrefix")}${preview}${suffix}`);
			};
			enqueueImports().catch((err) => {
				console.warn("[TencentDocs] enqueueImports failed:", err);
			});
			setShowImport(false);
		}, [
			t,
			currentAccount,
			tencentDocs,
			options
		])
	};
}
var import_react$2, KNOWN_LIST_KEYS, TITLE_KEYS, URL_KEYS;
var init_use_personal_tdoc_import = __esmMin((() => {
	init_src$1();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_services();
	init_document_upload_runner();
	init_document_upload_task_store();
	KNOWN_LIST_KEYS = [
		"files",
		"fileList",
		"fileInfoList",
		"docList",
		"docs",
		"list",
		"data",
		"items",
		"selectedFiles",
		"result"
	];
	TITLE_KEYS = [
		"fileName",
		"title",
		"name",
		"docName",
		"file_name",
		"docTitle",
		"displayName",
		"display_name",
		"fileTitle"
	];
	URL_KEYS = [
		"url",
		"fileUrl",
		"docUrl",
		"link"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/doc-selector-modal.less
var init_doc_selector_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/doc-selector-content.tsx
/** 判断文件是否可被勾选（文件夹不可勾选，不支持的文件类型置灰） */
function isFileCheckable(file) {
	return isFileViewModelCheckable({
		type: file.type,
		isFolder: file.is_folder,
		ext: file.ext
	});
}
var import_react$1, import_jsx_runtime$1, DocSelectorContent;
var init_doc_selector_content = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_constants();
	init_use_file_list();
	init_use_file_search();
	init_types();
	init_document_upload_task_store();
	init_empty_state();
	init_file_list();
	init_tdoc_columns();
	init_folder_breadcrumb();
	init_search_bar();
	init_search_result_modal();
	import_jsx_runtime$1 = require_jsx_runtime();
	DocSelectorContent = ({ onSelect, onClose, pendingImportTaskIds, onImportTasksSettled }) => {
		const t = useTranslation();
		const [showSearchModal, setShowSearchModal] = (0, import_react$1.useState)(false);
		const [checkedKeys, setCheckedKeys] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
		const fileList = useFileList({ listType: ListType.RECENT });
		const fileSearch = useFileSearch();
		const importTaskStateKey = useDocumentUploadStore((s) => {
			if (pendingImportTaskIds.length === 0) return "";
			const idSet = new Set(pendingImportTaskIds);
			const parts = [];
			for (const task of s.tasks) if (idSet.has(task.id)) parts.push(`${task.id}|${task.status}`);
			return parts.join(",");
		});
		const loadFilesRef = (0, import_react$1.useRef)(fileList.loadFiles);
		loadFilesRef.current = fileList.loadFiles;
		const onSettledRef = (0, import_react$1.useRef)(onImportTasksSettled);
		onSettledRef.current = onImportTasksSettled;
		(0, import_react$1.useEffect)(() => {
			if (!importTaskStateKey) return;
			const settled = [];
			let anySuccess = false;
			for (const part of importTaskStateKey.split(",")) {
				const [id, status] = part.split("|");
				if (!id || !status) continue;
				if (status === "success") {
					settled.push(id);
					anySuccess = true;
				} else if (status === "failed" || status === "cancelled") settled.push(id);
			}
			if (settled.length === 0) return;
			if (anySuccess) loadFilesRef.current().catch(() => void 0);
			onSettledRef.current(settled);
		}, [importTaskStateKey]);
		const columns = useTDocColumns({ hideRowActions: true });
		const checkableFiles = (0, import_react$1.useMemo)(() => fileList.files.filter(isFileCheckable), [fileList.files]);
		const handleRowClick = (0, import_react$1.useCallback)((file) => {
			if (file.is_folder) {
				fileList.enterFolder(file.file_id, file.title);
				return;
			}
			if (isFileCheckable(file)) setCheckedKeys((prev) => {
				const next = new Set(prev);
				if (next.has(file.file_id)) next.delete(file.file_id);
				else next.add(file.file_id);
				return next;
			});
		}, [fileList]);
		const handleSortChange = (0, import_react$1.useCallback)((sortKey, desc) => {
			fileList.setOrderBy(sortKey);
			fileList.setDesc(desc);
		}, [fileList]);
		const handleSearch = (0, import_react$1.useCallback)((keyword) => {
			fileSearch.search(keyword);
			setShowSearchModal(true);
		}, [fileSearch]);
		const handleCloseSearch = (0, import_react$1.useCallback)(() => {
			setShowSearchModal(false);
			fileSearch.reset();
		}, [fileSearch]);
		const handleCheckChange = (0, import_react$1.useCallback)((key, checked) => {
			setCheckedKeys((prev) => {
				const next = new Set(prev);
				if (checked) next.add(key);
				else next.delete(key);
				return next;
			});
		}, []);
		const handleCheckAll = (0, import_react$1.useCallback)((checked) => {
			if (checked) setCheckedKeys(new Set(checkableFiles.map((f) => f.file_id)));
			else setCheckedKeys(/* @__PURE__ */ new Set());
		}, [checkableFiles]);
		const allChecked = checkableFiles.length > 0 && checkedKeys.size === checkableFiles.length;
		const indeterminate = checkedKeys.size > 0 && checkedKeys.size < checkableFiles.length;
		const handleConfirm = (0, import_react$1.useCallback)(() => {
			onSelect(fileList.files.filter((f) => checkedKeys.has(f.file_id)));
			onClose();
		}, [
			fileList.files,
			checkedKeys,
			onSelect,
			onClose
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "doc-selector-modal__search",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SearchBar, { onSearch: handleSearch })
			}),
			fileList.folderPath.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FolderBreadcrumb, {
				path: fileList.folderPath,
				onNavigate: fileList.navigateToFolder
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "doc-selector-modal__body",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VirtualList, {
					data: fileList.files,
					columns,
					rowKey: (file) => file.file_id,
					loading: fileList.loading,
					loadingMore: fileList.loadingMore,
					hasMore: fileList.hasMore,
					error: fileList.error,
					sortKey: fileList.orderBy,
					sortDesc: fileList.desc,
					checkedKeys,
					isCheckable: isFileCheckable,
					showDisabledCheckbox: true,
					checkboxDisabledTooltip: t("tdoc.selection.unsupportedType"),
					onCheckChange: handleCheckChange,
					onCheckAll: handleCheckAll,
					allChecked,
					indeterminate,
					onRowClick: handleRowClick,
					onSortChange: handleSortChange,
					onLoadMore: fileList.loadMore,
					onRetry: fileList.loadFiles,
					loadingMoreText: t("common.loadingMore"),
					rowClassName: (file) => file.is_folder ? "tdoc-file-list-item--folder" : "",
					renderEmpty: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EmptyState, { type: "no-files" }),
					renderError: (err, retry) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "tdoc-file-list__error",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tdoc-file-list__error-icon",
								children: "⚠️"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tdoc-file-list__error-message",
								children: err
							}),
							retry && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								className: "tdoc-file-list__error-retry",
								onClick: retry,
								children: t("tdoc.error.retry")
							})
						]
					})
				})
			}),
			checkedKeys.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "doc-selector-modal__footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "doc-selector-modal__footer-count",
					children: t("tdoc.selection.count", { count: checkedKeys.size })
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
					type: "button",
					className: "doc-selector-modal__footer-btn",
					onClick: handleConfirm,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 16 16",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M8.005 13.3201C7.01 13.322 6.029 13.0986 5.133 12.6667L2 13.3334L2.867 10.7334C1.317 8.4421 1.916 5.4854 4.267 3.8174C6.617 2.1501 9.993 2.2867 12.163 4.1374C13.491 5.2707 14.117 6.8307 13.995 8.3641",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M10.667 12.6667H14.667",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M12.667 10.6667V14.6667",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						]
					}), t("tdoc.selection.addToTask")]
				})]
			}),
			showSearchModal && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SearchResultModal, {
				fileSearch,
				onClose: handleCloseSearch,
				hideRowActions: true,
				onAddToTask: (files) => {
					const mapped = files.map((f) => ({
						file_id: f.id,
						parent_id: f.parentId,
						title: f.name,
						url: f.url,
						type: f.type,
						ext: f.ext,
						create_time: 0,
						create_name: "",
						last_modify_time: 0,
						last_modify_name: "",
						access_time: 0,
						owner_name: f.ownerName,
						is_folder: f.isFolder,
						is_link: f.isLink,
						size: f.sizeRaw,
						is_top: f.isTop,
						is_star: f.isStar
					}));
					handleCloseSearch();
					onSelect(mapped);
					onClose();
				}
			})
		] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/doc-selector-modal.tsx
var import_react, import_react_dom, import_jsx_runtime, DocSelectorModal;
var init_doc_selector_modal$1 = __esmMin((() => {
	init_doc_selector_modal$2();
	init_src$1();
	init_lucide_react();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_use_vpc_connector_policy();
	init_useI18n();
	init_services();
	init_network_error_state();
	init_use_personal_tdoc_import();
	init_use_tdoc_check_auth_gate();
	init_store();
	init_telemetry();
	init_document_upload_runner();
	init_document_upload_task_store();
	init_auth_guide();
	init_oneid_activation_guide();
	init_tdoc_import_iframe_modal();
	init_doc_selector_content();
	import_jsx_runtime = require_jsx_runtime();
	DocSelectorModal = ({ visible, onClose, onSelect }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const tencentDocs = useTencentDocsFacade();
		const currentAccount = useCurrentAccount();
		const authStatus = useTencentDocsStore((state) => state.authStatus);
		const authError = useTencentDocsStore((state) => state.authError);
		const authorizeUrl = useTencentDocsStore((state) => state.authorizeUrl);
		const isAuthorized = authStatus === "connected";
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const oneidStatus = useOneidAppStatus("doc");
		const triggerCheckAuth = useTdocCheckAuthGate();
		const [pendingImportTaskIds, setPendingImportTaskIds] = (0, import_react.useState)([]);
		/**
		* 累积集合：本弹窗本次打开期间发起的「全部」个人版导入 task id。
		*
		* 与 `pendingImportTaskIds` 的区别——后者会在每条 task settle（success /
		* failed / cancelled）时被 `onImportTasksSettled` 移除，目的是避免
		* `DocSelectorContent` 反复触发 `loadFiles` 刷新。
		*
		* 但 `handleClose` 关闭弹窗时需要清掉「整批」由本弹窗发起的任务（包括
		* 已经 success 的），否则用户在文件列表里勾选刚导入完成的文档 + 点「添加
		* 到任务」走 onClose 时，已 success 的任务已经被从 `pendingImportTaskIds`
		* 移出去了，handleClose 里 `if (pendingImportTaskIds.length > 0)` 不命中，
		* 全局上传浮窗（DocumentUploadDock）会残留这批已完成的任务记录与浮窗本身。
		*
		* 所以这里再维护一个不会被 settle 摘除的累积 ref，专供关闭时收尾使用。
		*/
		const enqueuedImportTaskIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
		const personalTdocImport = usePersonalTdocImport({
			getTargetFolderId: () => null,
			onEnqueued: (ids) => {
				for (const id of ids) enqueuedImportTaskIdsRef.current.add(id);
				setPendingImportTaskIds((prev) => [...prev, ...ids]);
			}
		});
		const isPrivateHostedDeployment = usePrivateHostedDeployment();
		const hasEnterprise = !!currentAccount?.enterpriseId?.trim();
		const isDesktopHost = typeof window !== "undefined" && typeof window.__getTdocImportPreloadUrl === "function";
		const showImportPersonalBtn = isAuthorized && !isPrivateHostedDeployment && hasEnterprise && isDesktopHost;
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			tencentDocsStore.getState().setAdapter(adapter);
			tencentDocsStore.getState().setFacade(tencentDocs);
			triggerCheckAuth();
			return () => {
				tencentDocsStore.getState().stopPolling();
			};
		}, [
			visible,
			adapter,
			tencentDocs,
			triggerCheckAuth
		]);
		(0, import_react.useEffect)(() => {
			if (visible && isAuthorized) reportAttachTDocChooser(adapter);
		}, [
			visible,
			isAuthorized,
			adapter
		]);
		const { closeImport: closePersonalImport } = personalTdocImport;
		(0, import_react.useEffect)(() => {
			if (!visible) {
				closePersonalImport();
				setPendingImportTaskIds((prev) => prev.length === 0 ? prev : []);
				if (enqueuedImportTaskIdsRef.current.size > 0) enqueuedImportTaskIdsRef.current = /* @__PURE__ */ new Set();
			}
		}, [visible, closePersonalImport]);
		/**
		* 关闭弹框统一入口：除了调用外层 onClose，还要把"由本弹窗发起的个人版导入
		* 任务"从全局上传浮窗（DocumentUploadDock）里收掉。
		*
		* 之前的实现是 cancelAllUnfinished() + clearAll()，但 DocumentUploadDock
		* 是 Root 级常驻组件，store 里可能同时承载来自 TencentDocsPanel 等其它
		* 入口的并发上传任务；在本弹窗关闭时一刀切会误取消那些任务。
		*
		* 现按 `enqueuedImportTaskIdsRef`（usePersonalTdocImport.onEnqueued 透出的
		* 「本弹窗发起的全部 task id」，已 settle 的也保留在内）收窄清理范围：
		*   1) 命中 id 且仍在 queued / uploading / retrying 状态 → cancelTask 打断
		*      adapter cancelToken / saas 轮询 / fakeProgress；
		*   2) 命中 id 一律 removeTask 从 store 中摘掉，避免残留导致 dock 继续显示；
		*   3) 不动其它入口的任务；
		*   4) 若清理完 store 已无任何任务，顺手把 dock ui.visible 置 false——这是
		*      为了修复以下场景的残留 dock：用户先导入个人版文档（dock 弹出），上传
		*      成功后在文件列表里勾选导入完成的文档 + 点「添加到任务」关闭弹窗，
		*      之前的实现里这批已 success 的任务已经从 `pendingImportTaskIds` 里
		*      被 `onImportTasksSettled` 移除，handleClose 早期 if 不命中，dock 残留。
		*      现在用 enqueuedImportTaskIdsRef 累积所有 id，确保整批清理。
		*
		* 触发路径覆盖：右上角 X / 遮罩点击 / Esc / 「添加到任务」均走 handleClose
		*（DocSelectorContent 的 onClose prop 直接绑到本函数）。
		*/
		const handleClose = (0, import_react.useCallback)(() => {
			const trackedSet = enqueuedImportTaskIdsRef.current;
			if (trackedSet.size > 0) {
				const tasks = documentUploadStore.getState().tasks;
				for (const task of tasks) {
					if (!trackedSet.has(task.id)) continue;
					if (task.status === "queued" || task.status === "uploading" || task.status === "retrying") cancelTask(task.id);
					documentUploadStore.getState().removeTask(task.id);
				}
				if (documentUploadStore.getState().tasks.length === 0) documentUploadStore.getState().setVisible(false);
				trackedSet.clear();
			}
			onClose();
		}, [onClose]);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape") handleClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [visible, handleClose]);
		const handleOverlayClick = (0, import_react.useCallback)((e) => {
			if (e.target === e.currentTarget) handleClose();
		}, [handleClose]);
		if (!visible) return null;
		const renderBody = () => {
			if (isEnterpriseEdition) {
				if (oneidStatus.status === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "doc-selector-modal__auth-loading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentionSkeleton, {})
				});
				if (oneidStatus.status === "offline") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "doc-selector-modal__auth",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkErrorState, { onRetry: () => {
						oneidStatus.refresh();
					} })
				});
				if (oneidStatus.status !== "enabled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "doc-selector-modal__auth",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneidActivationGuide, {
						appType: "doc",
						activationCode: oneidStatus.activationCode,
						appName: oneidStatus.appName,
						onActivated: () => {
							oneidStatus.refresh().catch(() => void 0);
						}
					})
				});
			}
			if (authStatus === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "doc-selector-modal__auth-loading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentionSkeleton, {})
			});
			if (!isAuthorized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "doc-selector-modal__auth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuide, {
					authStatus,
					error: authError,
					authorizeUrl,
					onAuthorize: () => tencentDocsStore.getState().startAuthorization(),
					onRetry: triggerCheckAuth,
					authSource: "file_picker"
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocSelectorContent, {
				onSelect,
				onClose: handleClose,
				pendingImportTaskIds,
				onImportTasksSettled: (ids) => {
					setPendingImportTaskIds((prev) => prev.filter((id) => !ids.includes(id)));
				}
			});
		};
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "doc-selector-modal-overlay",
			onClick: handleOverlayClick,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "doc-selector-modal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "doc-selector-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "doc-selector-modal__title",
						children: t("tdoc.selector.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "doc-selector-modal__header-actions",
						children: [showImportPersonalBtn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "doc-selector-modal__import-personal",
							onClick: personalTdocImport.openImport,
							type: "button",
							children: t("tdoc.import.personalTdoc")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "doc-selector-modal__close",
							onClick: handleClose,
							type: "button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})]
					})]
				}), renderBody()]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TdocImportIframeModal, {
				visible: personalTdocImport.showImport,
				onClose: personalTdocImport.closeImport,
				onPicked: personalTdocImport.handlePicked
			})]
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/index.ts
var doc_selector_modal_exports = /* @__PURE__ */ __exportAll({ DocSelectorModal: () => DocSelectorModal });
var init_doc_selector_modal = __esmMin((() => {
	init_doc_selector_modal$1();
}));
//#endregion
export { init_use_personal_tdoc_import as a, init_tdoc_import_iframe_modal as c, init_search_result_modal$1 as d, init_search_bar as f, init_doc_selector_modal$1 as i, init_search_result_modal as l, init_search_bar$1 as m, init_doc_selector_modal as n, usePersonalTdocImport as o, SearchBar as p, DocSelectorModal as r, TdocImportIframeModal as s, doc_selector_modal_exports as t, SearchResultModal as u };
