export class ElementShouldHave {
    /**
     * @typedef {Map<string, Set<import('./lifecycleHandler.type.mjs').attributeChangedLifecycle>>} attributeChangesCallbacks
     * @typedef {Map<string, Map<import('./documentScope.type.mjs').documentScope, Set<()=>Promise<void>>>>} disconnectCallbacks
     * @typedef {Map<string, Set<import('./onViewPortHandler.type.mjs').onViewPortHandler["onViewPort"]>>} viewCallbacks
     * @typedef {Map<string, Set<import('./onViewPortHandler.type.mjs').onExitViewPortArg0>>} exitViewCallbacks
     */
    /**
     * @param {Object} a0
     * @param {attributeChangesCallbacks} [a0.attributeChangesCallbacks]
     * @param {disconnectCallbacks} [a0.disconnectCallbacks]
     * @param {viewCallbacks} [a0.viewCallbacks]
     * @param {exitViewCallbacks} [a0.exitViewCallbacks]
     */
    constructor({ attributeChangesCallbacks, disconnectCallbacks, viewCallbacks, exitViewCallbacks, }: {
        attributeChangesCallbacks?: Map<string, Set<import("./lifecycleHandler.type.mjs").attributeChangedLifecycle>>;
        disconnectCallbacks?: Map<string, Map<import("./documentScope.type.mjs").documentScope, Set<() => Promise<void>>>>;
        viewCallbacks?: Map<string, Set<(onSightCallbackOptions: import("./onViewPortHandler.type.mjs").onViewCallbackOptions) => Promise<void>>>;
        exitViewCallbacks?: Map<string, Set<import("./onViewPortHandler.type.mjs").onExitViewPortArg0>>;
    });
    /**
     * @public
     * @type {attributeChangesCallbacks}
     */
    public attributeChangesCallbacks: Map<string, Set<import("./lifecycleHandler.type.mjs").attributeChangedLifecycle>>;
    /**
     * @public
     * @type {disconnectCallbacks}
     */
    public disconnectCallbacks: Map<string, Map<import("./documentScope.type.mjs").documentScope, Set<() => Promise<void>>>>;
    /**
     * @public
     * @type {viewCallbacks}
     */
    public viewCallbacks: Map<string, Set<(onSightCallbackOptions: import("./onViewPortHandler.type.mjs").onViewCallbackOptions) => Promise<void>>>;
    /**
     * @public
     * @type {exitViewCallbacks}
     */
    public exitViewCallbacks: Map<string, Set<import("./onViewPortHandler.type.mjs").onExitViewPortArg0>>;
}
