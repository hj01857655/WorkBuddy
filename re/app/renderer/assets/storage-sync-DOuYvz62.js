import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Eb as logger, Tn as normalizeLeafChildrenToRecordIds, lb as domainConfig, pb as dom, wn as isFormattedTreeNode, zv as init_es } from "./smartsheet-context-BgZsCXEw.js";
import { J as init_feature_single, K as BaseFeature, Wt as init_es$1 } from "./canvas-view-f1b9di0c.js";
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/grid/collector/interface.js
var RowType;
var init_interface = __esmMin((() => {
	(function(RowType) {
		RowType["Spacing"] = "Spacing";
		RowType["Stat"] = "Stat";
		RowType["GroupHead"] = "GroupHead";
		RowType["GroupFoot"] = "GroupFoot";
		RowType["Record"] = "Record";
		RowType["RecordRange"] = "RecordRange";
		RowType["RecordAdd"] = "RecordAdd";
		RowType["GroupAdd"] = "GroupAdd";
		RowType["GroupStat"] = "GroupStat";
	})(RowType || (RowType = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/grid/utils/string-group-path.js
var stringifyGroupPath;
var init_string_group_path = __esmMin((() => {
	stringifyGroupPath = (groupPath) => {
		if (!groupPath || groupPath.length === 1 && groupPath[0] === null) return JSON.stringify(null);
		return String(groupPath);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/shared/sub-tree/flatten.js
/**
* 把 ISubNode 树按 DFS 顺序平铺为 `Map<recordId, SubTreeRowMeta>`。
*
* 算法关键不变量：
*   维护两个并行栈，栈底=顶层根方向，栈顶=最深节点方向，长度始终一致：
*   - `ancestorPath: string[]`：路径上每一层的 recordId（含当前节点 N 自身那一帧）；
*   - `pipeStack: boolean[]`：与 ancestorPath 同长，第 i 项 = 「ancestorPath[i] 在自己父中是否非末位」。
*     顶层根没有父，pipeStack[0] 仍按其在 roots 数组中的末位标志编码，但不会被任何后代读取。
*
* 进入节点 N（已知 N 在父中的 `isLastSibling`）时：
*   - **先**把"自己"入栈：ancestorPath push N.recordId；pipeStack push !isLastSibling；
*   - level = ancestorPath.length - 1（= 不含自身那一帧之前的祖先数；也是 N 的层级，
*     顶层根=0）；
*   - pipeAncestors / ancestorIds 长度 = level；
*   - 对每个 k ∈ [0, level)：
*       pipeAncestors[k] = pipeStack[level - k]
*         · k=0 → 栈顶（N 自身那一帧）→ N 在直接父中是否非末位，决定 N 直接父对应缩进列；
*         · k=level-1 → pipeStack[1]（顶层根的下一级那一帧）→ 决定顶层根对应缩进列。
*       ancestorIds[k] = ancestorPath[level - 1 - k] （k=0→直接父，k=level-1→顶层根）。
*   - 递归访问 children。
*   - 结束后弹出 ancestorPath / pipeStack 自身那一帧。
*
* 缩进列编号约定：第 k 列（k 从 0 起）对应 N 的第 k+1 层祖先（k=0 即距 N 最近的祖先=直接父）。
*
* 例：例二中 r5 的 pipeAncestors = [false, false, true]：
*   · 列 0（直接父 r3）：r5 是 r3.children 末位 → 不画（L 拐角）；
*   · 列 1（祖父 r2）：r3 是 r2.children 末位 → 不画；
*   · 列 2（顶层根 r1）：r2 是 r1.children[0] 非末位 → 画 │（跨层连线）。
*
* 字符串元素视为"无 children 的叶子节点"。
* 环保护：visited Set；遇环 warn 并跳过该节点（不递归其 children）。
* 复杂度：O(N)（N 为节点总数）。
*/ function flattenSubTree(roots) {
	var result = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var ancestorPath = [];
	var pipeStack = [];
	function visit(node, isLastSibling, topLevelIndex) {
		var recordId = typeof node === "string" ? node : node.recordId;
		if (visited.has(recordId)) {
			logger.warn(LOGGER_TAG, `cycle detected at record ${recordId}; skip`);
			return;
		}
		visited.add(recordId);
		ancestorPath.push(recordId);
		pipeStack.push(!isLastSibling);
		var level = ancestorPath.length - 1;
		var ancestorIdsForRow = new Array(level);
		var pipeAncestors = new Array(level);
		for (var k = 0; k < level; k++) {
			ancestorIdsForRow[k] = ancestorPath[level - 1 - k];
			pipeAncestors[k] = pipeStack[level - k];
		}
		var children = typeof node === "string" ? [] : node.children;
		var hasChildren = children.length > 0;
		result.set(recordId, {
			level,
			topLevelIndex,
			ancestorIds: ancestorIdsForRow,
			hasChildren,
			childrenCount: children.length,
			isLastChild: isLastSibling,
			pipeAncestors
		});
		if (hasChildren) for (var i = 0; i < children.length; i++) visit(children[i], i === children.length - 1, topLevelIndex);
		pipeStack.pop();
		ancestorPath.pop();
	}
	for (var i = 0; i < roots.length; i++) visit(roots[i], i === roots.length - 1, i);
	return result;
}
/**
* 依据「被折叠父记录 id 集合」过滤 recordIds：
* 若某个 recordId 的任一祖先 ∈ foldedIds，则该 recordId 被剔除。
* 父记录自身即使在 foldedIds 中也保留（因为需要展示折叠按钮）。
*
* - foldedIds 为空或未启用父子记录（subTreeMeta 为空）时直接返回原数组，零开销；
* - 命中折叠时返回过滤后的新数组，不修改入参。
*
* 抽为纯函数，供 grid / grid-list 两侧的 collector `DataUtil` 共享。
*/ function filterFoldedSubTreeRecordIds(recordIds, foldedIds, subTreeMeta) {
	if (foldedIds.size === 0 || subTreeMeta.size === 0) return recordIds;
	return recordIds.filter((recordId) => {
		var meta = subTreeMeta.get(recordId);
		if (!meta || meta.ancestorIds.length === 0) return true;
		for (var ancestorId of meta.ancestorIds) if (foldedIds.has(ancestorId)) return false;
		return true;
	});
}
var LOGGER_TAG;
var init_flatten = __esmMin((() => {
	init_es();
	LOGGER_TAG = "sub-tree";
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/shared/sub-tree/move-derive.js
/**
* 计算某个记录间隙 (prev, next) 下的候选新父深度区间。
*
* @param prevRecordId    间隙上一条 record id（禁止继承时应传 undefined）
* @param nextRecordId    间隙下一条 record id（禁止继承时应传 undefined）
* @param allowSubTreeInherit 是否允许从 prev/next 继承父子链
* @param collector
*/ function computeDropParentDepthRange(prevRecordId, nextRecordId, allowSubTreeInherit, collector) {
	if (!allowSubTreeInherit) return {
		lowerDepth: 0,
		upperDepth: 0
	};
	var prevLevel = getRecordLevel(prevRecordId, collector);
	var nextLevel = getRecordLevel(nextRecordId, collector);
	return {
		lowerDepth: nextRecordId !== void 0 && nextLevel !== void 0 ? nextLevel : 0,
		upperDepth: prevRecordId !== void 0 && prevLevel !== void 0 ? prevLevel + 1 : 0
	};
}
/**
* 根据用户指定的"目标父深度"和落点前后 record，反查目标父 record id。
*
* 反查规则（与 {@link DropParentDepthRange} 语义一致：upperDepth = prev.level + 1）：
* - `targetDepth === 0`：目标父 = null（顶层）；
* - 优先用 prev 侧反查（祖先链完整）：
*   - `targetDepth === level(prev) + 1` → 新父 = prev 本身（成为 prev 的最后一个子）；
*   - `targetDepth <= level(prev)` → 从 prev 沿祖先链回退到深度 = `targetDepth - 1` 的祖先
*     （例如 prev=a3(L1)、targetDepth=1 → 新父 = a3.parent = a）。
* - prev 侧未命中时用 next 侧回退（少见分支，仅在 lowerDepth 单点区间且 prev 缺失时用）；
*
* 环检查（自身/后代作为父）交由 `isDescendantOrSelf` 在 apply 阶段兜底，这里只做几何反查。
*/ function resolveTargetParentIdByDepth(targetDepth, prevRecordId, nextRecordId, collector) {
	if (targetDepth <= 0) return null;
	var viaPrev = resolveTargetParentByPrev(targetDepth, prevRecordId, collector);
	if (viaPrev !== void 0) return viaPrev;
	return resolveTargetParentByNext(targetDepth, nextRecordId, collector);
}
/**
* 从 `prev` 侧反查目标父：
* - 返回 `undefined` 表示 prev 缺失或深度超出 prev 侧可反查范围（调用方需回退到 next 侧）。
* - 返回 `RecordId | null` 表示命中。
*
* 分支：
* - `targetDepth === prevLevel + 1` → 新父 = prev 本身（作 prev 的子）。与 `computeDropParentDepthRange`
*   的 `upperDepth = prev.level + 1` 严格对应。
* - `targetDepth <= prevLevel` → 深度 D 的祖先在 `ancestorIds[prevLevel - D]`（ancestorIds[0] 是 prev
*   的直接父）。
*/ function resolveTargetParentByPrev(targetDepth, prevRecordId, collector) {
	var _a, _b;
	if (!prevRecordId) return void 0;
	var prevMeta = collector.dataUtil.getSubTreeRowMeta(prevRecordId);
	var prevLevel = (_a = prevMeta === null || prevMeta === void 0 ? void 0 : prevMeta.level) !== null && _a !== void 0 ? _a : 0;
	if (targetDepth === prevLevel + 1) return prevRecordId;
	if (targetDepth <= prevLevel && prevMeta) return (_b = prevMeta.ancestorIds[prevLevel - targetDepth]) !== null && _b !== void 0 ? _b : null;
}
/**
* 从 `next` 侧反查目标父：一般在 prev 侧无法命中（缺失或深度更浅）时才走到。
*/ function resolveTargetParentByNext(targetDepth, nextRecordId, collector) {
	var _a, _b, _c;
	if (!nextRecordId) return null;
	var nextMeta = collector.dataUtil.getSubTreeRowMeta(nextRecordId);
	var nextLevel = (_a = nextMeta === null || nextMeta === void 0 ? void 0 : nextMeta.level) !== null && _a !== void 0 ? _a : 0;
	if (!nextMeta) return null;
	if (targetDepth === nextLevel) return (_b = nextMeta.ancestorIds[0]) !== null && _b !== void 0 ? _b : null;
	if (targetDepth < nextLevel) return (_c = nextMeta.ancestorIds[nextLevel - 1 - targetDepth]) !== null && _c !== void 0 ? _c : null;
	return null;
}
/**
* 取 record 的 subTree 深度（顶层=0）；record 不在 subTreeMeta 中时返回 undefined（表示"未启用父子"或不存在）。
*/ function getRecordLevel(recordId, collector) {
	var _a, _b;
	if (!recordId) return void 0;
	return (_b = (_a = collector.dataUtil.getSubTreeRowMeta(recordId)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0;
}
/**
* 计算被拖 record 子树的**相对高度**：自身记 0，最深后代与自身的 level 差。
*
* 用途：拖拽落点会把整棵子树一起搬走，最终最深层级 = `dropParentDepth（被拖 record 的新 level）+ 子树相对高度`。
* 交互侧据此判定是否会突破 {@link MAX_SUB_TREE_LEVEL}。
*
* 实现：父子记录在扁平视图始终完整平铺（折叠 icon 仅占位、不真正隐藏后代），因此遍历
* `displayedRecordIds` 并用 `ancestorIds.includes(movingRecordId)` 命中所有后代即可，无遗漏。
* 子树在一次拖拽期间不变，调用方只需在 mousedown 计算一次。
*/ function computeMovingSubTreeHeight(movingRecordId, collector) {
	var _a, _b;
	var movingLevel = (_b = (_a = collector.dataUtil.getSubTreeRowMeta(movingRecordId)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0;
	var maxDescendantLevel = movingLevel;
	for (var recordId of collector.dataUtil.getDisplayedRecordIds()) {
		var meta = collector.dataUtil.getSubTreeRowMeta(recordId);
		if (!meta) continue;
		if (meta.ancestorIds.includes(movingRecordId) && meta.level > maxDescendantLevel) maxDescendantLevel = meta.level;
	}
	return maxDescendantLevel - movingLevel;
}
/**
* 从一条 record 上取父子字段（`view.getSubTreeFieldId()`）的当前 parentId（RecordId | null）。
*
* LINK_RECORDS 单元格值语义：`RecordId[] | null`。父子字段虽然是"单值"关联，但底层仍是数组，
* 空关联时可能是 null / 空数组 / 空 cell，统一收敛为 null。
*/ function readParentIdOfRecord(recordId, subTreeFieldId, collector) {
	var _a, _b;
	if (!recordId) return null;
	var table = collector.dataUtil.getCurrentTable();
	if (!table) return null;
	var cell = table.getCell(recordId, subTreeFieldId);
	var value = (_a = cell === null || cell === void 0 ? void 0 : cell.value) !== null && _a !== void 0 ? _a : null;
	if (!value || value.length === 0) return null;
	return (_b = value[0]) !== null && _b !== void 0 ? _b : null;
}
/**
* 根据落点前后两条 record 的 parentId 推导「被拖 record 的新父 id」。
*
* 规则（与用户约定的父子记录同步语义严格一致）：
* - 若 `next` 存在且有父 → newParent = next.parent（例：拖到 A/A1 之间，next=A1 的父是 A，则新父=A）；
* - 否则若 `prev` 存在且有父 → newParent = prev.parent（例：拖到 A3/B 之间，prev=A3 的父是 A，仍归为 A 的子）；
* - 否则 → null（拖到两条无父的 record 之间，或列表末尾/首位）。
*
* 反向语义（用户特别强调）：拖到没有父子关系的两个 record 之间时，`prev.parent === null && next.parent === null`
* → newParent = null，即"移除被拖记录的父记录"，与本推导自然吻合。
*/ function deriveNewParentId(prevRecordId, nextRecordId, movingRecordId, subTreeFieldId, collector) {
	var nextParent = readParentIdOfRecord(nextRecordId, subTreeFieldId, collector);
	if (nextParent) {
		if (nextParent === movingRecordId) return null;
		return nextParent;
	}
	var prevParent = readParentIdOfRecord(prevRecordId, subTreeFieldId, collector);
	if (prevParent) {
		if (prevParent === movingRecordId) return null;
		return prevParent;
	}
	return null;
}
/**
* 判断 `candidateParentId` 是否是 `movingRecordId` 的自身或后代。
*
* 用于阻止「把父记录挪到自己的子孙区间」造成的父子环。走 `subTreeMeta.ancestorIds` 反查最简单：
* 若 candidate 的祖先链上有 moving，则 candidate 是 moving 的后代。moving 本身也算 → 不允许。
*/ function isDescendantOrSelf(candidateParentId, movingRecordId, collector) {
	if (!candidateParentId) return false;
	if (candidateParentId === movingRecordId) return true;
	var meta = collector.dataUtil.getSubTreeRowMeta(candidateParentId);
	if (!meta) return false;
	return meta.ancestorIds.includes(movingRecordId);
}
/**
* 解析被拖 record 的「最终新父 id」。
*
* - 视图未启用父子字段（无 `subTreeFieldId`）→ 恒为 `null`（不可能成为子记录）。
* - `forcedNewParentId` 非 `undefined` 时优先采用（`null` = 强制顶层）；否则按 prev/next 隐式推导。
* - 统一经 `isDescendantOrSelf` 环检查兜底：命中则退回 `null`（顶层），避免自引用 / 成环。
*
* 供「父子字段同步」({@link buildSubTreeParentEntry}) 与「是否作为子记录落入」(决定是否改写分组字段)
* 两处共用同一套判定，保证二者结论一致。
*/ function resolveFinalNewParentId(movingRecordId, prevRecordId, nextRecordId, subTreeFieldId, collector, forcedNewParentId) {
	if (!subTreeFieldId) return null;
	var newParentId = forcedNewParentId !== void 0 ? forcedNewParentId : deriveNewParentId(prevRecordId, nextRecordId !== null && nextRecordId !== void 0 ? nextRecordId : void 0, movingRecordId, subTreeFieldId, collector);
	if (isDescendantOrSelf(newParentId, movingRecordId, collector)) newParentId = null;
	return newParentId;
}
/**
* 「父子字段同步」子步骤：视图挂了 subTreeFieldId 且推导出的新父与当前不同时，返回 `{ fieldId, cellValue }`；
* 否则返回 null（无需写父子字段）。
*
* @param subTreeFieldId 视图父子字段 id（`view.getSubTreeFieldId()`），未启用时传 null。
*/ function buildSubTreeParentEntry(movingRecordId, prevRecordId, nextRecordId, subTreeFieldId, collector, forcedNewParentId) {
	if (!subTreeFieldId) return null;
	var currentParentId = readParentIdOfRecord(movingRecordId, subTreeFieldId, collector);
	var newParentId = resolveFinalNewParentId(movingRecordId, prevRecordId, nextRecordId, subTreeFieldId, collector, forcedNewParentId);
	if (newParentId === currentParentId) return null;
	return {
		fieldId: subTreeFieldId,
		cellValue: newParentId ? [newParentId] : null
	};
}
/**
* 用水平位移 `dx` 在候选深度区间 `[lowerDepth, upperDepth]` 内取档。
*
* ## 心智模型：默认最深、向左退层
*
* "拖到 X 下方"的最常见预期是"作为 X 的子记录"，因此：
* - **默认档 = `upperDepth`**（即 `prev.level + 1`，表示"作 prev 的子"）；
* - `dx` 每向左 `indent` → 退一层；
* - `dx > 0` 不再增深（已经在最深档 `upperDepth`，多余的右移被上限 clamp）；
* - 最终 clamp 到 `[lowerDepth, upperDepth]`。
*
* ## `dx` 的语义（自 2026-07 起）：鼠标 X 相对 upperDepth 基线的偏移
*
* 早期实现里 `dx = mouseMoveX - mouseDownX`（相对拖拽起点的位移）。这在**起点靠右**时会
* 严重不友好——例如按住行右半部分往下拖，鼠标 X 距最深档基线本身已经右偏几十像素，要退到顶层
* 需要往左移出画布，用户实测"根本触发不到顶层"。
*
* 现在调用方传入的 `dx` 语义改为**鼠标当前 X 相对 upperDepth 基线 X 的偏移**：
*   dx = mouseMoveX - baselineX(upperDepth)
* 其中 `baselineX(d)` 是深度 d 对应的缩进基线（视觉上就是父高亮框 / 落位横线的左端）。这样：
* - 鼠标停在最深档的缩进基线上 → dx≈0 → 取 `upperDepth`，与视觉严格对齐；
* - 鼠标向左移一格 `indent` → dx≈-indent → 退一层；
* - 起点在哪里不影响判定，仅当前位置决定档位。
*
* 函数内部的数学不变（`depthDown = round(-dx / indent)`），只是 `dx` 的物理含义换了。因此
* 老注释里"向左拖每 indent 一格"改为"鼠标 X 每向左偏离基线 indent 一格"，语义等价但更贴合
* 用户实际体验。
*
* ## 为什么"默认最深"而不是"以 sourceLevel 为基准"
*
* 旧公式 `target = sourceLevel + steps` 对被拖记录是**顶层（sourceLevel=0）**、落点在**深层子**下方
* 的场景很不友好：例如把顶层 X 拖到 depth=1 的 999 下方，upperDepth=2（作 999 的子），要触发这一档
* 得向右拖 2 * indent 才能命中——用户实测"几乎永远命中顶层，作 999 的子这个最常见预期反而拖不出来"。
*
* 反过来看"拖到 X 下方 → 默认作 X 的子"更符合业内共识（Notion / Airtable / 微信文档表格），也让
* 反向操作（"我不想作 X 的子，就左拖退一格"）成为主动、可预测的动作。
*
* ## 边界
*
* - 单点区间（`upperDepth <= lowerDepth`）：由调用方直接采用，不进本函数；
* - `indent <= 0`：退化为返回 `upperDepth`（默认档），避免除零；
* - `dx > 0`：clamp 到 `upperDepth`，不会越出上限；
* - `dx < -(upperDepth - lowerDepth) * indent`：clamp 到 `lowerDepth`，不会越出下限。
*
* ## 场景验证（indent 假设 16 px，dx 为"鼠标相对 upperDepth 基线"）
*
* - **case A**：X(L0) 拖到 999(L1) 下方，区间 [0, 2]，upperDepth 基线 = 999 首列内容缩进后的左端。
*   - dx=0（鼠标就停在 999 的缩进基线上） → target = 2 → 作 999 的子 ✓
*   - dx=-16（鼠标左移一格） → target = 1 → 与 999 同级 ✓
*   - dx=-32（鼠标左移两格） → target = 0 → 顶层 ✓
* - **case B**：a3(L1) 拖到 a1(L1)/a2(L1) 之间，区间 [1, 2]。
*   - dx=0 → target = 2 → 作 a1 的子；想保持同级则鼠标左移 16px。
*
* @param lowerDepth 候选区间下限（由 `computeDropParentDepthRange` 给出）
* @param upperDepth 候选区间上限（由 `computeDropParentDepthRange` 给出）
* @param dx         `mouseMoveX - baselineX(upperDepth)`，正右负左；参见上文语义说明
* @param indent     单级缩进宽度（一般为 `collector.size.subIndentWidth`）
*/ function pickDropParentDepthByDragDx(lowerDepth, upperDepth, dx, indent) {
	if (upperDepth <= lowerDepth) return lowerDepth;
	if (indent <= 0) return upperDepth;
	return upperDepth - (dx < 0 ? Math.min(upperDepth - lowerDepth, Math.round(-dx / indent)) : 0);
}
/**
* 用鼠标**绝对 X** 在候选深度区间 `[lowerDepth, upperDepth]` 内取档。
*
* ## 与 {@link pickDropParentDepthByDragDx} 的取舍
*
* 早期实现（`pickDropParentDepthByDragDx`）以 `upperDepth` 为默认档、按 `dx = mouseX -
* baselineX(upperDepth)` 做 `round(-dx/indent)` 退层。它在**深层拖拽默认作 prev 的子**这个场景上
* 直觉最好，但存在两个死角：
*   1. 起点靠右 / 拖影紧贴鼠标时，向左退到顶层需要巨大位移；
*   2. 用户按缩进"眼睛看到哪条虚线就命中哪一档"的自然预期无法满足——
*      因为 `round(-dx/indent)` 是相对 upperDepth 基线的取整，不是绝对 X 的分段。
*
* 本函数换用**绝对 X 分段**：每一档 `d ∈ [lowerDepth, upperDepth]` 对应缩进虚线 X `baselineXAt(d)`
* （由视图侧提供，一般就是"渲染在屏幕上的祖先竖线 / 缩进虚线的左端 X"）。分段规则：
*
* ```
*   mouseX < baselineXAt(lowerDepth+1)                     → target = lowerDepth
*   baselineXAt(k) ≤ mouseX < baselineXAt(k+1) (k ∈ [L+1,U-1]) → target = k
*   mouseX ≥ baselineXAt(upperDepth)                       → target = upperDepth
* ```
*
* 视觉直觉：**鼠标停在哪一列缩进虚线右侧，就成为对应层级的子记录**。图示（区间 [0, 4]）：
*
* ```
*   ←顶层→ | ←作 L0 父的子→ | ←作 L1 父的子→ | ←作 L2 父的子→ | ←作 L3 父的子（最深）→
*       baselineX(1)     baselineX(2)     baselineX(3)     baselineX(4)
* ```
*
* 之所以下沉到 shared：grid（原生画布）与 grid-list（wb 拖影）视图都会用到，仅"每层基线 X"的
* 计算不同；用回调注入避免耦合视图坐标系。
*
* ## 边界
*
* - 单点区间（`upperDepth <= lowerDepth`）：直接返回 `lowerDepth`；
* - 遍历时若 `baselineXAt(d)` 返回非有限值（NaN/Infinity），视为该档不可达，就地截断（保守：
*   返回上一档命中的深度），避免异常传入把结果错落到区间上限。
*
* @param lowerDepth 候选区间下限（由 {@link computeDropParentDepthRange} 给出）
* @param upperDepth 候选区间上限（由 {@link computeDropParentDepthRange} 给出）
* @param mouseX     鼠标当前 X（与 `baselineXAt` 同坐标系；一般是行内容坐标系，未含 scrollLeft）
* @param baselineXAt 深度 → 该深度对应缩进基线 X 的映射；由视图侧提供，仅在 `depth >= 1` 处调用
*/ function pickDropParentDepthByMouseX(lowerDepth, upperDepth, mouseX, baselineXAt) {
	if (upperDepth <= lowerDepth) return lowerDepth;
	var target = lowerDepth;
	for (var d = lowerDepth + 1; d <= upperDepth; d++) {
		var baselineX = baselineXAt(d);
		if (!Number.isFinite(baselineX)) break;
		if (mouseX >= baselineX) target = d;
		else break;
	}
	return target;
}
var init_move_derive = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/shared/sub-tree/index.js
var init_sub_tree = __esmMin((() => {
	init_flatten();
	init_move_derive();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/grid/collector/structure/helpers/run-group.js
function runGroupTree(status, state, dataUtil, rowInfos, handler, trees, level, parent = { headIndex: -1 }) {
	var _a;
	var treeLength = trees.length;
	var parentGroup = parent.group;
	var parentHeadIndex = parent.headIndex;
	var isEndRecordTree = false;
	var recordRangeStartIndex = -1;
	var recordRangeLength = 0;
	var firstTree = trees[0];
	if (typeof firstTree === "string" || firstTree !== void 0 && !isFormattedTreeNode(firstTree)) {
		var rawRecordIds = normalizeLeafChildrenToRecordIds(trees);
		var recordIds = dataUtil.filterFoldedSubTreeRecordIds(rawRecordIds, state.getFoldSubTreeRecordIds());
		recordRangeStartIndex = handler(RowType.RecordRange, parentHeadIndex, { recordIds });
		recordRangeLength = recordIds.length;
		isEndRecordTree = true;
	} else trees.forEach((tree, index) => {
		if (typeof tree !== "object" || !isFormattedTreeNode(tree)) return;
		var currentLevel = tree.level || level;
		var groupFieldId = tree.field.getId();
		var groupHeadIndex = handler(RowType.GroupHead, parentHeadIndex, {
			level: currentLevel,
			headInfo: {
				groupValue: tree.value,
				count: tree.count,
				path: tree.path,
				fold: state.isGroupFold(tree.path)
			}
		});
		if (tree.children.length) runGroupTree(status, state, dataUtil, rowInfos, handler, tree.children, currentLevel, {
			treeLength,
			group: groupFieldId,
			treeIndex: index,
			headIndex: groupHeadIndex
		});
	});
	if (isEndRecordTree) {
		var recordAddIndex = handler(RowType.RecordAdd, parentHeadIndex);
		setGroupHeadStickyEnd(rowInfos, parentHeadIndex, recordAddIndex !== -1 ? recordAddIndex : recordRangeStartIndex + recordRangeLength - 1);
	} else if (parentGroup) setGroupHeadStickyEnd(rowInfos, parentHeadIndex, handler(RowType.GroupFoot, parentHeadIndex));
	if (!((parent.treeLength && parent.treeLength - 1) === parent.treeIndex)) {
		handler(RowType.Spacing, ((_a = rowInfos.get(parentHeadIndex)) === null || _a === void 0 ? void 0 : _a.parent) || -1);
		return;
	}
	if (parentHeadIndex === -1 && !status.getShouldHideGroupInsert() && !domainConfig.getIsWb()) {
		handler(RowType.Spacing, -1);
		handler(RowType.GroupAdd, -1);
	}
}
/**
* 将本分组的 sticky 尾锚行 index 回填到 parentHeadIndex 对应的 GroupHeadRowInfo 上。
* 仅在该 GroupHead 存在且尚未设置时回填，避免被后续外层递归覆盖。
*/ function setGroupHeadStickyEnd(rowInfos, headIndex, endIndex) {
	if (headIndex < 0 || endIndex < 0) return;
	var headRowInfo = rowInfos.get(headIndex);
	if ((headRowInfo === null || headRowInfo === void 0 ? void 0 : headRowInfo.type) === RowType.GroupHead && headRowInfo.stickyEndIndex === void 0) headRowInfo.stickyEndIndex = endIndex;
}
function runGroupFlatten(state, dataUtil, rowInfos, handler, groupInfos) {
	groupInfos.forEach((groupInfo, groupInfoIndex) => {
		var { path, values, recordIds } = groupInfo;
		var records = recordIds.length;
		var headIndex = handler(RowType.GroupHead, -1, {
			level: 0,
			headInfo: {
				count: records,
				path,
				groupValue: values,
				fold: state.isGroupFold(path)
			}
		});
		if (dataUtil.isFieldStatEnabled()) handler(RowType.Stat, headIndex);
		handler(RowType.RecordRange, headIndex, { recordIds: dataUtil.filterFoldedSubTreeRecordIds(recordIds, state.getFoldSubTreeRecordIds()) });
		setGroupHeadStickyEnd(rowInfos, headIndex, handler(RowType.GroupFoot, headIndex));
		if (groupInfoIndex !== groupInfos.length - 1) handler(RowType.Spacing, -1);
	});
}
var init_run_group = __esmMin((() => {
	init_es();
	init_es$1();
	init_interface();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/shared/features/storage-sync.js
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of(subClass, superClass);
}
function _set_prototype_of(o, p) {
	_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of(o, p);
}
var StorageSync;
var init_storage_sync = __esmMin((() => {
	init_es();
	init_feature_single();
	StorageSync = /*#__PURE__*/ function(BaseFeature) {
		"use strict";
		_inherits(StorageSync, BaseFeature);
		function StorageSync() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.hasClickOutsideSync = false;
			_this.visibilitychange = () => {
				if (document.visibilityState === "hidden") _this.syncToStorage();
			};
			_this.onBeforeunload = (event) => {
				_this.syncToStorage();
				event.returnValue = "";
			};
			_this.onDocumentMouseDown = (evt) => {
				if (evt.target.isOutStage && !_this.hasClickOutsideSync) {
					_this.syncToStorage();
					_this.hasClickOutsideSync = true;
					return;
				}
				_this.hasClickOutsideSync = false;
			};
			return _this;
		}
		var _proto = StorageSync.prototype;
		_proto.bootstrap = function bootstrap() {
			this.register(dom.addDisposableListener(window, "beforeunload", this.onBeforeunload));
			this.register(dom.addDisposableListener(document, "visibilitychange", this.visibilitychange));
			this._register(this.UIEvent.document.onMouseDown(this.onDocumentMouseDown));
		};
		_proto.render = function render() {};
		_proto.register = function register(t) {
			if (!t) return;
			return this._register(t);
		};
		return StorageSync;
	}(BaseFeature);
}));
//#endregion
export { init_interface as C, RowType as S, filterFoldedSubTreeRecordIds as _, runGroupTree as a, init_string_group_path as b, computeDropParentDepthRange as c, isDescendantOrSelf as d, pickDropParentDepthByDragDx as f, resolveTargetParentIdByDepth as g, resolveFinalNewParentId as h, runGroupFlatten as i, computeMovingSubTreeHeight as l, readParentIdOfRecord as m, init_storage_sync as n, init_sub_tree as o, pickDropParentDepthByMouseX as p, init_run_group as r, buildSubTreeParentEntry as s, StorageSync as t, init_move_derive as u, flattenSubTree as v, stringifyGroupPath as x, init_flatten as y };
