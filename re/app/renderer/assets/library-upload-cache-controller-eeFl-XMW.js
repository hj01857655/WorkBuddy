import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { ct as init_share_client_metric, ot as createShareClientStageTimer } from "./locale-utils-TanlkH9x.js";
import { F as init_publish_utils, M as computeBlobHash, N as getPublishCache, P as getPublishedLocalHash, R as removePublishCache, z as savePublishCache } from "./folder-picker-modal-C_2cTFqD.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/hooks/library-upload-cache-controller.ts
/**
* 主窗与独立窗口共用的资料库上传缓存决策：
* 内容 hash → 在线节点探测 → 同内容复用 → 变更覆盖确认。
*/
async function prepareLibraryUploadCache(options) {
	const contentHash = await computeBlobHash(options.uploadBlob);
	const baselineHash = options.localHash ?? contentHash;
	let cache = getPublishCache(options.taskId, options.filePath);
	let onlineNodeExists = false;
	if (cache?.nodeId && options.getNodeInfo) {
		const __nodeTimer = createShareClientStageTimer("check_node", "library_upload", options.fileName);
		try {
			const nodeInfo = await options.getNodeInfo({ nodeId: cache.nodeId });
			if (nodeInfo?.exists === false) {
				__nodeTimer.end("success", "node does not exist");
				removePublishCache(options.taskId, options.filePath, cache.bundleHtmlPaths);
				cache = null;
			} else if (nodeInfo?.exists === true) {
				__nodeTimer.end("success");
				onlineNodeExists = true;
			} else __nodeTimer.end("failed", "nodeInfo returned null");
		} catch (error) {
			__nodeTimer.end("failed", error instanceof Error ? error.message : String(error));
			options.onProbeError?.(error);
		}
	}
	if (cache && getPublishedLocalHash(cache) === baselineHash) return {
		contentHash,
		baselineHash,
		cache,
		onlineNodeExists,
		action: "reuse",
		reuseReason: "unchanged"
	};
	if (cache && !await options.confirmOverwrite(options.fileName)) return {
		contentHash,
		baselineHash,
		cache,
		onlineNodeExists,
		action: "reuse",
		reuseReason: "overwrite-declined"
	};
	return {
		contentHash,
		baselineHash,
		cache,
		onlineNodeExists,
		action: "upload"
	};
}
/** 上传成功后以与主窗读取侧一致的 key 写入发布缓存。 */
function commitLibraryUploadCache(options) {
	savePublishCache(options.taskId, options.filePath, {
		nodeId: options.nodeId,
		publishUrl: options.publishUrl ?? options.url,
		url: options.url,
		contentHash: options.contentHash,
		lastUploadedLocalHash: options.baselineHash,
		entryFilePath: options.entryFilePath,
		bundleHtmlPaths: options.bundleHtmlPaths
	}, options.bundleHtmlPaths);
}
/** 覆盖上传失败后清理旧节点缓存，避免持续命中失效 nodeId。 */
function discardLibraryUploadCache(taskId, filePath, cache) {
	removePublishCache(taskId, filePath, cache.bundleHtmlPaths);
}
var init_library_upload_cache_controller = __esmMin((() => {
	init_publish_utils();
	init_share_client_metric();
}));
//#endregion
export { prepareLibraryUploadCache as i, discardLibraryUploadCache as n, init_library_upload_cache_controller as r, commitLibraryUploadCache as t };
