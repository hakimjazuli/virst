export class queueUnique {
    /**
     * @private
     */
    private static _;
    /**
     * @type {(queueUniqueObject:queueUniqueObject)=>void}
     */
    static assign: (queueUniqueObject: import("./queueUniqueObject.mjs").queueUniqueObject) => void;
    /**
     * @private
     * @type {Map<any, [()=>Promise<any>,number]>}
     */
    private queue;
    /**
     * @private
     * @type {boolean}
     */
    private isRunning;
    /**
     * @private
     * @param {queueUniqueObject} _queue
     */
    private assign_;
    /**
     * @private
     * @param {queueUniqueObject} _queue
     */
    private push;
    /** @private */
    private run;
}
