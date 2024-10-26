// @ts-check

/**
 * generated using:
 * @see {@link https://www.npmjs.com/package/@html_first/js_lib_template | @html_first/js_lib_template}
 * @copyright
 * developed and published under MIT license,
 * @description
 * ## about virst
 * virst is:
 * - pronounced `/fɜrst/` ("technically" pun of first `/fɜrst/` and burst `/bɜrst/`);
 * - new repo/library based on `@html_first/simple_signal`;
 * > - which itself are inspired by `solidJS` `signal` based `reactivity`
 * > > - which then `simple_signal` will be discontinued effective immediately;
 * - collections of library for creating:
 * > - `reactive`(and if necessary, `declarative`) `SPA web app`, including functionalities such as:
 * > > - client side `routing` (using query parameter with our `DefineQRouter`);
 * > > - `signal` based asyncrhonous reactivity, which supports:
 * > > > - `dataOnly`;
 * > > > - with `domReflect` (using `attributeName="...attributeValues;"`);
 * > > - templating using `html` page based template;
 * > - client side JS library that are relying on `attributeName` to track the element lifecycle, using our `Lifecyle` class api:
 * > > - you can use it to create your own `HATEOAS` (like `htmx`) client side library, to interprete returned `htmlString` which have certain `attributeName`;
 * > > - handle non editable `static site generated` exports/publish such as:
 * > > > - `bootstrap studio`;
 * > > > - `pinegrow`;
 * > > > - `WYSIWYG web builder`;
 * > > > - or bassically any kind of `SSG` software;
 * > > - added globals in window object `window["virst"]["QUnique"]` and `window["virst"]["QFIFO"]` so any library that, targets client side bundled and, are written using `virst` `Lifecycle` will share the same queue handler;
 * - comes with `asyncQueue` handler in the background;
 * > - no need to scratch your head too much for `async` processes;
 * - all of our class api are `typed` with `jsdoc`:
 * > - if you cannot find the documentation in this `readme`, you can allways rely on your `IDE intellisense`
 * ## about this readme
 * - this `repo`/`lib` only serves for `api-documentation` purposes;
 * - as for `example` on how to use on different `useCase` refer to [html-first-virst](https://html-first.bss.design/index.html?page=virst)
 * ## how to install
 * ```shell
 * npm i virst
 * // or
 * bun i virst
 * // or any js package manager with npm capability
 * ```
 * ## v0.^9.x
 * - drop supports for `Animation`
 * > - it's better to use more dedicated library like [animeJS](https://animejs.com/)
 * ## v0.^12.x
 * - drop supports for `Component`
 * > - we don't have support for scoped styling out of the box, it's possible using workarround using selector `Lifecycle` `onConnected` `attr` parameter as css selector inside `html` callback parameter with style tag, which we decided this workarround would be counter productive, therefore we drop it;
 */

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
import { Let } from './src/Let.mjs';
import { Lifecycle } from './src/Lifecycle.mjs';
import { List } from './src/List.mjs';
import { Ping } from './src/Ping.mjs';
import { ShortCut } from './src/ShortCut.mjs';
import { Try_ } from './src/Try_.mjs';
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
 * @property {(strings:TemplateStringsArray,...values:string[])=>void} lifecycleHandler.html
 * - use to modify the innerHTML of the `LifeCycleInstance` element;
 * @property {import('./src/Lifecycle.mjs').Lifecycle} lifecycleHandler.lifecycleObserver
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onDisconnected
 * @property {(arg0:attributeChangedLifecycle)=>void} lifecycleHandler.onAttributeChanged
 * @property {(elementsCallbacks:import('./src/onViewPortHandler.type.mjs').elementsLCCallbacks)=>import('./src/onViewPort.mjs').onViewPort} lifecycleHandler.onViewPort
 */
/**
 * @description
 * - `typehelper` for onViewPort
 */
/**
 * @typedef {import('./src/onViewPort.mjs').onViewPort} onViewPortType
 * @typedef {Object} onViewPortHandler
 * @property {()=>void} removeOnExitViewCallback
 * @property {()=>void} removeOnViewCallback
 * @property {()=>void} unobserveElement
 * @typedef {import('./src/lifecycleHandler.type.mjs').lifecycleHandler} onViewPortLifecycleHandler
 * @typedef {elementsLCCallbacks & { element: HTMLElement }} elementsCallbacks
 * @typedef {Object} elementsLCCallbacks
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 * @property {onViewPortLifecycleHandler["onDisconnected"][]} lifecyclesOnDisconnected
 */

export { $, App, CRUD, DefinePageTemplate, DefineQRouter, DefineShortCuts, DefineStorage, Derived, Event_, For, Let, Lifecycle, List, Ping, ShortCut, Try_, WorkerMainThread, WorkerThread, _ };