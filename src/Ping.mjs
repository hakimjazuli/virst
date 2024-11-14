// @ts-check

import { helper } from './helper.export.mjs';
import { queueFIFO } from './queueFIFO.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';
import { queueUnique } from './queueUnique.mjs';
import { queueUniqueObject } from './queueUniqueObject.mjs';

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
	 * @param {'fifo'|'unique'} [mode]
	 * @param {any} [uniqueID]
	 */
	constructor(callsAtFirst, asyncCallbackWhenPinged, mode = 'fifo', uniqueID = undefined) {
		this.asyncCallback = asyncCallbackWhenPinged;
		if (callsAtFirst) {
			switch (mode) {
				case 'fifo':
					this[mode](true);
					break;
				case 'unique':
					this[mode](uniqueID, true);
					break;
			}
		}
	}
	/**
	 * @param {boolean} first
	 */
	fifo = (first = false) => {
		queueFIFO.assign(
			new queueObjectFIFO(async () => {
				await this.asyncCallback(first);
			}, helper.debounce)
		);
	};
	/**
	 * @param {any} uniqueID
	 * @param {boolean} first
	 */
	unique = (uniqueID, first = false) => {
		queueUnique.assign(
			new queueUniqueObject(
				uniqueID,
				async () => {
					await this.asyncCallback(first);
				},
				helper.debounce
			)
		);
	};
}
