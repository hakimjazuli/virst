## about virst
virst is:
- new repo/library based on `@html_first/simple_signal`;
> - which itself are inspired by `solidJS` `signal` based `reactivity`
- collections of library for creating:
> - `reactive`(and if necessary, `declarative`) `SPA web app`, including functionalities such as:
> > - client side `routing` (using query parameter with our `DefineQRouter`);
> > - `signal` based asyncrhonous reactivity, which supports:
> > > - `dataOnly`;
> > > - with `domReflect` (using `attributeName="...attributeValues;"`);
> > - optional templating using:
> > > - `html` page based template;
> > > - our `Component` instances;
> - client side JS library that are relying on `attributeName` to track the element lifecycle, using our `Lifecyle` class api:
> > - you can use it to create your own `HATEOAS` (like `htmx`) client side library, to interprete returned `htmlString` which have certain `attributeName`;
> > - handle non editable `static site generated` exports/publish such as:
> > > - `bootstrap studio`;
> > > - `pinegrow`;
> > > - `WYSIWYG web builder`;
> > > - or bassically any kind of `SSG` software;
> - comes with `asyncQueue` handler in the background;
> > - no need to scratch your head too much for `async` processes;
## about this readme
- this `repo`/`lib` only serves for `api-documentation` purposes;
- as for `example` on how to use on different `useCase` refer to [html-first-virst](https://html-first.bss.design/index.html?page=virst)


<h2 id="exported-api-and-type-list">exported-api-and-type-list</h2>

- [$](#$)

- [Animation](#animation)

- [App](#app)

- [Component](#component)

- [CRUD](#crud)

- [DefinePageTemplate](#definepagetemplate)

- [DefineQRouter](#defineqrouter)

- [DefineShortCuts](#defineshortcuts)

- [DefineStorage](#definestorage)

- [Derived](#derived)

- [documentScope](#documentscope)

- [Event_](#event_)

- [For](#for)

- [Let](#let)

- [Lifecycle](#lifecycle)

- [lifecycleHandler](#lifecyclehandler)

- [List](#list)

- [OnViewPort](#onviewport)

- [onViewPortHandler](#onviewporthandler)

- [Ping](#ping)

- [ShortCut](#shortcut)

- [WorkerMainThread](#workermainthread)

- [WorkerThread](#workerthread)

- [_](#_)

<h2 id="$">$</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

generate side effect for `signal` based reactivity such as for:

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="animation">Animation</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

collections of static methods helper for animation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="app">App</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`App` starter helper for module environtment;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="component">Component</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

component creation helper using class initiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="crud">CRUD</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

CRUD wrapper class;
/**

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="definepagetemplate">DefinePageTemplate</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- instantiate this class to opt in page templating,

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="defineqrouter">DefineQRouter</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

allow the usage of search query based router through class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="defineshortcuts">DefineShortCuts</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

create shortcuts through class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="definestorage">DefineStorage</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

create named storage (`localStorage` or `sessionStorage`) through class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="derived">Derived</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- this class is extended from `Let` [`Let`](#let)

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="documentscope">documentScope</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `documentScope`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="event_">Event_</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

use this instead of normal `eventListener` declaration for:

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="for">For</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- assign element to loop through ['List'](#list) as data to render child element using class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="let">Let</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`signal` based reactivity;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="lifecycle">Lifecycle</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to track connected/disconnected/attributeChanged of an element;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="lifecyclehandler">lifecycleHandler</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `lifecycleHandler` & `attributeChangedLifecycle`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="list">List</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to create list that satisfy

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="onviewport">OnViewPort</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

lifecycle wrapper to observe whether element is in viewport

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="onviewporthandler">onViewPortHandler</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `onViewPortHandler`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="ping">Ping</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

trigger based callback integrated to the internal library  queue handler;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="shortcut">ShortCut</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to create `ShortCut` through class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="workermainthread">WorkerMainThread</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

helper class for registering and postMessage to webWorker

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="workerthread">WorkerThread</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

helper class to define web worker thread;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_">_</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- scoping helper for `signal` based reactifity stored in static Method of class `_`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>