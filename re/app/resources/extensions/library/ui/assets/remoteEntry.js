// src/manifest-loader.ts
var LOADER_PREFIX = "[library-federation-loader]";
var MANIFEST_URLS = {
  chinese: {
    prod: "https://www.workbuddy.cn/space/federation/v1",
    staging: "https://staging.workbuddy.cn/space/federation/v1"
  },
  international: {
    prod: "https://www.workbuddy.ai/space/federation/v1",
    staging: "https://staging.workbuddy.ai/space/federation/v1"
  }
};
var DEV_RELEASE_ID = "dev";
var RELEASE_ID_PATTERN = /^[0-9a-f]{16}$/i;
var SUCCESSFUL_PHASE_EVENTS = /* @__PURE__ */ new Set([
  "manifest-fetch-success",
  "remote-import-success",
  "container-init-success"
]);
var successfulEventsByInfoTarget = /* @__PURE__ */ new WeakMap();
function loaderError(stage, detail) {
  return new Error(`${LOADER_PREFIX} ${stage}: ${detail}`);
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function hasOnlyKeys(value, keys) {
  const actualKeys = Object.keys(value);
  return actualKeys.length === keys.length && actualKeys.every((key) => keys.includes(key));
}
function isCompactDevManifest(value) {
  if (!isRecord(value) || !hasOnlyKeys(value, ["releaseId", "remote"])) {
    return false;
  }
  const remote = value.remote;
  return value.releaseId === DEV_RELEASE_ID && isRecord(remote) && hasOnlyKeys(remote, ["entry"]) && typeof remote.entry === "string";
}
function normalizeDevManifest(entry) {
  return {
    schemaVersion: 1,
    releaseId: DEV_RELEASE_ID,
    generatedAt: "development",
    remote: {
      name: "library",
      type: "module",
      entry,
      exposedModule: "./Main"
    },
    assets: {
      js: [],
      css: []
    }
  };
}
function getValidatedEntryPath(entry) {
  let url;
  try {
    url = new URL(entry);
  } catch {
    throw loaderError("manifest-validate", "remote entry must be an absolute URL");
  }
  if (url.protocol !== "https:" || url.username !== "" || url.password !== "" || url.search !== "" || url.hash !== "") {
    throw loaderError("manifest-validate", "remote entry must use HTTPS without credentials, query, or fragment");
  }
  return url.pathname;
}
function assertFederationContainer(value) {
  if (!isRecord(value) || typeof value.init !== "function" || typeof value.get !== "function") {
    throw loaderError("remote-import", "imported module is not a federation container");
  }
}
function serializeError(error) {
  return {
    message: error.message,
    stack: error.stack
  };
}
function createLogger(deps) {
  const info = deps.logger?.info;
  const errorLogger = deps.logger?.error;
  const infoTarget = info ? deps.logger : console;
  const logInfo = info ? info.bind(deps.logger) : console.info.bind(console);
  const logError = errorLogger ? errorLogger.bind(deps.logger) : console.error.bind(console);
  let emittedSuccessEvents = successfulEventsByInfoTarget.get(infoTarget);
  if (!emittedSuccessEvents) {
    emittedSuccessEvents = /* @__PURE__ */ new Set();
    successfulEventsByInfoTarget.set(infoTarget, emittedSuccessEvents);
  }
  return (event, context, error) => {
    const attributes = {
      environment: context.environment,
      edition: context.edition,
      manifestOrigin: context.manifestOrigin,
      releaseId: context.releaseId,
      entryPath: context.entryPath,
      appVersion: context.appVersion,
      elapsedMs: context.elapsedMs
    };
    if (error) {
      attributes.error = serializeError(error);
      logError(`${LOADER_PREFIX} ${event}`, attributes);
      return;
    }
    if (SUCCESSFUL_PHASE_EVENTS.has(event)) {
      if (emittedSuccessEvents.has(event)) {
        return;
      }
      emittedSuccessEvents.add(event);
    }
    logInfo(`${LOADER_PREFIX} ${event}`, attributes);
  };
}
function resolveLibraryManifestUrl(environment) {
  if (!isRecord(environment) || environment.runEnv !== "prod" && environment.runEnv !== "staging" || environment.edition !== "chinese" && environment.edition !== "international") {
    throw loaderError("environment-read", "wb.env must provide runEnv (prod/staging) and edition (chinese/international)");
  }
  return MANIFEST_URLS[environment.edition][environment.runEnv];
}
function validateLibraryManifest(value) {
  if (isCompactDevManifest(value)) {
    value = normalizeDevManifest(value.remote.entry);
  }
  if (!isRecord(value) || value.schemaVersion !== 1 || typeof value.releaseId !== "string" || value.releaseId !== DEV_RELEASE_ID && !RELEASE_ID_PATTERN.test(value.releaseId) || typeof value.generatedAt !== "string") {
    throw loaderError("manifest-validate", "manifest does not match schema version 1");
  }
  const remote = value.remote;
  if (!isRecord(remote) || remote.name !== "library" || remote.type !== "module" || remote.exposedModule !== "./Main" || typeof remote.entry !== "string") {
    throw loaderError("manifest-validate", "manifest remote is not library/module/./Main");
  }
  const assets = value.assets;
  if (!isRecord(assets) || !isStringArray(assets.js) || !isStringArray(assets.css)) {
    throw loaderError("manifest-validate", "manifest assets must contain JavaScript and CSS string arrays");
  }
  getValidatedEntryPath(remote.entry);
  return {
    schemaVersion: 1,
    releaseId: value.releaseId,
    generatedAt: value.generatedAt,
    remote: {
      name: "library",
      type: "module",
      entry: remote.entry,
      exposedModule: "./Main"
    },
    assets: {
      js: assets.js,
      css: assets.css
    }
  };
}
function createLibraryFederationProxy(deps) {
  const log = createLogger(deps);
  let baseContext = {
    appVersion: deps.appVersion
  };
  let loadPromise;
  let initializationPromise;
  async function loadRemote() {
    const startedAt = deps.now();
    let manifestUrl;
    try {
      const { runEnv, edition } = await deps.getEnvironment();
      manifestUrl = resolveLibraryManifestUrl({ runEnv, edition });
      baseContext = {
        ...baseContext,
        environment: runEnv === "staging" ? "staging" : "production",
        edition,
        manifestOrigin: new URL(manifestUrl).origin
      };
    } catch {
      const environmentError = loaderError(
        "environment-read",
        "wb.env must provide runEnv (prod/staging) and edition (chinese/international)"
      );
      log("environment-read-failed", { ...baseContext, elapsedMs: deps.now() - startedAt }, environmentError);
      throw environmentError;
    }
    log("manifest-fetch-start", baseContext);
    let response;
    try {
      response = await deps.fetch(`${manifestUrl}?_t=${deps.now()}`, {
        cache: "no-store",
        credentials: "omit",
        redirect: "error"
      });
    } catch {
      throw loaderError("manifest-fetch", "request failed");
    }
    const mediaType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
    if (response.status !== 200 || mediaType !== "application/json") {
      throw loaderError("manifest-fetch", "response must be HTTP 200 JSON");
    }
    let manifestValue;
    try {
      manifestValue = await response.json();
    } catch {
      throw loaderError("manifest-fetch", "response body is not valid JSON");
    }
    log("manifest-fetch-success", {
      ...baseContext,
      elapsedMs: deps.now() - startedAt
    });
    let manifest;
    try {
      manifest = validateLibraryManifest(manifestValue);
    } catch (error) {
      const validationError = error instanceof Error ? error : loaderError("manifest-validate", "manifest validation failed");
      log("manifest-validate-failed", {
        ...baseContext,
        elapsedMs: deps.now() - startedAt
      }, validationError);
      throw validationError;
    }
    const context = {
      ...baseContext,
      releaseId: manifest.releaseId,
      entryPath: getValidatedEntryPath(manifest.remote.entry),
      elapsedMs: deps.now() - startedAt
    };
    log("remote-import-start", context);
    let importedModule;
    try {
      importedModule = await deps.importModule(manifest.remote.entry);
      assertFederationContainer(importedModule);
    } catch {
      throw loaderError("remote-import", "failed to import a federation container");
    }
    log("remote-import-success", {
      ...context,
      elapsedMs: deps.now() - startedAt
    });
    return { container: importedModule, context, startedAt };
  }
  function getRemote() {
    loadPromise ??= loadRemote();
    return loadPromise;
  }
  async function initialize(originalArgs) {
    const { container, context, startedAt } = await getRemote();
    try {
      await container.init(...originalArgs);
    } catch {
      const initError = loaderError("container-init", "remote container initialization failed");
      log("container-init-failed", {
        ...context,
        elapsedMs: deps.now() - startedAt
      }, initError);
      throw initError;
    }
    log("container-init-success", {
      ...context,
      elapsedMs: deps.now() - startedAt
    });
  }
  function failGet(callerDetail, logDetail = callerDetail) {
    const callerError = loaderError("container-get", callerDetail);
    log("container-get-failed", baseContext, loaderError("container-get", logDetail));
    throw callerError;
  }
  return {
    init(...originalArgs) {
      initializationPromise ??= initialize(originalArgs);
      return initializationPromise;
    },
    async get(exposedModule) {
      if (exposedModule !== "./Main") {
        failGet(`unsupported exposed module ${exposedModule}`, "unsupported exposed module");
      }
      if (!initializationPromise) {
        failGet("host initialization is required before get");
      }
      await initializationPromise;
      const { container, context, startedAt } = await getRemote();
      try {
        return await container.get(exposedModule);
      } catch {
        const getError = loaderError("container-get", "remote container get failed");
        log(
          "container-get-failed",
          {
            ...context,
            elapsedMs: deps.now() - startedAt
          },
          getError
        );
        throw getError;
      }
    }
  };
}

// src/remote-entry.ts
var runtimeWb = globalThis.wb;
var runtimeLogger = runtimeWb?.telemetry?.logger;
var logger = runtimeLogger ? {
  info: typeof runtimeLogger.info === "function" ? (event, attributes) => runtimeLogger.info(event, attributes) : void 0,
  error: typeof runtimeLogger.error === "function" ? (event, attributes) => runtimeLogger.error(event, attributes) : void 0
} : void 0;
var appVersion = typeof runtimeWb?.platform?.appVersion === "string" ? runtimeWb.platform.appVersion : void 0;
var proxy = createLibraryFederationProxy({
  fetch: globalThis.fetch.bind(globalThis),
  importModule: (url) => {
    const refreshVersion = new URL(import.meta.url).searchParams.get("wbv");
    return refreshVersion ? import(`${url}?wbv=${encodeURIComponent(refreshVersion)}`) : import(url);
  },
  now: () => Date.now(),
  getEnvironment: async () => {
    const env = globalThis.wb?.env;
    if (typeof env?.runEnv !== "function" || typeof env.edition !== "function") {
      throw new Error("wb.env.runEnv() and wb.env.edition() are required");
    }
    const [runEnv, edition] = await Promise.all([env.runEnv(), env.edition()]);
    return { runEnv, edition };
  },
  logger,
  appVersion
});
var init = proxy.init;
var get = proxy.get;
export {
  get,
  init
};
