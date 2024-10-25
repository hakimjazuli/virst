/**
 * @description
 * trigger based callback integrated to the internal library  queue handler;
 * can be created using class instantiation;
 */
export class Ping {
    /**
     * @param {boolean} callsAtFirst
     * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
     * @param {'fifo'|'unique'} [mode]
     * @param {any} [uniqueID]
     */
    constructor(callsAtFirst: boolean, asyncCallbackWhenPinged: (isAtInitisalization: boolean) => Promise<void>, mode?: "fifo" | "unique", uniqueID?: any);
    /**
     * async callback when pinged
     * @private
     * @type {(isAtInitisalization:boolean)=>Promise<void>}
     */
    private asyncCallback;
    /**
     * @param {boolean} first
     */
    fifo: (first?: boolean) => void;
    /**
     * @param {any} uniqueID
     * @param {boolean} first
     */
    unique: (uniqueID: any, first?: boolean) => void;
}
