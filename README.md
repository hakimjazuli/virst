## about virst
virst is:
- pronounced `/fɜrst/` ("technically" pun of first `/fɜrst/` and burst `/bɜrst/`);
- new repo/library based on `@html_first/simple_signal`;
> - which itself are inspired by `solidJS` `signal` based `reactivity`
> > - which then `simple_signal` will be discontinued effective immediately;
- collections of library for creating:
> - `reactive`(and if necessary, `declarative`) `SPA web app`, including functionalities such as:
> > - client side `routing` (using query parameter with our `DefineQRouter`);
> > - `signal` based asyncrhonous reactivity, which supports:
> > > - `dataOnly`;
> > > - with "dom reflector" (using `attributeName="...attributeValues;"`);
> > - templating using:
> > > - native web component with `WebComponent` Instance;
> > > - `Lifecycle` Instance with:
> > > > - `html` `onConnectedOptions` to modify element `innerHTML`;
> > > > - `DefinePageTemplate` `attributeName` template on other page with `swap`
> - client side JS library that are relying on `attributeName` to track the element lifecycle, using our `Lifecyle` class api:
> > - you can use it to create your own `HATEOAS` (like `htmx`) client side library, to interprete returned `htmlString` which have certain `attributeName`;
> > - handle non editable `static site generated` exports/publish such as:
> > > - `bootstrap studio`;
> > > - `pinegrow`;
> > > - `WYSIWYG web builder`;
> > > - or bassically any kind of `SSG` software;
> > - added globals in window object `window["virst"]["QUnique"]` and `window["virst"]["QFIFO"]` so any library that, targets client side bundled and, are written using `virst` `Lifecycle` will share the same queue handler;
- comes with `asyncQueue` handler in the background;
> - no need to scratch your head too much for `async` processes;
- all of our class api are `typed` with `jsdoc`:
> - if you cannot find the documentation in this `readme`, you can allways rely on your `IDE intellisense`
## about this readme
- this `repo`/`lib` only serves for `api-documentation` purposes;
- as for `example` on how to use on different `useCase` refer to [html-first-virst](https://html-first.bss.design/index.html?page=virst)
## how to install
```shell
npm i virst
// or
bun i virst
// or any js package manager with npm capability
```
## v0.^9.x
- drop supports for `Animation`
> - it's better to use more dedicated library like [animeJS](https://animejs.com/)
## v0.^12.x
- drop supports for `Component`
- uses native web component instead using `WebComponent` class
- it's a fix for `Lifecycle` behaviour and simple `WebComponent` generation class
## exported-api-and-type-list
- [Lifecycle](#lifecycle)
- [onViewPort](#onviewport)
- [Ping](#ping)
- [Q](#q)
- [QueuedBlock](#queuedblock)
- [$](#$)
- [Derived](#derived)
- [Let](#let)
- [List](#list)
- [_](#_)
- [App](#app)
- [CRUD](#crud)
- [DefinePageTemplate](#definepagetemplate)
- [DefineQRouter](#defineqrouter)
- [DefineShortCuts](#defineshortcuts)
- [DefineStorage](#definestorage)
- [Event_](#event_)
- [For](#for)
- [FSsrc](#fssrc)
- [helper](#helper)
- [ShortCut](#shortcut)
- [Try_](#try_)
- [virst](#virst)
- [WebComponent](#webcomponent)
- [WorkerMainThread](#workermainthread)
- [WorkerThread](#workerthread)
<h2 id="lifecycle">Lifecycle</h2>

- helper class to track connected/disconnected/attributeChanged of an element;- if there are global `attributeName` `test` are inside nested `Lifecycle`, add `virst-gs` and list of the names of the global `attributeName`, with semicolon `;` as separator;```html<div test="innerText" virst-gs="test;"></div>```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="onviewport">onViewPort</h2>

- observe element on intersecting with `viewPort`;- use inside `Lifecycle` `onConnected` scope;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="ping">Ping</h2>

trigger based callback integrated to the internal library  queue handler;can be created using class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="q">Q</h2>

helper methods for creating Promise to block execution code that return resume property to allow subsequent calls to proceed;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="queuedblock">QueuedBlock</h2>

function wrapper that turns callback into queued calls

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="$">$</h2>

generate side effect for `signal` based reactivity such as for:- [Let](#let)```jsconst letExample = new Let('')new $(async(first)=>{ const value = test.value; if(first){     return;     // return early if you want to opt out from handling the effect immediately,     // also by doing this you can make the `$` slightly more performance 1) when dealing with `async await` on hydration,     // such as data fetching; }     // handle value})// 1) and when all of the effects is registered, you can call `letExample.call$` to call for effect in parallel;```- [Derived](#derived)```js// bassically the same with `Let` but use `new Derived````

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="derived">Derived</h2>

- this class is extended from `Let` [`Let`](#let)-`signal` based reactivity, wich value are derived from reacting to [`Let<T>.value`](#let) effects that are called in the `asyncCallback` this class instantiation;```js// @ts-checkconst letSingle = new Let(1);const doubleExample = new Derived(async()=>{	const value = letSingle.value; // autoscubscribed to `letSingle` value changes;return value * 2; // returned value are to be derivedValue});```- `dataOnly`:```jsconst dataOnlyExample = Derived.dataOnly(asyncCallback);```> - this will automatically opt you out from `domReflector`;- make sure to check `argument` documentation in your `IDE` `typeHint`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="let">Let</h2>

`signal` based reactivity;assigning newValue to Let insance:```jsconst letSingle = new Let(1, ...args);letSingle.value++; // 2;letSingle.value = 3 // 3;````dataOnly`:```jsconst dataOnlyExample = Let.dataOnly(args0);```- `methods`:> - `call$`: manually triggers `effects` subscribed to `thisInstance`;> - `remove$`: unubscribe `thisInstance` from specific `effect`;> - `removeAll$`: unubscribe `thisInstance` from all of its `effects`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="list">List</h2>

- helper class to create list that satisfy`Array<Record<string, string>>````jsconst listExample = new List([     {key1: "test", ...keys},     {key1: "test3", ...keys},])```- usefull for `loops`;- instance method: 'push'|'unshift'|'slice'|'splice'|'swap'|'modify'|'shift', serves as helper to mutate, and notify for `signal` for `effects`:> - `slice` uses `splice` in the background, you don't need to manually reindex when using it;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="_">_</h2>

- auto `attributeName` assign for `signal` based reactifity stored in static Method of class `_`;- if you use our `Component` class, use this class static method, instead of their respective class, for generating `attributeName` to watch, which then you can use it's `attr` returned value to mark the element```js// on Component scopeonConnected(async()=>{	const data = _.l('test');	html`<div ${data.attr}="innerText"></div>`})```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="app">App</h2>

`App` starter helper for module environtment:- the sole purpose is just to auto import the necessary global file in your main js file;- if it's `elementScoped` `instances`/`statics methods`, it will be better to just leave it for the `parentModule` to import it accordingly;```js/** * @typedef {Object} constructorOptions * - for efficiency, only fill this options when you intent to use the library as sole `View` part of your stack; * - the inputed root component must manually fills attr option argument, to target root element on the real dom; * @property {(import("../lifecycle/Lifecycle.mjs").Lifecycle)[]} [options.lifecycles] * @property {(import("./For.mjs").For)[]} [options.forS] * @property {import('./DefineShortCuts.mjs').DefineShortCuts} [options.defineShortcuts] * @property {import('./DefineQRouter.mjs').DefineQRouter} [options.defineQRouter] * @property {import('./DefinePageTemplate.mjs').DefinePageTemplate} [options.definePageTemplate] * @property {number} [options.pingDebounce] * in ms; * @property {import('./DefineStorage.mjs').DefineStorage} [options.defineStorage] * @property {typeof helper["webComponentGlobalStyles"]} [options.webComponentGlobalStyles] * @property {import('./FSsrc.mjs')} [options.defineFSSourceMapper] * use custom encoding(eg. base64) to replace original file's source path; * usefull when using `web-app` as `View` stack for `desktop-app`, `mobile-app` or other bundle target, removing the need to setup http server to display the file on the `browser`; */```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="crud">CRUD</h2>

CRUD wrapper class;- `signal` will be updated from returned value of `read`;- `read` will be called after calling `thisInstance`.`create`/`update`/`delete_` that have `true` `updateRead`;
/**@template V

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="definepagetemplate">DefinePageTemplate</h2>

- instantiate this class to opt in page templating, by saving html template string on a html document page;- html implementation:```html// main page<div ${templateName}="${path};${templateName};${mode}"></div>// mode = 'inner' | 'outer'```- `templateName` of `head` & `body` are reserved for `document.body` and `document.body` of the template `document`, you can use it without adding `targetAttribute="head"` or `targetAttribute="body"` on the respective element;```html// template document<div ${targetAttribute}="${selector}"></div>```- how it works:> - the class itself register a `Lifecycle` for `templateName`,  which then upon connected, it will fetch the `path` then selects `targetAttribute`="`selector`" as template that then replace main page `innerHTML` with selected element `innerHTML` from template;> - fetched page will be then be cached, along with any `[targetAttribute]` on that page

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="defineqrouter">DefineQRouter</h2>

allow the usage of search query based router through class instantiation;- register by `App.constructorOptions.defineQRouter`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="defineshortcuts">DefineShortCuts</h2>

create shortcuts through class instantiation;- register by `App.constructorOptions.defineShortcuts`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="definestorage">DefineStorage</h2>

create named storage (`localStorage` or `sessionStorage`) through class instantiation;- register by putting import this instance on your js `main file`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="event_">Event_</h2>

use this instead of normal `eventListener` declaration for:- creating `autoqueued` `listener`;- `autoScope` `_` static methods, inside `Component` scope;```js// @ts-checksomeObject.addEventListener('click', Event_.listener( (event) => {// code}))```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="for">For</h2>

- assign element to loop through ['List'](#list) as data to render child element using class instantiation;- loped childElement:> - must have `HTMLElement` as first children;> - only first children will be used to loop through `List`, all other children will be deleted from the dom before `onConnected` event of parentElement;- use `ListInstance` `method` helpers to mutate the data;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="fssrc">FSsrc</h2>

- use custom encoding(eg. base64) to replace original file's source path;- usefull when using `web-app` as `View` stack for `desktop-app`, `mobile-app` or other bundle target, removing the need to setup http server to display the file on the `browser`;- register by `App.constructorOptions.defineFSSourceMapper`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="helper">helper</h2>

shared statics

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="shortcut">ShortCut</h2>

- helper class to create `ShortCut` through class instantiation;- call `thisInstance.ping` to manually trigger action

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="try_">Try_</h2>

error as value helper;method(s):- async;- sync;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="virst">virst</h2>

centralized virst object for lib making

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="webcomponent">WebComponent</h2>

- native web component creation helper;- you can add global css rules by inputing `urls` to `AppInstantiation` `arg0.globalStyles`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="workermainthread">WorkerMainThread</h2>

helper class for registering and postMessage to webWorker```jsconst worker = new WorkerMainThread(options);worker.postMessage(message);```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="workerthread">WorkerThread</h2>

helper class to define web worker thread;```jsnew WorkerThread({	onMessage: ({ event, postMessage }) => {		const message = undefined;		// code to handle the message		postMessage(message);	},});```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
