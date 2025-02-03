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
export class Let<V> {
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
    static domReflector: (val: any, attributeName: string, element: HTMLElement, letObject: Let<any>) => void;
    /**
     * @template V
     * @param {V} data
     * @returns {Let<V>}
     */
    static dataOnly: <V_1>(data: V_1) => Let<V_1>;
    /**
     * @param {V} value
     * @param {string} [attributeName]
     * @param {Object} [options]
     * @param {documentScope} [options.documentScope]
     * @param {boolean} [options.bypassNested]
     */
    constructor(value: V, attributeName?: string, options?: {
        documentScope?: import("../lifecycle/documentScope.type.mjs").documentScope;
        bypassNested?: boolean;
    });
    /**
     * remove all effects
     * @return {void}
     */
    removeAll$: () => void;
    /**
     * remove effect
     * @param {$} $_
     * @return {void}
     */
    remove$: ($_: $) => void;
    /**
     * destroy all props
     */
    unRef: () => void;
    /**
     * @private
     * @type {V}
     */
    private value_;
    /**
     * @type {string}
     */
    attr: string;
    /**
     * @type {Set<$["effect"]>}
     */
    get subscriptions(): Set<(isAtInitialization: boolean) => Promise<void>>;
    call$: () => void;
    /**
     * @param {V} newValue
     */
    set value(newValue: V);
    /**
     * @returns {V}
     */
    get value(): V;
}
import { $ } from './$.mjs';
