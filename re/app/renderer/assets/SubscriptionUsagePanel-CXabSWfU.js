import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { D1 as useI18n, E as init_contexts, E1 as init_useI18n, E5 as ScrollLoadMore, E7 as Card, Fv as refreshPlanStateWhenPageVisibleAgain, K2 as init_environment, Mv as init_plan_upgrade, Nv as openCreditsPurchase, O1 as useTranslation, O5 as Progress, O7 as Tag, P5 as Segmented, Pv as openPlanUpgrade, Q9 as WbChevronRightIcon, Qrt as init_common, T0 as init_app_core, TE as formatNumber, V3 as useAdapter, W as useAuth, X2 as isInternationalVersion, c7 as Modal, cit as resolvePackageNameKey, dit as CommodityCode, f3 as wb, jY as init_product_features, krt as Button, lZ as useShowCreditsBalanceFeature, lz as useSettings, m5 as init_src, qT as init_utils, qX as useCreditsEntryFeature, sz as init_SettingsContext } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { Ct as getEditionConfig } from "./locale-utils-TanlkH9x.js";
import { $ as calcRemainPercent, Q as buildCreditGroups, X as GROUPS_SHOW_EXPIRE, Y as CREDIT_GROUP_ORDER, Z as OVERVIEW_METRIC_ORDER, at as resolveCreditGroupPackageCodes, ct as resolveGroupTimeBasis, et as calcUsedPercent, h as resolveCreditsDisplayState, it as resolveCreditGroup, lt as toSafeCount, m as init_credits_display_state, nt as init_subscription_usage_model, ot as resolveExpiryLevel, rt as isCreditResourceExhausted, st as resolveGroupExpiryLevel, tt as formatUsageDateTime, ut as init_SubscriptionUsagePanel$2 } from "./UserMenu-Bs05nlMA.js";
import { t as init_account } from "./account-Cr0cOcaM.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/cancel-auto-renew-model.ts
/**
* 按套餐码推导计费周期。
* 只对确定的商品码给结论，未知码返回 undefined 让 UI 省略周期，不猜。
*/
function resolveBillingCycleKey(packageCode) {
	if (!packageCode) return;
	if (ANNUAL_CODES.includes(packageCode)) return "annual";
	if (MONTHLY_CODES.includes(packageCode)) return "monthly";
}
/**
* 到期日文案：`2027年6月4日`（设计稿口径，不带时分秒）。
* 与页面其他位置的 `formatUsageDateTime`（斜杠 + 时分秒）刻意不同。
*/
function formatRenewDate(timestamp) {
	if (timestamp === void 0 || timestamp === null || timestamp === "") return "--";
	const date = new Date(typeof timestamp === "string" ? Number(timestamp) : timestamp);
	if (Number.isNaN(date.getTime())) return "--";
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
var ANNUAL_CODES, MONTHLY_CODES;
var init_cancel_auto_renew_model = __esmMin((() => {
	init_common();
	ANNUAL_CODES = [CommodityCode.proYear, CommodityCode.proTrialYear];
	MONTHLY_CODES = [
		CommodityCode.proMon,
		CommodityCode.proMonPlus,
		CommodityCode.youth,
		CommodityCode.advanced,
		CommodityCode.flagship,
		CommodityCode.freeMon,
		CommodityCode.freeMonIntl,
		CommodityCode.proTrialMon
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/CancelAutoRenewDialog.tsx
function CancelAutoRenewDialog({ open, account, onSuccess, onClose }) {
	const t = useTranslation();
	const [stage, setStage] = (0, import_react$8.useState)("confirm");
	const [submitting, setSubmitting] = (0, import_react$8.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react$8.useState)("");
	const handleClose = (0, import_react$8.useCallback)(() => {
		setStage("confirm");
		setSubmitting(false);
		setErrorMessage("");
		onClose();
	}, [onClose]);
	/** 返回 false 让 Modal 保持打开：失败要留在弹窗里展示原因，成功/处理中则切到结果态 */
	const handleConfirm = (0, import_react$8.useCallback)(async () => {
		setSubmitting(true);
		setErrorMessage("");
		try {
			const cancelAutoRenew = wb.account.cancelAutoRenew?.bind(wb.account);
			if (!cancelAutoRenew) {
				setErrorMessage("failed");
				return false;
			}
			const result = await cancelAutoRenew();
			if (result.status === "success") {
				setStage("success");
				onSuccess();
				return false;
			}
			if (result.status === "pending") {
				setStage("pending");
				return false;
			}
			setErrorMessage(result.message);
			return false;
		} catch {
			setErrorMessage("failed");
			return false;
		} finally {
			setSubmitting(false);
		}
	}, [onSuccess]);
	if (!open) return null;
	const editionLabel = getEditionConfig(account.editionType).label;
	const cycleKey = resolveBillingCycleKey(account.PackageCode);
	const planText = cycleKey ? `${editionLabel} · ${t(`subscriptionUsage.cancelRenew.cycle.${cycleKey}`)}` : editionLabel;
	const renderConfirm = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		className: "cancel-renew__body",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
				className: "cancel-renew__desc",
				children: account.expireAt ? t("subscriptionUsage.cancelRenew.descWithDate", { date: formatRenewDate(account.expireAt) }) : t("subscriptionUsage.cancelRenew.desc")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("dl", {
				className: "cancel-renew__info",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "cancel-renew__info-item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("dt", { children: t("subscriptionUsage.cancelRenew.currentPlan") }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("dd", { children: planText })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "cancel-renew__info-item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("dt", { children: t("subscriptionUsage.cancelRenew.payMethod") }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("dd", { children: t("subscriptionUsage.cancelRenew.wechatAutoPay") })]
				})]
			}),
			errorMessage && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
				className: "cancel-renew__error",
				children: t("subscriptionUsage.cancelRenew.failed")
			})
		]
	});
	const renderResult = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
		className: "cancel-renew__body",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
			className: "cancel-renew__desc",
			children: stage === "success" ? account.expireAt ? t("subscriptionUsage.cancelRenew.successWithDate", { date: formatRenewDate(account.expireAt) }) : t("subscriptionUsage.cancelRenew.success") : t("subscriptionUsage.cancelRenew.pending")
		})
	});
	const isConfirmStage = stage === "confirm";
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Modal, {
		open: true,
		onOpenChange: (next) => {
			if (!next) handleClose();
		},
		title: isConfirmStage ? t("subscriptionUsage.cancelRenew.title") : t("subscriptionUsage.cancelRenew.resultTitle"),
		size: "small",
		...isConfirmStage ? {
			okText: t("subscriptionUsage.cancelRenew.confirm"),
			cancelText: t("subscriptionUsage.cancelRenew.cancel"),
			okType: "danger",
			confirmLoading: submitting,
			cancelButtonProps: { disabled: submitting },
			onOk: handleConfirm,
			onCancel: handleClose
		} : { footer: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
			variant: "primary",
			size: "medium",
			onClick: handleClose,
			children: t("subscriptionUsage.cancelRenew.gotIt")
		}) },
		closeOnOverlayClick: !submitting,
		className: "cancel-renew-modal",
		children: isConfirmStage ? renderConfirm() : renderResult()
	});
}
var import_react$8, import_jsx_runtime$6;
var init_CancelAutoRenewDialog = __esmMin((() => {
	init_src();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_useI18n();
	init_account();
	init_cancel_auto_renew_model();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/ExpiryTag.tsx
function ExpiryTag({ level }) {
	const t = useTranslation();
	if (!level) return null;
	const isCritical = level === "critical";
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tag, {
		tone: isCritical ? "error" : "warning",
		size: "medium",
		shape: "square",
		children: isCritical ? t("subscriptionUsage.expiry.hours") : t("subscriptionUsage.expiry.days")
	});
}
var import_jsx_runtime$5;
var init_ExpiryTag = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/CreditsBreakdownCard.tsx
function CreditsBreakdownCard({ groups, onViewDetail }) {
	const t = useTranslation();
	const now = Date.now();
	if (groups.length === 0) return null;
	const orderedGroups = CREDIT_GROUP_ORDER.map((kind) => groups.find((group) => group.kind === kind)).filter((group) => !!group);
	const renderExpiryTag = (group) => {
		const level = resolveGroupExpiryLevel(group, now);
		if (!level) return null;
		if (GROUPS_SHOW_EXPIRE.includes(group.kind)) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
			tone: "warning",
			size: "medium",
			shape: "square",
			children: t("subscriptionUsage.expiry.contains")
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ExpiryTag, { level });
	};
	const renderTimeText = (group) => {
		const time = resolveGroupTimeBasis(group);
		if (!time) return null;
		return GROUPS_SHOW_EXPIRE.includes(group.kind) ? t("subscriptionUsage.breakdown.nearestExpireTime", { time: formatUsageDateTime(time) }) : t("subscriptionUsage.breakdown.refreshTime", { time: formatUsageDateTime(time) });
	};
	const renderRow = (group) => {
		const groupName = t(`subscriptionUsage.group.${group.kind}`);
		const timeText = renderTimeText(group);
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "credits-breakdown__row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "credits-breakdown__row-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "credits-breakdown__row-name",
						children: groupName
					}), renderExpiryTag(group)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "credits-breakdown__row-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
						className: "credits-breakdown__row-meta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "credits-breakdown__row-time",
							children: timeText
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
							className: "credits-breakdown__row-usage",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "credits-breakdown__row-used",
								children: t("subscriptionUsage.breakdown.used", {
									used: formatNumber(group.used),
									total: formatNumber(group.total)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "credits-breakdown__row-remain",
								children: t("subscriptionUsage.breakdown.remainPercent", { percent: calcRemainPercent(group.total, group.left) })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Progress, {
						percent: calcUsedPercent(group.total, group.used),
						size: "md",
						shape: "pill",
						tone: "brand",
						"aria-label": groupName
					})]
				}),
				GROUPS_WITH_DETAIL.includes(group.kind) && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
					type: "button",
					className: "credits-breakdown__row-detail",
					onClick: () => onViewDetail(group.kind),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t("subscriptionUsage.breakdown.viewDetail") }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WbChevronRightIcon, { size: 16 })]
				})
			]
		}, group.kind);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("section", {
		className: "credits-breakdown",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "credits-breakdown__title",
			children: t("subscriptionUsage.breakdown.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Card, {
			variant: "flat",
			padding: "medium",
			className: "credits-breakdown__card",
			children: orderedGroups.map(renderRow)
		})]
	});
}
var import_jsx_runtime$4, GROUPS_WITH_DETAIL;
var init_CreditsBreakdownCard = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_utils();
	init_ExpiryTag();
	init_subscription_usage_model();
	import_jsx_runtime$4 = require_jsx_runtime();
	GROUPS_WITH_DETAIL = ["addon", "benefit"];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/credits-detail-model.ts
/**
* 到期时间倒序（最晚到期在前）；缺到期时间的排最后，时间相同按 id 稳定排序。
*
* 与已过期一路的服务端条件 `OrderBy=endTime, SortBy=desc` 同向。仍要在端上排一次：
* 付费 / 免费两路是分别请求后拼接的，各自有序但合并后无序。
*/
function compareByExpireAtDesc(a, b) {
	const expireA = a.expireAt ?? Number.NEGATIVE_INFINITY;
	const expireB = b.expireAt ?? Number.NEGATIVE_INFINITY;
	if (expireA !== expireB) return expireB - expireA;
	return a.id.localeCompare(b.id);
}
/**
* 累加新到的资源包：按资源 ID 去重，新增条目追加到尾部。
*
* 去重是因为服务端翻页在数据边界（同一到期时间跨页、翻页期间有包新失效）会把同一条重复吐回来，
* 重复 id 会让 React key 冲突并出现两条一样的记录。
*
* `sortByExpireAtDesc` 只有「已过期」页签开：它带了服务端排序条件，端上补排是为了消除
* 付费 / 免费两路拼接造成的乱序。「有效期内」不传排序条件，故原样沿用服务端返回顺序。
* 排序只作用于新增的这一页，不整表重排 —— 这里是滚动累加，重排会让新页插到已渲染行上面。
*/
function mergeExpiredCreditPackages(prev, incoming, sortByExpireAtDesc = false) {
	const seen = new Set(prev.map((item) => item.id));
	const appended = incoming.filter((item) => {
		if (!item.id || seen.has(item.id)) return false;
		seen.add(item.id);
		return true;
	});
	if (appended.length === 0) return prev;
	return [...prev, ...sortByExpireAtDesc ? appended.sort(compareByExpireAtDesc) : appended];
}
/**
* 失效包名。取数直接透后端 `PackageName`（运营原文，如「CodeBuddy个人版国内运营裂变包」），
* 而生效中的包走商品码 → i18n key，同一个包在两个页签会显示不同名字。
* 国内版按同一份映射归一，映射缺失时回落原文。
*/
function resolveExpiredPackageName(item, isIntl) {
	if (isIntl) return item.name ?? "";
	return resolvePackageNameKey(item.packageCode) || (item.name ?? "");
}
/**
* 到期预警档位。仅「有效期内」页签给（已过期的包不再预警）。
*
* 额度已用完的包不预警：余量为 0，催用户「3 天内过期」没有意义。
* 判据复用汇总侧的 `isCreditResourceExhausted`，`left` 由 total - used 得出
* （明细项不下发余量），保证与汇总口径一致。
*/
function resolveDetailExpiryLevel(item, now) {
	if (now === void 0) return null;
	const total = toSafeCount(item.total);
	if (isCreditResourceExhausted({
		total,
		left: total - toSafeCount(item.used)
	})) return null;
	return resolveExpiryLevel(item.expireAt, now);
}
/**
* 资源包明细 → 明细行。「有效期内」与「已过期」两个页签共用。
*
* 顺序沿用入参（排序在 `mergeExpiredCreditPackages` 按页做），这里不整表重排。
* `now` 只有「有效期内」传：已过期的包不再预警、也无需再判状态。
*/
function buildPackageDetailRows(packages, kind, isIntl, now) {
	const rows = [];
	for (const item of packages ?? []) {
		if (resolveCreditGroup(item?.packageCode, isIntl) !== kind) continue;
		const total = toSafeCount(item.total);
		const used = toSafeCount(item.used);
		rows.push({
			id: item.id,
			name: resolveExpiredPackageName(item, isIntl),
			expireAtText: item.expireAt === void 0 ? void 0 : formatUsageDateTime(item.expireAt),
			used,
			total,
			usedPercent: calcUsedPercent(total, used),
			expiryLevel: resolveDetailExpiryLevel(item, now),
			expireAt: item.expireAt,
			status: now === void 0 ? "inactive" : "active"
		});
	}
	return rows;
}
/**
* 有效期内的资源包 → 明细行。含已用完但未过期的包（余量 0），由服务端 `OnlyValidPeriod` 保证口径。
*/
function buildValidCreditDetailRows(packages, kind, isIntl, now) {
	return buildPackageDetailRows(packages, kind, isIntl, now);
}
/** 已过期的资源包 → 明细行。已过期不再预警，故不带到期标签。 */
function buildExpiredCreditDetailRows(packages, kind, isIntl) {
	return buildPackageDetailRows(packages, kind, isIntl);
}
var init_credits_detail_model = __esmMin((() => {
	init_common();
	init_subscription_usage_model();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/use-credit-package-pages.ts
function useCreditPackagePages(packageCodes, scene) {
	const { locale } = useI18n();
	const [packages, setPackages] = (0, import_react$5.useState)([]);
	const [isInitialLoading, setIsInitialLoading] = (0, import_react$5.useState)(true);
	const [hasError, setHasError] = (0, import_react$5.useState)(false);
	const nextPageRef = (0, import_react$5.useRef)(1);
	/**
	* 服务端是否还有下一页。
	*
	* 必须独立记住：ScrollLoadMore 只按「返回空数组」判定终止，
	* 最后一页有数据时它仍会再问一次，此时若不拦住就会重复拉同一页。
	*/
	const serverHasMoreRef = (0, import_react$5.useRef)(true);
	/** 已累加的资源，去重用；state 是异步的，同一帧内连续加载读不到最新值 */
	const loadedRef = (0, import_react$5.useRef)([]);
	return {
		packages,
		isInitialLoading,
		hasError,
		loadNextPage: (0, import_react$5.useCallback)(async () => {
			if (!serverHasMoreRef.current) return [];
			const fetchPage = scene === "valid" ? wb.account.validCreditPackages?.bind(wb.account) : wb.account.expiredCreditPackages?.bind(wb.account);
			if (!fetchPage) {
				serverHasMoreRef.current = false;
				setIsInitialLoading(false);
				return [];
			}
			try {
				let appended = [];
				for (let attempt = 0; attempt < MAX_PAGES_PER_REQUEST; attempt++) {
					const page = await fetchPage({
						pageNumber: nextPageRef.current,
						pageSize: 200,
						packageCodes,
						locale
					});
					serverHasMoreRef.current = page.hasMore;
					nextPageRef.current += 1;
					const merged = mergeExpiredCreditPackages(loadedRef.current, page.items, scene === "expired");
					appended = merged.slice(loadedRef.current.length);
					loadedRef.current = merged;
					if (appended.length > 0 || !page.hasMore) break;
				}
				if (appended.length > 0) setPackages(loadedRef.current);
				setHasError(false);
				return appended;
			} catch {
				setHasError(true);
				return [];
			} finally {
				setIsInitialLoading(false);
			}
		}, [
			packageCodes,
			locale,
			scene
		])
	};
}
var import_react$5, MAX_PAGES_PER_REQUEST;
var init_use_credit_package_pages = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_useI18n();
	init_credits_detail_model();
	MAX_PAGES_PER_REQUEST = 5;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/CreditsDetailDialog.tsx
function CreditDetailItem({ row }) {
	const t = useTranslation();
	const name = t(row.name);
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "credits-detail__item",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "credits-detail__item-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "credits-detail__item-name",
					title: name,
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ExpiryTag, { level: row.expiryLevel })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "credits-detail__item-meta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "credits-detail__item-time",
					children: row.expireAtText ? t("subscriptionUsage.expireTime", { time: row.expireAtText }) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "credits-detail__item-usage",
					children: t("subscriptionUsage.breakdown.used", {
						used: formatNumber(row.used),
						total: formatNumber(row.total)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Progress, {
				percent: row.usedPercent,
				size: "md",
				shape: "pill",
				tone: "brand",
				"aria-label": name
			})
		]
	});
}
/**
* 单个页签的列表：ScrollLoadMore 挂载时自动取第一页，滚动到底继续取。
*
* 由父级按页签挂载/卸载，所以「切到本页签才发请求」不需要额外判断。
* 到期档位依赖「当前时刻」，挂载时取一次快照，避免滚动过程中标签跳变。
*/
function CreditPackagesList({ kind, isIntl, scene }) {
	const t = useTranslation();
	const { packages, isInitialLoading, hasError, loadNextPage } = useCreditPackagePages((0, import_react$4.useMemo)(() => resolveCreditGroupPackageCodes(kind, isIntl), [kind, isIntl]), scene);
	const [now] = (0, import_react$4.useState)(() => Date.now());
	const rows = (0, import_react$4.useMemo)(() => scene === "valid" ? buildValidCreditDetailRows(packages, kind, isIntl, now) : buildExpiredCreditDetailRows(packages, kind, isIntl), [
		packages,
		kind,
		isIntl,
		scene,
		now
	]);
	const placeholder = (() => {
		if (isInitialLoading) return null;
		if (rows.length > 0) return null;
		return hasError ? t("subscriptionUsage.detail.loadFailed") : t("subscriptionUsage.detail.empty");
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ScrollLoadMore, {
		className: "credits-detail__list",
		onRequest: loadNextPage,
		children: placeholder ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "credits-detail__empty",
			children: placeholder
		}) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CreditDetailItem, { row }, row.id))
	});
}
/** 弹窗正文。由外层按 kind 重建，切分组时页签与已加载的数据一并归零。 */
function CreditsDetailBody({ kind }) {
	const t = useTranslation();
	const isIntl = isInternationalVersion();
	const [tab, setTab] = (0, import_react$4.useState)("active");
	const options = (0, import_react$4.useMemo)(() => [{
		value: "active",
		label: t("subscriptionUsage.detail.active")
	}, {
		value: "inactive",
		label: t("subscriptionUsage.detail.inactive")
	}], [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "credits-detail__body",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Segmented, {
			options,
			value: tab,
			onChange: setTab,
			size: "small",
			fullWidth: true,
			"aria-label": t("subscriptionUsage.breakdown.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CreditPackagesList, {
			kind,
			isIntl,
			scene: tab === "active" ? "valid" : "expired"
		}, tab)]
	});
}
function CreditsDetailDialog({ kind, onClose }) {
	const t = useTranslation();
	if (!kind) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Modal, {
		open: true,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		title: t("subscriptionUsage.detail.title", { group: t(`subscriptionUsage.group.${kind}`) }),
		size: "small",
		height: 560,
		footer: null,
		className: "credits-detail-modal",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CreditsDetailBody, { kind }, kind)
	});
}
var import_react$4, import_jsx_runtime$3;
var init_CreditsDetailDialog = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_utils();
	init_environment();
	init_credits_detail_model();
	init_ExpiryTag();
	init_subscription_usage_model();
	init_use_credit_package_pages();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/CountUpNumber.tsx
/**
* 值实际会被渲染出几位小数。
*
* 按 formatNumber 的输出判定而不是 String(value)：积分是浮点累加结果，
* `12538.619999999999` 的原始小数位有 12 位、渲染出来只有 2 位（`12,538.62`），
* 按原始位数会让动画多冒一位（`12,538.619`）。
*/
function renderedDecimals(value) {
	if (!Number.isFinite(value)) return 0;
	const fraction = formatNumber(value).split(".")[1];
	return fraction ? fraction.length : 0;
}
/**
* 补间帧按固定位数渲染，保证整段动画小数位数不变。
*
* 不能直接用 formatNumber：它省略尾零，中间值落到 `12538.60` 会渲染成 `12,538.6`，
* 用户看到小数位在 1 / 2 之间跳。位数只在补间帧固定，收尾仍交回 formatNumber，
* 因此不会出现给浮点误差补尾零的 `6,443.000`。
*/
function formatTweenFrame(value, decimals) {
	return Math.max(0, value).toLocaleString("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
}
/**
* @param animationToken 动画授权票；与上次已兑换的值不同时，下一次 target 变化才播动画。
*   token 自身变化不触发动画（授权时接口通常还没回数），未授权的变化直接落值。
* @returns 可直接渲染的字符串
*/
function useCountUpText(target, animationToken = 0, durationMs = DEFAULT_DURATION_MS) {
	const [text, setText] = (0, import_react$3.useState)(() => formatNumber(target));
	/** 当前显示的数值，动画中途 target 再变时从这里接着补，不从上一个目标值起跳 */
	const valueRef = (0, import_react$3.useRef)(target);
	/** 已兑换的票，初始即当前票 —— 首次挂载不播动画 */
	const spentTokenRef = (0, import_react$3.useRef)(animationToken);
	(0, import_react$3.useEffect)(() => {
		const from = valueRef.current;
		if (from === target) return;
		const authorized = animationToken !== spentTokenRef.current;
		spentTokenRef.current = animationToken;
		if (!authorized || typeof requestAnimationFrame !== "function") {
			valueRef.current = target;
			setText(formatNumber(target));
			return;
		}
		const decimals = Math.max(renderedDecimals(from), renderedDecimals(target));
		const factor = Math.pow(10, decimals);
		const startedAt = Date.now();
		let frame = requestAnimationFrame(function step() {
			const progress = Math.min(1, (Date.now() - startedAt) / durationMs);
			if (progress >= 1) {
				valueRef.current = target;
				setText(formatNumber(target));
				return;
			}
			const raw = from + (target - from) * easeOutCubic(progress);
			const next = Math.round(raw * factor) / factor;
			valueRef.current = next;
			setText(formatTweenFrame(next, decimals));
			frame = requestAnimationFrame(step);
		});
		return () => cancelAnimationFrame(frame);
	}, [
		target,
		animationToken,
		durationMs
	]);
	return text;
}
function CountUpNumber({ value, animationToken, durationMs }) {
	const text = useCountUpText(value, animationToken, durationMs);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: text });
}
var import_react$3, import_jsx_runtime$2, DEFAULT_DURATION_MS, easeOutCubic;
var init_CountUpNumber = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_utils();
	import_jsx_runtime$2 = require_jsx_runtime();
	DEFAULT_DURATION_MS = 800;
	easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/SubscriptionOverviewCard.tsx
function SubscriptionOverviewCard({ account, groups, usageFetchStatus, creditsAnimationToken, onUpgradePlan, onBuyCredits, onCancelAutoRenew }) {
	const t = useTranslation();
	const editionConfig = getEditionConfig(account.editionType);
	const creditsState = resolveCreditsDisplayState(usageFetchStatus, account.usageLeft, 100);
	const isIntl = isInternationalVersion();
	const isProEdition = account.editionType === "pro";
	const isFreeEdition = account.editionType === "free";
	const isAutoRenewOn = !isIntl && !isFreeEdition && account.renewFlag === 1;
	const isTrialEdition = !account.editionType || isFreeEdition;
	const showExpireAt = !!account.expireAt && !isTrialEdition;
	const showUpgradePlan = !(isIntl && isProEdition);
	const showBuyCredits = isIntl ? isProEdition || account.editionType === "pro_trial" : !isTrialEdition;
	const metricOrder = isTrialEdition ? OVERVIEW_METRIC_ORDER.filter((kind) => kind !== "planBonus") : OVERVIEW_METRIC_ORDER;
	const groupMap = new Map(groups.map((group) => [group.kind, group]));
	const renderTotalCredits = () => {
		switch (creditsState.kind) {
			case "unlimited": return t("account.credits.unlimited");
			case "success":
			case "stale": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CountUpNumber, {
				value: creditsState.value,
				animationToken: creditsAnimationToken
			});
			default: return "--";
		}
	};
	const renderMetric = (kind) => {
		const left = groupMap.get(kind)?.left ?? 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "subscription-overview__metric",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "subscription-overview__metric-label",
				children: t(`subscriptionUsage.group.${kind}`)
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "subscription-overview__metric-value",
				children: kind === "addon" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CountUpNumber, {
					value: left,
					animationToken: creditsAnimationToken
				}) : formatNumber(left)
			})]
		}, kind);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Card, {
		variant: "flat",
		padding: "medium",
		className: "subscription-overview",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
				className: "subscription-overview__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "subscription-overview__plan",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "subscription-overview__plan-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "subscription-overview__edition",
							children: editionConfig.label
						}), isAutoRenewOn && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tag, {
							tone: "default",
							size: "medium",
							shape: "square",
							children: t("subscriptionUsage.autoRenewOn")
						})]
					}), (showExpireAt || isAutoRenewOn) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "subscription-overview__plan-meta",
						children: [showExpireAt && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("subscriptionUsage.expireTime", { time: formatUsageDateTime(account.expireAt) }) }), isAutoRenewOn && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "subscription-overview__link",
							onClick: onCancelAutoRenew,
							children: t("subscriptionUsage.cancelAutoRenew")
						})]
					})]
				}), showUpgradePlan && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					variant: "primary",
					size: "medium",
					onClick: onUpgradePlan,
					children: account.editionType === "flagship" ? t("account.subscriptionManage") : t("subscriptionUsage.upgradePlan")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "subscription-overview__divider",
				role: "separator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "subscription-overview__body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "subscription-overview__total",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "subscription-overview__total-main",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "subscription-overview__total-value",
							children: renderTotalCredits()
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "subscription-overview__total-label",
							children: t("subscriptionUsage.totalCredits")
						})]
					}), showBuyCredits && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
						variant: "primary",
						size: "medium",
						onClick: onBuyCredits,
						children: t("subscriptionUsage.buyCredits")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "subscription-overview__metrics",
					children: metricOrder.map(renderMetric)
				})]
			})
		]
	});
}
var import_jsx_runtime$1;
var init_SubscriptionOverviewCard = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_utils();
	init_environment();
	init_account();
	init_credits_display_state();
	init_CountUpNumber();
	init_subscription_usage_model();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/use-subscription-usage-account.ts
function useSubscriptionUsageAccount() {
	const { account, hasBilling } = useAuth();
	const adapter = useAdapter();
	const { config } = useSettings();
	const isLocalMode = config.environmentType === "local";
	const isCreditsEntryEnabled = useCreditsEntryFeature();
	const showCreditsBalanceFeature = useShowCreditsBalanceFeature();
	const showCreditsBalance = showCreditsBalanceFeature !== false;
	const canFetchCreditsBalance = isCreditsEntryEnabled && showCreditsBalanceFeature === true;
	const accountIdentityKey = account ? `${account.uid}:${account.enterpriseId ?? ""}:${account.type ?? ""}` : "";
	const latestAccountRef = (0, import_react$1.useRef)(account);
	latestAccountRef.current = account;
	const identityRef = (0, import_react$1.useRef)(accountIdentityKey);
	identityRef.current = accountIdentityKey;
	/**
	* 已 settle 过数据的账号身份。与当前身份相同即说明本次取数是「后台刷新」，
	* 此时退回骨架会让整页刷白（购买成功弹窗自动关闭后最明显），只换数据不动加载态。
	* 账号切换时身份不同，仍走骨架 —— 展示的是另一个人的数据，必须先清空。
	*/
	const settledIdentityRef = (0, import_react$1.useRef)(null);
	const [resolvedAccount, setResolvedAccount] = (0, import_react$1.useState)(() => isLocalMode ? null : account ?? null);
	const [isRefreshing, setIsRefreshing] = (0, import_react$1.useState)(() => isLocalMode);
	const [usageFetchStatus, setUsageFetchStatus] = (0, import_react$1.useState)("loading");
	/** 自增即重跑取数 effect，供操作生效后手动刷新 */
	const [refreshToken, setRefreshToken] = (0, import_react$1.useState)(0);
	const refresh = (0, import_react$1.useCallback)(() => {
		setRefreshToken((token) => token + 1);
	}, []);
	const settle = (0, import_react$1.useCallback)((next, status) => {
		settledIdentityRef.current = identityRef.current;
		setResolvedAccount(next);
		setUsageFetchStatus(status);
		setIsRefreshing(false);
	}, []);
	(0, import_react$1.useEffect)(() => {
		let cancelled = false;
		const currentAccount = latestAccountRef.current;
		if (!currentAccount) {
			settle(null, "loading");
			return () => {
				cancelled = true;
			};
		}
		if (!(settledIdentityRef.current === accountIdentityKey)) {
			if (!isLocalMode) setResolvedAccount(currentAccount);
			setUsageFetchStatus("loading");
			setIsRefreshing(true);
		}
		if (!canFetchCreditsBalance && !isLocalMode) {
			settle(currentAccount, "success");
			return () => {
				cancelled = true;
			};
		}
		if (isLocalMode) {
			Promise.allSettled([adapter?.getAccount?.(), canFetchCreditsBalance ? adapter?.getAccountUsage?.() : Promise.resolve(null)]).then(([accountResult, usageResult]) => {
				if (cancelled) return;
				const nextAccount = accountResult.status === "fulfilled" ? accountResult.value : null;
				const usage = usageResult.status === "fulfilled" ? usageResult.value : null;
				const base = nextAccount || currentAccount;
				const merged = usage ? {
					...base,
					...usage
				} : base;
				const usageOk = !canFetchCreditsBalance || usageResult.status === "fulfilled" && !!usage;
				settle(merged, usageOk ? "success" : "error");
			});
			return () => {
				cancelled = true;
			};
		}
		if (!adapter?.getAccount) {
			settle(currentAccount, "success");
			return () => {
				cancelled = true;
			};
		}
		adapter.getAccount().then((nextAccount) => {
			if (cancelled) return;
			settle(nextAccount ?? currentAccount, nextAccount ? "success" : "error");
		}).catch(() => {
			if (cancelled) return;
			settle(currentAccount, "error");
		});
		return () => {
			cancelled = true;
		};
	}, [
		accountIdentityKey,
		adapter,
		canFetchCreditsBalance,
		isLocalMode,
		settle,
		refreshToken
	]);
	/**
	* 套餐字段同步：取数 effect 只依赖 uid/enterpriseId/type，升级后 editionType 变化不会让它重跑，
	* 页面就会一直停在进入设置页那一刻的版本（#103953）。购买弹窗关闭时 PurchaseModalHost 已经
	* 强制回写过全局账号，这里把权威值合并进本地快照即可，不打接口、不动 usageFetchStatus。
	* 只在拿到有效值时覆盖，避免裸 account 把已 enrich 的版本冲回未决态（同 MenuItems.tsx:177）。
	*/
	(0, import_react$1.useEffect)(() => {
		const authEdition = account?.editionType;
		if (!account || !authEdition) return;
		setResolvedAccount((prev) => {
			if (!prev || prev.uid !== account.uid) return prev;
			if (prev.editionType === authEdition && prev.expireAt === account.expireAt && prev.renewFlag === account.renewFlag) return prev;
			return {
				...prev,
				editionType: authEdition,
				expireAt: account.expireAt ?? prev.expireAt,
				renewFlag: account.renewFlag ?? prev.renewFlag
			};
		});
	}, [account]);
	return {
		account: resolvedAccount,
		isReady: !!resolvedAccount && !isRefreshing,
		usageFetchStatus,
		isCreditsEntryEnabled,
		showCreditsBalance,
		hasBilling,
		isLocalMode,
		refresh
	};
}
var import_react$1;
var init_use_subscription_usage_account = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_product_features();
	init_SettingsContext();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SubscriptionUsagePanel/SubscriptionUsagePanel.tsx
function SubscriptionUsagePanel() {
	const adapter = useAdapter();
	const { account, isReady, usageFetchStatus, isCreditsEntryEnabled, showCreditsBalance, hasBilling, refresh } = useSubscriptionUsageAccount();
	const [detailKind, setDetailKind] = (0, import_react.useState)(null);
	const [cancelRenewOpen, setCancelRenewOpen] = (0, import_react.useState)(false);
	/**
	* 积分增长动画的授权票。只有加量包到账这一次刷新该滚动，
	* 日常消耗、切账号、关闭自动续费等刷新同样会改数值，都必须静态落值。
	*/
	const [creditsAnimationToken, setCreditsAnimationToken] = (0, import_react.useState)(0);
	const handlePurchased = (0, import_react.useCallback)(() => {
		setCreditsAnimationToken((token) => token + 1);
		refresh();
	}, [refresh]);
	/** 国内端内复用头像菜单已挂载的 AddonPurchaseDialog；海外 / 国内 Web 外跳后切回本页再刷新。 */
	const handleBuyCredits = (0, import_react.useCallback)(() => {
		if (openCreditsPurchase({
			source: "subscription_usage_buy_credits",
			onSuccess: handlePurchased,
			adapter
		}) !== "embedModal") refreshPlanStateWhenPageVisibleAgain(handlePurchased);
	}, [adapter, handlePurchased]);
	/**
	* 升级完成后必须刷本页，否则套餐仍显示升级前的版本（#103953）。
	* 端内购买弹窗走 onSuccess，外跳/新标签页拿不到支付结果，用「切回本页」兜底。
	*/
	const handleUpgradePlan = (0, import_react.useCallback)(() => {
		if (openPlanUpgrade({
			source: "upgrade",
			adapter,
			onSuccess: refresh
		}) !== "embedModal") refreshPlanStateWhenPageVisibleAgain(refresh);
	}, [adapter, refresh]);
	const isIntl = isInternationalVersion();
	const groups = (0, import_react.useMemo)(() => buildCreditGroups(account?.resources, isIntl), [account?.resources, isIntl]);
	if (!isCreditsEntryEnabled || !showCreditsBalance || !hasBilling) return null;
	if (account?.enterpriseId) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "subscription-usage-panel",
		children: [
			isReady && account ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionOverviewCard, {
				account,
				groups,
				usageFetchStatus,
				creditsAnimationToken,
				onUpgradePlan: handleUpgradePlan,
				onBuyCredits: handleBuyCredits,
				onCancelAutoRenew: () => setCancelRenewOpen(true)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "subscription-usage-panel__placeholder subscription-usage-panel__placeholder--overview",
				"aria-hidden": "true"
			}),
			isReady && account ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsBreakdownCard, {
				groups,
				onViewDetail: setDetailKind
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "subscription-usage-panel__placeholder subscription-usage-panel__placeholder--breakdown",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsDetailDialog, {
				kind: detailKind,
				onClose: () => setDetailKind(null)
			}),
			account && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CancelAutoRenewDialog, {
				open: cancelRenewOpen,
				account,
				onSuccess: refresh,
				onClose: () => setCancelRenewOpen(false)
			})
		]
	});
}
var import_react, import_jsx_runtime;
var init_SubscriptionUsagePanel$1 = __esmMin((() => {
	init_SubscriptionUsagePanel$2();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_environment();
	init_plan_upgrade();
	init_CancelAutoRenewDialog();
	init_CreditsBreakdownCard();
	init_CreditsDetailDialog();
	init_subscription_usage_model();
	init_SubscriptionOverviewCard();
	init_use_subscription_usage_account();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
__esmMin((() => {
	init_SubscriptionUsagePanel$1();
}))();
export { SubscriptionUsagePanel };
