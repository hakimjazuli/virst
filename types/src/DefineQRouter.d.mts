/**
 * @description
 * allow the usage of search query based router through class instantiation;
 * - register by putting import this instance on your js `main file`
 */
/**
 * Search-Query-Param Router
 * @template {{
 * [queryName:string]:
 * handlerType
 * }} queryValueType
 * @template {Extract<keyof queryValueType, string>} NamedQueryParam
 */
export class DefineQRouter<queryValueType extends {
    [queryName: string]: {
        value?: string;
        clearQueriesWhenImSet?: NamedQueryParam[];
        clearAllWhenImSetExcept?: NamedQueryParam[];
        onAfterResolved?: () => Promise<void>;
    };
}, NamedQueryParam extends Extract<keyof queryValueType, string>> {
    /**
     * @type {DefineQRouter}
     */
    static __: DefineQRouter<any, any>;
    /**
     * @private
     * @param {HTMLElement} element
     */
    private static smoothScroll;
    /**
     * @private
     * @type {'pop'|'push'}
     */
    private static historyStateMode;
    /**
     * @private
     * @type {Ping["fifo"]}
     */
    private static onAfterResolved;
    /**
     * @param {Object} options
     * @param {queryValueType} options.queries
     * @param {NamedQueryParam} [options.useAsNavigation]
     * @param {number} [options.queryChangeThrottleMs]
     */
    constructor({ queries, useAsNavigation, queryChangeThrottleMs }: {
        queries: queryValueType;
        useAsNavigation?: NamedQueryParam;
        queryChangeThrottleMs?: number;
    });
    /**
     * @returns {string}
     */
    currentURI: () => string;
    /**
     * @private
     * @type {Record<NamedQueryParam, DefineQRouter["handler"]>}
     */
    private handlers;
    /**
     * @private
     * @typedef {Object} handlerType
     * @property {string} [value]
     * @property {NamedQueryParam[]} [clearQueriesWhenImSet]
     * @property {NamedQueryParam[]} [clearAllWhenImSetExcept]
     * @property {()=>Promise<void>} [onAfterResolved]
     */
    private handler;
    /**
     * @private
     * @type {string}
     */
    private useAsNavigation;
    /**
     * @type {Record.<NamedQueryParam, Let<string>>}
     */
    routes: Record<NamedQueryParam, Let<string>>;
    /**
     * @param {Ping["fifo"]} ping
     */
    queryChangeThrottleMs: number;
    /**
     * @private
     * @param {NamedQueryParam} [useAsNavigation]
     */
    private useVirstURL;
    /**
     * @private
     */
    private redirectToIndex;
    /**
     * @private
     * @param {Ping["fifo"]} ping
     */
    private requestChanges;
    /**
     * @private
     */
    private pushPing;
    /**
     * @private
     */
    private registerPopStateEventListener;
    /**
     * @private
     */
    private popPing;
}
import { Let } from './Let.mjs';
