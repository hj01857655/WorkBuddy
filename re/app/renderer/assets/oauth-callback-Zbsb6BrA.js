import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $2 as isWorkBuddy, $B as init_icons, I1 as t, K2 as init_environment, cH as GithubIcon, j1 as init_i18n, k1 as getLocale, oH as GongfengIcon, uH as FigmaIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { n as isWXMiniProgram, t as init_ua } from "./ua-BYWN4Nkx.js";
//#region ../../packages/agent-ui/src/modules/connector/oauth-callback/oauth-callback.less
var init_oauth_callback$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/mini-program/wx-bridge.ts
/**
* 懒加载 jweixin；已加载或加载中则复用同一 Promise，避免重复插入 script
*/
async function loadJweixin() {
	const wxHost = window;
	if (wxHost.wx?.miniProgram) return;
	if (jweixinLoadPromise) {
		await jweixinLoadPromise;
		return;
	}
	jweixinLoadPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = JWEIXIN_SRC;
		script.async = true;
		script.onload = () => {
			if (wxHost.wx?.miniProgram) {
				resolve();
				return;
			}
			jweixinLoadPromise = null;
			reject(/* @__PURE__ */ new Error("wx.miniProgram unavailable after jweixin load"));
		};
		script.onerror = () => {
			jweixinLoadPromise = null;
			reject(/* @__PURE__ */ new Error("Failed to load jweixin SDK"));
		};
		document.head.appendChild(script);
	});
	await jweixinLoadPromise;
}
/**
* 加载 SDK 后用 getEnv 判定是否在小程序 web-view
*/
async function isMiniProgramEnv() {
	await loadJweixin();
	return new Promise((resolve) => {
		const wx = window.wx;
		if (!wx?.miniProgram?.getEnv) {
			resolve(false);
			return;
		}
		let settled = false;
		const done = (value) => {
			if (settled) return;
			settled = true;
			resolve(value);
		};
		try {
			wx.miniProgram.getEnv((res) => {
				done(!!res?.miniprogram);
			});
		} catch {
			done(false);
		}
		setTimeout(() => {
			done(false);
		}, GET_ENV_TIMEOUT_MS);
	});
}
/**
* 调用 wx.miniProgram.navigateBack；API 不可用时返回 false
*/
async function navigateBack() {
	await loadJweixin();
	const wx = window.wx;
	if (!wx?.miniProgram?.navigateBack) return false;
	wx.miniProgram.navigateBack();
	return true;
}
var JWEIXIN_SRC, GET_ENV_TIMEOUT_MS, jweixinLoadPromise, wxMiniProgram;
var init_wx_bridge = __esmMin((() => {
	JWEIXIN_SRC = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
	GET_ENV_TIMEOUT_MS = 800;
	jweixinLoadPromise = null;
	wxMiniProgram = {
		isEnv: isMiniProgramEnv,
		back: navigateBack
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/oauth-callback/oauth-callback.tsx
/**
* 解析 URL 参数
*/
function parseUrlParams() {
	const params = new URLSearchParams(window.location.search);
	return {
		code: parseInt(params.get("code") || "0", 10),
		name: params.get("name") || "",
		clientId: params.get("client_id") || void 0,
		httpStatus: parseInt(params.get("http_status") || "200", 10),
		msg: params.get("msg") || void 0,
		installationId: params.get("installation_id") || void 0
	};
}
/**
* 获取连接器配置
* 对已注册的 connector 返回专属配置；对未注册的 connector 返回 null（兜底：不显示图标和名称）
*/
function getConnectorConfig(name) {
	return CONNECTOR_CONFIG_MAP[name] || null;
}
/**
* OAuth 回调结果页面组件
* 支持 Github、工蜂、Figma 等多种连接器的授权结果展示
*/
function OAuthCallback(props) {
	const { className = "", autoCloseCountdown = 3 } = props;
	const [countdown, setCountdown] = (0, import_react.useState)(autoCloseCountdown);
	const oauthResult = (0, import_react.useMemo)(() => parseUrlParams(), []);
	const connectorConfig = (0, import_react.useMemo)(() => getConnectorConfig(oauthResult.name), [oauthResult.name]);
	const isGithubRepoAuth = oauthResult.name === "github" && !!oauthResult.installationId;
	const isSuccess = oauthResult.code === 0 || isGithubRepoAuth;
	const actionText = (0, import_react.useMemo)(() => {
		if (isGithubRepoAuth) return isSuccess ? t("connectors.github.repoAuthSuccess") : t("connectors.github.repoAuthFailed");
		if (connectorConfig) return isSuccess ? connectorConfig.successText : connectorConfig.failText;
		return isSuccess ? t("connectors.auth.success") : t("connectors.auth.fail");
	}, [
		isSuccess,
		isGithubRepoAuth,
		connectorConfig
	]);
	const IconComponent = connectorConfig?.Icon || null;
	const handleClose = async () => {
		if (isWXMiniProgram()) try {
			if (await wxMiniProgram.isEnv()) {
				if (await wxMiniProgram.back()) return;
			}
		} catch {}
		window.close();
	};
	const handleClickClose = () => {
		handleClose();
	};
	(0, import_react.useEffect)(() => {
		if (!isSuccess || autoCloseCountdown <= 0) return;
		let remaining = autoCloseCountdown;
		const timer = setInterval(() => {
			remaining -= 1;
			setCountdown(remaining);
			if (remaining > 0) return;
			clearInterval(timer);
			handleClose();
		}, 1e3);
		return () => clearInterval(timer);
	}, [isSuccess, autoCloseCountdown]);
	const footerLinks = (0, import_react.useMemo)(() => ({
		termsOfService: isWorkBuddy() ? "https://rule.tencent.com/rule/202603180001" : "https://cloud.tencent.com/document/product/301/106125",
		privacyPolicy: isWorkBuddy() ? "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966" : "https://privacy.qq.com/document/preview/284d799a07164d09bfc7cedd0ec3e089"
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${PREFIX} ${className}`.trim(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${PREFIX}__background`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: `${PREFIX}__background-image`,
						src: `${CDN_BASE_URL}/assets/bg-2.0717296e.jpg`,
						draggable: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `${PREFIX}__background-gradient-left` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `${PREFIX}__background-gradient-top` })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: `${PREFIX}__header`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `${CDN_BASE_URL}/assets/avatar-black.81059f91.svg`,
					alt: "CodeBuddy Logo",
					draggable: false
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: `${PREFIX}__main`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${PREFIX}__card`,
					children: [
						IconComponent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${PREFIX}__icon`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, {
								width: 70,
								height: 70
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${PREFIX}__title`,
							children: connectorConfig ? `${connectorConfig.displayName} ${actionText}` : actionText
						}),
						!isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${PREFIX}__error-message`,
							children: t("connectors.auth.errorMessage")
						}),
						isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `${PREFIX}__btn`,
							onClick: handleClickClose,
							children: [t("connectors.close.authCallbackPage"), countdown > 0 ? `(${countdown}s)` : ""]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `${PREFIX}__btn`,
							onClick: handleClickClose,
							children: t("connectors.close.retry")
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: `${PREFIX}__footer`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `${PREFIX}__footer-content`,
					children: getLocale() === "en" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copyright © 2013 - 2026 Tencent Cloud. All Rights Reserved." }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copyright © 1998 - 2026 Tencent. All Rights Reserved. 腾讯公司 版权所有" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `${PREFIX}__footer-links`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								target: "_blank",
								rel: "noopener noreferrer",
								href: footerLinks.termsOfService,
								children: "服务协议"
							}),
							"丨",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								target: "_blank",
								rel: "noopener noreferrer",
								href: footerLinks.privacyPolicy,
								children: "隐私政策"
							}),
							"丨",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								target: "_blank",
								rel: "noopener noreferrer",
								href: "http://beian.miit.gov.cn/",
								children: "粤B2-20090059"
							}),
							"丨",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								target: "_blank",
								rel: "noopener noreferrer",
								href: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502008569",
								children: "粤公网安备 44030502008569号"
							})
						]
					})] })
				})
			})
		]
	});
}
var import_react, import_jsx_runtime, PREFIX, CDN_BASE_URL, GmailIcon, TDocsIcon, IMAIcon, CONNECTOR_CONFIG_MAP;
var init_oauth_callback$1 = __esmMin((() => {
	init_oauth_callback$2();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	init_i18n();
	init_environment();
	init_wx_bridge();
	init_ua();
	import_jsx_runtime = require_jsx_runtime();
	PREFIX = "cb-oauth-callback";
	CDN_BASE_URL = "https://acc-1258344699.cos.accelerate.myqcloud.com/web/login/d9ffe4e3bec8ca4522a6e4b191fe9519f1722a5b";
	GmailIcon = ({ width = 70, height = 70 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width,
		height,
		viewBox: "52 42 88 66",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285f4",
				d: "M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34a853",
				d: "M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#fbbc04",
				d: "M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#ea4335",
				d: "M72 74V48l24 18 24-18v26L96 92"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#c5221f",
				d: "M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
			})
		]
	});
	TDocsIcon = ({ width = 70, height = 70 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width,
		height,
		viewBox: "0 0 28 24",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#2A65F5",
				d: "M21.93 0H4.523a.495.495 0 0 0-.487.408L.008 23.19a.494.494 0 0 0 .487.579h9.596l.76-.235h4.457l.623.235h7.392c.24 0 .445-.172.487-.408l3.313-18.74L21.93 0Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#00DCFF",
				d: "M21.703 4.622h5.42L21.93 0l-.715 4.043c-.053.302.18.58.488.58"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FFF",
				d: "m14.125.976-.974 5.525-9.497.016 4.126 4.452h4.579L10.091 23.77h5.84l2.271-12.801h6.894l.24-.005z"
			})
		]
	});
	IMAIcon = ({ width = 70, height = 70 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width,
		height,
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "24",
			height: "24",
			rx: "4",
			fill: "#4B6EF5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z",
			fill: "#fff"
		})]
	});
	CONNECTOR_CONFIG_MAP = {
		github: {
			displayName: t("connectors.github.title"),
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: GithubIcon
		},
		gongfeng: {
			displayName: t("connectors.gongfeng.title"),
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: GongfengIcon
		},
		figma: {
			displayName: t("connectors.figma.title"),
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: FigmaIcon
		},
		gmail: {
			displayName: "Gmail",
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: GmailIcon
		},
		"tdocs-app": {
			displayName: "腾讯文档",
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: TDocsIcon
		},
		tdocs: {
			displayName: "腾讯文档",
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: TDocsIcon
		},
		ima: {
			displayName: "ima 知识库",
			successText: t("connectors.auth.success"),
			failText: t("connectors.auth.fail"),
			Icon: IMAIcon
		}
	};
}));
//#endregion
__esmMin((() => {
	init_oauth_callback$1();
}))();
export { OAuthCallback };
