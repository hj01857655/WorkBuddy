require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
require_code_cache.init_workbuddy_product_config();
exports.getWorkbuddyBootstrapProductConfiguration = require_code_cache.getWorkbuddyBootstrapProductConfiguration;
