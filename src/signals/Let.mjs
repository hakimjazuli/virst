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
	 * @param {string} attr
	 * @param {HTMLElement} element
	 * @param {Let} letObject
	 * @returns {void}
	 */
	static domReflector = (val, attr, element, letObject) => {
		const targets = helper.splitX(element.getAttribute(attr) ?? '', helper.separator);
		for (let j = 0; j < targets.length; j++) {
			const target = targets[j];
			if (target === '') {
				continue;
			}
			try {
				if (!(target in element)) {
					throw Error();
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
					const prevAppliedClasses = element[helper.classes] ?? [];
					if (val === null || !('class' in val)) {
						continue;
					}
					try {
						const currentClasses = helper.toValidClassNames(val.class);
						if (currentClasses.join(',') === prevAppliedClasses.join(',')) {
							continue;
						}
						const maxCount = Math.max(currentClasses.length, prevAppliedClasses.length);
						for (let i = 0; i < maxCount; i++) {
							const prevAppliedClass = prevAppliedClasses[i];
							if (prevAppliedClass) {
								element.classList.remove(prevAppliedClass);
							}
							const currentClass = currentClasses[i];
							if (currentClass) {
								element.classList.add(currentClass);
							}
						}
						element[helper.classes] = currentClasses;
					} catch (error) {
						console.warn({
							signal: this,
							value: val,
							attr,
							error,
							cause: 'signal value incorrectly formatted',
							validFormat: {
								class: 'string of classNames separated by spaces',
							},
						});
					}
					continue;
				}
				val = JSON.stringify(val).replace(/^"(.*)"$/, '$1');
				if (target == '') {
					console.warn({
						error,
						element,
						attributeName: attr,
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
	 * @private
	 * @param {Let} letInstance
	 * @returns {Set<$["effect"]>}
	 */
	static subscriptions(letInstance) {
		return $.signals.get(letInstance);
	}
	/**
	 * remove all effects
	 * @return {void}
	 */
	removeAll$ = () => {
		$.effects.forEach((signals) => {
			signals.delete(this);
		});
		Let.subscriptions(this).clear();
		$.signals.delete(this);
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
		Let.subscriptions(this).delete($_.effect);
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
	prev_;
	get prev() {
		return this.prev_;
	}
	/**
	 * @private
	 * @type {V}
	 */
	value_;
	/**
	 * notify all subscriptions
	 * @returns {void}
	 */
	call$ = () => {
		new Ping(true, async () => {
			if (!Let.subscriptions(this)) {
				return;
			}
			helper.handlePromiseAll(this.call$, Array.from(Let.subscriptions(this)), false);
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
							onDisconnected(async () => {
								this.remove$(effect);
								if (typeof element.oninput === 'function') {
									element.oninput = null;
								}
							});
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
		this.prev_ = this.value_;
		this.value_ = newValue;
		this.call$();
	}
}
