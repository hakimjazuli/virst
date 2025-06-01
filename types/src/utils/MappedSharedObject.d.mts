export class MappedSharedObject {
    /**
     * @type {WeakMap<Element, import('../lifecycle/ElementShouldHave.mjs').ElementShouldHave>}
     */
    static elements: WeakMap<Element, import("../lifecycle/ElementShouldHave.mjs").ElementShouldHave>;
}
