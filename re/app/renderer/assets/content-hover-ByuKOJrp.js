import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { yl as FieldType } from "./smartsheet-context-BgZsCXEw.js";
import { Nt as init_is_in_rect, Pt as isHitRect, Wt as init_es, X as pen, Y as init_pen, ft as init_style, pt as style } from "./canvas-view-f1b9di0c.js";
import { d as init_card_single, u as SpecailContentID } from "./view-BIaNRXVm.js";
import { r as init_url_hot_rect, t as getUrlCombineHotRect } from "./url-hot-rect-DEa9lwNf.js";
//#region ../../node_modules/.pnpm/@tencent+xtable-view@1.1007_b4848c21a17198229610fe9d4d9c44fe/node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/content-hover.js
var CardContentHover;
var init_content_hover = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_card_single();
	init_is_in_rect();
	init_url_hot_rect();
	CardContentHover = /*#__PURE__*/ function() {
		"use strict";
		function CardContentHover(action, dataUtil) {
			this.action = action;
			this.dataUtil = dataUtil;
		}
		var _proto = CardContentHover.prototype;
		_proto.hover = function hover(container, cardContent, param) {
			var [rect, contents, contentId] = cardContent;
			if (!contentId) return false;
			var field = this.dataUtil.getFieldByFieldId(contentId);
			if (!field) return this.checkHoverSpecailContent(container, contentId, rect, param);
			return this.checkHoverFieldContent(container, field, rect, contents, param);
		};
		_proto.checkHoverSpecailContent = function checkHoverSpecailContent(container, contentId, rect, param) {
			switch (contentId) {
				case SpecailContentID.Like:
					var likeIconRect = Object.assign(Object.assign({}, rect), {
						x: rect.x + param.offsetX,
						y: rect.y + param.startY - param.offsetY
					});
					if (isHitRect(param.x, param.y, likeIconRect)) {
						container.add(pen.config.rect(Object.assign(Object.assign({}, likeIconRect), {
							borderRadius: style.size.borderRadius,
							background: style.color.hoverBackground,
							onClick: () => {
								this.action.toggleLike(param.recordId);
							},
							onTap: () => {
								this.action.toggleLike(param.recordId);
							}
						})));
						return true;
					}
			}
			return false;
		};
		_proto.checkHoverFieldContent = function checkHoverFieldContent(container, field, rect, contents, param) {
			var contentRect = Object.assign(Object.assign({}, rect), {
				x: rect.x + param.offsetX,
				y: rect.y + param.startY - param.offsetY
			});
			var fieldId = field.getId();
			switch (field.getType()) {
				case FieldType.URL:
				case FieldType.LOCATION:
					var combineRect = getUrlCombineHotRect(contents);
					combineRect.x = contentRect.x;
					combineRect.y = contentRect.y;
					if (isHitRect(param.x, param.y, combineRect)) {
						container.add(pen.config.rect(Object.assign(Object.assign({}, combineRect), {
							borderRadius: style.size.borderRadius,
							background: style.color.hoverBackground,
							onClick: () => {
								this.action.openCellLink(fieldId, param.recordId);
							},
							onTap: () => {
								this.action.openCellLink(fieldId, param.recordId);
							}
						})), 0, 0, param.clipRect);
						return true;
					}
					break;
				case FieldType.CHECKBOX: if (isHitRect(param.x, param.y, contentRect)) {
					container.add(pen.config.rect(Object.assign(Object.assign({}, contentRect), {
						borderRadius: style.size.borderRadius,
						background: style.color.hoverBackground,
						onClick: () => {
							this.action.toggleCellCheckbox(fieldId, param.recordId);
						}
					})));
					return true;
				}
			}
			return false;
		};
		return CardContentHover;
	}();
}));
//#endregion
export { init_content_hover as n, CardContentHover as t };
