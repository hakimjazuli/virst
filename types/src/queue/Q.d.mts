/**
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
 */
/**
 * @description
 * helper methods for creating Promise to block execution code that return { resume } to allow subsequent calls to proceed;
 * ```js
 * const { resume } = await Q.fifo(); // or Q.unique(id)
 * // code
 *  resume(); // before return
 * ```
 */
export class Q {
    /**
     * @private
     */
    private static uniqueMap;
    /**
     * @type {Map<any, Promise<any>>}
     */
    static uniqueVirstQueue: Map<any, Promise<any>>;
    /**
     * @private
     * @type {Promise<void>}
     */
    private static fifo_;
    /**
     * Blocks execution for subsequent calls until the current one finishes.
     * @returns {Promise<{resume:()=>void}>} Resolves when it's safe to proceed, returning a cleanup function
     */
    static fifo: () => Promise<{
        resume: () => void;
    }>;
    /**
     * Ensures that each id has only one task running at a time.
     * Calls with the same id will wait for the previous call to finish.
     * @param {anyButUndefined} id
     * @returns {Promise<{resume:()=>void}>} Resolves when it's safe to proceed for the given id, returning a cleanup function
     */
    static unique: (id: anyButUndefined) => Promise<{
        resume: () => void;
    }>;
}
export type anyButUndefined = {} | null | number | string | boolean | symbol | bigint | Function;
