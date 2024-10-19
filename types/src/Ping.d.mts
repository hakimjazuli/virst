/**
 * @description
 * trigger based callback integrated to the internal library  queue handler;
 * can be created using class instantiation;
 */
export class Ping {
    /**
     * @typedef {Object} autoScopeOptions
     * @property {()=>Promise<void>} scopedCallback
     * @property {boolean} runCheckAtFirst
     */
    /**
     * use for handling out of scoped codeblock:
     * @param {autoScopeOptions} options
     * @return {Ping["ping"]}
     */
    static autoScope: ({ scopedCallback, runCheckAtFirst }: {
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["ping"];
    /**
     * @param {boolean} callsAtFirst
     * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
     */
    constructor(callsAtFirst: boolean, asyncCallbackWhenPinged: (isAtInitisalization: boolean) => Promise<void>);
    /**
     * async callback when pinged
     * @private
     * @type {(isAtInitisalization:boolean)=>Promise<void>}
     */
    private asyncCallback;
    /**
     * @param {boolean} first
     */
    ping: (first?: boolean) => void;
}
