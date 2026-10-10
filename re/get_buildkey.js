// Connect to Electron main-process inspector and fetch the at-rest build key payload.
// usage: node get_buildkey.js <ws-url>
const wsUrl = process.argv[2];
const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();

function send(method, params) {
  return new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
}

ws.onopen = async () => {
  try {
    const res = await send('Runtime.evaluate', {
      expression: `JSON.stringify(require('electron').workbuddyStorage.loggerGet())`,
      returnByValue: true,
    });
    if (res.result && res.result.value) {
      console.log('===KEYPAYLOAD===');
      console.log(res.result.value);
      console.log('===END===');
    } else {
      console.error('unexpected:', JSON.stringify(res).slice(0, 2000));
    }
  } catch (e) {
    console.error('eval failed:', e.message);
  } finally {
    process.exit(0);
  }
};
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  }
};
ws.onerror = (e) => { console.error('ws error'); process.exit(1); };
setTimeout(() => { console.error('timeout'); process.exit(2); }, 15000);
