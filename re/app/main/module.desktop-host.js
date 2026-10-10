require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_module_base = require("./module-base.js");
//#region src/main/system/runtime/desktop-host-runtime.ts
require_code_cache.init_bundled_assets();
require_code_cache.init_dev_env_override();
if (process.env.NODE_ENV === "development" || require_code_cache.isDevEnvSwitchBuildEnabled()) require_code_cache.forceEnableDevEnvOverride();
require_module_base.setWorkbuddyClientInfoAssetResolver(require_code_cache.resolveBundledAsset);
require_module_base.setDevEnvEndpointResolver({ resolve: require_code_cache.resolveEndpointOverride });
//#endregion
//#region src/main/module.desktop-host.ts
if (typeof require_module_base.WorkbuddyInternetEnviromentProductProvider !== "function") throw new Error("WorkbuddyInternetEnviromentProductProvider registration is unavailable; check @genie/workbuddy-server subpath export shape");
var workbuddyDesktopHostModule = require_module_base.createWorkbuddyAutoBindModule();
//#endregion
exports.baseModules = require_module_base.baseModules;
exports.default = workbuddyDesktopHostModule;
