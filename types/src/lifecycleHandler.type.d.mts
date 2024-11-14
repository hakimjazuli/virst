export type attributeChangedLifecycle = (options: {
    attributeName: string;
    newValue: string;
}) => Promise<void>;
export type lifecycleHandler = {
    isConnected: boolean;
    /**
     * - swap element using DefinePageTemplateInstance swap method;
     * - use mode "inner"/"outer" carefully;
     */
    swap: (options: Omit<import("./DefinePageTemplate.mjs").swapWithPageTemplateOptions, "element">) => void;
    element: HTMLElement;
    /**
     * - use to modify the innerHTML of the `LifeCycleInstance` element;
     */
    html: (strings: TemplateStringsArray, ...values: string[]) => void;
    lifecycleObserver: import("./Lifecycle.mjs").Lifecycle;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
    onViewPort: (elementsCallbacks: import("./onViewPortHandler.type.mjs").elementsLCCallbacks) => import("./onViewPort.mjs").onViewPort;
};
