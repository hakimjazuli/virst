export type onViewPortType = import("./onViewPort.mjs").onViewPort;
export type onViewPortHandler = {
    removeOnExitViewCallback: () => void;
    removeOnViewCallback: () => void;
    unobserveElement: () => void;
};
export type onViewPortLifecycleHandler = import("./lifecycleHandler.type.mjs").lifecycleHandler;
export type elementsCallbacks = elementsLCCallbacks & {
    element: HTMLElement;
};
export type elementsLCCallbacks = {
    onViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    onExitViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    lifecyclesOnDisconnected: onViewPortLifecycleHandler["onDisconnected"][];
};
