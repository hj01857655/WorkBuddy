# -*- coding: utf-8 -*-
"""/v1/responses 路由端到端验证（Flask test_client + mock workbuddy 上游）。

monkeypatch 掉 workbuddy.open_chat_stream / iter_sse / aggregate / build_payload
/ credential.load，覆盖：
  1. /v1/responses 流式：Responses SSE 合法（seq 连续、生命周期、usage、items）
  2. /v1/responses 非流式：Responses JSON 合法
  3. /v1/responses 上游非 200：错误透传
  4. /v1/chat/completions 流式回归：_chat_sse_lines 抽取不破坏老路由
"""
import json

import server


class FakeUpstream:
    def __init__(self, status=200, error_body=b""):
        self.status_code = status
        self._error_body = error_body
        self.headers = {"Content-Type": "application/json"}
        self.closed = False

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()
        return False

    def close(self):
        self.closed = True

    @property
    def content(self):
        return self._error_body

    @property
    def text(self):
        return self._error_body.decode("utf-8", "replace")

    def json(self):
        return json.loads(self.text)


def parse_frames(raw):
    events = []
    for block in raw.split(b"\n\n"):
        block = block.strip()
        if not block.startswith(b"data:"):
            continue
        payload = block[5:].decode("utf-8").strip()
        if not payload or payload == "[DONE]":
            continue
        events.append(json.loads(payload))
    return events


USAGE = {"prompt_tokens": 10, "completion_tokens": 7, "total_tokens": 17,
         "completion_tokens_details": {"reasoning_tokens": 3},
         "prompt_tokens_details": {"cached_tokens": 0}}

STREAM_EVENTS = [
    ("reasoning", "think "),
    ("reasoning", "ok"),
    ("content", "Hi!"),
    ("tool_calls", [{"index": 0, "id": "call_1", "type": "function",
                     "function": {"name": "get_weather",
                                  "arguments": '{"city": "BJ"}'}}]),
    ("finish", "tool_calls"),
    ("usage", USAGE),
    ("done", None),
]

captured = {}


def install_fake(kind):
    server.API_KEY = ""
    server.credential.load = lambda: {"token": "fake"}
    server.workbuddy.build_payload = (
        lambda body: captured.update(payload=body) or {"model": body.get("model")})

    def open_chat_stream(payload, cred):
        if kind == "error":
            return FakeUpstream(status=400,
                                error_body=b'{"message":"param invalid"}')
        return FakeUpstream()

    def iter_sse(upstream):
        for kind_, value in STREAM_EVENTS:
            yield kind_, value

    def aggregate(upstream, model, chunk_id):
        return {"id": "c2", "object": "chat.completion", "created": 1, "model": model,
                "choices": [{"index": 0,
                             "message": {"role": "assistant", "content": "Hi!",
                                         "reasoning_content": "think ok"},
                             "finish_reason": "stop"}],
                "usage": USAGE}

    server.workbuddy.open_chat_stream = open_chat_stream
    server.workbuddy.iter_sse = iter_sse
    server.workbuddy.aggregate = aggregate


def main():
    client = server.app.test_client()

    resp_req = {
        "model": "test-model",
        "stream": True,
        "instructions": "sys prompt",
        "input": [{"type": "message", "role": "user", "content": "hello"}],
        "tools": [{"type": "function", "name": "get_weather", "description": "w",
                   "parameters": {"type": "object",
                                  "properties": {"city": {"type": "string"}}}}],
    }

    # ---------- 1) /v1/responses 流式 ----------
    install_fake("stream")
    r = client.post("/v1/responses", json=resp_req)
    assert r.status_code == 200, (r.status_code, r.data[:500])
    assert "text/event-stream" in r.headers.get("Content-Type", "")

    # 请求侧：到上游的应该是 Chat 格式
    cb = captured["payload"]
    assert cb["messages"][0] == {"role": "system", "content": "sys prompt"}
    assert cb["messages"][1] == {"role": "user", "content": "hello"}
    assert cb["stream"] is True
    assert cb["tools"][0]["function"]["name"] == "get_weather"

    events = parse_frames(r.data)
    seqs = [e["sequence_number"] for e in events]
    assert seqs == list(range(len(events))), seqs
    types = [e["type"] for e in events]
    print("responses 流事件序列（%d 帧）:" % len(events))
    for i, e in enumerate(events):
        print("  %2d %s" % (i, e["type"]))
    assert types[0] == "response.created"
    assert types[1] == "response.in_progress"
    assert types[-1] == "response.completed"
    final = events[-1]["response"]
    for k in ("id", "object", "created_at", "model", "status", "output"):
        assert k in final, k
    assert final["status"] == "completed"
    assert [o["type"] for o in final["output"]] == \
        ["reasoning", "message", "function_call"], final["output"]
    assert final["usage"]["total_tokens"] == 17
    assert final["usage"]["output_tokens_details"]["reasoning_tokens"] == 3
    fn = final["output"][2]
    assert fn["call_id"] == "call_1" and fn["arguments"] == '{"city": "BJ"}'

    # ---------- 2) /v1/responses 非流式 ----------
    install_fake("stream")
    r = client.post("/v1/responses", json=dict(resp_req, stream=False))
    assert r.status_code == 200, (r.status_code, r.data[:500])
    out = r.get_json()
    assert out["object"] == "response" and out["status"] == "completed"
    assert [o["type"] for o in out["output"]] == ["reasoning", "message"]
    assert out["usage"]["total_tokens"] == 17

    # ---------- 3) 上游非 200 ----------
    install_fake("error")
    r = client.post("/v1/responses", json=resp_req)
    assert r.status_code == 400, (r.status_code, r.data[:300])
    assert "param invalid" in r.get_data(as_text=True)

    # ---------- 4) /v1/chat/completions 回归 ----------
    install_fake("stream")
    r = client.post("/v1/chat/completions",
                    json={"model": "test-model", "stream": True,
                          "messages": [{"role": "user", "content": "hi"}]})
    assert r.status_code == 200, (r.status_code, r.data[:300])
    assert b"data: " in r.data and b"[DONE]" in r.data
    chunks = parse_frames(r.data)
    assert any("tool_calls" in json.dumps(c) for c in chunks)

    print("ALL PASS")


if __name__ == "__main__":
    main()
