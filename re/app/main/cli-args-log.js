//#region ../../packages/workbuddy-server/src/common/cli-args-log.ts
/**
* 把 Agent CLI 的 spawn/activate args 摘要成一行字符串，供日志使用。
*
* 设计意图：
* - 完整 args 含 trustedDirectories JSON / `--system-prompt` 内容 / `--mcp-config`
*   内联 JSON（携带组好的 MCP server env 与鉴权凭据）等敏感或冗长字段，
*   直接打到日志会**泄露用户凭据**或**炸日志体积**。
* - 但排查"角色丢失 / 工具漏装 / cwd 串味"必须能看到关键 flag **是否传了 +
*   值的形态**（路径 vs 内容、长度），所以保留 flag 名 + 按字段类型给出非敏感摘要。
*
* 摘要规则：
* - flag 单独出现（boolean）→ 保留 flag 名
* - flag + 值 → flag=<摘要>；摘要按字段决定：
*   - `--system-prompt-file`（文件路径） → 原值（路径不敏感）
*   - `--system-prompt` / `--append-system-prompt` / `--settings` / `--mcp-config`
*     （含内容或凭据） → `<len=N>`，只打长度
*   - `--allowedTools`（多值） → 原值（工具名公开）
*   - 其他（`--model` / `--permission-mode` / `--port` / `--session-id` 等） → 原值
*
* 结果形如：`--serve --session-id=sess-1 --permission-mode=bypassPermissions
* --allowedTools=widget_guidelines,WebFetch --system-prompt-file=/tmp/...prompt.txt
* --settings=<len=132> --mcp-config=<len=1893> --strict-mcp-config --port=12345`。
*/
function summarizeAgentCliArgsForLog(args) {
	const sensitiveValueFlags = /* @__PURE__ */ new Set([
		"--system-prompt",
		"--append-system-prompt",
		"--settings",
		"--mcp-config"
	]);
	const out = [];
	for (let i = 0; i < args.length; i++) {
		const tok = args[i];
		if (!tok.startsWith("-")) {
			out.push(`<positional:${tok}>`);
			continue;
		}
		const next = args[i + 1];
		if (next === void 0 || next.startsWith("-")) {
			out.push(tok);
			continue;
		}
		if (sensitiveValueFlags.has(tok)) out.push(`${tok}=<len=${next.length}>`);
		else out.push(`${tok}=${next}`);
		i++;
	}
	return out.join(" ");
}
//#endregion
Object.defineProperty(exports, "summarizeAgentCliArgsForLog", {
	enumerable: true,
	get: function() {
		return summarizeAgentCliArgsForLog;
	}
});
