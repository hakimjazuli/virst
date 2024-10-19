/**
 * @description
 * - observe element on intersecting with `viewPort`;
 * - use inside `Lifecycle` `onConnected` scope, by instantiating this class;
 * ```js
 * // Lifecycle scope
 * onConnected(async()=>{
 * 	new OnViewPort({...options});
 * });
 * ```
 */
export class onViewPort {
    /**
     * @private
     */
    private static observer;
    /**
     * @returns {IntersectionObserverEntry[]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
     */
    static takeRecords: () => IntersectionObserverEntry[];
    /**
     * @returns {void}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
     */
    static disconnect: () => void;
    static get root(): Element | Document;
    static get rootMargin(): string;
    /**
     * @param {Element|HTMLElement} element
     * @returns
     */
    static unobserve: (element: Element | HTMLElement) => void;
    /**
     * @param {HTMLElement} element
     */
    static removeOnViewCallback: (element: HTMLElement) => void;
    /**
     * @param {HTMLElement} element
     */
    static removeOnExitViewCallback: (element: HTMLElement) => void;
    /**
     * @param {HTMLElement} element
     */
    static removeAllCallbacks: (element: HTMLElement) => void;
    /**
     * @type {import('./onViewPortHandler.type.mjs').onViewPortHandler}
     */
    static onViewCallbacksOptions: import("./onViewPortHandler.type.mjs").onViewPortHandler;
    /**
     * @private
     * @param {IntersectionObserverEntry} entry
     */
    private static handleEntry;
    /**
     * @param {import('./onViewPortHandler.type.mjs').elementsCallbacks} elementsCallbacks
     */
    constructor(elementsCallbacks: import("./onViewPortHandler.type.mjs").elementsCallbacks);
}
