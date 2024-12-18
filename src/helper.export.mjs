// @ts-check

/**
 * @description
 * shared statics
 */
export class helper {
	/**
	 * subscriber
	 * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
	 */
	static subscriber = null;

	/**
	 * @type {number}
	 */
	static debounce = 0;
	/**
	 * @readonly
	 */
	static removeDOM$ = 'virst-rm-dom$';
	/**
	 * @readonly
	 */
	static val = 'virst-a-val';
	/**
	 * @readonly
	 */
	static qRouteChange = 'virst-qrc';
	/**
	 * @param {string} path
	 * @returns {Promise<Document>}
	 */
	static getDocument = async (path) => {
		if (path in helper.cachedDocument) {
			return helper.cachedDocument[path];
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
			return (helper.cachedDocument[path] = parser.parseFromString(htmlString, 'text/html'));
		} catch (error) {
			console.error({ error, response });
		}
	};
	/**
	 * @private
	 * @type {Record<string, Document>}
	 */
	static cachedDocument = {};
	static docScopeElement = 'virst-sc';
	static storageIdentifier = 'virst-st';
	static DCCBIdentifier = 'virst-dc';
	static ACCBIdentifier = 'virst-ac';
	static onViewCBIdentifier = `virst-ov`;
	static onExitViewCBIdentifier = `virst-oxv`;
	static templatePrefix = 'virst-template';
	static keptElement = 'virst-keep';
	/**
	 * @readonly
	 */
	static ForQPrefix = `virst-fq-`;
	/**
	 * @readonly
	 */
	static ForChildAttributePrefix = `virst-fc-`;
	/**
	 * @param {Object} class_
	 */
	static warningSingleton = (class_) => {
		console.warn({
			class: class_,
			message: 'is a singleton class, and can only be instantiated once',
		});
	};
	/**
	 * @private
	 */
	static generateUniqueString() {
		const timestamp = Date.now();
		const randomPart = Math.floor(Math.random() * 1_000_000);
		return `${timestamp}${randomPart}`;
	}
	/**
	 * @type {string|null}
	 */
	static attr = null;
	/**
	 * using setter and getter, to avoid error when used in non clientBrowser runtime;
	 * @private
	 * @type {import('./documentScope.type.mjs').documentScope}
	 */
	static currentDocumentScope_ = undefined;
	static get currentDocumentScope() {
		if (this.currentDocumentScope_ === undefined) {
			this.currentDocumentScope_ = window.document;
		}
		return this.currentDocumentScope_;
	}
	static set currentDocumentScope(newScope) {
		this.currentDocumentScope_ = newScope;
	}
	/**
	 * @private
	 * @type {string}
	 */
	static attrPrefix = 'virst-ap-';
	/**
	 * @param {boolean} [forced]
	 * @return {string|null}
	 */
	static attributeIndexGenerator = (forced = false) => {
		if (helper.currentDocumentScope == window.document && !forced) {
			return (this.attr = null);
		}
		return (this.attr = `${helper.attrPrefix}${this.generateUniqueString()}`);
	};
	/**
	 * @param {number} ms
	 */
	static timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	/**
	 * split with escape string `\`
	 * @param {string} string
	 * @param {string} delimiter
	 */
	static splitX = (string, delimiter) => {
		let result = [];
		let current = '';
		let isEscaped = false;
		for (let i = 0; i < string.length; i++) {
			let char = string[i];
			if (isEscaped) {
				current += char;
				isEscaped = false;
			} else if (char === '\\') {
				isEscaped = true;
			} else if (char === delimiter) {
				result.push(current);
				current = '';
			} else {
				current += char;
			}
		}
		result.push(current);
		return result;
	};
	static separator = ';';
	/**
	 * @param {string} attributeName
	 * @returns {string}
	 */
	static validAttributeNameSelector = (attributeName) =>
		attributeName.toLowerCase().replace(/:/g, '\\:');

	/**
	 * @param {Object} source
	 * @param {((...args:any)=>Promise<any>)[]} asyncArrayFunctions
	 * @param {any[]} args
	 */
	static handlePromiseAll = async (source, asyncArrayFunctions, ...args) => {
		if (!asyncArrayFunctions) {
			return;
		}
		await Promise.all(
			asyncArrayFunctions.map(async (callback) => {
				try {
					await callback(...args);
				} catch (error) {
					console.error({ callback, source, message: 'Error in callback', error });
				}
			})
		).catch((error) => {
			console.error({ asyncArrayFunctions, source, message: 'Promise.all failed:', error });
		});
	};
}
