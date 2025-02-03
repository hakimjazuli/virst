// @ts-check

import { helper } from '../utils/helper.export.mjs';
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
	 * @param {{fifo:true}|{unique:any}} [mode]
	 */
	constructor(callsAtFirst, asyncCallbackWhenPinged, mode = { fifo: true }) {
		this.asyncCallback = asyncCallbackWhenPinged;
		if (callsAtFirst) {
			if ('fifo' in mode) {
				this.fifo(true);
			}
			if ('unique' in mode) {
				this.unique(mode.unique, true);
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
	static get isRunning() {
		return queueFIFO.isRunning;
	}
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
