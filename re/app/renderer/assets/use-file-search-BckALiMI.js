import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, EW as AddToChatIcon, IU as MoreIcon, LU as init_MoreIcon, O1 as useTranslation, SQ as init_use_is_enterprise_admin, UR as useTencentDocsFacade, VR as init_services, YW as init_ui_icons, b as SearchField, c as tencentDocsStore, h as isFileViewModelCheckable, i7 as Tooltip, m as init_constants, m5 as init_src, s as init_store, wQ as useIsEnterpriseEdition, x as init_types, y as OrderBy } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip$1, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, hn as Dropdown, s as Breadcrumb, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { C as searchFiles, b as init_file_service } from "./use-tdoc-check-auth-gate-CPJZSL92.js";
import { a as init_utils, f as init_file_type_icon, i as getTdocOwnershipTag, l as shouldShowTdocOwnershipTag, n as formatTime, s as isUnauthorizedError, t as formatFileSize, u as FileTypeIcon } from "./utils-C65Aew35.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/shared/selection-bar.less
var init_selection_bar$1 = __esmMin((() => {})), import_jsx_runtime$4, SelectionBar;
var init_selection_bar = __esmMin((() => {
	init_selection_bar$1();
	require_react();
	init_useI18n();
	init_ui_icons();
	import_jsx_runtime$4 = require_jsx_runtime();
	SelectionBar = ({ count, onAddToTask, addToTaskLabel, renderCount, className }) => {
		const t = useTranslation();
		if (count <= 0) return null;
		const rootClassName = className ? `tdoc-selection-bar ${className}` : "tdoc-selection-bar";
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: rootClassName,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "tdoc-selection-bar__count",
				children: renderCount ? renderCount(count) : t("tdoc.selection.count", { count })
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
				type: "button",
				className: "tdoc-selection-bar__btn",
				onClick: onAddToTask,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AddToChatIcon, { size: 14 }), addToTaskLabel ?? t("tdoc.selection.addToTask")]
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/shared/ownership-tag.less
var init_ownership_tag$1 = __esmMin((() => {})), import_jsx_runtime$3, TdocOwnershipTag;
var init_ownership_tag = __esmMin((() => {
	init_ownership_tag$1();
	init_src();
	require_react();
	init_use_is_enterprise_admin();
	init_useI18n();
	init_utils();
	import_jsx_runtime$3 = require_jsx_runtime();
	TdocOwnershipTag = ({ file, className }) => {
		const t = useTranslation();
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const tag = getTdocOwnershipTag(file);
		if (!shouldShowTdocOwnershipTag(tag, isEnterpriseEdition)) return null;
		const label = tag === "external" ? t("tdoc.ownership.external") : t("tdoc.ownership.personal");
		const tenantName = file.tenant_name?.trim();
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
			content: tenantName || void 0,
			placement: "bottom-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: `tdoc-ownership-tag tdoc-ownership-tag--${tag}${className ? ` ${className}` : ""}`,
				children: label
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/shared/index.ts
var init_shared = __esmMin((() => {
	init_selection_bar();
	init_ownership_tag();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/action-popover/action-popover.less
var init_action_popover$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/action-popover/action-popover.tsx
var import_react$3, import_react_dom, import_jsx_runtime$2, POPOVER_GAP, VIEWPORT_SAFE_MARGIN, ActionPopover;
var init_action_popover$1 = __esmMin((() => {
	init_action_popover$2();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	import_jsx_runtime$2 = require_jsx_runtime();
	POPOVER_GAP = 4;
	VIEWPORT_SAFE_MARGIN = 8;
	ActionPopover = ({ open, anchorPos, items, onItemClick, onClose, triggerRef }) => {
		const menuRef = (0, import_react$3.useRef)(null);
		const [position, setPosition] = (0, import_react$3.useState)(null);
		const handleItemClick = (0, import_react$3.useCallback)((e, key) => {
			e.stopPropagation();
			onItemClick(key);
		}, [onItemClick]);
		(0, import_react$3.useEffect)(() => {
			if (!open) setPosition(null);
		}, [open]);
		(0, import_react$3.useLayoutEffect)(() => {
			if (!open || !menuRef.current) return;
			const menuHeight = menuRef.current.offsetHeight;
			const spaceBelow = window.innerHeight - anchorPos.bottom - VIEWPORT_SAFE_MARGIN;
			const spaceAbove = anchorPos.top - VIEWPORT_SAFE_MARGIN;
			const top = menuHeight > spaceBelow && spaceAbove > spaceBelow ? anchorPos.top - POPOVER_GAP - menuHeight : anchorPos.bottom + POPOVER_GAP;
			setPosition({
				top,
				left: anchorPos.left
			});
		}, [
			open,
			anchorPos.top,
			anchorPos.bottom,
			anchorPos.left
		]);
		(0, import_react$3.useEffect)(() => {
			if (!open) return;
			const handleClickOutside = (e) => {
				const target = e.target;
				if (menuRef.current && !menuRef.current.contains(target) && (!triggerRef?.current || !triggerRef.current.contains(target))) onClose();
			};
			const handleScroll = () => {
				onClose();
			};
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("scroll", handleScroll, true);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
				document.removeEventListener("scroll", handleScroll, true);
			};
		}, [
			open,
			onClose,
			triggerRef
		]);
		if (!open) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			ref: menuRef,
			className: "action-popover__menu",
			style: {
				position: "fixed",
				top: position?.top ?? -9999,
				left: position?.left ?? anchorPos.left,
				transform: "translateX(-50%)",
				visibility: position ? "visible" : "hidden"
			},
			children: items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_react$3.Fragment, { children: [item.divider && idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "action-popover__divider" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
				className: `action-popover__item${item.danger ? " action-popover__item--danger" : ""}`,
				onClick: (e) => handleItemClick(e, item.key),
				children: [item.icon && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "action-popover__item-icon",
					children: item.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: item.label })]
			})] }, item.key))
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/action-popover/index.ts
var init_action_popover = __esmMin((() => {
	init_action_popover$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/tdoc-columns.tsx
/**
* 行级「添加到任务」按钮是否展示，与勾选/批量「添加到任务」的可选规则保持一致。
*
* 单一真源 = `isFileViewModelCheckable`（见 `../../constants.ts`）：
*  - 在线文档品类（DOC/SLIDE/SHEET/FORM/PDF/MIND/SMART_CANVAS/SMART_SHEET/FLOW_CHART/BOARD）
*  - 上传到云盘（type=DRIVE）的本地文件，按 ext 白名单：md/markdown/txt/png/jpg/jpeg
*
* 历史上这里维护过一份独立白名单，导致云盘 txt/md 类文件没有行级按钮，
* 与勾选栏「添加到任务」表现不一致——现在统一走真源避免再次漂移。
*/
function canAddRowToTask(file) {
	return isFileViewModelCheckable({
		type: file.type,
		isFolder: file.is_folder,
		ext: file.ext
	});
}
function stripKnownExtensionSuffix(name, extension) {
	const normalizedExtension = extension?.trim().replace(/^\.+/, "").toLowerCase();
	if (!normalizedExtension) return name;
	const suffix = `.${normalizedExtension}`;
	if (!name.toLowerCase().endsWith(suffix)) return name;
	return name.slice(0, -suffix.length) || name;
}
var import_react$2, import_jsx_runtime$1, MoreActionsButton, InlineRenameInput, useTDocColumns;
var init_tdoc_columns = __esmMin((() => {
	init_src$1();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_MoreIcon();
	init_ui_icons();
	init_constants();
	init_shared();
	init_types();
	init_utils();
	init_action_popover();
	init_file_type_icon();
	import_jsx_runtime$1 = require_jsx_runtime();
	MoreActionsButton = ({ file, items, onAction, tooltipText }) => {
		const [open, setOpen] = (0, import_react$2.useState)(false);
		const [menuPos, setMenuPos] = (0, import_react$2.useState)({
			top: 0,
			bottom: 0,
			left: 0
		});
		const btnRef = (0, import_react$2.useRef)(null);
		const handleToggle = (0, import_react$2.useCallback)((e) => {
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
		const handleItemClick = (0, import_react$2.useCallback)((actionKey) => {
			setOpen(false);
			onAction(actionKey, file);
		}, [file, onAction]);
		const handleClose = (0, import_react$2.useCallback)(() => {
			setOpen(false);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
			className: "tdoc-more-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip$1, {
				content: open ? void 0 : tooltipText,
				placement: "bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					ref: btnRef,
					className: "tdoc-file-list-item__action-btn",
					onClick: handleToggle,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MoreIcon, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ActionPopover, {
				open,
				anchorPos: menuPos,
				items,
				onItemClick: handleItemClick,
				onClose: handleClose,
				triggerRef: btnRef
			})]
		});
	};
	InlineRenameInput = ({ initialName, extension, onConfirm, onCancel }) => {
		const [value, setValue] = (0, import_react$2.useState)(initialName);
		const inputRef = (0, import_react$2.useRef)(null);
		(0, import_react$2.useEffect)(() => {
			const input = inputRef.current;
			if (input) {
				input.focus();
				input.setSelectionRange(0, stripKnownExtensionSuffix(initialName, extension).length);
			}
		}, [initialName, extension]);
		const handleConfirm = (0, import_react$2.useCallback)(() => {
			const newName = stripKnownExtensionSuffix(value.trim(), extension).trim();
			const oldName = stripKnownExtensionSuffix(initialName.trim(), extension).trim();
			if (newName && newName !== oldName) onConfirm(newName);
			else onCancel();
		}, [
			value,
			initialName,
			extension,
			onConfirm,
			onCancel
		]);
		const handleKeyDown = (0, import_react$2.useCallback)((e) => {
			e.stopPropagation();
			if (e.key === "Enter") handleConfirm();
			else if (e.key === "Escape") onCancel();
		}, [handleConfirm, onCancel]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
			ref: inputRef,
			className: "tdoc-rename-input",
			value,
			onChange: (e) => setValue(e.target.value),
			onBlur: handleConfirm,
			onKeyDown: handleKeyDown,
			onClick: (e) => e.stopPropagation()
		});
	};
	useTDocColumns = (options) => {
		const t = useTranslation();
		const defaultActionItems = [
			{
				key: "open",
				label: t("tdoc.action.open")
			},
			{
				key: "copyLink",
				label: t("tdoc.action.copyLink")
			},
			{
				key: "rename",
				label: t("tdoc.action.rename")
			},
			{
				key: "delete",
				label: t("tdoc.action.delete")
			}
		];
		const actionItems = options?.actionItems || defaultActionItems;
		const onAction = options?.onAction || (() => {});
		const renamingFileId = options?.renamingFileId ?? null;
		const onRenameConfirm = options?.onRenameConfirm;
		const onRenameCancel = options?.onRenameCancel;
		const currentOrderBy = options?.orderBy ?? OrderBy.ACCESS_TIME;
		const onOrderByChange = options?.onOrderByChange;
		const currentDesc = options?.desc ?? true;
		const onDescToggle = options?.onDescToggle;
		const hideRowActions = options?.hideRowActions ?? false;
		const onAddToTask = options?.onAddToTask;
		const timeSortLabel = currentOrderBy === OrderBy.MODIFY_TIME ? t("tdoc.modifiedTime") : t("tdoc.recentView");
		const checkIcon = import_react$2.createElement("svg", {
			width: 14,
			height: 14,
			viewBox: "0 0 14 14",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, import_react$2.createElement("path", {
			d: "M2.5 7L5.5 10L11.5 4",
			stroke: "#3370ff",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}));
		const emptyIcon = import_react$2.createElement("span", { style: {
			display: "inline-block",
			width: 14,
			height: 14
		} });
		const timeSortItems = [{
			label: t("tdoc.recentView.myAccessTime"),
			value: OrderBy.ACCESS_TIME,
			selected: currentOrderBy === OrderBy.ACCESS_TIME,
			leftIcon: currentOrderBy === OrderBy.ACCESS_TIME ? checkIcon : emptyIcon
		}, {
			label: t("tdoc.recentView.modifiedTime"),
			value: OrderBy.MODIFY_TIME,
			selected: currentOrderBy === OrderBy.MODIFY_TIME,
			leftIcon: currentOrderBy === OrderBy.MODIFY_TIME ? checkIcon : emptyIcon
		}];
		/**
		* 时间列头：时间字段下拉框 + 升/降序箭头。
		*
		* 「最近」与「我的文档」两个 tab 共用同一套排序控件，保证体验统一
		* （#52385：此前「最近」tab 只有下拉框、缺升降序箭头，与「我的文档」不一致）。
		* 仅默认时间字段不同（最近=ACCESS_TIME，我的文档=MODIFY_TIME），由调用方
		* 通过 orderBy 传入；列头形态与具体 tab 无关。
		*/
		const timeSortHeader = onOrderByChange ? import_react$2.createElement("span", { className: "tdoc-time-sort-header" }, import_react$2.createElement(Dropdown, {
			items: timeSortItems,
			placement: "bottom-start",
			width: "auto",
			minWidth: 160,
			className: "tdoc-time-sort-dropdown",
			onSelectionChange: (values) => {
				if (values[0]) onOrderByChange(values[0]);
			},
			selectedIcon: import_react$2.createElement("span"),
			children: import_react$2.createElement("span", { className: "tdoc-time-sort-dropdown__trigger" }, timeSortLabel, import_react$2.createElement("svg", {
				className: "tdoc-time-sort-dropdown__arrow",
				width: 8,
				height: 8,
				viewBox: "0 0 8 8",
				fill: "currentColor",
				xmlns: "http://www.w3.org/2000/svg"
			}, import_react$2.createElement("path", { d: "M1 2.5L4 6L7 2.5H1Z" })))
		}), import_react$2.createElement("span", {
			className: "tdoc-time-sort-header__arrow" + (currentDesc ? "" : " tdoc-time-sort-header__arrow--asc"),
			onClick: (e) => {
				e.stopPropagation();
				onDescToggle?.();
			}
		}, import_react$2.createElement("svg", {
			width: 10,
			height: 12,
			viewBox: "0 0 10 12",
			fill: "currentColor",
			xmlns: "http://www.w3.org/2000/svg"
		}, import_react$2.createElement("path", { d: "M4.25 0.75H5.75V7.25H8.5L5 11.25L1.5 7.25H4.25V0.75Z" })))) : t("tdoc.recentView");
		return [
			{
				key: "name",
				label: t("tdoc.name"),
				flex: "1 1 auto",
				sortable: false,
				sortKey: OrderBy.FILE_NAME,
				render: (file) => {
					const isRenaming = renamingFileId === file.file_id;
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "tdoc-file-list-item__name-cell",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FileTypeIcon, {
							type: file.type,
							ext: file.ext,
							isFolder: file.is_folder,
							size: 24
						}), isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InlineRenameInput, {
							initialName: file.title,
							extension: file.is_folder ? "" : file.ext,
							onConfirm: (newName) => onRenameConfirm?.(file.file_id, newName),
							onCancel: () => onRenameCancel?.()
						}, file.file_id) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "tdoc-file-list-item__name",
								title: file.title,
								children: file.title
							}),
							!file.is_folder && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TdocOwnershipTag, {
								file,
								className: "tdoc-file-list-item__ownership-tag"
							}),
							!file.is_folder && onAddToTask && canAddRowToTask(file) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip$1, {
								content: t("tdoc.selection.addToTask"),
								placement: "bottom",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									className: "tdoc-file-list-item__add-task-btn",
									onClick: (e) => {
										e.stopPropagation();
										onAddToTask(file);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddToChatIcon, { size: 14 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "tdoc-file-list-item__actions",
								children: !hideRowActions && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MoreActionsButton, {
									file,
									items: file.is_folder ? actionItems.filter((item) => item.key !== "copyLink") : actionItems,
									onAction,
									tooltipText: t("tdoc.action.more")
								})
							})
						] })]
					});
				}
			},
			{
				key: "owner",
				label: t("tdoc.owner"),
				flex: "0 0 140px",
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tdoc-file-list-item__text",
					title: file.owner_name,
					children: file.owner_name || "-"
				})
			},
			{
				key: "recentView",
				label: timeSortHeader,
				flex: "0 0 150px",
				sortable: false,
				sortKey: currentOrderBy,
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tdoc-file-list-item__text",
					children: currentOrderBy === OrderBy.MODIFY_TIME ? formatTime(file.last_modify_time) : formatTime(file.access_time || file.last_modify_time)
				})
			},
			{
				key: "size",
				label: t("tdoc.size"),
				flex: "0 0 120px",
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tdoc-file-list-item__text",
					children: file.is_folder ? "-" : formatFileSize(String(file.size))
				})
			}
		];
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-breadcrumb.tsx
var import_react$1, import_jsx_runtime, FolderBreadcrumb;
var init_folder_breadcrumb = __esmMin((() => {
	init_src$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	FolderBreadcrumb = ({ path, onNavigate }) => {
		const t = useTranslation();
		const items = (0, import_react$1.useMemo)(() => {
			return [{
				id: "__tdoc_root__",
				label: t("tdoc.breadcrumb.root"),
				onClick: path.length > 0 && onNavigate ? () => onNavigate("root") : void 0
			}, ...path.map((item, index) => ({
				id: item.id,
				label: item.name,
				onClick: index < path.length - 1 && onNavigate ? () => onNavigate(item.id) : void 0
			}))];
		}, [
			path,
			onNavigate,
			t
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, {
			className: "tdoc-folder-breadcrumb",
			items,
			ariaLabel: t("tdoc.breadcrumb.root"),
			size: "sm"
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-file-search.ts
var import_react, SEARCH_PAGE_SIZE, SEARCH_TIMEOUT_MS, SEARCH_DEBOUNCE_MS, useFileSearch;
var init_use_file_search = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_services();
	init_file_service();
	init_store();
	init_types();
	init_utils();
	SEARCH_PAGE_SIZE = 20;
	SEARCH_TIMEOUT_MS = 15e3;
	SEARCH_DEBOUNCE_MS = 300;
	useFileSearch = () => {
		const tencentDocs = useTencentDocsFacade();
		const [keyword, setKeyword] = (0, import_react.useState)("");
		const [field, setField] = (0, import_react.useState)(SearchField.FILE_NAME);
		const [results, setResults] = (0, import_react.useState)([]);
		const [total, setTotal] = (0, import_react.useState)(0);
		const [totalByField, setTotalByField] = (0, import_react.useState)({});
		const [loading, setLoading] = (0, import_react.useState)(false);
		const [error, setError] = (0, import_react.useState)(null);
		const [isTimeout, setIsTimeout] = (0, import_react.useState)(false);
		const [hasMore, setHasMore] = (0, import_react.useState)(false);
		const abortControllerRef = (0, import_react.useRef)(null);
		const debounceTimerRef = (0, import_react.useRef)(null);
		const offsetRef = (0, import_react.useRef)(0);
		const fieldRef = (0, import_react.useRef)(field);
		const keywordRef = (0, import_react.useRef)(keyword);
		(0, import_react.useEffect)(() => {
			fieldRef.current = field;
		}, [field]);
		(0, import_react.useEffect)(() => {
			keywordRef.current = keyword;
		}, [keyword]);
		const cancelPending = (0, import_react.useCallback)(() => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				abortControllerRef.current = null;
			}
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
				debounceTimerRef.current = null;
			}
		}, []);
		const buildRequest = (0, import_react.useCallback)((kw, searchField, offset) => {
			return {
				keyword: kw,
				field: searchField,
				offset,
				limit: SEARCH_PAGE_SIZE
			};
		}, []);
		const executeSearch = (0, import_react.useCallback)(async (kw, searchField, offset, append) => {
			cancelPending();
			const controller = new AbortController();
			abortControllerRef.current = controller;
			if (!append) {
				setResults([]);
				setTotal(0);
				setHasMore(false);
			}
			setLoading(true);
			setError(null);
			setIsTimeout(false);
			const timeoutId = setTimeout(() => {
				controller.abort();
				setIsTimeout(true);
				setLoading(false);
				setError(null);
			}, SEARCH_TIMEOUT_MS);
			try {
				const request = buildRequest(kw, searchField, offset);
				const response = await searchFiles(tencentDocs, request);
				clearTimeout(timeoutId);
				if (controller.signal.aborted) return;
				if (append) setResults((prev) => [...prev, ...response.files]);
				else setResults(response.files);
				setTotal(response.total);
				setTotalByField((prev) => ({
					...prev,
					[searchField]: response.total
				}));
				offsetRef.current = response.nextOffset;
				setHasMore(response.hasMore);
				setLoading(false);
			} catch (err) {
				clearTimeout(timeoutId);
				if (controller.signal.aborted) return;
				if (isUnauthorizedError(err)) {
					tencentDocsStore.getState().markExpired();
					setLoading(false);
					return;
				}
				setError(err instanceof Error ? err.message : String(err));
				setLoading(false);
			}
		}, [
			cancelPending,
			buildRequest,
			tencentDocs
		]);
		const search = (0, import_react.useCallback)((kw, searchField) => {
			const trimmed = kw.trim();
			if (!trimmed) return;
			setKeyword(trimmed);
			if (searchField !== void 0) setField(searchField);
			const actualField = searchField ?? fieldRef.current;
			setTotalByField({});
			cancelPending();
			offsetRef.current = 0;
			debounceTimerRef.current = setTimeout(() => {
				executeSearch(trimmed, actualField, 0, false);
			}, SEARCH_DEBOUNCE_MS);
		}, [cancelPending, executeSearch]);
		const loadMore = (0, import_react.useCallback)(() => {
			if (loading || !hasMore) return;
			executeSearch(keywordRef.current, fieldRef.current, offsetRef.current, true);
		}, [
			loading,
			hasMore,
			executeSearch
		]);
		const reset = (0, import_react.useCallback)(() => {
			cancelPending();
			setKeyword("");
			setField(SearchField.FILE_NAME);
			setResults([]);
			setTotal(0);
			setTotalByField({});
			setLoading(false);
			setError(null);
			setIsTimeout(false);
			setHasMore(false);
			offsetRef.current = 0;
		}, [cancelPending]);
		(0, import_react.useEffect)(() => {
			if (keywordRef.current.trim()) {
				cancelPending();
				offsetRef.current = 0;
				executeSearch(keywordRef.current, field, 0, false);
			}
		}, [field]);
		(0, import_react.useEffect)(() => () => cancelPending(), [cancelPending]);
		return {
			keyword,
			setKeyword,
			field,
			setField,
			results,
			total,
			totalByField,
			loading,
			error,
			isTimeout,
			hasMore,
			search,
			loadMore,
			reset
		};
	};
}));
//#endregion
export { init_tdoc_columns as a, ActionPopover as c, TdocOwnershipTag as d, init_ownership_tag as f, init_folder_breadcrumb as i, init_action_popover$1 as l, init_selection_bar as m, useFileSearch as n, useTDocColumns as o, SelectionBar as p, FolderBreadcrumb as r, init_action_popover as s, init_use_file_search as t, init_shared as u };
