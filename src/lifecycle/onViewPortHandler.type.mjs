// @ts-check

/**
 * @description
 * - `typehelper` for onViewPort
 */
/**
 * @typedef {()=>Promise<void>} onExitViewPortArg0
 * @typedef {Object} onViewCallbackOptions
 * @property {(arg0:()=>Promise<void>)=>void} onExitViewPort
 * @property {()=>void} unobserveElement
 * @property {()=>void} removeOnViewCallback
 * @property {()=>void} removeOnExitCallback
 * @typedef {Object} onViewPortHandler
 * @property {HTMLElement} element
 * @property {string} attr
 * @property {(onSightCallbackOptions:onViewCallbackOptions)=>Promise<void>} onViewPort
 * @property {Array<(arg0:()=>Promise<void>)=>void>} lifecyclesOnDisconnected
 */
