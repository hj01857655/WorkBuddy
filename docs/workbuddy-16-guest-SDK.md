# WorkBuddy 逆向 16：guest SDK（window.wb 嵌入桥）——完整 API 面

日期：2026-09-29　前置：workbuddy-13-未探索地图（地图 #13）
样本：`workbuddy/re/app/node_modules/@genie/workbuddy-desktop-sdk/dist/guest/wb.js`（59.6KB，打包未混淆——字符串/结构全可读）

> **验证口径**：本文为**静态逆向**——样本未混淆、注释完整，API 面、消息类型、字段名均可从源码直读，可信度高。但**未经运行时抓包验证**（未在真机触发过 guest 页面调用）。凡涉及「实际行为」的判断（如调用时序、宿主响应时机）均为读码推断。

## 1. 定位

`wb-guest-sdk/wb.js`（= `@genie/workbuddy-desktop-sdk/dist/guest/wb.js`）是给**嵌入式 WebView 页面**用的官方 JS SDK：
宿主（WorkBuddy 窗口）加载第三方页面 → 页面引此脚本 → 经 postMessage 桥驱动完整对话能力。
协议版本 **`"1.0"`**（handshake `protocolVersion`）；门控 `window.wbReady`（Promise，握手完成 resolve）。

通道消息类型（仅这四种被桥接受）：`wb:invoke:request` / `wb:invoke:response` / `wb:event` / `wb:handshake:request|response`。
握手超时机制内建；invoke 带 per-request 超时与 requestId 关联。

## 2. `window.wb` 方法面（33 个，全部 async + bridgeAuto）

```
对话驱动:  sendPrompt  runPrompt  clear  compact  resend  cancel  cancelBackgroundTask
状态查询:  requests  requestEntries  userPrompts  getBackgroundTerminals  getPendingInfo
           getCloudServiceConfirmation  getPluginRecommendation
产物/文件: artifacts  files  searchFiles  changes  changeManifests  changeDetail  loadToolDetail
队列:      getCapacityQueueState  cancelCapacityQueue
运行时:    preload  ensureRuntime  releaseRuntimeHold
上下文:    refreshContextUsage  updateEstimatedCost
其它:      rename  log  markExcludeLaunchSpecServers
```

## 3. 事件面（`wb:event` 通道，33 种）

**conversation 族（22）**：stateChange、infoChange、historyLoaded、permission、prepareStatus、
mcpStartupStatus、warning、timelineEvent、childAgentEvent、artifactUpdate、commandsUpdate、
configUpdate、contextUsageChanged、creditChanged、estimatedCostChanged、queueUpdate、
capacityQueueUpdate、modeChange、modesUpdate、modelChange、planUpdate、cloudServiceConfirmationChanged、
pluginRecommendationChanged。

**windows 族（4）**：opened / closed / message / stateChanged。

**桥族（5）**：invoke:request、invoke:response、event、handshake:request/response。

automation 状态机：`automationCompleted / Failed / Cancelled / TimedOut`。
消息尺寸上限：invoke payload 512KB、event 128KB。

## 4. 权限命名空间（SDK 的能力分级）

```
web:     storage config account openAuth skills experts automations workspaces models
         notifications ops connectors conversations artifacts search changes
         intentRecognition metrics netdrive inspirationCode cloud
desktop: web + paths shell mcp buddyApps
遥测类:  telemetry http feedback（独立层）
```

即嵌入式页面按 namespaces 授权可调用 storage/config/account/skills/experts/automations/**conversations**/**artifacts**/netdrive 等 33 个域——SDK 就是"把 WorkBuddy 全能力以 API 形态开放给页面"的完整封装。

## 5. 意义

- **第三方页面可完全驱动 WorkBuddy 对话**（发 prompt、收流式事件、管产物文件、批队列、拿计费/上下文用量）——嵌入生态的复现协议全在手。
- 与 08/09/15 号互补：直调模型（无 UI）、REST（有 UI 后端）、本篇（有 UI 的嵌入式桥），三种集成姿势齐备。
- `wb.js` prod 版未混淆字符串——后续版本更新可直接 diff。

## 6. 销账

13 号地图 #13 完成；剩余未探索项不变（#2 CLI diff、#4 MCP host、#5 IM 通道、#6 tencent-docs、#7 sync 细节、#14 connector、#15 A2A）。
