// @ts-check

import { helper } from './helper.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * - observe element on intersecting with `viewPort`;
 * - use inside `Lifecycle` `onConnected` scope, by instantiating this class;
 * ```js
 * // Lifecycle scope
 * onConnected(async()=>{
 * 	new OnViewPort({...options});
 * });
 * ```
 */
export class onViewPort {
	/**
	 * @param {import('./onViewPortHandler.type.mjs').elementsCallbacks} elementsCallbacks
	 */
	constructor(elementsCallbacks) {
		const { element, onExitViewCallback, onViewCallback, lifecyclesOnDisconnected } =
			elementsCallbacks;
		onViewPort.observer.observe(element);
		element[helper.onViewCBIdentifier] = onViewCallback;
		element[helper.onExitViewCBIdentifier] = onExitViewCallback;
		for (let i = 0; i < lifecyclesOnDisconnected.length; i++) {
			lifecyclesOnDisconnected[i](async () => {
				onViewPort.removeAllCallbacks(element);
			});
		}
	}
	/**
	 * @private
	 */
	static observer = new IntersectionObserver(
		(entries) => {
			new Ping(true, async () => {
				for (let i = 0; i < entries.length; i++) {
					await this.handleEntry(entries[i]);
				}
			});
		},
		{ threshold: [0, 0] }
	);
	/**
	 * @returns {IntersectionObserverEntry[]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
	 */
	static takeRecords = () => this.observer.takeRecords();
	/**
	 * @returns {void}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
	 */
	static disconnect = () => this.observer.disconnect();
	static get root() {
		return this.observer.root;
	}
	static get rootMargin() {
		return this.observer.rootMargin;
	}
	/**
	 * @param {Element|HTMLElement} element
	 * @returns
	 */
	static unobserve = (element) => this.observer.unobserve(element);
	/**
	 * @param {HTMLElement} element
	 */
	static removeOnViewCallback = (element) => {
		if (helper.onViewCBIdentifier in element) {
			delete element[helper.onViewCBIdentifier];
		}
	};
	/**
	 * @param {HTMLElement} element
	 */
	static removeOnExitViewCallback = (element) => {
		delete element[helper.onExitViewCBIdentifier];
		if (helper.onExitViewCBIdentifier in element) {
		}
	};
	/**
	 * @param {HTMLElement} element
	 */
	static removeAllCallbacks = (element) => {
		this.removeOnViewCallback(element);
		this.removeOnExitViewCallback(element);
	};
	/**
	 * @type {import('./onViewPortHandler.type.mjs').onViewPortHandler}
	 */
	static onViewCallbacksOptions = {
		removeOnViewCallback: onViewPort.removeOnViewCallback,
		removeOnExitViewCallback: onViewPort.removeOnExitViewCallback,
		removeAllCallbacks: onViewPort.removeAllCallbacks,
		unobserve: onViewPort.unobserve,
	};
	/**
	 * @private
	 * @param {IntersectionObserverEntry} entry
	 */
	static handleEntry = async (entry) => {
		const element = entry.target;
		if (entry.isIntersecting && helper.onViewCBIdentifier in element) {
			await element[helper.onViewCBIdentifier](onViewPort.onViewCallbacksOptions);
		}
		if (!entry.isIntersecting && helper.onExitViewCBIdentifier in element) {
			await element[helper.onExitViewCBIdentifier](onViewPort.onViewCallbacksOptions);
		}
	};
}
