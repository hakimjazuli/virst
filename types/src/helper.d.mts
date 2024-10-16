export class helper {
    /**
     * subscriber
     * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
     */
    static subscriber: null | ((isAtInitialization: boolean) => Promise<void>);
    static queueHandler: queueFIFO;
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
    static readonly storageIdentifier: "virst-st";
    static DCCBIdentifier: string;
    static ACCBIdentifier: string;
    static onViewCBIdentifier: string;
    static onExitViewCBIdentifier: string;
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
     * @type {import('./documentScope.type.mjs').documentScope}
     */
    static currentDocumentScope: import("./documentScope.type.mjs").documentScope;
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
}
import { queueFIFO } from './queueFIFO.mjs';
