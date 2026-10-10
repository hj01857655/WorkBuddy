import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ay as init_expert, Kb as useExpertSummon, QE as init_deeplink, d0 as useModuleHost, ft as init_expert_prompt_resolver, iD as emitTaskPrefillIntent, l0 as init_module_host_context, pt as resolveExpertPrompt } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/expert-url-entry/expert-url-entry-coordinator.tsx
/** 读取并消费 URL 上的 expertId（读到即从 URL 清除，避免重复触发）。 */
function consumeExpertIdFromUrl() {
	if (typeof window === "undefined" || !window.location?.search) return null;
	const params = new URLSearchParams(window.location.search);
	const expertId = params.get("expertId")?.trim();
	if (!expertId) return null;
	try {
		params.delete("expertId");
		const query = params.toString();
		const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
		window.history.replaceState(window.history.state, "", nextUrl);
	} catch {}
	return expertId;
}
/** 进程级去重：同一次页面加载只消费一次 URL expertId。 */
function markConsumedOnce() {
	const g = globalThis;
	if (g[CONSUMED_KEY]) return false;
	g[CONSUMED_KEY] = true;
	return true;
}
function ExpertUrlEntryCoordinator() {
	const host = useModuleHost();
	const { summonExpert } = useExpertSummon();
	const hostRef = (0, import_react.useRef)(host);
	hostRef.current = host;
	const summonRef = (0, import_react.useRef)(summonExpert);
	summonRef.current = summonExpert;
	(0, import_react.useEffect)(() => {
		if (!markConsumedOnce()) return;
		const expertId = consumeExpertIdFromUrl();
		if (!expertId) return;
		const run = async () => {
			let prompt = "";
			try {
				prompt = await resolveExpertPrompt(expertId);
			} catch (error) {
				console.warn(`${TAG} resolve prompt for "${expertId}" failed:`, String(error));
			}
			let expertExists = false;
			try {
				const detail = await hostRef.current.wb.experts.get({ expertId });
				const hasText = (v) => !!(v?.zh?.trim() || v?.en?.trim());
				expertExists = !!detail && (hasText(detail.name) || hasText(detail.profession));
			} catch (error) {
				console.warn(`${TAG} expert "${expertId}" not found, skip summon:`, String(error));
			}
			if (expertExists) {
				const preloadedExpert = prompt ? {
					id: expertId,
					defaultInitPrompt: {
						zh: prompt,
						en: prompt
					}
				} : void 0;
				try {
					await summonRef.current(expertId, void 0, preloadedExpert);
				} catch (error) {
					console.warn(`${TAG} summon expert "${expertId}" failed, skip:`, String(error));
				}
				return;
			}
			if (!prompt) return;
			try {
				hostRef.current.navigation.goHome();
			} catch (error) {
				console.warn(`${TAG} navigation.goHome failed:`, String(error));
			}
			await new Promise((resolve) => setTimeout(resolve, 0));
			emitTaskPrefillIntent({ prompt });
		};
		run();
	}, []);
	return null;
}
var import_react, TAG, CONSUMED_KEY;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_module_host_context();
	init_deeplink();
	init_expert();
	init_expert_prompt_resolver();
	TAG = "[ExpertUrlEntry]";
	CONSUMED_KEY = "__wbExpertUrlEntryConsumed";
}))();
export { ExpertUrlEntryCoordinator };
