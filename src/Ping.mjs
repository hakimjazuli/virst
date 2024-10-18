// @ts-check

import { helper } from './helper.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

/**
 * @description
 * trigger based callback integrated to the internal library  queue handler;
 * can be created using class instantiation;
 */
export class Ping {
	/**
	 * @typedef {Object} manualScopeOptions
	 * @property {import('./documentScope.type.mjs').documentScope} documentScope
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 */
	/**
	 * manual scoping for lib internal functionality
	 * @param {manualScopeOptions} options
	 * @returns {Ping["ping"]}
	 */
	static manualScope = ({ documentScope, scopedCallback, runCheckAtFirst }) => {
		return new Ping(runCheckAtFirst, async () => {
			const currentScope = helper.currentDocumentScope;
			helper.currentDocumentScope = documentScope;
			await scopedCallback();
			helper.currentDocumentScope = currentScope;
		}).ping;
	};
	/**
	 * @typedef {Object} autoScopeOptions
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 */
	/**
	 * use for handling out of scoped codeblock:
	 * @param {autoScopeOptions} options
	 * @return {Ping["ping"]}
	 */
	static autoScope = ({ scopedCallback, runCheckAtFirst }) => {
		const documentScope = helper.currentDocumentScope;
		return Ping.manualScope({
			documentScope,
			scopedCallback,
			runCheckAtFirst,
		});
	};
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
		helper.queueHandler.assign(
			new queueObjectFIFO(async () => {
				await this.asyncCallback(first);
			}, helper.debounce)
		);
	};
}
