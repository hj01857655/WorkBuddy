// Patch child_process.spawn in the running main process (via --inspect CDP)
// so that respawned daemon/sidecar/CLI children get our --require hook.
const wsUrl = process.argv[2];
const expr = [
  "(function(){",
  "const cp=process.mainModule.require('child_process');",
  "if(cp.spawn.__wbpatched)return 'already';",
  "const orig=cp.spawn;",
  "const RE='daemon-app-server-entry|sidecar-entry|qimei-helper|codebuddy-headless|cbc-prewarm';",
  "const f=function(file,args,opts){",
  "  try{",
  "    if(Array.isArray(args)&&args.some(function(a){return typeof a==='string'&&new RegExp(RE).test(a)})){",
  "      args=['--require=E:/VSCodeSpace/ZCode/workbuddy/re/hook_fetch.js'].concat(args);",
  "    }",
  "  }catch(e){}",
  "  return orig.call(this,file,args,opts);",
  "};",
  "f.__wborig=orig;f.__wbpatched=true;cp.spawn=f;return 'patched';",
  "})()"
].join("\n");

const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
const send = (m, pr) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: pr })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } };
ws.onopen = async () => {
  try {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    console.log('eval:', JSON.stringify(r.result));
  } catch (e) { console.error('EVALFAIL', e.message); }
  process.exit(0);
};
ws.onerror = () => { console.error('wserr'); process.exit(1); };
setTimeout(() => { console.error('timeout'); process.exit(2); }, 12000);
