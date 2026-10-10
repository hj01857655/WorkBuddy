// Client-menu (custom 菜单) webview preload —— 运行在
// `<webview partition="client-menu-webview">` 内，承载运营平台下发的自建菜单页。
//
// 为什么需要这个 preload（issue #40861）：
//
//   自建菜单页通过 wb SDK 向宿主请求登录态（`wb:getToken` / `wb:getUserInfo`），
//   SDK 的实现是 `window.parent.postMessage(request)` + 监听 `window` 的
//   `message` 事件拿响应。
//
//   在 Web 端，菜单页是 DOM `<iframe>`，`window.parent` 就是宿主 renderer 的
//   window，宿主 `window.addEventListener('message')` 能直接收到请求并回投响应。
//
//   但在 Desktop 端，菜单页跑在 Electron `<webview>` 里 —— 这是一个**独立的
//   webContents**，它的 `window` 与宿主 renderer 的 `window` 完全隔离。
//   guest 页的 `window.postMessage` **不会**冒泡到宿主 window，所以宿主侧
//   `window.addEventListener('message')`（见 webview-menu-host 旧实现）永远收不到
//   `wb:getToken`，桌面自建菜单的鉴权通道就此失效。
//
//   唯一可靠的桥接方式：在 guest 内部挂这个 preload，用 `ipcRenderer.sendToHost`
//   把 wb: 请求抛回宿主 renderer（宿主侧 `webview.addEventListener('ipc-message')`
//   接收），宿主处理完再通过 `webview.send('client-menu:wb-response', ...)` 把响应
//   投回来，preload 收到后用 `window.postMessage` 重新派发到 guest window，触发
//   guest SDK 的响应监听。
//
// 通信链路：
//
//   guest 页  --window.postMessage(wb:getToken)-->  preload(本文件, isolated world)
//   preload   --ipcRenderer.sendToHost('client-menu:wb-request')-->  宿主 renderer
//   宿主       --webview.send('client-menu:wb-response')-->  preload
//   preload   --window.postMessage(wb:getToken:response)-->  guest 页 SDK
//
// 注意：
//   - 在 webview 顶层 frame 中 `window.parent === window`，所以 SDK 的
//     `window.parent.postMessage` 与 `window.postMessage` 都落在本 window 上，
//     preload 的 `window` message 监听都能捕获。
//   - 只转发「请求」（wb:* 且非 *:response），避免把宿主回投的响应又当请求转回去
//     造成死循环。
//
// Plain CommonJS on purpose：本文件以 file:// URL 通过 `<webview preload>` 加载，
// 不经过 renderer 构建管线。

'use strict';

try {
    const { contextBridge, ipcRenderer } = require('electron');

    // ── 新链路（wb bridge）：暴露 __wbWebview 给 guest 主世界 ───────────
    //   guest 内 `createWebviewInvoke(window.__wbWebview)` + `createClient(ns, invoke)`
    //   即可标准 `wb.ns.method()`；request/response/event 全走单通道 wb:webview:message，
    //   由宿主 createWebviewTransport 经白名单转发到 daemon（见 attach-webview-bridge）。
    //   与下方旧 wb:getToken/getUserInfo 协议并存（存量外部菜单页无法改 JS，渐进迁移）。
    try {
        contextBridge.exposeInMainWorld('__wbWebview', {
            send: (channel, payload) => ipcRenderer.sendToHost(channel, payload),
            on: (channel, callback) => {
                const listener = (_event, payload) => callback(payload);
                ipcRenderer.on(channel, listener);
                return () => ipcRenderer.removeListener(channel, listener);
            },
        });
    } catch (bridgeErr) {
        // eslint-disable-next-line no-console
        console.error('[client-menu-preload] expose __wbWebview failed:', bridgeErr);
    }

    // ── guest → host：转发 wb:* 请求 ───────────────────────────────────
    window.addEventListener('message', event => {
        try {
            // 只接受当前顶层 guest 自己发出的消息，拒绝嵌套 frame 冒充 SDK 请求。
            if (!event || event.source !== window || event.origin !== window.location.origin) { return; }
            const data = event.data;
            if (!data || typeof data !== 'object') { return; }
            if (typeof data.type !== 'string') { return; }
            if (!data.type.startsWith('wb:')) { return; }
            // 宿主回投的响应（wb:xxx:response）不再回传，避免死循环
            if (data.type.endsWith(':response')) { return; }
            if (!data.requestId) { return; }

            ipcRenderer.sendToHost('client-menu:wb-request', {
                type: data.type,
                requestId: data.requestId,
                applicationId: typeof data.applicationId === 'string' ? data.applicationId : undefined,
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[client-menu-preload] request bridge error:', err);
        }
    });

    // ── host → guest：把宿主处理结果重新派发到 guest window ─────────────
    ipcRenderer.on('client-menu:wb-response', (_event, payload) => {
        try {
            if (!payload || typeof payload !== 'object') { return; }
            // payload 形如 { type: 'wb:getToken:response', requestId, code, message, data }
            window.postMessage(payload, window.location.origin);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[client-menu-preload] response bridge error:', err);
        }
    });

    // eslint-disable-next-line no-console
    console.info('[client-menu-preload] loaded');
} catch (err) {
    // eslint-disable-next-line no-console
    console.error('[client-menu-preload] initialization failed:', err);
}
