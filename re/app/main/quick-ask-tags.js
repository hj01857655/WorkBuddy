//#region ../../packages/workbuddy-core/src/conversations/common/quick-ask-tags.ts
/**
* quick-ask-tags · 划词「快速问答」会话的标记契约（issue #100618 决策 18 / 设计文档 §8.4.1）。
*
* ## 为什么需要一个"隐藏标记"
*
* 划词问答产生的是**临时会话**：用户关掉 Tab 就不该再看到它。但它又必须
* **照常落 JSONL + DB 行** —— 引擎假设视图历史可从 JSONL 重建（View 卸载即
* `releaseViewHistory()`），关掉持久化会导致「切个 Tab 就丢消息」。
*
* 于是「临时」语义靠两件事表达，**职责不同、缺一不可**：
*
* | 机制 | 作用 | 不做的后果 |
* |---|---|---|
* | 关闭即归档（`status='archived'`） | 状态终态化，避开启动 sweep | 残留 `active` 僵尸行，UI 可能停在「思考中」 |
* | **本文件的 tag 过滤** | 从**所有**列表视图隐藏（**含归档视图**） | 用户在归档列表里看到一堆划词会话 |
*
* 归档 **≠** 不可见：归档视图（`view: 'archived'`）本来就是专门显示
* `status === 'archived'` 的，所以只归档不打标记，等于把临时会话搬到另一个
* 列表里继续展示。
*
* ## 为什么用 tags 而不是 kind
*
* `kind` 是**派生值**（由 `isAssistantCwd(row.cwd)` 算出），不落列，没法查。
* `tags` 落在 `session_settings` JSON 的 `conversationTags` 键里，是真实存储。
*
* ## 放在 common/ 的原因
*
* 创建方在 renderer（agent-ui），过滤方在 node（`local-conversations-impl`）。
* 常量必须两边共用 —— 各写一份字面量早晚会漂移，而漂移的表现是
* 「划词会话突然出现在会话列表里」这种很晚才被发现的问题。
*/
/** 划词会话的标记键。 */
var QUICK_ASK_CONVERSATION_TAG_KEY = "wbQuickAsk";
/**
* 判断一组 tags 是否属于划词会话。
*
* 只认 `'1'`：避免把 `wbQuickAsk: '0'` 这类显式关闭的写法误判成隐藏。
*/
function hasQuickAskConversationTag(tags) {
	return tags?.[QUICK_ASK_CONVERSATION_TAG_KEY] === "1";
}
/** `session_settings` 里专放 conversation tags 的键（与 node/mappers 同一字面量）。 */
var CONVERSATION_TAGS_SESSION_SETTINGS_KEY = "conversationTags";
/**
* 直接从**原始** `session_settings` 对象判断是否为划词会话。
*
* ## 为什么需要这个入口
*
* {@link hasQuickAskConversationTag} 收的是**已解析的 tags**，而调用方手里常常只有
* 存储原始形态：`sessions.session_settings` 反序列化出来的对象。解析这一步
* （取 `conversationTags` 键、丢掉非字符串值）原本只存在于 `node/mappers.ts` 的
* `conversationTagsFromSessionSettings`，那是 node-only 私有函数，跨包拿不到。
*
* 于是 `workbuddy-server` 的存储用量统计想排除划词会话时，只能自己再抄一遍键名与
* 降级规则 —— 这正是本文件头注要防的漂移（「存储格式只应有一个出处」）。
*
* 所以判据放在这里，而不是让消费方各写一份。
*
* ## 降级一律 fail-open（当成普通会话）
*
* `session_settings` 缺失、不是对象、`conversationTags` 是数组、值不是字符串 ——
* 任一情形都返回 `false`。方向是刻意的：判据服务于「把临时会话从统计/列表里藏掉」，
* 判错成 `true` 会让**真实会话**凭空消失（用户丢数据的观感），判错成 `false` 只是
* 多显示一条临时会话。前者不可接受，后者可容忍。
*/
function hasQuickAskConversationTagInSessionSettings(sessionSettings) {
	const raw = sessionSettings?.[CONVERSATION_TAGS_SESSION_SETTINGS_KEY];
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return false;
	return raw[QUICK_ASK_CONVERSATION_TAG_KEY] === "1";
}
/**
* 划词临时会话在 `projects/<slug>/` 下的 sidecar 标记文件后缀。
*
* ## 为什么需要一个磁盘标记
*
* DB 损坏自愈会扫 `projects/**\/*.jsonl` 回填 `sessions` 行
* （`database-service.ts` 的 `rebuildSessionIndexFromHistory`），而它**不写**
* `session_settings` —— 重建出来的划词会话因此丢掉 tag，会全部涌进会话列表。
*
* 而 JSONL 侧没有任何可识别划词会话的信号：
*   - `session-meta` 行的 meta 走 agent-cli 的 `PERSISTED_SESSION_META_KEYS` 白名单
*     （有治理、spec 断言钉死同步），`mode` 不在其中；
*   - `cwd` 是 `generateCwd` 生成的时间戳目录，与普通 playground 会话**完全同形**。
*
* 于是用一个与 `.jsonl` 同目录的空文件表达「这条是临时会话」。
*
* ## 可靠性依据
*
* sidecar 与 `.jsonl` 同目录、同磁盘、同生共死：
*   - DB 丢了但 projects 还在 → sidecar 在，判据有效（正是要覆盖的场景）
*   - projects 也没了 → 没有 jsonl 可重建，判据无关
* 不存在「jsonl 在而 sidecar 丢」的现实场景。
*
* ## 内容为空
*
* 存在性即信号。不放可解析内容是刻意的 —— 一旦有内容就会有人往里加字段，
* 而这个文件没有版本协商机制。
*/
var QUICK_ASK_SIDECAR_SUFFIX = ".quickask";
/** 划词会话 sidecar 的文件名（不含目录）。 */
function quickAskSidecarFileName(conversationId) {
	return `${conversationId}${QUICK_ASK_SIDECAR_SUFFIX}`;
}
/**
* ⚠️ DB 丢失后「从 JSONL 恢复会话列表」的逻辑**已经存在**，且曾经漏掉本标记。
*
* 出处：`workbuddy-server` 的 `database-service.ts` · `rebuildSessionIndexFromHistory`，
* 在 DB 损坏自愈时扫 `projects/**\/*.jsonl` 回填 `sessions` 行。它**不写**
* `session_settings`，因此重建出来的划词会话丢掉 `wbQuickAsk` tag，会全部涌进会话列表。
*
* 判据**不能只看 JSONL 文件是否存在**：划词会话的 `.jsonl` 是有意长期留存的
* （决策 18：照常落盘，引擎要能重建视图历史），文件存在**不代表**该会话应该回到列表里。
*
* 现在的兜底是 {@link QUICK_ASK_SIDECAR_SUFFIX} sidecar 标记 —— rebuild 扫到同名标记即跳过。
* 存量会话（sidecar 机制之前创建的）没有标记，仍会被重建进列表，这是已接受的降级。
*
* 这条注释刻意放在标记契约旁边而不是只写在设计文档里：实现恢复逻辑的人必然要来这里查
* 「怎么识别划词会话」，这是最可能被读到的位置。
*/
//#endregion
Object.defineProperty(exports, "QUICK_ASK_SIDECAR_SUFFIX", {
	enumerable: true,
	get: function() {
		return QUICK_ASK_SIDECAR_SUFFIX;
	}
});
Object.defineProperty(exports, "hasQuickAskConversationTag", {
	enumerable: true,
	get: function() {
		return hasQuickAskConversationTag;
	}
});
Object.defineProperty(exports, "hasQuickAskConversationTagInSessionSettings", {
	enumerable: true,
	get: function() {
		return hasQuickAskConversationTagInSessionSettings;
	}
});
Object.defineProperty(exports, "quickAskSidecarFileName", {
	enumerable: true,
	get: function() {
		return quickAskSidecarFileName;
	}
});
