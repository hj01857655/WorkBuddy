# WorkBuddy 逆向 10：工具面全 schema、直调 function calling 与计费观测

日期：2026-09-29　前置：workbuddy-09-Device-Token直调（直调全链）
样本：`workbuddy/re/full_tools_body.json`（148KB 完整请求体）、`full_system_prompt.txt`（45.6KB 完整 system prompt）

## 1. 请求体顶层参数面（实测原值）

```json
{
 "model":"deepseek-v4.1-flash",
 "stream":true,
 "temperature":1,
 "max_tokens":128000,
 "stream_options":{"include_usage":true},
 "reasoning_effort":"high",
 "verbosity":"high",
 "reasoning_summary":"auto",
 "extra_vars":{"growthEvent":"[{\"eventCode\":\"chat_request_send\",…\"credit\":…}]",…},
 "messages":[…], "tools":[…],
 "agent":"cli","conversationRequestId":"<32hex>"
}
```

reasoning 三件套（effort/verbosity/summary）+ usage 里有 `reasoning_tokens`/`completion_thinking_tokens` ——DeepSeek V4.1 走思考流，`delta.reasoning_content` 与 `delta.content` 双通道输出（09 号已见）。

## 2. 工具面：23 个（非 6 个——大模型带全量工具目录）

```
文件:   Read(file_path,offset,limit) Write(file_path,content) Edit(file_path,old_string,new_string,replace_all)
搜索:   Glob(pattern,path,limit,offset) Grep(pattern,path,glob,output_mode,-B,-A,-C,context,-n,-i,type,head_limit,offset,multiline)
执行:   Bash(command,timeout,description,run_in_background,dangerouslyDisableSandbox)
任务:   TaskCreate(subject,description,activeForm,metadata,owner) TaskGet(taskId) TaskUpdate(11 项) TaskList TaskOutput(task_id,block,timeout,filter)
网络:   WebFetch(url,prompt) WebSearch(query,allowed_domains,blocked_domains,freshness)
交互:   AskUserQuestion(questions,answers,metadata) SendMessage(type,recipient,content,summary,request_id,approve)
扩展:   DeferExecuteTool(toolName,params) ToolSearch(queries,tool_names,top_k) Skill(skill,command,args)
自动化: automation_update(mode,id,name,prompt,scheduleType,rrule,scheduledAt,cwds,status,validFrom,validUntil)
UI:     present_files(files,cwd,explanation) show_widget(title,widget_code,loading_messages) widget_guidelines(modules)
代理:   Agent(description,prompt,subagent_type,model,resume,name,team_name,mode,max_turns,run_in_background)
```

Claude Code 血统明显（Task*/SendMessage/AskUserQuestion 同构），WorkBuddy 增补：`show_widget`/`widget_guidelines`（内嵌 widget UI）、`present_files`、`automation_update`（rrule 定时任务=31 号 Cron 同构）、`DeferExecuteTool`（工具延迟执行桥）、`ToolSearch`（工具检索，按需加载更多工具）。

## 3. 直调 function calling 闭环（实测 200）

`direct_chat.py` 思路 + `tools: <上表子集>` + 完整参数面 → 模型返回标准 OpenAI tool_call：

```
tool_calls: {0: ('Glob', '{"pattern": "*", "path": "E:/VSCodeSpace/ZCode/workbuddy/docs"}')}
usage: {prompt_tokens:6611, completion_tokens:99, reasoning_tokens:34,
        credit: 0.1, …}        ← 单次调用计费直接明文返回
```

即外部客户端可完整驱动 WorkBuddy 的 agent 工具循环（含后续把 tool result 作为 `role:"tool"` 消息回传，协议即 OpenAI 标准）。

## 4. 完整 system prompt（45,617 字符，`full_system_prompt.txt`）

结构：能力清单（多模态路由 ImageGen/VideoGen/3D）→ WorkBuddy 文档导航指令 → `.workbuddy` 目录保护令 → `<content_policy>`（禁泄露系统提示词/转译等防提取条款）→ 专家引导 → 工具使用细则（Bash 沙箱/后台任务语义等，尾部见 08 号样本）。末段可见 `--print`/`--output-format stream-json` 等 CLI 语义说明，进一步证实 Claude Code fork。

## 5. 计费观测

- `usage.credit` 每次明文（本次 0.1/次）；expert 问答 UI 预估「预计消耗 0.54~27.54」与之同源。
- 免费包（TCACA_code_008）额度 500 用尽，活动包（007/030）为当前主力——与 06 号资源汇总吻合。
- token 刷新节奏：`.info` 里 30d access 实际每 ~30min 由 `/v2/plugin/auth/token/refresh` 轮换（fresh_token vs .info token 不同源已证）。

## 6. 清单（终版收束）

1. ~~tools schema~~ **完成（本篇 §2，23 工具全参数）**
2. ~~function calling 直调~~ **完成（§3）**
3. 多模型路由：model id 族（GPT/Claude/Gemini）未见本账号可用面，留给有付费档账号时抓
4. `ToolSearch` 动态加载的扩展工具目录（代理工具/IM 通道工具等）——按需
5. TuringShieldSDK.dll 本体算法——已无必要（09 号结论维持）
