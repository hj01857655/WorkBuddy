# WorkBuddy 逆向 12：WorkBuddy2api —— OpenAI 兼容网关（工程收官）

日期：2026-09-29　前置：workbuddy-08-真协议/09/10/11
成品（现行）：`WorkBuddy2api/` 目录版（Flask + requests + python-dotenv，端口 8377）
早期版：`re/WorkBuddy2api.py`（stdlib-only 单文件，**已不再维护**，本篇§2/§4 中的
`WB_API_KEY`、54 模型、Device-Token 等条目属该旧版；现行实现配置已改 `API_KEY`/`HOST`/`PORT`
并只读 `~/.workbuddy/checkin/auth.json`）
参数级翻译完整性与假接口清单另见 **24 号审计**。

## 1. 定位

把 01–11 号的全部逆向成果打包成一个本地网关：任何 OpenAI SDK / CherryStudio / one-api / new-api
指向 `http://127.0.0.1:8377/v1` 即可用 WorkBuddy 云端模型（deepseek-v4.1-flash 等 54 个 CN 模型，
credit 计费随 usage 透传）。

```
客户端(OpenAI SDK/任意) → WorkBuddy2api:8377 → /v2/chat/completions（gzip+stream:true）
                                              头族: Bearer + X-Device-Token(turing_sdk.node) + X-Agent-*/Expert-Id…
```

## 2. 已实测能力

| 项 | 结果 |
|---|---|
| `GET /v1/models` | ✅ 54 模型实时表（v3/config 缓存 1h），含 credits 倍率/上下文/图像支持 |
| 非流式 chat | ✅ 服务端聚合 SSE → 完整 `chat.completion`（上游仅支持流式，code 11101） |
| 流式 chat | ✅ SSE 逐 chunk 透传（`chat.completion.chunk`） |
| tools 透传 | ✅ 客户端自定义 function → 上游 → `finish_reason:"tool_calls"` + 标准回传 |
| OpenAI 官方 SDK | ✅ `openai` python 包直接可用，`usage.credit` 透传 |
| token 管理 | 25min 内存缓存 + 401 自动调 `/v2/plugin/auth/token/refresh` 重试一次（刷新接口：旧 Bearer 进、新 token 出，空 body） |
| Device-Token | turing_sdk.node 独立调用，内存缓存 4min（上游滚动值，5min 后台刷新节奏对齐） |
| 本地鉴权 | 现行目录版：`.env` 里的 `API_KEY` 设置后强制校验（无 key/错 key → `401`）；未设置仅监听 127.0.0.1。旧版为 `WB_API_KEY` |
| `reasoning_effort` | ✅ 已接（2026-10-10）：`max` 使思维链 429→748（auto）、0→638（glm-5.3-flash）；合法档位由 `/v1/models` 的 `reasoning_efforts` 暴露（55 个里 16 个有） |
| `callable` 可调性 | ✅ `POST /admin/api/probe-models` 逐模型发 `max_tokens=8` 极小请求后写入 `/v1/models`；本账号实测 **55 个里 38 可调 / 17 不可调**（均 `400/11102`） |
| 流式 `delta.role` | ✅ 首帧带 `role:"assistant"`（上游每帧都发角色，OpenAI 惯例是只首帧发；补齐与非流式路对齐） |

## 3. 已知边界

1. **usage.credit 在 reasoning 轮为 0**（07 号观测），实际扣费以后台为准；本机 free 包已尽，活动包按 x0.11 计。
2. 多账号：`load_session()` 目前固定读单账号 `.info`；扩展需把 `FileAuthenticationStorage` 路径参数化（多 `.info` 文件轮询即可，云端不绑设备——Device-Token 每次滚动已证）。
3. 上游 401 源自头集合缺失（09 号 §2），网关已内置完整头集合 + 401 自动刷新重试。
4. Windows 客户端 GBK 编码 body 已容错（服务端 gbk fallback）。
5. 会话归属：每请求新 `X-Conversation-ID`（服务端按 ID 归组，无状态透传）。
   **旧版本这里写的「`agent:"cli"` 直调路径不进 Web 历史列表」已被推翻**（24 号审计 §10.3）：
   `agent` 根本不在聊天端点的结构体里（类型非法也不报错），该字段源自我们自己
   早期的探针脚本 `re/wb_agent.py`，不是官方行为。历史列表到底由哪层控制属
   conversation-sync，仍是全系列未结项 #7，**不应当作已证实的性质依赖**。

## 4. 运行

现行目录版（工作目录 `WorkBuddy2api/`）：

```bash
pip install -r requirements.txt
python server.py                       # 默认 127.0.0.1:8377，读 .env 里的 API_KEY
start-WorkBuddy2api.bat                            # 后台拉起（已在监听则跳过）
REM 登录自启：计划任务 WorkBuddy2api 直跑 pythonw server.py（bat 不含 -Register）
```

早期 stdlib 单文件版（已停维，仅存档）：

```bash
cd workbuddy/re
python WorkBuddy2api.py 8377          # 默认 127.0.0.1:8377
WB_API_KEY=sk-xxx python WorkBuddy2api.py 8377   # 开启本地鉴权
```

# 客户端验证
openai base_url=http://127.0.0.1:8377/v1  model=deepseek-v4.1-flash
```

依赖：Python 3.10+；首次请求需要 `node`（拉 Device-Token，之后 4min 缓存）；`fresh_token.txt` 存在时优先用。

## 5. 全系列索引（01–12）

| 篇 | 主题 | 关键产出 |
|---|---|---|
| 01 | 侦察/架构/凭证体系 | 架构图、云端 API 面 |
| 02 | at-rest 加密破解 | buildkey、decrypt_auth.py |
| 03 | ACP 方法面/签到/计费 | console/as + billing 端点 |
| 04 | QIMEI/风控 | appKey、SDK 接口、计费动作码 |
| 05 | threat-db/betterleaks | 45.7 万域名黑名单、扫描器 |
| 06 | 协议实调（REST+ACP） | 沙箱凭证、bootstrap |
| 07 | agentos 拓扑/捕获工具链 | 事件投递边界 |
| 08 | **真协议** /v2/chat/completions | 完整头+体 |
| 09 | Device-Token + 直调 | turing_sdk.node 独立调用 |
| 10 | 工具面 23 schema + function calling | full_tools_body.json |
| 11 | 模型目录 121+54 + 计费倍率 | model_catalog.json、v3_config.json |
| 12 | **WorkBuddy2api 网关** | 本篇 |
