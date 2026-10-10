# WorkBuddy 逆向 06：云端协议实调（自建客户端全链路打通）

日期：2026-09-28　前置：workbuddy-01-侦察与架构/02/03
工具：`workbuddy/re/wb_client.py`（凭证解密+请求头）、`acp_probe.py` / `acp_probe2.py`（ACP 探针）

> **2026-09-29 修订（见 08 号）**：本篇验证的 ACP-SSE/agentos-worker 链路属于 **cloud-transport 任务沙箱**路径；桌面普通专家/聊天对话实际走 CLI 直调 `POST /v2/chat/completions`（OpenAI 兼容）。本篇协议结论对该沙箱路径仍有效，但不是桌面云端对话的主路径。

## 1. 结论（A 级：live service 实测）

**零依赖 WorkBuddy 代码的自建 Python 客户端，已完整走通云端对话协议**：
解密本地凭证 → REST 建会话 → 取沙箱凭证 → ACP bootstrap → `session/prompt` → 收 `session/update` + `session/endTurn`。
静态推断的协议（01/03 号文档）全部实调验证，无需抓包。

测试账号为操作者本人账号；实测产生的痕迹：会话 `2104568054715944960`（名 "new conversation"，含一轮 "只回复两个字母：ok" 交互）——留在账号里可作证据复查，无需可 `POST /{id}/delete`。

## 2. REST 面（Bearer access JWT + X-User-Id/X-Domain @ www.workbuddy.cn）

| 调用 | 结果 | 要点 |
|---|---|---|
| `POST /billing/meter/checkin-status` | 200 | **签到活动当前未开启**（`active:false`，daily_credit=0）；活动开启时字段：`today_checked_in/streak_days/week_progress[7]/total_credits/action_button{show,text,action}` |
| `POST /billing/meter/get-user-resource-summary` | 200 | credit 包结构：`Packages[]{PackageCode: TCACA_code_XXX, CycleTotal/Remain/Used/Frozen Capacity, CapacityUnit:"credits", TotalCount}`；本机 3 包剩余合计 ≈2044 credits；`IsPaidUser:false` |
| `GET /console/as/conversations/?type=cloud&page=1&size=N` | 200 | 会话列表，含 `manifest.envs[]`（`ACC_USER_ID: 887e22c0-32df-4935-8811-226031b6d12d` / `ACC_USER_NICKNAME: 13056943007` / `CLIENT_INFO_IDE_TYPE: WorkBuddy_Web`、`CLIENT_INFO_PLATFORM: web_agents` / `X_EXPERT_ID` / `CODEBUDDY_REMOTE_AGENTS_URL→http://a2a.agent-gateway.auth-proxy.local/agent-registry/v1/a2a/cards/cloud/self`） |
| `POST /console/as/conversations/` body `{locale:"zh",visibility:"PRIVATE"}` | 200 | **建会话**，响应内联返回 `data.id` + `data.session{sessionId,sandboxId,link,…}`（沙箱端点即刻分配） |
| `GET /console/as/conversations/{id}` | 200 | 详情：`manifest{mcp[],plugins[3],skills[5],secrets[1],memory,system_prompt}`（**system_prompt/memory.content 服务端打码 `***`**）、`sandboxHostTemplate:"%d-{id}.workbuddy.agentos-worker.net"`、`acpBackend:"sandbox_gateway"`、`isPlayground:1` |
| `GET /console/as/conversations/{id}/session` | 200 | 沙箱凭证（§3） |

信封统一 `{code:0,msg:"OK",requestId,data}`。

## 3. 沙箱凭证（agentos 体系）

```json
{"sessionId":"<=conversationId", "sandboxId":"<同id>",
 "link":"https://65225-{id}.workbuddy.agentos-worker.net/acp",
 "e2bDataEndpoint":"https://49983-{id}.workbuddy.agentos-worker.net",
 "token":"<HS256 JWT>"}
```

token claims（全值档案，2026-09-28 第二次 attach 时点）：
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<payload 已脱敏>.<signature 已脱敏>
```
claims：`aud:"sandbox-gateway"`、`iss:"agentos"`、`enterprise_id:"agent-server"`、**`is_admin:true`**、
`user_id:"887e22c0-32df-4935-8811-226031b6d12d"`、`runtime_id:"2104568054715944960"`（=会话id）、**`sandbox_id:"ec16b59665bd4461be3ce332ef72a774"`（沙箱实例独立 uuid ≠ 会话id）**、`source_app:"agent-server"`、24h 有效（iat 1790605275 / exp 1790864475）。
**集群多区域轮换**：首次 attach `cluster_id:"external-gz-prod-5-v2"`（广州5），第二次 `external-bj-prod-9-v2`（北京9）——同一会话两次 attach 落不同区域集群。
端口子域模式：`{port}-{sandboxId}.workbuddy.agentos-worker.net`（e2b 同型；65225=ACP 网关、49983=数据面）。

## 4. ACP 实测时序

```
POST {link→/acp/bootstrap}                    # Bearer <sandbox token>, JSON body:
     {initialize(id=1,protocolVersion:1,clientCapabilities), sessionNew(id=2,sessionId,cwd:"/workspace",mcpServers:[])}
  → 200, 响应头 Acp-Connection-Id: <uuid>     # body 为 SSE 流（先吐 ":" keepalive）

GET {link}  + Acp-Connection-Id: <uuid>       # 接收通道（SSE）
POST {link} + Acp-Connection-Id: <uuid>       # session/prompt {sessionId, prompt:[{type:"text",text:…}], _meta:{codebuddy.ai/conversationRequestId}}
  → 200 text/event-stream（keepalive）

GET 通道收到（SSE event: message）：
  {"jsonrpc":"2.0","method":"session/update","params":{…}}     # 带 Last-Event-ID 游标 "<uuid>:1/:2/:3"
  {"jsonrpc":"2.0","method":"session/endTurn","params":{…}}    # 回合结束扩展通知
```

实测注记：
- `sessionStatus:"CREATING"` 是 attach 请求的状态残留，**不阻塞 bootstrap**——直接对 link 发 bootstrap 即可（服务端等沙箱）。等 CREATING 清零是死路（旧会话 4 分钟不变）。
- bootstrap 用 `session/load`（老会话）与 `session/new`（新会话）均 200；load 的历史重放块未在观测窗口内到达（沙箱冷启动时序，留观）。
- 一次网络抖动（10060）后重试即恢复，无速率惩罚迹象；~20 次请求未触发风控。
- 会话详情 `status:"completed"` + `sessionStatus` 分离；`isUserDefinedTitle:2`、`currentVersionId` 等字段与桌面端逻辑对齐。

## 5. 端到端复现脚本

```bash
cd workbuddy/re
python wb_client.py probe                      # 只读三连（§2 前三行）
python acp_probe2.py                           # 建新会话 + prompt（§4 全时序）
python acp_probe2.py <conv_id> "prompt"        # 复用会话再发
```

## 6. 待挖清单（更新）

1. ~~session/prompt 全链路抓包~~ **完成（直连实测，06 号）**
2. ~~session/load 重放~~ **追查后未解，见 07 号 §1**（id:2 永不返回；事件投递系统性静默，需对拍真实客户端）
3. `/{id}/{action}` 其余动作（fork/persistent/manifest）、`/v2/as/connector` 连接器面
4. QIMEI 新设备首拉 URL（仍需新设备/新机抓包）
5. ~~tool_call wire 全形~~ **受阻于 07 号 §1 投递静默**，对拍后补
