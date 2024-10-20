// @ts-check

import { helper } from './helper.mjs';
import { queueFIFO } from './queueFIFO.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

/**
 * @description
 * trigger based callback integrated to the internal library  queue handler;
 * can be created using class instantiation;
 */
export class Ping {
	/**
	 * async callback when pinged
	 * @private
	 * @type {(isAtInitisalization:boolean)=>Promise<void>}
	 */
	asyncCallback;
	/**
	 * @param {boolean} callsAtFirst
	 * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
	 */
	constructor(callsAtFirst, asyncCallbackWhenPinged) {
		this.asyncCallback = asyncCallbackWhenPinged;
		if (callsAtFirst) {
			this.ping(true);
		}
	}
	/**
	 * @param {boolean} first
	 */
	ping = (first = false) => {
		queueFIFO.assign(
			new queueObjectFIFO(async () => {
				await this.asyncCallback(first);
			}, helper.debounce)
		);
	};
}
