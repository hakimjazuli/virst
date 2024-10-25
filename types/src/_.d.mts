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
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     */
    /**
     * auto `attributeName` assign for `Let`
     * @template V
     * @param {V} value
     * @param {Object} [options]
     * @param {documentScope} [options.documentScope]
     * @param {boolean} [options.bypassNested]
     */
    static l: <V>(value: V, options?: {
        documentScope?: import("./documentScope.type.mjs").documentScope;
        bypassNested?: boolean;
    }) => Let<V>;
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
     * @param {Object} [options]
     * @param {documentScope} [options.documentScope]
     * @param {boolean} [options.bypassNested]
     */
    static d: <V>(asyncCallback: () => Promise<V>, options?: {
        documentScope?: import("./documentScope.type.mjs").documentScope;
        bypassNested?: boolean;
    }) => Derived<V>;
    /**
     * syntax sugar for `Derived.dataOnly`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     * @returns {Derived<V>}
     */
    static dD: <V>(asyncCallback: () => Promise<V>) => Derived<V>;
}
import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
