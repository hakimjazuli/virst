export type attributeChangedLifecycle = ((options: {
    attr: string;
    newValue: string;
}) => Promise<void>);
export type lifecycleHandler = {
    isConnected: boolean;
    /**
     * - swap element using DefinePageTemplateInstance swap method;
     * - use mode "inner"/"outer" carefully;
     */
    swap: (options: Omit<import("../utils/DefinePageTemplate.mjs").swapWithPageTemplateOptions, "element">) => void;
    element: HTMLElement;
    /**
     * - use to modify the innerHTML of the `LifeCycleInstance` element;
     */
    html: (strings: TemplateStringsArray, ...values: string[]) => {
        inner: () => void;
        string: string;
    };
    lifecycleObserver: import("./Lifecycle.mjs").Lifecycle;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
    onViewPort: (onViewCallback: import("./onViewPortHandler.type.mjs").onViewPortHandler["onViewPort"]) => import("./onViewPort.export.mjs").onViewPort;
};
