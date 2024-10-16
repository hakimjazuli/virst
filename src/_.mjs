// @ts-check

import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - auto `attributeName` assign for `signal` based reactifity stored in static Method of class `_`;
 * - if you use our `Component` class, use this class static method, instead of their respective class, for generating `attributeName` to watch, which then you can use it's `attr` returned value to mark the element
 * ```js
 * // on Component scope
 * onConnected(async()=>{
 * 	const data = _.let('test');
 * 	html`<div ${data.attr}="innerText"></div>`
 * })
 * ```
 */
export class _ {
	/**
	 * auto `attributeName` assign for `Let`
	 * @template V
	 * @param {V} value
	 * @param {boolean} [isGlobal]
	 */
	static let = (value, isGlobal = false) =>
		new Let(value, helper.attributeIndexGenerator(), isGlobal);
	/**
	 * syntax sugar for `Let.dataOnly`
	 * @template D
	 * @param {D} data
	 * @returns {Let<D>}
	 */
	static letD = (data) => Let.dataOnly(data);
	/**
	 * auto `attributeName` assign for `Derived`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {boolean} [isGlobal]
	 */
	static derived = (asyncCallback, isGlobal = false) =>
		new Derived(asyncCallback, helper.attributeIndexGenerator(), isGlobal);
	/**
	 * syntax sugar for `Derived.dataOnly`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @returns {Derived<V>}
	 */
	static derivedD = (asyncCallback) => Derived.dataOnly(asyncCallback);
	/**
	 * singlar attribute watcher for `Lifecycle`
	 * @param {string} attributeName
	 * @param {(options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>Promise<void>} lifecycleCallback
	 * @param {boolean} [isGlobal]
	 * @returns {Lifecycle}
	 */
	static lifecycle = (attributeName, lifecycleCallback, isGlobal = false) =>
		new Lifecycle({ [attributeName]: lifecycleCallback }, isGlobal);
}
