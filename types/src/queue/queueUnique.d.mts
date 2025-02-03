export class queueUnique {
    /**
     * @typedef {import('./queueUniqueObject.mjs').queueUniqueObject} queueUniqueObject
     */
    /**
     * @private
     * @param {queueUniqueObject} _queue
     */
    private static assign_;
    /**
     * @private
     * @type {Map<any, [()=>Promise<any>,number]>}
     */
    private static queue;
    /**
     * @private
     * @type {boolean}
     */
    private static isRunning;
    /**
     * @type {(queueUniqueObject:queueUniqueObject)=>void}
     */
    static assign: (queueUniqueObject: import("./queueUniqueObject.mjs").queueUniqueObject) => void;
    /**
     * @private
     * @param {queueUniqueObject} _queue
     */
    private static push;
    /** @private */
    private static run;
}
