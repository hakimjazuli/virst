// @ts-check

import { $ } from './$.mjs';
import { helper } from '../utils/helper.export.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
import { Ping } from '../queue/Ping.mjs';

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
					target === 'value' &&
					'value' in element &&
					element.parentNode &&
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
	 * @param {boolean} [options.bypassNested]
	 */
	constructor(value, attributeName = undefined, options = {}) {
		this.value_ = value;
		if (attributeName) {
			this.attr = attributeName;
			const { bypassNested = true, documentScope = undefined } = options;
			Lifecycle.scopedPing({
				documentScope,
				runCheckAtFirst: true,
				scopedCallback: async () => {
					new Lifecycle({
						documentScope,
						attributeName,
						bypassNested,
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
