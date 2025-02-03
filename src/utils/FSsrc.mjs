// @ts-check

import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
import { helper } from './helper.export.mjs';

/**
 * @description
 * - use custom encoding(eg. base64) to replace original file's source path;
 * - usefull when using `web-app` as `View` stack for `desktop-app`, `mobile-app` or other bundle target, removing the need to setup http server to display the file on the `browser`;
 * - register by `App.constructorOptions.defineFSSourceMapper`
 */
export class FSsrc {
	/**
	 * @private
	 * @type {FSsrc}
	 */
	static __;
	/**
	 * @param {(url:string)=>Promise<string>} sourceMapper
	 */
	constructor(sourceMapper) {
		if (FSsrc.__ instanceof FSsrc) {
			helper.warningSingleton(FSsrc);
			return;
		}
		FSsrc.__ = this;
		this.sourceMapper = sourceMapper;
		this.handleFSCsrc();
	}
	/**
	 * @private
	 */
	handleFSCsrc = () => {
		const attributeList = ['href', 'src', 'data', 'xlink:href'];
		for (let i = 0; i < attributeList.length; i++) {
			this.FSSrcLifecycle(attributeList[i]);
		}
	};
	/**
	 * @private
	 * @param {string} attributeName
	 */
	FSSrcLifecycle = (attributeName) => {
		const sourceMapper = this.sourceMapper;
		new Lifecycle({
			attributeName,
			bypassNested: true,
			onConnected: async ({ element, onAttributeChanged }) => {
				const attributeValue = element.getAttribute(attributeName);
				/**
				 * @param {string} attributeValue_
				 */
				const handle = async (attributeValue_) => {
					const newAttribute = await sourceMapper(attributeValue_);
					if (!newAttribute) {
						return;
					}
					element.setAttribute(attributeName, newAttribute);
				};
				onAttributeChanged(async ({ attributeName: attributeName_, newValue }) => {
					if (attributeName_ !== attributeName) {
						return;
					}
					await handle(newValue);
				});
				if (!attributeValue || !this.isFSPath(attributeValue)) {
					return;
				}
				await handle(attributeValue);
			},
		});
	};
	/**
	 * @private
	 * @param {string} path_
	 * @returns {boolean}
	 */
	isFSPath = (path_) => {
		return (
			path_.startsWith('/') || // Unix-like systems (absolute paths)
			path_.startsWith('file://') || // file:// protocol
			/^[a-zA-Z]:\\/.test(path_) || // Windows absolute path (e.g., C:\path)
			/^\\\\/.test(path_) // Windows UNC paths (e.g., \\server\share\path)
		);
	};
}
