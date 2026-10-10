import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { c7 as Modal, krt as Button, m5 as init_src } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as useTranslation } from "./useTranslation-DoKXWcey.js";
import { o as getDaemonClient } from "./local-docs-facade-Cr4Rvoow.js";
//#region ../../packages/workbuddy-app/src/components/database-recovery-modal/get-message-key.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
init_src();
/**
* 根据恢复类型确定展示的 i18n message key：
* - wal-only / silent-wal-loss-*：WAL 文件损坏，数据几乎无损
* - full-corruption：主库损坏重建，自动化任务和部分历史可能丢失
* - cross-restart-recovered：跨启动恢复完成，数据完整找回
* - cross-restart-partial：跨启动恢复完成，大部分数据找回
* - recovery-exhausted：恢复尝试耗尽
* - recovery-aborted：恢复因文件占用被中止，数据完好
* - 其他/未知：通用文案
*/
function getMessageKey(notice) {
	const type = notice.dataRecovery?.type;
	if (!type) return "databaseRecovery:message";
	if (type === "wal-only" || type.startsWith("silent-wal-loss")) return "databaseRecovery:messageWalOnly";
	if (type === "full-corruption") return "databaseRecovery:messageFullCorruption";
	if (type === "cross-restart-recovered") return "databaseRecovery:messageCrossRestartRecovered";
	if (type === "cross-restart-partial") return "databaseRecovery:messageCrossRestartPartial";
	if (type === "recovery-exhausted") return "databaseRecovery:messageRecoveryExhausted";
	if (type === "recovery-aborted") return "databaseRecovery:messageRecoveryAborted";
	return "databaseRecovery:message";
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/database-recovery-modal/recovery-telemetry.ts
/** 遥测事件码，与后端 schema 对齐。 */
var WB_EVENT_DATABASE_RECOVERY = "wb_database_recovery";
/**
* 上报数据库恢复事件到遥测通道。
*
* fire-and-forget：失败不影响 UI，不抛异常。
*/
function reportRecoveryTelemetry(notice) {
	try {
		const api = getDaemonClient();
		if (!api.telemetryReport) return;
		const dr = notice.dataRecovery ?? {};
		const payload = {
			recoveryType: dr.type ?? "unknown",
			recoveredAt: notice.recoveredAt,
			reason: notice.reason,
			recoveryOutcome: dr.recoveryOutcome,
			walReplayed: dr.walReplayed,
			sessionsRecovered: dr.sessionsRecovered,
			attemptCount: dr.attemptCount,
			sessionsFromBackup: dr.sessionsFromBackup,
			sessionsFromJsonl: dr.sessionsFromJsonl,
			dataIntact: dr.dataIntact,
			backupTimestamp: dr.backupTimestamp
		};
		const filtered = {};
		for (const [k, v] of Object.entries(payload)) if (v !== void 0) filtered[k] = v;
		api.telemetryReport(WB_EVENT_DATABASE_RECOVERY, filtered);
	} catch {}
}
//#endregion
//#region ../../packages/workbuddy-app/src/components/database-recovery-modal/database-recovery-modal.tsx
/**
* DatabaseRecoveryModalHost — 数据库自动恢复弹框通知（网关组件）
*
* 职责：
*   启动时一次性查询 daemon 是否发生过 SQLite 主库 / WAL 损坏的自动修复，
*   若有则弹 Modal 告知用户数据库已自动恢复、部分历史会话可能丢失。
*
* 设计：
*   - 挂在 `Root` 顶层 sibling（与 ConnectorTokenConfigGate 同级），生命周期与应用一致
*   - 纯 UI 网关：自身不持有 daemon client，通过 `getRecoveryNotice` prop 注入数据来源，
*     便于单测与未来下沉
*   - 仅弹一次（daemon 端 consumeRecoveryNotice 读后清除，多窗口不会重复弹）
*   - 使用 foundation Modal / Button（走 agent-ui build 输出，避免把 agent-ui/src 整包纳入 typecheck）
*   - 根据损坏类型（WAL-only / 主库损坏）显示不同提示文案
*/
var import_jsx_runtime = require_jsx_runtime();
function DatabaseRecoveryModalHost({ getRecoveryNotice }) {
	const { t } = useTranslation();
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getRecoveryNotice().then((result) => {
			if (result) {
				setNotice(result);
				setOpen(true);
				reportRecoveryTelemetry(result);
			}
		}).catch(() => {});
	}, [getRecoveryNotice]);
	if (!notice) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open,
		onOpenChange: setOpen,
		title: t("databaseRecovery:title"),
		size: "small",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			size: "large",
			onClick: () => setOpen(false),
			children: t("databaseRecovery:ok")
		}),
		closeOnOverlayClick: false,
		closeOnEscape: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				margin: 0,
				lineHeight: 1.6
			},
			children: t(getMessageKey(notice))
		})
	});
}
//#endregion
export { DatabaseRecoveryModalHost };
