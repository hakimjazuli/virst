export type attributeChangedLifecycle = (options: {
    attributeName: string;
    newValue: string;
}) => Promise<void>;
export type lifecycleHandler = {
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
