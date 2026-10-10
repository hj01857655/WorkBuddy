require("./rolldown-runtime.js");
const require_module_app_server = require("./module.app-server.js");
const require_module_base = require("./module-base.js");
exports.baseModules = require_module_base.baseModules;
exports.default = require_module_app_server.workbuddyAppServerModule;
