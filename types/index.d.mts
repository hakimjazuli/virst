export { Lifecycle } from "./src/lifecycle/Lifecycle.mjs";
export { onViewPort } from "./src/lifecycle/onViewPort.export.mjs";
export { Ping } from "./src/queue/Ping.mjs";
export { Q } from "./src/queue/Q.mjs";
export { QueuedBlock } from "./src/queue/QueuedBlock.mjs";
export { $ } from "./src/signals/$.mjs";
export { Derived } from "./src/signals/Derived.mjs";
export { Let } from "./src/signals/Let.mjs";
export { List } from "./src/signals/List.mjs";
export { _ } from "./src/signals/_.mjs";
export { App } from "./src/utils/App.mjs";
export { CRUD } from "./src/utils/CRUD.mjs";
export { DefinePageTemplate } from "./src/utils/DefinePageTemplate.mjs";
export { DefineQRouter } from "./src/utils/DefineQRouter.mjs";
export { DefineShortCuts } from "./src/utils/DefineShortCuts.mjs";
export { DefineStorage } from "./src/utils/DefineStorage.mjs";
export { Event_ } from "./src/utils/Event_.mjs";
export { For } from "./src/utils/For.mjs";
export { FSsrc } from "./src/utils/FSsrc.mjs";
export { helper } from "./src/utils/helper.export.mjs";
export { ShortCut } from "./src/utils/ShortCut.mjs";
export { Try_ } from "./src/utils/Try_.mjs";
export { virst } from "./src/utils/virst.export.mjs";
export { WebComponent } from "./src/utils/WebComponent.mjs";
export { WorkerMainThread } from "./src/utils/WorkerMainThread.mjs";
export { WorkerThread } from "./src/utils/WorkerThread.mjs";
export type documentScope = HTMLElement | Element | ShadowRoot | Document | Node;
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
    swap: (options: Omit<import("./src/utils/DefinePageTemplate.mjs").swapWithPageTemplateOptions, "element">) => void;
    element: HTMLElement;
    /**
     * - use to modify the innerHTML of the `LifeCycleInstance` element;
     */
    html: (strings: TemplateStringsArray, ...values: string[]) => {
        inner: () => void;
        string: string;
    };
    lifecycleObserver: import("./src/lifecycle/Lifecycle.mjs").Lifecycle;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
    onViewPort: (onViewCallbackOptions: import("./src/lifecycle/onViewPortHandler.type.mjs").onViewPortHandler["onViewPort"]) => import("./src/lifecycle/onViewPort.export.mjs").onViewPort;
};
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
