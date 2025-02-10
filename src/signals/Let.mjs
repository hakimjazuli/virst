// @ts-check

import { $ } from './$.mjs';
import { helper } from '../utils/helper.export.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
import { Ping } from '../queue/Ping.mjs';

/**
 * @description
 * `signal` based reactivity;
 * assigning newValue to Let insance:
 * - `dataOnly`:
 * ```js
 * const dataOnlyExample = Let.dataOnly(args0);
 * ```
 * - with `domReflector`;
 * ```js
 * const letSingle = new Let(1, ...args);
 * letSingle.value++; // 2;
 * letSingle.value = 3 // 3;
 * ```
 * > - the `domReflector` will automatically synchronise the value with the element on the dom;
 * ```html
 * <div attributeName="...selectorsSeparatedBySemicolon"></div>
 * ```
 * > - selector can be `attributeName` or `propertyName`:
 * > > - special selector `value`: will automatically bind the value with `oninput` event;
 * > > - special selector `class`: will dynamically add/remove `classes`, must be formated like this `{class: "strings of HTMLClassNames separated by space"}`
 */
/**
 * @template V
 */
export class Let {
	/**
	 * @typedef {import('../lifecycle/documentScope.type.mjs').documentScope} documentScope
	 */
	/**
	 * @param {any} val
	 * @param {string} attributeName
	 * @param {HTMLElement} element
	 * @param {Let} letObject
	 * @returns {void}
	 */
	static domReflector = (val, attributeName, element, letObject) => {
		const targets = helper.splitX(element.getAttribute(attributeName) ?? '', helper.separator);
		for (let j = 0; j < targets.length; j++) {
			const target = targets[j];
			try {
				if (!(target in element)) {
					throw '';
				}
				element[target] = val;
				if (
					element.parentElement &&
					target === 'value' &&
					'value' in element &&
					'oninput' in element &&
					!element.hasAttribute(helper.val)
				) {
					element.setAttribute(helper.val, '');
					element.oninput = () => {
						new Ping(true, async () => {
							letObject.value = element.value;
						});
					};
				}
			} catch (error) {
				if (element.parentElement && target === 'class') {
					if (!element.hasAttribute(helper.classes)) {
						element.setAttribute(helper.classes, '');
						let prevAppliedClasses = letObject.value;
						new $(async (first) => {
							const value = letObject.value;
							if (JSON.stringify(value) === JSON.stringify(prevAppliedClasses) && !first) {
								return;
							}
							try {
								const currentClasses = helper.toValidClassNames(value.class);
								const prevAppliedClasses_ = helper.toValidClassNames(prevAppliedClasses.class);
								const maxCount = Math.max(currentClasses.length, prevAppliedClasses_.length);
								for (let i = 0; i < maxCount; i++) {
									const prevAppliedClass = prevAppliedClasses_[i];
									if (prevAppliedClass) {
										element.classList.remove(prevAppliedClass);
									}
									const currentClass = currentClasses[i];
									if (currentClass) {
										element.classList.add(currentClass);
									}
								}
							} catch (error) {
								console.warn({
									signal: this,
									value,
									error,
									cause: 'signal value incorrectly formatted',
									validFormat: {
										class: 'string of classNames separated by spaces',
									},
								});
							}
							prevAppliedClasses = value;
						});
					}
					continue;
				}
				val = JSON.stringify(val).replace(/^"(.*)"$/, '$1');
				if (target == '') {
					console.warn({
						element,
						attributeName,
						message: "doesn't have target",
					});
					return;
				}
				element.setAttribute(target, val);
			}
		}
	};
	/**
	 * @template V
	 * @param {V} data
	 * @returns {Let<V>}
	 */
	static dataOnly = (data) => new Let(data);
	/**
	 * remove all effects
	 * @return {void}
	 */
	removeAll$ = () => {
		$.effects.forEach((signals) => {
			if (signals.has(this)) {
				signals.delete(this);
			}
		});
		this.subscriptions.clear();
	};
	/**
	 * remove effect
	 * @param {$} $_
	 * @return {void}
	 */
	remove$ = ($_) => {
		if ($.effects.has($_.effect)) {
			$.effects.get($_.effect).delete(this);
		}
		this.subscriptions.delete($_.effect);
	};
	/**
	 * destroy all props
	 * @returns {void}
	 */
	unRef = () => {
		this.removeAll$();
		this.value_ = null;
		this.attr = null;
	};
	/**
	 * @private
	 * @type {V}
	 */
	value_;
	/**
	 * @type {Set<$["effect"]>}
	 */
	get subscriptions() {
		return $.signals.get(this);
	}
	/**
	 * notify all subscriptions
	 * @returns {void}
	 */
	call$ = () => {
		new Ping(true, async () => {
			if (!this.subscriptions) {
				return;
			}
			helper.handlePromiseAll(this, Array.from(this.subscriptions), false);
		});
	};
	/**
	 * @param {V} value
	 * @param {string} [attributeName]
	 * @param {Object} [options]
	 * @param {documentScope} [options.documentScope]
	 */
	constructor(value, attributeName = undefined, options = {}) {
		this.value_ = value;
		if (attributeName) {
			this.attr = attributeName;
			const { documentScope = undefined } = options;
			Lifecycle.scopedPing({
				documentScope,
				runCheckAtFirst: true,
				scopedCallback: async () => {
					new Lifecycle({
						documentScope,
						attr: attributeName,
						onConnected: async ({ element, onDisconnected }) => {
							const effect = new $(async () => {
								Let.domReflector(this.value, attributeName, element, this);
							});
							element[helper.removeDOM$] = async () => {
								this.remove$(effect);
								if (typeof element.oninput === 'function') {
									element.oninput = null;
								}
							};
							onDisconnected(element[helper.removeDOM$]);
						},
					});
				},
			});
		}
	}
	/**
	 * @type {string}
	 */
	attr = undefined;
	/**
	 * @returns {V}
	 */
	get value() {
		if ($.isRegistering) {
			$.letInstances.add(this);
		}
		return this.value_;
	}
	/**
	 * @param {V} newValue
	 */
	set value(newValue) {
		if (this.value_ === newValue) {
			return;
		}
		this.value_ = newValue;
		this.call$();
	}
}
