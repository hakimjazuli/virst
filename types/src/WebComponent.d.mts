/**
 * @description
 * - native web component creation helper;
 * - you can modify `WebComponent.commonStyles` static method to add it on the style tag generated from `onConnectedOptions.styles` before any of `WebComponentInstance` is created;
 */
/**
 * @template {{[key:string]:""}} Props
 * @template {Extract<keyof Props, string>} propKey
 * @template {{[key:string]:""}} Slots
 * @template {Extract<keyof Slots, string>} slotKey
 */
export class WebComponent<Props extends {
    [key: string]: "";
}, propKey extends Extract<keyof Props, string>, Slots extends {
    [key: string]: "";
}, slotKey extends Extract<keyof Slots, string>> {
    /**
     * @type {string[]}
     */
    static commonStyles: string[];
    /**
     * @typedef {Object} onConnectedOptions
     * @property {import('./lifecycleHandler.type.mjs').lifecycleHandler["html"]} html
     * @property {HTMLElement} element
     * @property {(...styles:string[])=>string} styles
     * @property {ShadowRoot} shadowRoot
     * @property {(slotsKey:slotKey)=>string} createSlot
     * @property {Record<Extract<keyof Props, string>, Let<string>>} props
     * @property {(disconnectedCallback:()=>Promise<void>)=>void} onDisconnected
     * @property {(adoptedCallback:()=>Promise<void>)=>void} onAdopted
     * @property {(attributeChangedCallback:(options:{attributeName:propKey,newValue:string,oldValue:string})=>Promise<void>)=>void} onAttributeChange
     * @param {Object} a0
     * @param {string} [a0.tagName]
     * @param {string[]} [a0.commonStyles]
     * use valid/recomended custom HTML web component;
     * - at least one dash `-`;
     * - starts with alphabet;
     * - at least 1 character before and after dash `-`;
     * - all lowerCase;
     * @param {Props} [a0.props]
     * @param {Slots} [a0.slots]
     * @param {(options:onConnectedOptions)=>Promise<void>} [a0.connectedCallback]
     */
    constructor({ tagName, props, slots, connectedCallback, }: {
        tagName?: string;
        commonStyles?: string[];
        props?: Props;
        slots?: Slots;
        connectedCallback?: (options: {
            html: import("./lifecycleHandler.type.mjs").lifecycleHandler["html"];
            element: HTMLElement;
            styles: (...styles: string[]) => string;
            shadowRoot: ShadowRoot;
            createSlot: (slotsKey: slotKey) => string;
            props: Record<Extract<keyof Props, string>, Let<string>>;
            onDisconnected: (disconnectedCallback: () => Promise<void>) => void;
            onAdopted: (adoptedCallback: () => Promise<void>) => void;
            onAttributeChange: (attributeChangedCallback: (options: {
                attributeName: propKey;
                newValue: string;
                oldValue: string;
            }) => Promise<void>) => void;
        }) => Promise<void>;
    });
    /**
     * @typedef {Object} elementOptions
     * @property {Record<Extract<keyof Props, string>, string>} props
     * @property {Record<Extract<keyof Slots, string>, HTMLElement>} slots
     * @param {elementOptions} options
     * @returns {HTMLElement}
     */
    element: ({ props, slots }: {
        props: Record<Extract<keyof Props, string>, string>;
        slots: Record<Extract<keyof Slots, string>, HTMLElement>;
    }) => HTMLElement;
    /**
     * @param {elementOptions} options
     * @returns {string}
     */
    string: (options: {
        props: Record<Extract<keyof Props, string>, string>;
        slots: Record<Extract<keyof Slots, string>, HTMLElement>;
    }) => string;
    /**
     * @type {string}
     */
    tagName: string;
}
import { Let } from './Let.mjs';
