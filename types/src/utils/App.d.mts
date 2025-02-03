/**
 * @description
 * `App` starter helper for module environtment:
 * - the sole purpose is just to auto import the necessary global file in your main js file;
 * - if it's `elementScoped` `instances`/`statics methods`, it will be better to just leave it for the `parentModule` to import it accordingly;
 * ```js
 * /**
 *  * @typedef {Object} constructorOptions
 *  * - for efficiency, only fill this options when you intent to use the library as sole `View` part of your stack;
 *  * - the inputed root component must manually fills attributeName option argument, to target root element on the real dom;
 *  * @property {(import("../lifecycle/Lifecycle.mjs").Lifecycle)[]} [options.lifecycles]
 *  * @property {(import("./For.mjs").For)[]} [options.forS]
 *  * @property {import('./DefineShortCuts.mjs').DefineShortCuts} [options.defineShortcuts]
 *  * @property {import('./DefineQRouter.mjs').DefineQRouter} [options.defineQRouter]
 *  * @property {import('./DefinePageTemplate.mjs').DefinePageTemplate} [options.definePageTemplate]
 *  * @property {number} [options.pingDebounce]
 *  * in ms;
 *  * @property {import('./DefineStorage.mjs').DefineStorage} [options.defineStorage]
 *  * @property {typeof helper["webComponentGlobalStyles"]} [options.webComponentGlobalStyles]
 *  * @property {import('./FSsrc.mjs')} [options.defineFSSourceMapper]
 *  * use custom encoding(eg. base64) to replace original file's source path;
 *  * usefull when using `web-app` as `View` stack for `desktop-app`, `mobile-app` or other bundle target, removing the need to setup http server to display the file on the `browser`;
 *  *[blank]/
 * ```
 */
export class App {
    /**
     * @type {App}
     */
    static __: App;
    /**
     * @param {constructorOptions} options
     */
    constructor({ lifecycles: _0, forS: _1, defineShortcuts: _2, defineStorage: _4, definePageTemplate: _5, defineFSSourceMapper: _6, pingDebounce, defineQRouter, webComponentGlobalStyles, }: constructorOptions);
}
/**
 * * - for efficiency, only fill this options when you intent to use the library as sole `View` part of your stack;
 * * - the inputed root component must manually fills attributeName option argument, to target root element on the real dom;
 * *
 */
export type constructorOptions = {
    /**
     * *
     */
    lifecycles?: (import("../lifecycle/Lifecycle.mjs").Lifecycle)[];
    /**
     * *
     */
    forS?: (import("./For.mjs").For)[];
    /**
     * *
     */
    defineShortcuts?: import("./DefineShortCuts.mjs").DefineShortCuts<any, any>;
    /**
     * *
     */
    defineQRouter?: import("./DefineQRouter.mjs").DefineQRouter<any, any>;
    /**
     * *
     */
    definePageTemplate?: import("./DefinePageTemplate.mjs").DefinePageTemplate;
    /**
     * * in ms;
     * *
     */
    pingDebounce?: number;
    /**
     * *
     */
    defineStorage?: import("./DefineStorage.mjs").DefineStorage<any, any, any, any>;
    /**
     * *
     */
    webComponentGlobalStyles?: (typeof helper)["webComponentGlobalStyles"];
    /**
     * * use custom encoding(eg. base64) to replace original file's source path;
     * * usefull when using `web-app` as `View` stack for `desktop-app`, `mobile-app` or other bundle target, removing the need to setup http server to display the file on the `browser`;
     * *[blank]/
     * ```
     */
    defineFSSourceMapper?: typeof import("./FSsrc.mjs");
};
import { helper } from './helper.export.mjs';
