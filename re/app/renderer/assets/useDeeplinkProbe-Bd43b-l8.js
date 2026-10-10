import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/share-preview/components/useDeeplinkProbe.ts
function useDeeplinkProbe(opts) {
	const optsRef = (0, import_react.useRef)(opts);
	optsRef.current = opts;
	const inflightCleanupRef = (0, import_react.useRef)(null);
	const [isProbing, setIsProbing] = (0, import_react.useState)(false);
	const isMountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => () => {
		isMountedRef.current = false;
		inflightCleanupRef.current?.();
	}, []);
	return {
		trigger: (0, import_react.useCallback)(() => {
			if (inflightCleanupRef.current) inflightCleanupRef.current();
			const { deeplink, downloadUrl, timeoutMs, gracePeriodMs = DEFAULT_GRACE_PERIOD_MS, navigate = defaultNavigate, openFallback = defaultOpenFallback } = optsRef.current;
			let resolved = false;
			let graceTimer;
			let gracePollInterval;
			const cleanup = () => {
				if (resolved) return;
				resolved = true;
				document.removeEventListener("visibilitychange", onSignal);
				window.removeEventListener("blur", onSignal);
				window.removeEventListener("pagehide", onSignal);
				window.removeEventListener("focus", onFocus);
				window.clearTimeout(timer);
				window.clearTimeout(graceTimer);
				window.clearInterval(gracePollInterval);
				inflightCleanupRef.current = null;
				setIsProbing(false);
			};
			const onSignal = () => {
				cleanup();
			};
			const onFocus = () => {
				cleanup();
			};
			const onTimeout = () => {
				if (typeof document !== "undefined" && document.visibilityState === "hidden") {
					cleanup();
					return;
				}
				if (typeof document !== "undefined" && !document.hasFocus()) {
					cleanup();
					return;
				}
				const onGraceEnd = () => {
					cleanup();
					openFallback(downloadUrl);
				};
				graceTimer = window.setTimeout(onGraceEnd, gracePeriodMs);
				gracePollInterval = window.setInterval(() => {
					if (typeof document !== "undefined") {
						if (!document.hasFocus() || document.visibilityState === "hidden") cleanup();
					}
				}, 200);
			};
			document.addEventListener("visibilitychange", onSignal, { once: true });
			window.addEventListener("blur", onSignal, { once: true });
			window.addEventListener("pagehide", onSignal, { once: true });
			window.addEventListener("focus", onFocus, { once: true });
			const timer = window.setTimeout(onTimeout, timeoutMs);
			inflightCleanupRef.current = cleanup;
			setIsProbing(true);
			navigate(deeplink);
		}, []),
		isProbing
	};
}
var import_react, defaultNavigate, defaultOpenFallback, DEFAULT_GRACE_PERIOD_MS;
var init_useDeeplinkProbe = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	defaultNavigate = (deeplink) => {
		window.location.href = deeplink;
	};
	defaultOpenFallback = (downloadUrl) => {
		window.location.href = downloadUrl;
	};
	DEFAULT_GRACE_PERIOD_MS = 2e3;
}));
//#endregion
export { useDeeplinkProbe as n, init_useDeeplinkProbe as t };
