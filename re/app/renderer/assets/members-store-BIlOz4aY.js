import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
//#region ../../packages/agent-ui/src/modules/collab/stores/members-store.ts
function mapMembers(items) {
	return items.map((item) => {
		const uid = item.userId ?? item.id;
		const rawNickname = item.nickname && !UUID_RE.test(item.nickname) ? item.nickname : "";
		const rawName = item.name && !UUID_RE.test(item.name) ? item.name : "";
		return {
			id: uid,
			name: rawNickname || rawName || uid,
			displayName: item.display_name && !UUID_RE.test(item.display_name) ? item.display_name : void 0,
			avatar: item.avatar,
			role: item.role,
			revokedAt: item.revokedAt ?? null
		};
	});
}
function resolveRole(members, uid) {
	if (!uid) return "viewer";
	return members.find((m) => m.id === uid)?.role ?? "viewer";
}
var import_zustand, _facade, _currentUid, _stateVersion, _refreshInFlight, UUID_RE, useMembersStore;
var init_members_store = __esmMin((() => {
	import_zustand = require_zustand();
	_facade = null;
	_stateVersion = 0;
	_refreshInFlight = null;
	UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	useMembersStore = (0, import_zustand.create)((set, get) => ({
		projectId: null,
		members: [],
		loaded: false,
		fetchError: false,
		currentUserRole: "viewer",
		fetch: async (projectId, facade, currentUid) => {
			const version = ++_stateVersion;
			_facade = facade;
			_currentUid = currentUid;
			set({
				projectId,
				loaded: false,
				fetchError: false
			});
			try {
				const result = await facade.listMembers(projectId, { includeRevoked: true });
				if (_stateVersion !== version || get().projectId !== projectId) return;
				const members = mapMembers(result.items ?? []);
				set({
					members,
					loaded: true,
					currentUserRole: resolveRole(members, currentUid),
					fetchError: false
				});
			} catch (err) {
				if (_stateVersion !== version || get().projectId !== projectId) return;
				console.warn("[MembersStore] fetch failed:", err);
				set({
					loaded: false,
					fetchError: true
				});
			}
		},
		refresh: async () => {
			const { projectId } = get();
			if (!projectId || !_facade) return;
			const version = _stateVersion;
			const facade = _facade;
			const currentUid = _currentUid;
			if (_refreshInFlight?.projectId === projectId && _refreshInFlight.version === version) return _refreshInFlight.promise;
			const token = Symbol("members-refresh");
			const request = (async () => {
				try {
					const result = await facade.listMembers(projectId, { includeRevoked: true });
					if (_stateVersion !== version || get().projectId !== projectId) return;
					const members = mapMembers(result.items ?? []);
					set({
						members,
						loaded: true,
						fetchError: false,
						currentUserRole: resolveRole(members, currentUid)
					});
				} catch {} finally {
					if (_refreshInFlight?.token === token) _refreshInFlight = null;
				}
			})();
			_refreshInFlight = {
				projectId,
				version,
				token,
				promise: request
			};
			return request;
		},
		refreshIfActiveProject: async (targetProjectId) => {
			if (get().projectId !== targetProjectId) return;
			await get().refresh();
		},
		syncActiveProjectMembers: (targetProjectId, items) => {
			if (get().projectId !== targetProjectId) return;
			const members = mapMembers(items);
			set({
				members,
				loaded: true,
				fetchError: false,
				currentUserRole: resolveRole(members, _currentUid)
			});
		},
		reset: () => {
			++_stateVersion;
			set({
				projectId: null,
				members: [],
				loaded: false,
				fetchError: false,
				currentUserRole: "viewer"
			});
			_facade = null;
			_currentUid = void 0;
			_refreshInFlight = null;
		}
	}));
}));
//#endregion
export { useMembersStore as n, init_members_store as t };
