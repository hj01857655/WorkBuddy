import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $k as init_skills, Ax as init_center, E1 as init_useI18n, GJ as init_use_locale, I1 as t, JJ as useExpertAvatar, KJ as useLocale, LJ as init_quick_prompts, O1 as useTranslation, QJ as init_config, RJ as ExpertQuickPromptList, UJ as init_use_expert_theme, Ub as init_import_security_risk, WJ as useThemeClassName, Wb as runBackgroundExpertImportSecurityCheck, cA as buildSecurityScanDialogProps, d0 as useModuleHost, dA as isSecurityHighRisk, fA as isSecurityScanPending, hA as asyncSecurityScanService, j1 as init_i18n, l0 as init_module_host_context, lA as createPendingSecurityScanResult, mA as useScanResultSubscription, qJ as init_use_expert_avatar, wx as init_context, zJ as ExpertQuickPromptSectionTitle } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, ji as ConfirmDialog, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as init_get_source_url, t as getSourceUrl } from "./get-source-url-DqKERF2y.js";
import { r as subscribePendingExpertInstallIntent, t as init_expert_install_intent_buffer } from "./expert-install-intent-buffer-D3fyZ__V.js";
//#region ../../packages/agent-ui/src/modules/expert/utils/expert-import-errors.ts
function asErrorText(error) {
	return typeof error === "string" ? error.trim() : "";
}
/** 把专家导入失败的 errorKey / errorMessage 映射成用户可见文案。 */
function getLocalizedImportExpertError(error) {
	const raw = asErrorText(error);
	if (!raw) return t("expertCenter.import.failed");
	const lower = raw.toLowerCase();
	if (raw === "duplicate_expert" || lower.includes("already exists") && lower.includes("expert")) return t("expertCenter.import.failed.duplicate");
	if (raw === "invalid_package" || lower.includes("invalid expert") || lower.includes("missing") && lower.includes("plugin.json")) return t("expertCenter.import.failed.invalidPackage");
	if (raw === "security_check_blocked") return t("expertCenter.import.failed.securityCheckBlocked");
	if (raw === "invalid_download_url" || raw === "download_failed") return t("expertCenter.import.failed.download");
	if (raw === "installFromUrlFailed") return t("expertCenter.import.failed");
	if (raw.includes("EXDEV") || lower.includes("cross-device link not permitted")) return t("expertCenter.import.failed.crossDevice");
	if (raw === "extract_failed" || /extract[_ ]failed/i.test(raw)) return t("expertCenter.import.failed.extract");
	return t("expertCenter.import.failed.withReason", { error: raw });
}
function showImportExpertError(error) {
	toast.error(getLocalizedImportExpertError(error));
}
var init_expert_import_errors = __esmMin((() => {
	init_src();
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/expert-install-intent-utils.ts
function isNonHighRiskCompletedResult(result) {
	return !!result.verdict && result.verdict !== "black" && result.riskLevel !== "high" && result.threatLevel < 4;
}
function resolveMetadataText(text, locale) {
	if (!text) return "";
	if (typeof text === "string") return text;
	if (typeof text === "object") {
		const localized = text;
		const preferred = locale === "en" ? localized.en : localized.zh;
		const fallback = locale === "en" ? localized.zh : localized.en;
		return resolveMetadataText(preferred, locale) || resolveMetadataText(fallback, locale) || resolveMetadataText(localized.displayName, locale) || resolveMetadataText(localized.profession, locale) || resolveMetadataText(localized.name, locale) || resolveMetadataText(localized.role, locale) || resolveMetadataText(localized.id, locale);
	}
	return "";
}
function resolveMetadataItems(value, locale) {
	if (!Array.isArray(value)) return [];
	return value.map((item) => resolveMetadataText(item, locale)).filter(Boolean);
}
function resolveShareDetailData(value) {
	if (!value || typeof value !== "object") return null;
	const result = value;
	const data = result.data && typeof result.data === "object" ? result.data : result;
	return data.shareCode || Array.isArray(data.inodes) || data.error ? data : null;
}
function parseMetadataJson(value) {
	if (typeof value !== "string") return value;
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
}
function isExpertShareMetadata(value) {
	return !!value && typeof value === "object" && value.type === "expert";
}
function parseExpertShareMetadata(value, seen = /* @__PURE__ */ new WeakSet()) {
	const parsedValue = parseMetadataJson(value);
	if (isExpertShareMetadata(parsedValue)) return parsedValue;
	if (!parsedValue || typeof parsedValue !== "object") return null;
	if (seen.has(parsedValue)) return null;
	seen.add(parsedValue);
	const detail = parsedValue;
	const directMetadata = parseMetadataJson(detail.metadata ?? detail.shareMetadata);
	if (isExpertShareMetadata(directMetadata)) return directMetadata;
	for (const child of Object.values(parsedValue)) {
		const metadata = parseExpertShareMetadata(child, seen);
		if (metadata) return metadata;
	}
	return null;
}
/** 导入预览仅展示分享包内置头像。 */
function resolveImportInlineAvatar(avatar) {
	if (typeof avatar !== "string" || !avatar) return "";
	if (/^(https?|file|data):/i.test(avatar)) return avatar;
	return "";
}
var SMH_HOST, IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS;
var init_expert_install_intent_utils = __esmMin((() => {
	SMH_HOST = "https://smh26tqjmz2qlj4i.api.tencentsmh.cn";
	IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS = 3e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/expert-import-modal.tsx
var import_react$5, import_react_dom$1, import_jsx_runtime$3, ExpertImportModal;
var init_expert_import_modal = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_config();
	init_use_expert_avatar();
	init_use_locale();
	init_use_expert_theme();
	init_expert_install_intent_utils();
	init_quick_prompts();
	import_jsx_runtime$3 = require_jsx_runtime();
	ExpertImportModal = ({ request, metadata, metadataLoading, loading, onConfirm, onClose, t }) => {
		const locale = useLocale();
		const themeClassName = useThemeClassName();
		const [imageBroken, setImageBroken] = (0, import_react$5.useState)(false);
		const avatarUrl = (0, import_react$5.useMemo)(() => resolveImportInlineAvatar(metadata?.avatar), [metadata?.avatar]);
		const { finalAvatarUrl } = useExpertAvatar(avatarUrl);
		(0, import_react$5.useEffect)(() => {
			setImageBroken(false);
		}, [avatarUrl]);
		if (!request) return null;
		const expertName = resolveMetadataText(metadata?.profession, locale) || resolveMetadataText(metadata?.displayName, locale) || metadata?.expertName || request.expertName;
		const displayName = resolveMetadataText(metadata?.displayName, locale) || metadata?.expertName || request.expertName;
		const description = resolveMetadataText(metadata?.displayDescription, locale) || resolveMetadataText(metadata?.description, locale);
		const modalSubtitle = displayName && displayName !== expertName ? displayName : "";
		const shareAuthor = resolveMetadataText(metadata?.sharedBy, locale) || t("expertCenter.import.defaultSharer");
		const categoryLabel = resolveMetadataText(metadata?.categoryName, locale) || metadata?.categoryId || "";
		const tags = resolveMetadataItems(metadata?.tags, locale);
		const quickPrompts = resolveMetadataItems(metadata?.quickPrompts, locale).concat(resolveMetadataItems(metadata?.triggerPrompts, locale)).slice(0, 10);
		const members = Array.isArray(metadata?.members) ? metadata.members.slice(0, 8) : [];
		const hasPackageSource = !!request.shareCode;
		const isWaitingForMetadata = metadataLoading && !metadata;
		const closeIfIdle = () => {
			if (!loading) onClose();
		};
		const modal = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: `ec-modal-overlay expert-import-modal-overlay ${themeClassName}`.trim(),
			onClick: (event) => {
				event.stopPropagation();
				if (event.target === event.currentTarget) closeIfIdle();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "expert-import-modal-shell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "expert-import-modal-heading",
					children: isWaitingForMetadata ? t("expertCenter.import.loadingTitle") : t("expertCenter.import.sharedBy", { name: shareAuthor })
				}), isWaitingForMetadata ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "ec-modal-card expert-import-modal-card expert-import-loading-card",
					role: "dialog",
					"aria-modal": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
						className: "ec-modal-close",
						onClick: closeIfIdle,
						"aria-label": t("common.close"),
						disabled: loading,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
								x1: "18",
								y1: "6",
								x2: "6",
								y2: "18"
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
								x1: "6",
								y1: "6",
								x2: "18",
								y2: "18"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "expert-import-loading-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "expert-import-loading-spinner",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "expert-import-loading-text",
							children: t("expertCenter.import.loadingContent")
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "ec-modal-card expert-import-modal-card",
					role: "dialog",
					"aria-modal": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
							className: "ec-modal-close",
							onClick: closeIfIdle,
							"aria-label": t("common.close"),
							disabled: loading,
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
									x1: "18",
									y1: "6",
									x2: "6",
									y2: "18"
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
									x1: "6",
									y1: "6",
									x2: "18",
									y2: "18"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "ec-modal-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "ec-modal-avatar",
								children: !imageBroken && finalAvatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
									src: finalAvatarUrl,
									alt: expertName,
									onError: () => setImageBroken(true),
									draggable: false
								}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "ec-modal-avatar-fallback",
									children: expertName.charAt(0)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "ec-modal-info",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "ec-modal-title-row",
									children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "ec-modal-role",
										children: expertName
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "ec-modal-meta",
									children: [
										modalSubtitle && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
											className: "ec-modal-name",
											children: modalSubtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
											className: "ec-modal-category-badge",
											children: metadata?.expertType === "team" ? t("expertCenter.teamBadge") : t("expertCenter.expertBadge")
										}),
										categoryLabel && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
											className: "ec-modal-category-badge",
											children: categoryLabel
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "ec-modal-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "ec-modal-content",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.abilityIntro")
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
										className: "ec-modal-desc",
										children: metadataLoading ? t("expertCenter.loading") : description || t("expertCenter.import.content")
									})]
								}),
								tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "ec-modal-tags-section",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.tagsTitle")
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "ec-modal-tags-list",
										children: tags.map((tag, index) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
											className: "ec-modal-tag-chip",
											children: tag
										}, `tag-${index}-${tag}`))
									})]
								}),
								members.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "ec-modal-team",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.teamMembers")
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "ec-modal-team-list",
										children: members.map((member, index) => {
											const memberName = resolveMetadataText(member, locale);
											if (!memberName) return null;
											const memberAvatarUrl = resolveImportInlineAvatar(member && typeof member === "object" ? member.avatar : void 0);
											return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
												className: "ec-modal-team-member",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
													className: "ec-modal-member-avatar",
													children: memberAvatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
														src: memberAvatarUrl,
														alt: memberName,
														draggable: false
													}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
														className: "ec-modal-member-avatar-placeholder",
														children: memberName.charAt(0)
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
													className: "ec-modal-member-info",
													children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
														className: "ec-modal-member-role",
														children: memberName
													})
												})]
											}, `member-${index}-${memberName}`);
										})
									})]
								}),
								quickPrompts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "ec-modal-quick-prompts",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ExpertQuickPromptSectionTitle, { title: t("expertCenter.quickPromptsTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ExpertQuickPromptList, {
										idPrefix: "expert-import",
										prompts: quickPrompts
									})]
								}),
								!hasPackageSource && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "expert-import-dialog-error",
									children: t("expertCenter.import.missingDownloadUrl")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "ec-modal-footer",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
								className: "ec-modal-summon-btn",
								onClick: onConfirm,
								disabled: !hasPackageSource || loading,
								children: loading ? t("expertCenter.import.importing") : t("expertCenter.import.confirm")
							})
						})
					]
				})]
			})
		});
		return (0, import_react_dom$1.createPortal)(modal, document.body);
	};
})), import_react_dom, import_jsx_runtime$2, ExpertImportSecurityCheckingModal;
var init_expert_import_security_checking_modal = __esmMin((() => {
	require_react();
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_use_expert_theme();
	import_jsx_runtime$2 = require_jsx_runtime();
	ExpertImportSecurityCheckingModal = ({ visible, autoInstallNonHighRisk, onAutoInstallNonHighRiskChange, onSkipInstall, onClose, t }) => {
		const themeClassName = useThemeClassName();
		if (!visible) return null;
		const modal = /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: `ec-modal-overlay expert-import-security-overlay ${themeClassName}`.trim(),
			onClick: (event) => event.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "expert-import-security-card",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "expert-import-security-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
						className: "expert-import-security-close",
						onClick: onClose,
						"aria-label": t("common.close"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
								x1: "18",
								y1: "6",
								x2: "6",
								y2: "18"
							}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
								x1: "6",
								y1: "6",
								x2: "18",
								y2: "18"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						id: "expert-import-security-title",
						className: "expert-import-security-title",
						children: t("expertCenter.import.security.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "expert-import-security-status-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "expert-import-security-hourglass",
							"aria-hidden": true,
							children: "⌛"
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "expert-import-security-status-text",
							children: t("expertCenter.import.security.checking")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "expert-import-security-desc",
						children: t("expertCenter.import.security.description")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("label", {
						className: "expert-import-security-checkbox",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("input", {
							type: "checkbox",
							checked: autoInstallNonHighRisk,
							onChange: (event) => onAutoInstallNonHighRiskChange(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("expertCenter.import.security.autoInstallNonHighRisk") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "expert-import-security-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							className: "expert-import-security-skip-btn",
							onClick: onSkipInstall,
							children: t("expertCenter.import.security.skipInstall")
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "expert-import-security-skip-tip",
							children: t("expertCenter.import.security.skipTip")
						})]
					})
				]
			})
		});
		return (0, import_react_dom.createPortal)(modal, document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/use-expert-import-confirm.ts
function useExpertImportConfirm(options) {
	const { adapter, autoInstallNonHighRisk, detail, hideSecurityCheckingDialog, installFromPathAfterSecurityCheck, isExpertOwnedByCurrentUser, loading, onExpertInstallSuccess, rememberInstalledExpert, reportInstallSucceeded, requestOverwriteConfirm, setAutoInstallNonHighRisk, setExpertImportLoading, setExpertImportRequest, setSecurityState, showSecurityCheckingDialog, skipSecurityInstallWhenReadyRef, startBackgroundImportSecurityCheck, t, toastSuccess } = options;
	return (0, import_react$3.useCallback)(async () => {
		if (!detail || loading) return;
		if (!detail.shareCode) {
			toastSuccess(t("expertCenter.import.missingDownloadUrl"));
			return;
		}
		skipSecurityInstallWhenReadyRef.current = false;
		setSecurityState(null);
		setAutoInstallNonHighRisk(false);
		showSecurityCheckingDialog();
		setExpertImportLoading(true);
		const resolveDownloadUrl = async () => {
			const backend = adapter?.getBackendProvider?.();
			const getShareDetail = backend?.getShareDetail?.bind(backend) ?? adapter?.getShareDetail?.bind(adapter);
			const verifyShare = backend?.verifyShare?.bind(backend) ?? adapter?.verifyShare?.bind(adapter);
			if (!getShareDetail || !verifyShare || !detail.shareCode) return { error: "shareCode resolution is not available in current mode" };
			try {
				const shareDetail = resolveShareDetailData(await getShareDetail(detail.shareCode));
				const inode = shareDetail?.inodes?.[0];
				if (!inode) return { error: shareDetail?.error || "No file inode found in share detail" };
				const verifyRes = await verifyShare({ shareCode: detail.shareCode });
				if ("error" in verifyRes || !verifyRes.accessToken) return { error: "error" in verifyRes ? verifyRes.error : "Failed to verify share" };
				return { url: getSourceUrl(SMH_HOST, detail.shareCode, inode, verifyRes.accessToken) };
			} catch (error) {
				return { error: error instanceof Error ? error.message : String(error) };
			}
		};
		const runInstall = async (downloadUrl, overwrite, securityCheck) => wb.experts.import.fromUrl({
			downloadUrl,
			expertName: detail.expertName,
			overwrite,
			securityCheck
		});
		try {
			const resolved = await resolveDownloadUrl();
			if (!resolved.url) {
				showImportExpertError(resolved.error || "installFromUrlFailed");
				await hideSecurityCheckingDialog();
				return;
			}
			let result = await runInstall(resolved.url, false, true);
			let usedOverwrite = false;
			if (!result?.success && result?.errorKey === "security_check_blocked" && result.preCheck) {
				const preCheck = result.preCheck;
				const scanResult = preCheck.scanResult || createPendingSecurityScanResult(preCheck.md5);
				const nextSecurityState = {
					detail,
					installName: detail.expertName,
					usedOverwrite,
					preCheck,
					scanResult
				};
				setAutoInstallNonHighRisk(false);
				setSecurityState(nextSecurityState);
				if (preCheck.md5 && !scanResult.verdict) {
					asyncSecurityScanService.addTask({
						md5: preCheck.md5,
						skillName: detail.expertName,
						skillFilePath: preCheck.selectedPath,
						startTime: Date.now()
					});
					if (skipSecurityInstallWhenReadyRef.current) {
						skipSecurityInstallWhenReadyRef.current = false;
						installFromPathAfterSecurityCheck({
							isSkipScan: true,
							state: nextSecurityState
						}).catch((error) => {
							console.warn("[App][ExpertImport][security] pending skip install failed", error);
						});
					}
				} else {
					skipSecurityInstallWhenReadyRef.current = false;
					await hideSecurityCheckingDialog();
					if (autoInstallNonHighRisk && isNonHighRiskCompletedResult(scanResult)) installFromPathAfterSecurityCheck({
						isSkipScan: false,
						state: nextSecurityState
					}).catch((error) => {
						console.warn("[App][ExpertImport][security] sync auto install after security result failed", error);
					});
				}
				return;
			}
			if (!result?.success && result?.errorKey === "duplicate_expert") {
				await hideSecurityCheckingDialog();
				const duplicateName = result.expertId || detail.expertName;
				if (!await isExpertOwnedByCurrentUser(duplicateName)) {
					await rememberInstalledExpert(duplicateName);
					reportInstallSucceeded(duplicateName);
					startBackgroundImportSecurityCheck(duplicateName, result.localPath);
					setExpertImportRequest(null);
					onExpertInstallSuccess?.();
					toastSuccess(t("expertCenter.import.success", { name: duplicateName }));
					return;
				}
				if (!await requestOverwriteConfirm(duplicateName)) return;
				usedOverwrite = true;
				const refreshed = await resolveDownloadUrl();
				if (!refreshed.url) {
					showImportExpertError(refreshed.error || "installFromUrlFailed");
					await hideSecurityCheckingDialog();
					return;
				}
				result = await runInstall(refreshed.url, true, true);
				if (!result?.success && result?.errorKey === "security_check_blocked" && result.preCheck) {
					const preCheck = result.preCheck;
					const scanResult = preCheck.scanResult || createPendingSecurityScanResult(preCheck.md5);
					const nextSecurityState = {
						detail,
						installName: detail.expertName,
						usedOverwrite,
						preCheck,
						scanResult
					};
					setAutoInstallNonHighRisk(false);
					setSecurityState(nextSecurityState);
					if (preCheck.md5 && !scanResult.verdict) {
						asyncSecurityScanService.addTask({
							md5: preCheck.md5,
							skillName: detail.expertName,
							skillFilePath: preCheck.selectedPath,
							startTime: Date.now()
						});
						if (skipSecurityInstallWhenReadyRef.current) {
							skipSecurityInstallWhenReadyRef.current = false;
							installFromPathAfterSecurityCheck({
								isSkipScan: true,
								state: nextSecurityState
							}).catch((error) => {
								console.warn("[App][ExpertImport][security] overwrite pending skip install failed", error);
							});
						}
					} else {
						skipSecurityInstallWhenReadyRef.current = false;
						await hideSecurityCheckingDialog();
						if (autoInstallNonHighRisk && isNonHighRiskCompletedResult(scanResult)) installFromPathAfterSecurityCheck({
							isSkipScan: false,
							state: nextSecurityState
						}).catch((error) => {
							console.warn("[App][ExpertImport][security] overwrite sync auto install after security result failed", error);
						});
					}
					return;
				}
			}
			if (!result?.success) {
				showImportExpertError(result?.errorMessage || result?.errorKey || "installFromUrlFailed");
				await hideSecurityCheckingDialog();
				return;
			}
			await hideSecurityCheckingDialog();
			const finalExpertName = result.expertId || detail.expertName;
			await rememberInstalledExpert(result.expertId || finalExpertName);
			reportInstallSucceeded(finalExpertName);
			startBackgroundImportSecurityCheck(finalExpertName, result.localPath);
			setExpertImportRequest(null);
			onExpertInstallSuccess?.();
			toastSuccess(t("expertCenter.import.success", { name: finalExpertName }));
		} catch (error) {
			showImportExpertError(error instanceof Error ? error.message : "installFromUrlFailed");
			await hideSecurityCheckingDialog();
		} finally {
			setExpertImportLoading(false);
		}
	}, [
		adapter,
		autoInstallNonHighRisk,
		detail,
		hideSecurityCheckingDialog,
		installFromPathAfterSecurityCheck,
		isExpertOwnedByCurrentUser,
		loading,
		onExpertInstallSuccess,
		rememberInstalledExpert,
		reportInstallSucceeded,
		requestOverwriteConfirm,
		setAutoInstallNonHighRisk,
		setExpertImportLoading,
		setExpertImportRequest,
		setSecurityState,
		showSecurityCheckingDialog,
		skipSecurityInstallWhenReadyRef,
		startBackgroundImportSecurityCheck,
		t,
		toastSuccess
	]);
}
var import_react$3;
var init_use_expert_import_confirm = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_get_source_url();
	init_skills();
	init_expert_import_errors();
	init_expert_install_intent_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/use-expert-share-metadata.ts
function useExpertShareMetadata(adapter, request) {
	const [metadata, setMetadata] = (0, import_react$2.useState)(null);
	const [loading, setLoading] = (0, import_react$2.useState)(false);
	(0, import_react$2.useEffect)(() => {
		let cancelled = false;
		setMetadata(null);
		if (!request?.shareCode) {
			setLoading(false);
			return;
		}
		const shareCode = request.shareCode;
		const backend = adapter?.getBackendProvider?.();
		const loadMetadata = async () => {
			setLoading(true);
			let nextMetadata = null;
			const getShareDetail = backend?.getShareDetail?.bind(backend) ?? adapter?.getShareDetail?.bind(adapter);
			const verifyShare = backend?.verifyShare?.bind(backend) ?? adapter?.verifyShare?.bind(adapter);
			let shareDetailData = null;
			if (getShareDetail) try {
				const detailResult = await getShareDetail(shareCode);
				shareDetailData = resolveShareDetailData(detailResult);
				nextMetadata = parseExpertShareMetadata(detailResult);
			} catch (error) {
				console.warn("[App][ExpertImport] failed to load share metadata:", error);
			}
			if (!nextMetadata) {
				let previewDownloadUrl;
				if (shareDetailData?.inodes?.[0] && verifyShare) try {
					const verifyRes = await verifyShare({ shareCode });
					const accessToken = "error" in verifyRes ? "" : verifyRes.accessToken;
					previewDownloadUrl = accessToken ? getSourceUrl(SMH_HOST, shareCode, shareDetailData.inodes[0], accessToken) : void 0;
				} catch (error) {
					console.warn("[App][ExpertImport] failed to resolve public preview URL:", error);
				}
				if (previewDownloadUrl) {
					const previewRes = await wb.experts.import.preview({
						downloadUrl: previewDownloadUrl,
						expertName: request.expertName
					});
					if (previewRes?.success && previewRes.metadata) nextMetadata = previewRes.metadata;
				}
			}
			if (!cancelled) {
				setMetadata(nextMetadata);
				setLoading(false);
			}
		};
		loadMetadata().catch((error) => {
			if (!cancelled) {
				console.warn("[App][ExpertImport] failed to load expert preview metadata:", error);
				setMetadata(null);
				setLoading(false);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [adapter, request]);
	return {
		metadata,
		loading
	};
}
var import_react$2;
var init_use_expert_share_metadata = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_get_source_url();
	init_expert_install_intent_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/components/expert-install-intent-coordinator.tsx
var import_react$1, import_jsx_runtime$1, ExpertInstallIntentCoordinatorInner, ExpertInstallIntentCoordinator;
var init_expert_install_intent_coordinator = __esmMin((() => {
	init_center();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_expert_install_intent_buffer();
	init_skills();
	init_context();
	init_expert_import_errors();
	init_import_security_risk();
	init_expert_import_modal();
	init_expert_import_security_checking_modal();
	init_expert_install_intent_utils();
	init_use_expert_import_confirm();
	init_use_expert_share_metadata();
	import_jsx_runtime$1 = require_jsx_runtime();
	ExpertInstallIntentCoordinatorInner = ({ adapter, onExpertInstallSuccess }) => {
		const t = useTranslation();
		const { reporter } = useModuleHost();
		const { reportEvent, Events } = reporter;
		const [expertImportRequest, setExpertImportRequest] = (0, import_react$1.useState)(null);
		const [expertImportLoading, setExpertImportLoading] = (0, import_react$1.useState)(false);
		const { metadata: expertShareMetadata, loading: expertShareMetadataLoading } = useExpertShareMetadata(adapter, expertImportRequest);
		const [securityState, setSecurityState] = (0, import_react$1.useState)(null);
		const [securityCheckingVisible, setSecurityCheckingVisible] = (0, import_react$1.useState)(false);
		const [autoInstallNonHighRisk, setAutoInstallNonHighRisk] = (0, import_react$1.useState)(false);
		const [highRiskCountdown, setHighRiskCountdown] = (0, import_react$1.useState)(0);
		const [overwriteRequest, setOverwriteRequest] = (0, import_react$1.useState)(null);
		const overwriteResolverRef = (0, import_react$1.useRef)(null);
		const skipSecurityInstallWhenReadyRef = (0, import_react$1.useRef)(false);
		const securityDialogShownAtRef = (0, import_react$1.useRef)(null);
		const reportInstallSucceeded = (0, import_react$1.useCallback)((expertName) => {
			reportEvent(Events.ExpertImportSuccess, {
				id: expertName,
				name: expertName,
				expertType: typeof expertShareMetadata?.expertType === "string" ? expertShareMetadata.expertType : "custom",
				triggerSource: "share_link",
				version: typeof expertShareMetadata?.version === "string" ? expertShareMetadata.version : ""
			});
		}, [
			Events,
			expertShareMetadata?.expertType,
			expertShareMetadata?.version,
			reportEvent
		]);
		const rememberInstalledExpert = (0, import_react$1.useCallback)(async (expertId) => {
			if (!expertId) return;
			try {
				await wb.experts.custom.addUser({ expertIds: [expertId] });
				console.info("[App][ExpertImport] added expert to user list", { expertId });
			} catch (error) {
				console.warn("[App][ExpertImport] failed to add expert to user list", error);
			}
		}, []);
		const isExpertOwnedByCurrentUser = (0, import_react$1.useCallback)(async (expertId) => {
			if (!expertId) return true;
			try {
				return (await wb.experts.custom.list()).items.some((expert) => expert.id === expertId);
			} catch (error) {
				console.warn("[App][ExpertImport] failed to check current user expert ownership", error);
				return true;
			}
		}, []);
		const startBackgroundImportSecurityCheck = (0, import_react$1.useCallback)((expertId, expertRootDir) => {
			if (!expertId || !expertRootDir) return;
			runBackgroundExpertImportSecurityCheck({
				expertId,
				expertRootDir
			}).catch(() => void 0);
		}, []);
		(0, import_react$1.useEffect)(() => {
			asyncSecurityScanService.setAdapter(adapter);
		}, [adapter]);
		const requestOverwriteConfirm = (0, import_react$1.useCallback)((expertName) => new Promise((resolve) => {
			if (overwriteResolverRef.current) overwriteResolverRef.current(false);
			overwriteResolverRef.current = resolve;
			setOverwriteRequest(expertName);
		}), []);
		const resolveOverwriteConfirm = (0, import_react$1.useCallback)((confirmed) => {
			const resolver = overwriteResolverRef.current;
			overwriteResolverRef.current = null;
			setOverwriteRequest(null);
			resolver?.(confirmed);
		}, []);
		const showSecurityCheckingDialog = (0, import_react$1.useCallback)(() => {
			securityDialogShownAtRef.current = Date.now();
			setSecurityCheckingVisible(true);
		}, []);
		const hideSecurityCheckingDialog = (0, import_react$1.useCallback)(async () => {
			const shownAt = securityDialogShownAtRef.current;
			const elapsed = shownAt ? Date.now() - shownAt : IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS;
			if (elapsed < 3e3) await new Promise((resolve) => setTimeout(resolve, IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS - elapsed));
			securityDialogShownAtRef.current = null;
			setSecurityCheckingVisible(false);
		}, []);
		const closeSecurityDialog = (0, import_react$1.useCallback)((cancelPendingTask) => {
			setSecurityState((prev) => {
				if (cancelPendingTask && prev?.scanResult.verdict === "" && prev.preCheck.md5) asyncSecurityScanService.removeTask(prev.preCheck.md5);
				return null;
			});
			securityDialogShownAtRef.current = null;
			setSecurityCheckingVisible(false);
			setAutoInstallNonHighRisk(false);
			skipSecurityInstallWhenReadyRef.current = false;
		}, []);
		const installFromPathAfterSecurityCheck = (0, import_react$1.useCallback)(async (options) => {
			const activeSecurityState = options.state ?? securityState;
			if (!activeSecurityState?.preCheck.selectedPath) return;
			const { isSkipScan, suppressSuccessToast = false } = options;
			const { detail, preCheck, installName, usedOverwrite } = activeSecurityState;
			const pendingMd5 = isSkipScan && preCheck.md5 ? preCheck.md5 : void 0;
			console.info("[App][ExpertImport][security] install from checked path start", {
				expertName: detail.expertName,
				installName,
				md5: preCheck.md5,
				selectedPath: preCheck.selectedPath,
				isSkipScan,
				suppressSuccessToast,
				usedOverwrite
			});
			if (isSkipScan) closeSecurityDialog(false);
			const runInstall = async (overwrite) => wb.experts.import.fromPath({
				zipPath: preCheck.selectedPath,
				expertName: detail.expertName,
				overwrite
			});
			try {
				let result = await runInstall(usedOverwrite);
				console.info("[App][ExpertImport][security] install from checked path result", {
					success: !!result?.success,
					expertId: result?.expertId,
					localPath: result?.localPath,
					errorKey: result?.errorKey,
					errorMessage: result?.errorMessage,
					overwrite: usedOverwrite
				});
				if (!result?.success && result?.errorKey === "duplicate_expert" && !usedOverwrite) {
					const duplicateName = result.expertId || detail.expertName;
					if (!await isExpertOwnedByCurrentUser(duplicateName)) {
						if (pendingMd5) asyncSecurityScanService.updateTask(pendingMd5, {
							skillName: duplicateName,
							skillFilePath: result.localPath || preCheck.selectedPath
						});
						await rememberInstalledExpert(duplicateName);
						reportInstallSucceeded(duplicateName);
						closeSecurityDialog(false);
						setExpertImportRequest(null);
						onExpertInstallSuccess?.();
						toast.success(t("expertCenter.import.success", { name: duplicateName }));
						return;
					}
					if (!await requestOverwriteConfirm(duplicateName)) return;
					result = await runInstall(true);
					console.info("[App][ExpertImport][security] overwrite install from checked path result", {
						success: !!result?.success,
						expertId: result?.expertId,
						localPath: result?.localPath,
						errorKey: result?.errorKey,
						errorMessage: result?.errorMessage
					});
				}
				if (!result?.success) {
					if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
					showImportExpertError(result?.errorMessage || result?.errorKey || "installFromUrlFailed");
					return;
				}
				if (pendingMd5) asyncSecurityScanService.updateTask(pendingMd5, {
					skillName: result.expertId || detail.expertName,
					skillFilePath: result.localPath || preCheck.selectedPath
				});
				const finalExpertName = result.expertId || detail.expertName;
				await rememberInstalledExpert(result.expertId || finalExpertName);
				reportInstallSucceeded(finalExpertName);
				closeSecurityDialog(false);
				setExpertImportRequest(null);
				onExpertInstallSuccess?.();
				toast.success(t("expertCenter.import.success", { name: finalExpertName }));
			} catch (error) {
				if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
				showImportExpertError(error instanceof Error ? error.message : "installFromUrlFailed");
			}
		}, [
			closeSecurityDialog,
			isExpertOwnedByCurrentUser,
			onExpertInstallSuccess,
			rememberInstalledExpert,
			reportInstallSucceeded,
			requestOverwriteConfirm,
			securityState,
			t
		]);
		const isPendingAsync = isSecurityScanPending(securityState);
		const isHighRisk = isSecurityHighRisk(securityState);
		const pendingScanMd5 = isPendingAsync ? securityState?.preCheck.md5 || null : null;
		const onPendingScanArrived = (0, import_react$1.useCallback)((result) => {
			console.info("[App][ExpertImport][security] pending scan result arrived", {
				md5: result.md5,
				verdict: result.verdict,
				riskLevel: result.riskLevel,
				threatLevel: result.threatLevel,
				staticAnalysisStatus: result.staticAnalysisStatus
			});
			setSecurityState((prev) => {
				if (!prev || prev.preCheck.md5 !== result.md5) {
					console.warn("[App][ExpertImport][security] ignore scan result: state mismatch", {
						resultMd5: result.md5,
						stateMd5: prev?.preCheck.md5,
						hasState: !!prev
					});
					return prev;
				}
				return {
					...prev,
					scanResult: result
				};
			});
			if (autoInstallNonHighRisk && isNonHighRiskCompletedResult(result)) {
				console.info("[App][ExpertImport][security] non-high-risk result arrived, continue install automatically", {
					md5: result.md5,
					verdict: result.verdict,
					riskLevel: result.riskLevel,
					autoInstallNonHighRisk
				});
				installFromPathAfterSecurityCheck({ isSkipScan: false }).catch((error) => {
					console.warn("[App][ExpertImport][security] auto install after security result failed", error);
				});
			}
		}, [autoInstallNonHighRisk, installFromPathAfterSecurityCheck]);
		useScanResultSubscription(pendingScanMd5, onPendingScanArrived);
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
			console.info("[App][ExpertImport][security] dialog confirm", {
				md5: securityState.preCheck.md5,
				verdict: securityState.scanResult.verdict,
				riskLevel: securityState.scanResult.riskLevel,
				threatLevel: securityState.scanResult.threatLevel,
				isPendingAsync,
				highRiskCountdown
			});
			if (isPendingAsync) {
				installFromPathAfterSecurityCheck({ isSkipScan: true }).catch((error) => {
					console.warn("[App][ExpertImport][security] skip scan install failed", error);
				});
				return;
			}
			if (highRiskCountdown > 0) return;
			installFromPathAfterSecurityCheck({ isSkipScan: false }).catch((error) => {
				console.warn("[App][ExpertImport][security] continue risk install failed", error);
			});
		}, [
			highRiskCountdown,
			installFromPathAfterSecurityCheck,
			isPendingAsync,
			securityState
		]);
		const handleSkipSecurityCheckInstall = (0, import_react$1.useCallback)(() => {
			if (securityState && isPendingAsync) {
				handleRiskDialogConfirm();
				return;
			}
			skipSecurityInstallWhenReadyRef.current = true;
		}, [
			handleRiskDialogConfirm,
			isPendingAsync,
			securityState
		]);
		const riskDialogProps = (0, import_react$1.useMemo)(() => buildSecurityScanDialogProps({
			state: securityState,
			highRiskCountdown,
			t
		}), [
			highRiskCountdown,
			securityState,
			t
		]);
		const handleExpertImportConfirm = useExpertImportConfirm({
			adapter,
			autoInstallNonHighRisk,
			detail: expertImportRequest,
			hideSecurityCheckingDialog,
			installFromPathAfterSecurityCheck,
			isExpertOwnedByCurrentUser,
			loading: expertImportLoading,
			onExpertInstallSuccess,
			rememberInstalledExpert,
			reportInstallSucceeded,
			requestOverwriteConfirm,
			setAutoInstallNonHighRisk,
			setExpertImportLoading,
			setExpertImportRequest,
			setSecurityState,
			showSecurityCheckingDialog,
			skipSecurityInstallWhenReadyRef,
			startBackgroundImportSecurityCheck,
			t,
			toastSuccess: (message) => toast.success(message)
		});
		const handleExpertInstallIntent = (0, import_react$1.useCallback)((data) => {
			const detail = data;
			if (!detail?.expertName || !detail.shareCode) {
				console.warn("[App][ExpertInstallIntent] ignore invalid intent payload", detail);
				return;
			}
			setExpertImportRequest(detail);
		}, []);
		(0, import_react$1.useEffect)(() => {
			const unsubscribePending = subscribePendingExpertInstallIntent(handleExpertInstallIntent);
			if (!adapter) return unsubscribePending;
			const unsubscribeAdapter = adapter.on("expert-install-intent", handleExpertInstallIntent);
			return () => {
				unsubscribeAdapter();
				unsubscribePending();
			};
		}, [adapter, handleExpertInstallIntent]);
		const overwriteDialogProps = (0, import_react$1.useMemo)(() => ({
			visible: !!overwriteRequest,
			title: t("expertCenter.import.overwrite.title"),
			content: t("expertCenter.import.overwrite.content", { name: overwriteRequest || "" }),
			confirmText: t("expertCenter.import.overwrite.confirm"),
			cancelText: t("common.cancel"),
			confirmVariant: "danger"
		}), [overwriteRequest, t]);
		const handleExpertImportModalClose = (0, import_react$1.useCallback)(() => {
			setExpertImportRequest(null);
		}, []);
		const handleOverwriteConfirm = (0, import_react$1.useCallback)(() => {
			resolveOverwriteConfirm(true);
		}, [resolveOverwriteConfirm]);
		const handleOverwriteClose = (0, import_react$1.useCallback)(() => {
			resolveOverwriteConfirm(false);
		}, [resolveOverwriteConfirm]);
		const handleSecurityCheckingClose = (0, import_react$1.useCallback)(() => {
			closeSecurityDialog(true);
		}, [closeSecurityDialog]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertImportModal, {
				request: expertImportRequest,
				metadata: expertShareMetadata,
				metadataLoading: expertShareMetadataLoading,
				loading: expertImportLoading,
				onConfirm: handleExpertImportConfirm,
				onClose: handleExpertImportModalClose,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
				visible: overwriteDialogProps.visible,
				title: overwriteDialogProps.title,
				content: overwriteDialogProps.content,
				confirmText: overwriteDialogProps.confirmText,
				cancelText: overwriteDialogProps.cancelText,
				confirmVariant: overwriteDialogProps.confirmVariant,
				onConfirm: handleOverwriteConfirm,
				onClose: handleOverwriteClose
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertImportSecurityCheckingModal, {
				visible: securityCheckingVisible && (!securityState || isPendingAsync),
				autoInstallNonHighRisk,
				onAutoInstallNonHighRiskChange: setAutoInstallNonHighRisk,
				onSkipInstall: handleSkipSecurityCheckInstall,
				onClose: handleSecurityCheckingClose,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
				visible: !!securityState && !isPendingAsync,
				title: riskDialogProps.title,
				content: riskDialogProps.content,
				confirmText: riskDialogProps.confirmText,
				cancelText: riskDialogProps.cancelText,
				confirmVariant: "primary",
				confirmButtonColor: "var(--cb-button-dark-background)",
				onConfirm: handleRiskDialogConfirm,
				onClose: handleSecurityCheckingClose,
				confirmDisabled: isHighRisk && highRiskCountdown > 0
			})
		] });
	};
	ExpertInstallIntentCoordinator = import_react$1.memo(ExpertInstallIntentCoordinatorInner);
	ExpertInstallIntentCoordinator.displayName = "ExpertInstallIntentCoordinator";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/services.tsx
function ExpertServices() {
	const host = useModuleHost();
	const handleExpertInstallSuccess = import_react.useCallback(() => {
		window.dispatchEvent(new Event("workbuddy:open-my-experts"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertInstallIntentCoordinator, {
		adapter: host.adapter,
		onExpertInstallSuccess: handleExpertInstallSuccess
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_module_host_context();
	init_expert_install_intent_coordinator();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ExpertServices };
