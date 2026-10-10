import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $4 as resetAllShortcutOverrides, A7 as Input, B3 as init_adapter_context, B4 as init_shortcut_registry, BO as formatShortcut, E1 as init_useI18n, F4 as ALLOWED_STANDALONE_KEYS, G4 as setShortcutRecording, GO as init_use_quick_qa_feature, HO as formatShortcutWithDisplayOverride, I4 as findConflictingShortcutId, J4 as SHORTCUT_CHANGE_EVENT, K4 as splitBindingParts, KO as useQuickQaFeatureEnabled, L4 as findNonEditableConflict, O1 as useTranslation, Q4 as removeShortcutOverride, R4 as getAllShortcutsWithBindings, RO as init_keyboard_shortcuts$1, UO as getDisplayMainKey, V3 as useAdapter, V5 as message, W4 as resolveKeyFromCode, WO as init_shortcut_formatter, X4 as init_shortcut_storage, Y4 as clearShortcutBinding, Z4 as migrateLegacySendMessageShortcut, _Z as useVoiceInputFeature, att as ResetIcon, e3 as saveShortcutOverride, hH as init_DeleteIcon, i7 as Tooltip, jY as init_product_features, krt as Button, m3 as isMacPlatform, m5 as init_src, mH as DeleteIcon, p3 as init_submit_message_shortcut, q4 as validateBinding, t3 as SHORTCUT_DEFINITIONS } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/keyboard-shortcuts/keyboard-shortcuts-panel.less
var init_keyboard_shortcuts_panel = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/keyboard-shortcuts/shortcut-item.tsx
/**
* Split a formatted binding string into individual key segments for styled display.
*
* This function depends on the output format of `formatShortcut()`:
* - macOS: space-separated symbols, e.g. "⌘ ⇧ B" → ["⌘", "⇧", "B"]
* - Windows/Linux: plus-separated labels, e.g. "Ctrl+Shift+B" → ["Ctrl", "Shift", "B"]
*
* Uses splitBindingParts() for plus-delimited strings to correctly handle
* "+" as the regular key (e.g. "Ctrl+Shift++" → ["Ctrl", "Shift", "+"]).
*
* Empty segments are filtered out to prevent rendering empty key badges
* (can happen with malformed bindings like "Shift+" stored from data corruption).
*/
function parseBindingKeys(formatted) {
	if (formatted.includes("+")) return splitBindingParts(formatted).filter(Boolean);
	return formatted.split(" ").filter(Boolean);
}
/**
* Split a raw binding string (e.g. "Meta+Shift+B") into individual key parts
* and format each for platform-appropriate display.
* Used during recording to show real-time keys with correct platform symbols.
*
* Uses splitBindingParts() to correctly handle "+" as a regular key
* (e.g. "Ctrl++" → ["Ctrl", "+"], not ["Ctrl"]).
*/
function parseRawBindingKeys(raw) {
	if (!raw) return [];
	const isMac = isMacPlatform();
	const symbolMap = isMac ? MAC_RECORDING_SYMBOLS : WIN_RECORDING_LABELS;
	return splitBindingParts(raw).filter(Boolean).map((part) => {
		if (symbolMap[part]) return symbolMap[part];
		if (isMac && MAC_KEY_DISPLAY_OVERRIDES[part]) return MAC_KEY_DISPLAY_OVERRIDES[part];
		return part.length === 1 ? part.toUpperCase() : part;
	});
}
function ShortcutItem({ definition, currentBinding, label, isCustomized, isEditing, recorderState, recordedDisplay, hasConflict, conflictLabel, validationError, onEdit, onCancel, onDelete, onResetSingle }) {
	const t = useTranslation();
	const isMac = isMacPlatform();
	const isUnassigned = currentBinding === "";
	const displayOverride = isMac ? definition.displayMac : definition.displayWin;
	const formattedBinding = displayOverride || formatShortcut(currentBinding);
	const keys = isUnassigned ? [] : displayOverride ? formattedBinding.split(" ").filter(Boolean) : parseBindingKeys(formattedBinding);
	const isRecording = isEditing && recorderState === "recording";
	/**
	* Clicking the binding area starts recording directly.
	* #15: In recording state, clicking the binding area should NOT cancel recording
	* — the mousedown is ignored so users can click without exiting.
	*/
	const handleBindingClick = (e) => {
		e.stopPropagation();
		if (!definition.editable) return;
		if (isEditing) return;
		onEdit(definition.id);
	};
	/** Keyboard accessibility: Enter/Space to start editing */
	const handleBindingKeyDown = (e) => {
		if (!definition.editable) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			e.stopPropagation();
			if (isEditing) onCancel();
			else onEdit(definition.id);
		}
	};
	const handleCancelClick = (e) => {
		e.stopPropagation();
		onCancel();
	};
	const handleDeleteClick = (e) => {
		e.stopPropagation();
		onDelete(definition.id);
	};
	if (isRecording) {
		const showError = hasConflict || !!validationError;
		const realTimeKeys = parseRawBindingKeys(recordedDisplay);
		const hasKeys = realTimeKeys.length > 0;
		const conflictHintText = hasConflict && conflictLabel && recordedDisplay ? t("settings.keyboardShortcuts.conflict").replace("{keys}", formatShortcutWithDisplayOverride(recordedDisplay)).replace("{label}", conflictLabel) : null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "shortcut-item shortcut-item--recording",
			onMouseDown: (e) => e.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "shortcut-item__label",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "shortcut-item__binding shortcut-item__binding--recording-layout",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "shortcut-item__recording-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: `shortcut-item__recording-box${showError ? " shortcut-item__recording-box--error" : ""}`,
								children: [
									!hasKeys && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "shortcut-item__recording-cursor" }),
									hasKeys ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
										className: `shortcut-item__recording-text${showError ? " shortcut-item__recording-text--error" : ""}`,
										children: realTimeKeys.join(" ")
									}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
										className: "shortcut-item__recording-hint",
										children: t("settings.keyboardShortcuts.recording")
									}),
									hasKeys && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "shortcut-item__recording-cursor" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "shortcut-item__esc-cancel",
								onClick: handleCancelClick,
								role: "button",
								tabIndex: 0,
								onKeyDown: (e) => {
									if (e.key === "Enter" || e.key === " ") handleCancelClick(e);
								},
								children: t("settings.keyboardShortcuts.escToCancel")
							})]
						}),
						conflictHintText && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "shortcut-item__error-hint",
							children: conflictHintText
						}),
						validationError && !hasConflict && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "shortcut-item__error-hint",
							children: validationError
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "shortcut-item__actions",
					children: !isUnassigned && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
						variant: "ghost",
						size: "small",
						iconOnly: true,
						className: "shortcut-item__action-btn shortcut-item__action-btn--delete",
						onClick: handleDeleteClick,
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {})
					})
				})
			]
		});
	}
	const handleResetClick = (e) => {
		e.stopPropagation();
		onResetSingle(definition.id);
	};
	const showRestoreBtn = isCustomized;
	const keysElement = isUnassigned ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
		className: "shortcut-item__unassigned",
		children: t("settings.keyboardShortcuts.unassigned")
	}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "shortcut-item__keys",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("kbd", {
			className: "shortcut-item__key",
			children: keys.join(isMac ? " " : "+")
		})
	});
	const rowClassName = ["shortcut-item", !definition.editable ? "shortcut-item--not-editable" : ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: rowClassName,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "shortcut-item__label",
				children: label
			}),
			definition.editable ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "shortcut-item__binding",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
					content: t("settings.keyboardShortcuts.clickToSet"),
					className: "cb-tooltip--dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "shortcut-item__binding-tooltip-anchor shortcut-item__binding-tooltip-anchor--clickable",
						onClick: handleBindingClick,
						onKeyDown: handleBindingKeyDown,
						role: "button",
						tabIndex: 0,
						"aria-label": `${t("settings.keyboardShortcuts.clickToSet")} ${label}`,
						children: keysElement
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "shortcut-item__binding",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
					content: t("settings.keyboardShortcuts.notEditable"),
					className: "cb-tooltip--dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "shortcut-item__binding-tooltip-anchor",
						children: keysElement
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "shortcut-item__actions",
				children: definition.editable ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
					className: "shortcut-item__action-btn-group",
					children: [!isUnassigned ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
						content: t("settings.keyboardShortcuts.clearShortcut"),
						className: "cb-tooltip--dark",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							className: "shortcut-item__action-btn shortcut-item__action-btn--delete",
							onClick: handleDeleteClick,
							"aria-label": `${t("settings.keyboardShortcuts.clearShortcut")} ${label}`,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {
								width: 14,
								height: 14
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "shortcut-item__action-btn-placeholder" }), showRestoreBtn && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
						content: t("settings.keyboardShortcuts.resetToDefault"),
						className: "cb-tooltip--dark",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							variant: "ghost",
							size: "small",
							iconOnly: true,
							className: "shortcut-item__action-btn shortcut-item__action-btn--reset",
							onClick: handleResetClick,
							"aria-label": `${t("settings.keyboardShortcuts.resetToDefault")} ${label}`,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ResetIcon, {})
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "shortcut-item__actions-placeholder",
					children: "—"
				})
			})
		]
	});
}
var import_jsx_runtime$1, MAC_RECORDING_SYMBOLS, WIN_RECORDING_LABELS, MAC_KEY_DISPLAY_OVERRIDES;
var init_shortcut_item = __esmMin((() => {
	init_src();
	require_react();
	init_DeleteIcon();
	init_useI18n();
	init_shortcut_formatter();
	init_shortcut_registry();
	init_submit_message_shortcut();
	import_jsx_runtime$1 = require_jsx_runtime();
	MAC_RECORDING_SYMBOLS = {
		Meta: "⌘",
		Ctrl: "⌃",
		Alt: "⌥",
		Shift: "⇧"
	};
	WIN_RECORDING_LABELS = {
		Meta: "Win",
		Ctrl: "Ctrl",
		Alt: "Alt",
		Shift: "Shift"
	};
	MAC_KEY_DISPLAY_OVERRIDES = { "=": "+" };
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/keyboard-shortcuts/pinyin-match.ts
/**
* Get the approximate pinyin initial of a Chinese character.
* Returns the character itself (lowercased) for non-CJK characters.
*/
function getInitial(char) {
	const code = char.charCodeAt(0);
	if (code < CJK_START || code > CJK_END) return char.toLowerCase();
	let result = INITIALS[0];
	for (let i = BOUNDARIES.length - 1; i >= 0; i--) if (collator.compare(char, BOUNDARIES[i]) >= 0) {
		result = INITIALS[i];
		break;
	}
	return result;
}
/**
* Get pinyin initials string for text.
* e.g. "打开设置" → "dksz"
*/
function getInitials(text) {
	let result = "";
	for (const ch of text) result += getInitial(ch);
	return result;
}
/**
* Get the full pinyin of a character from the dictionary.
* Returns empty string for unknown characters.
*/
function getFullPinyin(char) {
	return PINYIN_DICT[char] || "";
}
/**
* Generate all full pinyin strings for a text.
* e.g. "打开" → "dakai"
*/
function getFullPinyinString(text) {
	let result = "";
	for (const ch of text) {
		const code = ch.charCodeAt(0);
		if (code >= CJK_START && code <= CJK_END) {
			const py = getFullPinyin(ch);
			if (py) result += py;
		} else result += ch.toLowerCase();
	}
	return result;
}
/**
* Check if query matches label via full pinyin matching.
*
* Prefix matching across character boundaries:
* - "dakai" matches "打开设置" (da+kai, from beginning)
* - "dakaishe" matches "打开设置" (da+kai+she, from beginning)
* - "shezhi" does NOT match "打开设置" (not from beginning)
*
* @param label - The display label (may contain Chinese)
* @param query - The search query (lowercase alphabetic)
*/
function matchesFullPinyin(label, query) {
	if (!/^[a-z]+$/.test(query)) return false;
	if (getFullPinyinString(label).startsWith(query)) return true;
	return false;
}
/**
* Check if query matches label via pinyin matching (initial or full).
*
* Matching modes (prefix-based, all activate only for all-lowercase-ASCII queries):
* 1. Pinyin initials: "dk" matches "打开", "d" matches "打开" but NOT "放大"
* 2. Full pinyin: "dakai" matches "打开设置", "da" matches "打开" but NOT "放大"
*
* @param label - The display label (may contain Chinese)
* @param query - The search query (lowercase)
*/
function matchesPinyinInitials(label, query) {
	if (!/^[a-z]+$/.test(query)) return false;
	if (getInitials(label).startsWith(query)) return true;
	if (matchesFullPinyin(label, query)) return true;
	return false;
}
var collator, BOUNDARIES, INITIALS, CJK_START, CJK_END, PINYIN_DICT;
var init_pinyin_match = __esmMin((() => {
	collator = new Intl.Collator("zh-Hans-CN-u-co-pinyin");
	BOUNDARIES = "啊把擦搭额发嘎哈击咖拉妈拿哦怕七然撒他挖西压杂".split("");
	INITIALS = "abcdefghjklmnopqrstwxyz";
	CJK_START = 19968;
	CJK_END = 40959;
	PINYIN_DICT = {
		"啊": "a",
		"阿": "a",
		"哀": "ai",
		"矮": "ai",
		"爱": "ai",
		"碍": "ai",
		"安": "an",
		"暗": "an",
		"按": "an",
		"案": "an",
		"八": "ba",
		"把": "ba",
		"吧": "ba",
		"白": "bai",
		"百": "bai",
		"摆": "bai",
		"败": "bai",
		"班": "ban",
		"版": "ban",
		"半": "ban",
		"办": "ban",
		"帮": "bang",
		"棒": "bang",
		"包": "bao",
		"保": "bao",
		"报": "bao",
		"抱": "bao",
		"杯": "bei",
		"北": "bei",
		"备": "bei",
		"背": "bei",
		"被": "bei",
		"本": "ben",
		"笔": "bi",
		"比": "bi",
		"必": "bi",
		"闭": "bi",
		"避": "bi",
		"边": "bian",
		"变": "bian",
		"遍": "bian",
		"便": "bian",
		"辨": "bian",
		"编": "bian",
		"标": "biao",
		"表": "biao",
		"别": "bie",
		"并": "bing",
		"病": "bing",
		"波": "bo",
		"播": "bo",
		"不": "bu",
		"步": "bu",
		"部": "bu",
		"布": "bu",
		"补": "bu",
		"才": "cai",
		"材": "cai",
		"菜": "cai",
		"采": "cai",
		"参": "can",
		"藏": "cang",
		"操": "cao",
		"草": "cao",
		"册": "ce",
		"测": "ce",
		"侧": "ce",
		"策": "ce",
		"层": "ceng",
		"曾": "ceng",
		"插": "cha",
		"查": "cha",
		"差": "cha",
		"拆": "chai",
		"产": "chan",
		"长": "chang",
		"常": "chang",
		"场": "chang",
		"唱": "chang",
		"超": "chao",
		"朝": "chao",
		"潮": "chao",
		"车": "che",
		"彻": "che",
		"称": "cheng",
		"成": "cheng",
		"城": "cheng",
		"程": "cheng",
		"吃": "chi",
		"持": "chi",
		"尺": "chi",
		"冲": "chong",
		"充": "chong",
		"重": "chong",
		"抽": "chou",
		"出": "chu",
		"初": "chu",
		"除": "chu",
		"处": "chu",
		"储": "chu",
		"触": "chu",
		"传": "chuan",
		"窗": "chuang",
		"创": "chuang",
		"词": "ci",
		"此": "ci",
		"次": "ci",
		"从": "cong",
		"存": "cun",
		"错": "cuo",
		"达": "da",
		"打": "da",
		"大": "da",
		"代": "dai",
		"带": "dai",
		"待": "dai",
		"单": "dan",
		"担": "dan",
		"但": "dan",
		"当": "dang",
		"导": "dao",
		"到": "dao",
		"道": "dao",
		"得": "de",
		"的": "de",
		"灯": "deng",
		"等": "deng",
		"登": "deng",
		"低": "di",
		"底": "di",
		"地": "di",
		"第": "di",
		"点": "dian",
		"电": "dian",
		"典": "dian",
		"店": "dian",
		"调": "diao",
		"顶": "ding",
		"定": "ding",
		"丢": "diu",
		"动": "dong",
		"东": "dong",
		"懂": "dong",
		"都": "dou",
		"读": "du",
		"度": "du",
		"独": "du",
		"短": "duan",
		"段": "duan",
		"断": "duan",
		"对": "dui",
		"队": "dui",
		"多": "duo",
		"额": "e",
		"而": "er",
		"二": "er",
		"儿": "er",
		"发": "fa",
		"法": "fa",
		"翻": "fan",
		"反": "fan",
		"返": "fan",
		"范": "fan",
		"方": "fang",
		"放": "fang",
		"防": "fang",
		"房": "fang",
		"非": "fei",
		"费": "fei",
		"分": "fen",
		"份": "fen",
		"丰": "feng",
		"风": "feng",
		"封": "feng",
		"否": "fou",
		"服": "fu",
		"复": "fu",
		"副": "fu",
		"附": "fu",
		"付": "fu",
		"负": "fu",
		"富": "fu",
		"符": "fu",
		"辅": "fu",
		"该": "gai",
		"改": "gai",
		"概": "gai",
		"盖": "gai",
		"干": "gan",
		"感": "gan",
		"刚": "gang",
		"钢": "gang",
		"高": "gao",
		"告": "gao",
		"搞": "gao",
		"个": "ge",
		"各": "ge",
		"给": "gei",
		"根": "gen",
		"跟": "gen",
		"更": "geng",
		"工": "gong",
		"公": "gong",
		"功": "gong",
		"共": "gong",
		"供": "gong",
		"够": "gou",
		"构": "gou",
		"古": "gu",
		"故": "gu",
		"固": "gu",
		"顾": "gu",
		"管": "guan",
		"关": "guan",
		"观": "guan",
		"官": "guan",
		"馆": "guan",
		"光": "guang",
		"广": "guang",
		"规": "gui",
		"归": "gui",
		"国": "guo",
		"果": "guo",
		"过": "guo",
		"哈": "ha",
		"还": "hai",
		"海": "hai",
		"害": "hai",
		"含": "han",
		"汉": "han",
		"寒": "han",
		"航": "hang",
		"好": "hao",
		"号": "hao",
		"和": "he",
		"何": "he",
		"合": "he",
		"河": "he",
		"核": "he",
		"很": "hen",
		"恨": "hen",
		"横": "heng",
		"红": "hong",
		"后": "hou",
		"厚": "hou",
		"呼": "hu",
		"忽": "hu",
		"湖": "hu",
		"虎": "hu",
		"互": "hu",
		"护": "hu",
		"户": "hu",
		"花": "hua",
		"画": "hua",
		"华": "hua",
		"化": "hua",
		"话": "hua",
		"怀": "huai",
		"坏": "huai",
		"欢": "huan",
		"环": "huan",
		"换": "huan",
		"缓": "huan",
		"黄": "huang",
		"灰": "hui",
		"回": "hui",
		"会": "hui",
		"汇": "hui",
		"活": "huo",
		"火": "huo",
		"获": "huo",
		"或": "huo",
		"基": "ji",
		"机": "ji",
		"积": "ji",
		"极": "ji",
		"及": "ji",
		"级": "ji",
		"即": "ji",
		"急": "ji",
		"集": "ji",
		"几": "ji",
		"己": "ji",
		"计": "ji",
		"记": "ji",
		"继": "ji",
		"际": "ji",
		"技": "ji",
		"加": "jia",
		"家": "jia",
		"假": "jia",
		"价": "jia",
		"架": "jia",
		"间": "jian",
		"简": "jian",
		"见": "jian",
		"件": "jian",
		"建": "jian",
		"减": "jian",
		"检": "jian",
		"键": "jian",
		"渐": "jian",
		"剪": "jian",
		"将": "jiang",
		"讲": "jiang",
		"降": "jiang",
		"交": "jiao",
		"教": "jiao",
		"角": "jiao",
		"脚": "jiao",
		"叫": "jiao",
		"接": "jie",
		"街": "jie",
		"结": "jie",
		"节": "jie",
		"解": "jie",
		"介": "jie",
		"界": "jie",
		"今": "jin",
		"金": "jin",
		"仅": "jin",
		"进": "jin",
		"近": "jin",
		"紧": "jin",
		"禁": "jin",
		"尽": "jin",
		"精": "jing",
		"经": "jing",
		"景": "jing",
		"竞": "jing",
		"静": "jing",
		"净": "jing",
		"镜": "jing",
		"究": "jiu",
		"九": "jiu",
		"久": "jiu",
		"旧": "jiu",
		"就": "jiu",
		"救": "jiu",
		"举": "ju",
		"句": "ju",
		"具": "ju",
		"据": "ju",
		"距": "ju",
		"聚": "ju",
		"剧": "ju",
		"局": "ju",
		"觉": "jue",
		"决": "jue",
		"绝": "jue",
		"军": "jun",
		"均": "jun",
		"卡": "ka",
		"开": "kai",
		"看": "kan",
		"康": "kang",
		"考": "kao",
		"靠": "kao",
		"科": "ke",
		"可": "ke",
		"刻": "ke",
		"客": "ke",
		"课": "ke",
		"肯": "ken",
		"空": "kong",
		"控": "kong",
		"口": "kou",
		"苦": "ku",
		"库": "ku",
		"酷": "ku",
		"快": "kuai",
		"块": "kuai",
		"宽": "kuan",
		"况": "kuang",
		"框": "kuang",
		"困": "kun",
		"拉": "la",
		"来": "lai",
		"蓝": "lan",
		"栏": "lan",
		"兰": "lan",
		"浪": "lang",
		"劳": "lao",
		"老": "lao",
		"乐": "le",
		"了": "le",
		"类": "lei",
		"累": "lei",
		"冷": "leng",
		"离": "li",
		"李": "li",
		"里": "li",
		"理": "li",
		"力": "li",
		"立": "li",
		"利": "li",
		"历": "li",
		"例": "li",
		"连": "lian",
		"联": "lian",
		"练": "lian",
		"脸": "lian",
		"链": "lian",
		"亮": "liang",
		"量": "liang",
		"两": "liang",
		"良": "liang",
		"料": "liao",
		"列": "lie",
		"林": "lin",
		"临": "lin",
		"灵": "ling",
		"令": "ling",
		"领": "ling",
		"另": "ling",
		"零": "ling",
		"留": "liu",
		"流": "liu",
		"六": "liu",
		"龙": "long",
		"楼": "lou",
		"路": "lu",
		"录": "lu",
		"率": "lv",
		"绿": "lv",
		"旅": "lv",
		"论": "lun",
		"轮": "lun",
		"落": "luo",
		"妈": "ma",
		"马": "ma",
		"吗": "ma",
		"码": "ma",
		"买": "mai",
		"卖": "mai",
		"满": "man",
		"慢": "man",
		"忙": "mang",
		"猫": "mao",
		"毛": "mao",
		"冒": "mao",
		"么": "me",
		"没": "mei",
		"美": "mei",
		"每": "mei",
		"门": "men",
		"们": "men",
		"梦": "meng",
		"米": "mi",
		"密": "mi",
		"秘": "mi",
		"免": "mian",
		"面": "mian",
		"苗": "miao",
		"秒": "miao",
		"描": "miao",
		"灭": "mie",
		"民": "min",
		"名": "ming",
		"明": "ming",
		"命": "ming",
		"模": "mo",
		"末": "mo",
		"默": "mo",
		"磨": "mo",
		"某": "mou",
		"母": "mu",
		"木": "mu",
		"目": "mu",
		"那": "na",
		"哪": "na",
		"拿": "na",
		"南": "nan",
		"难": "nan",
		"脑": "nao",
		"内": "nei",
		"能": "neng",
		"你": "ni",
		"年": "nian",
		"念": "nian",
		"娘": "niang",
		"鸟": "niao",
		"牛": "niu",
		"弄": "nong",
		"农": "nong",
		"女": "nv",
		"暖": "nuan",
		"哦": "o",
		"欧": "ou",
		"怕": "pa",
		"拍": "pai",
		"排": "pai",
		"派": "pai",
		"盘": "pan",
		"判": "pan",
		"旁": "pang",
		"跑": "pao",
		"配": "pei",
		"朋": "peng",
		"碰": "peng",
		"批": "pi",
		"皮": "pi",
		"片": "pian",
		"篇": "pian",
		"票": "piao",
		"品": "pin",
		"平": "ping",
		"评": "ping",
		"屏": "ping",
		"破": "po",
		"普": "pu",
		"七": "qi",
		"其": "qi",
		"期": "qi",
		"起": "qi",
		"气": "qi",
		"器": "qi",
		"前": "qian",
		"钱": "qian",
		"浅": "qian",
		"千": "qian",
		"签": "qian",
		"强": "qiang",
		"墙": "qiang",
		"桥": "qiao",
		"切": "qie",
		"且": "qie",
		"亲": "qin",
		"轻": "qing",
		"清": "qing",
		"青": "qing",
		"请": "qing",
		"情": "qing",
		"庆": "qing",
		"穷": "qiong",
		"球": "qiu",
		"求": "qiu",
		"区": "qu",
		"取": "qu",
		"去": "qu",
		"趣": "qu",
		"全": "quan",
		"权": "quan",
		"确": "que",
		"缺": "que",
		"群": "qun",
		"然": "ran",
		"让": "rang",
		"热": "re",
		"人": "ren",
		"认": "ren",
		"任": "ren",
		"日": "ri",
		"容": "rong",
		"如": "ru",
		"入": "ru",
		"软": "ruan",
		"三": "san",
		"散": "san",
		"色": "se",
		"杀": "sha",
		"山": "shan",
		"善": "shan",
		"上": "shang",
		"商": "shang",
		"伤": "shang",
		"少": "shao",
		"烧": "shao",
		"社": "she",
		"设": "she",
		"身": "shen",
		"深": "shen",
		"神": "shen",
		"什": "shen",
		"审": "shen",
		"甚": "shen",
		"生": "sheng",
		"声": "sheng",
		"省": "sheng",
		"胜": "sheng",
		"师": "shi",
		"十": "shi",
		"时": "shi",
		"识": "shi",
		"实": "shi",
		"使": "shi",
		"始": "shi",
		"是": "shi",
		"事": "shi",
		"式": "shi",
		"世": "shi",
		"市": "shi",
		"示": "shi",
		"视": "shi",
		"试": "shi",
		"室": "shi",
		"适": "shi",
		"释": "shi",
		"史": "shi",
		"收": "shou",
		"手": "shou",
		"首": "shou",
		"受": "shou",
		"书": "shu",
		"术": "shu",
		"数": "shu",
		"属": "shu",
		"树": "shu",
		"输": "shu",
		"束": "shu",
		"熟": "shu",
		"鼠": "shu",
		"双": "shuang",
		"水": "shui",
		"睡": "shui",
		"顺": "shun",
		"说": "shuo",
		"思": "si",
		"四": "si",
		"死": "si",
		"似": "si",
		"松": "song",
		"送": "song",
		"搜": "sou",
		"索": "suo",
		"速": "su",
		"素": "su",
		"算": "suan",
		"虽": "sui",
		"随": "sui",
		"碎": "sui",
		"岁": "sui",
		"孙": "sun",
		"损": "sun",
		"所": "suo",
		"锁": "suo",
		"他": "ta",
		"她": "ta",
		"它": "ta",
		"台": "tai",
		"太": "tai",
		"态": "tai",
		"谈": "tan",
		"弹": "tan",
		"探": "tan",
		"汤": "tang",
		"唐": "tang",
		"糖": "tang",
		"套": "tao",
		"讨": "tao",
		"特": "te",
		"提": "ti",
		"体": "ti",
		"题": "ti",
		"天": "tian",
		"田": "tian",
		"填": "tian",
		"条": "tiao",
		"跳": "tiao",
		"贴": "tie",
		"铁": "tie",
		"听": "ting",
		"停": "ting",
		"挺": "ting",
		"通": "tong",
		"同": "tong",
		"统": "tong",
		"头": "tou",
		"透": "tou",
		"图": "tu",
		"土": "tu",
		"突": "tu",
		"推": "tui",
		"退": "tui",
		"拖": "tuo",
		"脱": "tuo",
		"挖": "wa",
		"外": "wai",
		"完": "wan",
		"玩": "wan",
		"晚": "wan",
		"万": "wan",
		"网": "wang",
		"王": "wang",
		"往": "wang",
		"望": "wang",
		"忘": "wang",
		"危": "wei",
		"围": "wei",
		"微": "wei",
		"为": "wei",
		"位": "wei",
		"未": "wei",
		"味": "wei",
		"卫": "wei",
		"温": "wen",
		"文": "wen",
		"问": "wen",
		"稳": "wen",
		"我": "wo",
		"无": "wu",
		"五": "wu",
		"午": "wu",
		"武": "wu",
		"物": "wu",
		"务": "wu",
		"误": "wu",
		"西": "xi",
		"吸": "xi",
		"希": "xi",
		"息": "xi",
		"习": "xi",
		"席": "xi",
		"系": "xi",
		"细": "xi",
		"喜": "xi",
		"洗": "xi",
		"戏": "xi",
		"下": "xia",
		"夏": "xia",
		"先": "xian",
		"线": "xian",
		"现": "xian",
		"限": "xian",
		"显": "xian",
		"险": "xian",
		"鲜": "xian",
		"相": "xiang",
		"想": "xiang",
		"向": "xiang",
		"象": "xiang",
		"项": "xiang",
		"响": "xiang",
		"消": "xiao",
		"小": "xiao",
		"笑": "xiao",
		"效": "xiao",
		"校": "xiao",
		"些": "xie",
		"写": "xie",
		"谢": "xie",
		"心": "xin",
		"新": "xin",
		"信": "xin",
		"星": "xing",
		"行": "xing",
		"形": "xing",
		"型": "xing",
		"兴": "xing",
		"性": "xing",
		"修": "xiu",
		"需": "xu",
		"虚": "xu",
		"许": "xu",
		"序": "xu",
		"续": "xu",
		"宣": "xuan",
		"选": "xuan",
		"学": "xue",
		"雪": "xue",
		"寻": "xun",
		"训": "xun",
		"循": "xun",
		"压": "ya",
		"呀": "ya",
		"牙": "ya",
		"言": "yan",
		"眼": "yan",
		"演": "yan",
		"验": "yan",
		"颜": "yan",
		"严": "yan",
		"盐": "yan",
		"研": "yan",
		"央": "yang",
		"阳": "yang",
		"样": "yang",
		"养": "yang",
		"要": "yao",
		"药": "yao",
		"邀": "yao",
		"钥": "yao",
		"也": "ye",
		"业": "ye",
		"叶": "ye",
		"页": "ye",
		"夜": "ye",
		"一": "yi",
		"已": "yi",
		"以": "yi",
		"亿": "yi",
		"义": "yi",
		"意": "yi",
		"议": "yi",
		"因": "yin",
		"音": "yin",
		"引": "yin",
		"印": "yin",
		"应": "ying",
		"影": "ying",
		"映": "ying",
		"英": "ying",
		"赢": "ying",
		"硬": "ying",
		"用": "yong",
		"永": "yong",
		"优": "you",
		"由": "you",
		"有": "you",
		"友": "you",
		"又": "you",
		"右": "you",
		"游": "you",
		"于": "yu",
		"与": "yu",
		"鱼": "yu",
		"语": "yu",
		"雨": "yu",
		"域": "yu",
		"遇": "yu",
		"预": "yu",
		"元": "yuan",
		"原": "yuan",
		"源": "yuan",
		"远": "yuan",
		"院": "yuan",
		"愿": "yuan",
		"约": "yue",
		"月": "yue",
		"越": "yue",
		"阅": "yue",
		"云": "yun",
		"运": "yun",
		"允": "yun",
		"杂": "za",
		"在": "zai",
		"再": "zai",
		"早": "zao",
		"造": "zao",
		"怎": "zen",
		"增": "zeng",
		"展": "zhan",
		"站": "zhan",
		"战": "zhan",
		"占": "zhan",
		"张": "zhang",
		"章": "zhang",
		"掌": "zhang",
		"找": "zhao",
		"照": "zhao",
		"着": "zhe",
		"者": "zhe",
		"这": "zhe",
		"针": "zhen",
		"真": "zhen",
		"正": "zheng",
		"整": "zheng",
		"证": "zheng",
		"政": "zheng",
		"之": "zhi",
		"支": "zhi",
		"知": "zhi",
		"直": "zhi",
		"值": "zhi",
		"只": "zhi",
		"指": "zhi",
		"止": "zhi",
		"制": "zhi",
		"至": "zhi",
		"志": "zhi",
		"治": "zhi",
		"置": "zhi",
		"质": "zhi",
		"中": "zhong",
		"终": "zhong",
		"种": "zhong",
		"主": "zhu",
		"住": "zhu",
		"注": "zhu",
		"助": "zhu",
		"著": "zhu",
		"柱": "zhu",
		"准": "zhun",
		"桌": "zhuo",
		"资": "zi",
		"子": "zi",
		"自": "zi",
		"字": "zi",
		"总": "zong",
		"走": "zou",
		"组": "zu",
		"足": "zu",
		"最": "zui",
		"做": "zuo",
		"作": "zuo",
		"坐": "zuo",
		"左": "zuo",
		"唤": "huan",
		"焦": "jiao",
		"粘": "zhan",
		"撤": "che",
		"恢": "hui",
		"截": "jie",
		"缩": "suo",
		"刷": "shua",
		"拽": "zhuai",
		"滚": "gun",
		"滑": "hua",
		"闪": "shan"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/keyboard-shortcuts/use-keyboard-shortcuts-settings.ts
/**
* Main hook for the keyboard shortcuts settings panel.
*/
function useKeyboardShortcutsSettings() {
	const t = useTranslation();
	const isCloud = useAdapter().environmentType === "cloud";
	const voiceInputEnabled = useVoiceInputFeature();
	const quickQaEnabled = useQuickQaFeatureEnabled();
	const [searchQuery, setSearchQuery] = (0, import_react$2.useState)("");
	const [shortcuts, setShortcuts] = (0, import_react$2.useState)(getAllShortcutsWithBindings);
	(0, import_react$2.useEffect)(() => {
		migrateLegacySendMessageShortcut();
	}, []);
	(0, import_react$2.useEffect)(() => {
		const handleChange = () => {
			setShortcuts(getAllShortcutsWithBindings());
		};
		window.addEventListener(SHORTCUT_CHANGE_EVENT, handleChange);
		return () => window.removeEventListener(SHORTCUT_CHANGE_EVENT, handleChange);
	}, []);
	const handleSearch = (0, import_react$2.useCallback)((query) => {
		setSearchQuery(query);
	}, []);
	const filteredShortcuts = (0, import_react$2.useMemo)(() => {
		let list = shortcuts;
		if (isCloud) list = list.filter((s) => s.scope !== "global");
		if (voiceInputEnabled !== true) list = list.filter((s) => s.id !== "toggle-voice-recording");
		if (!quickQaEnabled) list = list.filter((s) => s.id !== "new-quick-qa-conversation");
		const query = searchQuery.trim().toLowerCase().replace(/，/g, ",").replace(/。/g, ".").replace(/；/g, ";").replace(/：/g, ":").replace(/【/g, "[").replace(/】/g, "]").replace(/（/g, "(").replace(/）/g, ")").replace(/？/g, "?").replace(/！/g, "!");
		if (!query) return list;
		return list.filter((shortcut) => {
			const label = t(shortcut.labelKey);
			if (label.toLowerCase().includes(query)) return true;
			if (matchesPinyinInitials(label, query)) return true;
			if (query.length === 1) {
				if (getDisplayMainKey(shortcut.currentBinding) === query) return true;
				if (!/[a-z0-9]/.test(query)) {
					if (shortcut.currentBinding.toLowerCase() === query) return true;
				}
				return false;
			}
			if (formatShortcut(shortcut.currentBinding).toLowerCase().includes(query)) return true;
			if (shortcut.currentBinding.toLowerCase().includes(query)) return true;
			if (shortcut.id.toLowerCase().includes(query)) return true;
			return false;
		});
	}, [
		shortcuts,
		searchQuery,
		t,
		isCloud,
		voiceInputEnabled,
		quickQaEnabled
	]);
	return {
		searchQuery,
		setSearchQuery: handleSearch,
		shortcuts: filteredShortcuts,
		isSearching: searchQuery.trim().length > 0,
		totalVisible: filteredShortcuts.length
	};
}
var import_react$2;
var init_use_keyboard_shortcuts_settings = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
	init_product_features();
	init_useI18n();
	init_use_quick_qa_feature();
	init_pinyin_match();
	init_shortcut_formatter();
	init_shortcut_registry();
	init_shortcut_storage();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/keyboard-shortcuts/use-shortcut-recorder.ts
/**
* Hook managing the keyboard shortcut recording flow.
*
* Implements "real-time follow + release-to-commit" per design spec.
*/
function useShortcutRecorder() {
	const [state, setState] = (0, import_react$1.useState)("idle");
	const [editingId, setEditingId] = (0, import_react$1.useState)(null);
	const [recordedDisplay, setRecordedDisplay] = (0, import_react$1.useState)("");
	const [committedBinding, setCommittedBinding] = (0, import_react$1.useState)(null);
	const [recordingError, setRecordingError] = (0, import_react$1.useState)(null);
	const [conflictingNonEditableLabelKey, setConflictingNonEditableLabelKey] = (0, import_react$1.useState)(null);
	const [conflictDisplay, setConflictDisplay] = (0, import_react$1.useState)("");
	const startRecording = (0, import_react$1.useCallback)((shortcutId) => {
		setEditingId(shortcutId);
		setState("recording");
		setRecordedDisplay("");
		setCommittedBinding(null);
		setRecordingError(null);
		setConflictingNonEditableLabelKey(null);
		setConflictDisplay("");
		setShortcutRecording(true);
	}, []);
	const cancelRecording = (0, import_react$1.useCallback)(() => {
		setState("idle");
		setEditingId(null);
		setRecordedDisplay("");
		setCommittedBinding(null);
		setRecordingError(null);
		setConflictingNonEditableLabelKey(null);
		setConflictDisplay("");
		setShortcutRecording(false);
	}, []);
	const pressedKeysRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Set());
	const hadRegularKeyRef = (0, import_react$1.useRef)(false);
	const lastCompleteBindingRef = (0, import_react$1.useRef)(null);
	const conflictResolvedRef = (0, import_react$1.useRef)(false);
	(0, import_react$1.useEffect)(() => {
		if (state !== "recording") {
			pressedKeysRef.current.clear();
			hadRegularKeyRef.current = false;
			lastCompleteBindingRef.current = null;
			conflictResolvedRef.current = false;
			return;
		}
		const MODIFIER_KEYS = /* @__PURE__ */ new Set([
			"Control",
			"Alt",
			"Shift",
			"Meta"
		]);
		/**
		* Build binding string from currently held keys.
		*
		* Modifier order follows design spec (Ctrl → Shift → Alt → Meta),
		* regardless of the order keys were physically pressed.
		*/
		const buildBindingFromPressed = () => {
			const pressed = pressedKeysRef.current;
			const modifiers = [];
			let regularKey = "";
			if (pressed.has("Control")) modifiers.push("Ctrl");
			if (pressed.has("Shift")) modifiers.push("Shift");
			if (pressed.has("Alt")) modifiers.push("Alt");
			if (pressed.has("Meta")) modifiers.push("Meta");
			for (const k of pressed) if (!MODIFIER_KEYS.has(k)) {
				regularKey = k;
				break;
			}
			if (!regularKey && modifiers.length === 0) return "";
			const parts = [...modifiers];
			if (regularKey) parts.push(regularKey);
			return parts.join("+");
		};
		const handleKeyDown = (event) => {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			if (event.key === "Escape" && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
				cancelRecording();
				return;
			}
			setRecordingError(null);
			setConflictingNonEditableLabelKey(null);
			setConflictDisplay("");
			conflictResolvedRef.current = false;
			let key = event.key;
			const hasModifierHeld = event.metaKey || event.ctrlKey || event.altKey;
			const isAsciiPrintable = key.length === 1 && key.charCodeAt(0) >= 32 && key.charCodeAt(0) <= 126;
			if ((key === "Unidentified" || key === "Process" || key === "" || hasModifierHeld && !MODIFIER_KEYS.has(key) && !isAsciiPrintable) && event.code) {
				const codeResolved = resolveKeyFromCode(event.code);
				if (codeResolved) key = codeResolved;
			}
			if (MODIFIER_KEYS.has(key)) pressedKeysRef.current.add(key);
			else {
				let normalizedKey = key;
				if (key.length === 1) normalizedKey = key.toUpperCase();
				else if (key === " ") normalizedKey = "Space";
				for (const k of pressedKeysRef.current) if (!MODIFIER_KEYS.has(k)) pressedKeysRef.current.delete(k);
				pressedKeysRef.current.add(normalizedKey);
				hadRegularKeyRef.current = true;
			}
			const display = buildBindingFromPressed();
			setRecordedDisplay(display);
			if (hadRegularKeyRef.current) {
				lastCompleteBindingRef.current = display;
				const nonEditableConflict = findNonEditableConflict(display);
				if (nonEditableConflict) {
					setRecordingError("settings.keyboardShortcuts.errorNonEditableConflict");
					setConflictingNonEditableLabelKey(nonEditableConflict);
					setConflictDisplay(display);
					setRecordedDisplay(display);
					conflictResolvedRef.current = true;
					hadRegularKeyRef.current = false;
					lastCompleteBindingRef.current = null;
					pressedKeysRef.current.clear();
					return;
				}
			}
		};
		const handleKeyUp = (event) => {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			const key = event.key;
			if (MODIFIER_KEYS.has(key)) {
				pressedKeysRef.current.delete(key);
				if (key === "Meta" && lastCompleteBindingRef.current) pressedKeysRef.current.clear();
			} else {
				let normalizedKey = key;
				if (key.length === 1) normalizedKey = key.toUpperCase();
				else if (key === " ") normalizedKey = "Space";
				pressedKeysRef.current.delete(normalizedKey);
			}
			if (pressedKeysRef.current.size === 0) {
				if (conflictResolvedRef.current) return;
				if (lastCompleteBindingRef.current) {
					const nonEditableConflict = findNonEditableConflict(lastCompleteBindingRef.current);
					if (nonEditableConflict) {
						setRecordingError("settings.keyboardShortcuts.errorNonEditableConflict");
						setConflictingNonEditableLabelKey(nonEditableConflict);
						setConflictDisplay(lastCompleteBindingRef.current);
						setRecordedDisplay(lastCompleteBindingRef.current);
						hadRegularKeyRef.current = false;
						lastCompleteBindingRef.current = null;
						return;
					}
					const bindingParts = splitBindingParts(lastCompleteBindingRef.current);
					const hasModifier = bindingParts.some((p) => p === "Meta" || p === "Ctrl" || p === "Alt" || p === "Shift");
					const regularKey = bindingParts.find((p) => p !== "Meta" && p !== "Ctrl" && p !== "Alt" && p !== "Shift") || "";
					if (!hasModifier && !ALLOWED_STANDALONE_KEYS.has(regularKey)) {
						setRecordingError("settings.keyboardShortcuts.errorNoModifier");
						setRecordedDisplay("");
						hadRegularKeyRef.current = false;
						lastCompleteBindingRef.current = null;
						return;
					}
					setCommittedBinding(lastCompleteBindingRef.current);
					setRecordedDisplay(lastCompleteBindingRef.current);
				} else if (hadRegularKeyRef.current) setCommittedBinding(buildBindingFromPressed() || null);
				else {
					setRecordingError("settings.keyboardShortcuts.errorModifierOnly");
					setRecordedDisplay("");
					hadRegularKeyRef.current = false;
					lastCompleteBindingRef.current = null;
					return;
				}
			} else if (!lastCompleteBindingRef.current) {
				const display = buildBindingFromPressed();
				setRecordedDisplay(display);
			}
		};
		const handleBlur = () => {
			pressedKeysRef.current.clear();
			hadRegularKeyRef.current = false;
			lastCompleteBindingRef.current = null;
			setRecordedDisplay("");
		};
		document.addEventListener("keydown", handleKeyDown, true);
		document.addEventListener("keyup", handleKeyUp, true);
		window.addEventListener("blur", handleBlur);
		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
			document.removeEventListener("keyup", handleKeyUp, true);
			window.removeEventListener("blur", handleBlur);
		};
	}, [state, cancelRecording]);
	(0, import_react$1.useEffect)(() => {
		if (state === "idle") return;
		const handleClickOutside = () => {
			cancelRecording();
		};
		let cancelled = false;
		const timer = setTimeout(() => {
			if (!cancelled) document.addEventListener("mousedown", handleClickOutside);
		}, 100);
		return () => {
			cancelled = true;
			clearTimeout(timer);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [state, cancelRecording]);
	return {
		state,
		editingId,
		recordedDisplay,
		committedBinding,
		recordingError,
		conflictingNonEditableLabelKey,
		conflictDisplay,
		startRecording,
		cancelRecording
	};
}
var import_react$1;
var init_use_shortcut_recorder = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_shortcut_registry();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/keyboard-shortcuts/KeyboardShortcutsPanel.tsx
/**
* KeyboardShortcutsPanel - Settings panel for viewing and managing shortcuts.
* Renders shortcuts as a flat list (design spec: no category grouping).
* Platform is auto-detected — always shows bindings for the current OS.
*/
function KeyboardShortcutsPanel() {
	const t = useTranslation();
	const { searchQuery, setSearchQuery, shortcuts, isSearching } = useKeyboardShortcutsSettings();
	const recorder = useShortcutRecorder();
	const [conflictId, setConflictId] = (0, import_react.useState)(null);
	const [validationError, setValidationError] = (0, import_react.useState)(null);
	const platform = isMacPlatform() ? "mac" : "win";
	/** Build display text for recorder errors. For non-editable conflicts,
	* formats the conflict message with the recorded keys and conflicting label. */
	const buildRecorderErrorText = (0, import_react.useCallback)((errorKey, conflictLabelKey, currentRecordedDisplay) => {
		if (errorKey === "settings.keyboardShortcuts.errorNonEditableConflict" && conflictLabelKey) return t("settings.keyboardShortcuts.conflict", {
			keys: formatShortcutWithDisplayOverride(currentRecordedDisplay),
			label: t(conflictLabelKey)
		});
		return t(errorKey);
	}, [t]);
	/** Start recording when user clicks the binding area */
	const handleEdit = (0, import_react.useCallback)((shortcutId) => {
		setConflictId(null);
		setValidationError(null);
		recorder.startRecording(shortcutId);
	}, [recorder]);
	const prevCommittedRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const committed = recorder.committedBinding;
		if (committed && committed !== prevCommittedRef.current) {
			prevCommittedRef.current = committed;
			const shortcutId = recorder.editingId;
			if (!shortcutId) return;
			const error = validateBinding(committed);
			if (error) {
				const translated = t(error);
				setValidationError(translated !== error ? translated : error);
				setConflictId(null);
				return;
			}
			const conflicting = findConflictingShortcutId(committed, shortcutId);
			if (conflicting) {
				setConflictId(conflicting);
				setValidationError(null);
				return;
			}
			setConflictId(null);
			setValidationError(null);
			saveShortcutOverride(shortcutId, committed, platform);
			recorder.cancelRecording();
			message.success({
				content: t("settings.keyboardShortcuts.saveSuccess"),
				duration: 2e3,
				getContainer: () => document.querySelector(".settings-modal__content")
			});
		}
	}, [
		recorder.committedBinding,
		recorder.editingId,
		recorder,
		platform,
		t
	]);
	(0, import_react.useEffect)(() => {
		if (recorder.state === "idle") {
			prevCommittedRef.current = null;
			setConflictId(null);
			setValidationError(null);
		}
	}, [recorder.state]);
	(0, import_react.useEffect)(() => {
		if (recorder.state === "recording" && recorder.recordedDisplay !== "") {
			setConflictId(null);
			setValidationError(null);
		}
	}, [recorder.state, recorder.recordedDisplay]);
	const handleCancel = (0, import_react.useCallback)(() => {
		setConflictId(null);
		setValidationError(null);
		recorder.cancelRecording();
	}, [recorder]);
	/** Clear shortcut binding (set to unassigned) */
	const handleDelete = (0, import_react.useCallback)((shortcutId) => {
		setConflictId(null);
		setValidationError(null);
		clearShortcutBinding(shortcutId, platform);
		recorder.cancelRecording();
	}, [recorder, platform]);
	/** Restore a single shortcut to its default binding */
	const handleResetSingle = (0, import_react.useCallback)((shortcutId) => {
		setConflictId(null);
		setValidationError(null);
		removeShortcutOverride(shortcutId, platform);
		recorder.cancelRecording();
	}, [recorder, platform]);
	/** Reset all shortcuts to their defaults (batch operation) */
	const handleResetAll = (0, import_react.useCallback)(() => {
		const customizedIds = shortcuts.filter((s) => s.isCustomized).map((s) => s.id);
		if (customizedIds.length > 0) resetAllShortcutOverrides(platform, customizedIds);
		setConflictId(null);
		setValidationError(null);
		recorder.cancelRecording();
		message.success({
			content: t("settings.keyboardShortcuts.resetAllSuccess"),
			duration: 2e3,
			getContainer: () => document.querySelector(".settings-modal__content")
		});
	}, [
		shortcuts,
		recorder,
		platform,
		t
	]);
	const hasAnyCustomized = shortcuts.some((s) => s.isCustomized);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "keyboard-shortcuts-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "keyboard-shortcuts-panel__toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "keyboard-shortcuts-panel__search",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Search, {
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value),
					placeholder: t("settings.keyboardShortcuts.searchPlaceholder"),
					allowClear: true,
					size: "medium"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "medium",
				disabled: !hasAnyCustomized,
				onClick: handleResetAll,
				title: t("settings.keyboardShortcuts.resetAll"),
				children: t("settings.keyboardShortcuts.resetAll")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "keyboard-shortcuts-panel__list",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "keyboard-shortcuts-panel__column-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "keyboard-shortcuts-panel__col-command",
						children: t("settings.keyboardShortcuts.columnCommand")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "keyboard-shortcuts-panel__col-binding",
						children: t("settings.keyboardShortcuts.columnBinding")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "keyboard-shortcuts-panel__col-action",
						children: t("settings.keyboardShortcuts.columnAction")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "keyboard-shortcuts-panel__list-scroll",
				children: [shortcuts.length === 0 && isSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "keyboard-shortcuts-panel__empty",
					children: t("settings.keyboardShortcuts.noResults")
				}), shortcuts.map((shortcut) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutItem, {
					definition: shortcut,
					currentBinding: shortcut.currentBinding,
					label: t(shortcut.labelKey),
					isCustomized: shortcut.isCustomized,
					isEditing: recorder.editingId === shortcut.id,
					recorderState: recorder.state,
					recordedDisplay: recorder.recordedDisplay,
					hasConflict: recorder.editingId === shortcut.id && conflictId !== null,
					conflictLabel: conflictId ? t(SHORTCUT_DEFINITIONS.find((d) => d.id === conflictId)?.labelKey ?? "") : void 0,
					validationError: recorder.editingId === shortcut.id ? validationError || (recorder.recordingError ? buildRecorderErrorText(recorder.recordingError, recorder.conflictingNonEditableLabelKey, recorder.conflictDisplay) : null) : void 0,
					onEdit: handleEdit,
					onCancel: handleCancel,
					onDelete: handleDelete,
					onResetSingle: handleResetSingle
				}, shortcut.id))]
			})]
		})]
	});
}
var import_react, import_jsx_runtime;
var init_KeyboardShortcutsPanel = __esmMin((() => {
	init_keyboard_shortcuts_panel();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_keyboard_shortcuts$1();
	init_shortcut_storage();
	init_submit_message_shortcut();
	init_shortcut_item();
	init_use_keyboard_shortcuts_settings();
	init_use_shortcut_recorder();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
__esmMin((() => {
	init_KeyboardShortcutsPanel();
}))();
export { KeyboardShortcutsPanel };
