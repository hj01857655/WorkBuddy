import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $Z as init_mcp_server_loader, $k as init_skills, E1 as init_useI18n, EL as notifyMcpListRefresh, K2 as init_environment, O1 as useTranslation, T0 as init_app_core, TZ as init_connector, Yd as SKILLS_INSTALLED_ROUTE, ZZ as getMcpServersDeduped, Zd as init_skills_route, ad as init_common, d0 as useModuleHost, dt as init_definition, e4 as isWorkBuddyDesktop, f3 as wb, krt as Button, m5 as init_src, o$ as connectorStore, rA as countEnabledSkills, xL as notifySkillListRefresh } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ba as Tooltip, Bo as SkillsIcon, Ei as toast, Ev as require_react, Ho as ConnectorsIcon, Tv as require_jsx_runtime, U as Checkbox, hr as init_src$2, t as init_src$1 } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/modules/idle-capability/assets/caret-down.svg?raw
var import_react = /* @__PURE__ */ __toESM(require_react());
init_src$2();
init_src$1();
init_src();
init_useI18n();
init_skills_route();
var caret_down_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8.5523\" height=\"5.219\" viewBox=\"0 0 8.5523 5.219\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 -1 0.94281 4.27615)\" d=\"M-0.4714 2.8619L-0.9428 3.3333L0 4.2762L0.4714 3.8047L0 3.3333L-0.4714 2.8619ZM3.3333 0L3.8047 -0.4714L3.3333 -0.9428L2.8619 -0.4714L3.3333 0ZM6.1953 3.8047L6.6667 4.2762L7.6095 3.3333L7.1381 2.8619L6.6667 3.3333L6.1953 3.8047ZM0 3.3333L0.4714 3.8047L3.8047 0.4714L3.3333 0L2.8619 -0.4714L-0.4714 2.8619L0 3.3333ZM3.3333 0L2.8619 0.4714L6.1953 3.8047L6.6667 3.3333L7.1381 2.8619L3.8047 -0.4714L3.3333 0Z\"/></svg>";
//#endregion
//#region ../../packages/agent-ui/src/modules/idle-capability/context.tsx
init_common();
//#endregion
//#region ../../packages/agent-ui/src/modules/idle-capability/hooks/use-idle-capability-card.ts
var import_jsx_runtime = require_jsx_runtime();
function useIdleCapabilityCard(options) {
	const { facades } = useModuleHost();
	const facade = facades.idleCapability;
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [rows, setRows] = (0, import_react.useState)([]);
	const optionsRef = (0, import_react.useRef)(options);
	optionsRef.current = options;
	const refresh = (0, import_react.useCallback)(async () => {
		if (!facade) {
			setVisible(false);
			return;
		}
		try {
			const opts = optionsRef.current;
			const installed = await opts.getInstalled();
			const data = await facade.getIdleCardData(installed);
			if (!data || data.candidates.length === 0) {
				setVisible(false);
				setRows([]);
				return;
			}
			setRows(data.candidates.map((c) => ({
				type: c.type,
				id: c.id,
				idleDays: c.idleDays,
				lastUsedDate: c.lastUsedDate,
				displayName: opts.resolveDisplayName(c.type, c.id),
				checked: true
			})));
			setVisible(true);
		} catch (error) {
			console.warn("[IdleCapabilityCard] refresh failed:", error);
			setVisible(false);
		}
	}, [facade]);
	const toggleRow = (0, import_react.useCallback)((type, id) => {
		setRows((prev) => prev.map((r) => r.type === type && r.id === id ? {
			...r,
			checked: !r.checked
		} : r));
	}, []);
	const dismissAll = (0, import_react.useCallback)(async () => {
		if (!facade) {
			setVisible(false);
			return;
		}
		try {
			await facade.markShown();
		} catch {}
		setVisible(false);
	}, [facade]);
	const dismissGlobal = (0, import_react.useCallback)(async () => {
		if (!facade) {
			setVisible(false);
			return;
		}
		try {
			await facade.dismissGlobal();
		} catch {}
		setVisible(false);
	}, [facade]);
	(0, import_react.useEffect)(() => {
		if (options.autoLoadOnMount) refresh().catch(() => {});
	}, []);
	return {
		visible,
		rows,
		refresh,
		toggleRow,
		dismissAll,
		dismissGlobal
	};
}
//#endregion
//#region ../../packages/agent-ui/src/modules/idle-capability/components/idle-capability-card-host.tsx
/**
* 类型 → 行首线性图标（Issue #102437 按交互图，替代原先名称右侧的文字徽标）。
*
* 复用输入框「+」菜单（`cr-menu-item__icon`）里的同款图标，保证「技能 / 连接器」
* 在全端的视觉标识一致：
*   - skill  → SkillsIcon（魔法棒 + 闪烁）
*   - mcp / connector → ConnectorsIcon（链环）——MCP 与连接器同属"外部接入"语义
*   - subagent 当前不进候选（domain 侧 bucketKey('subagent') 返回 null），仍给一个兜底
*/
var TYPE_ICON = {
	skill: SkillsIcon,
	mcp: ConnectorsIcon,
	subagent: SkillsIcon,
	connector: ConnectorsIcon
};
/** 类型 → 无障碍标签。视觉上类型只由图标表达，读屏仍需要文字。 */
var TYPE_ARIA_LABEL = {
	skill: "Skill",
	mcp: "MCP",
	subagent: "Agent",
	connector: "Connector"
};
/**
* 「上次使用时间」列文案。
*
* Issue #102437：交互图这一列展示 `2026.05.12` 形式的日期。但真实数据里**大多数候选
* 没有使用记录**——一个装了却从没被模型调用过的能力，`usage-log.json` 里就没有它的
* entry，`lastUsedDate` 为空串（实测 23 个候选中 17 个如此）。这类能力同样属于「闲置」
* （功能本意是关掉不常用能力以省上下文），所以照常进候选，这一列显示「从未使用」。
*/
function formatLastUsed(row, t) {
	if (!row.lastUsedDate) return t("idleCapability.neverUsed");
	return row.lastUsedDate.replace(/-/g, ".");
}
/**
* 把 idleDays（≥0 的整数）转为相对时间文案，用于名称溢出时的 hover tooltip。
*   < 1   → 今天 / Today
*   < 30  → N 天前
*   < 365 → N 个月前
*   ≥ 365 → N 年前
*
* lastUsedDate 为空时（从未使用）→ 「从未使用」。
*/
function formatRelativeIdle(row, t) {
	if (!row.lastUsedDate) return t("idleCapability.neverUsed");
	const days = Math.max(0, Math.floor(row.idleDays));
	if (days < 1) return t("idleCapability.relative.today");
	if (days < 30) return t("idleCapability.relative.daysAgo", { n: days });
	if (days < 365) return t("idleCapability.relative.monthsAgo", { n: Math.floor(days / 30) });
	return t("idleCapability.relative.yearsAgo", { n: Math.floor(days / 365) });
}
var IdleRow = ({ row, onToggle, t }) => {
	const nameRef = import_react.useRef(null);
	const [overflowed, setOverflowed] = import_react.useState(false);
	const TypeIcon = TYPE_ICON[row.type];
	const handleMouseEnter = () => {
		const el = nameRef.current;
		if (!el) return;
		const next = el.scrollWidth > el.clientWidth + 1;
		if (next !== overflowed) setOverflowed(next);
	};
	const tooltipContent = overflowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "idle-capability-pill__tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "idle-capability-pill__tooltip-name",
			children: row.displayName
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "idle-capability-pill__tooltip-meta",
			children: t("idleCapability.lastUsedTooltip", { duration: formatRelativeIdle(row, t) })
		})]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: tooltipContent,
		placement: "right",
		delay: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "idle-capability-pill__list-row",
			onClick: onToggle,
			onMouseEnter: handleMouseEnter,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: row.checked,
					onChange: onToggle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, {
					className: "idle-capability-pill__list-icon",
					width: 16,
					height: 16,
					"aria-label": TYPE_ARIA_LABEL[row.type]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					ref: nameRef,
					className: "idle-capability-pill__list-name",
					children: row.displayName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "idle-capability-pill__list-date",
					children: formatLastUsed(row, t)
				})
			]
		})
	});
};
var IdleCapabilityCardHost = ({ getInstalled, resolveDisplayName, onDisableSelected, autoLoadOnMount = true }) => {
	const { environmentType, navigation } = useModuleHost();
	const t = useTranslation();
	const { visible, rows, toggleRow, dismissAll, dismissGlobal } = useIdleCapabilityCard({
		getInstalled,
		resolveDisplayName,
		autoLoadOnMount
	});
	const [busy, setBusy] = import_react.useState(false);
	const [detailOpen, setDetailOpen] = import_react.useState(false);
	if (environmentType === "cloud") return null;
	if (!visible || rows.length === 0) return null;
	/**
	* 说明文案里的「管理页」链接：跳转技能管理页。
	*
	* Issue #102437：`/skills` 是 canonical route（见 router/route-config.ts）。
	* 不调 dismissAll —— 用户只是去看看，卡片下次该弹还得弹。
	*
	* Issue #119937：改用 `SKILLS_INSTALLED_ROUTE`（带 `?tab=installed`）直达
	* 「我安装的」。裸 `/skills` 落在「技能推荐」页，用户看不到刚被关闭的技能，
	* 与 toast 文案「随时在管理页重新开启」的承诺不符。
	* 这正是 `constants/skills-route.ts` 注释里点过的坑（#108988 同类）：入口散落在
	* 多个模块，各写字面量必漏——本入口在 #102437 补功能时手写了 `'/skills'`，是
	* 又一处漏网。写入方一律引用该常量。
	*/
	const handleOpenManagePage = () => {
		navigation.navigate(SKILLS_INSTALLED_ROUTE);
	};
	/**
	* 一键关闭：只关**当前被勾选**的候选。
	*
	* Issue #102437（验收 4）：原实现按 `detailOpen` 分流——折叠态无条件关全部。
	* 但用户可以「展开详情 → 取消勾选几项 → 收起详情 → 点一键关闭」，此时
	* `detailOpen` 已回落为 false，被取消勾选的项会被误关。勾选态是用户意图的唯一
	* 事实来源，与详情面板开合无关，故始终按 checked 过滤。
	*/
	const handleDisableAll = async () => {
		if (busy) return;
		const targets = rows.filter((r) => r.checked).map((r) => ({
			type: r.type,
			id: r.id
		}));
		if (targets.length === 0) return;
		setBusy(true);
		await dismissAll();
		try {
			const disabledCount = await onDisableSelected?.(targets);
			const effective = typeof disabledCount === "number" ? disabledCount : targets.length;
			if (effective <= 0) {
				console.warn("[IdleCapabilityCardHost] disable produced no effect", targets.length);
				setBusy(false);
				return;
			}
			toast({
				message: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					t("idleCapability.closedToastPrefix", { count: effective }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "idle-capability-toast__manage-link",
						onClick: handleOpenManagePage,
						children: t("idleCapability.manageLink")
					}),
					t("idleCapability.closedToastSuffix")
				] }),
				type: "success",
				duration: 5e3
			});
		} catch (error) {
			console.warn("[IdleCapabilityCardHost] disable failed", error);
		}
		setBusy(false);
	};
	/** 不再提醒：永久关闭闲置弹窗。 */
	const handleNeverRemind = async () => {
		await dismissGlobal();
	};
	/** 详情态可见的关闭按钮：只记今日已展示，明天再来。 */
	const handleClose = () => {
		dismissAll().catch(() => {});
	};
	const selectedCount = rows.filter((r) => r.checked).length;
	if (detailOpen) {
		const allSelected = selectedCount === rows.length && rows.length > 0;
		const handleSelectAll = () => {
			rows.filter((r) => !r.checked).forEach((r) => toggleRow(r.type, r.id));
		};
		const handleDeselectAll = () => {
			rows.filter((r) => r.checked).forEach((r) => toggleRow(r.type, r.id));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "idle-capability-pill idle-capability-pill--detail",
			role: "region",
			"aria-label": t("idleCapability.ariaLabel"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "idle-capability-pill__close",
					onClick: handleClose,
					"aria-label": t("idleCapability.closeAriaLabel"),
					children: "✕"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "idle-capability-pill__title",
					children: t("idleCapability.title", {
						count: rows.length,
						days: 14
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "idle-capability-pill__body",
					children: [
						t("idleCapability.subtitlePrefix"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "idle-capability-pill__manage-link",
							onClick: handleOpenManagePage,
							children: t("idleCapability.manageLink")
						}),
						t("idleCapability.subtitleSuffix")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "idle-capability-pill__select-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "idle-capability-pill__select-count",
						children: t("idleCapability.selectedCount", { count: selectedCount })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "idle-capability-pill__list",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "idle-capability-pill__list-head",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: allSelected,
								onChange: allSelected ? handleDeselectAll : handleSelectAll
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "idle-capability-pill__list-head-name",
								children: t("idleCapability.columnTypeAndName")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "idle-capability-pill__list-head-date",
								children: t("idleCapability.columnLastUsed")
							})
						]
					}), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleRow, {
						row: r,
						onToggle: () => toggleRow(r.type, r.id),
						t
					}, `${r.type}:${r.id}`))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "idle-capability-pill__actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "idle-capability-pill__detail-link",
							onClick: () => setDetailOpen(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("idleCapability.collapseDetail") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "idle-capability-pill__detail-caret idle-capability-pill__detail-caret--up",
								"aria-hidden": "true",
								dangerouslySetInnerHTML: { __html: caret_down_default }
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "medium",
							onClick: () => {
								handleNeverRemind().catch(() => {});
							},
							disabled: busy,
							children: t("idleCapability.neverRemind")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "medium",
							loading: busy,
							onClick: () => {
								handleDisableAll().catch(() => {});
							},
							disabled: selectedCount === 0,
							children: busy ? t("idleCapability.disabling") : t("idleCapability.disableAll")
						})
					]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "idle-capability-pill",
		role: "region",
		"aria-label": t("idleCapability.ariaLabel"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "idle-capability-pill__close",
				onClick: handleClose,
				"aria-label": t("idleCapability.closeAriaLabel"),
				children: "✕"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "idle-capability-pill__title",
				children: t("idleCapability.title", {
					count: rows.length,
					days: 14
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "idle-capability-pill__body",
				children: [
					t("idleCapability.subtitlePrefix"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "idle-capability-pill__manage-link",
						onClick: handleOpenManagePage,
						children: t("idleCapability.manageLink")
					}),
					t("idleCapability.subtitleSuffix")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "idle-capability-pill__actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "idle-capability-pill__detail-link",
						onClick: () => setDetailOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("idleCapability.viewDetail") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "idle-capability-pill__detail-caret",
							"aria-hidden": "true",
							dangerouslySetInnerHTML: { __html: caret_down_default }
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "medium",
						onClick: () => {
							handleNeverRemind().catch(() => {});
						},
						disabled: busy,
						children: t("idleCapability.neverRemind")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						size: "medium",
						loading: busy,
						onClick: () => {
							handleDisableAll().catch(() => {});
						},
						disabled: selectedCount === 0,
						children: busy ? t("idleCapability.disabling") : t("idleCapability.disableAll")
					})
				]
			})
		]
	});
};
//#endregion
//#region ../../packages/agent-ui/src/modules/idle-capability/select-idle-skill-candidates.ts
init_environment();
init_app_core();
init_mcp_server_loader();
init_connector();
init_skills();
/**
* 某个技能是否由插件托管。
*
* `source === 'plugin'` 只认得出「插件根目录就是一个 skill」的布局（如 pptx / docx）。
* 插件更常见的是 `skills/<name>/SKILL.md` 子目录布局（如 find-skills / pdf /
* playwright-cli），那条路径复用通用目录扫描，`source` 会是 `'userSettings'`，与用户
* 自装技能完全无法区分——所以必须同时看 `pluginId`。
*/
function isPluginHostedSkill(skill) {
	return skill.source === "plugin" || !!skill.pluginId;
}
/**
* 切出可被一键关闭的技能候选。
*
* 排除：已禁用、builtin（随包分发）、插件托管（两种布局都算）、缺 ref / name 的脏数据。
*/
function selectIdleSkillCandidates(items) {
	const candidates = [];
	for (const skill of items) {
		if (skill.disableModelInvocation === true) continue;
		if (skill.source === "builtin") continue;
		if (isPluginHostedSkill(skill)) continue;
		if (!skill.ref || !skill.name) continue;
		candidates.push({
			id: skill.name.toLowerCase().trim(),
			displayName: skill.name,
			ref: skill.ref,
			installedAt: typeof skill.installedAt === "number" && Number.isFinite(skill.installedAt) ? skill.installedAt : void 0
		});
	}
	return candidates;
}
//#endregion
//#region ../../packages/agent-ui/src/modules/idle-capability/components/idle-capability-card-wrapper.tsx
/**
* IdleCapabilityCardWrapper · 自治宿主组件。
*
* 由 App.tsx 单点挂载（ConversationsContext.Provider 内层）。组件内部：
*   - 自己拉取 installed skills / mcp / connectors（skills 走 `wb.skills`）
*   - 自己拼装 displayName 解析器
*   - 自己处理 onDisableSelected
*   - 自己统计已启用技能数（Issue #102437 的「技能过多」触发门槛）
*
* 范围：本期 #41180 仅覆盖 skill / mcp / connector 三类（plugin skill 不进清理候选，
* 但计入 #102437 的已启用技能数门槛——它同样占模型上下文）。
*
* 短路条件：
*   - 非 workbuddy-desktop：直接渲染 null
*   - 缺少 facade：直接渲染 null（hook 内部也会 fail-safe）
*
* Issue #119937：移除原先的 `adapter` prop。它只被用作"运行时是否就绪"的非空判断，
* 所有业务调用早在 #102437 就已迁到 `wb.*`；而挂载点（App.tsx）的渲染条件本身已含
* `adapter &&`，组件内再判一次是冗余。留着它会让本模块同时依赖新旧两个 runtime owner
* （agent-ui 硬规则 R13），后续容易漂移。
*/
/**
* 拉取已安装 skills，一次调用同时产出候选集合与已启用总数。
*
* Issue #102437：从 `adapter.getSkillList()` 裸类型断言切到 `wb.skills.installed()`，
* 对齐 SDK 收敛方向（agent-ui 硬规则 R13：禁止在 adapter 上加/用业务方法）。
*
* 口径边界：`installed()` 在 SkillsRepo 内已过滤掉 `source === 'connector'` 与
* `userInvocable === false` 的技能，因此两个口径都不含这两类。对「技能过多」门槛来说
* 这是可接受的少计——阈值 80 本身是粗粒度信号，且这两类不由用户直接管理。
*/
async function fetchSkills() {
	try {
		const { items } = await wb.skills.installed({ global: false });
		if (!Array.isArray(items)) return {
			entries: [],
			enabledCount: 0
		};
		return {
			entries: selectIdleSkillCandidates(items),
			enabledCount: countEnabledSkills(items)
		};
	} catch {
		return {
			entries: [],
			enabledCount: 0
		};
	}
}
/** 内置 MCP server 名称，不应出现在闲置提示中 */
var BUILTIN_MCP_SERVER_NAMES = /* @__PURE__ */ new Set(["ardot"]);
async function fetchEnabledMcp() {
	try {
		const list = await getMcpServersDeduped(wb.mcp, { caller: "idle-card:bootstrap" });
		if (!Array.isArray(list)) return [];
		return list.filter((s) => {
			const x = s;
			if (x.disabled) return false;
			if (!x.configSource) return false;
			if (BUILTIN_MCP_SERVER_NAMES.has(x.name ?? "")) return false;
			return true;
		}).map((s) => {
			const x = s;
			return {
				id: (x.name ?? "").toLowerCase().trim(),
				runtimeId: s.id,
				displayName: x.displayName || x.description || x.name || ""
			};
		}).filter((m) => m.id);
	} catch {
		return [];
	}
}
function fetchEnabledConnectors() {
	try {
		const { mcpConnectorStates, mcpConnectorConfigs } = connectorStore.getState();
		const configMap = new Map(mcpConnectorConfigs.map((c) => [c.id, c]));
		return Object.entries(mcpConnectorStates).filter(([, state]) => state.connected === true).map(([id, state]) => {
			return {
				id,
				displayName: configMap.get(state.configId ?? id)?.name ?? id,
				mcpServerName: id
			};
		});
	} catch {
		return [];
	}
}
var IdleCapabilityCardWrapper = () => {
	const { facades } = useModuleHost();
	const facade = facades.idleCapability;
	const enabled = isWorkBuddyDesktop() && !!facade;
	const installedCacheRef = import_react.useRef({
		skills: [],
		mcps: [],
		connectors: []
	});
	const getInstalled = (0, import_react.useCallback)(async () => {
		const [skillResult, mcps] = await Promise.all([fetchSkills(), fetchEnabledMcp()]);
		const skills = skillResult.entries;
		const connectors = fetchEnabledConnectors();
		installedCacheRef.current = {
			skills,
			mcps,
			connectors
		};
		const dedupe = (vals) => {
			const seen = /* @__PURE__ */ new Set();
			for (const v of vals) {
				if (!v) continue;
				const norm = v.toLowerCase().trim();
				if (norm) seen.add(norm);
			}
			return [...seen];
		};
		const connectorServerNames = new Set(connectors.map((c) => c.mcpServerName?.toLowerCase().trim()).filter((v) => !!v));
		const mcpIds = mcps.flatMap((m) => [m.id, m.displayName]).filter((v) => !!v).map((v) => v.toLowerCase().trim()).filter((v) => v && !connectorServerNames.has(v));
		const skillInstalledAt = {};
		const rememberSkillInstalledAt = (id, installedAt) => {
			if (!id || typeof installedAt !== "number" || !Number.isFinite(installedAt)) return;
			const norm = id.toLowerCase().trim();
			if (!norm) return;
			skillInstalledAt[norm] = Math.max(skillInstalledAt[norm] ?? 0, installedAt);
		};
		for (const skill of skills) {
			rememberSkillInstalledAt(skill.id, skill.installedAt);
			rememberSkillInstalledAt(skill.displayName, skill.installedAt);
		}
		return {
			skills: dedupe(skills.flatMap((s) => [s.id, s.displayName])),
			mcps: dedupe(mcpIds),
			subagents: [],
			connectors: dedupe([...connectorServerNames]),
			skillInstalledAt,
			enabledSkillCount: skillResult.enabledCount
		};
	}, []);
	const resolveDisplayName = (0, import_react.useCallback)((type, id) => {
		const cache = installedCacheRef.current;
		const matchAny = (list) => list.find((x) => x.id === id || x.displayName.toLowerCase().trim() === id);
		if (type === "skill") return matchAny(cache.skills)?.displayName ?? id;
		if (type === "mcp") return matchAny(cache.mcps)?.displayName ?? id;
		if (type === "connector") return cache.connectors.find((c) => c.mcpServerName?.toLowerCase().trim() === id || c.id === id)?.displayName ?? id;
		return id;
	}, []);
	const onDisableSelected = (0, import_react.useCallback)(async (items) => {
		if (items.length === 0) return 0;
		const cache = installedCacheRef.current;
		const findEntry = (list, id) => list.find((x) => x.id === id || x.displayName.toLowerCase().trim() === id);
		const skillsToDisable = items.filter((it) => it.type === "skill").map((it) => findEntry(cache.skills, it.id)).filter((v) => !!v);
		const mcpToDisable = items.filter((it) => it.type === "mcp").map((it) => findEntry(cache.mcps, it.id)).filter((v) => !!v);
		const connectorsToDisable = items.filter((it) => it.type === "connector").map((it) => cache.connectors.find((c) => c.mcpServerName?.toLowerCase().trim() === it.id || c.id === it.id)).filter((v) => !!v);
		const tasks = [];
		let effectiveCount = 0;
		if (skillsToDisable.length > 0) tasks.push(wb.skills.batchToggle({
			refs: skillsToDisable.map((s) => s.ref),
			disable: true
		}).then((result) => {
			if (result.failed.length > 0) console.warn("[IdleCapabilityCardWrapper] batchToggle partial failure", result.failed);
			effectiveCount += result.succeeded.length;
		}).catch((err) => {
			console.warn("[IdleCapabilityCardWrapper] batchToggle failed", err);
		}));
		if (mcpToDisable.length > 0) tasks.push(...mcpToDisable.map((m) => wb.mcp.setEnabled(m.runtimeId, false).then((result) => {
			if (!result.ok) throw new Error(result.message);
			effectiveCount += 1;
		}).catch((err) => {
			console.warn("[IdleCapabilityCardWrapper] toggleMcpServer failed", m.id, err);
		})));
		if (connectorsToDisable.length > 0) try {
			const { disconnectMcpConnector } = connectorStore.getState();
			tasks.push(...connectorsToDisable.map((c) => disconnectMcpConnector(c.id).then(() => {
				effectiveCount += 1;
			}).catch((err) => {
				console.warn("[IdleCapabilityCardWrapper] disconnectMcpConnector failed", c.id, err);
			})));
		} catch (err) {
			console.warn("[IdleCapabilityCardWrapper] connectorStore unavailable", err);
		}
		await Promise.allSettled(tasks);
		notifySkillListRefresh();
		notifyMcpListRefresh();
		return effectiveCount;
	}, []);
	const cardProps = (0, import_react.useMemo)(() => ({
		getInstalled,
		resolveDisplayName,
		onDisableSelected
	}), [
		getInstalled,
		resolveDisplayName,
		onDisableSelected
	]);
	if (!enabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleCapabilityCardHost, {
		...cardProps,
		autoLoadOnMount: true
	});
};
//#endregion
//#region ../../packages/agent-ui/src/modules/idle-capability/index.ts
init_definition();
//#endregion
export { IdleCapabilityCardWrapper };
