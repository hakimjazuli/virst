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
 * > > > - with "dom reflector" (using `attributeName="...attributeValues;"`);
 * > > - templating using:
 * > > > - native web component with `WebComponent` Instance;
 * > > > - `Lifecycle` Instance with:
 * > > > > - `html` `onConnectedOptions` to modify element `innerHTML`;
 * > > > > - `DefinePageTemplate` `attributeName` template on other page with `swap`
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
 * - uses native web component instead using `WebComponent` class
 * - it's a fix for `Lifecycle` behaviour and simple `WebComponent` generation class
 * ## v0.^15.x
 * - fixed `Lifecycle` scope mechanism
 * - added `class` `attributeSelector` to dynamically proportional binding conditionally by using `signal` value;
 */
export { Lifecycle } from './src/lifecycle/Lifecycle.mjs';
export { onViewPort } from './src/lifecycle/onViewPort.export.mjs';
export { Ping } from './src/queue/Ping.mjs';
export { Q } from './src/queue/Q.mjs';
export { QueuedBlock } from './src/queue/QueuedBlock.mjs';
export { $ } from './src/signals/$.mjs';
export { Derived } from './src/signals/Derived.mjs';
export { Let } from './src/signals/Let.mjs';
export { List } from './src/signals/List.mjs';
export { _ } from './src/signals/_.mjs';
export { App } from './src/utils/App.mjs';
export { CRUD } from './src/utils/CRUD.mjs';
export { DefinePageTemplate } from './src/utils/DefinePageTemplate.mjs';
export { DefineQRouter } from './src/utils/DefineQRouter.mjs';
export { DefineShortCuts } from './src/utils/DefineShortCuts.mjs';
export { DefineStorage } from './src/utils/DefineStorage.mjs';
export { Event_ } from './src/utils/Event_.mjs';
export { For } from './src/utils/For.mjs';
export { FSsrc } from './src/utils/FSsrc.mjs';
export { helper } from './src/utils/helper.export.mjs';
export { ShortCut } from './src/utils/ShortCut.mjs';
export { Try_ } from './src/utils/Try_.mjs';
export { virst } from './src/utils/virst.export.mjs';
export { WebComponent } from './src/utils/WebComponent.mjs';
export { WorkerMainThread } from './src/utils/WorkerMainThread.mjs';
export { WorkerThread } from './src/utils/WorkerThread.mjs';
/**
 * @description
 * type helper for `documentScope`
 */
/**
 * @typedef {HTMLElement|Element|ShadowRoot|Document|Node} documentScope
 */
/**
 * @description
 * type helper for `lifecycleHandler` & `attributeChangedLifecycle`
 */
/**
 * @typedef {((options:{attr:string, newValue:string})=>Promise<void>)} attributeChangedLifecycle
 * @typedef {Object} lifecycleHandler
 * @property {boolean} lifecycleHandler.isConnected
 * @property {(options:Omit<import('./src/utils/DefinePageTemplate.mjs').swapWithPageTemplateOptions, 'element'>)=>void} lifecycleHandler.swap
 * - swap element using DefinePageTemplateInstance swap method;
 * - use mode "inner"/"outer" carefully;
 * @property {HTMLElement} lifecycleHandler.element
 * @property {(strings:TemplateStringsArray,...values:string[])=>{inner:()=>void, string:string}} lifecycleHandler.html
 * - use to modify the innerHTML of the `LifeCycleInstance` element;
 * @property {import('./src/lifecycle/Lifecycle.mjs').Lifecycle} lifecycleHandler.lifecycleObserver
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onDisconnected
 * @property {(arg0:attributeChangedLifecycle)=>void} lifecycleHandler.onAttributeChanged
 * @property {(elementsCallbacks:import('./src/lifecycle/onViewPortHandler.type.mjs').elementsLCCallbacks)=>import('./src/lifecycle/onViewPort.export.mjs').onViewPort} lifecycleHandler.onViewPort
 */
/**
 * @description
 * - `typehelper` for onViewPort
 */
/**
 * @typedef {Object} onViewPortHandler
 * @property {()=>void} removeOnExitViewCallback
 * @property {()=>void} removeOnViewCallback
 * @property {()=>void} unobserveElement
 * @typedef {import('./src/lifecycle/lifecycleHandler.type.mjs').lifecycleHandler} onViewPortLifecycleHandler
 * @typedef {elementsLCCallbacks & { element: HTMLElement }} elementsCallbacks
 * @typedef {Object} elementsLCCallbacks
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 * @property {onViewPortLifecycleHandler["onDisconnected"][]} lifecyclesOnDisconnected
 */