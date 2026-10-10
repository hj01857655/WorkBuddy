const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./browser-BmxAAMOf.js","./rolldown-runtime-V4kyJ4NV.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, F6 as init_src, K2 as init_environment, O1 as useTranslation, S7 as Loading, T0 as init_app_core, V5 as message, a5 as ShareQrcodeIcon, e4 as isWorkBuddyDesktop, ea as fetchAsPngDataUrl, f3 as wb, krt as Button, m5 as init_src$1, na as handleCopyQRCode, p7 as Popover, ra as handleSaveQRCode, sa as init_share_platform_helpers } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Ov as __vitePreload, Tv as require_jsx_runtime, kv as init_preload_helper } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/miniprogram-qrcode-preview/styles.less
var init_styles = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/miniprogram-qrcode-preview/qrcode-utils.ts
/**
* 把 `wb.http` 的响应体归一化成字节。
*
* Desktop 的 renderer → daemon 走 stdio JSON，`responseType: 'arraybuffer'` 拿回来的
* 并不是 ArrayBuffer：daemon 侧 Node axios 返回 Buffer，过 JSON 后变成
* `{ type: 'Buffer', data: [...] }`；真 ArrayBuffer 则直接退化成 `{}`
* （见 wb/namespaces/http.types.ts 里 contentBase64 的说明）。直接
* `new Blob([payload])` 会把对象 toString 成 `[object Object]`，后续解码必挂。
*
* 拿不到可用字节时返回 null，由调用方回退到原始的 fetch 错误。
*/
function toQrcodeBytes(payload) {
	if (payload instanceof ArrayBuffer) return payload;
	if (payload instanceof Uint8Array) return Uint8Array.from(payload).buffer;
	if (Array.isArray(payload)) return Uint8Array.from(payload).buffer;
	if (typeof payload === "string") return Uint8Array.from(atob(payload), (char) => char.charCodeAt(0)).buffer;
	const serializedBuffer = payload?.data;
	if (Array.isArray(serializedBuffer)) return Uint8Array.from(serializedBuffer).buffer;
	return null;
}
/**
* 先走浏览器 fetch；COS 未开放 CORS 时回退 wb.http，由宿主侧拉取二进制，
* 避开 renderer 的跨域限制。与 workbuddy-baas 发布二维码链路保持同一策略。
*/
async function fetchMiniprogramQrcodeBlob(url) {
	try {
		const response = await fetch(url, {
			mode: "cors",
			credentials: "omit"
		});
		if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
		return await response.blob();
	} catch (fetchError) {
		try {
			const bytes = toQrcodeBytes(await wb.http.get(url, { responseType: "arraybuffer" }));
			if (!bytes?.byteLength) throw new Error("host fetch returned no usable bytes");
			return new Blob([bytes]);
		} catch {
			throw fetchError;
		}
	}
}
/** 拉取后端图片并统一转成 PNG data URL（剪贴板与保存都只认 PNG）。 */
async function decodeRemoteQrcodeAsPng(imageUrl) {
	const blob = await fetchMiniprogramQrcodeBlob(imageUrl);
	const objectUrl = URL.createObjectURL(blob);
	try {
		return await fetchAsPngDataUrl(objectUrl);
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
}
/** 后端图片 URL 直接解码；URL Link / Scheme 才由前端编码为二维码。 */
async function createMiniprogramQrcodeDataUrl(value, imageUrl) {
	if (imageUrl) return decodeRemoteQrcodeAsPng(imageUrl);
	if (!value) throw new Error("Missing mini-program QR code source");
	return (await __vitePreload(() => import("./browser-BmxAAMOf.js").then((m) => /* @__PURE__ */ __toESM(m.default)).then((module) => module.default), __vite__mapDeps([0,1]), import.meta.url)).toDataURL(value, {
		errorCorrectionLevel: "M",
		margin: 2,
		width: 256
	});
}
/**
* 复用 agent-ui 已有 Desktop/Web 二维码保存能力。
*
* 取不到图时 Desktop 还有一条不经渲染进程的路：`wb.http.download` 由 daemon 直接
* 下载落盘，字节不跨进程边界，天然不受 CORS 影响。Web 不走这条——`<a download>`
* 对跨域 URL 会忽略 download 属性、直接把当前页导航走，比报错更糟。
*
* 只有「拿不到图」才回退；保存阶段的失败（含用户取消对话框）照常上抛，否则会再弹
* 一次保存框。
*/
async function saveMiniprogramQrcode(value, imageUrl) {
	let dataUrl;
	try {
		dataUrl = await createMiniprogramQrcodeDataUrl(value, imageUrl);
	} catch (error) {
		if (!imageUrl || !isWorkBuddyDesktop()) throw error;
		await wb.http.download({
			url: imageUrl,
			filename: QRCODE_FILE_NAME,
			saveAs: true
		});
		return;
	}
	await handleSaveQRCode(dataUrl);
}
/** 将生成后的二维码图片写入系统剪贴板。 */
async function copyMiniprogramQrcode(dataUrl) {
	await handleCopyQRCode(dataUrl);
}
var QRCODE_FILE_NAME;
var init_qrcode_utils = __esmMin((() => {
	init_app_core();
	init_environment();
	init_share_platform_helpers();
	init_preload_helper();
	QRCODE_FILE_NAME = "qrcode.png";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/miniprogram-qrcode-preview/index.tsx
var import_react, import_jsx_runtime, IMAGE_RETRY_INTERVAL_MS, IMAGE_MAX_RETRIES, QrcodePreview;
var init_miniprogram_qrcode_preview = __esmMin((() => {
	init_styles();
	init_src();
	init_src$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_qrcode_utils();
	import_jsx_runtime = require_jsx_runtime();
	IMAGE_RETRY_INTERVAL_MS = 1e3;
	IMAGE_MAX_RETRIES = 30;
	QrcodePreview = ({ value, imageUrl, label, buttonSize = "medium", showCopy = true, onOpenChange, loadError = false, onRetryLoad }) => {
		const t = useTranslation();
		const [dataUrl, setDataUrl] = (0, import_react.useState)("");
		const [imageLoadState, setImageLoadState] = (0, import_react.useState)("loading");
		const [imageRetryCount, setImageRetryCount] = (0, import_react.useState)(0);
		const [imageReloadToken, setImageReloadToken] = (0, import_react.useState)(0);
		const [copying, setCopying] = (0, import_react.useState)(false);
		const [saving, setSaving] = (0, import_react.useState)(false);
		const imageRetryTimerRef = (0, import_react.useRef)();
		(0, import_react.useEffect)(() => {
			let cancelled = false;
			setDataUrl("");
			if (!value && !imageUrl) return () => {
				cancelled = true;
			};
			createMiniprogramQrcodeDataUrl(value, imageUrl).then((next) => {
				if (!cancelled) setDataUrl(next);
			}).catch((error) => {
				if (!cancelled) {
					setDataUrl("");
					console.warn("[QrcodePreview] convert image to PNG data URL failed; using the original image URL for preview", error);
				}
			});
			return () => {
				cancelled = true;
			};
		}, [imageUrl, value]);
		const previewSrc = dataUrl || imageUrl;
		(0, import_react.useEffect)(() => {
			if (imageRetryTimerRef.current !== void 0) {
				window.clearTimeout(imageRetryTimerRef.current);
				imageRetryTimerRef.current = void 0;
			}
			setImageLoadState("loading");
			setImageRetryCount(0);
			setImageReloadToken(0);
			return () => {
				if (imageRetryTimerRef.current !== void 0) {
					window.clearTimeout(imageRetryTimerRef.current);
					imageRetryTimerRef.current = void 0;
				}
			};
		}, [previewSrc]);
		const retryImage = () => {
			if (imageRetryTimerRef.current !== void 0) {
				window.clearTimeout(imageRetryTimerRef.current);
				imageRetryTimerRef.current = void 0;
			}
			setImageLoadState("loading");
			setImageRetryCount(0);
			setImageReloadToken((current) => current + 1);
		};
		const handleImageError = () => {
			if (!imageUrl || imageRetryCount >= IMAGE_MAX_RETRIES) {
				setImageLoadState("failed");
				return;
			}
			setImageLoadState("loading");
			imageRetryTimerRef.current = window.setTimeout(() => {
				imageRetryTimerRef.current = void 0;
				setImageRetryCount((current) => current + 1);
				setImageReloadToken((current) => current + 1);
			}, IMAGE_RETRY_INTERVAL_MS);
		};
		const trigger = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: buttonSize,
			iconOnly: true,
			"aria-label": t("application.miniprogram.qrcode.preview", { version: label }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareQrcodeIcon, {})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
			trigger,
			triggerMode: "hover",
			onOpenChange,
			placement: "bottom-end",
			offsetDistance: 4,
			portalRoot: "body",
			role: "dialog",
			ariaLabel: t("application.miniprogram.qrcode.preview", { version: label }),
			manageFocus: true,
			className: "miniprogram-qrcode-popover",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "miniprogram-qrcode-preview",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "miniprogram-qrcode-preview__title",
						children: t("application.miniprogram.qrcode.title", { version: label })
					}),
					loadError && !previewSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "miniprogram-qrcode-preview__load-error",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("application.miniprogram.qrcode.unavailable") }), onRetryLoad ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							size: "small",
							onClick: onRetryLoad,
							children: t("common.retry")
						}) : null]
					}) : previewSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: previewSrc,
							alt: `${label} ${t("application.miniprogram.qrcode.alt")}`,
							className: imageLoadState === "ready" ? void 0 : "miniprogram-qrcode-preview__image--pending",
							onLoad: () => setImageLoadState("ready"),
							onError: handleImageError
						}, `${previewSrc}:${imageReloadToken}`),
						imageLoadState === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "miniprogram-qrcode-preview__loading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { size: "small" })
						}) : null,
						imageLoadState === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "miniprogram-qrcode-preview__load-error",
							role: "alert",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("application.miniprogram.qrcode.unavailable") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								size: "small",
								onClick: retryImage,
								children: t("common.retry")
							})]
						}) : null
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "miniprogram-qrcode-preview__loading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { size: "small" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "miniprogram-qrcode-preview__hint",
						children: t("application.miniprogram.auth.scanHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "miniprogram-qrcode-preview__actions",
						children: [showCopy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "small",
							loading: copying,
							disabled: !value && !imageUrl,
							onClick: async () => {
								setCopying(true);
								try {
									await copyMiniprogramQrcode(dataUrl || await createMiniprogramQrcodeDataUrl(value, imageUrl));
									message.success(t("application.miniprogram.qrcode.copied"));
								} catch {
									message.error(t("application.miniprogram.qrcode.copyFailed"));
								} finally {
									setCopying(false);
								}
							},
							children: t("application.miniprogram.qrcode.copy")
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "small",
							loading: saving,
							disabled: !value && !imageUrl,
							onClick: async () => {
								setSaving(true);
								try {
									await saveMiniprogramQrcode(value, imageUrl);
								} catch (error) {
									if (error?.message !== "USER_CANCELLED") message.error(t("application.miniprogram.qrcode.saveFailed"));
								} finally {
									setSaving(false);
								}
							},
							children: t("application.miniprogram.qrcode.download")
						})]
					})
				]
			})
		});
	};
}));
//#endregion
export { init_qrcode_utils as i, init_miniprogram_qrcode_preview as n, createMiniprogramQrcodeDataUrl as r, QrcodePreview as t };
