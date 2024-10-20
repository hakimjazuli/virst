// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { onViewPort } from './onViewPort.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 */
export class Lifecycle {
	/**
	 * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
	 * @typedef {import('./Let.mjs').Let<MutationRecord[]>} mutationRecordSignal
	 * @typedef {[MutationObserver,
	 * mutationRecordSignal,
	 * documentScope,
	 * ]} documentScopedReturn
	 */
	/**
	 * @private
	 * @type {documentScopedReturn[]}
	 */
	static registeredDocumentScope = [];
	/**
	 * @param {documentScope} documentScope
	 * @return {documentScopedReturn}
	 */
	static createMutationObserver = (documentScope) => {
		const ret = Lifecycle.registeredDocumentScope.filter(
			([MutationObserver, MutationRecordSignal, documentScope_]) => {
				return documentScope_ === documentScope;
			}
		)[0];
		if (ret) {
			return ret;
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
		const ret_ = [documentObserver, documentMutations_, documentScope];
		Lifecycle.registeredDocumentScope.push(ret_);
		return ret_;
	};
	/**
	 * @typedef {Object} autoScopeOptions
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 */
	/**
	 * use for handling out of scoped codeblock:
	 * @param {autoScopeOptions} options
	 * @return {Ping["ping"]}
	 */
	static autoScopedPing = ({ scopedCallback, runCheckAtFirst }) => {
		const documentScope = helper.currentDocumentScope;
		return Lifecycle.scopedPing({
			documentScope,
			scopedCallback,
			runCheckAtFirst,
		});
	};
	/**
	 * @param {Object} options
	 * @param {documentScope} options.documentScope
	 * @param {()=>Promise<void>} options.scopedCallback
	 */
	static shallowScope = async ({ documentScope, scopedCallback: asyncCallback }) => {
		const tempScope_ = helper.currentDocumentScope;
		helper.currentDocumentScope = documentScope;
		await asyncCallback();
		helper.currentDocumentScope = tempScope_;
	};
	/**
	 * @typedef {Object} manualScopeOptions
	 * @property {import('./documentScope.type.mjs').documentScope} documentScope
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 */
	/**
	 * manual scoping for lib internal functionality
	 * @param {manualScopeOptions} options
	 * @returns {Ping["ping"]}
	 */
	static scopedPing = ({ documentScope, scopedCallback, runCheckAtFirst }) => {
		return new Ping(runCheckAtFirst, async () => {
			const currentScope = helper.currentDocumentScope;
			helper.currentDocumentScope = documentScope;
			await scopedCallback();
			helper.currentDocumentScope = currentScope;
		}).ping;
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {()=>Promise<void>} scopedCallback
	 */
	static onParentDCWrapper = async (element, scopedCallback) => {
		/**
		 * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]}
		 */
		const currentOnParentDCCB = (disconnectedCallback) => {
			Lifecycle.setDCCB(element, disconnectedCallback);
		};
		const tempCurrentOnParentDCCB = Lifecycle.currentOnParentDCCB;
		Lifecycle.currentOnParentDCCB = currentOnParentDCCB;
		await scopedCallback();
		Lifecycle.currentOnParentDCCB = tempCurrentOnParentDCCB;
	};
	/**
	 * @private
	 * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	static currentOnParentDCCB = undefined;
	/**
	 * @typedef {{
	 * [attributeName:string]:
	 * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void
	 * }} attributeLifecyclesHandler
	 */
	/**
	 * attributeIdentification
	 * @private
	 * @type {Map<documentScope,attributeLifecyclesHandler>}
	 */
	static ID = new Map();
	/**
	 * @private
	 * @type {documentScope}
	 */
	currentDocumentScope;
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
	 * @type {import('./Let.mjs').Let<MutationRecord[]>}
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
	attributeLifecyclesHandler;
	/**
	 * @private
	 * @type {boolean}
	 */
	isGlobal;
	/**
	 * @param {boolean} isGlobal
	 * @param {attributeLifecyclesHandler} attributeLifecyclesHandler
	 * - allow global attributeName to be handled inside nested `Lifecycle`
	 * @param {documentScope} [manualScope]
	 */
	constructor(isGlobal, attributeLifecyclesHandler, manualScope = undefined) {
		this.isGlobal = isGlobal;
		const documentScope = manualScope ?? helper.currentDocumentScope;
		this.attributeLifecyclesHandler = attributeLifecyclesHandler;
		this.currentDocumentScope = documentScope;
		const [mObs, mLet] = Lifecycle.createMutationObserver(documentScope);
		this.mutationObserver = mObs;
		this.mutationSignal = mLet;
		this.takeRecords = mObs.takeRecords;
		const registeredAttribute = this.isRegisteredMap();
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
			case 'whole':
				this.effect = new $(async (first) => {
					const mutationList = mLet.value;
					if (first) {
						await this.initiator();
						return;
					}
					await this.mutationHandler(mutationList);
				});
				break;
			case 'partial':
				new Ping(true, async () => {
					await this.initiator();
				});
				break;
			default:
				console.error({
					documentScope,
					message: `'${registeredAttribute}' already registered in this 'documentScope'`,
					registeredAttributes: Object.keys(Lifecycle.ID.get(documentScope)),
				});
				break;
		}
	}
	/**
	 * @private
	 * @return {"partial"|"whole"|string}
	 */
	isRegisteredMap = () => {
		const attributeLifecyclesHandler = this.attributeLifecyclesHandler;
		const documentScope = this.currentDocumentScope;
		if (!Lifecycle.ID.has(documentScope)) {
			Lifecycle.ID.set(documentScope, attributeLifecyclesHandler);
			return 'whole';
		}
		const scopedAttribute = Lifecycle.ID.get(documentScope);
		for (const attributeName in attributeLifecyclesHandler) {
			if (!(attributeName in scopedAttribute)) {
				scopedAttribute[attributeName] = attributeLifecyclesHandler[attributeName];
				continue;
			}
			return attributeName;
		}
		return 'partial';
	};
	/**
	 * @private
	 * @returns {Promise<void>}
	 */
	initiator = async () => {
		const attributeLifecyclesHandler = this.attributeLifecyclesHandler;
		const documentScope = this.currentDocumentScope;
		for (const attributeName in attributeLifecyclesHandler) {
			const validAttributeSelector = helper.validAttributeNameSelector(attributeName);
			const elements = documentScope.querySelectorAll(`[${validAttributeSelector}]`);
			for (let i = 0; i < elements.length; i++) {
				await this.addedNodeHandler(elements[i], attributeName);
			}
		}
		await this.callConnectedCallback();
	};
	/**
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	elementCMRefed = [];
	/**
	 * @private
	 * @param {documentScope} node
	 * @returns {boolean}
	 */
	checkValidScoping = (node) => {
		if (this.isGlobal) {
			return true;
		}
		const documentScope = this.currentDocumentScope;
		while (node) {
			if (!Lifecycle.ID.has(node)) {
				node = node.parentElement;
				continue;
			}
			if (node === document) {
				return true;
			}
			if (node !== documentScope) {
				return false;
			}
			return true;
		}
		return true;
	};
	/**
	 * @private
	 * @param {Node} addedNode
	 * @param {string} attributeName
	 */
	addedNodeHandler = async (addedNode, attributeName) => {
		if (
			/** to eliminate repeatition on ANH call */ !(addedNode instanceof HTMLElement) ||
			/** except head resources */ document.head.contains(addedNode) ||
			/** primary criteria */ !('hasAttribute' in addedNode) ||
			!addedNode.hasAttribute(attributeName) ||
			!this.checkValidScoping(addedNode)
		) {
			return;
		}
		/**
		 * @type {import('./lifecycleHandler.type.mjs').lifecycleHandler["onDisconnected"]}
		 */
		const currentOnParentDCCB = (disconnectedCallback) => {
			Lifecycle.setDCCB(addedNode, disconnectedCallback);
		};
		this.attributeLifecyclesHandler[attributeName]({
			onViewPort: (options) => new onViewPort({ element: addedNode, ...options }),
			element: addedNode,
			cloneElement: () => {
				const clonedElement = addedNode.cloneNode(true);
				if (!(clonedElement instanceof HTMLElement)) {
					return;
				}
				clonedElement.removeAttribute(helper.LCCBIdentifier);
				return clonedElement;
			},
			lifecycleObserver: this,
			onConnected: (connectedCallback) => {
				if (addedNode.hasAttribute(helper.LCCBIdentifier)) {
					if (this.isGlobal) {
						return;
					}
					Lifecycle.shallowScope({
						documentScope: addedNode,
						scopedCallback: async () => {
							if (
								helper.removeDOM$ in addedNode &&
								typeof addedNode[helper.removeDOM$] == 'function'
							) {
								addedNode[helper.removeDOM$.toString()]();
							}
							if (helper.DCCBIdentifier in addedNode) {
								addedNode[helper.DCCBIdentifier] = [];
							}
							if (helper.ACCBIdentifier in addedNode) {
								addedNode[helper.ACCBIdentifier] = [];
							}
						},
					});
				}
				addedNode.setAttribute(helper.LCCBIdentifier, '');
				Lifecycle.scopedPing({
					documentScope: addedNode,
					runCheckAtFirst: true,
					scopedCallback: async () => {
						const index = this.elementCMRefed.push(async () => {
							await Lifecycle.onParentDCWrapper(addedNode, async () => {
								Lifecycle.shallowScope({
									documentScope: addedNode,
									scopedCallback: async () => {
										await connectedCallback();
										this.elementCMRefed.splice(index - 1, 1);
									},
								});
							});
						});
					},
				});
			},
			onDisconnected: (disconnectCallback) => {
				Lifecycle.scopedPing({
					documentScope: addedNode,
					runCheckAtFirst: true,
					scopedCallback: async () => {
						await Lifecycle.onParentDCWrapper(addedNode, async () => {
							currentOnParentDCCB(disconnectCallback);
						});
					},
				});
			},
			onAttributeChanged: (attributeChangedCallback) => {
				addedNode.setAttribute(helper.ACCBIdentifier, '');
				Lifecycle.scopedPing({
					documentScope: addedNode,
					runCheckAtFirst: true,
					scopedCallback: async () => {
						await Lifecycle.onParentDCWrapper(addedNode, async () => {
							Lifecycle.setACCB(addedNode, attributeChangedCallback);
						});
					},
				});
			},
		});
	};
	/**
	 * @private
	 */
	callConnectedCallback = async () => {
		/**
		 * already `autoQueued` using `$` in `this.$`
		 */
		await helper.handlePromiseAll(this.elementCMRefed);
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {()=>Promise<void>} disconnectedCallback
	 * @returns {void}
	 */
	static setDCCB = (element, disconnectedCallback) => {
		if (!(helper.DCCBIdentifier in element)) {
			element[helper.DCCBIdentifier] = [];
		}
		element[helper.DCCBIdentifier].push(disconnectedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|(()=>Promise<void>)[]}
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
		element[helper.ACCBIdentifier] = attributeChangedCallback;
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|import('./lifecycleHandler.type.mjs').attributeChangedLifecycle}
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
	 */
	callACCB = async (element, attributeName) => {
		const attributeChangedCallback_ = Lifecycle.getACCB(element);
		if (!attributeChangedCallback_) {
			return;
		}
		await attributeChangedCallback_({
			attributeName,
			newValue: element.getAttribute(attributeName) ?? '',
		});
	};
	/**
	 * @private
	 * @param {MutationRecord[]} mutationList
	 */
	mutationHandler = async (mutationList) => {
		const attributesLifecycle = Lifecycle.ID.get(this.currentDocumentScope);
		for (let i = 0; i < mutationList.length; i++) {
			const mutation = mutationList[i];
			if (mutation.addedNodes) {
				for (let j = 0; j < mutation.addedNodes.length; j++) {
					const addedNode = mutation.addedNodes[j];
					for (const attributeName in attributesLifecycle) {
						await this.addedNodeHandler(addedNode, attributeName);
					}
				}
				await this.callConnectedCallback();
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
	 * @param {HTMLElement}removedNode
	 */
	mutationDCHandler = async (removedNode) => {
		const elements = Lifecycle.findDeepNested(removedNode);
		const disconnectedCallbacks = [];
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			if (!(element instanceof HTMLElement)) {
				continue;
			}
			const disconnectCallback = Lifecycle.getDCCB(element);
			if (disconnectCallback) {
				disconnectedCallbacks.push(...disconnectCallback);
			}
		}
		if (disconnectedCallbacks.length) {
			await helper.handlePromiseAll(disconnectedCallbacks);
		}
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
