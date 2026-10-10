//#region ../../packages/workbuddy-server/src/net/format-error-chain.ts
/**
* Flatten Error + undici/fetch `cause` into one log/UI-safe string.
*
* Node fetch often surfaces as `TypeError: fetch failed` with the real reason
* on `error.cause` (e.g. `ConnectTimeoutError` / `UND_ERR_CONNECT_TIMEOUT`).
*/
function formatErrorChain(error, maxDepth = 4) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < maxDepth && current !== void 0 && current !== null; depth += 1) {
		if (current instanceof Error) {
			const code = typeof current.code === "string" ? current.code : void 0;
			const piece = code ? `${current.message} [${code}]` : current.message;
			if (piece && !parts.includes(piece)) parts.push(piece);
			current = current.cause;
			continue;
		}
		const text = String(current);
		if (text && !parts.includes(text)) parts.push(text);
		break;
	}
	return parts.length > 0 ? parts.join(": ") : "unknown_error";
}
//#endregion
Object.defineProperty(exports, "formatErrorChain", {
	enumerable: true,
	get: function() {
		return formatErrorChain;
	}
});
