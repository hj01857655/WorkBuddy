import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { E1 as init_useI18n, O1 as useTranslation } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime, ji as ConfirmDialog, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/skills/components/skill-scan-result-dialog/index.less
var init_skill_scan_result_dialog$1 = __esmMin((() => {})), import_jsx_runtime, SingleScanResultDialog, SkillScanResultDialog;
//#endregion
__esmMin((() => {
	init_skill_scan_result_dialog$1();
	init_src();
	require_react();
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	SingleScanResultDialog = ({ skillName, scanResult, onConfirmUninstall, onClose }) => {
		const t = useTranslation();
		const riskLevelText = t(`skills.security.result.${scanResult.riskLevel}`);
		const verdictText = scanResult.verdict ? t(`skills.security.verdict.${scanResult.verdict}`) : "";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			visible: true,
			title: t("skills.security.scanResultDialog.title"),
			showCloseButton: true,
			detailContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "skill-scan-result-dialog-detail",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-scan-result-dialog-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-label",
							children: t("skills.security.scanResultDialog.skillName", { name: "" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-value",
							children: skillName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-scan-result-dialog-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-label",
							children: t("skills.security.scanResultDialog.riskLevel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `skill-scan-result-dialog-risk skill-scan-result-dialog-risk--${scanResult.riskLevel}`,
							children: riskLevelText
						})]
					}),
					verdictText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-scan-result-dialog-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-label",
							children: t("skills.security.overallVerdict")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-value",
							children: verdictText
						})]
					}),
					scanResult.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "skill-scan-result-dialog-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-desc",
							children: scanResult.description
						})
					}),
					scanResult.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "skill-scan-result-dialog-tags",
						children: scanResult.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `skill-scan-result-dialog-tag skill-scan-result-dialog-tag--${scanResult.riskLevel}`,
							title: tag.tag,
							children: tag.desc || tag.tag
						}, tag.tag))
					}),
					scanResult.virusName.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-scan-result-dialog-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-label",
							children: t("skills.security.virusName")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-scan-result-dialog-value",
							children: scanResult.virusName.join(", ")
						})]
					})
				]
			}),
			confirmText: t("skills.security.scanResultDialog.uninstall"),
			cancelText: t("skills.security.scanResultDialog.keep"),
			confirmButtonColor: "#e74c3c",
			onConfirm: onConfirmUninstall,
			onClose
		});
	};
	SkillScanResultDialog = ({ notifications, onConfirmUninstall, onClose }) => {
		if (notifications.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: notifications.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleScanResultDialog, {
			skillName: entry.task.skillName,
			scanResult: entry.result,
			onConfirmUninstall: () => onConfirmUninstall(entry.task.md5),
			onClose: () => onClose(entry.task.md5)
		}, entry.task.md5)) });
	};
}))();
export { SkillScanResultDialog };
