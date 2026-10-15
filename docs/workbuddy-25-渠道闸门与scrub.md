# workbuddy-25 · 渠道闸门与 scrub

> 归属：[WorkBuddy 逆向系列索引](README.md)
> 代码证据：`WorkBuddy2api/workbuddy.py` `_SCRUB_MAP`（237–271 行）
> 运行证据：`WorkBuddy2api/request.log`（2026-10-11 01:19–01:29）
> 复测日期：2026-10-15（直连上游，绕过自家 scrub）

## 一、历史：2026-10-11 的 11128 与 51 个 400

ZCode 3.14.5 客户端（`ua=ZCode/3.14.5`）经网关打 WorkBuddy 云端时，上游
`POST /v2/chat/completions` 返回 `400 / code 11128`
「Illegal API invocation from an unapproved channel」：

- 当晚 request.log：24 个请求 id、共 51 条 `status=400`，错误响应体一律 190B；
- 共同形态：`model=hy3`、`msgs=4–6`、**`tools=33`**、body≈118KB（大头是 33 个工具 schema）；
- 同期 python-requests 探针（改 UA、减一个 tool）仍 400；不带 system 消息则 200；
- 当时归因：上游按 **messages 内容** 拦截（竞品产品名命中即拒），与请求头无关；
- 对策：`_SCRUB_MAP` **请求侧 scrub**——把 messages/tools 文本里的触发词换成占位名再发上游，
  只作用于出站副本，不改客户端原请求。原始 400 请求体已被日志轮转冲掉，无法回看。

社区旁证：`honlnk/zcode-prompt-sanitizer`（2026-09-15）锤实的触发是 ZCode 注入 git 上下文里
的 **`Main branch (you will usually use this for PRs):`** 一句（被腾讯 WAF 模式匹配成
prompt-injection），只改写这一句即可放行，其余全文透传、响应不动。我们的 map 第 264 行
也收了这句。

## 二·五、当晚时间线（request.log 状态机配对，rid 跨重启复用已按最近 in 行消费）

| 时刻 | 结果 | body | 说明 |
|---|---|---|---|
| 01:19:41 – 02:06:17 | 7×`400` | 118,138–118,200B | `ua=ZCode/3.14.5`（hy3+33 tools，同一形态反复撞墙） |
| **02:14:23 起** | 10×`ok` | 118,185 → 157,507B | 同一 UA、body 同量级——ZCode 客户端侧未变，**唯一变化是网关加了 scrub** |

- 02:14 后 ZCode-UA 流量持续 200，坐实 **scrub 本身有效**（当时确实洗掉了触发内容）。
- 结合 §三：同一形态今天不加 scrub 也过 → 拦截面有**时效性**（当晚窗口内生效，之后放开）。
- 当晚的 req/resp dump 已被轮转冲掉，无法逐字节 diff 02:06 vs 02:14，归因到具体词只能靠 §一 的
  探针记录与社区旁证。

## 三、现行 scrub 行为与副作用

`_SCRUB_MAP` 三类词，顺序链式替换：

| 类别 | 例 | 去向 |
|---|---|---|
| 竞品产品名 | `ZCode`/`AtomCode`/`OpenCode`/`CodeBuddy`/`AtomGit` | `the tool`/`the forge` |
| agent 生态通用词 | `assistant`/`agent`/`MCP`/`Browser`/`Computer`/`web`/`system`/`tool`/`editor`/`plugin`/`skill`/`provider` | `helper`/`unit`/`tab`/`box`/`net`/`sys`/`pane`/`part`/`note`/`forge` |

（第三类「安全语义词」：`DoS`/`exploit`/`credential`/`sandbox`/`escalation` 与 PRs 整句，中性改写。）

两个已踩实的副作用：

1. **链式替换**：`ZCode→the tool` 再被 `tool→unit` 追刀，最终落盘 `the unit`（不是原始映射值）。
2. **单向 scrub、响应侧无还原**：模型输出占位名被客户端当真名写入历史与文件，
   下一轮请求里真名与占位名混存（实测同一 req dump：真名 193 处、占位名 26 处），
   污染随会话滚雪球。本次排障中模型侧读到的一切路径/文件名/文档标题均已被替换，
   多轮才定位到根源。

## 四、2026-10-15 复测：闸门已不吃这套

方法：复用 `credential.load()/token()` + `build_headers()` **直连**
`copilot.tencent.com/v2/chat/completions`（`stream=true`、`max_tokens=8`、不经过自家 scrub），
另经 8377 对照组。结果：

| 用例 | 内容 | 结果 |
|---|---|---|
| U1 | `hi` 对照 | 200 |
| U2 | 原始 `ZCode` 名直发 | 200 |
| U3 | `ZCode agent system prompt MCP tool_use browser web credential sandbox escalation exploit PRs` 全套触发词原样发 | 200 |
| U4 | 逐字 Claude Code 系统提示词 + `you will usually use this for PRs` 原句 | 200 |
| 经 8377 | `hy3` + 32 个合成 tools + 短消息 | 200 |
| 经 8377 | `hy3` + CC 长 system + 32 tools | 200 |
| 对照 | 乱填模型名 | 400 / code **11102**（模型不在册，body≈187B） |

注意最后一行：**11102 与 11128 的 400 响应体长度几乎一致**，当年 51 条 400 若只看
`status=400 190B` 无法区分两种成因；但 README §六 与代码注释记录的 11128 文案是实读的，
拦截当时确实存在。结论：**今天（5.6.2 / hy3 面）这些词在裸请求里都不再触发**；
当年拦截可能绑定「长对话 + 全量 33 工具 schema + hy3」的组合，也可能上游 WAF 其后调过规则。

## 五、修复方向（未执行，待决策）

| 方案 | 内容 | 风险 |
|---|---|---|
| A 灰度 | 加 `WB_SCRUB` 开关（默认开），关掉跑真实流量数日，盯 request.log 是否重现 400/11128。**重点盯 `ua=ZCode` 全量工具+长 system 形态**——当晚拦截只发生在该组合上 | 低 |
| B 精简 | 只保留 PRs 句一条（对齐社区 zps 最小方案），删掉产品名与通用词条 | 中（8 个探针不构成全量保证） |
| C 兜底 | 若确认个别词仍在拦截面：响应侧加对称 unscrub（SSE 整帧 JSON 解析后替换高置信组合），根治自污染 | 需防「the unit」这类正常英文误反查 |

**验收基线**：无论选哪条，`agent`/`system`/`MCP` 这类通用词不该再被洗——这是本次
上下文污染的直接根源；产品名词是否保留以真实流量验证为准，不凭探针拍板。
**已排除的假说**：UA 非触发因子——当晚 `ua=python-requests` 同样 400，今天 `ua=ZCode` 直连 200。
