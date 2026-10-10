import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as useTranslation } from "./useTranslation-DoKXWcey.js";
import "./local-docs-facade-Cr4Rvoow.js";
import { g as openExternalUrl } from "./workbuddy-provider-BD7no46c.js";
//#region ../../packages/workbuddy-app/src/components/connector-token-config-modal/token-form-logic.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
/**
* 计算哪些字段缺失必填。返回字段 key 列表（按 schema 顺序）。
*
* @param schema Token 表单 schema
* @param values 当前输入值（包含所有字段）
* @param hasSecretFields 后端已标记"有保存值"的 password 字段 key 列表
*/
function findMissingRequiredFields(schema, values, hasSecretFields = []) {
	const secretSet = new Set(hasSecretFields);
	const missing = [];
	for (const field of schema.fields) {
		if (!field.required) continue;
		const value = values[field.key] ?? "";
		if (field.type === "password") {
			if (value.trim().length === 0 && !secretSet.has(field.key)) missing.push(field.key);
		} else if (value.trim().length === 0) missing.push(field.key);
	}
	return missing;
}
/**
* 把表单值转换成要提交给 updateEnv 的 env 对象。
*
* 核心规则：
* - password 字段且用户未输入（trim 后为空）：**跳过**（沿用已有保存值）
* - password 字段且用户输入了新值：提交新值
* - 非 password 字段：原样下发（包括空串，允许用户清空）
*
* @param schema Token 表单 schema
* @param values 当前输入值
*/
function buildEnvPayload(schema, values) {
	const payload = {};
	for (const field of schema.fields) {
		const value = values[field.key] ?? "";
		if (field.type === "password") {
			if (value.trim().length === 0) continue;
			payload[field.key] = value;
		} else payload[field.key] = value;
	}
	return payload;
}
/**
* 根据 schema + 主进程下发的 initialValues 构造表单初始值。
*
* initialValues 来自 `ConnectorConfigInfo.tokenValues`（主进程 buildConnectorConfig 脱敏后）：
* - password 字段：始终为空串（主进程脱敏后也是空）
* - 非 password 字段：已保存值或 defaultValue
*
* 这里只做浅合并 + 保底默认值，确保每个字段都有字符串（避免受控/非受控切换警告）。
*/
function buildInitialFormValues(schema, initialValues) {
	const result = {};
	for (const field of schema.fields) {
		const provided = initialValues?.[field.key];
		if (typeof provided === "string") result[field.key] = provided;
		else if (field.type !== "password" && typeof field.defaultValue === "string") result[field.key] = field.defaultValue;
		else result[field.key] = "";
	}
	return result;
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/connector-token-config-modal/connector-token-config-modal.tsx
var import_jsx_runtime = require_jsx_runtime();
var PREFIX = "connector-token-config-modal";
/**
* 仅依赖的最小 preload 桥接：
* - desktop host opener 打开浏览器文档链接（电子 shell.openExternal 的封装）。
* 找不到时回退到 `window.open`，与 main 进程 deep-link 规则兼容。
*/
function openDocUrl(url) {
	openExternalUrl(url).catch((err) => {
		console.error("[ConnectorTokenConfigModal] openExternal failed:", err);
	});
}
var closeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	width: "20",
	height: "20",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: "18",
		y1: "6",
		x2: "6",
		y2: "18"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: "6",
		y1: "6",
		x2: "18",
		y2: "18"
	})]
});
function ConnectorTokenConfigModal(props) {
	const { visible, tokenConfig, initialValues, hasSecretFields, initialSubmitError, onSave, onCancel } = props;
	const { t } = useTranslation();
	const [values, setValues] = (0, import_react.useState)(() => buildInitialFormValues(tokenConfig, initialValues));
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [submitError, setSubmitError] = (0, import_react.useState)(initialSubmitError ?? "");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (visible) {
			setValues(buildInitialFormValues(tokenConfig, initialValues));
			setFieldErrors({});
			setSubmitError(initialSubmitError ?? "");
			setIsSubmitting(false);
		}
	}, [
		visible,
		tokenConfig,
		initialValues
	]);
	(0, import_react.useEffect)(() => {
		if (visible && typeof initialSubmitError === "string" && initialSubmitError.length > 0) setSubmitError(initialSubmitError);
	}, [visible, initialSubmitError]);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		const handler = (e) => {
			if (e.key === "Escape" && !isSubmitting) onCancel();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [
		visible,
		isSubmitting,
		onCancel
	]);
	if (!visible) return null;
	const handleFieldChange = (key, value) => {
		setValues((prev) => ({
			...prev,
			[key]: value
		}));
		if (fieldErrors[key]) setFieldErrors((prev) => {
			const next = { ...prev };
			delete next[key];
			return next;
		});
		setSubmitError("");
	};
	const handleSubmit = async () => {
		const missing = findMissingRequiredFields(tokenConfig, values, hasSecretFields ?? []);
		if (missing.length > 0) {
			const requiredMsg = t("connectors:tokenConfig.fieldRequired");
			const nextErrors = {};
			for (const key of missing) nextErrors[key] = requiredMsg;
			setFieldErrors(nextErrors);
			return;
		}
		const payload = buildEnvPayload(tokenConfig, values);
		setIsSubmitting(true);
		setSubmitError("");
		try {
			await onSave(payload);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			setSubmitError(message || t("connectors:tokenConfig.submitFailed"));
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleOverlayKey = (e, isLast) => {
		if (e.key === "Enter" && !isSubmitting && isLast) handleSubmit().catch(() => void 0);
	};
	const title = tokenConfig.title || t("connectors:tokenConfig.defaultTitle");
	const description = tokenConfig.description;
	const docUrl = tokenConfig.docUrl;
	const docLabel = tokenConfig.docLabel || t("connectors:tokenConfig.defaultDocLabel");
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${PREFIX}-overlay`,
		role: "dialog",
		"aria-modal": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: PREFIX,
			onClick: (e) => {
				e.stopPropagation();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${PREFIX}-close-btn`,
					onClick: onCancel,
					disabled: isSubmitting,
					"aria-label": t("common:close"),
					children: closeIcon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${PREFIX}-body`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: `${PREFIX}-title`,
							children: title
						}),
						description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `${PREFIX}-description`,
							children: description
						}),
						docUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${PREFIX}-doc-link`,
							onClick: () => openDocUrl(docUrl),
							children: docLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${PREFIX}-fields`,
							children: tokenConfig.fields.map((field, idx) => {
								const isLast = idx === tokenConfig.fields.length - 1;
								const isPassword = field.type === "password";
								const placeholder = isPassword && (hasSecretFields ?? []).includes(field.key) ? t("connectors:tokenConfig.passwordExistsPlaceholder") : field.placeholder || "";
								const err = fieldErrors[field.key];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `${PREFIX}-field`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: `${PREFIX}-field-label`,
											htmlFor: `${PREFIX}-${field.key}`,
											children: [field.label, field.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `${PREFIX}-field-required`,
												children: " *"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: `${PREFIX}-${field.key}`,
											type: isPassword ? "password" : "text",
											className: `${PREFIX}-field-input${err ? ` ${PREFIX}-field-input-error` : ""}`,
											value: values[field.key] ?? "",
											placeholder,
											disabled: isSubmitting,
											autoFocus: idx === 0,
											onChange: (e) => handleFieldChange(field.key, e.target.value),
											onKeyDown: (e) => handleOverlayKey(e, isLast)
										}),
										field.description && !err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `${PREFIX}-field-hint`,
											children: field.description
										}),
										err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `${PREFIX}-field-error`,
											children: err
										})
									]
								}, field.key);
							})
						}),
						submitError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${PREFIX}-submit-error`,
							children: submitError
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${PREFIX}-footer`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${PREFIX}-btn ${PREFIX}-btn-secondary`,
						onClick: onCancel,
						disabled: isSubmitting,
						children: t("connectors:tokenConfig.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${PREFIX}-btn ${PREFIX}-btn-primary`,
						onClick: () => {
							handleSubmit().catch(() => void 0);
						},
						disabled: isSubmitting,
						children: isSubmitting ? t("connectors:tokenConfig.saving") : t("connectors:tokenConfig.save")
					})]
				})
			]
		})
	}), document.body);
}
//#endregion
export { ConnectorTokenConfigModal as t };
