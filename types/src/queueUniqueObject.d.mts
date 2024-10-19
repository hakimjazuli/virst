export class queueUniqueObject {
    /**
     * @param {string} id
     * @param {()=>(any|Promise<any>)} callback
     * @param {number|false} [debounce]
     * - in ms
     */
    constructor(id: string, callback: () => (any | Promise<any>), debounce?: number | false);
    /** @type {string} */
    id: string;
    /** @type {()=>(any|Promise<any>)} */
    callback: () => (any | Promise<any>);
    /** @type {number|false} */
    debounce: number | false;
}
