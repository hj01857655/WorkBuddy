import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { $k as init_skills, C3 as useLocation, E as init_contexts, E1 as init_useI18n, J3 as useConversations, O1 as useTranslation, TD as readOfficeReturnIntent, YU as newSkillCreated$, _0 as init_log_sink, _O as init_task_starter_store, ad as init_common, d0 as useModuleHost, mG as init_router, tA as buildNewSkillCreatedBlocks, wD as init_office_return_intent, x0 as writeRendererLogFileOnly } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/agent-ui/src/modules/skill-market/hooks/use-try-skill.ts
/**
* 创建新任务并注入 Skill 上下文（UI 层）。
*/
function useTrySkill() {
	const { handleNewTask } = useConversations();
	const host = useModuleHost();
	const location = useLocation();
	const t = useTranslation();
	const trySkill = (skillName, examples, displayText, skillId) => {
		const payload = {
			skillName,
			exampleText: examples && examples.length > 0 ? examples[0] : void 0,
			displayText,
			skillId
		};
		const officeReturn = readOfficeReturnIntent(location.state);
		writeRendererLogFileOnly(OFFICE_RETURN_LOG_SCOPE, "info", `try-skill ${JSON.stringify({
			branch: officeReturn && host.officeInputReturn ? "office" : "main",
			hasOfficeReturn: Boolean(officeReturn),
			hasOfficeInputReturn: Boolean(host.officeInputReturn)
		})}`);
		if (officeReturn && host.officeInputReturn) {
			host.officeInputReturn.send({
				returnWindowId: officeReturn.returnWindowId,
				conversationId: officeReturn.returnConversationId,
				contentBlocks: buildNewSkillCreatedBlocks(payload)
			}).catch(() => {
				host.wb.ui?.toast({
					message: t("office.chat.returnFailed"),
					type: "error"
				});
				writeRendererLogFileOnly(OFFICE_RETURN_LOG_SCOPE, "warn", "try-skill office-delivery-failed");
			});
			return;
		}
		handleNewTask?.(true);
		newSkillCreated$.next(payload);
	};
	return trySkill;
}
var OFFICE_RETURN_LOG_SCOPE;
var init_use_try_skill = __esmMin((() => {
	init_task_starter_store();
	init_contexts();
	init_useI18n();
	init_office_return_intent();
	init_router();
	init_log_sink();
	init_common();
	init_skills();
	OFFICE_RETURN_LOG_SCOPE = "office-return";
}));
//#endregion
export { useTrySkill as n, init_use_try_skill as t };
