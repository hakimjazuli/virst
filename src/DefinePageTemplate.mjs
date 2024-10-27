// @ts-check

import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - instantiate this class to opt in page templating, by saving html template string on a html document page;
 * - html implementation:
 * ```html
 * // main page
 * <div ${templateName}="${path};${templateName};${mode}"></div>
 * // mode = 'inner' | 'outer'
 * ```
 * ```html
 * // template document
 * <div ${targetAttribute}="${selector}"></div>
 * ```
 * - how it works:
 * > - the class itself register a `Lifecycle` for `templateName`,  which then upon connected, it will fetch the `path` then selects `targetAttribute`="`selector`" as template that then replace main page `innerHTML` with selected element `innerHTML` from template;
 * > - fetched page will be then be cached, along with any `[targetAttribute]` on that page
 */
export class DefinePageTemplate {
	/**
	 * @type {DefinePageTemplate}
	 */
	static __;
	/**
	 * @private
	 * @typedef {{[templateName:string]:[element:HTMLElement,innerHTML:string]}} templateSingle
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
		new Lifecycle({
			attributeName: callerAttribute,
			bypassNested: true,
			onConnected: async ({ element }) => {
				await this.renderElement({ element });
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
	 * @param {renderMode} options.mode
	 */
	swap = (options) => {
		this.renderElement(options);
	};
	/**
	 * @typedef {'inner'|'outer'|string} renderMode
	 */
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {[HTMLElement,string]} fromCache
	 * @param {renderMode} mode
	 */
	static replace = (element, fromCache, mode = 'inner') => {
		switch (mode) {
			case 'outer':
				const template_ = helper.cloneNode(fromCache[0]);
				element.replaceWith(template_);
				break;
			case 'inner':
			default:
				element.innerHTML = fromCache[1];
				break;
		}
	};
	/**
	 * @private
	 * @param {Object} options
	 * @param {HTMLElement} options.element
	 * @param {string} [options.path]
	 * @param {string} [options.templateName]
	 * @param {renderMode} [options.mode]
	 */
	renderElement = async ({ element, path: path_, templateName, mode = 'inner' }) => {
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
			[path_, templateName, mode = 'inner'] = templateSelector.split(helper.separator);
		}
		const targetAttribute = this.targetAttribute;
		const path = this.targetPathRule(path_);
		const fromCache = DefinePageTemplate.chachedTemplate[path]?.[templateName];
		if (fromCache) {
			DefinePageTemplate.replace(element, fromCache, mode);
			return;
		}
		try {
			const doc = await helper.getDocument(path);
			DefinePageTemplate.chachedTemplate[path] = {};
			const templates = doc.querySelectorAll(`[${targetAttribute}]`);
			let retElement;
			for (let i = 0; i < templates.length; i++) {
				const templateElement = templates[i];
				const templateName_ = templateElement.getAttribute(targetAttribute);
				if (!(templateElement instanceof HTMLElement)) {
					continue;
				}
				DefinePageTemplate.chachedTemplate[path][templateName_] = [
					templateElement,
					templateElement.innerHTML,
				];
				if (templateName_ === templateName) {
					retElement = templateElement;
				}
			}
			if (!retElement) {
				throw Error(
					`couldn't find '[${targetAttribute}="${templateName}"]' in the ${path}`
				);
			}
			DefinePageTemplate.replace(element, fromCache, mode);
		} catch (error) {
			console.error(error);
		}
	};
}
