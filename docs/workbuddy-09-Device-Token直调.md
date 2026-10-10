# WorkBuddy 逆向 09：X-Device-Token 与纯 Python 全链直调（终局）

日期：2026-09-29　前置：workbuddy-08-真协议（真协议 /v2/chat/completions）
成品：`workbuddy/re/direct_chat.py`（~150 行，零 WorkBuddy 依赖直调模型）

## 1. X-Device-Token：无需逆向 DLL

来源链：`TuringSdkService`（main/index.js:28378）→ `native/turing-sdk/index.cjs` → `turing_sdk.node`（NAPI，channelId 由 T-Sec 分配）。

**turing_sdk.node 可独立加载**，不依赖 Electron 运行时：

```js
const b = require("C:/Program Files/WorkBuddy/resources/app.asar.unpacked/native/turing-sdk/index.cjs");
b.configure(109144, "WorkBuddy", "5.6.2");        // 109144 = product.json turingSdk.channelId
const token = await b.fetchDeviceToken({          // 10 秒内返回，~1080 字符
  usingCachedMessage: true, includesOutdatedMessage: true, includesDeviceInfo: true, timeoutMs: 15000 });
```

token 形态：`v3:<b64 ~567B>#0#<b64 ~512B>`；**每次调用都不同**（滚动值，服务端不校验静态值——08 号已证），客户端 5 分钟后台刷新一次（DEFAULT_REFRESH_INTERVAL_MS=3e5），失败退避重试（30s→300s 指数）。
开关：productFeatures `TuringDeviceToken`（缺省开）；关闭后请求带 `X-Device-Token-Error` 走降级。

## 2. 直调 401 排障全记录（网关 = APISIX/openresty）

| 试验 | 结果 | 结论 |
|---|---|---|
| 捕获请求整体重放（原头原体） | **200**（SSE chunk 流） | 网关无 TLS/会话绑定，纯头校验 |
| 原 token / 解密 token / fresh token 轮换 | 全 200 | **Bearer 过期不是问题**（.info 里的 30d token 有效） |
| 真实头 + 我的 Device-Token | 200 | Device-Token 不校验静态一致性 |
| 逐头替换 17 项为任意值 | 全 200 | 单头值不敏感 |
| direct_chat 初版（少 b3/X-B3/traceparent/Accept-Encoding） | 401 | **401 = 头集合缺失**，具体哪一项未细究（补齐真实头集合即通过） |
| 完整头集合 + 自构造 body 无 stream | **400 code=11101** "Non-stream chat request is currently not supported" | 业务层穿透！**必须 `stream:true`** |
| 完整头集合 + `stream:true` + 最小 body | **200，SSE 流式回话** | ✅ 全链路复现完成 |

## 3. 最终可用协议配方（direct_chat.py）

- 头：08 号 §2 全集（含 `b3`/`X-B3-*`/`traceparent`/`Accept-Encoding`——缺这些吃 401），`X-Conversation-ID` 可任意（服务端按它归组）。
- 体：`{"model":"deepseek-v4.1-flash","stream":true,"messages":[…],"agent":"cli","conversationRequestId":<32hex>}`，
  gzip 压缩 + `Content-Encoding: gzip`；system/user 最小可用（`<user_query>` 包裹即可，不需要完整 context 注入）。
- 响应：SSE `chat.completion.chunk`（delta 含 `content` 与 `reasoning_content` 双通道）+ heartbeat + `[DONE]`。

## 4. 完整复现链（三代客户端终局）

```
decrypt_auth.py   → 离线解密 .info 得 Bearer（30d）
wb_client.py      → REST 面（会话/签到/credit）
direct_chat.py    → 模型直调（turing_sdk.node 出 Device-Token + stream:true）
```

WorkBuddy 云端对话已可完全脱离官方客户端调用。签名校验/设备指纹两道防线均告破解：
静态加密（02 号）与 Device-Token（本篇）分别从「持有数据」与「持有 DLL」两个维度绕过。

## 5. 待挖清单（终版）

1. `X-Agent-Purpose: conversation_topic` 之外的 purpose 值族（intent/recall、多模型路由）
2. 非 DeepSeek 模型（GPT/Claude/Gemini 系）的 model id 与端点差异
3. ~~tools schema~~ **完成，见 workbuddy-10-工具面**（23 工具全参数 + 顶层参数面 + function calling 直调闭环 + credit 计费观测）
4. TuringShieldSDK.dll 内部（token 算法本体——已无必要，除非需要离线生成）
