// @ts-check

import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * use this instead of normal `eventListener` declaration for:
 * - creating `autoqueued` `listener`;
 * - `autoScope` `_` static methods, inside `Component` scope;
 * ```js
 * // @ts-check
 * someObject.addEventListener('click', Event_.listener( (event) => {
 * // code
 * }))
 * ```
 */
export class Event_ {
	/**
	 * @param {(event:Event)=>Promise<any>} scopedCallback
	 * @returns {(event:Event)=>void}
	 * - `autoqueued` & `autoScoped` callback
	 */
	static listener = (scopedCallback) => {
		const documentScope = helper.currentDocumentScope;
		/**
		 * use manual scope since it needs event arguments
		 * @param {Event} event
		 */
		return (event) => {
			Ping.manualScope({
				documentScope,
				runCheckAtFirst: true,
				scopedCallback: async () => {
					await scopedCallback(event);
				},
			});
		};
	};
}
