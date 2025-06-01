/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 * - instead of manually assigning whether `attributeName` should be `global` or not, `outOffScoped` `attributeName` will produce warning in the runtime;
 * > - you can ignore it, as the most local Lifecycle will take priority, and when there are no other scope, the most global will take place, the warning is only to notify that you can still optimize your code further by renaming the conflicting `attributeName` by abiding more to the semantics;
 */
export class Lifecycle {
    /**
     * @private
     * @type {Map<documentScope, {mutationObserver:MutationObserver,mutationRecordSignal:mutationRecordSignal, attr:Set<string>}>}
     */
    private static registeredDocumentScope;
    /**
     * @param {documentScope} documentScope
     * @param {string} attr
     * @returns {documentScopedReturn}
     */
    static createObserver: (documentScope: import("./documentScope.type.mjs").documentScope, attr: string) => {
        mutationObserver: MutationObserver;
        mutationRecordSignal: Let<MutationRecord[]>;
        attr: Set<string>;
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
     * attr:Set<string>
     * }} documentScopedReturn
     */
    /**
     * @param {Object} options
     * @param {attributeLifecyclesHandler} options.onConnected
     * @param {string} [options.attr]
     * - allow global attributeName to be handled inside nested `Lifecycle`
     * @param {documentScope} [options.documentScope]
     */
    constructor({ onConnected, attr, documentScope, }: {
        onConnected: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => void;
        attr?: string;
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
     * @param {documentScope} elementAdded
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
