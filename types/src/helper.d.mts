export class helper {
    /**
     * subscriber
     * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
     */
    static subscriber: null | ((isAtInitialization: boolean) => Promise<void>);
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
    static docScopeElement: string;
    static storageIdentifier: string;
    static LCCBIdentifier: string;
    static DCCBIdentifier: string;
    static ACCBIdentifier: string;
    static onViewCBIdentifier: string;
    static onExitViewCBIdentifier: string;
    /**
     * @param {HTMLElement|Element} element
     * @returns {HTMLElement}
     */
    static cloneNode: (element: HTMLElement | Element) => HTMLElement;
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
