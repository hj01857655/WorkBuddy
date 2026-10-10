import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { X as pen, Y as init_pen, ft as init_style, pt as style } from "./canvas-view-f1b9di0c.js";
import { C as fieldCollector, w as init_field_collector } from "./auto-scroll-Dx5e-pG0.js";
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/grid/collector/content/config.js
/**
* 默认单元格内容收集配置
* @returns
*/ function getDefaultContentCollectConfig() {
	return fieldCollector.getDefaultConfig({
		maxLines: 1,
		textConfig: { verticalAlign: "top" },
		labelConfig: {
			canWrap: false,
			canDelete: false,
			tagHeight: style.size.tagLarge
		},
		checkboxConfig: { hasTitle: false }
	});
}
/**
* 默认分组值收集配置
* @returns
*/ function getDefaultGroupValueCollectConfig() {
	var config = getDefaultContentCollectConfig();
	config.textConfig.fontStyle = "bold";
	config.textConfig.verticalAlign = "top";
	config.textConfig.lineHeight = 1.6;
	config.labelConfig.tagHeight = style.size.tagLarge;
	config.textConfig.fontSize = style.size.fontSizeLarge;
	config.checkboxConfig.hasTitle = true;
	return config;
}
var init_config = __esmMin((() => {
	init_field_collector();
	init_style();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/wb_views/shared/canvas-tooltip.js
var TOOLTIP_BACKGROUND, TOOLTIP_TEXT_COLOR, TOOLTIP_FONT_SIZE, TOOLTIP_PADDING_X, TOOLTIP_PADDING_Y, TOOLTIP_BORDER_RADIUS, TOOLTIP_SHADOW_BLUR, TOOLTIP_SHADOW_COLOR, TOOLTIP_ANCHOR_GAP, TOOLTIP_OFFSET_Y, TOOLTIP_ARROW_SIZE, FADE_STEP, CanvasTooltip;
var init_canvas_tooltip = __esmMin((() => {
	init_pen();
	TOOLTIP_BACKGROUND = "rgba(46, 50, 56, 0.92)";
	TOOLTIP_TEXT_COLOR = "#FFFFFF";
	TOOLTIP_FONT_SIZE = 12;
	TOOLTIP_PADDING_X = 8;
	TOOLTIP_PADDING_Y = 6;
	TOOLTIP_BORDER_RADIUS = 6;
	TOOLTIP_SHADOW_BLUR = 8;
	TOOLTIP_SHADOW_COLOR = "rgba(0, 0, 0, 0.18)";
	TOOLTIP_ANCHOR_GAP = 4;
	TOOLTIP_OFFSET_Y = -6;
	TOOLTIP_ARROW_SIZE = 8;
	FADE_STEP = .2;
	CanvasTooltip = /*#__PURE__*/ function() {
		"use strict";
		function CanvasTooltip(layer, stageRect) {
			/** 当前显示状态：'shown'=完全可见；'fading-in'/'fading-out'=动画中；'hidden'=已清空 */ this.status = "hidden";
			/** 当前 opacity（受 fade 动画与可见性切换驱动） */ this.opacity = 0;
			/** 当前正在显示的内容（仅 fading-in / shown 时非空） */ this.current = null;
			/** raf 句柄；切换 fade 方向 / dispose 前必须取消，避免叠加 */ this.fadeRaf = null;
			this.group = pen.group(Object.assign(Object.assign({}, stageRect), {
				batch: false,
				overflow: "visible"
			}));
			layer.addGroup(this.group);
		}
		var _proto = CanvasTooltip.prototype;
		/**
		* 在指定锚点之上显示 tooltip。
		*
		* 调度规则：
		* - 已在显示 + 内容文本相同 + 锚点 rect 几何相同 → 静默 no-op（避免 mousemove 频繁触发重画）；
		* - 已在显示 + 内容 / 锚点变了 → 立即跳到 opacity=1 重画（位置切换不再走 fade，避免视觉抖动）；
		* - 当前隐藏 / 正在 fading-out → 重置 opacity=0 走 fade-in 到 1。
		*
		* 由 `HoverTooltipController` 在命中切换时按命中 id 决策走哪一路：同 id 调本方法等同 no-op；
		* 不同 id 先 `hide()` 旧的（fade-out），再 `show()` 新的（fade-in），形成视觉上的「淡出 → 淡入」。
		* 也可以省略 hide 直接 show 切换（位置平移、不闪烁），但当前实现为「淡出 + 淡入」以贴合需求中
		* 「hover 后需要渐变出现和消失」语义（每次新出现都从透明开始）。
		*/ _proto.show = function show(opts) {
			var _a, _b, _c, _d, _e;
			var sameContent = ((_a = this.current) === null || _a === void 0 ? void 0 : _a.content.text) === opts.content.text && ((_b = this.current) === null || _b === void 0 ? void 0 : _b.anchorRect.x) === opts.anchorRect.x && ((_c = this.current) === null || _c === void 0 ? void 0 : _c.anchorRect.y) === opts.anchorRect.y && ((_d = this.current) === null || _d === void 0 ? void 0 : _d.anchorRect.width) === opts.anchorRect.width && ((_e = this.current) === null || _e === void 0 ? void 0 : _e.anchorRect.height) === opts.anchorRect.height;
			if (sameContent && this.status === "shown") return;
			this.current = opts;
			if (sameContent && this.status === "fading-in") return;
			this.cancelFade();
			this.opacity = 0;
			this.status = "fading-in";
			this.runFade("in");
		};
		/**
		* 触发渐出：当前显示中 → fading-out → 完全清空。
		* 已隐藏 / 已在 fading-out 中重复调用为 no-op，避免动画叠加。
		*/ _proto.hide = function hide() {
			if (this.status === "hidden" || this.status === "fading-out") return;
			this.cancelFade();
			this.status = "fading-out";
			this.runFade("out");
		};
		/**
		* 容器尺寸 / 滚动状态变化时更新 group 自身的 stage 视口矩形——保证 group 的 clip 区与可见 stage 一致，
		* 避免浮层被裁。调用方（feature）在 render 时调用即可，等同 hover feature 里 `setAttrs(globalRect)`。
		*/ _proto.updateStageRect = function updateStageRect(stageRect) {
			this.group.setAttrs(stageRect);
		};
		_proto.dispose = function dispose() {
			this.cancelFade();
			this.group.clear();
			this.current = null;
			this.status = "hidden";
			this.opacity = 0;
		};
		/** 渐入/渐出动画主循环。 */ _proto.runFade = function runFade(direction) {
			var tick = () => {
				this.fadeRaf = null;
				if (direction === "in" && this.status !== "fading-in") return;
				if (direction === "out" && this.status !== "fading-out") return;
				var next = direction === "in" ? this.opacity + FADE_STEP : this.opacity - FADE_STEP;
				this.opacity = Math.max(0, Math.min(1, Math.floor(next * 100) / 100));
				this.draw(this.opacity);
				if (!(direction === "in" ? this.opacity >= 1 : this.opacity <= 0)) {
					this.fadeRaf = requestAnimationFrame(tick);
					return;
				}
				if (direction === "in") this.status = "shown";
				else {
					this.status = "hidden";
					this.current = null;
					this.group.clear();
				}
			};
			this.fadeRaf = requestAnimationFrame(tick);
		};
		_proto.cancelFade = function cancelFade() {
			if (this.fadeRaf !== null) {
				cancelAnimationFrame(this.fadeRaf);
				this.fadeRaf = null;
			}
		};
		/**
		* 按当前 `current` + `opacity` 绘制一帧。
		*
		* 几何流程：
		* 1) 算出气泡内容宽 / 高（measureTextWidth + 内边距）；
		* 2) 居中于锚点水平方向，竖直默认贴在锚点上方 GAP，上方不够时翻转到下方；
		* 3) 横向越界则回弹到 stage 边界（保证完整可见）；
		* 4) 在「靠锚点一侧」中点画一个 45° 旋转的小正方形作为箭头底坯，气泡再画在它上面，
		*    让气泡圆角矩形盖住箭头与气泡相接那一半，只露出指向锚点的小三角形；
		* 5) 最后整体（气泡 + 箭头）一起施加 `TOOLTIP_OFFSET_Y` 微调位移。
		*
		* z 顺序：箭头放到 rotate:45 的子 group（Group.draw 中子 group 总在 pool 之后绘制）。
		* 因此把气泡 add 到 this.group 的 pool、把箭头放到子 group → 箭头自动盖在气泡之上。
		*
		* 箭头几何：边长 `TOOLTIP_ARROW_SIZE` 的正方形，绕中心旋转 45° 后对角线长 = `size*√2`，
		* 视觉上「露出三角形高度 = size*√2/2」。
		* - 气泡在锚点上方（placement=top）：箭头中心放在气泡**底边**中点（y = bubbleBottom），
		*   下半对角线伸出气泡，形成朝下倒三角指向锚点；
		* - 气泡在锚点下方（placement=bottom）：箭头中心放在气泡**顶边**中点，上半对角线伸出，
		*   形成朝上正三角指向锚点。
		*
		* 箭头 X：水平居中于锚点中心，但回退到 `[bubbleLeft + arrowSafePad, bubbleRight - arrowSafePad]`
		* 内（避免箭头落到圆角弧线之外，露出双色边）。
		*
		* 注：每帧 group.clear() + 重 add 是 wb 已有 fade-in 范式，参考 hover feature `runFadeIn`。
		*/ _proto.draw = function draw(opacity) {
			if (!this.current) return;
			this.group.clear();
			if (opacity <= 0) return;
			var { anchorRect, stageRect, content } = this.current;
			var bubbleWidth = pen.util.measureTextWidth(content.text, TOOLTIP_FONT_SIZE) + TOOLTIP_PADDING_X * 2;
			var bubbleHeight = TOOLTIP_FONT_SIZE + TOOLTIP_PADDING_Y * 2;
			var anchorCenterX = anchorRect.x + anchorRect.width / 2;
			var x = anchorCenterX - bubbleWidth / 2;
			var minX = stageRect.x;
			var maxX = stageRect.x + stageRect.width - bubbleWidth;
			if (x < minX) x = minX;
			if (x > maxX) x = Math.max(minX, maxX);
			var y = anchorRect.y - bubbleHeight - TOOLTIP_ANCHOR_GAP;
			var placement = "top";
			if (y < stageRect.y) {
				y = anchorRect.y + anchorRect.height + TOOLTIP_ANCHOR_GAP;
				placement = "bottom";
			}
			y += TOOLTIP_OFFSET_Y;
			var arrowSafePad = TOOLTIP_BORDER_RADIUS + TOOLTIP_ARROW_SIZE / 2;
			var arrowMinCenterX = x + arrowSafePad;
			var arrowMaxCenterX = x + bubbleWidth - arrowSafePad;
			var arrowCenterX = anchorCenterX;
			if (arrowCenterX < arrowMinCenterX) arrowCenterX = arrowMinCenterX;
			if (arrowCenterX > arrowMaxCenterX) arrowCenterX = arrowMaxCenterX;
			var arrowCenterY = placement === "top" ? y + bubbleHeight : y;
			var arrowGroup = pen.group({
				x: arrowCenterX - TOOLTIP_ARROW_SIZE / 2,
				y: arrowCenterY - TOOLTIP_ARROW_SIZE / 2,
				width: TOOLTIP_ARROW_SIZE,
				height: TOOLTIP_ARROW_SIZE,
				batch: false,
				overflow: "visible",
				rotate: 45
			});
			arrowGroup.add(pen.config.rect({
				x: arrowCenterX - TOOLTIP_ARROW_SIZE / 2,
				y: arrowCenterY - TOOLTIP_ARROW_SIZE / 2,
				width: TOOLTIP_ARROW_SIZE,
				height: TOOLTIP_ARROW_SIZE,
				background: TOOLTIP_BACKGROUND,
				opacity
			}));
			this.group.addGroup(arrowGroup);
			this.group.add(pen.config.rect({
				x,
				y,
				width: bubbleWidth,
				height: bubbleHeight,
				background: TOOLTIP_BACKGROUND,
				borderRadius: TOOLTIP_BORDER_RADIUS,
				shadowBlur: TOOLTIP_SHADOW_BLUR,
				shadowColor: TOOLTIP_SHADOW_COLOR,
				opacity
			}));
			this.group.add(pen.config.text({
				text: content.text,
				x: x + TOOLTIP_PADDING_X,
				y,
				width: bubbleWidth - TOOLTIP_PADDING_X * 2,
				height: bubbleHeight,
				fontSize: TOOLTIP_FONT_SIZE,
				color: TOOLTIP_TEXT_COLOR,
				align: "center",
				wrap: "none",
				ellipsis: true,
				opacity
			}));
		};
		return CanvasTooltip;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/wb_views/shared/hover-tooltip-controller.js
/**
* 把 `HoverTooltipController` 包成 `Disposable` 兼容对象，方便 feature `_register` 使用：
*
* ```ts
* const controller = this._register(makeHoverTooltipDisposable(new HoverTooltipController({...})));
* ```
*
* 该 helper 仅做 `{dispose}` 适配，不引入额外状态。
*/ function makeHoverTooltipDisposable(controller) {
	return { dispose: () => controller.dispose() };
}
var HoverTooltipController;
var init_hover_tooltip_controller = __esmMin((() => {
	init_canvas_tooltip();
	HoverTooltipController = /*#__PURE__*/ function() {
		"use strict";
		function HoverTooltipController(deps) {
			this.deps = deps;
			this.currentHitId = "";
			this.disposables = [];
			this.onMouseMove = (evt) => {
				var hit = this.deps.resolveHit(evt.x, evt.y, evt.target);
				if (!hit) {
					this.hideIfShown();
					return;
				}
				if (hit.id === this.currentHitId) return;
				this.currentHitId = hit.id;
				this.tooltip.hide();
				this.tooltip.show({
					anchorRect: hit.anchorRect,
					stageRect: this.deps.getStageRect(),
					content: { text: hit.label }
				});
			};
			this.onMouseLeave = () => {
				this.hideIfShown();
			};
			this.onScroll = () => {
				this.hideIfShown();
			};
			this.tooltip = new CanvasTooltip(deps.layer, deps.getStageRect());
			this.disposables.push(deps.uiEvent.stage.onMouseMove(this.onMouseMove));
			this.disposables.push(deps.uiEvent.stage.onMouseLeave(this.onMouseLeave));
			if (deps.onScroll) this.disposables.push(deps.onScroll(this.onScroll));
		}
		var _proto = HoverTooltipController.prototype;
		/**
		* 视图 render() 时调用：把 stage 视口尺寸同步到 tooltip group，避免 stage resize 后浮层被裁。
		*
		* 同时做一次「数据失效 → 立即 hide」：底层数据变化（重收集）后，旧 anchorRect 的语义可能改变，
		* 强制 hide 比 silently 重画更安全；下一次 mousemove 会以新数据重建命中。
		*/ _proto.syncStageRect = function syncStageRect() {
			this.tooltip.updateStageRect(this.deps.getStageRect());
			this.hideIfShown();
		};
		_proto.dispose = function dispose() {
			this.disposables.forEach((d) => d.dispose());
			this.disposables.length = 0;
			this.tooltip.dispose();
			this.currentHitId = "";
		};
		_proto.hideIfShown = function hideIfShown() {
			if (this.currentHitId === "") return;
			this.currentHitId = "";
			this.tooltip.hide();
		};
		return HoverTooltipController;
	}();
}));
//#endregion
export { getDefaultGroupValueCollectConfig as a, getDefaultContentCollectConfig as i, init_hover_tooltip_controller as n, init_config as o, makeHoverTooltipDisposable as r, HoverTooltipController as t };
