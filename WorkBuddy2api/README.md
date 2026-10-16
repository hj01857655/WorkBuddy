# WorkBuddy2api

> WorkBuddy 云端模型 → OpenAI / Anthropic 兼容 API 网关

把 WorkBuddy 云端的 `/v2/chat/completions` 包装为三协议兼容接口。Flask + requests + python-dotenv 三依赖，单进程既当 API 又托管管理面板。

## 功能特性

- **三协议兼容**：OpenAI Chat Completions · OpenAI Responses · Anthropic Messages
- **管理面板**：凭证状态 / 模型列表 / 令牌刷新 / 可调性探测
- **凭证复用**：只读签到脚本维护的 `auth.json`，不写回；401 时用旧 Bearer 调刷新端点
- **流式 / 非流式双模式**（上游只支持流式，非流式由网关聚合）

## 快速开始

```bash
pip install -r requirements.txt
python server.py
```

```
Base URL : http://127.0.0.1:8377/v1
API Key  : .env 的 API_KEY
Model    : auto（或 /v1/models 里的任意 id）
```

浏览器打开 <http://127.0.0.1:8377/> 是管理面板。

### 凭证初始化

首次使用若 `~/.workbuddy/checkin/auth.json` 不存在：

```bash
python checkin.py doctor
```

## API 接口

| 端点 | 方法 | 说明 |
|---|---|---|
| `/v1/chat/completions` | POST | OpenAI Chat Completions（流式/非流式，`tools` 透传） |
| `/v1/responses` | POST | OpenAI Responses API（请求翻 Chat 调上游，响应由桥重放原生事件流） |
| `/v1/messages` | POST | Anthropic Messages API（翻译层 ⇄ Chat） |
| `/v1/models` | GET | 模型列表（56 个 CN 模型，附 credits 倍率、能力标记、可调性） |
| `/health` | GET | 存活探针 |
| `/` · `/admin` | GET | 管理面板 |
| `/admin/api/overview` | GET | 面板数据 |
| `/admin/api/refresh-token` | POST | 手动刷新令牌 |
| `/admin/api/probe-models` | POST | 逐模型可调性探测 |

### 协议翻译架构

```
客户端                 proxy 翻译层              上游（仅 Chat）
─────────            ─────────────            ─────────────
Chat Completions ──→  直通                 ──→  /v2/chat/completions
Responses        ──→  responses_bridge     ──→  /v2/chat/completions
                      （请求翻 Chat；响应重放 Responses 事件流——sequence_number
                        递增、终帧携带聚合全文与 usage，dsh 等 Responses 客户端直连）
Anthropic        ──→  anthropic_bridge     ──→  /v2/chat/completions
                      （双向翻译）
```

Chat 是上游母语；Responses / Anthropic 均为「方言 ⇄ 母语」双向翻译层。`cache_control` 与 Anthropic 入站 `thinking` 配置无 Chat 对应项，翻译时丢弃；上游输出思维链时经 `reasoning_content` 返回，Responses 客户端以 `reasoning_summary_*` 事件收到。

## 配置

| 变量 | 默认 | 说明 |
|---|---|---|
| `HOST` | `127.0.0.1` | 监听地址 |
| `PORT` | `8377` | 监听端口 |
| `API_KEY` | — | 设置后 `/v1/*` 与 `/admin/api/*` 要求 Bearer 鉴权 |

## 上游硬约束

1. **上游只支持流式**：body `stream` 必须为 `true`，非流式由网关聚合完整 SSE
2. **finish_reason 是空串**：进行中 `finish_reason` 为 `””`（非 `null`），`usage` 内联收尾帧；网关拆成标准形态
3. **tool_choice 只接受字符串**：传对象必 400，网关一律降为 `”auto”`

## 已知限制

- **tool_choice 对象形式有损**：无法强制调用指定函数
- **stop / response_format / logprobs / seed / top_k 上游执行不了**，网关不伪造转发
- **推理模型留足 max_tokens**：思维链计入输出预算，给小了返回空 content + `finish_reason=”length”`
- **渠道内容闸门（scrub 已整体移除）**：上游曾在 2026-10-11 当晚对 `ua=ZCode` 长上下文请求拦截（`400 / code 11128`），网关曾加 `_SCRUB_MAP` 出站清洗；**2026-10-15 直连上游复测：竞品名/通用词/逐字 Claude Code 系统提示词裸发一律 200，拦截面有时效性、已放开**，当日实测后清洗代码连同 `system→user` 角色改写一并删除（它曾把 `Agent`→`helper`、`ZCode`→`the unit`，污染模型上下文）。若 `request.log` 重现 400/11128，恢复入口：git 提交 `f9e05e1`（WB_SCRUB 开关版）；完整背景见 `../docs/workbuddy-25-渠道闸门与scrub.md`
- **cache_control / Anthropic thinking 配置丢弃**：Chat 协议无对应项（上游亦无 Anthropic 式 prompt cache）；思维链内容在 Responses 侧以 reasoning 事件保留
- **单账号**，会真实消耗 credit
