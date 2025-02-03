// @ts-check

import { Ping } from '../queue/Ping.mjs';
import { Let } from './Let.mjs';

/**
 * @description
 * generate side effect for `signal` based reactivity such as for:
 * - [Let](#let)
 * ```js
 * const letExample = new Let('')
 * new $(async(first)=>{
 *  const value = test.value;
 *  if(first){
 *      return;
 *      // return early if you want to opt out from handling the effect immediately,
 *      // also by doing this you can make the `$` slightly more performance 1) when dealing with `async await` on hydration,
 *      // such as data fetching;
 *  }
 *      // handle value
 * })
 * // 1) and when all of the effects is registered, you can call `letExample.call$` to call for effect in parallel;
 * ```
 * - [Derived](#derived)
 * ```js
 * // bassically the same with `Let` but use `new Derived`
 * ```
 */
export class $ {
	/**
	 * @type {Map<$["effect"], Set<import('./Let.mjs').Let>>}
	 */
	static effects = new Map();
	/**
	 * @type {Map<Let, Set<$["effect"]>>}
	 */
	static signals = new Map();
	/**
	 * @type {Set<Let>}
	 */
	static letInstances = new Set();
	static isRegistering = false;
	remove$ = () => {
		if (!$.effects.has(this.effect) && !$.effects.get(this.effect)) {
			return;
		}
		$.effects.get(this.effect).forEach((letInstances) => {
			$.signals.delete(letInstances);
		});
		$.effects.delete(this.effect);
	};
	/**
	 * @type {(isAtInitialization:boolean)=>Promise<void>}
	 */
	effect;
	/**
	 * @param {$["effect"]} asyncCallback
	 */
	constructor(asyncCallback) {
		this.effect = asyncCallback;
		new Ping(true, async () => {
			$.isRegistering = true;
			await asyncCallback(true);
			$.isRegistering = false;
			const letInstances = $.letInstances;
			$.effects.set(asyncCallback, new Set(letInstances));
			letInstances.forEach((let_) => {
				if (!$.signals.has(let_)) {
					$.signals.set(let_, new Set([asyncCallback]));
				} else {
					$.signals.get(let_).add(asyncCallback);
				}
			});
			$.letInstances.clear();
		});
	}
}
