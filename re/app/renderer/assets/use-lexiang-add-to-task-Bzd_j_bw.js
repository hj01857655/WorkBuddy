import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ad as init_lexiang_content_blocks, BQ as autoEnableKnowledgeAttachmentConnectors, Dd as buildFileBlock, E as init_contexts, J3 as useConversations, NB as useTencentLexiangStore, Od as buildKnowledgeBaseBlock, PG as useRouterContext, RU as init_input_intents, TZ as init_connector, V3 as useAdapter, iW as publishInputDraftIntent, kB as init_store, mG as init_router } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_entry_service, r as resolveFreshLexiangEntryTitle } from "./entry-service-CKVris1X.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/hooks/use-lexiang-add-to-task.ts
function useLexiangAddToTask() {
	const adapter = useAdapter();
	const router = useRouterContext();
	const conversationsContext = useConversations();
	const currentKb = useTencentLexiangStore((s) => s.currentKnowledgeBase);
	const clearSelected = useTencentLexiangStore((s) => s.clearSelected);
	/**
	* 进入真正的新建任务最终态。
	*
	* `handleNewTask` 是权威链路；兜底的 `router.updateUrl({ taskId: null })`
	* 保证未注册 handler 时也能离开 `/library/lexiang`，让侧栏 active 条件成立。
	*/
	const enterNewTaskView = (0, import_react.useCallback)(() => {
		if (conversationsContext?.handleNewTask) conversationsContext.handleNewTask(true);
		else router.updateUrl({ taskId: null }, { replace: true });
	}, [conversationsContext, router]);
	/**
	* 注入 blocks 并切到真正的新建任务最终态。
	*
	* 乐享页本身是 `/library/lexiang` shell-panel 路由；如果只关闭面板不离开该路由，
	* 侧边栏的新建任务 active 会被 `isNonTaskShellRoute('/library/lexiang')` 拦掉。
	* 因此这里统一复用 `handleNewTask(true)`：它会清 taskId/currentConversation/cwd
	* 并把 URL 切回 `/`。输入内容由 home 输入意图投递，意图带 pending 队列，
	* 首页输入宿主挂载后再消费，因此可以先于路由切换发布。
	*/
	const injectAndNavigate = (0, import_react.useCallback)((blocks) => {
		if (blocks.length === 0) return;
		publishInputDraftIntent({
			kind: "insert-blocks",
			target: { type: "home" },
			blocks,
			position: "end",
			deduplicateResourceLinkUris: true
		});
		enterNewTaskView();
		autoEnableKnowledgeAttachmentConnectors(blocks).catch(() => void 0);
	}, [enterNewTaskView]);
	/** 将整个知识库作为 tag 注入新建任务 */
	const addKnowledgeBaseToTask = (0, import_react.useCallback)((_source) => {
		if (!currentKb) return;
		const block = buildKnowledgeBaseBlock(currentKb);
		injectAndNavigate([block]);
		clearSelected();
	}, [
		currentKb,
		injectAndNavigate,
		clearSelected
	]);
	/** 将单个文件作为 tag 注入新建任务 */
	const addFileToTask = (0, import_react.useCallback)((file, source) => {
		const block = buildFileBlock(file, currentKb);
		injectAndNavigate([block]);
		clearSelected();
		const telemetry = SINGLE_FILE_ADD_TELEMETRY[source] ?? SINGLE_FILE_ADD_TELEMETRY.selection_bar;
		try {
			adapter?.reportTelemetry?.("web_element_click", {
				pageName: "lexiang",
				elementId: telemetry?.elementId ?? "",
				elementName: telemetry?.elementName ?? "",
				mode: "lexiang"
			});
		} catch {}
		try {
			adapter?.reportTelemetry?.("web_element_click", {
				pageName: "lexiang",
				elementId: "attach_lexiang_success",
				elementName: "乐享附件添加成功",
				source: file.type ?? "",
				type: file.extension ?? "",
				mode: "lexiang"
			});
		} catch {}
	}, [
		adapter,
		currentKb,
		injectAndNavigate,
		clearSelected
	]);
	return {
		addKnowledgeBaseToTask,
		addFileToTask,
		addFilesToTask: (0, import_react.useCallback)((files, _source) => {
			const blocks = files.map((file) => buildFileBlock(file, currentKb));
			injectAndNavigate(blocks);
			clearSelected();
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					pageName: "lexiang",
					elementId: "lexiang_lib_add_to_task_batch",
					elementName: "批量添加至任务",
					mode: "lexiang"
				});
			} catch {}
			files.forEach((file) => {
				try {
					adapter?.reportTelemetry?.("web_element_click", {
						pageName: "lexiang",
						elementId: "attach_lexiang_success",
						elementName: "乐享附件添加成功",
						source: file.type ?? "",
						type: file.extension ?? "",
						mode: "lexiang"
					});
				} catch {}
			});
		}, [
			adapter,
			currentKb,
			injectAndNavigate,
			clearSelected
		]),
		addPreviewFileToTask: (0, import_react.useCallback)((file, source = "preview_header") => {
			resolveFreshLexiangEntryTitle(file).then((title) => {
				addFileToTask(title === file.title ? file : {
					...file,
					title
				}, source);
			}).catch((err) => {
				console.warn("[lexiang-api] addPreviewFileToTask failed:", err);
				addFileToTask(file, source);
			});
		}, [addFileToTask]),
		addBlocksToTask: injectAndNavigate
	};
}
/**
* 兼容 MainContentCore 挂载标记调用。
*
* 乐享添加任务现在统一依赖 `handleNewTask(true)` + adapter pending 机制，
* 不再依赖本标记；本地文件冷启动等场景仍通过 isMainContentMounted 读取状态。
*/
function markMainContentMounted() {
	mainContentMounted = true;
}
/** 兼容 MainContentCore 卸载标记调用（卸载时由 MainContentCore 调用） */
function markMainContentUnmounted() {
	mainContentMounted = false;
}
var import_react, SINGLE_FILE_ADD_TELEMETRY, mainContentMounted;
var init_use_lexiang_add_to_task = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_connector();
	init_input_intents();
	init_router();
	init_entry_service();
	init_lexiang_content_blocks();
	init_store();
	SINGLE_FILE_ADD_TELEMETRY = {
		spark_icon: {
			elementId: "lexiang_lib_add_to_task_hover",
			elementName: "hover添加至任务"
		},
		preview_header: {
			elementId: "lexiang_lib_add_to_task_preview",
			elementName: "预览页添加至任务"
		},
		create_drawer: {
			elementId: "lexiang_lib_add_to_task_create_drawer",
			elementName: "新建抽屉添加至任务"
		},
		selection_bar: {
			elementId: "lexiang_lib_add_to_task_batch",
			elementName: "批量添加至任务"
		}
	};
}));
//#endregion
export { useLexiangAddToTask as i, markMainContentMounted as n, markMainContentUnmounted as r, init_use_lexiang_add_to_task as t };
