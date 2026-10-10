# WorkBuddy 逆向 03：ACP 对话方法面、签到/计费接口、加密面补扫

日期：2026-09-28　前置：workbuddy-01-侦察与架构（架构/端点）、workbuddy-02-凭证加密破解（at-rest 解密）

## 1. 本地加密面补扫（结案）

- `~/.workbuddy/settings.json`（38KB）为**明文 JSON**，顶层键 `sandbox/enabledPlugins/claw/autoLaunchDesired/…`，无 `$wbEncrypted` 字段。
- 全 `~/.workbuddy` 目录扫描：**无 WBEA1 整文件加密实例**（策略停在 fields 档）；`$wbEncrypted` 实际只在 auth `.info` 与 changes-detail 快照的字符串提及中出现。at-rest 解密结论（02 号）即全量结论。
- `models.json` 为空数组 `[]`。

## 2. ACP 对话方法面（cloud transport，源 packages/agent-client-protocol + workbuddy-core）

### 2.1 传输（Streamable HTTP）

- 收流：`GET {endpoint}`（endpoint 尾缀 `/acp`）+ `Accept: text/event-stream` + `Acp-Connection-Id` + `Last-Event-ID`（断线续传），心跳超时触发重连，服务端响应头下发新 `Acp-Connection-Id`。
- 发送：`POST {endpoint}` + `Content-Type: application/json` + `Accept: application/json, text/event-stream` + `Acp-Connection-Id` + trace 头；body 为单条 JSON-RPC 请求；响应可为 SSE 流或单个 JSON-RPC 消息。
- 认证：`/console/as/conversations/{id}/session` 返回的 `token`（沙箱会话 token）。

### 2.2 bootstrap（5 合 1，POST `/acp/bootstrap`）

首连用一次 POST 替代「GET SSE + initialize + session/load(+new)」三趟往返：

```json
{
  "initialize":      {"jsonrpc":"2.0","id":1, "method":"initialize",       "params":{"protocolVersion":1,"clientCapabilities":{"fs":{"readTextFile":false,"writeTextFile":false},…}}},
  "sessionLoad":     {"jsonrpc":"2.0","id":2, "method":"session/load",     "params":{"sessionId":"…","cwd":"/workspace","mcpServers":[]}},
  "setConfigOption": {"jsonrpc":"2.0","id":12,"method":"session/set_config_option","params":{"sessionId":"…","configId":"…","value":"…"}},   // 可选
  "setModel":        {"jsonrpc":"2.0","id":3, "method":"session/set_model","params":{"sessionId":"…","modelId":"…"}},                    // 可选
  "setMode":         {"jsonrpc":"2.0","id":10,"method":"session/set_mode", "params":{"sessionId":"…","modeId":"…"}}                     // 可选
}
```

新建会话则是 bootstrap-new：`session/new`（幂等可重试）替代 `session/load`。云端 clientCapabilities 固定关 fs（CLOUD_CLIENT_CAPABILITIES）。

### 2.3 方法常量（ConversationAcpMethod）

| method | 用途 |
|---|---|
| `session/prompt` | 发送用户输入（回合驱动） |
| `session/steer` | 回合中插话 |
| `session/cancel` | 取消 |
| `session/set_mode` / `session/set_model` | 模式/模型切换 |
| `_codebuddy.ai/session/rollback` | 回滚（私有扩展命名空间） |
| `_codebuddy.ai/delegateTool` / `delegateToolsChanged` | 工具委派扩展 |

`session/prompt` 请求体：

```json
{"sessionId":"…",
 "prompt":[ {"type":"text","text":"…","_meta":{"codebuddy.ai":{"mode":"…","model":"…"}}},
            {"type":"resource_link","uri":"skill://名","name":"…","_meta":{"mentionType":"skill"}},
            {"type":"image",…} ],
 "_meta":{"codebuddy.ai/conversationRequestId":"…",
          "codebuddy.ai":{"mode":"…","model":"…","expertId":"…"},
          "timestamp":"ISO","baggage":{…遥测}}}
```

block 类型：`text/image/audio/resource/resource_link`；resource_link 的 URI 前缀 `skill://<名>`、`command://<名>`（encode 成 `@skill:` / 裸 `/名` 文本）、腾讯文档选区 mention `tencentDocsSelection`（`_meta.selectionPayload` 必须保留结构化 block 直达 daemon，否则退化 #84409）。

### 2.4 通知事件（session/update 的 update.type）

`agent_message_chunk`、`agent_thought_chunk`、`user_message_chunk`、`tool_call`、`tool_call_update`、`plan`、`available_commands_update`、`current_mode_update`、`session_info_update`、`config_option`（扩展）。
消息对齐 `_meta['codebuddy.ai/messageId']`（勿用帧顶层 messageId）。stopReason 五值 `end_turn/cancelled/max_tokens/max_turn_requests/refusal`，云端扩展值（`max_turns/network_error/timeout`）出口归一。

## 3. 签到与计费（billing/meter 族）

renderer 同源 `httpService`（www.workbuddy.cn 口径），信封统一 `{code, msg, data, requestId}`，`code===0` 为成功。

**验证状态**（2026-09-29 用 web JWT 直调复核）：

| 端点 | 语义 | 状态 |
|---|---|---|
| `POST /billing/meter/daily-checkin` | 每日签到；重复签 **code=10001**「今天已签到，请明天再来」 | ✅ 实测 |
| `POST /v2/billing/meter/checkin-activity-status` | 签到活动状态 v2 | ✅ 实测（见 §3.1/§3.2） |
| `POST /billing/meter/checkin-status` | 签到状态 v1 | ⚠️ 通，但为**空占位**，不可作准（见 §3.1） |
| `POST /billing/meter/get-enterprise-user-usage` | 企业用量 | ⚠️ 路由存在（400 `uid or enterpriseID is empty`），参数口径未知 |
| `POST /billing/meter/get-user-resource-summary` | 资源汇总 | ❌ 403 `code=10085`「请求不合法」 |
| `POST /billing/meter/get-user-resource-paid-packages` / `-free-packages` | 付费/免费权益包 | ❌ 403 `code=10085`，同上 |

**❌ 三条的判定**：`10085 请求不合法` 是**业务层拒绝**（非 404），即路由真实存在但请求被拦。已试 body 传 `uid`/`userId`/`user_id` 与 query 传参共 6 种组合，均为 10085；`get-enterprise-user-usage` 则始终 400 并回显「uid empty」，说明 body/query 均未生效。推测这几条需 CSRF token 或请求签名头（签到两条不需要），具体机制未验证。

> 此前本表将上述端点与已实测的签到端点混排、未标验证状态，易被误读为「已逆向」。**表中每行现均标注状态。**

### 3.1 v1 / v2 口径不一致（2026-09-29 实测，重要）

同一时刻、同一 token，两端点返回**互相矛盾**：

| 字段 | v1 `checkin-status` | v2 `checkin-activity-status` |
|---|---|---|
| `active` | **false** | true |
| `today_checked_in` | **false** | **true** |
| `streak_days` | **0** | **13** |
| `season` | 0 | 9 |
| `checkin_dates` | `null` | 13 条日期 |
| `week_progress` | 全 false | `[true,true,false×5]` |

**v1 在无活动口径下返回空占位**（`active:false` / 全 0 / `checkin_dates:null`），即使当天实际已签。v2 才反映真实活动数据。

**结论：以 v2 为准。** 只读 v1 会得出"今天没签、连续 0 天"的错误结论——本机旧自动化日志里的 `今日已签：False  连续天数：0  本周：○○○○○○○` 即此坑产物，与同一次响应中的 `code=10001`「今天已签到」自相矛盾。

### 3.2 字段名（实测 snake_case，非驼峰）

```json
{"active":true,"today_checked_in":true,"streak_days":13,"daily_credit":100,
 "today_credit":100,"is_streak_day":false,"next_streak_day":0,
 "streak_bonus_days":0,"streak_bonus_credit":0,
 "checkin_dates":["2026-09-29",…],"week_checkin_days":2,
 "week_progress":[true,true,false,false,false,false,false],
 "total_credits":1300,"start_time":"2026-09-16 00:00:00",
 "end_time":"2026-09-29 23:59:59","theme_name":"Buddy加油站",
 "season":9,"activity_name":"…","claim_button_text":"…",
 "action_button":{"show":true,"text":"…","action":"workbuddy://expert"}}
```

`claim_button_text` / `activity_name` / `action_button.text` 为 UTF-8 中文，非转义。

### 3.3 签到工具

`workbuddy/tools/wb_checkin.py` —— 独立可跑，无外部依赖（标准库）。

```
python tools/wb_checkin.py
```

零参数。查 v2 状态 → 今日已签则跳过；未签则签到，然后复查并打印新状态（连续天数/积分是否已更新）。适合直接挂每日定时。

凭据来源优先级：`~/.workbuddy/checkin/auth.json`（web JWT，1334B access + 700B refresh）→ 缺失则调 `re/decrypt_auth.py --full` 从 `Data/Public/auth/*.info`（按 mtime 取最新）引导并回写。日志追加到 `~/.workbuddy/checkin/checkin.log`。

renderer 内部桥事件：`backend:get-checkin-status`、`backend:claim-daily-checkin`；daemon（main 进程）**无** checkin 处理器——签到是 web console 功能。

本机 `~/.workbuddy/checkin/` 实测为**外部自动化**在跑（非应用自带功能）：
`auth.json`（uid/nickname/domain/www.workbuddy.cn + web JWT：access 1334B、refresh 700B、expiresAt）、
`storage-state.json`（Playwright storage state，当前 30B 空壳）、`browser-profile/`（持久化登录态）、
`screenshots/`、`checkin.log`（`今日已签/连续天数/本周○×7` 状态行 + `code=10001` 响应）。
即：拿到 web JWT 后 `POST https://www.workbuddy.cn/billing/meter/daily-checkin` 空 body 即签到。

## 3.4 成长体系 / Buddy（2026-09-29 实测，范围收窄）

### 3.4.1 已确认的唯一端点

`GET /v2/activity/growth/buddy/info` —— 客户端**高频轮询**（08 §8 记为「成长体系（签到/buddy 等级）」）。实测响应：

```json
{"code":0,"msg":"OK","data":{
  "buddy":{"instance_id":9370455,"name":"暗影喵","personality":"安全守护者",
    "rarity":"SR",
    "soul_desc":"一身碳纤维忍者装，背负双刀，紫色电路纹路在黑暗中微微发光。沉默寡言但洞察敏锐，专注于代码安全和系统防护。",
    "base_static_url":"…/buddy_static_assets/chibi.png",
    "base_animated_url":"…/GrowthSpace/BuddyCats/chilun-miao.webm",
    "full_animated_url":"…/work_cat_sprite_anim/work_cat11_sprite_anim.png",
    "thumbnail_url":"…/GrowthSpace/BuddyCats/chilun-miao.png",
    "appearance":{"eye":null,"hat":null,"body_accessory":null,"effect":null}},
  "poll_interval_seconds":60}}
```

**该端点只返回「形象」，不含等级/经验/任务/进度。** 08 §8 那句「buddy 等级」的描述偏乐观 —— 等级数据不在这条链路里。

`www.workbuddy.cn` 与 `www.codebuddy.cn` 双域返回一致（同账号同 buddy）。资源在腾讯云 COS 加速域名 `acc-1258344699.cos.accelerate.myqcloud.com`。

`appearance` 四槽（`eye`/`hat`/`body_accessory`/`effect`）全 null，即**装扮系统存在但未启用**。

### 3.4.2 范围界定

桌面端不含成长计划 UI —— `re/app/renderer/assets/` 下无 GrowthSpace 相关 chunk（`BuddyAppsPanel-*.js` 是 Buddy *Apps* 面板，与成长计划无关；`parse-buddy-preview-deeplink` 同理）。主进程 JS 全文搜 `activity/growth/` 无命中，抓包 `hook-traffic.jsonl` 亦仅 `/buddy/info` 一条。

**成长计划（等级/经验/任务/成就）主体在 web 控制台 `GrowthSpace` 页面，桌面端只轮询形象做展示。** 其数据面需抓浏览器包才能测绘，当前未做。

## 4. 关联：会话凭证获取链（供自动化复现）

1. 离线：解密 `Data/Public/auth/workbuddy-desktop.info`（02 号文档）得 Bearer access/refresh（Keycloak realm copilot，30d/60d）。
2. 云端：`GET /console/as/conversations`（Bearer + X-User-Id…）→ `GET …/{id}/session` 得沙箱 `endpoint(/acp)+token`。
3. 对话：§2 的 bootstrap + `session/prompt`。
4. 签到：web JWT（web 控制台口径）打 `/billing/meter/daily-checkin`。

## 5. 待挖清单（更新）

1. ~~QIMEI~~ **已测绘，见 workbuddy-04-QIMEI与风控**
2. renderer `lib-chat-ui` / `esm-*` chunk 的完整 API client 面（连接器、分享、weboffice/smartsheet）
3. CLI product.json config 块 creditPurchaseActions（6005…计费动作码）
4. `session/prompt` 的实际抓包验证（Reqable 已具备 MITM+注入能力）
