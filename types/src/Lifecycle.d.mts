/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 * - if there are global `attributeName` `test` are inside nested `Lifecycle`, add `virst-gs` and list of the names of the global `attributeName`, with semicolon `;` as separator;
 * ```html
 * <div test="innerText" virst-gs="test;"></div>
 * ```
 */
export class Lifecycle {
    /**
     * @private
     * @type {documentScopedReturn[]}
     */
    private static registeredDocumentScope;
    /**
     * @param {documentScope} documentScope
     * @return {documentScopedReturn}
     */
    static createMutationObserver: (documentScope: import("./documentScope.type.mjs").documentScope) => [MutationObserver, Let<MutationRecord[]>, import("./documentScope.type.mjs").documentScope];
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
     * @returns {Ping["fifo"]}
     */
    static scopedPing: ({ documentScope, scopedCallback, runCheckAtFirst }: {
        documentScope: import("./documentScope.type.mjs").documentScope;
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["fifo"];
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
     * @typedef {(options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void} attributeLifecyclesHandler
     */
    /**
     * attributeIdentification
     * @private
     * @type {Map<documentScope,{[attributeName:string]:attributeLifecyclesHandler}>}
     */
    private static ID;
    /**
     * @private
     * @type {Map<documentScope, string[]>}
     */
    private static bypassNest;
    /**
     * @param {HTMLElement} element
     * @param {TemplateStringsArray} strings
     * @param  {...string} values
     */
    static html: (element: HTMLElement, strings: TemplateStringsArray, ...values: string[]) => void;
    /**
     * @private
     * @param {HTMLElement} documentScope
     * @param {()=>Promise<any>} scopedCallback
     */
    private static addedNodeScoper;
    /**
     * @private
     * @type {Map<HTMLElement, true>}
     */
    private static registeredLCCB;
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
     * @param {Object} options
     * @param {attributeLifecyclesHandler} options.onConnected
     * @param {string} [options.attributeName]
     * - allow global attributeName to be handled inside nested `Lifecycle`
     * @param {documentScope} [options.documentScope]
     * @param {boolean} [options.bypassNested]
     */
    constructor({ onConnected, attributeName, documentScope, bypassNested, }: {
        onConnected: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => void;
        attributeName?: string;
        documentScope?: import("./documentScope.type.mjs").documentScope;
        bypassNested?: boolean;
    });
    /**
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     * @typedef {import('./Let.mjs').Let<MutationRecord[]>} mutationRecordSignal
     * @typedef {[MutationObserver,
     * mutationRecordSignal,
     * documentScope,
     * ]} documentScopedReturn
     */
    /**
     * @type {string}
     */
    attr: string;
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
    private onConnected;
    /**
     * @private
     */
    private assignBypass;
    /**
     * @private
     * @return {"addToScope"|"newScope"|string}
     */
    private isScopeMapped;
    /**
     * @private
     * @returns {Promise<void>}
     */
    private initiator;
    /**
     * @private
     * @param {documentScope} node
     * @param {string} attributeName
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
     * @param {HTMLElement|Element} element
     * @param {string} attributeName
     */
    private callACCB;
    /**
     * @private
     * @param {documentScope} documentScope
     * @param {string} attributeName
     */
    private checkNestedAddedNodes;
    /**
     * @private
     * @param {MutationRecord[]} mutationList
     */
    private mutationHandler;
    /**
     * @private
     * @param {HTMLElement} element
     */
    private removeParentOfNestedLCDCCB;
    /**
     * @private
     * @param {HTMLElement}removedNode
     */
    private mutationDCHandler;
}
import { Let } from './Let.mjs';
import { Ping } from './Ping.mjs';
