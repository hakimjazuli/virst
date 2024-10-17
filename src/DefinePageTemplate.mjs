// @ts-check

import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - instantiate this class to opt in page templating,
 *  by saving html template string on a html document page;
 * ```html
 * // main page
 * <div ${templateName}="${path};${selector}"></div>
 * ```
 * ```html
 * // template document
 * <div ${targetAttribute}="${selector}"></div>
 * ```
 * - how it works:
 * > - the class itself register a `Lifecycle` for `templateName`,
 *     which then upon connected, it will fetch the `path` then selects `targetAttribute`="`selector`"
 *     as template that then replace main page element with selected element from template;
 * > - fetched page will be then be cached, along with any `[targetAttribute]` on that page
 */
export class DefinePageTemplate {
	/**
	 * @type {DefinePageTemplate}
	 */
	static __;
	/**
	 * @private
	 * @typedef {{[templateName:string]:HTMLElement}} templateSingle
	 * @type {{[path:string]:templateSingle}}
	 */
	static chachedTemplate = {};
	/**
	 * @param {Object} options
	 * @param {string} options.callerAttribute
	 * @param {string} options.targetAttribute
	 * @param {(path:string)=>string} [options.targetPathRule]
	 * - return processed path
	 */
	constructor({ callerAttribute, targetAttribute, targetPathRule = (path) => path }) {
		if (DefinePageTemplate.__ instanceof DefinePageTemplate) {
			helper.warningSingleton(DefinePageTemplate);
			return;
		}
		DefinePageTemplate.__ = this;
		this.targetAttribute = targetAttribute;
		this.targetPathRule = targetPathRule;
		this.callerAttribute = callerAttribute;
		new Lifecycle(true, {
			[callerAttribute]: async ({ element, onConnected }) => {
				onConnected(async () => {
					await this.renderElement({ element });
				});
			},
		});
	}
	/**
	 * @private
	 * @type {string}
	 */
	targetAttribute;
	/**
	 * @private
	 * @type {(path:string)=>string}
	 */
	targetPathRule;
	/**
	 * @param {Object} options
	 * @param {HTMLElement} options.element
	 * @param {string} options.path
	 * @param {string} options.templateName
	 */
	swap = ({ element, path, templateName }) => {
		this.renderElement({ element, path, templateName });
	};
	/**
	 * @private
	 * @param {Object} options
	 * @param {HTMLElement} options.element
	 * @param {string} [options.path]
	 * @param {string} [options.templateName]
	 */
	renderElement = async ({ element, path: path_, templateName }) => {
		if (!path_ || !templateName) {
			const callerAttribute = this.callerAttribute;
			const templateSelector = element.getAttribute(callerAttribute);
			if (!templateSelector) {
				console.warn({
					element,
					callerAttribute,
					message: `attributeName "${callerAttribute}" must have value to be used as templateSelector`,
				});
				return;
			}
			[path_, templateName] = templateSelector.split(helper.separator);
		}
		const targetAttribute = this.targetAttribute;
		const path = this.targetPathRule(path_);
		const fromCache = DefinePageTemplate.chachedTemplate[path]?.[templateName];
		if (fromCache) {
			const template_ = fromCache.cloneNode(true);
			element.replaceWith(template_);
			return;
		}
		try {
			const response = await fetch(path);
			if (!response.ok) {
				throw Error(`Error fetching: status="${response.status}"`);
			}
			const htmlString = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlString, 'text/html');
			DefinePageTemplate.chachedTemplate[path] = {};
			const templates = doc.querySelectorAll(`[${targetAttribute}]`);
			let retElement;
			for (let i = 0; i < templates.length; i++) {
				const templateElement = templates[i];
				const templateName_ = templateElement.getAttribute(targetAttribute);
				if (!(templateElement instanceof HTMLElement)) {
					continue;
				}
				DefinePageTemplate.chachedTemplate[path][templateName_] = templateElement;
				if (templateName_ === templateName) {
					retElement = templateElement;
				}
			}
			if (!retElement) {
				throw Error(
					`couldn't find '[${targetAttribute}="${templateName}"]' in the ${path}`
				);
			}
			const template_ = retElement.cloneNode(true);
			element.replaceWith(template_);
		} catch (error) {
			console.error(error);
		}
	};
}
