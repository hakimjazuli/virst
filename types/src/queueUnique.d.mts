export class queueUnique {
    /**
     * @private
     * @type {queueUniqueObject|{}}
     */
    private queue;
    /**
     * @private
     * @type {boolean}
     */
    private is_running;
    /**
     * @public
     * @param {queueUniqueObject} _queue
     */
    public assign: (_queue: queueUniqueObject) => void;
    /**
     * @private
     * @param {queueUniqueObject} _queue
     */
    private push;
    /** @private */
    private run;
}
import { queueUniqueObject } from './queueUniqueObject.mjs';
