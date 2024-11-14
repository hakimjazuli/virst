// @ts-check

/**
 * @description
 * type helper for `lifecycleHandler` & `attributeChangedLifecycle`
 */
/**
 * @typedef {(options:{attributeName:string, newValue:string})=>Promise<void>} attributeChangedLifecycle
 * @typedef {Object} lifecycleHandler
 * @property {boolean} lifecycleHandler.isConnected
 * @property {(options:Omit<import('./DefinePageTemplate.mjs').swapWithPageTemplateOptions, 'element'>)=>void} lifecycleHandler.swap
 * - swap element using DefinePageTemplateInstance swap method;
 * - use mode "inner"/"outer" carefully;
 * @property {HTMLElement} lifecycleHandler.element
 * @property {(strings:TemplateStringsArray,...values:string[])=>void} lifecycleHandler.html
 * - use to modify the innerHTML of the `LifeCycleInstance` element;
 * @property {import('./Lifecycle.mjs').Lifecycle} lifecycleHandler.lifecycleObserver
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onDisconnected
 * @property {(arg0:attributeChangedLifecycle)=>void} lifecycleHandler.onAttributeChanged
 * @property {(elementsCallbacks:import('./onViewPortHandler.type.mjs').elementsLCCallbacks)=>import('./onViewPort.mjs').onViewPort} lifecycleHandler.onViewPort
 */
