import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-qq-bind-session.ts
/**
* Create a QQ bind session that combines RPC + push event subscriptions.
*
* Usage:
*   const startBind = useQQBindSession(adapter, facades.agentIm);
*   const { promise, dispose } = startBind({ targetType, targetId, onQrUpdate, ... });
*/
function useQQBindSession(adapter, agentImFacade) {
	const activeDisposeRef = (0, import_react.useRef)(void 0);
	return (0, import_react.useCallback)((params) => {
		activeDisposeRef.current?.();
		activeDisposeRef.current = void 0;
		if (!adapter || !agentImFacade) return {
			promise: Promise.resolve({
				success: false,
				message: "QQ binding not available"
			}),
			dispose: () => {}
		};
		const { onQrUpdate, onQrExpired, onBindSuccess, onBindFailed, ...rpcParams } = params;
		let disposed = false;
		let unsubQrUpdate;
		let unsubQrExpired;
		let unsubBindSuccess;
		let unsubBindFailed;
		const dispose = () => {
			if (disposed) return;
			disposed = true;
			unsubQrUpdate?.();
			unsubQrExpired?.();
			unsubBindSuccess?.();
			unsubBindFailed?.();
			activeDisposeRef.current = void 0;
			agentImFacade.qqCancelBind({
				targetType: params.targetType,
				targetId: params.targetId
			}).catch(() => {});
		};
		if (onQrUpdate) unsubQrUpdate = adapter.on("agentIm:qqQrUpdate", (event) => {
			const ev = event;
			if (ev?.targetType === params.targetType && ev?.targetId === params.targetId && ev?.qrcodeUrl) onQrUpdate(ev.qrcodeUrl);
		});
		if (onQrExpired) unsubQrExpired = adapter.on("agentIm:qqQrExpired", (event) => {
			const ev = event;
			if (ev?.targetType === params.targetType && ev?.targetId === params.targetId) onQrExpired();
		});
		if (onBindSuccess) unsubBindSuccess = adapter.on("agentIm:qqBindSuccess", (event) => {
			const ev = event;
			if (ev?.targetType === params.targetType && ev?.targetId === params.targetId && ev?.appId) {
				onBindSuccess(ev.appId);
				dispose();
			}
		});
		if (onBindFailed) unsubBindFailed = adapter.on("agentIm:qqBindFailed", (event) => {
			const ev = event;
			if (ev?.targetType === params.targetType && ev?.targetId === params.targetId) {
				onBindFailed(ev.message || "Binding failed", ev.clawError);
				dispose();
			}
		});
		activeDisposeRef.current = dispose;
		return {
			promise: (async () => {
				try {
					const result = await agentImFacade.qqStartBind(rpcParams);
					if (disposed) return {
						...result,
						cancelled: true
					};
					return result;
				} catch (error) {
					if (disposed) return {
						success: false,
						cancelled: true,
						message: "Binding cancelled"
					};
					dispose();
					return {
						success: false,
						message: error instanceof Error ? error.message : String(error)
					};
				}
			})(),
			dispose
		};
	}, [adapter, agentImFacade]);
}
var import_react;
var init_use_qq_bind_session = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
export { useQQBindSession as n, init_use_qq_bind_session as t };
