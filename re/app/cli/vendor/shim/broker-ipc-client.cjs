/**
 * Neutral broker IPC client for vendor shims.
 *
 * Owns JSON-line socket transport only. Runtime-specific request semantics and
 * response classification stay in the caller.
 */

'use strict';

const net = require('net');
const { spawnSync } = require('child_process');

const DEFAULT_TIMEOUT_MS = 20_000;
const MAX_CONCURRENT_REQUESTS = 128;
const MAX_CONCURRENT_ASYNC_REQUESTS = MAX_CONCURRENT_REQUESTS - 1;
const MAX_QUEUED_REQUESTS = 8192;
const REQUEST_QUEUE_PRIORITIES = Object.freeze({ low: 0, normal: 1, high: 2 });
let activeAsyncRequests = 0;
let queuedRequestCount = 0;
const requestWaiters = [new Set(), new Set(), new Set()];

function requestTimeoutError() {
    const error = new Error('Broker request timed out');
    error.code = 'CODEBUDDY_BROKER_TIMEOUT';
    return error;
}

function requestQueueTimeoutError() {
    const error = new Error('Broker request timed out while waiting for an IPC slot');
    error.code = 'CODEBUDDY_BROKER_QUEUE_TIMEOUT';
    error.brokerRequestSent = false;
    return error;
}

function requestQueueFullError() {
    const error = new Error('Broker request queue is full');
    error.code = 'CODEBUDDY_BROKER_QUEUE_FULL';
    error.brokerRequestSent = false;
    return error;
}

function requestQueueEvictedError() {
    const error = new Error('Broker request was evicted from the queue by a higher-priority request');
    error.code = 'CODEBUDDY_BROKER_QUEUE_EVICTED';
    error.brokerRequestSent = false;
    return error;
}

function requestQueuePriority(priority) {
    return Object.hasOwn(REQUEST_QUEUE_PRIORITIES, priority)
        ? REQUEST_QUEUE_PRIORITIES[priority]
        : REQUEST_QUEUE_PRIORITIES.normal;
}

function removeRequestWaiter(waiter) {
    if (!requestWaiters[waiter.priority].delete(waiter)) {
        return false;
    }
    queuedRequestCount--;
    return true;
}

function evictLowerPriorityRequest(priority) {
    for (let candidatePriority = REQUEST_QUEUE_PRIORITIES.low; candidatePriority < priority; candidatePriority++) {
        for (const waiter of requestWaiters[candidatePriority]) {
            if (!waiter.evictable || !removeRequestWaiter(waiter)) { continue; }
            waiter.reject(requestQueueEvictedError());
            return true;
        }
    }
    return false;
}

function acquireRequestSlot(timeoutMs, options) {
    if (activeAsyncRequests < MAX_CONCURRENT_ASYNC_REQUESTS) {
        activeAsyncRequests++;
        return Promise.resolve();
    }
    const priority = requestQueuePriority(options.queuePriority);
    if (queuedRequestCount >= MAX_QUEUED_REQUESTS
        && (!options.queueEvictLowerPriority || !evictLowerPriorityRequest(priority))) {
        return Promise.reject(requestQueueFullError());
    }
    return new Promise((resolve, reject) => {
        const waiter = {
            priority,
            evictable: options.queueEvictable === true,
            resolve: () => {
                clearTimeout(waiter.timer);
                resolve();
            },
            reject: error => {
                clearTimeout(waiter.timer);
                reject(error);
            },
        };
        waiter.timer = setTimeout(() => {
            if (!removeRequestWaiter(waiter)) { return; }
            waiter.reject(requestQueueTimeoutError());
        }, timeoutMs);
        requestWaiters[priority].add(waiter);
        queuedRequestCount++;
    });
}

function releaseRequestSlot() {
    for (let priority = REQUEST_QUEUE_PRIORITIES.high; priority >= REQUEST_QUEUE_PRIORITIES.low; priority--) {
        const next = requestWaiters[priority].values().next().value;
        if (next && removeRequestWaiter(next)) {
            next.resolve();
            return;
        }
    }
    activeAsyncRequests--;
}

function brokerTimeoutMs() {
    const parsed = Number.parseInt(process.env.CODEBUDDY_SANDBOX_BROKER_TIMEOUT_MS || '', 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS;
}

function brokerSocketPath() {
    return process.env.CODEBUDDY_SANDBOX_BROKER_IPC_ADDRESS;
}

function parseBrokerResponse(line) {
    try {
        return JSON.parse(String(line || '').trim());
    } catch (error) {
        throw new Error(`Invalid broker response: ${error && error.message ? error.message : error}`);
    }
}

function markBrokerRequestState(error, requestSent) {
    const brokerError = error instanceof Error ? error : new Error(String(error));
    brokerError.brokerRequestSent = requestSent;
    return brokerError;
}

function nativeSyncErrorMayHaveBeenSent(error) {
    const message = error && error.message ? error.message : String(error);
    return ![
        'requestBrokerSync requires socketPath and line',
        'socket failed:',
        'setsockopt timeout failed:',
        'broker socket path is too long',
        'connect failed:',
    ].some(prefix => message.startsWith(prefix));
}

async function sendBrokerRequest(request, options = {}) {
    const socketPath = options.socketPath || brokerSocketPath();
    const timeoutMs = options.timeoutMs || brokerTimeoutMs();
    if (!socketPath) {
        throw markBrokerRequestState(new Error('Broker socket unavailable'), false);
    }

    const startedAt = Date.now();
    await acquireRequestSlot(timeoutMs, options);
    try {
        const remainingTimeoutMs = timeoutMs - (Date.now() - startedAt);
        if (remainingTimeoutMs <= 0) {
            throw requestQueueTimeoutError();
        }
        const line = JSON.stringify(request);
        return await new Promise((resolve, reject) => {
            let settled = false;
            let requestSent = false;
            let buffer = '';
            const socket = net.createConnection(socketPath);
            const finish = (error, response) => {
                if (settled) { return; }
                settled = true;
                clearTimeout(timer);
                socket.once('close', () => {
                    if (error) { reject(markBrokerRequestState(error, requestSent)); } else { resolve(response); }
                });
                socket.destroy();
            };
            const timer = setTimeout(() => finish(requestTimeoutError()), remainingTimeoutMs);

            socket.setEncoding('utf8');
            socket.on('connect', () => {
                requestSent = true;
                socket.write(`${line}\n`);
            });
            socket.on('data', chunk => {
                buffer += chunk;
                const newlineIndex = buffer.indexOf('\n');
                if (newlineIndex === -1) { return; }
                try {
                    finish(undefined, parseBrokerResponse(buffer.slice(0, newlineIndex)));
                } catch (error) {
                    finish(error);
                }
            });
            socket.on('error', error => finish(error));
            socket.on('end', () => {
                if (!settled) {
                    finish(new Error('Broker closed without a response'));
                }
            });
        });
    } finally {
        releaseRequestSlot();
    }
}

function sendBrokerRequestSync(request, options = {}) {
    const socketPath = options.socketPath || brokerSocketPath();
    if (!socketPath) {
        throw markBrokerRequestState(new Error('Broker socket unavailable'), false);
    }

    const timeoutMs = options.timeoutMs || brokerTimeoutMs();
    const line = JSON.stringify(request);
    const nativeAddon = options.nativeAddon;
    if (nativeAddon && typeof nativeAddon.requestBrokerSync === 'function') {
        try {
            return parseBrokerResponse(nativeAddon.requestBrokerSync(socketPath, line, timeoutMs));
        } catch (error) {
            throw markBrokerRequestState(error, nativeSyncErrorMayHaveBeenSent(error));
        }
    }

    const nodeBin = process.env.CODEBUDDY_NODE_BIN || process.execPath;
    const result = spawnSync(nodeBin, [
        __filename,
        '__request-sync',
        socketPath,
        line,
        String(timeoutMs),
    ], {
        encoding: 'utf8',
        timeout: timeoutMs + 1_000,
        windowsHide: true,
        env: {
            ...process.env,
            NODE_OPTIONS: '',
        },
    });

    if (result.error) {
        const requestSent = !['ENOENT', 'EACCES', 'ENOEXEC'].includes(result.error.code);
        throw markBrokerRequestState(result.error, requestSent);
    }
    if (result.status !== 0) {
        throw markBrokerRequestState(
            new Error((result.stderr || '').trim() || `Broker sync helper exited with ${result.status}`),
            result.status !== 3 && result.status !== 123,
        );
    }
    try {
        return parseBrokerResponse(result.stdout);
    } catch (error) {
        throw markBrokerRequestState(error, true);
    }
}

function runSyncRequestCli(argv) {
    const [, , mode, socketPath, line, timeoutValue] = argv;
    if (mode !== '__request-sync') {
        process.stderr.write('[broker-ipc-client] unsupported mode\n');
        process.exit(2);
    }
    const timeoutMs = Number.parseInt(timeoutValue || '', 10) || DEFAULT_TIMEOUT_MS;
    let settled = false;
    let requestSent = false;
    let buffer = '';
    const socket = net.createConnection(socketPath);
    const finish = (code, message) => {
        if (settled) { return; }
        settled = true;
        clearTimeout(timer);
        socket.destroy();
        if (message) {
            (code === 0 ? process.stdout : process.stderr).write(message);
        }
        process.exit(code);
    };
    const timer = setTimeout(() => finish(requestSent ? 124 : 123, 'Broker request timed out'), timeoutMs);
    socket.setEncoding('utf8');
    socket.on('connect', () => {
        requestSent = true;
        socket.write(`${line}\n`);
    });
    socket.on('data', chunk => {
        buffer += chunk;
        const newlineIndex = buffer.indexOf('\n');
        if (newlineIndex !== -1) {
            finish(0, buffer.slice(0, newlineIndex));
        }
    });
    socket.on('error', error => finish(requestSent ? 1 : 3, error && error.message ? error.message : String(error)));
    socket.on('end', () => finish(2, 'Broker closed without a response'));
}

module.exports = {
    brokerTimeoutMs,
    parseBrokerResponse,
    sendBrokerRequest,
    sendBrokerRequestSync,
};

if (require.main === module) {
    runSyncRequestCli(process.argv);
}
