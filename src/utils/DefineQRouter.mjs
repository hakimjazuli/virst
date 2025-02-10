// @ts-check

import { $ } from '../signals/$.mjs';
import { helper } from './helper.export.mjs';
import { Let } from '../signals/Let.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
import { Ping } from '../queue/Ping.mjs';

/**
 * @description
 * allow the usage of search query based router through class instantiation;
 * - register by `App.constructorOptions.defineQRouter`
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
			}
			this.string = Let.dataOnly(value);
			this.clearListWhenImSet = clearQueriesWhenImSet;
			this.clearAllWhenImSetExcept = clearAllWhenImSetExcept;
			if (onAfterResolved) {
				this.onAfterResolved = new Ping(false, onAfterResolved).fifo;
			}
		}
	};
	/**
	 * @param {Object} options
	 * @param {queryValueType} options.queries
	 * @param {NamedQueryParam} [options.useAsNavigation]
	 * @param {number} [options.queryChangeThrottleMs]
	 */
	constructor({ queries, useAsNavigation = undefined, queryChangeThrottleMs = 0 }) {
		if (DefineQRouter.__ instanceof DefineQRouter) {
			helper.warningSingleton(DefineQRouter);
			return;
		}
		DefineQRouter.__ = this;
		this.useAsNavigation = useAsNavigation;
		this.redirectToIndex();
		// @ts-ignore
		this.routes = {};
		this.queryChangeThrottleMs = queryChangeThrottleMs;
		const thisQuery = this.routes;
		this.registerPopStateEventListener();
		for (const key in queries) {
			const keyQuery = (this.handlers[key.toString()] = new this.handler(key, queries[key]));
			const thisQueryString = (this.routes[key.toString()] = keyQuery.string);
			new $(async (first) => {
				let url_ = thisQueryString.value;
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
				if (key == useAsNavigation) {
					if (first && url_ == '') {
					} else if (
						url_.startsWith(helper.templatePrefix) ||
						url_.startsWith(`/${helper.templatePrefix}`)
					) {
						window.location.href = `/`;
						return;
					}
				}
				if (DefineQRouter.historyStateMode === 'push') {
					this.requestChanges(this.pushPing);
				}
				DefineQRouter.historyStateMode = 'push';
			});
		}
		this.useVirstURL(useAsNavigation);
	}
	/**
	 * @private
	 * @type {string}
	 */
	useAsNavigation;
	/**
	 * @private
	 * @param {NamedQueryParam} [useAsNavigation]
	 */
	useVirstURL = (useAsNavigation) => {
		if (useAsNavigation === undefined || !(useAsNavigation in this.routes)) {
			return;
		}
		const handlerSignal = this.routes[useAsNavigation];
		new Lifecycle({
			attr: 'href',
			documentScope: document,
			onConnected: async ({ element, onDisconnected }) => {
				console.log('hahah');
				element.onclick = (event) => {
					event.preventDefault();
					let path_ = element.getAttribute('href') ?? '';
					if (path_.startsWith('#')) {
						DefineQRouter.smoothScroll(element);
						return;
					}
					if (!path_) {
						return;
					}
					handlerSignal.value = path_;
				};
				onDisconnected(async () => {
					element.onclick = null;
				});
			},
		});
		// window.addEventListener('click', (event) => {
		// 	let element = event.target;
		// 	while (element) {
		// 		if (!(element instanceof HTMLElement)) {
		// 			return;
		// 		}
		// 		if (element.tagName === 'A' && element.hasAttribute('href')) {
		// 			event.preventDefault();
		// 			let path_ = element.getAttribute('href') ?? '';
		// 			if (path_.startsWith('#')) {
		// 				DefineQRouter.smoothScroll(element);
		// 				return;
		// 			}
		// 			if (!path_) {
		// 				return;
		// 			}
		// 			handlerSignal.value = path_;
		// 			return;
		// 		}
		// 		element = element.parentElement;
		// 	}
		// });
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 */
	static smoothScroll = (element) => {
		const targetId = element.getAttribute('href').slice(1);
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
			return;
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	/**
	 * @private
	 */
	redirectToIndex = () => {
		const currentPath = window.location.pathname.replace('/', '');
		if (currentPath == '') {
			return;
		}
		if (
			currentPath.startsWith(helper.templatePrefix) ||
			currentPath.startsWith(`/${helper.templatePrefix}`)
		) {
			window.location.href = `/`;
			return;
		}
		window.location.href = `/?${this.useAsNavigation}=${currentPath}`;
	};
	/**
	 * @param {Ping["fifo"]} ping
	 */
	queryChangeThrottleMs;
	/**
	 * @private
	 * @param {Ping["fifo"]} ping
	 */
	requestChanges = async (ping) => {
		new Ping(
			true,
			async () => {
				ping();
				if (DefineQRouter.onAfterResolved) {
					DefineQRouter.onAfterResolved();
				}
				DefineQRouter.onAfterResolved = null;
			},
			{ unique: helper.qRouteChange }
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
	}).fifo;
	/**
	 * @private
	 */
	registerPopStateEventListener = () => {
		window.addEventListener('popstate', () => this.requestChanges(this.popPing));
	};
	/**
	 * @private
	 * @type {Ping["fifo"]}
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
	}).fifo;
	/**
	 * @type {Record.<NamedQueryParam, Let<string>>}
	 */
	routes;
}
