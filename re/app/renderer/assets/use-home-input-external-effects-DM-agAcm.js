import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { BU as useInputDraftIntentConsumer, D1 as useI18n, Da as resolveQuickModeGateFromStore, E1 as init_useI18n, Ea as init_use_quick_mode_gate, GD as subscribeNewTaskModeIntent, GT as appPublishIntentStore, GU as deepLinkConversationOpen$, HD as clearNewTaskModeIntent, HU as chatInputBlocks$, Jb as useExpertApi, K3 as init_conversations_context, KT as init_app_publish_intent_store, QE as init_deeplink, RU as init_input_intents, U3 as ConversationsContext, UD as init_new_task_mode_intent, VD as applyNewTaskModeIntent, Vm as createAppPublishSkillBlock, WD as readNewTaskModeIntent, Wm as isAppPublishSkillBlock, XU as taskStarterCwd$, _0 as init_log_sink, _Y as useBuddyApplicationScope, _p as init_genie_project, b0 as writeRendererLog, ex as clearNewTaskInputStorage, gY as init_current_buddy_application, lW as replaceInputBlockByUri, lY as resolveAvatarUrl, oY as init_avatar_url, qb as init_use_expert_api, rD as useTaskDeeplinkPrefill, tx as init_new_task_input_reset, zZ as init_http_logger } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Yo as inputBoxRegistry, ao as createPhraseBlock, hr as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { g as composeEmbedHomeBlocks, w as readHomeInputBlocks, x as init_home_page_helpers } from "./branch-switch-error-zqNku5uL.js";
//#region ../../packages/agent-ui/src/modules/home/hooks/use-home-scene-expert-selection.ts
function resolveSceneExpertAvatarUrl(avatar) {
	return typeof avatar === "string" && avatar.trim() ? resolveAvatarUrl(avatar) : "";
}
function readSceneExpertText(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function expertIdentityIds(expert) {
	return [expert.id, expert.marketExpertId].filter((id) => Boolean(id));
}
/** True when `next` is the same logical expert as `current` (market id vs local plugin id). */
function isHomeExpertRefresh(current, next) {
	if (!current?.id) return false;
	const currentIds = new Set(expertIdentityIds(current));
	return expertIdentityIds(next).some((id) => currentIds.has(id));
}
/** 场景专家是默认值；只有空选择或上一位也是场景自动专家时才允许覆盖。 */
function shouldApplySceneExpert(current, previousSceneExpertId, nextSceneExpert) {
	if (!current || isHomeExpertRefresh(current, nextSceneExpert)) return true;
	return previousSceneExpertId !== null && isHomeExpertRefresh(current, { id: previousSceneExpertId });
}
function resolveSceneMarketplace(expert, summoned) {
	const marketplace = summoned?.marketplace ?? expert.marketplace;
	if (marketplace === "my-experts" || marketplace === "custom") return "my-experts";
}
function toSceneExpertSelection(expert, summoned, originApplicationId) {
	const assistantDisplayName = readSceneExpertText(summoned?.assistantDisplayName) ?? expert.assistantDisplayName;
	const assistantProfession = readSceneExpertText(summoned?.assistantProfession) ?? expert.assistantProfession;
	const assistantAvatarUrl = resolveSceneExpertAvatarUrl(summoned?.assistantAvatarUrl) || expert.assistantAvatarUrl;
	return {
		...expert,
		id: summoned?.id || expert.id,
		name: summoned?.name?.trim() || expert.name,
		profession: summoned?.profession?.trim() || expert.profession,
		avatarUrl: resolveSceneExpertAvatarUrl(summoned?.avatarUrl) || expert.avatarUrl,
		prompt: summoned?.prompt?.trim() || expert.prompt,
		defaultInitPrompt: summoned?.defaultInitPrompt?.trim() || expert.defaultInitPrompt,
		pluginName: summoned?.pluginName ?? expert.pluginName,
		updatedAt: summoned?.updatedAt ?? expert.updatedAt,
		version: summoned?.version ?? expert.version,
		expertType: summoned?.expertType ?? expert.expertType,
		agentName: summoned?.agentName ?? expert.agentName,
		localPath: summoned?.localPath ?? expert.localPath,
		marketExpertId: summoned?.marketExpertId ?? expert.marketExpertId ?? expert.id,
		marketplace: resolveSceneMarketplace(expert, summoned),
		source: summoned?.source ?? expert.source,
		pluginRegisteredName: summoned?.pluginName ?? expert.pluginRegisteredName,
		summonedAt: Date.now(),
		suppressDefaultInitPrompt: true,
		...assistantDisplayName ? { assistantDisplayName } : {},
		...assistantProfession ? { assistantProfession } : {},
		...assistantAvatarUrl ? { assistantAvatarUrl } : {},
		...originApplicationId ? { applicationId: originApplicationId } : {}
	};
}
/**
* Selecting a scene capsule applies and pre-summons `scenes[].expert` on Home.
* Does not inject the expert default prompt (scene capsule prompt wins).
*/
function useHomeSceneExpertSelection({ template, selectedExpert, applyExpertSelection, clearPreparedContext }) {
	const { locale } = useI18n();
	const { summonExpert } = useExpertApi();
	const { applicationId, ready: buddyScopeReady } = useBuddyApplicationScope();
	const applyExpertSelectionRef = (0, import_react$1.useRef)(applyExpertSelection);
	const summonExpertRef = (0, import_react$1.useRef)(summonExpert);
	const clearPreparedContextRef = (0, import_react$1.useRef)(clearPreparedContext);
	applyExpertSelectionRef.current = applyExpertSelection;
	summonExpertRef.current = summonExpert;
	clearPreparedContextRef.current = clearPreparedContext;
	const templateRef = (0, import_react$1.useRef)(template);
	templateRef.current = template;
	const selectedExpertRef = (0, import_react$1.useRef)(selectedExpert);
	selectedExpertRef.current = selectedExpert;
	const sceneAutoExpertIdRef = (0, import_react$1.useRef)(null);
	const templateId = template?.id;
	const expertId = template?.expert?.id;
	(0, import_react$1.useEffect)(() => {
		if (templateId === void 0) {
			const sceneAutoExpertId = sceneAutoExpertIdRef.current;
			if (sceneAutoExpertId && selectedExpertRef.current?.id === sceneAutoExpertId) {
				sceneAutoExpertIdRef.current = null;
				applyExpertSelectionRef.current(null, false).catch(() => void 0);
			}
			return;
		}
		clearPreparedContextRef.current?.();
		let cancelled = false;
		const sceneExpert = templateRef.current?.expert;
		if (!expertId || !sceneExpert) {
			const sceneAutoExpertId = sceneAutoExpertIdRef.current;
			if (sceneAutoExpertId && selectedExpertRef.current?.id === sceneAutoExpertId) {
				sceneAutoExpertIdRef.current = null;
				applyExpertSelectionRef.current(null, false).catch(() => void 0);
			}
			return () => {
				cancelled = true;
			};
		}
		const currentExpert = selectedExpertRef.current;
		if (!shouldApplySceneExpert(currentExpert, sceneAutoExpertIdRef.current, sceneExpert)) {
			writeRendererLog("scene-expert-summon", "info", `summon skipped: explicit expert=${currentExpert?.id} app=${applicationId ?? "<none>"} sceneExpert=${expertId}`);
			return () => {
				cancelled = true;
			};
		}
		const optimistic = toSceneExpertSelection(sceneExpert, void 0, applicationId);
		sceneAutoExpertIdRef.current = optimistic.id;
		applyExpertSelectionRef.current(optimistic, false).catch(() => void 0);
		if (!buddyScopeReady || !applicationId) {
			writeRendererLog("scene-expert-summon", "warn", `summon gated: buddyScopeReady=${buddyScopeReady} applicationId=${applicationId ?? "<none>"} expertId=${expertId} (stays deferred until scope ready)`);
			return () => {
				cancelled = true;
			};
		}
		writeRendererLog("scene-expert-summon", "info", `summon pass gate: app=${applicationId} expertId=${expertId} -> calling wb.experts.summon`);
		const detailLocale = String(locale).toLowerCase() === "en" ? "en" : "zh";
		const summonSceneExpert = async () => {
			try {
				const summoned = await summonExpertRef.current({
					expertId,
					marketExpertId: sceneExpert.marketExpertId ?? expertId,
					locale: detailLocale,
					sessionId: "__pending__",
					isIncludeInvisible: true,
					applicationId
				});
				if (cancelled || !summoned?.expert) return;
				const summonedExpert = summoned.expert;
				const bound = toSceneExpertSelection(sceneExpert, summonedExpert, applicationId);
				if (!bound.marketplace && !bound.pluginName?.trim()) {
					console.warn("[Home][SceneExpert] official scene expert missing pluginName; skip rebind");
					return;
				}
				sceneAutoExpertIdRef.current = bound.id;
				await applyExpertSelectionRef.current(bound, false, { skipDependencyWait: true });
			} catch (error) {
				console.warn("[Home][SceneExpert] failed to summon scene expert:", error);
			}
		};
		summonSceneExpert().catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [
		applicationId,
		buddyScopeReady,
		expertId,
		locale,
		templateId
	]);
}
var import_react$1;
var init_use_home_scene_expert_selection = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_log_sink();
	init_use_expert_api();
	init_avatar_url();
	init_current_buddy_application();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/home/utils/home-pending-input.ts
function getHomePendingInputText(blocks) {
	return blocks.filter((block) => block.type === "text" && typeof block.text === "string").map((block) => block.text).join("");
}
var HOME_PENDING_INPUT_URL_PARAM;
var init_home_pending_input = __esmMin((() => {
	HOME_PENDING_INPUT_URL_PARAM = "cb_pending";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/home/utils/home-prepared-context.ts
function mapPreparedContextToHomeInput(context) {
	const expert = context.expert ? { ...context.expert } : null;
	const blocks = [];
	if (context.skill) blocks.push(createPhraseBlock(context.skill.displayText ?? context.skill.name, `skill://${context.skill.name}`, {
		title: `Use skill ${context.skill.name}. `,
		meta: {
			type: "skill",
			mentionType: "skill",
			displayText: context.skill.displayText ?? context.skill.name
		},
		icon: "skill"
	}));
	const prompt = context.prompt ?? (!expert?.suppressDefaultInitPrompt ? expert?.defaultInitPrompt : void 0);
	if (prompt) blocks.push({
		type: "text",
		text: prompt
	});
	return {
		expert,
		blocks
	};
}
var init_home_prepared_context = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/home/components/use-home-input-external-effects.ts
/**
* 清掉目标输入宿主已持久化的内容，避免意图写入的内容随后被旧存档覆盖。
*
* 必须走 Buddy 感知的入口：Buddy 应用下清通用版 draft 既清错了对象，
* 又会误删用户留在通用版的草稿（issue #102242）。
*/
function clearHomeStoredDraft(userId) {
	clearNewTaskInputStorage(userId);
}
function hasNonTextBlock(blocks) {
	return blocks.some((block) => block?.type !== "text");
}
/** 供 home-input 在发送成功（onPromptSent）时标记：预览已随发送转正，守护不再关闭它。 */
function markHomeDeeplinkPreviewSent() {
	homeDeeplinkPreviewSent = true;
}
/**
* App 层守护消费入口：判断「是否需要关闭这个孤立预览」，并一次性消费掉登记状态。
*
* 返回 true 表示调用方应关闭右侧预览（清 pendingPreviewUrl / browserUrl + 关面板）。
* 无论返回什么，登记状态都会被清空——守护是一次性的，避免后续误关。
*/
function consumeHomeDeeplinkPreviewGuard() {
	if (!homeDeeplinkPreviewPending) return false;
	const shouldClose = !homeDeeplinkPreviewSent;
	homeDeeplinkPreviewPending = false;
	homeDeeplinkPreviewSent = false;
	return shouldClose;
}
function resourceLinkUri(block) {
	return block.type === "resource_link" && typeof block.uri === "string" ? block.uri : void 0;
}
function deduplicateResourceLinkUris(blocks, existingBlocks) {
	const knownUris = new Set(existingBlocks.map(resourceLinkUri).filter(Boolean));
	return blocks.filter((block) => {
		const uri = resourceLinkUri(block);
		if (!uri || knownUris.has(uri)) return !uri;
		knownUris.add(uri);
		return true;
	});
}
function appendBlocksAtEnd(existingBlocks, appendedBlocks) {
	if (appendedBlocks.length === 0) return existingBlocks;
	const separatedAppendedBlocks = appendedBlocks.flatMap((block, index) => index === 0 ? [block] : [{
		type: "text",
		text: " "
	}, block]);
	if (existingBlocks.length === 0) return separatedAppendedBlocks;
	return [
		...existingBlocks,
		{
			type: "text",
			text: " "
		},
		...separatedAppendedBlocks
	];
}
function applyDeepLinkBuddySelection(payload, applyEmbedHomeSelection, clearSceneSelection) {
	if (!payload.mode) {
		clearSceneSelection?.();
		return;
	}
	return applyEmbedHomeSelection?.(payload.mode, payload.scene);
}
function useHomeInputExternalEffects({ host, store, isDraftHydrated, buddyInputRestored, template, selectedExpert, markProgrammaticInput, markInjectedInput, skipNextSave, insertBlocks, applyExpertSelection, applyPreparedConnectorIds, onSceneModeChange, clearSceneSelection, applyEmbedHomeSelection, setCwd, setSelectedModelId, applyModelSelection, setModeId, setPermissionMode, quickGateConnectorItems, playbookMetaRef, t }) {
	const quickGateConnectorItemsRef = (0, import_react.useRef)(quickGateConnectorItems);
	quickGateConnectorItemsRef.current = quickGateConnectorItems;
	const conversationsContext = (0, import_react.useContext)(ConversationsContext);
	const openHomePreview = (0, import_react.useCallback)((url, filePath) => {
		if (conversationsContext?.openArtifact) {
			if (filePath) conversationsContext.openArtifact("local-file-preview", { filePath });
			else conversationsContext.openArtifact("preview", { url });
		} else if (!filePath && conversationsContext?.setPendingPreviewUrl) conversationsContext.setPendingPreviewUrl(url);
		homeDeeplinkPreviewPending = true;
		homeDeeplinkPreviewSent = false;
	}, [conversationsContext]);
	const applyPreparedContext = (0, import_react.useCallback)((context) => {
		if (context.targetSessionId) return;
		const { expert, blocks } = mapPreparedContextToHomeInput(context);
		if (blocks.length) {
			markInjectedInput?.();
			store.api.setBlocks(blocks);
		}
		applyExpertSelection(expert).catch(() => void 0);
	}, [
		applyExpertSelection,
		markInjectedInput,
		store
	]);
	(0, import_react.useEffect)(() => {
		const prepared = host.session.getPreparedContext?.();
		if (prepared) applyPreparedContext(prepared);
		return host.session.subscribePreparedContext?.(applyPreparedContext);
	}, [applyPreparedContext, host.session]);
	const handledModeIntentIdRef = (0, import_react.useRef)();
	(0, import_react.useEffect)(() => {
		const applyIfPending = () => {
			const pending = readNewTaskModeIntent();
			if (!pending || handledModeIntentIdRef.current === pending.id) return;
			const gate = resolveQuickModeGateFromStore(store, { connectorItems: quickGateConnectorItemsRef.current });
			handledModeIntentIdRef.current = pending.id;
			if (gate?.kind === "disabled") {
				clearNewTaskModeIntent();
				host.wb.ui?.toast({
					message: t(gate.tooltipKey),
					type: "warning"
				});
				return;
			}
			applyNewTaskModeIntent(pending.intent, {
				setSceneMode: (sceneMode) => onSceneModeChange?.(sceneMode),
				setModeId: (modeId) => {
					store.api.setMode({ id: modeId });
					setModeId(modeId);
				}
			});
		};
		applyIfPending();
		return subscribeNewTaskModeIntent(applyIfPending);
	}, [
		host.wb.ui,
		onSceneModeChange,
		setModeId,
		store,
		t
	]);
	useHomeSceneExpertSelection({
		template,
		selectedExpert,
		applyExpertSelection,
		clearPreparedContext: host.session.clearPreparedContext
	});
	(0, import_react.useEffect)(() => {
		const syncBlocks = () => {
			chatInputBlocks$.next(readHomeInputBlocks(store));
		};
		syncBlocks();
		return store.subscribe(syncBlocks);
	}, [store]);
	const isFirstTaskStarterCwdRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		const subscription = taskStarterCwd$.subscribe((nextCwd) => {
			if (isFirstTaskStarterCwdRef.current) {
				isFirstTaskStarterCwdRef.current = false;
				if (!nextCwd) return;
			}
			if (typeof nextCwd === "string") setCwd(nextCwd);
		});
		return () => subscription.unsubscribe();
	}, [setCwd]);
	const inputIntentTarget = (0, import_react.useMemo)(() => ({ type: "home" }), []);
	const inputIntentPort = (0, import_react.useMemo)(() => ({
		applyPreparedInput: async (input) => {
			const connectorIds = input.selections?.connectorIds ?? [];
			if (connectorIds.length > 0) {
				if (!applyPreparedConnectorIds) throw new Error("Home connector input provider is not ready");
				await applyPreparedConnectorIds(connectorIds);
			}
			const preparedExpert = input.selections?.expert;
			if (preparedExpert) {
				host.session.clearPreparedContext?.();
				applyExpertSelection({ ...preparedExpert }, false).catch(() => void 0);
			}
			markInjectedInput?.();
			if (input.preserveBlocks) {
				if (input.blocks.length > 0) store.api.setBlocks(input.blocks);
				store.api.focus();
				return;
			}
			skipNextSave();
			clearHomeStoredDraft(host.accountInfo?.userId);
			if (preparedExpert) {
				if (input.blocks.length > 0 && !hasNonTextBlock(readHomeInputBlocks(store))) store.api.applyPrefill(input.blocks);
			} else store.api.setBlocks(input.blocks);
			store.api.focus();
		},
		setBlocks: (blocks, options) => {
			writeRendererLog("input-draft-intent", "info", `home-set-blocks ${JSON.stringify({
				token: options?.diagnosticToken,
				ageMs: options?.diagnosticCreatedAt === void 0 ? void 0 : Date.now() - options.diagnosticCreatedAt,
				blockCount: blocks.length,
				blockTypes: [...new Set(blocks.map((block) => block.type))],
				clearStoredDraft: !!options?.clearStoredDraft,
				existingBlockCount: readHomeInputBlocks(store).length
			})}`);
			markInjectedInput?.();
			skipNextSave();
			if (options?.clearStoredDraft) clearHomeStoredDraft(host.accountInfo?.userId);
			if (playbookMetaRef && options?.playbookMeta) playbookMetaRef.current = options.playbookMeta;
			store.api.setBlocks(blocks);
			store.api.focus();
		},
		insertBlocks: (blocks, options) => {
			markInjectedInput?.();
			markProgrammaticInput?.();
			if (playbookMetaRef && options?.playbookMeta) playbookMetaRef.current = options.playbookMeta;
			const nextBlocks = options?.deduplicateResourceLinkUris ? deduplicateResourceLinkUris(blocks, readHomeInputBlocks(store)) : blocks;
			if (options?.position === "end") store.api.setBlocks(appendBlocksAtEnd(readHomeInputBlocks(store), nextBlocks));
			else if (nextBlocks.length > 0) {
				skipNextSave();
				insertBlocks(nextBlocks);
			}
			if (options?.focus ?? true) store.api.focus();
		},
		replaceBlock: (uri, replacement) => {
			const currentBlocks = readHomeInputBlocks(store);
			const nextBlocks = replaceInputBlockByUri(currentBlocks, uri, replacement);
			if (nextBlocks !== currentBlocks) {
				markProgrammaticInput?.();
				skipNextSave();
				store.api.setBlocks(nextBlocks);
			}
		},
		send: (blocks) => {
			if (blocks) {
				markProgrammaticInput?.();
				skipNextSave();
				store.api.setBlocks(blocks);
			}
			setTimeout(() => {
				store.api.send().catch(() => void 0);
			}, 0);
		},
		openPreview: openHomePreview,
		setModel: (modelId) => setSelectedModelId(modelId),
		setMode: (mode) => {
			if (mode === "craft" || mode === "plan" || mode === "ask" || mode === "quick") setModeId(mode);
		},
		setPermissionMode: (mode) => setPermissionMode(mode === "fullAccess" ? "full-access" : "default-sandbox")
	}), [
		applyExpertSelection,
		applyPreparedConnectorIds,
		host.accountInfo?.userId,
		host.session,
		insertBlocks,
		markInjectedInput,
		markProgrammaticInput,
		openHomePreview,
		playbookMetaRef,
		skipNextSave,
		setModeId,
		setPermissionMode,
		setSelectedModelId,
		store
	]);
	const canConsumeInputIntent = (0, import_react.useCallback)((intent) => {
		if (!isDraftHydrated || !buddyInputRestored) return false;
		if (intent.kind !== "prepare-input" || !intent.input.selections?.connectorIds?.length) return true;
		return !!applyPreparedConnectorIds;
	}, [
		applyPreparedConnectorIds,
		buddyInputRestored,
		isDraftHydrated
	]);
	useInputDraftIntentConsumer({
		target: inputIntentTarget,
		port: inputIntentPort,
		canConsume: canConsumeInputIntent
	});
	(0, import_react.useEffect)(() => {
		const consumeAppPublishIntent = () => {
			if (!appPublishIntentStore.getState().pending) return;
			onSceneModeChange?.("code");
			const currentBlocks = readHomeInputBlocks(store);
			if (!currentBlocks.some((block) => isAppPublishSkillBlock(block))) {
				markInjectedInput?.();
				store.api.setBlocks([
					createAppPublishSkillBlock(),
					{
						type: "text",
						text: ` ${t("genieProject.newApp.promptTemplate")}`
					},
					...currentBlocks
				]);
			}
			appPublishIntentStore.getState().setPending(false);
		};
		consumeAppPublishIntent();
		return appPublishIntentStore.subscribe(consumeAppPublishIntent);
	}, [
		markInjectedInput,
		onSceneModeChange,
		store,
		t
	]);
	(0, import_react.useEffect)(() => {
		const subscription = deepLinkConversationOpen$.subscribe((payload) => {
			if (!payload) return;
			const consumeLocally = () => {
				if (inputBoxRegistry.list().some((name) => name.startsWith("conversation:"))) return;
				const blocks = payload.contentBlocks ?? [];
				if (blocks.length) {
					markInjectedInput?.();
					skipNextSave();
					const scene = applyDeepLinkBuddySelection(payload, applyEmbedHomeSelection, clearSceneSelection);
					const nextBlocks = composeEmbedHomeBlocks(blocks, scene);
					store.api.setBlocks(nextBlocks);
					chatInputBlocks$.next(nextBlocks);
				}
				if (payload.sidebarUrl) openHomePreview(payload.sidebarUrl, payload.sidebarFilePath);
				deepLinkConversationOpen$.next(null);
			};
			const taskId = payload.taskId;
			if (taskId) {
				host.wb.conversations.get(taskId).then((conversation) => {
					if (conversation) host.navigation.navigate(`/conversation/${encodeURIComponent(taskId)}`);
					else consumeLocally();
				}).catch(() => consumeLocally());
				return;
			}
			consumeLocally();
		});
		return () => subscription.unsubscribe();
	}, [
		clearSceneSelection,
		applyEmbedHomeSelection,
		host.navigation,
		host.wb.conversations,
		markInjectedInput,
		openHomePreview,
		skipNextSave,
		store
	]);
	(0, import_react.useEffect)(() => {
		if (!host.accountInfo?.userId || !host.adapter?.loadPendingInput) return;
		try {
			const url = new URL(window.location.href);
			const pendingId = url.searchParams.get(HOME_PENDING_INPUT_URL_PARAM);
			if (!pendingId) return;
			url.searchParams.delete(HOME_PENDING_INPUT_URL_PARAM);
			window.history.replaceState(null, "", url.toString());
			host.adapter.loadPendingInput(pendingId).then((content) => {
				if (content) {
					markProgrammaticInput?.();
					store.api.setBlocks([{
						type: "text",
						text: content
					}]);
				}
			}).catch((error) => {
				console.warn("[HomeInput] Failed to restore pending input:", error);
			});
		} catch (error) {
			console.warn("[HomeInput] Failed to read pending input URL:", error);
		}
	}, [
		host.accountInfo?.userId,
		host.adapter,
		markProgrammaticInput,
		store
	]);
	return useTaskDeeplinkPrefill({
		handleModelChange: (modelId) => applyModelSelection(modelId),
		setSelectedChatMode: (mode) => {
			if (mode === "craft" || mode === "plan" || mode === "ask" || mode === "quick") setModeId(mode);
		},
		setSelectedWelcomeMode: (mode) => onSceneModeChange?.(mode),
		applyDeeplinkPermissionMode: (mode) => {
			setPermissionMode(mode === "fullAccess" ? "full-access" : "default-sandbox");
		},
		setInputValue: (blocks) => store.api.setBlocks(blocks),
		publishInputBlocks: (blocks) => chatInputBlocks$.next(blocks),
		skipInputDraftNextSave: skipNextSave,
		markProgrammaticInput: markInjectedInput ?? (() => void 0)
	});
}
var import_react, homeDeeplinkPreviewPending, homeDeeplinkPreviewSent;
var init_use_home_input_external_effects = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_conversations_context();
	init_app_publish_intent_store();
	init_http_logger();
	init_use_quick_mode_gate();
	init_deeplink();
	init_genie_project();
	init_input_intents();
	init_new_task_mode_intent();
	init_use_home_scene_expert_selection();
	init_home_page_helpers();
	init_home_pending_input();
	init_home_prepared_context();
	init_new_task_input_reset();
	homeDeeplinkPreviewPending = false;
	homeDeeplinkPreviewSent = false;
}));
//#endregion
export { HOME_PENDING_INPUT_URL_PARAM as a, init_use_home_scene_expert_selection as c, useHomeInputExternalEffects as i, isHomeExpertRefresh as l, init_use_home_input_external_effects as n, getHomePendingInputText as o, markHomeDeeplinkPreviewSent as r, init_home_pending_input as s, consumeHomeDeeplinkPreviewGuard as t };
