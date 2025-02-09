// @ts-check

import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { helper } from '../utils/helper.export.mjs';

/**
 * @description
 * - auto `attributeName` assign for `signal` based reactifity stored in static Method of class `_`;
 * - if you use our `Component` class, use this class static method, instead of their respective class, for generating `attributeName` to watch, which then you can use it's `attr` returned value to mark the element
 * ```js
 * // on Component scope
 * onConnected(async()=>{
 * 	const data = _.l('test');
 * 	html`<div ${data.attr}="innerText"></div>`
 * })
 * ```
 */
export class _ {
	/**
	 * @typedef {import('../lifecycle/documentScope.type.mjs').documentScope} documentScope
	 */
	/**
	 * auto `attributeName` assign for `Let`
	 * @template V
	 * @param {V} value
	 * @param {Object} [options]
	 * @param {documentScope} [options.documentScope]
	 */
	static l = (value, options) => new Let(value, helper.attributeIndexGenerator(), options);
	/**
	 * syntax sugar for `Let.dataOnly`
	 * @template D
	 * @param {D} data
	 * @returns {Let<D>}
	 */
	static lD = (data) => Let.dataOnly(data);
	/**
	 * auto `attributeName` assign for `Derived`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {Object} [options]
	 * @param {documentScope} [options.documentScope]
	 */
	static d = (asyncCallback, options) =>
		new Derived(asyncCallback, helper.attributeIndexGenerator(), options);
	/**
	 * syntax sugar for `Derived.dataOnly`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @returns {Derived<V>}
	 */
	static dD = (asyncCallback) => Derived.dataOnly(asyncCallback);
}
