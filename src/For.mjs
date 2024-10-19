// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { queueUniqueObject } from './queueUniqueObject.mjs';

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
	 * @typedef {import('./List.mjs').ListArg} ListArg
	 * @typedef {import('./List.mjs').List} List
	 * @typedef {Record<string, Let<string>>} ForData
	 * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
	 * @typedef {Object} childLifeCycleCallback
	 * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onConnected
	 * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onDisconnected
	 * @property {(arg0:{childElement:HTMLElement,ForController:For,attributeName:string, newValue:string})=>Promise<void>} childLifeCycleCallback.onAttributeChanged
	 */
	/**
	 * @param {Object} options
	 * @param {List} options.listInstance
	 * @param {childLifeCycleCallback} options.childLifeCycleCallback
	 * @param {string} [options.attributeName]
	 * @param {number} [options.reRenderDebounceMS]
	 * - parent attributeName
	 */
	constructor({
		listInstance,
		childLifeCycleCallback,
		attributeName = helper.attributeIndexGenerator(),
		reRenderDebounceMS = 0,
	}) {
		this.listInstance = listInstance;
		this.attr = attributeName;
		this.reRenderDebounceMS = reRenderDebounceMS;
		new Lifecycle(true, {
			[attributeName]: async ({ element, onConnected, onDisconnected }) => {
				onConnected(async () => {
					const effect = new $(async (first) => {
						const value = listInstance.value;
						if (first) {
							return;
						}
						this.reRender(value);
					});
					onDisconnected(async () => {
						listInstance.remove$(effect);
					});
					this.onParentConnected(element, childLifeCycleCallback, onDisconnected);
				});
			},
		});
	}
	/**
	 * @private
	 */
	reRenderDebounceMS;
	/**
	 * @private
	 */
	listInstance;
	/**
	 * @private
	 * @param {ListArg[]} value_
	 */
	reRender = (value_) => {
		helper.assignToQUnique(
			new queueUniqueObject(
				`${helper.ForChildAttributePrefix}${this.attr}`,
				async () => {
					const valueLength = value_.length;
					const children = this.parentElement.children;
					let i = 0;
					for (let j = 0; j < valueLength; j++) {
						i++;
						if (children[j]) {
							await Lifecycle.shallowScope({
								documentScope: children[j],
								scopedCallback: async () => {
									const value = this.listInstance.value[j];
									for (const key in this.data[j]) {
										this.data[j][key].value = value[key];
									}
								},
							});
							continue;
						}
						const childElement_ = helper.cloneNode(this.childElement);
						this.parentElement.appendChild(childElement_);
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
				this.reRenderDebounceMS
			)
		);
	};

	/**
	 * @private
	 * @param {HTMLElement} parentElement
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	onParentConnected = (parentElement, childLifeCycleCallback, onParentDisconnected) => {
		this.parentElement = parentElement;
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
		/**
		 * @type {ListArg[]}
		 */
		const listValue = this.listInstance.value;
		this.childElement.setAttribute(`${helper.ForChildAttributePrefix}${this.attr}`, '');
		parentElement.innerHTML = '';
		this.childLifecycle(childLifeCycleCallback, onParentDisconnected);
		for (let i = 0; i < listValue.length; i++) {
			const childElement_ = helper.cloneNode(this.childElement);
			parentElement.appendChild(childElement_);
		}
	};
	/**
	 * @private
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	childLifecycle = (childLifeCycleCallback, onParentDisconnected) => {
		new Lifecycle(false, {
			[`${helper.ForChildAttributePrefix}${this.attr}`]: async ({
				element: childElement,
				lifecycleObserver: childLifecycleObserver,
				onConnected,
				onDisconnected,
				onAttributeChanged,
			}) => {
				onAttributeChanged(async ({ attributeName, newValue }) => {
					await childLifeCycleCallback.onAttributeChanged({
						childElement,
						ForController: this,
						attributeName,
						newValue,
					});
				});
				onConnected(async () => {
					await childLifeCycleCallback.onConnected({
						childElement,
						ForController: this,
					});
					const index = this.getChildElementIndex(childElement);
					/**
					 * @type {ListArg}
					 */
					const data = this.listInstance.value[index];
					if (!this.data[index]) {
						this.data[index] = {};
					}
					for (const dataName in data) {
						await Lifecycle.shallowScope({
							documentScope: childElement,
							scopedCallback: async () => {
								this.data[index][dataName] = new Let(data[dataName], dataName);
								new $(async () => {
									data[dataName] = this.data[index][dataName].value;
								});
							},
						});
					}
					onDisconnected(async () => {
						await childLifeCycleCallback.onDisconnected({
							childElement,
							ForController: this,
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
					onParentDisconnected(async () => {
						childLifecycleObserver.disconnect();
					});
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
