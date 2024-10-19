export type onViewPortType = import("./onViewPort.mjs").onViewPort;
export type onViewPortHandler = {
    removeOnExitViewCallback: typeof import("./onViewPort.mjs").onViewPort.removeOnExitViewCallback;
    removeOnViewCallback: typeof import("./onViewPort.mjs").onViewPort.removeOnViewCallback;
    removeAllCallbacks: typeof import("./onViewPort.mjs").onViewPort.removeAllCallbacks;
    unobserve: typeof import("./onViewPort.mjs").onViewPort.unobserve;
};
export type onViewPortLifecycleHandler = import("./lifecycleHandler.type.mjs").lifecycleHandler;
export type elementsCallbacks = {
    element: HTMLElement;
    onViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    onExitViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    lifecyclesOnDisconnected: onViewPortLifecycleHandler["onDisconnected"][];
};
