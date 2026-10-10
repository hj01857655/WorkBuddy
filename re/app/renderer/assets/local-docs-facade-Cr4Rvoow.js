import { s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { $A as SHARE_RPC_CHANNELS, $j as init_contract$11, Aj as init_contract$21, BA as SYSTEM_RPC_CHANNELS, Bj as FEEDBACK_RPC_CHANNELS, CA as IPC_RPC_CHANNELS, DA as WINDOW_RPC_CHANNELS, Dj as INSPIRATION_RPC_CHANNELS, Ej as INSPIRATION_CURATION_RPC_CHANNELS, Fj as GROWTH_RPC_CHANNELS, GA as ENTERPRISE_SKILLS_RPC_CHANNELS, Gj as init_contract$13, HA as STORAGE_RPC_CHANNELS, Hj as EXPERT_HISTORY_RPC_CHANNELS, IA as DOCS_RPC_EX_CHANNELS, Ij as init_contract$19, J0 as init_wb, JA as SKILL_EVENT_CHANNELS, Jj as DIALOG_RPC_CHANNELS, KA as KNOT_RPC_CHANNELS, Kj as DOCS_RPC_CHANNELS, Lj as FILE_RPC_CHANNELS, MA as init_contract$36, Mj as init_contract$20, Mq as getRendererTraceContextByRequestId, NA as TENCENT_LEXIANG_RPC_CHANNELS, Nj as IDENTITY_RPC_CHANNELS, Nq as init_tracing, Oj as init_contract$22, PA as init_contract$35, Qj as CONNECTOR_RPC_CHANNELS, Qq as init_esm, RA as TELEMETRY_RPC_CHANNELS, Rj as IO_RPC_CHANNELS, SA as init_shared, Sj as init_contract$23, TA as WORKSPACE_RPC_CHANNELS, Uj as EXPERT_RPC_CHANNELS, Vj as init_contract$14, WA as BUILTIN_MARKET_RPC_CHANNELS, Xj as CREDIT_PREDICTION_RPC_CHANNELS, YA as SKILL_RPC_CHANNELS, ZA as SIDECAR_RPC_CHANNELS, Zj as init_contract$12, _j as MICROPHONE_RPC_CHANNELS, aM as init_contract$4, aj as PROXY_SETTINGS_RPC_CHANNELS, bj as init_contract$34, cM as BACKEND_RPC_CHANNELS, dM as init_contract$3, dj as PERF_RPC_CHANNELS, eM as CONFIG_RPC_CHANNELS, ej as init_contract$31, fM as AUTH_RPC_CHANNELS, gM as APP_RPC_CHANNELS, gj as init_contract$25, hM as init_contract$1, hj as MIGRATION_RPC_CHANNELS, iM as CLAW_RPC_CHANNELS, ij as init_contract$29, jA as TTS_RPC_CHANNELS, jj as IDLE_CAPABILITY_RPC_CHANNELS, jq as getRendererTraceContextByConversationId, kA as UPDATE_RPC_CHANNELS, kj as IMA_RPC_CHANNELS, lj as PLUGIN_RPC_CHANNELS, mI as init_contract$30, mM as ASR_RPC_CHANNELS, mj as init_contract$26, nM as CLOUD_AGENT_RPC_CHANNELS, oM as BINARY_RPC_CHANNELS, oj as init_contract$28, pI as SECURITY_CENTER_RPC_CHANNELS, pM as init_contract$2, pj as MY_FILES_RPC_CHANNELS, qA as SKILLHUB_RPC_CHANNELS, rM as init_contract$5, rj as SANDBOX_RPC_CHANNELS, sJ as SpanStatusCode, sj as POWER_RPC_CHANNELS, tM as init_contract$10, tj as SESSION_RPC_CHANNELS, uM as AUTOMATION_RPC_CHANNELS, uj as init_contract$27, vM as AGENT_IM_RPC_CHANNELS, vj as init_contract$24, wj as MARKETPLACE_RPC_CHANNELS, xj as MCP_RPC_CHANNELS, yM as init_contract, yj as MEMORY_RPC_CHANNELS } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Dv as require_dist, Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
import { _ as getDesktopHost, d as listener, f as OPEN_LOCAL_DAEMON_TRANSPORT_PORT_MESSAGE, g as WORKBUDDY_POWER_UNLOCK_SCREEN_EVENT, h as WORKBUDDY_POWER_SUSPEND_EVENT, l as SESSION_CHANNEL_MAP, m as WORKBUDDY_POWER_RESUME_EVENT, u as invoke$1 } from "./locale-utils-TanlkH9x.js";
//#region ../../packages/workbuddy-server/src/server/host-power-events.ts
init_wb();
init_esm();
init_tracing();
init_contract$30();
init_contract();
init_contract$1();
init_contract$2();
init_contract$3();
init_contract$4();
init_contract$5();
init_contract$10();
init_contract$11();
init_contract$12();
init_contract$13();
init_contract$14();
init_contract$19();
init_contract$20();
init_contract$21();
init_contract$22();
init_contract$23();
init_contract$34();
init_contract$24();
init_contract$25();
init_contract$26();
init_contract$27();
init_contract$28();
init_contract$29();
init_contract$31();
init_contract$35();
init_contract$36();
init_shared();
var WORKBUDDY_APP_SERVER_HOST_POWER_RPC_CHANNELS = {
	SUSPEND: "hostPower:suspend",
	RESUME: "hostPower:resume",
	UNLOCK_SCREEN: "hostPower:unlockScreen",
	/**
	* 宿主观察到网络恢复。源头是渲染进程的 `window` online 事件 —— Electron Main 可查询
	* 当前状态但没有网络变化通知，`powerMonitor` 只管电源和锁屏，所以这一路走渲染侧上报。
	*/
	NETWORK_ONLINE: "hostPower:networkOnline"
};
//#endregion
//#region ../../packages/workbuddy-server/src/shared/transient-disconnect.ts
/**
* 瞬时断连错误的统一判定。
*
* 断连错误跨三层出现（renderer adapter / SessionManager / ACP backend），
* 且消息文案来自 daemon client、ACP transport 的诊断字符串——判定正则必须
* 共用一份，否则任一处文案调整都会让某一层的容忍静默失效。
*/
function isRecord$2(value) {
	return typeof value === "object" && value !== null;
}
/**
* 提取任意错误形态的 message：Error 实例、plain object envelope
* （preload/contextBridge 会把 RpcError 转成 `{ message }` 或 `{ error: { message } }`）。
*/
function getUnknownErrorMessage(error) {
	if (error instanceof Error) return error.message;
	if (isRecord$2(error)) {
		const directMessage = error.message;
		if (typeof directMessage === "string") return directMessage;
		const nestedError = error.error;
		if (isRecord$2(nestedError) && typeof nestedError.message === "string") return nestedError.message;
	}
	return String(error ?? "");
}
/**
* renderer 侧 daemon runtime 等待重连失败时的拒绝文案（producer 从这里引用，
* 保证文案与判定不会各改各的）。
*/
var WORKBUDDY_DAEMON_CLIENT_DISCONNECTED_MESSAGE = "WorkBuddy daemon client disconnected";
function isTransientDisconnectMessage(message) {
	return message === "disconnected" || message === "WorkBuddy daemon client disconnected" || /: not connected \(state=(?:connecting|reconnecting|disconnected)\)$/i.test(message) || /: connection lost \(/i.test(message) || /^ACP transport is not connected$/i.test(message);
}
function isTransientDisconnectError(error) {
	return isTransientDisconnectMessage(getUnknownErrorMessage(error));
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-im/client.ts
/**
* Agent IM channel map — only retains binding CRUD and WeChat Bot entries.
*
* QQ methods (qqStartBind, qqGetBindStatus, qqCancelBind, qqManualBind, qqUnbind)
* are served exclusively via `registerDomainService('agentIm')` + domain facade
* fallback path (`$invoke('agentIm:qqXxx')`). Removing them from the flat map
* avoids maintaining two parallel RPC contracts.
*
* QQ push event channels (QQ_QR_UPDATE, QQ_QR_EXPIRED, QQ_BIND_SUCCESS, QQ_BIND_FAILED)
* remain in AGENT_IM_RPC_CHANNELS as event constants — they are consumed by the
* renderer subscription layer, not invoke targets.
*/
var AGENT_IM_CHANNEL_MAP = {
	agentImListBindings: invoke$1(AGENT_IM_RPC_CHANNELS.LIST_BINDINGS),
	agentImGetBinding: invoke$1(AGENT_IM_RPC_CHANNELS.GET_BINDING),
	agentImWechatBotPrebindCheck: invoke$1(AGENT_IM_RPC_CHANNELS.WECHATBOT_PREBIND_CHECK),
	agentImWechatBotStartBind: invoke$1(AGENT_IM_RPC_CHANNELS.WECHATBOT_START_BIND),
	agentImWechatBotGetBindStatus: invoke$1(AGENT_IM_RPC_CHANNELS.WECHATBOT_GET_BIND_STATUS),
	agentImWechatBotUnbind: invoke$1(AGENT_IM_RPC_CHANNELS.WECHATBOT_UNBIND)
};
//#endregion
//#region ../../packages/workbuddy-server/src/asr/client.ts
var ASR_CHANNEL_MAP = {
	speechToText: invoke$1(ASR_RPC_CHANNELS.SPEECH_TO_TEXT),
	speechToTextStream: invoke$1(ASR_RPC_CHANNELS.SPEECH_TO_TEXT_STREAM),
	onSpeechToTextStreamResult: listener(ASR_RPC_CHANNELS.SPEECH_TO_TEXT_STREAM_RESULT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/auth/client.ts
/** Checkin RPC timeout (ms). Backend may respond slowly during peak hours. */
var CHECKIN_RPC_TIMEOUT_MS = 15e3;
var AUTH_CHANNEL_MAP = {
	login: invoke$1(AUTH_RPC_CHANNELS.LOGIN),
	logout: invoke$1(AUTH_RPC_CHANNELS.LOGOUT),
	getAccount: invoke$1(AUTH_RPC_CHANNELS.GET_ACCOUNT),
	getToken: invoke$1(AUTH_RPC_CHANNELS.GET_TOKEN),
	getUserInfo: invoke$1(AUTH_RPC_CHANNELS.GET_USER_INFO),
	authRefreshToken: invoke$1(AUTH_RPC_CHANNELS.REFRESH_TOKEN),
	authRefreshSession: invoke$1(AUTH_RPC_CHANNELS.REFRESH_SESSION),
	authGetAccountUsage: invoke$1(AUTH_RPC_CHANNELS.GET_ACCOUNT_USAGE),
	authUpdateAccountNickname: invoke$1(AUTH_RPC_CHANNELS.UPDATE_ACCOUNT_NICKNAME),
	authGetOauthUser: invoke$1(AUTH_RPC_CHANNELS.GET_OAUTH_USER),
	authSaveOauthToken: invoke$1(AUTH_RPC_CHANNELS.SAVE_OAUTH_TOKEN),
	authRevokeAll: invoke$1(AUTH_RPC_CHANNELS.REVOKE_ALL),
	authGetRepoList: invoke$1(AUTH_RPC_CHANNELS.GET_REPO_LIST),
	authGetFile: invoke$1(AUTH_RPC_CHANNELS.GET_FILE),
	authGetBranches: invoke$1(AUTH_RPC_CHANNELS.GET_BRANCHES),
	authGetRepositories: invoke$1(AUTH_RPC_CHANNELS.GET_REPOSITORIES),
	authGetEnterpriseUsage: invoke$1(AUTH_RPC_CHANNELS.GET_ENTERPRISE_USAGE),
	authGetCheckinStatus: invoke$1(AUTH_RPC_CHANNELS.GET_CHECKIN_STATUS, CHECKIN_RPC_TIMEOUT_MS),
	authClaimDailyCheckin: invoke$1(AUTH_RPC_CHANNELS.CLAIM_DAILY_CHECKIN, CHECKIN_RPC_TIMEOUT_MS),
	authGetActivityBanner: invoke$1(AUTH_RPC_CHANNELS.GET_ACTIVITY_BANNER),
	authGetAmbassadorStatus: invoke$1(AUTH_RPC_CHANNELS.GET_AMBASSADOR_STATUS),
	authSavePendingInput: invoke$1(AUTH_RPC_CHANNELS.SAVE_PENDING_INPUT),
	authLoadPendingInput: invoke$1(AUTH_RPC_CHANNELS.LOAD_PENDING_INPUT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/automation/client.ts
var AUTOMATION_CHANNEL_MAP = {
	automationGetSnapshot: invoke$1(AUTOMATION_RPC_CHANNELS.GET_SNAPSHOT),
	automationUpdate: invoke$1(AUTOMATION_RPC_CHANNELS.UPDATE),
	automationDelete: invoke$1(AUTOMATION_RPC_CHANNELS.DELETE),
	automationTest: invoke$1(AUTOMATION_RPC_CHANNELS.TEST),
	automationArchiveInboxItem: invoke$1(AUTOMATION_RPC_CHANNELS.ARCHIVE_INBOX_ITEM),
	automationDeleteInboxItem: invoke$1(AUTOMATION_RPC_CHANNELS.DELETE_INBOX_ITEM),
	onAutomationSnapshotUpdate: listener(AUTOMATION_RPC_CHANNELS.SNAPSHOT_UPDATE)
};
//#endregion
//#region ../../packages/workbuddy-server/src/claw/client.ts
var CLAW_CHANNEL_MAP = {
	clawGetIsIOAMachine: invoke$1(CLAW_RPC_CHANNELS.GET_IS_IOA_MACHINE),
	clawGetIOAImOverride: invoke$1(CLAW_RPC_CHANNELS.GET_IOA_IM_OVERRIDE),
	clawGetChannelStatus: invoke$1(CLAW_RPC_CHANNELS.GET_CHANNEL_STATUS),
	clawGetSavedChannelConfigs: invoke$1(CLAW_RPC_CHANNELS.GET_SAVED_CHANNEL_CONFIGS),
	clawGetSavedChannels: invoke$1(CLAW_RPC_CHANNELS.GET_SAVED_CHANNELS),
	clawRegisterChannel: invoke$1(CLAW_RPC_CHANNELS.REGISTER_CHANNEL),
	clawUnregisterChannel: invoke$1(CLAW_RPC_CHANNELS.UNREGISTER_CHANNEL),
	clawGetWecomEnabled: invoke$1(CLAW_RPC_CHANNELS.GET_WECOM_ENABLED),
	clawSetWecomEnabled: invoke$1(CLAW_RPC_CHANNELS.SET_WECOM_ENABLED),
	clawGetWechatmpEnabled: invoke$1(CLAW_RPC_CHANNELS.GET_WECHATMP_ENABLED),
	clawSetWechatmpEnabled: invoke$1(CLAW_RPC_CHANNELS.SET_WECHATMP_ENABLED),
	clawGetWechatmpArtifactUploadEnabled: invoke$1(CLAW_RPC_CHANNELS.GET_WECHATMP_ARTIFACT_UPLOAD_ENABLED),
	clawSetWechatmpArtifactUploadEnabled: invoke$1(CLAW_RPC_CHANNELS.SET_WECHATMP_ARTIFACT_UPLOAD_ENABLED),
	clawWechatkfGetLink: invoke$1(CLAW_RPC_CHANNELS.WECHATKF_GET_LINK),
	clawWechatkfGetBindStatus: invoke$1(CLAW_RPC_CHANNELS.WECHATKF_GET_BIND_STATUS),
	clawWechatkfUnbind: invoke$1(CLAW_RPC_CHANNELS.WECHATKF_UNBIND),
	clawWeixinQrStart: invoke$1(CLAW_RPC_CHANNELS.WEIXIN_QR_START),
	clawWeixinQrWait: invoke$1(CLAW_RPC_CHANNELS.WEIXIN_QR_WAIT),
	clawWechatmpDeviceAuthCode: invoke$1(CLAW_RPC_CHANNELS.WECHATMP_DEVICE_AUTH_CODE),
	clawYuanbaoScanBindCode: invoke$1(CLAW_RPC_CHANNELS.YUANBAO_SCAN_BIND_CODE),
	clawYuanbaoCheckScanBindStatus: invoke$1(CLAW_RPC_CHANNELS.YUANBAO_CHECK_SCAN_BIND_STATUS),
	clawGetAutomationWecomWebhookUrl: invoke$1(CLAW_RPC_CHANNELS.GET_AUTOMATION_WECOM_WEBHOOK_URL),
	clawSetAutomationWecomWebhookUrl: invoke$1(CLAW_RPC_CHANNELS.SET_AUTOMATION_WECOM_WEBHOOK_URL),
	clawTestAutomationWecomWebhook: invoke$1(CLAW_RPC_CHANNELS.TEST_AUTOMATION_WECOM_WEBHOOK),
	clawGetAutomationWecomPushConfig: invoke$1(CLAW_RPC_CHANNELS.GET_AUTOMATION_WECOM_PUSH_CONFIG),
	clawSetAutomationWecomPushConfig: invoke$1(CLAW_RPC_CHANNELS.SET_AUTOMATION_WECOM_PUSH_CONFIG),
	clawGetLatestSession: invoke$1(CLAW_RPC_CHANNELS.GET_LATEST_SESSION),
	clawNotifySessionActive: invoke$1(CLAW_RPC_CHANNELS.NOTIFY_SESSION_ACTIVE),
	onClawChannelStatusChange: listener(CLAW_RPC_CHANNELS.CHANNEL_STATUS_CHANGE),
	onClawChannelConfigSaved: listener(CLAW_RPC_CHANNELS.CHANNEL_CONFIG_SAVED),
	onClawWechatkfBindSuccess: listener(CLAW_RPC_CHANNELS.WECHATKF_BIND_SUCCESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/cloud-agent/client.ts
var CLOUD_AGENT_CHANNEL_MAP = {
	cloudAgentInitOrchestrator: invoke$1(CLOUD_AGENT_RPC_CHANNELS.INIT_ORCHESTRATOR),
	cloudAgentCreateAgent: invoke$1(CLOUD_AGENT_RPC_CHANNELS.CREATE_AGENT),
	cloudAgentGetAgent: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_AGENT),
	cloudAgentValidateField: invoke$1(CLOUD_AGENT_RPC_CHANNELS.VALIDATE_FIELD),
	cloudAgentGetQuota: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_QUOTA),
	cloudAgentDeleteAgent: invoke$1(CLOUD_AGENT_RPC_CHANNELS.DELETE_AGENT),
	cloudAgentPinAgent: invoke$1(CLOUD_AGENT_RPC_CHANNELS.PIN_AGENT),
	cloudAgentUnpinAgent: invoke$1(CLOUD_AGENT_RPC_CHANNELS.UNPIN_AGENT),
	cloudAgentCloneAgent: invoke$1(CLOUD_AGENT_RPC_CHANNELS.CLONE_AGENT),
	cloudAgentPublishVersion: invoke$1(CLOUD_AGENT_RPC_CHANNELS.PUBLISH_VERSION),
	cloudAgentListGrantedAgents: invoke$1(CLOUD_AGENT_RPC_CHANNELS.LIST_GRANTED_AGENTS),
	cloudAgentListEnterprisePublishedAgents: invoke$1(CLOUD_AGENT_RPC_CHANNELS.LIST_ENTERPRISE_PUBLISHED_AGENTS),
	cloudAgentGetEnterpriseAgentMarket: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_ENTERPRISE_AGENT_MARKET),
	cloudAgentCreateInstance: invoke$1(CLOUD_AGENT_RPC_CHANNELS.CREATE_INSTANCE),
	cloudAgentGetInstance: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_INSTANCE),
	cloudAgentRebuildInstance: invoke$1(CLOUD_AGENT_RPC_CHANNELS.REBUILD_INSTANCE),
	cloudAgentListInstances: invoke$1(CLOUD_AGENT_RPC_CHANNELS.LIST_INSTANCES),
	cloudAgentDeleteInstance: invoke$1(CLOUD_AGENT_RPC_CHANNELS.DELETE_INSTANCE),
	cloudAgentCreateConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.CREATE_CONVERSATION),
	cloudAgentGetConversationDetail: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_CONVERSATION_DETAIL),
	cloudAgentListConversations: invoke$1(CLOUD_AGENT_RPC_CHANNELS.LIST_CONVERSATIONS),
	cloudAgentListUserConversations: invoke$1(CLOUD_AGENT_RPC_CHANNELS.LIST_USER_CONVERSATIONS),
	cloudAgentDeleteConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.DELETE_CONVERSATION),
	cloudAgentUnarchiveConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.UNARCHIVE_CONVERSATION),
	cloudAgentArchiveConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.ARCHIVE_CONVERSATION),
	cloudAgentUpdateConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.UPDATE_CONVERSATION),
	cloudAgentGetSandboxSession: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_SANDBOX_SESSION),
	cloudAgentCreateConversationSession: invoke$1(CLOUD_AGENT_RPC_CHANNELS.CREATE_CONVERSATION_SESSION),
	cloudAgentDeleteConversationSession: invoke$1(CLOUD_AGENT_RPC_CHANNELS.DELETE_CONVERSATION_SESSION),
	cloudAgentGetConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.GET_CONVERSATION),
	cloudAgentUploadAvatar: invoke$1(CLOUD_AGENT_RPC_CHANNELS.UPLOAD_AVATAR),
	cloudAgentCreateEnterpriseConversation: invoke$1(CLOUD_AGENT_RPC_CHANNELS.CREATE_ENTERPRISE_CONVERSATION)
};
//#endregion
//#region ../../packages/workbuddy-server/src/cloud-assistant/contract.ts
var CLOUD_ASSISTANT_RPC_CHANNELS = {
	GET_ENTITLEMENT: "cloudAssistant:getEntitlement",
	INITIALIZE_ORCHESTRATOR: "cloudAssistant:initializeOrchestrator"
};
//#endregion
//#region ../../packages/workbuddy-server/src/cloud-assistant/client.ts
var CLOUD_ASSISTANT_CHANNEL_MAP = {
	cloudAssistantGetEntitlement: invoke$1(CLOUD_ASSISTANT_RPC_CHANNELS.GET_ENTITLEMENT),
	cloudAssistantInitializeOrchestrator: invoke$1(CLOUD_ASSISTANT_RPC_CHANNELS.INITIALIZE_ORCHESTRATOR)
};
//#endregion
//#region ../../packages/workbuddy-server/src/compat/client.ts
var COMPATIBILITY_CHANNEL_MAP = {
	ipcEmit: invoke$1(IPC_RPC_CHANNELS.EMIT),
	perfAppendLine: invoke$1(PERF_RPC_CHANNELS.APPEND_LINE),
	perfFlush: invoke$1(PERF_RPC_CHANNELS.FLUSH),
	perfGetLogFilePath: invoke$1(PERF_RPC_CHANNELS.GET_LOG_FILE_PATH),
	listSidecarSessions: invoke$1(SIDECAR_RPC_CHANNELS.LIST),
	resizeSidecar: invoke$1(SIDECAR_RPC_CHANNELS.RESIZE),
	listBackends: invoke$1(BACKEND_RPC_CHANNELS.LIST),
	telemetryReport: invoke$1(TELEMETRY_RPC_CHANNELS.REPORT),
	telemetryReportSync: invoke$1(TELEMETRY_RPC_CHANNELS.REPORT_SYNC),
	appLifecycleLog: invoke$1(TELEMETRY_RPC_CHANNELS.LIFECYCLE_LOG),
	telemetrySetBuddyContext: invoke$1(TELEMETRY_RPC_CHANNELS.SET_BUDDY_CONTEXT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/config/client.ts
var CONFIG_CHANNEL_MAP = {
	configGet: invoke$1(CONFIG_RPC_CHANNELS.GET),
	configSet: invoke$1(CONFIG_RPC_CHANNELS.SET),
	onConfigChanged: listener(CONFIG_RPC_CHANNELS.CHANGED),
	configGetAll: invoke$1(CONFIG_RPC_CHANNELS.GET_ALL),
	getProductScenes: invoke$1(CONFIG_RPC_CHANNELS.GET_PRODUCT_SCENES, 3e4),
	getProductConfiguration: invoke$1(CONFIG_RPC_CHANNELS.GET_PRODUCT_CONFIGURATION, 3e4),
	onProductConfigurationChanged: listener(CONFIG_RPC_CHANNELS.PRODUCT_CONFIGURATION_CHANGED),
	getClientMenus: invoke$1(CONFIG_RPC_CHANNELS.GET_CLIENT_MENUS),
	configGetLocalCustomModels: invoke$1(CONFIG_RPC_CHANNELS.GET_LOCAL_CUSTOM_MODELS),
	configSaveLocalCustomModel: invoke$1(CONFIG_RPC_CHANNELS.SAVE_LOCAL_CUSTOM_MODEL),
	configDeleteLocalCustomModel: invoke$1(CONFIG_RPC_CHANNELS.DELETE_LOCAL_CUSTOM_MODEL),
	configTestLocalCustomModel: invoke$1(CONFIG_RPC_CHANNELS.TEST_LOCAL_CUSTOM_MODEL, 35e3)
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/client.ts
var CONNECTOR_CHANNEL_MAP = {
	connectorGetConnectors: invoke$1("connector:getConnectors"),
	connectorListRegistry: invoke$1("connector:listRegistry"),
	connectorListProjectConnectors: invoke$1("connector:listProjectConnectors"),
	connectorAddProjectConnector: invoke$1("connector:addProjectConnector"),
	connectorUpdateProjectConnectors: invoke$1("connector:updateProjectConnectors"),
	connectorRemoveProjectConnector: invoke$1("connector:removeProjectConnector"),
	connectorListTaskConnectors: invoke$1("connector:listTaskConnectors"),
	connectorSetTaskConnectorActiveStatus: invoke$1("connector:setTaskConnectorActiveStatus"),
	connectorAuthStart: invoke$1("connector:authStart"),
	connectorAuthConnect: invoke$1("connector:authConnect"),
	connectorAuthStatus: invoke$1("connector:authStatus"),
	connectorAuthRevoke: invoke$1("connector:authRevoke"),
	connectorAuthAccessToken: invoke$1("connector:authAccessToken"),
	connectorAuthTempLoginUrl: invoke$1("connector:authTempLoginUrl"),
	connectorGetRepoList: invoke$1("connector:getRepoList"),
	connectorGetOauthUser: invoke$1("connector:getOauthUser"),
	connectorInit: invoke$1(CONNECTOR_RPC_CHANNELS.INIT),
	connectorGetConfigs: invoke$1(CONNECTOR_RPC_CHANNELS.GET_CONFIGS),
	connectorGetStates: invoke$1(CONNECTOR_RPC_CHANNELS.GET_STATES),
	connectorSetIndustryBuddyScope: invoke$1(CONNECTOR_RPC_CHANNELS.SET_INDUSTRY_BUDDY_SCOPE),
	connectorConnect: invoke$1(CONNECTOR_RPC_CHANNELS.CONNECT, 36e4),
	connectorRepairConnect: invoke$1(CONNECTOR_RPC_CHANNELS.REPAIR_CONNECT, 36e4),
	connectorDisconnect: invoke$1(CONNECTOR_RPC_CHANNELS.DISCONNECT),
	/** 取消进行中的连接，主进程立即响应（中断 spawn / 清 OAuth 状态），无需长超时。 */
	connectorCancelConnect: invoke$1(CONNECTOR_RPC_CHANNELS.CANCEL_CONNECT),
	connectorUpdateHeaders: invoke$1(CONNECTOR_RPC_CHANNELS.UPDATE_HEADERS),
	connectorUpdateEnv: invoke$1(CONNECTOR_RPC_CHANNELS.UPDATE_ENV),
	connectorUnbind: invoke$1(CONNECTOR_RPC_CHANNELS.UNBIND),
	connectorGetUserConnector: invoke$1(CONNECTOR_RPC_CHANNELS.GET_USER_CONNECTOR),
	connectorModifyConnectStatus: invoke$1(CONNECTOR_RPC_CHANNELS.MODIFY_CONNECT_STATUS),
	connectorModifyRepo: invoke$1(CONNECTOR_RPC_CHANNELS.MODIFY_REPO),
	connectorModifyActiveStatus: invoke$1(CONNECTOR_RPC_CHANNELS.MODIFY_ACTIVE_STATUS),
	connectorDeleteUserConnector: invoke$1(CONNECTOR_RPC_CHANNELS.DELETE_USER_CONNECTOR),
	connectorSaveOauthToken: invoke$1(CONNECTOR_RPC_CHANNELS.SAVE_OAUTH_TOKEN),
	connectorRevokeAll: invoke$1(CONNECTOR_RPC_CHANNELS.REVOKE_ALL),
	connectorGetFile: invoke$1(CONNECTOR_RPC_CHANNELS.GET_FILE),
	connectorAddTask: invoke$1(CONNECTOR_RPC_CHANNELS.ADD_TASK),
	connectorGetTaskConnector: invoke$1(CONNECTOR_RPC_CHANNELS.GET_TASK_CONNECTOR),
	connectorModifyTaskActiveStatus: invoke$1(CONNECTOR_RPC_CHANNELS.MODIFY_TASK_ACTIVE_STATUS),
	connectorModifyTaskRepo: invoke$1(CONNECTOR_RPC_CHANNELS.MODIFY_TASK_REPO),
	connectorOauthStart: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_START),
	connectorOauthStatus: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_STATUS),
	connectorOauthAccessToken: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_ACCESS_TOKEN),
	connectorOauthRevoke: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_REVOKE),
	connectorOauthConnect: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_CONNECT),
	connectorOauthRepos: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_REPOS),
	connectorOauthTempLoginUrl: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_TEMP_LOGIN_URL),
	connectorEnterpriseTempLoginUrl: invoke$1(CONNECTOR_RPC_CHANNELS.OAUTH_ENTERPRISE_TEMP_LOGIN_URL),
	connectorRegistry2cList: invoke$1(CONNECTOR_RPC_CHANNELS.REGISTRY_2C_LIST),
	connectorResolvePoiConsent: invoke$1(CONNECTOR_RPC_CHANNELS.RESOLVE_POI_CONSENT),
	connectorRegistry2cSync: invoke$1(CONNECTOR_RPC_CHANNELS.REGISTRY_2C_SYNC)
};
//#endregion
//#region ../../packages/workbuddy-server/src/credit-prediction/client.ts
var CREDIT_PREDICTION_CHANNEL_MAP = {
	creditPredictionPredict: invoke$1(CREDIT_PREDICTION_RPC_CHANNELS.PREDICT),
	creditPredictionCancel: invoke$1(CREDIT_PREDICTION_RPC_CHANNELS.CANCEL)
};
//#endregion
//#region ../../packages/workbuddy-server/src/data-retention/contract.ts
var DATA_RETENTION_RPC_CHANNELS = {
	GET_STORAGE_USAGE: "dataRetention:getStorageUsage",
	GET_DISK_INFO: "dataRetention:getDiskInfo",
	GET_POLICY: "dataRetention:getPolicy",
	SET_POLICY: "dataRetention:setPolicy",
	GET_LAST_CLEANUP_RESULT: "dataRetention:getLastCleanupResult"
};
var DATA_RETENTION_CHANNEL_MAP = {
	dataRetentionGetStorageUsage: invoke$1(DATA_RETENTION_RPC_CHANNELS.GET_STORAGE_USAGE),
	dataRetentionGetDiskInfo: invoke$1(DATA_RETENTION_RPC_CHANNELS.GET_DISK_INFO),
	dataRetentionGetPolicy: invoke$1(DATA_RETENTION_RPC_CHANNELS.GET_POLICY),
	dataRetentionSetPolicy: invoke$1(DATA_RETENTION_RPC_CHANNELS.SET_POLICY),
	dataRetentionGetLastCleanupResult: invoke$1(DATA_RETENTION_RPC_CHANNELS.GET_LAST_CLEANUP_RESULT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/enterprise-policy/contract.ts
var ENTERPRISE_POLICY_RPC_CHANNELS = {
	GET_SKILL_UPLOAD_POLICY: "enterprisePolicy:getSkillUploadPolicy",
	REFRESH_SKILL_UPLOAD_POLICY: "enterprisePolicy:refreshSkillUploadPolicy",
	GET_MEMBER_CUSTOM_MODEL_POLICY: "enterprisePolicy:getMemberCustomModelPolicy",
	REFRESH_MEMBER_CUSTOM_MODEL_POLICY: "enterprisePolicy:refreshMemberCustomModelPolicy",
	GET_CUSTOM_CONNECTOR_POLICY: "enterprisePolicy:getCustomConnectorPolicy",
	REFRESH_CUSTOM_CONNECTOR_POLICY: "enterprisePolicy:refreshCustomConnectorPolicy"
};
//#endregion
//#region ../../packages/workbuddy-server/src/enterprise-policy/client.ts
var ENTERPRISE_POLICY_CHANNEL_MAP = {
	enterprisePolicyGetSkillUploadPolicy: invoke$1(ENTERPRISE_POLICY_RPC_CHANNELS.GET_SKILL_UPLOAD_POLICY),
	enterprisePolicyRefreshSkillUploadPolicy: invoke$1(ENTERPRISE_POLICY_RPC_CHANNELS.REFRESH_SKILL_UPLOAD_POLICY),
	enterprisePolicyGetMemberCustomModelPolicy: invoke$1(ENTERPRISE_POLICY_RPC_CHANNELS.GET_MEMBER_CUSTOM_MODEL_POLICY),
	enterprisePolicyRefreshMemberCustomModelPolicy: invoke$1(ENTERPRISE_POLICY_RPC_CHANNELS.REFRESH_MEMBER_CUSTOM_MODEL_POLICY),
	enterprisePolicyGetCustomConnectorPolicy: invoke$1(ENTERPRISE_POLICY_RPC_CHANNELS.GET_CUSTOM_CONNECTOR_POLICY),
	enterprisePolicyRefreshCustomConnectorPolicy: invoke$1(ENTERPRISE_POLICY_RPC_CHANNELS.REFRESH_CUSTOM_CONNECTOR_POLICY)
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/client.ts
var EXPERT_CHANNEL_MAP = {
	expertInit: invoke$1(EXPERT_RPC_CHANNELS.INIT),
	expertGetCategories: invoke$1(EXPERT_RPC_CHANNELS.GET_CATEGORIES),
	expertGetExperts: invoke$1(EXPERT_RPC_CHANNELS.GET_EXPERTS),
	expertGetFeaturedScenes: invoke$1(EXPERT_RPC_CHANNELS.GET_FEATURED_SCENES),
	expertGetExpert: invoke$1(EXPERT_RPC_CHANNELS.GET_EXPERT),
	expertGetUseRequirements: invoke$1(EXPERT_RPC_CHANNELS.GET_USE_REQUIREMENTS),
	expertGetAgentTemplates: invoke$1(EXPERT_RPC_CHANNELS.GET_AGENT_TEMPLATES),
	expertRefresh: invoke$1(EXPERT_RPC_CHANNELS.REFRESH),
	expertSummonExpert: invoke$1("expert:summonExpert"),
	expertHistoryGetRecent: invoke$1(EXPERT_HISTORY_RPC_CHANNELS.GET_RECENT),
	expertHistoryAdd: invoke$1(EXPERT_HISTORY_RPC_CHANNELS.ADD),
	expertHistoryRemove: invoke$1(EXPERT_HISTORY_RPC_CHANNELS.REMOVE),
	expertHistoryClear: invoke$1(EXPERT_HISTORY_RPC_CHANNELS.CLEAR),
	expertActivatePlugin: invoke$1(EXPERT_RPC_CHANNELS.ACTIVATE_PLUGIN),
	expertDeactivatePlugin: invoke$1(EXPERT_RPC_CHANNELS.DEACTIVATE_PLUGIN),
	expertGetActivePlugins: invoke$1(EXPERT_RPC_CHANNELS.GET_ACTIVE_PLUGINS),
	expertSwitchPluginForSession: invoke$1(EXPERT_RPC_CHANNELS.SWITCH_PLUGIN_FOR_SESSION),
	expertExportZip: invoke$1(EXPERT_RPC_CHANNELS.EXPORT_ZIP),
	expertPreCheckShare: invoke$1(EXPERT_RPC_CHANNELS.PRE_CHECK_SHARE),
	expertQueryShareSecurityScan: invoke$1(EXPERT_RPC_CHANNELS.QUERY_SHARE_SECURITY_SCAN),
	expertImportFromUrl: invoke$1(EXPERT_RPC_CHANNELS.IMPORT_FROM_URL),
	expertInstallFromPath: invoke$1(EXPERT_RPC_CHANNELS.INSTALL_FROM_PATH),
	expertPreviewFromUrl: invoke$1(EXPERT_RPC_CHANNELS.PREVIEW_FROM_URL),
	expertScanCustomExperts: invoke$1(EXPERT_RPC_CHANNELS.SCAN_CUSTOM_EXPERTS),
	expertGetCustomExpert: invoke$1(EXPERT_RPC_CHANNELS.GET_CUSTOM_EXPERT),
	expertDeleteCustomExpert: invoke$1(EXPERT_RPC_CHANNELS.DELETE_CUSTOM_EXPERT),
	expertAddUserExperts: invoke$1(EXPERT_RPC_CHANNELS.ADD_USER_EXPERTS),
	expertClearCustomExpertSessionMarker: invoke$1(EXPERT_RPC_CHANNELS.CLEAR_CUSTOM_EXPERT_SESSION_MARKER),
	expertCloudSyncList: invoke$1(EXPERT_RPC_CHANNELS.CLOUD_SYNC_LIST),
	expertCloudSyncCheckUploadQuota: invoke$1(EXPERT_RPC_CHANNELS.CLOUD_SYNC_CHECK_UPLOAD_QUOTA),
	expertCloudSyncUpload: invoke$1(EXPERT_RPC_CHANNELS.CLOUD_SYNC_UPLOAD),
	expertCloudSyncUploadMany: invoke$1(EXPERT_RPC_CHANNELS.CLOUD_SYNC_UPLOAD_MANY),
	expertCloudSyncDownload: invoke$1(EXPERT_RPC_CHANNELS.CLOUD_SYNC_DOWNLOAD),
	expertCloudSyncDeleteCloud: invoke$1(EXPERT_RPC_CHANNELS.CLOUD_SYNC_DELETE_CLOUD)
};
//#endregion
//#region ../../packages/workbuddy-server/src/feedback/client.ts
var FEEDBACK_CHANNEL_MAP = { feedbackSubmit: invoke$1(FEEDBACK_RPC_CHANNELS.SUBMIT) };
//#endregion
//#region ../../packages/workbuddy-server/src/file-system/client.ts
init_shared();
var FILE_SYSTEM_CHANNEL_MAP = {
	fileRead: invoke$1(FILE_RPC_CHANNELS.READ, 3e5),
	fileWrite: invoke$1(FILE_RPC_CHANNELS.WRITE),
	fileWriteBatch: invoke$1(FILE_RPC_CHANNELS.WRITE_BATCH),
	fileListDir: invoke$1(FILE_RPC_CHANNELS.LIST_DIR),
	fileExists: invoke$1(FILE_RPC_CHANNELS.EXISTS),
	fileMakeDir: invoke$1(FILE_RPC_CHANNELS.MAKE_DIR),
	fileRemove: invoke$1(FILE_RPC_CHANNELS.REMOVE),
	fileRename: invoke$1(FILE_RPC_CHANNELS.RENAME),
	fileGetInfo: invoke$1(FILE_RPC_CHANNELS.GET_INFO),
	fileSearch: invoke$1(FILE_RPC_CHANNELS.SEARCH),
	fileUpload: invoke$1(FILE_RPC_CHANNELS.UPLOAD),
	fileReadChunked: invoke$1(FILE_RPC_CHANNELS.READ_CHUNKED, 6e4),
	ioAppendRecord: invoke$1(IO_RPC_CHANNELS.APPEND_RECORD),
	workspaceInitialize: invoke$1(WORKSPACE_RPC_CHANNELS.INITIALIZE),
	workspaceGetCurrent: invoke$1(WORKSPACE_RPC_CHANNELS.GET_CURRENT),
	workspaceGenerateDefaultCwd: invoke$1(WORKSPACE_RPC_CHANNELS.GENERATE_DEFAULT_CWD),
	workspaceGetClawCwd: invoke$1(WORKSPACE_RPC_CHANNELS.GET_CLAW_CWD),
	workspaceOpen: invoke$1(WORKSPACE_RPC_CHANNELS.OPEN),
	workspaceOpenFolder: invoke$1(WORKSPACE_RPC_CHANNELS.OPEN_FOLDER),
	workspaceSearchFile: invoke$1(WORKSPACE_RPC_CHANNELS.SEARCH_FILE),
	workspaceCheckPathExists: invoke$1(WORKSPACE_RPC_CHANNELS.CHECK_PATH_EXISTS),
	workspaceCheckPathsExist: invoke$1(WORKSPACE_RPC_CHANNELS.CHECK_PATHS_EXIST),
	workspaceCheckAccess: invoke$1(WORKSPACE_RPC_CHANNELS.CHECK_ACCESS),
	storageGetSessions: invoke$1(STORAGE_RPC_CHANNELS.GET_SESSIONS),
	storageUpsertSession: invoke$1(STORAGE_RPC_CHANNELS.UPSERT_SESSION),
	storageDeleteSession: invoke$1(STORAGE_RPC_CHANNELS.DELETE_SESSION),
	storageGetWorkspaces: invoke$1(STORAGE_RPC_CHANNELS.GET_WORKSPACES),
	storageUpdateSessionPermissionMode: invoke$1(STORAGE_RPC_CHANNELS.UPDATE_SESSION_PERMISSION_MODE),
	storageGetRecoveryNotice: invoke$1(STORAGE_RPC_CHANNELS.GET_RECOVERY_NOTICE),
	reportRuntimeEvent: invoke$1(SESSION_RPC_CHANNELS.REPORT_RUNTIME_EVENT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/growth/client.ts
var GROWTH_CHANNEL_MAP = { growthGetBuddy: invoke$1(GROWTH_RPC_CHANNELS.GET_BUDDY) };
//#endregion
//#region ../../packages/workbuddy-server/src/idle-capability/client.ts
var IDLE_CAPABILITY_CHANNEL_MAP = {
	idleCapabilityRecordUsage: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.RECORD_USAGE),
	idleCapabilityRecordActiveDay: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.RECORD_ACTIVE_DAY),
	idleCapabilityGetIdleCardData: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.GET_IDLE_CARD_DATA),
	idleCapabilityMarkShown: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.MARK_SHOWN),
	idleCapabilityDismiss: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.DISMISS),
	idleCapabilityDismissGlobal: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.DISMISS_GLOBAL),
	idleCapabilityForgetCapability: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.FORGET_CAPABILITY),
	idleCapabilityListCandidates: invoke$1(IDLE_CAPABILITY_RPC_CHANNELS.LIST_CANDIDATES)
};
//#endregion
//#region ../../packages/workbuddy-server/src/ima/client.ts
/**
* ima 集成 channel map
*
* 方法命名约定（与其他 domain 一致）：`ima{Domain}{Action}`
*/
var IMA_CHANNEL_MAP = {
	imaAuthStart: invoke$1(IMA_RPC_CHANNELS.AUTH_START),
	imaAuthStatus: invoke$1(IMA_RPC_CHANNELS.AUTH_STATUS),
	imaAuthRefresh: invoke$1(IMA_RPC_CHANNELS.AUTH_REFRESH),
	imaAuthLogout: invoke$1(IMA_RPC_CHANNELS.AUTH_LOGOUT),
	imaKbList: invoke$1(IMA_RPC_CHANNELS.KB_LIST),
	imaKbSearch: invoke$1(IMA_RPC_CHANNELS.KB_SEARCH),
	imaKbInfoByShareLink: invoke$1(IMA_RPC_CHANNELS.KB_INFO_BY_SHARE_LINK),
	imaFilesList: invoke$1(IMA_RPC_CHANNELS.FILES_LIST),
	imaFilesSearch: invoke$1(IMA_RPC_CHANNELS.FILES_SEARCH),
	imaFilesViewUrl: invoke$1(IMA_RPC_CHANNELS.FILES_VIEW_URL),
	imaFilesDownloadUrl: invoke$1(IMA_RPC_CHANNELS.FILES_DOWNLOAD_URL),
	imaFilesContent: invoke$1(IMA_RPC_CHANNELS.FILES_CONTENT),
	imaFilesBlob: invoke$1(IMA_RPC_CHANNELS.FILES_BLOB),
	imaFilesUpload: invoke$1(IMA_RPC_CHANNELS.FILES_UPLOAD),
	imaFilesCancelUpload: invoke$1(IMA_RPC_CHANNELS.FILES_CANCEL_UPLOAD),
	imaFilesUploadByPath: invoke$1(IMA_RPC_CHANNELS.FILES_UPLOAD_BY_PATH),
	imaFilesSdkPreview: invoke$1(IMA_RPC_CHANNELS.FILES_SDK_PREVIEW),
	/** 「保存到 ima 知识库」上传进度事件。payload: ImaUploadProgressEvent */
	imaOnUploadProgress: listener(IMA_RPC_CHANNELS.UPLOAD_PROGRESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/inspiration/client.ts
var INSPIRATION_CHANNEL_MAP = {
	inspirationList: invoke$1(INSPIRATION_RPC_CHANNELS.LIST),
	inspirationDetail: invoke$1(INSPIRATION_RPC_CHANNELS.DETAIL),
	inspirationSettingsGet: invoke$1(INSPIRATION_RPC_CHANNELS.SETTINGS_GET),
	inspirationSettingsSave: invoke$1(INSPIRATION_RPC_CHANNELS.SETTINGS_SAVE),
	inspirationOnboardingCheck: invoke$1(INSPIRATION_RPC_CHANNELS.ONBOARDING_CHECK),
	inspirationOnboardingComplete: invoke$1(INSPIRATION_RPC_CHANNELS.ONBOARDING_COMPLETE),
	inspirationFeedback: invoke$1(INSPIRATION_RPC_CHANNELS.FEEDBACK),
	inspirationMarkRead: invoke$1(INSPIRATION_RPC_CHANNELS.MARK_READ),
	inspirationMarkAllRead: invoke$1(INSPIRATION_RPC_CHANNELS.MARK_ALL_READ),
	inspirationSave: invoke$1(INSPIRATION_RPC_CHANNELS.SAVE),
	inspirationRecordTabView: invoke$1(INSPIRATION_RPC_CHANNELS.RECORD_TAB_VIEW),
	inspirationInjectDemo: invoke$1(INSPIRATION_RPC_CHANNELS.INJECT_DEMO),
	inspirationCurationList: invoke$1(INSPIRATION_CURATION_RPC_CHANNELS.LIST),
	inspirationCurationAdd: invoke$1(INSPIRATION_CURATION_RPC_CHANNELS.ADD),
	inspirationCurationUpdate: invoke$1(INSPIRATION_CURATION_RPC_CHANNELS.UPDATE),
	inspirationCurationDelete: invoke$1(INSPIRATION_CURATION_RPC_CHANNELS.DELETE)
};
//#endregion
//#region ../../packages/workbuddy-server/src/link-preview/client.ts
/**
* link-preview channel map。
*
* 方法命名约定（与其他 domain 一致）：`linkPreview{Action}`；
* WB facade 会剥掉 `linkPreview` 前缀，得到 `wb.linkPreview.resolveTitle`。
*/
var LINK_PREVIEW_CHANNEL_MAP = { linkPreviewResolveTitle: invoke$1({ RESOLVE_TITLE: "linkPreview:resolveTitle" }.RESOLVE_TITLE) };
//#endregion
//#region ../../packages/workbuddy-server/src/mcp/client.ts
var MCP_CHANNEL_MAP = {
	mcpList: invoke$1(MCP_RPC_CHANNELS.LIST),
	mcpSave: invoke$1(MCP_RPC_CHANNELS.SAVE),
	mcpRemove: invoke$1(MCP_RPC_CHANNELS.REMOVE),
	mcpDescribe: invoke$1(MCP_RPC_CHANNELS.DESCRIBE),
	mcpConnect: invoke$1(MCP_RPC_CHANNELS.CONNECT),
	mcpCallTool: invoke$1(MCP_RPC_CHANNELS.CALL_TOOL, 3e4),
	mcpDisconnect: invoke$1(MCP_RPC_CHANNELS.DISCONNECT),
	mcpSetEnabled: invoke$1(MCP_RPC_CHANNELS.SET_ENABLED),
	mcpSetToolEnabled: invoke$1(MCP_RPC_CHANNELS.SET_TOOL_ENABLED),
	mcpApprove: invoke$1(MCP_RPC_CHANNELS.APPROVE),
	mcpBeginAuthorization: invoke$1(MCP_RPC_CHANNELS.BEGIN_AUTHORIZATION),
	mcpHandleExternalOAuthCallback: invoke$1(MCP_RPC_CHANNELS.HANDLE_EXTERNAL_OAUTH_CALLBACK),
	mcpRevokeCredentials: invoke$1(MCP_RPC_CHANNELS.REVOKE_CREDENTIALS),
	mcpRefresh: invoke$1(MCP_RPC_CHANNELS.REFRESH)
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp-apps/static-html-client.ts
/**
* Static HTML preview — local file serving over HTTP.
*
* Provides a daemon RPC to register a local directory with the StaticHtmlHttpServer,
* returning an HTTP URL that can be loaded in iframe (avoiding file:// security restrictions).
*/
var STATIC_HTML_RPC_CHANNELS = {
	/** Register a local directory for HTTP serving, returns { token, port } */
	REGISTER_DIR: "staticHtml:registerDir",
	/**
	* 解析 `.miora` 预览所需的 loopback 地址（viewer 页面 + 资源基址）。
	*
	* 单独一个 RPC 而非让 renderer 连调两次 `registerDir`：viewer 产物的绝对路径
	* 要靠 `resolveBundledAsset` 得到，那是 daemon 侧能力，renderer 拿不到。
	* 由 daemon 一次性完成「定位 viewer + 注册两个目录」，renderer 只关心结果。
	*/
	RESOLVE_MIORA_VIEWER: "staticHtml:resolveMioraViewer"
};
var STATIC_HTML_CHANNEL_MAP = {
	staticHtmlRegisterDir: invoke$1(STATIC_HTML_RPC_CHANNELS.REGISTER_DIR),
	staticHtmlResolveMioraViewer: invoke$1(STATIC_HTML_RPC_CHANNELS.RESOLVE_MIORA_VIEWER)
};
//#endregion
//#region ../../packages/workbuddy-server/src/microphone/client.ts
var MICROPHONE_CHANNEL_MAP = {
	getMicrophonePermission: invoke$1(MICROPHONE_RPC_CHANNELS.GET_PERMISSION),
	requestMicrophonePermission: invoke$1(MICROPHONE_RPC_CHANNELS.REQUEST_PERMISSION),
	openMicrophoneSystemSettings: invoke$1(MICROPHONE_RPC_CHANNELS.OPEN_SYSTEM_SETTINGS),
	onMicrophonePermissionChanged: listener(MICROPHONE_RPC_CHANNELS.PERMISSION_CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/migration/client.ts
var MIGRATION_CHANNEL_MAP = {
	migrationGetHistoryStatus: invoke$1(MIGRATION_RPC_CHANNELS.GET_HISTORY_STATUS),
	onMigrationHistoryStatusUpdate: listener(MIGRATION_RPC_CHANNELS.HISTORY_STATUS_UPDATE),
	onMigrationHistoryProgress: listener(MIGRATION_RPC_CHANNELS.HISTORY_PROGRESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/my-files/client.ts
var MY_FILES_CHANNEL_MAP = {
	myFilesGetTaskArtifacts: invoke$1(MY_FILES_RPC_CHANNELS.GET_TASK_ARTIFACTS),
	getNetDriveAccessToken: invoke$1(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_ACCESS_TOKEN),
	getNetDriveNicknames: invoke$1(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_NICKNAMES),
	getNetDrivePurchaseCode: invoke$1(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_PURCHASE_CODE),
	getNetDriveEnterpriseInfo: invoke$1(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_ENTERPRISE_INFO),
	myFilesUploadToDrive: invoke$1(MY_FILES_RPC_CHANNELS.UPLOAD_TO_DRIVE),
	downloadFileToLocal: invoke$1(MY_FILES_RPC_CHANNELS.DOWNLOAD_FILE_TO_LOCAL),
	cleanupDownloadedTemporaryFile: invoke$1(MY_FILES_RPC_CHANNELS.CLEANUP_DOWNLOADED_TEMPORARY_FILE),
	reportFileEvents: invoke$1(MY_FILES_RPC_CHANNELS.REPORT_FILE_EVENTS),
	myFilesGetFilePaths: invoke$1(MY_FILES_RPC_CHANNELS.GET_FILE_PATHS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/contract.ts
var NATIVE_RUNTIME_RPC_CHANNELS = {
	GET_STATUS: "nativeRuntime:getStatus",
	INSTALL: "nativeRuntime:install",
	SET_ENABLED: "nativeRuntime:setEnabled",
	CHECK_FOR_UPDATES: "nativeRuntime:checkForUpdates",
	CHANGED: "nativeRuntime:changed"
};
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/client.ts
var NATIVE_RUNTIME_CHANNEL_MAP = {
	nativeRuntimeGetStatus: invoke$1(NATIVE_RUNTIME_RPC_CHANNELS.GET_STATUS),
	nativeRuntimeInstall: invoke$1(NATIVE_RUNTIME_RPC_CHANNELS.INSTALL, 9e5),
	nativeRuntimeSetEnabled: invoke$1(NATIVE_RUNTIME_RPC_CHANNELS.SET_ENABLED),
	nativeRuntimeCheckForUpdates: invoke$1(NATIVE_RUNTIME_RPC_CHANNELS.CHECK_FOR_UPDATES, 9e5),
	onNativeRuntimeChanged: listener(NATIVE_RUNTIME_RPC_CHANNELS.CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/plugin/client.ts
var PLUGIN_CHANNEL_MAP = {
	batchTogglePlugins: invoke$1(PLUGIN_RPC_CHANNELS.BATCH_TOGGLE),
	getInstalledPlugins: invoke$1(PLUGIN_RPC_CHANNELS.GET_INSTALLED),
	installPlugins: invoke$1(PLUGIN_RPC_CHANNELS.INSTALL),
	uninstallPlugin: invoke$1(PLUGIN_RPC_CHANNELS.UNINSTALL),
	updatePlugin: invoke$1(PLUGIN_RPC_CHANNELS.UPDATE),
	getPluginMarketplaces: invoke$1(PLUGIN_RPC_CHANNELS.GET_MARKETPLACES),
	getMarketplacePlugins: invoke$1(PLUGIN_RPC_CHANNELS.GET_MARKETPLACE_PLUGINS),
	getPluginDetail: invoke$1(PLUGIN_RPC_CHANNELS.GET_DETAIL),
	addPluginMarketplace: invoke$1(PLUGIN_RPC_CHANNELS.ADD_MARKETPLACE),
	removePluginMarketplace: invoke$1(PLUGIN_RPC_CHANNELS.REMOVE_MARKETPLACE),
	refreshPluginMarketplace: invoke$1(PLUGIN_RPC_CHANNELS.REFRESH_MARKETPLACE),
	reloadRuntimePlugins: invoke$1(PLUGIN_RPC_CHANNELS.RELOAD_RUNTIME_PLUGINS),
	setMarketplaceAutoUpdate: invoke$1(PLUGIN_RPC_CHANNELS.SET_MARKETPLACE_AUTO_UPDATE),
	onPluginsChanged: listener(PLUGIN_RPC_CHANNELS.CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/plugin-recommendation/client.ts
var PLUGIN_RECOMMENDATION_CHANNEL_MAP = { answerPluginRecommendation: invoke$1({ 
/** Kept wire-compatible with existing renderer clients. */
ANSWER: "session:answerPluginRecommendation" }.ANSWER) };
//#endregion
//#region ../../packages/workbuddy-server/src/poi/contract.ts
/**
* POI RPC channel 常量（genie#52769 阶段五）
*
* 遵循 `{domain}:{method}` 命名约定。
*/
var POI_RPC_CHANNELS = {
	IP_LOCATE: "poi:ipLocate",
	GEOCODE: "poi:geocode",
	SUGGESTION: "poi:suggestion",
	GET_ADDRESS_LIST: "poi:getAddressList",
	CREATE_ADDRESS: "poi:createAddress",
	UPDATE_ADDRESS: "poi:updateAddress",
	DELETE_ADDRESS: "poi:deleteAddress",
	SET_DEFAULT_ADDRESS: "poi:setDefaultAddress"
};
//#endregion
//#region ../../packages/workbuddy-server/src/poi/client.ts
/**
* POI channel map — renderer DaemonClient wiring（genie#52769 阶段五）
*/
var POI_CHANNEL_MAP = {
	poiIpLocate: invoke$1(POI_RPC_CHANNELS.IP_LOCATE),
	poiGeocode: invoke$1(POI_RPC_CHANNELS.GEOCODE),
	poiSuggestion: invoke$1(POI_RPC_CHANNELS.SUGGESTION),
	poiGetAddressList: invoke$1(POI_RPC_CHANNELS.GET_ADDRESS_LIST),
	poiCreateAddress: invoke$1(POI_RPC_CHANNELS.CREATE_ADDRESS),
	poiUpdateAddress: invoke$1(POI_RPC_CHANNELS.UPDATE_ADDRESS),
	poiDeleteAddress: invoke$1(POI_RPC_CHANNELS.DELETE_ADDRESS),
	poiSetDefaultAddress: invoke$1(POI_RPC_CHANNELS.SET_DEFAULT_ADDRESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/project-commands/client.ts
var PROJECT_COMMANDS_CHANNEL_MAP = { projectCommandsList: invoke$1({ LIST: "projectCommands:list" }.LIST) };
//#endregion
//#region ../../packages/workbuddy-server/src/proxy-settings/client.ts
/**
* proxy-settings 域 — Renderer 侧 channel-map（daemon-client 自动暴露 facade 方法）。
*
* 三个 invoke entry，无 listener。
* v4：daemon→Main 通过 host capability 通知，renderer 拿 saveSettings 返回值即可，
* 没必要订阅广播（这也是 §3.4.3 client.ts 的设计）。
*/
var PROXY_SETTINGS_CHANNEL_MAP = {
	getProxySettings: invoke$1(PROXY_SETTINGS_RPC_CHANNELS.GET_SETTINGS),
	saveProxySettings: invoke$1(PROXY_SETTINGS_RPC_CHANNELS.SAVE_SETTINGS),
	testProxyConnection: invoke$1(PROXY_SETTINGS_RPC_CHANNELS.TEST_CONNECTION)
};
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/client.ts
var SANDBOX_CHANNEL_MAP = {
	sandboxRespondToIntercept: invoke$1(SANDBOX_RPC_CHANNELS.RESPOND_TO_INTERCEPT),
	onSandboxInterceptRequest: listener(SANDBOX_RPC_CHANNELS.INTERCEPT_REQUEST),
	sandboxPreviewRegisterMount: invoke$1(SANDBOX_RPC_CHANNELS.REGISTER_MOUNT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/security-center/client.ts
var SECURITY_CENTER_CHANNEL_MAP = {
	securityCenterGetState: invoke$1(SECURITY_CENTER_RPC_CHANNELS.GET_STATE),
	securityCenterGetToolControlState: invoke$1(SECURITY_CENTER_RPC_CHANNELS.GET_TOOL_CONTROL_STATE),
	securityCenterUpdateToolControl: invoke$1(SECURITY_CENTER_RPC_CHANNELS.UPDATE_TOOL_CONTROL),
	securityCenterSaveSandboxRulesConfig: invoke$1(SECURITY_CENTER_RPC_CHANNELS.SAVE_SANDBOX_RULES_CONFIG),
	securityCenterSaveSandboxSafetyEnabled: invoke$1(SECURITY_CENTER_RPC_CHANNELS.SAVE_SANDBOX_SAFETY_ENABLED),
	securityCenterSaveSensitiveProtectionEnabled: invoke$1(SECURITY_CENTER_RPC_CHANNELS.SAVE_SENSITIVE_PROTECTION_ENABLED),
	securityCenterQuerySensitiveProtectionRules: invoke$1(SECURITY_CENTER_RPC_CHANNELS.QUERY_SENSITIVE_PROTECTION_RULES),
	securityCenterQuerySensitiveProtectionEntries: invoke$1(SECURITY_CENTER_RPC_CHANNELS.QUERY_SENSITIVE_PROTECTION_ENTRIES),
	securityCenterExecuteSensitiveProtectionMutation: invoke$1(SECURITY_CENTER_RPC_CHANNELS.EXECUTE_SENSITIVE_PROTECTION_MUTATION),
	securityCenterClearAuditLog: invoke$1(SECURITY_CENTER_RPC_CHANNELS.CLEAR_AUDIT_LOG),
	securityCenterQueryAuditLog: invoke$1(SECURITY_CENTER_RPC_CHANNELS.QUERY_AUDIT_LOG),
	securityCenterExportAuditLog: invoke$1(SECURITY_CENTER_RPC_CHANNELS.EXPORT_AUDIT_LOG),
	securityCenterSaveExperimentalFeaturesConfig: invoke$1(SECURITY_CENTER_RPC_CHANNELS.SAVE_EXPERIMENTAL_FEATURES_CONFIG),
	securityCenterGetExperimentalFeaturesConfig: invoke$1(SECURITY_CENTER_RPC_CHANNELS.GET_EXPERIMENTAL_FEATURES_CONFIG),
	securityCenterOpenModifyBackupDir: invoke$1(SECURITY_CENTER_RPC_CHANNELS.OPEN_MODIFY_BACKUP_DIR),
	securityCenterRequestSensitiveApproval: invoke$1(SECURITY_CENTER_RPC_CHANNELS.REQUEST_SENSITIVE_APPROVAL),
	securityCenterCancelSensitiveApproval: invoke$1(SECURITY_CENTER_RPC_CHANNELS.CANCEL_SENSITIVE_APPROVAL)
};
//#endregion
//#region ../../packages/workbuddy-server/src/share/client.ts
var SHARE_CHANNEL_MAP = {
	shareUploadFile: invoke$1(SHARE_RPC_CHANNELS.UPLOAD_FILE),
	shareUploadImage: invoke$1(SHARE_RPC_CHANNELS.UPLOAD_IMAGE),
	shareUploadToKnowledge: invoke$1(SHARE_RPC_CHANNELS.UPLOAD_TO_KNOWLEDGE),
	shareCreateLink: invoke$1(SHARE_RPC_CHANNELS.CREATE_LINK),
	shareGetList: invoke$1(SHARE_RPC_CHANNELS.GET_LIST),
	shareDownloadFile: invoke$1(SHARE_RPC_CHANNELS.DOWNLOAD_FILE),
	shareSetEnabled: invoke$1(SHARE_RPC_CHANNELS.SET_ENABLED),
	shareGetDetail: invoke$1(SHARE_RPC_CHANNELS.GET_DETAIL),
	shareVerify: invoke$1(SHARE_RPC_CHANNELS.VERIFY),
	sharePrepareTask: invoke$1(SHARE_RPC_CHANNELS.PREPARE_TASK),
	shareUploadTaskFile: invoke$1(SHARE_RPC_CHANNELS.UPLOAD_TASK_FILE),
	shareConfirmTask: invoke$1(SHARE_RPC_CHANNELS.CONFIRM_TASK),
	shareCancelTask: invoke$1(SHARE_RPC_CHANNELS.CANCEL_TASK),
	shareGetTaskList: invoke$1(SHARE_RPC_CHANNELS.GET_TASK_LIST),
	shareDeleteTask: invoke$1(SHARE_RPC_CHANNELS.DELETE_TASK),
	shareGenerateWxMPQRCode: invoke$1(SHARE_RPC_CHANNELS.GENERATE_WXMP_QRCODE),
	shareBatchMoveKnowledgeNodes: invoke$1(SHARE_RPC_CHANNELS.BATCH_MOVE_KNOWLEDGE_NODES),
	shareInvitePermission: invoke$1(SHARE_RPC_CHANNELS.INVITE_PERMISSION),
	shareSetPermission: invoke$1(SHARE_RPC_CHANNELS.SET_PERMISSION),
	shareGetPermission: invoke$1(SHARE_RPC_CHANNELS.GET_PERMISSION),
	shareGetShareCollabPolicy: invoke$1(SHARE_RPC_CHANNELS.GET_SHARE_COLLAB_POLICY),
	shareGetCollaborators: invoke$1(SHARE_RPC_CHANNELS.GET_COLLABORATORS),
	shareSetMemberPermission: invoke$1(SHARE_RPC_CHANNELS.SET_MEMBER_PERMISSION),
	shareQueryPageInfo: invoke$1(SHARE_RPC_CHANNELS.QUERY_PAGE_INFO),
	shareGetNodeInfo: invoke$1(SHARE_RPC_CHANNELS.GET_NODE_INFO),
	sharePublishPage: invoke$1(SHARE_RPC_CHANNELS.PUBLISH_PAGE),
	shareUnpublishPage: invoke$1(SHARE_RPC_CHANNELS.UNPUBLISH_PAGE),
	shareUploadLocalFileToCos: invoke$1(SHARE_RPC_CHANNELS.UPLOAD_LOCAL_FILE_TO_COS),
	shareQueryImportProgress: invoke$1(SHARE_RPC_CHANNELS.QUERY_IMPORT_PROGRESS),
	shareUploadShareTemplate: invoke$1(SHARE_RPC_CHANNELS.UPLOAD_SHARE_TEMPLATE)
};
//#endregion
//#region ../../packages/workbuddy-server/src/skill/client.ts
init_shared();
var SKILLS_CHANNEL_MAP = {
	skillList: invoke$1(SKILL_RPC_CHANNELS.LIST),
	skillImport: invoke$1(SKILL_RPC_CHANNELS.IMPORT),
	skillToggle: invoke$1(SKILL_RPC_CHANNELS.TOGGLE),
	skillBatchToggle: invoke$1(SKILL_RPC_CHANNELS.BATCH_TOGGLE),
	skillDelete: invoke$1(SKILL_RPC_CHANNELS.DELETE),
	skillContent: invoke$1(SKILL_RPC_CHANNELS.CONTENT),
	skillInstallByPath: invoke$1(SKILL_RPC_CHANNELS.INSTALL_BY_PATH),
	skillPrepareFromUrl: invoke$1(SKILL_RPC_CHANNELS.PREPARE_FROM_URL),
	skillGetContent: invoke$1(SKILL_RPC_CHANNELS.GET_CONTENT),
	skillGetMarketplace: invoke$1(SKILL_RPC_CHANNELS.GET_MARKETPLACE),
	skillGetMarketplaceContent: invoke$1(SKILL_RPC_CHANNELS.GET_MARKETPLACE_CONTENT),
	skillInstallMarketplace: invoke$1(SKILL_RPC_CHANNELS.INSTALL_MARKETPLACE),
	skillQueryScanResult: invoke$1(SKILL_RPC_CHANNELS.QUERY_SCAN_RESULT),
	skillInstallFromUrl: invoke$1(SKILL_RPC_CHANNELS.INSTALL_FROM_URL),
	skillRecommend: invoke$1(SKILL_RPC_CHANNELS.RECOMMEND),
	skillQueryConsistency: invoke$1(SKILL_RPC_CHANNELS.QUERY_CONSISTENCY),
	skillExportZip: invoke$1(SKILL_RPC_CHANNELS.EXPORT_ZIP),
	skillEnsureBuddySkills: invoke$1(SKILL_RPC_CHANNELS.ENSURE_BUDDY),
	skillRemoveBuddySkills: invoke$1(SKILL_RPC_CHANNELS.REMOVE_BUDDY),
	skillPruneBuddySkillBuckets: invoke$1(SKILL_RPC_CHANNELS.PRUNE_BUDDY_BUCKETS),
	skillListBuddyStoreSkillMetas: invoke$1(SKILL_RPC_CHANNELS.LIST_BUDDY_STORE_METAS),
	skillUpdateBuddyStoreSkill: invoke$1(SKILL_RPC_CHANNELS.UPDATE_BUDDY_STORE_SKILL),
	skillMarketConfigSyncRunOnce: invoke$1(SKILL_RPC_CHANNELS.MARKET_CONFIG_SYNC_RUN_ONCE),
	skillMarketInstallConfigList: invoke$1(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_LIST),
	skillMarketInstallConfigInstall: invoke$1(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_INSTALL),
	skillMarketInstallConfigUninstall: invoke$1(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_UNINSTALL),
	skillMarketInstallConfigEnsureLocal: invoke$1(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_ENSURE_LOCAL),
	skillhubList: invoke$1(SKILLHUB_RPC_CHANNELS.LIST),
	skillhubCategories: invoke$1(SKILLHUB_RPC_CHANNELS.CATEGORIES),
	skillhubSearch: invoke$1(SKILLHUB_RPC_CHANNELS.SEARCH),
	skillhubDetail: invoke$1(SKILLHUB_RPC_CHANNELS.DETAIL),
	skillhubExists: invoke$1(SKILLHUB_RPC_CHANNELS.EXISTS),
	skillhubInstall: invoke$1(SKILLHUB_RPC_CHANNELS.INSTALL),
	skillhubReportStats: invoke$1(SKILLHUB_RPC_CHANNELS.REPORT_STATS),
	skillhubInstalledMetas: invoke$1(SKILLHUB_RPC_CHANNELS.INSTALLED_METAS),
	knotList: invoke$1(KNOT_RPC_CHANNELS.LIST),
	knotCategories: invoke$1(KNOT_RPC_CHANNELS.CATEGORIES),
	knotTags: invoke$1(KNOT_RPC_CHANNELS.TAGS),
	knotSearch: invoke$1(KNOT_RPC_CHANNELS.SEARCH),
	knotDetail: invoke$1(KNOT_RPC_CHANNELS.DETAIL),
	knotExists: invoke$1(KNOT_RPC_CHANNELS.EXISTS),
	knotInstall: invoke$1(KNOT_RPC_CHANNELS.INSTALL),
	knotReportStats: invoke$1(KNOT_RPC_CHANNELS.REPORT_STATS),
	knotInstalledMetas: invoke$1(KNOT_RPC_CHANNELS.INSTALLED_METAS),
	knotGetByIds: invoke$1(KNOT_RPC_CHANNELS.GET_BY_IDS),
	builtinMarketList: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.LIST),
	builtinMarketGetByIds: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.GET_BY_IDS),
	builtinMarketDownloadUrl: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.DOWNLOAD_URL),
	builtinMarketCategories: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.CATEGORIES),
	builtinMarketInstall: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.INSTALL),
	builtinMarketInstalledMetas: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.INSTALLED_METAS),
	builtinMarketBackfillSkillId: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.BACKFILL_SKILL_ID),
	builtinMarketBackfillIconSource: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.BACKFILL_ICON_SOURCE),
	builtinMarketBackfillDescription: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.BACKFILL_DESCRIPTION),
	builtinMarketMigrateDirsToSkillId: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.MIGRATE_DIRS_TO_SKILL_ID),
	builtinMarketGetLayout: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.GET_LAYOUT),
	builtinMarketSearch: invoke$1(BUILTIN_MARKET_RPC_CHANNELS.SEARCH),
	enterpriseSkillsList: invoke$1(ENTERPRISE_SKILLS_RPC_CHANNELS.LIST),
	enterpriseSkillsGetCategories: invoke$1(ENTERPRISE_SKILLS_RPC_CHANNELS.GET_CATEGORIES),
	enterpriseSkillsProbeVisibility: invoke$1(ENTERPRISE_SKILLS_RPC_CHANNELS.PROBE_VISIBILITY),
	enterpriseSkillsInstall: invoke$1(ENTERPRISE_SKILLS_RPC_CHANNELS.INSTALL),
	marketplaceList: invoke$1(MARKETPLACE_RPC_CHANNELS.LIST),
	marketplaceInstall: invoke$1(MARKETPLACE_RPC_CHANNELS.INSTALL),
	marketplaceContent: invoke$1(MARKETPLACE_RPC_CHANNELS.CONTENT),
	skillsVersionChanged: listener(SKILL_EVENT_CHANNELS.VERSION_CHANGED),
	skillGetSkillsVersion: invoke$1(SKILL_RPC_CHANNELS.GET_SKILLS_VERSION)
};
//#endregion
//#region ../../packages/workbuddy-server/src/support/client.ts
var SUPPORT_CHANNEL_MAP = {
	memoryGetProfile: invoke$1(MEMORY_RPC_CHANNELS.GET_PROFILE),
	memorySaveSettings: invoke$1(MEMORY_RPC_CHANNELS.SAVE_SETTINGS),
	memorySubmitSuggestion: invoke$1(MEMORY_RPC_CHANNELS.SUBMIT_SUGGESTION),
	memoryImportContent: invoke$1(MEMORY_RPC_CHANNELS.IMPORT_CONTENT),
	memoryClearProfile: invoke$1(MEMORY_RPC_CHANNELS.CLEAR_PROFILE),
	memoryCheckUpdating: invoke$1(MEMORY_RPC_CHANNELS.CHECK_UPDATING)
};
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-docs/client.ts
/**
* 腾讯文档 CHANNEL_MAP — 约定模式命名：`tencentDocs` + 方法名首字母大写。
* Channel 字符串格式：`tencentDocs:methodName`。
*
* OneID 2 个公共能力 channel 用 `oneid:` 前缀（详见 rpc/tencent-docs.ts 注释），
* 在 renderer 层暴露的方法名仍以 `oneid` 开头以保持与 buddy-api 签名一致。
*/
var TENCENT_DOCS_CHANNEL_MAP = {
	tencentDocsGetFileList: invoke$1("tencentDocs:getFileList"),
	tencentDocsSearchFiles: invoke$1("tencentDocs:searchFiles"),
	tencentDocsCreateFile: invoke$1("tencentDocs:createFile"),
	tencentDocsUploadFile: invoke$1("tencentDocs:uploadFile"),
	tencentDocsCancelUpload: invoke$1("tencentDocs:cancelUpload"),
	tencentDocsQueryUploadProgress: invoke$1("tencentDocs:queryUploadProgress"),
	tencentDocsDeleteFile: invoke$1("tencentDocs:deleteFile"),
	tencentDocsRenameFile: invoke$1("tencentDocs:renameFile"),
	tencentDocsGetUploadPageUrl: invoke$1("tencentDocs:getUploadPageUrl"),
	tencentDocsGetPreviewUrl: invoke$1("tencentDocs:getPreviewUrl"),
	tencentDocsQueryFileInfo: invoke$1("tencentDocs:queryFileInfo"),
	tencentDocsGetFolderContents: invoke$1("tencentDocs:getFolderContents"),
	tencentDocsCheckAuthStatus: invoke$1("tencentDocs:checkAuthStatus"),
	tencentDocsStartAuth: invoke$1("tencentDocs:startAuth"),
	tencentDocsRevokeAuth: invoke$1("tencentDocs:revokeAuth"),
	tencentDocsCreateSaasImport: invoke$1("tencentDocs:createSaasImport"),
	tencentDocsQuerySaasImportProgress: invoke$1("tencentDocs:querySaasImportProgress"),
	tencentDocsBatchCreateSaasImport: invoke$1("tencentDocs:batchCreateSaasImport"),
	tencentDocsQueryBatchSaasImportProgress: invoke$1("tencentDocs:queryBatchSaasImportProgress"),
	tencentDocsGetPersonalTdocCookie: invoke$1("tencentDocs:getPersonalTdocCookie"),
	tencentDocsGetTdocsLicense: invoke$1("tencentDocs:getTdocsLicense"),
	tencentDocsVerifyPersonalLicense: invoke$1("tencentDocs:verifyPersonalLicense"),
	tencentDocsInitUploadByEnterprise: invoke$1("tencentDocs:initUploadByEnterprise"),
	tencentDocsPrepareEnterpriseDocPreview: invoke$1("tencentDocs:prepareEnterpriseDocPreview"),
	oneidListApplications: invoke$1("oneid:listApplications"),
	oneidGetSSOLoginLink: invoke$1("oneid:getSSOLoginLink")
};
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-lexiang/client.ts
var TENCENT_LEXIANG_CHANNEL_MAP = {
	lexiangGatewayPost: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.GATEWAY_POST),
	lexiangUploadFile: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.UPLOAD_LEXIANG_FILE),
	lexiangUploadFolder: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.UPLOAD_LEXIANG_FOLDER),
	lexiangUploadHtml: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.UPLOAD_LEXIANG_HTML),
	lexiangClearWebCookies: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.CLEAR_WEB_COOKIES),
	lexiangCheckLicense: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.CHECK_LICENSE),
	lexiangCheckCompanyStatus: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.CHECK_COMPANY_STATUS),
	lexiangSpApiRequest: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.SP_API_REQUEST),
	lexiangInvalidateAccessToken: invoke$1(TENCENT_LEXIANG_RPC_CHANNELS.INVALIDATE_ACCESS_TOKEN)
};
//#endregion
//#region ../../packages/workbuddy-server/src/tts/client.ts
var TTS_CHANNEL_MAP = {
	startTts: invoke$1(TTS_RPC_CHANNELS.START_TTS),
	stopTts: invoke$1(TTS_RPC_CHANNELS.STOP_TTS),
	onTtsEvent: listener(TTS_RPC_CHANNELS.EVENT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/wechat-chat-history/contract.ts
/**
* Wechat chat-history business module — public contract.
*
* Owns the pipeline that turns a WeChat chat-record `.zip` (forwarded by the
* user into WorkBuddy via `workbuddy://wechat/share?...`) into the metadata
* and truncated transcript needed by:
*  - the renderer inline phrase chip + hover popover (file size, message
*    count, attached file count), and
*  - the `<wechat_chat_history>` hidden-context block injected into the user
*    prompt by `AdditionalDataSection` in this package.
*
* Naming note: the module is intentionally NOT named `wechat-share`. The
* package already ships an unrelated `wechat-share` module that wraps the
* H5 WeChat JS-SDK for sharing links / launching mini-programs. The two
* modules are unrelated and live side by side.
*
* Symmetric in shape with `share/contract.ts` and `my-files/contract.ts`.
*/
var WECHAT_CHAT_HISTORY_RPC_CHANNELS = {
	PARSE_ZIP_METADATA: "wechatChatHistory:parseZipMetadata",
	START_EXTRACTION: "wechatChatHistory:startExtraction",
	GET_EXTRACTION_STATUS: "wechatChatHistory:getExtractionStatus",
	ENSURE_EXTRACTED: "wechatChatHistory:ensureExtracted"
};
//#endregion
//#region ../../packages/workbuddy-server/src/wechat-chat-history/client.ts
/**
* Client channel map for the `wechat-chat-history` module.
*
* Mirrors `share/client.ts` / `my-files/client.ts`.
*/
var WECHAT_CHAT_HISTORY_CHANNEL_MAP = {
	wechatChatHistoryParseZipMetadata: invoke$1(WECHAT_CHAT_HISTORY_RPC_CHANNELS.PARSE_ZIP_METADATA),
	wechatChatHistoryStartExtraction: invoke$1(WECHAT_CHAT_HISTORY_RPC_CHANNELS.START_EXTRACTION),
	wechatChatHistoryGetExtractionStatus: invoke$1(WECHAT_CHAT_HISTORY_RPC_CHANNELS.GET_EXTRACTION_STATUS),
	wechatChatHistoryEnsureExtracted: invoke$1(WECHAT_CHAT_HISTORY_RPC_CHANNELS.ENSURE_EXTRACTED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/worktree-task/contract.ts
var WORKTREE_TASK_RPC_CHANNELS = {
	IS_GIT_REPO: "worktreeTask:isGitRepo",
	LIST_LOCAL_BRANCHES: "worktreeTask:listLocalBranches",
	FETCH_BRANCHES: "worktreeTask:fetchBranches",
	COUNT_WORKTREES: "worktreeTask:countWorktrees",
	CLEANUP_WORKTREES: "worktreeTask:cleanupWorktrees",
	GET_WORKTREE_STATUS: "worktreeTask:getWorktreeStatus",
	CREATE_WORKTREE: "worktreeTask:createWorktree",
	DELETE_WORKTREE: "worktreeTask:deleteWorktree",
	CHECKOUT_BRANCH: "worktreeTask:checkoutBranch"
};
//#endregion
//#region ../../packages/workbuddy-server/src/worktree-task/client.ts
/**
* daemon client channel map。
*
* key = renderer 侧 `createDaemonServiceProxy('worktreeTask', ...)` 拼出的驼峰方法名
* （facade 方法 `isGitRepo` → `worktreeTaskIsGitRepo`），channel = 对应 RPC 通道。
*/
var WORKTREE_TASK_CHANNEL_MAP = {
	worktreeTaskIsGitRepo: invoke$1(WORKTREE_TASK_RPC_CHANNELS.IS_GIT_REPO),
	worktreeTaskListLocalBranches: invoke$1(WORKTREE_TASK_RPC_CHANNELS.LIST_LOCAL_BRANCHES),
	worktreeTaskFetchBranches: invoke$1(WORKTREE_TASK_RPC_CHANNELS.FETCH_BRANCHES),
	worktreeTaskCountWorktrees: invoke$1(WORKTREE_TASK_RPC_CHANNELS.COUNT_WORKTREES),
	worktreeTaskCleanupWorktrees: invoke$1(WORKTREE_TASK_RPC_CHANNELS.CLEANUP_WORKTREES),
	worktreeTaskGetWorktreeStatus: invoke$1(WORKTREE_TASK_RPC_CHANNELS.GET_WORKTREE_STATUS),
	worktreeTaskCreateWorktree: invoke$1(WORKTREE_TASK_RPC_CHANNELS.CREATE_WORKTREE),
	worktreeTaskDeleteWorktree: invoke$1(WORKTREE_TASK_RPC_CHANNELS.DELETE_WORKTREE),
	worktreeTaskCheckoutBranch: invoke$1(WORKTREE_TASK_RPC_CHANNELS.CHECKOUT_BRANCH)
};
//#endregion
//#region ../../packages/workbuddy-server/src/client/desktop-host-channel-map.ts
init_shared();
var DESKTOP_HOST_CHANNEL_MAP = {
	minimizeWindow: invoke$1(WINDOW_RPC_CHANNELS.MINIMIZE),
	maximizeWindow: invoke$1(WINDOW_RPC_CHANNELS.MAXIMIZE),
	closeWindow: invoke$1(WINDOW_RPC_CHANNELS.CLOSE),
	isWindowMaximized: invoke$1(WINDOW_RPC_CHANNELS.IS_MAXIMIZED),
	setWindowFullscreen: invoke$1(WINDOW_RPC_CHANNELS.SET_FULLSCREEN),
	toggleWindowFullscreen: invoke$1(WINDOW_RPC_CHANNELS.TOGGLE_FULLSCREEN),
	windowCancelPendingClose: invoke$1(WINDOW_RPC_CHANNELS.CANCEL_PENDING_CLOSE),
	windowConfirmClose: invoke$1(WINDOW_RPC_CHANNELS.CONFIRM_CLOSE),
	windowSetTrafficLightsVisible: invoke$1(WINDOW_RPC_CHANNELS.SET_TRAFFIC_LIGHTS_VISIBLE),
	windowShowItemInFolder: invoke$1(SYSTEM_RPC_CHANNELS.SHOW_ITEM_IN_FOLDER),
	selectDirectory: invoke$1(DIALOG_RPC_CHANNELS.SELECT_DIRECTORY),
	selectFile: invoke$1(DIALOG_RPC_CHANNELS.SELECT_FILE),
	saveFile: invoke$1(DIALOG_RPC_CHANNELS.SAVE_FILE),
	openExternal: invoke$1(SYSTEM_RPC_CHANNELS.OPEN_EXTERNAL),
	openYuanbao: invoke$1(SYSTEM_RPC_CHANNELS.OPEN_YUANBAO),
	hasImaApp: invoke$1(SYSTEM_RPC_CHANNELS.HAS_IMA_APP),
	openImaApp: invoke$1(SYSTEM_RPC_CHANNELS.OPEN_IMA_APP),
	openPath: invoke$1(SYSTEM_RPC_CHANNELS.OPEN_PATH),
	readClipboard: invoke$1(SYSTEM_RPC_CHANNELS.READ_CLIPBOARD),
	checkSystemPermissions: invoke$1(SYSTEM_RPC_CHANNELS.CHECK_SYSTEM_PERMISSIONS),
	requestNotificationRegistration: invoke$1(SYSTEM_RPC_CHANNELS.REQUEST_NOTIFICATION_REGISTRATION),
	setPowerSaveBlocker: invoke$1(POWER_RPC_CHANNELS.SET_POWER_SAVE_BLOCKER),
	setPowerSaveBlockerMode: invoke$1(POWER_RPC_CHANNELS.SET_POWER_SAVE_BLOCKER_MODE),
	getPowerSaveBlockerState: invoke$1(POWER_RPC_CHANNELS.GET_POWER_SAVE_BLOCKER_STATE),
	pickFile: invoke$1(DIALOG_RPC_CHANNELS.PICK_FILE),
	pickFolder: invoke$1(DIALOG_RPC_CHANNELS.PICK_FOLDER),
	windowOpenLocalFile: invoke$1(WINDOW_RPC_CHANNELS.OPEN_LOCAL_FILE),
	windowReload: invoke$1(WINDOW_RPC_CHANNELS.RELOAD),
	windowSaveLocale: invoke$1(WINDOW_RPC_CHANNELS.SAVE_LOCALE),
	windowSaveDefaultWorkspacePath: invoke$1(WINDOW_RPC_CHANNELS.SAVE_DEFAULT_WORKSPACE_PATH),
	windowCloseAgentManager: invoke$1(WINDOW_RPC_CHANNELS.CLOSE_AGENT_MANAGER),
	windowSaveBundledRuntimeConfig: invoke$1(WINDOW_RPC_CHANNELS.SAVE_BUNDLED_RUNTIME_CONFIG),
	windowGetBundledRuntimeConfig: invoke$1(WINDOW_RPC_CHANNELS.GET_BUNDLED_RUNTIME_CONFIG),
	getAppVersion: invoke$1(APP_RPC_CHANNELS.GET_VERSION),
	getAppPlatform: invoke$1(APP_RPC_CHANNELS.GET_PLATFORM),
	getAppLocale: invoke$1(APP_RPC_CHANNELS.GET_LOCALE),
	getMachineId: invoke$1(APP_RPC_CHANNELS.GET_MACHINE_ID),
	getConfigDir: invoke$1(APP_RPC_CHANNELS.GET_CONFIG_DIR),
	setMenuLocale: invoke$1(APP_RPC_CHANNELS.SET_MENU_LOCALE),
	getAutoLaunchEnabled: invoke$1(APP_RPC_CHANNELS.GET_AUTO_LAUNCH_ENABLED),
	setAutoLaunchEnabled: invoke$1(APP_RPC_CHANNELS.SET_AUTO_LAUNCH_ENABLED),
	updateCheck: invoke$1(UPDATE_RPC_CHANNELS.CHECK),
	updateDownload: invoke$1(UPDATE_RPC_CHANNELS.DOWNLOAD),
	updateArchMismatchDownload: invoke$1(UPDATE_RPC_CHANNELS.ARCH_MISMATCH_DOWNLOAD),
	updateArchMismatchInstall: invoke$1(UPDATE_RPC_CHANNELS.ARCH_MISMATCH_INSTALL),
	updateQuitAndInstall: invoke$1(UPDATE_RPC_CHANNELS.QUIT_AND_INSTALL),
	updateGetState: invoke$1(UPDATE_RPC_CHANNELS.GET_STATE),
	onUpdateStateChanged: listener(UPDATE_RPC_CHANNELS.STATE_CHANGED),
	binaryList: invoke$1(BINARY_RPC_CHANNELS.LIST),
	binaryStatus: invoke$1(BINARY_RPC_CHANNELS.STATUS),
	getDocumentPreviewUrl: invoke$1(DOCS_RPC_EX_CHANNELS.GET_PREVIEW_URL),
	releaseDocumentPreviewContext: invoke$1(DOCS_RPC_EX_CHANNELS.RELEASE_PREVIEW_CONTEXT),
	releaseDocumentPreviewContextIfClean: invoke$1(DOCS_RPC_EX_CHANNELS.RELEASE_PREVIEW_CONTEXT_IF_CLEAN),
	saveDocumentPreviewContext: invoke$1(DOCS_RPC_EX_CHANNELS.SAVE_PREVIEW_CONTEXT),
	previewDocumentFromContent: invoke$1(DOCS_RPC_CHANNELS.PREVIEW_DOCUMENT_FROM_CONTENT),
	getIdentityName: invoke$1(IDENTITY_RPC_CHANNELS.GET_NAME),
	updateIdentityName: invoke$1(IDENTITY_RPC_CHANNELS.UPDATE_NAME),
	checkModeration: invoke$1(IDENTITY_RPC_CHANNELS.CHECK_MODERATION),
	getLocalMemoryFiles: invoke$1(IDENTITY_RPC_CHANNELS.GET_LOCAL_MEMORY_FILES),
	updateUserCallName: invoke$1(IDENTITY_RPC_CHANNELS.UPDATE_USER_CALL_NAME),
	updateAiName: invoke$1(IDENTITY_RPC_CHANNELS.UPDATE_AI_NAME),
	updateSoulBody: invoke$1(IDENTITY_RPC_CHANNELS.UPDATE_SOUL_BODY),
	updateMemoryBody: invoke$1(IDENTITY_RPC_CHANNELS.UPDATE_MEMORY_BODY),
	onIdentityChanged: listener(IDENTITY_RPC_CHANNELS.CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/client/channel-map.ts
/**
* Channel map — single runtime entrypoint for WorkbuddyDaemonClient wiring.
*
* The map is assembled from business-module partial maps so the internal
* organization stays flat by feature area,
* while the exposed WorkbuddyDaemonClient stays completely flat.
*/
var CHANNEL_MAP = {
	...AGENT_IM_CHANNEL_MAP,
	...SESSION_CHANNEL_MAP,
	...AUTH_CHANNEL_MAP,
	...ASR_CHANNEL_MAP,
	...DESKTOP_HOST_CHANNEL_MAP,
	...CONFIG_CHANNEL_MAP,
	...EXPERT_CHANNEL_MAP,
	...FEEDBACK_CHANNEL_MAP,
	...GROWTH_CHANNEL_MAP,
	...IDLE_CAPABILITY_CHANNEL_MAP,
	...SKILLS_CHANNEL_MAP,
	...MCP_CHANNEL_MAP,
	...LINK_PREVIEW_CHANNEL_MAP,
	...FILE_SYSTEM_CHANNEL_MAP,
	...AUTOMATION_CHANNEL_MAP,
	...CONNECTOR_CHANNEL_MAP,
	...CLOUD_AGENT_CHANNEL_MAP,
	...CLOUD_ASSISTANT_CHANNEL_MAP,
	...ENTERPRISE_POLICY_CHANNEL_MAP,
	...CREDIT_PREDICTION_CHANNEL_MAP,
	...DATA_RETENTION_CHANNEL_MAP,
	...CLAW_CHANNEL_MAP,
	...IMA_CHANNEL_MAP,
	...INSPIRATION_CHANNEL_MAP,
	...MICROPHONE_CHANNEL_MAP,
	...MIGRATION_CHANNEL_MAP,
	...PLUGIN_CHANNEL_MAP,
	...PLUGIN_RECOMMENDATION_CHANNEL_MAP,
	...PROJECT_COMMANDS_CHANNEL_MAP,
	...PROXY_SETTINGS_CHANNEL_MAP,
	...POI_CHANNEL_MAP,
	...SANDBOX_CHANNEL_MAP,
	...STATIC_HTML_CHANNEL_MAP,
	...SECURITY_CENTER_CHANNEL_MAP,
	...SHARE_CHANNEL_MAP,
	...TENCENT_DOCS_CHANNEL_MAP,
	...TTS_CHANNEL_MAP,
	...TENCENT_LEXIANG_CHANNEL_MAP,
	...MY_FILES_CHANNEL_MAP,
	...NATIVE_RUNTIME_CHANNEL_MAP,
	...SUPPORT_CHANNEL_MAP,
	...COMPATIBILITY_CHANNEL_MAP,
	...WECHAT_CHAT_HISTORY_CHANNEL_MAP,
	...WORKTREE_TASK_CHANNEL_MAP
};
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/daemon/desktop-daemon-transport.ts
function createDesktopDaemonTransportFactory(host = getDesktopHost()) {
	if (!host) throw new Error("WorkBuddy desktop host is unavailable");
	return () => new DesktopDaemonTransport();
}
var DesktopDaemonTransport = class {
	constructor() {
		this.state = "idle";
		this.sessionId = null;
		this.port = null;
		this.epoch = 0;
		this.openListeners = /* @__PURE__ */ new Set();
		this.messageListeners = /* @__PURE__ */ new Set();
		this.closeListeners = /* @__PURE__ */ new Set();
		this.errorListeners = /* @__PURE__ */ new Set();
		this.didEmitOpen = false;
	}
	connect() {
		if (this.state === "opening" || this.state === "open") return;
		this.state = "opening";
		this.didEmitOpen = false;
		this.sessionId = null;
		const epoch = ++this.epoch;
		if (typeof window === "undefined" || typeof MessageChannel === "undefined") {
			const error = /* @__PURE__ */ new Error("Desktop daemon transport requires MessageChannel");
			this.emitError(error);
			this.finishClose({
				code: 1006,
				reason: error.message,
				wasClean: false
			});
			return;
		}
		const channel = new MessageChannel();
		this.port = channel.port1;
		this.port.onmessage = (event) => {
			this.onTransportEvent(event.data, epoch);
		};
		this.port.onmessageerror = () => {
			if (epoch === this.epoch) this.emitError(/* @__PURE__ */ new Error("Desktop daemon transport port message error"));
		};
		this.port.start();
		try {
			window.postMessage({
				type: OPEN_LOCAL_DAEMON_TRANSPORT_PORT_MESSAGE,
				target: createLocalTransportTarget()
			}, "*", [channel.port2]);
		} catch (error) {
			this.emitError(error);
			this.finishClose({
				code: 1006,
				reason: error instanceof Error ? error.message : String(error),
				wasClean: false
			});
		}
	}
	send(frame) {
		const requestId = readFrameId(frame);
		if (this.state !== "open" || !this.sessionId || !this.port) {
			if (typeof frame === "string" || isRecord$1(frame)) this.emitMessage(createErrorEnvelope(requestId, "daemon transport closed"));
			else this.emitError(/* @__PURE__ */ new Error("daemon transport closed"));
			return;
		}
		try {
			this.port.postMessage({
				kind: "message",
				...encodeTransportPayload(frame)
			});
		} catch (error) {
			this.emitError(error);
			if (typeof frame === "string" || isRecord$1(frame)) this.emitMessage(createErrorEnvelope(requestId, error instanceof Error ? error.message : String(error)));
		}
	}
	close(code = 1e3, reason = "transport closed") {
		if (this.state === "closed") return;
		const port = this.port;
		if (port) try {
			port.postMessage({ kind: "close" });
		} catch (error) {
			this.emitError(error);
		}
		this.finishClose({
			code,
			reason,
			wasClean: code === 1e3
		});
	}
	onOpen(callback) {
		this.openListeners.add(callback);
		return () => {
			this.openListeners.delete(callback);
		};
	}
	onMessage(callback) {
		this.messageListeners.add(callback);
		return () => {
			this.messageListeners.delete(callback);
		};
	}
	onClose(callback) {
		this.closeListeners.add(callback);
		return () => {
			this.closeListeners.delete(callback);
		};
	}
	onError(callback) {
		this.errorListeners.add(callback);
		return () => {
			this.errorListeners.delete(callback);
		};
	}
	onTransportEvent(payload, epoch) {
		if (epoch !== this.epoch || this.state === "closed") return;
		if (!isRecord$1(payload)) return;
		const event = parseLocalTransportEvent(payload);
		if (!event) return;
		if (event.kind === "open") {
			if (this.state !== "opening") return;
			this.sessionId = event.sessionId;
			this.state = "open";
			this.emitOpen();
			return;
		}
		if (event.sessionId !== this.sessionId) return;
		switch (event.kind) {
			case "message":
				if (event.json !== null && event.json !== void 0) this.emitMessage(event.json);
				else if (event.text !== null && event.text !== void 0) this.emitMessage(event.text);
				else if (event.binaryBase64) this.emitMessage(decodeBase64ToBytes(event.binaryBase64));
				break;
			case "close":
				this.finishClose({
					code: event.code ?? void 0,
					reason: event.reason ?? void 0,
					wasClean: event.code === 1e3
				});
				break;
			case "error": this.emitError(new Error(event.error ?? "Local daemon transport error"));
		}
	}
	emitOpen() {
		if (this.didEmitOpen || this.state === "closed") return;
		this.didEmitOpen = true;
		for (const cb of this.openListeners) cb();
	}
	emitMessage(frame) {
		for (const cb of this.messageListeners) cb(frame);
	}
	emitError(error) {
		for (const cb of this.errorListeners) cb(error);
	}
	finishClose(event) {
		if (this.state === "closed") return;
		this.epoch += 1;
		this.state = "closed";
		this.sessionId = null;
		const port = this.port;
		this.port = null;
		if (port) {
			port.onmessage = null;
			port.onmessageerror = null;
			port.close();
		}
		for (const cb of this.closeListeners) cb(event);
	}
};
function createLocalTransportTarget() {
	return { transportType: "local" };
}
function encodeTransportPayload(data) {
	if (typeof data === "string") return { text: data };
	if (data instanceof Uint8Array || data instanceof ArrayBuffer) return { binaryBase64: encodeBinaryToBase64(data) };
	return { json: data };
}
function encodeBinaryToBase64(data) {
	const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return globalThis.btoa(binary);
}
function decodeBase64ToBytes(base64) {
	const binary = globalThis.atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}
function parseLocalTransportEvent(payload) {
	const sessionId = toStringOrNull(payload.sessionId);
	const kind = toStringOrNull(payload.kind);
	if (!sessionId || !isLocalTransportEventKind(kind)) return null;
	return {
		sessionId,
		kind,
		json: Object.prototype.hasOwnProperty.call(payload, "json") ? payload.json : null,
		text: toStringOrNull(payload.text),
		binaryBase64: toStringOrNull(payload.binaryBase64),
		code: toNumberOrNull(payload.code),
		reason: toStringOrNull(payload.reason),
		error: toStringOrNull(payload.error)
	};
}
function isLocalTransportEventKind(value) {
	return value === "open" || value === "message" || value === "close" || value === "error";
}
function readFrameId(frame) {
	if (isRecord$1(frame) && typeof frame.id === "string") return frame.id;
	if (typeof frame !== "string") return "unknown";
	try {
		const parsed = JSON.parse(frame);
		return typeof parsed.id === "string" ? parsed.id : "unknown";
	} catch {
		return "unknown";
	}
}
function createErrorEnvelope(id, message) {
	return {
		id,
		type: "error",
		error: {
			code: -32e3,
			message
		}
	};
}
function toStringOrNull(value) {
	return typeof value === "string" && value.length > 0 ? value : null;
}
function toNumberOrNull(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function isRecord$1(value) {
	return typeof value === "object" && value !== null;
}
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/daemon/client.ts
var INITIAL_BACKOFF_MS = 1e3;
var MAX_BACKOFF_MS = 3e4;
var DEFAULT_READY_GATE_TIMEOUT_MS = 108e5;
var DEFAULT_PROBE_TIMEOUT_MS = 5e3;
var DAEMON_PING_CHANNEL = "daemon:ping";
var UNKNOWN_PAYLOAD_BYTES = -1;
/**
* Safety valve: if suspended state persists longer than this, force a resume.
* This protects against lost power resume events (e.g. renderer throttled,
* IPC dropped, or macOS App Nap delaying the event dispatch).
*/
var SUSPEND_SAFETY_TIMEOUT_MS = 6e4;
var DaemonClient = class {
	constructor(options) {
		this.transport = null;
		this.connectOptions = null;
		this.state = "disconnected";
		this.stateListeners = /* @__PURE__ */ new Set();
		this.connectionListeners = /* @__PURE__ */ new Set();
		this.pending = /* @__PURE__ */ new Map();
		this.eventListeners = /* @__PURE__ */ new Map();
		this.reconnectTimer = null;
		this.backoffMs = INITIAL_BACKOFF_MS;
		this.disposed = false;
		this.intentionalClose = false;
		this.suspended = false;
		this.suspendSafetyTimer = null;
		this.resumeProbePromise = null;
		this.generation = 0;
		this.readyWaiters = /* @__PURE__ */ new Set();
		this.lastSent = null;
		this.transportFactory = options.transportFactory;
		this.diagnosticName = options.diagnosticName ?? "DaemonClient";
		this.initialBackoffMs = normalizeDelay(options.reconnect?.baseDelayMs, INITIAL_BACKOFF_MS);
		this.maxBackoffMs = Math.max(this.initialBackoffMs, normalizeDelay(options.reconnect?.maxDelayMs, MAX_BACKOFF_MS));
		this.backoffMs = this.initialBackoffMs;
		this.readyGateTimeoutMs = normalizeDelay(options.readyGateTimeoutMs, DEFAULT_READY_GATE_TIMEOUT_MS);
		this.probeTimeoutMs = normalizeDelay(options.probeTimeoutMs, DEFAULT_PROBE_TIMEOUT_MS);
	}
	connect(options) {
		this.connectOptions = options;
		this.disposed = false;
		this.intentionalClose = false;
		this.suspended = false;
		return this.doConnect(options);
	}
	getState() {
		return this.state;
	}
	getConnectionSnapshot() {
		return {
			state: this.state,
			epoch: this.generation
		};
	}
	onConnectionChange(callback) {
		this.connectionListeners.add(callback);
		return () => {
			this.connectionListeners.delete(callback);
		};
	}
	onStateChange(callback) {
		this.stateListeners.add(callback);
		return () => {
			this.stateListeners.delete(callback);
		};
	}
	invoke(channel, ...args) {
		return this.invokeWithTimeout(channel, 0, ...args);
	}
	async invokeWithTimeout(channel, timeoutMs, ...args) {
		await this.waitUntilReadyForRequest(channel, timeoutMs);
		const rpcSpan = this.maybeStartRpcSpan(channel, args);
		if (!rpcSpan) return this.sendRequest(channel, timeoutMs, args);
		try {
			const result = await this.sendRequest(channel, timeoutMs, args);
			rpcSpan.setStatus({ code: SpanStatusCode.OK });
			return result;
		} catch (err) {
			rpcSpan.setStatus({
				code: SpanStatusCode.ERROR,
				message: err instanceof Error ? err.message : String(err)
			});
			throw err;
		} finally {
			rpcSpan.end();
		}
	}
	/**
	* 决策5（add-workbuddy-renderer-daemon-span-refinement）：只对会话相关 RPC 起子 span。
	* 会话相关的识别依据是调用参数携带的 `_meta['codebuddy.ai'].requestId` / `conversationId`
	* 能匹配到一个当前活跃的 RendererTraceContext；非会话 RPC（如 plugin:list）不产生 span。
	*/
	maybeStartRpcSpan(channel, args) {
		const { requestId, conversationId } = this.extractTraceKeys(args);
		if (!requestId && !conversationId) return;
		const traceCtx = (requestId && getRendererTraceContextByRequestId(requestId)) ?? (conversationId ? getRendererTraceContextByConversationId(conversationId) : void 0);
		if (!traceCtx) return;
		return traceCtx.startChildSpan(`renderer.rpc.${channel}`, {
			"rpc.channel": channel,
			"conversation.request.id": requestId ?? "",
			"workbuddy.conversation_id": conversationId ?? ""
		});
	}
	extractTraceKeys(args) {
		for (const arg of args) {
			if (!arg || typeof arg !== "object") continue;
			const meta = arg._meta?.["codebuddy.ai"];
			if (!meta) continue;
			const requestId = typeof meta.requestId === "string" ? meta.requestId : void 0;
			const conversationId = typeof meta.conversationId === "string" ? meta.conversationId : void 0;
			if (requestId || conversationId) return {
				requestId,
				conversationId
			};
		}
		return {};
	}
	sendRequest(channel, timeoutMs, args, options = {}) {
		return new Promise((resolve, reject) => {
			const transport = this.transport;
			if (this.state !== "connected" && !(options.allowDuringProbing && this.state === "probing") || !transport) {
				reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: not connected (state=${this.state})`));
				return;
			}
			const id = generateId();
			const generation = this.generation;
			const envelope = {
				id,
				type: "request",
				channel,
				args
			};
			const payloadBytes = UNKNOWN_PAYLOAD_BYTES;
			const timer = Number.isFinite(timeoutMs) && timeoutMs > 0 ? setTimeout(() => {
				this.pending.delete(id);
				reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: request timeout for "${channel}" (${timeoutMs}ms)`));
			}, timeoutMs) : void 0;
			this.pending.set(id, {
				resolve: (value) => {
					resolve(value);
				},
				reject: (reason) => {
					reject(reason);
				},
				timer,
				channel,
				payloadBytes,
				createdAt: Date.now(),
				generation
			});
			this.lastSent = {
				id,
				channel,
				payloadBytes,
				sentAt: Date.now()
			};
			try {
				transport.send(envelope);
			} catch (err) {
				this.pending.delete(id);
				if (timer) clearTimeout(timer);
				reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: send failed for "${channel}" (${formatPayloadBytes(payloadBytes)}): ${formatError(err)}`));
			}
		});
	}
	on(channel, callback) {
		let listeners = this.eventListeners.get(channel);
		if (!listeners) {
			listeners = /* @__PURE__ */ new Set();
			this.eventListeners.set(channel, listeners);
		}
		listeners.add(callback);
		return () => {
			listeners.delete(callback);
			if (listeners.size === 0) this.eventListeners.delete(channel);
		};
	}
	markSuspend() {
		if (this.disposed) return;
		this.suspended = true;
		if (this.reconnectTimer !== null) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
		if (this.suspendSafetyTimer !== null) clearTimeout(this.suspendSafetyTimer);
		this.suspendSafetyTimer = setTimeout(() => {
			this.suspendSafetyTimer = null;
			if (this.suspended && !this.disposed) this.markResume().catch(() => void 0);
		}, SUSPEND_SAFETY_TIMEOUT_MS);
	}
	async markResume() {
		if (this.disposed) return;
		this.suspended = false;
		if (this.suspendSafetyTimer !== null) {
			clearTimeout(this.suspendSafetyTimer);
			this.suspendSafetyTimer = null;
		}
		if (this.resumeProbePromise) return this.resumeProbePromise;
		this.resumeProbePromise = this.probeOrReconnectAfterResume().finally(() => {
			this.resumeProbePromise = null;
			this.resolveReadyWaitersIfReady();
		});
		return this.resumeProbePromise;
	}
	dispose() {
		this.disposed = true;
		this.intentionalClose = true;
		this.suspended = false;
		this.resumeProbePromise = null;
		if (this.suspendSafetyTimer !== null) {
			clearTimeout(this.suspendSafetyTimer);
			this.suspendSafetyTimer = null;
		}
		if (this.reconnectTimer !== null) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
		this.rejectReadyWaiters(/* @__PURE__ */ new Error(`${this.diagnosticName}: disposed`));
		for (const [id, req] of this.pending) {
			if (req.timer) clearTimeout(req.timer);
			req.reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: disposed`));
			this.pending.delete(id);
		}
		if (this.transport) {
			this.transport.close(1e3, "client disposed");
			this.transport = null;
		}
		this.setState("disconnected");
	}
	doConnect(options) {
		return new Promise((resolve, reject) => {
			const generation = this.bumpGeneration();
			this.setState("connecting", true);
			const transport = this.transportFactory(options);
			let handshakeResolved = false;
			transport.onOpen(() => {
				if (generation !== this.generation) return;
				if (!options.handshakeToken) {
					handshakeResolved = true;
					this.transport = transport;
					this.backoffMs = this.initialBackoffMs;
					this.setState("connected");
					resolve();
					return;
				}
				try {
					const envelope = {
						id: generateId(),
						type: "handshake",
						args: [options.handshakeToken]
					};
					transport.send(envelope);
				} catch (err) {
					handshakeResolved = true;
					reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: handshake send failed: ${formatError(err)}`));
				}
			});
			transport.onMessage((frame) => {
				if (generation !== this.generation) return;
				if (handshakeResolved && this.transport !== transport) return;
				const envelope = parseEnvelope(frame);
				if (!envelope) return;
				if (!handshakeResolved && envelope.type === "handshake_ack") {
					handshakeResolved = true;
					this.transport = transport;
					this.backoffMs = this.initialBackoffMs;
					this.setState("connected");
					resolve();
					return;
				}
				if (!handshakeResolved && envelope.type === "error") {
					handshakeResolved = true;
					reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: ${envelope.error?.message ?? "Handshake failed"}`));
					return;
				}
				this.onMessage(envelope);
			});
			transport.onClose((closeInfo) => {
				if (generation !== this.generation) return;
				if (!handshakeResolved) {
					handshakeResolved = true;
					reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: connection closed before handshake (${formatCloseDiagnostics(closeInfo)})`));
				}
				const isCurrentTransport = this.transport === transport;
				if (!isCurrentTransport && this.transport) return;
				if (isCurrentTransport) this.transport = null;
				if (!this.disposed && !this.intentionalClose) this.scheduleReconnect(closeInfo);
				else this.setState("disconnected");
			});
			transport.onError(() => {
				if (generation !== this.generation) return;
				if (!handshakeResolved) {
					handshakeResolved = true;
					reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: connection error`));
				}
			});
			try {
				transport.connect();
			} catch (err) {
				handshakeResolved = true;
				reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: connect failed: ${formatError(err)}`));
			}
		});
	}
	scheduleReconnect(closeInfo) {
		if (this.disposed || !this.connectOptions) return;
		this.setState("reconnecting");
		if (this.reconnectTimer !== null) return;
		this.rejectPendingForTransportClose(closeInfo);
		if (this.suspended) return;
		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null;
			this.doConnect(this.connectOptions).catch(() => {
				if (this.disposed || this.intentionalClose) return;
				if (this.suspended) {
					this.setState("reconnecting");
					return;
				}
				this.scheduleReconnect({
					code: 1006,
					reason: "reconnect failed",
					wasClean: false
				});
			});
		}, this.backoffMs);
		this.backoffMs = Math.min(this.backoffMs * 2, this.maxBackoffMs);
	}
	async waitUntilReadyForRequest(channel, timeoutMs) {
		if (this.isReadyForRequests()) return;
		if (this.disposed) throw new Error(`${this.diagnosticName}: disposed`);
		if (!this.connectOptions && this.state === "disconnected") throw new Error(`${this.diagnosticName}: not connected (state=${this.state})`);
		const effectiveTimeout = timeoutMs > 0 ? timeoutMs : this.readyGateTimeoutMs;
		await new Promise((resolve, reject) => {
			const waiter = {
				resolve,
				reject,
				timer: setTimeout(() => {
					this.readyWaiters.delete(waiter);
					reject(/* @__PURE__ */ new Error(`${this.diagnosticName}: daemon not ready for "${channel}" within ${effectiveTimeout}ms (state=${this.state}, suspended=${this.suspended}, probing=${!!this.resumeProbePromise})`));
				}, effectiveTimeout)
			};
			this.readyWaiters.add(waiter);
			this.resolveReadyWaitersIfReady();
		});
	}
	isReadyForRequests() {
		return !this.suspended && !this.resumeProbePromise && this.state === "connected" && !!this.transport;
	}
	resolveReadyWaitersIfReady() {
		if (!this.isReadyForRequests()) return;
		for (const waiter of this.readyWaiters) {
			clearTimeout(waiter.timer);
			waiter.resolve();
			this.readyWaiters.delete(waiter);
		}
	}
	rejectReadyWaiters(reason) {
		for (const waiter of this.readyWaiters) {
			clearTimeout(waiter.timer);
			waiter.reject(reason);
			this.readyWaiters.delete(waiter);
		}
	}
	async probeOrReconnectAfterResume() {
		if (this.state === "connected" && this.transport) {
			this.setState("probing");
			try {
				await this.sendRequest(DAEMON_PING_CHANNEL, this.probeTimeoutMs, [], { allowDuringProbing: true });
				this.setState("connected");
				return;
			} catch {
				this.detachCurrentTransport("resume probe failed");
			}
		}
		await this.reconnectNow();
	}
	async reconnectNow() {
		if (!this.connectOptions || this.disposed || this.intentionalClose) return;
		if (this.reconnectTimer !== null) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
		this.setState("reconnecting");
		try {
			await this.doConnect(this.connectOptions);
		} catch {
			if (this.disposed || this.intentionalClose) return;
			if (this.suspended) {
				this.setState("reconnecting");
				return;
			}
			this.scheduleReconnect({
				code: 1006,
				reason: "reconnect failed after resume",
				wasClean: false
			});
		}
	}
	detachCurrentTransport(reason) {
		const transport = this.transport;
		this.transport = null;
		this.rejectPendingForTransportClose({
			code: 1006,
			reason,
			wasClean: false
		});
		this.bumpGeneration();
		if (transport) try {
			transport.close(1e3, reason);
		} catch {}
	}
	rejectPendingForTransportClose(closeInfo) {
		const pending = Array.from(this.pending.values());
		const error = this.suspended ? new Error(formatSuspendedConnectionMessage(this.diagnosticName, pending, this.lastSent)) : new Error(formatConnectionLostMessage(this.diagnosticName, closeInfo, pending, this.lastSent));
		for (const [id, req] of this.pending) {
			if (req.timer) clearTimeout(req.timer);
			req.reject(error);
			this.pending.delete(id);
		}
	}
	bumpGeneration() {
		this.generation += 1;
		return this.generation;
	}
	onMessage(envelope) {
		switch (envelope.type) {
			case "response":
			case "error": {
				const req = this.pending.get(envelope.id);
				if (!req) return;
				if (req.generation !== this.generation) {
					this.pending.delete(envelope.id);
					if (req.timer) clearTimeout(req.timer);
					return;
				}
				this.pending.delete(envelope.id);
				if (req.timer) clearTimeout(req.timer);
				if (envelope.type === "error" || envelope.error) {
					const msg = envelope.error?.message ?? "Unknown RPC error";
					const bizCode = envelope.error?.bizCode;
					const code = typeof bizCode === "number" ? bizCode : envelope.error?.code;
					req.reject(new RpcError(msg, code, envelope.error?.data, envelope.error?.httpStatus));
				} else req.resolve(envelope.result);
				break;
			}
			case "event": {
				const channel = envelope.channel;
				if (!channel) return;
				const listeners = this.eventListeners.get(channel);
				if (listeners) for (const cb of listeners) try {
					cb(envelope.result);
				} catch {}
				break;
			}
		}
	}
	setState(next, forceConnectionNotification = false) {
		const didStateChange = this.state !== next;
		if (!didStateChange && !forceConnectionNotification) return;
		this.state = next;
		this.resolveReadyWaitersIfReady();
		if (didStateChange) for (const cb of this.stateListeners) try {
			cb(next);
		} catch {}
		const snapshot = this.getConnectionSnapshot();
		for (const cb of this.connectionListeners) try {
			cb(snapshot);
		} catch {}
	}
};
var RpcError = class extends Error {
	constructor(message, code, data, httpStatus) {
		super(message);
		this.code = code;
		this.name = "RpcError";
		this.data = data;
		this.httpStatus = httpStatus;
	}
};
function createWorkbuddyDesktopDaemonClient(options = {}) {
	return new DaemonClient({
		transportFactory: createDesktopDaemonTransportFactory(options.host === void 0 ? getDesktopHost() : options.host),
		diagnosticName: options.diagnosticName ?? "WorkBuddyDesktopDaemonClient"
	});
}
var WORKBUDDY_DAEMON_CHANNEL_MAP = CHANNEL_MAP;
function buildWorkbuddyDesktopClientApi(client) {
	const api = {};
	for (const [key, mapping] of Object.entries(WORKBUDDY_DAEMON_CHANNEL_MAP)) if (mapping.type === "invoke") api[key] = typeof mapping.timeout === "number" ? (...args) => client.invokeWithTimeout(mapping.channel, mapping.timeout, ...args) : (...args) => client.invoke(mapping.channel, ...args);
	else api[key] = (callback) => client.on(mapping.channel, callback);
	api.$on = (channel, callback) => client.on(channel, callback);
	api.$invoke = (channel, ...args) => client.invoke(channel, ...args);
	return new Proxy(api, { get(target, prop, receiver) {
		if (typeof prop === "symbol" || prop in target) return Reflect.get(target, prop, receiver);
		const channel = camelToChannel(prop);
		if (!channel) return;
		return (...args) => client.invoke(channel, ...args);
	} });
}
var KNOWN_SERVICE_PREFIXES = [
	"scheduler",
	"connector",
	"msgCenter",
	"project",
	"expertHistory",
	"expert",
	"plugin",
	"agentIm",
	"cloudAgent",
	"ima",
	"skillCloudSync",
	"skills",
	"skillhub",
	"skill",
	"knot",
	"builtinMarket",
	"marketplace",
	"mcp",
	"tencentDocs",
	"oneid",
	"tencentLexiang",
	"personalSkills",
	"skillsMarketplace",
	"enterpriseSkills",
	"cloudAssistant",
	"enterprisePolicy",
	"idleCapability",
	"securityCenter",
	"support",
	"compatibility",
	"config",
	"auth",
	"update",
	"tts",
	"clawControl",
	"claw",
	"memory",
	"share",
	"inspiration",
	"feedback",
	"creditPrediction",
	"myFiles",
	"workspace",
	"window",
	"appearance",
	"app",
	"identity",
	"binary",
	"docs",
	"dialog",
	"microphone",
	"telemetry",
	"io",
	"file",
	"sandbox",
	"migration"
];
function camelToChannel(prop) {
	if (typeof prop !== "string") return;
	for (const service of KNOWN_SERVICE_PREFIXES) if (prop.startsWith(service) && prop.length > service.length) {
		const rest = prop.slice(service.length);
		return `${service}:${rest.charAt(0).toLowerCase()}${rest.slice(1)}`;
	}
}
function generateId() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function parseEnvelope(data) {
	if (isRecord(data) && typeof data.type === "string") return data;
	try {
		return JSON.parse(typeof data === "string" ? data : String(data));
	} catch {
		return null;
	}
}
function formatConnectionLostMessage(diagnosticName, closeInfo, pending, lastSent) {
	const details = [];
	if (closeInfo) details.push(formatCloseDiagnostics(closeInfo));
	details.push(`pending=${pending.length}`);
	if (pending.length > 0) details.push(`requests=${formatPendingRequests(pending)}`);
	if (lastSent) {
		const ageMs = Math.max(0, Date.now() - lastSent.sentAt);
		details.push(`last=${lastSent.channel}:${formatPayloadBytes(lastSent.payloadBytes)}:${ageMs}ms`);
	}
	return `${diagnosticName}: connection lost (${details.join("; ")})`;
}
function formatSuspendedConnectionMessage(diagnosticName, pending, lastSent) {
	const details = ["system suspend"];
	details.push(`pending=${pending.length}`);
	if (pending.length > 0) details.push(`requests=${formatPendingRequests(pending)}`);
	if (lastSent) {
		const ageMs = Math.max(0, Date.now() - lastSent.sentAt);
		details.push(`last=${lastSent.channel}:${formatPayloadBytes(lastSent.payloadBytes)}:${ageMs}ms`);
	}
	return `${diagnosticName}: connection interrupted (${details.join("; ")})`;
}
function formatPendingRequests(pending) {
	const now = Date.now();
	const preview = pending.slice(0, 3).map((req) => {
		const ageMs = Math.max(0, now - req.createdAt);
		return `${req.channel}:${formatPayloadBytes(req.payloadBytes)}:${ageMs}ms`;
	});
	if (pending.length > preview.length) preview.push(`+${pending.length - preview.length} more`);
	return preview.join(",");
}
function formatCloseDiagnostics(info) {
	if (!info) return "code=unknown,clean=unknown";
	const parts = [`code=${info.code ?? "unknown"}`, `clean=${info.wasClean ?? "unknown"}`];
	if (info.reason) parts.push(`reason=${truncate(info.reason, 120)}`);
	return parts.join(",");
}
function formatError(err) {
	return err instanceof Error ? err.message : String(err);
}
function formatPayloadBytes(bytes) {
	return bytes >= 0 ? `${bytes}B` : "unknownB";
}
function truncate(value, maxLength) {
	return value.length <= maxLength ? value : `${value.slice(0, maxLength - 1)}...`;
}
function normalizeDelay(value, fallback) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
require_react();
/**
* daemon RPC channel used to invoke the main-process network diagnostics.
*
* Registered via `server.handle(...)` in the workbuddy-server network handler and invoked
* via `rpcClient.invoke(...)` in the preload bootstrap. Not part of
* the daemon client's typed method map — intentionally Desktop-only.
*/
var RUN_NETWORK_DIAGNOSTICS_CHANNEL = "runNetworkDiagnostics";
/** Read the most recent persisted diagnostics result from disk. */
var GET_LATEST_NETWORK_DIAGNOSTICS_REPORT_CHANNEL = "getLatestNetworkDiagnosticsReport";
/** Export the latest diagnostics report to a user-chosen location. */
var EXPORT_NETWORK_DIAGNOSTICS_REPORT_CHANNEL = "exportNetworkDiagnosticsReport";
/** Reveal a specific file in the OS file manager (select + scroll into view). */
var REVEAL_NETWORK_DIAGNOSTICS_REPORT_CHANNEL = "revealNetworkDiagnosticsReport";
/** 执行全部自检检查项 */
var RUN_SELF_CHECK_CHANNEL = "self-check:run";
/** 获取当前自检运行状态（用于弹窗恢复） */
var GET_SELF_CHECK_STATE_CHANNEL = "self-check:get-state";
/** 导出自检报告到用户选择的路径 */
var EXPORT_SELF_CHECK_REPORT_CHANNEL = "self-check:export";
/** 打开自检报告目录 */
var OPEN_SELF_CHECK_DIR_CHANNEL = "self-check:open-dir";
/** 在文件管理器中定位自检报告文件 */
var LOCATE_SELF_CHECK_FILE_CHANNEL = "self-check:locate-file";
/** 获取最新自检报告信息 */
var GET_LATEST_SELF_CHECK_REPORT_CHANNEL = "self-check:get-latest";
/** 自检进度推送事件通道（Main → Renderer） */
var SELF_CHECK_PROGRESS_EVENT = "self-check:progress";
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/daemon/mcp-apps-api.ts
/** RPC channels (must mirror `@genie/workbuddy-server/mcp-apps/handlers`). */
var CHANNELS = {
	listApps: "mcpApps:listApps",
	ensureToolDiscovered: "mcpApps:ensureToolDiscovered",
	openHostApp: "mcpApps:openHostApp",
	closeHostApp: "mcpApps:closeHostApp",
	refreshToolResult: "mcpApps:refreshToolResult",
	awaitBootstrapToolResult: "mcpApps:awaitBootstrapToolResult",
	callTool: "mcpApps:callTool",
	readResource: "mcpApps:readResource",
	getToken: "mcpApps:getToken",
	appsChanged: "mcpApps:appsChanged",
	notifyToolCall: "mcpApps:notifyToolCall",
	notifyToolCallUpdate: "mcpApps:notifyToolCallUpdate",
	openHostRequested: "mcpApps:openHostRequested",
	recordModelContextUpdate: "mcpApps:recordModelContextUpdate",
	getModelContextUpdate: "mcpApps:getModelContextUpdate",
	getViewResource: "mcpApps:getViewResource",
	listTools: "mcpApps:listTools",
	listResources: "mcpApps:listResources",
	listResourceTemplates: "mcpApps:listResourceTemplates",
	listPrompts: "mcpApps:listPrompts",
	recordDiagnosticEvent: "mcpApps:recordDiagnosticEvent"
};
/**
* Per-channel RPC timeouts for the MCP Apps surface.
*
* Rationale: older `DaemonClient.invoke()` behavior used a short 30s
* request timeout, which matched exactly the server-side long-poll
* window of `pdf-server`'s `poll_pdf_commands` (`LONG_POLL_TIMEOUT_MS
* = 30_000`) and was shorter than its `get_pages` / `submit_page_data`
* budget (`GET_PAGES_TIMEOUT_MS = 45_000`). Any scheduling/serialization
* jitter on the client side could therefore produce a "client timed out
* first" race, surfaced as `DaemonClient: request timeout for
* "mcpApps:callTool" (30000ms)` in the renderer and `Received a
* response for an unknown message ID` in the webview SDK.
*
* Constants here are deliberately generous and channel-scoped so a
* future long-running MCP App (audio streaming, heavy export, remote
* tool) does not spill across onto unrelated RPCs that are expected
* to finish in <1s (e.g. `listApps`, `openHostApp`, `closeHostApp`).
*/
var MCP_APPS_CALL_TOOL_TIMEOUT_MS = 12e4;
var MCP_APPS_READ_RESOURCE_TIMEOUT_MS = 6e4;
function createMcpAppsApi(daemonClient, ensureConnected, broadcastApi) {
	const invoke = async (channel, ...args) => {
		await ensureConnected();
		return daemonClient.invoke(channel, ...args);
	};
	/**
	* Variant of `invoke` that honors a channel-specific timeout.
	* Used for tool-call / resource-read style channels where the
	* upstream MCP server is allowed to take far longer than the
	* short-hop RPC default.
	*/
	const invokeWithTimeout = async (channel, timeoutMs, ...args) => {
		await ensureConnected();
		return daemonClient.invokeWithTimeout(channel, timeoutMs, ...args);
	};
	return {
		listApps: () => invoke(CHANNELS.listApps),
		ensureToolDiscovered: (params) => invoke(CHANNELS.ensureToolDiscovered, params),
		openHostApp: (params) => invoke(CHANNELS.openHostApp, params),
		closeHostApp: (appInstanceId) => invoke(CHANNELS.closeHostApp, appInstanceId),
		refreshToolResult: (appInstanceId, toolInput) => invokeWithTimeout(CHANNELS.refreshToolResult, MCP_APPS_CALL_TOOL_TIMEOUT_MS, appInstanceId, toolInput),
		awaitBootstrapToolResult: (appInstanceId) => invokeWithTimeout(CHANNELS.awaitBootstrapToolResult, MCP_APPS_CALL_TOOL_TIMEOUT_MS, appInstanceId),
		callTool: (appInstanceId, toolName, args) => invokeWithTimeout(CHANNELS.callTool, MCP_APPS_CALL_TOOL_TIMEOUT_MS, appInstanceId, toolName, args),
		readResource: (appInstanceId, uri) => invokeWithTimeout(CHANNELS.readResource, MCP_APPS_READ_RESOURCE_TIMEOUT_MS, appInstanceId, uri),
		getToken: (appInstanceId) => invoke(CHANNELS.getToken, appInstanceId),
		onAppsChanged: (handler) => broadcastApi.$on(CHANNELS.appsChanged, (data) => {
			try {
				handler(data ?? []);
			} catch {}
		}),
		notifyToolCall: (params) => invoke(CHANNELS.notifyToolCall, params),
		notifyToolCallUpdate: (toolCallId, result) => invoke(CHANNELS.notifyToolCallUpdate, toolCallId, result),
		onOpenHostRequested: (handler) => broadcastApi.$on(CHANNELS.openHostRequested, (data) => {
			try {
				if (data && typeof data === "object") handler(data);
			} catch {}
		}),
		recordModelContextUpdate: (appInstanceId, update) => invoke(CHANNELS.recordModelContextUpdate, appInstanceId, update),
		getModelContextUpdate: (appInstanceId) => invoke(CHANNELS.getModelContextUpdate, appInstanceId),
		openApp: (params) => invoke(CHANNELS.openHostApp, params),
		closeApp: async (appInstanceId) => {
			await invoke(CHANNELS.closeHostApp, appInstanceId);
		},
		recordModelContext: (appInstanceId, update) => invoke(CHANNELS.recordModelContextUpdate, appInstanceId, update),
		getModelContext: (appInstanceId) => invoke(CHANNELS.getModelContextUpdate, appInstanceId),
		getViewResource: (appInstanceId) => invoke(CHANNELS.getViewResource, appInstanceId),
		listTools: (appInstanceId) => invoke(CHANNELS.listTools, appInstanceId),
		listResources: (appInstanceId) => invoke(CHANNELS.listResources, appInstanceId),
		listResourceTemplates: (appInstanceId) => invoke(CHANNELS.listResourceTemplates, appInstanceId),
		listPrompts: (appInstanceId) => invoke(CHANNELS.listPrompts, appInstanceId),
		recordDiagnosticEvent: (event, fields) => invoke(CHANNELS.recordDiagnosticEvent, event, fields)
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/daemon/legacy-api.ts
var HOST_EVENT_CHANNELS = /* @__PURE__ */ new Set([
	"app:openUrl",
	"app:wechatChatHistory:appendChip",
	"app:wechatChatHistory:updateChip",
	"menu:openNetworkCheck",
	"menu:openSelfCheck",
	"menu:openResourceMonitor",
	"menu:openHelpFeedback"
]);
function createDaemonClientProxy(options) {
	const { client, host, ensureConnected } = options;
	const rawApi = buildWorkbuddyDesktopClientApi(client);
	const exposed = {};
	for (const [key, mapping] of Object.entries(WORKBUDDY_DAEMON_CHANNEL_MAP)) {
		const target = getNestedProperty(rawApi, key);
		if (typeof target !== "function") continue;
		if (mapping.type === "invoke") setNestedProperty(exposed, key, async (...args) => {
			await ensureConnected();
			return target(...args);
		});
		else setNestedProperty(exposed, key, target);
	}
	exposed.$on = (channel, callback) => {
		if (channel === "binary:install-progress") return subscribeDaemonAndHostEvent(client, host, channel, callback);
		if (HOST_EVENT_CHANNELS.has(channel)) return host.events.on(channel, callback);
		return client.on(channel, callback);
	};
	exposed.$invoke = async (channel, ...args) => {
		await ensureConnected();
		return client.invoke(channel, ...args);
	};
	exposed.getConnectionSnapshot = () => client.getConnectionSnapshot();
	exposed.onConnectionChange = client.onConnectionChange.bind(client);
	exposed.consumePendingOpenUrls = async () => host.app?.consumePendingOpenUrls?.() ?? [];
	exposed.getSessionArtifacts = invoke(client, ensureConnected, "getSessionArtifacts");
	exposed.sitesDeploy = invoke(client, ensureConnected, "sites:deploy");
	exposed.sitesGetDeployHistory = invoke(client, ensureConnected, "sites:getDeployHistory");
	exposed.sitesQueryShareLink = invoke(client, ensureConnected, "sites:queryShareLink");
	exposed.sitesDestroy = invoke(client, ensureConnected, "sites:destroy");
	exposed.sitesUnpublishApplication = invoke(client, ensureConnected, "sites:unpublishApplication");
	exposed.sitesDeleteApplication = invoke(client, ensureConnected, "sites:deleteApplication");
	exposed.sitesGetApplicationList = invoke(client, ensureConnected, "sites:getApplicationList");
	exposed.sitesGetApplication = invoke(client, ensureConnected, "sites:getApplication");
	exposed.fileWatchSubscribe = invoke(client, ensureConnected, "fileWatch:subscribe");
	exposed.fileWatchUnsubscribe = invoke(client, ensureConnected, "fileWatch:unsubscribe");
	exposed.directoryWatchSubscribe = invoke(client, ensureConnected, "directoryWatch:subscribe");
	exposed.directoryWatchUnsubscribe = invoke(client, ensureConnected, "directoryWatch:unsubscribe");
	exposed.directoryWatchReleaseSession = invoke(client, ensureConnected, "directoryWatch:releaseSession");
	exposed.localExpertsGetWatchPath = invoke(client, ensureConnected, "localExperts:getWatchPath");
	exposed.localExpertsGetPluginJsonPath = invoke(client, ensureConnected, "localExperts:getPluginJsonPath");
	exposed.queueGetStatus = invoke(client, ensureConnected, "queue:getStatus");
	exposed.queueCancel = invoke(client, ensureConnected, "queue:cancel");
	exposed.monitorRecordMessageDisplay = invoke(client, ensureConnected, "monitor:recordMessageDisplay");
	exposed.monitorRecordFirstResponse = invoke(client, ensureConnected, "monitor:recordFirstResponse");
	exposed.monitorRecordHistoryLoadTiming = invoke(client, ensureConnected, "monitor:recordHistoryLoadTiming");
	exposed.monitorRecordMarketPageLoad = invoke(client, ensureConnected, "monitor:recordMarketPageLoad");
	exposed.monitorReportMetric = invoke(client, ensureConnected, "monitor:reportMetric");
	exposed.monitorSyncRendererSessionId = invoke(client, ensureConnected, "monitor:syncRendererSessionId");
	exposed.monitorReportAutoTrackEvent = invoke(client, ensureConnected, "monitor:reportAutoTrackEvent");
	exposed.reportSessionRouteState = invoke(client, ensureConnected, "sessionRuntime:updateRouteState");
	exposed.checkDesignSessionAuth = invoke(client, ensureConnected, "designAuth:checkSessionEntered");
	exposed.authorizeDesignSession = invoke(client, ensureConnected, "designAuth:authorizeSession");
	exposed.getBuiltinSkillPath = invoke(client, ensureConnected, "builtinSkills:getPath");
	exposed.readBuiltinSkillFile = invoke(client, ensureConnected, "builtinSkills:readFile");
	exposed.supportGetPresignedUrls = invoke(client, ensureConnected, "support:getPresignedUrls");
	exposed.enhancePrompt = invoke(client, ensureConnected, "llm:enhancePrompt");
	exposed.wechatGetShareTicket = invoke(client, ensureConnected, "wechat:getShareTicket");
	exposed.wechatShareLink = invoke(client, ensureConnected, "wechat:shareLink");
	exposed.wechatLaunchMiniProgram = invoke(client, ensureConnected, "wechat:launchMiniProgram");
	exposed.wechatShareMiniProgram = invoke(client, ensureConnected, "wechat:shareMiniProgram");
	exposed.wechatShareFile = invoke(client, ensureConnected, "wechat:shareFile");
	exposed.wechatShareImage = invoke(client, ensureConnected, "wechat:shareImage");
	exposed.dialogSaveImage = (dataUrl, defaultName) => host.dialog?.saveImage?.(dataUrl, defaultName) ?? Promise.resolve(null);
	exposed.executeMenuCommand = async (commandId) => {
		await ensureConnected();
		return client.invoke("executeMenuCommand", commandId);
	};
	exposed.clipboardWriteText = (text) => host.clipboard?.writeText(text) ?? Promise.resolve();
	exposed.clipboardReadText = () => host.clipboard?.readText() ?? Promise.resolve("");
	exposed.clipboardWriteImage = (dataUrl) => host.clipboard?.writeImage(dataUrl) ?? Promise.resolve();
	exposed.requestNotificationRegistration = () => host.notification?.requestRegistration() ?? Promise.resolve();
	exposed.runNetworkDiagnostics = invoke(client, ensureConnected, RUN_NETWORK_DIAGNOSTICS_CHANNEL);
	exposed.getLatestNetworkDiagnosticsReport = invoke(client, ensureConnected, GET_LATEST_NETWORK_DIAGNOSTICS_REPORT_CHANNEL);
	exposed.exportNetworkDiagnosticsReport = async (content, defaultFileName) => {
		await ensureConnected();
		return client.invoke(EXPORT_NETWORK_DIAGNOSTICS_REPORT_CHANNEL, {
			content,
			defaultFileName
		});
	};
	exposed.revealNetworkDiagnosticsReport = invoke(client, ensureConnected, REVEAL_NETWORK_DIAGNOSTICS_REPORT_CHANNEL);
	exposed.runSelfCheck = invoke(client, ensureConnected, RUN_SELF_CHECK_CHANNEL);
	exposed.getSelfCheckState = invoke(client, ensureConnected, GET_SELF_CHECK_STATE_CHANNEL);
	exposed.exportSelfCheckReport = async (content, defaultFileName) => {
		await ensureConnected();
		return client.invoke(EXPORT_SELF_CHECK_REPORT_CHANNEL, {
			content,
			defaultFileName
		});
	};
	exposed.openSelfCheckReportDir = invoke(client, ensureConnected, OPEN_SELF_CHECK_DIR_CHANNEL);
	exposed.locateSelfCheckFile = invoke(client, ensureConnected, LOCATE_SELF_CHECK_FILE_CHANNEL);
	exposed.getLatestSelfCheckReport = invoke(client, ensureConnected, GET_LATEST_SELF_CHECK_REPORT_CHANNEL);
	exposed.onSelfCheckProgress = (callback) => subscribeDaemonAndHostEvent(client, host, SELF_CHECK_PROGRESS_EVENT, callback);
	exposed.onBinaryInstallProgress = (callback) => subscribeDaemonAndHostEvent(client, host, "binary:install-progress", callback);
	exposed.onOpenNetworkCheck = (callback) => subscribeDaemonAndHostEvent(client, host, "menu:openNetworkCheck", callback);
	exposed.onOpenSelfCheck = (callback) => subscribeDaemonAndHostEvent(client, host, "menu:openSelfCheck", callback);
	exposed.onOpenResourceMonitor = (callback) => subscribeDaemonAndHostEvent(client, host, "menu:openResourceMonitor", callback);
	exposed.onOpenHelpFeedback = (callback) => subscribeDaemonAndHostEvent(client, host, "menu:openHelpFeedback", callback);
	exposed.mcpApps = createMcpAppsApi(client, ensureConnected, { $on: (channel, callback) => client.on(channel, callback) });
	return new Proxy(exposed, { get(target, prop, receiver) {
		if (typeof prop === "symbol" || prop in target) return Reflect.get(target, prop, receiver);
		const rawTarget = Reflect.get(rawApi, prop);
		if (typeof rawTarget !== "function") return rawTarget;
		if (isListenerMethod(prop)) return rawTarget;
		return async (...args) => {
			await ensureConnected();
			return rawTarget(...args);
		};
	} });
}
function subscribeDaemonAndHostEvent(client, host, channel, callback) {
	const disposeDaemon = client.on(channel, callback);
	const disposeHost = host.events.on(channel, callback);
	return () => {
		disposeDaemon();
		disposeHost();
	};
}
function invoke(client, ensureConnected, channel) {
	return async (...args) => {
		await ensureConnected();
		return client.invoke(channel, ...args);
	};
}
function getNestedProperty(obj, path) {
	return path.split(".").reduce((current, segment) => {
		if (!current || typeof current !== "object") return;
		return current[segment];
	}, obj);
}
function setNestedProperty(obj, path, value) {
	const segments = path.split(".");
	let current = obj;
	for (let i = 0; i < segments.length - 1; i += 1) {
		const segment = segments[i];
		if (!current[segment] || typeof current[segment] !== "object") current[segment] = {};
		current = current[segment];
	}
	current[segments[segments.length - 1]] = value;
}
function isListenerMethod(prop) {
	return typeof prop === "string" && /^on[A-Z]/.test(prop);
}
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/daemon/runtime.ts
var listeners = /* @__PURE__ */ new Set();
var runtime = null;
async function ensureDaemon() {
	const current = getRuntime();
	if (current.client.getState() === "connected") return;
	if (current.connectPromise) {
		await current.connectPromise;
		if (current.client.getState() !== "connected") await waitForConnected(current.client);
		return;
	}
	current.connectPromise = connectWithRetry(current).catch((error) => {
		current.connectPromise = null;
		throw error;
	});
	await current.connectPromise;
}
function getDaemonClient() {
	const current = getRuntime();
	if (!current.clientProxy) current.clientProxy = createDaemonClientProxy({
		client: current.client,
		host: current.host,
		ensureConnected: ensureDaemon
	});
	return current.clientProxy;
}
function getRuntime() {
	if (runtime) return runtime;
	const host = getDesktopHost();
	if (!host) throw new Error("WorkBuddy desktop host is unavailable");
	const client = createWorkbuddyDesktopDaemonClient({ host });
	const disposeSuspend = host.events.on(WORKBUDDY_POWER_SUSPEND_EVENT, () => {
		client.markSuspend();
	});
	const disposeResume = host.events.on(WORKBUDDY_POWER_RESUME_EVENT, () => {
		client.markResume().catch(() => void 0);
	});
	const disposeUnlockScreen = host.events.on(WORKBUDDY_POWER_UNLOCK_SCREEN_EVENT, () => {
		client.markResume().catch(() => void 0);
	});
	const notifyNetworkOnline = () => {
		client.invoke(WORKBUDDY_APP_SERVER_HOST_POWER_RPC_CHANNELS.NETWORK_ONLINE).catch(() => void 0);
	};
	window.addEventListener("online", notifyNetworkOnline);
	const disposeTipSound = host.events.on("tip-sound:play", () => {
		window.dispatchEvent(new CustomEvent("workbuddy:tip-sound-play"));
	});
	runtime = {
		host,
		client,
		connectPromise: null,
		clientProxy: null
	};
	runtime.disposeStateListener = client.onStateChange(() => notifyListeners());
	runtime.disposePowerListeners = () => {
		disposeSuspend();
		disposeResume();
		disposeUnlockScreen();
		disposeTipSound();
		window.removeEventListener("online", notifyNetworkOnline);
	};
	notifyListeners();
	return runtime;
}
async function connectWithRetry(current) {
	const maxRetries = 15;
	const baseDelayMs = 500;
	let lastError;
	for (let attempt = 1; attempt <= maxRetries; attempt += 1) try {
		await current.host.app?.getBootstrapInfo?.();
		if (current.client.getState() !== "connected") await current.client.connect({});
		return;
	} catch (error) {
		lastError = error instanceof Error ? error : new Error(String(error));
		if (attempt < maxRetries) await delay(Math.min(baseDelayMs * attempt, 3e3));
	}
	throw lastError ?? /* @__PURE__ */ new Error("WorkBuddy daemon runtime unavailable");
}
function waitForConnected(client, timeoutMs = 3e4) {
	return new Promise((resolve, reject) => {
		const state = client.getState();
		if (state === "connected") {
			resolve();
			return;
		}
		if (state === "disconnected") {
			reject(new Error(WORKBUDDY_DAEMON_CLIENT_DISCONNECTED_MESSAGE));
			return;
		}
		const timer = setTimeout(() => {
			unsubscribe();
			reject(/* @__PURE__ */ new Error("Timed out waiting for WorkBuddy daemon reconnect"));
		}, timeoutMs);
		const unsubscribe = client.onStateChange((nextState) => {
			if (nextState === "connected") {
				clearTimeout(timer);
				unsubscribe();
				resolve();
			} else if (nextState === "disconnected") {
				clearTimeout(timer);
				unsubscribe();
				reject(new Error(WORKBUDDY_DAEMON_CLIENT_DISCONNECTED_MESSAGE));
			}
		});
	});
}
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function notifyListeners() {
	for (const listener of listeners) listener();
}
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/daemon/mcp-apps-wb-api.ts
/**
* MCP Apps renderer → daemon 的当前 WB Bridge 控制面。
*
* Guest `ui/*` 协议不经过这里。
*/
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/core/scope.js
var require_scope = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = scopeFactory;
	function scopeFactory(logger) {
		return Object.defineProperties(scope, {
			defaultLabel: {
				value: "",
				writable: true
			},
			labelPadding: {
				value: true,
				writable: true
			},
			maxLabelLength: {
				value: 0,
				writable: true
			},
			labelLength: { get() {
				switch (typeof scope.labelPadding) {
					case "boolean": return scope.labelPadding ? scope.maxLabelLength : 0;
					case "number": return scope.labelPadding;
					default: return 0;
				}
			} }
		});
		function scope(label) {
			scope.maxLabelLength = Math.max(scope.maxLabelLength, label.length);
			const newScope = {};
			for (const level of logger.levels) newScope[level] = (...d) => logger.logData(d, {
				level,
				scope: label
			});
			newScope.log = newScope.info;
			return newScope;
		}
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/core/Buffering.js
var require_Buffering = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffering = class {
		constructor({ processMessage }) {
			this.processMessage = processMessage;
			this.buffer = [];
			this.enabled = false;
			this.begin = this.begin.bind(this);
			this.commit = this.commit.bind(this);
			this.reject = this.reject.bind(this);
		}
		addMessage(message) {
			this.buffer.push(message);
		}
		begin() {
			this.enabled = [];
		}
		commit() {
			this.enabled = false;
			this.buffer.forEach((item) => this.processMessage(item));
			this.buffer = [];
		}
		reject() {
			this.enabled = false;
			this.buffer = [];
		}
	};
	module.exports = Buffering;
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/core/Logger.js
var require_Logger = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var scopeFactory = require_scope();
	var Buffering = require_Buffering();
	module.exports = class Logger {
		static instances = {};
		dependencies = {};
		errorHandler = null;
		eventLogger = null;
		functions = {};
		hooks = [];
		isDev = false;
		levels = null;
		logId = null;
		scope = null;
		transports = {};
		variables = {};
		constructor({ allowUnknownLevel = false, dependencies = {}, errorHandler, eventLogger, initializeFn, isDev = false, levels = [
			"error",
			"warn",
			"info",
			"verbose",
			"debug",
			"silly"
		], logId, transportFactories = {}, variables } = {}) {
			this.addLevel = this.addLevel.bind(this);
			this.create = this.create.bind(this);
			this.initialize = this.initialize.bind(this);
			this.logData = this.logData.bind(this);
			this.processMessage = this.processMessage.bind(this);
			this.allowUnknownLevel = allowUnknownLevel;
			this.buffering = new Buffering(this);
			this.dependencies = dependencies;
			this.initializeFn = initializeFn;
			this.isDev = isDev;
			this.levels = levels;
			this.logId = logId;
			this.scope = scopeFactory(this);
			this.transportFactories = transportFactories;
			this.variables = variables || {};
			for (const name of this.levels) this.addLevel(name, false);
			this.log = this.info;
			this.functions.log = this.log;
			this.errorHandler = errorHandler;
			errorHandler?.setOptions({
				...dependencies,
				logFn: this.error
			});
			this.eventLogger = eventLogger;
			eventLogger?.setOptions({
				...dependencies,
				logger: this
			});
			for (const [name, factory] of Object.entries(transportFactories)) this.transports[name] = factory(this, dependencies);
			Logger.instances[logId] = this;
		}
		static getInstance({ logId }) {
			return this.instances[logId] || this.instances.default;
		}
		addLevel(level, index = this.levels.length) {
			if (index !== false) this.levels.splice(index, 0, level);
			this[level] = (...args) => this.logData(args, { level });
			this.functions[level] = this[level];
		}
		catchErrors(options) {
			this.processMessage({
				data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
				level: "warn"
			}, { transports: ["console"] });
			return this.errorHandler.startCatching(options);
		}
		create(options) {
			if (typeof options === "string") options = { logId: options };
			return new Logger({
				dependencies: this.dependencies,
				errorHandler: this.errorHandler,
				initializeFn: this.initializeFn,
				isDev: this.isDev,
				transportFactories: this.transportFactories,
				variables: { ...this.variables },
				...options
			});
		}
		compareLevels(passLevel, checkLevel, levels = this.levels) {
			const pass = levels.indexOf(passLevel);
			const check = levels.indexOf(checkLevel);
			if (check === -1 || pass === -1) return true;
			return check <= pass;
		}
		initialize(options = {}) {
			this.initializeFn({
				logger: this,
				...this.dependencies,
				...options
			});
		}
		logData(data, options = {}) {
			if (this.buffering.enabled) this.buffering.addMessage({
				data,
				date: /* @__PURE__ */ new Date(),
				...options
			});
			else this.processMessage({
				data,
				...options
			});
		}
		processMessage(message, { transports = this.transports } = {}) {
			if (message.cmd === "errorHandler") {
				this.errorHandler.handle(message.error, {
					errorName: message.errorName,
					processType: "renderer",
					showDialog: Boolean(message.showDialog)
				});
				return;
			}
			let level = message.level;
			if (!this.allowUnknownLevel) level = this.levels.includes(message.level) ? message.level : "info";
			const normalizedMessage = {
				date: /* @__PURE__ */ new Date(),
				logId: this.logId,
				...message,
				level,
				variables: {
					...this.variables,
					...message.variables
				}
			};
			for (const [transName, transFn] of this.transportEntries(transports)) {
				if (typeof transFn !== "function" || transFn.level === false) continue;
				if (!this.compareLevels(transFn.level, message.level)) continue;
				try {
					const transformedMsg = this.hooks.reduce((msg, hook) => {
						return msg ? hook(msg, transFn, transName) : msg;
					}, normalizedMessage);
					if (transformedMsg) transFn({
						...transformedMsg,
						data: [...transformedMsg.data]
					});
				} catch (e) {
					this.processInternalErrorFn(e);
				}
			}
		}
		processInternalErrorFn(_e) {}
		transportEntries(transports = this.transports) {
			return (Array.isArray(transports) ? transports : Object.entries(transports)).map((item) => {
				switch (typeof item) {
					case "string": return this.transports[item] ? [item, this.transports[item]] : null;
					case "function": return [item.name, item];
					default: return Array.isArray(item) ? item : null;
				}
			}).filter(Boolean);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/renderer/lib/RendererErrorHandler.js
var require_RendererErrorHandler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var consoleError = console.error;
	var RendererErrorHandler = class {
		logFn = null;
		onError = null;
		showDialog = false;
		preventDefault = true;
		constructor({ logFn = null } = {}) {
			this.handleError = this.handleError.bind(this);
			this.handleRejection = this.handleRejection.bind(this);
			this.startCatching = this.startCatching.bind(this);
			this.logFn = logFn;
		}
		handle(error, { logFn = this.logFn, errorName = "", onError = this.onError, showDialog = this.showDialog } = {}) {
			try {
				if (onError?.({
					error,
					errorName,
					processType: "renderer"
				}) !== false) logFn({
					error,
					errorName,
					showDialog
				});
			} catch {
				consoleError(error);
			}
		}
		setOptions({ logFn, onError, preventDefault, showDialog }) {
			if (typeof logFn === "function") this.logFn = logFn;
			if (typeof onError === "function") this.onError = onError;
			if (typeof preventDefault === "boolean") this.preventDefault = preventDefault;
			if (typeof showDialog === "boolean") this.showDialog = showDialog;
		}
		startCatching({ onError, showDialog } = {}) {
			if (this.isActive) return;
			this.isActive = true;
			this.setOptions({
				onError,
				showDialog
			});
			window.addEventListener("error", (event) => {
				this.preventDefault && event.preventDefault?.();
				this.handleError(event.error || event);
			});
			window.addEventListener("unhandledrejection", (event) => {
				this.preventDefault && event.preventDefault?.();
				this.handleRejection(event.reason || event);
			});
		}
		handleError(error) {
			this.handle(error, { errorName: "Unhandled" });
		}
		handleRejection(reason) {
			const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
			this.handle(error, { errorName: "Unhandled rejection" });
		}
	};
	module.exports = RendererErrorHandler;
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/core/transforms/transform.js
var require_transform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = { transform };
	function transform({ logger, message, transport, initialData = message?.data || [], transforms = transport?.transforms }) {
		return transforms.reduce((data, trans) => {
			if (typeof trans === "function") return trans({
				data,
				logger,
				message,
				transport
			});
			return data;
		}, initialData);
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/renderer/lib/transports/console.js
var require_console = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { transform } = require_transform();
	module.exports = consoleTransportRendererFactory;
	var consoleMethods = {
		error: console.error,
		warn: console.warn,
		info: console.info,
		verbose: console.info,
		debug: console.debug,
		silly: console.debug,
		log: console.log
	};
	function consoleTransportRendererFactory(logger) {
		return Object.assign(transport, {
			format: "{h}:{i}:{s}.{ms}{scope} › {text}",
			transforms: [formatDataFn],
			writeFn({ message: { level, data } }) {
				const consoleLogFn = consoleMethods[level] || consoleMethods.info;
				setTimeout(() => consoleLogFn(...data));
			}
		});
		function transport(message) {
			transport.writeFn({ message: {
				...message,
				data: transform({
					logger,
					message,
					transport
				})
			} });
		}
	}
	function formatDataFn({ data = [], logger = {}, message = {}, transport = {} }) {
		if (typeof transport.format === "function") return transport.format({
			data,
			level: message?.level || "info",
			logger,
			message,
			transport
		});
		if (typeof transport.format !== "string") return data;
		data.unshift(transport.format);
		if (typeof data[1] === "string" && data[1].match(/%[1cdfiOos]/)) data = [`${data[0]}${data[1]}`, ...data.slice(2)];
		const date = message.date || /* @__PURE__ */ new Date();
		data[0] = data[0].replace(/\{(\w+)}/g, (substring, name) => {
			switch (name) {
				case "level": return message.level;
				case "logId": return message.logId;
				case "scope": {
					const scope = message.scope || logger.scope?.defaultLabel;
					return scope ? ` (${scope})` : "";
				}
				case "text": return "";
				case "y": return date.getFullYear().toString(10);
				case "m": return (date.getMonth() + 1).toString(10).padStart(2, "0");
				case "d": return date.getDate().toString(10).padStart(2, "0");
				case "h": return date.getHours().toString(10).padStart(2, "0");
				case "i": return date.getMinutes().toString(10).padStart(2, "0");
				case "s": return date.getSeconds().toString(10).padStart(2, "0");
				case "ms": return date.getMilliseconds().toString(10).padStart(3, "0");
				case "iso": return date.toISOString();
				default: return message.variables?.[name] || substring;
			}
		}).trim();
		return data;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/renderer/lib/transports/ipc.js
var require_ipc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { transform } = require_transform();
	module.exports = ipcTransportRendererFactory;
	var RESTRICTED_TYPES = /* @__PURE__ */ new Set([
		Promise,
		WeakMap,
		WeakSet
	]);
	function ipcTransportRendererFactory(logger) {
		return Object.assign(transport, {
			depth: 5,
			transforms: [serializeFn]
		});
		function transport(message) {
			if (!window.__electronLog) {
				logger.processMessage({
					data: ["electron-log: logger isn't initialized in the main process"],
					level: "error"
				}, { transports: ["console"] });
				return;
			}
			try {
				const serialized = transform({
					initialData: message,
					logger,
					message,
					transport
				});
				__electronLog.sendToMain(serialized);
			} catch (e) {
				logger.transports.console({
					data: [
						"electronLog.transports.ipc",
						e,
						"data:",
						message.data
					],
					level: "error"
				});
			}
		}
	}
	/**
	* Is type primitive, including null and undefined
	* @param {any} value
	* @returns {boolean}
	*/
	function isPrimitive(value) {
		return Object(value) !== value;
	}
	function serializeFn({ data, depth, seen = /* @__PURE__ */ new WeakSet(), transport = {} } = {}) {
		const actualDepth = depth || transport.depth || 5;
		if (seen.has(data)) return "[Circular]";
		if (actualDepth < 1) {
			if (isPrimitive(data)) return data;
			if (Array.isArray(data)) return "[Array]";
			return `[${typeof data}]`;
		}
		if (["function", "symbol"].includes(typeof data)) return data.toString();
		if (isPrimitive(data)) return data;
		if (RESTRICTED_TYPES.has(data.constructor)) return `[${data.constructor.name}]`;
		if (Array.isArray(data)) return data.map((item) => serializeFn({
			data: item,
			depth: actualDepth - 1,
			seen
		}));
		if (data instanceof Date) return data.toISOString();
		if (data instanceof Error) return data.stack;
		if (data instanceof Map) return new Map(Array.from(data).map(([key, value]) => [serializeFn({
			data: key,
			depth: actualDepth - 1,
			seen
		}), serializeFn({
			data: value,
			depth: actualDepth - 1,
			seen
		})]));
		if (data instanceof Set) return new Set(Array.from(data).map((val) => serializeFn({
			data: val,
			depth: actualDepth - 1,
			seen
		})));
		seen.add(data);
		return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, serializeFn({
			data: value,
			depth: actualDepth - 1,
			seen
		})]));
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/electron-log@5.4.3/node_modules/electron-log/src/renderer/index.js
var require_renderer$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var import_dist = /* @__PURE__ */ __toESM(require_dist());
	var Logger = require_Logger();
	var RendererErrorHandler = require_RendererErrorHandler();
	var transportConsole = require_console();
	var transportIpc = require_ipc();
	if (typeof import_dist.default === "object" && import_dist.default.type === "browser") console.warn("electron-log/renderer is loaded in the main process. It could cause unexpected behaviour.");
	module.exports = createLogger();
	module.exports.Logger = Logger;
	module.exports.default = module.exports;
	function createLogger() {
		const logger = new Logger({
			allowUnknownLevel: true,
			errorHandler: new RendererErrorHandler(),
			initializeFn: () => {},
			logId: "default",
			transportFactories: {
				console: transportConsole,
				ipc: transportIpc
			},
			variables: { processType: "renderer" }
		});
		logger.errorHandler.setOptions({ logFn({ error, errorName, showDialog }) {
			logger.transports.console({
				data: [errorName, error].filter(Boolean),
				level: "error"
			});
			logger.transports.ipc({
				cmd: "errorHandler",
				error: {
					cause: error?.cause,
					code: error?.code,
					name: error?.name,
					message: error?.message,
					stack: error?.stack
				},
				errorName,
				logId: logger.logId,
				showDialog
			});
		} });
		if (typeof window === "object") window.addEventListener("message", (event) => {
			const { cmd, logId, ...message } = event.data || {};
			const instance = Logger.getInstance({ logId });
			if (cmd === "message") instance.processMessage(message, { transports: ["console"] });
		});
		return new Proxy(logger, { get(target, prop) {
			if (typeof target[prop] !== "undefined") return target[prop];
			return (...data) => logger.logData(data, { level: prop });
		} });
	}
}));
//#endregion
//#region ../../packages/workbuddy-app/src/core/renderer-logger.ts
var import_renderer = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_renderer$1();
})))());
/**
* 创建一个 scoped renderer logger。
*
* 所有日志会通过 electron-log renderer transport 转发到 main 进程，
* 最终落盘到 `~/.workbuddy/logs/main.log`（scope 会作为前缀出现在日志行中）。
*
* @param scope 日志 scope，建议使用小写短横线命名，例如 `queue-diag` / `renderer` / `agent-ui`。
*/
function createRendererLogger(scope) {
	return import_renderer.default.scope(scope);
}
/**
* 创建一个适配 AgentClient / 类似三方库的 logger。
*
* 内部仍然走 `createRendererLogger`，只是把 `log` 映射成 `info`，
* 对齐大多数 JS 生态 logger 的命名习惯。
*/
function createAgentClientLogger(scope) {
	const scoped = createRendererLogger(scope);
	return {
		log: (...args) => scoped.info(...args),
		info: (...args) => scoped.info(...args),
		warn: (...args) => scoped.warn(...args),
		error: (...args) => scoped.error(...args),
		debug: (...args) => scoped.debug(...args)
	};
}
//#endregion
//#region ../../packages/workbuddy-app/src/tencent-docs/renderer/preview-runtime.ts
var import_preview_runtime = (/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_TENCENT_DOCS_PREVIEW_LOCALE = void 0;
	exports.resolveTencentDocsPreviewLocale = resolveTencentDocsPreviewLocale;
	exports.isTencentDocsLocalSdkPreviewUrl = isTencentDocsLocalSdkPreviewUrl;
	exports.appendTencentDocsLocalSdkPreviewParams = appendTencentDocsLocalSdkPreviewParams;
	exports.buildTencentDocsPreviewThemeMessage = buildTencentDocsPreviewThemeMessage;
	exports.buildTencentDocsPreviewLocaleMessage = buildTencentDocsPreviewLocaleMessage;
	exports.DEFAULT_TENCENT_DOCS_PREVIEW_LOCALE = "zh-CN";
	var TENCENT_DOCS_PREVIEW_LOCALE_BY_APP_LOCALE = {
		zh: "zh-CN",
		"zh-cn": "zh-CN",
		en: "en-US",
		"en-us": "en-US"
	};
	var TENCENT_DOCS_LOCAL_SDK_PREVIEW_PATH_PATTERN = /^\/static\/(?:doc|sheet|slide|pdf)\/pc\.html$/;
	function resolveTencentDocsPreviewLocale(locale) {
		const normalizedLocale = locale?.trim().toLowerCase();
		if (!normalizedLocale) return exports.DEFAULT_TENCENT_DOCS_PREVIEW_LOCALE;
		return TENCENT_DOCS_PREVIEW_LOCALE_BY_APP_LOCALE[normalizedLocale] ?? exports.DEFAULT_TENCENT_DOCS_PREVIEW_LOCALE;
	}
	function isTencentDocsLocalSdkPreviewUrl(value) {
		try {
			const url = typeof value === "string" ? new URL(value) : value;
			return url.protocol === "http:" && (url.hostname === "127.0.0.1" || url.hostname === "localhost") && TENCENT_DOCS_LOCAL_SDK_PREVIEW_PATH_PATTERN.test(url.pathname);
		} catch {
			return false;
		}
	}
	function appendTencentDocsLocalSdkPreviewParams(src, params) {
		try {
			const url = new URL(src);
			if (!isTencentDocsLocalSdkPreviewUrl(url)) return src;
			if (params.theme) {
				url.searchParams.set("theme", params.theme);
				url.searchParams.set("colorScheme", params.theme);
				url.searchParams.set("workbuddyTheme", params.theme);
			}
			if (params.locale) url.searchParams.set("lng", params.locale);
			return url.toString();
		} catch {
			return src;
		}
	}
	function buildTencentDocsPreviewThemeMessage(theme) {
		return {
			type: "workbuddy:themeChanged",
			theme,
			colorScheme: theme,
			shouldUseDarkColors: theme === "dark"
		};
	}
	function buildTencentDocsPreviewLocaleMessage(locale) {
		return {
			type: "workbuddy:localeChanged",
			locale,
			language: locale,
			lng: locale
		};
	}
})))();
//#endregion
//#region ../../packages/workbuddy-app/src/tencent-docs/renderer/local-docs-facade.ts
var TAG = "[TencentDocsLocalDocsFacade]";
/**
* 通过 daemon 持有本地文档预览状态单例，避免 renderer/main/daemon 各自维护一份文档状态。
* `localDocs:*` 方法保持 JSON 可序列化；真正不能跨进程序列化的渲染辅助留在本文件本地实现。
*/
function invokeLocalDocsDaemon(daemonClient, command, args) {
	if (typeof daemonClient.$invoke !== "function") return Promise.reject(/* @__PURE__ */ new Error(`${TAG} daemon invoke unavailable for ${command}`));
	return daemonClient.$invoke(command, ...args);
}
function asRegisterLocalMediaArtifactResult(value) {
	if (value && typeof value === "object" && "success" in value) return value;
	return {
		success: false,
		error: "empty result"
	};
}
/**
* registerMediaArtifact 依赖 app-server 的 MediaArtifactService，不能由 renderer 自己补齐。
* 这里保留为 localDocs facade 的一部分，但实际注册仍路由到 daemon `localDocs:registerMediaArtifact`。
*/
async function registerLocalMediaArtifact(daemonClient, params) {
	if (typeof daemonClient.$invoke !== "function") return {
		success: false,
		error: "$invoke not supported by daemon client"
	};
	try {
		return asRegisterLocalMediaArtifactResult(await daemonClient.$invoke("localDocs:registerMediaArtifact", {
			sessionId: params.sessionId,
			filePath: params.filePath
		}));
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error)
		};
	}
}
/**
* iframe 初始化需要函数型 decorateUrl 和 postMessage payload，不能通过 daemon RPC 返回。
* 因此只有这部分保留在 renderer，本地根据语言和主题生成预览参数。
*/
function getLocalDocsFrameOptions(options) {
	const previewLocale = (0, import_preview_runtime.resolveTencentDocsPreviewLocale)(options?.locale);
	const previewTheme = options?.theme === "dark" ? "dark" : "light";
	return {
		decorateUrl: (url) => (0, import_preview_runtime.appendTencentDocsLocalSdkPreviewParams)(url, {
			locale: previewLocale,
			theme: previewTheme
		}),
		messages: [(0, import_preview_runtime.buildTencentDocsPreviewThemeMessage)(previewTheme), (0, import_preview_runtime.buildTencentDocsPreviewLocaleMessage)(previewLocale)],
		decorateUrlKey: `${previewTheme}:${previewLocale}`
	};
}
/**
* Desktop 端 localDocs facade。
*
* adapter/provider 主流程只负责挂载这个 facade；文档领域的 RPC 命令表、预览 URL 装饰
* 和媒体 artifact 注册都收敛在 Tencent Docs renderer 模块内。
*/
function createLocalDocsFacade(daemonClient, nativeDialogOwner) {
	const invokeDaemon = (command, args) => invokeLocalDocsDaemon(daemonClient, command, args);
	const withDialogOwner = (options) => nativeDialogOwner ? {
		...options ?? {},
		nativeDialogOwner
	} : options;
	return {
		createOfficeUntitledFile: (params) => invokeDaemon("localDocs:createOfficeUntitledFile", [params]),
		deleteOfficeUntitledFile: (filePath) => invokeDaemon("localDocs:deleteOfficeUntitledFile", [filePath]),
		checkOpen: (filePath, options) => invokeDaemon("localDocs:checkOpen", [filePath, options]),
		filterAiServiceFilePaths: (filePaths) => invokeDaemon("localDocs:filterAiServiceFilePaths", [filePaths]),
		getPreviewUrl: (filePath, options) => invokeDaemon("localDocs:getPreviewUrl", [filePath, options]),
		releaseContext: (documentResourceUri, options) => invokeDaemon("localDocs:releaseContext", [documentResourceUri, withDialogOwner(options)]),
		saveContext: (documentResourceUri, options) => invokeDaemon("localDocs:saveContext", [documentResourceUri, withDialogOwner(options)]),
		forceReleaseContext: (documentResourceUri) => invokeDaemon("localDocs:forceReleaseContext", [documentResourceUri]),
		evictSession: (sessionId) => invokeDaemon("localDocs:evictSession", [sessionId]),
		rebindSession: (fromSessionId, toSessionId, options) => invokeDaemon("localDocs:rebindSession", [
			fromSessionId,
			toSessionId,
			options
		]),
		getDirty: (documentResourceUri) => invokeDaemon("localDocs:getDirty", [documentResourceUri]),
		releaseContextIfClean: (documentResourceUri, options) => invokeDaemon("localDocs:releaseContextIfClean", [documentResourceUri, options]),
		activateContext: (documentResourceUri, sessionId) => invokeDaemon("localDocs:activateContext", [documentResourceUri, sessionId]),
		setForegroundSession: (sessionId) => invokeDaemon("localDocs:setForegroundSession", [sessionId]),
		registerMediaArtifact: (params) => registerLocalMediaArtifact(daemonClient, params),
		getFrameOptions: getLocalDocsFrameOptions,
		autoSaveContext: (documentResourceUri) => invokeDaemon("localDocs:autoSaveContext", [documentResourceUri]),
		reconcileOrphanPreviews: () => invokeDaemon("localDocs:reconcileOrphanPreviews", [])
	};
}
//#endregion
export { ensureDaemon as a, createRendererLogger as i, import_preview_runtime as n, getDaemonClient as o, createAgentClientLogger as r, isTransientDisconnectError as s, createLocalDocsFacade as t };
