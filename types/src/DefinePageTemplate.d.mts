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
export class DefinePageTemplate {
    /**
     * @type {DefinePageTemplate}
     */
    static __: DefinePageTemplate;
    /**
     * @private
     * @typedef {{[templateName:string]:[element:HTMLElement,innerHTML:string]}} templateSingle
     * @type {{[path:string]:templateSingle}}
     */
    private static chachedTemplate;
    /**
     * @typedef {'inner'|'outer'|string} renderMode
     */
    /**
     * @private
     * @param {HTMLElement} element
     * @param {[HTMLElement,string]} fromCache
     * @param {renderMode} mode
     */
    private static replace;
    /**
     * @param {Object} options
     * @param {string} options.callerAttribute
     * @param {string} options.targetAttribute
     * @param {(path:string)=>string} [options.targetPathRule]
     * - return processed path
     */
    constructor({ callerAttribute, targetAttribute, targetPathRule }: {
        callerAttribute: string;
        targetAttribute: string;
        targetPathRule?: (path: string) => string;
    });
    /**
     * @private
     * @type {string}
     */
    private targetAttribute;
    /**
     * @private
     * @type {(path:string)=>string}
     */
    private targetPathRule;
    callerAttribute: string;
    /**
     * @param {Object} options
     * @param {HTMLElement} options.element
     * @param {string} options.path
     * @param {string} options.templateName
     * @param {renderMode} options.mode
     */
    swap: (options: {
        element: HTMLElement;
        path: string;
        templateName: string;
        mode: string;
    }) => void;
    /**
     * @private
     * @param {Object} options
     * @param {HTMLElement} options.element
     * @param {string} [options.path]
     * @param {string} [options.templateName]
     * @param {renderMode} [options.mode]
     */
    private renderElement;
}
