// @ts-check

import { $ } from './$.mjs';
import { Let } from './Let.mjs';

/**
 * @description
 * - this class is extended from `Let` [`Let`](#let)
 * -`signal` based reactivity, wich value are derived from reacting to [`Let<T>.value`](#let) effects that are called in the `asyncCallback` this class instantiation;
 * ```js
 * // @ts-check
 * const letSingle = new Let(1);
 * const doubleExample = new Derived(async()=>{
 * 	const value = letSingle.value; // autoscubscribed to `letSingle` value changes;
 * return value * 2; // returned value are to be derivedValue
 * });
 * ```
 * - `dataOnly`:
 * ```js
 * const dataOnlyExample = Derived.dataOnly(asyncCallback);
 * ```
 * > - this will automatically opt you out from `domReflector`;
 * - make sure to check `argument` documentation in your `IDE` `typehint`;
 */
/**
 * @template V
 */
// @ts-ignore
export class Derived extends Let {
	/**
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @returns {Derived<V>}
	 */
	static dataOnly = (asyncCallback) => new Derived(asyncCallback);
	/**
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {string} [attributeName]
	 * @param {boolean} [isGlobal]
	 */
	constructor(asyncCallback, attributeName = undefined, isGlobal = false) {
		super('', attributeName, isGlobal);
		new $(async () => {
			super.value = await asyncCallback();
		});
	}
	get value() {
		return super.value;
	}
	set value(_) {
		console.warn('you are not allowed to change Derived value manually');
	}
}
