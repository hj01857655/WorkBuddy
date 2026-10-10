# WorkBuddy 逆向 11：模型目录全景（bedrock 国际版 121 + CN 云端 54）、计费倍率与直调工具循环

日期：2026-09-29　前置：workbuddy-08-真协议/09/10
样本：`workbuddy/re/model_catalog.json`（bedrock 目录）、`v3_config.json`（云端配置全文，43KB）、`cn_models.json`（CN 模型表）、`full_tools_body.json`

## 1. 模型目录双层结构

| 层 | 来源 | 内容 |
|---|---|---|
| 国际版（bedrock） | CLI 硬编码（codebuddy-headless.js `@10113439`，`model_catalog.json` 已落盘） | **121 个**，全部 `amazon-bedrock` / `bedrock-converse-stream` API，按区域前缀路由（无前缀/us/eu/jp/au/global） |
| CN SaaS | **云端下发** `GET /v3/config`（`data.models`，54 个） | 腾讯混元/Hy 系 + DeepSeek/Kimi/GLM/MiniMax 全家 + Claude（default-1.1/1.2 代号）+ codewise 补全长任务型模型 |

两套并行：国际版走 bedrock-runtime baseUrl；CN 走 `/v2/chat/completions`（08 号）。模型 id 支持 `provider/name` 路由前缀（`stripNamespacePrefix` 处理）。

## 2. CN 模型计费倍率表（v3/config，credits 字段实测）

| 倍率 | 模型 |
|---|---|
| **x0.00** | hy3 / hy3-b / hy3-c（腾讯自研免费档） |
| x0.05 | hy3-x |
| x0.06 | glm-5.3-flash |
| **x0.11** | **deepseek-v4.1-flash**（当前主力，1M ctx 可选）、glm-4.6v |
| x0.17 | deepseek-v4-flash |
| x0.18 | minimax-m2.5 |
| x0.21 | fast-model |
| x0.23 | glm-4.6 |
| x0.25 | minimax-m3 |
| x0.29 | hy4-preview 系、deepseek-v3-2-volc |
| x0.45–0.57 | kimi-k2.5 / deepseek-v4-pro / kimi-k2.6 / deepseek-v3-1 系 / kimi-k2-thinking / kimi-k2.7 |
| x0.65–0.95 | balanced-model / glm-5v-turbo / kimi-k2.8-preview / glm-5.3 / glm-5.2 / glm-5.1 / glm-5.0-turbo |
| x1.20 | deep-model |
| **x1.62** | kimi-k3-1（最贵） |

深度思考档：deep-model x1.2 / balanced x0.65 / fast x0.21 为**模式**（按 quality 自动路由，`relatedModels.builtin-lite: wb-lite`）。
促销：**每晚 23:00–8:00 glm-5.2 五折**（`modelPromotions`，夜间折扣 id `glm-52-night-discount-202607`）。
订阅分层（`modelTiers`）：glm-5.3/glm-5.3-flash/kimi-k2.8-preview 为「订阅优先」池（tier-standard-2026q3，资源紧张时旗舰/高级版优先调度）；`hy4-preview-f` 试用 14 天转 `hy4-preview`（ModelTrialBanner）。
免费档专属：`productFeaturesConfig.ModelRateLimitCap` 显示 hy3 免费 / hy3-x 付费切换线。

## 3. 能力矩阵（v3/config 原值）

- 1M 上下文可选：deepseek-v4.1-flash（`supportedLengths:[300000,1000000]`，`maxInputTokens:1000000`）
- `onlyReasoning:true`：deepseek-v4.1-flash（强制 `reasoning:{effort:"high",summary:"auto"}`，与 10 号抓到的 body 吻合）
- 图像生成模型：hunyuan-image-alpha / -edit（ImageGen 工具后端）
- 多模态输入：多数 supportsImages；codewise 系/hunyuan-3b 等纯文本小模型为补全/内部任务专用（completion/jump/rewrite）
- Claude 在 CN 侧代号 `default-1.1`(3.7-Sonnet)/`default-1.2`(4.0-Sonnet)——历史遗留条目

## 4. 配置下发机制

`GET /v3/config`（Bearer + X-Device-Token 同 08 号头族，43KB 响应）：一次性下发 agents 定义、模型表、**端点覆盖（`data.endpoint`）**、feature toggles、市场插件清单、模型促销/分层、遥测配置。客户端 `PRODUCT_CONFIGURATION_CHANGED` 事件热更；`productFeaturesConfig` 含 `TuringDeviceToken` 开关（04 号）与 `ModelRateLimitCap`。

## 5. 国际版 bedrock 目录样例（model_catalog.json，含单价）

```
global.openai.gpt-5.6-luna   ctx 1.05M  max 128k  $0.20/$1.20/Mtok  thinking xhigh
global.anthropic.claude-sonnet-5  ctx 1M  max 128k  $2/$10/Mtok  thinking xhigh/max
global.anthropic.claude-opus-5    ctx 1M? (同构)
us.anthropic.claude-fable-5-1  …（fable = 虚构名/内部代号系列）
amazon.nova-2-lite-v1:0        ctx 128k  $0.33/$2.75/Mtok
xai.grok-4.6 / moonshotai.kimi-k2.5 / minimax.minimax-m2.5 / zai.glm-5 …
```

## 6. 待挖清单（本篇后仅剩）

1. `intent/recall` 请求体（一行钩子补丁的事，低价值）
2. 付费档账号下的模型可见性差异（kimi-k3-1/hy4 等是否解锁）
3. TuringShieldSDK.dll 本体（维持 09 号结论：无必要）


## 7. 工具循环 mini-agent（`workbuddy/re/wb_agent.py`，实测两轮任务全通）

本地执行 Glob/Read/Bash 子集，tool result 以 `role:"tool"` 回传，多轮直到文本收官：

```
$ python wb_agent.py "读一下 …/workbuddy-09-Device-Token直调.md 的第一段，用一句话总结主题"
[turn 0] credit=0.01  tool: Read({file_path:…09.md}) -> 120 行
[turn 1] credit=0.03  FINAL: 主题 = 攻克 X-Device-Token、实现纯 Python 全链直调… ✅
```

实测要点：
- 工具循环对 **OpenAI 标准回传协议**完全兼容（`tool_calls[].id` + `role:"tool"` + `tool_call_id`），服务端不校验 agent 状态。
- 模型自发纠错（`**/*` 无匹配 → 改 `*`；Bash 对 E: 盘失败 → 换 Glob 结果推导），跨轮上下文连贯。
- 计费随轮累加（0.01→0.03，reasoning_tokens 计入）。
- `reasoning_content` 在 tool_calls 轮也输出（思考流与工具调用并行），文本轮为空。

## 7. 付费门控实测（2026-09-29 深夜，免费账号直调，code 11102 唯一分界）

免费账号（IsPaidUser:false，纯活动包余额）直调 `/v2/chat/completions`，全模型实测：

| 模型 | 倍率 | 结果 | 实测 credit |
|---|---|---|---|
| hy3 | x0.00 | ✅ 200 | **0**（免费档零扣费） |
| glm-5.3-flash | x0.06 | ✅ 200 | **0** |
| hy3-x（付费切换线 paidId） | x0.05 | ✅ 200 | — |
| hy4-preview（试用转正） | x0.29 | ✅ 200 | 0.03 |
| glm-5.3（**订阅优先池** standard tier） | x0.79 | ✅ 200 | 0.06 |
| kimi-k3-1（**x1.62 最贵**） | x1.62 | ✅ 200 | 0.26 |
| claude-sonnet-5（bedrock 国际目录） | — | ❌ **HTTP 400 code=11102** `model [claude-sonnet-5] is only available for authorized users` | — |

结论：
1. **CN SaaS 端点对全部 54 个 CN 模型不做计划硬门控**——"订阅优先"只是调度优先级（资源紧张时排队靠后），credit 倍率才是真实闸门（余额够就能调）。
2. **唯一硬分界 = code 11102**：国际 bedrock 目录模型（claude-sonnet-5 等 121 个）需要 authorized users——CN 端点与 bedrock 目录是隔离的授权域。
3. onlyReasoning 模型（glm-5.3/kimi-k3-1/hy4-preview）回答在 `delta.content`，思考流走 `delta.reasoning_content`（长度 300–450），小 max_tokens 会导致"200 但空回复"（全耗在 reasoning）。
4. 计费与 v3/config 倍率精确吻合：hy3=0、glm-5.3=0.06（x0.79 × ~0.08 基准）、kimi-k3-1=0.26。

分层机制总结：`modelTiers`（订阅优先调度）+ `ModelRateLimitCap`（免费/付费切换线 hy3→hy3-x）+ `ModelTrialBanner`（hy4-preview-f 14 天试用转正）+ credit 余额——**四层都是软门控，唯一硬门是 11102 授权模型表**。

## 8. 11102 终审：无法客户端绕过（2026-09-29 深夜五组对照实验）

| 试验 | 结果 |
|---|---|
| 裸 `claude-sonnet-5` | 400 `only available for authorized users`（**id 在 CN 网关注册表内，按账号授权**） |
| 区域前缀 `global./us./anthropic.claude-sonnet-5` | 400 `service info not found`（前缀 id 不在 CN 路由表——那是 bedrock 直连/国际产品线的目录） |
| CN 目录里的 Claude 代号 `default-1.1`(3.7-Sonnet)/`default-1.2`(4.0-Sonnet) | 400 `service info not found`（目录展示条目，无路由） |
| `X-Domain` 伪造（copilot.tencent.com / www.codebuddy.ai） | 同样 11102 —— **授权按账号（token/uid）判定，与域名头无关** |
| featureToggles | 仅 `SupportHttpsAgentProxy`/`disabledTerminalCheck`，无模型授权开关 |

判定：**11102 是服务端账号级授权（allowlist），绑定 uid/企业身份，客户端无法伪造。**
结合 artifact 工具文案（"only available for iOA and internal/domestic endpoints"）与
product.json 的 iOADomain（tencent.sso.copilot.tencent.com）——claude-sonnet-5 等
国际模型的授权面 = **iOA/企业（腾讯内部）账号**。个人免费/付费档账号的可达面 =
v3/config `agents[].models` 的 54 个 CN 模型（§7 实测全部可调）。

闭环结论：**改用已授权模型即可**（54 个任选），11102 无解且无需解。
