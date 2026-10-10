//#region ../../packages/workbuddy-server/src/tencent-docs/contract.ts
/**
* 腾讯文档 RPC 频道与数据类型。
*
* 两组频道按操作划分：
* - docs:*           本地文档预览与选区（无鉴权，进程间通信）
* - tencentDocs:*    云端资料库 CRUD 与鉴权（需 OAuth）
*/
var DOCS_RPC_EX_CHANNELS = {
	/** 打开文档预览，返回 { url, documentResourceUri }。 */
	GET_PREVIEW_URL: "docs:getPreviewUrl",
	/** 释放预览上下文（关闭/切换文档时调用）。 */
	RELEASE_PREVIEW_CONTEXT: "docs:releasePreviewContext",
	/**
	* 温柔淘汰：仅在 SDK editor 当前为干净时释放，dirty 时保留上下文且不弹框。
	* Pool 用它做"非用户主动"的淘汰；用户主动关闭/切会话仍走 RELEASE_PREVIEW_CONTEXT
	* （会弹保存对话框）。
	*/
	RELEASE_PREVIEW_CONTEXT_IF_CLEAN: "docs:releasePreviewContextIfClean",
	/** 保存当前本地 SDK 预览上下文，支持覆盖原文件或另存为。 */
	SAVE_PREVIEW_CONTEXT: "docs:savePreviewContext",
	/** renderer 下发 base64 内容，主进程落临时文件后走 SDK 预览。 */
	PREVIEW_DOCUMENT_FROM_CONTENT: "docs:previewDocumentFromContent",
	/** Main → Renderer push：活动选区变化通知。 */
	SELECTION_CHANGED: "docs:selectionChanged",
	/** Main → Renderer push：onSelectionSend 触发的直接发送通知，不修改 ChatInput。 */
	SELECTION_SEND: "docs:selectionSend"
};
//#endregion
Object.defineProperty(exports, "DOCS_RPC_EX_CHANNELS", {
	enumerable: true,
	get: function() {
		return DOCS_RPC_EX_CHANNELS;
	}
});
