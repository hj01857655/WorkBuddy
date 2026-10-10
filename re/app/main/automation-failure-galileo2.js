const require_code_cache = require("./code-cache.js");
const require_desktop_monitor_service = require("./desktop-monitor-service.js");
//#region src/main/features/telemetry/automation-failure-galileo.ts
require_code_cache.init_common$2();
/** 该事件由 daemon 特殊路由到 Galileo OTel logs，不进入默认 Aegis custom event。 */
function isAutomationFailureGalileoEvent(name) {
	return name === require_code_cache.AUTOMATION_FAILURE_GALILEO_EVENT;
}
function reportAutomationFailureGalileoEvent(name, ext) {
	try {
		const monitor = require_desktop_monitor_service.DesktopMonitorService.getSharedInstance();
		if (!monitor) return;
		const record = {
			timestamp: Date.now(),
			level: "error",
			message: name,
			attributes: { ...ext }
		};
		monitor.reportOtelLog(record).catch(() => {});
	} catch {}
}
//#endregion
Object.defineProperty(exports, "isAutomationFailureGalileoEvent", {
	enumerable: true,
	get: function() {
		return isAutomationFailureGalileoEvent;
	}
});
Object.defineProperty(exports, "reportAutomationFailureGalileoEvent", {
	enumerable: true,
	get: function() {
		return reportAutomationFailureGalileoEvent;
	}
});
