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
| `/v1/responses` | POST | OpenAI Responses API（翻译层 ⇄ Chat） |
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
Responses        ──→  responses_to_chat   ──→  /v2/chat/completions
Anthropic        ──→  anthropic_to_chat   ──→  /v2/chat/completions
                    ↑ 响应翻回各自格式
```

Chat 是上游母语；Responses / Anthropic 均为「方言 ⇄ 母语」双向翻译层。`thinking`、`cache_control` 等 Anthropic 特有字段无 Chat 对应项，翻译时丢弃。

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
- **渠道内容闸门与请求侧 scrub**：上游曾在 2026-10-11 当晚对 `ua=ZCode` 长上下文请求拦截（`400 / code 11128`，仅 01:19–02:06 窗口内），网关加 `_SCRUB_MAP` 出站清洗后当晚即放行；**2026-10-15 直连上游复测：竞品名/通用词/逐字 Claude Code 系统提示词裸发一律 200，拦截面有时效性、已放开**。scrub 仍在生效且响应侧无还原，模型上下文与回显文本可能见到占位名；瘦身/开关方案见 `../docs/workbuddy-25-渠道闸门与scrub.md`
- **thinking / cache_control 丢失**：Anthropic 特有字段，Chat 协议无对应项
- **单账号**，会真实消耗 credit

## 项目结构

```
WorkBuddy2api/
├── server.py              # Flask 应用：API + 管理面板 + 签到线程
├── workbuddy.py           # 上游客户端：请求头、模型目录、SSE 解析
├── credential.py          # 凭证读取 + 令牌续期
├── responses_bridge.py    # Responses ⇄ Chat 翻译层
├── anthropic_bridge.py    # Anthropic ⇄ Chat 翻译层
├── oauth.py               # OAuth 设备流登录
├── checkin.py             # 每日签到 CLI
├── panel.html             # 管理面板（vanilla JS）
├── requirements.txt
└── .env
```
