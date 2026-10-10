import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { AZ as inferConnectorKind, D1 as useI18n, DZ as markLibraryAuthEntry, E1 as init_useI18n, OZ as markTokenSchemaAuthEntry, R$ as requestConnectorNavigation, TZ as init_connector, c$ as init_store, o$ as connectorStore, wq as useAgentTelemetry, xq as init_telemetry } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ei as toast, Ev as require_react, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/main-content-core/wb-input-add/modules/connectors/use-connector-actions.ts
function enqueuePendingAuthResult(connectorId, entry) {
	const prev = pendingAuthResults.get(connectorId);
	if (prev) clearTimeout(prev.timeoutId);
	const timeoutId = setTimeout(() => {
		const current = pendingAuthResults.get(connectorId);
		if (current && current.startTime === entry.startTime) {
			pendingAuthResults.delete(connectorId);
			current.onTimeout();
		}
	}, PENDING_AUTH_TIMEOUT_MS);
	pendingAuthResults.set(connectorId, {
		...entry,
		timeoutId
	});
}
function takePendingAuthResult(connectorId) {
	const entry = pendingAuthResults.get(connectorId);
	if (entry) {
		clearTimeout(entry.timeoutId);
		pendingAuthResults.delete(connectorId);
	}
	return entry;
}
/**
* 复制自 ConnectorCapsule.handleMcpConnect 的连接动作链路。
*/
function useConnectorActions(options = {}) {
	const { t } = useI18n();
	const { onActionStart, telemetryEntry } = options;
	const { reportEvent, Events } = useAgentTelemetry();
	(0, import_react.useEffect)(() => {
		return connectorStore.subscribe((state, prevState) => {
			if (pendingAuthResults.size === 0) return;
			for (const [connectorId, pending] of Array.from(pendingAuthResults)) {
				const prevConnected = prevState.mcpConnectorStates[connectorId]?.connected === true;
				const currConnected = state.mcpConnectorStates[connectorId]?.connected === true;
				if (!prevConnected && currConnected) {
					takePendingAuthResult(connectorId);
					const cost = Date.now() - pending.startTime;
					reportEvent(Events.ConnectorAuthResult, {
						entry: pending.telemetryEntry,
						connectorId,
						connectorName: pending.connectorName,
						connectorType: pending.connectorType,
						isOfficial: true,
						isSuccessful: true,
						status: "success",
						cost,
						isReconnect: pending.isReconnect,
						resultAt: Date.now()
					});
				}
			}
		});
	}, [reportEvent, Events]);
	const handleConnect = (0, import_react.useCallback)(async (connector, needsAuth = false, actionContext) => {
		const startTime = Date.now();
		const isReconnect = connectorStore.getState().mcpConnectorStates[connector.id]?.connected === true;
		if (telemetryEntry) reportEvent(Events.ConnectorEntryClick, {
			entry: telemetryEntry,
			connectorId: connector.id,
			connectorName: connector.name,
			connectorType: inferConnectorKind(connector),
			isOfficial: true,
			isReconnect,
			position: 0,
			clickAt: Date.now()
		});
		const reportAuthResult = (success, options) => {
			if (!telemetryEntry) return;
			if (options?.deferred) {
				enqueuePendingAuthResult(connector.id, {
					startTime,
					isReconnect,
					telemetryEntry,
					connectorName: connector.name,
					connectorType: inferConnectorKind(connector),
					onTimeout: () => {
						const cost = Date.now() - startTime;
						reportEvent(Events.ConnectorAuthResult, {
							entry: telemetryEntry,
							connectorId: connector.id,
							connectorName: connector.name,
							connectorType: inferConnectorKind(connector),
							isOfficial: true,
							isSuccessful: false,
							status: "failed",
							errorCode: "oauth_timeout",
							cost,
							isReconnect,
							resultAt: Date.now()
						});
					}
				});
				return;
			}
			const errorMessage = options?.errorMessage;
			let errorCode = options?.errorCode;
			if (!success && !errorCode) {
				if (errorMessage) {
					const normalized = errorMessage.split(":")[0]?.trim().slice(0, 64);
					errorCode = normalized && normalized.length > 0 ? normalized : "connect_failed";
				} else errorCode = "connect_failed";
			}
			reportEvent(Events.ConnectorAuthResult, {
				entry: telemetryEntry,
				connectorId: connector.id,
				connectorName: connector.name,
				connectorType: inferConnectorKind(connector),
				isOfficial: true,
				isSuccessful: success,
				status: success ? "success" : "failed",
				errorCode,
				errorMessage,
				cost: Date.now() - startTime,
				isReconnect,
				resultAt: Date.now()
			});
		};
		if (!needsAuth && connectorStore.getState().mcpConnectorStates[connector.id]?.pending === true) return {
			success: false,
			pending: true
		};
		onActionStart?.();
		if (requestConnectorNavigation({
			connectorId: connector.id,
			needsAuth,
			onBeforeNavigate: () => {
				markLibraryAuthEntry(connector.id, telemetryEntry ?? "add_menu");
			}
		}) !== "unhandled") return {
			success: false,
			cancelled: true
		};
		markTokenSchemaAuthEntry(connector.id, telemetryEntry ?? "add_menu");
		const result = await connectorStore.getState().connectConnector(connector.id, actionContext);
		if (result.viaForm) {
			if (result.success) {
				toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
				reportAuthResult(true);
				return { success: true };
			}
			if (result.cancelled) {
				reportAuthResult(false, { errorCode: "user_cancelled" });
				return {
					success: false,
					cancelled: true
				};
			}
			toast.error(t("connectorPanel.namedConnectError", {
				name: connector.name,
				error: result.error || "Token invalid"
			}));
			reportAuthResult(false, { errorMessage: result.error });
			return {
				success: false,
				error: result.error || "Token invalid"
			};
		}
		if (result.success) {
			reportAuthResult(true);
			return { success: true };
		}
		if (result.cancelled) {
			reportAuthResult(false, { errorMessage: result.error });
			return {
				success: false,
				cancelled: true,
				error: result.error
			};
		}
		if (result.needsAuth) {
			if (needsAuth && connector.authMode !== "token") toast({
				message: t("connectorPanel.redirectAuth"),
				type: "plain"
			});
			if (needsAuth) {
				reportAuthResult(false, { deferred: true });
				return {
					success: false,
					pending: true
				};
			}
			return { success: false };
		}
		if (!result.success && !result.error) return {
			success: false,
			pending: true
		};
		if (result.error) toast.error(t("connectorPanel.namedConnectError", {
			name: connector.name,
			error: result.error
		}));
		reportAuthResult(false, { errorMessage: result.error });
		return {
			success: false,
			error: result.error
		};
	}, [
		t,
		onActionStart,
		telemetryEntry,
		reportEvent,
		Events
	]);
	const handleDisconnect = (0, import_react.useCallback)(async (connector, actionContext) => {
		const result = await connectorStore.getState().disconnectMcpConnector(connector.id, actionContext);
		if (!result.success && result.error) toast.error(t("connectorPanel.disconnectError", { error: result.error }));
		return result;
	}, [t]);
	return {
		handleConnect,
		handleRepair: (0, import_react.useCallback)(async (connector, actionContext) => {
			const startTime = Date.now();
			markLibraryAuthEntry(connector.id, telemetryEntry ?? "add_menu");
			markTokenSchemaAuthEntry(connector.id, telemetryEntry ?? "add_menu");
			const result = await connectorStore.getState().repairConnector(connector.id, actionContext);
			if (result.success) toast.success(t("connectorPanel.connectSuccess", { name: connector.name }));
			if (result.needsAuth && connector.authMode !== "token") toast({
				message: t("connectorPanel.redirectAuth"),
				type: "plain"
			});
			if (result.error && !result.cancelled) toast.error(t("connectorPanel.namedConnectError", {
				name: connector.name,
				error: result.error
			}));
			if (telemetryEntry && !result.needsAuth) reportEvent(Events.ConnectorAuthResult, {
				entry: telemetryEntry,
				connectorId: connector.id,
				connectorName: connector.name,
				connectorType: inferConnectorKind(connector),
				isOfficial: true,
				isSuccessful: result.success,
				status: result.success ? "success" : "failed",
				errorMessage: result.error,
				cost: Date.now() - startTime,
				isReconnect: true,
				resultAt: Date.now()
			});
			return result;
		}, [
			Events,
			reportEvent,
			t,
			telemetryEntry
		]),
		handleDisconnect,
		handleCancelConnect: (0, import_react.useCallback)(async (connector, actionContext) => {
			const pending = takePendingAuthResult(connector.id);
			let actionResult = { success: true };
			try {
				const result = await connectorStore.getState().cancelMcpConnector(connector.id, actionContext);
				actionResult = result;
				if (result.success) toast.info(t("connectorPanel.cancelConnectSuccess", { name: connector.name }));
				else if (result.error) toast.error(t("connectorPanel.cancelConnectError", { error: result.error }));
			} catch (err) {
				actionResult = {
					success: false,
					error: String(err)
				};
				console.warn("[wb-input-add/connectors] cancelMcpConnector failed:", String(err));
			}
			if (!telemetryEntry && !pending) return actionResult;
			const entry = pending?.telemetryEntry ?? telemetryEntry;
			const startTime = pending?.startTime ?? Date.now();
			reportEvent(Events.ConnectorAuthResult, {
				entry,
				connectorId: connector.id,
				connectorName: pending?.connectorName ?? connector.name,
				connectorType: pending?.connectorType ?? inferConnectorKind(connector),
				isOfficial: true,
				isSuccessful: false,
				status: "failed",
				errorCode: "user_cancelled",
				cost: Date.now() - startTime,
				isReconnect: pending?.isReconnect ?? false,
				resultAt: Date.now()
			});
			return actionResult;
		}, [
			t,
			telemetryEntry,
			reportEvent,
			Events
		])
	};
}
var import_react, PENDING_AUTH_TIMEOUT_MS, pendingAuthResults;
var init_use_connector_actions = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_connector();
	init_store();
	init_telemetry();
	PENDING_AUTH_TIMEOUT_MS = 3e5;
	pendingAuthResults = /* @__PURE__ */ new Map();
}));
//#endregion
export { useConnectorActions as n, init_use_connector_actions as t };
