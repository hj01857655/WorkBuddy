// Generic CDP evaluator: node cdp_eval.js <ws-url> <expr-file|inline:EXPR>
const fs = require("fs");
const wsUrl = process.argv[2];
const arg = process.argv[3] || "";
const expr = arg.startsWith("inline:") ? arg.slice(7) : fs.readFileSync(arg, "utf8");

const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
const send = (m, pr) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: pr })); });
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const h = pending.get(m.id); pending.delete(m.id);
    m.error ? h.rej(new Error(JSON.stringify(m.error))) : h.res(m.result);
  }
};
ws.onopen = async () => {
  try {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result && r.result.value !== undefined) console.log(r.result.value);
    else console.log(JSON.stringify(r).slice(0, 2000));
  } catch (e) { console.error('EVALFAIL', e.message); }
  process.exit(0);
};
ws.onerror = () => { console.error('wserr'); process.exit(1); };
setTimeout(() => { console.error('timeout'); process.exit(2); }, 15000);
