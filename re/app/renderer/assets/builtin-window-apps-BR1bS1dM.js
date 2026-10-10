import { Ult as init_settings_route, Wlt as normalizeSettingsRouteTarget } from "./ui-docs-viewer-Bo02yf1Q.js";
//#region ../../packages/workbuddy-app/src/window-apps/define-window-apps.ts
init_settings_route();
var WINDOW_APP_ID_PATTERN = /^[a-z][a-z0-9-]*$/;
var MIN_WINDOW_SIZE = 320;
var MAX_WINDOW_SIZE = 8192;
/**
* Manifest 作者 / CI 看到的契约断言。发生在 `defineWindowApps` 加载期，
* 从不进入用户可见 UI，因此不走 WBError、i18n 或 `docs/error-codes.md`。
* 文案保持稳定中文 + `[WindowAppManifest]` 前缀，方便 grep 与单测。
* 若这些错误将来要展示给用户，再迁到错误码表。
*/
function throwManifestError(message) {
	throw new Error(message);
}
function assertDimension(appId, field, value) {
	if (value === void 0) return;
	if (!Number.isInteger(value) || value < MIN_WINDOW_SIZE || value > MAX_WINDOW_SIZE) throwManifestError(`[WindowAppManifest] ${appId}.${field} 必须是 ${MIN_WINDOW_SIZE}-${MAX_WINDOW_SIZE} 的整数`);
}
function assertControls(appId, controls) {
	if (!controls) return;
	if (new Set(controls).size !== controls.length) throwManifestError(`[WindowAppManifest] ${appId}.controls 不能包含重复项`);
}
function assertDefinition(appId, definition) {
	if (!WINDOW_APP_ID_PATTERN.test(appId)) throwManifestError(`[WindowAppManifest] 非法 appId: ${appId}`);
	if (!WINDOW_APP_ID_PATTERN.test(definition.rendererEntry)) throwManifestError(`[WindowAppManifest] ${appId}.rendererEntry 非法: ${definition.rendererEntry}`);
	if (typeof definition.validateParams !== "function") throwManifestError(`[WindowAppManifest] ${appId}.validateParams 必须是函数`);
	if (definition.storageScope === "shared" && appId !== "main") throwManifestError(`[WindowAppManifest] ${appId}.storageScope=shared 仅允许主窗使用`);
	if (definition.maxInstances !== void 0 && (!Number.isInteger(definition.maxInstances) || definition.maxInstances < 1)) throwManifestError(`[WindowAppManifest] ${appId}.maxInstances 必须是正整数`);
	if (definition.instancePolicy === "single" && definition.maxInstances !== void 0 && definition.maxInstances !== 1) throwManifestError(`[WindowAppManifest] ${appId} 为 single 时 maxInstances 只能是 1`);
	const presentation = definition.presentation;
	assertDimension(appId, "width", presentation.width);
	assertDimension(appId, "height", presentation.height);
	assertDimension(appId, "minWidth", presentation.minWidth);
	assertDimension(appId, "minHeight", presentation.minHeight);
	assertControls(appId, presentation.controls);
	if (presentation.width !== void 0 && presentation.minWidth !== void 0 && presentation.minWidth > presentation.width) throwManifestError(`[WindowAppManifest] ${appId}.minWidth 不能大于 width`);
	if (presentation.height !== void 0 && presentation.minHeight !== void 0 && presentation.minHeight > presentation.height) throwManifestError(`[WindowAppManifest] ${appId}.minHeight 不能大于 height`);
}
function defineWindowApps(manifest) {
	const result = {};
	for (const [appId, definition] of Object.entries(manifest)) {
		assertDefinition(appId, definition);
		result[appId] = Object.freeze({
			...definition,
			capabilities: definition.capabilities ? Object.freeze({ ...definition.capabilities }) : void 0,
			presentation: Object.freeze({
				...definition.presentation,
				controls: definition.presentation.controls ? Object.freeze([...definition.presentation.controls]) : void 0
			})
		});
	}
	return Object.freeze(result);
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/builtin-window-apps.ts
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isMainWindowParams(params) {
	return params === void 0 || isRecord(params) && Object.keys(params).length === 0;
}
function isOptionalSafePathSegment(value) {
	return value === void 0 || typeof value === "string" && value.length > 0 && value !== "." && value !== ".." && !value.includes("/") && !value.includes("\\") && !value.includes("\0");
}
function hasOnlyKeys(value, keys) {
	const allowed = new Set(keys);
	return Object.keys(value).every((key) => allowed.has(key));
}
function isSettingsWindowParams(params) {
	if (params === void 0) return true;
	if (!isRecord(params) || !hasOnlyKeys(params, ["route", "currentConversationId"]) || !isOptionalSafePathSegment(params.currentConversationId)) return false;
	const route = params.route;
	if (route === void 0) return true;
	return isRecord(route) && hasOnlyKeys(route, ["tab", "subRoute"]) && normalizeSettingsRouteTarget(route) !== null;
}
function isOptionalString(value) {
	return value === void 0 || typeof value === "string";
}
function isOptionalDimension(value) {
	return value === void 0 || typeof value === "number" && Number.isInteger(value) && value > 0;
}
function isOfficeResource(value) {
	if (!isRecord(value) || !hasOnlyKeys(value, [
		"type",
		"filePath",
		"url",
		"title",
		"conversationId"
	]) || !isOptionalString(value.title) || !isOptionalString(value.conversationId)) return false;
	if (value.type === "file") return typeof value.filePath === "string" && value.filePath.length > 0;
	if (value.type === "url") return typeof value.url === "string" && value.url.length > 0;
	return false;
}
function isOfficeWindowParams(params) {
	if (params === void 0) return true;
	if (!isRecord(params) || !hasOnlyKeys(params, [
		"filePaths",
		"resources",
		"title",
		"width",
		"height"
	])) return false;
	if (params.filePaths !== void 0 && (!Array.isArray(params.filePaths) || !params.filePaths.every((filePath) => typeof filePath === "string" && filePath.length > 0))) return false;
	if (params.resources !== void 0 && (!Array.isArray(params.resources) || !params.resources.every(isOfficeResource))) return false;
	return isOptionalString(params.title) && isOptionalDimension(params.width) && isOptionalDimension(params.height);
}
function isDemoWindowParams(params) {
	if (params === void 0) return true;
	if (!isRecord(params)) return false;
	return isOptionalString(params["title"]) && isOptionalString(params["note"]);
}
var builtinWindowApps = defineWindowApps({
	main: {
		rendererEntry: "main",
		presentation: {
			preset: "main",
			controlPosition: "platform-default"
		},
		instancePolicy: "single",
		maxInstances: 1,
		permissions: ["*"],
		storageScope: "shared",
		hostAdapter: "main",
		lifecycle: {
			eviction: "resident",
			prewarm: true
		},
		validateParams: isMainWindowParams
	},
	office: {
		rendererEntry: "office",
		presentation: {
			preset: "workspace",
			controls: [
				"close",
				"minimize",
				"maximize",
				"fullscreen"
			],
			controlPosition: "platform-default",
			width: 1440,
			height: 852,
			minWidth: 640,
			minHeight: 480
		},
		instancePolicy: "multiple",
		permissions: ["*"],
		storageScope: "app",
		capabilities: { trustedWebviewEmbedding: true },
		lifecycle: {
			eviction: "resident",
			prewarm: true
		},
		validateParams: isOfficeWindowParams
	},
	"global-search": {
		rendererEntry: "global-search",
		presentation: {
			preset: "utility",
			controls: [
				"close",
				"minimize",
				"maximize"
			],
			controlPosition: "platform-default",
			width: 800,
			height: 640,
			minWidth: 800,
			minHeight: 640
		},
		instancePolicy: "single",
		maxInstances: 1,
		permissions: ["*"],
		storageScope: "app",
		lifecycle: {
			eviction: "lru",
			prewarm: true
		},
		validateParams: isMainWindowParams
	},
	settings: {
		rendererEntry: "settings",
		presentation: {
			preset: "utility",
			customTitleBar: true,
			hideMacTrafficLights: true,
			controls: ["close", "maximize"],
			controlPosition: "right",
			width: 900,
			height: 680,
			minWidth: 800,
			minHeight: 640
		},
		instancePolicy: "single",
		maxInstances: 1,
		permissions: ["*"],
		storageScope: "app",
		lifecycle: {
			eviction: "lru",
			prewarm: true
		},
		validateParams: isSettingsWindowParams
	},
	/**
	* 独立窗口接入示例 —— 仅开发态可用（`devOnly`），不随正式包提供。
	*
	* 新业务窗接入时对照 `window-apps/demo/` 复制这一份声明与目录即可，详见
	* `docs/workbuddy/app-architecture/sdk/multi-window.md`。
	*
	* 这里故意选了能覆盖较多底座能力的组合：`utility` 自绘标题栏、`multiple`
	* 多实例、`app` 级存储、`first-party-ui` 完整档位（才能演示跨窗 API）。
	*/
	demo: {
		rendererEntry: "demo",
		presentation: {
			preset: "utility",
			controls: ["close", "minimize"],
			controlPosition: "right",
			width: 760,
			height: 680,
			minWidth: 520,
			minHeight: 440
		},
		instancePolicy: "multiple",
		maxInstances: 3,
		permissions: [
			"windows.minimize",
			"windows.maximize",
			"windows.unmaximize",
			"windows.close",
			"windows.isMaximized",
			"windows.isFullscreen",
			"windows.setFullscreen",
			"windows.toggleFullscreen",
			"windows.reload",
			"windows.open",
			"windows.getSelf",
			"windows.getInitialPayload",
			"windows.setSessionState",
			"windows.getSessionState",
			"windows.consumeMessages",
			"windows.ackMessage",
			"windows.navigate",
			"windows.postMessage",
			"windows.list",
			"windows.focus",
			"windows.closeById",
			"windows.opened",
			"windows.closed",
			"windows.message",
			"windows.stateChanged"
		],
		storageScope: "app",
		devOnly: true,
		lifecycle: { eviction: "lru" },
		validateParams: isDemoWindowParams
	},
	"extension-contribution": {
		rendererEntry: "extension-contribution",
		presentation: {
			preset: "utility",
			controls: [
				"minimize",
				"maximize",
				"close"
			],
			controlPosition: "platform-default",
			width: 900,
			height: 680,
			minWidth: 480,
			minHeight: 360
		},
		instancePolicy: "multiple",
		maxInstances: 12,
		permissions: [
			"windows.getSelf",
			"windows.getInitialPayload",
			"windows.consumeMessages",
			"windows.ackMessage"
		],
		storageScope: "instance",
		lifecycle: {
			eviction: "lru",
			prewarm: true
		},
		validateParams: (value) => isRecord(value) && typeof value.extensionId === "string" && typeof value.contributionId === "string" && typeof value.entry === "string" && typeof value.title === "string" && (value.extensionKind === "builtin" || value.extensionKind === "platform")
	}
});
//#endregion
export { isSettingsWindowParams as n, builtinWindowApps as t };
