export type documentScope = HTMLElement | Element | ShadowRoot | Document;
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
    swap: (options: Omit<import("./src/DefinePageTemplate.mjs").swapWithPageTemplateOptions, "element">) => void;
    element: HTMLElement;
    /**
     * - use to modify the innerHTML of the `LifeCycleInstance` element;
     */
    html: (strings: TemplateStringsArray, ...values: string[]) => void;
    lifecycleObserver: import("./src/Lifecycle.mjs").Lifecycle;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
    onViewPort: (elementsCallbacks: import("./src/onViewPortHandler.type.mjs").elementsLCCallbacks) => import("./src/onViewPort.mjs").onViewPort;
};
export type onViewPortType = import("./src/onViewPort.mjs").onViewPort;
export type onViewPortHandler = {
    removeOnExitViewCallback: () => void;
    removeOnViewCallback: () => void;
    unobserveElement: () => void;
};
export type onViewPortLifecycleHandler = import("./src/lifecycleHandler.type.mjs").lifecycleHandler;
export type elementsCallbacks = elementsLCCallbacks & {
    element: HTMLElement;
};
export type elementsLCCallbacks = {
    onViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    onExitViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    lifecyclesOnDisconnected: onViewPortLifecycleHandler["onDisconnected"][];
};
import { $ } from './src/$.mjs';
import { App } from './src/App.mjs';
import { CRUD } from './src/CRUD.mjs';
import { DefinePageTemplate } from './src/DefinePageTemplate.mjs';
import { DefineQRouter } from './src/DefineQRouter.mjs';
import { DefineShortCuts } from './src/DefineShortCuts.mjs';
import { DefineStorage } from './src/DefineStorage.mjs';
import { Derived } from './src/Derived.mjs';
import { Event_ } from './src/Event_.mjs';
import { For } from './src/For.mjs';
import { helper } from './src/helper.export.mjs';
import { Let } from './src/Let.mjs';
import { Lifecycle } from './src/Lifecycle.mjs';
import { List } from './src/List.mjs';
import { Ping } from './src/Ping.mjs';
import { ShortCut } from './src/ShortCut.mjs';
import { Try_ } from './src/Try_.mjs';
import { WebComponent } from './src/WebComponent.mjs';
import { WorkerMainThread } from './src/WorkerMainThread.mjs';
import { WorkerThread } from './src/WorkerThread.mjs';
import { _ } from './src/_.mjs';
export { $, App, CRUD, DefinePageTemplate, DefineQRouter, DefineShortCuts, DefineStorage, Derived, Event_, For, helper, Let, Lifecycle, List, Ping, ShortCut, Try_, WebComponent, WorkerMainThread, WorkerThread, _ };
