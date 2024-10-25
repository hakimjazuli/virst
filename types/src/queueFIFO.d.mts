export class queueFIFO {
    /**
     * @private
     */
    private static _;
    /**
     * @param {(queueObjectFIFO:queueObjectFIFO)=>void} _queue
     */
    static assign: any;
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
