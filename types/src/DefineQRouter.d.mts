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
     */
    private static redirectToIndex;
    /**
     * @private
     * @type {'pop'|'push'}
     */
    private static historyStateMode;
    /**
     * @private
     * @type {Ping["ping"]}
     */
    private static onAfterResolved;
    /**
     * @param {Object} options
     * @param {queryValueType} options.queries
     * @param {NamedQueryParam} [options.useAsNavigation]
     * @param {(hrefValue:string)=>string} [options.navigationPathRule]
     * - modify path
     * @param {number} [options.queryChangeThrottleMs]
     */
    constructor({ queries, useAsNavigation, navigationPathRule, queryChangeThrottleMs, }: {
        queries: queryValueType;
        useAsNavigation?: NamedQueryParam;
        navigationPathRule?: (hrefValue: string) => string;
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
     * @type {Record.<NamedQueryParam, Let<string>>}
     */
    routes: Record<NamedQueryParam, Let<string>>;
    /**
     * @private
     * @param {Ping["ping"]} ping
     */
    private queryChangeThrottleMs;
    /**
     * @private
     * @param {NamedQueryParam} [useAsNavigation]
     * @param {(hrefValue:string)=>string} [navigationPathRule]
     */
    private useVirstURL;
    /**
     * @private
     * @type { null|number }
     */
    private timeoutId;
    /**
     * @private
     * @param {Ping["ping"]} ping
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
