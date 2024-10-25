export class queueObjectFIFO {
    /**
     * @param {()=>(any|Promise<any>)} callback
     * @param {number} [debounce]
     * - in ms
     */
    constructor(callback: () => (any | Promise<any>), debounce?: number);
    /**
     * details
     * @type {[callback:()=>(any|Promise<any>),debounce:(number)]}
     */
    details: [callback: () => (any | Promise<any>), debounce: (number)];
}
