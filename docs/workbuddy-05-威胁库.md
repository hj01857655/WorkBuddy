# WorkBuddy 逆向 05：QIMEI 实测补全与 threat-database 命令域防线

日期：2026-09-28　前置：workbuddy-04-QIMEI与风控（QIMEI 静态测绘）

## 1. QIMEI 实测补全（03/04 号的抓包项部分收敛）

实测（备份 `%APPDATA%\Tencent\qimei` 后移除 `A201C…` 缓存，直跑
`WORKBUDDY_QIMEI_APP_KEY=0WIN070JLSH64IEE WORKBUDDY_QIMEI_DLL_PATH=…\qimei.dll node main/qimei-helper.js`）：

| 观察 | 结果 |
|---|---|
| 返回值 | `bc2009bc2997ce9abb130e31300018719417`（与缓存中历史值一致），**秒回** |
| 缓存文件 | `A201C…` **未重建**；仅 `RanMgr.db`（时间戳未变） |
| 网络 | netstat 轮询未见远端连接（0.15s 间隔），helper 全程 1–2s |
| helper 身份 | `resources/qm/qm-helper.exe` **不是**探测器，是 `qm-uninstall.exe`（uninstall/suspend/resume/status 管理工具）；真探测器是 `main/qimei-helper.js`（vendored node 或 `ELECTRON_RUN_AS_NODE` 起） |
| qimei.dll 导入表 | ADVAPI32/KERNEL32/USER32/ole32/SHELL32/SHLWAPI/**WS2_32/IPHLPAPI/NETAPI32**/VERSION/PSAPI/**WININET** —— 具备联网与网卡指纹能力 |

判读：缓存缺席时仍即时回同一 qimei36 → 要么本地确定性派生（RanMgr.db + 机器指纹），要么 WinINet 走系统代理的极快回源且 netstat 轮询漏采。**首个全新设备的拉取 URL 仍需 Reqable 抓包定论**（新设备首拉必然走网络，现有机器测不出来）。
现场已复原（缓存从 `/tmp/qimei-cache-orig.bin` 拷回）。

操作面结论（04 号 §1.3）不变且加强：值在 `~/.workbuddy/qimei-cache.json` 明文可取，伪造 = 预置该文件 + `CODEBUDDY_QIMEI36`。

## 2. threat-database：云端下发域名黑名单（45.7 万条）

来源 `threatDatabaseUrl`（product.json）= `https://client-pkg-1258344699.cos.accelerate.myqcloud.com/workbuddy/saas/security/workbuddy_channel.db`
（COS 加速桶，Content-Type `application/vnd.sqlite3` + gzip，实测可直下）。落地 `~/.workbuddy/security/threat-database/`，旁挂 `state.json`：

```json
{"schemaVersion":1, "activeVersion":"faff6660b8b4797f", "activeSha256":"…",
 "activeSourceVersion":"20260925", "lastSuccessfulCheckAt":…, "consecutiveFailures":3}
```

本机 `consecutiveFailures: 3`——更新链路当前失败（版本 20260925 停更 3 天），是排查网关连通性的现成信号。

### 2.1 schema（v2，format=workbuddy_sqlite_minimal_no_raw_v2）

```
workbuddy_block(ioc INTEGER PK, ioc_type TEXT PK2, category TEXT PK3, family TEXT PK4, is_subdomain INT PK5)
  — 457,140 行；ioc = signed_int64(xxh64(raw_domain + salt, seed=0))，位保留 u64→i64（49.96% 为负是特征）
  — v1 曾用 xxh32；schema 校验按 PRAGMA table_info 逐列严格比对（tripwire 设计，见 server.js:177789）
workbuddy_export_metadata: ioc_hash=xxh64, ioc_hash_seed=0,
  ioc_salt=14969945219629445913   ← salt 随库下发，任意域名可本地算哈希反查
```

分类分布（TOP）：黑灰产/钓鱼网站 19.7 万、常规木马/Metasploit 4 万、远控 AsyncRAT 2.5 万、ClearFake 1.5 万、矿池 1.4 万、博彩 1 万、imToken 钓鱼 8 千、APT-TX-5453 4.4 千……

### 2.2 用途：bash/浏览器动作的域防线（非命令评分）

CLI（codebuddy-headless.js）：
- `syncThreatDatabaseBeforeExecute` —— **每次 shell 执行前**同步/加载库（sandbox ensureReady 里也 `syncThreatDatabase`）；
- `ThreatDomainChecker` 按域名查库，命中走 `reportThreatDatabaseHit({tool:"bash", domain, riskType, activeVersion, conversationId})` 遥测 + 拦截反馈；
- `reportThreatDatabaseLoad({available, reason, activeVersion})` 上报加载状态。
- 下载校验链：流式 SHA-256 比对 `state.json.activeSha256` + `validateThreatDatabaseSchema`（server.js，schema 严格等值）。
- 查询由 **sandbox-cli**（沙箱侧）持只读连接执行。

## 3. betterleaks：沙箱密钥扫描器（`cli/vendor/sandbox/5.6.10/betterleaks.exe`）

规则文件实例：`~/.workbuddy/security/{uid}/cipher/detect-rules.toml`（title "workbuddy sandbox-center detect rules"）：
- `[extend] useDefault=true`（gitleaks 系规则底座，`generic-api-key` 被禁用），自建规则如 `workbuddy-password-plaintext`（中英密码关键词 + 明文值捕获，secretGroup/filters 细到中文无分隔符形态与占位符词表）。
- `filter` DSL：`len() / matchesAny(正则) / containsAny(子串)`，由 betterleaks 内部小写化后执行。
- 内置规则强制 `supports_encryption=false`（build.rs），命中只告警不加密替换。

即沙箱内的敏感信息防线 = betterleaks（内容扫描）+ threat-database（域名拦截）双件套。

## 4. 待挖清单（更新）

1. ~~qimei 首拉 URL~~ → **新设备首拉需抓包**（现有机器本地派生/秒回，测不出网络路径）
2. ~~session/prompt 全链路~~ **完成：自建客户端直连实测，见 workbuddy-06-协议实调**
3. ~~threat-database schema~~ **完成**（本篇 §2）；反查实现：`xxh64(domain+salt, seed=0) as i64`，salt=14969945219629445913
4. betterleaks.exe 主体 RE（Rust，规则引擎其余内建规则面）
