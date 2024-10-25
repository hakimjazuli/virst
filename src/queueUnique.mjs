// @ts-check

import { helper } from './helper.mjs';

export class queueUnique {
	/**
	 * @typedef {import('./queueUniqueObject.mjs').queueUniqueObject} queueUniqueObject
	 */
	/**
	 * @private
	 */
	constructor() {
		window['virst'] = window['virst'] || {};
		window['virst']['QUnique'] = window['virst']['QUnique'] || this.assign_;
	}
	/**
	 * @private
	 * @type {Map<any, [()=>Promise<any>,number]>}
	 */
	queue = new Map();
	/**
	 * @private
	 * @type {boolean}
	 */
	isRunning = false;
	/**
	 * @private
	 * @param {queueUniqueObject} _queue
	 */
	assign_ = (_queue) => {
		this.push(_queue);
		if (!this.isRunning) {
			this.run();
		}
	};
	/**
	 * @private
	 */
	// @ts-ignore
	static _ = new queueUnique();
	/**
	 * @type {(queueUniqueObject:queueUniqueObject)=>void}
	 */
	static assign = window['virst']['QUnique'];
	/**
	 * @private
	 * @param {queueUniqueObject} _queue
	 */
	push = (_queue) => {
		const { callback, debounce, id } = _queue;
		this.queue.set(id, [callback, debounce ? debounce : 0]);
	};
	/** @private */
	run = async () => {
		this.isRunning = true;
		const keysIterator = this.queue.keys();
		let result = keysIterator.next();
		while (!result.done) {
			const key = result.value;
			const [callback, debounce] = this.queue.get(key);
			this.queue.delete(key);
			/**
			 * debounce anyway;
			 * queue with unique id have characteristic of messing up when have no debouncer;
			 * especially when request comes too fast;
			 */
			await helper.timeout(debounce);
			await callback();
			result = keysIterator.next();
		}
		this.isRunning = false;
	};
}
