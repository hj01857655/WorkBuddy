# WorkBuddy 本机接口工具箱

两个都已**实测跑通**（2026-09-26）：

| 能力 | 状态 | 说明 |
| --- | --- | --- |
| **每日签到** | ✅ 已跑通 | 实测 `+100 积分 / 连续 10 天`；自动化已并入 `workbuddy2api` 网关（每天 10:00 + 启动补签） |
| **聊天（OpenAI 兼容）** | ✅ 已跑通 | SSE 流式，实测 `glm-5.3` 正常作答，`credit` 计费可读 |

---

## 一、快速使用

```bash
PY="C:/Users/12925/.workbuddy/binaries/python/envs/default/Scripts/python.exe"

# —— 签到（脚本已并入 workbuddy2api/）——
$PY workbuddy2api/checkin.py doctor     # 体检：凭据来源 / 当前账号 / 令牌形态
$PY workbuddy2api/checkin.py claim      # 签到（幂等）
$PY workbuddy2api/checkin.py status     # 查状态
$PY workbuddy2api/checkin.py refresh    # 仅续期

# —— 聊天 ——
$PY workbuddy_chat.py "用一句话解释量子纠缠"
$PY workbuddy_chat.py --model kimi-k3 --show-reasoning "你好"
$PY workbuddy_chat.py --tools @tools.json --show-tools "查一下北京和上海的天气"
$PY workbuddy_chat.py --raw --stats "hi"
```

依赖：**仅 Python 标准库**，不需要 Node / Electron。

签到退出码：`0` 成功或已签到 ｜ `1` 失败 ｜ `2` 无可用凭据。
聊天退出码：`0` 正常结束 ｜ `1` 错误 ｜ `2` `finish_reason` 非正常值。

签到自动化现状（2026-10-10 更新）：旧的「每 12 小时」计划任务（ID `7d2f93cb-…`）
已随多次目录迁移废弃删除，不再存在。自动化现由 **`workbuddy2api` 网关内嵌签到线程**承担：
网关进程启动时补签一次，之后每天 10:00 定时签（脚本幂等，多跑无副作用）；
网关本身由登录计划任务 `workbuddy2api` 拉起（`workbuddy2api\start-workbuddy2api.bat`）。

> 凭据库仍在 `C:\Users\12925\.workbuddy\checkin\auth.json`（**不随目录迁移**，
> 因其由脚本按 `~` 家目录固定解析），签到 CLI 与网关 `credential.py` 共用这一份。

---

## 二、凭据从哪来（**不需要你提供任何令牌**）

复用桌面端已登录的本地登录态：

```
%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop*.info
   └─ 取 refreshToken（须是明文形态，见坑 1）
        └─ POST {domain}/v2/plugin/auth/token/refresh      换新令牌
             └─ 存入 ~/.workbuddy/checkin/auth.json        之后自续
                  ├─ POST {domain}/v2/billing/meter/daily-checkin   签到
                  └─ POST copilot.tencent.com/v2/chat/completions   聊天
```

> 注意聊天与签到的**上游域名不同**：签到走 `{domain}`（`www.workbuddy.cn`），
> 聊天走 `copilot.tencent.com`。

---

## 三、三个容易搞错的点（实测）

### 1. `X-User-Id` **不是**必需的

| 头集 | 签到 | 聊天 |
| --- | --- | --- |
| 带 `X-User-Id` | 200 | 200 |
| **不带** `X-User-Id` | **200** | **200** |
| `X-User-Id` 为空串 | 200 | 200 |
| **仅 `Authorization` + `Content-Type`** | **200** | **200** |

**服务端从令牌解析账号**（响应头会回显 `X-User-Id`，可自证）。

其余头（`X-Domain`/`X-Product`/`X-IDE-*`/trace 三件套）同理 —— **不带头不会失败**，
但会让网关侧会话被拆散、trace 断链、统计失真。**仍建议全量携带**。

### 2. 聊天接口**必须流式**

不传 `stream: true` → `400 / code 11101`
（`Non-stream chat request is currently not supported`）。

### 3. `finish_reason` 与 `usage` 的位置都和 OpenAI 不一样

- 进行中 `finish_reason` 是 **`""` 空字符串**，不是 `null` → 用 `!== null` 判结束会失效。
- `usage` **内联在 `finish_reason` 那一帧、且 `choices` 非空** →
  按 OpenAI 那样「找 `choices: []` 的帧」永远找不到。
- 不开 `stream_options.include_usage` **也照样有 usage**。

---

## 四、三个坑（真踩过）

1. **令牌有加密形态**：当前 `workbuddy-desktop.info` 的令牌是
   `{"$wbEncrypted":1,"envelope":"…"}`，**取不出明文**；只能读**带时间戳的明文备份文件**。
   本方案**不破解**这层加密。
2. **别按令牌有效期选账号**：多账号时按 `expiresAt` 排序会选中 global 号
   （它的 exp 更远，但**没有签到活动**）。应按主文件 `account.uid`（该字段即使加密也是明文）
   选当前账号。
3. **`code=10001` 是通用码**，不是「已签到」专用码，必须看 `msg`：
   `今天已签到，请明天再来` = 幂等成功；`签到活动未开启或已过期` = 真失败。

另外 `checkin-status` 的 `today_checked_in` **不可靠**（实测签到成功后仍为 false），
所以脚本**不预查状态**，直接打 `daily-checkin` 靠 msg 兜底幂等。

---

## 五、文件

本目录是 WorkBuddy 相关产物的**唯一归档处**（不放技能包，全部为文档 + 脚本）。

### 文档

| 文件 | 说明 |
| --- | --- |
| **`docs/网关协议清单.md`** | **协议总表**：官方用 SDK 还是手搓；**现存 5 条路由的实测可用性**；`chat` / `responses` / `embeddings` / `completions` / `images` 各自的**请求 · 响应 · SSE**；两套错误信封 |
| **`docs/聊天接口规格.md`** | **聊天接口完整规格**（1055 行）：端点、头、请求体、**SSE 逐帧详解**、错误模型、与 OpenAI 的差异对照、出处偏移量 |
| `docs/认证与签到协议.md` | 签到完整协议：域与 realm 划分、OAuth 登录、令牌刷新、签到、成长中心、错误语义、凭据来源、出处行号 |
| `docs/接口溯源.md` | 接口出处的逐条复核记录（含桌面端 / web 端 bundle 偏移量） |
| `README.md` | 本文件（索引 + 快速上手） |

### 脚本（仅标准库，无需第三方依赖）

| 文件 | 说明 |
| --- | --- |
| `workbuddy_chat.py` | **聊天参考客户端**（436 行，仅标准库）：把 SSE 的 9 个坑都填了，含 `tool_calls` 增量合并 |

签到主脚本已并入 **`workbuddy2api/checkin.py`**（引导凭据 → 自动续期 → 幂等签到，
与网关同目录自包含）。

### 其他

| 路径 | 说明 |
| --- | --- |
| `diag/` | 可复现的取证脚本（**SSE 逐帧**、最小头集对照、错误码取证、签到侧头必需性对照）+ 第三方参考实现源码副本 |

> 本目录现位于 `E:\VSCodeSpace\Agent\WorkBuddy\`（历经多次迁移，旧路径
> `C:\Users\12925\WorkBuddy\…` 与 `E:\VSCodeSpace\WorkBuddy\` 均已失效）。
> 签到自动化已并入网关（见「快速使用」），不再有按绝对路径调用本目录脚本的计划任务。

---

## 六、聊天接口速览

### 请求结构

```http
POST https://copilot.tencent.com/v2/chat/completions
Authorization: Bearer <accessToken>
Content-Type: application/json

{"model":"glm-5.3","stream":true,"messages":[{"role":"user","content":"说个你好"}]}
```

**三个必填项**（少任一个都失败）：

| 字段 | 约束 | 违反的后果 |
| --- | --- | --- |
| `model` | string | `400 / 11102` |
| `messages` | 非空数组 | `400 / 11133`（带 `extError.param:"messages"`） |
| **`stream`** | **必须是 `true`** | `400 / 11101` |

⚠️ **`tool_choice` 只接受字符串**（`"auto"` / `"none"` / `"required"`），传对象必 `400`。

### 响应结构（SSE）

```
: heartbeat                                    ← 注释帧，忽略
data: {…chunk…}                                ← delta.reasoning_content（思维链）
data: {…chunk…}                                ← delta.content（正文）
data: {…chunk…, "delta":{"tool_calls":[…]}}    ← 函数调用增量（可选）
data: {…chunk…, "finish_reason":"stop", "usage":{…}}   ← ★ 收尾帧，usage 内联在这里
data: [DONE]                                   ← 哨兵，先判字符串再 parse
```

```ts
interface Chunk {
  id; object:"chat.completion.chunk"; model; created
  choices: [{ index; delta: Delta; logprobs: null; finish_reason }]
  usage: object | null          // 非收尾帧恒 null
}
interface Delta {
  role; content; reasoning_content
  function_call; refusal; tool_calls; extra_fields    // ★ 每帧 7 键齐全
}
```

**四组关键结构事实**：

| # | 事实 |
| --- | --- |
| 1 | 进行中 `finish_reason` 是 **`""` 空字符串**，不是 `null` |
| 2 | `usage` **内联在 `finish_reason` 那帧**、`choices` 非空（不是 OpenAI 那种空 `choices` 独立帧） |
| 3 | `delta` **每帧 7 键齐全**（空值是 `""`/`[]`/`null`）→ 判空要判值，不是判键 |
| 4 | `tool_calls` **按 `index` 合并**；`id`/`name` 只在首帧；`arguments` 是流式片段须拼接后再解析 |

**特有字段**：`delta.reasoning_content`（思维链）、`usage.credit`（本次消耗积分）、
`usage.completion_thinking_tokens`。

**错误结构**：`{code, msg, requestId, extError?, displayMsg?, displayTips?, actions?}`。
⚠️ **`code` 是通用码，语义必须看 `msg`** —— `11101` 一个码两义（非流式 / 字段类型错）。
`401` 例外：响应是 **HTML**（APISIX 网关层），不是 JSON。

详见 **`docs/聊天接口规格.md`**（780+ 行，含逐帧详解与出处偏移量）。

---

## 七、附加能力（已实测可用，未纳入自动任务）

成长中心（域 `www.workbuddy.cn`）：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/activity/growth/streak` | 连登状态：天数、补签卡、7d/14d/28d 档位 |
| POST | `/activity/growth/redeem` | 兑换档位 `{tier:"7d\|14d\|28d", client_token:<uuid>}`，未解锁返回 403 |
| GET | `/activity/growth/lottery/summary` | 抽奖次数 |
| POST | `/activity/growth/lottery/draw` | 抽奖 `{client_token}` |
| GET | `/v2/activity/growth/profile` | 成长等级（实测 18 级、完成 18/19） |

> 兑换与抽奖会**消耗资源且不可逆**，不适合无人值守 —— 故只留接口，不挂自动化。

---

## 八、安全

- 凭据只存本机 `~/.workbuddy/checkin/auth.json`，已用 NTFS ACL 收紧到当前用户。
- 桌面端文件**只读**，绝不改写。
- 日志与终端输出**永不含令牌原文**；无任何遥测或第三方上报。
- 仅调用 WorkBuddy 官方域名接口。
- ⚠️ 聊天**会真实消耗 credit**（实测 `0.06`~`0.36`/次），不像签到是纯领取。
