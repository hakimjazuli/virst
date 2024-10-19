// @ts-check

import { queueUniqueObject } from './queueUniqueObject.mjs';
import { helper } from './helper.mjs';

export class queueUnique {
	/**
	 * @private
	 * @type {queueUniqueObject|{}}
	 */
	queue = {};
	/**
	 * @private
	 * @type {boolean}
	 */
	is_running = false;
	/**
	 * @public
	 * @param {queueUniqueObject} _queue
	 */
	assign = (_queue) => {
		this.push(_queue);
		if (!this.is_running) {
			this.run();
		}
	};
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
		this.is_running = true;
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
		this.is_running = false;
	};
}
