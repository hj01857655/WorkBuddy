# WorkBuddy 逆向 14：本地沙箱运行时——IPC 协议全破 + 外部直调执行验证

日期：2026-09-29　前置：workbuddy-13-未探索地图（未探索地图 #1）
成品：`workbuddy/re/sandbox_fullchain.py`（center+CLI 拉起+NDJSON 直调全链）、`sandbox_client.py`、`sandbox_probe2.py`、`sandbox_recon.py`

## 1. 架构（全链实测还原）

```
daemon(main 进程)
 ├─ spawn sandbox-center.exe      # 单实例服务：规则权威 + 敏感信息检测（betterleaks 前端）
 │    --config {"appHome":"~/.workbuddy","ipcAddress":"<epoch 管道>","cipher":{"detectionEnabled":true,"detectMaxFileSizeBytes":1048576}}
 │    --app_home ~/.workbuddy      env: SANDBOX_CENTER_UID=<uid>
 │    管道名: \\.\pipe\WorkBuddy_SandboxCenter_<FNV1a64(appHome) 16hex>_<launcherPid>
 │    （FNV-1a 64：offset 14695981039346656037，prime 1099511628211；log-acl-guard.js buildEpochCenterAddress）
 │    epoch 机制：地址尾缀 = 拉起方 pid；经 env SANDBOX_CENTER_IPC_ADDRESS 注入给树内 client
 │    生命周期：父进程 monitor（父死自退）+ flock 单实例锁 + crash 有界恢复/锁冲突指数退避
 │
 ├─ spawn sandbox-cli.exe          # 每会话管理器（Rust）
 │    --config {"ipcAddress":"Sandbox_<12hex>","extraPath":[],"enableGlobalProjection":false}
 │    --rule_decision center --uid <uid> --app_home ~/.workbuddy
 │    env: SANDBOX_CENTER_UID + **SANDBOX_CENTER_IPC_ADDRESS=<center 管道>**   ← 必传，否则 RunExecutable fail-closed
 │
 └─ SandboxCliClientImpl（JS）：NDJSON over \\.\pipe\Sandbox_<hex>
```

## 2. IPC 协议（NDJSON，17 命令）

请求 `{"sessionId","messageId","command","data"}` → 响应 `{"sessionId","messageId","command","data","success"}`（错误：`"error"` 字段）。
事件类命令（ProcessOutput/ProcessExit/ReportEvent）为服务端主动推送、无需应答。行缓冲上限 8MB。

17 命令枚举（源 `packages/sandbox-cli/src/node/sandbox-cli-client.ts` SANDBOX_COMMANDS）：
`Ping` `OpenSession` `CloseSession` `DeleteSession` `RunExecutable` `GetStatistics` `ReportBlockChoice`
`ProcessWrite` `ProcessSendKey` `ProcessResize` `ProcessKill` `ProcessIsAlive` `ProcessOutput*` `ProcessExit*`
`ReportEvent*` `RecordStatistics` `AppendUserChoice`（* 号为服务端推送/免应答；messageId 格式 `ts-msg-<n>`）。

| 命令 | data | 响应/行为 |
|---|---|---|
| `Ping` | {} | `"I am alive."` |
| `OpenSession` | `{name, workingDir}` | `{workingDir}`（确认挂载映射） |
| `CloseSession`/`DeleteSession` | {} | — |
| `RunExecutable` | `{executable,args[],cwdDir,timeoutMs,executionMode:"sandbox",stdoutMode:"pipe",stdinMode:"null",env?}` | `{processId:"pipe-N", pid}`；输出经 `ProcessOutput` 事件流式推送（`data` 为 **base64**，`stream:"stdout"/"stderr"`，GBK/UTF-16 按 SDK 源编码） |
| `ProcessWrite/SendKey/Resize/Kill/IsAlive` | 进程交互 | — |
| `GetStatistics`/`RecordStatistics`/`ReportEvent`/`ReportBlockChoice`/`AppendUserChoice` | 统计与拦截反馈 | — |

## 3. 实测结果（全链 200）

```
Ping            → success  "I am alive."
OpenSession     → success  {workingDir: "E:/…/docs"}          # 目录映射确认
RunExecutable   → success  {processId:"pipe-1", pid:16588}    # 进程在沙箱内起来
ProcessOutput   → base64 流（GBK 解码："README.md"——cmd dir /b 在挂载的 docs 目录执行成功）
```

- **cmd.exe `/c dir /b` 在沙箱内执行成功**，stdout 流式回传（工作目录=OpenSession 映射目录）。
- `bash` 被策略拒绝：`Error: 0x80070005 错误代码: Bash/EnACCESSDENIED`（规则库按可执行名拦截，Windows 沙箱只放行 cmd/白名单——与 threat-db/betterleaks 的 fail-closed 设计一致）。
- `RunExecutable` 在 center 缺席时报 `SandboxError(0xFFFFFFFF): center 规则快照不可用…拒绝执行（fail-closed）`——**规则快照必须从 center 预取**。
- cmd 参数细节：`args:["/c","dir","/b"]` 分段传可用；合并串或缺段会得到「命令语法不正确」（沙箱内 argv 重组与常规略有差异）。
- UTF-16LE 输出（bash 的报错）说明 ProcessOutput 的 base64 保留子进程原始编码，需按流自行判码。

## 4. 生命周期要点（源码注释自证，main/index.js:5267）

- center 由 **Desktop 主进程在登录态就绪后主动拉起**（预热+配置权威），切号/敏感保护翻转即重启，退出/登出时 IPC `shutdown` 优雅停 + 父死 monitor 自退双保险。
- 单实例锁（flock）：锁冲突时 spawn 侧指数退避无限重试（5s→60s），不占 crash 熔断额度。
- `--rule_decision center`：CLI 的执行放行决策完全依赖 center 的规则快照——**本地沙箱的拦截大脑在 center**。

## 5. 意义与后续

- 外部程序现在可以**完全脱离 WorkBuddy 界面**使用其本地沙箱（拉 center/CLI → 管道 NDJSON → 执行任意白名单命令并收流式输出），且天然获得 betterleaks+威胁库的审计线。
- WorkBuddy2api 可选扩展：把上游 tool_calls 的 Bash/Glob/Read 路由到本地沙箱执行（与官方桌面行为完全一致），而不是裸跑宿主机。
- 剩余细节：`executionMode` 其他取值、`GetStatistics` 计数字段、`ReportBlockChoice` 回传格式——按需再挖。
