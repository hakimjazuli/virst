export class onViewPort {
    /**
     * @typedef {import('./onViewPortHandler.type.mjs').onViewPortHandler} onViewPortHandler
     * @typedef {import('./onViewPortHandler.type.mjs').onViewCallbackOptions} onViewCallbackOptions
     * @typedef {import('./onViewPortHandler.type.mjs').onExitViewPortArg0} onExitViewPortArg0
     */
    /**
     * @type {IntersectionObserver["root"]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/root
     */
    static get root(): Element | Document;
    /**
     * @type {IntersectionObserver["thresholds"]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/thresholds
     */
    static get thresholds(): readonly number[];
    /**
     * @type {IntersectionObserver["rootMargin"]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/rootMargin
     */
    static get rootMargin(): string;
    /**
     * @type {IntersectionObserver["takeRecords"]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
     */
    static takeRecords: IntersectionObserver["takeRecords"];
    /**
     * @type {IntersectionObserver["disconnect"]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
     */
    static disconnect: IntersectionObserver["disconnect"];
    /**
     * @private
     * @param {HTMLElement} element
     * @returns {Map<string, Set<onViewPortHandler["onViewPort"]>>}
     */
    private static getOnView;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {string} attr
     * @param {onViewPortHandler["onViewPort"]} onSightCallback
     * @private
     */
    private static setOnView;
    /**
     * @private
     * @param {HTMLElement} element
     * @returns {Map<string, Set<onExitViewPortArg0>>}
     */
    private static getOnExit;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {string} attr
     * @param {onExitViewPortArg0} onExitCallback
     */
    private static setOnExit;
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
     * @private
     * @param {IntersectionObserverEntry} entry
     */
    private static handleEntry;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {string} attr
     * @returns {ReturnType<onViewCallbackOptions["removeOnViewCallback"]>}
     */
    private static removeSightCallback;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {string} attr
     * @returns {ReturnType<onViewCallbackOptions["removeOnExitCallback"]>}
     */
    private static removeOnExitCallback;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {string} attr
     * @returns {ReturnType<onViewCallbackOptions["unobserveElement"]>}
     */
    private static unobserveElement;
    /**
     * @param {onViewPortHandler} param0
     */
    constructor({ element, attr, onViewPort: onViewPort_, lifecyclesOnDisconnected }: import("./onViewPortHandler.type.mjs").onViewPortHandler);
}
