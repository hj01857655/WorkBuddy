import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, E1 as init_useI18n, MJ as init_header_workbuddy, O1 as useTranslation, Ok as useAccountScopedWebviewPartition, SQ as init_use_is_enterprise_admin, UR as useTencentDocsFacade, V3 as useAdapter, VR as init_services, _ as FileType, c as tencentDocsStore, dU as reportTDocAuthFromConnector, dW as useOneidAppStatus, fU as reportTDocAuthFromFilePicker, hU as reportTDocAuthPageShow, iU as init_telemetry, jJ as header_workbuddy_default, m as init_constants, mU as reportTDocAuthFromLibrary, pU as reportTDocAuthFromFileUpload, s as init_store, uW as init_use_oneid_app_status, v as ListType, wQ as useIsEnterpriseEdition, x as init_types, y as OrderBy } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Ev as require_react, Tv as require_jsx_runtime, U as Checkbox, al as Yr, ol as init_dist, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { a as init_utils, s as isUnauthorizedError } from "./utils-C65Aew35.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/transformers/file-transformer.ts
var FILE_TYPE_MAP, formatFileSize, formatRelativeTime, getFileTypeInfo, transformFileInfo, transformFileList;
var init_file_transformer = __esmMin((() => {
	init_types();
	FILE_TYPE_MAP = {
		[FileType.DOC]: {
			label: "文档",
			key: "doc"
		},
		[FileType.SHEET]: {
			label: "表格",
			key: "sheet"
		},
		[FileType.SLIDE]: {
			label: "幻灯片",
			key: "slide"
		},
		[FileType.FORM]: {
			label: "收集表",
			key: "form"
		},
		[FileType.PDF]: {
			label: "PDF",
			key: "pdf"
		},
		[FileType.MIND]: {
			label: "思维导图",
			key: "mind"
		},
		[FileType.FLOW_CHART]: {
			label: "流程图",
			key: "flowchart"
		},
		[FileType.REC]: {
			label: "语音速记",
			key: "rec"
		},
		[FileType.DRIVE]: {
			label: "云盘文件",
			key: "drive"
		},
		[FileType.FOLDER]: {
			label: "文件夹",
			key: "folder"
		},
		[FileType.COLLABORATE]: {
			label: "共享空间",
			key: "collaborate"
		},
		[FileType.SMART_SHEET]: {
			label: "智能表格",
			key: "smart-sheet"
		},
		[FileType.SMART_CANVAS]: {
			label: "智能文档",
			key: "smart-canvas"
		},
		[FileType.BOARD]: {
			label: "白板",
			key: "board"
		},
		[FileType.FORM_CLOCK]: {
			label: "打卡",
			key: "form-clock"
		},
		[FileType.FORM_SEQUENCE]: {
			label: "接龙",
			key: "form-sequence"
		},
		[FileType.SPEECH]: {
			label: "语音速记",
			key: "speech"
		}
	};
	formatFileSize = (bytes) => {
		const size = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
		if (!size || size <= 0) return "-";
		const units = [
			"B",
			"KB",
			"MB",
			"GB"
		];
		let unitIndex = 0;
		let value = size;
		while (value >= 1024 && unitIndex < units.length - 1) {
			value /= 1024;
			unitIndex++;
		}
		return `${unitIndex === 0 ? value : value.toFixed(1)} ${units[unitIndex]}`;
	};
	formatRelativeTime = (time) => {
		if (!time) return "-";
		const date = typeof time === "number" ? /* @__PURE__ */ new Date(time * 1e3) : new Date(time);
		const now = /* @__PURE__ */ new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMinutes = Math.floor(diffMs / 6e4);
		const diffHours = Math.floor(diffMs / 36e5);
		const diffDays = Math.floor(diffMs / 864e5);
		if (diffMinutes < 1) return "刚刚";
		if (diffMinutes < 60) return `${diffMinutes} 分钟前`;
		if (diffHours < 24) return `${diffHours} 小时前`;
		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		if (date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) return `昨天 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
		if (diffDays < 7) return `${diffDays} 天前`;
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		if (year === now.getFullYear()) return `${month}-${day}`;
		return `${year}-${month}-${day}`;
	};
	getFileTypeInfo = (type) => FILE_TYPE_MAP[type] ?? {
		label: "未知",
		key: "unknown"
	};
	transformFileInfo = (file) => {
		const typeInfo = getFileTypeInfo(file.type);
		return {
			id: file.file_id,
			name: file.title,
			type: file.type,
			typeLabel: typeInfo.label,
			typeKey: typeInfo.key,
			isFolder: file.is_folder,
			isLink: file.is_link,
			ownerName: file.owner_name ?? "-",
			ownerAvatar: "",
			parentId: file.parent_id,
			accessTimeFormatted: formatRelativeTime(file.access_time),
			accessTimeRaw: String(file.access_time),
			modifiedTimeFormatted: formatRelativeTime(file.last_modify_time),
			modifiedTimeRaw: String(file.last_modify_time),
			createTimeFormatted: formatRelativeTime(file.create_time),
			sizeFormatted: file.is_folder ? "-" : formatFileSize(file.size),
			sizeRaw: file.size || 0,
			url: file.url,
			ext: file.ext,
			isTop: file.is_top,
			isStar: file.is_star,
			status: (file.status ?? "normal").toLowerCase()
		};
	};
	transformFileList = (files) => files.map(transformFileInfo);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/api/file-service.ts
var getRawFileList, searchFiles, createFile, getPreviewUrl, deleteFile, renameFile, FRESH_TITLE_TIMEOUT_MS, resolveFreshFileTitle;
var init_file_service = __esmMin((() => {
	init_constants();
	init_file_transformer();
	getRawFileList = async (facade, params) => {
		const result = await facade.getFileList(params);
		return {
			files: result.files,
			hasMore: result.hasMore,
			nextOffset: result.nextOffset
		};
	};
	searchFiles = async (facade, params) => {
		const result = await facade.searchFiles(params);
		const filteredFiles = result.files.filter((f) => !f.is_folder);
		return {
			files: transformFileList(filteredFiles),
			total: result.total,
			hasMore: result.hasMore,
			nextOffset: result.nextOffset
		};
	};
	createFile = async (facade, params) => {
		return await facade.createFile(params);
	};
	getPreviewUrl = async (facade, file, type = "openOriginalFile", sessionId) => facade.getPreviewUrl({
		file,
		type,
		...sessionId ? { sessionId } : {}
	});
	deleteFile = async (facade, params) => {
		await facade.deleteFile(params);
	};
	renameFile = async (facade, fileId, title) => {
		await facade.renameFile({
			file_id: fileId,
			title
		});
	};
	FRESH_TITLE_TIMEOUT_MS = 1500;
	resolveFreshFileTitle = async (facade, fileId, fallbackTitle, timeoutMs = FRESH_TITLE_TIMEOUT_MS) => {
		if (!fileId || typeof facade?.queryFileInfo !== "function") return fallbackTitle;
		let timer;
		try {
			const info = await Promise.race([facade.queryFileInfo({ file_id: fileId }), new Promise((resolve) => {
				timer = setTimeout(() => resolve(null), timeoutMs);
			})]);
			return (typeof info?.name === "string" ? info.name.trim() : "") || fallbackTitle;
		} catch (err) {
			console.warn("[TencentDocs][resolveFreshFileTitle] queryFileInfo failed", err);
			return fallbackTitle;
		} finally {
			if (timer !== void 0) clearTimeout(timer);
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/auth-guide.less
var init_auth_guide$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/logos/tencent-docs.png
var tencent_docs_default;
var init_tencent_docs = __esmMin((() => {
	tencent_docs_default = "" + new URL("tencent-docs-BprqnGYL.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/tencent-docs-theme-cookie.ts
/**
* 挂载腾讯文档 `<webview>` 前同步一次主题 cookie。
*
* 失败只 warn 不抛：主题是体验项，不能阻塞文档打开（最坏情况是这一次预览停留在
* 默认深浅色）。
*
* @param url 即将加载的腾讯文档 URL
* @param partition 即将挂载的 `<webview partition>`；拿不到时可省略，此时只补域名维度
* @param logTag 日志前缀，便于区分调用点（如 `LinkPreview` / `TdocImport`）
*/
async function syncTencentDocsThemeCookie(url, partition, logTag = "ThemeCookie") {
	const sync = window.__syncTencentDocsThemeForUrl;
	if (typeof sync !== "function" || !url) return;
	try {
		await sync(url, partition);
	} catch (err) {
		console.warn(`[TencentDocs][${logTag}] sync theme cookie failed`, err);
	}
}
var init_tencent_docs_theme_cookie = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/auth-guide.tsx
/**
* 把描述文案中的 **粗体** 语法解析为 <strong> 节点。
* 不引入完整 markdown，只支持成对的 `**...**` 粗体，足够描述场景。
*/
function renderEmphasizedText(text) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: part.slice(2, -2) }, index);
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(import_react$7.Fragment, { children: part }, index);
	});
}
/**
* 给 C 端腾讯文档授权页 URL 追加 new_login=1，强制走「新登录」流程
* （不复用浏览器已有登录态，每次都展示扫码 / 登录页）。issue #58599。
* 用 URL 解析避免重复追加或破坏已有 query；解析失败时降级为原样返回。
*/
function withForceNewLogin(rawUrl) {
	try {
		const url = new URL(rawUrl);
		url.searchParams.set("new_login", "1");
		return url.toString();
	} catch {
		return rawUrl;
	}
}
var import_react$7, import_jsx_runtime$5, EyeIcon, PencilIcon, ShieldCheckIcon, BrandConnectArrows, AuthGuide;
var init_auth_guide = __esmMin((() => {
	init_auth_guide$1();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_tencent_docs();
	init_contexts();
	init_useI18n();
	init_tencent_docs_theme_cookie();
	init_telemetry();
	import_jsx_runtime$5 = require_jsx_runtime();
	EyeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		})]
	});
	PencilIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", { d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" })]
	});
	ShieldCheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", { d: "m9 12 2 2 4-4" })]
	});
	BrandConnectArrows = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "tencent-docs-auth-guide__connect-arrows",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--1",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--2",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--3",
				children: "›"
			})
		]
	});
	AuthGuide = ({ authStatus, error, authorizeUrl, onAuthorize, onRetry, authSource }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const tdocAuthPartition = useAccountScopedWebviewPartition("tdoc-auth");
		const webviewContainerRef = (0, import_react$7.useRef)(null);
		const isAuthorizing = authStatus === "authorizing";
		const isExpired = authStatus === "expired";
		const isFailed = authStatus === "failed";
		(0, import_react$7.useEffect)(() => {
			if (authStatus !== "checking") reportTDocAuthPageShow(adapter);
		}, [adapter, authStatus]);
		(0, import_react$7.useEffect)(() => {
			const container = webviewContainerRef.current;
			if (!container || !isAuthorizing || !authorizeUrl || !tdocAuthPartition) return;
			const webview = document.createElement("webview");
			webview.setAttribute("partition", tdocAuthPartition);
			webview.className = "tencent-docs-auth-webview";
			let cancelled = false;
			syncTencentDocsThemeCookie(authorizeUrl, tdocAuthPartition, "AuthGuide").then(() => {
				if (cancelled) return;
				webview.setAttribute("src", withForceNewLogin(authorizeUrl));
				container.appendChild(webview);
			}).catch(() => {});
			return () => {
				cancelled = true;
				if (webview.parentNode === container) container.removeChild(webview);
			};
		}, [
			isAuthorizing,
			authorizeUrl,
			tdocAuthPartition
		]);
		if (isAuthorizing && authorizeUrl) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "tencent-docs-auth-webview-container",
			ref: webviewContainerRef
		}, "tdoc-auth-webview");
		const title = isExpired ? t("tdoc.auth.expiredTitle") : t("tdoc.auth.title");
		const description = isExpired ? t("tdoc.auth.expiredDesc") : isAuthorizing ? t("tdoc.auth.authorizingDesc") : t("tdoc.auth.description");
		const buttonText = isExpired ? t("tdoc.auth.reauthorize") : isAuthorizing ? t("tdoc.auth.authorizing") : isFailed ? t("tdoc.auth.retry") : t("tdoc.auth.authorize");
		const handleClick = () => {
			if (isFailed) onRetry();
			else {
				if (authSource) ({
					library: () => reportTDocAuthFromLibrary(adapter),
					file_picker: () => reportTDocAuthFromFilePicker(adapter),
					file_upload: () => reportTDocAuthFromFileUpload(adapter),
					connector: () => reportTDocAuthFromConnector(adapter)
				})[authSource]?.();
				onAuthorize();
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "tencent-docs-auth-guide",
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "tencent-docs-auth-guide__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "tencent-docs-auth-guide__brands",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
									src: header_workbuddy_default,
									alt: "WorkBuddy",
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(BrandConnectArrows, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--tdoc",
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
									src: tencent_docs_default,
									alt: "Tencent Docs",
									draggable: false
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h2", {
						className: "tencent-docs-auth-guide__title",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
						className: "tencent-docs-auth-guide__desc",
						children: renderEmphasizedText(description)
					}),
					!isAuthorizing && !isFailed && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "tencent-docs-auth-guide__permissions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
							className: "tencent-docs-auth-guide__permissions-title",
							children: t("tdoc.auth.permissionsTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("ul", {
							className: "tencent-docs-auth-guide__permissions-list",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", {
								className: "tencent-docs-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
									className: "tencent-docs-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(EyeIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
									className: "tencent-docs-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-label",
										children: t("tdoc.auth.permissionRead")
									}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-desc",
										children: t("tdoc.auth.permissionReadDesc")
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", {
								className: "tencent-docs-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
									className: "tencent-docs-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PencilIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
									className: "tencent-docs-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-label",
										children: t("tdoc.auth.permissionWrite")
									}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-desc",
										children: t("tdoc.auth.permissionWriteDesc")
									})]
								})]
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "tencent-docs-auth-guide__error",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
						className: `tencent-docs-auth-guide__btn${isAuthorizing ? " tencent-docs-auth-guide__btn--loading" : ""}`,
						onClick: handleClick,
						disabled: isAuthorizing,
						children: [isAuthorizing && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { className: "tencent-docs-auth-guide__spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
							className: "tencent-docs-auth-guide__btn-label",
							children: buttonText
						})]
					}),
					!isAuthorizing && !isFailed && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "tencent-docs-auth-guide__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ShieldCheckIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: t("tdoc.auth.privacyHint") })]
					})
				]
			})
		}, "tdoc-auth-guide");
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/empty-no-files.png
var empty_no_files_default;
var init_empty_no_files = __esmMin((() => {
	empty_no_files_default = "" + new URL("empty-no-files-Bg7fPSxV.png", import.meta.url).href;
})), import_jsx_runtime$4, EmptyState;
var init_empty_state = __esmMin((() => {
	require_react();
	init_useI18n();
	init_empty_no_files();
	import_jsx_runtime$4 = require_jsx_runtime();
	EmptyState = ({ type = "no-files", keyword, description, actions }) => {
		const t = useTranslation();
		const hasActions = !!actions;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: `tdoc-empty-state${hasActions ? " tdoc-empty-state--with-actions" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "tdoc-empty-state__icon",
					children: type === "no-files" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
						className: "tdoc-empty-state__icon-img",
						src: empty_no_files_default,
						alt: "",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "tdoc-empty-state__icon-emoji",
						children: "🔍"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "tdoc-empty-state__title",
					children: type === "no-files" ? t("tdoc.empty.noFiles") : t("tdoc.empty.noResults")
				}),
				type === "no-results" && keyword && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "tdoc-empty-state__desc",
					children: t("tdoc.empty.noResultsFor", { keyword })
				}),
				type === "no-files" && description && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "tdoc-empty-state__desc",
					children: description
				}),
				hasActions && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "tdoc-empty-state__actions",
					children: actions
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/file-list.less
var init_file_list$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/list-header.tsx
/**
* ListHeader - Generic table header row with sortable columns
* No business dependencies — renders column.label directly
*/
function ListHeader({ columns, sortConfig, onSortChange, allChecked, indeterminate, onCheckAll }) {
	const handleSort = (column) => {
		if (!column.sortable || !column.sortKey || !onSortChange) return;
		if (sortConfig?.sortKey === column.sortKey) onSortChange(column.sortKey, !sortConfig.desc);
		else onSortChange(column.sortKey, true);
	};
	const renderSortIcon = (column) => {
		if (!column.sortable || !column.sortKey) return null;
		if (!(sortConfig?.sortKey === column.sortKey)) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SortArrowBoth, {});
		return sortConfig?.desc ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SortArrowDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SortArrowUp, {});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "tdoc-file-list-header",
		role: "row",
		children: [onCheckAll && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "tdoc-file-list-header__checkbox-cell",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Checkbox, {
				size: "small",
				checked: allChecked,
				ref: (el) => {
					if (el) el.indeterminate = !!indeterminate;
				},
				onChange: onCheckAll
			})
		}), columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: `tdoc-file-list-header__cell${col.sortable ? " tdoc-file-list-header__cell--sortable" : ""}${col.align === "right" ? " tdoc-file-list-header__cell--right" : ""}${col.align === "center" ? " tdoc-file-list-header__cell--center" : ""}`,
			style: { flex: col.flex },
			role: "columnheader",
			onClick: () => handleSort(col),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "tdoc-file-list-header__label",
				children: col.label
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "tdoc-file-list-header__sort-icon",
				children: renderSortIcon(col)
			})]
		}, col.key))]
	});
}
var import_jsx_runtime$3, SortArrowBoth, SortArrowDown, SortArrowUp;
var init_list_header = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$3 = require_jsx_runtime();
	SortArrowBoth = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			d: "M8 3L11 6.5H5L8 3Z",
			opacity: "0.35"
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			d: "M8 13L5 9.5H11L8 13Z",
			opacity: "0.35"
		})]
	});
	SortArrowDown = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			d: "M8 3L11 6.5H5L8 3Z",
			opacity: "0.25"
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "M8 13L5 9.5H11L8 13Z" })]
	});
	SortArrowUp = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "M8 3L11 6.5H5L8 3Z" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			d: "M8 13L5 9.5H11L8 13Z",
			opacity: "0.25"
		})]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/list-row.tsx
/**
* ListRow - Generic row component
* Renders each cell by calling column.render(record, index)
* No business dependencies — fully driven by ColumnDef
*/
function ListRow({ record, columns, index, selected, checked, onCheckChange, checkboxDisabled, checkboxDisabledTooltip, className, onClick }) {
	const handleClick = (0, import_react$4.useCallback)(() => {
		onClick?.(record);
	}, [record, onClick]);
	const handleKeyDown = (0, import_react$4.useCallback)((e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick?.(record);
		}
	}, [record, onClick]);
	const handleCheckboxClick = (0, import_react$4.useCallback)((e) => {
		e.stopPropagation();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: `tdoc-file-list-item${selected ? " tdoc-file-list-item--selected" : ""}${checked ? " tdoc-file-list-item--checked" : ""} ${className || ""}`,
		role: "row",
		tabIndex: 0,
		onClick: handleClick,
		onKeyDown: handleKeyDown,
		children: [(onCheckChange || checkboxDisabled) && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "tdoc-file-list-item__checkbox-cell",
			onClick: handleCheckboxClick,
			children: checkboxDisabled && checkboxDisabledTooltip ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
				content: checkboxDisabledTooltip,
				placement: "bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "tdoc-file-list-item__checkbox-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Checkbox, {
						size: "small",
						checked,
						disabled: checkboxDisabled,
						onChange: onCheckChange
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Checkbox, {
				size: "small",
				checked,
				disabled: checkboxDisabled,
				onChange: onCheckChange
			})
		}), columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: `tdoc-file-list-item__cell${col.align === "right" ? " tdoc-file-list-item__cell--right" : ""}${col.align === "center" ? " tdoc-file-list-item__cell--center" : ""}`,
			style: { flex: col.flex },
			role: "cell",
			children: col.render(record, index)
		}, col.key))]
	});
}
var import_react$4, import_jsx_runtime$2;
var init_list_row = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/list-skeleton.tsx
/**
* ListSkeleton - Generic loading skeleton placeholder
* Renders based on column flex values, no business dependencies
*/
function ListSkeleton({ rows = 8, columns }) {
	const cols = columns || [
		{
			key: "col-1",
			flex: "1 1 auto"
		},
		{
			key: "col-2",
			flex: "0 0 120px"
		},
		{
			key: "col-3",
			flex: "0 0 120px"
		},
		{
			key: "col-4",
			flex: "0 0 150px"
		},
		{
			key: "col-5",
			flex: "0 0 100px"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "tdoc-file-list-skeleton",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "tdoc-file-list-skeleton__header",
			children: cols.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "tdoc-file-list-skeleton__header-cell",
				style: { flex: col.flex },
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "tdoc-file-list-skeleton__bar tdoc-file-list-skeleton__bar--short" })
			}, col.key))
		}), Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "tdoc-file-list-skeleton__row",
			children: cols.map((col, colIdx) => {
				const barClass = colIdx === 0 ? "tdoc-file-list-skeleton__bar--long" : colIdx === cols.length - 1 ? "tdoc-file-list-skeleton__bar--short" : "tdoc-file-list-skeleton__bar--medium";
				return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "tdoc-file-list-skeleton__cell",
					style: { flex: col.flex },
					children: [colIdx === 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "tdoc-file-list-skeleton__icon" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: `tdoc-file-list-skeleton__bar ${barClass}` })]
				}, col.key);
			})
		}, i))]
	});
}
var import_jsx_runtime$1;
var init_list_skeleton = __esmMin((() => {
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/index.tsx
/**
* VirtualList<T> - Generic virtual scrolling list component
*
* Features:
* - Virtual scrolling via react-virtuoso
* - Sortable column headers
* - Infinite scroll (load more on end reached)
* - Loading / Error / Empty states
* - Row selection
*
* Zero business dependencies — all rendering is driven by ColumnDef<T>.render()
*/
function VirtualList({ data, columns, rowKey, loading, loadingMore, error, hasMore, sortKey, sortDesc = true, onSortChange, selectedKey, checkedKeys, isCheckable, showDisabledCheckbox, checkboxDisabledTooltip, onCheckChange, onCheckAll, allChecked, indeterminate, onRowClick, onLoadMore, onRetry, className, rowClassName, renderEmpty, renderError, loadingMoreText = "Loading...", skeletonRows = 8 }) {
	const sortConfig = sortKey ? {
		sortKey,
		desc: sortDesc
	} : void 0;
	const headerRef = (0, import_react$2.useRef)(null);
	const bodyRef = (0, import_react$2.useRef)(null);
	const containerRef = (0, import_react$2.useRef)(null);
	const handleEndReached = (0, import_react$2.useCallback)(() => {
		if (hasMore && !loadingMore) onLoadMore?.();
	}, [
		hasMore,
		loadingMore,
		onLoadMore
	]);
	if (error && data.length === 0) {
		if (renderError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `tdoc-file-list ${className || ""}`,
			children: renderError(error, onRetry)
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `tdoc-file-list ${className || ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tdoc-file-list__error",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tdoc-file-list__error-icon",
						children: "⚠️"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tdoc-file-list__error-message",
						children: error
					}),
					onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "tdoc-file-list__error-retry",
						onClick: onRetry,
						children: "↻ Retry"
					})
				]
			})
		});
	}
	if (loading && data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `tdoc-file-list ${className || ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {
			rows: skeletonRows,
			columns
		})
	});
	if (!loading && data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `tdoc-file-list ${className || ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListHeader, {
			columns,
			sortConfig,
			onSortChange,
			allChecked,
			indeterminate,
			onCheckAll
		}), renderEmpty ? renderEmpty() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tdoc-file-list__error",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tdoc-file-list__error-message",
				children: "No data"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: `tdoc-file-list ${className || ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: headerRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListHeader, {
				columns,
				sortConfig,
				onSortChange,
				allChecked,
				indeterminate,
				onCheckAll
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: bodyRef,
			className: "tdoc-file-list__body",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Yr, {
				data,
				overscan: 200,
				endReached: handleEndReached,
				itemContent: (index, record) => {
					const key = rowKey(record);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListRow, {
						record,
						columns,
						index,
						selected: key === selectedKey,
						checked: checkedKeys?.has(key),
						onCheckChange: onCheckChange && (!isCheckable || isCheckable(record)) ? (checked) => onCheckChange(key, checked) : void 0,
						checkboxDisabled: showDisabledCheckbox && isCheckable && !isCheckable(record) ? true : void 0,
						checkboxDisabledTooltip,
						className: rowClassName?.(record),
						onClick: onRowClick
					});
				},
				components: { Footer: () => loadingMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tdoc-file-list__loading-more",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tdoc-file-list__loading-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loadingMoreText })]
				}) : null }
			})
		})]
	});
}
var import_react$2, import_jsx_runtime;
var init_file_list = __esmMin((() => {
	init_file_list$1();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_list_header();
	init_list_row();
	init_list_skeleton();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-file-list.ts
var import_react$1, PAGE_SIZE, useFileList;
var init_use_file_list = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_services();
	init_file_service();
	init_store();
	init_types();
	init_utils();
	PAGE_SIZE = 20;
	useFileList = ({ listType, enabled = true }) => {
		const tencentDocs = useTencentDocsFacade();
		const [files, setFiles] = (0, import_react$1.useState)([]);
		const [loading, setLoading] = (0, import_react$1.useState)(false);
		const [loadingMore, setLoadingMore] = (0, import_react$1.useState)(false);
		const [error, setError] = (0, import_react$1.useState)(null);
		const [hasMore, setHasMore] = (0, import_react$1.useState)(false);
		const [orderBy, setOrderBy] = (0, import_react$1.useState)(listType === ListType.RECENT ? OrderBy.ACCESS_TIME : OrderBy.MODIFY_TIME);
		const [desc, setDesc] = (0, import_react$1.useState)(true);
		const [currentFolderId, setCurrentFolderId] = (0, import_react$1.useState)(null);
		const [folderPath, setFolderPath] = (0, import_react$1.useState)([]);
		const nextOffsetRef = (0, import_react$1.useRef)(0);
		const requestIdRef = (0, import_react$1.useRef)(0);
		const loadingMoreRef = (0, import_react$1.useRef)(false);
		const hasRequestedRef = (0, import_react$1.useRef)(false);
		/** Load initial file list (reset pagination) */
		const loadFiles = (0, import_react$1.useCallback)(async () => {
			if (!enabled) return;
			hasRequestedRef.current = true;
			const currentRequestId = ++requestIdRef.current;
			setLoading(true);
			setError(null);
			nextOffsetRef.current = 0;
			try {
				const result = await getRawFileList(tencentDocs, {
					list_type: listType,
					offset: 0,
					limit: PAGE_SIZE,
					order_by: orderBy,
					desc,
					parent_id: currentFolderId || void 0
				});
				if (currentRequestId !== requestIdRef.current) return;
				setFiles(result.files);
				setHasMore(result.hasMore);
				nextOffsetRef.current = result.nextOffset;
			} catch (err) {
				if (currentRequestId !== requestIdRef.current) return;
				if (isUnauthorizedError(err)) {
					tencentDocsStore.getState().markExpired();
					setFiles([]);
					return;
				}
				setError(err instanceof Error ? err.message : "Failed to load file list");
				setFiles([]);
			} finally {
				if (currentRequestId === requestIdRef.current) setLoading(false);
			}
		}, [
			enabled,
			tencentDocs,
			listType,
			orderBy,
			desc,
			currentFolderId
		]);
		/** Load more files (append to existing list) */
		const loadMore = (0, import_react$1.useCallback)(async () => {
			if (!enabled) return;
			if (loadingMoreRef.current || !hasMore) return;
			loadingMoreRef.current = true;
			setLoadingMore(true);
			try {
				const result = await getRawFileList(tencentDocs, {
					list_type: listType,
					offset: nextOffsetRef.current,
					limit: PAGE_SIZE,
					order_by: orderBy,
					desc,
					parent_id: currentFolderId || void 0
				});
				setFiles((prev) => [...prev, ...result.files]);
				setHasMore(result.hasMore);
				nextOffsetRef.current = result.nextOffset;
			} catch (err) {
				if (isUnauthorizedError(err)) tencentDocsStore.getState().markExpired();
				else setError(err instanceof Error ? err.message : "Failed to load more files");
			} finally {
				setLoadingMore(false);
				loadingMoreRef.current = false;
			}
		}, [
			enabled,
			tencentDocs,
			listType,
			orderBy,
			desc,
			currentFolderId,
			hasMore
		]);
		/** Enter a subfolder (MY_DOC tab only) */
		const enterFolder = (0, import_react$1.useCallback)((folderId, folderName) => {
			setCurrentFolderId((prev) => prev === folderId ? prev : folderId);
			setFolderPath((prev) => {
				const last = prev[prev.length - 1];
				if (last && last.id === folderId) return prev;
				return [...prev, {
					id: folderId,
					name: folderName
				}];
			});
		}, []);
		/** Navigate to a specific folder in the breadcrumb path */
		const navigateToFolder = (0, import_react$1.useCallback)((folderId) => {
			if (folderId === "root" || !folderId) {
				setCurrentFolderId(null);
				setFolderPath([]);
			} else {
				setFolderPath((prev) => {
					const index = prev.findIndex((item) => item.id === folderId);
					if (index >= 0) return prev.slice(0, index + 1);
					return prev;
				});
				setCurrentFolderId(folderId);
			}
		}, []);
		(0, import_react$1.useEffect)(() => {
			loadFiles();
		}, [loadFiles]);
		(0, import_react$1.useEffect)(() => {
			if (!enabled) hasRequestedRef.current = false;
		}, [enabled]);
		(0, import_react$1.useEffect)(() => {
			setCurrentFolderId(null);
			setFolderPath([]);
			setOrderBy(listType === ListType.RECENT ? OrderBy.ACCESS_TIME : OrderBy.MODIFY_TIME);
		}, [listType]);
		const toggleDesc = (0, import_react$1.useCallback)(() => {
			setDesc((prev) => !prev);
		}, []);
		return {
			files,
			loading: loading || enabled && !hasRequestedRef.current,
			loadingMore,
			error,
			hasMore,
			orderBy,
			desc,
			currentFolderId,
			folderPath,
			loadFiles,
			loadMore,
			setOrderBy,
			setDesc,
			toggleDesc,
			enterFolder,
			navigateToFolder
		};
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tdoc-check-auth-gate.ts
/**
* 腾讯文档授权状态检查入口分流。
*
* OA / 企业账号的授权走 OneID 通道，C 端 OAuth status 接口会固定返回
* not_connected；若继续调用 store.checkAuthStatus，会触发连接器自动 unbind。
* 因此企业已开通时只把本地 store 推到 connected，其余 OneID 态交给调用方渲染。
*/
function useTdocCheckAuthGate() {
	const isEnterpriseEdition = useIsEnterpriseEdition();
	const oneidStatus = useOneidAppStatus("doc");
	return (0, import_react.useCallback)(() => {
		if (!isEnterpriseEdition) {
			tencentDocsStore.getState().checkAuthStatus();
			return;
		}
		if (oneidStatus.status !== "enabled") return;
		tencentDocsStore.setState({
			authStatus: "connected",
			authError: null,
			authorizeUrl: null
		});
	}, [isEnterpriseEdition, oneidStatus.status]);
}
var import_react;
var init_use_tdoc_check_auth_gate = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_store();
}));
//#endregion
export { searchFiles as C, resolveFreshFileTitle as S, createFile as _, VirtualList as a, init_file_service as b, init_list_skeleton as c, AuthGuide as d, init_auth_guide as f, tencent_docs_default as g, init_tencent_docs as h, useFileList as i, EmptyState as l, syncTencentDocsThemeCookie as m, useTdocCheckAuthGate as n, init_file_list as o, init_tencent_docs_theme_cookie as p, init_use_file_list as r, ListSkeleton as s, init_use_tdoc_check_auth_gate as t, init_empty_state as u, deleteFile as v, renameFile as x, getPreviewUrl as y };
