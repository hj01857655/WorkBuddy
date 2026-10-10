// Tencent Lexiang webview preload — 加载在 partition="persist:lexiang" 的
// <webview> 里（src=私有化乐享域名）。
//
// webview 是独立 guest 进程，window.parent.postMessage 到不了 host renderer。
// 本 preload 在 guest 内监听 message 事件，通过 ipcRenderer.sendToHost 转发给 host，
// 并监听 host 通过 webview.send 发来的消息，转发到 guest 页面的 window。
//
// 双向桥接：
//   guest → host：window message → ipcRenderer.sendToHost('lexiang:message', { origin, data })
//   host → guest：ipcRenderer.on('lexiang:message') → window.postMessage(data, '*')
//
// Plain CommonJS：通过 <webview preload> 直接以 file:// 加载，不走构建管线。

'use strict';

try {
    const { ipcRenderer } = require('electron');
    const EXTERNAL_LINK_BRIDGE_TYPE = 'lexiang-webview:open-external';

    function toHttpUrl(rawUrl) {
        if (typeof rawUrl !== 'string' || !rawUrl.trim()) { return null; }
        try {
            const url = new URL(rawUrl, location.href);
            return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
        } catch {
            return null;
        }
    }

    function reportExternalLink(rawUrl, reason) {
        const url = toHttpUrl(rawUrl);
        if (!url) { return false; }
        ipcRenderer.sendToHost('lexiang:open-external', { url, reason });
        return true;
    }

    function findAnchor(event) {
        const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
        for (const node of path) {
            if (node && node.nodeType === 1 && node.tagName === 'A') { return node; }
        }
        let node = event.target;
        while (node && node.nodeType === 1) {
            if (node.tagName === 'A') { return node; }
            node = node.parentNode;
        }
        return null;
    }

    function handleBlankTargetClick(event) {
        try {
            if (event.button !== 0 && event.button !== 1) { return; }
            const anchor = findAnchor(event);
            if (!anchor || String(anchor.target).toLowerCase() !== '_blank') { return; }
            const href = anchor.getAttribute('href') || anchor.href || '';
            if (!reportExternalLink(href, event.type)) { return; }
            event.preventDefault();
            event.stopImmediatePropagation();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[lexiang-webview-preload] external click handling failed:', err);
        }
    }

    // 乐享页面可能在业务 click handler 中 preventDefault，导致 Chromium 不产生
    // new-window 事件。preload 在 capture 阶段抢先接管明确的 target="_blank" 链接。
    document.addEventListener('click', handleBlankTargetClick, { capture: true });
    document.addEventListener('auxclick', handleBlankTargetClick, { capture: true });

    // ── 1. guest → host：监听 guest 页面的 message 事件，转发给 host ──
    window.addEventListener(
        'message',
        event => {
            try {
                // main world 中的 window.open / 脚本触发 anchor.click 无法被 isolated world
                // 直接改写，通过 postMessage 桥接回来。
                if (event && event.data && event.data.__type === EXTERNAL_LINK_BRIDGE_TYPE) {
                    reportExternalLink(event.data.url, event.data.reason || 'main-world');
                    return;
                }
                // 跳过我们自己注入的 host→guest 桥接消息，避免回环。
                if (event && event.data && event.data.__lexiang_webview_bridge === true) {
                    return;
                }

                const origin = (event && event.origin) || '';
                ipcRenderer.sendToHost('lexiang:message', {
                    origin,
                    data: event.data,
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[lexiang-webview-preload] forward to host failed:', err);
            }
        },
        { capture: true },
    );

    // ── 2. host → guest：监听 host 通过 webview.send 发来的消息，转发到 guest 页面 ──
    ipcRenderer.on('lexiang:message', (_event, payload) => {
        try {
            // 用 __lexiang_webview_bridge 标记防止 guest→host 方向回环。
            window.postMessage(
                { ...payload, __lexiang_webview_bridge: true },
                '*',
            );
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[lexiang-webview-preload] forward to guest failed:', err);
        }
    });

    // contextIsolation 下页面脚本与 preload 不在同一 world。补丁注入 main world，
    // 覆盖 window.open 以及脚本触发的 detached anchor.click；真实鼠标点击仍由上面的
    // capture listener 处理。这里只接管 http(s)，不按域名做白名单限制。
    const mainWorldPatch = `
    (function () {
        'use strict';
        if (window.__lexiangExternalLinkPatched__) { return; }
        window.__lexiangExternalLinkPatched__ = true;
        var BRIDGE_TYPE = ${JSON.stringify(EXTERNAL_LINK_BRIDGE_TYPE)};

        function postExternal(rawUrl, reason) {
            if (typeof rawUrl !== 'string' || !rawUrl.trim()) { return false; }
            var url;
            try { url = new URL(rawUrl, location.href); }
            catch (e) { return false; }
            if (url.protocol !== 'http:' && url.protocol !== 'https:') { return false; }
            window.postMessage({ __type: BRIDGE_TYPE, url: url.toString(), reason: reason }, '*');
            return true;
        }

        try {
            var originalOpen = window.open;
            window.open = function patchedOpen(rawUrl) {
                if (postExternal(rawUrl, 'window.open')) { return null; }
                return originalOpen.apply(this, arguments);
            };
        } catch (e) { /* ignore */ }

        try {
            var anchorPrototype = HTMLAnchorElement.prototype;
            var originalAnchorClick = anchorPrototype.click;
            anchorPrototype.click = function patchedAnchorClick() {
                var target = String(this.target || '').toLowerCase();
                var href = this.getAttribute('href') || this.href || '';
                if (target === '_blank' && postExternal(href, 'anchor.click')) { return; }
                return originalAnchorClick.apply(this, arguments);
            };
        } catch (e) { /* ignore */ }
    })();
    `;

    const injectMainWorldPatch = () => {
        try {
            const blob = new Blob([mainWorldPatch], { type: 'application/javascript' });
            const scriptUrl = URL.createObjectURL(blob);
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.onload = () => {
                URL.revokeObjectURL(scriptUrl);
                script.remove();
            };
            script.onerror = () => URL.revokeObjectURL(scriptUrl);
            (document.head || document.documentElement).appendChild(script);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('[lexiang-webview-preload] main-world patch injection failed:', err);
        }
    };
    if (document.documentElement) {
        injectMainWorldPatch();
    } else {
        document.addEventListener('readystatechange', injectMainWorldPatch, { once: true });
    }
} catch (err) {
    // eslint-disable-next-line no-console
    console.error('[lexiang-webview-preload] init failed:', err);
}
