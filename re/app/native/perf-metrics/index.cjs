'use strict';

const path = require('node:path');

let binding;
let loadError;

const supportedPlatform = process.platform === 'win32';

if (supportedPlatform) {
    try {
        // eslint-disable-next-line node/no-missing-require
        binding = require(path.join(__dirname, 'build', 'Release', 'perf_metrics.node'));
    } catch (error) {
        loadError = error;
        binding = null;
    }
} else {
    binding = null;
}

function isSupported() {
    return supportedPlatform && binding != null;
}

function getLoadError() {
    return loadError ? String(loadError.message || loadError) : null;
}

function requireBinding() {
    if (!binding) {
        throw new Error(
            `WorkBuddy perf metrics native binding unavailable: ${
                getLoadError() || `unsupported platform ${process.platform}`
            }`,
        );
    }
    return binding;
}

module.exports = {
    isSupported,
    getLoadError,

    /**
     * Run one collection on a libuv thread-pool thread.
     *
     * `onDone` is invoked once, on the JS thread, as `(error, sample)`. Exactly
     * one of the two is set, except for a collection abandoned by `cancel()`,
     * where neither is — that is a quit in progress, not a failure.
     *
     * There is no interval here on purpose: scheduling lives in the caller, which
     * is what keeps the addon free of a thread and its teardown ordering. Throws
     * if a collection is already in flight.
     *
     * @param {Function} onDone
     */
    collect(onDone) {
        if (typeof onDone !== 'function') {
            throw new TypeError('collect requires a callback function');
        }
        requireBinding().collect(onDone);
    },

    /**
     * Abandon the collection in flight, if any. Safe when idle.
     *
     * Does not wait — the callback still arrives, with neither an error nor a
     * sample. Worth calling before quit: an in-flight collection holds a libuv
     * request and so keeps the loop alive, and a tree walk is tens of
     * milliseconds. The collector checks for cancellation between processes, so
     * this shortens the wait to a single process.
     */
    cancel() {
        requireBinding().cancel();
    },
};
