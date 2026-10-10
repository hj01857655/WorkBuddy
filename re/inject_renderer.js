// Injected into the WorkBuddy renderer page via Chromium CDP.
// Wraps fetch / XHR / WebSocket, logging Tencent AI traffic into window.__wbCap.
(function () {
  if (window.__wbCapInstalled) return "already";
  window.__wbCap = [];
  window.__wbCapInstalled = true;
  const MATCH = /agentos-worker\.net|workbuddy\.cn|copilot\.tencent\.com|tencentbuddy\.com|codebuddy\.(cn|ai)/i;
  const cap = (type, url, detail) => {
    try {
      if (!MATCH.test(String(url))) return;
      if (window.__wbCap.length > 400) return;
      window.__wbCap.push({ t: Date.now(), type, url: String(url), detail });
    } catch (e) {}
  };

  // fetch
  const origFetch = window.fetch;
  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || String(input);
    let headers, body, method = "GET";
    try {
      if (init) {
        method = init.method || "GET";
        if (init.headers) {
          headers = {};
          if (typeof init.headers.forEach === "function") init.headers.forEach((v, k) => (headers[k] = v));
          else headers = JSON.parse(JSON.stringify(init.headers));
        }
        body = typeof init.body === "string" ? init.body : init.body ? "(non-string)" : undefined;
      } else if (input && typeof input === "object") {
        method = input.method || "GET";
        if (input.headers) {
          headers = {};
          if (typeof input.headers.forEach === "function") input.headers.forEach((v, k) => (headers[k] = v));
          else headers = JSON.parse(JSON.stringify(input.headers));
        }
      }
    } catch (e) {}
    cap("fetch-req", url, { method, headers, body: body ? String(body).slice(0, 16000) : undefined });
    const p = origFetch.apply(this, arguments);
    try {
      p.then((resp) => {
        cap("fetch-resp", url, { status: resp.status, ct: resp.headers && resp.headers.get ? resp.headers.get("content-type") : undefined, connId: resp.headers && resp.headers.get ? resp.headers.get("Acp-Connection-Id") : undefined });
      }).catch(() => {});
    } catch (e) {}
    return p;
  };

  // XHR
  const xo = XMLHttpRequest.prototype.open;
  const xs = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u) {
    this.__wb = { m, u };
    return xo.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function (b) {
    try {
      if (this.__wb) cap("xhr", this.__wb.u, { method: this.__wb.m, body: b ? String(b).slice(0, 16000) : undefined });
    } catch (e) {}
    return xs.apply(this, arguments);
  };

  // WebSocket
  const OW = window.WebSocket;
  function WB(url, protocols) {
    cap("ws-open", url, { protocols });
    const ws = protocols !== undefined ? new OW(url, protocols) : new OW(url);
    const origSend = ws.send.bind(ws);
    ws.send = function (d) {
      cap("ws-send", url, { data: typeof d === "string" ? d.slice(0, 16000) : "(binary)" });
      return origSend(d);
    };
    ws.addEventListener("message", (ev) => cap("ws-recv", url, { data: typeof ev.data === "string" ? ev.data.slice(0, 16000) : "(binary)" }));
    return ws;
  }
  WB.prototype = OW.prototype;
  WB.CONNECTING = OW.CONNECTING; WB.OPEN = OW.OPEN; WB.CLOSING = OW.CLOSING; WB.CLOSED = OW.CLOSED;
  window.WebSocket = WB;
  return "installed";
})();
