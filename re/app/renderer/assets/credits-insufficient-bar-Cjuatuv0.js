import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Cq as init_telemetry_context, E as init_contexts, E1 as init_useI18n, G_ as emitCreditsInsufficientAction, K2 as init_environment, L_ as CREDITS_ACTION_KEY_PURCHASE, O1 as useTranslation, U as useAccountService, V3 as useAdapter, X2 as isInternationalVersion, Y_ as init_credits_insufficient_events, aT as openInviteCreditsDialog, jY as init_product_features, lT as toCreditBannerReportPlanType, nT as init_credit_banner, oT as CreditsInsufficientBarView, rT as CREDIT_BANNER_INVITE_ACTION_KEY, tZ as useInternationalBillingFeature, wq as useAgentTelemetry } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/conversation-list/msg-center/credits-insufficient-bar.tsx
/** 积分不足横向提示 bar（对话输入框上方） */
function CreditsInsufficientBar({ message, onClose, onShown, onRetry }) {
	const shownRef = (0, import_react.useRef)(false);
	const { account } = useAccountService();
	const adapter = useAdapter();
	const isInternationalBilling = useInternationalBillingFeature() || isInternationalVersion();
	const t = useTranslation();
	const { reportEvent, Events } = useAgentTelemetry();
	const quotaMode = message.biz_type === "billing.credit_low_5" ? "5pct" : "0pct";
	const [planType, setPlanType] = (0, import_react.useState)(() => toCreditBannerReportPlanType(account?.editionType, isInternationalBilling));
	const [planReady, setPlanReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		adapter?.getAccountUsage?.().then((usage) => {
			if (!cancelled && usage?.editionType) setPlanType(toCreditBannerReportPlanType(usage.editionType, isInternationalBilling));
		}).catch(() => {}).finally(() => {
			if (!cancelled) setPlanReady(true);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter, isInternationalBilling]);
	(0, import_react.useEffect)(() => {
		if (!shownRef.current && planReady) {
			shownRef.current = true;
			onShown(message);
			reportEvent(Events.SubscribeQuotaTrigger, {
				ext1: "show",
				quotaMode,
				type: planType
			});
		}
	}, [
		Events,
		message,
		onShown,
		planReady,
		planType,
		quotaMode,
		reportEvent
	]);
	const isLowInternational = quotaMode === "5pct" && isInternationalBilling;
	const isExhaustedInternational = message.biz_type === "billing.credit_low_0" && isInternationalBilling;
	const isInternationalInviteBanner = isLowInternational || isExhaustedInternational;
	const displayContent = isLowInternational ? t("errorBanner.creditsLow.trialContent") : isExhaustedInternational ? t("errorBanner.creditsExhausted.inviteContent") : message.content || "";
	const actions = message.actions ?? [];
	const purchaseAction = actions.find((a) => a.key === CREDITS_ACTION_KEY_PURCHASE);
	const upgradeAction = actions.find((a) => a.key === "go_upgrade") ?? (isInternationalInviteBanner ? {
		key: "go_upgrade",
		text: t("errorBanner.creditsExhausted.upgrade"),
		type: "url",
		url: "/pricing?embed=1"
	} : void 0);
	const dismissForeverAction = actions.find((a) => a.key === "dismiss_forever");
	const retryAction = actions.find((a) => a.key === "retry");
	const handleDismissForever = (0, import_react.useCallback)(() => {
		reportEvent(Events.SubscribeQuotaTrigger, {
			ext1: "click",
			quotaMode,
			action: "dismiss",
			type: planType
		});
		if (dismissForeverAction) emitCreditsInsufficientAction(dismissForeverAction);
		onClose();
	}, [
		Events,
		dismissForeverAction,
		onClose,
		planType,
		quotaMode,
		reportEvent
	]);
	const handlePurchase = (0, import_react.useCallback)(() => {
		reportEvent(Events.SubscribeQuotaTrigger, {
			ext1: "click",
			quotaMode,
			action: "buy_credits",
			type: planType
		});
		if (purchaseAction) emitCreditsInsufficientAction(purchaseAction);
		onClose();
	}, [
		Events,
		onClose,
		planType,
		purchaseAction,
		quotaMode,
		reportEvent
	]);
	const handleUpgrade = (0, import_react.useCallback)(() => {
		reportEvent(Events.SubscribeQuotaTrigger, {
			ext1: "click",
			quotaMode,
			action: "upgrade",
			type: planType
		});
		if (upgradeAction) emitCreditsInsufficientAction(upgradeAction);
		onClose();
	}, [
		Events,
		onClose,
		planType,
		upgradeAction,
		quotaMode,
		reportEvent
	]);
	const handleClose = (0, import_react.useCallback)(() => {
		reportEvent(Events.SubscribeQuotaTrigger, {
			ext1: "click",
			quotaMode,
			action: "close",
			type: planType
		});
		onClose();
	}, [
		Events,
		onClose,
		planType,
		quotaMode,
		reportEvent
	]);
	const handleInvite = (0, import_react.useCallback)(() => {
		reportEvent(Events.SubscribeQuotaTrigger, {
			ext1: "click",
			quotaMode,
			action: "invite",
			type: planType
		});
		openInviteCreditsDialog();
		onClose();
	}, [
		Events,
		onClose,
		planType,
		quotaMode,
		reportEvent
	]);
	const viewActions = [];
	if (isInternationalInviteBanner) viewActions.push({
		key: CREDIT_BANNER_INVITE_ACTION_KEY,
		text: t("errorBanner.creditsLow.invite"),
		onClick: handleInvite
	});
	if (dismissForeverAction) viewActions.push({
		key: dismissForeverAction.key,
		text: dismissForeverAction.text,
		appearance: "link",
		onClick: handleDismissForever
	});
	if (retryAction && onRetry) viewActions.push({
		key: retryAction.key,
		text: retryAction.text,
		onClick: () => {
			onRetry();
			onClose();
		}
	});
	if (purchaseAction && !isInternationalInviteBanner) viewActions.push({
		key: purchaseAction.key,
		text: purchaseAction.text,
		onClick: handlePurchase
	});
	if (upgradeAction) viewActions.push({
		key: upgradeAction.key,
		text: upgradeAction.text,
		onClick: handleUpgrade
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsInsufficientBarView, {
		content: displayContent,
		actions: viewActions,
		onClose: handleClose
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_product_features();
	init_useI18n();
	init_credit_banner();
	init_telemetry_context();
	init_environment();
	init_credits_insufficient_events();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { CreditsInsufficientBar };
