// @ts-check

/**
 * @description
 * helper class to define web worker thread;
 * ```js
 *	new WorkerThread({
 *		onMessage: ({ event, postMessage }) => {
 *			const message = undefined;
 *			// code to handle the message
 *			postMessage(message);
 *		},
 *	});
 * ```
 */
export class WorkerThread {
	/**
	 * @typedef {Object} optionsOnMessage
	 * @property {MessageEvent<any>} event
	 * @property {(message:any)=>void} postMessage
	 */
	/**
	 * Creates a worker thread with provided handlers.
	 * @param {(options:optionsOnMessage) => void} onMessage - A callback function to handle incoming messages in the worker thread.
	 */
	constructor(onMessage) {
		/**
		 * @type {(ev: MessageEvent) => any}
		 */
		self.onmessage = (event) => {
			onMessage({ event, postMessage: self.postMessage });
		};
	}
}
