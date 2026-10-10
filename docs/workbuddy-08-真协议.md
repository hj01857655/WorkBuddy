# WorkBuddy 逆向 08：云端对话真协议——/v2/chat/completions 全量捕获

日期：2026-09-29　前置：workbuddy-07-agentos拓扑（拓扑+工具链）
样本：`workbuddy/re/hook-traffic.jsonl`（req-body-b64 64 条，gzip 完整解出）、`chat_body_56`、`system_prompt_sample.txt`

## 1. 决定性结论（推翻 06/07 号的 ACP-SSE 云端假设）

**云端对话的真实协议 = `POST https://www.workbuddy.cn/v2/chat/completions`（OpenAI Chat Completions 兼容，gzip body）**，由 CLI（serve 模式）的 OpenAI SDK（x-stainless-* 头，openai-node 6.25.0）直接调用。**agentos-worker.net / ACP-SSE / bootstrap 在当前桌面云端对话路径中完全不出现**（那些是 cloud-transport 任务沙箱路径；普通专家/聊天走 LLM 直调）。

请求流（一次本地专家回合，全部被钩子捕获）：
```
CLI serve 进程
 ├─ POST http://127.0.0.1:{port}/internal/agent   # daemon 本地指令通道（acp-connection-id + x-codebuddy-request）
 ├─ POST /agenttool/v1/intent/recall              # 意图召回（X-Expert-Id: ContentCreator + Bearer）
 ├─ POST /v2/chat/completions ×N                  # 模型循环（含 conversation_topic 标题生成小模型调用）
 └─ POST /v1/traces, /v2/report                   # 遥测
```

## 2. /v2/chat/completions 完整请求头（实测原值结构）

```
Authorization: Bearer <Keycloak access JWT>          # 与桌面认证同一 token
Content-Type: application/json ; Content-Encoding: gzip
X-Requested-With: XMLHttpRequest
x-stainless-*: lang=js runtime=node v22.21.1 package-version=6.25.0 arch=x64 retry-count=0   # openai SDK 指纹
X-Conversation-ID: <uuid>                             # 会话标识（= daemon 分配的 sessionId）
X-Agent-Intent: craft
X-Agent-Purpose: conversation | conversation_topic    # 主对话 vs 标题生成
X-Agent-Type: main
X-Expert-Id: ContentCreator                           # 专家路由
X-IDE-Type/Name: WorkBuddy ; X-IDE-Version: 5.6.2
X-Private-Data: true
acp-connection-id: <uuid> ; x-codebuddy-request: 1    # 本地通道安全头也随行
X-Device-Token: v3:AAAA…（约 2KB 设备指纹 blob，#0# 分段，QIMEI 体系产物）
X-Request-ID / X-Conversation-Message-ID / X-Conversation-Request-ID: 16hex/uuid 族
traceparent / b3 / X-Trace-Id: W3C + B3 双 trace
```

## 3. 请求体（OpenAI Chat Completions + 私有扩展）

```json
{"model":"deepseek-v4.1-flash",
 "messages":[
   {"role":"system","content":"This conversation is powered by Deepseek-V4.1-Flash\r\n…专家人设+能力清单+identity_context(USER.md 等)…"},
   {"role":"user","content":[{"type":"text","text":"<system-reminder data-role=\"user-context\">\n<user_info>OS/Shell/Workspace…</user_info>\n<identity_context>…</identity_context>\n…\n<user_query>你好，请用一句话自我介绍。…</user_query>"}]},
   …,
   {"role":"user","content":[…]}
 ],
 "tools":[{"type":"function",…}],      // 工具面：Bash/Edit/Glob/Grep/Read/Write（Claude Code 系工具名）
 "agent":"cli",
 "conversationRequestId":"01a0e989db3773d79980c882ce0dfddc",
 …}
```

实测要点：
- system prompt 首段：`This conversation is powered by <模型名>` + 专家能力清单（Research & writing / Data & analysis / Building things / **Multimodal content generation: ImageGen/VideoGen/text-to-3D skill**）+ 100+ Experts 引导 + identity files 注入声明。
- user content 内嵌 `<system-reminder data-role="user-context">`（user_info/identity_context/memory_and_skills_reminder）+ `<user_query>` 包裹真实问题——CC 系 prompt 注入风格。
- 无 `stream` 字段（非流式请求）；tools 六件套同 Claude Code。
- 标题生成走同端点小调用：`X-Agent-Purpose: conversation_topic`，prompt 要求回 `{"isNewTopic":bool,"title":string}`（完整 prompt 已存 `chat_body_56.json`）。
- 末尾附加字段 `agent:"cli"`、`conversationRequestId`。

## 4. 会话创建 v2 与本地会话（req-body 原值）

`POST /console/as/conversations/v2`（标题条）：
`{"type":"local","sessionId":"cb127aaa-…","name":"<首条消息截断>","conversationOrigin":"legacy_workbuddy_local","workDir":"C:/Users/12925/WorkBuddy/2026-09-29-03-36-17","isPlayground":1,…,"clientContext":{"localStatus":"active","hostId":"1bb40190-…"(=deviceId),"sessionKind":"manual","expert":{"id":"",…}}}`

专家召唤附带遥测：`expert_ids:["ex_nchiDpT84L9o","ContentCreator"]`、事件 `expert_summon_click`。
heartbeat: `PUT /console/as/conversation-sync/devices/remote-view`；凭证 `POST /edge-cloud/credentials`。

## 5. 捕获方法论定论（为什么此前所有路线失败）

1. **renderer 无对话流量**——对话全在 CLI；renderer 只有静态 CDN fetch。
2. **daemon 是编排者**：本地指令通道（127.0.0.1:{port}/internal/agent）+ REST 同步；不直接讲模型协议。
3. **CLI 是模型调用者**：prewarm 池预热（不带会话），回合时 promote 成 serve 进程。钩子必须在 CLI 启动前于磁盘生效——最终以**直接 patch `cli/bin/codebuddy` 启动器**（插一行 `require(hook_fetch.js)`）稳定接管全部 CLI。
4. `Module._load` 拦不到打包进 bundle 的 ws/http 实现；`--require` 全局钩（fetch/http/https.request/req.write+end/TLS socket）五层才覆盖全。
5. 服务端 `X-Device-Token`（v3 blob）由 TuringShield 体系生成，`/v2/chat/completions` 必带——~~需逆向生成~~ **已绕过：turing_sdk.node 独立调用，见 workbuddy-09-Device-Token直调**。另 08 号 §8 补录：该值每次请求滚动变化。

## 6. 现场清理状态

- `cli/bin/codebuddy` 已打补丁（`codebuddy.wbbak` 备份在旁）；`hook_fetch.js` 长驻。
- 会话痕迹：本地专家会话数个（uuid 型，不占云端 quota），云端 "new conversation" 3 个（06/07 号实验品）。
- 还原：覆盖 `codebuddy.wbbak` → `codebuddy`，杀 WorkBuddy 全部进程重启即净。

## 7. 待挖清单（更新）

1. ~~X-Device-Token~~ **完成：turing_sdk.node 独立调用即可，见 workbuddy-09-Device-Token直调（直调全链已打通）**
2. `/agenttool/v1/intent/recall` 请求/响应体（意图召回面）
3. ~~流式变体~~ **已解：上游强制 stream:true（400 code=11101），桌面 UI 的流式输出即 SSE 直通（workbuddy-09-Device-Token直调/12）**
4. ~~更大模型面板~~ **已解：模型目录双层结构见 workbuddy-11-模型目录**（bedrock 121 + CN 云端 54）

## 8. 钩子流量全量端点清单（2026-09-29 补录，抓包 2600+ 行去重）

| 端点 | 观测频次 | 语义（部分由调用时机推断） |
|---|---|---|
| `GET/POST /portal/operation-platform/market/expert/get-by-ids` | 149 | 专家详情批量拉取（body `{"expert_ids":[…],"include_invisible":false}`，专家 id 形如 `ex_nchiDpT84L9o`） |
| `POST /v2/operation-platform/market/skill/get-by-ids` | 71 | 技能详情批量 |
| `POST /v2/billing/meter/checkin-activity-status` | 47 | **与 03 号 `checkin-status` 并存的新签到端点**（v2 活动/主题季） |
| `POST /cf-publish/api/publish` | 38 | 内容发布通道（cf=content fabric？） |
| `POST /billing/meter/get-user-resource-free-packages` | 22 | 免费权益包 |
| `POST /v2/operation-platform/slots/active-batch` | 16 | 运营位批拉 |
| `GET /portal/operation-platform/market/expert/download-url` | 16 | 专家包下载地址 |
| `HEAD/GET static…/connector-agent-plugins/connector-plugins.zip` | 14 | 连接器插件包热更 |
| `POST /v2/feature-flag/api/product-config` / `feature-flags/check?ename=…` | 12+ | 特性开关 |
| `POST /v2/chat/prediction` | 9 | **对话意图预测**（输入联想/路由，fetch 直调） |
| `GET /console/as/conversation-sync/devices/online` + `PUT …/remote-view` | 8 | 多设备在线态/远端查看 |
| `POST /v2/backgroundagent/localProxy/register` | 8 | 本地代理注册（后台 agent） |
| `POST /v2/agentos/localagent/registerWorkspace` | 8 | 工作区注册（agentos 侧） |
| `POST /v2/as/connector/oauth/ardot/accesstoken` + `/status` | 7 | ardot 连接器 OAuth（8 期前未知组件） |
| `GET /portal/operation-platform/market/expert-categories` | 7 | 专家分类 |
| `GET /console/as/conversation-sync/conversations?type=local&sourceDevice…` | — | **本地会话云同步**（本机对话也上云备份） |
| `POST /v2/plugin/auth/token/refresh` / `GET /v2/plugin/accounts` | — | 插件通道 token/账号 |
| `GET /edge-cloud/credentials`（POST） | — | 边缘凭证下发 |
| `GET /v2/activity/growth/buddy/info` | 高频轮询 | 成长体系（签到/buddy 等级） |
| `GET /portal/msg-center/message/summary` + `pending-displays/refresh` | 高频轮询 | 消息中心 |
| telemetry: `POST /v2/report`、`POST /v1/traces`（body 含 qimei36/uid/plugin_status 事件流） | 常驻 | 遥测（事件形如 `{eventCode,timestamp,scene,elementId,…,qimei36,userId,product:"SaaS"}`） |

另录：CLI 启动即以 Node http 拨 `http://undefined/pac/resolve`（PAC 配置 bug，`undefined` 主机名）——不影响功能但可作指纹；`/v2/chat/completions` 的 `X-Device-Token` 每次请求不同（滚动）。

## 9. 遗留未记录项自查结果

- `phase.state`（phase1 现场会话/凭证）→ 07 号 §1 已述，文件留在 re/ 供复查。
- `chat_body_56.json` 截断版（68KB 处 JSON 未闭合）→ 08 号 §3 已用正则提取全部关键字段；完整 28KB 明文体在 hook-traffic.jsonl 第 56 条 req-body-b64 可随时重解。
- prewarm→serve 的 promote 机制、prewarm-id 格式（`wb-pool-<ts>-<rand>`）→ 08 号 §5。
- 专家市场包 `my-experts` 加载失败遥测（`marketplace-install-failed`，本机 `~/.workbuddy/plugins/marketplaces/my-experts` 无有效 marketplace 文件）→ 仅遥测噪音，无逆向价值，不单独落档。
