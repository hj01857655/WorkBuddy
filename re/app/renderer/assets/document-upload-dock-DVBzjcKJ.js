import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, O1 as useTranslation, U as useAccountService, _ as FileType, x as init_types } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, ji as ConfirmDialog, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { Mt as createStore, Nt as init_vanilla, Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
import { a as init_utils, c as resolveTdocFileTypeFromMime, f as init_file_type_icon, u as FileTypeIcon } from "./utils-C65Aew35.js";
import { $ as selectSummary, A as SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL, C as NO_SUPPORT_IMPORT_ERROR_SENTINEL, D as SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT_ERROR_SENTINEL, E as SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT_ERROR_SENTINEL, F as init_tdoc_import_error_codes, M as TOO_MANY_CELLS_ERROR_SENTINEL, N as VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL, O as SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT_ERROR_SENTINEL, P as ZIP_FILE_CONTENT_NOT_SUPPORT_ERROR_SENTINEL, Q as selectFolderView, R as init_pick_files_and_folders, S as NO_PERMISSION_ERROR_SENTINEL, T as OVER_SYSTEM_LIMIT_ERROR_SENTINEL, X as init_document_upload_task_store, Y as documentUploadStore, Z as parseFolderPath, a as cancelAllUnfinished, b as LICENSE_EXPIRED_ERROR_SENTINEL, et as useDocumentUploadStore, f as retryAllFailed, i as PASSWORD_WRONG_ERROR_SENTINEL, j as SIZE_LIMIT_OWNER_ERROR_SENTINEL, k as SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID_ERROR_SENTINEL, m as retryTask, o as cancelFolder, p as retryFolder, s as cancelTask, u as init_document_upload_runner, v as FILE_BREAK_ERROR_SENTINEL, w as OLD_VERSION_DOC_ERROR_SENTINEL, x as NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL, y as IMPORT_FAILED_ERROR_SENTINEL, z as isMindmapLikeFile } from "./document-upload-runner-Df4UE8mW.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/stores/tdoc-preview-request-store.ts
var import_zustand, tdocPreviewRequestStore, useTdocPreviewRequestStore;
var init_tdoc_preview_request_store = __esmMin((() => {
	import_zustand = require_zustand();
	init_vanilla();
	tdocPreviewRequestStore = createStore((set) => ({
		pending: null,
		requestPreview: (file) => {
			set({ pending: file });
		},
		consumePreviewRequest: () => {
			set({ pending: null });
		}
	}));
	useTdocPreviewRequestStore = (selector) => (0, import_zustand.useStore)(tdocPreviewRequestStore, selector);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/document-upload-dock.less
var init_document_upload_dock$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/document-upload-dock.tsx
var document_upload_dock_exports = /* @__PURE__ */ __exportAll({ DocumentUploadDock: () => DocumentUploadDock });
function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1073741824) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
function formatSpeed(bytesPerSec) {
	if (!bytesPerSec) return "0 KB/s";
	if (bytesPerSec < 1048576) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
	return `${(bytesPerSec / 1024 / 1024).toFixed(1)} MB/s`;
}
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
/**
* 从文件名提取小写扩展名（不含点）。
* - 'report.docx' → 'docx'
* - 'archive.tar.gz' → 'gz'
* - 'README' / '.env' → ''
*
* 用于把任务 fileName 传给 FileTypeIcon 的 ext prop，从而命中
* DRIVE_EXT_ICON_MAP 里的彩色品牌图标（doc/xlsx/pdf 等）。
*/
function getFileExt(fileName) {
	if (!fileName) return "";
	const dot = fileName.lastIndexOf(".");
	if (dot <= 0 || dot === fileName.length - 1) return "";
	return fileName.slice(dot + 1).toLowerCase();
}
/**
* 把内部 currentFolderPath（形如 `${batchId}\u0001a/b/c`）拆成面包屑段。
*
* batchId 仅作为浮窗 UI 的批次隔离 key，不展示给用户；面包屑里看到的仍是
* 原始的目录名（'a' / 'b' / 'c'），但每一段的 path 字段需要带回 batchId
* 才能在点击后正确切回 selectFolderView 的过滤集合。
*/
function breakdownBreadcrumb(path) {
	const { batchId, realPath } = parseFolderPath(path);
	const segs = realPath.split("/").filter(Boolean);
	const out = [];
	let acc = "";
	for (const seg of segs) {
		acc = acc ? `${acc}/${seg}` : seg;
		out.push({
			name: seg,
			path: `${batchId}\u0001${acc}`
		});
	}
	return out;
}
var import_react, import_react_dom, import_jsx_runtime, TDOC_IMPORT_SENTINEL_TO_I18N_KEY, MIN_DOCK_WIDTH, MIN_DOCK_HEIGHT, COLLAPSED_HEIGHT, DEFAULT_RIGHT_MARGIN, DEFAULT_BOTTOM_MARGIN, DocumentUploadDock, DocumentUploadDockBody, PasswordPromptDialog, FolderRow, FileRow, CloseIcon, CancelledMarkIcon, RetryIcon, CollapseIcon, ExpandIcon, HeaderUploadProgressIcon, HeaderSuccessIcon, HeaderFailedIcon, HeaderStatusIcon, SuccessMarkIcon, QueuedMarkIcon;
var init_document_upload_dock = __esmMin((() => {
	init_document_upload_dock$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_useI18n();
	init_file_type_icon();
	init_tdoc_preview_request_store();
	init_types();
	init_utils();
	init_document_upload_runner();
	init_document_upload_task_store();
	init_pick_files_and_folders();
	init_tdoc_import_error_codes();
	import_jsx_runtime = require_jsx_runtime();
	TDOC_IMPORT_SENTINEL_TO_I18N_KEY = {
		[FILE_BREAK_ERROR_SENTINEL]: "tdoc.upload.dock.errorFileBreak",
		[SIZE_LIMIT_OWNER_ERROR_SENTINEL]: "tdoc.upload.dock.errorSizeLimitOwner",
		[SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL]: "tdoc.upload.dock.errorSizeLimitCollaborator",
		[OLD_VERSION_DOC_ERROR_SENTINEL]: "tdoc.upload.dock.errorOldVersionDoc",
		[NO_SUPPORT_IMPORT_ERROR_SENTINEL]: "tdoc.upload.dock.errorNoSupportImport",
		[IMPORT_FAILED_ERROR_SENTINEL]: "tdoc.upload.dock.errorImportFailed",
		[TOO_MANY_CELLS_ERROR_SENTINEL]: "tdoc.upload.dock.errorTooManyCells",
		[NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL]: "tdoc.upload.dock.errorNonVipOverFileSizeLimit",
		[VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL]: "tdoc.upload.dock.errorVipOverFileSizeLimit",
		[OVER_SYSTEM_LIMIT_ERROR_SENTINEL]: "tdoc.upload.dock.errorOverSystemLimit",
		[NO_PERMISSION_ERROR_SENTINEL]: "tdoc.upload.dock.errorNoPermission",
		[LICENSE_EXPIRED_ERROR_SENTINEL]: "tdoc.upload.dock.errorLicenseExpired",
		[ZIP_FILE_CONTENT_NOT_SUPPORT_ERROR_SENTINEL]: "tdoc.upload.dock.errorZipFileContentNotSupport",
		[SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT_ERROR_SENTINEL]: "tdoc.upload.dock.errorSheetToSmartsheetCellExceedLimit",
		[SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT_ERROR_SENTINEL]: "tdoc.upload.dock.errorSheetToSmartsheetFieldExceedLimit",
		[SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT_ERROR_SENTINEL]: "tdoc.upload.dock.errorSheetToSmartsheetRowExceedLimit",
		[SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID_ERROR_SENTINEL]: "tdoc.upload.dock.errorSheetToSmartsheetSelectedRangeInvalid"
	};
	MIN_DOCK_WIDTH = 360;
	MIN_DOCK_HEIGHT = 240;
	COLLAPSED_HEIGHT = 56;
	DEFAULT_RIGHT_MARGIN = 24;
	DEFAULT_BOTTOM_MARGIN = 24;
	DocumentUploadDock = () => {
		const visible = useDocumentUploadStore((s) => s.ui.visible);
		const { account: currentAccount } = useAccountService();
		const clearAll = useDocumentUploadStore((s) => s.clearAll);
		/**
		* 用户登出 / 切换账号时主动关闭浮窗。
		*
		* 背景：DocumentUploadDock 通过 createPortal 挂在 document.body 上、由
		* Root 层（main.tsx）常驻渲染，不会随腾讯文档 panel 卸载而消失。
		* documentUploadStore 也是全局单例，登出 / 切账号后任务记录与 visible 状态
		* 都会保留，导致：
		*   - 登出场景：登录页右下角仍悬浮着上一登录态的"X 个文件上传失败"任务弹框；
		*   - 切账号场景：从账号 A 切到账号 B 后回到腾讯文档页面，A 账号未关闭的
		*     上传完成 / 失败弹框仍然挂在 B 账号视图上。
		*
		* 用 uid 作为身份变化检测依据：登出（uid → null）、登录（null → uid）、
		* 切账号（uidA → uidB）任意一次切换都会让 uid 改变，统一在这里收尾。
		* 首次进入（prev = undefined → 任意值）跳过，避免把刚 enqueue 的新任务也清掉。
		*
		* 处理方式与 closeDock 一致：
		*   1) cancelAllUnfinished() 把 queued / uploading / retrying 的任务打断，
		*      让 adapter cancelToken / saas 轮询 / fakeProgress 计时器收尾；
		*   2) clearAll() 清空全部任务记录并把 visible 置 false。
		*/
		const prevUidRef = (0, import_react.useRef)(void 0);
		const currentUid = currentAccount?.uid ?? null;
		(0, import_react.useEffect)(() => {
			const prev = prevUidRef.current;
			prevUidRef.current = currentUid;
			if (prev === void 0) return;
			if (prev === currentUid) return;
			cancelAllUnfinished();
			clearAll();
		}, [currentUid, clearAll]);
		if (!visible) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUploadDockBody, {}), document.body);
	};
	DocumentUploadDockBody = () => {
		const t = useTranslation();
		const tasks = useDocumentUploadStore((s) => s.tasks);
		const collapsed = useDocumentUploadStore((s) => s.ui.collapsed);
		const position = useDocumentUploadStore((s) => s.ui.position);
		const size = useDocumentUploadStore((s) => s.ui.size);
		const currentFolderPath = useDocumentUploadStore((s) => s.ui.currentFolderPath);
		const setCollapsed = useDocumentUploadStore((s) => s.setCollapsed);
		const setPosition = useDocumentUploadStore((s) => s.setPosition);
		const setSize = useDocumentUploadStore((s) => s.setSize);
		const setCurrentFolderPath = useDocumentUploadStore((s) => s.setCurrentFolderPath);
		const clearAll = useDocumentUploadStore((s) => s.clearAll);
		/**
		* 关闭浮窗：
		* - 先把"未完成"任务（queued / uploading / retrying）通过 cancelTask 打断，
		*   确保 adapter cancelToken / saas 轮询 / fakeProgress 计时器都能正确收尾
		* - 再 clearAll 清空全部任务记录（含 success / failed / cancelled），
		*   这样下一次 enqueue 入列新任务时浮窗只展示当次的文件
		* - clearAll 内部已会把 visible 置 false，无需再单独 setVisible
		*
		* 修复：关闭浮窗后任务记录残留导致下次上传时混入历史记录的问题。
		*/
		const closeDock = (0, import_react.useCallback)(() => {
			cancelAllUnfinished();
			clearAll();
		}, [clearAll]);
		/**
		* pendingPasswordTaskId：当前正在询问密码的任务 id；null 表示未弹框。
		*
		* 触发路径：
		* - 上传遇到 retcode 12975：runner 把 task.error 写成 PASSWORD_REQUIRED /
		*   PASSWORD_WRONG sentinel
		* - FileRow 通过 onRequestPassword 回调通知 dock body
		* - dock body 把 pendingPasswordTaskId 置为该 task.id，密码弹框挂载
		*
		* 关闭路径：
		* - 用户点确认 → retryTask(id, { password }) 后重置 null
		* - 用户点取消 / Esc → 直接重置 null（task 仍处 failed，可继续点输入密码或取消任务）
		*/
		const [pendingPasswordTaskId, setPendingPasswordTaskId] = (0, import_react.useState)(null);
		const [suppressCollapsedTooltip, setSuppressCollapsedTooltip] = (0, import_react.useState)(false);
		const prevCollapsedRef = (0, import_react.useRef)(collapsed);
		(0, import_react.useEffect)(() => {
			const prev = prevCollapsedRef.current;
			prevCollapsedRef.current = collapsed;
			if (!prev && collapsed) {
				setSuppressCollapsedTooltip(true);
				const timer = setTimeout(() => setSuppressCollapsedTooltip(false), 600);
				return () => clearTimeout(timer);
			}
		}, [collapsed]);
		const pendingPasswordTask = (0, import_react.useMemo)(() => {
			if (!pendingPasswordTaskId) return null;
			return tasks.find((x) => x.id === pendingPasswordTaskId) ?? null;
		}, [tasks, pendingPasswordTaskId]);
		(0, import_react.useEffect)(() => {
			if (!pendingPasswordTaskId) return;
			if (!pendingPasswordTask || pendingPasswordTask.status !== "failed") setPendingPasswordTaskId(null);
		}, [pendingPasswordTaskId, pendingPasswordTask]);
		const summary = (0, import_react.useMemo)(() => selectSummary(tasks), [tasks]);
		const folderView = (0, import_react.useMemo)(() => selectFolderView(tasks, currentFolderPath), [tasks, currentFolderPath]);
		/**
		* 「全部重试」按钮的可见性判断：必须存在「实际可重试的 failed」task 才显示。
		*
		* 排除密码相关失败：必须走密码弹框流程，"全部重试"按钮跳过它们。
		*
		* 0B 失败保留为 retryable：runner 入口仅在 retryCount === 0 时短路
		* （issue #46568），retry 后会真正下发到 main 进程重新 fs.stat 拿真实大小，
		* service 层有 0B preflight 兜底安全。
		*
		* 超大文件失败排除在 retryable 外：Desktop main 进程在 service preflight
		* 之前会先把整个文件读入内存计算 md5，未改小的超大文件一旦放行进入 main
		* 就会引发内存暴涨 / 进程卡死。客户端继续把它当作硬终态、不暴露重试入口。
		*/
		const retryableFailedCount = (0, import_react.useMemo)(() => tasks.filter((t) => t.status === "failed" && t.error !== "TDOC_UPLOAD_PASSWORD_REQUIRED" && t.error !== "TDOC_UPLOAD_PASSWORD_WRONG" && t.error !== "TDOC_UPLOAD_FILE_TOO_LARGE").length, [tasks]);
		const [dragging, setDragging] = (0, import_react.useState)(false);
		const [resizing, setResizing] = (0, import_react.useState)(false);
		const dragStateRef = (0, import_react.useRef)(null);
		const resizeStateRef = (0, import_react.useRef)(null);
		const [viewportTick, setViewportTick] = (0, import_react.useState)(0);
		(0, import_react.useEffect)(() => {
			const bump = () => setViewportTick((prev) => prev + 1);
			window.addEventListener("resize", bump);
			let ro;
			if (typeof ResizeObserver !== "undefined") {
				ro = new ResizeObserver(bump);
				ro.observe(document.documentElement);
			}
			return () => {
				window.removeEventListener("resize", bump);
				ro?.disconnect();
			};
		}, []);
		const effectiveSize = (0, import_react.useMemo)(() => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			return {
				width: Math.min(size.width, Math.max(0, vw - 48)),
				height: Math.min(size.height, Math.max(0, vh - 48))
			};
		}, [size, viewportTick]);
		const effectivePosition = (0, import_react.useMemo)(() => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const w = effectiveSize.width;
			const h = collapsed ? COLLAPSED_HEIGHT : effectiveSize.height;
			if (position) return {
				x: clamp(position.x, 0, Math.max(0, vw - w)),
				y: clamp(position.y, 0, Math.max(0, vh - h))
			};
			return {
				x: Math.max(0, vw - w - DEFAULT_RIGHT_MARGIN),
				y: Math.max(0, vh - h - DEFAULT_BOTTOM_MARGIN)
			};
		}, [
			position,
			effectiveSize,
			collapsed,
			viewportTick
		]);
		const handleHeaderMouseDown = (0, import_react.useCallback)((e) => {
			if (e.target.closest("[data-no-drag]")) return;
			e.preventDefault();
			dragStateRef.current = {
				startX: e.clientX,
				startY: e.clientY,
				startPos: effectivePosition
			};
			setDragging(true);
		}, [effectivePosition]);
		(0, import_react.useEffect)(() => {
			if (!dragging) return;
			const onMove = (e) => {
				const ds = dragStateRef.current;
				if (!ds) return;
				const w = size.width;
				const h = collapsed ? COLLAPSED_HEIGHT : size.height;
				const nextX = clamp(ds.startPos.x + (e.clientX - ds.startX), 0, window.innerWidth - w);
				const nextY = clamp(ds.startPos.y + (e.clientY - ds.startY), 0, window.innerHeight - h);
				setPosition({
					x: nextX,
					y: nextY
				});
			};
			const onUp = () => {
				setDragging(false);
				dragStateRef.current = null;
			};
			window.addEventListener("mousemove", onMove);
			window.addEventListener("mouseup", onUp);
			return () => {
				window.removeEventListener("mousemove", onMove);
				window.removeEventListener("mouseup", onUp);
			};
		}, [
			dragging,
			collapsed,
			size,
			setPosition
		]);
		const handleResizeMouseDown = (0, import_react.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			resizeStateRef.current = {
				startX: e.clientX,
				startY: e.clientY,
				startSize: size
			};
			setResizing(true);
		}, [size]);
		(0, import_react.useEffect)(() => {
			if (!resizing) return;
			const onMove = (e) => {
				const rs = resizeStateRef.current;
				if (!rs) return;
				const dx = e.clientX - rs.startX;
				const dy = e.clientY - rs.startY;
				const maxW = window.innerWidth - effectivePosition.x;
				const maxH = window.innerHeight - effectivePosition.y;
				const nextW = clamp(rs.startSize.width + dx, MIN_DOCK_WIDTH, maxW);
				const nextH = clamp(rs.startSize.height + dy, MIN_DOCK_HEIGHT, maxH);
				setSize({
					width: nextW,
					height: nextH
				});
			};
			const onUp = () => {
				setResizing(false);
				resizeStateRef.current = null;
			};
			window.addEventListener("mousemove", onMove);
			window.addEventListener("mouseup", onUp);
			return () => {
				window.removeEventListener("mousemove", onMove);
				window.removeEventListener("mouseup", onUp);
			};
		}, [
			resizing,
			effectivePosition,
			setSize
		]);
		(0, import_react.useEffect)(() => {
			const onKey = (e) => {
				if (e.key === "Escape") closeDock();
			};
			window.addEventListener("keydown", onKey);
			return () => window.removeEventListener("keydown", onKey);
		}, [closeDock]);
		const headerTitle = (0, import_react.useMemo)(() => {
			if (summary.uploading > 0) return t("tdoc.upload.dock.uploadingTitle", {
				count: summary.uploading,
				total: summary.total
			});
			if (summary.failed > 0) return t("tdoc.upload.dock.failedTitle", {
				count: summary.failed,
				total: summary.total
			});
			if (summary.success > 0) return t("tdoc.upload.dock.successTitle", { count: summary.success });
			return t("tdoc.upload.dock.emptyTitle");
		}, [summary, t]);
		const headerSubtitle = (0, import_react.useMemo)(() => {
			if (summary.uploading > 0) return formatSpeed(summary.speedBytesPerSec);
			return null;
		}, [summary]);
		const handlePasswordConfirm = (0, import_react.useCallback)((password) => {
			if (!pendingPasswordTaskId) return;
			const id = pendingPasswordTaskId;
			setPendingPasswordTaskId(null);
			retryTask(id, { password });
		}, [pendingPasswordTaskId]);
		const handlePasswordCancel = (0, import_react.useCallback)(() => {
			setPendingPasswordTaskId(null);
		}, []);
		if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "document-upload-dock document-upload-dock--collapsed",
			style: {
				left: effectivePosition.x,
				top: effectivePosition.y,
				width: effectiveSize.width
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "document-upload-dock__header",
				onMouseDown: handleHeaderMouseDown,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderStatusIcon, { summary }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "document-upload-dock__header-summary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "document-upload-dock__header-title",
							children: [headerTitle, headerSubtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "document-upload-dock__header-title-speed",
								children: [" ", headerSubtitle]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "document-upload-dock__header-actions",
						"data-no-drag": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: suppressCollapsedTooltip ? void 0 : t("tdoc.upload.dock.expand"),
							className: "document-upload-dock__tooltip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "document-upload-dock__icon-btn",
								onClick: () => setCollapsed(false),
								"aria-label": t("tdoc.upload.dock.expand"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: suppressCollapsedTooltip ? void 0 : t("tdoc.upload.dock.close"),
							className: "document-upload-dock__tooltip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "document-upload-dock__icon-btn",
								onClick: closeDock,
								"aria-label": t("tdoc.upload.dock.close"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordPromptDialog, {
			task: pendingPasswordTask,
			onConfirm: handlePasswordConfirm,
			onCancel: handlePasswordCancel
		})] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `document-upload-dock${dragging ? " document-upload-dock--dragging" : ""}${resizing ? " document-upload-dock--resizing" : ""}`,
			style: {
				left: effectivePosition.x,
				top: effectivePosition.y,
				width: effectiveSize.width,
				height: effectiveSize.height
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "document-upload-dock__header",
					onMouseDown: handleHeaderMouseDown,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderStatusIcon, { summary }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "document-upload-dock__header-summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "document-upload-dock__header-title",
								children: [headerTitle, headerSubtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "document-upload-dock__header-title-speed",
									children: [" ", headerSubtitle]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "document-upload-dock__header-actions",
							"data-no-drag": true,
							children: [
								retryableFailedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "document-upload-dock__retry-all-btn",
									onClick: retryAllFailed,
									children: t("tdoc.upload.dock.retryAll")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("tdoc.upload.dock.collapse"),
									className: "document-upload-dock__tooltip",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "document-upload-dock__icon-btn",
										onClick: () => setCollapsed(true),
										"aria-label": t("tdoc.upload.dock.collapse"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapseIcon, {})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("tdoc.upload.dock.close"),
									className: "document-upload-dock__tooltip",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "document-upload-dock__icon-btn",
										onClick: closeDock,
										"aria-label": t("tdoc.upload.dock.close"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
									})
								})
							]
						})
					]
				}),
				currentFolderPath && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "document-upload-dock__breadcrumb",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "document-upload-dock__breadcrumb-item",
						onClick: () => setCurrentFolderPath(""),
						children: t("tdoc.upload.dock.breadcrumbRoot")
					}), breakdownBreadcrumb(currentFolderPath).map((seg, idx, arr) => {
						const isLast = idx === arr.length - 1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "document-upload-dock__breadcrumb-sep",
							children: "/"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `document-upload-dock__breadcrumb-item${isLast ? " document-upload-dock__breadcrumb-item--current" : ""}`,
							onClick: () => !isLast && setCurrentFolderPath(seg.path),
							children: seg.name
						})] }, seg.path);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "document-upload-dock__list",
					children: folderView.folders.length === 0 && folderView.files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "document-upload-dock__empty",
						children: t("tdoc.upload.dock.empty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [folderView.folders.map((folder) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderRow, {
						folder,
						onEnter: setCurrentFolderPath
					}, folder.path)), folderView.files.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileRow, {
						task,
						onRequestPassword: setPendingPasswordTaskId
					}, task.id))] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "document-upload-dock__resize-handle",
					onMouseDown: handleResizeMouseDown,
					"aria-label": "resize"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordPromptDialog, {
			task: pendingPasswordTask,
			onConfirm: handlePasswordConfirm,
			onCancel: handlePasswordCancel
		})] });
	};
	PasswordPromptDialog = ({ task, onConfirm, onCancel }) => {
		const t = useTranslation();
		const [password, setPassword] = (0, import_react.useState)("");
		const inputRef = (0, import_react.useRef)(null);
		(0, import_react.useEffect)(() => {
			if (task) {
				setPassword("");
				const timer = setTimeout(() => {
					inputRef.current?.focus();
				}, 50);
				return () => clearTimeout(timer);
			}
		}, [task?.id]);
		const visible = !!task;
		const title = t("tdoc.upload.dock.passwordPromptTitle");
		const fileName = task?.fileName ?? "";
		const handleConfirm = (0, import_react.useCallback)(() => {
			const trimmed = password;
			if (!trimmed) return;
			onConfirm(trimmed);
		}, [password, onConfirm]);
		const handleKeyDown = (0, import_react.useCallback)((e) => {
			if (e.key === "Enter" && password) {
				e.preventDefault();
				handleConfirm();
			}
		}, [password, handleConfirm]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			visible,
			title,
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "document-upload-dock__password-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "document-upload-dock__password-filename",
					title: fileName,
					children: fileName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "password",
					className: "document-upload-dock__password-input",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					onKeyDown: handleKeyDown,
					placeholder: t("tdoc.upload.dock.passwordPromptPlaceholder"),
					autoComplete: "off",
					spellCheck: false
				})]
			}),
			confirmText: t("tdoc.upload.dock.passwordPromptConfirm"),
			cancelText: t("tdoc.upload.dock.cancel"),
			confirmDisabled: password.length === 0,
			confirmButtonColor: "#3b82f6",
			onConfirm: handleConfirm,
			onClose: onCancel,
			showCloseButton: true
		});
	};
	FolderRow = import_react.memo(({ folder, onEnter }) => {
		const t = useTranslation();
		const { summary } = folder;
		const isCancelledState = summary.uploading === 0 && summary.queued === 0 && summary.failed === 0 && summary.cancelled > 0;
		const isFailedState = summary.uploading === 0 && summary.queued === 0 && summary.failed > 0;
		const isAllSuccessState = summary.total > 0 && summary.uploading === 0 && summary.queued === 0 && summary.failed === 0 && summary.cancelled === 0 && summary.success === summary.total;
		const subtitleText = summary.uploading > 0 ? t("tdoc.upload.dock.folderSubtitleUploading", { count: summary.uploading }) : summary.failed > 0 ? t("tdoc.upload.dock.folderSubtitleFailed", { count: summary.failed }) : isCancelledState ? t("tdoc.upload.dock.folderSubtitleCancelled") : t("tdoc.upload.dock.folderSubtitleDone", { count: summary.total });
		const cancellable = summary.uploading > 0 || summary.queued > 0;
		const subtitleClass = isFailedState ? " document-upload-dock__row-status--failed" : "";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "document-upload-dock__row document-upload-dock__row--folder",
			onClick: () => onEnter(folder.path),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `document-upload-dock__row-icon${isAllSuccessState ? " document-upload-dock__row-icon--success" : isFailedState ? " document-upload-dock__row-icon--failed" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTypeIcon, {
						type: FileType.FOLDER,
						isFolder: true,
						size: 32
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "document-upload-dock__row-main",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "document-upload-dock__row-name",
						children: folder.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `document-upload-dock__row-status${subtitleClass}`,
						children: [
							isCancelledState && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "document-upload-dock__row-status-prefix-icon document-upload-dock__row-status-prefix-icon--failed",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CancelledMarkIcon, {})
							}),
							isAllSuccessState && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "document-upload-dock__row-status-prefix-icon document-upload-dock__row-status-prefix-icon--success",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessMarkIcon, {})
							}),
							isFailedState && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "document-upload-dock__row-status-prefix-icon document-upload-dock__row-status-prefix-icon--failed",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CancelledMarkIcon, {})
							}),
							subtitleText
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "document-upload-dock__row-actions",
					children: [(isFailedState || isCancelledState) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("tdoc.upload.dock.retry"),
						className: "document-upload-dock__tooltip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "document-upload-dock__icon-btn",
							onClick: (e) => {
								e.stopPropagation();
								retryFolder(folder.path);
							},
							"aria-label": t("tdoc.upload.dock.retry"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryIcon, {})
						})
					}), cancellable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("tdoc.upload.dock.cancel"),
						className: "document-upload-dock__tooltip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "document-upload-dock__icon-btn",
							onClick: (e) => {
								e.stopPropagation();
								cancelFolder(folder.path);
							},
							"aria-label": t("tdoc.upload.dock.cancel"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
						})
					})]
				})
			]
		});
	}, (prev, next) => {
		if (prev.onEnter !== next.onEnter) return false;
		const a = prev.folder;
		const b = next.folder;
		if (a === b) return true;
		if (a.path !== b.path || a.name !== b.name) return false;
		const sa = a.summary;
		const sb = b.summary;
		return sa.total === sb.total && sa.uploading === sb.uploading && sa.queued === sb.queued && sa.success === sb.success && sa.failed === sb.failed && sa.cancelled === sb.cancelled && sa.overallPercent === sb.overallPercent;
	});
	FolderRow.displayName = "FolderRow";
	FileRow = import_react.memo(({ task, onRequestPassword }) => {
		const t = useTranslation();
		/**
		* 失败原因的本地化展示文案。
		*
		* runner 在某些前置失败场景下会写入 sentinel 字符串（不是给用户看的英文），
		* 这里识别后替换成对应的本地化文本：
		* - `FILE_TOO_LARGE_ERROR_SENTINEL` → 「文件大小超过上限」
		* - `PASSWORD_REQUIRED_ERROR_SENTINEL` → 「文档已加密，请输入密码」
		* - `PASSWORD_WRONG_ERROR_SENTINEL` → 「密码错误，请重新输入」
		* - 腾讯文档导入业务错误 sentinel（详见 `./tdoc-import-error-codes.ts`），
		*   通过 TDOC_IMPORT_SENTINEL_TO_I18N_KEY 表映射到对应 i18n key
		* 其他真实业务文案（如后端原文 / 'Network Error'）原样透传。
		*
		* subtitle 与 Tooltip 内容共享这个值，保证两处展示一致。
		*/
		const localizedFailReason = (0, import_react.useMemo)(() => {
			if (!task.error) return "";
			if (task.error === "TDOC_UPLOAD_FILE_TOO_LARGE") return t("tdoc.upload.dock.errorFileTooLarge");
			if (task.error === "TDOC_UPLOAD_EMPTY_FILE") return t("tdoc.upload.dock.errorEmptyFile");
			if (task.error === "TDOC_UPLOAD_PASSWORD_REQUIRED") return t("tdoc.upload.dock.errorPasswordRequired");
			if (task.error === "TDOC_UPLOAD_PASSWORD_WRONG") return t("tdoc.upload.dock.errorPasswordWrong");
			const importI18nKey = TDOC_IMPORT_SENTINEL_TO_I18N_KEY[task.error];
			if (importI18nKey) return t(importI18nKey);
			return task.error;
		}, [task.error, t]);
		/**
		* 失败行 hover 时展示在 Tooltip 内的更详细文案。
		*
		* 对「文件大小超过上限」这一类 sentinel 错误，subtitle 显示精炼的
		* 「上传失败：文件大小超过上限」，但用户无法从中得知具体上限。
		* 这里根据文件扩展名区分两种产品口径：
		* - 思维导图 / 流程图（xmind / pos）：「仅支持上传 1G 以内的思维导图」
		* - 其他白名单类型：「仅支持上传 2G 以内的文件」
		*
		* 其它失败原因 Tooltip 内容继续等同于 subtitle 的 reason 文本。
		*/
		const failTooltipContent = (0, import_react.useMemo)(() => {
			if (task.error === "TDOC_UPLOAD_FILE_TOO_LARGE") return isMindmapLikeFile(task.fileName) ? t("tdoc.upload.dock.errorFileTooLargeTipMindmap") : t("tdoc.upload.dock.errorFileTooLargeTipDefault");
			return localizedFailReason;
		}, [
			task.error,
			task.fileName,
			localizedFailReason,
			t
		]);
		/**
		* 当前 task 是否是「密码相关」失败：决定行尾按钮展示「输入密码」还是普通「重试」。
		*/
		const isPasswordFailure = task.status === "failed" && (task.error === "TDOC_UPLOAD_PASSWORD_REQUIRED" || task.error === "TDOC_UPLOAD_PASSWORD_WRONG");
		/**
		* 当前 task 是否是「超大文件」失败：客户端硬终态，禁止暴露重试入口
		* （Desktop main 在 service preflight 前会 readFile 整个文件，OOM 风险）。
		*/
		const isFileTooLargeFailure = task.status === "failed" && task.error === "TDOC_UPLOAD_FILE_TOO_LARGE";
		/**
		* 是否在 subtitle 中展示文件大小后缀。
		*
		* 腾讯文档个人版导入（source='tdoc-personal'）是远端到远端的导入流程，
		* 选择器与后端接口都没有返回真实文件大小，runner 里的 `size` 是固定占位值
		* （仅用于折算"总速度"），直接展示会让用户在所有任务上看到同样的"100 B"，
		* 严重误导。这里对这类任务统一隐藏 size 后缀，仅展示状态文案。
		*
		* 同时对 0B 文件也隐藏 size 后缀：picker 阶段已拦掉绝大多数 0B 文件，
		* 但外部直接 enqueue 0B 任务（runner 兜底走 EMPTY_FILE 失败行）时仍可能
		* 命中此分支。失败行已经有「不支持上传 0B 大小的文件」的明确文案，
		* 再附加「· 0 B」的大小后缀只会让用户重复读到"0 B"，毫无信息增量。
		*/
		const showSize = task.source !== "tdoc-personal" && task.size > 0;
		const subtitle = (0, import_react.useMemo)(() => {
			switch (task.status) {
				case "queued": return showSize ? `${t("tdoc.upload.dock.statusQueued")} · ${formatSize(task.size)}` : t("tdoc.upload.dock.statusQueued");
				case "retrying": return showSize ? `${t("tdoc.upload.dock.statusRetrying")} · ${formatSize(task.size)}` : t("tdoc.upload.dock.statusRetrying");
				case "uploading": return showSize ? `${t("tdoc.upload.dock.statusUploading")} · ${formatSize(task.size)}` : t("tdoc.upload.dock.statusUploading");
				case "success": return showSize ? `${t("tdoc.upload.dock.statusSuccess")} · ${formatSize(task.size)}` : t("tdoc.upload.dock.statusSuccess");
				case "cancelled": return t("tdoc.upload.dock.statusCancelled");
				case "failed": {
					const sizeSuffix = showSize ? ` · ${formatSize(task.size)}` : "";
					if (!task.error) return `${t("tdoc.upload.dock.statusFailed")}${sizeSuffix}`;
					return `${t("tdoc.upload.dock.statusFailedWithReason", { reason: localizedFailReason })}${sizeSuffix}`;
				}
				default: return "";
			}
		}, [
			task,
			t,
			localizedFailReason,
			showSize
		]);
		const iconClass = task.status === "success" ? " document-upload-dock__row-icon--success" : task.status === "failed" ? " document-upload-dock__row-icon--failed" : "";
		const subtitleClass = task.status === "failed" ? " document-upload-dock__row-status--failed" : "";
		/**
		* subtitle 前缀的小状态徽标（按设计稿）：
		* - success：绿色对勾
		* - failed：红色感叹号圆
		* - cancelled：红色感叹号圆（与"已取消"灰字一同展示）
		* - queued / retrying：灰色半月（等待 / 排队中）
		* - uploading 不展示前缀（subtitle 已含"正在上传 X%"文案）
		*
		* 颜色通过 currentColor 由 row-status-prefix-icon--xxx 修饰类注入，
		* 与正文 secondary 灰色解耦。
		*/
		const statusPrefixIconNode = (() => {
			switch (task.status) {
				case "success": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "document-upload-dock__row-status-prefix-icon document-upload-dock__row-status-prefix-icon--success",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessMarkIcon, {})
				});
				case "failed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "document-upload-dock__row-status-prefix-icon document-upload-dock__row-status-prefix-icon--failed",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CancelledMarkIcon, {})
				});
				case "cancelled": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "document-upload-dock__row-status-prefix-icon document-upload-dock__row-status-prefix-icon--failed",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CancelledMarkIcon, {})
				});
				case "queued":
				case "retrying": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "document-upload-dock__row-status-prefix-icon",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueuedMarkIcon, {})
				});
				default: return null;
			}
		})();
		/**
		* 失败行 subtitle 渲染：
		*
		* - 普通失败（非密码原因）：直接展示完整文案（含 reason），如「上传失败：网络错误」
		* - 密码失败（首次需要密码 PASSWORD_REQUIRED）：拆成「上传失败 [输入密码] · 文件大小」三段
		*   * "上传失败" — 红色文字（沿用 --failed 配色）
		*   * "输入密码" — 蓝色文字链接，点击触发 onRequestPassword 打开密码弹框
		*   * "754.5 KB" — 灰色文件大小尾标
		* - 密码失败（密码错了 PASSWORD_WRONG）：改为「密码错误，请重新[输入密码] · 文件大小」
		*   * "密码错误，请重新" — 红色文字前缀
		*   * "输入密码" — 蓝色文字链接，仍可点击再次唤起密码弹框
		*   * "754.5 KB" — 灰色文件大小尾标
		*
		* 设计参考用户提供的截图：失败行不再用蓝色描边按钮，而是把入口做成轻量
		* inline link，跟"上传失败"在同一行视觉上紧贴。
		*/
		const subtitleNode = (() => {
			if (task.status === "failed" && isPasswordFailure) {
				const isWrong = task.error === PASSWORD_WRONG_ERROR_SENTINEL;
				const prefixText = isWrong ? t("tdoc.upload.dock.passwordWrongPrefix") : t("tdoc.upload.dock.statusFailed");
				const linkText = isWrong ? t("tdoc.upload.dock.enterPasswordRetry") : t("tdoc.upload.dock.enterPassword");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `document-upload-dock__row-status${subtitleClass}`,
					children: [
						statusPrefixIconNode,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: prefixText }),
						!isWrong && " ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "document-upload-dock__row-link",
							onClick: () => onRequestPassword(task.id),
							"aria-label": linkText,
							children: linkText
						}),
						showSize && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "document-upload-dock__row-status-sep",
							children: ` · ${formatSize(task.size)}`
						})
					]
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `document-upload-dock__row-status${subtitleClass}`,
				children: [statusPrefixIconNode, subtitle]
			});
		})();
		const iconType = (task.source === "tdoc-personal" ? resolveTdocFileTypeFromMime(task.mimeType) : null) ?? FileType.DRIVE;
		/**
		* 已上传成功 + 有原始文档链接时，整行变为"可点击 → 打开预览弹框"。
		*
		* 设计动机：
		* - dock 是全局浮窗（挂在 Router 外、AgentServicesContext 之外），自己
		*   无法渲染 PreviewModal（PreviewModal 内部依赖 useTencentDocsFacade）。
		* - 跨组件树触发：dock 把请求投到 tdocPreviewRequestStore（模块级 zustand
		*   store），panel 内的 effect 订阅命中后 setPreviewFile+setShowPreviewModal
		*   显示弹框。与主面板列表行点击的预览路径**最终走同一个 PreviewModal**，
		*   保证体验一致。
		* - 个人版导入（source='tdoc-personal'）：runner 在 success 时把 §3.3 返回
		*   的目标 doc_url 写进 task.resultDocUrl；
		* - 本地上传（source='local'）：runner 在 success 时把 uploadFile 响应里
		*   的 url 提取进 task.resultDocUrl。两条链路在这里复用同一个字段。
		*
		* FileInfo 构造说明：
		* dock 的 task 只持有 fileName + resultFileId + resultDocUrl + ext 等少量
		* 字段；PreviewModal 实际只读取 file_id / url / type / ext / is_folder /
		* title 这几个字段，其它必填字段填默认值即可。getPreviewUrl 走 file.url
		* 当 intend_url，所以 url 必须真实，是这里的核心。
		*/
		const isOpenable = task.status === "success" && !!task.resultDocUrl;
		const handleOpenPreview = (0, import_react.useCallback)((e) => {
			if (!isOpenable || !task.resultDocUrl) return;
			const target = e.target;
			if (target && target.closest("button, a")) return;
			const fileInfo = {
				file_id: task.resultFileId ?? "",
				parent_id: task.targetFolderId ?? "",
				title: task.fileName,
				url: task.resultDocUrl,
				type: iconType,
				ext: getFileExt(task.fileName),
				create_time: 0,
				create_name: "",
				last_modify_time: task.finishedAt ? Math.floor(task.finishedAt / 1e3) : 0,
				last_modify_name: "",
				access_time: 0,
				owner_name: "",
				is_folder: false,
				is_link: false,
				size: task.size,
				is_top: false,
				is_star: false
			};
			tdocPreviewRequestStore.getState().requestPreview(fileInfo);
		}, [
			isOpenable,
			task.resultDocUrl,
			task.resultFileId,
			task.targetFolderId,
			task.fileName,
			task.size,
			task.finishedAt,
			iconType
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: isOpenable ? "document-upload-dock__row document-upload-dock__row--openable" : "document-upload-dock__row",
			onClick: isOpenable ? handleOpenPreview : void 0,
			role: isOpenable ? "button" : void 0,
			tabIndex: isOpenable ? 0 : void 0,
			onKeyDown: isOpenable ? (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleOpenPreview(e);
				}
			} : void 0,
			title: isOpenable ? t("tdoc.upload.dock.openPreview") : void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `document-upload-dock__row-icon${iconClass}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTypeIcon, {
						type: iconType,
						ext: getFileExt(task.fileName),
						size: 32
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "document-upload-dock__row-main",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "document-upload-dock__row-name",
						children: task.fileName
					}), task.status === "failed" && task.error && !isPasswordFailure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: failTooltipContent,
						className: "document-upload-dock__tooltip",
						children: subtitleNode
					}) : subtitleNode]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "document-upload-dock__row-actions",
					children: [
						(task.status === "failed" && !isPasswordFailure && !isFileTooLargeFailure || task.status === "cancelled") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("tdoc.upload.dock.retry"),
							className: "document-upload-dock__tooltip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "document-upload-dock__icon-btn",
								onClick: () => retryTask(task.id),
								"aria-label": t("tdoc.upload.dock.retry"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryIcon, {})
							})
						}),
						(task.status === "queued" || task.status === "uploading" || task.status === "retrying") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("tdoc.upload.dock.cancel"),
							className: "document-upload-dock__tooltip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "document-upload-dock__icon-btn",
								onClick: () => cancelTask(task.id),
								"aria-label": t("tdoc.upload.dock.cancel"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})
						}),
						(task.status === "success" || task.status === "failed") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("tdoc.upload.dock.remove"),
							className: "document-upload-dock__tooltip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "document-upload-dock__icon-btn",
								onClick: () => documentUploadStore.getState().removeTask(task.id),
								"aria-label": t("tdoc.upload.dock.remove"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})
						})
					]
				})
			]
		});
	});
	FileRow.displayName = "FileRow";
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
	CancelledMarkIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 18 18",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 11.8242C9.46931 11.8242 9.85038 12.2046 9.85059 12.6738C9.85059 13.1433 9.46944 13.5244 9 13.5244C8.53074 13.5242 8.15039 13.1431 8.15039 12.6738C8.1506 12.2047 8.53087 11.8244 9 11.8242Z",
				fill: "#FF4747"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.98926 4.53711C9.44873 4.53712 9.822 4.9087 9.82422 5.36816L9.84668 9.99316C9.84891 10.4557 9.47426 10.8319 9.01172 10.832C8.55239 10.832 8.17921 10.4612 8.17676 10.002L8.1543 5.37598C8.15207 4.91336 8.52663 4.53711 8.98926 4.53711Z",
				fill: "#FF4747"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5Z",
				fill: "#FF4747"
			})
		]
	});
	RetryIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C8.83 2.5 10.4 3.6 11.1 5.2",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.5 2.5V5.2H8.8",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.5 7C11.5 9.48528 9.48528 11.5 7 11.5C5.17 11.5 3.6 10.4 2.9 8.8",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2.5 11.5V8.8H5.2",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			})
		]
	});
	CollapseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 5.5L7 9.5L11 5.5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			fill: "none"
		})
	});
	ExpandIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 8.5L7 4.5L11 8.5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			fill: "none"
		})
	});
	HeaderUploadProgressIcon = ({ percent }) => {
		const safePercent = Math.max(0, Math.min(100, percent));
		const radius = 10.5;
		const circumference = 2 * Math.PI * radius;
		const dashOffset = circumference * (1 - safePercent / 100);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: radius,
					stroke: "#D7E4FF",
					strokeWidth: "1.5",
					fill: "none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: radius,
					stroke: "#1E6FFF",
					strokeWidth: "1.5",
					fill: "none",
					strokeLinecap: "round",
					strokeDasharray: circumference,
					strokeDashoffset: dashOffset,
					transform: "rotate(-90 12 12)",
					style: { transition: "stroke-dashoffset 0.2s linear" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(8.5 7.5)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M3.26279 8.08988C3.61487 8.08988 3.90049 7.80427 3.90049 7.45218V1.86722L5.43662 3.40335C5.68555 3.65228 6.09 3.65221 6.33896 3.40335C6.58792 3.15439 6.58792 2.74997 6.33896 2.50101L4.24424 0.406285C3.7024 -0.135422 2.82316 -0.135434 2.28135 0.406285L0.18662 2.50101C-0.0622048 2.74995 -0.0622082 3.15442 0.18662 3.40335C0.435548 3.65228 0.84 3.65221 1.08896 3.40335L2.6251 1.86722V7.45218C2.6251 7.8042 2.9108 8.08977 3.26279 8.08988Z",
						fill: "#1E6FFF"
					})
				})
			]
		});
	};
	HeaderSuccessIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M15.1064 9.62305C15.4097 9.31983 15.9018 9.32 16.2051 9.62305C16.5084 9.92635 16.5084 10.4184 16.2051 10.7217L12.2832 14.6445C11.6232 15.3045 10.5527 15.3043 9.89258 14.6445L7.79688 12.5488C7.49404 12.2456 7.49404 11.7544 7.79688 11.4512C8.10018 11.1479 8.59221 11.1479 8.89551 11.4512L10.9902 13.5459C11.0438 13.5994 11.131 13.5994 11.1846 13.5459L15.1064 9.62305Z",
			fill: "#00D689"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5Z",
			fill: "#00D689"
		})]
	});
	HeaderFailedIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "24",
		height: "24",
		viewBox: "0 0 18 18",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 11.8242C9.46931 11.8242 9.85038 12.2046 9.85059 12.6738C9.85059 13.1433 9.46944 13.5244 9 13.5244C8.53074 13.5242 8.15039 13.1431 8.15039 12.6738C8.1506 12.2047 8.53087 11.8244 9 11.8242Z",
				fill: "#FF4747"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.98926 4.53711C9.44873 4.53712 9.822 4.9087 9.82422 5.36816L9.84668 9.99316C9.84891 10.4557 9.47426 10.8319 9.01172 10.832C8.55239 10.832 8.17921 10.4612 8.17676 10.002L8.1543 5.37598C8.15207 4.91336 8.52663 4.53711 8.98926 4.53711Z",
				fill: "#FF4747"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5Z",
				fill: "#FF4747"
			})
		]
	});
	HeaderStatusIcon = ({ summary }) => {
		if (summary.uploading > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "document-upload-dock__header-icon document-upload-dock__header-icon--uploading",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderUploadProgressIcon, { percent: summary.overallPercent })
		});
		if (summary.failed > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "document-upload-dock__header-icon document-upload-dock__header-icon--failed",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderFailedIcon, {})
		});
		if (summary.success > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "document-upload-dock__header-icon document-upload-dock__header-icon--success",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderSuccessIcon, {})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "document-upload-dock__header-icon document-upload-dock__header-icon--uploading",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderUploadProgressIcon, { percent: 0 })
		});
	};
	SuccessMarkIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M15.1064 9.62305C15.4097 9.31983 15.9018 9.32 16.2051 9.62305C16.5084 9.92635 16.5084 10.4184 16.2051 10.7217L12.2832 14.6445C11.6232 15.3045 10.5527 15.3043 9.89258 14.6445L7.79688 12.5488C7.49404 12.2456 7.49404 11.7544 7.79688 11.4512C8.10018 11.1479 8.59221 11.1479 8.89551 11.4512L10.9902 13.5459C11.0438 13.5994 11.131 13.5994 11.1846 13.5459L15.1064 9.62305Z",
			fill: "#00D689"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5Z",
			fill: "#00D689"
		})]
	});
	QueuedMarkIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "6.4",
			stroke: "currentColor",
			strokeWidth: "1.4",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 1.6A6.4 6.4 0 0 1 8 14.4Z",
			fill: "currentColor",
			opacity: "0.6"
		})]
	});
}));
//#endregion
export { tdocPreviewRequestStore as a, init_tdoc_preview_request_store as i, document_upload_dock_exports as n, useTdocPreviewRequestStore as o, init_document_upload_dock as r, DocumentUploadDock as t };
