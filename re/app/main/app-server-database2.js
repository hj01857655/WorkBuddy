const require_log_acl_guard = require("./log-acl-guard.js");
//#region ../../packages/workbuddy-server/src/server/app-server-database.ts
function initializeWorkbuddyAppServerDatabase(database, options = {}) {
	database.initialize();
	options.logger?.info?.(`[AppServerDatabase] Unified database ready: ${database.getDatabasePath()}`);
	return database;
}
function createInitializedWorkbuddyAppServerDatabase(options = {}) {
	const { logger, ...databaseOptions } = options;
	return initializeWorkbuddyAppServerDatabase(require_log_acl_guard.createWorkbuddyServerDatabase(databaseOptions), { logger });
}
//#endregion
Object.defineProperty(exports, "createInitializedWorkbuddyAppServerDatabase", {
	enumerable: true,
	get: function() {
		return createInitializedWorkbuddyAppServerDatabase;
	}
});
Object.defineProperty(exports, "initializeWorkbuddyAppServerDatabase", {
	enumerable: true,
	get: function() {
		return initializeWorkbuddyAppServerDatabase;
	}
});
