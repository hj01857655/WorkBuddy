import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-V4kyJ4NV.js";
import { I1 as t, T0 as init_app_core, f3 as wb, j1 as init_i18n, u3 as isAppCoreReady } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { Mt as createStore, Nt as init_vanilla, Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/store.ts
var store_exports = /* @__PURE__ */ __exportAll({
	createMyFilesStore: () => createMyFilesStore,
	getFavoriteOwnerKey: () => getFavoriteOwnerKey,
	hydrateFavoriteIds: () => hydrateFavoriteIds,
	loadCloudFileCount: () => loadCloudFileCount,
	loadStorageCapacity: () => loadStorageCapacity,
	myFilesStore: () => myFilesStore,
	resetFavoriteAccountScope: () => resetFavoriteAccountScope,
	useMyFilesStore: () => useMyFilesStore
});
/**
* registry 去重比较：影响后续拖拽 / 多选加任务 / 批量上传的字段任一变化都要刷新 registry。
* 仅比 id 不够——同 ID 文件可能更新了 uri/name/sessionId/size/updatedAt（重存、改名、换会话、
* 重新计算大小），下游从 fileRegistry 取完整对象时若不刷新就会拿到旧路径 / 旧文件名。
*/
function isSameRegisteredFile(a, b) {
	return a.name === b.name && a.uri === b.uri && a.sessionId === b.sessionId && a.size === b.size && a.updatedAt === b.updatedAt && a.type === b.type && a.mimeType === b.mimeType;
}
/**
* 把 files 合并进 registry：
* - 出现新文件，或已注册文件的关键字段变化 → 返回新 Map（写 store）
* - 全部未变 → 返回 null（调用方据此跳过 setState，避免 fileRegistry 订阅者无谓 re-render）
*
* 第一遍只读 + 比较（不复制 Map），确认有变化后才 `new Map` 复制，
* 让「集合 / 字段都没变」的常见路径零分配、零订阅者通知。
*/
function mergeFileRegistry(prev, files) {
	let changed = false;
	for (const f of files) {
		const old = prev.get(f.id);
		if (!old || !isSameRegisteredFile(old, f)) {
			changed = true;
			break;
		}
	}
	if (!changed) return null;
	const next = new Map(prev);
	for (const f of files) next.set(f.id, f);
	return next;
}
function favoriteWbKey(ownerKey) {
	return `favoriteIds.${ownerKey}`;
}
/** 校验持久化数据形态：只接受 string 数组，脏数据静默丢弃 */
function normalizeFavoriteIds(value) {
	return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
}
/** 清除废弃的 legacy localStorage key（见上方注释：不迁移，见到即清，幂等） */
function clearLegacyFavoriteIds() {
	try {
		if (typeof localStorage !== "undefined") localStorage.removeItem(LEGACY_FAVORITE_IDS_STORAGE_KEY);
	} catch {}
}
/**
* hydrate 结果落内存：期间有本地变更则合并（union），否则直接覆盖。
* 应用后重置 dirty——hydrate 自身的 setFavoriteIds 不算用户变更，
* 否则下一次 hydrate 会误走 union 分支，把上一个账号的内存残留合并进来。
*/
function applyHydratedFavoriteIds(stored) {
	const current = myFilesStore.getState().favoriteIds;
	const next = _favoritesDirty ? Array.from(/* @__PURE__ */ new Set([...stored, ...current])) : stored;
	myFilesStore.getState().setFavoriteIds(next);
	_favoritesDirty = false;
}
/**
* 从 wb.storage.user 恢复当前账号身份的收藏（面板挂载 / 账号身份变化时调用）。
*
* - wb 有数据 → 直接恢复；无数据 → 空收藏，并顺手清掉废弃的 legacy key（不迁移）
* - hydrate 完成前用户已操作 → 与内存合并而非覆盖（不丢刚点的收藏）
* - wb 未就绪（isAppCoreReady 为 false）→ 跳过，收藏保持内存态，下次挂载重试
* - storage 异常 → 静默，收藏保持内存态
* - 同 ownerKey 重复调用共享 in-flight promise（StrictMode 双挂载幂等）
*
* @param ownerKey 账号身份键（uid:enterpriseId，与 MyFilesPanel 的 accountIdentity 一致）
*/
function hydrateFavoriteIds(ownerKey) {
	if (!ownerKey || ownerKey.split(":")[0] === "") return;
	_favoriteOwnerKey = ownerKey;
	if (!isAppCoreReady()) return;
	if (_favoriteHydratePromises.has(ownerKey)) return;
	const promise = (async () => {
		const key = favoriteWbKey(ownerKey);
		const stored = await wb.storage.user.has(FAVORITES_WB_NAMESPACE, key) ? normalizeFavoriteIds(await wb.storage.user.get(FAVORITES_WB_NAMESPACE, key)) : [];
		clearLegacyFavoriteIds();
		if (_favoriteOwnerKey === ownerKey) applyHydratedFavoriteIds(stored);
	})().catch(() => {}).finally(() => {
		_favoriteHydratePromises.delete(ownerKey);
		if (_favoriteOwnerKey === ownerKey && isAppCoreReady()) wb.storage.user.set(FAVORITES_WB_NAMESPACE, favoriteWbKey(ownerKey), myFilesStore.getState().favoriteIds).catch(() => {});
	});
	_favoriteHydratePromises.set(ownerKey, promise);
}
/** 当前收藏归属的账号身份键（面板据此判断收藏是否属于当前账号） */
function getFavoriteOwnerKey() {
	return _favoriteOwnerKey;
}
/**
* 账号 / 身份切换时清空收藏内存态，防止前一账号的收藏泄漏到新账号视图
* （toggleFavorite / showFavoritesOnly 会带出不属于当前空间的 file.id）。
* 清空不写回（ownerKey 已摘除）；随后由面板对新账号身份重新 hydrate。
*/
function resetFavoriteAccountScope() {
	_favoriteOwnerKey = void 0;
	_favoritesDirty = false;
	myFilesStore.getState().setFavoriteIds([]);
}
function useMyFilesStore(selector) {
	return (0, import_zustand.useStore)(myFilesStore, selector);
}
/**
* 工厂函数：创建独立的 myFilesStore 实例。
* 项目盘场景使用，避免和个人盘共享导航状态。
*/
function createMyFilesStore() {
	return createStore((set) => ({
		...initialState,
		setActiveTab: (tab) => set({
			activeTab: tab,
			searchKeyword: "",
			selectedFileIds: /* @__PURE__ */ new Set()
		}),
		setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
		setViewMode: (mode) => set({ viewMode: mode }),
		setFileTypeFilter: (filter) => set({ fileTypeFilter: filter }),
		setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),
		toggleFavorite: (fileId) => set((state) => {
			return { favoriteIds: state.favoriteIds.includes(fileId) ? state.favoriteIds.filter((id) => id !== fileId) : [...state.favoriteIds, fileId] };
		}),
		setFavoriteIds: (ids) => set({ favoriteIds: ids }),
		setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
		setCurrentFolderId: (folderId) => set({ currentFolderId: folderId }),
		navigateToFolder: (folderId, folderName) => set((state) => ({
			currentFolderId: folderId,
			breadcrumbs: [...state.breadcrumbs, {
				id: folderId,
				name: folderName
			}],
			searchKeyword: ""
		})),
		navigateToBreadcrumb: (index) => set((state) => {
			if (index < 0) return {
				currentFolderId: null,
				breadcrumbs: []
			};
			const newBreadcrumbs = state.breadcrumbs.slice(0, index + 1);
			return {
				currentFolderId: newBreadcrumbs[newBreadcrumbs.length - 1]?.id ?? null,
				breadcrumbs: newBreadcrumbs
			};
		}),
		setCloudFileCount: (count) => set({ cloudFileCount: count }),
		setStorageCapacity: (cap) => set({ storageCapacity: cap }),
		toggleFileSelected: (fileId) => set((state) => {
			const next = new Set(state.selectedFileIds);
			if (next.has(fileId)) next.delete(fileId);
			else next.add(fileId);
			return { selectedFileIds: next };
		}),
		clearFileSelected: () => set({ selectedFileIds: /* @__PURE__ */ new Set() }),
		registerFiles: (files) => set((state) => {
			const next = mergeFileRegistry(state.fileRegistry, files);
			return next ? { fileRegistry: next } : state;
		}),
		setPendingCloudFileView: (info) => set({ pendingCloudFileView: info }),
		triggerCloudFilesRefresh: () => set((state) => ({ cloudFilesRefreshToken: state.cloudFilesRefreshToken + 1 })),
		triggerTaskArtifactsRefresh: () => set((state) => ({ taskArtifactsRefreshToken: state.taskArtifactsRefreshToken + 1 })),
		triggerCapacityRefresh: () => set((state) => ({ capacityRefreshToken: state.capacityRefreshToken + 1 })),
		reset: () => set((state) => ({
			...initialState,
			favoriteIds: state.favoriteIds
		}))
	}));
}
/**
* 加载存储容量并写入 store。
* - 每次调用都请求接口（无缓存），确保切换账号等场景下数据始终最新
* - 已有 in-flight 请求：复用同一 promise（防止并发重复请求）
* - 失败：默认弹 toast 提示；`options.silent` 为 true 时静默（仅落 storageCapacityError，
*   不弹 toast），供超容弹窗等「文案降级即可、避免双弹窗」的调用方使用
* - 失败后清空 promise，允许下次调用重试
*
* @param targetStore 目标 store 实例（默认全局 myFilesStore，项目盘传独立实例）
*/
function loadStorageCapacity(getClient, targetStore = myFilesStore, options) {
	if (!options?.force) {
		const existing = _capacityPromises.get(targetStore);
		if (existing) return existing;
	}
	const promise = (async () => {
		try {
			const cap = await getClient().dir.spaceCapacity();
			targetStore.getState().setStorageCapacity({
				total: cap.total,
				used: cap.used,
				composition: cap.composition ?? null
			});
			targetStore.setState({ storageCapacityError: false });
		} catch (err) {
			console.error("[NetDrive] loadCapacity: 失败:", err);
			targetStore.setState({ storageCapacityError: true });
			if (!options?.silent) {
				const msg = err?.message || t("myFiles.error.capacityFailed");
				toast.error(msg);
			}
		}
	})().finally(() => {
		_capacityPromises.delete(targetStore);
	});
	_capacityPromises.set(targetStore, promise);
	return promise;
}
/**
* 预取云端文件根目录的文件数量，写入 store.cloudFileCount。
* - 已有数据（cloudFileCountLoaded）：立即跳过
* - 已有 in-flight 请求：复用同一 promise
* - 失败后静默（不影响 UI，badge 保持 0）
*
* 当 FileListView 真正挂载后会用精确数据覆写 cloudFileCount，
* 这里只是为了在未切换 tab 时提前给出一个大致数量。
*/
function loadCloudFileCount(getClient) {
	if (myFilesStore.getState().cloudFileCountLoaded) return Promise.resolve();
	if (_countPromise) return _countPromise;
	_countPromise = (async () => {
		if (myFilesStore.getState().cloudFileCountLoaded) return;
		try {
			const result = await getClient().dir.list({
				parentID: "",
				limit: 20,
				cursor: ""
			});
			if (!myFilesStore.getState().cloudFileCountLoaded) myFilesStore.setState({
				cloudFileCount: result.totalNum ?? result.entries.length,
				cloudFileCountLoaded: true
			});
		} catch (err) {
			console.error("[loadCloudFileCount] 预取文件数量失败:", err);
		}
	})().finally(() => {
		_countPromise = null;
	});
	return _countPromise;
}
var import_zustand, FAVORITES_WB_NAMESPACE, LEGACY_FAVORITE_IDS_STORAGE_KEY, _favoriteOwnerKey, _favoritesDirty, _favoriteHydratePromises, initialState, myFilesStore, _lastPersistedFavoriteIds, _capacityPromises, _countPromise;
var init_store = __esmMin((() => {
	init_src();
	import_zustand = require_zustand();
	init_vanilla();
	init_app_core();
	init_i18n();
	FAVORITES_WB_NAMESPACE = "my-files";
	LEGACY_FAVORITE_IDS_STORAGE_KEY = "myFiles.favoriteIds";
	_favoritesDirty = false;
	_favoriteHydratePromises = /* @__PURE__ */ new Map();
	initialState = {
		activeTab: "taskArtifacts",
		searchKeyword: "",
		viewMode: "list",
		fileTypeFilter: "all",
		showFavoritesOnly: false,
		favoriteIds: [],
		breadcrumbs: [],
		currentFolderId: null,
		cloudFileCount: 0,
		cloudFileCountLoaded: false,
		storageCapacity: null,
		storageCapacityError: false,
		selectedFileIds: /* @__PURE__ */ new Set(),
		fileRegistry: /* @__PURE__ */ new Map(),
		pendingCloudFileView: null,
		cloudFilesRefreshToken: 0,
		taskArtifactsRefreshToken: 0,
		capacityRefreshToken: 0
	};
	myFilesStore = createStore((set) => ({
		...initialState,
		setActiveTab: (tab) => set({
			activeTab: tab,
			searchKeyword: "",
			selectedFileIds: /* @__PURE__ */ new Set()
		}),
		setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
		setViewMode: (mode) => set({ viewMode: mode }),
		setFileTypeFilter: (filter) => set({ fileTypeFilter: filter }),
		setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),
		toggleFavorite: (fileId) => set((state) => {
			return { favoriteIds: state.favoriteIds.includes(fileId) ? state.favoriteIds.filter((id) => id !== fileId) : [...state.favoriteIds, fileId] };
		}),
		setFavoriteIds: (ids) => set({ favoriteIds: ids }),
		setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
		setCurrentFolderId: (folderId) => set({ currentFolderId: folderId }),
		navigateToFolder: (folderId, folderName) => set((state) => ({
			currentFolderId: folderId,
			breadcrumbs: [...state.breadcrumbs, {
				id: folderId,
				name: folderName
			}],
			searchKeyword: ""
		})),
		navigateToBreadcrumb: (index) => set((state) => {
			if (index < 0) return {
				currentFolderId: null,
				breadcrumbs: []
			};
			const newBreadcrumbs = state.breadcrumbs.slice(0, index + 1);
			return {
				currentFolderId: newBreadcrumbs[newBreadcrumbs.length - 1]?.id ?? null,
				breadcrumbs: newBreadcrumbs
			};
		}),
		setCloudFileCount: (count) => set({ cloudFileCount: count }),
		setStorageCapacity: (cap) => set({ storageCapacity: cap }),
		toggleFileSelected: (fileId) => set((state) => {
			const next = new Set(state.selectedFileIds);
			if (next.has(fileId)) next.delete(fileId);
			else next.add(fileId);
			return { selectedFileIds: next };
		}),
		clearFileSelected: () => set({ selectedFileIds: /* @__PURE__ */ new Set() }),
		registerFiles: (files) => set((state) => {
			const next = mergeFileRegistry(state.fileRegistry, files);
			return next ? { fileRegistry: next } : state;
		}),
		setPendingCloudFileView: (info) => set({ pendingCloudFileView: info }),
		triggerCloudFilesRefresh: () => set((state) => ({ cloudFilesRefreshToken: state.cloudFilesRefreshToken + 1 })),
		triggerTaskArtifactsRefresh: () => set((state) => ({ taskArtifactsRefreshToken: state.taskArtifactsRefreshToken + 1 })),
		triggerCapacityRefresh: () => set((state) => ({ capacityRefreshToken: state.capacityRefreshToken + 1 })),
		reset: () => set((state) => ({
			...initialState,
			favoriteIds: state.favoriteIds
		}))
	}));
	_lastPersistedFavoriteIds = myFilesStore.getState().favoriteIds;
	myFilesStore.subscribe((state) => {
		if (state.favoriteIds === _lastPersistedFavoriteIds) return;
		_lastPersistedFavoriteIds = state.favoriteIds;
		_favoritesDirty = true;
		if (!_favoriteOwnerKey || !isAppCoreReady()) return;
		if (_favoriteHydratePromises.has(_favoriteOwnerKey)) return;
		wb.storage.user.set(FAVORITES_WB_NAMESPACE, favoriteWbKey(_favoriteOwnerKey), state.favoriteIds).catch(() => {});
	});
	_capacityPromises = /* @__PURE__ */ new WeakMap();
	_countPromise = null;
}));
//#endregion
export { loadCloudFileCount as a, resetFavoriteAccountScope as c, init_store as i, store_exports as l, getFavoriteOwnerKey as n, loadStorageCapacity as o, hydrateFavoriteIds as r, myFilesStore as s, createMyFilesStore as t, useMyFilesStore as u };
