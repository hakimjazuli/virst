// @ts-check

/**
 * @description
 * type helper for `lifecycleHandler` & `attributeChangedLifecycle`
 */
/**
 * @typedef {(options:{attributeName:string, newValue:string})=>Promise<void>} attributeChangedLifecycle
 * @typedef {Object} lifecycleHandler
 * @property {HTMLElement} lifecycleHandler.element
 * @property {()=>HTMLElement} lifecycleHandler.cloneElement
 * @property {import('./Lifecycle.mjs').Lifecycle} lifecycleHandler.lifecycleObserver
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onConnected
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onDisconnected
 * @property {(arg0:attributeChangedLifecycle)=>void} lifecycleHandler.onAttributeChanged
 * @property {(elementsCallbacks:import('./onViewPortHandler.type.mjs').elementsCallbacks)=>import('./onViewPort.mjs').onViewPort} lifecycleHandler.onViewPort
 */
