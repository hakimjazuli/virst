export type documentScope = HTMLElement | Element | ShadowRoot | Document;
export type attributeChangedLifecycle = (options: {
    attributeName: string;
    newValue: string;
}) => Promise<void>;
export type lifecycleHandler = {
    element: HTMLElement;
    cloneElement: () => HTMLElement;
    lifecycleObserver: import("./src/Lifecycle.mjs").Lifecycle;
    onConnected: (arg0: () => Promise<void>) => void;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
    onViewPort: (elementsCallbacks: import("./src/onViewPortHandler.type.mjs").elementsCallbacks) => import("./src/onViewPort.mjs").onViewPort;
};
export type onViewPortType = import("./src/onViewPort.mjs").onViewPort;
export type onViewPortHandler = {
    removeOnExitViewCallback: typeof import("./src/onViewPort.mjs").onViewPort.removeOnExitViewCallback;
    removeOnViewCallback: typeof import("./src/onViewPort.mjs").onViewPort.removeOnViewCallback;
    removeAllCallbacks: typeof import("./src/onViewPort.mjs").onViewPort.removeAllCallbacks;
    unobserve: typeof import("./src/onViewPort.mjs").onViewPort.unobserve;
};
export type onViewPortLifecycleHandler = import("./src/lifecycleHandler.type.mjs").lifecycleHandler;
export type elementsCallbacks = {
    element: HTMLElement;
    onViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    onExitViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    lifecyclesOnDisconnected: onViewPortLifecycleHandler["onDisconnected"][];
};
import { $ } from './src/$.mjs';
import { App } from './src/App.mjs';
import { Component } from './src/Component.mjs';
import { CRUD } from './src/CRUD.mjs';
import { DefinePageTemplate } from './src/DefinePageTemplate.mjs';
import { DefineQRouter } from './src/DefineQRouter.mjs';
import { DefineShortCuts } from './src/DefineShortCuts.mjs';
import { DefineStorage } from './src/DefineStorage.mjs';
import { Derived } from './src/Derived.mjs';
import { Event_ } from './src/Event_.mjs';
import { For } from './src/For.mjs';
import { Let } from './src/Let.mjs';
import { Lifecycle } from './src/Lifecycle.mjs';
import { List } from './src/List.mjs';
import { Ping } from './src/Ping.mjs';
import { ShortCut } from './src/ShortCut.mjs';
import { Try_ } from './src/Try_.mjs';
import { WorkerMainThread } from './src/WorkerMainThread.mjs';
import { WorkerThread } from './src/WorkerThread.mjs';
import { _ } from './src/_.mjs';
export { $, App, Component, CRUD, DefinePageTemplate, DefineQRouter, DefineShortCuts, DefineStorage, Derived, Event_, For, Let, Lifecycle, List, Ping, ShortCut, Try_, WorkerMainThread, WorkerThread, _ };
