export class helper {
    /**
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     */
    /**
     * subscriber
     * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
     */
    static subscriber: null | ((isAtInitialization: boolean) => Promise<void>);
    static assignToQFIFO: (_queue: import("./queueObjectFIFO.mjs").queueObjectFIFO) => void;
    static assignToQUnique: (_queue: import("./queueUniqueObject.mjs").queueUniqueObject) => void;
    /**
     * @type {number|false}
     */
    static debounce: number | false;
    /**
     * @readonly
     */
    static readonly val: "virst-a-val";
    /**
     * @readonly
     */
    static readonly qRouteChange: "virst-qrc";
    /**
     * @param {string} path
     * @returns {Promise<Document>}
     */
    static getDocument: (path: string) => Promise<Document>;
    /**
     * @private
     * @type {Record<string, Document>}
     */
    private static cachedDocument;
    /**
     * @readonly
     */
    static readonly storageIdentifier: "virst-st";
    static LCCBIdentifier: string;
    static DCCBIdentifier: string;
    static ACCBIdentifier: string;
    static onViewCBIdentifier: string;
    static onExitViewCBIdentifier: string;
    /**
     * @readonly
     */
    static readonly ForQPrefix: "virst-fq-";
    /**
     * @readonly
     */
    static readonly ForChildAttributePrefix: "virst-fc-";
    /**
     * @param {Object} class_
     */
    static warningSingleton: (class_: any) => void;
    /**
     * @private
     */
    private static generateUniqueString;
    /**
     * @type {string|null}
     */
    static attr: string | null;
    /**
     * using setter and getter, to avoid error when used in non clientBrowser runtime;
     * @private
     * @type {import('./documentScope.type.mjs').documentScope}
     */
    private static currentDocumentScope_;
    static set currentDocumentScope(newScope: import("./documentScope.type.mjs").documentScope);
    static get currentDocumentScope(): import("./documentScope.type.mjs").documentScope;
    /**
     * @private
     * @type {string}
     */
    private static attrPrefix;
    /**
     * @return {string|null}
     */
    static attributeIndexGenerator: () => string | null;
    /**
     * @param {number} ms
     */
    static timeout: (ms: number) => Promise<any>;
    /**
     * is_async
     * @param {CallableFunction} callback
     */
    static isAsync: (callback: CallableFunction) => boolean;
    /**
     * split with escape string `\`
     * @param {string} string
     * @param {string} delimiter
     */
    static splitX: (string: string, delimiter: string) => string[];
    static separator: string;
    /**
     * @param {string} attributeName
     * @returns {string}
     */
    static validAttributeNameSelector: (attributeName: string) => string;
    /**
     * @param {((...args:any)=>Promise<any>)[]} asyncArrayFunctions
     * @param {any[]} args
     */
    static handlePromiseAll: (asyncArrayFunctions: ((...args: any) => Promise<any>)[], ...args: any[]) => Promise<void>;
    /**
     * @param {Object} options
     * @param {documentScope} options.documentScope
     * @param {()=>Promise<void>} options.scopedCallback
     */
    static tempScoped: ({ documentScope, scopedCallback: asyncCallback }: {
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
    static manualScope: ({ documentScope, scopedCallback, runCheckAtFirst }: {
        documentScope: import("./documentScope.type.mjs").documentScope;
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["ping"];
}
import { Ping } from './Ping.mjs';
