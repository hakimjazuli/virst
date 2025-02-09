// @ts-check

/**
 * @description
 * shared statics
 */
export class helper {
	/**
	 * @type {string[]}
	 */
	static webComponentGlobalStyles = [];
	/**
	 * @param {TemplateStringsArray} strings
	 * @param  {...string} values
	 * @returns {string}
	 */
	static literal = (strings, ...values) => {
		const result = [];
		for (let i = 0; i < strings.length; i++) {
			result.push(strings[i]);
			if (i < values.length) {
				result.push(values[i]);
			}
		}
		return result.join('');
	};
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
	 * @type {Set<string>}
	 */
	static uniqueID_ = new Set();
	/**
	 * @private
	 * @type {string}
	 */
	static get uniqueID() {
		const randomPart = Math.floor(Math.random() * 1_000_000_000_000_000);
		const uniqueString = `${Date.now()}${randomPart}`;
		if (helper.uniqueID_.has(uniqueString)) {
			return helper.uniqueID;
		}
		helper.uniqueID_.add(uniqueString);
		setTimeout(() => {
			helper.uniqueID_.delete(uniqueString);
		}, 100);
		return uniqueString;
	}
	/**
	 * using setter and getter, to avoid error when used in non clientBrowser runtime;
	 * @private
	 * @type {import('../lifecycle/documentScope.type.mjs').documentScope}
	 */
	static currentDocumentScope_ = undefined;
	static get currentDocumentScope() {
		if (helper.currentDocumentScope_ === undefined) {
			helper.currentDocumentScope_ = document;
		}
		return helper.currentDocumentScope_;
	}
	static set currentDocumentScope(newScope) {
		helper.currentDocumentScope_ = newScope;
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
		if (helper.currentDocumentScope == document && !forced) {
			return null;
		}
		return `${helper.attrPrefix}${helper.uniqueID}`;
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
	 * @param {(...any:any)=>(any|Promise<any>)} fn
	 * @returns {boolean}
	 */
	static isAsync = (fn) => fn.constructor.name === 'AsyncFunction';
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
