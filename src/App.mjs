// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';

/**
 * @description
 * `App` starter helper for module environtment;
 * the sole purpose is just to auto import the necessary file in your main js file;
 */
export class App {
	/**
	 * @type {App}
	 */
	static __;
	/**
	 * @param {Object} options
	 * @param {import('./Component.mjs').Component} [options.rootComponent] -
	 * - for efficiency, only fill this option when you intent to use the library as sole `View` part of your stack;
	 * - the inputed root component must manually fills attributeName option argument, to target root element on the real dom;
	 * @param {(import("./Lifecycle.mjs").Lifecycle)[]} [options.lifecycles]
	 * @param {(import("./For.mjs").For)[]} [options.forS]
	 * @param {import('./DefineShortCuts.mjs').DefineShortCuts} [options.definedShortcuts]
	 * @param {import('./DefineQRouter.mjs').DefineQRouter} [options.definedQRouter]
	 * @param {import('./DefineStorage.mjs').DefineStorage} [options.definedStorage]
	 * @param {import('./DefinePageTemplate.mjs').DefinePageTemplate} [options.definePageTemplate]
	 * @param {string} [options.title]
	 */
	constructor({
		lifecycles,
		forS,
		rootComponent,
		definedShortcuts,
		definedQRouter,
		definedStorage,
		definePageTemplate,
		title = undefined,
	}) {
		if (App.__ instanceof App) {
			helper.warningSingleton(App);
			return;
		}
		App.__ = this;
		if (title !== undefined) {
			this.title = new Let(title ?? document.title);
			new $(async () => {
				document.title = this.title.value;
			});
		}
	}
	/**
	 * @type {Let<string>}
	 */
	title;
}
