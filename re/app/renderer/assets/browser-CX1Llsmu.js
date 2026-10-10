import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Dit as FileType, Oit as FilesystemEventType, Qq as init_esm, Qrt as init_common$1, Uit as CloudAgentConnection, aJ as context, bJ as ROOT_CONTEXT, eJ as trace, lJ as SpanKind, mJ as isSpanContextValid, sJ as SpanStatusCode } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Dv as require_dist, El as ADDITIONAL_DATA_ROLE, Nl as formatTdriveAttachmentsXml, Rl as wrapHiddenContextXml, sl as init_common$2 } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/workbuddy-server/src/project/_internal/chat-log.ts
/**
* 按 relativePath 维护内存 buffer，达到阈值或超时再批量调用 flushBatch。
*
* 失败安全：flushBatch 抛错会被 catch 吞掉（chat.log 是诊断日志，不能因为
* 写盘失败影响业务）；但仍会 console.warn 一次方便排查。
*/
function createBufferedChatLogWriter(options) {
	const maxLines = options.maxLines ?? 512;
	const maxBytes = options.maxBytes ?? 131072;
	const flushIntervalMs = options.flushIntervalMs ?? 500;
	const timers = options.timers ?? DEFAULT_TIMERS;
	const buffers = /* @__PURE__ */ new Map();
	const pending = /* @__PURE__ */ new Set();
	function ensure(path) {
		let buf = buffers.get(path);
		if (!buf) {
			buf = {
				entries: [],
				bytes: 0,
				timer: null
			};
			buffers.set(path, buf);
		}
		return buf;
	}
	function scheduleTimer(path, buf) {
		if (flushIntervalMs <= 0 || buf.timer) return;
		buf.timer = timers.setTimeout(() => {
			buf.timer = null;
			flushPath(path).catch(() => void 0);
		}, flushIntervalMs);
	}
	function clearTimer(buf) {
		if (buf.timer) {
			timers.clearTimeout(buf.timer);
			buf.timer = null;
		}
	}
	/**
	* 如果 buffer 已完全空闲（无待 flush 行、无待触发定时器），则从 Map 中清理掉。
	* 长跑场景下 path 含日期 + sessionId，session 关闭后对应 path 不会再写，
	* 不清理会导致 buffers Map 单调增长造成内存泄漏。
	*/
	function maybeEvict(path, buf) {
		if (buf.entries.length === 0 && buf.timer === null) buffers.delete(path);
	}
	async function flushPath(path) {
		const buf = buffers.get(path);
		if (!buf || buf.entries.length === 0) {
			if (buf) {
				clearTimer(buf);
				maybeEvict(path, buf);
			}
			return;
		}
		clearTimer(buf);
		const entries = buf.entries;
		buf.entries = [];
		buf.bytes = 0;
		let joined = "";
		for (const e of entries) try {
			joined += typeof e === "string" ? e : e();
		} catch {}
		if (!joined) {
			maybeEvict(path, buf);
			return;
		}
		try {
			const result = options.flushBatch(path, joined);
			if (result && typeof result.then === "function") {
				const p = result.catch((err) => {
					console.warn("[BufferedChatLogWriter] flushBatch failed:", String(err));
				});
				pending.add(p);
				p.finally(() => {
					pending.delete(p);
				});
				await p;
			}
		} catch (err) {
			console.warn("[BufferedChatLogWriter] flushBatch threw:", String(err));
		} finally {
			const cur = buffers.get(path);
			if (cur) maybeEvict(path, cur);
		}
	}
	function pushEntry(path, entry, byteHint) {
		const buf = ensure(path);
		buf.entries.push(entry);
		buf.bytes += byteHint;
		if (buf.entries.length >= maxLines || buf.bytes >= maxBytes) {
			flushPath(path).catch(() => void 0);
			return;
		}
		scheduleTimer(path, buf);
	}
	return {
		append(path, line) {
			pushEntry(path, line, line.length);
		},
		appendLazy(path, factory) {
			pushEntry(path, factory, 0);
		},
		async flush() {
			const paths = Array.from(buffers.keys());
			await Promise.all(paths.map((p) => flushPath(p)));
			if (pending.size > 0) await Promise.allSettled(Array.from(pending));
		}
	};
}
var DEFAULT_TIMERS;
var init_chat_log = __esmMin((() => {
	DEFAULT_TIMERS = {
		setTimeout: (cb, ms) => globalThis.setTimeout(cb, ms),
		clearTimeout: (handle) => {
			globalThis.clearTimeout(handle);
		}
	};
}));
var init_http = __esmMin((() => {
	Object.freeze({ "x-teams-collab-handoff-canary": "true" });
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-activity.ts
var init_cloud_activity = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-expert.ts
var init_cloud_expert = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/quota-errors.ts
/**
* 把后端 plan + V3.0 真 6 档字段 → 前端统一 tier。
*
* 派生优先级（V3.0 issue #55563）：
*   1. personalTier 是合法 6 档值 → 直接返回（启用真 6 档）
*   2. 否则走 plan v2.0 三档归一兜底：
*      - personal  → experience
*      - pro       → standard
*      - ultimate  → enterprise
*      - 老 envelope 字面量 'experience'/'youth'/.../'enterprise' → 原样返回
*      - 未识别 → experience（最严档）
*
* 设计动机：
*   - V2.0 阶段后端只下发 plan，前端通过本函数兜底到 3 档可达 tier
*   - V3.0 阶段后端额外下发 personalTier（experience/youth/standard/advanced/flagship），
*     前端优先用它直接获得真 6 档，无需 billing 改 GetPaymentType 接口
*   - 老前端读不到 personalTier 时也能正常工作（向前兼容）
*
* @param plan 后端 ownerPlan / plan 字段（personal/pro/ultimate）
* @param personalTier V3.0 BillingProbe 派生的真 6 档 tier 字符串（可选）
*/
function planToTier(plan, personalTier) {
	if (typeof personalTier === "string" && isValidTier(personalTier)) return personalTier;
	if (plan === "personal") return "experience";
	if (plan === "pro") return "standard";
	if (plan === "ultimate") return "enterprise";
	if (typeof plan === "string" && isValidTier(plan)) return plan;
	return "experience";
}
/** 判断字符串是否为合法的 6 档 ProjectVersionTier 之一（V3.0 校验 helper） */
function isValidTier(v) {
	return v === "experience" || v === "youth" || v === "standard" || v === "advanced" || v === "flagship" || v === "enterprise";
}
/** 提取 envelope.code（兼容数字 / 数字字符串 / 字符串 ecode / axios 包装错误） */
function extractEnvelopeCode(raw) {
	if (!raw || typeof raw !== "object") return;
	const err = raw;
	const direct = err.code;
	if (typeof direct === "number") return direct;
	if (typeof direct === "string") return /^\d+$/.test(direct) ? Number(direct) : direct;
	const fromAxios = err.response?.data?.code;
	if (typeof fromAxios === "number") return fromAxios;
	if (typeof fromAxios === "string") return /^\d+$/.test(fromAxios) ? Number(fromAxios) : fromAxios;
}
function isMemberQuotaCode(code) {
	return code === QUOTA_ERROR_CODES.member || code === QUOTA_ERROR_CODES.memberJoinRequest || code === QUOTA_ERROR_CODES.memberJoinRequestName;
}
/** 提取 envelope.data（兼容 axios 包装错误） */
function extractEnvelopeData(raw) {
	if (!raw || typeof raw !== "object") return;
	const err = raw;
	const direct = err.data;
	if (direct && typeof direct === "object") return direct;
	const fromAxios = err.response?.data?.data;
	if (fromAxios && typeof fromAxios === "object") return fromAxios;
}
function normalizeNumber(v, fallback) {
	if (typeof v === "number" && Number.isFinite(v)) return v;
	if (typeof v === "string" && v.trim() && !Number.isNaN(Number(v))) return Number(v);
	return fallback;
}
function normalizeString(v) {
	return typeof v === "string" ? v : void 0;
}
/**
* 把后端 17234 错误 envelope 解析成 `MemberQuotaErrorData`。
*
* 后端响应示例（feat/issue-41536-teams-commercialization-limits 分支）：
*   `{ code: 17234, msg: "...", data: { ownerUid, ownerName, ownerPlan, limit, used } }`
*
* 灰度兼容：老接口 `data` 可能为空 / 字段缺失，调用方传入 `currentUid` 由本函数自动判断 isOwner；
* 缺 ownerUid 时按"非 owner"兜底；缺 ownerName 时由 UI 用占位文案降级。
*
* @param raw         原始错误（throw 出来的对象 / axios error）
* @param currentUid  当前用户 uid（host.accountInfo.userId），用来比对 ownerUid → isOwner
*/
function tryParseMemberQuotaError(raw, currentUid) {
	if (!isMemberQuotaCode(extractEnvelopeCode(raw))) return null;
	const data = extractEnvelopeData(raw) ?? {};
	const ownerUid = normalizeString(data.ownerUid);
	const ownerName = normalizeString(data.ownerName);
	const isOwner = !!(currentUid && ownerUid && currentUid === ownerUid);
	const tier = typeof data.version === "string" && isValidTier(data.version) ? data.version : planToTier(data.ownerPlan, data.personalTier);
	const defaultLimit = PROJECT_QUOTA_LIMITS[tier].member;
	const memberLimit = normalizeNumber(data.limit ?? data.memberLimit, defaultLimit);
	return {
		version: tier,
		memberLimit,
		memberCount: normalizeNumber(data.used ?? data.memberCount, memberLimit),
		isOwner,
		ownerName: ownerName && ownerName.length > 0 ? ownerName : void 0,
		ownerUid,
		freeTrial: typeof data.freeTrial === "boolean" ? data.freeTrial : void 0
	};
}
/**
* 复用「已归一化」的成员配额数据（Desktop RPC 跨进程兼容）。
*
* 背景（issue #55563 回归）：daemon 侧 `cloud-join-request` / `cloud-invitation`
* 捕获 409 后已用 `tryParseMemberQuotaError` 把**原始 envelope**
* （`ownerPlan/personalTier/limit`）归一化成 `MemberQuotaErrorData`
* （`version/memberLimit/...`），再包成 `MemberQuotaExceededError` 抛出。
* 跨 daemon IPC / contextBridge 后该错误退化成普通 `RpcError`，`error.data`
* 即这份**已归一化**的数据。此时若再喂给 `tryParseMemberQuotaError` 当原始
* envelope 二次解析，会因缺 `ownerPlan/personalTier` 让 `planToTier` 兜底成
* `experience`、`limit` 兜底成 5 —— 标准版被误显示成「体验版（5 人）」。
*
* 本函数识别这种「已归一化」负载（有合法 6 档 `version` + 数字 `memberLimit`，
* 原始 envelope 不具备这两个字段）并原样复用，避免二次解析。
*
* @param raw RPC 透传后的错误对象（带 `code` + `data`）
* @returns 命中则返回归一化数据；非成员配额错误 / 非归一化负载返回 null
*/
function tryUseNormalizedMemberQuotaData(raw) {
	if (!raw || typeof raw !== "object") return null;
	if (!isMemberQuotaCode(extractEnvelopeCode(raw))) return null;
	const data = raw.data;
	if (!data || typeof data !== "object") return null;
	const d = data;
	if (typeof d.version !== "string" || !isValidTier(d.version)) return null;
	if (typeof d.memberLimit !== "number" || !Number.isFinite(d.memberLimit)) return null;
	return {
		version: d.version,
		memberLimit: d.memberLimit,
		memberCount: typeof d.memberCount === "number" ? d.memberCount : d.memberLimit,
		isOwner: d.isOwner === true,
		ownerName: typeof d.ownerName === "string" ? d.ownerName : void 0,
		ownerUid: typeof d.ownerUid === "string" ? d.ownerUid : void 0,
		freeTrial: typeof d.freeTrial === "boolean" ? d.freeTrial : void 0
	};
}
/**
* 把后端 17260 错误 envelope 解析成 `ProjectQuotaErrorData`。
*
* 后端响应示例：
*   `{ code: 17260, msg: "...", data: { plan, limit, used } }`
*
* 灰度兼容：
*   - 老版本 / 网络层包装 / 跨进程边界后 `data` 可能整体缺失，或字段不全；
*   - 此时回退到 `PROJECT_QUOTA_LIMITS` 的 tier 默认上限（与 UI 文案预期对齐），
*     而不是把 limit/count 兜底成 0（避免 UI 出现"上限 0 个"的奇怪文案）；
*   - count 缺失时按"已触顶"语义取 limit（用户当前调用就是被 17260 拦截，count 至少等于 limit）。
*/
function tryParseProjectQuotaError(raw) {
	if (extractEnvelopeCode(raw) !== QUOTA_ERROR_CODES.project) return null;
	const data = extractEnvelopeData(raw) ?? {};
	const tier = typeof data.version === "string" && isValidTier(data.version) ? data.version : planToTier(data.plan, data.personalTier);
	const defaultLimit = PROJECT_QUOTA_LIMITS[tier].project;
	const projectLimit = normalizeNumber(data.limit ?? data.projectLimit, defaultLimit);
	return {
		version: tier,
		projectLimit,
		projectCount: normalizeNumber(data.used ?? data.projectCount, projectLimit),
		freeTrial: typeof data.freeTrial === "boolean" ? data.freeTrial : void 0
	};
}
/** 检查是否为 17261 exclusive 错误 */
function isExclusivePlanError(raw) {
	return extractEnvelopeCode(raw) === QUOTA_ERROR_CODES.exclusive;
}
var PROJECT_QUOTA_LIMITS, QUOTA_ERROR_CODES, MemberQuotaExceededError, ProjectQuotaExceededError, ExclusivePlanNotSupportedError;
var init_quota_errors = __esmMin((() => {
	PROJECT_QUOTA_LIMITS = {
		experience: {
			project: 5,
			member: 5
		},
		youth: {
			project: 10,
			member: 5
		},
		standard: {
			project: 10,
			member: 5
		},
		advanced: {
			project: 15,
			member: 8
		},
		flagship: {
			project: 20,
			member: 10
		},
		enterprise: {
			project: 100,
			member: 1e3
		}
	};
	QUOTA_ERROR_CODES = {
		/** 17234 · 邀请链路项目成员已达上限（C2/C3/C4） */
		member: 17234,
		/** 17273 · 加入申请审批链路项目成员已达上限（J3） */
		memberJoinRequest: 17273,
		/** 本地 / 测试环境可能返回字符串 ecode。 */
		memberJoinRequestName: "TeamsJoinRequestMemberCapacity",
		/** 17260 · 当前用户可创建项目数已达档位上限（C1） */
		project: 17260,
		/** 17261 · exclusive 专享版不支持本能力（N1/C1/C2/C3/C4） */
		exclusive: 17261
	};
	MemberQuotaExceededError = class MemberQuotaExceededError extends Error {
		constructor(data, message) {
			super(message ?? "Project member quota exceeded");
			this.code = QUOTA_ERROR_CODES.member;
			this.name = "MemberQuotaExceededError";
			this.data = data;
			Object.setPrototypeOf(this, MemberQuotaExceededError.prototype);
		}
	};
	ProjectQuotaExceededError = class ProjectQuotaExceededError extends Error {
		constructor(data, message) {
			super(message ?? "Project quota exceeded");
			this.code = QUOTA_ERROR_CODES.project;
			this.name = "ProjectQuotaExceededError";
			this.data = data;
			Object.setPrototypeOf(this, ProjectQuotaExceededError.prototype);
		}
	};
	ExclusivePlanNotSupportedError = class ExclusivePlanNotSupportedError extends Error {
		constructor(message) {
			super(message ?? "Exclusive plan is not supported for Teams");
			this.code = QUOTA_ERROR_CODES.exclusive;
			this.name = "ExclusivePlanNotSupportedError";
			Object.setPrototypeOf(this, ExclusivePlanNotSupportedError.prototype);
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-invitation.ts
var init_cloud_invitation = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-join-request.ts
var init_cloud_join_request = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-manifest.ts
var init_cloud_manifest = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-member.ts
var init_cloud_member = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-project.ts
var init_cloud_project = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-todo-utils.ts
var init_cloud_todo_utils = __esmMin((() => {
	init_http();
})), MESSAGE_FIELDS;
var init_cloud_project_message = __esmMin((() => {
	init_cloud_todo_utils();
	MESSAGE_FIELDS = `
    id content author { id name displayName } parentId editCount source createdAt updatedAt isDeleted
    attachments { 
    attachmentId provider externalId name fileType fileSize externalUrl
 }
`;
	`${MESSAGE_FIELDS}`;
	`${MESSAGE_FIELDS}`;
	`${MESSAGE_FIELDS}`;
	`${MESSAGE_FIELDS}`;
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-skill.ts
var init_cloud_skill = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-task.ts
var init_cloud_task = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-task-collaboration.ts
var init_cloud_task_collaboration = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-task-queue.ts
var init_cloud_task_queue = __esmMin((() => {})), TODO_CORE_FIELDS, TODO_DETAIL_FIELDS;
var init_cloud_todo = __esmMin((() => {
	init_cloud_todo_utils();
	TODO_CORE_FIELDS = `
    id
    projectId
    title
    description
    priority
    source
    sourceExternalId
    sourceExternalUrl
    tags
    summary
    sessions { sessionId createdBy { id name } createdAt }
    dueDate
    startedAt
    completedAt
    pauseReason
    createdAt
    updatedAt
    status { id name type }
    creator { id name }
    assignees { id name }
    handoffFrom { id }
    handoffNote
    handoffSessionId
`;
	TODO_DETAIL_FIELDS = `
    ${TODO_CORE_FIELDS}
    snapshotSessionId
    subscribers { id name }
    allowedTransitions { id name type }
    attachments { id provider externalId name fileType fileSize externalUrl uploadedBy { id name } createdAt }
    history { nodes { id actorId field oldValue newValue createdAt } totalCount }
`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_DETAIL_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
})), COMMENT_FIELDS;
var init_cloud_todo_comment = __esmMin((() => {
	init_cloud_todo_utils();
	COMMENT_FIELDS = `
    id content source author { id name displayName } parentId editCount createdAt updatedAt isDeleted
    replies { id content source author { id name displayName } parentId editCount createdAt updatedAt isDeleted }
`;
	`${COMMENT_FIELDS}`;
	`${COMMENT_FIELDS}`;
	`${COMMENT_FIELDS}`;
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-todo-sync-source.ts
var init_cloud_todo_sync_source = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-todo-webhook.ts
var init_cloud_todo_webhook = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/cloud-repo.ts
var init_cloud_repo$1 = __esmMin((() => {
	init_cloud_activity();
	init_cloud_expert();
	init_cloud_invitation();
	init_cloud_join_request();
	init_cloud_manifest();
	init_cloud_member();
	init_cloud_project();
	init_cloud_project_message();
	init_cloud_skill();
	init_cloud_task();
	init_cloud_task_collaboration();
	init_cloud_task_queue();
	init_cloud_todo();
	init_cloud_todo_comment();
	init_cloud_todo_sync_source();
	init_cloud_todo_webhook();
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/todo-netdisk-attachment-service.ts
async function findChildFolderId(client, parentId, folderName) {
	let cursor = "";
	do {
		const result = await client.dir.list({
			parentID: parentId || void 0,
			cursor,
			limit: 100,
			entryKind: 1
		});
		const matched = result.entries.find((entry) => entry.kind === 2 && entry.name === folderName);
		if (matched?.fileID) return matched.fileID;
		cursor = result.nextCursor || "";
	} while (cursor);
	return "";
}
async function ensureChildFolder(client, parentId, folderName, appId) {
	const existingId = await findChildFolderId(client, parentId, folderName);
	if (existingId) return existingId;
	try {
		const result = await client.dir.create({
			parentID: parentId || void 0,
			name: folderName,
			appId
		});
		if (result.fileID) return result.fileID;
	} catch (error) {
		const createdByConcurrentRequest = await findChildFolderId(client, parentId, folderName);
		if (createdByConcurrentRequest) return createdByConcurrentRequest;
		throw error;
	}
	const createdId = await findChildFolderId(client, parentId, folderName);
	if (createdId) return createdId;
	throw new Error(`创建网盘目录失败：${folderName}`);
}
/** 确保项目网盘中存在 `${rootFolderName ?? '待办附件'}/<todoId>`，返回 `<todoId>` 子目录 ID。 */
async function ensureProjectTodoNetdiskAttachmentFolder(client, params) {
	const todoId = params.todoId.trim();
	if (!todoId) throw new Error("创建待办附件目录失败：缺少待办 ID");
	return ensureChildFolder(client, await ensureChildFolder(client, params.rootFolderId ?? "", params.rootFolderName ?? DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME, params.appId), todoId, params.appId);
}
/**
* 确保项目网盘中存在 `${rootFolderName ?? '系统文件'}/<bucketName>`，返回 bucket 子目录 ID。
* 留言附件专用：不要求 todoId，所有未关联到 messageId 的上传统一进 draft 子目录。
*/
async function ensureProjectMessageNetdiskAttachmentFolder(client, params = {}) {
	const rootFolderId = params.rootFolderId ?? "";
	const rootFolderName = params.rootFolderName ?? DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME;
	const bucketName = (params.bucketName ?? DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME).trim() || DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME;
	return ensureChildFolder(client, await ensureChildFolder(client, rootFolderId, rootFolderName, params.appId), bucketName, params.appId);
}
var DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME, DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME;
var init_todo_netdisk_attachment_service = __esmMin((() => {
	DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME = "系统文件";
	DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME = "draft";
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/file-tree-utils.ts
function convertEntriesToTreeEntries(entries, basePath, depth) {
	const nodeMap = /* @__PURE__ */ new Map();
	const rootNodes = [];
	const normBasePath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
	const normalizePath = (p) => p.endsWith("/") ? p.slice(0, -1) : p;
	const getDepthLevel = (p) => {
		return (p.startsWith(normBasePath) ? p.slice(normBasePath.length) : p).split("/").filter((s) => s.length > 0).length;
	};
	for (const entry of entries) {
		const fullPath = normalizePath(entry.path || `${normBasePath}/${entry.name}`);
		const isFile = entry.type === "file";
		const node = {
			path: fullPath,
			name: entry.name,
			type: isFile ? "file" : "dir",
			children: !isFile ? [] : void 0,
			isLoaded: isFile ? void 0 : false
		};
		nodeMap.set(fullPath, node);
	}
	const ensureParent = (childPath) => {
		const parentPath = childPath.substring(0, childPath.lastIndexOf("/"));
		if (parentPath === normBasePath || parentPath === "") return null;
		if (nodeMap.has(parentPath)) return nodeMap.get(parentPath);
		const implicitDir = {
			path: parentPath,
			name: parentPath.substring(parentPath.lastIndexOf("/") + 1),
			type: "dir",
			children: [],
			isLoaded: false
		};
		nodeMap.set(parentPath, implicitDir);
		const grandParent = ensureParent(parentPath);
		if (grandParent?.children) grandParent.children.push(implicitDir);
		else rootNodes.push(implicitDir);
		return implicitDir;
	};
	for (const entry of entries) {
		const fullPath = normalizePath(entry.path || `${normBasePath}/${entry.name}`);
		const node = nodeMap.get(fullPath);
		if (!node) continue;
		const parentPath = fullPath.substring(0, fullPath.lastIndexOf("/"));
		if (parentPath === normBasePath || parentPath === "") rootNodes.push(node);
		else {
			const parent = ensureParent(fullPath);
			if (parent?.children) parent.children.push(node);
			else rootNodes.push(node);
		}
	}
	for (const node of nodeMap.values()) if (node.type === "dir") node.isLoaded = getDepthLevel(node.path) < depth || !!(node.children && node.children.length > 0);
	const sortNodes = (nodes) => {
		nodes.sort((a, b) => {
			if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
			return a.name.localeCompare(b.name, void 0, {
				numeric: true,
				sensitivity: "base"
			});
		});
		for (const node of nodes) if (node.children) sortNodes(node.children);
	};
	sortNodes(rootNodes);
	return rootNodes;
}
var init_file_tree_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-core/src/domains/netdrive/common/facade.ts
var init_facade = __esmMin((() => {}));
var init_dist = __esmMin((() => {
	require_dist();
}));
//#endregion
//#region ../../packages/workbuddy-core/src/domains/netdrive/common/cloud-repo.ts
var init_cloud_repo = __esmMin((() => {
	init_dist();
}));
//#endregion
//#region ../../packages/workbuddy-core/src/domains/netdrive/common/file-policy.ts
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
		disabledReason: "暂不支持读取未知类型文件"
	};
	if (isImageExtension(extension)) {
		const maxSize = NETDRIVE_FILE_SIZE_LIMITS.IMAGE_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "image",
			extension,
			mimeType: input.mimeType || IMAGE_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: `图片超过 ${formatMb(maxSize)}，暂不支持选择`
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
			disabledReason: `文件超过 ${formatMb(maxSize)}，暂不支持选择`
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
			disabledReason: `文件超过 ${formatMb(maxSize)}，暂不支持选择`
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
		disabledReason: `暂不支持读取 .${extension} 类型文件`
	};
}
var IMAGE_EXTENSIONS, TEXT_DOCUMENT_EXTENSIONS, CODE_EXTENSIONS, OFFICE_DOCUMENT_EXTENSIONS, IMAGE_MIME_TYPES, TEXT_MIME_TYPES, OFFICE_MIME_TYPES, NETDRIVE_FILE_SIZE_LIMITS;
var init_file_policy = __esmMin((() => {
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
//#region ../../packages/workbuddy-core/src/domains/netdrive/common/index.ts
var init_common = __esmMin((() => {
	init_facade();
	init_cloud_repo();
	init_file_policy();
}));
//#endregion
//#region ../../packages/workbuddy-core/src/domains/netdrive/index.ts
var init_netdrive = __esmMin((() => {
	init_common();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/my-files/netdrive-file-policy.ts
var init_netdrive_file_policy = __esmMin((() => {
	init_netdrive();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/netdrive-attachments.ts
/**
* 入口：扫描 prompt blocks，收集 netdrive resource_link，渲染成 system-reminder
* text block，返回新的 prompt。无附件或 prompt 是字符串时直接返回原值。
*
* issue #67431 · 阶段 4：additional-data 单块聚合语义。
* 前端 `resolve-and-send-prompt.ts::buildContextBlocks` 已经把
* `<todo-reference>` / `<message-reference>` / `<tdrive_attachments>`（@todo
* 关联附件） / `<additional_data>current_time` 聚合到唯一一个
* `data-role="additional-data"` reminder block。daemon 侧本函数发现前端已
* 存在 additional-data reminder 时，把新的 `<tdrive_attachments>` XML **拼进
* 那个 block**，避免出现两个并列的 additional-data reminder（LLM / langfuse
* 视觉上会拆成两块，破坏 Teams 上下文策略 §5.2 的单块聚合口径）。
* 前端未注入 additional-data 时（例如老前端 / 无 chip 触发），fallback 到
* 原逻辑单起一个 reminder block。
*/
function injectNetDriveAttachments(prompt) {
	if (typeof prompt === "string" || !Array.isArray(prompt)) return prompt;
	const items = collectNetDriveItems(prompt);
	if (items.length === 0) return prompt;
	const attachmentsXml = renderNetDriveAttachments(items).join("\n");
	const strippedBlocks = prompt.map((block) => stripNetDriveUri(block));
	const additionalDataIndex = findAdditionalDataReminderIndex(strippedBlocks);
	if (additionalDataIndex >= 0) {
		const merged = mergeIntoAdditionalDataReminder(strippedBlocks[additionalDataIndex], attachmentsXml);
		const next = [...strippedBlocks];
		next[additionalDataIndex] = merged;
		return next;
	}
	return [{
		type: "text",
		text: wrapHiddenContextXml(attachmentsXml, ADDITIONAL_DATA_ROLE)
	}, ...strippedBlocks];
}
/**
* 定位前端已注入的 additional-data reminder text block（存在最多一个）。
* 前端 `wrapHiddenContextXml(_, ADDITIONAL_DATA_ROLE)` 输出的 text 形如：
*   `<system-reminder data-role="additional-data">\n{xml}\n</system-reminder>`
*/
function findAdditionalDataReminderIndex(blocks) {
	for (let i = 0; i < blocks.length; i++) {
		const b = blocks[i];
		if (b.type !== "text") continue;
		if (isAdditionalDataReminder(typeof b.text === "string" ? b.text : "")) return i;
	}
	return -1;
}
function isAdditionalDataReminder(text) {
	return /^<system-reminder\s+data-role="additional-data">/.test(text.trimStart()) && /<\/system-reminder>\s*$/.test(text);
}
/**
* 把 `<tdrive_attachments>` XML 追加到既有 additional-data reminder 内。
* 保留原 reminder open/close 标签与原有内容，仅在 `</system-reminder>` 之前
* 插入两行空行 + `<tdrive_attachments>` 段（与前端 `joinParts('\n\n')` 语义一致）。
*/
function mergeIntoAdditionalDataReminder(reminder, attachmentsXml) {
	const text = typeof reminder.text === "string" ? reminder.text : "";
	const closeIdx = text.lastIndexOf("</system-reminder>");
	if (closeIdx < 0) return {
		...reminder,
		type: "text",
		text: `${text}\n${wrapHiddenContextXml(attachmentsXml, ADDITIONAL_DATA_ROLE)}`
	};
	const head = text.slice(0, closeIdx).trimEnd();
	const tail = text.slice(closeIdx);
	return {
		...reminder,
		type: "text",
		text: `${head}\n\n${attachmentsXml}\n${tail}`
	};
}
function isNetDriveResourceLink(block) {
	return block.type === "resource_link" && typeof block.uri === "string" && block.uri.startsWith("netdrive://");
}
function stripNetDriveUri(block) {
	const record = block;
	if (!isNetDriveResourceLink(record)) return block;
	const next = {
		...record,
		uri: ""
	};
	if (record._meta && typeof record._meta === "object") {
		const meta = { ...record._meta };
		if ("url" in meta) meta.url = "";
		if ("uri" in meta) meta.uri = "";
		next._meta = meta;
	}
	return next;
}
function collectNetDriveItems(blocks) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const block of blocks) {
		if (block.type !== "resource_link") continue;
		const link = block;
		if (typeof link.uri !== "string" || !link.uri.startsWith("netdrive://")) continue;
		const meta = link._meta ?? {};
		const parsed = parseNetDriveUri(link.uri);
		const fileId = readString(meta.fileId);
		if (!fileId) {
			console.warn("[ProjectChat] netdrive resource_link missing meta.fileId, skip", {
				uri: link.uri,
				name: link.name,
				parsedPath: parsed?.path,
				metaKeys: Object.keys(meta)
			});
			continue;
		}
		const isFolder = readBoolean(meta.isFolder) ?? readBoolean(meta.folder) ?? (parsed?.itemType === "folder" || readString(meta.itemType) === "folder" || readString(meta.type) === "folder");
		const itemType = isFolder ? "folder" : "file";
		const key = `${itemType}:${fileId.toLowerCase()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const title = readString(meta.title) ?? readString(meta.fileName) ?? readString(meta.name) ?? (typeof link.name === "string" && link.name ? link.name : fileId);
		const numericSize = readNumber(meta.fileSize) ?? readNumber(meta.size);
		const policy = classifyNetDriveItem({
			name: title,
			size: numericSize,
			isFolder,
			extension: readString(meta.extension) ?? readString(meta.ext) ?? getExtension(title),
			mimeType: readString(meta.mimeType) ?? readString(meta.mime_type)
		});
		result.push({
			fileId,
			title,
			itemType,
			kind: policy.kind,
			extension: policy.extension,
			mimeType: policy.mimeType,
			size: numericSize !== void 0 ? String(numericSize) : void 0,
			canSelect: policy.canSelect,
			disabledReason: policy.disabledReason
		});
	}
	return result;
}
/**
* 渲染 `<tdrive_attachments>` 块（Teams 上下文策略 §4.2）。
*
* 输出形态：
* ```
* <tdrive_attachments>
* <导语>
* <file id="..." title="..." item_type="file|folder" />
* ...
* </tdrive_attachments>
* ```
*
* 按策略 §4.2 只保留三个属性（`id` / `title` / `item_type`）—— minimal addressable。
* `kind` / `readable` / `ext` / `mime_type` / `size` / `disabledReason` 等模型辅助字段
* 按「不同文件类型由 netdrive__tdrive MCP 内部按类型分发处理」的口径下沉到 MCP。
*/
function renderNetDriveAttachments(items) {
	const xml = formatTdriveAttachmentsXml(items.map((item) => ({
		id: item.fileId,
		title: item.title,
		itemType: item.itemType
	})));
	return xml ? xml.split("\n") : [];
}
function parseNetDriveUri(uri) {
	if (!uri.startsWith("netdrive://")) return;
	const rest = uri.slice(11);
	const queryIndex = rest.indexOf("?");
	const path = decodeURIComponentSafe(queryIndex >= 0 ? rest.slice(0, queryIndex) : rest);
	const query = queryIndex >= 0 ? rest.slice(queryIndex + 1) : "";
	let itemType;
	for (const pair of query.split("&")) {
		const [rawKey, rawValue = ""] = pair.split("=");
		const key = decodeURIComponentSafe(rawKey);
		const value = decodeURIComponentSafe(rawValue);
		if (key === "type" && (value === "file" || value === "folder")) itemType = value;
	}
	return {
		path,
		itemType
	};
}
function decodeURIComponentSafe(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function readString(value) {
	if (typeof value === "string") return value.trim().length > 0 ? value.trim() : void 0;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
}
function readBoolean(value) {
	if (typeof value === "boolean") return value;
	if (typeof value === "string") {
		const normalized = value.trim().toLowerCase();
		if (normalized === "true") return true;
		if (normalized === "false") return false;
	}
}
function readNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && value.trim()) {
		const parsed = Number(value.trim());
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
function getExtension(name) {
	const last = name.split(".").pop();
	return last && last !== name ? last.toLowerCase() : void 0;
}
var init_netdrive_attachments = __esmMin((() => {
	init_common$2();
	init_netdrive_file_policy();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/acp-terminal-error-telemetry.ts
function truncateErrorMessage(text) {
	let sanitized = text.trim();
	if (!sanitized) return;
	sanitized = sanitized.replace(/Bearer\s+[A-Za-z0-9._~+\-/]+=*/gi, "Bearer [REDACTED]").replace(/(token|access_token|authToken|authorization|cookie)=([^\s&]+)/gi, "$1=[REDACTED]");
	return sanitized.length > ERROR_MESSAGE_MAX_LENGTH$1 ? sanitized.slice(0, ERROR_MESSAGE_MAX_LENGTH$1) : sanitized;
}
function withTruncatedMessage(text) {
	if (!text) return {};
	const errorMessage = truncateErrorMessage(text);
	return errorMessage ? { errorMessage } : {};
}
/** cancelled* 不参与抽码，避免把取消口径写成错误码。 */
function isCancelledLikeStopReason(reason) {
	if (OMITTED_STOP_REASONS.has(reason) && reason !== "end_turn") return true;
	const lower = reason.toLowerCase();
	return lower.startsWith("cancel") || lower.startsWith("interrupt");
}
function isOmittedStopReason(reason) {
	if (!reason || OMITTED_STOP_REASONS.has(reason)) return true;
	return isCancelledLikeStopReason(reason);
}
function asCodeString(value) {
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	if (typeof value === "string") return value.trim() || void 0;
}
function errorKindForCode(code, category) {
	if (code === "429") return "rate_limit";
	if (typeof category === "string" && category.trim()) return category.trim();
	return "acp_error";
}
/** 读取 ACP `_meta` 中兼容的新旧 errorMessage 表达。 */
function readAcpErrorMessageFromMeta(meta) {
	if (!meta || typeof meta !== "object" || Array.isArray(meta)) return;
	const rec = meta;
	const flat = rec["codebuddy.ai/errorMessage"];
	if (typeof flat === "string" && flat.trim()) return flat;
	const nested = rec["codebuddy.ai"];
	if (nested && typeof nested === "object" && !Array.isArray(nested)) {
		const message = nested.errorMessage;
		if (typeof message === "string" && message.trim()) return message;
	}
}
/**
* 从错误提示抽错误码：前导 429，或整段 `{...}` JSON。
* JSON 优先业务码 `data.code`（如 14012），再 `details.code`，最后才用顶层 JSON-RPC `code`（如 -32003）。
*/
function extractCodedErrorFromText(hint) {
	const text = typeof hint === "string" ? hint.trim() : "";
	if (!text) return;
	if (RATE_LIMIT_HINT.test(text)) return {
		errorCode: "429",
		errorKind: "rate_limit",
		...withTruncatedMessage(text)
	};
	if (!text.startsWith("{")) return;
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		return;
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
	const rec = parsed;
	const data = rec.data && typeof rec.data === "object" && !Array.isArray(rec.data) ? rec.data : void 0;
	const details = rec.details && typeof rec.details === "object" && !Array.isArray(rec.details) ? rec.details : void 0;
	const code = asCodeString(data?.code) ?? asCodeString(details?.code) ?? asCodeString(rec.errorCode) ?? asCodeString(rec.code);
	if (!code) return;
	const message = typeof rec.message === "string" ? rec.message : void 0;
	return {
		errorCode: code,
		errorKind: errorKindForCode(code, data?.category ?? details?.category ?? rec.category),
		...withTruncatedMessage(message || text)
	};
}
/**
* 优先级：文案抽码 > 非省略 stopReason。end_turn/缺省只要抽到码仍返回；cancelled* 整段省略。
*/
function classifyAcpTerminalErrorTelemetry(stopReason, assistantTextHint) {
	const reason = typeof stopReason === "string" ? stopReason.trim() : "";
	if (reason && isCancelledLikeStopReason(reason)) return;
	const fromText = extractCodedErrorFromText(assistantTextHint);
	if (fromText) return fromText;
	if (!reason || isOmittedStopReason(reason)) return;
	const withMessage = withTruncatedMessage(typeof assistantTextHint === "string" ? assistantTextHint.trim() : "");
	if (reason === "refusal") return {
		errorCode: "refusal",
		errorKind: "refusal",
		...withMessage
	};
	return {
		errorCode: reason,
		errorKind: reason,
		...withMessage
	};
}
/** PromptResponse._meta 上可能带的拒绝文案（无 assistant chunk）。 */
function readPromptResponseErrorHint(response) {
	if (!response || typeof response !== "object") return;
	return readAcpErrorMessageFromMeta(response._meta);
}
function toCloudSandboxAcpErrorFields(classified) {
	return {
		error_kind: classified.errorKind,
		error_code: classified.errorCode,
		...classified.errorMessage ? { error_message: classified.errorMessage } : {}
	};
}
var ERROR_MESSAGE_MAX_LENGTH$1, RATE_LIMIT_HINT, OMITTED_STOP_REASONS;
var init_acp_terminal_error_telemetry = __esmMin((() => {
	ERROR_MESSAGE_MAX_LENGTH$1 = 200;
	RATE_LIMIT_HINT = /^(?:Internal error:\s*)?429\b/;
	OMITTED_STOP_REASONS = /* @__PURE__ */ new Set([
		"end_turn",
		"cancelled",
		"interruptedByUser",
		"interrupted_by_user"
	]);
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/cloud-sandbox-telemetry.ts
function redactCloudSandboxText(value) {
	let text = value instanceof Error ? value.message : String(value ?? "");
	for (const [pattern, replacement] of TOKEN_PATTERNS) text = text.replace(pattern, replacement);
	text = text.replace(URL_PATTERN, (url) => {
		try {
			const parsed = new URL(url);
			return `${parsed.origin}${parsed.pathname.replace(/\/[^/]*$/, "/[REDACTED]")}`;
		} catch {
			return "[REDACTED_URL]";
		}
	}).replace(WINDOWS_PATH_PATTERN, "[REDACTED_PATH]").replace(UNIX_PATH_PATTERN, (path) => path.startsWith("/workspace") ? "/workspace/[REDACTED]" : "[REDACTED_PATH]");
	return text.length > ERROR_MESSAGE_MAX_LENGTH ? text.slice(0, ERROR_MESSAGE_MAX_LENGTH) : text;
}
function classifyCloudSandboxError(error) {
	const err = error;
	const status = typeof err?.status === "number" ? err.status : typeof err?.response?.status === "number" ? err.response.status : void 0;
	const code = typeof err?.code === "string" && err.code.length <= 64 ? err.code : status !== void 0 ? `HTTP_${status}` : void 0;
	let kind = "unknown";
	switch (true) {
		case code === "AbortError" || code === "ABORT_ERR":
			kind = "cancelled";
			break;
		case status === 401 || status === 403:
			kind = "auth";
			break;
		case status === 404:
			kind = "not_found";
			break;
		case status === 429:
			kind = "rate_limit";
			break;
		case typeof status === "number" && status >= 500:
			kind = "server_error";
			break;
		case typeof status === "number" && status >= 400:
			kind = "client_error";
			break;
		case typeof code === "string" && /ECONN|ETIMEDOUT|ENOTFOUND|NETWORK/i.test(code): kind = "network";
	}
	return {
		error_kind: kind,
		...code ? { error_code: code } : {},
		error_message: redactCloudSandboxText(error)
	};
}
function cloudSandboxDurationSince(startedAt) {
	return Math.max(0, Math.round(Date.now() - startedAt));
}
function buildCloudSandboxPayload(reporter, fields) {
	const out = { surface: reporter.surface };
	const entries = [
		["project_id", fields.projectId],
		["conversation_id", fields.conversationId],
		["session_id", fields.sessionId],
		["sandbox_id", fields.sandboxId],
		["request_id", fields.requestId],
		["trace_id", fields.traceId],
		...Object.entries(fields).filter(([key]) => ALLOWED_EXTRA_KEYS.has(key))
	];
	for (const [key, value] of entries) {
		if (value === void 0 || value === null) continue;
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") out[key] = typeof value === "string" ? redactCloudSandboxText(value) : value;
	}
	out.ext1 = reporter.surface;
	const outcome = typeof fields.outcome === "string" ? fields.outcome : "";
	out.ext2 = (typeof fields.error_kind === "string" ? fields.error_kind : "") || outcome || "none";
	const durationMs = typeof fields.duration_ms === "number" ? fields.duration_ms : void 0;
	out.ext3 = durationMs !== void 0 ? String(durationMs) : "";
	return out;
}
function emit(reporter, eventName, fields) {
	if (!reporter) return;
	try {
		reporter.reportEvent(eventName, buildCloudSandboxPayload(reporter, fields));
	} catch {}
}
/**
* Span key：多个并发 session / prompt 各自需要独立 span，用 sessionId 优先，
* 兜底 sandboxId / requestId / conversationId。全空返回空串代表"不建 span"。
*/
function spanKey(fields) {
	return fields.sessionId || fields.requestId || fields.sandboxId || fields.conversationId || "";
}
function toSpanAttributes(surface, fields) {
	const attrs = { "workbuddy.surface": surface };
	for (const [attrKey, fieldKey] of SPAN_ATTR_KEYS) {
		const value = fields[fieldKey];
		if (typeof value === "string" && value) attrs[attrKey] = value;
	}
	for (const [key, value] of Object.entries(fields)) {
		if (!SPAN_EXTRA_KEYS.has(key) || value === void 0 || value === null) continue;
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") attrs[`workbuddy.${key}`] = typeof value === "string" ? redactCloudSandboxText(value) : value;
	}
	return attrs;
}
function toEventAttributes(fields) {
	const attrs = {};
	for (const [key, value] of Object.entries(fields)) {
		if (!SPAN_EXTRA_KEYS.has(key) || value === void 0 || value === null) continue;
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") attrs[`workbuddy.${key}`] = typeof value === "string" ? redactCloudSandboxText(value) : value;
	}
	return attrs;
}
function summarizeArtifactTypes(entries) {
	const counts = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const type = typeof entry?.artifact?.type === "string" && entry.artifact.type ? entry.artifact.type : "unknown";
		counts.set(type, (counts.get(type) ?? 0) + 1);
	}
	return Array.from(counts.entries()).map(([type, count]) => `${type}:${count}`).join(",");
}
var ERROR_MESSAGE_MAX_LENGTH, ALLOWED_EXTRA_KEYS, TOKEN_PATTERNS, URL_PATTERN, UNIX_PATH_PATTERN, WINDOWS_PATH_PATTERN, CLOUD_SANDBOX_TRACER, SPAN_ATTR_KEYS, SPAN_EXTRA_KEYS, SPAN_ORPHAN_TIMEOUT_MS, CloudSandboxTelemetryObserver;
var init_cloud_sandbox_telemetry = __esmMin((() => {
	init_esm();
	ERROR_MESSAGE_MAX_LENGTH = 500;
	ALLOWED_EXTRA_KEYS = /* @__PURE__ */ new Set([
		"event_stage",
		"outcome",
		"duration_ms",
		"cold_start",
		"reuse_type",
		"session_mode",
		"mode",
		"model",
		"operation",
		"filesystem_source",
		"artifact_count",
		"artifact_types",
		"artifact_event",
		"sync_source",
		"close_reason",
		"error_kind",
		"error_code",
		"error_message",
		"message_count",
		"chunk_type"
	]);
	TOKEN_PATTERNS = [
		[/Bearer\s+[A-Za-z0-9._~+\-/]+=*/gi, "Bearer [REDACTED]"],
		[/(token|access_token|authToken|authorization|cookie)=([^\s&]+)/gi, "$1=[REDACTED]"],
		[/(sk-[A-Za-z0-9]{16,})/g, "[REDACTED_TOKEN]"],
		[/(ghp_[A-Za-z0-9_]+)/g, "[REDACTED_TOKEN]"]
	];
	URL_PATTERN = /https?:\/\/[^\s)"']+/gi;
	UNIX_PATH_PATTERN = /(?:\/[A-Za-z0-9._-]+){2,}/g;
	WINDOWS_PATH_PATTERN = /(?:[A-Za-z]:[\\/]|\\\\)[^\s)"']+/g;
	CLOUD_SANDBOX_TRACER = "cloud-sandbox";
	SPAN_ATTR_KEYS = [
		["workbuddy.project_id", "projectId"],
		["workbuddy.conversation_id", "conversationId"],
		["workbuddy.session_id", "sessionId"],
		["workbuddy.sandbox_id", "sandboxId"],
		["workbuddy.request_id", "requestId"],
		["workbuddy.trace_id", "traceId"]
	];
	SPAN_EXTRA_KEYS = /* @__PURE__ */ new Set([
		"mode",
		"model",
		"cold_start",
		"reuse_type",
		"session_mode",
		"operation",
		"filesystem_source",
		"artifact_count",
		"artifact_types",
		"artifact_event",
		"sync_source",
		"close_reason",
		"message_count",
		"chunk_type"
	]);
	SPAN_ORPHAN_TIMEOUT_MS = 3e5;
	CloudSandboxTelemetryObserver = class {
		/**
		* @param reporter aegis metric 通道；undefined 时 metric 上报静默 no-op。
		* @param parentSpanGetter 可选：Renderer 侧用 StackContextManager，async 后 `context.active()`
		*   会丢 active span 导致 Observer 建的 span 挂到 root（自成新 traceId）。传入此 getter 让
		*   Observer 主动从 caller 拿当前对话父 span 作 parent（如 chatSpanRef.current）。
		*   Daemon / Node 侧 AsyncHooks 稳定，可以不传，走默认 `context.active()`。
		*/
		constructor(reporter, parentSpanGetter) {
			this.reporter = reporter;
			this.parentSpanGetter = parentSpanGetter;
			this.sessionSpans = /* @__PURE__ */ new Map();
			this.connectTaskSpans = /* @__PURE__ */ new Map();
			this.promptSpans = /* @__PURE__ */ new Map();
			this.spanTimeouts = /* @__PURE__ */ new WeakMap();
		}
		emitEvent(eventName, baseFields, error) {
			const fields = error === void 0 ? baseFields : {
				...baseFields,
				...classifyCloudSandboxError(error)
			};
			emit(this.reporter, eventName, fields);
		}
		surface() {
			return this.reporter?.surface ?? "web";
		}
		startSpan(map, spanName, fields) {
			const key = spanKey(fields);
			if (!key) return;
			const stale = map.get(key);
			if (stale) {
				this.disarmOrphanTimeout(stale);
				stale.setAttribute("workbuddy.outcome", "orphan");
				stale.end();
			}
			try {
				const span = trace.getTracer(CLOUD_SANDBOX_TRACER).startSpan(spanName, {
					kind: SpanKind.CLIENT,
					attributes: toSpanAttributes(this.surface(), fields)
				}, this.pickParentContext());
				map.set(key, span);
				this.armOrphanTimeout(span);
			} catch {}
		}
		/** parent 优先级：调用方注入的 getter（renderer 场景） → context.active()（daemon 场景）。 */
		pickParentContext() {
			const injectedParent = this.parentSpanGetter?.();
			return injectedParent ? trace.setSpan(ROOT_CONTEXT, injectedParent) : context.active();
		}
		/**
		* 挂"漏 end 兜底"：SPAN_ORPHAN_TIMEOUT_MS 后如果 span 还没被正常 end，强制 orphan
		* 结束。找 span 在 sessionSpans / promptSpans 里的位置并从 map 里移除避免残留。
		*/
		armOrphanTimeout(span) {
			const handle = setTimeout(() => this.evictOrphan(span), SPAN_ORPHAN_TIMEOUT_MS);
			handle.unref?.();
			this.spanTimeouts.set(span, handle);
		}
		disarmOrphanTimeout(span) {
			const handle = this.spanTimeouts.get(span);
			if (handle) {
				clearTimeout(handle);
				this.spanTimeouts.delete(span);
			}
		}
		evictOrphan(span) {
			this.spanTimeouts.delete(span);
			for (const [key, s] of this.sessionSpans) if (s === span) {
				this.sessionSpans.delete(key);
				try {
					span.setAttribute("workbuddy.outcome", "orphan");
					span.setAttribute("workbuddy.dispose_reason", "timeout");
					span.end();
				} catch {}
				return;
			}
			for (const [key, s] of this.connectTaskSpans) if (s === span) {
				this.connectTaskSpans.delete(key);
				try {
					span.setAttribute("workbuddy.outcome", "orphan");
					span.setAttribute("workbuddy.dispose_reason", "timeout");
					span.end();
				} catch {}
				return;
			}
			for (const [key, bundle] of this.promptSpans) if (bundle.root === span) {
				this.promptSpans.delete(key);
				this.disposeBundle(bundle, "timeout");
				return;
			}
		}
		finalizeSpan(map, fields, statusCode, error) {
			const key = spanKey(fields);
			if (!key) return;
			const span = map.get(key);
			if (!span) return;
			map.delete(key);
			this.disarmOrphanTimeout(span);
			try {
				const outcome = typeof fields.outcome === "string" ? fields.outcome : void 0;
				if (outcome) span.setAttribute("workbuddy.outcome", outcome);
				const durationMs = typeof fields.duration_ms === "number" ? fields.duration_ms : void 0;
				if (durationMs !== void 0) span.setAttribute("workbuddy.duration_ms", durationMs);
				if (error !== void 0) {
					span.recordException(error);
					const info = classifyCloudSandboxError(error);
					if (info.error_kind) span.setAttribute("workbuddy.error_kind", info.error_kind);
					if (info.error_code) span.setAttribute("workbuddy.error_code", info.error_code);
					if (info.error_message) span.setAttribute("workbuddy.error_message", info.error_message);
				}
				span.setStatus({
					code: statusCode,
					message: error instanceof Error ? error.message : void 0
				});
			} finally {
				span.end();
			}
		}
		/**
		* 把 filesystem / artifact 等单点事件挂到当前 active span 作 event（Node 侧的
		* chat / session_connect 等 parent span 通常还开着）。没 active 时静默——
		* 短 duration span 意义不大，别污染 trace。
		*/
		addEventToActiveSpan(name, fields) {
			try {
				const active = trace.getActiveSpan();
				if (!active) return;
				active.addEvent(name, toEventAttributes(fields));
			} catch {}
		}
		sessionConnectStart(fields) {
			emit(this.reporter, "cloud_sandbox_session_connect_start", {
				event_stage: "session_connect",
				...fields
			});
			this.startSpan(this.sessionSpans, "cloud_sandbox.session_connect", fields);
		}
		sessionReady(fields) {
			emit(this.reporter, "cloud_sandbox_session_ready", {
				event_stage: "session_connect",
				outcome: "success",
				...fields
			});
			this.finalizeSpan(this.sessionSpans, {
				...fields,
				outcome: "success"
			}, SpanStatusCode.OK);
		}
		sessionError(fields, error) {
			this.emitEvent("cloud_sandbox_session_error", {
				event_stage: "session_connect",
				outcome: "failed",
				...fields
			}, error);
			this.finalizeSpan(this.sessionSpans, {
				...fields,
				outcome: "failed"
			}, SpanStatusCode.ERROR, error);
		}
		sessionClose(fields) {
			emit(this.reporter, "cloud_sandbox_session_close", {
				event_stage: "session_close",
				outcome: "success",
				...fields
			});
			this.finalizeSpan(this.sessionSpans, {
				...fields,
				outcome: "closed"
			}, SpanStatusCode.OK);
		}
		/** connectTask 阶段（daemon 拿 sessionInfo 的 HTTP / 缓存命中）开始。挂 open_session 下。 */
		connectTaskStart(fields) {
			emit(this.reporter, "cloud_sandbox_connect_task_start", {
				event_stage: "connect_task",
				...fields
			});
			this.startSpan(this.connectTaskSpans, "cloud_sandbox.connect_task", fields);
		}
		/** connectTask 阶段结束（成功/失败）。 */
		connectTaskEnd(fields, outcome, error) {
			this.emitEvent(`cloud_sandbox_connect_task_${outcome}`, {
				event_stage: "connect_task",
				outcome,
				...fields
			}, error);
			this.finalizeSpan(this.connectTaskSpans, {
				...fields,
				outcome
			}, outcome === "success" ? SpanStatusCode.OK : SpanStatusCode.ERROR, error);
		}
		promptSubmit(fields) {
			emit(this.reporter, "cloud_sandbox_prompt_submit", {
				event_stage: "prompt",
				...fields
			});
			const key = spanKey(fields);
			if (!key) return;
			const stale = this.promptSpans.get(key);
			if (stale) this.disposeBundle(stale, "orphan");
			try {
				const tracer = trace.getTracer(CLOUD_SANDBOX_TRACER);
				const attrs = toSpanAttributes(this.surface(), fields);
				const root = tracer.startSpan("cloud_sandbox.prompt", {
					kind: SpanKind.CLIENT,
					attributes: attrs
				}, this.pickParentContext());
				const waitTtft = tracer.startSpan("cloud_sandbox.prompt.wait_ttft", {
					kind: SpanKind.CLIENT,
					attributes: attrs
				}, trace.setSpan(ROOT_CONTEXT, root));
				this.promptSpans.set(key, {
					root,
					waitTtft,
					firstChunkFired: false
				});
				this.armOrphanTimeout(root);
			} catch {}
		}
		promptComplete(fields, error) {
			this.emitEvent("cloud_sandbox_prompt_complete", {
				event_stage: "prompt",
				...fields
			}, error);
			const key = spanKey(fields);
			if (!key) return;
			const bundle = this.promptSpans.get(key);
			if (!bundle) return;
			this.promptSpans.delete(key);
			this.disarmOrphanTimeout(bundle.root);
			const outcome = typeof fields.outcome === "string" ? fields.outcome : error ? "failed" : "success";
			const statusCode = Boolean(error) || outcome === "failed" ? SpanStatusCode.ERROR : SpanStatusCode.OK;
			const errInfo = error !== void 0 ? classifyCloudSandboxError(error) : void 0;
			if (bundle.waitTtft && !bundle.firstChunkFired) try {
				bundle.waitTtft.setAttribute("workbuddy.no_first_chunk", true);
				if (errInfo?.error_kind) bundle.waitTtft.setAttribute("workbuddy.error_kind", errInfo.error_kind);
				bundle.waitTtft.setStatus({ code: statusCode });
				bundle.waitTtft.end();
			} catch {}
			if (bundle.streaming) try {
				if (typeof fields.duration_ms === "number" && typeof fields.ttft_ms === "number") bundle.streaming.setAttribute("workbuddy.duration_ms", fields.duration_ms - fields.ttft_ms);
				if (typeof fields.outcome === "string") bundle.streaming.setAttribute("workbuddy.outcome", outcome);
				if (errInfo) {
					bundle.streaming.recordException(error);
					if (errInfo.error_kind) bundle.streaming.setAttribute("workbuddy.error_kind", errInfo.error_kind);
				}
				bundle.streaming.setStatus({ code: statusCode });
				bundle.streaming.end();
			} catch {}
			try {
				if (typeof fields.duration_ms === "number") bundle.root.setAttribute("workbuddy.duration_ms", fields.duration_ms);
				if (typeof fields.ttft_ms === "number") bundle.root.setAttribute("workbuddy.ttft_ms", fields.ttft_ms);
				bundle.root.setAttribute("workbuddy.outcome", outcome);
				if (errInfo) {
					bundle.root.recordException(error);
					if (errInfo.error_kind) bundle.root.setAttribute("workbuddy.error_kind", errInfo.error_kind);
					if (errInfo.error_code) bundle.root.setAttribute("workbuddy.error_code", errInfo.error_code);
					if (errInfo.error_message) bundle.root.setAttribute("workbuddy.error_message", errInfo.error_message);
				}
				bundle.root.setStatus({
					code: statusCode,
					message: error instanceof Error ? error.message : void 0
				});
				bundle.root.end();
			} catch {}
		}
		promptFirstChunk(fields) {
			emit(this.reporter, "cloud_sandbox_prompt_first_chunk", {
				event_stage: "prompt",
				...fields
			});
			const key = spanKey(fields);
			if (!key) return;
			const bundle = this.promptSpans.get(key);
			if (!bundle || bundle.firstChunkFired) return;
			bundle.firstChunkFired = true;
			try {
				const ttftMs = typeof fields.duration_ms === "number" ? fields.duration_ms : void 0;
				if (bundle.waitTtft) {
					if (ttftMs !== void 0) bundle.waitTtft.setAttribute("workbuddy.ttft_ms", ttftMs);
					const chunkType = fields.chunk_type;
					if (typeof chunkType === "string") bundle.waitTtft.setAttribute("workbuddy.chunk_type", chunkType);
					bundle.waitTtft.setStatus({ code: SpanStatusCode.OK });
					bundle.waitTtft.end();
				}
				const attrs = {};
				if (typeof fields.chunk_type === "string") attrs["workbuddy.first_chunk_type"] = fields.chunk_type;
				bundle.streaming = trace.getTracer(CLOUD_SANDBOX_TRACER).startSpan("cloud_sandbox.prompt.streaming", {
					kind: SpanKind.CLIENT,
					attributes: attrs
				}, trace.setSpan(ROOT_CONTEXT, bundle.root));
				bundle.root.addEvent("first_chunk", toEventAttributes(fields));
				if (ttftMs !== void 0) bundle.root.setAttribute("workbuddy.ttft_ms", ttftMs);
			} catch {}
		}
		sessionHistoryLoaded(fields) {
			emit(this.reporter, "cloud_sandbox_session_history_loaded", {
				event_stage: "session_connect",
				...fields
			});
			const key = spanKey(fields);
			const sessionSpan = key ? this.sessionSpans.get(key) : void 0;
			try {
				sessionSpan?.addEvent("session_history_loaded", toEventAttributes(fields));
			} catch {}
		}
		filesystemOutcome(fields, error) {
			this.emitEvent("cloud_sandbox_filesystem_outcome", {
				event_stage: "filesystem",
				...fields
			}, error);
			this.addEventToActiveSpan("cloud_sandbox.filesystem_outcome", {
				...fields,
				...error ? classifyCloudSandboxError(error) : {}
			});
		}
		artifactSync(fields, error) {
			this.emitEvent("cloud_sandbox_artifact_sync", {
				event_stage: "artifact",
				...fields
			}, error);
			this.addEventToActiveSpan("cloud_sandbox.artifact_sync", {
				...fields,
				...error ? classifyCloudSandboxError(error) : {}
			});
		}
		/**
		* 主动释放所有 in-flight span，标记为 orphan（应用退出 / observer 换实例时用）。
		* 事件对错配的话 span 也会随下次 start 自动清理，这个 method 是可选的手动兜底。
		*/
		disposeAll(reason = "dispose") {
			for (const [, span] of this.sessionSpans) {
				this.disarmOrphanTimeout(span);
				try {
					span.setAttribute("workbuddy.outcome", "orphan");
					span.setAttribute("workbuddy.dispose_reason", reason);
					span.end();
				} catch {}
			}
			this.sessionSpans.clear();
			for (const [, span] of this.connectTaskSpans) {
				this.disarmOrphanTimeout(span);
				try {
					span.setAttribute("workbuddy.outcome", "orphan");
					span.setAttribute("workbuddy.dispose_reason", reason);
					span.end();
				} catch {}
			}
			this.connectTaskSpans.clear();
			for (const [, bundle] of this.promptSpans) this.disposeBundle(bundle, reason);
			this.promptSpans.clear();
		}
		disposeBundle(bundle, reason) {
			this.disarmOrphanTimeout(bundle.root);
			for (const span of [
				bundle.waitTtft,
				bundle.streaming,
				bundle.root
			]) {
				if (!span) continue;
				try {
					span.setAttribute("workbuddy.outcome", "orphan");
					span.setAttribute("workbuddy.dispose_reason", reason);
					span.end();
				} catch {}
			}
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/envd-files-url.ts
/**
* envd GET/POST /files 会按 username impersonate OS 用户。
*
* 后台 sandboxagent 固定带 `username=user`。项目 client / sandbox-preview 以前
* 漏了这个 query：JWT 是 admin，ListDir/POST 能过；GET 却以默认 user 读盘。
* `/root` 通常 0700，user 过不去 → envd 回 404（刚上传的 HTML 落在
* `/root/uploads/...`，预览空白）。
*
* `/root` 路径用 `root`，其余用 `user`。读写必须同一 username，否则 POST
* `/root/uploads` 带 `user` 会写失败。
*
* GET 还必须绕开 HTTP 缓存：落盘幂等探测会先对同一 URL GET 出 404，Chromium
* fetch 默认会把这份 404 缓存起来。写成功后预览再 GET，命中缓存 → 文件已在
* ListDir 里、预览却长时间空白（#104752 回归）。`cache:'no-store'` 挡 Chromium；
* `cb=` 挡中间代理把探测 404 当可缓存响应用。POST 不要带 cb，签名/排重按路径。
*/
function envdFilesUsername(path) {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return normalized === "/root" || normalized.startsWith("/root/") ? "root" : "user";
}
function buildEnvdFilesUrl(apiUrl, path) {
	return `${apiUrl}/files?path=${encodeURIComponent(path)}&username=${encodeURIComponent(envdFilesUsername(path))}`;
}
function buildEnvdFilesGetUrl(apiUrl, path, now = Date.now()) {
	return `${buildEnvdFilesUrl(apiUrl, path)}&cb=${now}`;
}
var ENVD_FILES_GET_CACHE;
var init_envd_files_url = __esmMin((() => {
	ENVD_FILES_GET_CACHE = "no-store";
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/collab-cloud-e2b-filesystem.ts
function mapFileType(proto) {
	if (proto === 1 || proto === "FILE_TYPE_FILE") return FileType.FILE;
	if (proto === 2 || proto === "FILE_TYPE_DIR" || proto === "FILE_TYPE_DIRECTORY") return FileType.DIR;
}
function mapTimestamp(ts) {
	if (!ts) return;
	if (typeof ts === "string") return new Date(ts);
	return new Date(Number(ts.seconds) * 1e3 + Math.floor(ts.nanos / 1e6));
}
function mapEntry(e) {
	const type = mapFileType(e.type);
	if (!type) return;
	return {
		name: e.name,
		type,
		path: e.path,
		size: Number(e.size),
		mode: e.mode,
		permissions: e.permissions,
		owner: e.owner,
		group: e.group,
		modifiedTime: mapTimestamp(e.modifiedTime),
		symlinkTarget: e.symlinkTarget
	};
}
/** content-type 声明的 charset 是否为非 utf-8(乱码候选①:错误声明 charset 的信号)。 */
function hasNonUtf8Charset(contentType) {
	const match = /charset\s*=\s*['"]?([^\s;'"]+)/i.exec(contentType);
	return !!match && !/utf-?8/i.test(match[1]);
}
/**
* 只读响应体前 n 字节后立即 cancel reader——不把整份 body 落成 Uint8Array,避免 read 默认分支
* 被大文本(尤其无 content-length 的 chunked/gzip 响应)命中时双倍常驻内存推 OOM。取字节头做
* head_hex(BOM / gzip magic / 非法 charset)足够诊断,且内存 O(n) 与文件大小无关。
*/
async function readHeadBytes(resp, n) {
	const reader = resp.body?.getReader();
	if (!reader) return /* @__PURE__ */ new Uint8Array(0);
	const chunks = [];
	let total = 0;
	try {
		while (total < n) {
			const { value, done } = await reader.read();
			if (done) break;
			if (value) {
				chunks.push(value);
				total += value.byteLength;
			}
		}
	} finally {
		await reader.cancel();
	}
	if (chunks.length === 1) return chunks[0].subarray(0, n);
	const out = new Uint8Array(Math.min(total, n));
	let off = 0;
	for (const c of chunks) {
		const copy = Math.min(c.byteLength, n - off);
		if (copy <= 0) break;
		out.set(c.subarray(0, copy), off);
		off += copy;
	}
	return out;
}
var RPC_BASE, DEFAULT_TIMEOUT_MS, TEXT_PRODUCT_RE, CollabCloudE2BFilesystem;
var init_collab_cloud_e2b_filesystem = __esmMin((() => {
	init_common$1();
	init_envd_files_url();
	RPC_BASE = "/filesystem.Filesystem";
	DEFAULT_TIMEOUT_MS = 3e4;
	TEXT_PRODUCT_RE = /\.(?:md)$/i;
	CollabCloudE2BFilesystem = class CollabCloudE2BFilesystem {
		constructor(apiUrl, accessToken, headers, timeoutMs, sandboxId, domain, logFn) {
			this.apiUrl = apiUrl;
			this.accessToken = accessToken;
			this.headers = headers;
			this.timeoutMs = timeoutMs;
			this.sandboxId = sandboxId;
			this.domain = domain;
			this.logFn = logFn;
		}
		/**
		* Create a filesystem client from sandbox connection info.
		* Synchronous — no network calls needed to construct.
		*
		* @param logFn Optional log sink — every debug log will be forwarded here
		*              (in addition to console.log) so callers can persist to disk.
		*/
		static connect(info, logFn) {
			const apiUrl = info.apiUrl || `https://49983-${info.sandboxId}.${info.domain || "e2b.dev"}`;
			const token = info.accessToken || info.apiKey || "";
			const sandboxId = info.sandboxId || "";
			const domain = info.domain || "e2b.dev";
			const connectInfo = {
				apiUrl,
				sandboxId,
				domain,
				hasAccessToken: !!info.accessToken,
				hasApiKey: !!info.apiKey,
				tokenPrefix: token ? token.slice(0, 20) + "..." : "(empty)",
				tokenLength: token.length,
				extraHeaders: info.headers ? Object.keys(info.headers) : []
			};
			console.log("[CollabCloudE2BFilesystem] connect", connectInfo);
			logFn?.("e2bFs:connect", connectInfo);
			return new CollabCloudE2BFilesystem(apiUrl, token, info.headers || {}, info.requestTimeoutMs || DEFAULT_TIMEOUT_MS, sandboxId, domain, logFn);
		}
		/** Log to console AND forward to the injected logFn (file_attachment.log). */
		log(tag, data) {
			const fullTag = `[CollabCloudE2BFilesystem] ${tag}`;
			console.log(fullTag, typeof data === "string" ? data : JSON.stringify(data));
			this.logFn?.(`e2bFs:${tag}`, data);
		}
		restHeaders() {
			const h = { ...this.headers };
			if (this.accessToken) h["X-Access-Token"] = this.accessToken;
			return h;
		}
		rpcHeaders() {
			return {
				"Content-Type": "application/json",
				"Connect-Protocol-Version": "1",
				...this.restHeaders()
			};
		}
		/** Sanitize headers for logging — mask long tokens but keep enough for debugging */
		sanitizeHeadersForLog(headers) {
			const result = {};
			for (const [key, value] of Object.entries(headers)) if (key.toLowerCase() === "x-access-token" && value.length > 40) result[key] = value.slice(0, 30) + "..." + value.slice(-10) + ` (len=${value.length})`;
			else result[key] = value;
			return result;
		}
		/** Convert response Headers to plain object for logging */
		responseHeadersToObj(headers) {
			const obj = {};
			headers.forEach((value, key) => {
				obj[key] = value;
			});
			return obj;
		}
		/** Build a reproducible curl command string from request params. */
		buildCurl(url, headers, bodyStr) {
			const parts = [`curl '${url}'`];
			for (const [key, value] of Object.entries(headers)) {
				const escaped = value.replace(/'/g, "'\\''");
				parts.push(`  -H '${key}: ${escaped}'`);
			}
			parts.push(`  --data-raw '${bodyStr.replace(/'/g, "'\\''")}'`);
			return parts.join(" \\\n");
		}
		async rpc(method, body, timeoutMs) {
			const url = `${this.apiUrl}${RPC_BASE}/${method}`;
			const headers = this.rpcHeaders();
			const bodyStr = JSON.stringify(body);
			const curl = this.buildCurl(url, headers, bodyStr);
			this.log(`rpc:${method}:CURL`, curl);
			const reqInfo = {
				url,
				headers: this.sanitizeHeadersForLog(headers),
				body: bodyStr,
				sandboxId: this.sandboxId,
				domain: this.domain,
				apiUrl: this.apiUrl,
				timeoutMs: timeoutMs ?? this.timeoutMs
			};
			this.log(`rpc:${method}:REQUEST`, reqInfo);
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), timeoutMs ?? this.timeoutMs);
			try {
				const resp = await fetch(url, {
					method: "POST",
					headers,
					body: bodyStr,
					signal: controller.signal
				});
				const respText = await resp.text();
				const respInfo = {
					status: resp.status,
					statusText: resp.statusText,
					responseHeaders: this.responseHeadersToObj(resp.headers),
					bodyLength: respText.length,
					bodyPreview: respText.slice(0, 2e3)
				};
				this.log(`rpc:${method}:RESPONSE`, respInfo);
				if (!resp.ok) throw new Error(`E2B RPC ${method} failed: ${resp.status} ${respText}`);
				return JSON.parse(respText);
			} catch (err) {
				this.log(`rpc:${method}:ERROR`, {
					error: err.message,
					url,
					headers: this.sanitizeHeadersForLog(headers),
					body: bodyStr
				});
				throw err;
			} finally {
				clearTimeout(timer);
			}
		}
		async list(path, opts) {
			const depth = opts?.depth ?? 1;
			if (depth < 1) throw new Error("depth should be at least one");
			this.log("list:start", {
				path,
				depth,
				requestTimeoutMs: opts?.requestTimeoutMs
			});
			const res = await this.rpc("ListDir", {
				path,
				depth
			}, opts?.requestTimeoutMs);
			this.log("list:rawResult", {
				path,
				depth,
				hasEntries: !!res.entries,
				entryCount: res.entries?.length ?? 0,
				rawKeys: Object.keys(res),
				firstFewEntries: (res.entries || []).slice(0, 5).map((e) => ({
					name: e.name,
					type: e.type,
					path: e.path
				}))
			});
			const entries = [];
			for (const e of res.entries || []) {
				const mapped = mapEntry(e);
				if (mapped) entries.push(mapped);
			}
			this.log("list:mapped", {
				path,
				depth,
				mappedCount: entries.length
			});
			return entries;
		}
		async read(path, opts) {
			const format = opts?.format ?? "text";
			const url = buildEnvdFilesGetUrl(this.apiUrl, path);
			this.log("read:start", {
				path,
				format,
				url
			});
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
			try {
				const resp = await fetch(url, {
					headers: this.restHeaders(),
					signal: controller.signal,
					cache: ENVD_FILES_GET_CACHE
				});
				if (!resp.ok) {
					const text = await resp.text().catch(() => "");
					throw new Error(`E2B read failed: ${resp.status} ${text}`);
				}
				switch (format) {
					case "bytes": return new Uint8Array(await resp.arrayBuffer());
					case "blob": return await resp.blob();
					case "stream": return resp.body;
					default: {
						if (!TEXT_PRODUCT_RE.test(path)) return await resp.text();
						const clone = resp.clone();
						try {
							this.logReadDecode(path, resp, await readHeadBytes(clone, 32));
						} catch (err) {
							this.log("read:decode:error", {
								path,
								error: err.message
							});
						}
						return await resp.text();
					}
				}
			} finally {
				clearTimeout(timer);
			}
		}
		/**
		* read:decode 诊断(纯读、不改行为):记录 content-type / content-encoding / 字节头(head_hex)/ BOM,
		* 用于定位云端 .md 产物侧边栏预览偶现乱码——文件已证为 UTF-8,故乱码在解码侧:
		*   - content_type 声明非 utf-8 charset → 候选①(envd 声明错误 charset,resp.text() 按它解);
		*   - content_encoding=gzip 且 head_hex 以 `1f 8b` 开头 → 候选②(响应未解压)。
		*
		* 只落字节头 16 进制 + 标志位到 file_attachment.log(经 logFn → ProjectChatService.logFs),
		* 不落任何文件原文(避免泄露源码/密钥/私有文档,符合"禁止响应 dump"日志规范)。suspicious 方便 grep。
		*/
		logReadDecode(path, resp, headBytes) {
			const ct = resp.headers.get("content-type") ?? "";
			const ce = resp.headers.get("content-encoding") ?? "";
			const headHex = Array.from(headBytes).map((b) => b.toString(16).padStart(2, "0")).join(" ");
			const hasBom = headBytes.length >= 3 && headBytes[0] === 239 && headBytes[1] === 187 && headBytes[2] === 191;
			const suspicious = hasNonUtf8Charset(ct) || headHex.startsWith("1f 8b");
			this.log("read:decode", {
				path,
				content_type: ct,
				content_encoding: ce,
				content_length: resp.headers.get("content-length"),
				head_hex: headHex,
				has_bom: hasBom,
				suspicious
			});
		}
		async write(pathOrFiles, dataOrOpts, opts) {
			if (Array.isArray(pathOrFiles)) {
				const results = [];
				for (const entry of pathOrFiles) results.push(await this.writeSingle(entry.path, entry.data, opts));
				return results;
			}
			return this.writeSingle(pathOrFiles, dataOrOpts, opts);
		}
		/**
		* 写单个文件。用 multipart/form-data 格式（envd REST 标准写法），
		* 对齐 MiniProgramE2BFilesystem 的 multipart 构造逻辑。
		* 纯字符串 body 在 agentos worker 等 envd 版本会返回 500。
		*/
		async writeSingle(writtenPath, data, opts) {
			const url = buildEnvdFilesUrl(this.apiUrl, writtenPath);
			this.log("write:start", {
				path: writtenPath,
				kind: typeof data
			});
			const encoder = new TextEncoder();
			const boundary = `----CollabBoundary${Date.now()}${Math.random().toString(36).slice(2)}`;
			const fileName = writtenPath.split("/").pop() || "file";
			let fileBytes;
			if (typeof data === "string") fileBytes = encoder.encode(data);
			else if (data instanceof ArrayBuffer) fileBytes = new Uint8Array(data);
			else if (data instanceof Blob) {
				const arrayBuf = await data.arrayBuffer();
				fileBytes = new Uint8Array(arrayBuf);
			} else {
				this.log("write:readableStream_fallback", { path: writtenPath });
				const controller = new AbortController();
				const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
				try {
					const resp = await fetch(url, {
						method: "POST",
						headers: this.restHeaders(),
						body: data,
						signal: controller.signal
					});
					if (!resp.ok) {
						const text = await resp.text().catch(() => "");
						throw new Error(`E2B write failed: ${resp.status} ${text}`);
					}
					return {
						path: writtenPath,
						type: FileType.FILE
					};
				} finally {
					clearTimeout(timer);
				}
			}
			const headerStr = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
			const footerStr = `\r\n--${boundary}--\r\n`;
			const parts = [
				encoder.encode(headerStr),
				fileBytes,
				encoder.encode(footerStr)
			];
			const totalLen = parts.reduce((s, p) => s + p.byteLength, 0);
			const body = new Uint8Array(totalLen);
			let offset = 0;
			for (const part of parts) {
				body.set(part, offset);
				offset += part.byteLength;
			}
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
			try {
				const multipartHeaders = {
					...this.restHeaders(),
					"Content-Type": `multipart/form-data; boundary=${boundary}`
				};
				const resp = await fetch(url, {
					method: "POST",
					headers: multipartHeaders,
					body: body.buffer,
					signal: controller.signal
				});
				if (!resp.ok) {
					const text = await resp.text().catch(() => "");
					this.log("write:http_error", {
						path: writtenPath,
						status: resp.status,
						body: text.slice(0, 500)
					});
					throw new Error(`E2B write failed: ${resp.status} ${text}`);
				}
				this.log("write:done", { path: writtenPath });
				return {
					path: writtenPath,
					type: FileType.FILE
				};
			} catch (err) {
				this.log("write:error", {
					path: writtenPath,
					error: err.message
				});
				throw err;
			} finally {
				clearTimeout(timer);
			}
		}
		async exists(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: exists() not implemented");
		}
		async makeDir(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: makeDir() not implemented");
		}
		async remove(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: remove() not implemented");
		}
		async rename(_oldPath, _newPath, _opts) {
			throw new Error("CollabCloudE2BFilesystem: rename() not implemented");
		}
		async getInfo(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: getInfo() not implemented");
		}
		/**
		* 监听目录变化（list 轮询版）。
		*
		* agentos-worker envd 的 CreateWatcher/GetWatcherEvents RPC 永远返回空事件 {}，
		* 因此放弃 envd 原生 watcher 协议，改用 list() 轮询 + modifyTime 对比。
		*
		* 工作原理：
		*   - 每 2s 调一次 list(path) 获取当前目录 entries；
		*   - 维护上一次的 modifyTime 快照（Map<name, modifyTime>）；
		*   - 比较发现变化时 fire `onEvent({ name, type: WRITE })`。
		*
		* 注意：
		*   - 仅检测 modifyTime 变化（文件写入 / 重命名都会触发），不区分 CREATE vs WRITE；
		*   - 首次 poll 用空快照，不 fire 任何事件（只建立基线）；
		*   - 间隔 2s：对"AI 刚刚改完 → 右侧预览刷新"的场景感知延迟在 2s 内。
		*/
		async watchDir(path, onEvent, opts) {
			this.log("watchDir:start", {
				path,
				mode: "list-poll"
			});
			let stopped = false;
			let lastSnapshot = null;
			const POLL_INTERVAL_MS = 2e3;
			const getMtime = (e) => String(e.modifiedTime ?? e.modifyTime ?? "");
			const poll = async () => {
				{
					const entries = await this.list(path, { depth: 1 });
					lastSnapshot = new Map(entries.map((e) => [e.name, getMtime(e)]));
					this.log("watchDir:baseline", {
						path,
						files: entries.length
					});
				}
				while (!stopped) {
					await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
					if (stopped) return;
					let entries;
					try {
						entries = await this.list(path, { depth: 1 });
					} catch (err) {
						this.log("watchDir:poll_error", {
							path,
							error: err.message
						});
						continue;
					}
					if (stopped) return;
					const current = new Map(entries.map((e) => [e.name, getMtime(e)]));
					const prev = lastSnapshot;
					for (const [name, mtime] of current) {
						const prevMtime = prev.get(name);
						if (!prevMtime) try {
							await onEvent({
								name,
								type: FilesystemEventType.WRITE
							});
						} catch {}
						else if (mtime !== prevMtime) try {
							await onEvent({
								name,
								type: FilesystemEventType.WRITE
							});
						} catch {}
					}
					lastSnapshot = current;
				}
			};
			poll().catch((err) => {
				this.log("watchDir:exit", {
					path,
					error: err.message
				});
				try {
					opts?.onExit?.(err instanceof Error ? err : new Error(String(err)));
				} catch {}
			});
			return { stop: async () => {
				stopped = true;
				this.log("watchDir:stop", { path });
			} };
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/strip-injected-context.ts
/**
* Strip injected context XML from user-visible text.
*
* Removes `<project-instructions>`, `<ticket-context>`, `<system-reminder>` and
* `<attachment_sandbox_paths>` blocks that are injected by the frontend before
* sending to the ACP session. These should never be shown in chat bubbles, queue
* previews, or task titles.
*/
function stripInjectedContext(text) {
	return text.replace(/<system-reminder[^>]*>[\s\S]*?<\/system-reminder>\s*/g, "").replace(/<project-instructions>[\s\S]*?<\/project-instructions>\s*/g, "").replace(/<ticket-context>[\s\S]*?<\/ticket-context>\s*/g, "").replace(/<attachment_sandbox_paths>[\s\S]*?<\/attachment_sandbox_paths>\s*/g, "").trim();
}
var init_strip_injected_context = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/project-chat-service.ts
/**
* 从 session/load response 读取服务端下发的历史末位 offset。
*
* 服务端（sandbox-proxy）在 `_meta['codebuddy.ai'].historyEndOffset` 下发"客户端实际
* 会收到的最后一条历史消息的 offset"（tailOffset 语义，考虑 chunk 合并）。collectHistoryRaw
* 据此精确判定历史/实时边界，避免 resume tailOffset 竞态把历史 assistant chunk 错标
* `mode:stream` 导致提前截断。
*
* 返回 undefined 表示服务端未下发（旧版本 / 降级路径），调用方回退到 mode 判定。
*/
function readHistoryEndOffset(resp) {
	const val = (resp._meta?.["codebuddy.ai"])?.historyEndOffset;
	return typeof val === "number" ? val : void 0;
}
/**
* 判定 session/load 响应是否是 sandbox-proxy 的「找不到 session」降级空响应。
*
* sandbox-proxy 在 session 还没落地时（沙箱冷恢复中、持久盘尚未挂载，`sessions.json`
* 读不到该 session）不会报错，而是回一个空 result 以免前端超时（box 侧
* `handleSessionLoadWithReady` 的 `sp == nil` 分支）。这个空 result 与「这个会话真的
* 没有历史」在协议上无法区分：历史流因此收 0 帧，UI 把它当成空会话渲染成空白页，
* 且不重试——用户只能手动切走再切回。
*
* 判据取三者同时缺失（modes / models / historyEndOffset）：真实会话即便历史为空，
* box 也会带上 modes+models 快照与 historyEndOffset（-1 表示无历史），不会命中这里。
*/
function isSessionNotReadyLoadResponse(resp) {
	if (!resp) return true;
	return !resp.modes && !resp.models && readHistoryEndOffset(resp) === void 0;
}
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
/** 读取单条 notification 的 `_meta['codebuddy.ai'].offset`；缺失返回 -1。 */
function readCodebuddyOffset(notification) {
	const cbMeta = notification._meta?.["codebuddy.ai"];
	return typeof cbMeta?.offset === "number" ? cbMeta.offset : -1;
}
/**
* 取一组 notification 里最高的 `_meta['codebuddy.ai'].offset`（无 offset 的帧忽略）；全无则返回 -1。
* 用于 reloadHistoryOnReclaim 判断「drain 掉的缓冲里是否含带 offset 的内容帧」。
*/
function maxCodebuddyOffset(notifications) {
	let max = -1;
	for (const n of notifications) {
		const offset = readCodebuddyOffset(n);
		if (offset > max) max = offset;
	}
	return max;
}
/**
* 历史回放兜底：sandbox-proxy 持久化时丢了 `_meta.sourceTool`，给 media entry
* 重新打上 `PresentFiles` 标记，让 `ArtifactSlotPanel` 的过滤能命中。
*
* 与 `cloud-agent-colleague-service.ts` 中的同名函数语义一致：
* 仅作用于 `artifact.type === 'media'` 且确实缺失 `_meta.sourceTool` 的 entry；
* 其他类型 / 已有 sourceTool 都按原样返回，避免覆盖正常字段。
* sandbox 内的 media artifact 都来自 agent-cli 的 `present_files` 工具调用，
* 这一兜底逻辑因此是安全的。
*/
function restoreSourceToolForMediaEntry(entry) {
	const artifact = entry?.artifact;
	if (!artifact || artifact.type !== "media") return entry;
	if (typeof artifact._meta?.sourceTool === "string" && artifact._meta.sourceTool.length > 0) return entry;
	const restoredArtifact = {
		...artifact,
		_meta: {
			...artifact._meta ?? {},
			sourceTool: "PresentFiles"
		}
	};
	return {
		...entry,
		artifact: restoredArtifact
	};
}
function normalizeProjectSandboxPreviewPath(path) {
	const normalized = path.trim().replace(/\\/g, "/").replace(/\/+/g, "/");
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
function normalizeProjectSandboxPreviewRoot(root) {
	const normalized = (root || "/workspace").trim().replace(/\\/g, "/").replace(/\/+$/, "");
	if (!normalized) return "/workspace";
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
function joinProjectSandboxPreviewRoot(root, relativePath) {
	return normalizeProjectSandboxPreviewPath(`${normalizeProjectSandboxPreviewRoot(root)}/${relativePath.replace(/^\/+/, "")}`);
}
/**
* 将 project 会话产物 URL（agent:// 各种形态 / sandbox 绝对路径）解析为 sandbox
* 内的文件绝对路径。解析不出已知格式时返回 undefined，调用方原样透传 URL。
*/
function resolveProjectSandboxPreviewFilePath(url, root) {
	if (url.startsWith("agent:///")) return normalizeProjectSandboxPreviewPath(url.slice(8));
	if (url.startsWith("agent://files/")) {
		const rawPath = url.slice(14);
		if (!rawPath) return;
		if (rawPath.startsWith("/")) return normalizeProjectSandboxPreviewPath(rawPath);
		if (rawPath === "workspace" || rawPath.startsWith("workspace/")) return normalizeProjectSandboxPreviewPath(`/${rawPath}`);
		return joinProjectSandboxPreviewRoot(root, rawPath);
	}
	if (url.startsWith("agent://files")) {
		const rawPath = url.slice(13).replace(/^\/+/, "");
		if (!rawPath) return;
		return joinProjectSandboxPreviewRoot(root, rawPath);
	}
	if (url.startsWith("/workspace/")) return normalizeProjectSandboxPreviewPath(url);
}
/** 把 sandbox 绝对路径转成 sandbox-preview 代理 URL 的相对段（去掉前导 /）。 */
function toProjectSandboxPreviewProxyPath(filePath) {
	return normalizeProjectSandboxPreviewPath(filePath).replace(/^\/+/, "");
}
/** span → W3C traceparent（`00-<trace>-<span>-01`）；无效 span 返回 undefined。 */
function spanToTraceparent(span) {
	if (!span) return;
	const ctx = span.spanContext();
	if (!isSpanContextValid(ctx)) return;
	return `00-${ctx.traceId}-${ctx.spanId}-01`;
}
var EventChannel, ProjectChatService;
var init_project_chat_service = __esmMin((() => {
	init_common$1();
	init_esm();
	init_file_tree_utils();
	init_netdrive_attachments();
	init_acp_terminal_error_telemetry();
	init_cloud_sandbox_telemetry();
	init_collab_cloud_e2b_filesystem();
	init_strip_injected_context();
	EventChannel = class EventChannel {
		constructor() {
			this.buffer = [];
			this.waiter = null;
			this.closed = false;
			this.waiterSeq = 0;
			this.waiterId = null;
			this.pushSeq = 0;
			this.abandonedWaiterIds = /* @__PURE__ */ new Set();
		}
		setDiag(diag) {
			this.diag = diag;
		}
		/** 提取一条通知的轻量身份，避免把整个 payload 再打一遍。 */
		static describe(n) {
			const cb = n._meta?.["codebuddy.ai"];
			return {
				offset: cb?.offset ?? null,
				mode: cb?.mode ?? null,
				update: n?.update?.sessionUpdate ?? null
			};
		}
		push(notification) {
			const seq = ++this.pushSeq;
			if (this.closed) {
				this.diag?.("evch:push:dropClosed", {
					seq,
					...EventChannel.describe(notification)
				});
				return;
			}
			if (this.waiter) {
				const w = this.waiter;
				const wid = this.waiterId;
				this.waiter = null;
				this.waiterId = null;
				if (wid !== null && this.abandonedWaiterIds.has(wid)) {
					this.abandonedWaiterIds.delete(wid);
					this.diag?.("evch:push:staleWaiterDelivery", {
						seq,
						waiterId: wid,
						...EventChannel.describe(notification)
					});
					console.log(`[ProjectChatService] [evch:push:staleWaiterDelivery] waiter=${wid} frame lost! offset=${notification?._meta?.["codebuddy.ai"]?.offset ?? null}`);
				} else this.diag?.("evch:push", {
					seq,
					route: "waiter",
					waiterId: wid,
					...EventChannel.describe(notification)
				});
				w(notification);
			} else {
				this.buffer.push(notification);
				this.diag?.("evch:push", {
					seq,
					route: "buffer",
					buffered: this.buffer.length,
					...EventChannel.describe(notification)
				});
			}
		}
		/** Wait for next notification (or null if channel is closed). */
		next() {
			if (this.buffer.length > 0) {
				const n = this.buffer.shift();
				this.diag?.("evch:next", {
					route: "buffer",
					remaining: this.buffer.length,
					...EventChannel.describe(n)
				});
				return Promise.resolve(n);
			}
			if (this.closed) {
				this.diag?.("evch:next", { route: "closed" });
				return Promise.resolve(null);
			}
			const id = ++this.waiterSeq;
			if (this.waiter) this.diag?.("evch:next:overwriteWaiter", {
				staleWaiterId: this.waiterId,
				newWaiterId: id
			});
			this.diag?.("evch:next", {
				route: "park",
				waiterId: id
			});
			this.waiterId = id;
			return new Promise((resolve) => {
				this.waiter = resolve;
			});
		}
		/** Drain any buffered items without waiting. */
		drain() {
			const items = this.buffer;
			this.buffer = [];
			this.diag?.("evch:drain", {
				drained: items.length,
				hasParkedWaiter: this.waiter !== null,
				waiterId: this.waiterId
			});
			return items;
		}
		/**
		* 清除当前滞留的 waiter（调用方因超时 / break 退出后不再消费该 promise）。
		*
		* `collectHistoryRaw` / `collectHistory` 使用 `Promise.race([next(), timeout(500)])`:
		* 超时分支胜出时，`next()` 返回的 promise 被遗弃，但 `this.waiter` 仍指向其 resolver。
		* 若此后有一帧在真正的消费者（live loop）park 之前到达，帧会被喂给这个僵尸 resolver
		* 而永久丢失。调用 `unpark()` 可在退出时立即清除僵尸指针，消灭该窗口。
		*
		* 实现：把 waiterId 记入 abandonedWaiterIds 供 push() 做告警检测，然后清 waiter。
		* 不 resolve 旧 promise（无人 await 它），不推 null（那是 close 的语义）。
		*/
		unpark() {
			if (this.waiter) {
				if (this.waiterId !== null) this.abandonedWaiterIds.add(this.waiterId);
				this.diag?.("evch:unpark", { waiterId: this.waiterId });
				this.waiter = null;
				this.waiterId = null;
			}
		}
		/** Close the channel, unblocking any pending waiter. */
		close() {
			this.diag?.("evch:close", {
				buffered: this.buffer.length,
				hasParkedWaiter: this.waiter !== null,
				waiterId: this.waiterId
			});
			this.closed = true;
			this.buffer = [];
			if (this.waiter) {
				const w = this.waiter;
				this.waiter = null;
				this.waiterId = null;
				w(null);
			}
		}
		/** Check if the channel has been closed. */
		isClosed() {
			return this.closed;
		}
	};
	ProjectChatService = class ProjectChatService {
		static {
			this.SAMPLED_CHUNK_UPDATES = /* @__PURE__ */ new Set([
				"agent_message_chunk",
				"agent_thought_chunk",
				"user_message_chunk"
			]);
		}
		static {
			this.CHUNK_SAMPLE_EVERY = 20;
		}
		static {
			this.TURN_END_UPDATES = /* @__PURE__ */ new Set(["session_end_turn"]);
		}
		static {
			this.PREWARM_TTL_MS = 12e4;
		}
		static {
			this.LOAD_SESSION_NOT_READY_RETRY_DELAYS_MS = [1e3, 2e3];
		}
		constructor(deps) {
			this.firstChunkPending = /* @__PURE__ */ new Map();
			this.connections = /* @__PURE__ */ new Map();
			this.filesystems = /* @__PURE__ */ new Map();
			this.chunkSamples = /* @__PURE__ */ new Map();
			this.connecting = /* @__PURE__ */ new Map();
			this.pendingConnect = /* @__PURE__ */ new Map();
			this.refCount = /* @__PURE__ */ new Map();
			this.disconnectTimers = /* @__PURE__ */ new Map();
			this.keepAlives = /* @__PURE__ */ new Map();
			this.inflightPrompts = /* @__PURE__ */ new Map();
			this.pendingTearDownAfterInflight = /* @__PURE__ */ new Map();
			this.lastFrameAt = /* @__PURE__ */ new Map();
			this.inflightSilenceTimers = /* @__PURE__ */ new Map();
			this.promptSilenceRejecters = /* @__PURE__ */ new Map();
			this.pendingSessionInfo = /* @__PURE__ */ new Map();
			this.prewarming = /* @__PURE__ */ new Map();
			this.prewarmExpiryTimers = /* @__PURE__ */ new Map();
			this.taskOps = deps.taskOps;
			this.logWriter = deps.logWriter;
			this.filesystemFactory = deps.filesystemFactory;
			this.netdriveRootResolver = deps.netdriveRootResolver;
			this.cloudSandboxTelemetry = new CloudSandboxTelemetryObserver(deps.cloudSandboxTelemetry, deps.getActiveParentSpan);
			this.sandboxPreviewRegisterMount = deps.sandboxPreviewRegisterMount;
			this.transportHooks = deps.transportHooks;
			this.getFallbackTraceparent = deps.getActiveParentSpan ? () => spanToTraceparent(deps.getActiveParentSpan()) : void 0;
		}
		createFallbackRequestId() {
			return `project_prompt_${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
		}
		getTelemetryBaseFields(projectId, conversationId, sessionId, sandboxId, requestId) {
			return {
				projectId,
				conversationId,
				sessionId,
				sandboxId,
				requestId
			};
		}
		getTelemetryActiveFields(active, requestId) {
			return this.getTelemetryBaseFields(active.projectId, void 0, active.sessionId, active.sandboxId, requestId);
		}
		logPath(projectId, sessionId, file) {
			return `${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}/teams-${projectId}/${sessionId}/${file}`;
		}
		static {
			this.QUIET_TAGS = /* @__PURE__ */ new Set([
				"stream:notification",
				"historyRaw:notification",
				"history:notification",
				"rawStream:notification",
				"subscribe:notification",
				"evch:push",
				"evch:next"
			]);
		}
		log(projectId, sessionId, tag, data) {
			this.maybeFlushSamplesOnTurnEnd(projectId, sessionId, data);
			const sampled = sessionId ? this.takeSampleDecision(sessionId, data) : void 0;
			if (sampled === "drop") return;
			const payload = typeof data === "string" ? data : JSON.stringify(data);
			if (!ProjectChatService.QUIET_TAGS.has(tag)) console.log(`[ProjectChatService] [${tag}]`, payload);
			if (!this.logWriter || !sessionId) return;
			const pid = projectId || "no-project";
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			const line = `${sampled?.kind === "summary" ? `[${ts}] [${tag}:sampled count=${sampled.count} totalChars=${sampled.totalChars}]` : `[${ts}] [${tag}]`} ${payload}\n`;
			try {
				this.logWriter.append(this.logPath(pid, sessionId, "chat.log"), line);
			} catch {}
		}
		maybeFlushSamplesOnTurnEnd(projectId, sessionId, data) {
			if (!sessionId || this.chunkSamples.size === 0 || !this.logWriter) return;
			const sessionUpdate = data?.update?.sessionUpdate;
			if (!sessionUpdate || !ProjectChatService.TURN_END_UPDATES.has(sessionUpdate)) return;
			const prefix = `${sessionId}::`;
			const pid = projectId || "no-project";
			const path = this.logPath(pid, sessionId, "chat.log");
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			for (const key of Array.from(this.chunkSamples.keys())) {
				if (!key.startsWith(prefix)) continue;
				const state = this.chunkSamples.get(key);
				this.chunkSamples.delete(key);
				if (state.count % ProjectChatService.CHUNK_SAMPLE_EVERY === 0) continue;
				const line = `[${ts}] [chunkSample:final update=${key.split("::")[2] ?? "unknown"} count=${state.count} totalChars=${state.totalChars}]\n`;
				try {
					this.logWriter.append(path, line);
				} catch {}
			}
		}
		takeSampleDecision(sessionId, data) {
			const update = data?.update;
			const sessionUpdate = update?.sessionUpdate;
			if (!sessionUpdate || !ProjectChatService.SAMPLED_CHUNK_UPDATES.has(sessionUpdate)) return;
			const chunkText = typeof update?.content?.text === "string" ? update.content.text : "";
			const key = `${sessionId}::${data?._meta?.["codebuddy.ai"]?.requestId ?? update?._meta?.["codebuddy.ai"]?.requestId ?? "no-req"}::${sessionUpdate}`;
			let state = this.chunkSamples.get(key);
			if (!state) {
				state = {
					count: 1,
					totalChars: chunkText.length
				};
				this.chunkSamples.set(key, state);
				return;
			}
			state.count += 1;
			state.totalChars += chunkText.length;
			if (state.count % ProjectChatService.CHUNK_SAMPLE_EVERY === 0) return {
				kind: "summary",
				count: state.count,
				totalChars: state.totalChars
			};
			return "drop";
		}
		/** Log to file_attachment.log for filesystem operations */
		logFs(conversationId, tag, data) {
			const conn = this.connections.get(conversationId);
			const payload = typeof data === "string" ? data : JSON.stringify(data);
			console.log(`[ProjectChatService:fs] [${tag}]`, payload);
			if (!this.logWriter) return;
			const pid = conn?.projectId || "no-project";
			const sessionId = conn?.sessionId || conversationId;
			const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [${tag}] ${payload}\n`;
			try {
				this.logWriter.append(this.logPath(pid, sessionId, "file_attachment.log"), line);
			} catch {}
		}
		/**
		* 解析项目网盘 root（projectId → { fileId, dirName }）。
		*
		* issue #54923：Web 端发消息走 resolveMessage 链路（POST /console/as/message/resolve），
		* 该接口需要调用方显式带上 `tdrive_root_id` / `tdrive_root_dir_name` 才会在响应里
		* 注入 `<tdrive-root />`。sendPrompt 内部的 ensureProjectNetdriveRoot 只在「不经过
		* resolveMessage 的兜底发送」时生效，resolveMessage 走的是另一条链路，故需要把同一份
		* root 解析能力暴露出来，让 resolveAndSendPrompt 在调 resolveMessage 前先拿到 root。
		*
		* resolver 未注入或解析失败（未登录 / 接口异常 / 项目未配置网盘）时返回 undefined，
		* 调用方据此安全降级为不传 tdrive_root_id —— 行为与修复前一致，不退化。
		*/
		async resolveProjectNetdriveRoot(projectId) {
			if (!projectId || !this.netdriveRootResolver) return;
			try {
				const root = await this.netdriveRootResolver(projectId);
				return root?.fileId ? root : void 0;
			} catch {
				return;
			}
		}
		async ensureProjectNetdriveRoot(prompt, _projectId) {
			return prompt;
		}
		/**
		* Send a prompt in a project task conversation.
		* If conversationId is not provided, creates a new task conversation first.
		*
		* Returns both `rawStream` (raw SessionNotifications for ACPMessageAccumulator)
		* and `stream` (parsed ProjectChatChunk for simple text-only consumption).
		* NOTE: Only ONE of `rawStream` or `stream` should be consumed — they share the same event channel.
		*/
		async sendPrompt(params) {
			const { projectId, prompt, model, tags, modeId, language, displayBlocks, contextWindow } = params;
			const requestId = params.requestId || this.createFallbackRequestId();
			let { conversationId } = params;
			let promptText = typeof prompt === "string" ? stripInjectedContext(prompt) : stripInjectedContext(prompt.filter((b) => b.type === "text").map((b) => b.text || "").join("\n"));
			if (!promptText.trim() && typeof prompt !== "string") {
				const resourceBlock = prompt.find((b) => b.type === "resource_link");
				if (resourceBlock) promptText = resourceBlock.name || resourceBlock.title || "";
			}
			this.log(projectId, conversationId ?? "new", "sendPrompt", {
				projectId,
				conversationId,
				model,
				tags
			});
			if (!conversationId) {
				const createParams = {
					projectId,
					prompt: promptText.slice(0, 100),
					model,
					tags
				};
				this.log(projectId, "new", "createTask:req", createParams);
				try {
					const result = await this.taskOps.createTask(createParams);
					conversationId = result.id;
					this.log(projectId, conversationId, "createTask:res", result);
				} catch (err) {
					this.log(projectId, "new", "createTask:ERROR", {
						message: err?.message,
						stack: err?.stack
					});
					throw err;
				}
			}
			let active = this.connections.get(conversationId);
			if (!active) try {
				active = await this.openConnection(conversationId, "create", projectId);
			} catch (err) {
				this.log(projectId, conversationId, "connectToTask:ERROR", {
					message: err?.message,
					stack: err?.stack
				});
				throw err;
			}
			if (modeId) {
				this.log(projectId, active.sessionId, "acp:setMode", {
					modeId,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionMode(active.sessionId, modeId);
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setMode:error", {
						modeId,
						message: err?.message
					});
					throw err;
				}
				active.currentModeId = modeId;
				if (active.initialModes) active.initialModes = {
					...active.initialModes,
					currentModeId: modeId
				};
				this.log(projectId, active.sessionId, "acp:setMode:done", "ok");
			}
			if (model) {
				this.log(projectId, active.sessionId, "acp:setModel", {
					model,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionModel(active.sessionId, model);
					this.log(projectId, active.sessionId, "acp:setModel:done", "ok");
					if (active.initialModels) active.initialModels = {
						...active.initialModels,
						currentModelId: model
					};
					else active.initialModels = {
						currentModelId: model,
						availableModels: []
					};
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setModel:warn", { message: err?.message });
				}
			}
			if (language && typeof active.connection.setSessionConfigOption === "function") {
				this.log(projectId, active.sessionId, "acp:setLanguage", {
					language,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionConfigOption(active.sessionId, "language", language);
					this.log(projectId, active.sessionId, "acp:setLanguage:done", "ok");
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setLanguage:warn", { message: err?.message });
				}
			}
			if (contextWindow && typeof active.connection.setSessionConfigOption === "function") {
				this.log(projectId, active.sessionId, "acp:setContextWindow", {
					contextWindow,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionConfigOption(active.sessionId, "context_window", String(contextWindow));
					this.log(projectId, active.sessionId, "acp:setContextWindow:done", "ok");
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setContextWindow:warn", { message: err?.message });
				}
			}
			const { connection, sessionId, eventChannel } = active;
			const promptParams = {
				content: injectNetDriveAttachments(await this.ensureProjectNetdriveRoot(prompt, projectId)),
				_meta: { "codebuddy.ai": {
					...projectId ? { projectId } : {},
					...language ? {
						language,
						locale: language
					} : {},
					requestId,
					...Array.isArray(displayBlocks) && displayBlocks.length > 0 ? { extra: { sourceContentBlocks: displayBlocks } } : {}
				} }
			};
			this.log(projectId, sessionId, "prompt:start", {
				conversationId,
				model,
				requestId
			});
			this.incInflightPrompt(conversationId);
			let promptDone = false;
			const promptStartedAt = Date.now();
			this.cloudSandboxTelemetry.promptSubmit({
				...this.getTelemetryActiveFields(active, requestId),
				conversationId,
				mode: modeId ?? active.currentModeId,
				model: model ?? active.initialModels?.currentModelId
			});
			const promptPromise = connection.prompt(sessionId, promptParams);
			const silenceGuard = this.createPromptSilenceGuard(conversationId, active);
			const baseFields = this.getTelemetryActiveFields(active, requestId);
			this.firstChunkPending.set(conversationId, {
				promptStartedAt,
				baseFields,
				conversationId
			});
			const promptCompleted = Promise.race([promptPromise, silenceGuard.rejected]).then((response) => {
				this.log(projectId, sessionId, "prompt:resolved", "ok");
				promptDone = true;
				const stopReason = response && typeof response === "object" ? response.stopReason : void 0;
				const acpError = classifyAcpTerminalErrorTelemetry(typeof stopReason === "string" ? stopReason : void 0, readPromptResponseErrorHint(response));
				this.cloudSandboxTelemetry.promptComplete({
					...baseFields,
					conversationId,
					outcome: "success",
					duration_ms: cloudSandboxDurationSince(promptStartedAt),
					...acpError ? toCloudSandboxAcpErrorFields(acpError) : {}
				});
			}, (err) => {
				promptDone = true;
				this.log(projectId, sessionId, "prompt:error", { message: err?.message });
				this.cloudSandboxTelemetry.promptComplete({
					...baseFields,
					conversationId,
					outcome: "failed",
					duration_ms: cloudSandboxDurationSince(promptStartedAt)
				}, err);
				throw err;
			}).finally(() => {
				silenceGuard.cancel();
				this.decInflightPrompt(conversationId);
			});
			const innerRawStream = this.buildRawStream(eventChannel, () => promptDone, 200, projectId, sessionId, conversationId);
			const maybeEmitFirstChunk = this.maybeEmitFirstChunk.bind(this);
			const rawStream = { [Symbol.asyncIterator]() {
				const inner = innerRawStream[Symbol.asyncIterator]();
				return {
					async next() {
						const result = await inner.next();
						if (!result.done) maybeEmitFirstChunk(conversationId, result.value);
						return result;
					},
					return() {
						return inner.return?.() ?? Promise.resolve({
							value: void 0,
							done: true
						});
					}
				};
			} };
			const stream = this.parseStream(rawStream, projectId, sessionId);
			return {
				conversationId,
				sessionId,
				stream,
				rawStream,
				events: active.artifactEvents,
				promptCompleted,
				requestId
			};
		}
		/**
		* 仅解析 sessionId（GET /console/as/conversations/{id}/session），不建 ACP 连接。
		*
		* 用于把"拿 sessionId"和"建立 ACP 连接 + loadSession"解耦：
		* - 网盘历史预加载（CA2 download）只需要 sessionId 即可定位 runtime 目录，
		*   把它从 connect() 后的 fire-and-forget 提前到 connect() 之前发起，
		*   就能与 ACP 握手 + loadSession 真正并发竞速首屏（对齐 task/xxx 路由）。
		* - 命中点：
		*   1) 已有 ActiveChatConnection → 直接返回 sessionId（零网络）；
		*   2) in-flight 的 GET → join 同一个 Promise；
		*   3) 否则发新 GET，结果缓存到 pendingSessionInfo，让随后真正的 connect()
		*      内部 connectToTask 也走同一份 sessionInfo，不再重发请求。
		* - 失败时清缓存，下次自动重试。
		*/
		async resolveSessionId(conversationId, projectId) {
			return (await this.fetchSessionInfo(conversationId, projectId)).sessionId || conversationId;
		}
		/**
		* 内部：拿到 TaskSessionInfo（sessionId/link/cwd/sandboxId/token），带 in-flight 去重。
		*/
		async fetchSessionInfo(conversationId, projectId) {
			const existing = this.connections.get(conversationId);
			if (existing) return {
				sessionId: existing.sessionId,
				link: existing.endpoint,
				cwd: existing.cwd,
				sandboxId: existing.sandboxId,
				token: existing.token
			};
			const pending = this.pendingSessionInfo.get(conversationId);
			if (pending) {
				this.log(projectId, conversationId, "resolveSessionId:joinPending", {});
				return pending;
			}
			this.log(projectId, conversationId, "resolveSessionId:fetch", {});
			const work = this.taskOps.connectTask(conversationId).then((info) => {
				this.log(projectId, conversationId, "resolveSessionId:res", {
					sessionId: info.sessionId,
					sandboxId: info.sandboxId
				});
				return info;
			}).catch((err) => {
				this.pendingSessionInfo.delete(conversationId);
				this.log(projectId, conversationId, "resolveSessionId:error", { message: err?.message });
				throw err;
			});
			this.pendingSessionInfo.set(conversationId, work);
			return work;
		}
		/**
		* #57806: 预热任务连接——在用户真正进入任务前（focus/hover/click），提前建一条
		* 临时连接并跑一次 loadSession，把 sandbox agent 侧的 session 加载进内存缓存。
		*
		* 背景：实测「首次切到自动化任务」慢在后端 loadSession（冷启动 5-10s，agent 侧要从
		* JSONL 反序列化累积的长历史）；一旦 agent 内存里有了 session（热），后续全新连接的
		* loadSession 只要 ~0.75s。agent 侧缓存跨客户端连接保留（reuseActiveConnection 全程
		* 不命中，每次切换都是全新连接，但热态 loadSession 仍快 → 证明热在 agent 侧）。
		*
		* 实现：connectToTask('load') 提前完成 ACP connect/loadSession 并暂存连接；用户点击时
		* connect() join/提升该连接，直接消费 eventChannel 中的历史。未点击则 2min 后释放。
		* 幂等：已连接/正连/正预热则跳过。失败静默（connect() 会走标准路径重试）。
		*/
		prewarmConnect(conversationId, projectId) {
			if (this.connections.has(conversationId) || this.pendingSessionInfo.has(conversationId) || this.pendingConnect.has(conversationId) || this.connecting.has(conversationId) || this.prewarming.has(conversationId)) return;
			const work = this.connectToTask(conversationId, "load", projectId).then((active) => {
				this.log(projectId, conversationId, "prewarm:warmed", { sessionId: active.sessionId });
				const timer = setTimeout(() => {
					this.prewarmExpiryTimers.delete(conversationId);
					if ((this.refCount.get(conversationId) ?? 0) > 0 || this.connections.get(conversationId) !== active) return;
					this.connections.delete(conversationId);
					try {
						active.eventChannel.close();
					} catch {}
					try {
						active.connection.removeAllListeners();
					} catch {}
					active.connection.disconnect().catch(() => {});
					this.log(projectId, conversationId, "prewarm:expired", { sessionId: active.sessionId });
				}, ProjectChatService.PREWARM_TTL_MS);
				this.prewarmExpiryTimers.set(conversationId, timer);
				return active;
			}).finally(() => {
				this.prewarming.delete(conversationId);
			});
			this.prewarming.set(conversationId, work);
			work.catch((err) => {
				this.log(projectId, conversationId, "prewarm:failed", { message: err?.message });
			});
		}
		/**
		* Connect to an existing conversation and load history.
		* Returns both raw notification stream and parsed chunk stream.
		* NOTE: Only ONE of `rawStream` or `stream` should be consumed — they share the same event channel.
		*/
		async connect(conversationId, projectId) {
			const wasReleasedInGrace = this.cancelPendingDisconnect(conversationId);
			const newCount = (this.refCount.get(conversationId) ?? 0) + 1;
			this.refCount.set(conversationId, newCount);
			this.log(projectId, conversationId, "connect:enter", {
				connectionCount: this.connections.size,
				hasExisting: this.connections.has(conversationId),
				hasPending: this.pendingConnect.has(conversationId),
				refCount: newCount,
				wasReleasedInGrace
			});
			const prewarming = this.prewarming.get(conversationId);
			if (prewarming) {
				this.log(projectId, conversationId, "connect:joinPrewarm", {});
				try {
					const active = await prewarming;
					return this.promotePrewarmedConnection(conversationId, active);
				} catch {}
			}
			const prewarmed = this.connections.get(conversationId);
			if (prewarmed && this.prewarmExpiryTimers.has(conversationId)) return this.promotePrewarmedConnection(conversationId, prewarmed);
			if (this.connections.has(conversationId)) {
				if (!wasReleasedInGrace) {
					if (newCount === 1) try {
						return await this.reloadHistoryOnReclaim(conversationId, newCount);
					} catch (err) {
						this.log(void 0, conversationId, "connect:reloadOnReclaim:unexpected", { message: err?.message });
						if (this.connections.has(conversationId)) return this.reuseActiveConnection(conversationId, newCount);
						this.releaseRefCount(conversationId, "connect:reloadOnReclaim:unexpected");
						throw err;
					}
					return this.reuseActiveConnection(conversationId, newCount);
				}
				await this.tearDownStaleConnection(conversationId, newCount);
			}
			const pending = this.pendingConnect.get(conversationId);
			if (pending) {
				this.log(projectId, conversationId, "connect:joinPending", { refCount: newCount });
				let result;
				try {
					result = await pending;
				} catch (err) {
					this.releaseRefCount(conversationId, "connect:joinPending:failed");
					throw err;
				}
				const emptyStream = (async function* () {})();
				return {
					sessionId: result.sessionId,
					stream: emptyStream,
					rawStream: emptyStream,
					events: result.events,
					currentModeId: result.currentModeId,
					currentModelId: result.currentModelId
				};
			}
			const guarded = (async () => {
				const active = await this.openConnection(conversationId, "connect-only", projectId);
				const { sessionId: sid, cwd: cwdVal } = active;
				this.log(active.projectId, sid, "acp:loadSession", {
					sessionId: sid,
					cwd: cwdVal
				});
				const loadStartedAt = Date.now();
				try {
					const loadResp = await this.loadSessionUntilSessionReady({
						connection: active.connection,
						sessionId: sid,
						cwd: cwdVal,
						conversationId,
						projectId: active.projectId
					});
					active.initialModels = loadResp?.models ?? void 0;
					active.initialModes = loadResp?.modes ?? void 0;
					active.currentModeId = active.initialModes?.currentModeId;
					active.historyEndOffset = loadResp ? readHistoryEndOffset(loadResp) : void 0;
					this.log(active.projectId, sid, "acp:loadSession:done", {
						currentModeId: active.currentModeId,
						currentModelId: active.initialModels?.currentModelId,
						historyEndOffset: active.historyEndOffset
					});
					this.cloudSandboxTelemetry.sessionReady({
						...this.getTelemetryActiveFields(active),
						conversationId,
						cold_start: true,
						reuse_type: active.reuseType ?? "new_connection",
						duration_ms: cloudSandboxDurationSince(loadStartedAt),
						session_mode: "connect-only"
					});
				} catch (error) {
					this.cloudSandboxTelemetry.sessionError({
						...this.getTelemetryActiveFields(active),
						conversationId,
						session_mode: "connect-only"
					}, error);
					this.connections.delete(conversationId);
					this.filesystems.delete(conversationId);
					try {
						active.eventChannel.close();
					} catch {}
					try {
						active.connection.removeAllListeners();
					} catch {}
					try {
						await active.connection.disconnect();
					} catch {}
					throw error;
				}
				return this.createHistoryConnectResult(conversationId, active);
			})().finally(() => {
				this.pendingConnect.delete(conversationId);
			});
			this.pendingConnect.set(conversationId, guarded);
			return guarded.catch((err) => {
				this.releaseRefCount(conversationId, "connect:work:failed");
				throw err;
			});
		}
		/**
		* 发 session/load，命中「session 未就绪」降级空响应时按退避重试。
		*
		* 为什么要重试：任务空闲久了沙箱会被回收，再打开时后端已把 link 交回来、但 box 侧
		* 仍在冷恢复（持久盘挂载 / `sessions.json` 恢复未完成），此时 session/load 回空
		* result（见 `isSessionNotReadyLoadResponse`）。历史流随即以 0 帧收尾，对话页空白，
		* 而 box 通常在一两秒内就把 session 恢复出来——线上实测用户手动切走再切回即正常。
		* 在存活连接上重发 loadSession 是既有安全操作（同 `reloadHistoryOnReclaim`：box 的
		* message-log 订阅对同一 connectionId 会先摘旧订阅再重挂，不会双投递）。
		*
		* 重试耗尽仍为空则原样返回，调用方按空历史继续（退化为修复前行为，不阻断连接）。
		*/
		async loadSessionUntilSessionReady(args) {
			const { connection, sessionId, cwd, conversationId, projectId } = args;
			const delays = ProjectChatService.LOAD_SESSION_NOT_READY_RETRY_DELAYS_MS;
			const load = async () => await connection.loadSession({
				sessionId,
				cwd
			});
			let resp = await load();
			for (let attempt = 0; attempt < delays.length; attempt++) {
				if (!isSessionNotReadyLoadResponse(resp)) return resp;
				this.log(projectId, sessionId, "acp:loadSession:sessionNotReady", {
					conversationId,
					attempt: attempt + 1,
					retryInMs: delays[attempt]
				});
				await sleep(delays[attempt]);
				resp = await load();
			}
			if (isSessionNotReadyLoadResponse(resp)) this.log(projectId, sessionId, "acp:loadSession:sessionNotReady:exhausted", {
				conversationId,
				attempts: delays.length + 1
			});
			return resp;
		}
		promotePrewarmedConnection(conversationId, active) {
			const timer = this.prewarmExpiryTimers.get(conversationId);
			if (timer) clearTimeout(timer);
			this.prewarmExpiryTimers.delete(conversationId);
			this.pendingSessionInfo.delete(conversationId);
			this.log(active.projectId, conversationId, "connect:promotePrewarm", { sessionId: active.sessionId });
			this.cloudSandboxTelemetry.sessionReady({
				...this.getTelemetryActiveFields(active),
				conversationId,
				cold_start: false,
				reuse_type: "active_connection"
			});
			return this.createHistoryConnectResult(conversationId, active);
		}
		createHistoryConnectResult(conversationId, active, onHistoryReplayed) {
			this.log(active.projectId, active.sessionId, "connect:history", { conversationId });
			const stream = this.collectHistory(active);
			const innerHistoryRaw = this.collectHistoryRaw(active);
			const historyStartedAt = Date.now();
			let historyMessageCount = 0;
			let maxReplayedOffset = -1;
			const historyTelemetry = this.cloudSandboxTelemetry;
			const historyBaseFields = this.getTelemetryActiveFields(active);
			const historyLog = this.log.bind(this);
			const rawStream = { async *[Symbol.asyncIterator]() {
				try {
					for await (const notification of innerHistoryRaw) {
						historyMessageCount++;
						const offset = readCodebuddyOffset(notification);
						if (offset > maxReplayedOffset) maxReplayedOffset = offset;
						yield notification;
					}
				} finally {
					historyTelemetry.sessionHistoryLoaded({
						...historyBaseFields,
						conversationId,
						duration_ms: cloudSandboxDurationSince(historyStartedAt),
						message_count: historyMessageCount
					});
					historyLog(active.projectId, active.sessionId, "connect:history_loaded", {
						conversationId,
						duration_ms: cloudSandboxDurationSince(historyStartedAt),
						message_count: historyMessageCount
					});
					onHistoryReplayed?.({ maxReplayedOffset });
				}
			} };
			return {
				sessionId: active.sessionId,
				stream,
				rawStream,
				events: active.artifactEvents,
				currentModeId: active.currentModeId,
				currentModelId: active.initialModels?.currentModelId
			};
		}
		reuseActiveConnection(conversationId, refCount) {
			const existing = this.connections.get(conversationId);
			this.log(existing.projectId, conversationId, "connect", {
				msg: "already connected (handoff), returning empty",
				connectionCount: this.connections.size,
				refCount
			});
			this.cloudSandboxTelemetry.sessionReady({
				...this.getTelemetryActiveFields(existing),
				conversationId,
				cold_start: false,
				reuse_type: "active_connection"
			});
			const emptyStream = (async function* () {})();
			return {
				sessionId: existing.sessionId,
				stream: emptyStream,
				rawStream: emptyStream,
				events: existing.artifactEvents,
				currentModeId: existing.currentModeId,
				currentModelId: existing.initialModels?.currentModelId
			};
		}
		/**
		* 重认领一条「孤儿但仍存活」的连接（refCount 曾归 0、tearDown 因 prompt inflight 被推迟），
		* 在该连接上重发一次 loadSession 做完整历史回放，然后按普通连接一样返回 history 流。
		*
		* 背景（owner 进行中 turn 切走再切回丢进度）：进行中 turn 期间切走，disconnect 把 tearDown
		* 推迟到 prompt 结束，连接不拆。切回时 connect 命中 reuse 分支，旧行为 reuseActiveConnection
		* 返回空 history → 重连 UI 只能接 live，切走前那段 turn 进度全丢。
		*
		* **时序不变量（本方法安全性的核心）**：先 `drain()` 再 `loadSession()`。drain 只可能取到
		* 「已跨端到达」的帧，而每条带 offset 的内容帧都是 sandbox 侧 `MessageLog.append`（在那里被赋
		* offset）**严格先于** `startConnectionSubscription` 跨 SSE 推送产生的——即 append 一定早于
		* 到达 client 的 push。因此 drain 出来的帧其 append 必发生在随后（drain 之后）loadSession 读取
		* `tailOffset` 之前；只要 loadSession 认为「有历史」(historyEndOffset>=0)，从 offset 0 的全量
		* 回放就必覆盖这些帧（即便 chunk 合并令 tailOffset 低于某个曾见 offset —— 合并只是把内容并入
		* 更低 offset 的条目，内容不丢；故**不能**用 `historyEndOffset < lastSeenOffset` 判丢帧，会误报）。
		*
		* 防御兜底（杜绝任何静默丢帧）：所有「不做干净全量回放」的分支都先把 drain 出来的帧原样推回，
		* 再退回旧的空流握手（live loop 仍会 drain 它们，等同修复前）：
		*   - loadSession 抛错；
		*   - 我们 drain 掉了带 offset 的内容帧(lastSeenOffset>=0)，但 loadSession 却报「无历史」
		*     (historyEndOffset 为 -1 / 缺失，#61460 家族) —— 此时全量回放不会重发这些帧。
		*
		* 仅在「独占重认领」(newCount===1，即 refCount 曾为 0) 时调用：此刻没有其他消费者在 drain
		* eventChannel，drain / 推回都安全。
		*/
		async reloadHistoryOnReclaim(conversationId, refCount) {
			const active = this.connections.get(conversationId);
			this.log(active.projectId, active.sessionId, "connect:reloadOnReclaim", {
				conversationId,
				connectionCount: this.connections.size
			});
			const buffered = active.eventChannel.drain();
			const lastSeenOffset = maxCodebuddyOffset(buffered);
			const restoreBuffer = () => {
				for (const n of buffered) active.eventChannel.push(n);
			};
			const loadStartedAt = Date.now();
			let loadResp;
			try {
				loadResp = await active.connection.loadSession({
					sessionId: active.sessionId,
					cwd: active.cwd
				});
			} catch (err) {
				this.log(active.projectId, active.sessionId, "connect:reloadOnReclaim:loadFailed", { message: err?.message });
				restoreBuffer();
				return this.reuseActiveConnection(conversationId, refCount);
			}
			const historyEndOffset = readHistoryEndOffset(loadResp);
			if (lastSeenOffset >= 0 && !(typeof historyEndOffset === "number" && historyEndOffset >= 0)) {
				this.log(active.projectId, active.sessionId, "connect:reloadOnReclaim:emptyReplayWhileBuffered", {
					lastSeenOffset,
					historyEndOffset: historyEndOffset ?? null
				});
				restoreBuffer();
				return this.reuseActiveConnection(conversationId, refCount);
			}
			active.initialModels = loadResp.models ?? active.initialModels;
			active.initialModes = loadResp.modes ?? active.initialModes;
			active.currentModeId = active.initialModes?.currentModeId;
			active.historyEndOffset = historyEndOffset;
			this.log(active.projectId, active.sessionId, "connect:reloadOnReclaim:done", {
				historyEndOffset: active.historyEndOffset,
				lastSeenOffset,
				currentModeId: active.currentModeId,
				currentModelId: active.initialModels?.currentModelId
			});
			this.cloudSandboxTelemetry.sessionReady({
				...this.getTelemetryActiveFields(active),
				conversationId,
				cold_start: false,
				reuse_type: "active_connection",
				duration_ms: cloudSandboxDurationSince(loadStartedAt),
				session_mode: "connect-only"
			});
			return this.createHistoryConnectResult(conversationId, active, ({ maxReplayedOffset }) => {
				if (lastSeenOffset < 0 || maxReplayedOffset >= 0) return;
				this.log(active.projectId, active.sessionId, "connect:reloadOnReclaim:replayMissing", {
					lastSeenOffset,
					historyEndOffset: historyEndOffset ?? null,
					bufferedCount: buffered.length
				});
				restoreBuffer();
			});
		}
		async tearDownStaleConnection(conversationId, refCount) {
			const existing = this.connections.get(conversationId);
			this.log(existing.projectId, conversationId, "connect:rebuildReleased", {
				msg: "reconnect within grace, tearing down stale connection to reload history",
				connectionCount: this.connections.size,
				refCount
			});
			this.cloudSandboxTelemetry.sessionClose({
				...this.getTelemetryActiveFields(existing),
				conversationId,
				close_reason: "rebuild_stale_connection"
			});
			this.connections.delete(conversationId);
			this.filesystems.delete(conversationId);
			this.rejectPendingPromptSilenceGuards(conversationId, "stale connection rebuilt");
			try {
				existing.eventChannel.close();
			} catch (e) {
				this.log(existing.projectId, existing.sessionId, "connect:rebuild:eventChannel.close:ERROR", { message: e?.message });
			}
			try {
				existing.connection.removeAllListeners();
			} catch (e) {
				this.log(existing.projectId, existing.sessionId, "connect:rebuild:removeAllListeners:ERROR", { message: e?.message });
			}
			try {
				await existing.connection.disconnect();
			} catch {}
		}
		releaseRefCount(conversationId, reason) {
			const current = this.refCount.get(conversationId) ?? 0;
			if (current <= 1) this.refCount.delete(conversationId);
			else this.refCount.set(conversationId, current - 1);
			this.log(void 0, conversationId, "refCount:release", {
				reason,
				before: current,
				after: Math.max(0, current - 1)
			});
		}
		cancelPendingDisconnect(conversationId) {
			const timer = this.disconnectTimers.get(conversationId);
			if (!timer) return false;
			clearTimeout(timer);
			this.disconnectTimers.delete(conversationId);
			this.log(void 0, conversationId, "disconnect:cancelled", { reason: "reconnect-within-grace" });
			return true;
		}
		incInflightPrompt(conversationId) {
			const next = (this.inflightPrompts.get(conversationId) ?? 0) + 1;
			this.inflightPrompts.set(conversationId, next);
			this.lastFrameAt.set(conversationId, Date.now());
			this.log(void 0, conversationId, "inflight:inc", { inflight: next });
		}
		decInflightPrompt(conversationId) {
			const current = this.inflightPrompts.get(conversationId) ?? 0;
			const next = Math.max(0, current - 1);
			if (next === 0) this.inflightPrompts.delete(conversationId);
			else this.inflightPrompts.set(conversationId, next);
			this.log(void 0, conversationId, "inflight:dec", { inflight: next });
			if (next === 0) {
				this.clearInflightSilenceWatchdog(conversationId);
				const waiter = this.pendingTearDownAfterInflight.get(conversationId);
				if (waiter) {
					this.pendingTearDownAfterInflight.delete(conversationId);
					this.log(void 0, conversationId, "tearDown:resumeAfterInflight", {});
					waiter();
				}
			}
		}
		isInflight(conversationId) {
			return (this.inflightPrompts.get(conversationId) ?? 0) > 0;
		}
		static {
			this.INFLIGHT_SILENCE_TIMEOUT_MS = 3e5;
		}
		static {
			this.PROMPT_SILENCE_TIMEOUT_MS = 6e5;
		}
		/**
		* 给单个 prompt 挂静默超时：连续 `PROMPT_SILENCE_TIMEOUT_MS` 没有 frame 就 reject。
		*
		* 与 `promptPromise` race 使用。只要期间有 frame 就顺延，因此长 turn 不受影响；
		* reject 后 `promptCompleted` 的失败分支会照常打 `prompt:error`、上报 telemetry，
		* 并在 finally 里 `decInflightPrompt` —— 这正是 #9591 里始终没能跑到的收口路径。
		*
		* 错误文案刻意避开 `acp-reconnect-retry.ts` 的连接关闭白名单：这类超时重连也好不了
		* （sandbox 侧 session 仍然吞 prompt），不该被自动重连链路吞掉，要让用户看到失败。
		*
		* `owner` 是本 prompt 发出时的那条连接。判定必须绑定它，否则连接被拆掉、同一会话又
		* 建了新连接时，遗留的 guard 会拿新连接的 frame 一路续期，永远不 settle。
		*/
		createPromptSilenceGuard(conversationId, owner) {
			const timeout = ProjectChatService.PROMPT_SILENCE_TIMEOUT_MS;
			let timer;
			let settled = false;
			let deregister = () => {};
			return {
				rejected: new Promise((_resolve, reject) => {
					const fail = (message) => {
						settled = true;
						deregister();
						reject(new Error(message));
					};
					const tick = () => {
						if (settled) return;
						if (this.connections.get(conversationId) !== owner) {
							fail("prompt abandoned: connection was torn down before any response");
							return;
						}
						const lastFrameAt = this.lastFrameAt.get(conversationId);
						if (lastFrameAt === void 0) {
							fail("prompt abandoned: silence baseline was cleared before any response");
							return;
						}
						const silentForMs = Date.now() - lastFrameAt;
						if (silentForMs < timeout) {
							timer = setTimeout(tick, timeout - silentForMs);
							return;
						}
						fail(`prompt silent for ${silentForMs}ms without any stream frame`);
					};
					const rejecters = this.promptSilenceRejecters.get(conversationId) ?? /* @__PURE__ */ new Set();
					rejecters.add(reject);
					this.promptSilenceRejecters.set(conversationId, rejecters);
					deregister = () => {
						const current = this.promptSilenceRejecters.get(conversationId);
						if (!current) return;
						current.delete(reject);
						if (current.size === 0) this.promptSilenceRejecters.delete(conversationId);
					};
					timer = setTimeout(tick, timeout);
				}),
				cancel: () => {
					settled = true;
					deregister();
					if (timer) {
						clearTimeout(timer);
						timer = void 0;
					}
				}
			};
		}
		/**
		* 拆连接时立刻终结该会话所有还没 settle 的 prompt 静默超时。
		*
		* 不依赖下一次 tick：tick 最坏要等满一个静默窗口才会发现连接已没了，那段时间里
		* UI 一直转圈、遥测的 duration_ms 也会虚高一个窗口。
		*/
		rejectPendingPromptSilenceGuards(conversationId, reason) {
			const rejecters = this.promptSilenceRejecters.get(conversationId);
			if (!rejecters || rejecters.size === 0) return;
			this.promptSilenceRejecters.delete(conversationId);
			this.log(void 0, conversationId, "prompt:silenceGuard:rejectPending", {
				count: rejecters.size,
				reason
			});
			for (const reject of rejecters) reject(/* @__PURE__ */ new Error(`prompt abandoned: ${reason}`));
		}
		/**
		* 给「因 inflight 被推迟的 tearDown」挂一个静默看门狗，把无限期 defer 变成有界 defer。
		*
		* 每次触发时重新核对静默时长：期间只要有 frame 到达（说明 turn 还活着），就顺延到下一个
		* 静默窗口，不打断正常的长 turn；真正连续静默超限才强制释放 inflight 并落地 tearDown，
		* 让下一次 `connect()` 走重建路径而不是复用死连接。
		*/
		armInflightSilenceWatchdog(conversationId) {
			if (this.inflightSilenceTimers.has(conversationId)) return;
			const timeout = ProjectChatService.INFLIGHT_SILENCE_TIMEOUT_MS;
			const tick = () => {
				this.inflightSilenceTimers.delete(conversationId);
				if (!this.isInflight(conversationId)) return;
				if ((this.refCount.get(conversationId) ?? 0) >= 1) {
					this.log(void 0, conversationId, "inflight:silenceWatchdog:stop", { reason: "reconnected" });
					return;
				}
				const silentForMs = Date.now() - (this.lastFrameAt.get(conversationId) ?? 0);
				if (silentForMs < timeout) {
					this.inflightSilenceTimers.set(conversationId, setTimeout(tick, timeout - silentForMs));
					return;
				}
				this.log(void 0, conversationId, "inflight:silenceTimeout", {
					inflight: this.inflightPrompts.get(conversationId) ?? 0,
					silent_for_ms: silentForMs
				});
				this.inflightPrompts.delete(conversationId);
				this.pendingTearDownAfterInflight.delete(conversationId);
				this.runTearDownGuarded(conversationId);
			};
			this.inflightSilenceTimers.set(conversationId, setTimeout(tick, timeout));
		}
		clearInflightSilenceWatchdog(conversationId) {
			const timer = this.inflightSilenceTimers.get(conversationId);
			if (timer) {
				clearTimeout(timer);
				this.inflightSilenceTimers.delete(conversationId);
			}
		}
		/**
		* 登记一次保活租约，阻止 UI 离场后连接被 tearDown。
		*
		* 不建连、不 loadSession、不返回流，也不触碰 `refCount` —— 纯粹是 tearDown 闸门的一票否决。
		* 因此它只能护住一条**已存在**的连接，不能凭空创建连接。
		*
		* 必须与 `releaseKeepAlive` 成对调用（放在 `finally` 里），否则连接直到进程退出都不会释放。
		*/
		acquireKeepAlive(conversationId) {
			const next = (this.keepAlives.get(conversationId) ?? 0) + 1;
			this.keepAlives.set(conversationId, next);
			this.log(void 0, conversationId, "keepAlive:acquire", { keepAlive: next });
		}
		/**
		* 归还一次保活租约。最后一个租约归还时，若 UI 已经离场（refCount 为 0），
		* 补一次 tearDown —— 保活期间被 `runTearDownGuarded` 放弃掉的那次不会自己回来。
		*/
		releaseKeepAlive(conversationId) {
			const current = this.keepAlives.get(conversationId) ?? 0;
			const next = Math.max(0, current - 1);
			if (next === 0) this.keepAlives.delete(conversationId);
			else this.keepAlives.set(conversationId, next);
			this.log(void 0, conversationId, "keepAlive:release", { keepAlive: next });
			if (next > 0) return;
			if ((this.refCount.get(conversationId) ?? 0) >= 1) return;
			this.runTearDownGuarded(conversationId);
		}
		hasKeepAlive(conversationId) {
			return (this.keepAlives.get(conversationId) ?? 0) > 0;
		}
		static {
			this.DISCONNECT_GRACE_MS = 0;
		}
		async disconnect(conversationId) {
			const current = this.refCount.get(conversationId) ?? 0;
			if (current > 1) {
				const next = current - 1;
				this.refCount.set(conversationId, next);
				this.log(void 0, conversationId, "disconnect:refDec", { refCount: next });
				return;
			}
			this.refCount.delete(conversationId);
			if (this.disconnectTimers.has(conversationId)) return;
			const delayMs = ProjectChatService.DISCONNECT_GRACE_MS;
			const inflight = this.inflightPrompts.get(conversationId) ?? 0;
			this.log(void 0, conversationId, "disconnect:scheduled", {
				delayMs,
				inflight
			});
			const timer = setTimeout(() => {
				this.disconnectTimers.delete(conversationId);
				if ((this.refCount.get(conversationId) ?? 0) >= 1) {
					this.log(void 0, conversationId, "disconnect:skipped", { reason: "reconnected-during-grace" });
					return;
				}
				this.runTearDownGuarded(conversationId);
			}, delayMs);
			this.disconnectTimers.set(conversationId, timer);
		}
		/**
		* 真正执行 tearDown 前的最后一道闸门：inflight 进行中就先挂起，
		* 等 decInflightPrompt 归零回调里再触发。期间若有人重新 connect（refCount>=1）
		* 就放弃 tearDown。
		*/
		runTearDownGuarded(conversationId) {
			if (this.hasKeepAlive(conversationId)) {
				this.log(void 0, conversationId, "tearDown:skipped", {
					reason: "keep-alive",
					keepAlive: this.keepAlives.get(conversationId) ?? 0
				});
				return;
			}
			if (!this.isInflight(conversationId)) {
				this.tearDown(conversationId).catch(() => {});
				return;
			}
			if (this.pendingTearDownAfterInflight.has(conversationId)) {
				this.log(void 0, conversationId, "tearDown:deferred:dedup", { inflight: this.inflightPrompts.get(conversationId) ?? 0 });
				this.armInflightSilenceWatchdog(conversationId);
				return;
			}
			this.log(void 0, conversationId, "tearDown:deferred", {
				reason: "prompt-inflight",
				inflight: this.inflightPrompts.get(conversationId) ?? 0
			});
			this.armInflightSilenceWatchdog(conversationId);
			this.pendingTearDownAfterInflight.set(conversationId, () => {
				if ((this.refCount.get(conversationId) ?? 0) >= 1) {
					this.log(void 0, conversationId, "tearDown:abortAfterInflight", { reason: "reconnected-during-inflight" });
					return;
				}
				this.runTearDownGuarded(conversationId);
			});
		}
		async tearDown(conversationId) {
			const pending = this.pendingConnect.get(conversationId);
			if (pending) {
				this.log(void 0, conversationId, "tearDown:awaitingPending", {});
				try {
					await pending;
				} catch {}
			} else {
				const inflight = this.connecting.get(conversationId);
				if (inflight) {
					this.log(void 0, conversationId, "tearDown:awaitingInflight", {});
					try {
						await inflight;
					} catch {}
				}
			}
			if ((this.refCount.get(conversationId) ?? 0) >= 1) {
				this.log(void 0, conversationId, "tearDown:abort", { reason: "reconnected" });
				return;
			}
			const active = this.connections.get(conversationId);
			if (!active) {
				this.log(void 0, conversationId, "tearDown:noActive", { conversationId });
				return;
			}
			this.log(active.projectId, active.sessionId, "disconnect", { conversationId });
			this.cloudSandboxTelemetry.sessionClose({
				...this.getTelemetryActiveFields(active),
				conversationId,
				close_reason: "disconnect"
			});
			this.connections.delete(conversationId);
			this.filesystems.delete(conversationId);
			this.firstChunkPending.delete(conversationId);
			this.clearInflightSilenceWatchdog(conversationId);
			this.rejectPendingPromptSilenceGuards(conversationId, "connection torn down");
			this.lastFrameAt.delete(conversationId);
			try {
				active.eventChannel.close();
			} catch (e) {
				this.log(active.projectId, active.sessionId, "disconnect:eventChannel.close:ERROR", { message: e?.message });
			}
			try {
				active.connection.removeAllListeners();
			} catch (e) {
				this.log(active.projectId, active.sessionId, "disconnect:removeAllListeners:ERROR", { message: e?.message });
			}
			try {
				await active.connection.disconnect();
			} catch {}
		}
		/**
		* Subscribe to the persistent event channel for a connected conversation.
		* Returns an infinite AsyncIterable that yields notifications until the connection is closed.
		* Used by the UI to listen for queue-dispatched turns after the initial sendMessage completes.
		*/
		/**
		* 若该会话正在等首 chunk 且本条 notification 是首个 agent chunk，emit promptFirstChunk
		* （end wait_ttft + start streaming）并清 pending。subscribe / rawStream 两条流都调，
		* map 保证只 emit 一次。
		*/
		maybeEmitFirstChunk(conversationId, notification) {
			const pending = this.firstChunkPending.get(conversationId);
			if (!pending) return;
			const updateType = (notification?.update)?.sessionUpdate;
			if (updateType !== "agent_message_chunk" && updateType !== "agent_thought_chunk") return;
			this.firstChunkPending.delete(conversationId);
			this.cloudSandboxTelemetry.promptFirstChunk({
				...pending.baseFields,
				conversationId,
				duration_ms: cloudSandboxDurationSince(pending.promptStartedAt),
				chunk_type: updateType
			});
		}
		subscribe(conversationId) {
			const active = this.connections.get(conversationId);
			if (!active) return null;
			const { eventChannel, projectId, sessionId } = active;
			const log = this.log.bind(this);
			const maybeEmitFirstChunk = this.maybeEmitFirstChunk.bind(this);
			return { [Symbol.asyncIterator]() {
				return {
					async next() {
						const notification = await eventChannel.next();
						if (notification === null) return {
							value: void 0,
							done: true
						};
						log(projectId, sessionId, "subscribe:notification", notification);
						maybeEmitFirstChunk(conversationId, notification);
						return {
							value: notification,
							done: false
						};
					},
					return() {
						return Promise.resolve({
							value: void 0,
							done: true
						});
					}
				};
			} };
		}
		/**
		* Disconnect all connections (cleanup).
		*/
		async disconnectAll() {
			const ids = Array.from(this.connections.keys());
			await Promise.all(ids.map((id) => this.disconnect(id)));
		}
		async answerQuestion(conversationId, toolCallId, answers) {
			const active = this.connections.get(conversationId);
			if (!active) return false;
			if (active.connection.answerQuestion(toolCallId, answers)) return true;
			return this.resolveInterruptionFallback(active, toolCallId, "allow", answers);
		}
		async cancelQuestion(conversationId, toolCallId, reason) {
			const active = this.connections.get(conversationId);
			if (!active) return false;
			if (active.connection.cancelQuestion(toolCallId, reason)) return true;
			return this.resolveInterruptionFallback(active, toolCallId, "deny", void 0, reason);
		}
		/**
		* 服务端权威的未回答提问列表（issue #99667）。契约见 `ProjectChatServiceContract`。
		*
		* 未连接时返回空数组，而不是抛错——调用方（UI）只把它当兜底源，
		* 拿不到就退回原有的消息流反推结果。
		*/
		getPendingQuestions(conversationId) {
			const active = this.connections.get(conversationId);
			if (!active) return [];
			const pending = active.connection.getPendingQuestions?.();
			if (!pending) return [];
			const result = [];
			for (const [toolCallId, entry] of pending) {
				const request = entry.request;
				result.push({
					toolCallId,
					sessionId: request.sessionId ?? active.sessionId,
					rawQuestions: request.schema?.questions ?? request.questions,
					createdAt: entry.createdAt
				});
			}
			return result;
		}
		/**
		* 按 toolCallId 定址收口一个 pending 交互问题（AskUserQuestion 等）。
		* 经 CloudAgentConnection.extMethod 发 `_codebuddy.ai/resolveInterruption` 到远端
		* agent-cli 的 handleResolveInterruption，不依赖 renderer QuestionManager 的 live 承诺，
		* 因此对"久远任务重连、问题以渲染事件重推"的场景可用。
		*/
		async resolveInterruptionFallback(active, toolCallId, decision, answers, reason) {
			try {
				const result = await active.connection.extMethod("_codebuddy.ai/resolveInterruption", {
					sessionId: active.sessionId,
					toolCallId,
					decision,
					...answers ? { answers } : {},
					...reason ? { reason } : {}
				});
				const resolved = result?.resolved === true || result?.queued === true;
				this.log(active.projectId, active.sessionId, "answerQuestion:resolveInterruption", {
					toolCallId,
					decision,
					resolved
				});
				return resolved;
			} catch (error) {
				this.log(active.projectId, active.sessionId, "answerQuestion:resolveInterruption:error", {
					toolCallId,
					decision,
					error: error instanceof Error ? error.message : String(error)
				});
				return false;
			}
		}
		async cancel(conversationId) {
			const active = this.connections.get(conversationId);
			if (!active) return;
			this.log(active.projectId, active.sessionId, "cancel", { conversationId });
			await active.connection.cancel(active.sessionId);
		}
		async setModel(conversationId, modelId) {
			const active = this.connections.get(conversationId);
			if (!active) throw new Error(`[ProjectChatService] No active connection for conversation: ${conversationId}`);
			this.log(active.projectId, active.sessionId, "acp:setModel", {
				model: modelId,
				reason: "user-switch"
			});
			try {
				await active.connection.setSessionModel(active.sessionId, modelId);
				this.log(active.projectId, active.sessionId, "acp:setModel:done", "ok");
				if (active.initialModels) active.initialModels = {
					...active.initialModels,
					currentModelId: modelId
				};
				else active.initialModels = {
					currentModelId: modelId,
					availableModels: []
				};
			} catch (err) {
				this.log(active.projectId, active.sessionId, "acp:setModel:warn", { message: err?.message });
				throw err;
			}
		}
		async setMode(conversationId, modeId) {
			const active = this.connections.get(conversationId);
			if (!active) throw new Error(`[ProjectChatService] No active connection for conversation: ${conversationId}`);
			this.log(active.projectId, active.sessionId, "acp:setMode", {
				modeId,
				reason: "user-switch"
			});
			try {
				await active.connection.setSessionMode(active.sessionId, modeId);
				this.log(active.projectId, active.sessionId, "acp:setMode:done", "ok");
				active.currentModeId = modeId;
				if (active.initialModes) active.initialModes = {
					...active.initialModes,
					currentModeId: modeId
				};
			} catch (err) {
				this.log(active.projectId, active.sessionId, "acp:setMode:warn", { message: err?.message });
				throw err;
			}
		}
		switchExpert(conversationId, params) {
			return this.taskOps.switchExpert(conversationId, params);
		}
		getConversationDetail(conversationId) {
			return this.taskOps.getConversationDetail(conversationId);
		}
		setConversationStatus(conversationId, status) {
			this.log(void 0, conversationId, "setConversationStatus", {
				conversationId,
				status
			});
			return this.taskOps.setConversationStatus(conversationId, status);
		}
		getSandboxId(conversationId) {
			return this.connections.get(conversationId)?.sandboxId;
		}
		/**
		* 将项目会话产物 URL（agent:// 各种形态 / sandbox 绝对路径）解析为可在 Desktop
		* webview 中加载的 sandbox-preview 本地代理 URL（HTML 产物统一 Webview 预览方案）。
		*
		* 非 agent:// / 非 sandbox 绝对路径的 URL 原样透传；无活跃连接或未注入
		* `sandboxPreviewRegisterMount` 时也原样透传（调用方据此判断是否走旧路径）。
		*/
		async resolvePreviewUrl(conversationId, url) {
			if (!url.startsWith("agent://") && !url.startsWith("/workspace/")) return url;
			const active = this.connections.get(conversationId) ?? Array.from(this.connections.values()).find((connection) => connection.sessionId === conversationId);
			if (!active || !this.sandboxPreviewRegisterMount) {
				this.log(active?.projectId, conversationId, "sandboxPreview:skip", {
					hasConnection: !!active,
					hasRegistrar: !!this.sandboxPreviewRegisterMount
				});
				return url;
			}
			const filePath = resolveProjectSandboxPreviewFilePath(url, active.cwd || "/workspace");
			if (!filePath) {
				this.log(active.projectId, conversationId, "sandboxPreview:unknownUrl", { url: url.slice(0, 120) });
				return url;
			}
			try {
				const result = await this.sandboxPreviewRegisterMount({
					source: "project",
					sessionId: active.sessionId,
					sandbox: {
						link: active.endpoint,
						token: active.token,
						sandboxId: active.sandboxId
					},
					root: "/"
				});
				const previewUrl = result.baseUrl + encodeURI(toProjectSandboxPreviewProxyPath(filePath));
				this.log(active.projectId, conversationId, "sandboxPreview:resolved", {
					filePath,
					previewUrl,
					mountId: result.mountId
				});
				return previewUrl;
			} catch (err) {
				this.log(active.projectId, conversationId, "sandboxPreview:error", { message: err?.message });
				return url;
			}
		}
		/**
		* 解析产物 REST 调用需要的 sandbox 端点信息（endpoint / token / sessionId）。
		*
		* 优先用已建立的 ActiveChatConnection；还没有连接时回退到 `fetchSessionInfo`
		* ——它只发一次 `GET /conversations/{id}/session`，并且与随后的 `connect()`
		* 共用同一份 in-flight 缓存（`connectToTask` 会消费它），因此不会多打 HTTP。
		*
		* 为什么要这条回退路径：产物拉取本身只需要 sandbox 地址 + sessionId，和 ACP
		* 握手/loadSession 无关。但此前这里一律要求 `connections.get()` 命中，等于把
		* 产物排在「ACP connect + loadSession + 历史回放」之后。实测（用户日志
		* conversationId=2086753360003989504）：`connectTask:res` 在 08:14:43.972 就已
		* 拿到 endpoint/token/sessionId，`openConnection:registered` 要到 08:14:47.443，
		* `listSessionArtifacts:ok` 更是晚到 08:14:50.014 —— 白等 6s，期间产物区全空。
		* 与网盘历史预加载提前走 `resolveSessionId` 起跑是同一套做法。
		*
		* 解析失败（会话不存在 / 无权限 / 网络错误）时返回 undefined，调用方按空列表
		* 处理：产物补偿是尽力而为的旁路，不应让任务页因此报错。
		*
		* `projectId` 只影响日志落盘目录：无连接时服务内部拿不到它，必须由调用方带进来，
		* 否则早拉的日志会写进 `teams-no-project/`，与连接建立后的日志分家。
		*/
		async resolveArtifactTarget(conversationId, projectId) {
			const conn = this.connections.get(conversationId);
			if (conn) return {
				endpoint: conn.endpoint,
				token: conn.token,
				sessionId: conn.sessionId,
				projectId: conn.projectId ?? projectId,
				sandboxId: conn.sandboxId
			};
			try {
				const info = await this.fetchSessionInfo(conversationId, projectId);
				return {
					endpoint: info.link.replace(/^http:\/\//, "https://"),
					token: info.token,
					sessionId: info.sessionId || conversationId,
					projectId,
					sandboxId: info.sandboxId
				};
			} catch (err) {
				this.log(projectId, conversationId, "listSessionArtifacts:noConn", {
					conversationId,
					message: err?.message
				});
				return;
			}
		}
		/**
		* 主动拉取会话累积的全部产物列表。
		* 通过 sandbox-proxy 的 GET /api/session/artifacts?sessionId=xxx 接口获取。
		*
		* 不要求 ACP 连接已建立：端点解析见 `resolveArtifactTarget`。
		*
		* 历史回放兜底（与 CloudAgentColleagueService.listSessionArtifacts 同源问题）：
		* sandbox-proxy 的 Go `types.Artifact` 没有 `_meta` 字段，REST 反序列化时
		* 会把 `_meta.sourceTool` 抹掉。但 `ArtifactSlotPanel.getArtifactAndMedia`
		* 又只显示 `sourceTool === 'PresentFiles'` 的 media，两者叠加导致 web 端
		* 任务对话历史产物卡片全部不可见（desktop 走 watcher/checkpoint + 实时
		* ACP `_codebuddy.ai/artifact` 事件原生带 `_meta`，不受影响）。
		*
		* sandbox 内的 media artifact 都来自 agent-cli 的 `present_files` 工具调用，
		* 因此对缺失 `_meta.sourceTool` 的 type === 'media' entry 兜底标记为
		* 'PresentFiles'，让历史回放与实时事件落到下游时形状一致。
		*/
		async listSessionArtifacts(conversationId, callerProjectId) {
			const target = await this.resolveArtifactTarget(conversationId, callerProjectId);
			if (!target) return [];
			const { endpoint, token, sessionId, projectId, sandboxId } = target;
			const startedAt = Date.now();
			const url = `${endpoint.replace(/\/acp\/?$/, "").replace(/\/+$/, "")}/api/session/artifacts?sessionId=${encodeURIComponent(sessionId)}`;
			const baseFields = this.getTelemetryBaseFields(projectId, void 0, sessionId, sandboxId);
			try {
				const resp = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
				if (!resp.ok) {
					this.log(projectId, sessionId, "listSessionArtifacts:httpError", { status: resp.status });
					this.cloudSandboxTelemetry.artifactSync({
						...baseFields,
						conversationId,
						outcome: "failed",
						duration_ms: cloudSandboxDurationSince(startedAt),
						error_kind: "http",
						error_code: `HTTP_${resp.status}`
					});
					return [];
				}
				const entries = ((await resp.json())?.data?.artifacts ?? []).map(restoreSourceToolForMediaEntry);
				this.log(projectId, sessionId, "listSessionArtifacts:ok", { count: entries.length });
				this.cloudSandboxTelemetry.artifactSync({
					...baseFields,
					conversationId,
					outcome: "success",
					duration_ms: cloudSandboxDurationSince(startedAt),
					artifact_count: Array.isArray(entries) ? entries.length : 0,
					artifact_types: Array.isArray(entries) ? summarizeArtifactTypes(entries) : "",
					sync_source: "compensation_fetch"
				});
				return entries;
			} catch (err) {
				this.log(projectId, sessionId, "listSessionArtifacts:ERROR", { message: err?.message });
				this.cloudSandboxTelemetry.artifactSync({
					...baseFields,
					conversationId,
					outcome: "failed",
					duration_ms: cloudSandboxDurationSince(startedAt)
				}, err);
				return [];
			}
		}
		/**
		* Get or create a FilesResource for the given conversation's sandbox.
		* Returns null if no active connection or no filesystem factory configured.
		*/
		async getFilesystem(conversationId) {
			const cached = this.filesystems.get(conversationId);
			if (cached) return cached;
			const conn = this.connections.get(conversationId);
			if (!conn) {
				this.logFs(conversationId, "getFilesystem:noConn", { conversationId });
				return null;
			}
			const startedAt = Date.now();
			if (this.filesystemFactory) {
				this.logFs(conversationId, "getFilesystem:factory", { sandboxId: conn.sandboxId });
				try {
					const fs = await this.filesystemFactory({
						sandboxId: conn.sandboxId,
						accessToken: conn.token
					});
					this.filesystems.set(conversationId, fs);
					this.cloudSandboxTelemetry.filesystemOutcome({
						...this.getTelemetryActiveFields(conn),
						conversationId,
						operation: "connect",
						outcome: "success",
						duration_ms: cloudSandboxDurationSince(startedAt),
						filesystem_source: "factory"
					});
					return fs;
				} catch (error) {
					this.cloudSandboxTelemetry.filesystemOutcome({
						...this.getTelemetryActiveFields(conn),
						conversationId,
						operation: "connect",
						outcome: "failed",
						duration_ms: cloudSandboxDurationSince(startedAt),
						filesystem_source: "factory"
					}, error);
					throw error;
				}
			}
			const domain = conn.endpoint.match(/https?:\/\/[^.]+\.(.+?)(?:\/|$)/)?.[1] || "e2b.dev";
			this.logFs(conversationId, "getFilesystem:connect", {
				sandboxId: conn.sandboxId,
				domain
			});
			try {
				const fs = CollabCloudE2BFilesystem.connect({
					sandboxId: conn.sandboxId,
					accessToken: conn.token,
					domain
				}, (tag, data) => this.logFs(conversationId, tag, data));
				this.filesystems.set(conversationId, fs);
				this.cloudSandboxTelemetry.filesystemOutcome({
					...this.getTelemetryActiveFields(conn),
					conversationId,
					operation: "connect",
					outcome: "success",
					duration_ms: cloudSandboxDurationSince(startedAt),
					filesystem_source: "default"
				});
				return fs;
			} catch (error) {
				this.cloudSandboxTelemetry.filesystemOutcome({
					...this.getTelemetryActiveFields(conn),
					conversationId,
					operation: "connect",
					outcome: "failed",
					duration_ms: cloudSandboxDurationSince(startedAt),
					filesystem_source: "default"
				}, error);
				throw error;
			}
		}
		async listDirectory(conversationId, path, depth) {
			const fs = await this.getFilesystem(conversationId);
			if (!fs) {
				this.logFs(conversationId, "listDirectory:noFs", { path });
				return [];
			}
			try {
				return convertEntriesToTreeEntries(await fs.list(path, { depth: depth ?? 1 }), path, depth ?? 1);
			} catch (err) {
				this.logFs(conversationId, "listDirectory:error", {
					path,
					error: err.message,
					stack: err.stack?.slice(0, 500)
				});
				return [];
			}
		}
		async readFile(conversationId, path, format) {
			const fs = await this.getFilesystem(conversationId);
			if (!fs) return {
				success: false,
				error: "No active connection"
			};
			try {
				if (format === "bytes") return {
					success: true,
					content: await fs.read(path, { format: "bytes" })
				};
				return {
					success: true,
					content: await fs.read(path, { format: "text" })
				};
			} catch (err) {
				this.logFs(conversationId, "readFile:error", {
					path,
					error: err.message
				});
				return {
					success: false,
					error: err.message
				};
			}
		}
		/**
		* 覆盖式写入沙箱文件。
		*
		* `content` 收 `string | ArrayBuffer | Blob`：markdown 编辑器保存传 string；
		* Office 附件落盘（issue #60902）传二进制 —— 底层 `FilesResource.write` 本就支持
		* 这三种（`collab-cloud-e2b-filesystem.ts` 的 multipart 构造按类型分支处理），
		* 这里只是把 service 层签名放宽到与底层一致，不改任何写入语义。
		*
		* 失败时返回 `{ success: false, error }` 而不抛错，让 UI 侧统一展示 toast。
		*/
		async writeFile(conversationId, path, content) {
			const fs = await this.getFilesystem(conversationId);
			if (!fs) return {
				success: false,
				error: "No active connection"
			};
			try {
				await fs.write(path, content);
				return { success: true };
			} catch (err) {
				this.logFs(conversationId, "writeFile:error", {
					path,
					error: err.message
				});
				return {
					success: false,
					error: err.message
				};
			}
		}
		/**
		* 订阅沙箱内单个文件变更。
		*
		* 实现策略：
		* 1. envd 只支持目录粒度的 watcher，所以这里取 path 的父目录传给 fs.watchDir；
		* 2. 拿到事件后用文件名匹配过滤，只在 name 命中时调用 callback；
		* 3. fs.watchDir 是异步建立 watcher 的，但 useEffect cleanup 必须同步拿到 unsubscribe，
		*    所以这里立刻返回一个 stop 函数；如果 watcher 还没建立完就被取消，
		*    `stopped` 标志位会让后续 .then 里的 handle.stop() 自动收尾，
		*    模式参照 workbuddy-agent-adapter-next.ts:21952 的本地 fileWatchSubscribe。
		*/
		subscribeFileChange(conversationId, path, callback) {
			const lastSlash = path.lastIndexOf("/");
			const dir = lastSlash > 0 ? path.substring(0, lastSlash) : "/";
			const fileName = lastSlash >= 0 ? path.substring(lastSlash + 1) : path;
			if (!fileName) {
				this.logFs(conversationId, "subscribeFileChange:noFileName", { path });
				return () => {};
			}
			let stopped = false;
			let handle;
			this.logFs(conversationId, "subscribeFileChange:begin", {
				path,
				dir,
				fileName
			});
			(async () => {
				const fs = await this.getFilesystem(conversationId);
				if (!fs) {
					this.logFs(conversationId, "subscribeFileChange:noFs", { path });
					return;
				}
				if (stopped) return;
				try {
					const created = await fs.watchDir(dir, (event) => {
						if (stopped) return;
						if (event.name === fileName) {
							this.logFs(conversationId, "subscribeFileChange:event", {
								path,
								name: event.name,
								type: event.type
							});
							try {
								callback();
							} catch (cbErr) {
								this.logFs(conversationId, "subscribeFileChange:callback_error", {
									path,
									error: cbErr.message
								});
							}
						}
					}, { recursive: false });
					if (stopped) {
						try {
							await created.stop();
						} catch {}
						return;
					}
					handle = created;
					this.logFs(conversationId, "subscribeFileChange:ready", { path });
				} catch (err) {
					this.logFs(conversationId, "subscribeFileChange:create_error", {
						path,
						error: err.message
					});
				}
			})();
			return () => {
				if (stopped) return;
				stopped = true;
				this.logFs(conversationId, "subscribeFileChange:dispose", { path });
				if (handle) {
					handle.stop().catch((err) => {
						this.logFs(conversationId, "subscribeFileChange:stop_error", {
							path,
							error: err?.message
						});
					});
					handle = void 0;
				}
			};
		}
		async connectToTask(conversationId, sessionMode, projectId) {
			this.log(projectId, conversationId, "connectTask:req", {
				conversationId,
				sessionMode
			});
			const connectStartedAt = Date.now();
			const reuseType = this.pendingSessionInfo.has(conversationId) ? "cached_session_info" : "new_connection";
			this.cloudSandboxTelemetry.sessionConnectStart({
				projectId,
				conversationId,
				cold_start: true,
				reuse_type: reuseType,
				session_mode: sessionMode
			});
			this.cloudSandboxTelemetry.connectTaskStart({
				projectId,
				conversationId,
				session_mode: sessionMode
			});
			let sessionInfo;
			try {
				const cached = this.pendingSessionInfo.get(conversationId);
				if (cached) {
					this.log(projectId, conversationId, "connectTask:reuseCachedSessionInfo", {});
					this.pendingSessionInfo.delete(conversationId);
					try {
						sessionInfo = await cached;
					} catch {
						sessionInfo = await this.taskOps.connectTask(conversationId);
					}
				} else sessionInfo = await this.taskOps.connectTask(conversationId);
				this.cloudSandboxTelemetry.connectTaskEnd({
					projectId,
					conversationId
				}, "success");
			} catch (err) {
				this.cloudSandboxTelemetry.connectTaskEnd({
					projectId,
					conversationId
				}, "failed", err);
				throw err;
			}
			this.log(projectId, conversationId, "connectTask:res", {
				sessionId: sessionInfo.sessionId,
				link: sessionInfo.link,
				cwd: sessionInfo.cwd,
				sandboxId: sessionInfo.sandboxId
			});
			const endpoint = sessionInfo.link.replace(/^http:\/\//, "https://");
			const cwd = sessionInfo.cwd || "/workspace";
			const sessionId = sessionInfo.sessionId || conversationId;
			const connection = new CloudAgentConnection(sessionId, {
				endpoint,
				authToken: sessionInfo.token,
				headers: { "X-Teams-Mode": "true" },
				getFallbackTraceparent: this.getFallbackTraceparent,
				transportHooks: this.transportHooks
			}, cwd);
			this.log(projectId, sessionId, "acp:connect", {
				endpoint,
				cwd
			});
			await connection.connect();
			this.log(projectId, sessionId, "acp:connected", "ok");
			const eventChannel = new EventChannel();
			eventChannel.setDiag((tag, data) => this.log(projectId, sessionId, tag, data));
			connection.on("sessionUpdate", (notification) => {
				this.lastFrameAt.set(conversationId, Date.now());
				eventChannel.push(notification);
			});
			const artifactHandlers = /* @__PURE__ */ new Set();
			const checkpointHandlers = /* @__PURE__ */ new Set();
			let artifactBuffer = [];
			let checkpointBuffer = [];
			const emitArtifactSync = (artifactType, event) => {
				this.cloudSandboxTelemetry.artifactSync({
					projectId,
					conversationId,
					sessionId,
					sandboxId: sessionInfo.sandboxId,
					outcome: "success",
					artifact_count: 1,
					artifact_types: `${artifactType || "unknown"}:1`,
					artifact_event: event,
					sync_source: "live_event"
				});
			};
			connection.on("artifactCreated", (artifact) => {
				emitArtifactSync(String(artifact?.type ?? "unknown"), "created");
				if (artifactHandlers.size === 0 && artifactBuffer) artifactBuffer.push({
					artifact,
					event: "created"
				});
				for (const h of artifactHandlers) h(artifact, "created");
			});
			connection.on("artifactUpdated", (artifact) => {
				emitArtifactSync(String(artifact?.type ?? "unknown"), "updated");
				if (artifactHandlers.size === 0 && artifactBuffer) artifactBuffer.push({
					artifact,
					event: "updated"
				});
				for (const h of artifactHandlers) h(artifact, "updated");
			});
			connection.on("artifactDeleted", (artifact) => {
				emitArtifactSync(String(artifact?.type ?? "unknown"), "deleted");
				if (artifactHandlers.size === 0 && artifactBuffer) artifactBuffer.push({
					artifact,
					event: "deleted"
				});
				for (const h of artifactHandlers) h(artifact, "deleted");
			});
			connection.on("checkpointCreated", (checkpoint) => {
				emitArtifactSync("checkpoint", "checkpoint_created");
				if (checkpointHandlers.size === 0 && checkpointBuffer) checkpointBuffer.push({
					checkpoint,
					event: "created"
				});
				for (const h of checkpointHandlers) h(checkpoint, "created");
			});
			connection.on("checkpointUpdated", (checkpoint) => {
				emitArtifactSync("checkpoint", "checkpoint_updated");
				if (checkpointHandlers.size === 0 && checkpointBuffer) checkpointBuffer.push({
					checkpoint,
					event: "updated"
				});
				for (const h of checkpointHandlers) h(checkpoint, "updated");
			});
			const TEAMS_METHOD = "_codebuddy.ai/teams";
			const extNotificationHandlers = /* @__PURE__ */ new Set();
			const teamsHandlers = /* @__PURE__ */ new Set();
			connection.on("extNotification", ({ method, params }) => {
				for (const h of extNotificationHandlers) h(method, params);
				if (method === TEAMS_METHOD) for (const h of teamsHandlers) h(params);
				if (method === "session/endTurn") {
					const errorMessage = readAcpErrorMessageFromMeta(params._meta) ?? (typeof params.errorMessage === "string" && params.errorMessage.trim() ? params.errorMessage : void 0);
					eventChannel.push({
						sessionId: params.sessionId,
						update: {
							sessionUpdate: "session_end_turn",
							_meta: {
								"codebuddy.ai": { stopReason: params.stopReason },
								...errorMessage ? { "codebuddy.ai/errorMessage": errorMessage } : {}
							}
						}
					});
				}
			});
			const artifactEvents = {
				onArtifact(handler) {
					artifactHandlers.add(handler);
					if (artifactBuffer && artifactBuffer.length > 0) {
						const buffered = artifactBuffer;
						artifactBuffer = null;
						for (const entry of buffered) handler(entry.artifact, entry.event);
					} else artifactBuffer = null;
					return () => {
						artifactHandlers.delete(handler);
					};
				},
				onCheckpoint(handler) {
					checkpointHandlers.add(handler);
					if (checkpointBuffer && checkpointBuffer.length > 0) {
						const buffered = checkpointBuffer;
						checkpointBuffer = null;
						for (const entry of buffered) handler(entry.checkpoint, entry.event);
					} else checkpointBuffer = null;
					return () => {
						checkpointHandlers.delete(handler);
					};
				},
				onTeamsEvent(handler) {
					teamsHandlers.add(handler);
					return () => {
						teamsHandlers.delete(handler);
					};
				},
				onExtNotification(handler) {
					extNotificationHandlers.add(handler);
					return () => {
						extNotificationHandlers.delete(handler);
					};
				}
			};
			let initialModels;
			let initialModes;
			let historyEndOffset;
			if (sessionMode === "load") {
				this.log(projectId, sessionId, "acp:loadSession", {
					sessionId,
					cwd
				});
				const response = await this.loadSessionUntilSessionReady({
					connection,
					sessionId,
					cwd,
					conversationId,
					projectId
				});
				initialModels = response?.models ?? void 0;
				initialModes = response?.modes ?? void 0;
				historyEndOffset = response ? readHistoryEndOffset(response) : void 0;
				this.log(projectId, sessionId, "acp:loadSession:done", {
					currentModelId: initialModels?.currentModelId,
					currentModeId: initialModes?.currentModeId,
					historyEndOffset
				});
			} else if (sessionMode === "create") {
				this.log(projectId, sessionId, "acp:createSession", { cwd });
				const response = await connection.createSession({ cwd });
				initialModels = response?.models ?? void 0;
				initialModes = response?.modes ?? void 0;
				this.log(projectId, sessionId, "acp:createSession:done", {
					currentModelId: initialModels?.currentModelId,
					currentModeId: initialModes?.currentModeId
				});
			}
			const active = {
				conversationId,
				connection,
				sessionId,
				sandboxId: sessionInfo.sandboxId,
				endpoint,
				token: sessionInfo.token,
				cwd,
				projectId,
				initialModels,
				initialModes,
				currentModeId: initialModes?.currentModeId,
				reuseType,
				connectStartedAt,
				historyEndOffset,
				eventChannel,
				artifactEvents
			};
			this.connections.set(conversationId, active);
			return active;
		}
		async openConnection(conversationId, sessionMode, projectId) {
			const existingPending = this.connecting.get(conversationId);
			if (existingPending) {
				this.log(projectId, conversationId, "openConnection:joinPending", { sessionMode });
				return existingPending;
			}
			const pending = (async () => {
				try {
					const active = await this.connectToTask(conversationId, sessionMode, projectId);
					const stale = this.connections.get(conversationId);
					if (stale && stale !== active) {
						this.log(projectId, active.sessionId, "openConnection:disposeStale", { conversationId });
						this.cloudSandboxTelemetry.sessionClose({
							...this.getTelemetryActiveFields(stale),
							conversationId,
							close_reason: "replace_stale_connection"
						});
						try {
							stale.eventChannel.close();
						} catch {}
						try {
							stale.connection.removeAllListeners();
						} catch {}
						try {
							await stale.connection.disconnect();
						} catch {}
					}
					this.connections.set(conversationId, active);
					if (sessionMode !== "connect-only") this.cloudSandboxTelemetry.sessionReady({
						...this.getTelemetryActiveFields(active),
						conversationId,
						cold_start: true,
						reuse_type: active.reuseType ?? "new_connection",
						duration_ms: cloudSandboxDurationSince(active.connectStartedAt ?? Date.now()),
						session_mode: sessionMode
					});
					this.log(projectId, active.sessionId, "openConnection:registered", {
						conversationId,
						sessionMode,
						connectionCount: this.connections.size
					});
					return active;
				} catch (error) {
					this.cloudSandboxTelemetry.sessionError({
						projectId,
						conversationId,
						session_mode: sessionMode
					}, error);
					throw error;
				} finally {
					this.connecting.delete(conversationId);
				}
			})();
			this.connecting.set(conversationId, pending);
			return pending;
		}
		/**
		* Build a raw async iterable from the eventChannel.
		* Yields notifications until the isDone callback returns true and no more events arrive
		* within the drain timeout window.
		*/
		buildRawStream(eventChannel, isDone, drainTimeout, projectId, sessionId, _conversationId) {
			const log = this.log.bind(this);
			return { [Symbol.asyncIterator]() {
				return {
					async next() {
						while (true) {
							const timeout = isDone() ? drainTimeout : 3e4;
							const notification = await Promise.race([eventChannel.next(), new Promise((r) => setTimeout(() => r(null), timeout))]);
							if (notification !== null) {
								log(projectId, sessionId, "rawStream:notification", notification);
								return {
									value: notification,
									done: false
								};
							}
							if (isDone() || eventChannel.isClosed()) return {
								value: void 0,
								done: true
							};
						}
					},
					return() {
						return Promise.resolve({
							value: void 0,
							done: true
						});
					}
				};
			} };
		}
		/**
		* Collect history as raw SessionNotifications.
		* loadSession is called in connect() before this generator runs.
		* This just drains history notifications from the eventChannel.
		*
		* 历史/实时边界判定（加固）：
		* - 优先用 `active.historyEndOffset`（load response 下发的权威末位 offset）做判定：
		*   notification.offset > historyEndOffset → 实时消息，push 回 + break。
		*   无 offset 的通知（如 Restore 快照 isSnapshot）保守当历史处理（前端会跳过 isSnapshot）。
		* - 服务端未下发 historyEndOffset（undefined / 旧版本）时降级到 `mode` 判定：mode 非 history 即 break。
		*
		* 这修复了 resume tailOffset 竞态把历史 assistant chunk 错标 `mode:stream`、
		* 导致 collectHistoryRaw 提前 break、历史数组缺 assistant → UI 只渲染用户消息的问题。
		*/
		async *collectHistoryRaw(active) {
			const { projectId, sessionId, eventChannel, historyEndOffset } = active;
			const QUIET_TIMEOUT = 500;
			const useOffsetBoundary = typeof historyEndOffset === "number";
			let count = 0;
			while (true) {
				const notification = await Promise.race([eventChannel.next(), new Promise((resolve) => setTimeout(() => resolve(null), QUIET_TIMEOUT))]);
				if (notification === null) {
					eventChannel.unpark();
					break;
				}
				const codebuddyMeta = notification._meta?.["codebuddy.ai"];
				const mode = codebuddyMeta?.mode;
				const offset = codebuddyMeta?.offset;
				const hasOffset = typeof offset === "number";
				if (useOffsetBoundary ? hasOffset ? offset > historyEndOffset : mode === "stream" : Boolean(mode && mode !== "history")) {
					this.log(projectId, sessionId, "historyRaw:non-history-event", {
						mode,
						offset,
						hasOffset,
						historyEndOffset,
						useOffsetBoundary,
						update: notification.update?.sessionUpdate
					});
					eventChannel.unpark();
					eventChannel.push(notification);
					break;
				}
				this.log(projectId, sessionId, "historyRaw:notification", notification);
				count++;
				yield notification;
			}
			this.log(projectId, sessionId, "historyRaw:done", {
				count,
				historyEndOffset,
				useOffsetBoundary
			});
		}
		/**
		* Collect history events pushed after loadSession.
		*
		* After loadSession, the server pushes all historical messages as sessionUpdate
		* events with _meta['codebuddy.ai'].mode = 'history'. When replay finishes,
		* the server switches to mode = 'stream' for live events.
		*
		* 历史/实时边界判定与 collectHistoryRaw 一致（加固）：
		* - 优先用 `active.historyEndOffset` 做权威 offset 比对；
		* - 缺失时降级到 `mode` 判定。
		*
		* 注意：与 collectHistoryRaw 不同，这里遇到实时事件不 push 回（原行为）——
		* parsed stream 通常不被 UI 消费（UI 走 rawStream），且原注释说明 non-history
		* 事件（多为 session_info_update）不需要重放给 prompt 链路。
		*
		* Uses the persistent eventChannel (registered at connect time).
		*/
		async *collectHistory(active) {
			const { projectId, sessionId, eventChannel, historyEndOffset } = active;
			const QUIET_TIMEOUT = 500;
			const useOffsetBoundary = typeof historyEndOffset === "number";
			let chunkCount = 0;
			let currentRequestId;
			while (true) {
				const notification = await Promise.race([eventChannel.next(), new Promise((resolve) => setTimeout(() => resolve(null), QUIET_TIMEOUT))]);
				if (notification === null) {
					eventChannel.unpark();
					break;
				}
				const codebuddyMeta = notification._meta?.["codebuddy.ai"];
				const mode = codebuddyMeta?.mode;
				const offset = codebuddyMeta?.offset;
				const hasOffset = typeof offset === "number";
				if (useOffsetBoundary ? hasOffset ? offset > historyEndOffset : mode === "stream" : Boolean(mode && mode !== "history")) {
					this.log(projectId, sessionId, "history:non-history-event", {
						mode,
						offset,
						hasOffset,
						historyEndOffset,
						useOffsetBoundary,
						update: notification.update?.sessionUpdate
					});
					eventChannel.unpark();
					break;
				}
				this.log(projectId, sessionId, "history:notification", notification);
				const notifRequestId = this.extractRequestId(notification);
				if (notifRequestId) currentRequestId = notifRequestId;
				const chunk = this.notificationToChunk(notification);
				if (chunk) {
					if (!chunk.requestId && currentRequestId) chunk.requestId = currentRequestId;
					if (chunk.role === "user") currentRequestId = void 0;
					chunkCount++;
					yield chunk;
				}
			}
			this.log(projectId, sessionId, "history:done", { chunkCount });
		}
		/** Extract requestId from any SessionNotification's _meta. */
		extractRequestId(notification) {
			const meta = notification._meta;
			const codebuddyMeta = meta?.["codebuddy.ai"];
			const updateMeta = notification.update?._meta;
			const updateCbMeta = updateMeta?.["codebuddy.ai"];
			return codebuddyMeta?.requestId || meta?.["codebuddy.ai/requestId"] || updateCbMeta?.requestId || updateMeta?.["codebuddy.ai/requestId"];
		}
		/** Parse a single SessionNotification into a ProjectChatChunk (or null if not relevant). */
		notificationToChunk(notification) {
			const update = notification.update;
			const updateType = update?.sessionUpdate;
			const meta = notification._meta;
			const codebuddyMeta = meta?.["codebuddy.ai"];
			const turnSenderUserId = codebuddyMeta?.turnSenderUserId;
			const updateMeta = update?._meta;
			const updateCbMeta = updateMeta?.["codebuddy.ai"];
			const requestId = codebuddyMeta?.requestId || meta?.["codebuddy.ai/requestId"] || updateCbMeta?.requestId || updateMeta?.["codebuddy.ai/requestId"];
			if (updateType === "user_message" || updateType === "user_message_chunk") {
				const content = update.content;
				if (!content || content.type !== "text") return null;
				const text = content.text;
				if (!text) return null;
				return {
					messageId: update.messageId,
					text,
					type: updateType,
					role: "user",
					turnSenderUserId,
					requestId
				};
			}
			if (updateType === "agent_message_chunk" || updateType === "agent_message") {
				const content = update.content;
				if (!content || content.type !== "text") return null;
				const text = content.text;
				if (!text) return null;
				const role = turnSenderUserId ? "user" : "assistant";
				return {
					messageId: update.messageId,
					text,
					type: updateType,
					role,
					turnSenderUserId,
					requestId
				};
			}
			if (updateType === "agent_thought_chunk") {
				const content = update.content;
				if (!content || content.type !== "text") return null;
				const text = content.text;
				if (!text) return null;
				return {
					messageId: update.messageId,
					text,
					type: updateType,
					role: "assistant",
					requestId,
					isReasoning: true
				};
			}
			return null;
		}
		/**
		* Transform raw SessionNotification stream into ProjectChatChunk stream.
		* Used for live prompt streaming — only yields assistant text chunks.
		* Tracks requestId across the turn so all chunks share the same ID.
		*/
		async *parseStream(raw, projectId, sessionId) {
			let chunkCount = 0;
			let currentRequestId;
			for await (const notification of raw) {
				this.log(projectId, sessionId, "stream:notification", notification);
				const notifRequestId = this.extractRequestId(notification);
				if (notifRequestId) currentRequestId = notifRequestId;
				const chunk = this.notificationToChunk(notification);
				if (chunk && chunk.role === "assistant") {
					if (!chunk.requestId && currentRequestId) chunk.requestId = currentRequestId;
					chunkCount++;
					yield chunk;
				}
			}
			this.log(projectId, sessionId, "stream:done", { chunkCount });
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/browser.ts
var init_browser = __esmMin((() => {
	init_chat_log();
	init_cloud_repo$1();
	init_todo_netdisk_attachment_service();
	init_quota_errors();
	init_project_chat_service();
	init_cloud_sandbox_telemetry();
}));
//#endregion
export { tryParseMemberQuotaError as _, cloudSandboxDurationSince as a, createBufferedChatLogWriter as b, ensureProjectMessageNetdiskAttachmentFolder as c, init_cloud_repo$1 as d, ExclusivePlanNotSupportedError as f, isExclusivePlanError as g, init_quota_errors as h, CloudSandboxTelemetryObserver as i, ensureProjectTodoNetdiskAttachmentFolder as l, ProjectQuotaExceededError as m, ProjectChatService as n, init_cloud_sandbox_telemetry as o, MemberQuotaExceededError as p, init_project_chat_service as r, summarizeArtifactTypes as s, init_browser as t, init_todo_netdisk_attachment_service as u, tryParseProjectQuotaError as v, init_chat_log as x, tryUseNormalizedMemberQuotaData as y };
