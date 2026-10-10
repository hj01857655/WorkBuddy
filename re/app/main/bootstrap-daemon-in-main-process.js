require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_credential_protection = require("./credential-protection.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_desktop_monitor_service = require("./desktop-monitor-service.js");
const require_server = require("./server.js");
const require_tar = require("./tar.js");
const require_index = require("./index.js");
const require_daemon_bootstrap = require("./daemon-bootstrap.js");
let electron = require("electron");
//#region src/main/startup-steps/bootstrap-daemon-in-main-process.ts
require_credential_protection.init_credential_protection();
require_code_cache.init_workbuddy_paths();
/**
* evalMode 下在 main 进程内启动 daemon（不 fork 子进程）。
*
* 与"启动 daemon 子进程"的差异：
*   - Tencent Docs 集成挂在 main 进程本地 documentService 上（子进程模式下 daemon 走 IPC 反向访问）
*   - 本地文档 AI 编辑灰度读的是 main 侧 productManager 与 authenticationManager 快照
*   - daemonConnection 走 in-main 通道，避免序列化开销
*
* tencentDocsIntegrationRef 由 sidecar-runtime-manager 提前创建，本 step 负责在 daemon
* 启动前把主进程集成 handle 写回该 ref，供 runtimeManager 内部（mcp engine、docs lifecycle）读取。
*/
async function bootstrapDaemonInMainProcess(deps) {
	const configured = require_credential_protection.configureCredentialProtection(deps.credentialProtectionBootstrap);
	const runtime = require_credential_protection.getCredentialProtectionState();
	require_log_acl_guard.mainLog.info("[CredentialBootstrap] in-main daemon configured", {
		eventAtMs: Date.now(),
		route: "in-main",
		policy: deps.credentialProtectionBootstrap.policy,
		symmetricAvailable: deps.credentialProtectionBootstrap.symmetricKey !== void 0,
		asymmetricMaterialAvailable: deps.credentialProtectionBootstrap.userKey !== void 0 && deps.credentialProtectionBootstrap.developerPublicKey !== void 0,
		configured,
		runtimeStatus: runtime.status,
		runtimeUnavailableCategory: runtime.status === "unavailable" ? runtime.category : void 0,
		wholeFileProtectionReady: require_credential_protection.isWholeFileProtectionReady()
	});
	if (!configured) throw new Error("[CredentialProtection] conflicting in-main bootstrap");
	require_index.ensureSandboxCenterEpochAddress(require_code_cache.getWorkbuddyConfigDir());
	const { windowManager, platform, powerManager, desktopHost: desktopHostBase, runtimeManager, appServerDeps, tencentDocsIntegrationRef, pushTencentDocsRendererEvent, rendererClientToolRouter } = deps;
	const desktopHost = {
		...desktopHostBase,
		clientTools: { execute: (request) => rendererClientToolRouter.execute(request) }
	};
	const { registerTencentDocsMainIntegration } = await Promise.resolve().then(() => require("./tencent-docs-main-integration.js"));
	const editorSdkSandbox = require_daemon_bootstrap.createWorkbuddyEditorSdkSandbox({
		getUid: () => (appServerDeps.authenticationManager?.currentSessionSubject.getValue())?.account?.uid,
		sandboxEnabled: require_tar.getSandboxSafetyEnabledFromAppConfig(appServerDeps.configService),
		logger: require_log_acl_guard.mainLog
	});
	const tencentDocsMainIntegration = registerTencentDocsMainIntegration({
		windowManager,
		pushRendererEvent: pushTencentDocsRendererEvent,
		logger: require_log_acl_guard.mainLog,
		docsService: editorSdkSandbox
	});
	tencentDocsIntegrationRef.current = tencentDocsMainIntegration;
	const evalDocumentService = tencentDocsMainIntegration.documentService;
	const evalLocalDocsFacade = require_log_acl_guard.createLocalDocsHostFacade({
		documentService: evalDocumentService,
		platform,
		logger: require_log_acl_guard.mainLog
	});
	const browserRuntimeHost = deps.browserRuntimeHost;
	let resolveNativeRuntimePlugins = () => void 0;
	const nativeRuntimePlugins = new Promise((resolve) => {
		resolveNativeRuntimePlugins = resolve;
	});
	const nativeRuntimeFeatureGate = require_daemon_bootstrap.createNativeRuntimeFeatureGate({
		isSupported: (plugin) => plugin === "browser-use" ? Boolean(browserRuntimeHost) : (platform.osPlatform ?? process.platform) === "darwin",
		getProductFeatures: () => (appServerDeps.productManager?.getCurrentConfiguration?.())?.productFeatures,
		onProductChanged: (listener) => appServerDeps.productManager?.onDidChange?.(listener)
	});
	const resolveNativeRuntimeAccess = () => ({
		"browser-use": nativeRuntimeFeatureGate.isAllowed("browser-use"),
		"computer-use": nativeRuntimeFeatureGate.isAllowed("computer-use")
	});
	appServerDeps.systemPromptService.setNativeRuntimeAccessResolver(resolveNativeRuntimeAccess);
	const nativeRuntime = await require_daemon_bootstrap.installNativeRuntime({
		runtime: appServerDeps.mcpManager,
		service: {
			configDir: platform.configDir,
			platform: platform.osPlatform,
			arch: process.arch,
			appVersion: electron.app.getVersion(),
			plugins: nativeRuntimePlugins,
			getProductConfiguration: () => appServerDeps.productManager?.getCurrentConfiguration?.(),
			buildBaseUrl: require_daemon_bootstrap.getBuildTimeNativeRuntimeBaseUrl(),
			legacyToggle: (plugin) => plugin === "computer-use" ? require_tar.getComputerUseEnabledFromAppConfig(appServerDeps.configService) : require_tar.getBrowserControlEnabledFromAppConfig(appServerDeps.configService),
			featureGate: nativeRuntimeFeatureGate,
			reportMetric: (name, dims) => require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.addCounter(name, 1, dims)
		},
		browserUse: browserRuntimeHost ? {
			activate: (params) => browserRuntimeHost.activate(params),
			prepareSession: (params) => browserRuntimeHost.prepareSession(params),
			releaseSession: (leaseId) => browserRuntimeHost.releaseSession(leaseId),
			reconcileSessions: (input) => browserRuntimeHost.reconcileSessions(input)
		} : void 0,
		computerUse: {
			host: deps.computerUseRuntimeHost,
			vlm: require_daemon_bootstrap.createComputerUseVlmProxy({
				auth: {
					getAccessToken: () => (appServerDeps.authenticationManager?.currentSessionSubject.getValue())?.auth?.accessToken,
					refreshSession: async () => {
						await appServerDeps.authenticationManager?.refreshSession?.();
					}
				},
				getGatewayEndpoint: () => appServerDeps.productManager?.getEndpoint?.(),
				getRequestHeaders: () => {
					const session = appServerDeps.authenticationManager?.currentSessionSubject.getValue();
					const product = appServerDeps.productManager?.getCurrentConfiguration?.();
					return require_daemon_bootstrap.buildComputerUseVlmGatewayHeaders({
						userId: session?.account?.uid,
						enterpriseId: session?.account?.enterpriseId,
						domain: session?.auth?.domain,
						deploymentType: product?.deploymentType,
						appVersion: electron.app.getVersion(),
						cliVersion: product?.platformVersion
					});
				},
				logger: require_log_acl_guard.mainLog
			})
		},
		logger: require_log_acl_guard.mainLog
	});
	const daemon = await require_daemon_bootstrap.bootstrapDaemon({
		celljs: appServerDeps,
		credentialProtectionBootstrap: deps.credentialProtectionBootstrap,
		platform,
		runtimeManager,
		desktopHost,
		powerManager,
		rpcHandlerProfile: "daemon-app-server",
		rpcHandlerOptions: { nativeRuntime: Promise.resolve(nativeRuntime) },
		resolveProxyEnv: () => require_log_acl_guard.resolveProxyEnv(void 0, require_index.ELECTRON_PROXY_RULES_RESOLVER),
		localDocumentMediaTypes: require_daemon_bootstrap.createTencentDocsLocalDocumentMediaTypes(),
		createDocumentLifecycle: ({ sessionManager, celljs: bootstrapCelljs }) => {
			tencentDocsIntegrationRef.current?.wireSessionConflictLookups({
				sessionManager,
				database: bootstrapCelljs.database
			});
			const documentService = tencentDocsIntegrationRef.current.documentService;
			return require_daemon_bootstrap.createTencentDocsDocumentLifecycleDeps({
				sessionManager,
				documentService
			});
		},
		tencentDocsMcp: tencentDocsIntegrationRef.current?.createEngineProvider(),
		localDocsReleaseBridge: require_daemon_bootstrap.createLocalDocsReleaseBridgeFromFacade(evalLocalDocsFacade),
		localDocs: evalLocalDocsFacade,
		tencentDocsRuntime: {
			documentService: evalDocumentService,
			push: pushTencentDocsRendererEvent,
			documentPreviewPoolCapacity: 5
		},
		docsService: {
			getPreviewUrl: (filePath, options) => evalDocumentService.createPreviewUrl(filePath, options),
			dispose: () => evalDocumentService.dispose()
		},
		createHostServiceDeps: ({ celljs: celljsReady, runtimeManager: daemonRuntimeManager, sessionManager }) => require_server.createWorkbuddyAppServerDefaultHostServiceDeps({
			celljs: celljsReady,
			runtimeManager: daemonRuntimeManager,
			sessionManager,
			configDir: platform.configDir,
			userDataDir: platform.dataDir,
			onBeforeShutdown: (listener) => {
				electron.app.once("before-quit", listener);
				return () => {
					electron.app.removeListener("before-quit", listener);
				};
			},
			logger: console
		}),
		getLogFilePath: require_log_acl_guard.getLogFilePath,
		onRpcReady: (server) => {
			server.handle("telemetry:updateQimei36", (params) => {
				const { qimei36 } = params ?? {};
				if (typeof qimei36 === "string" && qimei36.length > 0) {
					process.env.CODEBUDDY_QIMEI36 = qimei36;
					require_daemon_bootstrap.markQimei36Ready();
					require_log_acl_guard.mainLog.info("[QimeiUpdate] qimei36 updated via in-main RPC");
				}
			});
		},
		recordMainLoadTime: (loadRequestId) => require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.recordMainLoadTime(loadRequestId)
	});
	daemon.hostServices?.then((hostServices) => {
		resolveNativeRuntimePlugins(hostServices.plugins);
		nativeRuntime.start().catch((error) => {
			require_log_acl_guard.mainLog.warn("[NativeRuntime] start failed", error);
		});
	}).catch(() => void 0);
	return {
		daemon,
		daemonConnection: require_log_acl_guard.createCompositeDaemonRpcConnection(require_index.createInMainDaemonRpcConnection(daemon.server), { logger: { warn: (message) => require_log_acl_guard.mainLog.warn(`[MainBootstrap] ${message}`) } })
	};
}
//#endregion
exports.bootstrapDaemonInMainProcess = bootstrapDaemonInMainProcess;
