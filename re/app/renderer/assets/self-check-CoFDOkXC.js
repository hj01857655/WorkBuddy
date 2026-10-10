import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $B as init_icons, $w as WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, E1 as init_useI18n, HV as PendingIcon, I1 as t, O1 as useTranslation, PC as init_hooks, QV as LoaderIcon, RH as CheckIcon, RV as RefreshCwIcon, XG as init_use_floating_layer, j1 as init_i18n, krt as Button, m5 as init_src, tT as useBodyClassRefCount, wH as CircleXIcon } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, Kh as require_react_dom, Tv as require_jsx_runtime, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
import { Mt as createStore, Nt as init_vanilla, Pt as require_zustand } from "./ui-ardot-OEUzH9ni.js";
import { i as TargetGroup, n as ChecksGroup, r as OverviewGroup } from "./network-check-BoLxsxGF.js";
/* empty css                          */
//#region ../../packages/agent-ui/src/components/self-check/adapter-protocol.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
init_src$1();
init_src();
init_i18n();
init_use_floating_layer();
init_icons();
init_hooks();
/**
* 自检大类枚举 —— 与主进程 self-check 的 `SELF_CHECK_CATEGORY` 取值保持一致。
* 主进程 `CheckResult.category` 返回英文 key，UI 侧用 `t('selfCheck.category.<key>')` 翻译显示。
*/
var SELF_CHECK_CATEGORY = {
	network: "network",
	system: "system",
	security: "security",
	environment: "environment"
};
require_react_dom();
init_useI18n();
function FpsDiagnosticsRow({ visible, onToggle }) {
	const t = useTranslation();
	const titleId = "self-check-fps-row-title";
	const actionId = "self-check-fps-row-action";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "self-check-fps-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "self-check-fps-row__copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: titleId,
				className: "self-check-fps-row__title",
				children: t("selfCheck.fps.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-fps-row__description",
				children: t("selfCheck.fps.description")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "link",
			size: "small",
			"aria-pressed": visible,
			"aria-labelledby": `${actionId} ${titleId}`,
			onClick: onToggle,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: actionId,
				children: t(visible ? "selfCheck.fps.hide" : "selfCheck.fps.show")
			})
		})]
	});
}
//#endregion
//#region ../../packages/agent-ui/src/components/self-check/render-rules.ts
/**
* 判定「网络」大类展开后是否使用 network-check 的 group 组件渲染
* （「概览 / 当前目标 / 检测项」三段式），而非通用检查项列表。
*
* 网络大类默认走 group 组件：`result=null` 时它本就会渲染 5 个「待检测 / 等待中」行，
* 正是骨架态想要的效果（`CATEGORY_SKELETON` 未定义「网络」的骨架，只能靠它）。
*
* 唯一需要**退化**为通用列表的场景是「跑过但网络诊断整体失败」：此时 `network`
* 为 null，group 组件只能渲染「等待中」，而头部徽章按 items 统计已是 N 失败，
* 会出现「徽章说失败、子项全是等待中、找不到失败项」的矛盾（#88173）。
*
* 用 `itemCount === 0` 区分「从未跑过」与「跑过且失败」—— 失败路径会推入
* 6 个 fail 结果（1 总体 + 5 子项），idle 态一个都没有。
*
* ⚠️ 历史回归：曾写作 `network != null || running`，把 idle 态一并排除，
* 导致首次打开时网络卡片展开后**完全空白**；个人账号只有网络这一个大类，
* 等于整个弹窗没有内容。切换账号清空状态后同样会退回 idle 态，必须一起覆盖。
*/
function shouldUseNetworkGroups(params) {
	const { isNetwork, network, running, itemCount } = params;
	if (!isNetwork) return false;
	return network != null || running || itemCount === 0;
}
//#endregion
//#region ../../packages/agent-ui/src/components/self-check/self-check-category-model.ts
var SELF_CHECK_CATEGORIES_ALL = [
	SELF_CHECK_CATEGORY.network,
	SELF_CHECK_CATEGORY.system,
	SELF_CHECK_CATEGORY.security,
	SELF_CHECK_CATEGORY.environment
];
var SELF_CHECK_CATEGORIES_CONSUMER = [SELF_CHECK_CATEGORY.network];
var NETWORK_STATUS = {
	success: "pass",
	warning: "warning",
	error: "fail"
};
var NETWORK_BADGE_KEY = {
	pass: "selfCheck.status.pass",
	warning: "selfCheck.badge.hasWarning",
	fail: "selfCheck.badge.hasFail",
	info: "selfCheck.badge.na"
};
function buildSelfCheckCategoryViews({ categories, results, running, totalChecks, network, translate }) {
	return categories.map((category) => {
		const items = results.filter((result) => result.category === category);
		if (category === SELF_CHECK_CATEGORY.network && network) return buildNetworkCategoryView(category, items, network, translate);
		return buildResultCategoryView({
			category,
			items,
			counts: countStatuses(items),
			running,
			expectedChecks: totalChecks / categories.length,
			translate
		});
	});
}
function buildNetworkCategoryView(category, items, network, translate) {
	const status = NETWORK_STATUS[network.overallStatus] ?? "info";
	return {
		category,
		items,
		passCount: 0,
		warnCount: 0,
		failCount: 0,
		status,
		badge: [{
			text: translate(NETWORK_BADGE_KEY[status]),
			tone: status
		}],
		defaultExpanded: status === "warning" || status === "fail"
	};
}
function countStatuses(items) {
	return {
		pass: items.filter((result) => result.status === "pass").length,
		warning: items.filter((result) => result.status === "warning").length,
		fail: items.filter((result) => result.status === "fail").length,
		info: items.filter((result) => result.status === "info").length
	};
}
function buildResultCategoryView({ category, items, counts, running, expectedChecks, translate }) {
	const base = {
		category,
		items,
		passCount: counts.pass,
		warnCount: counts.warning,
		failCount: counts.fail
	};
	if (items.length === 0) {
		const status = running ? "running" : "pending";
		return {
			...base,
			status,
			badge: [{
				text: translate(`selfCheck.status.${status}`),
				tone: status
			}],
			defaultExpanded: false
		};
	}
	if (running && items.length < expectedChecks) return runningCategoryView(base, translate);
	if (counts.fail > 0) return issueCategoryView(base, "fail", counts.fail, translate);
	if (counts.warning > 0) return issueCategoryView(base, "warning", counts.warning, translate);
	if (counts.info === items.length) return {
		...base,
		status: "info",
		badge: [{
			text: translate("selfCheck.badge.countItems", { count: String(items.length) }),
			tone: "info"
		}],
		defaultExpanded: false
	};
	return {
		...base,
		status: "pass",
		badge: [{
			text: translate("selfCheck.status.pass"),
			tone: "pass"
		}],
		defaultExpanded: false
	};
}
function runningCategoryView(base, translate) {
	return {
		...base,
		status: "running",
		badge: [{
			text: translate("selfCheck.status.running"),
			tone: "running"
		}],
		defaultExpanded: false
	};
}
function issueCategoryView(base, status, count, translate) {
	const badge = [];
	if (base.passCount > 0) badge.push({
		text: translate("selfCheck.badge.countPass", { count: String(base.passCount) }),
		tone: "pass"
	});
	const key = status === "fail" ? "selfCheck.badge.countFail" : "selfCheck.badge.countWarn";
	badge.push({
		text: translate(key, { count: String(count) }),
		tone: status
	});
	return {
		...base,
		status,
		badge,
		defaultExpanded: true
	};
}
//#endregion
//#region ../../packages/agent-ui/src/components/self-check/store.ts
var import_zustand = require_zustand();
init_vanilla();
var initialState = {
	visible: false,
	phase: "idle",
	results: [],
	progress: {
		current: 0,
		total: 0
	},
	error: null,
	latestReportPath: null,
	showFull: false,
	runSeq: 0,
	expandedCategories: /* @__PURE__ */ new Set(),
	startTime: null,
	endTime: null,
	duration: null,
	network: null
};
var selfCheckStore = createStore((set, get) => ({
	...initialState,
	open: () => {
		set({ visible: true });
	},
	close: () => {
		set({ visible: false });
	},
	reset: () => {
		set({
			...initialState,
			expandedCategories: /* @__PURE__ */ new Set()
		});
	},
	hydrate: (state) => {
		const patch = {
			phase: state.phase,
			results: state.results,
			progress: state.progress,
			latestReportPath: state.latestReportPath,
			network: state.network ?? null,
			showFull: state.showFull ?? false
		};
		if (state.finishedAt != null) patch.endTime = state.finishedAt;
		if (state.duration != null) patch.duration = state.duration;
		set(patch);
	},
	onProgressUpdate: (progress) => {
		if (get().phase !== "running") return;
		set({
			progress: {
				current: progress.current,
				total: progress.total
			},
			results: [...get().results, progress.result]
		});
	},
	toggleCategory: (category) => {
		const current = new Set(get().expandedCategories);
		if (current.has(category)) current.delete(category);
		else current.add(category);
		set({ expandedCategories: current });
	},
	setExpandedCategories: (categories) => {
		set({ expandedCategories: categories });
	},
	run: async (adapter) => {
		const nextSeq = get().runSeq + 1;
		set({
			phase: "running",
			error: null,
			runSeq: nextSeq,
			results: [],
			progress: {
				current: 0,
				total: 0
			},
			expandedCategories: !get().showFull ? /* @__PURE__ */ new Set([SELF_CHECK_CATEGORY.network]) : /* @__PURE__ */ new Set(),
			startTime: Date.now(),
			endTime: null,
			duration: null,
			network: null
		});
		try {
			const result = await adapter.runDiagnostics();
			if (get().runSeq !== nextSeq) return;
			const problematic = /* @__PURE__ */ new Set();
			for (const r of result.results) if (r.status === "fail" || r.status === "warning") problematic.add(r.category);
			set({
				phase: "done",
				results: result.results,
				latestReportPath: result.reportPath,
				showFull: result.showFull,
				network: result.network ?? null,
				expandedCategories: problematic,
				endTime: Date.now(),
				duration: result.duration ?? null
			});
		} catch (err) {
			if (get().runSeq !== nextSeq) return;
			set({
				phase: "idle",
				error: err instanceof Error ? err.message : String(err),
				endTime: Date.now()
			});
		}
	}
}));
var useSelfCheckStore = (selector) => (0, import_zustand.useStore)(selfCheckStore, selector);
//#endregion
//#region ../../packages/agent-ui/src/components/self-check/self-check-modal.tsx
function OptionalFpsDiagnosticsRow({ control }) {
	if (!control) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FpsDiagnosticsRow, {
		visible: control.visible,
		onToggle: control.onToggle
	});
}
var CATEGORY_SKELETON = {
	[SELF_CHECK_CATEGORY.system]: [{
		id: "system.disk.free_space",
		titleKey: "selfCheck.skeleton.system.disk.title",
		descKey: "selfCheck.skeleton.system.disk.desc"
	}, {
		id: "system.memory.usage",
		titleKey: "selfCheck.skeleton.system.memory.title",
		descKey: "selfCheck.skeleton.system.memory.desc"
	}],
	[SELF_CHECK_CATEGORY.security]: [{
		id: "security.edr_detection",
		titleKey: "selfCheck.skeleton.security.edr.title",
		descKey: "selfCheck.skeleton.security.edr.desc"
	}, {
		id: "security.file_monitor",
		titleKey: "selfCheck.skeleton.security.fileMonitor.title",
		descKey: "selfCheck.skeleton.security.fileMonitor.desc"
	}],
	[SELF_CHECK_CATEGORY.environment]: [{
		id: "env.system_info",
		titleKey: "selfCheck.skeleton.env.systemInfo.title",
		descKey: "selfCheck.skeleton.env.systemInfo.desc"
	}, {
		id: "env.crash_log",
		titleKey: "selfCheck.skeleton.env.crashLog.title",
		descKey: "selfCheck.skeleton.env.crashLog.desc"
	}]
};
function SelfCheckModal({ adapter, fpsControl }) {
	const visible = useSelfCheckStore((s) => s.visible);
	const phase = useSelfCheckStore((s) => s.phase);
	const results = useSelfCheckStore((s) => s.results);
	const progress = useSelfCheckStore((s) => s.progress);
	const error = useSelfCheckStore((s) => s.error);
	const latestReportPath = useSelfCheckStore((s) => s.latestReportPath);
	const showFull = useSelfCheckStore((s) => s.showFull);
	const expandedCategories = useSelfCheckStore((s) => s.expandedCategories);
	const startTime = useSelfCheckStore((s) => s.startTime);
	const endTime = useSelfCheckStore((s) => s.endTime);
	const duration = useSelfCheckStore((s) => s.duration);
	const network = useSelfCheckStore((s) => s.network);
	const close = useSelfCheckStore((s) => s.close);
	const run = useSelfCheckStore((s) => s.run);
	const toggleCategory = useSelfCheckStore((s) => s.toggleCategory);
	const setExpandedCategories = useSelfCheckStore((s) => s.setExpandedCategories);
	const onProgressUpdate = useSelfCheckStore((s) => s.onProgressUpdate);
	useBodyClassRefCount(WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, visible);
	const running = phase === "running";
	const done = phase === "done";
	useModalEventEffects({
		visible,
		close,
		adapter,
		onProgressUpdate
	});
	const report = useReportControls({
		adapter,
		visible,
		done,
		latestReportPath
	});
	const visibleCategories = showFull ? SELF_CHECK_CATEGORIES_ALL : SELF_CHECK_CATEGORIES_CONSUMER;
	const categoryViews = (0, import_react.useMemo)(() => buildSelfCheckCategoryViews({
		categories: visibleCategories,
		results,
		running,
		totalChecks: progress.total,
		network,
		translate: t
	}), [
		visibleCategories,
		results,
		running,
		progress.total,
		network
	]);
	useCategoryExpansionEffects({
		visible,
		visibleCategories,
		expandedCategories,
		setExpandedCategories,
		done,
		resultsLength: results.length,
		categoryViews,
		running
	});
	const checkInfo = useCheckInfo({
		done,
		startTime,
		endTime,
		duration
	});
	const handleOverlayClick = (0, import_react.useCallback)((event) => {
		if (event.target === event.currentTarget) close();
	}, [close]);
	const handleRerun = (0, import_react.useCallback)(() => {
		run(adapter).catch(() => void 0);
	}, [adapter, run]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "self-check-modal-overlay",
		onClick: handleOverlayClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "self-check-modal",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalCloseButton, { onClose: close }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelfCheckModalHeader, {
					phase,
					results,
					error,
					checkInfo,
					running,
					onRerun: handleRerun
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelfCheckModalBody, {
					error,
					categories: visibleCategories,
					categoryViews,
					expandedCategories,
					onToggleCategory: toggleCategory,
					network,
					running,
					fpsControl,
					showReport: done || report.latestReport !== null,
					reportDirectory: getReportDir(latestReportPath, report.latestReport),
					reportFilePath: latestReportPath ?? report.latestReport?.path ?? null,
					reportFileName: getReportFileName(latestReportPath, report.latestReport),
					canOpenDirectory: !!adapter.openReportDirectory,
					canRevealFile: !!adapter.revealReportFile,
					canExport: !!adapter.exportReport && (done || results.length > 0),
					onOpenDirectory: report.handleOpenDirectory,
					onRevealFile: report.handleRevealFile,
					onExport: report.handleExport
				})
			]
		})
	});
}
function useModalEventEffects({ visible, close, adapter, onProgressUpdate }) {
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") close();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [visible, close]);
	(0, import_react.useEffect)(() => {
		if (!visible || !adapter.onProgress) return;
		return adapter.onProgress(onProgressUpdate);
	}, [
		visible,
		adapter,
		onProgressUpdate
	]);
}
function useReportControls({ adapter, visible, done, latestReportPath }) {
	const [latestReport, setLatestReport] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!visible || !adapter.getLatestReport) return;
		adapter.getLatestReport().then(setLatestReport).catch(() => void 0);
	}, [visible, adapter]);
	(0, import_react.useEffect)(() => {
		if (!done || !adapter.getLatestReport) return;
		adapter.getLatestReport().then(setLatestReport).catch(() => void 0);
	}, [done, adapter]);
	return {
		latestReport,
		handleOpenDirectory: (0, import_react.useCallback)(() => {
			if (!adapter.openReportDirectory) return;
			const directory = getReportDir(latestReportPath, latestReport);
			if (!directory) return;
			Promise.resolve(adapter.openReportDirectory(directory)).catch((error) => {
				toast({
					message: t("selfCheck.toast.openDirFailed", { error: error instanceof Error ? error.message : String(error) }),
					type: "error"
				});
			});
		}, [
			adapter,
			latestReportPath,
			latestReport
		]),
		handleExport: (0, import_react.useCallback)(async () => {
			if (!adapter.exportReport) return;
			try {
				const saved = await adapter.exportReport("", latestReport?.name ?? "diagnostics-report.txt");
				if (saved?.filePath) toast({
					message: t("selfCheck.toast.exportSuccess", { path: saved.filePath }),
					type: "info"
				});
			} catch (error) {
				toast({
					message: t("selfCheck.toast.exportFailed", { error: error instanceof Error ? error.message : String(error) }),
					type: "error"
				});
			}
		}, [adapter, latestReport]),
		handleRevealFile: (0, import_react.useCallback)(() => {
			const filePath = latestReportPath ?? latestReport?.path;
			if (!adapter.revealReportFile || !filePath) return;
			Promise.resolve(adapter.revealReportFile(filePath)).catch((error) => {
				toast({
					message: t("selfCheck.toast.locateFailed", { error: error instanceof Error ? error.message : String(error) }),
					type: "error"
				});
			});
		}, [
			adapter,
			latestReportPath,
			latestReport
		])
	};
}
function useCategoryExpansionEffects({ visible, visibleCategories, expandedCategories, setExpandedCategories, done, resultsLength, categoryViews, running }) {
	const autoExpandedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!visible || visibleCategories.length !== 1) return;
		const only = visibleCategories[0];
		if (!expandedCategories.has(only)) setExpandedCategories(/* @__PURE__ */ new Set([only]));
	}, [
		visible,
		visibleCategories,
		setExpandedCategories
	]);
	(0, import_react.useEffect)(() => {
		if (!done || resultsLength === 0 || autoExpandedRef.current) return;
		const problematic = new Set(categoryViews.filter((view) => view.defaultExpanded).map((view) => view.category));
		if (problematic.size > 0) {
			setExpandedCategories(problematic);
			autoExpandedRef.current = true;
		}
	}, [
		done,
		resultsLength,
		categoryViews,
		setExpandedCategories
	]);
	(0, import_react.useEffect)(() => {
		if (running) autoExpandedRef.current = false;
	}, [running]);
}
function useCheckInfo({ done, startTime, endTime, duration }) {
	return (0, import_react.useMemo)(() => {
		if (!done || !endTime) return null;
		const time = new Date(endTime).toLocaleString();
		const durationMs = duration ?? (startTime ? endTime - startTime : 0);
		return t("selfCheck.checkInfo", {
			time,
			duration: (durationMs / 1e3).toFixed(1)
		});
	}, [
		done,
		startTime,
		endTime,
		duration
	]);
}
function ModalCloseButton({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "self-check-modal__close",
		onClick: onClose,
		"aria-label": t("selfCheck.close"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 4L4 12M4 4L12 12",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})
	});
}
function SelfCheckModalHeader({ phase, results, error, checkInfo, running, onRerun }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "self-check-modal__header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "self-check-modal__heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-modal__title",
				children: t("selfCheck.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-modal__subtitle",
				children: getSubtitle(phase, results, error, checkInfo)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "self-check-modal__actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "self-check-modal__rerun-btn",
				onClick: onRerun,
				disabled: running,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCwIcon, { className: running ? "self-check-modal__spin" : void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: running ? t("selfCheck.checking") : results.length > 0 ? t("selfCheck.rerun") : t("selfCheck.start") })]
			})
		})]
	});
}
function SelfCheckModalBody(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "self-check-modal__body",
		children: [
			props.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-modal__error-banner",
				children: props.error
			}),
			props.categories.map((category) => {
				const view = props.categoryViews.find((candidate) => candidate.category === category);
				if (!view) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
					view,
					expanded: props.expandedCategories.has(category),
					onToggle: () => props.onToggleCategory(category),
					network: category === SELF_CHECK_CATEGORY.network ? props.network : null,
					running: props.running
				}, category);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalFpsDiagnosticsRow, { control: props.fpsControl }),
			props.showReport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportGroup, {
				directory: props.reportDirectory,
				fileName: props.reportFileName,
				filePath: props.reportFilePath,
				canOpenDirectory: props.canOpenDirectory,
				canRevealFile: props.canRevealFile,
				canExport: props.canExport,
				onOpenDirectory: props.onOpenDirectory,
				onRevealFile: props.onRevealFile,
				onExport: props.onExport
			})
		]
	});
}
/**
* 渲染大类展开后的子项列表：
* - 未检测 / 检测中：按骨架顺序稳定展示，已完成项走 CheckItemRow，未完成项走 SkeletonRow
*   （保证重新检测过程中视觉不跳动、不缺项）
* - 检测完成：直接按 items 顺序展示真实结果；如无骨架定义则纯用 items
*/
function renderCategoryChildren({ category, items, running, categoryStatus }) {
	const skeleton = CATEGORY_SKELETON[category];
	const forceSkeleton = categoryStatus === "running";
	if (!running && skeleton == null) return items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItemRow, { result: item }, item.id));
	if (skeleton) {
		if (forceSkeleton) return skeleton.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonRow, {
			item: sk,
			running: true
		}, sk.id));
		const byId = new Map(items.map((it) => [it.id, it]));
		return skeleton.map((sk) => {
			const done = byId.get(sk.id);
			return done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItemRow, { result: done }, sk.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonRow, {
				item: sk,
				running
			}, sk.id);
		});
	}
	return items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItemRow, { result: item }, item.id));
}
var CategoryCard = ({ view, expanded, onToggle, network, running }) => {
	const useNetworkGroups = shouldUseNetworkGroups({
		isNetwork: view.category === SELF_CHECK_CATEGORY.network,
		network,
		running,
		itemCount: view.items.length
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `self-check-modal__card self-check-modal__card--${view.status} ${expanded ? "is-expanded" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "self-check-modal__card-header",
			onClick: onToggle,
			"aria-expanded": expanded,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "self-check-modal__card-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "self-check-modal__card-chevron",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 12 12",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M4 2l4 4-4 4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "self-check-modal__card-name",
					children: t(`selfCheck.category.${view.category}`)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-modal__card-right",
				children: view.badge.map((seg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `self-check-modal__badge self-check-modal__badge--${seg.tone}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: seg.text })
				}, i))
			})]
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "self-check-modal__card-body",
			children: useNetworkGroups ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "self-check-modal__nc-embed network-check-modal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewGroup, {
						running,
						result: network ?? null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetGroup, { result: network ?? null }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecksGroup, {
						running,
						result: network ?? null
					})
				]
			}) : renderCategoryChildren({
				category: view.category,
				items: view.items,
				running,
				categoryStatus: view.status
			})
		})]
	});
};
/**
* 骨架子项行（未检测状态展示）—— 与 CheckItemRow 布局完全一致，
* 但状态锁定为 running/pending 且无 summary/detail/advice。
*/
var SkeletonRow = ({ item, running }) => {
	const status = running ? "running" : "pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "self-check-modal__row",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "self-check-modal__row-main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "self-check-modal__row-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "self-check-modal__row-title",
					children: t(item.titleKey)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "self-check-modal__row-desc",
					children: t(item.descKey)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-modal__row-action",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `self-check-modal__badge self-check-modal__badge--${status}`,
					children: [getStatusIcon(status), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getStatusLabel(status) })]
				})
			})]
		})
	});
};
/**
* 单个检查项行 —— 布局对齐 network-check 的 Row / CheckRow：
* - 独立卡片（surface 背景 + 圆角）
* - 左侧：title + 主要描述（summary 优先，无则用 detail）
* - 右侧：badge（垂直居中对齐左侧标题）
* - 建议 advice 作为次要信息，卡片底部单独一行
*/
var CheckItemRow = ({ result }) => {
	const status = result.status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "self-check-modal__row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "self-check-modal__row-main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "self-check-modal__row-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__row-title",
						children: result.title
					}),
					result.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `self-check-modal__row-desc self-check-modal__row-desc--${status}`,
						children: result.summary
					}),
					result.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__row-detail",
						children: result.detail
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-check-modal__row-action",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `self-check-modal__badge self-check-modal__badge--${status}`,
					children: [getStatusIcon(status), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getStatusLabel(status) })]
				})
			})]
		}), result.advice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `self-check-modal__row-advice self-check-modal__row-advice--${status}`,
			children: ["💡 ", result.advice]
		})]
	});
};
var ReportGroup = ({ directory, fileName, filePath, canOpenDirectory, canRevealFile, canExport, onOpenDirectory, onRevealFile, onExport }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "self-check-modal__card self-check-modal__card--info is-expanded",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "self-check-modal__card-header self-check-modal__card-header--static",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "self-check-modal__card-left",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "self-check-modal__card-name",
				children: t("selfCheck.report.groupTitle")
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "self-check-modal__card-body",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "self-check-modal__row",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "self-check-modal__row-main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "self-check-modal__row-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__row-title",
						children: t("selfCheck.report.directoryLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__row-desc",
						children: directory ?? t("selfCheck.report.noReport")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "self-check-modal__row-action",
					children: directory && canOpenDirectory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "self-check-modal__link-btn",
						onClick: onOpenDirectory,
						children: t("selfCheck.report.open")
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "self-check-modal__row",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "self-check-modal__row-main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "self-check-modal__row-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__row-title",
						children: t("selfCheck.report.fileLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-check-modal__row-desc",
						children: fileName ?? t("selfCheck.report.noReport")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "self-check-modal__row-action",
					children: [canExport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "self-check-modal__link-btn",
						onClick: onExport,
						children: t("selfCheck.report.export")
					}), filePath && canRevealFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "self-check-modal__link-btn",
						onClick: onRevealFile,
						children: t("selfCheck.report.locate")
					})]
				})]
			})
		})]
	})]
});
function getStatusIcon(status) {
	switch (status) {
		case "pass": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {});
		case "fail": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleXIcon, {});
		case "running": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderIcon, { className: "self-check-modal__spin" });
		case "warning": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 12 12",
			fill: "currentColor",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 1.5l5.196 9H.804L6 1.5zm0 3.2L2.874 10h6.252L6 4.7zm-.65 1.9h1.3v2.1h-1.3V6.6zm0 2.6h1.3v1h-1.3v-1z" })
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingIcon, {});
	}
}
function getStatusLabel(status) {
	switch (status) {
		case "pass": return t("selfCheck.status.pass");
		case "warning": return t("selfCheck.status.warning");
		case "fail": return t("selfCheck.status.fail");
		case "info": return t("selfCheck.status.info");
		case "running": return t("selfCheck.status.running");
		default: return t("selfCheck.status.pending");
	}
}
function getReportDir(latestReportPath, latestReport) {
	const p = latestReportPath ?? latestReport?.path;
	if (!p) return null;
	return p.replace(/[/\\][^/\\]+$/, "");
}
function getReportFileName(latestReportPath, latestReport) {
	return latestReport?.name ?? (latestReportPath ? latestReportPath.split(/[/\\]/).pop() : void 0);
}
function getSubtitle(phase, results, error, checkInfo) {
	if (phase === "running") return t("selfCheck.subtitle.running");
	if (error) return t("selfCheck.subtitle.failed", { error });
	if (phase === "done" && checkInfo) return checkInfo;
	if (phase === "done" && results.length > 0) return t("selfCheck.subtitle.done");
	return t("selfCheck.subtitle.idle");
}
//#endregion
//#region ../../packages/agent-ui/src/components/self-check/self-check-modal-host.tsx
/**
* Host component for the Self-Check modal.
*
* Mounted once at the app root, subscribes to the modal store, and bridges
* host-side "open the modal" events (menu clicks) into the store.
*/
function SelfCheckModalHost({ adapter }) {
	const [fpsVisible, setFpsVisible] = (0, import_react.useState)(false);
	(0, import_react.useCallback)(() => setFpsVisible((current) => !current), []);
	(0, import_react.useCallback)(() => setFpsVisible(false), []);
	const enableFpsMonitor = false;
	(0, import_react.useEffect)(() => {
		if (!adapter.onOpenFromMenu) return;
		return adapter.onOpenFromMenu(async () => {
			const state = selfCheckStore.getState();
			if (adapter.getState) try {
				const savedState = await adapter.getState();
				state.hydrate({
					phase: savedState.phase,
					results: savedState.results,
					progress: savedState.progress,
					latestReportPath: savedState.latestReportPath,
					network: savedState.network ?? null,
					showFull: savedState.showFull,
					finishedAt: savedState.finishedAt,
					duration: savedState.duration
				});
			} catch {}
			state.open();
		});
	}, [adapter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelfCheckModal, {
		adapter,
		fpsControl: void 0
	}), enableFpsMonitor] });
}
//#endregion
export { SelfCheckModalHost };
