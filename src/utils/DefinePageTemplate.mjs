// @ts-check

import { helper } from './helper.export.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';

/**
 * @description
 * - instantiate this class to opt in page templating, by saving html template string on a html document page;
 * - html implementation:
 * ```html
 * // main page
 * <div ${templateName}="${path};${templateName};${mode}"></div>
 * // mode = 'inner' | 'outer'
 * ```
 * - `templateName` of `head` & `body` are reserved for `document.body` and `document.body` of the template `document`, you can use it without adding `targetAttribute="head"` or `targetAttribute="body"` on the respective element;
 * ```html
 * // template document
 * <div ${targetAttribute}="${selector}"></div>
 * ```
 * - how it works:
 * > - the class itself register a `Lifecycle` for `templateName`,  which then upon connected, it will fetch the `path` then selects `targetAttribute`="`selector`" as template that then replace main page `innerHTML` with selected element `innerHTML` from template;
 * > - fetched page will be then be cached, along with any `[targetAttribute]` on that page
 */
/**
 * @typedef {Object} swapWithPageTemplateOptions
 * @property {HTMLElement} element
 * @property {string} path
 * @property {string} templateName
 * @property {renderMode} mode
 */
export class DefinePageTemplate {
	/**
	 * @type {DefinePageTemplate}
	 */
	static __;
	/**
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
		DefinePageTemplate.targetAttribute = targetAttribute;
		DefinePageTemplate.targetPathRule = targetPathRule;
		DefinePageTemplate.callerAttribute = callerAttribute;
		new Lifecycle({
			attributeName: callerAttribute,
			onConnected: async ({ element }) => {
				await this.renderElement({ element });
			},
		});
	}
	/**
	 * @type {string}
	 */
	static callerAttribute;
	/**
	 * @type {string}
	 */
	static targetAttribute;
	/**
	 * @private
	 * @type {(path:string)=>string}
	 */
	static targetPathRule;
	/**
	 * @param {swapWithPageTemplateOptions} options
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
				const template_ = fromCache[0].cloneNode(true);
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
			const callerAttribute = DefinePageTemplate.callerAttribute;
			const templateSelector = element.getAttribute(callerAttribute);
			if (!templateSelector) {
				console.warn({
					element,
					callerAttribute,
					message: `attributeName "${callerAttribute}" must have value to be used as templateSelector`,
				});
				return;
			}
			[path_, templateName, mode = 'inner'] = helper.splitX(templateSelector, helper.separator);
		}
		const targetAttribute = DefinePageTemplate.targetAttribute;
		const path = DefinePageTemplate.targetPathRule(path_);
		const fromCache = await DefinePageTemplate.fromCache(targetAttribute, path, templateName);
		DefinePageTemplate.replace(element, fromCache, mode);
	};
	/**
	 * @param {string} path
	 * @returns {Promise<Document>}
	 */
	static getDocument = async (path) => {
		if (path in this.cachedDocument) {
			return this.cachedDocument[path];
		}
		let response;
		try {
			response = await fetch(path);
			if (!response.ok) {
				response = await fetch(`${path}.html`);
			}
			if (!response.ok) {
				throw Error(`Error fetching: status="${response.status}"`);
			}
			const htmlString = await response.text();
			const parser = new DOMParser();
			return (this.cachedDocument[path] = parser.parseFromString(htmlString, 'text/html'));
		} catch (error) {
			console.error({ error, response });
		}
	};
	/**
	 * @private
	 * @type {Record<string, Document>}
	 */
	static cachedDocument = {};
	/**
	 * @param {string} path
	 * @param {string} templateName
	 * @param {string} targetAttribute
	 * @returns {Promise<[element:HTMLElement,innerHTML:string]>}
	 */
	static fromCache = async (targetAttribute, path, templateName) => {
		const fromCache = DefinePageTemplate.chachedTemplate[path]?.[templateName];
		if (fromCache) {
			return fromCache;
		}
		const doc = await this.getDocument(path);
		const docScripts = doc.querySelectorAll('script');
		for (let i = 0; i < docScripts.length; i++) {
			docScripts[i].remove();
		}
		DefinePageTemplate.chachedTemplate[path] = {};
		const docBody = doc.body;
		DefinePageTemplate.chachedTemplate[path]['body'] = [docBody, docBody.innerHTML];
		const docHead = doc.head;
		DefinePageTemplate.chachedTemplate[path]['head'] = [docHead, docHead.innerHTML];
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
		if (templateName !== 'head' && templateName !== 'body' && !retElement) {
			console.error(`couldn't find '[${targetAttribute}="${templateName}"]' in the ${path}`);
			return;
		}
		return DefinePageTemplate.chachedTemplate[path]?.[templateName];
	};
}
