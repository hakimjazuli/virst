// @ts-check

import { queueUniqueObject } from './queueUniqueObject.mjs';
import { helper } from './helper.mjs';

export class queueUnique {
	/**
	 * @private
	 */
	constructor() {}
	/**
	 * @private
	 * @type {queueUniqueObject|{}}
	 */
	queue = {};
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
	 * @param {queueUniqueObject} _queue
	 */
	static assign = new queueUnique().assign_;
	/**
	 * @private
	 * @param {queueUniqueObject} _queue
	 */
	push = (_queue) => {
		const { callback, debounce } = _queue;
		this.queue[_queue.id] = { callback, debounce };
	};
	/** @private */
	run = async () => {
		this.isRunning = true;
		while (Object.keys(this.queue).length !== 0) {
			for (const current_key in this.queue) {
				const { callback, debounce: debounce_ms } = this.queue[current_key];
				delete this.queue[current_key];
				if (debounce_ms) {
					await helper.timeout(debounce_ms);
				}
				if (helper.isAsync(callback)) {
					await callback();
					break;
				}
				callback();
				break;
			}
		}
		this.isRunning = false;
	};
}
