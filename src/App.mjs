// @ts-check

import { helper } from './helper.export.mjs';

/**
 * @description
 * `App` starter helper for module environtment:
 * - the sole purpose is just to auto import the necessary global file in your main js file;
 * - if it's `elementScoped` `instances`/`statics methods`, it will be better to just leave it for the `parentModule` to import it accordingly;
 */
export class App {
	/**
	 * @type {App}
	 */
	static __;
	/**
	 * @param {Object} options
	 * - for efficiency, only fill this option when you intent to use the library as sole `View` part of your stack;
	 * - the inputed root component must manually fills attributeName option argument, to target root element on the real dom;
	 * @param {(import("./Lifecycle.mjs").Lifecycle)[]} [options.lifecycles]
	 * @param {(import("./For.mjs").For)[]} [options.forS]
	 * @param {import('./DefineShortCuts.mjs').DefineShortCuts} [options.defineShortcuts]
	 * @param {import('./DefineQRouter.mjs').DefineQRouter} [options.defineQRouter]
	 * @param {import('./DefineStorage.mjs').DefineStorage} [options.defineStorage]
	 * @param {import('./DefinePageTemplate.mjs').DefinePageTemplate} [options.definePageTemplate]
	 * @param {number} [options.appDebounceMS]
	 */
	constructor({
		lifecycles: _0,
		forS: _1,
		defineShortcuts: _2,
		defineStorage: _4,
		definePageTemplate: _5,
		defineQRouter,
		appDebounceMS = 0,
	}) {
		if (App.__ instanceof App) {
			helper.warningSingleton(App);
			return;
		}
		App.__ = this;
		helper.debounce = appDebounceMS;
		if (defineQRouter) {
			defineQRouter.queryChangeThrottleMs = appDebounceMS;
		}
	}
}
