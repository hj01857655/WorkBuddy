import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, $g as WbAddPlusIcon, $h as extractDirFromPath, A9 as WbLexiangIcon, AZ as inferConnectorKind, Af as init_cloud_skill_upload_operation, Ag as WbSearchHighlight, Ay as init_expert, Bg as CheckIcon, CY as init_industry_store, CZ as claimConnectorEntryShow, Cf as init_use_skill_cloud_selection_controller, Cp as useSkillUploadModal, Df as createLocalSkillDownloadThenUseOperation, E as init_contexts, E1 as init_useI18n, Em as SkillAvatar, F$ as init_constants, FH as init_WbCloudIcon, Ff as createSkillPreferenceScopeKey, G$ as isConnectorConnected, Gd as init_skill_cloud_feature, Gf as init_fullstack_website_skill_gate, Gg as JumpIcon, Hf as init_skill_identity, Hg as ConnectingSpinnerIcon, I1 as t, If as getSkillPreferenceCoordinator, Ig as WbSearchInput, J$ as isConnectorPending, J3 as useConversations, Jg as ReferenceFilesIcon, K$ as isConnectorEnabled, K2 as init_environment, Kd as logSkillCloudSyncDebug, Kg as ModeIcon, Lf as init_skill_preference_coordinator, M9 as WbImaIcon, MK as useSelectedIndustryTemplate, Mf as publishLocalSkillPreferenceChanged, Mg as WbSearchEmpty, Nf as subscribeLocalSkillPreferenceChanged, O$ as CONNECTOR_NO_AUTH, O1 as useTranslation, Of as init_local_skill_download_operation, Om as init_SkillAvatar, P9 as WbDocsQqIcon, PH as WbCloudIcon, Pf as SkillPreferenceCoordinator, Pg as WbSearchDivider, Qg as UploadIcon, Qh as convertToContentBlock, R1 as toZhEnLocale, Rf as createSkillPreferenceStorage, Rg as AddFilesIcon, T0 as init_app_core, TY as useIndustryStore, TZ as init_connector, U$ as init_connector_display, Uf as resolveSkillPreferenceId, Ug as ConnectorsIcon, Vg as ChevronRightIcon, W$ as isConnectorBound, WX as useCloudSkillSyncFeature, Wf as filterFullstackWebsiteSkills, Wg as ExpertsIcon, XG as init_use_floating_layer, Xb as init_expert_api, Xf as init_use_delayed_visible, Xg as SkillsIcon, Y$ as toConnectorRowView, YG as CONNECTOR_AUTH_FLOATING_LAYER, Yb as createExpertApi, Yg as SettingsIcon, ZG as useFloatingLayer, Zf as useDelayedVisible, Zg as UnpinIcon, Zh as convertFilesToSuggestions, _Y as useBuddyApplicationScope, __ as recordRecentUse, _m as init_use_skill_upload_policy, _p as init_genie_project, aQ as useVisibleMcpConnectors, a_ as WbSearchBody, ad as init_common, bL as init_high_risk_notification_store, bi as init_use_stop_generation_shortcut$1, bp as init_components, c$ as init_store, c_ as wb_search_panel_module_default, ck as init_genie_embed, d0 as useModuleHost, dQ as isConnectorVersionIncompatible, dY as init_buddy_app_default_experts, d_ as init_filter_personal_skills_by_cwd, dz as init_use_product_feature, e4 as isWorkBuddyDesktop, e_ as WbUpdateIcon, eg as init_mention_converters, f3 as wb, fY as init_expert_list_pagination, f_ as filterPersonalSkillsByCwd, fk as GENIE_BUTTON, fz as useProductFeature, gY as init_current_buddy_application, g_ as readRecentlyUsed, h7 as init_floating, hY as getCurrentBuddyApplication, h_ as readPinned, hm as PersonalSkillImportModal, i7 as Tooltip, iH as HelpCircleIcon, im as init_use_installed_skills, j1 as init_i18n, jK as useSelectedIndustryResourceSnapshotKey, jY as init_product_features, jf as init_skill_preference_cross_window_sync, jrt as Avatar, jx as init_industry, k1 as getLocale, kK as init_hooks, kf as createCloudSkillUploadThenUseOperation, kg as init_wb_search_panel, kp as openSkillCloudUploadFlow, lY as resolveAvatarUrl, m5 as init_src, m9 as WbFileFolderIcon, mY as shouldStopExpertListPagination, m_ as init_skill_sort_utils, nQ as useCancellableConnecting, n_ as init_icons$1, o$ as connectorStore, oY as init_avatar_url$1, p$ as useConnectorStore, pY as normalizeExpertListTotal, pk as GENIE_EMBED_EVENT, q$ as isConnectorItemOn, qg as PinIcon, rQ as init_use_visible_mcp_connectors, rY as getRecentExpertsScopeKey, r_ as WbSearchPanel, rm as buildPolicyDeniedMessage, sQ as getConnectorVersionIncompatibilityLabel, sd as init_design_options, sm as usePersonalSkillImport, tQ as init_use_cancellable_connecting, t_ as WbUploadIcon, u0 as useFacade, uH as FigmaIcon, uQ as init_utils, uY as fetchBuddyAppDefaultExperts, uk as useGenieEmbedTelemetry, v7 as floatingAutoUpdateWithAnimationFrame, vH as CnbIcon, v_ as writePinned, vm as useSkillUploadPolicy, vp as GeniePluginSubmenu, w3 as useNavigate, wZ as init_entry_show_rate_limit, wf as useSkillCloudSelectionController, wq as useAgentTelemetry, x7 as useFloating, xL as notifySkillListRefresh, xq as init_telemetry, y3 as init_dist, zf as init_skill_preference_storage, zg as ApplicationIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ai as useFloatingRef, Ba as Tooltip$1, Bs as getExpertGradient, Cp as flip, Dp as offset, Ei as toast, Ev as require_react, Kh as require_react_dom, Lc as createPhraseBlock, Nc as createContextBlock, Op as shift, Tv as require_jsx_runtime, Vs as getExpertInitial, jp as autoUpdate, kp as size, ls as useClick, ms as useInteractions, qh as require_classnames, t as init_src$1, us as useDismiss } from "./lib-chat-ui-D8Ji0f8n.js";
import { Mt as createStore, Nt as init_vanilla, Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
import { a as variantFromFilename, i as init_file_type, r as getFileTypeIcon } from "./codebuddy-icon-provider-BgrOq92k.js";
import { n as init_context } from "./context-BN2Z33cf.js";
import { n as useConnectorActions, t as init_use_connector_actions } from "./use-connector-actions-cuKdFVYS.js";
//#region ../../packages/agent-ui/src/components/main-content-core/use-stop-generation-shortcut.ts
var init_use_stop_generation_shortcut = __esmMin((() => {
	init_use_stop_generation_shortcut$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/widget-image-resolver.ts
/**
* 把 widget_code 里的图片 src 归一为本地绝对路径。
* - 已是 http(s)/data/blob/local-file:// 的返回 undefined（非本地，不处理）；
* - file:// 剥前缀 + URL 解码；
* - Unix 绝对路径 / Windows 盘符路径原样返回；
* - 相对路径基于 cwd 解析（无 cwd 返回 undefined）。
*
* 与产物预览 `ArtifactContentRenderer` 的路径归一逻辑保持一致。
*/
function toAbsoluteLocalPath(src, cwd) {
	if (!src) return;
	const normalizedSrc = src.replace(/\\/g, "/").trim();
	if (!normalizedSrc) return;
	if (/^(https?:\/\/|data:|blob:|local-file:\/\/)/i.test(normalizedSrc)) return;
	if (/^file:\/\//i.test(normalizedSrc)) try {
		return decodeURIComponent(normalizedSrc.replace(/^file:\/\//i, ""));
	} catch {
		return normalizedSrc.replace(/^file:\/\//i, "");
	}
	if (/^\//.test(normalizedSrc) || /^[a-zA-Z]:\//.test(normalizedSrc)) return normalizedSrc;
	const cwdNormalized = cwd?.replace(/\\/g, "/").replace(/\/$/, "");
	if (!cwdNormalized) return;
	const cleanPath = normalizedSrc.replace(/^\.\//, "");
	const resultParts = cwdNormalized.split("/").filter(Boolean);
	for (const part of cleanPath.split("/")) if (part === "..") resultParts.pop();
	else if (part !== "." && part !== "") resultParts.push(part);
	return `/${resultParts.join("/")}`;
}
/** 把本地绝对路径拼成 Desktop 注册的 local-file:// URL（与产物预览、image-gen 适配器一致）。 */
function toLocalFileUrl(absolutePath) {
	return `local-file://${absolutePath}`;
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("FileReader failed"));
		reader.readAsDataURL(blob);
	});
}
/**
* 构造 widget 图片 resolver。
* - Desktop：提供 `resolveLocalImageUrl`（local-file 快路径）；
* - 有 `readFileAsBlob`（两端通用）：提供 `resolveLocalImageDataUrl`（data URL 兜底）。
*/
function buildWidgetImageResolver(deps) {
	const { isDesktop, getCwd, readFileAsBlob } = deps;
	return {
		resolveLocalImageUrl: isDesktop ? (src) => {
			const abs = toAbsoluteLocalPath(src, getCwd?.());
			return abs ? toLocalFileUrl(abs) : void 0;
		} : void 0,
		resolveLocalImageDataUrl: readFileAsBlob ? async (src) => {
			const abs = toAbsoluteLocalPath(src, getCwd?.());
			if (!abs) return;
			try {
				const blob = await readFileAsBlob(abs);
				if (!blob || blob.size === 0) return;
				return await blobToDataUrl(blob);
			} catch (error) {
				console.warn("[widgetImageResolver] read local image failed.", {
					src,
					error
				});
				return;
			}
		} : void 0
	};
}
var init_widget_image_resolver = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/utils/skill-list-core.ts
/**
* 按 locale 解析技能展示名，同时保留 `skill.name` 作为实际调用名。
*
* 英文环境下部分内置 Skill 的 name 是中文；此时优先使用英文展示名，随后选择
* 不含汉字的通用展示名 / 原名 / slug。全部缺失时才回退原名，避免把技术标识
* 当作调用名传给 Agent。
*/
function pickLocalizedSkillName(skill, locale) {
	const localized = skill;
	if (locale === "zh") return localized.display_name_zh || skill.name || localized.display_name || skill.slug || "";
	return [
		localized.display_name_en,
		localized.display_name,
		skill.name,
		skill.slug
	].find((candidate) => typeof candidate === "string" && candidate.length > 0 && !HAN_SCRIPT_PATTERN.test(candidate)) || skill.slug || skill.name || "";
}
/** 按 locale 解析描述（zh/en fallback 链，两端一致）。 */
function pickLocalizedDescription(skill, locale) {
	return locale === "en" ? skill.description_en || skill.description || skill.description_zh || "" : skill.description_zh || skill.description || skill.description_en || "";
}
/**
* 拉取"已安装的个人技能"原始记录，完成 cwd 过滤 + name 去重 + installedAt 倒序。
*
* 返回 `SkillInfo[]`（不映射成 UI item）：图标 / 描述等展示映射由各 consumer 自行完成，
* 以保持 Desktop / Web 各自原有的映射行为不变。
*
* 只依赖 `PersonalSkillsFacade`（不绑 ModuleHost），便于 `+` 菜单（host.facades）与
* `/` 命令菜单（usePersonalSkillsFacade）共用同一份取数。
*
* 失败降级：单口子失败静默返回 []；DomainProxy 未就绪时不打 warn（避免启动噪声）。
*/
async function fetchPersonalSkillInfos(facade, { cwd, useCloud, projectId, applicationId, sceneId, resourceSnapshotKey, account, disableFullstackWebsite }) {
	if (!facade?.list) return [];
	const params = {
		cwd,
		global: false,
		projectId,
		applicationId,
		sceneId,
		resourceSnapshotKey
	};
	const fetchOne = async (kind) => {
		try {
			const results = (kind === "cloud" ? await facade.listCloud(params) : await facade.list(params))?.results ?? [];
			const filtered = filterPersonalSkillsByCwd(results, cwd);
			return kind === "cloud" ? filtered.filter((s) => !s.disable) : filtered;
		} catch (err) {
			if (!String(err).includes("DomainProxy")) console.warn(`[skill-list-core] personalSkills.${kind === "cloud" ? "listCloud" : "list"} failed:`, String(err));
			return [];
		}
	};
	let combined;
	if (useCloud) combined = await fetchOne("cloud");
	else combined = await fetchOne("local");
	return [...filterFullstackWebsiteSkills(combined, {
		account,
		disabledByProductFeature: disableFullstackWebsite
	})].sort((a, b) => (b.installedAt ?? 0) - (a.installedAt ?? 0));
}
/**
* 合并团队（项目）技能与个人技能：团队排前、个人排后，按 `name || id` 去重（同名保留团队条目）。
* 只有团队配置的技能需要"团队"badge，个人技能不单独标注。
* 泛型化以同时服务 SkillsSubmenuSkill（Desktop）与 SkillPoolItem（Web）。
*/
function mergeTeamSkills(personalSkills, teamSkills) {
	if (!teamSkills?.length) return personalSkills;
	const seen = /* @__PURE__ */ new Set();
	const merged = [];
	for (const skill of teamSkills) {
		const key = skill.name || skill.id;
		if (!key || seen.has(key)) continue;
		seen.add(key);
		merged.push(skill);
	}
	for (const skill of personalSkills) {
		const key = skill.name || skill.id;
		if (!key || seen.has(key)) continue;
		seen.add(key);
		merged.push(skill);
	}
	return merged;
}
var HAN_SCRIPT_PATTERN;
var init_skill_list_core = __esmMin((() => {
	init_fullstack_website_skill_gate();
	init_filter_personal_skills_by_cwd();
	HAN_SCRIPT_PATTERN = /\p{Script=Han}/u;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/components/connector-auth-modal/connector-auth-modal.less
var init_connector_auth_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/components/connector-auth-modal/connector-auth-modal.tsx
var import_classnames$12, import_react$32, import_react_dom, import_jsx_runtime$22, PREFIX, CNB_HELP_URL, getConnectorConfig, closeIcon, ConnectorAuthModal;
var init_connector_auth_modal$1 = __esmMin((() => {
	init_connector_auth_modal$2();
	init_src$1();
	import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_icons();
	init_use_floating_layer();
	init_i18n();
	init_useI18n();
	init_constants();
	init_context();
	init_store();
	import_jsx_runtime$22 = require_jsx_runtime();
	PREFIX = "connector-auth-modal";
	CNB_HELP_URL = "https://docs.cnb.woa.com/zh/guide/access-token.html";
	getConnectorConfig = (type) => {
		switch (type) {
			case "cnb": return {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(CnbIcon, {
					width: 36,
					height: 36
				}),
				title: t("connectors.cnb.modalTitle"),
				subtitle: t("connectors.cnb.modalDesc"),
				placeholder: "xxxxxxxxxxxxxxxx",
				buttonText: t("connectors.cnb.modalButtonText"),
				buttonLoadingText: t("connectors.cnb.modalButtonLoading"),
				helpTitle: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("a", {
					href: CNB_HELP_URL,
					target: "_blank",
					rel: "noopener noreferrer",
					"data-external-url": CNB_HELP_URL,
					children: [t("connectors.cnb.modalHelpTitle"), "↗"]
				}),
				helpSubTitle: ""
			};
			case "figma": return {
				icon: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(FigmaIcon, {
					width: 36,
					height: 36
				}),
				title: t("connectors.figma.modalTitle"),
				subtitle: t("connectors.figma.modalDesc"),
				placeholder: t("connectors.figma.modalPlaceholder"),
				buttonText: t("connectors.figma.modalButtonText"),
				buttonLoadingText: t("connectors.figma.modalButtonLoading"),
				helpTitle: t("connectors.figma.modalHelpTitle"),
				helpSubTitle: t("connectors.figma.modalHelpSubTitle")
			};
			default: return {
				icon: null,
				title: "",
				subtitle: "",
				placeholder: "",
				buttonText: "",
				buttonLoadingText: "",
				helpTitle: "",
				helpSubTitle: ""
			};
		}
	};
	closeIcon = /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	});
	ConnectorAuthModal = ({ type, visible, onClose, onSuccess, onError }) => {
		const { adapter } = useModuleHost();
		const t = useTranslation();
		const overlayZIndex = useFloatingLayer(visible, CONNECTOR_AUTH_FLOATING_LAYER);
		const [inputValue, setInputValue] = (0, import_react$32.useState)("");
		const [isSubmitting, setIsSubmitting] = (0, import_react$32.useState)(false);
		const [localError, setLocalError] = (0, import_react$32.useState)("");
		const connectorConfig = getConnectorConfig(type);
		(0, import_react$32.useEffect)(() => {
			if (!visible) {
				setIsSubmitting(false);
				setLocalError("");
				setInputValue("");
			}
		}, [visible]);
		const handleConnect = async () => {
			if (!inputValue.trim()) {
				setLocalError(t("connectors.input.required"));
				return;
			}
			setIsSubmitting(true);
			setLocalError("");
			try {
				if (type === "cnb") await adapter?.saveOauthToken({
					name: "cnb",
					authorizationCode: inputValue.trim()
				});
				else if (type === "figma") {
					const file = await adapter?.getFile({
						name: type,
						url: inputValue.trim()
					});
					const blocks = createContextBlock(file.figmaFileInfo?.name || "", t("connectors.figma.skill", {
						type,
						url: inputValue.trim()
					}), { icon: "figma" });
					connectorStore.getState().addContentBlocks(blocks);
				}
				if (onSuccess) onSuccess();
				onClose();
			} catch (error) {
				const code = error?.response?.data?.code;
				let errorText = "";
				if (type === "figma") {
					if (CONNECTOR_NO_AUTH.includes(code)) errorText = t("connectors.figma.connectExpired");
					else if (code === 10098) errorText = t("connectors.figma.modalFileNotFound");
					else if (code === 10103) errorText = t("connectors.figma.reqOverLimit");
					else if (code === 10102) errorText = t("connectors.figma.fileNoAuth");
					else errorText = t("connectors.figma.importFail");
				}
				if (type === "cnb") {
					if ([10100, 10102].includes(code)) errorText = t("connectors.cnb.tokenInvalidOrNoAuth");
					else errorText = t("connectors.cnb.connectFail");
				}
				setLocalError(errorText);
				if (onError) onError();
			} finally {
				setIsSubmitting(false);
			}
		};
		const handleModalClick = (e) => {
			e.stopPropagation();
		};
		const handleKeyDown = (e) => {
			if (e.key === "Enter" && !isSubmitting && inputValue.trim()) handleConnect();
		};
		if (!visible) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
			className: (0, import_classnames$12.default)(`${PREFIX}-overlay`),
			style: { zIndex: overlayZIndex },
			children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: (0, import_classnames$12.default)(`${PREFIX}`),
				onClick: handleModalClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
						className: (0, import_classnames$12.default)(`${PREFIX}-header`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
							className: (0, import_classnames$12.default)(`${PREFIX}-icon-wrapper`),
							children: connectorConfig.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("button", {
							className: (0, import_classnames$12.default)(`${PREFIX}-close-btn`),
							onClick: onClose,
							disabled: isSubmitting,
							"aria-label": t("common.close"),
							children: closeIcon
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h2", {
						className: (0, import_classnames$12.default)(`${PREFIX}-title`),
						children: connectorConfig.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("p", {
						className: (0, import_classnames$12.default)(`${PREFIX}-subtitle`),
						children: connectorConfig.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
						className: (0, import_classnames$12.default)(`${PREFIX}-input-wrapper`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("input", {
							type: type === "cnb" ? "password" : "",
							className: (0, import_classnames$12.default)(`${PREFIX}-input`, { [`${PREFIX}-input-error`]: !!localError }),
							placeholder: connectorConfig.placeholder,
							value: inputValue,
							onChange: (e) => {
								setInputValue(e.target.value);
								setLocalError("");
							},
							disabled: isSubmitting,
							onKeyDown: handleKeyDown,
							autoFocus: true
						}), localError && /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
							className: (0, import_classnames$12.default)(`${PREFIX}-error-message`),
							children: localError
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("button", {
						className: (0, import_classnames$12.default)(`${PREFIX}-submit-btn`),
						onClick: handleConnect,
						disabled: isSubmitting || !inputValue.trim(),
						children: isSubmitting ? connectorConfig.buttonLoadingText : connectorConfig.buttonText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
						className: (0, import_classnames$12.default)(`${PREFIX}-help-box`),
						onClick: (e) => {
							const target = e.target.closest("a");
							if (target) {
								e.preventDefault();
								const url = target.getAttribute("data-external-url") || target.getAttribute("href");
								if (url) {
									if (adapter?.emit) adapter.emit("open-external", url);
									else window.open(url, "_blank", "noopener,noreferrer");
								}
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
							className: (0, import_classnames$12.default)(`${PREFIX}-help-icon`),
							children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(HelpCircleIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
							className: (0, import_classnames$12.default)(`${PREFIX}-help-content`),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
								className: (0, import_classnames$12.default)(`${PREFIX}-help-title`),
								children: connectorConfig.helpTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
								className: (0, import_classnames$12.default)(`${PREFIX}-help-text`),
								children: connectorConfig.helpSubTitle
							})]
						})]
					})
				]
			})
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/components/connector-auth-modal/index.ts
var init_connector_auth_modal = __esmMin((() => {
	init_connector_auth_modal$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/items.tsx
/**
* 构造静态菜单数据。
*
* @param t      `useTranslation()` 返回值，用于取最新的 i18n 文案
* @param hidden 一级 item.id 黑名单（host 通过传 onPickXxx 决定哪些项可用，
*               若整个模块没有任何注入则隐藏对应一级 item）
*/
function buildWbInputAddGroups(t, hidden) {
	const isHidden = (id) => hidden?.has(id) ?? false;
	return [{ items: [
		{
			id: "add-files",
			label: t("input.wbAdd.addFiles"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(AddFilesIcon, {})
		},
		{
			id: "reference-files",
			label: t("input.wbAdd.referenceFiles"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ReferenceFilesIcon, {})
		},
		{
			id: "application",
			label: t("input.wbAdd.application"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ApplicationIcon, {})
		}
	].filter((item) => !isHidden(item.id)) }, { items: [
		{
			id: "mode",
			label: t("input.wbAdd.mode"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ModeIcon, {})
		},
		{
			id: "experts",
			label: t("input.wbAdd.experts"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ExpertsIcon, {})
		},
		{
			id: "skills",
			label: t("input.wbAdd.skills"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(SkillsIcon, {})
		},
		{
			id: "connectors",
			label: t("input.wbAdd.connectors"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ConnectorsIcon, {})
		}
	].filter((item) => !isHidden(item.id)) }].filter((group) => group.items.length > 0);
}
var import_jsx_runtime$21;
var init_items = __esmMin((() => {
	require_react();
	init_icons$1();
	import_jsx_runtime$21 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/shared/submenu-panel.module.scss
var panel$5, list$4, item$6, disabled$5, itemIcon$3, itemLabel$1, itemChevron$1, placeholder, submenu_panel_module_default;
var init_submenu_panel_module = __esmMin((() => {
	panel$5 = "_panel_k0n3r_7";
	list$4 = "_list_k0n3r_30";
	item$6 = "_item_k0n3r_36";
	disabled$5 = "_disabled_k0n3r_49";
	itemIcon$3 = "_itemIcon_k0n3r_57";
	itemLabel$1 = "_itemLabel_k0n3r_67";
	itemChevron$1 = "_itemChevron_k0n3r_75";
	placeholder = "_placeholder_k0n3r_85";
	submenu_panel_module_default = {
		panel: panel$5,
		list: list$4,
		item: item$6,
		disabled: disabled$5,
		itemIcon: itemIcon$3,
		itemLabel: itemLabel$1,
		itemChevron: itemChevron$1,
		placeholder
	};
})), import_classnames$11, import_jsx_runtime$20, SubmenuListItem;
var init_submenu_list_item = __esmMin((() => {
	import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_icons$1();
	init_submenu_panel_module();
	import_jsx_runtime$20 = require_jsx_runtime();
	SubmenuListItem = ({ icon, label, hasArrow, disabled, onClick, className, nativeProps }) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		role: "menuitem",
		"aria-disabled": disabled,
		className: (0, import_classnames$11.default)(submenu_panel_module_default.item, { [submenu_panel_module_default.disabled]: disabled }, className),
		onClick: () => {
			if (disabled) return;
			onClick?.();
		},
		...nativeProps,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
				className: submenu_panel_module_default.itemIcon,
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
				className: submenu_panel_module_default.itemLabel,
				children: label
			}),
			hasArrow && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
				className: submenu_panel_module_default.itemChevron,
				children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(ChevronRightIcon, {})
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/add-files/hooks/use-ima.tsx
function useImaItem(onPick) {
	const t = useTranslation();
	if (!onPick) return null;
	return {
		id: "ima",
		label: t("action.addIma"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(WbImaIcon, {
			width: 16,
			height: 16
		}),
		onClick: onPick
	};
}
var import_jsx_runtime$19;
var init_use_ima = __esmMin((() => {
	require_react();
	init_useI18n();
	init_icons();
	import_jsx_runtime$19 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/add-files/hooks/use-local-files.tsx
function useLocalFilesItem(onPick) {
	const t = useTranslation();
	if (!onPick) return null;
	return {
		id: "local-files",
		label: t("action.addLocalFile"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(UploadIcon, {}),
		onClick: onPick
	};
}
var import_jsx_runtime$18;
var init_use_local_files = __esmMin((() => {
	require_react();
	init_useI18n();
	init_icons$1();
	import_jsx_runtime$18 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/add-files/hooks/use-tencent-docs.tsx
function useTencentDocsItem(onPick) {
	const t = useTranslation();
	if (!onPick) return null;
	return {
		id: "tencent-docs",
		label: t("action.addTencentDocs"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(WbDocsQqIcon, {
			width: 16,
			height: 16
		}),
		onClick: onPick
	};
}
var import_jsx_runtime$17;
var init_use_tencent_docs = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$17 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/add-files/hooks/use-tencent-lexiang.tsx
function useTencentLexiangItem(onPick) {
	const t = useTranslation();
	if (!onPick) return null;
	return {
		id: "tencent-lexiang",
		label: t("action.addTencentLexiang"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(WbLexiangIcon, {
			width: 16,
			height: 16
		}),
		onClick: onPick
	};
}
var import_jsx_runtime$16;
var init_use_tencent_lexiang = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$16 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/add-files/use-add-files-module.ts
function useAddFilesModule(injection) {
	const localFiles = useLocalFilesItem(injection?.onPickLocalFiles);
	const tencentDocs = useTencentDocsItem(injection?.onPickTencentDocs);
	const ima = useImaItem(injection?.onPickIma);
	const tencentLexiang = useTencentLexiangItem(injection?.onPickTencentLexiang);
	const extraItems = (injection?.extraItems ?? []).map((item) => ({
		id: item.id,
		label: item.label,
		icon: item.icon,
		onClick: item.onSelect,
		trackElementId: item.track?.elementId,
		trackParams: item.track?.params
	}));
	return { items: [
		localFiles,
		tencentDocs,
		ima,
		tencentLexiang
	].filter((item) => item !== null).concat(extraItems) };
}
var init_use_add_files_module = __esmMin((() => {
	init_use_ima();
	init_use_local_files();
	init_use_tencent_docs();
	init_use_tencent_lexiang();
})), import_jsx_runtime$15, AddFilesSubmenu;
var init_add_files_submenu = __esmMin((() => {
	require_react();
	init_submenu_list_item();
	init_submenu_panel_module();
	init_use_add_files_module();
	import_jsx_runtime$15 = require_jsx_runtime();
	AddFilesSubmenu = ({ injection, onCloseMenu }) => {
		const { items } = useAddFilesModule(injection);
		if (items.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: submenu_panel_module_default.panel,
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
				className: submenu_panel_module_default.list,
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(SubmenuListItem, {
					icon: item.icon,
					label: item.label,
					hasArrow: item.hasArrow,
					disabled: item.disabled,
					onClick: () => {
						item.onClick();
						onCloseMenu?.();
					}
				}, item.id))
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/add-files/index.ts
var init_add_files = __esmMin((() => {
	init_add_files_submenu();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/application/application-mentions.ts
function normalizeDirPath(value) {
	if (!value) return "";
	return value.replace(/\\/g, "/").replace(/\/+$/, "");
}
/**
* 判断两个路径是否同属一个工作区。
*
* 渲染层不能用 Node 的 `path`，也不能裸 `startsWith` —— 后者会让 `/repo/app`
* 误吞 `/repo/app-old`。故先归一分隔符与尾斜杠，再要求「相等或以对方 + '/' 开头」。
*/
function isSameWorkspace(a, b) {
	const left = normalizeDirPath(a);
	const right = normalizeDirPath(b);
	if (!left || !right) return false;
	return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}
/**
* 组装喂给 `convertToContentBlock` default 分支的 suggestion。
*
* `metadata.type` 必须恰好是 `'application'`：default 分支用它拼 `application://`
* 前缀和 `_meta.mentionType`。`metadata` 会被整体展开进 `_meta`，所以
* `applicationId` / `shareLink` 放在这里就等于放进了 chip 的 `_meta`。
* 不放整条应用对象 —— `_meta` 会随 prompt 落盘并参与回放。
*/
function buildApplicationSuggestion(input) {
	return {
		id: input.applicationId,
		label: input.name,
		icon: "web",
		metadata: {
			type: "application",
			applicationId: input.applicationId,
			icon: "web",
			...input.shareLink ? { shareLink: input.shareLink } : {}
		}
	};
}
/**
* 产出可插入输入框的 chip。
*
* 走既有 `convertToContentBlock`，不新增 chip 工厂 —— 输入框的 phrase 渲染、
* 序列化与回放都绑在它的 `createPhraseBlock` 产物形状上。
*/
function createApplicationChip(input) {
	return convertToContentBlock(buildApplicationSuggestion(input), {});
}
/**
* 把发布历史整理成菜单的两组。
*
* 分组语义：
* - `currentTask`：历史里**任一条**记录属于当前任务。用户在本任务发过的应用是
*   最高频复选项，只看 `history[0]` 会在「本任务发过、之后别处又发过一次」时漏掉。
* - `workspace`：不属当前任务，但最近一次发布落在同一工作区。
*
* 两组都不命中的应用不进菜单：跨工作区的应用列出来只会误选。
*/
function toApplicationMentionGroups(targets, context) {
	const currentTask = [];
	const workspace = [];
	const seen = /* @__PURE__ */ new Set();
	for (const target of targets) {
		const applicationId = target.appId?.trim();
		if (!applicationId || seen.has(applicationId)) continue;
		seen.add(applicationId);
		const history = target.history ?? [];
		const latest = history[0];
		const unpublished = target.unpublished === true;
		const name = target.title?.trim() || applicationId;
		const shareLink = unpublished ? void 0 : latest?.shareLink ?? void 0;
		const item = {
			applicationId,
			name,
			shareLink,
			unpublished,
			lastDeployedAt: latest?.createdTimestamp ?? 0,
			toContentBlock: () => createApplicationChip({
				applicationId,
				name,
				shareLink
			})
		};
		if (!!context.taskSessionId && history.some((entry) => entry.taskSessionId === context.taskSessionId)) {
			currentTask.push(item);
			continue;
		}
		if (isSameWorkspace(context.cwd, latest?.workspacePath)) workspace.push(item);
	}
	const byRecencyDesc = (a, b) => b.lastDeployedAt - a.lastDeployedAt;
	currentTask.sort(byRecencyDesc);
	workspace.sort(byRecencyDesc);
	return [{
		id: "currentTask",
		items: currentTask
	}, {
		id: "workspace",
		items: workspace
	}].filter((group) => group.items.length > 0);
}
var init_application_mentions = __esmMin((() => {
	init_mention_converters();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/application/application.module.scss
var panel$4, list$3, groupTitle, item$5, icon$1, name$2, status, empty$3, application_module_default;
var init_application_module = __esmMin((() => {
	panel$4 = "_panel_1sy7k_10";
	list$3 = "_list_1sy7k_25";
	groupTitle = "_groupTitle_1sy7k_7";
	item$5 = "_item_1sy7k_59";
	icon$1 = "_icon_1sy7k_75";
	name$2 = "_name_1sy7k_86";
	status = "_status_1sy7k_99";
	empty$3 = "_empty_1sy7k_107";
	application_module_default = {
		panel: panel$4,
		list: list$3,
		groupTitle,
		item: item$5,
		icon: icon$1,
		name: name$2,
		status,
		empty: empty$3
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/application/application-submenu.tsx
var import_react$24, import_jsx_runtime$14, ApplicationSubmenu;
var init_application_submenu = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_icons$1();
	init_application_module();
	import_jsx_runtime$14 = require_jsx_runtime();
	ApplicationSubmenu = ({ injection, groups, isLoading, onCloseMenu }) => {
		const t = useTranslation();
		const handleSelect = (item) => {
			injection?.onInsert?.(item.toContentBlock());
			onCloseMenu?.();
		};
		const statusText = (item) => {
			if (item.unpublished) return t("input.wbAdd.application.status.unpublished");
			if (item.shareLink) return t("input.wbAdd.application.status.published");
			return t("input.wbAdd.application.status.never");
		};
		if (isLoading && groups.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: application_module_default.panel,
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
				className: application_module_default.empty,
				children: t("input.wbAdd.application.loading")
			})
		});
		if (groups.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: application_module_default.panel,
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
				className: application_module_default.empty,
				children: t("input.wbAdd.application.empty")
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: application_module_default.panel,
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
				className: application_module_default.list,
				children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_react$24.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
					className: application_module_default.groupTitle,
					children: group.id === "currentTask" ? t("input.wbAdd.application.group.currentTask") : t("input.wbAdd.application.group.workspace")
				}), group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: application_module_default.item,
					role: "menuitem",
					title: item.name,
					onClick: () => handleSelect(item),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
							className: application_module_default.icon,
							children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ApplicationIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
							className: application_module_default.name,
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
							className: application_module_default.status,
							children: statusText(item)
						})
					]
				}, item.applicationId))] }, group.id))
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/application/load-application-mentions.ts
async function loadApplicationDeployTargets(provider) {
	if (!provider) return [];
	try {
		const raw = await provider.getDeployHistory();
		return Array.isArray(raw) ? raw : [];
	} catch {
		return [];
	}
}
var init_load_application_mentions = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/application/use-application-mentions.ts
function useApplicationMentions(provider, enabled, context) {
	const [groups, setGroups] = (0, import_react$23.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react$23.useState)(false);
	const { taskSessionId, cwd } = context;
	(0, import_react$23.useEffect)(() => {
		if (!enabled) {
			setGroups([]);
			setIsLoading(false);
			return;
		}
		let cancelled = false;
		setIsLoading(true);
		(async () => {
			const targets = await loadApplicationDeployTargets(provider);
			if (cancelled) return;
			setGroups(toApplicationMentionGroups(targets, {
				taskSessionId,
				cwd
			}));
			setIsLoading(false);
		})();
		return () => {
			cancelled = true;
		};
	}, [
		provider,
		enabled,
		taskSessionId,
		cwd
	]);
	return {
		groups,
		isLoading
	};
}
var import_react$23;
var init_use_application_mentions = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_application_mentions();
	init_load_application_mentions();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/application/index.ts
var init_application = __esmMin((() => {
	init_application_mentions();
	init_application_submenu();
	init_use_application_mentions();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/connectors/connector-menu-runtime.ts
async function ensureCatalog() {
	if (connectorStore.getState().mcpConnectorConfigs.length > 0) return;
	if (catalogPromise) return catalogPromise;
	runtimeStore.setState({ catalogLoading: true });
	catalogPromise = connectorStore.getState().loadMcpConnectorCatalog().finally(() => {
		catalogPromise = null;
		runtimeStore.setState({ catalogLoading: false });
	});
	return catalogPromise;
}
async function openMenu() {
	await ensureCatalog();
	if (statesPromise) return statesPromise;
	runtimeStore.setState({ statesLoading: true });
	statesPromise = connectorStore.getState().loadMcpConnectorStatesSnapshot().finally(() => {
		statesPromise = null;
		runtimeStore.setState({ statesLoading: false });
	});
	return statesPromise;
}
function useConnectorMenuRuntime(entry, options = {}) {
	const enabled = options.enabled ?? true;
	const catalogLoading = (0, import_zustand.useStore)(runtimeStore, (state) => state.catalogLoading);
	const statesLoading = (0, import_zustand.useStore)(runtimeStore, (state) => state.statesLoading);
	const baseStates = useConnectorStore((state) => state.mcpConnectorStates);
	const { handleConnect, handleRepair, handleDisconnect, handleCancelConnect } = useConnectorActions({ telemetryEntry: entry });
	(0, import_react$22.useEffect)(() => {
		if (!enabled) return;
		ensureCatalog().catch(() => void 0);
	}, [enabled]);
	const getDisplayState = (0, import_react$22.useCallback)((connectorId) => baseStates[connectorId], [baseStates]);
	const toggleConnector = (0, import_react$22.useCallback)(async (connector, desiredOn) => {
		if (desiredOn) {
			await handleConnect(connector, !isConnectorBound(getDisplayState(connector.id)), CONNECTOR_MENU_ACTION_CONTEXT);
			return;
		}
		await handleDisconnect(connector, CONNECTOR_MENU_ACTION_CONTEXT);
	}, [
		getDisplayState,
		handleConnect,
		handleDisconnect
	]);
	const cancelConnector = (0, import_react$22.useCallback)(async (connector) => {
		await handleCancelConnect(connector, CONNECTOR_MENU_ACTION_CONTEXT);
	}, [handleCancelConnect]);
	return {
		catalogLoading,
		statesLoading,
		ensureCatalog,
		openMenu,
		getDisplayState,
		toggleConnector,
		repairConnector: (0, import_react$22.useCallback)(async (connector) => {
			await handleRepair(connector, CONNECTOR_MENU_ACTION_CONTEXT);
		}, [handleRepair]),
		cancelConnector
	};
}
var import_react$22, import_zustand, CONNECTOR_MENU_ACTION_CONTEXT, runtimeStore, catalogPromise, statesPromise, isConnectorMenuOn;
var init_connector_menu_runtime = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	import_zustand = require_zustand();
	init_vanilla();
	init_connector_display();
	init_store();
	init_use_connector_actions();
	CONNECTOR_MENU_ACTION_CONTEXT = { source: "connector-menu" };
	runtimeStore = createStore(() => ({
		catalogLoading: false,
		statesLoading: false
	}));
	catalogPromise = null;
	statesPromise = null;
	isConnectorMenuOn = isConnectorEnabled;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/connectors/connectors.module.scss
var panel$3, list$2, item$4, connecting, disabled$4, itemIcon$2, itemIconFallback, itemName, sourceTag$1, suffixConnect, suffixConnectIcon, suffixConnectLabel, suffixConnecting, connectingSpinner, connectingLabel, errorHint, errorAction, errorCause, cancelLabel, cancellable, toggle$1, toggleOn$1, toggleDisabled$1, toggleThumb$1, empty$2, divider$3, footer, footerItem, footerIcon, footerLabel, connectors_module_default;
var init_connectors_module = __esmMin((() => {
	panel$3 = "_panel_13gmy_18";
	list$2 = "_list_13gmy_44";
	item$4 = "_item_13gmy_66";
	connecting = "_connecting_13gmy_83";
	disabled$4 = "_disabled_13gmy_89";
	itemIcon$2 = "_itemIcon_13gmy_95";
	itemIconFallback = "_itemIconFallback_13gmy_112";
	itemName = "_itemName_13gmy_124";
	sourceTag$1 = "_sourceTag_13gmy_136";
	suffixConnect = "_suffixConnect_13gmy_153";
	suffixConnectIcon = "_suffixConnectIcon_13gmy_161";
	suffixConnectLabel = "_suffixConnectLabel_13gmy_179";
	suffixConnecting = "_suffixConnecting_13gmy_190";
	connectingSpinner = "_connectingSpinner_13gmy_197";
	connectingLabel = "_connectingLabel_13gmy_206";
	errorHint = "_errorHint_13gmy_228";
	errorAction = "_errorAction_13gmy_237";
	errorCause = "_errorCause_13gmy_251";
	cancelLabel = "_cancelLabel_13gmy_255";
	cancellable = "_cancellable_13gmy_222";
	toggle$1 = "_toggle_13gmy_283";
	toggleOn$1 = "_toggleOn_13gmy_298";
	toggleDisabled$1 = "_toggleDisabled_13gmy_301";
	toggleThumb$1 = "_toggleThumb_13gmy_306";
	empty$2 = "_empty_13gmy_322";
	divider$3 = "_divider_13gmy_335";
	footer = "_footer_13gmy_342";
	footerItem = "_footerItem_13gmy_350";
	footerIcon = "_footerIcon_13gmy_364";
	footerLabel = "_footerLabel_13gmy_374";
	connectors_module_default = {
		panel: panel$3,
		list: list$2,
		item: item$4,
		connecting,
		disabled: disabled$4,
		itemIcon: itemIcon$2,
		itemIconFallback,
		itemName,
		sourceTag: sourceTag$1,
		suffixConnect,
		suffixConnectIcon,
		suffixConnectLabel,
		suffixConnecting,
		connectingSpinner,
		connectingLabel,
		errorHint,
		errorAction,
		errorCause,
		cancelLabel,
		cancellable,
		toggle: toggle$1,
		toggleOn: toggleOn$1,
		toggleDisabled: toggleDisabled$1,
		toggleThumb: toggleThumb$1,
		empty: empty$2,
		divider: divider$3,
		footer,
		footerItem,
		footerIcon,
		footerLabel
	};
})), import_classnames$10, import_jsx_runtime$13, ConnectorIcon, Suffix, ERROR_CAUSE_KEY, ERROR_ACTION_KEY, ErrorHint, ConnectorRow;
var init_connector_row = __esmMin((() => {
	import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_useI18n();
	init_icons$1();
	init_connectors_module();
	import_jsx_runtime$13 = require_jsx_runtime();
	ConnectorIcon = ({ connector }) => {
		if (connector.icon) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("img", {
			src: connector.icon,
			alt: ""
		});
		const ch = (connector.name || "?").charAt(0).toUpperCase();
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
			className: connectors_module_default.itemIconFallback,
			children: ch
		});
	};
	Suffix = ({ bound, enabled, pending, repairing, isCancellable, isIncompatible, disabled, onCancelClick }) => {
		const t = useTranslation();
		if (disabled) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
			className: (0, import_classnames$10.default)(connectors_module_default.toggle, connectors_module_default.toggleDisabled, { [connectors_module_default.toggleOn]: enabled }),
			role: "switch",
			"aria-checked": enabled,
			"aria-disabled": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { className: connectors_module_default.toggleThumb })
		});
		if (!bound) {
			if (pending) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: connectors_module_default.suffixConnecting,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
						className: connectors_module_default.connectingSpinner,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ConnectingSpinnerIcon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
						className: connectors_module_default.connectingLabel,
						children: t("input.wbAdd.connectors.connecting")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
						className: connectors_module_default.cancelLabel,
						onClick: (e) => {
							e.stopPropagation();
							if (isCancellable) onCancelClick();
						},
						children: t("input.wbAdd.connectors.cancelConnect")
					})
				]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", {
				className: connectors_module_default.suffixConnect,
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.suffixConnectIcon,
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ConnectorsIcon, {
						width: 14,
						height: 14
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.suffixConnectLabel,
					children: t("input.wbAdd.connectors.connectTip")
				})]
			});
		}
		if (isIncompatible && !enabled) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
			className: (0, import_classnames$10.default)(connectors_module_default.toggle, connectors_module_default.toggleDisabled),
			role: "switch",
			"aria-checked": "false",
			"aria-disabled": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { className: connectors_module_default.toggleThumb })
		});
		if (repairing) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: connectors_module_default.suffixConnecting,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.connectingSpinner,
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ConnectingSpinnerIcon, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.connectingLabel,
					children: t("input.wbAdd.connectors.connecting")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.cancelLabel,
					onClick: (e) => {
						e.stopPropagation();
						if (isCancellable) onCancelClick();
					},
					children: t("input.wbAdd.connectors.cancelConnect")
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
			className: (0, import_classnames$10.default)(connectors_module_default.toggle, { [connectors_module_default.toggleOn]: enabled }),
			role: "switch",
			"aria-checked": enabled ? "true" : "false",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { className: connectors_module_default.toggleThumb })
		});
	};
	ERROR_CAUSE_KEY = {
		authorize: "input.wbAdd.connectors.errorAuthExpired",
		configure: "input.wbAdd.connectors.errorConfigRequired",
		upgrade: "input.wbAdd.connectors.errorUpgradeRequired",
		retry: "input.wbAdd.connectors.errorTip"
	};
	ERROR_ACTION_KEY = {
		authorize: "input.wbAdd.connectors.errorReauthorize",
		configure: "input.wbAdd.connectors.errorConfigure",
		retry: "input.wbAdd.connectors.errorRetry"
	};
	ErrorHint = ({ reasonText, kind, onRetryClick }) => {
		const t = useTranslation();
		const actionKey = ERROR_ACTION_KEY[kind];
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", {
			className: connectors_module_default.errorHint,
			title: reasonText,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
				className: connectors_module_default.errorCause,
				children: t(ERROR_CAUSE_KEY[kind])
			}), actionKey && onRetryClick && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
				className: connectors_module_default.errorAction,
				onClick: (e) => {
					e.stopPropagation();
					onRetryClick();
				},
				children: t(actionKey)
			})]
		});
	};
	ConnectorRow = ({ connector, bound, enabled, pending, isCancellable, isIncompatible, reasonText, reasonAction, onErrorRetryClick, disabled, tag, onClick, onCancelClick }) => {
		const repairing = bound && pending && !!reasonText;
		const showErrorHint = bound && enabled && !pending && !!reasonText;
		const canInteract = !disabled && !repairing && (!pending || bound) && (!isIncompatible || enabled);
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: (0, import_classnames$10.default)(connectors_module_default.item, {
				[connectors_module_default.connecting]: pending && (!bound || repairing),
				[connectors_module_default.cancellable]: pending && (!bound || repairing) && isCancellable,
				[connectors_module_default.disabled]: !canInteract && !pending
			}),
			role: "menuitem",
			title: connector.description || connector.name,
			onClick: () => {
				if (!canInteract) return;
				onClick();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.itemIcon,
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ConnectorIcon, { connector })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.itemName,
					children: connector.name
				}),
				tag && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
					className: connectors_module_default.sourceTag,
					children: tag
				}),
				showErrorHint && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ErrorHint, {
					reasonText,
					kind: reasonAction ?? "retry",
					onRetryClick: onErrorRetryClick
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Suffix, {
					bound,
					enabled,
					pending,
					repairing,
					isCancellable,
					isIncompatible,
					disabled,
					onCancelClick
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/connectors/use-connectors.ts
/**
* 与 ConnectorCapsule 菜单打开时的 MCP 排序 + 10 条截断逻辑字面同源。
* `configs` 须为 marketplace 原始顺序（`mcpConnectorConfigs` 过滤后的 `allVisible`）。
*/
function sortConnectorsLikeCapsule(configs, mcpStates, maxDisplay = 10) {
	const getMcpPriority = (c) => {
		const state = mcpStates[c.id];
		if (isConnectorConnected(state)) return 0;
		if (isConnectorBound(state)) return 1;
		return 2;
	};
	const sorted = [...configs].sort((a, b) => getMcpPriority(a) - getMcpPriority(b));
	const isConnectedSide = (c) => {
		const state = mcpStates[c.id];
		return isConnectorBound(state) || isConnectorConnected(state) || isConnectorPending(state);
	};
	const connectedSide = sorted.filter(isConnectedSide);
	const unconnectedSide = sorted.filter((c) => !isConnectedSide(c));
	return connectedSide.length >= maxDisplay ? connectedSide : [...connectedSide, ...unconnectedSide.slice(0, maxDisplay - connectedSide.length)];
}
function useConnectorsList() {
	const mcpStates = useConnectorStore((state) => state.mcpConnectorStates);
	const allVisible = useVisibleMcpConnectors();
	return {
		items: (0, import_react$20.useMemo)(() => sortConnectorsLikeCapsule(allVisible, mcpStates), [allVisible, mcpStates]),
		allVisible
	};
}
var import_react$20;
var init_use_connectors = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_connector_display();
	init_store();
	init_use_visible_mcp_connectors();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/connectors/connectors-submenu.tsx
/** 大小写不敏感的 name 包含匹配（issue #55666 第 6 条 顶部搜索） */
function matchesKeyword$1(name, keyword) {
	if (!keyword) return true;
	if (!name) return false;
	return name.toLowerCase().includes(keyword.toLowerCase());
}
var import_react$19, import_jsx_runtime$12, toConnectorConfig, resolveInjectedRowPending, injectedItemKey, isInjectedItemConfigured, isConnectorConfigured, ConnectorsSubmenu;
var init_connectors_submenu = __esmMin((() => {
	init_src$1();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_connector_display();
	init_entry_show_rate_limit();
	init_store();
	init_use_cancellable_connecting();
	init_utils();
	init_telemetry();
	init_wb_search_panel();
	init_icons$1();
	init_connector_menu_runtime();
	init_connector_row();
	init_connectors_module();
	init_use_connector_actions();
	init_use_connectors();
	import_jsx_runtime$12 = require_jsx_runtime();
	toConnectorConfig = (item) => ({
		id: item.id,
		name: item.name,
		description: item.description,
		icon: item.icon || void 0
	});
	resolveInjectedRowPending = (item, mcpState) => {
		if (item.source !== "local" || typeof item.enabled === "boolean") return item.status === "connecting";
		return mcpState ? isConnectorPending(mcpState) : item.status === "connecting";
	};
	injectedItemKey = (item) => `${item.authMode || "personal"}:${item.id}`;
	isInjectedItemConfigured = (item) => item.source === "project" || !!item.isConnected || !!item.everConnected;
	isConnectorConfigured = (connector, mcpStates) => {
		const state = mcpStates[connector.id];
		return isConnectorConnected(state) || isConnectorPending(state) || isConnectorBound(state);
	};
	ConnectorsSubmenu = ({ injection, onCloseMenu }) => {
		const t = useTranslation();
		const hasInjectedItems = !!injection?.items;
		const { items, allVisible } = useConnectorsList();
		const mcpStates = useConnectorStore((state) => state.mcpConnectorStates);
		const cancellableMcpIds = useCancellableConnecting(mcpStates);
		const [keyword, setKeyword] = (0, import_react$19.useState)("");
		const trimmedKeyword = keyword.trim();
		const isSearching = trimmedKeyword.length > 0;
		/**
		* 渲染顺序冻结策略（用户反馈：点击连接后行位跳动，体感像浮层在跳）：
		*   - 只冻结「已配置」分组（已连接 / 连接中 / 曾连接过），未配置组始终排在后面。
		*   - 首次打开时如果状态还没加载，快照可能为空；状态加载后已连接项会进入已配置组，
		*     追加到已配置组末尾并整体置顶，不会被未配置 marketplace 顺序锁死。
		*   - 已配置组内 toggle on/off 期间保持快照顺序，避免行位跳动。
		*   - **搜索激活时**绕过快照，按 items 当前真实顺序过滤。
		*/
		const orderSnapshotRef = (0, import_react$19.useRef)(null);
		if (orderSnapshotRef.current === null && items.length > 0) orderSnapshotRef.current = items.filter((c) => isConnectorConfigured(c, mcpStates)).map((c) => c.id);
		const orderedItems = (0, import_react$19.useMemo)(() => {
			if (isSearching) return items.filter((c) => matchesKeyword$1(c.name, trimmedKeyword));
			const snapshot = orderSnapshotRef.current;
			if (!snapshot) return items;
			const unconfigured = items.filter((c) => !isConnectorConfigured(c, mcpStates));
			const configuredById = new Map(items.filter((c) => isConnectorConfigured(c, mcpStates)).map((c) => [c.id, c]));
			const configuredOrdered = [];
			for (const id of snapshot) {
				const c = configuredById.get(id);
				if (c) {
					configuredOrdered.push(c);
					configuredById.delete(id);
				}
			}
			for (const c of configuredById.values()) configuredOrdered.push(c);
			return [...configuredOrdered, ...unconfigured];
		}, [
			items,
			isSearching,
			trimmedKeyword,
			mcpStates
		]);
		const { openMenu, getDisplayState, toggleConnector, repairConnector, cancelConnector } = useConnectorMenuRuntime("add_menu", { enabled: !hasInjectedItems });
		const { handleRepair, handleCancelConnect } = useConnectorActions({ telemetryEntry: "add_menu" });
		const { reportEvent, Events } = useAgentTelemetry();
		(0, import_react$19.useEffect)(() => {
			if (orderedItems.length === 0 || !claimConnectorEntryShow("add_menu")) return;
			const totalCount = orderedItems.length;
			orderedItems.forEach((connector, index) => {
				const isConnected = isConnectorConnected(getDisplayState(connector.id));
				reportEvent(Events.ConnectorEntryShow, {
					entry: "add_menu",
					connectorId: connector.id,
					connectorName: connector.name,
					connectorType: inferConnectorKind(connector),
					isConnected,
					position: index + 1,
					totalCount,
					isOfficial: true
				});
			});
		}, [
			orderedItems,
			getDisplayState,
			reportEvent,
			Events
		]);
		const handleSummonMore = () => {
			injection?.onSummonMore?.();
			onCloseMenu?.();
		};
		const injectedItems = injection?.items;
		const injectedAllItems = injection?.allItems ?? injectedItems;
		(0, import_react$19.useEffect)(() => {
			if (injectedItems) return;
			openMenu().catch(() => void 0);
		}, [injectedItems, openMenu]);
		const injectedMerged = import_react$19.useMemo(() => {
			if (!injectedItems) return;
			const byKey = /* @__PURE__ */ new Map();
			for (const item of injectedAllItems ?? []) byKey.set(injectedItemKey(item), item);
			for (const item of injectedItems) byKey.set(injectedItemKey(item), item);
			return Array.from(byKey.values());
		}, [injectedAllItems, injectedItems]);
		/**
		* 顺序冻结 —— **只作用于「已配置」分组**（issue #63314 后续：授权完成排序到已配置组）：
		*   - 面板首次打开时按「已配置」项（已连接 / 曾连接过）拍一张顺序快照，未配置组不进快照。
		*   - 已配置组：按快照顺序渲染，期间 toggle 开关（on/off，仍属已配置）只改行内开关状态、**不改行位**，
		*     "有控件的那组"不再因开关切换在 personalOn / personalEverConnected 段间跳动导致重排。
		*   - 新授权的连接器（从「未配置」转入「已配置」）不在快照里 → 追加到已配置组末尾，
		*     即离开未配置组、排进已配置组，而不是被冻在原未配置位置。
		*   - 未配置组：按 injectedMerged 当前自然顺序（mergeConnectorsForMenu 已排好），不冻结、排在已配置组之后。
		*   - 面板关闭重开（组件 remount）时用最新已配置项重新拍；搜索激活时绕过快照，按 name 过滤当前真值列表。
		*/
		const injectedOrderSnapshotRef = (0, import_react$19.useRef)(null);
		if (injectedOrderSnapshotRef.current === null && injectedMerged && injectedMerged.length > 0) injectedOrderSnapshotRef.current = injectedMerged.filter(isInjectedItemConfigured).map(injectedItemKey);
		const injectedDisplayItems = import_react$19.useMemo(() => {
			if (!injectedMerged) return;
			if (isSearching) return injectedMerged.filter((item) => matchesKeyword$1(item.name, trimmedKeyword));
			const snapshot = injectedOrderSnapshotRef.current;
			if (!snapshot) return injectedMerged;
			const unconfigured = injectedMerged.filter((item) => !isInjectedItemConfigured(item));
			const configuredByKey = new Map(injectedMerged.filter(isInjectedItemConfigured).map((item) => [injectedItemKey(item), item]));
			const configuredOrdered = [];
			for (const key of snapshot) {
				const item = configuredByKey.get(key);
				if (item) {
					configuredOrdered.push(item);
					configuredByKey.delete(key);
				}
			}
			for (const item of configuredByKey.values()) configuredOrdered.push(item);
			return [...configuredOrdered, ...unconfigured];
		}, [
			injectedMerged,
			isSearching,
			trimmedKeyword
		]);
		const handleInjectedItemClick = async (item) => {
			if (item.canToggle === false) return;
			if (item.source === "local") {
				const mcpState = mcpStates[item.id];
				if ((typeof item.enabled === "boolean" ? item.enabled : void 0) ?? isConnectorMenuOn(mcpState)) {
					await injection?.onToggleItem?.(item, false);
					return;
				}
			}
			if (item.isConnected && item.enabled !== false) {
				await injection?.onToggleItem?.(item, false);
				return;
			}
			if (item.isConnected) {
				await injection?.onToggleItem?.(item, true);
				return;
			}
			await injection?.onConnectItem?.(item);
		};
		/**
		* 条目级恢复动作（重新授权/重试/去配置）：重新发起完整连接流程。
		* 与行整体点击不同——行点击对开着的行是「关闭」，恢复动作是「保持打开并重连」。
		*/
		const handleInjectedRetryClick = async (item) => {
			if (injection?.onRepairItem) {
				await injection.onRepairItem(item);
				return;
			}
			if (injection?.onConnectItem) {
				await injection.onConnectItem(item);
				return;
			}
			await handleRepair(toConnectorConfig(item));
		};
		const handleInjectedCancelClick = (item, config, isLocal) => {
			if (injection?.onCancelConnect) {
				Promise.resolve(injection.onCancelConnect(item)).catch(() => void 0);
				return;
			}
			if (!isLocal) return;
			handleCancelConnect(config).catch(() => void 0);
		};
		/**
		* 单行点击：按 bound/enabled/pending 分发（plan §2.3 阶梯）：
		*   - bound=false, pending=false：触发首次授权（needsAuth=true）
		*   - bound=false, pending=true：首次授权进行中，onClick 被吞掉（点击红色「取消连接」
		*     时走独立的 onCancelClick 路径）
		*   - bound=true, enabled=true：toggle off 即关闭开关
		*   - bound=true, enabled=false：toggle on 重新启用（复用授权缓存）
		*   - bound=true, pending=true：视觉上是「瞬时打开」的 toggle，再次点击直接走关闭
		*     （Issue #47914：已绑定的 connector 重启复用授权缓存，UI 视觉等价于已开启）
		*/
		const handleItemClick = (connector) => {
			const displayState = getDisplayState(connector.id);
			const enabled = isConnectorMenuOn(displayState);
			const bound = isConnectorBound(displayState);
			const pending = isConnectorPending(displayState);
			const isIncompatible = isConnectorVersionIncompatible(connector);
			if (!((!pending || bound) && (!isIncompatible || enabled))) return;
			toggleConnector(connector, !enabled).catch(() => void 0);
		};
		if (injectedItems) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: connectors_module_default.panel,
			role: "menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(WbSearchInput, {
					value: keyword,
					onChange: setKeyword,
					placeholder: t("input.wbAdd.connectors.searchPlaceholder"),
					clearAriaLabel: t("input.wbAdd.connectors.searchClear")
				}),
				(injectedDisplayItems?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.empty,
					children: isSearching ? t("input.wbAdd.connectors.noResult") : t("input.wbAdd.connectors.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.list,
					children: injectedDisplayItems?.map((item) => {
						const itemKey = injectedItemKey(item);
						const isLocal = item.source === "local";
						const mcpState = mcpStates[item.id];
						const rowPending = resolveInjectedRowPending(item, mcpState);
						const rowEnabled = (typeof item.enabled === "boolean" ? item.enabled : void 0) ?? (mcpState ? isConnectorMenuOn(mcpState) : false);
						const rowBound = !!(item.everConnected ?? item.isConnected);
						const config = toConnectorConfig(item);
						const row = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ConnectorRow, {
							connector: config,
							bound: rowBound,
							enabled: rowEnabled,
							pending: rowPending,
							isCancellable: item.isCancellable ?? (isLocal && cancellableMcpIds.has(item.id)),
							isIncompatible: false,
							reasonText: item.errorText,
							reasonAction: item.errorKind,
							onErrorRetryClick: () => {
								handleInjectedRetryClick(item).catch(() => void 0);
							},
							disabled: item.canToggle === false,
							tag: item.tag,
							onClick: () => {
								handleInjectedItemClick(item).catch(() => void 0);
							},
							onCancelClick: () => handleInjectedCancelClick(item, config, isLocal)
						}, itemKey);
						return item.canToggle === false && item.disabledReason ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Tooltip$1, {
							content: item.disabledReason,
							placement: "top",
							children: row
						}, itemKey) : row;
					})
				}),
				injection?.onSummonMore && !injection?.hideManageEntry && /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.divider,
					role: "separator"
				}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.footer,
					children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
						className: connectors_module_default.footerItem,
						role: "menuitem",
						onClick: handleSummonMore,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
							className: connectors_module_default.footerIcon,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(JumpIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
							className: connectors_module_default.footerLabel,
							children: t("input.wbAdd.connectors.summonMore")
						})]
					})
				})] })
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(import_jsx_runtime$12.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: connectors_module_default.panel,
			role: "menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(WbSearchInput, {
					value: keyword,
					onChange: setKeyword,
					placeholder: t("input.wbAdd.connectors.searchPlaceholder"),
					clearAriaLabel: t("input.wbAdd.connectors.searchClear")
				}),
				items.length === 0 && allVisible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.empty,
					children: t("input.wbAdd.connectors.empty")
				}) : orderedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.empty,
					children: t("input.wbAdd.connectors.noResult")
				}) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.list,
					children: orderedItems.map((connector) => {
						const view = toConnectorRowView(getDisplayState(connector.id));
						const isCancellable = cancellableMcpIds.has(connector.id);
						const isIncompatible = isConnectorVersionIncompatible(connector);
						const incompatLabel = getConnectorVersionIncompatibilityLabel(connector);
						const row = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ConnectorRow, {
							connector,
							bound: view.everConnected,
							enabled: view.enabled,
							pending: view.pending,
							isCancellable,
							isIncompatible,
							reasonText: view.errorText,
							reasonAction: view.errorKind,
							onErrorRetryClick: () => {
								repairConnector(connector).catch(() => void 0);
							},
							onClick: () => handleItemClick(connector),
							onCancelClick: () => {
								cancelConnector(connector).catch(() => void 0);
							}
						}, connector.id);
						return isIncompatible ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Tooltip$1, {
							content: incompatLabel,
							placement: "top",
							children: row
						}, connector.id) : row;
					})
				}),
				injection?.onSummonMore && !injection?.hideManageEntry && /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.divider,
					role: "separator"
				}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: connectors_module_default.footer,
					children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
						className: connectors_module_default.footerItem,
						role: "menuitem",
						onClick: handleSummonMore,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
							className: connectors_module_default.footerIcon,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(JumpIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
							className: connectors_module_default.footerLabel,
							children: t("input.wbAdd.connectors.summonMore")
						})]
					})
				})] })
			]
		}) });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/connectors/index.ts
var init_connectors = __esmMin((() => {
	init_connectors_submenu();
	init_use_connectors();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/expert-normalize.ts
function readString(value) {
	return typeof value === "string" ? value.trim() : "";
}
function pickLocaleText$1(value, locale) {
	if (typeof value === "string") return value.trim();
	if (!value || typeof value !== "object") return "";
	const record = value;
	return readString(record[locale]) || readString(record.zh) || readString(record.en);
}
function getExpertMenuDisplayName(expert) {
	return readString(expert.profession) || readString(expert.name) || readString(expert.id);
}
function normalizeExpertToMenuItem(raw, locale, defaults) {
	const id = readString(raw.id) || readString(raw.expertId) || readString(defaults?.id);
	if (!id) return null;
	const name = pickLocaleText$1(raw.displayName, locale) || pickLocaleText$1(raw.name, locale) || readString(defaults?.name) || id;
	const profession = pickLocaleText$1(raw.profession, locale) || readString(defaults?.profession);
	const description = pickLocaleText$1(raw.description, locale);
	const avatarUrl = resolveAvatarUrl(readString(raw.avatarUrl) || readString(raw.avatar) || readString(defaults?.avatarUrl));
	const pluginName = readString(raw.pluginName) || readString(raw.plugin) || readString(defaults?.pluginName);
	const updatedAt = readString(raw.updatedAt) || readString(defaults?.updatedAt);
	const defaultInitPrompt = pickLocaleText$1(raw.defaultInitPrompt, locale) || readString(defaults?.defaultInitPrompt);
	const expertType = raw.expertType === "team" ? "team" : raw.expertType === "skill" ? "skill" : raw.expertType === "plugin" ? "plugin" : "agent";
	const source = raw.source === "custom" ? "custom" : raw.source === "enterprise" ? "enterprise" : raw.source === "builtin" ? "builtin" : defaults?.source;
	const marketplace = readString(raw.marketplace) || readString(defaults?.marketplace);
	const agentName = readString(raw.agentName) || readString(defaults?.agentName);
	const categoryId = readString(raw.categoryId) || readString(raw.industryId) || readString(defaults?.categoryId) || readString(defaults?.industryId);
	const leader = readString(raw.leader) || readString(defaults?.leader);
	const members = Array.isArray(raw.members) ? raw.members : defaults?.members;
	const downloadUrl = readString(raw.downloadUrl) || readString(defaults?.downloadUrl);
	const marketExpertId = readString(raw.marketExpertId) || readString(raw.expert_id) || readString(defaults?.marketExpertId);
	const quickPrompts = Array.isArray(raw.quickPrompts) ? raw.quickPrompts : defaults?.quickPrompts;
	const expertRootDir = readString(raw.expertRootDir) || readString(defaults?.expertRootDir);
	const isCustomExpert = raw.isCustomExpert === true || defaults?.isCustomExpert === true || marketplace === "my-experts";
	const visibleName = getExpertMenuDisplayName({
		id,
		name,
		profession
	});
	return {
		id,
		name,
		profession,
		avatarUrl,
		summonedAt: defaults?.summonedAt ?? 0,
		defaultInitPrompt: defaultInitPrompt || void 0,
		pluginName: pluginName || void 0,
		updatedAt: updatedAt || void 0,
		expertType,
		industryId: categoryId || void 0,
		source,
		marketplace: marketplace || void 0,
		agentName: agentName || void 0,
		categoryId: categoryId || void 0,
		leader: leader || void 0,
		members,
		downloadUrl: downloadUrl || void 0,
		marketExpertId: marketExpertId || void 0,
		quickPrompts,
		expertRootDir: expertRootDir || void 0,
		isCustomExpert,
		description,
		searchText: visibleName.toLowerCase()
	};
}
function dedupeExpertMenuItems(items) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const item of items) {
		if (seen.has(item.id)) continue;
		seen.add(item.id);
		result.push(item);
	}
	return result;
}
var init_expert_normalize = __esmMin((() => {
	init_expert();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/experts.module.scss
var panel$2, searchBox, list$1, scrollList, searchList, item$3, selected, disabled$3, avatar$1, name$1, actions, checkSlot, pinButton, pinned$1, pinIconRest$1, pinIconHover$1, divider$2, summonMore, summonMoreIcon, summonMoreLabel, empty$1, experts_module_default;
var init_experts_module = __esmMin((() => {
	panel$2 = "_panel_1fkw5_17";
	searchBox = "_searchBox_1fkw5_34";
	list$1 = "_list_1fkw5_39";
	scrollList = "_scrollList_1fkw5_69";
	searchList = "_searchList_1fkw5_70";
	item$3 = "_item_1fkw5_76";
	selected = "_selected_1fkw5_87";
	disabled$3 = "_disabled_1fkw5_87";
	avatar$1 = "_avatar_1fkw5_99";
	name$1 = "_name_1fkw5_121";
	actions = "_actions_1fkw5_137";
	checkSlot = "_checkSlot_1fkw5_151";
	pinButton = "_pinButton_1fkw5_161";
	pinned$1 = "_pinned_1fkw5_179";
	pinIconRest$1 = "_pinIconRest_1fkw5_189";
	pinIconHover$1 = "_pinIconHover_1fkw5_190";
	divider$2 = "_divider_1fkw5_215";
	summonMore = "_summonMore_1fkw5_222";
	summonMoreIcon = "_summonMoreIcon_1fkw5_236";
	summonMoreLabel = "_summonMoreLabel_1fkw5_246";
	empty$1 = "_empty_1fkw5_258";
	experts_module_default = {
		panel: panel$2,
		searchBox,
		list: list$1,
		scrollList,
		searchList,
		item: item$3,
		selected,
		disabled: disabled$3,
		avatar: avatar$1,
		name: name$1,
		actions,
		checkSlot,
		pinButton,
		pinned: pinned$1,
		pinIconRest: pinIconRest$1,
		pinIconHover: pinIconHover$1,
		divider: divider$2,
		summonMore,
		summonMoreIcon,
		summonMoreLabel,
		empty: empty$1
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/expert-search-cache.ts
function readTrimmedString(value, fallback) {
	return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
function getExpertSearchCacheKey(host, scope = "default") {
	const locale = toZhEnLocale(getLocale());
	const enterpriseId = readTrimmedString(host.accountInfo?.enterpriseId, "personal");
	const userId = readTrimmedString(host.accountInfo?.userId, "anonymous");
	const accountType = readTrimmedString(host.accountInfo?.type, "unknown");
	return `${SEARCH_CACHE_VERSION}:${scope}:${enterpriseId}:${userId}:${accountType}:${locale}`;
}
function normalizeList(rawList, locale, defaults) {
	return (rawList ?? []).map((item) => item && typeof item === "object" ? normalizeExpertToMenuItem(item, locale, defaults) : null).filter((item) => Boolean(item));
}
async function loadExpertPages(scope, params) {
	const api = createExpertApi({ scope });
	const items = [];
	let total;
	for (let page = 1;; page++) {
		const result = await api.listExperts({
			...params,
			page,
			pageSize: EXPERT_SEARCH_PAGE_SIZE
		});
		const pageItems = result?.items ?? [];
		items.push(...pageItems);
		total = normalizeExpertListTotal(result?.total) ?? total;
		if (shouldStopExpertListPagination({
			page,
			pageItemCount: pageItems.length,
			loadedCount: items.length,
			total
		})) break;
	}
	return items;
}
async function loadBuiltinAgents(_host, locale, scope) {
	return normalizeList(await loadExpertPages(scope, {
		categoryId: null,
		source: "builtin"
	}), locale, { source: "builtin" });
}
async function loadBuiltinTeams(_host, locale, scope) {
	return normalizeList(await loadExpertPages(scope, {
		categoryId: null,
		source: "builtin",
		expertType: "team"
	}), locale, {
		source: "builtin",
		expertType: "team"
	});
}
async function loadEnterpriseExperts(host, locale, scope) {
	if (!host.accountInfo?.enterpriseId) return [];
	return normalizeList(await loadExpertPages(scope, {
		categoryId: null,
		source: "enterprise"
	}), locale, { source: "enterprise" });
}
async function loadMyExperts(_host, locale, scope) {
	if (scope === "cloud-in-local") return [];
	return normalizeList((await createExpertApi({ scope }).listCustomExperts())?.items ?? [], locale, {
		source: "custom",
		marketplace: "my-experts",
		isCustomExpert: true
	});
}
async function loadSearchPool(host, locale, scope) {
	const segments = [
		{
			name: "my-experts",
			load: () => loadMyExperts(host, locale, scope)
		},
		{
			name: "enterprise",
			load: () => loadEnterpriseExperts(host, locale, scope)
		},
		{
			name: "builtin-agents",
			load: () => loadBuiltinAgents(host, locale, scope)
		},
		{
			name: "builtin-teams",
			load: () => loadBuiltinTeams(host, locale, scope)
		}
	];
	const settled = await Promise.allSettled(segments.map((segment) => segment.load()));
	const fulfilled = [];
	const failedSegments = [];
	settled.forEach((result, index) => {
		if (result.status === "fulfilled") {
			fulfilled.push(result.value);
			return;
		}
		const segmentName = segments[index].name;
		failedSegments.push(segmentName);
		const reason = result.reason instanceof Error ? result.reason.message : String(result.reason);
		console.warn(`[ExpertSearch] load ${segmentName} failed:`, reason);
	});
	if (fulfilled.length === 0) throw new Error("All expert search segments failed");
	return {
		pool: dedupeExpertMenuItems(fulfilled.flat()),
		degraded: failedSegments.length > 0,
		failedSegments
	};
}
function preloadExpertSearchPool(host, scope = "default") {
	const locale = toZhEnLocale(getLocale());
	const cacheKey = getExpertSearchCacheKey(host, scope);
	const cached = searchCache.get(cacheKey);
	if (cached?.pool.length) return Promise.resolve(getCachedExpertSearchState(host, scope));
	if (cached?.promise) return cached.promise;
	const previousState = cached ?? {
		pool: [],
		degraded: false,
		failedSegments: []
	};
	const promise = loadSearchPool(host, locale, scope).then((result) => {
		searchCache.set(cacheKey, result);
		return result;
	}).catch((error) => {
		searchCache.set(cacheKey, previousState);
		throw error;
	});
	searchCache.set(cacheKey, {
		...previousState,
		promise
	});
	return promise;
}
function getCachedExpertSearchState(host, scope = "default") {
	const cached = searchCache.get(getExpertSearchCacheKey(host, scope));
	return {
		pool: cached?.pool ?? [],
		degraded: cached?.degraded ?? false,
		failedSegments: cached?.failedSegments ?? []
	};
}
var searchCache, SEARCH_CACHE_VERSION, EXPERT_SEARCH_PAGE_SIZE;
var init_expert_search_cache = __esmMin((() => {
	init_i18n();
	init_expert_api();
	init_expert_list_pagination();
	init_expert_normalize();
	searchCache = /* @__PURE__ */ new Map();
	SEARCH_CACHE_VERSION = "visible-name-v2";
	EXPERT_SEARCH_PAGE_SIZE = 100;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/use-expert-search.ts
function normalizeKeyword(keyword) {
	return keyword.trim().toLowerCase();
}
function matchesKeyword(item, keyword) {
	if (!keyword) return false;
	return (typeof item.searchText === "string" && item.searchText.trim() ? item.searchText : getExpertMenuDisplayName(item).toLowerCase()).includes(keyword);
}
/** 搜索专家池：首次 focus / 输入时懒加载，模块级缓存避免同账号同语言重复请求。 */
function useExpertSearch(keyword, enabled, priorityItems = [], scope = "default") {
	const host = useModuleHost();
	const normalizedKeyword = (0, import_react$18.useMemo)(() => normalizeKeyword(keyword), [keyword]);
	const cacheKey = getExpertSearchCacheKey(host, scope);
	const cacheKeyRef = (0, import_react$18.useRef)(cacheKey);
	const [pool, setPool] = (0, import_react$18.useState)(() => getCachedExpertSearchState(host, scope).pool);
	const [isLoading, setIsLoading] = (0, import_react$18.useState)(false);
	const [errorReason, setErrorReason] = (0, import_react$18.useState)(null);
	(0, import_react$18.useEffect)(() => {
		cacheKeyRef.current = cacheKey;
		setPool(getCachedExpertSearchState(host, scope).pool);
		setIsLoading(false);
		setErrorReason(null);
	}, [
		host,
		cacheKey,
		scope
	]);
	const preload = (0, import_react$18.useCallback)(() => {
		if (!enabled) return;
		const requestCacheKey = getExpertSearchCacheKey(host, scope);
		const cached = getCachedExpertSearchState(host, scope);
		if (cached.pool.length > 0) {
			setPool(cached.pool);
			setErrorReason(null);
			return;
		}
		setIsLoading(true);
		setErrorReason(null);
		preloadExpertSearchPool(host, scope).then((result) => {
			if (cacheKeyRef.current === requestCacheKey) {
				setPool(result.pool);
				setErrorReason(null);
			}
		}).catch(() => {
			if (cacheKeyRef.current === requestCacheKey) setErrorReason("load_failed");
		}).finally(() => {
			if (cacheKeyRef.current === requestCacheKey) setIsLoading(false);
		});
	}, [
		enabled,
		host,
		scope
	]);
	(0, import_react$18.useEffect)(() => {
		if (!enabled || !normalizedKeyword) return;
		const timer = window.setTimeout(preload, 150);
		return () => window.clearTimeout(timer);
	}, [
		enabled,
		normalizedKeyword,
		preload
	]);
	const searchablePool = (0, import_react$18.useMemo)(() => dedupeExpertMenuItems([...priorityItems, ...pool]), [priorityItems, pool]);
	return {
		results: (0, import_react$18.useMemo)(() => {
			if (!enabled || !normalizedKeyword) return [];
			return searchablePool.filter((item) => matchesKeyword(item, normalizedKeyword));
		}, [
			enabled,
			normalizedKeyword,
			searchablePool
		]),
		isLoading,
		errorReason,
		preload
	};
}
var import_react$18;
var init_use_expert_search = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_common();
	init_expert_normalize();
	init_expert_search_cache();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/use-experts-suggestions.ts
function notifyCacheListeners() {
	cacheListeners.forEach((fn) => {
		try {
			fn();
		} catch {}
	});
}
/** display_position 合法（>=1 整数）才参与钉位。 */
function getPinnedDisplayPosition(displayPosition) {
	if (!Number.isFinite(displayPosition)) return null;
	const normalized = Math.floor(displayPosition);
	return normalized >= 1 ? normalized : null;
}
/**
* 「最热」排序 —— 与专家中心 `sortExpertsByPopularityWithPinnedPositions`（pages/center/index.tsx）
* 逐行同源：
*   - 有合法 `displayPosition` 的专家按运营钉位插到目标位置（同位冲突顺延到下一空位）。
*   - 其余专家按 useCountMap 使用次数降序填充剩余空位。
*   - 没有任何钉位时退化为纯使用次数降序。
*/
function sortBuiltinByPopularity(experts, useCountMap) {
	if (experts.length <= 1) return experts;
	const byUseCount = (a, b) => (useCountMap.get(b.id) ?? 0) - (useCountMap.get(a.id) ?? 0);
	const pinnedExperts = experts.map((expert, index) => ({
		expert,
		index
	})).filter(({ expert }) => getPinnedDisplayPosition(expert.displayPosition) !== null).sort((a, b) => {
		const positionDiff = (getPinnedDisplayPosition(a.expert.displayPosition) ?? Number.MAX_SAFE_INTEGER) - (getPinnedDisplayPosition(b.expert.displayPosition) ?? Number.MAX_SAFE_INTEGER);
		return positionDiff !== 0 ? positionDiff : a.index - b.index;
	});
	if (pinnedExperts.length === 0) return [...experts].sort(byUseCount);
	const pinnedIds = new Set(pinnedExperts.map(({ expert }) => expert.id));
	const remainingExperts = experts.filter((expert) => !pinnedIds.has(expert.id)).sort(byUseCount);
	const positionedExperts = new Array(experts.length).fill(void 0);
	for (const { expert } of pinnedExperts) {
		let insertIndex = Math.min(experts.length - 1, Math.max(0, (getPinnedDisplayPosition(expert.displayPosition) ?? 1) - 1));
		while (insertIndex < positionedExperts.length && positionedExperts[insertIndex]) insertIndex += 1;
		if (insertIndex >= positionedExperts.length) insertIndex = positionedExperts.findIndex((item) => !item);
		if (insertIndex !== -1) positionedExperts[insertIndex] = expert;
	}
	let remainingIndex = 0;
	return positionedExperts.map((item) => {
		if (item) return item;
		const nextExpert = remainingExperts[remainingIndex];
		remainingIndex += 1;
		return nextExpert;
	}).filter((expert) => Boolean(expert));
}
/**
* 解析使用次数 map —— 与专家中心 `useExpertUseCountMap` 字面同源：
*   - 优先用列表接口返回的 `useCount`；
*   - builtin / COS 列表缺失 `useCount` 时，回退调 `getRanking` 拿热度排行。
*/
async function resolveUseCountMap(list, scope) {
	const fromList = /* @__PURE__ */ new Map();
	for (const e of list) if (e.id && Number.isFinite(e.useCount)) fromList.set(e.id, e.useCount);
	if (fromList.size > 0) return fromList;
	try {
		const res = await createExpertApi({ scope }).listExperts({
			sort: "usage",
			limit: Math.max(list.length, 20)
		});
		const items = res && "items" in res ? res.items : [];
		const ranked = /* @__PURE__ */ new Map();
		const validIds = new Set(list.map((e) => e.id).filter(Boolean));
		for (const item of items) if (item.id && validIds.has(item.id) && Number.isFinite(item.useCount)) ranked.set(item.id, item.useCount);
		return ranked;
	} catch {
		return fromList;
	}
}
/** 解析 I18nText -> 当前 locale 字符串。 */
function pickLocaleText(value, locale) {
	if (!value) return "";
	if (typeof value === "string") return value;
	return value[locale] ?? value.zh ?? value.en ?? "";
}
/**
* 把 Market expert 映射成 RecentExpert 形态，方便统一渲染（含 host onSelect 调用约定）。
*
* `summonedAt` 用 0 标记"非真实召唤"（仅用于排序），UI 不展示时间。
*/
function toRecentLike(item, locale) {
	const name = pickLocaleText(item.displayName, locale) || pickLocaleText(item.name, locale) || item.id;
	const profession = pickLocaleText(item.profession, locale);
	return {
		id: item.id,
		name,
		profession,
		avatarUrl: resolveAvatarUrl(item.avatarUrl ?? item.avatar ?? ""),
		summonedAt: 0,
		industryId: item.categoryId,
		defaultInitPrompt: pickLocaleText(item.defaultInitPrompt, locale) || void 0,
		pluginName: item.pluginName ?? item.plugin,
		expertType: item.expertType,
		updatedAt: item.updatedAt,
		categoryId: item.categoryId,
		leader: item.leader,
		members: item.members,
		downloadUrl: item.downloadUrl,
		marketExpertId: item.marketExpertId,
		quickPrompts: item.quickPrompts,
		expertRootDir: item.expertRootDir
	};
}
function getRecommendedCacheKey(scope, enterpriseId, applicationId, templateId) {
	return `${scope}:${enterpriseId ?? ""}:${applicationId ?? "general"}:${templateId ?? ""}`;
}
async function fetchRecommendedPool(host, scope, templateId) {
	if (templateId) return await fetchBuddyAppDefaultExperts(wb.experts, templateId);
	return fetchBuiltinPool(host, scope);
}
/** 单次拉取 builtin 池（按 facade 默认热门顺序；必要时用 usage 排行补齐）。 */
async function fetchBuiltinPool(_host, scope) {
	try {
		const list = (await createExpertApi({ scope }).listMarketExperts({
			source: "builtin",
			sortBy: "use_count",
			sortOrder: "desc",
			page: 1,
			pageSize: 50
		})).items ?? [];
		return sortBuiltinByPopularity(list, await resolveUseCountMap(list, scope));
	} catch (err) {
		console.warn("[wb-input-add/experts] market.list failed:", String(err));
		return [];
	}
}
/**
* 预热推荐池 —— 推荐在加号一级菜单 mount 时调用，让 hover 二级面板时已经有数据。
*
* 多次调用安全：同一 enterpriseId 下只发一次 HTTP，后续 await 同一个 promise。
*/
function prefetchExpertsSuggestions(host, scope = "default") {
	const buddy = getCurrentBuddyApplication();
	const cacheKey = getRecommendedCacheKey(scope, host.accountInfo?.enterpriseId, buddy?.applicationId, buddy?.templateId);
	const cached = recommendedCache.get(cacheKey);
	if (cached?.pool.length) return Promise.resolve();
	if (cached?.promise) return cached.promise.then(() => void 0);
	const promise = fetchRecommendedPool(host, scope, buddy?.templateId).then((pool) => {
		recommendedCache.set(cacheKey, {
			pool,
			promise: void 0
		});
		notifyCacheListeners();
		return pool;
	});
	recommendedCache.set(cacheKey, {
		pool: cached?.pool ?? [],
		promise
	});
	return promise.then(() => void 0);
}
/**
* 合并置顶 + 最近召唤 + builtin 推荐，按新版专家菜单规则产出列表。
*
* - 置顶：全部展示，按置顶时间倒序（上游已排序）。
* - 最近召唤：排除置顶后最多展示 5 条。
* - 推荐补足：仅当置顶 + 最近合计不足 5 条时使用 builtin 推荐池，排除置顶与 recent。
*/
function useExpertsSuggestions(recentExperts, disableRecommended, pinnedExperts, scope = "default") {
	const host = useModuleHost();
	const { applicationId, templateId, ready: buddyScopeReady } = useBuddyApplicationScope();
	const cacheKey = getRecommendedCacheKey(scope, host.accountInfo?.enterpriseId, buddyScopeReady ? applicationId : void 0, buddyScopeReady ? templateId : void 0);
	const locale = toZhEnLocale(getLocale());
	const [, forceRender] = (0, import_react$17.useState)(0);
	(0, import_react$17.useEffect)(() => {
		const fn = () => forceRender((v) => v + 1);
		cacheListeners.add(fn);
		return () => {
			cacheListeners.delete(fn);
		};
	}, []);
	const pinnedItems = (0, import_react$17.useMemo)(() => disableRecommended ? [] : pinnedExperts ?? [], [disableRecommended, pinnedExperts]);
	const recentItems = (0, import_react$17.useMemo)(() => {
		const pinnedIds = new Set(pinnedItems.map((expert) => expert.id));
		const result = [];
		const seen = /* @__PURE__ */ new Set();
		for (const expert of recentExperts ?? []) {
			if (pinnedIds.has(expert.id) || seen.has(expert.id)) continue;
			seen.add(expert.id);
			result.push(expert);
			if (!disableRecommended && result.length >= MAX_DISPLAY) break;
		}
		return result;
	}, [
		disableRecommended,
		pinnedItems,
		recentExperts
	]);
	const filledCount = pinnedItems.length + recentItems.length;
	const recommendedLimit = Math.max(0, MAX_DISPLAY - filledCount);
	const needRecommended = !disableRecommended && recommendedLimit > 0;
	(0, import_react$17.useEffect)(() => {
		if (!needRecommended || applicationId && !buddyScopeReady) return;
		const cached = recommendedCache.get(cacheKey);
		if (cached?.pool.length) return;
		if (cached?.promise) return;
		prefetchExpertsSuggestions(host, scope).catch(() => void 0);
	}, [
		host,
		cacheKey,
		needRecommended,
		scope,
		applicationId,
		buddyScopeReady,
		templateId
	]);
	const recommendedPool = needRecommended && !(applicationId && !buddyScopeReady) ? recommendedCache.get(cacheKey)?.pool ?? [] : [];
	const isFetching = needRecommended && !!recommendedCache.get(cacheKey)?.promise;
	const recommendedItems = (0, import_react$17.useMemo)(() => {
		if (!needRecommended) return [];
		const seen = new Set([...pinnedItems, ...recentItems].map((expert) => expert.id));
		const result = [];
		for (const item of recommendedPool) {
			if (seen.has(item.id)) continue;
			seen.add(item.id);
			result.push(toRecentLike(item, locale));
			if (result.length >= recommendedLimit) break;
		}
		return result;
	}, [
		needRecommended,
		pinnedItems,
		recentItems,
		recommendedPool,
		locale,
		recommendedLimit
	]);
	const items = (0, import_react$17.useMemo)(() => [
		...pinnedItems,
		...recentItems,
		...recommendedItems
	], [
		pinnedItems,
		recentItems,
		recommendedItems
	]);
	return {
		pinnedItems,
		recentItems,
		recommendedItems,
		items,
		shouldScroll: items.length > MAX_VISIBLE_WITHOUT_SCROLL,
		isLoading: items.length === 0 && isFetching && needRecommended
	};
}
var import_react$17, MAX_DISPLAY, MAX_VISIBLE_WITHOUT_SCROLL, recommendedCache, cacheListeners;
var init_use_experts_suggestions = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_i18n();
	init_common();
	init_buddy_app_default_experts();
	init_expert_api();
	init_avatar_url$1();
	init_current_buddy_application();
	MAX_DISPLAY = 5;
	MAX_VISIBLE_WITHOUT_SCROLL = 10;
	recommendedCache = /* @__PURE__ */ new Map();
	cacheListeners = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/pinned-experts-storage.ts
function buildPinnedExpertsStorageKey(scopeKey, scope, applicationId) {
	const base = `${PINNED_EXPERTS_KEY_PREFIX}.${scope}.${scopeKey}`;
	const appId = typeof applicationId === "string" ? applicationId.trim() : "";
	return appId ? `${base}.app.${appId}` : base;
}
var PINNED_EXPERTS_KEY_PREFIX;
var init_pinned_experts_storage = __esmMin((() => {
	PINNED_EXPERTS_KEY_PREFIX = "agent-ui.expert-picker.pinned";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/use-pinned-experts.ts
function readRecords(storageKey) {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(storageKey);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((record) => record && typeof record === "object" && typeof record.id === "string" && typeof record.pinnedAt === "number").map((record) => ({
			id: record.id,
			pinnedAt: record.pinnedAt
		}));
	} catch {
		return [];
	}
}
function writeRecords(storageKey, records) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(storageKey, JSON.stringify(records));
	} catch {}
}
function sortRecords(records) {
	return [...records].sort((a, b) => b.pinnedAt - a.pinnedAt);
}
function sameRecords(a, b) {
	return a.length === b.length && a.every((record, index) => record.id === b[index]?.id && record.pinnedAt === b[index]?.pinnedAt);
}
function buildExpertMap(candidates, searchPool, transientExperts) {
	const map = /* @__PURE__ */ new Map();
	transientExperts.forEach((expert, id) => map.set(id, expert));
	searchPool.forEach((expert) => map.set(expert.id, expert));
	candidates.forEach((expert) => map.set(expert.id, expert));
	return map;
}
function createUnresolvedPinnedExpert(record) {
	return {
		id: record.id,
		name: record.id,
		profession: "",
		avatarUrl: "",
		summonedAt: record.pinnedAt
	};
}
/** 管理专家下拉置顶状态；localStorage 只存 id+pinnedAt，展示元数据始终用最新列表反查。 */
function usePinnedExperts(enabled, candidates = [], scope = "default") {
	const host = useModuleHost();
	const applicationId = useSelectedIndustryTemplate()?.applicationId?.trim() || void 0;
	const scopeKey = (0, import_react$16.useMemo)(() => getRecentExpertsScopeKey({
		enterpriseId: host.accountInfo?.enterpriseId,
		userId: host.accountInfo?.userId,
		type: host.accountInfo?.type
	}), [
		host.accountInfo?.enterpriseId,
		host.accountInfo?.type,
		host.accountInfo?.userId
	]);
	const storageKey = (0, import_react$16.useMemo)(() => buildPinnedExpertsStorageKey(scopeKey, scope, applicationId), [
		applicationId,
		scope,
		scopeKey
	]);
	const searchCacheKey = getExpertSearchCacheKey(host, scope);
	const [records, setRecords] = (0, import_react$16.useState)(() => enabled ? sortRecords(readRecords(storageKey)) : []);
	const [searchPool, setSearchPool] = (0, import_react$16.useState)(() => getCachedExpertSearchState(host, scope).pool);
	const [searchPoolReady, setSearchPoolReady] = (0, import_react$16.useState)(() => getCachedExpertSearchState(host, scope).pool.length > 0);
	const [searchPoolDegraded, setSearchPoolDegraded] = (0, import_react$16.useState)(() => getCachedExpertSearchState(host, scope).degraded);
	const [transientExperts, setTransientExperts] = (0, import_react$16.useState)(() => /* @__PURE__ */ new Map());
	(0, import_react$16.useEffect)(() => {
		const nextRecords = enabled ? sortRecords(readRecords(storageKey)) : [];
		setRecords(nextRecords);
		if (enabled) writeRecords(storageKey, nextRecords);
		setTransientExperts(/* @__PURE__ */ new Map());
		const cachedState = getCachedExpertSearchState(host, scope);
		setSearchPool(cachedState.pool);
		setSearchPoolReady(cachedState.pool.length > 0);
		setSearchPoolDegraded(cachedState.degraded);
	}, [
		enabled,
		host,
		searchCacheKey,
		scope,
		storageKey
	]);
	const persist = (0, import_react$16.useCallback)((nextRecords) => {
		const sorted = sortRecords(nextRecords);
		setRecords(sorted);
		writeRecords(storageKey, sorted);
	}, [storageKey]);
	(0, import_react$16.useEffect)(() => {
		if (!enabled || records.length === 0) return;
		const cachedState = getCachedExpertSearchState(host, scope);
		if (cachedState.pool.length > 0) {
			setSearchPool(cachedState.pool);
			setSearchPoolReady(true);
			setSearchPoolDegraded(cachedState.degraded);
			return;
		}
		let cancelled = false;
		preloadExpertSearchPool(host, scope).then((result) => {
			if (!cancelled) {
				setSearchPool(result.pool);
				setSearchPoolReady(result.pool.length > 0);
				setSearchPoolDegraded(result.degraded);
			}
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [
		enabled,
		host,
		records.length,
		searchCacheKey,
		scope
	]);
	const expertById = (0, import_react$16.useMemo)(() => buildExpertMap(candidates, searchPool, transientExperts), [
		candidates,
		searchPool,
		transientExperts
	]);
	(0, import_react$16.useEffect)(() => {
		if (!enabled || !searchPoolReady || searchPoolDegraded || searchPool.length === 0 || records.length === 0) return;
		const nextRecords = records.filter((record) => expertById.has(record.id));
		if (!sameRecords(records, nextRecords)) persist(nextRecords);
	}, [
		enabled,
		expertById,
		persist,
		records,
		searchPool.length,
		searchPoolDegraded,
		searchPoolReady
	]);
	const isPinned = (0, import_react$16.useCallback)((expertId) => records.some((record) => record.id === expertId), [records]);
	const togglePinned = (0, import_react$16.useCallback)((expert) => {
		if (!enabled) return;
		const exists = records.some((record) => record.id === expert.id);
		setTransientExperts((prev) => {
			const next = new Map(prev);
			if (exists) next.delete(expert.id);
			else next.set(expert.id, expert);
			return next;
		});
		const nextRecords = exists ? records.filter((record) => record.id !== expert.id) : [{
			id: expert.id,
			pinnedAt: Date.now()
		}, ...records.filter((record) => record.id !== expert.id)];
		persist(nextRecords);
	}, [
		enabled,
		persist,
		records
	]);
	return {
		pinnedExperts: (0, import_react$16.useMemo)(() => records.map((record) => expertById.get(record.id) ?? createUnresolvedPinnedExpert(record)), [expertById, records]),
		isPinned,
		togglePinned
	};
}
var import_react$16;
var init_use_pinned_experts = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_common();
	init_expert();
	init_hooks();
	init_expert_search_cache();
	init_pinned_experts_storage();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/experts-submenu.tsx
var import_classnames$9, import_react$15, import_jsx_runtime$11, SummonMoreIcon, ExpertsSubmenu, ExpertRow, ExpertAvatar$1;
var init_experts_submenu = __esmMin((() => {
	init_src();
	import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_expert();
	init_wb_search_panel();
	init_icons$1();
	init_expert_normalize();
	init_experts_module();
	init_use_expert_search();
	init_use_experts_suggestions();
	init_use_pinned_experts();
	import_jsx_runtime$11 = require_jsx_runtime();
	SummonMoreIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", {
			d: "M5 4.5h6.5V11",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", {
			d: "M11.5 4.5L4.5 11.5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	ExpertsSubmenu = ({ injection, onCloseMenu }) => {
		const t = useTranslation();
		const selectedId = injection?.selectedExpertId ?? null;
		const expertScope = injection?.expertScope ?? "default";
		const enhancedEnabled = !injection?.disableRecommended;
		const [keyword, setKeyword] = (0, import_react$15.useState)("");
		const [searchKeyword, setSearchKeyword] = (0, import_react$15.useState)("");
		const isComposingRef = (0, import_react$15.useRef)(false);
		const trimmedKeyword = searchKeyword.trim();
		const isSearching = enhancedEnabled && trimmedKeyword.length > 0;
		const handleKeywordChange = (next) => {
			setKeyword(next);
			if (!isComposingRef.current) setSearchKeyword(next);
		};
		const handleCompositionStart = () => {
			isComposingRef.current = true;
		};
		const handleCompositionEnd = (event) => {
			isComposingRef.current = false;
			setSearchKeyword(event.currentTarget.value);
		};
		const { pinnedExperts, isPinned, togglePinned } = usePinnedExperts(enhancedEnabled, injection?.recentExperts ?? [], expertScope);
		const { items, shouldScroll } = useExpertsSuggestions(injection?.recentExperts, injection?.disableRecommended, pinnedExperts, expertScope);
		const { results: searchResults, isLoading: searchLoading, errorReason: searchErrorReason, preload } = useExpertSearch(searchKeyword, enhancedEnabled, items, expertScope);
		const handleClick = async (expert, source) => {
			if (source === "search") {
				if (!injection?.onSummonSearchResult) return;
				if (await Promise.resolve(injection.onSummonSearchResult(expert)) !== false) onCloseMenu?.();
				return;
			}
			if (selectedId === expert.id) {
				onCloseMenu?.();
				return;
			}
			injection?.onSelect?.(expert);
			onCloseMenu?.();
		};
		const handlePinToggle = (expert, event) => {
			event.preventDefault();
			event.stopPropagation();
			togglePinned(expert);
		};
		const handleSummonMore = () => {
			injection?.onSummonMore?.();
			onCloseMenu?.();
		};
		const renderRow = (expert, source) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ExpertRow, {
			expert,
			selected: selectedId === expert.id && source === "normal",
			disabled: source === "search" ? !injection?.onSummonSearchResult : !injection?.onSelect,
			pinned: isPinned(expert.id),
			onClick: () => {
				handleClick(expert, source).catch(() => void 0);
			},
			onPinToggle: enhancedEnabled ? (event) => handlePinToggle(expert, event) : void 0,
			pinLabel: isPinned(expert.id) ? t("input.wbAdd.experts.unpin") : t("input.wbAdd.experts.pin")
		}, `${source}:${expert.id}`);
		const renderNormalList = () => {
			if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: experts_module_default.empty,
				children: t("input.wbAdd.experts.empty")
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: (0, import_classnames$9.default)(experts_module_default.list, { [experts_module_default.scrollList]: shouldScroll }),
				children: items.map((expert) => renderRow(expert, "normal"))
			});
		};
		const renderSearchList = () => {
			if (searchLoading && searchResults.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: experts_module_default.empty,
				children: t("input.wbAdd.experts.searching")
			});
			if (searchErrorReason && searchResults.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: experts_module_default.empty,
				children: t("input.wbAdd.experts.searchUnavailable")
			});
			if (searchResults.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: experts_module_default.empty,
				children: t("input.wbAdd.experts.noResult")
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: (0, import_classnames$9.default)(experts_module_default.list, experts_module_default.searchList),
				children: searchResults.map((expert) => renderRow(expert, "search"))
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: experts_module_default.panel,
			role: "menu",
			children: [
				enhancedEnabled && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					className: experts_module_default.searchBox,
					onFocus: preload,
					children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(WbSearchInput, {
						value: keyword,
						onChange: handleKeywordChange,
						onCompositionStart: handleCompositionStart,
						onCompositionEnd: handleCompositionEnd,
						placeholder: t("input.wbAdd.experts.searchPlaceholder"),
						clearAriaLabel: t("input.wbAdd.experts.searchClear")
					})
				}),
				isSearching ? renderSearchList() : renderNormalList(),
				!isSearching && injection?.onSummonMore && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					className: experts_module_default.divider,
					role: "separator"
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: experts_module_default.summonMore,
					role: "menuitem",
					onClick: handleSummonMore,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: experts_module_default.summonMoreIcon,
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SummonMoreIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: experts_module_default.summonMoreLabel,
						children: t("input.wbAdd.experts.summonMore")
					})]
				})] })
			]
		});
	};
	ExpertRow = ({ expert, selected, disabled, pinned, onClick, onPinToggle, pinLabel }) => {
		const displayName = getExpertMenuDisplayName(expert);
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: (0, import_classnames$9.default)(experts_module_default.item, {
				[experts_module_default.selected]: selected,
				[experts_module_default.disabled]: disabled
			}),
			role: "menuitem",
			"aria-disabled": disabled,
			"aria-checked": selected,
			onClick: () => {
				if (!disabled) onClick();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ExpertAvatar$1, { expert }),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
					className: experts_module_default.name,
					children: displayName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
					className: experts_module_default.actions,
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: experts_module_default.checkSlot,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(CheckIcon, {})
					}) : onPinToggle && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("button", {
						type: "button",
						className: (0, import_classnames$9.default)(experts_module_default.pinButton, { [experts_module_default.pinned]: pinned }),
						title: pinLabel,
						"aria-label": pinLabel,
						onClick: onPinToggle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
							className: experts_module_default.pinIconRest,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(PinIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
							className: experts_module_default.pinIconHover,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(UnpinIcon, {})
						})]
					})
				})
			]
		});
	};
	ExpertAvatar$1 = ({ expert }) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Avatar, {
		size: 16,
		src: resolveAvatarUrl(expert.avatarUrl),
		alt: "",
		className: experts_module_default.avatar,
		children: getExpertMenuDisplayName(expert)
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/experts/index.ts
var init_experts = __esmMin((() => {
	init_experts_submenu();
	init_use_experts_suggestions();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/mode/mode.module.scss
var panel$1, description, divider$1, group$1, row, disabled$2, rowText, rowLabel, rowEn, toggle, toggleOn, toggleDisabled, toggleThumb, mode_module_default;
var init_mode_module = __esmMin((() => {
	panel$1 = "_panel_1llkg_34";
	description = "_description_1llkg_58";
	divider$1 = "_divider_1llkg_69";
	group$1 = "_group_1llkg_76";
	row = "_row_1llkg_83";
	disabled$2 = "_disabled_1llkg_97";
	rowText = "_rowText_1llkg_109";
	rowLabel = "_rowLabel_1llkg_117";
	rowEn = "_rowEn_1llkg_124";
	toggle = "_toggle_1llkg_143";
	toggleOn = "_toggleOn_1llkg_160";
	toggleDisabled = "_toggleDisabled_1llkg_164";
	toggleThumb = "_toggleThumb_1llkg_170";
	mode_module_default = {
		panel: panel$1,
		description,
		divider: divider$1,
		group: group$1,
		row,
		disabled: disabled$2,
		rowText,
		rowLabel,
		rowEn,
		toggle,
		toggleOn,
		toggleDisabled,
		toggleThumb
	};
})), import_classnames$8, import_jsx_runtime$10, DESCRIPTION_KEY, MODE_TOGGLES, ModeSubmenu, ModeToggleRow, ModeToggle;
var init_mode_submenu = __esmMin((() => {
	init_src();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_useI18n();
	init_mode_module();
	import_jsx_runtime$10 = require_jsx_runtime();
	DESCRIPTION_KEY = {
		craft: "input.wbAdd.mode.description.craft",
		plan: "input.wbAdd.mode.description.plan",
		ask: "input.wbAdd.mode.description.ask"
	};
	MODE_TOGGLES = [{
		id: "plan",
		enLabel: "Plan"
	}, {
		id: "ask",
		enLabel: "Ask"
	}];
	ModeSubmenu = ({ injection }) => {
		const t = useTranslation();
		const currentMode = injection?.currentMode ?? "craft";
		const setMode = injection?.setMode;
		const availableModes = injection?.availableModes;
		const toggles = availableModes ? MODE_TOGGLES.filter((toggle) => availableModes.includes(toggle.id)) : MODE_TOGGLES;
		/**
		* 行点击/开关切换：互斥语义。
		*
		* - 当前已是 target 模式（开关从 on 拨向 off）→ 切回 craft
		* - 当前不是 target 模式（开关从 off 拨向 on）→ 切到 target，自然把另一个排他模式置 off
		*
		* 与连接器/技能等模块一致：切换后**不主动关闭菜单**，保留在原地让用户观察
		* 当前模式描述文案的变化、并可以继续拨其他开关。关菜单由外层加号菜单的
		* outside click / ESC / 鼠标离开整块区域负责。
		*/
		const handleToggle = (target) => {
			if (!setMode) return;
			const next = currentMode === target ? "craft" : target;
			if (next !== currentMode) setMode(next);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: mode_module_default.panel,
			role: "menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: mode_module_default.description,
					children: t(DESCRIPTION_KEY[currentMode])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: mode_module_default.divider,
					role: "separator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: mode_module_default.group,
					children: toggles.map(({ id, enLabel }) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ModeToggleRow, {
						label: t(`input.wbAdd.mode.label.${id}`),
						enLabel,
						checked: currentMode === id,
						disabled: !setMode,
						onChange: () => handleToggle(id),
						tooltip: t(`input.wbAdd.mode.tooltip.${id}`)
					}, id))
				})
			]
		});
	};
	ModeToggleRow = ({ label, enLabel, checked, disabled, onChange, tooltip }) => {
		const row = /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: (0, import_classnames$8.default)(mode_module_default.row, { [mode_module_default.disabled]: disabled }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("span", {
				className: mode_module_default.rowText,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
					className: mode_module_default.rowLabel,
					children: label
				}), label !== enLabel && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
					className: mode_module_default.rowEn,
					children: enLabel
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ModeToggle, {
				checked,
				disabled,
				onChange
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Tooltip, {
			content: tooltip,
			delay: 1e3,
			placement: "bottom",
			showArrow: true,
			className: "cb-tooltip--dark",
			children: row
		});
	};
	ModeToggle = ({ checked, disabled, onChange }) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		disabled,
		className: (0, import_classnames$8.default)(mode_module_default.toggle, {
			[mode_module_default.toggleOn]: checked,
			[mode_module_default.toggleDisabled]: disabled
		}),
		onClick: (e) => {
			e.stopPropagation();
			if (!disabled) onChange();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { className: mode_module_default.toggleThumb })
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/mode/index.ts
var init_mode = __esmMin((() => {
	init_mode_submenu();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/reference-files/filename-utils.ts
function splitFilename(filename) {
	if (!filename) return {
		base: "",
		ext: ""
	};
	const idx = filename.lastIndexOf(".");
	if (idx <= 0 || idx === filename.length - 1) return {
		base: filename,
		ext: ""
	};
	return {
		base: filename.slice(0, idx),
		ext: filename.slice(idx)
	};
}
var init_filename_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/reference-files/reference-files.module.scss
var panel, list, item$2, disabled$1, icon, name, nameBase, nameExt, empty, reference_files_module_default;
var init_reference_files_module = __esmMin((() => {
	panel = "_panel_qruki_26";
	list = "_list_qruki_47";
	item$2 = "_item_qruki_66";
	disabled$1 = "_disabled_qruki_81";
	icon = "_icon_qruki_90";
	name = "_name_qruki_106";
	nameBase = "_nameBase_qruki_107";
	nameExt = "_nameExt_qruki_108";
	empty = "_empty_qruki_145";
	reference_files_module_default = {
		panel,
		list,
		item: item$2,
		disabled: disabled$1,
		icon,
		name,
		nameBase,
		nameExt,
		empty
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/reference-files/use-reference-files.ts
var import_react$13, useReferenceFiles;
var init_use_reference_files = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_mention_converters();
	useReferenceFiles = (adapter, cwd) => {
		const [items, setItems] = (0, import_react$13.useState)([]);
		(0, import_react$13.useEffect)(() => {
			if (!adapter?.searchFile || !cwd) {
				setItems([]);
				return;
			}
			const adapterRef = adapter;
			let cancelled = false;
			(async () => {
				try {
					const result = await adapterRef.searchFile({
						cwd,
						options: {
							search: "",
							resultNum: 100
						}
					});
					if (cancelled) return;
					if (result.error || !result.results) {
						setItems([]);
						return;
					}
					const next = [];
					const seen = /* @__PURE__ */ new Set();
					for (const file of result.results) {
						const fileType = file.type === "folder" ? "folder" : "file";
						const displayName = fileType === "folder" ? file.folderName || file.fileName : file.fileName || file.folderName;
						if (!displayName) continue;
						const key = `${file.relativePath || file.path || displayName}|${fileType}`;
						if (seen.has(key)) continue;
						seen.add(key);
						const suggestion = convertFilesToSuggestions([{
							fileName: displayName,
							folderName: file.folderName,
							relativePath: file.relativePath,
							path: file.path,
							type: fileType
						}])[0];
						if (!suggestion) continue;
						next.push({
							id: key,
							name: displayName,
							uri: file.relativePath || file.path || displayName,
							dirPath: extractDirFromPath(file.path || file.relativePath || "", displayName),
							isFolder: fileType === "folder",
							toContentBlock: () => convertToContentBlock(suggestion, {})
						});
					}
					setItems(next);
				} catch (e) {
					if (!cancelled) setItems([]);
				}
			})();
			return () => {
				cancelled = true;
			};
		}, [adapter, cwd]);
		return items;
	};
})), import_classnames$7, import_jsx_runtime$9, ReferenceFilesSubmenu, ReferenceFileRow;
var init_reference_files_submenu = __esmMin((() => {
	init_src();
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_useI18n();
	init_file_type();
	init_filename_utils();
	init_reference_files_module();
	init_use_reference_files();
	import_jsx_runtime$9 = require_jsx_runtime();
	ReferenceFilesSubmenu = ({ injection, onCloseMenu }) => {
		const t = useTranslation();
		const items = useReferenceFiles(injection?.adapter, injection?.cwd);
		if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: reference_files_module_default.panel,
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: reference_files_module_default.empty,
				children: t("input.wbAdd.referenceFiles.empty")
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: reference_files_module_default.panel,
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: reference_files_module_default.list,
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ReferenceFileRow, {
					item,
					disabled: !injection?.onInsert,
					onClick: () => {
						injection?.onInsert?.(item.toContentBlock());
						onCloseMenu?.();
					}
				}, item.id))
			})
		});
	};
	ReferenceFileRow = ({ item, disabled, onClick }) => {
		const { base, ext } = splitFilename(item.name);
		const tooltipContent = item.dirPath || item.uri || item.name;
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Tooltip, {
			content: tooltipContent,
			placement: "right",
			className: "cb-tooltip--dark",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: (0, import_classnames$7.default)(reference_files_module_default.item, { [reference_files_module_default.disabled]: disabled }),
				role: "menuitem",
				"aria-disabled": disabled,
				onClick: () => {
					if (!disabled) onClick();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
					className: reference_files_module_default.icon,
					children: item.isFolder ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(WbFileFolderIcon, { size: 14 }) : getFileTypeIcon(variantFromFilename(item.name), 14)
				}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("span", {
					className: reference_files_module_default.name,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: reference_files_module_default.nameBase,
						children: base
					}), ext && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: reference_files_module_default.nameExt,
						children: ext
					})]
				})]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/reference-files/index.ts
var init_reference_files = __esmMin((() => {
	init_reference_files_submenu();
	init_use_reference_files();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/legacy-skill-cloud-adapter.ts
function legacySkillToInputItem(skill) {
	return {
		id: skill.id,
		name: skill.name,
		description: skill.description,
		iconUrl: skill.iconUrl,
		tag: skill.tag,
		source: "user",
		statusBadge: skill.statusBadge,
		transientState: skill.transientState,
		secondaryAction: skill.secondaryAction,
		hoverHint: skill.hoverHint,
		metadata: {
			source: "userSettings",
			[LEGACY_SKILL_KEY]: skill
		}
	};
}
function inputItemToLegacySkill(item) {
	const preserved = item.metadata?.[LEGACY_SKILL_KEY];
	return {
		...preserved && typeof preserved === "object" ? preserved : void 0,
		id: item.id,
		name: item.name,
		description: item.description,
		iconUrl: item.iconUrl,
		tag: item.tag,
		statusBadge: item.statusBadge,
		transientState: item.transientState,
		secondaryAction: item.secondaryAction,
		hoverHint: item.hoverHint
	};
}
var LEGACY_SKILL_KEY;
var init_legacy_skill_cloud_adapter = __esmMin((() => {
	LEGACY_SKILL_KEY = "legacySkill";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/skills.module.scss
var item$1, itemBusy, itemDisabled, itemIcon$1, itemBody, itemTitle, itemTitleText, sourceTag, syncStatus, secondaryAction, secondaryActionIcon, secondaryActionDot, cloudBadge, hoverHint, itemDesc, pinBtn, pinned, pinIconRest, pinIconHover, skills_module_default;
var init_skills_module = __esmMin((() => {
	item$1 = "_item_s54xa_16";
	itemBusy = "_itemBusy_s54xa_30";
	itemDisabled = "_itemDisabled_s54xa_34";
	itemIcon$1 = "_itemIcon_s54xa_49";
	itemBody = "_itemBody_s54xa_63";
	itemTitle = "_itemTitle_s54xa_72";
	itemTitleText = "_itemTitleText_s54xa_86";
	sourceTag = "_sourceTag_s54xa_93";
	syncStatus = "_syncStatus_s54xa_94";
	secondaryAction = "_secondaryAction_s54xa_105";
	secondaryActionIcon = "_secondaryActionIcon_s54xa_122";
	secondaryActionDot = "_secondaryActionDot_s54xa_149";
	cloudBadge = "_cloudBadge_s54xa_162";
	hoverHint = "_hoverHint_s54xa_177";
	itemDesc = "_itemDesc_s54xa_196";
	pinBtn = "_pinBtn_s54xa_219";
	pinned = "_pinned_s54xa_217";
	pinIconRest = "_pinIconRest_s54xa_216";
	pinIconHover = "_pinIconHover_s54xa_216";
	skills_module_default = {
		item: item$1,
		itemBusy,
		itemDisabled,
		itemIcon: itemIcon$1,
		itemBody,
		itemTitle,
		itemTitleText,
		sourceTag,
		syncStatus,
		secondaryAction,
		secondaryActionIcon,
		secondaryActionDot,
		cloudBadge,
		hoverHint,
		itemDesc,
		pinBtn,
		pinned,
		pinIconRest,
		pinIconHover
	};
})), import_classnames$6, import_jsx_runtime$8, SkillRow;
var init_skill_row = __esmMin((() => {
	init_src();
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_SkillAvatar();
	init_WbCloudIcon();
	init_wb_search_panel();
	init_icons$1();
	init_skills_module();
	import_jsx_runtime$8 = require_jsx_runtime();
	SkillRow = ({ skill, pinned, keyword, pinLabel, disabled, onSelect, onTogglePin, onSecondaryAction }) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: (0, import_classnames$6.default)(skills_module_default.item, {
			[skills_module_default.itemBusy]: !!skill.transientState,
			[skills_module_default.itemDisabled]: disabled
		}),
		role: "menuitem",
		"aria-busy": !!skill.transientState || void 0,
		"aria-disabled": disabled || void 0,
		tabIndex: disabled ? -1 : 0,
		onClick: disabled ? void 0 : onSelect,
		onKeyDown: (event) => {
			if (disabled || event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			onSelect();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
				className: skills_module_default.itemIcon,
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillAvatar, {
					name: skill.displayName || skill.name,
					iconUrl: skill.iconUrl,
					marketplaceSource: skill.marketplaceSource,
					size: 16
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: skills_module_default.itemBody,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					className: skills_module_default.itemTitle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
							className: skills_module_default.itemTitleText,
							children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WbSearchHighlight, {
								text: skill.displayName || skill.name,
								keyword
							})
						}),
						skill.tag && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
							className: skills_module_default.sourceTag,
							children: skill.tag
						}),
						skill.transientState && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
							className: skills_module_default.syncStatus,
							children: skill.transientState.label
						}),
						!skill.transientState && skill.statusBadge && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip, {
							content: skill.statusBadge.ariaLabel ?? skill.statusBadge.label,
							placement: "top",
							className: "cb-tooltip--dark",
							children: skill.statusBadge.kind === "uploaded" ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
								className: skills_module_default.cloudBadge,
								"aria-label": skill.statusBadge.ariaLabel ?? skill.statusBadge.label,
								children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WbCloudIcon, {
									width: 16,
									height: 16
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
								className: skills_module_default.syncStatus,
								children: skill.statusBadge.label
							})
						})
					]
				}), skill.description && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: skills_module_default.itemDesc,
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WbSearchHighlight, {
						text: skill.description,
						keyword
					})
				})]
			}),
			skill.secondaryAction && !skill.transientState && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip, {
				content: skill.secondaryAction.disabledReason ?? skill.secondaryAction.ariaLabel ?? skill.secondaryAction.label,
				placement: "top",
				className: "cb-tooltip--dark",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
					type: "button",
					className: (0, import_classnames$6.default)(skills_module_default.secondaryAction, { [skills_module_default.secondaryActionIcon]: !!skill.secondaryAction.kind }),
					disabled: disabled || skill.secondaryAction.disabled,
					"aria-label": skill.secondaryAction.ariaLabel ?? skill.secondaryAction.label,
					onClick: (event) => {
						event.stopPropagation();
						onSecondaryAction?.(skill.secondaryAction.id);
					},
					children: skill.secondaryAction.kind ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [skill.secondaryAction.kind === "update" ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WbUpdateIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WbUploadIcon, {}), skill.secondaryAction.badge && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: skills_module_default.secondaryActionDot,
						"aria-hidden": "true"
					})] }) : skill.secondaryAction.label
				})
			}),
			!skill.transientState && skill.hoverHint && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip, {
				content: skill.hoverHint.ariaLabel ?? skill.hoverHint.label,
				placement: "top",
				className: "cb-tooltip--dark",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
					className: skills_module_default.hoverHint,
					"aria-label": skill.hoverHint.ariaLabel ?? skill.hoverHint.label,
					children: skill.hoverHint.kind === "upload" && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WbUploadIcon, {})
				})
			}),
			!skill.transientState && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip, {
				content: pinLabel,
				placement: "top",
				className: "cb-tooltip--dark",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
					type: "button",
					className: (0, import_classnames$6.default)(skills_module_default.pinBtn, { [skills_module_default.pinned]: pinned }),
					"aria-pressed": pinned,
					"aria-label": pinLabel,
					disabled,
					onClick: (event) => {
						event.stopPropagation();
						onTogglePin();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: skills_module_default.pinIconRest,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(PinIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: skills_module_default.pinIconHover,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(UnpinIcon, {})
					})]
				})
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/skill-force-top.ts
var FORCE_TOP_SKILL_SLUGS;
var init_skill_force_top = __esmMin((() => {
	FORCE_TOP_SKILL_SLUGS = ["sites"];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/use-skills-suggestions.ts
function getSkillSearchMatchRank(names, description, keyword) {
	const kw = keyword.trim().toLowerCase();
	if (!kw) return 0;
	if (names.some((name) => name.toLowerCase().includes(kw))) return 0;
	if ((description ?? "").toLowerCase().includes(kw)) return 1;
	return 2;
}
/** 搜索排序：名称匹配优先，描述匹配次之；同优先级内保持原顺序。 */
function sortSkillsBySearchMatch(items, keyword, getMatchFields) {
	const kw = keyword.trim().toLowerCase();
	if (!kw) return items;
	return items.map((item, index) => ({
		item,
		index,
		rank: getSkillSearchMatchRank(getMatchFields(item).names, getMatchFields(item).description, kw)
	})).sort((a, b) => a.rank - b.rank || a.index - b.index).map((entry) => entry.item);
}
/** 与底部 SkillSelector 同样的图标兜底：iconUrl（本地）优先，iconSource（http URL）兜底。
*  - skill.iconUrl：已装 skill 写到 <skillDir>/_icon.* 的本地图标绝对路径
*  - skill.iconSource：远端图标 URL（http(s) 时直接用；非 http 时舍弃，让 SkillAvatar 走首字母 fallback）
*/
function resolveSkillIconUrl(skill) {
	if (skill.iconUrl) return skill.iconUrl;
	const source = (skill.iconSource ?? "").trim();
	if (/^https?:\/\//i.test(source)) return source;
}
function toSubmenuSkill(skill, locale) {
	return {
		id: resolveSkillPreferenceId(skill),
		name: skill.name,
		displayName: pickLocalizedSkillName(skill, locale),
		description: pickLocalizedDescription(skill, locale),
		iconUrl: resolveSkillIconUrl(skill),
		marketplaceSource: skill.marketplaceSource,
		slug: skill.slug
	};
}
function useSkillsPool(menuOpen, cwd, useCloud) {
	const facade = useFacade("personalSkills");
	const host = useModuleHost();
	const currentConversation = useConversations().currentConversation;
	const globalBuddyApplicationId = useSelectedIndustryTemplate()?.applicationId;
	const globalResourceSnapshotKey = useSelectedIndustryResourceSnapshotKey();
	const globalBuddySceneId = useIndustryStore((state) => state.selectedBuddySceneKey);
	const buddyApplicationId = currentConversation ? currentConversation.buddySnapshot?.app.identity.applicationId : globalBuddyApplicationId;
	const buddySceneId = currentConversation ? currentConversation.buddySnapshot?.binding.runtime.industryMode?.sceneId : globalBuddySceneId;
	const resourceSnapshotKey = currentConversation?.buddySnapshot?.binding.resources.resourceSnapshotKey ?? (currentConversation ? void 0 : globalResourceSnapshotKey);
	const accountType = host.accountInfo?.type;
	const accountEnterpriseId = host.accountInfo?.enterpriseId;
	const disableFullstackWebsite = useProductFeature("DisableFullstackWebsite", { mode: "enable" });
	const [pool, setPool] = (0, import_react$10.useState)([]);
	const [isSettled, setIsSettled] = (0, import_react$10.useState)(false);
	const fetchRequestIdRef = (0, import_react$10.useRef)(0);
	(0, import_react$10.useEffect)(() => {
		if (!menuOpen) {
			fetchRequestIdRef.current += 1;
			setPool([]);
			setIsSettled(false);
			return;
		}
		const requestId = ++fetchRequestIdRef.current;
		setIsSettled(false);
		const locale = toZhEnLocale(getLocale());
		fetchPersonalSkillInfos(host.facades.personalSkills, {
			cwd,
			useCloud,
			applicationId: buddyApplicationId,
			...buddySceneId ? { sceneId: buddySceneId } : {},
			...resourceSnapshotKey ? { resourceSnapshotKey } : {},
			account: {
				type: accountType,
				enterpriseId: accountEnterpriseId
			},
			disableFullstackWebsite
		}).then((list) => {
			if (requestId !== fetchRequestIdRef.current) return;
			setPool(list.map((s) => toSubmenuSkill(s, locale)));
		}).finally(() => {
			if (requestId === fetchRequestIdRef.current) setIsSettled(true);
		});
	}, [
		accountEnterpriseId,
		accountType,
		buddyApplicationId,
		buddySceneId,
		cwd,
		disableFullstackWebsite,
		facade,
		menuOpen,
		resourceSnapshotKey,
		useCloud
	]);
	return {
		pool,
		isLoading: menuOpen && !isSettled,
		setPool
	};
}
/**
* 合并项目（团队）技能与个人技能（团队排前、按 name 去重）。
* 逻辑已下沉到 skill-list-core 的 `mergeTeamSkills`，此处仅为保持既有 import 路径的薄封装。
*/
function mergeInjectedProjectSkills(personalSkills, projectSkills) {
	return mergeTeamSkills(personalSkills, projectSkills);
}
function useSkillsSuggestions(searchKeyword, pool, isLoading, projectSkills) {
	const host = useModuleHost();
	const enterpriseId = host.accountInfo?.enterpriseId ?? "";
	const accountUserId = host.accountInfo?.userId;
	const mergedPool = (0, import_react$10.useMemo)(() => mergeInjectedProjectSkills(pool, projectSkills), [pool, projectSkills]);
	const preferenceScopeKey = accountUserId ? createSkillPreferenceScopeKey("local", accountUserId, enterpriseId) : void 0;
	const preferenceStorage = (0, import_react$10.useMemo)(() => accountUserId ? createSkillPreferenceStorage({
		getStorage: () => {
			try {
				return host.wb.storage?.user;
			} catch {
				return;
			}
		},
		transport: "local",
		legacyScope: enterpriseId,
		recoveryScope: preferenceScopeKey,
		onSaved: () => publishLocalSkillPreferenceChanged(host.wb)
	}) : void 0, [
		accountUserId,
		enterpriseId,
		host.wb,
		preferenceScopeKey
	]);
	const preferenceCoordinator = (0, import_react$10.useMemo)(() => preferenceScopeKey ? getSkillPreferenceCoordinator(preferenceScopeKey) : new SkillPreferenceCoordinator(), [preferenceScopeKey]);
	const preferences = (0, import_react$10.useSyncExternalStore)(preferenceCoordinator.subscribe, preferenceCoordinator.getSnapshot, preferenceCoordinator.getSnapshot);
	const [legacyPinnedIds, setLegacyPinnedIds] = (0, import_react$10.useState)(() => readPinned(enterpriseId));
	const [legacyRecentMap, setLegacyRecentMap] = (0, import_react$10.useState)(() => readRecentlyUsed(enterpriseId));
	(0, import_react$10.useEffect)(() => {
		if (preferenceStorage) return;
		setLegacyPinnedIds(readPinned(enterpriseId));
		setLegacyRecentMap(readRecentlyUsed(enterpriseId));
	}, [enterpriseId, preferenceStorage]);
	(0, import_react$10.useEffect)(() => {
		if (!preferenceStorage) return;
		preferenceCoordinator.configure(preferenceStorage, enterpriseId);
		preferenceCoordinator.hydrate(mergedPool, !isLoading);
		preferenceCoordinator.refresh(mergedPool, !isLoading);
	}, [
		enterpriseId,
		isLoading,
		mergedPool,
		preferenceCoordinator,
		preferenceStorage
	]);
	(0, import_react$10.useEffect)(() => {
		if (!preferenceStorage) return;
		return subscribeLocalSkillPreferenceChanged(host.wb, () => {
			preferenceCoordinator.refresh(mergedPool, !isLoading);
		});
	}, [
		host.wb,
		isLoading,
		mergedPool,
		preferenceCoordinator,
		preferenceStorage
	]);
	const pinnedIds = preferenceStorage ? preferences.pinnedSkillIds : legacyPinnedIds;
	const recentMap = preferenceStorage ? preferences.recentlyUsedSkills : legacyRecentMap;
	const togglePin = (id) => {
		if (preferenceStorage) {
			preferenceCoordinator.setPinned(id, !preferenceCoordinator.getSnapshot().pinnedSkillIds.includes(id));
			return;
		}
		setLegacyPinnedIds((prev) => {
			const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
			writePinned(enterpriseId, next);
			return next;
		});
	};
	const isPinned = (id) => pinnedIds.includes(id);
	const markUsed = (id) => {
		if (preferenceStorage) {
			preferenceCoordinator.recordRecent(id, Date.now());
			return;
		}
		const next = recordRecentUse(enterpriseId, id);
		setLegacyRecentMap(next);
	};
	/**
	* 排序后的默认列表。
	*
	* 非 teams 场景（pool 中无团队技能）：保持原「四梯队」逻辑 ——
	*   1. 强制置顶技能（如 sites「发布应用」），不受用户 pin 影响
	*   2. 置顶（按用户置顶顺序）
	*   3. 最近使用（时间戳倒序）
	*   4. 其余（保持 pool 原序 = installedAt 倒序）
	*
	* teams 场景（pool 含团队技能，带 tag）：置顶梯队之后先按技能类型分组，再在组内按最近使用排序 ——
	*   1. 强制置顶技能（同上，跨分组恒在最前）
	*   2. 置顶（全局最上方，跨分组，按用户置顶顺序）
	*   3. 团队技能组（有 tag）：组内「最近使用」在前，其余保持 pool 原序
	*   4. 个人技能组（无 tag）：组内「最近使用」在前，其余保持 pool 原序
	*   —— 最近使用只在所属分组内置顶，不会把个人技能提升到团队技能之上。
	*
	* 池里没有但被 pin 过的 id（如已删除的 skill）跳过，避免显示空标题。
	*/
	const items = (0, import_react$10.useMemo)(() => {
		const byId = new Map(mergedPool.map((s) => [s.id, s]));
		const out = [];
		const used = /* @__PURE__ */ new Set();
		const forceTopSlugs = new Set(FORCE_TOP_SKILL_SLUGS);
		for (const s of mergedPool) {
			const key = s.slug ?? s.id;
			if (forceTopSlugs.has(key) && !used.has(s.id)) {
				out.push(s);
				used.add(s.id);
			}
		}
		for (const id of pinnedIds) {
			const s = byId.get(id);
			if (s && !used.has(id)) {
				out.push(s);
				used.add(id);
			}
		}
		const orderWithinGroup = (group) => {
			const recent = group.filter((s) => recentMap[s.id] != null).sort((a, b) => recentMap[b.id] - recentMap[a.id]);
			const rest = group.filter((s) => recentMap[s.id] == null);
			return [...recent, ...rest];
		};
		const rest = mergedPool.filter((s) => !used.has(s.id));
		if (!rest.some((s) => !!s.tag)) {
			out.push(...orderWithinGroup(rest));
			return out;
		}
		const teamRest = rest.filter((s) => !!s.tag);
		const personalRest = rest.filter((s) => !s.tag);
		out.push(...orderWithinGroup(teamRest));
		out.push(...orderWithinGroup(personalRest));
		return out;
	}, [
		mergedPool,
		pinnedIds,
		recentMap
	]);
	const trimmed = searchKeyword.trim().toLowerCase();
	return {
		items,
		filteredItems: (0, import_react$10.useMemo)(() => {
			if (!trimmed) return items;
			return sortSkillsBySearchMatch(items.filter((s) => (s.displayName ?? s.name).toLowerCase().includes(trimmed) || s.name.toLowerCase().includes(trimmed) || (s.description ?? "").toLowerCase().includes(trimmed)), trimmed, (s) => ({
				names: [
					s.displayName ?? s.name,
					s.name,
					s.id
				],
				description: s.description ?? ""
			}));
		}, [items, trimmed]),
		isSearching: !!trimmed,
		isLoading: mergedPool.length === 0 && isLoading,
		isPinned,
		togglePin,
		markUsed
	};
}
var import_react$10;
var init_use_skills_suggestions = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_product_feature();
	init_i18n();
	init_common();
	init_skill_preference_coordinator();
	init_skill_preference_cross_window_sync();
	init_skill_preference_storage();
	init_industry();
	init_industry_store();
	init_skill_identity();
	init_skill_force_top();
	init_skill_sort_utils();
	init_skill_list_core();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/skills-submenu.tsx
var import_react$9, import_jsx_runtime$7, SkillsSubmenu;
var init_skills_submenu = __esmMin((() => {
	init_src$1();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_genie_project();
	init_components();
	init_use_installed_skills();
	init_use_skill_upload_policy();
	init_environment();
	init_genie_embed();
	init_wb_search_panel();
	init_icons$1();
	init_legacy_skill_cloud_adapter();
	init_skill_row();
	init_use_skills_suggestions();
	import_jsx_runtime$7 = require_jsx_runtime();
	SkillsSubmenu = ({ injection, skillProvider, pool, isLoading: poolLoading, onCloseMenu, onDesktopAddLocal }) => {
		const t = useTranslation();
		const isDesktop = isWorkBuddyDesktop();
		const geniePublishSkillReport = useGenieEmbedTelemetry();
		const [keyword, setKeyword] = (0, import_react$9.useState)("");
		const [pendingSkillId, setPendingSkillId] = (0, import_react$9.useState)();
		const pendingRef = (0, import_react$9.useRef)(false);
		const { filteredItems, isSearching, isPinned, togglePin, isLoading } = useSkillsSuggestions(keyword, pool, poolLoading, injection?.projectSkills);
		const { openPersonal } = useSkillUploadModal();
		const { policy: uploadPolicy, refresh: refreshUploadPolicy } = useSkillUploadPolicy();
		/**
		* Genie 变体分叉（issue: 内嵌 genie / QuickActions 选中「网页应用/小程序/游戏」等
		* Genie 项目类型 chip）：
		*
		* 数据源来自 GenieProjectFacade（`/genie/api/public/plugins` +
		* `/genie/api/plugins`），完全独立于 workbuddy 的 personalSkills 池。
		* 点击时仍走 `injection.onInsert(block)`，与原生 skill 胶囊插入链路一致。
		*/
		const handleSelectGeniePlugin = (0, import_react$9.useCallback)((plugin) => {
			if (!injection?.onInsert) return;
			const skillUri = `skill://${plugin.skillname}`;
			if (injection.currentBlocks?.some((block) => block.uri === skillUri && block._meta?.mentionType === "skill")) return;
			const displayName = plugin.name_cn || plugin.name;
			const description = plugin.description_cn || plugin.description || "";
			const block = createPhraseBlock(displayName, skillUri, {
				title: `Use skill ${plugin.skillname}. `,
				description,
				meta: {
					type: "skill",
					mentionType: "skill",
					displayText: displayName
				},
				icon: "skill"
			});
			injection.onInsert(block);
		}, [injection]);
		/**
		* 选中技能：用 `createPhraseBlock` 构造 ContentBlock，与底部 SkillSelector
		* 的 `selectSkill` 字面同源（同样的 uri / meta / icon），让两边选中后插入到
		* 输入框的 tag 视觉与解析行为完全一致。
		*/
		const commitSelectedSkill = (skill) => {
			if (skill.slug === "sites") geniePublishSkillReport(GENIE_EMBED_EVENT.PAGE_BUTTON_CLICK, {
				button: GENIE_BUTTON.PUBLISH_SKILL_SELECT_CLICK,
				skillId: skill.slug
			});
			if (!injection?.onInsert) {
				onCloseMenu?.();
				return;
			}
			const skillUri = `skill://${skill.name}`;
			if (!injection.currentBlocks?.some((block) => block.uri === skillUri && block._meta?.mentionType === "skill")) {
				const sendName = injection.projectId && skill.nameEn && skill.nameEn !== skill.name ? `${skill.name}(${skill.nameEn})` : skill.name;
				const displayName = skill.displayName || skill.name;
				const block = createPhraseBlock(sendName, skillUri, {
					title: `Use skill ${sendName}. `,
					description: skill.description,
					meta: {
						type: "skill",
						mentionType: "skill",
						displayText: displayName
					},
					icon: "skill"
				});
				injection.onInsert(block);
			}
			onCloseMenu?.();
		};
		const handleSelectSkill = (skill) => {
			if (pendingRef.current) return;
			const inputItem = legacySkillToInputItem(skill);
			if (!skillProvider?.onBeforeSelect) {
				commitSelectedSkill(skill);
				return;
			}
			pendingRef.current = true;
			setPendingSkillId(skill.id);
			skillProvider.onBeforeSelect(inputItem).then((result) => {
				if (result.status === "proceed") commitSelectedSkill(inputItemToLegacySkill(result.item ?? inputItem));
			}).catch(() => void 0).finally(() => {
				pendingRef.current = false;
				setPendingSkillId(void 0);
			}).then(() => void 0);
		};
		const handleSecondaryAction = (skill, actionId) => {
			if (pendingRef.current || !skillProvider?.onSecondaryAction) return;
			pendingRef.current = true;
			setPendingSkillId(skill.id);
			skillProvider.onSecondaryAction(legacySkillToInputItem(skill), actionId).catch(() => void 0).finally(() => {
				pendingRef.current = false;
				setPendingSkillId(void 0);
			}).then(() => void 0);
		};
		/**
		* 「从本地添加技能」点击：与底部 SkillSelector 的 `handleImport` 字面同源 ——
		*   1. last-mile policy check（refreshUploadPolicy await）
		*   2. allowed=false → toast 报错 + 不开 modal
		*   3. openPersonal({ onSuccess })：modal 通过 createRoot 挂 body 独立 container，
		*      不依赖本组件的渲染状态
		*   4. 关一级浮层（modal 已挂载在 body，不会被一起关）
		*
		* 顺序关键：必须先 await openPersonal **同步**完成 modal 挂载，再 onCloseMenu()
		* unmount SkillsSubmenu —— 其实 openPersonal 是同步的（createRoot 立即挂载），
		* 所以两者顺序不影响。但 refreshUploadPolicy 是异步的，await 期间 SkillsSubmenu
		* 可能因 hover 离开已 unmount，所以先做 policy check 再触发 openPersonal。
		*/
		const handleAddLocal = (0, import_react$9.useCallback)(async () => {
			const policy = await refreshUploadPolicy();
			if (policy && !policy.allowed) {
				toast.error(buildPolicyDeniedMessage(t, policy.reason));
				onCloseMenu?.();
				return;
			}
			if (isDesktop) {
				onDesktopAddLocal?.();
				onCloseMenu?.();
				return;
			}
			openPersonal();
			onCloseMenu?.();
		}, [
			refreshUploadPolicy,
			isDesktop,
			onDesktopAddLocal,
			openPersonal,
			onCloseMenu,
			t
		]);
		const handleManage = () => {
			injection?.onManage?.();
			onCloseMenu?.();
		};
		const showAddLocal = !injection?.hideAddLocal && (!uploadPolicy || uploadPolicy.allowed);
		const showManage = !!injection?.onManage;
		const showEmpty = !isLoading && filteredItems.length === 0;
		const searchInputRef = (0, import_react$9.useRef)(null);
		if (injection?.genieMode) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(GeniePluginSubmenu, {
			open: true,
			onSelectPlugin: handleSelectGeniePlugin,
			onCloseMenu
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(WbSearchPanel, {
			width: 320,
			maxHeight: 392,
			role: "menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WbSearchInput, {
					ref: searchInputRef,
					value: keyword,
					onChange: setKeyword,
					placeholder: t("input.wbAdd.skills.searchPlaceholder"),
					clearAriaLabel: t("input.wbAdd.skills.searchClear")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WbSearchBody, {
					readyToLock: !isLoading,
					children: showEmpty ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WbSearchEmpty, { children: isSearching ? t("input.wbAdd.skills.noResult") : t("input.wbAdd.skills.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: wb_search_panel_module_default.list,
						children: filteredItems.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SkillRow, {
							skill,
							pinned: isPinned(skill.id),
							keyword,
							pinLabel: isPinned(skill.id) ? t("input.wbAdd.skills.unpin") : t("input.wbAdd.skills.pin"),
							disabled: !!pendingSkillId,
							onSelect: () => handleSelectSkill(skill),
							onTogglePin: () => togglePin(skill.id),
							onSecondaryAction: (actionId) => handleSecondaryAction(skill, actionId)
						}, skill.id))
					})
				}),
				(showAddLocal || showManage) && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WbSearchDivider, {}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: wb_search_panel_module_default.actionGroup,
					children: [showAddLocal && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: wb_search_panel_module_default.actionRow,
						role: "menuitem",
						onClick: handleAddLocal,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: wb_search_panel_module_default.actionIcon,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(UploadIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: wb_search_panel_module_default.actionLabel,
							children: t("input.wbAdd.skills.addLocal")
						})]
					}), showManage && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: wb_search_panel_module_default.actionRow,
						role: "menuitem",
						onClick: handleManage,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: wb_search_panel_module_default.actionIcon,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SettingsIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: wb_search_panel_module_default.actionLabel,
							children: t("input.wbAdd.skills.manage")
						})]
					})]
				})] })
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/index.ts
var init_skills = __esmMin((() => {
	init_skills_submenu();
	init_use_skills_suggestions();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/use-legacy-skill-cloud-operations.ts
function useLegacySkillCloudOperations(options) {
	const host = useModuleHost();
	const t = useTranslation();
	return (0, import_react$8.useMemo)(() => {
		const personalSkills = host.facades.personalSkills;
		const facade = host.facades.skillCloudSync;
		if (!options.enabled || !personalSkills || !facade) return;
		const getAvailableCommands = host.adapter?.getAvailableCommands?.bind(host.adapter);
		if (!options.useCloud) {
			if (!facade.downloadFromCloud) return;
			if (options.conversationId && !getAvailableCommands) return;
			return { downloadThenUse: createLocalSkillDownloadThenUseOperation({
				facade,
				localSkills: { installed: async (params) => {
					return { items: (await personalSkills.list({
						cwd: params?.cwd,
						global: params?.global,
						excludePluginSkills: true
					})).results };
				} },
				cwd: options.cwd,
				conversationId: options.conversationId,
				getAvailableCommands,
				notifySkillListRefresh,
				onSuccess: () => toast.success(t("skills.cloudDownload.success")),
				onFailure: (reason) => toast.error(reason)
			}) };
		}
		if (!facade.uploadByPath) return;
		const uploadThenUse = createCloudSkillUploadThenUseOperation({
			facade,
			cloudSkills: { installed: async (params) => {
				return { items: (await personalSkills.listCloud({
					cwd: params?.cwd,
					global: params?.global,
					excludePluginSkills: true
				})).results };
			} },
			cwd: options.cwd,
			storageScope: options.storageScope,
			openUploadDialog: (request) => openSkillCloudUploadFlow({
				skill: request.skill,
				operation: request.operation,
				skipOrdinaryConfirm: request.skipOrdinaryConfirm,
				t,
				upload: request.upload,
				onOrdinaryConfirm: request.onOrdinaryConfirm
			}),
			notifySkillListRefresh,
			quotaUnavailableMessage: t("skills.cloudUpload.modal.quotaUnavailable"),
			formatQuotaExceededMessage: (quota) => t("skills.cloudUpload.modal.quotaExceeded", {
				used: String(quota.used),
				limit: String(quota.limit)
			}),
			onSuccess: () => toast.success(t("skills.cloudUpload.modal.success")),
			onFailure: (reason) => toast.error(reason)
		});
		return {
			uploadThenUse,
			uploadToCloud: async (skill) => {
				const result = await uploadThenUse(skill);
				if (result.status === "failed") throw new Error(result.reason || "upload_failed");
			}
		};
	}, [
		host.adapter,
		host.facades.personalSkills,
		host.facades.skillCloudSync,
		options.conversationId,
		options.cwd,
		options.enabled,
		options.storageScope,
		options.useCloud,
		t
	]);
}
var import_react$8;
var init_use_legacy_skill_cloud_operations = __esmMin((() => {
	init_src$1();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_common();
	init_cloud_skill_upload_operation();
	init_local_skill_download_operation();
	init_components();
	init_high_risk_notification_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/skills/use-legacy-skill-cloud-menu.ts
function useLegacySkillCloudMenu(options) {
	const host = useModuleHost();
	const enabled = options.enabled;
	(0, import_react$7.useEffect)(() => {
		logSkillCloudSyncDebug("legacy provider gate", {
			useCloud: options.useCloud,
			inputEnabled: options.enabled,
			enabled,
			poolCount: options.pool.length,
			hasSkillCloudSyncFacade: !!host.facades.skillCloudSync,
			cwd: options.cwd,
			conversationId: options.conversationId
		});
	}, [
		enabled,
		host.facades.skillCloudSync,
		options.conversationId,
		options.cwd,
		options.enabled,
		options.pool.length,
		options.useCloud
	]);
	const accountScope = [host.accountInfo?.enterpriseId, host.accountInfo?.userId].filter(Boolean).join(":") || void 0;
	const storageScope = options.storageScope ?? accountScope;
	const operations = useLegacySkillCloudOperations({
		...options,
		enabled,
		storageScope
	});
	const baseProvider = (0, import_react$7.useMemo)(() => ({
		items: options.pool.map(legacySkillToInputItem),
		sessionId: options.conversationId,
		storageScope
	}), [
		options.conversationId,
		options.pool,
		storageScope
	]);
	const skillCloudSyncFacade = host.facades.skillCloudSync;
	const listInstalled = (0, import_react$7.useMemo)(() => skillCloudSyncFacade ? (params) => skillCloudSyncFacade.listInstalled(params) : void 0, [skillCloudSyncFacade]);
	const controller = useSkillCloudSelectionController({
		enabled,
		baseProvider,
		transport: options.useCloud ? "cloud" : "local",
		cwd: options.cwd,
		conversationId: options.conversationId,
		listInstalled,
		operations
	});
	const provider = enabled ? controller.menuProvider ?? baseProvider : baseProvider;
	return {
		pool: (0, import_react$7.useMemo)(() => provider.items.map(inputItemToLegacySkill), [provider.items]),
		provider
	};
}
var import_react$7;
var init_use_legacy_skill_cloud_menu = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_common();
	init_skill_cloud_feature();
	init_use_skill_cloud_selection_controller();
	init_legacy_skill_cloud_adapter();
	init_use_legacy_skill_cloud_operations();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/skills-availability.ts
/** 只要宿主提供技能插入或管理能力，就保留技能入口。 */
function isSkillsMenuAvailable(skills) {
	return Boolean(skills?.onInsert || skills?.onManage);
}
var init_skills_availability = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/wb-input-add.module.scss
var container, trigger, active, menu, wbInputAddPopIn, group, divider, item, disabled, itemActive, itemIcon, itemLabel, itemChevron, wb_input_add_module_default;
var init_wb_input_add_module = __esmMin((() => {
	container = "_container_zde11_13";
	trigger = "_trigger_zde11_24";
	active = "_active_zde11_44";
	menu = "_menu_zde11_63";
	wbInputAddPopIn = "_wbInputAddPopIn_zde11_1";
	group = "_group_zde11_94";
	divider = "_divider_zde11_101";
	item = "_item_zde11_108";
	disabled = "_disabled_zde11_123";
	itemActive = "_itemActive_zde11_123";
	itemIcon = "_itemIcon_zde11_149";
	itemLabel = "_itemLabel_zde11_159";
	itemChevron = "_itemChevron_zde11_166";
	wb_input_add_module_default = {
		container,
		trigger,
		active,
		menu,
		wbInputAddPopIn,
		group,
		divider,
		item,
		disabled,
		itemActive,
		itemIcon,
		itemLabel,
		itemChevron
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/wb-input-add.tsx
/** 「添加文件」注入是否有任何可用项；全部未注入 → 一级菜单隐藏该 item。 */
function hasAnyAddFilesEntry(addFiles) {
	if (!addFiles) return false;
	return Boolean(addFiles.onPickLocalFiles || addFiles.onPickTencentDocs || addFiles.onPickIma || addFiles.onPickTencentLexiang || (addFiles.extraItems?.length ?? 0) > 0);
}
var import_classnames$5, import_react$6, import_jsx_runtime$6, SUBMENU_CLOSE_DELAY_MS, WbInputAddMenu;
var init_wb_input_add$1 = __esmMin((() => {
	init_src$1();
	init_src();
	init_floating();
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_product_features();
	init_use_delayed_visible();
	init_useI18n();
	init_common();
	init_connector();
	init_connector_auth_modal();
	init_components();
	init_environment();
	init_icons$1();
	init_items();
	init_add_files();
	init_application();
	init_connectors();
	init_experts();
	init_mode();
	init_reference_files();
	init_skills();
	init_use_legacy_skill_cloud_menu();
	init_submenu_panel_module();
	init_skills_availability();
	init_wb_input_add_module();
	import_jsx_runtime$6 = require_jsx_runtime();
	SUBMENU_CLOSE_DELAY_MS = 120;
	WbInputAddMenu = ({ className, onEscapeKeyDown, hideTooltip = false, addFiles, referenceFiles, mode, experts, skills, connectors, application }) => {
		const t = useTranslation();
		const isMobileLayout = useConversations().isMobileLayout ?? false;
		const isDesktop = isWorkBuddyDesktop();
		const connectorModalInfo = useConnectorStore((state) => state.connectorModalInfo);
		const floatingRef = useFloatingRef({
			onEscapeKeyDown,
			placement: "top-start",
			offset: 8,
			matchWidth: false
		});
		/**
		* 「引用对话中的文件」items —— 用于一级菜单的可见性决策。
		*
		* 仅在加号弹层打开后传 cwd 触发拉取（关闭时 cwd undefined，hook 早退保持空数组），
		* 避免菜单未打开就发起 adapter.searchFile 请求。
		*
		* `referenceFiles` 模块二级面板内部仍各自调 useReferenceFiles —— 两次 useEffect
		* 各拉一次（不共享缓存），但都走 adapter.searchFile 默认参数，命中相同的远端结果，
		* 体感无差异；如后续有性能压力再统一为模块级缓存。
		*/
		const referenceFileItems = useReferenceFiles(referenceFiles?.adapter, floatingRef.open ? referenceFiles?.cwd : void 0);
		/**
		* 「应用」条目：弹层打开且宿主给了 onInsert 时才拉，避免菜单没展开就打 daemon RPC。
		* 取数在父级、结果下发给二级面板（同 skills）——`getDeployHistory` 是一次 RPC +
		* 全量读本地 JSON，不像 reference-files 那样父子各拉一次。
		*/
		const { groups: applicationGroups, isLoading: applicationLoading } = useApplicationMentions(application?.publishedApps, floatingRef.open && !!application?.onInsert, {
			taskSessionId: application?.taskSessionId,
			cwd: application?.cwd
		});
		const groups = buildWbInputAddGroups(t, (0, import_react$6.useMemo)(() => {
			const set = /* @__PURE__ */ new Set();
			if (!hasAnyAddFilesEntry(addFiles)) set.add("add-files");
			if (!referenceFiles?.onInsert) set.add("reference-files");
			if (referenceFileItems.length === 0) set.add("reference-files");
			if (!mode?.setMode) set.add("mode");
			if (!experts?.onSelect && !experts?.onSummonMore) set.add("experts");
			if (!isSkillsMenuAvailable(skills)) set.add("skills");
			if (!connectors?.onSummonMore) set.add("connectors");
			if (!application?.onInsert) set.add("application");
			if (applicationGroups.length === 0) set.add("application");
			return set;
		}, [
			addFiles,
			referenceFiles,
			referenceFileItems.length,
			mode,
			experts,
			skills,
			connectors,
			application,
			applicationGroups.length
		]));
		const placeholderText = t("input.wbAdd.submenu.placeholder");
		/**
		* experts 推荐池预热：只在用户打开加号菜单后触发，避免进入新建任务/任务详情时提前拉专家数据。
		*
		* skills 列表：一级菜单打开时由 `useSkillsPool` 拉取并存于组件 state，关闭时清空；
		* 二级面板只读父级下发的 pool，不自行发请求。
		*/
		const moduleHost = useModuleHost();
		const hasExperts = !!experts?.onSelect || !!experts?.onSummonMore;
		(0, import_react$6.useEffect)(() => {
			if (!floatingRef.open || !hasExperts) return;
			experts?.loadRecentExperts?.().catch(() => void 0);
			if (experts?.disableRecommended) return;
			prefetchExpertsSuggestions(moduleHost, experts?.expertScope ?? "default").catch(() => void 0);
		}, [
			floatingRef.open,
			hasExperts,
			experts?.disableRecommended,
			experts?.expertScope,
			experts?.loadRecentExperts,
			moduleHost
		]);
		const skillRuntimeOptions = skills;
		const hasSkills = isSkillsMenuAvailable(skills);
		const skillsCwd = skills?.cwd ?? "";
		const skillsUseCloud = !!skills?.useCloud;
		const { pool: skillsPool, isLoading: skillsPoolLoading } = useSkillsPool(floatingRef.open && hasSkills, skillsCwd, skillsUseCloud);
		const cloudSkillSyncEnabled = useCloudSkillSyncFeature();
		const legacySkillCloudMenu = useLegacySkillCloudMenu({
			enabled: floatingRef.open && hasSkills && skills?.cloudSync !== false && cloudSkillSyncEnabled === true,
			pool: skillsPool,
			useCloud: skillsUseCloud,
			cwd: skillsCwd,
			conversationId: skillRuntimeOptions?.conversationId,
			storageScope: skillRuntimeOptions?.storageScope
		});
		/**
		* 当前展开的二级菜单 item.id；null = 没有任何二级菜单展开。
		* 唯一的交互状态：hover 一级 item 立即写入，离开整块区域清空。
		*/
		const [activeId, setActiveId] = (0, import_react$6.useState)(null);
		/** 一级 item DOM 引用：按 item.id 索引，用于把浮层 anchor 到当前 active 的 trigger。 */
		const itemRefs = (0, import_react$6.useRef)(/* @__PURE__ */ new Map());
		/** 离开 menu/panel 整块区域的唯一关闭计时器：兜住边界回弹，避免立即关导致抖动。 */
		const closeTimerRef = (0, import_react$6.useRef)(null);
		const touchInteractionRef = (0, import_react$6.useRef)(false);
		const resetTouchInteractionOnMouseMove = (0, import_react$6.useCallback)((event) => {
			if (event.pointerType === "mouse") touchInteractionRef.current = false;
		}, []);
		const clearCloseTimer = (0, import_react$6.useCallback)(() => {
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
				closeTimerRef.current = null;
			}
		}, []);
		const scheduleClose = (0, import_react$6.useCallback)(() => {
			clearCloseTimer();
			closeTimerRef.current = setTimeout(() => setActiveId(null), SUBMENU_CLOSE_DELAY_MS);
		}, [clearCloseTimer]);
		/** 卸载时清理计时器，避免异步状态写入。 */
		(0, import_react$6.useEffect)(() => clearCloseTimer, [clearCloseTimer]);
		/**
		* 加号弹层关闭时（ESC / 点击外部 / 任何走 floatingRef dismiss 的路径都不经过 closeMenu）
		* 统一清空二级菜单选中态：否则下次点开 `activeId` 仍是上次的值，立即展开上次的二级菜单。
		*/
		(0, import_react$6.useEffect)(() => {
			if (!floatingRef.open) {
				clearCloseTimer();
				touchInteractionRef.current = false;
				setActiveId(null);
			}
		}, [floatingRef.open, clearCloseTimer]);
		/** 关闭整个加号弹层（点击二级菜单 item 后调用）。 */
		const closeMenu = (0, import_react$6.useCallback)(() => {
			clearCloseTimer();
			setActiveId(null);
			floatingRef.onOpenChange(false);
		}, [floatingRef, clearCloseTimer]);
		/**
		* Desktop 本地技能导入：挂在 wb-input-add 父级，避免 SkillsSubmenu 因 onCloseMenu
		* 卸载后 PersonalSkillImportModal 一起消失（与底部 SkillSelector 同级策略）。
		*/
		const desktopSkillImportFlow = usePersonalSkillImport({ scanEnabled: true });
		const showDesktopSkillUploadOverlay = useDelayedVisible(desktopSkillImportFlow.uploading, 3e3);
		const handleDesktopSkillAddLocal = (0, import_react$6.useCallback)(() => {
			desktopSkillImportFlow.handleImportSkill();
		}, [desktopSkillImportFlow]);
		/**
		* 二级面板路由：根据当前 activeId 渲染对应模块的二级面板。
		* 未接通的模块返回占位面板（共享 `.placeholder` 样式 + 「功能开发中…」文案）。
		*/
		const renderSubmenu = (itemId) => {
			switch (itemId) {
				case "add-files": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AddFilesSubmenu, {
					injection: addFiles,
					onCloseMenu: closeMenu
				});
				case "reference-files": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ReferenceFilesSubmenu, {
					injection: referenceFiles,
					onCloseMenu: closeMenu
				});
				case "application": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ApplicationSubmenu, {
					injection: application,
					groups: applicationGroups,
					isLoading: applicationLoading,
					onCloseMenu: closeMenu
				});
				case "mode": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ModeSubmenu, { injection: mode });
				case "experts": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ExpertsSubmenu, {
					injection: experts,
					onCloseMenu: closeMenu
				});
				case "skills": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SkillsSubmenu, {
					injection: skills,
					pool: legacySkillCloudMenu.pool,
					skillProvider: legacySkillCloudMenu.provider,
					isLoading: skillsPoolLoading,
					onCloseMenu: closeMenu,
					onDesktopAddLocal: isDesktop ? handleDesktopSkillAddLocal : void 0
				});
				case "connectors": return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConnectorsSubmenu, {
					injection: connectors,
					onCloseMenu: closeMenu
				});
				default: return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: submenu_panel_module_default.panel,
					role: "menu",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						className: submenu_panel_module_default.placeholder,
						children: placeholderText
					})
				});
			}
		};
		/**
		* 二级浮层定位：把 active item 的 DOM 作为 reference，浮层指向它的 right-start。
		*
		* autoUpdate + flip + shift 与原 HoverSubMenu 一致 —— 边界翻转/挤压能力不丢；
		* z-index 由 @genie/wb-components/floating 的 useFloating 自动按运行时打开顺序分配，无需手动写。
		*/
		const floatingReference = floatingRef.refs.reference.current;
		const mobileBoundary = isMobileLayout && floatingReference instanceof Element ? floatingReference.closest(".teams-container.is-mobile") : null;
		const boundaryOptions = mobileBoundary instanceof HTMLElement ? { boundary: mobileBoundary } : {};
		const submenu = useFloating({
			open: activeId !== null,
			placement: "right-start",
			whileElementsMounted: autoUpdate,
			strategy: isMobileLayout ? "absolute" : "fixed",
			middleware: [
				offset(4),
				flip({
					...boundaryOptions,
					fallbackPlacements: [
						"left-start",
						"right",
						"left"
					],
					padding: 8
				}),
				shift({
					...boundaryOptions,
					padding: 8
				}),
				size({
					...boundaryOptions,
					padding: 8,
					apply({ availableWidth, availableHeight, elements }) {
						Object.assign(elements.floating.style, {
							maxWidth: `${isMobileLayout ? Math.max(0, availableWidth) : Math.max(availableWidth, 160)}px`,
							maxHeight: `${isMobileLayout ? Math.max(0, availableHeight) : Math.max(availableHeight, 200)}px`
						});
					}
				})
			]
		});
		/** 一级 / 二级浮层间移动时不关；离开整块 hover 区域才关。 */
		const handleMenuMouseLeave = (0, import_react$6.useCallback)((event) => {
			const menuEl = floatingRef.refs.floating.current;
			const submenuEl = submenu.refs.floating.current;
			const related = event.relatedTarget instanceof Node ? event.relatedTarget : null;
			if (related && (menuEl?.contains(related) || submenuEl?.contains(related))) return;
			const activeEl = typeof document !== "undefined" ? document.activeElement : null;
			if (activeEl && (menuEl?.contains(activeEl) || submenuEl?.contains(activeEl))) return;
			if (touchInteractionRef.current) return;
			scheduleClose();
		}, [
			floatingRef.refs,
			submenu.refs,
			scheduleClose
		]);
		/**
		* hover 一级 item → 立即展开其二级面板。
		* onMouseEnter 与 onMouseMove 都接这里：菜单首次在静止指针下出现时 onMouseEnter 不派发，
		* 靠 onMouseMove 的第一次移动补上激活；已是当前 active 时直接早退，无副作用。
		*/
		const openSubmenu = (0, import_react$6.useCallback)((item) => {
			if (item.disabled) return;
			clearCloseTimer();
			if (activeId === item.id) return;
			setActiveId(item.id);
			submenu.refs.setReference(itemRefs.current.get(item.id) ?? null);
		}, [
			activeId,
			clearCloseTimer,
			submenu.refs
		]);
		/** 渲染单个一级菜单项；hover 触发对应模块的二级面板。 */
		const renderItem = (item) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			ref: (node) => {
				if (node) {
					itemRefs.current.set(item.id, node);
					if (activeId === item.id) submenu.refs.setReference(node);
				} else itemRefs.current.delete(item.id);
			},
			className: (0, import_classnames$5.default)(wb_input_add_module_default.item, {
				[wb_input_add_module_default.disabled]: item.disabled,
				[wb_input_add_module_default.itemActive]: activeId === item.id
			}),
			role: "menuitem",
			"aria-disabled": item.disabled,
			"aria-haspopup": "menu",
			onPointerDown: (event) => {
				if (event.pointerType === "touch") {
					touchInteractionRef.current = true;
					clearCloseTimer();
					openSubmenu(item);
				}
			},
			onMouseEnter: () => openSubmenu(item),
			onMouseMove: () => openSubmenu(item),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: wb_input_add_module_default.itemIcon,
					children: item.icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: wb_input_add_module_default.itemLabel,
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: wb_input_add_module_default.itemChevron,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronRightIcon, {})
				})
			]
		}, item.id);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: (0, import_classnames$5.default)(wb_input_add_module_default.container, className),
			"data-wb-input-add": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					ref: floatingRef.refs.setReference,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
						content: hideTooltip || floatingRef.open ? void 0 : t("input.wbAdd.tooltip"),
						placement: "top",
						showArrow: true,
						className: "cb-tooltip--dark",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
							type: "button",
							className: (0, import_classnames$5.default)(wb_input_add_module_default.trigger, { [wb_input_add_module_default.active]: floatingRef.open }),
							"aria-haspopup": "menu",
							"aria-expanded": floatingRef.open,
							"aria-label": t("input.wbAdd.title"),
							...floatingRef.getReferenceProps(),
							onClick: () => {
								floatingRef.onOpenChange(!floatingRef.open);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(WbAddPlusIcon, {})
						})
					})
				}),
				floatingRef.open && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					ref: floatingRef.refs.setFloating,
					className: wb_input_add_module_default.menu,
					role: "menu",
					style: floatingRef.floatingStyles,
					...floatingRef.getFloatingProps(),
					onPointerMove: resetTouchInteractionOnMouseMove,
					onMouseLeave: handleMenuMouseLeave,
					onMouseEnter: clearCloseTimer,
					children: [groups.map((group, gIdx) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_react$6.Fragment, { children: [gIdx > 0 && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						className: wb_input_add_module_default.divider,
						role: "separator"
					}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						className: wb_input_add_module_default.group,
						children: group.items.map(renderItem)
					})] }, gIdx)), activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
						ref: submenu.refs.setFloating,
						style: submenu.floatingStyles,
						onMouseEnter: clearCloseTimer,
						onMouseLeave: handleMenuMouseLeave,
						children: renderSubmenu(activeId)
					})]
				}),
				isDesktop && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(PersonalSkillImportModal, {
					flow: desktopSkillImportFlow,
					scanEnabled: true,
					showUploadOverlay: showDesktopSkillUploadOverlay
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConnectorAuthModal, {
					visible: connectorModalInfo.visible,
					type: connectorModalInfo.type,
					onSuccess: async () => {
						if (connectorModalInfo.type === "cnb") {
							const store = connectorStore.getState();
							store.setConnectStatus(connectorModalInfo.type, "connected");
							store.openSettings?.("connectors", connectorModalInfo.type);
							try {
								await store.handleConnect(connectorModalInfo.type, 1, void 0);
							} catch {}
							store.loadMcpConnectors().catch(() => {});
							store.setConnectorModalInfo({
								...connectorModalInfo,
								visible: false
							});
						}
					},
					onClose: () => {
						const store = connectorStore.getState();
						store.setConnectorModalInfo({
							...store.connectorModalInfo,
							visible: false
						});
					}
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/index.ts
var init_wb_input_add = __esmMin((() => {
	init_wb_input_add$1();
})), import_jsx_runtime$5, ChipCloseIcon;
var init_chip_close_icon = __esmMin((() => {
	require_react();
	import_jsx_runtime$5 = require_jsx_runtime();
	ChipCloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 2.5651 2.5651)",
			d: "M6.3046 5.4349L10.8698 10L10 10.8698L5.4349 6.3046L0.8698 10.8698L0 10L4.5651 5.4349L0 0.8698L0.8698 0L5.4349 4.5651L10 0L10.8698 0.8698L6.3046 5.4349Z"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/shared/index.ts
var init_shared = __esmMin((() => {
	init_chip_close_icon();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/shared/chip-base.module.scss
var chipBase, chipBaseStatic, chipBaseHovered, chipBaseCompact, chipIcon, chipIconDefault, chipIconHover, chipCloseButton, chipLabel, chipBaseDisabled, chip_base_module_default;
var init_chip_base_module = __esmMin((() => {
	chipBase = "_chipBase_1udom_18";
	chipBaseStatic = "_chipBaseStatic_1udom_53";
	chipBaseHovered = "_chipBaseHovered_1udom_60";
	chipBaseCompact = "_chipBaseCompact_1udom_68";
	chipIcon = "_chipIcon_1udom_38";
	chipIconDefault = "_chipIconDefault_1udom_38";
	chipIconHover = "_chipIconHover_1udom_41";
	chipCloseButton = "_chipCloseButton_1udom_117";
	chipLabel = "_chipLabel_1udom_44";
	chipBaseDisabled = "_chipBaseDisabled_1udom_79";
	chip_base_module_default = {
		chipBase,
		chipBaseStatic,
		chipBaseHovered,
		chipBaseCompact,
		chipIcon,
		chipIconDefault,
		chipIconHover,
		chipCloseButton,
		chipLabel,
		chipBaseDisabled
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/mode-chip/mode-chip.tsx
var import_classnames$4, import_react$4, import_jsx_runtime$4, ModeChip, PlanIcon, AskIcon;
var init_mode_chip$1 = __esmMin((() => {
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_shared();
	init_chip_base_module();
	import_jsx_runtime$4 = require_jsx_runtime();
	ModeChip = ({ currentMode, setMode, compact }) => {
		const t = useTranslation();
		const handleClear = (0, import_react$4.useCallback)((event) => {
			event.stopPropagation();
			setMode?.("craft");
		}, [setMode]);
		if (!currentMode || currentMode === "craft") return null;
		const label = currentMode === "plan" ? t("input.wbAdd.mode.label.plan") : t("input.wbAdd.mode.label.ask");
		const closeAriaLabel = t("input.modeChip.clear", { mode: label });
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: (0, import_classnames$4.default)(chip_base_module_default.chipBase, chip_base_module_default.chipBaseStatic, { [chip_base_module_default.chipBaseCompact]: compact }),
			role: "status",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: (0, import_classnames$4.default)(chip_base_module_default.chipIcon, chip_base_module_default.chipIconDefault),
					"aria-hidden": "true",
					children: currentMode === "plan" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PlanIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AskIcon, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
					type: "button",
					className: (0, import_classnames$4.default)(chip_base_module_default.chipIcon, chip_base_module_default.chipIconHover, chip_base_module_default.chipCloseButton),
					onClick: handleClear,
					"aria-label": closeAriaLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ChipCloseIcon, {})
				}),
				!compact && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: chip_base_module_default.chipLabel,
					children: label
				})
			]
		});
	};
	PlanIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.9 0.3985)",
			d: "M5.975 0L6.225 0Q6.8105 0 7.0155 0.0412Q7.6358 0.1659 8.0849 0.6151Q8.5341 1.0643 8.6588 1.6845Q8.7 1.8896 8.7 2.475Q8.7 2.7119 8.6777 2.821Q8.5322 3.5322 7.821 3.6777Q7.7119 3.7 7.475 3.7L4.725 3.7Q4.4881 3.7 4.379 3.6777Q3.6679 3.5322 3.5223 2.821Q3.513 2.7752 3.5075 2.7068Q3.3517 2.7117 3.2856 2.7203Q2.4805 2.8254 1.903 3.403Q1.3254 3.9805 1.2203 4.7856Q1.2 4.9415 1.2 5.5971L1.2 8.6Q1.2 10.6196 1.2737 11.2736Q1.3713 12.1388 1.6957 12.5609Q1.8884 12.8116 2.1391 13.0043Q2.5612 13.3288 3.4264 13.4263Q4.0804 13.5 6.1 13.5Q8.1196 13.5 8.7736 13.4263Q9.6388 13.3288 10.0609 13.0043Q10.3116 12.8116 10.5043 12.5609Q10.8288 12.1388 10.9263 11.2736Q11 10.6196 11 8.6L11 5.6249Q11 4.9327 10.9774 4.7684Q10.8678 3.9737 10.2971 3.403Q10.1106 3.2165 9.9002 3.0792L9.9002 1.7377Q10.5933 2.0022 11.1456 2.5544Q12.0015 3.4103 12.1661 4.6045Q12.2 4.8503 12.2 5.6249L12.2 8.6Q12.2 10.687 12.1187 11.408Q11.9838 12.6052 11.4558 13.2922Q11.1674 13.6674 10.7922 13.9558Q10.1052 14.4838 8.908 14.6187Q8.187 14.7 6.1 14.7Q4.013 14.7 3.292 14.6187Q2.0948 14.4838 1.4078 13.9558Q1.0326 13.6674 0.7442 13.2922Q0.2162 12.6052 0.0813 11.408Q0 10.687 0 8.6L0 5.5971Q0 4.8635 0.0304 4.6304Q0.1883 3.4205 1.0544 2.5544Q1.9205 1.6883 3.1304 1.5304Q3.2691 1.5123 3.5852 1.505Q3.7323 0.9979 4.1151 0.6151Q4.5643 0.1659 5.1845 0.0412Q5.3896 0 5.975 0ZM5.975 1.2Q5.509 1.2 5.421 1.2177Q4.8354 1.3354 4.7177 1.921Q4.7 2.009 4.7 2.475L4.7 2.5L7.5 2.5L7.5 2.475Q7.5 2.009 7.4823 1.921Q7.3646 1.3354 6.779 1.2177Q6.691 1.2 6.225 1.2L5.975 1.2ZM3.6 6.5L8.6 6.5L8.6 7.7L3.6 7.7L3.6 6.5ZM8.6 9.5L3.6 9.5L3.6 10.7L8.6 10.7L8.6 9.5Z"
		})
	});
	AskIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.7734 0.7776)",
			d: "M7.3333 0.0012C7.297 0.0013 7.2614 0.0013 7.2266 0.0013C7.1914 0.0013 7.1555 0.0013 7.1189 0.0012C6.4253 0.0007 5.4656 0 4.5 0.1712C3.4838 0.3514 2.392 0.7328 1.5605 1.5647C0.1676 2.9589 0 4.8397 0 6.2816C0 7.7233 0.1678 9.6033 1.5605 10.9974C2.45 11.8875 3.5897 12.266 4.6387 12.431L4.7324 11.8382L4.8252 11.2454C3.9083 11.1013 3.0494 10.7904 2.4092 10.1497C1.3802 9.1197 1.1993 7.6794 1.1992 6.2816C1.1992 4.8836 1.3801 3.4435 2.4092 2.4134C2.9967 1.8254 3.8153 1.5115 4.71 1.3528C5.5722 1.2 6.4412 1.2003 7.1478 1.2005L7.2266 1.2005L7.3052 1.2005C8.0118 1.2003 8.8809 1.2 9.7432 1.3528C10.6378 1.5115 11.4564 1.8254 12.0439 2.4134C13.0729 3.4434 13.2539 4.8837 13.2539 6.2816C13.2539 7.6794 13.073 9.1197 12.0439 10.1497C11.4695 10.7245 10.7192 11.0347 9.9062 11.1966C9.0891 11.3593 8.2533 11.3636 7.5342 11.3616C6.8348 11.3599 6.2261 11.7609 5.7373 12.2298C5.2367 12.7102 4.7714 13.3496 4.3535 14.0062L5.3662 14.6507C5.7651 14.0239 6.17 13.4783 6.5684 13.096C6.9785 12.7025 7.2983 12.5612 7.5312 12.5618C8.2453 12.5638 9.1916 12.5623 10.1406 12.3733C11.0936 12.1836 12.094 11.7966 12.8926 10.9974C14.2853 9.6033 14.4531 7.7234 14.4531 6.2816C14.4531 4.8397 14.2855 2.9589 12.8926 1.5647C12.061 0.7327 10.9684 0.3514 9.9521 0.1712C8.9863 0 8.0268 0.0007 7.3333 0.0012ZM4.5594 6.7217Q4.8919 6.9434 5.4077 7.1727Q6.4164 7.6209 7.2266 7.6209Q8.0367 7.6209 9.0454 7.1727Q9.5612 6.9434 9.8937 6.7217L10.5594 7.7202Q10.1419 7.9985 9.5327 8.2692Q8.2914 8.8209 7.2266 8.821Q6.1617 8.8209 4.9204 8.2692Q4.3112 7.9985 3.8937 7.7202L4.5594 6.7217Z"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/mode-chip/index.ts
var init_mode_chip = __esmMin((() => {
	init_mode_chip$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/expert-chip/expert-chip.module.scss
var avatar, expert_chip_module_default;
var init_expert_chip_module = __esmMin((() => {
	avatar = "_avatar_ie4s4_6";
	expert_chip_module_default = { avatar };
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/expert-chip/expert-chip.tsx
/** 解析 chip 展示名：profession > 非 id 的 name；绝不回退到 id。 */
function resolveExpertChipDisplayName(expert) {
	const profession = expert.profession?.trim();
	if (profession) return profession;
	const name = expert.name?.trim();
	if (name && name !== expert.id) return name;
	return "";
}
/**
* 判定 selectedExpert 是否已经拿到完整数据。
* 满足任一即视为完整：有 avatarUrl / 有非 id 的 name / 有 profession。
*/
function isExpertSelectionDisplayable(expert) {
	if (typeof expert.avatarUrl === "string" && expert.avatarUrl.trim()) return true;
	const name = typeof expert.name === "string" ? expert.name.trim() : "";
	if (name && name !== expert.id) return true;
	if (typeof expert.profession === "string" ? expert.profession.trim() : "") return true;
	return false;
}
var import_classnames$3, import_react$3, import_jsx_runtime$3, ExpertChip, ExpertAvatar;
var init_expert_chip$1 = __esmMin((() => {
	init_src$1();
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_shared();
	init_chip_base_module();
	init_expert_chip_module();
	import_jsx_runtime$3 = require_jsx_runtime();
	ExpertChip = ({ selectedExpert, onClear, compact }) => {
		const t = useTranslation();
		const lastDisplayableRef = (0, import_react$3.useRef)(null);
		const handleClear = (0, import_react$3.useCallback)((event) => {
			event.stopPropagation();
			onClear?.();
		}, [onClear]);
		if (!selectedExpert) {
			lastDisplayableRef.current = null;
			return null;
		}
		let displayExpert;
		if (isExpertSelectionDisplayable(selectedExpert)) {
			lastDisplayableRef.current = selectedExpert;
			displayExpert = selectedExpert;
		} else if (lastDisplayableRef.current) displayExpert = lastDisplayableRef.current;
		else return null;
		const displayName = resolveExpertChipDisplayName(displayExpert);
		const canClear = !!onClear;
		const closeAriaLabel = t("input.expertChip.clear", { name: displayName || displayExpert.id });
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: (0, import_classnames$3.default)(chip_base_module_default.chipBase, chip_base_module_default.chipBaseStatic, { [chip_base_module_default.chipBaseCompact]: compact }),
			role: "status",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: (0, import_classnames$3.default)(chip_base_module_default.chipIcon, chip_base_module_default.chipIconDefault),
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ExpertAvatar, { expert: displayExpert })
				}),
				canClear && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					className: (0, import_classnames$3.default)(chip_base_module_default.chipIcon, chip_base_module_default.chipIconHover, chip_base_module_default.chipCloseButton),
					onClick: handleClear,
					"aria-label": closeAriaLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ChipCloseIcon, {})
				}),
				!compact && displayName ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: chip_base_module_default.chipLabel,
					children: displayName
				}) : null
			]
		});
	};
	ExpertAvatar = ({ expert }) => {
		if (expert.avatarUrl) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
			className: expert_chip_module_default.avatar,
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
				src: expert.avatarUrl,
				alt: ""
			})
		});
		const gradient = getExpertGradient(expert.id);
		const initial = expert.initial || getExpertInitial(expert.name || expert.id);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
			className: expert_chip_module_default.avatar,
			"aria-hidden": "true",
			style: { background: `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)` },
			children: initial
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/expert-chip/index.ts
var init_expert_chip = __esmMin((() => {
	init_expert_chip$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/connector-chip/connector-chip.module.scss
var chip, chipMulti, logo, logoStack, logoFallback, popover, popoverEmpty, popoverList, popoverRow, popoverRowIcon, popoverRowFallback, popoverRowName, popoverRowTag, popoverRowSwitch, popoverRowSwitchOn, popoverDivider, popoverFooter, popoverFooterItem, popoverFooterIcon, popoverFooterLabel, connector_chip_module_default;
var init_connector_chip_module = __esmMin((() => {
	chip = "_chip_9w05j_9";
	chipMulti = "_chipMulti_9w05j_19";
	logo = "_logo_9w05j_22";
	logoStack = "_logoStack_9w05j_27";
	logoFallback = "_logoFallback_9w05j_54";
	popover = "_popover_9w05j_68";
	popoverEmpty = "_popoverEmpty_9w05j_82";
	popoverList = "_popoverList_9w05j_89";
	popoverRow = "_popoverRow_9w05j_115";
	popoverRowIcon = "_popoverRowIcon_9w05j_128";
	popoverRowFallback = "_popoverRowFallback_9w05j_145";
	popoverRowName = "_popoverRowName_9w05j_158";
	popoverRowTag = "_popoverRowTag_9w05j_173";
	popoverRowSwitch = "_popoverRowSwitch_9w05j_192";
	popoverRowSwitchOn = "_popoverRowSwitchOn_9w05j_222";
	popoverDivider = "_popoverDivider_9w05j_230";
	popoverFooter = "_popoverFooter_9w05j_237";
	popoverFooterItem = "_popoverFooterItem_9w05j_245";
	popoverFooterIcon = "_popoverFooterIcon_9w05j_259";
	popoverFooterLabel = "_popoverFooterLabel_9w05j_269";
	connector_chip_module_default = {
		chip,
		chipMulti,
		logo,
		logoStack,
		logoFallback,
		popover,
		popoverEmpty,
		popoverList,
		popoverRow,
		popoverRowIcon,
		popoverRowFallback,
		popoverRowName,
		popoverRowTag,
		popoverRowSwitch,
		popoverRowSwitchOn,
		popoverDivider,
		popoverFooter,
		popoverFooterItem,
		popoverFooterIcon,
		popoverFooterLabel
	};
})), import_classnames$2, import_jsx_runtime$2, ConnectorLogo, PopoverRow;
var init_connector_chip_shared = __esmMin((() => {
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
	require_react();
	init_useI18n();
	init_connector_chip_module();
	import_jsx_runtime$2 = require_jsx_runtime();
	ConnectorLogo = ({ icon, name, stackIndex }) => {
		const zIndex = 3 - stackIndex;
		if (icon) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
			className: connector_chip_module_default.logo,
			style: { zIndex },
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
				src: icon,
				alt: ""
			})
		});
		const initial = (name || "?").charAt(0).toUpperCase();
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
			className: (0, import_classnames$2.default)(connector_chip_module_default.logo, connector_chip_module_default.logoFallback),
			style: { zIndex },
			"aria-hidden": "true",
			children: initial
		});
	};
	PopoverRow = ({ icon, name, tag, isOn, onToggle }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: connector_chip_module_default.popoverRow,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: connector_chip_module_default.popoverRowIcon,
					"aria-hidden": "true",
					children: icon ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
						src: icon,
						alt: ""
					}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: connector_chip_module_default.popoverRowFallback,
						children: (name || "?").charAt(0).toUpperCase()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: connector_chip_module_default.popoverRowName,
					children: name
				}),
				tag && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: connector_chip_module_default.popoverRowTag,
					children: tag
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-checked": isOn,
					className: (0, import_classnames$2.default)(connector_chip_module_default.popoverRowSwitch, { [connector_chip_module_default.popoverRowSwitchOn]: isOn }),
					onClick: onToggle,
					"aria-label": t("input.connectorChip.toggle", { name })
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/connector-chip/connector-chip-injected.tsx
var import_classnames$1, import_react$1, import_jsx_runtime$1, isInjectedItemOn, InjectedConnectorChip, InjectedPopover;
var init_connector_chip_injected = __esmMin((() => {
	init_floating();
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_connector_display();
	init_chip_base_module();
	init_connector_chip_module();
	init_connector_chip_shared();
	import_jsx_runtime$1 = require_jsx_runtime();
	isInjectedItemOn = isConnectorItemOn;
	InjectedConnectorChip = ({ injection }) => {
		const t = useTranslation();
		const { items } = injection;
		const [open, setOpen] = (0, import_react$1.useState)(false);
		const floating = useFloating({
			open,
			onOpenChange: setOpen,
			placement: "top-start",
			whileElementsMounted: floatingAutoUpdateWithAnimationFrame,
			strategy: "fixed",
			middleware: [
				offset(4),
				flip({
					fallbackPlacements: [
						"bottom-start",
						"top",
						"bottom"
					],
					padding: 8
				}),
				shift({ padding: 8 })
			]
		});
		const click = useClick(floating.context);
		const dismiss = useDismiss(floating.context);
		const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);
		const activeItems = (0, import_react$1.useMemo)(() => items.filter((item) => isInjectedItemOn(item)), [items]);
		const visibleLogos = activeItems.slice(0, 3);
		if (activeItems.length === 0) return null;
		const isMulti = visibleLogos.length > 1;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			ref: floating.refs.setReference,
			className: (0, import_classnames$1.default)(chip_base_module_default.chipBase, connector_chip_module_default.chip, {
				[chip_base_module_default.chipBaseHovered]: open,
				[connector_chip_module_default.chipMulti]: isMulti
			}),
			"aria-haspopup": "menu",
			"aria-expanded": open,
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: connector_chip_module_default.logoStack,
				children: visibleLogos.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorLogo, {
					icon: item.icon,
					name: item.name,
					stackIndex: idx
				}, `${item.authMode || "personal"}:${item.id}`))
			})
		}), open && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			ref: floating.refs.setFloating,
			className: connector_chip_module_default.popover,
			style: floating.floatingStyles,
			role: "menu",
			"aria-label": t("input.connectorChip.popoverLabel"),
			...getFloatingProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InjectedPopover, { injection })
		})] });
	};
	InjectedPopover = ({ injection }) => {
		const t = useTranslation();
		const { items, onToggleItem, onConnectItem } = injection;
		const [optimisticOnIds, setOptimisticOnIds] = (0, import_react$1.useState)(() => /* @__PURE__ */ new Set());
		const itemKey = (item) => `${item.authMode || "personal"}:${item.id}`;
		const orderSnapshotRef = (0, import_react$1.useRef)(null);
		if (orderSnapshotRef.current === null && items.length > 0) orderSnapshotRef.current = items.map(itemKey);
		const orderedItems = (0, import_react$1.useMemo)(() => {
			const snapshot = orderSnapshotRef.current;
			if (!snapshot) return items;
			const byKey = new Map(items.map((item) => [itemKey(item), item]));
			const sorted = [];
			for (const key of snapshot) {
				const item = byKey.get(key);
				if (item) {
					sorted.push(item);
					byKey.delete(key);
				}
			}
			for (const item of byKey.values()) sorted.push(item);
			return sorted;
		}, [items]);
		if (orderedItems.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: connector_chip_module_default.popoverEmpty,
			children: t("input.connectorChip.empty")
		});
		const resolveIsOn = (item) => optimisticOnIds.has(item.id) || isInjectedItemOn(item);
		const handleToggle = (item) => {
			if (resolveIsOn(item)) {
				setOptimisticOnIds((prev) => {
					if (!prev.has(item.id)) return prev;
					const next = new Set(prev);
					next.delete(item.id);
					return next;
				});
				Promise.resolve(onToggleItem(item, false));
				return;
			}
			setOptimisticOnIds((prev) => new Set(prev).add(item.id));
			(item.isConnected ? Promise.resolve(onToggleItem(item, true)) : Promise.resolve(onConnectItem?.(item))).finally(() => {
				setOptimisticOnIds((prev) => {
					if (!prev.has(item.id)) return prev;
					const next = new Set(prev);
					next.delete(item.id);
					return next;
				});
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: connector_chip_module_default.popoverList,
			children: orderedItems.map((item) => {
				const isOn = resolveIsOn(item);
				return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PopoverRow, {
					icon: item.icon,
					name: item.name,
					tag: item.tag,
					isOn,
					onToggle: () => handleToggle(item)
				}, itemKey(item));
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/connector-chip/connector-chip.tsx
var import_classnames, import_react, import_jsx_runtime, ConnectorChip, McpConnectorChip, ConnectorChipPopover;
var init_connector_chip$1 = __esmMin((() => {
	init_floating();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_useI18n();
	init_connector_display();
	init_entry_show_rate_limit();
	init_telemetry();
	init_icons$1();
	init_connector_menu_runtime();
	init_use_connectors();
	init_chip_base_module();
	init_connector_chip_module();
	init_connector_chip_injected();
	init_connector_chip_shared();
	import_jsx_runtime = require_jsx_runtime();
	ConnectorChip = ({ injection }) => {
		if (injection) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InjectedConnectorChip, { injection });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpConnectorChip, {});
	};
	McpConnectorChip = () => {
		const t = useTranslation();
		const { allVisible } = useConnectorsList();
		const { getDisplayState, openMenu } = useConnectorMenuRuntime("chat_input");
		/**
		* chip 上 logo 叠层 —— 仅 connected===true；无人连上则不渲染 chip。
		*/
		const connectedConnectors = (0, import_react.useMemo)(() => allVisible.filter((c) => isConnectorConnected(getDisplayState(c.id))), [allVisible, getDisplayState]);
		/**
		* 浮层列表 —— 仅已绑定（bound）的连接器。
		* 不含「首次授权进行中、尚未成功接入过」的纯 pending 条目。
		*/
		const popoverConnectors = (0, import_react.useMemo)(() => {
			return [...allVisible.filter((c) => isConnectorBound(getDisplayState(c.id)))].sort((a, b) => {
				return (isConnectorConnected(getDisplayState(a.id)) ? 0 : 1) - (isConnectorConnected(getDisplayState(b.id)) ? 0 : 1);
			});
		}, [allVisible, getDisplayState]);
		const visibleLogos = connectedConnectors.slice(0, 3);
		const [open, setOpen] = (0, import_react.useState)(false);
		/**
		* 浮层定位 + 开关交互（floating-ui 标准组合）：
		*   - useClick：点击 trigger 切换 open
		*   - useDismiss：自动处理 outside click + Escape 键关闭
		*   - useInteractions：把上面两个 hook 的 props 合并到 trigger / floating 上
		*/
		const floating = useFloating({
			open,
			onOpenChange: setOpen,
			placement: "top-start",
			whileElementsMounted: floatingAutoUpdateWithAnimationFrame,
			strategy: "fixed",
			middleware: [
				offset(4),
				flip({
					fallbackPlacements: [
						"bottom-start",
						"top",
						"bottom"
					],
					padding: 8
				}),
				shift({ padding: 8 })
			]
		});
		const click = useClick(floating.context);
		const dismiss = useDismiss(floating.context);
		const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);
		(0, import_react.useEffect)(() => {
			if (!open) return;
			openMenu().catch(() => void 0);
		}, [open, openMenu]);
		if (connectedConnectors.length === 0) return null;
		const isMulti = visibleLogos.length > 1;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			ref: floating.refs.setReference,
			className: (0, import_classnames.default)(chip_base_module_default.chipBase, connector_chip_module_default.chip, {
				[chip_base_module_default.chipBaseHovered]: open,
				[connector_chip_module_default.chipMulti]: isMulti
			}),
			"aria-haspopup": "menu",
			"aria-expanded": open,
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: connector_chip_module_default.logoStack,
				children: visibleLogos.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorLogo, {
					icon: c.icon,
					name: c.name,
					stackIndex: idx
				}, c.id))
			})
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: floating.refs.setFloating,
			className: connector_chip_module_default.popover,
			style: floating.floatingStyles,
			role: "menu",
			"aria-label": t("input.connectorChip.popoverLabel"),
			...getFloatingProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorChipPopover, {
				connectors: popoverConnectors,
				onClose: () => setOpen(false)
			})
		})] });
	};
	ConnectorChipPopover = ({ connectors, onClose }) => {
		const t = useTranslation();
		const navigate = useNavigate();
		const { getDisplayState, toggleConnector } = useConnectorMenuRuntime("chat_input");
		const { reportEvent, Events } = useAgentTelemetry();
		const handleSummonMore = (0, import_react.useCallback)(() => {
			onClose();
			navigate("/connectors");
		}, [navigate, onClose]);
		/**
		* 渲染顺序冻结（与加号菜单二级面板一致）：
		*   - popover 首次打开时拍一张顺序快照
		*   - 期间 toggle 开关 / 最近使用变化都不触发重排，避免点击后行被挤动
		*   - popover 关闭重开（组件 unmount 重 mount）时用最新顺序重新拍
		*   - 快照外的新增项追加在末尾
		*/
		const orderSnapshotRef = (0, import_react.useRef)(null);
		if (orderSnapshotRef.current === null && connectors.length > 0) orderSnapshotRef.current = connectors.map((c) => c.id);
		const orderedConnectors = (0, import_react.useMemo)(() => {
			const snapshot = orderSnapshotRef.current;
			if (!snapshot) return connectors;
			const byId = new Map(connectors.map((c) => [c.id, c]));
			const sorted = [];
			for (const id of snapshot) {
				const c = byId.get(id);
				if (c) {
					sorted.push(c);
					byId.delete(id);
				}
			}
			for (const c of byId.values()) sorted.push(c);
			return sorted;
		}, [connectors]);
		(0, import_react.useEffect)(() => {
			if (orderedConnectors.length === 0 || !claimConnectorEntryShow("chat_input")) return;
			const totalCount = orderedConnectors.length;
			orderedConnectors.forEach((connector, index) => {
				const isConnected = isConnectorConnected(getDisplayState(connector.id));
				reportEvent(Events.ConnectorEntryShow, {
					entry: "chat_input",
					connectorId: connector.id,
					connectorName: connector.name,
					connectorType: inferConnectorKind(connector),
					isConnected,
					position: index + 1,
					totalCount,
					isOfficial: true
				});
			});
		}, [
			orderedConnectors,
			getDisplayState,
			reportEvent,
			Events
		]);
		if (orderedConnectors.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: connector_chip_module_default.popoverEmpty,
			children: t("input.connectorChip.empty")
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: connector_chip_module_default.popoverList,
				children: orderedConnectors.map((c) => {
					const isOn = isConnectorMenuOn(getDisplayState(c.id));
					const handleToggle = () => {
						toggleConnector(c, !isOn).catch(() => void 0);
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRow, {
						icon: c.icon,
						name: c.name,
						isOn,
						onToggle: handleToggle
					}, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: connector_chip_module_default.popoverDivider,
				role: "separator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: connector_chip_module_default.popoverFooter,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: connector_chip_module_default.popoverFooterItem,
					role: "menuitem",
					onClick: handleSummonMore,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: connector_chip_module_default.popoverFooterIcon,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JumpIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: connector_chip_module_default.popoverFooterLabel,
						children: t("input.wbAdd.connectors.summonMore")
					})]
				})
			})
		] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/connector-chip/index.ts
var init_connector_chip = __esmMin((() => {
	init_connector_chip$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/wb-status-chips/index.ts
var init_wb_status_chips = __esmMin((() => {
	init_mode_chip();
	init_expert_chip();
	init_connector_chip();
	init_design_options();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/prompt-failure-banner-events.ts
/** 派发失败信息；同时写入 pending，供尚未订阅的消费方补取。 */
function emitPromptFailureBanner(payload) {
	pendingPayload = payload;
	window.dispatchEvent(new CustomEvent(PROMPT_FAILURE_BANNER_EVENT, { detail: payload }));
}
/**
* 取出并清除属于指定会话的 pending 失败。
*
* 会话不匹配时返回 null 且**不清除** —— 目标页可能还没挂上来，清掉会让失败彻底丢失。
*/
function consumePendingPromptFailureBanner(conversationId) {
	if (!pendingPayload || pendingPayload.conversationId !== conversationId) return null;
	const payload = pendingPayload;
	pendingPayload = null;
	return payload;
}
function subscribePromptFailureBanner(listener) {
	const handler = (event) => {
		const detail = event.detail;
		if (detail) listener(detail);
	};
	window.addEventListener(PROMPT_FAILURE_BANNER_EVENT, handler);
	return () => window.removeEventListener(PROMPT_FAILURE_BANNER_EVENT, handler);
}
var PROMPT_FAILURE_BANNER_EVENT, pendingPayload;
var init_prompt_failure_banner_events = __esmMin((() => {
	PROMPT_FAILURE_BANNER_EVENT = "workbuddy:prompt-failure-banner";
	pendingPayload = null;
}));
//#endregion
export { buildWidgetImageResolver as C, pickLocalizedSkillName as S, init_use_stop_generation_shortcut as T, init_application_mentions as _, init_wb_status_chips as a, mergeTeamSkills as b, ExpertChip as c, init_mode_chip$1 as d, init_wb_input_add as f, createApplicationChip as g, init_application as h, subscribePromptFailureBanner as i, init_expert_chip$1 as l, init_wb_input_add$1 as m, emitPromptFailureBanner as n, ConnectorChip as o, WbInputAddMenu as p, init_prompt_failure_banner_events as r, init_connector_chip$1 as s, consumePendingPromptFailureBanner as t, ModeChip as u, fetchPersonalSkillInfos as v, init_widget_image_resolver as w, pickLocalizedDescription as x, init_skill_list_core as y };
