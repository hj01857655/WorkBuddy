# WorkBuddy 逆向 20：Claw IM 通道体系（#5 收官）

日期：2026-09-29　前置：workbuddy-19-agent-gateway（server.js 矿脉）　销账：#5 IM 通道
样本：`re/app/main/server.js` → `packages/workbuddy-server/src/claw/**`（60 个 region，`claw-service.ts` 191.5 KB）

> **验证口径**：静态逆向。**未连接任何 IM 通道，未发过消息。** 所有通道行为均为读码推断。

## 1. 修正：不是 6 个通道，是 12 个

01 号 §8 记的是「WeCom aibot、飞书、钉钉 stream、Slack socket-mode、QQ bot、Discord gateway、元宝 bot」共 7 个。**代码里实际有 12 个插件目录**：

| 通道 | 插件目录 | region 数 |
|---|---|---|
| 企业微信 aibot | `wecomaibot/`（`client`+`ws-options`+`plugin`） | 3 |
| 企业微信（新） | `wecom-new/` | 1 |
| 企业微信 IOA | `wecom-ioa/` | 1 |
| 微信服务号 | `wechatmp/` | 1 |
| 微信客服 | `wechatkf/` | 1 |
| 微信（个人号） | `weixin/`（`types`+`api`+`auth`+`media`+`client`+`plugin`） | 6 |
| 飞书 | `feishu/`（`inbound-content`+`media`+`support`+`gateway-adapter`+`outbound-adapter`+`plugin`） | 6 |
| 钉钉 | `dingtalk/`（`support`+`plugin`） | 2 |
| QQ | `qq/`（`types`+`api`+`client`+`plugin`） | 4 |
| Slack | `slack/` | 1 |
| Telegram | `telegram/`（`html-utils`+`plugin`） | 2 |
| Discord | `discord/`（`types`+`api`+`client`+`plugin`） | 4 |
| 元宝 | `yuanbao/`（`codec`+`client`+`plugin`） | 3 |
| 自定义 | `custom/` | 1 |

**01 号漏记的**：企业微信三套（aibot / new / ioa）、微信服务号、微信客服、**微信个人号**、Telegram、自定义。另 `yuanbao-codec.ts` 说明元宝有**自定义编解码**（非纯 JSON）。

代码内 `channelType` 字面量确认的 8 个：`dingtalk` `discord` `feishu` `qq` `wechatbot` `wechatmp` `wecomaibot` `yuanbao`。

## 2. 三条通道级策略（`ClawService` 静态常量）

```js
IOA_ENTERPRISE_IDS = new Set(["esoikz80kd8g", "etahzsqej0n4"]);   // 硬编码两家企业

IOA_RESTRICTED_CHANNELS = new Set(["feishu","dingtalk","slack","telegram","discord"]);

OVERSEAS_IM_CHANNELS    = new Set(["slack","telegram","discord"]);
```

**① IOA 企业白名单硬编码在代码里** —— 两个企业 ID 写死在静态字段。企业不在名单则 `wecom-ioa` 可用性受限（判定逻辑在 `ioa-im-override.ts`，未读）。

**② 五个通道被标为「受限」** —— 飞书/钉钉/Slack/Telegram/Discord 恰好是 `OVERSEAS_IM_CHANNELS` 的**超集**（多出飞书、钉钉两个国内通道）。推测与出海合规或代理配置有关，**未验证**。

**③ 三个海外通道** = Slack + Telegram + Discord。国内通道（wecom 系、微信系、QQ、元宝、飞书、钉钉）不在此列。

## 3. 超时与节流常量（全部可用环境变量覆盖）

```js
CLAW_PERMISSION_DISPATCH_TIMEOUT_MS       = 15e3   // 15s   权限请求下发
DEFAULT_CLAW_INBOUND_IDLE_TIMEOUT_MS      = 18e5   // 30min 入站空闲
DEFAULT_CLAW_INBOUND_CANCEL_TIMEOUT_MS    = 5e3    // 5s    取消
DEFAULT_CLAW_OUTBOUND_DELIVERY_TIMEOUT_MS = 3e4    // 30s   出站投递

WORKBUDDY_CLAW_INBOUND_IDLE_TIMEOUT_MS       // 环境变量名
WORKBUDDY_CLAW_INBOUND_CANCEL_TIMEOUT_MS
WORKBUDDY_CLAW_OUTBOUND_DELIVERY_TIMEOUT_MS
```

`readPositiveTimeoutMs` 校验严格：

```js
const parsed = Number(rawValue);
return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackMs;   // 非正/NaN → 回落
```

**入站空闲 30 分钟** —— 长挂着的会话。

其他常量：

```js
STALE_AGENT_SESSION_TTL_MS              = 864e5   // 24h  过期 agent session
PREEMPTIVE_COMPACT_REUSE_THRESHOLD      = 8       // 上下文压缩阈值
RECENT_OVERSIZE_RECOVERY_WINDOW_MS      = 9e5     // 15min 超限恢复窗口
WECHATMP_PUSH_TIMEOUT_MS                = 15e3
WECHATMP_PUSH_MAX_ATTEMPTS_WITHOUT_SERVER_IDEMPOTENCY = 2
WECHATMP_PUSH_RETRY_DELAYS_MS           = [0, 1000]
```

**`WECHATMP_PUSH_MAX_ATTEMPTS_WITHOUT_SERVER_IDEMPOTENCY = 2`** —— 服务端**没有幂等保障**时最多重试 2 次，延迟 `[0, 1s]`。常量名虽长但意思明确：知道服务端不幂等，所以少试。

## 4. 单飞节流中继（`createSingleFlightStreamRelay`）—— 最值得抄的一段

原文注释：

> **单飞节流的流式中继**：把高频的「累积文本」推送合并成互不重叠的发送——上一帧未回时不发新帧、**只保留最新文本**；本帧发送完成后若又有更新的文本再补发。这样发送频率被**下游 ack 往返自然限制**，不会堆积/背压。

```js
function createSingleFlightStreamRelay(send) {
  let inflight = false, pending = null, closed = false;
  const flush = async () => {
    if (closed || inflight || pending == null) return;   // ① 在飞 或 无待发 → 跳过
    inflight = true;
    const text = pending; pending = null;                 // ② 取走当前帧
    try { await send(text); }
    finally {
      inflight = false;
      if (!closed && pending != null) flush().catch(() => 0);  // ③ 期间有新帧 → 补发
    }
  };
  return {
    push: (text) => { pending = text; flush().catch(() => 0); },   // 只覆盖，不排队
    close: () => { closed = true; pending = null; }
  };
}
```

**关键设计（`close()` 的语义）**：

> `close()` 之后丢弃一切待发帧，用于 turn 结束时把收尾交给 final（`finish=true`），避免残留的流式帧和 final **抢同一个 streamId**、多花一次 ack 往返（表现为「**客户端已完成、手机侧还在追发**」的尾部延迟）。

即 `close()` 不是"等发完"，是**主动丢弃**。流式帧是"累积文本"，final 是完整结果 —— 发了 final 再发残留中间态就是重复。注释直接点出用户可见症状:"客户端已完成、手机侧还在追发"。

三态语义:`inflight`（在飞）/ `pending`（待发，仅一份，被覆盖）/ `closed`（终态，丢弃一切）。**用"只保留最新"天然实现"合并中间帧"。**

## 5. 正文间隙提示（`WECOM_THINKING_HINT_ACTIVITIES`）

```js
new Set(["agent_thought_chunk", "tool_call", "tool_call_update"])
```

> 触发「正文间隙提示」的 agent activity 类型。这些事件表示 agent **暂停正文输出、转入深度思考**或工具调用。此时在**正文下一行追加一行可见提示**，让用户感知仍在处理中。
> 是 `handlers.ts` `MEANINGFUL_CLAW_ACTIVITY_UPDATES` 的**子集**，仅保留「正文暂停→思考/工具」间隙场景。

**IM 场景特有需求** —— 桌面端有 spinner，IM 只能靠文本行提示。所以做了"正文间隙"精细化：深度思考和工具调用要提示，其他活动不打断正文。

## 6. 内部状态机（`ClawService` 构造函数，11 个 Map/Set）

```js
workspaceRefreshPromises          = new Map()   // workspace 刷新去重
activeConversations               = new Map()
staleAgentSessionIds              = new Map()   // 过期 agent session（配 24h TTL）
activeImTurnRoutes                = new Map()   // IM turn 路由
imRequestRoutesByClientRequestId  = new Map()   // 客户端请求 ID → 路由（幂等键）
deliveredWechatmpPermissionRequests = new Set()  // 服务号权限请求去重
inFlightConversationKeys          = new Map()   // 会话键在飞去重
staleInboundDispatchIds           = new Map()   // 过期入站分发
```

**大量 `…ByClientRequestId` / `inFlight` / `delivered` 命名 = 幂等与去重是一等公民**。IM 通道的核心难题就是重复投递（重连、ack 丢失、多端同时发）。

## 7. 其他 claw 子模块（60 个 region 的其余部分）

| 模块 | 用途 |
|---|---|
| `centrifugo/` | **Centrifugo 实时推送**（3 文件 + 91.4 KB SDK）—— 第三方可扩展实时消息协议 |
| `bg-agent-api-client.ts` | 后台 agent API |
| `claw-power-lifecycle.ts` | 电源/生命周期 |
| `claw-text-approval.ts` | **文本审批**（IM 里做工具确认） |
| `slash-command-interceptor.ts` | 斜杠命令拦截 |
| `reply-error-classifier.ts` | **回复错误分类** |
| `claw-pending-attachment-buffer.ts` | **待发附件缓冲**（消息未发完时先攒附件） |
| `conversation-scope.ts` | 会话作用域 |
| `ioa-im-override.ts` | IOA 通道覆盖 |
| `claw-telemetry.ts` | 遥测 |

`centrifugo` 依赖（`centrifuge@5.5.3`）值得注意 —— 说明部分通道走 **Centrifugo 协议**而非各家原生。`claw-telemetry` 印证 08 号记的遥测面。

## 8. 结论

**Claw 是 12 通道统一抽象**，每通道一个插件目录，共用 `ClawService` 的会话/幂等/节流机制。三个工程要点：

1. **单飞节流中继** —— 天然合并流式中间帧，`close()` 主动丢弃避免与 final 抢 `streamId`
2. **幂等键遍布** —— `imRequestRoutesByClientRequestId` / `inFlightConversationKeys` / `deliveredWechatmpPermissionRequests`
3. **超时全部可配** —— 3 个环境变量覆盖，`readPositiveTimeoutMs` 严格校验非正回落

**未读**：12 个通道各自的协议实现（wecom/feishu/qq/discord/yuanbao 等 client 文件），`centrifugo` 接入方式，`ioa-im-override` 判定逻辑。

**下一步**：`plugin-manager.ts`（**283.4 KB，全 server.js 最大**）与 `session-manager.ts`（243 KB）尚未触及 —— 体量说明是核心子系统，建议优先。

