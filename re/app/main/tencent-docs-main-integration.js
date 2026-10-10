require("./rolldown-runtime.js");
const require_tencent_docs_prompt_selection = require("./tencent-docs-prompt-selection.js");
const require_wb_source = require("./wb-source.js");
require("./log-acl-guard.js");
const require_daemon_bootstrap = require("./daemon-bootstrap.js");
const require_tencent_docs_document_lifecycle_port = require("./tencent-docs-document-lifecycle-port.js");
let electron = require("electron");
//#region src/main/tencent-docs/tencent-docs-main-integration.ts
function registerTencentDocsMainIntegration(options) {
	const { windowManager, pushRendererEvent, logger } = options;
	const documentService = options.docsService ? require_tencent_docs_prompt_selection.initializeTencentDocsDocumentService({ docsService: options.docsService }) : require_tencent_docs_prompt_selection.getTencentDocsDocumentService();
	documentService.setMainWindowFocusHandler(() => {
		windowManager.showOrCreate();
	});
	const resolveOwner = () => {
		const owner = windowManager.resolveDialogOwnerWindow();
		return owner && !owner.isDestroyed() ? owner : void 0;
	};
	documentService.setDialogProvider({
		async showMessageBox(dialogOptions) {
			const owner = resolveOwner();
			return owner ? electron.dialog.showMessageBox(owner, dialogOptions) : electron.dialog.showMessageBox(dialogOptions);
		},
		async showOpenDialog(dialogOptions) {
			const owner = resolveOwner();
			const electronDialogOptions = {
				...dialogOptions,
				properties: [...dialogOptions.properties]
			};
			return owner ? electron.dialog.showOpenDialog(owner, electronDialogOptions) : electron.dialog.showOpenDialog(electronDialogOptions);
		},
		async showSaveDialog(dialogOptions) {
			const owner = resolveOwner();
			return owner ? electron.dialog.showSaveDialog(owner, dialogOptions) : electron.dialog.showSaveDialog(dialogOptions);
		}
	});
	documentService.setEngineReadyHandler(() => {
		pushRendererEvent(require_wb_source.TENCENT_DOCS_RENDERER_PUSH_CHANNELS.ENGINE_READY, {});
	});
	documentService.setPreviewReloadHandler((payload) => {
		pushRendererEvent(require_wb_source.TENCENT_DOCS_RENDERER_PUSH_CHANNELS.RELOAD_EMBEDDED_PREVIEW, payload);
	});
	return {
		documentService,
		createEngineProvider() {
			return require_tencent_docs_document_lifecycle_port.createTencentDocsEngineProvider({
				documentService,
				logger
			});
		},
		wireSessionConflictLookups({ sessionManager, database }) {
			const isSessionStillProcessing = require_daemon_bootstrap.createIsSessionStillProcessing(sessionManager);
			documentService.setSessionConflictLookups({
				isSessionStillProcessing,
				getSessionTitle: (sessionId) => require_tencent_docs_document_lifecycle_port.resolveStoredSessionTitle(database, sessionId)
			});
		}
	};
}
//#endregion
exports.registerTencentDocsMainIntegration = registerTencentDocsMainIntegration;
