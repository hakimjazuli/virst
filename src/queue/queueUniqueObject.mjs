// @ts-check

export class queueUniqueObject {
	/**
	 * @param {any} id
	 * @param {()=>(any|Promise<any>)} callback
	 * @param {number} [debounce]
	 * - in ms
	 */
	constructor(id, callback, debounce = 0) {
		this.id = id;
		this.callback = callback;
		this.debounce = debounce;
	}
	/** @type {any} */
	id;
	/** @type {()=>(any|Promise<any>)} */
	callback;
	/** @type {number} */
	debounce;
}
