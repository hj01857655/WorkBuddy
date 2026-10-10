const require_rolldown_runtime = require("./rolldown-runtime.js");
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_os = require("node:os");
node_os = require_rolldown_runtime.__toESM(node_os);
//#region ../../packages/workbuddy-server/src/docs/runtime-paths.ts
/**
* 腾讯文档本地功能迁移到 workbuddy-server 后的配置目录解析。
*
* 桌面端旧实现位于 main/runtime/app-instance。这里保持同样的解析优先级：
* 优先 `WORKBUDDY_CONFIG_DIR`，否则 `~/<dataFolderName>`；桌面端启动时会把
* `WORKBUDDY_DATA_FOLDER_NAME` 写入环境变量（来源于 product.json#dataFolderName），
* 读不到时回退 `.workbuddy`。
*/
function getWorkbuddyConfigDir() {
	const explicit = process.env.WORKBUDDY_CONFIG_DIR?.trim();
	if (explicit) return explicit;
	const dataFolderName = process.env.WORKBUDDY_DATA_FOLDER_NAME?.trim() || ".workbuddy";
	return node_path.default.join(node_os.default.homedir(), dataFolderName);
}
/**
* `editor_sdk` 自己写 `editor_sdk.log` 的目录，spawn 时以 `--log_dir` 传给它。
*
* 不传的话 vendor 会把日志写在二进制旁边（安装目录下的 `app.asar.unpacked/...`），
* 工单收日志时既找不到也可能没写权限。放到 `logs/` 下和 main.log 同级，日志包直接带走。
*/
function getEditorSdkLogDir() {
	return node_path.default.join(getWorkbuddyConfigDir(), "logs", "editor_sdk");
}
//#endregion
Object.defineProperty(exports, "getEditorSdkLogDir", {
	enumerable: true,
	get: function() {
		return getEditorSdkLogDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyConfigDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyConfigDir;
	}
});
