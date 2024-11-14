// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.export.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * `signal` based reactivity;
 * assigning newValue to Let insance:
 * ```js
 * const letSingle = new Let(1, ...args);
 * letSingle.value++; // 2;
 * letSingle.value = 3 // 3;
 * ```
 * `dataOnly`:
 * ```js
 * const dataOnlyExample = Let.dataOnly(args0);
 * ```
 * - `methods`:
 * > - `call$`: manually triggers `effects` subscribed to `thisInstance`;
 * > - `remove$`: unubscribe `thisInstance` from specific `effect`;
 * > - `removeAll$`: unubscribe `thisInstance` from all of its `effects`;
 */
/**
 * @template V
 */
export class Let {
	/**
	 * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
	 */
	/**
	 * @private
	 * @param {any} val
	 * @param {string} attributeName
	 * @param {HTMLElement} element
	 * @param {import('./Let.mjs').Let} letObject
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
					target === 'value' &&
					'value' in element &&
					element.parentNode &&
					element instanceof HTMLInputElement &&
					!element.hasAttribute(helper.val)
				) {
					element.setAttribute(helper.val, '');
					element.oninput = () => {
						letObject.value = element.value;
					};
				}
			} catch (error) {
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
		this.subscription = [];
	};
	/**
	 * remove effect
	 * @param {$} $
	 * @return {void}
	 */
	remove$ = ($) => {
		this.subscription = this.subscription.filter((S) => $.effect !== S);
	};
	/**
	 * destroy all props
	 */
	unRef = () => {
		this.removeAll$();
		this.value_ = null;
		this.attr = null;
	};
	/**
	 * @private
	 * @type {((isAtInitialization:boolean)=>Promise<void>)[]}
	 */
	subscription = [];
	/**
	 * @private
	 * @type {V}
	 */
	value_;
	call$ = () => {
		new Ping(true, async () => {
			await helper.handlePromiseAll(this, this.subscription, false);
		});
	};
	/**
	 * @param {V} value
	 * @param {string} [attributeName]
	 * @param {Object} [options]
	 * @param {documentScope} [options.documentScope]
	 * @param {boolean} [options.bypassNested]
	 */
	constructor(value, attributeName = undefined, options = {}) {
		this.value_ = value;
		if (attributeName) {
			this.attr = attributeName;
			const { bypassNested = true, documentScope = undefined } = options;
			new Lifecycle({
				documentScope,
				attributeName,
				bypassNested: bypassNested,
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
		if (helper.subscriber && !this.subscription.some((f) => f === helper.subscriber)) {
			this.subscription.push(helper.subscriber);
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
