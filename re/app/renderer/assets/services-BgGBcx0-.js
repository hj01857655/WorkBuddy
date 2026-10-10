const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./skill-scan-result-dialog-BlUR01CH.js","./rolldown-runtime-V4kyJ4NV.js","./ui-docs-viewer-Bo02yf1Q.js","./lib-chat-ui-D8Ji0f8n.js","./lib-chat-ui-Dh_IZX7U.css","./ui-ardot-OEUzH9ni.js","./ui-docs-viewer-vyeRSI5f.css","./skill-scan-result-dialog-B9OvdekP.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cm as init_context, E1 as init_useI18n, FM as init_use_high_risk_notification, II as isNonHighRiskScanResult, IM as useHighRiskNotification, O1 as useTranslation, Sb as init_common, X0 as parseSkillHubCoordinate, Z0 as toSkillHubCanonicalName, bL as init_high_risk_notification_store, d0 as useModuleHost, e1 as SkillUrlInstallFlowStage, g3 as readCache, gA as init_async_security_scan_service, h3 as init_local_cache, hA as asyncSecurityScanService, jI as init_skills_security_types, l0 as init_module_host_context, mA as useScanResultSubscription, oA as init_skill_import_errors, pA as init_use_scan_result_subscription, sA as showImportSkillError, t1 as init_types, xL as notifySkillListRefresh } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Ov as __vitePreload, Tv as require_jsx_runtime, ji as ConfirmDialog, kv as init_preload_helper, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/workbuddy-core/src/domains/skills/index.ts
var init_skills = __esmMin((() => {
	init_common();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/utils/deeplink-skillhub-preflight.ts
/**
* 从 downloadUrl 解析 SkillHub 安装坐标
*
* 认 query 的 slug，并可叠加 namespace；解析失败返回 null
*/
function resolveSkillHubDeeplinkTarget(option) {
	const rawUrl = option.downloadUrl?.trim();
	if (!rawUrl) return null;
	let url;
	try {
		url = new URL(rawUrl);
	} catch {
		return null;
	}
	const rawSlug = url.searchParams.get("slug");
	if (!rawSlug) return null;
	const queryNamespace = url.searchParams.get("namespace") || void 0;
	const parsed = parseSkillHubCoordinate(rawSlug);
	const namespace = parsed.namespace ?? queryNamespace;
	const slug = parsed.slug;
	if (!slug) return null;
	const coordinate = toSkillHubCanonicalName(slug, namespace);
	if (namespace) return {
		slug,
		namespace,
		coordinate
	};
	return {
		slug,
		coordinate
	};
}
/**
* 从 getDetail 组装 skillhub.install 的 name / version / icon / labels / extras
*
* 对齐市场安装透传，尽量写全 `_skillhub_meta.json`
*/
function buildSkillHubDeeplinkInstallFields(option) {
	const { detail, fallbackDisplayName, fallbackSlug } = option;
	const displayName = detail?.skill?.displayName || fallbackDisplayName || fallbackSlug;
	const version = detail?.latestVersion?.version;
	const rawIconUrl = detail?.iconUrl;
	const iconUrl = typeof rawIconUrl === "string" && /^https?:\/\//i.test(rawIconUrl) ? rawIconUrl : void 0;
	const labels = coerceStringLabels(detail?.labels);
	const descriptionZh = detail?.skill?.summary_zh;
	const descriptionEn = detail?.skill?.summary;
	const publisherName = detail?.publisher?.name;
	const installs = resolveInstallCount(detail?.skill?.stats);
	const extras = {};
	if (typeof descriptionZh === "string" && descriptionZh) extras.description_zh = descriptionZh;
	if (typeof descriptionEn === "string" && descriptionEn) extras.description_en = descriptionEn;
	if (typeof installs === "number") extras.installs = installs;
	if (typeof publisherName === "string" && publisherName.trim()) extras.publisher_name = publisherName.trim();
	const hasExtras = Object.keys(extras).length > 0;
	const fields = { displayName };
	if (version) fields.version = version;
	if (iconUrl) fields.iconUrl = iconUrl;
	if (labels) fields.labels = labels;
	if (hasExtras) fields.extras = extras;
	return fields;
}
/**
* labels 值统一成 string，与服务端 install 合并逻辑一致
*/
function coerceStringLabels(raw) {
	if (!raw) return;
	const labels = {};
	for (const [key, value] of Object.entries(raw)) {
		if (value === void 0 || value === null) continue;
		labels[key] = String(value);
	}
	if (Object.keys(labels).length === 0) return;
	return labels;
}
/**
* 使用人数快照：优先 installs，为 0 时回退 downloads（对齐市场用 downloads 的习惯）
*/
function resolveInstallCount(stats) {
	if (!stats) return;
	if (typeof stats.installs === "number" && stats.installs > 0) return stats.installs;
	if (typeof stats.downloads === "number" && stats.downloads > 0) return stats.downloads;
}
var init_deeplink_skillhub_preflight = __esmMin((() => {
	init_skills();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/skill-install-intent-coordinator.tsx
async function tryInstallViaMarketplaceFacade(option) {
	const { detail, marketplace, reportInstallFlow, reportInstallSucceeded, t } = option;
	if (!marketplace) {
		console.warn("[deeplink-install][preflight] marketplace facade unavailable, fallback", { slug: option.detail.skillName });
		return false;
	}
	const rawChannel = detail.channelType;
	const preflightOption = {
		detail,
		marketplace,
		reportInstallFlow,
		reportInstallSucceeded,
		t
	};
	if (rawChannel === "skillhub") return trySkillHubPreflightInstall(preflightOption);
	if (!(!rawChannel || rawChannel === "knot")) {
		console.info("[deeplink-install][preflight] non-marketplace channelType, fallback", {
			slug: detail.skillName,
			channelType: rawChannel
		});
		return false;
	}
	return tryKnotPreflightInstall(preflightOption);
}
/**
* skillhub deeplink preflight：解析 slug → getDetail 补版本 → skillhub.install，落盘 _skillhub_meta.json
*/
async function trySkillHubPreflightInstall(option) {
	const { detail, marketplace, reportInstallFlow, reportInstallSucceeded, t } = option;
	const skillName = detail.skillName;
	const target = resolveSkillHubDeeplinkTarget({ downloadUrl: detail.downloadUrl });
	if (!target) {
		console.warn("[deeplink-install][preflight] skillhub cannot parse slug from downloadUrl", {
			skillName,
			downloadUrl: detail.downloadUrl
		});
		reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
			skillName,
			channelType: detail.channelType,
			errorKey: "skillhub_slug_unresolved",
			errorMessage: "Failed to parse SkillHub slug from downloadUrl"
		});
		showImportSkillError("skillhub_slug_unresolved");
		return true;
	}
	console.info("[deeplink-install][preflight] skillhub start", {
		skillName,
		slug: target.slug,
		namespace: target.namespace,
		coordinate: target.coordinate,
		downloadUrl: detail.downloadUrl
	});
	let hubDetail = null;
	try {
		hubDetail = await marketplace.skillhub.getDetail(target.coordinate);
	} catch (err) {
		console.info("[deeplink-install][preflight] skillhub getDetail skipped", {
			coordinate: target.coordinate,
			err
		});
	}
	const { displayName, version, iconUrl, labels, extras } = buildSkillHubDeeplinkInstallFields({
		detail: hubDetail,
		fallbackDisplayName: detail.skillName,
		fallbackSlug: target.slug
	});
	try {
		console.info("[deeplink-install][preflight] calling skillhub.install", {
			skillName,
			coordinate: target.coordinate,
			version,
			displayName,
			hasIcon: !!iconUrl,
			hasLabels: !!labels,
			hasExtras: !!extras
		});
		const result = await marketplace.skillhub.install(target.coordinate, version, displayName, iconUrl, labels, extras);
		if (!result?.success) {
			console.warn("[deeplink-install][preflight] skillhub.install failed, fallback", {
				skillName,
				coordinate: target.coordinate,
				err: result?.errorMessage
			});
			return false;
		}
		const finalName = result.skillName || displayName;
		console.info("[deeplink-install][preflight] skillhub install succeeded", {
			skillName,
			coordinate: target.coordinate,
			version,
			finalName
		});
		marketplace.skillhub.reportStats(target.coordinate, {
			installs: 1,
			downloads: 1
		}).catch(() => {});
		reportInstallSucceeded(finalName, detail.channelType, false, version, target.coordinate);
		notifySkillListRefresh();
		toast.success(t("skills.skillhub.installSuccessPlain", { name: finalName }));
		return true;
	} catch (err) {
		console.warn("[deeplink-install][preflight] skillhub threw, fallback to installFromUrl", {
			skillName,
			coordinate: target.coordinate,
			err
		});
		reportInstallFlow(SkillUrlInstallFlowStage.InvalidIntentPayload, {
			skillName,
			channelType: detail.channelType,
			errorKey: "marketplace_preflight_threw",
			errorMessage: err instanceof Error ? err.message : String(err)
		});
		return false;
	}
}
/**
* knot deeplink preflight：从 URL 解析 slug → knot.list 反查 id → knot.install
*/
async function tryKnotPreflightInstall(option) {
	const { detail, marketplace, reportInstallFlow, reportInstallSucceeded, t } = option;
	const rawChannel = detail.channelType;
	const slug = detail.skillName;
	console.info("[deeplink-install][preflight] knot start", {
		slug,
		channelType: rawChannel,
		downloadUrl: detail.downloadUrl
	});
	try {
		const urlSlug = /\/skills\/([\w-]+)_track\//.exec(detail.downloadUrl || "")?.[1];
		const urlVersion = /\/v([\d.]+)\//.exec(detail.downloadUrl || "")?.[1];
		const urlSkillName = /\/([^/?]+)\.zip(?:$|\?)/.exec(detail.downloadUrl || "")?.[1];
		if (!urlSlug) {
			console.warn("[deeplink-install][preflight] cannot parse slug from downloadUrl, fallback", {
				slug,
				downloadUrl: detail.downloadUrl
			});
			return false;
		}
		console.info("[deeplink-install][preflight] parsed knot slug from downloadUrl", {
			slug,
			urlSlug,
			urlVersion,
			urlSkillName
		});
		const keywordCandidates = Array.from(new Set([
			urlSkillName,
			detail.skillName,
			urlSlug
		].filter((k) => !!k && k.length > 0)));
		let s;
		let usedKeyword;
		let lastTotal;
		let lastSampleSlugs = [];
		for (const keyword of keywordCandidates) try {
			const listRes = await marketplace.knot.list({
				keyword,
				page: 1,
				pageSize: 50
			});
			const items = listRes?.data?.skills ?? [];
			lastTotal = listRes?.data?.total;
			lastSampleSlugs = items.slice(0, 5).map((it) => it?.slug);
			const found = items.find((it) => it?.slug === urlSlug);
			if (found) {
				s = found;
				usedKeyword = keyword;
				console.info("[deeplink-install][preflight] knot list matched slug", {
					slug,
					urlSlug,
					keyword,
					total: lastTotal,
					resolvedId: found.id,
					resolvedVersion: found.version,
					resolvedName: found.name
				});
				break;
			}
			console.info("[deeplink-install][preflight] knot list keyword did not slug-match, will try next candidate", {
				slug,
				urlSlug,
				keyword,
				total: lastTotal,
				sampleSlugs: lastSampleSlugs
			});
		} catch (err) {
			console.warn("[deeplink-install][preflight] knot list threw for keyword, will try next", {
				slug,
				urlSlug,
				keyword,
				err
			});
		}
		if (!s) {
			console.warn("[deeplink-install][preflight] all keyword candidates exhausted, no slug match, fallback", {
				slug,
				urlSlug,
				keywordCandidates,
				lastTotal,
				lastSampleSlugs
			});
			return false;
		}
		if (typeof s.id !== "number") {
			console.warn("[deeplink-install][preflight] knot list matched slug but id missing, fallback", {
				slug,
				urlSlug,
				usedKeyword,
				s
			});
			return false;
		}
		const finalVersion = s.version ?? urlVersion;
		if (!finalVersion) {
			console.warn("[deeplink-install][preflight] knot skill matched but no version, fallback", {
				slug,
				s
			});
			return false;
		}
		const finalSlug = s.slug ?? urlSlug;
		const finalName = s.name ?? urlSkillName ?? urlSlug;
		const finalSkillName = s.skill_name ?? urlSkillName ?? urlSlug;
		console.info("[deeplink-install][preflight] calling knot.install", {
			slug,
			id: s.id,
			version: finalVersion,
			resolvedSlug: finalSlug,
			finalName,
			finalSkillName
		});
		const result = await marketplace.knot.install(s.id, finalVersion, finalName, finalSkillName, finalSlug, s.iconUrl);
		if (!result?.success) {
			console.warn("[deeplink-install][preflight] knot.install failed, fallback", {
				slug,
				err: result?.errorMessage
			});
			return false;
		}
		console.info("[deeplink-install][preflight] knot install succeeded", {
			slug,
			id: s.id,
			version: finalVersion,
			resolvedSlug: finalSlug
		});
		marketplace.knot.reportStats(finalSlug, {
			installs: 1,
			downloads: 1
		}).catch(() => {});
		reportInstallSucceeded(finalName, detail.channelType, false, finalVersion, finalSlug);
		notifySkillListRefresh();
		toast.success(t("skills.knot.installSuccessPlain", { name: finalName }));
		return true;
	} catch (err) {
		console.warn("[deeplink-install][preflight] threw, fallback to installFromUrl", {
			slug,
			channelType: rawChannel,
			err
		});
		reportInstallFlow(SkillUrlInstallFlowStage.InvalidIntentPayload, {
			skillName: slug,
			channelType: detail.channelType,
			errorKey: "marketplace_preflight_threw",
			errorMessage: err instanceof Error ? err.message : String(err)
		});
		return false;
	}
}
var import_react$1, import_jsx_runtime$1, useSkillInstallIntentConfirm, createPendingScanResult, SkillInstallIntentCoordinatorInner, SkillInstallIntentCoordinator;
var init_skill_install_intent_coordinator = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_types();
	init_local_cache();
	init_async_security_scan_service();
	init_context();
	init_high_risk_notification_store();
	init_skill_import_errors();
	init_use_scan_result_subscription();
	init_skills_security_types();
	init_deeplink_skillhub_preflight();
	import_jsx_runtime$1 = require_jsx_runtime();
	useSkillInstallIntentConfirm = (t) => {
		const [request, setRequest] = (0, import_react$1.useState)(null);
		const resolverRef = (0, import_react$1.useRef)(null);
		return {
			requestSkillInstallIntentConfirm: (0, import_react$1.useCallback)((kind, skillName) => new Promise((resolve) => {
				if (resolverRef.current) resolverRef.current(false);
				resolverRef.current = resolve;
				setRequest({
					kind,
					skillName
				});
			}), []),
			resolveSkillInstallIntentConfirm: (0, import_react$1.useCallback)((confirmed) => {
				const resolver = resolverRef.current;
				resolverRef.current = null;
				setRequest(null);
				resolver?.(confirmed);
			}, []),
			skillInstallIntentDialogProps: (0, import_react$1.useMemo)(() => {
				const skillName = request?.skillName || "";
				const isOverwrite = request?.kind === "overwrite";
				const confirmContent = isOverwrite ? t("skills.installConfirm.content.overwrite") : t("skills.installConfirm.content.install");
				return {
					visible: !!request,
					title: t("skills.installConfirm.title.common"),
					content: `「${skillName}」${confirmContent}`,
					confirmText: isOverwrite ? t("skills.installConfirm.confirm.overwrite") : t("skills.installConfirm.confirm.install"),
					cancelText: t("common.cancel"),
					confirmVariant: isOverwrite ? "danger" : "primary"
				};
			}, [request, t])
		};
	};
	createPendingScanResult = (md5) => ({
		md5,
		hashHit: false,
		threatLevel: 0,
		riskLevel: "safe",
		verdict: "",
		description: "",
		tags: [],
		fileAnalysis: [],
		virusName: []
	});
	SkillInstallIntentCoordinatorInner = ({ adapter }) => {
		const t = useTranslation();
		const host = useModuleHost();
		const personalSkillsFacade = host.facades.personalSkills;
		if (!personalSkillsFacade) throw new Error("[SkillInstallIntentCoordinator] personalSkills facade is not available");
		const personalSkills = personalSkillsFacade;
		let marketplace;
		try {
			marketplace = host.facades.skillsMarketplace;
		} catch {
			marketplace = void 0;
		}
		const { reportEvent, Events } = host.reporter;
		const { requestSkillInstallIntentConfirm, resolveSkillInstallIntentConfirm, skillInstallIntentDialogProps } = useSkillInstallIntentConfirm(t);
		const [securityState, setSecurityState] = (0, import_react$1.useState)(null);
		const [highRiskCountdown, setHighRiskCountdown] = (0, import_react$1.useState)(0);
		const reportInstallFlow = (0, import_react$1.useCallback)((stage, params) => {
			reportEvent(Events.SkillUrlInstallFlow, {
				stage,
				skill_name: params.skillName,
				skill_id: params.skill_id,
				skill_version: params.skill_version,
				channel_type: params.channelType || "unknown",
				confirmed: params.confirmed,
				overwrite: params.overwrite,
				error_key: params.errorKey,
				error_message: params.errorMessage,
				warning_key: params.warningKey,
				warning_message: params.warningMessage
			});
		}, [reportEvent, Events]);
		const reportInstallSucceeded = (0, import_react$1.useCallback)((skillName, channelType, overwrite = false, skillVersion, skillId) => {
			reportInstallFlow(SkillUrlInstallFlowStage.InstallSucceeded, {
				skillName,
				channelType,
				overwrite,
				skill_id: skillId,
				skill_version: skillVersion
			});
			reportEvent(Events.SkillInstalled, {
				name: skillName,
				skillId,
				skillVersion
			});
			reportEvent(Events.SkillAction, {
				name: skillName,
				skillId,
				skillVersion,
				action: "install",
				channelType: channelType || "wecom"
			});
		}, [
			Events,
			reportEvent,
			reportInstallFlow
		]);
		(0, import_react$1.useEffect)(() => {
			asyncSecurityScanService.setAdapter(adapter);
			asyncSecurityScanService.setPersonalSkillsFacade(personalSkills);
		}, [adapter, personalSkills]);
		const closeSecurityDialog = (0, import_react$1.useCallback)((cancelPendingTask) => {
			setSecurityState((prev) => {
				if (cancelPendingTask && prev?.scanResult.verdict === "" && prev.preCheck.md5) asyncSecurityScanService.removeTask(prev.preCheck.md5);
				return null;
			});
		}, []);
		const installByPathAfterSecurityCheck = (0, import_react$1.useCallback)(async (options) => {
			if (!securityState?.preCheck.selectedPath) return;
			const { isSkipScan, suppressSuccessToast = false } = options;
			const { detail, preCheck, installName, channelType, usedOverwrite } = securityState;
			const installPath = preCheck.selectedPath;
			const pendingMd5 = isSkipScan && preCheck.md5 ? preCheck.md5 : void 0;
			if (isSkipScan) closeSecurityDialog(false);
			console.info("[deeplink-install][security] installByPath start", {
				skillName: installName,
				channelType,
				usedOverwrite,
				isSkipScan,
				installPath,
				pendingMd5
			});
			reportInstallFlow(SkillUrlInstallFlowStage.InstallStarted, {
				skillName: installName,
				channelType,
				overwrite: usedOverwrite
			});
			try {
				const result = await personalSkills.installByPath({
					source: "userSettings",
					folderPath: installPath
				});
				if (!result.success) {
					if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
					reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
						skillName: installName,
						channelType,
						overwrite: usedOverwrite,
						errorKey: "installByPathFailed",
						errorMessage: result.error
					});
					showImportSkillError(result.error || "installFromUrlFailed");
					return;
				}
				let installedFilePath = "";
				let installedVersion;
				let installedSkillId;
				if (result.skillName) try {
					const matched = ((await personalSkills.list({
						cwd: "",
						global: false,
						excludePluginSkills: true
					})).results || []).find((skill) => skill.name === result.skillName);
					installedFilePath = matched?.filePath || "";
					installedVersion = matched?.version;
					installedSkillId = matched?.skillId;
				} catch {
					installedFilePath = "";
				}
				if (pendingMd5 && result.skillName) asyncSecurityScanService.updateTask(pendingMd5, {
					skillName: result.skillName,
					skillFilePath: installedFilePath
				});
				const finalSkillName = result.skillName || detail.skillName || installName;
				reportInstallSucceeded(finalSkillName, channelType, usedOverwrite, installedVersion, installedSkillId);
				notifySkillListRefresh();
				if (isSkipScan) toast({
					message: t("skills.security.async.backgroundRunning"),
					type: "info"
				});
				else {
					closeSecurityDialog(false);
					if (!suppressSuccessToast) toast.success(`Skill ${finalSkillName} has been installed.`);
				}
			} catch (error) {
				if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
				reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
					skillName: installName,
					channelType,
					overwrite: usedOverwrite,
					errorKey: "exception",
					errorMessage: error instanceof Error ? error.message : "installFromUrlFailed"
				});
				showImportSkillError(error instanceof Error ? error.message : "installFromUrlFailed");
			}
		}, [
			adapter,
			closeSecurityDialog,
			reportInstallFlow,
			reportInstallSucceeded,
			securityState,
			t
		]);
		const isScanFailed = !!securityState?.preCheck.error && securityState.scanResult.verdict === "";
		const isPendingAsync = securityState?.scanResult.verdict === "" && !isScanFailed;
		const pendingScanMd5 = isPendingAsync ? securityState?.preCheck.md5 || null : null;
		const onPendingScanArrived = (0, import_react$1.useCallback)((result) => {
			setSecurityState((prev) => {
				if (!prev || prev.preCheck.md5 !== result.md5) return prev;
				return {
					...prev,
					scanResult: result
				};
			});
			if ((readCache("skills-security-auto-install-non-high-risk") ?? false) && isNonHighRiskScanResult(result)) installByPathAfterSecurityCheck({
				isSkipScan: false,
				suppressSuccessToast: true
			}).catch(() => void 0);
		}, [installByPathAfterSecurityCheck]);
		useScanResultSubscription(pendingScanMd5, onPendingScanArrived);
		const isRiskDialogVisible = !!securityState;
		const isSuspicious = securityState?.scanResult.verdict === "suspicious";
		const isHighRisk = !isPendingAsync && !isSuspicious && securityState?.scanResult.riskLevel === "high";
		(0, import_react$1.useEffect)(() => {
			if (!isHighRisk) {
				setHighRiskCountdown(0);
				return;
			}
			setHighRiskCountdown(5);
			const timer = setInterval(() => {
				setHighRiskCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
			return () => clearInterval(timer);
		}, [
			isHighRisk,
			securityState?.scanResult.md5,
			securityState?.scanResult.verdict,
			securityState?.scanResult.riskLevel
		]);
		const handleRiskDialogConfirm = (0, import_react$1.useCallback)(() => {
			if (!securityState) return;
			if (isPendingAsync) {
				installByPathAfterSecurityCheck({ isSkipScan: true }).catch(() => void 0);
				return;
			}
			if (highRiskCountdown > 0) return;
			installByPathAfterSecurityCheck({ isSkipScan: false }).catch(() => void 0);
		}, [
			highRiskCountdown,
			installByPathAfterSecurityCheck,
			securityState
		]);
		const riskDialogProps = (0, import_react$1.useMemo)(() => {
			if (!securityState) return {
				title: "",
				content: "",
				confirmText: "",
				cancelText: "",
				confirmVariant: "primary"
			};
			if (isPendingAsync) return {
				title: t("skills.security.intent.pendingTitle"),
				content: t("skills.security.intent.pendingContent"),
				confirmText: t("skills.security.skipDirectInstall"),
				cancelText: t("skills.security.cancelInstall"),
				confirmVariant: "primary"
			};
			if (isScanFailed) {
				const tagsText = securityState.scanResult.tags.map((tag) => tag.desc || tag.tag).filter(Boolean).join("，");
				const combinedDesc = [
					securityState.scanResult.description,
					tagsText,
					securityState.preCheck.error
				].filter(Boolean).join("\n");
				return {
					title: t("skills.security.error"),
					content: combinedDesc || t("skills.security.deepAnalysisHint"),
					confirmText: t("skills.security.continueInstall"),
					cancelText: t("skills.security.cancelInstall"),
					confirmVariant: "danger"
				};
			}
			const titleKey = securityState.scanResult.verdict === "suspicious" ? "skills.security.verdict.grey" : `skills.security.result.${securityState.scanResult.riskLevel}`;
			const tagsText = securityState.scanResult.tags.map((tag) => tag.desc || tag.tag).filter(Boolean).join("，");
			const combinedDesc = [securityState.scanResult.description, tagsText].filter(Boolean).join("\n");
			return {
				title: t(titleKey),
				content: combinedDesc || t("skills.installConfirm.content.install"),
				confirmText: highRiskCountdown > 0 ? t("skills.security.confirmCountdown", { seconds: String(highRiskCountdown) }) : t("skills.security.continueInstall"),
				cancelText: t("skills.security.cancelInstall"),
				confirmVariant: "danger"
			};
		}, [
			highRiskCountdown,
			isPendingAsync,
			isScanFailed,
			securityState,
			t
		]);
		(0, import_react$1.useEffect)(() => {
			if (!adapter) return;
			const unsubscribe = adapter.on("skill-install-intent", async (data) => {
				const detail = data;
				if (!detail?.skillName || !detail?.downloadUrl) {
					console.warn("[deeplink-install][intent] ignore invalid intent payload", detail);
					reportInstallFlow(SkillUrlInstallFlowStage.InvalidIntentPayload, {
						skillName: detail?.skillName || "unknown",
						channelType: detail?.channelType,
						errorKey: "invalid_intent_payload",
						errorMessage: "Missing skillName or downloadUrl"
					});
					return;
				}
				console.info("[deeplink-install][intent] intent received", {
					skillName: detail.skillName,
					channelType: detail.channelType,
					hasPrompt: !!detail.prompt
				});
				reportInstallFlow(SkillUrlInstallFlowStage.IntentReceived, {
					skillName: detail.skillName,
					channelType: detail.channelType
				});
				if (!personalSkills?.installFromUrl) {
					console.warn("[deeplink-install][intent] installFromUrl is unavailable on current facade");
					reportInstallFlow(SkillUrlInstallFlowStage.AdapterCapabilityMissing, {
						skillName: detail.skillName,
						channelType: detail.channelType,
						errorKey: "adapter_capability_missing",
						errorMessage: "installSkillFromUrl is unavailable"
					});
					showImportSkillError("Install skill from URL is not available in current mode");
					return;
				}
				const installName = detail.skillName || "skill";
				const installConfirmed = await requestSkillInstallIntentConfirm("install", installName);
				console.info("[deeplink-install][confirm] install confirm resolved", {
					skillName: installName,
					confirmed: installConfirmed
				});
				reportInstallFlow(SkillUrlInstallFlowStage.ConfirmResult, {
					skillName: installName,
					channelType: detail.channelType,
					confirmed: installConfirmed,
					overwrite: false
				});
				if (!installConfirmed) return;
				if (await tryInstallViaMarketplaceFacade({
					detail,
					marketplace,
					reportInstallFlow,
					reportInstallSucceeded,
					t
				})) return;
				const runInstall = async (overwrite) => {
					reportInstallFlow(SkillUrlInstallFlowStage.InstallStarted, {
						skillName: detail.skillName,
						channelType: detail.channelType,
						overwrite
					});
					console.info("[deeplink-install][fallback] installFromUrl start", {
						skillName: detail.skillName,
						overwrite,
						channelType: detail.channelType
					});
					const installResult = await personalSkills.installFromUrl({
						skillName: detail.skillName,
						downloadUrl: detail.downloadUrl,
						channelType: detail.channelType,
						prompt: detail.prompt,
						overwrite,
						securityCheck: true
					});
					console.info("[deeplink-install][fallback] installFromUrl result", {
						skillName: installResult?.skillName || detail.skillName,
						overwrite,
						success: installResult?.success,
						errorKey: installResult?.errorKey,
						warningKey: installResult?.warningKey,
						hasPreCheck: !!installResult?.preCheck
					});
					return installResult;
				};
				try {
					let result = await runInstall(false);
					let usedOverwrite = false;
					if (!result?.success && result?.errorKey === "duplicateSkillName") {
						const duplicateName = result.skillName || installName;
						console.info("[deeplink-install][duplicate] duplicate skill detected, requesting overwrite confirm", { skillName: duplicateName });
						reportInstallFlow(SkillUrlInstallFlowStage.DuplicateDetected, {
							skillName: duplicateName,
							channelType: detail.channelType,
							overwrite: true
						});
						const overwriteConfirmed = await requestSkillInstallIntentConfirm("overwrite", duplicateName);
						console.info("[deeplink-install][duplicate] overwrite confirm resolved", {
							skillName: duplicateName,
							confirmed: overwriteConfirmed
						});
						reportInstallFlow(SkillUrlInstallFlowStage.ConfirmResult, {
							skillName: duplicateName,
							channelType: detail.channelType,
							confirmed: overwriteConfirmed,
							overwrite: true
						});
						if (!overwriteConfirmed) return;
						usedOverwrite = true;
						result = await runInstall(true);
					}
					if (!result?.success && result?.errorKey === "security_check_blocked" && result.preCheck) {
						const preCheck = result.preCheck;
						const scanResult = preCheck.scanResult || createPendingScanResult(preCheck.md5);
						console.info("[deeplink-install][security] blocked, opening risk dialog", {
							skillName: result.skillName || installName,
							md5: preCheck.md5,
							selectedPath: preCheck.selectedPath,
							verdict: scanResult.verdict,
							riskLevel: scanResult.riskLevel,
							hashHit: preCheck.hashHit
						});
						if ((readCache("skills-security-auto-install-non-high-risk") ?? false) && isNonHighRiskScanResult(scanResult) && preCheck.selectedPath) {
							console.info("[deeplink-install][security] non-high-risk auto-install (switch on)", {
								skillName: result.skillName || installName,
								verdict: scanResult.verdict,
								riskLevel: scanResult.riskLevel
							});
							const installResult = await personalSkills.installByPath({
								source: "userSettings",
								folderPath: preCheck.selectedPath
							});
							if (installResult.success) {
								reportInstallSucceeded(installResult.skillName || result.skillName || installName, detail.channelType, usedOverwrite);
								notifySkillListRefresh();
								toast.success(`Skill ${installResult.skillName || result.skillName || installName} has been installed.`);
							} else showImportSkillError(installResult.error || "installFromUrlFailed");
							return;
						}
						setSecurityState({
							detail,
							installName: result.skillName || installName,
							channelType: detail.channelType,
							usedOverwrite,
							preCheck,
							scanResult
						});
						if (preCheck.md5 && !scanResult.verdict) asyncSecurityScanService.addTask({
							md5: preCheck.md5,
							skillName: result.skillName || detail.skillName || "",
							skillFilePath: preCheck.selectedPath,
							startTime: Date.now()
						});
						return;
					}
					if (!result?.success) {
						console.warn("[deeplink-install][fallback] install failed", {
							skillName: result?.skillName || installName,
							overwrite: usedOverwrite,
							errorKey: result?.errorKey,
							errorMessage: result?.errorMessage
						});
						reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
							skillName: result?.skillName || installName,
							channelType: detail.channelType,
							overwrite: usedOverwrite,
							errorKey: result?.errorKey,
							errorMessage: result?.errorMessage
						});
						showImportSkillError(result?.errorMessage || result?.errorKey || "installFromUrlFailed");
						return;
					}
					if (result.warningMessage || result.warningKey) {
						console.info("[deeplink-install][fallback] install warning", {
							skillName: result.skillName || installName,
							warningKey: result.warningKey,
							warningMessage: result.warningMessage
						});
						reportInstallFlow(SkillUrlInstallFlowStage.InstallWarning, {
							skillName: result.skillName || installName,
							channelType: detail.channelType,
							overwrite: usedOverwrite,
							warningKey: result.warningKey,
							warningMessage: result.warningMessage
						});
						toast.info(result.warningMessage || result.warningKey || "Skill installed with warning.");
					}
					const finalSkillName = result.skillName || installName;
					console.info("[deeplink-install][fallback] install succeeded", {
						skillName: finalSkillName,
						overwrite: usedOverwrite,
						channelType: detail.channelType
					});
					let urlInstalledVersion;
					let urlInstalledSkillId;
					try {
						const matched = ((await personalSkills.list({
							cwd: "",
							global: false,
							excludePluginSkills: true
						})).results || []).find((skill) => skill.name === finalSkillName);
						urlInstalledVersion = matched?.version;
						urlInstalledSkillId = matched?.skillId;
					} catch {}
					reportInstallSucceeded(finalSkillName, detail.channelType, usedOverwrite, urlInstalledVersion, urlInstalledSkillId);
					notifySkillListRefresh();
					toast.success(`Skill ${finalSkillName} has been installed.`);
				} catch (error) {
					console.error("[deeplink-install][error] install threw exception", {
						skillName: installName,
						error
					});
					reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
						skillName: installName,
						channelType: detail.channelType,
						errorKey: "exception",
						errorMessage: error instanceof Error ? error.message : "installFromUrlFailed"
					});
					showImportSkillError(error instanceof Error ? error.message : "installFromUrlFailed");
				}
			});
			return () => {
				unsubscribe();
			};
		}, [
			adapter,
			reportInstallFlow,
			requestSkillInstallIntentConfirm,
			reportInstallSucceeded
		]);
		const handleSkillInstallConfirm = (0, import_react$1.useCallback)(() => {
			resolveSkillInstallIntentConfirm(true);
		}, [resolveSkillInstallIntentConfirm]);
		const handleSkillInstallClose = (0, import_react$1.useCallback)(() => {
			resolveSkillInstallIntentConfirm(false);
		}, [resolveSkillInstallIntentConfirm]);
		const handleRiskDialogClose = (0, import_react$1.useCallback)(() => {
			closeSecurityDialog(true);
		}, [closeSecurityDialog]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
			visible: skillInstallIntentDialogProps.visible,
			title: skillInstallIntentDialogProps.title,
			content: skillInstallIntentDialogProps.content,
			confirmText: skillInstallIntentDialogProps.confirmText,
			cancelText: skillInstallIntentDialogProps.cancelText,
			confirmVariant: skillInstallIntentDialogProps.confirmVariant,
			onConfirm: handleSkillInstallConfirm,
			onClose: handleSkillInstallClose
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
			visible: isRiskDialogVisible,
			title: riskDialogProps.title,
			content: riskDialogProps.content,
			confirmText: riskDialogProps.confirmText,
			cancelText: riskDialogProps.cancelText,
			confirmVariant: riskDialogProps.confirmVariant,
			onConfirm: handleRiskDialogConfirm,
			onClose: handleRiskDialogClose
		})] });
	};
	SkillInstallIntentCoordinator = import_react$1.memo(SkillInstallIntentCoordinatorInner);
	SkillInstallIntentCoordinator.displayName = "SkillInstallIntentCoordinator";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/services.tsx
function SkillsServices() {
	const adapter = useModuleHost().adapter;
	const { notifications: scanResultNotifications, handleUninstall, handleKeep } = useHighRiskNotification();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillInstallIntentCoordinator, { adapter }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazySkillScanResultDialog, {
			notifications: scanResultNotifications,
			onConfirmUninstall: handleUninstall,
			onClose: handleKeep
		})
	})] });
}
var import_react, import_jsx_runtime, LazySkillScanResultDialog;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_module_host_context();
	init_skill_install_intent_coordinator();
	init_use_high_risk_notification();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	LazySkillScanResultDialog = import_react.lazy(() => __vitePreload(() => import("./skill-scan-result-dialog-BlUR01CH.js").then((m) => ({ default: m.SkillScanResultDialog })), __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url));
}))();
export { SkillsServices };
