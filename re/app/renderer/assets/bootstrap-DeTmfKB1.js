import { s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { T0 as init_app_core, c3 as getWb } from "./ui-docs-viewer-Bo02yf1Q.js";
import { t as bootstrapIndependentWindow } from "./bootstrap-independent-window-C8q-1vR7.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
import { t as navigateMainWindow } from "./main-window-navigator-Bs0zgdJ1.js";
import "./main-window-navigation-D-JJH4kM.js";
import "./independent-window-qbsk1YYc.js";
//#region ../../packages/workbuddy-app/src/window-apps/demo/demo-window-app.tsx
init_app_core();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** demo 之间互发消息用的 channel —— 业务窗自己定义常量，不要复用别人的。 */
var DEMO_CHANNEL = "demo.ping";
/** 存储 namespace。同一 appId 的多个实例共享（Manifest 声明 storageScope: 'app'）。 */
var DEMO_STORAGE_NS = "window-demo";
/**
* macOS 的 `utility` preset 用 `titleBarStyle: 'hidden'`，系统红绿灯仍在左上角，
* 因此**不要**再自绘一套按钮（会重复）；Windows / Linux 是 `frame: false` 全无边框，
* 必须自绘。平台属性由公共 bootstrap 注入到 `body[data-platform]`。
*/
function usesSystemWindowControls() {
	return typeof document !== "undefined" && document.body.dataset["platform"] === "mac";
}
function formatTime() {
	return (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false });
}
function MinimizeIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M2.5 6h7",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round"
		})
	});
}
function CloseIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 3l6 6M9 3l-6 6",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round"
		})
	});
}
function Section({ index, title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "demo-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "demo-section__title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "demo-section__index",
					children: index
				}), title]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "demo-section__hint",
				children: hint
			}),
			children
		]
	});
}
function DemoWindowApp({ initialPayload, windows }) {
	const [self, setSelf] = (0, import_react.useState)(null);
	const [windowList, setWindowList] = (0, import_react.useState)(null);
	const [storedNote, setStoredNote] = (0, import_react.useState)("(未读取)");
	const [logs, setLogs] = (0, import_react.useState)([]);
	const logIdRef = (0, import_react.useRef)(0);
	const appendLog = (0, import_react.useCallback)((text) => {
		logIdRef.current += 1;
		const id = logIdRef.current;
		setLogs((prev) => [{
			id,
			at: formatTime(),
			text
		}, ...prev].slice(0, 50));
	}, []);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		windows.getSelf().then((info) => {
			if (!disposed) setSelf(info);
		}).catch(() => void 0);
		return () => {
			disposed = true;
		};
	}, [windows]);
	(0, import_react.useEffect)(() => windows.onMessage((event) => {
		appendLog(`收到 ${event.kind}${event.channel ? `(${event.channel})` : ""}: ` + JSON.stringify(event.payload ?? null));
		return true;
	}), [windows, appendLog]);
	(0, import_react.useEffect)(() => {
		const offOpened = windows.onOpened((event) => {
			appendLog(`窗口打开: ${event.appId} ${event.windowId}`);
		});
		const offClosed = windows.onClosed((event) => {
			appendLog(`窗口关闭: ${event.appId} ${event.windowId}`);
		});
		return () => {
			offOpened();
			offClosed();
		};
	}, [windows, appendLog]);
	const refreshList = (0, import_react.useCallback)(async () => {
		setWindowList(await windows.list());
	}, [windows]);
	const openAnother = (0, import_react.useCallback)(async () => {
		const opened = await windows.open({
			appId: "demo",
			params: {
				title: `实例 ${Date.now() % 1e3}`,
				note: "由另一个 demo 窗打开"
			}
		});
		appendLog(`open 返回 reused=${opened.reused} ${opened.windowId}`);
		await refreshList();
	}, [
		windows,
		appendLog,
		refreshList
	]);
	const broadcastPing = (0, import_react.useCallback)(async () => {
		const targets = (await windows.list()).filter((item) => item.appId === "demo" && item.windowId !== self?.windowId);
		if (targets.length === 0) {
			appendLog("没有其它 demo 实例，先点「再开一个实例」");
			return;
		}
		for (const target of targets) await windows.postMessage({
			target: { windowId: target.windowId },
			channel: DEMO_CHANNEL,
			payload: {
				from: self?.windowId,
				at: Date.now()
			}
		});
		appendLog(`已向 ${targets.length} 个 demo 实例发送 ${DEMO_CHANNEL}`);
	}, [
		windows,
		self,
		appendLog
	]);
	const backToMain = (0, import_react.useCallback)(async () => {
		await navigateMainWindow({ route: "genie" }, windows);
		appendLog("已请求主窗跳转到「前往应用」");
	}, [windows, appendLog]);
	const saveNote = (0, import_react.useCallback)(async () => {
		const value = `${initialPayload?.note ?? "(无 note)"} @ ${formatTime()}`;
		await getWb().storage.device.set(DEMO_STORAGE_NS, "lastNote", value);
		setStoredNote(value);
		appendLog("已写入 wb.storage.device");
	}, [initialPayload, appendLog]);
	const readNote = (0, import_react.useCallback)(async () => {
		const value = await getWb().storage.device.get(DEMO_STORAGE_NS, "lastNote");
		setStoredNote(value ?? "(空)");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "demo-window",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "demo-titlebar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "demo-titlebar__title",
				children: initialPayload?.title ?? "独立窗口 Demo"
			}), !usesSystemWindowControls() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "demo-titlebar__controls",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "demo-titlebar__button",
					title: "最小化",
					"aria-label": "最小化",
					onClick: () => void windows.minimize(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinimizeIcon, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "demo-titlebar__button demo-titlebar__button--danger",
					title: "关闭",
					"aria-label": "关闭",
					onClick: () => void windows.close(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "demo-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					index: "1",
					title: "窗口身份与初始 payload",
					hint: "payload 存在主进程 registry，不进 URL；刷新本窗后依然读得到。",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "demo-code",
						children: JSON.stringify({
							self,
							initialPayload
						}, null, 2)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					index: "2",
					title: "多实例与跨窗通信",
					hint: "Manifest 声明 multiple + maxInstances 3；超出后复用最近活跃实例，并把新 payload 作为 open delivery 投给它。",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "demo-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "demo-button",
								onClick: () => void openAnother(),
								children: "再开一个实例"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "demo-button",
								onClick: () => void broadcastPing(),
								children: "给其它实例发消息"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "demo-button",
								onClick: () => void refreshList(),
								children: "刷新窗口列表"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "demo-code demo-code--inline",
						children: windowList ? JSON.stringify(windowList, null, 2) : "点「刷新窗口列表」查看 wb.windows.list()"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					index: "3",
					title: "回主窗导航",
					hint: "只投递业务 route，由主窗的 route 注册表映射到自己的 Router / hash。",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "demo-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "demo-button",
							onClick: () => void backToMain(),
							children: "让主窗跳到「前往应用」"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					index: "4",
					title: "按 scope 隔离的存储",
					hint: "权威数据用 wb.storage；主题 / 语言 / 字号由公共 bootstrap 自动跟随主窗，业务窗不用自己同步。",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "demo-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "demo-button",
								onClick: () => void saveNote(),
								children: "写入"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "demo-button",
								onClick: () => void readNote(),
								children: "读取"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "demo-value",
								children: storedNote
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					index: "5",
					title: "事件日志",
					hint: "onMessage / onOpened / onClosed 的实时回执；组件卸载时必须退订。",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "demo-log",
						children: logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "demo-log__empty",
							children: "（暂无事件）"
						}) : logs.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "demo-log__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "demo-log__time",
								children: entry.at
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "demo-log__text",
								children: entry.text
							})]
						}, entry.id))
					})
				})
			]
		})]
	});
}
//#endregion
//#region ../../packages/workbuddy-app/src/window-apps/demo/bootstrap.tsx
/**
* 独立窗口接入示例入口 —— 新业务窗照这个文件改一份即可。
*
* 约定：文件路径必须是 `window-apps/<rendererEntry>/bootstrap.tsx`，且 Manifest 里
* 有同名 `rendererEntry`。renderer 启动时会双向校验，缺一边直接报错、不回退主窗。
*
* `bootstrapIndependentWindow` 已经处理掉这些公共事项，业务窗不要自己再做一遍：
* - `setupDesktopSDK({ independentWindow: true })`（幂等，且跳过主窗首屏门）
* - 主题 / 语言 / 字号：先用本地缓存渲染首帧，再与 `wb.config` 权威值对齐并订阅变更
* - `data-window-app-id` / `data-window-preset` / 平台属性、tokens 与样式导入顺序
* - ErrorBoundary、骨架移除、初始 payload 读取
*/
bootstrapIndependentWindow({
	appId: "demo",
	render: (context) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoWindowApp, {
		initialPayload: context.initialPayload,
		windows: context.windows
	})
});
//#endregion
