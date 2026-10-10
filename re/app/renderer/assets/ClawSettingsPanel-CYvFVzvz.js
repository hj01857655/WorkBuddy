import { n as __esmMin, s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, A7 as Input, AF as getAdminDisabledSpecialChannels, AR as useClawControl, BX as useChannelTelegramFeature, DF as createChannelFeatureEnabledMap, DR as useYuanbaoChannelFeature, E as init_contexts, E1 as init_useI18n, E7 as Card, EF as init_channelRegistry, ER as init_use_yuanbao_channel_feature, FF as shouldRestrictIOAChannels, FR as init_slack, Fh as clawIdleTimeoutPreference, IF as toClawAdminControlParams, IR as slack_default, Iet as SpaceLibraryIcon, Ih as init_use_idle_timeout_storage, K2 as init_environment, K9 as WebhookLinkIcon, LR as discord_default, MF as init_channel_visibility, NF as isChannelAdminAllowed, NR as init_telegram, O1 as useTranslation, OF as createChannelHideEnabledMap, OR as init_use_claw_control, P5 as Segmented, PF as isChannelRestrictedByIOAPolicy, PR as telegram_default, R3 as useAccount, R5 as Switch, RQ as isIOAUser, RR as init_discord, RX as useChannelDiscordFeature, TF as getWeixinBotGuideUrl, V3 as useAdapter, VR as init_services, VX as useChannelWechatKfFeature, W9 as WbRefreshIcon, bR as init_synced_preference, c7 as Modal, dz as init_use_product_feature, eR as init_use_identity_claw_name, et as useAgentServices, fz as useProductFeature, hl as useQrDataUrl, i7 as Tooltip, jF as getVisibleSettingChannels, jY as init_product_features, kF as getAdminDisabledChannels, krt as Button, lz as useSettings, m5 as init_src, ml as init_use_qr_data_url, qT as init_utils$1, qnt as BackChevronIcon, sz as init_SettingsContext, tR as useIdentityClawName, uQ as init_utils, vZ as useWechatMiniProgramIntegrationFeature, w1 as copyToClipboard, wF as CHANNEL_REGISTRY, wq as useAgentTelemetry, xR as useSyncedPreference, xq as init_telemetry, z3 as AdapterContext, zX as useChannelSlackFeature } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Tv as require_jsx_runtime, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as useQQBindSession, t as init_use_qq_bind_session } from "./use-qq-bind-session-4o1tJ8rq.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/ClawSettingsPanel.less
var init_ClawSettingsPanel$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@wecom+wecom-aibot-sdk@0.1.0/node_modules/@wecom/wecom-aibot-sdk/dist/wecom-aibot-sdk.umd.js
var require_wecom_aibot_sdk_umd = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.WecomAIBotSDK = {}));
	})(exports, (function(exports$1) {
		"use strict";
		/** 消息类型常量 */
		const MESSAGE_TYPE = {
			QR_CODE_READY: "QR_CODE_READY",
			AUTH_SUCCESS: "AUTH_SUCCESS",
			AUTH_ERROR: "AUTH_ERROR",
			AUTH_CANCEL: "AUTH_CANCEL",
			WINDOW_CLOSE: "WINDOW_CLOSE"
		};
		/** 错误码常量 */
		const ERROR_CODE = {
			WINDOW_BLOCKED: "WINDOW_BLOCKED",
			INVALID_APP_ID: "INVALID_APP_ID",
			ACCESS_DENIED: "ACCESS_DENIED",
			AUTH_TIMEOUT: "AUTH_TIMEOUT",
			CANCELLED: "CANCELLED"
		};
		/** 默认配置 */
		const DEFAULT_CONFIG = {
			authOrigin: "https://work.weixin.qq.com",
			width: 950,
			height: 640,
			debug: false
		};
		/** 窗口关闭轮询间隔（毫秒） */
		const POLLING_INTERVAL = 500;
		/**
		* 轻量级事件发射器
		* 负责 SDK 内部事件的注册、触发和移除
		*/
		class EventEmitter {
			constructor() {
				this.handlers = /* @__PURE__ */ new Map();
			}
			/**
			* 注册事件监听
			* @param event - 事件名
			* @param handler - 事件处理函数
			*/
			on(event, handler) {
				const list = this.handlers.get(event) || [];
				list.push(handler);
				this.handlers.set(event, list);
				return this;
			}
			/**
			* 移除事件监听
			* @param event - 事件名
			* @param handler - 指定处理函数，不传则移除该事件所有监听
			*/
			off(event, handler) {
				if (!handler) {
					this.handlers.delete(event);
					return this;
				}
				const list = this.handlers.get(event);
				if (list) {
					const filtered = list.filter((h) => h !== handler);
					if (filtered.length > 0) this.handlers.set(event, filtered);
					else this.handlers.delete(event);
				}
				return this;
			}
			/**
			* 触发事件
			* @param event - 事件名
			* @param args - 传递给处理函数的参数
			*/
			emit(event, ...args) {
				const list = this.handlers.get(event);
				if (list) list.forEach((handler) => {
					try {
						handler(...args);
					} catch (e) {
						console.error(`[WecomAIBotSDK] Event handler error for "${event}":`, e);
					}
				});
			}
			/** 移除所有事件监听 */
			removeAll() {
				this.handlers.clear();
			}
			/** 获取某事件的监听器数量（主要用于测试） */
			listenerCount(event) {
				var _a, _b;
				return (_b = (_a = this.handlers.get(event)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
			}
		}
		/**
		* 企业微信 AI Bot 授权 SDK
		*
		* 基于 Popup Window + PostMessage 跨窗口通信机制，
		* 实现外部网页与独立授权窗口的交互。
		*/
		class WecomAIBotSDK {
			constructor() {
				this.authWindow = null;
				this.pollingTimer = null;
				this.messageListener = null;
				this.config = { ...DEFAULT_CONFIG };
				this.emitter = new EventEmitter();
				this.setupMessageListener();
			}
			/**
			* 打开机器人信息授权窗口
			*
			* 同时支持回调风格和 Promise 风格：
			* - 回调：通过 onCreated / onError 获取结果
			* - Promise：通过 .then() / .catch() 或 await 获取结果
			*/
			openBotInfoAuthWindow(options) {
				var _a;
				this.validateOptions(options);
				this.mergeConfig(options);
				const state = options.state || this.generateState();
				const authUrl = this.buildAuthUrl(options.source, state);
				const windowFeatures = this.buildWindowFeatures();
				this.authWindow = window.open(authUrl, "WecomAIBotAuthWindow", windowFeatures);
				if (!this.authWindow) {
					const error = {
						code: ERROR_CODE.WINDOW_BLOCKED,
						message: "弹窗被拦截，请允许弹窗或点击手动打开"
					};
					this.emitter.emit("error", error);
					(_a = options.onError) === null || _a === void 0 || _a.call(options, error);
					return Promise.reject(error);
				}
				this.startPolling();
				return new Promise((resolve, reject) => {
					const cleanup = () => {
						this.emitter.off("success", onSuccess);
						this.emitter.off("error", onError);
						this.emitter.off("cancel", onCancel);
					};
					const onSuccess = (bot) => {
						cleanup();
						resolve(bot);
					};
					const onError = (err) => {
						cleanup();
						reject(err);
					};
					const onCancel = () => {
						cleanup();
						reject({
							code: ERROR_CODE.CANCELLED,
							message: "用户取消授权"
						});
					};
					this.emitter.on("success", onSuccess);
					this.emitter.on("error", onError);
					this.emitter.on("cancel", onCancel);
					if (options.onCreated) this.emitter.on("success", options.onCreated);
					if (options.onError) this.emitter.on("error", options.onError);
				});
			}
			/** 手动关闭授权窗口 */
			closeWindow() {
				if (this.authWindow && !this.authWindow.closed) this.authWindow.close();
				this.authWindow = null;
				this.stopPolling();
			}
			/** 销毁 SDK 实例，释放所有资源 */
			destroy() {
				this.closeWindow();
				this.removeMessageListener();
				this.emitter.removeAll();
				this.log("SDK destroyed");
			}
			/** 注册事件监听 */
			on(event, handler) {
				this.emitter.on(event, handler);
				return this;
			}
			/** 移除事件监听 */
			off(event, handler) {
				this.emitter.off(event, handler);
				return this;
			}
			validateOptions(options) {
				if (!options.source) throw new Error(`[WecomAIBotSDK] source is required`);
			}
			mergeConfig(options) {
				if (options.authOrigin) this.config.authOrigin = options.authOrigin;
				if (options.width != null) this.config.width = options.width;
				if (options.height != null) this.config.height = options.height;
				if (options.debug != null) this.config.debug = options.debug;
			}
			buildAuthUrl(source, state) {
				const params = new URLSearchParams({
					source,
					state,
					timestamp: String(Date.now())
				});
				return `${this.config.authOrigin}/ai/qc/gen?${params.toString()}`;
			}
			buildWindowFeatures() {
				const { width, height } = this.config;
				const left = (window.screen.width - width) / 2;
				const top = (window.screen.height - height) / 2;
				return [
					`width=${width}`,
					`height=${height}`,
					`left=${left}`,
					`top=${top}`,
					"resizable=false",
					"scrollbars=false",
					"status=no",
					"toolbar=no",
					"menubar=no",
					"location=no"
				].join(",");
			}
			generateState() {
				return `state_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
			}
			setupMessageListener() {
				this.messageListener = (event) => {
					var _a;
					if (event.origin !== this.config.authOrigin) {
						this.log("Message from unknown origin:", event.origin);
						return;
					}
					const data = event.data;
					if (!data || !data.type) return;
					this.log("Message received:", data.type, data.payload);
					switch (data.type) {
						case MESSAGE_TYPE.QR_CODE_READY:
							this.emitter.emit("ready", data.payload);
							break;
						case MESSAGE_TYPE.AUTH_SUCCESS:
							this.emitter.emit("success", data.payload);
							this.closeWindow();
							break;
						case MESSAGE_TYPE.AUTH_ERROR: {
							const error = ((_a = data.payload) === null || _a === void 0 ? void 0 : _a.error) || data.payload;
							this.emitter.emit("error", error);
							this.closeWindow();
							break;
						}
						case MESSAGE_TYPE.AUTH_CANCEL:
							this.emitter.emit("cancel", null);
							this.closeWindow();
							break;
						case MESSAGE_TYPE.WINDOW_CLOSE: this.closeWindow();
					}
				};
				window.addEventListener("message", this.messageListener);
			}
			removeMessageListener() {
				if (this.messageListener) {
					window.removeEventListener("message", this.messageListener);
					this.messageListener = null;
				}
			}
			startPolling() {
				this.stopPolling();
				this.pollingTimer = setInterval(() => {
					var _a;
					if ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.closed) {
						this.stopPolling();
						this.authWindow = null;
						this.emitter.emit("cancel", null);
					}
				}, POLLING_INTERVAL);
			}
			stopPolling() {
				if (this.pollingTimer) {
					clearInterval(this.pollingTimer);
					this.pollingTimer = null;
				}
			}
			log(...args) {
				if (this.config.debug) console.log("[WecomAIBotSDK]", ...args);
			}
		}
		const sdk = new WecomAIBotSDK();
		if (typeof window !== "undefined") window.WecomAIBotSDK = sdk;
		exports$1.DEFAULT_CONFIG = DEFAULT_CONFIG;
		exports$1.ERROR_CODE = ERROR_CODE;
		exports$1.MESSAGE_TYPE = MESSAGE_TYPE;
		exports$1.WecomAIBotSDK = WecomAIBotSDK;
		exports$1.default = sdk;
		Object.defineProperty(exports$1, "__esModule", { value: true });
	}));
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/use-bot-webhook-url-feature.ts
/**
* 获取 Bot Webhook URL 模式是否可用
*
* @returns true 表示可用；false 表示被 Disable 开关关闭
*/
function useBotWebhookUrlFeature() {
	const adapter = (0, import_react$5.useContext)(AdapterContext);
	const [enabled, setEnabled] = (0, import_react$5.useState)(cachedBotWebhookUrlEnabled);
	(0, import_react$5.useEffect)(() => {
		if (!adapter?.onProductConfigChanged && !adapter?.getProductFeatures) return;
		let cancelled = false;
		const handleFeature = (features) => {
			if (cancelled || !features) return;
			const nextEnabled = features.DisableBotWebhookUrl !== true;
			cachedBotWebhookUrlEnabled = nextEnabled;
			setEnabled(nextEnabled);
		};
		let unsubscribe;
		if (adapter.onProductConfigChanged) unsubscribe = adapter.onProductConfigChanged((params) => {
			handleFeature(params?.productFeatures);
		});
		if (adapter.getProductFeatures) adapter.getProductFeatures().then((features) => {
			handleFeature(features);
		});
		return () => {
			cancelled = true;
			if (unsubscribe) unsubscribe();
		};
	}, [adapter]);
	return enabled;
}
var import_react$5, cachedBotWebhookUrlEnabled;
var init_use_bot_webhook_url_feature = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	cachedBotWebhookUrlEnabled = true;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-dingtalk.png
var logo_dingtalk_default;
var init_logo_dingtalk = __esmMin((() => {
	logo_dingtalk_default = "data:image/png;base64,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";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-feishu.png
var logo_feishu_default;
var init_logo_feishu = __esmMin((() => {
	logo_feishu_default = "data:image/png;base64,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";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-qq-bot.png
var logo_qq_bot_default;
var init_logo_qq_bot = __esmMin((() => {
	logo_qq_bot_default = "" + new URL("logo-qq-bot-C2LCAdlJ.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-wechat-assistant.png
var logo_wechat_assistant_default;
var init_logo_wechat_assistant = __esmMin((() => {
	logo_wechat_assistant_default = "data:image/png;base64,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";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-wechat-customer.png
var logo_wechat_customer_default;
var init_logo_wechat_customer = __esmMin((() => {
	logo_wechat_customer_default = "data:image/png;base64,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";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-wecom.png
var logo_wecom_default;
var init_logo_wecom = __esmMin((() => {
	logo_wecom_default = "data:image/png;base64,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";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/assets/channel-logos/logo-yuanbao.png
var logo_yuanbao_default;
var init_logo_yuanbao = __esmMin((() => {
	logo_yuanbao_default = "data:image/png;base64,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";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/claw-automation-bind-logic.ts
/**
* Pure decision helpers for the "automation → assistant bot bind" flow within
* `ClawSettingsPanel`.
*
* Extracted so the two review-critical contracts can be unit-tested without
* mounting the 3200+ line panel:
*
* 1. The "完成最后一步" hint fires ONLY when a `wecomaibot` registration completes
*    AND the current bind was initiated via the automation deep-link
*    (subRoute === 'wecomaibot'). Normal in-place assistant registration in
*    the Claw settings must not show it.
*
* 2. Dismissing that hint returns the user to the automation task config page
*    (i.e. closes the settings modal) ONLY when the bind was automation-initiated,
*    never for other assistants of the hint.
*/
/**
* Decide whether a just-completed channel registration should trigger the
* "完成最后一步" hint for an automation-initiated assistant bind.
*
* True iff:
* - the channel that just registered is the assistant WeCom bot (`wecomaibot`);
* - the panel was opened via the automation deep-link and the flag is still armed
*   (i.e. the user did not cancel the dialog in the meantime).
*
* Any other channel type or a normal in-settings registration returns false.
*/
function shouldShowAutomationLastStep(registeredChannelType, automationAssistantBindArmed) {
	return registeredChannelType === "wecomaibot" && automationAssistantBindArmed;
}
/**
* Decide whether dismissing the "完成最后一步" hint should also close the settings
* modal (returning the user to the automation task config page).
*
* True iff a return was armed by a preceding automation-initiated wecomaibot
* registration. In-place assistant registration in the Claw settings never arms
* this flag, so its "完成最后一步" hint (if it were ever shown) would just dismiss.
*/
function shouldReturnToAutomationOnDismiss(returnToAutomationArmed) {
	return returnToAutomationArmed;
}
var init_claw_automation_bind_logic = __esmMin((() => {})), import_jsx_runtime$4, FIELD_LABEL_KEY, ClawFeishuDingtalkDialog;
var init_ClawFeishuDingtalkDialog = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime$4 = require_jsx_runtime();
	FIELD_LABEL_KEY = {
		appId: "settings.claw.feishu.appIdLabel",
		encryptKey: "settings.claw.feishu.encryptKeyLabel",
		verificationToken: "settings.claw.feishu.verificationTokenLabel",
		appKey: "settings.claw.dingtalk.appKeyLabel",
		token: "settings.claw.dingtalk.tokenLabel",
		aesKey: "settings.claw.dingtalk.aesKeyLabel"
	};
	ClawFeishuDingtalkDialog = ({ activeDialog, activeConfig, clawDisplayName, selectedMode, setSelectedMode, formValues, setFormValues, handleInputChange, modeFormCacheRef, registerPending, handleRegister, handleCloseDialog, channelRegisterErrors, isBotWebhookUrlEnabled, isFeishuCustomHostEnabled, isEditingFeishuHost, setIsEditingFeishuHost, handleOpenExternalLink }) => {
		const t = useTranslation();
		const manualModes = (activeConfig.modes ?? []).filter((m) => isBotWebhookUrlEnabled || m.modeValue !== "webhook");
		const manualInputs = (manualModes.find((m) => m.modeValue === selectedMode)?.inputs ?? manualModes[0]?.inputs ?? []).filter((input) => {
			if (!input.visibleWhenFeature) return true;
			if (input.visibleWhenFeature === "EnableFeishuCustomHost") return isFeishuCustomHostEnabled;
			return false;
		});
		const resolveLabelKey = (field) => {
			if (field === "appSecret") return activeDialog === "feishu" ? "settings.claw.feishu.appSecretLabel" : "settings.claw.dingtalk.appSecretLabel";
			return FIELD_LABEL_KEY[field] ?? "";
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Modal, {
			open: true,
			onOpenChange: (open) => {
				if (!open) handleCloseDialog();
			},
			wrapClassName: "claw-wecom-dialog",
			variant: "confirm",
			width: 360,
			height: 508,
			closable: true,
			title: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
				className: "claw-wecom-dialog__title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "claw-wecom-dialog__title-text",
					children: t(activeConfig.dialogTitleKey, { name: clawDisplayName })
				}), activeConfig.docUrl && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
					content: t("settings.claw.howToConfigTooltip"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "small",
						iconOnly: true,
						className: "claw-wecom-dialog__help",
						"aria-label": t("settings.claw.howToConfig"),
						onClick: (e) => {
							e.preventDefault();
							handleOpenExternalLink(activeConfig.docUrl);
						},
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SpaceLibraryIcon, {})
					})
				})]
			}),
			okText: registerPending ? t("settings.claw.registering") : t("settings.claw.register"),
			okButtonProps: { disabled: registerPending },
			cancelText: t("common.cancel"),
			onOk: () => {
				handleRegister();
				return false;
			},
			onCancel: handleCloseDialog,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "claw-register-form",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Segmented, {
						className: "claw-wecom-dialog__mode-tabs",
						size: "medium",
						fullWidth: true,
						value: selectedMode,
						options: manualModes.map((mode) => ({
							value: mode.modeValue,
							label: t(mode.labelKey),
							disabled: registerPending
						})),
						onChange: (nextMode) => {
							const currentModeConfig = manualModes.find((m) => m.modeValue === selectedMode);
							if (currentModeConfig) {
								const currentFields = {};
								for (const inp of currentModeConfig.inputs) if (formValues[inp.field] !== void 0) currentFields[inp.field] = formValues[inp.field];
								modeFormCacheRef.current[selectedMode] = currentFields;
							}
							setFormValues({ ...modeFormCacheRef.current[nextMode] || {} });
							setSelectedMode(nextMode);
						}
					}),
					manualInputs.map((input) => {
						if (activeDialog === "feishu" && input.field === "customHost") {
							const defaultValue = input.defaultValue ?? "";
							const editValue = formValues[input.field] ?? "";
							return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "claw-register-form__host-row",
								children: [!isEditingFeishuHost ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
									className: "claw-register-form__host-display-text",
									children: [t("settings.claw.feishu.customHostLabel"), defaultValue]
								}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("input", {
									className: "claw-register-form__input",
									type: input.type,
									placeholder: t(input.placeholderKey),
									value: editValue,
									onChange: (e) => handleInputChange(input.field, e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
									type: "button",
									className: "claw-register-form__host-action-btn",
									onClick: () => {
										if (!isEditingFeishuHost) {
											handleInputChange(input.field, "");
											setIsEditingFeishuHost(true);
										} else {
											handleInputChange(input.field, "");
											setIsEditingFeishuHost(false);
										}
									},
									children: !isEditingFeishuHost ? t("settings.claw.feishu.customHostCustomize") : t("settings.claw.feishu.resetToDefault")
								})]
							}, `${activeDialog}-${selectedMode}-${input.field}`);
						}
						const labelKey = resolveLabelKey(input.field);
						return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "claw-wecom-dialog__field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "claw-wecom-dialog__field-label",
								children: labelKey ? t(labelKey) : t(input.placeholderKey)
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Input, {
								size: "medium",
								type: input.type,
								placeholder: t("settings.claw.wecomAibot.fieldPlaceholder"),
								value: formValues[input.field] ?? "",
								disabled: registerPending,
								onChange: (e) => handleInputChange(input.field, e.target.value)
							})]
						}, `${activeDialog}-${selectedMode}-${input.field}`);
					}),
					channelRegisterErrors[activeDialog] && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "claw-settings-panel__error-message claw-settings-panel__error-message--single-line",
						children: channelRegisterErrors[activeDialog]
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ClawQrScanView.tsx
/**
* 加载中图标：菊花状 spoke SVG，旋转动画由 __spinner class 提供。
*/
function ClawLoadingSpinner() {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
		className: "claw-wechatkf-link-row__spinner",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				fill: "currentColor",
				fillOpacity: "0.5",
				transform: "matrix(1 0 0 1 3.10655 2.25)",
				fillRule: "evenodd",
				d: SPINNER_PATH
			})
		})
	});
}
/**
* 二维码异常态遮罩（对齐 ardot 节点 4589:4970）：
* 深色遮罩 + 居中刷新图标 + 双行文案，整块可点触发重试。
* 复用于「过期(expired)」与「错误(error)」两种态。
*/
function ClawQrErrorOverlay({ lines, onRetry, retryLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
		type: "button",
		className: "claw-wechatkf-link-row__qrcode-overlay claw-wechatkf-link-row__qrcode-overlay--retry",
		onClick: onRetry,
		"aria-label": retryLabel,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(WbRefreshIcon, {
			className: "claw-wechatkf-link-row__qrcode-overlay-icon",
			size: 32,
			color: "#fff"
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
			className: "claw-wechatkf-link-row__qrcode-overlay-text",
			children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_react$3.Fragment, { children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}), line] }, i))
		})]
	});
}
/**
* 扫码视图：按 status + qrDataUrl 渲染 提示 / 二维码 / 过期&失败遮罩 / 加载态。
*/
function ClawQrScanView({ status, hint, qrDataUrl, centerLogo, errorLines, onRetry, retryLabel, fallback, extra }) {
	const showOverlay = (status === "expired" || status === "error") && !!errorLines && errorLines.length > 0;
	const loadingNode = fallback ?? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: "claw-wechatkf-link-row__loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ClawLoadingSpinner, {})
	});
	let body;
	if (status === "loading") body = loadingNode;
	else if (qrDataUrl) body = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "claw-wechatkf-link-row__qrcode-wrapper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
				className: "claw-wechatkf-link-row__qrcode",
				src: qrDataUrl,
				alt: "QR Code"
			}),
			centerLogo && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "claw-wechatkf-link-row__qrcode-center-logo",
				"aria-hidden": "true",
				children: centerLogo
			}),
			showOverlay && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ClawQrErrorOverlay, {
				lines: errorLines,
				onRetry,
				retryLabel
			})
		]
	});
	else if (showOverlay) body = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: "claw-wechatkf-link-row__qrcode-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ClawQrErrorOverlay, {
			lines: errorLines,
			onRetry,
			retryLabel
		})
	});
	else body = loadingNode;
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
		hint && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
			className: "claw-wechatkf-link-row__hint",
			children: hint
		}),
		body,
		extra
	] });
}
var import_react$3, import_jsx_runtime$3, SPINNER_PATH;
var init_ClawQrScanView = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$3 = require_jsx_runtime();
	SPINNER_PATH = "M9.7935 0L9.7935 6L7.9935 6L7.9935 0L9.7935 0ZM12.5909 8.6546L17.7871 5.6546L16.8871 4.0958L11.6909 7.0958L12.5909 8.6546ZM5.1962 8.6546L0 5.6546L0.9 4.0958L6.0962 7.0958L5.1962 8.6546ZM11.6909 12.4046L16.8871 15.4046L17.7871 13.8457L12.5909 10.8457L11.6909 12.4046ZM6.0962 12.4046L0.9 15.4046L0 13.8458L5.1962 10.8458L6.0962 12.4046ZM9.7935 13.5L9.7935 19.5L7.9935 19.5L7.9935 13.5L9.7935 13.5Z";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ClawScanDialog.tsx
/**
* 扫码绑定弹窗：固定 360×424 的 wb Modal 外壳 + 居中扫码视图。
* 尺寸对齐设计稿（原 .claw-qr-scan-dialog 全局规则），改由 Modal width/height 控制。
*/
function ClawScanDialog({ open, onClose, title, desc, ...scanViewProps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Modal, {
		open,
		onOpenChange: (next) => {
			if (!next) onClose();
		},
		wrapClassName: "claw-channel-scan-dialog",
		variant: "confirm",
		width: 360,
		height: 424,
		closable: true,
		title,
		footer: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "claw-wechatmp-qr-dialog claw-wechatmp-qr-dialog--standalone",
			children: [desc && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				className: "claw-wechatmp-qr-dialog__desc",
				children: desc
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "claw-wechatkf-link-row",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ClawQrScanView, { ...scanViewProps })
			})]
		})
	});
}
var import_jsx_runtime$2;
var init_ClawScanDialog = __esmMin((() => {
	init_src();
	require_react();
	init_ClawQrScanView();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/SessionManagementSettings.tsx
function SessionManagementSettings({ className }) {
	const t = useTranslation();
	const [storedValue, setStoredValue] = useSyncedPreference(clawIdleTimeoutPreference);
	const [enabled, setEnabled] = (0, import_react$1.useState)(storedValue > 0);
	const [hours, setHours] = (0, import_react$1.useState)(storedValue > 0 ? storedValue : 6);
	(0, import_react$1.useEffect)(() => {
		if (storedValue > 0) {
			setEnabled(true);
			setHours(storedValue);
		} else setEnabled(false);
	}, [storedValue]);
	const handleToggle = (e) => {
		const newEnabled = e.target.checked;
		setEnabled(newEnabled);
		setStoredValue(newEnabled ? hours : 0);
	};
	const handleStep = (delta) => {
		const next = Math.min(MAX_HOURS, Math.max(MIN_HOURS, hours + delta));
		if (next === hours) return;
		setHours(next);
		setStoredValue(enabled ? next : 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Card, {
		variant: "flat",
		className: `claw-session-timeout ${className || ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "claw-session-timeout__row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "claw-session-timeout__label",
					children: t("settings.claw.idleTimeout.hoursPrefix")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "claw-session-timeout__number-input",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "claw-session-timeout__step",
							"aria-label": t("settings.claw.idleTimeout.decrease"),
							disabled: !enabled || hours <= MIN_HOURS,
							onClick: () => handleStep(-1),
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
									d: "M3 8h10",
									stroke: "currentColor",
									strokeWidth: "1.2",
									strokeLinecap: "round"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "claw-session-timeout__value",
							children: hours
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "claw-session-timeout__step",
							"aria-label": t("settings.claw.idleTimeout.increase"),
							disabled: !enabled || hours >= MAX_HOURS,
							onClick: () => handleStep(1),
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
									d: "M8 3v10M3 8h10",
									stroke: "currentColor",
									strokeWidth: "1.2",
									strokeLinecap: "round"
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "claw-session-timeout__unit",
					children: t("settings.claw.idleTimeout.unit")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "claw-session-timeout__text",
					children: t("settings.claw.idleTimeout.truncateText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
					size: "large",
					className: "settings-v2-switch",
					checked: enabled,
					onChange: handleToggle
				})
			]
		})
	});
}
var import_react$1, import_jsx_runtime$1, MIN_HOURS, MAX_HOURS;
var init_SessionManagementSettings = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_synced_preference();
	init_use_idle_timeout_storage();
	import_jsx_runtime$1 = require_jsx_runtime();
	MIN_HOURS = 1;
	MAX_HOURS = 24;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/ClawSettingsPanel.tsx
function Toggle({ checked, onChange, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
		size: "large",
		checked,
		onChange: (e) => onChange(e.target.checked),
		...rest
	});
}
function HelpDocLink({ docUrl, onOpen, className }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: t("settings.claw.howToConfigTooltip"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "small",
			iconOnly: true,
			className,
			"aria-label": t("settings.claw.howToConfig"),
			onClick: (e) => {
				e.preventDefault();
				onOpen(docUrl);
			},
			leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpaceLibraryIcon, {})
		})
	});
}
/**
* 推断保存配置的连接模式。
* 旧版本的保存数据中可能没有 connectionMode 字段，需要兼容：
* - 如果有 connectionMode，直接使用
* - 如果没有 connectionMode 但有已保存的参数（如 appId/token 等），说明是旧版本用户，
*   旧版本只支持 webhook，应回退为 'webhook'
* - 如果没有 connectionMode 也没有参数配置（全新用户），默认 'websocket'
*/
function inferConnectionMode(extra) {
	if (!extra) return "websocket";
	if (extra.connectionMode) return String(extra.connectionMode);
	return Object.keys(extra).some((key) => key !== "connectionMode" && extra[key] !== void 0 && extra[key] !== "") ? "webhook" : "websocket";
}
/**
* Normalize a channel config to a consistent shape.
* Handles both old format ({ extra: {...}, response: { webhookUrl } })
* and new flat format ({ botId, ..., registration: { webhookUrl } }).
*/
function normalizeChannelConfig(config) {
	if (config.extra) {
		const extra = config.extra;
		return {
			values: extra,
			webhookUrl: config.response?.webhookUrl,
			connectionMode: extra?.connectionMode
		};
	}
	return {
		values: config,
		webhookUrl: config.registration?.webhookUrl,
		connectionMode: config.connectionMode
	};
}
/**
* 从助理 wecomaibot 已保存配置中提取「参与 websocket 冲突」的 botId。
*
* 与 daemon 侧 ClawService.getAssistantWecomBotId 的判据镜像，保证 UI 前置硬校验
* 与 daemon 权威守卫语义一致（issue #93046）：只有 websocket 模式（或 connectionMode
* 未设置的历史默认 websocket）才返回 botId；webhook 模式不建立长连接、不会与自动化
* 推送 bot 互踢，返回 undefined 以避免 UI 过度拦截合法绑定。
*/
function getAssistantWecomWebsocketBotId(savedConfig) {
	if (!savedConfig) return;
	const normalized = normalizeChannelConfig(savedConfig);
	if (!(!normalized.connectionMode || normalized.connectionMode === "websocket")) return;
	const botId = normalized.values?.botId;
	return typeof botId === "string" && botId ? botId : void 0;
}
function hasYuanbaoSavedConfig(config) {
	if (!config) return false;
	const values = normalizeChannelConfig(config).values;
	return Boolean(typeof config.channelId === "string" && config.channelId || typeof values?.channelId === "string" && values.channelId || typeof values?.appKey === "string" && values.appKey || typeof values?.appSecret === "string" && values.appSecret);
}
/**
* Claw Settings Panel
*/
function ClawSettingsPanel({ subRoute, wechatKfInitialBound, wechatKfInitialLoaded } = {}) {
	const t = useTranslation();
	const adapter = useAdapter();
	const facades = useAgentServices();
	const startQQBind = useQQBindSession(adapter, facades?.agentIm);
	const { account } = useAccount();
	const { switchTab, closeSettings } = useSettings();
	const { reportEvent, Events } = useAgentTelemetry();
	const isTencentUser = isIOAUser(account?.enterpriseId ?? "");
	const [isIOAMachine, setIsIOAMachine] = (0, import_react.useState)(false);
	const [ioaImOverrideAllowed, setIoaImOverrideAllowed] = (0, import_react.useState)(false);
	const allowOverseasIMOnIOAMachine = useProductFeature("AllowOverseasIMOnIOAMachine", {
		mode: "enable",
		defaultEnabled: false
	});
	const shouldRestrictChannels = shouldRestrictIOAChannels({
		isTencentUser,
		isIOAMachine,
		ioaImOverrideAllowed
	});
	const isPersonalIOAMachine = !isTencentUser && isIOAMachine;
	const isWechatMiniProgramIntegrationEnabled = useWechatMiniProgramIntegrationFeature();
	const isBotWebhookUrlEnabled = useBotWebhookUrlFeature();
	const { clawDisplayName } = useIdentityClawName();
	const slackChannelEnabled = useChannelSlackFeature() ?? false;
	const telegramChannelEnabled = useChannelTelegramFeature() ?? false;
	const discordChannelEnabled = useChannelDiscordFeature() ?? false;
	const wechatKfChannelEnabled = useChannelWechatKfFeature() ?? false;
	const channelFeatureEnabled = createChannelFeatureEnabledMap({
		ChannelSlack: slackChannelEnabled,
		ChannelTelegram: telegramChannelEnabled,
		ChannelDiscord: discordChannelEnabled,
		ChannelWechatKf: wechatKfChannelEnabled
	});
	const isYuanbaoChannelEnabled = useYuanbaoChannelFeature();
	/**
	* 通道隐藏开关（disable 语义，默认展示）：仅在需要藏掉该通道的发行版
	* product.json 里显式置 true，其余版本不配即维持现状。
	*/
	const hideChannelQQ = useProductFeature("HideChannelQQ", { mode: "enable" }) ?? false;
	const hideChannelWecomAibot = useProductFeature("HideChannelWecomAibot", { mode: "enable" }) ?? false;
	const hideChannelAutomationWecomBot = useProductFeature("HideChannelAutomationWecomBot", { mode: "enable" }) ?? false;
	const channelHideEnabled = (0, import_react.useMemo)(() => createChannelHideEnabledMap({
		HideChannelQQ: hideChannelQQ,
		HideChannelWecomAibot: hideChannelWecomAibot,
		HideChannelAutomationWecomBot: hideChannelAutomationWecomBot
	}), [
		hideChannelQQ,
		hideChannelWecomAibot,
		hideChannelAutomationWecomBot
	]);
	const clawControl = useClawControl();
	const adminControl = (0, import_react.useMemo)(() => toClawAdminControlParams(clawControl, KNOWN_CHANNEL_TYPES), [clawControl]);
	/**
	* 「飞书自定义 Host」开关：仅在 WorkBuddy 专享版 / 私有化版本开启
	* （workbuddy-custom / workbuddy-desktop selfhosted 的 product.json 中
	* EnableFeishuCustomHost=true）。
	* enable 模式语义：true 时显示自定义 Host 输入框 + 「恢复默认」按钮。
	*/
	const isFeishuCustomHostEnabled = useProductFeature("EnableFeishuCustomHost", { mode: "enable" });
	/**
	* 是否在企微 AIBot WebSocket 模式下显示自定义 WebSocket URL 输入框。
	* 仅专享版 / 私有化定制版（workbuddy-custom）的 productConfig.productFeatures 中
	* EnableWecomAibotCustomWsUrl=true 时生效。
	*/
	const isWecomAibotCustomWsUrlEnabled = useProductFeature("EnableWecomAibotCustomWsUrl", { mode: "enable" });
	const isLocalMode = adapter?.environmentType === "local";
	const [systemNotification, setSystemNotification] = (0, import_react.useState)(false);
	const [wecomEnabled, setWecomEnabled] = (0, import_react.useState)(false);
	const [automationPushMode, setAutomationPushMode] = (0, import_react.useState)("websocket");
	const [automationWebhookUrl, setAutomationWebhookUrl] = (0, import_react.useState)("");
	const [, setWebhookUrlInput] = (0, import_react.useState)("");
	const [automationWsBotId, setAutomationWsBotId] = (0, import_react.useState)("");
	const [automationPushConfigLoaded, setAutomationPushConfigLoaded] = (0, import_react.useState)(false);
	const [automationWsBotSecret, setAutomationWsBotSecret] = (0, import_react.useState)("");
	const [automationWsBotIdInput, setAutomationWsBotIdInput] = (0, import_react.useState)("");
	const [automationWsBotSecretInput, setAutomationWsBotSecretInput] = (0, import_react.useState)("");
	const [automationWsSaving, setAutomationWsSaving] = (0, import_react.useState)(false);
	const [automationQuickBindLoading, setAutomationQuickBindLoading] = (0, import_react.useState)(false);
	const [showAutomationOverwriteConfirm, setShowAutomationOverwriteConfirm] = (0, import_react.useState)(false);
	const [automationConfigDialogOpen, setAutomationConfigDialogOpen] = (0, import_react.useState)(false);
	const [automationMoreOpen, setAutomationMoreOpen] = (0, import_react.useState)(false);
	const [showAutomationLastStep, setShowAutomationLastStep] = (0, import_react.useState)(false);
	const automationAssistantBindRef = (0, import_react.useRef)(false);
	const automationStandaloneBindRef = (0, import_react.useRef)(false);
	const returnToAutomationAfterBindRef = (0, import_react.useRef)(false);
	const automationBindWasUrlRef = (0, import_react.useRef)(false);
	const [activeDialog, setActiveDialog] = (0, import_react.useState)(null);
	const [selectedMode, setSelectedMode] = (0, import_react.useState)("websocket");
	/**
	* 飞书自定义 Host 字段的"展示态 / 编辑态"切换：
	* - false：展示态，仅显示一行『飞书 Host：xxx』+「自定义」按钮
	* - true：编辑态，显示与 App ID 同样的输入框 + 右侧「恢复默认」按钮
	* 仅在 EnableFeishuCustomHost 开启 + 飞书 + websocket 模式下使用。
	* 已存非默认 customHost 时，handleOpenDialog 会把它置为 true。
	*/
	const [isEditingFeishuHost, setIsEditingFeishuHost] = (0, import_react.useState)(false);
	/**
	* 企微 AIBot 自定义 ws URL 的"展示态 / 编辑态"开关，与 isEditingFeishuHost 对称。
	* - 展示态（false）：显示默认 ws URL + 「自定义」按钮，提交时强制回填默认值
	* - 编辑态（true）：显示 input + 「恢复默认」按钮，提交时校验并使用用户填入的值
	*
	* 仅在 wecomaibot websocket 模式 + ProductFeature `EnableWecomAibotCustomWsUrl`=true
	* 时生效。
	*/
	const [isEditingWecomAibotWsUrl, setIsEditingWecomAibotWsUrl] = (0, import_react.useState)(false);
	const [channelStatuses, setChannelStatuses] = (0, import_react.useState)({
		feishu: "idle",
		wecomaibot: "idle",
		qq: "idle",
		dingtalk: "idle",
		yuanbao: "idle",
		weixinClawBot: "idle",
		wechatkf: "idle",
		slack: "idle",
		wecomIOA: "idle",
		wecomNew: "idle",
		custom: "idle",
		wechatmp: "idle",
		discord: "idle",
		telegram: "idle"
	});
	const [channelWebhookUrls, setChannelWebhookUrls] = (0, import_react.useState)({
		feishu: "",
		wecomaibot: "",
		qq: "",
		dingtalk: "",
		yuanbao: "",
		weixinClawBot: "",
		wechatkf: "",
		slack: "",
		wecomIOA: "",
		wecomNew: "",
		custom: "",
		wechatmp: "",
		discord: "",
		telegram: ""
	});
	const [copiedChannel, setCopiedChannel] = (0, import_react.useState)(null);
	const [weixinBotQrUrl, setWeixinBotQrUrl] = (0, import_react.useState)("");
	const [weixinBotLoginState, setWeixinBotLoginState] = (0, import_react.useState)("idle");
	const [weixinBotLoginError, setWeixinBotLoginError] = (0, import_react.useState)("");
	const [weixinBotExpiresIn, setWeixinBotExpiresIn] = (0, import_react.useState)(0);
	const [weixinBotQrDialogOpen, setWeixinBotQrDialogOpen] = (0, import_react.useState)(false);
	const [wechatKfState, setWechatKfState] = (0, import_react.useState)(wechatKfInitialBound ? "bound" : "idle");
	const [wechatKfBindStatusLoaded, setWechatKfBindStatusLoaded] = (0, import_react.useState)(!!wechatKfInitialLoaded);
	const [wechatKfUrl, setWechatKfUrl] = (0, import_react.useState)("");
	const [wechatKfExpiresIn, setWechatKfExpiresIn] = (0, import_react.useState)(0);
	const [wechatKfErrorMessage, setWechatKfErrorMessage] = (0, import_react.useState)("");
	const [wechatKfQrDialogOpen, setWechatKfQrDialogOpen] = (0, import_react.useState)(false);
	const [yuanbaoHasSavedConfig, setYuanbaoHasSavedConfig] = (0, import_react.useState)(null);
	const [yuanbaoScanState, setYuanbaoScanState] = (0, import_react.useState)("idle");
	const [yuanbaoScanDialogOpen, setYuanbaoScanDialogOpen] = (0, import_react.useState)(false);
	const [yuanbaoScanUrl, setYuanbaoScanUrl] = (0, import_react.useState)("");
	const [yuanbaoScanExpiresIn, setYuanbaoScanExpiresIn] = (0, import_react.useState)(0);
	const [yuanbaoScanStatusHint, setYuanbaoScanStatusHint] = (0, import_react.useState)("");
	const [yuanbaoScanErrorMessage, setYuanbaoScanErrorMessage] = (0, import_react.useState)("");
	const [showYuanbaoOverwriteConfirm, setShowYuanbaoOverwriteConfirm] = (0, import_react.useState)(false);
	const yuanbaoPendingCredentialsRef = (0, import_react.useRef)(null);
	const yuanbaoScanPollTimerRef = (0, import_react.useRef)(null);
	const yuanbaoActiveScanCodeRef = (0, import_react.useRef)(null);
	const [qqScanState, setQQScanState] = (0, import_react.useState)("idle");
	const [qqScanQrUrl, setQQScanQrUrl] = (0, import_react.useState)("");
	const [qqScanBindToken, setQQScanBindToken] = (0, import_react.useState)("");
	const [qqScanError, setQQScanError] = (0, import_react.useState)("");
	/** Dispose function for QQ scan event subscriptions; cleanup on dialog close to prevent memory leaks */
	const qqScanDisposeRef = (0, import_react.useRef)(void 0);
	const [qqBindDialogOpen, setQqBindDialogOpen] = (0, import_react.useState)(false);
	const [qqMoreOpen, setQqMoreOpen] = (0, import_react.useState)(false);
	const [webhookViewChannel, setWebhookViewChannel] = (0, import_react.useState)(null);
	const [wecomBindDialogOpen, setWecomBindDialogOpen] = (0, import_react.useState)(false);
	const [wecomMoreOpen, setWecomMoreOpen] = (0, import_react.useState)(false);
	const [channelRegisterErrors, setChannelRegisterErrors] = (0, import_react.useState)({});
	const savedConfigsRef = (0, import_react.useRef)({});
	const [savedConfigsLoaded, setSavedConfigsLoaded] = (0, import_react.useState)(false);
	const modeFormCacheRef = (0, import_react.useRef)({});
	const configActionStartRef = (0, import_react.useRef)({});
	const [formValues, setFormValues] = (0, import_react.useState)({});
	const weixinBotQrDataUrl = useQrDataUrl(weixinBotQrUrl);
	const wechatKfQrDataUrl = useQrDataUrl(wechatKfUrl);
	const yuanbaoScanQrDataUrl = useQrDataUrl(yuanbaoScanUrl);
	const qqScanQrDataUrl = useQrDataUrl(qqScanQrUrl);
	const [pendingChannel, setPendingChannel] = (0, import_react.useState)(null);
	const registerPending = pendingChannel !== null;
	const [quickBindLoading, setQuickBindLoading] = (0, import_react.useState)(false);
	const [showOverwriteConfirm, setShowOverwriteConfirm] = (0, import_react.useState)(false);
	const [unbindingChannels, setUnbindingChannels] = (0, import_react.useState)({});
	const [showUnbindConfirm, setShowUnbindConfirm] = (0, import_react.useState)(null);
	const [showRestrictedConfigs, setShowRestrictedConfigs] = (0, import_react.useState)(false);
	const applyChannelStatusMap = (0, import_react.useCallback)((statusMap) => {
		setChannelStatuses((prev) => {
			const next = { ...prev };
			let changed = false;
			for (const [type, status] of Object.entries(statusMap)) if (type in next) {
				const knownStatus = status === "connecting" ? "connecting" : status === "connected" ? "connected" : status === "registered" ? "registered" : status === "failed" ? "failed" : void 0;
				if (knownStatus && next[type] !== knownStatus) {
					next[type] = knownStatus;
					changed = true;
				}
			}
			return changed ? next : prev;
		});
	}, []);
	const formatRegisterErrorMessage = (0, import_react.useCallback)((rawError, errorCode) => {
		const firstLine = (String(rawError || "").trim() || "unknown error").split(/\r?\n/)[0].trim();
		const fallbackMessage = firstLine.replace(/^Error invoking remote method '[^']+':\s*/i, "").replace(/^Error:\s*/i, "").replace(/^WeChat Work operation failed:\s*\w+:\s*/i, "").replace(/^Register channel failed:\s*/i, "").trim() || firstLine || "unknown error";
		if (errorCode === "WECOM_BOT_ID_CONFLICT") return t("settings.claw.assistantSameBotAsAutomation");
		if (errorCode && (/* @__PURE__ */ new Set([
			"AUTH_FAILED",
			"TIMEOUT",
			"NETWORK",
			"UNKNOWN"
		])).has(errorCode)) {
			const localized = t(`settings.claw.registerError.${errorCode}`);
			if (localized && localized !== `settings.claw.registerError.${errorCode}`) return localized;
		}
		return t("settings.claw.registerFailedWithReason").replace("{message}", fallbackMessage);
	}, [t]);
	const stopYuanbaoScanPolling = (0, import_react.useCallback)(() => {
		if (yuanbaoScanPollTimerRef.current) {
			clearInterval(yuanbaoScanPollTimerRef.current);
			yuanbaoScanPollTimerRef.current = null;
		}
	}, []);
	const startYuanbaoScanPolling = (0, import_react.useCallback)((code) => {
		if (!adapter || !code) return;
		stopYuanbaoScanPolling();
		yuanbaoScanPollTimerRef.current = setInterval(() => {
			adapter.emit("claw:yuanbao-check-scan-bind-status", { scanCode: code });
		}, 2e3);
	}, [adapter, stopYuanbaoScanPolling]);
	const handleYuanbaoScanBindCodeRequest = (0, import_react.useCallback)(() => {
		if (!adapter || yuanbaoScanState === "loading") return;
		yuanbaoActiveScanCodeRef.current = null;
		stopYuanbaoScanPolling();
		setYuanbaoScanState("loading");
		setYuanbaoScanUrl("");
		setYuanbaoScanExpiresIn(0);
		setYuanbaoScanStatusHint("");
		setYuanbaoScanErrorMessage("");
		yuanbaoPendingCredentialsRef.current = null;
		adapter.emit("claw:yuanbao-scan-bind-code");
	}, [
		adapter,
		yuanbaoScanState,
		stopYuanbaoScanPolling
	]);
	const handleOpenYuanbaoScanDialog = (0, import_react.useCallback)(() => {
		setYuanbaoScanDialogOpen(true);
		handleYuanbaoScanBindCodeRequest();
	}, [handleYuanbaoScanBindCodeRequest]);
	const handleCloseYuanbaoScanDialog = (0, import_react.useCallback)(() => {
		setYuanbaoScanDialogOpen(false);
		yuanbaoActiveScanCodeRef.current = null;
		stopYuanbaoScanPolling();
		if (yuanbaoScanState !== "confirming" && yuanbaoScanState !== "success") setYuanbaoScanState("idle");
	}, [stopYuanbaoScanPolling, yuanbaoScanState]);
	const triggerYuanbaoRegister = (0, import_react.useCallback)((appKey, appSecret) => {
		if (!adapter) return;
		setYuanbaoScanState("confirming");
		setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindBinding"));
		setYuanbaoScanErrorMessage("");
		configActionStartRef.current["yuanbao"] = Date.now();
		adapter.emit("claw:register-channel", {
			channelType: "yuanbao",
			channelId: appKey,
			extra: {
				connectionMode: "websocket",
				appKey,
				appSecret
			}
		});
	}, [adapter, t]);
	const handleYuanbaoOverwriteConfirm = (0, import_react.useCallback)(() => {
		setShowYuanbaoOverwriteConfirm(false);
		const creds = yuanbaoPendingCredentialsRef.current;
		if (creds) {
			triggerYuanbaoRegister(creds.appKey, creds.appSecret);
			yuanbaoPendingCredentialsRef.current = null;
		}
	}, [triggerYuanbaoRegister]);
	const handleYuanbaoOverwriteCancel = (0, import_react.useCallback)(() => {
		setShowYuanbaoOverwriteConfirm(false);
		yuanbaoPendingCredentialsRef.current = null;
		yuanbaoActiveScanCodeRef.current = null;
		setYuanbaoScanState("cancelled");
		setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindCancelled"));
	}, [t]);
	(0, import_react.useEffect)(() => {
		if (!adapter) return;
		const unsubStatus = adapter.on("claw:channel-status-result", (data) => {
			const { statusMap } = data;
			if (statusMap) applyChannelStatusMap(statusMap);
		});
		const unsubWebhook = adapter.on("claw:channel-webhook-url-result", (data) => {
			const { channelType, webhookUrl } = data;
			if (channelType && webhookUrl) {
				setChannelWebhookUrls((prev) => ({
					...prev,
					[channelType]: webhookUrl
				}));
				setChannelRegisterErrors((prev) => {
					if (!prev[channelType]) return prev;
					const next = { ...prev };
					delete next[channelType];
					return next;
				});
			}
		});
		const unsubWecom = adapter.on("claw:wecom-enabled-result", (data) => {
			const { enabled } = data;
			setWecomEnabled(enabled);
			setSystemNotification(enabled);
		});
		const unsubYuanbaoScanBind = adapter.on("claw:yuanbao-scan-bind-code-result", (data) => {
			const result = data;
			if (result.success && result.scanUrl && result.scanCode) {
				yuanbaoActiveScanCodeRef.current = result.scanCode;
				setYuanbaoScanState("ready");
				setYuanbaoScanUrl(result.scanUrl);
				setYuanbaoScanExpiresIn(result.expiresIn || 900);
				setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindHint"));
				setYuanbaoScanErrorMessage("");
				startYuanbaoScanPolling(result.scanCode);
			} else {
				yuanbaoActiveScanCodeRef.current = null;
				stopYuanbaoScanPolling();
				setYuanbaoScanState("error");
				setYuanbaoScanErrorMessage(result.message || t("settings.claw.yuanbaoScanBindFetchFailed"));
			}
		});
		const unsubYuanbaoScanStatus = adapter.on("claw:yuanbao-check-scan-bind-status-result", (data) => {
			const result = data;
			const activeScanCode = yuanbaoActiveScanCodeRef.current;
			if (!result.scanCode || !activeScanCode || result.scanCode !== activeScanCode) return;
			if (!result.success) {
				const message = result.message || "";
				yuanbaoActiveScanCodeRef.current = null;
				stopYuanbaoScanPolling();
				if (/expired|invalid/i.test(message)) {
					setYuanbaoScanState("expired");
					setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindExpired"));
				} else {
					setYuanbaoScanState("error");
					setYuanbaoScanErrorMessage(message || t("settings.claw.yuanbaoScanBindStatusFailed"));
				}
				return;
			}
			switch (result.status) {
				case 0:
					setYuanbaoScanState("ready");
					setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindWaitScan"));
					break;
				case 1:
					setYuanbaoScanState("scanned");
					setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindScanned"));
					break;
				case 2: {
					yuanbaoActiveScanCodeRef.current = null;
					stopYuanbaoScanPolling();
					const appKey = result.appKey || "";
					const appSecret = result.appSecret || "";
					if (!appKey || !appSecret) {
						setYuanbaoScanState("error");
						setYuanbaoScanErrorMessage(t("settings.claw.yuanbaoScanBindMissingCredential"));
						return;
					}
					const existingConfig = savedConfigsRef.current["yuanbao"];
					const existingValues = (existingConfig ? normalizeChannelConfig(existingConfig) : void 0)?.values;
					if (Boolean(typeof existingConfig?.channelId === "string" && existingConfig.channelId || typeof existingValues?.channelId === "string" && existingValues.channelId || typeof existingValues?.appKey === "string" && existingValues.appKey || typeof existingValues?.appSecret === "string" && existingValues.appSecret)) {
						yuanbaoPendingCredentialsRef.current = {
							appKey,
							appSecret
						};
						setShowYuanbaoOverwriteConfirm(true);
						setYuanbaoScanState("confirming");
						setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindOverwriteHint"));
					} else triggerYuanbaoRegister(appKey, appSecret);
					break;
				}
				case 3:
					yuanbaoActiveScanCodeRef.current = null;
					stopYuanbaoScanPolling();
					setYuanbaoScanState("cancelled");
					setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindCancelled"));
					break;
				case 4:
					yuanbaoActiveScanCodeRef.current = null;
					stopYuanbaoScanPolling();
					setYuanbaoScanState("expired");
					setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindExpired"));
			}
		});
		const unsubConfigs = adapter.on("claw:saved-channel-configs-result", (data) => {
			const { configs } = data;
			setSavedConfigsLoaded(true);
			if (configs) {
				savedConfigsRef.current = configs;
				const yuanbaoConfig = configs["yuanbao"];
				setYuanbaoHasSavedConfig(hasYuanbaoSavedConfig(yuanbaoConfig));
				const validTypes = CHANNEL_REGISTRY.map((c) => c.type);
				const urls = {};
				for (const [type, config] of Object.entries(configs)) {
					if (!validTypes.includes(type)) continue;
					const normalized = normalizeChannelConfig(config);
					if (!((normalized.connectionMode || inferConnectionMode(normalized.values)) === "websocket") && normalized.webhookUrl) urls[type] = normalized.webhookUrl;
					else urls[type] = "";
				}
				setChannelWebhookUrls((prev) => ({
					...prev,
					...urls
				}));
			}
		});
		const unsubStatusChange = adapter.on("claw:channel-status-change", (data) => {
			const { statusMap: liveMap } = data;
			if (liveMap) applyChannelStatusMap(liveMap);
		});
		const unsubIOAMachine = adapter.on("claw:is-ioa-machine-result", (data) => {
			const { isIOAMachine: detected } = data;
			setIsIOAMachine(!!detected);
		});
		const unsubIOAImOverride = adapter.on("claw:ioa-im-override-result", (data) => {
			const { allowNonTencentIM } = data;
			setIoaImOverrideAllowed(!!allowNonTencentIM);
		});
		const onIOAImOverrideChanged = (e) => {
			const { allowNonTencentIM } = e.detail;
			setIoaImOverrideAllowed(!!allowNonTencentIM);
		};
		window.addEventListener("ioa-im-override-changed", onIOAImOverrideChanged);
		const unsubWebhookUrl = adapter.on("claw:automation-wecom-webhook-url-result", (data) => {
			const { url } = data;
			const resolvedUrl = url || "";
			setAutomationWebhookUrl(resolvedUrl);
			setWebhookUrlInput(resolvedUrl);
		});
		const unsubPushConfig = adapter.on("claw:automation-wecom-push-config-result", (data) => {
			const config = data;
			if (config?.success === false) {
				if (config.errorCode === "WECOM_BOT_ID_CONFLICT") toast({
					type: "error",
					message: t("settings.claw.automationSameBotAsAssistant")
				});
				return;
			}
			if (config) {
				setAutomationPushMode("websocket");
				if (config.botId) {
					setAutomationWsBotId(config.botId);
					setAutomationWsBotIdInput(config.botId);
				}
				if (config.botSecret) {
					setAutomationWsBotSecret(config.botSecret);
					setAutomationWsBotSecretInput(config.botSecret);
				}
			}
			setAutomationPushConfigLoaded(true);
		});
		adapter.emit("claw:get-channel-status");
		adapter.emit("claw:get-saved-channel-configs");
		adapter.emit("claw:get-wecom-enabled");
		adapter.emit("claw:get-is-ioa-machine");
		adapter.emit("claw:get-ioa-im-override");
		adapter.emit("claw:get-automation-wecom-push-config");
		return () => {
			unsubStatus?.();
			unsubWebhook?.();
			unsubWecom?.();
			unsubYuanbaoScanBind?.();
			unsubYuanbaoScanStatus?.();
			unsubConfigs?.();
			unsubStatusChange?.();
			unsubIOAMachine?.();
			unsubIOAImOverride?.();
			window.removeEventListener("ioa-im-override-changed", onIOAImOverrideChanged);
			unsubWebhookUrl?.();
			unsubPushConfig?.();
		};
	}, [
		adapter,
		applyChannelStatusMap,
		startYuanbaoScanPolling,
		stopYuanbaoScanPolling,
		t,
		triggerYuanbaoRegister
	]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:channel-config-saved", (_data) => {
			adapter?.emit("claw:get-saved-channel-configs");
		});
		return () => {
			unsubscribe?.();
		};
	}, [adapter]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:wechatkf-get-link-result", (data) => {
			const result = data;
			if (result.success && result.url) {
				setWechatKfState("linked");
				setWechatKfUrl(result.url);
				setWechatKfExpiresIn(result.expiresIn || 240);
				setWechatKfErrorMessage("");
			} else {
				setWechatKfState("error");
				setWechatKfUrl("");
				setWechatKfErrorMessage(result.message || t("settings.claw.wechatkfLinkFailed"));
				const startTime = configActionStartRef.current["wechatkf"] || Date.now();
				delete configActionStartRef.current["wechatkf"];
				adapter?.reportTelemetry("claw_config_action", {
					type: "wechatkf",
					action: "add",
					mode: "webhook",
					isSuccessful: false,
					cost: Date.now() - startTime,
					messageErrorCode: result.message || "E_UNKNOWN"
				});
			}
		});
		return () => {
			unsubscribe?.();
		};
	}, [adapter, t]);
	(0, import_react.useEffect)(() => {
		if (wechatKfState !== "linked" || wechatKfExpiresIn <= 0) return;
		const timer = setInterval(() => {
			setWechatKfExpiresIn((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					setWechatKfState("expired");
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, [wechatKfState]);
	(0, import_react.useEffect)(() => {
		if (wechatKfState === "bound" && wechatKfQrDialogOpen) setWechatKfQrDialogOpen(false);
	}, [wechatKfState, wechatKfQrDialogOpen]);
	(0, import_react.useEffect)(() => {
		if (yuanbaoScanState === "success" && yuanbaoScanDialogOpen) setYuanbaoScanDialogOpen(false);
	}, [yuanbaoScanState, yuanbaoScanDialogOpen]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:wechatkf-bind-success", (data) => {
			if (data.success) {
				setWechatKfState("bound");
				reportEvent(Events.WechatLinked, {});
				toast.success(t("settings.claw.channelConnectedToast", { name: t("settings.claw.wechatkfIntegration") }));
				const startTime = configActionStartRef.current["wechatkf"] || Date.now();
				delete configActionStartRef.current["wechatkf"];
				adapter?.reportTelemetry("claw_config_action", {
					type: "wechatkf",
					action: "add",
					mode: "webhook",
					isSuccessful: true,
					cost: Date.now() - startTime
				});
			}
		});
		return () => {
			unsubscribe?.();
		};
	}, [
		adapter,
		reportEvent,
		Events,
		t
	]);
	(0, import_react.useEffect)(() => {
		if (wechatKfInitialLoaded && !wechatKfBindStatusLoaded) {
			setWechatKfBindStatusLoaded(true);
			setWechatKfState((prev) => prev === "idle" && wechatKfInitialBound ? "bound" : prev);
		}
	}, [
		wechatKfInitialLoaded,
		wechatKfInitialBound,
		wechatKfBindStatusLoaded
	]);
	(0, import_react.useEffect)(() => {
		if (!adapter) return;
		const unsubscribe = adapter.on("claw:wechatkf-bindstatus-result", (data) => {
			if (data.bound) setWechatKfState("bound");
			setWechatKfBindStatusLoaded(true);
		});
		adapter.emit("claw:wechatkf-get-bindstatus");
		return () => {
			unsubscribe?.();
		};
	}, [adapter]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:wechatkf-unbind-result", (data) => {
			const result = data;
			if (result.success) {
				setWechatKfState("idle");
				setWechatKfUrl("");
				setWechatKfErrorMessage("");
			} else {
				setWechatKfState("bound");
				setWechatKfErrorMessage(result.message || t("settings.claw.wechatkfUnbindFailed"));
			}
			const startTime = configActionStartRef.current["wechatkf"] || Date.now();
			delete configActionStartRef.current["wechatkf"];
			adapter?.reportTelemetry("claw_config_action", {
				type: "wechatkf",
				action: "remove",
				mode: "webhook",
				isSuccessful: result.success,
				cost: Date.now() - startTime,
				...result.success ? {} : { messageErrorCode: result.message || "E_UNKNOWN" }
			});
		});
		return () => {
			unsubscribe?.();
		};
	}, [adapter, t]);
	(0, import_react.useEffect)(() => {
		if (yuanbaoScanState !== "ready" && yuanbaoScanState !== "scanned" || yuanbaoScanExpiresIn <= 0) return;
		const timer = setTimeout(() => {
			yuanbaoActiveScanCodeRef.current = null;
			stopYuanbaoScanPolling();
			setYuanbaoScanState("expired");
			setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindExpired"));
		}, yuanbaoScanExpiresIn * 1e3);
		return () => clearTimeout(timer);
	}, [
		yuanbaoScanState,
		yuanbaoScanExpiresIn,
		stopYuanbaoScanPolling,
		t
	]);
	(0, import_react.useEffect)(() => () => {
		yuanbaoActiveScanCodeRef.current = null;
		stopYuanbaoScanPolling();
	}, [stopYuanbaoScanPolling]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:weixinbot-qr-wait-result", (data) => {
			const result = data;
			if (result.connected) {
				setWeixinBotLoginState("idle");
				setWeixinBotQrUrl("");
				setWeixinBotExpiresIn(0);
				setWeixinBotLoginError("");
				setChannelStatuses((prev) => ({
					...prev,
					weixinClawBot: "connected"
				}));
				setWeixinBotQrDialogOpen(false);
				toast.success(t("settings.claw.channelConnectedToast", { name: t("settings.claw.weixinBotIntegration") }));
				adapter?.emit("claw:get-channel-status");
			} else {
				setWeixinBotLoginState("error");
				setWeixinBotLoginError(result.message || "Login failed");
			}
		});
		return () => {
			unsubscribe?.();
		};
	}, [adapter, t]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:register-channel-result", (data) => {
			const { channelType, success, webhookUrl, connectionMode, error, errorCode, nextStatus } = data;
			const successStatus = connectionMode === "webhook" ? "registered" : "connected";
			if (success) {
				if (channelType === "yuanbao" && yuanbaoScanState === "confirming") {
					setYuanbaoScanState("success");
					setYuanbaoScanStatusHint(t("settings.claw.yuanbaoScanBindSuccess"));
					setYuanbaoScanErrorMessage("");
				}
				setChannelStatuses((prev) => {
					if (prev[channelType] === successStatus) return prev;
					return {
						...prev,
						[channelType]: successStatus
					};
				});
				setChannelRegisterErrors((prev) => {
					if (!prev[channelType]) return prev;
					const next = { ...prev };
					delete next[channelType];
					return next;
				});
				setPendingChannel((prev) => prev === channelType ? null : prev);
				setActiveDialog((prev) => {
					if (prev === channelType) {
						modeFormCacheRef.current = {};
						setFormValues({});
						return null;
					}
					return prev;
				});
				if (shouldShowAutomationLastStep(channelType, automationAssistantBindRef.current)) {
					automationBindWasUrlRef.current = channelType === "wecomaibot" && connectionMode === "webhook";
					automationAssistantBindRef.current = false;
					returnToAutomationAfterBindRef.current = true;
					setShowAutomationLastStep(true);
				}
				if (channelType === "qq") {
					setQqBindDialogOpen(false);
					setQqMoreOpen(false);
				}
				if (channelType === "wecomaibot") {
					setWecomBindDialogOpen(false);
					setWecomMoreOpen(false);
					toast.success(t("settings.claw.channelConnectedToast", { name: t("settings.claw.wecomAibotIntegration") }));
				}
			} else {
				if (channelType === "yuanbao" && yuanbaoScanState === "confirming") {
					setYuanbaoScanState("error");
					setYuanbaoScanErrorMessage(formatRegisterErrorMessage(error, errorCode));
				}
				const failureStatus = nextStatus || (errorCode === "AUTH_FAILED" ? "idle" : "failed");
				setChannelStatuses((prev) => {
					if (prev[channelType] === failureStatus) return prev;
					return {
						...prev,
						[channelType]: failureStatus
					};
				});
				setPendingChannel((prev) => prev === channelType ? null : prev);
				setChannelRegisterErrors((prev) => ({
					...prev,
					[channelType]: formatRegisterErrorMessage(error, errorCode)
				}));
				if (channelType === "wecomaibot" && connectionMode === "webhook") toast.error(t("settings.claw.wecomAibot.connectFailedRetry"));
			}
			if (success) {
				setChannelWebhookUrls((prev) => {
					if (webhookUrl) return {
						...prev,
						[channelType]: webhookUrl
					};
					if (connectionMode === "webhook" && prev[channelType]) return prev;
					return {
						...prev,
						[channelType]: ""
					};
				});
				adapter?.emit("claw:get-channel-status");
				adapter?.emit("claw:get-saved-channel-configs");
			}
			if (!TOGGLE_ONLY_CHANNELS.has(channelType)) {
				const startTime = configActionStartRef.current[channelType] || Date.now();
				delete configActionStartRef.current[channelType];
				adapter?.reportTelemetry("claw_config_action", {
					type: channelType,
					action: "add",
					mode: connectionMode || "websocket",
					isSuccessful: success,
					cost: Date.now() - startTime,
					...success ? {} : { messageErrorCode: error || "E_UNKNOWN" }
				});
			}
		});
		return () => {
			unsubscribe?.();
		};
	}, [
		adapter,
		formatRegisterErrorMessage,
		t,
		yuanbaoScanState
	]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = adapter?.on("claw:unregister-channel-result", (data) => {
			const { channelType, success, isRollbackFromRegister } = data;
			setUnbindingChannels((prev) => {
				if (!prev[channelType]) return prev;
				const next = { ...prev };
				delete next[channelType];
				return next;
			});
			if (success) {
				setChannelStatuses((prev) => ({
					...prev,
					[channelType]: "idle"
				}));
				setChannelWebhookUrls((prev) => ({
					...prev,
					[channelType]: ""
				}));
				if (!isRollbackFromRegister) setChannelRegisterErrors((prev) => {
					if (!prev[channelType]) return prev;
					const next = { ...prev };
					delete next[channelType];
					return next;
				});
				delete savedConfigsRef.current[channelType];
			}
			if (!TOGGLE_ONLY_CHANNELS.has(channelType)) {
				const startTime = configActionStartRef.current[channelType] || Date.now();
				delete configActionStartRef.current[channelType];
				adapter?.reportTelemetry("claw_config_action", {
					type: channelType,
					action: "remove",
					isSuccessful: success,
					cost: Date.now() - startTime
				});
			}
		});
		return () => {
			unsubscribe?.();
		};
	}, [adapter]);
	const handleSystemNotificationChange = (0, import_react.useCallback)((checked) => {
		setSystemNotification(checked);
		setWecomEnabled(checked);
		adapter?.emit("claw:system-notification", { enabled: checked });
	}, [adapter]);
	const handleWecomEnabledChange = (0, import_react.useCallback)((checked) => {
		setWecomEnabled(checked);
		adapter?.emit("claw:wecom-enabled", { enabled: checked });
		adapter?.reportTelemetry("claw_config_action", {
			type: "wecomIOA",
			action: checked ? "enable" : "disable",
			status: "success",
			isSuccessful: true
		});
	}, [adapter]);
	const handleSaveWsBotConfig = (0, import_react.useCallback)(() => {
		if (!adapter || automationWsSaving) return;
		const botId = automationWsBotIdInput.trim();
		const botSecret = automationWsBotSecretInput.trim();
		if (!botId || !botSecret) {
			const missingFields = [];
			if (!botId) missingFields.push(t("settings.claw.automationWsBotId"));
			if (!botSecret) missingFields.push(t("settings.claw.automationWsBotSecret"));
			toast.error(t("settings.claw.requiredFieldsMissing", { fields: missingFields.join("、") }));
			return;
		}
		if (botId === automationWsBotId && botSecret === automationWsBotSecret) return;
		const assistantBotId = getAssistantWecomWebsocketBotId(savedConfigsRef.current["wecomaibot"]);
		if (assistantBotId && assistantBotId === botId) {
			toast({
				type: "error",
				message: t("settings.claw.automationSameBotAsAssistant")
			});
			return;
		}
		setAutomationWsSaving(true);
		adapter.emit("claw:set-automation-wecom-push-config", {
			mode: "websocket",
			webhookUrl: automationWebhookUrl || void 0,
			botId,
			botSecret
		});
		setAutomationWsBotId(botId);
		setAutomationWsBotSecret(botSecret);
		setAutomationWsSaving(false);
	}, [
		adapter,
		automationWsSaving,
		automationWsBotIdInput,
		automationWsBotSecretInput,
		automationWebhookUrl,
		automationWsBotId,
		automationWsBotSecret
	]);
	const automationQuickBindTimeoutRef = (0, import_react.useRef)(null);
	const executeAutomationQuickBind = (0, import_react.useCallback)(() => {
		setAutomationQuickBindLoading(true);
		if (automationQuickBindTimeoutRef.current) clearTimeout(automationQuickBindTimeoutRef.current);
		automationQuickBindTimeoutRef.current = setTimeout(() => {
			setAutomationQuickBindLoading(false);
			automationQuickBindTimeoutRef.current = null;
		}, 18e4);
		import_wecom_aibot_sdk_umd.default.closeWindow();
		import_wecom_aibot_sdk_umd.default.openBotInfoAuthWindow({ source: "codebuddy" }).then((bot) => {
			if (!adapter || !bot.botid || !bot.secret) return;
			const assistantBotId = getAssistantWecomWebsocketBotId(savedConfigsRef.current["wecomaibot"]);
			if (assistantBotId && assistantBotId === bot.botid) {
				toast({
					type: "error",
					message: t("settings.claw.automationSameBotAsAssistant")
				});
				return;
			}
			adapter.emit("claw:set-automation-wecom-push-config", {
				mode: "websocket",
				webhookUrl: automationWebhookUrl || void 0,
				botId: bot.botid,
				botSecret: bot.secret
			});
			setAutomationWsBotId(bot.botid);
			setAutomationWsBotSecret(bot.secret);
			setAutomationConfigDialogOpen(false);
			setAutomationMoreOpen(false);
			if (automationStandaloneBindRef.current) {
				automationStandaloneBindRef.current = false;
				returnToAutomationAfterBindRef.current = true;
			}
			setShowAutomationLastStep(true);
		}).catch((error) => {
			if (error?.code === "CANCELLED") return;
			let errorMessage;
			switch (error?.code) {
				case "WINDOW_BLOCKED":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorWindowBlocked");
					break;
				case "INVALID_SOURCE":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorInvalidSource");
					break;
				case "ACCESS_DENIED":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorAccessDenied");
					break;
				case "AUTH_TIMEOUT":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorTimeout");
					break;
				default: errorMessage = t("settings.claw.wecomAibot.quickBindErrorUnknown").replace("{message}", error?.message || error?.code || "");
			}
			toast({
				type: "error",
				message: errorMessage
			});
		}).finally(() => {
			setAutomationQuickBindLoading(false);
			if (automationQuickBindTimeoutRef.current) {
				clearTimeout(automationQuickBindTimeoutRef.current);
				automationQuickBindTimeoutRef.current = null;
			}
		});
	}, [
		t,
		adapter,
		automationWebhookUrl
	]);
	const handleAutomationQuickBind = (0, import_react.useCallback)(() => {
		const hasBotId = automationWsBotIdInput.trim();
		const hasBotSecret = automationWsBotSecretInput.trim();
		if (hasBotId || hasBotSecret) setShowAutomationOverwriteConfirm(true);
		else executeAutomationQuickBind();
	}, [
		executeAutomationQuickBind,
		automationWsBotIdInput,
		automationWsBotSecretInput
	]);
	const handleAutomationOverwriteConfirm = (0, import_react.useCallback)(() => {
		setShowAutomationOverwriteConfirm(false);
		executeAutomationQuickBind();
	}, [executeAutomationQuickBind]);
	const handleAutomationOverwriteCancel = (0, import_react.useCallback)(() => {
		setShowAutomationOverwriteConfirm(false);
	}, []);
	const handleOpenExternalLink = (0, import_react.useCallback)((url) => {
		if (isLocalMode) adapter?.emit("open-external", url);
		else window.open(url, "_blank", "noopener,noreferrer");
	}, [adapter, isLocalMode]);
	const handleWechatKfSetup = (0, import_react.useCallback)(() => {
		setWechatKfState("loading");
		setWechatKfUrl("");
		configActionStartRef.current["wechatkf"] = Date.now();
		adapter?.emit("claw:wechatkf-get-link");
	}, [adapter]);
	const handleWechatKfUnbind = (0, import_react.useCallback)(() => {
		setWechatKfState("unbinding");
		configActionStartRef.current["wechatkf"] = Date.now();
		adapter?.emit("claw:wechatkf-unbind");
	}, [adapter]);
	const handleOpenDialog = (0, import_react.useCallback)((channelType) => {
		const savedConfig = savedConfigsRef.current[channelType];
		const normalized = savedConfig ? normalizeChannelConfig(savedConfig) : void 0;
		const savedValues = normalized?.values;
		const defaults = {};
		const config = CHANNEL_CONFIGS.find((c) => c.type === channelType);
		const restoredMode = normalized ? normalized.connectionMode || inferConnectionMode(savedValues) : void 0;
		const modeCache = {};
		let resolvedMode;
		if (config) {
			if (config.modes) {
				const modesToUse = isBotWebhookUrlEnabled ? config.modes : config.modes.filter((mode) => mode.modeValue !== "webhook");
				const isQQ = channelType === "qq";
				let safeMode;
				if (isQQ && (!restoredMode || restoredMode === "scan")) safeMode = modesToUse[0]?.modeValue;
				else safeMode = modesToUse.some((mode) => mode.modeValue === restoredMode) ? restoredMode : modesToUse[0]?.modeValue;
				for (const mode of modesToUse) if (mode.modeValue === safeMode && savedValues) {
					const modeDefaults = {};
					for (const input of mode.inputs) {
						const savedValue = savedValues[input.field];
						if (savedValue !== void 0 && savedValue !== null) modeDefaults[input.field] = String(savedValue);
					}
					modeCache[mode.modeValue] = modeDefaults;
				} else modeCache[mode.modeValue] = {};
				if (safeMode) {
					Object.assign(defaults, modeCache[safeMode] || {});
					setSelectedMode(safeMode);
					resolvedMode = safeMode;
				}
			} else if (savedValues) for (const input of config.inputs) {
				const savedValue = savedValues[input.field];
				if (savedValue !== void 0 && savedValue !== null) defaults[input.field] = String(savedValue);
			}
		}
		modeFormCacheRef.current = modeCache;
		setFormValues({ ...defaults });
		if (!config?.modes) setSelectedMode(restoredMode || "websocket");
		if (channelType === "feishu") {
			const savedCustomHost = (defaults["customHost"] ?? "").trim();
			const defaultHost = (config?.modes?.find((m) => m.modeValue === "websocket")?.inputs.find((i) => i.field === "customHost"))?.defaultValue ?? "";
			setIsEditingFeishuHost(savedCustomHost !== "" && savedCustomHost !== defaultHost);
		} else setIsEditingFeishuHost(false);
		if (channelType === "wecomaibot") {
			const savedCustomWsUrl = (defaults["customWsUrl"] ?? "").trim();
			const defaultWsUrl = (config?.modes?.find((m) => m.modeValue === "websocket")?.inputs.find((i) => i.field === "customWsUrl"))?.defaultValue ?? "";
			setIsEditingWecomAibotWsUrl(savedCustomWsUrl !== "" && savedCustomWsUrl !== defaultWsUrl);
		} else setIsEditingWecomAibotWsUrl(false);
		setChannelRegisterErrors((prev) => {
			if (!prev[channelType]) return prev;
			const next = { ...prev };
			delete next[channelType];
			return next;
		});
		setActiveDialog(channelType);
		return resolvedMode;
	}, [isBotWebhookUrlEnabled]);
	const handleCloseDialog = (0, import_react.useCallback)(() => {
		automationAssistantBindRef.current = false;
		setActiveDialog(null);
		setPendingChannel(null);
		modeFormCacheRef.current = {};
		setFormValues({});
		qqScanDisposeRef.current?.();
		qqScanDisposeRef.current = void 0;
		setQQScanState("idle");
		setQQScanQrUrl("");
		setQQScanBindToken("");
		setQQScanError("");
		setIsEditingFeishuHost(false);
		setIsEditingWecomAibotWsUrl(false);
	}, []);
	const handleDismissAutomationLastStep = (0, import_react.useCallback)(() => {
		setShowAutomationLastStep(false);
		if (automationBindWasUrlRef.current) {
			automationBindWasUrlRef.current = false;
			toast.warning(t("automation.modal.wecomBotSource.urlTagTooltip"));
		}
		if (shouldReturnToAutomationOnDismiss(returnToAutomationAfterBindRef.current)) {
			returnToAutomationAfterBindRef.current = false;
			closeSettings();
		}
	}, [closeSettings, t]);
	const handleCloseAutomationLastStep = (0, import_react.useCallback)(() => {
		setShowAutomationLastStep(false);
	}, []);
	const handleOpenQqBindDialog = (0, import_react.useCallback)(() => {
		const resolvedMode = handleOpenDialog("qq");
		if (resolvedMode === "websocket" || resolvedMode === "webhook") {
			setSelectedMode(resolvedMode);
			setQqMoreOpen(true);
		} else {
			setSelectedMode("scan");
			setQqMoreOpen(false);
		}
		setQqBindDialogOpen(true);
	}, [handleOpenDialog]);
	const handleCloseQqBindDialog = (0, import_react.useCallback)(() => {
		setQqBindDialogOpen(false);
		setQqMoreOpen(false);
		handleCloseDialog();
	}, [handleCloseDialog]);
	const handleOpenWecomBindDialog = (0, import_react.useCallback)(() => {
		if (handleOpenDialog("wecomaibot") === "webhook") {
			setSelectedMode("webhook");
			setWecomMoreOpen(true);
		} else {
			setSelectedMode("websocket");
			setWecomMoreOpen(false);
		}
		setWecomBindDialogOpen(true);
	}, [handleOpenDialog]);
	const handleCloseWecomBindDialog = (0, import_react.useCallback)(() => {
		setWecomBindDialogOpen(false);
		setWecomMoreOpen(false);
		handleCloseDialog();
	}, [handleCloseDialog]);
	(0, import_react.useEffect)(() => {
		if (!subRoute) return;
		if (subRoute === "automation-push") {
			automationStandaloneBindRef.current = true;
			setAutomationMoreOpen(false);
			setAutomationConfigDialogOpen(true);
			switchTab("claw");
		} else if (subRoute === "wecomaibot") {
			if (!savedConfigsLoaded) return;
			automationAssistantBindRef.current = true;
			handleOpenWecomBindDialog();
			switchTab("claw");
		}
	}, [
		subRoute,
		savedConfigsLoaded,
		switchTab,
		handleOpenWecomBindDialog
	]);
	const handleRegister = (0, import_react.useCallback)(() => {
		if (!activeDialog || registerPending) return;
		const config = CHANNEL_CONFIGS.find((c) => c.type === activeDialog);
		if (!config) return;
		let activeInputs = config.inputs;
		const modesToUse = config.modes ? isBotWebhookUrlEnabled ? config.modes : config.modes.filter((mode) => mode.modeValue !== "webhook") : void 0;
		const resolvedMode = modesToUse?.some((mode) => mode.modeValue === selectedMode) ? selectedMode : modesToUse?.[0]?.modeValue;
		const currentMode = resolvedMode;
		if (modesToUse && resolvedMode) {
			const modeConfig = modesToUse.find((m) => m.modeValue === resolvedMode);
			if (modeConfig) activeInputs = modeConfig.inputs;
		}
		const missingInputs = activeInputs.filter((input) => input.required && !formValues[input.field]?.trim());
		if (missingInputs.length > 0) {
			const fieldNames = missingInputs.map((input) => t(input.placeholderKey)).join("、");
			toast.error(t("settings.claw.requiredFieldsMissing", { fields: fieldNames }));
			return;
		}
		const visibleInputs = activeInputs.filter((input) => {
			if (!input.visibleWhenFeature) return true;
			if (input.visibleWhenFeature === "EnableFeishuCustomHost") return isFeishuCustomHostEnabled;
			if (input.visibleWhenFeature === "EnableWecomAibotCustomWsUrl") return isWecomAibotCustomWsUrlEnabled;
			return false;
		});
		const effectiveValues = {};
		for (const input of visibleInputs) {
			const raw = formValues[input.field];
			if (raw === void 0 || raw === "") {
				if (input.defaultValue !== void 0) effectiveValues[input.field] = input.defaultValue;
			} else effectiveValues[input.field] = raw;
		}
		if (activeDialog === "feishu" && currentMode === "websocket" && isFeishuCustomHostEnabled && !isEditingFeishuHost) {
			const customHostInput = visibleInputs.find((i) => i.field === "customHost");
			if (customHostInput?.defaultValue !== void 0) effectiveValues.customHost = customHostInput.defaultValue;
		}
		if (activeDialog === "wecomaibot" && currentMode === "websocket" && isWecomAibotCustomWsUrlEnabled && !isEditingWecomAibotWsUrl) {
			const customWsUrlInput = visibleInputs.find((i) => i.field === "customWsUrl");
			if (customWsUrlInput?.defaultValue !== void 0) effectiveValues.customWsUrl = customWsUrlInput.defaultValue;
		}
		if (activeDialog === "feishu" && currentMode === "websocket" && isFeishuCustomHostEnabled && isEditingFeishuHost) {
			const host = (formValues.customHost ?? "").trim();
			if (!host) {
				toast.error(t("settings.claw.feishu.customHostRequired"));
				return;
			}
			if (!/^https?:\/\/.+/i.test(host)) {
				toast.error(t("settings.claw.feishu.invalidHost"));
				return;
			}
			effectiveValues.customHost = host;
		}
		if (activeDialog === "wecomaibot" && currentMode === "websocket" && isWecomAibotCustomWsUrlEnabled && isEditingWecomAibotWsUrl) {
			const wsUrl = (formValues.customWsUrl ?? "").trim();
			if (!wsUrl) {
				toast.error(t("settings.claw.wecomAibot.customWsUrlRequired"));
				return;
			}
			if (!/^wss?:\/\/.+/i.test(wsUrl)) {
				toast.error(t("settings.claw.wecomAibot.invalidWsUrl"));
				return;
			}
			effectiveValues.customWsUrl = wsUrl;
		}
		const { channelId, extra } = config.buildParams(effectiveValues, currentMode);
		setChannelRegisterErrors((prev) => {
			if (!prev[activeDialog]) return prev;
			const next = { ...prev };
			delete next[activeDialog];
			return next;
		});
		setPendingChannel(activeDialog);
		configActionStartRef.current[activeDialog] = Date.now();
		adapter?.emit("claw:register-channel", {
			channelType: activeDialog,
			channelId,
			extra: {
				...extra,
				replyPolicy: config.defaultReplyPolicy
			}
		});
	}, [
		activeDialog,
		adapter,
		selectedMode,
		registerPending,
		formValues,
		isBotWebhookUrlEnabled,
		isFeishuCustomHostEnabled,
		isEditingFeishuHost,
		isWecomAibotCustomWsUrlEnabled,
		isEditingWecomAibotWsUrl,
		t
	]);
	const handleInputChange = (0, import_react.useCallback)((field, value) => {
		setFormValues((prev) => {
			if (prev[field] === value) return prev;
			return {
				...prev,
				[field]: value
			};
		});
	}, []);
	const quickBindTimeoutRef = (0, import_react.useRef)(null);
	const executeQuickBind = (0, import_react.useCallback)(() => {
		setQuickBindLoading(true);
		if (quickBindTimeoutRef.current) clearTimeout(quickBindTimeoutRef.current);
		quickBindTimeoutRef.current = setTimeout(() => {
			setQuickBindLoading(false);
			quickBindTimeoutRef.current = null;
		}, 18e4);
		import_wecom_aibot_sdk_umd.default.closeWindow();
		import_wecom_aibot_sdk_umd.default.openBotInfoAuthWindow({ source: "codebuddy" }).then((bot) => {
			setFormValues((prev) => ({
				...prev,
				botId: bot.botid,
				botSecret: bot.secret
			}));
			modeFormCacheRef.current.websocket = {
				...modeFormCacheRef.current.websocket || {},
				botId: bot.botid,
				botSecret: bot.secret
			};
		}).catch((error) => {
			if (error?.code === "CANCELLED") return;
			let errorMessage;
			switch (error?.code) {
				case "WINDOW_BLOCKED":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorWindowBlocked");
					break;
				case "INVALID_SOURCE":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorInvalidSource");
					break;
				case "ACCESS_DENIED":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorAccessDenied");
					break;
				case "AUTH_TIMEOUT":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorTimeout");
					break;
				default: errorMessage = t("settings.claw.wecomAibot.quickBindErrorUnknown").replace("{message}", error?.message || error?.code || "");
			}
			toast({
				type: "error",
				message: errorMessage
			});
		}).finally(() => {
			setQuickBindLoading(false);
			if (quickBindTimeoutRef.current) {
				clearTimeout(quickBindTimeoutRef.current);
				quickBindTimeoutRef.current = null;
			}
		});
	}, [t]);
	const executeQuickBindAndRegister = (0, import_react.useCallback)(() => {
		setQuickBindLoading(true);
		if (quickBindTimeoutRef.current) clearTimeout(quickBindTimeoutRef.current);
		quickBindTimeoutRef.current = setTimeout(() => {
			setQuickBindLoading(false);
			quickBindTimeoutRef.current = null;
		}, 18e4);
		import_wecom_aibot_sdk_umd.default.closeWindow();
		import_wecom_aibot_sdk_umd.default.openBotInfoAuthWindow({ source: "codebuddy" }).then((bot) => {
			if (automationWsBotId && automationWsBotId === bot.botid) {
				toast({
					type: "error",
					message: t("settings.claw.assistantSameBotAsAutomation")
				});
				return;
			}
			const config = CHANNEL_CONFIGS.find((c) => c.type === "wecomaibot");
			if (!config) return;
			const { channelId, extra } = config.buildParams({
				botId: bot.botid,
				botSecret: bot.secret,
				customWsUrl: ""
			}, "websocket");
			setPendingChannel("wecomaibot");
			configActionStartRef.current.wecomaibot = Date.now();
			adapter?.emit("claw:register-channel", {
				channelType: "wecomaibot",
				channelId,
				extra: {
					...extra,
					replyPolicy: config.defaultReplyPolicy
				}
			});
		}).catch((error) => {
			if (error?.code === "CANCELLED") return;
			let errorMessage;
			switch (error?.code) {
				case "WINDOW_BLOCKED":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorWindowBlocked");
					break;
				case "INVALID_SOURCE":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorInvalidSource");
					break;
				case "ACCESS_DENIED":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorAccessDenied");
					break;
				case "AUTH_TIMEOUT":
					errorMessage = t("settings.claw.wecomAibot.quickBindErrorTimeout");
					break;
				default: errorMessage = t("settings.claw.wecomAibot.quickBindErrorUnknown").replace("{message}", error?.message || error?.code || "");
			}
			toast({
				type: "error",
				message: errorMessage
			});
		}).finally(() => {
			setQuickBindLoading(false);
			if (quickBindTimeoutRef.current) {
				clearTimeout(quickBindTimeoutRef.current);
				quickBindTimeoutRef.current = null;
			}
		});
	}, [
		adapter,
		t,
		automationWsBotId
	]);
	const handleOverwriteConfirm = (0, import_react.useCallback)(() => {
		setShowOverwriteConfirm(false);
		executeQuickBind();
	}, [executeQuickBind]);
	const handleOverwriteCancel = (0, import_react.useCallback)(() => {
		setShowOverwriteConfirm(false);
	}, []);
	const handleUnbindChannel = (0, import_react.useCallback)((channelType) => {
		setShowUnbindConfirm(channelType);
	}, []);
	const handleUnbindConfirm = (0, import_react.useCallback)(() => {
		if (!showUnbindConfirm) return;
		const channelType = showUnbindConfirm;
		setShowUnbindConfirm(null);
		setUnbindingChannels((prev) => ({
			...prev,
			[channelType]: true
		}));
		configActionStartRef.current[channelType] = Date.now();
		adapter?.emit("claw:unregister-channel", { channelType });
	}, [adapter, showUnbindConfirm]);
	const handleUnbindCancel = (0, import_react.useCallback)(() => {
		setShowUnbindConfirm(null);
	}, []);
	const handleCopyWebhookUrl = (0, import_react.useCallback)(async (channelType) => {
		const url = channelWebhookUrls[channelType];
		if (url) {
			if (await copyToClipboard(url)) {
				setCopiedChannel(channelType);
				setTimeout(() => setCopiedChannel(null), 2e3);
			}
		}
	}, [channelWebhookUrls]);
	const activeConfig = activeDialog ? CHANNEL_CONFIGS.find((c) => c.type === activeDialog) : null;
	const restrictedChannelsWithConfig = shouldRestrictChannels ? CHANNEL_CONFIGS.filter((c) => {
		if (!isChannelRestrictedByIOAPolicy(c, {
			shouldRestrictChannels,
			isPersonalIOAMachine,
			allowOverseasIMOnIOAMachine
		})) return false;
		const cfg = savedConfigsRef.current[c.type];
		if (!cfg) return false;
		return cfg.extra || cfg.enabled !== void 0;
	}) : [];
	const hasRestrictedConfigs = restrictedChannelsWithConfig.length > 0;
	const handleWeixinBotSetup = (0, import_react.useCallback)(() => {
		setWeixinBotLoginState("loading");
		setWeixinBotLoginError("");
		setWeixinBotQrUrl("");
		setWeixinBotExpiresIn(0);
		adapter?.emit("claw:weixinbot-start-qr-login");
	}, [adapter]);
	const handleWeixinBotUnbind = (0, import_react.useCallback)(() => {
		adapter?.emit("claw:unregister-channel", { channelType: "weixinClawBot" });
		setWeixinBotLoginState("idle");
		setWeixinBotQrUrl("");
		setWeixinBotExpiresIn(0);
		setChannelStatuses((prev) => ({
			...prev,
			weixinClawBot: "idle"
		}));
	}, [adapter]);
	const handleCloseWeixinBotQrDialog = (0, import_react.useCallback)(() => {
		setWeixinBotQrDialogOpen(false);
		setWeixinBotLoginState("idle");
		setWeixinBotQrUrl("");
		setWeixinBotExpiresIn(0);
		setWeixinBotLoginError("");
	}, []);
	(0, import_react.useEffect)(() => {
		const unsubStart = adapter?.on("claw:weixinbot-qr-start-result", (data) => {
			const result = data;
			if (result.qrCodeUrl) {
				setWeixinBotQrUrl(result.qrCodeUrl);
				setWeixinBotExpiresIn(120);
				setWeixinBotLoginState("scanning");
				adapter?.emit("claw:weixinbot-wait-qr-login", { qrCode: result.qrCode || result.qrCodeUrl });
			} else {
				setWeixinBotLoginState("error");
				setWeixinBotLoginError(result.message || t("settings.claw.weixinBot.qrFetchFailed"));
			}
		});
		return () => {
			unsubStart?.();
		};
	}, [adapter, t]);
	(0, import_react.useEffect)(() => {
		if (weixinBotLoginState !== "scanning" || weixinBotExpiresIn <= 0) return;
		const timer = setInterval(() => {
			setWeixinBotExpiresIn((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					setWeixinBotLoginState("expired");
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, [weixinBotLoginState]);
	const handleQQScanStart = (0, import_react.useCallback)(async () => {
		if (qqScanState === "loading" || qqScanState === "scanning") return;
		qqScanDisposeRef.current?.();
		qqScanDisposeRef.current = void 0;
		setQQScanState("loading");
		setQQScanError("");
		setQQScanQrUrl("");
		setQQScanBindToken("");
		if (!facades?.agentIm) {
			setQQScanState("error");
			setQQScanError(t("settings.claw.qq.scanUnsupported"));
			return;
		}
		try {
			const { promise, dispose } = startQQBind({
				targetType: "assistant",
				targetId: "default",
				onQrUpdate: (url) => {
					setQQScanQrUrl(url);
					setQQScanState("scanning");
				},
				onQrExpired: () => {
					setQQScanState("expired");
				},
				onBindFailed: (message) => {
					qqScanDisposeRef.current?.();
					qqScanDisposeRef.current = void 0;
					setQQScanState("error");
					setQQScanQrUrl("");
					setQQScanBindToken("");
					toast.error(message || t("settings.claw.qq.scanBindFailed"));
				},
				onBindSuccess: (_appId) => {
					qqScanDisposeRef.current?.();
					qqScanDisposeRef.current = void 0;
					setQQScanState("idle");
					setQQScanQrUrl("");
					setQQScanBindToken("");
					setActiveDialog(null);
					setQqBindDialogOpen(false);
					setQqMoreOpen(false);
					toast.success(t("settings.claw.channelConnectedToast", { name: t("settings.claw.qqBotIntegration") }));
					adapter?.emit("claw:get-channel-status");
					adapter?.emit("claw:get-saved-channel-configs");
				}
			});
			qqScanDisposeRef.current = dispose;
			const result = await promise;
			if (result.cancelled) return;
			if (result.success && (result.qrcodeUrl || result.qrcodeImgContent)) {
				setQQScanQrUrl(result.qrcodeUrl || result.qrcodeImgContent || "");
				if (result.bindToken) setQQScanBindToken(result.bindToken);
				setQQScanState("scanning");
			} else {
				setQQScanState("error");
				setQQScanError(result.message || t("settings.claw.qq.scanFetchFailed"));
			}
		} catch (err) {
			setQQScanState("error");
			setQQScanError(String(err) || t("settings.claw.qq.scanFetchFailed"));
		}
	}, [
		facades,
		startQQBind,
		adapter,
		t,
		qqScanState
	]);
	(0, import_react.useEffect)(() => {
		if (activeDialog === "qq" && selectedMode === "scan" && qqScanState === "idle") handleQQScanStart();
	}, [
		activeDialog,
		selectedMode,
		qqScanState,
		handleQQScanStart
	]);
	(0, import_react.useEffect)(() => () => {
		qqScanDisposeRef.current?.();
		qqScanDisposeRef.current = void 0;
	}, []);
	const renderChannelCard = (channel, viewOnly = false) => {
		if ((channel.renderMode || "form") === "binding-flow") return renderBindingFlowCard(channel);
		return renderFormCard(channel, viewOnly);
	};
	const renderFormCard = (channel, viewOnly = false) => {
		const status = channelStatuses[channel.type];
		const webhookUrl = channelWebhookUrls[channel.type];
		const savedConfig = savedConfigsRef.current[channel.type];
		const normalized = savedConfig ? normalizeChannelConfig(savedConfig) : void 0;
		const savedExtra = normalized?.values;
		const inferredMode = normalized?.connectionMode || inferConnectionMode(savedExtra);
		let displayInputs = channel.inputs;
		if (channel.modes) {
			const modeConfig = channel.modes.find((m) => m.modeValue === inferredMode);
			if (modeConfig) displayInputs = modeConfig.inputs;
		}
		const webhookBadgeTooltip = webhookUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "claw-webhook-tooltip",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "claw-webhook-tooltip__label",
					children: t("settings.claw.webhookLabel")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "claw-webhook-tooltip__url",
					title: webhookUrl,
					children: webhookUrl
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "claw-webhook-tooltip__copy-btn",
					onClick: () => handleCopyWebhookUrl(channel.type),
					children: copiedChannel === channel.type ? t("settings.claw.webhookCopied") : t("settings.claw.copy")
				})
			]
		}) : null;
		const withWebhookTooltip = (badge) => webhookBadgeTooltip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: webhookBadgeTooltip,
			placement: "top",
			interactive: true,
			children: badge
		}) : badge;
		const renderStatusBadge = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [status === "connecting" && !viewOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "claw-status-badge claw-status-badge--connecting",
			children: t("settings.claw.connecting")
		}), status === "registered" && channel.type !== "qq" && channel.type !== "feishu" && channel.type !== "dingtalk" && withWebhookTooltip(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "claw-status-badge claw-status-badge--registered",
			children: t("settings.claw.registered")
		}))] });
		const renderWebhookRow = () => {
			if (!webhookUrl) return null;
			if (viewOnly) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__restricted-config-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "claw-settings-panel__restricted-config-label",
						children: [t("settings.claw.webhookLabel"), ":"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "claw-settings-panel__restricted-config-value claw-settings-panel__restricted-config-value--url",
						title: webhookUrl,
						children: webhookUrl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "claw-webhook-row__copy-btn",
						onClick: () => handleCopyWebhookUrl(channel.type),
						type: "button",
						children: copiedChannel === channel.type ? t("settings.claw.webhookCopied") : t("settings.claw.copy")
					})
				]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "claw-settings-panel__card-extra",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-webhook-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-webhook-row__label",
							children: t("settings.claw.webhookLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-webhook-row__separator",
							children: "|"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-webhook-row__url",
							title: webhookUrl,
							children: webhookUrl
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "claw-webhook-row__copy-btn",
							onClick: () => handleCopyWebhookUrl(channel.type),
							children: copiedChannel === channel.type ? t("settings.claw.webhookCopied") : t("settings.claw.copy")
						})
					]
				})
			});
		};
		if (viewOnly) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "claw-settings-panel__restricted-config-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__restricted-config-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "claw-settings-panel__restricted-config-title",
						children: t(channel.titleKey, { name: clawDisplayName })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "claw-settings-panel__restricted-badge",
						children: t("settings.claw.viewOnly")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "small",
						onClick: () => handleUnbindChannel(channel.type),
						disabled: !!unbindingChannels[channel.type],
						children: unbindingChannels[channel.type] ? t("settings.claw.channelUnbinding") : t("settings.claw.channelUnbind")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__restricted-config-content",
				children: [
					channel.modes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "claw-settings-panel__restricted-config-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "claw-settings-panel__restricted-config-label",
							children: [t("settings.claw.connectionMode"), ":"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-settings-panel__restricted-config-value",
							children: inferredMode === "websocket" ? t("settings.claw.modeWebSocket") : t("settings.claw.modeWebhook")
						})]
					}),
					displayInputs.map((input) => {
						const value = savedExtra?.[input.field];
						if (value === void 0 || value === null || value === "") return null;
						const displayValue = input.type === "password" ? "••••••••" : String(value);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__restricted-config-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "claw-settings-panel__restricted-config-label",
								children: [t(input.placeholderKey), ":"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-settings-panel__restricted-config-value",
								children: displayValue
							})]
						}, input.field);
					}),
					renderWebhookRow()
				]
			})]
		}, channel.type);
		const isQrLogin = channel.renderMode === "qr-login";
		const renderActionButtons = () => {
			if (!viewOnly && !savedConfigsLoaded) return null;
			if (isQrLogin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "claw-configure-wrapper",
				children: status === "connected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "small",
					onClick: handleWeixinBotUnbind,
					children: t("settings.claw.channelDisconnect")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "small",
					onClick: () => {
						setWeixinBotQrDialogOpen(true);
						handleWeixinBotSetup();
					},
					disabled: weixinBotLoginState === "loading" || weixinBotLoginState === "scanning",
					children: weixinBotLoginState === "loading" ? t("settings.claw.weixinBot.fetchingQr") : t("settings.claw.channelConnect")
				})
			});
			if (channel.type === "qq") {
				const qqConnected = status === "connected" || status === "registered" || !!webhookUrl;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-configure-wrapper",
					children: [webhookUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("settings.claw.viewWebhook"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "small",
							iconOnly: true,
							className: "claw-webhook-view-icon",
							"aria-label": t("settings.claw.viewWebhook"),
							onClick: () => setWebhookViewChannel(channel.type),
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebhookLinkIcon, {
								width: 16,
								height: 16
							})
						})
					}), qqConnected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "small",
						onClick: () => handleUnbindChannel(channel.type),
						disabled: !!unbindingChannels[channel.type],
						children: unbindingChannels[channel.type] ? t("settings.claw.channelUnbinding") : t("settings.claw.channelDisconnect")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						size: "small",
						onClick: handleOpenQqBindDialog,
						children: t("settings.claw.channelConnect")
					})]
				});
			}
			const hasBinding = status === "connected" || status === "registered" || status === "failed" || !!webhookUrl;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-configure-wrapper",
				children: [webhookUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: t("settings.claw.viewWebhook"),
					placement: "top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "small",
						iconOnly: true,
						className: "claw-webhook-view-icon",
						"aria-label": t("settings.claw.viewWebhook"),
						onClick: () => setWebhookViewChannel(channel.type),
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebhookLinkIcon, {
							width: 16,
							height: 16
						})
					})
				}), hasBinding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "small",
					onClick: () => handleUnbindChannel(channel.type),
					disabled: !!unbindingChannels[channel.type],
					children: unbindingChannels[channel.type] ? t("settings.claw.channelUnbinding") : t("settings.claw.channelDisconnect")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "small",
					onClick: () => {
						if (channel.type === "wecomaibot") handleOpenWecomBindDialog();
						else handleOpenDialog(channel.type);
					},
					children: t("settings.claw.channelConnect")
				})]
			});
		};
		const channelLogo = CHANNEL_LOGO_MAP[channel.type];
		const channelTitle = t(channel.titleKey, { name: clawDisplayName });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "claw-settings-panel__card claw-settings-panel__channel-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__channel-header",
				children: [
					channelLogo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "claw-settings-panel__channel-logo",
						src: channelLogo,
						alt: ""
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "claw-settings-panel__channel-logo claw-settings-panel__channel-logo--placeholder" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "claw-settings-panel__channel-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-settings-panel__channel-title-text",
							title: channelTitle,
							children: channelTitle
						}), renderStatusBadge()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "claw-settings-panel__card-right",
						children: renderActionButtons()
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "claw-settings-panel__card-desc",
				children: t(channel.descKey, { name: clawDisplayName })
			})]
		});
	};
	const renderBindingFlowCard = (channel) => {
		const bindingChannelLogo = CHANNEL_LOGO_MAP[channel.type];
		const bindingChannelTitle = t(channel.titleKey, { name: clawDisplayName });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "claw-settings-panel__card claw-settings-panel__channel-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-settings-panel__channel-header",
					children: [
						bindingChannelLogo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "claw-settings-panel__channel-logo",
							src: bindingChannelLogo,
							alt: ""
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "claw-settings-panel__channel-logo claw-settings-panel__channel-logo--placeholder" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__channel-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-settings-panel__channel-title-text",
								title: bindingChannelTitle,
								children: bindingChannelTitle
							}), wechatKfState === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-status-badge claw-status-badge--failed",
								children: t("settings.claw.wechatkfLinkFailed")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "claw-settings-panel__card-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claw-configure-wrapper",
								children: !wechatKfBindStatusLoaded ? null : wechatKfState === "bound" || wechatKfState === "unbinding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "small",
									onClick: handleWechatKfUnbind,
									disabled: wechatKfState === "unbinding",
									children: wechatKfState === "unbinding" ? t("settings.claw.wechatkfUnbinding") : t("settings.claw.channelDisconnect")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									size: "small",
									onClick: () => {
										setWechatKfQrDialogOpen(true);
										handleWechatKfSetup();
									},
									disabled: wechatKfState === "loading",
									children: wechatKfState === "loading" ? t("settings.claw.wechatkfBinding") : t("settings.claw.channelConnect")
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "claw-settings-panel__card-desc",
					children: t(channel.descKey, { name: clawDisplayName })
				}),
				wechatKfErrorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "claw-settings-panel__error-message",
					children: wechatKfErrorMessage
				})
			]
		});
	};
	if (clawControl.loaded && !clawControl.masterEnabled) return null;
	const adminDisabledChannels = getAdminDisabledChannels(CHANNEL_CONFIGS, adminControl);
	const specialChannelLabel = (type) => {
		if (type === "wecomIOA") return t("settings.claw.wecomIntegration");
		return t("settings.claw.wechatmpIntegration");
	};
	const adminDisabledLabels = [...adminDisabledChannels.map((channel) => t(channel.titleKey, { name: clawDisplayName })), ...getAdminDisabledSpecialChannels(adminControl, {
		isTencentUser,
		isWechatMiniProgramIntegrationEnabled: !!isWechatMiniProgramIntegrationEnabled,
		shouldRestrictChannels
	}).map(specialChannelLabel)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "claw-settings-panel",
		children: [
			adminDisabledLabels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "claw-settings-panel__admin-disabled-notice",
				children: t("settings.claw.adminDisabledNotice", { channels: adminDisabledLabels.join("、") })
			}),
			adapter?.environmentType !== "local" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-settings-panel__section-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "claw-settings-panel__section-title",
						children: t("settings.claw.notifications")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "claw-settings-panel__section-desc",
						children: t("settings.claw.notificationsDesc")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "claw-settings-panel__card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "claw-settings-panel__card-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__card-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claw-settings-panel__card-label",
								children: t("settings.claw.systemNotification")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claw-settings-panel__card-desc",
								children: t("settings.claw.systemNotificationDesc")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "claw-settings-panel__card-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								checked: systemNotification,
								onChange: handleSystemNotificationChange
							})
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-settings-panel__section-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "claw-settings-panel__section-title",
						children: t("settings.claw.wecomConnection")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "claw-settings-panel__section-desc",
						children: [t("settings.claw.wecomConnectionDesc"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "claw-settings-panel__section-desc-link",
							href: getWeixinBotGuideUrl(),
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.preventDefault();
								handleOpenExternalLink(getWeixinBotGuideUrl());
							},
							children: t("settings.claw.howToConfig")
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-settings-panel__card-list claw-settings-panel__card-list--grid",
					children: [
						isTencentUser && isChannelAdminAllowed("wecomIOA", adminControl) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__card claw-settings-panel__channel-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "claw-settings-panel__channel-header",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "claw-settings-panel__channel-logo",
										src: "data:image/png;base64,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",
										alt: ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "claw-settings-panel__channel-title",
										children: t("settings.claw.wecomIntegrationTitle")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "claw-settings-panel__card-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											checked: wecomEnabled,
											onChange: handleWecomEnabledChange
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claw-settings-panel__card-desc",
								children: t("settings.claw.wecomIntegrationDesc")
							})]
						}),
						isYuanbaoChannelEnabled && isChannelAdminAllowed("yuanbao", adminControl) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__card claw-settings-panel__channel-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "claw-settings-panel__channel-header",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "claw-settings-panel__channel-logo",
										src: "data:image/png;base64,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",
										alt: ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "claw-settings-panel__channel-title",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "claw-settings-panel__channel-title-text",
												title: t("settings.claw.yuanbaoScanBindTitle"),
												children: t("settings.claw.yuanbaoScanBindTitle")
											}),
											channelStatuses.yuanbao === "registered" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "claw-status-badge claw-status-badge--registered",
												children: t("settings.claw.registered")
											}),
											(channelStatuses.yuanbao === "connected" || yuanbaoHasSavedConfig === true) && channelStatuses.yuanbao !== "registered" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "claw-status-badge claw-status-badge--connected",
												children: t("settings.claw.connected")
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "claw-settings-panel__card-right",
										children: !savedConfigsLoaded ? null : channelStatuses.yuanbao === "connected" || channelStatuses.yuanbao === "registered" || yuanbaoHasSavedConfig === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "secondary",
											size: "small",
											onClick: () => handleUnbindChannel("yuanbao"),
											disabled: !!unbindingChannels.yuanbao,
											children: unbindingChannels.yuanbao ? t("settings.claw.channelUnbinding") : t("settings.claw.channelUnbind")
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "primary",
											size: "small",
											onClick: handleOpenYuanbaoScanDialog,
											disabled: yuanbaoScanState === "loading" || yuanbaoScanState === "confirming",
											children: yuanbaoScanState === "loading" || yuanbaoScanState === "confirming" ? t("common.loading") : t("settings.claw.channelConnect")
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claw-settings-panel__card-desc",
								children: t("settings.claw.yuanbaoScanBindDesc")
							})]
						}),
						getVisibleSettingChannels(CHANNEL_CONFIGS, {
							channelFeatureEnabled,
							channelHideEnabled,
							isWorkBuddy: isWorkBuddy(),
							shouldRestrictChannels,
							isPersonalIOAMachine,
							allowOverseasIMOnIOAMachine,
							isYuanbaoChannelEnabled,
							adminControl
						}).map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: renderChannelCard(channel) }, channel.type)),
						!channelHideEnabled.HideChannelAutomationWecomBot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__card claw-settings-panel__channel-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "claw-settings-panel__channel-header",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "claw-settings-panel__channel-logo",
										src: "data:image/png;base64,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",
										alt: ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "claw-settings-panel__channel-title",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "claw-settings-panel__channel-title-text",
											title: t("settings.claw.automationWebhook"),
											children: t("settings.claw.automationWebhook")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "claw-settings-panel__card-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "claw-configure-wrapper",
											children: !automationPushConfigLoaded ? null : automationWsBotId || automationWebhookUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "secondary",
												size: "small",
												onClick: () => {
													setAutomationWsBotId("");
													setAutomationWsBotSecret("");
													setAutomationWsBotIdInput("");
													setAutomationWsBotSecretInput("");
													setAutomationWebhookUrl("");
													setWebhookUrlInput("");
													adapter?.emit("claw:set-automation-wecom-push-config", {
														mode: automationPushMode,
														webhookUrl: "",
														botId: "",
														botSecret: ""
													});
													toast({
														type: "success",
														message: t("settings.claw.automationUnbindSuccess")
													});
												},
												children: t("settings.claw.channelDisconnect")
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "primary",
												size: "small",
												onClick: () => setAutomationConfigDialogOpen(true),
												children: t("settings.claw.channelConnect")
											})
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "claw-settings-panel__card-desc",
								children: t("settings.claw.automationWebhookDesc")
							})]
						}),
						shouldRestrictChannels && hasRestrictedConfigs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-settings-panel__ioa-notice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.claw.ioaUserRestrictionNotice") }), hasRestrictedConfigs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-settings-panel__ioa-notice-hint",
								children: t("settings.claw.ioaRestrictedConfigHint")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "claw-settings-panel__view-config-btn",
								onClick: () => setShowRestrictedConfigs(!showRestrictedConfigs),
								type: "button",
								children: showRestrictedConfigs ? t("settings.claw.hideRestrictedConfigs") : t("settings.claw.viewRestrictedConfigs")
							})] })]
						}),
						shouldRestrictChannels && showRestrictedConfigs && hasRestrictedConfigs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "claw-settings-panel__restricted-configs",
							children: restrictedChannelsWithConfig.map((channel) => renderChannelCard(channel, true))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "claw-settings-panel__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-settings-panel__section-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "claw-settings-panel__section-title",
						children: t("settings.claw.sessionManagement")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "claw-settings-panel__section-desc",
						children: t("settings.claw.sessionManagementDesc")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionManagementSettings, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: automationConfigDialogOpen,
				onOpenChange: (open) => {
					if (!open) {
						automationStandaloneBindRef.current = false;
						setAutomationConfigDialogOpen(false);
						setAutomationMoreOpen(false);
					}
				},
				wrapClassName: `claw-wecom-dialog${automationMoreOpen ? " claw-wecom-dialog--more" : ""}`,
				variant: "confirm",
				width: 360,
				closable: true,
				title: automationMoreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "claw-wecom-dialog__title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "small",
							iconOnly: true,
							className: "claw-wecom-dialog__back",
							"aria-label": t("settings.claw.wecomAibot.backToQr"),
							onClick: () => setAutomationMoreOpen(false),
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackChevronIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-wecom-dialog__title-text",
							children: t("settings.claw.wecomAibot.moreConnectionMethods")
						}),
						(() => {
							const wecomDocUrl = CHANNEL_CONFIGS.find((c) => c.type === "wecomaibot")?.docUrl;
							return wecomDocUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpDocLink, {
								className: "claw-wecom-dialog__help",
								docUrl: wecomDocUrl,
								onOpen: handleOpenExternalLink
							}) : null;
						})()
					]
				}) : t("settings.claw.wecomAibot.bindDialogTitle"),
				footer: automationMoreOpen ? void 0 : null,
				okText: t("settings.claw.register"),
				cancelText: t("common.cancel"),
				onOk: () => {
					handleSaveWsBotConfig();
					setAutomationConfigDialogOpen(false);
					setAutomationMoreOpen(false);
					if (automationStandaloneBindRef.current) {
						automationStandaloneBindRef.current = false;
						returnToAutomationAfterBindRef.current = true;
					}
					setShowAutomationLastStep(true);
					return false;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "claw-register-form",
					children: !automationMoreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "claw-wecom-dialog__qr claw-wecom-dialog__qr--full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "medium",
							type: "button",
							disabled: automationQuickBindLoading,
							onClick: handleAutomationQuickBind,
							children: automationQuickBindLoading ? t("settings.claw.wecomAibot.getQrCodeLoading") : t("settings.claw.wecomAibot.getQrCode")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "medium",
							type: "button",
							className: "claw-register-form__more-link",
							onClick: () => setAutomationMoreOpen(true),
							children: t("settings.claw.wecomAibot.moreConnectionMethods")
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "claw-register-form__desc",
							children: t("settings.claw.automationRegisterDesc")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-wecom-dialog__field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-wecom-dialog__field-label",
								children: t("settings.claw.wecomAibot.botIdLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								size: "medium",
								type: "text",
								placeholder: t("settings.claw.wecomAibot.fieldPlaceholder"),
								value: automationWsBotIdInput,
								onChange: (e) => setAutomationWsBotIdInput(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-wecom-dialog__field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-wecom-dialog__field-label",
								children: t("settings.claw.wecomAibot.botSecretLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								size: "medium",
								type: "password",
								placeholder: t("settings.claw.wecomAibot.fieldPlaceholder"),
								value: automationWsBotSecretInput,
								onChange: (e) => setAutomationWsBotSecretInput(e.target.value)
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: showAutomationLastStep,
				onOpenChange: (open) => {
					if (!open) handleCloseAutomationLastStep();
				},
				variant: "confirm",
				size: "small",
				title: t("settings.claw.automationLastStepTitle"),
				okText: t("settings.claw.automationLastStepConfirm"),
				onOk: handleDismissAutomationLastStep,
				onCancel: handleCloseAutomationLastStep,
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "medium",
					onClick: handleDismissAutomationLastStep,
					children: t("settings.claw.automationLastStepConfirm")
				}),
				closeOnOverlayClick: false,
				children: t("settings.claw.automationLastStepDesc")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawScanDialog, {
				open: weixinBotQrDialogOpen,
				onClose: handleCloseWeixinBotQrDialog,
				title: t("settings.claw.weixinBotIntegration"),
				status: weixinBotLoginState === "scanning" || weixinBotLoginState === "expired" || weixinBotLoginState === "error" ? weixinBotLoginState : "loading",
				hint: t("settings.claw.weixinBot.scanQr"),
				qrDataUrl: weixinBotQrDataUrl,
				errorLines: weixinBotLoginState === "expired" ? [t("settings.claw.weixinBot.qrExpiredLine"), t("settings.claw.qrClickToRetry")] : [weixinBotLoginError || t("settings.claw.weixinBot.loginFailed"), t("settings.claw.qrClickToRetry")],
				onRetry: handleWeixinBotSetup,
				retryLabel: t("settings.claw.weixinBot.refresh")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawScanDialog, {
				open: wechatKfQrDialogOpen,
				onClose: () => setWechatKfQrDialogOpen(false),
				title: t("settings.claw.wechatkfIntegration"),
				status: wechatKfState === "linked" ? "scanning" : wechatKfState === "expired" || wechatKfState === "error" ? wechatKfState : "loading",
				hint: t("settings.claw.wechatkfScanQrCode"),
				qrDataUrl: wechatKfQrDataUrl,
				errorLines: wechatKfState === "expired" ? [t("settings.claw.wechatkfLinkExpired"), t("settings.claw.qrClickToRetry")] : [wechatKfErrorMessage || t("settings.claw.wechatkfLinkFailed"), t("settings.claw.qrClickToRetry")],
				onRetry: handleWechatKfSetup,
				retryLabel: t("settings.claw.wechatkfRefresh"),
				fallback: wechatKfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "claw-wechatkf-link-row__url",
					href: wechatKfUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					title: wechatKfUrl,
					children: wechatKfUrl
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawScanDialog, {
				open: yuanbaoScanDialogOpen,
				onClose: handleCloseYuanbaoScanDialog,
				title: t("settings.claw.yuanbaoScanBindTitle"),
				status: yuanbaoScanState === "ready" || yuanbaoScanState === "scanned" ? "scanning" : yuanbaoScanState === "expired" || yuanbaoScanState === "error" ? yuanbaoScanState : "loading",
				hint: t("settings.claw.yuanbao.scanHint"),
				qrDataUrl: yuanbaoScanQrDataUrl,
				errorLines: yuanbaoScanState === "expired" ? [t("settings.claw.yuanbaoScanBindExpired"), t("settings.claw.qrClickToRetry")] : [yuanbaoScanErrorMessage || t("settings.claw.yuanbaoScanBindFetchFailed"), t("settings.claw.qrClickToRetry")],
				onRetry: handleYuanbaoScanBindCodeRequest,
				retryLabel: t("settings.claw.yuanbaoScanBindRefresh"),
				extra: yuanbaoScanStatusHint && (yuanbaoScanState === "scanned" || yuanbaoScanState === "confirming") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "claw-wechatkf-link-row__hint",
					children: yuanbaoScanStatusHint
				}) : void 0
			}),
			qqBindDialogOpen && (() => {
				const qqConfig = CHANNEL_CONFIGS.find((c) => c.type === "qq");
				const manualModes = (qqConfig?.modes ?? []).filter((m) => m.modeValue !== "scan" && (isBotWebhookUrlEnabled || m.modeValue !== "webhook"));
				const manualInputs = manualModes.find((m) => m.modeValue === selectedMode)?.inputs ?? manualModes[0]?.inputs ?? [];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
					open: qqBindDialogOpen,
					onOpenChange: (open) => {
						if (!open) handleCloseQqBindDialog();
					},
					wrapClassName: `claw-channel-register-dialog${qqMoreOpen ? " claw-channel-register-dialog--more" : ""}`,
					variant: "confirm",
					width: 360,
					closable: true,
					title: qqMoreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "claw-qq-dialog__title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "small",
								iconOnly: true,
								className: "claw-qq-dialog__back",
								"aria-label": t("settings.claw.qq.backToScan"),
								onClick: () => {
									setQqMoreOpen(false);
									setSelectedMode("scan");
								},
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackChevronIcon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-qq-dialog__title-text",
								children: t("settings.claw.qq.moreConnectionMethods")
							}),
							qqConfig?.docUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpDocLink, {
								className: "claw-qq-dialog__help",
								docUrl: qqConfig.docUrl,
								onOpen: handleOpenExternalLink
							})
						]
					}) : t("settings.claw.qqRegisterTitle"),
					footer: qqMoreOpen ? void 0 : null,
					okText: t("settings.claw.register"),
					cancelText: t("common.cancel"),
					okButtonProps: { disabled: registerPending },
					onOk: () => {
						handleRegister();
						return false;
					},
					onCancel: handleCloseQqBindDialog,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "claw-register-form",
						children: !qqMoreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-register-form__qq-scan",
							children: [
								qqScanState === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "small",
									onClick: handleQQScanStart,
									type: "button",
									children: t("settings.claw.qq.scanStart")
								}),
								(qqScanState === "loading" || qqScanState === "scanning" || qqScanState === "expired" || qqScanState === "error") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "claw-wechatkf-link-row",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawQrScanView, {
										status: qqScanState,
										hint: t("settings.claw.qq.scanHint"),
										qrDataUrl: qqScanQrDataUrl,
										errorLines: qqScanState === "expired" ? [t("settings.claw.qq.scanExpired"), t("settings.claw.qrClickToRetry")] : [qqScanError || t("settings.claw.qq.scanFetchFailed"), t("settings.claw.qrClickToRetry")],
										onRetry: handleQQScanStart,
										retryLabel: t("settings.claw.qq.scanRefresh"),
										extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [qqScanBindToken && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "claw-wechatkf-link-row__hint",
											children: [t("settings.claw.qq.bindTokenLabel"), qqScanBindToken]
										}), qqScanState === "scanning" && qqScanError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "claw-wechatkf-link-row__hint claw-wechatkf-link-row__hint--error",
											children: qqScanError
										})] })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "claw-register-form__more-link",
									onClick: () => {
										setSelectedMode(manualModes[0]?.modeValue ?? "websocket");
										setQqMoreOpen(true);
									},
									children: t("settings.claw.qq.moreConnectionMethods")
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
								className: "claw-qq-dialog__mode-tabs",
								size: "medium",
								fullWidth: true,
								value: selectedMode,
								options: manualModes.map((mode) => ({
									value: mode.modeValue,
									label: t(mode.labelKey),
									disabled: registerPending
								})),
								onChange: (nextMode) => {
									const currentModeConfig = manualModes.find((m) => m.modeValue === selectedMode);
									if (currentModeConfig) {
										const currentFields = {};
										for (const inp of currentModeConfig.inputs) if (formValues[inp.field] !== void 0) currentFields[inp.field] = formValues[inp.field];
										modeFormCacheRef.current[selectedMode] = currentFields;
									}
									const cached = modeFormCacheRef.current[nextMode] || {};
									setFormValues({ ...cached });
									setSelectedMode(nextMode);
								}
							}),
							manualInputs.map((input) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "claw-qq-dialog__field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "claw-qq-dialog__field-label",
									children: t(input.placeholderKey)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									size: "medium",
									type: input.type,
									placeholder: t("settings.claw.wecomAibot.fieldPlaceholder"),
									value: formValues[input.field] ?? "",
									disabled: registerPending,
									onChange: (e) => handleInputChange(input.field, e.target.value)
								})]
							}, `qq-${selectedMode}-${input.field}`)),
							channelRegisterErrors["qq"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-settings-panel__error-message claw-settings-panel__error-message--single-line",
								children: channelRegisterErrors["qq"]
							})
						] })
					})
				});
			})(),
			webhookViewChannel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: !!webhookViewChannel,
				onOpenChange: (open) => {
					if (!open) setWebhookViewChannel(null);
				},
				variant: "confirm",
				width: 420,
				closable: true,
				title: t("settings.claw.viewWebhook"),
				onCancel: () => setWebhookViewChannel(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "medium",
					onClick: async () => {
						const url = channelWebhookUrls[webhookViewChannel];
						if (url) {
							if (await copyToClipboard(url)) toast.success(t("automation.datasource.webhook.copySuccess"));
						}
					},
					children: t("settings.claw.copy")
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-webhook-view-modal",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "claw-webhook-view-modal__label",
						children: t("settings.claw.webhookLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "claw-webhook-view-modal__url",
						children: channelWebhookUrls[webhookViewChannel] || "-"
					})]
				})
			}),
			wecomBindDialogOpen && (() => {
				const wecomConfig = CHANNEL_CONFIGS.find((c) => c.type === "wecomaibot");
				const manualModes = (wecomConfig?.modes ?? []).filter((m) => isBotWebhookUrlEnabled || m.modeValue !== "webhook");
				const manualInputs = (manualModes.find((m) => m.modeValue === selectedMode)?.inputs ?? manualModes[0]?.inputs ?? []).filter((input) => {
					if (!input.visibleWhenFeature) return true;
					if (input.visibleWhenFeature === "EnableWecomAibotCustomWsUrl") return isWecomAibotCustomWsUrlEnabled;
					return false;
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
					open: wecomBindDialogOpen,
					onOpenChange: (open) => {
						if (!open) handleCloseWecomBindDialog();
					},
					wrapClassName: `claw-wecom-dialog${wecomMoreOpen ? " claw-wecom-dialog--more" : ""}`,
					variant: "confirm",
					width: 360,
					closable: true,
					title: wecomMoreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "claw-wecom-dialog__title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "small",
								iconOnly: true,
								className: "claw-wecom-dialog__back",
								"aria-label": t("settings.claw.wecomAibot.backToQr"),
								onClick: () => {
									setWecomMoreOpen(false);
									setSelectedMode("websocket");
								},
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackChevronIcon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-wecom-dialog__title-text",
								children: t("settings.claw.wecomAibot.moreConnectionMethods")
							}),
							wecomConfig?.docUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpDocLink, {
								className: "claw-wecom-dialog__help",
								docUrl: wecomConfig.docUrl,
								onOpen: handleOpenExternalLink
							})
						]
					}) : t("settings.claw.wecomAibot.bindDialogTitle"),
					footer: wecomMoreOpen ? void 0 : null,
					okText: t("settings.claw.register"),
					cancelText: t("common.cancel"),
					okButtonProps: { disabled: registerPending },
					onOk: () => {
						handleRegister();
						return false;
					},
					onCancel: handleCloseWecomBindDialog,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "claw-register-form",
						children: !wecomMoreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "claw-wecom-dialog__qr claw-wecom-dialog__qr--full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								size: "medium",
								type: "button",
								disabled: quickBindLoading,
								onClick: executeQuickBindAndRegister,
								children: quickBindLoading ? t("settings.claw.wecomAibot.getQrCodeLoading") : t("settings.claw.wecomAibot.getQrCode")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "medium",
								type: "button",
								className: "claw-register-form__more-link",
								onClick: () => {
									setSelectedMode(manualModes[0]?.modeValue ?? "websocket");
									setWecomMoreOpen(true);
								},
								children: t("settings.claw.wecomAibot.moreConnectionMethods")
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
								className: "claw-wecom-dialog__mode-tabs",
								size: "medium",
								fullWidth: true,
								value: selectedMode,
								options: manualModes.map((mode) => ({
									value: mode.modeValue,
									label: t(mode.labelKey),
									disabled: registerPending
								})),
								onChange: (nextMode) => {
									const currentModeConfig = manualModes.find((m) => m.modeValue === selectedMode);
									if (currentModeConfig) {
										const currentFields = {};
										for (const inp of currentModeConfig.inputs) if (formValues[inp.field] !== void 0) currentFields[inp.field] = formValues[inp.field];
										modeFormCacheRef.current[selectedMode] = currentFields;
									}
									const cached = modeFormCacheRef.current[nextMode] || {};
									setFormValues({ ...cached });
									setSelectedMode(nextMode);
								}
							}),
							manualInputs.map((input) => {
								const fieldLabelKey = input.field === "botId" ? "settings.claw.wecomAibot.botIdLabel" : input.field === "botSecret" ? "settings.claw.wecomAibot.botSecretLabel" : input.field === "customWsUrl" ? "settings.claw.wecomAibot.wsUrlLabel" : input.placeholderKey;
								if (input.field === "customWsUrl") {
									const defaultValue = input.defaultValue ?? "";
									const editValue = formValues[input.field] ?? "";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "claw-wecom-dialog__field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "claw-wecom-dialog__field-label",
												children: t(fieldLabelKey)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "claw-wecom-dialog__radio-group",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "claw-wecom-dialog__radio",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "radio",
														name: `wecom-wsurl-mode-${selectedMode}`,
														checked: !isEditingWecomAibotWsUrl,
														disabled: registerPending,
														onChange: () => {
															handleInputChange(input.field, "");
															setIsEditingWecomAibotWsUrl(false);
														}
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.claw.wecomAibot.customWsUrlDefault") })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "claw-wecom-dialog__radio",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "radio",
														name: `wecom-wsurl-mode-${selectedMode}`,
														checked: isEditingWecomAibotWsUrl,
														disabled: registerPending,
														onChange: () => {
															handleInputChange(input.field, "");
															setIsEditingWecomAibotWsUrl(true);
														}
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.claw.wecomAibot.customWsUrlCustomize") })]
												})]
											}),
											!isEditingWecomAibotWsUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												size: "medium",
												type: input.type,
												value: defaultValue,
												disabled: true,
												readOnly: true
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												size: "medium",
												type: input.type,
												placeholder: t("settings.claw.wecomAibot.fieldPlaceholder"),
												value: editValue,
												disabled: registerPending,
												onChange: (e) => handleInputChange(input.field, e.target.value)
											})
										]
									}, `wecom-${selectedMode}-${input.field}`);
								}
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "claw-wecom-dialog__field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "claw-wecom-dialog__field-label",
										children: t(fieldLabelKey)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										size: "medium",
										type: input.type,
										placeholder: t("settings.claw.wecomAibot.fieldPlaceholder"),
										value: formValues[input.field] ?? "",
										disabled: registerPending,
										onChange: (e) => handleInputChange(input.field, e.target.value)
									})]
								}, `wecom-${selectedMode}-${input.field}`);
							}),
							channelRegisterErrors["wecomaibot"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "claw-settings-panel__error-message claw-settings-panel__error-message--single-line",
								children: channelRegisterErrors["wecomaibot"]
							})
						] })
					})
				});
			})(),
			activeConfig && activeDialog !== "qq" && activeDialog !== "wecomaibot" && activeDialog !== "feishu" && activeDialog !== "dingtalk" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: !!activeDialog,
				onOpenChange: (open) => {
					if (!open) handleCloseDialog();
				},
				variant: "confirm",
				size: "small",
				title: t(activeConfig.dialogTitleKey, { name: clawDisplayName }),
				okText: registerPending ? t("settings.claw.registering") : t("settings.claw.register"),
				okButtonProps: { disabled: registerPending },
				cancelText: t("common.cancel"),
				onOk: () => {
					handleRegister();
					return false;
				},
				onCancel: handleCloseDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "claw-register-form",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "claw-register-form__desc",
							children: t(activeConfig.dialogDescKey, { name: clawDisplayName })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "claw-register-form__guide-link",
							href: activeConfig.docUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.preventDefault();
								handleOpenExternalLink(activeConfig.docUrl);
							},
							children: t("settings.claw.howToConfig")
						}),
						activeConfig.modes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "claw-register-form__mode-selector",
							children: (isBotWebhookUrlEnabled ? activeConfig.modes : activeConfig.modes.filter((mode) => mode.modeValue !== "webhook")).map((mode) => {
								const isActive = selectedMode === mode.modeValue;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `claw-register-form__mode-option${isActive ? " claw-register-form__mode-option--active" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "connectionMode",
										value: mode.modeValue,
										checked: isActive,
										disabled: registerPending,
										onChange: () => {
											const currentModeConfig = (isBotWebhookUrlEnabled ? activeConfig.modes : activeConfig.modes?.filter((mode) => mode.modeValue !== "webhook"))?.find((m) => m.modeValue === selectedMode);
											if (currentModeConfig) {
												const currentFields = {};
												for (const inp of currentModeConfig.inputs) if (formValues[inp.field] !== void 0) currentFields[inp.field] = formValues[inp.field];
												modeFormCacheRef.current[selectedMode] = currentFields;
											}
											const cached = modeFormCacheRef.current[mode.modeValue] || {};
											setFormValues({ ...cached });
											setSelectedMode(mode.modeValue);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(mode.labelKey) })]
								}, mode.modeValue);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(() => {
							return (activeConfig.modes ? (isBotWebhookUrlEnabled ? activeConfig.modes : activeConfig.modes.filter((mode) => mode.modeValue !== "webhook")).find((m) => m.modeValue === selectedMode)?.inputs || [] : activeConfig.inputs).filter((input) => {
								if (!input.visibleWhenFeature) return true;
								if (input.visibleWhenFeature === "EnableFeishuCustomHost") return isFeishuCustomHostEnabled;
								if (input.visibleWhenFeature === "EnableWecomAibotCustomWsUrl") return isWecomAibotCustomWsUrlEnabled;
								return false;
							}).map((input) => {
								const defaultValue = input.defaultValue ?? "";
								const currentRaw = formValues[input.field];
								const displayValue = currentRaw === void 0 ? defaultValue : currentRaw;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									size: "medium",
									className: "claw-register-form__input",
									type: input.type,
									placeholder: t(input.placeholderKey),
									value: displayValue ?? "",
									disabled: registerPending,
									onChange: (e) => handleInputChange(input.field, e.target.value)
								}, `${activeDialog}-${selectedMode}-${input.field}`);
							});
						})(), activeDialog && channelRegisterErrors[activeDialog] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "claw-settings-panel__error-message claw-settings-panel__error-message--single-line",
							children: channelRegisterErrors[activeDialog]
						})] })
					]
				})
			}),
			(activeDialog === "feishu" || activeDialog === "dingtalk") && activeConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawFeishuDingtalkDialog, {
				activeDialog,
				activeConfig,
				clawDisplayName,
				selectedMode,
				setSelectedMode,
				formValues,
				setFormValues,
				handleInputChange,
				modeFormCacheRef,
				registerPending,
				handleRegister,
				handleCloseDialog,
				channelRegisterErrors,
				isBotWebhookUrlEnabled,
				isFeishuCustomHostEnabled,
				isEditingFeishuHost,
				setIsEditingFeishuHost,
				handleOpenExternalLink
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: showOverwriteConfirm,
				onOpenChange: (open) => {
					if (!open) handleOverwriteCancel();
				},
				variant: "confirm",
				size: "small",
				title: t("settings.claw.wecomAibot.quickBindOverwriteTitle"),
				okText: t("common.confirm"),
				cancelText: t("common.cancel"),
				onOk: handleOverwriteConfirm,
				onCancel: handleOverwriteCancel,
				children: t("settings.claw.wecomAibot.quickBindOverwriteDesc")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: showAutomationOverwriteConfirm,
				onOpenChange: (open) => {
					if (!open) handleAutomationOverwriteCancel();
				},
				variant: "confirm",
				size: "small",
				title: t("settings.claw.wecomAibot.quickBindOverwriteTitle"),
				okText: t("common.confirm"),
				cancelText: t("common.cancel"),
				onOk: handleAutomationOverwriteConfirm,
				onCancel: handleAutomationOverwriteCancel,
				children: t("settings.claw.wecomAibot.quickBindOverwriteDesc")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: showYuanbaoOverwriteConfirm,
				onOpenChange: (open) => {
					if (!open) handleYuanbaoOverwriteCancel();
				},
				variant: "confirm",
				size: "small",
				title: t("settings.claw.yuanbaoScanBindOverwriteTitle"),
				okText: t("common.confirm"),
				cancelText: t("common.cancel"),
				onOk: handleYuanbaoOverwriteConfirm,
				onCancel: handleYuanbaoOverwriteCancel,
				children: t("settings.claw.yuanbaoScanBindOverwriteDesc")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: !!showUnbindConfirm,
				onOpenChange: (open) => {
					if (!open) handleUnbindCancel();
				},
				variant: "confirm",
				size: "small",
				title: t("settings.claw.channelUnbindConfirmTitle"),
				okText: t("settings.claw.channelUnbind"),
				cancelText: t("common.cancel"),
				onOk: handleUnbindConfirm,
				onCancel: handleUnbindCancel,
				children: t("settings.claw.channelUnbindConfirmDesc")
			})
		]
	});
}
var import_wecom_aibot_sdk_umd, import_react, import_jsx_runtime, CHANNEL_CONFIGS, CHANNEL_LOGO_MAP, KNOWN_CHANNEL_TYPES, TOGGLE_ONLY_CHANNELS;
//#endregion
__esmMin((() => {
	init_ClawSettingsPanel$1();
	init_src$1();
	init_src();
	import_wecom_aibot_sdk_umd = /* @__PURE__ */ __toESM(require_wecom_aibot_sdk_umd());
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_discord();
	init_slack();
	init_telegram();
	init_contexts();
	init_product_features();
	init_use_bot_webhook_url_feature();
	init_use_claw_control();
	init_use_product_feature();
	init_use_qr_data_url();
	init_use_yuanbao_channel_feature();
	init_useI18n();
	init_utils();
	init_services();
	init_telemetry();
	init_utils$1();
	init_environment();
	init_use_qq_bind_session();
	init_use_identity_claw_name();
	init_SettingsContext();
	init_logo_dingtalk();
	init_logo_feishu();
	init_logo_qq_bot();
	init_logo_wechat_assistant();
	init_logo_wechat_customer();
	init_logo_wecom();
	init_logo_yuanbao();
	init_channel_visibility();
	init_channelRegistry();
	init_claw_automation_bind_logic();
	init_ClawFeishuDingtalkDialog();
	init_ClawQrScanView();
	init_ClawScanDialog();
	init_SessionManagementSettings();
	import_jsx_runtime = require_jsx_runtime();
	CHANNEL_CONFIGS = CHANNEL_REGISTRY;
	CHANNEL_LOGO_MAP = {
		weixinClawBot: logo_wechat_assistant_default,
		wechatkf: logo_wechat_customer_default,
		wecomaibot: logo_wecom_default,
		wecomNew: logo_wecom_default,
		yuanbao: logo_yuanbao_default,
		qq: logo_qq_bot_default,
		feishu: logo_feishu_default,
		dingtalk: logo_dingtalk_default,
		slack: slack_default,
		telegram: telegram_default,
		discord: discord_default
	};
	KNOWN_CHANNEL_TYPES = /* @__PURE__ */ new Set([...CHANNEL_REGISTRY.map((c) => c.type), "wechatmp"]);
	TOGGLE_ONLY_CHANNELS = /* @__PURE__ */ new Set(["wechatmp", "wecomIOA"]);
}))();
export { ClawSettingsPanel };
