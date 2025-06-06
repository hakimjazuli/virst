// @ts-check

import { ShortCut } from './ShortCut.mjs';
import { helper } from './helper.export.mjs';

/**
 * @description
 * create shortcuts through class instantiation;
 * - register by `App.constructorOptions.defineShortcuts`
 */
/**
 * @template {{
 * [shortcutName:string]: ShortCut
 * }} namedShortCut
 * @template {Extract<keyof namedShortCut, string>} ShortCutName
 */
export class DefineShortCuts {
	/**
	 * @type {DefineShortCuts}
	 */
	static __;
	/**
	 * @param {namedShortCut} shortcutList
	 */
	constructor(shortcutList) {
		if (DefineShortCuts.__ instanceof DefineShortCuts) {
			helper.warningSingleton(DefineShortCuts);
			return;
		}
		DefineShortCuts.__ = this;
		// @ts-ignore
		this.shortCut = {};
		for (const namedShorCut in shortcutList) {
			this.shortCut[namedShorCut.toString()] = shortcutList[namedShorCut];
		}
	}
	/**
	 * @type {Record.<ShortCutName, import("./ShortCut.mjs").ShortCut>}
	 */
	shortCut;
}
