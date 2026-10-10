# WorkBuddy 逆向 07：agentos 连接行为档案——事件投递边界与限速

日期：2026-09-28　前置：workbuddy-06-协议实调（首次全链路打通）
工具：`workbuddy/re/acp_toolcap.py`（三流捕获探针）、`phase.state`（两阶段现场）

## 1. 事件投递：一次成功，之后系统性静默（未解，需对拍真实客户端）

**成功样本（06 号 §4，21:53）**：bootstrap（独立进程，sessionNew）→ 进程退出 → 数分钟后
`GET /acp`（带该 conn id）→ `POST session/prompt` → GET 通道收到 `session/update`（SSE 游标 `6aced415-…:1/:2/:3`）+ `session/endTurn`。

**此后 ~8 轮结构性变体全部零事件**（会话回合在服务端照常执行——REST `updatedAt` 推进、
沙箱队列被消费，但客户端三路流都只有 keepalive）：

| 变体 | 结果 |
|---|---|
| GET(前) + prompt（bootstrap conn） | 0 事件 |
| GET(前) + prompt（**GET 响应头新分配的 conn**，prompt 回显同 id） | 0 事件 |
| bootstrap 流关闭 vs 挂泵保活 | 无差别 |
| 20s / 3min 就绪等待（热沙箱） | 无差别 |
| `session/load` 长窗 5min（POST 流挂泵） | **id:2 result 永不返回**，无重放块 |
| 完整能力声明 `CLOUD_CLIENT_CAPABILITIES._meta`（question/terminalOutput/detailedCheckpoint） | 无差别 |
| 泵 prompt POST 响应流（PROMPTRESP） | 只有 `:` keepalive |

流健康度：GET 通道 200、每 ~10s `: heartbeat`；bootstrap/PROMPTRESP 200、`:` 补白。
服务端行为已证：**回合真实执行**（见 §3 队列消费），通知不投递给本客户端。
GET 每次返回**新的** `Acp-Connection-Id`（服务器逐 GET 分配连接）；prompt POST 回显所带 id，不轮换。

**结论**：21:53 那次的投递窗口不可复现，差异只剩真实客户端握手中未复制的字段
（`x-codebuddy-request`、`X-IDE-*`、QIMEI 注记、或 bootstrap body 之外的协商）。
**下一步唯一手段：Reqable 对拍真实桌面客户端的 `/acp` 流量**（工作区已有完整 MITM+注入能力）。

## 2. 限速实测

`*.workbuddy.agentos-worker.net` 对**高频新建连接**做 TCP 级丢弃：bootstrap 成功后 1–2 分钟内的
下一条新连接直接 10060（连接超时），冷却 ~2–3 分钟恢复。REST（www.workbuddy.cn）未观测到限速。
复现节奏：间隔 ≥3 分钟、连接数最少化。

## 3. 沙箱代理 API（endpoint_base = link 去尾 `/acp`）

```
GET  {base}/tasks/{cid}/queue      → {code:0,data:{items:[],paused:false,queueLength:0,queueVersion:0}}
POST {base}/tasks/{cid}/queue/status|cancel   # 静态已知（03 号 §2.4），status 同形
GET  {base}/tasks/{cid}/queue/messages        → 404
```

队列在回合启动后被消费（items 空、queueVersion 归零）——与「回合已执行、通知未投递」互证。
认证同沙箱 token（Bearer）。

## 4. 新增 REST 面

| 路径 | 语义 |
|---|---|
| `POST /console/as/conversations/{cid}/session/{sessionId}/delete` | 删除会话下的一段 ACP session（悬浮窗历史会话；colleagues-panel 源码注释自证） |
| `GET/POST /v2/user/cloudagent/instances` 族（DELETE `/:instanceId`） | 数字员工对话实例（legacy，已被 conversation 体系替代，源码标 `@deprecated`） |
| 会话删除：`POST /console/as/conversations/{cid}/delete` | **实测可用**（code:0），本轮清理 5 个测试会话全部成功 |

## 5. 能力声明全值（main/conversations.js:27701）

```json
{"fs":{"readTextFile":false,"writeTextFile":false},
 "_meta":{"codebuddy.ai":{"question":true,"terminalOutput":true,"terminalOutputChunk":true},
          "workbuddy.desktop":{"detailedCheckpoint":true}}}
```

控制请求超时 30s（CONTROL_REQUEST_TIMEOUT_MS）；版本不匹配码 `-32097`；prompt 长流式不设墙钟。

## 6. 测试痕迹与清理

本轮产生 5 个测试会话（2104585508… / 2104587864… / 2104589156… / 2104590141… / 2104590770…），
每会话 1–3 次 bash/uname 回合，已全部 `POST /{id}/delete` 清理（§4）。
06 号证据会话 2104568054715944960 保留。

## 7. 待挖清单（更新）

1. ~~Reqable 对拍~~ **已用注入钩子替代完成：真实协议是 /v2/chat/completions（见 08 号）；agentos ACP-SSE 是另一条（任务沙箱）路径，本机专家会话不走**
2. ~~tool_call wire~~ 由 08 号的 chat/completions tools 字段取代（工具调用即 OpenAI function calling，无需 ACP 事件）
3. `session/load` id:2 无响应之谜（同上）
4. QIMEI 新设备首拉（新机抓包）

## 8. 传输拓扑实测补全（2026-09-29 深夜追捕战）

通过给真实客户端做三层注入（主进程 spawn 补丁 → daemon/sidecar/CLI 全链 `--require` fetch 钩子 +
Chromium CDP renderer 包装器），实测拓扑如下：

```
renderer(SPA，主窗口唯一 Chromium target)
  │  本地会话流量经 IPC/命名管道 → daemon（node http 层可见，REST 代理到云端做同步/持久化）
  │  renderer 自身只发静态 CDN fetch（playbook/connectors 配置轮询）——无对话 ACP
daemon(app-server, ELECTRON_RUN_AS_NODE)
  ├─ 本地对话: CLI 本地 ACP  http://127.0.0.1:{port}/api/v1/acp（端口每次变）
  ├─ 云端同步: POST /console/as/conversations/{uuid} ×N（本地会话也上云持久化！）
  ├─ 通知网关: wss(经 http upgrade) www.codebuddy.cn/v2/agentos/localagent/workspaces/websocket
  │    协议: {"id":1,"connect":{"client":"…","version":"6.6.2 OSS","ttl":604799,"ping":25,"pong":true}}
  │          {"id":2,"subscribe":{"expires":true,"ttl":604799}}  + {} 心跳 —— 仅通知/消息中心，非对话流
  └─ 云端对话: 由 daemon spawn CLI（cli/bin/codebuddy --serve --session-id …）执行
CLI(User-Agent: "WorkBuddy/5.6.2 WorkBuddy/5.6.2 CLI/2.147.0")
  ├─ POST /console/as/conversations/v2      ← 云端会话创建 v2 接口（daemon 代打时同 UA）
  └─ agentos-worker.net ACP（推断，未及捕获；后证实普通专家对话不走此路径——08 号）
```

关键新端点：`POST /console/as/conversations/v2`（v2 创建）。UI 结构：主窗口 SPA 单页；「召唤专家」
创建专家（=云端）会话；普通聊天默认本地会话（uuid id）；云端会话列表接口 `?type=cloud&conversationOrigin=agents,…`。

## 9. 捕获工具链（可复用）

| 文件 | 作用 |
|---|---|
| `hook_fetch.js` | NODE_OPTIONS/--require 注入：fetch/http/undici/ChildProcess.prototype.spawn 四层 + ws 帧 TLS 捕获 |
| `patch_spawn.js` | CDP 给主进程打 child_process.spawn 补丁（daemon/CLI 子进程继承钩子） |
| `inject_renderer.js` | Chromium CDP 注入 renderer 的 fetch/XHR/WS 包装器（window.__wbCap） |
| `cdp_eval.js` | 通用 CDP evaluator（9333=node inspector 主进程，9334=Chromium 页面） |
| `expr_*.js` | UI 驱动脚本（新建任务/召唤专家/填输入框/点发送） |

启动姿势：`WorkBuddy.exe --inspect=127.0.0.1:9333 --remote-debugging-port=9334` + 主进程补丁；
杀 daemon/预热 CLI 触发带钩重生。日志：`workbuddy/re/hook-traffic.jsonl`。
