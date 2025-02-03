// @ts-check
import { Ping } from '../queue/Ping.mjs';

/**
 * @description
 * - helper class to create `ShortCut` through class instantiation;
 * - call `thisInstance.ping` to manually trigger action
 */
export class ShortCut {
	/**
	 * @param {Object} options
	 * @param {(event:KeyboardEvent)=>boolean} options.triggerCheck
	 * @param {(isAtInitisalization:boolean)=>Promise<void>} options.asyncCallback
	 */
	constructor({ triggerCheck: action, asyncCallback }) {
		this.ping = new Ping(false, asyncCallback).fifo;
		this.action = action;
		window.addEventListener('keydown', this.event);
	}
	/**
	 * @private
	 */
	action;
	/**
	 * @private
	 * @param {KeyboardEvent} event
	 */
	event = (event) => {
		if (this.action(event)) {
			this.ping();
		}
	};
	/**
	 * call this method to trigger `asyncCAllback`;
	 */
	ping;
	disable = () => {
		window.removeEventListener('keydown', this.event);
		// @ts-ignore
		this.ping = null;
	};
}
