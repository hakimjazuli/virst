// @ts-check

/**
 * generated using:
 * @see {@link https://www.npmjs.com/package/@html_first/js_lib_template | @html_first/js_lib_template}
 * @copyright
 * developed and published under MIT license,
 * @description
 * ## about virst
 * virst is:
 * - new repo/library based on `@html_first/simple_signal`;
 * > - which itself are inspired by `solidJS` `signal` based `reactivity`
 * - collections of library for creating:
 * > - `reactive`(and if necessary, `declarative`) `SPA web app`, including functionalities such as:
 * > > - client side `routing` (using query parameter with our `DefineQRouter`);
 * > > - `signal` based asyncrhonous reactivity, which supports:
 * > > > - `dataOnly`;
 * > > > - with `domRelect` (using `attributeName="...attributeValues;"`);
 * > > - optional templating using:
 * > > > - `html` page based template;
 * > > > - our `Component` instances;
 * > - client side JS library that are relying on `attributeName` to track the element lifecycle, using our `Lifecyle` class api:
 * > > - you can use it to create your own `HATEOAS` (like `htmx`) client side library, to interprete returned `htmlString` which have certain `attributeName`;
 * > > - handle non editable `static site generated` exports/publish such as:
 * > > > - `bootstrap studio`;
 * > > > - `pinegrow`;
 * > > > - `WYSIWYG web builder`;
 * > > > - or bassically any kind of `SSG` software;
 * > - comes with `asyncQueue` handler in the background;
 * > > - no need to scratch your head too much for `async` processes;
 * ## about this readme
 * - this `repo`/`lib` only serves for `api-documentation` purposes;
 * - as for `example` on how to use on different `useCase` refer to [html-first-virst](https://html-first.bss.design/index.html?page=virst)
 */

import { $ } from './src/$.mjs';
import { Animation } from './src/Animation.mjs';
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
import { OnViewPort } from './src/OnViewPort.mjs';
import { Ping } from './src/Ping.mjs';
import { ShortCut } from './src/ShortCut.mjs';
import { WorkerMainThread } from './src/WorkerMainThread.mjs';
import { WorkerThread } from './src/WorkerThread.mjs';
import { _ } from './src/_.mjs';

/**
 * @description
 * type helper for `documentScope`
 */
/**
 * @typedef {HTMLElement|Element|ShadowRoot|Document} documentScope
 */
/**
 * @description
 * type helper for `lifecycleHandler` & `attributeChangedLifecycle`
 */
/**
 * @typedef {(options:{attributeName:string, newValue:string})=>Promise<void>} attributeChangedLifecycle
 * @typedef {Object} lifecycleHandler
 * @property {HTMLElement} lifecycleHandler.element
 * @property {Lifecycle} lifecycleHandler.lifecycleObserver
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onConnected
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onDisconnected
 * @property {(arg0:attributeChangedLifecycle)=>void} lifecycleHandler.onAttributeChanged
 */
/**
 * @description
 * type helper for `onViewPortHandler`
 */
/**
 * @typedef {Object} onViewPortHandlerDisconnector
 * @property {HTMLElement|Element} element
 * @property {OnViewPort} onViewPortObserver
 * @property {Lifecycle} lifecycleObserver
 * @typedef {Object} onViewPortHandler
 * @property {(options:onViewPortHandlerDisconnector)=>Promise<void>} onViewPortHandler.onViewPort
 * @property {(options:onViewPortHandlerDisconnector)=>Promise<void>} onViewPortHandler.onExitingViewPort
 * @property {(options:onViewPortHandlerDisconnector)=>Promise<void>} onViewPortHandler.onDisconnected
 */

export { $, Animation, App, Component, CRUD, DefinePageTemplate, DefineQRouter, DefineShortCuts, DefineStorage, Derived, Event_, For, Let, Lifecycle, List, OnViewPort, Ping, ShortCut, WorkerMainThread, WorkerThread, _ };