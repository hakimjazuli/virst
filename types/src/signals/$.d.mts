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
    static effects: Map<$["effect"], Set<Let<any>>>;
    /**
     * @type {Map<Let, Set<$["effect"]>>}
     */
    static signals: Map<Let<any>, Set<$["effect"]>>;
    /**
     * @type {Set<Let>}
     */
    static letInstances: Set<Let<any>>;
    static isRegistering: boolean;
    /**
     * @param {$["effect"]} asyncCallback
     */
    constructor(asyncCallback: $["effect"]);
    remove$: () => void;
    /**
     * @type {(isAtInitialization:boolean)=>Promise<void>}
     */
    effect: (isAtInitialization: boolean) => Promise<void>;
}
import { Let } from './Let.mjs';
