// @ts-check

import { helper } from '../utils/helper.export.mjs';
import { virst } from '../utils/virst.export.mjs';

export class queueUnique {
	/**
	 * @typedef {import('./queueUniqueObject.mjs').queueUniqueObject} queueUniqueObject
	 */
	/**
	 * @private
	 * @param {queueUniqueObject} _queue
	 */
	static assign_ = (_queue) => {
		this.push(_queue);
		if (!this.isRunning) {
			this.run();
		}
	};
	static {
		virst['QUnique'] = virst['QUnique'] ?? queueUnique.assign_;
	}
	/**
	 * @private
	 * @type {Map<any, [()=>Promise<any>,number]>}
	 */
	static queue = new Map();
	/**
	 * @private
	 * @type {boolean}
	 */
	static isRunning = false;
	/**
	 * @type {(queueUniqueObject:queueUniqueObject)=>void}
	 */
	static assign = virst['QUnique'];
	/**
	 * @private
	 * @param {queueUniqueObject} _queue
	 */
	static push = (_queue) => {
		const { callback, debounce, id } = _queue;
		this.queue.set(id, [callback, debounce ? debounce : 0]);
	};
	/** @private */
	static run = async () => {
		this.isRunning = true;
		const keysIterator = this.queue.keys();
		let keys = keysIterator.next();
		while (!keys.done) {
			const key = keys.value;
			const [callback, debounce] = this.queue.get(key);
			this.queue.delete(key);
			/**
			 * debounce anyway;
			 * queue with unique id have characteristic of messing up when have no debouncer;
			 * especially when request comes too fast;
			 */
			await helper.timeout(debounce);
			await callback();
			keys = keysIterator.next();
		}
		this.isRunning = false;
	};
}
