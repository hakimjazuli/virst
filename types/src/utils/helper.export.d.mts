/**
 * @description
 * shared statics
 */
export class helper {
    /**
     * @type {string[]}
     */
    static webComponentGlobalStyles: string[];
    /**
     * @param {TemplateStringsArray} strings
     * @param  {...string} values
     * @returns {string}
     */
    static literal: (strings: TemplateStringsArray, ...values: string[]) => string;
    /**
     * @type {number}
     */
    static debounce: number;
    /**
     * @readonly
     */
    static readonly removeDOM$: "virst-rm-dom$";
    /**
     * @readonly
     */
    static readonly val: "virst-a-val";
    /**
     * @readonly
     */
    static readonly qRouteChange: "virst-qrc";
    static docScopeElement: string;
    static storageIdentifier: string;
    static DCCBIdentifier: string;
    static ACCBIdentifier: string;
    static onViewCBIdentifier: string;
    static onExitViewCBIdentifier: string;
    static templatePrefix: string;
    static keptElement: string;
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
     * @type {import('../lifecycle/documentScope.type.mjs').documentScope}
     */
    private static currentDocumentScope_;
    static set currentDocumentScope(newScope: import("../lifecycle/documentScope.type.mjs").documentScope);
    static get currentDocumentScope(): import("../lifecycle/documentScope.type.mjs").documentScope;
    /**
     * @private
     * @type {string}
     */
    private static attrPrefix;
    /**
     * @param {boolean} [forced]
     * @return {string|null}
     */
    static attributeIndexGenerator: (forced?: boolean) => string | null;
    /**
     * @param {number} ms
     */
    static timeout: (ms: number) => Promise<any>;
    /**
     * split with escape string `\`
     * @param {string} string
     * @param {string} delimiter
     */
    static splitX: (string: string, delimiter: string) => string[];
    static separator: string;
    /**
     * @param {(...any:any)=>(any|Promise<any>)} fn
     * @returns {boolean}
     */
    static isAsync: (fn: (...any: any) => (any | Promise<any>)) => boolean;
    /**
     * @param {string} attributeName
     * @returns {string}
     */
    static validAttributeNameSelector: (attributeName: string) => string;
    /**
     * @param {Object} source
     * @param {((...args:any)=>Promise<any>)[]} asyncArrayFunctions
     * @param {any[]} args
     */
    static handlePromiseAll: (source: any, asyncArrayFunctions: ((...args: any) => Promise<any>)[], ...args: any[]) => Promise<void>;
}
