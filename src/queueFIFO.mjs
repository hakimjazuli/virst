// @ts-check

import { helper } from './helper.export.mjs';

export class queueFIFO {
	/**
	 * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
	 */
	/**
	 * @private
	 */
	constructor() {
		window['virst'] = window['virst'] ?? {};
		window['virst']['QFIFO'] = window['virst']['QFIFO'] ?? this.assign_;
	}
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
	 * @private
	 */
	// @ts-ignore
	static _ = new queueFIFO();
	/**
	 * @param {(queueObjectFIFO:queueObjectFIFO)=>void} _queue
	 */
	static assign = window['virst']['QFIFO'];
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
		this.isRunning = false;
	};
}
