// @ts-check

export class MappedSharedObject {
	/**
	 * @type {WeakMap<Element, import('../lifecycle/ElementShouldHave.mjs').ElementShouldHave>}
	 */
	static elements = new WeakMap();
}
