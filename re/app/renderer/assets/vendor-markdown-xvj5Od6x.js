import { n as __esmMin, r as __exportAll, s as __toESM, t as __commonJSMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Ah as webNamespaces, Bh as bail, Ch as init_escape_string_regexp, Gh as init_index_dom, Hh as init_longest_streak, Ih as trough, Lh as init_is_plain_obj, Mh as init_trim_lines, Nh as trimLines, Ph as init_trough, Rh as isPlainObject, Sh as escapeStringRegexp, Uh as longestStreak, Vh as init_bail, Wh as decodeNamedCharacterReference, _h as init_markdown_table, _v as zwitch, cv as init_space_separated_tokens, dv as init_comma_separated_tokens, fv as parse$2, gv as init_zwitch, hv as init_ccount, jh as require_katex, kh as init_web_namespaces, lv as parse$1, mv as ccount, vh as markdownTable, zh as require_extend } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../node_modules/.pnpm/mdast-util-to-string@3.2.0/node_modules/mdast-util-to-string/lib/index.js
/**
* Get the text content of a node or list of nodes.
*
* Prefers the node’s plain-text fields, otherwise serializes its children,
* and if the given value is an array, serialize the nodes in it.
*
* @param {unknown} value
*   Thing to serialize, typically `Node`.
* @param {Options | null | undefined} [options]
*   Configuration (optional).
* @returns {string}
*   Serialized `value`.
*/
function toString(value, options) {
	const settings = options || emptyOptions;
	return one$2(value, typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true, typeof settings.includeHtml === "boolean" ? settings.includeHtml : true);
}
/**
* One node or several nodes.
*
* @param {unknown} value
*   Thing to serialize.
* @param {boolean} includeImageAlt
*   Include image `alt`s.
* @param {boolean} includeHtml
*   Include HTML.
* @returns {string}
*   Serialized node.
*/
function one$2(value, includeImageAlt, includeHtml) {
	if (node(value)) {
		if ("value" in value) return value.type === "html" && !includeHtml ? "" : value.value;
		if (includeImageAlt && "alt" in value && value.alt) return value.alt;
		if ("children" in value) return all$2(value.children, includeImageAlt, includeHtml);
	}
	if (Array.isArray(value)) return all$2(value, includeImageAlt, includeHtml);
	return "";
}
/**
* Serialize a list of nodes.
*
* @param {Array<unknown>} values
*   Thing to serialize.
* @param {boolean} includeImageAlt
*   Include image `alt`s.
* @param {boolean} includeHtml
*   Include HTML.
* @returns {string}
*   Serialized nodes.
*/
function all$2(values, includeImageAlt, includeHtml) {
	/** @type {Array<string>} */
	const result = [];
	let index = -1;
	while (++index < values.length) result[index] = one$2(values[index], includeImageAlt, includeHtml);
	return result.join("");
}
/**
* Check if `value` looks like a node.
*
* @param {unknown} value
*   Thing.
* @returns {value is Node}
*   Whether `value` is a node.
*/
function node(value) {
	return Boolean(value && typeof value === "object");
}
var emptyOptions;
var init_lib$30 = __esmMin((() => {
	emptyOptions = {};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-string@3.2.0/node_modules/mdast-util-to-string/index.js
var init_mdast_util_to_string = __esmMin((() => {
	init_lib$30();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-chunked@1.1.0/node_modules/micromark-util-chunked/index.js
/**
* Like `Array#splice`, but smarter for giant arrays.
*
* `Array#splice` takes all items to be inserted as individual argument which
* causes a stack overflow in V8 when trying to insert 100k items for instance.
*
* Otherwise, this does not return the removed items, and takes `items` as an
* array instead of rest parameters.
*
* @template {unknown} T
*   Item type.
* @param {Array<T>} list
*   List to operate on.
* @param {number} start
*   Index to remove/insert at (can be negative).
* @param {number} remove
*   Number of items to remove.
* @param {Array<T>} items
*   Items to inject into `list`.
* @returns {void}
*   Nothing.
*/
function splice(list, start, remove, items) {
	const end = list.length;
	let chunkStart = 0;
	/** @type {Array<unknown>} */
	let parameters;
	if (start < 0) start = -start > end ? 0 : end + start;
	else start = start > end ? end : start;
	remove = remove > 0 ? remove : 0;
	if (items.length < 1e4) {
		parameters = Array.from(items);
		parameters.unshift(start, remove);
		list.splice(...parameters);
	} else {
		if (remove) list.splice(start, remove);
		while (chunkStart < items.length) {
			parameters = items.slice(chunkStart, chunkStart + 1e4);
			parameters.unshift(start, 0);
			list.splice(...parameters);
			chunkStart += 1e4;
			start += 1e4;
		}
	}
}
/**
* Append `items` (an array) at the end of `list` (another array).
* When `list` was empty, returns `items` instead.
*
* This prevents a potentially expensive operation when `list` is empty,
* and adds items in batches to prevent V8 from hanging.
*
* @template {unknown} T
*   Item type.
* @param {Array<T>} list
*   List to operate on.
* @param {Array<T>} items
*   Items to add to `list`.
* @returns {Array<T>}
*   Either `list` or `items`.
*/
function push(list, items) {
	if (list.length > 0) {
		splice(list, list.length, 0, items);
		return list;
	}
	return items;
}
var init_micromark_util_chunked = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-combine-extensions@1.1.0/node_modules/micromark-util-combine-extensions/index.js
/**
* Combine multiple syntax extensions into one.
*
* @param {Array<Extension>} extensions
*   List of syntax extensions.
* @returns {NormalizedExtension}
*   A single combined extension.
*/
function combineExtensions(extensions) {
	/** @type {NormalizedExtension} */
	const all = {};
	let index = -1;
	while (++index < extensions.length) syntaxExtension(all, extensions[index]);
	return all;
}
/**
* Merge `extension` into `all`.
*
* @param {NormalizedExtension} all
*   Extension to merge into.
* @param {Extension} extension
*   Extension to merge.
* @returns {void}
*/
function syntaxExtension(all, extension) {
	/** @type {keyof Extension} */
	let hook;
	for (hook in extension) {
		/** @type {Record<string, unknown>} */
		const left = (hasOwnProperty.call(all, hook) ? all[hook] : void 0) || (all[hook] = {});
		/** @type {Record<string, unknown> | undefined} */
		const right = extension[hook];
		/** @type {string} */
		let code;
		if (right) for (code in right) {
			if (!hasOwnProperty.call(left, code)) left[code] = [];
			const value = right[code];
			constructs(left[code], Array.isArray(value) ? value : value ? [value] : []);
		}
	}
}
/**
* Merge `list` into `existing` (both lists of constructs).
* Mutates `existing`.
*
* @param {Array<unknown>} existing
* @param {Array<unknown>} list
* @returns {void}
*/
function constructs(existing, list) {
	let index = -1;
	/** @type {Array<unknown>} */
	const before = [];
	while (++index < list.length) (list[index].add === "after" ? existing : before).push(list[index]);
	splice(existing, 0, 0, before);
}
var hasOwnProperty;
var init_micromark_util_combine_extensions = __esmMin((() => {
	init_micromark_util_chunked();
	hasOwnProperty = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-character@1.2.0/node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex;
var init_unicode_punctuation_regex = __esmMin((() => {
	unicodePunctuationRegex = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-character@1.2.0/node_modules/micromark-util-character/index.js
/**
* Check whether a character code is an ASCII control character.
*
* An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
* to U+001F (US), or U+007F (DEL).
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function asciiControl(code) {
	return code !== null && (code < 32 || code === 127);
}
/**
* Check whether a character code is a markdown line ending.
*
* A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
* LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
*
* In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
* RETURN (CR) are replaced by these virtual characters depending on whether
* they occurred together.
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function markdownLineEnding(code) {
	return code !== null && code < -2;
}
/**
* Check whether a character code is a markdown line ending (see
* `markdownLineEnding`) or markdown space (see `markdownSpace`).
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function markdownLineEndingOrSpace(code) {
	return code !== null && (code < 0 || code === 32);
}
/**
* Check whether a character code is a markdown space.
*
* A **markdown space** is the concrete character U+0020 SPACE (SP) and the
* virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
*
* In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
* replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
* SPACE (VS) characters, depending on the column at which the tab occurred.
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function markdownSpace(code) {
	return code === -2 || code === -1 || code === 32;
}
/**
* Create a code check from a regex.
*
* @param {RegExp} regex
* @returns {(code: Code) => boolean}
*/
function regexCheck(regex) {
	return check;
	/**
	* Check whether a code matches the bound regex.
	*
	* @param {Code} code
	*   Character code.
	* @returns {boolean}
	*   Whether the character code matches the bound regex.
	*/
	function check(code) {
		return code !== null && regex.test(String.fromCharCode(code));
	}
}
var asciiAlpha, asciiAlphanumeric, asciiAtext, asciiDigit, asciiHexDigit, asciiPunctuation, unicodePunctuation, unicodeWhitespace;
var init_micromark_util_character = __esmMin((() => {
	init_unicode_punctuation_regex();
	asciiAlpha = regexCheck(/[A-Za-z]/);
	asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
	asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
	asciiDigit = regexCheck(/\d/);
	asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
	asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
	unicodePunctuation = regexCheck(unicodePunctuationRegex);
	unicodeWhitespace = regexCheck(/\s/);
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-factory-space@1.1.0/node_modules/micromark-factory-space/index.js
/**
* Parse spaces and tabs.
*
* There is no `nok` parameter:
*
* *   spaces in markdown are often optional, in which case this factory can be
*     used and `ok` will be switched to whether spaces were found or not
* *   one line ending or space can be detected with `markdownSpace(code)` right
*     before using `factorySpace`
*
* ###### Examples
*
* Where `␉` represents a tab (plus how much it expands) and `␠` represents a
* single space.
*
* ```markdown
* ␉
* ␠␠␠␠
* ␉␠
* ```
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {TokenType} type
*   Type (`' \t'`).
* @param {number | undefined} [max=Infinity]
*   Max (exclusive).
* @returns
*   Start state.
*/
function factorySpace(effects, ok, type, max) {
	const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
	let size = 0;
	return start;
	/** @type {State} */
	function start(code) {
		if (markdownSpace(code)) {
			effects.enter(type);
			return prefix(code);
		}
		return ok(code);
	}
	/** @type {State} */
	function prefix(code) {
		if (markdownSpace(code) && size++ < limit) {
			effects.consume(code);
			return prefix;
		}
		effects.exit(type);
		return ok(code);
	}
}
var init_micromark_factory_space = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/initialize/content.js
/**
* @this {TokenizeContext}
* @type {Initializer}
*/
function initializeContent(effects) {
	const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
	/** @type {Token} */
	let previous;
	return contentStart;
	/** @type {State} */
	function afterContentStartConstruct(code) {
		if (code === null) {
			effects.consume(code);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return factorySpace(effects, contentStart, "linePrefix");
	}
	/** @type {State} */
	function paragraphInitial(code) {
		effects.enter("paragraph");
		return lineStart(code);
	}
	/** @type {State} */
	function lineStart(code) {
		const token = effects.enter("chunkText", {
			contentType: "text",
			previous
		});
		if (previous) previous.next = token;
		previous = token;
		return data(code);
	}
	/** @type {State} */
	function data(code) {
		if (code === null) {
			effects.exit("chunkText");
			effects.exit("paragraph");
			effects.consume(code);
			return;
		}
		if (markdownLineEnding(code)) {
			effects.consume(code);
			effects.exit("chunkText");
			return lineStart;
		}
		effects.consume(code);
		return data;
	}
}
var content$1;
var init_content$1 = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	content$1 = { tokenize: initializeContent };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/initialize/document.js
/**
* @this {TokenizeContext}
* @type {Initializer}
*/
function initializeDocument(effects) {
	const self = this;
	/** @type {Array<StackItem>} */
	const stack = [];
	let continued = 0;
	/** @type {TokenizeContext | undefined} */
	let childFlow;
	/** @type {Token | undefined} */
	let childToken;
	/** @type {number} */
	let lineStartOffset;
	return start;
	/** @type {State} */
	function start(code) {
		if (continued < stack.length) {
			const item = stack[continued];
			self.containerState = item[1];
			return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
		}
		return checkNewContainers(code);
	}
	/** @type {State} */
	function documentContinue(code) {
		continued++;
		if (self.containerState._closeFlow) {
			self.containerState._closeFlow = void 0;
			if (childFlow) closeFlow();
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			/** @type {Point | undefined} */
			let point;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				point = self.events[indexBeforeFlow][1].end;
				break;
			}
			exitContainers(continued);
			let index = indexBeforeExits;
			while (index < self.events.length) {
				self.events[index][1].end = Object.assign({}, point);
				index++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index;
			return checkNewContainers(code);
		}
		return start(code);
	}
	/** @type {State} */
	function checkNewContainers(code) {
		if (continued === stack.length) {
			if (!childFlow) return documentContinued(code);
			if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code);
			self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
		}
		self.containerState = {};
		return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
	}
	/** @type {State} */
	function thereIsANewContainer(code) {
		if (childFlow) closeFlow();
		exitContainers(continued);
		return documentContinued(code);
	}
	/** @type {State} */
	function thereIsNoNewContainer(code) {
		self.parser.lazy[self.now().line] = continued !== stack.length;
		lineStartOffset = self.now().offset;
		return flowStart(code);
	}
	/** @type {State} */
	function documentContinued(code) {
		self.containerState = {};
		return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
	}
	/** @type {State} */
	function containerContinue(code) {
		continued++;
		stack.push([self.currentConstruct, self.containerState]);
		return documentContinued(code);
	}
	/** @type {State} */
	function flowStart(code) {
		if (code === null) {
			if (childFlow) closeFlow();
			exitContainers(0);
			effects.consume(code);
			return;
		}
		childFlow = childFlow || self.parser.flow(self.now());
		effects.enter("chunkFlow", {
			contentType: "flow",
			previous: childToken,
			_tokenizer: childFlow
		});
		return flowContinue(code);
	}
	/** @type {State} */
	function flowContinue(code) {
		if (code === null) {
			writeToChild(effects.exit("chunkFlow"), true);
			exitContainers(0);
			effects.consume(code);
			return;
		}
		if (markdownLineEnding(code)) {
			effects.consume(code);
			writeToChild(effects.exit("chunkFlow"));
			continued = 0;
			self.interrupt = void 0;
			return start;
		}
		effects.consume(code);
		return flowContinue;
	}
	/**
	* @param {Token} token
	* @param {boolean | undefined} [eof]
	* @returns {void}
	*/
	function writeToChild(token, eof) {
		const stream = self.sliceStream(token);
		if (eof) stream.push(null);
		token.previous = childToken;
		if (childToken) childToken.next = token;
		childToken = token;
		childFlow.defineSkip(token.start);
		childFlow.write(stream);
		if (self.parser.lazy[token.start.line]) {
			let index = childFlow.events.length;
			while (index--) if (childFlow.events[index][1].start.offset < lineStartOffset && (!childFlow.events[index][1].end || childFlow.events[index][1].end.offset > lineStartOffset)) return;
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			/** @type {boolean | undefined} */
			let seen;
			/** @type {Point | undefined} */
			let point;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				if (seen) {
					point = self.events[indexBeforeFlow][1].end;
					break;
				}
				seen = true;
			}
			exitContainers(continued);
			index = indexBeforeExits;
			while (index < self.events.length) {
				self.events[index][1].end = Object.assign({}, point);
				index++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index;
		}
	}
	/**
	* @param {number} size
	* @returns {void}
	*/
	function exitContainers(size) {
		let index = stack.length;
		while (index-- > size) {
			const entry = stack[index];
			self.containerState = entry[1];
			entry[0].exit.call(self, effects);
		}
		stack.length = size;
	}
	function closeFlow() {
		childFlow.write([null]);
		childToken = void 0;
		childFlow = void 0;
		self.containerState._closeFlow = void 0;
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeContainer(effects, ok, nok) {
	return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
var document$2, containerConstruct;
var init_document = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_chunked();
	document$2 = { tokenize: initializeDocument };
	containerConstruct = { tokenize: tokenizeContainer };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-classify-character@1.1.0/node_modules/micromark-util-classify-character/index.js
/**
* Classify whether a code represents whitespace, punctuation, or something
* else.
*
* Used for attention (emphasis, strong), whose sequences can open or close
* based on the class of surrounding characters.
*
* > 👉 **Note**: eof (`null`) is seen as whitespace.
*
* @param {Code} code
*   Code.
* @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}
*   Group.
*/
function classifyCharacter(code) {
	if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return 1;
	if (unicodePunctuation(code)) return 2;
}
var init_micromark_util_classify_character = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-resolve-all@1.1.0/node_modules/micromark-util-resolve-all/index.js
/**
* @typedef {import('micromark-util-types').Event} Event
* @typedef {import('micromark-util-types').Resolver} Resolver
* @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
*/
/**
* Call all `resolveAll`s.
*
* @param {Array<{resolveAll?: Resolver | undefined}>} constructs
*   List of constructs, optionally with `resolveAll`s.
* @param {Array<Event>} events
*   List of events.
* @param {TokenizeContext} context
*   Context used by `tokenize`.
* @returns {Array<Event>}
*   Changed events.
*/
function resolveAll(constructs, events, context) {
	/** @type {Array<Resolver>} */
	const called = [];
	let index = -1;
	while (++index < constructs.length) {
		const resolve = constructs[index].resolveAll;
		if (resolve && !called.includes(resolve)) {
			events = resolve(events, context);
			called.push(resolve);
		}
	}
	return events;
}
var init_micromark_util_resolve_all = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/attention.js
/**
* Take all events and resolve attention to emphasis or strong.
*
* @type {Resolver}
*/
function resolveAllAttention(events, context) {
	let index = -1;
	/** @type {number} */
	let open;
	/** @type {Token} */
	let group;
	/** @type {Token} */
	let text;
	/** @type {Token} */
	let openingSequence;
	/** @type {Token} */
	let closingSequence;
	/** @type {number} */
	let use;
	/** @type {Array<Event>} */
	let nextEvents;
	/** @type {number} */
	let offset;
	while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
		open = index;
		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
			if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) continue;
			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
			const start = Object.assign({}, events[open][1].end);
			const end = Object.assign({}, events[index][1].start);
			movePoint(start, -use);
			movePoint(end, use);
			openingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start,
				end: Object.assign({}, events[open][1].end)
			};
			closingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start: Object.assign({}, events[index][1].start),
				end
			};
			text = {
				type: use > 1 ? "strongText" : "emphasisText",
				start: Object.assign({}, events[open][1].end),
				end: Object.assign({}, events[index][1].start)
			};
			group = {
				type: use > 1 ? "strong" : "emphasis",
				start: Object.assign({}, openingSequence.start),
				end: Object.assign({}, closingSequence.end)
			};
			events[open][1].end = Object.assign({}, openingSequence.start);
			events[index][1].start = Object.assign({}, closingSequence.end);
			nextEvents = [];
			if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
				"enter",
				events[open][1],
				context
			], [
				"exit",
				events[open][1],
				context
			]]);
			nextEvents = push(nextEvents, [
				[
					"enter",
					group,
					context
				],
				[
					"enter",
					openingSequence,
					context
				],
				[
					"exit",
					openingSequence,
					context
				],
				[
					"enter",
					text,
					context
				]
			]);
			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
			nextEvents = push(nextEvents, [
				[
					"exit",
					text,
					context
				],
				[
					"enter",
					closingSequence,
					context
				],
				[
					"exit",
					closingSequence,
					context
				],
				[
					"exit",
					group,
					context
				]
			]);
			if (events[index][1].end.offset - events[index][1].start.offset) {
				offset = 2;
				nextEvents = push(nextEvents, [[
					"enter",
					events[index][1],
					context
				], [
					"exit",
					events[index][1],
					context
				]]);
			} else offset = 0;
			splice(events, open - 1, index - open + 3, nextEvents);
			index = open + nextEvents.length - offset - 2;
			break;
		}
	}
	index = -1;
	while (++index < events.length) if (events[index][1].type === "attentionSequence") events[index][1].type = "data";
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeAttention(effects, ok) {
	const attentionMarkers = this.parser.constructs.attentionMarkers.null;
	const previous = this.previous;
	const before = classifyCharacter(previous);
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Before a sequence.
	*
	* ```markdown
	* > | **
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		marker = code;
		effects.enter("attentionSequence");
		return inside(code);
	}
	/**
	* In a sequence.
	*
	* ```markdown
	* > | **
	*     ^^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === marker) {
			effects.consume(code);
			return inside;
		}
		const token = effects.exit("attentionSequence");
		const after = classifyCharacter(code);
		const open = !after || after === 2 && before || attentionMarkers.includes(code);
		const close = !before || before === 2 && after || attentionMarkers.includes(previous);
		token._open = Boolean(marker === 42 ? open : open && (before || !close));
		token._close = Boolean(marker === 42 ? close : close && (after || !open));
		return ok(code);
	}
}
/**
* Move a point a bit.
*
* Note: `move` only works inside lines! It’s not possible to move past other
* chunks (replacement characters, tabs, or line endings).
*
* @param {Point} point
* @param {number} offset
* @returns {void}
*/
function movePoint(point, offset) {
	point.column += offset;
	point.offset += offset;
	point._bufferIndex += offset;
}
var attention;
var init_attention = __esmMin((() => {
	init_micromark_util_chunked();
	init_micromark_util_classify_character();
	init_micromark_util_resolve_all();
	attention = {
		name: "attention",
		tokenize: tokenizeAttention,
		resolveAll: resolveAllAttention
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/autolink.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeAutolink(effects, ok, nok) {
	let size = 0;
	return start;
	/**
	* Start of an autolink.
	*
	* ```markdown
	* > | a<https://example.com>b
	*      ^
	* > | a<user@example.com>b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("autolink");
		effects.enter("autolinkMarker");
		effects.consume(code);
		effects.exit("autolinkMarker");
		effects.enter("autolinkProtocol");
		return open;
	}
	/**
	* After `<`, at protocol or atext.
	*
	* ```markdown
	* > | a<https://example.com>b
	*       ^
	* > | a<user@example.com>b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (asciiAlpha(code)) {
			effects.consume(code);
			return schemeOrEmailAtext;
		}
		return emailAtext(code);
	}
	/**
	* At second byte of protocol or atext.
	*
	* ```markdown
	* > | a<https://example.com>b
	*        ^
	* > | a<user@example.com>b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function schemeOrEmailAtext(code) {
		if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
			size = 1;
			return schemeInsideOrEmailAtext(code);
		}
		return emailAtext(code);
	}
	/**
	* In ambiguous protocol or atext.
	*
	* ```markdown
	* > | a<https://example.com>b
	*        ^
	* > | a<user@example.com>b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function schemeInsideOrEmailAtext(code) {
		if (code === 58) {
			effects.consume(code);
			size = 0;
			return urlInside;
		}
		if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
			effects.consume(code);
			return schemeInsideOrEmailAtext;
		}
		size = 0;
		return emailAtext(code);
	}
	/**
	* After protocol, in URL.
	*
	* ```markdown
	* > | a<https://example.com>b
	*             ^
	* ```
	*
	* @type {State}
	*/
	function urlInside(code) {
		if (code === 62) {
			effects.exit("autolinkProtocol");
			effects.enter("autolinkMarker");
			effects.consume(code);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok;
		}
		if (code === null || code === 32 || code === 60 || asciiControl(code)) return nok(code);
		effects.consume(code);
		return urlInside;
	}
	/**
	* In email atext.
	*
	* ```markdown
	* > | a<user.name@example.com>b
	*              ^
	* ```
	*
	* @type {State}
	*/
	function emailAtext(code) {
		if (code === 64) {
			effects.consume(code);
			return emailAtSignOrDot;
		}
		if (asciiAtext(code)) {
			effects.consume(code);
			return emailAtext;
		}
		return nok(code);
	}
	/**
	* In label, after at-sign or dot.
	*
	* ```markdown
	* > | a<user.name@example.com>b
	*                 ^       ^
	* ```
	*
	* @type {State}
	*/
	function emailAtSignOrDot(code) {
		return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
	}
	/**
	* In label, where `.` and `>` are allowed.
	*
	* ```markdown
	* > | a<user.name@example.com>b
	*                   ^
	* ```
	*
	* @type {State}
	*/
	function emailLabel(code) {
		if (code === 46) {
			effects.consume(code);
			size = 0;
			return emailAtSignOrDot;
		}
		if (code === 62) {
			effects.exit("autolinkProtocol").type = "autolinkEmail";
			effects.enter("autolinkMarker");
			effects.consume(code);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok;
		}
		return emailValue(code);
	}
	/**
	* In label, where `.` and `>` are *not* allowed.
	*
	* Though, this is also used in `emailLabel` to parse other values.
	*
	* ```markdown
	* > | a<user.name@ex-ample.com>b
	*                    ^
	* ```
	*
	* @type {State}
	*/
	function emailValue(code) {
		if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
			const next = code === 45 ? emailValue : emailLabel;
			effects.consume(code);
			return next;
		}
		return nok(code);
	}
}
var autolink;
var init_autolink = __esmMin((() => {
	init_micromark_util_character();
	autolink = {
		name: "autolink",
		tokenize: tokenizeAutolink
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/blank-line.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlankLine(effects, ok, nok) {
	return start;
	/**
	* Start of blank line.
	*
	* > 👉 **Note**: `␠` represents a space character.
	*
	* ```markdown
	* > | ␠␠␊
	*     ^
	* > | ␊
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
	}
	/**
	* At eof/eol, after optional whitespace.
	*
	* > 👉 **Note**: `␠` represents a space character.
	*
	* ```markdown
	* > | ␠␠␊
	*       ^
	* > | ␊
	*     ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
	}
}
var blankLine;
var init_blank_line = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	blankLine = {
		tokenize: tokenizeBlankLine,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/block-quote.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlockQuoteStart(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of block quote.
	*
	* ```markdown
	* > | > a
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (code === 62) {
			const state = self.containerState;
			if (!state.open) {
				effects.enter("blockQuote", { _container: true });
				state.open = true;
			}
			effects.enter("blockQuotePrefix");
			effects.enter("blockQuoteMarker");
			effects.consume(code);
			effects.exit("blockQuoteMarker");
			return after;
		}
		return nok(code);
	}
	/**
	* After `>`, before optional whitespace.
	*
	* ```markdown
	* > | > a
	*      ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		if (markdownSpace(code)) {
			effects.enter("blockQuotePrefixWhitespace");
			effects.consume(code);
			effects.exit("blockQuotePrefixWhitespace");
			effects.exit("blockQuotePrefix");
			return ok;
		}
		effects.exit("blockQuotePrefix");
		return ok(code);
	}
}
/**
* Start of block quote continuation.
*
* ```markdown
*   | > a
* > | > b
*     ^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlockQuoteContinuation(effects, ok, nok) {
	const self = this;
	return contStart;
	/**
	* Start of block quote continuation.
	*
	* Also used to parse the first block quote opening.
	*
	* ```markdown
	*   | > a
	* > | > b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function contStart(code) {
		if (markdownSpace(code)) return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
		return contBefore(code);
	}
	/**
	* At `>`, after optional whitespace.
	*
	* Also used to parse the first block quote opening.
	*
	* ```markdown
	*   | > a
	* > | > b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function contBefore(code) {
		return effects.attempt(blockQuote, ok, nok)(code);
	}
}
/** @type {Exiter} */
function exit$1(effects) {
	effects.exit("blockQuote");
}
var blockQuote;
var init_block_quote = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	blockQuote = {
		name: "blockQuote",
		tokenize: tokenizeBlockQuoteStart,
		continuation: { tokenize: tokenizeBlockQuoteContinuation },
		exit: exit$1
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/character-escape.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCharacterEscape(effects, ok, nok) {
	return start;
	/**
	* Start of character escape.
	*
	* ```markdown
	* > | a\*b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("characterEscape");
		effects.enter("escapeMarker");
		effects.consume(code);
		effects.exit("escapeMarker");
		return inside;
	}
	/**
	* After `\`, at punctuation.
	*
	* ```markdown
	* > | a\*b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (asciiPunctuation(code)) {
			effects.enter("characterEscapeValue");
			effects.consume(code);
			effects.exit("characterEscapeValue");
			effects.exit("characterEscape");
			return ok;
		}
		return nok(code);
	}
}
var characterEscape;
var init_character_escape = __esmMin((() => {
	init_micromark_util_character();
	characterEscape = {
		name: "characterEscape",
		tokenize: tokenizeCharacterEscape
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/character-reference.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCharacterReference(effects, ok, nok) {
	const self = this;
	let size = 0;
	/** @type {number} */
	let max;
	/** @type {(code: Code) => boolean} */
	let test;
	return start;
	/**
	* Start of character reference.
	*
	* ```markdown
	* > | a&amp;b
	*      ^
	* > | a&#123;b
	*      ^
	* > | a&#x9;b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("characterReference");
		effects.enter("characterReferenceMarker");
		effects.consume(code);
		effects.exit("characterReferenceMarker");
		return open;
	}
	/**
	* After `&`, at `#` for numeric references or alphanumeric for named
	* references.
	*
	* ```markdown
	* > | a&amp;b
	*       ^
	* > | a&#123;b
	*       ^
	* > | a&#x9;b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 35) {
			effects.enter("characterReferenceMarkerNumeric");
			effects.consume(code);
			effects.exit("characterReferenceMarkerNumeric");
			return numeric;
		}
		effects.enter("characterReferenceValue");
		max = 31;
		test = asciiAlphanumeric;
		return value(code);
	}
	/**
	* After `#`, at `x` for hexadecimals or digit for decimals.
	*
	* ```markdown
	* > | a&#123;b
	*        ^
	* > | a&#x9;b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function numeric(code) {
		if (code === 88 || code === 120) {
			effects.enter("characterReferenceMarkerHexadecimal");
			effects.consume(code);
			effects.exit("characterReferenceMarkerHexadecimal");
			effects.enter("characterReferenceValue");
			max = 6;
			test = asciiHexDigit;
			return value;
		}
		effects.enter("characterReferenceValue");
		max = 7;
		test = asciiDigit;
		return value(code);
	}
	/**
	* After markers (`&#x`, `&#`, or `&`), in value, before `;`.
	*
	* The character reference kind defines what and how many characters are
	* allowed.
	*
	* ```markdown
	* > | a&amp;b
	*       ^^^
	* > | a&#123;b
	*        ^^^
	* > | a&#x9;b
	*         ^
	* ```
	*
	* @type {State}
	*/
	function value(code) {
		if (code === 59 && size) {
			const token = effects.exit("characterReferenceValue");
			if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) return nok(code);
			effects.enter("characterReferenceMarker");
			effects.consume(code);
			effects.exit("characterReferenceMarker");
			effects.exit("characterReference");
			return ok;
		}
		if (test(code) && size++ < max) {
			effects.consume(code);
			return value;
		}
		return nok(code);
	}
}
var characterReference;
var init_character_reference = __esmMin((() => {
	init_index_dom();
	init_micromark_util_character();
	characterReference = {
		name: "characterReference",
		tokenize: tokenizeCharacterReference
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/code-fenced.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCodeFenced(effects, ok, nok) {
	const self = this;
	/** @type {Construct} */
	const closeStart = {
		tokenize: tokenizeCloseStart,
		partial: true
	};
	let initialPrefix = 0;
	let sizeOpen = 0;
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Start of code.
	*
	* ```markdown
	* > | ~~~js
	*     ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		return beforeSequenceOpen(code);
	}
	/**
	* In opening fence, after prefix, at sequence.
	*
	* ```markdown
	* > | ~~~js
	*     ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function beforeSequenceOpen(code) {
		const tail = self.events[self.events.length - 1];
		initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
		marker = code;
		effects.enter("codeFenced");
		effects.enter("codeFencedFence");
		effects.enter("codeFencedFenceSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening fence sequence.
	*
	* ```markdown
	* > | ~~~js
	*      ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === marker) {
			sizeOpen++;
			effects.consume(code);
			return sequenceOpen;
		}
		if (sizeOpen < 3) return nok(code);
		effects.exit("codeFencedFenceSequence");
		return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
	}
	/**
	* In opening fence, after the sequence (and optional whitespace), before info.
	*
	* ```markdown
	* > | ~~~js
	*        ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function infoBefore(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("codeFencedFence");
			return self.interrupt ? ok(code) : effects.check(nonLazyContinuation$1, atNonLazyBreak, after)(code);
		}
		effects.enter("codeFencedFenceInfo");
		effects.enter("chunkString", { contentType: "string" });
		return info(code);
	}
	/**
	* In info.
	*
	* ```markdown
	* > | ~~~js
	*        ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function info(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return infoBefore(code);
		}
		if (markdownSpace(code)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return factorySpace(effects, metaBefore, "whitespace")(code);
		}
		if (code === 96 && code === marker) return nok(code);
		effects.consume(code);
		return info;
	}
	/**
	* In opening fence, after info and whitespace, before meta.
	*
	* ```markdown
	* > | ~~~js eval
	*           ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function metaBefore(code) {
		if (code === null || markdownLineEnding(code)) return infoBefore(code);
		effects.enter("codeFencedFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code);
	}
	/**
	* In meta.
	*
	* ```markdown
	* > | ~~~js eval
	*           ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function meta(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceMeta");
			return infoBefore(code);
		}
		if (code === 96 && code === marker) return nok(code);
		effects.consume(code);
		return meta;
	}
	/**
	* At eol/eof in code, before a non-lazy closing fence or content.
	*
	* ```markdown
	* > | ~~~js
	*          ^
	* > | alert(1)
	*             ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function atNonLazyBreak(code) {
		return effects.attempt(closeStart, after, contentBefore)(code);
	}
	/**
	* Before code content, not a closing fence, at eol.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*             ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function contentBefore(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return contentStart;
	}
	/**
	* Before code content, not a closing fence.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*     ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function contentStart(code) {
		return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
	}
	/**
	* Before code content, after optional prefix.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*     ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function beforeContentChunk(code) {
		if (code === null || markdownLineEnding(code)) return effects.check(nonLazyContinuation$1, atNonLazyBreak, after)(code);
		effects.enter("codeFlowValue");
		return contentChunk(code);
	}
	/**
	* In code content.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*     ^^^^^^^^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function contentChunk(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("codeFlowValue");
			return beforeContentChunk(code);
		}
		effects.consume(code);
		return contentChunk;
	}
	/**
	* After code.
	*
	* ```markdown
	*   | ~~~js
	*   | alert(1)
	* > | ~~~
	*        ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		effects.exit("codeFenced");
		return ok(code);
	}
	/**
	* @this {TokenizeContext}
	* @type {Tokenizer}
	*/
	function tokenizeCloseStart(effects, ok, nok) {
		let size = 0;
		return startBefore;
		/**
		*
		*
		* @type {State}
		*/
		function startBefore(code) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return start;
		}
		/**
		* Before closing fence, at optional whitespace.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*     ^
		* ```
		*
		* @type {State}
		*/
		function start(code) {
			effects.enter("codeFencedFence");
			return markdownSpace(code) ? factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : beforeSequenceClose(code);
		}
		/**
		* In closing fence, after optional whitespace, at sequence.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*     ^
		* ```
		*
		* @type {State}
		*/
		function beforeSequenceClose(code) {
			if (code === marker) {
				effects.enter("codeFencedFenceSequence");
				return sequenceClose(code);
			}
			return nok(code);
		}
		/**
		* In closing fence sequence.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*     ^
		* ```
		*
		* @type {State}
		*/
		function sequenceClose(code) {
			if (code === marker) {
				size++;
				effects.consume(code);
				return sequenceClose;
			}
			if (size >= sizeOpen) {
				effects.exit("codeFencedFenceSequence");
				return markdownSpace(code) ? factorySpace(effects, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
			}
			return nok(code);
		}
		/**
		* After closing fence sequence, after optional whitespace.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*        ^
		* ```
		*
		* @type {State}
		*/
		function sequenceCloseAfter(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("codeFencedFence");
				return ok(code);
			}
			return nok(code);
		}
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeNonLazyContinuation$1(effects, ok, nok) {
	const self = this;
	return start;
	/**
	*
	*
	* @type {State}
	*/
	function start(code) {
		if (code === null) return nok(code);
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineStart;
	}
	/**
	*
	*
	* @type {State}
	*/
	function lineStart(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
	}
}
var nonLazyContinuation$1, codeFenced;
var init_code_fenced = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	nonLazyContinuation$1 = {
		tokenize: tokenizeNonLazyContinuation$1,
		partial: true
	};
	codeFenced = {
		name: "codeFenced",
		tokenize: tokenizeCodeFenced,
		concrete: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/code-indented.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCodeIndented(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of code (indented).
	*
	* > **Parsing note**: it is not needed to check if this first line is a
	* > filled line (that it has a non-whitespace character), because blank lines
	* > are parsed already, so we never run into that.
	*
	* ```markdown
	* > |     aaa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("codeIndented");
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
	}
	/**
	* At start, after 1 or 4 spaces.
	*
	* ```markdown
	* > |     aaa
	*         ^
	* ```
	*
	* @type {State}
	*/
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
	}
	/**
	* At a break.
	*
	* ```markdown
	* > |     aaa
	*         ^  ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === null) return after(code);
		if (markdownLineEnding(code)) return effects.attempt(furtherStart, atBreak, after)(code);
		effects.enter("codeFlowValue");
		return inside(code);
	}
	/**
	* In code content.
	*
	* ```markdown
	* > |     aaa
	*         ^^^^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("codeFlowValue");
			return atBreak(code);
		}
		effects.consume(code);
		return inside;
	}
	/** @type {State} */
	function after(code) {
		effects.exit("codeIndented");
		return ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeFurtherStart(effects, ok, nok) {
	const self = this;
	return furtherStart;
	/**
	* At eol, trying to parse another indent.
	*
	* ```markdown
	* > |     aaa
	*            ^
	*   |     bbb
	* ```
	*
	* @type {State}
	*/
	function furtherStart(code) {
		if (self.parser.lazy[self.now().line]) return nok(code);
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return furtherStart;
		}
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
	}
	/**
	* At start, after 1 or 4 spaces.
	*
	* ```markdown
	* > |     aaa
	*         ^
	* ```
	*
	* @type {State}
	*/
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? furtherStart(code) : nok(code);
	}
}
var codeIndented, furtherStart;
var init_code_indented = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	codeIndented = {
		name: "codeIndented",
		tokenize: tokenizeCodeIndented
	};
	furtherStart = {
		tokenize: tokenizeFurtherStart,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/code-text.js
/** @type {Resolver} */
function resolveCodeText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	/** @type {number} */
	let index;
	/** @type {number | undefined} */
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index = headEnterIndex;
		while (++index < tailExitIndex) if (events[index][1].type === "codeTextData") {
			events[headEnterIndex][1].type = "codeTextPadding";
			events[tailExitIndex][1].type = "codeTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index = headEnterIndex - 1;
	tailExitIndex++;
	while (++index <= tailExitIndex) if (enter === void 0) {
		if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
	} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
		events[enter][1].type = "codeTextData";
		if (index !== enter + 2) {
			events[enter][1].end = events[index - 1][1].end;
			events.splice(enter + 2, index - enter - 2);
			tailExitIndex -= index - enter - 2;
			index = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Previous}
*/
function previous$2(code) {
	return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCodeText(effects, ok, nok) {
	let sizeOpen = 0;
	/** @type {number} */
	let size;
	/** @type {Token} */
	let token;
	return start;
	/**
	* Start of code (text).
	*
	* ```markdown
	* > | `a`
	*     ^
	* > | \`a`
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("codeText");
		effects.enter("codeTextSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening sequence.
	*
	* ```markdown
	* > | `a`
	*     ^
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === 96) {
			effects.consume(code);
			sizeOpen++;
			return sequenceOpen;
		}
		effects.exit("codeTextSequence");
		return between(code);
	}
	/**
	* Between something and something else.
	*
	* ```markdown
	* > | `a`
	*      ^^
	* ```
	*
	* @type {State}
	*/
	function between(code) {
		if (code === null) return nok(code);
		if (code === 32) {
			effects.enter("space");
			effects.consume(code);
			effects.exit("space");
			return between;
		}
		if (code === 96) {
			token = effects.enter("codeTextSequence");
			size = 0;
			return sequenceClose(code);
		}
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return between;
		}
		effects.enter("codeTextData");
		return data(code);
	}
	/**
	* In data.
	*
	* ```markdown
	* > | `a`
	*      ^
	* ```
	*
	* @type {State}
	*/
	function data(code) {
		if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
			effects.exit("codeTextData");
			return between(code);
		}
		effects.consume(code);
		return data;
	}
	/**
	* In closing sequence.
	*
	* ```markdown
	* > | `a`
	*       ^
	* ```
	*
	* @type {State}
	*/
	function sequenceClose(code) {
		if (code === 96) {
			effects.consume(code);
			size++;
			return sequenceClose;
		}
		if (size === sizeOpen) {
			effects.exit("codeTextSequence");
			effects.exit("codeText");
			return ok(code);
		}
		token.type = "codeTextData";
		return data(code);
	}
}
var codeText;
var init_code_text = __esmMin((() => {
	init_micromark_util_character();
	codeText = {
		name: "codeText",
		tokenize: tokenizeCodeText,
		resolve: resolveCodeText,
		previous: previous$2
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-subtokenize@1.1.0/node_modules/micromark-util-subtokenize/index.js
/**
* Tokenize subcontent.
*
* @param {Array<Event>} events
*   List of events.
* @returns {boolean}
*   Whether subtokens were found.
*/
function subtokenize(events) {
	/** @type {Record<string, number>} */
	const jumps = {};
	let index = -1;
	/** @type {Event} */
	let event;
	/** @type {number | undefined} */
	let lineIndex;
	/** @type {number} */
	let otherIndex;
	/** @type {Event} */
	let otherEvent;
	/** @type {Array<Event>} */
	let parameters;
	/** @type {Array<Event>} */
	let subevents;
	/** @type {boolean | undefined} */
	let more;
	while (++index < events.length) {
		while (index in jumps) index = jumps[index];
		event = events[index];
		if (index && event[1].type === "chunkFlow" && events[index - 1][1].type === "listItemPrefix") {
			subevents = event[1]._tokenizer.events;
			otherIndex = 0;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
				if (subevents[otherIndex][1].type === "content") break;
				if (subevents[otherIndex][1].type === "chunkText") {
					subevents[otherIndex][1]._isInFirstContentOfListItem = true;
					otherIndex++;
				}
			}
		}
		if (event[0] === "enter") {
			if (event[1].contentType) {
				Object.assign(jumps, subcontent(events, index));
				index = jumps[index];
				more = true;
			}
		} else if (event[1]._container) {
			otherIndex = index;
			lineIndex = void 0;
			while (otherIndex--) {
				otherEvent = events[otherIndex];
				if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
					if (otherEvent[0] === "enter") {
						if (lineIndex) events[lineIndex][1].type = "lineEndingBlank";
						otherEvent[1].type = "lineEnding";
						lineIndex = otherIndex;
					}
				} else break;
			}
			if (lineIndex) {
				event[1].end = Object.assign({}, events[lineIndex][1].start);
				parameters = events.slice(lineIndex, index);
				parameters.unshift(event);
				splice(events, lineIndex, index - lineIndex + 1, parameters);
			}
		}
	}
	return !more;
}
/**
* Tokenize embedded tokens.
*
* @param {Array<Event>} events
* @param {number} eventIndex
* @returns {Record<string, number>}
*/
function subcontent(events, eventIndex) {
	const token = events[eventIndex][1];
	const context = events[eventIndex][2];
	let startPosition = eventIndex - 1;
	/** @type {Array<number>} */
	const startPositions = [];
	const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
	const childEvents = tokenizer.events;
	/** @type {Array<[number, number]>} */
	const jumps = [];
	/** @type {Record<string, number>} */
	const gaps = {};
	/** @type {Array<Chunk>} */
	let stream;
	/** @type {Token | undefined} */
	let previous;
	let index = -1;
	/** @type {Token | undefined} */
	let current = token;
	let adjust = 0;
	let start = 0;
	const breaks = [start];
	while (current) {
		while (events[++startPosition][1] !== current);
		startPositions.push(startPosition);
		if (!current._tokenizer) {
			stream = context.sliceStream(current);
			if (!current.next) stream.push(null);
			if (previous) tokenizer.defineSkip(current.start);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
			tokenizer.write(stream);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
		}
		previous = current;
		current = current.next;
	}
	current = token;
	while (++index < childEvents.length) if (childEvents[index][0] === "exit" && childEvents[index - 1][0] === "enter" && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
		start = index + 1;
		breaks.push(start);
		current._tokenizer = void 0;
		current.previous = void 0;
		current = current.next;
	}
	tokenizer.events = [];
	if (current) {
		current._tokenizer = void 0;
		current.previous = void 0;
	} else breaks.pop();
	index = breaks.length;
	while (index--) {
		const slice = childEvents.slice(breaks[index], breaks[index + 1]);
		const start = startPositions.pop();
		jumps.unshift([start, start + slice.length - 1]);
		splice(events, start, 2, slice);
	}
	index = -1;
	while (++index < jumps.length) {
		gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
		adjust += jumps[index][1] - jumps[index][0] - 1;
	}
	return gaps;
}
var init_micromark_util_subtokenize = __esmMin((() => {
	init_micromark_util_chunked();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/content.js
/**
* Content is transparent: it’s parsed right now. That way, definitions are also
* parsed right now: before text in paragraphs (specifically, media) are parsed.
*
* @type {Resolver}
*/
function resolveContent(events) {
	subtokenize(events);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeContent(effects, ok) {
	/** @type {Token | undefined} */
	let previous;
	return chunkStart;
	/**
	* Before a content chunk.
	*
	* ```markdown
	* > | abc
	*     ^
	* ```
	*
	* @type {State}
	*/
	function chunkStart(code) {
		effects.enter("content");
		previous = effects.enter("chunkContent", { contentType: "content" });
		return chunkInside(code);
	}
	/**
	* In a content chunk.
	*
	* ```markdown
	* > | abc
	*     ^^^
	* ```
	*
	* @type {State}
	*/
	function chunkInside(code) {
		if (code === null) return contentEnd(code);
		if (markdownLineEnding(code)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
		effects.consume(code);
		return chunkInside;
	}
	/**
	*
	*
	* @type {State}
	*/
	function contentEnd(code) {
		effects.exit("chunkContent");
		effects.exit("content");
		return ok(code);
	}
	/**
	*
	*
	* @type {State}
	*/
	function contentContinue(code) {
		effects.consume(code);
		effects.exit("chunkContent");
		previous.next = effects.enter("chunkContent", {
			contentType: "content",
			previous
		});
		previous = previous.next;
		return chunkInside;
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeContinuation(effects, ok, nok) {
	const self = this;
	return startLookahead;
	/**
	*
	*
	* @type {State}
	*/
	function startLookahead(code) {
		effects.exit("chunkContent");
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return factorySpace(effects, prefixed, "linePrefix");
	}
	/**
	*
	*
	* @type {State}
	*/
	function prefixed(code) {
		if (code === null || markdownLineEnding(code)) return nok(code);
		const tail = self.events[self.events.length - 1];
		if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok(code);
		return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
	}
}
var content, continuationConstruct;
var init_content = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_subtokenize();
	content = {
		tokenize: tokenizeContent,
		resolve: resolveContent
	};
	continuationConstruct = {
		tokenize: tokenizeContinuation,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-factory-destination@1.1.0/node_modules/micromark-factory-destination/index.js
/**
* Parse destinations.
*
* ###### Examples
*
* ```markdown
* <a>
* <a\>b>
* <a b>
* <a)>
* a
* a\)b
* a(b)c
* a(b)
* ```
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {State} nok
*   State switched to when unsuccessful.
* @param {TokenType} type
*   Type for whole (`<a>` or `b`).
* @param {TokenType} literalType
*   Type when enclosed (`<a>`).
* @param {TokenType} literalMarkerType
*   Type for enclosing (`<` and `>`).
* @param {TokenType} rawType
*   Type when not enclosed (`b`).
* @param {TokenType} stringType
*   Type for the value (`a` or `b`).
* @param {number | undefined} [max=Infinity]
*   Depth of nested parens (inclusive).
* @returns {State}
*   Start state.
*/ function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
	const limit = max || Number.POSITIVE_INFINITY;
	let balance = 0;
	return start;
	/**
	* Start of destination.
	*
	* ```markdown
	* > | <aa>
	*     ^
	* > | aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (code === 60) {
			effects.enter(type);
			effects.enter(literalType);
			effects.enter(literalMarkerType);
			effects.consume(code);
			effects.exit(literalMarkerType);
			return enclosedBefore;
		}
		if (code === null || code === 32 || code === 41 || asciiControl(code)) return nok(code);
		effects.enter(type);
		effects.enter(rawType);
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return raw(code);
	}
	/**
	* After `<`, at an enclosed destination.
	*
	* ```markdown
	* > | <aa>
	*      ^
	* ```
	*
	* @type {State}
	*/
	function enclosedBefore(code) {
		if (code === 62) {
			effects.enter(literalMarkerType);
			effects.consume(code);
			effects.exit(literalMarkerType);
			effects.exit(literalType);
			effects.exit(type);
			return ok;
		}
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return enclosed(code);
	}
	/**
	* In enclosed destination.
	*
	* ```markdown
	* > | <aa>
	*      ^
	* ```
	*
	* @type {State}
	*/
	function enclosed(code) {
		if (code === 62) {
			effects.exit("chunkString");
			effects.exit(stringType);
			return enclosedBefore(code);
		}
		if (code === null || code === 60 || markdownLineEnding(code)) return nok(code);
		effects.consume(code);
		return code === 92 ? enclosedEscape : enclosed;
	}
	/**
	* After `\`, at a special character.
	*
	* ```markdown
	* > | <a\*a>
	*        ^
	* ```
	*
	* @type {State}
	*/
	function enclosedEscape(code) {
		if (code === 60 || code === 62 || code === 92) {
			effects.consume(code);
			return enclosed;
		}
		return enclosed(code);
	}
	/**
	* In raw destination.
	*
	* ```markdown
	* > | aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function raw(code) {
		if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
			effects.exit("chunkString");
			effects.exit(stringType);
			effects.exit(rawType);
			effects.exit(type);
			return ok(code);
		}
		if (balance < limit && code === 40) {
			effects.consume(code);
			balance++;
			return raw;
		}
		if (code === 41) {
			effects.consume(code);
			balance--;
			return raw;
		}
		if (code === null || code === 32 || code === 40 || asciiControl(code)) return nok(code);
		effects.consume(code);
		return code === 92 ? rawEscape : raw;
	}
	/**
	* After `\`, at special character.
	*
	* ```markdown
	* > | a\*a
	*       ^
	* ```
	*
	* @type {State}
	*/
	function rawEscape(code) {
		if (code === 40 || code === 41 || code === 92) {
			effects.consume(code);
			return raw;
		}
		return raw(code);
	}
}
var init_micromark_factory_destination = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-factory-label@1.1.0/node_modules/micromark-factory-label/index.js
/**
* Parse labels.
*
* > 👉 **Note**: labels in markdown are capped at 999 characters in the string.
*
* ###### Examples
*
* ```markdown
* [a]
* [a
* b]
* [a\]b]
* ```
*
* @this {TokenizeContext}
*   Tokenize context.
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {State} nok
*   State switched to when unsuccessful.
* @param {TokenType} type
*   Type of the whole label (`[a]`).
* @param {TokenType} markerType
*   Type for the markers (`[` and `]`).
* @param {TokenType} stringType
*   Type for the identifier (`a`).
* @returns {State}
*   Start state.
*/ function factoryLabel(effects, ok, nok, type, markerType, stringType) {
	const self = this;
	let size = 0;
	/** @type {boolean} */
	let seen;
	return start;
	/**
	* Start of label.
	*
	* ```markdown
	* > | [a]
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter(type);
		effects.enter(markerType);
		effects.consume(code);
		effects.exit(markerType);
		effects.enter(stringType);
		return atBreak;
	}
	/**
	* In label, at something, before something else.
	*
	* ```markdown
	* > | [a]
	*      ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (size > 999 || code === null || code === 91 || code === 93 && !seen || code === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) return nok(code);
		if (code === 93) {
			effects.exit(stringType);
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			effects.exit(type);
			return ok;
		}
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return atBreak;
		}
		effects.enter("chunkString", { contentType: "string" });
		return labelInside(code);
	}
	/**
	* In label, in text.
	*
	* ```markdown
	* > | [a]
	*      ^
	* ```
	*
	* @type {State}
	*/
	function labelInside(code) {
		if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
			effects.exit("chunkString");
			return atBreak(code);
		}
		effects.consume(code);
		if (!seen) seen = !markdownSpace(code);
		return code === 92 ? labelEscape : labelInside;
	}
	/**
	* After `\`, at a special character.
	*
	* ```markdown
	* > | [a\*a]
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelEscape(code) {
		if (code === 91 || code === 92 || code === 93) {
			effects.consume(code);
			size++;
			return labelInside;
		}
		return labelInside(code);
	}
}
var init_micromark_factory_label = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-factory-title@1.1.0/node_modules/micromark-factory-title/index.js
/**
* Parse titles.
*
* ###### Examples
*
* ```markdown
* "a"
* 'b'
* (c)
* "a
* b"
* 'a
*     b'
* (a\)b)
* ```
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {State} nok
*   State switched to when unsuccessful.
* @param {TokenType} type
*   Type of the whole title (`"a"`, `'b'`, `(c)`).
* @param {TokenType} markerType
*   Type for the markers (`"`, `'`, `(`, and `)`).
* @param {TokenType} stringType
*   Type for the value (`a`).
* @returns {State}
*   Start state.
*/ function factoryTitle(effects, ok, nok, type, markerType, stringType) {
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Start of title.
	*
	* ```markdown
	* > | "a"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (code === 34 || code === 39 || code === 40) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			marker = code === 40 ? 41 : code;
			return begin;
		}
		return nok(code);
	}
	/**
	* After opening marker.
	*
	* This is also used at the closing marker.
	*
	* ```markdown
	* > | "a"
	*      ^
	* ```
	*
	* @type {State}
	*/
	function begin(code) {
		if (code === marker) {
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			effects.exit(type);
			return ok;
		}
		effects.enter(stringType);
		return atBreak(code);
	}
	/**
	* At something, before something else.
	*
	* ```markdown
	* > | "a"
	*      ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === marker) {
			effects.exit(stringType);
			return begin(marker);
		}
		if (code === null) return nok(code);
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return factorySpace(effects, atBreak, "linePrefix");
		}
		effects.enter("chunkString", { contentType: "string" });
		return inside(code);
	}
	/**
	*
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === marker || code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			return atBreak(code);
		}
		effects.consume(code);
		return code === 92 ? escape : inside;
	}
	/**
	* After `\`, at a special character.
	*
	* ```markdown
	* > | "a\*b"
	*      ^
	* ```
	*
	* @type {State}
	*/
	function escape(code) {
		if (code === marker || code === 92) {
			effects.consume(code);
			return inside;
		}
		return inside(code);
	}
}
var init_micromark_factory_title = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-factory-whitespace@1.1.0/node_modules/micromark-factory-whitespace/index.js
/**
* Parse spaces and tabs.
*
* There is no `nok` parameter:
*
* *   line endings or spaces in markdown are often optional, in which case this
*     factory can be used and `ok` will be switched to whether spaces were found
*     or not
* *   one line ending or space can be detected with
*     `markdownLineEndingOrSpace(code)` right before using `factoryWhitespace`
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @returns
*   Start state.
*/
function factoryWhitespace(effects, ok) {
	/** @type {boolean} */
	let seen;
	return start;
	/** @type {State} */
	function start(code) {
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			seen = true;
			return start;
		}
		if (markdownSpace(code)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
		return ok(code);
	}
}
var init_micromark_factory_whitespace = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-normalize-identifier@1.1.0/node_modules/micromark-util-normalize-identifier/index.js
/**
* Normalize an identifier (as found in references, definitions).
*
* Collapses markdown whitespace, trim, and then lower- and uppercase.
*
* Some characters are considered “uppercase”, such as U+03F4 (`ϴ`), but if their
* lowercase counterpart (U+03B8 (`θ`)) is uppercased will result in a different
* uppercase character (U+0398 (`Θ`)).
* So, to get a canonical form, we perform both lower- and uppercase.
*
* Using uppercase last makes sure keys will never interact with default
* prototypal values (such as `constructor`): nothing in the prototype of
* `Object` is uppercase.
*
* @param {string} value
*   Identifier to normalize.
* @returns {string}
*   Normalized identifier.
*/
function normalizeIdentifier(value) {
	return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
var init_micromark_util_normalize_identifier = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/definition.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeDefinition(effects, ok, nok) {
	const self = this;
	/** @type {string} */
	let identifier;
	return start;
	/**
	* At start of a definition.
	*
	* ```markdown
	* > | [a]: b "c"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("definition");
		return before(code);
	}
	/**
	* After optional whitespace, at `[`.
	*
	* ```markdown
	* > | [a]: b "c"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
	}
	/**
	* After label.
	*
	* ```markdown
	* > | [a]: b "c"
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelAfter(code) {
		identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
		if (code === 58) {
			effects.enter("definitionMarker");
			effects.consume(code);
			effects.exit("definitionMarker");
			return markerAfter;
		}
		return nok(code);
	}
	/**
	* After marker.
	*
	* ```markdown
	* > | [a]: b "c"
	*         ^
	* ```
	*
	* @type {State}
	*/
	function markerAfter(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
	}
	/**
	* Before destination.
	*
	* ```markdown
	* > | [a]: b "c"
	*          ^
	* ```
	*
	* @type {State}
	*/
	function destinationBefore(code) {
		return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code);
	}
	/**
	* After destination.
	*
	* ```markdown
	* > | [a]: b "c"
	*           ^
	* ```
	*
	* @type {State}
	*/
	function destinationAfter(code) {
		return effects.attempt(titleBefore, after, after)(code);
	}
	/**
	* After definition.
	*
	* ```markdown
	* > | [a]: b
	*           ^
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
	}
	/**
	* After definition, after optional whitespace.
	*
	* ```markdown
	* > | [a]: b
	*           ^
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function afterWhitespace(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("definition");
			self.parser.defined.push(identifier);
			return ok(code);
		}
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeTitleBefore(effects, ok, nok) {
	return titleBefore;
	/**
	* After destination, at whitespace.
	*
	* ```markdown
	* > | [a]: b
	*           ^
	* > | [a]: b "c"
	*           ^
	* ```
	*
	* @type {State}
	*/
	function titleBefore(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
	}
	/**
	* At title.
	*
	* ```markdown
	*   | [a]: b
	* > | "c"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function beforeMarker(code) {
		return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
	}
	/**
	* After title.
	*
	* ```markdown
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function titleAfter(code) {
		return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
	}
	/**
	* After title, after optional whitespace.
	*
	* ```markdown
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function titleAfterOptionalWhitespace(code) {
		return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
	}
}
var definition$1, titleBefore;
var init_definition$1 = __esmMin((() => {
	init_micromark_factory_destination();
	init_micromark_factory_label();
	init_micromark_factory_space();
	init_micromark_factory_title();
	init_micromark_factory_whitespace();
	init_micromark_util_character();
	init_micromark_util_normalize_identifier();
	definition$1 = {
		name: "definition",
		tokenize: tokenizeDefinition
	};
	titleBefore = {
		tokenize: tokenizeTitleBefore,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHardBreakEscape(effects, ok, nok) {
	return start;
	/**
	* Start of a hard break (escape).
	*
	* ```markdown
	* > | a\
	*      ^
	*   | b
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("hardBreakEscape");
		effects.consume(code);
		return after;
	}
	/**
	* After `\`, at eol.
	*
	* ```markdown
	* > | a\
	*       ^
	*   | b
	* ```
	*
	*  @type {State}
	*/
	function after(code) {
		if (markdownLineEnding(code)) {
			effects.exit("hardBreakEscape");
			return ok(code);
		}
		return nok(code);
	}
}
var hardBreakEscape;
var init_hard_break_escape = __esmMin((() => {
	init_micromark_util_character();
	hardBreakEscape = {
		name: "hardBreakEscape",
		tokenize: tokenizeHardBreakEscape
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/heading-atx.js
/** @type {Resolver} */
function resolveHeadingAtx(events, context) {
	let contentEnd = events.length - 2;
	let contentStart = 3;
	/** @type {Token} */
	let content;
	/** @type {Token} */
	let text;
	if (events[contentStart][1].type === "whitespace") contentStart += 2;
	if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
	if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	if (contentEnd > contentStart) {
		content = {
			type: "atxHeadingText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end
		};
		text = {
			type: "chunkText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end,
			contentType: "text"
		};
		splice(events, contentStart, contentEnd - contentStart + 1, [
			[
				"enter",
				content,
				context
			],
			[
				"enter",
				text,
				context
			],
			[
				"exit",
				text,
				context
			],
			[
				"exit",
				content,
				context
			]
		]);
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHeadingAtx(effects, ok, nok) {
	let size = 0;
	return start;
	/**
	* Start of a heading (atx).
	*
	* ```markdown
	* > | ## aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("atxHeading");
		return before(code);
	}
	/**
	* After optional whitespace, at `#`.
	*
	* ```markdown
	* > | ## aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		effects.enter("atxHeadingSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening sequence.
	*
	* ```markdown
	* > | ## aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === 35 && size++ < 6) {
			effects.consume(code);
			return sequenceOpen;
		}
		if (code === null || markdownLineEndingOrSpace(code)) {
			effects.exit("atxHeadingSequence");
			return atBreak(code);
		}
		return nok(code);
	}
	/**
	* After something, before something else.
	*
	* ```markdown
	* > | ## aa
	*       ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === 35) {
			effects.enter("atxHeadingSequence");
			return sequenceFurther(code);
		}
		if (code === null || markdownLineEnding(code)) {
			effects.exit("atxHeading");
			return ok(code);
		}
		if (markdownSpace(code)) return factorySpace(effects, atBreak, "whitespace")(code);
		effects.enter("atxHeadingText");
		return data(code);
	}
	/**
	* In further sequence (after whitespace).
	*
	* Could be normal “visible” hashes in the heading or a final sequence.
	*
	* ```markdown
	* > | ## aa ##
	*           ^
	* ```
	*
	* @type {State}
	*/
	function sequenceFurther(code) {
		if (code === 35) {
			effects.consume(code);
			return sequenceFurther;
		}
		effects.exit("atxHeadingSequence");
		return atBreak(code);
	}
	/**
	* In text.
	*
	* ```markdown
	* > | ## aa
	*        ^
	* ```
	*
	* @type {State}
	*/
	function data(code) {
		if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
			effects.exit("atxHeadingText");
			return atBreak(code);
		}
		effects.consume(code);
		return data;
	}
}
var headingAtx;
var init_heading_atx = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_chunked();
	headingAtx = {
		name: "headingAtx",
		tokenize: tokenizeHeadingAtx,
		resolve: resolveHeadingAtx
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-html-tag-name@1.2.0/node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames, htmlRawNames;
var init_micromark_util_html_tag_name = __esmMin((() => {
	htmlBlockNames = [
		"address",
		"article",
		"aside",
		"base",
		"basefont",
		"blockquote",
		"body",
		"caption",
		"center",
		"col",
		"colgroup",
		"dd",
		"details",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"iframe",
		"legend",
		"li",
		"link",
		"main",
		"menu",
		"menuitem",
		"nav",
		"noframes",
		"ol",
		"optgroup",
		"option",
		"p",
		"param",
		"search",
		"section",
		"summary",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"title",
		"tr",
		"track",
		"ul"
	];
	htmlRawNames = [
		"pre",
		"script",
		"style",
		"textarea"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/html-flow.js
/** @type {Resolver} */
function resolveToHtmlFlow(events) {
	let index = events.length;
	while (index--) if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") break;
	if (index > 1 && events[index - 2][1].type === "linePrefix") {
		events[index][1].start = events[index - 2][1].start;
		events[index + 1][1].start = events[index - 2][1].start;
		events.splice(index - 2, 2);
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHtmlFlow(effects, ok, nok) {
	const self = this;
	/** @type {number} */
	let marker;
	/** @type {boolean} */
	let closingTag;
	/** @type {string} */
	let buffer;
	/** @type {number} */
	let index;
	/** @type {Code} */
	let markerB;
	return start;
	/**
	* Start of HTML (flow).
	*
	* ```markdown
	* > | <x />
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		return before(code);
	}
	/**
	* At `<`, after optional whitespace.
	*
	* ```markdown
	* > | <x />
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		effects.enter("htmlFlow");
		effects.enter("htmlFlowData");
		effects.consume(code);
		return open;
	}
	/**
	* After `<`, at tag name or other stuff.
	*
	* ```markdown
	* > | <x />
	*      ^
	* > | <!doctype>
	*      ^
	* > | <!--xxx-->
	*      ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 33) {
			effects.consume(code);
			return declarationOpen;
		}
		if (code === 47) {
			effects.consume(code);
			closingTag = true;
			return tagCloseStart;
		}
		if (code === 63) {
			effects.consume(code);
			marker = 3;
			return self.interrupt ? ok : continuationDeclarationInside;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			buffer = String.fromCharCode(code);
			return tagName;
		}
		return nok(code);
	}
	/**
	* After `<!`, at declaration, comment, or CDATA.
	*
	* ```markdown
	* > | <!doctype>
	*       ^
	* > | <!--xxx-->
	*       ^
	* > | <![CDATA[>&<]]>
	*       ^
	* ```
	*
	* @type {State}
	*/
	function declarationOpen(code) {
		if (code === 45) {
			effects.consume(code);
			marker = 2;
			return commentOpenInside;
		}
		if (code === 91) {
			effects.consume(code);
			marker = 5;
			index = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			marker = 4;
			return self.interrupt ? ok : continuationDeclarationInside;
		}
		return nok(code);
	}
	/**
	* After `<!-`, inside a comment, at another `-`.
	*
	* ```markdown
	* > | <!--xxx-->
	*        ^
	* ```
	*
	* @type {State}
	*/
	function commentOpenInside(code) {
		if (code === 45) {
			effects.consume(code);
			return self.interrupt ? ok : continuationDeclarationInside;
		}
		return nok(code);
	}
	/**
	* After `<![`, inside CDATA, expecting `CDATA[`.
	*
	* ```markdown
	* > | <![CDATA[>&<]]>
	*        ^^^^^^
	* ```
	*
	* @type {State}
	*/
	function cdataOpenInside(code) {
		if (code === "CDATA[".charCodeAt(index++)) {
			effects.consume(code);
			if (index === 6) return self.interrupt ? ok : continuation;
			return cdataOpenInside;
		}
		return nok(code);
	}
	/**
	* After `</`, in closing tag, at tag name.
	*
	* ```markdown
	* > | </x>
	*       ^
	* ```
	*
	* @type {State}
	*/
	function tagCloseStart(code) {
		if (asciiAlpha(code)) {
			effects.consume(code);
			buffer = String.fromCharCode(code);
			return tagName;
		}
		return nok(code);
	}
	/**
	* In tag name.
	*
	* ```markdown
	* > | <ab>
	*      ^^
	* > | </ab>
	*       ^^
	* ```
	*
	* @type {State}
	*/
	function tagName(code) {
		if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
			const slash = code === 47;
			const name = buffer.toLowerCase();
			if (!slash && !closingTag && htmlRawNames.includes(name)) {
				marker = 1;
				return self.interrupt ? ok(code) : continuation(code);
			}
			if (htmlBlockNames.includes(buffer.toLowerCase())) {
				marker = 6;
				if (slash) {
					effects.consume(code);
					return basicSelfClosing;
				}
				return self.interrupt ? ok(code) : continuation(code);
			}
			marker = 7;
			return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
		}
		if (code === 45 || asciiAlphanumeric(code)) {
			effects.consume(code);
			buffer += String.fromCharCode(code);
			return tagName;
		}
		return nok(code);
	}
	/**
	* After closing slash of a basic tag name.
	*
	* ```markdown
	* > | <div/>
	*          ^
	* ```
	*
	* @type {State}
	*/
	function basicSelfClosing(code) {
		if (code === 62) {
			effects.consume(code);
			return self.interrupt ? ok : continuation;
		}
		return nok(code);
	}
	/**
	* After closing slash of a complete tag name.
	*
	* ```markdown
	* > | <x/>
	*        ^
	* ```
	*
	* @type {State}
	*/
	function completeClosingTagAfter(code) {
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeClosingTagAfter;
		}
		return completeEnd(code);
	}
	/**
	* At an attribute name.
	*
	* At first, this state is used after a complete tag name, after whitespace,
	* where it expects optional attributes or the end of the tag.
	* It is also reused after attributes, when expecting more optional
	* attributes.
	*
	* ```markdown
	* > | <a />
	*        ^
	* > | <a :b>
	*        ^
	* > | <a _b>
	*        ^
	* > | <a b>
	*        ^
	* > | <a >
	*        ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeNameBefore(code) {
		if (code === 47) {
			effects.consume(code);
			return completeEnd;
		}
		if (code === 58 || code === 95 || asciiAlpha(code)) {
			effects.consume(code);
			return completeAttributeName;
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAttributeNameBefore;
		}
		return completeEnd(code);
	}
	/**
	* In attribute name.
	*
	* ```markdown
	* > | <a :b>
	*         ^
	* > | <a _b>
	*         ^
	* > | <a b>
	*         ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeName(code) {
		if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return completeAttributeName;
		}
		return completeAttributeNameAfter(code);
	}
	/**
	* After attribute name, at an optional initializer, the end of the tag, or
	* whitespace.
	*
	* ```markdown
	* > | <a b>
	*         ^
	* > | <a b=c>
	*         ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeNameAfter(code) {
		if (code === 61) {
			effects.consume(code);
			return completeAttributeValueBefore;
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAttributeNameAfter;
		}
		return completeAttributeNameBefore(code);
	}
	/**
	* Before unquoted, double quoted, or single quoted attribute value, allowing
	* whitespace.
	*
	* ```markdown
	* > | <a b=c>
	*          ^
	* > | <a b="c">
	*          ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueBefore(code) {
		if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
		if (code === 34 || code === 39) {
			effects.consume(code);
			markerB = code;
			return completeAttributeValueQuoted;
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAttributeValueBefore;
		}
		return completeAttributeValueUnquoted(code);
	}
	/**
	* In double or single quoted attribute value.
	*
	* ```markdown
	* > | <a b="c">
	*           ^
	* > | <a b='c'>
	*           ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueQuoted(code) {
		if (code === markerB) {
			effects.consume(code);
			markerB = null;
			return completeAttributeValueQuotedAfter;
		}
		if (code === null || markdownLineEnding(code)) return nok(code);
		effects.consume(code);
		return completeAttributeValueQuoted;
	}
	/**
	* In unquoted attribute value.
	*
	* ```markdown
	* > | <a b=c>
	*          ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueUnquoted(code) {
		if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) return completeAttributeNameAfter(code);
		effects.consume(code);
		return completeAttributeValueUnquoted;
	}
	/**
	* After double or single quoted attribute value, before whitespace or the
	* end of the tag.
	*
	* ```markdown
	* > | <a b="c">
	*            ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueQuotedAfter(code) {
		if (code === 47 || code === 62 || markdownSpace(code)) return completeAttributeNameBefore(code);
		return nok(code);
	}
	/**
	* In certain circumstances of a complete tag where only an `>` is allowed.
	*
	* ```markdown
	* > | <a b="c">
	*             ^
	* ```
	*
	* @type {State}
	*/
	function completeEnd(code) {
		if (code === 62) {
			effects.consume(code);
			return completeAfter;
		}
		return nok(code);
	}
	/**
	* After `>` in a complete tag.
	*
	* ```markdown
	* > | <x>
	*        ^
	* ```
	*
	* @type {State}
	*/
	function completeAfter(code) {
		if (code === null || markdownLineEnding(code)) return continuation(code);
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAfter;
		}
		return nok(code);
	}
	/**
	* In continuation of any HTML kind.
	*
	* ```markdown
	* > | <!--xxx-->
	*          ^
	* ```
	*
	* @type {State}
	*/
	function continuation(code) {
		if (code === 45 && marker === 2) {
			effects.consume(code);
			return continuationCommentInside;
		}
		if (code === 60 && marker === 1) {
			effects.consume(code);
			return continuationRawTagOpen;
		}
		if (code === 62 && marker === 4) {
			effects.consume(code);
			return continuationClose;
		}
		if (code === 63 && marker === 3) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		if (code === 93 && marker === 5) {
			effects.consume(code);
			return continuationCdataInside;
		}
		if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
			effects.exit("htmlFlowData");
			return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
		}
		if (code === null || markdownLineEnding(code)) {
			effects.exit("htmlFlowData");
			return continuationStart(code);
		}
		effects.consume(code);
		return continuation;
	}
	/**
	* In continuation, at eol.
	*
	* ```markdown
	* > | <x>
	*        ^
	*   | asd
	* ```
	*
	* @type {State}
	*/
	function continuationStart(code) {
		return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
	}
	/**
	* In continuation, at eol, before non-lazy content.
	*
	* ```markdown
	* > | <x>
	*        ^
	*   | asd
	* ```
	*
	* @type {State}
	*/
	function continuationStartNonLazy(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return continuationBefore;
	}
	/**
	* In continuation, before non-lazy content.
	*
	* ```markdown
	*   | <x>
	* > | asd
	*     ^
	* ```
	*
	* @type {State}
	*/
	function continuationBefore(code) {
		if (code === null || markdownLineEnding(code)) return continuationStart(code);
		effects.enter("htmlFlowData");
		return continuation(code);
	}
	/**
	* In comment continuation, after one `-`, expecting another.
	*
	* ```markdown
	* > | <!--xxx-->
	*             ^
	* ```
	*
	* @type {State}
	*/
	function continuationCommentInside(code) {
		if (code === 45) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		return continuation(code);
	}
	/**
	* In raw continuation, after `<`, at `/`.
	*
	* ```markdown
	* > | <script>console.log(1)<\/script>
	*                            ^
	* ```
	*
	* @type {State}
	*/
	function continuationRawTagOpen(code) {
		if (code === 47) {
			effects.consume(code);
			buffer = "";
			return continuationRawEndTag;
		}
		return continuation(code);
	}
	/**
	* In raw continuation, after `</`, in a raw tag name.
	*
	* ```markdown
	* > | <script>console.log(1)<\/script>
	*                             ^^^^^^
	* ```
	*
	* @type {State}
	*/
	function continuationRawEndTag(code) {
		if (code === 62) {
			const name = buffer.toLowerCase();
			if (htmlRawNames.includes(name)) {
				effects.consume(code);
				return continuationClose;
			}
			return continuation(code);
		}
		if (asciiAlpha(code) && buffer.length < 8) {
			effects.consume(code);
			buffer += String.fromCharCode(code);
			return continuationRawEndTag;
		}
		return continuation(code);
	}
	/**
	* In cdata continuation, after `]`, expecting `]>`.
	*
	* ```markdown
	* > | <![CDATA[>&<]]>
	*                  ^
	* ```
	*
	* @type {State}
	*/
	function continuationCdataInside(code) {
		if (code === 93) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		return continuation(code);
	}
	/**
	* In declaration or instruction continuation, at `>`.
	*
	* ```markdown
	* > | <!-->
	*         ^
	* > | <?>
	*       ^
	* > | <!q>
	*        ^
	* > | <!--ab-->
	*             ^
	* > | <![CDATA[>&<]]>
	*                   ^
	* ```
	*
	* @type {State}
	*/
	function continuationDeclarationInside(code) {
		if (code === 62) {
			effects.consume(code);
			return continuationClose;
		}
		if (code === 45 && marker === 2) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		return continuation(code);
	}
	/**
	* In closed continuation: everything we get until the eol/eof is part of it.
	*
	* ```markdown
	* > | <!doctype>
	*               ^
	* ```
	*
	* @type {State}
	*/
	function continuationClose(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("htmlFlowData");
			return continuationAfter(code);
		}
		effects.consume(code);
		return continuationClose;
	}
	/**
	* Done.
	*
	* ```markdown
	* > | <!doctype>
	*               ^
	* ```
	*
	* @type {State}
	*/
	function continuationAfter(code) {
		effects.exit("htmlFlow");
		return ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeNonLazyContinuationStart(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* At eol, before continuation.
	*
	* ```markdown
	* > | * ```js
	*            ^
	*   | b
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return after;
		}
		return nok(code);
	}
	/**
	* A continuation.
	*
	* ```markdown
	*   | * ```js
	* > | b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlankLineBefore(effects, ok, nok) {
	return start;
	/**
	* Before eol, expecting blank line.
	*
	* ```markdown
	* > | <div>
	*          ^
	*   |
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return effects.attempt(blankLine, ok, nok);
	}
}
var htmlFlow, blankLineBefore, nonLazyContinuationStart;
var init_html_flow = __esmMin((() => {
	init_micromark_util_character();
	init_micromark_util_html_tag_name();
	init_blank_line();
	htmlFlow = {
		name: "htmlFlow",
		tokenize: tokenizeHtmlFlow,
		resolveTo: resolveToHtmlFlow,
		concrete: true
	};
	blankLineBefore = {
		tokenize: tokenizeBlankLineBefore,
		partial: true
	};
	nonLazyContinuationStart = {
		tokenize: tokenizeNonLazyContinuationStart,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/html-text.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHtmlText(effects, ok, nok) {
	const self = this;
	/** @type {NonNullable<Code> | undefined} */
	let marker;
	/** @type {number} */
	let index;
	/** @type {State} */
	let returnState;
	return start;
	/**
	* Start of HTML (text).
	*
	* ```markdown
	* > | a <b> c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("htmlText");
		effects.enter("htmlTextData");
		effects.consume(code);
		return open;
	}
	/**
	* After `<`, at tag name or other stuff.
	*
	* ```markdown
	* > | a <b> c
	*        ^
	* > | a <!doctype> c
	*        ^
	* > | a <!--b--> c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 33) {
			effects.consume(code);
			return declarationOpen;
		}
		if (code === 47) {
			effects.consume(code);
			return tagCloseStart;
		}
		if (code === 63) {
			effects.consume(code);
			return instruction;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			return tagOpen;
		}
		return nok(code);
	}
	/**
	* After `<!`, at declaration, comment, or CDATA.
	*
	* ```markdown
	* > | a <!doctype> c
	*         ^
	* > | a <!--b--> c
	*         ^
	* > | a <![CDATA[>&<]]> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function declarationOpen(code) {
		if (code === 45) {
			effects.consume(code);
			return commentOpenInside;
		}
		if (code === 91) {
			effects.consume(code);
			index = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			return declaration;
		}
		return nok(code);
	}
	/**
	* In a comment, after `<!-`, at another `-`.
	*
	* ```markdown
	* > | a <!--b--> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function commentOpenInside(code) {
		if (code === 45) {
			effects.consume(code);
			return commentEnd;
		}
		return nok(code);
	}
	/**
	* In comment.
	*
	* ```markdown
	* > | a <!--b--> c
	*           ^
	* ```
	*
	* @type {State}
	*/
	function comment(code) {
		if (code === null) return nok(code);
		if (code === 45) {
			effects.consume(code);
			return commentClose;
		}
		if (markdownLineEnding(code)) {
			returnState = comment;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return comment;
	}
	/**
	* In comment, after `-`.
	*
	* ```markdown
	* > | a <!--b--> c
	*             ^
	* ```
	*
	* @type {State}
	*/
	function commentClose(code) {
		if (code === 45) {
			effects.consume(code);
			return commentEnd;
		}
		return comment(code);
	}
	/**
	* In comment, after `--`.
	*
	* ```markdown
	* > | a <!--b--> c
	*              ^
	* ```
	*
	* @type {State}
	*/
	function commentEnd(code) {
		return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
	}
	/**
	* After `<![`, in CDATA, expecting `CDATA[`.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*          ^^^^^^
	* ```
	*
	* @type {State}
	*/
	function cdataOpenInside(code) {
		if (code === "CDATA[".charCodeAt(index++)) {
			effects.consume(code);
			return index === 6 ? cdata : cdataOpenInside;
		}
		return nok(code);
	}
	/**
	* In CDATA.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*                ^^^
	* ```
	*
	* @type {State}
	*/
	function cdata(code) {
		if (code === null) return nok(code);
		if (code === 93) {
			effects.consume(code);
			return cdataClose;
		}
		if (markdownLineEnding(code)) {
			returnState = cdata;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return cdata;
	}
	/**
	* In CDATA, after `]`, at another `]`.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*                    ^
	* ```
	*
	* @type {State}
	*/
	function cdataClose(code) {
		if (code === 93) {
			effects.consume(code);
			return cdataEnd;
		}
		return cdata(code);
	}
	/**
	* In CDATA, after `]]`, at `>`.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*                     ^
	* ```
	*
	* @type {State}
	*/
	function cdataEnd(code) {
		if (code === 62) return end(code);
		if (code === 93) {
			effects.consume(code);
			return cdataEnd;
		}
		return cdata(code);
	}
	/**
	* In declaration.
	*
	* ```markdown
	* > | a <!b> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function declaration(code) {
		if (code === null || code === 62) return end(code);
		if (markdownLineEnding(code)) {
			returnState = declaration;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return declaration;
	}
	/**
	* In instruction.
	*
	* ```markdown
	* > | a <?b?> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function instruction(code) {
		if (code === null) return nok(code);
		if (code === 63) {
			effects.consume(code);
			return instructionClose;
		}
		if (markdownLineEnding(code)) {
			returnState = instruction;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return instruction;
	}
	/**
	* In instruction, after `?`, at `>`.
	*
	* ```markdown
	* > | a <?b?> c
	*           ^
	* ```
	*
	* @type {State}
	*/
	function instructionClose(code) {
		return code === 62 ? end(code) : instruction(code);
	}
	/**
	* After `</`, in closing tag, at tag name.
	*
	* ```markdown
	* > | a </b> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function tagCloseStart(code) {
		if (asciiAlpha(code)) {
			effects.consume(code);
			return tagClose;
		}
		return nok(code);
	}
	/**
	* After `</x`, in a tag name.
	*
	* ```markdown
	* > | a </b> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function tagClose(code) {
		if (code === 45 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return tagClose;
		}
		return tagCloseBetween(code);
	}
	/**
	* In closing tag, after tag name.
	*
	* ```markdown
	* > | a </b> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function tagCloseBetween(code) {
		if (markdownLineEnding(code)) {
			returnState = tagCloseBetween;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagCloseBetween;
		}
		return end(code);
	}
	/**
	* After `<x`, in opening tag name.
	*
	* ```markdown
	* > | a <b> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function tagOpen(code) {
		if (code === 45 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return tagOpen;
		}
		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
		return nok(code);
	}
	/**
	* In opening tag, after tag name.
	*
	* ```markdown
	* > | a <b> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenBetween(code) {
		if (code === 47) {
			effects.consume(code);
			return end;
		}
		if (code === 58 || code === 95 || asciiAlpha(code)) {
			effects.consume(code);
			return tagOpenAttributeName;
		}
		if (markdownLineEnding(code)) {
			returnState = tagOpenBetween;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagOpenBetween;
		}
		return end(code);
	}
	/**
	* In attribute name.
	*
	* ```markdown
	* > | a <b c> d
	*          ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeName(code) {
		if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return tagOpenAttributeName;
		}
		return tagOpenAttributeNameAfter(code);
	}
	/**
	* After attribute name, before initializer, the end of the tag, or
	* whitespace.
	*
	* ```markdown
	* > | a <b c> d
	*           ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeNameAfter(code) {
		if (code === 61) {
			effects.consume(code);
			return tagOpenAttributeValueBefore;
		}
		if (markdownLineEnding(code)) {
			returnState = tagOpenAttributeNameAfter;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagOpenAttributeNameAfter;
		}
		return tagOpenBetween(code);
	}
	/**
	* Before unquoted, double quoted, or single quoted attribute value, allowing
	* whitespace.
	*
	* ```markdown
	* > | a <b c=d> e
	*            ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueBefore(code) {
		if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
		if (code === 34 || code === 39) {
			effects.consume(code);
			marker = code;
			return tagOpenAttributeValueQuoted;
		}
		if (markdownLineEnding(code)) {
			returnState = tagOpenAttributeValueBefore;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagOpenAttributeValueBefore;
		}
		effects.consume(code);
		return tagOpenAttributeValueUnquoted;
	}
	/**
	* In double or single quoted attribute value.
	*
	* ```markdown
	* > | a <b c="d"> e
	*             ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueQuoted(code) {
		if (code === marker) {
			effects.consume(code);
			marker = void 0;
			return tagOpenAttributeValueQuotedAfter;
		}
		if (code === null) return nok(code);
		if (markdownLineEnding(code)) {
			returnState = tagOpenAttributeValueQuoted;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return tagOpenAttributeValueQuoted;
	}
	/**
	* In unquoted attribute value.
	*
	* ```markdown
	* > | a <b c=d> e
	*            ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueUnquoted(code) {
		if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) return nok(code);
		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
		effects.consume(code);
		return tagOpenAttributeValueUnquoted;
	}
	/**
	* After double or single quoted attribute value, before whitespace or the end
	* of the tag.
	*
	* ```markdown
	* > | a <b c="d"> e
	*               ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueQuotedAfter(code) {
		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
		return nok(code);
	}
	/**
	* In certain circumstances of a tag where only an `>` is allowed.
	*
	* ```markdown
	* > | a <b c="d"> e
	*               ^
	* ```
	*
	* @type {State}
	*/
	function end(code) {
		if (code === 62) {
			effects.consume(code);
			effects.exit("htmlTextData");
			effects.exit("htmlText");
			return ok;
		}
		return nok(code);
	}
	/**
	* At eol.
	*
	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
	* > empty tokens.
	*
	* ```markdown
	* > | a <!--a
	*            ^
	*   | b-->
	* ```
	*
	* @type {State}
	*/
	function lineEndingBefore(code) {
		effects.exit("htmlTextData");
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineEndingAfter;
	}
	/**
	* After eol, at optional whitespace.
	*
	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
	* > empty tokens.
	*
	* ```markdown
	*   | a <!--a
	* > | b-->
	*     ^
	* ```
	*
	* @type {State}
	*/
	function lineEndingAfter(code) {
		return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : lineEndingAfterPrefix(code);
	}
	/**
	* After eol, after optional whitespace.
	*
	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
	* > empty tokens.
	*
	* ```markdown
	*   | a <!--a
	* > | b-->
	*     ^
	* ```
	*
	* @type {State}
	*/
	function lineEndingAfterPrefix(code) {
		effects.enter("htmlTextData");
		return returnState(code);
	}
}
var htmlText;
var init_html_text = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	htmlText = {
		name: "htmlText",
		tokenize: tokenizeHtmlText
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/label-end.js
/** @type {Resolver} */
function resolveAllLabelEnd(events) {
	let index = -1;
	while (++index < events.length) {
		const token = events[index][1];
		if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
			events.splice(index + 1, token.type === "labelImage" ? 4 : 2);
			token.type = "data";
			index++;
		}
	}
	return events;
}
/** @type {Resolver} */
function resolveToLabelEnd(events, context) {
	let index = events.length;
	let offset = 0;
	/** @type {Token} */
	let token;
	/** @type {number | undefined} */
	let open;
	/** @type {number | undefined} */
	let close;
	/** @type {Array<Event>} */
	let media;
	while (index--) {
		token = events[index][1];
		if (open) {
			if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
			if (events[index][0] === "enter" && token.type === "labelLink") token._inactive = true;
		} else if (close) {
			if (events[index][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
				open = index;
				if (token.type !== "labelLink") {
					offset = 2;
					break;
				}
			}
		} else if (token.type === "labelEnd") close = index;
	}
	const group = {
		type: events[open][1].type === "labelLink" ? "link" : "image",
		start: Object.assign({}, events[open][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	const label = {
		type: "label",
		start: Object.assign({}, events[open][1].start),
		end: Object.assign({}, events[close][1].end)
	};
	const text = {
		type: "labelText",
		start: Object.assign({}, events[open + offset + 2][1].end),
		end: Object.assign({}, events[close - 2][1].start)
	};
	media = [[
		"enter",
		group,
		context
	], [
		"enter",
		label,
		context
	]];
	media = push(media, events.slice(open + 1, open + offset + 3));
	media = push(media, [[
		"enter",
		text,
		context
	]]);
	media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
	media = push(media, [
		[
			"exit",
			text,
			context
		],
		events[close - 2],
		events[close - 1],
		[
			"exit",
			label,
			context
		]
	]);
	media = push(media, events.slice(close + 1));
	media = push(media, [[
		"exit",
		group,
		context
	]]);
	splice(events, open, events.length, media);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLabelEnd(effects, ok, nok) {
	const self = this;
	let index = self.events.length;
	/** @type {Token} */
	let labelStart;
	/** @type {boolean} */
	let defined;
	while (index--) if ((self.events[index][1].type === "labelImage" || self.events[index][1].type === "labelLink") && !self.events[index][1]._balanced) {
		labelStart = self.events[index][1];
		break;
	}
	return start;
	/**
	* Start of label end.
	*
	* ```markdown
	* > | [a](b) c
	*       ^
	* > | [a][b] c
	*       ^
	* > | [a][] b
	*       ^
	* > | [a] b
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (!labelStart) return nok(code);
		if (labelStart._inactive) return labelEndNok(code);
		defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
			start: labelStart.end,
			end: self.now()
		})));
		effects.enter("labelEnd");
		effects.enter("labelMarker");
		effects.consume(code);
		effects.exit("labelMarker");
		effects.exit("labelEnd");
		return after;
	}
	/**
	* After `]`.
	*
	* ```markdown
	* > | [a](b) c
	*       ^
	* > | [a][b] c
	*       ^
	* > | [a][] b
	*       ^
	* > | [a] b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		if (code === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
		if (code === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
		return defined ? labelEndOk(code) : labelEndNok(code);
	}
	/**
	* After `]`, at `[`, but not at a full reference.
	*
	* > 👉 **Note**: we only get here if the label is defined.
	*
	* ```markdown
	* > | [a][] b
	*        ^
	* > | [a] b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceNotFull(code) {
		return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
	}
	/**
	* Done, we found something.
	*
	* ```markdown
	* > | [a](b) c
	*           ^
	* > | [a][b] c
	*           ^
	* > | [a][] b
	*          ^
	* > | [a] b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelEndOk(code) {
		return ok(code);
	}
	/**
	* Done, it’s nothing.
	*
	* There was an okay opening, but we didn’t match anything.
	*
	* ```markdown
	* > | [a](b c
	*        ^
	* > | [a][b c
	*        ^
	* > | [a] b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelEndNok(code) {
		labelStart._balanced = true;
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeResource(effects, ok, nok) {
	return resourceStart;
	/**
	* At a resource.
	*
	* ```markdown
	* > | [a](b) c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function resourceStart(code) {
		effects.enter("resource");
		effects.enter("resourceMarker");
		effects.consume(code);
		effects.exit("resourceMarker");
		return resourceBefore;
	}
	/**
	* In resource, after `(`, at optional whitespace.
	*
	* ```markdown
	* > | [a](b) c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function resourceBefore(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
	}
	/**
	* In resource, after optional whitespace, at `)` or a destination.
	*
	* ```markdown
	* > | [a](b) c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function resourceOpen(code) {
		if (code === 41) return resourceEnd(code);
		return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
	}
	/**
	* In resource, after destination, at optional whitespace.
	*
	* ```markdown
	* > | [a](b) c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function resourceDestinationAfter(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
	}
	/**
	* At invalid destination.
	*
	* ```markdown
	* > | [a](<<) b
	*         ^
	* ```
	*
	* @type {State}
	*/
	function resourceDestinationMissing(code) {
		return nok(code);
	}
	/**
	* In resource, after destination and whitespace, at `(` or title.
	*
	* ```markdown
	* > | [a](b ) c
	*           ^
	* ```
	*
	* @type {State}
	*/
	function resourceBetween(code) {
		if (code === 34 || code === 39 || code === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
		return resourceEnd(code);
	}
	/**
	* In resource, after title, at optional whitespace.
	*
	* ```markdown
	* > | [a](b "c") d
	*              ^
	* ```
	*
	* @type {State}
	*/
	function resourceTitleAfter(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
	}
	/**
	* In resource, at `)`.
	*
	* ```markdown
	* > | [a](b) d
	*          ^
	* ```
	*
	* @type {State}
	*/
	function resourceEnd(code) {
		if (code === 41) {
			effects.enter("resourceMarker");
			effects.consume(code);
			effects.exit("resourceMarker");
			effects.exit("resource");
			return ok;
		}
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeReferenceFull(effects, ok, nok) {
	const self = this;
	return referenceFull;
	/**
	* In a reference (full), at the `[`.
	*
	* ```markdown
	* > | [a][b] d
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceFull(code) {
		return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
	}
	/**
	* In a reference (full), after `]`.
	*
	* ```markdown
	* > | [a][b] d
	*          ^
	* ```
	*
	* @type {State}
	*/
	function referenceFullAfter(code) {
		return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
	}
	/**
	* In reference (full) that was missing.
	*
	* ```markdown
	* > | [a][b d
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceFullMissing(code) {
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeReferenceCollapsed(effects, ok, nok) {
	return referenceCollapsedStart;
	/**
	* In reference (collapsed), at `[`.
	*
	* > 👉 **Note**: we only get here if the label is defined.
	*
	* ```markdown
	* > | [a][] d
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceCollapsedStart(code) {
		effects.enter("reference");
		effects.enter("referenceMarker");
		effects.consume(code);
		effects.exit("referenceMarker");
		return referenceCollapsedOpen;
	}
	/**
	* In reference (collapsed), at `]`.
	*
	* > 👉 **Note**: we only get here if the label is defined.
	*
	* ```markdown
	* > | [a][] d
	*         ^
	* ```
	*
	*  @type {State}
	*/
	function referenceCollapsedOpen(code) {
		if (code === 93) {
			effects.enter("referenceMarker");
			effects.consume(code);
			effects.exit("referenceMarker");
			effects.exit("reference");
			return ok;
		}
		return nok(code);
	}
}
var labelEnd, resourceConstruct, referenceFullConstruct, referenceCollapsedConstruct;
var init_label_end = __esmMin((() => {
	init_micromark_factory_destination();
	init_micromark_factory_label();
	init_micromark_factory_title();
	init_micromark_factory_whitespace();
	init_micromark_util_character();
	init_micromark_util_chunked();
	init_micromark_util_normalize_identifier();
	init_micromark_util_resolve_all();
	labelEnd = {
		name: "labelEnd",
		tokenize: tokenizeLabelEnd,
		resolveTo: resolveToLabelEnd,
		resolveAll: resolveAllLabelEnd
	};
	resourceConstruct = { tokenize: tokenizeResource };
	referenceFullConstruct = { tokenize: tokenizeReferenceFull };
	referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/label-start-image.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLabelStartImage(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of label (image) start.
	*
	* ```markdown
	* > | a ![b] c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("labelImage");
		effects.enter("labelImageMarker");
		effects.consume(code);
		effects.exit("labelImageMarker");
		return open;
	}
	/**
	* After `!`, at `[`.
	*
	* ```markdown
	* > | a ![b] c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 91) {
			effects.enter("labelMarker");
			effects.consume(code);
			effects.exit("labelMarker");
			effects.exit("labelImage");
			return after;
		}
		return nok(code);
	}
	/**
	* After `![`.
	*
	* ```markdown
	* > | a ![b] c
	*         ^
	* ```
	*
	* This is needed in because, when GFM footnotes are enabled, images never
	* form when started with a `^`.
	* Instead, links form:
	*
	* ```markdown
	* ![^a](b)
	*
	* ![^a][b]
	*
	* [b]: c
	* ```
	*
	* ```html
	* <p>!<a href=\"b\">^a</a></p>
	* <p>!<a href=\"c\">^a</a></p>
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		/* c8 ignore next 3 */
		return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
	}
}
var labelStartImage;
var init_label_start_image = __esmMin((() => {
	init_label_end();
	labelStartImage = {
		name: "labelStartImage",
		tokenize: tokenizeLabelStartImage,
		resolveAll: labelEnd.resolveAll
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/label-start-link.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLabelStartLink(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of label (link) start.
	*
	* ```markdown
	* > | a [b] c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("labelLink");
		effects.enter("labelMarker");
		effects.consume(code);
		effects.exit("labelMarker");
		effects.exit("labelLink");
		return after;
	}
	/** @type {State} */
	function after(code) {
		/* c8 ignore next 3 */
		return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
	}
}
var labelStartLink;
var init_label_start_link = __esmMin((() => {
	init_label_end();
	labelStartLink = {
		name: "labelStartLink",
		tokenize: tokenizeLabelStartLink,
		resolveAll: labelEnd.resolveAll
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/line-ending.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLineEnding(effects, ok) {
	return start;
	/** @type {State} */
	function start(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return factorySpace(effects, ok, "linePrefix");
	}
}
var lineEnding;
var init_line_ending = __esmMin((() => {
	init_micromark_factory_space();
	lineEnding = {
		name: "lineEnding",
		tokenize: tokenizeLineEnding
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/thematic-break.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeThematicBreak(effects, ok, nok) {
	let size = 0;
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Start of thematic break.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("thematicBreak");
		return before(code);
	}
	/**
	* After optional whitespace, at marker.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		marker = code;
		return atBreak(code);
	}
	/**
	* After something, before something else.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === marker) {
			effects.enter("thematicBreakSequence");
			return sequence(code);
		}
		if (size >= 3 && (code === null || markdownLineEnding(code))) {
			effects.exit("thematicBreak");
			return ok(code);
		}
		return nok(code);
	}
	/**
	* In sequence.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function sequence(code) {
		if (code === marker) {
			effects.consume(code);
			size++;
			return sequence;
		}
		effects.exit("thematicBreakSequence");
		return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
	}
}
var thematicBreak$2;
var init_thematic_break$2 = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	thematicBreak$2 = {
		name: "thematicBreak",
		tokenize: tokenizeThematicBreak
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/list.js
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeListStart(effects, ok, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let size = 0;
	return start;
	/** @type {State} */
	function start(code) {
		const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
		if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
			if (!self.containerState.type) {
				self.containerState.type = kind;
				effects.enter(kind, { _container: true });
			}
			if (kind === "listUnordered") {
				effects.enter("listItemPrefix");
				return code === 42 || code === 45 ? effects.check(thematicBreak$2, nok, atMarker)(code) : atMarker(code);
			}
			if (!self.interrupt || code === 49) {
				effects.enter("listItemPrefix");
				effects.enter("listItemValue");
				return inside(code);
			}
		}
		return nok(code);
	}
	/** @type {State} */
	function inside(code) {
		if (asciiDigit(code) && ++size < 10) {
			effects.consume(code);
			return inside;
		}
		if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
			effects.exit("listItemValue");
			return atMarker(code);
		}
		return nok(code);
	}
	/**
	* @type {State}
	**/
	function atMarker(code) {
		effects.enter("listItemMarker");
		effects.consume(code);
		effects.exit("listItemMarker");
		self.containerState.marker = self.containerState.marker || code;
		return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
	}
	/** @type {State} */
	function onBlank(code) {
		self.containerState.initialBlankLine = true;
		initialSize++;
		return endOfPrefix(code);
	}
	/** @type {State} */
	function otherPrefix(code) {
		if (markdownSpace(code)) {
			effects.enter("listItemPrefixWhitespace");
			effects.consume(code);
			effects.exit("listItemPrefixWhitespace");
			return endOfPrefix;
		}
		return nok(code);
	}
	/** @type {State} */
	function endOfPrefix(code) {
		self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
		return ok(code);
	}
}
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeListContinuation(effects, ok, nok) {
	const self = this;
	self.containerState._closeFlow = void 0;
	return effects.check(blankLine, onBlank, notBlank);
	/** @type {State} */
	function onBlank(code) {
		self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
		return factorySpace(effects, ok, "listItemIndent", self.containerState.size + 1)(code);
	}
	/** @type {State} */
	function notBlank(code) {
		if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
			self.containerState.furtherBlankLines = void 0;
			self.containerState.initialBlankLine = void 0;
			return notInCurrentItem(code);
		}
		self.containerState.furtherBlankLines = void 0;
		self.containerState.initialBlankLine = void 0;
		return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
	}
	/** @type {State} */
	function notInCurrentItem(code) {
		self.containerState._closeFlow = true;
		self.interrupt = void 0;
		return factorySpace(effects, effects.attempt(list$2, ok, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
	}
}
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeIndent$1(effects, ok, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
	/** @type {State} */
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
	}
}
/**
* @type {Exiter}
* @this {TokenizeContext}
*/
function tokenizeListEnd(effects) {
	effects.exit(this.containerState.type);
}
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	/** @type {State} */
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
	}
}
var list$2, listItemPrefixWhitespaceConstruct, indentConstruct;
var init_list$2 = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_blank_line();
	init_thematic_break$2();
	list$2 = {
		name: "list",
		tokenize: tokenizeListStart,
		continuation: { tokenize: tokenizeListContinuation },
		exit: tokenizeListEnd
	};
	listItemPrefixWhitespaceConstruct = {
		tokenize: tokenizeListItemPrefixWhitespace,
		partial: true
	};
	indentConstruct = {
		tokenize: tokenizeIndent$1,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/setext-underline.js
/** @type {Resolver} */
function resolveToSetextUnderline(events, context) {
	let index = events.length;
	/** @type {number | undefined} */
	let content;
	/** @type {number | undefined} */
	let text;
	/** @type {number | undefined} */
	let definition;
	while (index--) if (events[index][0] === "enter") {
		if (events[index][1].type === "content") {
			content = index;
			break;
		}
		if (events[index][1].type === "paragraph") text = index;
	} else {
		if (events[index][1].type === "content") events.splice(index, 1);
		if (!definition && events[index][1].type === "definition") definition = index;
	}
	const heading = {
		type: "setextHeading",
		start: Object.assign({}, events[text][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	events[text][1].type = "setextHeadingText";
	if (definition) {
		events.splice(text, 0, [
			"enter",
			heading,
			context
		]);
		events.splice(definition + 1, 0, [
			"exit",
			events[content][1],
			context
		]);
		events[content][1].end = Object.assign({}, events[definition][1].end);
	} else events[content][1] = heading;
	events.push([
		"exit",
		heading,
		context
	]);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeSetextUnderline(effects, ok, nok) {
	const self = this;
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* At start of heading (setext) underline.
	*
	* ```markdown
	*   | aa
	* > | ==
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		let index = self.events.length;
		/** @type {boolean | undefined} */
		let paragraph;
		while (index--) if (self.events[index][1].type !== "lineEnding" && self.events[index][1].type !== "linePrefix" && self.events[index][1].type !== "content") {
			paragraph = self.events[index][1].type === "paragraph";
			break;
		}
		if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
			effects.enter("setextHeadingLine");
			marker = code;
			return before(code);
		}
		return nok(code);
	}
	/**
	* After optional whitespace, at `-` or `=`.
	*
	* ```markdown
	*   | aa
	* > | ==
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		effects.enter("setextHeadingLineSequence");
		return inside(code);
	}
	/**
	* In sequence.
	*
	* ```markdown
	*   | aa
	* > | ==
	*     ^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === marker) {
			effects.consume(code);
			return inside;
		}
		effects.exit("setextHeadingLineSequence");
		return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
	}
	/**
	* After sequence, after optional whitespace.
	*
	* ```markdown
	*   | aa
	* > | ==
	*       ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("setextHeadingLine");
			return ok(code);
		}
		return nok(code);
	}
}
var setextUnderline;
var init_setext_underline = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	setextUnderline = {
		name: "setextUnderline",
		tokenize: tokenizeSetextUnderline,
		resolveTo: resolveToSetextUnderline
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/index.js
var init_micromark_core_commonmark = __esmMin((() => {
	init_attention();
	init_autolink();
	init_blank_line();
	init_block_quote();
	init_character_escape();
	init_character_reference();
	init_code_fenced();
	init_code_indented();
	init_code_text();
	init_content();
	init_definition$1();
	init_hard_break_escape();
	init_heading_atx();
	init_html_flow();
	init_html_text();
	init_label_end();
	init_label_start_image();
	init_label_start_link();
	init_line_ending();
	init_list$2();
	init_setext_underline();
	init_thematic_break$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/initialize/flow.js
/**
* @this {TokenizeContext}
* @type {Initializer}
*/
function initializeFlow(effects) {
	const self = this;
	const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
	return initial;
	/** @type {State} */
	function atBlankEnding(code) {
		if (code === null) {
			effects.consume(code);
			return;
		}
		effects.enter("lineEndingBlank");
		effects.consume(code);
		effects.exit("lineEndingBlank");
		self.currentConstruct = void 0;
		return initial;
	}
	/** @type {State} */
	function afterConstruct(code) {
		if (code === null) {
			effects.consume(code);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		self.currentConstruct = void 0;
		return initial;
	}
}
var flow$1;
var init_flow = __esmMin((() => {
	init_micromark_core_commonmark();
	init_micromark_factory_space();
	flow$1 = { tokenize: initializeFlow };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/initialize/text.js
/**
* @param {'string' | 'text'} field
* @returns {InitialConstruct}
*/
function initializeFactory(field) {
	return {
		tokenize: initializeText,
		resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
	};
	/**
	* @this {TokenizeContext}
	* @type {Initializer}
	*/
	function initializeText(effects) {
		const self = this;
		const constructs = this.parser.constructs[field];
		const text = effects.attempt(constructs, start, notText);
		return start;
		/** @type {State} */
		function start(code) {
			return atBreak(code) ? text(code) : notText(code);
		}
		/** @type {State} */
		function notText(code) {
			if (code === null) {
				effects.consume(code);
				return;
			}
			effects.enter("data");
			effects.consume(code);
			return data;
		}
		/** @type {State} */
		function data(code) {
			if (atBreak(code)) {
				effects.exit("data");
				return text(code);
			}
			effects.consume(code);
			return data;
		}
		/**
		* @param {Code} code
		* @returns {boolean}
		*/
		function atBreak(code) {
			if (code === null) return true;
			const list = constructs[code];
			let index = -1;
			if (list) while (++index < list.length) {
				const item = list[index];
				if (!item.previous || item.previous.call(self, self.previous)) return true;
			}
			return false;
		}
	}
}
/**
* @param {Resolver | undefined} [extraResolver]
* @returns {Resolver}
*/
function createResolver(extraResolver) {
	return resolveAllText;
	/** @type {Resolver} */
	function resolveAllText(events, context) {
		let index = -1;
		/** @type {number | undefined} */
		let enter;
		while (++index <= events.length) if (enter === void 0) {
			if (events[index] && events[index][1].type === "data") {
				enter = index;
				index++;
			}
		} else if (!events[index] || events[index][1].type !== "data") {
			if (index !== enter + 2) {
				events[enter][1].end = events[index - 1][1].end;
				events.splice(enter + 2, index - enter - 2);
				index = enter + 2;
			}
			enter = void 0;
		}
		return extraResolver ? extraResolver(events, context) : events;
	}
}
/**
* A rather ugly set of instructions which again looks at chunks in the input
* stream.
* The reason to do this here is that it is *much* faster to parse in reverse.
* And that we can’t hook into `null` to split the line suffix before an EOF.
* To do: figure out if we can make this into a clean utility, or even in core.
* As it will be useful for GFMs literal autolink extension (and maybe even
* tables?)
*
* @type {Resolver}
*/
function resolveAllLineSuffixes(events, context) {
	let eventIndex = 0;
	while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
		const data = events[eventIndex - 1][1];
		const chunks = context.sliceStream(data);
		let index = chunks.length;
		let bufferIndex = -1;
		let size = 0;
		/** @type {boolean | undefined} */
		let tabs;
		while (index--) {
			const chunk = chunks[index];
			if (typeof chunk === "string") {
				bufferIndex = chunk.length;
				while (chunk.charCodeAt(bufferIndex - 1) === 32) {
					size++;
					bufferIndex--;
				}
				if (bufferIndex) break;
				bufferIndex = -1;
			} else if (chunk === -2) {
				tabs = true;
				size++;
			} else if (chunk === -1) {} else {
				index++;
				break;
			}
		}
		if (size) {
			const token = {
				type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					line: data.end.line,
					column: data.end.column - size,
					offset: data.end.offset - size,
					_index: data.start._index + index,
					_bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex
				},
				end: Object.assign({}, data.end)
			};
			data.end = Object.assign({}, token.start);
			if (data.start.offset === data.end.offset) Object.assign(data, token);
			else {
				events.splice(eventIndex, 0, [
					"enter",
					token,
					context
				], [
					"exit",
					token,
					context
				]);
				eventIndex += 2;
			}
		}
		eventIndex++;
	}
	return events;
}
var resolver, string$1, text$5;
var init_text$2 = __esmMin((() => {
	resolver = { resolveAll: createResolver() };
	string$1 = initializeFactory("string");
	text$5 = initializeFactory("text");
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/create-tokenizer.js
/**
* Create a tokenizer.
* Tokenizers deal with one type of data (e.g., containers, flow, text).
* The parser is the object dealing with it all.
* `initialize` works like other constructs, except that only its `tokenize`
* function is used, in which case it doesn’t receive an `ok` or `nok`.
* `from` can be given to set the point before the first character, although
* when further lines are indented, they must be set with `defineSkip`.
*
* @param {ParseContext} parser
* @param {InitialConstruct} initialize
* @param {Omit<Point, '_bufferIndex' | '_index'> | undefined} [from]
* @returns {TokenizeContext}
*/
function createTokenizer(parser, initialize, from) {
	/** @type {Point} */
	let point = Object.assign(from ? Object.assign({}, from) : {
		line: 1,
		column: 1,
		offset: 0
	}, {
		_index: 0,
		_bufferIndex: -1
	});
	/** @type {Record<string, number>} */
	const columnStart = {};
	/** @type {Array<Construct>} */
	const resolveAllConstructs = [];
	/** @type {Array<Chunk>} */
	let chunks = [];
	/** @type {Array<Token>} */
	let stack = [];
	/**
	* Tools used for tokenizing.
	*
	* @type {Effects}
	*/
	const effects = {
		consume,
		enter,
		exit,
		attempt: constructFactory(onsuccessfulconstruct),
		check: constructFactory(onsuccessfulcheck),
		interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
	};
	/**
	* State and tools for resolving and serializing.
	*
	* @type {TokenizeContext}
	*/
	const context = {
		previous: null,
		code: null,
		containerState: {},
		events: [],
		parser,
		sliceStream,
		sliceSerialize,
		now,
		defineSkip,
		write
	};
	/**
	* The state function.
	*
	* @type {State | void}
	*/
	let state = initialize.tokenize.call(context, effects);
	if (initialize.resolveAll) resolveAllConstructs.push(initialize);
	return context;
	/** @type {TokenizeContext['write']} */
	function write(slice) {
		chunks = push(chunks, slice);
		main();
		if (chunks[chunks.length - 1] !== null) return [];
		addResult(initialize, 0);
		context.events = resolveAll(resolveAllConstructs, context.events, context);
		return context.events;
	}
	/** @type {TokenizeContext['sliceSerialize']} */
	function sliceSerialize(token, expandTabs) {
		return serializeChunks(sliceStream(token), expandTabs);
	}
	/** @type {TokenizeContext['sliceStream']} */
	function sliceStream(token) {
		return sliceChunks(chunks, token);
	}
	/** @type {TokenizeContext['now']} */
	function now() {
		const { line, column, offset, _index, _bufferIndex } = point;
		return {
			line,
			column,
			offset,
			_index,
			_bufferIndex
		};
	}
	/** @type {TokenizeContext['defineSkip']} */
	function defineSkip(value) {
		columnStart[value.line] = value.column;
		accountForPotentialSkip();
	}
	/**
	* Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
	* `consume`).
	* Here is where we walk through the chunks, which either include strings of
	* several characters, or numerical character codes.
	* The reason to do this in a loop instead of a call is so the stack can
	* drain.
	*
	* @returns {void}
	*/
	function main() {
		/** @type {number} */
		let chunkIndex;
		while (point._index < chunks.length) {
			const chunk = chunks[point._index];
			if (typeof chunk === "string") {
				chunkIndex = point._index;
				if (point._bufferIndex < 0) point._bufferIndex = 0;
				while (point._index === chunkIndex && point._bufferIndex < chunk.length) go(chunk.charCodeAt(point._bufferIndex));
			} else go(chunk);
		}
	}
	/**
	* Deal with one code.
	*
	* @param {Code} code
	* @returns {void}
	*/
	function go(code) {
		state = state(code);
	}
	/** @type {Effects['consume']} */
	function consume(code) {
		if (markdownLineEnding(code)) {
			point.line++;
			point.column = 1;
			point.offset += code === -3 ? 2 : 1;
			accountForPotentialSkip();
		} else if (code !== -1) {
			point.column++;
			point.offset++;
		}
		if (point._bufferIndex < 0) point._index++;
		else {
			point._bufferIndex++;
			if (point._bufferIndex === chunks[point._index].length) {
				point._bufferIndex = -1;
				point._index++;
			}
		}
		context.previous = code;
	}
	/** @type {Effects['enter']} */
	function enter(type, fields) {
		/** @type {Token} */
		const token = fields || {};
		token.type = type;
		token.start = now();
		context.events.push([
			"enter",
			token,
			context
		]);
		stack.push(token);
		return token;
	}
	/** @type {Effects['exit']} */
	function exit(type) {
		const token = stack.pop();
		token.end = now();
		context.events.push([
			"exit",
			token,
			context
		]);
		return token;
	}
	/**
	* Use results.
	*
	* @type {ReturnHandle}
	*/
	function onsuccessfulconstruct(construct, info) {
		addResult(construct, info.from);
	}
	/**
	* Discard results.
	*
	* @type {ReturnHandle}
	*/
	function onsuccessfulcheck(_, info) {
		info.restore();
	}
	/**
	* Factory to attempt/check/interrupt.
	*
	* @param {ReturnHandle} onreturn
	* @param {{interrupt?: boolean | undefined} | undefined} [fields]
	*/
	function constructFactory(onreturn, fields) {
		return hook;
		/**
		* Handle either an object mapping codes to constructs, a list of
		* constructs, or a single construct.
		*
		* @param {Array<Construct> | Construct | ConstructRecord} constructs
		* @param {State} returnState
		* @param {State | undefined} [bogusState]
		* @returns {State}
		*/
		function hook(constructs, returnState, bogusState) {
			/** @type {Array<Construct>} */
			let listOfConstructs;
			/** @type {number} */
			let constructIndex;
			/** @type {Construct} */
			let currentConstruct;
			/** @type {Info} */
			let info;
			return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
			/**
			* Handle a list of construct.
			*
			* @param {ConstructRecord} map
			* @returns {State}
			*/
			function handleMapOfConstructs(map) {
				return start;
				/** @type {State} */
				function start(code) {
					const def = code !== null && map[code];
					const all = code !== null && map.null;
					return handleListOfConstructs([...Array.isArray(def) ? def : def ? [def] : [], ...Array.isArray(all) ? all : all ? [all] : []])(code);
				}
			}
			/**
			* Handle a list of construct.
			*
			* @param {Array<Construct>} list
			* @returns {State}
			*/
			function handleListOfConstructs(list) {
				listOfConstructs = list;
				constructIndex = 0;
				if (list.length === 0) return bogusState;
				return handleConstruct(list[constructIndex]);
			}
			/**
			* Handle a single construct.
			*
			* @param {Construct} construct
			* @returns {State}
			*/
			function handleConstruct(construct) {
				return start;
				/** @type {State} */
				function start(code) {
					info = store();
					currentConstruct = construct;
					if (!construct.partial) context.currentConstruct = construct;
					if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code);
					return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
				}
			}
			/** @type {State} */
			function ok(code) {
				onreturn(currentConstruct, info);
				return returnState;
			}
			/** @type {State} */
			function nok(code) {
				info.restore();
				if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
				return bogusState;
			}
		}
	}
	/**
	* @param {Construct} construct
	* @param {number} from
	* @returns {void}
	*/
	function addResult(construct, from) {
		if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
		if (construct.resolve) splice(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
		if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
	}
	/**
	* Store state.
	*
	* @returns {Info}
	*/
	function store() {
		const startPoint = now();
		const startPrevious = context.previous;
		const startCurrentConstruct = context.currentConstruct;
		const startEventsIndex = context.events.length;
		const startStack = Array.from(stack);
		return {
			restore,
			from: startEventsIndex
		};
		/**
		* Restore state.
		*
		* @returns {void}
		*/
		function restore() {
			point = startPoint;
			context.previous = startPrevious;
			context.currentConstruct = startCurrentConstruct;
			context.events.length = startEventsIndex;
			stack = startStack;
			accountForPotentialSkip();
		}
	}
	/**
	* Move the current point a bit forward in the line when it’s on a column
	* skip.
	*
	* @returns {void}
	*/
	function accountForPotentialSkip() {
		if (point.line in columnStart && point.column < 2) {
			point.column = columnStart[point.line];
			point.offset += columnStart[point.line] - 1;
		}
	}
}
/**
* Get the chunks from a slice of chunks in the range of a token.
*
* @param {Array<Chunk>} chunks
* @param {Pick<Token, 'end' | 'start'>} token
* @returns {Array<Chunk>}
*/
function sliceChunks(chunks, token) {
	const startIndex = token.start._index;
	const startBufferIndex = token.start._bufferIndex;
	const endIndex = token.end._index;
	const endBufferIndex = token.end._bufferIndex;
	/** @type {Array<Chunk>} */
	let view;
	if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	else {
		view = chunks.slice(startIndex, endIndex);
		if (startBufferIndex > -1) {
			const head = view[0];
			if (typeof head === "string") view[0] = head.slice(startBufferIndex);
			else view.shift();
		}
		if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
	}
	return view;
}
/**
* Get the string value of a slice of chunks.
*
* @param {Array<Chunk>} chunks
* @param {boolean | undefined} [expandTabs=false]
* @returns {string}
*/
function serializeChunks(chunks, expandTabs) {
	let index = -1;
	/** @type {Array<string>} */
	const result = [];
	/** @type {boolean | undefined} */
	let atTab;
	while (++index < chunks.length) {
		const chunk = chunks[index];
		/** @type {string} */
		let value;
		if (typeof chunk === "string") value = chunk;
		else switch (chunk) {
			case -5:
				value = "\r";
				break;
			case -4:
				value = "\n";
				break;
			case -3:
				value = "\r\n";
				break;
			case -2:
				value = expandTabs ? " " : "	";
				break;
			case -1:
				if (!expandTabs && atTab) continue;
				value = " ";
				break;
			default: value = String.fromCharCode(chunk);
		}
		atTab = chunk === -2;
		result.push(value);
	}
	return result.join("");
}
var init_create_tokenizer = __esmMin((() => {
	init_micromark_util_character();
	init_micromark_util_chunked();
	init_micromark_util_resolve_all();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/constructs.js
var constructs_exports = /* @__PURE__ */ __exportAll({
	attentionMarkers: () => attentionMarkers,
	contentInitial: () => contentInitial,
	disable: () => disable,
	document: () => document$1,
	flow: () => flow,
	flowInitial: () => flowInitial,
	insideSpan: () => insideSpan,
	string: () => string,
	text: () => text$4
});
var document$1, contentInitial, flowInitial, flow, string, text$4, insideSpan, attentionMarkers, disable;
var init_constructs = __esmMin((() => {
	init_micromark_core_commonmark();
	init_text$2();
	document$1 = {
		[42]: list$2,
		[43]: list$2,
		[45]: list$2,
		[48]: list$2,
		[49]: list$2,
		[50]: list$2,
		[51]: list$2,
		[52]: list$2,
		[53]: list$2,
		[54]: list$2,
		[55]: list$2,
		[56]: list$2,
		[57]: list$2,
		[62]: blockQuote
	};
	contentInitial = { [91]: definition$1 };
	flowInitial = {
		[-2]: codeIndented,
		[-1]: codeIndented,
		[32]: codeIndented
	};
	flow = {
		[35]: headingAtx,
		[42]: thematicBreak$2,
		[45]: [setextUnderline, thematicBreak$2],
		[60]: htmlFlow,
		[61]: setextUnderline,
		[95]: thematicBreak$2,
		[96]: codeFenced,
		[126]: codeFenced
	};
	string = {
		[38]: characterReference,
		[92]: characterEscape
	};
	text$4 = {
		[-5]: lineEnding,
		[-4]: lineEnding,
		[-3]: lineEnding,
		[33]: labelStartImage,
		[38]: characterReference,
		[42]: attention,
		[60]: [autolink, htmlText],
		[91]: labelStartLink,
		[92]: [hardBreakEscape, characterEscape],
		[93]: labelEnd,
		[95]: attention,
		[96]: codeText
	};
	insideSpan = { null: [attention, resolver] };
	attentionMarkers = { null: [42, 95] };
	disable = { null: [] };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/parse.js
/**
* @param {ParseOptions | null | undefined} [options]
* @returns {ParseContext}
*/
function parse(options) {
	/** @type {ParseContext} */
	const parser = {
		defined: [],
		lazy: {},
		constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
		content: create(content$1),
		document: create(document$2),
		flow: create(flow$1),
		string: create(string$1),
		text: create(text$5)
	};
	return parser;
	/**
	* @param {InitialConstruct} initial
	*/
	function create(initial) {
		return creator;
		/** @type {Create} */
		function creator(from) {
			return createTokenizer(parser, initial, from);
		}
	}
}
var init_parse = __esmMin((() => {
	init_micromark_util_combine_extensions();
	init_content$1();
	init_document();
	init_flow();
	init_text$2();
	init_create_tokenizer();
	init_constructs();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/preprocess.js
/**
* @returns {Preprocessor}
*/
function preprocess() {
	let column = 1;
	let buffer = "";
	/** @type {boolean | undefined} */
	let start = true;
	/** @type {boolean | undefined} */
	let atCarriageReturn;
	return preprocessor;
	/** @type {Preprocessor} */
	function preprocessor(value, encoding, end) {
		/** @type {Array<Chunk>} */
		const chunks = [];
		/** @type {RegExpMatchArray | null} */
		let match;
		/** @type {number} */
		let next;
		/** @type {number} */
		let startPosition;
		/** @type {number} */
		let endPosition;
		/** @type {Code} */
		let code;
		value = buffer + value.toString(encoding);
		startPosition = 0;
		buffer = "";
		if (start) {
			if (value.charCodeAt(0) === 65279) startPosition++;
			start = void 0;
		}
		while (startPosition < value.length) {
			search$1.lastIndex = startPosition;
			match = search$1.exec(value);
			endPosition = match && match.index !== void 0 ? match.index : value.length;
			code = value.charCodeAt(endPosition);
			if (!match) {
				buffer = value.slice(startPosition);
				break;
			}
			if (code === 10 && startPosition === endPosition && atCarriageReturn) {
				chunks.push(-3);
				atCarriageReturn = void 0;
			} else {
				if (atCarriageReturn) {
					chunks.push(-5);
					atCarriageReturn = void 0;
				}
				if (startPosition < endPosition) {
					chunks.push(value.slice(startPosition, endPosition));
					column += endPosition - startPosition;
				}
				switch (code) {
					case 0:
						chunks.push(65533);
						column++;
						break;
					case 9:
						next = Math.ceil(column / 4) * 4;
						chunks.push(-2);
						while (column++ < next) chunks.push(-1);
						break;
					case 10:
						chunks.push(-4);
						column = 1;
						break;
					default:
						atCarriageReturn = true;
						column = 1;
				}
			}
			startPosition = endPosition + 1;
		}
		if (end) {
			if (atCarriageReturn) chunks.push(-5);
			if (buffer) chunks.push(buffer);
			chunks.push(null);
		}
		return chunks;
	}
}
var search$1;
var init_preprocess = __esmMin((() => {
	search$1 = /[\0\t\n\r]/g;
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark@3.2.0_supports-color@10.2.2/node_modules/micromark/lib/postprocess.js
/**
* @param {Array<Event>} events
* @returns {Array<Event>}
*/
function postprocess(events) {
	while (!subtokenize(events));
	return events;
}
var init_postprocess = __esmMin((() => {
	init_micromark_util_subtokenize();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-decode-numeric-character-reference@1.1.0/node_modules/micromark-util-decode-numeric-character-reference/index.js
/**
* Turn the number (in string form as either hexa- or plain decimal) coming from
* a numeric character reference into a character.
*
* Sort of like `String.fromCharCode(Number.parseInt(value, base))`, but makes
* non-characters and control characters safe.
*
* @param {string} value
*   Value to decode.
* @param {number} base
*   Numeric base.
* @returns {string}
*   Character.
*/
function decodeNumericCharacterReference(value, base) {
	const code = Number.parseInt(value, base);
	if (code < 9 || code === 11 || code > 13 && code < 32 || code > 126 && code < 160 || code > 55295 && code < 57344 || code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || code > 1114111) return "�";
	return String.fromCharCode(code);
}
var init_micromark_util_decode_numeric_character_reference = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-decode-string@1.1.0/node_modules/micromark-util-decode-string/index.js
/**
* Decode markdown strings (which occur in places such as fenced code info
* strings, destinations, labels, and titles).
*
* The “string” content type allows character escapes and -references.
* This decodes those.
*
* @param {string} value
*   Value to decode.
* @returns {string}
*   Decoded value.
*/
function decodeString(value) {
	return value.replace(characterEscapeOrReference, decode);
}
/**
* @param {string} $0
* @param {string} $1
* @param {string} $2
* @returns {string}
*/
function decode($0, $1, $2) {
	if ($1) return $1;
	if ($2.charCodeAt(0) === 35) {
		const head = $2.charCodeAt(1);
		const hex = head === 120 || head === 88;
		return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
	}
	return decodeNamedCharacterReference($2) || $0;
}
var characterEscapeOrReference;
var init_micromark_util_decode_string = __esmMin((() => {
	init_index_dom();
	init_micromark_util_decode_numeric_character_reference();
	characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-stringify-position@3.0.3/node_modules/unist-util-stringify-position/lib/index.js
/**
* @typedef {import('unist').Node} Node
* @typedef {import('unist').Point} Point
* @typedef {import('unist').Position} Position
*/
/**
* @typedef NodeLike
* @property {string} type
* @property {PositionLike | null | undefined} [position]
*
* @typedef PositionLike
* @property {PointLike | null | undefined} [start]
* @property {PointLike | null | undefined} [end]
*
* @typedef PointLike
* @property {number | null | undefined} [line]
* @property {number | null | undefined} [column]
* @property {number | null | undefined} [offset]
*/
/**
* Serialize the positional info of a point, position (start and end points),
* or node.
*
* @param {Node | NodeLike | Position | PositionLike | Point | PointLike | null | undefined} [value]
*   Node, position, or point.
* @returns {string}
*   Pretty printed positional info of a node (`string`).
*
*   In the format of a range `ls:cs-le:ce` (when given `node` or `position`)
*   or a point `l:c` (when given `point`), where `l` stands for line, `c` for
*   column, `s` for `start`, and `e` for end.
*   An empty string (`''`) is returned if the given value is neither `node`,
*   `position`, nor `point`.
*/
function stringifyPosition(value) {
	if (!value || typeof value !== "object") return "";
	if ("position" in value || "type" in value) return position$1(value.position);
	if ("start" in value || "end" in value) return position$1(value);
	if ("line" in value || "column" in value) return point$2(value);
	return "";
}
/**
* @param {Point | PointLike | null | undefined} point
* @returns {string}
*/
function point$2(point) {
	return index(point && point.line) + ":" + index(point && point.column);
}
/**
* @param {Position | PositionLike | null | undefined} pos
* @returns {string}
*/
function position$1(pos) {
	return point$2(pos && pos.start) + "-" + point$2(pos && pos.end);
}
/**
* @param {number | null | undefined} value
* @returns {number}
*/
function index(value) {
	return value && typeof value === "number" ? value : 1;
}
var init_lib$29 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-stringify-position@3.0.3/node_modules/unist-util-stringify-position/index.js
var init_unist_util_stringify_position = __esmMin((() => {
	init_lib$29();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-from-markdown@1.3.1_supports-color@10.2.2/node_modules/mdast-util-from-markdown/lib/index.js
/**
* Note this compiler only understand complete buffering, not streaming.
*
* @param {Options | null | undefined} [options]
*/
function compiler(options) {
	/** @type {Config} */
	const config = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: opener(link),
			autolinkProtocol: onenterdata,
			autolinkEmail: onenterdata,
			atxHeading: opener(heading),
			blockQuote: opener(blockQuote),
			characterEscape: onenterdata,
			characterReference: onenterdata,
			codeFenced: opener(codeFlow),
			codeFencedFenceInfo: buffer,
			codeFencedFenceMeta: buffer,
			codeIndented: opener(codeFlow, buffer),
			codeText: opener(codeText, buffer),
			codeTextData: onenterdata,
			data: onenterdata,
			codeFlowValue: onenterdata,
			definition: opener(definition),
			definitionDestinationString: buffer,
			definitionLabelString: buffer,
			definitionTitleString: buffer,
			emphasis: opener(emphasis),
			hardBreakEscape: opener(hardBreak),
			hardBreakTrailing: opener(hardBreak),
			htmlFlow: opener(html, buffer),
			htmlFlowData: onenterdata,
			htmlText: opener(html, buffer),
			htmlTextData: onenterdata,
			image: opener(image),
			label: buffer,
			link: opener(link),
			listItem: opener(listItem),
			listItemValue: onenterlistitemvalue,
			listOrdered: opener(list, onenterlistordered),
			listUnordered: opener(list),
			paragraph: opener(paragraph),
			reference: onenterreference,
			referenceString: buffer,
			resourceDestinationString: buffer,
			resourceTitleString: buffer,
			setextHeading: opener(heading),
			strong: opener(strong),
			thematicBreak: opener(thematicBreak)
		},
		exit: {
			atxHeading: closer(),
			atxHeadingSequence: onexitatxheadingsequence,
			autolink: closer(),
			autolinkEmail: onexitautolinkemail,
			autolinkProtocol: onexitautolinkprotocol,
			blockQuote: closer(),
			characterEscapeValue: onexitdata,
			characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
			characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
			characterReferenceValue: onexitcharacterreferencevalue,
			codeFenced: closer(onexitcodefenced),
			codeFencedFence: onexitcodefencedfence,
			codeFencedFenceInfo: onexitcodefencedfenceinfo,
			codeFencedFenceMeta: onexitcodefencedfencemeta,
			codeFlowValue: onexitdata,
			codeIndented: closer(onexitcodeindented),
			codeText: closer(onexitcodetext),
			codeTextData: onexitdata,
			data: onexitdata,
			definition: closer(),
			definitionDestinationString: onexitdefinitiondestinationstring,
			definitionLabelString: onexitdefinitionlabelstring,
			definitionTitleString: onexitdefinitiontitlestring,
			emphasis: closer(),
			hardBreakEscape: closer(onexithardbreak),
			hardBreakTrailing: closer(onexithardbreak),
			htmlFlow: closer(onexithtmlflow),
			htmlFlowData: onexitdata,
			htmlText: closer(onexithtmltext),
			htmlTextData: onexitdata,
			image: closer(onexitimage),
			label: onexitlabel,
			labelText: onexitlabeltext,
			lineEnding: onexitlineending,
			link: closer(onexitlink),
			listItem: closer(),
			listOrdered: closer(),
			listUnordered: closer(),
			paragraph: closer(),
			referenceString: onexitreferencestring,
			resourceDestinationString: onexitresourcedestinationstring,
			resourceTitleString: onexitresourcetitlestring,
			resource: onexitresource,
			setextHeading: closer(onexitsetextheading),
			setextHeadingLineSequence: onexitsetextheadinglinesequence,
			setextHeadingText: onexitsetextheadingtext,
			strong: closer(),
			thematicBreak: closer()
		}
	};
	configure$1(config, (options || {}).mdastExtensions || []);
	/** @type {CompileData} */
	const data = {};
	return compile;
	/**
	* Turn micromark events into an mdast tree.
	*
	* @param {Array<Event>} events
	*   Events.
	* @returns {Root}
	*   mdast tree.
	*/
	function compile(events) {
		/** @type {Root} */
		let tree = {
			type: "root",
			children: []
		};
		/** @type {Omit<CompileContext, 'sliceSerialize'>} */
		const context = {
			stack: [tree],
			tokenStack: [],
			config,
			enter,
			exit,
			buffer,
			resume,
			setData,
			getData
		};
		/** @type {Array<number>} */
		const listStack = [];
		let index = -1;
		while (++index < events.length) if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") {
			if (events[index][0] === "enter") listStack.push(index);
			else index = prepareList(events, listStack.pop(), index);
		}
		index = -1;
		while (++index < events.length) {
			const handler = config[events[index][0]];
			if (own$6.call(handler, events[index][1].type)) handler[events[index][1].type].call(Object.assign({ sliceSerialize: events[index][2].sliceSerialize }, context), events[index][1]);
		}
		if (context.tokenStack.length > 0) {
			const tail = context.tokenStack[context.tokenStack.length - 1];
			(tail[1] || defaultOnError).call(context, void 0, tail[0]);
		}
		tree.position = {
			start: point$1(events.length > 0 ? events[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: point$1(events.length > 0 ? events[events.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		};
		index = -1;
		while (++index < config.transforms.length) tree = config.transforms[index](tree) || tree;
		return tree;
	}
	/**
	* @param {Array<Event>} events
	* @param {number} start
	* @param {number} length
	* @returns {number}
	*/
	function prepareList(events, start, length) {
		let index = start - 1;
		let containerBalance = -1;
		let listSpread = false;
		/** @type {Token | undefined} */
		let listItem;
		/** @type {number | undefined} */
		let lineIndex;
		/** @type {number | undefined} */
		let firstBlankLineIndex;
		/** @type {boolean | undefined} */
		let atMarker;
		while (++index <= length) {
			const event = events[index];
			if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
				if (event[0] === "enter") containerBalance++;
				else containerBalance--;
				atMarker = void 0;
			} else if (event[1].type === "lineEndingBlank") {
				if (event[0] === "enter") {
					if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index;
					atMarker = void 0;
				}
			} else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {} else atMarker = void 0;
			if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
				if (listItem) {
					let tailIndex = index;
					lineIndex = void 0;
					while (tailIndex--) {
						const tailEvent = events[tailIndex];
						if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
							if (tailEvent[0] === "exit") continue;
							if (lineIndex) {
								events[lineIndex][1].type = "lineEndingBlank";
								listSpread = true;
							}
							tailEvent[1].type = "lineEnding";
							lineIndex = tailIndex;
						} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
					}
					if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem._spread = true;
					listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
					events.splice(lineIndex || index, 0, [
						"exit",
						listItem,
						event[2]
					]);
					index++;
					length++;
				}
				if (event[1].type === "listItemPrefix") {
					listItem = {
						type: "listItem",
						_spread: false,
						start: Object.assign({}, event[1].start),
						end: void 0
					};
					events.splice(index, 0, [
						"enter",
						listItem,
						event[2]
					]);
					index++;
					length++;
					firstBlankLineIndex = void 0;
					atMarker = true;
				}
			}
		}
		events[start][1]._spread = listSpread;
		return length;
	}
	/**
	* Set data.
	*
	* @template {keyof CompileData} Key
	*   Field type.
	* @param {Key} key
	*   Key of field.
	* @param {CompileData[Key]} [value]
	*   New value.
	* @returns {void}
	*   Nothing.
	*/
	function setData(key, value) {
		data[key] = value;
	}
	/**
	* Get data.
	*
	* @template {keyof CompileData} Key
	*   Field type.
	* @param {Key} key
	*   Key of field.
	* @returns {CompileData[Key]}
	*   Value.
	*/
	function getData(key) {
		return data[key];
	}
	/**
	* Create an opener handle.
	*
	* @param {(token: Token) => Node} create
	*   Create a node.
	* @param {Handle} [and]
	*   Optional function to also run.
	* @returns {Handle}
	*   Handle.
	*/
	function opener(create, and) {
		return open;
		/**
		* @this {CompileContext}
		* @param {Token} token
		* @returns {void}
		*/
		function open(token) {
			enter.call(this, create(token), token);
			if (and) and.call(this, token);
		}
	}
	/**
	* @this {CompileContext}
	* @returns {void}
	*/
	function buffer() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	/**
	* @template {Node} Kind
	*   Node type.
	* @this {CompileContext}
	*   Context.
	* @param {Kind} node
	*   Node to enter.
	* @param {Token} token
	*   Corresponding token.
	* @param {OnEnterError | undefined} [errorHandler]
	*   Handle the case where this token is open, but it is closed by something else.
	* @returns {Kind}
	*   The given node.
	*/
	function enter(node, token, errorHandler) {
		this.stack[this.stack.length - 1].children.push(node);
		this.stack.push(node);
		this.tokenStack.push([token, errorHandler]);
		node.position = { start: point$1(token.start) };
		return node;
	}
	/**
	* Create a closer handle.
	*
	* @param {Handle} [and]
	*   Optional function to also run.
	* @returns {Handle}
	*   Handle.
	*/
	function closer(and) {
		return close;
		/**
		* @this {CompileContext}
		* @param {Token} token
		* @returns {void}
		*/
		function close(token) {
			if (and) and.call(this, token);
			exit.call(this, token);
		}
	}
	/**
	* @this {CompileContext}
	*   Context.
	* @param {Token} token
	*   Corresponding token.
	* @param {OnExitError | undefined} [onExitError]
	*   Handle the case where another token is open.
	* @returns {Node}
	*   The closed node.
	*/
	function exit(token, onExitError) {
		const node = this.stack.pop();
		const open = this.tokenStack.pop();
		if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
			start: token.start,
			end: token.end
		}) + "): it’s not open");
		else if (open[0].type !== token.type) {
			if (onExitError) onExitError.call(this, token, open[0]);
			else (open[1] || defaultOnError).call(this, token, open[0]);
		}
		node.position.end = point$1(token.end);
		return node;
	}
	/**
	* @this {CompileContext}
	* @returns {string}
	*/
	function resume() {
		return toString(this.stack.pop());
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterlistordered() {
		setData("expectingFirstListItemValue", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterlistitemvalue(token) {
		if (getData("expectingFirstListItemValue")) {
			const ancestor = this.stack[this.stack.length - 2];
			ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
			setData("expectingFirstListItemValue");
		}
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefencedfenceinfo() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.lang = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefencedfencemeta() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.meta = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefencedfence() {
		if (getData("flowCodeInside")) return;
		this.buffer();
		setData("flowCodeInside", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefenced() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		setData("flowCodeInside");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodeindented() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data.replace(/(\r?\n|\r)$/g, "");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdefinitionlabelstring(token) {
		const label = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.label = label;
		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdefinitiontitlestring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.title = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdefinitiondestinationstring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.url = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitatxheadingsequence(token) {
		const node = this.stack[this.stack.length - 1];
		if (!node.depth) node.depth = this.sliceSerialize(token).length;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitsetextheadingtext() {
		setData("setextHeadingSlurpLineEnding", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitsetextheadinglinesequence(token) {
		const node = this.stack[this.stack.length - 1];
		node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitsetextheading() {
		setData("setextHeadingSlurpLineEnding");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterdata(token) {
		const node = this.stack[this.stack.length - 1];
		let tail = node.children[node.children.length - 1];
		if (!tail || tail.type !== "text") {
			tail = text();
			tail.position = { start: point$1(token.start) };
			node.children.push(tail);
		}
		this.stack.push(tail);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdata(token) {
		const tail = this.stack.pop();
		tail.value += this.sliceSerialize(token);
		tail.position.end = point$1(token.end);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlineending(token) {
		const context = this.stack[this.stack.length - 1];
		if (getData("atHardBreak")) {
			const tail = context.children[context.children.length - 1];
			tail.position.end = point$1(token.end);
			setData("atHardBreak");
			return;
		}
		if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
			onenterdata.call(this, token);
			onexitdata.call(this, token);
		}
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexithardbreak() {
		setData("atHardBreak", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexithtmlflow() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexithtmltext() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodetext() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlink() {
		const node = this.stack[this.stack.length - 1];
		if (getData("inReference")) {
			/** @type {ReferenceType} */
			const referenceType = getData("referenceType") || "shortcut";
			node.type += "Reference";
			node.referenceType = referenceType;
			delete node.url;
			delete node.title;
		} else {
			delete node.identifier;
			delete node.label;
		}
		setData("referenceType");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitimage() {
		const node = this.stack[this.stack.length - 1];
		if (getData("inReference")) {
			/** @type {ReferenceType} */
			const referenceType = getData("referenceType") || "shortcut";
			node.type += "Reference";
			node.referenceType = referenceType;
			delete node.url;
			delete node.title;
		} else {
			delete node.identifier;
			delete node.label;
		}
		setData("referenceType");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlabeltext(token) {
		const string = this.sliceSerialize(token);
		const ancestor = this.stack[this.stack.length - 2];
		ancestor.label = decodeString(string);
		ancestor.identifier = normalizeIdentifier(string).toLowerCase();
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlabel() {
		const fragment = this.stack[this.stack.length - 1];
		const value = this.resume();
		const node = this.stack[this.stack.length - 1];
		setData("inReference", true);
		if (node.type === "link") node.children = fragment.children;
		else node.alt = value;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitresourcedestinationstring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.url = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitresourcetitlestring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.title = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitresource() {
		setData("inReference");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterreference() {
		setData("referenceType", "collapsed");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitreferencestring(token) {
		const label = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.label = label;
		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		setData("referenceType", "full");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcharacterreferencemarker(token) {
		setData("characterReferenceType", token.type);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcharacterreferencevalue(token) {
		const data = this.sliceSerialize(token);
		const type = getData("characterReferenceType");
		/** @type {string} */
		let value;
		if (type) {
			value = decodeNumericCharacterReference(data, type === "characterReferenceMarkerNumeric" ? 10 : 16);
			setData("characterReferenceType");
		} else value = decodeNamedCharacterReference(data);
		const tail = this.stack.pop();
		tail.value += value;
		tail.position.end = point$1(token.end);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitautolinkprotocol(token) {
		onexitdata.call(this, token);
		const node = this.stack[this.stack.length - 1];
		node.url = this.sliceSerialize(token);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitautolinkemail(token) {
		onexitdata.call(this, token);
		const node = this.stack[this.stack.length - 1];
		node.url = "mailto:" + this.sliceSerialize(token);
	}
	/** @returns {Blockquote} */
	function blockQuote() {
		return {
			type: "blockquote",
			children: []
		};
	}
	/** @returns {Code} */
	function codeFlow() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	/** @returns {InlineCode} */
	function codeText() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	/** @returns {Definition} */
	function definition() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	/** @returns {Emphasis} */
	function emphasis() {
		return {
			type: "emphasis",
			children: []
		};
	}
	/** @returns {Heading} */
	function heading() {
		return {
			type: "heading",
			depth: void 0,
			children: []
		};
	}
	/** @returns {Break} */
	function hardBreak() {
		return { type: "break" };
	}
	/** @returns {HTML} */
	function html() {
		return {
			type: "html",
			value: ""
		};
	}
	/** @returns {Image} */
	function image() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	/** @returns {Link} */
	function link() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	/**
	* @param {Token} token
	* @returns {List}
	*/
	function list(token) {
		return {
			type: "list",
			ordered: token.type === "listOrdered",
			start: null,
			spread: token._spread,
			children: []
		};
	}
	/**
	* @param {Token} token
	* @returns {ListItem}
	*/
	function listItem(token) {
		return {
			type: "listItem",
			spread: token._spread,
			checked: null,
			children: []
		};
	}
	/** @returns {Paragraph} */
	function paragraph() {
		return {
			type: "paragraph",
			children: []
		};
	}
	/** @returns {Strong} */
	function strong() {
		return {
			type: "strong",
			children: []
		};
	}
	/** @returns {Text} */
	function text() {
		return {
			type: "text",
			value: ""
		};
	}
	/** @returns {ThematicBreak} */
	function thematicBreak() {
		return { type: "thematicBreak" };
	}
}
/**
* Copy a point-like value.
*
* @param {Point} d
*   Point-like value.
* @returns {Point}
*   unist point.
*/
function point$1(d) {
	return {
		line: d.line,
		column: d.column,
		offset: d.offset
	};
}
/**
* @param {Config} combined
* @param {Array<Extension | Array<Extension>>} extensions
* @returns {void}
*/
function configure$1(combined, extensions) {
	let index = -1;
	while (++index < extensions.length) {
		const value = extensions[index];
		if (Array.isArray(value)) configure$1(combined, value);
		else extension(combined, value);
	}
}
/**
* @param {Config} combined
* @param {Extension} extension
* @returns {void}
*/
function extension(combined, extension) {
	/** @type {keyof Extension} */
	let key;
	for (key in extension) if (own$6.call(extension, key)) {
		if (key === "canContainEols") {
			const right = extension[key];
			if (right) combined[key].push(...right);
		} else if (key === "transforms") {
			const right = extension[key];
			if (right) combined[key].push(...right);
		} else if (key === "enter" || key === "exit") {
			const right = extension[key];
			if (right) Object.assign(combined[key], right);
		}
	}
}
/** @type {OnEnterError} */
function defaultOnError(left, right) {
	if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
		start: left.start,
		end: left.end
	}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is open");
	else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is still open");
}
var own$6, fromMarkdown;
var init_lib$28 = __esmMin((() => {
	init_mdast_util_to_string();
	init_parse();
	init_preprocess();
	init_postprocess();
	init_micromark_util_decode_numeric_character_reference();
	init_micromark_util_decode_string();
	init_micromark_util_normalize_identifier();
	init_index_dom();
	init_unist_util_stringify_position();
	own$6 = {}.hasOwnProperty;
	fromMarkdown = function(value, encoding, options) {
		if (typeof encoding !== "string") {
			options = encoding;
			encoding = void 0;
		}
		return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-from-markdown@1.3.1_supports-color@10.2.2/node_modules/mdast-util-from-markdown/index.js
var init_mdast_util_from_markdown = __esmMin((() => {
	init_lib$28();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-parse@10.0.2_supports-color@10.2.2/node_modules/remark-parse/lib/index.js
/**
* @this {import('unified').Processor}
* @type {import('unified').Plugin<[Options?] | void[], string, Root>}
*/
function remarkParse(options) {
	/** @type {import('unified').ParserFunction<Root>} */
	const parser = (doc) => {
		const settings = this.data("settings");
		return fromMarkdown(doc, Object.assign({}, settings, options, {
			extensions: this.data("micromarkExtensions") || [],
			mdastExtensions: this.data("fromMarkdownExtensions") || []
		}));
	};
	Object.assign(this, { Parser: parser });
}
var init_lib$27 = __esmMin((() => {
	init_mdast_util_from_markdown();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-parse@10.0.2_supports-color@10.2.2/node_modules/remark-parse/index.js
var init_remark_parse = __esmMin((() => {
	init_lib$27();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/configure.js
/**
* @typedef {import('./types.js').Options} Options
* @typedef {import('./types.js').State} State
*/
/**
* @param {State} base
* @param {Options} extension
* @returns {State}
*/
function configure(base, extension) {
	let index = -1;
	/** @type {keyof Options} */
	let key;
	if (extension.extensions) while (++index < extension.extensions.length) configure(base, extension.extensions[index]);
	for (key in extension) if (key === "extensions") {} else if (key === "unsafe" || key === "join")
 /* c8 ignore next 2 */
	base[key] = [...base[key] || [], ...extension[key] || []];
	else if (key === "handlers") base[key] = Object.assign(base[key], extension[key] || {});
	else base.options[key] = extension[key];
	return base;
}
var init_configure = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
/**
* @typedef {import('mdast').Blockquote} Blockquote
* @typedef {import('../types.js').Parent} Parent
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Info} Info
* @typedef {import('../types.js').Map} Map
*/
/**
* @param {Blockquote} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function blockquote$1(node, _, state, info) {
	const exit = state.enter("blockquote");
	const tracker = state.createTracker(info);
	tracker.move("> ");
	tracker.shift(2);
	const value = state.indentLines(state.containerFlow(node, tracker.current()), map$2);
	exit();
	return value;
}
/** @type {Map} */
function map$2(line, _, blank) {
	return ">" + (blank ? "" : " ") + line;
}
var init_blockquote$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
/**
* @typedef {import('../types.js').Unsafe} Unsafe
* @typedef {import('../types.js').ConstructName} ConstructName
*/
/**
* @param {Array<ConstructName>} stack
* @param {Unsafe} pattern
* @returns {boolean}
*/
function patternInScope(stack, pattern) {
	return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
/**
* @param {Array<ConstructName>} stack
* @param {Unsafe['inConstruct']} list
* @param {boolean} none
* @returns {boolean}
*/
function listInScope(stack, list, none) {
	if (typeof list === "string") list = [list];
	if (!list || list.length === 0) return none;
	let index = -1;
	while (++index < list.length) if (stack.includes(list[index])) return true;
	return false;
}
var init_pattern_in_scope = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/break.js
/**
* @param {Break} _
* @param {Parent | undefined} _1
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function hardBreak$1(_, _1, state, info) {
	let index = -1;
	while (++index < state.unsafe.length) if (state.unsafe[index].character === "\n" && patternInScope(state.stack, state.unsafe[index])) return /[ \t]/.test(info.before) ? "" : " ";
	return "\\\n";
}
var init_break$1 = __esmMin((() => {
	init_pattern_in_scope();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
/**
* @typedef {import('mdast').Code} Code
* @typedef {import('../types.js').State} State
*/
/**
* @param {Code} node
* @param {State} state
* @returns {boolean}
*/
function formatCodeAsIndented(node, state) {
	return Boolean(!state.options.fences && node.value && !node.lang && /[^ \r\n]/.test(node.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value));
}
var init_format_code_as_indented = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-fence.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['fence'], null | undefined>}
*/
function checkFence(state) {
	const marker = state.options.fence || "`";
	if (marker !== "`" && marker !== "~") throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
	return marker;
}
var init_check_fence = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/code.js
/**
* @param {Code} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function code$2(node, _, state, info) {
	const marker = checkFence(state);
	const raw = node.value || "";
	const suffix = marker === "`" ? "GraveAccent" : "Tilde";
	if (formatCodeAsIndented(node, state)) {
		const exit = state.enter("codeIndented");
		const value = state.indentLines(raw, map$1);
		exit();
		return value;
	}
	const tracker = state.createTracker(info);
	const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
	const exit = state.enter("codeFenced");
	let value = tracker.move(sequence);
	if (node.lang) {
		const subexit = state.enter(`codeFencedLang${suffix}`);
		value += tracker.move(state.safe(node.lang, {
			before: value,
			after: " ",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	if (node.lang && node.meta) {
		const subexit = state.enter(`codeFencedMeta${suffix}`);
		value += tracker.move(" ");
		value += tracker.move(state.safe(node.meta, {
			before: value,
			after: "\n",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	value += tracker.move("\n");
	if (raw) value += tracker.move(raw + "\n");
	value += tracker.move(sequence);
	exit();
	return value;
}
/** @type {Map} */
function map$1(line, _, blank) {
	return (blank ? "" : "    ") + line;
}
var init_code$1 = __esmMin((() => {
	init_longest_streak();
	init_format_code_as_indented();
	init_check_fence();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-quote.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['quote'], null | undefined>}
*/
function checkQuote(state) {
	const marker = state.options.quote || "\"";
	if (marker !== "\"" && marker !== "'") throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
	return marker;
}
var init_check_quote = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/definition.js
/**
* @param {Definition} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function definition(node, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit = state.enter("definition");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	value += tracker.move(state.safe(state.associationId(node), {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("]: ");
	subexit();
	if (!node.url || /[\0- \u007F]/.test(node.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node.url, {
			before: value,
			after: node.title ? " " : "\n",
			...tracker.current()
		}));
	}
	subexit();
	if (node.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	exit();
	return value;
}
var init_definition = __esmMin((() => {
	init_check_quote();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['emphasis'], null | undefined>}
*/
function checkEmphasis(state) {
	const marker = state.options.emphasis || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
	return marker;
}
var init_check_emphasis = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
/**
* @param {Emphasis} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function emphasis$1(node, _, state, info) {
	const marker = checkEmphasis(state);
	const exit = state.enter("emphasis");
	const tracker = state.createTracker(info);
	let value = tracker.move(marker);
	value += tracker.move(state.containerPhrasing(node, {
		before: value,
		after: marker,
		...tracker.current()
	}));
	value += tracker.move(marker);
	exit();
	return value;
}
/**
* @param {Emphasis} _
* @param {Parent | undefined} _1
* @param {State} state
* @returns {string}
*/
function emphasisPeek(_, _1, state) {
	return state.options.emphasis || "*";
}
var init_emphasis$1 = __esmMin((() => {
	init_check_emphasis();
	emphasis$1.peek = emphasisPeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-is@5.2.1/node_modules/unist-util-is/lib/index.js
/**
* @param {Array<string | Props | TestFunctionAnything>} tests
* @returns {AssertAnything}
*/
function anyFactory$1(tests) {
	/** @type {Array<AssertAnything>} */
	const checks = [];
	let index = -1;
	while (++index < tests.length) checks[index] = convert(tests[index]);
	return castFactory$1(any);
	/**
	* @this {unknown}
	* @param {Array<unknown>} parameters
	* @returns {boolean}
	*/
	function any(...parameters) {
		let index = -1;
		while (++index < checks.length) if (checks[index].call(this, ...parameters)) return true;
		return false;
	}
}
/**
* Turn an object into a test for a node with a certain fields.
*
* @param {Props} check
* @returns {AssertAnything}
*/
function propsFactory(check) {
	return castFactory$1(all);
	/**
	* @param {Node} node
	* @returns {boolean}
	*/
	function all(node) {
		/** @type {string} */
		let key;
		for (key in check) if (node[key] !== check[key]) return false;
		return true;
	}
}
/**
* Turn a string into a test for a node with a certain type.
*
* @param {string} check
* @returns {AssertAnything}
*/
function typeFactory(check) {
	return castFactory$1(type);
	/**
	* @param {Node} node
	*/
	function type(node) {
		return node && node.type === check;
	}
}
/**
* Turn a custom test into a test for a node that passes that test.
*
* @param {TestFunctionAnything} check
* @returns {AssertAnything}
*/
function castFactory$1(check) {
	return assertion;
	/**
	* @this {unknown}
	* @param {unknown} node
	* @param {Array<unknown>} parameters
	* @returns {boolean}
	*/
	function assertion(node, ...parameters) {
		return Boolean(node && typeof node === "object" && "type" in node && Boolean(check.call(this, node, ...parameters)));
	}
}
function ok() {
	return true;
}
var convert;
var init_lib$26 = __esmMin((() => {
	convert = (
	/**
	* @param {Test} [test]
	* @returns {AssertAnything}
	*/
	function(test) {
		if (test === void 0 || test === null) return ok;
		if (typeof test === "string") return typeFactory(test);
		if (typeof test === "object") return Array.isArray(test) ? anyFactory$1(test) : propsFactory(test);
		if (typeof test === "function") return castFactory$1(test);
		throw new Error("Expected function, string, or object as test");
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-is@5.2.1/node_modules/unist-util-is/index.js
var init_unist_util_is = __esmMin((() => {
	init_lib$26();
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/color.browser.js
/**
* @param {string} d
* @returns {string}
*/
function color(d) {
	return d;
}
var init_color_browser = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/index.js
/**
* Turn a return value into a clean result.
*
* @param {VisitorResult} value
*   Valid return values from visitors.
* @returns {ActionTuple}
*   Clean result.
*/
function toResult(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "number") return [true, value];
	return [value];
}
var visitParents;
var init_lib$25 = __esmMin((() => {
	init_unist_util_is();
	init_color_browser();
	visitParents = (
	/**
	* @param {Node} tree
	* @param {Test} test
	* @param {Visitor<Node>} visitor
	* @param {boolean | null | undefined} [reverse]
	* @returns {void}
	*/
	function(tree, test, visitor, reverse) {
		if (typeof test === "function" && typeof visitor !== "function") {
			reverse = visitor;
			visitor = test;
			test = null;
		}
		const is = convert(test);
		const step = reverse ? -1 : 1;
		factory(tree, void 0, [])();
		/**
		* @param {Node} node
		* @param {number | undefined} index
		* @param {Array<Parent>} parents
		*/
		function factory(node, index, parents) {
			/** @type {Record<string, unknown>} */
			const value = node && typeof node === "object" ? node : {};
			if (typeof value.type === "string") {
				const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
				Object.defineProperty(visit, "name", { value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")" });
			}
			return visit;
			function visit() {
				/** @type {ActionTuple} */
				let result = [];
				/** @type {ActionTuple} */
				let subresult;
				/** @type {number} */
				let offset;
				/** @type {Array<Parent>} */
				let grandparents;
				if (!test || is(node, index, parents[parents.length - 1] || null)) {
					result = toResult(visitor(node, parents));
					if (result[0] === false) return result;
				}
				if (node.children && result[0] !== "skip") {
					offset = (reverse ? node.children.length : -1) + step;
					grandparents = parents.concat(node);
					while (offset > -1 && offset < node.children.length) {
						subresult = factory(node.children[offset], offset, grandparents)();
						if (subresult[0] === false) return subresult;
						offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
					}
				}
				return result;
			}
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/index.js
var init_unist_util_visit_parents = __esmMin((() => {
	init_lib$25();
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-visit@4.1.2/node_modules/unist-util-visit/lib/index.js
var visit;
var init_lib$24 = __esmMin((() => {
	init_unist_util_visit_parents();
	visit = (
	/**
	* @param {Node} tree
	* @param {Test} test
	* @param {Visitor} visitor
	* @param {boolean | null | undefined} [reverse]
	* @returns {void}
	*/
	function(tree, test, visitor, reverse) {
		if (typeof test === "function" && typeof visitor !== "function") {
			reverse = visitor;
			visitor = test;
			test = null;
		}
		visitParents(tree, test, overload, reverse);
		/**
		* @param {Node} node
		* @param {Array<Parent>} parents
		*/
		function overload(node, parents) {
			const parent = parents[parents.length - 1];
			return visitor(node, parent ? parent.children.indexOf(node) : null, parent);
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-visit@4.1.2/node_modules/unist-util-visit/index.js
var init_unist_util_visit = __esmMin((() => {
	init_lib$24();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
/**
* @param {Heading} node
* @param {State} state
* @returns {boolean}
*/
function formatHeadingAsSetext(node, state) {
	let literalWithBreak = false;
	visit(node, (node) => {
		if ("value" in node && /\r?\n|\r/.test(node.value) || node.type === "break") {
			literalWithBreak = true;
			return false;
		}
	});
	return Boolean((!node.depth || node.depth < 3) && toString(node) && (state.options.setext || literalWithBreak));
}
var init_format_heading_as_setext = __esmMin((() => {
	init_unist_util_visit();
	init_mdast_util_to_string();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/heading.js
/**
* @param {Heading} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function heading$1(node, _, state, info) {
	const rank = Math.max(Math.min(6, node.depth || 1), 1);
	const tracker = state.createTracker(info);
	if (formatHeadingAsSetext(node, state)) {
		const exit = state.enter("headingSetext");
		const subexit = state.enter("phrasing");
		const value = state.containerPhrasing(node, {
			...tracker.current(),
			before: "\n",
			after: "\n"
		});
		subexit();
		exit();
		return value + "\n" + (rank === 1 ? "=" : "-").repeat(value.length - (Math.max(value.lastIndexOf("\r"), value.lastIndexOf("\n")) + 1));
	}
	const sequence = "#".repeat(rank);
	const exit = state.enter("headingAtx");
	const subexit = state.enter("phrasing");
	tracker.move(sequence + " ");
	let value = state.containerPhrasing(node, {
		before: "# ",
		after: "\n",
		...tracker.current()
	});
	if (/^[\t ]/.test(value)) value = "&#x" + value.charCodeAt(0).toString(16).toUpperCase() + ";" + value.slice(1);
	value = value ? sequence + " " + value : sequence;
	if (state.options.closeAtx) value += " " + sequence;
	subexit();
	exit();
	return value;
}
var init_heading$1 = __esmMin((() => {
	init_format_heading_as_setext();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/html.js
/**
* @param {HTML} node
* @returns {string}
*/
function html$3(node) {
	return node.value || "";
}
/**
* @returns {string}
*/
function htmlPeek() {
	return "<";
}
var init_html$3 = __esmMin((() => {
	/**
	* @typedef {import('mdast').HTML} HTML
	*/
	html$3.peek = htmlPeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/image.js
/**
* @param {Image} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function image$1(node, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit = state.enter("image");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	value += tracker.move(state.safe(node.alt, {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node.url && node.title || /[\0- \u007F]/.test(node.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node.url, {
			before: value,
			after: node.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit();
	return value;
}
/**
* @returns {string}
*/
function imagePeek() {
	return "!";
}
var init_image$1 = __esmMin((() => {
	init_check_quote();
	image$1.peek = imagePeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
/**
* @param {ImageReference} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function imageReference$1(node, _, state, info) {
	const type = node.referenceType;
	const exit = state.enter("imageReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	const alt = state.safe(node.alt, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(alt + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit();
	if (type === "full" || !alt || alt !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
/**
* @returns {string}
*/
function imageReferencePeek() {
	return "!";
}
var init_image_reference$1 = __esmMin((() => {
	/**
	* @typedef {import('mdast').ImageReference} ImageReference
	* @typedef {import('../types.js').Parent} Parent
	* @typedef {import('../types.js').State} State
	* @typedef {import('../types.js').Info} Info
	*/
	imageReference$1.peek = imageReferencePeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js
/**
* @typedef {import('../types.js').Unsafe} Unsafe
*/
/**
* @param {Unsafe} pattern
* @returns {RegExp}
*/
function patternCompile(pattern) {
	if (!pattern._compiled) {
		const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
		pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""), "g");
	}
	return pattern._compiled;
}
var init_pattern_compile = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
/**
* @param {InlineCode} node
* @param {Parent | undefined} _
* @param {State} state
* @returns {string}
*/
function inlineCode$1(node, _, state) {
	let value = node.value || "";
	let sequence = "`";
	let index = -1;
	while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) sequence += "`";
	if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) value = " " + value + " ";
	while (++index < state.unsafe.length) {
		const pattern = state.unsafe[index];
		const expression = patternCompile(pattern);
		/** @type {RegExpExecArray | null} */
		let match;
		if (!pattern.atBreak) continue;
		while (match = expression.exec(value)) {
			let position = match.index;
			if (value.charCodeAt(position) === 10 && value.charCodeAt(position - 1) === 13) position--;
			value = value.slice(0, position) + " " + value.slice(match.index + 1);
		}
	}
	return sequence + value + sequence;
}
/**
* @returns {string}
*/
function inlineCodePeek() {
	return "`";
}
var init_inline_code$1 = __esmMin((() => {
	init_pattern_compile();
	inlineCode$1.peek = inlineCodePeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
/**
* @param {Link} node
* @param {State} state
* @returns {boolean}
*/
function formatLinkAsAutolink(node, state) {
	const raw = toString(node);
	return Boolean(!state.options.resourceLink && node.url && !node.title && node.children && node.children.length === 1 && node.children[0].type === "text" && (raw === node.url || "mailto:" + raw === node.url) && /^[a-z][a-z+.-]+:/i.test(node.url) && !/[\0- <>\u007F]/.test(node.url));
}
var init_format_link_as_autolink = __esmMin((() => {
	init_mdast_util_to_string();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/link.js
/**
* @param {Link} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function link$1(node, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const tracker = state.createTracker(info);
	/** @type {Exit} */
	let exit;
	/** @type {Exit} */
	let subexit;
	if (formatLinkAsAutolink(node, state)) {
		const stack = state.stack;
		state.stack = [];
		exit = state.enter("autolink");
		let value = tracker.move("<");
		value += tracker.move(state.containerPhrasing(node, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
		exit();
		state.stack = stack;
		return value;
	}
	exit = state.enter("link");
	subexit = state.enter("label");
	let value = tracker.move("[");
	value += tracker.move(state.containerPhrasing(node, {
		before: value,
		after: "](",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node.url && node.title || /[\0- \u007F]/.test(node.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node.url, {
			before: value,
			after: node.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit();
	return value;
}
/**
* @param {Link} node
* @param {Parent | undefined} _
* @param {State} state
* @returns {string}
*/
function linkPeek(node, _, state) {
	return formatLinkAsAutolink(node, state) ? "<" : "[";
}
var init_link$1 = __esmMin((() => {
	init_check_quote();
	init_format_link_as_autolink();
	link$1.peek = linkPeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
/**
* @param {LinkReference} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function linkReference$1(node, _, state, info) {
	const type = node.referenceType;
	const exit = state.enter("linkReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	const text = state.containerPhrasing(node, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(text + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit();
	if (type === "full" || !text || text !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
/**
* @returns {string}
*/
function linkReferencePeek() {
	return "[";
}
var init_link_reference$1 = __esmMin((() => {
	/**
	* @typedef {import('mdast').LinkReference} LinkReference
	* @typedef {import('../types.js').Parent} Parent
	* @typedef {import('../types.js').State} State
	* @typedef {import('../types.js').Info} Info
	*/
	linkReference$1.peek = linkReferencePeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['bullet'], null | undefined>}
*/
function checkBullet(state) {
	const marker = state.options.bullet || "*";
	if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return marker;
}
var init_check_bullet = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
/**
* @param {State} state
* @returns {Exclude<Options['bullet'], null | undefined>}
*/
function checkBulletOther(state) {
	const bullet = checkBullet(state);
	const bulletOther = state.options.bulletOther;
	if (!bulletOther) return bullet === "*" ? "-" : "*";
	if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (bulletOther === bullet) throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
	return bulletOther;
}
var init_check_bullet_other = __esmMin((() => {
	init_check_bullet();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['bulletOrdered'], null | undefined>}
*/
function checkBulletOrdered(state) {
	const marker = state.options.bulletOrdered || ".";
	if (marker !== "." && marker !== ")") throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
	return marker;
}
var init_check_bullet_ordered = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered-other.js
/**
* @param {State} state
* @returns {Exclude<Options['bulletOrdered'], null | undefined>}
*/
function checkBulletOrderedOther(state) {
	const bulletOrdered = checkBulletOrdered(state);
	const bulletOrderedOther = state.options.bulletOrderedOther;
	if (!bulletOrderedOther) return bulletOrdered === "." ? ")" : ".";
	if (bulletOrderedOther !== "." && bulletOrderedOther !== ")") throw new Error("Cannot serialize items with `" + bulletOrderedOther + "` for `options.bulletOrderedOther`, expected `*`, `+`, or `-`");
	if (bulletOrderedOther === bulletOrdered) throw new Error("Expected `bulletOrdered` (`" + bulletOrdered + "`) and `bulletOrderedOther` (`" + bulletOrderedOther + "`) to be different");
	return bulletOrderedOther;
}
var init_check_bullet_ordered_other = __esmMin((() => {
	init_check_bullet_ordered();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-rule.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['rule'], null | undefined>}
*/
function checkRule(state) {
	const marker = state.options.rule || "*";
	if (marker !== "*" && marker !== "-" && marker !== "_") throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
	return marker;
}
var init_check_rule = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/list.js
/**
* @param {List} node
* @param {Parent | undefined} parent
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function list$1(node, parent, state, info) {
	const exit = state.enter("list");
	const bulletCurrent = state.bulletCurrent;
	/** @type {string} */
	let bullet = node.ordered ? checkBulletOrdered(state) : checkBullet(state);
	/** @type {string} */
	const bulletOther = node.ordered ? checkBulletOrderedOther(state) : checkBulletOther(state);
	const bulletLastUsed = state.bulletLastUsed;
	let useDifferentMarker = false;
	if (parent && (node.ordered ? state.options.bulletOrderedOther : state.options.bulletOther) && bulletLastUsed && bullet === bulletLastUsed) useDifferentMarker = true;
	if (!node.ordered) {
		const firstListItem = node.children ? node.children[0] : void 0;
		if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) useDifferentMarker = true;
		if (checkRule(state) === bullet && firstListItem) {
			let index = -1;
			while (++index < node.children.length) {
				const item = node.children[index];
				if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
					useDifferentMarker = true;
					break;
				}
			}
		}
	}
	if (useDifferentMarker) bullet = bulletOther;
	state.bulletCurrent = bullet;
	const value = state.containerFlow(node, info);
	state.bulletLastUsed = bullet;
	state.bulletCurrent = bulletCurrent;
	exit();
	return value;
}
var init_list$1 = __esmMin((() => {
	init_check_bullet();
	init_check_bullet_other();
	init_check_bullet_ordered();
	init_check_bullet_ordered_other();
	init_check_rule();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['listItemIndent'], null | undefined>}
*/
function checkListItemIndent(state) {
	const style = state.options.listItemIndent || "tab";
	if (style === 1 || style === "1") return "one";
	if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return style;
}
var init_check_list_item_indent = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/list-item.js
/**
* @param {ListItem} node
* @param {Parent | undefined} parent
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function listItem$1(node, parent, state, info) {
	const listItemIndent = checkListItemIndent(state);
	let bullet = state.bulletCurrent || checkBullet(state);
	if (parent && parent.type === "list" && parent.ordered) bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + bullet;
	let size = bullet.length + 1;
	if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node.spread)) size = Math.ceil(size / 4) * 4;
	const tracker = state.createTracker(info);
	tracker.move(bullet + " ".repeat(size - bullet.length));
	tracker.shift(size);
	const exit = state.enter("listItem");
	const value = state.indentLines(state.containerFlow(node, tracker.current()), map);
	exit();
	return value;
	/** @type {Map} */
	function map(line, index, blank) {
		if (index) return (blank ? "" : " ".repeat(size)) + line;
		return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
	}
}
var init_list_item$1 = __esmMin((() => {
	init_check_bullet();
	init_check_list_item_indent();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
/**
* @typedef {import('mdast').Paragraph} Paragraph
* @typedef {import('../types.js').Parent} Parent
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Info} Info
*/
/**
* @param {Paragraph} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function paragraph$1(node, _, state, info) {
	const exit = state.enter("paragraph");
	const subexit = state.enter("phrasing");
	const value = state.containerPhrasing(node, info);
	subexit();
	exit();
	return value;
}
var init_paragraph$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-phrasing@3.0.1/node_modules/mdast-util-phrasing/lib/index.js
var phrasing;
var init_lib$23 = __esmMin((() => {
	init_unist_util_is();
	phrasing = convert([
		"break",
		"delete",
		"emphasis",
		"footnote",
		"footnoteReference",
		"image",
		"imageReference",
		"inlineCode",
		"link",
		"linkReference",
		"strong",
		"text"
	]);
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-phrasing@3.0.1/node_modules/mdast-util-phrasing/index.js
var init_mdast_util_phrasing = __esmMin((() => {
	init_lib$23();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/root.js
/**
* @param {Root} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function root$2(node, _, state, info) {
	return (node.children.some((d) => phrasing(d)) ? state.containerPhrasing : state.containerFlow).call(state, node, info);
}
var init_root$1 = __esmMin((() => {
	init_mdast_util_phrasing();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-strong.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['strong'], null | undefined>}
*/
function checkStrong(state) {
	const marker = state.options.strong || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
	return marker;
}
var init_check_strong = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/strong.js
/**
* @param {Strong} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function strong$1(node, _, state, info) {
	const marker = checkStrong(state);
	const exit = state.enter("strong");
	const tracker = state.createTracker(info);
	let value = tracker.move(marker + marker);
	value += tracker.move(state.containerPhrasing(node, {
		before: value,
		after: marker,
		...tracker.current()
	}));
	value += tracker.move(marker + marker);
	exit();
	return value;
}
/**
* @param {Strong} _
* @param {Parent | undefined} _1
* @param {State} state
* @returns {string}
*/
function strongPeek(_, _1, state) {
	return state.options.strong || "*";
}
var init_strong$1 = __esmMin((() => {
	init_check_strong();
	strong$1.peek = strongPeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/text.js
/**
* @typedef {import('mdast').Text} Text
* @typedef {import('../types.js').Parent} Parent
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Info} Info
*/
/**
* @param {Text} node
* @param {Parent | undefined} _
* @param {State} state
* @param {Info} info
* @returns {string}
*/
function text$3(node, _, state, info) {
	return state.safe(node.value, info);
}
var init_text$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
/**
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').Options} Options
*/
/**
* @param {State} state
* @returns {Exclude<Options['ruleRepetition'], null | undefined>}
*/
function checkRuleRepetition(state) {
	const repetition = state.options.ruleRepetition || 3;
	if (repetition < 3) throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
	return repetition;
}
var init_check_rule_repetition = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
/**
* @param {ThematicBreak} _
* @param {Parent | undefined} _1
* @param {State} state
* @returns {string}
*/
function thematicBreak$1(_, _1, state) {
	const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
	return state.options.ruleSpaces ? value.slice(0, -1) : value;
}
var init_thematic_break$1 = __esmMin((() => {
	init_check_rule_repetition();
	init_check_rule();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/handle/index.js
var handle;
var init_handle = __esmMin((() => {
	init_blockquote$1();
	init_break$1();
	init_code$1();
	init_definition();
	init_emphasis$1();
	init_heading$1();
	init_html$3();
	init_image$1();
	init_image_reference$1();
	init_inline_code$1();
	init_link$1();
	init_link_reference$1();
	init_list$1();
	init_list_item$1();
	init_paragraph$1();
	init_root$1();
	init_strong$1();
	init_text$1();
	init_thematic_break$1();
	handle = {
		blockquote: blockquote$1,
		break: hardBreak$1,
		code: code$2,
		definition,
		emphasis: emphasis$1,
		hardBreak: hardBreak$1,
		heading: heading$1,
		html: html$3,
		image: image$1,
		imageReference: imageReference$1,
		inlineCode: inlineCode$1,
		link: link$1,
		linkReference: linkReference$1,
		list: list$1,
		listItem: listItem$1,
		paragraph: paragraph$1,
		root: root$2,
		strong: strong$1,
		text: text$3,
		thematicBreak: thematicBreak$1
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/join.js
/** @type {Join} */
function joinDefaults(left, right, parent, state) {
	if (right.type === "code" && formatCodeAsIndented(right, state) && (left.type === "list" || left.type === right.type && formatCodeAsIndented(left, state))) return false;
	if (left.type === "list" && left.type === right.type && Boolean(left.ordered) === Boolean(right.ordered) && !(left.ordered ? state.options.bulletOrderedOther : state.options.bulletOther)) return false;
	if ("spread" in parent && typeof parent.spread === "boolean") {
		if (left.type === "paragraph" && (left.type === right.type || right.type === "definition" || right.type === "heading" && formatHeadingAsSetext(right, state))) return;
		return parent.spread ? 1 : 0;
	}
}
var join$1;
var init_join = __esmMin((() => {
	init_format_code_as_indented();
	init_format_heading_as_setext();
	join$1 = [joinDefaults];
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/unsafe.js
var fullPhrasingSpans, unsafe;
var init_unsafe = __esmMin((() => {
	fullPhrasingSpans = [
		"autolink",
		"destinationLiteral",
		"destinationRaw",
		"reference",
		"titleQuote",
		"titleApostrophe"
	];
	unsafe = [
		{
			character: "	",
			after: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: "	",
			before: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: "	",
			inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
		},
		{
			character: "\r",
			inConstruct: [
				"codeFencedLangGraveAccent",
				"codeFencedLangTilde",
				"codeFencedMetaGraveAccent",
				"codeFencedMetaTilde",
				"destinationLiteral",
				"headingAtx"
			]
		},
		{
			character: "\n",
			inConstruct: [
				"codeFencedLangGraveAccent",
				"codeFencedLangTilde",
				"codeFencedMetaGraveAccent",
				"codeFencedMetaTilde",
				"destinationLiteral",
				"headingAtx"
			]
		},
		{
			character: " ",
			after: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: " ",
			before: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: " ",
			inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
		},
		{
			character: "!",
			after: "\\[",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			character: "\"",
			inConstruct: "titleQuote"
		},
		{
			atBreak: true,
			character: "#"
		},
		{
			character: "#",
			inConstruct: "headingAtx",
			after: "(?:[\r\n]|$)"
		},
		{
			character: "&",
			after: "[#A-Za-z]",
			inConstruct: "phrasing"
		},
		{
			character: "'",
			inConstruct: "titleApostrophe"
		},
		{
			character: "(",
			inConstruct: "destinationRaw"
		},
		{
			before: "\\]",
			character: "(",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			before: "\\d+",
			character: ")"
		},
		{
			character: ")",
			inConstruct: "destinationRaw"
		},
		{
			atBreak: true,
			character: "*",
			after: "(?:[ 	\r\n*])"
		},
		{
			character: "*",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			character: "+",
			after: "(?:[ 	\r\n])"
		},
		{
			atBreak: true,
			character: "-",
			after: "(?:[ 	\r\n-])"
		},
		{
			atBreak: true,
			before: "\\d+",
			character: ".",
			after: "(?:[ 	\r\n]|$)"
		},
		{
			atBreak: true,
			character: "<",
			after: "[!/?A-Za-z]"
		},
		{
			character: "<",
			after: "[!/?A-Za-z]",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			character: "<",
			inConstruct: "destinationLiteral"
		},
		{
			atBreak: true,
			character: "="
		},
		{
			atBreak: true,
			character: ">"
		},
		{
			character: ">",
			inConstruct: "destinationLiteral"
		},
		{
			atBreak: true,
			character: "["
		},
		{
			character: "[",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			character: "[",
			inConstruct: ["label", "reference"]
		},
		{
			character: "\\",
			after: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: "]",
			inConstruct: ["label", "reference"]
		},
		{
			atBreak: true,
			character: "_"
		},
		{
			character: "_",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			character: "`"
		},
		{
			character: "`",
			inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
		},
		{
			character: "`",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			character: "~"
		}
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/association.js
/**
* Get an identifier from an association to match it to others.
*
* Associations are nodes that match to something else through an ID:
* <https://github.com/syntax-tree/mdast#association>.
*
* The `label` of an association is the string value: character escapes and
* references work, and casing is intact.
* The `identifier` is used to match one association to another:
* controversially, character escapes and references don’t work in this
* matching: `&copy;` does not match `©`, and `\+` does not match `+`.
*
* But casing is ignored (and whitespace) is trimmed and collapsed: ` A\nb`
* matches `a b`.
* So, we do prefer the label when figuring out how we’re going to serialize:
* it has whitespace, casing, and we can ignore most useless character
* escapes and all character references.
*
* @type {AssociationId}
*/
function association(node) {
	if (node.label || !node.identifier) return node.label || "";
	return decodeString(node.identifier);
}
var init_association = __esmMin((() => {
	init_micromark_util_decode_string();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
/**
* @typedef {import('../types.js').Handle} Handle
* @typedef {import('../types.js').Info} Info
* @typedef {import('../types.js').Parent} Parent
* @typedef {import('../types.js').PhrasingContent} PhrasingContent
* @typedef {import('../types.js').State} State
*/
/**
* Serialize the children of a parent that contains phrasing children.
*
* These children will be joined flush together.
*
* @param {Parent & {children: Array<PhrasingContent>}} parent
*   Parent of flow nodes.
* @param {State} state
*   Info passed around about the current state.
* @param {Info} info
*   Info on where we are in the document we are generating.
* @returns {string}
*   Serialized children, joined together.
*/
function containerPhrasing(parent, state, info) {
	const indexStack = state.indexStack;
	const children = parent.children || [];
	/** @type {Array<string>} */
	const results = [];
	let index = -1;
	let before = info.before;
	indexStack.push(-1);
	let tracker = state.createTracker(info);
	while (++index < children.length) {
		const child = children[index];
		/** @type {string} */
		let after;
		indexStack[indexStack.length - 1] = index;
		if (index + 1 < children.length) {
			/** @type {Handle} */
			let handle = state.handle.handlers[children[index + 1].type];
			/** @type {Handle} */
			if (handle && handle.peek) handle = handle.peek;
			after = handle ? handle(children[index + 1], parent, state, {
				before: "",
				after: "",
				...tracker.current()
			}).charAt(0) : "";
		} else after = info.after;
		if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
			results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
			before = " ";
			tracker = state.createTracker(info);
			tracker.move(results.join(""));
		}
		results.push(tracker.move(state.handle(child, parent, state, {
			...tracker.current(),
			before,
			after
		})));
		before = results[results.length - 1].slice(-1);
	}
	indexStack.pop();
	return results.join("");
}
var init_container_phrasing = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/container-flow.js
/**
* @typedef {import('../types.js').FlowContent} FlowContent
* @typedef {import('../types.js').Node} Node
* @typedef {import('../types.js').Parent} Parent
* @typedef {import('../types.js').State} State
* @typedef {import('../types.js').TrackFields} TrackFields
*/
/**
* @param {Parent & {children: Array<FlowContent>}} parent
*   Parent of flow nodes.
* @param {State} state
*   Info passed around about the current state.
* @param {TrackFields} info
*   Info on where we are in the document we are generating.
* @returns {string}
*   Serialized children, joined by (blank) lines.
*/
function containerFlow(parent, state, info) {
	const indexStack = state.indexStack;
	const children = parent.children || [];
	const tracker = state.createTracker(info);
	/** @type {Array<string>} */
	const results = [];
	let index = -1;
	indexStack.push(-1);
	while (++index < children.length) {
		const child = children[index];
		indexStack[indexStack.length - 1] = index;
		results.push(tracker.move(state.handle(child, parent, state, {
			before: "\n",
			after: "\n",
			...tracker.current()
		})));
		if (child.type !== "list") state.bulletLastUsed = void 0;
		if (index < children.length - 1) results.push(tracker.move(between(child, children[index + 1], parent, state)));
	}
	indexStack.pop();
	return results.join("");
}
/**
* @param {Node} left
* @param {Node} right
* @param {Parent} parent
* @param {State} state
* @returns {string}
*/
function between(left, right, parent, state) {
	let index = state.join.length;
	while (index--) {
		const result = state.join[index](left, right, parent, state);
		if (result === true || result === 1) break;
		if (typeof result === "number") return "\n".repeat(1 + result);
		if (result === false) return "\n\n<!---->\n\n";
	}
	return "\n\n";
}
var init_container_flow = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
/**
* @type {IndentLines}
*/
function indentLines(value, map) {
	/** @type {Array<string>} */
	const result = [];
	let start = 0;
	let line = 0;
	/** @type {RegExpExecArray | null} */
	let match;
	while (match = eol.exec(value)) {
		one(value.slice(start, match.index));
		result.push(match[0]);
		start = match.index + match[0].length;
		line++;
	}
	one(value.slice(start));
	return result.join("");
	/**
	* @param {string} value
	*/
	function one(value) {
		result.push(map(value, line, !value));
	}
}
var eol;
var init_indent_lines = __esmMin((() => {
	eol = /\r?\n|\r/g;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/safe.js
/**
* Make a string safe for embedding in markdown constructs.
*
* In markdown, almost all punctuation characters can, in certain cases,
* result in something.
* Whether they do is highly subjective to where they happen and in what
* they happen.
*
* To solve this, `mdast-util-to-markdown` tracks:
*
* * Characters before and after something;
* * What “constructs” we are in.
*
* This information is then used by this function to escape or encode
* special characters.
*
* @param {State} state
*   Info passed around about the current state.
* @param {string | null | undefined} input
*   Raw value to make safe.
* @param {SafeConfig} config
*   Configuration.
* @returns {string}
*   Serialized markdown safe for embedding.
*/
function safe(state, input, config) {
	const value = (config.before || "") + (input || "") + (config.after || "");
	/** @type {Array<number>} */
	const positions = [];
	/** @type {Array<string>} */
	const result = [];
	/** @type {Record<number, {before: boolean, after: boolean}>} */
	const infos = {};
	let index = -1;
	while (++index < state.unsafe.length) {
		const pattern = state.unsafe[index];
		if (!patternInScope(state.stack, pattern)) continue;
		const expression = patternCompile(pattern);
		/** @type {RegExpExecArray | null} */
		let match;
		while (match = expression.exec(value)) {
			const before = "before" in pattern || Boolean(pattern.atBreak);
			const after = "after" in pattern;
			const position = match.index + (before ? match[1].length : 0);
			if (positions.includes(position)) {
				if (infos[position].before && !before) infos[position].before = false;
				if (infos[position].after && !after) infos[position].after = false;
			} else {
				positions.push(position);
				infos[position] = {
					before,
					after
				};
			}
		}
	}
	positions.sort(numerical);
	let start = config.before ? config.before.length : 0;
	const end = value.length - (config.after ? config.after.length : 0);
	index = -1;
	while (++index < positions.length) {
		const position = positions[index];
		if (position < start || position >= end) continue;
		if (position + 1 < end && positions[index + 1] === position + 1 && infos[position].after && !infos[position + 1].before && !infos[position + 1].after || positions[index - 1] === position - 1 && infos[position].before && !infos[position - 1].before && !infos[position - 1].after) continue;
		if (start !== position) result.push(escapeBackslashes(value.slice(start, position), "\\"));
		start = position;
		if (/[!-/:-@[-`{-~]/.test(value.charAt(position)) && (!config.encode || !config.encode.includes(value.charAt(position)))) result.push("\\");
		else {
			result.push("&#x" + value.charCodeAt(position).toString(16).toUpperCase() + ";");
			start++;
		}
	}
	result.push(escapeBackslashes(value.slice(start, end), config.after));
	return result.join("");
}
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
function numerical(a, b) {
	return a - b;
}
/**
* @param {string} value
* @param {string} after
* @returns {string}
*/
function escapeBackslashes(value, after) {
	const expression = /\\(?=[!-/:-@[-`{-~])/g;
	/** @type {Array<number>} */
	const positions = [];
	/** @type {Array<string>} */
	const results = [];
	const whole = value + after;
	let index = -1;
	let start = 0;
	/** @type {RegExpExecArray | null} */
	let match;
	while (match = expression.exec(whole)) positions.push(match.index);
	while (++index < positions.length) {
		if (start !== positions[index]) results.push(value.slice(start, positions[index]));
		results.push("\\");
		start = positions[index];
	}
	results.push(value.slice(start));
	return results.join("");
}
var init_safe = __esmMin((() => {
	init_pattern_compile();
	init_pattern_in_scope();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/util/track.js
/**
* @typedef {import('../types.js').CreateTracker} CreateTracker
* @typedef {import('../types.js').TrackCurrent} TrackCurrent
* @typedef {import('../types.js').TrackMove} TrackMove
* @typedef {import('../types.js').TrackShift} TrackShift
*/
/**
* Track positional info in the output.
*
* @type {CreateTracker}
*/
function track(config) {
	/* c8 ignore next 5 */
	const options = config || {};
	const now = options.now || {};
	let lineShift = options.lineShift || 0;
	let line = now.line || 1;
	let column = now.column || 1;
	return {
		move,
		current,
		shift
	};
	/**
	* Get the current tracked info.
	*
	* @type {TrackCurrent}
	*/
	function current() {
		return {
			now: {
				line,
				column
			},
			lineShift
		};
	}
	/**
	* Define an increased line shift (the typical indent for lines).
	*
	* @type {TrackShift}
	*/
	function shift(value) {
		lineShift += value;
	}
	/**
	* Move past some generated markdown.
	*
	* @type {TrackMove}
	*/
	function move(input) {
		const value = input || "";
		const chunks = value.split(/\r?\n|\r/g);
		const tail = chunks[chunks.length - 1];
		line += chunks.length - 1;
		column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
		return value;
	}
}
var init_track = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/lib/index.js
/**
* Turn an mdast syntax tree into markdown.
*
* @param {Node} tree
*   Tree to serialize.
* @param {Options} [options]
*   Configuration (optional).
* @returns {string}
*   Serialized markdown representing `tree`.
*/
function toMarkdown(tree, options = {}) {
	/** @type {State} */
	const state = {
		enter,
		indentLines,
		associationId: association,
		containerPhrasing: containerPhrasingBound,
		containerFlow: containerFlowBound,
		createTracker: track,
		safe: safeBound,
		stack: [],
		unsafe: [],
		join: [],
		handlers: {},
		options: {},
		indexStack: [],
		handle: void 0
	};
	configure(state, {
		unsafe,
		join: join$1,
		handlers: handle
	});
	configure(state, options);
	if (state.options.tightDefinitions) configure(state, { join: [joinDefinition] });
	state.handle = zwitch("type", {
		invalid,
		unknown,
		handlers: state.handlers
	});
	let result = state.handle(tree, void 0, state, {
		before: "\n",
		after: "\n",
		now: {
			line: 1,
			column: 1
		},
		lineShift: 0
	});
	if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) result += "\n";
	return result;
	/** @type {Enter} */
	function enter(name) {
		state.stack.push(name);
		return exit;
		function exit() {
			state.stack.pop();
		}
	}
}
/**
* @param {unknown} value
* @returns {never}
*/
function invalid(value) {
	throw new Error("Cannot handle value `" + value + "`, expected node");
}
/**
* @param {unknown} node
* @returns {never}
*/
function unknown(node) {
	throw new Error("Cannot handle unknown node `" + node.type + "`");
}
/** @type {Join} */
function joinDefinition(left, right) {
	if (left.type === "definition" && left.type === right.type) return 0;
}
/**
* Serialize the children of a parent that contains phrasing children.
*
* These children will be joined flush together.
*
* @this {State}
*   Info passed around about the current state.
* @param {Parent & {children: Array<PhrasingContent>}} parent
*   Parent of flow nodes.
* @param {Info} info
*   Info on where we are in the document we are generating.
* @returns {string}
*   Serialized children, joined together.
*/
function containerPhrasingBound(parent, info) {
	return containerPhrasing(parent, this, info);
}
/**
* Serialize the children of a parent that contains flow children.
*
* These children will typically be joined by blank lines.
* What they are joined by exactly is defined by `Join` functions.
*
* @this {State}
*   Info passed around about the current state.
* @param {Parent & {children: Array<FlowContent>}} parent
*   Parent of flow nodes.
* @param {TrackFields} info
*   Info on where we are in the document we are generating.
* @returns {string}
*   Serialized children, joined by (blank) lines.
*/
function containerFlowBound(parent, info) {
	return containerFlow(parent, this, info);
}
/**
* Make a string safe for embedding in markdown constructs.
*
* In markdown, almost all punctuation characters can, in certain cases,
* result in something.
* Whether they do is highly subjective to where they happen and in what
* they happen.
*
* To solve this, `mdast-util-to-markdown` tracks:
*
* * Characters before and after something;
* * What “constructs” we are in.
*
* This information is then used by this function to escape or encode
* special characters.
*
* @this {State}
*   Info passed around about the current state.
* @param {string | null | undefined} value
*   Raw value to make safe.
* @param {SafeConfig} config
*   Configuration.
* @returns {string}
*   Serialized markdown safe for embedding.
*/
function safeBound(value, config) {
	return safe(this, value, config);
}
var init_lib$22 = __esmMin((() => {
	init_zwitch();
	init_configure();
	init_handle();
	init_join();
	init_unsafe();
	init_association();
	init_container_phrasing();
	init_container_flow();
	init_indent_lines();
	init_safe();
	init_track();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-markdown@1.5.0/node_modules/mdast-util-to-markdown/index.js
var init_mdast_util_to_markdown = __esmMin((() => {
	init_lib$22();
	init_handle();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-stringify@10.0.3/node_modules/remark-stringify/lib/index.js
/**
* @this {import('unified').Processor}
* @type {import('unified').Plugin<[Options?]|void[], Node, string>}
*/
function remarkStringify(options) {
	/** @type {import('unified').CompilerFunction<Node, string>} */
	const compiler = (tree) => {
		const settings = this.data("settings");
		return toMarkdown(tree, Object.assign({}, settings, options, { extensions: 
		/** @type {ToMarkdownOptions['extensions']} */ this.data("toMarkdownExtensions") || [] }));
	};
	Object.assign(this, { Compiler: compiler });
}
var init_lib$21 = __esmMin((() => {
	init_mdast_util_to_markdown();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-stringify@10.0.3/node_modules/remark-stringify/index.js
var init_remark_stringify = __esmMin((() => {
	init_lib$21();
}));
//#endregion
//#region ../../node_modules/.pnpm/is-buffer@2.0.5/node_modules/is-buffer/index.js
var require_is_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* Determine if an object is a Buffer
	*
	* @author   Feross Aboukhadijeh <https://feross.org>
	* @license  MIT
	*/
	module.exports = function isBuffer(obj) {
		return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile-message@3.1.4/node_modules/vfile-message/lib/index.js
var VFileMessage;
var init_lib$20 = __esmMin((() => {
	init_unist_util_stringify_position();
	VFileMessage = class extends Error {
		/**
		* Create a message for `reason` at `place` from `origin`.
		*
		* When an error is passed in as `reason`, the `stack` is copied.
		*
		* @param {string | Error | VFileMessage} reason
		*   Reason for message, uses the stack and message of the error if given.
		*
		*   > 👉 **Note**: you should use markdown.
		* @param {Node | NodeLike | Position | Point | null | undefined} [place]
		*   Place in file where the message occurred.
		* @param {string | null | undefined} [origin]
		*   Place in code where the message originates (example:
		*   `'my-package:my-rule'` or `'my-rule'`).
		* @returns
		*   Instance of `VFileMessage`.
		*/
		constructor(reason, place, origin) {
			/** @type {[string | null, string | null]} */
			const parts = [null, null];
			/** @type {Position} */
			let position = {
				start: {
					line: null,
					column: null
				},
				end: {
					line: null,
					column: null
				}
			};
			super();
			if (typeof place === "string") {
				origin = place;
				place = void 0;
			}
			if (typeof origin === "string") {
				const index = origin.indexOf(":");
				if (index === -1) parts[1] = origin;
				else {
					parts[0] = origin.slice(0, index);
					parts[1] = origin.slice(index + 1);
				}
			}
			if (place) {
				if ("type" in place || "position" in place) {
					if (place.position) position = place.position;
				} else if ("start" in place || "end" in place) position = place;
				else if ("line" in place || "column" in place) position.start = place;
			}
			/**
			* Serialized positional info of error.
			*
			* On normal errors, this would be something like `ParseError`, buit in
			* `VFile` messages we use this space to show where an error happened.
			*/
			this.name = stringifyPosition(place) || "1:1";
			/**
			* Reason for message.
			*
			* @type {string}
			*/
			this.message = typeof reason === "object" ? reason.message : reason;
			/**
			* Stack of message.
			*
			* This is used by normal errors to show where something happened in
			* programming code, irrelevant for `VFile` messages,
			*
			* @type {string}
			*/
			this.stack = "";
			if (typeof reason === "object" && reason.stack) this.stack = reason.stack;
			/**
			* Reason for message.
			*
			* > 👉 **Note**: you should use markdown.
			*
			* @type {string}
			*/
			this.reason = this.message;
			/**
			* State of problem.
			*
			* * `true` — marks associated file as no longer processable (error)
			* * `false` — necessitates a (potential) change (warning)
			* * `null | undefined` — for things that might not need changing (info)
			*
			* @type {boolean | null | undefined}
			*/
			this.fatal;
			/**
			* Starting line of error.
			*
			* @type {number | null}
			*/
			this.line = position.start.line;
			/**
			* Starting column of error.
			*
			* @type {number | null}
			*/
			this.column = position.start.column;
			/**
			* Full unist position.
			*
			* @type {Position | null}
			*/
			this.position = position;
			/**
			* Namespace of message (example: `'my-package'`).
			*
			* @type {string | null}
			*/
			this.source = parts[0];
			/**
			* Category of message (example: `'my-rule'`).
			*
			* @type {string | null}
			*/
			this.ruleId = parts[1];
			/**
			* Path of a file (used throughout the `VFile` ecosystem).
			*
			* @type {string | null}
			*/
			this.file;
			/**
			* Specify the source value that’s being reported, which is deemed
			* incorrect.
			*
			* @type {string | null}
			*/
			this.actual;
			/**
			* Suggest acceptable values that can be used instead of `actual`.
			*
			* @type {Array<string> | null}
			*/
			this.expected;
			/**
			* Link to docs for the message.
			*
			* > 👉 **Note**: this must be an absolute URL that can be passed as `x`
			* > to `new URL(x)`.
			*
			* @type {string | null}
			*/
			this.url;
			/**
			* Long form description of the message (you should use markdown).
			*
			* @type {string | null}
			*/
			this.note;
		}
	};
	VFileMessage.prototype.file = "";
	VFileMessage.prototype.name = "";
	VFileMessage.prototype.reason = "";
	VFileMessage.prototype.message = "";
	VFileMessage.prototype.stack = "";
	VFileMessage.prototype.fatal = null;
	VFileMessage.prototype.column = null;
	VFileMessage.prototype.line = null;
	VFileMessage.prototype.source = null;
	VFileMessage.prototype.ruleId = null;
	VFileMessage.prototype.position = null;
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile-message@3.1.4/node_modules/vfile-message/index.js
var init_vfile_message = __esmMin((() => {
	init_lib$20();
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile@5.3.7/node_modules/vfile/lib/minpath.browser.js
/**
* Get the basename from a path.
*
* @param {string} path
*   File path.
* @param {string | undefined} [ext]
*   Extension to strip.
* @returns {string}
*   Stem or basename.
*/
function basename(path, ext) {
	if (ext !== void 0 && typeof ext !== "string") throw new TypeError("\"ext\" argument must be a string");
	assertPath$1(path);
	let start = 0;
	let end = -1;
	let index = path.length;
	/** @type {boolean | undefined} */
	let seenNonSlash;
	if (ext === void 0 || ext.length === 0 || ext.length > path.length) {
		while (index--) if (path.charCodeAt(index) === 47) {
			if (seenNonSlash) {
				start = index + 1;
				break;
			}
		} else if (end < 0) {
			seenNonSlash = true;
			end = index + 1;
		}
		return end < 0 ? "" : path.slice(start, end);
	}
	if (ext === path) return "";
	let firstNonSlashEnd = -1;
	let extIndex = ext.length - 1;
	while (index--) if (path.charCodeAt(index) === 47) {
		if (seenNonSlash) {
			start = index + 1;
			break;
		}
	} else {
		if (firstNonSlashEnd < 0) {
			seenNonSlash = true;
			firstNonSlashEnd = index + 1;
		}
		if (extIndex > -1) {
			if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
				if (extIndex < 0) end = index;
			} else {
				extIndex = -1;
				end = firstNonSlashEnd;
			}
		}
	}
	if (start === end) end = firstNonSlashEnd;
	else if (end < 0) end = path.length;
	return path.slice(start, end);
}
/**
* Get the dirname from a path.
*
* @param {string} path
*   File path.
* @returns {string}
*   File path.
*/
function dirname(path) {
	assertPath$1(path);
	if (path.length === 0) return ".";
	let end = -1;
	let index = path.length;
	/** @type {boolean | undefined} */
	let unmatchedSlash;
	while (--index) if (path.charCodeAt(index) === 47) {
		if (unmatchedSlash) {
			end = index;
			break;
		}
	} else if (!unmatchedSlash) unmatchedSlash = true;
	return end < 0 ? path.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path.charCodeAt(0) === 47 ? "//" : path.slice(0, end);
}
/**
* Get an extname from a path.
*
* @param {string} path
*   File path.
* @returns {string}
*   Extname.
*/
function extname(path) {
	assertPath$1(path);
	let index = path.length;
	let end = -1;
	let startPart = 0;
	let startDot = -1;
	let preDotState = 0;
	/** @type {boolean | undefined} */
	let unmatchedSlash;
	while (index--) {
		const code = path.charCodeAt(index);
		if (code === 47) {
			if (unmatchedSlash) {
				startPart = index + 1;
				break;
			}
			continue;
		}
		if (end < 0) {
			unmatchedSlash = true;
			end = index + 1;
		}
		if (code === 46) {
			if (startDot < 0) startDot = index;
			else if (preDotState !== 1) preDotState = 1;
		} else if (startDot > -1) preDotState = -1;
	}
	if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
	return path.slice(startDot, end);
}
/**
* Join segments from a path.
*
* @param {Array<string>} segments
*   Path segments.
* @returns {string}
*   File path.
*/
function join(...segments) {
	let index = -1;
	/** @type {string | undefined} */
	let joined;
	while (++index < segments.length) {
		assertPath$1(segments[index]);
		if (segments[index]) joined = joined === void 0 ? segments[index] : joined + "/" + segments[index];
	}
	return joined === void 0 ? "." : normalize$1(joined);
}
/**
* Normalize a basic file path.
*
* @param {string} path
*   File path.
* @returns {string}
*   File path.
*/
function normalize$1(path) {
	assertPath$1(path);
	const absolute = path.charCodeAt(0) === 47;
	let value = normalizeString(path, !absolute);
	if (value.length === 0 && !absolute) value = ".";
	if (value.length > 0 && path.charCodeAt(path.length - 1) === 47) value += "/";
	return absolute ? "/" + value : value;
}
/**
* Resolve `.` and `..` elements in a path with directory names.
*
* @param {string} path
*   File path.
* @param {boolean} allowAboveRoot
*   Whether `..` can move above root.
* @returns {string}
*   File path.
*/
function normalizeString(path, allowAboveRoot) {
	let result = "";
	let lastSegmentLength = 0;
	let lastSlash = -1;
	let dots = 0;
	let index = -1;
	/** @type {number | undefined} */
	let code;
	/** @type {number} */
	let lastSlashIndex;
	while (++index <= path.length) {
		if (index < path.length) code = path.charCodeAt(index);
		else if (code === 47) break;
		else code = 47;
		if (code === 47) {
			if (lastSlash === index - 1 || dots === 1) {} else if (lastSlash !== index - 1 && dots === 2) {
				if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
					if (result.length > 2) {
						lastSlashIndex = result.lastIndexOf("/");
						if (lastSlashIndex !== result.length - 1) {
							if (lastSlashIndex < 0) {
								result = "";
								lastSegmentLength = 0;
							} else {
								result = result.slice(0, lastSlashIndex);
								lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
							}
							lastSlash = index;
							dots = 0;
							continue;
						}
					} else if (result.length > 0) {
						result = "";
						lastSegmentLength = 0;
						lastSlash = index;
						dots = 0;
						continue;
					}
				}
				if (allowAboveRoot) {
					result = result.length > 0 ? result + "/.." : "..";
					lastSegmentLength = 2;
				}
			} else {
				if (result.length > 0) result += "/" + path.slice(lastSlash + 1, index);
				else result = path.slice(lastSlash + 1, index);
				lastSegmentLength = index - lastSlash - 1;
			}
			lastSlash = index;
			dots = 0;
		} else if (code === 46 && dots > -1) dots++;
		else dots = -1;
	}
	return result;
}
/**
* Make sure `path` is a string.
*
* @param {string} path
*   File path.
* @returns {asserts path is string}
*   Nothing.
*/
function assertPath$1(path) {
	if (typeof path !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
var path$1;
var init_minpath_browser = __esmMin((() => {
	path$1 = {
		basename,
		dirname,
		extname,
		join,
		sep: "/"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile@5.3.7/node_modules/vfile/lib/minproc.browser.js
function cwd() {
	return "/";
}
var proc;
var init_minproc_browser = __esmMin((() => {
	proc = { cwd };
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile@5.3.7/node_modules/vfile/lib/minurl.shared.js
/**
* @typedef URL
* @property {string} hash
* @property {string} host
* @property {string} hostname
* @property {string} href
* @property {string} origin
* @property {string} password
* @property {string} pathname
* @property {string} port
* @property {string} protocol
* @property {string} search
* @property {any} searchParams
* @property {string} username
* @property {() => string} toString
* @property {() => string} toJSON
*/
/**
* Check if `fileUrlOrPath` looks like a URL.
*
* @param {unknown} fileUrlOrPath
*   File path or URL.
* @returns {fileUrlOrPath is URL}
*   Whether it’s a URL.
*/
function isUrl(fileUrlOrPath) {
	return fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && fileUrlOrPath.href && fileUrlOrPath.origin;
}
var init_minurl_shared = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/vfile@5.3.7/node_modules/vfile/lib/minurl.browser.js
/**
* @param {string | URL} path
*   File URL.
* @returns {string}
*   File URL.
*/
function urlToPath(path) {
	if (typeof path === "string") path = new URL(path);
	else if (!isUrl(path)) {
		/** @type {NodeJS.ErrnoException} */
		const error = /* @__PURE__ */ new TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + path + "`");
		error.code = "ERR_INVALID_ARG_TYPE";
		throw error;
	}
	if (path.protocol !== "file:") {
		/** @type {NodeJS.ErrnoException} */
		const error = /* @__PURE__ */ new TypeError("The URL must be of scheme file");
		error.code = "ERR_INVALID_URL_SCHEME";
		throw error;
	}
	return getPathFromURLPosix(path);
}
/**
* Get a path from a POSIX URL.
*
* @param {URL} url
*   URL.
* @returns {string}
*   File path.
*/
function getPathFromURLPosix(url) {
	if (url.hostname !== "") {
		/** @type {NodeJS.ErrnoException} */
		const error = /* @__PURE__ */ new TypeError("File URL host must be \"localhost\" or empty on darwin");
		error.code = "ERR_INVALID_FILE_URL_HOST";
		throw error;
	}
	const pathname = url.pathname;
	let index = -1;
	while (++index < pathname.length) if (pathname.charCodeAt(index) === 37 && pathname.charCodeAt(index + 1) === 50) {
		const third = pathname.charCodeAt(index + 2);
		if (third === 70 || third === 102) {
			/** @type {NodeJS.ErrnoException} */
			const error = /* @__PURE__ */ new TypeError("File URL path must not include encoded / characters");
			error.code = "ERR_INVALID_FILE_URL_PATH";
			throw error;
		}
	}
	return decodeURIComponent(pathname);
}
var init_minurl_browser = __esmMin((() => {
	init_minurl_shared();
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile@5.3.7/node_modules/vfile/lib/index.js
/**
* Assert that `part` is not a path (as in, does not contain `path.sep`).
*
* @param {string | null | undefined} part
*   File path part.
* @param {string} name
*   Part name.
* @returns {void}
*   Nothing.
*/
function assertPart(part, name) {
	if (part && part.includes(path$1.sep)) throw new Error("`" + name + "` cannot be a path: did not expect `" + path$1.sep + "`");
}
/**
* Assert that `part` is not empty.
*
* @param {string | undefined} part
*   Thing.
* @param {string} name
*   Part name.
* @returns {asserts part is string}
*   Nothing.
*/
function assertNonEmpty(part, name) {
	if (!part) throw new Error("`" + name + "` cannot be empty");
}
/**
* Assert `path` exists.
*
* @param {string | undefined} path
*   Path.
* @param {string} name
*   Dependency name.
* @returns {asserts path is string}
*   Nothing.
*/
function assertPath(path, name) {
	if (!path) throw new Error("Setting `" + name + "` requires `path` to be set too");
}
/**
* Assert `value` is a buffer.
*
* @param {unknown} value
*   thing.
* @returns {value is Buffer}
*   Whether `value` is a Node.js buffer.
*/
function buffer(value) {
	return (0, import_is_buffer$1.default)(value);
}
var import_is_buffer$1, order, VFile;
var init_lib$19 = __esmMin((() => {
	import_is_buffer$1 = /* @__PURE__ */ __toESM(require_is_buffer(), 1);
	init_vfile_message();
	init_minpath_browser();
	init_minproc_browser();
	init_minurl_browser();
	order = [
		"history",
		"path",
		"basename",
		"stem",
		"extname",
		"dirname"
	];
	VFile = class {
		/**
		* Create a new virtual file.
		*
		* `options` is treated as:
		*
		* *   `string` or `Buffer` — `{value: options}`
		* *   `URL` — `{path: options}`
		* *   `VFile` — shallow copies its data over to the new file
		* *   `object` — all fields are shallow copied over to the new file
		*
		* Path related fields are set in the following order (least specific to
		* most specific): `history`, `path`, `basename`, `stem`, `extname`,
		* `dirname`.
		*
		* You cannot set `dirname` or `extname` without setting either `history`,
		* `path`, `basename`, or `stem` too.
		*
		* @param {Compatible | null | undefined} [value]
		*   File value.
		* @returns
		*   New instance.
		*/
		constructor(value) {
			/** @type {Options | VFile} */
			let options;
			if (!value) options = {};
			else if (typeof value === "string" || buffer(value)) options = { value };
			else if (isUrl(value)) options = { path: value };
			else options = value;
			/**
			* Place to store custom information (default: `{}`).
			*
			* It’s OK to store custom data directly on the file but moving it to
			* `data` is recommended.
			*
			* @type {Data}
			*/
			this.data = {};
			/**
			* List of messages associated with the file.
			*
			* @type {Array<VFileMessage>}
			*/
			this.messages = [];
			/**
			* List of filepaths the file moved between.
			*
			* The first is the original path and the last is the current path.
			*
			* @type {Array<string>}
			*/
			this.history = [];
			/**
			* Base of `path` (default: `process.cwd()` or `'/'` in browsers).
			*
			* @type {string}
			*/
			this.cwd = proc.cwd();
			/**
			* Raw value.
			*
			* @type {Value}
			*/
			this.value;
			/**
			* Whether a file was saved to disk.
			*
			* This is used by vfile reporters.
			*
			* @type {boolean}
			*/
			this.stored;
			/**
			* Custom, non-string, compiled, representation.
			*
			* This is used by unified to store non-string results.
			* One example is when turning markdown into React nodes.
			*
			* @type {unknown}
			*/
			this.result;
			/**
			* Source map.
			*
			* This type is equivalent to the `RawSourceMap` type from the `source-map`
			* module.
			*
			* @type {Map | null | undefined}
			*/
			this.map;
			let index = -1;
			while (++index < order.length) {
				const prop = order[index];
				if (prop in options && options[prop] !== void 0 && options[prop] !== null) this[prop] = prop === "history" ? [...options[prop]] : options[prop];
			}
			/** @type {string} */
			let prop;
			for (prop in options) if (!order.includes(prop)) this[prop] = options[prop];
		}
		/**
		* Get the full path (example: `'~/index.min.js'`).
		*
		* @returns {string}
		*/
		get path() {
			return this.history[this.history.length - 1];
		}
		/**
		* Set the full path (example: `'~/index.min.js'`).
		*
		* Cannot be nullified.
		* You can set a file URL (a `URL` object with a `file:` protocol) which will
		* be turned into a path with `url.fileURLToPath`.
		*
		* @param {string | URL} path
		*/
		set path(path) {
			if (isUrl(path)) path = urlToPath(path);
			assertNonEmpty(path, "path");
			if (this.path !== path) this.history.push(path);
		}
		/**
		* Get the parent path (example: `'~'`).
		*/
		get dirname() {
			return typeof this.path === "string" ? path$1.dirname(this.path) : void 0;
		}
		/**
		* Set the parent path (example: `'~'`).
		*
		* Cannot be set if there’s no `path` yet.
		*/
		set dirname(dirname) {
			assertPath(this.basename, "dirname");
			this.path = path$1.join(dirname || "", this.basename);
		}
		/**
		* Get the basename (including extname) (example: `'index.min.js'`).
		*/
		get basename() {
			return typeof this.path === "string" ? path$1.basename(this.path) : void 0;
		}
		/**
		* Set basename (including extname) (`'index.min.js'`).
		*
		* Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
		* on windows).
		* Cannot be nullified (use `file.path = file.dirname` instead).
		*/
		set basename(basename) {
			assertNonEmpty(basename, "basename");
			assertPart(basename, "basename");
			this.path = path$1.join(this.dirname || "", basename);
		}
		/**
		* Get the extname (including dot) (example: `'.js'`).
		*/
		get extname() {
			return typeof this.path === "string" ? path$1.extname(this.path) : void 0;
		}
		/**
		* Set the extname (including dot) (example: `'.js'`).
		*
		* Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
		* on windows).
		* Cannot be set if there’s no `path` yet.
		*/
		set extname(extname) {
			assertPart(extname, "extname");
			assertPath(this.dirname, "extname");
			if (extname) {
				if (extname.charCodeAt(0) !== 46) throw new Error("`extname` must start with `.`");
				if (extname.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
			}
			this.path = path$1.join(this.dirname, this.stem + (extname || ""));
		}
		/**
		* Get the stem (basename w/o extname) (example: `'index.min'`).
		*/
		get stem() {
			return typeof this.path === "string" ? path$1.basename(this.path, this.extname) : void 0;
		}
		/**
		* Set the stem (basename w/o extname) (example: `'index.min'`).
		*
		* Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
		* on windows).
		* Cannot be nullified (use `file.path = file.dirname` instead).
		*/
		set stem(stem) {
			assertNonEmpty(stem, "stem");
			assertPart(stem, "stem");
			this.path = path$1.join(this.dirname || "", stem + (this.extname || ""));
		}
		/**
		* Serialize the file.
		*
		* @param {BufferEncoding | null | undefined} [encoding='utf8']
		*   Character encoding to understand `value` as when it’s a `Buffer`
		*   (default: `'utf8'`).
		* @returns {string}
		*   Serialized file.
		*/
		toString(encoding) {
			return (this.value || "").toString(encoding || void 0);
		}
		/**
		* Create a warning message associated with the file.
		*
		* Its `fatal` is set to `false` and `file` is set to the current file path.
		* Its added to `file.messages`.
		*
		* @param {string | Error | VFileMessage} reason
		*   Reason for message, uses the stack and message of the error if given.
		* @param {Node | NodeLike | Position | Point | null | undefined} [place]
		*   Place in file where the message occurred.
		* @param {string | null | undefined} [origin]
		*   Place in code where the message originates (example:
		*   `'my-package:my-rule'` or `'my-rule'`).
		* @returns {VFileMessage}
		*   Message.
		*/
		message(reason, place, origin) {
			const message = new VFileMessage(reason, place, origin);
			if (this.path) {
				message.name = this.path + ":" + message.name;
				message.file = this.path;
			}
			message.fatal = false;
			this.messages.push(message);
			return message;
		}
		/**
		* Create an info message associated with the file.
		*
		* Its `fatal` is set to `null` and `file` is set to the current file path.
		* Its added to `file.messages`.
		*
		* @param {string | Error | VFileMessage} reason
		*   Reason for message, uses the stack and message of the error if given.
		* @param {Node | NodeLike | Position | Point | null | undefined} [place]
		*   Place in file where the message occurred.
		* @param {string | null | undefined} [origin]
		*   Place in code where the message originates (example:
		*   `'my-package:my-rule'` or `'my-rule'`).
		* @returns {VFileMessage}
		*   Message.
		*/
		info(reason, place, origin) {
			const message = this.message(reason, place, origin);
			message.fatal = null;
			return message;
		}
		/**
		* Create a fatal error associated with the file.
		*
		* Its `fatal` is set to `true` and `file` is set to the current file path.
		* Its added to `file.messages`.
		*
		* > 👉 **Note**: a fatal error means that a file is no longer processable.
		*
		* @param {string | Error | VFileMessage} reason
		*   Reason for message, uses the stack and message of the error if given.
		* @param {Node | NodeLike | Position | Point | null | undefined} [place]
		*   Place in file where the message occurred.
		* @param {string | null | undefined} [origin]
		*   Place in code where the message originates (example:
		*   `'my-package:my-rule'` or `'my-rule'`).
		* @returns {never}
		*   Message.
		* @throws {VFileMessage}
		*   Message.
		*/
		fail(reason, place, origin) {
			const message = this.message(reason, place, origin);
			message.fatal = true;
			throw message;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/vfile@5.3.7/node_modules/vfile/index.js
var init_vfile = __esmMin((() => {
	init_lib$19();
}));
//#endregion
//#region ../../node_modules/.pnpm/unified@10.1.2/node_modules/unified/lib/index.js
/**
* @returns {Processor}
*/
function base() {
	const transformers = trough();
	/** @type {Processor['attachers']} */
	const attachers = [];
	/** @type {Record<string, unknown>} */
	let namespace = {};
	/** @type {boolean|undefined} */
	let frozen;
	let freezeIndex = -1;
	processor.data = data;
	processor.Parser = void 0;
	processor.Compiler = void 0;
	processor.freeze = freeze;
	processor.attachers = attachers;
	processor.use = use;
	processor.parse = parse;
	processor.stringify = stringify;
	processor.run = run;
	processor.runSync = runSync;
	processor.process = process;
	processor.processSync = processSync;
	return processor;
	/** @type {Processor} */
	function processor() {
		const destination = base();
		let index = -1;
		while (++index < attachers.length) destination.use(...attachers[index]);
		destination.data((0, import_extend.default)(true, {}, namespace));
		return destination;
	}
	/**
	* @param {string|Record<string, unknown>} [key]
	* @param {unknown} [value]
	* @returns {unknown}
	*/
	function data(key, value) {
		if (typeof key === "string") {
			if (arguments.length === 2) {
				assertUnfrozen("data", frozen);
				namespace[key] = value;
				return processor;
			}
			return own$5.call(namespace, key) && namespace[key] || null;
		}
		if (key) {
			assertUnfrozen("data", frozen);
			namespace = key;
			return processor;
		}
		return namespace;
	}
	/** @type {Processor['freeze']} */
	function freeze() {
		if (frozen) return processor;
		while (++freezeIndex < attachers.length) {
			const [attacher, ...options] = attachers[freezeIndex];
			if (options[0] === false) continue;
			if (options[0] === true) options[0] = void 0;
			/** @type {Transformer|void} */
			const transformer = attacher.call(processor, ...options);
			if (typeof transformer === "function") transformers.use(transformer);
		}
		frozen = true;
		freezeIndex = Number.POSITIVE_INFINITY;
		return processor;
	}
	/**
	* @param {Pluggable|null|undefined} [value]
	* @param {...unknown} options
	* @returns {Processor}
	*/
	function use(value, ...options) {
		/** @type {Record<string, unknown>|undefined} */
		let settings;
		assertUnfrozen("use", frozen);
		if (value === null || value === void 0) {} else if (typeof value === "function") addPlugin(value, ...options);
		else if (typeof value === "object") {
			if (Array.isArray(value)) addList(value);
			else addPreset(value);
		} else throw new TypeError("Expected usable value, not `" + value + "`");
		if (settings) namespace.settings = Object.assign(namespace.settings || {}, settings);
		return processor;
		/**
		* @param {import('..').Pluggable<unknown[]>} value
		* @returns {void}
		*/
		function add(value) {
			if (typeof value === "function") addPlugin(value);
			else if (typeof value === "object") {
				if (Array.isArray(value)) {
					const [plugin, ...options] = value;
					addPlugin(plugin, ...options);
				} else addPreset(value);
			} else throw new TypeError("Expected usable value, not `" + value + "`");
		}
		/**
		* @param {Preset} result
		* @returns {void}
		*/
		function addPreset(result) {
			addList(result.plugins);
			if (result.settings) settings = Object.assign(settings || {}, result.settings);
		}
		/**
		* @param {PluggableList|null|undefined} [plugins]
		* @returns {void}
		*/
		function addList(plugins) {
			let index = -1;
			if (plugins === null || plugins === void 0) {} else if (Array.isArray(plugins)) while (++index < plugins.length) {
				const thing = plugins[index];
				add(thing);
			}
			else throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
		}
		/**
		* @param {Plugin} plugin
		* @param {...unknown} [value]
		* @returns {void}
		*/
		function addPlugin(plugin, value) {
			let index = -1;
			/** @type {Processor['attachers'][number]|undefined} */
			let entry;
			while (++index < attachers.length) if (attachers[index][0] === plugin) {
				entry = attachers[index];
				break;
			}
			if (entry) {
				if (isPlainObject(entry[1]) && isPlainObject(value)) value = (0, import_extend.default)(true, entry[1], value);
				entry[1] = value;
			} else attachers.push([...arguments]);
		}
	}
	/** @type {Processor['parse']} */
	function parse(doc) {
		processor.freeze();
		const file = vfile(doc);
		const Parser = processor.Parser;
		assertParser("parse", Parser);
		if (newable(Parser, "parse")) return new Parser(String(file), file).parse();
		return Parser(String(file), file);
	}
	/** @type {Processor['stringify']} */
	function stringify(node, doc) {
		processor.freeze();
		const file = vfile(doc);
		const Compiler = processor.Compiler;
		assertCompiler("stringify", Compiler);
		assertNode(node);
		if (newable(Compiler, "compile")) return new Compiler(node, file).compile();
		return Compiler(node, file);
	}
	/**
	* @param {Node} node
	* @param {VFileCompatible|RunCallback} [doc]
	* @param {RunCallback} [callback]
	* @returns {Promise<Node>|void}
	*/
	function run(node, doc, callback) {
		assertNode(node);
		processor.freeze();
		if (!callback && typeof doc === "function") {
			callback = doc;
			doc = void 0;
		}
		if (!callback) return new Promise(executor);
		executor(null, callback);
		/**
		* @param {null|((node: Node) => void)} resolve
		* @param {(error: Error) => void} reject
		* @returns {void}
		*/
		function executor(resolve, reject) {
			transformers.run(node, vfile(doc), done);
			/**
			* @param {Error|null} error
			* @param {Node} tree
			* @param {VFile} file
			* @returns {void}
			*/
			function done(error, tree, file) {
				tree = tree || node;
				if (error) reject(error);
				else if (resolve) resolve(tree);
				else callback(null, tree, file);
			}
		}
	}
	/** @type {Processor['runSync']} */
	function runSync(node, file) {
		/** @type {Node|undefined} */
		let result;
		/** @type {boolean|undefined} */
		let complete;
		processor.run(node, file, done);
		assertDone("runSync", "run", complete);
		return result;
		/**
		* @param {Error|null} [error]
		* @param {Node} [tree]
		* @returns {void}
		*/
		function done(error, tree) {
			bail(error);
			result = tree;
			complete = true;
		}
	}
	/**
	* @param {VFileCompatible} doc
	* @param {ProcessCallback} [callback]
	* @returns {Promise<VFile>|undefined}
	*/
	function process(doc, callback) {
		processor.freeze();
		assertParser("process", processor.Parser);
		assertCompiler("process", processor.Compiler);
		if (!callback) return new Promise(executor);
		executor(null, callback);
		/**
		* @param {null|((file: VFile) => void)} resolve
		* @param {(error?: Error|null|undefined) => void} reject
		* @returns {void}
		*/
		function executor(resolve, reject) {
			const file = vfile(doc);
			processor.run(processor.parse(file), file, (error, tree, file) => {
				if (error || !tree || !file) done(error);
				else {
					/** @type {unknown} */
					const result = processor.stringify(tree, file);
					if (result === void 0 || result === null) {} else if (looksLikeAVFileValue(result)) file.value = result;
					else file.result = result;
					done(error, file);
				}
			});
			/**
			* @param {Error|null|undefined} [error]
			* @param {VFile|undefined} [file]
			* @returns {void}
			*/
			function done(error, file) {
				if (error || !file) reject(error);
				else if (resolve) resolve(file);
				else callback(null, file);
			}
		}
	}
	/** @type {Processor['processSync']} */
	function processSync(doc) {
		/** @type {boolean|undefined} */
		let complete;
		processor.freeze();
		assertParser("processSync", processor.Parser);
		assertCompiler("processSync", processor.Compiler);
		const file = vfile(doc);
		processor.process(file, done);
		assertDone("processSync", "process", complete);
		return file;
		/**
		* @param {Error|null|undefined} [error]
		* @returns {void}
		*/
		function done(error) {
			complete = true;
			bail(error);
		}
	}
}
/**
* Check if `value` is a constructor.
*
* @param {unknown} value
* @param {string} name
* @returns {boolean}
*/
function newable(value, name) {
	return typeof value === "function" && value.prototype && (keys(value.prototype) || name in value.prototype);
}
/**
* Check if `value` is an object with keys.
*
* @param {Record<string, unknown>} value
* @returns {boolean}
*/
function keys(value) {
	/** @type {string} */
	let key;
	for (key in value) if (own$5.call(value, key)) return true;
	return false;
}
/**
* Assert a parser is available.
*
* @param {string} name
* @param {unknown} value
* @returns {asserts value is Parser}
*/
function assertParser(name, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name + "` without `Parser`");
}
/**
* Assert a compiler is available.
*
* @param {string} name
* @param {unknown} value
* @returns {asserts value is Compiler}
*/
function assertCompiler(name, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name + "` without `Compiler`");
}
/**
* Assert the processor is not frozen.
*
* @param {string} name
* @param {unknown} frozen
* @returns {asserts frozen is false}
*/
function assertUnfrozen(name, frozen) {
	if (frozen) throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
/**
* Assert `node` is a unist node.
*
* @param {unknown} node
* @returns {asserts node is Node}
*/
function assertNode(node) {
	if (!isPlainObject(node) || typeof node.type !== "string") throw new TypeError("Expected node, got `" + node + "`");
}
/**
* Assert that `complete` is `true`.
*
* @param {string} name
* @param {string} asyncName
* @param {unknown} complete
* @returns {asserts complete is true}
*/
function assertDone(name, asyncName, complete) {
	if (!complete) throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
}
/**
* @param {VFileCompatible} [value]
* @returns {VFile}
*/
function vfile(value) {
	return looksLikeAVFile(value) ? value : new VFile(value);
}
/**
* @param {VFileCompatible} [value]
* @returns {value is VFile}
*/
function looksLikeAVFile(value) {
	return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
}
/**
* @param {unknown} [value]
* @returns {value is VFileValue}
*/
function looksLikeAVFileValue(value) {
	return typeof value === "string" || (0, import_is_buffer.default)(value);
}
var import_is_buffer, import_extend, unified, own$5;
var init_lib$18 = __esmMin((() => {
	init_bail();
	import_is_buffer = /* @__PURE__ */ __toESM(require_is_buffer(), 1);
	import_extend = /* @__PURE__ */ __toESM(require_extend(), 1);
	init_is_plain_obj();
	init_trough();
	init_vfile();
	unified = base().freeze();
	own$5 = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/.pnpm/unified@10.1.2/node_modules/unified/index.js
var init_unified = __esmMin((() => {
	init_lib$18();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').Blockquote} Blockquote
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `blockquote` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Blockquote} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function blockquote(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: state.wrap(state.all(node), true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_blockquote = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/break.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('hast').Text} Text
* @typedef {import('mdast').Break} Break
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `break` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Break} node
*   mdast node.
* @returns {Array<Element | Text>}
*   hast element content.
*/
function hardBreak(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	state.patch(node, result);
	return [state.applyData(node, result), {
		type: "text",
		value: "\n"
	}];
}
var init_break = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/code.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('hast').Properties} Properties
* @typedef {import('mdast').Code} Code
* @typedef {import('../state.js').State} State

*/
/**
* Turn an mdast `code` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Code} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function code$1(state, node) {
	const value = node.value ? node.value + "\n" : "";
	const lang = node.lang ? node.lang.match(/^[^ \t]+(?=[ \t]|$)/) : null;
	/** @type {Properties} */
	const properties = {};
	if (lang) properties.className = ["language-" + lang];
	/** @type {Element} */
	let result = {
		type: "element",
		tagName: "code",
		properties,
		children: [{
			type: "text",
			value
		}]
	};
	if (node.meta) result.data = { meta: node.meta };
	state.patch(node, result);
	result = state.applyData(node, result);
	result = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [result]
	};
	state.patch(node, result);
	return result;
}
var init_code = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/delete.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').Delete} Delete
* @typedef {import('../state.js').State} State

*/
/**
* Turn an mdast `delete` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Delete} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function strikethrough(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "del",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_delete = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').Emphasis} Emphasis
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `emphasis` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Emphasis} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function emphasis(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "em",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_emphasis = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-util-sanitize-uri@1.2.0/node_modules/micromark-util-sanitize-uri/index.js
/**
* Normalize a URL.
*
* Encode unsafe characters with percent-encoding, skipping already encoded
* sequences.
*
* @param {string} value
*   URI to normalize.
* @returns {string}
*   Normalized URI.
*/
function normalizeUri(value) {
	/** @type {Array<string>} */
	const result = [];
	let index = -1;
	let start = 0;
	let skip = 0;
	while (++index < value.length) {
		const code = value.charCodeAt(index);
		/** @type {string} */
		let replace = "";
		if (code === 37 && asciiAlphanumeric(value.charCodeAt(index + 1)) && asciiAlphanumeric(value.charCodeAt(index + 2))) skip = 2;
		else if (code < 128) {
			if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) replace = String.fromCharCode(code);
		} else if (code > 55295 && code < 57344) {
			const next = value.charCodeAt(index + 1);
			if (code < 56320 && next > 56319 && next < 57344) {
				replace = String.fromCharCode(code, next);
				skip = 1;
			} else replace = "�";
		} else replace = String.fromCharCode(code);
		if (replace) {
			result.push(value.slice(start, index), encodeURIComponent(replace));
			start = index + skip + 1;
			replace = "";
		}
		if (skip) {
			index += skip;
			skip = 0;
		}
	}
	return result.join("") + value.slice(start);
}
var init_micromark_util_sanitize_uri = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
/**
* Turn an mdast `footnoteReference` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {FootnoteReference} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function footnoteReference$1(state, node) {
	const id = String(node.identifier).toUpperCase();
	const safeId = normalizeUri(id.toLowerCase());
	const index = state.footnoteOrder.indexOf(id);
	/** @type {number} */
	let counter;
	if (index === -1) {
		state.footnoteOrder.push(id);
		state.footnoteCounts[id] = 1;
		counter = state.footnoteOrder.length;
	} else {
		state.footnoteCounts[id]++;
		counter = index + 1;
	}
	const reuseCounter = state.footnoteCounts[id];
	/** @type {Element} */
	const link = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + state.clobberPrefix + "fn-" + safeId,
			id: state.clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
			dataFootnoteRef: true,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(counter)
		}]
	};
	state.patch(node, link);
	/** @type {Element} */
	const sup = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [link]
	};
	state.patch(node, sup);
	return state.applyData(node, sup);
}
var init_footnote_reference = __esmMin((() => {
	init_micromark_util_sanitize_uri();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/footnote.js
/**
* Turn an mdast `footnote` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Footnote} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function footnote(state, node) {
	const footnoteById = state.footnoteById;
	let no = 1;
	while (no in footnoteById) no++;
	const identifier = String(no);
	footnoteById[identifier] = {
		type: "footnoteDefinition",
		identifier,
		children: [{
			type: "paragraph",
			children: node.children
		}],
		position: node.position
	};
	return footnoteReference$1(state, {
		type: "footnoteReference",
		identifier,
		position: node.position
	});
}
var init_footnote = __esmMin((() => {
	init_footnote_reference();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/heading.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').Heading} Heading
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `heading` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Heading} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function heading(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "h" + node.depth,
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_heading = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/html.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').HTML} Html
* @typedef {import('../state.js').State} State
* @typedef {import('../../index.js').Raw} Raw
*/
/**
* Turn an mdast `html` node into hast (`raw` node in dangerous mode, otherwise
* nothing).
*
* @param {State} state
*   Info passed around.
* @param {Html} node
*   mdast node.
* @returns {Raw | Element | null}
*   hast node.
*/
function html$2(state, node) {
	if (state.dangerous) {
		/** @type {Raw} */
		const result = {
			type: "raw",
			value: node.value
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	return null;
}
var init_html$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/revert.js
/**
* @typedef {import('hast').ElementContent} ElementContent
*
* @typedef {import('mdast').Content} Content
* @typedef {import('mdast').Reference} Reference
* @typedef {import('mdast').Root} Root
*
* @typedef {import('./state.js').State} State
*/
/**
* @typedef {Root | Content} Nodes
* @typedef {Extract<Nodes, Reference>} References
*/
/**
* Return the content of a reference without definition as plain text.
*
* @param {State} state
*   Info passed around.
* @param {References} node
*   Reference node (image, link).
* @returns {ElementContent | Array<ElementContent>}
*   hast content.
*/
function revert(state, node) {
	const subtype = node.referenceType;
	let suffix = "]";
	if (subtype === "collapsed") suffix += "[]";
	else if (subtype === "full") suffix += "[" + (node.label || node.identifier) + "]";
	if (node.type === "imageReference") return {
		type: "text",
		value: "![" + node.alt + suffix
	};
	const contents = state.all(node);
	const head = contents[0];
	if (head && head.type === "text") head.value = "[" + head.value;
	else contents.unshift({
		type: "text",
		value: "["
	});
	const tail = contents[contents.length - 1];
	if (tail && tail.type === "text") tail.value += suffix;
	else contents.push({
		type: "text",
		value: suffix
	});
	return contents;
}
var init_revert = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
/**
* Turn an mdast `imageReference` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {ImageReference} node
*   mdast node.
* @returns {ElementContent | Array<ElementContent>}
*   hast node.
*/
function imageReference(state, node) {
	const def = state.definition(node.identifier);
	if (!def) return revert(state, node);
	/** @type {Properties} */
	const properties = {
		src: normalizeUri(def.url || ""),
		alt: node.alt
	};
	if (def.title !== null && def.title !== void 0) properties.title = def.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_image_reference = __esmMin((() => {
	init_micromark_util_sanitize_uri();
	init_revert();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/image.js
/**
* Turn an mdast `image` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Image} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function image(state, node) {
	/** @type {Properties} */
	const properties = { src: normalizeUri(node.url) };
	if (node.alt !== null && node.alt !== void 0) properties.alt = node.alt;
	if (node.title !== null && node.title !== void 0) properties.title = node.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_image = __esmMin((() => {
	init_micromark_util_sanitize_uri();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('hast').Text} Text
* @typedef {import('mdast').InlineCode} InlineCode
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `inlineCode` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {InlineCode} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function inlineCode(state, node) {
	/** @type {Text} */
	const text = {
		type: "text",
		value: node.value.replace(/\r?\n|\r/g, " ")
	};
	state.patch(node, text);
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [text]
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_inline_code = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
/**
* Turn an mdast `linkReference` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {LinkReference} node
*   mdast node.
* @returns {ElementContent | Array<ElementContent>}
*   hast node.
*/
function linkReference(state, node) {
	const def = state.definition(node.identifier);
	if (!def) return revert(state, node);
	/** @type {Properties} */
	const properties = { href: normalizeUri(def.url || "") };
	if (def.title !== null && def.title !== void 0) properties.title = def.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_link_reference = __esmMin((() => {
	init_micromark_util_sanitize_uri();
	init_revert();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/link.js
/**
* Turn an mdast `link` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Link} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function link(state, node) {
	/** @type {Properties} */
	const properties = { href: normalizeUri(node.url) };
	if (node.title !== null && node.title !== void 0) properties.title = node.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_link = __esmMin((() => {
	init_micromark_util_sanitize_uri();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/list-item.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('hast').ElementContent} ElementContent
* @typedef {import('hast').Properties} Properties
* @typedef {import('mdast').Content} Content
* @typedef {import('mdast').ListItem} ListItem
* @typedef {import('mdast').Parent} Parent
* @typedef {import('mdast').Root} Root
* @typedef {import('../state.js').State} State
*/
/**
* @typedef {Root | Content} Nodes
* @typedef {Extract<Nodes, Parent>} Parents
*/
/**
* Turn an mdast `listItem` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {ListItem} node
*   mdast node.
* @param {Parents | null | undefined} parent
*   Parent of `node`.
* @returns {Element}
*   hast node.
*/
function listItem(state, node, parent) {
	const results = state.all(node);
	const loose = parent ? listLoose(parent) : listItemLoose(node);
	/** @type {Properties} */
	const properties = {};
	/** @type {Array<ElementContent>} */
	const children = [];
	if (typeof node.checked === "boolean") {
		const head = results[0];
		/** @type {Element} */
		let paragraph;
		if (head && head.type === "element" && head.tagName === "p") paragraph = head;
		else {
			paragraph = {
				type: "element",
				tagName: "p",
				properties: {},
				children: []
			};
			results.unshift(paragraph);
		}
		if (paragraph.children.length > 0) paragraph.children.unshift({
			type: "text",
			value: " "
		});
		paragraph.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: node.checked,
				disabled: true
			},
			children: []
		});
		properties.className = ["task-list-item"];
	}
	let index = -1;
	while (++index < results.length) {
		const child = results[index];
		if (loose || index !== 0 || child.type !== "element" || child.tagName !== "p") children.push({
			type: "text",
			value: "\n"
		});
		if (child.type === "element" && child.tagName === "p" && !loose) children.push(...child.children);
		else children.push(child);
	}
	const tail = results[results.length - 1];
	if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) children.push({
		type: "text",
		value: "\n"
	});
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "li",
		properties,
		children
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
/**
* @param {Parents} node
* @return {Boolean}
*/
function listLoose(node) {
	let loose = false;
	if (node.type === "list") {
		loose = node.spread || false;
		const children = node.children;
		let index = -1;
		while (!loose && ++index < children.length) loose = listItemLoose(children[index]);
	}
	return loose;
}
/**
* @param {ListItem} node
* @return {Boolean}
*/
function listItemLoose(node) {
	const spread = node.spread;
	return spread === void 0 || spread === null ? node.children.length > 1 : spread;
}
var init_list_item = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/list.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('hast').Properties} Properties
* @typedef {import('mdast').List} List
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `list` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {List} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function list(state, node) {
	/** @type {Properties} */
	const properties = {};
	const results = state.all(node);
	let index = -1;
	if (typeof node.start === "number" && node.start !== 1) properties.start = node.start;
	while (++index < results.length) {
		const child = results[index];
		if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
			properties.className = ["contains-task-list"];
			break;
		}
	}
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: node.ordered ? "ol" : "ul",
		properties,
		children: state.wrap(results, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_list = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').Paragraph} Paragraph
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `paragraph` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Paragraph} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function paragraph(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "p",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_paragraph = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/root.js
/**
* @typedef {import('hast').Root} HastRoot
* @typedef {import('hast').Element} HastElement
* @typedef {import('mdast').Root} MdastRoot
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `root` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {MdastRoot} node
*   mdast node.
* @returns {HastRoot | HastElement}
*   hast node.
*/
function root$1(state, node) {
	/** @type {HastRoot} */
	const result = {
		type: "root",
		children: state.wrap(state.all(node))
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_root = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/strong.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').Strong} Strong
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `strong` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Strong} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function strong(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_strong = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-position@4.0.4/node_modules/unist-util-position/lib/index.js
/**
* Get the positional info of `node`.
*
* @param {NodeLike | Node | null | undefined} [node]
*   Node.
* @returns {Position}
*   Position.
*/
function position(node) {
	return {
		start: pointStart(node),
		end: pointEnd(node)
	};
}
/**
* Get the positional info of `node`.
*
* @param {'start' | 'end'} type
*   Side.
* @returns
*   Getter.
*/
function point(type) {
	return point;
	/**
	* Get the point info of `node` at a bound side.
	*
	* @param {NodeLike | Node | null | undefined} [node]
	* @returns {Point}
	*/
	function point(node) {
		const point = node && node.position && node.position[type] || {};
		return {
			line: point.line || null,
			column: point.column || null,
			offset: point.offset > -1 ? point.offset : null
		};
	}
}
var pointStart, pointEnd;
var init_lib$17 = __esmMin((() => {
	pointStart = point("start");
	pointEnd = point("end");
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-position@4.0.4/node_modules/unist-util-position/index.js
var init_unist_util_position = __esmMin((() => {
	init_lib$17();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/table.js
/**
* Turn an mdast `table` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Table} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function table(state, node) {
	const rows = state.all(node);
	const firstRow = rows.shift();
	/** @type {Array<Element>} */
	const tableContent = [];
	if (firstRow) {
		/** @type {Element} */
		const head = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: state.wrap([firstRow], true)
		};
		state.patch(node.children[0], head);
		tableContent.push(head);
	}
	if (rows.length > 0) {
		/** @type {Element} */
		const body = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: state.wrap(rows, true)
		};
		const start = pointStart(node.children[1]);
		const end = pointEnd(node.children[node.children.length - 1]);
		if (start.line && end.line) body.position = {
			start,
			end
		};
		tableContent.push(body);
	}
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "table",
		properties: {},
		children: state.wrap(tableContent, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_table = __esmMin((() => {
	init_unist_util_position();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/table-row.js
/**
* @typedef {import('hast').Properties} Properties
* @typedef {import('hast').Element} Element
* @typedef {import('hast').ElementContent} ElementContent
* @typedef {import('mdast').Content} Content
* @typedef {import('mdast').Parent} Parent
* @typedef {import('mdast').Root} Root
* @typedef {import('mdast').TableRow} TableRow
* @typedef {import('../state.js').State} State
*/
/**
* @typedef {Root | Content} Nodes
* @typedef {Extract<Nodes, Parent>} Parents
*/
/**
* Turn an mdast `tableRow` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {TableRow} node
*   mdast node.
* @param {Parents | null | undefined} parent
*   Parent of `node`.
* @returns {Element}
*   hast node.
*/
function tableRow(state, node, parent) {
	const siblings = parent ? parent.children : void 0;
	const tagName = (siblings ? siblings.indexOf(node) : 1) === 0 ? "th" : "td";
	const align = parent && parent.type === "table" ? parent.align : void 0;
	const length = align ? align.length : node.children.length;
	let cellIndex = -1;
	/** @type {Array<ElementContent>} */
	const cells = [];
	while (++cellIndex < length) {
		const cell = node.children[cellIndex];
		/** @type {Properties} */
		const properties = {};
		const alignValue = align ? align[cellIndex] : void 0;
		if (alignValue) properties.align = alignValue;
		/** @type {Element} */
		let result = {
			type: "element",
			tagName,
			properties,
			children: []
		};
		if (cell) {
			result.children = state.all(cell);
			state.patch(cell, result);
			result = state.applyData(node, result);
		}
		cells.push(result);
	}
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: state.wrap(cells, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_table_row = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').TableCell} TableCell
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `tableCell` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {TableCell} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function tableCell(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "td",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_table_cell = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/text.js
/**
* Turn an mdast `text` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {MdastText} node
*   mdast node.
* @returns {HastText | HastElement}
*   hast node.
*/
function text$2(state, node) {
	/** @type {HastText} */
	const result = {
		type: "text",
		value: trimLines(String(node.value))
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_text = __esmMin((() => {
	init_trim_lines();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
/**
* @typedef {import('hast').Element} Element
* @typedef {import('mdast').ThematicBreak} ThematicBreak
* @typedef {import('../state.js').State} State
*/
/**
* Turn an mdast `thematicBreak` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {ThematicBreak} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function thematicBreak(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
var init_thematic_break = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/handlers/index.js
function ignore() {
	return null;
}
var handlers;
var init_handlers = __esmMin((() => {
	init_blockquote();
	init_break();
	init_code();
	init_delete();
	init_emphasis();
	init_footnote_reference();
	init_footnote();
	init_heading();
	init_html$2();
	init_image_reference();
	init_image();
	init_inline_code();
	init_link_reference();
	init_link();
	init_list_item();
	init_list();
	init_paragraph();
	init_root();
	init_strong();
	init_table();
	init_table_row();
	init_table_cell();
	init_text();
	init_thematic_break();
	handlers = {
		blockquote,
		break: hardBreak,
		code: code$1,
		delete: strikethrough,
		emphasis,
		footnoteReference: footnoteReference$1,
		footnote,
		heading,
		html: html$2,
		imageReference,
		image,
		inlineCode,
		linkReference,
		link,
		listItem,
		list,
		paragraph,
		root: root$1,
		strong,
		table,
		tableCell,
		tableRow,
		text: text$2,
		thematicBreak,
		toml: ignore,
		yaml: ignore,
		definition: ignore,
		footnoteDefinition: ignore
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-generated@2.0.1/node_modules/unist-util-generated/lib/index.js
/**
* @typedef PointLike
* @property {number | null | undefined} [line]
* @property {number | null | undefined} [column]
* @property {number | null | undefined} [offset]
*
* @typedef PositionLike
* @property {PointLike | null | undefined} [start]
* @property {PointLike | null | undefined} [end]
*
* @typedef NodeLike
* @property {PositionLike | null | undefined} [position]
*/
/**
* Check if `node` is generated.
*
* @param {NodeLike | null | undefined} [node]
*   Node to check.
* @returns {boolean}
*   Whether `node` is generated (does not have positional info).
*/
function generated(node) {
	return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}
var init_lib$16 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-generated@2.0.1/node_modules/unist-util-generated/index.js
var init_unist_util_generated = __esmMin((() => {
	init_lib$16();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-definitions@5.1.2/node_modules/mdast-util-definitions/lib/index.js
/**
* Find definitions in `tree`.
*
* Uses CommonMark precedence, which means that earlier definitions are
* preferred over duplicate later definitions.
*
* @param {Node} tree
*   Tree to check.
* @returns {GetDefinition}
*   Getter.
*/
function definitions(tree) {
	/** @type {Record<string, Definition>} */
	const cache = Object.create(null);
	if (!tree || !tree.type) throw new Error("mdast-util-definitions expected node");
	visit(tree, "definition", (definition) => {
		const id = clean(definition.identifier);
		if (id && !own$4.call(cache, id)) cache[id] = definition;
	});
	return definition;
	/** @type {GetDefinition} */
	function definition(identifier) {
		const id = clean(identifier);
		return id && own$4.call(cache, id) ? cache[id] : null;
	}
}
/**
* @param {string | null | undefined} [value]
* @returns {string}
*/
function clean(value) {
	return String(value || "").toUpperCase();
}
var own$4;
var init_lib$15 = __esmMin((() => {
	init_unist_util_visit();
	own$4 = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-definitions@5.1.2/node_modules/mdast-util-definitions/index.js
var init_mdast_util_definitions = __esmMin((() => {
	init_lib$15();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/state.js
/**
* Create `state` from an mdast tree.
*
* @param {MdastNodes} tree
*   mdast node to transform.
* @param {Options | null | undefined} [options]
*   Configuration.
* @returns {State}
*   `state` function.
*/
function createState(tree, options) {
	const settings = options || {};
	const dangerous = settings.allowDangerousHtml || false;
	/** @type {Record<string, MdastFootnoteDefinition>} */
	const footnoteById = {};
	state.dangerous = dangerous;
	state.clobberPrefix = settings.clobberPrefix === void 0 || settings.clobberPrefix === null ? "user-content-" : settings.clobberPrefix;
	state.footnoteLabel = settings.footnoteLabel || "Footnotes";
	state.footnoteLabelTagName = settings.footnoteLabelTagName || "h2";
	state.footnoteLabelProperties = settings.footnoteLabelProperties || { className: ["sr-only"] };
	state.footnoteBackLabel = settings.footnoteBackLabel || "Back to content";
	state.unknownHandler = settings.unknownHandler;
	state.passThrough = settings.passThrough;
	state.handlers = {
		...handlers,
		...settings.handlers
	};
	state.definition = definitions(tree);
	state.footnoteById = footnoteById;
	/** @type {Array<string>} */
	state.footnoteOrder = [];
	/** @type {Record<string, number>} */
	state.footnoteCounts = {};
	state.patch = patch;
	state.applyData = applyData;
	state.one = oneBound;
	state.all = allBound;
	state.wrap = wrap;
	state.augment = augment;
	visit(tree, "footnoteDefinition", (definition) => {
		const id = String(definition.identifier).toUpperCase();
		if (!own$3.call(footnoteById, id)) footnoteById[id] = definition;
	});
	return state;
	/**
	* Finalise the created `right`, a hast node, from `left`, an mdast node.
	*
	* @param {MdastNodeWithData | PositionLike | null | undefined} left
	* @param {HastElementContent} right
	* @returns {HastElementContent}
	*/
	/* c8 ignore start */
	function augment(left, right) {
		if (left && "data" in left && left.data) {
			/** @type {MdastData} */
			const data = left.data;
			if (data.hName) {
				if (right.type !== "element") right = {
					type: "element",
					tagName: "",
					properties: {},
					children: []
				};
				right.tagName = data.hName;
			}
			if (right.type === "element" && data.hProperties) right.properties = {
				...right.properties,
				...data.hProperties
			};
			if ("children" in right && right.children && data.hChildren) right.children = data.hChildren;
		}
		if (left) {
			const ctx = "type" in left ? left : { position: left };
			if (!generated(ctx)) right.position = {
				start: pointStart(ctx),
				end: pointEnd(ctx)
			};
		}
		return right;
	}
	/* c8 ignore stop */
	/**
	* Create an element for `node`.
	*
	* @type {HFunctionProps}
	*/
	/* c8 ignore start */
	function state(node, tagName, props, children) {
		if (Array.isArray(props)) {
			children = props;
			props = {};
		}
		return augment(node, {
			type: "element",
			tagName,
			properties: props || {},
			children: children || []
		});
	}
	/* c8 ignore stop */
	/**
	* Transform an mdast node into a hast node.
	*
	* @param {MdastNodes} node
	*   mdast node.
	* @param {MdastParents | null | undefined} [parent]
	*   Parent of `node`.
	* @returns {HastElementContent | Array<HastElementContent> | null | undefined}
	*   Resulting hast node.
	*/
	function oneBound(node, parent) {
		return one$1(state, node, parent);
	}
	/**
	* Transform the children of an mdast node into hast nodes.
	*
	* @param {MdastNodes} parent
	*   mdast node to compile
	* @returns {Array<HastElementContent>}
	*   Resulting hast nodes.
	*/
	function allBound(parent) {
		return all$1(state, parent);
	}
}
/**
* Copy a node’s positional info.
*
* @param {MdastNodes} from
*   mdast node to copy from.
* @param {HastNodes} to
*   hast node to copy into.
* @returns {void}
*   Nothing.
*/
function patch(from, to) {
	if (from.position) to.position = position(from);
}
/**
* Honor the `data` of `from` and maybe generate an element instead of `to`.
*
* @template {HastNodes} Type
*   Node type.
* @param {MdastNodes} from
*   mdast node to use data from.
* @param {Type} to
*   hast node to change.
* @returns {Type | HastElement}
*   Nothing.
*/
function applyData(from, to) {
	/** @type {Type | HastElement} */
	let result = to;
	if (from && from.data) {
		const hName = from.data.hName;
		const hChildren = from.data.hChildren;
		const hProperties = from.data.hProperties;
		if (typeof hName === "string") {
			if (result.type === "element") result.tagName = hName;
			else result = {
				type: "element",
				tagName: hName,
				properties: {},
				children: []
			};
		}
		if (result.type === "element" && hProperties) result.properties = {
			...result.properties,
			...hProperties
		};
		if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) result.children = hChildren;
	}
	return result;
}
/**
* Transform an mdast node into a hast node.
*
* @param {State} state
*   Info passed around.
* @param {MdastNodes} node
*   mdast node.
* @param {MdastParents | null | undefined} [parent]
*   Parent of `node`.
* @returns {HastElementContent | Array<HastElementContent> | null | undefined}
*   Resulting hast node.
*/
function one$1(state, node, parent) {
	const type = node && node.type;
	if (!type) throw new Error("Expected node, got `" + node + "`");
	if (own$3.call(state.handlers, type)) return state.handlers[type](state, node, parent);
	if (state.passThrough && state.passThrough.includes(type)) return "children" in node ? {
		...node,
		children: all$1(state, node)
	} : node;
	if (state.unknownHandler) return state.unknownHandler(state, node, parent);
	return defaultUnknownHandler(state, node);
}
/**
* Transform the children of an mdast node into hast nodes.
*
* @param {State} state
*   Info passed around.
* @param {MdastNodes} parent
*   mdast node to compile
* @returns {Array<HastElementContent>}
*   Resulting hast nodes.
*/
function all$1(state, parent) {
	/** @type {Array<HastElementContent>} */
	const values = [];
	if ("children" in parent) {
		const nodes = parent.children;
		let index = -1;
		while (++index < nodes.length) {
			const result = one$1(state, nodes[index], parent);
			if (result) {
				if (index && nodes[index - 1].type === "break") {
					if (!Array.isArray(result) && result.type === "text") result.value = result.value.replace(/^\s+/, "");
					if (!Array.isArray(result) && result.type === "element") {
						const head = result.children[0];
						if (head && head.type === "text") head.value = head.value.replace(/^\s+/, "");
					}
				}
				if (Array.isArray(result)) values.push(...result);
				else values.push(result);
			}
		}
	}
	return values;
}
/**
* Transform an unknown node.
*
* @param {State} state
*   Info passed around.
* @param {MdastNodes} node
*   Unknown mdast node.
* @returns {HastText | HastElement}
*   Resulting hast node.
*/
function defaultUnknownHandler(state, node) {
	const data = node.data || {};
	/** @type {HastText | HastElement} */
	const result = "value" in node && !(own$3.call(data, "hProperties") || own$3.call(data, "hChildren")) ? {
		type: "text",
		value: node.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: all$1(state, node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
/**
* Wrap `nodes` with line endings between each node.
*
* @template {HastContent} Type
*   Node type.
* @param {Array<Type>} nodes
*   List of nodes to wrap.
* @param {boolean | null | undefined} [loose=false]
*   Whether to add line endings at start and end.
* @returns {Array<Type | HastText>}
*   Wrapped nodes.
*/
function wrap(nodes, loose) {
	/** @type {Array<Type | HastText>} */
	const result = [];
	let index = -1;
	if (loose) result.push({
		type: "text",
		value: "\n"
	});
	while (++index < nodes.length) {
		if (index) result.push({
			type: "text",
			value: "\n"
		});
		result.push(nodes[index]);
	}
	if (loose && nodes.length > 0) result.push({
		type: "text",
		value: "\n"
	});
	return result;
}
var own$3;
var init_state = __esmMin((() => {
	init_unist_util_visit();
	init_unist_util_position();
	init_unist_util_generated();
	init_mdast_util_definitions();
	init_handlers();
	own$3 = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/footer.js
/**
* Generate a hast footer for called footnote definitions.
*
* @param {State} state
*   Info passed around.
* @returns {Element | undefined}
*   `section` element or `undefined`.
*/
function footer(state) {
	/** @type {Array<ElementContent>} */
	const listItems = [];
	let index = -1;
	while (++index < state.footnoteOrder.length) {
		const def = state.footnoteById[state.footnoteOrder[index]];
		if (!def) continue;
		const content = state.all(def);
		const id = String(def.identifier).toUpperCase();
		const safeId = normalizeUri(id.toLowerCase());
		let referenceIndex = 0;
		/** @type {Array<ElementContent>} */
		const backReferences = [];
		while (++referenceIndex <= state.footnoteCounts[id]) {
			/** @type {Element} */
			const backReference = {
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + state.clobberPrefix + "fnref-" + safeId + (referenceIndex > 1 ? "-" + referenceIndex : ""),
					dataFootnoteBackref: true,
					className: ["data-footnote-backref"],
					ariaLabel: state.footnoteBackLabel
				},
				children: [{
					type: "text",
					value: "↩"
				}]
			};
			if (referenceIndex > 1) backReference.children.push({
				type: "element",
				tagName: "sup",
				children: [{
					type: "text",
					value: String(referenceIndex)
				}]
			});
			if (backReferences.length > 0) backReferences.push({
				type: "text",
				value: " "
			});
			backReferences.push(backReference);
		}
		const tail = content[content.length - 1];
		if (tail && tail.type === "element" && tail.tagName === "p") {
			const tailTail = tail.children[tail.children.length - 1];
			if (tailTail && tailTail.type === "text") tailTail.value += " ";
			else tail.children.push({
				type: "text",
				value: " "
			});
			tail.children.push(...backReferences);
		} else content.push(...backReferences);
		/** @type {Element} */
		const listItem = {
			type: "element",
			tagName: "li",
			properties: { id: state.clobberPrefix + "fn-" + safeId },
			children: state.wrap(content, true)
		};
		state.patch(def, listItem);
		listItems.push(listItem);
	}
	if (listItems.length === 0) return;
	return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: true,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: state.footnoteLabelTagName,
				properties: {
					...JSON.parse(JSON.stringify(state.footnoteLabelProperties)),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: state.footnoteLabel
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: state.wrap(listItems, true)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
var init_footer = __esmMin((() => {
	init_micromark_util_sanitize_uri();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/lib/index.js
/**
* Transform mdast to hast.
*
* ##### Notes
*
* ###### HTML
*
* Raw HTML is available in mdast as `html` nodes and can be embedded in hast
* as semistandard `raw` nodes.
* Most utilities ignore `raw` nodes but two notable ones don’t:
*
* *   `hast-util-to-html` also has an option `allowDangerousHtml` which will
*     output the raw HTML.
*     This is typically discouraged as noted by the option name but is useful
*     if you completely trust authors
* *   `hast-util-raw` can handle the raw embedded HTML strings by parsing them
*     into standard hast nodes (`element`, `text`, etc).
*     This is a heavy task as it needs a full HTML parser, but it is the only
*     way to support untrusted content
*
* ###### Footnotes
*
* Many options supported here relate to footnotes.
* Footnotes are not specified by CommonMark, which we follow by default.
* They are supported by GitHub, so footnotes can be enabled in markdown with
* `mdast-util-gfm`.
*
* The options `footnoteBackLabel` and `footnoteLabel` define natural language
* that explains footnotes, which is hidden for sighted users but shown to
* assistive technology.
* When your page is not in English, you must define translated values.
*
* Back references use ARIA attributes, but the section label itself uses a
* heading that is hidden with an `sr-only` class.
* To show it to sighted users, define different attributes in
* `footnoteLabelProperties`.
*
* ###### Clobbering
*
* Footnotes introduces a problem, as it links footnote calls to footnote
* definitions on the page through `id` attributes generated from user content,
* which results in DOM clobbering.
*
* DOM clobbering is this:
*
* ```html
* <p id=x></p>
* <script>alert(x) // `x` now refers to the DOM `p#x` element<\/script>
* ```
*
* Elements by their ID are made available by browsers on the `window` object,
* which is a security risk.
* Using a prefix solves this problem.
*
* More information on how to handle clobbering and the prefix is explained in
* Example: headings (DOM clobbering) in `rehype-sanitize`.
*
* ###### Unknown nodes
*
* Unknown nodes are nodes with a type that isn’t in `handlers` or `passThrough`.
* The default behavior for unknown nodes is:
*
* *   when the node has a `value` (and doesn’t have `data.hName`,
*     `data.hProperties`, or `data.hChildren`, see later), create a hast `text`
*     node
* *   otherwise, create a `<div>` element (which could be changed with
*     `data.hName`), with its children mapped from mdast to hast as well
*
* This behavior can be changed by passing an `unknownHandler`.
*
* @param {MdastNodes} tree
*   mdast tree.
* @param {Options | null | undefined} [options]
*   Configuration.
* @returns {HastNodes | null | undefined}
*   hast tree.
*/
function toHast(tree, options) {
	const state = createState(tree, options);
	const node = state.one(tree, null);
	const foot = footer(state);
	if (foot) node.children.push({
		type: "text",
		value: "\n"
	}, foot);
	return Array.isArray(node) ? {
		type: "root",
		children: node
	} : node;
}
var init_lib$14 = __esmMin((() => {
	init_footer();
	init_state();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/index.js
var init_mdast_util_to_hast = __esmMin((() => {
	init_handlers();
	init_state();
	init_lib$14();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-rehype@10.1.0/node_modules/remark-rehype/lib/index.js
/**
* Bridge-mode.
* Runs the destination with the new hast tree.
*
* @type {import('unified').Plugin<[Processor, Options?], MdastRoot>}
*/
function bridge(destination, options) {
	return (node, file, next) => {
		destination.run(toHast(node, options), file, (error) => {
			next(error);
		});
	};
}
/**
* Mutate-mode.
* Further plugins run on the hast tree.
*
* @type {import('unified').Plugin<[Options?]|void[], MdastRoot, HastRoot>}
*/
function mutate(options) {
	return (node) => toHast(node, options);
}
var remarkRehype;
var init_lib$13 = __esmMin((() => {
	init_mdast_util_to_hast();
	remarkRehype = (function(destination, options) {
		return destination && "run" in destination ? bridge(destination, options) : mutate(destination || options);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-rehype@10.1.0/node_modules/remark-rehype/index.js
var init_remark_rehype = __esmMin((() => {
	init_mdast_util_to_hast();
	init_lib$13();
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/schema.js
var Schema;
var init_schema = __esmMin((() => {
	Schema = class {
		/**
		* @constructor
		* @param {Properties} property
		* @param {Normal} normal
		* @param {string} [space]
		*/
		constructor(property, normal, space) {
			this.property = property;
			this.normal = normal;
			if (space) this.space = space;
		}
	};
	/** @type {Properties} */
	Schema.prototype.property = {};
	/** @type {Normal} */
	Schema.prototype.normal = {};
	/** @type {string|null} */
	Schema.prototype.space = null;
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/merge.js
/**
* @param {Schema[]} definitions
* @param {string} [space]
* @returns {Schema}
*/
function merge(definitions, space) {
	/** @type {Properties} */
	const property = {};
	/** @type {Normal} */
	const normal = {};
	let index = -1;
	while (++index < definitions.length) {
		Object.assign(property, definitions[index].property);
		Object.assign(normal, definitions[index].normal);
	}
	return new Schema(property, normal, space);
}
var init_merge = __esmMin((() => {
	init_schema();
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/normalize.js
/**
* @param {string} value
* @returns {string}
*/
function normalize(value) {
	return value.toLowerCase();
}
var init_normalize = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/info.js
var Info;
var init_info = __esmMin((() => {
	Info = class {
		/**
		* @constructor
		* @param {string} property
		* @param {string} attribute
		*/
		constructor(property, attribute) {
			/** @type {string} */
			this.property = property;
			/** @type {string} */
			this.attribute = attribute;
		}
	};
	/** @type {string|null} */
	Info.prototype.space = null;
	Info.prototype.boolean = false;
	Info.prototype.booleanish = false;
	Info.prototype.overloadedBoolean = false;
	Info.prototype.number = false;
	Info.prototype.commaSeparated = false;
	Info.prototype.spaceSeparated = false;
	Info.prototype.commaOrSpaceSeparated = false;
	Info.prototype.mustUseProperty = false;
	Info.prototype.defined = false;
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/types.js
var types_exports = /* @__PURE__ */ __exportAll({
	boolean: () => boolean,
	booleanish: () => booleanish,
	commaOrSpaceSeparated: () => commaOrSpaceSeparated,
	commaSeparated: () => commaSeparated,
	number: () => number,
	overloadedBoolean: () => overloadedBoolean,
	spaceSeparated: () => spaceSeparated
});
function increment() {
	return 2 ** ++powers;
}
var powers, boolean, booleanish, overloadedBoolean, number, spaceSeparated, commaSeparated, commaOrSpaceSeparated;
var init_types = __esmMin((() => {
	powers = 0;
	boolean = increment();
	booleanish = increment();
	overloadedBoolean = increment();
	number = increment();
	spaceSeparated = increment();
	commaSeparated = increment();
	commaOrSpaceSeparated = increment();
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/defined-info.js
/**
* @param {DefinedInfo} values
* @param {string} key
* @param {unknown} value
*/
function mark(values, key, value) {
	if (value) values[key] = value;
}
var checks, DefinedInfo;
var init_defined_info = __esmMin((() => {
	init_info();
	init_types();
	checks = Object.keys(types_exports);
	DefinedInfo = class extends Info {
		/**
		* @constructor
		* @param {string} property
		* @param {string} attribute
		* @param {number|null} [mask]
		* @param {string} [space]
		*/
		constructor(property, attribute, mask, space) {
			let index = -1;
			super(property, attribute);
			mark(this, "space", space);
			if (typeof mask === "number") while (++index < checks.length) {
				const check = checks[index];
				mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
			}
		}
	};
	DefinedInfo.prototype.defined = true;
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js
/**
* @param {Definition} definition
* @returns {Schema}
*/
function create(definition) {
	/** @type {Properties} */
	const property = {};
	/** @type {Normal} */
	const normal = {};
	/** @type {string} */
	let prop;
	for (prop in definition.properties) if (own$2.call(definition.properties, prop)) {
		const value = definition.properties[prop];
		const info = new DefinedInfo(prop, definition.transform(definition.attributes || {}, prop), value, definition.space);
		if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) info.mustUseProperty = true;
		property[prop] = info;
		normal[normalize(prop)] = prop;
		normal[normalize(info.attribute)] = prop;
	}
	return new Schema(property, normal, definition.space);
}
var own$2;
var init_create = __esmMin((() => {
	init_normalize();
	init_schema();
	init_defined_info();
	own$2 = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xlink.js
var xlink;
var init_xlink = __esmMin((() => {
	init_create();
	xlink = create({
		space: "xlink",
		transform(_, prop) {
			return "xlink:" + prop.slice(5).toLowerCase();
		},
		properties: {
			xLinkActuate: null,
			xLinkArcRole: null,
			xLinkHref: null,
			xLinkRole: null,
			xLinkShow: null,
			xLinkTitle: null,
			xLinkType: null
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xml.js
var xml;
var init_xml = __esmMin((() => {
	init_create();
	xml = create({
		space: "xml",
		transform(_, prop) {
			return "xml:" + prop.slice(3).toLowerCase();
		},
		properties: {
			xmlLang: null,
			xmlBase: null,
			xmlSpace: null
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-sensitive-transform.js
/**
* @param {Record<string, string>} attributes
* @param {string} attribute
* @returns {string}
*/
function caseSensitiveTransform(attributes, attribute) {
	return attribute in attributes ? attributes[attribute] : attribute;
}
var init_case_sensitive_transform = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-insensitive-transform.js
/**
* @param {Record<string, string>} attributes
* @param {string} property
* @returns {string}
*/
function caseInsensitiveTransform(attributes, property) {
	return caseSensitiveTransform(attributes, property.toLowerCase());
}
var init_case_insensitive_transform = __esmMin((() => {
	init_case_sensitive_transform();
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xmlns.js
var xmlns;
var init_xmlns = __esmMin((() => {
	init_create();
	init_case_insensitive_transform();
	xmlns = create({
		space: "xmlns",
		attributes: { xmlnsxlink: "xmlns:xlink" },
		transform: caseInsensitiveTransform,
		properties: {
			xmlns: null,
			xmlnsXLink: null
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/aria.js
var aria;
var init_aria = __esmMin((() => {
	init_types();
	init_create();
	aria = create({
		transform(_, prop) {
			return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
		},
		properties: {
			ariaActiveDescendant: null,
			ariaAtomic: booleanish,
			ariaAutoComplete: null,
			ariaBusy: booleanish,
			ariaChecked: booleanish,
			ariaColCount: number,
			ariaColIndex: number,
			ariaColSpan: number,
			ariaControls: spaceSeparated,
			ariaCurrent: null,
			ariaDescribedBy: spaceSeparated,
			ariaDetails: null,
			ariaDisabled: booleanish,
			ariaDropEffect: spaceSeparated,
			ariaErrorMessage: null,
			ariaExpanded: booleanish,
			ariaFlowTo: spaceSeparated,
			ariaGrabbed: booleanish,
			ariaHasPopup: null,
			ariaHidden: booleanish,
			ariaInvalid: null,
			ariaKeyShortcuts: null,
			ariaLabel: null,
			ariaLabelledBy: spaceSeparated,
			ariaLevel: number,
			ariaLive: null,
			ariaModal: booleanish,
			ariaMultiLine: booleanish,
			ariaMultiSelectable: booleanish,
			ariaOrientation: null,
			ariaOwns: spaceSeparated,
			ariaPlaceholder: null,
			ariaPosInSet: number,
			ariaPressed: booleanish,
			ariaReadOnly: booleanish,
			ariaRelevant: null,
			ariaRequired: booleanish,
			ariaRoleDescription: spaceSeparated,
			ariaRowCount: number,
			ariaRowIndex: number,
			ariaRowSpan: number,
			ariaSelected: booleanish,
			ariaSetSize: number,
			ariaSort: null,
			ariaValueMax: number,
			ariaValueMin: number,
			ariaValueNow: number,
			ariaValueText: null,
			role: null
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/html.js
var html$1;
var init_html$1 = __esmMin((() => {
	init_types();
	init_create();
	init_case_insensitive_transform();
	html$1 = create({
		space: "html",
		attributes: {
			acceptcharset: "accept-charset",
			classname: "class",
			htmlfor: "for",
			httpequiv: "http-equiv"
		},
		transform: caseInsensitiveTransform,
		mustUseProperty: [
			"checked",
			"multiple",
			"muted",
			"selected"
		],
		properties: {
			abbr: null,
			accept: commaSeparated,
			acceptCharset: spaceSeparated,
			accessKey: spaceSeparated,
			action: null,
			allow: null,
			allowFullScreen: boolean,
			allowPaymentRequest: boolean,
			allowUserMedia: boolean,
			alt: null,
			as: null,
			async: boolean,
			autoCapitalize: null,
			autoComplete: spaceSeparated,
			autoFocus: boolean,
			autoPlay: boolean,
			blocking: spaceSeparated,
			capture: null,
			charSet: null,
			checked: boolean,
			cite: null,
			className: spaceSeparated,
			cols: number,
			colSpan: null,
			content: null,
			contentEditable: booleanish,
			controls: boolean,
			controlsList: spaceSeparated,
			coords: number | commaSeparated,
			crossOrigin: null,
			data: null,
			dateTime: null,
			decoding: null,
			default: boolean,
			defer: boolean,
			dir: null,
			dirName: null,
			disabled: boolean,
			download: overloadedBoolean,
			draggable: booleanish,
			encType: null,
			enterKeyHint: null,
			fetchPriority: null,
			form: null,
			formAction: null,
			formEncType: null,
			formMethod: null,
			formNoValidate: boolean,
			formTarget: null,
			headers: spaceSeparated,
			height: number,
			hidden: boolean,
			high: number,
			href: null,
			hrefLang: null,
			htmlFor: spaceSeparated,
			httpEquiv: spaceSeparated,
			id: null,
			imageSizes: null,
			imageSrcSet: null,
			inert: boolean,
			inputMode: null,
			integrity: null,
			is: null,
			isMap: boolean,
			itemId: null,
			itemProp: spaceSeparated,
			itemRef: spaceSeparated,
			itemScope: boolean,
			itemType: spaceSeparated,
			kind: null,
			label: null,
			lang: null,
			language: null,
			list: null,
			loading: null,
			loop: boolean,
			low: number,
			manifest: null,
			max: null,
			maxLength: number,
			media: null,
			method: null,
			min: null,
			minLength: number,
			multiple: boolean,
			muted: boolean,
			name: null,
			nonce: null,
			noModule: boolean,
			noValidate: boolean,
			onAbort: null,
			onAfterPrint: null,
			onAuxClick: null,
			onBeforeMatch: null,
			onBeforePrint: null,
			onBeforeToggle: null,
			onBeforeUnload: null,
			onBlur: null,
			onCancel: null,
			onCanPlay: null,
			onCanPlayThrough: null,
			onChange: null,
			onClick: null,
			onClose: null,
			onContextLost: null,
			onContextMenu: null,
			onContextRestored: null,
			onCopy: null,
			onCueChange: null,
			onCut: null,
			onDblClick: null,
			onDrag: null,
			onDragEnd: null,
			onDragEnter: null,
			onDragExit: null,
			onDragLeave: null,
			onDragOver: null,
			onDragStart: null,
			onDrop: null,
			onDurationChange: null,
			onEmptied: null,
			onEnded: null,
			onError: null,
			onFocus: null,
			onFormData: null,
			onHashChange: null,
			onInput: null,
			onInvalid: null,
			onKeyDown: null,
			onKeyPress: null,
			onKeyUp: null,
			onLanguageChange: null,
			onLoad: null,
			onLoadedData: null,
			onLoadedMetadata: null,
			onLoadEnd: null,
			onLoadStart: null,
			onMessage: null,
			onMessageError: null,
			onMouseDown: null,
			onMouseEnter: null,
			onMouseLeave: null,
			onMouseMove: null,
			onMouseOut: null,
			onMouseOver: null,
			onMouseUp: null,
			onOffline: null,
			onOnline: null,
			onPageHide: null,
			onPageShow: null,
			onPaste: null,
			onPause: null,
			onPlay: null,
			onPlaying: null,
			onPopState: null,
			onProgress: null,
			onRateChange: null,
			onRejectionHandled: null,
			onReset: null,
			onResize: null,
			onScroll: null,
			onScrollEnd: null,
			onSecurityPolicyViolation: null,
			onSeeked: null,
			onSeeking: null,
			onSelect: null,
			onSlotChange: null,
			onStalled: null,
			onStorage: null,
			onSubmit: null,
			onSuspend: null,
			onTimeUpdate: null,
			onToggle: null,
			onUnhandledRejection: null,
			onUnload: null,
			onVolumeChange: null,
			onWaiting: null,
			onWheel: null,
			open: boolean,
			optimum: number,
			pattern: null,
			ping: spaceSeparated,
			placeholder: null,
			playsInline: boolean,
			popover: null,
			popoverTarget: null,
			popoverTargetAction: null,
			poster: null,
			preload: null,
			readOnly: boolean,
			referrerPolicy: null,
			rel: spaceSeparated,
			required: boolean,
			reversed: boolean,
			rows: number,
			rowSpan: number,
			sandbox: spaceSeparated,
			scope: null,
			scoped: boolean,
			seamless: boolean,
			selected: boolean,
			shadowRootClonable: boolean,
			shadowRootDelegatesFocus: boolean,
			shadowRootMode: null,
			shape: null,
			size: number,
			sizes: null,
			slot: null,
			span: number,
			spellCheck: booleanish,
			src: null,
			srcDoc: null,
			srcLang: null,
			srcSet: null,
			start: number,
			step: null,
			style: null,
			tabIndex: number,
			target: null,
			title: null,
			translate: null,
			type: null,
			typeMustMatch: boolean,
			useMap: null,
			value: booleanish,
			width: number,
			wrap: null,
			writingSuggestions: null,
			align: null,
			aLink: null,
			archive: spaceSeparated,
			axis: null,
			background: null,
			bgColor: null,
			border: number,
			borderColor: null,
			bottomMargin: number,
			cellPadding: null,
			cellSpacing: null,
			char: null,
			charOff: null,
			classId: null,
			clear: null,
			code: null,
			codeBase: null,
			codeType: null,
			color: null,
			compact: boolean,
			declare: boolean,
			event: null,
			face: null,
			frame: null,
			frameBorder: null,
			hSpace: number,
			leftMargin: number,
			link: null,
			longDesc: null,
			lowSrc: null,
			marginHeight: number,
			marginWidth: number,
			noResize: boolean,
			noHref: boolean,
			noShade: boolean,
			noWrap: boolean,
			object: null,
			profile: null,
			prompt: null,
			rev: null,
			rightMargin: number,
			rules: null,
			scheme: null,
			scrolling: booleanish,
			standby: null,
			summary: null,
			text: null,
			topMargin: number,
			valueType: null,
			version: null,
			vAlign: null,
			vLink: null,
			vSpace: number,
			allowTransparency: null,
			autoCorrect: null,
			autoSave: null,
			disablePictureInPicture: boolean,
			disableRemotePlayback: boolean,
			prefix: null,
			property: null,
			results: number,
			security: null,
			unselectable: null
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/svg.js
var svg$1;
var init_svg$1 = __esmMin((() => {
	init_types();
	init_create();
	init_case_sensitive_transform();
	svg$1 = create({
		space: "svg",
		attributes: {
			accentHeight: "accent-height",
			alignmentBaseline: "alignment-baseline",
			arabicForm: "arabic-form",
			baselineShift: "baseline-shift",
			capHeight: "cap-height",
			className: "class",
			clipPath: "clip-path",
			clipRule: "clip-rule",
			colorInterpolation: "color-interpolation",
			colorInterpolationFilters: "color-interpolation-filters",
			colorProfile: "color-profile",
			colorRendering: "color-rendering",
			crossOrigin: "crossorigin",
			dataType: "datatype",
			dominantBaseline: "dominant-baseline",
			enableBackground: "enable-background",
			fillOpacity: "fill-opacity",
			fillRule: "fill-rule",
			floodColor: "flood-color",
			floodOpacity: "flood-opacity",
			fontFamily: "font-family",
			fontSize: "font-size",
			fontSizeAdjust: "font-size-adjust",
			fontStretch: "font-stretch",
			fontStyle: "font-style",
			fontVariant: "font-variant",
			fontWeight: "font-weight",
			glyphName: "glyph-name",
			glyphOrientationHorizontal: "glyph-orientation-horizontal",
			glyphOrientationVertical: "glyph-orientation-vertical",
			hrefLang: "hreflang",
			horizAdvX: "horiz-adv-x",
			horizOriginX: "horiz-origin-x",
			horizOriginY: "horiz-origin-y",
			imageRendering: "image-rendering",
			letterSpacing: "letter-spacing",
			lightingColor: "lighting-color",
			markerEnd: "marker-end",
			markerMid: "marker-mid",
			markerStart: "marker-start",
			navDown: "nav-down",
			navDownLeft: "nav-down-left",
			navDownRight: "nav-down-right",
			navLeft: "nav-left",
			navNext: "nav-next",
			navPrev: "nav-prev",
			navRight: "nav-right",
			navUp: "nav-up",
			navUpLeft: "nav-up-left",
			navUpRight: "nav-up-right",
			onAbort: "onabort",
			onActivate: "onactivate",
			onAfterPrint: "onafterprint",
			onBeforePrint: "onbeforeprint",
			onBegin: "onbegin",
			onCancel: "oncancel",
			onCanPlay: "oncanplay",
			onCanPlayThrough: "oncanplaythrough",
			onChange: "onchange",
			onClick: "onclick",
			onClose: "onclose",
			onCopy: "oncopy",
			onCueChange: "oncuechange",
			onCut: "oncut",
			onDblClick: "ondblclick",
			onDrag: "ondrag",
			onDragEnd: "ondragend",
			onDragEnter: "ondragenter",
			onDragExit: "ondragexit",
			onDragLeave: "ondragleave",
			onDragOver: "ondragover",
			onDragStart: "ondragstart",
			onDrop: "ondrop",
			onDurationChange: "ondurationchange",
			onEmptied: "onemptied",
			onEnd: "onend",
			onEnded: "onended",
			onError: "onerror",
			onFocus: "onfocus",
			onFocusIn: "onfocusin",
			onFocusOut: "onfocusout",
			onHashChange: "onhashchange",
			onInput: "oninput",
			onInvalid: "oninvalid",
			onKeyDown: "onkeydown",
			onKeyPress: "onkeypress",
			onKeyUp: "onkeyup",
			onLoad: "onload",
			onLoadedData: "onloadeddata",
			onLoadedMetadata: "onloadedmetadata",
			onLoadStart: "onloadstart",
			onMessage: "onmessage",
			onMouseDown: "onmousedown",
			onMouseEnter: "onmouseenter",
			onMouseLeave: "onmouseleave",
			onMouseMove: "onmousemove",
			onMouseOut: "onmouseout",
			onMouseOver: "onmouseover",
			onMouseUp: "onmouseup",
			onMouseWheel: "onmousewheel",
			onOffline: "onoffline",
			onOnline: "ononline",
			onPageHide: "onpagehide",
			onPageShow: "onpageshow",
			onPaste: "onpaste",
			onPause: "onpause",
			onPlay: "onplay",
			onPlaying: "onplaying",
			onPopState: "onpopstate",
			onProgress: "onprogress",
			onRateChange: "onratechange",
			onRepeat: "onrepeat",
			onReset: "onreset",
			onResize: "onresize",
			onScroll: "onscroll",
			onSeeked: "onseeked",
			onSeeking: "onseeking",
			onSelect: "onselect",
			onShow: "onshow",
			onStalled: "onstalled",
			onStorage: "onstorage",
			onSubmit: "onsubmit",
			onSuspend: "onsuspend",
			onTimeUpdate: "ontimeupdate",
			onToggle: "ontoggle",
			onUnload: "onunload",
			onVolumeChange: "onvolumechange",
			onWaiting: "onwaiting",
			onZoom: "onzoom",
			overlinePosition: "overline-position",
			overlineThickness: "overline-thickness",
			paintOrder: "paint-order",
			panose1: "panose-1",
			pointerEvents: "pointer-events",
			referrerPolicy: "referrerpolicy",
			renderingIntent: "rendering-intent",
			shapeRendering: "shape-rendering",
			stopColor: "stop-color",
			stopOpacity: "stop-opacity",
			strikethroughPosition: "strikethrough-position",
			strikethroughThickness: "strikethrough-thickness",
			strokeDashArray: "stroke-dasharray",
			strokeDashOffset: "stroke-dashoffset",
			strokeLineCap: "stroke-linecap",
			strokeLineJoin: "stroke-linejoin",
			strokeMiterLimit: "stroke-miterlimit",
			strokeOpacity: "stroke-opacity",
			strokeWidth: "stroke-width",
			tabIndex: "tabindex",
			textAnchor: "text-anchor",
			textDecoration: "text-decoration",
			textRendering: "text-rendering",
			transformOrigin: "transform-origin",
			typeOf: "typeof",
			underlinePosition: "underline-position",
			underlineThickness: "underline-thickness",
			unicodeBidi: "unicode-bidi",
			unicodeRange: "unicode-range",
			unitsPerEm: "units-per-em",
			vAlphabetic: "v-alphabetic",
			vHanging: "v-hanging",
			vIdeographic: "v-ideographic",
			vMathematical: "v-mathematical",
			vectorEffect: "vector-effect",
			vertAdvY: "vert-adv-y",
			vertOriginX: "vert-origin-x",
			vertOriginY: "vert-origin-y",
			wordSpacing: "word-spacing",
			writingMode: "writing-mode",
			xHeight: "x-height",
			playbackOrder: "playbackorder",
			timelineBegin: "timelinebegin"
		},
		transform: caseSensitiveTransform,
		properties: {
			about: commaOrSpaceSeparated,
			accentHeight: number,
			accumulate: null,
			additive: null,
			alignmentBaseline: null,
			alphabetic: number,
			amplitude: number,
			arabicForm: null,
			ascent: number,
			attributeName: null,
			attributeType: null,
			azimuth: number,
			bandwidth: null,
			baselineShift: null,
			baseFrequency: null,
			baseProfile: null,
			bbox: null,
			begin: null,
			bias: number,
			by: null,
			calcMode: null,
			capHeight: number,
			className: spaceSeparated,
			clip: null,
			clipPath: null,
			clipPathUnits: null,
			clipRule: null,
			color: null,
			colorInterpolation: null,
			colorInterpolationFilters: null,
			colorProfile: null,
			colorRendering: null,
			content: null,
			contentScriptType: null,
			contentStyleType: null,
			crossOrigin: null,
			cursor: null,
			cx: null,
			cy: null,
			d: null,
			dataType: null,
			defaultAction: null,
			descent: number,
			diffuseConstant: number,
			direction: null,
			display: null,
			dur: null,
			divisor: number,
			dominantBaseline: null,
			download: boolean,
			dx: null,
			dy: null,
			edgeMode: null,
			editable: null,
			elevation: number,
			enableBackground: null,
			end: null,
			event: null,
			exponent: number,
			externalResourcesRequired: null,
			fill: null,
			fillOpacity: number,
			fillRule: null,
			filter: null,
			filterRes: null,
			filterUnits: null,
			floodColor: null,
			floodOpacity: null,
			focusable: null,
			focusHighlight: null,
			fontFamily: null,
			fontSize: null,
			fontSizeAdjust: null,
			fontStretch: null,
			fontStyle: null,
			fontVariant: null,
			fontWeight: null,
			format: null,
			fr: null,
			from: null,
			fx: null,
			fy: null,
			g1: commaSeparated,
			g2: commaSeparated,
			glyphName: commaSeparated,
			glyphOrientationHorizontal: null,
			glyphOrientationVertical: null,
			glyphRef: null,
			gradientTransform: null,
			gradientUnits: null,
			handler: null,
			hanging: number,
			hatchContentUnits: null,
			hatchUnits: null,
			height: null,
			href: null,
			hrefLang: null,
			horizAdvX: number,
			horizOriginX: number,
			horizOriginY: number,
			id: null,
			ideographic: number,
			imageRendering: null,
			initialVisibility: null,
			in: null,
			in2: null,
			intercept: number,
			k: number,
			k1: number,
			k2: number,
			k3: number,
			k4: number,
			kernelMatrix: commaOrSpaceSeparated,
			kernelUnitLength: null,
			keyPoints: null,
			keySplines: null,
			keyTimes: null,
			kerning: null,
			lang: null,
			lengthAdjust: null,
			letterSpacing: null,
			lightingColor: null,
			limitingConeAngle: number,
			local: null,
			markerEnd: null,
			markerMid: null,
			markerStart: null,
			markerHeight: null,
			markerUnits: null,
			markerWidth: null,
			mask: null,
			maskContentUnits: null,
			maskUnits: null,
			mathematical: null,
			max: null,
			media: null,
			mediaCharacterEncoding: null,
			mediaContentEncodings: null,
			mediaSize: number,
			mediaTime: null,
			method: null,
			min: null,
			mode: null,
			name: null,
			navDown: null,
			navDownLeft: null,
			navDownRight: null,
			navLeft: null,
			navNext: null,
			navPrev: null,
			navRight: null,
			navUp: null,
			navUpLeft: null,
			navUpRight: null,
			numOctaves: null,
			observer: null,
			offset: null,
			onAbort: null,
			onActivate: null,
			onAfterPrint: null,
			onBeforePrint: null,
			onBegin: null,
			onCancel: null,
			onCanPlay: null,
			onCanPlayThrough: null,
			onChange: null,
			onClick: null,
			onClose: null,
			onCopy: null,
			onCueChange: null,
			onCut: null,
			onDblClick: null,
			onDrag: null,
			onDragEnd: null,
			onDragEnter: null,
			onDragExit: null,
			onDragLeave: null,
			onDragOver: null,
			onDragStart: null,
			onDrop: null,
			onDurationChange: null,
			onEmptied: null,
			onEnd: null,
			onEnded: null,
			onError: null,
			onFocus: null,
			onFocusIn: null,
			onFocusOut: null,
			onHashChange: null,
			onInput: null,
			onInvalid: null,
			onKeyDown: null,
			onKeyPress: null,
			onKeyUp: null,
			onLoad: null,
			onLoadedData: null,
			onLoadedMetadata: null,
			onLoadStart: null,
			onMessage: null,
			onMouseDown: null,
			onMouseEnter: null,
			onMouseLeave: null,
			onMouseMove: null,
			onMouseOut: null,
			onMouseOver: null,
			onMouseUp: null,
			onMouseWheel: null,
			onOffline: null,
			onOnline: null,
			onPageHide: null,
			onPageShow: null,
			onPaste: null,
			onPause: null,
			onPlay: null,
			onPlaying: null,
			onPopState: null,
			onProgress: null,
			onRateChange: null,
			onRepeat: null,
			onReset: null,
			onResize: null,
			onScroll: null,
			onSeeked: null,
			onSeeking: null,
			onSelect: null,
			onShow: null,
			onStalled: null,
			onStorage: null,
			onSubmit: null,
			onSuspend: null,
			onTimeUpdate: null,
			onToggle: null,
			onUnload: null,
			onVolumeChange: null,
			onWaiting: null,
			onZoom: null,
			opacity: null,
			operator: null,
			order: null,
			orient: null,
			orientation: null,
			origin: null,
			overflow: null,
			overlay: null,
			overlinePosition: number,
			overlineThickness: number,
			paintOrder: null,
			panose1: null,
			path: null,
			pathLength: number,
			patternContentUnits: null,
			patternTransform: null,
			patternUnits: null,
			phase: null,
			ping: spaceSeparated,
			pitch: null,
			playbackOrder: null,
			pointerEvents: null,
			points: null,
			pointsAtX: number,
			pointsAtY: number,
			pointsAtZ: number,
			preserveAlpha: null,
			preserveAspectRatio: null,
			primitiveUnits: null,
			propagate: null,
			property: commaOrSpaceSeparated,
			r: null,
			radius: null,
			referrerPolicy: null,
			refX: null,
			refY: null,
			rel: commaOrSpaceSeparated,
			rev: commaOrSpaceSeparated,
			renderingIntent: null,
			repeatCount: null,
			repeatDur: null,
			requiredExtensions: commaOrSpaceSeparated,
			requiredFeatures: commaOrSpaceSeparated,
			requiredFonts: commaOrSpaceSeparated,
			requiredFormats: commaOrSpaceSeparated,
			resource: null,
			restart: null,
			result: null,
			rotate: null,
			rx: null,
			ry: null,
			scale: null,
			seed: null,
			shapeRendering: null,
			side: null,
			slope: null,
			snapshotTime: null,
			specularConstant: number,
			specularExponent: number,
			spreadMethod: null,
			spacing: null,
			startOffset: null,
			stdDeviation: null,
			stemh: null,
			stemv: null,
			stitchTiles: null,
			stopColor: null,
			stopOpacity: null,
			strikethroughPosition: number,
			strikethroughThickness: number,
			string: null,
			stroke: null,
			strokeDashArray: commaOrSpaceSeparated,
			strokeDashOffset: null,
			strokeLineCap: null,
			strokeLineJoin: null,
			strokeMiterLimit: number,
			strokeOpacity: number,
			strokeWidth: null,
			style: null,
			surfaceScale: number,
			syncBehavior: null,
			syncBehaviorDefault: null,
			syncMaster: null,
			syncTolerance: null,
			syncToleranceDefault: null,
			systemLanguage: commaOrSpaceSeparated,
			tabIndex: number,
			tableValues: null,
			target: null,
			targetX: number,
			targetY: number,
			textAnchor: null,
			textDecoration: null,
			textRendering: null,
			textLength: null,
			timelineBegin: null,
			title: null,
			transformBehavior: null,
			type: null,
			typeOf: commaOrSpaceSeparated,
			to: null,
			transform: null,
			transformOrigin: null,
			u1: null,
			u2: null,
			underlinePosition: number,
			underlineThickness: number,
			unicode: null,
			unicodeBidi: null,
			unicodeRange: null,
			unitsPerEm: number,
			values: null,
			vAlphabetic: number,
			vMathematical: number,
			vectorEffect: null,
			vHanging: number,
			vIdeographic: number,
			version: null,
			vertAdvY: number,
			vertOriginX: number,
			vertOriginY: number,
			viewBox: null,
			viewTarget: null,
			visibility: null,
			width: null,
			widths: null,
			wordSpacing: null,
			writingMode: null,
			x: null,
			x1: null,
			x2: null,
			xChannelSelector: null,
			xHeight: number,
			y: null,
			y1: null,
			y2: null,
			yChannelSelector: null,
			z: null,
			zoomAndPan: null
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/find.js
/**
* @param {Schema} schema
* @param {string} value
* @returns {Info}
*/
function find(schema, value) {
	const normal = normalize(value);
	let prop = value;
	let Type = Info;
	if (normal in schema.normal) return schema.property[schema.normal[normal]];
	if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
		if (value.charAt(4) === "-") {
			const rest = value.slice(5).replace(dash, camelcase);
			prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
		} else {
			const rest = value.slice(4);
			if (!dash.test(rest)) {
				let dashes = rest.replace(cap, kebab);
				if (dashes.charAt(0) !== "-") dashes = "-" + dashes;
				value = "data" + dashes;
			}
		}
		Type = DefinedInfo;
	}
	return new Type(prop, value);
}
/**
* @param {string} $0
* @returns {string}
*/
function kebab($0) {
	return "-" + $0.toLowerCase();
}
/**
* @param {string} $0
* @returns {string}
*/
function camelcase($0) {
	return $0.charAt(1).toUpperCase();
}
var valid, dash, cap;
var init_find = __esmMin((() => {
	init_normalize();
	init_defined_info();
	init_info();
	valid = /^data[-\w.:]+$/i;
	dash = /-[a-z]/g;
	cap = /[A-Z]/g;
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/hast-to-react.js
var hastToReact;
var init_hast_to_react = __esmMin((() => {
	hastToReact = {
		classId: "classID",
		dataType: "datatype",
		itemId: "itemID",
		strokeDashArray: "strokeDasharray",
		strokeDashOffset: "strokeDashoffset",
		strokeLineCap: "strokeLinecap",
		strokeLineJoin: "strokeLinejoin",
		strokeMiterLimit: "strokeMiterlimit",
		typeOf: "typeof",
		xLinkActuate: "xlinkActuate",
		xLinkArcRole: "xlinkArcrole",
		xLinkHref: "xlinkHref",
		xLinkRole: "xlinkRole",
		xLinkShow: "xlinkShow",
		xLinkTitle: "xlinkTitle",
		xLinkType: "xlinkType",
		xmlnsXLink: "xmlnsXlink"
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/index.js
var html, svg;
var init_property_information = __esmMin((() => {
	init_merge();
	init_xlink();
	init_xml();
	init_xmlns();
	init_aria();
	init_html$1();
	init_svg$1();
	init_find();
	init_hast_to_react();
	init_normalize();
	html = merge([
		xml,
		xlink,
		xmlns,
		aria,
		html$1
	], "html");
	svg = merge([
		xml,
		xlink,
		xmlns,
		aria,
		svg$1
	], "svg");
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-whitespace@2.0.1/node_modules/hast-util-whitespace/index.js
/**
* Check if the given value is *inter-element whitespace*.
*
* @param {unknown} thing
*   Thing to check (typically `Node` or `string`).
* @returns {boolean}
*   Whether the `value` is inter-element whitespace (`boolean`): consisting of
*   zero or more of space, tab (`\t`), line feed (`\n`), carriage return
*   (`\r`), or form feed (`\f`).
*   If a node is passed it must be a `Text` node, whose `value` field is
*   checked.
*/
function whitespace(thing) {
	/** @type {string} */
	const value = thing && typeof thing === "object" && thing.type === "text" ? thing.value || "" : thing;
	return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
}
var init_hast_util_whitespace = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-is-element@2.1.3/node_modules/hast-util-is-element/index.js
/**
* Handle multiple tests.
*
* @param {Array<string | TestFunctionAnything>} tests
* @returns {AssertAnything}
*/
function anyFactory(tests) {
	/** @type {Array<AssertAnything>} */
	const checks = [];
	let index = -1;
	while (++index < tests.length) checks[index] = convertElement(tests[index]);
	return castFactory(any);
	/**
	* @this {unknown}
	* @param {Array<unknown>} parameters
	* @returns {boolean}
	*/
	function any(...parameters) {
		let index = -1;
		while (++index < checks.length) if (checks[index].call(this, ...parameters)) return true;
		return false;
	}
}
/**
* Turn a string into a test for an element with a certain tag name.
*
* @param {string} check
* @returns {AssertAnything}
*/
function tagNameFactory(check) {
	return tagName;
	/**
	* @param {unknown} node
	* @returns {boolean}
	*/
	function tagName(node) {
		return element$1(node) && node.tagName === check;
	}
}
/**
* Turn a custom test into a test for an element that passes that test.
*
* @param {TestFunctionAnything} check
* @returns {AssertAnything}
*/
function castFactory(check) {
	return assertion;
	/**
	* @this {unknown}
	* @param {unknown} node
	* @param {Array<unknown>} parameters
	* @returns {boolean}
	*/
	function assertion(node, ...parameters) {
		return element$1(node) && Boolean(check.call(this, node, ...parameters));
	}
}
/**
* Make sure something is an element.
*
* @param {unknown} node
* @returns {node is Element}
*/
function element$1(node) {
	return Boolean(node && typeof node === "object" && node.type === "element" && typeof node.tagName === "string");
}
var convertElement;
var init_hast_util_is_element = __esmMin((() => {
	convertElement = (
	/**
	* @param {Test | null | undefined} [test]
	* @returns {AssertAnything}
	*/
	function(test) {
		if (test === void 0 || test === null) return element$1;
		if (typeof test === "string") return tagNameFactory(test);
		if (typeof test === "object") return anyFactory(test);
		if (typeof test === "function") return castFactory(test);
		throw new Error("Expected function, string, or array as test");
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-find-after@4.0.1/node_modules/unist-util-find-after/lib/index.js
var findAfter;
var init_lib$12 = __esmMin((() => {
	init_unist_util_is();
	findAfter = (
	/**
	* @param {Parent} parent
	* @param {Node | number} index
	* @param {Test} [test]
	* @returns {Node | null}
	*/
	function(parent, index, test) {
		const is = convert(test);
		if (!parent || !parent.type || !parent.children) throw new Error("Expected parent node");
		if (typeof index === "number") {
			if (index < 0 || index === Number.POSITIVE_INFINITY) throw new Error("Expected positive finite number as index");
		} else {
			index = parent.children.indexOf(index);
			if (index < 0) throw new Error("Expected child node or index");
		}
		while (++index < parent.children.length) if (is(parent.children[index], index, parent)) return parent.children[index];
		return null;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/unist-util-find-after@4.0.1/node_modules/unist-util-find-after/index.js
var init_unist_util_find_after = __esmMin((() => {
	init_lib$12();
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-to-text@3.1.2/node_modules/hast-util-to-text/lib/index.js
/**
* Get the plain-text value of a node.
*
* ###### Algorithm
*
* *   if `tree` is a comment, returns its `value`
* *   if `tree` is a text, applies normal whitespace collapsing to its
*     `value`, as defined by the CSS Text spec
* *   if `tree` is a root or element, applies an algorithm similar to the
*     `innerText` getter as defined by HTML
*
* ###### Notes
*
* > 👉 **Note**: the algorithm acts as if `tree` is being rendered, and as if
* > we’re a CSS-supporting user agent, with scripting enabled.
*
* *   if `tree` is an element that is not displayed (such as a `head`), we’ll
*     still use the `innerText` algorithm instead of switching to `textContent`
* *   if descendants of `tree` are elements that are not displayed, they are
*     ignored
* *   CSS is not considered, except for the default user agent style sheet
* *   a line feed is collapsed instead of ignored in cases where Fullwidth, Wide,
*     or Halfwidth East Asian Width characters are used, the same goes for a case
*     with Chinese, Japanese, or Yi writing systems
* *   replaced elements (such as `audio`) are treated like non-replaced elements
*
* @param {Node} tree
*   Tree to turn into text.
* @param {Options} [options]
*   Configuration (optional).
* @returns {string}
*   Serialized `tree`.
*/
function toText(tree, options = {}) {
	const children = "children" in tree ? tree.children : [];
	const block = blockOrCaption(tree);
	const whitespace = inferWhitespace(tree, {
		whitespace: options.whitespace || "normal",
		breakBefore: false,
		breakAfter: false
	});
	/** @type {Array<string | BreakNumber>} */
	const results = [];
	if (tree.type === "text" || tree.type === "comment") results.push(...collectText(tree, {
		whitespace,
		breakBefore: true,
		breakAfter: true
	}));
	let index = -1;
	while (++index < children.length) results.push(...innerTextCollection(children[index], tree, {
		whitespace,
		breakBefore: index ? void 0 : block,
		breakAfter: index < children.length - 1 ? br(children[index + 1]) : block
	}));
	/** @type {Array<string>} */
	const result = [];
	/** @type {number | undefined} */
	let count;
	index = -1;
	while (++index < results.length) {
		const value = results[index];
		if (typeof value === "number") {
			if (count !== void 0 && value > count) count = value;
		} else if (value) {
			if (count !== void 0 && count > -1) result.push("\n".repeat(count) || " ");
			count = -1;
			result.push(value);
		}
	}
	return result.join("");
}
/**
* <https://html.spec.whatwg.org/#inner-text-collection-steps>
*
* @param {Node} node
* @param {Parent} parent
* @param {CollectionInfo} info
* @returns {Array<string | BreakNumber>}
*/
function innerTextCollection(node, parent, info) {
	if (node.type === "element") return collectElement(node, parent, info);
	if (node.type === "text") return info.whitespace === "normal" ? collectText(node, info) : collectPreText(node);
	return [];
}
/**
* Collect an element.
*
* @param {Element} node
*   Element node.
* @param {Parent} parent
* @param {CollectionInfo} info
*   Info on current collection.
* @returns {Array<string | BreakNumber>}
*/
function collectElement(node, parent, info) {
	const whitespace = inferWhitespace(node, info);
	const children = node.children || [];
	let index = -1;
	/** @type {Array<string | BreakNumber>} */
	let items = [];
	if (notRendered(node)) return items;
	/** @type {BreakNumber | undefined} */
	let prefix;
	/** @type {BreakNumber | BreakForce | undefined} */
	let suffix;
	if (br(node)) suffix = "\n";
	else if (row(node) && findAfter(parent, node, row)) suffix = "\n";
	else if (p(node)) {
		prefix = 2;
		suffix = 2;
	} else if (blockOrCaption(node)) {
		prefix = 1;
		suffix = 1;
	}
	while (++index < children.length) items = items.concat(innerTextCollection(children[index], node, {
		whitespace,
		breakBefore: index ? void 0 : prefix,
		breakAfter: index < children.length - 1 ? br(children[index + 1]) : suffix
	}));
	if (cell(node) && findAfter(parent, node, cell)) items.push("	");
	if (prefix) items.unshift(prefix);
	if (suffix) items.push(suffix);
	return items;
}
/**
* 4.  If node is a Text node, then for each CSS text box produced by node,
*     in content order, compute the text of the box after application of the
*     CSS `white-space` processing rules and `text-transform` rules, set
*     items to the list of the resulting strings, and return items.
*     The CSS `white-space` processing rules are slightly modified:
*     collapsible spaces at the end of lines are always collapsed, but they
*     are only removed if the line is the last line of the block, or it ends
*     with a br element.
*     Soft hyphens should be preserved.
*
*     Note: See `collectText` and `collectPreText`.
*     Note: we don’t deal with `text-transform`, no element has that by
*     default.
*
* See: <https://drafts.csswg.org/css-text/#white-space-phase-1>
*
* @param {Text | Comment} node
*   Text node.
* @param {CollectionInfo} info
*   Info on current collection.
* @returns {Array<string | BreakNumber>}
*   Result.
*/
function collectText(node, info) {
	const value = String(node.value);
	/** @type {Array<string>} */
	const lines = [];
	/** @type {Array<string | BreakNumber>} */
	const result = [];
	let start = 0;
	while (start <= value.length) {
		searchLineFeeds.lastIndex = start;
		const match = searchLineFeeds.exec(value);
		const end = match && "index" in match ? match.index : value.length;
		lines.push(trimAndCollapseSpacesAndTabs(value.slice(start, end).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), start === 0 ? info.breakBefore : true, end === value.length ? info.breakAfter : true));
		start = end + 1;
	}
	let index = -1;
	/** @type {BreakNumber | undefined} */
	let join;
	while (++index < lines.length) if (lines[index].charCodeAt(lines[index].length - 1) === 8203 || index < lines.length - 1 && lines[index + 1].charCodeAt(0) === 8203) {
		result.push(lines[index]);
		join = void 0;
	} else if (lines[index]) {
		if (typeof join === "number") result.push(join);
		result.push(lines[index]);
		join = 0;
	} else if (index === 0 || index === lines.length - 1) result.push(0);
	return result;
}
/**
* Collect a text node as “pre” whitespace.
*
* @param {Text} node
*   Text node.
* @returns {Array<string | BreakNumber>}
*   Result.
*/
function collectPreText(node) {
	return [String(node.value)];
}
/**
* 3.  Every collapsible tab is converted to a collapsible space (U+0020).
* 4.  Any collapsible space immediately following another collapsible
*     space—even one outside the boundary of the inline containing that
*     space, provided both spaces are within the same inline formatting
*     context—is collapsed to have zero advance width. (It is invisible,
*     but retains its soft wrap opportunity, if any.)
*
* @param {string} value
*   Value to collapse.
* @param {BreakBefore} breakBefore
*   Whether there was a break before.
* @param {BreakAfter} breakAfter
*   Whether there was a break after.
* @returns {string}
*   Result.
*/
function trimAndCollapseSpacesAndTabs(value, breakBefore, breakAfter) {
	/** @type {Array<string>} */
	const result = [];
	let start = 0;
	/** @type {number | undefined} */
	let end;
	while (start < value.length) {
		searchTabOrSpaces.lastIndex = start;
		const match = searchTabOrSpaces.exec(value);
		end = match ? match.index : value.length;
		if (!start && !end && match && !breakBefore) result.push("");
		if (start !== end) result.push(value.slice(start, end));
		start = match ? end + match[0].length : end;
	}
	if (start !== end && !breakAfter) result.push("");
	return result.join(" ");
}
/**
* Figure out the whitespace of a node.
*
* We don’t support void elements here (so `nobr wbr` -> `normal` is ignored).
*
* @param {Node} node
*   Node (typically `Element`).
* @param {CollectionInfo} info
*   Info on current collection.
* @returns {Whitespace}
*   Applied whitespace.
*/
function inferWhitespace(node, info) {
	if (node.type === "element") {
		const props = node.properties || {};
		switch (node.tagName) {
			case "listing":
			case "plaintext":
			case "xmp": return "pre";
			case "nobr": return "nowrap";
			case "pre": return props.wrap ? "pre-wrap" : "pre";
			case "td":
			case "th": return props.noWrap ? "nowrap" : info.whitespace;
			case "textarea": return "pre-wrap";
		}
	}
	return info.whitespace;
}
/** @type {TestFunctionAnything} */
function hidden(node) {
	return Boolean((node.properties || {}).hidden);
}
/** @type {TestFunctionAnything} */
function closedDialog(node) {
	return node.tagName === "dialog" && !(node.properties || {}).open;
}
var searchLineFeeds, searchTabOrSpaces, br, p, cell, row, notRendered, blockOrCaption;
var init_lib$11 = __esmMin((() => {
	init_hast_util_is_element();
	init_unist_util_find_after();
	searchLineFeeds = /\n/g;
	searchTabOrSpaces = /[\t ]+/g;
	br = convertElement("br");
	p = convertElement("p");
	cell = convertElement(["th", "td"]);
	row = convertElement("tr");
	notRendered = convertElement([
		"datalist",
		"head",
		"noembed",
		"noframes",
		"noscript",
		"rp",
		"script",
		"style",
		"template",
		"title",
		hidden,
		closedDialog
	]);
	blockOrCaption = convertElement([
		"address",
		"article",
		"aside",
		"blockquote",
		"body",
		"caption",
		"center",
		"dd",
		"dialog",
		"dir",
		"dl",
		"dt",
		"div",
		"figure",
		"figcaption",
		"footer",
		"form,",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"header",
		"hgroup",
		"hr",
		"html",
		"legend",
		"listing",
		"main",
		"menu",
		"nav",
		"ol",
		"p",
		"plaintext",
		"pre",
		"section",
		"ul",
		"xmp"
	]);
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-to-text@3.1.2/node_modules/hast-util-to-text/index.js
var init_hast_util_to_text = __esmMin((() => {
	init_lib$11();
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-parse-selector@3.1.1/node_modules/hast-util-parse-selector/lib/index.js
/**
* Create a hast element from a simple CSS selector.
*
* @template {string} Selector
*   Type of selector.
* @template {string} [DefaultTagName='div']
*   Type of default tag name.
* @param {Selector | null | undefined} [selector]
*   Simple CSS selector.
*
*   Can contain a tag name (`foo`), classes (`.bar`), and an ID (`#baz`).
*   Multiple classes are allowed.
*   Uses the last ID if multiple IDs are found.
* @param {DefaultTagName | null | undefined} [defaultTagName='div']
*   Tag name to use if `selector` does not specify one (default: `'div'`).
* @returns {Element & {tagName: import('./extract.js').ExtractTagName<Selector, DefaultTagName>}}
*   Built element.
*/
function parseSelector(selector, defaultTagName) {
	const value = selector || "";
	/** @type {Properties} */
	const props = {};
	let start = 0;
	/** @type {string | undefined} */
	let previous;
	/** @type {string | undefined} */
	let tagName;
	while (start < value.length) {
		search.lastIndex = start;
		const match = search.exec(value);
		const subvalue = value.slice(start, match ? match.index : value.length);
		if (subvalue) {
			if (!previous) tagName = subvalue;
			else if (previous === "#") props.id = subvalue;
			else if (Array.isArray(props.className)) props.className.push(subvalue);
			else props.className = [subvalue];
			start += subvalue.length;
		}
		if (match) {
			previous = match[0];
			start++;
		}
	}
	return {
		type: "element",
		tagName: tagName || defaultTagName || "div",
		properties: props,
		children: []
	};
}
var search;
var init_lib$10 = __esmMin((() => {
	search = /[#.]/g;
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-parse-selector@3.1.1/node_modules/hast-util-parse-selector/index.js
var init_hast_util_parse_selector = __esmMin((() => {
	init_lib$10();
}));
//#endregion
//#region ../../node_modules/.pnpm/hastscript@7.2.0/node_modules/hastscript/lib/core.js
/**
* @param {Schema} schema
* @param {string} defaultTagName
* @param {Array<string>} [caseSensitive]
*/
function core(schema, defaultTagName, caseSensitive) {
	const adjust = caseSensitive && createAdjustMap(caseSensitive);
	const h = (
	/**
	* Hyperscript compatible DSL for creating virtual hast trees.
	*
	* @param {string | null} [selector]
	* @param {HProperties | HChild} [properties]
	* @param {Array<HChild>} children
	* @returns {HResult}
	*/
	function(selector, properties, ...children) {
		let index = -1;
		/** @type {HResult} */
		let node;
		if (selector === void 0 || selector === null) {
			node = {
				type: "root",
				children: []
			};
			children.unshift(properties);
		} else {
			node = parseSelector(selector, defaultTagName);
			node.tagName = node.tagName.toLowerCase();
			if (adjust && own$1.call(adjust, node.tagName)) node.tagName = adjust[node.tagName];
			if (isProperties(properties, node.tagName)) {
				/** @type {string} */
				let key;
				for (key in properties) if (own$1.call(properties, key)) addProperty(schema, node.properties, key, properties[key]);
			} else children.unshift(properties);
		}
		while (++index < children.length) addChild(node.children, children[index]);
		if (node.type === "element" && node.tagName === "template") {
			node.content = {
				type: "root",
				children: node.children
			};
			node.children = [];
		}
		return node;
	});
	return h;
}
/**
* @param {HProperties | HChild} value
* @param {string} name
* @returns {value is HProperties}
*/
function isProperties(value, name) {
	if (value === null || value === void 0 || typeof value !== "object" || Array.isArray(value)) return false;
	if (name === "input" || !value.type || typeof value.type !== "string") return true;
	if ("children" in value && Array.isArray(value.children)) return false;
	if (name === "button") return buttonTypes.has(value.type.toLowerCase());
	return !("value" in value);
}
/**
* @param {Schema} schema
* @param {Properties} properties
* @param {string} key
* @param {HStyle | HPropertyValue} value
* @returns {void}
*/
function addProperty(schema, properties, key, value) {
	const info = find(schema, key);
	let index = -1;
	/** @type {HPropertyValue} */
	let result;
	if (value === void 0 || value === null) return;
	if (typeof value === "number") {
		if (Number.isNaN(value)) return;
		result = value;
	} else if (typeof value === "boolean") result = value;
	else if (typeof value === "string") {
		if (info.spaceSeparated) result = parse$1(value);
		else if (info.commaSeparated) result = parse$2(value);
		else if (info.commaOrSpaceSeparated) result = parse$1(parse$2(value).join(" "));
		else result = parsePrimitive(info, info.property, value);
	} else if (Array.isArray(value)) result = value.concat();
	else result = info.property === "style" ? style(value) : String(value);
	if (Array.isArray(result)) {
		/** @type {Array<string | number>} */
		const finalResult = [];
		while (++index < result.length) finalResult[index] = parsePrimitive(info, info.property, result[index]);
		result = finalResult;
	}
	if (info.property === "className" && Array.isArray(properties.className)) result = properties.className.concat(result);
	properties[info.property] = result;
}
/**
* @param {Array<Content>} nodes
* @param {HChild} value
* @returns {void}
*/
function addChild(nodes, value) {
	let index = -1;
	if (value === void 0 || value === null) {} else if (typeof value === "string" || typeof value === "number") nodes.push({
		type: "text",
		value: String(value)
	});
	else if (Array.isArray(value)) while (++index < value.length) addChild(nodes, value[index]);
	else if (typeof value === "object" && "type" in value) {
		if (value.type === "root") addChild(nodes, value.children);
		else nodes.push(value);
	} else throw new Error("Expected node, nodes, or string, got `" + value + "`");
}
/**
* Parse a single primitives.
*
* @param {Info} info
* @param {string} name
* @param {HPrimitiveValue} value
* @returns {HPrimitiveValue}
*/
function parsePrimitive(info, name, value) {
	if (typeof value === "string") {
		if (info.number && value && !Number.isNaN(Number(value))) return Number(value);
		if ((info.boolean || info.overloadedBoolean) && (value === "" || normalize(value) === normalize(name))) return true;
	}
	return value;
}
/**
* Serialize a `style` object as a string.
*
* @param {HStyle} value
*   Style object.
* @returns {string}
*   CSS string.
*/
function style(value) {
	/** @type {Array<string>} */
	const result = [];
	/** @type {string} */
	let key;
	for (key in value) if (own$1.call(value, key)) result.push([key, value[key]].join(": "));
	return result.join("; ");
}
/**
* Create a map to adjust casing.
*
* @param {Array<string>} values
*   List of properly cased keys.
* @returns {Record<string, string>}
*   Map of lowercase keys to uppercase keys.
*/
function createAdjustMap(values) {
	/** @type {Record<string, string>} */
	const result = {};
	let index = -1;
	while (++index < values.length) result[values[index].toLowerCase()] = values[index];
	return result;
}
var buttonTypes, own$1;
var init_core = __esmMin((() => {
	init_property_information();
	init_hast_util_parse_selector();
	init_space_separated_tokens();
	init_comma_separated_tokens();
	buttonTypes = /* @__PURE__ */ new Set([
		"menu",
		"submit",
		"reset",
		"button"
	]);
	own$1 = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/.pnpm/hastscript@7.2.0/node_modules/hastscript/lib/html.js
var h;
var init_html = __esmMin((() => {
	init_property_information();
	init_core();
	h = core(html, "div");
}));
//#endregion
//#region ../../node_modules/.pnpm/hastscript@7.2.0/node_modules/hastscript/lib/svg-case-sensitive-tag-names.js
var svgCaseSensitiveTagNames;
var init_svg_case_sensitive_tag_names = __esmMin((() => {
	svgCaseSensitiveTagNames = [
		"altGlyph",
		"altGlyphDef",
		"altGlyphItem",
		"animateColor",
		"animateMotion",
		"animateTransform",
		"clipPath",
		"feBlend",
		"feColorMatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feDropShadow",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence",
		"foreignObject",
		"glyphRef",
		"linearGradient",
		"radialGradient",
		"solidColor",
		"textArea",
		"textPath"
	];
}));
//#endregion
//#region ../../node_modules/.pnpm/hastscript@7.2.0/node_modules/hastscript/lib/svg.js
var s;
var init_svg = __esmMin((() => {
	init_property_information();
	init_core();
	init_svg_case_sensitive_tag_names();
	s = core(svg, "g", svgCaseSensitiveTagNames);
}));
//#endregion
//#region ../../node_modules/.pnpm/hastscript@7.2.0/node_modules/hastscript/lib/index.js
var init_lib$9 = __esmMin((() => {
	init_html();
	init_svg();
}));
//#endregion
//#region ../../node_modules/.pnpm/hastscript@7.2.0/node_modules/hastscript/index.js
var init_hastscript = __esmMin((() => {
	init_lib$9();
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-from-dom@4.2.0/node_modules/hast-util-from-dom/lib/index.js
/**
* Transform a DOM tree to a hast tree.
*
* @param {Node} tree
*   DOM tree to transform.
* @param {Options | null | undefined} [options]
*   Configuration (optional).
* @returns {HastNode}
*   Equivalent hast node.
*/
function fromDom(tree, options) {
	return (tree ? transform(tree, options || {}) : void 0) || {
		type: "root",
		children: []
	};
}
/**
* @param {Node} node
*   DOM node to transform.
* @param {Options} options
*   Configuration.
* @returns {HastNode | undefined}
*   Equivalent hast node.
*
*   Note that certain legacy DOM nodes (i.e., Attr nodes (2),  CDATA, processing instructions)
*/
function transform(node, options) {
	const transformed = one(node, options);
	if (transformed && options.afterTransform) options.afterTransform(node, transformed);
	return transformed;
}
/**
* @param {Node} node
*   DOM node to transform.
* @param {Options} options
*   Configuration.
* @returns {HastNode | undefined}
*   Equivalent hast node.
*/
function one(node, options) {
	switch (node.nodeType) {
		case 1: return element(node, options);
		case 3: return text$1(node);
		case 8: return comment(node);
		case 9: return root(node, options);
		case 10: return doctype();
		case 11: return root(node, options);
		default: return;
	}
}
/**
* Transform a document.
*
* @param {Document | DocumentFragment} node
*   DOM node to transform.
* @param {Options} options
*   Configuration.
* @returns {HastRoot}
*   Equivalent hast node.
*/
function root(node, options) {
	return {
		type: "root",
		children: all(node, options)
	};
}
/**
* Transform a doctype.
*
* @returns {HastDoctype}
*   Equivalent hast node.
*/
function doctype() {
	return { type: "doctype" };
}
/**
* Transform a text.
*
* @param {Text} node
*   DOM node to transform.
* @returns {HastText}
*   Equivalent hast node.
*/
function text$1(node) {
	return {
		type: "text",
		value: node.nodeValue || ""
	};
}
/**
* Transform a comment.
*
* @param {Comment} node
*   DOM node to transform.
* @returns {HastComment}
*   Equivalent hast node.
*/
function comment(node) {
	return {
		type: "comment",
		value: node.nodeValue || ""
	};
}
/**
* Transform an element.
*
* @param {Element} node
*   DOM node to transform.
* @param {Options} options
*   Configuration.
* @returns {HastElement}
*   Equivalent hast node.
*/
function element(node, options) {
	const space = node.namespaceURI;
	const fn = space === webNamespaces.svg ? s : h;
	const tagName = space === webNamespaces.html ? node.tagName.toLowerCase() : node.tagName;
	/** @type {DocumentFragment | Element} */
	const content = space === webNamespaces.html && tagName === "template" ? node.content : node;
	const attributes = node.getAttributeNames();
	/** @type {Record<string, string>} */
	const props = {};
	let index = -1;
	while (++index < attributes.length) props[attributes[index]] = node.getAttribute(attributes[index]) || "";
	return fn(tagName, props, all(content, options));
}
/**
* Transform child nodes in a parent.
*
* @param {Document | DocumentFragment | Element} node
*   DOM node to transform.
* @param {Options} options
*   Configuration.
* @returns {Array<HastContent>}
*   Equivalent hast nodes.
*/
function all(node, options) {
	const nodes = node.childNodes;
	/** @type {Array<HastContent>} */
	const children = [];
	let index = -1;
	while (++index < nodes.length) {
		const child = transform(nodes[index], options);
		if (child !== void 0) children.push(child);
	}
	return children;
}
var init_lib$8 = __esmMin((() => {
	init_web_namespaces();
	init_hastscript();
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-from-dom@4.2.0/node_modules/hast-util-from-dom/index.js
var init_hast_util_from_dom = __esmMin((() => {
	init_lib$8();
}));
//#endregion
//#region ../../node_modules/.pnpm/hast-util-from-html-isomorphic@1.0.0/node_modules/hast-util-from-html-isomorphic/lib/browser.js
/** @type {FromHtmlIsomorphic} */
function fromHtmlIsomorphic(value, options) {
	return fromDom(options?.fragment ? parseFragment(value) : parser.parseFromString(value, "text/html"));
}
/**
* Parse as a fragment.
*
* @param {string} value
* @returns {DocumentFragment}
*/
function parseFragment(value) {
	const template = document.createElement("template");
	template.innerHTML = value;
	return template.content;
}
var parser;
var init_browser = __esmMin((() => {
	init_hast_util_from_dom();
	parser = new DOMParser();
}));
//#endregion
//#region ../../node_modules/.pnpm/rehype-katex@6.0.3/node_modules/rehype-katex/index.js
/**
* Plugin to transform `<span class=math-inline>` and `<div class=math-display>`
* with KaTeX.
*
* @type {import('unified').Plugin<[Options?]|void[], Root>}
*/
function rehypeKatex(options) {
	const settings = options || {};
	const throwOnError = settings.throwOnError || false;
	return (tree, file) => {
		visit(tree, "element", (element) => {
			const classes = element.properties && Array.isArray(element.properties.className) ? element.properties.className : [];
			const inline = classes.includes("math-inline");
			const displayMode = classes.includes("math-display");
			if (!inline && !displayMode) return;
			const value = toText(element, { whitespace: "pre" });
			/** @type {string} */
			let result;
			try {
				result = import_katex.default.renderToString(value, assign({}, settings, {
					displayMode,
					throwOnError: true
				}));
			} catch (error_) {
				const error = error_;
				const fn = throwOnError ? "fail" : "message";
				const origin = [source, error.name.toLowerCase()].join(":");
				file[fn](error.message, element.position, origin);
				if (error.name !== "ParseError") {
					element.children = [{
						type: "element",
						tagName: "span",
						properties: {
							className: ["katex-error"],
							title: String(error),
							style: "color:" + (settings.errorColor || "#cc0000")
						},
						children: [{
							type: "text",
							value
						}]
					}];
					return;
				}
				result = import_katex.default.renderToString(value, assign({}, settings, {
					displayMode,
					throwOnError: false,
					strict: "ignore"
				}));
			}
			element.children = fromHtmlIsomorphic(result, { fragment: true }).children;
		});
	};
}
var import_katex, assign, source;
var init_rehype_katex = __esmMin((() => {
	import_katex = /* @__PURE__ */ __toESM(require_katex(), 1);
	init_unist_util_visit();
	init_hast_util_to_text();
	init_browser();
	assign = Object.assign;
	source = "rehype-katex";
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-autolink-literal@1.0.5/node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
/**
* Email autolink literal.
*
* ```markdown
* > | a contact@example.org b
*       ^^^^^^^^^^^^^^^^^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeEmailAutolink(effects, ok, nok) {
	const self = this;
	/** @type {boolean | undefined} */
	let dot;
	/** @type {boolean} */
	let data;
	return start;
	/**
	* Start of email autolink literal.
	*
	* ```markdown
	* > | a contact@example.org b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (!gfmAtext(code) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) return nok(code);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkEmail");
		return atext(code);
	}
	/**
	* In email atext.
	*
	* ```markdown
	* > | a contact@example.org b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function atext(code) {
		if (gfmAtext(code)) {
			effects.consume(code);
			return atext;
		}
		if (code === 64) {
			effects.consume(code);
			return emailDomain;
		}
		return nok(code);
	}
	/**
	* In email domain.
	*
	* The reference code is a bit overly complex as it handles the `@`, of which
	* there may be just one.
	* Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L318>
	*
	* ```markdown
	* > | a contact@example.org b
	*               ^
	* ```
	*
	* @type {State}
	*/
	function emailDomain(code) {
		if (code === 46) return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code);
		if (code === 45 || code === 95 || asciiAlphanumeric(code)) {
			data = true;
			effects.consume(code);
			return emailDomain;
		}
		return emailDomainAfter(code);
	}
	/**
	* In email domain, on dot that is not a trail.
	*
	* ```markdown
	* > | a contact@example.org b
	*                      ^
	* ```
	*
	* @type {State}
	*/
	function emailDomainDot(code) {
		effects.consume(code);
		dot = true;
		return emailDomain;
	}
	/**
	* After email domain.
	*
	* ```markdown
	* > | a contact@example.org b
	*                          ^
	* ```
	*
	* @type {State}
	*/
	function emailDomainAfter(code) {
		if (data && dot && asciiAlpha(self.previous)) {
			effects.exit("literalAutolinkEmail");
			effects.exit("literalAutolink");
			return ok(code);
		}
		return nok(code);
	}
}
/**
* `www` autolink literal.
*
* ```markdown
* > | a www.example.org b
*       ^^^^^^^^^^^^^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeWwwAutolink(effects, ok, nok) {
	const self = this;
	return wwwStart;
	/**
	* Start of www autolink literal.
	*
	* ```markdown
	* > | www.example.com/a?b#c
	*     ^
	* ```
	*
	* @type {State}
	*/
	function wwwStart(code) {
		if (code !== 87 && code !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) return nok(code);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkWww");
		return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code);
	}
	/**
	* After a www autolink literal.
	*
	* ```markdown
	* > | www.example.com/a?b#c
	*                          ^
	* ```
	*
	* @type {State}
	*/
	function wwwAfter(code) {
		effects.exit("literalAutolinkWww");
		effects.exit("literalAutolink");
		return ok(code);
	}
}
/**
* Protocol autolink literal.
*
* ```markdown
* > | a https://example.org b
*       ^^^^^^^^^^^^^^^^^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeProtocolAutolink(effects, ok, nok) {
	const self = this;
	let buffer = "";
	let seen = false;
	return protocolStart;
	/**
	* Start of protocol autolink literal.
	*
	* ```markdown
	* > | https://example.com/a?b#c
	*     ^
	* ```
	*
	* @type {State}
	*/
	function protocolStart(code) {
		if ((code === 72 || code === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkHttp");
			buffer += String.fromCodePoint(code);
			effects.consume(code);
			return protocolPrefixInside;
		}
		return nok(code);
	}
	/**
	* In protocol.
	*
	* ```markdown
	* > | https://example.com/a?b#c
	*     ^^^^^
	* ```
	*
	* @type {State}
	*/
	function protocolPrefixInside(code) {
		if (asciiAlpha(code) && buffer.length < 5) {
			buffer += String.fromCodePoint(code);
			effects.consume(code);
			return protocolPrefixInside;
		}
		if (code === 58) {
			const protocol = buffer.toLowerCase();
			if (protocol === "http" || protocol === "https") {
				effects.consume(code);
				return protocolSlashesInside;
			}
		}
		return nok(code);
	}
	/**
	* In slashes.
	*
	* ```markdown
	* > | https://example.com/a?b#c
	*           ^^
	* ```
	*
	* @type {State}
	*/
	function protocolSlashesInside(code) {
		if (code === 47) {
			effects.consume(code);
			if (seen) return afterProtocol;
			seen = true;
			return protocolSlashesInside;
		}
		return nok(code);
	}
	/**
	* After protocol, before domain.
	*
	* ```markdown
	* > | https://example.com/a?b#c
	*             ^
	* ```
	*
	* @type {State}
	*/
	function afterProtocol(code) {
		return code === null || asciiControl(code) || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || unicodePunctuation(code) ? nok(code) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code);
	}
	/**
	* After a protocol autolink literal.
	*
	* ```markdown
	* > | https://example.com/a?b#c
	*                              ^
	* ```
	*
	* @type {State}
	*/
	function protocolAfter(code) {
		effects.exit("literalAutolinkHttp");
		effects.exit("literalAutolink");
		return ok(code);
	}
}
/**
* `www` prefix.
*
* ```markdown
* > | a www.example.org b
*       ^^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeWwwPrefix(effects, ok, nok) {
	let size = 0;
	return wwwPrefixInside;
	/**
	* In www prefix.
	*
	* ```markdown
	* > | www.example.com
	*     ^^^^
	* ```
	*
	* @type {State}
	*/
	function wwwPrefixInside(code) {
		if ((code === 87 || code === 119) && size < 3) {
			size++;
			effects.consume(code);
			return wwwPrefixInside;
		}
		if (code === 46 && size === 3) {
			effects.consume(code);
			return wwwPrefixAfter;
		}
		return nok(code);
	}
	/**
	* After www prefix.
	*
	* ```markdown
	* > | www.example.com
	*         ^
	* ```
	*
	* @type {State}
	*/
	function wwwPrefixAfter(code) {
		return code === null ? nok(code) : ok(code);
	}
}
/**
* Domain.
*
* ```markdown
* > | a https://example.org b
*               ^^^^^^^^^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeDomain(effects, ok, nok) {
	/** @type {boolean | undefined} */
	let underscoreInLastSegment;
	/** @type {boolean | undefined} */
	let underscoreInLastLastSegment;
	/** @type {boolean | undefined} */
	let seen;
	return domainInside;
	/**
	* In domain.
	*
	* ```markdown
	* > | https://example.com/a
	*             ^^^^^^^^^^^
	* ```
	*
	* @type {State}
	*/
	function domainInside(code) {
		if (code === 46 || code === 95) return effects.check(trail, domainAfter, domainAtPunctuation)(code);
		if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || code !== 45 && unicodePunctuation(code)) return domainAfter(code);
		seen = true;
		effects.consume(code);
		return domainInside;
	}
	/**
	* In domain, at potential trailing punctuation, that was not trailing.
	*
	* ```markdown
	* > | https://example.com
	*                    ^
	* ```
	*
	* @type {State}
	*/
	function domainAtPunctuation(code) {
		if (code === 95) underscoreInLastSegment = true;
		else {
			underscoreInLastLastSegment = underscoreInLastSegment;
			underscoreInLastSegment = void 0;
		}
		effects.consume(code);
		return domainInside;
	}
	/**
	* After domain.
	*
	* ```markdown
	* > | https://example.com/a
	*                        ^
	* ```
	*
	* @type {State} */
	function domainAfter(code) {
		if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) return nok(code);
		return ok(code);
	}
}
/**
* Path.
*
* ```markdown
* > | a https://example.org/stuff b
*                          ^^^^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizePath(effects, ok) {
	let sizeOpen = 0;
	let sizeClose = 0;
	return pathInside;
	/**
	* In path.
	*
	* ```markdown
	* > | https://example.com/a
	*                        ^^
	* ```
	*
	* @type {State}
	*/
	function pathInside(code) {
		if (code === 40) {
			sizeOpen++;
			effects.consume(code);
			return pathInside;
		}
		if (code === 41 && sizeClose < sizeOpen) return pathAtPunctuation(code);
		if (code === 33 || code === 34 || code === 38 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 60 || code === 63 || code === 93 || code === 95 || code === 126) return effects.check(trail, ok, pathAtPunctuation)(code);
		if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return ok(code);
		effects.consume(code);
		return pathInside;
	}
	/**
	* In path, at potential trailing punctuation, that was not trailing.
	*
	* ```markdown
	* > | https://example.com/a"b
	*                          ^
	* ```
	*
	* @type {State}
	*/
	function pathAtPunctuation(code) {
		if (code === 41) sizeClose++;
		effects.consume(code);
		return pathInside;
	}
}
/**
* Trail.
*
* This calls `ok` if this *is* the trail, followed by an end, which means
* the entire trail is not part of the link.
* It calls `nok` if this *is* part of the link.
*
* ```markdown
* > | https://example.com").
*                        ^^^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeTrail(effects, ok, nok) {
	return trail;
	/**
	* In trail of domain or path.
	*
	* ```markdown
	* > | https://example.com").
	*                        ^
	* ```
	*
	* @type {State}
	*/
	function trail(code) {
		if (code === 33 || code === 34 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 63 || code === 95 || code === 126) {
			effects.consume(code);
			return trail;
		}
		if (code === 38) {
			effects.consume(code);
			return trailCharRefStart;
		}
		if (code === 93) {
			effects.consume(code);
			return trailBracketAfter;
		}
		if (code === 60 || code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return ok(code);
		return nok(code);
	}
	/**
	* In trail, after `]`.
	*
	* > 👉 **Note**: this deviates from `cmark-gfm` to fix a bug.
	* > See end of <https://github.com/github/cmark-gfm/issues/278> for more.
	*
	* ```markdown
	* > | https://example.com](
	*                         ^
	* ```
	*
	* @type {State}
	*/
	function trailBracketAfter(code) {
		if (code === null || code === 40 || code === 91 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return ok(code);
		return trail(code);
	}
	/**
	* In character-reference like trail, after `&`.
	*
	* ```markdown
	* > | https://example.com&amp;).
	*                         ^
	* ```
	*
	* @type {State}
	*/
	function trailCharRefStart(code) {
		return asciiAlpha(code) ? trailCharRefInside(code) : nok(code);
	}
	/**
	* In character-reference like trail.
	*
	* ```markdown
	* > | https://example.com&amp;).
	*                         ^
	* ```
	*
	* @type {State}
	*/
	function trailCharRefInside(code) {
		if (code === 59) {
			effects.consume(code);
			return trail;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			return trailCharRefInside;
		}
		return nok(code);
	}
}
/**
* Dot in email domain trail.
*
* This calls `ok` if this *is* the trail, followed by an end, which means
* the trail is not part of the link.
* It calls `nok` if this *is* part of the link.
*
* ```markdown
* > | contact@example.org.
*                        ^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeEmailDomainDotTrail(effects, ok, nok) {
	return start;
	/**
	* Dot.
	*
	* ```markdown
	* > | contact@example.org.
	*                    ^   ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.consume(code);
		return after;
	}
	/**
	* After dot.
	*
	* ```markdown
	* > | contact@example.org.
	*                     ^   ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return asciiAlphanumeric(code) ? nok(code) : ok(code);
	}
}
/**
* See:
* <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L156>.
*
* @type {Previous}
*/
function previousWww(code) {
	return code === null || code === 40 || code === 42 || code === 95 || code === 91 || code === 93 || code === 126 || markdownLineEndingOrSpace(code);
}
/**
* See:
* <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L214>.
*
* @type {Previous}
*/
function previousProtocol(code) {
	return !asciiAlpha(code);
}
/**
* @this {TokenizeContext}
* @type {Previous}
*/
function previousEmail(code) {
	return !(code === 47 || gfmAtext(code));
}
/**
* @param {Code} code
* @returns {boolean}
*/
function gfmAtext(code) {
	return code === 43 || code === 45 || code === 46 || code === 95 || asciiAlphanumeric(code);
}
/**
* @param {Array<Event>} events
* @returns {boolean}
*/
function previousUnbalanced(events) {
	let index = events.length;
	let result = false;
	while (index--) {
		const token = events[index][1];
		if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
			result = true;
			break;
		}
		if (token._gfmAutolinkLiteralWalkedInto) {
			result = false;
			break;
		}
	}
	if (events.length > 0 && !result) events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
	return result;
}
var wwwPrefix, domain, path, trail, emailDomainDotTrail, wwwAutolink, protocolAutolink, emailAutolink, text, gfmAutolinkLiteral, code;
var init_syntax$5 = __esmMin((() => {
	init_micromark_util_character();
	wwwPrefix = {
		tokenize: tokenizeWwwPrefix,
		partial: true
	};
	domain = {
		tokenize: tokenizeDomain,
		partial: true
	};
	path = {
		tokenize: tokenizePath,
		partial: true
	};
	trail = {
		tokenize: tokenizeTrail,
		partial: true
	};
	emailDomainDotTrail = {
		tokenize: tokenizeEmailDomainDotTrail,
		partial: true
	};
	wwwAutolink = {
		tokenize: tokenizeWwwAutolink,
		previous: previousWww
	};
	protocolAutolink = {
		tokenize: tokenizeProtocolAutolink,
		previous: previousProtocol
	};
	emailAutolink = {
		tokenize: tokenizeEmailAutolink,
		previous: previousEmail
	};
	text = {};
	gfmAutolinkLiteral = { text };
	code = 48;
	while (code < 123) {
		text[code] = emailAutolink;
		code++;
		if (code === 58) code = 65;
		else if (code === 91) code = 97;
	}
	text[43] = emailAutolink;
	text[45] = emailAutolink;
	text[46] = emailAutolink;
	text[95] = emailAutolink;
	text[72] = [emailAutolink, protocolAutolink];
	text[104] = [emailAutolink, protocolAutolink];
	text[87] = [emailAutolink, wwwAutolink];
	text[119] = [emailAutolink, wwwAutolink];
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-autolink-literal@1.0.5/node_modules/micromark-extension-gfm-autolink-literal/index.js
var init_micromark_extension_gfm_autolink_literal = __esmMin((() => {
	init_syntax$5();
	init_micromark_util_sanitize_uri();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-footnote@1.1.2/node_modules/micromark-extension-gfm-footnote/lib/syntax.js
/**
* Create an extension for `micromark` to enable GFM footnote syntax.
*
* @returns {Extension}
*   Extension for `micromark` that can be passed in `extensions` to
*   enable GFM footnote syntax.
*/
function gfmFootnote() {
	/** @type {Extension} */
	return {
		document: { [91]: {
			tokenize: tokenizeDefinitionStart,
			continuation: { tokenize: tokenizeDefinitionContinuation },
			exit: gfmFootnoteDefinitionEnd
		} },
		text: {
			[91]: { tokenize: tokenizeGfmFootnoteCall },
			[93]: {
				add: "after",
				tokenize: tokenizePotentialGfmFootnoteCall,
				resolveTo: resolveToPotentialGfmFootnoteCall
			}
		}
	};
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizePotentialGfmFootnoteCall(effects, ok, nok) {
	const self = this;
	let index = self.events.length;
	/** @type {Array<string>} */
	const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
	/** @type {Token} */
	let labelStart;
	while (index--) {
		const token = self.events[index][1];
		if (token.type === "labelImage") {
			labelStart = token;
			break;
		}
		if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") break;
	}
	return start;
	/**
	* @type {State}
	*/
	function start(code) {
		if (!labelStart || !labelStart._balanced) return nok(code);
		const id = normalizeIdentifier(self.sliceSerialize({
			start: labelStart.end,
			end: self.now()
		}));
		if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) return nok(code);
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code);
		effects.exit("gfmFootnoteCallLabelMarker");
		return ok(code);
	}
}
/** @type {Resolver} */
function resolveToPotentialGfmFootnoteCall(events, context) {
	let index = events.length;
	while (index--) if (events[index][1].type === "labelImage" && events[index][0] === "enter") {
		events[index][1];
		break;
	}
	events[index + 1][1].type = "data";
	events[index + 3][1].type = "gfmFootnoteCallLabelMarker";
	/** @type {Token} */
	const call = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, events[index + 3][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	/** @type {Token} */
	const marker = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, events[index + 3][1].end),
		end: Object.assign({}, events[index + 3][1].end)
	};
	marker.end.column++;
	marker.end.offset++;
	marker.end._bufferIndex++;
	/** @type {Token} */
	const string = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, marker.end),
		end: Object.assign({}, events[events.length - 1][1].start)
	};
	/** @type {Token} */
	const chunk = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, string.start),
		end: Object.assign({}, string.end)
	};
	/** @type {Array<Event>} */
	const replacement = [
		events[index + 1],
		events[index + 2],
		[
			"enter",
			call,
			context
		],
		events[index + 3],
		events[index + 4],
		[
			"enter",
			marker,
			context
		],
		[
			"exit",
			marker,
			context
		],
		[
			"enter",
			string,
			context
		],
		[
			"enter",
			chunk,
			context
		],
		[
			"exit",
			chunk,
			context
		],
		[
			"exit",
			string,
			context
		],
		events[events.length - 2],
		events[events.length - 1],
		[
			"exit",
			call,
			context
		]
	];
	events.splice(index, events.length - index + 1, ...replacement);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeGfmFootnoteCall(effects, ok, nok) {
	const self = this;
	/** @type {Array<string>} */
	const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
	let size = 0;
	/** @type {boolean} */
	let data;
	return start;
	/**
	* Start of footnote label.
	*
	* ```markdown
	* > | a [^b] c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("gfmFootnoteCall");
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code);
		effects.exit("gfmFootnoteCallLabelMarker");
		return callStart;
	}
	/**
	* After `[`, at `^`.
	*
	* ```markdown
	* > | a [^b] c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function callStart(code) {
		if (code !== 94) return nok(code);
		effects.enter("gfmFootnoteCallMarker");
		effects.consume(code);
		effects.exit("gfmFootnoteCallMarker");
		effects.enter("gfmFootnoteCallString");
		effects.enter("chunkString").contentType = "string";
		return callData;
	}
	/**
	* In label.
	*
	* ```markdown
	* > | a [^b] c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function callData(code) {
		if (size > 999 || code === 93 && !data || code === null || code === 91 || markdownLineEndingOrSpace(code)) return nok(code);
		if (code === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteCallString");
			if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) return nok(code);
			effects.enter("gfmFootnoteCallLabelMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteCallLabelMarker");
			effects.exit("gfmFootnoteCall");
			return ok;
		}
		if (!markdownLineEndingOrSpace(code)) data = true;
		size++;
		effects.consume(code);
		return code === 92 ? callEscape : callData;
	}
	/**
	* On character after escape.
	*
	* ```markdown
	* > | a [^b\c] d
	*           ^
	* ```
	*
	* @type {State}
	*/
	function callEscape(code) {
		if (code === 91 || code === 92 || code === 93) {
			effects.consume(code);
			size++;
			return callData;
		}
		return callData(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeDefinitionStart(effects, ok, nok) {
	const self = this;
	/** @type {Array<string>} */
	const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
	/** @type {string} */
	let identifier;
	let size = 0;
	/** @type {boolean | undefined} */
	let data;
	return start;
	/**
	* Start of GFM footnote definition.
	*
	* ```markdown
	* > | [^a]: b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("gfmFootnoteDefinition")._container = true;
		effects.enter("gfmFootnoteDefinitionLabel");
		effects.enter("gfmFootnoteDefinitionLabelMarker");
		effects.consume(code);
		effects.exit("gfmFootnoteDefinitionLabelMarker");
		return labelAtMarker;
	}
	/**
	* In label, at caret.
	*
	* ```markdown
	* > | [^a]: b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function labelAtMarker(code) {
		if (code === 94) {
			effects.enter("gfmFootnoteDefinitionMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteDefinitionMarker");
			effects.enter("gfmFootnoteDefinitionLabelString");
			effects.enter("chunkString").contentType = "string";
			return labelInside;
		}
		return nok(code);
	}
	/**
	* In label.
	*
	* > 👉 **Note**: `cmark-gfm` prevents whitespace from occurring in footnote
	* > definition labels.
	*
	* ```markdown
	* > | [^a]: b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function labelInside(code) {
		if (size > 999 || code === 93 && !data || code === null || code === 91 || markdownLineEndingOrSpace(code)) return nok(code);
		if (code === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteDefinitionLabelString");
			identifier = normalizeIdentifier(self.sliceSerialize(token));
			effects.enter("gfmFootnoteDefinitionLabelMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteDefinitionLabelMarker");
			effects.exit("gfmFootnoteDefinitionLabel");
			return labelAfter;
		}
		if (!markdownLineEndingOrSpace(code)) data = true;
		size++;
		effects.consume(code);
		return code === 92 ? labelEscape : labelInside;
	}
	/**
	* After `\`, at a special character.
	*
	* > 👉 **Note**: `cmark-gfm` currently does not support escaped brackets:
	* > <https://github.com/github/cmark-gfm/issues/240>
	*
	* ```markdown
	* > | [^a\*b]: c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function labelEscape(code) {
		if (code === 91 || code === 92 || code === 93) {
			effects.consume(code);
			size++;
			return labelInside;
		}
		return labelInside(code);
	}
	/**
	* After definition label.
	*
	* ```markdown
	* > | [^a]: b
	*         ^
	* ```
	*
	* @type {State}
	*/
	function labelAfter(code) {
		if (code === 58) {
			effects.enter("definitionMarker");
			effects.consume(code);
			effects.exit("definitionMarker");
			if (!defined.includes(identifier)) defined.push(identifier);
			return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
		}
		return nok(code);
	}
	/**
	* After definition prefix.
	*
	* ```markdown
	* > | [^a]: b
	*           ^
	* ```
	*
	* @type {State}
	*/
	function whitespaceAfter(code) {
		return ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeDefinitionContinuation(effects, ok, nok) {
	return effects.check(blankLine, ok, effects.attempt(indent, ok, nok));
}
/** @type {Exiter} */
function gfmFootnoteDefinitionEnd(effects) {
	effects.exit("gfmFootnoteDefinition");
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeIndent(effects, ok, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 5);
	/**
	* @type {State}
	*/
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok(code) : nok(code);
	}
}
var indent;
var init_syntax$4 = __esmMin((() => {
	init_micromark_core_commonmark();
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_normalize_identifier();
	indent = {
		tokenize: tokenizeIndent,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-footnote@1.1.2/node_modules/micromark-extension-gfm-footnote/index.js
var init_micromark_extension_gfm_footnote = __esmMin((() => {
	init_syntax$4();
	init_micromark_util_sanitize_uri();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-strikethrough@1.0.7/node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
/**
* Create an extension for `micromark` to enable GFM strikethrough syntax.
*
* @param {Options | null | undefined} [options]
*   Configuration.
* @returns {Extension}
*   Extension for `micromark` that can be passed in `extensions`, to
*   enable GFM strikethrough syntax.
*/
function gfmStrikethrough(options) {
	let single = (options || {}).singleTilde;
	const tokenizer = {
		tokenize: tokenizeStrikethrough,
		resolveAll: resolveAllStrikethrough
	};
	if (single === null || single === void 0) single = true;
	return {
		text: { [126]: tokenizer },
		insideSpan: { null: [tokenizer] },
		attentionMarkers: { null: [126] }
	};
	/**
	* Take events and resolve strikethrough.
	*
	* @type {Resolver}
	*/
	function resolveAllStrikethrough(events, context) {
		let index = -1;
		while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
			let open = index;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
				events[index][1].type = "strikethroughSequence";
				events[open][1].type = "strikethroughSequence";
				/** @type {Token} */
				const strikethrough = {
					type: "strikethrough",
					start: Object.assign({}, events[open][1].start),
					end: Object.assign({}, events[index][1].end)
				};
				/** @type {Token} */
				const text = {
					type: "strikethroughText",
					start: Object.assign({}, events[open][1].end),
					end: Object.assign({}, events[index][1].start)
				};
				/** @type {Array<Event>} */
				const nextEvents = [
					[
						"enter",
						strikethrough,
						context
					],
					[
						"enter",
						events[open][1],
						context
					],
					[
						"exit",
						events[open][1],
						context
					],
					[
						"enter",
						text,
						context
					]
				];
				const insideSpan = context.parser.constructs.insideSpan.null;
				if (insideSpan) splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan, events.slice(open + 1, index), context));
				splice(nextEvents, nextEvents.length, 0, [
					[
						"exit",
						text,
						context
					],
					[
						"enter",
						events[index][1],
						context
					],
					[
						"exit",
						events[index][1],
						context
					],
					[
						"exit",
						strikethrough,
						context
					]
				]);
				splice(events, open - 1, index - open + 3, nextEvents);
				index = open + nextEvents.length - 2;
				break;
			}
		}
		index = -1;
		while (++index < events.length) if (events[index][1].type === "strikethroughSequenceTemporary") events[index][1].type = "data";
		return events;
	}
	/**
	* @this {TokenizeContext}
	* @type {Tokenizer}
	*/
	function tokenizeStrikethrough(effects, ok, nok) {
		const previous = this.previous;
		const events = this.events;
		let size = 0;
		return start;
		/** @type {State} */
		function start(code) {
			if (previous === 126 && events[events.length - 1][1].type !== "characterEscape") return nok(code);
			effects.enter("strikethroughSequenceTemporary");
			return more(code);
		}
		/** @type {State} */
		function more(code) {
			const before = classifyCharacter(previous);
			if (code === 126) {
				if (size > 1) return nok(code);
				effects.consume(code);
				size++;
				return more;
			}
			if (size < 2 && !single) return nok(code);
			const token = effects.exit("strikethroughSequenceTemporary");
			const after = classifyCharacter(code);
			token._open = !after || after === 2 && Boolean(before);
			token._close = !before || before === 2 && Boolean(after);
			return ok(code);
		}
	}
}
var init_syntax$3 = __esmMin((() => {
	init_micromark_util_chunked();
	init_micromark_util_classify_character();
	init_micromark_util_resolve_all();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-strikethrough@1.0.7/node_modules/micromark-extension-gfm-strikethrough/index.js
var init_micromark_extension_gfm_strikethrough = __esmMin((() => {
	init_syntax$3();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-table@1.0.7/node_modules/micromark-extension-gfm-table/lib/edit-map.js
/**
* Create an edit.
*
* @param {EditMap} editMap
* @param {number} at
* @param {number} remove
* @param {Array<Event>} add
* @returns {void}
*/
function addImpl(editMap, at, remove, add) {
	let index = 0;
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (remove === 0 && add.length === 0) return;
	while (index < editMap.map.length) {
		if (editMap.map[index][0] === at) {
			editMap.map[index][1] += remove;
			editMap.map[index][2].push(...add);
			return;
		}
		index += 1;
	}
	editMap.map.push([
		at,
		remove,
		add
	]);
}
var EditMap;
var init_edit_map = __esmMin((() => {
	EditMap = class {
		/**
		* Create a new edit map.
		*/
		constructor() {
			/**
			* Record of changes.
			*
			* @type {Array<Change>}
			*/
			this.map = [];
		}
		/**
		* Create an edit: a remove and/or add at a certain place.
		*
		* @param {number} index
		* @param {number} remove
		* @param {Array<Event>} add
		* @returns {void}
		*/
		add(index, remove, add) {
			addImpl(this, index, remove, add);
		}
		/**
		* Done, change the events.
		*
		* @param {Array<Event>} events
		* @returns {void}
		*/
		consume(events) {
			this.map.sort((a, b) => a[0] - b[0]);
			/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
			if (this.map.length === 0) return;
			let index = this.map.length;
			/** @type {Array<Array<Event>>} */
			const vecs = [];
			while (index > 0) {
				index -= 1;
				vecs.push(events.slice(this.map[index][0] + this.map[index][1]));
				vecs.push(this.map[index][2]);
				events.length = this.map[index][0];
			}
			vecs.push([...events]);
			events.length = 0;
			let slice = vecs.pop();
			while (slice) {
				events.push(...slice);
				slice = vecs.pop();
			}
			this.map.length = 0;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-table@1.0.7/node_modules/micromark-extension-gfm-table/lib/infer.js
/**
* @typedef {import('micromark-util-types').Event} Event
*/
/**
* @typedef {'left' | 'center' | 'right' | 'none'} Align
*/
/**
* Figure out the alignment of a GFM table.
*
* @param {Array<Event>} events
* @param {number} index
* @returns {Array<Align>}
*/
function gfmTableAlign(events, index) {
	let inDelimiterRow = false;
	/** @type {Array<Align>} */
	const align = [];
	while (index < events.length) {
		const event = events[index];
		if (inDelimiterRow) {
			if (event[0] === "enter") {
				if (event[1].type === "tableContent") align.push(events[index + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			} else if (event[1].type === "tableContent") {
				if (events[index - 1][1].type === "tableDelimiterMarker") {
					const alignIndex = align.length - 1;
					align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
				}
			} else if (event[1].type === "tableDelimiterRow") break;
		} else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") inDelimiterRow = true;
		index += 1;
	}
	return align;
}
var init_infer = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-table@1.0.7/node_modules/micromark-extension-gfm-table/lib/syntax.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeTable(effects, ok, nok) {
	const self = this;
	let size = 0;
	let sizeB = 0;
	/** @type {boolean | undefined} */
	let seen;
	return start;
	/**
	* Start of a GFM table.
	*
	* If there is a valid table row or table head before, then we try to parse
	* another row.
	* Otherwise, we try to parse a head.
	*
	* ```markdown
	* > | | a |
	*     ^
	*   | | - |
	* > | | b |
	*     ^
	* ```
	* @type {State}
	*/
	function start(code) {
		let index = self.events.length - 1;
		while (index > -1) {
			const type = self.events[index][1].type;
			if (type === "lineEnding" || type === "linePrefix") index--;
			else break;
		}
		const tail = index > -1 ? self.events[index][1].type : null;
		const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
		if (next === bodyRowStart && self.parser.lazy[self.now().line]) return nok(code);
		return next(code);
	}
	/**
	* Before table head row.
	*
	* ```markdown
	* > | | a |
	*     ^
	*   | | - |
	*   | | b |
	* ```
	*
	* @type {State}
	*/
	function headRowBefore(code) {
		effects.enter("tableHead");
		effects.enter("tableRow");
		return headRowStart(code);
	}
	/**
	* Before table head row, after whitespace.
	*
	* ```markdown
	* > | | a |
	*     ^
	*   | | - |
	*   | | b |
	* ```
	*
	* @type {State}
	*/
	function headRowStart(code) {
		if (code === 124) return headRowBreak(code);
		seen = true;
		sizeB += 1;
		return headRowBreak(code);
	}
	/**
	* At break in table head row.
	*
	* ```markdown
	* > | | a |
	*     ^
	*       ^
	*         ^
	*   | | - |
	*   | | b |
	* ```
	*
	* @type {State}
	*/
	function headRowBreak(code) {
		if (code === null) return nok(code);
		if (markdownLineEnding(code)) {
			if (sizeB > 1) {
				sizeB = 0;
				self.interrupt = true;
				effects.exit("tableRow");
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return headDelimiterStart;
			}
			return nok(code);
		}
		if (markdownSpace(code)) return factorySpace(effects, headRowBreak, "whitespace")(code);
		sizeB += 1;
		if (seen) {
			seen = false;
			size += 1;
		}
		if (code === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code);
			effects.exit("tableCellDivider");
			seen = true;
			return headRowBreak;
		}
		effects.enter("data");
		return headRowData(code);
	}
	/**
	* In table head row data.
	*
	* ```markdown
	* > | | a |
	*       ^
	*   | | - |
	*   | | b |
	* ```
	*
	* @type {State}
	*/
	function headRowData(code) {
		if (code === null || code === 124 || markdownLineEndingOrSpace(code)) {
			effects.exit("data");
			return headRowBreak(code);
		}
		effects.consume(code);
		return code === 92 ? headRowEscape : headRowData;
	}
	/**
	* In table head row escape.
	*
	* ```markdown
	* > | | a\-b |
	*         ^
	*   | | ---- |
	*   | | c    |
	* ```
	*
	* @type {State}
	*/
	function headRowEscape(code) {
		if (code === 92 || code === 124) {
			effects.consume(code);
			return headRowData;
		}
		return headRowData(code);
	}
	/**
	* Before delimiter row.
	*
	* ```markdown
	*   | | a |
	* > | | - |
	*     ^
	*   | | b |
	* ```
	*
	* @type {State}
	*/
	function headDelimiterStart(code) {
		self.interrupt = false;
		if (self.parser.lazy[self.now().line]) return nok(code);
		effects.enter("tableDelimiterRow");
		seen = false;
		if (markdownSpace(code)) return factorySpace(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
		return headDelimiterBefore(code);
	}
	/**
	* Before delimiter row, after optional whitespace.
	*
	* Reused when a `|` is found later, to parse another cell.
	*
	* ```markdown
	*   | | a |
	* > | | - |
	*     ^
	*   | | b |
	* ```
	*
	* @type {State}
	*/
	function headDelimiterBefore(code) {
		if (code === 45 || code === 58) return headDelimiterValueBefore(code);
		if (code === 124) {
			seen = true;
			effects.enter("tableCellDivider");
			effects.consume(code);
			effects.exit("tableCellDivider");
			return headDelimiterCellBefore;
		}
		return headDelimiterNok(code);
	}
	/**
	* After `|`, before delimiter cell.
	*
	* ```markdown
	*   | | a |
	* > | | - |
	*      ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterCellBefore(code) {
		if (markdownSpace(code)) return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code);
		return headDelimiterValueBefore(code);
	}
	/**
	* Before delimiter cell value.
	*
	* ```markdown
	*   | | a |
	* > | | - |
	*       ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterValueBefore(code) {
		if (code === 58) {
			sizeB += 1;
			seen = true;
			effects.enter("tableDelimiterMarker");
			effects.consume(code);
			effects.exit("tableDelimiterMarker");
			return headDelimiterLeftAlignmentAfter;
		}
		if (code === 45) {
			sizeB += 1;
			return headDelimiterLeftAlignmentAfter(code);
		}
		if (code === null || markdownLineEnding(code)) return headDelimiterCellAfter(code);
		return headDelimiterNok(code);
	}
	/**
	* After delimiter cell left alignment marker.
	*
	* ```markdown
	*   | | a  |
	* > | | :- |
	*        ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterLeftAlignmentAfter(code) {
		if (code === 45) {
			effects.enter("tableDelimiterFiller");
			return headDelimiterFiller(code);
		}
		return headDelimiterNok(code);
	}
	/**
	* In delimiter cell filler.
	*
	* ```markdown
	*   | | a |
	* > | | - |
	*       ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterFiller(code) {
		if (code === 45) {
			effects.consume(code);
			return headDelimiterFiller;
		}
		if (code === 58) {
			seen = true;
			effects.exit("tableDelimiterFiller");
			effects.enter("tableDelimiterMarker");
			effects.consume(code);
			effects.exit("tableDelimiterMarker");
			return headDelimiterRightAlignmentAfter;
		}
		effects.exit("tableDelimiterFiller");
		return headDelimiterRightAlignmentAfter(code);
	}
	/**
	* After delimiter cell right alignment marker.
	*
	* ```markdown
	*   | |  a |
	* > | | -: |
	*         ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterRightAlignmentAfter(code) {
		if (markdownSpace(code)) return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code);
		return headDelimiterCellAfter(code);
	}
	/**
	* After delimiter cell.
	*
	* ```markdown
	*   | |  a |
	* > | | -: |
	*          ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterCellAfter(code) {
		if (code === 124) return headDelimiterBefore(code);
		if (code === null || markdownLineEnding(code)) {
			if (!seen || size !== sizeB) return headDelimiterNok(code);
			effects.exit("tableDelimiterRow");
			effects.exit("tableHead");
			return ok(code);
		}
		return headDelimiterNok(code);
	}
	/**
	* In delimiter row, at a disallowed byte.
	*
	* ```markdown
	*   | | a |
	* > | | x |
	*       ^
	* ```
	*
	* @type {State}
	*/
	function headDelimiterNok(code) {
		return nok(code);
	}
	/**
	* Before table body row.
	*
	* ```markdown
	*   | | a |
	*   | | - |
	* > | | b |
	*     ^
	* ```
	*
	* @type {State}
	*/
	function bodyRowStart(code) {
		effects.enter("tableRow");
		return bodyRowBreak(code);
	}
	/**
	* At break in table body row.
	*
	* ```markdown
	*   | | a |
	*   | | - |
	* > | | b |
	*     ^
	*       ^
	*         ^
	* ```
	*
	* @type {State}
	*/
	function bodyRowBreak(code) {
		if (code === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code);
			effects.exit("tableCellDivider");
			return bodyRowBreak;
		}
		if (code === null || markdownLineEnding(code)) {
			effects.exit("tableRow");
			return ok(code);
		}
		if (markdownSpace(code)) return factorySpace(effects, bodyRowBreak, "whitespace")(code);
		effects.enter("data");
		return bodyRowData(code);
	}
	/**
	* In table body row data.
	*
	* ```markdown
	*   | | a |
	*   | | - |
	* > | | b |
	*       ^
	* ```
	*
	* @type {State}
	*/
	function bodyRowData(code) {
		if (code === null || code === 124 || markdownLineEndingOrSpace(code)) {
			effects.exit("data");
			return bodyRowBreak(code);
		}
		effects.consume(code);
		return code === 92 ? bodyRowEscape : bodyRowData;
	}
	/**
	* In table body row escape.
	*
	* ```markdown
	*   | | a    |
	*   | | ---- |
	* > | | b\-c |
	*         ^
	* ```
	*
	* @type {State}
	*/
	function bodyRowEscape(code) {
		if (code === 92 || code === 124) {
			effects.consume(code);
			return bodyRowData;
		}
		return bodyRowData(code);
	}
}
/** @type {Resolver} */
function resolveTable(events, context) {
	let index = -1;
	let inFirstCellAwaitingPipe = true;
	/** @type {RowKind} */
	let rowKind = 0;
	/** @type {Range} */
	let lastCell = [
		0,
		0,
		0,
		0
	];
	/** @type {Range} */
	let cell = [
		0,
		0,
		0,
		0
	];
	let afterHeadAwaitingFirstBodyRow = false;
	let lastTableEnd = 0;
	/** @type {Token | undefined} */
	let currentTable;
	/** @type {Token | undefined} */
	let currentBody;
	/** @type {Token | undefined} */
	let currentCell;
	const map = new EditMap();
	while (++index < events.length) {
		const event = events[index];
		const token = event[1];
		if (event[0] === "enter") {
			if (token.type === "tableHead") {
				afterHeadAwaitingFirstBodyRow = false;
				if (lastTableEnd !== 0) {
					flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
					currentBody = void 0;
					lastTableEnd = 0;
				}
				currentTable = {
					type: "table",
					start: Object.assign({}, token.start),
					end: Object.assign({}, token.end)
				};
				map.add(index, 0, [[
					"enter",
					currentTable,
					context
				]]);
			} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
				inFirstCellAwaitingPipe = true;
				currentCell = void 0;
				lastCell = [
					0,
					0,
					0,
					0
				];
				cell = [
					0,
					index + 1,
					0,
					0
				];
				if (afterHeadAwaitingFirstBodyRow) {
					afterHeadAwaitingFirstBodyRow = false;
					currentBody = {
						type: "tableBody",
						start: Object.assign({}, token.start),
						end: Object.assign({}, token.end)
					};
					map.add(index, 0, [[
						"enter",
						currentBody,
						context
					]]);
				}
				rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
			} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
				inFirstCellAwaitingPipe = false;
				if (cell[2] === 0) {
					if (lastCell[1] !== 0) {
						cell[0] = cell[1];
						currentCell = flushCell(map, context, lastCell, rowKind, void 0, currentCell);
						lastCell = [
							0,
							0,
							0,
							0
						];
					}
					cell[2] = index;
				}
			} else if (token.type === "tableCellDivider") {
				if (inFirstCellAwaitingPipe) inFirstCellAwaitingPipe = false;
				else {
					if (lastCell[1] !== 0) {
						cell[0] = cell[1];
						currentCell = flushCell(map, context, lastCell, rowKind, void 0, currentCell);
					}
					lastCell = cell;
					cell = [
						lastCell[1],
						index,
						0,
						0
					];
				}
			}
		} else if (token.type === "tableHead") {
			afterHeadAwaitingFirstBodyRow = true;
			lastTableEnd = index;
		} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
			lastTableEnd = index;
			if (lastCell[1] !== 0) {
				cell[0] = cell[1];
				currentCell = flushCell(map, context, lastCell, rowKind, index, currentCell);
			} else if (cell[1] !== 0) currentCell = flushCell(map, context, cell, rowKind, index, currentCell);
			rowKind = 0;
		} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) cell[3] = index;
	}
	if (lastTableEnd !== 0) flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
	map.consume(context.events);
	index = -1;
	while (++index < context.events.length) {
		const event = context.events[index];
		if (event[0] === "enter" && event[1].type === "table") event[1]._align = gfmTableAlign(context.events, index);
	}
	return events;
}
/**
*
* @param {EditMap} map
* @param {TokenizeContext} context
* @param {Range} range
* @param {RowKind} rowKind
* @param {number | undefined} rowEnd
* @param {Token | undefined} previousCell
* @returns {Token | undefined}
*/
function flushCell(map, context, range, rowKind, rowEnd, previousCell) {
	const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
	const valueName = "tableContent";
	if (range[0] !== 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
		map.add(range[0], 0, [[
			"exit",
			previousCell,
			context
		]]);
	}
	const now = getPoint(context.events, range[1]);
	previousCell = {
		type: groupName,
		start: Object.assign({}, now),
		end: Object.assign({}, now)
	};
	map.add(range[1], 0, [[
		"enter",
		previousCell,
		context
	]]);
	if (range[2] !== 0) {
		const relatedStart = getPoint(context.events, range[2]);
		const relatedEnd = getPoint(context.events, range[3]);
		/** @type {Token} */
		const valueToken = {
			type: valueName,
			start: Object.assign({}, relatedStart),
			end: Object.assign({}, relatedEnd)
		};
		map.add(range[2], 0, [[
			"enter",
			valueToken,
			context
		]]);
		if (rowKind !== 2) {
			const start = context.events[range[2]];
			const end = context.events[range[3]];
			start[1].end = Object.assign({}, end[1].end);
			start[1].type = "chunkText";
			start[1].contentType = "text";
			if (range[3] > range[2] + 1) {
				const a = range[2] + 1;
				const b = range[3] - range[2] - 1;
				map.add(a, b, []);
			}
		}
		map.add(range[3] + 1, 0, [[
			"exit",
			valueToken,
			context
		]]);
	}
	if (rowEnd !== void 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
		map.add(rowEnd, 0, [[
			"exit",
			previousCell,
			context
		]]);
		previousCell = void 0;
	}
	return previousCell;
}
/**
* Generate table end (and table body end).
*
* @param {EditMap} map
* @param {TokenizeContext} context
* @param {number} index
* @param {Token} table
* @param {Token | undefined} tableBody
*/
function flushTableEnd(map, context, index, table, tableBody) {
	/** @type {Array<Event>} */
	const exits = [];
	const related = getPoint(context.events, index);
	if (tableBody) {
		tableBody.end = Object.assign({}, related);
		exits.push([
			"exit",
			tableBody,
			context
		]);
	}
	table.end = Object.assign({}, related);
	exits.push([
		"exit",
		table,
		context
	]);
	map.add(index + 1, 0, exits);
}
/**
* @param {Array<Event>} events
* @param {number} index
* @returns {readonly Point}
*/
function getPoint(events, index) {
	const event = events[index];
	const side = event[0] === "enter" ? "start" : "end";
	return event[1][side];
}
var gfmTable;
var init_syntax$2 = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_edit_map();
	init_infer();
	gfmTable = { flow: { null: {
		tokenize: tokenizeTable,
		resolveAll: resolveTable
	} } };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-table@1.0.7/node_modules/micromark-extension-gfm-table/index.js
var init_micromark_extension_gfm_table = __esmMin((() => {
	init_syntax$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-task-list-item@1.0.5/node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeTasklistCheck(effects, ok, nok) {
	const self = this;
	return open;
	/**
	* At start of task list item check.
	*
	* ```markdown
	* > | * [x] y.
	*       ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (self.previous !== null || !self._gfmTasklistFirstContentOfListItem) return nok(code);
		effects.enter("taskListCheck");
		effects.enter("taskListCheckMarker");
		effects.consume(code);
		effects.exit("taskListCheckMarker");
		return inside;
	}
	/**
	* In task list item check.
	*
	* ```markdown
	* > | * [x] y.
	*        ^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (markdownLineEndingOrSpace(code)) {
			effects.enter("taskListCheckValueUnchecked");
			effects.consume(code);
			effects.exit("taskListCheckValueUnchecked");
			return close;
		}
		if (code === 88 || code === 120) {
			effects.enter("taskListCheckValueChecked");
			effects.consume(code);
			effects.exit("taskListCheckValueChecked");
			return close;
		}
		return nok(code);
	}
	/**
	* At close of task list item check.
	*
	* ```markdown
	* > | * [x] y.
	*         ^
	* ```
	*
	* @type {State}
	*/
	function close(code) {
		if (code === 93) {
			effects.enter("taskListCheckMarker");
			effects.consume(code);
			effects.exit("taskListCheckMarker");
			effects.exit("taskListCheck");
			return after;
		}
		return nok(code);
	}
	/**
	* @type {State}
	*/
	function after(code) {
		if (markdownLineEnding(code)) return ok(code);
		if (markdownSpace(code)) return effects.check({ tokenize: spaceThenNonSpace }, ok, nok)(code);
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function spaceThenNonSpace(effects, ok, nok) {
	return factorySpace(effects, after, "whitespace");
	/**
	* After whitespace, after task list item check.
	*
	* ```markdown
	* > | * [x] y.
	*           ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return code === null ? nok(code) : ok(code);
	}
}
var tasklistCheck, gfmTaskListItem;
var init_syntax$1 = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	tasklistCheck = { tokenize: tokenizeTasklistCheck };
	gfmTaskListItem = { text: { [91]: tasklistCheck } };
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm-task-list-item@1.0.5/node_modules/micromark-extension-gfm-task-list-item/index.js
var init_micromark_extension_gfm_task_list_item = __esmMin((() => {
	init_syntax$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-gfm@2.0.3/node_modules/micromark-extension-gfm/index.js
/**
* Create an extension for `micromark` to enable GFM syntax.
*
* @param {Options | null | undefined} [options]
*   Configuration (optional).
*
*   Passed to `micromark-extens-gfm-strikethrough`.
* @returns {Extension}
*   Extension for `micromark` that can be passed in `extensions` to enable GFM
*   syntax.
*/
function gfm(options) {
	return combineExtensions([
		gfmAutolinkLiteral,
		gfmFootnote(),
		gfmStrikethrough(options),
		gfmTable,
		gfmTaskListItem
	]);
}
var init_micromark_extension_gfm = __esmMin((() => {
	init_micromark_util_combine_extensions();
	init_micromark_extension_gfm_autolink_literal();
	init_micromark_extension_gfm_footnote();
	init_micromark_extension_gfm_strikethrough();
	init_micromark_extension_gfm_table();
	init_micromark_extension_gfm_task_list_item();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-find-and-replace@2.2.2/node_modules/mdast-util-find-and-replace/lib/index.js
/**
* Turn a schema into pairs.
*
* @param {FindAndReplaceSchema | FindAndReplaceList} schema
*   Schema.
* @returns {Pairs}
*   Clean pairs.
*/
function toPairs(schema) {
	/** @type {Pairs} */
	const result = [];
	if (typeof schema !== "object") throw new TypeError("Expected array or object as schema");
	if (Array.isArray(schema)) {
		let index = -1;
		while (++index < schema.length) result.push([toExpression(schema[index][0]), toFunction(schema[index][1])]);
	} else {
		/** @type {string} */
		let key;
		for (key in schema) if (own.call(schema, key)) result.push([toExpression(key), toFunction(schema[key])]);
	}
	return result;
}
/**
* Turn a find into an expression.
*
* @param {Find} find
*   Find.
* @returns {RegExp}
*   Expression.
*/
function toExpression(find) {
	return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
}
/**
* Turn a replace into a function.
*
* @param {Replace} replace
*   Replace.
* @returns {ReplaceFunction}
*   Function.
*/
function toFunction(replace) {
	return typeof replace === "function" ? replace : () => replace;
}
var own, findAndReplace;
var init_lib$7 = __esmMin((() => {
	init_escape_string_regexp();
	init_unist_util_visit_parents();
	init_unist_util_is();
	own = {}.hasOwnProperty;
	findAndReplace = (
	/**
	* @template {Node} Tree
	* @param {Tree} tree
	* @param {Find | FindAndReplaceSchema | FindAndReplaceList} find
	* @param {Replace | Options | null | undefined} [replace]
	* @param {Options | null | undefined} [options]
	* @returns {Tree}
	*/
	function(tree, find, replace, options) {
		/** @type {Options | null | undefined} */
		let settings;
		/** @type {FindAndReplaceSchema|FindAndReplaceList} */
		let schema;
		if (typeof find === "string" || find instanceof RegExp) {
			schema = [[find, replace]];
			settings = options;
		} else {
			schema = find;
			settings = replace;
		}
		if (!settings) settings = {};
		const ignored = convert(settings.ignore || []);
		const pairs = toPairs(schema);
		let pairIndex = -1;
		while (++pairIndex < pairs.length) visitParents(tree, "text", visitor);
		return tree;
		/** @type {import('unist-util-visit-parents/complex-types.js').BuildVisitor<Root, 'text'>} */
		function visitor(node, parents) {
			let index = -1;
			/** @type {Parent | undefined} */
			let grandparent;
			while (++index < parents.length) {
				const parent = parents[index];
				if (ignored(parent, grandparent ? grandparent.children.indexOf(parent) : void 0, grandparent)) return;
				grandparent = parent;
			}
			if (grandparent) return handler(node, parents);
		}
		/**
		* Handle a text node which is not in an ignored parent.
		*
		* @param {Text} node
		*   Text node.
		* @param {Array<Parent>} parents
		*   Parents.
		* @returns {VisitorResult}
		*   Result.
		*/
		function handler(node, parents) {
			const parent = parents[parents.length - 1];
			const find = pairs[pairIndex][0];
			const replace = pairs[pairIndex][1];
			let start = 0;
			const index = parent.children.indexOf(node);
			let change = false;
			/** @type {Array<PhrasingContent>} */
			let nodes = [];
			find.lastIndex = 0;
			let match = find.exec(node.value);
			while (match) {
				const position = match.index;
				/** @type {RegExpMatchObject} */
				const matchObject = {
					index: match.index,
					input: match.input,
					stack: [...parents, node]
				};
				let value = replace(...match, matchObject);
				if (typeof value === "string") value = value.length > 0 ? {
					type: "text",
					value
				} : void 0;
				if (value !== false) {
					if (start !== position) nodes.push({
						type: "text",
						value: node.value.slice(start, position)
					});
					if (Array.isArray(value)) nodes.push(...value);
					else if (value) nodes.push(value);
					start = position + match[0].length;
					change = true;
				}
				if (!find.global) break;
				match = find.exec(node.value);
			}
			if (change) {
				if (start < node.value.length) nodes.push({
					type: "text",
					value: node.value.slice(start)
				});
				parent.children.splice(index, 1, ...nodes);
			} else nodes = [node];
			return index + nodes.length;
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-find-and-replace@2.2.2/node_modules/mdast-util-find-and-replace/index.js
var init_mdast_util_find_and_replace = __esmMin((() => {
	init_lib$7();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-autolink-literal@1.0.3/node_modules/mdast-util-gfm-autolink-literal/lib/index.js
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterLiteralAutolink(token) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterLiteralAutolinkValue(token) {
	this.config.enter.autolinkProtocol.call(this, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitLiteralAutolinkHttp(token) {
	this.config.exit.autolinkProtocol.call(this, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitLiteralAutolinkWww(token) {
	this.config.exit.data.call(this, token);
	const node = this.stack[this.stack.length - 1];
	node.url = "http://" + this.sliceSerialize(token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitLiteralAutolinkEmail(token) {
	this.config.exit.autolinkEmail.call(this, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitLiteralAutolink(token) {
	this.exit(token);
}
/** @type {FromMarkdownTransform} */
function transformGfmAutolinkLiterals(tree) {
	findAndReplace(tree, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl], [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g, findEmail]], { ignore: ["link", "linkReference"] });
}
/**
* @type {ReplaceFunction}
* @param {string} _
* @param {string} protocol
* @param {string} domain
* @param {string} path
* @param {RegExpMatchObject} match
* @returns {Link | Array<PhrasingContent> | false}
*/
function findUrl(_, protocol, domain, path, match) {
	let prefix = "";
	if (!previous$1(match)) return false;
	if (/^w/i.test(protocol)) {
		domain = protocol + domain;
		protocol = "";
		prefix = "http://";
	}
	if (!isCorrectDomain(domain)) return false;
	const parts = splitUrl(domain + path);
	if (!parts[0]) return false;
	/** @type {Link} */
	const result = {
		type: "link",
		title: null,
		url: prefix + protocol + parts[0],
		children: [{
			type: "text",
			value: protocol + parts[0]
		}]
	};
	if (parts[1]) return [result, {
		type: "text",
		value: parts[1]
	}];
	return result;
}
/**
* @type {ReplaceFunction}
* @param {string} _
* @param {string} atext
* @param {string} label
* @param {RegExpMatchObject} match
* @returns {Link | false}
*/
function findEmail(_, atext, label, match) {
	if (!previous$1(match, true) || /[-\d_]$/.test(label)) return false;
	return {
		type: "link",
		title: null,
		url: "mailto:" + atext + "@" + label,
		children: [{
			type: "text",
			value: atext + "@" + label
		}]
	};
}
/**
* @param {string} domain
* @returns {boolean}
*/
function isCorrectDomain(domain) {
	const parts = domain.split(".");
	if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) return false;
	return true;
}
/**
* @param {string} url
* @returns {[string, string | undefined]}
*/
function splitUrl(url) {
	const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
	if (!trailExec) return [url, void 0];
	url = url.slice(0, trailExec.index);
	let trail = trailExec[0];
	let closingParenIndex = trail.indexOf(")");
	const openingParens = ccount(url, "(");
	let closingParens = ccount(url, ")");
	while (closingParenIndex !== -1 && openingParens > closingParens) {
		url += trail.slice(0, closingParenIndex + 1);
		trail = trail.slice(closingParenIndex + 1);
		closingParenIndex = trail.indexOf(")");
		closingParens++;
	}
	return [url, trail];
}
/**
* @param {RegExpMatchObject} match
* @param {boolean | null | undefined} [email=false]
* @returns {boolean}
*/
function previous$1(match, email) {
	const code = match.input.charCodeAt(match.index - 1);
	return (match.index === 0 || unicodeWhitespace(code) || unicodePunctuation(code)) && (!email || code !== 47);
}
var inConstruct, notInConstruct, gfmAutolinkLiteralFromMarkdown, gfmAutolinkLiteralToMarkdown;
var init_lib$6 = __esmMin((() => {
	init_ccount();
	init_mdast_util_find_and_replace();
	init_micromark_util_character();
	inConstruct = "phrasing";
	notInConstruct = [
		"autolink",
		"link",
		"image",
		"label"
	];
	gfmAutolinkLiteralFromMarkdown = {
		transforms: [transformGfmAutolinkLiterals],
		enter: {
			literalAutolink: enterLiteralAutolink,
			literalAutolinkEmail: enterLiteralAutolinkValue,
			literalAutolinkHttp: enterLiteralAutolinkValue,
			literalAutolinkWww: enterLiteralAutolinkValue
		},
		exit: {
			literalAutolink: exitLiteralAutolink,
			literalAutolinkEmail: exitLiteralAutolinkEmail,
			literalAutolinkHttp: exitLiteralAutolinkHttp,
			literalAutolinkWww: exitLiteralAutolinkWww
		}
	};
	gfmAutolinkLiteralToMarkdown = { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct,
			notInConstruct
		}
	] };
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-autolink-literal@1.0.3/node_modules/mdast-util-gfm-autolink-literal/index.js
var init_mdast_util_gfm_autolink_literal = __esmMin((() => {
	init_lib$6();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-footnote@1.0.2/node_modules/mdast-util-gfm-footnote/lib/index.js
/**
* Create an extension for `mdast-util-from-markdown` to enable GFM footnotes
* in markdown.
*
* @returns {FromMarkdownExtension}
*   Extension for `mdast-util-from-markdown`.
*/
function gfmFootnoteFromMarkdown() {
	return {
		enter: {
			gfmFootnoteDefinition: enterFootnoteDefinition,
			gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
			gfmFootnoteCall: enterFootnoteCall,
			gfmFootnoteCallString: enterFootnoteCallString
		},
		exit: {
			gfmFootnoteDefinition: exitFootnoteDefinition,
			gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
			gfmFootnoteCall: exitFootnoteCall,
			gfmFootnoteCallString: exitFootnoteCallString
		}
	};
}
/**
* Create an extension for `mdast-util-to-markdown` to enable GFM footnotes
* in markdown.
*
* @returns {ToMarkdownExtension}
*   Extension for `mdast-util-to-markdown`.
*/
function gfmFootnoteToMarkdown() {
	return {
		unsafe: [{
			character: "[",
			inConstruct: [
				"phrasing",
				"label",
				"reference"
			]
		}],
		handlers: {
			footnoteDefinition,
			footnoteReference
		}
	};
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterFootnoteDefinition(token) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterFootnoteDefinitionLabelString() {
	this.buffer();
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitFootnoteDefinitionLabelString(token) {
	const label = this.resume();
	const node = this.stack[this.stack.length - 1];
	node.label = label;
	node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitFootnoteDefinition(token) {
	this.exit(token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterFootnoteCall(token) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterFootnoteCallString() {
	this.buffer();
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitFootnoteCallString(token) {
	const label = this.resume();
	const node = this.stack[this.stack.length - 1];
	node.label = label;
	node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitFootnoteCall(token) {
	this.exit(token);
}
/**
* @type {ToMarkdownHandle}
* @param {FootnoteReference} node
*/
function footnoteReference(node, _, context, safeOptions) {
	const tracker = track(safeOptions);
	let value = tracker.move("[^");
	const exit = context.enter("footnoteReference");
	const subexit = context.enter("reference");
	value += tracker.move(safe(context, association(node), {
		...tracker.current(),
		before: value,
		after: "]"
	}));
	subexit();
	exit();
	value += tracker.move("]");
	return value;
}
/** @type {ToMarkdownHandle} */
function footnoteReferencePeek() {
	return "[";
}
/**
* @type {ToMarkdownHandle}
* @param {FootnoteDefinition} node
*/
function footnoteDefinition(node, _, context, safeOptions) {
	const tracker = track(safeOptions);
	let value = tracker.move("[^");
	const exit = context.enter("footnoteDefinition");
	const subexit = context.enter("label");
	value += tracker.move(safe(context, association(node), {
		...tracker.current(),
		before: value,
		after: "]"
	}));
	subexit();
	value += tracker.move("]:" + (node.children && node.children.length > 0 ? " " : ""));
	tracker.shift(4);
	value += tracker.move(indentLines(containerFlow(node, context, tracker.current()), map));
	exit();
	return value;
}
/** @type {Map} */
function map(line, index, blank) {
	if (index === 0) return line;
	return (blank ? "" : "    ") + line;
}
var init_lib$5 = __esmMin((() => {
	init_micromark_util_normalize_identifier();
	init_association();
	init_container_flow();
	init_indent_lines();
	init_safe();
	init_track();
	footnoteReference.peek = footnoteReferencePeek;
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-footnote@1.0.2/node_modules/mdast-util-gfm-footnote/index.js
var init_mdast_util_gfm_footnote = __esmMin((() => {
	init_lib$5();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-strikethrough@1.0.3/node_modules/mdast-util-gfm-strikethrough/lib/index.js
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterStrikethrough(token) {
	this.enter({
		type: "delete",
		children: []
	}, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitStrikethrough(token) {
	this.exit(token);
}
/**
* @type {ToMarkdownHandle}
* @param {Delete} node
*/
function handleDelete(node, _, context, safeOptions) {
	const tracker = track(safeOptions);
	const exit = context.enter("strikethrough");
	let value = tracker.move("~~");
	value += containerPhrasing(node, context, {
		...tracker.current(),
		before: value,
		after: "~"
	});
	value += tracker.move("~~");
	exit();
	return value;
}
/** @type {ToMarkdownHandle} */
function peekDelete() {
	return "~";
}
var constructsWithoutStrikethrough, gfmStrikethroughFromMarkdown, gfmStrikethroughToMarkdown;
var init_lib$4 = __esmMin((() => {
	init_container_phrasing();
	init_track();
	constructsWithoutStrikethrough = [
		"autolink",
		"destinationLiteral",
		"destinationRaw",
		"reference",
		"titleQuote",
		"titleApostrophe"
	];
	handleDelete.peek = peekDelete;
	gfmStrikethroughFromMarkdown = {
		canContainEols: ["delete"],
		enter: { strikethrough: enterStrikethrough },
		exit: { strikethrough: exitStrikethrough }
	};
	gfmStrikethroughToMarkdown = {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: constructsWithoutStrikethrough
		}],
		handlers: { delete: handleDelete }
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-strikethrough@1.0.3/node_modules/mdast-util-gfm-strikethrough/index.js
var init_mdast_util_gfm_strikethrough = __esmMin((() => {
	init_lib$4();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-table@1.0.7_supports-color@10.2.2/node_modules/mdast-util-gfm-table/lib/index.js
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterTable(token) {
	/** @type {Array<'left' | 'right' | 'center' | 'none'>} */
	const align = token._align;
	this.enter({
		type: "table",
		align: align.map((d) => d === "none" ? null : d),
		children: []
	}, token);
	this.setData("inTable", true);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitTable(token) {
	this.exit(token);
	this.setData("inTable");
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterRow(token) {
	this.enter({
		type: "tableRow",
		children: []
	}, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exit(token) {
	this.exit(token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function enterCell(token) {
	this.enter({
		type: "tableCell",
		children: []
	}, token);
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitCodeText(token) {
	let value = this.resume();
	if (this.getData("inTable")) value = value.replace(/\\([\\|])/g, replace);
	const node = this.stack[this.stack.length - 1];
	node.value = value;
	this.exit(token);
}
/**
* @param {string} $0
* @param {string} $1
* @returns {string}
*/
function replace($0, $1) {
	return $1 === "|" ? $1 : $0;
}
/**
* Create an extension for `mdast-util-to-markdown` to enable GFM tables in
* markdown.
*
* @param {Options | null | undefined} [options]
*   Configuration.
* @returns {ToMarkdownExtension}
*   Extension for `mdast-util-to-markdown` to enable GFM tables.
*/
function gfmTableToMarkdown(options) {
	const settings = options || {};
	const padding = settings.tableCellPadding;
	const alignDelimiters = settings.tablePipeAlign;
	const stringLength = settings.stringLength;
	const around = padding ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: ":",
				after: "-"
			},
			{
				atBreak: true,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			table: handleTable,
			tableRow: handleTableRow,
			tableCell: handleTableCell,
			inlineCode: inlineCodeWithTable
		}
	};
	/**
	* @type {ToMarkdownHandle}
	* @param {Table} node
	*/
	function handleTable(node, _, context, safeOptions) {
		return serializeData(handleTableAsData(node, context, safeOptions), node.align);
	}
	/**
	* This function isn’t really used normally, because we handle rows at the
	* table level.
	* But, if someone passes in a table row, this ensures we make somewhat sense.
	*
	* @type {ToMarkdownHandle}
	* @param {TableRow} node
	*/
	function handleTableRow(node, _, context, safeOptions) {
		const value = serializeData([handleTableRowAsData(node, context, safeOptions)]);
		return value.slice(0, value.indexOf("\n"));
	}
	/**
	* @type {ToMarkdownHandle}
	* @param {TableCell} node
	*/
	function handleTableCell(node, _, context, safeOptions) {
		const exit = context.enter("tableCell");
		const subexit = context.enter("phrasing");
		const value = containerPhrasing(node, context, {
			...safeOptions,
			before: around,
			after: around
		});
		subexit();
		exit();
		return value;
	}
	/**
	* @param {Array<Array<string>>} matrix
	* @param {Array<string | null | undefined> | null | undefined} [align]
	*/
	function serializeData(matrix, align) {
		return markdownTable(matrix, {
			align,
			alignDelimiters,
			padding,
			stringLength
		});
	}
	/**
	* @param {Table} node
	* @param {ToMarkdownContext} context
	* @param {SafeOptions} safeOptions
	*/
	function handleTableAsData(node, context, safeOptions) {
		const children = node.children;
		let index = -1;
		/** @type {Array<Array<string>>} */
		const result = [];
		const subexit = context.enter("table");
		while (++index < children.length) result[index] = handleTableRowAsData(children[index], context, safeOptions);
		subexit();
		return result;
	}
	/**
	* @param {TableRow} node
	* @param {ToMarkdownContext} context
	* @param {SafeOptions} safeOptions
	*/
	function handleTableRowAsData(node, context, safeOptions) {
		const children = node.children;
		let index = -1;
		/** @type {Array<string>} */
		const result = [];
		const subexit = context.enter("tableRow");
		while (++index < children.length) result[index] = handleTableCell(children[index], node, context, safeOptions);
		subexit();
		return result;
	}
	/**
	* @type {ToMarkdownHandle}
	* @param {InlineCode} node
	*/
	function inlineCodeWithTable(node, parent, context) {
		let value = inlineCode$1(node, parent, context);
		if (context.stack.includes("tableCell")) value = value.replace(/\|/g, "\\$&");
		return value;
	}
}
var gfmTableFromMarkdown;
var init_lib$3 = __esmMin((() => {
	init_container_phrasing();
	init_inline_code$1();
	init_markdown_table();
	gfmTableFromMarkdown = {
		enter: {
			table: enterTable,
			tableData: enterCell,
			tableHeader: enterCell,
			tableRow: enterRow
		},
		exit: {
			codeText: exitCodeText,
			table: exitTable,
			tableData: exit,
			tableHeader: exit,
			tableRow: exit
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-table@1.0.7_supports-color@10.2.2/node_modules/mdast-util-gfm-table/index.js
var init_mdast_util_gfm_table = __esmMin((() => {
	init_lib$3();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-task-list-item@1.0.2/node_modules/mdast-util-gfm-task-list-item/lib/index.js
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitCheck(token) {
	const node = this.stack[this.stack.length - 2];
	node.checked = token.type === "taskListCheckValueChecked";
}
/**
* @this {CompileContext}
* @type {FromMarkdownHandle}
*/
function exitParagraphWithTaskListItem(token) {
	const parent = this.stack[this.stack.length - 2];
	if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
		const node = this.stack[this.stack.length - 1];
		const head = node.children[0];
		if (head && head.type === "text") {
			const siblings = parent.children;
			let index = -1;
			/** @type {Paragraph | undefined} */
			let firstParaghraph;
			while (++index < siblings.length) {
				const sibling = siblings[index];
				if (sibling.type === "paragraph") {
					firstParaghraph = sibling;
					break;
				}
			}
			if (firstParaghraph === node) {
				head.value = head.value.slice(1);
				if (head.value.length === 0) node.children.shift();
				else if (node.position && head.position && typeof head.position.start.offset === "number") {
					head.position.start.column++;
					head.position.start.offset++;
					node.position.start = Object.assign({}, head.position.start);
				}
			}
		}
	}
	this.exit(token);
}
/**
* @type {ToMarkdownHandle}
* @param {ListItem} node
*/
function listItemWithTaskListItem(node, parent, context, safeOptions) {
	const head = node.children[0];
	const checkable = typeof node.checked === "boolean" && head && head.type === "paragraph";
	const checkbox = "[" + (node.checked ? "x" : " ") + "] ";
	const tracker = track(safeOptions);
	if (checkable) tracker.move(checkbox);
	let value = listItem$1(node, parent, context, {
		...safeOptions,
		...tracker.current()
	});
	if (checkable) value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
	return value;
	/**
	* @param {string} $0
	* @returns {string}
	*/
	function check($0) {
		return $0 + checkbox;
	}
}
var gfmTaskListItemFromMarkdown, gfmTaskListItemToMarkdown;
var init_lib$2 = __esmMin((() => {
	init_list_item$1();
	init_track();
	gfmTaskListItemFromMarkdown = { exit: {
		taskListCheckValueChecked: exitCheck,
		taskListCheckValueUnchecked: exitCheck,
		paragraph: exitParagraphWithTaskListItem
	} };
	gfmTaskListItemToMarkdown = {
		unsafe: [{
			atBreak: true,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: listItemWithTaskListItem }
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm-task-list-item@1.0.2/node_modules/mdast-util-gfm-task-list-item/index.js
var init_mdast_util_gfm_task_list_item = __esmMin((() => {
	init_lib$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm@2.0.2_supports-color@10.2.2/node_modules/mdast-util-gfm/lib/index.js
/**
* Create an extension for `mdast-util-from-markdown` to enable GFM (autolink
* literals, footnotes, strikethrough, tables, tasklists).
*
* @returns {Array<FromMarkdownExtension>}
*   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,
*   footnotes, strikethrough, tables, tasklists).
*/
function gfmFromMarkdown() {
	return [
		gfmAutolinkLiteralFromMarkdown,
		gfmFootnoteFromMarkdown(),
		gfmStrikethroughFromMarkdown,
		gfmTableFromMarkdown,
		gfmTaskListItemFromMarkdown
	];
}
/**
* Create an extension for `mdast-util-to-markdown` to enable GFM (autolink
* literals, footnotes, strikethrough, tables, tasklists).
*
* @param {Options | null | undefined} [options]
*   Configuration.
* @returns {ToMarkdownExtension}
*   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,
*   footnotes, strikethrough, tables, tasklists).
*/
function gfmToMarkdown(options) {
	return { extensions: [
		gfmAutolinkLiteralToMarkdown,
		gfmFootnoteToMarkdown(),
		gfmStrikethroughToMarkdown,
		gfmTableToMarkdown(options),
		gfmTaskListItemToMarkdown
	] };
}
var init_lib$1 = __esmMin((() => {
	init_mdast_util_gfm_autolink_literal();
	init_mdast_util_gfm_footnote();
	init_mdast_util_gfm_strikethrough();
	init_mdast_util_gfm_table();
	init_mdast_util_gfm_task_list_item();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-gfm@2.0.2_supports-color@10.2.2/node_modules/mdast-util-gfm/index.js
var init_mdast_util_gfm = __esmMin((() => {
	init_lib$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-gfm@3.0.1_supports-color@10.2.2/node_modules/remark-gfm/index.js
/**
* Plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
*
* @type {import('unified').Plugin<[Options?]|void[], Root>}
*/
function remarkGfm(options = {}) {
	const data = this.data();
	add("micromarkExtensions", gfm(options));
	add("fromMarkdownExtensions", gfmFromMarkdown());
	add("toMarkdownExtensions", gfmToMarkdown(options));
	/**
	* @param {string} field
	* @param {unknown} value
	*/
	function add(field, value) {
		(data[field] ? data[field] : data[field] = []).push(value);
	}
}
var init_remark_gfm = __esmMin((() => {
	init_micromark_extension_gfm();
	init_mdast_util_gfm();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-math@2.1.2/node_modules/micromark-extension-math/lib/math-flow.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeMathFenced(effects, ok, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	const initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let sizeOpen = 0;
	return start;
	/**
	* Start of math.
	*
	* ```markdown
	* > | $$
	*     ^
	*   | \frac{1}{2}
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("mathFlow");
		effects.enter("mathFlowFence");
		effects.enter("mathFlowFenceSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening fence sequence.
	*
	* ```markdown
	* > | $$
	*      ^
	*   | \frac{1}{2}
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === 36) {
			effects.consume(code);
			sizeOpen++;
			return sequenceOpen;
		}
		if (sizeOpen < 2) return nok(code);
		effects.exit("mathFlowFenceSequence");
		return factorySpace(effects, metaBefore, "whitespace")(code);
	}
	/**
	* In opening fence, before meta.
	*
	* ```markdown
	* > | $$asciimath
	*       ^
	*   | x < y
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function metaBefore(code) {
		if (code === null || markdownLineEnding(code)) return metaAfter(code);
		effects.enter("mathFlowFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code);
	}
	/**
	* In meta.
	*
	* ```markdown
	* > | $$asciimath
	*        ^
	*   | x < y
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function meta(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("mathFlowFenceMeta");
			return metaAfter(code);
		}
		if (code === 36) return nok(code);
		effects.consume(code);
		return meta;
	}
	/**
	* After meta.
	*
	* ```markdown
	* > | $$
	*       ^
	*   | \frac{1}{2}
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function metaAfter(code) {
		effects.exit("mathFlowFence");
		if (self.interrupt) return ok(code);
		return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
	}
	/**
	* After eol/eof in math, at a non-lazy closing fence or content.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*     ^
	* > | $$
	*     ^
	* ```
	*
	* @type {State}
	*/
	function beforeNonLazyContinuation(code) {
		return effects.attempt({
			tokenize: tokenizeClosingFence,
			partial: true
		}, after, contentStart)(code);
	}
	/**
	* Before math content, definitely not before a closing fence.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*     ^
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function contentStart(code) {
		return (initialSize ? factorySpace(effects, beforeContentChunk, "linePrefix", initialSize + 1) : beforeContentChunk)(code);
	}
	/**
	* Before math content, after optional prefix.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*     ^
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function beforeContentChunk(code) {
		if (code === null) return after(code);
		if (markdownLineEnding(code)) return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
		effects.enter("mathFlowValue");
		return contentChunk(code);
	}
	/**
	* In math content.
	*
	* ```markdown
	*   | $$
	* > | \frac{1}{2}
	*      ^
	*   | $$
	* ```
	*
	* @type {State}
	*/
	function contentChunk(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("mathFlowValue");
			return beforeContentChunk(code);
		}
		effects.consume(code);
		return contentChunk;
	}
	/**
	* After math (ha!).
	*
	* ```markdown
	*   | $$
	*   | \frac{1}{2}
	* > | $$
	*       ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		effects.exit("mathFlow");
		return ok(code);
	}
	/** @type {Tokenizer} */
	function tokenizeClosingFence(effects, ok, nok) {
		let size = 0;
		/**
		* Before closing fence, at optional whitespace.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*     ^
		* ```
		*/
		return factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		/**
		* In closing fence, after optional whitespace, at sequence.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*     ^
		* ```
		*
		* @type {State}
		*/
		function beforeSequenceClose(code) {
			effects.enter("mathFlowFence");
			effects.enter("mathFlowFenceSequence");
			return sequenceClose(code);
		}
		/**
		* In closing fence sequence.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*      ^
		* ```
		*
		* @type {State}
		*/
		function sequenceClose(code) {
			if (code === 36) {
				size++;
				effects.consume(code);
				return sequenceClose;
			}
			if (size < sizeOpen) return nok(code);
			effects.exit("mathFlowFenceSequence");
			return factorySpace(effects, afterSequenceClose, "whitespace")(code);
		}
		/**
		* After closing fence sequence, after optional whitespace.
		*
		* ```markdown
		*   | $$
		*   | \frac{1}{2}
		* > | $$
		*       ^
		* ```
		*
		* @type {State}
		*/
		function afterSequenceClose(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("mathFlowFence");
				return ok(code);
			}
			return nok(code);
		}
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeNonLazyContinuation(effects, ok, nok) {
	const self = this;
	return start;
	/** @type {State} */
	function start(code) {
		if (code === null) return ok(code);
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineStart;
	}
	/** @type {State} */
	function lineStart(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
	}
}
var mathFlow, nonLazyContinuation;
var init_math_flow = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	mathFlow = {
		tokenize: tokenizeMathFenced,
		concrete: true
	};
	nonLazyContinuation = {
		tokenize: tokenizeNonLazyContinuation,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-math@2.1.2/node_modules/micromark-extension-math/lib/math-text.js
/**
* @param {Options | null | undefined} [options]
* @returns {Construct}
*/
function mathText(options) {
	let single = (options || {}).singleDollarTextMath;
	if (single === null || single === void 0) single = true;
	return {
		tokenize: tokenizeMathText,
		resolve: resolveMathText,
		previous
	};
	/**
	* @this {TokenizeContext}
	* @type {Tokenizer}
	*/
	function tokenizeMathText(effects, ok, nok) {
		let sizeOpen = 0;
		/** @type {number} */
		let size;
		/** @type {Token} */
		let token;
		return start;
		/**
		* Start of math (text).
		*
		* ```markdown
		* > | $a$
		*     ^
		* > | \$a$
		*      ^
		* ```
		*
		* @type {State}
		*/
		function start(code) {
			effects.enter("mathText");
			effects.enter("mathTextSequence");
			return sequenceOpen(code);
		}
		/**
		* In opening sequence.
		*
		* ```markdown
		* > | $a$
		*     ^
		* ```
		*
		* @type {State}
		*/
		function sequenceOpen(code) {
			if (code === 36) {
				effects.consume(code);
				sizeOpen++;
				return sequenceOpen;
			}
			if (sizeOpen < 2 && !single) return nok(code);
			effects.exit("mathTextSequence");
			return between(code);
		}
		/**
		* Between something and something else.
		*
		* ```markdown
		* > | $a$
		*      ^^
		* ```
		*
		* @type {State}
		*/
		function between(code) {
			if (code === null) return nok(code);
			if (code === 36) {
				token = effects.enter("mathTextSequence");
				size = 0;
				return sequenceClose(code);
			}
			if (code === 32) {
				effects.enter("space");
				effects.consume(code);
				effects.exit("space");
				return between;
			}
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return between;
			}
			effects.enter("mathTextData");
			return data(code);
		}
		/**
		* In data.
		*
		* ```markdown
		* > | $a$
		*      ^
		* ```
		*
		* @type {State}
		*/
		function data(code) {
			if (code === null || code === 32 || code === 36 || markdownLineEnding(code)) {
				effects.exit("mathTextData");
				return between(code);
			}
			effects.consume(code);
			return data;
		}
		/**
		* In closing sequence.
		*
		* ```markdown
		* > | `a`
		*       ^
		* ```
		*
		* @type {State}
		*/
		function sequenceClose(code) {
			if (code === 36) {
				effects.consume(code);
				size++;
				return sequenceClose;
			}
			if (size === sizeOpen) {
				effects.exit("mathTextSequence");
				effects.exit("mathText");
				return ok(code);
			}
			token.type = "mathTextData";
			return data(code);
		}
	}
}
/** @type {Resolver} */
function resolveMathText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	/** @type {number} */
	let index;
	/** @type {number | undefined} */
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index = headEnterIndex;
		while (++index < tailExitIndex) if (events[index][1].type === "mathTextData") {
			events[tailExitIndex][1].type = "mathTextPadding";
			events[headEnterIndex][1].type = "mathTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index = headEnterIndex - 1;
	tailExitIndex++;
	while (++index <= tailExitIndex) if (enter === void 0) {
		if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
	} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
		events[enter][1].type = "mathTextData";
		if (index !== enter + 2) {
			events[enter][1].end = events[index - 1][1].end;
			events.splice(enter + 2, index - enter - 2);
			tailExitIndex -= index - enter - 2;
			index = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Previous}
*/
function previous(code) {
	return code !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
var init_math_text = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-math@2.1.2/node_modules/micromark-extension-math/lib/syntax.js
/**
* Create an extension for `micromark` to enable math syntax.
*
* @param {Options | null | undefined} [options]
*   Configuration.
* @returns {Extension}
*   Extension for `micromark` that can be passed in `extensions`, to
*   enable math syntax.
*/
function math(options) {
	return {
		flow: { [36]: mathFlow },
		text: { [36]: mathText(options) }
	};
}
var init_syntax = __esmMin((() => {
	init_math_flow();
	init_math_text();
}));
//#endregion
//#region ../../node_modules/.pnpm/micromark-extension-math@2.1.2/node_modules/micromark-extension-math/index.js
var init_micromark_extension_math = __esmMin((() => {
	init_syntax();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-math@2.0.2/node_modules/mdast-util-math/lib/index.js
/**
* Create an extension for `mdast-util-from-markdown`.
*
* @returns {FromMarkdownExtension}
*   Extension for `mdast-util-from-markdown`.
*/
function mathFromMarkdown() {
	return {
		enter: {
			mathFlow: enterMathFlow,
			mathFlowFenceMeta: enterMathFlowMeta,
			mathText: enterMathText
		},
		exit: {
			mathFlow: exitMathFlow,
			mathFlowFence: exitMathFlowFence,
			mathFlowFenceMeta: exitMathFlowMeta,
			mathFlowValue: exitMathData,
			mathText: exitMathText,
			mathTextData: exitMathData
		}
	};
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function enterMathFlow(token) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "div",
				hProperties: { className: ["math", "math-display"] },
				hChildren: [{
					type: "text",
					value: ""
				}]
			}
		}, token);
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function enterMathFlowMeta() {
		this.buffer();
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathFlowMeta() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.meta = data;
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathFlowFence() {
		if (this.getData("mathFlowInside")) return;
		this.buffer();
		this.setData("mathFlowInside", true);
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathFlow(token) {
		const data = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		const node = this.exit(token);
		node.value = data;
		node.data.hChildren[0].value = data;
		this.setData("mathFlowInside");
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function enterMathText(token) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "span",
				hProperties: { className: ["math", "math-inline"] },
				hChildren: [{
					type: "text",
					value: ""
				}]
			}
		}, token);
		this.buffer();
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathText(token) {
		const data = this.resume();
		const node = this.exit(token);
		node.value = data;
		node.data.hChildren[0].value = data;
	}
	/**
	* @this {CompileContext}
	* @type {FromMarkdownHandle}
	*/
	function exitMathData(token) {
		this.config.enter.data.call(this, token);
		this.config.exit.data.call(this, token);
	}
}
/**
* Create an extension for `mdast-util-to-markdown`.
*
* @param {ToOptions | null | undefined} [options]
*   Configuration.
* @returns {ToMarkdownExtension}
*   Extension for `mdast-util-to-markdown`.
*/
function mathToMarkdown(options) {
	let single = (options || {}).singleDollarTextMath;
	if (single === null || single === void 0) single = true;
	inlineMath.peek = inlineMathPeek;
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "\n",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "$",
				after: single ? void 0 : "\\$",
				inConstruct: "phrasing"
			},
			{
				character: "$",
				inConstruct: "mathFlowMeta"
			},
			{
				atBreak: true,
				character: "$",
				after: "\\$"
			}
		],
		handlers: {
			math,
			inlineMath
		}
	};
	/**
	* @type {ToMarkdownHandle}
	* @param {Math} node
	*/
	function math(node, _, context, safeOptions) {
		const raw = node.value || "";
		const tracker = track(safeOptions);
		const sequence = "$".repeat(Math.max(longestStreak(raw, "$") + 1, 2));
		const exit = context.enter("mathFlow");
		let value = tracker.move(sequence);
		if (node.meta) {
			const subexit = context.enter("mathFlowMeta");
			value += tracker.move(safe(context, node.meta, {
				before: value,
				after: "\n",
				encode: ["$"],
				...tracker.current()
			}));
			subexit();
		}
		value += tracker.move("\n");
		if (raw) value += tracker.move(raw + "\n");
		value += tracker.move(sequence);
		exit();
		return value;
	}
	/**
	* @type {ToMarkdownHandle}
	* @param {InlineMath} node
	*/
	function inlineMath(node, _, context) {
		let value = node.value || "";
		let size = 1;
		if (!single) size++;
		while (new RegExp("(^|[^$])" + "\\$".repeat(size) + "([^$]|$)").test(value)) size++;
		const sequence = "$".repeat(size);
		if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^\$|\$$/.test(value))) value = " " + value + " ";
		let index = -1;
		while (++index < context.unsafe.length) {
			const pattern = context.unsafe[index];
			const expression = patternCompile(pattern);
			/** @type {RegExpExecArray | null} */
			let match;
			if (!pattern.atBreak) continue;
			while (match = expression.exec(value)) {
				let position = match.index;
				if (value.codePointAt(position) === 10 && value.codePointAt(position - 1) === 13) position--;
				value = value.slice(0, position) + " " + value.slice(match.index + 1);
			}
		}
		return sequence + value + sequence;
	}
	/**
	* @returns {string}
	*/
	function inlineMathPeek() {
		return "$";
	}
}
var init_lib = __esmMin((() => {
	init_longest_streak();
	init_safe();
	init_track();
	init_pattern_compile();
}));
//#endregion
//#region ../../node_modules/.pnpm/mdast-util-math@2.0.2/node_modules/mdast-util-math/index.js
var init_mdast_util_math = __esmMin((() => {
	init_lib();
}));
//#endregion
//#region ../../node_modules/.pnpm/remark-math@5.1.1/node_modules/remark-math/index.js
/**
* Plugin to support math.
*
* @type {import('unified').Plugin<[Options?] | void[], Root, Root>}
*/
function remarkMath(options = {}) {
	const data = this.data();
	add("micromarkExtensions", math(options));
	add("fromMarkdownExtensions", mathFromMarkdown());
	add("toMarkdownExtensions", mathToMarkdown(options));
	/**
	* @param {string} field
	* @param {unknown} value
	*/
	function add(field, value) {
		(data[field] ? data[field] : data[field] = []).push(value);
	}
}
var init_remark_math = __esmMin((() => {
	init_micromark_extension_math();
	init_mdast_util_math();
}));
//#endregion
export { visit as A, VFile as C, remarkStringify as D, init_lib$21 as E, init_lib$27 as M, remarkParse as N, init_unist_util_visit as O, init_vfile as S, init_remark_stringify as T, init_lib$13 as _, init_rehype_katex as a, init_lib$18 as b, whitespace as c, svg as d, hastToReact as f, init_remark_rehype as g, init_find as h, remarkGfm as i, init_remark_parse as j, init_lib$24 as k, html as l, find as m, remarkMath as n, rehypeKatex as o, init_hast_to_react as p, init_remark_gfm as r, init_hast_util_whitespace as s, init_remark_math as t, init_property_information as u, remarkRehype as v, init_lib$19 as w, unified as x, init_unified as y };
