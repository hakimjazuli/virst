// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * allow the usage of search query based router through class instantiation;
 * - register by putting import this instance on your js `main file`
 */
/**
 * Search-Query-Param Router
 * @template {{
 * [queryName:string]:
 * handlerType
 * }} dataValueType
 * @template {Extract<keyof dataValueType, string>} NamedQueryParam
 */
export class DefineQRouter {
	/**
	 * @type {DefineQRouter}
	 */
	static __;
	/**
	 * @private
	 * @typedef {Object} handlerType
	 * @property {string} [value]
	 * @property {NamedQueryParam[]} [clearQueriesWhenImSet]
	 * @property {NamedQueryParam[]} [clearAllQueriesExcept]
	 */
	handler = class {
		/**
		 * @param {string} key
		 * @param {handlerType} options
		 * - exception is prioritize to be kept;
		 */
		constructor(key, { value = '', clearQueriesWhenImSet = [], clearAllQueriesExcept = [] }) {
			const params = new URLSearchParams(window.location.search);
			const value_ = params.get(key);
			if (value_) {
				value = value_;
			}
			this.string = Let.dataOnly(value);
			this.clearListWhenImSet = clearQueriesWhenImSet;
			this.clearAllQueriesExcept = clearAllQueriesExcept;
		}
	};
	/**
	 * @param {Object} options
	 * @param {dataValueType} options.data
	 * @param {number} [options.queryChangeThrottleMs]
	 */
	constructor({ data, queryChangeThrottleMs: queryChangeThrottle = 300 }) {
		if (DefineQRouter.__ instanceof DefineQRouter) {
			helper.warningSingleton(DefineQRouter);
			return;
		}
		DefineQRouter.__ = this;
		DefineQRouter.useVirstURL();
		// @ts-ignore
		this.qRoute = {};
		this.queryChangeThrottle = queryChangeThrottle;
		const thisData = this.qRoute;
		this.registerPopStateEventListener();
		for (const key in data) {
			const keyData = new this.handler(key, data[key]);
			const thisDataString = (this.qRoute[key.toString()] = keyData.string);
			new $(async () => {
				const _ = thisDataString.value;
				const exceptionSet = keyData.clearAllQueriesExcept;
				const clearListWhenImSet = keyData.clearListWhenImSet;
				if (!clearListWhenImSet.length && exceptionSet.length) {
					const placeHolder = {};
					for (let i = 0; i < exceptionSet.length; i++) {
						const exception = exceptionSet[i];
						placeHolder[exception.toString()] = thisData[exception].value;
					}
					for (const key in thisData) {
						if (key in thisData) {
							const keyStr = key.toString();
							if (key in exceptionSet) {
								thisData[key].value = placeHolder[keyStr];
							} else {
								thisData[key].value = '';
							}
						}
					}
				} else {
					for (let i = 0; i < clearListWhenImSet.length; i++) {
						const queryNeedToBeClear = clearListWhenImSet[i];
						this.qRoute[queryNeedToBeClear].value = '';
					}
				}
				this.requestChanges(this.pushPing);
			});
		}
	}
	/**
	 * @private
	 */
	static useVirstURL = () => {
		const currentPath = window.location.pathname.split('/').pop();
		if (currentPath !== 'index.html' && currentPath !== '') {
			window.location.href = '/';
			return;
		}
	};
	/**
	 * @private
	 * @param {Ping["ping"]} ping
	 */
	queryChangeThrottle;
	/**
	 * @private
	 * @type { null|number }
	 */
	timeoutId = null;
	/**
	 * @private
	 * @param {Ping["ping"]} ping
	 */
	requestChanges = async (ping) => {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
		this.timeoutId = window.setTimeout(async () => {
			ping();
		}, this.queryChangeThrottle);
	};
	/**
	 * @private
	 */
	pushPing = new Ping(false, async () => {
		const queryParams = {};
		const currentData = this.qRoute;
		for (const key in currentData) {
			const query = currentData[key].value;
			if (query) {
				queryParams[key.toString()] = query;
			}
		}
		const url = new URL(window.location.href);
		const initialSearch = url.search;
		url.search = '';
		for (const key in queryParams) {
			url.searchParams.set(key, queryParams[key]);
		}
		if (initialSearch == url.search) {
			return;
		}
		window.history.pushState({}, '', url);
	}).ping;
	currentQuery = Let.dataOnly('');
	/**
	 * @private
	 */
	registerPopStateEventListener = () => {
		window.addEventListener('popstate', () => this.requestChanges(this.popPing));
	};
	/**
	 * @private
	 */
	popPing = new Ping(false, async () => {
		const url = new URL(window.location.href);
		const searchParams = url.searchParams;
		for (const key in searchParams) {
			const thisData = this.qRoute;
			if (!(key in thisData)) {
				continue;
			}
			if (Object.prototype.hasOwnProperty.call(searchParams, key)) {
				const query = searchParams[key];
				thisData[key].value = query;
			}
		}
	}).ping;
	/**
	 * @type {Record.<NamedQueryParam, Let<string>>}
	 */
	qRoute;
}
