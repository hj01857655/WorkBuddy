# WorkBuddy2api（Python 版）

> WorkBuddy 本地 **OpenAI 兼容网关**。把 WorkBuddy 云端的 `/v2/chat/completions`
> 包装成标准 OpenAI Chat Completions，任意支持自定义 Base URL 的客户端
> （Cherry Studio / Cline / OpenAI SDK / one-api）指向 `http://127.0.0.1:8377/v1` 即可用。

刻意做小：**Flask + requests + python-dotenv 三个依赖**，单进程既当 API 又托管管理面板，
不需要 Node / 编译。（本目录是唯一实现；早期单文件版本在 `../re/WorkBuddy2api.py`，已不再维护。）

---

## 一、快速开始

```bash
pip install -r requirements.txt
python server.py
```

```
凭证账号: MiManchi231225 (887e22c0-...)
令牌有效期: 41 天 23 小时
WorkBuddy2api 已启动: http://127.0.0.1:8377
OpenAI Base URL: http://127.0.0.1:8377/v1
本地鉴权: 未开启（仅回环）
```

浏览器打开 <http://127.0.0.1:8377/> 是管理面板（凭证状态 / 模型列表 / 刷新令牌）。

客户端配置：

```
Base URL: http://127.0.0.1:8377/v1
API Key : 见 .env 里的 API_KEY
Model   : auto（或 /v1/models 里的任意 id）
```

---

## 二、凭证从哪来

**不需要你提供任何令牌。** 网关只读复用签到脚本维护的登录态：

```
~/.workbuddy/checkin/auth.json      ← 只读，网关不写回
```

首次使用若该文件不存在，先引导一次：

```bash
python checkin.py doctor
```

令牌临近失效或上游返回 401 时，网关用**旧 Bearer** 调插件刷新端点换新令牌
（`POST {domain}/v2/plugin/auth/token/refresh`，空 body），刷新结果只留在内存，
`auth.json` 始终归签到脚本所有，两边不会互相覆盖。

---

## 三、配置

配置走环境变量，也可写在项目根目录的 ``.env``（由 python-dotenv 加载）：

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | 监听地址 |
| `PORT` | `8377` | 监听端口（避开 codearts2api 的 8787） |
| `API_KEY` | 空 | 设置后 `/v1/*` 与 `/admin/api/*` 要求 `Authorization: Bearer <key>` |

> 未设 `API_KEY` 时只监听回环；要暴露到局域网请先设 key。

---

## 四、接口

| 方法 · 路径 | 说明 |
| --- | --- |
| `GET /v1/models` | 从上游 `/v3/config` 拉取（1 小时缓存），56 个 CN 模型（上游标 `disabled: true` 的壳条目已过滤，如 `wb-lite`），附 `credits` 倍率、上下文、工具/图像/推理能力标记、`reasoning_efforts` 档位候选、`context_lengths`（上游给的可选上下文档位，**仅目录信息**：聊天体 `Request` 无长度字段，选了不生效），以及 `callable` 可调性（未探测时为 `null`） |
| `POST /v1/chat/completions` | 流式 / 非流式双模式，`tools` 透传，`usage.credit` 随响应回传 |
| `GET /health` | 存活探针 |
| `GET /` · `/admin` | 管理面板 |
| `GET /admin/api/overview` | 面板数据：凭证 / 模型 / 本地鉴权状态 |
| `POST /admin/api/refresh-token` | 手动刷新令牌 |
| `POST /admin/api/probe-models` | 逐模型实发一发极小请求（`max_tokens=8`），标出**本账号到底哪些模型调得动**；结果落 `models_probe.json`（TTL 1 天），`force=true` 全量重跑 |

---

## 五、上游三条硬约束（决定了实现形态）

1. **上游只支持流式**——body 里 `stream` 必须是 `true`，否则返回 `400 / code 11101`。
   客户端的非流式请求由网关在服务端跑完整条 SSE 再聚合成一份 `chat.completion`。
2. **进行中的 `finish_reason` 是空串 `""`**（不是 `null`），且 `usage` 内联在收尾帧、
   那一帧 `choices` 非空——既不能按 `null` 判结束，也找不到「空 `choices` 的 usage 帧」。
   网关把收尾拆成标准形态：先发 `finish_reason` 收尾帧，客户端要了
   `stream_options.include_usage` 就再补一帧 `choices: []` 的 usage 帧，最后 `[DONE]`。
3. **`tool_choice` 只接受字符串**，传对象必 `400`——网关一律降为 `"auto"`。不能降
   `"required"`：实测 `required` 在部分后端（如 `hunyuan-chat`）直接 `500 tool_choice invalid`，
   而 `auto` 能跑（24 号审计 §3.7）。想严格指定某个函数只能客户端自己挡。

**转发面只收有行为级证据的键**（24 号审计 §5.1：上游把 body 反序列化进固定结构体，
结构体外的键被静默丢弃、非法取值被默许，所以「上游回 200」不能当支持证据）：

| 处置 | 键 |
| --- | --- |
| 转发（已验证生效） | `max_tokens`、`tools`、`tool_choice`（仅字符串）、`reasoning_effort`（思维链 429→748 / 0→638）、`temperature`（`=0.0` 高熵题 5/5 同值，`=1.0` 现分歧） |
| 别名归一 | `max_completion_tokens` → `max_tokens`（上游不认前者；同时传时 `max_tokens` 优先） |
| 转发（在结构体、效力未定） | `presence_penalty`、`frequency_penalty`、`user` |
| **不转发**（结构体外或实测无效） | `stop`、`response_format`、`logprobs`/`top_logprobs`、`seed`、`top_k`、**`top_p`**、`parallel_tool_calls`、`logit_bias`、`n` |

> 不转发而不是“默默转发”是故意的：接一个上游不会执行的参数，等于向客户端宣称一个
> 并不存在的能力（假接口）。`top_p` 为何被剔除：`temperature=1.0` 基线 uniq=2，
> 加上 `top_p=0.0001` 仍 uniq=2——真被消费时应收敛到唯一值。

另外两个实测坑：上游按 **User-Agent** 校验客户端版本（缺少 `CLI/<版本>` 直接 400/code 12403）；
401 的响应体是**网关层 HTML**，网关不透传，统一归一成 502 + JSON error。

请求头照抄官方分工：会话级头（`X-Conversation-*`）进程内固定，请求级头逐请求生成。
会话级头若逐请求变化，一次操作会在网关侧被拆成几十个会话。

---

## 六、已知边界

- **`tool_choice` 对象形式有损**：上游不收对象，一律降为 `"auto"`（降 `required` 会在部分
  后端直接 500）；因此**无法强制调用某个指定函数**，想要严格指定只能客户端自己挡。
- **`stop` / `response_format` / `logprobs` / `seed` / `top_k` 上游执行不了**（24 号审计行为实测：
  `stop` 不截断、`json_object` 仍回 markdown、`logprobs` 恒 `null`、同 `seed` 两答不同），
  网关不再伪造转发；客户端若依赖这些能力，需自己在网关侧实环（比如 `stop` 后处理截断）。
- **`max_tokens` 的遵从性按后端分裂**：`auto` 上 `=20` 真截断（`finish=length`），
  `hunyuan-chat` 上 `=12` 能跑到 `ct=117` 且 `finish=stop`。**不能当全局保证**。
- **`usage.completion_tokens_details.reasoning_tokens` 在 WorkBuddy 上恒为 0**，
  真实思维链量在自有字段 `completion_thinking_tokens` 里。只读标准字段的客户端会误判
  “这个模型不思考”。
- **推理型模型要留足 `max_tokens`**：思维链计入输出预算，给小了会返回**空 content +
  `finish_reason="length"`**（实测 `max_tokens=32` 时 31 token 全花在 reasoning 上，
  2000 才稳定出结果）。这是上游语义，网关不兜底。
- **`/v1/models` 里有列了但不可调的模型**：`glm-4.6` / `deepseek-v3-1` /
  `kimi-k2-instruct-taiji` 等直连即 `400 / 11102 service info not found`（本账号无权限），
  网关原样透传错误但不筛除。
- **系统提示不能照抄 Claude Code / Codex**：上游按内容拦截，返回
  `400 / code 11128`「Illegal API invocation from an unapproved channel」，与请求头无关。
  不带 system 消息的请求正常（200）。
- **单账号**：只读当前 `auth.json` 对应的账号，没有多账号轮转。
- **会真实消耗 credit**：聊天按 `usage.credit` 计费（实测单次约 `0.06`~`0.36`；
  `reasoning_effort=max` 会明显抬高，实测同题 0.11 → 0.28）。面板只展示，不做限幅。
- **用量只做原始落盘**：`request.log` 由 `RotatingFileHandler` 写（2MB × 3 份），含逐请求
  与方法/路径/状态/耗时；**不记 JSONL、不做按天汇总与 credit 累加**。
- 上游协议随 WorkBuddy 版本漂移，本实现基线是 **5.6.2**。

---

## 七、文件

| 文件 | 说明 |
| --- | --- |
| `server.py` | Flask 应用：OpenAI 兼容面 + 管理面板 + 面板 API + 每日签到线程 |
| `workbuddy.py` | 上游客户端：请求头、模型目录、SSE 解析与聚合 |
| `credential.py` | 凭证读取（`auth.json`）与令牌续期 |
| `oauth.py` | 独立 OAuth 设备流登录工具（不依赖桌面端，凭据写入与签到脚本同一份 `auth.json`） |
| `panel.html` | 管理面板（零构建，vanilla JS） |
| `requirements.txt` | `flask` + `requests` + `python-dotenv` |
| `.env` | 本地配置（`API_KEY` / 可选 `HOST` / `PORT`）；**不存令牌** |
| `.env.example` | 配置模板 |
| `start-WorkBuddy2api.bat` | 启动脚本（计划任务 `WorkBuddy2api` 登录时直跑） |
| `checkin.py` | 每日签到 CLI（本目录自包含，网关签到线程直接调用，不引用目录外文件） |
| `models_probe.json` | 可调性探测结果（自动重建） |
| `request.log` | 运行日志（自动轮转，2MB × 3） |
| `dumps/` | 请求/响应原文落盘（`DUMP=0` 关闭，`DUMP_MAX_FILES` 控制轮转） |

协议依据来自 `../docs/聊天接口规格.md`、`../docs/认证与签到协议.md`、`../docs/网关项目设计.md`
与 `../docs/`（01–24 号逆向文档）；**参数级支持与假接口清单见 `../docs/workbuddy-24-协议翻译完整性审计.md`**。
