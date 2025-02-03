// @ts-check

import { virst } from '../utils/virst.export.mjs';
import { helper } from '../utils/helper.export.mjs';

export class queueFIFO {
	/**
	 * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
	 */
	/**
	 * @private
	 * @param {queueObjectFIFO} _queue
	 */
	static assign_ = (_queue) => {
		this.push(_queue);
		if (!queueFIFO.isRunning) {
			this.run();
		}
	};
	static {
		virst['QFIFO'] = virst['QFIFO'] ?? queueFIFO.assign_;
	}
	/**
	 * @private
	 */
	constructor() {}
	/**
	 * @private
	 * @type {queueObjectFIFO['details'][]}
	 */
	static queue = [];
	/**
	 * @type {boolean}
	 */
	static isRunning = false;
	/**
	 * @param {(queueObjectFIFO:queueObjectFIFO)=>void} _queue
	 */
	static assign = virst['QFIFO'];
	/**
	 * @private
	 * @param {queueObjectFIFO} _queue
	 */
	static push = (_queue) => {
		this.queue.push(_queue.details);
	};
	/**
	 * @private
	 */
	static run = async () => {
		queueFIFO.isRunning = true;
		while (this.queue.length !== 0) {
			const [callback, debounceMs] = this.queue[0];
			this.queue.shift();
			/**
			 * conditional debounce;
			 * queue FIFO messing up when have debouncer while `debounceMS` are set to 0;
			 */
			if (debounceMs) {
				await helper.timeout(debounceMs);
			}
			await callback();
		}
		queueFIFO.isRunning = false;
	};
}
