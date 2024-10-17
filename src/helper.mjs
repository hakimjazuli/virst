// @ts-check

import { queueFIFO } from './queueFIFO.mjs';

export class helper {
	/**
	 * subscriber
	 * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
	 */
	static subscriber = null;
	static queueHandler = new queueFIFO();
	/**
	 * @type {number|false}
	 */
	static debounce = false;
	/**
	 * @readonly
	 */
	static val = 'virst-a-val';
	/**
	 * @readonly
	 */
	static storageIdentifier = 'virst-st';
	static LCCBIdentifier = 'virst-lc';
	static DCCBIdentifier = 'virst-dc';
	static ACCBIdentifier = 'virst-ac';
	static onViewCBIdentifier = `virst-ov`;
	static onExitViewCBIdentifier = `virst-oxv`;
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
	 * @type {import('./documentScope.type.mjs').documentScope}
	 */
	static currentDocumentScope = window.document;
	/**
	 * @private
	 * @type {string}
	 */
	static attrPrefix = 'virst-ap-';
	/**
	 * @return {string|null}
	 */
	static attributeIndexGenerator = () => {
		if (helper.currentDocumentScope == window.document) {
			return (this.attr = null);
		}
		return (this.attr = `${helper.attrPrefix}${this.generateUniqueString()}`);
	};
	/**
	 * @param {number} ms
	 */
	static timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	/**
	 * is_async
	 * @param {CallableFunction} callback
	 */
	static isAsync = (callback) => callback.constructor.name === 'AsyncFunction';
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
		attributeName.toLowerCase().replaceAll(':', '\\:');

	/**
	 * @param {((...args:any)=>Promise<any>)[]} asyncArrayFunctions
	 * @param {any[]} args
	 */
	static handlePromiseAll = async (asyncArrayFunctions, ...args) => {
		await Promise.all(
			asyncArrayFunctions.map(async (callback) => {
				try {
					return await callback(...args);
				} catch (error) {
					console.error('Error in callback:', error);
					throw error;
				}
			})
		).catch((error) => {
			console.error('Promise.all failed:', error);
		});
	};
}
