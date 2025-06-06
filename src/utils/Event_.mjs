// @ts-check

import { helper } from './helper.export.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';

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
			Lifecycle.scopedPing({
				documentScope,
				runCheckAtFirst: true,
				scopedCallback: async () => {
					await scopedCallback(event);
				},
			});
		};
	};
}
