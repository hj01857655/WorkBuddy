const require_contract = require("./contract.js");
const require_contract$1 = require("./contract2.js");
const require_contract$2 = require("./contract3.js");
const require_contract$3 = require("./contract4.js");
const require_contract$4 = require("./contract5.js");
//#region ../../packages/workbuddy-server/src/client/channel-map-helpers.ts
function invoke(channel, timeout) {
	return typeof timeout === "number" ? {
		type: "invoke",
		channel,
		timeout
	} : {
		type: "invoke",
		channel
	};
}
function listener(channel) {
	return {
		type: "listener",
		channel
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/agent-im/contract.ts
var AGENT_IM_RPC_CHANNELS = {
	LIST_BINDINGS: "agentIm:listBindings",
	GET_BINDING: "agentIm:getBinding",
	WECHATBOT_PREBIND_CHECK: "agentIm:wechatBotPrebindCheck",
	WECHATBOT_START_BIND: "agentIm:wechatBotStartBind",
	WECHATBOT_GET_BIND_STATUS: "agentIm:wechatBotGetBindStatus",
	WECHATBOT_UNBIND: "agentIm:wechatBotUnbind",
	QQ_START_BIND: "agentIm:qqStartBind",
	QQ_GET_BIND_STATUS: "agentIm:qqGetBindStatus",
	QQ_MANUAL_BIND: "agentIm:qqManualBind",
	QQ_CANCEL_BIND: "agentIm:qqCancelBind",
	QQ_UNBIND: "agentIm:qqUnbind",
	QQ_QR_UPDATE: "agentIm:qqQrUpdate",
	QQ_QR_EXPIRED: "agentIm:qqQrExpired",
	QQ_BIND_SUCCESS: "agentIm:qqBindSuccess",
	QQ_BIND_FAILED: "agentIm:qqBindFailed"
};
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
	agentImListBindings: invoke(AGENT_IM_RPC_CHANNELS.LIST_BINDINGS),
	agentImGetBinding: invoke(AGENT_IM_RPC_CHANNELS.GET_BINDING),
	agentImWechatBotPrebindCheck: invoke(AGENT_IM_RPC_CHANNELS.WECHATBOT_PREBIND_CHECK),
	agentImWechatBotStartBind: invoke(AGENT_IM_RPC_CHANNELS.WECHATBOT_START_BIND),
	agentImWechatBotGetBindStatus: invoke(AGENT_IM_RPC_CHANNELS.WECHATBOT_GET_BIND_STATUS),
	agentImWechatBotUnbind: invoke(AGENT_IM_RPC_CHANNELS.WECHATBOT_UNBIND)
};
//#endregion
//#region ../../packages/workbuddy-server/src/asr/contract.ts
var ASR_RPC_CHANNELS = {
	SPEECH_TO_TEXT: "asr:speechToText",
	SPEECH_TO_TEXT_STREAM: "asr:speechToTextStream",
	SPEECH_TO_TEXT_STREAM_RESULT: "asr:speechToTextStreamResult"
};
//#endregion
//#region ../../packages/workbuddy-server/src/asr/client.ts
var ASR_CHANNEL_MAP = {
	speechToText: invoke(ASR_RPC_CHANNELS.SPEECH_TO_TEXT),
	speechToTextStream: invoke(ASR_RPC_CHANNELS.SPEECH_TO_TEXT_STREAM),
	onSpeechToTextStreamResult: listener(ASR_RPC_CHANNELS.SPEECH_TO_TEXT_STREAM_RESULT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/auth/client.ts
/** Checkin RPC timeout (ms). Backend may respond slowly during peak hours. */
var CHECKIN_RPC_TIMEOUT_MS = 15e3;
var AUTH_CHANNEL_MAP = {
	login: invoke(require_contract.AUTH_RPC_CHANNELS.LOGIN),
	logout: invoke(require_contract.AUTH_RPC_CHANNELS.LOGOUT),
	getAccount: invoke(require_contract.AUTH_RPC_CHANNELS.GET_ACCOUNT),
	getToken: invoke(require_contract.AUTH_RPC_CHANNELS.GET_TOKEN),
	getUserInfo: invoke(require_contract.AUTH_RPC_CHANNELS.GET_USER_INFO),
	authRefreshToken: invoke(require_contract.AUTH_RPC_CHANNELS.REFRESH_TOKEN),
	authRefreshSession: invoke(require_contract.AUTH_RPC_CHANNELS.REFRESH_SESSION),
	authGetAccountUsage: invoke(require_contract.AUTH_RPC_CHANNELS.GET_ACCOUNT_USAGE),
	authUpdateAccountNickname: invoke(require_contract.AUTH_RPC_CHANNELS.UPDATE_ACCOUNT_NICKNAME),
	authGetOauthUser: invoke(require_contract.AUTH_RPC_CHANNELS.GET_OAUTH_USER),
	authSaveOauthToken: invoke(require_contract.AUTH_RPC_CHANNELS.SAVE_OAUTH_TOKEN),
	authRevokeAll: invoke(require_contract.AUTH_RPC_CHANNELS.REVOKE_ALL),
	authGetRepoList: invoke(require_contract.AUTH_RPC_CHANNELS.GET_REPO_LIST),
	authGetFile: invoke(require_contract.AUTH_RPC_CHANNELS.GET_FILE),
	authGetBranches: invoke(require_contract.AUTH_RPC_CHANNELS.GET_BRANCHES),
	authGetRepositories: invoke(require_contract.AUTH_RPC_CHANNELS.GET_REPOSITORIES),
	authGetEnterpriseUsage: invoke(require_contract.AUTH_RPC_CHANNELS.GET_ENTERPRISE_USAGE),
	authGetCheckinStatus: invoke(require_contract.AUTH_RPC_CHANNELS.GET_CHECKIN_STATUS, CHECKIN_RPC_TIMEOUT_MS),
	authClaimDailyCheckin: invoke(require_contract.AUTH_RPC_CHANNELS.CLAIM_DAILY_CHECKIN, CHECKIN_RPC_TIMEOUT_MS),
	authGetActivityBanner: invoke(require_contract.AUTH_RPC_CHANNELS.GET_ACTIVITY_BANNER),
	authGetAmbassadorStatus: invoke(require_contract.AUTH_RPC_CHANNELS.GET_AMBASSADOR_STATUS),
	authSavePendingInput: invoke(require_contract.AUTH_RPC_CHANNELS.SAVE_PENDING_INPUT),
	authLoadPendingInput: invoke(require_contract.AUTH_RPC_CHANNELS.LOAD_PENDING_INPUT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/automation/contract.ts
var AUTOMATION_RPC_CHANNELS = {
	GET_SNAPSHOT: "automation:getSnapshot",
	UPDATE: "automation:update",
	DELETE: "automation:delete",
	TEST: "automation:test",
	ARCHIVE_INBOX_ITEM: "automation:archiveInboxItem",
	DELETE_INBOX_ITEM: "automation:deleteInboxItem",
	SNAPSHOT_UPDATE: "automation:snapshotUpdate"
};
function createEmptyAutomationSnapshot() {
	return {
		automations: [],
		inbox: [],
		runtimeState: {},
		updatedAt: Date.now()
	};
}
function createAutomationUnavailableResult(message = "Automation service not initialized") {
	return {
		success: false,
		message
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/automation/client.ts
var AUTOMATION_CHANNEL_MAP = {
	automationGetSnapshot: invoke(AUTOMATION_RPC_CHANNELS.GET_SNAPSHOT),
	automationUpdate: invoke(AUTOMATION_RPC_CHANNELS.UPDATE),
	automationDelete: invoke(AUTOMATION_RPC_CHANNELS.DELETE),
	automationTest: invoke(AUTOMATION_RPC_CHANNELS.TEST),
	automationArchiveInboxItem: invoke(AUTOMATION_RPC_CHANNELS.ARCHIVE_INBOX_ITEM),
	automationDeleteInboxItem: invoke(AUTOMATION_RPC_CHANNELS.DELETE_INBOX_ITEM),
	onAutomationSnapshotUpdate: listener(AUTOMATION_RPC_CHANNELS.SNAPSHOT_UPDATE)
};
//#endregion
//#region ../../packages/workbuddy-server/src/claw/contract.ts
var CLAW_RPC_CHANNELS = {
	GET_IS_IOA_MACHINE: "claw:getIsIOAMachine",
	GET_IOA_IM_OVERRIDE: "claw:getIOAImOverride",
	GET_CHANNEL_STATUS: "claw:getChannelStatus",
	GET_SAVED_CHANNEL_CONFIGS: "claw:getSavedChannelConfigs",
	GET_SAVED_CHANNELS: "claw:getSavedChannels",
	REGISTER_CHANNEL: "claw:registerChannel",
	UNREGISTER_CHANNEL: "claw:unregisterChannel",
	GET_WECOM_ENABLED: "claw:getWecomEnabled",
	SET_WECOM_ENABLED: "claw:setWecomEnabled",
	GET_WECHATMP_ENABLED: "claw:getWechatmpEnabled",
	SET_WECHATMP_ENABLED: "claw:setWechatmpEnabled",
	GET_WECHATMP_ARTIFACT_UPLOAD_ENABLED: "claw:getWechatmpArtifactUploadEnabled",
	SET_WECHATMP_ARTIFACT_UPLOAD_ENABLED: "claw:setWechatmpArtifactUploadEnabled",
	WECHATKF_GET_LINK: "claw:wechatkfGetLink",
	WECHATKF_GET_BIND_STATUS: "claw:wechatkfGetBindStatus",
	WECHATKF_UNBIND: "claw:wechatkfUnbind",
	WEIXIN_QR_START: "claw:weixinQrStart",
	WEIXIN_QR_WAIT: "claw:weixinQrWait",
	WECHATMP_DEVICE_AUTH_CODE: "claw:wechatmpDeviceAuthCode",
	YUANBAO_SCAN_BIND_CODE: "claw:yuanbaoScanBindCode",
	YUANBAO_CHECK_SCAN_BIND_STATUS: "claw:yuanbaoCheckScanBindStatus",
	GET_AUTOMATION_WECOM_WEBHOOK_URL: "claw:getAutomationWecomWebhookUrl",
	SET_AUTOMATION_WECOM_WEBHOOK_URL: "claw:setAutomationWecomWebhookUrl",
	TEST_AUTOMATION_WECOM_WEBHOOK: "claw:testAutomationWecomWebhook",
	GET_AUTOMATION_WECOM_PUSH_CONFIG: "claw:getAutomationWecomPushConfig",
	SET_AUTOMATION_WECOM_PUSH_CONFIG: "claw:setAutomationWecomPushConfig",
	GET_LATEST_SESSION: "claw:getLatestSession",
	NOTIFY_SESSION_ACTIVE: "claw:notifySessionActive",
	/** Push event: channel status changed (server → client) */
	CHANNEL_STATUS_CHANGE: "claw:channelStatusChange",
	/** Push event: channel config saved (server → client) */
	CHANNEL_CONFIG_SAVED: "claw:channelConfigSaved",
	/** Push event: WeChat KF bind success (server → client) */
	WECHATKF_BIND_SUCCESS: "claw:wechatkfBindSuccess"
};
//#endregion
//#region ../../packages/workbuddy-server/src/claw/client.ts
var CLAW_CHANNEL_MAP = {
	clawGetIsIOAMachine: invoke(CLAW_RPC_CHANNELS.GET_IS_IOA_MACHINE),
	clawGetIOAImOverride: invoke(CLAW_RPC_CHANNELS.GET_IOA_IM_OVERRIDE),
	clawGetChannelStatus: invoke(CLAW_RPC_CHANNELS.GET_CHANNEL_STATUS),
	clawGetSavedChannelConfigs: invoke(CLAW_RPC_CHANNELS.GET_SAVED_CHANNEL_CONFIGS),
	clawGetSavedChannels: invoke(CLAW_RPC_CHANNELS.GET_SAVED_CHANNELS),
	clawRegisterChannel: invoke(CLAW_RPC_CHANNELS.REGISTER_CHANNEL),
	clawUnregisterChannel: invoke(CLAW_RPC_CHANNELS.UNREGISTER_CHANNEL),
	clawGetWecomEnabled: invoke(CLAW_RPC_CHANNELS.GET_WECOM_ENABLED),
	clawSetWecomEnabled: invoke(CLAW_RPC_CHANNELS.SET_WECOM_ENABLED),
	clawGetWechatmpEnabled: invoke(CLAW_RPC_CHANNELS.GET_WECHATMP_ENABLED),
	clawSetWechatmpEnabled: invoke(CLAW_RPC_CHANNELS.SET_WECHATMP_ENABLED),
	clawGetWechatmpArtifactUploadEnabled: invoke(CLAW_RPC_CHANNELS.GET_WECHATMP_ARTIFACT_UPLOAD_ENABLED),
	clawSetWechatmpArtifactUploadEnabled: invoke(CLAW_RPC_CHANNELS.SET_WECHATMP_ARTIFACT_UPLOAD_ENABLED),
	clawWechatkfGetLink: invoke(CLAW_RPC_CHANNELS.WECHATKF_GET_LINK),
	clawWechatkfGetBindStatus: invoke(CLAW_RPC_CHANNELS.WECHATKF_GET_BIND_STATUS),
	clawWechatkfUnbind: invoke(CLAW_RPC_CHANNELS.WECHATKF_UNBIND),
	clawWeixinQrStart: invoke(CLAW_RPC_CHANNELS.WEIXIN_QR_START),
	clawWeixinQrWait: invoke(CLAW_RPC_CHANNELS.WEIXIN_QR_WAIT),
	clawWechatmpDeviceAuthCode: invoke(CLAW_RPC_CHANNELS.WECHATMP_DEVICE_AUTH_CODE),
	clawYuanbaoScanBindCode: invoke(CLAW_RPC_CHANNELS.YUANBAO_SCAN_BIND_CODE),
	clawYuanbaoCheckScanBindStatus: invoke(CLAW_RPC_CHANNELS.YUANBAO_CHECK_SCAN_BIND_STATUS),
	clawGetAutomationWecomWebhookUrl: invoke(CLAW_RPC_CHANNELS.GET_AUTOMATION_WECOM_WEBHOOK_URL),
	clawSetAutomationWecomWebhookUrl: invoke(CLAW_RPC_CHANNELS.SET_AUTOMATION_WECOM_WEBHOOK_URL),
	clawTestAutomationWecomWebhook: invoke(CLAW_RPC_CHANNELS.TEST_AUTOMATION_WECOM_WEBHOOK),
	clawGetAutomationWecomPushConfig: invoke(CLAW_RPC_CHANNELS.GET_AUTOMATION_WECOM_PUSH_CONFIG),
	clawSetAutomationWecomPushConfig: invoke(CLAW_RPC_CHANNELS.SET_AUTOMATION_WECOM_PUSH_CONFIG),
	clawGetLatestSession: invoke(CLAW_RPC_CHANNELS.GET_LATEST_SESSION),
	clawNotifySessionActive: invoke(CLAW_RPC_CHANNELS.NOTIFY_SESSION_ACTIVE),
	onClawChannelStatusChange: listener(CLAW_RPC_CHANNELS.CHANNEL_STATUS_CHANGE),
	onClawChannelConfigSaved: listener(CLAW_RPC_CHANNELS.CHANNEL_CONFIG_SAVED),
	onClawWechatkfBindSuccess: listener(CLAW_RPC_CHANNELS.WECHATKF_BIND_SUCCESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/cloud-agent/contract.ts
var CLOUD_AGENT_RPC_CHANNELS = {
	INIT_ORCHESTRATOR: "cloudAgent:initOrchestrator",
	CREATE_AGENT: "cloudAgent:createAgent",
	GET_AGENT: "cloudAgent:getAgent",
	VALIDATE_FIELD: "cloudAgent:validateField",
	GET_QUOTA: "cloudAgent:getQuota",
	DELETE_AGENT: "cloudAgent:deleteAgent",
	PIN_AGENT: "cloudAgent:pinAgent",
	UNPIN_AGENT: "cloudAgent:unpinAgent",
	CLONE_AGENT: "cloudAgent:cloneAgent",
	PUBLISH_VERSION: "cloudAgent:publishVersion",
	LIST_GRANTED_AGENTS: "cloudAgent:listGrantedAgents",
	LIST_ENTERPRISE_PUBLISHED_AGENTS: "cloudAgent:listEnterprisePublishedAgents",
	GET_ENTERPRISE_AGENT_MARKET: "cloudAgent:getEnterpriseAgentMarket",
	LIST_AVAILABLE_MODELS: "cloudAgent:listAvailableModels",
	/** @deprecated 使用 CREATE_CONVERSATION */
	CREATE_INSTANCE: "cloudAgent:createInstance",
	/** @deprecated 使用 GET_CONVERSATION_DETAIL */
	GET_INSTANCE: "cloudAgent:getInstance",
	/** @deprecated 新体系不需要 rebuild */
	REBUILD_INSTANCE: "cloudAgent:rebuildInstance",
	/** @deprecated 使用 LIST_CONVERSATIONS */
	LIST_INSTANCES: "cloudAgent:listInstances",
	/** @deprecated 使用 DELETE_CONVERSATION */
	DELETE_INSTANCE: "cloudAgent:deleteInstance",
	CREATE_CONVERSATION: "cloudAgent:createConversation",
	GET_CONVERSATION_DETAIL: "cloudAgent:getConversationDetail",
	LIST_CONVERSATIONS: "cloudAgent:listConversations",
	LIST_USER_CONVERSATIONS: "cloudAgent:listUserConversations",
	DELETE_CONVERSATION: "cloudAgent:deleteConversation",
	UNARCHIVE_CONVERSATION: "cloudAgent:unarchiveConversation",
	ARCHIVE_CONVERSATION: "cloudAgent:archiveConversation",
	UPDATE_CONVERSATION: "cloudAgent:updateConversation",
	GET_SANDBOX_SESSION: "cloudAgent:getSandboxSession",
	CREATE_CONVERSATION_SESSION: "cloudAgent:createConversationSession",
	DELETE_CONVERSATION_SESSION: "cloudAgent:deleteConversationSession",
	GET_CONVERSATION: "cloudAgent:getConversation",
	UPLOAD_AVATAR: "cloudAgent:uploadAvatar",
	CREATE_ENTERPRISE_CONVERSATION: "cloudAgent:createEnterpriseConversation"
};
//#endregion
//#region ../../packages/workbuddy-server/src/cloud-agent/client.ts
var CLOUD_AGENT_CHANNEL_MAP = {
	cloudAgentInitOrchestrator: invoke(CLOUD_AGENT_RPC_CHANNELS.INIT_ORCHESTRATOR),
	cloudAgentCreateAgent: invoke(CLOUD_AGENT_RPC_CHANNELS.CREATE_AGENT),
	cloudAgentGetAgent: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_AGENT),
	cloudAgentValidateField: invoke(CLOUD_AGENT_RPC_CHANNELS.VALIDATE_FIELD),
	cloudAgentGetQuota: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_QUOTA),
	cloudAgentDeleteAgent: invoke(CLOUD_AGENT_RPC_CHANNELS.DELETE_AGENT),
	cloudAgentPinAgent: invoke(CLOUD_AGENT_RPC_CHANNELS.PIN_AGENT),
	cloudAgentUnpinAgent: invoke(CLOUD_AGENT_RPC_CHANNELS.UNPIN_AGENT),
	cloudAgentCloneAgent: invoke(CLOUD_AGENT_RPC_CHANNELS.CLONE_AGENT),
	cloudAgentPublishVersion: invoke(CLOUD_AGENT_RPC_CHANNELS.PUBLISH_VERSION),
	cloudAgentListGrantedAgents: invoke(CLOUD_AGENT_RPC_CHANNELS.LIST_GRANTED_AGENTS),
	cloudAgentListEnterprisePublishedAgents: invoke(CLOUD_AGENT_RPC_CHANNELS.LIST_ENTERPRISE_PUBLISHED_AGENTS),
	cloudAgentGetEnterpriseAgentMarket: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_ENTERPRISE_AGENT_MARKET),
	cloudAgentCreateInstance: invoke(CLOUD_AGENT_RPC_CHANNELS.CREATE_INSTANCE),
	cloudAgentGetInstance: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_INSTANCE),
	cloudAgentRebuildInstance: invoke(CLOUD_AGENT_RPC_CHANNELS.REBUILD_INSTANCE),
	cloudAgentListInstances: invoke(CLOUD_AGENT_RPC_CHANNELS.LIST_INSTANCES),
	cloudAgentDeleteInstance: invoke(CLOUD_AGENT_RPC_CHANNELS.DELETE_INSTANCE),
	cloudAgentCreateConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.CREATE_CONVERSATION),
	cloudAgentGetConversationDetail: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_CONVERSATION_DETAIL),
	cloudAgentListConversations: invoke(CLOUD_AGENT_RPC_CHANNELS.LIST_CONVERSATIONS),
	cloudAgentListUserConversations: invoke(CLOUD_AGENT_RPC_CHANNELS.LIST_USER_CONVERSATIONS),
	cloudAgentDeleteConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.DELETE_CONVERSATION),
	cloudAgentUnarchiveConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.UNARCHIVE_CONVERSATION),
	cloudAgentArchiveConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.ARCHIVE_CONVERSATION),
	cloudAgentUpdateConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.UPDATE_CONVERSATION),
	cloudAgentGetSandboxSession: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_SANDBOX_SESSION),
	cloudAgentCreateConversationSession: invoke(CLOUD_AGENT_RPC_CHANNELS.CREATE_CONVERSATION_SESSION),
	cloudAgentDeleteConversationSession: invoke(CLOUD_AGENT_RPC_CHANNELS.DELETE_CONVERSATION_SESSION),
	cloudAgentGetConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.GET_CONVERSATION),
	cloudAgentUploadAvatar: invoke(CLOUD_AGENT_RPC_CHANNELS.UPLOAD_AVATAR),
	cloudAgentCreateEnterpriseConversation: invoke(CLOUD_AGENT_RPC_CHANNELS.CREATE_ENTERPRISE_CONVERSATION)
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
	cloudAssistantGetEntitlement: invoke(CLOUD_ASSISTANT_RPC_CHANNELS.GET_ENTITLEMENT),
	cloudAssistantInitializeOrchestrator: invoke(CLOUD_ASSISTANT_RPC_CHANNELS.INITIALIZE_ORCHESTRATOR)
};
//#endregion
//#region ../../packages/workbuddy-server/src/app/contract.ts
var APP_RPC_CHANNELS = {
	GET_VERSION: "app:getVersion",
	GET_PLATFORM: "app:getPlatform",
	GET_LOCALE: "app:getLocale",
	GET_CONFIG_DIR: "app:getConfigDir",
	GET_MACHINE_ID: "app:getMachineId",
	SET_MENU_LOCALE: "app:setMenuLocale",
	GET_AUTO_LAUNCH_ENABLED: "app:getAutoLaunchEnabled",
	SET_AUTO_LAUNCH_ENABLED: "app:setAutoLaunchEnabled"
};
//#endregion
//#region ../../packages/workbuddy-server/src/backend/contract.ts
var BACKEND_RPC_CHANNELS = {
	LIST: "backend:list",
	CALL: "backend:call",
	EXPERT_CENTER_INIT: "backend:expert-center-init",
	EXPERT_CENTER_CATEGORIES: "backend:expert-center-categories",
	EXPERT_CENTER_EXPERTS: "backend:expert-center-experts",
	EXPERT_CENTER_EXPERT: "backend:expert-center-expert",
	EXPERT_CENTER_REFRESH: "backend:expert-center-refresh",
	EXPERT_CENTER_RANKING: "backend:expert-center-ranking",
	EXPERT_HISTORY_RECENT: "backend:expert-history-recent",
	EXPERT_HISTORY_GET_RECENT: "backend:expert-history-get-recent",
	EXPERT_HISTORY_ADD: "backend:expert-history-add",
	EXPERT_HISTORY_REMOVE: "backend:expert-history-remove",
	EXPERT_HISTORY_CLEAR: "backend:expert-history-clear",
	INSPIRATION_LIST: "backend:inspiration-list",
	INSPIRATION_DETAIL: "backend:inspiration-detail",
	INSPIRATION_SETTINGS_GET: "backend:inspiration-settings-get",
	INSPIRATION_SETTINGS_SAVE: "backend:inspiration-settings-save",
	INSPIRATION_ONBOARDING_CHECK: "backend:inspiration-onboarding-check",
	INSPIRATION_ONBOARDING_COMPLETE: "backend:inspiration-onboarding-complete",
	INSPIRATION_FEEDBACK: "backend:inspiration-feedback",
	INSPIRATION_MARK_READ: "backend:inspiration-mark-read",
	INSPIRATION_MARK_ALL_READ: "backend:inspiration-mark-all-read",
	INSPIRATION_SAVE: "backend:inspiration-save",
	INSPIRATION_RECORD_TAB_VIEW: "backend:inspiration-record-tab-view",
	INSPIRATION_INJECT_DEMO: "backend:inspiration-inject-demo",
	INSPIRATION_CURATION_LIST: "backend:inspiration-curation-list",
	INSPIRATION_CURATION_ADD: "backend:inspiration-curation-add",
	INSPIRATION_CURATION_UPDATE: "backend:inspiration-curation-update",
	INSPIRATION_CURATION_DELETE: "backend:inspiration-curation-delete"
};
//#endregion
//#region ../../packages/workbuddy-server/src/binary/contract.ts
var BINARY_RPC_CHANNELS = {
	LIST: "binary:list",
	STATUS: "binary:status"
};
//#endregion
//#region ../../packages/workbuddy-server/src/config/contract.ts
var CONFIG_RPC_CHANNELS = {
	GET: "config:get",
	SET: "config:set",
	CHANGED: "config:changed",
	GET_ALL: "config:getAll",
	GET_PRODUCT_SCENES: "config:getProductScenes",
	GET_PRODUCT_CONFIGURATION: "config:getProductConfiguration",
	PRODUCT_CONFIGURATION_CHANGED: "config:productConfigurationChanged",
	GET_CLIENT_MENUS: "config:getClientMenus",
	GET_LOCAL_CUSTOM_MODELS: "config:getLocalCustomModels",
	SAVE_LOCAL_CUSTOM_MODEL: "config:saveLocalCustomModel",
	DELETE_LOCAL_CUSTOM_MODEL: "config:deleteLocalCustomModel",
	TEST_LOCAL_CUSTOM_MODEL: "config:testLocalCustomModel"
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/contract.ts
var CONNECTOR_RPC_CHANNELS = {
	INIT: "connector:init",
	GET_CONFIGS: "connector:getConfigs",
	GET_STATES: "connector:getStates",
	SET_INDUSTRY_BUDDY_SCOPE: "connector:setIndustryBuddyScope",
	CONNECT: "connector:connect",
	REPAIR_CONNECT: "connector:repairConnect",
	DISCONNECT: "connector:disconnect",
	/** 取消进行中的连接（CLI auth 等待 / OAuth 等待回调） */
	CANCEL_CONNECT: "connector:cancelConnect",
	UPDATE_HEADERS: "connector:updateHeaders",
	UPDATE_ENV: "connector:updateEnv",
	UNBIND: "connector:unbind",
	GET_USER_CONNECTOR: "connector:getUserConnector",
	MODIFY_CONNECT_STATUS: "connector:modifyConnectStatus",
	MODIFY_REPO: "connector:modifyRepo",
	MODIFY_ACTIVE_STATUS: "connector:modifyActiveStatus",
	DELETE_USER_CONNECTOR: "connector:deleteUserConnector",
	SAVE_OAUTH_TOKEN: "connector:saveOauthToken",
	GET_REPO_LIST: "connector:getRepoList",
	GET_OAUTH_USER: "connector:getOauthUser",
	REVOKE_ALL: "connector:revokeAll",
	GET_FILE: "connector:getFile",
	ADD_TASK: "connector:addTask",
	GET_TASK_CONNECTOR: "connector:getTaskConnector",
	MODIFY_TASK_ACTIVE_STATUS: "connector:modifyTaskActiveStatus",
	MODIFY_TASK_REPO: "connector:modifyTaskRepo",
	OAUTH_START: "connector:oauthStart",
	OAUTH_STATUS: "connector:oauthStatus",
	OAUTH_ACCESS_TOKEN: "connector:oauthAccessToken",
	OAUTH_REVOKE: "connector:oauthRevoke",
	OAUTH_CONNECT: "connector:oauthConnect",
	OAUTH_REPOS: "connector:oauthRepos",
	OAUTH_TEMP_LOGIN_URL: "connector:oauthTempLoginUrl",
	OAUTH_ENTERPRISE_TEMP_LOGIN_URL: "connector:enterpriseTempLoginUrl",
	REGISTRY_2C_LIST: "connector:registry2cList",
	/** Renderer → server: 回传用户 POI 注入授权决策。 */
	RESOLVE_POI_CONSENT: "connector:resolvePoiConsent",
	/** 企业连接器同步使用的解析通道；原始 registry2cList 通道保持兼容。 */
	REGISTRY_2C_SYNC: "connector:registry2cSync"
};
//#endregion
//#region ../../packages/workbuddy-server/src/credit-prediction/contract.ts
var CREDIT_PREDICTION_RPC_CHANNELS = {
	PREDICT: "creditPrediction:predict",
	CANCEL: "creditPrediction:cancel"
};
//#endregion
//#region ../../packages/workbuddy-server/src/dialog/contract.ts
var DIALOG_RPC_CHANNELS = {
	SELECT_DIRECTORY: "window:selectDirectory",
	SELECT_FILE: "window:selectFile",
	SAVE_FILE: "window:saveFile",
	PICK_FILE: "dialog:pickFile",
	PICK_FOLDER: "dialog:pickFolder"
};
//#endregion
//#region ../../packages/workbuddy-server/src/docs/contract.ts
var DOCS_RPC_CHANNELS = {
	GET_PREVIEW_URL: "docs:getPreviewUrl",
	PREVIEW_DOCUMENT_FROM_CONTENT: "docs:previewDocumentFromContent"
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/contract.ts
var EXPERT_RPC_CHANNELS = {
	INIT: "expert:init",
	GET_CATEGORIES: "expert:getCategories",
	GET_EXPERTS: "expert:getExperts",
	GET_FEATURED_SCENES: "expert:getFeaturedScenes",
	GET_EXPERT: "expert:getExpert",
	GET_AGENT_TEMPLATES: "expert:getAgentTemplates",
	GET_USE_REQUIREMENTS: "expert:getUseRequirements",
	REFRESH: "expert:refresh",
	LOAD_STATE_CHANGED: "expert:loadStateChanged",
	ACTIVATE_PLUGIN: "expert:activatePlugin",
	DEACTIVATE_PLUGIN: "expert:deactivatePlugin",
	GET_ACTIVE_PLUGINS: "expert:getActivePlugins",
	SWITCH_PLUGIN_FOR_SESSION: "expert:switchPluginForSession",
	/** 将本地自定义专家目录打包为 zip，供后续上传分享 */
	EXPORT_ZIP: "expert:exportZip",
	/** 从远端 URL 下载专家 zip 并解压到本地 my-experts 目录 */
	IMPORT_FROM_URL: "expert:importFromUrl",
	/** 从本地 zip 安装专家 */
	INSTALL_FROM_PATH: "expert:installFromPath",
	/** 从远端 URL 下载专家 zip 并读取预览元数据 */
	PREVIEW_FROM_URL: "expert:previewFromUrl",
	/** 分享前对专家 zip 做安全预检 */
	PRE_CHECK_SHARE: "expert:preCheckShare",
	/** 查询分享前安全扫描结果 */
	QUERY_SHARE_SECURITY_SCAN: "expert:queryShareSecurityScan",
	SCAN_CUSTOM_EXPERTS: "expert:scanCustomExperts",
	GET_CUSTOM_EXPERT: "expert:getCustomExpert",
	DELETE_CUSTOM_EXPERT: "expert:deleteCustomExpert",
	ADD_USER_EXPERTS: "expert:addUserExperts",
	CLEAR_CUSTOM_EXPERT_SESSION_MARKER: "expert:clearCustomExpertSessionMarker",
	CLOUD_SYNC_LIST: "expert:cloudSyncList",
	CLOUD_SYNC_CHECK_UPLOAD_QUOTA: "expert:cloudSyncCheckUploadQuota",
	CLOUD_SYNC_UPLOAD: "expert:cloudSyncUpload",
	CLOUD_SYNC_UPLOAD_MANY: "expert:cloudSyncUploadMany",
	CLOUD_SYNC_DOWNLOAD: "expert:cloudSyncDownload",
	CLOUD_SYNC_DELETE_CLOUD: "expert:cloudSyncDeleteCloud"
};
var EXPERT_HISTORY_RPC_CHANNELS = {
	GET_RECENT: "expert-history:getRecent",
	ADD: "expert-history:add",
	REMOVE: "expert-history:remove",
	CLEAR: "expert-history:clear"
};
var EXPERT_CENTER_COS_CONFIG = {
	baseUrl: "https://acc-1258344699.cos.accelerate.myqcloud.com/workbuddy/expert-marketplace",
	manifestPath: "/expert_center.json",
	featuredScenesPath: "/featuredScenes.json",
	download: {
		timeout: 3e4,
		maxRetries: 1,
		retryDelay: 1e3,
		batchConcurrency: 10
	}
};
var CUSTOM_EXPERT_MY_EXPERT_DIR_NAME = "my-experts";
var SHARED_HISTORY_KEY = "__global__";
var DEFAULT_STORAGE_FILE = "expert-history.json";
var EXPERT_BUNDLES_PATH = "/bundles";
var DesktopManifestProviderToken = Symbol("DesktopManifestProvider");
var ExpertCenterResourceLoaderToken = Symbol("ExpertCenterResourceLoader");
var ExpertHistoryServiceToken = Symbol("ExpertHistoryService");
var ExpertHistoryCacheToken = Symbol("ExpertHistoryCache");
var ExpertHistoryStorageToken = Symbol("ExpertHistoryStorage");
var ExpertPluginServiceToken = Symbol("ExpertPluginService");
function buildExpertUrl(path) {
	return `${EXPERT_CENTER_COS_CONFIG.baseUrl}${path}`;
}
//#endregion
//#region ../../packages/workbuddy-server/src/feedback/contract.ts
var FEEDBACK_RPC_CHANNELS = { SUBMIT: "feedback:submit" };
//#endregion
//#region ../../packages/workbuddy-server/src/file-system/contract.ts
var FILE_RPC_CHANNELS = {
	READ: "file:read",
	WRITE: "file:write",
	WRITE_BATCH: "file:writeBatch",
	LIST_DIR: "file:listDir",
	EXISTS: "file:exists",
	MAKE_DIR: "file:makeDir",
	REMOVE: "file:remove",
	RENAME: "file:rename",
	GET_INFO: "file:getInfo",
	SEARCH: "file:search",
	UPLOAD: "file:upload",
	READ_CHUNKED: "file:readChunked"
};
var IO_RPC_CHANNELS = { APPEND_RECORD: "io:appendRecord" };
//#endregion
//#region ../../packages/workbuddy-server/src/growth/contract.ts
var GROWTH_RPC_CHANNELS = { GET_BUDDY: "growth:getBuddy" };
//#endregion
//#region ../../packages/workbuddy-server/src/identity/contract.ts
/**
* Identity / Moderation RPC channels.
*
* Covers:
*  - read/write the Name field in `~/.workbuddy/IDENTITY.md`
*  - call the backend moderation endpoint (tianyu/IMS) before accepting a new Name
*
* The main process also pushes `identity:changed` on IDENTITY.md file changes
* as a global (not session-scoped) broadcast, because the claw name badge is
* UI-level state that exists outside of any one conversation session.
*/
var IDENTITY_RPC_CHANNELS = {
	GET_NAME: "identity:getName",
	UPDATE_NAME: "identity:updateName",
	CHECK_MODERATION: "identity:checkModeration",
	CHANGED: "identity:changed",
	/** 读取本地长期记忆文件的展示字段（模块A：个性化页面「本地长期记忆」区块） */
	GET_LOCAL_MEMORY_FILES: "identity:getLocalMemoryFiles",
	/** 写回 USER.md 的 Name（AI 对你的称呼）（模块B） */
	UPDATE_USER_CALL_NAME: "identity:updateUserCallName",
	/** 写回 IDENTITY.md 的 Name（AI 的名字），保留其它身份内容不变（模块B） */
	UPDATE_AI_NAME: "identity:updateAiName",
	/** 写回 SOUL.md 正文（AI 的人设）（模块B） */
	UPDATE_SOUL_BODY: "identity:updateSoulBody",
	/** 写回 memory.md 正文（AI 的长期记忆记录，本地文件）（模块B） */
	UPDATE_MEMORY_BODY: "identity:updateMemoryBody"
};
//#endregion
//#region ../../packages/workbuddy-server/src/idle-capability/contract.ts
var IDLE_CAPABILITY_RPC_CHANNELS = {
	RECORD_USAGE: "idleCapability:recordUsage",
	RECORD_ACTIVE_DAY: "idleCapability:recordActiveDay",
	GET_IDLE_CARD_DATA: "idleCapability:getIdleCardData",
	MARK_SHOWN: "idleCapability:markShown",
	DISMISS: "idleCapability:dismiss",
	DISMISS_GLOBAL: "idleCapability:dismissGlobal",
	FORGET_CAPABILITY: "idleCapability:forgetCapability",
	LIST_CANDIDATES: "idleCapability:listCandidates"
};
//#endregion
//#region ../../packages/workbuddy-server/src/ima/contract.ts
/**
* ima 集成 RPC channel 常量
*
* 参见：
*   - docs/plans/2026-04-19-ima-technical-design.md §4.3
*   - packages/workbuddy-server/src/ima/handlers.ts (service 接口)
*   - packages/workbuddy-server/src/client/ima.ts (channel map)
*/
var IMA_RPC_CHANNELS = {
	AUTH_START: "ima:auth:start",
	AUTH_STATUS: "ima:auth:status",
	AUTH_REFRESH: "ima:auth:refresh",
	AUTH_LOGOUT: "ima:auth:logout",
	KB_LIST: "ima:kb:list",
	KB_SEARCH: "ima:kb:search",
	KB_INFO_BY_SHARE_LINK: "ima:kb:info-by-share-link",
	FILES_LIST: "ima:files:list",
	FILES_SEARCH: "ima:files:search",
	FILES_VIEW_URL: "ima:files:view-url",
	FILES_DOWNLOAD_URL: "ima:files:download-url",
	FILES_CONTENT: "ima:files:content",
	FILES_BLOB: "ima:files:blob",
	FILES_UPLOAD: "ima:files:upload",
	/** 取消「保存到 ima 知识库」上传任务（按 uploadId 取消） */
	FILES_CANCEL_UPLOAD: "ima:files:cancel-upload",
	/** 「保存到 ima 知识库」：详见 ImaServiceContract.filesUploadByPath / ImaFilesApi.uploadByPath */
	FILES_UPLOAD_BY_PATH: "ima:files:upload-by-path",
	/**
	* 「腾讯文档 SDK 预览 IMA 远端文件」：
	* app-server 下载远端文件到临时路径 → 调用 TencentDocsService.getPreviewUrl → 返回 iframe URL。
	* 不支持 / SDK 不可用时返回 { success: false }，渲染端走 JS 组件兜底。
	*/
	FILES_SDK_PREVIEW: "ima:files:sdk-preview",
	/**
	* 「保存到 ima 知识库」上传链路进度事件。
	* app-server 在 uploadByPath 的 createMedia / cosPut / addKnowledge 各阶段推送百分比。
	* 渲染端根据 payload.uploadId 过滤属于本次调用的事件，更新 toast 进度条。
	*/
	UPLOAD_PROGRESS: "ima:event:upload-progress"
};
//#endregion
//#region ../../packages/workbuddy-server/src/inspiration/contract.ts
var INSPIRATION_RPC_CHANNELS = {
	LIST: "inspiration:list",
	DETAIL: "inspiration:detail",
	SETTINGS_GET: "inspiration:settings-get",
	SETTINGS_SAVE: "inspiration:settings-save",
	ONBOARDING_CHECK: "inspiration:onboarding-check",
	ONBOARDING_COMPLETE: "inspiration:onboarding-complete",
	FEEDBACK: "inspiration:feedback",
	MARK_READ: "inspiration:mark-read",
	MARK_ALL_READ: "inspiration:mark-all-read",
	SAVE: "inspiration:save",
	RECORD_TAB_VIEW: "inspiration:record-tab-view",
	INJECT_DEMO: "backend:inspiration-inject-demo"
};
var INSPIRATION_CURATION_RPC_CHANNELS = {
	LIST: "inspiration-curation:list",
	ADD: "inspiration-curation:add",
	UPDATE: "inspiration-curation:update",
	DELETE: "inspiration-curation:delete"
};
//#endregion
//#region ../../packages/workbuddy-server/src/marketplace/contract.ts
var MARKETPLACE_RPC_CHANNELS = {
	LIST: "marketplace:list",
	INSTALL: "marketplace:install",
	CONTENT: "marketplace:content"
};
//#endregion
//#region ../../packages/workbuddy-server/src/mcp/contract.ts
var MCP_RPC_CHANNELS = {
	LIST: "mcp:list",
	SAVE: "mcp:save",
	REMOVE: "mcp:remove",
	DESCRIBE: "mcp:describe",
	CONNECT: "mcp:connect",
	CALL_TOOL: "mcp:callTool",
	DISCONNECT: "mcp:disconnect",
	SET_ENABLED: "mcp:setEnabled",
	SET_TOOL_ENABLED: "mcp:setToolEnabled",
	APPROVE: "mcp:approve",
	BEGIN_AUTHORIZATION: "mcp:beginAuthorization",
	HANDLE_EXTERNAL_OAUTH_CALLBACK: "mcp:handleExternalOAuthCallback",
	REVOKE_CREDENTIALS: "mcp:revokeCredentials",
	REFRESH: "mcp:refresh"
};
//#endregion
//#region ../../packages/workbuddy-server/src/memory/contract.ts
var MEMORY_RPC_CHANNELS = {
	GET_PROFILE: "memory:getProfile",
	SAVE_SETTINGS: "memory:saveSettings",
	SUBMIT_SUGGESTION: "memory:submitSuggestion",
	IMPORT_CONTENT: "memory:importContent",
	CLEAR_PROFILE: "memory:clearProfile",
	CHECK_UPDATING: "memory:checkUpdating"
};
//#endregion
//#region ../../packages/workbuddy-server/src/microphone/contract.ts
var MICROPHONE_RPC_CHANNELS = {
	GET_PERMISSION: "microphone:getPermission",
	REQUEST_PERMISSION: "microphone:requestPermission",
	OPEN_SYSTEM_SETTINGS: "microphone:openSystemSettings",
	PERMISSION_CHANGED: "microphone:permissionChanged"
};
//#endregion
//#region ../../packages/workbuddy-server/src/migration/contract.ts
/**
* Migration RPC channels.
*
* 迁移相关 RPC：
* - GET_HISTORY_STATUS：renderer 主动查询 history 迁移的当前状态（用于启动时拉一次初始态）
* - HISTORY_STATUS_UPDATE：main -> renderer 推送 history 迁移状态变化事件，
*   尤其用于 history 迁移超时后转为后台运行时，完成后通知 renderer 刷新会话列表等依赖数据。
*/
var MIGRATION_RPC_CHANNELS = {
	GET_HISTORY_STATUS: "migration:getHistoryStatus",
	GET_PENDING_LOCAL_STORAGE_MIGRATION: "migration:getPendingLocalStorageMigration",
	COMPLETE_LOCAL_STORAGE_MIGRATION: "migration:completeLocalStorageMigration",
	HISTORY_STATUS_UPDATE: "migration:historyStatusUpdate",
	HISTORY_PROGRESS: "migration:historyProgress"
};
//#endregion
//#region ../../packages/workbuddy-server/src/my-files/contract.ts
/**
* my-files domain 的 RPC 通道常量与服务契约。
*
* ⚠️ 领域边界说明：
*   本文件里的类型（MyFilesFileItem / MyFilesTask / MyFilesWorkspace / MyFilesTaskArtifactsXxx）
*   属于「我的文件」UI 聚合层的展示模型，跟腾讯网盘领域（core/domains/netdrive）无关。
*   数据来源是 Desktop 本地 artifact-index（Agent 任务产物），非网盘。
*   因此这些类型不放在 core 的 netdrive domain 里，就地在 server 侧定义。
*
* 本层保留：
*   - RPC 通道常量 MY_FILES_RPC_CHANNELS
*   - server 侧 MyFilesService 接口（daemon 内部服务契约）
*   - task-artifacts 展示模型（MyFilesFileItem / MyFilesTask / MyFilesWorkspace / ...）
*/
var MY_FILES_RPC_CHANNELS = {
	GET_TASK_ARTIFACTS: "myFiles:getTaskArtifacts",
	GET_NETDRIVE_ACCESS_TOKEN: "myFiles:getNetDriveAccessToken",
	GET_NETDRIVE_NICKNAMES: "myFiles:getNetDriveNicknames",
	GET_NETDRIVE_PURCHASE_CODE: "myFiles:getNetDrivePurchaseCode",
	GET_NETDRIVE_ENTERPRISE_INFO: "myFiles:getNetDriveEnterpriseInfo",
	UPLOAD_TO_DRIVE: "myFiles:uploadToDrive",
	DOWNLOAD_FILE_TO_LOCAL: "myFiles:downloadFileToLocal",
	CLEANUP_DOWNLOADED_TEMPORARY_FILE: "myFiles:cleanupDownloadedTemporaryFile",
	REPORT_FILE_EVENTS: "myFiles:reportFileEvents",
	GET_FILE_PATHS: "myFiles:getFilePaths"
};
//#endregion
//#region ../../packages/workbuddy-server/src/perf/contract.ts
var PERF_RPC_CHANNELS = {
	APPEND_LINE: "perf:appendLine",
	FLUSH: "perf:flush",
	GET_LOG_FILE_PATH: "perf:getLogFilePath"
};
//#endregion
//#region ../../packages/workbuddy-server/src/plugin/contract.ts
var PLUGIN_RPC_CHANNELS = {
	BATCH_TOGGLE: "plugin:batchToggle",
	GET_INSTALLED: "plugin:getInstalled",
	INSTALL: "plugin:install",
	UNINSTALL: "plugin:uninstall",
	UPDATE: "plugin:update",
	SET_MARKETPLACE_AUTO_UPDATE: "plugin:setMarketplaceAutoUpdate",
	GET_MARKETPLACES: "plugin:getMarketplaces",
	GET_MARKETPLACE_PLUGINS: "plugin:getMarketplacePlugins",
	GET_DETAIL: "plugin:getDetail",
	ADD_MARKETPLACE: "plugin:addMarketplace",
	REMOVE_MARKETPLACE: "plugin:removeMarketplace",
	REFRESH_MARKETPLACE: "plugin:refreshMarketplace",
	RELOAD_RUNTIME_PLUGINS: "plugin:reloadRuntimePlugins",
	CHANGED: "plugin:changed"
};
//#endregion
//#region ../../packages/workbuddy-server/src/power/contract.ts
/**
* Power 域 RPC channel 名称。
*
* 设置页支持关闭、允许熄屏和保持屏幕常亮三种模式；
* 侧栏快捷开关通过同一 RPC 映射到关闭或允许熄屏。
*/
var POWER_RPC_CHANNELS = {
	/** 旧版 boolean 通道，保留给旧 renderer。 */
	SET_POWER_SAVE_BLOCKER: "window:setPowerSaveBlocker",
	/** 三态模式通道，避免对象参数被旧宿主误判为 true。 */
	SET_POWER_SAVE_BLOCKER_MODE: "window:setPowerSaveBlockerMode",
	GET_POWER_SAVE_BLOCKER_STATE: "window:getPowerSaveBlockerState"
};
//#endregion
//#region ../../packages/workbuddy-server/src/proxy-settings/contract.ts
/**
* Proxy Settings 域 — 契约（types + RPC channels）。
*
* 用户通过设置面板管理 WorkBuddy 的 HTTP 代理。三种模式：
*   - none    : 显式直连
*   - system  : 跟随系统/环境变量
*   - manual  : 用户显式 URL（仅 http/https；socks5 在 5.3.0 backlog）
*
* 落到 settings.json 时使用 VSCode 兼容的平铺字段（v4 / Q6 决策）：
*   - http.proxy        : 代理 URL，例如 "http://corp:8080"
*   - http.proxySupport : "off" | "on" | "override"
*   - http.noProxy      : 字符串或数组（本 issue 不写）
*
* UI 三模式 ↔ VSCode 字段映射表见 `service.ts.toVscodeFields` 与 `inferModeFromFields`。
*/
var PROXY_SETTINGS_RPC_CHANNELS = {
	GET_SETTINGS: "proxySettings:getSettings",
	SAVE_SETTINGS: "proxySettings:saveSettings",
	TEST_CONNECTION: "proxySettings:testConnection"
};
/**
* VSCode 平铺字段 → UI 三模式映射（pure function，v4 / Q6 决策）。
*
* 与 `ProxySettingsService.getSettings()` 同源；提取到 contract 是为了让 Main 进程
* 启动期（TODO-2 #49077）也能复用相同语义读取持久化代理配置，避免逻辑分叉。
*
* 兼容历史配置：
*   - 字段缺失 → none（首次启动）
*   - 老版本只写了 http.proxy 没写 proxySupport → 视为 manual（与 ProxyResolver L1 行为一致）
*
* 入参约定：JSON 对象（read 返回的内容）。null/非对象由调用方先兜底处理。
*/
function inferProxyModeFromVscodeFields(json) {
	const httpProxy = typeof json["http.proxy"] === "string" ? json["http.proxy"].trim() : "";
	const support = typeof json["http.proxySupport"] === "string" ? json["http.proxySupport"] : void 0;
	if (support === "off") return { mode: "none" };
	if (support === "on") return { mode: "system" };
	if (httpProxy) return {
		mode: "manual",
		url: httpProxy
	};
	return { mode: "none" };
}
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/contract.ts
var SANDBOX_RPC_CHANNELS = {
	/** Respond to a sandbox intercept request (client → server) */
	RESPOND_TO_INTERCEPT: "sandbox:respondToIntercept",
	/** Push: sandbox intercept request (server → client) */
	INTERCEPT_REQUEST: "sandbox:interceptRequest",
	/** 注册 sandbox preview mount，返回 mountId + 本地代理 baseUrl */
	REGISTER_MOUNT: "sandboxPreview:registerMount"
};
//#endregion
//#region ../../packages/workbuddy-server/src/share/contract.ts
var SHARE_RPC_CHANNELS = {
	UPLOAD_FILE: "share:uploadFile",
	UPLOAD_IMAGE: "share:uploadImage",
	UPLOAD_TO_KNOWLEDGE: "share:uploadToKnowledge",
	CREATE_LINK: "share:createLink",
	GET_LIST: "share:getList",
	DOWNLOAD_FILE: "share:downloadFile",
	SET_ENABLED: "share:setEnabled",
	GET_DETAIL: "share:getDetail",
	VERIFY: "share:verify",
	PREPARE_TASK: "share:prepareTask",
	UPLOAD_TASK_FILE: "share:uploadTaskFile",
	CONFIRM_TASK: "share:confirmTask",
	CANCEL_TASK: "share:cancelTask",
	GET_TASK_LIST: "share:getTaskList",
	DELETE_TASK: "share:deleteTask",
	GENERATE_WXMP_QRCODE: "share:generateWxMPQRCode",
	BATCH_MOVE_KNOWLEDGE_NODES: "share:batchMoveKnowledgeNodes",
	INVITE_PERMISSION: "share:invitePermission",
	SET_PERMISSION: "share:setPublicPermission",
	GET_COLLABORATORS: "share:getCollaborators",
	SET_MEMBER_PERMISSION: "share:setMemberPermission",
	QUERY_PAGE_INFO: "share:queryPageInfo",
	GET_NODE_INFO: "share:getNodeInfo",
	GET_PERMISSION: "share:getPublicPermission",
	GET_SHARE_COLLAB_POLICY: "share:getShareCollabPolicy",
	PUBLISH_PAGE: "share:publishPage",
	UNPUBLISH_PAGE: "share:unpublishPage",
	UPLOAD_LOCAL_FILE_TO_COS: "share:uploadLocalFileToCos",
	QUERY_IMPORT_PROGRESS: "share:queryImportProgress",
	UPLOAD_SHARE_TEMPLATE: "share:uploadShareTemplate"
};
//#endregion
//#region ../../packages/workbuddy-server/src/sidecar/contract.ts
var SIDECAR_RPC_CHANNELS = {
	LIST: "sidecar:list",
	RESIZE: "sidecar:resize"
};
//#endregion
//#region ../../packages/workbuddy-server/src/skill/contract.ts
var SKILL_RPC_CHANNELS = {
	LIST: "skill:list",
	IMPORT: "skill:import",
	TOGGLE: "skill:toggle",
	BATCH_TOGGLE: "skill:batchToggle",
	/** 已装 skill 总数的轻量计数（只读 frontmatter 头部，不做全量解析） */
	DELETE: "skill:delete",
	CONTENT: "skill:content",
	INSTALL_BY_PATH: "skill:installByPath",
	PREPARE_FROM_URL: "skill:prepareFromUrl",
	GET_CONTENT: "skill:getContent",
	GET_MARKETPLACE: "skill:getMarketplace",
	GET_MARKETPLACE_CONTENT: "skill:getMarketplaceContent",
	INSTALL_MARKETPLACE: "skill:installMarketplace",
	/** 查询 skill 安全扫描结果（异步轮询用）；由宿主主进程对接腾讯云 XTI */
	QUERY_SCAN_RESULT: "skill:queryScanResult",
	/** 一步到位的 URL 安装（下载 + 安全预检 + 落盘） */
	INSTALL_FROM_URL: "skill:installFromUrl",
	/** Pre-send 技能推荐（复用产品 chat/completions endpoint） */
	RECOMMEND: "llm:skillRecommend",
	/** 推荐请求前的 query 语义一致性判断。 */
	QUERY_CONSISTENCY: "llm:skillQueryConsistency",
	/** 将本地技能目录打包为 zip，供 Teams 项目上传使用 */
	EXPORT_ZIP: "skill:exportZip",
	/** Buddy 场景内置技能隔离安装 */
	ENSURE_BUDDY: "skill:ensureBuddySkills",
	/** 取消连接 Buddy 应用时删除隔离技能目录 */
	REMOVE_BUDDY: "skill:removeBuddySkills",
	/** 删除 schema 已不再声明的 Buddy 技能桶 */
	PRUNE_BUDDY_BUCKETS: "skill:pruneBuddySkillBuckets",
	/** 列出 Buddy 内容库已下载技能的版本信息 */
	LIST_BUDDY_STORE_METAS: "skill:listBuddyStoreSkillMetas",
	/** 更新 Buddy 内容库技能并刷新引用它的桶 */
	UPDATE_BUDDY_STORE_SKILL: "skill:updateBuddyStoreSkill",
	/**
	* Issue #98181：拉取 daemon 侧当前 skills version。
	*
	* `skill:versionChanged` 事件是 fire-and-forget，daemon 冷启动比 renderer 早
	* 或 renderer 挂载 bridge 前触发的事件会丢；renderer 挂载 refresh-bridge 时用
	* 这个 RPC 主动 pull 一次，拿到 baseline `latestKnownVersion`，之后再靠事件更新。
	* emitter 未启（老装配 / 单测）时 handler 未注册，renderer invoke 失败 → 走 TTL 兜底。
	*/
	GET_SKILLS_VERSION: "skill:getSkillsVersion",
	/** 手动触发市场安装配置迁移，供验证 / 排障使用 */
	MARKET_CONFIG_SYNC_RUN_ONCE: "skill:marketConfigSyncRunOnce",
	/** 市场已安装云端配置：列表 */
	MARKET_INSTALL_CONFIG_LIST: "skill:marketInstallConfigList",
	/** 市场已安装云端配置：安装记录写入 */
	MARKET_INSTALL_CONFIG_INSTALL: "skill:marketInstallConfigInstall",
	/** 市场已安装云端配置：云端移除 */
	MARKET_INSTALL_CONFIG_UNINSTALL: "skill:marketInstallConfigUninstall",
	/** 市场云端-only 技能安装到本机 */
	MARKET_INSTALL_CONFIG_ENSURE_LOCAL: "skill:marketInstallConfigEnsureLocal"
};
/**
* Skill 相关 daemon → renderer 单向广播事件（issue #98181）。
*
* daemon 侧 `SkillsVersionEmitter` 监听 skills 相关目录（user / connector / plugin），
* 变化 debounce 后 bump `version = Date.now()` 并广播；renderer 侧
* `SkillsInstalledStore` 用 version 短路 `getSkillList` —— 数据没变时 0 扫盘。
*/
var SKILL_EVENT_CHANNELS = { VERSION_CHANGED: "skill:versionChanged" };
var SKILLHUB_RPC_CHANNELS = {
	LIST: "skillhub:list",
	CATEGORIES: "skillhub:categories",
	SEARCH: "skillhub:search",
	DETAIL: "skillhub:detail",
	EXISTS: "skillhub:exists",
	INSTALL: "skillhub:install",
	REPORT_STATS: "skillhub:reportStats",
	INSTALLED_METAS: "skillhub:installedMetas"
};
var KNOT_RPC_CHANNELS = {
	LIST: "knot:list",
	CATEGORIES: "knot:categories",
	TAGS: "knot:tags",
	SEARCH: "knot:search",
	DETAIL: "knot:detail",
	EXISTS: "knot:exists",
	INSTALL: "knot:install",
	REPORT_STATS: "knot:reportStats",
	INSTALLED_METAS: "knot:installedMetas",
	GET_BY_IDS: "knot:getByIds"
};
/**
* 内置 Skill 市场（对应 /v2/operation-platform/market/skill/*）。
* Collection 入口复用 list / install；search / getLayout 为新增通道。
*/
var BUILTIN_MARKET_RPC_CHANNELS = {
	LIST: "builtin-market:list",
	GET_BY_IDS: "builtin-market:getByIds",
	DOWNLOAD_URL: "builtin-market:downloadUrl",
	CATEGORIES: "builtin-market:categories",
	INSTALL: "builtin-market:install",
	INSTALLED_METAS: "builtin-market:installedMetas",
	BACKFILL_SKILL_ID: "builtin-market:backfillSkillId",
	BACKFILL_ICON_SOURCE: "builtin-market:backfillIconSource",
	BACKFILL_DESCRIPTION: "builtin-market:backfillDescription",
	MIGRATE_DIRS_TO_SKILL_ID: "builtin-market:migrateDirsToSkillId",
	GET_LAYOUT: "builtin-market:getLayout",
	SEARCH: "builtin-market:search"
};
/**
* 企业自建 Skill 市场（对应 /v2/enterprises/:enterpriseId/skill-market/*）。
*/
var ENTERPRISE_SKILLS_RPC_CHANNELS = {
	LIST: "enterpriseSkills:list",
	GET_CATEGORIES: "enterpriseSkills:getCategories",
	PROBE_VISIBILITY: "enterpriseSkills:probeVisibility",
	INSTALL: "enterpriseSkills:install"
};
//#endregion
//#region ../../packages/workbuddy-server/src/storage/contract.ts
var STORAGE_RPC_CHANNELS = {
	GET_SESSIONS: "storage:getSessions",
	UPSERT_SESSION: "storage:upsertSession",
	DELETE_SESSION: "storage:deleteSession",
	GET_WORKSPACES: "storage:getWorkspaces",
	UPDATE_SESSION_PERMISSION_MODE: "storage:updateSessionPermissionMode",
	GET_RECOVERY_NOTICE: "storage:getRecoveryNotice"
};
//#endregion
//#region ../../packages/workbuddy-server/src/system/contract.ts
/**
* Legacy wire names are retained for compatibility with older direct IPC callers.
* The ownership and file organization are "system", even though the channel
* prefix still uses `window:`.
*/
var SYSTEM_RPC_CHANNELS = {
	OPEN_EXTERNAL: "window:openExternal",
	OPEN_PATH: "window:openPath",
	READ_CLIPBOARD: "window:readClipboard",
	SHOW_ITEM_IN_FOLDER: "window:showItemInFolder",
	CHECK_SYSTEM_PERMISSIONS: "system:checkPermissions",
	/**
	* 触发 macOS 将 WorkBuddy 注册到"系统设置 → 通知"应用列表。
	*
	* 背景（#31595 遗留反馈）：macOS 只会把"调用过通知 API"的 app 列入
	* 应用通知列表；WorkBuddy 从未调用过，用户点"去授权"跳到系统设置
	* 通知面板后找不到 WorkBuddy 条目。该 RPC 只在用户主动点击
	* "去授权通知"按钮时触发一次静默本地通知，完成列表注册，
	* 不会在启动或其它时机自动发送通知。
	*/
	REQUEST_NOTIFICATION_REGISTRATION: "system:requestNotificationRegistration",
	/**
	* 唤起腾讯元宝桌面客户端。
	* 主进程会先检测本机是否安装元宝：
	* - 已安装：用 `yuanbao://launch?tridChannel=workbuddy.ybssapihz.pc` 协议唤起
	* - 未安装：打开下载页 `https://yuanbao.tencent.com/download`
	*/
	OPEN_YUANBAO: "system:openYuanbao",
	/**
	* 检测本机是否安装了 IMA Copilot App。
	* 返回 boolean：true 表示已安装。
	*/
	HAS_IMA_APP: "system:hasImaApp",
	/**
	* 通过 schema 打开 IMA Copilot App，未安装则通过 url 打开 ima 官网。
	* 参数：{ schema: string（路径部分，不含 imacopilot:// 前缀）; url: string }
	* 宿主负责拼接 `imacopilot://` 前缀。
	*/
	OPEN_IMA_APP: "system:openImaApp"
};
//#endregion
//#region ../../packages/workbuddy-server/src/telemetry/contract.ts
var TELEMETRY_RPC_CHANNELS = {
	REPORT: "telemetry:report",
	/**
	* 同步上报通道：错误向上传播到 renderer，用于需要"上报成功才放行"的场景。
	*/
	REPORT_SYNC: "telemetry:reportSync",
	/**
	* 把渲染端发生的生命周期事件（会话切换、菜单切换等）写入主进程的
	* AppStartup.log，**不是上报埋点**。主进程同一份 logger 也用于启动/关闭/
	* focus/blur，集中到一个文件方便事后 grep。
	*/
	LIFECYCLE_LOG: "telemetry:lifecycleLog",
	/**
	* renderer 切换 Buddy 应用后推送归属信息，daemon 缓存后注入到所有 `/v2/report`
	* 事件公参，并编码进转发给 agent-cli 的 `_meta.baggage`。
	*/
	SET_BUDDY_CONTEXT: "telemetry:setBuddyContext"
};
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-lexiang/contract.ts
var TENCENT_LEXIANG_RPC_CHANNELS = {
	/** 通用 agent-gateway 代理：POST /console/agent-gateway/lexiang-ol{path} */
	GATEWAY_POST: "tencentLexiang:gatewayPost",
	/** 三段式文件上传（主进程读文件 → apply → PUT COS → commit） */
	UPLOAD_LEXIANG_FILE: "tencentLexiang:uploadLexiangFile",
	/** 文件夹上传（递归遍历目录，逐文件走 SPAPI 三段式上传） */
	UPLOAD_LEXIANG_FOLDER: "tencentLexiang:uploadLexiangFolder",
	/** HTML 上传（apply → PUT COS → 创建 import task → 轮询任务状态） */
	UPLOAD_LEXIANG_HTML: "tencentLexiang:uploadLexiangHtml",
	/** 清理宿主浏览器会话中的乐享相关 cookie。 */
	CLEAR_WEB_COOKIES: "tencentLexiang:clearWebCookies",
	/** 校验当前企业态 OneID token 是否已分配乐享 license。 */
	CHECK_LICENSE: "tencentLexiang:checkLicense",
	/** 检查乐享 B 端公司初始化是否完成。 */
	CHECK_COMPANY_STATUS: "tencentLexiang:checkCompanyStatus",
	/** 乐享 SPAPI 代理（Node 层发请求避免 CORS）。 */
	SP_API_REQUEST: "tencentLexiang:spApiRequest",
	/** 使当前账号的乐享 OAuth access_token 缓存失效。切换乐享公司/团队时由 UI 调用。 */
	INVALIDATE_ACCESS_TOKEN: "tencentLexiang:invalidateAccessToken"
};
var LEXIANG_COOKIE_DOMAINS = [
	"lexiangla.com",
	"lexiang-app.com",
	"lexiangla.net"
];
/**
* 乐享 SPAPI 请求失败时抛出的结构化错误。
*
* 目的：让 UI 侧能够按字段做分类处理（例如判断 401 走 auth 引导、5xx 走重试提示），
* 而不是从裸 message 里 grep。
*
* 放在 `contract.ts` 是为了让 UI 侧也能 `import { LexiangSpApiError }` 用 `instanceof`
* 判断——本文件仅含类型/常量/无 Node 依赖，可安全打进浏览器 bundle。
*/
var LexiangSpApiError = class extends Error {
	constructor(opts) {
		super(opts.message);
		this.name = "LexiangSpApiError";
		this.status = opts.status;
		this.method = opts.method;
		this.path = opts.path;
		this.reqId = opts.reqId;
		this.serverRequestId = opts.serverRequestId;
		this.bodySnippet = opts.bodySnippet;
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/tts/contract.ts
var TTS_RPC_CHANNELS = {
	START_TTS: "tts:startTts",
	STOP_TTS: "tts:stopTts",
	EVENT: "tts:event"
};
//#endregion
//#region ../../packages/workbuddy-server/src/update/contract.ts
var UPDATE_RPC_CHANNELS = {
	CHECK: "update:check",
	DOWNLOAD: "update:download",
	ARCH_MISMATCH_DOWNLOAD: "update:archMismatchDownload",
	ARCH_MISMATCH_INSTALL: "update:archMismatchInstall",
	QUIT_AND_INSTALL: "update:quitAndInstall",
	GET_STATE: "update:getState",
	STATE_CHANGED: "update:stateChanged"
};
//#endregion
//#region ../../packages/workbuddy-server/src/window/contract.ts
var WINDOW_RPC_CHANNELS = {
	MINIMIZE: "window:minimize",
	MAXIMIZE: "window:maximize",
	CLOSE: "window:close",
	IS_MAXIMIZED: "window:isMaximized",
	CANCEL_PENDING_CLOSE: "window:cancelPendingClose",
	CONFIRM_CLOSE: "window:confirmClose",
	SET_TRAFFIC_LIGHTS_VISIBLE: "window:setTrafficLightsVisible",
	OPEN_LOCAL_FILE: "window:openLocalFile",
	RELOAD: "window:reload",
	SAVE_LOCALE: "window:saveLocale",
	/**
	* 保存"默认工作空间存储路径"配置。
	* 新建任务 / 临时任务落盘时会优先读取该值；未设置时回退到 `~/{defaultFolderName}`。
	*/
	SAVE_DEFAULT_WORKSPACE_PATH: "window:saveDefaultWorkspacePath",
	CLOSE_AGENT_MANAGER: "window:closeAgentManager",
	SAVE_BUNDLED_RUNTIME_CONFIG: "window:saveBundledRuntimeConfig",
	GET_BUNDLED_RUNTIME_CONFIG: "window:getBundledRuntimeConfig",
	/**
	* 进入/退出原生窗口全屏。
	* 渲染层无法直接调 HTML5 `Element.requestFullscreen()` 触发整窗全屏，
	* 因此通过 RPC 显式驱动。
	*/
	SET_FULLSCREEN: "window:setFullscreen",
	/** 切换窗口全屏状态，返回切换后的状态。 */
	TOGGLE_FULLSCREEN: "window:toggleFullscreen"
};
//#endregion
//#region ../../packages/workbuddy-server/src/workspace/contract.ts
var WORKSPACE_RPC_CHANNELS = {
	GET_CURRENT: "workspace:getCurrent",
	GENERATE_DEFAULT_CWD: "workspace:generateDefaultCwd",
	GET_CLAW_CWD: "workspace:getClawCwd",
	INITIALIZE: "workspace:initialize",
	OPEN: "workspace:open",
	OPEN_FOLDER: "workspace:openFolder",
	SEARCH_FILE: "workspace:searchFile",
	CHECK_PATH_EXISTS: "workspace:checkPathExists",
	CHECK_PATHS_EXIST: "workspace:checkPathsExist",
	CHECK_ACCESS: "workspace:checkAccess"
};
//#endregion
//#region ../../packages/workbuddy-server/src/compat/client.ts
var COMPATIBILITY_CHANNEL_MAP = {
	ipcEmit: invoke({ EMIT: "ipc:emit" }.EMIT),
	perfAppendLine: invoke(PERF_RPC_CHANNELS.APPEND_LINE),
	perfFlush: invoke(PERF_RPC_CHANNELS.FLUSH),
	perfGetLogFilePath: invoke(PERF_RPC_CHANNELS.GET_LOG_FILE_PATH),
	listSidecarSessions: invoke(SIDECAR_RPC_CHANNELS.LIST),
	resizeSidecar: invoke(SIDECAR_RPC_CHANNELS.RESIZE),
	listBackends: invoke(BACKEND_RPC_CHANNELS.LIST),
	telemetryReport: invoke(TELEMETRY_RPC_CHANNELS.REPORT),
	telemetryReportSync: invoke(TELEMETRY_RPC_CHANNELS.REPORT_SYNC),
	appLifecycleLog: invoke(TELEMETRY_RPC_CHANNELS.LIFECYCLE_LOG),
	telemetrySetBuddyContext: invoke(TELEMETRY_RPC_CHANNELS.SET_BUDDY_CONTEXT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/config/client.ts
var CONFIG_CHANNEL_MAP = {
	configGet: invoke(CONFIG_RPC_CHANNELS.GET),
	configSet: invoke(CONFIG_RPC_CHANNELS.SET),
	onConfigChanged: listener(CONFIG_RPC_CHANNELS.CHANGED),
	configGetAll: invoke(CONFIG_RPC_CHANNELS.GET_ALL),
	getProductScenes: invoke(CONFIG_RPC_CHANNELS.GET_PRODUCT_SCENES, 3e4),
	getProductConfiguration: invoke(CONFIG_RPC_CHANNELS.GET_PRODUCT_CONFIGURATION, 3e4),
	onProductConfigurationChanged: listener(CONFIG_RPC_CHANNELS.PRODUCT_CONFIGURATION_CHANGED),
	getClientMenus: invoke(CONFIG_RPC_CHANNELS.GET_CLIENT_MENUS),
	configGetLocalCustomModels: invoke(CONFIG_RPC_CHANNELS.GET_LOCAL_CUSTOM_MODELS),
	configSaveLocalCustomModel: invoke(CONFIG_RPC_CHANNELS.SAVE_LOCAL_CUSTOM_MODEL),
	configDeleteLocalCustomModel: invoke(CONFIG_RPC_CHANNELS.DELETE_LOCAL_CUSTOM_MODEL),
	configTestLocalCustomModel: invoke(CONFIG_RPC_CHANNELS.TEST_LOCAL_CUSTOM_MODEL, 35e3)
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/client.ts
var CONNECTOR_CHANNEL_MAP = {
	connectorGetConnectors: invoke("connector:getConnectors"),
	connectorListRegistry: invoke("connector:listRegistry"),
	connectorListProjectConnectors: invoke("connector:listProjectConnectors"),
	connectorAddProjectConnector: invoke("connector:addProjectConnector"),
	connectorUpdateProjectConnectors: invoke("connector:updateProjectConnectors"),
	connectorRemoveProjectConnector: invoke("connector:removeProjectConnector"),
	connectorListTaskConnectors: invoke("connector:listTaskConnectors"),
	connectorSetTaskConnectorActiveStatus: invoke("connector:setTaskConnectorActiveStatus"),
	connectorAuthStart: invoke("connector:authStart"),
	connectorAuthConnect: invoke("connector:authConnect"),
	connectorAuthStatus: invoke("connector:authStatus"),
	connectorAuthRevoke: invoke("connector:authRevoke"),
	connectorAuthAccessToken: invoke("connector:authAccessToken"),
	connectorAuthTempLoginUrl: invoke("connector:authTempLoginUrl"),
	connectorGetRepoList: invoke("connector:getRepoList"),
	connectorGetOauthUser: invoke("connector:getOauthUser"),
	connectorInit: invoke(CONNECTOR_RPC_CHANNELS.INIT),
	connectorGetConfigs: invoke(CONNECTOR_RPC_CHANNELS.GET_CONFIGS),
	connectorGetStates: invoke(CONNECTOR_RPC_CHANNELS.GET_STATES),
	connectorSetIndustryBuddyScope: invoke(CONNECTOR_RPC_CHANNELS.SET_INDUSTRY_BUDDY_SCOPE),
	connectorConnect: invoke(CONNECTOR_RPC_CHANNELS.CONNECT, 36e4),
	connectorRepairConnect: invoke(CONNECTOR_RPC_CHANNELS.REPAIR_CONNECT, 36e4),
	connectorDisconnect: invoke(CONNECTOR_RPC_CHANNELS.DISCONNECT),
	/** 取消进行中的连接，主进程立即响应（中断 spawn / 清 OAuth 状态），无需长超时。 */
	connectorCancelConnect: invoke(CONNECTOR_RPC_CHANNELS.CANCEL_CONNECT),
	connectorUpdateHeaders: invoke(CONNECTOR_RPC_CHANNELS.UPDATE_HEADERS),
	connectorUpdateEnv: invoke(CONNECTOR_RPC_CHANNELS.UPDATE_ENV),
	connectorUnbind: invoke(CONNECTOR_RPC_CHANNELS.UNBIND),
	connectorGetUserConnector: invoke(CONNECTOR_RPC_CHANNELS.GET_USER_CONNECTOR),
	connectorModifyConnectStatus: invoke(CONNECTOR_RPC_CHANNELS.MODIFY_CONNECT_STATUS),
	connectorModifyRepo: invoke(CONNECTOR_RPC_CHANNELS.MODIFY_REPO),
	connectorModifyActiveStatus: invoke(CONNECTOR_RPC_CHANNELS.MODIFY_ACTIVE_STATUS),
	connectorDeleteUserConnector: invoke(CONNECTOR_RPC_CHANNELS.DELETE_USER_CONNECTOR),
	connectorSaveOauthToken: invoke(CONNECTOR_RPC_CHANNELS.SAVE_OAUTH_TOKEN),
	connectorRevokeAll: invoke(CONNECTOR_RPC_CHANNELS.REVOKE_ALL),
	connectorGetFile: invoke(CONNECTOR_RPC_CHANNELS.GET_FILE),
	connectorAddTask: invoke(CONNECTOR_RPC_CHANNELS.ADD_TASK),
	connectorGetTaskConnector: invoke(CONNECTOR_RPC_CHANNELS.GET_TASK_CONNECTOR),
	connectorModifyTaskActiveStatus: invoke(CONNECTOR_RPC_CHANNELS.MODIFY_TASK_ACTIVE_STATUS),
	connectorModifyTaskRepo: invoke(CONNECTOR_RPC_CHANNELS.MODIFY_TASK_REPO),
	connectorOauthStart: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_START),
	connectorOauthStatus: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_STATUS),
	connectorOauthAccessToken: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_ACCESS_TOKEN),
	connectorOauthRevoke: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_REVOKE),
	connectorOauthConnect: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_CONNECT),
	connectorOauthRepos: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_REPOS),
	connectorOauthTempLoginUrl: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_TEMP_LOGIN_URL),
	connectorEnterpriseTempLoginUrl: invoke(CONNECTOR_RPC_CHANNELS.OAUTH_ENTERPRISE_TEMP_LOGIN_URL),
	connectorRegistry2cList: invoke(CONNECTOR_RPC_CHANNELS.REGISTRY_2C_LIST),
	connectorResolvePoiConsent: invoke(CONNECTOR_RPC_CHANNELS.RESOLVE_POI_CONSENT),
	connectorRegistry2cSync: invoke(CONNECTOR_RPC_CHANNELS.REGISTRY_2C_SYNC)
};
//#endregion
//#region ../../packages/workbuddy-server/src/credit-prediction/client.ts
var CREDIT_PREDICTION_CHANNEL_MAP = {
	creditPredictionPredict: invoke(CREDIT_PREDICTION_RPC_CHANNELS.PREDICT),
	creditPredictionCancel: invoke(CREDIT_PREDICTION_RPC_CHANNELS.CANCEL)
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
	dataRetentionGetStorageUsage: invoke(DATA_RETENTION_RPC_CHANNELS.GET_STORAGE_USAGE),
	dataRetentionGetDiskInfo: invoke(DATA_RETENTION_RPC_CHANNELS.GET_DISK_INFO),
	dataRetentionGetPolicy: invoke(DATA_RETENTION_RPC_CHANNELS.GET_POLICY),
	dataRetentionSetPolicy: invoke(DATA_RETENTION_RPC_CHANNELS.SET_POLICY),
	dataRetentionGetLastCleanupResult: invoke(DATA_RETENTION_RPC_CHANNELS.GET_LAST_CLEANUP_RESULT)
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
	enterprisePolicyGetSkillUploadPolicy: invoke(ENTERPRISE_POLICY_RPC_CHANNELS.GET_SKILL_UPLOAD_POLICY),
	enterprisePolicyRefreshSkillUploadPolicy: invoke(ENTERPRISE_POLICY_RPC_CHANNELS.REFRESH_SKILL_UPLOAD_POLICY),
	enterprisePolicyGetMemberCustomModelPolicy: invoke(ENTERPRISE_POLICY_RPC_CHANNELS.GET_MEMBER_CUSTOM_MODEL_POLICY),
	enterprisePolicyRefreshMemberCustomModelPolicy: invoke(ENTERPRISE_POLICY_RPC_CHANNELS.REFRESH_MEMBER_CUSTOM_MODEL_POLICY),
	enterprisePolicyGetCustomConnectorPolicy: invoke(ENTERPRISE_POLICY_RPC_CHANNELS.GET_CUSTOM_CONNECTOR_POLICY),
	enterprisePolicyRefreshCustomConnectorPolicy: invoke(ENTERPRISE_POLICY_RPC_CHANNELS.REFRESH_CUSTOM_CONNECTOR_POLICY)
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/client.ts
var EXPERT_CHANNEL_MAP = {
	expertInit: invoke(EXPERT_RPC_CHANNELS.INIT),
	expertGetCategories: invoke(EXPERT_RPC_CHANNELS.GET_CATEGORIES),
	expertGetExperts: invoke(EXPERT_RPC_CHANNELS.GET_EXPERTS),
	expertGetFeaturedScenes: invoke(EXPERT_RPC_CHANNELS.GET_FEATURED_SCENES),
	expertGetExpert: invoke(EXPERT_RPC_CHANNELS.GET_EXPERT),
	expertGetUseRequirements: invoke(EXPERT_RPC_CHANNELS.GET_USE_REQUIREMENTS),
	expertGetAgentTemplates: invoke(EXPERT_RPC_CHANNELS.GET_AGENT_TEMPLATES),
	expertRefresh: invoke(EXPERT_RPC_CHANNELS.REFRESH),
	expertSummonExpert: invoke("expert:summonExpert"),
	expertHistoryGetRecent: invoke(EXPERT_HISTORY_RPC_CHANNELS.GET_RECENT),
	expertHistoryAdd: invoke(EXPERT_HISTORY_RPC_CHANNELS.ADD),
	expertHistoryRemove: invoke(EXPERT_HISTORY_RPC_CHANNELS.REMOVE),
	expertHistoryClear: invoke(EXPERT_HISTORY_RPC_CHANNELS.CLEAR),
	expertActivatePlugin: invoke(EXPERT_RPC_CHANNELS.ACTIVATE_PLUGIN),
	expertDeactivatePlugin: invoke(EXPERT_RPC_CHANNELS.DEACTIVATE_PLUGIN),
	expertGetActivePlugins: invoke(EXPERT_RPC_CHANNELS.GET_ACTIVE_PLUGINS),
	expertSwitchPluginForSession: invoke(EXPERT_RPC_CHANNELS.SWITCH_PLUGIN_FOR_SESSION),
	expertExportZip: invoke(EXPERT_RPC_CHANNELS.EXPORT_ZIP),
	expertPreCheckShare: invoke(EXPERT_RPC_CHANNELS.PRE_CHECK_SHARE),
	expertQueryShareSecurityScan: invoke(EXPERT_RPC_CHANNELS.QUERY_SHARE_SECURITY_SCAN),
	expertImportFromUrl: invoke(EXPERT_RPC_CHANNELS.IMPORT_FROM_URL),
	expertInstallFromPath: invoke(EXPERT_RPC_CHANNELS.INSTALL_FROM_PATH),
	expertPreviewFromUrl: invoke(EXPERT_RPC_CHANNELS.PREVIEW_FROM_URL),
	expertScanCustomExperts: invoke(EXPERT_RPC_CHANNELS.SCAN_CUSTOM_EXPERTS),
	expertGetCustomExpert: invoke(EXPERT_RPC_CHANNELS.GET_CUSTOM_EXPERT),
	expertDeleteCustomExpert: invoke(EXPERT_RPC_CHANNELS.DELETE_CUSTOM_EXPERT),
	expertAddUserExperts: invoke(EXPERT_RPC_CHANNELS.ADD_USER_EXPERTS),
	expertClearCustomExpertSessionMarker: invoke(EXPERT_RPC_CHANNELS.CLEAR_CUSTOM_EXPERT_SESSION_MARKER),
	expertCloudSyncList: invoke(EXPERT_RPC_CHANNELS.CLOUD_SYNC_LIST),
	expertCloudSyncCheckUploadQuota: invoke(EXPERT_RPC_CHANNELS.CLOUD_SYNC_CHECK_UPLOAD_QUOTA),
	expertCloudSyncUpload: invoke(EXPERT_RPC_CHANNELS.CLOUD_SYNC_UPLOAD),
	expertCloudSyncUploadMany: invoke(EXPERT_RPC_CHANNELS.CLOUD_SYNC_UPLOAD_MANY),
	expertCloudSyncDownload: invoke(EXPERT_RPC_CHANNELS.CLOUD_SYNC_DOWNLOAD),
	expertCloudSyncDeleteCloud: invoke(EXPERT_RPC_CHANNELS.CLOUD_SYNC_DELETE_CLOUD)
};
//#endregion
//#region ../../packages/workbuddy-server/src/feedback/client.ts
var FEEDBACK_CHANNEL_MAP = { feedbackSubmit: invoke(FEEDBACK_RPC_CHANNELS.SUBMIT) };
//#endregion
//#region ../../packages/workbuddy-server/src/file-system/client.ts
var FILE_SYSTEM_CHANNEL_MAP = {
	fileRead: invoke(FILE_RPC_CHANNELS.READ, 3e5),
	fileWrite: invoke(FILE_RPC_CHANNELS.WRITE),
	fileWriteBatch: invoke(FILE_RPC_CHANNELS.WRITE_BATCH),
	fileListDir: invoke(FILE_RPC_CHANNELS.LIST_DIR),
	fileExists: invoke(FILE_RPC_CHANNELS.EXISTS),
	fileMakeDir: invoke(FILE_RPC_CHANNELS.MAKE_DIR),
	fileRemove: invoke(FILE_RPC_CHANNELS.REMOVE),
	fileRename: invoke(FILE_RPC_CHANNELS.RENAME),
	fileGetInfo: invoke(FILE_RPC_CHANNELS.GET_INFO),
	fileSearch: invoke(FILE_RPC_CHANNELS.SEARCH),
	fileUpload: invoke(FILE_RPC_CHANNELS.UPLOAD),
	fileReadChunked: invoke(FILE_RPC_CHANNELS.READ_CHUNKED, 6e4),
	ioAppendRecord: invoke(IO_RPC_CHANNELS.APPEND_RECORD),
	workspaceInitialize: invoke(WORKSPACE_RPC_CHANNELS.INITIALIZE),
	workspaceGetCurrent: invoke(WORKSPACE_RPC_CHANNELS.GET_CURRENT),
	workspaceGenerateDefaultCwd: invoke(WORKSPACE_RPC_CHANNELS.GENERATE_DEFAULT_CWD),
	workspaceGetClawCwd: invoke(WORKSPACE_RPC_CHANNELS.GET_CLAW_CWD),
	workspaceOpen: invoke(WORKSPACE_RPC_CHANNELS.OPEN),
	workspaceOpenFolder: invoke(WORKSPACE_RPC_CHANNELS.OPEN_FOLDER),
	workspaceSearchFile: invoke(WORKSPACE_RPC_CHANNELS.SEARCH_FILE),
	workspaceCheckPathExists: invoke(WORKSPACE_RPC_CHANNELS.CHECK_PATH_EXISTS),
	workspaceCheckPathsExist: invoke(WORKSPACE_RPC_CHANNELS.CHECK_PATHS_EXIST),
	workspaceCheckAccess: invoke(WORKSPACE_RPC_CHANNELS.CHECK_ACCESS),
	storageGetSessions: invoke(STORAGE_RPC_CHANNELS.GET_SESSIONS),
	storageUpsertSession: invoke(STORAGE_RPC_CHANNELS.UPSERT_SESSION),
	storageDeleteSession: invoke(STORAGE_RPC_CHANNELS.DELETE_SESSION),
	storageGetWorkspaces: invoke(STORAGE_RPC_CHANNELS.GET_WORKSPACES),
	storageUpdateSessionPermissionMode: invoke(STORAGE_RPC_CHANNELS.UPDATE_SESSION_PERMISSION_MODE),
	storageGetRecoveryNotice: invoke(STORAGE_RPC_CHANNELS.GET_RECOVERY_NOTICE),
	reportRuntimeEvent: invoke(require_contract$1.SESSION_RPC_CHANNELS.REPORT_RUNTIME_EVENT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/growth/client.ts
var GROWTH_CHANNEL_MAP = { growthGetBuddy: invoke(GROWTH_RPC_CHANNELS.GET_BUDDY) };
//#endregion
//#region ../../packages/workbuddy-server/src/idle-capability/client.ts
var IDLE_CAPABILITY_CHANNEL_MAP = {
	idleCapabilityRecordUsage: invoke(IDLE_CAPABILITY_RPC_CHANNELS.RECORD_USAGE),
	idleCapabilityRecordActiveDay: invoke(IDLE_CAPABILITY_RPC_CHANNELS.RECORD_ACTIVE_DAY),
	idleCapabilityGetIdleCardData: invoke(IDLE_CAPABILITY_RPC_CHANNELS.GET_IDLE_CARD_DATA),
	idleCapabilityMarkShown: invoke(IDLE_CAPABILITY_RPC_CHANNELS.MARK_SHOWN),
	idleCapabilityDismiss: invoke(IDLE_CAPABILITY_RPC_CHANNELS.DISMISS),
	idleCapabilityDismissGlobal: invoke(IDLE_CAPABILITY_RPC_CHANNELS.DISMISS_GLOBAL),
	idleCapabilityForgetCapability: invoke(IDLE_CAPABILITY_RPC_CHANNELS.FORGET_CAPABILITY),
	idleCapabilityListCandidates: invoke(IDLE_CAPABILITY_RPC_CHANNELS.LIST_CANDIDATES)
};
//#endregion
//#region ../../packages/workbuddy-server/src/ima/client.ts
/**
* ima 集成 channel map
*
* 方法命名约定（与其他 domain 一致）：`ima{Domain}{Action}`
*/
var IMA_CHANNEL_MAP = {
	imaAuthStart: invoke(IMA_RPC_CHANNELS.AUTH_START),
	imaAuthStatus: invoke(IMA_RPC_CHANNELS.AUTH_STATUS),
	imaAuthRefresh: invoke(IMA_RPC_CHANNELS.AUTH_REFRESH),
	imaAuthLogout: invoke(IMA_RPC_CHANNELS.AUTH_LOGOUT),
	imaKbList: invoke(IMA_RPC_CHANNELS.KB_LIST),
	imaKbSearch: invoke(IMA_RPC_CHANNELS.KB_SEARCH),
	imaKbInfoByShareLink: invoke(IMA_RPC_CHANNELS.KB_INFO_BY_SHARE_LINK),
	imaFilesList: invoke(IMA_RPC_CHANNELS.FILES_LIST),
	imaFilesSearch: invoke(IMA_RPC_CHANNELS.FILES_SEARCH),
	imaFilesViewUrl: invoke(IMA_RPC_CHANNELS.FILES_VIEW_URL),
	imaFilesDownloadUrl: invoke(IMA_RPC_CHANNELS.FILES_DOWNLOAD_URL),
	imaFilesContent: invoke(IMA_RPC_CHANNELS.FILES_CONTENT),
	imaFilesBlob: invoke(IMA_RPC_CHANNELS.FILES_BLOB),
	imaFilesUpload: invoke(IMA_RPC_CHANNELS.FILES_UPLOAD),
	imaFilesCancelUpload: invoke(IMA_RPC_CHANNELS.FILES_CANCEL_UPLOAD),
	imaFilesUploadByPath: invoke(IMA_RPC_CHANNELS.FILES_UPLOAD_BY_PATH),
	imaFilesSdkPreview: invoke(IMA_RPC_CHANNELS.FILES_SDK_PREVIEW),
	/** 「保存到 ima 知识库」上传进度事件。payload: ImaUploadProgressEvent */
	imaOnUploadProgress: listener(IMA_RPC_CHANNELS.UPLOAD_PROGRESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/inspiration/client.ts
var INSPIRATION_CHANNEL_MAP = {
	inspirationList: invoke(INSPIRATION_RPC_CHANNELS.LIST),
	inspirationDetail: invoke(INSPIRATION_RPC_CHANNELS.DETAIL),
	inspirationSettingsGet: invoke(INSPIRATION_RPC_CHANNELS.SETTINGS_GET),
	inspirationSettingsSave: invoke(INSPIRATION_RPC_CHANNELS.SETTINGS_SAVE),
	inspirationOnboardingCheck: invoke(INSPIRATION_RPC_CHANNELS.ONBOARDING_CHECK),
	inspirationOnboardingComplete: invoke(INSPIRATION_RPC_CHANNELS.ONBOARDING_COMPLETE),
	inspirationFeedback: invoke(INSPIRATION_RPC_CHANNELS.FEEDBACK),
	inspirationMarkRead: invoke(INSPIRATION_RPC_CHANNELS.MARK_READ),
	inspirationMarkAllRead: invoke(INSPIRATION_RPC_CHANNELS.MARK_ALL_READ),
	inspirationSave: invoke(INSPIRATION_RPC_CHANNELS.SAVE),
	inspirationRecordTabView: invoke(INSPIRATION_RPC_CHANNELS.RECORD_TAB_VIEW),
	inspirationInjectDemo: invoke(INSPIRATION_RPC_CHANNELS.INJECT_DEMO),
	inspirationCurationList: invoke(INSPIRATION_CURATION_RPC_CHANNELS.LIST),
	inspirationCurationAdd: invoke(INSPIRATION_CURATION_RPC_CHANNELS.ADD),
	inspirationCurationUpdate: invoke(INSPIRATION_CURATION_RPC_CHANNELS.UPDATE),
	inspirationCurationDelete: invoke(INSPIRATION_CURATION_RPC_CHANNELS.DELETE)
};
//#endregion
//#region ../../packages/workbuddy-server/src/link-preview/client.ts
/**
* link-preview channel map。
*
* 方法命名约定（与其他 domain 一致）：`linkPreview{Action}`；
* WB facade 会剥掉 `linkPreview` 前缀，得到 `wb.linkPreview.resolveTitle`。
*/
var LINK_PREVIEW_CHANNEL_MAP = { linkPreviewResolveTitle: invoke({ RESOLVE_TITLE: "linkPreview:resolveTitle" }.RESOLVE_TITLE) };
//#endregion
//#region ../../packages/workbuddy-server/src/mcp/client.ts
var MCP_CHANNEL_MAP = {
	mcpList: invoke(MCP_RPC_CHANNELS.LIST),
	mcpSave: invoke(MCP_RPC_CHANNELS.SAVE),
	mcpRemove: invoke(MCP_RPC_CHANNELS.REMOVE),
	mcpDescribe: invoke(MCP_RPC_CHANNELS.DESCRIBE),
	mcpConnect: invoke(MCP_RPC_CHANNELS.CONNECT),
	mcpCallTool: invoke(MCP_RPC_CHANNELS.CALL_TOOL, 3e4),
	mcpDisconnect: invoke(MCP_RPC_CHANNELS.DISCONNECT),
	mcpSetEnabled: invoke(MCP_RPC_CHANNELS.SET_ENABLED),
	mcpSetToolEnabled: invoke(MCP_RPC_CHANNELS.SET_TOOL_ENABLED),
	mcpApprove: invoke(MCP_RPC_CHANNELS.APPROVE),
	mcpBeginAuthorization: invoke(MCP_RPC_CHANNELS.BEGIN_AUTHORIZATION),
	mcpHandleExternalOAuthCallback: invoke(MCP_RPC_CHANNELS.HANDLE_EXTERNAL_OAUTH_CALLBACK),
	mcpRevokeCredentials: invoke(MCP_RPC_CHANNELS.REVOKE_CREDENTIALS),
	mcpRefresh: invoke(MCP_RPC_CHANNELS.REFRESH)
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
	staticHtmlRegisterDir: invoke(STATIC_HTML_RPC_CHANNELS.REGISTER_DIR),
	staticHtmlResolveMioraViewer: invoke(STATIC_HTML_RPC_CHANNELS.RESOLVE_MIORA_VIEWER)
};
//#endregion
//#region ../../packages/workbuddy-server/src/microphone/client.ts
var MICROPHONE_CHANNEL_MAP = {
	getMicrophonePermission: invoke(MICROPHONE_RPC_CHANNELS.GET_PERMISSION),
	requestMicrophonePermission: invoke(MICROPHONE_RPC_CHANNELS.REQUEST_PERMISSION),
	openMicrophoneSystemSettings: invoke(MICROPHONE_RPC_CHANNELS.OPEN_SYSTEM_SETTINGS),
	onMicrophonePermissionChanged: listener(MICROPHONE_RPC_CHANNELS.PERMISSION_CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/migration/client.ts
var MIGRATION_CHANNEL_MAP = {
	migrationGetHistoryStatus: invoke(MIGRATION_RPC_CHANNELS.GET_HISTORY_STATUS),
	onMigrationHistoryStatusUpdate: listener(MIGRATION_RPC_CHANNELS.HISTORY_STATUS_UPDATE),
	onMigrationHistoryProgress: listener(MIGRATION_RPC_CHANNELS.HISTORY_PROGRESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/my-files/client.ts
var MY_FILES_CHANNEL_MAP = {
	myFilesGetTaskArtifacts: invoke(MY_FILES_RPC_CHANNELS.GET_TASK_ARTIFACTS),
	getNetDriveAccessToken: invoke(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_ACCESS_TOKEN),
	getNetDriveNicknames: invoke(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_NICKNAMES),
	getNetDrivePurchaseCode: invoke(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_PURCHASE_CODE),
	getNetDriveEnterpriseInfo: invoke(MY_FILES_RPC_CHANNELS.GET_NETDRIVE_ENTERPRISE_INFO),
	myFilesUploadToDrive: invoke(MY_FILES_RPC_CHANNELS.UPLOAD_TO_DRIVE),
	downloadFileToLocal: invoke(MY_FILES_RPC_CHANNELS.DOWNLOAD_FILE_TO_LOCAL),
	cleanupDownloadedTemporaryFile: invoke(MY_FILES_RPC_CHANNELS.CLEANUP_DOWNLOADED_TEMPORARY_FILE),
	reportFileEvents: invoke(MY_FILES_RPC_CHANNELS.REPORT_FILE_EVENTS),
	myFilesGetFilePaths: invoke(MY_FILES_RPC_CHANNELS.GET_FILE_PATHS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/native-runtime/contract.ts
/**
* Native runtime · 契约。
*
* Browser Use / Computer Use 的原生二进制以两个标准 plugin 交付（`browser-use` / `computer-use`）。
* **每个插件自成一个目录市场**（`workbuddy-<plugin>`），各自独立发布、独立更新；客户端只探测一个
* 小 `version.json`（每平台、每插件一个列表），按主端版本选 zip，下载后注册成本地目录市场，
* 安装 / 启停 / 更新全部走插件系统。
*/
var NATIVE_RUNTIME_PLUGIN_NAMES = ["browser-use", "computer-use"];
function isNativeRuntimePluginName(value) {
	return NATIVE_RUNTIME_PLUGIN_NAMES.includes(value);
}
/** 每个插件自己的目录市场名；插件 ID 即 `<plugin>@workbuddy-<plugin>`。 */
var NATIVE_RUNTIME_MARKETPLACE_NAMES = {
	"browser-use": "workbuddy-browser-use",
	"computer-use": "workbuddy-computer-use"
};
/**
* 主端对每个插件的最低版本要求：改动主端与运行时之间的契约面（会话 env、协议、固定文件名）
* 时抬这里。已装版本低于它 = 视为未安装，自动重装。比的是版本号前三段（见 `plugin-version.ts`）：
* Computer Use 的第四段是上游 commit 短号，只是标识、不参与比较。
*/
var MIN_RUNTIME_VERSION = {
	"browser-use": "1.0.0",
	"computer-use": "0.0.2"
};
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
	nativeRuntimeGetStatus: invoke(NATIVE_RUNTIME_RPC_CHANNELS.GET_STATUS),
	nativeRuntimeInstall: invoke(NATIVE_RUNTIME_RPC_CHANNELS.INSTALL, 9e5),
	nativeRuntimeSetEnabled: invoke(NATIVE_RUNTIME_RPC_CHANNELS.SET_ENABLED),
	nativeRuntimeCheckForUpdates: invoke(NATIVE_RUNTIME_RPC_CHANNELS.CHECK_FOR_UPDATES, 9e5),
	onNativeRuntimeChanged: listener(NATIVE_RUNTIME_RPC_CHANNELS.CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/plugin/client.ts
var PLUGIN_CHANNEL_MAP = {
	batchTogglePlugins: invoke(PLUGIN_RPC_CHANNELS.BATCH_TOGGLE),
	getInstalledPlugins: invoke(PLUGIN_RPC_CHANNELS.GET_INSTALLED),
	installPlugins: invoke(PLUGIN_RPC_CHANNELS.INSTALL),
	uninstallPlugin: invoke(PLUGIN_RPC_CHANNELS.UNINSTALL),
	updatePlugin: invoke(PLUGIN_RPC_CHANNELS.UPDATE),
	getPluginMarketplaces: invoke(PLUGIN_RPC_CHANNELS.GET_MARKETPLACES),
	getMarketplacePlugins: invoke(PLUGIN_RPC_CHANNELS.GET_MARKETPLACE_PLUGINS),
	getPluginDetail: invoke(PLUGIN_RPC_CHANNELS.GET_DETAIL),
	addPluginMarketplace: invoke(PLUGIN_RPC_CHANNELS.ADD_MARKETPLACE),
	removePluginMarketplace: invoke(PLUGIN_RPC_CHANNELS.REMOVE_MARKETPLACE),
	refreshPluginMarketplace: invoke(PLUGIN_RPC_CHANNELS.REFRESH_MARKETPLACE),
	reloadRuntimePlugins: invoke(PLUGIN_RPC_CHANNELS.RELOAD_RUNTIME_PLUGINS),
	setMarketplaceAutoUpdate: invoke(PLUGIN_RPC_CHANNELS.SET_MARKETPLACE_AUTO_UPDATE),
	onPluginsChanged: listener(PLUGIN_RPC_CHANNELS.CHANGED)
};
//#endregion
//#region ../../packages/workbuddy-server/src/plugin-recommendation/client.ts
var PLUGIN_RECOMMENDATION_CHANNEL_MAP = { answerPluginRecommendation: invoke({ 
/** Kept wire-compatible with existing renderer clients. */
ANSWER: "session:answerPluginRecommendation" }.ANSWER) };
//#endregion
//#region ../../packages/workbuddy-server/src/poi/client.ts
/**
* POI channel map — renderer DaemonClient wiring（genie#52769 阶段五）
*/
var POI_CHANNEL_MAP = {
	poiIpLocate: invoke(require_contract$3.POI_RPC_CHANNELS.IP_LOCATE),
	poiGeocode: invoke(require_contract$3.POI_RPC_CHANNELS.GEOCODE),
	poiSuggestion: invoke(require_contract$3.POI_RPC_CHANNELS.SUGGESTION),
	poiGetAddressList: invoke(require_contract$3.POI_RPC_CHANNELS.GET_ADDRESS_LIST),
	poiCreateAddress: invoke(require_contract$3.POI_RPC_CHANNELS.CREATE_ADDRESS),
	poiUpdateAddress: invoke(require_contract$3.POI_RPC_CHANNELS.UPDATE_ADDRESS),
	poiDeleteAddress: invoke(require_contract$3.POI_RPC_CHANNELS.DELETE_ADDRESS),
	poiSetDefaultAddress: invoke(require_contract$3.POI_RPC_CHANNELS.SET_DEFAULT_ADDRESS)
};
//#endregion
//#region ../../packages/workbuddy-server/src/project-commands/client.ts
var PROJECT_COMMANDS_CHANNEL_MAP = { projectCommandsList: invoke({ LIST: "projectCommands:list" }.LIST) };
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
	getProxySettings: invoke(PROXY_SETTINGS_RPC_CHANNELS.GET_SETTINGS),
	saveProxySettings: invoke(PROXY_SETTINGS_RPC_CHANNELS.SAVE_SETTINGS),
	testProxyConnection: invoke(PROXY_SETTINGS_RPC_CHANNELS.TEST_CONNECTION)
};
//#endregion
//#region ../../packages/workbuddy-server/src/sandbox/client.ts
var SANDBOX_CHANNEL_MAP = {
	sandboxRespondToIntercept: invoke(SANDBOX_RPC_CHANNELS.RESPOND_TO_INTERCEPT),
	onSandboxInterceptRequest: listener(SANDBOX_RPC_CHANNELS.INTERCEPT_REQUEST),
	sandboxPreviewRegisterMount: invoke(SANDBOX_RPC_CHANNELS.REGISTER_MOUNT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/security-center/contract.ts
var SECURITY_CENTER_RPC_CHANNELS = {
	GET_STATE: "securityCenter:getState",
	GET_TOOL_CONTROL_STATE: "securityCenter:getToolControlState",
	UPDATE_TOOL_CONTROL: "securityCenter:updateToolControl",
	SAVE_SANDBOX_RULES_CONFIG: "securityCenter:saveSandboxRulesConfig",
	SAVE_SANDBOX_SAFETY_ENABLED: "securityCenter:saveSandboxSafetyEnabled",
	SAVE_SENSITIVE_PROTECTION_ENABLED: "securityCenter:saveSensitiveProtectionEnabled",
	QUERY_SENSITIVE_PROTECTION_RULES: "securityCenter:querySensitiveProtectionRules",
	QUERY_SENSITIVE_PROTECTION_ENTRIES: "securityCenter:querySensitiveProtectionEntries",
	EXECUTE_SENSITIVE_PROTECTION_MUTATION: "securityCenter:executeSensitiveProtectionMutation",
	CLEAR_AUDIT_LOG: "securityCenter:clearAuditLog",
	QUERY_AUDIT_LOG: "securityCenter:queryAuditLog",
	EXPORT_AUDIT_LOG: "securityCenter:exportAuditLog",
	SAVE_EXPERIMENTAL_FEATURES_CONFIG: "securityCenter:saveExperimentalFeaturesConfig",
	GET_EXPERIMENTAL_FEATURES_CONFIG: "securityCenter:getExperimentalFeaturesConfig",
	OPEN_MODIFY_BACKUP_DIR: "securityCenter:openModifyBackupDir",
	REQUEST_SENSITIVE_APPROVAL: "securityCenter:requestSensitiveApproval",
	CANCEL_SENSITIVE_APPROVAL: "securityCenter:cancelSensitiveApproval"
};
var MAC_BUNDLED_RUNTIME_TOOL_KEYS = [
	"node",
	"python",
	"brokeredShell"
];
function normalizeSafeDeleteBulkThreshold(value) {
	return Number.isInteger(value) && value >= 1 && value <= 99999 ? value : 50;
}
function requireSafeDeleteBulkThreshold(value) {
	if (!Number.isInteger(value) || value < 1 || value > 99999) throw new Error("safeDeleteBulkThreshold must be an integer between 1 and 99999");
	return value;
}
//#endregion
//#region ../../packages/workbuddy-server/src/security-center/client.ts
var SECURITY_CENTER_CHANNEL_MAP = {
	securityCenterGetState: invoke(SECURITY_CENTER_RPC_CHANNELS.GET_STATE),
	securityCenterGetToolControlState: invoke(SECURITY_CENTER_RPC_CHANNELS.GET_TOOL_CONTROL_STATE),
	securityCenterUpdateToolControl: invoke(SECURITY_CENTER_RPC_CHANNELS.UPDATE_TOOL_CONTROL),
	securityCenterSaveSandboxRulesConfig: invoke(SECURITY_CENTER_RPC_CHANNELS.SAVE_SANDBOX_RULES_CONFIG),
	securityCenterSaveSandboxSafetyEnabled: invoke(SECURITY_CENTER_RPC_CHANNELS.SAVE_SANDBOX_SAFETY_ENABLED),
	securityCenterSaveSensitiveProtectionEnabled: invoke(SECURITY_CENTER_RPC_CHANNELS.SAVE_SENSITIVE_PROTECTION_ENABLED),
	securityCenterQuerySensitiveProtectionRules: invoke(SECURITY_CENTER_RPC_CHANNELS.QUERY_SENSITIVE_PROTECTION_RULES),
	securityCenterQuerySensitiveProtectionEntries: invoke(SECURITY_CENTER_RPC_CHANNELS.QUERY_SENSITIVE_PROTECTION_ENTRIES),
	securityCenterExecuteSensitiveProtectionMutation: invoke(SECURITY_CENTER_RPC_CHANNELS.EXECUTE_SENSITIVE_PROTECTION_MUTATION),
	securityCenterClearAuditLog: invoke(SECURITY_CENTER_RPC_CHANNELS.CLEAR_AUDIT_LOG),
	securityCenterQueryAuditLog: invoke(SECURITY_CENTER_RPC_CHANNELS.QUERY_AUDIT_LOG),
	securityCenterExportAuditLog: invoke(SECURITY_CENTER_RPC_CHANNELS.EXPORT_AUDIT_LOG),
	securityCenterSaveExperimentalFeaturesConfig: invoke(SECURITY_CENTER_RPC_CHANNELS.SAVE_EXPERIMENTAL_FEATURES_CONFIG),
	securityCenterGetExperimentalFeaturesConfig: invoke(SECURITY_CENTER_RPC_CHANNELS.GET_EXPERIMENTAL_FEATURES_CONFIG),
	securityCenterOpenModifyBackupDir: invoke(SECURITY_CENTER_RPC_CHANNELS.OPEN_MODIFY_BACKUP_DIR),
	securityCenterRequestSensitiveApproval: invoke(SECURITY_CENTER_RPC_CHANNELS.REQUEST_SENSITIVE_APPROVAL),
	securityCenterCancelSensitiveApproval: invoke(SECURITY_CENTER_RPC_CHANNELS.CANCEL_SENSITIVE_APPROVAL)
};
//#endregion
//#region ../../packages/workbuddy-server/src/session/client.ts
var SESSION_CHANNEL_MAP = {
	createSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.CREATE),
	destroySession: invoke(require_contract$1.SESSION_RPC_CHANNELS.DESTROY),
	deleteSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.DELETE),
	listSessions: invoke(require_contract$1.SESSION_RPC_CHANNELS.LIST),
	loadSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.LOAD),
	prompt: invoke(require_contract$1.SESSION_RPC_CHANNELS.SEND_MESSAGE),
	cancel: invoke(require_contract$1.SESSION_RPC_CHANNELS.CANCEL),
	respondToPermission: invoke(require_contract$1.SESSION_RPC_CHANNELS.RESOLVE_PERMISSION),
	rejectPermission: invoke(require_contract$1.SESSION_RPC_CHANNELS.REJECT_PERMISSION),
	resolveInterruption: invoke(require_contract$1.SESSION_RPC_CHANNELS.RESOLVE_INTERRUPTION),
	getSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET),
	getSessionTeamRuntime: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_TEAM_RUNTIME),
	archiveSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.ARCHIVE),
	renameSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.RENAME),
	moveSession: invoke(require_contract$1.SESSION_RPC_CHANNELS.MOVE),
	updateSessionStatus: invoke(require_contract$1.SESSION_RPC_CHANNELS.UPDATE_STATUS),
	getAvailableCommands: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_AVAILABLE_COMMANDS),
	getSubagentList: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_SUBAGENT_LIST),
	respondToSampling: invoke(require_contract$1.SESSION_RPC_CHANNELS.RESPOND_TO_SAMPLING),
	respondToRoots: invoke(require_contract$1.SESSION_RPC_CHANNELS.RESPOND_TO_ROOTS),
	requestYield: invoke(require_contract$1.SESSION_RPC_CHANNELS.REQUEST_YIELD),
	getMessageQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_MESSAGE_QUEUE),
	saveMessageQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.SAVE_MESSAGE_QUEUE),
	enqueueMessage: invoke(require_contract$1.SESSION_RPC_CHANNELS.ENQUEUE_MESSAGE),
	removeQueueItem: invoke(require_contract$1.SESSION_RPC_CHANNELS.REMOVE_QUEUE_ITEM),
	popQueueItemForEdit: invoke(require_contract$1.SESSION_RPC_CHANNELS.POP_QUEUE_ITEM_FOR_EDIT),
	reorderQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.REORDER_QUEUE),
	sendQueueItemNow: invoke(require_contract$1.SESSION_RPC_CHANNELS.SEND_QUEUE_ITEM_NOW),
	activateQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.ACTIVATE_QUEUE),
	pauseQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.PAUSE_QUEUE),
	resumeQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.RESUME_QUEUE),
	cancelQueue: invoke(require_contract$1.SESSION_RPC_CHANNELS.CANCEL_QUEUE),
	getQueueState: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_QUEUE_STATE),
	setSessionMode: invoke(require_contract$1.SESSION_RPC_CHANNELS.SET_MODE),
	setSessionModel: invoke(require_contract$1.SESSION_RPC_CHANNELS.SET_MODEL),
	setSessionConfigOption: invoke(require_contract$1.SESSION_RPC_CHANNELS.SET_CONFIG_OPTION),
	updateSessionConfig: invoke(require_contract$1.SESSION_RPC_CHANNELS.UPDATE_CONFIG),
	answerQuestion: invoke(require_contract$1.SESSION_RPC_CHANNELS.ANSWER_QUESTION),
	cancelQuestion: invoke(require_contract$1.SESSION_RPC_CHANNELS.CANCEL_QUESTION),
	answerPoiQuestion: invoke(require_contract$1.SESSION_RPC_CHANNELS.ANSWER_POI_QUESTION),
	answerAppPickQuestion: invoke(require_contract$1.SESSION_RPC_CHANNELS.ANSWER_APP_PICK_QUESTION),
	answerCloudServiceConfirmation: invoke(require_contract$1.SESSION_RPC_CHANNELS.ANSWER_CLOUD_SERVICE_CONFIRMATION),
	pushSessionPoi: invoke(require_contract$1.SESSION_RPC_CHANNELS.PUSH_SESSION_POI),
	respondElicitation: invoke(require_contract$1.SESSION_RPC_CHANNELS.RESPOND_ELICITATION),
	onSessionUpserted: listener(require_contract$1.SESSION_RPC_CHANNELS.UPSERTED),
	onSessionDeleted: listener(require_contract$1.SESSION_RPC_CHANNELS.DELETED),
	onSessionEvent: listener(require_contract$1.SESSION_RPC_CHANNELS.EVENT),
	onSessionNavigate: listener(require_contract$1.SESSION_RPC_CHANNELS.NAVIGATE),
	notifyPermissionPendingApproval: invoke(require_contract$1.SESSION_RPC_CHANNELS.NOTIFY_PERMISSION_PENDING_APPROVAL),
	notifyPermissionResolvedFromLocal: invoke(require_contract$1.SESSION_RPC_CHANNELS.NOTIFY_PERMISSION_RESOLVED_FROM_LOCAL),
	notifyListenerReady: invoke(require_contract$1.SESSION_RPC_CHANNELS.NOTIFY_LISTENER_READY),
	getPersistedUsage: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_PERSISTED_USAGE),
	getLastUsageEvent: invoke(require_contract$1.SESSION_RPC_CHANNELS.GET_LAST_USAGE_EVENT),
	sessionRollback: invoke(require_contract$1.SESSION_RPC_CHANNELS.ROLLBACK)
};
//#endregion
//#region ../../packages/workbuddy-server/src/share/client.ts
var SHARE_CHANNEL_MAP = {
	shareUploadFile: invoke(SHARE_RPC_CHANNELS.UPLOAD_FILE),
	shareUploadImage: invoke(SHARE_RPC_CHANNELS.UPLOAD_IMAGE),
	shareUploadToKnowledge: invoke(SHARE_RPC_CHANNELS.UPLOAD_TO_KNOWLEDGE),
	shareCreateLink: invoke(SHARE_RPC_CHANNELS.CREATE_LINK),
	shareGetList: invoke(SHARE_RPC_CHANNELS.GET_LIST),
	shareDownloadFile: invoke(SHARE_RPC_CHANNELS.DOWNLOAD_FILE),
	shareSetEnabled: invoke(SHARE_RPC_CHANNELS.SET_ENABLED),
	shareGetDetail: invoke(SHARE_RPC_CHANNELS.GET_DETAIL),
	shareVerify: invoke(SHARE_RPC_CHANNELS.VERIFY),
	sharePrepareTask: invoke(SHARE_RPC_CHANNELS.PREPARE_TASK),
	shareUploadTaskFile: invoke(SHARE_RPC_CHANNELS.UPLOAD_TASK_FILE),
	shareConfirmTask: invoke(SHARE_RPC_CHANNELS.CONFIRM_TASK),
	shareCancelTask: invoke(SHARE_RPC_CHANNELS.CANCEL_TASK),
	shareGetTaskList: invoke(SHARE_RPC_CHANNELS.GET_TASK_LIST),
	shareDeleteTask: invoke(SHARE_RPC_CHANNELS.DELETE_TASK),
	shareGenerateWxMPQRCode: invoke(SHARE_RPC_CHANNELS.GENERATE_WXMP_QRCODE),
	shareBatchMoveKnowledgeNodes: invoke(SHARE_RPC_CHANNELS.BATCH_MOVE_KNOWLEDGE_NODES),
	shareInvitePermission: invoke(SHARE_RPC_CHANNELS.INVITE_PERMISSION),
	shareSetPermission: invoke(SHARE_RPC_CHANNELS.SET_PERMISSION),
	shareGetPermission: invoke(SHARE_RPC_CHANNELS.GET_PERMISSION),
	shareGetShareCollabPolicy: invoke(SHARE_RPC_CHANNELS.GET_SHARE_COLLAB_POLICY),
	shareGetCollaborators: invoke(SHARE_RPC_CHANNELS.GET_COLLABORATORS),
	shareSetMemberPermission: invoke(SHARE_RPC_CHANNELS.SET_MEMBER_PERMISSION),
	shareQueryPageInfo: invoke(SHARE_RPC_CHANNELS.QUERY_PAGE_INFO),
	shareGetNodeInfo: invoke(SHARE_RPC_CHANNELS.GET_NODE_INFO),
	sharePublishPage: invoke(SHARE_RPC_CHANNELS.PUBLISH_PAGE),
	shareUnpublishPage: invoke(SHARE_RPC_CHANNELS.UNPUBLISH_PAGE),
	shareUploadLocalFileToCos: invoke(SHARE_RPC_CHANNELS.UPLOAD_LOCAL_FILE_TO_COS),
	shareQueryImportProgress: invoke(SHARE_RPC_CHANNELS.QUERY_IMPORT_PROGRESS),
	shareUploadShareTemplate: invoke(SHARE_RPC_CHANNELS.UPLOAD_SHARE_TEMPLATE)
};
//#endregion
//#region ../../packages/workbuddy-server/src/skill/client.ts
var SKILLS_CHANNEL_MAP = {
	skillList: invoke(SKILL_RPC_CHANNELS.LIST),
	skillImport: invoke(SKILL_RPC_CHANNELS.IMPORT),
	skillToggle: invoke(SKILL_RPC_CHANNELS.TOGGLE),
	skillBatchToggle: invoke(SKILL_RPC_CHANNELS.BATCH_TOGGLE),
	skillDelete: invoke(SKILL_RPC_CHANNELS.DELETE),
	skillContent: invoke(SKILL_RPC_CHANNELS.CONTENT),
	skillInstallByPath: invoke(SKILL_RPC_CHANNELS.INSTALL_BY_PATH),
	skillPrepareFromUrl: invoke(SKILL_RPC_CHANNELS.PREPARE_FROM_URL),
	skillGetContent: invoke(SKILL_RPC_CHANNELS.GET_CONTENT),
	skillGetMarketplace: invoke(SKILL_RPC_CHANNELS.GET_MARKETPLACE),
	skillGetMarketplaceContent: invoke(SKILL_RPC_CHANNELS.GET_MARKETPLACE_CONTENT),
	skillInstallMarketplace: invoke(SKILL_RPC_CHANNELS.INSTALL_MARKETPLACE),
	skillQueryScanResult: invoke(SKILL_RPC_CHANNELS.QUERY_SCAN_RESULT),
	skillInstallFromUrl: invoke(SKILL_RPC_CHANNELS.INSTALL_FROM_URL),
	skillRecommend: invoke(SKILL_RPC_CHANNELS.RECOMMEND),
	skillQueryConsistency: invoke(SKILL_RPC_CHANNELS.QUERY_CONSISTENCY),
	skillExportZip: invoke(SKILL_RPC_CHANNELS.EXPORT_ZIP),
	skillEnsureBuddySkills: invoke(SKILL_RPC_CHANNELS.ENSURE_BUDDY),
	skillRemoveBuddySkills: invoke(SKILL_RPC_CHANNELS.REMOVE_BUDDY),
	skillPruneBuddySkillBuckets: invoke(SKILL_RPC_CHANNELS.PRUNE_BUDDY_BUCKETS),
	skillListBuddyStoreSkillMetas: invoke(SKILL_RPC_CHANNELS.LIST_BUDDY_STORE_METAS),
	skillUpdateBuddyStoreSkill: invoke(SKILL_RPC_CHANNELS.UPDATE_BUDDY_STORE_SKILL),
	skillMarketConfigSyncRunOnce: invoke(SKILL_RPC_CHANNELS.MARKET_CONFIG_SYNC_RUN_ONCE),
	skillMarketInstallConfigList: invoke(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_LIST),
	skillMarketInstallConfigInstall: invoke(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_INSTALL),
	skillMarketInstallConfigUninstall: invoke(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_UNINSTALL),
	skillMarketInstallConfigEnsureLocal: invoke(SKILL_RPC_CHANNELS.MARKET_INSTALL_CONFIG_ENSURE_LOCAL),
	skillhubList: invoke(SKILLHUB_RPC_CHANNELS.LIST),
	skillhubCategories: invoke(SKILLHUB_RPC_CHANNELS.CATEGORIES),
	skillhubSearch: invoke(SKILLHUB_RPC_CHANNELS.SEARCH),
	skillhubDetail: invoke(SKILLHUB_RPC_CHANNELS.DETAIL),
	skillhubExists: invoke(SKILLHUB_RPC_CHANNELS.EXISTS),
	skillhubInstall: invoke(SKILLHUB_RPC_CHANNELS.INSTALL),
	skillhubReportStats: invoke(SKILLHUB_RPC_CHANNELS.REPORT_STATS),
	skillhubInstalledMetas: invoke(SKILLHUB_RPC_CHANNELS.INSTALLED_METAS),
	knotList: invoke(KNOT_RPC_CHANNELS.LIST),
	knotCategories: invoke(KNOT_RPC_CHANNELS.CATEGORIES),
	knotTags: invoke(KNOT_RPC_CHANNELS.TAGS),
	knotSearch: invoke(KNOT_RPC_CHANNELS.SEARCH),
	knotDetail: invoke(KNOT_RPC_CHANNELS.DETAIL),
	knotExists: invoke(KNOT_RPC_CHANNELS.EXISTS),
	knotInstall: invoke(KNOT_RPC_CHANNELS.INSTALL),
	knotReportStats: invoke(KNOT_RPC_CHANNELS.REPORT_STATS),
	knotInstalledMetas: invoke(KNOT_RPC_CHANNELS.INSTALLED_METAS),
	knotGetByIds: invoke(KNOT_RPC_CHANNELS.GET_BY_IDS),
	builtinMarketList: invoke(BUILTIN_MARKET_RPC_CHANNELS.LIST),
	builtinMarketGetByIds: invoke(BUILTIN_MARKET_RPC_CHANNELS.GET_BY_IDS),
	builtinMarketDownloadUrl: invoke(BUILTIN_MARKET_RPC_CHANNELS.DOWNLOAD_URL),
	builtinMarketCategories: invoke(BUILTIN_MARKET_RPC_CHANNELS.CATEGORIES),
	builtinMarketInstall: invoke(BUILTIN_MARKET_RPC_CHANNELS.INSTALL),
	builtinMarketInstalledMetas: invoke(BUILTIN_MARKET_RPC_CHANNELS.INSTALLED_METAS),
	builtinMarketBackfillSkillId: invoke(BUILTIN_MARKET_RPC_CHANNELS.BACKFILL_SKILL_ID),
	builtinMarketBackfillIconSource: invoke(BUILTIN_MARKET_RPC_CHANNELS.BACKFILL_ICON_SOURCE),
	builtinMarketBackfillDescription: invoke(BUILTIN_MARKET_RPC_CHANNELS.BACKFILL_DESCRIPTION),
	builtinMarketMigrateDirsToSkillId: invoke(BUILTIN_MARKET_RPC_CHANNELS.MIGRATE_DIRS_TO_SKILL_ID),
	builtinMarketGetLayout: invoke(BUILTIN_MARKET_RPC_CHANNELS.GET_LAYOUT),
	builtinMarketSearch: invoke(BUILTIN_MARKET_RPC_CHANNELS.SEARCH),
	enterpriseSkillsList: invoke(ENTERPRISE_SKILLS_RPC_CHANNELS.LIST),
	enterpriseSkillsGetCategories: invoke(ENTERPRISE_SKILLS_RPC_CHANNELS.GET_CATEGORIES),
	enterpriseSkillsProbeVisibility: invoke(ENTERPRISE_SKILLS_RPC_CHANNELS.PROBE_VISIBILITY),
	enterpriseSkillsInstall: invoke(ENTERPRISE_SKILLS_RPC_CHANNELS.INSTALL),
	marketplaceList: invoke(MARKETPLACE_RPC_CHANNELS.LIST),
	marketplaceInstall: invoke(MARKETPLACE_RPC_CHANNELS.INSTALL),
	marketplaceContent: invoke(MARKETPLACE_RPC_CHANNELS.CONTENT),
	skillsVersionChanged: listener(SKILL_EVENT_CHANNELS.VERSION_CHANGED),
	skillGetSkillsVersion: invoke(SKILL_RPC_CHANNELS.GET_SKILLS_VERSION)
};
//#endregion
//#region ../../packages/workbuddy-server/src/support/client.ts
var SUPPORT_CHANNEL_MAP = {
	memoryGetProfile: invoke(MEMORY_RPC_CHANNELS.GET_PROFILE),
	memorySaveSettings: invoke(MEMORY_RPC_CHANNELS.SAVE_SETTINGS),
	memorySubmitSuggestion: invoke(MEMORY_RPC_CHANNELS.SUBMIT_SUGGESTION),
	memoryImportContent: invoke(MEMORY_RPC_CHANNELS.IMPORT_CONTENT),
	memoryClearProfile: invoke(MEMORY_RPC_CHANNELS.CLEAR_PROFILE),
	memoryCheckUpdating: invoke(MEMORY_RPC_CHANNELS.CHECK_UPDATING)
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
	tencentDocsGetFileList: invoke("tencentDocs:getFileList"),
	tencentDocsSearchFiles: invoke("tencentDocs:searchFiles"),
	tencentDocsCreateFile: invoke("tencentDocs:createFile"),
	tencentDocsUploadFile: invoke("tencentDocs:uploadFile"),
	tencentDocsCancelUpload: invoke("tencentDocs:cancelUpload"),
	tencentDocsQueryUploadProgress: invoke("tencentDocs:queryUploadProgress"),
	tencentDocsDeleteFile: invoke("tencentDocs:deleteFile"),
	tencentDocsRenameFile: invoke("tencentDocs:renameFile"),
	tencentDocsGetUploadPageUrl: invoke("tencentDocs:getUploadPageUrl"),
	tencentDocsGetPreviewUrl: invoke("tencentDocs:getPreviewUrl"),
	tencentDocsQueryFileInfo: invoke("tencentDocs:queryFileInfo"),
	tencentDocsGetFolderContents: invoke("tencentDocs:getFolderContents"),
	tencentDocsCheckAuthStatus: invoke("tencentDocs:checkAuthStatus"),
	tencentDocsStartAuth: invoke("tencentDocs:startAuth"),
	tencentDocsRevokeAuth: invoke("tencentDocs:revokeAuth"),
	tencentDocsCreateSaasImport: invoke("tencentDocs:createSaasImport"),
	tencentDocsQuerySaasImportProgress: invoke("tencentDocs:querySaasImportProgress"),
	tencentDocsBatchCreateSaasImport: invoke("tencentDocs:batchCreateSaasImport"),
	tencentDocsQueryBatchSaasImportProgress: invoke("tencentDocs:queryBatchSaasImportProgress"),
	tencentDocsGetPersonalTdocCookie: invoke("tencentDocs:getPersonalTdocCookie"),
	tencentDocsGetTdocsLicense: invoke("tencentDocs:getTdocsLicense"),
	tencentDocsVerifyPersonalLicense: invoke("tencentDocs:verifyPersonalLicense"),
	tencentDocsInitUploadByEnterprise: invoke("tencentDocs:initUploadByEnterprise"),
	tencentDocsPrepareEnterpriseDocPreview: invoke("tencentDocs:prepareEnterpriseDocPreview"),
	oneidListApplications: invoke("oneid:listApplications"),
	oneidGetSSOLoginLink: invoke("oneid:getSSOLoginLink")
};
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-lexiang/client.ts
var TENCENT_LEXIANG_CHANNEL_MAP = {
	lexiangGatewayPost: invoke(TENCENT_LEXIANG_RPC_CHANNELS.GATEWAY_POST),
	lexiangUploadFile: invoke(TENCENT_LEXIANG_RPC_CHANNELS.UPLOAD_LEXIANG_FILE),
	lexiangUploadFolder: invoke(TENCENT_LEXIANG_RPC_CHANNELS.UPLOAD_LEXIANG_FOLDER),
	lexiangUploadHtml: invoke(TENCENT_LEXIANG_RPC_CHANNELS.UPLOAD_LEXIANG_HTML),
	lexiangClearWebCookies: invoke(TENCENT_LEXIANG_RPC_CHANNELS.CLEAR_WEB_COOKIES),
	lexiangCheckLicense: invoke(TENCENT_LEXIANG_RPC_CHANNELS.CHECK_LICENSE),
	lexiangCheckCompanyStatus: invoke(TENCENT_LEXIANG_RPC_CHANNELS.CHECK_COMPANY_STATUS),
	lexiangSpApiRequest: invoke(TENCENT_LEXIANG_RPC_CHANNELS.SP_API_REQUEST),
	lexiangInvalidateAccessToken: invoke(TENCENT_LEXIANG_RPC_CHANNELS.INVALIDATE_ACCESS_TOKEN)
};
//#endregion
//#region ../../packages/workbuddy-server/src/tts/client.ts
var TTS_CHANNEL_MAP = {
	startTts: invoke(TTS_RPC_CHANNELS.START_TTS),
	stopTts: invoke(TTS_RPC_CHANNELS.STOP_TTS),
	onTtsEvent: listener(TTS_RPC_CHANNELS.EVENT)
};
//#endregion
//#region ../../packages/workbuddy-server/src/wechat-chat-history/client.ts
/**
* Client channel map for the `wechat-chat-history` module.
*
* Mirrors `share/client.ts` / `my-files/client.ts`.
*/
var WECHAT_CHAT_HISTORY_CHANNEL_MAP = {
	wechatChatHistoryParseZipMetadata: invoke(require_contract$4.WECHAT_CHAT_HISTORY_RPC_CHANNELS.PARSE_ZIP_METADATA),
	wechatChatHistoryStartExtraction: invoke(require_contract$4.WECHAT_CHAT_HISTORY_RPC_CHANNELS.START_EXTRACTION),
	wechatChatHistoryGetExtractionStatus: invoke(require_contract$4.WECHAT_CHAT_HISTORY_RPC_CHANNELS.GET_EXTRACTION_STATUS),
	wechatChatHistoryEnsureExtracted: invoke(require_contract$4.WECHAT_CHAT_HISTORY_RPC_CHANNELS.ENSURE_EXTRACTED)
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
	worktreeTaskIsGitRepo: invoke(WORKTREE_TASK_RPC_CHANNELS.IS_GIT_REPO),
	worktreeTaskListLocalBranches: invoke(WORKTREE_TASK_RPC_CHANNELS.LIST_LOCAL_BRANCHES),
	worktreeTaskFetchBranches: invoke(WORKTREE_TASK_RPC_CHANNELS.FETCH_BRANCHES),
	worktreeTaskCountWorktrees: invoke(WORKTREE_TASK_RPC_CHANNELS.COUNT_WORKTREES),
	worktreeTaskCleanupWorktrees: invoke(WORKTREE_TASK_RPC_CHANNELS.CLEANUP_WORKTREES),
	worktreeTaskGetWorktreeStatus: invoke(WORKTREE_TASK_RPC_CHANNELS.GET_WORKTREE_STATUS),
	worktreeTaskCreateWorktree: invoke(WORKTREE_TASK_RPC_CHANNELS.CREATE_WORKTREE),
	worktreeTaskDeleteWorktree: invoke(WORKTREE_TASK_RPC_CHANNELS.DELETE_WORKTREE),
	worktreeTaskCheckoutBranch: invoke(WORKTREE_TASK_RPC_CHANNELS.CHECKOUT_BRANCH)
};
//#endregion
//#region ../../packages/workbuddy-server/src/client/desktop-host-channel-map.ts
var DESKTOP_HOST_CHANNEL_MAP = {
	minimizeWindow: invoke(WINDOW_RPC_CHANNELS.MINIMIZE),
	maximizeWindow: invoke(WINDOW_RPC_CHANNELS.MAXIMIZE),
	closeWindow: invoke(WINDOW_RPC_CHANNELS.CLOSE),
	isWindowMaximized: invoke(WINDOW_RPC_CHANNELS.IS_MAXIMIZED),
	setWindowFullscreen: invoke(WINDOW_RPC_CHANNELS.SET_FULLSCREEN),
	toggleWindowFullscreen: invoke(WINDOW_RPC_CHANNELS.TOGGLE_FULLSCREEN),
	windowCancelPendingClose: invoke(WINDOW_RPC_CHANNELS.CANCEL_PENDING_CLOSE),
	windowConfirmClose: invoke(WINDOW_RPC_CHANNELS.CONFIRM_CLOSE),
	windowSetTrafficLightsVisible: invoke(WINDOW_RPC_CHANNELS.SET_TRAFFIC_LIGHTS_VISIBLE),
	windowShowItemInFolder: invoke(SYSTEM_RPC_CHANNELS.SHOW_ITEM_IN_FOLDER),
	selectDirectory: invoke(DIALOG_RPC_CHANNELS.SELECT_DIRECTORY),
	selectFile: invoke(DIALOG_RPC_CHANNELS.SELECT_FILE),
	saveFile: invoke(DIALOG_RPC_CHANNELS.SAVE_FILE),
	openExternal: invoke(SYSTEM_RPC_CHANNELS.OPEN_EXTERNAL),
	openYuanbao: invoke(SYSTEM_RPC_CHANNELS.OPEN_YUANBAO),
	hasImaApp: invoke(SYSTEM_RPC_CHANNELS.HAS_IMA_APP),
	openImaApp: invoke(SYSTEM_RPC_CHANNELS.OPEN_IMA_APP),
	openPath: invoke(SYSTEM_RPC_CHANNELS.OPEN_PATH),
	readClipboard: invoke(SYSTEM_RPC_CHANNELS.READ_CLIPBOARD),
	checkSystemPermissions: invoke(SYSTEM_RPC_CHANNELS.CHECK_SYSTEM_PERMISSIONS),
	requestNotificationRegistration: invoke(SYSTEM_RPC_CHANNELS.REQUEST_NOTIFICATION_REGISTRATION),
	setPowerSaveBlocker: invoke(POWER_RPC_CHANNELS.SET_POWER_SAVE_BLOCKER),
	setPowerSaveBlockerMode: invoke(POWER_RPC_CHANNELS.SET_POWER_SAVE_BLOCKER_MODE),
	getPowerSaveBlockerState: invoke(POWER_RPC_CHANNELS.GET_POWER_SAVE_BLOCKER_STATE),
	pickFile: invoke(DIALOG_RPC_CHANNELS.PICK_FILE),
	pickFolder: invoke(DIALOG_RPC_CHANNELS.PICK_FOLDER),
	windowOpenLocalFile: invoke(WINDOW_RPC_CHANNELS.OPEN_LOCAL_FILE),
	windowReload: invoke(WINDOW_RPC_CHANNELS.RELOAD),
	windowSaveLocale: invoke(WINDOW_RPC_CHANNELS.SAVE_LOCALE),
	windowSaveDefaultWorkspacePath: invoke(WINDOW_RPC_CHANNELS.SAVE_DEFAULT_WORKSPACE_PATH),
	windowCloseAgentManager: invoke(WINDOW_RPC_CHANNELS.CLOSE_AGENT_MANAGER),
	windowSaveBundledRuntimeConfig: invoke(WINDOW_RPC_CHANNELS.SAVE_BUNDLED_RUNTIME_CONFIG),
	windowGetBundledRuntimeConfig: invoke(WINDOW_RPC_CHANNELS.GET_BUNDLED_RUNTIME_CONFIG),
	getAppVersion: invoke(APP_RPC_CHANNELS.GET_VERSION),
	getAppPlatform: invoke(APP_RPC_CHANNELS.GET_PLATFORM),
	getAppLocale: invoke(APP_RPC_CHANNELS.GET_LOCALE),
	getMachineId: invoke(APP_RPC_CHANNELS.GET_MACHINE_ID),
	getConfigDir: invoke(APP_RPC_CHANNELS.GET_CONFIG_DIR),
	setMenuLocale: invoke(APP_RPC_CHANNELS.SET_MENU_LOCALE),
	getAutoLaunchEnabled: invoke(APP_RPC_CHANNELS.GET_AUTO_LAUNCH_ENABLED),
	setAutoLaunchEnabled: invoke(APP_RPC_CHANNELS.SET_AUTO_LAUNCH_ENABLED),
	updateCheck: invoke(UPDATE_RPC_CHANNELS.CHECK),
	updateDownload: invoke(UPDATE_RPC_CHANNELS.DOWNLOAD),
	updateArchMismatchDownload: invoke(UPDATE_RPC_CHANNELS.ARCH_MISMATCH_DOWNLOAD),
	updateArchMismatchInstall: invoke(UPDATE_RPC_CHANNELS.ARCH_MISMATCH_INSTALL),
	updateQuitAndInstall: invoke(UPDATE_RPC_CHANNELS.QUIT_AND_INSTALL),
	updateGetState: invoke(UPDATE_RPC_CHANNELS.GET_STATE),
	onUpdateStateChanged: listener(UPDATE_RPC_CHANNELS.STATE_CHANGED),
	binaryList: invoke(BINARY_RPC_CHANNELS.LIST),
	binaryStatus: invoke(BINARY_RPC_CHANNELS.STATUS),
	getDocumentPreviewUrl: invoke(require_contract$2.DOCS_RPC_EX_CHANNELS.GET_PREVIEW_URL),
	releaseDocumentPreviewContext: invoke(require_contract$2.DOCS_RPC_EX_CHANNELS.RELEASE_PREVIEW_CONTEXT),
	releaseDocumentPreviewContextIfClean: invoke(require_contract$2.DOCS_RPC_EX_CHANNELS.RELEASE_PREVIEW_CONTEXT_IF_CLEAN),
	saveDocumentPreviewContext: invoke(require_contract$2.DOCS_RPC_EX_CHANNELS.SAVE_PREVIEW_CONTEXT),
	previewDocumentFromContent: invoke(DOCS_RPC_CHANNELS.PREVIEW_DOCUMENT_FROM_CONTENT),
	getIdentityName: invoke(IDENTITY_RPC_CHANNELS.GET_NAME),
	updateIdentityName: invoke(IDENTITY_RPC_CHANNELS.UPDATE_NAME),
	checkModeration: invoke(IDENTITY_RPC_CHANNELS.CHECK_MODERATION),
	getLocalMemoryFiles: invoke(IDENTITY_RPC_CHANNELS.GET_LOCAL_MEMORY_FILES),
	updateUserCallName: invoke(IDENTITY_RPC_CHANNELS.UPDATE_USER_CALL_NAME),
	updateAiName: invoke(IDENTITY_RPC_CHANNELS.UPDATE_AI_NAME),
	updateSoulBody: invoke(IDENTITY_RPC_CHANNELS.UPDATE_SOUL_BODY),
	updateMemoryBody: invoke(IDENTITY_RPC_CHANNELS.UPDATE_MEMORY_BODY),
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
//#region ../../packages/workbuddy-server/src/client/rpc-contract.ts
var invokeChannels = Object.fromEntries(Object.entries(CHANNEL_MAP).filter(([, entry]) => entry.type === "invoke").map(([method, entry]) => [method, entry.channel]));
var listenerChannels = Object.fromEntries(Object.entries(CHANNEL_MAP).filter(([, entry]) => entry.type === "listener").map(([method, entry]) => [method, entry.channel]));
function getInvokeChannel(method) {
	return invokeChannels[method];
}
function getListenerChannel(method) {
	return listenerChannels[method];
}
//#endregion
//#region ../../packages/workbuddy-server/src/server/handler-registry.ts
function handleRpc(registry, method, handler) {
	registry.handle(getInvokeChannel(method), handler);
}
function handleRpcAlias(registry, channel, _method, handler) {
	registry.handle(channel, handler);
}
function pushRpcEvent(publisher, method, payload) {
	publisher.push(getListenerChannel(method), payload);
}
//#endregion
Object.defineProperty(exports, "AGENT_IM_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return AGENT_IM_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "AUTOMATION_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return AUTOMATION_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "BACKEND_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return BACKEND_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "CLAW_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return CLAW_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "CLOUD_AGENT_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return CLOUD_AGENT_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "CONFIG_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return CONFIG_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "CONNECTOR_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return CONNECTOR_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "CUSTOM_EXPERT_MY_EXPERT_DIR_NAME", {
	enumerable: true,
	get: function() {
		return CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
	}
});
Object.defineProperty(exports, "DEFAULT_STORAGE_FILE", {
	enumerable: true,
	get: function() {
		return DEFAULT_STORAGE_FILE;
	}
});
Object.defineProperty(exports, "DesktopManifestProviderToken", {
	enumerable: true,
	get: function() {
		return DesktopManifestProviderToken;
	}
});
Object.defineProperty(exports, "EXPERT_BUNDLES_PATH", {
	enumerable: true,
	get: function() {
		return EXPERT_BUNDLES_PATH;
	}
});
Object.defineProperty(exports, "EXPERT_CENTER_COS_CONFIG", {
	enumerable: true,
	get: function() {
		return EXPERT_CENTER_COS_CONFIG;
	}
});
Object.defineProperty(exports, "EXPERT_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return EXPERT_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "ExpertCenterResourceLoaderToken", {
	enumerable: true,
	get: function() {
		return ExpertCenterResourceLoaderToken;
	}
});
Object.defineProperty(exports, "ExpertHistoryCacheToken", {
	enumerable: true,
	get: function() {
		return ExpertHistoryCacheToken;
	}
});
Object.defineProperty(exports, "ExpertHistoryServiceToken", {
	enumerable: true,
	get: function() {
		return ExpertHistoryServiceToken;
	}
});
Object.defineProperty(exports, "ExpertHistoryStorageToken", {
	enumerable: true,
	get: function() {
		return ExpertHistoryStorageToken;
	}
});
Object.defineProperty(exports, "ExpertPluginServiceToken", {
	enumerable: true,
	get: function() {
		return ExpertPluginServiceToken;
	}
});
Object.defineProperty(exports, "IDENTITY_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return IDENTITY_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "IMA_CHANNEL_MAP", {
	enumerable: true,
	get: function() {
		return IMA_CHANNEL_MAP;
	}
});
Object.defineProperty(exports, "IMA_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return IMA_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "LEXIANG_COOKIE_DOMAINS", {
	enumerable: true,
	get: function() {
		return LEXIANG_COOKIE_DOMAINS;
	}
});
Object.defineProperty(exports, "LINK_PREVIEW_CHANNEL_MAP", {
	enumerable: true,
	get: function() {
		return LINK_PREVIEW_CHANNEL_MAP;
	}
});
Object.defineProperty(exports, "LexiangSpApiError", {
	enumerable: true,
	get: function() {
		return LexiangSpApiError;
	}
});
Object.defineProperty(exports, "MAC_BUNDLED_RUNTIME_TOOL_KEYS", {
	enumerable: true,
	get: function() {
		return MAC_BUNDLED_RUNTIME_TOOL_KEYS;
	}
});
Object.defineProperty(exports, "MCP_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return MCP_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "MIGRATION_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return MIGRATION_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "MIN_RUNTIME_VERSION", {
	enumerable: true,
	get: function() {
		return MIN_RUNTIME_VERSION;
	}
});
Object.defineProperty(exports, "NATIVE_RUNTIME_MARKETPLACE_NAMES", {
	enumerable: true,
	get: function() {
		return NATIVE_RUNTIME_MARKETPLACE_NAMES;
	}
});
Object.defineProperty(exports, "NATIVE_RUNTIME_PLUGIN_NAMES", {
	enumerable: true,
	get: function() {
		return NATIVE_RUNTIME_PLUGIN_NAMES;
	}
});
Object.defineProperty(exports, "NATIVE_RUNTIME_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return NATIVE_RUNTIME_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "PLUGIN_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return PLUGIN_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "PROXY_SETTINGS_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return PROXY_SETTINGS_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "SHARED_HISTORY_KEY", {
	enumerable: true,
	get: function() {
		return SHARED_HISTORY_KEY;
	}
});
Object.defineProperty(exports, "SHARE_CHANNEL_MAP", {
	enumerable: true,
	get: function() {
		return SHARE_CHANNEL_MAP;
	}
});
Object.defineProperty(exports, "SKILL_EVENT_CHANNELS", {
	enumerable: true,
	get: function() {
		return SKILL_EVENT_CHANNELS;
	}
});
Object.defineProperty(exports, "TELEMETRY_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return TELEMETRY_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "TENCENT_DOCS_CHANNEL_MAP", {
	enumerable: true,
	get: function() {
		return TENCENT_DOCS_CHANNEL_MAP;
	}
});
Object.defineProperty(exports, "TENCENT_LEXIANG_CHANNEL_MAP", {
	enumerable: true,
	get: function() {
		return TENCENT_LEXIANG_CHANNEL_MAP;
	}
});
Object.defineProperty(exports, "WORKTREE_TASK_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return WORKTREE_TASK_RPC_CHANNELS;
	}
});
Object.defineProperty(exports, "buildExpertUrl", {
	enumerable: true,
	get: function() {
		return buildExpertUrl;
	}
});
Object.defineProperty(exports, "createAutomationUnavailableResult", {
	enumerable: true,
	get: function() {
		return createAutomationUnavailableResult;
	}
});
Object.defineProperty(exports, "createEmptyAutomationSnapshot", {
	enumerable: true,
	get: function() {
		return createEmptyAutomationSnapshot;
	}
});
Object.defineProperty(exports, "handleRpc", {
	enumerable: true,
	get: function() {
		return handleRpc;
	}
});
Object.defineProperty(exports, "handleRpcAlias", {
	enumerable: true,
	get: function() {
		return handleRpcAlias;
	}
});
Object.defineProperty(exports, "inferProxyModeFromVscodeFields", {
	enumerable: true,
	get: function() {
		return inferProxyModeFromVscodeFields;
	}
});
Object.defineProperty(exports, "isNativeRuntimePluginName", {
	enumerable: true,
	get: function() {
		return isNativeRuntimePluginName;
	}
});
Object.defineProperty(exports, "normalizeSafeDeleteBulkThreshold", {
	enumerable: true,
	get: function() {
		return normalizeSafeDeleteBulkThreshold;
	}
});
Object.defineProperty(exports, "pushRpcEvent", {
	enumerable: true,
	get: function() {
		return pushRpcEvent;
	}
});
Object.defineProperty(exports, "requireSafeDeleteBulkThreshold", {
	enumerable: true,
	get: function() {
		return requireSafeDeleteBulkThreshold;
	}
});
