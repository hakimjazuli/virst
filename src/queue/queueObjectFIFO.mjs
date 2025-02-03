// @ts-check

export class queueObjectFIFO {
	/**
	 * details
	 * @type {[callback:()=>(any|Promise<any>),debounce:(number)]}
	 */
	details;
	/**
	 * @param {()=>(any|Promise<any>)} callback
	 * @param {number} [debounce]
	 * - in ms
	 */
	constructor(callback, debounce = 0) {
		this.details = [callback, debounce];
	}
}
