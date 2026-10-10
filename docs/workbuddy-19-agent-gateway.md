# WorkBuddy 逆向 19：agent-gateway / AgentMail / AgentIM（server.js 矿脉）

日期：2026-09-29　前置：workbuddy-13-未探索地图（地图 #15 A2A、#5 IM）　销账：#15 大部分、#5 大部分
样本：`re/app/main/server.js`

> **验证口径**：静态逆向。`server.js` 带 `//#region` 源路径标记且**注释完整**，可读性与 17 号同档。**未抓包验证任何一条端点。**

## 0. 重要发现：这是个 1012-region 的矿脉

`server.js` 含 **1012 个 `//#region` 块**，覆盖 `workbuddy-server/src/` 与 `workbuddy-core/src/domains/` 两大包的几乎全部子域。可读性与 17 号的 `app-server-mcp-apps-host.js` 同档（同样带源路径 + 完整注释），但规模大一个量级。

**本篇只取了 agent-gateway / AgentMail / AgentIM 三条线**，其余按需再取。

## 1. A2A 的实际形态：不是一个协议，是一组 MCP server 聚合

13 号记的「agent-gateway auth-proxy.local、发现/TTL」在代码里的实际形态是 **`/console/agent-gateway/` 下挂多个 MCP 端点**：

```
/console/agent-gateway/agentmail/mcp
/console/agent-gateway/genie-baas/mcp
/console/agent-gateway/netdrive/mcp
/console/agent-gateway/internal_knot-skill      ← 注意：非 /mcp 结尾
```

即 **agent-gateway 是云端 MCP server 的聚合网关**，WorkBuddy 作为客户端消费。`internal_knot-skill` 无 `/mcp` 后缀，是特例。

配套还有云端配置下发：

```
/console/as/netdrive/cloudagent-config/download
/v2/as/connector/oauth/agentmail/accesstoken
```

**A2A（agent-to-agent）在这里的落地形态 = 网关 + 多 server + 配置热更**，而非一套独立协议。

## 2. AgentMail：双网关分段（重要）

`agent-mail/service.ts`（7.8 KB）的 `API_PATHS` 显示**同一功能域被拆到两个不同网关**：

| 网关 | 用途 | 端点数 |
|---|---|---|
| `/v2/as/connector/agentmail/*` | **账号态**（绑定/开通/短信） | 7 |
| `/console/agent-gateway/agentmailrest/v1/*` | **数据态**（邮件 CRUD + 附件） | 8 |

### 2.1 账号态（`/v2/as/connector/agentmail/`）

```js
ME:          /me                     SMS_SEND:   /sms/send
BIND:        /bind                   DEACTIVATE: /deactivate
REACTIVATE:  /reactivate              URL_ADMIN:  /url/admin
URL_REALNAME:/url/realname
```

### 2.2 数据态（`agentmailrest`，**按 alias 分片**）

```js
LIST:            /aliases/{alias_id}/messages
SEARCH:          /aliases/{alias_id}/messages/search
STATUS:          /me
DETAIL:          /aliases/{alias_id}/messages/{message_id}
UPDATE:          /aliases/{alias_id}/messages/{message_id}/update
DELETE:          /aliases/{alias_id}/messages/{message_id}
ATTACH_LIST:     /aliases/{alias_id}/messages/{message_id}/attachments
ATTACH_DOWNLOAD: /aliases/{alias_id}/messages/{message_id}/attachments/{attachment_id}
```

**数据面以 `alias_id` 为第一路径段** —— AgentMail 是**别名多账号**模型，一个用户可有多个邮箱别名。附件是两级资源（message → attachment）。

`applyPathParams` 统一做 `{key}` 模板替换 + `encodeURIComponent`。

### 2.3 状态机与容错

```js
var AgentMailApiError = class extends Error {
  get retryAfter() {                      // 从 data.retryAfter 取，纯数字才认
    const retryAfter = this.data?.retryAfter;
    return typeof retryAfter === "number" ? retryAfter : void 0;
  }
};
```

`getState()` 三态返回：`not_bound`（带 `userType` + `maskedPhone`）/ 正常（`alias` + `openedAt` + `userType`）/ 失败。

**两处特殊容错**：

```js
// 重新开通：auth_failed 是可预期状态，不抛
if (resp.data?.status === "auth_failed") return resp.data;

// HTTP 层软失败包装
this.http = wrapAgentMailHttpSoftFailure(deps.context.http);
```

**手机号脱敏** —— `maskedPhone` 字段直接进返回体。

## 3. AgentIM：通道与配置回滚（#5 大部分）

`agent-im/agent-im-service.ts`（10.5 KB）：

```js
DEFAULT_BACKEND_MODE = "local"
DEFAULT_CHANNEL_TYPE = "wechatbot"      // ← 默认就是微信机器人
LOCAL_AGENT_TYPE     = "claudecode"     // ← 本地 agent 用 Claude Code
```

**默认通道是 wechatbot**，不是企业微信。`LOCAL_AGENT_TYPE = "claudecode"` 说明本地模式跑的是 Claude Code。

绑定存储落在 `<configDir>/agent-im-bindings.json`（`AgentImBindingStore`），`QQBindService` 单独处理 QQ。

### 3.1 QQ 通道注册：带回滚的注册流程

`registerClawChannel(appId, appSecret, isCancelled)` 走 Claw 插件体系：

```js
registerChannelConfig({ channelType:"qq", channelId:appId,
  extra:{ connectionMode:"scan", appId, appSecret, markdownSupport:true } })
// 启动带超时
PLUGIN_START_TIMEOUT_MS = 3e4     // 30s
await Promise.race([ startChannelPlugin("qq"), timeoutPromise ])
```

**`connectionMode: "scan"`** —— QQ 用扫码连接（非 webhook）。

**失败回滚**（这段是重点）：

```js
if (isCancelled()) {
  logger.info(`QQ registerClawChannel cancelled (opId stale), skipping cleanup`);
  return { success:false, error:msg };          // ← 取消不回滚
}
if (rawCode === "AUTH_FAILED" || rawCode === "KICKED_BY_SERVER"
    || /auth|invalid.*bot|secret/i.test(msg)) {
  clawService.unregisterChannelConfig?.("qq");
  logger.warn(`QQ plugin auth failed, config rolled back: ${msg}`);
} else {
  logger.warn(/* 非鉴权失败：不回滚 */);
}
```

三重判断：**主动取消不回滚**（opId 过期，再回滚会误删他人配置）；**鉴权类失败必回滚**（`AUTH_FAILED`/`KICKED_BY_SERVER`/消息匹配）；**其他失败不回滚**（保留现场便于排查）。`KICKED_BY_SERVER` 单独枚举 —— 服务器踢下线是常见的凭据失效形态。

正则 `/auth|invalid.*bot|secret/i` 兜底匹配错误消息 —— 因为不同版本的错误码不稳定。

## 4. CloudAgent：**这才是 A2A 的实质**（`cloud-agent/service.ts`，22.5 KB）

13 号记的「A2A 协议」实际落点是 **`/v2/user/cloudagent/*` —— 用户自建 Agent 的全生命周期 CRUD**，不是一套协议实现。

### 4.1 端点全表（从代码提取）

| 方法 | 路径 | 语义 |
|---|---|---|
| POST | `/v2/user/cloudagent/orchestrator` | `initOrchestrator` 初始化编排器 |
| POST | `/v2/user/cloudagent/agents` | `createAgent` |
| GET | `/v2/user/cloudagent/agents/{agentId}` | `getAgent`（`encodePath` 转义） |
| DELETE | `/v2/user/cloudagent/agents/{agentId}` | `deleteAgent`（**204 视为成功，不解析 body**） |
| POST | `/v2/user/cloudagent/agents/pin` | 置顶 |
| POST | `/v2/user/cloudagent/agents/unpin` | 取消置顶 |
| POST | `/v2/user/cloudagent/agents/{id}/clone` | 克隆 |
| POST | `/v2/user/cloudagent/agents/{id}/versions` | `publishVersion` 发布版本 |
| GET | `/v2/user/cloudagent/validate-field?field=&value=&excludeAgentId=` | **字段唯一性预校验** |
| GET | `/v2/user/cloudagent/quota` | 配额 |
| — | `/v2/user/cloudagent/conversations` | 会话 |
| — | `/v2/user/cloudagent/instances` | 实例 |
| — | `/v2/user/cloudagent/entitlement` | 权益 |

`/v2/user/*` 前缀（区别于 `/v2/as/connector/*` 与 `/v2/activity/*`）—— **第四个网关分区**。

### 4.2 两个细节

**① `validate-field` 单独存在**

```js
query.set("field", params.field);
query.set("value", params.value);
if (params.excludeAgentId) query.set("excludeAgentId", params.excludeAgentId);
```

即**改名/克隆前先查重**（`excludeAgentId` 排除自身）。前端友好的设计——避免提交后才报冲突。

**② DELETE 的 204 特判**

```js
const response = await this.fetchAuthed(`deleteAgent(…)`, url, { method:"DELETE" },
                                       { includeJsonContentType: false });
if (response.status === 204) return;                 // 无 body，直接返回
const json = await this.readJson(response, …);
this.throwIfError(response, json, `Cloud Agent delete failed: ${response.status}`);
```

`includeJsonContentType: false` —— DELETE 不发 Content-Type 头。`204` 不解析直接过。

## 5. 相关 region 索引（`server.js` 1012 个中的 agent 线）

```
workbuddy-core/src/domains/netdrive/wb/index.ts
workbuddy-core/src/domains/netdrive/common/cloud-repo.ts
workbuddy-server/src/agent-im/{agent-im-binding-store, qq-bind-service,
                               wechatbot-api-client, agent-im-service, handlers}.ts
workbuddy-server/src/agent-mail/{contract, service, handlers}.ts
workbuddy-server/src/cloud-agent/{list-item-normalizer, service-utils, service, handlers}.ts
node_modules/@tencent/drive-sdk@1.1.2
```

`cloud-agent/` 是另一条独立线（云端 agent 编排），`netdrive/` + `drive-sdk` 是腾讯网盘集成。

## 6. 结论与待续

**A2A 的实质** = 两部分：
1. **`/v2/user/cloudagent/*`** —— 用户自建 Agent 的全生命周期 CRUD（建/克隆/版本/置顶/配额/校验），这是"agent 可被创建和复用"的那一半；
2. **`/console/agent-gateway/*`** —— 云端 MCP server 聚合网关（agentmail / genie-baas / netdrive / internal_knot-skill），这是"agent 能调外部能力"的那一半。

两者合起来才是 WorkBuddy 的 agent 互操作面。13 号原描述的「发现/TTL」**在本次检索中未见对应代码，该子项仍未验证**，不作结论。

**IM（#5）**：`agent-im-service.ts` 已取，得知默认通道为 `wechatbot`、本地 agent 类型为 `claudecode`、QQ 走扫码连接且有三重失败回滚。**但六通道（飞书/钉钉/Slack/QQ/元宝/Discord）的协议细节未读**，故 #5 仍标部分完成。

**网关分区汇总**（本篇出现四个此前未记录的）：

| 前缀 | 归属 |
|---|---|
| `/v2/user/*` | CloudAgent（用户自建 agent） |
| `/v2/as/connector/*` | 连接器（agentmail / netdrive / ardot） |
| `/v2/activity/*` | 活动（签到 / 成长体系） |
| `/console/agent-gateway/*` | MCP 聚合网关 |

**未取**（server.js 里还有大量可读 region）：
- `cloud-agent/handlers.ts` + `list-item-normalizer.ts`（云端 agent 的 RPC 面与列表归一）
- `agent-im/handlers.ts` 剩余（`QQ_QR_UPDATE` 等 channel 全表）
- `netdrive/` + `@tencent/drive-sdk@1.1.2`（网盘工具面）
- `wechatbot-api-client.ts`（微信机器人协议细节）
- 飞书 / 钉钉 / Slack / 元宝 / Discord 各通道实现
