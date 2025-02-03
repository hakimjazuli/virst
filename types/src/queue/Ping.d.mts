/**
 * @description
 * trigger based callback integrated to the internal library  queue handler;
 * can be created using class instantiation;
 */
export class Ping {
    static get isRunning(): boolean;
    /**
     * @param {boolean} callsAtFirst
     * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
     * @param {{fifo:true}|{unique:any}} [mode]
     */
    constructor(callsAtFirst: boolean, asyncCallbackWhenPinged: (isAtInitisalization: boolean) => Promise<void>, mode?: {
        fifo: true;
    } | {
        unique: any;
    });
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
