# 24 · WorkBuddy2api 协议翻译完整性审计

- 审计对象：`WorkBuddy2api/`（Python 网关，端口 8377）
- 实测时间：2026-10-10 13:40–14:10（Asia/Shanghai）
- 账号：`MiManchi231225` / uid `887e22c0-…` / domain `www.workbuddy.cn`
- 上游基线：WorkBuddy 5.6.2，端点 `https://copilot.tencent.com`
- 方式：**只读 + 实调**，未改任何源码。探针在运行时注入键、绕过网关白名单直连上游；
  并对同一请求同时取上游原始帧与网关产出帧做字段 diff。

---

## 结论摘要

1. **入站只有 OpenAI Chat Completions 一个面**（无 Anthropic Messages / 旧补全 / responses），
   出站是 OpenAI 兼容 + 腾讯私有扩展，所以本审计只涉及 OpenAI → WorkBuddy 单向翻译。
2. **上游解码机制决定了「200」不是证据**：未知键静默丢弃、非法取值一律默许（连 `max_tokens=-10`
   都 200）、只有**类型不符**才报 `400/11101 Unmarshal chat params failed`。
   旧文档《聊天接口规格》§5.2 那批「✅ 200（透传）」只证明了接受性。
3. **白名单 12 个透传键里只有 6 个拿到行为级证据**（`model`/`messages`/`max_tokens`/`tools`/`tool_choice`/`temperature`）；
   `stop`、`response_format`、`logprobs`/`top_logprobs`、`seed`、`top_k`、`top_p` 已**实锤无效**
   （其中 `seed`/`logprobs`/`response_format`/`top_k`/`top_p` 根本不在上游结构体里）——转发它们就是向客户端宣称不存在的能力。
4. **本轮唯一真正「上游支持、本路漏接」的参数是 `reasoning_effort`**：在结构体里，
   且实测能拉/压思维链（`max` 使 thinking 429→748、0→638）。
5. **两条本轮新发现的风险**：对象形式 `tool_choice` 降 `required` 在后一部分后端上直接把
   能跑的请求打成 500（回归）；`max_completion_tokens` 两边都不认→**输出无上限**。
6. **工具调用与消息侧本身是完整的**：多工具并行回环、数组 content、多 system、36k 字长上下文全部 200。

---

## 一、契约

### 1.1 入站：只有 OpenAI Chat Completions

| 路由 | 位置 | 协议 |
|---|---|---|
| `POST /v1/chat/completions` | `server.py:120` | OpenAI Chat Completions（流式 + 非流式） |
| `GET /v1/models` | `server.py:103` | OpenAI Models |
| `GET /health` | `server.py:211` | 自定义存活探针 |
| `GET /`·`/admin`·`/admin/api/*` | `server.py:219-272` | 自建面板 API，非协议面 |

没有 Anthropic Messages、没有 `/v1/completions`、没有 `/v1/responses`、没有 embeddings。
入站是单协议面，因此不存在「入站 Anthropic → 出站 OpenAI」这类跨协议翻译，
本审计只覆盖 OpenAI → WorkBuddy 一个方向。

SSE 出站形态（`server.py:178-207`）：每帧 `data: <json>` + 空行；收尾三件套 =
`finish_reason` 帧 →（仅当客户端要了 `stream_options.include_usage`）`choices: []` 的 usage 帧 →
`data: [DONE]`。

### 1.2 出站：OpenAI 兼容 + 腾讯私有扩展

上游 `POST /v2/chat/completions`。请求结构《聊天接口规格》§5.1（162-206 行），
三个必填项见规格 §5.3（243 行）：`model` / `messages` / **`stream: true`（必须是布尔 true）**。

与 OpenAI 的正式差异清单见规格 §10（1072-1104 行），本轮复核关键几条：

| 维度 | 上游 | 证据 |
|---|---|---|
| 非流式 | 不支持，`400/11101` | 规格 §11 用例 #2 |
| 进行中 `finish_reason` | `""` 空串而非 `null` | 规格 §6.7（448-489） |
| `usage` 位置 | 内联在 finish 帧、`choices` **非空** | 规格 §6.8（490-543） |
| `usage` 触发 | 默认就给，不需要 `include_usage` | 规格 §6.8（541-543） |
| `delta` 键集 | 每帧 7 键齐全（空值也发） | 规格 §6.6（409-447） |
| `delta.reasoning_content` | 有（OpenAI 无此字段） | 规格 §6.6（426-428） |
---

## 二、出站逐参数处置表

本路 = `workbuddy.py:135` 的 `build_payload`（行号按 2026-10-10 §十 改动后的实文）：
请求体字面量 `157-164`、`max_completion_tokens` 归一 `165-170`、白名单元组 `171-175`、
`tools` `176`、`tool_choice` `177-182`。

分类：① 已透传且上游有效 / ② 上游支持但本路漏接 / ③ 上游不支持 / ④ 故意不接

| OpenAI 顶层键 | 上游实测（本轮） | 本路状态 | 证据 | 结论 |
|---|---|---|---|---|
| `model` | 生效：未知模型 `400/11102` | 透传（缺省补 `auto`） | `workbuddy.py:132`；§3.8 | ① |
| `messages` | 生效：空数组 `400/11133` | 透传 | `workbuddy.py:135`；规格 §5.2 #9 | ① |
| `stream` | 上游只认真 `true` | 强制写死 `true` | `workbuddy.py:133`；规格 §5.2 #2 | ①（网关自承非流式聚合） |
| `tools` | 生效：真触发函数调用 | 透传 | `workbuddy.py:142-143`；§3.6 | ① |
| `max_tokens` | 按后端分裂：`auto` 上 `=20` → `finish=length, ct=20`；`hunyuan-chat` 上 `=12` → `ct=92/117, finish=stop` | 透传 | `workbuddy.py:137-141`；§3.2 | ①（附后端不一致告警） |
| `tool_choice` | 按后端分裂：`hunyuan-chat` 收 `auto`/`none`，`required`/非法值 → `500 tool_choice invalid`；`auto` 连 `bogus_value` 都 200 | 字符串透传 + 对象一律降 `auto`（§十已回退曾经的 `required` 降级） | `workbuddy.py:177-182`；§3.7 | ①（无法强制指定具体函数；降 `required` 会在部分后端 500，已修） |
| `stop` | 无效：baseline 输出 `好⏎###⏎行`，带 `stop=["###"]` 仍输出 `###好`（分隔符照样在正文）。键本身在结构体（类型不符会 400） | 透传 | §3.1 | ③ → 假接口 |
| `response_format` | 无效：`json_object` 下 `auto` 返回带 ```` ```json ```` 围栏的 markdown 散文，非裸 JSON；`hunyuan-chat` 同样 | 透传 | §3.3 | ③ → 假接口 |
| `logprobs` / `top_logprobs` | 无效：请求侧 `logprobs="yes"`（类型错）都不报错 → 不在结构体；响应侧 `choices[0].logprobs` 恒 `null` | 透传 | §3.4、§4.1 | ③ → 假接口 |
| `temperature` | ✅ **已消费**（§10.1 更正）：高熵题下 `=0.0` 连 5 发同一值（743）、`=1.0` 现分歧。上一轮拿 `=0.0` 两答不同当反证是错的——开放式选题本来就可以多个近义答案 | 透传 | §10.1 | **①**（§一轮判 ③，已推翻） |
| `seed` | 无生效证据：`temperature=1.0, seed=777` 两发 `47`/`42`；异 seed `11`/`22` 反都 `42` | 透传 | §3.4 | ③（确定性不成立）→ 假接口风险 |
| `top_p` | ❌ **未消费**（§10.1）：`temperature=1.0` 基线 uniq=2，加 `top_p=0.0001` 仍 uniq=2（真生效应收敛到 1） | **不转**（§十 已剔除） | §10.1 | **③** |
| `top_k` | ❌ 不在结构体 | **不转**（§十 已剔除） | §5.1 | **③** |
| `presence_penalty` / `frequency_penalty` | 🔶 在结构体，但效力不稳定：`=-2` 使输出 83→197 字，`=+2` 两轮与基线完全一致 | 透传（标效力未定） | §10.1 | 存疑：不能归入“已验证” |
| `user` | 键在结构体（`user={…}` → `400 unmarshal`），但无可观测效应 | 透传 | §3.5 | 存疑，倾向 ③ |
| `n` | 忽略：`n=2` → `choices` 恒 1 项（规格 §11 #23）；本轮实测 `index` 恒 0 | 不接 | `build_payload` 注释已给理由 | ④ 理由成立 |
| `stream_options` | 上游默认发 usage，不需要开关（规格 §6.8） | 网关自处理 usage 帧形态 | `server.py:137-138`、`190-200` | ④ 正确 |
| `max_completion_tokens` | 上游不认：`=20` → `ct=277, finish=stop`（等于没设）；同请求 `max_tokens=20` → `ct=20, finish=length` | 不接 | §3.2 | ③ → 入站侧假接口，见 §7 R2 |
| `parallel_tool_calls` / `logit_bias` / `modalities` / `audio` / `prediction` / `store` / `safety_identifier` / `web_search_options` / `reasoning_effort` | 结构体成员已查清（见 §5.1）：`logit_bias`/`prediction`/`reasoning_effort` **在**，其余**不在**；其中 **`reasoning_effort` 实测有真实效应** | 曾不接 → **已接**（§10.6） | §5.1、§5.2 | `reasoning_effort`：②→已修；`logit_bias`/`prediction`：在结构体但效力未测；其余 ③ |
| `agent` | **不在聊天端点结构体里**（类型非法也不报错） | 恒发 `"cli"` | `workbuddy.py:162`；§10.3 | 实为无效字段（源自我们早期探针脚本 `re/wb_agent.py`，非官方行为）；保留但注释已标不应期望它影响历史列表 |

**小结（表格已按 §十 定稿，不再保留审计当时的暂定结论）**：原 12 个透传键里
真拿到行为级证据的只有 `model` / `messages` / `max_tokens` / `tools` / `tool_choice` / `temperature`；
`stop` / `response_format` / `logprobs`+`top_logprobs` / `seed` / `top_k` / `top_p` 已证伪或确认不在结构体，
**已全部从白名单剔除**；`reasoning_effort` 是当时唯一漏接、现已接上（§5.2、§10.6）。
两个 penalty 与 `user` 仍在转发，但只能标“效力未定”，不能再当“已支持”。

---

## 三、上游能力实测记录

统一：`POST https://copilot.tencent.com/v2/chat/completions`，请求头照 `build_headers`（`workbuddy.py:39`）。
模型选定过程：55 个模型中 9 个标为「非推理 + 支持工具」，但 `deepseek-v3-1` / `glm-4.6` /
`kimi-k2-instruct-taiji` / `completion-gf` 四个直连即 `400 / 11102 model [x] service info not found`，
本账号实际可用的非推理后端只有 `hunyuan-chat`。

### 3.1 `stop` 是否真截断（两个后端，含尊重 max_tokens 的那个）

| 轮 | 后端 | 请求 | 实测返回 |
|---|---|---|---|
| a | hunyuan-chat | baseline（提示要求输出 `###`） | `finish=stop` `ct=11` → `今天阳光明媚，微风不燥###晴` |
| b | hunyuan-chat | `stop=["###"]` | `finish=stop` `ct=13` → `今天阳光明媚，微风徐徐### 晴` |
| c | auto | baseline（预算 8000） | `finish=stop` `ct=481` → `好\n###\n行` |
| d | auto | `stop=["###"]` | `finish=stop` `ct=517` → `###好` |

c 有 `###`、d 也有 `###` → **两个后端均未在分隔符处截断**，`stop` 无效。
（d 的 `finish` 仍是 `stop` 而非截断类 `length`，是旁证而非反证。）

### 3.2 `max_tokens` vs `max_completion_tokens`（互相对照）

模型 `auto`，同一提示：

| 请求 | frames | `finish_reason` | `completion_tokens` | credit |
|---|---|---|---|---|
| `max_tokens=20` | 12 | `length` | **20** | 0.02 |
| `max_completion_tokens=20` | 102 | `stop` | **277** | 0.09 |
| 两个都不设 | 48 | `stop` | 147 | 0.05 |

→ `max_tokens` 在 `auto` 上真生效；`max_completion_tokens` **被完全忽略**（跑到了自然结束）。
但 `hunyuan-chat` 上 `max_tokens=12` 跑出 `ct=92`、`max_tokens=20` 跑出 `ct=117` 且 `finish=stop`
→ **`max_tokens` 的遵从性按后端不一致**，不能当全局保证。

### 3.3 `response_format` 是否真约束输出形状

| 后端 | 请求 | 实际正文开头 |
|---|---|---|
| hunyuan-chat | `response_format={"type":"json_object"}` | `以下是模拟的城市天气信息，包含 \`city\`…` （markdown 列表） |
| hunyuan-chat | 不带 `response_format` | 反而牛出了 ```` ```json ```` 围栏块 |
| auto | `response_format={"type":"json_object"}` | `以下是按照你的要求…\n\n### 1. 数据输出示例（JSON 格式）\n```json` |

两后端均 `json.loads()` 失败（`Expecting value: line 1 column 1`）——
**`response_format` 不产生任何约束力**，且不带它反而更容易得到 JSON（靠提示词）。

### 3.4 确定性与 `logprobs` 取值

| 项 | 后端 | 实测 | 结论 |
|---|---|---|---|
| `temperature=0.0` 两发 | auto | `辽阔` / `蔚蓝` | 不收敛 → 无生效证据 |
| `temperature=0.0` 三发 | hunyuan-chat | 三段开头均不同 | 同上 |
| `temperature=1.0, seed=777` 两发 | hunyuan-chat | `47` / `42` | 同种子不同答 → `seed` 无效 |
| `seed=11` / `seed=22` | hunyuan-chat | 都是 `42` | 异种子同答 → 同上 |
| `logprobs=true, top_logprobs=3` | auto / hunyuan-chat | 帧里 `choices[0].logprobs` **键存在但值恒 `null`** | 只 echo 空壳，无数据 |

### 3.5 非法值与未知键（解码行为探测）

全部 `200` 并正常回答：`max_tokens=-10`、`n=-5`、`top_p=99`、`temperature=-5`、
`presence_penalty=999`、`frequency_penalty=999`、`seed=-7`、`logit_bias={"abc":999}`、
`response_format={"type":"not_a_type"}`、`stream_options=5`、`logprobs="yes"`、**`probe_zzz=1`**。

报 `400 / 11101 Unmarshal chat params failed`：`stop=12345`、`user={"a":1}`。

> 这两个名单就是§1.3 判据的来源：上游只在**类型对不上**时说话，
> 其余一律默许。所以「200 + 不报错」对字段效力零信息量。

### 3.6 工具调用回路（网关全链路）

| 环节 | 实测 |
|---|---|
| 非流式带 `tools` | `finish=tool_calls`，1 个 call，`id` 有值，`arguments` 可 `json.loads` → `{'city':'北京','unit':'celsius'}` |
| 回填 `role=tool` 后继续 | `finish=stop`，正文 `北京当前气温 **21°C**，天气 **晴**` —— 整条 agent 回路闭合 |
| 流式带 `tools` | `tool_calls` 增量按 `index` 合并后 `arguments` 完整可解析，`finish=tool_calls` |
| schema 无损 | 带 `enum` / 嵌套 `object` / `required` / `additionalProperties=false` 的工具送达且参数合法 |

### 3.7 `tool_choice` 支持面（按后端）

| 后端 | `auto` | `none` | `required` | 非法值 `bogus_value` |
|---|---|---|---|---|
| hunyuan-chat | 200 | 200 | **500 `tool_choice invalid`** | **500** |
| auto | 200 | 200 | 200 | **200** |

→ `hunyuan-chat` 真校验取值（`required` 被拒），`auto` 路径连非法值都放过（根本不读）。
→ 网关把对象形式的 `tool_choice` 降为 `required`（`workbuddy.py:148-152`）在
`hunyuan-chat` 类后端上会把原本能跑的请求变成 500，属回归（§7 R1）。

### 3.8 目录内不可调模型

`/v1/models` 列 55 个，其中 `glm-4.6` / `deepseek-v3-1` / `kimi-k2-instruct-taiji` 直连即
`400 / code 11102 msg="model [x] service info not found"`，网关原样透传该 400（客户端可见业务码）。

---

## 四、入站逐字段 diff（同一请求两路对比）

请求：`model=hunyuan-chat` + `只回复两个字：收到`，分别直连上游与走网关，逐帧对比。

### 4.1 帧级与字段级

| 层 | 上游 | 网关 | 判定 |
|---|---|---|---|
| 帧数 | 3 | 3 | 一致 |
| `[DONE]` | 有 | 有 | 一致 |
| 顶层键 | `choices, created, id, model, object, usage` | `choices, created, id, model, object` | 丢 `usage`（上游每帧都带一个 `usage`，包内容帧）——无信息损失 |
| choice 键 | `delta, finish_reason, index, logprobs` | `delta, finish_reason, index` | 丢 `logprobs`（恒 `null`）——无害 |
| delta 键 | 7 个全发：`content, extra_fields, function_call, reasoning_content, refusal, role, tool_calls` | 只发非空的那个（本例 `content`） | 见下两条 |
| `delta.role` | **每帧都发 `"assistant"`** | **从不发** | ⚠ 真实缺口（§7 R3） |
| `refusal` / `function_call` / `extra_fields` | 每帧发空值 | 不发 | 正确（上游恒发空值，规格 §6.6） |
| `reasoning_content` | 有 | 有（思维链存在时以 `delta.reasoning_content` 下发；非流式放 `message.reasoning_content`） | 一致 |
| `tool_calls` | 有 | 有（按 `index` 合并） | 一致 |
| `index` | 恒 0 | 恒 0 | 单 choice 结构确认 |
| 收尾帧 | `(stop, usage=True, choices=1)` | `(stop, usage=True, choices=1)` | 语义保持 |
| `usage` | 13 键 | **13 键全量保留**（含 `credit` / `completion_thinking_tokens` / 5 个 cache 字段） | 无丢失 |

### 4.2 `stream=false` 与 `true` 是否等价

| 项 | `stream=false` | `stream=true` |
|---|---|---|
| 顶层 | `id, object, created, model, choices, usage` | 逐帧同构 |
| message 键 | `content, role`（+ 思维链时 `reasoning_content`；+工具时 `tool_calls`） | 对应 `delta` 同名字段 |
| `usage` | 13 键，`credit` 透传 | 13 键，收尾帧携 | 
| 工具调用 | `finish=tool_calls` + `message.tool_calls` | `delta.tool_calls` 增量 + 尾帧 `finish=tool_calls` |

两路字段集合等价，**没有只在一条路上存在的业务字段**；差异只在帧形（聚合 vs 增量）。
唯一不对称：非流式 `message` 有 `role`，而流式 `delta` 没有 `role`（见 4.1）。

### 4.3 错误状态映射

| 场景 | 客户端看到的 | 判定 |
|---|---|---|
| 未知模型 | `400` + `code=11102` + `msg` + 中文 `displayMsg` 拼接 | 业务码可见 ✓ |
| 目录内但无服务 | `400` + `code=11102 service info not found` | 同上 ✓ |
| Claude Code 系统提示 | `400` + `code=11128 Illegal API invocation…` | 原样透传 ✓ |
| 空/缺 `messages` | `400 invalid_request_error`（网关自查，未打到上游） | ✓ |
| `tool_choice` 对象形式（降 `required` 后） | `500` + `code=10000 HttpClient Stream error, status: 400 … tool_choice invalid` | ⚠ 上游自己把 400 包成 500，网关逐层透传（§7 R1） |
| 无 key / 错 key | `401` | 本地鉴权门 ✓ |

---

## 五、结构体成员表与对§二的修正

### 5.1 逐字段类型非法探测（hunyuan-chat，credit=0，共 28 项）

判据：类型不符 → `400 Unmarshal chat params failed` = 该键**在请求结构体里**；
200 = 解码时被丢弃，**根本不存在**。正对照 `model`/`messages`/`stream` 均如预期 400，
负对照 `PROBE_zzz` 如预期 200。

| 在结构体（13） | 不在结构体（15） |
|---|---|
| `model` `messages` `stream` `temperature` `top_p` `n` `stop`<br>`presence_penalty` `frequency_penalty` `user` `logit_bias` `prediction` **`reasoning_effort`** | `agent` `top_k` `seed` `logprobs` `response_format` `parallel_tool_calls`<br>`max_completion_tokens` `modalities` `audio` `store` `safety_identifier`<br>`web_search_options` `metadata` `include_reasoning` `PROBE_zzz` |

> 注：`top_logprobs` 未单测（与 `logprobs` 同族，而 `logprobs` 已确定不在结构体且响应里恒 `null`）。

这把§二里“未证实”的一批键分成了两类，结论更硬：

- **确定不存在、网关却一直在转发**（假接口实锤）：`top_k`、`seed`、`logprobs`/`top_logprobs`、
  `response_format` —— 四个全部在 `workbuddy.py:137-139` 的白名单里，被转发给一个
  **根本没声明这些字段的解码器**。
- **存在但效力未证**：`temperature`、`top_p`、`n`、`stop`、两个 penalty、`user`、`logit_bias`。
  其中 `stop`（§3.1）与 `n`（规格 §11 #23）已被行为证伪；其余仍属“送到位、不知道有没有人用”。
- **`agent` 意外不在结构体**：`workbuddy.py:134` 每请求都发 `"agent": "cli"`，
  但聊天端点的解码器不认识它 —— README 里“CLI 直调路径不进云端 Web 历史列表”这个理由
  在本端点上**缺乏依据**，需另行验证（历史列表可能由另一层控制）。这个字段目前实质是无害冗余。

### 5.2 `reasoning_effort` 是本轮唯一“支持且有效但本路没接”的 parameter

上游在结构体里收 `reasoning_effort`（字符串，非法值不报错）。行为实测（同一题，`max_tokens=4000`）：

| 模型 | 不设 | `low` | `max` | `bogus_level` |
|---|---|---|---|---|
| auto | completion=618 thinking=**429** | 332 / **156** | 950 / **748** | 382 / 196 |
| glm-5.3-flash | 292 / **0** | 293 / **0** | 1084 / **638** | 316 / 0 |

→ `max` 在两个模型上都把思维链拉起来了（429→748、0→638），`low` 在 `auto` 上把它压下去（429→156）。
→ **这是真实可控的推理档位**，与模型目录里的 `reasoning.supportedEfforts` 对应（规格 §8.2）。
→ 网关 `build_payload` 完全没转这个键（`workbuddy.py:137-139`）→ 分类 **②**。

### 5.3 `usage` 里的一个陷阱

上表 `reasoning` 列恒为 0：OpenAI 标准路径 `usage.completion_tokens_details.reasoning_tokens`
在 WorkBuddy 上**永远是 0**，真实思维链量在自有字段 `usage.completion_thinking_tokens` 里。
网关是全量透传（§4.1 usage 13 键无丢失），所以这不是网关缺陷，但**只读标准字段的客户端
会误判“这个模型不思考”**，建议面板/文档里明确标出。

---

## 六、消息侧

均走网关 8377（客户端视角），`model=hunyuan-chat`：

| 项 | 实测 | 结论 |
|---|---|---|
| 多条 `system` | `200` `finish=stop`，回复 `蓝色`（同时满足两条规则：中文 + 不超四字） | 不报错且不合并，原样送达；规则都生效 |
| `system` 不在首位 | `200` 正常回答 | 上游不要求 system 在首（与 magpie 的 `wbBody` 自动补系统提示做法不同，本路无需） |
| `content` 为数组（`{type:"text"}`） | `200`，`收到` | 两种形态均收（呼应 §5.1 #19） |
| `image_url` part | `200`，模型自述“当前模型不支持图像处理” | **形态被接受，但图未被读**——属模型能力，非网关翻译缺陷 |
| `assistant` 带 `tool_calls` + **2 个** `role=tool` 结果 | `200` `finish=stop`，`北京的当前温度是21摄氏度，上海的当前温度是18摄氏度` | 多工具并行回环完整可用 |
| 长上下文 ~12k / ~36k 字 | 均 `200` `收到` | 网关侧**无任何截断策略**，全文直送上游；超窗行为由上游决定（本路不拦、不提示） |

`tools` schema 无损性：带 `enum` / 嵌套 `object` / `required` / `additionalProperties=false` 的
工具定义送达后，模型回参可 `json.loads` 且字段合规（§3.6）；但 schema 内各约束的**语义遵从性**
（比如是否真按 enum 取值）未做证伪，记入 §8。

---

## 七、假接口风险清单（客户端发了、但被静默吐掉或无效力）

> 下表记的是**审计当时的状态**；R1/R2/R4–R8 已按 §十 处理（剔除转发或改降级方向），
> 未处理的只剩 R3 已修 + R9/R10/R11 属上游侧。

按危害排序。前两项是**本轮新引入或新确认**的。

| # | 风脸 | 触发方式 | 后果 | 位置 |
|---|---|---|---|---|
| **R1** | 对象形式 `tool_choice` 降为 `required` | 客户端传 `{"type":"function","function":{"name":…}}` | 在 `hunyuan-chat` 类后端把原本能跑的请求变成 **500**（旧行为降 `auto` 能跑） | `workbuddy.py:148-152` |
| **R2** | `max_completion_tokens` 不接 | 客户端用 OpenAI 当前推荐的新名（`max_tokens` 已被官方标废弃） | 该键**根本不在上游结构体里**（§5.1），网关也不映射 → **完全没有输出上限**，意外烧 credit + 超长返回 | `build_payload` 白名单未含 |
| **R3** | 流式 `delta.role` 从不发 | 任何 `stream=true` 请求 | 依赖首帧 `delta.role` 初始化 message 的客户端/SDK 拿不到角色；且与非流式路（有 `role`）不对称 | `server.py:178-207` / `make_chunk` `workbuddy.py:294` |
| R4 | `stop` 转发但无效 | 客户端用 `stop` 做硬截断/成本保护 | **不截断**，静默返回含分隔符的全文（键在结构体但不受用） | `workbuddy.py:137-141` |
| R5 | `response_format` 转发且**根不在结构体** | 客户端靠它保证下游可 `JSON.parse` | 解码阶段就被丢弃，拿到 markdown 散文，解析失败 | 同上 |
| R6 | `logprobs`/`top_logprobs` 转发且**根不在结构体** | 客户端做 token 级分析 | 响应里 `logprobs` 恒 `null`，永远拿不到值 | 同上 |
| R7 | `seed` 转发且**根不在结构体** | 客户端期望可复现输出 | 同种子不同答（`47`/`42`），**幂等/回归测试不可靠** | 同上 |
| R8 | `top_k` 转发且**根不在结构体**；`temperature`/`top_p`/两个 penalty/`user` 在结构体但无效力证据 | —— | `top_k` 是实锤无效；其余“看上去转发了” | 同上 |
| R9 | `max_tokens` 按后端不一致 | 同一个 `max_tokens` | `auto` 截断、`hunyuan-chat` 无视 → 行为不可预期 | 上游侧 |
| R10 | `/v1/models` 列 55 个，部分直连即 `11102` | 客户端照单选模型 | 选到 `glm-4.6` 类条目必然 400 | `list_models` `workbuddy.py:80` |
| R11 | 推理型模型 `max_tokens` 给小 → 空正文 + `length` | 客户端默认小预算 | 表现为“模型不回话”而非报错（已写进 README） | 上游侧 |

> 最关键的是 **R1/R2**：前者是本轮改动新引入的回归，后者是“看起来支持、实则无上限”的成本风险。
> R4–R8 的共同根因是§1.3：上游对非法值一律默许，所以「白名单里多一个键」看起来无害，
> 实际是在向客户端宣称一个并不存在的能力。

---

## 八、待办建议（审计阶段只建议不改动；执行情况见 §十与文末「首轮执行记录」）

> 下项执行情况见 §十（2026-10-10 14:40 已按本表改代码并验证）。

按优先级：

1. **回退 R1**：对象形式 `tool_choice` 重新降为 `auto`，别降 `required`。
   实测 `required` 在 `hunyuan-chat` 直接 500，而旧行为（`auto`）能跑 ——
   降级方向错了。想强制调用只能客户端自己挡。
2. **接 `reasoning_effort`（本轮唯一正当的补齐）**：把 `reasoning_effort` 加入白名单转发。
   来由已集齐：① 在结构体（§5.1）② 有行为效应（§5.2：`max` 使 thinking 429→748、0→638）
   ③ 模型目录已暴露 `reasoning.supportedEfforts`（规格 §8.2）——三个条件全满足，
   而它是本轮唯一一个真正“上游支持、本路漏接”的键。
   具体取值范围（`none`/`low`/`high`/`max`/`xhigh`）按模型而异，不要自己造。
3. **把白名单收到只剩行为级证据的键**。实锤应删：`top_k`、`seed`、`logprobs`、`top_logprobs`、
   `response_format`（五个根本不在结构体，§5.1）+ `stop`（在结构体但实测不截断，§3.1）。
   可保留：`temperature`、`top_p`、两个 penalty、`user`（在结构体，至少送达了解码器）。
   → **历史缘由要记清：上一轮按《聊天接口规格》§5.2 的「✅ 200（透传）」把这批键加进白名单，
   而 200 只是接受性不是效力，等于接了假接口。**
4. **接 R2**：`max_completion_tokens` → 映射到 `max_tokens`（后者在 `auto` 上实测生效）。
   上游不认 `max_completion_tokens`（§5.1 不在结构体），所以只能靠网关重命名，
   否则现代客户端默默没有输出上限。需同时注明 `hunyuan-chat` 类后端连 `max_tokens` 都不遵从。
5. **补 R3**：流式首帧发 `delta.role = "assistant"`，与 `stream=false` 路对齐。
6. **缓 R10**：`/v1/models` 附 `callable` 标记，或面板加“逐个试调”入口；
   至少不要把 `service info not found` 的模型当成可用列表卖给出。
7. **在面板/README 标出 `usage` 陷阱**：标准 `completion_tokens_details.reasoning_tokens` 恒 0，
   真实量在 `completion_thinking_tokens`（§5.3）。
8. **补测（本轮仍未完）**：`response_format.type="json_schema"`（文档 §11 列为未测，
   但鉴于 `response_format` 整体不在结构体，预期无效）；`tools` schema 约束的语义遵从
   （是否真按 `enum` 取值）；在结构体但未证效的 `temperature`/`top_p`/两个 penalty 能否找到
   可观测差异；global（workbuddy.ai）与企业账号；流中途 200 后出错的表现；
   `agent: "cli"` 到底由哪一层控制历史列表（§5.1）。

---

## 九、探针清单（可复现）

# 全部为临时脚本，跑完即不留存在仓库；关键参数如下，便于重跑：

| 探针 | 内容 | 关键输出 |
|---|---|---|
| #1 | `list_models(force=True)` 拉全目录，筛非推理+工具模型 | 55 个；9 个非推理候选；4 个实为不可调 |
| #2 | 直连上游：baseline / `stop` / `response_format` / `probe_zzz` / `n` | stop 无效；json 模式无效；未知键静默吐 |
| #3 | `logprobs` 可见性 / `seed` 确定性 / penalty | logprobs 键在有但 `null`；同 seed 不同答 |
| #4 | `temperature=0` 三连 / `logprobs` 取值 / `max_tokens` 跨模型 | 三发全不同；choice.logprobs=null |
| #5 | 在 `auto` 上复测（含预算不足导致的伪阳性） | `response_format` 仍无效；temp=0 仍不确定 |
| #7b | `auto` 上足预算判 `stop` | baseline `好\n###\n行` vs stop 变体 `###好` |
| #8 | 同请求两路字段 diff + 错误映射 | delta 丢 `role`；usage 13 键全留 |
| #9 | 错误映射 / stream 两路等价 / 消息侧 | 业务码 11102/11128 可见；500 逐层透传 |
| #10 | `tool_choice` 逐后端取值 | hunyuan-chat 拒 `required`；auto 连非法值都收 |
| #13 | 整条流读成原文再正则取 finish/usage | `max_completion_tokens` 无效（ct=277） |
| #14 | 非法值判别法 | `max_tokens=-10` 也 200 → 上游不校验取值 |
| #16 | 多 system / 数组 content / 双工具回环 / 长上下文 | 全 200；双工具回环答案正确 |
| #15b | 28 项逐字段类型非法探测（§5.1） | 13 在结构体 / 15 不在；`agent` 意外不在 |
| #17b | `reasoning_effort` 效应测量（§5.2） | `max` 使 thinking 429→748、0→638；`low` 压到 156 |

---

## 十、收口轮（2026-10-10 15:20–15:45）

把§八 第 8 项的空白补完，并把四项产品决策落地。

### 10.1 采样参数效力（新探针 #18/#20，hunyuan-chat，高熵题“随机想一个 1-1000 的整数”× 5-6 发）

| 参数 | 实验 | 结果 | 结论 |
|---|---|---|---|
| `temperature` | `=0.0` × 5 vs `=1.0` × 5 | 0.0 → **uniq=1**（5/5 都是 743）；1.0 → uniq=2 | **已消费**（正向证据）→ 保留转发 |
| `top_p` | 在 `temperature=1.0` 基线上比 | 基线 uniq=2；`top_p=0.0001` uniq=2；`top_p=1.0` uniq=2 —— **未收敛** | **未消费** → 已从白名单剔除 |
| `presence_penalty`/`frequency_penalty` | 重复诱发题 | `=-2` 使输出 83→197 字（去重比 0.084→0.223）；但 `=+2` 两轮都与基线完全一致 | **不一致**，保留转发但标“效力未定”；不能再归入“已验证” |
| `user` | 无可观测面 | —— | 保留转发，标“不可观测” |

> 上一轮说“`temperature` 无生效证据”是错的——那两次差异出自开放式选题（近义词本就可以打平）。
> 改用高熵选数题后，`temperature=0.0` 做到 5/5 完全一致，是明确的正向证据。
> **教训：证伪一个采样参数需要设对照基线 + 正确题型，不能拿“两答不同”直接下结论。**

### 10.2 `tools` schema 语义遵从（探针 #21）

把 `city` 的 `enum` 限成只有 `北京`、带 `required:["city"]` 与 `additionalProperties:false`：

| 提问 | 结果 |
|---|---|
| “北京的二等座有票吗？” | `args={'city':'北京','seat':'二等座'}` —— enum 内✓ 无多余键✓ required齐✓ |
| “上海有票吗？”（enum 外） | `finish=stop`，**没有调用工具**，也没有编造 `city=上海` |

→ schema 送达且被遵守（未出现越界参数）。保留告警：样本很薄，“不调用”不等于“被强制”。

### 10.3 `agent: "cli"` 的真相

官方 `copilot.tencent.com/v2/chat/completions` 的结构体里没有 `agent`（类型非法也不报错）。
溯源发现这个字段来自**我们自己的早期探针脚本 `re/wb_agent.py:125`**（那里还一并带了
`reasoning_summary`、`conversationRequestId`），并非官方抓包所得——属于被不当断链
复制进网关的字段。已在 `workbuddy.py` 注释里改成“不应期望它影响历史列表”。
历史列表到底由哪层控制属 conversation-sync，仍是全系列未结项 #7。

### 10.4 global（WorkBuddy AI）路——本机实测通了

本机存在 `%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop-ai.info`
（**与网关用的 `~/.workbuddy/checkin/auth.json` 不是同一个文件**），为**明文**可读：
`domain=www.workbuddy.ai`，accessToken/refreshToken 都是 plain string，`expiresAt` 未过期。
用它直打 `/v3/config`：

| 端点 | http | code | models |
|---|---|---|---|
| `https://www.workbuddy.ai/v3/config` | 200 | 0 | **28** |
| `https://copilot.tencent.com/v3/config` | 200 | 0 | 55 |

→ global 路协议上是通的（与 magpie 的 `wbAI` 定义一致），但 **WorkBuddy2api 现在到不了它**：
`credential.AUTH_STORE` 只读签到脚本的 CN `auth.json`，没有 AI 账号入口。属功能范围问，
不是缺陷。另：账号对象里带 `accountType`/`idp`/`isCurrentOneIdEnterprise` 等字段，
企业维度就存在这里。

### 10.5 可调性标记（已实现）

`probe_models` 对目录内每个模型发一发 `max_tokens=8` 的极小请求，结果落 `models_probe.json`
（TTL 1 天），`/v1/models` 附 `callable`；**启动不自动跑**，只由面板按钮或
`POST /admin/api/probe-models` 触发（要消耗真实 credit）。

本账号 2026-10-10 15:30 全量扫描：**55 个全判，38 可调 / 17 不可调（均 `code=11102`）**：
`hy4-preview-x` `minimax-m2.5` `glm-4.6v` `kimi-k2-thinking` `glm-4.6` `deepseek-v3-1-volc`
`kimi-k2-instruct-taiji` `completion-gf` `default-1.1` `hunyuan-3b` `hunyuan-7b-dense`
`codewise-completions` `deepseek-r1-0528` `deepseek-v3-0324-taco-completion` `default-1.2`
`hunyuan-image-alpha` `hunyuan-image-alpha-edit`（后两个是 `11103`）。

第一版探测把**网络抖动误记成“不可调”**（12 项 `code=None`），已修：连接失败记
`probed=False`、`callable=null`，不当结论缓存、下次重探；重跑后 `undecided=0`。

### 10.6 本轮落地的四项产品改动

| 项 | 做法 | 实测 |
|---|---|---|
| `/v1/models` 可调性 | `callable` + `callable_code`（null=未探测），面板 “本账号可调” 卡片 + 「探测可调性」按钮 | 55/55 已标，17 个标 false 呲划 |
| `usage` 陷阱提示 | overview 返 `usage_note`，面板“用量提示”行 | `reasoning_tokens 恒为 0；真实思维链量看 completion_thinking_tokens` |
| 接入 AtomCode | `config.toml` 只**追加** `[provider_accounts.WorkBuddy2api]` + 三个模型条目（参数取自实读目录：`auto` 256000；`glm-5.3-flash` 1000000 + 档位 low/high/max；`hunyuan-chat` 128000） | 三者均 `callable=True` |
| 常驻 | `start-WorkBuddy2api.bat`（pythonw 无窗启动、已在监听则跳过；登录自启由计划任务 WorkBuddy2api 直跑 pythonw，2026-10-10 起 ps1 已删） | 任务 State=Ready；网关现以 pid 17644 无窗运行 |

两个实现细节：`.ps1` 改成**纯 ASCII**——Windows PowerShell 5.1 把无 BOM 文件按 ANSI 读，
中文会把引号弄坏（第一次 `-Register` 直接解析失败）；计划任务里存 `pythonw.exe` 的
**绝对路径**，避免 PATH 差异导致静默起不来。

### 10.7 仍开着

- `response_format.type="json_schema"` 未测（按 `response_format` 整体不在结构体推断预期无效）
- penalty 的正向效应（+2 与基线完全一致）未能诱发，需更好的题型
- global 账号入口（需设第二个凭证源，与当前“只读签到脚本 auth.json”的设计相左）
- 企业/`accountType` 不同一档的模型可见差
- conversation-sync（全系列未结项 #7）——才能定论“历史列表由哪层控制”

---

## 首轮执行记录（2026-10-10 14:40）

审计完成后按§八执行，仅改 `workbuddy.py` 与 `server.py` 两个函数体；全部项已实测。

| 待办 | 动作 | 位置 | 验证输出 |
|---|---|---|---|
| 1 回退 R1 | 对象形式 `tool_choice` 由降 `required` 改回降 `auto` | `workbuddy.py` `build_payload` | 走网关发对象 `tool_choice`：`http=200`（改前 `500 tool_choice invalid`） |
| 2 接 `reasoning_effort` | 加入白名单转发 | 同上 | 经网关同题：`effort=None` thinking=164 → `effort=max` thinking=**503**（credit 0.11→0.28） |
| 3 收紧白名单 | 剔除 `stop`/`response_format`/`logprobs`/`top_logprobs`/`seed`/`top_k`；保留在结构体的 `temperature`/`top_p`/两个 penalty/`user` | 同上 | 离线映射：`build_payload` 产物中这 6 个键均不存在；`temperature=0.2` 仍在 |
| 4 接 R2 | `max_completion_tokens` → 重命名映射到 `max_tokens`，同时传时 `max_tokens` 优先 | 同上 | `max_completion_tokens=300` 无 `max_tokens` → payload `max_tokens=300`；两者同传（11/999）→ **11** |
| 5 补 R3 | 流式首帧 `delta` 带 `role="assistant"` | `server.py` `generate()` | 首帧 delta = `{"role":"assistant","content":"收到"}` |
| 5附 模型目录 | `to_openai_model` 新增 `reasoning_efforts` / `only_reasoning` | `workbuddy.py` | 55 个模型中 16 个带档位，如 `hy3 → ['low','high'] only_reasoning=True` |

**全量回归（改动后）**：无 key `401`；非流式 `收到` / `finish=stop` / `message.role=assistant`；
工具调用 `finish=tool_calls` + 1 call + `arguments` 可 `json.loads`；`role=tool` 回环续答
「北京当前温度是21摄氏度。」；流式 `finish=stop` + 独立 usage 帧 + `[DONE]` + 首帧带 role，
`usage.credit` 全量透传。`py_compile` 三模块全过，网关已重启。

**当时未动、已在 §十 补上的两项**：`/v1/models` 的 `callable` 标记（38 可调 / 17 不可调）
与面板的 `reasoning_tokens=0` 提示；自启与接入 AtomCode 见 §十 10.6。

---

### 附：本审计判据（§1.3 同文重申，供直接翻到文末的人查阅）

把任意键注入上游请求体，观测到三类行为：

1. **未知键静默丢弃** —— `probe_zzz=1` → `200` 正常回答。上游把 body 反序列化进 Go 结构体，
   结构体外的键被解码器直接扔掉，不报错。
2. **只有类型不符才报错** —— `stop=12345`、`user={…}` →
   `400 / code 11101 Unmarshal chat params failed with error: json: cannot unmarshal number into Go struct field …`。
   这是**唯一**能反推「该键在结构体里」的可靠信号。
3. **范围/逻辑非法值一律静默接受** —— `max_tokens=-10`、`temperature=-5`、`top_p=99`、
   `presence_penalty=999`、`frequency_penalty=999`、`seed=-7`、`n=-5` 全部 `200` 正常完成。
   其中 `max_tokens=-10` 也是 200，而 `max_tokens=20` 确实截断 —— 说明**上游不校验取值**，
   非法值被 clamp 或忽略。

> **本审计判据**：`200` 只证明「上游没被这个键搞崩」，**不证明上游读了它，更不证明上游按它行事**。
> 《聊天接口规格》§5.2（208-242 行）那批「✅ 200（透传）」是**接受性**结论、不是**效力**结论。
> 判「支持」必须给出**可观测的行为差异**：截断点、取值合规、确定性、字段真被填上。
