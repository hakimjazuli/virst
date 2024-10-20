export type attributeChangedLifecycle = (options: {
    attributeName: string;
    newValue: string;
}) => Promise<void>;
export type lifecycleHandler = {
    element: HTMLElement;
    cloneElement: () => HTMLElement;
    lifecycleObserver: import("./Lifecycle.mjs").Lifecycle;
    onConnected: (arg0: () => Promise<void>) => void;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
    onViewPort: (elementsCallbacks: import("./onViewPortHandler.type.mjs").elementsLCCallbacks) => import("./onViewPort.mjs").onViewPort;
};
