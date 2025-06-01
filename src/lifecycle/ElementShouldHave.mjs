// @ts-check

export class ElementShouldHave {
	/**
	 * @typedef {Map<string, Set<import('./lifecycleHandler.type.mjs').attributeChangedLifecycle>>} attributeChangesCallbacks
	 * @typedef {Map<string, Map<import('./documentScope.type.mjs').documentScope, Set<()=>Promise<void>>>>} disconnectCallbacks
	 * @typedef {Map<string, Set<import('./onViewPortHandler.type.mjs').onViewPortHandler["onViewPort"]>>} viewCallbacks
	 * @typedef {Map<string, Set<import('./onViewPortHandler.type.mjs').onExitViewPortArg0>>} exitViewCallbacks
	 */
	/**
	 * @param {Object} a0
	 * @param {attributeChangesCallbacks} [a0.attributeChangesCallbacks]
	 * @param {disconnectCallbacks} [a0.disconnectCallbacks]
	 * @param {viewCallbacks} [a0.viewCallbacks]
	 * @param {exitViewCallbacks} [a0.exitViewCallbacks]
	 */
	constructor({
		attributeChangesCallbacks = new Map(),
		disconnectCallbacks = new Map(),
		viewCallbacks = new Map(),
		exitViewCallbacks = new Map(),
	}) {
		/**
		 * @public
		 * @type {attributeChangesCallbacks}
		 */
		this.attributeChangesCallbacks = attributeChangesCallbacks;
		/**
		 * @public
		 * @type {disconnectCallbacks}
		 */
		this.disconnectCallbacks = disconnectCallbacks;
		/**
		 * @public
		 * @type {viewCallbacks}
		 */
		this.viewCallbacks = viewCallbacks;
		/**
		 * @public
		 * @type {exitViewCallbacks}
		 */
		this.exitViewCallbacks = exitViewCallbacks;
	}
}
