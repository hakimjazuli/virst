// @ts-check

import { helper } from '../utils/helper.export.mjs';

/**
 * @description
 * - observe element on intersecting with `viewPort`;
 * - use inside `Lifecycle` `onConnected` scope;
 */
export class onViewPort {
	/**
	 * @param {import('./onViewPortHandler.type.mjs').elementsCallbacks} elementsCallbacks
	 */
	constructor({ element, onExitViewCallback, onViewCallback, lifecyclesOnDisconnected }) {
		this.element = element;
		onViewPort.observer.observe(element);
		element[helper.onViewCBIdentifier] = onViewCallback;
		element[helper.onExitViewCBIdentifier] = onExitViewCallback;
		for (let i = 0; i < lifecyclesOnDisconnected.length; i++) {
			lifecyclesOnDisconnected[i](async () => {
				onViewPort.removeOnViewCallback(element);
				if (element[helper.onExitViewCBIdentifier]) {
					await element[helper.onExitViewCBIdentifier](onViewPort.onViewCallbacksOptions(element));
				}
				onViewPort.removeOnExitViewCallback(element);
				onViewPort.unobserve(element);
			});
		}
	}
	/**
	 * @private
	 */
	element;
	disconnect = async () => {
		const element = this.element;
		onViewPort.removeOnViewCallback(element);
		if (element[helper.onExitViewCBIdentifier]) {
			await element[helper.onExitViewCBIdentifier](onViewPort.onViewCallbacksOptions(element));
		}
		onViewPort.removeOnExitViewCallback(element);
		onViewPort.unobserve(element);
	};
	/**
	 * @private
	 * @type {number}
	 */
	static loadCount_ = 10;
	static get loadCount() {
		return this.loadCount_;
	}
	static set loadCount(value) {
		if (typeof value === 'number' && value > 0) {
			this.loadCount_ = value;
		} else {
			console.warn('loadCount must be a positive number. Using the absolute value instead;');
			this.loadCount_ = Math.abs(value);
		}
	}
	/**
	 * @private
	 */
	static observer = new IntersectionObserver(
		(entries) => {
			const loadCount = this.loadCount;
			const promises = [];
			for (let i = 0; i < entries.length; i++) {
				promises.push(async () => {
					await this.handleEntry(entries[i]);
				});
				if ((i + 1) % loadCount !== 0) {
					continue;
				}
				helper.handlePromiseAll(this, promises);
				promises.length = 0;
			}
			if (promises.length > 0) {
				helper.handlePromiseAll(this, promises);
			}
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
	 * @private
	 * @param {Element|HTMLElement} element
	 * @returns
	 */
	static unobserve = (element) => this.observer.unobserve(element);
	/**
	 * @private
	 * @param {Element|HTMLElement} element
	 */
	static removeOnViewCallback = (element) => {
		if (helper.onViewCBIdentifier in element) {
			delete element[helper.onViewCBIdentifier];
		}
	};
	/**
	 * @private
	 * @param {Element|HTMLElement} element
	 */
	static removeOnExitViewCallback = (element) => {
		if (helper.onExitViewCBIdentifier in element) {
			delete element[helper.onExitViewCBIdentifier];
		}
	};
	/**
	 * @private
	 * @type {(element:Element|HTMLElement)=>import('./onViewPortHandler.type.mjs').onViewPortHandler}
	 */
	static onViewCallbacksOptions = (element) => {
		return {
			removeOnViewCallback: () => onViewPort.removeOnViewCallback(element),
			removeOnExitViewCallback: () => onViewPort.removeOnExitViewCallback(element),
			unobserveElement: () => onViewPort.unobserve(element),
		};
	};
	/**
	 * @private
	 * @type {Map<HTMLElement|Element, true>}
	 */
	static registeredOnExit = new Map();
	/**
	 * @private
	 * @param {IntersectionObserverEntry} entry
	 */
	static handleEntry = async (entry) => {
		const element = entry.target;
		if (entry.isIntersecting && helper.onViewCBIdentifier in element) {
			await element[helper.onViewCBIdentifier](onViewPort.onViewCallbacksOptions(element));
			this.registeredOnExit.set(element, true);
		}
		if (
			!entry.isIntersecting &&
			helper.onExitViewCBIdentifier in element &&
			this.registeredOnExit.has(element)
		) {
			await element[helper.onExitViewCBIdentifier](onViewPort.onViewCallbacksOptions(element));
			this.registeredOnExit.delete(element);
		}
	};
}
