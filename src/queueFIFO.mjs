// @ts-check

import { helper } from './helper.mjs';

export class queueFIFO {
	/**
	 * @private
	 */
	constructor() {}
	/**
	 * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
	 */
	/**
	 * @private
	 * @type {queueObjectFIFO['details'][]}
	 */
	queue = [];
	/**
	 * @private
	 * @type {boolean}
	 */
	isRunning = false;
	/**
	 * @private
	 * @param {queueObjectFIFO} _queue
	 */
	assign_ = (_queue) => {
		this.push(_queue);
		if (!this.isRunning) {
			this.run();
		}
	};
	/**
	 * @param {queueObjectFIFO} _queue
	 */
	static assign = new queueFIFO().assign_;
	/**
	 * @private
	 * @param {queueObjectFIFO} _queue
	 */
	push = (_queue) => {
		this.queue.push(_queue.details);
	};
	/**
	 * @private
	 */
	run = async () => {
		this.isRunning = true;
		while (this.queue.length !== 0) {
			for (let i = 0; i < this.queue.length; i++) {
				const [callback, debounce_ms] = this.queue[i];
				this.queue.shift();
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
