import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/hooks/use-describe-upload-error.ts
var import_react, UPLOAD_ERR_PREFIX, useDescribeUploadError;
var init_use_describe_upload_error = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	UPLOAD_ERR_PREFIX = "lx-upload-err:";
	useDescribeUploadError = () => {
		const t = useTranslation();
		return (0, import_react.useCallback)((err) => {
			const msg = err instanceof Error ? err.message : String(err);
			const prefixSource = msg.startsWith(UPLOAD_ERR_PREFIX) ? msg : null;
			if (prefixSource) {
				const payload = prefixSource.slice(14);
				const colonIdx = payload.indexOf(":");
				const key = colonIdx === -1 ? payload : payload.slice(0, colonIdx);
				const detail = colonIdx === -1 ? "" : payload.slice(colonIdx + 1);
				if (key === "fileTooLarge") {
					if (detail) return t("tencentLexiang.upload.fileTooLargeDetail", { limit: detail });
					return t("tencentLexiang.upload.fileTooLarge");
				}
				if (key === "noEntryFile" || key === "no_entry_file") return t("tencentLexiang.upload.noEntryFile");
				if (key === "htmlFileSizeLimit" || key === "html_file_size_limit") return t("tencentLexiang.upload.htmlFileSizeLimit");
				if (key === "nameTooLong") return t("tencentLexiang.upload.nameTooLong");
				if (key === "folderTooDeep") return t("tencentLexiang.upload.folderTooDeep", { limit: detail || "" });
				if (key === "folderTooManyChildren") return t("tencentLexiang.upload.folderTooManyChildren", { limit: detail || "" });
				if (key === "createFolderFailed") return t("tencentLexiang.upload.createFolderFailed");
				if (key === "notADirectory") return t("tencentLexiang.upload.notADirectory");
				if (key === "htmlUnsupportedFormat") return t("tencentLexiang.upload.htmlUnsupportedFormat", { ext: detail || "" });
				if (key === "htmlImportTimeout") return t("tencentLexiang.upload.htmlImportTimeout");
			}
			if (/\bno_entry_file\b/.test(msg)) return t("tencentLexiang.upload.noEntryFile");
			if (/\bhtml_file_size_limit\b/.test(msg)) return t("tencentLexiang.upload.htmlFileSizeLimit");
			const httpMatch = msg.match(/HTTP\s+(\d{3})/);
			const status = httpMatch ? Number(httpMatch[1]) : void 0;
			if (status === 401 || status === 403) return t("tencentLexiang.upload.failed.forbidden");
			if (status === 429) return t("tencentLexiang.upload.failed.rateLimit");
			if (status && status >= 500) return t("tencentLexiang.upload.failed.server", { bizCode: status });
			if (/^\[TencentLexiang\] HTTP\s/.test(msg) || /\bput\b.*\bfailed\b/i.test(msg)) return t("tencentLexiang.upload.failed.network");
			return t("tencentLexiang.upload.failed");
		}, [t]);
	};
}));
//#endregion
export { useDescribeUploadError as n, init_use_describe_upload_error as t };
