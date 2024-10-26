// @ts-check

/**
 * @description
 * - `typehelper` for onViewPort
 */
/**
 * @typedef {import('./onViewPort.mjs').onViewPort} onViewPortType
 * @typedef {Object} onViewPortHandler
 * @property {()=>void} removeOnExitViewCallback
 * @property {()=>void} removeOnViewCallback
 * @property {()=>void} unobserveElement
 * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} onViewPortLifecycleHandler
 * @typedef {elementsLCCallbacks & { element: HTMLElement }} elementsCallbacks
 * @typedef {Object} elementsLCCallbacks
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 * @property {onViewPortLifecycleHandler["onDisconnected"][]} lifecyclesOnDisconnected
 */
