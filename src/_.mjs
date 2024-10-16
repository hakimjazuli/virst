// @ts-check

import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - scoping helper for `signal` based reactifity stored in static Method of class `_`;
 * - if you use our `Component` class, use this class static method, instead of their respective class, for `autoscoping`, which then you can use it's `attr` returned value to mark the element
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
	 * scoping helper for `Let`
	 * @template V
	 * @param {V} value
	 */
	static let = (value) =>
		new Let(value, helper.attributeIndexGenerator(), helper.currentDocumentScope);
	/**
	 * syntax sugar for `Let.dataOnly`
	 * @template D
	 * @param {D} data
	 * @returns {Let<D>}
	 */
	static letD = (data) => Let.dataOnly(data);
	/**
	 * scoping helper for `Derived`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 */
	static derived = (asyncCallback) =>
		new Derived(asyncCallback, helper.attributeIndexGenerator(), helper.currentDocumentScope);
	/**
	 * syntax sugar for `Derived.dataOnly`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @returns {Derived<V>}
	 */
	static derivedD = (asyncCallback) => Derived.dataOnly(asyncCallback);
	/**
	 * scoping helper for `Lifecycle`
	 * @param {string} attributeName
	 * @param {(options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>Promise<void>} lifecycleCallback
	 * @returns {Lifecycle}
	 */
	static lifecycle = (attributeName, lifecycleCallback) =>
		new Lifecycle({ [attributeName]: lifecycleCallback });
}
