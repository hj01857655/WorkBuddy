import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, A7 as Input, AH as WbSettingsIcon, B3 as init_adapter_context, B7 as FolderToolIcon, CR as useOptionalSettingsRuntime, Cnt as ClawIconV2, Crt as AddIcon, D1 as useI18n, Dz as useAssistantDisplay, E as init_contexts, E1 as init_useI18n, E7 as Card, GF as useSettingsHeaderOverride, GG as init_use_debounced_value, H7 as EditToolIcon, H9 as WbJumpIcon, I5 as Tabs, J5 as Select, J7 as XCloseIcon, J9 as WbInfoIcon, JF as AUDIT_CATEGORY_I18N_KEYS, JL as init_useSystemPermissions, K2 as init_environment, K3 as init_conversations_context, KG as useDebouncedValue, O1 as useTranslation, O7 as Tag, Q as init_app_providers, Q3 as useOptionalConversations, Q9 as WbChevronRightIcon, QF as PERMISSION_SYSTEM_URLS, R5 as Switch, R7 as ViewedToolIcon, S7 as Loading, SR as init_SettingsRuntimeContext, Tz as init_use_assistant_display, V3 as useAdapter, V5 as message, WF as init_settings_surface_context, XF as DEFAULT_EXPERIMENTAL_FEATURES, Y2 as isHostWindows$1, YF as DEFAULT_BUNDLED_RUNTIME, Ytt as GripVerticalIcon, ZF as PERMISSIONS_WITHOUT_BADGE, Zet as SearchIcon, aI as normalizeSafeDeleteBulkThreshold, ac as init_sandbox_safety, ad as init_common, c7 as Modal, cI as init_path_display, dI as isHostWindows, eI as TOOL_CONFIG_KEY, et as useAgentServices, f0 as useOptionalModuleHost, fI as normalizePathInput, i7 as Tooltip, iI as normalizeAuditCategory, ic as getSandboxSafetyEnabled, krt as Button, lI as isHostLinux, m5 as init_src, nI as getAuditCategoryOptionValues, oI as shouldDisableMacFileBackupForBundledRuntime, oc as saveSandboxSafetyEnabled, pnt as DeleteIcon, qL as getPlatformPermissionIds, rI as init_constants, rc as SANDBOX_SAFETY_CHANGE_EVENT, sI as formatPathForDisplay, tI as createEnabledBundledRuntimeConfig, uI as isHostMac, v5 as Collapse } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ad as Keyboard, Ei as toast, Ev as require_react, Sc as init_utilities_esm, Tv as require_jsx_runtime, Yl as init_lucide_react, al as Yr, bc as useSensors, cc as useSortable, gc as init_core_esm, ic as arrayMove, lc as verticalListSortingStrategy, mc as closestCenter, mu as TriangleAlert, oc as init_sortable_esm, ol as init_dist, pc as PointerSensor, rc as SortableContext, t as init_src$1, uc as DndContext, xc as CSS, yc as useSensor } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as usePoiMapFeature, t as init_use_poi_map_feature } from "./use-poi-map-feature-z4YCXlLm.js";
import { n as init_icons$1, t as getVisibleRuntimeTools } from "./icons-C_luV139.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel.less
var init_SecurityCenterPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/hooks/use-sensitive-protection.ts
function useSensitiveProtection() {
	const t = useTranslation();
	const adapter = useAdapter();
	const [enabled, setEnabled] = (0, import_react$32.useState)(true);
	const [saving, setSaving] = (0, import_react$32.useState)(false);
	const confirmedEnabledRef = (0, import_react$32.useRef)(true);
	const pendingEnabledRef = (0, import_react$32.useRef)(null);
	(0, import_react$32.useEffect)(() => {
		if (!adapter) return;
		const unsubscribeState = adapter.on("security-center-state-result", (data) => {
			const nextEnabled = data?.sensitiveProtection?.enabled;
			if (typeof nextEnabled !== "boolean") return;
			if (pendingEnabledRef.current !== null && pendingEnabledRef.current !== nextEnabled) return;
			pendingEnabledRef.current = null;
			confirmedEnabledRef.current = nextEnabled;
			setEnabled(nextEnabled);
			setSaving(false);
		});
		const unsubscribeSaveError = adapter.on("sensitive-protection-config-save-error", (data) => {
			pendingEnabledRef.current = null;
			setEnabled(confirmedEnabledRef.current);
			setSaving(false);
			const errorMessage = data && typeof data === "object" && typeof data.message === "string" ? data.message.trim() : "";
			const fallback = t("settings.securityCenter.sensitiveProtection.saveFailed");
			message.error(errorMessage ? `${fallback}：${errorMessage}` : fallback);
		});
		return () => {
			unsubscribeState?.();
			unsubscribeSaveError?.();
		};
	}, [adapter, t]);
	return {
		enabled,
		saving,
		updateEnabled: (0, import_react$32.useCallback)((nextEnabled) => {
			if (saving) return;
			setEnabled(nextEnabled);
			setSaving(true);
			pendingEnabledRef.current = nextEnabled;
			adapter?.emit("save-sensitive-protection-enabled", { enabled: nextEnabled });
		}, [adapter, saving])
	};
}
var import_react$32;
var init_use_sensitive_protection = __esmMin((() => {
	init_src();
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_useI18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/hooks/useSecurityCenter.ts
function readFileBackupMirror() {
	if (typeof localStorage === "undefined") return DEFAULT_FILE_BACKUP_CONFIG;
	try {
		const stored = localStorage.getItem(FILE_BACKUP_STORAGE_KEY);
		if (!stored) return DEFAULT_FILE_BACKUP_CONFIG;
		const parsed = JSON.parse(stored);
		return {
			enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_FILE_BACKUP_CONFIG.enabled,
			maxSizeMB: typeof parsed.maxSizeMB === "number" ? parsed.maxSizeMB : DEFAULT_FILE_BACKUP_CONFIG.maxSizeMB
		};
	} catch {
		return DEFAULT_FILE_BACKUP_CONFIG;
	}
}
function writeFileBackupMirror(config) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(FILE_BACKUP_STORAGE_KEY, JSON.stringify(config));
	} catch {}
}
function normalizeHttpInterceptPolicy(value, fallback) {
	if (typeof value === "string" && HTTP_INTERCEPT_POLICIES.has(value)) return value;
	return fallback;
}
function normalizeHttpIntercept(raw) {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ...DEFAULT_HTTP_INTERCEPT_CONFIG };
	const obj = raw;
	return {
		remote: normalizeHttpInterceptPolicy(obj.remote, DEFAULT_HTTP_INTERCEPT_CONFIG.remote),
		local: normalizeHttpInterceptPolicy(obj.local, DEFAULT_HTTP_INTERCEPT_CONFIG.local)
	};
}
function normalizeSandboxRules(rules) {
	return {
		maliciousDomainProtectionEnabled: typeof rules?.maliciousDomainProtectionEnabled === "boolean" ? rules.maliciousDomainProtectionEnabled : DEFAULT_SANDBOX_RULES.maliciousDomainProtectionEnabled,
		httpIntercept: normalizeHttpIntercept(rules?.httpIntercept)
	};
}
function normalizeProgramBlacklist(programs) {
	if (!Array.isArray(programs)) return [];
	return [...new Set(programs.filter(isString).map((program) => program.trim()).filter(Boolean))];
}
function isString(value) {
	return typeof value === "string";
}
function useSecurityCenter() {
	const adapter = useAdapter();
	const sensitiveProtection = useSensitiveProtection();
	const auditQueryRequestSeqRef = (0, import_react$31.useRef)(0);
	const stateLoadedRef = (0, import_react$31.useRef)(false);
	const loadedDefaultOrderedRulesRef = (0, import_react$31.useRef)();
	const orderedRulesLoadedRef = (0, import_react$31.useRef)(false);
	const orderedRulesRef = (0, import_react$31.useRef)(DEFAULT_ORDERED_RULES);
	const orderedRulesRevisionRef = (0, import_react$31.useRef)(0);
	const orderedRulesSyncedRevisionRef = (0, import_react$31.useRef)(0);
	const [orderedRules, setOrderedRules] = (0, import_react$31.useState)(DEFAULT_ORDERED_RULES);
	const [defaultOrderedRules, setDefaultOrderedRules] = (0, import_react$31.useState)(DEFAULT_ORDERED_RULES);
	const [defaultSandboxRules, setDefaultSandboxRules] = (0, import_react$31.useState)(DEFAULT_SANDBOX_RULES);
	const [programBlacklist, setProgramBlacklist] = (0, import_react$31.useState)([]);
	const [sandboxRules, setSandboxRules] = (0, import_react$31.useState)(DEFAULT_SANDBOX_RULES);
	const [auditLog, setAuditLog] = (0, import_react$31.useState)(null);
	const [fileBackupConfig, setFileBackupConfig] = (0, import_react$31.useState)(readFileBackupMirror);
	const [sandboxEnabled, setSandboxEnabled] = (0, import_react$31.useState)(getSandboxSafetyEnabled);
	const [threatDatabaseAvailable, setThreatDatabaseAvailable] = (0, import_react$31.useState)(true);
	const [managed, setManaged] = (0, import_react$31.useState)(false);
	const [dataSecurity, setDataSecurity] = (0, import_react$31.useState)(null);
	const [bundledRuntime, setBundledRuntime] = (0, import_react$31.useState)(null);
	const [showSandboxConfirm, setShowSandboxConfirm] = (0, import_react$31.useState)(false);
	const [stateLoaded, setStateLoaded] = (0, import_react$31.useState)(false);
	(0, import_react$31.useEffect)(() => {
		const handler = (event) => {
			const enabled = event.detail?.enabled;
			if (typeof enabled === "boolean") setSandboxEnabled(enabled);
		};
		window.addEventListener(SANDBOX_SAFETY_CHANGE_EVENT, handler);
		return () => window.removeEventListener(SANDBOX_SAFETY_CHANGE_EVENT, handler);
	}, []);
	(0, import_react$31.useEffect)(() => {
		stateLoadedRef.current = false;
		setStateLoaded(false);
		orderedRulesLoadedRef.current = false;
		loadedDefaultOrderedRulesRef.current = void 0;
		orderedRulesRef.current = DEFAULT_ORDERED_RULES;
		orderedRulesRevisionRef.current = 0;
		orderedRulesSyncedRevisionRef.current = 0;
		if (!adapter) return;
		const unsubscribe = adapter.on("security-center-state-result", (data) => {
			const result = data;
			if (!result || typeof result !== "object") return;
			const rawRevision = result.orderedRulesRevision;
			const responseRevision = typeof rawRevision === "number" && Number.isInteger(rawRevision) && rawRevision >= 0 ? rawRevision : void 0;
			if (![
				"auditLog",
				"bundledRuntime",
				"dataSecurity",
				"defaults",
				"fileBackupConfig",
				"managed",
				"orderedRules",
				"programBlacklist",
				"sandboxEnabled",
				"sandboxRules",
				"threatDatabaseAvailable"
			].some((key) => Object.prototype.hasOwnProperty.call(result, key))) {
				if (responseRevision !== void 0 && responseRevision >= orderedRulesRevisionRef.current) {
					orderedRulesRevisionRef.current = responseRevision;
					orderedRulesSyncedRevisionRef.current = responseRevision;
				}
				return;
			}
			if (typeof result.sandboxEnabled === "boolean") setSandboxEnabled(result.sandboxEnabled);
			if (typeof result.threatDatabaseAvailable === "boolean") setThreatDatabaseAvailable(result.threatDatabaseAvailable);
			const hostSandboxDefault = result.defaults?.sandboxRules;
			const normalizedDefaultSandboxRules = normalizeSandboxRules(hostSandboxDefault);
			setDefaultSandboxRules(normalizedDefaultSandboxRules);
			if (result.sandboxRules) setSandboxRules(normalizeSandboxRules(result.sandboxRules));
			if (result.defaults?.orderedRules) {
				loadedDefaultOrderedRulesRef.current = result.defaults.orderedRules;
				setDefaultOrderedRules(result.defaults.orderedRules);
			}
			if (result.orderedRules) {
				if (responseRevision !== void 0 ? responseRevision >= orderedRulesRevisionRef.current : orderedRulesRevisionRef.current === orderedRulesSyncedRevisionRef.current) {
					orderedRulesLoadedRef.current = true;
					orderedRulesRef.current = result.orderedRules;
					setOrderedRules(result.orderedRules);
					if (responseRevision !== void 0) {
						orderedRulesRevisionRef.current = responseRevision;
						orderedRulesSyncedRevisionRef.current = responseRevision;
					}
				}
			}
			if ("programBlacklist" in result) setProgramBlacklist(normalizeProgramBlacklist(result.programBlacklist));
			if ("fileBackupConfig" in result) {
				const raw = result.fileBackupConfig;
				const nextConfig = raw ? {
					enabled: typeof raw.enabled === "boolean" ? raw.enabled : DEFAULT_FILE_BACKUP_CONFIG.enabled,
					maxSizeMB: typeof raw.maxSizeMB === "number" ? raw.maxSizeMB : DEFAULT_FILE_BACKUP_CONFIG.maxSizeMB
				} : DEFAULT_FILE_BACKUP_CONFIG;
				setFileBackupConfig(nextConfig);
				writeFileBackupMirror(nextConfig);
			}
			if (result.auditLog) setAuditLog(result.auditLog);
			setManaged(result.managed === true);
			if ("dataSecurity" in result && result.dataSecurity) setDataSecurity({
				securityGatewayEnabled: result.dataSecurity.securityGatewayEnabled,
				transmissionEncryptionEnabled: result.dataSecurity.transmissionEncryptionEnabled
			});
			else setDataSecurity(null);
			if ("bundledRuntime" in result && result.bundledRuntime) setBundledRuntime(result.bundledRuntime);
			else setBundledRuntime(null);
			stateLoadedRef.current = true;
			setStateLoaded(true);
		});
		adapter.emit("get-security-center-state");
		return () => unsubscribe?.();
	}, [adapter]);
	const updateSandboxRules = (0, import_react$31.useCallback)((rules, auditAction, delta) => {
		if (!stateLoadedRef.current) return;
		const nextRules = normalizeSandboxRules(rules);
		setSandboxRules(nextRules);
		adapter?.emit("save-sandbox-rules-config", {
			...nextRules,
			auditAction,
			...delta ? { sandboxRulesDelta: delta } : {}
		});
	}, [adapter]);
	const updateOrderedRules = (0, import_react$31.useCallback)((category, rules, action) => {
		if (!orderedRulesLoadedRef.current) return;
		const current = orderedRulesRef.current;
		const next = {
			...current,
			[category]: {
				...current[category],
				customized: true,
				rules
			}
		};
		const revision = orderedRulesRevisionRef.current + 1;
		orderedRulesRevisionRef.current = revision;
		orderedRulesRef.current = next;
		setOrderedRules(next);
		adapter?.emit("save-sandbox-rules-config", {
			orderedRulesMutation: {
				category,
				action,
				rules
			},
			orderedRulesRevision: revision
		});
	}, [adapter]);
	const resetOrderedRules = (0, import_react$31.useCallback)((category) => {
		const loadedDefaults = loadedDefaultOrderedRulesRef.current;
		if (!loadedDefaults) return;
		const preset = loadedDefaults[category];
		const next = {
			...orderedRulesRef.current,
			[category]: {
				...preset,
				rules: [...preset.rules]
			}
		};
		const revision = orderedRulesRevisionRef.current + 1;
		orderedRulesRevisionRef.current = revision;
		orderedRulesRef.current = next;
		setOrderedRules(next);
		adapter?.emit("save-sandbox-rules-config", {
			orderedRulesMutation: {
				category,
				action: "reset"
			},
			orderedRulesRevision: revision
		});
	}, [adapter]);
	const updateProgramBlacklist = (0, import_react$31.useCallback)((programs, delta) => {
		if (!stateLoadedRef.current) return;
		const nextPrograms = normalizeProgramBlacklist(programs);
		setProgramBlacklist(nextPrograms);
		adapter?.emit("save-sandbox-rules-config", {
			programBlacklist: nextPrograms,
			auditAction: "programBlacklist",
			...delta ? { sandboxRulesDelta: delta } : {}
		});
	}, [adapter]);
	const updateFileBackupConfig = (0, import_react$31.useCallback)((config) => {
		if (!stateLoadedRef.current) return;
		const next = {
			...fileBackupConfig,
			...config
		};
		setFileBackupConfig(next);
		writeFileBackupMirror(next);
		adapter?.emit("save-sandbox-rules-config", { fileBackup: config });
	}, [adapter, fileBackupConfig]);
	const updateSandboxEnabled = (0, import_react$31.useCallback)((value) => {
		if (!stateLoadedRef.current) return;
		adapter?.reportTelemetry?.("sandbox_toggle_click", {
			current_state: sandboxEnabled ? "on" : "off",
			target_state: value ? "on" : "off"
		});
		if (!value) {
			adapter?.reportTelemetry?.("sandbox_close_confirm_show", {});
			setShowSandboxConfirm(true);
			return;
		}
		saveSandboxSafetyEnabled(true);
		adapter?.emit("save-sandbox-safety", { enabled: true });
		adapter?.reportTelemetry?.("sandbox_state_change", {
			from_state: "off",
			to_state: "on"
		});
	}, [adapter, sandboxEnabled]);
	const confirmCloseSandbox = (0, import_react$31.useCallback)(() => {
		if (!stateLoadedRef.current) return;
		adapter?.reportTelemetry?.("sandbox_close_confirm_click", {
			action: "confirm",
			target_state: "off"
		});
		saveSandboxSafetyEnabled(false);
		adapter?.emit("save-sandbox-safety", { enabled: false });
		adapter?.reportTelemetry?.("sandbox_state_change", {
			from_state: "on",
			to_state: "off"
		});
		setShowSandboxConfirm(false);
	}, [adapter]);
	return {
		auditLog,
		cancelCloseSandbox: (0, import_react$31.useCallback)(() => {
			adapter?.reportTelemetry?.("sandbox_close_confirm_click", {
				action: "cancel",
				target_state: "off"
			});
			setShowSandboxConfirm(false);
		}, [adapter]),
		clearAuditLog: (0, import_react$31.useCallback)(() => {
			setAuditLog({ entries: [] });
			adapter?.emit("clear-audit-log");
		}, [adapter]),
		confirmCloseSandbox,
		dataSecurity,
		bundledRuntime,
		defaultOrderedRules,
		defaultSandboxRules,
		exportAuditLog: (0, import_react$31.useCallback)(() => adapter?.emit("export-audit-log"), [adapter]),
		fileBackupConfig,
		managed,
		programBlacklist,
		orderedRules,
		queryAuditLog: (0, import_react$31.useCallback)((query = {}) => {
			if (!adapter) return Promise.resolve({ entries: [] });
			const requestId = `audit-${Date.now()}-${auditQueryRequestSeqRef.current += 1}`;
			return new Promise((resolve, reject) => {
				const unsubscribe = adapter.on("audit-log-query-result", (data) => {
					const result = data;
					if (result?.requestId !== requestId) return;
					unsubscribe();
					if (result.error) {
						reject(new Error(result.error));
						return;
					}
					resolve({
						entries: Array.isArray(result.entries) ? result.entries : [],
						...result.nextCursor ? { nextCursor: result.nextCursor } : {},
						...typeof result.total === "number" ? { total: result.total } : {}
					});
				});
				adapter.emit("query-audit-log", {
					...query,
					requestId
				});
			});
		}, [adapter]),
		resetOrderedRules,
		sandboxEnabled,
		sensitiveProtectionEnabled: sensitiveProtection.enabled,
		sensitiveProtectionSaving: sensitiveProtection.saving,
		sandboxRules,
		showSandboxConfirm,
		stateLoaded,
		threatDatabaseAvailable,
		updateFileBackupConfig,
		updateProgramBlacklist,
		updateOrderedRules,
		updateSandboxEnabled,
		updateSandboxRules,
		updateSensitiveProtectionEnabled: sensitiveProtection.updateEnabled
	};
}
var import_react$31, DEFAULT_FILE_BACKUP_CONFIG, DEFAULT_ORDERED_RULES, FILE_BACKUP_STORAGE_KEY, DEFAULT_HTTP_INTERCEPT_CONFIG, DEFAULT_SANDBOX_RULES, HTTP_INTERCEPT_POLICIES;
var init_useSecurityCenter = __esmMin((() => {
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_sandbox_safety();
	init_use_sensitive_protection();
	DEFAULT_FILE_BACKUP_CONFIG = {
		enabled: true,
		maxSizeMB: 3e3
	};
	DEFAULT_ORDERED_RULES = {
		file: {
			presetVersion: 0,
			customized: false,
			rules: []
		},
		command: {
			presetVersion: 0,
			customized: false,
			rules: []
		},
		network: {
			presetVersion: 0,
			customized: false,
			rules: []
		}
	};
	FILE_BACKUP_STORAGE_KEY = "CODEBUDDY_FILE_BACKUP_CONFIG";
	DEFAULT_HTTP_INTERCEPT_CONFIG = {
		remote: "ask",
		local: "allow"
	};
	DEFAULT_SANDBOX_RULES = {
		maliciousDomainProtectionEnabled: true,
		httpIntercept: DEFAULT_HTTP_INTERCEPT_CONFIG
	};
	HTTP_INTERCEPT_POLICIES = /* @__PURE__ */ new Set([
		"deny",
		"ask",
		"allow"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/audit-message.ts
function translateOrFallback(t, key, fallback) {
	const translated = t(key);
	return translated === key ? fallback : translated;
}
function resolveStringParamValue(t, messageKey, paramKey, paramValue) {
	const enumValueKey = `${messageKey}.params.${paramKey}.${paramValue}`;
	const translated = t(enumValueKey);
	if (translated !== enumValueKey) return translated;
	if (messageKey.startsWith("securityCenter.audit.orderedRules.") && paramKey === "category") {
		const categoryLabelKey = ORDERED_RULE_CATEGORY_LABEL_KEYS[paramValue];
		if (categoryLabelKey) return translateOrFallback(t, categoryLabelKey, paramValue);
	}
	return paramValue;
}
/**
* 风险类型逐段本地化。
*
* 实际取值有两层拼接，两层都要拆开才翻得动：
* - 沙箱侧把 `category` 与 `family` 用 ` / ` 拼成一条 label（如 `黑灰产 / 钓鱼网站`）
* - 情报库里 `category`、`family` 自身又是分号多值（如 `远控木马;黑灰产`）
*
* 只按 `;` 拆的话，`黑灰产 / 钓鱼网站` 会被当成一整段去查词条、必然查不到，
* 连本已收录的 `黑灰产` 也因为跟 family 粘着而翻不出来——等于对 Bash 侧一条都不生效。
* 按 `/` 拆是安全的：真库 46.7 万行里 `category` 和 `family` 各自都不含 `/`。
*
* 未收录的段回落原值而不是统一兜成「其他」：上游随时会新增类目，兜底会让中文界面
* 把本来正确的类目也降级掉，而回落原值只是让英文界面暂时显示中文。`family` 有上千种
* 取值且大量是专名（`APT-TX-855`、`Charming-Kitten组织`），本就不指望能全部收录。
*/
function resolveRiskType(t, rawValue) {
	const segments = rawValue.split(/[;/]/).map((segment) => segment.trim()).filter(Boolean);
	if (segments.length === 0) return rawValue;
	const separator = translateOrFallback(t, `${RISK_TYPE_KEY_PREFIX}separator`, "、");
	const labels = [];
	for (const segment of segments) {
		const label = translateOrFallback(t, `${RISK_TYPE_KEY_PREFIX}${segment}`, segment);
		if (!labels.includes(label)) labels.push(label);
	}
	return labels.join(separator);
}
function renderAuditMessage(t, entry) {
	if (!entry.messageKey) return "";
	const resolvedParams = {};
	for (const [paramKey, paramValue] of Object.entries(entry.messageParams ?? {})) if (paramKey.endsWith("Key") && typeof paramValue === "string") {
		const stripped = paramKey.slice(0, -3);
		resolvedParams[stripped] = t(paramValue);
	} else if (paramKey === "riskType" && typeof paramValue === "string") resolvedParams[paramKey] = resolveRiskType(t, paramValue);
	else if (typeof paramValue === "string") resolvedParams[paramKey] = resolveStringParamValue(t, entry.messageKey, paramKey, paramValue);
	else resolvedParams[paramKey] = paramValue;
	return t(entry.messageKey, resolvedParams);
}
var ORDERED_RULE_CATEGORY_LABEL_KEYS, RISK_TYPE_KEY_PREFIX;
var init_audit_message = __esmMin((() => {
	ORDERED_RULE_CATEGORY_LABEL_KEYS = {
		command: "settings.securityCenter.policies.command",
		file: "settings.securityCenter.policies.file",
		network: "settings.securityCenter.policies.network"
	};
	RISK_TYPE_KEY_PREFIX = "securityCenter.audit.network.riskType.";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/audit-timestamp.ts
function resolveDateLocale(locale) {
	const normalizedLocale = locale.toLowerCase();
	if (normalizedLocale.startsWith("en")) return "en-GB";
	return normalizedLocale === "zh-tw" ? "zh-TW" : "zh-CN";
}
function formatAuditTimestamp(timestamp, locale) {
	if (!timestamp) return "";
	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleString(resolveDateLocale(locale), { hourCycle: "h23" });
}
var init_audit_timestamp = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/AuditCenterCard.tsx
function getAuditCommandPreview$1(entry) {
	if (!entry.commandPreview || !entry.eventType?.startsWith("file-safety.bulk-delete.")) return;
	return entry.commandPreview;
}
function AuditCenterCard({ auditLog, clearAuditLog, exportAuditLog, onViewAll }) {
	const { locale, t } = useI18n();
	const sortedEntries = (0, import_react$30.useMemo)(() => (auditLog?.entries ?? []).slice().reverse(), [auditLog?.entries]);
	const previewEntries = (0, import_react$30.useMemo)(() => sortedEntries.slice(0, 5), [sortedEntries]);
	const getCategoryLabel = (0, import_react$30.useCallback)((category) => {
		const normalizedCategory = normalizeAuditCategory(category);
		if (!normalizedCategory) return "";
		const i18nKey = AUDIT_CATEGORY_I18N_KEYS[normalizedCategory];
		return i18nKey ? t(i18nKey) : normalizedCategory;
	}, [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("section", {
		className: "security-center-panel__card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				className: "security-center-panel__section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
					className: "security-center-panel__section-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
						className: "security-center-panel__section-title",
						children: t("settings.securityCenter.section.audit")
					}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
						className: "security-center-panel__section-desc",
						children: t("settings.securityCenter.section.auditDesc")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
					className: "security-center-panel__audit-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Button, {
						variant: "secondary",
						size: "medium",
						className: "security-center-panel__audit-button",
						onClick: exportAuditLog,
						disabled: sortedEntries.length === 0,
						children: t("settings.securityCenter.audit.export")
					}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(Button, {
						variant: "secondary",
						size: "medium",
						className: "security-center-panel__audit-button",
						onClick: clearAuditLog,
						disabled: sortedEntries.length === 0,
						children: t("settings.securityCenter.audit.clearAll")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("hr", { className: "security-center-panel__divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				className: "security-center-panel__audit-list",
				children: [previewEntries.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
					className: "security-center-panel__audit-empty",
					children: t("settings.securityCenter.audit.empty")
				}), previewEntries.map((entry, idx) => {
					const commandPreview = getAuditCommandPreview$1(entry);
					return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
						className: "security-center-panel__audit-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
							className: "security-center-panel__audit-item-text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
								className: "security-center-panel__audit-item-type",
								children: entry.category ? `[${getCategoryLabel(entry.category)}]` : ""
							}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("span", {
								className: "security-center-panel__audit-item-content",
								children: [renderAuditMessage(t, entry), commandPreview ? ` ${commandPreview}` : null]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
							className: "security-center-panel__audit-item-time",
							children: formatAuditTimestamp(entry.timestamp, locale)
						})]
					}, idx);
				})]
			}),
			sortedEntries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("button", {
				type: "button",
				className: "security-center-panel__detail-link",
				onClick: onViewAll,
				children: [t("settings.securityCenter.audit.viewAll"), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(WbChevronRightIcon, { className: "security-center-panel__detail-link-icon" })]
			})
		]
	});
}
var import_react$30, import_jsx_runtime$25;
var init_AuditCenterCard = __esmMin((() => {
	init_src();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_constants();
	init_audit_message();
	init_audit_timestamp();
	import_jsx_runtime$25 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/DataSecurityRow.tsx
function DataSecurityRow({ controlNode, description, label, onOpenDetail, statusLabel, tooltip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
		className: `security-center-panel__row ${onOpenDetail ? "security-center-panel__row--clickable" : "security-center-panel__row--readonly"}`,
		role: onOpenDetail ? "button" : void 0,
		tabIndex: onOpenDetail ? 0 : void 0,
		onClick: onOpenDetail,
		onKeyDown: onOpenDetail ? (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onOpenDetail();
			}
		} : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("span", {
			className: "security-center-panel__row-text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("span", {
				className: "security-center-panel__row-title",
				children: [label, tooltip ? /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Tooltip, {
					content: tooltip,
					placement: "top",
					maxWidth: 280,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
						className: "security-center-panel__help-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(WbInfoIcon, {})
					})
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
				className: "security-center-panel__description",
				children: description
			})]
		}), controlNode ? /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
			className: "security-center-panel__data-control",
			children: controlNode
		}) : statusLabel ? /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Tag, {
			tone: "info",
			size: "small",
			children: statusLabel
		}) : null]
	});
}
var import_jsx_runtime$24;
var init_DataSecurityRow = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$24 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/FileBackupRow.tsx
function FileBackupRow({ disabled = false }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const currentConversation = useOptionalConversations()?.currentConversation;
	const currentConversationId = useOptionalSettingsRuntime()?.currentConversationId;
	const { fileBackupConfig, updateFileBackupConfig, sandboxEnabled, stateLoaded, updateSandboxEnabled } = useSecurityCenter();
	const effectiveEnabled = sandboxEnabled && fileBackupConfig.enabled;
	const [maxSizeInput, setMaxSizeInput] = (0, import_react$28.useState)(String(fileBackupConfig.maxSizeMB));
	const [backupNotice, setBackupNotice] = (0, import_react$28.useState)(null);
	const noticeTimerRef = (0, import_react$28.useRef)(void 0);
	const [rangeTip, setRangeTip] = (0, import_react$28.useState)(null);
	const rangeTipTimerRef = (0, import_react$28.useRef)(void 0);
	const showBackupNotice = (0, import_react$28.useCallback)((message) => {
		if (noticeTimerRef.current !== void 0) window.clearTimeout(noticeTimerRef.current);
		setBackupNotice(message);
		noticeTimerRef.current = window.setTimeout(() => {
			setBackupNotice(null);
			noticeTimerRef.current = void 0;
		}, BACKUP_NOTICE_DURATION_MS);
	}, []);
	const showRangeTip = (0, import_react$28.useCallback)((message) => {
		if (rangeTipTimerRef.current !== void 0) window.clearTimeout(rangeTipTimerRef.current);
		setRangeTip(message);
		rangeTipTimerRef.current = window.setTimeout(() => {
			setRangeTip(null);
			rangeTipTimerRef.current = void 0;
		}, BACKUP_NOTICE_DURATION_MS);
	}, []);
	(0, import_react$28.useEffect)(() => () => {
		if (noticeTimerRef.current !== void 0) window.clearTimeout(noticeTimerRef.current);
		if (rangeTipTimerRef.current !== void 0) window.clearTimeout(rangeTipTimerRef.current);
	}, []);
	(0, import_react$28.useEffect)(() => {
		if (!adapter) return;
		return adapter.on("open-modify-backup-dir-result", (data) => {
			const result = data;
			if (result?.success) return;
			if (result?.error === "not_found") showBackupNotice(t("settings.securityCenter.detail.fileBackupDirNotFound"));
			else if (result?.error === "no_session") showBackupNotice(t("settings.securityCenter.detail.fileBackupNoSession"));
			else showBackupNotice(t("settings.securityCenter.detail.fileBackupOpenDirFailed"));
		});
	}, [
		adapter,
		showBackupNotice,
		t
	]);
	const handleOpenBackupDir = (0, import_react$28.useCallback)(() => {
		const sessionId = currentConversationId ?? currentConversation?.id;
		if (!sessionId) {
			showBackupNotice(t("settings.securityCenter.detail.fileBackupNoSession"));
			return;
		}
		adapter?.emit("open-modify-backup-dir", { sessionId });
	}, [
		adapter,
		currentConversation?.id,
		currentConversationId,
		showBackupNotice,
		t
	]);
	const handleFileBackupToggle = (0, import_react$28.useCallback)((event) => {
		const enabled = event.currentTarget.checked;
		if (enabled && !sandboxEnabled) updateSandboxEnabled(true);
		if (enabled && isHostMac()) adapter?.emit("save-bundled-runtime-config", createEnabledBundledRuntimeConfig());
		updateFileBackupConfig({ enabled });
	}, [
		adapter,
		sandboxEnabled,
		updateFileBackupConfig,
		updateSandboxEnabled
	]);
	(0, import_react$28.useEffect)(() => {
		setMaxSizeInput(String(fileBackupConfig.maxSizeMB));
	}, [fileBackupConfig.maxSizeMB]);
	const handleMaxSizeChange = (0, import_react$28.useCallback)((event) => {
		const raw = event.currentTarget.value.replace(/[^\d]/g, "");
		setMaxSizeInput(raw);
	}, []);
	const handleMaxSizeKeyDown = (0, import_react$28.useCallback)((event) => {
		if ([
			"Backspace",
			"Delete",
			"ArrowLeft",
			"ArrowRight",
			"Tab",
			"Home",
			"End"
		].includes(event.key)) return;
		if ((event.ctrlKey || event.metaKey) && [
			"a",
			"c",
			"v",
			"x",
			"z"
		].includes(event.key.toLowerCase())) return;
		if (!/^\d$/.test(event.key)) event.preventDefault();
	}, []);
	const handleMaxSizePaste = (0, import_react$28.useCallback)((event) => {
		const pasted = event.clipboardData.getData("text");
		if (!/^\d+$/.test(pasted)) event.preventDefault();
	}, []);
	const commitMaxSize = (0, import_react$28.useCallback)(() => {
		const parsed = parseInt(maxSizeInput, 10);
		if (Number.isNaN(parsed) || parsed < MIN_BACKUP_SIZE_MB) {
			const clamped = MIN_BACKUP_SIZE_MB;
			setMaxSizeInput(String(clamped));
			updateFileBackupConfig({ maxSizeMB: clamped });
			showRangeTip(t("settings.securityCenter.detail.fileBackupMaxSizeRange"));
		} else {
			setMaxSizeInput(String(parsed));
			updateFileBackupConfig({ maxSizeMB: parsed });
		}
	}, [
		maxSizeInput,
		updateFileBackupConfig,
		showRangeTip,
		t
	]);
	if (!isHostWindows() && !isHostMac() && !isHostLinux()) return null;
	const fileBackupDescription = isHostMac() ? `${t("settings.securityCenter.detail.fileBackupDesc")} ${t("settings.securityCenter.detail.fileBackupRuntimeDependency")}` : t("settings.securityCenter.detail.fileBackupDesc");
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
		className: "security-center-panel__row security-center-panel__row--readonly security-center-panel__backup-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
				className: "security-center-panel__row-text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
					className: "security-center-panel__row-title",
					children: [t("settings.securityCenter.detail.fileBackupTitle"), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Tooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
							t("settings.securityCenter.detail.fileBackupTooltipLine1"),
							/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("br", {}),
							t("settings.securityCenter.detail.fileBackupTooltipLine2")
						] }),
						placement: "top",
						maxWidth: 280,
						children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
							className: "security-center-panel__help-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(WbInfoIcon, {})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
					className: "security-center-panel__description",
					children: fileBackupDescription
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "security-center-panel__backup-switch",
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
					className: "security-center-panel__switch-appearance",
					children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Switch, {
						checked: effectiveEnabled,
						onChange: handleFileBackupToggle,
						size: "large",
						disabled: disabled || !stateLoaded
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
				className: "security-center-panel__backup-config-row security-center-panel__backup-config-row--inline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
						className: "security-center-panel__backup-config-label",
						children: t("settings.securityCenter.detail.fileBackupMaxSizeLabel")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
						className: "security-center-panel__backup-input-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Input, {
							size: "medium",
							className: "security-center-panel__backup-config-input",
							type: "text",
							inputMode: "numeric",
							value: maxSizeInput,
							placeholder: "",
							disabled: disabled || !stateLoaded || !effectiveEnabled,
							onChange: handleMaxSizeChange,
							onBlur: commitMaxSize,
							onKeyDown: (event) => {
								if (event.key === "Enter") {
									commitMaxSize();
									return;
								}
								handleMaxSizeKeyDown(event);
							},
							onPaste: handleMaxSizePaste
						}), rangeTip ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
							className: "security-center-panel__backup-range-tip",
							role: "status",
							children: rangeTip
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
						className: "security-center-panel__backup-config-unit",
						children: "MB"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
						className: "security-center-panel__backup-open-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
							variant: "secondary",
							size: "medium",
							className: "security-center-panel__audit-button security-center-panel__backup-open-button",
							title: t("settings.securityCenter.detail.fileBackupOpenDirTip"),
							disabled,
							onClick: handleOpenBackupDir,
							children: t("settings.securityCenter.detail.fileBackupOpenDir")
						}), backupNotice ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
							className: "security-center-panel__backup-notice",
							role: "status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(TriangleAlert, {
								"aria-hidden": "true",
								className: "security-center-panel__backup-notice-icon"
							}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("span", {
								className: "security-center-panel__backup-notice-message",
								children: backupNotice
							})]
						}) : null]
					})
				]
			})
		]
	});
}
var import_react$28, import_jsx_runtime$23, MIN_BACKUP_SIZE_MB, BACKUP_NOTICE_DURATION_MS;
var init_FileBackupRow = __esmMin((() => {
	init_src();
	init_lucide_react();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_conversations_context();
	init_useI18n();
	init_SettingsRuntimeContext();
	init_path_display();
	init_useSecurityCenter();
	init_constants();
	import_jsx_runtime$23 = require_jsx_runtime();
	MIN_BACKUP_SIZE_MB = 1e3;
	BACKUP_NOTICE_DURATION_MS = 2400;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/LocationConsentRow.tsx
function readAuthStatus(storage) {
	try {
		const raw = storage?.getItem(POI_CONFIG_KEY);
		if (raw) return JSON.parse(raw).location_auth_status ?? "not_granted";
	} catch {}
	return "not_granted";
}
function writeAuthStatus(storage, status) {
	if (!storage) return;
	try {
		const raw = storage.getItem(POI_CONFIG_KEY);
		const cfg = raw ? JSON.parse(raw) : {};
		cfg.location_auth_status = status;
		storage.setItem(POI_CONFIG_KEY, JSON.stringify(cfg));
	} catch {}
}
/**
* 位置信息行（genie#52769 阶段三，问题 #2 修复：从独立 LocationConsentCard 合并入
* SystemAuthorizationCard 行列表，与磁盘/辅助/自动化平级；右侧用 Switch 而非"去授权"按钮，
* 保持应用内软件开关语义（granted/not_granted），不复用 macOS PermissionId 体系）。
*
* 行为：
*   - off → on：直接写 location_auth_status = 'granted'
*   - on → off：弹二次确认 Modal（PRD §6.3），确认才写 'not_granted'
*
* 注：location_auth_status 直接读写 configStorage（localStorage），不创建 RemotePoiStorage
* 实例——避免触发不必要的 getAddressList 接口调用。
*/
function LocationConsentRow() {
	const t = useTranslation();
	const configStorage = useOptionalModuleHost()?.storage;
	const [authStatus, setAuthStatusState] = (0, import_react$27.useState)(() => readAuthStatus(configStorage));
	const [showDisableConfirm, setShowDisableConfirm] = (0, import_react$27.useState)(false);
	const setAuthStatus = (0, import_react$27.useCallback)((status) => {
		writeAuthStatus(configStorage, status);
		setAuthStatusState(status);
	}, [configStorage]);
	const granted = authStatus === "granted";
	const handleToggle = (checked) => {
		if (checked) setAuthStatus("granted");
		else setShowDisableConfirm(true);
	};
	const confirmDisable = () => {
		setAuthStatus("not_granted");
		setShowDisableConfirm(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
		className: "security-center-panel__system-auth-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("span", {
			className: "security-center-panel__row-text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
				className: "security-center-panel__row-title",
				children: t("settings.locationConsent.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
				className: "security-center-panel__description",
				children: t("settings.locationConsent.description")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
			className: "security-center-panel__system-auth-meta",
			children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Switch, {
				checked: granted,
				onChange: (e) => handleToggle(e.target.checked),
				size: "large"
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Modal, {
		open: showDisableConfirm,
		onOpenChange: (open) => {
			if (!open) setShowDisableConfirm(false);
		},
		title: t("settings.locationConsent.disableConfirmTitle"),
		size: "small",
		centered: true,
		okText: t("common.confirm"),
		cancelText: t("common.cancel"),
		okType: "danger",
		onOk: confirmDisable,
		onCancel: () => setShowDisableConfirm(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("p", { children: t("settings.locationConsent.disableConfirmContent") })
	})] });
}
var import_react$27, import_jsx_runtime$22, POI_CONFIG_KEY;
var init_LocationConsentRow = __esmMin((() => {
	init_src();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_common();
	import_jsx_runtime$22 = require_jsx_runtime();
	POI_CONFIG_KEY = "poi:remote-config";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/RuntimeToolsCard.tsx
function RuntimeToolsCard({ disabled = false, managedConfig }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const [fetchedConfig, setConfig] = (0, import_react$26.useState)(DEFAULT_BUNDLED_RUNTIME);
	(0, import_react$26.useEffect)(() => {
		if (!adapter) return;
		const unsubscribe = adapter.on("bundled-runtime-config-result", (data) => {
			const result = data;
			if (result && typeof result === "object") setConfig({
				enabled: result.enabled !== false,
				tools: {
					node: result.tools?.node !== false,
					python: result.tools?.python !== false,
					gitBash: result.tools?.gitBash !== false,
					brokeredShell: result.tools?.brokeredShell !== false
				}
			});
		});
		adapter.emit("get-bundled-runtime-config");
		return unsubscribe;
	}, [adapter]);
	const config = managedConfig ?? fetchedConfig;
	const saveConfig = (0, import_react$26.useCallback)((next) => {
		setConfig(next);
		adapter?.emit("save-bundled-runtime-config", next);
		if (shouldDisableMacFileBackupForBundledRuntime(next)) adapter?.emit("save-sandbox-rules-config", { fileBackup: { enabled: false } });
	}, [adapter]);
	const handleMasterToggle = (0, import_react$26.useCallback)((enabled) => {
		saveConfig({
			...config,
			enabled
		});
	}, [config, saveConfig]);
	const handleToolToggle = (0, import_react$26.useCallback)((toolId, enabled) => {
		const key = TOOL_CONFIG_KEY[toolId];
		if (!key) return;
		saveConfig({
			...config,
			tools: {
				...config.tools,
				[key]: enabled
			}
		});
	}, [config, saveConfig]);
	const isToolEnabled = (toolId) => {
		const key = TOOL_CONFIG_KEY[toolId];
		return key ? config.tools[key] !== false : true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("section", {
		className: "security-center-panel__card security-center-panel__runtime-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
				className: "security-center-panel__section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					className: "security-center-panel__section-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
						className: "security-center-panel__section-title",
						children: t("settings.securityCenter.section.runtime")
					}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
						className: "security-center-panel__section-desc",
						children: t("settings.softwareConfig.bundledRuntimeDesc")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
					className: "security-center-panel__section-action",
					children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Switch, {
						checked: config.enabled,
						onChange: (e) => handleMasterToggle(e.target.checked),
						size: "large",
						disabled
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("hr", { className: "security-center-panel__divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
				className: "security-center-panel__runtime-list",
				children: getVisibleRuntimeTools().map((tool) => {
					const toolEnabled = isToolEnabled(tool.id);
					const effectiveEnabled = config.enabled && toolEnabled;
					const rowDisabled = !config.enabled;
					return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
						className: `security-center-panel__runtime-item${rowDisabled ? " security-center-panel__runtime-item--disabled" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
								className: "security-center-panel__runtime-item-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
									className: "security-center-panel__runtime-item-icon",
									children: tool.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
									className: "security-center-panel__runtime-item-title",
									children: tool.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
								className: "security-center-panel__runtime-item-desc",
								children: t(`settings.softwareConfig.desc.${tool.id}`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
								className: "security-center-panel__runtime-item-control",
								children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Switch, {
									checked: effectiveEnabled,
									onChange: (e) => handleToolToggle(tool.id, e.target.checked),
									size: "large",
									disabled: disabled || rowDisabled
								})
							})
						]
					}, tool.id);
				})
			})
		]
	});
}
var import_react$26, import_jsx_runtime$21;
var init_RuntimeToolsCard = __esmMin((() => {
	init_src();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_constants();
	init_icons$1();
	import_jsx_runtime$21 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/SecurityEntryRow.tsx
function SecurityEntryRow({ description, disabled = false, label, onOpenDetail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		className: `security-center-panel__nav-row${disabled ? " security-center-panel__nav-row--disabled" : ""}`,
		role: "button",
		tabIndex: disabled ? -1 : 0,
		"aria-disabled": disabled ? true : void 0,
		onClick: disabled ? void 0 : onOpenDetail,
		onKeyDown: disabled ? void 0 : (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onOpenDetail();
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("span", {
			className: "security-center-panel__row-text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
				className: "security-center-panel__row-title",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
				className: "security-center-panel__description",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
			className: "security-center-panel__nav-chevron",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(WbChevronRightIcon, {})
		})]
	});
}
var import_jsx_runtime$20;
var init_SecurityEntryRow = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$20 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/cards/SystemAuthorizationCard.tsx
function SystemAuthorizationCard({ permissionStatusMap, onAuthorizeClicked, extraRow }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { name: productName = "WorkBuddy" } = useAssistantDisplay(adapter);
	const permissionIds = (0, import_react$24.useMemo)(() => getPlatformPermissionIds().filter((id) => id !== "calendarAccess"), []);
	const handleAuthorize = (0, import_react$24.useCallback)((permissionId) => {
		onAuthorizeClicked(permissionId);
		if (!adapter) return;
		const url = PERMISSION_SYSTEM_URLS[permissionId];
		if (url) adapter.emit("open-external", url);
	}, [adapter, onAuthorizeClicked]);
	if (permissionIds.length === 0 && !extraRow) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("section", {
		className: "security-center-panel__card security-center-panel__system-auth-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
				className: "security-center-panel__section-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
					className: "security-center-panel__section-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
						className: "security-center-panel__section-title",
						children: t("settings.systemPermissions.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
						className: "security-center-panel__section-desc",
						children: t("settings.systemPermissions.subtitle", { name: productName })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("hr", { className: "security-center-panel__divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
				className: "security-center-panel__system-auth-list",
				children: [permissionIds.map((permissionId) => {
					const isAuthorized = permissionStatusMap[permissionId] === "authorized";
					const hideBadge = PERMISSIONS_WITHOUT_BADGE.has(permissionId);
					return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
						className: "security-center-panel__system-auth-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("span", {
							className: "security-center-panel__row-text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
								className: "security-center-panel__row-title",
								children: t(`settings.systemPermissions.${permissionId}`)
							}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
								className: "security-center-panel__description",
								children: t(`settings.systemPermissions.${permissionId}Desc`)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("span", {
							className: "security-center-panel__system-auth-meta",
							children: [!hideBadge && isAuthorized && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
								className: "security-center-panel__status-badge",
								children: t("settings.systemPermissions.authorized")
							}), !isAuthorized && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								rightIcon: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(WbJumpIcon, {}),
								className: "security-center-panel__system-auth-action",
								onClick: () => handleAuthorize(permissionId),
								children: t("settings.systemPermissions.authorize")
							})]
						})]
					}, permissionId);
				}), extraRow]
			})
		]
	});
}
var import_react$24, import_jsx_runtime$19;
var init_SystemAuthorizationCard = __esmMin((() => {
	init_src();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_use_assistant_display();
	init_useSystemPermissions();
	init_constants();
	import_jsx_runtime$19 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/audit-search.ts
function matchesAuditDisplayKeyword(entry, keyword, t, getCategoryLabel) {
	const normalizedKeyword = keyword.trim().toLowerCase();
	if (!normalizedKeyword) return true;
	const paramText = entry.messageParams ? Object.values(entry.messageParams).map((value) => String(value)).join(" ") : "";
	const messageText = renderAuditMessage(t, entry);
	const categoryLabel = getCategoryLabel(entry.category);
	return [
		categoryLabel ? `[${categoryLabel}] ${messageText}` : messageText,
		messageText,
		categoryLabel,
		entry.messageKey ?? "",
		paramText,
		entry.commandPreview ?? ""
	].join("\n").toLowerCase().includes(normalizedKeyword);
}
var AUDIT_SEARCH_SCAN_LIMIT;
var init_audit_search = __esmMin((() => {
	init_audit_message();
	AUDIT_SEARCH_SCAN_LIMIT = 5e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/AuditDetail.tsx
/** 根据时间筛选项计算本地时间窗口的起点。 */
function getAuditTimeCutoff(filter) {
	const now = Date.now();
	if (filter === "today") {
		const today = new Date(now);
		today.setHours(0, 0, 0, 0);
		return today.getTime();
	}
	if (filter === "7d") return now - 7 * DAY_IN_MS;
	if (filter === "30d") return now - 30 * DAY_IN_MS;
}
function getAuditTimeFilterLabelKey(filter) {
	return `settings.securityCenter.audit.time.${filter}`;
}
function getAuditDecisionLabelKey(decision) {
	return `settings.securityCenter.audit.decision.${decision}`;
}
function toNewestFirst(entries) {
	return entries.slice().reverse();
}
function getAuditCommandPreview(entry) {
	if (!entry.commandPreview || !entry.eventType?.startsWith("file-safety.bulk-delete.")) return;
	return entry.commandPreview;
}
function AuditDetail({ controller }) {
	const { locale, t } = useI18n();
	const adapter = useAdapter();
	const { clearAuditLog, exportAuditLog, queryAuditLog } = controller;
	const [searchKeyword, setSearchKeyword] = (0, import_react$23.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react$23.useState)(ALL_AUDIT_CATEGORY);
	const [decisionFilter, setDecisionFilter] = (0, import_react$23.useState)(ALL_AUDIT_DECISION);
	const [timeFilter, setTimeFilter] = (0, import_react$23.useState)("all");
	const [searchVisible, setSearchVisible] = (0, import_react$23.useState)(false);
	const [auditEntries, setAuditEntries] = (0, import_react$23.useState)([]);
	const [nextCursor, setNextCursor] = (0, import_react$23.useState)();
	const [auditTotal, setAuditTotal] = (0, import_react$23.useState)();
	const [isLoading, setIsLoading] = (0, import_react$23.useState)(false);
	const [hasLoaded, setHasLoaded] = (0, import_react$23.useState)(false);
	const debouncedSearchKeyword = useDebouncedValue(searchKeyword, AUDIT_SEARCH_DEBOUNCE_MS);
	const requestVersionRef = (0, import_react$23.useRef)(0);
	const loadingRef = (0, import_react$23.useRef)(false);
	const scannedAuditCountRef = (0, import_react$23.useRef)(0);
	const getAuditCategoryLabel = (0, import_react$23.useCallback)((category) => {
		const normalizedCategory = normalizeAuditCategory(category);
		if (!normalizedCategory) return "";
		const i18nKey = AUDIT_CATEGORY_I18N_KEYS[normalizedCategory];
		return i18nKey ? t(i18nKey) : normalizedCategory;
	}, [t]);
	const categoryOptions = (0, import_react$23.useMemo)(() => {
		const categories = getAuditCategoryOptionValues(auditEntries).sort((left, right) => getAuditCategoryLabel(left).localeCompare(getAuditCategoryLabel(right)));
		return [{
			value: ALL_AUDIT_CATEGORY,
			label: t("settings.securityCenter.audit.categoryAll")
		}, ...categories.map((category) => ({
			value: category,
			label: getAuditCategoryLabel(category)
		}))];
	}, [
		auditEntries,
		getAuditCategoryLabel,
		t
	]);
	const decisionOptions = (0, import_react$23.useMemo)(() => AUDIT_DECISION_FILTERS.map((decision) => ({
		value: decision,
		label: t(getAuditDecisionLabelKey(decision))
	})), [t]);
	const timeOptions = (0, import_react$23.useMemo)(() => AUDIT_TIME_FILTERS.map((filter) => ({
		value: filter,
		label: t(getAuditTimeFilterLabelKey(filter))
	})), [t]);
	const normalizedKeyword = debouncedSearchKeyword.trim();
	const isKeywordSearch = normalizedKeyword !== "";
	const hasActiveFilters = searchKeyword.trim() !== "" || categoryFilter !== ALL_AUDIT_CATEGORY || decisionFilter !== ALL_AUDIT_DECISION || timeFilter !== "all";
	const hasAnyAuditEntries = auditEntries.length > 0;
	const buildAuditQuery = (0, import_react$23.useCallback)((cursor, limit = AUDIT_PAGE_SIZE) => {
		const from = getAuditTimeCutoff(timeFilter);
		return {
			limit,
			...cursor ? { cursor } : {},
			...categoryFilter !== ALL_AUDIT_CATEGORY ? { category: categoryFilter } : {},
			...decisionFilter !== ALL_AUDIT_DECISION ? { decision: decisionFilter } : {},
			...from !== void 0 ? { from } : {}
		};
	}, [
		categoryFilter,
		decisionFilter,
		timeFilter
	]);
	const loadAuditEntries = (0, import_react$23.useCallback)(async (cursor, reset = false) => {
		if (!reset && loadingRef.current) return;
		const requestVersion = reset ? requestVersionRef.current + 1 : requestVersionRef.current;
		if (reset) {
			requestVersionRef.current = requestVersion;
			setAuditEntries([]);
			setNextCursor(void 0);
			setAuditTotal(void 0);
			setHasLoaded(false);
			scannedAuditCountRef.current = 0;
		}
		loadingRef.current = true;
		setIsLoading(true);
		try {
			let queryCursor = cursor;
			let pageNextCursor;
			const nextEntries = [];
			let scannedCount = scannedAuditCountRef.current;
			do {
				const queryLimit = normalizedKeyword ? Math.min(AUDIT_PAGE_SIZE, AUDIT_SEARCH_SCAN_LIMIT - scannedCount) : AUDIT_PAGE_SIZE;
				if (queryLimit <= 0) {
					pageNextCursor = void 0;
					break;
				}
				const page = await queryAuditLog(buildAuditQuery(queryCursor, queryLimit));
				if (requestVersion !== requestVersionRef.current) return;
				if (reset && typeof page.total === "number" && !isKeywordSearch) setAuditTotal(page.total);
				const pageEntries = toNewestFirst(page.entries);
				scannedCount += page.entries.length;
				nextEntries.push(...normalizedKeyword ? pageEntries.filter((entry) => matchesAuditDisplayKeyword(entry, normalizedKeyword, t, getAuditCategoryLabel)) : pageEntries);
				pageNextCursor = page.nextCursor;
				queryCursor = page.nextCursor;
			} while (normalizedKeyword && nextEntries.length < AUDIT_PAGE_SIZE && pageNextCursor && scannedCount < 5e3);
			if (requestVersion !== requestVersionRef.current) return;
			scannedAuditCountRef.current = scannedCount;
			setAuditEntries((previous) => reset ? nextEntries : [...previous, ...nextEntries]);
			setAuditTotal((previous) => isKeywordSearch ? (reset ? 0 : previous ?? 0) + nextEntries.length : previous);
			setNextCursor(isKeywordSearch && scannedCount >= 5e3 ? void 0 : pageNextCursor);
			setHasLoaded(true);
		} catch (error) {
			console.error("[AuditDetail] queryAuditLog failed:", error);
		} finally {
			if (requestVersion === requestVersionRef.current) {
				loadingRef.current = false;
				setIsLoading(false);
			}
		}
	}, [
		buildAuditQuery,
		getAuditCategoryLabel,
		isKeywordSearch,
		normalizedKeyword,
		queryAuditLog,
		t
	]);
	(0, import_react$23.useEffect)(() => {
		const refresh = () => {
			loadAuditEntries(void 0, true).catch(() => void 0);
		};
		refresh();
		return adapter?.on("audit-log-changed", refresh);
	}, [adapter, loadAuditEntries]);
	const loadMoreAuditEntries = (0, import_react$23.useCallback)(() => {
		if (!nextCursor || isLoading) return;
		loadAuditEntries(nextCursor, false).catch(() => void 0);
	}, [
		isLoading,
		loadAuditEntries,
		nextCursor
	]);
	const resetFilters = (0, import_react$23.useCallback)(() => {
		setSearchKeyword("");
		setCategoryFilter(ALL_AUDIT_CATEGORY);
		setDecisionFilter(ALL_AUDIT_DECISION);
		setTimeFilter("all");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
		className: "security-center-panel security-center-panel--detail security-center-panel--subpage",
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "security-center-panel__grid security-center-panel__detail-grid security-center-panel__detail-grid--no-scroll",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "security-center-panel__audit-toolbar",
				role: "search",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Select, {
						size: "medium",
						placement: "bottom-start",
						value: categoryFilter,
						options: categoryOptions,
						onChange: (value) => setCategoryFilter(value),
						className: "security-center-panel__audit-select",
						popoverClassName: "security-center-panel__audit-category-popover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Select, {
						size: "medium",
						placement: "bottom-start",
						value: decisionFilter,
						options: decisionOptions,
						onChange: (value) => setDecisionFilter(value),
						className: "security-center-panel__audit-select"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Select, {
						size: "medium",
						placement: "bottom-start",
						value: timeFilter,
						options: timeOptions,
						onChange: (value) => setTimeFilter(value),
						className: "security-center-panel__audit-select"
					}),
					searchVisible ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Input, {
						autoFocus: true,
						size: "medium",
						value: searchKeyword,
						allowClear: true,
						"aria-label": t("settings.securityCenter.audit.searchPlaceholder"),
						placeholder: t("settings.securityCenter.audit.searchPlaceholder"),
						onChange: (event) => setSearchKeyword(event.currentTarget.value),
						onBlur: () => {
							if (!searchKeyword) setSearchVisible(false);
						},
						className: "security-center-panel__audit-search-input"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
							variant: "secondary",
							size: "medium",
							iconOnly: true,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(SearchIcon, {}),
							"aria-label": t("settings.securityCenter.audit.searchPlaceholder"),
							onClick: () => setSearchVisible(true)
						}),
						hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
							variant: "ghost",
							size: "medium",
							onClick: resetFilters,
							children: t("settings.securityCenter.audit.resetFilters")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { className: "security-center-panel__audit-toolbar-spacer" }),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
							className: "security-center-panel__audit-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								onClick: exportAuditLog,
								disabled: !hasAnyAuditEntries,
								children: t("settings.securityCenter.audit.export")
							}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
								variant: "secondary",
								size: "medium",
								onClick: clearAuditLog,
								disabled: !hasAnyAuditEntries,
								children: t("settings.securityCenter.audit.clearAll")
							})]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "security-center-panel__audit-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "security-center-panel__audit-thead",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
						className: "security-center-panel__audit-th security-center-panel__audit-th--log",
						children: isKeywordSearch ? t("settings.securityCenter.audit.matchedEntries", { count: auditTotal ?? auditEntries.length }) : t("settings.securityCenter.audit.entries", { count: auditTotal ?? auditEntries.length })
					}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
						className: "security-center-panel__audit-th security-center-panel__audit-th--time",
						children: t("settings.securityCenter.audit.timeColumn")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
					className: "security-center-panel__audit-tbody",
					children: isLoading && !hasLoaded ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "security-center-panel__audit-empty",
						children: t("settings.securityCenter.audit.loading")
					}) : auditEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "security-center-panel__audit-empty",
						children: hasActiveFilters ? t("settings.securityCenter.audit.noResults") : t("settings.securityCenter.audit.empty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Yr, {
						totalCount: auditEntries.length,
						overscan: 20,
						endReached: loadMoreAuditEntries,
						itemContent: (index) => {
							const entry = auditEntries[index];
							const commandPreview = getAuditCommandPreview(entry);
							const categoryPrefix = entry.category ? `[${getAuditCategoryLabel(entry.category)}] ` : "";
							const messageNode = renderAuditMessage(t, entry);
							const plainMessage = `${categoryPrefix}${typeof messageNode === "string" ? messageNode : ""}${commandPreview ? ` ${commandPreview}` : ""}`.trim();
							return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "security-center-panel__audit-entry",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("span", {
									className: "security-center-panel__audit-message",
									title: plainMessage || void 0,
									children: [
										categoryPrefix,
										messageNode,
										commandPreview ? ` ${commandPreview}` : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
									className: "security-center-panel__audit-timestamp",
									children: formatAuditTimestamp(entry.timestamp, locale)
								})]
							});
						}
					})
				})]
			})]
		})
	});
}
var import_react$23, import_jsx_runtime$18, ALL_AUDIT_CATEGORY, ALL_AUDIT_DECISION, AUDIT_TIME_FILTERS, AUDIT_DECISION_FILTERS, AUDIT_PAGE_SIZE, AUDIT_SEARCH_DEBOUNCE_MS, DAY_IN_MS;
var init_AuditDetail = __esmMin((() => {
	init_src();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_adapter_context();
	init_use_debounced_value();
	init_useI18n();
	init_constants();
	init_audit_message();
	init_audit_timestamp();
	init_audit_search();
	import_jsx_runtime$18 = require_jsx_runtime();
	ALL_AUDIT_CATEGORY = "all";
	ALL_AUDIT_DECISION = "all";
	AUDIT_TIME_FILTERS = [
		"all",
		"today",
		"7d",
		"30d"
	];
	AUDIT_DECISION_FILTERS = [
		"all",
		"allowed",
		"approved",
		"rejected",
		"blocked",
		"failed",
		"info"
	];
	AUDIT_PAGE_SIZE = 100;
	AUDIT_SEARCH_DEBOUNCE_MS = 300;
	DAY_IN_MS = 864e5;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/ordered-rule-action-select.tsx
function OrderedRuleActionSelect({ disabled, value, onChange }) {
	const t = useTranslation();
	const options = [
		{
			value: "allow",
			label: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Tag, {
				appearance: "plain",
				size: "small",
				tone: "success",
				dot: true,
				children: t("settings.securityCenter.ordered.allow")
			})
		},
		{
			value: "ask",
			label: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Tag, {
				appearance: "plain",
				size: "small",
				tone: "warning",
				dot: true,
				children: t("settings.securityCenter.ordered.ask")
			})
		},
		{
			value: "deny",
			label: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Tag, {
				appearance: "plain",
				size: "small",
				tone: "error",
				dot: true,
				children: t("settings.securityCenter.ordered.deny")
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Select, {
		size: "small",
		shape: "rounded",
		disabled,
		options,
		value,
		onChange: (next) => onChange(next)
	});
}
var import_jsx_runtime$17;
var init_ordered_rule_action_select = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$17 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/ordered-rule-list.tsx
function moveOrderedRule(items, activeId, overId) {
	if (activeId === overId) return items;
	const oldIndex = items.findIndex((item) => item.id === activeId);
	const newIndex = items.findIndex((item) => item.id === overId);
	return oldIndex < 0 || newIndex < 0 ? items : arrayMove(items, oldIndex, newIndex);
}
/**
* 行内容（Tag / matcher / policy / 操作区）。可拖拽与只读两种行共用，
* 保证 DOM 结构和 class 一致——less 里针对 __ordered-rule-row 的布局规则依赖这一点。
*/
function RuleRowContent({ disabled, dragHandle, item, labels, onDelete, renderMatcher, renderPolicy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)(import_jsx_runtime$16.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Tag, {
			appearance: "outline",
			size: "small",
			tone: item.source === "user" ? "default" : "info",
			children: labels[item.source]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "security-center-panel__ordered-rule-matcher",
			children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "security-center-panel__ordered-rule-matcher-value",
				children: renderMatcher(item)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "security-center-panel__ordered-rule-policy",
			children: renderPolicy(item)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "security-center-panel__ordered-rule-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Button, {
				variant: "ghost",
				size: "small",
				iconOnly: true,
				disabled,
				onClick: () => onDelete(item),
				title: labels.delete,
				"aria-label": labels.delete,
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(DeleteIcon, {})
			}), dragHandle]
		})
	] });
}
function SortableRuleRow({ item, labels, onDelete, renderMatcher, renderPolicy }) {
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
		ref: setNodeRef,
		className: `security-center-panel__ordered-rule-row security-center-panel__ordered-rule-row--${item.source}${isDragging ? " security-center-panel__ordered-rule-row--dragging" : ""}`,
		style: {
			transform: CSS.Transform.toString(transform),
			transition
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(RuleRowContent, {
			item,
			labels,
			onDelete,
			renderMatcher,
			renderPolicy,
			dragHandle: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(Button, {
				variant: "ghost",
				size: "small",
				iconOnly: true,
				className: "security-center-panel__ordered-rule-drag",
				title: labels.drag,
				"aria-label": labels.drag,
				...attributes,
				...listeners,
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(GripVerticalIcon, { color: "var(--wb-icon-muted)" })
			})
		})
	});
}
/** 只读行：不调用 useSortable（hook 不能条件调用），也不渲染拖拽手柄。 */
function ReadonlyRuleRow({ item, labels, onDelete, renderMatcher, renderPolicy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
		className: `security-center-panel__ordered-rule-row security-center-panel__ordered-rule-row--${item.source}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(RuleRowContent, {
			disabled: true,
			item,
			labels,
			onDelete,
			renderMatcher,
			renderPolicy
		})
	});
}
function OrderedRuleList({ disabled, items, labels, onDelete, onReorder, renderMatcher, renderPolicy }) {
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
	const handleDragEnd = (event) => {
		if (!event.over) return;
		const next = moveOrderedRule(items, String(event.active.id), String(event.over.id));
		if (next !== items) onReorder(next);
	};
	const rowProps = {
		labels,
		onDelete,
		renderMatcher,
		renderPolicy
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
		className: "security-center-panel__ordered-rules",
		children: [!disabled && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("p", {
			className: "security-center-panel__ordered-rule-priority-hint",
			children: labels.priorityHint
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "security-center-panel__ordered-rule-empty",
			children: labels.empty
		}) : disabled ? /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "security-center-panel__ordered-rule-list",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ReadonlyRuleRow, {
				item,
				...rowProps
			}, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(DndContext, {
			sensors,
			collisionDetection: closestCenter,
			onDragEnd: handleDragEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(SortableContext, {
				items: items.map((item) => item.id),
				strategy: verticalListSortingStrategy,
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
					className: "security-center-panel__ordered-rule-list",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(SortableRuleRow, {
						item,
						...rowProps
					}, item.id))
				})
			})
		})]
	});
}
var import_jsx_runtime$16;
var init_ordered_rule_list = __esmMin((() => {
	init_core_esm();
	init_sortable_esm();
	init_utilities_esm();
	init_src();
	require_react();
	import_jsx_runtime$16 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/ResetRulesButton.tsx
function ResetRulesButton({ buttonLabel, cancelLabel, confirmLabel, description, disabled, disabledHint, onConfirm, title }) {
	const [confirmOpen, setConfirmOpen] = (0, import_react$20.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)(import_jsx_runtime$15.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Tooltip, {
		content: disabled ? disabledHint : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
			className: "security-center-panel__section-action-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Button, {
				size: "medium",
				className: "security-center-panel__reset-button",
				disabled,
				onClick: () => setConfirmOpen(true),
				children: buttonLabel
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Modal, {
		open: confirmOpen,
		onOpenChange: setConfirmOpen,
		title,
		description,
		variant: "confirm",
		okText: confirmLabel,
		cancelText: cancelLabel,
		okType: "danger",
		onOk: onConfirm,
		onCancel: () => setConfirmOpen(false)
	})] });
}
var import_react$20, import_jsx_runtime$15;
var init_ResetRulesButton = __esmMin((() => {
	init_src();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$15 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/RuleListSection.tsx
function ConfirmCheckIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 3 3.99854)",
			d: "M5.1314 6.7172L11.4243 0.4243L10.5757 -0.4243L4.2828 5.8686L4.2732 5.8783Q4.0908 6.0607 4 6.1423Q3.9092 6.0607 3.7268 5.8783L3.7172 5.8686L0.4243 2.5757L-0.4243 3.4243L2.8686 6.7172L2.8783 6.7268Q3.1924 7.041 3.3327 7.1476Q3.6556 7.3929 4 7.3929Q4.3444 7.3929 4.6673 7.1476Q4.8076 7.041 5.1217 6.7268L5.1314 6.7172Z",
			fillRule: "evenodd"
		})
	});
}
function RuleListSection({ addError, addValue, addLabel, builtinLabel, canAdd, deleteLabel, desc, disabled, headingIcon, items, getKey, getLabel, isBuiltinItem, onAdd, onChange, onRemove, placeholder, title }) {
	const [isAdding, setIsAdding] = (0, import_react$19.useState)(false);
	const inputRef = (0, import_react$19.useRef)(null);
	const openAdd = (0, import_react$19.useCallback)(() => {
		if (disabled) return;
		setIsAdding(true);
		requestAnimationFrame(() => inputRef.current?.focus());
	}, [disabled]);
	const closeAdd = (0, import_react$19.useCallback)(() => {
		setIsAdding(false);
		onChange("");
	}, [onChange]);
	const confirmAdd = (0, import_react$19.useCallback)(() => {
		if (!canAdd) return;
		onAdd();
		setIsAdding(false);
	}, [canAdd, onAdd]);
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("section", {
		className: "security-center-panel__card security-center-panel__plcard",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "security-center-panel__section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "security-center-panel__section-heading",
				children: [headingIcon && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
					className: "security-center-panel__section-title-icon",
					"aria-hidden": "true",
					children: headingIcon
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "security-center-panel__section-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
						className: "security-center-panel__section-title",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
						className: "security-center-panel__section-desc",
						children: desc
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
				className: "security-center-panel__plcard-add",
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					disabled: disabled || isAdding,
					onClick: openAdd,
					children: addLabel
				})
			})]
		}), (items.length > 0 || isAdding) && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("hr", { className: "security-center-panel__divider" }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("ul", {
			className: "security-center-panel__plcard-list",
			children: [items.map((item) => {
				const key = getKey(item);
				const label = getLabel(item);
				const isBuiltin = Boolean(isBuiltinItem?.(item));
				return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("li", {
					className: "security-center-panel__plcard-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
						className: "security-center-panel__plcard-path",
						title: label,
						children: label
					}), isBuiltin ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
						className: "security-center-panel__plcard-builtin-tag",
						children: builtinLabel ?? deleteLabel
					}) : /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "ghost",
						size: "small",
						iconOnly: true,
						disabled,
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DeleteIcon, {}),
						"aria-label": deleteLabel,
						title: deleteLabel,
						className: "security-center-panel__plcard-action-btn",
						onClick: () => onRemove(key)
					})]
				}, key);
			}), isAdding && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("li", {
				className: "security-center-panel__plcard-row security-center-panel__plcard-row--input",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "security-center-panel__plcard-input-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Input, {
							ref: inputRef,
							size: "small",
							status: addError ? "error" : void 0,
							"aria-invalid": Boolean(addError),
							className: "security-center-panel__plcard-input",
							value: addValue,
							placeholder,
							onChange: (event) => onChange(event.currentTarget.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									confirmAdd();
								} else if (event.key === "Escape") {
									event.preventDefault();
									closeAdd();
								}
							},
							onBlur: () => {
								if (!addValue.trim()) closeAdd();
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ConfirmCheckIcon, {}),
							"aria-label": addLabel,
							title: addLabel,
							className: "security-center-panel__plcard-action-btn",
							disabled: !canAdd,
							onMouseDown: (event) => event.preventDefault(),
							onClick: confirmAdd
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(XCloseIcon, {}),
							"aria-label": deleteLabel,
							title: deleteLabel,
							className: "security-center-panel__plcard-action-btn",
							onMouseDown: (event) => event.preventDefault(),
							onClick: closeAdd
						})
					]
				}), addError && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
					className: "security-center-panel__plcard-error",
					role: "alert",
					children: addError
				})]
			})]
		})] })]
	});
}
var import_react$19, import_jsx_runtime$14;
var init_RuleListSection = __esmMin((() => {
	init_src();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/ordered-rule-id.ts
function createOrderedRuleId(category) {
	return `${category}-user-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
}
var init_ordered_rule_id = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/command-rule-utils.ts
function parseCommandPrefix(value) {
	return value.trim().split(/\s+/).filter(Boolean);
}
function commandPrefixesOverlap(left, right) {
	const sharedLength = Math.min(left.length, right.length);
	return sharedLength > 0 && left.slice(0, sharedLength).every((token, index) => token === right[index]);
}
function createCommandRuleId() {
	return createOrderedRuleId("command");
}
var init_command_rule_utils = __esmMin((() => {
	init_ordered_rule_id();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/program-blacklist-input.ts
/**
* 程序黑名单按可执行文件名匹配，不接受路径、参数或 shell 表达式。
* Windows 规则统一保存为小写 `.exe` 名称，让用户输入时可以省略后缀。
*/
function normalizeProgramBlacklistEntry(value, platform) {
	const trimmed = value.trim();
	if (!trimmed || trimmed.length > MAX_PROGRAM_NAME_LENGTH || trimmed === "." || trimmed === ".." || !SAFE_PROGRAM_NAME_PATTERN.test(trimmed)) return null;
	if (platform !== "win32") return trimmed;
	if (trimmed.endsWith(".") || WINDOWS_RESERVED_NAME_PATTERN.test(trimmed)) return null;
	const lowerCaseName = trimmed.toLowerCase();
	const baseName = lowerCaseName.endsWith(".exe") ? lowerCaseName.slice(0, -4) : lowerCaseName;
	if (!baseName) return null;
	const normalized = `${baseName}.exe`;
	return normalized.length <= MAX_PROGRAM_NAME_LENGTH ? normalized : null;
}
var MAX_PROGRAM_NAME_LENGTH, SAFE_PROGRAM_NAME_PATTERN, WINDOWS_RESERVED_NAME_PATTERN;
var init_program_blacklist_input = __esmMin((() => {
	MAX_PROGRAM_NAME_LENGTH = 255;
	SAFE_PROGRAM_NAME_PATTERN = /^[\p{L}\p{N}._+@-]+$/u;
	WINDOWS_RESERVED_NAME_PATTERN = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/CommandDetail.tsx
function CommandDetail() {
	const t = useTranslation();
	const isWindows = isHostWindows$1();
	const { managed, orderedRules, programBlacklist, resetOrderedRules, updateOrderedRules, updateProgramBlacklist } = useSecurityCenter();
	const [newProgram, setNewProgram] = (0, import_react$18.useState)("");
	const trimmedProgram = newProgram.trim();
	const programPlatform = isWindows ? "win32" : "unix";
	const normalizedProgram = normalizeProgramBlacklistEntry(newProgram, programPlatform);
	const isDuplicateProgram = normalizedProgram !== null && programBlacklist.some((program) => normalizeProgramBlacklistEntry(program, programPlatform) === normalizedProgram);
	const programInputError = trimmedProgram ? !normalizedProgram ? t(isWindows ? "settings.securityCenter.detail.programBlacklistInvalidWindows" : "settings.securityCenter.detail.programBlacklistInvalidUnix") : isDuplicateProgram ? t("settings.securityCenter.detail.programBlacklistDuplicate") : void 0 : void 0;
	const canAddProgram = normalizedProgram !== null && !isDuplicateProgram;
	const rules = orderedRules.command.rules;
	const [newCommand, setNewCommand] = (0, import_react$18.useState)("");
	const [newAction, setNewAction] = (0, import_react$18.useState)("ask");
	const newPrefix = parseCommandPrefix(newCommand);
	const newKey = JSON.stringify(newPrefix);
	const duplicate = newPrefix.length > 0 && rules.some((rule) => JSON.stringify(rule.prefix) === newKey);
	const overlapping = newPrefix.length > 0 && rules.some((rule) => JSON.stringify(rule.prefix) !== newKey && commandPrefixesOverlap(rule.prefix, newPrefix));
	const updateRule = (0, import_react$18.useCallback)((id, patch) => {
		if (managed) return;
		updateOrderedRules("command", rules.map((rule) => rule.id === id ? {
			...rule,
			...patch,
			source: "user"
		} : rule), "update");
	}, [
		managed,
		rules,
		updateOrderedRules
	]);
	const isCommandRulesDefault = !orderedRules.command.customized;
	const resetCategoryLabel = t("settings.securityCenter.policies.command");
	const labels = {
		delete: t("common.delete"),
		drag: t("settings.securityCenter.ordered.drag"),
		empty: t("settings.securityCenter.ordered.empty"),
		enterprise: t("settings.securityCenter.ordered.enterprise"),
		preset: t("settings.securityCenter.ordered.preset"),
		priorityHint: t("settings.securityCenter.ordered.priorityHint"),
		user: t("settings.securityCenter.ordered.user")
	};
	const addProgram = (0, import_react$18.useCallback)(() => {
		if (managed || !normalizedProgram || isDuplicateProgram) return;
		updateProgramBlacklist([...programBlacklist, normalizedProgram], { program: { added: [normalizedProgram] } });
		setNewProgram("");
	}, [
		isDuplicateProgram,
		managed,
		normalizedProgram,
		programBlacklist,
		updateProgramBlacklist
	]);
	const removeProgram = (0, import_react$18.useCallback)((program) => {
		if (managed) return;
		updateProgramBlacklist(programBlacklist.filter((item) => item !== program), { program: { removed: [program] } });
	}, [
		managed,
		programBlacklist,
		updateProgramBlacklist
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage",
		children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "security-center-panel__grid",
			children: [
				managed && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
					className: "security-center-panel__managed-banner",
					role: "status",
					children: t("settings.securityCenter.managedBanner")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("section", {
					className: "security-center-panel__card security-center-panel__card--wide security-center-panel__card--compact security-center-panel__card--command-hint",
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						className: "security-center-panel__card-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("h3", { children: t("settings.securityCenter.detail.commandHintTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", { children: t("settings.securityCenter.detail.commandHintDesc") })] }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ResetRulesButton, {
							buttonLabel: t("settings.securityCenter.detail.resetDefault"),
							cancelLabel: t("common.cancel"),
							confirmLabel: t("settings.securityCenter.detail.resetDefault"),
							description: t("settings.securityCenter.detail.resetConfirmDesc", { category: resetCategoryLabel }),
							disabled: managed || isCommandRulesDefault,
							disabledHint: t(managed ? "settings.securityCenter.detail.resetDefaultManagedHint" : "settings.securityCenter.detail.resetDefaultDisabledHint"),
							title: t("settings.securityCenter.detail.resetConfirmTitle", { category: resetCategoryLabel }),
							onConfirm: () => resetOrderedRules("command")
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(RuleListSection, {
					addValue: newProgram,
					addError: programInputError,
					canAdd: canAddProgram,
					addLabel: t("common.add"),
					deleteLabel: t("common.delete"),
					disabled: managed,
					rowIcon: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Keyboard, {}),
					onAdd: addProgram,
					onChange: setNewProgram,
					onRemove: removeProgram,
					placeholder: t(isWindows ? "settings.securityCenter.detail.programBlacklistPlaceholderWindows" : "settings.securityCenter.detail.programBlacklistPlaceholder"),
					items: programBlacklist,
					getKey: (program) => program,
					getLabel: (program) => program,
					tone: "block",
					title: t("settings.securityCenter.detail.programBlacklistTitle"),
					desc: t(isWindows ? "settings.securityCenter.detail.programBlacklistDescWindows" : "settings.securityCenter.detail.programBlacklistDesc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("section", {
					className: "security-center-panel__card security-center-panel__card--wide",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
							className: "security-center-panel__card-heading",
							children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("h3", { children: [t("settings.securityCenter.ordered.commandTitle"), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Tooltip, {
								content: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { children: t(isWindows ? "settings.securityCenter.ordered.commandInputTipWindows" : "settings.securityCenter.ordered.commandInputTip").split("\n").map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { children: line }, `${index}-${line}`)) }),
								placement: "top",
								maxWidth: 440,
								children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
									className: "security-center-panel__help-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(WbInfoIcon, {})
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", { children: t("settings.securityCenter.ordered.commandDesc") })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("form", {
							className: "security-center-panel__ordered-rule-add",
							onSubmit: (event) => {
								event.preventDefault();
								if (managed || newPrefix.length === 0 || duplicate) return;
								updateOrderedRules("command", [{
									id: createCommandRuleId(),
									source: "user",
									prefix: newPrefix,
									action: newAction
								}, ...rules], "add");
								setNewCommand("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Input, {
								className: "security-center-panel__ordered-rule-input",
								size: "medium",
								value: newCommand,
								disabled: managed,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(FolderToolIcon, { "aria-hidden": "true" }),
								placeholder: t("settings.securityCenter.detail.commandPlaceholder"),
								onChange: (event) => setNewCommand(event.currentTarget.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
								size: "medium",
								variant: "secondary",
								type: "submit",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(AddIcon, {}),
								disabled: managed || newPrefix.length === 0 || duplicate,
								children: t("common.add")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
							className: "security-center-panel__ordered-rule-defaults",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: t("settings.securityCenter.ordered.defaultAction") }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(OrderedRuleActionSelect, {
								disabled: managed,
								value: newAction,
								onChange: setNewAction
							})]
						}),
						duplicate && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.duplicate")
						}),
						!duplicate && overlapping && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.overlapWarning")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(OrderedRuleList, {
							disabled: managed,
							items: rules,
							labels,
							onDelete: (rule) => updateOrderedRules("command", rules.filter((item) => item.id !== rule.id), "delete"),
							onReorder: (next) => updateOrderedRules("command", next, "reorder"),
							renderMatcher: (rule) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
								title: rule.reason ?? rule.prefix.join(" "),
								children: rule.prefix.join(" ")
							}),
							renderPolicy: (rule) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(OrderedRuleActionSelect, {
								disabled: managed,
								value: rule.action,
								onChange: (action) => updateRule(rule.id, { action })
							})
						})
					]
				})
			]
		})
	});
}
var import_react$18, import_jsx_runtime$13;
var init_CommandDetail = __esmMin((() => {
	init_src();
	init_lucide_react();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_useSecurityCenter();
	init_ordered_rule_action_select();
	init_ordered_rule_list();
	init_ResetRulesButton();
	init_RuleListSection();
	init_command_rule_utils();
	init_program_blacklist_input();
	import_jsx_runtime$13 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/file-rule-utils.ts
function normalizePosixPath(value) {
	const absolute = value.startsWith("/");
	const trailingSlash = value.endsWith("/");
	const segments = [];
	for (const segment of value.split("/")) {
		if (!segment || segment === ".") continue;
		if (segment === "..") {
			if (segments.length > 0 && segments[segments.length - 1] !== "..") segments.pop();
			else if (!absolute) segments.push(segment);
			continue;
		}
		segments.push(segment);
	}
	let normalized = `${absolute ? "/" : ""}${segments.join("/")}`;
	if (!normalized) normalized = absolute ? "/" : ".";
	if (trailingSlash && normalized !== "/" && !normalized.endsWith("/")) normalized += "/";
	return normalized;
}
function normalizeFileRuleMatcher(value, isWindows) {
	const tildeNormalized = value.replace(/^[\uFF5E\u301C]/, "~");
	const hasWildcard = tildeNormalized.endsWith("*");
	const withoutWildcard = hasWildcard ? tildeNormalized.slice(0, -1) : tildeNormalized;
	const hadTrailingSlash = !hasWildcard && /[/\\]$/.test(withoutWildcard);
	let normalized = normalizePosixPath(withoutWildcard.replace(/\\/g, "/"));
	if (hadTrailingSlash && !normalized.endsWith("/")) normalized += "/";
	const matcher = hasWildcard ? `${normalized}*` : normalized;
	return isWindows ? matcher.toLowerCase() : matcher;
}
function fileRuleMatchersEqual(left, right, isWindows) {
	return normalizeFileRuleMatcher(left, isWindows) === normalizeFileRuleMatcher(right, isWindows);
}
function overlapPrefix(value) {
	if (value.endsWith("*") || value.endsWith("/")) return value.slice(0, -1);
	return value;
}
function fileRulePatternsOverlap(left, right, isWindows) {
	const normalizedA = normalizeFileRuleMatcher(left, isWindows);
	const normalizedB = normalizeFileRuleMatcher(right, isWindows);
	const a = overlapPrefix(normalizedA);
	const b = overlapPrefix(normalizedB);
	if (normalizedA.endsWith("*") || normalizedB.endsWith("*")) return Boolean(a && b && (a.startsWith(b) || b.startsWith(a)));
	return Boolean(a && b && (a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`)));
}
function createFileRuleId() {
	return createOrderedRuleId("file");
}
var init_file_rule_utils = __esmMin((() => {
	init_ordered_rule_id();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/FileDetail.tsx
function FileDetail() {
	const t = useTranslation();
	const { managed, orderedRules, resetOrderedRules, updateOrderedRules } = useSecurityCenter();
	const rules = orderedRules.file.rules;
	const [newPath, setNewPath] = (0, import_react$17.useState)("");
	const [newRead, setNewRead] = (0, import_react$17.useState)("ask");
	const [newWrite, setNewWrite] = (0, import_react$17.useState)("ask");
	const [newDelete, setNewDelete] = (0, import_react$17.useState)("ask");
	const isWindows = isHostWindows();
	const normalizedPath = normalizePathInput(newPath);
	const duplicatePath = Boolean(normalizedPath) && rules.some((rule) => fileRuleMatchersEqual(rule.path, normalizedPath, isWindows));
	const overlappingPath = Boolean(normalizedPath) && rules.some((rule) => rule.path !== normalizedPath && fileRulePatternsOverlap(rule.path, normalizedPath, isWindows));
	const operationIcon = (operation) => {
		if (operation === "read") return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ViewedToolIcon, { "aria-hidden": "true" });
		if (operation === "write") return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(EditToolIcon, { "aria-hidden": "true" });
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DeleteIcon, { "aria-hidden": "true" });
	};
	const permissionStatus = (action) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Tag, {
		appearance: "plain",
		size: "small",
		tone: action === "allow" ? "success" : action === "ask" ? "warning" : "error",
		dot: true,
		children: t(`settings.securityCenter.ordered.${action}`)
	});
	const permissionOptions = (operation) => [
		"allow",
		"ask",
		"deny"
	].map((action) => ({
		value: action,
		label: permissionStatus(action),
		triggerLabel: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("span", {
			className: "security-center-panel__file-permission-option",
			children: [
				operationIcon(operation),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { children: t(`settings.securityCenter.ordered.${operation}`) }),
				permissionStatus(action)
			]
		})
	}));
	const isFileRulesDefault = !orderedRules.file.customized;
	const resetCategoryLabel = t("settings.securityCenter.policies.file");
	const updateRule = (0, import_react$17.useCallback)((id, patch) => {
		if (managed) return;
		updateOrderedRules("file", rules.map((rule) => rule.id === id ? {
			...rule,
			...patch,
			source: "user"
		} : rule), "update");
	}, [
		managed,
		rules,
		updateOrderedRules
	]);
	const permissionSelect = (operation, value, onChange) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Select, {
		size: "small",
		shape: "rounded",
		disabled: managed,
		options: permissionOptions(operation),
		value,
		onChange: (next) => onChange(next)
	});
	const actionSelect = (rule, operation) => permissionSelect(operation, rule[operation], (action) => updateRule(rule.id, { [operation]: action }));
	const labels = {
		delete: t("common.delete"),
		drag: t("settings.securityCenter.ordered.drag"),
		empty: t("settings.securityCenter.ordered.empty"),
		enterprise: t("settings.securityCenter.ordered.enterprise"),
		preset: t("settings.securityCenter.ordered.preset"),
		priorityHint: t("settings.securityCenter.ordered.priorityHint"),
		user: t("settings.securityCenter.ordered.user")
	};
	const pathPlaceholder = isWindows ? t("settings.securityCenter.detail.pathPlaceholderWindows") : t("settings.securityCenter.detail.pathPlaceholder");
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage",
		children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "security-center-panel__grid",
			children: [
				managed && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "security-center-panel__managed-banner",
					role: "status",
					children: t("settings.securityCenter.managedBanner")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("section", {
					className: "security-center-panel__card security-center-panel__card--wide security-center-panel__card--compact security-center-panel__card--file-hint",
					children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
						className: "security-center-panel__card-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h3", { children: t("settings.securityCenter.detail.fileHintTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: t("settings.securityCenter.detail.fileHintDesc") })] }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ResetRulesButton, {
							buttonLabel: t("settings.securityCenter.detail.resetDefault"),
							cancelLabel: t("common.cancel"),
							confirmLabel: t("settings.securityCenter.detail.resetDefault"),
							description: t("settings.securityCenter.detail.resetConfirmDesc", { category: resetCategoryLabel }),
							disabled: managed || isFileRulesDefault,
							disabledHint: t(managed ? "settings.securityCenter.detail.resetDefaultManagedHint" : "settings.securityCenter.detail.resetDefaultDisabledHint"),
							title: t("settings.securityCenter.detail.resetConfirmTitle", { category: resetCategoryLabel }),
							onConfirm: () => resetOrderedRules("file")
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("section", {
					className: "security-center-panel__card security-center-panel__card--wide",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "security-center-panel__card-heading",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("h3", { children: [t("settings.securityCenter.ordered.fileTitle"), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Tooltip, {
								content: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", { children: t(isWindows ? "settings.securityCenter.ordered.fileInputTipWindows" : "settings.securityCenter.ordered.fileInputTip").split("\n").map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", { children: line }, `${index}-${line}`)) }),
								placement: "top",
								maxWidth: 440,
								children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
									className: "security-center-panel__help-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(WbInfoIcon, {})
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: t("settings.securityCenter.ordered.fileDesc") })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("form", {
							className: "security-center-panel__ordered-rule-add",
							onSubmit: (event) => {
								event.preventDefault();
								if (managed || !normalizedPath || duplicatePath) return;
								updateOrderedRules("file", [{
									id: createFileRuleId(),
									source: "user",
									path: normalizedPath,
									read: newRead,
									write: newWrite,
									delete: newDelete
								}, ...rules], "add");
								setNewPath("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Input, {
								className: "security-center-panel__ordered-rule-input",
								size: "medium",
								value: newPath,
								disabled: managed,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(FolderToolIcon, { "aria-hidden": "true" }),
								placeholder: pathPlaceholder,
								onChange: (event) => setNewPath(event.currentTarget.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Button, {
								size: "medium",
								variant: "secondary",
								type: "submit",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AddIcon, {}),
								disabled: managed || !normalizedPath || duplicatePath,
								children: t("common.add")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
							className: "security-center-panel__ordered-rule-defaults security-center-panel__ordered-rule-defaults--file",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { children: t("inputFooter.permission.label") }),
								permissionSelect("read", newRead, setNewRead),
								permissionSelect("write", newWrite, setNewWrite),
								permissionSelect("delete", newDelete, setNewDelete)
							]
						}),
						duplicatePath && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.duplicate")
						}),
						!duplicatePath && overlappingPath && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.overlapWarning")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "security-center-panel__ordered-rules--file",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(OrderedRuleList, {
								disabled: managed,
								items: rules,
								labels,
								onDelete: (rule) => updateOrderedRules("file", rules.filter((item) => item.id !== rule.id), "delete"),
								onReorder: (next) => updateOrderedRules("file", next, "reorder"),
								renderMatcher: (rule) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
									title: rule.path,
									children: formatPathForDisplay(rule.path, isWindows)
								}),
								renderPolicy: (rule) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
									className: "security-center-panel__ordered-rule-file-policy",
									children: [
										actionSelect(rule, "read"),
										actionSelect(rule, "write"),
										actionSelect(rule, "delete")
									]
								})
							})
						})
					]
				})
			]
		})
	});
}
var import_react$17, import_jsx_runtime$12;
var init_FileDetail = __esmMin((() => {
	init_src();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_path_display();
	init_useSecurityCenter();
	init_ordered_rule_list();
	init_ResetRulesButton();
	init_file_rule_utils();
	import_jsx_runtime$12 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/http-intercept-policy-select.tsx
function HttpInterceptPolicySelect({ disabled, value, onChange }) {
	const t = useTranslation();
	const options = [
		{
			value: "deny",
			label: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Tag, {
				appearance: "plain",
				size: "small",
				tone: "error",
				dot: true,
				children: t("settings.securityCenter.detail.httpInterceptOption.deny")
			})
		},
		{
			value: "ask",
			label: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Tag, {
				appearance: "plain",
				size: "small",
				tone: "warning",
				dot: true,
				children: t("settings.securityCenter.detail.httpInterceptOption.ask")
			})
		},
		{
			value: "allow",
			label: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Tag, {
				appearance: "plain",
				size: "small",
				tone: "success",
				dot: true,
				children: t("settings.securityCenter.detail.httpInterceptOption.allow")
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Select, {
		size: "small",
		shape: "rounded",
		disabled,
		options,
		value,
		onChange: (next) => onChange(next)
	});
}
var import_jsx_runtime$11;
var init_http_intercept_policy_select = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$11 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/shared/malicious-domain-protection-state.ts
/**
* 本宿主上恶意域名防护有没有拦截点。
*
* 判据要与 agent-cli 的 `isSandboxCLIPlatformSupported()` 对齐：三个 desktop 平台都在
* LocalProxy 的 `access_control.decide` 里做域名层判定（Linux 自 sandbox-cli
* 5.4.0-beta.17 起接入，由 WorkBuddy 注入 `WORKBUDDY_ENABLE_LINUX_SANDBOX_CLI` 放量）。
*
* 反过来，浏览器 / IDE webview 里 preload 不注入 `__hostPlatform`，三个判定全假——那里
* 没有 sandbox-cli，也就没有拦截点。这正是本函数存在的意义，别简化成常量 true。
*
* 眼下与同面板 `supportsFileBackup` 的取值恰好相同（都是 desktop 三平台），但两者判的是
* 不同能力——文件备份看备份实现，这里看域名层拦截点。别因为当前相等就合并成一个变量，
* 任一侧的平台支持度变化都会让它们再次分叉。
*/
function hasMaliciousDomainInterceptionPoint() {
	return isHostWindows() || isHostMac() || isHostLinux();
}
/**
* 把「用户意愿」折算成「界面该显示什么」。
*
* 意愿存在 settings.json，实际是否拦截还取决于平台有拦截能力、沙箱开着、且域名库能加载。
* 四者任一不成立就一条都拦不住，此时开关必须显示为关——否则用户在毫无防护的状态下看到一个
* 绿色开关，会误以为自己是安全的。偏好本身不被改写，条件恢复后自动回到用户存的值。
*
* 平台这条尤其不能省。库的下载不分平台，`threatDatabaseAvailable` 在没有拦截点的宿主上同样
* 为真，而 agent-cli 侧被 `isSandboxCLIPlatformSupported()` 挡在门外：Bash 不走沙箱、没有
* 拦截点，WebFetch 的查询也直接降级。少了这条，用户默认就会看到一个绿色开关配零拦截，且不像
* 同步失败那样有冷却重试兜底——它是默认态，永久不自愈。
*/
function resolveMaliciousDomainProtectionState(inputs) {
	const { sandboxEnabled, platformSupported, threatDatabaseAvailable, preference } = inputs;
	const interceptable = platformSupported && sandboxEnabled;
	return {
		enabled: interceptable && threatDatabaseAvailable && preference,
		showUnavailableHint: interceptable && !threatDatabaseAvailable && preference
	};
}
var init_malicious_domain_protection_state = __esmMin((() => {
	init_path_display();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/network-rule-utils.ts
function normalizeDomainPattern(value) {
	return value.trim().toLowerCase();
}
function isValidDomainPattern(value) {
	const domain = normalizeDomainPattern(value);
	if (domain === "*") return true;
	const wildcard = domain.startsWith("*.");
	const host = wildcard ? domain.slice(2) : domain;
	if (!host || host.includes("*")) return false;
	if (host.startsWith("[") || host.endsWith("]")) {
		if (wildcard || !host.startsWith("[") || !host.endsWith("]")) return false;
		try {
			return new URL(`http://${host}`).hostname === host;
		} catch {
			return false;
		}
	}
	try {
		return new URL(`http://${host}`).hostname === host;
	} catch {
		return false;
	}
}
function wildcardSuffix(pattern) {
	if (pattern === "*") return "";
	return pattern.startsWith("*.") ? pattern.slice(2) : void 0;
}
function wildcardMatches(pattern, domain) {
	const suffix = wildcardSuffix(pattern);
	return suffix !== void 0 && (suffix === "" || domain === suffix || domain.endsWith(`.${suffix}`));
}
function domainPatternsOverlap(left, right) {
	const a = normalizeDomainPattern(left);
	const b = normalizeDomainPattern(right);
	if (!a || !b) return false;
	if (a === b || wildcardMatches(a, b) || wildcardMatches(b, a)) return true;
	const aSuffix = wildcardSuffix(a);
	const bSuffix = wildcardSuffix(b);
	return aSuffix !== void 0 && bSuffix !== void 0 && (aSuffix.endsWith(`.${bSuffix}`) || bSuffix.endsWith(`.${aSuffix}`));
}
function createNetworkRuleId() {
	return createOrderedRuleId("network");
}
var init_network_rule_utils = __esmMin((() => {
	init_ordered_rule_id();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/NetworkDetail.tsx
function NetworkDetail() {
	const t = useTranslation();
	const { defaultSandboxRules, managed, orderedRules, resetOrderedRules, sandboxEnabled, sandboxRules, threatDatabaseAvailable, updateOrderedRules, updateSandboxEnabled, updateSandboxRules } = useSecurityCenter();
	const { enabled: maliciousDomainProtectionEnabled, showUnavailableHint: showThreatDatabaseUnavailable } = resolveMaliciousDomainProtectionState({
		sandboxEnabled,
		platformSupported: hasMaliciousDomainInterceptionPoint(),
		threatDatabaseAvailable,
		preference: sandboxRules.maliciousDomainProtectionEnabled ?? defaultSandboxRules.maliciousDomainProtectionEnabled
	});
	const rules = orderedRules.network.rules;
	const isNetworkRulesDefault = !orderedRules.network.customized;
	const resetCategoryLabel = t("settings.securityCenter.policies.network");
	const [newDomain, setNewDomain] = (0, import_react$15.useState)("");
	const [newAction, setNewAction] = (0, import_react$15.useState)("ask");
	const normalizedDomain = normalizeDomainPattern(newDomain);
	const validDomain = isValidDomainPattern(normalizedDomain);
	const duplicate = Boolean(normalizedDomain) && rules.some((rule) => rule.domain === normalizedDomain);
	const overlapping = validDomain && rules.some((rule) => rule.domain !== normalizedDomain && domainPatternsOverlap(rule.domain, normalizedDomain));
	const updateRule = (0, import_react$15.useCallback)((id, patch) => {
		if (managed) return;
		updateOrderedRules("network", rules.map((rule) => rule.id === id ? {
			...rule,
			...patch,
			source: "user"
		} : rule), "update");
	}, [
		managed,
		rules,
		updateOrderedRules
	]);
	const saveRulesPartial = (0, import_react$15.useCallback)((partial, auditAction, delta) => {
		updateSandboxRules({
			...sandboxRules,
			...partial
		}, auditAction, delta);
	}, [sandboxRules, updateSandboxRules]);
	const updateMaliciousDomainProtection = (0, import_react$15.useCallback)((enabled) => {
		if (managed) return;
		if (enabled && !sandboxEnabled) updateSandboxEnabled(true);
		saveRulesPartial({ maliciousDomainProtectionEnabled: enabled }, "maliciousDomainProtection", { network: { maliciousDomainProtectionEnabled: enabled } });
	}, [
		managed,
		sandboxEnabled,
		saveRulesPartial,
		updateSandboxEnabled
	]);
	const httpIntercept = sandboxRules.httpIntercept ?? defaultSandboxRules.httpIntercept ?? DEFAULT_HTTP_INTERCEPT_CONFIG;
	const updateHttpIntercept = (0, import_react$15.useCallback)((scope, policy) => {
		if (managed) return;
		if (sandboxEnabled === false) updateSandboxEnabled(true);
		const nextHttpIntercept = {
			...httpIntercept,
			[scope]: policy
		};
		saveRulesPartial({ httpIntercept: nextHttpIntercept }, "httpIntercept", { httpIntercept: nextHttpIntercept });
	}, [
		httpIntercept,
		managed,
		sandboxEnabled,
		saveRulesPartial,
		updateSandboxEnabled
	]);
	const labels = {
		delete: t("common.delete"),
		drag: t("settings.securityCenter.ordered.drag"),
		empty: t("settings.securityCenter.ordered.empty"),
		enterprise: t("settings.securityCenter.ordered.enterprise"),
		preset: t("settings.securityCenter.ordered.preset"),
		priorityHint: t("settings.securityCenter.ordered.priorityHint"),
		user: t("settings.securityCenter.ordered.user")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "security-center-panel__grid",
			children: [
				managed && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "security-center-panel__managed-banner",
					role: "status",
					children: t("settings.securityCenter.managedBanner")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("section", {
					className: "security-center-panel__card security-center-panel__card--wide security-center-panel__card--compact",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "security-center-panel__card-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h3", { children: t("settings.securityCenter.detail.maliciousDomainProtectionTitle") }),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", { children: t("settings.securityCenter.detail.maliciousDomainProtectionDesc") }),
							showThreatDatabaseUnavailable && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: "security-center-panel__degraded-hint",
								"data-testid": "malicious-domain-protection-unavailable",
								children: t("settings.securityCenter.detail.maliciousDomainProtectionUnavailable")
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
							className: "security-center-panel__section-action security-center-panel__switch-appearance",
							"data-testid": "malicious-domain-protection-switch",
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Switch, {
								checked: maliciousDomainProtectionEnabled,
								onChange: (event) => updateMaliciousDomainProtection(event.currentTarget.checked),
								size: "large",
								disabled: managed
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("section", {
					className: "security-center-panel__card security-center-panel__card--wide security-center-panel__card--compact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "security-center-panel__card-heading",
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h3", { children: t("settings.securityCenter.detail.httpInterceptTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", { children: t("settings.securityCenter.detail.httpInterceptDesc") })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "security-center-panel__http-intercept-rows",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
							className: "security-center-panel__http-intercept-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: "security-center-panel__http-intercept-label",
								children: t("settings.securityCenter.detail.httpInterceptRemoteLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(HttpInterceptPolicySelect, {
								disabled: managed,
								value: httpIntercept.remote,
								onChange: (policy) => updateHttpIntercept("remote", policy)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
							className: "security-center-panel__http-intercept-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: "security-center-panel__http-intercept-label",
								children: t("settings.securityCenter.detail.httpInterceptLocalLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(HttpInterceptPolicySelect, {
								disabled: managed,
								value: httpIntercept.local,
								onChange: (policy) => updateHttpIntercept("local", policy)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("section", {
					className: "security-center-panel__card security-center-panel__card--wide security-center-panel__card--compact",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "security-center-panel__card-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h3", { children: t("settings.securityCenter.detail.networkHintTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", { children: t("settings.securityCenter.detail.networkHintDesc") })] }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ResetRulesButton, {
							buttonLabel: t("settings.securityCenter.detail.resetDefault"),
							cancelLabel: t("common.cancel"),
							confirmLabel: t("settings.securityCenter.detail.resetDefault"),
							description: t("settings.securityCenter.detail.resetConfirmDesc", { category: resetCategoryLabel }),
							disabled: managed || isNetworkRulesDefault,
							disabledHint: t(managed ? "settings.securityCenter.detail.resetDefaultManagedHint" : "settings.securityCenter.detail.resetDefaultDisabledHint"),
							title: t("settings.securityCenter.detail.resetConfirmTitle", { category: resetCategoryLabel }),
							onConfirm: () => resetOrderedRules("network")
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("section", {
					className: "security-center-panel__card security-center-panel__card--wide",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
							className: "security-center-panel__card-heading",
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("h3", { children: [t("settings.securityCenter.ordered.networkTitle"), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Tooltip, {
								content: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", { children: t("settings.securityCenter.ordered.networkInputTip").split("\n").map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", { children: line }, `${index}-${line}`)) }),
								placement: "top",
								maxWidth: 440,
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
									className: "security-center-panel__help-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(WbInfoIcon, {})
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", { children: t("settings.securityCenter.ordered.networkDesc") })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("form", {
							className: "security-center-panel__ordered-rule-add",
							onSubmit: (event) => {
								event.preventDefault();
								if (managed || !validDomain || duplicate) return;
								updateOrderedRules("network", [{
									id: createNetworkRuleId(),
									source: "user",
									domain: normalizedDomain,
									action: newAction
								}, ...rules], "add");
								setNewDomain("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Input, {
								className: "security-center-panel__ordered-rule-input",
								size: "medium",
								value: newDomain,
								disabled: managed,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(FolderToolIcon, { "aria-hidden": "true" }),
								placeholder: t("settings.securityCenter.detail.domainPlaceholder"),
								onChange: (event) => setNewDomain(event.currentTarget.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Button, {
								size: "medium",
								variant: "secondary",
								type: "submit",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AddIcon, {}),
								disabled: managed || !validDomain || duplicate,
								children: t("common.add")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
							className: "security-center-panel__ordered-rule-defaults",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: t("settings.securityCenter.ordered.defaultAction") }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(OrderedRuleActionSelect, {
								disabled: managed,
								value: newAction,
								onChange: setNewAction
							})]
						}),
						normalizedDomain && !validDomain && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.invalidNetworkMatcher")
						}),
						duplicate && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.duplicate")
						}),
						validDomain && !duplicate && overlapping && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
							className: "security-center-panel__ordered-rule-warning",
							children: t("settings.securityCenter.ordered.overlapWarning")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(OrderedRuleList, {
							disabled: managed,
							items: rules,
							labels,
							onDelete: (rule) => updateOrderedRules("network", rules.filter((item) => item.id !== rule.id), "delete"),
							onReorder: (next) => updateOrderedRules("network", next, "reorder"),
							renderMatcher: (rule) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								title: rule.domain,
								children: rule.domain
							}),
							renderPolicy: (rule) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(OrderedRuleActionSelect, {
								disabled: managed,
								value: rule.action,
								onChange: (action) => updateRule(rule.id, { action })
							})
						})
					]
				})
			]
		})
	});
}
var import_react$15, import_jsx_runtime$10;
var init_NetworkDetail = __esmMin((() => {
	init_src();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_useSecurityCenter();
	init_http_intercept_policy_select();
	init_malicious_domain_protection_state();
	init_ordered_rule_action_select();
	init_ordered_rule_list();
	init_ResetRulesButton();
	init_network_rule_utils();
	import_jsx_runtime$10 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-detail.less
var init_sensitive_protection_detail$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/hooks/use-exclusive-action.ts
function useExclusiveAction() {
	const [pending, setPending] = (0, import_react$14.useState)(false);
	const pendingRef = (0, import_react$14.useRef)(false);
	return {
		pending,
		runExclusive: (0, import_react$14.useCallback)(async (action) => {
			if (pendingRef.current) return false;
			pendingRef.current = true;
			setPending(true);
			try {
				await action();
				return true;
			} finally {
				pendingRef.current = false;
				setPending(false);
			}
		}, [])
	};
}
var import_react$14;
var init_use_exclusive_action = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/hooks/use-paged-sensitive-protection.ts
function usePagedSensitiveProtection({ loadPage, onError, pageSize }) {
	const requestSequence = (0, import_react$13.useRef)(0);
	const [offset, setOffset] = (0, import_react$13.useState)(0);
	const [page, setPage] = (0, import_react$13.useState)(EMPTY_PAGE);
	const [hasLoaded, setHasLoaded] = (0, import_react$13.useState)(false);
	const [loading, setLoading] = (0, import_react$13.useState)(true);
	const [refreshSequence, setRefreshSequence] = (0, import_react$13.useState)(0);
	const refresh = (0, import_react$13.useCallback)(() => {
		setRefreshSequence((value) => value + 1);
	}, []);
	const goToFirstPage = (0, import_react$13.useCallback)(() => {
		if (offset === 0) {
			refresh();
			return;
		}
		setOffset(0);
	}, [offset, refresh]);
	(0, import_react$13.useEffect)(() => {
		const request = requestSequence.current += 1;
		setLoading(true);
		loadPage(offset, pageSize).then((nextPage) => {
			if (request !== requestSequence.current) return;
			if (nextPage.items.length === 0 && offset > 0 && nextPage.total < offset + 1) {
				const lastOffset = nextPage.total === 0 ? 0 : Math.floor((nextPage.total - 1) / pageSize) * pageSize;
				setOffset(lastOffset);
				return;
			}
			setPage(nextPage);
			setHasLoaded(true);
		}).catch((error) => {
			if (request === requestSequence.current) onError(error);
		}).finally(() => {
			if (request === requestSequence.current) setLoading(false);
		});
	}, [
		loadPage,
		offset,
		onError,
		pageSize,
		refreshSequence
	]);
	return {
		goToFirstPage,
		hasLoaded,
		loading,
		offset,
		page,
		refresh,
		setOffset
	};
}
var import_react$13, EMPTY_PAGE;
var init_use_paged_sensitive_protection = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	EMPTY_PAGE = {
		hasMore: false,
		items: [],
		offset: 0,
		total: 0
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/hooks/use-sensitive-protection-api.ts
function rejectUnavailable() {
	return Promise.reject(/* @__PURE__ */ new Error("[useSensitiveProtectionApi] providers.services.securityCenter is not initialized."));
}
function useSensitiveProtectionApi() {
	const securityCenter = useAgentServices()?.securityCenter;
	const queryRules = (0, import_react$12.useCallback)((query) => securityCenter?.querySensitiveProtectionRules(query) ?? rejectUnavailable(), [securityCenter]);
	const queryEntries = (0, import_react$12.useCallback)((query) => securityCenter?.querySensitiveProtectionEntries(query) ?? rejectUnavailable(), [securityCenter]);
	return {
		executeMutation: (0, import_react$12.useCallback)((mutation) => securityCenter?.executeSensitiveProtectionMutation(mutation) ?? rejectUnavailable(), [securityCenter]),
		queryEntries,
		queryRules
	};
}
var import_react$12;
var init_use_sensitive_protection_api = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_app_providers();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-entry-details-button.tsx
function SensitiveProtectionEntryDetailsModal({ entry, open, onOpenChange }) {
	const t = useTranslation();
	const fieldId = (0, import_react$11.useId)();
	const isDetectionOnly = entry?.supportsEncryption === false;
	const detectionOnlyDescription = t("settings.securityCenter.sensitiveProtection.data.detectionOnlyDescription");
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Modal, {
		className: "sensitive-protection-entry-modal",
		open: open && entry !== void 0,
		onOpenChange,
		title: t("settings.securityCenter.sensitiveProtection.data.details.title"),
		width: 520,
		footer: null,
		children: entry ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "sensitive-protection-detail__editor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("label", {
					htmlFor: `${fieldId}-name`,
					children: t("settings.securityCenter.sensitiveProtection.data.details.nameLabel")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Input, {
					id: `${fieldId}-name`,
					value: entry.name?.trim() ? entry.name : entry.supportsEncryption === false ? t("settings.securityCenter.sensitiveProtection.data.detectionOnly") : entry.cipher,
					readOnly: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("label", { children: t("settings.securityCenter.sensitiveProtection.data.details.sourceLabel") }),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "sensitive-protection-detail__tags",
					children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Tag, {
						tone: "default",
						size: "small",
						children: t(entry.isByUser ? "settings.securityCenter.sensitiveProtection.data.source.user" : "settings.securityCenter.sensitiveProtection.data.source.auto")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("label", {
					htmlFor: `${fieldId}-plaintext`,
					children: t("settings.securityCenter.sensitiveProtection.data.plain")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Input.TextArea, {
					id: `${fieldId}-plaintext`,
					value: entry.plaintext,
					rows: 6,
					readOnly: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("label", {
					htmlFor: `${fieldId}-cipher`,
					children: isDetectionOnly ? t("settings.securityCenter.sensitiveProtection.data.detectionStatus") : t("settings.securityCenter.sensitiveProtection.data.cipher")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Input.TextArea, {
					id: `${fieldId}-cipher`,
					value: isDetectionOnly ? detectionOnlyDescription : entry.cipher,
					rows: 3,
					readOnly: true
				})
			]
		}) : null
	});
}
var import_react$11, import_jsx_runtime$9;
var init_sensitive_protection_entry_details_button = __esmMin((() => {
	init_src();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$9 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-pagination.tsx
function SensitiveProtectionPagination({ disabled, offset, onOffsetChange, pageSize, total }) {
	const t = useTranslation();
	if (total <= pageSize) return null;
	const currentPage = Math.floor(offset / pageSize) + 1;
	const pageCount = Math.max(1, Math.ceil(total / pageSize));
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "sensitive-protection-detail__pagination",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
				size: "small",
				variant: "ghost",
				disabled: disabled || offset === 0,
				onClick: () => onOffsetChange(Math.max(0, offset - pageSize)),
				children: t("settings.securityCenter.sensitiveProtection.pagination.previous")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: t("settings.securityCenter.sensitiveProtection.pagination.summary", {
				current: currentPage,
				total: pageCount
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Button, {
				size: "small",
				variant: "ghost",
				disabled: disabled || currentPage >= pageCount,
				onClick: () => onOffsetChange(offset + pageSize),
				children: t("settings.securityCenter.sensitiveProtection.pagination.next")
			})
		]
	});
}
var import_jsx_runtime$8;
var init_sensitive_protection_pagination = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$8 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-entry-page.tsx
function SensitiveProtectionEntryPage({ enabled }) {
	const t = useTranslation();
	const { executeMutation, queryEntries } = useSensitiveProtectionApi();
	const [entryNameDraft, setEntryNameDraft] = (0, import_react$9.useState)("");
	const [plainDraft, setPlainDraft] = (0, import_react$9.useState)("");
	const [searchValue, setSearchValue] = (0, import_react$9.useState)("");
	const [sourceFilter, setSourceFilter] = (0, import_react$9.useState)("all");
	const [addModalOpen, setAddModalOpen] = (0, import_react$9.useState)(false);
	const [previewStatus, setPreviewStatus] = (0, import_react$9.useState)("idle");
	const [viewingEntry, setViewingEntry] = (0, import_react$9.useState)();
	const [deletingEntry, setDeletingEntry] = (0, import_react$9.useState)();
	const previewRequestId = (0, import_react$9.useRef)(0);
	const { pending: saving, runExclusive } = useExclusiveAction();
	const debouncedSearch = useDebouncedValue(searchValue, SEARCH_DEBOUNCE_MS$1);
	const plaintextLength = Array.from(plainDraft).length;
	const plaintextTooShort = plaintextLength > 0 && plaintextLength < PLAINTEXT_MIN_LENGTH;
	const plaintextValid = plaintextLength >= PLAINTEXT_MIN_LENGTH && plaintextLength <= PLAINTEXT_MAX_LENGTH && !!plainDraft.trim();
	const reportError = (0, import_react$9.useCallback)((error) => {
		const fallback = t("settings.securityCenter.sensitiveProtection.managementFailed");
		message.error(error instanceof Error ? t("settings.securityCenter.sensitiveProtection.managementFailedWithReason", { error: error.message }) : fallback);
	}, [t]);
	const resetAddDraft = (0, import_react$9.useCallback)(() => {
		previewRequestId.current += 1;
		setEntryNameDraft("");
		setPlainDraft("");
		setPreviewStatus("idle");
	}, []);
	(0, import_react$9.useEffect)(() => {
		if (!addModalOpen || !plaintextValid) {
			previewRequestId.current += 1;
			setPreviewStatus("idle");
			return;
		}
		const requestId = ++previewRequestId.current;
		setPreviewStatus("idle");
		const timer = window.setTimeout(() => {
			executeMutation({
				type: "entry.preview",
				plaintext: plainDraft
			}).then((result) => {
				if (requestId !== previewRequestId.current) return;
				setPreviewStatus(result.status === "encryptable" ? "encryptable" : "detection-only");
			}).catch(() => {
				if (requestId === previewRequestId.current) setPreviewStatus("idle");
			});
		}, PREVIEW_DEBOUNCE_MS);
		return () => window.clearTimeout(timer);
	}, [
		addModalOpen,
		executeMutation,
		plainDraft,
		plaintextValid
	]);
	const { goToFirstPage, loading, offset, page, refresh, setOffset } = usePagedSensitiveProtection({
		loadPage: (0, import_react$9.useCallback)((offset, pageSize) => queryEntries({
			...debouncedSearch.trim() ? { query: debouncedSearch.trim() } : {},
			...sourceFilter === "all" ? {} : { isByUser: sourceFilter === "user" },
			offset,
			pageSize
		}), [
			debouncedSearch,
			queryEntries,
			sourceFilter
		]),
		onError: reportError,
		pageSize: PAGE_SIZE$1
	});
	(0, import_react$9.useEffect)(() => {
		setOffset(0);
	}, [debouncedSearch, setOffset]);
	const allFilterLabel = t("settings.securityCenter.sensitiveProtection.filters.all");
	const allSourceFilterLabel = t("settings.securityCenter.sensitiveProtection.filters.allSource");
	const sourceOptions = (0, import_react$9.useMemo)(() => [
		{
			label: allFilterLabel,
			value: "all"
		},
		{
			label: t("settings.securityCenter.sensitiveProtection.data.source.user"),
			value: "user"
		},
		{
			label: t("settings.securityCenter.sensitiveProtection.data.source.auto"),
			value: "auto"
		}
	], [allFilterLabel, t]);
	const sourceFilterLabel = sourceFilter === "all" ? allSourceFilterLabel : sourceOptions.find((option) => option.value === sourceFilter)?.label;
	const controlsDisabled = !enabled || loading || saving;
	const addSensitiveDataLabel = t("settings.securityCenter.sensitiveProtection.data.addButton");
	const previewPlaintext = "ops-abc123xyz";
	const previewCipher = "ops-3kQ9mZx7vNpLtBwAyTfR";
	const protectionNotice = t("settings.securityCenter.sensitiveProtection.data.protectionNotice");
	const detectionOnlyDescription = t("settings.securityCenter.sensitiveProtection.data.detectionOnlyDescription");
	const runMutation = (mutation, goFirst = false, successMessage) => runExclusive(async () => {
		await executeMutation(mutation);
		if (goFirst) goToFirstPage();
		else refresh();
		if (successMessage) message.success(successMessage);
	});
	const scheduleMutation = (mutation, goFirst = false, successMessage) => {
		runMutation(mutation, goFirst, successMessage).catch(reportError);
	};
	const deleteEntry = async () => {
		if (!deletingEntry || controlsDisabled) return false;
		try {
			await runMutation({
				type: "entry.delete",
				id: deletingEntry.id
			}, false, t("settings.securityCenter.sensitiveProtection.data.deleteSuccess"));
			setDeletingEntry(void 0);
			return true;
		} catch (error) {
			reportError(error);
			return false;
		}
	};
	const addSensitiveData = async () => {
		const name = entryNameDraft;
		const plaintext = plainDraft;
		if (!name.trim() || !plaintextValid || controlsDisabled) return false;
		try {
			return await runExclusive(async () => {
				if ((await executeMutation({
					type: "entry.add",
					name,
					plaintext
				})).status === "detection-only") message.warning(t("settings.securityCenter.sensitiveProtection.data.preview.detectionOnly"));
				resetAddDraft();
				goToFirstPage();
			});
		} catch (error) {
			reportError(error);
			return false;
		}
	};
	const submitAddSensitiveData = () => {
		addSensitiveData().then((success) => {
			if (success) setAddModalOpen(false);
		});
	};
	const openAddModal = () => {
		resetAddDraft();
		setAddModalOpen(true);
	};
	const handleAddModalOpenChange = (open) => {
		setAddModalOpen(open);
		if (!open) resetAddDraft();
	};
	const handlePlaintextChange = (value) => {
		const characters = Array.from(value);
		if (characters.length > PLAINTEXT_MAX_LENGTH) {
			setPlainDraft(characters.slice(0, PLAINTEXT_MAX_LENGTH).join(""));
			message.warning(t("settings.securityCenter.sensitiveProtection.data.plaintextMaxLength"));
			return;
		}
		setPlainDraft(value);
	};
	const previewDetectionOnly = previewStatus === "detection-only";
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "sensitive-protection-detail__entries-toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "sensitive-protection-detail__rules-filters",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Select, {
					value: sourceFilter,
					options: sourceOptions,
					displayLabel: sourceFilterLabel,
					disabled: saving,
					onChange: (value) => {
						setSourceFilter(value);
						setOffset(0);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Input.Search, {
					className: "sensitive-protection-detail__entries-search",
					value: searchValue,
					allowClear: true,
					placeholder: t("settings.securityCenter.sensitiveProtection.filters.dataPlaceholder"),
					onChange: (event) => setSearchValue(event.currentTarget.value)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
				className: "sensitive-protection-detail__entries-add-button",
				variant: "primary",
				size: "medium",
				disabled: controlsDisabled,
				onClick: openAddModal,
				children: addSensitiveDataLabel
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Card, {
			className: "sensitive-protection-detail__card sensitive-protection-detail__entries-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "sensitive-protection-detail__management-list sensitive-protection-detail__management-list--data",
				children: page.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "sensitive-protection-detail__empty",
					children: t(loading ? "settings.securityCenter.sensitiveProtection.loading" : "settings.securityCenter.sensitiveProtection.data.empty")
				}) : page.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "sensitive-protection-detail__data-row",
					role: "button",
					tabIndex: 0,
					onClick: () => setViewingEntry(item),
					onKeyDown: (event) => {
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							setViewingEntry(item);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: "sensitive-protection-detail__data-name",
							children: item.name?.trim() ? item.name : item.supportsEncryption === false ? t("settings.securityCenter.sensitiveProtection.data.detectionOnly") : item.cipher
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "sensitive-protection-detail__data-pair",
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Tag, {
								size: "small",
								children: t("settings.securityCenter.sensitiveProtection.data.pair", {
									label: t("settings.securityCenter.sensitiveProtection.data.plain"),
									value: item.plaintext
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "sensitive-protection-detail__data-pair",
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Tag, {
								size: "small",
								tone: "info",
								children: t("settings.securityCenter.sensitiveProtection.data.pair", {
									label: item.supportsEncryption === false ? t("settings.securityCenter.sensitiveProtection.data.detectionStatus") : t("settings.securityCenter.sensitiveProtection.data.cipher"),
									value: item.supportsEncryption === false ? detectionOnlyDescription : item.cipher
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "sensitive-protection-detail__row-actions",
							onClick: (event) => event.stopPropagation(),
							onKeyDown: (event) => event.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "sensitive-protection-detail__entry-actions",
								children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
									iconOnly: true,
									size: "small",
									variant: "ghost",
									danger: true,
									"aria-label": t("settings.securityCenter.sensitiveProtection.data.delete"),
									disabled: controlsDisabled,
									onClick: () => setDeletingEntry(item),
									children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(DeleteIcon, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
								size: "large",
								checked: item.enabled,
								disabled: controlsDisabled,
								onChange: (e) => scheduleMutation({
									type: "entry.update",
									id: item.id,
									enabled: e.target.checked
								})
							})]
						})
					]
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SensitiveProtectionPagination, {
				disabled: loading || saving,
				offset,
				onOffsetChange: setOffset,
				pageSize: PAGE_SIZE$1,
				total: page.total
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SensitiveProtectionEntryDetailsModal, {
			entry: viewingEntry,
			open: viewingEntry !== void 0,
			onOpenChange: (open) => {
				if (!open) setViewingEntry(void 0);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Modal, {
			className: "sensitive-protection-entry-delete-modal",
			open: deletingEntry !== void 0,
			onOpenChange: (open) => {
				if (!open) setDeletingEntry(void 0);
			},
			wrapClassName: "sensitive-protection-modal-overlay",
			title: t("settings.securityCenter.sensitiveProtection.data.deleteConfirmDialog.title"),
			width: 480,
			okText: t("settings.securityCenter.sensitiveProtection.data.deleteConfirmDialog.confirm"),
			cancelText: t("common.cancel"),
			okType: "danger",
			okButtonProps: { disabled: controlsDisabled },
			onOk: deleteEntry
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Modal, {
			className: "sensitive-protection-entry-modal",
			open: addModalOpen,
			onOpenChange: handleAddModalOpenChange,
			wrapClassName: "sensitive-protection-modal-overlay",
			title: addSensitiveDataLabel,
			width: 480,
			height: 575,
			okText: t("settings.securityCenter.sensitiveProtection.data.add"),
			cancelText: t("common.cancel"),
			okButtonProps: { disabled: controlsDisabled || !entryNameDraft.trim() || !plaintextValid },
			onOk: addSensitiveData,
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("form", {
				className: "sensitive-protection-detail__data-form",
				onSubmit: (event) => {
					event.preventDefault();
					submitAddSensitiveData();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "sensitive-protection-detail__protection-notice",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WbInfoIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: protectionNotice })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "sensitive-protection-detail__data-form-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("label", {
							htmlFor: "sensitive-protection-entry-name",
							children: t("settings.securityCenter.sensitiveProtection.data.entryNameLabel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Input, {
							id: "sensitive-protection-entry-name",
							value: entryNameDraft,
							disabled: controlsDisabled,
							placeholder: t("settings.securityCenter.sensitiveProtection.data.entryNamePlaceholder"),
							onChange: (event) => setEntryNameDraft(event.currentTarget.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "sensitive-protection-detail__data-form-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("label", {
							htmlFor: "sensitive-protection-entry-plaintext",
							children: t("settings.securityCenter.sensitiveProtection.data.plain")
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Input, {
							id: "sensitive-protection-entry-plaintext",
							value: plainDraft,
							disabled: controlsDisabled,
							placeholder: t("settings.securityCenter.sensitiveProtection.data.plainFormPlaceholder"),
							status: plaintextTooShort ? "error" : void 0,
							tips: plaintextTooShort ? t("settings.securityCenter.sensitiveProtection.data.plaintextMinLength") : "",
							onChange: (event) => handlePlaintextChange(event.currentTarget.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "sensitive-protection-detail__preview-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("label", { children: t("settings.securityCenter.sensitiveProtection.data.previewLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "sensitive-protection-detail__preview-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
								className: "sensitive-protection-detail__preview-user",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("settings.securityCenter.sensitiveProtection.data.preview.userPrefix") }),
									/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("strong", { children: previewPlaintext }),
									/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("settings.securityCenter.sensitiveProtection.data.preview.userSuffix") })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
								className: "sensitive-protection-detail__preview-assistant",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
									className: "sensitive-protection-detail__preview-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
										className: "sensitive-protection-detail__preview-logo",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ClawIconV2, { size: 20 })
									}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("strong", { children: "WorkBuddy" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", { children: [
									t("settings.securityCenter.sensitiveProtection.data.preview.assistantPrefix"),
									/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("strong", { children: previewCipher }),
									t("settings.securityCenter.sensitiveProtection.data.preview.assistantSuffix"),
									previewDetectionOnly ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "sensitive-protection-detail__preview-tip",
										children: t("settings.securityCenter.sensitiveProtection.data.preview.detectionOnly")
									}) : null
								] })]
							})]
						})]
					})
				]
			})
		})
	] });
}
var import_react$9, import_jsx_runtime$7, PAGE_SIZE$1, PREVIEW_DEBOUNCE_MS, SEARCH_DEBOUNCE_MS$1, PLAINTEXT_MIN_LENGTH, PLAINTEXT_MAX_LENGTH;
var init_sensitive_protection_entry_page = __esmMin((() => {
	init_src();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_use_debounced_value();
	init_useI18n();
	init_use_exclusive_action();
	init_use_paged_sensitive_protection();
	init_use_sensitive_protection_api();
	init_sensitive_protection_entry_details_button();
	init_sensitive_protection_pagination();
	import_jsx_runtime$7 = require_jsx_runtime();
	PAGE_SIZE$1 = 20;
	PREVIEW_DEBOUNCE_MS = 250;
	SEARCH_DEBOUNCE_MS$1 = 250;
	PLAINTEXT_MIN_LENGTH = 6;
	PLAINTEXT_MAX_LENGTH = 4096;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-rule-editor.less
var init_sensitive_protection_rule_editor = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-rule-capabilities.tsx
function isCapabilityTag(tag) {
	return tag in CAPABILITY_LABEL_KEYS;
}
function normalizeSensitiveProtectionRuleCapabilities(tags) {
	return [...new Set(tags)].filter(isCapabilityTag);
}
function SensitiveProtectionRuleCapabilities({ tags, supportsEncryption }) {
	const t = useTranslation();
	const capabilities = normalizeSensitiveProtectionRuleCapabilities(tags);
	if (supportsEncryption === void 0 && capabilities.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		className: "sensitive-protection-detail__tags",
		children: [capabilities.map((capability) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tag, {
			tone: "default",
			size: "small",
			children: t(CAPABILITY_LABEL_KEYS[capability])
		}, capability)), supportsEncryption === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tag, {
			size: "small",
			tone: supportsEncryption ? "success" : "warning",
			children: t(supportsEncryption ? "settings.securityCenter.sensitiveProtection.rules.encryptionSupported" : "settings.securityCenter.sensitiveProtection.rules.encryptionUnsupported")
		})]
	});
}
var import_jsx_runtime$6, CAPABILITY_LABEL_KEYS;
var init_sensitive_protection_rule_capabilities = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$6 = require_jsx_runtime();
	CAPABILITY_LABEL_KEYS = {
		keyword: "settings.securityCenter.sensitiveProtection.rules.capability.keyword",
		regex: "settings.securityCenter.sensitiveProtection.rules.capability.regex",
		entropy: "settings.securityCenter.sensitiveProtection.rules.capability.entropy",
		bpe: "settings.securityCenter.sensitiveProtection.rules.capability.bpe",
		validate: "settings.securityCenter.sensitiveProtection.rules.capability.validate",
		composite: "settings.securityCenter.sensitiveProtection.rules.capability.composite",
		path: "settings.securityCenter.sensitiveProtection.rules.capability.path"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-rule-details-button.tsx
function SensitiveProtectionRuleDetailsModal({ rule, open, onOpenChange }) {
	const t = useTranslation();
	const fieldId = (0, import_react$7.useId)();
	const capabilities = normalizeSensitiveProtectionRuleCapabilities(rule?.tags);
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Modal, {
		className: "sensitive-protection-rule-modal",
		open: open && rule !== void 0,
		onOpenChange,
		title: t("settings.securityCenter.sensitiveProtection.rules.details.title"),
		width: 520,
		footer: null,
		children: rule ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "sensitive-protection-detail__editor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("label", {
					htmlFor: `${fieldId}-name`,
					children: t("settings.securityCenter.sensitiveProtection.rules.details.nameLabel")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Input, {
					id: `${fieldId}-name`,
					value: rule.name || rule.rule,
					readOnly: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("label", { children: t("settings.securityCenter.sensitiveProtection.rules.details.sourceLabel") }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "sensitive-protection-detail__tags",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tag, {
						tone: "default",
						size: "small",
						children: t(rule.isByUser ? "settings.securityCenter.sensitiveProtection.rules.source.custom" : "settings.securityCenter.sensitiveProtection.rules.source.builtin")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("label", { children: t("settings.securityCenter.sensitiveProtection.rules.details.capabilitiesLabel") }),
				capabilities.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SensitiveProtectionRuleCapabilities, { tags: capabilities }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: t("settings.securityCenter.sensitiveProtection.rules.details.capabilitiesEmpty") }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("label", {
					htmlFor: `${fieldId}-toml`,
					children: t("settings.securityCenter.sensitiveProtection.rules.details.expressionLabel")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Input.TextArea, {
					id: `${fieldId}-toml`,
					value: rule.rule,
					rows: 8,
					readOnly: true
				})
			]
		}) : null
	});
}
var import_react$7, import_jsx_runtime$5;
var init_sensitive_protection_rule_details_button = __esmMin((() => {
	init_src();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_sensitive_protection_rule_capabilities();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-rule-toml-editor.tsx
function highlightEmptyTomlValues(value) {
	const nodes = [];
	let lastIndex = 0;
	for (const match of value.matchAll(EMPTY_TOML_VALUE_PATTERN)) {
		const token = match[0];
		const index = match.index ?? 0;
		if (index > lastIndex) nodes.push(value.slice(lastIndex, index));
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
			className: "sensitive-protection-rule-toml-editor__empty",
			children: token
		}, `${index}-${token}`));
		lastIndex = index + token.length;
	}
	if (lastIndex < value.length) nodes.push(value.slice(lastIndex));
	return nodes.length > 0 ? nodes : value;
}
function SensitiveProtectionRuleTomlEditor({ id, value, placeholder, rows = 8, onChange }) {
	const highlightRef = (0, import_react$6.useRef)(null);
	const syncScroll = (event) => {
		const target = event.currentTarget;
		const highlight = highlightRef.current;
		if (!highlight) return;
		highlight.scrollTop = target.scrollTop;
		highlight.scrollLeft = target.scrollLeft;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "sensitive-protection-rule-toml-editor",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("pre", {
			ref: highlightRef,
			className: "sensitive-protection-rule-toml-editor__highlight",
			"aria-hidden": true,
			children: [highlightEmptyTomlValues(value), "\n"]
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Input.TextArea, {
			id,
			className: "sensitive-protection-rule-toml-editor__input",
			value,
			rows,
			placeholder,
			onChange,
			onScroll: syncScroll
		})]
	});
}
var import_react$6, import_jsx_runtime$4, EMPTY_TOML_VALUE_PATTERN;
var init_sensitive_protection_rule_toml_editor = __esmMin((() => {
	init_src();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$4 = require_jsx_runtime();
	EMPTY_TOML_VALUE_PATTERN = /(?:'\s*'|"\s*"|\[\s*\])/g;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-rule-page.tsx
function isSensitiveProtectionRuleDraftReady(ruleDraft, isEditing) {
	const hasEmptyRegex = /^\s*regex\s*=\s*(['"])\s*\1/m.test(ruleDraft);
	return Boolean(ruleDraft.trim()) && (isEditing || !ruleDraft.includes(TOML_REGEX_MARKER) && !hasEmptyRegex);
}
function SensitiveProtectionRulePage({ enabled }) {
	const t = useTranslation();
	const { executeMutation, queryRules } = useSensitiveProtectionApi();
	const [sourceFilter, setSourceFilter] = (0, import_react$5.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react$5.useState)("all");
	const [ruleSearch, setRuleSearch] = (0, import_react$5.useState)("");
	const debouncedRuleSearch = useDebouncedValue(ruleSearch, SEARCH_DEBOUNCE_MS);
	const { pending: saving, runExclusive } = useExclusiveAction();
	const [editingRule, setEditingRule] = (0, import_react$5.useState)();
	const [viewingRule, setViewingRule] = (0, import_react$5.useState)();
	const [ruleNameDraft, setRuleNameDraft] = (0, import_react$5.useState)("");
	const [ruleDraft, setRuleDraft] = (0, import_react$5.useState)("");
	const [editorOpen, setEditorOpen] = (0, import_react$5.useState)(false);
	const [deletingRule, setDeletingRule] = (0, import_react$5.useState)();
	const reportError = (0, import_react$5.useCallback)((error) => {
		const fallback = t("settings.securityCenter.sensitiveProtection.managementFailed");
		message.error(error instanceof Error ? t("settings.securityCenter.sensitiveProtection.managementFailedWithReason", { error: error.message }) : fallback);
	}, [t]);
	const { goToFirstPage, loading, offset, page, refresh, setOffset } = usePagedSensitiveProtection({
		loadPage: (0, import_react$5.useCallback)((offset, pageSize) => queryRules({
			...sourceFilter === "all" ? {} : { isByUser: sourceFilter === "user" },
			...statusFilter === "all" ? {} : { enabled: statusFilter === "enabled" },
			...debouncedRuleSearch.trim() ? { query: debouncedRuleSearch.trim() } : {},
			offset,
			pageSize
		}), [
			debouncedRuleSearch,
			queryRules,
			sourceFilter,
			statusFilter
		]),
		onError: reportError,
		pageSize: PAGE_SIZE
	});
	const allFilterLabel = t("settings.securityCenter.sensitiveProtection.filters.all");
	const allSourceFilterLabel = t("settings.securityCenter.sensitiveProtection.filters.allSource");
	const allStatusFilterLabel = t("settings.securityCenter.sensitiveProtection.filters.allStatus");
	const tomlRuleTemplate = (0, import_react$5.useMemo)(() => `[[rules]]
regex = " " # ${t("settings.securityCenter.sensitiveProtection.rules.editor.template.regexComment")}
description = " " # ${t("settings.securityCenter.sensitiveProtection.rules.editor.template.descriptionComment")}
keywords = [ ] # ${t("settings.securityCenter.sensitiveProtection.rules.editor.template.keywordsComment")}`, [t]);
	const sourceOptions = (0, import_react$5.useMemo)(() => [
		{
			label: allFilterLabel,
			value: "all"
		},
		{
			label: t("settings.securityCenter.sensitiveProtection.filters.builtin"),
			value: "builtin"
		},
		{
			label: t("settings.securityCenter.sensitiveProtection.filters.user"),
			value: "user"
		}
	], [allFilterLabel, t]);
	const statusOptions = (0, import_react$5.useMemo)(() => [
		{
			label: allFilterLabel,
			value: "all"
		},
		{
			label: t("settings.securityCenter.sensitiveProtection.filters.enabled"),
			value: "enabled"
		},
		{
			label: t("settings.securityCenter.sensitiveProtection.filters.disabled"),
			value: "disabled"
		}
	], [allFilterLabel, t]);
	const controlsDisabled = !enabled || loading || saving;
	const ruleDraftReady = isSensitiveProtectionRuleDraftReady(ruleDraft, editingRule !== void 0);
	const sourceFilterLabel = sourceFilter === "all" ? allSourceFilterLabel : sourceOptions.find((option) => option.value === sourceFilter)?.label;
	const statusFilterLabel = statusFilter === "all" ? allStatusFilterLabel : statusOptions.find((option) => option.value === statusFilter)?.label;
	const customRules = page.items.filter((rule) => rule.isByUser);
	const builtinRules = page.items.filter((rule) => !rule.isByUser);
	const customRulesTitle = t("settings.securityCenter.sensitiveProtection.rules.source.custom");
	const builtinRulesTitle = t("settings.securityCenter.sensitiveProtection.rules.source.system");
	const deleteConfirmTitle = t("settings.securityCenter.sensitiveProtection.rules.deleteConfirmDialog.title");
	const deleteConfirmDescription = t("settings.securityCenter.sensitiveProtection.rules.deleteConfirmDialog.description");
	const deleteConfirmButtonLabel = t("settings.securityCenter.sensitiveProtection.rules.deleteConfirmDialog.confirm");
	const runMutation = (mutation, goFirst = false, successMessage) => runExclusive(async () => {
		await executeMutation(mutation);
		if (goFirst) goToFirstPage();
		else refresh();
		if (successMessage) message.success(successMessage);
	});
	const scheduleMutation = (mutation, goFirst = false, successMessage) => {
		runMutation(mutation, goFirst, successMessage).catch(reportError);
	};
	const deleteRule = async () => {
		if (!deletingRule || controlsDisabled) return false;
		try {
			await runMutation({
				type: "rule.delete",
				id: deletingRule.id
			}, false, t("settings.securityCenter.sensitiveProtection.rules.deleteSuccess"));
			setDeletingRule(void 0);
			return true;
		} catch (error) {
			reportError(error);
			return false;
		}
	};
	const openCreateRule = () => {
		setEditingRule(void 0);
		setRuleNameDraft("");
		setRuleDraft(tomlRuleTemplate);
		setEditorOpen(true);
	};
	const openEditRule = (rule) => {
		setEditingRule(rule);
		setRuleNameDraft(rule.name ?? "");
		setRuleDraft(rule.rule);
		setEditorOpen(true);
	};
	const saveRule = () => {
		if (!ruleNameDraft.trim() || !ruleDraftReady || saving) return false;
		if (editingRule) scheduleMutation({
			type: "rule.update",
			id: editingRule.id,
			name: ruleNameDraft,
			rule: ruleDraft
		}, false, t("settings.securityCenter.sensitiveProtection.rules.updateSuccess"));
		else scheduleMutation({
			type: "rule.add",
			name: ruleNameDraft,
			rule: ruleDraft
		}, true, t("settings.securityCenter.sensitiveProtection.rules.addSuccess"));
		setEditorOpen(false);
		return true;
	};
	const renderRuleRows = (rules) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: "sensitive-protection-detail__management-list sensitive-protection-detail__rule-list",
		children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "sensitive-protection-detail__rule-row",
			role: "button",
			tabIndex: 0,
			onClick: () => setViewingRule(rule),
			onKeyDown: (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					setViewingRule(rule);
				}
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "sensitive-protection-detail__rule-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "sensitive-protection-detail__rule-heading",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("strong", { children: rule.name || rule.rule })
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SensitiveProtectionRuleCapabilities, {
					tags: rule.tags,
					supportsEncryption: rule.supportsEncryption
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "sensitive-protection-detail__row-actions",
				onClick: (event) => event.stopPropagation(),
				onKeyDown: (event) => event.stopPropagation(),
				children: [rule.isByUser ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "sensitive-protection-detail__rule-extra-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						iconOnly: true,
						size: "small",
						variant: "ghost",
						"aria-label": t("settings.securityCenter.sensitiveProtection.rules.edit"),
						disabled: controlsDisabled,
						onClick: () => openEditRule(rule),
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(EditToolIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						iconOnly: true,
						size: "small",
						variant: "ghost",
						danger: true,
						"aria-label": t("settings.securityCenter.sensitiveProtection.rules.delete"),
						disabled: controlsDisabled,
						onClick: () => setDeletingRule(rule),
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DeleteIcon, {})
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Switch, {
					size: "large",
					checked: rule.enabled,
					disabled: controlsDisabled,
					onChange: (e) => scheduleMutation({
						type: "rule.update",
						id: rule.id,
						enabled: e.target.checked
					})
				})]
			})]
		}, rule.id))
	});
	const renderRuleSection = (title, rules) => {
		if (rules.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("section", {
			className: "sensitive-protection-detail__rule-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "sensitive-protection-detail__rule-section-heading",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Card, {
				className: "sensitive-protection-detail__card sensitive-protection-detail__rule-card",
				children: renderRuleRows(rules)
			})]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "sensitive-protection-detail__entries-toolbar sensitive-protection-detail__rules-toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "sensitive-protection-detail__rules-filters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Select, {
						value: sourceFilter,
						options: sourceOptions,
						displayLabel: sourceFilterLabel,
						disabled: saving,
						onChange: (value) => {
							setSourceFilter(value);
							setOffset(0);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Select, {
						value: statusFilter,
						options: statusOptions,
						displayLabel: statusFilterLabel,
						disabled: saving,
						onChange: (value) => {
							setStatusFilter(value);
							setOffset(0);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input.Search, {
						className: "sensitive-protection-detail__entries-search",
						value: ruleSearch,
						allowClear: true,
						placeholder: t("settings.securityCenter.sensitiveProtection.filters.rulePlaceholder"),
						onChange: (event) => {
							setRuleSearch(event.currentTarget.value);
							setOffset(0);
						}
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
				className: "sensitive-protection-detail__entries-add-button",
				variant: "primary",
				size: "medium",
				disabled: controlsDisabled,
				onClick: openCreateRule,
				children: t("settings.securityCenter.sensitiveProtection.rules.add")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "sensitive-protection-detail__rules-scroll-area",
			children: page.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Card, {
				className: "sensitive-protection-detail__card sensitive-protection-detail__rule-card sensitive-protection-detail__rule-empty-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "sensitive-protection-detail__empty",
					children: t(loading ? "settings.securityCenter.sensitiveProtection.loading" : "settings.securityCenter.sensitiveProtection.rules.empty")
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [renderRuleSection(customRulesTitle, customRules), renderRuleSection(builtinRulesTitle, builtinRules)] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SensitiveProtectionPagination, {
			disabled: loading || saving,
			offset,
			onOffsetChange: setOffset,
			pageSize: PAGE_SIZE,
			total: page.total
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SensitiveProtectionRuleDetailsModal, {
			rule: viewingRule,
			open: viewingRule !== void 0,
			onOpenChange: (open) => {
				if (!open) setViewingRule(void 0);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Modal, {
			className: "sensitive-protection-rule-modal sensitive-protection-rule-editor-modal",
			open: editorOpen,
			onOpenChange: setEditorOpen,
			wrapClassName: "sensitive-protection-modal-overlay",
			title: t(editingRule ? "settings.securityCenter.sensitiveProtection.rules.editor.editTitle" : "settings.securityCenter.sensitiveProtection.rules.editor.addTitle"),
			width: 480,
			height: 438,
			okText: t("settings.securityCenter.sensitiveProtection.data.add"),
			cancelText: t("common.cancel"),
			okButtonProps: { disabled: !ruleNameDraft.trim() || !ruleDraftReady || saving },
			onOk: saveRule,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "sensitive-protection-detail__editor",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "sensitive-protection-detail__editor-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("label", {
						htmlFor: "sensitive-protection-rule-name-editor",
						children: t("settings.securityCenter.sensitiveProtection.rules.editor.nameLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
						id: "sensitive-protection-rule-name-editor",
						value: ruleNameDraft,
						onChange: (event) => setRuleNameDraft(event.currentTarget.value),
						placeholder: t("settings.securityCenter.sensitiveProtection.rules.editor.inputPlaceholder")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "sensitive-protection-detail__editor-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("label", {
						htmlFor: "sensitive-protection-rule-editor",
						children: t("settings.securityCenter.sensitiveProtection.rules.editor.configLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SensitiveProtectionRuleTomlEditor, {
						id: "sensitive-protection-rule-editor",
						value: ruleDraft,
						rows: 8,
						onChange: (event) => setRuleDraft(event.currentTarget.value),
						placeholder: t("settings.securityCenter.sensitiveProtection.rules.editor.placeholder")
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Modal, {
			className: "sensitive-protection-rule-delete-modal",
			open: deletingRule !== void 0,
			onOpenChange: (open) => {
				if (!open) setDeletingRule(void 0);
			},
			wrapClassName: "sensitive-protection-modal-overlay",
			title: deleteConfirmTitle,
			width: 480,
			height: 160,
			okText: deleteConfirmButtonLabel,
			cancelText: t("common.cancel"),
			okType: "danger",
			okButtonProps: { disabled: controlsDisabled },
			onOk: deleteRule,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
				className: "sensitive-protection-detail__delete-description",
				children: deleteConfirmDescription
			})
		})
	] });
}
var import_react$5, import_jsx_runtime$3, PAGE_SIZE, SEARCH_DEBOUNCE_MS, TOML_REGEX_MARKER;
var init_sensitive_protection_rule_page = __esmMin((() => {
	init_sensitive_protection_rule_editor();
	init_src();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_use_debounced_value();
	init_useI18n();
	init_use_exclusive_action();
	init_use_paged_sensitive_protection();
	init_use_sensitive_protection_api();
	init_sensitive_protection_pagination();
	init_sensitive_protection_rule_capabilities();
	init_sensitive_protection_rule_details_button();
	init_sensitive_protection_rule_toml_editor();
	import_jsx_runtime$3 = require_jsx_runtime();
	PAGE_SIZE = 20;
	SEARCH_DEBOUNCE_MS = 250;
	TOML_REGEX_MARKER = "YOUR_RE2_REGEX";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/sensitive-protection-detail.tsx
function SensitiveProtectionDetail({ enabled }) {
	const [activeTab, setActiveTab] = (0, import_react$4.useState)(TAB_RULES);
	const t = useTranslation();
	const tabItems = (0, import_react$4.useMemo)(() => [{
		key: TAB_RULES,
		label: t("settings.securityCenter.sensitiveProtection.rules.automaticTitle"),
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SensitiveProtectionRulePage, { enabled })
	}, {
		key: TAB_ENTRIES,
		label: t("settings.securityCenter.sensitiveProtection.data.title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SensitiveProtectionEntryPage, { enabled })
	}], [enabled, t]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage sensitive-protection-detail sensitive-protection-detail--entries",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "sensitive-protection-detail__entries-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tabs, {
				type: "button",
				items: tabItems,
				activeKey: activeTab,
				onChange: setActiveTab
			})
		})
	});
}
var import_react$4, import_jsx_runtime$2, TAB_RULES, TAB_ENTRIES;
var init_sensitive_protection_detail = __esmMin((() => {
	init_sensitive_protection_detail$1();
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_sensitive_protection_entry_page();
	init_sensitive_protection_rule_page();
	import_jsx_runtime$2 = require_jsx_runtime();
	TAB_RULES = "rules";
	TAB_ENTRIES = "entries";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/detail/ToolControlDetail.tsx
function ToolSwitchRow({ checked, compact = false, disabled, name, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "tool-control-detail__row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
			className: "tool-control-detail__tool-name",
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
			checked,
			disabled,
			onChange: (event) => onChange(event.currentTarget.checked),
			size: compact ? "medium" : "large",
			"aria-label": name
		})]
	});
}
function ToolControlSearch({ placeholder, query, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
		className: "tool-control-detail__search",
		value: query,
		onChange: (event) => onChange(event.currentTarget.value),
		placeholder,
		prefix: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SearchIcon, {}),
		allowClear: true,
		variant: "filled"
	});
}
function matchesQuery(name, query) {
	return !query || name.toLocaleLowerCase().includes(query);
}
function filterTools(tools, query) {
	return tools.filter((tool) => matchesQuery(tool.name, query));
}
function McpServerList({ disabled, query, saving, state, update }) {
	const t = useTranslation();
	const disabledServers = new Set(state?.config.disabledMcpServerIds ?? []);
	const disabledTools = new Set(state?.config.disabledMcpToolIds ?? []);
	const items = (state?.catalog.mcpServers ?? []).map((server) => {
		return {
			server,
			visibleTools: matchesQuery(server.name, query) ? server.tools : filterTools(server.tools, query)
		};
	}).filter(({ server, visibleTools }) => matchesQuery(server.name, query) || visibleTools.length > 0).map(({ server, visibleTools }) => {
		const serverEnabled = !disabledServers.has(server.id);
		const supportsPerToolControl = server.tools.length > 0;
		return {
			key: server.id,
			label: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "tool-control-detail__server-label",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tool-control-detail__server-name",
					children: server.name
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tool-control-detail__count",
					children: supportsPerToolControl ? t("settings.securityCenter.toolControl.mcpToolCount", { count: server.tools.length }) : t("settings.securityCenter.toolControl.mcpServerWholeOnly")
				})]
			}),
			extra: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "tool-control-detail__server-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
					checked: serverEnabled,
					disabled: disabled || saving,
					onChange: (event) => update({
						kind: "mcpServer",
						id: server.id,
						enabled: event.currentTarget.checked
					}),
					size: "large",
					"aria-label": server.name
				}), !supportsPerToolControl && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tool-control-detail__arrow-placeholder",
					"aria-hidden": true
				})]
			}),
			showArrow: supportsPerToolControl,
			collapsible: supportsPerToolControl ? "header" : "disabled",
			children: supportsPerToolControl ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "tool-control-detail__server-tools",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "tool-control-detail__tool-list",
					children: visibleTools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolSwitchRow, {
						name: tool.name,
						checked: serverEnabled && !disabledTools.has(tool.id),
						compact: true,
						disabled: disabled || saving || !serverEnabled,
						onChange: (enabled) => update({
							kind: "mcpTool",
							id: tool.id,
							enabled
						})
					}, tool.id))
				})
			}) : null
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "tool-control-detail__mcp-content",
		children: [!query && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
			className: "security-center-panel__card security-center-panel__card--compact tool-control-detail__custom-mcp",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "security-center-panel__row-text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "security-center-panel__row-title",
					children: t("settings.securityCenter.toolControl.customMcp")
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "security-center-panel__description",
					children: t("settings.securityCenter.toolControl.customMcpDesc")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
				className: "tool-control-detail__server-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
					checked: state?.config.customMcpEnabled ?? true,
					disabled: disabled || saving,
					onChange: (event) => update({
						kind: "customMcp",
						enabled: event.currentTarget.checked
					}),
					size: "large"
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tool-control-detail__arrow-placeholder",
					"aria-hidden": true
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
			className: "security-center-panel__card tool-control-detail__server-card",
			children: items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Collapse, {
				className: "tool-control-detail__servers",
				items,
				bordered: false,
				accordion: true,
				expandIconPosition: "end"
			}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "tool-control-detail__empty-server",
				children: "—"
			})
		})]
	});
}
function ToolControlDetail({ disabled = false, loaded, onOpenRequiredTools, saving, state, update }) {
	const t = useTranslation();
	const [activeTab, setActiveTab] = (0, import_react$3.useState)("tool");
	const [query, setQuery] = (0, import_react$3.useState)("");
	const normalizedQuery = query.trim().toLocaleLowerCase();
	const tabItems = (0, import_react$3.useMemo)(() => {
		const productTools = filterTools(state?.catalog.productTools ?? [], normalizedQuery);
		return [{
			key: "tool",
			label: "Tool",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "tool-control-detail__tab-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolControlSearch, {
						placeholder: t("settings.securityCenter.toolControl.toolSearchPlaceholder"),
						query,
						onChange: setQuery
					}),
					!normalizedQuery && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
						className: "security-center-panel__card security-center-panel__card--compact tool-control-detail__required-entry",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SecurityEntryRow, {
							label: t("settings.securityCenter.toolControl.requiredTools"),
							description: t("settings.securityCenter.toolControl.requiredToolsDesc"),
							disabled: disabled || saving,
							onOpenDetail: onOpenRequiredTools
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
						className: "security-center-panel__card tool-control-detail__list-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "tool-control-detail__tool-list",
							children: productTools.length > 0 ? productTools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolSwitchRow, {
								name: tool.name,
								checked: !state?.config.disabledToolIds.includes(tool.id),
								disabled: disabled || saving,
								onChange: (enabled) => update({
									kind: "tool",
									id: tool.id,
									enabled
								})
							}, tool.id)) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "tool-control-detail__empty-server",
								children: "—"
							})
						})
					})
				]
			})
		}, {
			key: "mcp",
			label: "MCP",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "tool-control-detail__tab-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolControlSearch, {
					placeholder: t("settings.securityCenter.toolControl.mcpSearchPlaceholder"),
					query,
					onChange: setQuery
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(McpServerList, {
					disabled,
					query: normalizedQuery,
					saving,
					state,
					update
				})]
			})
		}];
	}, [
		disabled,
		normalizedQuery,
		onOpenRequiredTools,
		query,
		saving,
		state,
		t,
		update
	]);
	if (!loaded || !state) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage tool-control-detail tool-control-detail--loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Loading, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage tool-control-detail",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tabs, {
			className: "tool-control-detail__tabs",
			type: "button",
			items: tabItems,
			activeKey: activeTab,
			onChange: setActiveTab
		})
	});
}
function RequiredToolsDetail({ disabled = false, loaded, saving, state, update }) {
	const t = useTranslation();
	const [query, setQuery] = (0, import_react$3.useState)("");
	const tools = filterTools(state?.catalog.requiredTools ?? [], query.trim().toLocaleLowerCase());
	if (!loaded || !state) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "security-center-panel security-center-panel--subpage tool-control-detail tool-control-detail--loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Loading, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "security-center-panel security-center-panel--subpage tool-control-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
				className: "security-center-panel__card security-center-panel__card--compact",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
					className: "tool-control-detail__notice",
					children: t("settings.securityCenter.toolControl.requiredToolsNotice")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolControlSearch, {
				placeholder: t("settings.securityCenter.toolControl.toolSearchPlaceholder"),
				query,
				onChange: setQuery
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
				className: "security-center-panel__card tool-control-detail__list-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "tool-control-detail__tool-list tool-control-detail__required-list",
					children: tools.length > 0 ? tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolSwitchRow, {
						name: tool.name,
						checked: !state.config.disabledToolIds.includes(tool.id),
						disabled: disabled || saving,
						onChange: (enabled) => update({
							kind: "tool",
							id: tool.id,
							enabled
						})
					}, tool.id)) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "tool-control-detail__empty-server",
						children: "—"
					})
				})
			})
		]
	});
}
var import_react$3, import_jsx_runtime$1;
var init_ToolControlDetail = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_SecurityEntryRow();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/hooks/useExperimentalFeaturesConfig.ts
function getSaveErrorMessage(data) {
	if (!data || typeof data !== "object") return;
	const message = data.message;
	return typeof message === "string" && message.trim() ? message.trim() : void 0;
}
function useExperimentalFeaturesConfig() {
	const t = useTranslation();
	const adapter = useAdapter();
	const [config, setConfig] = (0, import_react$2.useState)(DEFAULT_EXPERIMENTAL_FEATURES);
	const [saving, setSaving] = (0, import_react$2.useState)(false);
	const [savingModalVisible, setSavingModalVisible] = (0, import_react$2.useState)(false);
	const [rebootRequired, setRebootRequired] = (0, import_react$2.useState)(false);
	const [thresholdDraft, setThresholdDraft] = (0, import_react$2.useState)(String(DEFAULT_EXPERIMENTAL_FEATURES.safeDeleteBulkThreshold));
	const prevRebootRequired = (0, import_react$2.useRef)(false);
	(0, import_react$2.useEffect)(() => {
		if (!saving) {
			setSavingModalVisible(false);
			return;
		}
		const timer = setTimeout(() => setSavingModalVisible(true), 300);
		return () => clearTimeout(timer);
	}, [saving]);
	(0, import_react$2.useEffect)(() => {
		if (rebootRequired && !prevRebootRequired.current) Modal.warning({
			title: t("settings.securityCenter.features.rebootRequiredModalTitle"),
			content: t("settings.securityCenter.features.rebootRequiredModalContent")
		});
		prevRebootRequired.current = rebootRequired;
	}, [rebootRequired, t]);
	(0, import_react$2.useEffect)(() => {
		if (!adapter) return;
		const unsubscribeConfig = adapter.on("experimental-features-config-result", (data) => {
			const result = data;
			if (result && typeof result === "object") {
				const safeDeleteBulkThreshold = normalizeSafeDeleteBulkThreshold(result.safeDeleteBulkThreshold);
				setConfig({
					versionControl: result.versionControl ?? false,
					deleteProtection: result.deleteProtection ?? false,
					safeDeleteBulkThreshold,
					safeDeleteRuntimeEnabled: result.safeDeleteRuntimeEnabled !== false
				});
				setThresholdDraft(String(safeDeleteBulkThreshold));
				setRebootRequired(!!result.rebootRequired);
			}
			setSaving(false);
		});
		const unsubscribeSaveError = adapter.on("experimental-features-config-save-error", (data) => {
			setSaving(false);
			const message = getSaveErrorMessage(data);
			const applyFailed = t("settings.securityCenter.config.applyFailed");
			toast.error(message ? `${applyFailed}：${message}` : applyFailed);
		});
		adapter.emit("get-experimental-features-config");
		return () => {
			unsubscribeConfig();
			unsubscribeSaveError();
		};
	}, [adapter, t]);
	const saveConfig = (0, import_react$2.useCallback)((next) => {
		if (!adapter) return;
		setSaving(true);
		adapter.emit("save-experimental-features-config", next);
	}, [adapter]);
	const handleToggle = (0, import_react$2.useCallback)((featureId, enabled) => {
		saveConfig({
			...config,
			[featureId]: enabled
		});
	}, [config, saveConfig]);
	return {
		config,
		handleThresholdChange: (0, import_react$2.useCallback)((event) => {
			setThresholdDraft(event.target.value.replace(/\D/g, ""));
		}, []),
		handleToggle,
		rebootRequired,
		saveThresholdDraft: (0, import_react$2.useCallback)(() => {
			if (saving) return;
			const parsed = Number(thresholdDraft);
			if (!Number.isInteger(parsed) || parsed < 1 || parsed > 99999) {
				setThresholdDraft(String(config.safeDeleteBulkThreshold));
				toast.error(t("settings.securityCenter.features.safeDeleteBulkThresholdInvalid"));
				return;
			}
			if (parsed === config.safeDeleteBulkThreshold) return;
			saveConfig({
				...config,
				safeDeleteBulkThreshold: parsed
			});
		}, [
			config,
			saveConfig,
			saving,
			t,
			thresholdDraft
		]),
		saving,
		savingModalVisible,
		thresholdDraft
	};
}
var import_react$2;
var init_useExperimentalFeaturesConfig = __esmMin((() => {
	init_src$1();
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_useI18n();
	init_constants();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/hooks/useToolControl.ts
function toggle(values, id, enabled) {
	const next = new Set(values);
	if (enabled) next.delete(id);
	else next.add(id);
	return [...next];
}
function applyMutation(config, mutation) {
	switch (mutation.kind) {
		case "tool": return {
			...config,
			disabledToolIds: toggle(config.disabledToolIds, mutation.id, mutation.enabled)
		};
		case "mcpServer": return {
			...config,
			disabledMcpServerIds: toggle(config.disabledMcpServerIds, mutation.id, mutation.enabled)
		};
		case "mcpTool": return {
			...config,
			disabledMcpToolIds: toggle(config.disabledMcpToolIds, mutation.id, mutation.enabled)
		};
		case "customMcp": return {
			...config,
			customMcpEnabled: mutation.enabled
		};
	}
}
function isToolControlState(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	const state = value;
	return !!state.catalog && Array.isArray(state.catalog.productTools) && Array.isArray(state.catalog.requiredTools) && Array.isArray(state.catalog.mcpServers) && !!state.config && Array.isArray(state.config.disabledToolIds) && Array.isArray(state.config.disabledMcpServerIds) && Array.isArray(state.config.disabledMcpToolIds) && typeof state.config.customMcpEnabled === "boolean";
}
function useToolControl() {
	const adapter = useAdapter();
	const t = useTranslation();
	const [state, setState] = (0, import_react$1.useState)(null);
	const [loaded, setLoaded] = (0, import_react$1.useState)(false);
	const [saving, setSaving] = (0, import_react$1.useState)(false);
	(0, import_react$1.useEffect)(() => {
		setLoaded(false);
		setState(null);
		setSaving(false);
		if (!adapter) return;
		const unsubscribeState = adapter.on("tool-control-state-result", (data) => {
			if (isToolControlState(data)) {
				setState(data);
				setLoaded(true);
				setSaving(false);
			}
		});
		const unsubscribeError = adapter.on("tool-control-save-error", () => {
			setSaving(false);
			toast.error(t("settings.securityCenter.toolControl.saveFailed"));
		});
		adapter.emit("get-tool-control-state");
		return () => {
			unsubscribeState?.();
			unsubscribeError?.();
		};
	}, [adapter, t]);
	return {
		state,
		loaded,
		saving,
		update: (0, import_react$1.useCallback)((mutation) => {
			if (!state || !loaded || saving) return;
			setState({
				...state,
				config: applyMutation(state.config, mutation)
			});
			setSaving(true);
			adapter?.emit("update-tool-control", mutation);
		}, [
			adapter,
			loaded,
			saving,
			state
		])
	};
}
var import_react$1;
var init_useToolControl = __esmMin((() => {
	init_src$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_useI18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SecurityCenterPanel/index.tsx
function SecurityCenterPanel({ permissionStatusMap, onAuthorizeClicked }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const [activeDetailPage, setActiveDetailPage] = (0, import_react.useState)(null);
	const experimentalFeatures = useExperimentalFeaturesConfig();
	const toolControl = useToolControl();
	const securityCenter = useSecurityCenter();
	const { managed, dataSecurity, bundledRuntime, sandboxEnabled, showSandboxConfirm, stateLoaded, updateSandboxEnabled, confirmCloseSandbox, cancelCloseSandbox, sensitiveProtectionEnabled, sensitiveProtectionSaving, updateSensitiveProtectionEnabled, queryAuditLog, clearAuditLog, exportAuditLog } = securityCenter;
	const [auditLog, setAuditLog] = (0, import_react.useState)(null);
	const [auditRevision, setAuditRevision] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => adapter?.on("audit-log-changed", () => setAuditRevision((value) => value + 1)), [adapter]);
	(0, import_react.useEffect)(() => {
		if (activeDetailPage != null) return;
		let active = true;
		queryAuditLog({
			limit: 5,
			includeTotal: false
		}).then((page) => {
			if (active) setAuditLog(page);
		}).catch((error) => {
			console.error("[SecurityCenterPanel] queryAuditLog failed:", error);
		});
		return () => {
			active = false;
		};
	}, [
		queryAuditLog,
		auditRevision,
		activeDetailPage
	]);
	const poiMapEnabled = usePoiMapFeature();
	const supportsFileBackup = isHostWindows() || isHostMac() || isHostLinux();
	const buttonHandledRef = (0, import_react.useRef)(false);
	const goBack = (0, import_react.useCallback)(() => setActiveDetailPage((current) => current === "requiredTools" ? "toolControl" : null), []);
	const headerOverride = (0, import_react.useMemo)(() => activeDetailPage ? {
		title: t(DETAIL_TITLE_KEYS[activeDetailPage]),
		onBack: goBack
	} : null, [
		activeDetailPage,
		t,
		goBack
	]);
	useSettingsHeaderOverride(headerOverride);
	(0, import_react.useEffect)(() => {
		if (!adapter) return;
		return adapter.on("audit-log-export-result", (data) => {
			const result = data;
			if (!result || typeof result !== "object") return;
			if (result.status === "failed") {
				const message = typeof result.message === "string" && result.message.trim() ? result.message.trim() : void 0;
				const fallback = t("settings.securityCenter.audit.exportFailed");
				toast.error(message ? `${fallback}: ${message}` : fallback);
			}
		});
	}, [adapter, t]);
	if (activeDetailPage === "network") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkDetail, {});
	if (activeDetailPage === "command") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDetail, {});
	if (activeDetailPage === "file") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDetail, {});
	if (activeDetailPage === "audit") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditDetail, { controller: securityCenter });
	if (activeDetailPage === "sensitiveProtection") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensitiveProtectionDetail, { enabled: sensitiveProtectionEnabled });
	if (activeDetailPage === "toolControl") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolControlDetail, {
		...toolControl,
		disabled: managed,
		onOpenRequiredTools: () => setActiveDetailPage("requiredTools")
	});
	if (activeDetailPage === "requiredTools") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredToolsDetail, {
		...toolControl,
		disabled: managed
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "security-center-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-center-panel__grid",
				children: [
					managed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "security-center-panel__managed-banner",
						role: "status",
						children: t("settings.securityCenter.managedBanner")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "security-center-panel__card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "security-center-panel__section-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "security-center-panel__section-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "security-center-panel__section-title",
										children: [t("settings.securityCenter.section.sandboxSecurity"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: sandboxEnabled ? t("settings.securityCenter.sandboxEnabled.tooltipOn") : t("settings.securityCenter.sandboxEnabled.tooltipOff"),
											placement: "top",
											maxWidth: 280,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "security-center-panel__help-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbInfoIcon, {})
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "security-center-panel__section-desc",
										children: t("settings.securityCenter.section.sandboxSecurityDesc")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "security-center-panel__sandbox-enabled-toggle",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: sandboxEnabled,
										onChange: (event) => updateSandboxEnabled(event.currentTarget.checked),
										size: "large",
										disabled: managed || !stateLoaded
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "security-center-panel__divider" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "security-center-panel__rows",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityEntryRow, {
										label: t("settings.securityCenter.policies.file"),
										description: t("settings.securityCenter.policies.fileDesc"),
										disabled: !stateLoaded,
										onOpenDetail: () => setActiveDetailPage("file")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityEntryRow, {
										label: t("settings.securityCenter.policies.command"),
										description: t("settings.securityCenter.policies.commandDesc"),
										disabled: !stateLoaded,
										onOpenDetail: () => setActiveDetailPage("command")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityEntryRow, {
										label: t("settings.securityCenter.policies.network"),
										description: t("settings.securityCenter.policies.networkDesc"),
										disabled: !stateLoaded,
										onOpenDetail: () => setActiveDetailPage("network")
									}),
									supportsFileBackup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBackupRow, { disabled: managed })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "security-center-panel__card security-center-panel__card--compact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityEntryRow, {
							label: t("settings.securityCenter.toolControl.title"),
							description: t("settings.securityCenter.toolControl.description"),
							disabled: managed || !toolControl.loaded,
							onOpenDetail: () => setActiveDetailPage("toolControl")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "security-center-panel__card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "security-center-panel__section-head",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "security-center-panel__section-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "security-center-panel__section-title",
										children: t("settings.securityCenter.section.dataSecurity")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "security-center-panel__section-desc",
										children: t("settings.securityCenter.section.dataSecurityDesc")
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "security-center-panel__divider" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "security-center-panel__rows",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataSecurityRow, {
										label: t("settings.securityCenter.dataSecurity.safetyGateway"),
										description: t("settings.securityCenter.dataSecurity.safetyGatewayDesc"),
										statusLabel: t(managed && dataSecurity && dataSecurity.securityGatewayEnabled === false ? "settings.securityCenter.status.disabled" : "settings.securityCenter.status.enabled")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataSecurityRow, {
										label: t("settings.securityCenter.dataSecurity.transportEncryption"),
										description: t("settings.securityCenter.dataSecurity.transportEncryptionDesc"),
										statusLabel: t(managed && dataSecurity && dataSecurity.transmissionEncryptionEnabled === false ? "settings.securityCenter.status.disabled" : "settings.securityCenter.status.enabled")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataSecurityRow, {
										label: t("settings.securityCenter.sensitiveProtection.title"),
										description: t("settings.securityCenter.sensitiveProtection.entryDescription"),
										controlNode: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "security-center-panel__sensitive-protection-actions",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												content: t("settings.securityCenter.sensitiveProtection.manage"),
												placement: "top",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "small",
													iconOnly: true,
													className: "security-center-panel__sensitive-protection-settings",
													"aria-label": t("settings.securityCenter.sensitiveProtection.manage"),
													onClick: () => setActiveDetailPage("sensitiveProtection"),
													leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbSettingsIcon, {
														width: 16,
														height: 16
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "security-center-panel__switch-appearance",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: sensitiveProtectionEnabled,
													onChange: (e) => updateSensitiveProtectionEnabled(e.target.checked),
													size: "large",
													disabled: sensitiveProtectionSaving || !stateLoaded,
													"aria-busy": sensitiveProtectionSaving || void 0
												})
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataSecurityRow, {
										label: t("settings.securityCenter.features.safeDeleteRuntimeEnabled"),
										description: t("settings.securityCenter.features.safeDeleteRuntimeEnabledDesc"),
										tooltip: t("settings.securityCenter.features.safeDeleteRuntimeEnabledTooltip"),
										controlNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "security-center-panel__switch-appearance",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: experimentalFeatures.config.safeDeleteRuntimeEnabled,
												onChange: (e) => experimentalFeatures.handleToggle("safeDeleteRuntimeEnabled", e.target.checked),
												size: "large",
												disabled: managed || experimentalFeatures.saving
											})
										})
									}),
									experimentalFeatures.config.safeDeleteRuntimeEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataSecurityRow, {
										label: t("settings.securityCenter.features.safeDeleteBulkThreshold"),
										description: t("settings.securityCenter.features.safeDeleteBulkThresholdDesc"),
										controlNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "security-center-panel__data-number-input",
											value: experimentalFeatures.thresholdDraft,
											type: "number",
											min: 1,
											max: 99999,
											inputMode: "numeric",
											size: "small",
											disabled: managed || experimentalFeatures.saving,
											onChange: experimentalFeatures.handleThresholdChange,
											onBlur: experimentalFeatures.saveThresholdDraft,
											onPressEnter: experimentalFeatures.saveThresholdDraft
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeToolsCard, {
						disabled: managed,
						managedConfig: managed && bundledRuntime ? {
							enabled: bundledRuntime.enabled,
							tools: {
								node: bundledRuntime.tools.node,
								python: bundledRuntime.tools.python,
								gitBash: bundledRuntime.tools.gitBash,
								brokeredShell: bundledRuntime.tools.brokeredShell
							}
						} : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditCenterCard, {
						auditLog,
						clearAuditLog,
						exportAuditLog,
						onViewAll: () => setActiveDetailPage("audit")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemAuthorizationCard, {
						permissionStatusMap,
						onAuthorizeClicked,
						extraRow: poiMapEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationConsentRow, {}) : void 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				open: showSandboxConfirm,
				onOpenChange: (open) => {
					if (!open) {
						if (buttonHandledRef.current) buttonHandledRef.current = false;
						else cancelCloseSandbox();
					}
				},
				title: `⚠ ${t("settings.sandboxSafety.confirm.title")}`,
				size: "small",
				centered: true,
				okText: t("settings.sandboxSafety.confirm.ok"),
				cancelText: t("settings.sandboxSafety.confirm.cancel"),
				okType: "danger",
				onOk: () => {
					buttonHandledRef.current = true;
					confirmCloseSandbox();
				},
				onCancel: () => {
					buttonHandledRef.current = true;
					cancelCloseSandbox();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("settings.sandboxSafety.confirm.body") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						background: "var(--wb-status-warning-bg, rgba(250, 173, 20, 0.1))",
						borderRadius: "var(--wb-radius-md, 8px)",
						padding: "var(--wb-spacing-3, 12px)",
						marginTop: "var(--wb-spacing-3, 12px)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: { color: "var(--wb-color-text-secondary)" },
						children: [
							"ℹ ",
							t("settings.sandboxSafety.confirm.infoPart1"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: {
									fontWeight: 900,
									textDecoration: "underline"
								},
								children: t("settings.sandboxSafety.confirm.infoBold")
							}),
							t("settings.sandboxSafety.confirm.infoPart2")
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: experimentalFeatures.savingModalVisible,
				title: t("settings.securityCenter.config.applyingTitle"),
				closable: false,
				footer: null,
				size: "small",
				centered: true,
				onOpenChange: () => {},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { size: "medium" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.securityCenter.config.applyingContent") })]
				})
			})
		]
	});
}
var import_react, import_jsx_runtime, DETAIL_TITLE_KEYS;
//#endregion
__esmMin((() => {
	init_SecurityCenterPanel$1();
	init_src$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_use_poi_map_feature();
	init_useI18n();
	init_icons();
	init_path_display();
	init_useSecurityCenter();
	init_settings_surface_context();
	init_AuditCenterCard();
	init_DataSecurityRow();
	init_FileBackupRow();
	init_LocationConsentRow();
	init_RuntimeToolsCard();
	init_SecurityEntryRow();
	init_SystemAuthorizationCard();
	init_constants();
	init_AuditDetail();
	init_CommandDetail();
	init_FileDetail();
	init_NetworkDetail();
	init_sensitive_protection_detail();
	init_ToolControlDetail();
	init_useExperimentalFeaturesConfig();
	init_useToolControl();
	import_jsx_runtime = require_jsx_runtime();
	DETAIL_TITLE_KEYS = {
		file: "settings.securityCenter.policies.file",
		command: "settings.securityCenter.policies.command",
		network: "settings.securityCenter.policies.network",
		audit: "settings.securityCenter.section.audit",
		sensitiveProtection: "settings.securityCenter.sensitiveProtection.title",
		toolControl: "settings.securityCenter.toolControl.title",
		requiredTools: "settings.securityCenter.toolControl.requiredTools"
	};
}))();
export { SecurityCenterPanel };
