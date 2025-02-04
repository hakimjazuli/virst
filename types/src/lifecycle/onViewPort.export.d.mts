/**
 * @description
 * - observe element on intersecting with `viewPort`;
 * - use inside `Lifecycle` `onConnected` scope;
 */
export class onViewPort {
    /**
     * @private
     * @type {number}
     */
    private static loadCount_;
    static set loadCount(value: number);
    static get loadCount(): number;
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
     * @private
     * @param {Element|HTMLElement} element
     * @returns
     */
    private static unobserve;
    /**
     * @private
     * @param {Element|HTMLElement} element
     */
    private static removeOnViewCallback;
    /**
     * @private
     * @param {Element|HTMLElement} element
     */
    private static removeOnExitViewCallback;
    /**
     * @private
     * @type {(element:Element|HTMLElement)=>import('./onViewPortHandler.type.mjs').onViewPortHandler}
     */
    private static onViewCallbacksOptions;
    /**
     * @private
     * @type {Map<HTMLElement|Element, true>}
     */
    private static registeredOnExit;
    /**
     * @private
     * @param {IntersectionObserverEntry} entry
     */
    private static handleEntry;
    /**
     * @param {import('./onViewPortHandler.type.mjs').elementsCallbacks} elementsCallbacks
     */
    constructor({ element, onExitViewCallback, onViewCallback, lifecyclesOnDisconnected }: import("./onViewPortHandler.type.mjs").elementsCallbacks);
    /**
     * @private
     */
    private element;
    disconnect: () => Promise<void>;
}
