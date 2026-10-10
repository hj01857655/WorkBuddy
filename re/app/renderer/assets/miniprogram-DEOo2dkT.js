import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A7 as Input, Crt as AddIcon, E1 as init_useI18n, E7 as Card, F6 as init_src$1, H7 as EditToolIcon, J0 as init_wb, J5 as Select, O1 as useTranslation, O7 as Tag, O9 as WbMiniprogramSolidIcon, S5 as Form, S7 as Loading, V5 as message, W9 as WbRefreshIcon, X5 as Checkbox, Yet as SettingsIcon, _0 as init_log_sink, a5 as ShareQrcodeIcon, b5 as Alert, c7 as Modal, g5 as RadioGroup, i7 as Tooltip, krt as Button, m5 as init_src, pnt as DeleteIcon, qnt as BackChevronIcon, snt as ErrorCircleIcon, x0 as writeRendererLogFileOnly, x2 as deserializeResult } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { i as init_qrcode_utils$1, n as init_miniprogram_qrcode_preview, r as createMiniprogramQrcodeDataUrl, t as QrcodePreview } from "./miniprogram-qrcode-preview-DsOZkxcK.js";
//#region ../../packages/agent-ui/src/modules/application/miniprogram/miniprogram.less
var init_miniprogram$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/api/paths.ts
var MINIPROGRAM_CONTROL_PREFIX, MINIPROGRAM_REAL_ENDPOINTS;
var init_paths = __esmMin((() => {
	MINIPROGRAM_CONTROL_PREFIX = "/v2/as/genie-baas/control/miniprogram";
	MINIPROGRAM_REAL_ENDPOINTS = {
		binding: `${MINIPROGRAM_CONTROL_PREFIX}/binding`,
		authUrl: `${MINIPROGRAM_CONTROL_PREFIX}/auth-url`,
		subscribeQrcode: `${MINIPROGRAM_CONTROL_PREFIX}/subscribe-qrcode`,
		unbind: `${MINIPROGRAM_CONTROL_PREFIX}/unbind`,
		offline: `${MINIPROGRAM_CONTROL_PREFIX}/offline`,
		online: `${MINIPROGRAM_CONTROL_PREFIX}/online`,
		publish: `${MINIPROGRAM_CONTROL_PREFIX}/publish`,
		publishStatus: `${MINIPROGRAM_CONTROL_PREFIX}/publish/status`,
		publishQrcode: `${MINIPROGRAM_CONTROL_PREFIX}/publish/qrcode`,
		publishTask: `${MINIPROGRAM_CONTROL_PREFIX}/publish/task`,
		publishCancel: `${MINIPROGRAM_CONTROL_PREFIX}/publish/cancel`,
		privacySetting: `${MINIPROGRAM_CONTROL_PREFIX}/privacy-setting`
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/api/real-miniprogram-client.ts
/** 业务码判定：genie-baas 的 HTTP 恒 200，成败只看信封里的 `code`。 */
function assertSuccess(envelope, operation) {
	if (envelope?.code !== 0) throw new MiniprogramApiError(envelope?.msg ?? envelope?.message ?? `${operation} failed`, envelope?.code, envelope?.requestId);
}
/** 读接口：缺 `data` 说明响应被截断，属于真异常。 */
function unwrap(envelope, operation) {
	assertSuccess(envelope, operation);
	if (!Object.prototype.hasOwnProperty.call(envelope, "data")) throw new MiniprogramApiError(`${operation}: response is missing data`, envelope?.code, envelope?.requestId);
	return envelope.data;
}
/**
* 写接口：只判业务码，**不要求 `data` 存在**。
*
* 后端统一响应封装里 `data` 带 `omitempty`（见 `services/pkg/client/http/response.go`
* 的 `HandleNormalResp`），所以 `ok(c, nil)` 的接口发出来是
* `{code:0, msg:"success", requestId}` —— 连 `data` 键都没有，不是 `data: null`。
* 拿 `unwrap` 去解这类响应会把「保存成功」判成「响应缺数据」并抛错。
*
* 目前 `privacy-setting` 的 PUT 是这样；`unbind`、`publish/cancel` 同为 `ok(c, nil)`，
* 将来接入时也必须走这里。
*/
function unwrapVoid(envelope, operation) {
	assertSuccess(envelope, operation);
}
/**
* 已发布 genie-baas 小程序接口的原始 client。
*
* 本层只处理 HTTP 信封和真实单绑定 DTO，不承载 UI 状态。
*/
function createRealMiniprogramClient(http = wb.http) {
	return {
		async getBinding(applicationId) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.binding, { params: { applicationId } }), "GET /miniprogram/binding");
		},
		async getAuthUrl(applicationId) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.authUrl, { params: { applicationId } }), "GET /miniprogram/auth-url");
		},
		async getSubscribeQrcode(applicationId) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.subscribeQrcode, { params: { applicationId } }), "GET /miniprogram/subscribe-qrcode");
		},
		async getPrivacySetting(applicationId) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.privacySetting, { params: { applicationId } }), "GET /miniprogram/privacy-setting");
		},
		async updatePrivacySetting(setting) {
			unwrapVoid(await http.put(MINIPROGRAM_REAL_ENDPOINTS.privacySetting, setting), "PUT /miniprogram/privacy-setting");
		},
		async publish(request) {
			const form = new FormData();
			form.append("applicationId", request.applicationId);
			form.append("publishMode", request.publishMode);
			if (request.appName) form.append("appName", request.appName);
			if (request.description) form.append("description", request.description);
			if (request.version) form.append("version", request.version);
			form.append("entryPage", request.entryPage);
			form.append("code", request.code, request.fileName ?? "miniprogram.zip");
			return unwrap(await http.post(MINIPROGRAM_REAL_ENDPOINTS.publish, form), "POST /miniprogram/publish");
		},
		async getPublishStatus(applicationId, publishMode) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.publishStatus, { params: {
				applicationId,
				...publishMode ? { publishMode } : {}
			} }), "GET /miniprogram/publish/status");
		},
		async getPublishQrcode(applicationId) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.publishQrcode, { params: { applicationId } }), "GET /miniprogram/publish/qrcode");
		},
		async getPublishTask(applicationId, taskId) {
			return unwrap(await http.get(MINIPROGRAM_REAL_ENDPOINTS.publishTask, { params: {
				applicationId,
				taskId
			} }), "GET /miniprogram/publish/task");
		},
		async offline(applicationId) {
			return unwrap(await http.post(MINIPROGRAM_REAL_ENDPOINTS.offline, { applicationId }), "POST /miniprogram/offline");
		}
	};
}
var MiniprogramApiError;
var init_real_miniprogram_client = __esmMin((() => {
	init_paths();
	MiniprogramApiError = class extends Error {
		constructor(message, code, requestId) {
			super(message);
			this.name = "MiniprogramApiError";
			this.code = code;
			this.requestId = requestId;
		}
	};
}));
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/state/error-message.ts
/**
* 把任意失败收敛成一句可展示的文案。
*
* 后端信封的 `msg` 会被 `MiniprogramApiError` 原样装进 `Error.message`，daemon 打包链路
* 抛的更是带本机绝对路径、npm stderr 或 `status/code/requestId` 的技术串。这些都不该进
* UI：只有挂了已知结构化码的错误有专门文案，其余一律落到调用方给的场景兜底 key。
*
* 原始错误必须留在控制台 —— UI 不再展示细节之后，这是排查线上问题的唯一线索。
*/
function resolveMiniprogramErrorMessage(error, t, fallbackKey) {
	console.warn(`[miniprogram] ${fallbackKey}:`, error);
	const code = error?.code;
	if (code === 18375) return t("application.miniprogram.authPending.timeout");
	return typeof code === "string" && TRANSLATED_ERROR_CODES.has(code) ? t(`errorCode.${code}`) : t(fallbackKey);
}
/**
* 把 `publish/status` 的 `errorMessage` 收敛成可展示文案，收敛不了返回 `null`。
*
* 后端这一列没有区分「给用户看的文案」和「给排查用的诊断串」：正式版提审失败走的是
* `wxErrorToBizError(err).Error()`，会把内部错误码、微信信封、甚至整条 Go 错误链原样
* 落库。这里按「先认诊断串 → 剥壳 → 只放行中文」清洗，识别不了一律返回 `null` 交给
* 调用方兜底 —— 宁可少显示，也不把技术串摆给用户。
*
* 函数保持纯的（不打日志）：它在渲染路径上调用，每次重渲染都 warn 会刷屏；原始串在
* 服务端日志和接口响应里都拿得到。
*/
function formatPublishFailureMessage(raw) {
	const text = raw?.trim();
	if (!text || DIAGNOSTIC_MARKERS.some((marker) => text.includes(marker))) return null;
	const unwrapped = text.replace(INTERNAL_CODE_PREFIX, "");
	const envelope = WECHAT_ENVELOPE.exec(unwrapped);
	const display = (envelope ? envelope[1] : unwrapped).replace(WECHAT_TRACE_SUFFIX, "").replace(HTML_LINE_BREAK, "\n").split("\n").map((line) => line.trim()).filter((line) => line.length > 0).join("\n");
	return display && CJK_CHARACTER.test(display) ? display : null;
}
/**
* 把一次发布失败的**原始** errorMessage 记进客户端日志。
*
* `formatPublishFailureMessage` 把技术串挡在 UI 之外后，原文就只剩日志这一个去处。
*
* 必须用 `writeRendererLogFileOnly` 而不是 `console.warn`：渲染进程的 console 靠主进程
* `console-message` 事件捞取，而 warn 那一档带 `!app.isPackaged` 判断（见
* `apps/workbuddy-desktop/src/main/window/window-events.ts`），正式打包版里根本不落盘。
*
* 除原文外还记下 UI 实际展示的是清洗结果还是兜底文案 —— 只有原文而不知道用户当时看到
* 了什么，排查时仍然对不上现场。`raw` 放在行尾：它是自由文本，前面的字段才好切。
*/
function logPublishFailure(context) {
	const { applicationId, taskId, publishMode, errorMessage } = context;
	const dedupeKey = `${taskId}|${errorMessage ?? ""}`;
	if (loggedPublishFailures.has(dedupeKey)) return;
	if (loggedPublishFailures.size >= LOGGED_PUBLISH_FAILURE_LIMIT) loggedPublishFailures.clear();
	loggedPublishFailures.add(dedupeKey);
	const displayed = formatPublishFailureMessage(errorMessage) === null ? "fallback" : "cleaned";
	writeRendererLogFileOnly(PUBLISH_LOG_SCOPE, "warn", `publish failed applicationId=${applicationId} taskId=${taskId} publishMode=${publishMode} displayed=${displayed} raw=${errorMessage ?? "<empty>"}`);
}
var TRANSLATED_ERROR_CODES, INTERNAL_CODE_PREFIX, WECHAT_ENVELOPE, WECHAT_TRACE_SUFFIX, HTML_LINE_BREAK, DIAGNOSTIC_MARKERS, CJK_CHARACTER, PUBLISH_LOG_SCOPE, loggedPublishFailures, LOGGED_PUBLISH_FAILURE_LIMIT;
var init_error_message = __esmMin((() => {
	init_log_sink();
	init_types();
	TRANSLATED_ERROR_CODES = /* @__PURE__ */ new Set(["MINIPROGRAM_NPM_INSTALL_FAILED", "MINIPROGRAM_NPM_BUILD_FAILED"]);
	INTERNAL_CODE_PREFIX = /^\d{4,6}:\s*/;
	WECHAT_ENVELOPE = /errcode=-?\d+,\s*errmsg=([\s\S]*)$/;
	WECHAT_TRACE_SUFFIX = /\s*rid:\s*\S+\s*$/;
	HTML_LINE_BREAK = /<br\s*\/?>/gi;
	DIAGNOSTIC_MARKERS = [
		"wechat api call failed",
		"request failed:",
		"invalid character",
		"context deadline exceeded"
	];
	CJK_CHARACTER = /[\u4e00-\u9fff]/;
	PUBLISH_LOG_SCOPE = "miniprogram:publish";
	loggedPublishFailures = /* @__PURE__ */ new Set();
	LOGGED_PUBLISH_FAILURE_LIMIT = 50;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/state/privacy-keys.ts
/** AI 草稿里的键是否是已知隐私项；未知键在预填时丢弃，避免把乱写的键当成枚举提交。 */
function isKnownPrivacyKey(value) {
	return KNOWN_PRIVACY_KEYS.has(value);
}
/** 隐私项展示名的 i18n key。 */
function privacyKeyLabelKey(key) {
	return `application.miniprogram.privacy.item.${key}`;
}
var MINIPROGRAM_PRIVACY_KEYS, CUSTOM_PRIVACY_ITEM_VALUE, KNOWN_PRIVACY_KEYS;
var init_privacy_keys = __esmMin((() => {
	MINIPROGRAM_PRIVACY_KEYS = [
		"UserInfo",
		"Location",
		"ChooseLocation",
		"Address",
		"Invoice",
		"PhoneNumber",
		"Email",
		"Contact",
		"CalendarWriteOnly",
		"Album",
		"AlbumWriteOnly",
		"Camera",
		"Record",
		"MessageFile",
		"Clipboard",
		"BlueTooth",
		"DeviceInfo",
		"RunData",
		"LicensePlate",
		"Accelerometer",
		"Compass",
		"DeviceMotion",
		"Gyroscope",
		"EXIDNumber",
		"EXOrderInfo",
		"EXUserPublishContent",
		"EXUserFollowAcct",
		"EXUserOpLog"
	];
	CUSTOM_PRIVACY_ITEM_VALUE = "__custom__";
	KNOWN_PRIVACY_KEYS = new Set(MINIPROGRAM_PRIVACY_KEYS);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/state/privacy-collect-items.ts
function createCollectItemId() {
	return `privacy-local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
/**
* 采集项最终生效的隐私项：已选其他但还没填时算「没选」。
*
* 哨兵只活在表单里，绝不能当成 `privacy_key` 发给微信。校验、空行判定和提交载荷
* 都从这里取值，口径只有一处。
*/
function resolvePrivacyKey(item) {
	return item.privacyKey === "__custom__" ? "" : item.privacyKey.trim();
}
/** 该行是否处于「自行填写」状态：选了其他，或已有一个不在字典里的自定义值。 */
function isCustomPrivacyKey(item) {
	return item.privacyKey === "__custom__" || Boolean(item.privacyKey) && !isKnownPrivacyKey(item.privacyKey);
}
/**
* 完全没填的采集项。
*
* 表单里始终留着一条空行方便用户开写，它不能被当成「填错了」拦住保存，也不该被提交
* 给微信 —— 所以校验与提交两侧都按本判据先摘掉空行。只填了一半的行不算空行，
* 仍要走校验。
*/
function isBlankCollectItem(item) {
	return !item.purpose.trim() && !resolvePrivacyKey(item);
}
function stripBlankCollectItems(items) {
	return items.filter((item) => !isBlankCollectItem(item));
}
/** 采集项为空时补一条空行：零行的表单只剩一个「新增」按钮，用户容易以为没法填。 */
function withEditableCollectItems(items) {
	if (items.length > 0) return [...items];
	return [{
		id: createCollectItemId(),
		purpose: "",
		privacyKey: ""
	}];
}
/**
* AI 草稿 → 采集项。
*
* 草稿的键值方向与领域模型**相反**：草稿是 `{ privacy_key: 用途文案 }`。表单按单选
* 呈现，所以同一用途下的多个隐私项拆成多行（purpose 重复），不做合并。
*
* 未知键直接丢弃：草稿由模型生成，键写错时宁可少预填一项，也不能把非法枚举提交给微信。
*/
function collectItemsFromDraft(draft) {
	if (!Array.isArray(draft)) return [];
	const seen = /* @__PURE__ */ new Set();
	const items = [];
	for (const entry of draft) {
		if (!entry || typeof entry !== "object") continue;
		for (const [privacyKey, rawPurpose] of Object.entries(entry)) {
			const purpose = typeof rawPurpose === "string" ? rawPurpose.trim() : "";
			if (!purpose || !isKnownPrivacyKey(privacyKey)) continue;
			const fingerprint = `${privacyKey}\u0000${purpose}`;
			if (seen.has(fingerprint)) continue;
			seen.add(fingerprint);
			items.push({
				id: createCollectItemId(),
				purpose,
				privacyKey
			});
		}
	}
	return items;
}
var init_privacy_collect_items = __esmMin((() => {
	init_privacy_keys();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/state/publish-mode.ts
/**
* 正式版必须包含体验版；试用绑定只能发布试用版。
* 返回顺序稳定，避免 CheckboxGroup 与请求体顺序随用户点击漂移。
*/
function normalizePublishModes(bindingType, modes) {
	if (bindingType === "trial") return ["trial"];
	const selected = new Set(modes.filter((mode) => mode !== "trial"));
	if (selected.has("formal")) selected.add("experience");
	return ["experience", "formal"].filter((mode) => selected.has(mode));
}
/** 后端 publishMode 是最高发布目标，而不是多选数组。 */
function resolvePublishMode(modes) {
	if (modes.includes("formal")) return "formal";
	if (modes.includes("experience")) return "experience";
	if (modes.includes("trial")) return "trial";
	return null;
}
/**
* 首次发布正式版前先展示小程序设置。
* `publish === null` 是当前领域模型中“尚未发起过发布”的唯一判据；
* `settingsVisited` 防止用户返回发布范围后再次确认时循环跳转。
*/
function shouldOpenSettingsBeforePublish(publish, modes, settingsVisited) {
	return !publish?.tasks.formal && modes.includes("formal") && !settingsVisited;
}
function matchesExpectedPublishTask(publish, expectedTaskId) {
	return Boolean(expectedTaskId) && publish?.taskId === expectedTaskId;
}
function isPublishTaskActive(status) {
	return status === "init" || status === "setting_info" || status === "building" || status === "uploading_frontend" || status === "submitting_audit" || status === "auditing" || status === "releasing";
}
/**
* 试用版/体验版的发布状态与二维码落库存在短暂最终一致性窗口。
* `published` 但体验二维码尚未返回时，仍需继续查询状态。
*/
function isExperienceQrcodePending(publish) {
	return ["trial", "experience"].some((mode) => {
		const task = publish?.tasks[mode];
		return task?.status === "published" && !versionForMode(task.versions, mode)?.qrcodeImageUrl?.trim();
	});
}
function shouldPollPublishStatus(publish) {
	return Object.values(publish?.tasks ?? {}).some((task) => isPublishTaskActive(task?.status)) || isExperienceQrcodePending(publish);
}
/** 正式版仍在上传、微信审核或发布时，不允许再次提交正式版。 */
function isFormalPublishActive(publish) {
	return isPublishTaskActive(publish?.tasks.formal?.status);
}
/**
* 正式版此刻能否被勾选：审核/发布未结束，或本周提审额度已用完，都不能再提交。
*
* 勾选框据此置灰；发布前还要用同一判据把已勾选的正式版剔除 —— 勾选保留在概览页上，
* 轮询完全可能在用户勾完之后才把「审核中」同步回来，届时留着这个勾选只会让发布按钮
* 提交一个必然被 `canStartPublish` 拒掉的目标，表现为「点了没反应」。
*/
function canSelectFormalPublish(publish, auditRemaining) {
	return !isFormalPublishActive(publish) && auditRemaining !== 0;
}
/**
* 正式版进入微信审核后，体验版已经可用；此时发布入口应恢复为“更新”，
* 但只能继续更新体验版，不能重复提交正式版。
*/
function canStartPublish(publish, modes) {
	const activeTasks = Object.values(publish?.tasks ?? {}).filter((task) => isPublishTaskActive(task?.status));
	if (activeTasks.length === 0) return true;
	const formalTask = publish?.tasks.formal;
	return activeTasks.length === 1 && activeTasks[0]?.publishMode === "formal" && versionForMode(formalTask?.versions, "experience")?.status === "published" && resolvePublishMode(modes) === "experience";
}
/** 体验版尚未就绪前，发布按钮继续展示任务加载态。 */
function isPublishButtonLoading(publish) {
	if (Object.values(publish?.tasks ?? {}).filter((task) => isPublishTaskActive(task?.status)).length === 0) return false;
	const formalTask = publish?.tasks.formal;
	if (formalTask && isPublishTaskActive(formalTask.status) && versionForMode(formalTask.versions, "experience")?.status !== "published") return true;
	return !publish?.versions.some((version) => version.status === "published");
}
function versionForMode(versions, mode) {
	return versions?.find((item) => item.mode === mode);
}
function aggregateVersions(tasks) {
	return [
		versionForMode(tasks.trial?.versions, "trial"),
		versionForMode(tasks.experience?.versions, "experience") ?? versionForMode(tasks.formal?.versions, "experience"),
		versionForMode(tasks.formal?.versions, "formal")
	].filter((version) => Boolean(version));
}
function mergePublishTask(publish, task) {
	if (!task) return publish ?? null;
	const tasks = {
		...publish?.tasks,
		[task.publishMode]: task
	};
	return {
		tasks,
		versions: aggregateVersions(tasks)
	};
}
function createOptimisticPublishSnapshot(publish, modes, publishMode) {
	return mergePublishTask(publish, {
		taskId: "pending-client-request",
		publishMode,
		status: "building",
		versions: modes.map((mode) => ({
			mode,
			status: "publishing",
			qrcodeValue: null,
			errorCode: null,
			errorMessage: null
		})),
		errorCode: null,
		errorMessage: null,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
function applyAcceptedPublish(previous, publish, taskId, publishMode) {
	if (!previous) return previous;
	const currentTask = previous.publish?.tasks[publishMode];
	const acceptedTask = publish ?? (currentTask ? {
		...currentTask,
		taskId
	} : null);
	return {
		...previous,
		publish: mergePublishTask(previous.publish, acceptedTask)
	};
}
function publishModesToPoll(publish) {
	return PUBLISH_MODE_ORDER.filter((mode) => {
		const task = publish?.tasks[mode];
		if (!task) return false;
		return isPublishTaskActive(task.status) || (mode === "trial" || mode === "experience") && task.status === "published" && !versionForMode(task.versions, mode)?.qrcodeImageUrl?.trim();
	});
}
var PUBLISH_MODE_ORDER;
var init_publish_mode = __esmMin((() => {
	PUBLISH_MODE_ORDER = [
		"trial",
		"experience",
		"formal"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/api/real-miniprogram-api.ts
function projectBinding(dto) {
	return {
		bindingType: dto.bindingType,
		authorizerAppid: dto.authorizerAppid,
		nickName: dto.appName,
		headImg: dto.headImg,
		authorizationStatus: dto.status,
		authorizationFailure: dto.authorizationFailure,
		trialExpiresAt: dto.trialExpiresAt,
		trialExpired: dto.trialExpired,
		auditWeekCount: dto.auditWeekCount,
		auditRemaining: dto.auditWeekRemaining
	};
}
function taskStatusToVersionStatus(status) {
	if (status === "auditing" || status === "releasing" || status === "published" || status === "failed") return status;
	return "publishing";
}
function projectVersion(mode, task) {
	const status = mode === "experience" && task.publishMode === "formal" && (Boolean(task.experienceQrcodeUrl) || [
		"submitting_audit",
		"auditing",
		"releasing",
		"published"
	].includes(task.status)) ? "published" : taskStatusToVersionStatus(task.status);
	return {
		mode,
		status,
		qrcodeValue: status === "published" ? mode === "formal" ? task.urlLink : null : null,
		qrcodeImageUrl: status === "published" ? mode === "formal" ? task.publishedQrcodeUrl : task.experienceQrcodeUrl : null,
		errorCode: null,
		errorMessage: status === "failed" ? task.errorMessage : null
	};
}
function projectPublishStatus(applicationId, status) {
	if (!status.taskId || !status.publishMode) return null;
	if (status.status === "failed") logPublishFailure({
		applicationId,
		taskId: status.taskId,
		publishMode: status.publishMode,
		errorMessage: status.errorMessage
	});
	const modes = status.publishMode === "formal" ? ["experience", "formal"] : [status.publishMode];
	return {
		taskId: status.taskId,
		publishMode: status.publishMode,
		status: status.status,
		versions: modes.map((mode) => projectVersion(mode, status)),
		errorCode: null,
		errorMessage: status.errorMessage,
		updatedAt: status.updatedAt
	};
}
/**
* 后端「一个用途 → 多个 privacyItems」拆成表单的「一行一个隐私项」（单选）。
*
* 拆开不丢信息：微信 `setting_list` 本来就是一个 `privacy_key` 一条记录、
* `privacy_text` 重复填用途，后端读取时才按用途分组。没有隐私项的用途保留成空行，
* 否则用户已经写好的用途会凭空消失。
*/
function projectCollectItems(dtoItems) {
	return dtoItems.flatMap((item, index) => {
		return (item.privacyItems.length > 0 ? item.privacyItems : [""]).map((privacyKey, keyIndex) => ({
			id: `server-privacy-${index}-${keyIndex}`,
			purpose: item.purpose,
			privacyKey
		}));
	});
}
function projectPrivacy(setting) {
	return {
		phoneNumber: setting.phoneNumber,
		email: setting.email,
		notifyMethod: setting.notifyMethod === "announcement" || setting.notifyMethod === "other" ? setting.notifyMethod : "popup",
		notifyContact: "",
		collectItems: projectCollectItems(setting.collectItems)
	};
}
function createRealMiniprogramApi(options = {}) {
	let client = options.client;
	const getClient = () => {
		client ??= createRealMiniprogramClient();
		return client;
	};
	return {
		async loadOverview(applicationId) {
			const api = getClient();
			const binding = projectBinding(await api.getBinding(applicationId));
			const modes = binding.bindingType === "trial" ? ["trial"] : binding.bindingType === "existing" ? ["experience", "formal"] : [];
			return {
				binding,
				publish: (await Promise.all(modes.map((mode) => api.getPublishStatus(applicationId, mode)))).reduce((current, status) => mergePublishTask(current, projectPublishStatus(applicationId, status)), null)
			};
		},
		async startExistingBinding(applicationId) {
			const session = await getClient().getAuthUrl(applicationId);
			return {
				kind: "existing",
				qrcodeValue: session.authUrl,
				expiresAt: session.expiresAt
			};
		},
		async startTrialCreation(applicationId) {
			const session = await getClient().getSubscribeQrcode(applicationId);
			return {
				kind: "trial",
				qrcodeValue: null,
				qrcodeImageUrl: session.qrCodeImgUrl,
				expiresAt: session.expiresAt
			};
		},
		async getBinding(applicationId) {
			return projectBinding(await getClient().getBinding(applicationId));
		},
		async startPublish(request) {
			if (!request.localDir) throw new MiniprogramContractGapError("找不到本地小程序工程目录，无法发布");
			return await (options.publishCodePackage ?? (async (params) => deserializeResult(await wb.invoke("miniprogram:publish", params))))({
				applicationId: request.applicationId,
				localDir: request.localDir,
				publishMode: request.publishMode,
				appName: request.appName,
				description: request.description,
				version: request.version
			});
		},
		async unpublish(applicationId) {
			await getClient().offline(applicationId);
		},
		async getPublishStatus(applicationId, publishMode) {
			return projectPublishStatus(applicationId, await getClient().getPublishStatus(applicationId, publishMode));
		},
		async getPrivacySetting(applicationId) {
			return projectPrivacy(await getClient().getPrivacySetting(applicationId));
		},
		async updatePrivacySetting(applicationId, setting) {
			const api = getClient();
			await api.updatePrivacySetting({
				applicationId,
				phoneNumber: setting.phoneNumber,
				email: setting.email,
				notifyMethod: setting.notifyMethod,
				collectItems: stripBlankCollectItems(setting.collectItems).map((item) => ({
					purpose: item.purpose,
					privacyItems: resolvePrivacyKey(item) ? [resolvePrivacyKey(item)] : []
				}))
			});
			return projectPrivacy(await api.getPrivacySetting(applicationId));
		},
		async readPrivacyDraft(applicationId, localDir) {
			if (!localDir) return null;
			const readDraft = options.readPrivacyDraftFile ?? (async (params) => deserializeResult(await wb.invoke("miniprogram:read-privacy-draft", params)));
			try {
				return await readDraft({
					applicationId,
					localDir
				});
			} catch {
				return null;
			}
		}
	};
}
var MiniprogramContractGapError, realMiniprogramApi;
var init_real_miniprogram_api = __esmMin((() => {
	init_wb();
	init_error_message();
	init_privacy_collect_items();
	init_publish_mode();
	init_real_miniprogram_client();
	MiniprogramContractGapError = class extends Error {
		constructor(message) {
			super(message);
			this.name = "MiniprogramContractGapError";
		}
	};
	realMiniprogramApi = createRealMiniprogramApi();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/api/index.ts
var init_api = __esmMin((() => {
	init_paths();
	init_real_miniprogram_client();
	init_real_miniprogram_api();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/state/publish-auth-retry.ts
function waitForAuthRetry(signal) {
	return new Promise((resolve) => {
		const onAbort = () => {
			window.clearTimeout(timer);
			resolve(false);
		};
		const timer = window.setTimeout(() => {
			signal.removeEventListener("abort", onAbort);
			resolve(true);
		}, AUTH_RETRY_INTERVAL_MS);
		signal.addEventListener("abort", onAbort, { once: true });
	});
}
async function startPublishWithAuthRetry(start, signal, onAuthPending) {
	try {
		for (let retries = 0;; retries += 1) try {
			return await start();
		} catch (error) {
			if (error?.code !== 18375) throw error;
			if (signal.aborted) return null;
			if (retries === MAX_AUTH_RETRIES) throw error;
			onAuthPending(true);
			if (!await waitForAuthRetry(signal) || signal.aborted) return null;
		}
	} finally {
		onAuthPending(false);
	}
}
var AUTH_RETRY_INTERVAL_MS, MAX_AUTH_RETRIES;
var init_publish_auth_retry = __esmMin((() => {
	init_types();
	AUTH_RETRY_INTERVAL_MS = 5e3;
	MAX_AUTH_RETRIES = 3;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/hooks/use-miniprogram-privacy.ts
/**
* 预填是纯增强，任何失败都只意味着「没有预填」。
*
* 端口契约已承诺不抛错，这里再兜一层：草稿读取失败绝不能变成隐私表单的错误态，
* 那会把用户的手工填写一起挡掉。
*/
async function readDraft(api, applicationId, localDir) {
	try {
		return await api.readPrivacyDraft(applicationId, localDir);
	} catch {
		return null;
	}
}
function createFallbackPrivacy(draft) {
	return {
		phoneNumber: "",
		email: "",
		notifyMethod: "popup",
		notifyContact: "",
		collectItems: withEditableCollectItems(collectItemsFromDraft(draft))
	};
}
function useMiniprogramPrivacy(options) {
	const { api, applicationId, open, localDir } = options;
	const t = useTranslation();
	const [privacy, setPrivacy] = (0, import_react$9.useState)(null);
	const [loading, setLoading] = (0, import_react$9.useState)(false);
	const [busy, setBusy] = (0, import_react$9.useState)(false);
	const [error, setError] = (0, import_react$9.useState)(null);
	const [errorKind, setErrorKind] = (0, import_react$9.useState)(null);
	const requestEpochRef = (0, import_react$9.useRef)(0);
	const saveEpochRef = (0, import_react$9.useRef)(0);
	const busyRef = (0, import_react$9.useRef)(false);
	(0, import_react$9.useEffect)(() => {
		requestEpochRef.current += 1;
		if (!open) setLoading(false);
	}, [applicationId, open]);
	return {
		privacy,
		setPrivacy,
		loading,
		busy,
		error,
		errorKind,
		load: (0, import_react$9.useCallback)(async () => {
			const epoch = ++requestEpochRef.current;
			setPrivacy(null);
			setLoading(true);
			setError(null);
			setErrorKind(null);
			try {
				const next = await api.getPrivacySetting(applicationId);
				if (epoch !== requestEpochRef.current) return;
				const collectItems = next.collectItems.length > 0 ? next.collectItems : collectItemsFromDraft(await readDraft(api, applicationId, localDir));
				if (epoch !== requestEpochRef.current) return;
				setPrivacy({
					...next,
					collectItems: withEditableCollectItems(collectItems)
				});
			} catch (loadError) {
				const message = resolveMiniprogramErrorMessage(loadError, t, "application.miniprogram.error.privacyLoad");
				const draft = await readDraft(api, applicationId, localDir);
				if (epoch === requestEpochRef.current) {
					setPrivacy(createFallbackPrivacy(draft));
					setError(message);
					setErrorKind("load");
				}
			} finally {
				if (epoch === requestEpochRef.current) setLoading(false);
			}
		}, [
			api,
			applicationId,
			localDir,
			t
		]),
		save: (0, import_react$9.useCallback)(async () => {
			if (!privacy || busyRef.current) return false;
			const epoch = ++saveEpochRef.current;
			busyRef.current = true;
			setBusy(true);
			setError(null);
			setErrorKind(null);
			try {
				const next = await api.updatePrivacySetting(applicationId, privacy);
				if (epoch === saveEpochRef.current) {
					setPrivacy({
						...next,
						collectItems: withEditableCollectItems(next.collectItems)
					});
					return true;
				}
				return false;
			} catch (saveError) {
				if (epoch === saveEpochRef.current) {
					setError(resolveMiniprogramErrorMessage(saveError, t, "application.miniprogram.error.privacySave"));
					setErrorKind("save");
				}
				return false;
			} finally {
				if (epoch === saveEpochRef.current) {
					busyRef.current = false;
					setBusy(false);
				}
			}
		}, [
			api,
			applicationId,
			privacy,
			t
		])
	};
}
var import_react$9;
var init_use_miniprogram_privacy = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_error_message();
	init_privacy_collect_items();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/hooks/use-serial-polling.ts
/**
* 无重叠轮询：上一请求结算后才安排下一次。
* task 通过 ref 保持最新，避免业务状态变化反复重建计时器。
*/
function useSerialPolling({ enabled, intervalMs, maxAttempts, restartKey, task }) {
	const taskRef = (0, import_react$8.useRef)(task);
	taskRef.current = task;
	(0, import_react$8.useEffect)(() => {
		if (!enabled) return;
		let cancelled = false;
		let timer;
		let attempts = 0;
		const tick = async () => {
			attempts += 1;
			let shouldStop = false;
			try {
				shouldStop = await taskRef.current();
			} catch {}
			if (!cancelled && !shouldStop && !(maxAttempts !== void 0 && attempts >= maxAttempts)) timer = window.setTimeout(() => {
				tick().catch(() => void 0);
			}, intervalMs);
		};
		timer = window.setTimeout(() => {
			tick().catch(() => void 0);
		}, intervalMs);
		return () => {
			cancelled = true;
			if (timer !== void 0) window.clearTimeout(timer);
		};
	}, [
		enabled,
		intervalMs,
		maxAttempts,
		restartKey
	]);
}
var import_react$8;
var init_use_serial_polling = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/hooks/use-miniprogram-flow.ts
function useMiniprogramFlow({ open, applicationId, appName, localDir, api = realMiniprogramApi }) {
	const t = useTranslation();
	const [view, setView] = (0, import_react$7.useState)("overview");
	const [overview, setOverview] = (0, import_react$7.useState)(null);
	const [authSession, setAuthSession] = (0, import_react$7.useState)(null);
	const [loading, setLoading] = (0, import_react$7.useState)(false);
	const [actionBusy, setActionBusy] = (0, import_react$7.useState)(false);
	const [authPending, setAuthPending] = (0, import_react$7.useState)(false);
	const [error, setError] = (0, import_react$7.useState)(null);
	const scopeEpochRef = (0, import_react$7.useRef)(0);
	const authEpochRef = (0, import_react$7.useRef)(0);
	const requestEpochRef = (0, import_react$7.useRef)(0);
	const actionEpochRef = (0, import_react$7.useRef)(0);
	const actionKindRef = (0, import_react$7.useRef)(null);
	const actionBusyRef = (0, import_react$7.useRef)(false);
	const publishRequestRef = (0, import_react$7.useRef)(null);
	const pendingPublishRef = (0, import_react$7.useRef)(null);
	const openRef = (0, import_react$7.useRef)(open);
	const applicationIdRef = (0, import_react$7.useRef)(applicationId);
	const privacyFlow = useMiniprogramPrivacy({
		api,
		applicationId,
		open,
		localDir
	});
	openRef.current = open;
	applicationIdRef.current = applicationId;
	(0, import_react$7.useEffect)(() => () => {
		publishRequestRef.current?.controller.abort();
	}, [applicationId, open]);
	const refreshOverview = (0, import_react$7.useCallback)(async (keepPrevious = true) => {
		const scopeEpoch = scopeEpochRef.current;
		const epoch = ++requestEpochRef.current;
		if (!keepPrevious) setOverview(null);
		setLoading(true);
		setError(null);
		try {
			const next = await api.loadOverview(applicationId);
			if (scopeEpoch === scopeEpochRef.current && epoch === requestEpochRef.current) setOverview((current) => {
				const pending = pendingPublishRef.current;
				const preserved = pending?.applicationId === applicationId ? pending.snapshot : current?.publish;
				return preserved && shouldPollPublishStatus(preserved) && !shouldPollPublishStatus(next.publish) ? {
					...next,
					publish: preserved
				} : next;
			});
		} catch (loadError) {
			if (scopeEpoch === scopeEpochRef.current && epoch === requestEpochRef.current) setError(resolveMiniprogramErrorMessage(loadError, t, "application.miniprogram.error.overview"));
		} finally {
			if (scopeEpoch === scopeEpochRef.current && epoch === requestEpochRef.current) setLoading(false);
		}
	}, [
		api,
		applicationId,
		t
	]);
	const refreshOverviewRef = (0, import_react$7.useRef)(refreshOverview);
	refreshOverviewRef.current = refreshOverview;
	(0, import_react$7.useEffect)(() => {
		scopeEpochRef.current += 1;
		authEpochRef.current += 1;
		requestEpochRef.current += 1;
		if (!open && actionKindRef.current === "auth") {
			actionEpochRef.current += 1;
			actionKindRef.current = null;
			actionBusyRef.current = false;
		}
		setActionBusy(actionBusyRef.current);
		if (!open) {
			setAuthSession(null);
			return;
		}
		setView("overview");
		setAuthSession(null);
		refreshOverviewRef.current(publishRequestRef.current?.applicationId === applicationId || pendingPublishRef.current?.applicationId === applicationId).catch(() => void 0);
	}, [applicationId, open]);
	const startAuth = (0, import_react$7.useCallback)(async (kind) => {
		if (actionBusyRef.current) return;
		actionBusyRef.current = true;
		actionKindRef.current = "auth";
		const actionEpoch = ++actionEpochRef.current;
		const scopeEpoch = scopeEpochRef.current;
		const authEpoch = ++authEpochRef.current;
		setActionBusy(true);
		setError(null);
		setAuthSession(null);
		setView(kind === "existing" ? "auth-existing" : "auth-trial");
		try {
			const session = kind === "existing" ? await api.startExistingBinding(applicationId) : await api.startTrialCreation(applicationId, appName);
			if (scopeEpoch === scopeEpochRef.current && authEpoch === authEpochRef.current && actionEpoch === actionEpochRef.current) setAuthSession(session);
		} catch (authError) {
			if (scopeEpoch === scopeEpochRef.current && authEpoch === authEpochRef.current && actionEpoch === actionEpochRef.current) setError(resolveMiniprogramErrorMessage(authError, t, "application.miniprogram.error.auth"));
		} finally {
			if (actionEpoch === actionEpochRef.current) {
				actionKindRef.current = null;
				actionBusyRef.current = false;
				setActionBusy(false);
			}
		}
	}, [
		api,
		appName,
		applicationId,
		t
	]);
	const refreshAuth = (0, import_react$7.useCallback)(() => {
		startAuth(view === "auth-trial" ? "trial" : "existing").catch(() => void 0);
	}, [startAuth, view]);
	/** 已发布后端以 GET /binding 的 status 作为授权进度，按 3 秒轮询。 */
	const pollAuthBinding = (0, import_react$7.useCallback)(async () => {
		const scopeEpoch = scopeEpochRef.current;
		const authEpoch = authEpochRef.current;
		const binding = await api.getBinding(applicationId);
		if (scopeEpoch !== scopeEpochRef.current || authEpoch !== authEpochRef.current) return true;
		if (binding.authorizationFailure) {
			setError(t("application.miniprogram.auth.authorizationFailure"));
			return true;
		}
		if (binding.authorizationStatus === "unauthorized" || binding.authorizationStatus === "failed") {
			setError(t("application.miniprogram.auth.failed"));
			return true;
		}
		const expectedBindingType = authSession?.kind === "trial" ? "trial" : "existing";
		if (!(binding.authorizationStatus ? binding.authorizationStatus === "authorized" && binding.bindingType === expectedBindingType : binding.bindingType === expectedBindingType)) return false;
		setOverview((previous) => ({
			binding,
			publish: previous?.publish ?? null
		}));
		setAuthSession(null);
		setView("overview");
		return true;
	}, [
		api,
		applicationId,
		authSession?.kind,
		t
	]);
	useSerialPolling({
		enabled: open && authSession !== null,
		intervalMs: 3e3,
		restartKey: authSession,
		task: pollAuthBinding
	});
	const startPublish = (0, import_react$7.useCallback)(async (modes) => {
		if (actionBusyRef.current || pendingPublishRef.current?.applicationId === applicationId) return false;
		const publishMode = resolvePublishMode(modes);
		if (!publishMode || !canStartPublish(overview?.publish, modes)) return false;
		actionBusyRef.current = true;
		actionKindRef.current = "publish";
		const actionEpoch = ++actionEpochRef.current;
		const scopeEpoch = scopeEpochRef.current;
		const previousPublish = overview?.publish ?? null;
		const controller = new AbortController();
		publishRequestRef.current = {
			applicationId,
			controller
		};
		setOverview((previous) => previous ? {
			...previous,
			publish: createOptimisticPublishSnapshot(previous.publish, modes, publishMode)
		} : previous);
		setActionBusy(true);
		setError(null);
		try {
			const request = {
				applicationId,
				appName,
				localDir,
				publishMode,
				description: `WorkBuddy ${appName}`
			};
			const accepted = await startPublishWithAuthRetry(() => api.startPublish(request), controller.signal, setAuthPending);
			if (!accepted) {
				if (applicationIdRef.current === applicationId) setOverview((previous) => previous ? {
					...previous,
					publish: previousPublish
				} : previous);
				return false;
			}
			if (applicationIdRef.current !== applicationId) return false;
			const { taskId } = accepted;
			setOverview((previous) => {
				const accepted = applyAcceptedPublish(previous, null, taskId, publishMode);
				if (accepted?.publish) pendingPublishRef.current = {
					applicationId,
					snapshot: accepted.publish,
					expectedTaskId: taskId,
					publishMode
				};
				return accepted;
			});
			setView("overview");
			let publish;
			let companionExperience = null;
			try {
				publish = await api.getPublishStatus(applicationId, publishMode);
				if (!matchesExpectedPublishTask(publish, taskId)) return true;
				if (publishMode === "formal" && publish && !isPublishTaskActive(publish.status)) {
					companionExperience = await api.getPublishStatus(applicationId, "experience");
					if (!companionExperience) return true;
				}
			} catch (statusError) {
				console.warn("[miniprogram] first publish status query failed:", statusError);
				if (applicationIdRef.current === applicationId) setOverview((previous) => applyAcceptedPublish(previous, null, taskId, publishMode));
				return true;
			}
			if (pendingPublishRef.current?.applicationId === applicationId) pendingPublishRef.current = null;
			const applyPublishResult = (previous) => {
				const accepted = applyAcceptedPublish(previous, publish, taskId, publishMode);
				if (!accepted || !companionExperience) return accepted;
				return {
					...accepted,
					publish: mergePublishTask(accepted.publish, companionExperience)
				};
			};
			if (scopeEpoch !== scopeEpochRef.current) {
				if (applicationIdRef.current === applicationId && openRef.current) {
					setOverview(applyPublishResult);
					return true;
				}
				return false;
			}
			setOverview(applyPublishResult);
			setView("overview");
			return true;
		} catch (publishError) {
			if (applicationIdRef.current === applicationId) setOverview((previous) => previous ? {
				...previous,
				publish: previousPublish
			} : previous);
			if (applicationIdRef.current === applicationId && (scopeEpoch === scopeEpochRef.current || openRef.current)) setError(resolveMiniprogramErrorMessage(publishError, t, "application.miniprogram.publishFailure.generic"));
			return false;
		} finally {
			publishRequestRef.current = null;
			if (actionEpoch === actionEpochRef.current) {
				actionKindRef.current = null;
				actionBusyRef.current = false;
				setActionBusy(false);
			}
		}
	}, [
		api,
		appName,
		applicationId,
		localDir,
		overview?.publish,
		t
	]);
	/** 发布任务按真实环境节奏轮询，串行执行避免慢请求重叠。 */
	const pollPublishStatus = (0, import_react$7.useCallback)(async () => {
		const scopeEpoch = scopeEpochRef.current;
		const actionEpoch = actionEpochRef.current;
		const pending = pendingPublishRef.current;
		const modes = publishModesToPoll(overview?.publish);
		if (pending?.applicationId === applicationId && !modes.includes(pending.publishMode)) modes.push(pending.publishMode);
		const results = await Promise.all(modes.map(async (mode) => ({
			mode,
			publish: await api.getPublishStatus(applicationId, mode)
		})));
		const formal = results.find((result) => result.mode === "formal")?.publish;
		if (formal && !isPublishTaskActive(formal.status) && !results.some((result) => result.mode === "experience") && (pending?.applicationId !== applicationId || pending.publishMode !== "formal" || matchesExpectedPublishTask(formal, pending.expectedTaskId))) {
			const experience = await api.getPublishStatus(applicationId, "experience");
			if (scopeEpoch !== scopeEpochRef.current || actionEpoch !== actionEpochRef.current || actionBusyRef.current) return true;
			if (!experience) return false;
			results.push({
				mode: "experience",
				publish: experience
			});
		}
		if (scopeEpoch !== scopeEpochRef.current || actionEpoch !== actionEpochRef.current || actionBusyRef.current) return true;
		let nextPublish = overview?.publish ?? null;
		for (const result of results) {
			if (pending?.applicationId === applicationId && result.mode === pending.publishMode && !matchesExpectedPublishTask(result.publish, pending.expectedTaskId)) continue;
			if (pending?.applicationId === applicationId && result.mode === pending.publishMode) pendingPublishRef.current = null;
			nextPublish = mergePublishTask(nextPublish, result.publish);
		}
		setOverview((previous) => previous ? {
			...previous,
			publish: nextPublish
		} : previous);
		return !shouldPollPublishStatus(nextPublish);
	}, [
		api,
		applicationId,
		overview?.publish
	]);
	const experienceQrcodePending = isExperienceQrcodePending(overview?.publish);
	useSerialPolling({
		enabled: open && !actionBusy && shouldPollPublishStatus(overview?.publish),
		intervalMs: experienceQrcodePending ? EXPERIENCE_QRCODE_POLL_INTERVAL_MS : 1e4,
		maxAttempts: experienceQrcodePending ? EXPERIENCE_QRCODE_MAX_POLL_ATTEMPTS : void 0,
		task: pollPublishStatus
	});
	const unpublish = (0, import_react$7.useCallback)(async () => {
		const hasActiveTask = Object.values(overview?.publish?.tasks ?? {}).some((task) => isPublishTaskActive(task.status));
		if (actionBusyRef.current || hasActiveTask) return false;
		actionBusyRef.current = true;
		actionKindRef.current = "publish";
		const actionEpoch = ++actionEpochRef.current;
		setActionBusy(true);
		setError(null);
		try {
			await api.unpublish(applicationId);
			if (applicationIdRef.current === applicationId) setOverview((previous) => previous ? {
				...previous,
				publish: null
			} : previous);
			return true;
		} catch (unpublishError) {
			if (applicationIdRef.current === applicationId) setError(resolveMiniprogramErrorMessage(unpublishError, t, "application.miniprogram.error.unpublish"));
			return false;
		} finally {
			if (actionEpoch === actionEpochRef.current) {
				actionKindRef.current = null;
				actionBusyRef.current = false;
				setActionBusy(false);
			}
		}
	}, [
		api,
		applicationId,
		overview?.publish?.tasks,
		t
	]);
	const openPrivacy = (0, import_react$7.useCallback)(async () => {
		setView("privacy");
		await privacyFlow.load();
	}, [privacyFlow.load]);
	const savePrivacy = (0, import_react$7.useCallback)(async () => {
		const saved = await privacyFlow.save();
		if (saved) setView("settings");
		return saved;
	}, [privacyFlow.save]);
	const goToOverview = (0, import_react$7.useCallback)(() => {
		authEpochRef.current += 1;
		if (actionKindRef.current === "auth") {
			actionEpochRef.current += 1;
			actionKindRef.current = null;
			actionBusyRef.current = false;
			setActionBusy(false);
		}
		setAuthSession(null);
		setError(null);
		setView("overview");
	}, []);
	return {
		view,
		setView,
		overview,
		authSession,
		privacy: privacyFlow.privacy,
		setPrivacy: privacyFlow.setPrivacy,
		loading,
		actionBusy: actionBusy || privacyFlow.busy,
		authPending,
		privacyLoading: privacyFlow.loading,
		privacyError: privacyFlow.error,
		privacyErrorKind: privacyFlow.errorKind,
		error,
		refreshOverview,
		startAuth,
		refreshAuth,
		startPublish,
		unpublish,
		openPrivacy,
		savePrivacy,
		goToOverview
	};
}
var import_react$7, EXPERIENCE_QRCODE_POLL_INTERVAL_MS, EXPERIENCE_QRCODE_MAX_POLL_ATTEMPTS;
var init_use_miniprogram_flow = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_api();
	init_error_message();
	init_publish_auth_retry();
	init_publish_mode();
	init_use_miniprogram_privacy();
	init_use_serial_polling();
	EXPERIENCE_QRCODE_POLL_INTERVAL_MS = 1e3;
	EXPERIENCE_QRCODE_MAX_POLL_ATTEMPTS = 30;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/qrcode-utils.ts
var init_qrcode_utils = __esmMin((() => {
	init_qrcode_utils$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/components/auth-qrcode-view.tsx
function formatRemaining(seconds) {
	const minutes = Math.floor(seconds / 60);
	const rest = seconds % 60;
	return `${minutes}分${String(rest).padStart(2, "0")}秒`;
}
var import_react$6, import_jsx_runtime$6, AuthQrcodeView;
var init_auth_qrcode_view = __esmMin((() => {
	init_src();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_qrcode_utils();
	import_jsx_runtime$6 = require_jsx_runtime();
	AuthQrcodeView = ({ kind, session, loading, error, onRefresh, onOpenWechatConsole }) => {
		const t = useTranslation();
		const [dataUrl, setDataUrl] = (0, import_react$6.useState)("");
		const [now, setNow] = (0, import_react$6.useState)(() => Date.now());
		(0, import_react$6.useEffect)(() => {
			let cancelled = false;
			setDataUrl("");
			if (session?.qrcodeImageUrl) {
				setDataUrl(session.qrcodeImageUrl);
				return;
			}
			if (!session?.qrcodeValue && !session?.qrcodeImageUrl) return;
			createMiniprogramQrcodeDataUrl(session.qrcodeValue).then((next) => {
				if (!cancelled) setDataUrl(next);
			}).catch(() => {
				if (!cancelled) setDataUrl("");
			});
			return () => {
				cancelled = true;
			};
		}, [session?.qrcodeImageUrl, session?.qrcodeValue]);
		(0, import_react$6.useEffect)(() => {
			const timer = window.setInterval(() => setNow(Date.now()), 1e3);
			return () => window.clearInterval(timer);
		}, []);
		const remaining = (0, import_react$6.useMemo)(() => session ? Math.max(0, Math.ceil((Date.parse(session.expiresAt) - now) / 1e3)) : 0, [now, session]);
		const expired = Boolean(session && remaining === 0);
		const unusable = expired || Boolean(error);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "miniprogram-auth",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
					className: "miniprogram-auth__description",
					children: kind === "trial" ? t("application.miniprogram.auth.trialDescription") : /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
						t("application.miniprogram.auth.existingDescriptionBeforeConsole"),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
							variant: "link",
							size: "small",
							onClick: onOpenWechatConsole,
							children: t("application.miniprogram.auth.wechatConsole")
						}),
						t("application.miniprogram.auth.existingDescriptionAfterConsole")
					] })
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Alert, {
					variant: "error",
					className: "miniprogram-auth__error",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "miniprogram-auth__qrcode",
					children: error ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "miniprogram-auth__qrcode-message",
						children: t(kind === "existing" ? "application.miniprogram.auth.bindingFailedRefresh" : "application.miniprogram.auth.failed")
					}) : loading || session && !dataUrl && !expired ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Loading, { tip: t("application.miniprogram.auth.loading") }) : expired ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "miniprogram-auth__qrcode-message",
						children: t("application.miniprogram.auth.expired")
					}) : dataUrl ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("img", {
						src: dataUrl,
						alt: t("application.miniprogram.auth.qrcodeAlt")
					}) : null
				}),
				unusable ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
					variant: "secondary",
					size: "small",
					leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(WbRefreshIcon, {
						width: 14,
						height: 14
					}),
					onClick: onRefresh,
					children: t("application.miniprogram.auth.refresh")
				}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", { children: t("application.miniprogram.auth.scanHint") }), session ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: "miniprogram-auth__countdown",
					children: t("application.miniprogram.auth.expiresIn", { time: formatRemaining(remaining) })
				}) : null] })
			]
		});
	};
})), import_jsx_runtime$5, BindingChoiceView;
var init_binding_choice_view = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$5 = require_jsx_runtime();
	BindingChoiceView = ({ busy, onBindExisting, onCreateTrial }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "miniprogram-binding-choice",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: t("application.miniprogram.binding.description") }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(Card, {
					variant: "outlined",
					padding: "none",
					className: "miniprogram-binding-choice__card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
						className: "miniprogram-binding-choice__copy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: t("application.miniprogram.binding.existingTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("small", { children: t("application.miniprogram.binding.existingDescription") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Button, {
						variant: "secondary",
						disabled: busy,
						onClick: onBindExisting,
						children: t("application.miniprogram.binding.bind")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(Card, {
					variant: "outlined",
					padding: "none",
					className: "miniprogram-binding-choice__card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
						className: "miniprogram-binding-choice__copy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: t("application.miniprogram.binding.trialTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("small", { children: t("application.miniprogram.binding.trialDescription") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Button, {
						variant: "secondary",
						disabled: busy,
						onClick: onCreateTrial,
						children: t("application.miniprogram.binding.create")
					})]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/components/qrcode-preview.tsx
var init_qrcode_preview = __esmMin((() => {
	init_miniprogram_qrcode_preview();
})), import_jsx_runtime$4, STATUS_TONES, VersionRow;
var init_version_row = __esmMin((() => {
	init_src$1();
	init_src();
	require_react();
	init_useI18n();
	init_error_message();
	init_qrcode_preview();
	import_jsx_runtime$4 = require_jsx_runtime();
	STATUS_TONES = {
		not_published: "default",
		publishing: "default",
		auditing: "default",
		releasing: "default",
		published: "default",
		failed: "error",
		expired: "error"
	};
	VersionRow = ({ version, label, selection, summary, onOpenSettings, onOpenWechatConsole }) => {
		const t = useTranslation();
		const statusLabel = t(`application.miniprogram.status.${version.status}`);
		const failureMessage = formatPublishFailureMessage(version.errorMessage) ?? t("application.miniprogram.publishFailure.generic");
		const failureIcon = version.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
			content: version.errorCode === "PRIVACY_SETTING_INCOMPLETE" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
				className: "miniprogram-audit-tooltip__content",
				children: [t("application.miniprogram.publishFailure.privacyIncompleteBeforeAgreement"), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
					variant: "link",
					size: "small",
					onClick: onOpenSettings,
					children: t("application.miniprogram.publishFailure.privacyAgreement")
				})]
			}) : version.errorCode === "MINIPROGRAM_NOT_INITIALIZED" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
				className: "miniprogram-audit-tooltip__content",
				children: [
					t("application.miniprogram.auditFailedBeforeConsole"),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
						variant: "link",
						size: "small",
						onClick: onOpenWechatConsole,
						children: t("application.miniprogram.auth.wechatConsole")
					}),
					t("application.miniprogram.auditFailedAfterConsole")
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "miniprogram-audit-tooltip__message",
				children: failureMessage
			}),
			placement: "top",
			delay: 0,
			maxWidth: 280,
			className: "miniprogram-audit-tooltip",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "miniprogram-version-row__error-icon",
				"aria-label": statusLabel,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ErrorCircleIcon, { size: "sm" })
			})
		}) : null;
		const qrcode = (version.qrcodeValue || version.qrcodeImageUrl) && version.status === "published" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(QrcodePreview, {
			value: version.qrcodeValue,
			imageUrl: version.qrcodeImageUrl,
			label
		}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
			content: version.status === "published" ? t("application.miniprogram.qrcode.unavailable") : t("application.miniprogram.qrcode.publishFirst"),
			placement: "top",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "miniprogram-version-row__qrcode-disabled",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
					variant: "ghost",
					size: "medium",
					iconOnly: true,
					disabled: true,
					"aria-label": t("application.miniprogram.qrcode.preview", { version: label }),
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ShareQrcodeIcon, {})
				})
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(Card, {
			variant: "outlined",
			padding: "none",
			className: selection ? "miniprogram-version-row miniprogram-version-row--selectable" : "miniprogram-version-row",
			children: [selection ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
				content: selection.disabledReason,
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "miniprogram-version-row__select",
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(Checkbox, {
						checked: selection.checked,
						readOnly: selection.readOnly,
						disabled: selection.disabled,
						onChange: (event) => selection.onChange(event.currentTarget.checked),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
							className: "miniprogram-version-row__summary",
							children: [summary, failureIcon]
						})]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "miniprogram-version-row__copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "miniprogram-version-row__status-group",
					children: [failureIcon, /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
						tone: STATUS_TONES[version.status],
						appearance: "plain",
						size: "small",
						className: "miniprogram-version-row__status",
						children: statusLabel
					})]
				})]
			}), qrcode]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/components/miniprogram-overview-view.tsx
function getModes(binding) {
	if (binding.bindingType === "existing") return ["experience", "formal"];
	return binding.bindingType === "trial" ? ["trial"] : [];
}
function formatTrialDate(value) {
	const date = new Date(value);
	return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}
/**
* 勾选行的小字 = 「发布状态 + 版本解释」。
*
* 状态来自 `GET /publish/status` 投影出的 `version.status`，解释沿用原发布范围页的文案。
* 正式版不用静态描述而用 `GET /binding` 的本周剩余提审次数：额度直接决定这一项能不能勾，
* 放在这里用户才会在勾之前看到，而不是点完发布才知道被拒。
*/
function versionSummary(t, version, auditRemaining) {
	return t("application.miniprogram.version.summary", {
		status: t(`application.miniprogram.status.${version.status}`),
		detail: version.mode === "formal" ? t("application.miniprogram.scope.formalRemaining", { count: auditRemaining }) : t(`application.miniprogram.version.${version.mode}Description`)
	});
}
var import_react$3, import_jsx_runtime$3, MODE_KEYS, MiniprogramOverviewView;
var init_miniprogram_overview_view = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_publish_mode();
	init_version_row();
	import_jsx_runtime$3 = require_jsx_runtime();
	MODE_KEYS = {
		trial: "application.miniprogram.version.trial",
		experience: "application.miniprogram.version.experience",
		formal: "application.miniprogram.version.formal"
	};
	MiniprogramOverviewView = ({ appName, binding, publish, busy, selectedModes, onSelectedModesChange, onOpenSettings, onOpenWechatConsole, onPublish, onUnpublish }) => {
		const t = useTranslation();
		const modes = getModes(binding);
		const rows = (0, import_react$3.useMemo)(() => modes.map((mode) => {
			const found = versionForMode(publish?.versions, mode);
			if (mode === "trial" && binding.trialExpired) return {
				mode,
				status: "expired",
				qrcodeValue: null,
				errorCode: null,
				errorMessage: null
			};
			return found ?? {
				mode,
				status: "not_published",
				qrcodeValue: null,
				errorCode: null,
				errorMessage: null
			};
		}), [
			binding.trialExpired,
			modes,
			publish?.versions
		]);
		const publishing = isPublishButtonLoading(publish);
		const formalPublishing = isFormalPublishActive(publish);
		const hasPublished = rows.some((row) => row.status === "published");
		const canUnpublish = versionForMode(publish?.versions, "formal")?.status === "published";
		const showSettings = binding.bindingType === "existing";
		const selectable = binding.bindingType === "existing";
		const formalSelectable = canSelectFormalPublish(publish, binding.auditRemaining);
		const noPublishTarget = selectable && selectedModes.length === 0;
		const publishDisabled = noPublishTarget || binding.bindingType === "trial" && binding.trialExpired;
		const toggle = (mode, checked) => {
			onSelectedModesChange(normalizePublishModes(binding.bindingType, checked ? [...selectedModes, mode] : selectedModes.filter((item) => item !== mode)));
		};
		const selectionFor = (mode) => {
			if (!selectable) return;
			const disabled = mode === "formal" && !formalSelectable;
			return {
				checked: selectedModes.includes(mode),
				readOnly: mode === "experience" && selectedModes.includes("formal"),
				disabled,
				disabledReason: disabled ? t(formalPublishing ? "application.miniprogram.scope.formalPublishing" : "application.miniprogram.scope.exhausted") : void 0,
				onChange: (checked) => toggle(mode, checked)
			};
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "miniprogram-overview",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "miniprogram-overview__app",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(WbMiniprogramSolidIcon, { size: 24 }),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "miniprogram-overview__meta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("strong", {
							title: appName,
							children: appName
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: binding.bindingType === "trial" ? binding.trialExpiresAt ? t("application.miniprogram.bound.trial", { date: formatTrialDate(binding.trialExpiresAt) }) : t("application.miniprogram.bound.trialFallback") : t("application.miniprogram.bound.existing") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "miniprogram-overview__actions",
						children: [
							showSettings ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
								content: t("application.miniprogram.settings.title"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
									variant: "ghost",
									size: "medium",
									iconOnly: true,
									"aria-label": t("application.miniprogram.settings.title"),
									onClick: onOpenSettings,
									children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SettingsIcon, {})
								})
							}) : null,
							canUnpublish ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
								variant: "ghost",
								size: "small",
								disabled: formalPublishing,
								onClick: onUnpublish,
								children: t("application.miniprogram.action.unpublish")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
								content: noPublishTarget ? t("application.miniprogram.scope.selectRequired") : void 0,
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
									className: "miniprogram-overview__publish",
									children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
										variant: hasPublished ? "secondary" : "primary",
										size: "medium",
										loading: publishing || busy,
										disabled: publishDisabled,
										"aria-label": publishing ? t("application.miniprogram.status.publishing") : void 0,
										onClick: onPublish,
										children: hasPublished ? t("application.miniprogram.action.update") : t("application.miniprogram.action.publish")
									})
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "miniprogram-overview__versions",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(VersionRow, {
					version: row,
					label: t(MODE_KEYS[row.mode]),
					selection: selectionFor(row.mode),
					summary: selectable ? versionSummary(t, row, binding.auditRemaining) : void 0,
					onOpenSettings,
					onOpenWechatConsole
				}, row.mode))
			})]
		});
	};
})), import_jsx_runtime$2, MiniprogramSettingsView;
var init_miniprogram_settings_view = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
	MiniprogramSettingsView = ({ onEditPrivacy, onOpenFilingGuide, onOpenUgcGuide }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "miniprogram-settings",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Card, {
					variant: "outlined",
					padding: "none",
					className: "miniprogram-settings__item",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("strong", { children: t("application.miniprogram.settings.filingTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", { children: [
						t("application.miniprogram.settings.filingDescriptionBeforeGuide"),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
							variant: "link",
							size: "small",
							onClick: onOpenFilingGuide,
							children: t("application.miniprogram.settings.guide")
						}),
						t("application.miniprogram.settings.filingDescriptionAfterGuide")
					] })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(Card, {
					variant: "outlined",
					padding: "none",
					className: "miniprogram-settings__item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("strong", { children: t("application.miniprogram.settings.privacyTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", { children: t("application.miniprogram.settings.privacyDescription") })] }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
						variant: "ghost",
						size: "small",
						iconOnly: true,
						"aria-label": t("application.miniprogram.settings.editPrivacy"),
						onClick: onEditPrivacy,
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(EditToolIcon, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Card, {
					variant: "outlined",
					padding: "none",
					className: "miniprogram-settings__item",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("strong", { children: t("application.miniprogram.settings.ugcTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", { children: [t("application.miniprogram.settings.ugcDescriptionBeforeDetails"), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
						variant: "link",
						size: "small",
						onClick: onOpenUgcGuide,
						children: t("application.miniprogram.settings.details")
					})] })] })
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/components/privacy-setting-view.tsx
function validatePrivacySetting(value) {
	if (!value.phoneNumber.trim() || !value.email.trim()) return false;
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value.email)) return false;
	if (value.notifyMethod === "other" && !value.notifyContact.trim()) return false;
	return stripBlankCollectItems(value.collectItems).every((item) => Boolean(item.purpose.trim()) && Boolean(resolvePrivacyKey(item)));
}
var import_react$1, import_jsx_runtime$1, PrivacySettingView;
var init_privacy_setting_view = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_privacy_collect_items();
	init_privacy_keys();
	import_jsx_runtime$1 = require_jsx_runtime();
	PrivacySettingView = ({ value, onChange }) => {
		const t = useTranslation();
		const dropdownHostRef = (0, import_react$1.useRef)(null);
		const collectListRef = (0, import_react$1.useRef)(null);
		const pendingScrollToBottomRef = (0, import_react$1.useRef)(false);
		(0, import_react$1.useEffect)(() => {
			if (!pendingScrollToBottomRef.current) return;
			pendingScrollToBottomRef.current = false;
			const list = collectListRef.current;
			if (list) list.scrollTop = list.scrollHeight;
		}, [value.collectItems.length]);
		const privacyItemOptions = (0, import_react$1.useMemo)(() => [...MINIPROGRAM_PRIVACY_KEYS.map((key) => ({
			value: key,
			label: t(privacyKeyLabelKey(key))
		})), {
			value: CUSTOM_PRIVACY_ITEM_VALUE,
			label: t("application.miniprogram.privacy.customItem")
		}], [t]);
		const patch = (key, next) => onChange({
			...value,
			[key]: next
		});
		const updateCollectItem = (id, update) => {
			patch("collectItems", value.collectItems.map((item) => item.id === id ? update(item) : item));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Form, {
			layout: "vertical",
			className: "miniprogram-privacy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
					className: "miniprogram-privacy__description",
					children: t("application.miniprogram.privacy.description")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Form.Item, {
					label: t("application.miniprogram.privacy.phone"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
						value: value.phoneNumber,
						"aria-label": t("application.miniprogram.privacy.phone"),
						placeholder: t("application.miniprogram.privacy.phonePlaceholder"),
						onChange: (event) => patch("phoneNumber", event.currentTarget.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Form.Item, {
					label: t("application.miniprogram.privacy.email"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
						value: value.email,
						"aria-label": t("application.miniprogram.privacy.email"),
						placeholder: t("application.miniprogram.privacy.emailPlaceholder"),
						onChange: (event) => patch("email", event.currentTarget.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Form.Item, {
					label: t("application.miniprogram.privacy.notifyMethod"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RadioGroup, {
						value: value.notifyMethod,
						options: [
							{
								value: "popup",
								label: t("application.miniprogram.privacy.popup")
							},
							{
								value: "announcement",
								label: t("application.miniprogram.privacy.announcement")
							},
							{
								value: "other",
								label: t("application.miniprogram.privacy.other")
							}
						],
						onChange: (next) => {
							if (next === "popup" || next === "announcement" || next === "other") patch("notifyMethod", next);
						}
					})
				}),
				value.notifyMethod === "other" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Form.Item, {
					className: "miniprogram-privacy__notify-contact",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
						value: value.notifyContact,
						"aria-label": t("application.miniprogram.privacy.contact"),
						placeholder: t("application.miniprogram.privacy.contactPlaceholder"),
						onChange: (event) => patch("notifyContact", event.currentTarget.value)
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "miniprogram-privacy__collect-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("strong", { children: t("application.miniprogram.privacy.collection") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					ref: collectListRef,
					className: "miniprogram-privacy__collect-list",
					children: value.collectItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
						className: "miniprogram-privacy__collect-item",
						role: "group",
						"aria-label": t("application.miniprogram.privacy.collectionIndex", { index: index + 1 }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "miniprogram-privacy__collect-prefix",
								children: t("application.miniprogram.privacy.collectionPurposePrefix")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
								className: "miniprogram-privacy__collect-field",
								value: item.purpose,
								"aria-label": t("application.miniprogram.privacy.purposePlaceholder"),
								placeholder: t("application.miniprogram.privacy.purposePlaceholder"),
								onChange: (event) => updateCollectItem(item.id, (current) => ({
									...current,
									purpose: event.currentTarget.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "miniprogram-privacy__collect-prefix",
								children: t("application.miniprogram.privacy.collectionPrivacyPrefix")
							}),
							isCustomPrivacyKey(item) ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
								autoFocus: true,
								allowClear: true,
								className: "miniprogram-privacy__collect-field",
								value: resolvePrivacyKey(item),
								"aria-label": t("application.miniprogram.privacy.customItemPlaceholder"),
								placeholder: t("application.miniprogram.privacy.customItemPlaceholder"),
								clearAriaLabel: t("application.miniprogram.privacy.clearCustomItem"),
								onChange: (event) => updateCollectItem(item.id, (current) => ({
									...current,
									privacyKey: event.currentTarget.value
								}))
							}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Select, {
								className: "miniprogram-privacy__collect-field",
								portalRoot: () => dropdownHostRef.current,
								value: item.privacyKey,
								options: privacyItemOptions,
								placeholder: t("application.miniprogram.privacy.itemsPlaceholder"),
								onChange: (privacyKey) => updateCollectItem(item.id, (current) => ({
									...current,
									privacyKey
								}))
							}),
							value.collectItems.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								danger: true,
								"aria-label": t("application.miniprogram.privacy.removeCollection"),
								onClick: () => patch("collectItems", value.collectItems.filter((current) => current.id !== item.id)),
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {})
							}) : null
						]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					ref: dropdownHostRef,
					className: "miniprogram-privacy__dropdown-host"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					variant: "link",
					size: "small",
					className: "miniprogram-privacy__add",
					leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddIcon, {}),
					onClick: () => {
						pendingScrollToBottomRef.current = true;
						patch("collectItems", [...value.collectItems, {
							id: createCollectItemId(),
							purpose: "",
							privacyKey: ""
						}]);
					},
					children: t("application.miniprogram.privacy.addCollection")
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/application/miniprogram/components/miniprogram-publish-dialog.tsx
var import_react, import_jsx_runtime, WECHAT_CONSOLE_URL, MINIPROGRAM_FILING_GUIDE_URL, MINIPROGRAM_UGC_GUIDE_URL, MiniprogramPublishDialog;
var init_miniprogram_publish_dialog = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_use_miniprogram_flow();
	init_publish_mode();
	init_auth_qrcode_view();
	init_binding_choice_view();
	init_miniprogram_overview_view();
	init_miniprogram_settings_view();
	init_privacy_setting_view();
	import_jsx_runtime = require_jsx_runtime();
	WECHAT_CONSOLE_URL = "https://mp.weixin.qq.com/";
	MINIPROGRAM_FILING_GUIDE_URL = WECHAT_CONSOLE_URL;
	MINIPROGRAM_UGC_GUIDE_URL = WECHAT_CONSOLE_URL;
	MiniprogramPublishDialog = ({ open, applicationId, appName, localDir, onOpenChange, onOpenExternal }) => {
		const t = useTranslation();
		const flow = useMiniprogramFlow({
			open,
			applicationId,
			appName,
			localDir
		});
		const [selectedModes, setSelectedModes] = (0, import_react.useState)([]);
		const [formError, setFormError] = (0, import_react.useState)("");
		const [prepublishSettingsVisited, setPrepublishSettingsVisited] = (0, import_react.useState)(false);
		const bindingType = flow.overview?.binding.bindingType ?? "none";
		(0, import_react.useEffect)(() => {
			setSelectedModes([]);
			setFormError("");
			setPrepublishSettingsVisited(false);
		}, [applicationId, open]);
		const publishModes = (0, import_react.useMemo)(() => canSelectFormalPublish(flow.overview?.publish, flow.overview?.binding.auditRemaining ?? 0) ? selectedModes : selectedModes.filter((mode) => mode !== "formal"), [
			flow.overview?.binding.auditRemaining,
			flow.overview?.publish,
			selectedModes
		]);
		const title = (0, import_react.useMemo)(() => {
			switch (flow.view) {
				case "auth-existing": return t("application.miniprogram.auth.existingTitle");
				case "auth-trial": return t("application.miniprogram.auth.trialTitle");
				case "settings": return t("application.miniprogram.settings.title");
				case "privacy": return t("application.miniprogram.privacy.title");
				default: return t("application.miniprogram.dialogTitle");
			}
		}, [flow.view, t]);
		const showBack = flow.view !== "overview";
		const handleBack = () => {
			setFormError("");
			if (flow.view === "privacy") {
				flow.setView("settings");
				return;
			}
			flow.goToOverview();
		};
		const handlePublish = () => {
			if (bindingType === "trial") {
				flow.startPublish(["trial"]).catch(() => void 0);
				return;
			}
			if (shouldOpenSettingsBeforePublish(flow.overview?.publish, publishModes, prepublishSettingsVisited)) {
				setPrepublishSettingsVisited(true);
				flow.setView("settings");
				return;
			}
			flow.startPublish(publishModes).catch(() => void 0);
		};
		const handleOpenChange = (nextOpen) => {
			if (!nextOpen && flow.view === "settings") {
				flow.goToOverview();
				return;
			}
			onOpenChange(nextOpen);
		};
		const footer = (() => {
			if (flow.view === "privacy") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => flow.setView("settings"),
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				loading: flow.actionBusy,
				disabled: !flow.privacy,
				onClick: async () => {
					if (!flow.privacy || !validatePrivacySetting(flow.privacy)) {
						setFormError(t("application.miniprogram.privacy.validationError"));
						return;
					}
					setFormError("");
					if (await flow.savePrivacy()) message.success(t("application.miniprogram.privacy.saved"));
				},
				children: t("common.save")
			})] });
			return null;
		})();
		const content = (() => {
			if (flow.view === "auth-existing" || flow.view === "auth-trial") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthQrcodeView, {
				kind: flow.view === "auth-trial" ? "trial" : "existing",
				session: flow.authSession,
				loading: flow.actionBusy,
				error: flow.error,
				onRefresh: flow.refreshAuth,
				onOpenWechatConsole: () => onOpenExternal(WECHAT_CONSOLE_URL)
			});
			if (flow.view === "settings") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniprogramSettingsView, {
				onEditPrivacy: async () => {
					await flow.openPrivacy();
				},
				onOpenFilingGuide: () => onOpenExternal(MINIPROGRAM_FILING_GUIDE_URL),
				onOpenUgcGuide: () => onOpenExternal(MINIPROGRAM_UGC_GUIDE_URL)
			});
			if (flow.view === "privacy") {
				if (flow.privacyLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {
					className: "miniprogram-loading",
					tip: t("application.miniprogram.privacy.loading")
				});
				if (!flow.privacy) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					flow.privacyError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "error",
						actions: flow.privacyErrorKind === "load" ? [{
							key: "retry-privacy",
							label: t("common.retry"),
							onClick: async () => {
								await flow.openPrivacy();
							}
						}] : void 0,
						children: flow.privacyError
					}) : null,
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "error",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacySettingView, {
						value: flow.privacy,
						onChange: flow.setPrivacy
					})
				] });
			}
			if (flow.loading && !flow.overview) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {
				className: "miniprogram-loading",
				tip: t("application.miniprogram.loading")
			});
			if (flow.error && !flow.overview) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				variant: "error",
				actions: [{
					key: "retry",
					label: t("common.retry"),
					onClick: async () => {
						await flow.refreshOverview(false);
					}
				}],
				children: flow.error
			});
			if (!flow.overview || flow.overview.binding.bindingType === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BindingChoiceView, {
				busy: flow.actionBusy,
				onBindExisting: async () => {
					await flow.startAuth("existing");
				},
				onCreateTrial: async () => {
					await flow.startAuth("trial");
				}
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				flow.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
					variant: "error",
					children: flow.error
				}) : null,
				flow.authPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
					variant: "info",
					children: t("application.miniprogram.authPending.waiting")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniprogramOverviewView, {
					appName,
					binding: flow.overview.binding,
					publish: flow.overview.publish,
					busy: flow.actionBusy,
					selectedModes: publishModes,
					onSelectedModesChange: setSelectedModes,
					onOpenSettings: () => flow.setView("settings"),
					onOpenWechatConsole: () => onOpenExternal(WECHAT_CONSOLE_URL),
					onPublish: handlePublish,
					onUnpublish: () => {
						flow.unpublish().catch(() => void 0);
					}
				})
			] });
		})();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open,
			onOpenChange: handleOpenChange,
			title: showBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "miniprogram-publish-dialog__title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "small",
					shape: "circle",
					iconOnly: true,
					className: "miniprogram-publish-dialog__back",
					"aria-label": t("common.back"),
					onClick: handleBack,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackChevronIcon, {
						width: 16,
						height: 16
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "miniprogram-publish-dialog__title-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }), flow.view === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t("application.miniprogram.settings.subtitle") }) : null]
				})]
			}) : title,
			backAriaLabel: t("common.back"),
			closeAriaLabel: t("common.close"),
			width: flow.view === "settings" || flow.view === "privacy" ? 600 : 480,
			closeOnOverlayClick: false,
			footer,
			className: "miniprogram-publish-dialog",
			bodyMask: flow.view === "privacy",
			children: content
		});
	};
}));
//#endregion
__esmMin((() => {
	init_miniprogram$1();
	init_miniprogram_publish_dialog();
}))();
export { MiniprogramPublishDialog };
