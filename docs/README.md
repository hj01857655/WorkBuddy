# WorkBuddy 逆向系列（01–25）索引

目标：WorkBuddy 5.6.2（腾讯 AI 办公 Agent，Electron 定制 fork，内部代号 genie）
工作区：`workbuddy/re/`（工具+抓包+解包产物，git-ignored）　本文档：`workbuddy/docs/`（入库）

> **2026-10-10 参数效力复核已回写上游文档**（由 24 号审计驱动）：
> 《docs/聊天接口规格》§5.2 重写（新增 §5.2.1 结构体成员表与判据）、
> 《docs/网关协议清单》§四 可选参数改分三档、《docs/网关项目设计》§七 新增第 8/9 条验收基线、
> 《docs/认证与签到协议》§五 补「赛季活动与日签是两个维度」、
> 本索引 12 号改指现行目录版并标记 `re/WorkBuddy2api.py` 停维。
> **旧文档里那批「✅ 200（透传）」只证明接受性、不证明执行，不得再当接线依据。**

## 阅读顺序 / 索引

| 篇 | 主题 | 一句话结论 |
|---|---|---|
| [01](workbuddy-01-侦察与架构.md) | 侦察与架构 | Electron 37 定制 fork；rolldown 保留全注释；云端 CN_SAAS_CORE_API 三层故障转移 |
| [02](workbuddy-02-凭证加密破解.md) | 凭证静态加密破解 | 构建密钥在原生 `workbuddyStorage` 绑定，CDP 十秒提取；suite-1 AES-GCM 全解 |
| [03](workbuddy-03-ACP与签到计费.md) | ACP 方法面 / 签到计费 | Streamable HTTP ACP；`/billing/meter/daily-checkin` |
| [04](workbuddy-04-QIMEI与风控.md) | QIMEI / 风控 | appKey、SDK 序号接口、`CODEBUDDY_QIMEI36` 分发 |
| [05](workbuddy-05-威胁库.md) | 威胁库 / betterleaks | 45.7 万域名黑名单（xxh64+盐全破）、沙箱密钥扫描器 |
| [06](workbuddy-06-协议实调.md) | 协议实调 | 自建客户端打通 REST+沙箱凭证+ACP |
| [07](workbuddy-07-agentos拓扑.md) | agentos 拓扑 | 事件投递边界、三层注入捕获工具链 |
| [08](workbuddy-08-真协议.md) | **真协议** | 桌面对话实际走 `/v2/chat/completions`（OpenAI 兼容），全量头+体 |
| [09](workbuddy-09-Device-Token直调.md) | Device-Token + 直调 | turing_sdk.node 独立调用；纯 Python 直调打通 |
| [10](workbuddy-10-工具面.md) | 工具面 | 23 工具全 schema、function calling 闭环、credit 计费 |
| [11](workbuddy-11-模型目录.md) | 模型目录 | bedrock 121 + CN 云端 54、计费倍率全表、**付费门控实测**（11102=iOA/企业账号授权，客户端无解，CN 54 模型全可调） |
| [12](workbuddy-12-网关.md) | **WorkBuddy2api 网关** | OpenAI 兼容本地网关（models/chat/stream/tools）。**现行成品是 `WorkBuddy2api/` 目录版**；`re/WorkBuddy2api.py` 属早期 stdlib 单文件版、已停维。参数效力面以 24 号为准 |
| [13](workbuddy-13-未探索地图.md) | 未探索子系统地图 | 15 项剩余面：难度/价值/优先级总账 |
| [14](workbuddy-14-沙箱IPC全破.md) | **本地沙箱 IPC 全破** | NDJSON 17 命令、管道名算法、RunExecutable 直调实测 |
| [15](workbuddy-15-云端数据面全破.md) | **云端数据面协议全破** | envd 文件系统+**进程执行信封流**实测、签名算法 |
| [16](workbuddy-16-guest-SDK.md) | guest SDK（window.wb 嵌入桥） | 33 方法 + 33 事件 + 权限命名空间，v1.0 |
| [17](workbuddy-17-MCP-Apps-Host.md) | **MCP Apps Host** | `ui://` UI 扩展系统 20 节完结：20 个 RPC channel 全表 + gateway 47KB 编排 + **六条安全不变量**（真实路径查两次防 symlink）+ 敏感字段/签名 URL 剥离 + 三跳中继；顺带定位 ardot 准入与产物链 |
| [18](workbuddy-18-腾讯文档AI引擎.md) | **腾讯文档 AI 引擎** | 独立进程 + 端口文件跨进程发现（默认 39099，stdout 就绪检测）；工具前缀两套；25 格式含 WPS；`globalPadId=md5(path)` 稳定文档身份；`editor_sdk.exe` 204.6MB；routing-prompt 全文（首轮 HEADER/后续 RECALL，每会话只触发一次 skill） |
| [19](workbuddy-19-agent-gateway.md) | **agent-gateway / CloudAgent / AgentIM** | `server.js` = **1012 个 region 的矿脉**（同 17 号可读性档）。A2A 实质 = `/v2/user/cloudagent/*` 自建 Agent 全生命周期 CRUD + `/console/agent-gateway/*` MCP 聚合网关。AgentMail 双网关分段（账号态/数据态按 alias 分片）。IM 默认通道 `wechatbot`，QQ 扫码连接 + 三重失败回滚 |
| [20](workbuddy-20-IM通道体系.md) | **Claw IM 通道体系** | **修正 01 号：12 个通道不是 6 个**（wecom 三套 + 微信三套 + 飞书/钉钉/QQ/Slack/Telegram/Discord/元宝/自定义）。`IOA_ENTERPRISE_IDS` 硬编码两家企业。**单飞节流中继**（`close()` 主动丢弃待发帧）。11 个幂等 Map |
| [21](workbuddy-21-插件管理.md) | **插件管理体系** | `plugin-manager.ts` **283.4KB（全 server.js 最大）**，40+ region。**`weixinpay` 插件签名验签六分支判定**；「校验层必须跟随谁拉起进程迁移」（CLI→daemon 下沉）。git SHA 四步复核。文件锁重试差 12 倍。`.orphaned_at` + 14 天保留期 |
| [22](workbuddy-22-会话核心.md) | **会话核心** | `session-manager.ts` **242.9KB** + 30 region。**cwd 预检四条"故意如此"**（无兜底/结构化错误/**异步 fs 防 macOS TCC 弹窗卡死 event loop**/daemon 文案保持英文）。**`session-mutation-policy` 闸门为何不能一刀切**（迁移未完成时闸门过严会永久卡在 pending + DB/内存不一致 #86427）。运行时配置只在空闲点生效 |
| [23](workbuddy-23-安全中心.md) | **安全中心** | `security-center/service.ts` **43.2KB**：沙箱规则 / 系统工具策略 / 敏感操作反向审批 / 审计日志，全走 RPC 通道。**纯本地子系统、无云端点**（全文检索无 `/security*` `/audit*` `/sandbox*`），与 05 号的云端威胁库是两套。验证口径：静态逆向 |
| [24](workbuddy-24-协议翻译完整性审计.md) | **协议翻译完整性审计** | 只读+实调（2026-10-10 13:40–14:10）。**上游把 body 反序列化进 Go 结构体：未知键静默丢弃（`probe_zzz=1`→200），只有类型不符才 `400/11101 cannot unmarshal … into Go struct field`，取值非法一律默许（`max_tokens=-10` 也 200）→ 「✅ 200 透传」只是接受性、不是效力**。行为级证伪：`stop`（baseline `好\n###\n行` vs `stop=["###"]` 仍出 `###好`）、`response_format` json_object 返 markdown 散文、`logprobs` 恒 `null`、`temperature=0.0` 两答不同、`seed` 同种子不同答、`max_completion_tokens=20`→ct=277（而 `max_tokens=20`→ct=20）。`max_tokens` 与 `tool_choice` **按后端分裂**（`auto` 听 max_tokens、连非法 `tool_choice` 都收；`hunyuan-chat` 无视 max_tokens、`required` 直接 500）。入站 diff：`usage` 13 键全留，但**流式从不发 `delta.role`**。假接口清单 R1–R11；R1（对象→`required`）与 R2（`max_completion_tokens` 无上限）为本轮新发现回归/风险。**已执行（§十）**：剔除 `stop`/`response_format`/`logprobs`/`top_logprobs`/`seed`/`top_k`/`top_p` 七个无效转发、接 `reasoning_effort`（经网关实测 thinking 164→503）、`max_completion_tokens`→`max_tokens` 映射、对象 `tool_choice` 回退 `auto`（500→200）、流式补 `delta.role`、目录新增 `reasoning_efforts`（16/55 带档位）与 `callable` 可调性（**实扫 55 个：38 可调 / 17 个 `11102` 不可调**）、登录自启（当时用 `start-WorkBuddy2api.ps1`，2026-10-10 起改 bat + 计划任务直跑，ps1 已删）、已作 provider 追加进 AtomCode `config.toml`。**§十 同文更正了两个暂定结论**：`temperature` 由“未证实”改判**已消费**（高熵题 `=0.0` 连 5 发同值），`top_p` 由“透传”改判**未消费**（`=0.0001` 不收敛）；另查清 `agent:"cli"` 源自我们自己早期探针脚本、不在聊天端点结构体里（旧说法“不进 Web 历史列表”已推翻）。 |
| [25](workbuddy-25-渠道闸门与scrub.md) | **渠道闸门与 scrub** | 2026-10-11 当晚 `ua=ZCode/3.14.5`（hy3+33 工具）19 分钟窗口内 7×`400/11128`，网关加 `_SCRUB_MAP` 后 8 分钟内同 UA 同形态转 200（scrub 当时有效实锤）；**2026-10-15 直连上游复测：原始竞品名、全套通用词、逐字 Claude Code 系统提示词裸发一律 200，拦截面有实效性、上游已放开**。现行 map 仍洗 `agent/system/MCP` 等通用词且响应侧无还原 → 模型上下文占位名自污染；11102 与 11128 的 400 body 等长、勿凭 190B 判成因。修复方向 A灰度/B最小句/C响应侧 unscrub 见文末，均未执行 |

## 成品工具（`workbuddy/re/`）

| 工具 | 用途 |
|---|---|
| `decrypt_auth.py` | 离线解密凭证文件 / keyblob（`--full` 出明文） |
| `wb_client.py` | 云端 REST 客户端（auth/probe/get/post） |
| `direct_chat.py` | 单轮直调模型（stream SSE） |
| `wb_agent.py` | 带工具循环的 mini-agent（Glob/Read/Bash 本地执行） |
| `WorkBuddy2api.py` | ⚠ 早期单文件网关，已被 `WorkBuddy2api/` 目录版取代（**勿再用**，24 号审计只覆盖目录版） |
| `hook_fetch.js` / `patch_spawn.js` / `inject_renderer.js` / `cdp_eval.js` | 三层注入捕获工具链 |
| `asar_extract.py` / `get_buildkey.js` / `extract_catalog.py` | 解包/密钥提取/目录提取 |
| `sandbox_recon.py` / `sandbox_fullchain.py` | 沙箱侦察 + 全链直调（center/CLI/NDJSON/RunExecutable） |
| `datadate_probe.py` / `envd_filesystem.desc` / `cn_models.json` / `model_catalog.json` / `v3_config.json` | 数据面探针 / protobuf 描述符 / 模型目录与配置存档 |

## 现场还原

`C:/Program Files/WorkBuddy/resources/app.asar.unpacked/cli/bin/codebuddy` 被打了 hook 补丁
（备份 `codebuddy.wbbak` 在旁）——覆盖回去并重启 WorkBuddy 即完全还原。

## 全系列未结项（13 号地图，已随 17–23 号更新）

| # | 项 | 状态 | 价值 |
|---|---|---|---|
| 2 | CLI agent 本体与上游 Claude Code 的 diff（12.4MB） | 未动 | 高（需 diff 工程） |
| 7 | conversation-sync 全协议细节 | 未动 | 中 |
| 14 | connector 生态（ardot/TAPD/乐享热更包） | 🔶 插件侧 21 号已读，连接器未读 | 按需 |
| 15 | A2A 协议（agent 互操作） | 🔶 19 号已定性（CloudAgent CRUD + MCP 网关） | 中 |

已结项：#1 本地沙箱（14）、#3 云端数据面（15）、#4 MCP apps host（17）、#5 IM 通道（20）、
#6 tencent-docs（18）、#13 guest SDK（16）、qimei/TuringShield 本体（绕过达成，拆解无必要）、
threat-db（05）、betterleaks 规则（05）。

**未读的大块**（`server.js` 1012 region 内）：
`session/media-artifact-service.ts` 92.4KB、`automation/automation-main-service.ts` 88.1KB
（automation 共 30+ region，含 scheduler/dedupe/outbox/snapshot）、
`hub/build.ts` 41.8KB、`sites/site-deploy.ts` 37.7KB、`share/facade.ts` 52KB、
`skill/handlers.ts` 56.4KB、`agent-harness/mcp/manager/mcp-manager.ts` 59.8KB。
