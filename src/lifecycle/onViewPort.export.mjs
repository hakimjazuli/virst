// @ts-check

import { Q } from '../queue/Q.mjs';
import { helper } from '../utils/helper.export.mjs';
import { MappedSharedObject } from '../utils/MappedSharedObject.mjs';
import { ElementShouldHave } from './ElementShouldHave.mjs';

export class onViewPort {
	/**
	 * @typedef {import('./onViewPortHandler.type.mjs').onViewPortHandler} onViewPortHandler
	 * @typedef {import('./onViewPortHandler.type.mjs').onViewCallbackOptions} onViewCallbackOptions
	 * @typedef {import('./onViewPortHandler.type.mjs').onExitViewPortArg0} onExitViewPortArg0
	 */
	/**
	 * @type {IntersectionObserver["root"]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/root
	 */
	static get root() {
		return onViewPort.observer.root;
	}
	/**
	 * @type {IntersectionObserver["thresholds"]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/thresholds
	 */
	static get thresholds() {
		return onViewPort.observer.thresholds;
	}
	/**
	 * @type {IntersectionObserver["rootMargin"]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/rootMargin
	 */
	static get rootMargin() {
		return onViewPort.observer.rootMargin;
	}
	/**
	 * @type {IntersectionObserver["takeRecords"]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
	 */
	static takeRecords = () => onViewPort.observer.takeRecords();
	/**
	 * @type {IntersectionObserver["disconnect"]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
	 */
	static disconnect = () => onViewPort.observer.disconnect();
	/**
	 * @param {onViewPortHandler} param0
	 */
	constructor({ element, attr, onViewPort: onViewPort_, lifecyclesOnDisconnected }) {
		onViewPort.setOnView(element, attr, onViewPort_);
		onViewPort.observer.observe(element);
		for (let i = 0; i < lifecyclesOnDisconnected.length; i++) {
			lifecyclesOnDisconnected[i](async () => {
				onViewPort.unobserveElement(element, attr);
			});
		}
	}
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @returns {Map<string, Set<onViewPortHandler["onViewPort"]>>}
	 */
	static getOnView = (element) => {
		const mapped = MappedSharedObject.elements;
		if (!mapped.has(element)) {
			mapped.set(element, new ElementShouldHave({}));
		}
		return mapped.get(element).viewCallbacks;
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {string} attr
	 * @param {onViewPortHandler["onViewPort"]} onSightCallback
	 * @private
	 */
	static setOnView = async (element, attr, onSightCallback) => {
		const { resume } = await Q.unique(element);
		const current = onViewPort.getOnView(element);
		if (!current.has(attr)) {
			current.set(attr, new Set());
		}
		current.get(attr).add(onSightCallback);
		resume();
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @returns {Map<string, Set<onExitViewPortArg0>>}
	 */
	static getOnExit = (element) => {
		const mapped = MappedSharedObject.elements;
		if (!mapped.has(element)) {
			mapped.set(element, new ElementShouldHave({}));
		}
		return mapped.get(element).exitViewCallbacks;
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {string} attr
	 * @param {onExitViewPortArg0} onExitCallback
	 */
	static setOnExit = async (element, attr, onExitCallback) => {
		const { resume } = await Q.unique(element);
		const current = onViewPort.getOnExit(element);
		if (!current.has(attr)) {
			current.set(attr, new Set());
		}
		current.get(attr).add(onExitCallback);
		resume();
	};
	/**
	 * @private
	 * @type {number}
	 */
	static loadCount_ = 10;
	static get loadCount() {
		return onViewPort.loadCount_;
	}
	static set loadCount(value) {
		if (typeof value === 'number' && value > 0) {
			onViewPort.loadCount_ = value;
		} else {
			console.warn('loadCount must be a positive number. Using the absolute value instead;');
			onViewPort.loadCount_ = Math.abs(value);
		}
	}
	/**
	 * @private
	 */
	static observer = new IntersectionObserver(
		(entries) => {
			const loadCount = onViewPort.loadCount;
			const promises = [];
			for (let i = 0; i < entries.length; i++) {
				promises.push(async () => {
					await onViewPort.handleEntry(entries[i]);
				});
				if ((i + 1) % loadCount !== 0) {
					continue;
				}
				helper.handlePromiseAll(onViewPort.observer, promises);
				promises.length = 0;
			}
			if (promises.length > 0) {
				helper.handlePromiseAll(onViewPort.observer, promises);
			}
		},
		{ threshold: [0, 0] }
	);
	/**
	 * @private
	 * @param {IntersectionObserverEntry} entry
	 */
	static handleEntry = async (entry) => {
		const element = entry.target;
		if (!(element instanceof HTMLElement)) {
			return;
		}
		const { resume } = await Q.unique(element);
		const onsight = onViewPort.getOnView(element);
		const onexit = onViewPort.getOnExit(element);
		if (entry.isIntersecting) {
			if (onsight.size) {
				onsight.forEach((onSightCBs, attr) => {
					onSightCBs.forEach(async (onViewCB) => {
						await onViewCB({
							onExitViewPort: (onExitCallback) => {
								onViewPort.setOnExit(element, attr, onExitCallback);
							},
							removeOnExitCallback: () => onViewPort.removeOnExitCallback(element, attr),
							removeOnViewCallback: () => onViewPort.removeSightCallback(element, attr),
							unobserveElement: () => onViewPort.unobserveElement(element, attr),
						});
					});
				});
			}
			resume();
			return;
		}
		if (onexit.size) {
			onexit.forEach((cbs) => {
				cbs.forEach(async (cb) => {
					await cb();
				});
			});
		}
		resume();
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {string} attr
	 * @returns {ReturnType<onViewCallbackOptions["removeOnViewCallback"]>}
	 */
	static removeSightCallback = (element, attr) => {
		const current = onViewPort.getOnView(element);
		if (!current.has(attr)) {
			return;
		}
		current.get(attr).clear();
		current.delete(attr);
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {string} attr
	 * @returns {ReturnType<onViewCallbackOptions["removeOnExitCallback"]>}
	 */
	static removeOnExitCallback = (element, attr) => {
		const current = onViewPort.getOnExit(element);
		if (!current.has(attr)) {
			return;
		}
		current.get(attr).clear();
		current.delete(attr);
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {string} attr
	 * @returns {ReturnType<onViewCallbackOptions["unobserveElement"]>}
	 */
	static unobserveElement = (element, attr) => {
		onViewPort.removeSightCallback(element, attr);
		onViewPort.removeOnExitCallback(element, attr);
		this.observer.unobserve(element);
	};
}
