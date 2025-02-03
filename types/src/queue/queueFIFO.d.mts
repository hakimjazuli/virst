export class queueFIFO {
    /**
     * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
     */
    /**
     * @private
     * @param {queueObjectFIFO} _queue
     */
    private static assign_;
    /**
     * @private
     * @type {queueObjectFIFO['details'][]}
     */
    private static queue;
    /**
     * @type {boolean}
     */
    static isRunning: boolean;
    /**
     * @param {(queueObjectFIFO:queueObjectFIFO)=>void} _queue
     */
    static assign: any;
    /**
     * @private
     * @param {queueObjectFIFO} _queue
     */
    private static push;
    /**
     * @private
     */
    private static run;
}
