// @ts-check

import { $ } from '../signals/$.mjs';
import { DefinePageTemplate } from '../utils/DefinePageTemplate.mjs';
import { helper } from '../utils/helper.export.mjs';
import { Let } from '../signals/Let.mjs';
import { onViewPort } from './onViewPort.export.mjs';
import { Ping } from '../queue/Ping.mjs';

/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 * - if there are global `attributeName` `test` are inside nested `Lifecycle`, add `virst-gs` and list of the names of the global `attributeName`, with semicolon `;` as separator;
 * ```html
 * <div test="innerText" virst-gs="test;"></div>
 * ```
 */
export class Lifecycle {
	/**
	 * @typedef {Object} manualScopeOptions
	 * @property {import('./documentScope.type.mjs').documentScope} documentScope
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 * @typedef {(options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void} attributeLifecyclesHandler
	 * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
	 * @typedef {import('../signals/Let.mjs').Let<MutationRecord[]>} mutationRecordSignal
	 * @typedef {{mutationObserver:MutationObserver,
	 * mutationRecordSignal:mutationRecordSignal,
	 * attributeNames:Set<string>
	 * }} documentScopedReturn
	 */
	/**
	 * @param {Object} options
	 * @param {attributeLifecyclesHandler} options.onConnected
	 * @param {string} [options.attributeName]
	 * - allow global attributeName to be handled inside nested `Lifecycle`
	 * @param {documentScope} [options.documentScope]
	 */
	constructor({
		onConnected,
		attributeName = helper.attributeIndexGenerator(),
		documentScope = helper.currentDocumentScope,
	}) {
		new Ping(true, async () => {
			this.attr = attributeName;
			this.onConnected = onConnected;
			this.currentDocumentScope = documentScope;
			const { mutationObserver, mutationRecordSignal } = Lifecycle.createObserver(
				documentScope,
				attributeName
			);
			this.mutationObserver = mutationObserver;
			this.mutationSignal = mutationRecordSignal;
			this.takeRecords = mutationObserver.takeRecords;
			const registeredAttribute = this.isScopeMapped();
			const onParentDisconnceted = Lifecycle.currentOnParentDCCB;
			if (onParentDisconnceted) {
				onParentDisconnceted(async () => {
					this.disconnect();
				});
			}
			switch (registeredAttribute) {
				/**
				 * uses `switch case` over `guard clause` in case of source update that requires additional
				 * check that are making it not possible for early returns
				 */
				case 'newScope':
					this.effect = new $(async (first) => {
						const mutationList = mutationRecordSignal.value;
						if (first) {
							await this.initiator();
							return;
						}
						new Ping(
							true,
							async () => {
								await this.mutationHandler(mutationList);
							},
							{ unique: mutationList }
						);
					});
					break;
				case 'addToScope':
					await this.initiator();
					break;
				default:
					console.error({
						documentScope,
						message: `'${registeredAttribute}' already registered in this 'documentScope'`,
						registeredAttributes: Object.keys(Lifecycle.ID.get(documentScope)),
					});
					break;
			}
		});
	}
	/**
	 * @private
	 * @return {"addToScope"|"newScope"|string}
	 */
	isScopeMapped = () => {
		const documentScope = this.currentDocumentScope;
		if (!Lifecycle.ID.has(documentScope)) {
			Lifecycle.ID.set(documentScope, new Map().set(this.attr, this.onConnected));
			return 'newScope';
		}
		if (this.attr in Lifecycle.ID.get(documentScope)) {
			return this.attr;
		}
		Lifecycle.ID.get(documentScope).set(this.attr, this.onConnected);
		return 'addToScope';
	};
	/**
	 * @private
	 * @returns {Promise<void>}
	 */
	initiator = async () => {
		await this.addedNodeHandler(this.currentDocumentScope, this.attr, true);
	};
	/**
	 * @type {string}
	 */
	attr;
	/**
	 * @private
	 * @type {Map<documentScope, {mutationObserver:MutationObserver,mutationRecordSignal:mutationRecordSignal, attributeNames:Set<string>}>}
	 */
	static registeredDocumentScope = new Map();
	/**
	 * @param {documentScope} documentScope
	 * @param {string} attributeName
	 * @returns {documentScopedReturn}
	 */
	static createObserver = (documentScope, attributeName) => {
		if (Lifecycle.registeredDocumentScope.has(documentScope)) {
			const ret_ = Lifecycle.registeredDocumentScope.get(documentScope);
			if (!ret_.attributeNames.has(attributeName)) {
				ret_.attributeNames.add(attributeName);
			}
			return ret_;
		}
		/**
		 * @type {mutationRecordSignal}
		 */
		// @ts-ignore
		const mutationRecordSignal = Let.dataOnly('');
		const mutationObserver = new MutationObserver((mutationList) => {
			mutationRecordSignal.value = mutationList;
		});
		mutationObserver.observe(documentScope, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		/**
		 * @type {documentScopedReturn}
		 */
		const ret_ = {
			mutationObserver,
			mutationRecordSignal,
			attributeNames: new Set([attributeName]),
		};
		Lifecycle.registeredDocumentScope.set(documentScope, ret_);
		return ret_;
	};
	/**
	 * @param {Object} options
	 * @param {documentScope} options.documentScope
	 * @param {()=>Promise<void>} options.scopedCallback
	 * @returns {Promise<void>}
	 */
	static shallowScope = async ({ documentScope, scopedCallback }) => {
		const tempScope_ = helper.currentDocumentScope;
		helper.currentDocumentScope = documentScope;
		await scopedCallback();
		helper.currentDocumentScope = tempScope_;
	};
	/**
	 * manual scoping for lib internal functionality
	 * @param {manualScopeOptions} options
	 * @returns {Ping["fifo"]}
	 */
	static scopedPing = ({ documentScope, scopedCallback, runCheckAtFirst }) =>
		new Ping(runCheckAtFirst, async () => {
			const currentScope = helper.currentDocumentScope;
			helper.currentDocumentScope = documentScope;
			await scopedCallback();
			helper.currentDocumentScope = currentScope;
		}).fifo;
	/**
	 * @private
	 * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	static currentOnParentDCCB = undefined;
	/**
	 * attributeIdentification
	 * @private
	 * @type {Map<documentScope, Map<string, attributeLifecyclesHandler>>}
	 */
	static ID = new Map();
	/**
	 * @private
	 * @type {documentScope}
	 */
	currentDocumentScope;
	/**
	 * @returns {void}
	 */
	disconnect = () => {
		if (this.effect) {
			this.mutationSignal.remove$(this.effect);
		}
		const documentScope = this.currentDocumentScope;
		if (documentScope !== document) {
			this.mutationObserver.disconnect();
			Lifecycle.ID.delete(documentScope);
		}
	};
	/**
	 * @type {() => MutationRecord[]}
	 */
	takeRecords;
	/**
	 * @private
	 * @type {import('../signals/Let.mjs').Let<MutationRecord[]>}
	 */
	mutationSignal;
	/**
	 * @private
	 * @type {MutationObserver}
	 */
	mutationObserver;
	/**
	 * @private
	 * @type {$}
	 */
	effect;
	/**
	 * @private
	 * @type {attributeLifecyclesHandler}
	 */
	onConnected;
	/**
	 * @private
	 * @param {documentScope} documentScope
	 * @param {HTMLElement} element
	 * @param {string} attributeName
	 * @param {()=>Promise<any>} scopedCallback
	 * @returns {void}
	 */
	static addedNodeScoper = (documentScope, element, attributeName, scopedCallback) => {
		Lifecycle.scopedPing({
			documentScope: element,
			runCheckAtFirst: true,
			scopedCallback: async () => {
				/**
				 * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]}
				 */
				const currentOnParentDCCB = (disconnectedCallback) => {
					Lifecycle.setDCCB(documentScope, element, attributeName, disconnectedCallback);
				};
				const tempCurrentOnParentDCCB = Lifecycle.currentOnParentDCCB;
				Lifecycle.currentOnParentDCCB = currentOnParentDCCB;
				await scopedCallback();
				Lifecycle.currentOnParentDCCB = tempCurrentOnParentDCCB;
			},
		});
	};
	/**
	 * @private
	 * @param {string} attributeName
	 * @param {documentScope} element
	 * @param {documentScope} documentScope
	 */
	checkValidScoping = (attributeName, element, documentScope) => {
		if (element !== documentScope && element !== document) {
			const ref = Lifecycle.registeredDocumentScope.get(element);
			if (ref && ref.attributeNames.has(attributeName)) {
				return false;
			}
			if (element.parentElement) {
				return this.checkValidScoping(attributeName, element.parentElement, documentScope);
			}
		}
		if (!Lifecycle.registeredDocumentScope.has(documentScope)) {
			return false;
		}
		if (!Lifecycle.registeredDocumentScope.get(documentScope).attributeNames.has(attributeName)) {
			return false;
		}
		return true;
	};
	/**
	 * @private
	 * @param {documentScope} addedNode
	 * @param {string} attributeName
	 * @param {boolean} checkChild
	 * @returns {Promise<void>}
	 */
	addedNodeHandler = async (addedNode, attributeName, checkChild) => {
		if (checkChild && 'querySelectorAll' in addedNode) {
			const validAttributeSelector = helper.validAttributeNameSelector(attributeName);
			const elements = addedNode.querySelectorAll(`[${validAttributeSelector}]`);
			for (let i = 0; i < elements.length; i++) {
				await this.addedNodeHandler(elements[i], attributeName, false);
			}
		}
		const currentDocumentScope = this.currentDocumentScope;
		if (
			!(addedNode instanceof HTMLElement) ||
			!('hasAttribute' in addedNode) ||
			!addedNode.hasAttribute(attributeName) ||
			!this.checkValidScoping(attributeName, addedNode, currentDocumentScope)
		) {
			return;
		}
		let currentDCCB = Lifecycle.getDCCB(addedNode);
		if (currentDCCB && currentDCCB.has(attributeName)) {
			const fixValidScoping = [];
			const outOfScope_ = [];
			currentDCCB.get(attributeName).forEach((dccbs, outOfScope) => {
				if (outOfScope === currentDocumentScope) {
					return;
				}
				console.warn({
					warning:
						'you have `element` with `outOfScope` `attributeName`, the `currentDocumentScope` has the same `attributeName`',
					attributeName,
					outOfScope,
					currentDocumentScope,
					LifecycleInstance: this,
				});
				fixValidScoping.push(...Array.from(dccbs));
				outOfScope_.push(outOfScope);
			});
			await helper.handlePromiseAll(this.addedNodeHandler, fixValidScoping);
			for (let i = 0; i < outOfScope_.length; i++) {
				currentDCCB.get(attributeName).delete(outOfScope_[i]);
			}
		}
		const handlers = Lifecycle.ID.get(currentDocumentScope);
		if (!handlers || !handlers.has(attributeName)) {
			return;
		}
		Lifecycle.addedNodeScoper(currentDocumentScope, addedNode, attributeName, async () => {
			if (addedNode.parentElement) {
				handlers.get(attributeName)({
					get isConnected() {
						return addedNode.isConnected;
					},
					swap: (options) => {
						if (!(DefinePageTemplate instanceof DefinePageTemplate)) {
							return;
						}
						DefinePageTemplate.__.swap({ element: addedNode, ...options });
					},
					onViewPort: (options) => new onViewPort({ element: addedNode, ...options }),
					element: addedNode,
					html: (strings, ...values) => {
						const string = helper.literal(strings, ...values);
						return {
							inner: () => {
								addedNode.innerHTML = string;
							},
							string,
						};
					},
					lifecycleObserver: this,
					onDisconnected: async (disconnectCallback) => {
						Lifecycle.setDCCB(currentDocumentScope, addedNode, attributeName, async () => {
							Lifecycle.addedNodeScoper(
								currentDocumentScope,
								addedNode,
								attributeName,
								async () => {
									await disconnectCallback();
								}
							);
						});
					},
					onAttributeChanged: (attributeChangedCallback) => {
						Lifecycle.setACCB(addedNode, attributeName, async (options) => {
							Lifecycle.addedNodeScoper(
								currentDocumentScope,
								addedNode,
								attributeName,
								async () => {
									await attributeChangedCallback(options);
								}
							);
						});
					},
				});
			}
		});
	};
	/**
	 * @private
	 * @param {documentScope} documentScope
	 * @param {HTMLElement} element
	 * @param {string} attributeName
	 * @param {()=>Promise<void>} disconnectedCallback
	 * @returns {Promise<void>}
	 */
	static setDCCB = async (documentScope, element, attributeName, disconnectedCallback) => {
		let currentDCCB = Lifecycle.getDCCB(element);
		if (!currentDCCB) {
			currentDCCB = element[helper.DCCBIdentifier] = new Map();
		}
		if (!currentDCCB.has(attributeName)) {
			currentDCCB.set(attributeName, new Map());
		}
		const attributedDCCB = currentDCCB.get(attributeName);
		if (!attributedDCCB.has(documentScope)) {
			attributedDCCB.set(documentScope, new Set());
		}
		attributedDCCB.get(documentScope).add(disconnectedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|Map<string, Map<documentScope, Set<()=>Promise<void>>>>}
	 */
	static getDCCB = (element) => {
		if (!(helper.DCCBIdentifier in element)) {
			return;
		}
		return element[helper.DCCBIdentifier];
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {string} attributeName
	 * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
	 * @returns {void}
	 */
	static setACCB = (element, attributeName, attributeChangedCallback) => {
		let currentACCB = Lifecycle.getACCB(element);
		if (!currentACCB) {
			currentACCB = element[helper.ACCBIdentifier] = new Map();
		}
		if (!currentACCB.has(attributeName)) {
			currentACCB.set(attributeName, new Set());
		}
		currentACCB.get(attributeName).add(attributeChangedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|Map<string, Set<import('./lifecycleHandler.type.mjs').attributeChangedLifecycle>>}
	 */
	static getACCB = (element) => {
		if (!(helper.ACCBIdentifier in element)) {
			return;
		}
		return element[helper.ACCBIdentifier];
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {string} attributeName
	 * @returns {void}
	 */
	callACCB = (element, attributeName) => {
		const attributeChangedCallback_ = Lifecycle.getACCB(element);
		if (!attributeChangedCallback_) {
			return;
		}
		new Ping(
			true,
			async () => {
				const handlers = [];
				attributeChangedCallback_.forEach(async (mappedACCB) => {
					mappedACCB.forEach((callback) => {
						handlers.push(async () => {
							await callback({
								attributeName,
								newValue: element.getAttribute(attributeName) ?? '',
							});
						});
					});
				});
				await helper.handlePromiseAll(this, handlers);
			},
			{ unique: element }
		);
	};
	/**
	 * @private
	 * @param {MutationRecord[]} mutationList
	 * @returns {Promise<void>}
	 */
	mutationHandler = async (mutationList) => {
		const handler = Lifecycle.ID.get(this.currentDocumentScope);
		for (let i = 0; i < mutationList.length; i++) {
			const mutation = mutationList[i];
			if (mutation.addedNodes) {
				for (let j = 0; j < mutation.addedNodes.length; j++) {
					const addedNode = mutation.addedNodes[j];
					if (handler) {
						handler.forEach(async (_, attributeName) => {
							await this.addedNodeHandler(addedNode, attributeName, true);
						});
					}
				}
			}
			if (mutation.removedNodes) {
				for (let j = 0; j < mutation.removedNodes.length; j++) {
					const removedNode = mutation.removedNodes[j];
					if (!(removedNode instanceof HTMLElement)) {
						continue;
					}
					await this.mutationDCHandler(removedNode);
				}
			}
			if (mutation.type !== 'attributes') {
				continue;
			}
			const target = mutation.target;
			if (target instanceof HTMLElement && mutation.attributeName) {
				this.callACCB(target, mutation.attributeName);
			}
		}
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @returns {void}
	 */
	removeParentOfNestedLCDCCB = (element) => {
		if (Lifecycle.ID.has(element)) {
			element[helper.DCCBIdentifier].set('', [
				async () => {
					Lifecycle.ID.delete(element);
				},
			]);
		}
	};
	/**
	 * @private
	 * @param {HTMLElement}removedNode
	 * @returns {Promise<void>}
	 */
	mutationDCHandler = async (removedNode) => {
		const elements = Lifecycle.findDeepNested(removedNode);
		new Ping(
			true,
			async () => {
				/**
				 * @type {Array<()=>Promise<void>>}
				 */
				const disconnectedCallbacks = [];
				for (let i = 0; i < elements.length; i++) {
					const element = elements[i];
					if (!(element instanceof HTMLElement)) {
						continue;
					}
					this.removeParentOfNestedLCDCCB(element);
					const disconnectCallback = Lifecycle.getDCCB(element);
					if (disconnectCallback) {
						disconnectCallback.forEach((mappedDCCB) => {
							mappedDCCB.forEach((setDCCB) => {
								disconnectedCallbacks.push(...Array.from(setDCCB));
							});
						});
					}
				}
				await helper.handlePromiseAll(this, disconnectedCallbacks);
			},
			{ unique: removedNode }
		);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} node
	 * @param {(Node)[]} found
	 * @returns {(Node)[]}
	 */
	static findDeepNested = (node, found = []) => {
		if (Lifecycle.getDCCB(node)) {
			found.push(node);
		}
		for (let i = 0; i < node.children.length; i++) {
			Lifecycle.findDeepNested(node.children[i], found);
		}
		return found;
	};
}
