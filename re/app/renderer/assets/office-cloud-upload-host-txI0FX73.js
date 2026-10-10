import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { CB as init_use_lexiang_check_auth_gate, I1 as t, OB as useLexiangAuth, SB as init_auth_guide, TB as init_lexiang_auth_store, c3 as getWb, j1 as init_i18n, l3 as init_wb_singleton, wB as useLexiangCheckAuthGate, xB as AuthGuide } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { a as init_folder_picker_modal_view, i as FolderPickerModalView } from "./folder-picker-modal-C_2cTFqD.js";
import { o as LexiangContentPickerView, s as init_lexiang_content_picker_view } from "./lexiang-content-picker-Bo09zMCt.js";
import { OfficeAgentHost } from "./office-agent-host-CuCdMk4S.js";
import { s as fileNameFromPath } from "./bootstrap-D7qmlJvj.js";
//#region ../../packages/workbuddy-app/src/office-shell/cloud-upload/office-lexiang-upload-dialog.tsx
init_wb_singleton();
init_auth_guide();
init_lexiang_auth_store();
init_lexiang_content_picker_view();
init_use_lexiang_check_auth_gate();
init_i18n();
init_src();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEXIANG_PAGE_SIZE = 20;
var EMPTY_NODE_STATE = {
	children: [],
	loading: false,
	loaded: true,
	error: null
};
function translate(key, values) {
	return t(key, values);
}
function unwrap(value) {
	if (value && typeof value === "object" && "data" in value) return value.data;
	return value;
}
function toTeam(raw) {
	return {
		id: raw.id,
		name: raw.name
	};
}
function toKb(raw, teamName) {
	return {
		id: raw.id,
		name: raw.name,
		teamId: raw.team_id,
		teamName,
		meta: { rootEntryId: raw.root_entry_id }
	};
}
function entryKind(raw) {
	if (raw.entry_type === "folder") return "folder";
	const extension = raw.extension?.toLowerCase();
	if (extension === "sheet" || extension === "smartsheet" || extension === "xlsx") return "sheet";
	if (extension === "slide" || extension === "ppt" || extension === "pptx") return "slide";
	if (extension === "mind") return "mind";
	if (extension === "pdf") return "pdf";
	return "doc";
}
function toDoc(raw, kb, rootEntryId) {
	return {
		id: raw.id,
		name: raw.name,
		kind: entryKind(raw),
		extension: raw.extension,
		kbId: kb.id,
		kbName: kb.name,
		teamId: kb.teamId,
		teamName: kb.teamName,
		kbRootEntryId: rootEntryId,
		parentId: raw.parent_id,
		meta: {
			hasChildren: raw.has_children === true,
			entryType: raw.entry_type
		}
	};
}
function errorMessage$1(cause, fallback) {
	return cause instanceof Error && cause.message ? cause.message : fallback;
}
async function shouldCheckLexiangLicense() {
	const wb = getWb();
	const profile = await wb.account?.profile?.().catch(() => void 0);
	if (!profile || profile.type === "personal" || !profile.uid || !profile.enterpriseId) return false;
	const oneidListApplications = wb.tencentDocs?.oneidListApplications;
	if (typeof oneidListApplications !== "function") return false;
	try {
		const result = await oneidListApplications({ enterpriseId: profile.enterpriseId });
		return (Array.isArray(result?.applications) ? result.applications : []).find((item) => (item.app_type ?? item.appType) === "lexiang")?.enabled === true;
	} catch {
		return false;
	}
}
function OfficeLexiangUploadDialog({ open, filePath, onClose }) {
	const [initialLoading, setInitialLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [teams, setTeams] = (0, import_react.useState)([]);
	const [personalKb, setPersonalKb] = (0, import_react.useState)(null);
	const [kbs, setKbs] = (0, import_react.useState)([]);
	const [kbsLoading, setKbsLoading] = (0, import_react.useState)(false);
	const [activeTeamId, setActiveTeamId] = (0, import_react.useState)("");
	const [activeKbId, setActiveKbId] = (0, import_react.useState)("");
	const [docs, setDocs] = (0, import_react.useState)([]);
	const [rootDocState, setRootDocState] = (0, import_react.useState)(EMPTY_NODE_STATE);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [keyword, setKeyword] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("directory");
	const [searchFocused, setSearchFocused] = (0, import_react.useState)(false);
	const authStatus = useLexiangAuth((state) => state.authStatus);
	const isAuthorized = authStatus === "connected";
	const triggerCheckAuth = useLexiangCheckAuthGate();
	const loadRef = (0, import_react.useRef)(0);
	const prevOpenRef = (0, import_react.useRef)(false);
	const childStatesRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [, setChildStatesVersion] = (0, import_react.useState)(0);
	const request = (0, import_react.useCallback)(async (path, query) => unwrap(await getWb().tencentLexiang.spApiRequest({
		method: "GET",
		path,
		query
	})), []);
	const loadTeamKbs = (0, import_react.useCallback)(async (teamId, currentTeams) => {
		const sequence = ++loadRef.current;
		setKbsLoading(true);
		setError(null);
		setDocs([]);
		setSelected(/* @__PURE__ */ new Map());
		childStatesRef.current.clear();
		try {
			const result = await request("/spapi/kb/space/v1/spaces", {
				team_id: teamId,
				limit: LEXIANG_PAGE_SIZE,
				sort_by: "-edited_at"
			});
			if (sequence !== loadRef.current) return;
			const teamName = currentTeams.find((team) => team.id === teamId)?.name;
			const nextKbs = (result.spaces ?? []).map((space) => toKb(space, teamName));
			setKbs(nextKbs);
			setActiveKbId(nextKbs[0]?.id ?? "");
		} catch (cause) {
			if (sequence === loadRef.current) {
				setKbs([]);
				setActiveKbId("");
				setError(errorMessage$1(cause, t("office.upload.lexiangKbLoadFailed")));
			}
		} finally {
			if (sequence === loadRef.current) setKbsLoading(false);
		}
	}, [request]);
	const loadInitial = (0, import_react.useCallback)(async () => {
		const sequence = ++loadRef.current;
		setInitialLoading(true);
		setError(null);
		setTeams([]);
		setPersonalKb(null);
		setKbs([]);
		setDocs([]);
		setSelected(/* @__PURE__ */ new Map());
		childStatesRef.current.clear();
		setActiveTeamId("");
		setActiveKbId("");
		try {
			if (await shouldCheckLexiangLicense()) {
				const license = await getWb().tencentLexiang.checkLicense();
				if (license.data?.is_pass !== true) throw new Error(license.error_kind === "transient" ? t("office.upload.lexiangNetworkError") : license.msg || t("office.upload.lexiangLicenseMissing"));
			}
			const [teamResult, personalResult] = await Promise.allSettled([request("/spapi/team/v1/frequent-teams", { limit: LEXIANG_PAGE_SIZE }), request("/spapi/kb/space/v1/spaces/personal", { is_async: false })]);
			if (sequence !== loadRef.current) return;
			if (teamResult.status === "rejected" && personalResult.status === "rejected") throw teamResult.reason;
			const nextTeams = teamResult.status === "fulfilled" ? (teamResult.value.teams ?? []).map(toTeam) : [];
			const nextPersonalKb = personalResult.status === "fulfilled" && personalResult.value.space ? toKb(personalResult.value.space) : null;
			setTeams(nextTeams);
			setPersonalKb(nextPersonalKb);
			if (nextPersonalKb) {
				setKbs([nextPersonalKb]);
				setActiveKbId(nextPersonalKb.id);
			} else if (nextTeams[0]) {
				setActiveTeamId(nextTeams[0].id);
				setInitialLoading(false);
				loadTeamKbs(nextTeams[0].id, nextTeams).catch(() => void 0);
			}
		} catch (cause) {
			if (sequence === loadRef.current) setError(errorMessage$1(cause, t("office.upload.lexiangLoadFailed")));
		} finally {
			if (sequence === loadRef.current) setInitialLoading(false);
		}
	}, [loadTeamKbs, request]);
	const loadDocs = (0, import_react.useCallback)(async (kb) => {
		const rootEntryId = kb.meta?.rootEntryId;
		if (typeof rootEntryId !== "string" || !rootEntryId) {
			setDocs([]);
			setRootDocState({
				...EMPTY_NODE_STATE,
				error: t("office.upload.lexiangRootMissing")
			});
			return;
		}
		const sequence = ++loadRef.current;
		childStatesRef.current.clear();
		setRootDocState({
			children: [],
			loading: true,
			loaded: false,
			error: null
		});
		try {
			const result = await request(`/spapi/kb/entry/v1/entries/${encodeURIComponent(rootEntryId)}/children`, {
				limit: LEXIANG_PAGE_SIZE,
				include: "staff",
				disable_virtual: 1
			});
			if (sequence !== loadRef.current) return;
			const nextDocs = (result.entries ?? []).map((raw) => toDoc(raw, kb, rootEntryId));
			setDocs(nextDocs);
			setRootDocState({
				children: nextDocs,
				loading: false,
				loaded: true,
				error: null,
				nextPageToken: result.next_page_token || void 0
			});
		} catch (cause) {
			if (sequence === loadRef.current) {
				setDocs([]);
				setRootDocState({
					children: [],
					loading: false,
					loaded: false,
					error: errorMessage$1(cause, t("office.upload.lexiangLoadFailed"))
				});
			}
		}
	}, [request]);
	const requestChildDocs = (0, import_react.useCallback)((parentId, mode) => {
		const kb = kbs.find((item) => item.id === activeKbId);
		const rootEntryId = kb?.meta?.rootEntryId;
		if (!kb || typeof rootEntryId !== "string" || !rootEntryId) return;
		const previous = childStatesRef.current.get(parentId) ?? {
			...EMPTY_NODE_STATE,
			loaded: false
		};
		if (previous.loading || mode === "initial" && previous.loaded) return;
		const pageToken = mode === "append" ? previous.nextPageToken : void 0;
		if (mode === "append" && !pageToken) return;
		const generation = loadRef.current;
		childStatesRef.current.set(parentId, {
			children: mode === "append" ? previous.children : [],
			loading: true,
			loaded: mode === "append" ? previous.loaded : false,
			error: null,
			nextPageToken: pageToken
		});
		if (mode !== "initial") setChildStatesVersion((version) => version + 1);
		request(`/spapi/kb/entry/v1/entries/${encodeURIComponent(parentId)}/children`, {
			limit: LEXIANG_PAGE_SIZE,
			include: "staff",
			disable_virtual: 1,
			...pageToken ? { page_token: pageToken } : {}
		}).then((result) => {
			if (generation !== loadRef.current) return;
			const children = (result.entries ?? []).map((raw) => toDoc(raw, kb, rootEntryId));
			childStatesRef.current.set(parentId, {
				children: mode === "append" ? [...previous.children, ...children] : children,
				loading: false,
				loaded: true,
				error: null,
				nextPageToken: children.length > 0 ? result.next_page_token || void 0 : void 0
			});
			setChildStatesVersion((version) => version + 1);
		}).catch((cause) => {
			if (generation !== loadRef.current) return;
			childStatesRef.current.set(parentId, {
				children: mode === "append" ? previous.children : [],
				loading: false,
				loaded: mode === "append" ? previous.loaded : false,
				error: errorMessage$1(cause, t("office.upload.lexiangChildLoadFailed")),
				nextPageToken: previous.nextPageToken
			});
			setChildStatesVersion((version) => version + 1);
		});
	}, [
		activeKbId,
		kbs,
		request
	]);
	const loadMoreRootDocs = (0, import_react.useCallback)(async () => {
		const kb = kbs.find((item) => item.id === activeKbId);
		const rootEntryId = kb?.meta?.rootEntryId;
		const pageToken = rootDocState.nextPageToken;
		if (!kb || typeof rootEntryId !== "string" || !rootEntryId || !pageToken || rootDocState.loading) return;
		const generation = loadRef.current;
		setRootDocState((current) => ({
			...current,
			loading: true,
			error: null
		}));
		try {
			const result = await request(`/spapi/kb/entry/v1/entries/${encodeURIComponent(rootEntryId)}/children`, {
				limit: LEXIANG_PAGE_SIZE,
				include: "staff",
				disable_virtual: 1,
				page_token: pageToken
			});
			if (generation !== loadRef.current) return;
			const nextDocs = (result.entries ?? []).map((raw) => toDoc(raw, kb, rootEntryId));
			setDocs((current) => [...current, ...nextDocs]);
			setRootDocState((current) => ({
				...current,
				children: [...current.children, ...nextDocs],
				loading: false,
				loaded: true,
				nextPageToken: nextDocs.length > 0 ? result.next_page_token || void 0 : void 0
			}));
		} catch (cause) {
			if (generation === loadRef.current) setRootDocState((current) => ({
				...current,
				loading: false,
				error: errorMessage$1(cause, t("office.upload.loadMoreFailed"))
			}));
		}
	}, [
		activeKbId,
		kbs,
		request,
		rootDocState.loading,
		rootDocState.nextPageToken
	]);
	(0, import_react.useEffect)(() => {
		const didOpen = open && !prevOpenRef.current;
		prevOpenRef.current = open;
		if (!didOpen) return;
		setActiveTab("directory");
		setKeyword("");
		if (!isAuthorized) {
			loadRef.current += 1;
			setInitialLoading(false);
			setError(null);
			setTeams([]);
			setPersonalKb(null);
			setKbs([]);
			setDocs([]);
			setRootDocState(EMPTY_NODE_STATE);
			setSelected(/* @__PURE__ */ new Map());
			childStatesRef.current.clear();
			setActiveTeamId("");
			setActiveKbId("");
		}
	}, [isAuthorized, open]);
	(0, import_react.useEffect)(() => {
		if (!open || isAuthorized) return;
		triggerCheckAuth();
	}, [
		isAuthorized,
		open,
		triggerCheckAuth
	]);
	(0, import_react.useEffect)(() => {
		if (!open || !isAuthorized) return;
		loadInitial().catch(() => void 0);
		return () => {
			loadRef.current += 1;
		};
	}, [
		isAuthorized,
		loadInitial,
		open
	]);
	(0, import_react.useEffect)(() => {
		if (!open || !activeKbId) return;
		const kb = kbs.find((item) => item.id === activeKbId);
		if (kb) loadDocs(kb).catch(() => void 0);
	}, [
		activeKbId,
		kbs,
		loadDocs,
		open
	]);
	const toggleSelect = (0, import_react.useCallback)((node) => {
		const key = node.type === "kb" ? `kb:${node.kb.id}` : node.type === "doc" ? `doc:${node.doc.id}` : "";
		if (!key) return;
		setSelected((current) => current.has(key) ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Map([[key, node]]));
	}, []);
	const confirm = (0, import_react.useCallback)(async () => {
		const node = selected.values().next().value;
		if (!node || node.type === "team") return;
		const parentEntryId = node.type === "kb" ? node.kb.meta?.rootEntryId : node.doc.id;
		const spaceId = node.type === "kb" ? node.kb.id : node.doc.kbId;
		if (typeof parentEntryId !== "string" || !parentEntryId) {
			toast.error(t("office.upload.lexiangUploadRootMissing"));
			return;
		}
		const kbName = node.type === "kb" ? node.kb.name : node.doc.kbName ?? node.doc.name;
		const fileName = fileNameFromPath(filePath);
		const toastKey = `office-lexiang-upload-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
		let cancelled = false;
		onClose();
		const uploading = toast({
			message: t("tencentLexiang.cloud.uploading"),
			type: "info",
			duration: 0,
			dedupKey: toastKey,
			action: {
				label: t("common.cancel"),
				onClick: () => {
					cancelled = true;
					uploading.close();
				}
			}
		});
		try {
			if (/\.html?$/i.test(fileName) && spaceId) await getWb().tencentLexiang.uploadLexiangHtml({
				filePath,
				parentEntryId,
				spaceId,
				fileName
			});
			else await getWb().tencentLexiang.uploadLexiangFile({
				filePath,
				parentEntryId,
				fileName
			});
			uploading.close();
			if (cancelled) return;
			toast({
				message: t("tencentLexiang.cloud.uploadSuccess", { name: kbName }),
				type: "success"
			});
		} catch (cause) {
			if (!cancelled) {
				uploading.close();
				toast({
					message: errorMessage$1(cause, t("tencentLexiang.upload.failed")),
					type: "error"
				});
			}
		}
	}, [
		filePath,
		onClose,
		selected
	]);
	const close = (0, import_react.useCallback)(() => {
		onClose();
	}, [onClose]);
	const searchKeyword = keyword.trim().toLowerCase();
	const search = (0, import_react.useMemo)(() => ({
		teams: teams.filter((team) => team.name.toLowerCase().includes(searchKeyword)),
		kbs: kbs.filter((kb) => kb.name.toLowerCase().includes(searchKeyword)),
		docs: docs.filter((doc) => doc.name.toLowerCase().includes(searchKeyword))
	}), [
		docs,
		kbs,
		searchKeyword,
		teams
	]);
	let blockingContent;
	if (!isAuthorized) {
		if (authStatus === "checking") blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-content-picker__empty",
			children: t("tencentLexiang.auth.checking")
		});
		else blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuide, { source: "upload" });
	} else if (error) blockingContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lexiang-content-picker__empty",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => loadInitial().catch(() => void 0),
			children: "重试"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangContentPickerView, {
		visible: open,
		title: t("tencentLexiang.picker.saveToLexiangTitle"),
		t: translate,
		activeTab,
		onTabChange: setActiveTab,
		keyword,
		onKeywordChange: setKeyword,
		searchFocused,
		onSearchFocusChange: setSearchFocused,
		searchPlaceholder: t("tencentLexiang.picker.searchKbKnowledge"),
		confirmText: t("tencentLexiang.picker.confirm"),
		cancelText: t("common.cancel"),
		multiple: false,
		excludeTargetTypes: ["team"],
		selected,
		onToggleSelect: toggleSelect,
		onToggleTeamSelect: () => void 0,
		onRemoveSelected: () => setSelected(/* @__PURE__ */ new Map()),
		onClearSelected: () => setSelected(/* @__PURE__ */ new Map()),
		teams,
		recentKbs: [],
		recentDocs: [],
		recentDocsLoading: false,
		initialLoading,
		keywordPending: false,
		isSearching: searchKeyword.length > 0,
		searchKeyword: keyword.trim(),
		search: {
			loading: false,
			loadingMore: false,
			hasMore: false,
			teams: search.teams,
			kbs: search.kbs,
			docs: search.docs
		},
		directory: {
			teams,
			activeTeamId,
			onTeamChange: (teamId) => {
				setActiveTeamId(teamId);
				setActiveKbId("");
				loadTeamKbs(teamId, teams).catch(() => void 0);
			},
			teamSelectionMode: "none",
			personalSpaceLabel: personalKb ? t("tencentLexiang.picker.personalSpace") : void 0,
			isPersonalSpaceActive: !!personalKb && !activeTeamId,
			onPersonalSpaceClick: personalKb ? () => {
				loadRef.current += 1;
				setActiveTeamId("");
				setKbs([personalKb]);
				setActiveKbId(personalKb.id);
				setSelected(/* @__PURE__ */ new Map());
			} : void 0,
			kbs,
			activeKbId,
			onKbChange: setActiveKbId,
			kbSelectionMode: "radio",
			selectedKbIds: new Set(Array.from(selected.values()).filter((node) => node.type === "kb").map((node) => node.kb.id)),
			onKbSelect: (kb) => toggleSelect({
				type: "kb",
				kb
			}),
			kbsLoading,
			docs,
			getDocChildren: (parentId) => {
				if (!childStatesRef.current.get(parentId)) requestChildDocs(parentId, "initial");
				return childStatesRef.current.get(parentId)?.children ?? [];
			},
			getDocNodeState: (parentId) => childStatesRef.current.get(parentId) ?? EMPTY_NODE_STATE,
			loadMoreDocChildren: (parentId) => requestChildDocs(parentId, "append"),
			retryDocChildren: (parentId) => requestChildDocs(parentId, "retry"),
			rootDocNodeState: rootDocState,
			loadMoreRootDocs: () => {
				loadMoreRootDocs().catch(() => void 0);
			},
			retryRootDocs: () => {
				const kb = kbs.find((item) => item.id === activeKbId);
				if (kb) loadDocs(kb).catch(() => void 0);
			},
			docSelectionMode: "radio",
			selectedDocIds: new Set(Array.from(selected.values()).filter((node) => node.type === "doc").map((node) => node.doc.id)),
			onDocSelect: (doc) => toggleSelect({
				type: "doc",
				doc
			}),
			onFolderSelect: (folder) => toggleSelect({
				type: "doc",
				doc: folder
			}),
			resizable: true
		},
		blockingContent,
		onClose: close,
		onConfirm: () => {
			confirm().catch(() => void 0);
		}
	});
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/cloud-upload/office-tencent-docs-upload-dialog.tsx
init_wb_singleton();
init_folder_picker_modal_view();
init_i18n();
init_src();
var ROOT_FOLDER_ID = "root";
var PAGE_SIZE = 100;
function createCancelToken() {
	return globalThis.crypto?.randomUUID?.() ?? `office-tdoc-${Date.now()}`;
}
function errorMessage(cause, fallback) {
	return cause instanceof Error && cause.message ? cause.message : fallback;
}
function OfficeTencentDocsUploadDialog({ open, filePath, onClose }) {
	const [folderPath, setFolderPath] = (0, import_react.useState)([]);
	const [files, setFiles] = (0, import_react.useState)([]);
	const [selectedFolder, setSelectedFolder] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
	const [hasMore, setHasMore] = (0, import_react.useState)(false);
	const [nextOffset, setNextOffset] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [newFolderName, setNewFolderName] = (0, import_react.useState)(null);
	const [creatingFolder, setCreatingFolder] = (0, import_react.useState)(false);
	const operationRef = (0, import_react.useRef)(0);
	const currentFolderId = folderPath.at(-1)?.id ?? ROOT_FOLDER_ID;
	const currentFolderName = folderPath.at(-1)?.name ?? t("office.upload.tencentDocsRoot");
	const labels = {
		close: t("common.close"),
		cancel: t("common.cancel"),
		confirm: t("common.confirm"),
		newFolder: t("office.upload.newFolder"),
		newFolderPrompt: t("office.upload.folderNamePlaceholder"),
		tabDrive: t("office.upload.tencentDocsRoot"),
		tabSpace: t("office.upload.collaborationSpace"),
		name: t("office.upload.name"),
		owner: t("office.upload.owner"),
		lastEdited: t("office.upload.lastEdited"),
		pickFolder: t("office.upload.pickFolder"),
		loadingMore: t("office.upload.loadingMore"),
		retry: t("common.retry")
	};
	const load = (0, import_react.useCallback)(async (folderId, path, append = false, offset = 0) => {
		const operation = ++operationRef.current;
		if (append) setLoadingMore(true);
		else setLoading(true);
		setError(null);
		try {
			const result = await getWb().tencentDocs.getFileList({
				list_type: "MY_DOC",
				parent_id: folderId === ROOT_FOLDER_ID ? void 0 : folderId,
				offset,
				limit: PAGE_SIZE,
				order_by: "MODIFY_TIME",
				desc: true
			});
			if (operation !== operationRef.current) return;
			setFolderPath(path);
			setFiles((current) => append ? [...current, ...result.files] : result.files);
			setHasMore(result.hasMore);
			setNextOffset(result.nextOffset);
			if (!append) setSelectedFolder(null);
		} catch (cause) {
			if (operation === operationRef.current) {
				setError(errorMessage(cause, t("office.upload.tencentDocsLoadFailed")));
				if (!append) setFiles([]);
			}
		} finally {
			if (operation === operationRef.current) {
				if (append) setLoadingMore(false);
				else setLoading(false);
			}
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setFolderPath([]);
		setFiles([]);
		setSelectedFolder(null);
		setNewFolderName(null);
		load(ROOT_FOLDER_ID, []).catch(() => void 0);
		return () => {
			operationRef.current += 1;
		};
	}, [load, open]);
	const close = (0, import_react.useCallback)(() => {
		operationRef.current += 1;
		onClose();
	}, [onClose]);
	const confirm = (0, import_react.useCallback)(async () => {
		const cancelToken = createCancelToken();
		const fileName = fileNameFromPath(filePath);
		const folderId = selectedFolder?.id ?? currentFolderId;
		const folderName = selectedFolder?.name ?? currentFolderName;
		const toastKey = `office-tencent-docs-upload-${cancelToken}`;
		let cancelled = false;
		onClose();
		const uploading = toast({
			message: t("tdoc.folderPicker.uploading", { name: folderName }),
			type: "info",
			duration: 0,
			dedupKey: toastKey,
			action: {
				label: t("common.cancel"),
				onClick: () => {
					cancelled = true;
					uploading.close();
					getWb().tencentDocs.cancelUpload({ cancelToken }).catch(() => void 0);
				}
			}
		});
		try {
			await getWb().tencentDocs.uploadFile({
				filePath,
				fileName,
				folder_id: folderId,
				cancelToken,
				...fileName.toLowerCase().endsWith(".md") ? { target_ext: "smartcanvas" } : {}
			});
			if (cancelled) return;
			uploading.close();
			toast({
				message: t("tdoc.folderPicker.uploadSuccess", { name: folderName }),
				type: "success"
			});
		} catch (cause) {
			if (!cancelled) {
				uploading.close();
				toast({
					message: t("tdoc.folderPicker.uploadFailed", { error: errorMessage(cause, t("tdoc.folderPicker.uploadFailedDefault")) }),
					type: "error"
				});
			}
		}
	}, [
		currentFolderId,
		currentFolderName,
		filePath,
		onClose,
		selectedFolder
	]);
	const createFolder = (0, import_react.useCallback)(async () => {
		const name = newFolderName?.trim();
		if (!name || creatingFolder) return;
		setCreatingFolder(true);
		setError(null);
		try {
			await getWb().tencentDocs.createFile({
				name,
				type: "FOLDER",
				folder_id: currentFolderId
			});
			setNewFolderName(null);
			await load(currentFolderId, folderPath);
		} catch (cause) {
			setError(errorMessage(cause, t("office.upload.createFolderFailed")));
		} finally {
			setCreatingFolder(false);
		}
	}, [
		creatingFolder,
		currentFolderId,
		folderPath,
		load,
		newFolderName
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPickerModalView, {
		visible: open,
		title: t("tdoc.folderPicker.title"),
		confirmText: t("common.confirm"),
		labels,
		onClose: close,
		onConfirm: () => {
			confirm().catch(() => void 0);
		},
		activeTab: "drive",
		onTabChange: () => void 0,
		rootLabel: t("office.upload.tencentDocsRoot"),
		folderPath,
		files,
		selectedFolderId: selectedFolder?.id ?? null,
		loading,
		loadingMore,
		hasMore,
		error,
		onFolderEnter: (file) => {
			if (!file.is_folder) return;
			load(file.file_id, [...folderPath, {
				id: file.file_id,
				name: file.title
			}]).catch(() => void 0);
		},
		onFolderPick: (file) => {
			if (!file.is_folder) return;
			setSelectedFolder((current) => current?.id === file.file_id ? null : {
				id: file.file_id,
				name: file.title
			});
		},
		onNavigateToFolder: (folderId) => {
			if (folderId === ROOT_FOLDER_ID) {
				load(ROOT_FOLDER_ID, []).catch(() => void 0);
				return;
			}
			const index = folderPath.findIndex((item) => item.id === folderId);
			const nextPath = index >= 0 ? folderPath.slice(0, index + 1) : folderPath;
			load(folderId, nextPath).catch(() => void 0);
		},
		onLoadMore: () => {
			if (hasMore) load(currentFolderId, folderPath, true, nextOffset).catch(() => void 0);
		},
		onRetry: () => {
			load(currentFolderId, folderPath).catch(() => void 0);
		},
		accessGranted: true,
		newFolderDisabled: loading || creatingFolder,
		confirmDisabled: loading,
		onNewFolder: () => setNewFolderName(""),
		newFolder: newFolderName === null ? void 0 : {
			value: newFolderName,
			loading: creatingFolder,
			onChange: setNewFolderName,
			onConfirm: () => {
				createFolder().catch(() => void 0);
			},
			onCancel: () => setNewFolderName(null)
		}
	});
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/cloud-upload/office-cloud-upload-host.tsx
/**
* Office 独立窗的「上传到腾讯文档 / 腾讯乐享」。
*
* 这里只做目标分发。各目标 controller 仅消费 wb.*，展示层复用 agent-ui 纯 View；
* 授权 UI 所需的 Adapter/AppProviders 由 OfficeAgentHost 注入。
*/
function OfficeCloudUploadHost({ target, filePath, onClose, onUploaded }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeAgentHost, { children: target === "tencent-docs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeTencentDocsUploadDialog, {
		open: true,
		filePath,
		onClose,
		onUploaded
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeLexiangUploadDialog, {
		open: true,
		filePath,
		onClose,
		onUploaded
	}) });
}
//#endregion
export { OfficeCloudUploadHost };
