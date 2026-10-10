//#region ../../packages/workbuddy-server/src/session/contract.ts
var SESSION_RPC_CHANNELS = {
	CREATE: "session:create",
	DESTROY: "session:destroy",
	DELETE: "session:delete",
	LIST: "session:list",
	LOAD: "session:load",
	GET: "session:get",
	GET_TEAM_RUNTIME: "session:getTeamRuntime",
	UPSERTED: "session:upserted",
	DELETED: "session:deleted",
	SEND_MESSAGE: "session:sendMessage",
	CANCEL: "session:cancel",
	RESOLVE_PERMISSION: "session:resolvePermission",
	REJECT_PERMISSION: "session:rejectPermission",
	/**
	* Resolve a pending permission interruption sourced from the broadcast
	* channel (`codebuddy.ai/interruptionRequest` meta on session_info_update).
	* Routes through CLI's `_codebuddy.ai/resolveInterruption` extMethod
	* which dismisses both the broadcast channel and the still-pending
	* standard `requestPermission` JSON-RPC.
	*/
	RESOLVE_INTERRUPTION: "session:resolveInterruption",
	ANSWER_QUESTION: "session:answerQuestion",
	CANCEL_QUESTION: "session:cancelQuestion",
	/** 回传 POI 选择结果（pick_location 工具）。 */
	ANSWER_POI_QUESTION: "session:answerPoiQuestion",
	/** 回传应用选择结果（app_pick 浮层，#89098）。 */
	ANSWER_APP_PICK_QUESTION: "session:answerAppPickQuestion",
	/** 回传云服务开通确认结果（workbuddy_cloud_service 工具）。 */
	ANSWER_CLOUD_SERVICE_CONFIRMATION: "session:answerCloudServiceConfirmation",
	/** 推送当前 session 的 POI 数据到 server 缓存（renderer → server）。 */
	PUSH_SESSION_POI: "session:pushSessionPoi",
	/** 回传 elicitation/create 用户操作（微信支付卡片 accept/decline/cancel） */
	RESPOND_ELICITATION: "session:respondElicitation",
	SET_MODE: "session:setMode",
	SET_MODEL: "session:setModel",
	SET_CONFIG_OPTION: "session:setConfigOption",
	UPDATE_CONFIG: "session:updateConfig",
	ARCHIVE: "session:archive",
	RENAME: "session:rename",
	MOVE: "session:move",
	UPDATE_STATUS: "session:updateStatus",
	GET_AVAILABLE_COMMANDS: "session:getAvailableCommands",
	GET_SUBAGENT_LIST: "session:getSubagentList",
	RESPOND_TO_SAMPLING: "session:respondToSampling",
	RESPOND_TO_ROOTS: "session:respondToRoots",
	REQUEST_YIELD: "session:requestYield",
	GET_MESSAGE_QUEUE: "session:getMessageQueue",
	SAVE_MESSAGE_QUEUE: "session:saveMessageQueue",
	ENQUEUE_MESSAGE: "session:enqueueMessage",
	REMOVE_QUEUE_ITEM: "session:removeQueueItem",
	POP_QUEUE_ITEM_FOR_EDIT: "session:popQueueItemForEdit",
	REORDER_QUEUE: "session:reorderQueue",
	SEND_QUEUE_ITEM_NOW: "session:sendQueueItemNow",
	ACTIVATE_QUEUE: "session:activateQueue",
	PAUSE_QUEUE: "session:pauseQueue",
	RESUME_QUEUE: "session:resumeQueue",
	CANCEL_QUEUE: "session:cancelQueue",
	GET_QUEUE_STATE: "session:getQueueState",
	REPORT_RUNTIME_EVENT: "session:reportRuntimeEvent",
	ACP_REQUEST: "session:acpRequest",
	EVENT: "session:event",
	/** Push event: navigate to a session (server → client) */
	NAVIGATE: "session:navigate",
	/** Notify main process that a permission request is pending user approval in the UI (client → server) */
	NOTIFY_PERMISSION_PENDING_APPROVAL: "session:notifyPermissionPendingApproval",
	/** Notify main process that a pending permission was resolved by the local IDE UI (client → server) */
	NOTIFY_PERMISSION_RESOLVED_FROM_LOCAL: "session:notifyPermissionResolvedFromLocal",
	/**
	* Notify main process that a renderer's per-session event listener is ready (client → server).
	* Triggers a replay of pending permission/question inputs so events that were pushed before
	* the subscription window completes are not permanently lost.
	*/
	NOTIFY_LISTENER_READY: "session:notifyListenerReady",
	/**
	* Fetch the persisted ACP usage_update snapshot for a session (client → server).
	* Returns `UsageSnapshot | undefined`. Used by the renderer adapter when switching
	* to a historical session whose live `usage_update` cache is cold — the value is
	* read from SQLite (auto-rebuilt on next CLI push if missing; see ADR-003).
	*/
	GET_PERSISTED_USAGE: "session:getPersistedUsage",
	/**
	* Fetch the most recent ACP `usage_update` event (in-memory only) for a session
	* (client → server). Returns `LastUsageEvent | undefined`. Used by the renderer
	* listener right after mount to replay the last event and avoid the "listener
	* mounted after event arrived" race (ADR-004 防丢初值).
	*/
	GET_LAST_USAGE_EVENT: "session:getLastUsageEvent",
	/** 将会话历史指针回退到指定 fork 点（resend/edit 场景） */
	ROLLBACK: "session:rollback"
};
//#endregion
Object.defineProperty(exports, "SESSION_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return SESSION_RPC_CHANNELS;
	}
});
