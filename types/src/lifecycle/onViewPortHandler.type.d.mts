export type onExitViewPortArg0 = () => Promise<void>;
export type onViewCallbackOptions = {
    onExitViewPort: (arg0: () => Promise<void>) => void;
    unobserveElement: () => void;
    removeOnViewCallback: () => void;
    removeOnExitCallback: () => void;
};
export type onViewPortHandler = {
    element: HTMLElement;
    attr: string;
    onViewPort: (onSightCallbackOptions: onViewCallbackOptions) => Promise<void>;
    lifecyclesOnDisconnected: Array<(arg0: () => Promise<void>) => void>;
};
