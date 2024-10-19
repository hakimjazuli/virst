// @ts-check

/**
 * @typedef {import('./onViewPort.mjs').onViewPort} onViewPortType
 * @typedef {Object} onViewPortHandler
 * @property {typeof import('./onViewPort.mjs').onViewPort.removeOnExitViewCallback} removeOnExitViewCallback
 * @property {typeof import('./onViewPort.mjs').onViewPort.removeOnViewCallback} removeOnViewCallback
 * @property {typeof import('./onViewPort.mjs').onViewPort.removeAllCallbacks} removeAllCallbacks
 * @property {typeof import('./onViewPort.mjs').onViewPort.unobserve} unobserve
 * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} onViewPortLifecycleHandler
 * @typedef {Object} elementsCallbacks
 * @property {HTMLElement} elementsCallbacks.element
 * @property {(onViewCallbacksOptions:onViewPortHandler)=>Promise<void>} elementsCallbacks.onViewCallback
 * @property {(onViewCallbacksOptions:onViewPortHandler)=>Promise<void>} elementsCallbacks.onExitViewCallback
 * @property {onViewPortLifecycleHandler["onDisconnected"][]} elementsCallbacks.lifecyclesOnDisconnected
 */
