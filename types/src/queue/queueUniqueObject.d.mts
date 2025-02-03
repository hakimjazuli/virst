export class queueUniqueObject {
    /**
     * @param {any} id
     * @param {()=>(any|Promise<any>)} callback
     * @param {number} [debounce]
     * - in ms
     */
    constructor(id: any, callback: () => (any | Promise<any>), debounce?: number);
    /** @type {any} */
    id: any;
    /** @type {()=>(any|Promise<any>)} */
    callback: () => (any | Promise<any>);
    /** @type {number} */
    debounce: number;
}
