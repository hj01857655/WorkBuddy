# WorkBuddy 逆向 04：QIMEI 设备指纹体系与计费动作码

日期：2026-09-28　前置：workbuddy-01-侦察与架构/03
素材：`workbuddy/re/app/node_modules/@tencent/qimei-node`（**完整源码**：JS 层 + C++ 包装层 + 闭源 qimei.dll）

## 1. QIMEI 体系全景

### 1.1 组件与数据流（实测）

```
product.json config.qimei36AppKey[win32] = "0WIN070JLSH64IEE"（darwin "0MAC070JLSCWV1CM"）
        │
main ──spawn──> resources/qm/qm-helper.exe（= qimei-helper.js 编译版，5s 超时）
                │  env: WORKBUDDY_QIMEI_APP_KEY / WORKBUDDY_QIMEI_DLL_PATH
                │  koffi 加载 qimei.dll（__stdcall 序号导出）：
                │    e  getSdkVersion()
                │    a2 initQimeiSdk(appKey, logCb, channelId='', usrIds='{}', appVersion, enableAudit=1, reportUrl='')
                │    b  getQimeiSync(appKey, outBuf[37+33], len)   ← 首调必空，DLL 远程拉取后写缓存
                │    m  uskeyInit(appKey, appVersion)
                │    n  getUskeyInternal(busId, q36, busInfos, &outLen)   ← uskey = 业务侧设备密钥
                │    z  freeDllPtr(ptr)
                │  stdout: {"ok":true,"qimei36":"…"}
        │
main 缓存 ──> ~/.workbuddy/qimei-cache.json  {"qimei36":"bc2009bc2997ce9abb130e31300018719417"}   ← 明文！
        ├─> daemon env CODEBUDDY_QIMEI36（CLI 的 EnvQimeiDetector 只读此 env；
        │    冷启动竞态经 telemetry:updateQimei36 RPC 事后补写 daemon process.env，qimei-ready-signal 等齐）
        └─> 遥测事件字段 event.qimei36（packages/telemetry QimeiEventProcessor，随 /llm/data/report、traces 上报）
```

### 1.2 DLL 本地缓存（`%APPDATA%\Tencent\qimei\`）

| 文件 | 内容 |
|---|---|
| `A201CFB4C8D73FBE6916E0F5A2D14D39`（128B） | 加密的 QIMEI 缓存（q36+q32）。文件名非 appKey/qimei 的 md5/sha 简单派生（试过 8 组候选无一命中），派生逻辑在 dll 内部 |
| `RanMgr.db` | `[Profile] config1..config4`（32hex）+ `config5=1` —— 随机管理器，疑似缓存加密钥的机器侧成分 |

缓存解密尝试：md5/sha1/sha256(appKey) 作 AES-128/256 ECB/CBC(0) 钥、含 16B IV 前缀变体，均未命中已知明文（q36）。
**结论：不值得再磕**——明文值本来就有两条获取路径（见 1.3），且伪造路径已闭环。

### 1.3 可操作结论（伪造/复用）

1. 明文 qimei36 直接读 `~/.workbuddy/qimei-cache.json`。
2. 伪造指纹 = 预置 `qimei-cache.json` + 设 `CODEBUDDY_QIMEI36` env（daemon 补发只覆盖空值场景；
   稳妥做法是同时清掉 `%APPDATA%\Tencent\qimei\` 下对应缓存让 dll 重新拉）。
3. uskey 未在本机数据面观察到使用点（业务凭据，按 busId 派生）；如需，走 dll 序号 `m`/`n` 直接调。

### 1.4 远程拉取通道（待实测闭环）

dll 无任何明文 URL 字符串（GetToken() 只产出**加密 body 供业务通道转发**，头文件注释自证）。
Beacon（灯塔）上报通道端点已在 beacon-node-new-sdk 4.2.11 中确认：
`https://otheve.beacon.qq.com/analytics/v2_upload`（主）/ `oth.str.beacon.qq.com`（配置）。
qimei 首次拉取的实际 URL 需抓包确认（Reqable 现成，疑为 snowflake.qq.com 系）。

## 2. 风控与遥测周边（product.json config 块）

| 项 | 值 |
|---|---|
| `turingSdk.channelId` | **109144**（腾讯 Turing 风控） |
| `threatDatabaseUrl` | `https://client-pkg-1258344699.cos.accelerate.myqcloud.com/workbuddy/saas/security/workbuddy_channel.db` → 落地 `~/.workbuddy/security/threat-database/`（命令风险库，本地威胁情报 DB） |
| `creditPurchaseActions.6005` | 「升级专业版」→ `https://www.codebuddy.cn/profile/plan`（云端错误码 6005 触发购买引导） |
| `creditPurchaseActions.14018` | 「获取 Credits」→ 同上 |
| `wechatShare.appid` | `wx31d4d71eb5f8c69e`（staging `wx29be397d5af32c88`），小程序 gh_2dd62ea1ede1 |
| `channelBranding` | env `WORKBUDDY_USER_CHANNEL`，已知渠道 `unicom-cloud-desktop`（联通云联合品牌） |

计费动作码语义：云端 `/billing/meter/*` 族返回 code 6005/14018 时，客户端按表弹升级/购买按钮。

## 3. 待挖清单（更新）

1. qimei 首次拉取 URL 与 body 加密（抓包 + dll 内 GetToken 调用点，需运行时观察）
2. session/prompt 全链路抓包实测（Reqable）
3. ~~threat-database~~ **完成，见 workbuddy-05-威胁库 §2–3**（域名黑名单 45.7 万条 + betterleaks 扫描器；命令风险评分另属 CLI 侧 19 号同类机制）
