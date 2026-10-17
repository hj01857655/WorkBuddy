# -*- coding: utf-8 -*-
"""adapters — 协议翻译层：把 Responses / Anthropic 翻成上游的母语 Chat Completions。

上游只讲 Chat（母语），本包两个模块是「方言 ⇄ 母语」的双向翻译：

    anthropic.py   Anthropic Messages ⇄ Chat   （Claude Code / Kiro 这类客户端入口）
    responses.py   OpenAI Responses  ⇄ Chat   （dsh / Codex 这类客户端入口）

两者对外是同一组口子：请求体 → Chat 体、Chat SSE 行 → 目标协议 SSE 行、
聚合结果 → 目标协议 JSON。放在包里而不是散在仓库根，是为了让根目录只留
入口（server.py）与领域模块（workbuddy / credential / oauth / checkin）。

目录名取 adapter 是跟社区对齐：one-api 用 `relay/adaptor/`、Portkey 用 `src/providers/`、
LiteLLM 用 `llms/<provider>/`——同一个语义（把外部那一侧的协议适配到内部母语），
它们都叫 adapter/provider，没有叫 bridge 的。
"""
from adapters import anthropic, responses  # noqa: F401  （`import adapters` 后可直接取用）

__all__ = ["anthropic", "responses"]
