# WorkBuddy 逆向 15：云端沙箱数据面协议全破（envd / connect-rpc / 文件系统读写实测）

日期：2026-09-29　前置：workbuddy-06-协议实调/08（会话凭证、模型直调）
成品：`workbuddy/re/datadate_probe.py`、`envd_filesystem.desc`（protobuf 描述符）、`v3_config.json`、`cn_models.json`、`model_catalog.json`

## 1. 数据面定位

云端会话的沙箱数据面 = `https://49983-{conversationId}.workbuddy.agentos-worker.net`（`/session` 响应的 `e2bDataEndpoint`）。其上运行 **e2b envd**（内嵌 e2b@2.10.2 SDK，main/dist.js:15178），协议两族：

1. **REST envd**：`/files?path=&username=&signature=v1_<sha256>`、`/health`
2. **connect-rpc**（JSON over POST）：`/filesystem.Filesystem/<Method>`、`/process.Process/<Method>`

服务定义直接从 bundle 内的 **base64 protobuf descriptor**（`fileDesc(...)`）解出（`envd_filesystem.desc`）：filesystem 服务 = ListDir/MakeDir/Remove/Stat/Move/Watch；process 服务 = Start/Stop/List/Connect（PTY）。

## 2. 鉴权（实测）

- **`X-Access-Token: <sandbox token>`**（`/session` 返回的 HS256 JWT，aud `sandbox-gateway`）——数据面全部请求必需；Bearer 不用于此面。
- 文件 REST 端点另加签名 query：`signature = "v1_" + sha256("{path}:{op}:{user}:{token}")`（op=read/write，user 默认 "user"；带过期时插入 `:{exp}`），`signature_expiration=<unix>`。
- `/health` 无签名放行（204）。
- 缺 token → 401 HTML（边缘层）；无头直 401 `missing bearer token`。

## 3. 实测通过的调用

| 调用 | 结果 |
|---|---|
| `GET /health` | 204 |
| `GET /files?path=/etc/hostname&username=user&signature=…` | 200，返回容器真实主机名 |
| `GET /files?path=/workspace` | 400 `path '/workspace' is a directory` |
| `POST /filesystem.Filesystem/ListDir` `{path,depth}` | 200 entries[]（name/type/path/mode/permissions/owner/group/modifiedTime） |
| `POST /filesystem.Filesystem/MakeDir` | 200 entry 回执 |
| `POST /filesystem.Filesystem/Remove` | 200 `{}`（删除确认复查） |
| `POST /process.Process/List` | 200 `{}` |
| `POST /process.Process/Start` | 415（需 connect 编码/二进制——细节待补） |
| `GET /tasks/{cid}/queue`（14 号） | 200 队列状态 |

### 目录列表实测样本
```
POST /filesystem.Filesystem/ListDir {"path":"/workspace","depth":1}
→ {"entries":[{"name":".codebuddy","type":"FILE_TYPE_DIRECTORY","path":"/workspace/.codebuddy",
   "mode":493,"permissions":"drwxr-xr-x","owner":"root","group":"root",
   "modifiedTime":"2026-09-28T21:20:46Z"}]}
```

## 4. 限流注记

`www.workbuddy.cn` 约 20+ 次/分钟触发 TCP 级 10060（约 2–3 分钟冷却）；数据面 `agentos-worker.net` 未观测到独立限速。批量探测须带退避。

## 5. 意义

外部客户端现在可**完整操作云端会话的文件系统**（列/读/写/删/建目录），叠加 09 号模型直调与 14 号本地沙箱——WorkBuddy 云端任务的四大面（对话/文件/执行/计费）全部协议级可复现，`WorkBuddy2api` 可选扩展云端文件工具路由。

## 6. 剩余（细节级）

1. `process.Process/Start` 的 415（connect-rpc 编码/二进制 proto body）——PTY 终端流未验证
2. `Watch` 事件流（WebSocket 分支）
3. 签名带过期的 variant（`signature_expiration`）服务端是否强制

## 7. process.Process/Start 全通（connect 流式信封，2026-09-29 补录）

**关键**：流式 RPC 的 Content-Type 为 `application/connect+json`，且请求体必须为 **connect 信封**：
`1B flags(0=未压缩) + 4B big-endian 长度 + JSON 消息`。裸 JSON 会报 `promised N bytes in enveloped message`（415 的真相：普通 JSON 缺信封且缺流式 Content-Type）。

请求：`POST /process.Process/Start`（信封消息）
`{"process":{"cmd":"bash","args":["-lc","echo rpc-ok && hostname"],"cwd":"/workspace"}}`

响应（信封流，逐帧）：
```
{"event":{"start":{"pid":339696}}}                                  # 沙箱内进程启动
{"event":{"data":{"stdout":"cnBjLW9rCg=="}}}                        # "rpc-ok"（base64）
{"event":{"data":{"stdout":"NjZjYjc1Y2Y4NDQ2Cg=="}}}                # 容器 hostname
{"event":{"end":{"exited":true,"status":"exit status 0"}}}          # 正常退出
flags=2 终止帧
```

注：`application/proto` 信封会报 `cannot parse invalid wire-format`（消息须 JSON）；`application/json` 无信封则 415。
产出：外部客户端现已可**在云端沙箱内启动任意命令并流式收 stdout/stderr**——数据面（文件+进程+终端）三层全部协议级复现。

细节级遗留：`Connect-Timeout-Ms`、PTY 分支（`process.pty` 字段，交互式终端）、`Watch` 文件事件流。
