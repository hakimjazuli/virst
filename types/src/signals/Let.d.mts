/**
 * @description
 * `signal` based reactivity;
 * assigning newValue to Let insance:
 * - `dataOnly`:
 * ```js
 * const dataOnlyExample = Let.dataOnly(args0);
 * ```
 * - with `domReflector`;
 * ```js
 * const letSingle = new Let(1, ...args);
 * letSingle.value++; // 2;
 * letSingle.value = 3 // 3;
 * ```
 * > - the `domReflector` will automatically synchronise the value with the element on the dom;
 * ```html
 * <div attributeName="...selectorsSeparatedBySemicolon"></div>
 * ```
 * > - selector can be `attributeName` or `propertyName`:
 * > > - special selector `value`: will automatically bind the value with `oninput` event;
 * > > - special selector `class`: will dynamically add/remove `classes`, must be formated like this `{class: "strings of HTMLClassNames separated by space"}`
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
     * @param {string} attr
     * @param {HTMLElement} element
     * @param {Let} letObject
     * @returns {void}
     */
    static domReflector: (val: any, attr: string, element: HTMLElement, letObject: Let<any>) => void;
    /**
     * @template V
     * @param {V} data
     * @returns {Let<V>}
     */
    static dataOnly: <V_1>(data: V_1) => Let<V_1>;
    /**
     * @private
     * @param {Let} letInstance
     * @returns {Set<$["effect"]>}
     */
    private static subscriptions;
    /**
     * @param {V} value
     * @param {string} [attributeName]
     * @param {Object} [options]
     * @param {documentScope} [options.documentScope]
     */
    constructor(value: V, attributeName?: string, options?: {
        documentScope?: import("../lifecycle/documentScope.type.mjs").documentScope;
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
     * @returns {void}
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
     * notify all subscriptions
     * @returns {void}
     */
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
