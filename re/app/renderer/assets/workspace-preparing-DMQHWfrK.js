import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { Bn as LoadingDots, Ev as require_react, Tv as require_jsx_runtime, t as init_src } from "./lib-chat-ui-D8Ji0f8n.js";
import { xt as init_mascot_new } from "./locale-utils-TanlkH9x.js";
//#region ../../packages/agent-ui/src/components/workspace-preparing/styles.scss
var init_styles = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/workspace-preparing/index.tsx
var import_react, import_jsx_runtime, WorkspacePreparing;
var init_workspace_preparing = __esmMin((() => {
	init_styles();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_mascot_new();
	import_jsx_runtime = require_jsx_runtime();
	WorkspacePreparing = ({ title = "Preparing your workspace", description = "This usually takes about 5 seconds for the first time.", showProgress = true, showIcon = true, showDots = true, progress, className = "", visible = true, onExited }) => {
		const [animatedProgress, setAnimatedProgress] = (0, import_react.useState)(0);
		const [shouldRender, setShouldRender] = (0, import_react.useState)(visible);
		const [animationState, setAnimationState] = (0, import_react.useState)("entering");
		const onExitedRef = (0, import_react.useRef)(onExited);
		const prevVisibleRef = (0, import_react.useRef)(void 0);
		const isExitingRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => {
			onExitedRef.current = onExited;
		}, [onExited]);
		(0, import_react.useEffect)(() => {
			if (prevVisibleRef.current === visible) return;
			const prevVisible = prevVisibleRef.current;
			prevVisibleRef.current = visible;
			if (visible) {
				isExitingRef.current = false;
				setShouldRender(true);
				setAnimationState("entering");
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						if (!isExitingRef.current) setAnimationState("entered");
					});
				});
			} else if (prevVisible !== void 0) {
				isExitingRef.current = true;
				setAnimationState("exiting");
				const timer = setTimeout(() => {
					setShouldRender(false);
					onExitedRef.current?.();
				}, 350);
				return () => clearTimeout(timer);
			}
		}, [visible]);
		const handleTransitionEnd = (e) => {
			if (e.propertyName === "opacity" && animationState === "exiting") {
				setShouldRender(false);
				onExitedRef.current?.();
			}
		};
		(0, import_react.useEffect)(() => {
			if (progress !== void 0) {
				setAnimatedProgress(progress);
				return;
			}
			let currentProgress = 0;
			const interval = setInterval(() => {
				currentProgress += Math.random() * 3;
				if (currentProgress > 85) currentProgress = 85;
				setAnimatedProgress(currentProgress);
			}, 200);
			return () => clearInterval(interval);
		}, [progress]);
		if (!shouldRender) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `workspace-preparing ${animationState === "entering" ? "workspace-preparing--entering" : animationState === "exiting" ? "workspace-preparing--exiting" : ""} ${className}`,
			onTransitionEnd: handleTransitionEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "workspace-preparing__content",
				children: [
					showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "workspace-preparing__icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "workspace-preparing__icon-img",
							src: "" + new URL("mascot-new-0kxfQU7k.png", import.meta.url).href,
							alt: "Workspace Robot"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "workspace-preparing__title",
						children: [title, showDots && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingDots, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "workspace-preparing__description",
						children: description
					}),
					showProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "workspace-preparing__progress",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "workspace-preparing__progress-track",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "workspace-preparing__progress-bar",
								style: { width: `${animatedProgress}%` }
							})
						})
					})
				]
			})
		});
	};
}));
//#endregion
export { init_workspace_preparing as n, WorkspacePreparing as t };
