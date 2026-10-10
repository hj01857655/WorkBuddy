import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as useTranslation } from "./useTranslation-DoKXWcey.js";
import { o as getDaemonClient } from "./local-docs-facade-Cr4Rvoow.js";
//#region ../../packages/workbuddy-app/src/components/connector-runtime-toast/index.tsx
init_src();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ProgressStore = class {
	constructor() {
		this.state = {
			phase: "connector-prepare",
			status: "progress"
		};
		this.listeners = /* @__PURE__ */ new Set();
	}
	subscribe(listener) {
		this.listeners.add(listener);
		listener(this.state);
		return () => this.listeners.delete(listener);
	}
	set(next) {
		this.state = next;
		this.listeners.forEach((l) => l(this.state));
	}
	current() {
		return this.state;
	}
};
/**
* Toast 内部展示组件。挂载时订阅 store，收到更新时只变 state 不重建 DOM。
*/
function ProgressToastBody({ store }) {
	const { t } = useTranslation();
	const [state, setState] = (0, import_react.useState)(store.current());
	(0, import_react.useEffect)(() => store.subscribe(setState), [store]);
	const isInstallPhase = state.phase === "connector-install";
	if (state.status === "progress" && isInstallPhase) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { fontWeight: 500 },
		children: t("connectors:runtime.installing")
	});
	if (state.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { fontWeight: 500 },
		children: t(isInstallPhase ? "connectors:runtime.installFailed" : "connectors:runtime.prepareFailed")
	});
	let title;
	if (state.progress != null) title = t("connectors:runtime.preparingWithProgress", { percent: state.progress });
	else title = t("connectors:runtime.preparing");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { fontWeight: 500 },
		children: title
	});
}
/**
* 订阅器组件。挂载到 App 根节点即可，无 UI 输出。
*/
function ConnectorRuntimeToastSubscriber() {
	(0, import_react.useEffect)(() => {
		let api;
		try {
			api = getDaemonClient().onBinaryInstallProgress;
		} catch {
			api = void 0;
		}
		if (!api) return;
		const operations = /* @__PURE__ */ new Map();
		const completedRuntimeOperations = /* @__PURE__ */ new Set();
		const openToast = (operationId, initial) => {
			const store = new ProgressStore();
			store.set(initial);
			const isError = initial.status === "error";
			const entry = {
				store,
				toastHandle: toast({
					message: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressToastBody, { store }),
					type: isError ? "error" : "loading",
					duration: isError ? 5e3 : 0,
					showClose: !isError
				})
			};
			operations.set(operationId, entry);
			return entry;
		};
		const closeToast = (operationId, delayMs = 0) => {
			const entry = operations.get(operationId);
			if (!entry) return;
			operations.delete(operationId);
			if (delayMs > 0) setTimeout(() => entry.toastHandle.close(), delayMs);
			else entry.toastHandle.close();
		};
		const unsubscribe = api((payload) => {
			const { operationId } = payload;
			if (!operationId) return;
			if (payload.status === "progress") {
				if (payload.phase === "connector-prepare" && completedRuntimeOperations.has(operationId)) return;
				const next = {
					phase: payload.phase,
					status: "progress",
					progress: payload.progress
				};
				const existing = operations.get(operationId);
				if (!existing) openToast(operationId, next);
				else existing.store.set(next);
				return;
			}
			if (payload.status === "complete") {
				if (payload.phase === "connector-prepare") completedRuntimeOperations.add(operationId);
				closeToast(operationId, 300);
				return;
			}
			if (payload.status === "error") {
				completedRuntimeOperations.delete(operationId);
				const errState = {
					phase: payload.phase,
					status: "error"
				};
				if (!operations.get(operationId)) openToast(operationId, errState);
				else {
					closeToast(operationId);
					openToast(operationId, errState);
				}
			}
		});
		return () => {
			unsubscribe();
			for (const [id] of operations) closeToast(id);
		};
	}, []);
	return null;
}
//#endregion
export { ConnectorRuntimeToastSubscriber };
