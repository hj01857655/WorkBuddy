import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, $a as buildConfirmedData, A7 as Input, Cq as init_telemetry_context, E as init_contexts, E1 as init_useI18n, IQ as getAccountSubtitle, J7 as XCloseIcon, K2 as init_environment, Ka as createRemotePoiMapService, LQ as init_account, O1 as useTranslation, Qa as usePoiMapService, TE as formatNumber, Ua as poiMapServiceMock, V3 as useAdapter, Va as init_service, W as useAuth, Wa as createRemotePoiStorage, X2 as isInternationalVersion, Xa as PoiServiceProvider, Za as init_poi_service_context, aZ as useNicknameEditFeature, ad as init_common, ao as AddressCascader, c7 as Modal, co as locationToFormValue, eo as init_use_geocode_validate, f0 as useOptionalModuleHost, io as init_AddressCascader, jY as init_product_features, krt as Button, lZ as useShowCreditsBalanceFeature, lo as usePoi, lz as useSettings, m5 as init_src, nZ as useManageCenterEntryFeature, oD as init_open_web_with_login, qT as init_utils, qX as useCreditsEntryFeature, sD as openWebWithLogin, so as init_use_poi, sz as init_SettingsContext, to as useGeocodeValidate, wE as formatDateTime, wq as useAgentTelemetry, zQ as shouldUseRealAvatar, znt as CheckIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Ei as toast, Ev as require_react, Tv as require_jsx_runtime, ha as WarnIcon, ji as ConfirmDialog, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { Ct as getEditionConfig } from "./locale-utils-TanlkH9x.js";
import { A as AccountAvatar, C as showLogoutConfirmDialog, J as init_menu_icons, L as AmbassadorAvatarWrapper, R as AmbassadorBadge, U as CreditsErrorIcon, W as CreditsLoadingIcon, a as init_useAmbassadorStatus, g as shouldShowLowCreditsWarning, h as resolveCreditsDisplayState, m as init_credits_display_state, o as useAmbassadorStatus, z as init_AmbassadorBadge } from "./UserMenu-Bs05nlMA.js";
import { n as usePoiMapFeature, t as init_use_poi_map_feature } from "./use-poi-map-feature-z4YCXlLm.js";
import { n as EditionBadge, t as init_account$1 } from "./account-Cr0cOcaM.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/AccountPanel.less
var init_AccountPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/AccountCreditsSection.tsx
function AccountCreditsSection({ billingAccount, hasBilling, isCreditsEntryEnabled, isMemberInfoReady, readyMemberAccount, showCreditsBalance, t, usageFetchStatus, onViewUsageDetails }) {
	const isEnterpriseUser = !!(billingAccount.enterpriseId && billingAccount.enterpriseId !== "");
	if (!isCreditsEntryEnabled || !showCreditsBalance || !hasBilling || !isEnterpriseUser) return null;
	const creditsState = resolveCreditsDisplayState(usageFetchStatus, billingAccount.usageLeft, 100);
	const isUsageFailedNoCache = creditsState.kind === "failed-no-cache";
	const isUnlimited = creditsState.kind === "unlimited";
	const showLowCreditsWarning = shouldShowLowCreditsWarning(creditsState);
	const usageLeft = creditsState.kind === "success" || creditsState.kind === "stale" ? creditsState.value : null;
	const usageTotal = billingAccount.usageTotal && billingAccount.usageTotal !== "unlimited" ? parseFloat(billingAccount.usageTotal) : 0;
	const editionConfig = getEditionConfig(billingAccount.editionType);
	const renderCreditsNumber = () => {
		switch (creditsState.kind) {
			case "failed-no-cache": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
				content: t("account.credits.fetchFailedDesc"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
					className: "account-panel__credits-number account-panel__credits-number--failed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CreditsErrorIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t("account.credits.fetchFailed") })]
				})
			});
			case "loading": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
				content: t("account.credits.fetchLoadingDesc"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
					className: "account-panel__credits-number account-panel__credits-number--loading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CreditsLoadingIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t("account.credits.fetchLoading") })]
				})
			});
			case "stale": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
				content: t("account.credits.staleDesc"),
				placement: "top",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
					className: "account-panel__credits-number-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "account-panel__credits-number",
						children: formatNumber(creditsState.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "account-panel__credits-stale-badge",
						children: t("account.credits.stale")
					})]
				})
			});
			case "success": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: `account-panel__credits-number ${creditsState.isLow ? "account-panel__credits-number--low" : ""}`,
				children: formatNumber(creditsState.value)
			});
			case "unlimited": return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "account-panel__credits-number",
				children: t("account.credits.unlimited")
			});
		}
	};
	const renderCreditsSummary = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "account-panel__credits-summary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "account-panel__credits-label",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CreditsIcon, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: "Credits" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
					className: "account-panel__view-details-btn",
					onClick: onViewUsageDetails,
					children: t("account.viewDetails")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "account-panel__credits-value",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "account-panel__credits-hint",
				children: t("account.credits.accumulatedRemaining")
			}), renderCreditsNumber()]
		})]
	});
	const renderFailedWarning = () => isUsageFailedNoCache && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "account-panel__credits-warning account-panel__credits-warning--fetch-failed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WarnIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t("account.credits.fetchFailedDesc") })]
	});
	const renderEnterpriseWarning = () => showLowCreditsWarning && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "account-panel__credits-warning",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WarnIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: (usageLeft ?? 0) <= 0 ? t("account.credits.exhaustedEnterprise") : t("account.credits.insufficientEnterprise") })]
	});
	const lowUsageLabelClassName = `account-panel__plan-usage-label ${showLowCreditsWarning ? "account-panel__plan-usage-label--low" : ""}`;
	const lowUsageValueClassName = `account-panel__plan-usage-value account-panel__plan-usage-value--highlight ${showLowCreditsWarning ? "account-panel__plan-usage-value--low" : ""}`;
	const formatEnterpriseRemaining = () => {
		if (isUnlimited) return t("account.credits.unlimited");
		if (usageLeft !== null) return formatNumber(usageLeft);
		return "--";
	};
	const renderEnterpriseQuotaCard = () => (usageTotal > 0 || isUnlimited) && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "account-panel__plan-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "account-panel__plan-info",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "account-panel__plan-name",
				children: t("account.credits.monthlyQuota")
			}), readyMemberAccount?.refreshAt && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "account-panel__plan-date",
				children: [
					t("account.credits.billingCycle"),
					": ",
					formatDateTime(readyMemberAccount.refreshAt)
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "account-panel__plan-usage",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "account-panel__plan-usage-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
					className: "account-panel__plan-usage-label",
					children: [t("account.credits.total"), ":"]
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "account-panel__plan-usage-value",
					children: isUnlimited ? t("account.credits.unlimited") : formatNumber(usageTotal)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "account-panel__plan-usage-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
					className: lowUsageLabelClassName,
					children: [t("account.credits.remaining"), ":"]
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: lowUsageValueClassName,
					children: formatEnterpriseRemaining()
				})]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		className: `account-panel__credits-section ${!isMemberInfoReady ? "account-panel__credits-section--pending" : ""}`,
		children: readyMemberAccount ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "account-panel__edition-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "account-panel__edition-label",
					children: editionConfig.label
				})
			}),
			readyMemberAccount.expireAt && billingAccount.editionType !== "free" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "account-panel__edition-expiry",
				children: [
					t("account.credits.planExpiryTime"),
					"：",
					formatDateTime(readyMemberAccount.expireAt)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__plan-divider" }),
			isEnterpriseUser && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
				renderCreditsSummary(),
				renderFailedWarning(),
				renderEnterpriseWarning(),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__plan-divider" }),
				renderEnterpriseQuotaCard()
			] })
		] }) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "account-panel__member-placeholder",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__placeholder-line account-panel__placeholder-line--title" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__plan-divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__placeholder-line account-panel__placeholder-line--content" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__placeholder-line account-panel__placeholder-line--warning" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "account-panel__plan-divider" })
			]
		})
	});
}
var import_jsx_runtime$4, CREDITS_ICON_PATH, CreditsIcon;
var init_AccountCreditsSection = __esmMin((() => {
	init_src$1();
	require_react();
	init_utils();
	init_account$1();
	init_credits_display_state();
	init_menu_icons();
	import_jsx_runtime$4 = require_jsx_runtime();
	CREDITS_ICON_PATH = [
		"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813",
		"a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12",
		"l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035",
		"a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456",
		"L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259",
		"a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183",
		"a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423",
		"l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394",
		"a2.25 2.25 0 00-1.423 1.423z"
	].join("");
	CreditsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "#A3A3A3",
		strokeWidth: "1.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", { d: CREDITS_ICON_PATH })
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/components/LocationEditModal.less
var init_LocationEditModal$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/components/LocationEditModal.tsx
function LocationEditModal({ open, onOpenChange, entry, initialValue, service, onSaved, storageOverride }) {
	const t = useTranslation();
	const resolvedService = usePoiMapService(service);
	const { location, addEntry, updateEntry } = usePoi(storageOverride);
	const { options, optionsLoading, error, clearError, validateAndBuild } = useGeocodeValidate();
	const [form, setForm] = (0, import_react$4.useState)(initialValue ?? EMPTY_FORM);
	const [submitting, setSubmitting] = (0, import_react$4.useState)(false);
	const [pendingResult, setPendingResult] = (0, import_react$4.useState)(null);
	(0, import_react$4.useEffect)(() => {
		if (open) {
			setForm(initialValue ?? EMPTY_FORM);
			clearError();
		}
	}, [
		open,
		initialValue,
		clearError
	]);
	const updateField = (key, value) => {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
		if (error) clearError();
	};
	const regionEmpty = form.region.length === 0;
	const detailEmpty = form.detailAddress.trim().length === 0;
	const contactNameEmpty = form.contactName.trim().length === 0;
	const contactPhoneEmpty = form.contactPhone.trim().length === 0;
	const phoneInvalid = !contactPhoneEmpty && !/^1[3-9]\d{9}$/.test(form.contactPhone.trim());
	const okDisabled = regionEmpty || detailEmpty || contactNameEmpty || contactPhoneEmpty || phoneInvalid || optionsLoading;
	const handleOk = async () => {
		if (okDisabled) return false;
		setSubmitting(true);
		try {
			const result = await validateAndBuild(form, resolvedService, location.location_auth_status);
			if (!result) return false;
			setPendingResult(result);
			return false;
		} finally {
			setSubmitting(false);
		}
	};
	const handleConfirmGeocode = () => {
		if (!pendingResult) return;
		const data = buildConfirmedData(pendingResult);
		if (entry?.id) updateEntry(entry.id, data);
		else addEntry(data);
		setPendingResult(null);
		onSaved?.(data);
		onOpenChange(false);
	};
	const handleRejectGeocode = () => {
		setPendingResult(null);
	};
	const bannerStatus = error === "configError" || error === "tempFailed" ? error : null;
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Modal, {
		open,
		onOpenChange,
		title: t("settings.locationModal.title"),
		size: "medium",
		okText: t("settings.locationModal.save"),
		cancelText: t("settings.locationModal.cancel"),
		okButtonProps: { disabled: okDisabled },
		confirmLoading: submitting,
		onOk: handleOk,
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "poi-location-modal",
			children: [
				bannerStatus && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "poi-location-modal__banner",
					role: "alert",
					children: bannerStatus === "configError" ? t("poi.geocode.configError") : t("poi.geocode.tempFailed")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "poi-location-modal__field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-location-modal__label",
						children: t("settings.locationModal.region")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AddressCascader, {
						options,
						value: form.region,
						onChange: (value) => updateField("region", value),
						placeholder: t("settings.locationModal.regionPlaceholder"),
						fullWidth: true,
						disabled: optionsLoading,
						portalRoot: "body"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "poi-location-modal__field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-location-modal__label",
						children: t("settings.locationModal.detail")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "poi-location-modal__field-value",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
							value: form.detailAddress,
							onChange: (e) => updateField("detailAddress", e.target.value),
							placeholder: t("settings.locationModal.detailPlaceholder"),
							status: error === "unrecognized" ? "error" : void 0
						}), error === "unrecognized" && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "poi-location-modal__error",
							children: t("poi.geocode.unrecognized")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "poi-location-modal__field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-location-modal__label",
						children: t("settings.locationModal.contactName")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
						value: form.contactName,
						onChange: (e) => updateField("contactName", e.target.value),
						placeholder: t("settings.locationModal.contactNamePlaceholder")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "poi-location-modal__field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-location-modal__label",
						children: t("settings.locationModal.contactPhone")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "poi-location-modal__field-value",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
							value: form.contactPhone,
							onChange: (e) => updateField("contactPhone", e.target.value),
							placeholder: t("settings.locationModal.contactPhonePlaceholder"),
							status: phoneInvalid ? "error" : void 0
						}), phoneInvalid && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "poi-location-modal__error",
							children: t("poi.form.phoneInvalid")
						})]
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ConfirmDialog, {
		visible: pendingResult !== null,
		title: t("poi.geocode.confirmTitle"),
		content: t("poi.geocode.confirmContent", { address: [
			pendingResult?.geocodeResult.addressComponents?.province,
			pendingResult?.geocodeResult.addressComponents?.city,
			pendingResult?.geocodeResult.addressComponents?.district,
			pendingResult?.geocodeResult.title
		].filter(Boolean).join(" ") }),
		confirmText: t("poi.geocode.confirmOk"),
		cancelText: t("poi.geocode.confirmCancel"),
		onConfirm: handleConfirmGeocode,
		onClose: handleRejectGeocode
	})] });
}
var import_react$4, import_jsx_runtime$3, EMPTY_FORM;
var init_LocationEditModal = __esmMin((() => {
	init_LocationEditModal$1();
	init_src$1();
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_AddressCascader();
	init_poi_service_context();
	init_use_poi();
	init_use_geocode_validate();
	import_jsx_runtime$3 = require_jsx_runtime();
	EMPTY_FORM = {
		region: [],
		detailAddress: "",
		contactName: "",
		contactPhone: ""
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/components/index.ts
var init_components = __esmMin((() => {
	init_LocationEditModal();
	init_use_geocode_validate();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/AccountLocationSection.tsx
function AccountLocationSection() {
	const t = useTranslation();
	const host = useOptionalModuleHost();
	const poiFacade = host?.facades.poi;
	const poiService = (0, import_react$3.useMemo)(() => poiFacade ? createRemotePoiMapService(poiFacade) : poiMapServiceMock, [poiFacade]);
	const remoteStorage = (0, import_react$3.useMemo)(() => poiFacade && host?.storage ? createRemotePoiStorage(poiFacade, host.storage) : void 0, [poiFacade, host?.storage]);
	const { entries, deleteEntry, setActiveEntry, activeEntryId, refreshBook } = usePoi(remoteStorage);
	(0, import_react$3.useEffect)(() => {
		refreshBook();
	}, [remoteStorage]);
	const [showLocationModal, setShowLocationModal] = (0, import_react$3.useState)(false);
	const [editingEntry, setEditingEntry] = (0, import_react$3.useState)(void 0);
	const [deletingEntryId, setDeletingEntryId] = (0, import_react$3.useState)(null);
	const handleEdit = (entry) => {
		setEditingEntry(entry);
		setShowLocationModal(true);
	};
	const handleAddNew = () => {
		setEditingEntry(void 0);
		setShowLocationModal(true);
	};
	const handleDeleteConfirm = () => {
		if (deletingEntryId) {
			deleteEntry(deletingEntryId);
			refreshBook();
		}
		setDeletingEntryId(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "account-panel__location-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "account-panel__location-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "account-panel__location-title",
					children: t("settings.account.location.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "account-panel__location-subtitle",
					children: t("settings.account.location.description")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "account-panel__location-list",
				children: [entries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: entries.map((entry) => {
					const isActiveEntry = entry.id === activeEntryId;
					return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "account-panel__location-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "account-panel__location-info",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "account-panel__location-name",
									children: entry.manual_location_detail || entry.location_name || entry.location_address || ""
								}),
								entry.manual_location_region && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "account-panel__location-region",
									children: entry.manual_location_region.replace(/\//g, " ")
								}),
								(entry.contact_name || entry.contact_phone) && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "account-panel__location-contact",
									children: [entry.contact_name, entry.contact_phone].filter(Boolean).join("  ")
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "account-panel__location-actions",
							children: [
								isActiveEntry ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
									className: "account-panel__location-default-tag",
									children: t("settings.account.location.defaultLabel")
								}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
									type: "button",
									className: "account-panel__location-set-default-btn",
									onClick: () => {
										setActiveEntry(entry.id ?? null);
									},
									children: t("settings.account.location.setDefault")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
									type: "button",
									className: "account-panel__location-icon-btn",
									title: t("settings.account.location.modify"),
									onClick: () => handleEdit(entry),
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 16 16",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
											d: "M11.586 2a2 2 0 0 1 2.828 2.828L5.828 13.414 2 14l.586-3.828L11.586 2Z",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinejoin: "round"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
									type: "button",
									className: "account-panel__location-icon-btn account-panel__location-icon-btn--danger",
									title: t("settings.account.location.clear"),
									onClick: () => setDeletingEntryId(entry.id ?? null),
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 16 16",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
											d: "M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333h8L12.667 4H3.333Z",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})
								})
							]
						})]
					}, entry.id);
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "account-panel__location-empty-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "account-panel__location-empty",
						children: t("settings.account.location.empty")
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					className: "account-panel__location-add-row",
					onClick: handleAddNew,
					children: t("settings.account.location.addNew")
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(PoiServiceProvider, {
			service: poiService,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LocationEditModal, {
				open: showLocationModal,
				onOpenChange: setShowLocationModal,
				entry: editingEntry,
				initialValue: editingEntry ? locationToFormValue(editingEntry) : void 0,
				storageOverride: remoteStorage,
				onSaved: () => {
					refreshBook();
				}
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ConfirmDialog, {
			visible: deletingEntryId !== null,
			title: t("settings.account.location.clearConfirmTitle"),
			content: t("settings.account.location.clearConfirmContent"),
			confirmText: t("common.confirm"),
			cancelText: t("common.cancel"),
			onConfirm: handleDeleteConfirm,
			onClose: () => setDeletingEntryId(null)
		})
	] });
}
var import_react$3, import_jsx_runtime$2;
var init_AccountLocationSection = __esmMin((() => {
	init_src$1();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_common();
	init_components();
	init_service();
	init_use_poi();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/use-account-nickname-edit.ts
function hasControlCharacter(value) {
	for (let index = 0; index < value.length; index += 1) {
		const charCode = value.charCodeAt(index);
		if (charCode <= 31 || charCode === 127) return true;
	}
	return false;
}
function validateNicknameInput(value, currentNickname, t) {
	const normalized = value.trim();
	if (!normalized) return t("account.nickname.emptyError");
	if (normalized.length > 20) return t("account.nickname.tooLongError", {
		current: normalized.length,
		max: 20
	});
	if (hasControlCharacter(normalized)) return t("account.nickname.invalidCharError");
	if (normalized === currentNickname.trim()) return t("account.nickname.sameError");
	return null;
}
function getModerationBlockMessage(verdict, t) {
	if (!verdict) return t("account.nickname.moderationBlocked");
	return t("account.nickname.moderationBlockedWithReason", { reason: verdict });
}
function useAccountNicknameEdit({ account, adapter, t, onNicknameUpdated, refreshAccount }) {
	const { reportEvent, Events } = useAgentTelemetry();
	const [isEditingNickname, setIsEditingNickname] = (0, import_react$2.useState)(false);
	const [nicknameDraft, setNicknameDraft] = (0, import_react$2.useState)("");
	const [nicknameError, setNicknameError] = (0, import_react$2.useState)(null);
	const [isNicknameSubmitting, setIsNicknameSubmitting] = (0, import_react$2.useState)(false);
	const reportFail = (0, import_react$2.useCallback)((stage, reason, extra) => {
		const payload = {
			stage,
			reason,
			account_type: account?.type ?? "",
			...extra?.errorMessage ? { error_message: extra.errorMessage } : {},
			...extra?.moderationVerdict ? { moderation_verdict: extra.moderationVerdict } : {}
		};
		reportEvent(Events.AccountNicknameEditFail, payload);
	}, [
		Events,
		account?.type,
		reportEvent
	]);
	const beginNicknameEdit = (0, import_react$2.useCallback)(() => {
		const enterEdit = (nextAccount) => {
			setNicknameDraft((nextAccount ?? account)?.nickname ?? "");
			setNicknameError(null);
			setIsEditingNickname(true);
		};
		if (!refreshAccount) {
			enterEdit();
			return;
		}
		refreshAccount().then(enterEdit).catch(() => enterEdit());
	}, [account, refreshAccount]);
	const cancelNicknameEdit = (0, import_react$2.useCallback)(() => {
		setIsEditingNickname(false);
		setNicknameDraft("");
		setNicknameError(null);
	}, []);
	const runSubmitNickname = (0, import_react$2.useCallback)(async () => {
		if (!account) return;
		const validationError = validateNicknameInput(nicknameDraft, account.nickname || "", t);
		if (validationError) {
			setNicknameError(validationError);
			reportFail("validation", validationError);
			return;
		}
		if (!adapter?.updateAccountNickname) {
			const error = t("account.nickname.unsupportedError");
			setNicknameError(error);
			reportFail("unsupported", "unsupported", { errorMessage: error });
			return;
		}
		const nextNickname = nicknameDraft.trim();
		setIsNicknameSubmitting(true);
		setNicknameError(null);
		try {
			const moderation = await adapter.checkModeration?.({
				text: nextNickname,
				scene: "nickname"
			});
			if (moderation?.pass === false) {
				const error = getModerationBlockMessage(moderation.verdict, t);
				setNicknameError(error);
				reportFail("moderation", moderation.verdict || "blocked", {
					errorMessage: error,
					moderationVerdict: moderation.verdict
				});
				return;
			}
			const result = await adapter.updateAccountNickname(nextNickname);
			if (!result.success) {
				const error = result.error || t("account.nickname.updateFailed");
				setNicknameError(error);
				reportFail("api", "update_failed", { errorMessage: error });
				return;
			}
			onNicknameUpdated(result.nickname || nextNickname);
			setIsEditingNickname(false);
			setNicknameDraft("");
			toast({
				message: t("account.nickname.updateSuccess"),
				type: "success"
			});
			reportEvent(Events.AccountNicknameEditSuccess, { account_type: account.type ?? "" });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : t("account.nickname.updateFailed");
			setNicknameError(errorMessage);
			reportFail("exception", "exception", { errorMessage });
		} finally {
			setIsNicknameSubmitting(false);
		}
	}, [
		Events,
		account,
		adapter,
		nicknameDraft,
		onNicknameUpdated,
		reportEvent,
		reportFail,
		t
	]);
	const submitNickname = (0, import_react$2.useCallback)(() => {
		runSubmitNickname().catch((error) => {
			const errorMessage = error instanceof Error ? error.message : t("account.nickname.updateFailed");
			setNicknameError(errorMessage);
			reportFail("exception", "exception", { errorMessage });
		});
	}, [
		reportFail,
		runSubmitNickname,
		t
	]);
	const nicknameValidationError = isEditingNickname && account ? validateNicknameInput(nicknameDraft, account.nickname || "", t) : null;
	const nicknameVisibleError = nicknameValidationError === t("account.nickname.sameError") ? null : nicknameValidationError;
	return {
		beginNicknameEdit,
		cancelNicknameEdit,
		isEditingNickname,
		isNicknameSubmitting,
		nicknameDraft,
		nicknameError,
		nicknameSubmitDisabled: isNicknameSubmitting || !!nicknameValidationError,
		nicknameVisibleError,
		setNicknameDraft,
		setNicknameError,
		submitNickname
	};
}
var import_react$2;
var init_use_account_nickname_edit = __esmMin((() => {
	init_src$1();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_telemetry_context();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/AccountNicknameEditor.tsx
function AccountNicknameEditor({ canEdit, displayName, draft, error, isEditing, isSubmitting, submitDisabled, t, onBeginEdit, onCancelEdit, onDraftChange, onSubmit }) {
	const inputRef = (0, import_react$1.useRef)(null);
	(0, import_react$1.useEffect)(() => {
		if (isEditing) inputRef.current?.select();
	}, [isEditing]);
	if (canEdit && isEditing) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
		className: "account-panel__nickname-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
				ref: inputRef,
				className: error ? "account-panel__nickname-input account-panel__nickname-input--error" : "account-panel__nickname-input",
				value: draft,
				maxLength: 21,
				autoFocus: true,
				disabled: isSubmitting,
				"aria-label": t("account.nickname.inputLabel"),
				onChange: (event) => onDraftChange(event.target.value),
				onKeyDown: (event) => {
					if (event.key !== "Enter" && event.key !== "Escape" && event.key !== "Esc") return;
					event.preventDefault();
					event.stopPropagation();
					if (event.key === "Enter") {
						if (!submitDisabled) onSubmit();
						return;
					}
					if (!isSubmitting) onCancelEdit();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				className: "account-panel__nickname-action account-panel__nickname-action--confirm",
				disabled: submitDisabled,
				onClick: onSubmit,
				"aria-label": isSubmitting ? t("account.nickname.reviewing") : t("common.confirm"),
				title: isSubmitting ? t("account.nickname.reviewing") : t("common.confirm"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CheckIcon, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				className: "account-panel__nickname-action account-panel__nickname-action--cancel",
				disabled: isSubmitting,
				onClick: onCancelEdit,
				"aria-label": t("common.cancel"),
				title: t("common.cancel"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(XCloseIcon, { size: 16 })
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
		className: "account-panel__username-text",
		children: displayName
	}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
		type: "button",
		className: "account-panel__nickname-edit",
		title: t("account.nickname.edit"),
		onClick: onBeginEdit,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M11.586 2a2 2 0 0 1 2.828 2.828L5.828 13.414 2 14l.586-3.828L11.586 2Z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			})
		})
	})] });
}
var import_react$1, import_jsx_runtime$1;
var init_AccountNicknameEditor = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_use_account_nickname_edit();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/AccountPanel.tsx
function getAccountDisplayName(account) {
	return account.displayName || account.enterpriseUserName || account.nickname || account.uid || "";
}
function isSameAccountIdentity(left, right) {
	return !!left && !!right && left.uid === right.uid && (left.enterpriseId ?? "") === (right.enterpriseId ?? "") && (left.type ?? "") === (right.type ?? "");
}
/**
* Account Panel
* 基于 prototype page-settings.html
*/
function AccountPanel({ onSignOut }) {
	const { account, hasBilling, login, logout } = useAuth();
	const adapter = useAdapter();
	const t = useTranslation();
	const { config } = useSettings();
	const isLocalMode = config.environmentType === "local";
	const navigateMain = config.onNavigateMain;
	const isAmbassador = useAmbassadorStatus(adapter, account?.uid);
	const isCreditsEntryEnabled = useCreditsEntryFeature();
	const isNicknameEditEnabled = useNicknameEditFeature() !== false;
	const poiMapEnabled = usePoiMapFeature();
	const isManageCenterEntryEnabled = useManageCenterEntryFeature();
	const showCreditsBalanceFeature = useShowCreditsBalanceFeature();
	const showCreditsBalance = showCreditsBalanceFeature !== false;
	const canFetchCreditsBalance = isCreditsEntryEnabled && showCreditsBalanceFeature === true;
	const accountIdentityKey = account ? `${account.uid}:${account.enterpriseId ?? ""}:${account.type ?? ""}` : "";
	const latestAccountRef = (0, import_react.useRef)(account);
	latestAccountRef.current = account;
	const hasAccountPanelSnapshot = isSameAccountIdentity(accountPanelAccountSnapshot, account);
	const [refreshedAccount, setRefreshedAccount] = (0, import_react.useState)(() => hasAccountPanelSnapshot ? accountPanelAccountSnapshot : isLocalMode ? null : account);
	const [isMemberInfoRefreshing, setIsMemberInfoRefreshing] = (0, import_react.useState)(() => isLocalMode && !hasAccountPanelSnapshot);
	const [usageFetchStatus, setUsageFetchStatus] = (0, import_react.useState)(() => hasAccountPanelSnapshot ? "success" : "loading");
	const memberAccount = refreshedAccount || (hasAccountPanelSnapshot ? accountPanelAccountSnapshot : null);
	const visibleAccount = memberAccount || account;
	const syncLatestAccount = (0, import_react.useCallback)(async () => {
		const currentAccount = latestAccountRef.current;
		if (!currentAccount || !adapter?.getAccount) return currentAccount;
		try {
			await adapter.refreshSession?.().catch(() => void 0);
			const nextAccount = await adapter.getAccount();
			if (!nextAccount) return null;
			if (!isSameAccountIdentity(latestAccountRef.current, currentAccount)) return latestAccountRef.current;
			const snapshotBase = isSameAccountIdentity(accountPanelAccountSnapshot, currentAccount) ? accountPanelAccountSnapshot : currentAccount;
			const mergedAccount = isSameAccountIdentity(nextAccount, currentAccount) ? {
				...snapshotBase,
				...nextAccount
			} : nextAccount;
			accountPanelAccountSnapshot = mergedAccount;
			setRefreshedAccount(mergedAccount);
			return mergedAccount;
		} catch {
			return currentAccount;
		}
	}, [adapter]);
	const handleNicknameUpdated = (0, import_react.useCallback)((nickname) => {
		const currentAccount = latestAccountRef.current;
		if (!currentAccount) return;
		if (isSameAccountIdentity(accountPanelAccountSnapshot, currentAccount)) accountPanelAccountSnapshot = {
			...accountPanelAccountSnapshot,
			nickname
		};
		setRefreshedAccount((prev) => prev ? {
			...prev,
			nickname
		} : prev);
	}, []);
	const nicknameEdit = useAccountNicknameEdit({
		account: visibleAccount,
		adapter: adapter ?? null,
		t,
		onNicknameUpdated: handleNicknameUpdated,
		refreshAccount: syncLatestAccount
	});
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const currentAccount = latestAccountRef.current;
		if (!currentAccount) {
			accountPanelAccountSnapshot = null;
			setRefreshedAccount(null);
			setIsMemberInfoRefreshing(false);
			setUsageFetchStatus("loading");
			return () => {
				cancelled = true;
			};
		}
		const hasSnapshotForCurrentAccount = isSameAccountIdentity(accountPanelAccountSnapshot, currentAccount);
		if (!isLocalMode && !hasSnapshotForCurrentAccount) {
			accountPanelAccountSnapshot = currentAccount;
			setRefreshedAccount(currentAccount);
		}
		const updateSnapshot = (nextAccount) => {
			accountPanelAccountSnapshot = nextAccount;
			if (!cancelled) setRefreshedAccount(nextAccount);
		};
		if (isLocalMode && hasSnapshotForCurrentAccount) setRefreshedAccount(accountPanelAccountSnapshot);
		setIsMemberInfoRefreshing(isLocalMode && !hasSnapshotForCurrentAccount);
		if (!cancelled) setUsageFetchStatus("loading");
		if (!canFetchCreditsBalance && !isLocalMode) {
			updateSnapshot(currentAccount);
			if (!cancelled) {
				setUsageFetchStatus("success");
				setIsMemberInfoRefreshing(false);
			}
			return () => {
				cancelled = true;
			};
		}
		if (isLocalMode) Promise.allSettled([adapter?.getAccount?.(), canFetchCreditsBalance ? adapter?.getAccountUsage?.() : Promise.resolve(null)]).then(([accountResult, usageResult]) => {
			if (cancelled) return;
			if (accountResult.status === "rejected") console.error("[AccountPanel] getAccount failed:", accountResult.reason);
			if (usageResult.status === "rejected") console.error("[AccountPanel] getAccountUsage failed:", usageResult.reason);
			const newAccount = accountResult.status === "fulfilled" ? accountResult.value : null;
			const usage = usageResult.status === "fulfilled" ? usageResult.value : null;
			const baseAccount = newAccount || accountPanelAccountSnapshot || currentAccount;
			let nextAccount = baseAccount;
			if (usage) nextAccount = {
				...baseAccount,
				...usage
			};
			updateSnapshot(nextAccount);
			setUsageFetchStatus(!canFetchCreditsBalance || usageResult.status === "fulfilled" && usage ? "success" : "error");
		}).catch((error) => {
			if (cancelled) return;
			console.error("[AccountPanel] getAccount failed:", error);
			if (!accountPanelAccountSnapshot) updateSnapshot(currentAccount);
			setUsageFetchStatus("error");
		}).finally(() => {
			if (!cancelled) setIsMemberInfoRefreshing(false);
		});
		else if (adapter?.getAccount) adapter.getAccount().then((newAccount) => {
			if (cancelled) return;
			if (newAccount) {
				updateSnapshot(newAccount);
				setUsageFetchStatus("success");
			} else setUsageFetchStatus("error");
		}).catch((error) => {
			if (cancelled) return;
			console.error("[AccountPanel] getAccount failed:", error);
			setUsageFetchStatus("error");
		}).finally(() => {
			if (!cancelled) setIsMemberInfoRefreshing(false);
		});
		else {
			updateSnapshot(currentAccount);
			if (!cancelled) {
				setUsageFetchStatus("success");
				setIsMemberInfoRefreshing(false);
			}
		}
		return () => {
			cancelled = true;
		};
	}, [
		accountIdentityKey,
		adapter,
		canFetchCreditsBalance,
		isLocalMode
	]);
	const isMemberInfoReady = !!memberAccount && !isMemberInfoRefreshing;
	/**
	* 退出登录：走与头像下拉菜单同一份二次确认（#111914）。
	* 弹窗本体（标题 / 描述 / 按钮 / × 出口）在 `showLogoutConfirmDialog`，
	* 这里只提供确认后的收尾逻辑，不再自持 `showLogoutConfirm` state。
	*
	* 独立设置窗口（`onNavigateMain` 已注入）把登出委托给主窗口执行：本窗口自带
	* AuthProvider 与 overlay 单例，自己执行会把全屏 loading 挂到本窗口，而本窗口
	* 在账号清空时立即自关，遮罩随之消失、主窗口全程无反馈。投递失败时回落本地执行，
	* 保证功能不因跨窗口通道不可用而丢失。
	*
	* 两条路径都在收尾时调 `onSignOut`（独立窗口即关窗）：确认动作发生在本窗口，
	* 不能等 auth 广播回来才关，否则用户会停留在已失效的设置界面。
	*/
	const handleSignOut = () => {
		const runLocalLogout = async () => {
			await logout();
			accountPanelAccountSnapshot = null;
			setRefreshedAccount(null);
			onSignOut?.();
		};
		showLogoutConfirmDialog({
			isLocalMode,
			onConfirm: async () => {
				if (!navigateMain) {
					await runLocalLogout();
					return;
				}
				try {
					await navigateMain({ route: "logout" });
				} catch (error) {
					console.error("[AccountPanel] delegate logout to main window failed:", error);
					await runLocalLogout();
					return;
				}
				onSignOut?.();
			}
		});
	};
	const openUrl = (path) => {
		if (isLocalMode) {
			if (adapter) openWebWithLogin(adapter, { target: path });
		} else window.open(path, "_blank");
	};
	const handleViewUsageDetails = () => {
		openUrl(CREDITS_DETAIL_URL);
	};
	const handleManageCenter = () => {
		openUrl(isInternationalVersion() ? CREDITS_DETAIL_URL : PLAN_UPGRADE_URL);
	};
	const handleLogin = async () => {
		try {
			await login();
		} catch (error) {
			console.error("[AccountPanel] Login failed:", error);
		}
	};
	const hasEnterpriseUserName = !!visibleAccount?.enterpriseUserName;
	const canEditNickname = !!visibleAccount && isLocalMode && isNicknameEditEnabled && !hasEnterpriseUserName;
	if (!account) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "account-panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "account-panel__not-logged-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("account.notLoggedIn") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "account-panel__login-btn",
				onClick: handleLogin,
				children: t("account.signIn")
			})]
		})
	});
	const displayAccount = visibleAccount ?? account;
	const displayName = getAccountDisplayName(displayAccount);
	/**
	* 设置页保持旧兜底逻辑：真实头像为空或加载失败时，回退 enterpriseLogo，再回退首字母。
	*/
	const realAvatarSrc = isWorkBuddy() && shouldUseRealAvatar(displayAccount) ? displayAccount.avatarUrl : void 0;
	const accountAvatar = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountAvatar, {
		sources: [realAvatarSrc, displayAccount.enterpriseLogo],
		size: 40,
		alt: displayName,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "account-panel__avatar-placeholder",
			children: displayName.charAt(0).toUpperCase()
		})
	});
	const subtitle = getAccountSubtitle(displayAccount, displayName, t("account.personalEdition"));
	const billingAccount = memberAccount || account;
	const readyMemberAccount = isMemberInfoReady ? memberAccount : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "account-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "account-panel__header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "account-panel__avatar",
						children: isAmbassador ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbassadorAvatarWrapper, { children: accountAvatar }) : accountAvatar
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "account-panel__user-info",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "account-panel__username",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountNicknameEditor, {
										canEdit: canEditNickname,
										displayName,
										draft: nicknameEdit.nicknameDraft,
										error: nicknameEdit.nicknameVisibleError || nicknameEdit.nicknameError,
										isEditing: nicknameEdit.isEditingNickname,
										isSubmitting: nicknameEdit.isNicknameSubmitting,
										submitDisabled: nicknameEdit.nicknameSubmitDisabled,
										t,
										onBeginEdit: nicknameEdit.beginNicknameEdit,
										onCancelEdit: nicknameEdit.cancelNicknameEdit,
										onDraftChange: (value) => {
											nicknameEdit.setNicknameDraft(value);
											nicknameEdit.setNicknameError(null);
										},
										onSubmit: nicknameEdit.submitNickname
									}),
									isAmbassador && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbassadorBadge, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "account-panel__badge-slot",
										children: readyMemberAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditionBadge, {
											editionType: readyMemberAccount.editionType,
											className: "account-panel__badge"
										})
									})
								]
							}),
							(nicknameEdit.nicknameVisibleError || nicknameEdit.nicknameError) && nicknameEdit.isEditingNickname && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "account-panel__nickname-error",
								children: nicknameEdit.nicknameError || nicknameEdit.nicknameVisibleError
							}),
							subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "account-panel__email",
								children: subtitle
							})
						]
					}),
					isManageCenterEntryEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "medium",
						onClick: handleManageCenter,
						"data-track-id": "click_goto_admin_center",
						"data-track-name": "前往管理中心",
						children: t("account.manageCenter")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCreditsSection, {
				billingAccount,
				hasBilling,
				isCreditsEntryEnabled,
				isMemberInfoReady,
				readyMemberAccount,
				showCreditsBalance,
				t,
				usageFetchStatus,
				onViewUsageDetails: handleViewUsageDetails
			}),
			poiMapEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLocationSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "account-panel__actions-footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "large",
					fullWidth: true,
					onClick: handleSignOut,
					children: t("account.signOut")
				})
			})
		]
	});
}
var import_react, import_jsx_runtime, CREDITS_DETAIL_URL, PLAN_UPGRADE_URL, accountPanelAccountSnapshot;
//#endregion
__esmMin((() => {
	init_AccountPanel$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_product_features();
	init_use_poi_map_feature();
	init_useI18n();
	init_utils();
	init_account();
	init_environment();
	init_open_web_with_login();
	init_account$1();
	init_AmbassadorBadge();
	init_useAmbassadorStatus();
	init_SettingsContext();
	init_AccountCreditsSection();
	init_AccountLocationSection();
	init_AccountNicknameEditor();
	init_use_account_nickname_edit();
	import_jsx_runtime = require_jsx_runtime();
	CREDITS_DETAIL_URL = "/profile/plans-usage";
	PLAN_UPGRADE_URL = "/profile/plan";
	accountPanelAccountSnapshot = null;
}))();
export { AccountPanel };
