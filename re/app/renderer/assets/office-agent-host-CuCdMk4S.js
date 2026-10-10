import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { A3 as ImaApiContext, B3 as init_adapter_context, EB as lexiangAuthStore, M3 as useOptionalImaApiBridge, N3 as EnhanceServiceContext, P3 as init_enhance_service_context, Q as init_app_providers, Qrt as init_common, V3 as useAdapter, _B as init_auth, az as init_independent_window_host_providers, c$ as init_store, c3 as getWb, cK as imaAuthStore, et as useAgentServices, iz as IndependentWindowHostProviders, j3 as init_ima_api_context, l3 as init_wb_singleton, lK as init_ima_auth_store, o$ as connectorStore, yit as AgentClient } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { o as getDaemonClient } from "./local-docs-facade-Cr4Rvoow.js";
import { a as createEnhanceService, n as WorkbuddyBackendProvider, o as createDesktopAgentProviders, r as WorkbuddyAgentAdapterNext, t as WorkbuddyProvider } from "./workbuddy-provider-BD7no46c.js";
//#region ../../packages/workbuddy-app/src/office-shell/conversation/office-agent-runtime.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
init_adapter_context();
init_enhance_service_context();
init_ima_api_context();
init_wb_singleton();
init_store();
init_ima_auth_store();
init_auth();
init_independent_window_host_providers();
init_app_providers();
init_common();
function createOfficeAgentRuntime() {
	const daemonClient = getDaemonClient();
	const internalDaemonClient = daemonClient;
	const provider = new WorkbuddyProvider(internalDaemonClient);
	const backendProvider = new WorkbuddyBackendProvider(internalDaemonClient);
	const client = new AgentClient({
		provider,
		environmentType: "local"
	});
	return {
		adapter: new WorkbuddyAgentAdapterNext(client, void 0, backendProvider, void 0, internalDaemonClient, provider),
		backendProvider,
		providers: createDesktopAgentProviders(daemonClient),
		imaApiBridge: {
			imaAuthStart: (params) => daemonClient.imaAuthStart(params),
			imaAuthStatus: (params) => daemonClient.imaAuthStatus(params),
			imaAuthRefresh: () => daemonClient.imaAuthRefresh(),
			imaAuthLogout: (params) => daemonClient.imaAuthLogout(params),
			isStagingEnv: async () => {
				const product = await daemonClient.getProductConfiguration();
				return String(product?.endpoint ?? "").includes("staging");
			},
			getProductEndpoint: async () => {
				const endpoint = (await daemonClient.getProductConfiguration())?.endpoint;
				return typeof endpoint === "string" ? endpoint : void 0;
			},
			imaKbList: (params) => daemonClient.imaKbList(params),
			imaKbSearch: (params) => daemonClient.imaKbSearch(params),
			imaFilesList: (params) => daemonClient.imaFilesList(params),
			imaFilesSearch: (params) => daemonClient.imaFilesSearch(params),
			imaFilesViewUrl: (params) => daemonClient.imaFilesViewUrl(params),
			imaFilesDownloadUrl: (params) => daemonClient.imaFilesDownloadUrl(params),
			imaFilesContent: (params) => daemonClient.imaFilesContent(params),
			imaFilesBlob: (params) => daemonClient.imaFilesBlob(params),
			imaFilesUpload: (params) => daemonClient.imaFilesUpload(params),
			imaFilesCancelUpload: (params) => daemonClient.imaFilesCancelUpload(params),
			imaFilesUploadByPath: (params) => daemonClient.imaFilesUploadByPath(params),
			imaFilesSdkPreview: (params) => daemonClient.imaFilesSdkPreview(params),
			imaOnUploadProgress: (callback) => internalDaemonClient.$on("ima:event:upload-progress", callback),
			openExternal: async (url) => {
				await daemonClient.openExternal(url);
			},
			imaGetToken: async () => {
				const status = await daemonClient.imaAuthStatus();
				if (!status.accessToken) throw new Error("ima access_token not available: user may not be authorized");
				return {
					token: status.accessToken,
					expireTime: status.accessTokenExpiresIn ? Date.now() + status.accessTokenExpiresIn * 1e3 : status.expiresAt ?? Date.now() + 36e5
				};
			},
			imaOpenApp: (params) => daemonClient.openImaApp(params),
			imaHasApp: async () => ({ installed: await daemonClient.hasImaApp() })
		},
		enhanceService: createEnhanceService()
	};
}
/**
* 窗口级惰性单例。
*
* 构造带副作用（订阅 daemon 连接、建 ACP 流水线、装配 SDK），必须真正只跑一次。
* 组件内 `useRef` 不足以保证：React 会丢弃尚未完成挂载的子树并重建（例如 children
* 里的 lazy 组件挂起冒泡到外层 Suspense），重建时 ref 是全新的，于是留下一个被丢弃
* 但仍在订阅的孤儿 runtime。Office 独立窗一个 renderer 只有一份宿主栈，
* 模块级单例即窗口级单例。
*/
var sharedRuntime = null;
function getOfficeAgentRuntime() {
	sharedRuntime ??= createOfficeAgentRuntime();
	return sharedRuntime;
}
//#endregion
//#region ../../packages/workbuddy-app/src/office-shell/office-agent-host.tsx
/**
* Office 独立窗的 agent-ui 宿主 Provider 层。
*
* 复用主窗组件（对话面板、腾讯文档 / 乐享目录选择器）都要求 AdapterContext、
* AuthProvider、AccountContext、AppProviders 这几层在位，缺一层就是运行时 throw。
* 这里把 `IndependentWindowHostProviders` 与 Office 特有的 store 注入收成一个入口。
*
* ⚠️ 本模块静态依赖 `getOfficeAgentRuntime()`，会把整条 adapter 链路拉进解析路径。
* 调用方必须走 `lazy()` 动态挂载，否则 Office 窗冷启动会被拖慢。
*
* 允许同时存在多棵（对话面板一棵、上传弹窗一棵）：底层 runtime 是模块级单例，
* accountService 也是单例，重复挂载只是多一份 context 转发，没有额外副作用。
*/
/**
* Office 窗不承载 Settings Surface，模型选择器的新增/编辑入口交给独立设置窗。
* 抛错会由 SettingsProvider 回退到既有 hash/modal 路径。
*/
async function openSettingsWindow(target) {
	await getWb().windows.open({
		appId: "settings",
		params: { route: target }
	});
	return true;
}
/**
* 乐享 / ima 授权 store 的 adapter/bridge 注入。
*
* 主窗由 `TencentLexiangPanel` / `useLexiangUpload` / `AppProviders` / `ImaServices` 负责注入；
* Office 窗两者都不挂，不补这一步的话：
* - `lexiangAuthStore.checkAuthStatus()` 拿不到 adapter → `not_connected`
* - `connectorStore` 没有 adapter → connector 状态不可用
* - `imaAuthStore.init()` 拿不到 adapter/bridge → ima 授权 check 不工作
*   → 已授权用户被推回授权引导页
*
* Office 窗不挂 `ImaServices`（因为没有 OneID 检测），但仍需初始化 imaAuthStore
* 使其能通过 bridge 查询 daemon 的 ima auth 状态。daemon 侧会按账号（IOA / 个人）
* 自动分流到正确的 connector（ima-mcp-oa / ima-mcp），前端只需确保 bridge 可用。
*/
function OfficeCloudAuthBootstrap() {
	const adapter = useAdapter();
	const bridge = useOptionalImaApiBridge();
	const clearWebCookies = useAgentServices()?.tencentLexiang?.clearWebCookies;
	(0, import_react.useEffect)(() => {
		if (adapter && lexiangAuthStore.getState().adapter !== adapter) lexiangAuthStore.getState().setAdapter(adapter);
		if (adapter && connectorStore.getState().adapter !== adapter) connectorStore.getState().setAdapter(adapter);
		if (adapter && bridge) imaAuthStore.getState().init(adapter, bridge);
	}, [adapter, bridge]);
	(0, import_react.useEffect)(() => {
		if (clearWebCookies) lexiangAuthStore.getState().setClearWebCookies(clearWebCookies);
	}, [clearWebCookies]);
	return null;
}
function OfficeAgentHost({ children }) {
	const runtime = getOfficeAgentRuntime();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentWindowHostProviders, {
		adapter: runtime.adapter,
		backendProvider: runtime.backendProvider,
		providers: runtime.providers,
		openSettingsWindow,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnhanceServiceContext.Provider, {
			value: runtime.enhanceService,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ImaApiContext.Provider, {
				value: runtime.imaApiBridge,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeCloudAuthBootstrap, {}), children]
			})
		})
	});
}
//#endregion
export { OfficeAgentHost };
