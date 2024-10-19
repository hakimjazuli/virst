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
    constructor({ listInstance, childLifeCycleCallback, attributeName, reRenderDebounceMS, }: {
        listInstance: import("./List.mjs").List<any>;
        childLifeCycleCallback: {
            onConnected: (arg0: {
                childElement: HTMLElement;
                ForController: For;
            }) => Promise<void>;
            onDisconnected: (arg0: {
                childElement: HTMLElement;
                ForController: For;
            }) => Promise<void>;
            onAttributeChanged: (arg0: {
                childElement: HTMLElement;
                ForController: For;
                attributeName: string;
                newValue: string;
            }) => Promise<void>;
        };
        attributeName?: string;
        reRenderDebounceMS?: number;
    });
    /**
     * @private
     */
    private listInstance;
    /**
     * @type {string}
     */
    attr: string;
    /**
     * @private
     */
    private reRenderDebounceMS;
    /**
     * @private
     * @param {ListArg[]} value_
     */
    private reRender;
    /**
     * @private
     * @param {HTMLElement} parentElement
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private onParentConnected;
    parentElement: HTMLElement;
    childElement: Element;
    /**
     * @private
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private childLifecycle;
    /**
     * @private
     * @param {HTMLElement} childElement
     * @returns {number}
     */
    private getChildElementIndex;
    /**
     * @private
     * @type {ForData[]}
     */
    private data;
}
