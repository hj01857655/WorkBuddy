import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $k as init_skills, E1 as init_useI18n, J2 as isBrowserEnvironment, K2 as init_environment, MK as useSelectedIndustryTemplate, O1 as useTranslation, PM as isUserInvocableSkill, Q as init_app_providers, _m as init_use_skill_upload_policy, aA as getLocalizedImportSkillError, et as useAgentServices, jx as init_industry, oA as init_skill_import_errors$1, sA as showImportSkillError, vm as useSkillUploadPolicy } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Lc as createPhraseBlock, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/chat-skill-selector/skill-import-errors.ts
var init_skill_import_errors = __esmMin((() => {
	init_skill_import_errors$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-skill-selector/use-skill-selector.ts
function useSkillSelector(cwd, options) {
	const t = useTranslation();
	const personalSkills = useAgentServices()?.personalSkills;
	if (!personalSkills) throw new Error("[useSkillSelector] personalSkills facade is not available");
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [searchKeyword, setSearchKeyword] = (0, import_react.useState)("");
	const { policy: uploadPolicy, refresh: refreshUploadPolicy } = useSkillUploadPolicy();
	const cwdRef = (0, import_react.useRef)(cwd);
	cwdRef.current = cwd;
	const useCloud = options?.useCloud ?? false;
	const projectId = options?.projectId;
	const buddyApplicationId = useSelectedIndustryTemplate()?.applicationId;
	const fetchSkills = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const params = {
				cwd: cwdRef.current || "",
				global: false,
				projectId: projectId || void 0,
				applicationId: buddyApplicationId || void 0
			};
			const results = ((useCloud && personalSkills.listCloud ? await personalSkills.listCloud(params) : await personalSkills.list(params)).results || []).filter(isUserInvocableSkill);
			setSkills(results);
		} catch (error) {
			console.error("[useSkillSelector] Failed to fetch skills:", error);
		} finally {
			setLoading(false);
		}
	}, [
		personalSkills,
		useCloud,
		projectId,
		buddyApplicationId
	]);
	const sourceFilteredSkills = cwdRef.current ? skills.filter((skill) => skill.source !== "connector") : skills.filter((skill) => [
		"userSettings",
		"builtin",
		"plugin"
	].includes(skill.source));
	const sortByInstalledAt = (list) => [...list].sort((a, b) => (b.installedAt ?? 0) - (a.installedAt ?? 0));
	const filteredSkills = sortByInstalledAt(searchKeyword ? sourceFilteredSkills.filter((skill) => skill.name.toLowerCase().includes(searchKeyword.toLowerCase()) || skill.description?.toLowerCase().includes(searchKeyword.toLowerCase())) : sourceFilteredSkills);
	const selectSkill = (0, import_react.useCallback)((skill) => createPhraseBlock(skill.name, `skill://${skill.name}`, {
		title: `Use skill ${skill.name}. `,
		description: skill.description,
		meta: {
			type: "skill",
			mentionType: "skill",
			displayText: skill.name
		},
		icon: "skill"
	}), []);
	const importSkill = (0, import_react.useCallback)(async (source) => {
		try {
			const oldSkillPaths = new Set(skills.map((s) => s.filePath));
			const result = await personalSkills.importFromPath({
				source,
				cwd: cwdRef.current
			});
			if (result.success) {
				const newSkills = ((await personalSkills.list({ cwd: cwdRef.current }))?.results || []).filter(isUserInvocableSkill);
				setSkills(newSkills);
				return newSkills.find((s) => !oldSkillPaths.has(s.filePath)) || null;
			}
			showImportSkillError(result.error);
			return null;
		} catch (error) {
			console.error("[useSkillSelector] Failed to import skill:", error);
			showImportSkillError(error instanceof Error ? error.message : void 0);
			return null;
		}
	}, [personalSkills, skills]);
	const canUpload = isBrowserEnvironment() && typeof personalSkills?.uploadCustomSkill === "function" && typeof personalSkills?.getCustomSkill === "function";
	const [uploading, setUploading] = (0, import_react.useState)(false);
	return {
		loading,
		searchKeyword,
		setSearchKeyword,
		filteredSkills,
		selectSkill,
		importSkill,
		uploadSkill: (0, import_react.useCallback)(async (file) => {
			if (!canUpload) return;
			setUploading(true);
			try {
				const { item: uploaded } = await personalSkills.uploadCustomSkill({ file });
				const fallbackName = file.name.replace(/\.(zip|tar\.gz|tgz|skill)$/i, "");
				let status = uploaded.status;
				let checkError = uploaded.checkError;
				let displayName = fallbackName;
				if (status === "checking") for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt += 1) {
					await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
					const { item } = await personalSkills.getCustomSkill(uploaded.skillUid);
					status = item.status;
					checkError = item.checkError;
					displayName = item.title || item.name || fallbackName;
					if (status && status !== "checking") break;
				}
				if (status === "ready") {
					toast.success(t("skill.uploadSuccess", { name: displayName }));
					await fetchSkills();
					return;
				}
				if (status === "invalid") {
					toast.error(t("skill.uploadFailed.invalid", { reason: checkError || t("skill.uploadFailed.invalidReason") }));
					return;
				}
				if (status === "failed") {
					toast.error(t("skill.uploadFailed.cosError"));
					return;
				}
				toast.error(t("skill.uploadFailed.timeout"));
			} catch (err) {
				console.warn("[useSkillSelector] uploadSkill failed:", err);
				const reason = err instanceof Error ? err.message : void 0;
				toast.error(getLocalizedImportSkillError(reason));
			} finally {
				setUploading(false);
			}
		}, [
			canUpload,
			personalSkills,
			fetchSkills,
			t
		]),
		uploading,
		canUpload,
		refreshSkills: fetchSkills,
		uploadPolicy,
		refreshUploadPolicy
	};
}
var import_react, POLL_INTERVAL_MS, POLL_MAX_ATTEMPTS;
var init_use_skill_selector = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_industry();
	init_skills();
	init_app_providers();
	init_use_skill_upload_policy();
	init_environment();
	init_skill_import_errors();
	POLL_INTERVAL_MS = 2e3;
	POLL_MAX_ATTEMPTS = 150;
}));
//#endregion
export { useSkillSelector as n, init_use_skill_selector as t };
