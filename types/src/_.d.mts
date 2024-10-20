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
     * auto `attributeName` assign for `Let`
     * @template V
     * @param {V} value
     * @param {boolean} [isGlobal]
     */
    static l: <V>(value: V, isGlobal?: boolean) => Let<V>;
    /**
     * syntax sugar for `Let.dataOnly`
     * @template D
     * @param {D} data
     * @returns {Let<D>}
     */
    static lD: <D>(data: D) => Let<D>;
    /**
     * auto `attributeName` assign for `Derived`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     * @param {boolean} [isGlobal]
     */
    static d: <V>(asyncCallback: () => Promise<V>, isGlobal?: boolean) => Derived<V>;
    /**
     * syntax sugar for `Derived.dataOnly`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     * @returns {Derived<V>}
     */
    static dD: <V>(asyncCallback: () => Promise<V>) => Derived<V>;
    /**
     * auto `attributeName` assign for `Lifecycle`
     * @param {boolean} isGlobal
     * @param {(options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>Promise<void>} lifecycleCallback
     * @returns {Lifecycle}
     */
    static lc: (isGlobal: boolean, lifecycleCallback: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => Promise<void>) => Lifecycle;
}
import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { Lifecycle } from './Lifecycle.mjs';
