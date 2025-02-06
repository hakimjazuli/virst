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
	 * @typedef {[MutationObserver,
	 * mutationRecordSignal
	 * ]} documentScopedReturn
	 */
	/**
	 * @param {Object} options
	 * @param {attributeLifecyclesHandler} options.onConnected
	 * @param {string} [options.attributeName]
	 * - allow global attributeName to be handled inside nested `Lifecycle`
	 * @param {documentScope} [options.documentScope]
	 * @param {boolean} [options.bypassNested]
	 */
	constructor({
		onConnected,
		attributeName = helper.attributeIndexGenerator(),
		documentScope = helper.currentDocumentScope,
		bypassNested = false,
	}) {
		new Ping(true, async () => {
			this.attr = attributeName;
			this.onConnected = onConnected;
			this.currentDocumentScope = documentScope;
			if (bypassNested) {
				this.assignBypass();
			}
			const [mObs, mLet] = Lifecycle.createMutationObserver(documentScope);
			this.mutationObserver = mObs;
			this.mutationSignal = mLet;
			this.takeRecords = mObs.takeRecords;
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
						const mutationList = mLet.value;
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
	 * @type {Map<documentScope, Set<string>>}
	 */
	static bypassNest = new Map();
	/**
	 * @private
	 * @return {"addToScope"|"newScope"|string}
	 */
	isScopeMapped = () => {
		const documentScope = this.currentDocumentScope;
		if (!Lifecycle.ID.has(documentScope)) {
			Lifecycle.ID.set(documentScope, {
				[this.attr]: this.onConnected,
			});
			return 'newScope';
		}
		if (this.attr in Lifecycle.ID.get(documentScope)) {
			return this.attr;
		}
		Lifecycle.ID.get(documentScope)[this.attr] = this.onConnected;
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
	 * @private
	 * @returns {void}
	 */
	assignBypass = () => {
		const attributeName = this.attr;
		const documentScope = this.currentDocumentScope;
		const ref = Lifecycle.bypassNest.get(documentScope);
		if (!ref) {
			Lifecycle.bypassNest.set(documentScope, new Set([attributeName]));
		} else {
			ref.add(attributeName);
		}
	};
	/**
	 * @type {string}
	 */
	attr;
	/**
	 * @private
	 * @type {Map<documentScope, [MutationObserver,mutationRecordSignal]>}
	 */
	static registeredDocumentScope = new Map();
	/**
	 * @param {documentScope} documentScope
	 * @returns {documentScopedReturn}
	 */
	static createMutationObserver = (documentScope) => {
		if (Lifecycle.registeredDocumentScope.has(documentScope)) {
			return Lifecycle.registeredDocumentScope.get(documentScope);
		}
		/**
		 * @type {mutationRecordSignal}
		 */
		// @ts-ignore
		const documentMutations_ = Let.dataOnly('');
		const documentObserver = new MutationObserver((mutationList) => {
			documentMutations_.value = mutationList;
		});
		documentObserver.observe(documentScope, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		/**
		 * @type {documentScopedReturn}
		 */
		const ret_ = [documentObserver, documentMutations_];
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
	 * @type {Map<documentScope,{[attributeName:string]:attributeLifecyclesHandler}>}
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
	 * @param {documentScope} node
	 * @param {string} attributeName
	 * @returns {boolean}
	 */
	checkValidScoping = (node, attributeName) => {
		const tempNode = node;
		if (!(node instanceof HTMLElement)) {
			return false;
		}
		const documentScope = this.currentDocumentScope;
		let isAssigned = false;
		const docRef = Lifecycle.bypassNest.get(documentScope);
		if (docRef) {
			if (docRef.has(attributeName)) {
				node.setAttribute(helper.docScopeElement, '');
				return true;
			}
		}
		while (node) {
			if ('hasAttribute' in node && !node.hasAttribute(helper.docScopeElement)) {
				if (!isAssigned && tempNode === node && 'setAttribute' in tempNode) {
					isAssigned = true;
					tempNode.setAttribute(helper.docScopeElement, '');
				}
				node = node.parentElement;
				continue;
			}
			if (node === documentScope) {
				return true;
			}
			return false;
		}
		/**
		 * this is document node
		 */
		return true;
	};

	/**
	 * @private
	 * @param {HTMLElement} documentScope
	 * @param {()=>Promise<any>} scopedCallback
	 * @returns {void}
	 */
	static addedNodeScoper = (documentScope, scopedCallback) => {
		Lifecycle.scopedPing({
			documentScope,
			runCheckAtFirst: true,
			scopedCallback: async () => {
				/**
				 * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]}
				 */
				const currentOnParentDCCB = (disconnectedCallback) => {
					Lifecycle.setDCCB(documentScope, disconnectedCallback);
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
	 * @type {Map<HTMLElement, Set<string>>}
	 */
	static registeredLCCB = new Map();
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
		if (!(addedNode instanceof HTMLElement)) {
			return;
		}
		if (
			!('hasAttribute' in addedNode) ||
			!addedNode.hasAttribute(attributeName) ||
			!this.checkValidScoping(addedNode, attributeName)
		) {
			return;
		}
		if (Lifecycle.registeredLCCB.has(addedNode)) {
			const checkLCCB = Lifecycle.registeredLCCB.get(addedNode);
			if (checkLCCB.has(attributeName)) {
				return;
			}
			checkLCCB.add(attributeName);
		} else {
			Lifecycle.registeredLCCB.set(addedNode, new Set([attributeName]));
		}
		const handler = Lifecycle.ID.get(this.currentDocumentScope)[attributeName];
		Lifecycle.addedNodeScoper(addedNode, async () => {
			if (addedNode.parentElement) {
				handler({
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
					onDisconnected: (disconnectCallback) => {
						Lifecycle.setDCCB(addedNode, async () => {
							Lifecycle.addedNodeScoper(addedNode, async () => {
								await disconnectCallback();
								Lifecycle.registeredLCCB.delete(addedNode);
							});
						});
					},
					onAttributeChanged: (attributeChangedCallback) => {
						Lifecycle.setACCB(addedNode, async (options) => {
							Lifecycle.addedNodeScoper(addedNode, async () => {
								await attributeChangedCallback(options);
							});
						});
					},
				});
			}
		});
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {()=>Promise<void>} disconnectedCallback
	 * @returns {void}
	 */
	static setDCCB = (element, disconnectedCallback) => {
		if (!(helper.DCCBIdentifier in element)) {
			element[helper.DCCBIdentifier] = new Set();
		}
		element[helper.DCCBIdentifier].add(disconnectedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|Set<()=>Promise<void>>}
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
	 * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
	 * @returns {void}
	 */
	static setACCB = (element, attributeChangedCallback) => {
		if (!(helper.ACCBIdentifier in element)) {
			element[helper.ACCBIdentifier] = new Set();
		}
		element[helper.ACCBIdentifier].add(attributeChangedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|Set<import('./lifecycleHandler.type.mjs').attributeChangedLifecycle>}
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
				attributeChangedCallback_.forEach(async (callback) => {
					handlers.push(async () => {
						await callback({
							attributeName,
							newValue: element.getAttribute(attributeName) ?? '',
						});
					});
				});
				await helper.handlePromiseAll(this, handlers);
			},
			{ unique: attributeName }
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
					for (const attributeName in handler) {
						await this.addedNodeHandler(addedNode, attributeName, true);
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
			element[helper.DCCBIdentifier].add(async () => {
				Lifecycle.ID.delete(element);
			});
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
				const disconnectedCallbacks = [];
				for (let i = 0; i < elements.length; i++) {
					const element = elements[i];
					if (!(element instanceof HTMLElement)) {
						continue;
					}
					this.removeParentOfNestedLCDCCB(element);
					const disconnectCallback = Lifecycle.getDCCB(element);
					if (disconnectCallback) {
						disconnectedCallbacks.push(...disconnectCallback);
					}
				}
				await helper.handlePromiseAll(this, disconnectedCallbacks);
			},
			{ unique: elements }
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
