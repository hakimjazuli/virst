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
     * @type {Map<documentScope, {mutationObserver:MutationObserver,mutationRecordSignal:mutationRecordSignal, attributeNames:Set<string>}>}
     */
    private static registeredDocumentScope;
    /**
     * @param {documentScope} documentScope
     * @param {string} attributeName
     * @returns {documentScopedReturn}
     */
    static createObserver: (documentScope: import("./documentScope.type.mjs").documentScope, attributeName: string) => {
        mutationObserver: MutationObserver;
        mutationRecordSignal: Let<MutationRecord[]>;
        attributeNames: Set<string>;
    };
    /**
     * @param {Object} options
     * @param {documentScope} options.documentScope
     * @param {()=>Promise<void>} options.scopedCallback
     * @returns {Promise<void>}
     */
    static shallowScope: ({ documentScope, scopedCallback }: {
        documentScope: import("./documentScope.type.mjs").documentScope;
        scopedCallback: () => Promise<void>;
    }) => Promise<void>;
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
     * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private static currentOnParentDCCB;
    /**
     * attributeIdentification
     * @private
     * @type {Map<documentScope, Map<string, attributeLifecyclesHandler>>}
     */
    private static ID;
    /**
     * @private
     * @param {documentScope} documentScope
     * @param {HTMLElement} element
     * @param {string} attributeName
     * @param {()=>Promise<any>} scopedCallback
     * @returns {void}
     */
    private static addedNodeScoper;
    /**
     * @private
     * @param {documentScope} documentScope
     * @param {HTMLElement} element
     * @param {string} attributeName
     * @param {()=>Promise<void>} disconnectedCallback
     * @returns {Promise<void>}
     */
    private static setDCCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @returns {void|Map<string, Map<documentScope, Set<()=>Promise<void>>>>}
     */
    private static getDCCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @param {string} attributeName
     * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
     * @returns {void}
     */
    private static setACCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @returns {void|Map<string, Set<import('./lifecycleHandler.type.mjs').attributeChangedLifecycle>>}
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
     * @typedef {Object} manualScopeOptions
     * @property {import('./documentScope.type.mjs').documentScope} documentScope
     * @property {()=>Promise<void>} scopedCallback
     * @property {boolean} runCheckAtFirst
     * @typedef {(options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void} attributeLifecyclesHandler
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     * @typedef {import('../signals/Let.mjs').Let<MutationRecord[]>} mutationRecordSignal
     * @typedef {{mutationObserver:MutationObserver,
     * mutationRecordSignal:mutationRecordSignal,
     * attributeNames:Set<string>
     * }} documentScopedReturn
     */
    /**
     * @param {Object} options
     * @param {attributeLifecyclesHandler} options.onConnected
     * @param {string} [options.attributeName]
     * - allow global attributeName to be handled inside nested `Lifecycle`
     * @param {documentScope} [options.documentScope]
     */
    constructor({ onConnected, attributeName, documentScope, }: {
        onConnected: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => void;
        attributeName?: string;
        documentScope?: import("./documentScope.type.mjs").documentScope;
    });
    /**
     * @type {string}
     */
    attr: string;
    /**
     * @private
     * @type {attributeLifecyclesHandler}
     */
    private onConnected;
    /**
     * @private
     * @type {documentScope}
     */
    private currentDocumentScope;
    /**
     * @private
     * @type {MutationObserver}
     */
    private mutationObserver;
    /**
     * @private
     * @type {import('../signals/Let.mjs').Let<MutationRecord[]>}
     */
    private mutationSignal;
    /**
     * @type {() => MutationRecord[]}
     */
    takeRecords: () => MutationRecord[];
    /**
     * @private
     * @type {$}
     */
    private effect;
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
     * @returns {void}
     */
    disconnect: () => void;
    /**
     * @private
     * @param {string} attributeName
     * @param {documentScope} element
     * @param {documentScope} documentScope
     */
    private checkValidScoping;
    /**
     * @private
     * @param {documentScope} addedNode
     * @param {string} attributeName
     * @param {boolean} checkChild
     * @returns {Promise<void>}
     */
    private addedNodeHandler;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @param {string} attributeName
     * @returns {void}
     */
    private callACCB;
    /**
     * @private
     * @param {MutationRecord[]} mutationList
     * @returns {Promise<void>}
     */
    private mutationHandler;
    /**
     * @private
     * @param {HTMLElement} element
     * @returns {void}
     */
    private removeParentOfNestedLCDCCB;
    /**
     * @private
     * @param {HTMLElement}removedNode
     * @returns {Promise<void>}
     */
    private mutationDCHandler;
}
import { Let } from '../signals/Let.mjs';
import { Ping } from '../queue/Ping.mjs';
