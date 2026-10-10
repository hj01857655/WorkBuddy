// Injected via NODE_OPTIONS=--require=... into WorkBuddy daemon/CLI processes.
// Logs outbound HTTP to Tencent AI endpoints: full headers + bodies (ACP handshake capture).
const fs = require("fs");
const LOG = "E:/VSCodeSpace/ZCode/workbuddy/re/hook-traffic.jsonl";
const MATCH = /agentos-worker\.net|workbuddy\.cn|copilot\.tencent\.com|tencentbuddy\.com|codebuddy\.(cn|ai)|beacon\.qq\.com|127\.0\.0\.1|localhost/i;

function emit(rec) {
  try { fs.appendFileSync(LOG, JSON.stringify(rec) + "\n"); } catch {}
}

function interesting(url) { return typeof url === "string" && MATCH.test(url); }

function rec(label, url, opts, body) {
  if (!interesting(url)) return;
  const headers = opts && opts.headers ? JSON.parse(JSON.stringify(opts.headers)) : undefined;
  emit({ t: Date.now(), pid: process.pid, ppid: process.ppid, type: label, url: String(url), method: (opts && opts.method) || "GET", headers, body: body ? String(body).slice(0, 12000) : undefined });
}

// 1) global fetch (undici)
if (typeof globalThis.fetch === "function") {
  const orig = globalThis.fetch;
  globalThis.fetch = function (input, init) {
    try {
      const url = typeof input === "string" ? input : (input && input.url) || String(input);
      let opts = init;
      if (!init && input && typeof input === "object") {
        // Request object: pull headers/method/body best-effort
        opts = { method: input.method, headers: input.headers && typeof input.headers.headers === "object" ? input.headers.headers : input.headers };
        try { if (input.body) opts._bodyNote = "Request-body-nonempty"; } catch {}
        rec("fetch-req", url, opts, opts && opts._bodyNote ? "(Request object body)" : undefined);
        return orig.apply(this, arguments);
      }
      let body;
      if (init && init.body) {
        body = typeof init.body === "string" ? init.body : "(non-string body)";
      }
      rec("fetch", url, opts, body);
    } catch {}
    return orig.apply(this, arguments);
  };
}

// 2) node:http(s) — axios & friends
for (const mod of ["http", "https"]) {
  try {
    const m = require(mod);
    const orig = m.request;
    m.request = function (...args) {
      try {
        const [arg0, arg1] = args;
        const opts = typeof arg0 === "string" || arg0 instanceof URL ? arg1 || {} : arg0 || {};
        const url = typeof arg0 === "string" || arg0 instanceof URL ? String(arg0) : `http${m === require("https") ? "s" : ""}://${opts.host || opts.hostname}${opts.port ? ":" + opts.port : ""}${opts.path || arg0.path || ""}`;
        const isWs = /websocket|agentos/i.test(String(url));
        if (interesting(url) || isWs) {
          emit({ t: Date.now(), pid: process.pid, type: "http.request", url: String(url), method: opts.method || "GET", headers: opts.headers, });
        }
        if (isWs) {
          const req = orig.apply(this, args);
          try {
            req.on("upgrade", (res, socket) => {
              emit({ t: Date.now(), pid: process.pid, type: "ws-upgraded", url: String(url) });
              socket.on("data", (d) => emit({ t: Date.now(), pid: process.pid, type: "tls-in", url: String(url), data: d.toString("utf8").slice(0, 16000) }));
              const ow = socket.write.bind(socket);
              socket.write = function (d) {
                if (typeof d === "string" || Buffer.isBuffer(d)) emit({ t: Date.now(), pid: process.pid, type: "tls-out", url: String(url), data: d.toString("utf8").slice(0, 16000) });
                return ow(d);
              };
            });
          } catch (e) {}
          return req;
        }
      } catch {}
      return orig.apply(this, args);
    };
  } catch {}
}

// 3) undici package fetch if bundled separately
try {
  const undici = require("undici");
  if (undici && undici.fetch && !undici.fetch.__wbhook) {
    const orig = undici.fetch;
    const wrapped = function (input, init) {
      try {
        const url = typeof input === "string" ? input : (input && input.url) || "";
        let body = init && init.body ? (typeof init.body === "string" ? init.body : "(non-string)") : undefined;
        rec("undici.fetch", url, init, body);
      } catch {}
      return orig.apply(this, arguments);
    };
    wrapped.__wbhook = true;
    undici.fetch = wrapped;
  }
} catch {}

emit({ t: Date.now(), pid: process.pid, ppid: process.ppid, type: "hook-installed", title: process.title, argv: process.argv.slice(0, 3) });

// 4) ws package frames — ACP transport hijack point
const Module = require("module");
const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  const mod = origLoad.apply(this, arguments);
  if (request === "ws" && mod && mod.WebSocket && !mod.WebSocket.__wbhook) {
    const WS = mod.WebSocket;
    function WB(url, protocols) {
      const w = protocols !== undefined ? new WS(url, protocols) : new WS(url);
      try {
        emit({ t: Date.now(), pid: process.pid, type: "ws-connect", url: String(url) });
        w.on("open", () => emit({ t: Date.now(), pid: process.pid, type: "ws-open", url: String(url) }));
        w.on("message", (data) => emit({ t: Date.now(), pid: process.pid, type: "ws-frame-in", url: String(url), data: String(data).slice(0, 16000) }));
        const origSend = w.send.bind(w);
        w.send = function (d) {
          emit({ t: Date.now(), pid: process.pid, type: "ws-frame-out", url: String(url), data: typeof d === "string" ? d.slice(0, 16000) : "(binary)" });
          return origSend(d);
        };
      } catch (e) {}
      return w;
    }
    Object.assign(WB, WS);
    WB.__wbhook = true;
    mod.WebSocket = WB;
    emit({ t: Date.now(), pid: process.pid, type: "ws-hook-installed" });
  }
  return mod;
};

// 5) in-process spawn patch: any child we spawn (CLI etc.) inherits this hook
try {
  const cp = require("child_process");
  if (!cp.spawn.__wbpatched) {
    const orig = cp.spawn;
    const SELF = __filename;
    const RE = /bin[\/]codebuddy|codebuddy-headless|cbc-prewarm|daemon-app-server-entry|sidecar-entry/;
    const f = function (file, args, opts) {
      try {
        if (Array.isArray(args) && args.some(a => typeof a === "string" && RE.test(a))) {
          if (!args.some(a => typeof a === "string" && a.includes("hook_fetch"))) {
            args = ["--require=" + SELF].concat(args);
          }
        }
      } catch (e) {}
      return orig.call(this, file, args, opts);
    };
    f.__wbpatched = true; f.__wborig = orig; cp.spawn = f;
    emit({ t: Date.now(), pid: process.pid, type: "spawn-patch-installed" });
  }
} catch (e) {}

// 6) deepest net: patch ChildProcess.prototype.spawn (catches fork/execFile too)
try {
  const cp = require("child_process");
  const CPS = cp.ChildProcess && cp.ChildProcess.prototype;
  if (CPS && !CPS.spawn.__wbpatched) {
    const orig = CPS.spawn;
    const SELF = __filename;
    const RE = /bin[\/]codebuddy|codebuddy-headless|cbc-prewarm/;
    CPS.spawn = function (options) {
      try {
        if (options && Array.isArray(options.args) && options.args.some(a => typeof a === "string" && RE.test(a))) {
          if (!options.args.some(a => typeof a === "string" && a.includes("hook_fetch"))) {
            options = Object.assign({}, options, { args: ["--require=" + SELF].concat(options.args) });
          }
        }
      } catch (e) {}
      return orig.call(this, options);
    };
    CPS.spawn.__wbpatched = true;
    emit({ t: Date.now(), pid: process.pid, type: "cps-spawn-patch-installed" });
  }
} catch (e) {}

// 7) capture request bodies written after http.request (axios streams)
try {
  const httpm = require("http"), httpsm = require("https");
  for (const [name, m] of [["http", httpm], ["https", httpsm]]) {
    if (m.request.__wbbodyhook) continue;
    const orig = m.request;
    m.request = function (...args) {
      const req = orig.apply(this, args);
      try {
        const url = (req && req.getHeader && req.getHeader("host")) || "";
        if (/workbuddy|codebuddy|agentos/i.test(String(url))) {
          const chunks = [];
          const ow = req.write.bind(req);
          const end = req.end.bind(req);
          req.write = function (d) {
            if (d) { chunks.push(Buffer.isBuffer(d) ? d : Buffer.from(String(d))); }
            return ow.apply(null, arguments);
          };
          req.end = function (d) {
            if (d) chunks.push(Buffer.isBuffer(d) ? d : Buffer.from(String(d)));
            try { emit({ t: Date.now(), pid: process.pid, type: "req-body-b64", url: `https://${url}`, b64: Buffer.concat(chunks).toString("base64").slice(0, 300000), n: chunks.length }); } catch (e) {}
            return end.apply(null, arguments);
          };
        }
      } catch (e) {}
      return req;
    };
    m.request.__wbbodyhook = true;
  }
} catch (e) {}
