// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { Ping } from './Ping.mjs';
import { queueUniqueObject } from './queueUniqueObject.mjs';

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
 * }} queryValueType
 * @template {Extract<keyof queryValueType, string>} NamedQueryParam
 */
export class DefineQRouter {
	/**
	 * @type {DefineQRouter}
	 */
	static __;
	/**
	 * @returns {string}
	 */
	currentURI = () => window.location.origin + window.location.pathname + window.location.search;
	/**
	 * @private
	 * @type {Record<NamedQueryParam, DefineQRouter["handler"]>}
	 */
	// @ts-ignore
	handlers = {};
	/**
	 * @private
	 * @typedef {Object} handlerType
	 * @property {string} [value]
	 * @property {NamedQueryParam[]} [clearQueriesWhenImSet]
	 * @property {NamedQueryParam[]} [clearAllWhenImSetExcept]
	 * @property {()=>Promise<void>} [onAfterResolved]
	 */
	handler = class {
		/**
		 * @param {string} key
		 * @param {handlerType} options
		 * - exception is prioritize to be kept;
		 */
		constructor(
			key,
			{
				value = '',
				clearQueriesWhenImSet = [],
				clearAllWhenImSetExcept = undefined,
				onAfterResolved = undefined,
			}
		) {
			const params = new URLSearchParams(window.location.search);
			const value_ = params.get(key);
			if (value_) {
				value = value_;
				``;
			}
			this.string = Let.dataOnly(value);
			this.clearListWhenImSet = clearQueriesWhenImSet;
			this.clearAllWhenImSetExcept = clearAllWhenImSetExcept;
			if (onAfterResolved) {
				this.onAfterResolved = new Ping(false, onAfterResolved).ping;
			}
		}
	};
	/**
	 * @param {Object} options
	 * @param {queryValueType} options.queries
	 * @param {NamedQueryParam} [options.useAsNavigation]
	 * @param {(hrefValue:string)=>string} [options.navigationPathRule]
	 * - modify path
	 * @param {number} [options.queryChangeThrottleMs]
	 */
	constructor({
		queries,
		useAsNavigation = undefined,
		navigationPathRule = undefined,
		queryChangeThrottleMs = 0,
	}) {
		if (DefineQRouter.__ instanceof DefineQRouter) {
			helper.warningSingleton(DefineQRouter);
			return;
		}
		DefineQRouter.__ = this;
		DefineQRouter.redirectToIndex();
		// @ts-ignore
		this.routes = {};
		this.queryChangeThrottleMs = queryChangeThrottleMs;
		const thisQuery = this.routes;
		this.registerPopStateEventListener();
		for (const key in queries) {
			const keyQuery = (this.handlers[key.toString()] = new this.handler(key, queries[key]));
			const thisQueryString = (this.routes[key.toString()] = keyQuery.string);
			new $(async () => {
				const _ = thisQueryString.value;
				const exceptionSet = keyQuery.clearAllWhenImSetExcept;
				const clearListWhenImSet = keyQuery.clearListWhenImSet;
				DefineQRouter.onAfterResolved = keyQuery.onAfterResolved;
				if (!clearListWhenImSet.length && exceptionSet) {
					const placeHolder = {};
					for (let i = 0; i < exceptionSet.length; i++) {
						const exception = exceptionSet[i];
						if (exception in thisQuery) {
							placeHolder[exception.toString()] = thisQuery[exception].value;
						}
					}
					for (const key__ in thisQuery) {
						const keyStr = key__.toString();
						if (exceptionSet.includes(key__) || key === keyStr) {
							const placeholderValue = placeHolder[keyStr];
							if (placeholderValue) {
								thisQuery[keyStr].value = placeholderValue;
							}
						} else {
							thisQuery[key__].value = '';
						}
					}
				} else {
					for (let i = 0; i < clearListWhenImSet.length; i++) {
						const queryNeedToBeClear = clearListWhenImSet[i];
						const qRotue = this.routes;
						if (queryNeedToBeClear in qRotue) {
							qRotue[queryNeedToBeClear].value = '';
						}
					}
				}
				if (DefineQRouter.historyStateMode === 'push') {
					this.requestChanges(this.pushPing);
				}
				DefineQRouter.historyStateMode = 'push';
			});
		}
		this.useVirstURL(useAsNavigation, navigationPathRule);
	}
	/**
	 * @private
	 * @param {NamedQueryParam} [useAsNavigation]
	 * @param {(hrefValue:string)=>string} [navigationPathRule]
	 */
	useVirstURL = (useAsNavigation, navigationPathRule) => {
		if (useAsNavigation === undefined || !(useAsNavigation in this.routes)) {
			return;
		}
		if (!navigationPathRule) {
			console.error({
				message: 'there are error on DefineQRouter instantiation',
				error: {
					useAsNavigation: 'useAsNavigation is definied, yet navigationPathRule is not',
					navigationPathRule,
				},
			});
			return;
		}
		const handlerSignal = this.routes[useAsNavigation];
		new Lifecycle(true, {
			href: async ({ element, onConnected, onDisconnected }) => {
				onConnected(async () => {
					if (!(element instanceof HTMLAnchorElement)) {
						return;
					}
					element.onclick = (event) => {
						let path_ = element.getAttribute('href') ?? '';
						if (path_.startsWith('#')) {
							return;
						}
						event.preventDefault();
						path_ = navigationPathRule(path_);
						handlerSignal.value = path_;
					};
					onDisconnected(async () => {
						element.onclick = null;
					});
				});
			},
		});
	};
	/**
	 * @private
	 */
	static redirectToIndex = () => {
		const currentPath = window.location.pathname.split('/').pop();
		if (currentPath !== 'index.html' && currentPath !== '') {
			window.location.href = '/';
		}
	};
	/**
	 * @private
	 * @param {Ping["ping"]} ping
	 */
	queryChangeThrottleMs;
	/**
	 * @private
	 * @param {Ping["ping"]} ping
	 */
	requestChanges = async (ping) => {
		helper.assignToQUnique(
			new queueUniqueObject(
				helper.qRouteChange,
				async () => {
					ping();
					if (DefineQRouter.onAfterResolved) {
						DefineQRouter.onAfterResolved();
					}
					DefineQRouter.onAfterResolved = null;
				},
				this.queryChangeThrottleMs
			)
		);
	};
	/**
	 * @private
	 * @type {'pop'|'push'}
	 */
	static historyStateMode = 'push';
	/**
	 * @private
	 */
	pushPing = new Ping(false, async () => {
		const queryParams = {};
		const currentQuery = this.routes;
		for (const key in currentQuery) {
			const query = currentQuery[key].value;
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
	/**
	 * @private
	 */
	registerPopStateEventListener = () => {
		window.addEventListener('popstate', () => this.requestChanges(this.popPing));
	};
	/**
	 * @private
	 * @type {Ping["ping"]}
	 */
	static onAfterResolved;
	/**
	 * @private
	 */
	popPing = new Ping(false, async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const entries = urlParams.entries();
		for (const [key, value] of entries) {
			DefineQRouter.historyStateMode = 'pop';
			const thisQuery = this.routes;
			if (!(key in thisQuery)) {
				continue;
			}
			DefineQRouter.onAfterResolved = this.handlers[key].onAfterResolved;
			thisQuery[key].value = value;
		}
	}).ping;
	/**
	 * @type {Record.<NamedQueryParam, Let<string>>}
	 */
	routes;
}
