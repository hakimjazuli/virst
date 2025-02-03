// @ts-check

import { $ } from '../signals/$.mjs';
import { helper } from './helper.export.mjs';
import { Let } from '../signals/Let.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
import { queueUnique } from '../queue/queueUnique.mjs';
import { queueUniqueObject } from '../queue/queueUniqueObject.mjs';

/**
 * @description
 * - assign element to loop through ['List'](#list) as data to render child element using class instantiation;
 * - loped childElement:
 * > - must have `HTMLElement` as first children;
 * > - only first children will be used to loop through `List`, all other children will be deleted from the dom before `onConnected` event of parentElement;
 * - use `ListInstance` `method` helpers to mutate the data;
 */
export class For {
	/**
	 * @typedef {import('../signals/List.mjs').ListArg} ListArg
	 * @typedef {import('../signals/List.mjs').List} List
	 * @typedef {Record<string, Let<string>>} ForData
	 * @typedef {import('../lifecycle/lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
	 * @typedef {Object} childLifeCycleCallback
	 * @property {(arg0:{element:HTMLElement,ForInstance:For})=>Promise<void>} [childLifeCycleCallback.onConnected]
	 * @property {(arg0:{element:HTMLElement,ForInstance:For})=>Promise<void>} [childLifeCycleCallback.onDisconnected]
	 * @property {(arg0:{element:HTMLElement,ForInstance:For,attributeName:string, newValue:string})=>Promise<void>} [childLifeCycleCallback.onAttributeChanged]
	 */
	/**
	 * @param {Object} options
	 * @param {List} options.listInstance
	 * @param {childLifeCycleCallback} [options.childLifeCycleCallback]
	 * @param {string} [options.attributeName]
	 * @param {boolean} [options.incrementalRender]
	 * handling mode for how to render (when component is increasing the child number)
	 * - false `default`: render all at once, it's fast however have problem of large `Cumulative Layout Shifts`;
	 * - true: update things, incrementally, slightly slower, optimal for:
	 * > - lower number;
	 * > - `paginated` style page;
	 * > - infinite scroll, where you load only few at a times incrementally;
	 */
	constructor({
		listInstance,
		childLifeCycleCallback = {},
		attributeName = helper.attributeIndexGenerator(),
		incrementalRender = false,
	}) {
		this.listInstance = listInstance;
		this.attr = attributeName;
		this.incrementalRender = incrementalRender;
		new Lifecycle({
			attributeName,
			onConnected: async ({ element, onDisconnected }) => {
				const effect = new $(async (first) => {
					const value = listInstance.value;
					if (first) {
						await this.onParentConnected(
							element,
							childLifeCycleCallback,
							onDisconnected
						);
						return;
					}
					this.reRender(value);
				});
				onDisconnected(async () => {
					listInstance.remove$(effect);
				});
			},
		});
	}
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	childElement;
	/**
	 * @private
	 */
	incrementalRender;
	/**
	 * @private
	 */
	listInstance;
	/**
	 * @private
	 * @param {ListArg[]} value_
	 */
	reRender = (value_) => {
		queueUnique.assign(
			new queueUniqueObject(
				`${helper.ForChildAttributePrefix}${this.attr}`,
				async () => {
					const valueLength = value_.length;
					const children = this.parentElement.children;
					let i = 0;
					for (let j = 0; j < valueLength; j++) {
						i++;
						if (children[j]) {
							if (this.data[j]) {
								const value = this.listInstance.value[j];
								const data = this.data[j];
								for (const key in data) {
									this.data[j][key].value = value[key];
								}
							}
							continue;
						}
						const childElement_ = this.childElement.cloneNode(true);
						this.parentElement.appendChild(childElement_);
						if (this.incrementalRender) {
							await helper.timeout(0);
						}
					}
					for (let j = i; j < children.length; j++) {
						await Lifecycle.shallowScope({
							documentScope: children[j],
							scopedCallback: async () => {
								const value = this.listInstance.value[j];
								for (const key in value) {
									this.data[j][key].unRef();
								}
								children[j].remove();
							},
						});
					}
				},
				0
			)
		);
	};
	/**
	 * @private
	 * @param {HTMLElement} parentElement
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	onParentConnected = async (parentElement, childLifeCycleCallback, onParentDisconnected) => {
		this.parentElement = parentElement;
		// @ts-ignore
		this.childElement = parentElement.children[0];
		if (!this.childElement) {
			console.error({
				parentElement: this.parentElement,
				childElement: this.childElement,
				message: 'no `childElement` in the `parentElement`',
				solution: 'create `HTMLElement` as children[0] of `parentElement`',
			});
			return;
		}
		this.childElement.setAttribute(`${helper.ForChildAttributePrefix}${this.attr}`, '');
		this.childLifecycle(childLifeCycleCallback, onParentDisconnected);
		this.childElement.remove();
		this.listInstance.replace(this.listInstance.value);
	};
	/**
	 * @private
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	childLifecycle = (childLifeCycleCallback, onParentDisconnected) => {
		new Lifecycle({
			bypassNested: true,
			attributeName: `${helper.ForChildAttributePrefix}${this.attr}`,
			documentScope: this.parentElement,
			onConnected: async ({
				element: childElement,
				lifecycleObserver: childLifecycleObserver,
				onDisconnected,
				onAttributeChanged,
			}) => {
				if (childLifeCycleCallback.onAttributeChanged) {
					onAttributeChanged(async ({ attributeName, newValue }) => {
						await childLifeCycleCallback.onAttributeChanged({
							element: childElement,
							ForInstance: this,
							attributeName,
							newValue,
						});
					});
				}
				if (childLifeCycleCallback.onConnected) {
					await childLifeCycleCallback.onConnected({
						element: childElement,
						ForInstance: this,
					});
				}
				const index = this.getChildElementIndex(childElement);
				/**
				 * @type {ListArg}
				 */
				const data = this.listInstance.value[index];
				if (!this.data[index]) {
					this.data[index] = {};
				}
				for (const dataName in data) {
					this.data[index][dataName] = new Let(data[dataName], dataName, {
						documentScope: childElement,
					});
					new $(async () => {
						data[dataName] = this.data[index][dataName].value;
					});
				}
				if (childLifeCycleCallback.onDisconnected) {
					onDisconnected(async () => {
						await childLifeCycleCallback.onDisconnected({
							element: childElement,
							ForInstance: this,
						});
						/**
						 * - prever to handle unreferencing at data level;
						 * - on fullRender;
						// for (const dataName in data) {
						// 	let_[dataName].unRef();
						// 	let_[dataName] = null;
						// }
						 */
					});
				}
				onParentDisconnected(async () => {
					childLifecycleObserver.disconnect();
				});
			},
		});
	};
	/**
	 * @private
	 * @param {HTMLElement} childElement
	 * @returns {number}
	 */
	getChildElementIndex(childElement) {
		const parentElement = this.parentElement;
		const children = Array.from(parentElement.children);
		const index = children.indexOf(childElement);
		/**
		 * no imediate return for debugging if neccessary;
		 */
		return index;
	}
	/**
	 * @private
	 * @type {ForData[]}
	 */
	data = [];
	/**
	 * @type {string}
	 */
	attr;
}
