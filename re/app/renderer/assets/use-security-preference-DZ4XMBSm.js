import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { MI as securityAutoInstallPreference, bR as init_synced_preference, jI as init_skills_security_types, kI as ENABLE_SKILL_SECURITY_SCAN_KEY, xR as useSyncedPreference } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-security-preference.ts
function useSecurityPreference(adapter) {
	const [scanEnabled, setScanEnabled] = (0, import_react.useState)(true);
	const [autoInstallNonHighRisk, setAutoInstallNonHighRisk] = useSyncedPreference(securityAutoInstallPreference);
	(0, import_react.useEffect)(() => {
		if (!adapter?.getProductFeatures) return;
		let cancelled = false;
		adapter.getProductFeatures().then((features) => {
			if (!cancelled && features && "SkillSecurityScan" in features) setScanEnabled(features[ENABLE_SKILL_SECURITY_SCAN_KEY] !== false);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter]);
	(0, import_react.useEffect)(() => {
		if (!adapter?.onProductConfigChanged) return;
		return adapter.onProductConfigChanged((params) => {
			if (params.productFeatures && "SkillSecurityScan" in params.productFeatures) setScanEnabled(params.productFeatures[ENABLE_SKILL_SECURITY_SCAN_KEY] !== false);
		});
	}, [adapter]);
	return {
		scanEnabled,
		autoInstallNonHighRisk,
		toggleAutoInstall: (0, import_react.useCallback)((enabled) => setAutoInstallNonHighRisk(enabled), [setAutoInstallNonHighRisk])
	};
}
var import_react;
var init_use_security_preference = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_synced_preference();
	init_skills_security_types();
}));
//#endregion
export { useSecurityPreference as n, init_use_security_preference as t };
