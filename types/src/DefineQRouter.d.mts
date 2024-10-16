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
 * }} dataValueType
 * @template {Extract<keyof dataValueType, string>} NamedQueryParam
 */
export class DefineQRouter<dataValueType extends {
    [queryName: string]: {
        value?: string;
        clearQueriesWhenImSet?: NamedQueryParam[];
        clearAllWhenImSetExcept?: NamedQueryParam[];
        onAfterResolved?: () => Promise<void>;
    };
}, NamedQueryParam extends Extract<keyof dataValueType, string>> {
    /**
     * @type {DefineQRouter}
     */
    static __: DefineQRouter<any, any>;
    /**
     * @private
     */
    private static useVirstURL;
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
     * @param {dataValueType} options.data
     * @param {number} [options.queryChangeThrottleMs]
     */
    constructor({ data, queryChangeThrottleMs }: {
        data: dataValueType;
        queryChangeThrottleMs?: number;
    });
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
    qRoute: Record<NamedQueryParam, Let<string>>;
    /**
     * @private
     * @param {Ping["ping"]} ping
     */
    private queryChangeThrottleMs;
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
