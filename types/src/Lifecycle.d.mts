/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 */
export class Lifecycle {
    /**
     * @typedef {Object} autoScopeOptions
     * @property {()=>Promise<void>} scopedCallback
     * @property {boolean} runCheckAtFirst
     */
    /**
     * use for handling out of scoped codeblock:
     * @param {autoScopeOptions} options
     * @return {Ping["ping"]}
     */
    static autoScopedPing: ({ scopedCallback, runCheckAtFirst }: {
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["ping"];
    /**
     * @param {Object} options
     * @param {documentScope} options.documentScope
     * @param {()=>Promise<void>} options.scopedCallback
     */
    static shallowScope: ({ documentScope, scopedCallback: asyncCallback }: {
        documentScope: import("./documentScope.type.mjs").documentScope;
        scopedCallback: () => Promise<void>;
    }) => Promise<void>;
    /**
     * @typedef {Object} manualScopeOptions
     * @property {import('./documentScope.type.mjs').documentScope} documentScope
     * @property {()=>Promise<void>} scopedCallback
     * @property {boolean} runCheckAtFirst
     */
    /**
     * manual scoping for lib internal functionality
     * @param {manualScopeOptions} options
     * @returns {Ping["ping"]}
     */
    static scopedPing: ({ documentScope, scopedCallback, runCheckAtFirst }: {
        documentScope: import("./documentScope.type.mjs").documentScope;
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["ping"];
    /**
     * @private
     * @param {HTMLElement} element
     * @param {()=>Promise<void>} scopedCallback
     */
    private static onParentDCWrapper;
    /**
     * @private
     * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private static currentOnParentDCCB;
    /**
     * @typedef {{
     * [attributeName:string]:
     * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void
     * }} attributeLifecyclesHandler
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     */
    /**
     * attributeIdentification
     * @private
     * @type {Map<documentScope,attributeLifecyclesHandler>}
     */
    private static ID;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {()=>Promise<void>} disconnectedCallback
     * @returns {void}
     */
    private static setDCCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @returns {void|(()=>Promise<void>)[]}
     */
    private static getDCCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
     * @returns {void}
     */
    private static setACCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @returns {void|import('./lifecycleHandler.type.mjs').attributeChangedLifecycle}
     */
    private static getACCB;
    /**
     * @private
     * @param {HTMLElement|Element} node
     * @param {(Node)[]} found
     * @returns {(Node)[]}
     */
    private static findDeepNested;
    /**
     * @param {boolean} isGlobal
     * @param {attributeLifecyclesHandler} attributeLifecyclesHandler
     * - allow global attributeName to be handled inside nested `Lifecycle`
     * @param {documentScope} [manualScope]
     */
    constructor(isGlobal: boolean, attributeLifecyclesHandler: {
        [attributeName: string]: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => void;
    }, manualScope?: import("./documentScope.type.mjs").documentScope);
    /**
     * @private
     * @type {documentScope}
     */
    private currentDocumentScope;
    disconnect: () => void;
    /**
     * @type {() => MutationRecord[]}
     */
    takeRecords: () => MutationRecord[];
    /**
     * @private
     * @type {import('./Let.mjs').Let<MutationRecord[]>}
     */
    private mutationSignal;
    /**
     * @private
     * @type {MutationObserver}
     */
    private mutationObserver;
    /**
     * @private
     * @type {$}
     */
    private effect;
    /**
     * @private
     * @type {attributeLifecyclesHandler}
     */
    private attributeLifecyclesHandler;
    /**
     * @private
     * @type {boolean}
     */
    private isGlobal;
    /**
     * @private
     * @return {"partial"|"whole"|string}
     */
    private isRegisteredMap;
    /**
     * @private
     * @returns {Promise<void>}
     */
    private initiator;
    /**
     * @private
     * @type {(()=>Promise<void>)[]}
     */
    private elementCMRefed;
    /**
     * @private
     * @param {documentScope} node
     * @returns {boolean}
     */
    private checkValidScoping;
    /**
     * @private
     * @param {Node} addedNode
     * @param {string} attributeName
     */
    private addedNodeHandler;
    /**
     * @private
     */
    private callConnectedCallback;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @param {string} attributeName
     */
    private callACCB;
    /**
     * @private
     * @param {MutationRecord[]} mutationList
     */
    private mutationHandler;
    /**
     * @private
     * @param {HTMLElement}removedNode
     */
    private mutationDCHandler;
}
import { Ping } from './Ping.mjs';
