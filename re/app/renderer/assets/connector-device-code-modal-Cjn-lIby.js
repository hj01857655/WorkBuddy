import { r as __exportAll, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, I1 as t, O1 as useTranslation, XG as init_use_floating_layer, YG as CONNECTOR_AUTH_FLOATING_LAYER, ZG as useFloatingLayer, c$ as init_store, j1 as init_i18n, o$ as connectorStore, p$ as useConnectorStore } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/connector/components/connector-device-code-modal/connector-device-code-modal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
init_i18n();
var import_jsx_runtime = require_jsx_runtime();
/**
* 兼容 Clipboard API 不可用环境（非 secure context）的复制工具。
*/
async function copyText(text) {
	const fallback = () => {
		try {
			const ta = document.createElement("textarea");
			ta.value = text;
			ta.style.position = "fixed";
			ta.style.left = "-9999px";
			ta.setAttribute("readonly", "");
			document.body.appendChild(ta);
			ta.select();
			const ok = document.execCommand("copy");
			document.body.removeChild(ta);
			return ok;
		} catch {
			return false;
		}
	};
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
		return fallback();
	} catch {
		return fallback();
	}
}
function formatRemaining(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
/**
* OAuth 2.0 Device Authorization Grant（RFC 8628）授权弹窗
*
* 引导用户在浏览器中访问 verification URL（可能内嵌 user_code）完成授权。
* 浏览器通常已由 CLI / 主进程自动打开，所以本弹窗以 **user_code 为主体**：
* - 主区：放大显示授权码 + 复制按钮（用户主任务）
* - 倒计时：码下方提示有效期
* - 次区：verification URL 与复制小按钮（仅在浏览器没自动打开时备用）
*
* 授权完成检测由主进程 CLI/MCP polling 负责，本弹窗在连接状态变更时由 store 自动 dismiss。
*/
var ConnectorDeviceCodeModal = ({ verificationUri, userCode, expiresAt, codeEmbeddedInUri = false, title, iconUrl, onCancel, onExpired, onOpenInBrowser: _onOpenInBrowser, overlayZIndex }) => {
	const [linkCopied, setLinkCopied] = (0, import_react.useState)(false);
	const [codeCopied, setCodeCopied] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!expiresAt) return;
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, [expiresAt]);
	const remainingMs = expiresAt ? expiresAt - now : void 0;
	const expired = remainingMs !== void 0 && remainingMs <= 0;
	const lowTime = remainingMs !== void 0 && remainingMs > 0 && remainingMs < 6e4;
	(0, import_react.useEffect)(() => {
		if (expired) (onExpired ?? onCancel)();
	}, [
		expired,
		onExpired,
		onCancel
	]);
	const handleCopyLink = (0, import_react.useCallback)(async () => {
		if (await copyText(verificationUri)) {
			setLinkCopied(true);
			window.setTimeout(() => setLinkCopied(false), 2e3);
		}
	}, [verificationUri]);
	const handleCopyCode = (0, import_react.useCallback)(async () => {
		if (!userCode) return;
		if (await copyText(userCode)) {
			setCodeCopied(true);
			window.setTimeout(() => setCodeCopied(false), 2e3);
		}
	}, [userCode]);
	const primaryHintKey = userCode ? codeEmbeddedInUri ? "connectors.deviceCodeModal.confirmCodeInBrowser" : "connectors.deviceCodeModal.enterCodeInBrowser" : "connectors.deviceCodeModal.openLinkInBrowser";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "connector-device-code-modal-overlay",
		style: { zIndex: overlayZIndex },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "connector-device-code-modal",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connector-device-code-modal-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connector-device-code-modal-title-wrap",
						children: [iconUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "connector-device-code-modal-icon",
							src: iconUrl,
							alt: "",
							width: 24,
							height: 24,
							draggable: false
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "connector-device-code-modal-title",
							children: title ?? t("connectors.deviceCodeModal.title")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "connector-device-code-modal-close-btn",
						onClick: onCancel,
						"aria-label": "close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 16 16",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 4L4 12M4 4l8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "connector-device-code-modal-primary-hint",
					children: t(primaryHintKey)
				}),
				userCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connector-device-code-modal-code-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connector-device-code-modal-code-display",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "connector-device-code-modal-code",
							children: userCode
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "connector-device-code-modal-code-copy-btn",
							onClick: handleCopyCode,
							"aria-label": t("connectors.deviceCodeModal.copyCode"),
							children: codeCopied ? t("connectors.deviceCodeModal.copied") : t("connectors.deviceCodeModal.copyCode")
						})]
					}), remainingMs !== void 0 && !expired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: lowTime ? "connector-device-code-modal-countdown is-low" : "connector-device-code-modal-countdown",
						children: t("connectors.deviceCodeModal.expiresIn", { time: formatRemaining(remainingMs) })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connector-device-code-modal-url-fallback",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "connector-device-code-modal-url-fallback-label",
							children: t("connectors.deviceCodeModal.urlFallbackLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "connector-device-code-modal-url-link",
							href: verificationUri,
							target: "_blank",
							rel: "noopener noreferrer",
							title: verificationUri,
							children: verificationUri
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "connector-device-code-modal-url-copy-btn",
							onClick: handleCopyLink,
							children: linkCopied ? t("connectors.deviceCodeModal.copied") : t("connectors.deviceCodeModal.copyLink")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "connector-device-code-modal-footer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "connector-device-code-modal-cancel-btn",
						onClick: onCancel,
						children: t("connectors.deviceCodeModal.cancel")
					})
				})
			]
		})
	});
};
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/components/connector-device-code-modal/connector-device-code-modal-host.tsx
init_src();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
init_use_floating_layer();
init_useI18n();
init_store();
/**
* Device Code 授权弹窗的全局宿主组件。
*
* 订阅 `connectorStore.deviceCodeInfo`。CLI（`authDeviceFlow` 配置）或 MCP
* （OAuth metadata 含 `device_authorization_endpoint`）触发授权时主进程通过
* `connector:device-code` 事件推送，store 写入 deviceCodeInfo 后本组件渲染。
*
* 挂到应用根部（如 `packages/workbuddy-app/src/main.tsx`）而非具体面板内，
* 避免面板未挂载时弹窗无处渲染。
*/
var ConnectorDeviceCodeModalHost = () => {
	const t = useTranslation();
	const deviceCodeInfo = useConnectorStore((state) => state.deviceCodeInfo);
	const mcpConnectorConfigs = useConnectorStore((state) => state.mcpConnectorConfigs);
	const overlayZIndex = useFloatingLayer(Boolean(deviceCodeInfo?.visible), CONNECTOR_AUTH_FLOATING_LAYER);
	if (!deviceCodeInfo?.visible) return null;
	const connector = mcpConnectorConfigs.find((c) => c.id === deviceCodeInfo.configId);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorDeviceCodeModal, {
		verificationUri: deviceCodeInfo.verificationUri,
		userCode: deviceCodeInfo.userCode,
		expiresAt: deviceCodeInfo.expiresAt,
		codeEmbeddedInUri: deviceCodeInfo.codeEmbeddedInUri,
		title: connector?.name,
		iconUrl: connector?.icon,
		overlayZIndex,
		onCancel: async () => {
			const configId = deviceCodeInfo.configId;
			const connectorName = connector?.name ?? configId;
			connectorStore.getState().dismissDeviceCodeModal();
			try {
				const result = await connectorStore.getState().cancelMcpConnector(configId);
				if (result.success) toast.info(t("connectorPanel.cancelConnectSuccess", { name: connectorName }));
				else if (result.error) toast.error(t("connectorPanel.cancelConnectError", { error: result.error }));
			} catch (error) {
				console.warn("[ConnectorDeviceCodeModalHost] cancelMcpConnector failed:", error);
			}
		}
	}), document.body);
};
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/components/connector-device-code-modal/index.ts
var connector_device_code_modal_exports = /* @__PURE__ */ __exportAll({
	ConnectorDeviceCodeModal: () => ConnectorDeviceCodeModal,
	ConnectorDeviceCodeModalHost: () => ConnectorDeviceCodeModalHost
});
//#endregion
export { ConnectorDeviceCodeModalHost as n, connector_device_code_modal_exports as t };
