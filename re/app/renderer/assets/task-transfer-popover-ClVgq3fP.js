import { n as __esmMin, r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $at as s$2, $ot as Ca, C1 as useThemeListener, CS as init_file_icons, CW as sanitizeHtmlDocument, Cat as a$3, Drt as Icon, E as init_contexts, E1 as init_useI18n, Gat as o$2, I1 as t$3, Iat as t$1, Jat as F, Mat as r$2, Nat as a$5, O1 as useTranslation, Ok as useAccountScopedWebviewPartition, PC as init_hooks, Rat as n$1, SS as getFileIcon$1, V5 as message, Vat as s$1, ZG as useFloatingLayer, Zat as n$2, _F as PencilIcon, aot as e$1, bF as TrashIcon, c9 as WbFileMarkdownIcon, d0 as useModuleHost, dF as CheckIcon, e6 as fileUriToLocalPath, eot as a$2, est as init_dist$2, f9 as WbFileHtmlIcon, fF as ChevronDownIcon, gF as MoreIcon, i9 as WbFileSheetIcon, iot as t$2, j1 as init_i18n, jrt as Avatar, k1 as getLocale, m5 as init_src, mS as TopProgressBanner, n6 as getArtifactFilePath, n7 as Dropdown, o6 as init_file_path, p7 as Popover, rot as o$1, trt as ArtifactFileTypeIcon, tst as wa, vat as init_dist$1, w5 as ColorPicker, x1 as init_useTheme, xW as init_html_sanitizer, xat as c$1, yC as init_components, yat as i$4, zat as a$4 } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, Yl as init_lucide_react, t as init_src$1, wd as Link2, zi as MarkdownRenderer } from "./lib-chat-ui-D8Ji0f8n.js";
import { J as createNetDriveServiceStore, Q as init_netdrive_service, Z as getNetDriveAppId } from "./locale-utils-TanlkH9x.js";
import { c as ensureProjectMessageNetdiskAttachmentFolder, l as ensureProjectTodoNetdiskAttachmentFolder, t as init_browser } from "./browser-CX1Llsmu.js";
import { n as NetDriveStoreProvider, r as init_netdrive_store_context } from "./cloud-file-constants-C-3tulP1.js";
import { a as init_my_files, d as fetchHtmlPreview, f as init_fetch_html_preview, m as useNetDriveFileDownload } from "./knowledge-base-panel-FcaY2fds.js";
import { i as init_store, t as createMyFilesStore } from "./store-B9VMId-K.js";
import { i as init_beacon_report, n as TEAMS_EVENT, o as useTeamsReport, s as init_context, t as TEAMS_ELEMENT } from "./beacon-report-BU-rcz1s.js";
import { n as useMembersStore, t as init_members_store } from "./members-store-BIlOz4aY.js";
import { A as peekSmartsheetService, C as resolveTagStyle, E as ensureSmartsheetService, O as isSmartsheetBootstrapRegistered, b as init_smart_sheet, c as TeamsUserLabel, h as resolveTeamMember, i as init_project_netdrive_store, j as registerSmartsheetServiceBootstrap, k as onceSmartsheetBootstrapRegistered, m as init_resolve_team_member, n as init_netdrive_selector_modal, o as useProjectNetDriveReady, r as getProjectStores, s as init_teams_user_display, t as NetDriveSelectorModal, u as TeamsUserAvatar, v as init_member_avatars_store, x as TAG_PALETTE_SWATCHES$1, y as useMemberAvatarsStore } from "./netdrive-selector-modal-B1ZsF4c1.js";
import { it as PRIORITY_TEXTS, lt as resolvePriorityOption } from "./smartsheet-view-renderer-BFZQr-vJ.js";
import { o as init_constants, s as isTitleOverMaxLength } from "./constants-DqyeRxJK.js";
//#region ../../packages/agent-ui/src/modules/collab/hooks/use-member-resolver.ts
function useMemberResolver() {
	return (0, import_react$28.useCallback)(async (userIds) => {
		const members = useMembersStore.getState().members;
		const map = new Map(members.map((m) => [m.id, m]));
		return userIds.map((id) => {
			const m = map.get(id);
			return {
				id,
				name: m?.displayName || m?.name || id,
				avatarUrl: m?.avatar || ""
			};
		});
	}, []);
}
var import_react$28;
var init_use_member_resolver = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_members_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/task/task-transfer-popover.less
var init_task_transfer_popover$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/source-icon/wb-all-worksapace.svg
var wb_all_worksapace_default;
var init_wb_all_worksapace = __esmMin((() => {
	wb_all_worksapace_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='14'%20height='14'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%200.730625%200.748142)'%20d='M2.3319%200Q3.2978%200%203.9808%200.683Q4.4412%201.1434%204.5912%201.7325L7.9475%201.7325Q8.0975%201.1434%208.558%200.683Q9.241%200%2010.2069%200Q11.1728%200%2011.8558%200.683Q12.5387%201.366%2012.5387%202.3319Q12.5387%203.2978%2011.8558%203.9808Q11.1728%204.6637%2010.2069%204.6637Q9.241%204.6637%208.558%203.9808Q8.0839%203.5067%207.9389%202.8962L6.429%202.8962Q6.6668%203.2559%206.7745%203.6876Q6.8513%203.9951%206.8513%204.9394L6.8513%207.5644Q6.8512%208.3656%206.8933%208.5343Q7.0993%209.3595%207.9244%209.5654Q7.9367%209.5685%207.9523%209.5713Q8.1048%208.9936%208.558%208.5405Q9.241%207.8575%2010.2069%207.8575Q11.1728%207.8575%2011.8558%208.5405Q12.5387%209.2235%2012.5387%2010.1894Q12.5387%2011.1553%2011.8558%2011.8382Q11.1728%2012.5212%2010.2069%2012.5212Q9.241%2012.5212%208.558%2011.8382Q8.0781%2011.3583%207.9354%2010.7388Q7.7501%2010.7213%207.6427%2010.6945Q6.9505%2010.5218%206.4437%2010.015Q5.937%209.5083%205.7642%208.8161Q5.6875%208.5086%205.6875%207.5644L5.6875%204.9394Q5.6875%204.1381%205.6454%203.9694Q5.4395%203.1442%204.6143%202.9383Q4.6038%202.9357%204.5907%202.9332Q4.4405%203.5211%203.9808%203.9808Q3.2978%204.6637%202.3319%204.6637Q1.366%204.6637%200.683%203.9808Q0%203.2978%200%202.3319Q0%201.366%200.683%200.683Q1.366%200%202.3319%200ZM2.3319%201.1638Q1.848%201.1638%201.5059%201.5059Q1.1638%201.848%201.1638%202.3319Q1.1638%202.8157%201.5059%203.1579Q1.848%203.5%202.3319%203.5Q2.8157%203.5%203.1579%203.1579Q3.5%202.8157%203.5%202.3319Q3.5%201.848%203.1579%201.5059Q2.8157%201.1638%202.3319%201.1638ZM10.2069%201.1638Q9.723%201.1638%209.3809%201.5059Q9.0387%201.848%209.0387%202.3319Q9.0387%202.8157%209.3809%203.1579Q9.723%203.5%2010.2069%203.5Q10.6907%203.5%2011.0329%203.1579Q11.375%202.8157%2011.375%202.3319Q11.375%201.848%2011.0329%201.5059Q10.6907%201.1638%2010.2069%201.1638ZM9.3809%209.3634Q9.723%209.0212%2010.2069%209.0212Q10.6907%209.0212%2011.0329%209.3634Q11.375%209.7055%2011.375%2010.1894Q11.375%2010.6732%2011.0329%2011.0153Q10.6907%2011.3575%2010.2069%2011.3575Q9.723%2011.3575%209.3809%2011.0153Q9.0387%2010.6732%209.0387%2010.1894Q9.0387%209.7055%209.3809%209.3634Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/source-icon/wb-credits.svg
var wb_credits_default;
var init_wb_credits = __esmMin((() => {
	wb_credits_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='14'%20height='14'%3e%3cclipPath%20id='clip_0'%3e%3crect%20width='14'%20height='14'/%3e%3c/clipPath%3e%3cg%20clip-path='url(%23clip_0)'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(0.707107%200.707107%20-0.707107%200.707107%207.00086%20-0.116119)'%20d='M9.6937%202.526Q9.6943%202.5243%209.695%202.5226L9.7239%202.4477L9.768%202.3355Q9.8079%202.2341%209.8184%202.2042Q10.1363%201.2942%209.4523%200.6102Q8.7683%20-0.0738%207.8583%200.2441Q7.8284%200.2546%207.7266%200.2946L7.6113%200.34L7.5364%200.3688Q5.0315%201.3172%202.5232%200.3676L2.4479%200.3386L2.3354%200.2943Q2.2344%200.2546%202.2046%200.2442Q1.2944%20-0.0739%200.6104%200.6103Q-0.0737%201.2944%200.2445%202.2046Q0.2549%202.2344%200.2948%202.3357L0.3399%202.4505L0.3687%202.5249Q1.3179%205.0309%200.3675%207.5403L0.3387%207.615L0.2947%207.7269Q0.2549%207.828%200.2444%207.8578Q-0.0737%208.768%200.6104%209.4521Q1.2945%2010.1362%202.2047%209.8181Q2.2345%209.8076%202.3362%209.7676L2.4509%209.7225L2.5254%209.6937Q5.0315%208.7445%207.541%209.6951L7.6155%209.7239L7.7272%209.7678Q7.8281%209.8076%207.8578%209.818Q8.768%2010.1362%209.4522%209.4521Q10.1364%208.768%209.8183%207.8578Q9.8079%207.8281%209.7677%207.7261L9.7224%207.6108L9.6936%207.536Q8.7459%205.0327%209.6937%202.526ZM8.6381%202.0289L8.6079%202.1071L8.6066%202.1105Q7.5009%205.0309%208.6078%207.9548L8.6393%208.0365L8.6849%208.1525Q8.7168%208.2334%208.7197%208.2418Q8.7966%208.4619%208.6294%208.6292Q8.4621%208.7964%208.242%208.7195Q8.2336%208.7165%208.153%208.6848L8.0345%208.6382L7.9532%208.6068Q5.0315%207.5001%202.1064%208.608L2.0251%208.6394L1.9096%208.6848Q1.8291%208.7165%201.8207%208.7195Q1.6006%208.7964%201.4333%208.6292Q1.2661%208.4619%201.343%208.2418Q1.3459%208.2334%201.3777%208.1527L1.4244%208.034L1.4558%207.9525Q2.5623%205.0309%201.4544%202.106L1.423%202.0246L1.3776%201.9091Q1.346%201.8289%201.343%201.8205Q1.2661%201.6004%201.4333%201.4331Q1.6005%201.2658%201.8207%201.3428Q1.8291%201.3457%201.9097%201.3774L2.0291%201.4244L2.1112%201.456Q5.0315%202.5615%207.9553%201.4546L8.037%201.4231L8.1531%201.3774Q8.2337%201.3457%208.2421%201.3427Q8.4622%201.2659%208.6294%201.4331Q8.7966%201.6003%208.7197%201.8204Q8.7168%201.8288%208.6849%201.9098L8.6381%202.0289Z'%20fill-rule='evenodd'/%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/source-icon/wb-scheduled-tasks.svg
var wb_scheduled_tasks_default;
var init_wb_scheduled_tasks = __esmMin((() => {
	wb_scheduled_tasks_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='14'%20height='14'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%200.0171569%200.0154071)'%20d='M2.6126%200Q1.0072%201.0065%200%202.6116L0.9858%203.2301Q1.8512%201.8509%203.2307%200.986L2.6126%200ZM13.9648%202.6116Q12.9577%201.0065%2011.3522%200L10.7341%200.986Q12.1136%201.8509%2012.9791%203.2301L13.9648%202.6116ZM11.416%202.5515Q9.5798%200.7152%206.9829%200.7152Q4.3861%200.7152%202.5498%202.5515Q0.7136%204.3877%200.7136%206.9846Q0.7136%209.2856%202.1552%2010.9894L0.884%2012.2606L1.7069%2013.0835L2.9781%2011.8123Q4.6819%2013.254%206.9829%2013.254Q9.2839%2013.254%2010.9878%2011.8123L12.259%2013.0835L13.0819%2012.2606L11.8106%2010.9894Q13.2523%209.2856%2013.2523%206.9846Q13.2523%204.3877%2011.416%202.5515ZM3.3727%203.3744Q4.8681%201.879%206.9829%201.879Q9.0977%201.879%2010.5932%203.3744Q12.0886%204.8698%2012.0886%206.9846Q12.0886%209.0994%2010.5932%2010.5948Q9.0977%2012.0902%206.9829%2012.0902Q4.8681%2012.0902%203.3727%2010.5948Q1.8773%209.0994%201.8773%206.9846Q1.8773%204.8698%203.3727%203.3744ZM10.0194%205.646L6.8588%208.8066L6.8542%208.8112Q6.4484%209.2171%206.1079%209.217Q5.7675%209.2171%205.3617%208.8112L5.3571%208.8066L3.9465%207.396L4.7694%206.5732L6.1079%207.9117L9.1965%204.8232L10.0194%205.646Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/connectors/source-icon-mapping.ts
/**
* 单一决策函数：把 source 字符串归类到一个 icon kind。
*
* 未匹配（含 manual / jira / linear / 未知 connector）返回 undefined，调用方
* 据此决定是否绘制图标（兜底场景不展示图标，由文字代表 source）。
*/
function resolveBoardSourceIconKind(source) {
	const normalized = source.trim();
	if (normalized === "handoff") return "handoff";
	if (SCHEDULED_SYNC_SOURCES.has(normalized)) return "scheduled-sync";
	if (WEBHOOK_SYNC_SOURCES.has(normalized)) return "webhook-sync";
}
/**
* 给 source-resolver.ts 调用：source → SVG URL 字符串。
*
* source 为空 / 未匹配到分类时返回 undefined（resolver 据此决定
* `WbSourceInfo.iconUrl` 是否填充）。
*/
function resolveBoardSourceIconUrl(source) {
	if (!source) return;
	const kind = resolveBoardSourceIconKind(source);
	return kind ? ICON_URLS[kind] : void 0;
}
var SCHEDULED_SYNC_SOURCES, WEBHOOK_SYNC_SOURCES, ICON_URLS;
var init_source_icon_mapping = __esmMin((() => {
	init_wb_all_worksapace();
	init_wb_credits();
	init_wb_scheduled_tasks();
	SCHEDULED_SYNC_SOURCES = /* @__PURE__ */ new Set([
		"cnb-apikey",
		"enterprise_cnb-apikey",
		"tapd-apikey",
		"enterprise_tapd-apikey"
	]);
	WEBHOOK_SYNC_SOURCES = /* @__PURE__ */ new Set(["github"]);
	ICON_URLS = {
		"handoff": wb_all_worksapace_default,
		"scheduled-sync": wb_scheduled_tasks_default,
		"webhook-sync": wb_credits_default
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/connectors/source-resolver.ts
/**
* 归一化 raw source：去首尾空白 + 转小写。
*
* 后端 / 上游在不同链路里对 source 的大小写、空白并不保证一致（例如生产构建下
* 分组 / 筛选传入的 raw 值可能是 `MANUAL`/` handoff ` 等），而 `SOURCE_LABEL_KEYS`
* 与 registry 都以规范小写 key 存储。查表前统一归一化，避免大小写 / 空白差异导致
* miss 后回落到原值（表现为「仅生产构建下显示 manual/handoff 英文原值」的回归）。
*/
function normalizeSource(source) {
	return source.trim().toLowerCase();
}
/**
* 创建一个同步的 source → WbSourceInfo 解析器。
*
* 工厂同步返回，**异步**触发后端 connector_registry 拉取并填充 module-scope
* 缓存。首屏未就绪时仅走 i18n / 原值兜底，不阻塞渲染；拉取完成后下一次调用
* 即可命中 registry。
*
* 同一 projectId 缓存共享：plan tab / chat / mention / smart-sheet 多次创建
* resolver 都复用同一份 registry 缓存。
*/
function createSourceResolver(options) {
	const { projectId, connectorFacade, t } = options;
	warmRegistry(projectId, connectorFacade).catch(() => {});
	return (source) => {
		if (!source) return { displayName: "" };
		return {
			displayName: resolveDisplayName(source, projectId, t),
			iconUrl: resolveBoardSourceIconUrl(source)
		};
	};
}
/**
* 清理指定项目的 registry 缓存（项目切出 / 退出登录时调用）。
* 不传 projectId 则清空全部。
*/
function clearSourceResolverCache(projectId) {
	if (projectId === void 0) {
		registryCache.clear();
		inflightRequests.clear();
		return;
	}
	registryCache.delete(projectId);
	inflightRequests.delete(projectId);
}
function resolveDisplayName(source, projectId, t) {
	const normalized = normalizeSource(source);
	const fromRegistry = registryCache.get(projectId)?.get(normalized);
	if (fromRegistry) return fromRegistry;
	const key = SOURCE_LABEL_KEYS[normalized];
	if (key) return t(key);
	return source;
}
function warmRegistry(projectId, connectorFacade) {
	if (!connectorFacade || !projectId) return Promise.resolve();
	if (registryCache.has(projectId)) return Promise.resolve();
	const existing = inflightRequests.get(projectId);
	if (existing) return existing;
	const request = (async () => {
		try {
			const result = await connectorFacade.listRegistry({
				scope: "all",
				capability: AUTOMATION_SOURCE_CAPABILITY,
				projectId
			});
			const map = /* @__PURE__ */ new Map();
			for (const item of result.list ?? []) if (item?.name && item.displayName) map.set(normalizeSource(item.name), item.displayName);
			registryCache.set(projectId, map);
		} catch (error) {
			console.warn("[source-resolver] listRegistry failed:", error);
		} finally {
			inflightRequests.delete(projectId);
		}
	})();
	inflightRequests.set(projectId, request);
	return request;
}
var registryCache, inflightRequests, SOURCE_LABEL_KEYS, AUTOMATION_SOURCE_CAPABILITY;
var init_source_resolver = __esmMin((() => {
	init_source_icon_mapping();
	registryCache = /* @__PURE__ */ new Map();
	inflightRequests = /* @__PURE__ */ new Map();
	SOURCE_LABEL_KEYS = {
		manual: "collab.plan.source.label.manual",
		handoff: "collab.plan.source.label.handoff",
		cnb: "collab.plan.source.label.cnb",
		tapd: "collab.plan.source.label.tapd",
		jira: "collab.plan.source.label.jira",
		linear: "collab.plan.source.label.linear",
		github: "collab.plan.source.label.github"
	};
	AUTOMATION_SOURCE_CAPABILITY = "automation_source";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/assignee-chip-summary.less
var init_assignee_chip_summary$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/assignee-chip-summary.tsx
var import_react$27, import_jsx_runtime$19, MAX_VISIBLE, AssigneeChipSummary;
var init_assignee_chip_summary = __esmMin((() => {
	init_assignee_chip_summary$1();
	init_src();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_teams_user_display();
	import_jsx_runtime$19 = require_jsx_runtime();
	MAX_VISIBLE = 2;
	AssigneeChipSummary = ({ members, avatarSize = 16, className }) => {
		const t = useTranslation();
		const normalized = (0, import_react$27.useMemo)(() => members.filter((member) => Boolean(member.id)), [members]);
		if (normalized.length === 0) return null;
		const visibleMembers = normalized.slice(0, MAX_VISIBLE);
		const hasOverflow = normalized.length > visibleMembers.length;
		const mergedClassName = ["assignee-chip-summary", className].filter(Boolean).join(" ");
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("span", {
			className: mergedClassName,
			children: [visibleMembers.map((member, index) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("span", {
				className: ["assignee-chip-summary__item", index === 0 ? "assignee-chip-summary__item--primary" : "assignee-chip-summary__item--secondary"].join(" "),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(TeamsUserAvatar, {
					userId: member.id,
					fallbackName: member.name,
					fallbackAvatar: member.avatarUrl || member.avatar,
					size: avatarSize,
					className: "assignee-chip-summary__avatar"
				}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(TeamsUserLabel, {
					userId: member.id,
					fallbackName: member.name,
					unknownLabel: t("collab.task.collaborators.unknown"),
					className: "assignee-chip-summary__name"
				})]
			}, member.id)), hasOverflow && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Avatar, {
				size: avatarSize,
				className: "assignee-chip-summary__avatar assignee-chip-summary__avatar--more",
				children: String(normalized.length)
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/assets/todo-netdisk-attachment-upload.ts
function isFolderMissingError(error) {
	const err = error;
	const message = String(err?.message ?? "").toLowerCase();
	return err?.code === "FileNotFound" || err?.code === "ResourceNotFound" || err?.retcode === 404 || err?.data?.retcode === 404 || message.includes("not found") || message.includes("不存在") || message.includes("已删除");
}
async function uploadSingleFile(client, folderId, file, netDriveStore, isHandoffArtifact) {
	const result = await client.file.upload(file, {
		folderId,
		appId: getNetDriveAppId(netDriveStore),
		conflictResolutionStrategy: "rename"
	});
	const fileId = result.fileID || result.fileId || "";
	if (!fileId) throw new Error("上传附件失败：网盘未返回文件 ID");
	return {
		provider: "netdisk",
		externalId: fileId,
		name: file.name,
		fileType: file.name.includes(".") ? file.name.split(".").pop() : void 0,
		fileSize: file.size,
		...isHandoffArtifact ? { isHandoffArtifact: true } : {}
	};
}
/** 上传本地附件到项目网盘 `待办附件/<todoId>` 目录，并返回可绑定到 Todo 的附件参数。 */
async function uploadTodoAttachmentsToProjectNetdisk({ adapter, projectId, todoId, files, isHandoffArtifact }) {
	if (files.length === 0) return [];
	if (!todoId) throw new Error("上传附件失败：缺少待办 ID");
	const netDriveStore = getProjectStores(projectId).netDriveServiceStore;
	await netDriveStore.getState().initialize(adapter, projectId);
	const client = netDriveStore.getState().getClient();
	const getFolderId = () => ensureProjectTodoNetdiskAttachmentFolder(client, {
		rootFolderId: netDriveStore.getState().getRootFolderId(),
		todoId,
		appId: getNetDriveAppId(netDriveStore)
	});
	let folderId = await getFolderId();
	return Promise.all(files.map(async (file) => {
		try {
			return await uploadSingleFile(client, folderId, file, netDriveStore, isHandoffArtifact);
		} catch (error) {
			if (!isFolderMissingError(error)) throw error;
			folderId = await getFolderId();
			return uploadSingleFile(client, folderId, file, netDriveStore, isHandoffArtifact);
		}
	}));
}
/**
* 上传本地附件到项目网盘 `系统文件/<bucketName>`（默认 `draft`）目录。
*
* 留言场景专用：composer 阶段还没有 messageId（mutation 之后才生成），无法走
* `uploadTodoAttachmentsToProjectNetdisk` 的 todoId 路径。返回的 fileId 直接随
* `addProjectMessage / replyProjectMessage` 一起入参，后端写
* `t_teams_project_message_attachments` 即可——附件归属由 message_id 表外键决定，
* 与所属网盘目录解耦，因此无需迁移文件。
*/
async function uploadProjectMessageAttachmentsToNetdisk({ adapter, projectId, files, bucketName }) {
	if (files.length === 0) return [];
	const netDriveStore = getProjectStores(projectId).netDriveServiceStore;
	await netDriveStore.getState().initialize(adapter, projectId);
	const client = netDriveStore.getState().getClient();
	const getFolderId = () => ensureProjectMessageNetdiskAttachmentFolder(client, {
		rootFolderId: netDriveStore.getState().getRootFolderId(),
		bucketName,
		appId: getNetDriveAppId(netDriveStore)
	});
	let folderId = await getFolderId();
	return Promise.all(files.map(async (file) => {
		try {
			return await uploadSingleFile(client, folderId, file, netDriveStore);
		} catch (error) {
			if (!isFolderMissingError(error)) throw error;
			folderId = await getFolderId();
			return uploadSingleFile(client, folderId, file, netDriveStore);
		}
	}));
}
var init_todo_netdisk_attachment_upload = __esmMin((() => {
	init_browser();
	init_netdrive_service();
	init_project_netdrive_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/attachment/project-plan-attachment-list.less
var init_project_plan_attachment_list$1 = __esmMin((() => {}));
var init_delete = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/assets/cloud-file-preview-modal.tsx
function defaultT(key) {
	return DEFAULT_LABELS[key] ?? key;
}
/** 从文件名提取小写扩展名（不含点号） */
function getExtension(name) {
	const idx = name.lastIndexOf(".");
	if (idx < 0 || idx === name.length - 1) return "";
	return name.slice(idx + 1).toLowerCase();
}
/**
* 判断文件类型是否可预览，以及使用什么预览模式。
* 网盘文件严格对齐 SMH SDK 支持表；本地文件只启用浏览器可直接渲染的类型。
*/
function getPreviewMode(file) {
	const ext = getExtension(file.name);
	if (IMAGE_PREVIEW_EXTENSIONS.includes(ext) || file.type === "image") return "image";
	if (ext === "pdf") return "pdf";
	if (file.localFile) {
		if (MARKDOWN_PREVIEW_EXTENSIONS.includes(ext)) return "markdown";
		return LOCAL_DOCUMENT_PREVIEW_EXTENSIONS.includes(ext) ? "document" : "none";
	}
	if (HTML_PREVIEW_EXTENSIONS.includes(ext)) return "html";
	if (NETDRIVE_DOCUMENT_PREVIEW_EXTENSIONS.includes(ext)) return "document";
	return "none";
}
function getFileIcon(file, size) {
	return getFileIcon$1(file.name, size, file.type);
}
function CloudFilePreviewModal({ file, netDriveStore, adapter, onClose, actions, t = defaultT, zIndex: zIndexProp }) {
	const isDesktopEnv = adapter?.environmentType === "local";
	const netdrivePreviewPartition = useAccountScopedWebviewPartition("netdrive-file-preview");
	const stackZIndex = useFloatingLayer(Boolean(file));
	const zIndex = zIndexProp ?? stackZIndex;
	const [previewUrl, setPreviewUrl] = (0, import_react$26.useState)(null);
	const [localText, setLocalText] = (0, import_react$26.useState)("");
	const [htmlContent, setHtmlContent] = (0, import_react$26.useState)(null);
	const [htmlOversized, setHtmlOversized] = (0, import_react$26.useState)(false);
	const [loading, setLoading] = (0, import_react$26.useState)(false);
	const [error, setError] = (0, import_react$26.useState)(null);
	const [reloadKey, setReloadKey] = (0, import_react$26.useState)(0);
	const [mounted, setMounted] = (0, import_react$26.useState)(false);
	const [animating, setAnimating] = (0, import_react$26.useState)(false);
	const [fullscreen, setFullscreen] = (0, import_react$26.useState)(false);
	const [moreOpen, setMoreOpen] = (0, import_react$26.useState)(false);
	const moreRef = (0, import_react$26.useRef)(null);
	const [imgScale, setImgScale] = (0, import_react$26.useState)(1);
	const [imgOffset, setImgOffset] = (0, import_react$26.useState)({
		x: 0,
		y: 0
	});
	const dragStartRef = (0, import_react$26.useRef)(null);
	const [dragging, setDragging] = (0, import_react$26.useState)(false);
	const IMG_MIN_SCALE = 1;
	const IMG_MAX_SCALE = 5;
	const IMG_SCALE_STEP = .0015;
	const resetImageTransform = (0, import_react$26.useCallback)(() => {
		setImgScale(1);
		setImgOffset({
			x: 0,
			y: 0
		});
		dragStartRef.current = null;
		setDragging(false);
	}, []);
	(0, import_react$26.useEffect)(() => {
		resetImageTransform();
	}, [
		file,
		reloadKey,
		resetImageTransform
	]);
	const handleImageWheel = (0, import_react$26.useCallback)((e) => {
		e.preventDefault();
		setImgScale((prev) => {
			const next = Math.min(IMG_MAX_SCALE, Math.max(IMG_MIN_SCALE, prev - e.deltaY * IMG_SCALE_STEP));
			if (next <= IMG_MIN_SCALE) setImgOffset({
				x: 0,
				y: 0
			});
			return next;
		});
	}, []);
	const handleImageMouseDown = (0, import_react$26.useCallback)((e) => {
		if (imgScale <= IMG_MIN_SCALE) return;
		e.preventDefault();
		dragStartRef.current = {
			x: e.clientX,
			y: e.clientY,
			ox: imgOffset.x,
			oy: imgOffset.y
		};
		setDragging(true);
	}, [imgScale, imgOffset]);
	(0, import_react$26.useEffect)(() => {
		if (!dragging) return;
		const onMove = (e) => {
			const start = dragStartRef.current;
			if (!start) return;
			setImgOffset({
				x: start.ox + (e.clientX - start.x),
				y: start.oy + (e.clientY - start.y)
			});
		};
		const onUp = () => {
			dragStartRef.current = null;
			setDragging(false);
		};
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
		};
	}, [dragging]);
	const handleImageDoubleClick = (0, import_react$26.useCallback)(() => {
		setImgScale((prev) => {
			if (prev > IMG_MIN_SCALE) {
				setImgOffset({
					x: 0,
					y: 0
				});
				return IMG_MIN_SCALE;
			}
			return 2;
		});
	}, []);
	(0, import_react$26.useEffect)(() => {
		if (!file) {
			setPreviewUrl(null);
			setLocalText("");
			setHtmlContent(null);
			setHtmlOversized(false);
			setLoading(false);
			setError(null);
			return;
		}
		const mode = getPreviewMode(file);
		if (mode === "none") {
			setPreviewUrl(null);
			setLocalText("");
			setHtmlContent(null);
			setHtmlOversized(false);
			setLoading(false);
			setError(null);
			return;
		}
		setHtmlContent(null);
		setHtmlOversized(false);
		if (mode === "html") {
			let cancelled = false;
			const controller = new AbortController();
			setLoading(true);
			setError(null);
			setPreviewUrl(null);
			(async () => {
				try {
					const state = netDriveStore.getState();
					if (!state.adapter || !state.initialized) throw new Error("网盘服务未初始化");
					const dl = await state.getClient().file.download({ fileID: file.id });
					if (cancelled) return;
					if (!dl?.url) throw new Error("下载链接为空");
					const result = await fetchHtmlPreview({
						url: dl.url,
						maxBytes: HTML_PREVIEW_MAX_BYTES,
						signal: controller.signal
					});
					if (cancelled) return;
					switch (result.status) {
						case "ok":
							setHtmlContent(result.text);
							break;
						case "oversized":
						case "unsupported":
							setHtmlOversized(true);
							setHtmlContent(null);
							break;
						case "error": setError(result.message || "获取预览内容失败");
					}
				} catch (err) {
					if (!cancelled && err?.name !== "AbortError") {
						console.error("[CloudFilePreviewModal] 抓取 html 内容失败:", err);
						setError(err?.message || "获取预览内容失败");
					}
				} finally {
					if (!cancelled) setLoading(false);
				}
			})();
			return () => {
				cancelled = true;
				controller.abort();
			};
		}
		if (file.localFile) {
			setLocalText("");
			if (mode === "markdown") {
				let cancelled = false;
				setLoading(true);
				file.localFile.text().then((text) => {
					if (!cancelled) setLocalText(text);
				}).catch((reason) => {
					if (!cancelled) setError(reason instanceof Error ? reason.message : "读取本地文件失败");
				}).finally(() => {
					if (!cancelled) setLoading(false);
				});
				return () => {
					cancelled = true;
				};
			}
			const objectUrl = URL.createObjectURL(file.localFile);
			setPreviewUrl(objectUrl);
			setLoading(false);
			setError(null);
			return () => URL.revokeObjectURL(objectUrl);
		}
		let cancelled = false;
		setLoading(true);
		setError(null);
		setPreviewUrl(null);
		(async () => {
			try {
				const state = netDriveStore.getState();
				if (!state.adapter || !state.initialized) throw new Error("网盘服务未初始化");
				const result = await state.getClient().file.getPreviewUrl({ fileID: file.id });
				if (!cancelled && result?.previewURL) setPreviewUrl(result.previewURL);
				else if (!cancelled) setError("预览链接为空");
			} catch (err) {
				if (!cancelled) {
					console.error("[CloudFilePreviewModal] 获取预览链接失败:", err);
					setError(err?.message || "获取预览链接失败");
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		file,
		netDriveStore,
		reloadKey
	]);
	(0, import_react$26.useEffect)(() => {
		if (file) {
			setMounted(true);
			const r1 = requestAnimationFrame(() => {
				requestAnimationFrame(() => setAnimating(true));
			});
			return () => cancelAnimationFrame(r1);
		}
		setAnimating(false);
		const timer = setTimeout(() => {
			setMounted(false);
			setFullscreen(false);
		}, 200);
		return () => clearTimeout(timer);
	}, [file]);
	(0, import_react$26.useEffect)(() => {
		if (!moreOpen) return;
		const handler = (e) => {
			if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [moreOpen]);
	const handleRetry = (0, import_react$26.useCallback)(() => {
		setReloadKey((prev) => prev + 1);
	}, []);
	const safeHtmlContent = (0, import_react$26.useMemo)(() => htmlContent === null ? null : sanitizeHtmlDocument(htmlContent, "sandbox"), [htmlContent]);
	if (!mounted || !file) return null;
	const mode = getPreviewMode(file);
	const ext = getExtension(file.name);
	const frameClassName = `cfp-preview-modal__iframe${file.localFile && (ext === "txt" || ext === "log") ? " cfp-preview-modal__iframe--local-text" : ""}`;
	return (0, import_react_dom$7.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
		className: `cfp-preview-overlay${animating ? " cfp-preview-overlay--open" : ""}${fullscreen ? " cfp-preview-overlay--fullscreen" : ""}`,
		style: { zIndex },
		onClick: fullscreen ? onClose : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: `cfp-preview-modal${animating ? " cfp-preview-modal--open" : ""}${fullscreen ? " cfp-preview-modal--fullscreen" : ""}`,
			style: { zIndex: zIndex + 1 },
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cfp-preview-modal__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "cfp-preview-modal__info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
						className: "cfp-preview-modal__icon",
						children: getFileIcon(file, 18)
					}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cfp-preview-modal__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
							className: "cfp-preview-modal__title",
							children: file.name
						}), file.updatedAt && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
							className: "cfp-preview-modal__sub",
							children: ["最后修改时间 · ", file.updatedAt]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "cfp-preview-modal__actions",
					children: [
						actions && actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
							className: "cfp-preview-modal__more-wrapper",
							ref: moreRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
								type: "button",
								className: "cfp-preview-modal__btn",
								title: t("myFiles.preview.more"),
								onClick: () => setMoreOpen((prev) => !prev),
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("circle", {
											cx: "5",
											cy: "12",
											r: "2",
											fill: "currentColor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "2",
											fill: "currentColor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("circle", {
											cx: "19",
											cy: "12",
											r: "2",
											fill: "currentColor"
										})
									]
								})
							}), moreOpen && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
								className: "cfp-preview-modal__dropdown",
								children: actions.map((action, idx) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_react$26.Fragment, { children: [action.separator && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { className: "cfp-preview-modal__dropdown-sep" }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
									className: `cfp-preview-modal__dropdown-item${action.danger ? " cfp-preview-modal__dropdown-item--danger" : ""}`,
									onClick: () => {
										setMoreOpen(false);
										action.onClick(file);
									},
									children: [action.icon, /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: action.label })]
								})] }, `${action.label}-${idx}`))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
							type: "button",
							className: "cfp-preview-modal__btn",
							title: fullscreen ? t("myFiles.preview.exitFullscreen") : t("myFiles.preview.fullscreen"),
							onClick: () => setFullscreen((prev) => !prev),
							children: fullscreen ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
									d: "M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
									d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
							type: "button",
							className: "cfp-preview-modal__btn cfp-preview-modal__btn--close",
							title: t("myFiles.preview.close"),
							onClick: () => {
								onClose();
								setMoreOpen(false);
								setFullscreen(false);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
									d: "M18 6L6 18M6 6l12 12",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round"
								})
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "cfp-preview-modal__body",
				children: [
					loading && mode !== "none" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cfp-preview-modal__placeholder",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { className: "cfp-preview-modal__spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("myFiles.preview.loading") })]
					}),
					!loading && error && mode !== "none" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cfp-preview-modal__placeholder",
						children: [
							getFileIcon(file, 48),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
								className: "cfp-preview-modal__error-text",
								children: t("myFiles.preview.loadFailed")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
								type: "button",
								className: "cfp-preview-modal__retry-btn",
								onClick: handleRetry,
								children: t("common.retry")
							})
						]
					}),
					!loading && !error && mode === "image" && previewUrl && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "cfp-preview-modal__image-container",
						onWheel: handleImageWheel,
						onMouseDown: handleImageMouseDown,
						onDoubleClick: handleImageDoubleClick,
						style: { cursor: imgScale > 1 ? dragging ? "grabbing" : "grab" : "zoom-in" },
						children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("img", {
							className: "cfp-preview-modal__image",
							src: previewUrl,
							alt: file.name,
							draggable: false,
							onError: () => setError("图片加载失败"),
							style: {
								transform: `translate(${imgOffset.x}px, ${imgOffset.y}px) scale(${imgScale})`,
								transition: dragging ? "none" : "transform 0.15s ease-out"
							}
						})
					}),
					!loading && !error && mode === "markdown" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "cfp-preview-modal__markdown-content",
						style: {
							width: "100%",
							height: "100%",
							overflow: "auto",
							padding: 24,
							boxSizing: "border-box"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(MarkdownRenderer, {
							complete: true,
							children: localText
						})
					}),
					!loading && !error && (mode === "pdf" || mode === "document") && previewUrl && (isDesktopEnv && !file.localFile && netdrivePreviewPartition ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("webview", {
						className: frameClassName,
						src: previewUrl,
						webpreferences: "contextIsolation=yes,sandbox=yes",
						partition: netdrivePreviewPartition,
						nodeintegration: false,
						allowpopups: false
					}, netdrivePreviewPartition) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("iframe", {
						className: frameClassName,
						src: previewUrl,
						sandbox: "allow-scripts allow-same-origin",
						title: file.name
					})),
					!loading && !error && mode === "html" && safeHtmlContent !== null && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("iframe", {
						className: frameClassName,
						srcDoc: safeHtmlContent,
						sandbox: "allow-scripts",
						title: file.name
					}),
					!loading && !error && mode === "html" && htmlOversized && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cfp-preview-modal__placeholder",
						children: [getFileIcon(file, 48), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("myFiles.preview.notSupported") })]
					}),
					!loading && mode === "none" && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "cfp-preview-modal__placeholder",
						children: [getFileIcon(file, 48), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("myFiles.preview.notSupported") })]
					})
				]
			})]
		})
	}), document.body);
}
var import_react$26, import_react_dom$7, import_jsx_runtime$18, DEFAULT_LABELS, IMAGE_PREVIEW_EXTENSIONS, MARKDOWN_PREVIEW_EXTENSIONS, HTML_PREVIEW_EXTENSIONS, LOCAL_DOCUMENT_PREVIEW_EXTENSIONS, NETDRIVE_DOCUMENT_PREVIEW_EXTENSIONS, HTML_PREVIEW_MAX_BYTES;
var init_cloud_file_preview_modal = __esmMin((() => {
	init_src$1();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$7 = /* @__PURE__ */ __toESM(require_react_dom());
	init_file_icons();
	init_fetch_html_preview();
	init_html_sanitizer();
	init_contexts();
	init_hooks();
	import_jsx_runtime$18 = require_jsx_runtime();
	DEFAULT_LABELS = {
		"myFiles.preview.more": "更多",
		"myFiles.preview.fullscreen": "全屏",
		"myFiles.preview.exitFullscreen": "退出全屏",
		"myFiles.preview.close": "关闭",
		"myFiles.preview.loading": "加载中…",
		"myFiles.preview.loadFailed": "预览加载失败",
		"myFiles.preview.notSupported": "该文件类型暂不支持预览",
		"myFiles.preview.downloadToView": "下载查看",
		"common.retry": "重试"
	};
	IMAGE_PREVIEW_EXTENSIONS = [
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"bmp",
		"ico"
	];
	MARKDOWN_PREVIEW_EXTENSIONS = ["md", "markdown"];
	HTML_PREVIEW_EXTENSIONS = ["html", "htm"];
	LOCAL_DOCUMENT_PREVIEW_EXTENSIONS = [
		"c",
		"cpp",
		"h",
		"asm",
		"s",
		"java",
		"asp",
		"bat",
		"rtf",
		"txt",
		"log",
		"xml",
		"htm",
		"html",
		"csv"
	];
	NETDRIVE_DOCUMENT_PREVIEW_EXTENSIONS = [
		"pptx",
		"ppt",
		"pot",
		"potx",
		"pps",
		"ppsx",
		"pptm",
		"potm",
		"ppsm",
		"doc",
		"dot",
		"wps",
		"docx",
		"dotx",
		"docm",
		"dotm",
		"xls",
		"xlt",
		"xlsx",
		"xltx",
		"csv",
		"xlsm",
		"xltm",
		...LOCAL_DOCUMENT_PREVIEW_EXTENSIONS,
		...MARKDOWN_PREVIEW_EXTENSIONS
	];
	HTML_PREVIEW_MAX_BYTES = 2097152;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/attachment/project-plan-attachment-list.tsx
function getDisplayName(item) {
	const candidates = [
		item.name,
		item.fileId,
		item.fallbackName
	];
	for (const candidate of candidates) {
		const trimmed = candidate?.trim();
		if (trimmed) return trimmed;
	}
	return "";
}
function normalizePreviewName(name, fileType) {
	const extension = fileType?.replace(/^\./, "").trim();
	if (!extension || name.toLowerCase().endsWith(`.${extension.toLowerCase()}`)) return name;
	return `${name}.${extension}`;
}
function toPreviewFile(item) {
	const displayName = getDisplayName(item);
	if (!displayName) return null;
	if (item.localFile) return {
		id: `local:${item.key}`,
		name: displayName,
		size: item.localFile.size,
		localFile: item.localFile
	};
	if (!item.fileId || item.pending) return null;
	return {
		id: item.fileId,
		name: normalizePreviewName(displayName, item.fileType),
		size: item.fileSize
	};
}
/**
* 拼出供 ArtifactFileTypeIcon 推断 kind 用的文件名。
*
* 优先级：
* 1. baseName 自带扩展名（最后一个 `.` 后是合法扩展字符）→ 直接返回 baseName。
*    这是最关键的一条：本地上传链路里 fileType 字段写的是 MIME（"text/html"），
*    不是扩展名。如果反向用 fileType 强行覆盖，就会把 "index.html" 拼成
*    "index.html.text/html"，再在 getArtifactFileIconKind 里被 split('/') 切坏，
*    导致 html / 源码文件统一回落到 default 灰色破角图标。
* 2. baseName 没扩展名（典型场景：name fallback 到 fileId/externalId）→ 用 fileType 兜底。
*    但 fileType 必须是「干净的扩展名」：无 `/`、无空白、长度 ≤ 6（覆盖 docx/xlsx/pptx/svg 等），
*    否则视作 MIME 串忽略，避免噪声污染图标推断。
*/
function getFileNameForIcon(item) {
	const baseName = (item.name ?? item.fileId ?? "").trim();
	const lastSegment = baseName.split(/[\\/]/).pop() ?? "";
	const dotIndex = lastSegment.lastIndexOf(".");
	if (dotIndex > 0 && dotIndex < lastSegment.length - 1 && /^[a-z0-9]+$/i.test(lastSegment.slice(dotIndex + 1))) return baseName;
	const rawFileType = item.fileType?.replace(/^\./, "").trim() ?? "";
	if (!(rawFileType.length > 0 && rawFileType.length <= 6 && /^[a-z0-9]+$/i.test(rawFileType))) return baseName;
	return baseName ? `${baseName}.${rawFileType}` : `attachment.${rawFileType}`;
}
var import_react$25, import_jsx_runtime$17, EllipsisIcon, ProjectPlanAttachmentList;
var init_project_plan_attachment_list = __esmMin((() => {
	init_project_plan_attachment_list$1();
	init_src();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_delete();
	init_my_files();
	init_useI18n();
	init_context();
	init_cloud_file_preview_modal();
	init_project_netdrive_store();
	import_jsx_runtime$17 = require_jsx_runtime();
	EllipsisIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "2.625",
				cy: "7",
				r: "1.05"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "7",
				cy: "7",
				r: "1.05"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("circle", {
				cx: "11.375",
				cy: "7",
				r: "1.05"
			})
		]
	});
	ProjectPlanAttachmentList = ({ projectId, items, className, showSectionTitle = true, compact = false, showDeleteOnly = false, disablePreview = false }) => {
		const t = useTranslation();
		const { adapter } = useModuleHost();
		const [previewFile, setPreviewFile] = (0, import_react$25.useState)(null);
		const visibleItems = (0, import_react$25.useMemo)(() => items.filter((item) => getDisplayName(item)), [items]);
		const needsNetDrivePreview = (0, import_react$25.useMemo)(() => visibleItems.some((item) => Boolean(item.fileId && !item.localFile)), [visibleItems]);
		const { ready: netDriveReady, error: netDriveError } = useProjectNetDriveReady(adapter, needsNetDrivePreview ? projectId : void 0);
		const netDriveStore = (0, import_react$25.useMemo)(() => getProjectStores(projectId).netDriveServiceStore, [projectId]);
		const { downloadState, cancelDownload, downloadFile } = useNetDriveFileDownload({
			adapter,
			netDriveStore
		});
		if (visibleItems.length === 0) return null;
		const handlePreview = (item) => {
			const file = toPreviewFile(item);
			if (!file) return;
			if (!file.localFile && !netDriveReady) {
				message.warning(netDriveError || t("myFiles.preview.serviceNotReady"));
				return;
			}
			setPreviewFile(file);
		};
		const handleDownload = async (item) => {
			if (!item.fileId || item.localFile) return;
			if (!netDriveReady) {
				message.warning(netDriveError || t("myFiles.preview.serviceNotReady"));
				return;
			}
			await downloadFile({
				fileId: item.fileId,
				fileName: getDisplayName(item),
				fileSize: item.fileSize
			});
		};
		const renderIcon = (item) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ArtifactFileTypeIcon, {
			className: "project-plan-panel__create-attachment-icon",
			fileName: getFileNameForIcon(item),
			type: "solid",
			width: 16,
			height: 16,
			"aria-hidden": "true"
		});
		const wrapperClassName = [
			"project-plan-panel__create-attachments",
			compact ? "project-plan-panel__create-attachments--compact" : "",
			className ?? ""
		].filter(Boolean).join(" ");
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: wrapperClassName,
				children: [showSectionTitle && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
					className: "project-plan-panel__create-attachments-title",
					children: t("collab.plan.create.attachmentSectionTitle", { count: visibleItems.length })
				}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
					className: "project-plan-panel__create-attachment-list",
					children: visibleItems.map((item) => {
						const label = getDisplayName(item);
						const previewable = Boolean(toPreviewFile(item)) && !disablePreview;
						const title = item.title ?? label;
						const downloadable = Boolean(item.fileId) && !item.pending && !item.localFile;
						const removable = Boolean(item.onRemove);
						const menuItems = [...downloadable ? [{
							key: "download",
							label: t("collab.plan.attachments.actions.download")
						}] : [], ...removable ? [{
							key: "remove",
							label: t("collab.plan.attachments.actions.remove"),
							danger: true,
							...downloadable ? { divider: true } : {}
						}] : []];
						const hasMenu = menuItems.length > 0;
						const handleMenuSelect = (key) => {
							if (key === "download") handleDownload(item).catch(() => void 0);
							else if (key === "remove") item.onRemove?.();
						};
						return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
							className: `project-plan-panel__create-attachment-item${previewable ? " project-plan-panel__create-attachment-item--previewable" : ""}`,
							title,
							children: [
								previewable ? /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("button", {
									type: "button",
									className: "project-plan-panel__create-attachment-preview",
									"aria-label": t("collab.plan.attachments.previewAria", { name: label }),
									onClick: () => handlePreview(item),
									children: [renderIcon(item), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
										className: "project-plan-panel__create-attachment-name",
										children: label
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [renderIcon(item), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
									className: "project-plan-panel__create-attachment-name",
									children: label
								})] }),
								showDeleteOnly && removable && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("button", {
									type: "button",
									className: "project-plan-panel__create-attachment-remove",
									"aria-label": item.removeAriaLabel,
									title: item.removeAriaLabel,
									onClick: (event) => {
										event.stopPropagation();
										item.onRemove?.();
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("img", {
										src: "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='14'%20height='14'%3e%3cpath%20fill='%23000'%20fill-opacity='0.5'%20transform='matrix(1%200%200%201%200.875%200.875001)'%20d='M9.5375%202.1L12.25%202.1L12.25%203.15L8.75%203.15L8.75%203.15L2.275%203.15L2.275%207Q2.275%208.7468%202.417%209.152Q2.8208%2010.3042%203.973%2010.708Q4.3782%2010.85%206.125%2010.85Q7.8718%2010.85%208.277%2010.708Q9.4292%2010.3042%209.833%209.152Q9.975%208.7468%209.975%207L9.975%204.2L11.025%204.2L11.025%207Q11.025%208.9254%2010.8239%209.4993Q10.2531%2011.1281%208.6243%2011.6989Q8.0504%2011.9%206.125%2011.9Q4.1996%2011.9%203.6257%2011.6989Q1.9969%2011.1281%201.4261%209.4993Q1.225%208.9254%201.225%207L1.225%203.15L0%203.15L0%202.1L2.7125%202.1L2.7798%201.9385Q3.0762%201.2271%203.2128%200.9788Q3.4591%200.5314%203.7932%200.3086Q4.1274%200.0858%204.6351%200.0307Q4.9168%200%205.6875%200L6.5625%200Q7.3332%200%207.6149%200.0307Q8.1226%200.0858%208.4568%200.3086Q8.7909%200.5314%209.0372%200.9788Q9.1738%201.2271%209.4702%201.9385L9.5375%202.1ZM3.8522%202.1Q4.202%201.298%204.3757%201.1823Q4.5741%201.05%205.6875%201.05L6.5625%201.05Q7.6759%201.05%207.8743%201.1823Q8.048%201.298%208.3978%202.1L3.8522%202.1ZM6.65%204.375L5.6%204.375L5.6%209.625L6.65%209.625L6.65%204.375Z'%20fill-rule='evenodd'/%3e%3c/svg%3e",
										alt: "",
										"aria-hidden": "true",
										width: 14,
										height: 14
									})
								}),
								!showDeleteOnly && hasMenu && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Dropdown, {
									placement: "bottom-end",
									items: menuItems,
									onSelect: handleMenuSelect,
									trigger: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("button", {
										type: "button",
										className: "project-plan-panel__create-attachment-action project-plan-panel__create-attachment-menu",
										"aria-label": t("collab.plan.attachments.moreAria", { name: label }),
										title: t("collab.plan.attachments.moreAria", { name: label }),
										onClick: (event) => event.stopPropagation(),
										children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(EllipsisIcon, {})
									})
								})
							]
						}, item.key);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(CloudFilePreviewModal, {
				file: previewFile,
				netDriveStore,
				adapter,
				t,
				onClose: () => setPreviewFile(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(TopProgressBanner, {
				visible: downloadState.status !== "idle",
				action: "download",
				fileName: downloadState.fileName,
				percent: downloadState.status === "downloading" ? downloadState.percent : 100,
				done: downloadState.status === "done",
				onCancel: downloadState.status === "downloading" ? cancelDownload : void 0
			})
		] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/attachment/project-plan-attachment-picker-modal.tsx
function toAttachmentParams(file) {
	return {
		provider: "netdisk",
		externalId: file.id,
		name: file.name,
		fileType: file.name.includes(".") ? file.name.split(".").pop() : void 0,
		fileSize: file.size
	};
}
var import_react$24, import_jsx_runtime$16, ProjectPlanAttachmentPickerModal;
var init_project_plan_attachment_picker_modal = __esmMin((() => {
	init_src();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_netdrive_service();
	init_netdrive_selector_modal();
	init_netdrive_store_context();
	init_store();
	init_useI18n();
	import_jsx_runtime$16 = require_jsx_runtime();
	ProjectPlanAttachmentPickerModal = ({ visible, projectId, existingAttachmentIds, onClose, onSelect }) => {
		const t = useTranslation();
		const netDriveStore = (0, import_react$24.useMemo)(() => {
			const store = createNetDriveServiceStore();
			store.setState({ currentProjectId: projectId });
			return store;
		}, [projectId]);
		const filesStore = (0, import_react$24.useMemo)(() => createMyFilesStore(), [projectId]);
		const contextValue = (0, import_react$24.useMemo)(() => ({
			netDriveStore,
			filesStore
		}), [filesStore, netDriveStore]);
		const handleSelectFiles = (0, import_react$24.useCallback)((files) => {
			const attachments = files.filter((file) => !file.isFolder).filter((file) => !existingAttachmentIds?.has(file.id)).map(toAttachmentParams);
			if (attachments.length === 0) {
				message.info(t("collab.plan.attachment.picker.duplicated"));
				return;
			}
			Promise.resolve(onSelect(attachments)).catch((reason) => message.error(reason instanceof Error ? reason.message : t("collab.plan.attachment.picker.addFailed")));
		}, [
			existingAttachmentIds,
			onSelect,
			t
		]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(NetDriveStoreProvider, {
			value: contextValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(NetDriveSelectorModal, {
				visible,
				onClose,
				onSelect: handleSelectFiles,
				title: t("myFiles.selector.titleProject"),
				rootFolderLabel: t("myFiles.selector.rootFolderProject"),
				folderSelectable: false
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/project-plan-rich-description-editor.less
var init_project_plan_rich_description_editor$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-l_24ebac760eed9fcbb3d9aa9af24b5a0e/node_modules/@tencent/smart-doc-plugin-link/dist/inline-token.mjs
function t(e) {
	var t;
	return !Array.isArray(e) || e.length < 1 ? null : String((t = e[0]) == null ? `` : t) || null;
}
function n(e) {
	var t;
	return !Array.isArray(e) || e.length < 2 ? null : String((t = e[1]) == null ? `` : t) || null;
}
function r$1(e, t) {
	return [e, t || e];
}
var e, i$3;
var init_inline_token = __esmMin((() => {
	e = `ql`;
	i$3 = {
		type: `ql`,
		isAtom: !0,
		twoStepDelete: !0,
		toPlainText(e) {
			var n;
			return (n = t(e)) == null ? `` : n;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-l_24ebac760eed9fcbb3d9aa9af24b5a0e/node_modules/@tencent/smart-doc-plugin-link/dist/link-atom.less
var init_link_atom$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-l_24ebac760eed9fcbb3d9aa9af24b5a0e/node_modules/@tencent/smart-doc-plugin-link/dist/link-atom.mjs
function l() {
	return import_react$23.createElement(Link2, {
		className: `sc-link-atom__icon sc-link-atom__icon--default`,
		"aria-hidden": `true`
	});
}
function u({ value: r, selected: u, fetchLinkData: d }) {
	let f = n$1(), p = t(r), m = n(r), h = p ? c.get(p) : void 0, [g, _] = (0, import_react$23.useState)(h == null ? null : h), [v, y] = (0, import_react$23.useState)(!1), b = (0, import_react$23.useRef)(h ? p : null);
	if ((0, import_react$23.useEffect)(() => {
		if (!p || !d || b.current === p) return;
		let e = c.get(p);
		if (e) {
			_(e), b.current = p;
			return;
		}
		let t = !1;
		return y(!0), d(p).then((e) => {
			t || (c.set(p, e), _(e), b.current = p);
		}).catch(() => {
			t || (b.current = p);
		}).finally(() => {
			t || y(!1);
		}), () => {
			t = !0;
		};
	}, [p, d]), !p) return null;
	let x = (g == null ? void 0 : g.title) || m || p, S = g == null ? void 0 : g.icon;
	return import_react$23.createElement(`a`, {
		className: `sc-link-atom${u ? ` sc-link-atom--selected` : ``}`,
		"data-link-atom-url": p,
		href: p,
		target: `_blank`,
		rel: `noopener noreferrer`,
		onClick: (e) => {
			var t;
			e.preventDefault();
			let n = (t = f.onLinkClick) == null ? void 0 : t.call(f, p, e.currentTarget, { source: `link-atom-click` });
			if (n === !0) return;
			let r = typeof n == `string` ? n : p;
			window.open(r, `_blank`, `noopener`);
		}
	}, v ? import_react$23.createElement(`span`, {
		className: `sc-link-atom__loading`,
		"aria-hidden": `true`
	}) : (() => {
		let e;
		if (!S) e = import_react$23.createElement(l, null);
		else if (typeof S == `string`) e = import_react$23.createElement(`img`, {
			src: S,
			alt: ``,
			"aria-hidden": `true`
		});
		else if (typeof S == `function`) {
			let t = S;
			e = import_react$23.createElement(t, null);
		} else e = S;
		return import_react$23.createElement(`span`, { className: `sc-link-atom__icon` }, e);
	})(), import_react$23.createElement(`span`, { className: `sc-link-atom__title` }, x));
}
var import_react$23, c;
var init_link_atom = __esmMin((() => {
	init_inline_token();
	init_dist$1();
	init_lucide_react();
	import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_link_atom$1();
	c = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-l_24ebac760eed9fcbb3d9aa9af24b5a0e/node_modules/@tencent/smart-doc-plugin-link/dist/orchestrator.mjs
function r(e) {
	let n = e[1];
	if (!n) return null;
	let r = n.find((e) => e[0] === e$1.TextLink);
	if (!r) return null;
	let i = r[1];
	return i && String(Array.isArray(i) ? i[0] : i) || null;
}
function i$1(t, i) {
	let a = !1, o = t.map((t) => {
		let o = r(t);
		if (!o) return t;
		let s = i(o);
		if (!s) return t;
		a = !0;
		let { title: c } = typeof s == `object` ? s : {};
		return o$1(`ql`, r$1(o, c));
	});
	return a ? o : null;
}
function a(e, t) {
	let n = e.records.block;
	if (!n) return null;
	let r = {}, a = !1;
	for (let [e, s] of Object.entries(n)) {
		var o;
		let n = i$1((o = s.props.title) == null ? [] : o, t);
		n ? (r[e] = {
			...s,
			props: {
				...s.props,
				title: n
			}
		}, a = !0) : r[e] = s;
	}
	return a ? {
		rootIds: e.rootIds,
		records: {
			...e.records,
			block: r
		}
	} : null;
}
var init_orchestrator = __esmMin((() => {
	init_inline_token();
	init_dist$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-l_24ebac760eed9fcbb3d9aa9af24b5a0e/node_modules/@tencent/smart-doc-plugin-link/dist/plugin.mjs
function i(i) {
	let { shouldConvertLink: a$6, component: o } = i;
	return t$1({
		id: `link-atom`,
		inlineTokens: [{
			...i$3,
			component: o == null ? u : o
		}],
		behaviors: { transformFragment: ({ fragment: e }) => a(e, a$6) }
	});
}
var init_plugin = __esmMin((() => {
	init_inline_token();
	init_link_atom();
	init_orchestrator();
	init_dist$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-plugin-l_24ebac760eed9fcbb3d9aa9af24b5a0e/node_modules/@tencent/smart-doc-plugin-link/dist/index.mjs
var init_dist = __esmMin((() => {
	init_inline_token();
	init_link_atom();
	init_plugin();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/link-token-bridge.ts
/**
* 把命中的 TextLink token 换成 link-atom token。
*
* title 先取 markdown 里的锚文本（马上就能显示，不用等网络），随后由卡片组件的
* `fetchLinkData` 刷新成最新文档标题。
*/
function textLinkToLinkAtom(blocks, shouldConvert) {
	return mapBlockTokens(blocks, (token) => convertTextLinkToken(token, shouldConvert));
}
/**
* 把 link-atom token 换回 TextLink token，供 `recordToMdx` 输出 `[标题](url)`。
*
* `resolveTitle` 返回解析缓存里的最新标题；**拿不到时必须回落到 token 里存的标题**，
* 绝不能退化成 `[url](url)`——否则用户只是打开待办看一眼、点别处触发失焦保存，
* 就会把描述里原本的标题冲掉。
*/
function linkAtomToTextLink(blocks, resolveTitle) {
	return mapBlockTokens(blocks, (token) => convertLinkAtomToken(token, resolveTitle));
}
/**
* 遍历所有 block 的 `props.title`，逐 token 走 converter。
*
* 只对**真正改动过**的 block / props / title 做浅拷贝，其余保持原引用：保存路径拿到的是
* editor 的实时 record，就地改会污染编辑器文档。
*/
function mapBlockTokens(blocks, convert) {
	const result = {};
	for (const [id, record] of Object.entries(blocks)) result[id] = mapSingleBlock(record, convert);
	return result;
}
function mapSingleBlock(record, convert) {
	if (!record || typeof record !== "object") return record;
	const block = record;
	const title = block.props?.title;
	if (!Array.isArray(title)) return record;
	let changed = false;
	const nextTitle = title.map((token) => {
		if (!isToken(token)) return token;
		const converted = convert(token);
		if (!converted) return token;
		changed = true;
		return converted;
	});
	if (!changed) return record;
	return {
		...record,
		props: {
			...block.props,
			title: nextTitle
		}
	};
}
function convertTextLinkToken(token, shouldConvert) {
	const formats = token[1];
	if (!Array.isArray(formats) || formats.length === 0) return null;
	if (findFormat(formats, e)) return null;
	const textLink = findFormat(formats, e$1.TextLink);
	if (!textLink) return null;
	const url = readTextLinkUrl(token, textLink);
	if (!url || !shouldConvert(url)) return null;
	return [t$2, [[e, r$1(url, token[0])]]];
}
function convertLinkAtomToken(token, resolveTitle) {
	const formats = token[1];
	if (!Array.isArray(formats)) return null;
	const atom = findFormat(formats, e);
	if (!atom) return null;
	const url = t(atom[1]);
	if (!url) return null;
	const title = firstNonEmpty(resolveTitle(url), n(atom[1]), url);
	if (title === url) return [url, [[e$1.TextLink, url]]];
	return [title, [[e$1.TextLink, url]]];
}
/**
* 读 TextLink token 的目标 URL：正常形态 url 落在 format value 里，value 缺省时展示文本即 url。
*
* smart-doc 2.122 起不再从包入口导出等价的 `tokenLinkUrl`，故在此维持桥接需要的这份语义；
* 缺省这一支只兜历史/手工构造的 token，`mdxToRecord` 现在连裸链接都会带上 value。
*/
function readTextLinkUrl(token, textLink) {
	const value = textLink[1];
	if (!value) return token[0] || null;
	return String(Array.isArray(value) ? value[0] : value) || null;
}
function findFormat(formats, type) {
	return formats.find((format) => Array.isArray(format) && format[0] === type);
}
function isToken(value) {
	return Array.isArray(value) && typeof value[0] === "string";
}
function firstNonEmpty(...candidates) {
	for (const candidate of candidates) if (typeof candidate === "string" && candidate.trim() !== "") return candidate;
	return "";
}
var init_link_token_bridge = __esmMin((() => {
	init_dist$1();
	init_dist();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/space-doc-url.ts
/**
* 命中资料库节点链接时返回 nodeId，否则返回 null。
*
* 路径判定与后端 `extractNodeIDFromURL` 同构：按 `/` 分段找相邻的 `space` / `d` / `:nodeId`，
* 不硬绑定路径前缀。`?ext2=copy_link` 这类渠道参数不参与判定，也不需要清洗——
* 整条 URL 会原样透传给后端。
*/
function matchSpaceDocUrl(rawUrl) {
	if (typeof rawUrl !== "string" || rawUrl === "") return null;
	let url;
	try {
		url = new URL(rawUrl);
	} catch {
		return null;
	}
	if (url.protocol !== "https:" && url.protocol !== "http:") return null;
	const host = url.hostname.toLowerCase();
	if (!SPACE_HOST_SUFFIXES.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))) return null;
	const segments = url.pathname.split("/").filter((segment) => segment !== "");
	for (let i = 0; i + 2 < segments.length; i += 1) if (segments[i] === "space" && segments[i + 1] === "d" && segments[i + 2]) return decodeURIComponent(segments[i + 2]);
	return null;
}
/** `matchSpaceDocUrl` 的布尔形态，供只关心「是否转换」的插件回调使用。 */
function isSpaceDocUrl(rawUrl) {
	return matchSpaceDocUrl(rawUrl) !== null;
}
var SPACE_HOST_SUFFIXES;
var init_space_doc_url = __esmMin((() => {
	SPACE_HOST_SUFFIXES = ["workbuddy.cn", "workbuddy.ai"];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/convert-pasted-links.ts
/** 单次扫描：把文档里命中的 TextLink 换成 link-atom，返回改动的 block 数。 */
function convertPastedSpaceLinks(editor) {
	if (editor.isDestroyed || !editor.rootId) return 0;
	const pending = [];
	for (const record of editor.recordView.valuesOfTable("block")) {
		const block = record;
		if (!Array.isArray(block.props?.title) || block.props.title.length === 0) continue;
		const next = textLinkToLinkAtom({ [block.id]: block }, isSpaceDocUrl)[block.id];
		if (next !== block) pending.push({
			id: block.id,
			tokens: next.props?.title
		});
	}
	for (const { id, tokens } of pending) a$2(editor, id, tokens, { mergeTag: "space-link-atom" });
	return pending.length;
}
/**
* 粘贴事件发生后调度转换。
*
* `handlePaste` 是 async 的，同步跑或只等一个 tick 都可能赶在插入之前，所以做有界重试：
* 命中一次即停；整段粘贴里没有资料库链接时最多 6 次空扫（文档是待办描述，扫描开销可忽略）。
*/
function scheduleSpaceLinkConversion(editor) {
	let attempts = 0;
	const tick = () => {
		attempts += 1;
		if (editor.isDestroyed) return;
		if (convertPastedSpaceLinks(editor) === 0 && attempts < MAX_ATTEMPTS) setTimeout(tick, RETRY_INTERVAL_MS);
	};
	setTimeout(tick, 0);
}
var MAX_ATTEMPTS, RETRY_INTERVAL_MS;
var init_convert_pasted_links = __esmMin((() => {
	init_dist$1();
	init_link_token_bridge();
	init_space_doc_url();
	MAX_ATTEMPTS = 6;
	RETRY_INTERVAL_MS = 60;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/space-link-title-cache.ts
/**
* 同步读缓存标题。
*
* 保存路径用它把 link-atom 换回 `[标题](url)`；读不到时调用方**必须**回落到 token 里
* 存着的标题，绝不能退化成 `[url](url)`（见 link-token-bridge）。
*/
function getCachedSpaceLinkTitle(url) {
	return resolved.get(url)?.title;
}
/**
* 拉取标题与品类：命中缓存直接返回，命中负缓存直接放弃，其余走 facade 并做并发去重。
*
* 拿不到时返回 undefined 而不是抛错，由调用方决定降级表现。
*/
function resolveSpaceLinkMeta(url, facade) {
	const cached = resolved.get(url);
	if (cached !== void 0) return Promise.resolve(cached);
	const blockedUntil = retryAfter.get(url);
	if (blockedUntil !== void 0 && blockedUntil > Date.now()) return Promise.resolve(void 0);
	const pending = inFlight.get(url);
	if (pending) return pending;
	const request = requestMeta(url, facade).finally(() => {
		inFlight.delete(url);
	});
	inFlight.set(url, request);
	return request;
}
async function requestMeta(url, facade) {
	let result;
	try {
		result = await facade.getNodeBrief({ url });
	} catch {
		rememberFailure(url, "temporary");
		return;
	}
	if (!result?.ok) {
		rememberFailure(url, result?.reason ?? "temporary");
		return;
	}
	const title = result.node.title?.trim();
	if (!title) return;
	const meta = {
		title,
		kind: result.node.kind ?? ""
	};
	resolved.set(url, meta);
	retryAfter.delete(url);
	return meta;
}
function rememberFailure(url, reason) {
	retryAfter.set(url, reason === "temporary" ? Date.now() + TEMPORARY_FAILURE_TTL_MS : Number.POSITIVE_INFINITY);
}
var TEMPORARY_FAILURE_TTL_MS, resolved, retryAfter, inFlight;
var init_space_link_title_cache = __esmMin((() => {
	TEMPORARY_FAILURE_TTL_MS = 3e4;
	resolved = /* @__PURE__ */ new Map();
	retryAfter = /* @__PURE__ */ new Map();
	inFlight = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/space-link-icon.tsx
/**
* 按节点形态返回卡片图标。
*
* `doc` 与未知 kind 都回落到 Markdown 图标——资料库里绝大多数节点是文档，
* 拿个「未知文件」图标反而更像出错了。
*/
function renderSpaceLinkIcon(kind) {
	switch (kind) {
		case SPACE_NODE_KIND.DATABASE: return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(WbFileSheetIcon, {});
		case SPACE_NODE_KIND.WEB: return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(WbFileHtmlIcon, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(WbFileMarkdownIcon, {});
	}
}
var import_jsx_runtime$15, SPACE_NODE_KIND;
var init_space_link_icon = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$15 = require_jsx_runtime();
	SPACE_NODE_KIND = {
		DOC: "doc",
		WEB: "web",
		DATABASE: "database"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/use-space-link-resolver.ts
/**
* 把 `spaceNode` facade 接到 link-atom 卡片的异步取标题回调上。
*
* facade 未注入时返回 undefined：`DefaultLinkAtom` 会直接展示 token 里存着的标题
* （加载时取自 markdown 锚文本），链接仍然可点，只是标题不会刷新。
*
* 解析失败时**抛错而不是返回兜底标题**：`DefaultLinkAtom` catch 后会回落到
* `parseLinkAtomTitle(value) || url`，也就是保持原有标题；若返回 `{ title: url }`
* 反而会把好好的标题覆盖成一长串裸 URL。
*/
function useSpaceLinkFetch() {
	const { facades } = useModuleHost();
	const spaceNode = facades.spaceNode;
	const fetchLinkData = (0, import_react$21.useCallback)(async (url) => {
		if (!spaceNode) throw new Error("spaceNode facade is not available");
		const meta = await resolveSpaceLinkMeta(url, spaceNode);
		if (!meta) throw new Error("space node title unavailable");
		return {
			title: meta.title,
			icon: renderSpaceLinkIcon(meta.kind)
		};
	}, [spaceNode]);
	return spaceNode ? fetchLinkData : void 0;
}
var import_react$21;
var init_use_space_link_resolver = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_space_link_icon();
	init_space_link_title_cache();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/space-link/space-link-plugin.tsx
/**
* 卡片渲染组件：包一层 `DefaultLinkAtom` 注入取标题回调。
*
* 组件本身是模块级稳定引用，所以插件实例也能是模块级常量；facade 通过组件内部的
* `useHost()` 拿（卡片渲染在 EditorRoot 内、仍在 app tree 里），不需要把 context
* 透进插件工厂。
*/
function SpaceLinkAtom(props) {
	const fetchLinkData = useSpaceLinkFetch();
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(u, {
		...props,
		fetchLinkData
	});
}
var import_jsx_runtime$14, shouldConvertLink, SPACE_LINK_PLUGINS;
var init_space_link_plugin = __esmMin((() => {
	init_dist();
	require_react();
	init_space_doc_url();
	init_space_link_title_cache();
	init_use_space_link_resolver();
	import_jsx_runtime$14 = require_jsx_runtime();
	shouldConvertLink = (url) => {
		if (!isSpaceDocUrl(url)) return false;
		const title = getCachedSpaceLinkTitle(url);
		return title ? { title } : true;
	};
	SPACE_LINK_PLUGINS = [i({
		shouldConvertLink,
		component: SpaceLinkAtom
	})];
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_51be9d7ef7cb60a99ae05e0a7add9d1d/node_modules/@tencent/smart-doc-editor/dist/presets/markdown-mode/index.less
var init_markdown_mode = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/netdrive-file-policy.ts
function normalizeExtension(input) {
	const explicit = input.extension?.replace(/^\./, "").toLowerCase().trim();
	if (explicit) return explicit;
	const last = input.name.split(".").pop();
	return last && last !== input.name ? last.toLowerCase() : "";
}
function isImageExtension(ext) {
	return IMAGE_EXTENSIONS.includes(ext);
}
function isTextDocumentExtension(ext) {
	return TEXT_DOCUMENT_EXTENSIONS.includes(ext);
}
function isCodeExtension(ext) {
	return CODE_EXTENSIONS.includes(ext);
}
function isOfficeDocumentExtension(ext) {
	return OFFICE_DOCUMENT_EXTENSIONS.includes(ext);
}
function sizeExceeded(size, maxSize) {
	return typeof size === "number" && Number.isFinite(size) && size > maxSize;
}
function formatMb(bytes) {
	return `${Math.round(bytes / 1024 / 1024)}MB`;
}
function classifyNetDriveItem(input) {
	if (input.isFolder) return {
		kind: "folder",
		canSelect: true
	};
	const extension = normalizeExtension(input);
	if (!extension) return {
		kind: "unsupported",
		canSelect: false,
		disabledReason: t$3("myFiles.policy.unsupportedType")
	};
	if (isImageExtension(extension)) {
		const maxSize = NETDRIVE_FILE_SIZE_LIMITS.IMAGE_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "image",
			extension,
			mimeType: input.mimeType || IMAGE_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: t$3("myFiles.policy.imageTooLarge", { size: formatMb(maxSize) })
		};
		return {
			kind: "image",
			extension,
			mimeType: input.mimeType || IMAGE_MIME_TYPES[extension],
			maxSize,
			canSelect: true
		};
	}
	if (isTextDocumentExtension(extension) || isCodeExtension(extension)) {
		const maxSize = isCodeExtension(extension) ? NETDRIVE_FILE_SIZE_LIMITS.CODE_MAX_SIZE : NETDRIVE_FILE_SIZE_LIMITS.TEXT_DOCUMENT_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "text",
			extension,
			mimeType: input.mimeType || TEXT_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: t$3("myFiles.policy.fileTooLarge", { size: formatMb(maxSize) })
		};
		return {
			kind: "text",
			extension,
			mimeType: input.mimeType || TEXT_MIME_TYPES[extension],
			maxSize,
			canSelect: true
		};
	}
	if (isOfficeDocumentExtension(extension)) {
		const maxSize = NETDRIVE_FILE_SIZE_LIMITS.OFFICE_DOCUMENT_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "document",
			extension,
			mimeType: input.mimeType || OFFICE_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: t$3("myFiles.policy.fileTooLarge", { size: formatMb(maxSize) })
		};
		return {
			kind: "document",
			extension,
			mimeType: input.mimeType || OFFICE_MIME_TYPES[extension],
			maxSize,
			canSelect: true
		};
	}
	return {
		kind: "unsupported",
		extension,
		mimeType: input.mimeType,
		canSelect: false,
		disabledReason: t$3("myFiles.policy.unsupportedExtension", { ext: extension })
	};
}
var IMAGE_EXTENSIONS, TEXT_DOCUMENT_EXTENSIONS, CODE_EXTENSIONS, OFFICE_DOCUMENT_EXTENSIONS, IMAGE_MIME_TYPES, TEXT_MIME_TYPES, OFFICE_MIME_TYPES, NETDRIVE_FILE_SIZE_LIMITS;
var init_netdrive_file_policy = __esmMin((() => {
	init_i18n();
	IMAGE_EXTENSIONS = [
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp"
	];
	TEXT_DOCUMENT_EXTENSIONS = [
		"txt",
		"md",
		"json",
		"jsonl",
		"xml",
		"yaml",
		"yml",
		"csv",
		"tsv",
		"log"
	];
	CODE_EXTENSIONS = [
		"js",
		"ts",
		"jsx",
		"tsx",
		"py",
		"go",
		"java",
		"cpp",
		"c",
		"h",
		"css",
		"scss",
		"html"
	];
	OFFICE_DOCUMENT_EXTENSIONS = [
		"pdf",
		"doc",
		"docx",
		"xls",
		"xlsx",
		"ppt",
		"pptx"
	];
	IMAGE_MIME_TYPES = {
		png: "image/png",
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		gif: "image/gif",
		webp: "image/webp",
		bmp: "image/bmp"
	};
	TEXT_MIME_TYPES = {
		txt: "text/plain",
		md: "text/markdown",
		json: "application/json",
		jsonl: "application/jsonl",
		xml: "application/xml",
		yaml: "application/x-yaml",
		yml: "application/x-yaml",
		csv: "text/csv",
		tsv: "text/tab-separated-values",
		log: "text/plain",
		js: "application/javascript",
		ts: "application/typescript",
		jsx: "text/jsx",
		tsx: "text/tsx",
		py: "text/x-python",
		go: "text/x-go",
		java: "text/x-java",
		cpp: "text/x-c++src",
		c: "text/x-csrc",
		h: "text/x-chdr",
		css: "text/css",
		scss: "text/x-scss",
		html: "text/html"
	};
	OFFICE_MIME_TYPES = {
		pdf: "application/pdf",
		doc: "application/msword",
		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		xls: "application/vnd.ms-excel",
		xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		ppt: "application/vnd.ms-powerpoint",
		pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
	};
	NETDRIVE_FILE_SIZE_LIMITS = {
		IMAGE_MAX_SIZE: 5242880,
		TEXT_DOCUMENT_MAX_SIZE: 10485760,
		CODE_MAX_SIZE: 1048576,
		OFFICE_DOCUMENT_MAX_SIZE: 10485760
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/use-netdisk-description-image.ts
/**
* 待办描述区图片能力：上传到项目网盘并把 fileId 稳定引用喂回 smart-doc 编辑器。
*
* - uploadImage：粘贴/插入时上传，返回 `netdisk:<fileId>` 作为 displaySource
* - resolveAssetUrl：同步把 `netdisk:<fileId>` 换成内存缓存里的预览链接
* - prefetch：加载已存 markdown 前批量取预览链接，保证 resolveAssetUrl 同步命中
*/
function useNetdiskDescriptionImage({ adapter, projectId, todoId }) {
	const t = useTranslation();
	const previewCacheRef = (0, import_react$19.useRef)(/* @__PURE__ */ new Map());
	const ensureClient = (0, import_react$19.useCallback)(async () => {
		if (!adapter) throw new Error(t("collab.plan.descImage.uploadFailed"));
		const netDriveStore = getProjectStores(projectId).netDriveServiceStore;
		await netDriveStore.getState().initialize(adapter, projectId);
		return {
			client: netDriveStore.getState().getClient(),
			netDriveStore
		};
	}, [
		adapter,
		projectId,
		t
	]);
	const fetchPreview = (0, import_react$19.useCallback)(async (client, fileId) => {
		const { previewURL } = await client.file.getPreviewUrl({
			fileID: fileId,
			previewType: "pic"
		});
		if (previewURL) previewCacheRef.current.set(fileId, previewURL);
	}, []);
	const uploadImage = (0, import_react$19.useCallback)(async (file) => {
		const policy = classifyNetDriveItem({
			name: file.name,
			size: file.size,
			mimeType: file.type
		});
		if (policy.kind !== "image" || !policy.canSelect) throw new Error(policy.disabledReason || t("collab.plan.descImage.tooLarge"));
		const { client, netDriveStore } = await ensureClient();
		const appId = getNetDriveAppId(netDriveStore);
		const folderId = await ensureProjectTodoNetdiskAttachmentFolder(client, {
			rootFolderId: netDriveStore.getState().getRootFolderId(),
			todoId,
			appId,
			rootFolderName: DESCRIPTION_IMAGE_ROOT_FOLDER_NAME
		});
		const fileId = (await client.file.upload(file, {
			folderId,
			appId,
			conflictResolutionStrategy: "rename"
		})).fileID;
		if (!fileId) throw new Error(t("collab.plan.descImage.uploadFailed"));
		try {
			await fetchPreview(client, fileId);
		} catch {}
		return { url: `${NETDISK_SCHEME}${fileId}` };
	}, [
		ensureClient,
		fetchPreview,
		t,
		todoId
	]);
	const resolveAssetUrl = (0, import_react$19.useCallback)((ctx) => {
		const { rawUrl } = ctx;
		if (!rawUrl || !rawUrl.startsWith(NETDISK_SCHEME)) return rawUrl;
		const fileId = rawUrl.slice(8);
		return previewCacheRef.current.get(fileId) ?? rawUrl;
	}, []);
	const prefetch = (0, import_react$19.useCallback)(async (markdown) => {
		if (!markdown) return;
		const ids = /* @__PURE__ */ new Set();
		for (const match of markdown.matchAll(NETDISK_REF_RE)) {
			const id = match[1];
			if (id && !previewCacheRef.current.has(id)) ids.add(id);
		}
		if (ids.size === 0) return;
		let client;
		try {
			({client} = await ensureClient());
		} catch {
			return;
		}
		await Promise.all([...ids].map((id) => fetchPreview(client, id).catch(() => void 0)));
	}, [ensureClient, fetchPreview]);
	const onToast = (0, import_react$19.useCallback)((options) => {
		const { type, message: msg, duration } = options;
		if (type === "loading") return message.loading(msg, duration ?? 0);
		(message[type] ?? message.info)(msg, duration);
	}, []);
	return {
		runtime: (0, import_react$19.useMemo)(() => ({
			uploadImage,
			resolveAssetUrl,
			onToast
		}), [
			uploadImage,
			resolveAssetUrl,
			onToast
		]),
		prefetch
	};
}
var import_react$19, NETDISK_SCHEME, NETDISK_REF_RE, DESCRIPTION_IMAGE_ROOT_FOLDER_NAME, DRAFT_DESCRIPTION_TODO_ID;
var init_use_netdisk_description_image = __esmMin((() => {
	init_src();
	init_browser();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_netdrive_service();
	init_netdrive_file_policy();
	init_useI18n();
	init_project_netdrive_store();
	NETDISK_SCHEME = "netdisk:";
	NETDISK_REF_RE = /netdisk:([^\s)]+)/g;
	DESCRIPTION_IMAGE_ROOT_FOLDER_NAME = "描述图片";
	DRAFT_DESCRIPTION_TODO_ID = "_draft";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/use-rich-description-editor.ts
/**
* 把 editor 当前 records 序列化为 markdown（lossy）。
* 描述以 markdown 字符串存进智能表 sys_description，故失焦保存时先序列化。
*/
async function serializeMarkdown(editor) {
	if (!editor.rootId) return "";
	const block = {};
	for (const r of editor.recordView.valuesOfTable("block")) block[r.id] = r;
	const doc = {
		schemaVersion: 1,
		rootId: editor.rootId,
		records: { block: linkAtomToTextLink(block, getCachedSpaceLinkTitle) }
	};
	return wa(doc, { outputMode: "md-lossy" });
}
/**
* 订阅 editor 内容是否为空（md-lossy 序列化后 trim 为空）。
*
* 用途：让"伪 placeholder"能与 smart-doc 原生 placeholder 拉齐观感 —— 「有 block 但内容为空」
* 时占位仍显示，只有真正输入过内容才隐藏。之所以不直接用 `useBlockChildrenIds(rootId).length`：
* 点占位插入的空 text block 会立刻让 length=1、占位提前消失，跟"没内容"的语义不符。
*
* 之所以不用 recordView 手工遍历 title tokens 判空：非文本 block（image / code / equation /
* simple_table / divider / ...）都要单独排除，覆盖不全就漏判；直接 serializeMarkdown 走
* md-lossy 就是内容语义的权威判据，一致且不用维护类型白名单。
*
* 订阅 change（不是 contentChange）：change 是「任意影响渲染的变化」的通知，覆盖了
* dispatch（用户编辑）+ editor.load（切 todo 时的整篇重灌）两条路径；而 contentChange
* 明确不由 load 派发（smart-doc 官方标注 load 是纯数据/渲染操作，不 emit contentChange），
* 曾导致「切到无描述 todo 后 isEmpty 停留在 false，placeholder 不出现」以及「新内容渲染但
* placeholder 未消失，二者叠字」两个视觉 bug。change 的粒度对判空场景够用，也不带来额外开销。
*
* 初始种子用「根下无 children」同步近似，避免首次异步 resolve 前的短暂占位闪烁；
* 随后异步 serializeMarkdown 会给出准确值。
*/
function useEditorIsEmpty(editor) {
	const [isEmpty, setIsEmpty] = (0, import_react$18.useState)(() => {
		if (!editor.rootId) return true;
		for (const r of editor.recordView.valuesOfTable("block")) if (r.parentId === editor.rootId) return false;
		return true;
	});
	(0, import_react$18.useEffect)(() => {
		let cancelled = false;
		const recompute = () => {
			serializeMarkdown(editor).then((md) => {
				if (!cancelled) setIsEmpty(md.trim() === "");
			}).catch(() => void 0);
		};
		recompute();
		const unsubscribe = editor.on("change", () => {
			recompute();
		});
		return () => {
			cancelled = true;
			unsubscribe();
		};
	}, [editor]);
	return isEmpty;
}
/**
* 待办详情描述区的轻量 smart-doc 编辑器状态管理。
*
* 相比 context-viewer 的 markdown 编辑器，这里刻意去掉了 imageUrlResolver、
* 划词高亮、contentChange 防抖自动保存，改为「失焦即保存」以对齐原 textarea 的
* onBlur 语义，并把智能表写入次数降到最低。
*/
function useRichDescriptionEditor(options) {
	const { content, themeName, projectId, todoId } = options;
	const onSave = options.mode === "edit" ? options.onSave : void 0;
	const readOnly = options.mode === "edit" ? options.readOnly ?? false : false;
	const onChange = options.mode === "create" ? options.onChange : void 0;
	const editor = i$4();
	const { adapter } = useModuleHost();
	const { runtime, prefetch } = useNetdiskDescriptionImage({
		adapter,
		projectId,
		todoId
	});
	const lastWrittenRef = (0, import_react$18.useRef)(null);
	const baselineMarkdownRef = (0, import_react$18.useRef)("");
	const loadIntoEditor = (0, import_react$18.useCallback)(async (text) => {
		await prefetch(text);
		const doc = await Ca(text, { sourceType: "md" });
		if (editor.destroyed) return;
		const records = {
			...doc.records,
			block: textLinkToLinkAtom(doc.records.block, isSpaceDocUrl)
		};
		editor.load(records, doc.rootId);
		editor.clearHistory();
		lastWrittenRef.current = null;
		try {
			baselineMarkdownRef.current = await serializeMarkdown(editor);
		} catch {
			baselineMarkdownRef.current = text;
		}
	}, [editor, prefetch]);
	(0, import_react$18.useEffect)(() => {
		const text = content ?? "";
		if (!editor.rootId) {
			loadIntoEditor(text);
			return;
		}
		if (text === lastWrittenRef.current) return;
		loadIntoEditor(text);
	}, [
		content,
		editor,
		loadIntoEditor
	]);
	const onChangeRef = (0, import_react$18.useRef)(onChange);
	(0, import_react$18.useEffect)(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	const hasOnChange = Boolean(onChange);
	(0, import_react$18.useEffect)(() => {
		if (!hasOnChange) return;
		return editor.on("contentChange", ({ source }) => {
			if (source !== "user") return;
			serializeMarkdown(editor).then((markdown) => {
				lastWrittenRef.current = markdown;
				onChangeRef.current?.(markdown);
			}).catch(() => void 0);
		});
	}, [editor, hasOnChange]);
	const commit = (0, import_react$18.useCallback)(async () => {
		if (!editor.rootId) return;
		let markdown;
		try {
			markdown = await serializeMarkdown(editor);
		} catch {
			return;
		}
		if (markdown.trim() === "") {
			const rootId = editor.rootId;
			const childIds = [];
			for (const r of editor.recordView.valuesOfTable("block")) {
				const rec = r;
				if (rec.parentId === rootId) childIds.push(rec.id);
			}
			if (childIds.length > 0) editor.dispatch((draft) => {
				for (const id of childIds) F.deleteBlock(editor, draft, id);
			});
		}
		if (!onSave) return;
		if (markdown.trim() === baselineMarkdownRef.current.trim()) return;
		lastWrittenRef.current = markdown;
		baselineMarkdownRef.current = markdown;
		await onSave(markdown);
	}, [editor, onSave]);
	return {
		editor,
		editorConfig: (0, import_react$18.useMemo)(() => a$3({
			mode: "markdown",
			readOnly,
			theme: { name: themeName ?? "auto" },
			toolbar: { floating: { enabled: false } },
			runtime,
			features: { shortcuts: { items: (defaults) => {
				return [...defaults.filter((item) => item.id !== "save:auto-save-hint"), {
					id: "save:noop",
					chord: "Mod+S",
					scopes: ["global"],
					run: () => {}
				}];
			} } }
		}), [
			readOnly,
			themeName,
			runtime
		]),
		commit
	};
}
var import_react$18;
var init_use_rich_description_editor = __esmMin((() => {
	init_markdown_mode();
	init_dist$2();
	init_dist$1();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_link_token_bridge();
	init_space_doc_url();
	init_space_link_title_cache();
	init_use_netdisk_description_image();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/project-plan-rich-description-editor.tsx
/**
* 空态占位（伪 placeholder）：editor 内容为空时，在 page-body 显示一行提示。
* 判据是"内容是否为空"（md-lossy 序列化后 trim 为空），不是"是否有 block" ——
* 用户点占位进入编辑态会插入一个空 text block，但内容仍为空，占位需要继续显示，
* 直到用户真的敲下第一个字符才隐藏，观感对齐 smart-doc 原生 placeholder。
*
* 之所以不复用 smart-doc 原生 placeholder：现网出过若干 bug（占位穿帮 / 光标错位 / 空态点击
* 无法插入首块等），自己用 portal + 显式判空更稳。
*
* 与"是否有 block"配合决定 `--has-empty-block` 修饰类：有空 block 时占位改为
* `pointer-events:none`（放行 caret 到 block）并只留第一行；真正无 block 时占位撑满整块、
* 承接空白点击并插入首块（复用其已验证的 onClick，避免 JS 从编辑器外抢焦的稳定性坑）。
* 必须在 EditorRoot context 内渲染（依赖 useEditor 等 hooks）。
*/
function RichDescriptionPlaceholder({ text }) {
	const editor = o$2();
	const readOnly = s$1();
	const rootId = a$4();
	const domRegistry = s$2();
	const childrenIds = r$2(rootId);
	const isEmpty = useEditorIsEmpty(editor);
	const [portalTarget, setPortalTarget] = (0, import_react$17.useState)(() => domRegistry.getPageBodyEl());
	(0, import_react$17.useLayoutEffect)(() => {
		const el = domRegistry.getPageBodyEl();
		setPortalTarget((prev) => prev === el ? prev : el);
	}, [domRegistry]);
	const [isComposing, setIsComposing] = (0, import_react$17.useState)(false);
	(0, import_react$17.useEffect)(() => {
		const belongsToThisEditor = (target) => {
			const rootEl = domRegistry.getRootEl();
			if (!rootEl || !(target instanceof Node)) return false;
			return rootEl.contains(target);
		};
		const handleStart = (event) => {
			if (belongsToThisEditor(event.target)) setIsComposing(true);
		};
		const handleEnd = (event) => {
			if (belongsToThisEditor(event.target)) setIsComposing(false);
		};
		document.addEventListener("compositionstart", handleStart, true);
		document.addEventListener("compositionend", handleEnd, true);
		return () => {
			document.removeEventListener("compositionstart", handleStart, true);
			document.removeEventListener("compositionend", handleEnd, true);
		};
	}, [domRegistry]);
	const handleClick = () => {
		let newId = null;
		editor.dispatch((draft) => {
			newId = F.appendChildBlock(editor, draft, rootId, "text").newBlockId;
		});
		if (newId) n$2(editor, newId, 0);
	};
	if (!isEmpty || isComposing || readOnly || !portalTarget || !text) return null;
	const hasEmptyBlock = childrenIds.length > 0;
	return import_react_dom$6.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("button", {
		type: "button",
		className: "project-plan-panel__desc-rich-placeholder" + (hasEmptyBlock ? " project-plan-panel__desc-rich-placeholder--has-empty-block" : ""),
		contentEditable: false,
		onClick: handleClick,
		children: text
	}), portalTarget);
}
var import_react$17, import_react_dom$6, import_jsx_runtime$13, ProjectPlanRichDescriptionEditorInner, ProjectPlanRichDescriptionEditor;
var init_project_plan_rich_description_editor = __esmMin((() => {
	init_project_plan_rich_description_editor$1();
	init_dist$1();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$6 = /* @__PURE__ */ __toESM(require_react_dom());
	init_convert_pasted_links();
	init_space_link_plugin();
	init_use_rich_description_editor();
	import_jsx_runtime$13 = require_jsx_runtime();
	ProjectPlanRichDescriptionEditorInner = (props) => {
		const { value, placeholder, themeName, projectId, todoId, mode } = props;
		const readOnly = props.mode === "edit" ? props.readOnly ?? false : false;
		const selectionBeforeAppBlurRef = (0, import_react$17.useRef)(null);
		const editorWasFocusedBeforeAppBlurRef = (0, import_react$17.useRef)(false);
		const { editor, editorConfig, commit } = useRichDescriptionEditor(props.mode === "create" ? {
			mode: "create",
			content: value,
			themeName,
			projectId,
			todoId,
			onChange: props.onChange
		} : {
			mode: "edit",
			content: value,
			themeName,
			projectId,
			todoId,
			onSave: props.onSave,
			readOnly: props.readOnly
		});
		const { registryConfig, pluginBehaviors, PluginContainer } = a$5(SPACE_LINK_PLUGINS);
		(0, import_react$17.useEffect)(() => {
			if (!readOnly) editor.setEditable(true);
		}, [editor, readOnly]);
		(0, import_react$17.useEffect)(() => {
			const captureSelectionBeforeAppBlur = () => {
				if (!editor.isEditing) return;
				const selection = editor.lastSelection;
				if (!selection) return;
				editorWasFocusedBeforeAppBlurRef.current = true;
				selectionBeforeAppBlurRef.current = selection;
			};
			const restoreSelectionAfterAppFocus = () => {
				const selection = selectionBeforeAppBlurRef.current;
				if (document.hidden) return;
				selectionBeforeAppBlurRef.current = null;
				if (!editorWasFocusedBeforeAppBlurRef.current || !selection || editor.isDestroyed) return;
				editorWasFocusedBeforeAppBlurRef.current = false;
				n$2(editor, selection.focus.blockId, selection.focus.offset);
			};
			const handleVisibilityChange = () => {
				if (document.hidden) captureSelectionBeforeAppBlur();
				else restoreSelectionAfterAppFocus();
			};
			window.addEventListener("blur", captureSelectionBeforeAppBlur);
			window.addEventListener("focus", restoreSelectionAfterAppFocus);
			document.addEventListener("visibilitychange", handleVisibilityChange);
			return () => {
				window.removeEventListener("blur", captureSelectionBeforeAppBlur);
				window.removeEventListener("focus", restoreSelectionAfterAppFocus);
				document.removeEventListener("visibilitychange", handleVisibilityChange);
			};
		}, [editor]);
		const scrollModifier = mode === "create" ? props.scroll === "page" ? "project-plan-panel__desc-rich--page-flow-scroll" : "project-plan-panel__desc-rich--container-scroll" : "project-plan-panel__desc-rich--page-scroll";
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: `project-plan-panel__desc-rich ${scrollModifier}`,
			onPasteCapture: () => scheduleSpaceLinkConversion(editor),
			onBlur: (event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) {
					if (event.relatedTarget === null && !document.hasFocus()) {
						const selection = editor.lastSelection;
						if (selection) {
							editorWasFocusedBeforeAppBlurRef.current = true;
							selectionBeforeAppBlurRef.current = selection;
						}
						return;
					}
					commit().catch(() => void 0);
				}
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(c$1, {
				editor,
				className: "project-plan-panel__desc-rich-root",
				...editorConfig,
				registryConfig,
				pluginBehaviors,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(PluginContainer, { editor }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(RichDescriptionPlaceholder, { text: placeholder })]
			})
		});
	};
	ProjectPlanRichDescriptionEditorInner.displayName = "ProjectPlanRichDescriptionEditor";
	ProjectPlanRichDescriptionEditor = import_react$17.memo(ProjectPlanRichDescriptionEditorInner);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/owner-picker/owner-picker.less
var init_owner_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/use-delayed-auto-focus.ts
/**
* useDelayedAutoFocus —— 延迟一帧后聚焦目标元素（cell-editor 场景专用）
*
* 为什么不用原生 `autoFocus`：
* cell-editor 的浮层由 `CellEditorShell` 承载，首帧 `pos=null` → `visibility:hidden`，
* 要等 `useLayoutEffect` 算完定位后才变 `visible`。而 `visibility:hidden` 的元素
* **无法获得焦点**——挂载首帧执行的 `focus()`（含原生 autoFocus）会静默失败。
*
* 解决：把 focus 延迟到下一帧（requestAnimationFrame），此时定位已算完、浮层已可见，
* `focus()` 才会真正生效。卸载时 `cancelAnimationFrame` 防止回调误执行。
*
* 处理人 / 优先级 / 标签三种 cell-editor 的搜索框共用此逻辑。
*
* @param enabled 是否启用自动聚焦，默认 true。false 时不做任何聚焦。
* @returns 挂到目标输入元素上的 ref
*/
function useDelayedAutoFocus(enabled = true) {
	const ref = (0, import_react$16.useRef)(null);
	(0, import_react$16.useEffect)(() => {
		if (!enabled) return;
		const rafId = requestAnimationFrame(() => {
			ref.current?.focus();
		});
		return () => cancelAnimationFrame(rafId);
	}, [enabled]);
	return ref;
}
var import_react$16;
var init_use_delayed_auto_focus = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/owner-picker/owner-picker-dropdown.tsx
var import_react$15, import_react_dom$5, import_jsx_runtime$12, OwnerPickerDropdown;
var init_owner_picker_dropdown = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$5 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_use_delayed_auto_focus();
	import_jsx_runtime$12 = require_jsx_runtime();
	OwnerPickerDropdown = ({ options, selectedIds, onToggle, keyword, onKeywordChange, position, usePortal = true, mode = "multi", allowRevoked = false, searchPlaceholder, emptyText, displayField = "label", dropdownRef, className, autoFocusSearch = false }) => {
		const t = useTranslation();
		const searchInputRef = useDelayedAutoFocus(autoFocusSearch);
		const filtered = (0, import_react$15.useMemo)(() => {
			const kw = keyword.trim().toLowerCase();
			if (!kw) return options;
			return options.filter((option) => option.searchText.toLowerCase().includes(kw));
		}, [keyword, options]);
		const handleToggle = (ownerId) => {
			const option = options.find((o) => o.id === ownerId);
			if (!allowRevoked && option?.revoked) return;
			onToggle(ownerId);
		};
		const rootClass = [
			usePortal ? "wb-popover-compact" : "",
			"wb-owner-picker",
			usePortal ? "wb-owner-picker--portal" : "wb-owner-picker--inline",
			className
		].filter(Boolean).join(" ");
		const node = /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			ref: dropdownRef,
			className: rootClass,
			style: usePortal ? {
				top: position?.top,
				bottom: position?.bottom,
				left: position?.left
			} : void 0,
			role: "menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "wb-owner-picker__search",
					children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("input", {
						ref: searchInputRef,
						type: "search",
						value: keyword,
						autoComplete: "off",
						placeholder: searchPlaceholder ?? t("collab.plan.create.ownerSearchPlaceholder"),
						onChange: (event) => onKeywordChange(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "wb-owner-picker__list",
					children: filtered.map((owner) => {
						const checked = mode === "single" ? selectedIds[0] === owner.id : selectedIds.includes(owner.id);
						return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("label", {
							"aria-disabled": owner.revoked && !allowRevoked || void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("input", {
								type: "checkbox",
								checked,
								disabled: !allowRevoked && owner.revoked,
								onChange: () => handleToggle(owner.id)
							}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { children: displayField === "label" ? owner.label : owner.name })]
						}, owner.id);
					})
				}),
				filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "wb-owner-picker__empty",
					children: emptyText ?? t("collab.plan.create.ownerEmpty")
				})
			]
		});
		return usePortal ? (0, import_react_dom$5.createPortal)(node, document.body) : node;
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/project-plan-owner-options.ts
function getOwnerId(raw) {
	const id = raw.userId || raw.id;
	return id ? String(id) : void 0;
}
/**
* 解析成员显示名 —— 与 collab 其它处共享同一套兜底链（resolveTeamMember）：
*   1) Project.members 内有真实 nickname（store 数据源同源）→ 用它
*   2) 后端 API 原始字段（display_name/nickname/name/userName）作为 store 兜底
*   3) 三档都没拿到时回退到 unknownLabel（表示未知成员）
*/
function getOwnerName(raw, id, storeMembers, unknownLabel) {
	const apiFallback = raw.display_name || raw.nickname || raw.name || raw.userName;
	const view = resolveTeamMember(id, storeMembers, { fallbackName: apiFallback });
	return view.name === id ? unknownLabel : view.name;
}
function normalizeOwnerOptions(fallbackMembers, apiMembers, unknownLabel, revokedSuffix = "") {
	const source = apiMembers && apiMembers.length > 0 ? apiMembers : fallbackMembers;
	const seen = /* @__PURE__ */ new Set();
	return source.flatMap((raw) => {
		const owner = raw;
		const id = getOwnerId(owner);
		if (!id || seen.has(id)) return [];
		seen.add(id);
		const revoked = Boolean(owner.revokedAt);
		const name = getOwnerName(owner, id, fallbackMembers, unknownLabel);
		return [{
			id,
			name,
			label: revoked ? `${name}${revokedSuffix}` : name,
			searchText: `${name} ${id}`,
			revoked
		}];
	});
}
function getOwnerLabel(options, selectedIds, detailAssignees, fallback, multiTemplate) {
	if (selectedIds.length === 0) return fallback;
	const detailNameById = new Map((detailAssignees ?? []).flatMap((item) => item.id && item.name?.trim() ? [[item.id, item.name.trim()]] : []));
	const names = selectedIds.map((id) => {
		const option = options.find((item) => item.id === id);
		return option?.revoked ? option.label : detailNameById.get(id) ?? (option?.name !== id ? option?.name : void 0);
	}).filter((name) => Boolean(name));
	if (names.length === 0) return fallback;
	return selectedIds.length > 1 ? multiTemplate(names[0], selectedIds.length) : names[0];
}
function getTodoAssigneeIds(todo) {
	const ids = todo?.assignees?.map((item) => item.id).filter((id) => Boolean(id)) ?? [];
	return ids.length > 0 ? ids : todo?.assignee?.id ? [todo.assignee.id] : [];
}
/**
* 待办处理人 → 头像展示成员（CollaboratorAvatarStack 入参）映射。
* 兼容 `assignees[]` 多人 / 历史单人字段 `assignee`；名称缺失时回落到 undefined。
*
* 子待办行、状态级联完成确认弹窗等多处头像展示复用同一份映射，避免各自 inline。
*/
function getTodoAvatarMembers(todo) {
	return (todo.assignees && todo.assignees.length > 0 ? todo.assignees : todo.assignee ? [todo.assignee] : []).map((assignee) => ({
		id: assignee.id,
		name: assignee.name?.trim() || void 0,
		avatarUrl: assignee.avatarUrl
	}));
}
/** 已离开成员仅用于历史展示；提交处理人变更时过滤掉明确 revoked 的成员。 */
function filterActiveOwnerIds(options, ids) {
	const revokedIds = new Set(options.filter((option) => option.revoked).map((option) => option.id));
	const seen = /* @__PURE__ */ new Set();
	return ids.filter((id) => {
		if (!id || revokedIds.has(id) || seen.has(id)) return false;
		seen.add(id);
		return true;
	});
}
/** 未出现在 options 中的 id 不视为 revoked，避免成员列表加载不完整时误清理历史负责人。 */
function isOwnerRevoked(options, id) {
	return Boolean(options.find((option) => option.id === id)?.revoked);
}
var init_project_plan_owner_options = __esmMin((() => {
	init_resolve_team_member();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/owner-picker/use-owner-options.ts
/**
* 把 listMembers 原始成员同步到智能表数据层 userMap（若 service 已就绪）。
*
* 处理人下拉每次打开都会实时 listMembers 拿到最新成员（含新加入 / 改名），在此顺带把
* 「userId → 用户名」灌进数据层——新增/移除处理人所需的用户信息在下拉渲染处就已备好，
* 写入时无需再拉数据。syncUserInfos 内部做校验 + diff，已缓存一致的项不会重绘。
*/
function syncMembersToDataLayer(projectId, apiMembers, memberAvatars) {
	const service = peekSmartsheetService(projectId);
	if (!service || !apiMembers || apiMembers.length === 0) return;
	const infos = apiMembers.map((raw) => {
		const m = raw;
		const id = String(m.userId ?? m.id ?? "");
		return {
			id,
			name: m.display_name || m.nickname || m.name || m.userName || "",
			avatarUrl: memberAvatars[id] || m.avatar || ""
		};
	}).filter((u) => u.id && u.name && u.name !== u.id);
	if (infos.length > 0) try {
		service.syncUserInfos(infos);
	} catch {}
}
function useOwnerOptions({ projectId, fallbackMembers, includeRevoked = true }) {
	const t = useTranslation();
	const { facades } = useModuleHost();
	const projectFacade = facades.project;
	const unknownMemberLabel = t("collab.plan.create.unknownMember");
	const revokedMemberSuffix = t("collab.plan.create.revokedMemberSuffix");
	const storeMembers = useMembersStore((s) => s.members);
	const memberAvatars = useMemberAvatarsStore((state) => state.projectId === projectId ? state.avatars : EMPTY_MEMBER_AVATARS);
	const nameSourceMembers = storeMembers.length > 0 ? storeMembers : fallbackMembers;
	const [apiMembers, setApiMembers] = (0, import_react$14.useState)(void 0);
	(0, import_react$14.useEffect)(() => {
		if (!projectFacade) {
			setApiMembers(void 0);
			return;
		}
		let cancelled = false;
		setApiMembers(void 0);
		projectFacade.listMembers(projectId, { includeRevoked }).then((result) => {
			if (cancelled) return;
			const items = result.items ?? [];
			useMembersStore.getState().syncActiveProjectMembers(projectId, items);
			setApiMembers(items);
		}).catch((reason) => {
			console.warn("[useOwnerOptions] list members failed:", reason);
		});
		return () => {
			cancelled = true;
		};
	}, [
		projectFacade,
		projectId,
		includeRevoked
	]);
	(0, import_react$14.useEffect)(() => {
		syncMembersToDataLayer(projectId, apiMembers, memberAvatars);
	}, [
		apiMembers,
		memberAvatars,
		projectId
	]);
	return { options: (0, import_react$14.useMemo)(() => normalizeOwnerOptions(nameSourceMembers, apiMembers, unknownMemberLabel, revokedMemberSuffix), [
		nameSourceMembers,
		apiMembers,
		unknownMemberLabel,
		revokedMemberSuffix
	]) };
}
var import_react$14, EMPTY_MEMBER_AVATARS;
var init_use_owner_options = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_smart_sheet();
	init_context();
	init_member_avatars_store();
	init_members_store();
	init_project_plan_owner_options();
	EMPTY_MEMBER_AVATARS = {};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/owner-picker/index.ts
var init_owner_picker = __esmMin((() => {
	init_owner_picker$1();
	init_owner_picker_dropdown();
	init_use_owner_options();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-due-picker.less
var init_project_plan_due_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/project-plan-date-utils.ts
/**
* 计划 Tab 日期工具 —— 处理待办开始/截止日期（YYYY-MM-DD / ISO）的解析与范围校验。
*/
/** 日期字符串 → 本地 00:00:00 的 Date；无法解析或为空时返回 null。 */
function parseDateOnly(value) {
	if (!value) return null;
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		const [year, month, day] = value.split("-").map(Number);
		const date = new Date(year, month - 1, day);
		return Number.isNaN(date.getTime()) ? null : date;
	}
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return null;
	return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}
/**
* 校验「开始时间不能晚于截止时间」。
*
* 任一字段未设置时视为合法；仅在两端都有值且开始 > 截止时返回 false。
*/
function isTodoDateRangeValid(startedAt, dueDate) {
	const start = parseDateOnly(startedAt);
	const due = parseDateOnly(dueDate);
	if (!start || !due) return true;
	return start.getTime() <= due.getTime();
}
var init_project_plan_date_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/project-plan-helpers.tsx
function buildFormState(todo, defaultStatus) {
	const assigneeIds = todo?.assignees?.map((item) => item?.id).filter((id) => Boolean(id)) ?? (todo?.assignee?.id ? [todo.assignee.id] : []);
	const status = todo?.status ?? defaultStatus;
	return {
		title: todo?.title ?? "",
		description: todo?.description ?? "",
		assigneeId: assigneeIds[0] ?? "",
		assigneeIds,
		priority: resolvePriorityOption(todo),
		tags: todo?.tags ?? [],
		startedAt: todo?.startedAt?.slice(0, 10) ?? "",
		dueDate: todo?.dueDate?.slice(0, 10) ?? "",
		statusId: status?.id ?? "",
		statusType: status?.type ?? "",
		attachments: [],
		localAttachmentFiles: []
	};
}
/**
* 状态类型 → 文案。
* - 传入 `t` 且为标准枚举（pending/in_progress/paused/completed）：走 i18n；
* - 否则使用 `fallback`（通常是后端 status.name）或 type 字符串本身。
*
* 注意：智能表迁移后 status.name 是英文选项原文（'pending'/'running' 等），
* 不能再当展示文案直接渲染——标准枚举必须走 i18n。
*/
function getStatusTypeLabel(type, fallback, t) {
	const key = STATUS_LABEL_KEYS[type];
	if (key && t) return t(key);
	if (key) return {
		pending: "待开始",
		in_progress: "进行中",
		paused: "已暂停",
		completed: "已完成"
	}[type] ?? fallback ?? type;
	return fallback ?? type;
}
/**
* 「已完成」状态的统一二元判定（状态列 type 为 'completed'）。
* 子待办完成计数、行完成态样式等 is-completed 判断复用此函数，避免散落的
* `status.type === 'completed'` 字面量。
* 注：pending/in_progress/paused/completed 多分支逐一分派的场景不走此函数，
* 仍按各自分支判断，避免割裂状态分派语义。
*/
function isTodoCompleted(todo) {
	return todo.status.type === "completed";
}
/**
* 日期/时间格式化。
* 传入 `t` 时不影响日期数字本身，只影响兜底占位符。
*/
function formatDateTime(value, t) {
	if (!value) return t ? t("collab.plan.format.fallbackDash") : "—";
	const isDateOnly = value.length <= 10;
	const date = isDateOnly ? parseDateOnly(value) : new Date(value);
	if (!date || Number.isNaN(date.getTime())) return value;
	return date.toLocaleString(t ? void 0 : "zh-CN", isDateOnly ? {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	} : {
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
var STATUS_LABEL_KEYS;
var init_project_plan_helpers = __esmMin((() => {
	require_react();
	init_useI18n();
	init_smart_sheet();
	init_project_plan_date_utils();
	require_jsx_runtime();
	STATUS_LABEL_KEYS = {
		pending: "collab.plan.status.label.pending",
		in_progress: "collab.plan.status.label.in_progress",
		paused: "collab.plan.status.label.paused",
		completed: "collab.plan.status.label.completed"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-due-picker.tsx
function toDateInputValue(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
var import_react$12, import_jsx_runtime$10, CalendarIcon, ProjectPlanDuePicker;
var init_project_plan_due_picker = __esmMin((() => {
	init_project_plan_due_picker$1();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_project_plan_helpers();
	import_jsx_runtime$10 = require_jsx_runtime();
	CalendarIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		className: "project-plan-panel__calendar-icon",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 2 2)",
			d: "M1 1L1 2.3333L11 2.3333L11 1L1 1ZM0 2.3333L0 3.3333L0 11.3333C0 11.7015 0.2985 12 0.6667 12L11.3333 12C11.7015 12 12 11.7015 12 11.3333L12 3.3333L12 2.3333L12 0.6667C12 0.2985 11.7015 0 11.3333 0L0.6667 0C0.2985 0 0 0.2985 0 0.6667L0 2.3333ZM11 11L11 3.3333L1 3.3333L1 11L11 11ZM3.9225 5.8862L3.9073 5.8862L3.0839 6.4573C3.028 6.4933 3 6.4779 3 6.411L3 5.4539C3 5.4128 3.0178 5.3767 3.0534 5.3459L3.9225 4.713C3.9581 4.6821 4.0039 4.6667 4.0598 4.6667L4.9137 4.6667C4.9646 4.6667 4.99 4.6924 4.99 4.7438L4.99 9.8379C4.99 9.8894 4.9646 9.9151 4.9137 9.9151L3.9988 9.9151C3.948 9.9151 3.9226 9.8894 3.9225 9.8379L3.9225 5.8862ZM6.9088 8.3637C6.9088 8.5798 6.9698 8.7548 7.0918 8.8886C7.2137 9.0224 7.3815 9.0892 7.595 9.0892C7.8084 9.0892 7.9762 9.0224 8.0982 8.8886C8.2202 8.7548 8.2812 8.5798 8.2812 8.3637C8.2812 8.1476 8.2202 7.9727 8.0982 7.8389C7.9762 7.7 7.8084 7.6305 7.595 7.6305C7.3815 7.6305 7.2137 7.7 7.0918 7.8389C6.9698 7.9727 6.9088 8.1476 6.9088 8.3637ZM5.8566 8.3483C5.8566 8.1219 5.8896 7.9058 5.9557 7.7C6.0218 7.4941 6.1158 7.278 6.2378 7.0516L7.4958 4.7207C7.5111 4.6847 7.5416 4.6667 7.5873 4.6667L8.5556 4.6667C8.6166 4.6667 8.6344 4.6924 8.609 4.7438L7.5111 6.7737L7.5263 6.7892C7.5518 6.7789 7.5924 6.7686 7.6483 6.7583C7.7093 6.748 7.7754 6.7429 7.8466 6.7429C8.0499 6.7429 8.2405 6.7815 8.4184 6.8587C8.6014 6.9307 8.759 7.0362 8.8911 7.1751C9.0284 7.3089 9.1351 7.4735 9.2113 7.6691C9.2927 7.8646 9.3333 8.0833 9.3333 8.3251C9.3333 8.5876 9.2876 8.8242 9.1961 9.0352C9.1097 9.241 8.9877 9.416 8.8301 9.5601C8.6776 9.7041 8.4946 9.8148 8.2812 9.8919C8.0677 9.964 7.8389 10 7.595 10C7.3459 10 7.1146 9.964 6.9012 9.8919C6.6927 9.8148 6.5098 9.7067 6.3522 9.5678C6.1997 9.4237 6.0777 9.2488 5.9862 9.0429C5.8998 8.8371 5.8566 8.6056 5.8566 8.3483Z"
		})
	});
	ProjectPlanDuePicker = ({ value, variant, disabled, placeholder, allowPast, min, max, toggleOnReclick, openDirection = "auto", trackId, trackName, onChange, onBeforeOpen }) => {
		const t = useTranslation();
		const inputRef = (0, import_react$12.useRef)(null);
		const buttonRef = (0, import_react$12.useRef)(null);
		/** 上一次通知外层的值，用于去重 */
		const lastNotifiedRef = (0, import_react$12.useRef)(value);
		/** 原生日期选择器是否已打开——仅 toggleOnReclick 场景用于「再点即关」。 */
		const pickerOpenRef = (0, import_react$12.useRef)(false);
		/** 抑制紧随「关闭」mousedown 之后的 click 重新打开选择器。 */
		const suppressOpenRef = (0, import_react$12.useRef)(false);
		/** 用 ref 持有 onChange 最新引用，避免 useEffect 因引用变化频繁重订阅 */
		const onChangeRef = (0, import_react$12.useRef)(onChange);
		onChangeRef.current = onChange;
		/** 清掉 create 场景为强制向上展开而写入的 fixed 锚点样式。 */
		const resetNativeInputAnchor = (0, import_react$12.useCallback)(() => {
			const input = inputRef.current;
			if (!input) return;
			input.style.position = "";
			input.style.left = "";
			input.style.top = "";
			input.style.width = "";
			input.style.height = "";
			input.style.opacity = "";
			input.style.pointerEvents = "";
			input.style.border = "";
			input.style.padding = "";
			input.style.margin = "";
			input.style.zIndex = "";
		}, []);
		/**
		* openDirection='up'：把原生 input fixed 到按钮顶边并拉满视口下方，逼日历向上开。
		* 必须在用户手势（click）里同步完成 + reflow，再调 showPicker——延到
		* useLayoutEffect 会丢掉 user activation，showPicker 直接抛错。
		*/
		const applyUpwardAnchor = (0, import_react$12.useCallback)(() => {
			const input = inputRef.current;
			const button = buttonRef.current;
			if (!input || !button) return false;
			const rect = button.getBoundingClientRect();
			input.style.position = "fixed";
			input.style.left = `${rect.left}px`;
			input.style.top = `${rect.top}px`;
			input.style.width = `${Math.max(rect.width, 1)}px`;
			input.style.height = `${Math.max(window.innerHeight - rect.top, 1)}px`;
			input.style.opacity = "0";
			input.style.pointerEvents = "none";
			input.style.border = "none";
			input.style.padding = "0";
			input.style.margin = "0";
			input.style.zIndex = "-1";
			input.getBoundingClientRect();
			return true;
		}, []);
		const openNativePicker = (0, import_react$12.useCallback)(() => {
			const input = inputRef.current;
			if (!input) return;
			try {
				if (typeof input.showPicker === "function") input.showPicker();
				else input.click();
			} catch {
				input.click();
			}
			pickerOpenRef.current = true;
		}, []);
		const today = toDateInputValue(/* @__PURE__ */ new Date());
		const baseMin = allowPast ? void 0 : today;
		const effectiveMin = min && baseMin ? min > baseMin ? min : baseMin : min ?? baseMin;
		const label = value ? formatDateTime(value, t) : placeholder ?? t("collab.plan.due.placeholder");
		const [internalValue, setInternalValue] = (0, import_react$12.useState)(value);
		(0, import_react$12.useEffect)(() => {
			setInternalValue(value);
			lastNotifiedRef.current = value;
		}, [value]);
		(0, import_react$12.useEffect)(() => {
			const input = inputRef.current;
			if (!input) return;
			const handleNativeChange = () => {
				pickerOpenRef.current = false;
				resetNativeInputAnchor();
				const newValue = input.value;
				if (newValue === lastNotifiedRef.current && !(newValue === "" && lastNotifiedRef.current !== "")) return;
				lastNotifiedRef.current = newValue;
				onChangeRef.current(newValue);
			};
			input.addEventListener("change", handleNativeChange);
			return () => input.removeEventListener("change", handleNativeChange);
		}, [resetNativeInputAnchor]);
		(0, import_react$12.useEffect)(() => {
			const input = inputRef.current;
			if (!input) return;
			const handleBlur = () => {
				pickerOpenRef.current = false;
				resetNativeInputAnchor();
			};
			input.addEventListener("blur", handleBlur);
			return () => input.removeEventListener("blur", handleBlur);
		}, [resetNativeInputAnchor]);
		const handleMouseDown = (0, import_react$12.useCallback)((event) => {
			if (disabled || !toggleOnReclick) return;
			if (pickerOpenRef.current) {
				event.preventDefault();
				inputRef.current?.blur();
				pickerOpenRef.current = false;
				suppressOpenRef.current = true;
			}
		}, [disabled, toggleOnReclick]);
		const handleClick = (0, import_react$12.useCallback)(() => {
			if (disabled) return;
			if (suppressOpenRef.current) {
				suppressOpenRef.current = false;
				return;
			}
			onBeforeOpen?.();
			setInternalValue(value);
			if (openDirection === "up") applyUpwardAnchor();
			else resetNativeInputAnchor();
			openNativePicker();
		}, [
			disabled,
			value,
			onBeforeOpen,
			openDirection,
			applyUpwardAnchor,
			resetNativeInputAnchor,
			openNativePicker
		]);
		const handleInputChange = (0, import_react$12.useCallback)((event) => {
			setInternalValue(event.target.value);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: `project-plan-panel__due-picker project-plan-panel__due-picker--${variant}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
				ref: buttonRef,
				type: "button",
				className: variant === "create" ? "project-plan-panel__create-chip" : "project-plan-panel__field-picker",
				disabled,
				onMouseDown: handleMouseDown,
				onClick: handleClick,
				"data-track-id": trackId,
				"data-track-name": trackName,
				children: [
					variant === "create" && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(CalendarIcon, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: !value && variant === "create" ? "project-plan-panel__create-chip-placeholder" : "",
						children: label
					}),
					variant === "detail" && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
							d: "M2.5 4l2.5 2.5L7.5 4",
							stroke: "currentColor",
							strokeWidth: "1.4",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					}) })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("input", {
				ref: inputRef,
				type: "date",
				className: "project-plan-panel__due-native-input",
				value: internalValue,
				min: effectiveMin,
				max,
				onChange: handleInputChange,
				tabIndex: -1,
				"aria-hidden": "true"
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-priority-picker.less
var init_project_plan_priority_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/outside-close-ignore.ts
function isOutsideCloseIgnored(target) {
	return target instanceof Element && Boolean(target.closest(FOUNDATION_OVERLAY_SELECTOR));
}
var OUTSIDE_CLOSE_IGNORE_ATTR, FOUNDATION_OVERLAY_SELECTOR;
var init_outside_close_ignore = __esmMin((() => {
	OUTSIDE_CLOSE_IGNORE_ATTR = "data-outside-close-ignore";
	FOUNDATION_OVERLAY_SELECTOR = `[${OUTSIDE_CLOSE_IGNORE_ATTR}], .wb-popover`;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/priority-chip.less
var init_priority_chip$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/tag-color.ts
/** 由带 style 的选项列表构建「文本 → style token」查找表 */
function buildTagStyleByText(options) {
	const map = /* @__PURE__ */ new Map();
	for (const opt of options) map.set(opt.text, opt.style);
	return map;
}
/** style token → chip 内联样式（背景 / 边框 / 文字色）；style 缺省走中性兜底色 */
function tagChipStyle(style) {
	const cfg = resolveTagStyle(style);
	return {
		background: cfg.background,
		borderColor: cfg.borderColor,
		color: cfg.textColor
	};
}
/** 标签色盘 → Foundation ColorPicker 需要的 ColorSwatch[]（27 色，3×9） */
function tagPaletteColorSwatches() {
	return TAG_PALETTE_SWATCHES$1.map((swatch) => ({
		value: swatch.style,
		color: swatch.background,
		borderColor: swatch.borderColor,
		title: swatch.title
	}));
}
var init_tag_color = __esmMin((() => {
	init_smart_sheet();
})), import_jsx_runtime$9, PriorityChip;
var init_priority_chip = __esmMin((() => {
	init_priority_chip$1();
	require_react();
	init_tag_color();
	import_jsx_runtime$9 = require_jsx_runtime();
	PriorityChip = ({ label, style, className }) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
		className: ["wb-priority-chip", className].filter(Boolean).join(" "),
		style: tagChipStyle(style),
		title: label,
		children: label
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/tag-create-row.tsx
var import_react$10, import_jsx_runtime$8, TAG_PALETTE_SWATCHES, TagCreateRow;
var init_tag_create_row = __esmMin((() => {
	init_src();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tag_color();
	import_jsx_runtime$8 = require_jsx_runtime();
	TAG_PALETTE_SWATCHES = tagPaletteColorSwatches();
	TagCreateRow = ({ keyword, label, creating, onCreate }) => {
		const t = useTranslation();
		/** 新建标签选中的背景色（色盘 token）；undefined 表示交由后端自动配色 */
		const [style, setStyle] = (0, import_react$10.useState)(void 0);
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "project-plan-panel__tags-create-area",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
				type: "button",
				className: "project-plan-panel__tags-create",
				disabled: creating,
				onClick: () => {
					Promise.resolve(onCreate(style)).catch(() => void 0);
				},
				"data-track-id": "collab_plan_todo_label_create",
				"data-track-name": "新建标签",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
					className: "project-plan-panel__tags-create-swatch",
					style: tagChipStyle(style),
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: `${label ?? ""}「${keyword}」` })]
			}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "project-plan-panel__tags-create-palette",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ColorPicker, {
					colors: TAG_PALETTE_SWATCHES,
					value: style,
					onChange: (value) => setStyle(Number(value)),
					columns: 9,
					swatchSize: 18,
					"aria-label": t("collab.plan.detail.tagsColorLabel")
				})
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/tag-edit-panel.tsx
var import_react$9, import_jsx_runtime$7, TAG_SWATCHES, TagEditPanel;
var init_tag_edit_panel = __esmMin((() => {
	init_src();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_components();
	init_outside_close_ignore();
	init_tag_color();
	import_jsx_runtime$7 = require_jsx_runtime();
	TAG_SWATCHES = tagPaletteColorSwatches();
	TagEditPanel = ({ initialText, editInitialText, initialStyle, selected, onSubmit, onLiveCommit, onCancel }) => {
		const t = useTranslation();
		const displayInitialText = editInitialText ?? initialText;
		const [text, setText] = (0, import_react$9.useState)(displayInitialText);
		const [style, setStyle] = (0, import_react$9.useState)(initialStyle);
		const [paletteOpen, setPaletteOpen] = (0, import_react$9.useState)(false);
		const inputRef = (0, import_react$9.useRef)(null);
		const submittingRef = (0, import_react$9.useRef)(false);
		const draftRef = (0, import_react$9.useRef)({
			text: displayInitialText,
			style: initialStyle
		});
		(0, import_react$9.useEffect)(() => {
			draftRef.current = {
				text,
				style
			};
		}, [text, style]);
		const baselineRef = (0, import_react$9.useRef)({
			text: initialText,
			style: initialStyle
		});
		const textCommitTimerRef = (0, import_react$9.useRef)(null);
		const clearTextCommitTimer = () => {
			if (textCommitTimerRef.current) {
				clearTimeout(textCommitTimerRef.current);
				textCommitTimerRef.current = null;
			}
		};
		(0, import_react$9.useEffect)(() => clearTextCommitTimer, []);
		/**
		* 归一化输入文本 → 实际写库文本：
		* - 空名：回退到基线（不写空名）。
		* - 未改动（trim 后 === 显示初值，即优先级默认项的中文 label 原样）：回退到真实
		*   initialText（英文枚举），从而与基线相等被判定「无变化」，不把中文覆盖英文枚举。
		* - 改成别的名字：原样返回，按新值写库。
		*/
		const normalizeText = (nextText) => {
			const trimmed = nextText.trim();
			if (!trimmed) return baselineRef.current.text;
			if (trimmed === displayInitialText) return initialText;
			return trimmed;
		};
		const commitLive = (nextText, nextStyle) => {
			const finalText = normalizeText(nextText);
			if (finalText === baselineRef.current.text && nextStyle === baselineRef.current.style) return;
			baselineRef.current = {
				text: finalText,
				style: nextStyle
			};
			Promise.resolve(onLiveCommit?.(finalText, nextStyle)).catch(() => void 0);
		};
		const scheduleTextCommit = () => {
			clearTextCommitTimer();
			textCommitTimerRef.current = setTimeout(() => {
				textCommitTimerRef.current = null;
				commitLive(draftRef.current.text, draftRef.current.style);
			}, 300);
		};
		(0, import_react$9.useEffect)(() => {
			const tid = setTimeout(() => {
				inputRef.current?.focus();
				inputRef.current?.select();
			}, 0);
			return () => clearTimeout(tid);
		}, []);
		(0, import_react$9.useEffect)(() => {
			const onKeyDown = (event) => {
				if (event.key === "Escape") {
					event.stopPropagation();
					if (paletteOpen) {
						setPaletteOpen(false);
						return;
					}
					onCancel();
				}
			};
			document.addEventListener("keydown", onKeyDown, true);
			return () => document.removeEventListener("keydown", onKeyDown, true);
		}, [onCancel, paletteOpen]);
		const submit = () => {
			if (submittingRef.current) return;
			clearTextCommitTimer();
			const nextStyle = draftRef.current.style;
			const finalText = normalizeText(draftRef.current.text);
			const textChanged = finalText !== baselineRef.current.text;
			const styleChanged = nextStyle !== baselineRef.current.style;
			if (!textChanged && !styleChanged) {
				onCancel();
				return;
			}
			baselineRef.current = {
				text: finalText,
				style: nextStyle
			};
			submittingRef.current = true;
			Promise.resolve(onSubmit(finalText, nextStyle)).catch(() => void 0);
		};
		const handleKeyDown = (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				submit();
			}
		};
		const handleBlur = (event) => {
			if (event.currentTarget.contains(event.relatedTarget)) return;
			submit();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "project-plan-panel__tags-option project-plan-panel__tags-option--editing",
			onBlur: handleBlur,
			onClick: (event) => event.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "project-plan-panel__tags-edit-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "project-plan-panel__tags-option-check",
						"aria-hidden": true,
						children: selected && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(CheckIcon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Popover, {
						open: paletteOpen,
						onOpenChange: setPaletteOpen,
						placement: "right-start",
						portalRoot: "body",
						trigger: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							type: "button",
							className: "project-plan-panel__tags-edit-swatch-btn",
							style: tagChipStyle(style),
							onMouseDown: (event) => event.preventDefault(),
							"aria-label": t("collab.plan.detail.tagsColorLabel")
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "project-plan-panel__tags-edit-palette-pop",
							[OUTSIDE_CLOSE_IGNORE_ATTR]: "",
							onMouseDown: (event) => event.preventDefault(),
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ColorPicker, {
								colors: TAG_SWATCHES,
								value: style,
								onChange: (value) => {
									const next = Number(value);
									setStyle(next);
									setPaletteOpen(false);
									commitLive(draftRef.current.text, next);
								},
								columns: 9,
								swatchSize: 18,
								"aria-label": t("collab.plan.detail.tagsColorLabel")
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("input", {
						ref: inputRef,
						type: "text",
						size: 1,
						className: "project-plan-panel__tags-option-edit-input",
						value: text,
						onChange: (event) => {
							setText(event.target.value);
							scheduleTextCommit();
						},
						onKeyDown: handleKeyDown
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/tag-option-button.tsx
var import_react$8, import_react_dom$4, import_jsx_runtime$6, MORE_MENU_Z_INDEX, ESTIMATED_MENU_WIDTH, ESTIMATED_MENU_HEIGHT, VIEWPORT_MARGIN, TagOptionButton;
var init_tag_option_button = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$4 = /* @__PURE__ */ __toESM(require_react_dom());
	init_components();
	init_outside_close_ignore();
	init_tag_color();
	init_tag_edit_panel();
	import_jsx_runtime$6 = require_jsx_runtime();
	MORE_MENU_Z_INDEX = 10200;
	ESTIMATED_MENU_WIDTH = 140;
	ESTIMATED_MENU_HEIGHT = 84;
	VIEWPORT_MARGIN = 8;
	TagOptionButton = ({ text, displayText, style, selected, onToggle, disabled, onEdit, onDelete, editLabel, deleteLabel, deleteConfirmTitle, deleteConfirmDesc, deleteConfirmOkLabel, deleteConfirmCancelLabel }) => {
		const [moreOpen, setMoreOpen] = (0, import_react$8.useState)(false);
		const [editing, setEditing] = (0, import_react$8.useState)(false);
		const [confirmingDelete, setConfirmingDelete] = (0, import_react$8.useState)(false);
		const hasDeleteConfirm = Boolean(deleteConfirmTitle && deleteConfirmDesc && deleteConfirmOkLabel && deleteConfirmCancelLabel);
		const moreBtnRef = (0, import_react$8.useRef)(null);
		const moreMenuRef = (0, import_react$8.useRef)(null);
		const [menuPos, setMenuPos] = (0, import_react$8.useState)({
			top: 0,
			left: 0
		});
		const canShowMore = !disabled && Boolean(onEdit || onDelete);
		(0, import_react$8.useLayoutEffect)(() => {
			if (!moreOpen || !moreBtnRef.current) return;
			const rect = moreBtnRef.current.getBoundingClientRect();
			const left = rect.right + 6 + ESTIMATED_MENU_WIDTH > window.innerWidth - VIEWPORT_MARGIN ? Math.max(VIEWPORT_MARGIN, rect.left - ESTIMATED_MENU_WIDTH - 6) : rect.right + 6;
			const top = rect.top + ESTIMATED_MENU_HEIGHT > window.innerHeight - VIEWPORT_MARGIN ? Math.max(VIEWPORT_MARGIN, rect.bottom - ESTIMATED_MENU_HEIGHT) : rect.top;
			setMenuPos({
				top,
				left
			});
		}, [moreOpen]);
		(0, import_react$8.useEffect)(() => {
			if (!moreOpen) return;
			const onMouseDown = (event) => {
				const target = event.target;
				if (moreBtnRef.current?.contains(target) || moreMenuRef.current?.contains(target)) return;
				if (isOutsideCloseIgnored(target)) return;
				setMoreOpen(false);
				setConfirmingDelete(false);
			};
			const onKeyDown = (event) => {
				if (event.key === "Escape") {
					event.stopPropagation();
					setMoreOpen(false);
					setConfirmingDelete(false);
				}
			};
			document.addEventListener("mousedown", onMouseDown);
			document.addEventListener("keydown", onKeyDown, true);
			return () => {
				document.removeEventListener("mousedown", onMouseDown);
				document.removeEventListener("keydown", onKeyDown, true);
			};
		}, [moreOpen]);
		const handleMoreClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			setMoreOpen((prev) => !prev);
		};
		/** 「更多」菜单「编辑」：关掉菜单，把选项行原地切换成编辑面板（改名 + 改色） */
		const handleEditClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			setMoreOpen(false);
			setEditing(true);
		};
		/** 编辑面板提交：改名 + 改色一次性写回，成功/失败都退出编辑态 */
		const handleEditSubmit = async (nextText, nextStyle) => {
			try {
				if (onEdit) await Promise.resolve(onEdit(nextText, nextStyle));
			} catch (err) {
				console.warn("[TagOptionButton] edit option failed:", err);
			} finally {
				setEditing(false);
			}
		};
		/** 编辑面板即时提交：改名（防抖后）/ 改色即时写回，保持编辑态（可继续编辑） */
		const handleLiveCommit = async (nextText, nextStyle) => {
			if (!onEdit) return;
			try {
				await Promise.resolve(onEdit(nextText, nextStyle));
			} catch (err) {
				console.warn("[TagOptionButton] live commit failed:", err);
			}
		};
		const handleDeleteClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (!onDelete) return;
			if (hasDeleteConfirm) {
				setConfirmingDelete(true);
				return;
			}
			setMoreOpen(false);
			Promise.resolve(onDelete()).catch((err) => {
				console.warn("[TagOptionButton] delete option failed:", err);
			});
		};
		/** 二次确认「确认删除」：执行 onDelete，无论成败都关掉菜单 + 清 confirm 态 */
		const handleConfirmDelete = (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (!onDelete) return;
			const done = () => {
				setConfirmingDelete(false);
				setMoreOpen(false);
			};
			Promise.resolve(onDelete()).then(done).catch((err) => {
				console.warn("[TagOptionButton] delete option failed:", err);
				done();
			});
		};
		/** 二次确认「取消」：只关 confirm 面板，more-menu 保持打开可让用户改选「编辑」 */
		const handleCancelDelete = (event) => {
			event.preventDefault();
			event.stopPropagation();
			setConfirmingDelete(false);
		};
		const handleRowKeyDown = (event) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onToggle();
			}
		};
		if (editing) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(TagEditPanel, {
			initialText: text,
			editInitialText: displayText,
			initialStyle: style,
			selected,
			onSubmit: handleEditSubmit,
			onLiveCommit: handleLiveCommit,
			onCancel: () => setEditing(false)
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			role: "option",
			"aria-selected": selected,
			"aria-disabled": disabled,
			tabIndex: disabled ? -1 : 0,
			className: [
				"project-plan-panel__tags-option",
				selected ? "project-plan-panel__tags-option--active" : "",
				disabled ? "project-plan-panel__tags-option--disabled" : ""
			].filter(Boolean).join(" "),
			onClick: disabled ? void 0 : onToggle,
			onKeyDown: handleRowKeyDown,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: "project-plan-panel__tags-option-check",
					children: selected && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CheckIcon, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: "project-plan-panel__tags-option-chip",
					style: tagChipStyle(style),
					title: displayText ?? text,
					children: displayText ?? text
				}),
				canShowMore && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					ref: moreBtnRef,
					type: "button",
					className: "project-plan-panel__tags-option-more-btn",
					"aria-label": editLabel ?? deleteLabel ?? "",
					onClick: handleMoreClick,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(MoreIcon, {})
				}),
				moreOpen && canShowMore && (0, import_react_dom$4.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					ref: moreMenuRef,
					role: "menu",
					className: "wb-popover-compact project-plan-panel__tags-option-more-menu",
					style: {
						position: "fixed",
						top: menuPos.top,
						left: menuPos.left,
						zIndex: MORE_MENU_Z_INDEX
					},
					["data-outside-close-ignore"]: "",
					onClick: (event) => event.stopPropagation(),
					onMouseDown: (event) => event.stopPropagation(),
					children: confirmingDelete ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "project-plan-panel__tags-option-more-confirm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
								className: "project-plan-panel__tags-option-more-confirm-title",
								children: deleteConfirmTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
								className: "project-plan-panel__tags-option-more-confirm-desc",
								children: deleteConfirmDesc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: "project-plan-panel__tags-option-more-confirm-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
									type: "button",
									className: "project-plan-panel__tags-option-more-item",
									onClick: handleCancelDelete,
									children: deleteConfirmCancelLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
									type: "button",
									className: "project-plan-panel__tags-option-more-item project-plan-panel__tags-option-more-item--danger",
									onClick: handleConfirmDelete,
									children: deleteConfirmOkLabel
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [onEdit && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
						type: "button",
						role: "menuitem",
						className: "project-plan-panel__tags-option-more-item",
						onClick: handleEditClick,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(PencilIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: editLabel ?? "" })]
					}), onDelete && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
						type: "button",
						role: "menuitem",
						className: "project-plan-panel__tags-option-more-item project-plan-panel__tags-option-more-item--danger",
						onClick: handleDeleteClick,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(TrashIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: deleteLabel ?? "" })]
					})] })
				}), document.body)
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/floating-menu-pos.ts
/**
* 计算 fixed 浮层菜单在视口内的安全位置。
*
* @example
* ```tsx
* const rect = anchorRef.current.getBoundingClientRect();
* setMenuPos(computeFloatingMenuPos({ anchorRect: rect, minWidth: 220 }));
* // 渲染：style={{ position: 'fixed', top: pos.top, bottom: pos.bottom, left: pos.left, minWidth: pos.width }}
* ```
*/
function computeFloatingMenuPos({ anchorRect, minWidth = 220, estimatedMenuHeight = 320, gap = 4, forceUp = false }) {
	if (typeof window === "undefined") return {
		top: anchorRect.bottom + gap,
		left: anchorRect.left,
		width: Math.max(anchorRect.width, minWidth)
	};
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	const maxWidth = Math.max(viewportWidth - 24, 1);
	const width = Math.min(Math.max(anchorRect.width, minWidth), maxWidth);
	const maxLeft = Math.max(viewportWidth - width - VIEWPORT_PADDING, VIEWPORT_PADDING);
	let left = anchorRect.left;
	if (left + width > viewportWidth - VIEWPORT_PADDING) left = anchorRect.right - width;
	left = Math.min(Math.max(left, VIEWPORT_PADDING), maxLeft);
	const spaceBelow = viewportHeight - anchorRect.bottom - gap;
	const spaceAbove = anchorRect.top - gap;
	if (forceUp || spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow) return {
		bottom: viewportHeight - anchorRect.top + gap,
		left,
		width
	};
	return {
		top: anchorRect.bottom + gap,
		left,
		width
	};
}
var VIEWPORT_PADDING;
var init_floating_menu_pos = __esmMin((() => {
	VIEWPORT_PADDING = 12;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/use-floating-menu-pos.ts
/** 打开期间跟随视口变化重算的浮层菜单位置（fixed 视口坐标）。 */
function useFloatingMenuPos({ open, anchorRef, enabled = true, minWidth, gap, estimatedMenuHeight, forceUp, initialWidth = 0 }) {
	const [pos, setPos] = (0, import_react$7.useState)({
		top: 0,
		left: 0,
		width: initialWidth
	});
	(0, import_react$7.useLayoutEffect)(() => {
		if (!open || !enabled) return;
		const recompute = () => {
			const anchor = anchorRef.current;
			if (!anchor) return;
			setPos(computeFloatingMenuPos({
				anchorRect: anchor.getBoundingClientRect(),
				minWidth,
				gap,
				estimatedMenuHeight,
				forceUp
			}));
		};
		recompute();
		if (typeof window === "undefined") return;
		window.addEventListener("resize", recompute);
		window.addEventListener("orientationchange", recompute);
		const visualViewport = window.visualViewport ?? null;
		visualViewport?.addEventListener("resize", recompute);
		visualViewport?.addEventListener("scroll", recompute);
		return () => {
			window.removeEventListener("resize", recompute);
			window.removeEventListener("orientationchange", recompute);
			visualViewport?.removeEventListener("resize", recompute);
			visualViewport?.removeEventListener("scroll", recompute);
		};
	}, [
		open,
		enabled,
		anchorRef,
		minWidth,
		gap,
		estimatedMenuHeight,
		forceUp
	]);
	return pos;
}
var import_react$7;
var init_use_floating_menu_pos = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_floating_menu_pos();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-priority-picker.tsx
function isPriorityNoneOption(option) {
	return option.id === PRIORITY_NONE_OPTION_ID;
}
function buildPriorityNoneOption(label) {
	return {
		id: PRIORITY_NONE_OPTION_ID,
		text: "",
		label
	};
}
var import_react$6, import_react_dom$3, import_jsx_runtime$5, PRIORITY_NONE_OPTION_ID, ProjectPlanPriorityPicker;
var init_project_plan_priority_picker = __esmMin((() => {
	init_project_plan_priority_picker$1();
	init_src();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$3 = /* @__PURE__ */ __toESM(require_react_dom());
	init_hooks();
	init_useI18n();
	init_components();
	init_outside_close_ignore();
	init_priority_chip();
	init_tag_create_row();
	init_tag_option_button();
	init_use_floating_menu_pos();
	import_jsx_runtime$5 = require_jsx_runtime();
	PRIORITY_NONE_OPTION_ID = "__priority_none__";
	ProjectPlanPriorityPicker = ({ options, value, onChange, placeholder, disabled, onBeforeOpen, variant = "detail", trackId, trackName, onEditOption, onChangeOptionColor, onCreateOption, onDeleteOption, searchPlaceholder, emptyText, createLabel, editLabel, deleteLabel }) => {
		const t = useTranslation();
		const [open, setOpen] = (0, import_react$6.useState)(false);
		const [keyword, setKeyword] = (0, import_react$6.useState)("");
		const [creating, setCreating] = (0, import_react$6.useState)(false);
		const triggerRef = (0, import_react$6.useRef)(null);
		const inputRef = (0, import_react$6.useRef)(null);
		const menuRef = (0, import_react$6.useRef)(null);
		const menuPos = useFloatingMenuPos({
			open,
			anchorRef: triggerRef,
			minWidth: 140,
			initialWidth: 160
		});
		const menuZIndex = useFloatingLayer(open);
		(0, import_react$6.useEffect)(() => {
			if (!open) return;
			const onMouseDown = (event) => {
				const target = event.target;
				if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
				if (isOutsideCloseIgnored(event.target)) return;
				setOpen(false);
				setKeyword("");
			};
			const onKeyDown = (event) => {
				if (event.key === "Escape") {
					setOpen(false);
					setKeyword("");
				}
			};
			document.addEventListener("mousedown", onMouseDown);
			document.addEventListener("keydown", onKeyDown);
			return () => {
				document.removeEventListener("mousedown", onMouseDown);
				document.removeEventListener("keydown", onKeyDown);
			};
		}, [open]);
		(0, import_react$6.useEffect)(() => {
			if (open && onCreateOption) {
				const tid = setTimeout(() => inputRef.current?.focus(), 0);
				return () => clearTimeout(tid);
			}
		}, [open, onCreateOption]);
		const searchable = !!onCreateOption;
		const trimmedKeyword = keyword.trim();
		const lowerKeyword = trimmedKeyword.toLowerCase();
		const filteredOptions = (0, import_react$6.useMemo)(() => {
			if (!lowerKeyword) return options;
			return options.filter((opt) => (opt.label ?? opt.text).toLowerCase().includes(lowerKeyword) || opt.text.toLowerCase().includes(lowerKeyword));
		}, [lowerKeyword, options]);
		const canCreateNew = trimmedKeyword.length > 0 && !options.some((opt) => opt.text === trimmedKeyword);
		const noOptions = options.length === 0;
		const isDisabled = disabled || noOptions && !searchable;
		const currentOption = value ? options.find((opt) => opt.id === value) : void 0;
		const hasValue = !!currentOption;
		const triggerLabel = currentOption?.label ?? currentOption?.text ?? placeholder ?? "";
		const triggerClassName = variant === "create" ? "project-plan-panel__priority-picker-trigger project-plan-panel__priority-picker-trigger--create" : "project-plan-panel__field-picker project-plan-panel__priority-picker-trigger";
		const textClassName = [
			"project-plan-panel__priority-picker-text",
			!hasValue && variant === "create" ? "project-plan-panel__create-chip-placeholder" : "",
			!hasValue ? "project-plan-panel__priority-picker-text--placeholder" : ""
		].filter(Boolean).join(" ");
		const handleTriggerClick = () => {
			if (isDisabled) return;
			if (!open) onBeforeOpen?.();
			setOpen((prev) => !prev);
		};
		const noneOption = buildPriorityNoneOption(t("collab.plan.detail.priority.none"));
		const handleSelect = (option) => {
			setOpen(false);
			setKeyword("");
			if (isPriorityNoneOption(option)) {
				onChange(null);
				return;
			}
			if (option.id === value) return;
			onChange(option);
		};
		/** 「新建」行：带草稿色创建优先级选项，成功后自动选中并关闭下拉 */
		const handleCreate = async (style) => {
			if (!onCreateOption || !canCreateNew || creating) return;
			setCreating(true);
			try {
				const created = await onCreateOption(trimmedKeyword, style);
				if (created) {
					onChange(created);
					setKeyword("");
					setOpen(false);
				}
			} catch (err) {
				console.warn("[ProjectPlanPriorityPicker] create option failed:", err);
				message.error(t("collab.plan.detail.optionCreateFailed"));
			} finally {
				setCreating(false);
			}
		};
		/**
		* 「更多」菜单「编辑」：改名 + 改色一次性写回（对齐标签）。改的是选项 text/style，
		* optionId 不变；若改的正是当前选中项，selected chip 会随 options 刷新自动更新展示，
		* 无需手动改 value（value 存的是 optionId）。
		*/
		const handleEditOption = async (option, nextText, nextStyle) => {
			try {
				if (onEditOption) await Promise.resolve(onEditOption(option.id, nextText, nextStyle));
				else if (onChangeOptionColor && nextStyle !== void 0) await Promise.resolve(onChangeOptionColor(option.id, nextText, nextStyle));
			} catch (err) {
				console.warn("[ProjectPlanPriorityPicker] edit option failed:", err);
				message.error(t("collab.plan.detail.optionEditFailed"));
			}
		};
		/** 「更多」菜单「删除」：删除优先级选项；若删的正是当前选中项，同步清空选中 */
		const handleDeleteOption = async (option) => {
			if (!onDeleteOption) return;
			try {
				await Promise.resolve(onDeleteOption(option));
				if (option.id === value) onChange(null);
			} catch (err) {
				console.warn("[ProjectPlanPriorityPicker] delete option failed:", err);
				message.error(t("collab.plan.detail.optionDeleteFailed"));
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
			ref: triggerRef,
			type: "button",
			className: triggerClassName,
			"aria-expanded": open,
			"aria-haspopup": "listbox",
			disabled: isDisabled,
			onClick: handleTriggerClick,
			"data-track-id": trackId,
			"data-track-name": trackName,
			children: [hasValue ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PriorityChip, {
				label: triggerLabel,
				style: currentOption?.style
			}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: textClassName,
				children: placeholder ?? ""
			}), !isDisabled && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "project-plan-panel__status-chevron",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ChevronDownIcon, {})
			})]
		}), open && (0, import_react_dom$3.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			ref: menuRef,
			role: "listbox",
			className: "wb-popover-compact project-plan-panel__priority-menu",
			style: {
				position: "fixed",
				top: menuPos.top,
				bottom: menuPos.bottom,
				left: menuPos.left,
				minWidth: menuPos.width,
				zIndex: menuZIndex
			},
			children: [
				searchable && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "project-plan-panel__tags-search",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("input", {
						ref: inputRef,
						type: "search",
						value: keyword,
						placeholder: searchPlaceholder ?? "",
						autoComplete: "off",
						onChange: (event) => setKeyword(event.target.value),
						onKeyDown: (event) => {
							if (event.key === "Enter" && canCreateNew && !creating) {
								event.preventDefault();
								handleCreate();
							}
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "project-plan-panel__tags-list",
					children: [
						!trimmedKeyword && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							role: "option",
							"aria-selected": !hasValue,
							tabIndex: 0,
							className: ["project-plan-panel__tags-option", !hasValue ? "project-plan-panel__tags-option--active" : ""].filter(Boolean).join(" "),
							onClick: () => handleSelect(noneOption),
							onKeyDown: (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									handleSelect(noneOption);
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "project-plan-panel__tags-option-check",
								children: !hasValue && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(CheckIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "project-plan-panel__priority-none-text",
								children: noneOption.label
							})]
						}),
						filteredOptions.map((option) => {
							const active = option.id === value;
							const canEdit = !!onEditOption || !!onChangeOptionColor;
							return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TagOptionButton, {
								text: option.text,
								displayText: option.label ?? option.text,
								style: option.style,
								selected: active,
								onToggle: () => handleSelect(option),
								onEdit: canEdit ? (nextText, nextStyle) => handleEditOption(option, nextText, nextStyle) : void 0,
								onDelete: onDeleteOption ? () => handleDeleteOption(option) : void 0,
								editLabel,
								deleteLabel,
								deleteConfirmTitle: t("collab.plan.detail.optionDeleteConfirmTitle"),
								deleteConfirmDesc: t("collab.plan.detail.optionDeleteConfirmDesc"),
								deleteConfirmOkLabel: t("collab.plan.detail.optionDeleteConfirmOk"),
								deleteConfirmCancelLabel: t("collab.plan.detail.optionDeleteConfirmCancel")
							}, option.id || option.text);
						}),
						searchable && filteredOptions.length === 0 && !canCreateNew && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
							className: "project-plan-panel__tags-empty",
							children: emptyText ?? ""
						})
					]
				}),
				searchable && canCreateNew && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TagCreateRow, {
					keyword: trimmedKeyword,
					label: createLabel,
					creating,
					onCreate: handleCreate
				})
			]
		}), document.body)] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-status-picker.less
var init_project_plan_status_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/todo/wb-todo-status-complete.svg
var wb_todo_status_complete_default;
var init_wb_todo_status_complete = __esmMin((() => {
	wb_todo_status_complete_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cpath%20fill='%2300C29A'%20transform='matrix(1%200%200%201%201%201)'%20d='M11.9497%202.0503C13.3166%203.4171%2014%205.067%2014%207C14%208.933%2013.3166%2010.5829%2011.9497%2011.9497C10.5829%2013.3166%208.933%2014%207%2014C5.067%2014%203.4171%2013.3166%202.0503%2011.9497C0.6834%2010.5829%200%208.933%200%207C0%205.067%200.6834%203.4171%202.0503%202.0503C3.4171%200.6834%205.067%200%207%200C8.933%200%2010.5829%200.6834%2011.9497%202.0503ZM7%201C5.3431%201%203.9289%201.5858%202.7574%202.7574C1.5858%203.9289%201%205.3431%201%207C1%208.6569%201.5858%2010.0711%202.7574%2011.2426C3.9289%2012.4142%205.3431%2013%207%2013C8.6569%2013%2010.0711%2012.4142%2011.2426%2011.2426C12.4142%2010.0711%2013%208.6569%2013%207C13%205.3431%2012.4142%203.9289%2011.2426%202.7574C10.0711%201.5858%208.6569%201%207%201ZM10.5356%204.7929L6.2929%209.0355L5.9394%209.3891L3.4645%206.9142C3.3628%206.8182%203.314%206.7004%203.3181%206.5607C3.314%206.4209%203.3628%206.3031%203.4645%206.2071C3.5604%206.1055%203.6783%206.0566%203.818%206.0607C3.9578%206.0566%204.0756%206.1055%204.1716%206.2071L5.9394%207.9749L9.8284%204.0858Q9.9724%203.9333%2010.182%203.9393C10.3217%203.9353%2010.4396%203.9841%2010.5356%204.0858C10.6372%204.1818%2010.686%204.2996%2010.682%204.4393C10.686%204.5791%2010.6372%204.6969%2010.5356%204.7929Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/todo/wb-todo-status-inprogress.svg
var wb_todo_status_inprogress_default;
var init_wb_todo_status_inprogress = __esmMin((() => {
	wb_todo_status_inprogress_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cpath%20fill='%231E6FFF'%20transform='matrix(1%200%200%201%201%201)'%20d='M14%207C14%205.067%2013.3166%203.4171%2011.9497%202.0503C10.5829%200.6834%208.933%200%207%200C5.067%200%203.4171%200.6834%202.0503%202.0503C0.6834%203.4171%200%205.067%200%207C0%208.933%200.6834%2010.5829%202.0503%2011.9497C3.4171%2013.3166%205.067%2014%207%2014C8.933%2014%2010.5829%2013.3166%2011.9497%2011.9497C13.3166%2010.5829%2014%208.933%2014%207ZM2.7574%202.7574C3.9289%201.5858%205.3431%201%207%201C8.6569%201%2010.0711%201.5858%2011.2426%202.7574C12.4142%203.9289%2013%205.3431%2013%207C13%208.6569%2012.4142%2010.0711%2011.2426%2011.2426C10.0711%2012.4142%208.6569%2013%207%2013C5.3431%2013%203.9289%2012.4142%202.7574%2011.2426C1.5858%2010.0711%201%208.6569%201%207C1%205.3431%201.5858%203.9289%202.7574%202.7574Z'%20fill-rule='evenodd'/%3e%3cpath%20fill='%231E6FFF'%20transform='matrix(1%200%200%201%208%204)'%20d='M4%204C4%206.2091%202.2091%208%200%208L0%200C2.2091%200%204%201.7909%204%204Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/todo/wb-todo-status-pause.svg
var wb_todo_status_pause_default;
var init_wb_todo_status_pause = __esmMin((() => {
	wb_todo_status_pause_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cpath%20fill='%23E37318'%20transform='matrix(1%200%200%201%201%201)'%20d='M14%207C14%205.067%2013.3166%203.4171%2011.9497%202.0503C10.5829%200.6834%208.933%200%207%200C5.067%200%203.4171%200.6834%202.0503%202.0503C0.6834%203.4171%200%205.067%200%207C0%208.933%200.6834%2010.5829%202.0503%2011.9497C3.4171%2013.3166%205.067%2014%207%2014C8.933%2014%2010.5829%2013.3166%2011.9497%2011.9497C13.3166%2010.5829%2014%208.933%2014%207ZM2.7574%202.7574C3.9289%201.5858%205.3431%201%207%201C8.6569%201%2010.0711%201.5858%2011.2426%202.7574C12.4142%203.9289%2013%205.3431%2013%207C13%208.6569%2012.4142%2010.0711%2011.2426%2011.2426C10.0711%2012.4142%208.6569%2013%207%2013C5.3431%2013%203.9289%2012.4142%202.7574%2011.2426C1.5858%2010.0711%201%208.6569%201%207C1%205.3431%201.5858%203.9289%202.7574%202.7574Z'%20fill-rule='evenodd'/%3e%3ccircle%20fill='%23E37318'%20transform='matrix(1%200%200%201%204%204)'%20cx='4'%20cy='4'%20r='4'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/todo/wb-todo-status-unstart.svg
var wb_todo_status_unstart_default;
var init_wb_todo_status_unstart = __esmMin((() => {
	wb_todo_status_unstart_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%201%201)'%20d='M2.7482%201.4392C2.9902%201.2542%203.2431%201.0857%203.507%200.9338C3.771%200.7818%204.0437%200.6476%204.3251%200.5312L4.7072%201.4554C4.2227%201.6557%203.7722%201.9151%203.3556%202.2336L2.7482%201.4392ZM0.5312%204.3251C0.6476%204.0437%200.7818%203.771%200.9338%203.507C1.0857%203.2431%201.2542%202.9902%201.4392%202.7482L2.2336%203.3556C1.9151%203.7722%201.6557%204.2227%201.4554%204.7072L0.5312%204.3251ZM0.0553%207.8779C0.0369%207.7323%200.023%207.5863%200.0138%207.4398C0.0046%207.2933%20-0%207.1467%200%207C0%206.8533%200.0046%206.7067%200.0138%206.5602C0.023%206.4137%200.0369%206.2677%200.0553%206.1221L1.0474%206.2476C1.0158%206.4974%201%206.7482%201%207C1%207.2518%201.0158%207.5026%201.0474%207.7524L0.0553%207.8779ZM1.4392%2011.2518C1.2542%2011.0098%201.0857%2010.7569%200.9338%2010.493C0.7818%2010.229%200.6476%209.9563%200.5312%209.6749L1.4554%209.2928C1.6557%209.7773%201.9151%2010.2278%202.2336%2010.6444L1.4392%2011.2518ZM4.3251%2013.4688C4.0437%2013.3524%203.771%2013.2182%203.507%2013.0662C3.2431%2012.9143%202.9902%2012.7458%202.7482%2012.5608L3.3556%2011.7664C3.7722%2012.0849%204.2227%2012.3443%204.7072%2012.5446L4.3251%2013.4688ZM7.8779%2013.9447C7.7323%2013.9631%207.5863%2013.977%207.4398%2013.9862C7.2933%2013.9954%207.1467%2014%207%2014C6.8533%2014%206.7067%2013.9954%206.5602%2013.9862C6.4137%2013.977%206.2677%2013.9631%206.1221%2013.9447L6.2476%2012.9526C6.4974%2012.9842%206.7482%2013%207%2013C7.2518%2013%207.5026%2012.9842%207.7524%2012.9526L7.8779%2013.9447ZM11.2518%2012.5608C11.0098%2012.7458%2010.7569%2012.9143%2010.493%2013.0662C10.229%2013.2182%209.9563%2013.3524%209.6749%2013.4688L9.2928%2012.5446C9.7773%2012.3443%2010.2278%2012.0849%2010.6444%2011.7664L11.2518%2012.5608ZM13.4688%209.6749C13.3524%209.9563%2013.2182%2010.229%2013.0662%2010.493C12.9143%2010.7569%2012.7458%2011.0098%2012.5608%2011.2518L11.7664%2010.6444C12.0849%2010.2278%2012.3443%209.7773%2012.5446%209.2928L13.4688%209.6749ZM13.9447%206.1221C13.9631%206.2677%2013.977%206.4137%2013.9862%206.5602C13.9954%206.7067%2014%206.8533%2014%207C14%207.1467%2013.9954%207.2933%2013.9862%207.4398C13.977%207.5863%2013.9631%207.7323%2013.9447%207.8779L12.9526%207.7524C12.9842%207.5026%2013%207.2518%2013%207C13%206.7482%2012.9842%206.4974%2012.9526%206.2476L13.9447%206.1221ZM12.5608%202.7482C12.7458%202.9902%2012.9143%203.2431%2013.0662%203.507C13.2182%203.771%2013.3524%204.0437%2013.4688%204.3251L12.5446%204.7072C12.3443%204.2227%2012.0849%203.7722%2011.7664%203.3556L12.5608%202.7482ZM9.6749%200.5312C9.9563%200.6476%2010.229%200.7818%2010.493%200.9338C10.7569%201.0857%2011.0098%201.2542%2011.2518%201.4392L10.6444%202.2336C10.2278%201.9151%209.7773%201.6557%209.2928%201.4554L9.6749%200.5312ZM7.8779%200.0553L7.7524%201.0474C7.5026%201.0158%207.2518%201%207%201C6.7482%201%206.4974%201.0158%206.2476%201.0474L6.1221%200.0553C6.2677%200.0369%206.4137%200.023%206.5602%200.0138C6.7067%200.0046%206.8533%20-0%207%200C7.1467%200%207.2933%200.0046%207.4398%200.0138C7.5863%200.023%207.7323%200.0369%207.8779%200.0553Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/plan-status-icons.tsx
/** 状态 picker / cell-editor 用的外部 SVG 资产；pending 单色黑走 themable 反色适配暗黑。 */
function getStatusIconAsset(type) {
	if (type === "in_progress") return { url: wb_todo_status_inprogress_default };
	if (type === "completed") return { url: wb_todo_status_complete_default };
	if (type === "paused") return { url: wb_todo_status_pause_default };
	return {
		url: wb_todo_status_unstart_default,
		themable: true
	};
}
var import_jsx_runtime$4, STATUS_ICON_COLORS, PlanStatusIcon;
var init_plan_status_icons = __esmMin((() => {
	require_react();
	init_wb_todo_status_complete();
	init_wb_todo_status_inprogress();
	init_wb_todo_status_pause();
	init_wb_todo_status_unstart();
	import_jsx_runtime$4 = require_jsx_runtime();
	STATUS_ICON_COLORS = {
		pending: "var(--wb-color-text-tertiary)",
		in_progress: "#1E6FFF",
		paused: "#E47318",
		completed: "#00C29A"
	};
	PlanStatusIcon = ({ type, className }) => {
		const color = STATUS_ICON_COLORS[type] ?? "var(--wb-color-text-tertiary)";
		switch (type) {
			case "in_progress": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
				className,
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
					cx: "7",
					cy: "7",
					r: "6.125",
					stroke: color,
					strokeWidth: "1.25"
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("ellipse", {
					cx: "8.75",
					cy: "7",
					rx: "1.75",
					ry: "3.5",
					fill: color
				})]
			});
			case "paused": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
				className,
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
					cx: "7",
					cy: "7",
					r: "6.125",
					stroke: color,
					strokeWidth: "1.25"
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
					cx: "7",
					cy: "7",
					r: "2.5",
					fill: color
				})]
			});
			case "completed": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
				className,
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
					cx: "7",
					cy: "7",
					r: "6.125",
					stroke: color,
					strokeWidth: "1.25"
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
					d: "M4.3 7l2.3 2.3 4.4-4.4",
					stroke: color,
					strokeWidth: "1.25",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
				className,
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
					cx: "7",
					cy: "7",
					r: "6.125",
					stroke: color,
					strokeWidth: "1.25",
					strokeDasharray: "2 2"
				})
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/detail-modal/project-plan-detail-utils.ts
var STATUS_OPTIONS;
var init_project_plan_detail_utils = __esmMin((() => {
	init_project_plan_helpers();
	STATUS_OPTIONS = [
		{
			type: "pending",
			label: "collab.plan.status.label.pending",
			tone: "pending"
		},
		{
			type: "in_progress",
			label: "collab.plan.status.label.in_progress",
			tone: "in-progress"
		},
		{
			type: "paused",
			label: "collab.plan.status.shortLabel.paused",
			tone: "paused"
		},
		{
			type: "completed",
			label: "collab.plan.status.shortLabel.completed",
			tone: "completed"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-status-picker.tsx
function toStatus(status) {
	return {
		id: status.id,
		name: status.name,
		type: status.type
	};
}
function getStatusKey(status) {
	return status.type === "custom" ? status.id || status.name : String(status.type);
}
function getStatusTone(type) {
	return String(type).replace(/_/g, "-");
}
function getStatusLabel(status, t) {
	const fixedOption = STATUS_OPTIONS.find((option) => option.type === status.type);
	if (fixedOption && status.type !== "custom") return t(fixedOption.label);
	if (status.name.startsWith("collab.")) return t(status.name);
	return status.name || (fixedOption ? t(fixedOption.label) : String(status.type));
}
function buildDefaultStatusPickerStatuses() {
	return STATUS_OPTIONS.map((option) => ({
		id: option.type,
		name: option.label,
		type: option.type
	}));
}
/**
* 状态菜单选项列表（带状态图标 + 彩色文案）。
*
* 抽离自 ProjectPlanStatusPicker，供详情弹窗侧栏状态菜单与子待办行内菜单共用，
* 保证两处的图标 / 文案 / 高亮态完全一致（#56172 后续统一）。
* 仅渲染 `<button>` 列表，容器 chrome（定位 / 边框 / 阴影）由调用方各自负责。
*/
function ProjectPlanStatusMenuOptions({ statuses, selectedStatus, onSelect }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_jsx_runtime$3.Fragment, { children: statuses.map((status) => {
		const active = status.id ? status.id === selectedStatus.id : status.type === selectedStatus.type;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
			type: "button",
			className: [
				"project-plan-panel__status-option",
				`project-plan-panel__status-option--${getStatusTone(status.type)}`,
				active ? "project-plan-panel__status-option--active" : ""
			].filter(Boolean).join(" "),
			onClick: () => onSelect(status),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Icon, {
				className: "project-plan-panel__status-icon",
				component: getStatusIconAsset(status.type),
				size: 16
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: getStatusLabel(status, t) })]
		}, status.id || status.type);
	}) });
}
function mergeProjectPlanStatusOptions(currentStatus, ...groups) {
	const sourceGroups = groups.some((group) => group && group.length > 0) ? groups : [buildDefaultStatusPickerStatuses()];
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	const append = (status) => {
		if (!status) return;
		const key = getStatusKey(status);
		if (seen.has(key)) return;
		seen.add(key);
		result.push(toStatus(status));
	};
	sourceGroups.forEach((group) => group?.forEach(append));
	append(currentStatus);
	return result.length > 0 ? result : buildDefaultStatusPickerStatuses();
}
var import_react$4, import_react_dom$2, import_jsx_runtime$3, ProjectPlanStatusPicker;
var init_project_plan_status_picker = __esmMin((() => {
	init_project_plan_status_picker$1();
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_components();
	init_plan_status_icons();
	init_project_plan_detail_utils();
	init_use_floating_menu_pos();
	import_jsx_runtime$3 = require_jsx_runtime();
	ProjectPlanStatusPicker = ({ selectedStatus, statuses, onSelect, onBeforeOpen, disabled, menuPlacement = "bottom", triggerLabel, usePortal = false }) => {
		const t = useTranslation();
		const [open, setOpen] = (0, import_react$4.useState)(false);
		const pickerRef = (0, import_react$4.useRef)(null);
		const triggerRef = (0, import_react$4.useRef)(null);
		/** Portal 模式下菜单已脱离 pickerRef，单独的 ref 给 outside-click 检测用 */
		const menuRef = (0, import_react$4.useRef)(null);
		/**
		* Portal 模式下的菜单位置（视口坐标）；非 portal 时不用。
		* 打开时按 trigger 实时计算（窄视口下水平位置收敛到视口内、下方空间不足时向上展开，
		* 见 floating-menu-pos；width 仅作水平收敛参考，菜单宽度仍由内容决定），并在打开期间
		* 跟随视口变化重算（移动端软键盘 / 旋屏 / 容器尺寸变化，见 use-floating-menu-pos）。
		*/
		const portalPos = useFloatingMenuPos({
			open,
			anchorRef: triggerRef,
			enabled: usePortal,
			minWidth: 160,
			forceUp: menuPlacement === "top"
		});
		(0, import_react$4.useEffect)(() => {
			if (!open) return;
			const handleMouseDown = (event) => {
				const target = event.target;
				const inPicker = pickerRef.current?.contains(target);
				const inMenu = usePortal && menuRef.current?.contains(target);
				if (!inPicker && !inMenu) setOpen(false);
			};
			document.addEventListener("mousedown", handleMouseDown);
			return () => document.removeEventListener("mousedown", handleMouseDown);
		}, [open, usePortal]);
		const handleTriggerClick = () => {
			if (disabled) return;
			if (!open) onBeforeOpen?.();
			setOpen((prev) => !prev);
		};
		const handleSelect = (status) => {
			setOpen(false);
			onSelect(status);
		};
		/** 非 portal 模式下的菜单 inline 样式（仅处理向上弹出） */
		const inlineMenuStyle = !usePortal && menuPlacement === "top" ? {
			top: "auto",
			right: "auto",
			bottom: "calc(100% + var(--wb-spacing-1, 4px))",
			left: 0
		} : void 0;
		/** Portal 模式下的视口 fixed 定位（不含 width——菜单宽度由内容决定，width 仅供水平收敛参考） */
		const portalMenuStyle = {
			position: "fixed",
			top: portalPos.top,
			bottom: portalPos.bottom,
			left: portalPos.left
		};
		const menuContent = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			ref: menuRef,
			className: "wb-popover-compact project-plan-panel__status-menu",
			style: usePortal ? portalMenuStyle : inlineMenuStyle,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ProjectPlanStatusMenuOptions, {
				statuses,
				selectedStatus,
				onSelect: handleSelect
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "project-plan-panel__status-picker",
			ref: pickerRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
				ref: triggerRef,
				type: "button",
				className: `project-plan-panel__status-trigger project-plan-panel__status-trigger--${selectedStatus.type}`,
				"aria-expanded": open,
				disabled,
				onClick: handleTriggerClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Icon, {
						className: "project-plan-panel__status-icon",
						component: getStatusIconAsset(selectedStatus.type),
						size: 16
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: triggerLabel ?? getStatusLabel(selectedStatus, t) }),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "project-plan-panel__status-chevron",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ChevronDownIcon, {})
					})
				]
			}), open && (usePortal ? (0, import_react_dom$2.createPortal)(menuContent, document.body) : menuContent)]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-tags-picker.less
var init_project_plan_tags_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/format-tags-display.ts
/** 单个标签名截断：超过 15 字符 → 前 12 字 + `…` */
function truncateTagLabel(text) {
	if (text.length <= TAG_LABEL_MAX_LEN) return text;
	return `${text.slice(0, TAG_LABEL_TRUNCATE_LEN)}…`;
}
/** 将标签数组格式化为动态/摘要文案：`A、B、C +2`（分隔符可按语种覆盖） */
function summarizeTagsForDisplay(tags, separator = "、") {
	if (tags.length === 0) return "";
	const visible = tags.slice(0, 5).map(truncateTagLabel);
	const hiddenCount = tags.length - visible.length;
	const summary = visible.join(separator);
	return hiddenCount > 0 ? `${summary} +${hiddenCount}` : summary;
}
/** 解析 todoHistory tags 字段（JSON 数组字符串）为标签文本数组 */
function parseTagsHistoryValue(raw) {
	const trimmed = raw?.trim() ?? "";
	if (!trimmed || trimmed === "[]") return [];
	try {
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) return parsed.map((item) => String(item)).filter(Boolean);
	} catch {}
	return [trimmed];
}
/**
* 将 tags history 值转为动态展示文案；空值 → emptyLabel（默认「无」）。
* @param emptyLabel 无标签时的占位文案（i18n 由调用方注入）
* @param separator 多标签分隔符（i18n 由调用方注入，默认中文顿号）
*/
function formatTagsHistoryDisplay(raw, emptyLabel = "无", separator = "、") {
	const tags = parseTagsHistoryValue(raw);
	if (tags.length === 0) return emptyLabel;
	return summarizeTagsForDisplay(tags, separator);
}
var TAG_LABEL_MAX_LEN, TAG_LABEL_TRUNCATE_LEN;
var init_format_tags_display = __esmMin((() => {
	TAG_LABEL_MAX_LEN = 15;
	TAG_LABEL_TRUNCATE_LEN = 12;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/pickers/project-plan-tags-picker.tsx
var import_react$3, import_react_dom$1, import_jsx_runtime$2, ProjectPlanTagsPicker;
var init_project_plan_tags_picker = __esmMin((() => {
	init_project_plan_tags_picker$1();
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_hooks();
	init_useI18n();
	init_components();
	init_outside_close_ignore();
	init_format_tags_display();
	init_tag_color();
	init_tag_create_row();
	init_tag_option_button();
	init_use_floating_menu_pos();
	import_jsx_runtime$2 = require_jsx_runtime();
	ProjectPlanTagsPicker = ({ options, value, onSubmit, onCreateOption, onEditOption, onDeleteOption, placeholder, disabled, onBeforeOpen, searchPlaceholder, emptyText, createTagLabel, editTagLabel, deleteTagLabel, deleteConfirmTitle, deleteConfirmDesc, deleteConfirmOkLabel, deleteConfirmCancelLabel, variant = "detail" }) => {
		const t = useTranslation();
		const resolvedDeleteConfirmTitle = deleteConfirmTitle ?? t("collab.plan.detail.optionDeleteConfirmTitle");
		const resolvedDeleteConfirmDesc = deleteConfirmDesc ?? t("collab.plan.detail.optionDeleteConfirmDesc");
		const resolvedDeleteConfirmOkLabel = deleteConfirmOkLabel ?? t("collab.plan.detail.optionDeleteConfirmOk");
		const resolvedDeleteConfirmCancelLabel = deleteConfirmCancelLabel ?? t("collab.plan.detail.optionDeleteConfirmCancel");
		const [open, setOpen] = (0, import_react$3.useState)(false);
		const [keyword, setKeyword] = (0, import_react$3.useState)("");
		const [creating, setCreating] = (0, import_react$3.useState)(false);
		/**
		* 只读态（外部数据源）下，点击 `+n` 折叠 chip 展开查看全部标签——纯视觉展开，
		* 不打开可选择的下拉菜单。非只读态不使用该状态，`+n` 仍走 handleOpen 打开下拉。
		*/
		const [expandedHiddenTags, setExpandedHiddenTags] = (0, import_react$3.useState)(false);
		const anchorRef = (0, import_react$3.useRef)(null);
		const menuRef = (0, import_react$3.useRef)(null);
		const inputRef = (0, import_react$3.useRef)(null);
		const menuPos = useFloatingMenuPos({
			open,
			anchorRef,
			minWidth: 220,
			initialWidth: 220
		});
		const menuZIndex = useFloatingLayer(open);
		const [pendingValue, setPendingValue] = (0, import_react$3.useState)(null);
		const submitChainRef = (0, import_react$3.useRef)(Promise.resolve());
		const inFlightCountRef = (0, import_react$3.useRef)(0);
		const displayValue = pendingValue ?? value;
		const displayValueRef = (0, import_react$3.useRef)(displayValue);
		(0, import_react$3.useEffect)(() => {
			displayValueRef.current = displayValue;
		}, [displayValue]);
		const enqueueSubmit = (0, import_react$3.useCallback)((compute) => {
			const optimistic = compute(displayValueRef.current);
			setPendingValue(optimistic);
			displayValueRef.current = optimistic;
			inFlightCountRef.current += 1;
			submitChainRef.current = submitChainRef.current.then(async () => {
				try {
					await Promise.resolve(onSubmit(optimistic));
				} catch (err) {
					console.warn("[ProjectPlanTagsPicker] submit failed:", err);
					message.error(t("collab.plan.cell.tags.updateFailed"));
				} finally {
					inFlightCountRef.current -= 1;
					if (inFlightCountRef.current === 0) setPendingValue(null);
				}
			});
		}, [onSubmit, t]);
		(0, import_react$3.useEffect)(() => {
			if (inFlightCountRef.current === 0) displayValueRef.current = value;
		}, [value]);
		(0, import_react$3.useEffect)(() => {
			if (!open) return;
			const onMouseDown = (event) => {
				const target = event.target;
				if (anchorRef.current?.contains(target) || menuRef.current?.contains(target) || isOutsideCloseIgnored(target)) return;
				setOpen(false);
				setKeyword("");
			};
			const onKeyDown = (event) => {
				if (event.key === "Escape") {
					setOpen(false);
					setKeyword("");
				}
			};
			document.addEventListener("mousedown", onMouseDown);
			document.addEventListener("keydown", onKeyDown);
			return () => {
				document.removeEventListener("mousedown", onMouseDown);
				document.removeEventListener("keydown", onKeyDown);
			};
		}, [open]);
		(0, import_react$3.useEffect)(() => {
			if (open) {
				const tid = setTimeout(() => inputRef.current?.focus(), 0);
				return () => clearTimeout(tid);
			}
		}, [open]);
		const trimmedKeyword = keyword.trim();
		const lowerKeyword = trimmedKeyword.toLowerCase();
		const filteredOptions = (0, import_react$3.useMemo)(() => {
			if (!lowerKeyword) return options;
			return options.filter((opt) => opt.text.toLowerCase().includes(lowerKeyword));
		}, [lowerKeyword, options]);
		const styleByText = (0, import_react$3.useMemo)(() => buildTagStyleByText(options), [options]);
		const canCreateNew = trimmedKeyword.length > 0 && !options.some((opt) => opt.text === trimmedKeyword);
		const handleOpen = () => {
			if (disabled) return;
			if (open) {
				setOpen(false);
				setKeyword("");
				return;
			}
			onBeforeOpen?.();
			setOpen(true);
		};
		const handleToggle = (option) => {
			enqueueSubmit((base) => base.includes(option.text) ? base.filter((t) => t !== option.text) : [...base, option.text]);
		};
		const handleCreate = async (style) => {
			if (!canCreateNew || creating) return;
			setCreating(true);
			try {
				const created = await onCreateOption(trimmedKeyword, style);
				if (created) {
					enqueueSubmit((base) => base.includes(created.text) ? base : [...base, created.text]);
					setKeyword("");
					setOpen(false);
				}
			} catch (err) {
				console.warn("[ProjectPlanTagsPicker] create option failed:", err);
				message.error(t("collab.plan.detail.optionCreateFailed"));
			} finally {
				setCreating(false);
			}
		};
		/** 「更多」菜单「编辑」：改名 + 改背景色，成功后同步把本地显示值切到新文本 */
		const handleEditOption = async (option, nextText, nextStyle) => {
			if (!onEditOption) return;
			try {
				await Promise.resolve(onEditOption(option, nextText, nextStyle));
				enqueueSubmit((base) => base.map((t) => t === option.text ? nextText : t));
			} catch (err) {
				console.warn("[ProjectPlanTagsPicker] edit option failed:", err);
				message.error(t("collab.plan.detail.optionEditFailed"));
			}
		};
		/** 「更多」菜单「删除」：删除标签选项，删除成功由上层 notify 触发 options 刷新 */
		const handleDeleteOption = async (option) => {
			if (!onDeleteOption) return;
			try {
				await Promise.resolve(onDeleteOption(option));
				enqueueSubmit((base) => base.filter((t) => t !== option.text));
			} catch (err) {
				console.warn("[ProjectPlanTagsPicker] delete option failed:", err);
				message.error(t("collab.plan.detail.optionDeleteFailed"));
			}
		};
		const isEmpty = displayValue.length === 0;
		const useNewUi = variant === "detail";
		const showAllTags = disabled && expandedHiddenTags;
		const visibleTags = showAllTags ? displayValue : displayValue.slice(0, 5);
		const hiddenTags = showAllTags ? [] : displayValue.slice(5);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			ref: anchorRef,
			className: useNewUi ? "project-plan-panel__tags-area" : "",
			style: useNewUi ? void 0 : {
				display: "inline-flex",
				alignItems: "center"
			},
			children: useNewUi && isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
				type: "button",
				className: "project-plan-panel__field-picker project-plan-panel__tags-picker-trigger",
				"aria-expanded": open,
				"aria-haspopup": "listbox",
				disabled,
				onClick: handleOpen,
				"data-track-id": "collab_plan_todo_label_entry",
				"data-track-name": "待办标签入口",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: ["project-plan-panel__tags-picker-text", "project-plan-panel__tags-picker-text--placeholder"].join(" "),
					children: placeholder ?? ""
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "project-plan-panel__status-chevron",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChevronDownIcon, {})
				})]
			}) : useNewUi ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
				visibleTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					className: "project-plan-panel__tags-chip",
					disabled,
					title: tag,
					style: tagChipStyle(styleByText.get(tag)),
					onClick: handleOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "project-plan-panel__tags-chip-text",
						children: tag
					})
				}, tag)),
				hiddenTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					className: "project-plan-panel__tags-chip project-plan-panel__tags-chip--more",
					title: hiddenTags.join(", "),
					onClick: disabled ? () => setExpandedHiddenTags(true) : handleOpen,
					children: `+${hiddenTags.length}`
				}),
				!disabled && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					className: "project-plan-panel__tags-add-btn",
					onClick: handleOpen,
					"aria-label": placeholder ?? "Add tag",
					children: "+"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
				type: "button",
				className: "project-plan-panel__tags-picker-trigger project-plan-panel__tags-picker-trigger--create",
				"aria-expanded": open,
				"aria-haspopup": "listbox",
				disabled,
				onClick: handleOpen,
				"data-track-id": "collab_plan_todo_label_entry",
				"data-track-name": "待办标签入口",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: [
						"project-plan-panel__tags-picker-text",
						isEmpty ? "project-plan-panel__tags-picker-text--placeholder" : "",
						isEmpty ? "project-plan-panel__create-chip-placeholder" : ""
					].filter(Boolean).join(" "),
					children: isEmpty ? placeholder ?? "" : displayValue.join(", ")
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "project-plan-panel__status-chevron",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChevronDownIcon, {})
				})]
			})
		}), open && (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			ref: menuRef,
			role: "listbox",
			className: "wb-popover-compact project-plan-panel__tags-menu",
			style: {
				position: "fixed",
				top: menuPos.top,
				bottom: menuPos.bottom,
				left: menuPos.left,
				minWidth: menuPos.width,
				zIndex: menuZIndex
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "project-plan-panel__tags-search",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("input", {
						ref: inputRef,
						type: "search",
						value: keyword,
						placeholder: searchPlaceholder ?? "",
						autoComplete: "off",
						onChange: (event) => setKeyword(event.target.value),
						onKeyDown: (event) => {
							if (event.key === "Enter" && canCreateNew && !creating) {
								event.preventDefault();
								handleCreate();
							}
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "project-plan-panel__tags-list",
					children: [filteredOptions.map((option) => {
						const selected = displayValue.includes(option.text);
						return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TagOptionButton, {
							text: option.text,
							style: option.style,
							selected,
							onToggle: () => handleToggle(option),
							onEdit: onEditOption ? (nextText, nextStyle) => handleEditOption(option, nextText, nextStyle) : void 0,
							onDelete: onDeleteOption ? () => handleDeleteOption(option) : void 0,
							editLabel: editTagLabel,
							deleteLabel: deleteTagLabel,
							deleteConfirmTitle: resolvedDeleteConfirmTitle,
							deleteConfirmDesc: resolvedDeleteConfirmDesc,
							deleteConfirmOkLabel: resolvedDeleteConfirmOkLabel,
							deleteConfirmCancelLabel: resolvedDeleteConfirmCancelLabel
						}, option.id || option.text);
					}), filteredOptions.length === 0 && !canCreateNew && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "project-plan-panel__tags-empty",
						children: emptyText ?? ""
					})]
				}),
				canCreateNew && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TagCreateRow, {
					keyword: trimmedKeyword,
					label: createTagLabel,
					creating,
					onCreate: handleCreate
				})
			]
		}), document.body)] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/plan/smartsheet/use-smartsheet-service.ts
/**
* 取得当前 projectId 对应的 SmartsheetService 实例。
*
* @returns service 实例；未就绪 / bootstrap 未注册时返回 undefined
*/
function useSmartsheetService(projectId) {
	const [service, setService] = (0, import_react$2.useState)(void 0);
	(0, import_react$2.useEffect)(() => {
		if (!projectId) {
			setService(void 0);
			return;
		}
		let cancelled = false;
		let unsubscribeBootstrap;
		const init = () => {
			if (!peekSmartsheetService(projectId) && !isSmartsheetBootstrapRegistered(projectId)) {
				unsubscribeBootstrap?.();
				unsubscribeBootstrap = onceSmartsheetBootstrapRegistered(projectId, () => {
					if (!cancelled) init();
				});
				return;
			}
			ensureSmartsheetService(projectId).then((s) => {
				if (cancelled) return;
				if (s.projectId !== projectId) {
					setService(void 0);
					return;
				}
				setService(s);
			}).catch((err) => {
				if (cancelled) return;
				console.error("[useSmartsheetService] init failed for project", projectId, err);
				setService(void 0);
			});
		};
		init();
		return () => {
			cancelled = true;
			unsubscribeBootstrap?.();
		};
	}, [projectId]);
	return service;
}
var import_react$2;
var init_use_smartsheet_service = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_smart_sheet();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/task/local-task-transfer-submit.ts
function getArtifactName$1(artifact, t) {
	const item = artifact;
	return String(item.name ?? item.title ?? item.path ?? item.id ?? t("collab.task.handoff.fallbackArtifactName"));
}
/**
* 把本地产物（本机文件 URI）读成 File。
*
* **取路径必须用 `getArtifactFilePath`（媒体取 `url`、其他取 `uri || id`）** —— 早期只取
* `(artifact as any).url`，导致**非 media-artifact 产物**（markdown/文本等，路径在 `uri`/`id`）
* 因 url 为空被静默跳过、产物丢失（转交却报成功）。用 `fileUriToLocalPath` 归一化：它已处理
* `file://` 剥离 + Windows 盘符 + percent-decode（agent:// 前缀本地任务通常不出现，
* 但即便出现原样透传也交给后端 read-file-by-path 决策）。
*
* 读取失败计入 `failed`，供上层累加进 failedAttachmentCount，不再静默吞（真失败时提示用户）。
*/
async function readArtifactsAsFiles(artifacts, adapter, t) {
	const reads = await Promise.allSettled(artifacts.map(async (artifact) => {
		const rawUri = getArtifactFilePath(artifact);
		if (!rawUri) {
			console.warn("[TaskTransferPopover] 跳过无有效路径的本地产物:", getArtifactName$1(artifact, t));
			return;
		}
		const filePath = fileUriToLocalPath(rawUri);
		const result = await adapter.readFileByPath?.(filePath);
		if (!result?.success || !result.data) {
			console.warn("[TaskTransferPopover] 跳过读取失败的本地产物:", getArtifactName$1(artifact, t), result?.error);
			return;
		}
		const binary = atob(result.data);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
		return new File([new Blob([bytes])], getArtifactName$1(artifact, t));
	}));
	const files = [];
	let failed = 0;
	for (const r of reads) if (r.status === "fulfilled" && r.value) files.push(r.value);
	else failed++;
	return {
		files,
		failed
	};
}
/**
* #rrPGGh 阶段化：本地转交拆成「创建 todo（同步）」+「上传附件（后台）」两阶段。
*
* 只有 createTodo 是「必须让用户在弹窗关闭前拿到失败反馈」的关键动作（失败要立即提示、不该悄悄关弹窗），
* 之后的产物读取 / 附件上传 / 元数据绑定都可以 fire-and-forget，允许 UI 立即释放。
*
* `submitLocalTaskTransfer` 作为串行组合保留，避免破坏其它调用点。
*
* #69355 融合：createTodo 走 SmartsheetService.createTodo（非 projectFacade.createTodo）—— 只有智能表
* 侧能把 startedAt 落到 sys_started_at cellValue，走 REST 会丢「计划栏 · 开始日期」。附件绑定仍走
* projectFacade.addTodoAttachment 与云端一致。
*/
async function createLocalTaskTodo(params) {
	const { smartsheetService, resolveMembers, projectId } = params;
	const note = params.description.trim() || void 0;
	return await smartsheetService.createTodo({
		projectId,
		title: params.title || params.taskTitle,
		description: note,
		summary: params.summary || params.fallbackSummary,
		assigneeIds: params.assigneeId ? [params.assigneeId] : [],
		source: "handoff",
		tags: params.tags,
		priority: params.priority,
		startedAt: params.startedAt || void 0,
		dueDate: params.deadline || void 0
	}, resolveMembers);
}
/** 已知 todoId 后跑：产物读取 → 网盘上传 → 附件绑定。返回附件失败数（0 = 全部成功）。 */
async function finalizeLocalTaskAttachments(params, todoId) {
	const { projectFacade, adapter, t, projectId } = params;
	const artifactRead = adapter && params.artifacts.length > 0 ? await readArtifactsAsFiles(params.artifacts, adapter, t) : {
		files: [],
		failed: 0
	};
	let failedAttachmentCount = artifactRead.failed;
	try {
		const uploadedArtifactAttachments = artifactRead.files.length > 0 && adapter ? await uploadTodoAttachmentsToProjectNetdisk({
			adapter,
			projectId,
			todoId,
			files: artifactRead.files,
			isHandoffArtifact: true
		}) : [];
		const uploadedUserAttachments = params.localFiles.length > 0 && adapter ? await uploadTodoAttachmentsToProjectNetdisk({
			adapter,
			projectId,
			todoId,
			files: params.localFiles
		}) : [];
		const attachmentParams = [
			...params.attachments,
			...uploadedArtifactAttachments,
			...uploadedUserAttachments
		];
		if (todoId && attachmentParams.length > 0) {
			const results = await Promise.allSettled(attachmentParams.map((item) => projectFacade.addTodoAttachment(projectId, todoId, item)));
			failedAttachmentCount += results.filter((result) => result.status === "rejected").length;
		}
	} catch (error) {
		console.error("[TaskTransferPopover] local attachment upload failed", error);
		failedAttachmentCount = params.attachments.length + params.localFiles.length + artifactRead.files.length + artifactRead.failed;
	}
	return failedAttachmentCount;
}
var init_local_task_transfer_submit = __esmMin((() => {
	init_file_path();
	init_todo_netdisk_attachment_upload();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/task/task-handoff-utils.ts
/**
* 同一个文件可能同时存在两条 artifact：
*   - `file-changes` 类型（来自 checkpoint，带 diff）
*   - `media-artifact` 类型（来自 artifact 推送，带完整 metadata：size/mime/width/height）
* 两者 path 相同（如 `agent://files/test.md`），但 type/id 不同，会被当成两个产物
* 在「转交产物」区重复展示（#54723 后续修复）。
*
* 这里按 path 去重，**保留 media-artifact 优先**（metadata 更完整、UI 卡片信息更全）；
* 同 path 但只有 file-changes 的就保留 file-changes。无 path 的 artifact 不参与去重，
* 全部保留（罕见场景，但避免误删未识别的产物类型）。
*/
function dedupeArtifactsByPath(artifacts) {
	const byPath = /* @__PURE__ */ new Map();
	const noPath = [];
	for (const artifact of artifacts) {
		const path = getArtifactFilePath(artifact);
		if (!path) {
			noPath.push(artifact);
			continue;
		}
		const existing = byPath.get(path);
		if (!existing) {
			byPath.set(path, artifact);
			continue;
		}
		const incomingIsMedia = artifact.type === "media-artifact";
		const existingIsMedia = existing.type === "media-artifact";
		if (incomingIsMedia && !existingIsMedia) byPath.set(path, artifact);
	}
	return [...byPath.values(), ...noPath];
}
/**
* 判断一条 attachment 是否为**存量旧数据**里的 agent 任务产物（历史遗留兼容）。
*
* 仅命中早期 `agent-artifact:` 前缀 + `'url'` provider 的旧附件；新实现的产物走
* netdisk provider，不会命中此判定（会与普通附件同构，在附件区正常渲染）。
*/
function isAgentArtifactAttachment(attachment) {
	if (!attachment) return false;
	return attachment.provider === "url" && typeof attachment.externalId === "string" && attachment.externalId.startsWith("agent-artifact:");
}
/**
* 判断一条 attachment 是否为**新方案**的「转交任务产物」。
*
* 新产物走 netdisk provider，与用户手选附件字段同构，无法靠 provider/externalId 区分；
* 改由转交流程在上传时打标（`isHandoffArtifact:true`）、绑定时写进 attachment metadata(K14)
* 持久化，读出后回填到 DTO 的 `isHandoffArtifact`。详情面板据此把产物归入「转交产物」区。
*
* 与 `isAgentArtifactAttachment`（旧 `agent-artifact:` 前缀存量数据）取 OR 使用，
* 覆盖新旧两代产物。存量在本标记落地前已转交的 netdisk 产物无 metadata，仍留在附件区
* （不可回溯识别，可接受）。
*/
function isHandoffArtifactAttachment(attachment) {
	return attachment?.isHandoffArtifact === true;
}
/** 从 ArtifactItem 解析展示文件名：优先 name/title/path/id，兜底 fallbackName。 */
function resolveArtifactName(artifact, fallbackName) {
	const anyArtifact = artifact;
	const candidate = anyArtifact.name ?? artifact.title ?? anyArtifact.path ?? getArtifactFilePath(artifact) ?? fallbackName;
	return String(candidate || fallbackName);
}
/**
* 把产物的 `agent:///` URI 归一化为**沙盒真实 posix 路径**，供 `projectChat.readFile` 直连 envd。
*
* **为什么必须做（#65488 后续修复的第二层）**：走 `adapter.readFile`（SDK cloud-provider）时，
* SDK 在 `getFilesystem` 内部套了 `createAgentFilesystem` wrapper（cloud-provider.ts `resolveAgentUri`），
* 会自动把 `agent:///workspace/x` 解析成 `/workspace/x`。但改走 `projectChat.readFile` 后，
* `ProjectChatService.getFilesystem` 直接返回裸 `CollabCloudE2BFilesystem`（无 resolve 层），
* `read` 直接 `?path=encodeURIComponent(agent:///workspace/测试.md)` 发给 envd →
* envd 拼成 `/root/agent:/workspace/测试.md` → `404 path does not exist`（实测日志坐实）。
* 故前端在喂给 `readFile` 前，必须复刻 SDK 的 `resolveAgentUri` 映射规则。
*
* 映射规则（与 SDK `resolveAgentUri` 一致，cloud-provider.ts）：
*   - `agent:///workspace/{p}` → `/workspace/{p}`（去 scheme）
*   - `agent:///plans/{p}`     → `/root/.codebuddy/plans/{p}`
*   - `agent:///{p}`           → `/{p}`（去 scheme）
*   - 非 `agent://`（已是 raw path，如 `/foo` 或 `file://`）→ 原样透传，不处理
*   - `agent://` 后不是以 `/` 开头（畸形 URI，如 `agent://files/x`）→ 原样透传，交给 envd 决策/报错
*
* 注：不做 `..` traversal 规范化（SDK 侧 normalizePath 主要防 write 越权；这里是只读产物、
* 路径由后端产物元数据提供而非用户输入，且 envd 侧仍有边界校验，故保持最小实现）。
*/
function resolveArtifactSandboxPath(uri) {
	if (!uri.startsWith("agent://")) return uri;
	const path = uri.slice(8);
	if (!path.startsWith("/")) return uri;
	if (path === "/plans" || path.startsWith("/plans/")) return "/root/.codebuddy" + path;
	return path;
}
/**
* 把云端任务沙盒已产出的 artifacts 读成浏览器 `File[]`，供 `uploadTodoAttachmentsToProjectNetdisk`
* 真正上传到项目网盘（替代早期 `artifactsToAttachmentParams` 的 URI 占位方案）。
*
* **读取通道（关键 —— #65488 后续修复）**：走 `projectChat.readFile(conversationId, uri, 'bytes')`，
* 即 `ProjectChatService` 维护的**已建立 ACP 连接的沙盒**读取。
*
* 为什么**不**再走 `adapter.readFile`（`CloudAgentAdapter`）：teams 云端任务的 ACP 连接由
* `ProjectChatService` 独立维护、**从不经过 `CloudAgentAdapter`**，因此后者的 `sessionConfigs`
* 永远没有 teams 任务的 sessionId → `adapter.readFile` 100% 抛
* `[CloudAgentAdapter] Session config not found for: <sid>` → 产物被静默丢弃、转交后目标任务无产物。
* 而转交一定发生在「用户当前停留的源任务页」，该 conversation 的连接与 filesystem 已就绪，
* `projectChat.readFile` 走 `getFilesystem(conversationId)` 复用活跃连接即可读回字节，无需任何 session 预热。
*
* 设计要点（与 `use-artifact-upload-shared.ts` 的 `readArtifactsAsFiles` 范式一致）：
*   1. 逐个 `chat.readFile(conversationId, uri, 'bytes')` 拿到 `Uint8Array`，`new File([bytes], name)` 成标准 File。
*   2. 单个文件读取失败**记入 failed 计数**、不阻塞其余产物（多产物场景下少数失败仍希望
*      成功的能上传），失败信息 warn 到 console 便于诊断；上层据 failed 走 partial-failed 提示。
*   3. `path` 由 `getArtifactFilePath`（media 取 `url`、plain 取 `uri || id`）拿到原始 `agent://` URI，
*      再经 `resolveArtifactSandboxPath` 归一化成沙盒真实 posix 路径后才喂给 `readFile`
*      （裸 CollabCloudE2BFilesystem 无 SDK 的 agent:// resolve 层，不归一化会 404）。
*   4. MIME 兜底链：artifact.mimeType > application/octet-stream（bytes 通道无 blob.type，故省略中间项）。
*
* @param artifacts 待读取的产物（调用方应先 `dedupeArtifactsByPath` 去重）
* @param chat 项目聊天 facade（`facades.projectChat`）——须实现可选的 `readFile`
* @param conversationId 产物所属会话 id（cloud 模式为弹窗透传的 `props.task.id` / cloudTaskId）
* @param fallbackName 无法解析文件名时的兜底文案
* @returns `{ files, failed }` —— files 已成功读回；failed 需累加进上层附件失败计数
*/
async function readCloudArtifactsAsFiles(artifacts, chat, conversationId, fallbackName) {
	const files = [];
	let failed = 0;
	if (typeof chat.readFile !== "function") {
		console.warn("[TaskHandoff] projectChat.readFile 不可用，跳过全部产物读取", { count: artifacts.length });
		return {
			files,
			failed: artifacts.length
		};
	}
	for (const artifact of artifacts) {
		const uri = getArtifactFilePath(artifact);
		if (!uri) {
			console.warn("[TaskHandoff] 跳过无有效路径的产物:", resolveArtifactName(artifact, fallbackName));
			failed++;
			continue;
		}
		const name = resolveArtifactName(artifact, fallbackName);
		const sandboxPath = resolveArtifactSandboxPath(uri);
		try {
			const readResult = await chat.readFile(conversationId, sandboxPath, "bytes");
			if (readResult.success && readResult.content != null) {
				const bytes = readResult.content;
				const mimeType = artifact.mimeType;
				files.push(new File([bytes], name, { type: mimeType || "application/octet-stream" }));
			} else {
				console.warn("[TaskHandoff] 跳过读取失败的产物:", name, readResult.error);
				failed++;
			}
		} catch (err) {
			console.warn("[TaskHandoff] 跳过读取异常的产物:", name, err);
			failed++;
		}
	}
	return {
		files,
		failed
	};
}
/**
* 解析转交选中 status → 后端内置 status_id。
*
* SmartSheet 迁移后前端 status 列表来自 `todos.sys_status_id` 单选列，
* `ProjectTodoStatus.id` 变成 SS optionId（如 `oZ8Ryh`）——直接透传会让后端
* GetTodoStatusByID 查不到而报 `ParameterInvalid: invalid status_id`（#65488）。
* 但 DTO 的 `type` 是稳定枚举（pending/in_progress/paused/completed），据此映射
* 回内置 id 即可，与 getHandoffPriority 透传选项文本的思路一致。
*
* 未识别 type（custom / 自定义状态）返回 undefined，后端 resolveHandoffStatusID
* 走 GetDefaultTodoStatus 兜底（沿用既有 fallback 行为）。
*/
function getHandoffStatusId(selectedStatus) {
	if (!selectedStatus) return;
	return STATUS_TYPE_TO_HANDOFF_ID[selectedStatus.type] || void 0;
}
var STATUS_TYPE_TO_HANDOFF_ID;
var init_task_handoff_utils = __esmMin((() => {
	init_file_path();
	STATUS_TYPE_TO_HANDOFF_ID = {
		pending: "status-claim",
		in_progress: "status-running",
		paused: "status-paused",
		completed: "status-done"
	};
})), import_jsx_runtime$1, CloseIcon, AttachmentIcon, SectionChevron, PromptIcon, SummarySpinner, MaximizeIcon, MinimizeIcon, ChipChevronDown;
var init_task_transfer_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 2.56512 2.56512)",
			d: "M6.3046 5.4349L10.8698 10L10 10.8698L5.4349 6.3046L0.8698 10.8698L0 10L4.5651 5.4349L0 0.8698L0.8698 0L5.4349 4.5651L10 0L10.8698 0.8698L6.3046 5.4349Z"
		})
	});
	AttachmentIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" })
	});
	SectionChevron = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M5 6.5L8 9.5L11 6.5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	PromptIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			transform: "matrix(1 0 0 1 0.524459 0.757238)",
			fill: "currentColor",
			d: "M6.1838 2.2198C6.6022 1.3093 7.8641 1.2266 8.1057 2.0938L8.84 4.7335C8.992 5.2783 9.3896 5.6893 9.929 5.8595L12.5432 6.6827C13.4014 6.9536 13.2757 8.2113 12.3517 8.5987L9.9973 9.5861L9.8362 9.6583C9.0366 10.0399 8.3731 10.7089 8.0031 11.5138L6.9377 13.8341L6.8488 13.9943C6.3971 14.7003 5.39 14.7669 5.0735 14.1115L5.0158 13.9601L4.2815 11.3205C4.1485 10.8435 3.8277 10.4679 3.3879 10.2677L3.1916 10.1935L0.5783 9.3712C-0.2801 9.1005 -0.155 7.8418 0.7687 7.4542L3.1242 6.4679C3.9412 6.1253 4.632 5.4846 5.0403 4.6983L5.1183 4.5392L6.1838 2.2198ZM6.2004 4.88C5.652 6.0736 4.6394 7.0538 3.4279 7.5616L1.5295 8.3565L3.719 9.046C4.5745 9.3157 5.2059 9.9689 5.4465 10.8331L6.0608 13.0431L6.9201 11.174C7.4685 9.9802 8.4821 9.0001 9.6935 8.4923L11.591 7.6964L9.4025 7.0069C8.547 6.7373 7.9156 6.085 7.675 5.2208L7.0598 3.0099L6.2004 4.88ZM12.7072 0.214C12.8295 -0.052 13.198 -0.0764 13.2687 0.1768L13.6194 1.4395C13.6415 1.5192 13.7005 1.5797 13.7795 1.6046L15.0285 1.9981C15.2795 2.0772 15.243 2.4445 14.9728 2.5577L13.6281 3.1212C13.5431 3.1568 13.4722 3.226 13.4338 3.3097L12.8254 4.6349C12.703 4.9009 12.3344 4.9245 12.2639 4.671L11.9124 3.4093C11.8901 3.3296 11.8319 3.2691 11.7531 3.2442L10.5031 2.8507C10.2522 2.7715 10.2888 2.4045 10.5588 2.2911L11.9035 1.7267C11.9884 1.6911 12.0593 1.6228 12.0978 1.5392L12.7072 0.214Z"
		})
	});
	SummarySpinner = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "6",
			stroke: "rgba(0, 194, 154, 0.2)",
			strokeWidth: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M8 2a6 6 0 0 1 6 6",
			stroke: "#00C29A",
			strokeWidth: "2",
			strokeLinecap: "round"
		})]
	});
	MaximizeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 8.16998 2.33)",
			d: "M4.9 5.5L4.9 2.9794L4.9 2.959Q4.9 1.8829 4.8582 1.4904L1.2543 5.0943L0.4058 4.2458L4.0098 0.6418Q3.6174 0.6 2.541 0.6L2.5 0.6L0 0.6L0 -0.6L2.5 -0.6L2.541 -0.6Q3.7923 -0.6 4.235 -0.5396Q5.0399 -0.4297 5.4847 0.015Q5.9297 0.4598 6.0396 1.2649Q6.1 1.7076 6.1 2.959L6.1 2.9795L6.1 5.5L4.9 5.5Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 2.33002 8.17)",
			d: "M0.6 0L0.6 2.5L0.6 2.541Q0.6 3.6171 0.6418 4.0096L4.2457 0.4057L5.0942 1.2542L1.4902 4.8582Q1.8826 4.9 2.959 4.9L3 4.9L5.5 4.9L5.5 6.1L3 6.1L2.959 6.1Q1.7077 6.1 1.265 6.0396Q0.4601 5.9297 0.0153 5.485Q-0.4297 5.0402 -0.5396 4.2351Q-0.6 3.7924 -0.6 2.541L-0.6 2.5L-0.6 0L0.6 0Z"
		})]
	});
	MinimizeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(-1 0 0 -1 14 7.5)",
			d: "M4.9 5.5L4.9 2.9794L4.9 2.959Q4.9 1.8828 4.8582 1.4903L1.1743 5.1743L0.3257 4.3257L4.0097 0.6418Q3.6173 0.6 2.541 0.6L2.5 0.6L0 0.6L0 -0.6L2.5 -0.6L2.541 -0.6Q3.7923 -0.6 4.235 -0.5396Q5.0399 -0.4297 5.4847 0.015Q5.9297 0.4598 6.0396 1.2649Q6.1 1.7076 6.1 2.959L6.1 2.9795L6.1 5.5L4.9 5.5Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(-1 0 0 -1 7.5 14)",
			d: "M0.6 0L0.6 2.5L0.6 2.541Q0.6 3.6172 0.6418 4.0097L4.3257 0.3257L5.1743 1.1743L1.4903 4.8582Q1.8827 4.9 2.959 4.9L3 4.9L5.5 4.9L5.5 6.1L3 6.1L2.959 6.1Q1.7077 6.1 1.265 6.0396Q0.4601 5.9297 0.0153 5.485Q-0.4297 5.0402 -0.5396 4.2351Q-0.6 3.7924 -0.6 2.541L-0.6 2.5L-0.6 0L0.6 0Z"
		})]
	});
	ChipChevronDown = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillOpacity: "0.5",
			transform: "matrix(1 0 0 1 3.39062 5.3905)",
			d: "M8.2762 0L4.6095 3.6667L0.9428 0L0 0.9428L4.6095 5.5523L9.219 0.9428L8.2762 0Z"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/tabs/task/task-transfer-popover.tsx
var task_transfer_popover_exports = /* @__PURE__ */ __exportAll({ TaskTransferPopover: () => TaskTransferPopover });
function getArtifactName(artifact, t) {
	const item = artifact;
	const fallback = t ? t("collab.task.handoff.fallbackArtifactName") : "collab.task.handoff.fallbackArtifactName";
	return String(item.name ?? item.title ?? item.path ?? item.id ?? fallback);
}
function getDeadlineTimestamp(deadline) {
	if (!deadline) return;
	const time = (/* @__PURE__ */ new Date(`${deadline}T23:59:59`)).getTime();
	return Number.isFinite(time) ? Math.floor(time / 1e3) : void 0;
}
function getStartTimestamp(startedAt) {
	if (!startedAt) return;
	const time = (/* @__PURE__ */ new Date(`${startedAt}T00:00:00`)).getTime();
	return Number.isFinite(time) ? Math.floor(time / 1e3) : void 0;
}
/**
* 前端 priority 选项 → **云端转交契约值**（选项文本字符串，不再是数值编码）。
*
* ⚠️ 仅用于 **cloud 转交路径**（projectFacade.handoffTask）。转交写侧与读侧
* （`ProjectTodo.priority` 数值编码）彻底解耦：直接透传选项文本，后端出口
* （cloud-task.ts::handoffTask）再按「系统枚举 → priority(1-based int) / 自定义 →
* priority_text」分流，从根上消除「读侧 0-based / 写侧数字」两套编码互相误用的隐患。
*
* **自定义优先级已完整支持**：text 不在 PRIORITY_TEXTS 时同样原样透传（如「中高」），
* 后端 handoff handler 收到 priority_text 后直写智能表 sys_priority option。此前因后端
* int 契约只放行系统枚举、这里过滤掉自定义 text，后端放开 priority_text 字段后已打通。
*
* **local 转交路径不经过本函数**：submitLocalTaskTransfer 直接把整个 priority 对象
* 透传给 smartsheetService.createTodo（走智能表 buildDelta 按 text 反查真实 optionId），
* 因此 local / cloud 转交现在都完整支持自定义优先级。
*/
function getHandoffPriority(priority) {
	if (!priority || !priority.text) return;
	return priority.text;
}
function buildHandoffNote(description) {
	return description.trim() || void 0;
}
var import_react, import_react_dom, import_jsx_runtime, TaskTransferPopover;
var init_task_transfer_popover = __esmMin((() => {
	init_task_transfer_popover$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_hooks();
	init_i18n();
	init_useI18n();
	init_useTheme();
	init_smart_sheet();
	init_beacon_report();
	init_constants();
	init_context();
	init_use_member_resolver();
	init_members_store();
	init_source_resolver();
	init_assignee_chip_summary();
	init_todo_netdisk_attachment_upload();
	init_project_plan_attachment_list();
	init_project_plan_attachment_picker_modal();
	init_project_plan_rich_description_editor();
	init_use_netdisk_description_image();
	init_owner_picker();
	init_project_plan_due_picker();
	init_project_plan_priority_picker();
	init_project_plan_status_picker();
	init_project_plan_tags_picker();
	init_project_plan_date_utils();
	init_use_smartsheet_service();
	init_local_task_transfer_submit();
	init_task_handoff_utils();
	init_task_transfer_icons();
	import_jsx_runtime = require_jsx_runtime();
	TaskTransferPopover = (props) => {
		const { projectId, currentUserId, artifacts, interactionCount, onClose } = props;
		const isLocal = props.mode === "local";
		const cloudSessionReady = isLocal ? false : props.sessionReady;
		const cloudSessionId = isLocal ? null : props.sessionId;
		const cloudTaskId = isLocal ? "" : props.task.id;
		const localMessages = isLocal ? props.messages : void 0;
		const t = useTranslation();
		const teamsReport = useTeamsReport();
		const { adapter, facades, accountInfo } = useModuleHost();
		const { theme } = useThemeListener();
		const descThemeName = theme === "light" ? "light" : "dark";
		const zIndex = useFloatingLayer(true);
		const projectFacade = facades.project;
		const projectChatFacade = facades.projectChat;
		const memberResolver = useMemberResolver();
		(0, import_react.useEffect)(() => {
			if (!isLocal) return;
			registerSmartsheetServiceBootstrap(projectId, {
				facade: projectFacade,
				userInfo: {
					id: accountInfo?.userId ?? "",
					name: accountInfo?.userId ?? "",
					avatarUrl: ""
				},
				resolveUserInfos: memberResolver,
				resolveSourceInfo: createSourceResolver({
					projectId,
					connectorFacade: facades.connector,
					t
				})
			});
		}, [
			isLocal,
			projectId,
			projectFacade,
			accountInfo,
			memberResolver,
			facades.connector,
			t
		]);
		const smartsheetService = useSmartsheetService(projectId);
		const summaryRequestedRef = (0, import_react.useRef)(false);
		const attachmentInputRef = (0, import_react.useRef)(null);
		const mountedRef = (0, import_react.useRef)(true);
		(0, import_react.useEffect)(() => {
			mountedRef.current = true;
			return () => {
				mountedRef.current = false;
			};
		}, []);
		const [memberMenuOpen, setMemberMenuOpen] = (0, import_react.useState)(false);
		const [keyword, setKeyword] = (0, import_react.useState)("");
		const [assigneeId, setAssigneeId] = (0, import_react.useState)("");
		const ownerWrapRef = (0, import_react.useRef)(null);
		const ownerDropdownRef = (0, import_react.useRef)(null);
		const [ownerDropdownPos, setOwnerDropdownPos] = (0, import_react.useState)({
			bottom: 0,
			left: 0
		});
		const [title, setTitle] = (0, import_react.useState)("");
		const [description, setDescription] = (0, import_react.useState)("");
		const [startedAt, setStartedAt] = (0, import_react.useState)("");
		const [deadline, setDeadline] = (0, import_react.useState)("");
		const [priority, setPriority] = (0, import_react.useState)(null);
		const [tags, setTags] = (0, import_react.useState)([]);
		const [priorityOptions, setPriorityOptions] = (0, import_react.useState)([]);
		const [tagsOptions, setTagsOptions] = (0, import_react.useState)([]);
		const [fieldOptionsReloadKey, setFieldOptionsReloadKey] = (0, import_react.useState)(0);
		const [statuses, setStatuses] = (0, import_react.useState)([]);
		const [selectedStatus, setSelectedStatus] = (0, import_react.useState)();
		const [attachments, setAttachments] = (0, import_react.useState)([]);
		const [localAttachmentFiles, setLocalAttachmentFiles] = (0, import_react.useState)([]);
		const [attachmentPickerOpen, setAttachmentPickerOpen] = (0, import_react.useState)(false);
		const [summaryText, setSummaryText] = (0, import_react.useState)("");
		const [summaryLoading, setSummaryLoading] = (0, import_react.useState)(false);
		const [submitting, setSubmitting] = (0, import_react.useState)(false);
		const [progressOpen, setProgressOpen] = (0, import_react.useState)(true);
		/**
		* 是否最大化（设计稿 12157:463 提供两态：
		*   - 默认 height=480（内容区 304），
		*   - 最大 height=720（内容区 596）。
		* 头部最大化按钮在二者之间切换。
		*/
		const [maximized, setMaximized] = (0, import_react.useState)(false);
		const dedupedArtifacts = (0, import_react.useMemo)(() => dedupeArtifactsByPath(artifacts), [artifacts]);
		(0, import_react.useEffect)(() => {
			const onKeyDown = (event) => {
				if (event.key === "Escape") onClose();
			};
			document.addEventListener("keydown", onKeyDown);
			return () => document.removeEventListener("keydown", onKeyDown);
		}, [onClose]);
		const handleDescriptionChange = (0, import_react.useCallback)((markdown) => {
			setDescription(markdown);
		}, []);
		const { options: ownerOptionsAll } = useOwnerOptions({
			projectId,
			fallbackMembers: useMembersStore((s) => s.members),
			includeRevoked: false
		});
		const ownerOptions = (0, import_react.useMemo)(() => ownerOptionsAll.filter((option) => option.id !== currentUserId), [ownerOptionsAll, currentUserId]);
		(0, import_react.useEffect)(() => {
			if (!memberMenuOpen) return;
			const onMouseDown = (event) => {
				const target = event.target;
				const inWrap = ownerWrapRef.current?.contains(target);
				const inDropdown = ownerDropdownRef.current?.contains(target);
				if (!inWrap && !inDropdown) setMemberMenuOpen(false);
			};
			document.addEventListener("mousedown", onMouseDown);
			return () => document.removeEventListener("mousedown", onMouseDown);
		}, [memberMenuOpen]);
		const handleToggleMemberMenu = () => {
			if (memberMenuOpen) {
				setMemberMenuOpen(false);
				return;
			}
			const wrap = ownerWrapRef.current;
			if (wrap) {
				const rect = wrap.getBoundingClientRect();
				setOwnerDropdownPos({
					bottom: window.innerHeight - rect.top + 8,
					left: rect.left
				});
			}
			setMemberMenuOpen(true);
		};
		/** 转交处理人单选：点已选清空，点未选覆盖；菜单保持打开（与新建待办一致）。 */
		const handleToggleAssignee = (ownerId) => {
			setAssigneeId((prev) => prev === ownerId ? "" : ownerId);
		};
		(0, import_react.useEffect)(() => {
			if (isLocal) {
				let cancelled = false;
				projectFacade.listTodoStatuses(projectId).then((items) => {
					if (cancelled) return;
					setStatuses(items);
					setSelectedStatus((prev) => prev ?? items[0]);
				}).catch(() => setStatuses([]));
				return () => {
					cancelled = true;
				};
			}
			if (!smartsheetService) return;
			let cancelled = false;
			smartsheetService.listTodoStatuses().then((items) => {
				if (cancelled) return;
				setStatuses(items);
				setSelectedStatus((prev) => prev ?? items[0]);
			}).catch((err) => {
				if (cancelled) return;
				console.warn("[TaskTransferPopover] listTodoStatuses failed:", err);
				setStatuses([]);
			});
			return () => {
				cancelled = true;
			};
		}, [
			isLocal,
			smartsheetService,
			projectFacade,
			projectId
		]);
		(0, import_react.useEffect)(() => {
			if (!smartsheetService) return;
			const sub = smartsheetService.subscribe(() => setFieldOptionsReloadKey((prev) => prev + 1));
			return () => {
				sub.dispose();
			};
		}, [smartsheetService]);
		(0, import_react.useEffect)(() => {
			if (!smartsheetService) return;
			let cancelled = false;
			Promise.all([smartsheetService.listFieldOptions("priority"), smartsheetService.listFieldOptions("tags")]).then(([priorities, tagOptions]) => {
				if (cancelled) return;
				setPriorityOptions(priorities);
				setTagsOptions(tagOptions);
			}).catch((err) => {
				if (!cancelled) console.warn("[TaskTransferPopover] load select options failed:", err);
			});
			return () => {
				cancelled = true;
			};
		}, [smartsheetService, fieldOptionsReloadKey]);
		const statusOptions = (0, import_react.useMemo)(() => mergeProjectPlanStatusOptions(selectedStatus, statuses), [selectedStatus, statuses]);
		const currentStatus = selectedStatus ?? statusOptions[0];
		const localizedPriorityOptions = (0, import_react.useMemo)(() => priorityOptions.map((option) => {
			const known = PRIORITY_TEXTS.includes(option.text);
			return {
				id: option.id,
				text: option.text,
				label: known ? t(`collab.plan.detail.priority.${option.text}`) : option.text,
				style: option.style
			};
		}), [priorityOptions, t]);
		const handlePrioritySelect = (option) => {
			setPriority(option ? {
				id: option.id,
				text: option.text
			} : null);
		};
		const handleTagsSubmit = async (nextTexts) => {
			setTags(nextTexts);
		};
		/** 现场新增 tag 选项走 service.addFieldOption；service.subscribe 触发选项重载 */
		const handleCreateTagOption = async (text) => {
			if (!smartsheetService) return null;
			try {
				return await smartsheetService.addFieldOption("tags", text);
			} catch (reason) {
				console.warn("[TaskTransferPopover] add tag option failed:", reason);
				return null;
			}
		};
		/** 删除 tag 选项（下拉右键菜单触发）；service.notify 会刷新 tagsOptions */
		const handleDeleteTagOption = async (option) => {
			if (!smartsheetService || !option.id) return;
			await smartsheetService.removeFieldOption("tags", option.id);
		};
		/** 现场新增优先级选项（picker 搜索框「新建」触发）；新建成功后 picker 自动选中 */
		const handleCreatePriorityOption = async (text, style) => {
			if (!smartsheetService) return null;
			try {
				return await smartsheetService.addFieldOption("priority", text, style);
			} catch (reason) {
				console.warn("[TaskTransferPopover] add priority option failed:", reason);
				return null;
			}
		};
		/**
		* 编辑优先级选项（改名 + 改色一体，下拉 hover「...」菜单「编辑」触发）。
		* 按 optionId 定位，optionId 不变 → 对已选中值 / 历史无副作用。
		*/
		const handleEditPriorityOption = async (optionId, nextText, nextStyle) => {
			if (!smartsheetService || !optionId) return;
			try {
				await smartsheetService.updateFieldOption("priority", optionId, nextText, nextStyle);
			} catch (reason) {
				console.warn("[TaskTransferPopover] edit priority option failed:", reason);
			}
		};
		/** 删除优先级选项（下拉 hover「...」菜单触发，带二次确认）；service.notify 会刷新 priorityOptions */
		const handleDeletePriorityOption = async (option) => {
			if (!smartsheetService || !option.id) return;
			await smartsheetService.removeFieldOption("priority", option.id);
		};
		const assigneeName = ownerOptions.find((member) => member.id === assigneeId)?.name;
		const artifactNames = dedupedArtifacts.map((artifact) => getArtifactName(artifact, t));
		const taskTitle = (isLocal ? props.conversationTitle : props.task.title) || t("collab.task.handoff.fallbackTaskName");
		const fallbackProgressText = [
			t("collab.task.handoff.progressFallbackTitle", {
				title: taskTitle,
				count: dedupedArtifacts.length
			}),
			artifactNames.length ? t("collab.task.handoff.progressFallbackParen", { names: artifactNames.join(t("collab.task.handoff.artifactNameSeparator")) }) : "",
			t("collab.task.handoff.progressFallbackInteraction", { count: interactionCount })
		].join("");
		const progressText = summaryText || fallbackProgressText;
		const isTitleEmpty = !title.trim();
		const existingAttachmentIds = (0, import_react.useMemo)(() => new Set(attachments.map((item) => item.externalId).filter((id) => Boolean(id))), [attachments]);
		(0, import_react.useEffect)(() => {
			if (summaryRequestedRef.current) return;
			if (isLocal) {
				const messages = localMessages ?? [];
				if (messages.length === 0) return;
				summaryRequestedRef.current = true;
				setSummaryText("");
				setSummaryLoading(true);
				const language = getLocale() === "en" ? "English" : "简体中文";
				projectFacade.generateLocalHandoffSummary({
					messages: messages.map((m) => ({
						messageType: m.messageType,
						content: m.content
					})),
					language
				}).then((result) => {
					setSummaryText(result.summary);
				}).catch((err) => {
					console.error("[TaskTransferPopover] generateLocalHandoffSummary failed:", err);
				}).finally(() => {
					setSummaryLoading(false);
				});
				return;
			}
			if (!cloudSessionReady || !cloudSessionId) return;
			summaryRequestedRef.current = true;
			setSummaryText("");
			setSummaryLoading(true);
			const language = getLocale() === "en" ? "English" : "简体中文";
			projectFacade.generateHandoffSummary({
				projectId,
				conversationId: cloudTaskId,
				sessionId: cloudSessionId,
				language
			}).then((result) => {
				setSummaryText(result.summary);
			}).catch((err) => {
				console.error("[TaskTransferPopover] generateHandoffSummary failed:", err);
			}).finally(() => {
				setSummaryLoading(false);
			});
		}, [
			isLocal,
			cloudSessionReady,
			cloudSessionId,
			cloudTaskId,
			projectFacade,
			projectId,
			localMessages
		]);
		const handleAttachmentSelect = (selectedAttachments) => {
			const nextAttachments = selectedAttachments.filter((item) => item.externalId && !existingAttachmentIds.has(item.externalId));
			if (nextAttachments.length === 0) {
				message.info(t("collab.task.handoff.attachmentAlreadyAdded"));
				return;
			}
			setAttachments((prev) => [...prev, ...nextAttachments]);
			message.success(t("collab.task.handoff.attachmentsSelected", { count: nextAttachments.length }), 1800);
		};
		const openAttachmentPicker = () => {
			attachmentInputRef.current?.click();
		};
		const attachmentMenuItems = (0, import_react.useMemo)(() => [{
			key: "local",
			label: t("collab.task.handoff.attachmentsLocal")
		}, {
			key: "netdisk",
			label: t("collab.task.handoff.attachmentsNetdisk")
		}], [t]);
		const handleSelectAttachmentSource = (0, import_react.useCallback)((key) => {
			if (key === "local") openAttachmentPicker();
			else if (key === "netdisk") setAttachmentPickerOpen(true);
		}, []);
		const handleAttachmentChange = (event) => {
			const files = Array.from(event.target.files ?? []);
			event.target.value = "";
			if (files.length === 0) return;
			setLocalAttachmentFiles((prev) => [...prev, ...files]);
			message.success(t("collab.task.handoff.attachmentsSelected", { count: files.length }), 1800);
		};
		const handleRemoveAttachment = (target) => {
			setAttachments((prev) => prev.filter((item) => item !== target));
		};
		const handleRemoveLocalAttachment = (index) => {
			setLocalAttachmentFiles((prev) => prev.filter((_, idx) => idx !== index));
		};
		const handleSubmit = async () => {
			if (submitting) return;
			teamsReport(TEAMS_EVENT.ELEMENT_CLICK, {
				elementName: TEAMS_ELEMENT.TASK_TRANSFER_SUBMIT_CLICK,
				source: isLocal ? "local" : "cloud"
			});
			if (isTitleEmpty) {
				message.info(t("collab.task.handoff.titleEmpty"));
				return;
			}
			if (isTitleOverMaxLength(title.trim())) {
				message.error(t("collab.plan.title.tooLong", { max: 500 }));
				return;
			}
			if (summaryLoading) {
				message.info(t("collab.task.handoff.summaryLoading"));
				return;
			}
			const summary = (summaryText || fallbackProgressText).trim();
			if (!summary) {
				message.info(t("collab.task.handoff.summaryEmpty"));
				return;
			}
			if (!isTodoDateRangeValid(startedAt, deadline)) {
				message.error(t("collab.plan.errors.startDateAfterDueDate"));
				return;
			}
			if (localAttachmentFiles.length > 0 && !adapter) {
				message.error(t("collab.plan.attachment.picker.initFailed"));
				return;
			}
			setSubmitting(true);
			try {
				if (isLocal) {
					if (!smartsheetService) {
						message.error(t("collab.plan.attachment.picker.initFailed"));
						return;
					}
					const localParams = {
						projectFacade,
						smartsheetService,
						resolveMembers: memberResolver,
						adapter,
						t,
						projectId,
						title: title.trim(),
						taskTitle,
						description,
						assigneeId,
						deadline,
						startedAt,
						priority,
						tags,
						summary,
						fallbackSummary: fallbackProgressText,
						attachments,
						localFiles: localAttachmentFiles,
						artifacts: dedupedArtifacts
					};
					const localTodoId = await createLocalTaskTodo(localParams);
					const hasBackground = attachments.length + localAttachmentFiles.length + dedupedArtifacts.length > 0;
					message.success(t("collab.task.handoff.handoffSuccess"), 1800);
					onClose();
					if (hasBackground) (async () => {
						try {
							const failed = await finalizeLocalTaskAttachments(localParams, localTodoId);
							if (failed > 0) message.error(t("collab.task.handoff.attachmentsPartialFailed", { count: failed }), 2600);
						} catch (bgErr) {
							console.error("[TaskTransferPopover] local background finalize failed", bgErr);
							message.error(t("collab.task.handoff.attachmentsPartialFailed", { count: attachments.length + localAttachmentFiles.length + dedupedArtifacts.length }), 2600);
						}
					})().catch((err) => console.error("[TaskTransferPopover] local background IIFE crashed", err));
					return;
				}
				const handoffResult = await projectFacade.handoffTask(cloudTaskId, {
					toUserId: assigneeId || void 0,
					summary,
					title: title.trim() || void 0,
					note: buildHandoffNote(description),
					deadlineAt: getDeadlineTimestamp(deadline),
					statusId: getHandoffStatusId(currentStatus),
					startedAt: getStartTimestamp(startedAt),
					priority: getHandoffPriority(priority),
					tags: tags.length > 0 ? tags : void 0
				});
				message.success(t("collab.task.handoff.handoffSuccess"), 1800);
				onClose();
				const backgroundTodoId = handoffResult.todoId;
				const backgroundLocalFiles = localAttachmentFiles;
				const backgroundArtifacts = dedupedArtifacts;
				const backgroundAttachments = attachments;
				const keepAliveId = backgroundArtifacts.length > 0 && cloudTaskId && projectChatFacade?.acquireKeepAlive ? cloudTaskId : null;
				if (keepAliveId) projectChatFacade.acquireKeepAlive(keepAliveId);
				(async () => {
					try {
						if (smartsheetService && backgroundTodoId) try {
							await smartsheetService.syncCollabChanges();
						} catch (err) {
							console.warn("[TaskTransferPopover] syncCollabChanges before attachment failed", err);
						}
						let failedAttachmentCount = 0;
						try {
							const artifactRead = projectChatFacade?.readFile && cloudTaskId && backgroundArtifacts.length > 0 ? await readCloudArtifactsAsFiles(backgroundArtifacts, projectChatFacade, cloudTaskId, t("collab.task.handoff.fallbackArtifactName")) : {
								files: [],
								failed: 0
							};
							const artifactFiles = artifactRead.files;
							failedAttachmentCount += artifactRead.failed;
							const uploadedArtifactAttachments = artifactFiles.length > 0 && adapter ? await uploadTodoAttachmentsToProjectNetdisk({
								adapter,
								projectId,
								todoId: backgroundTodoId,
								files: artifactFiles,
								isHandoffArtifact: true
							}) : [];
							const uploadedLocalAttachments = backgroundLocalFiles.length > 0 && adapter ? await uploadTodoAttachmentsToProjectNetdisk({
								adapter,
								projectId,
								todoId: backgroundTodoId,
								files: backgroundLocalFiles
							}) : [];
							const attachmentParams = [
								...uploadedArtifactAttachments,
								...uploadedLocalAttachments,
								...backgroundAttachments
							];
							if (backgroundTodoId && attachmentParams.length > 0) {
								if (!smartsheetService) throw new Error("SmartsheetService 未就绪，无法保存附件");
								await smartsheetService.reload();
								const results = await Promise.allSettled(attachmentParams.map((item) => smartsheetService.addAttachment(backgroundTodoId, item)));
								failedAttachmentCount += results.filter((result) => result.status === "rejected").length;
							}
						} catch (error) {
							console.error("[TaskTransferPopover] handoff attachment failed", error);
							failedAttachmentCount = backgroundAttachments.length + backgroundLocalFiles.length + backgroundArtifacts.length;
						}
						if (assigneeId) projectFacade.relayMessage(cloudTaskId, {
							type: "task/exchange",
							data: {
								userId: assigneeId,
								timestamp: (/* @__PURE__ */ new Date()).toISOString()
							}
						}).catch((err) => {
							console.warn("[TaskTransferPopover] relay-message failed (non-fatal)", err);
						});
						if (failedAttachmentCount > 0) message.error(t("collab.task.handoff.attachmentsPartialFailed", { count: failedAttachmentCount }), 2600);
					} catch (bgErr) {
						console.error("[TaskTransferPopover] background handoff finalize failed", bgErr);
					} finally {
						if (keepAliveId) try {
							projectChatFacade?.releaseKeepAlive?.(keepAliveId);
						} catch (err) {
							console.warn("[TaskTransferPopover] releaseKeepAlive failed", err);
						}
					}
				})().catch((err) => console.error("[TaskTransferPopover] cloud background IIFE crashed", err));
			} catch (reason) {
				console.error("[TaskTransferPopover] failed to handoff task", reason);
				if ((reason?.code ?? reason?.response?.data?.code) === 17202) message.error(t("collab.task.handoff.handoffFailedProjectArchived"));
				else if (reason?.message?.includes("archived or deleted")) message.error(t("collab.task.handoff.handoffFailedTaskArchived"));
				else message.error(t("collab.task.handoff.handoffFailed"));
			} finally {
				if (mountedRef.current) setSubmitting(false);
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "workbuddy-collab workbuddy-collab--portal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plan-new-overlay is-open visible task-transfer-overlay",
				style: { zIndex },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "plan-modal-backdrop",
					"aria-label": t("collab.task.handoff.backdropAriaLabel"),
					onClick: onClose
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `plan-new-modal task-transfer-popover${maximized ? " is-maximized" : ""}`,
					role: "dialog",
					"aria-modal": "true",
					"aria-label": t("collab.task.handoff.dialogAriaLabel"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "plan-new-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "plan-new-breadcrumb",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("collab.task.handoff.headerTitle") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "plan-new-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "plan-new-icon-btn plan-new-maximize",
									type: "button",
									"aria-label": maximized ? t("collab.task.handoff.section.summaryCollapse") : t("collab.task.handoff.section.summaryExpand"),
									title: maximized ? t("collab.task.handoff.section.summaryCollapse") : t("collab.task.handoff.section.summaryExpand"),
									onClick: () => setMaximized((prev) => !prev),
									children: maximized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinimizeIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaximizeIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "plan-new-icon-btn plan-new-close",
									type: "button",
									"aria-label": t("collab.task.handoff.closeLabel"),
									title: t("collab.task.handoff.closeLabel"),
									onClick: onClose,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "plan-new-pane",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "plan-new-content",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "transfer-title-input",
										value: title,
										placeholder: t("collab.task.handoff.titlePlaceholder"),
										onChange: (event) => setTitle(event.target.value),
										"aria-label": t("collab.task.handoff.fieldTitle")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `transfer-section${progressOpen ? " is-open" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "transfer-section-head",
										"aria-expanded": progressOpen,
										onClick: () => setProgressOpen((prev) => !prev),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "transfer-section-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptIcon, {})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "transfer-section-label",
												children: t("collab.task.handoff.section.progressTitle")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "transfer-section-chevron",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionChevron, {})
											})
										]
									}), progressOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "transfer-section-body",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "transfer-vertical-line",
											"aria-hidden": "true"
										}), summaryLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "transfer-summary-loading",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "transfer-summary-spinner",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummarySpinner, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "transfer-summary-loading-text",
												children: t("collab.task.handoff.section.summaryGenerating")
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "transfer-info-progress",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownRenderer, {
												complete: true,
												children: progressText
											})
										})]
									})]
								}),
								dedupedArtifacts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "transfer-section is-open",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "transfer-section-head transfer-section-head--static",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "transfer-section-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptIcon, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "transfer-section-label",
											children: [t("collab.task.handoff.section.artifactTitle"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "transfer-section-count",
												children: [" ", dedupedArtifacts.length]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "transfer-section-body",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "transfer-vertical-line",
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "transfer-artifact-cards",
											children: dedupedArtifacts.map((artifact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "transfer-artifact-card",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactFileTypeIcon, {
													className: "transfer-artifact-icon",
													fileName: getArtifactName(artifact, t),
													type: "solid",
													width: 16,
													height: 16,
													"aria-hidden": "true"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "transfer-artifact-name",
													children: getArtifactName(artifact, t)
												})]
											}, artifact.id ?? getArtifactName(artifact, t)))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "transfer-description-rich",
									"aria-label": t("collab.task.handoff.fieldDescription"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanRichDescriptionEditor, {
										mode: "create",
										scroll: "page",
										value: description,
										placeholder: t("collab.task.handoff.descriptionPlaceholder"),
										themeName: descThemeName,
										projectId,
										todoId: DRAFT_DESCRIPTION_TODO_ID,
										onChange: handleDescriptionChange
									}, "transfer-desc")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "plan-new-chip-row",
									"aria-label": t("collab.task.handoff.propertyAriaLabel"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanStatusPicker, {
											selectedStatus: currentStatus,
											statuses: statusOptions,
											menuPlacement: "top",
											onBeforeOpen: () => setMemberMenuOpen(false),
											onSelect: setSelectedStatus
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "plan-new-chip-wrap project-plan-panel__create-owner-wrap",
											ref: ownerWrapRef,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: `plan-new-chip${assigneeId ? " plan-new-chip--assignee-set" : ""}`,
												type: "button",
												"aria-expanded": memberMenuOpen,
												onClick: handleToggleMemberMenu,
												children: assigneeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssigneeChipSummary, {
													members: [{
														id: assigneeId,
														name: assigneeName
													}],
													avatarSize: 16,
													className: "transfer-assignee-summary"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipChevronDown, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("collab.task.handoff.unassignedChip") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipChevronDown, {})] })
											}), memberMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerPickerDropdown, {
												options: ownerOptions,
												selectedIds: assigneeId ? [assigneeId] : [],
												onToggle: handleToggleAssignee,
												keyword,
												onKeywordChange: setKeyword,
												position: {
													bottom: ownerDropdownPos.bottom,
													left: ownerDropdownPos.left
												},
												mode: "single",
												displayField: "name",
												dropdownRef: ownerDropdownRef,
												emptyText: t("collab.task.handoff.empty")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanPriorityPicker, {
											options: localizedPriorityOptions,
											value: priority?.id,
											variant: "create",
											placeholder: t("collab.plan.detail.priorityLabel"),
											searchPlaceholder: t("collab.plan.detail.prioritySearchPlaceholder"),
											emptyText: t("collab.plan.detail.priorityEmpty"),
											createLabel: t("collab.plan.detail.priorityCreate"),
											editLabel: t("collab.plan.detail.priorityEdit"),
											deleteLabel: t("collab.plan.detail.priorityDelete"),
											onBeforeOpen: () => setMemberMenuOpen(false),
											onChange: handlePrioritySelect,
											onCreateOption: handleCreatePriorityOption,
											onEditOption: handleEditPriorityOption,
											onDeleteOption: handleDeletePriorityOption
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanTagsPicker, {
											options: tagsOptions,
											value: tags,
											variant: "create",
											placeholder: t("collab.plan.detail.tagsLabel"),
											searchPlaceholder: t("collab.plan.detail.tagsSearchPlaceholder"),
											emptyText: t("collab.plan.detail.tagsEmpty"),
											createTagLabel: t("collab.plan.detail.tagsCreate"),
											deleteTagLabel: t("collab.plan.detail.tagsDelete"),
											onBeforeOpen: () => setMemberMenuOpen(false),
											onSubmit: handleTagsSubmit,
											onCreateOption: handleCreateTagOption,
											onDeleteOption: handleDeleteTagOption
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "plan-new-chip-wrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanDuePicker, {
												value: startedAt,
												variant: "create",
												openDirection: "up",
												placeholder: t("collab.plan.startDate.placeholder"),
												allowPast: true,
												onBeforeOpen: () => setMemberMenuOpen(false),
												onChange: setStartedAt
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "plan-new-chip-wrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanDuePicker, {
												value: deadline,
												variant: "create",
												openDirection: "up",
												onBeforeOpen: () => setMemberMenuOpen(false),
												onChange: setDeadline
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanAttachmentList, {
									projectId,
									className: "task-transfer-attachment-list",
									items: [...attachments.map((attachment, index) => ({
										key: `${attachment.externalId ?? attachment.name ?? "attachment"}-${index}`,
										name: attachment.name ?? attachment.externalId,
										fallbackName: t("collab.plan.create.attachmentFallbackName"),
										fileId: attachment.provider === "netdisk" ? attachment.externalId : void 0,
										fileType: attachment.fileType,
										fileSize: attachment.fileSize,
										removeAriaLabel: t("collab.plan.create.attachmentRemoveAria"),
										onRemove: () => handleRemoveAttachment(attachment)
									})), ...localAttachmentFiles.map((file, index) => ({
										key: `local-${file.name}-${file.size}-${index}`,
										name: file.name,
										fileSize: file.size,
										localFile: file,
										title: t("collab.plan.create.attachmentPendingUpload", { name: file.name }),
										pending: true,
										removeAriaLabel: t("collab.plan.create.attachmentRemoveAria"),
										onRemove: () => handleRemoveLocalAttachment(index)
									}))]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "plan-new-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "plan-new-attachment-area",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
									items: attachmentMenuItems,
									onSelect: handleSelectAttachmentSource,
									trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "plan-new-upload",
										type: "button",
										title: t("collab.task.handoff.attachmentsAddTitle"),
										"aria-label": t("collab.task.handoff.attachmentsAddTitle"),
										disabled: submitting,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentIcon, {})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: attachmentInputRef,
									type: "file",
									multiple: true,
									hidden: true,
									onChange: handleAttachmentChange
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "plan-new-footer-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "plan-new-cancel",
									onClick: onClose,
									disabled: submitting,
									children: t("collab.task.handoff.cancel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `plan-new-submit${submitting || summaryLoading || isTitleEmpty ? "" : " is-enabled"}`,
									onClick: handleSubmit,
									disabled: submitting || summaryLoading || isTitleEmpty,
									"data-track-id": "collab_task_transfer_submit",
									"data-track-name": "提交任务转交",
									children: submitting ? t("collab.task.handoff.submitting") : t("collab.task.handoff.create")
								})]
							})]
						})
					]
				})]
			})
		}), document.body), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPlanAttachmentPickerModal, {
			visible: attachmentPickerOpen,
			projectId,
			existingAttachmentIds,
			onClose: () => setAttachmentPickerOpen(false),
			onSelect: handleAttachmentSelect
		})] });
	};
}));
//#endregion
export { getOwnerLabel as $, TagCreateRow as A, init_project_plan_due_picker as B, buildPriorityNoneOption as C, init_assignee_chip_summary as Ct, init_floating_menu_pos as D, init_use_member_resolver as Dt, computeFloatingMenuPos as E, init_source_resolver as Et, init_tag_color as F, isTodoCompleted as G, formatDateTime as H, tagChipStyle as I, parseDateOnly as J, init_project_plan_date_utils as K, init_outside_close_ignore as L, PriorityChip as M, init_priority_chip as N, TagOptionButton as O, useMemberResolver as Ot, buildTagStyleByText as P, filterActiveOwnerIds as Q, isOutsideCloseIgnored as R, ProjectPlanPriorityPicker as S, AssigneeChipSummary as St, isPriorityNoneOption as T, createSourceResolver as Tt, getStatusTypeLabel as U, buildFormState as V, init_project_plan_helpers as W, init_use_owner_options as X, init_owner_picker as Y, useOwnerOptions as Z, STATUS_OPTIONS as _, CloudFilePreviewModal as _t, isAgentArtifactAttachment as a, OwnerPickerDropdown as at, getStatusIconAsset as b, uploadProjectMessageAttachmentsToNetdisk as bt, useSmartsheetService as c, useDelayedAutoFocus as ct, formatTagsHistoryDisplay as d, DRAFT_DESCRIPTION_TODO_ID as dt, getTodoAssigneeIds as et, init_format_tags_display as f, init_use_netdisk_description_image as ft, mergeProjectPlanStatusOptions as g, init_project_plan_attachment_list as gt, init_project_plan_status_picker as h, ProjectPlanAttachmentList as ht, init_task_handoff_utils as i, normalizeOwnerOptions as it, init_tag_create_row as j, init_tag_option_button as k, ProjectPlanTagsPicker as l, ProjectPlanRichDescriptionEditor as lt, ProjectPlanStatusPicker as m, init_project_plan_attachment_picker_modal as mt, init_task_transfer_popover as n, init_project_plan_owner_options as nt, isHandoffArtifactAttachment as o, init_owner_picker_dropdown as ot, ProjectPlanStatusMenuOptions as p, ProjectPlanAttachmentPickerModal as pt, isTodoDateRangeValid as q, task_transfer_popover_exports as r, isOwnerRevoked as rt, init_use_smartsheet_service as s, init_use_delayed_auto_focus as st, TaskTransferPopover as t, getTodoAvatarMembers as tt, init_project_plan_tags_picker as u, init_project_plan_rich_description_editor as ut, init_project_plan_detail_utils as v, init_cloud_file_preview_modal as vt, init_project_plan_priority_picker as w, clearSourceResolverCache as wt, init_plan_status_icons as x, uploadTodoAttachmentsToProjectNetdisk as xt, PlanStatusIcon as y, init_todo_netdisk_attachment_upload as yt, ProjectPlanDuePicker as z };
