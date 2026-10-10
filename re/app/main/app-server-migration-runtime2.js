//#region ../../packages/workbuddy-server/src/server/app-server-migration-runtime.ts
var DEFAULT_MIGRATION_OPTIONS = {
	type: "all",
	force: false,
	historyBlockingTimeoutMs: 2e3
};
async function startWorkbuddyAppServerStartupMigration({ migrationService, productName, onHistoryProgress, migrationOptions = DEFAULT_MIGRATION_OPTIONS, logger = console }) {
	if (onHistoryProgress) migrationService.setHistoryProgressHandler(onHistoryProgress);
	let deferredHistory;
	migrationService.setHistoryDeferredHandler((promise) => {
		deferredHistory = promise;
	});
	if (productName === "WorkBuddy") {
		const result = await migrationService.triggerMigration(migrationOptions).catch((error) => {
			logger.warn("[AppServerMigration] Migration failed (non-fatal):", error);
		});
		deferredHistory = deferredHistory ?? result?.backgroundHistoryPromise;
	} else logger.info(`[AppServerMigration] Skipping legacy migration for custom edition (productName=${productName})`);
	return {
		migrationService,
		deferredHistory,
		migrationDonePromise: deferredHistory ? deferredHistory.then(() => {}).catch(() => {}) : Promise.resolve(),
		getPendingLocalStorageMigration: () => migrationService.getPendingLocalStorageMigration(),
		completeLocalStorageMigration: (result) => migrationService.completeLocalStorageMigration(result),
		createRuntimeHandlersDeps: (options) => ({
			getHistoryStatus: () => migrationService.getHistoryStatus(),
			replayArchived: (ids) => migrationService.replayArchivedManual(ids),
			getPendingLocalStorageMigration: () => migrationService.getPendingLocalStorageMigration(),
			completeLocalStorageMigration: (result) => migrationService.completeLocalStorageMigration(result),
			getArchivedSyncService: () => migrationService.getArchivedSyncService(),
			deferredHistory,
			flushMonitor: options?.flushMonitor,
			logger: options?.logger
		})
	};
}
//#endregion
Object.defineProperty(exports, "startWorkbuddyAppServerStartupMigration", {
	enumerable: true,
	get: function() {
		return startWorkbuddyAppServerStartupMigration;
	}
});
