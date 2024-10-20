export class queueFIFO {
    /**
     * @param {queueObjectFIFO} _queue
     */
    static assign: (_queue: import("./queueObjectFIFO.mjs").queueObjectFIFO) => void;
    /**
     * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
     */
    /**
     * @private
     * @type {queueObjectFIFO['details'][]}
     */
    private queue;
    /**
     * @private
     * @type {boolean}
     */
    private isRunning;
    /**
     * @private
     * @param {queueObjectFIFO} _queue
     */
    private assign_;
    /**
     * @private
     * @param {queueObjectFIFO} _queue
     */
    private push;
    /**
     * @private
     */
    private run;
}
