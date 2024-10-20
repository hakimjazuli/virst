export class queueUnique {
    /**
     * @param {queueUniqueObject} _queue
     */
    static assign: (_queue: queueUniqueObject) => void;
    /**
     * @private
     * @type {queueUniqueObject|{}}
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
import { queueUniqueObject } from './queueUniqueObject.mjs';
