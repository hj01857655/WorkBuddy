# WorkBuddy2api

> WorkBuddy 云端模型 → OpenAI / Anthropic 兼容 API 网关

把 WorkBuddy 云端的 `/v2/chat/completions` 包装为三协议兼容接口。Flask + requests + python-dotenv 三依赖，单进程既当 API 又托管管理面板。

## 功能特性

- **三协议兼容**：OpenAI Chat Completions · OpenAI Responses · Anthropic Messages
- **双 realm**：国内版 / 国际版各一份凭据，同一端口按请求头（`X-WorkBuddy-Realm`）切换
- **管理面板**：凭证状态 / 模型列表 / 令牌刷新 / 可调性探测
- **凭证复用**：只读登录方维护的凭据文件（国内版 `auth.json` / 国际版 `auth-intl.json`），不写回；401 时用旧 Bearer 调刷新端点
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
| `/v1/models` | GET | 模型列表（按 realm 返回该账号目录，附 credits 倍率、能力标记、可调性；实测目录 CN 60 / intl 27，随上游变） |
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
Responses        ──→  adapters/responses.py ──→  /v2/chat/completions
                      （请求翻 Chat；响应重放 Responses 事件流——sequence_number
                        递增、终帧携带聚合全文与 usage，dsh 等 Responses 客户端直连）
Anthropic        ──→  adapters/anthropic.py ──→  /v2/chat/completions
                      （双向翻译）
```

Chat 是上游母语；Responses / Anthropic 均为「方言 ⇄ 母语」双向翻译层。`cache_control` 与 Anthropic 入站 `thinking` 配置无 Chat 对应项，翻译时丢弃；上游输出思维链时经 `reasoning_content` 返回，Responses 客户端以 `reasoning_summary_*` 事件收到。

## 配置

| 变量 | 默认 | 说明 |
|---|---|---|
| `HOST` | `127.0.0.1` | 监听地址 |
| `PORT` | `8377` | 监听端口 |
| `API_KEY` | — | 设置后 `/v1/*` 与 `/admin/api/*` 要求 Bearer 鉴权 |
| `WB_REALM` | `cn`（缺省自动） | 默认走哪个 realm：`cn` 国内版 / `intl` 国际版；单请求可用头覆盖 |

### 国际版（WorkBuddy Global）

两个 realm 各一份凭据，互不覆盖：国内版 `~/.workbuddy/checkin/auth.json`（签到脚本维护的槽位），
国际版 `~/.workbuddy/checkin/auth-intl.json`。

```bash
python oauth.py --realm global     # 浏览器打开打印出的 authUrl，用国际版账号登录
```

登完同一端口两边都能跑，按请求选 realm：

```bash
curl -H 'X-WorkBuddy-Realm: intl' http://127.0.0.1:8377/v1/models   # 国际版
curl http://127.0.0.1:8377/v1/models                                # 默认（WB_REALM 决定，缺省 cn）
```

两个 realm 的差异全部自动切，不需手工配：上游 origin（`copilot.tencent.com` ↔ `www.workbuddy.ai`）、
UA（国际版多一段客户端名 `workbuddy-ai`，上游按段校验，混用会被 400/12403 拒）、
模型目录与促销（按 realm 分别缓存，账号不同目录也不同）、
可调性探测结果（`models_probe.json` / `models_probe_intl.json`）。
`GET /health` 会回当前 realm 与两个槽位的状态；`/admin/api/overview` 多一个 `realms` 字段列两个槽位。

## 免费面（限免模型）

上游免费面会变，以 `GET /v1/models` 的 `is_free` / `free_window` 为准：判据是上游 `modelPromotions` 里
`enabled=true` 且 `discount.factor==0`，再叠加有效期与 `daily` 时段（无 `daily` = 全天）。

**国际版**（2026-10-18 实测）

| 模型 | 免费窗口 | 有效期 |
|---|---|---|
| `hy3` | 全天 | → 2026-11-01 |
| `deepseek-v4.1-flash` | 全天 | → 2026-11-01 |
| `step-5-preview` | 全天 | 2026-10-12 → 2026-10-26 |

**国内版**（同刻实测）

| 模型 | 免费窗口 | 有效期 |
|---|---|---|
| `hy3` · `hy3-b` · `hy3-c` | 全天 | → 2026-11-01 |
| `hy4-preview` · `hy4-preview-ctrl` · `hy4-preview-exp` | 23:00-23:59 + 0:00-8:00 | → 2026-11-01 |
| `step-5-preview` | 全天 | 2026-10-12 → 2026-10-26 |

两侧不通用，换 realm 时别照旧习惯选模型：国际版**没有** `hy3-b` / `hy3-c`，也**没有** `hy4-preview` 的夜间免费
（该模型在国际版目录里但不免费）；国际版独有的 `deepseek-v4.1-flash` 在国内版是收费模型（x0.11）。
时段折扣不属于上表（非免费窗口）：国内版 `glm-5.2` 23:00-7:50 打 0.5 折。

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
- **每 realm 单账号**（国内版 / 国际版各一份凭据，不支持同 realm 多账号），会真实消耗 credit
