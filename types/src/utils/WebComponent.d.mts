/**
 * @description
 * - native web component creation helper;
 * - you can add global css rules by inputing `urls` to `AppInstantiation` `arg0.globalStyles`;
 */
/**
 * @template {{[key:string]:string}} Props
 * @template {Extract<keyof Props, string>} propKey
 * @template {{[key:string]:""}} Slots
 * @template {Extract<keyof Slots, string>} slotKey
 */
export class WebComponent<Props extends {
    [key: string]: string;
}, propKey extends Extract<keyof Props, string>, Slots extends {
    [key: string]: "";
}, slotKey extends Extract<keyof Slots, string>> {
    /**
     * @typedef {Object} onConnectedOptions
     * @property {HTMLElement} element
     * @property {import('../lifecycle/lifecycleHandler.type.mjs').lifecycleHandler["html"]} html
     * @property {(strings:TemplateStringsArray,...values:string[])=>void} css
     * @property {ShadowRoot} shadowRoot
     * @property {(slotsKey:slotKey)=>string} slot
     * @property {Record<Extract<keyof Props, string>, Let<string>>} props
     * @property {(disconnectedCallback:()=>Promise<void>)=>void} onDisconnected
     * @property {(adoptedCallback:()=>Promise<void>)=>void} onAdopted
     * @property {(onConnected:(options:import('../lifecycle/lifecycleHandler.type.mjs').lifecycleHandler)=>void)=>Lifecycle} newLifecycle
     * @property {(onViewCallbackOptions:import('../lifecycle/onViewPortHandler.type.mjs').onViewPortHandler["onViewPort"])=>import('../lifecycle/onViewPort.export.mjs').onViewPort} lifecycleHandler.onViewPort
     * @property {(attributeChangedCallback:(options:{propName:propKey,newValue:string,oldValue:string})=>Promise<void>)=>void} onAttributeChange
     * @param {Object} a0
     * @param {string} [a0.tagName]
     * use valid/recomended custom HTML web component;
     * - at least one dash `-`;
     * - starts with alphabet;
     * - at least 1 character before and after dash `-`;
     * - all lowerCase;
     * @param {string[]} [a0.globalStyles]
     * @param {Props} [a0.props]
     * @param {Slots} [a0.slots]
     * @param {(options:onConnectedOptions)=>Promise<void>} a0.onConnected
     */
    constructor({ tagName, props, slots, onConnected, }: {
        tagName?: string;
        globalStyles?: string[];
        props?: Props;
        slots?: Slots;
        onConnected: (options: {
            element: HTMLElement;
            html: import("../lifecycle/lifecycleHandler.type.mjs").lifecycleHandler["html"];
            css: (strings: TemplateStringsArray, ...values: string[]) => void;
            shadowRoot: ShadowRoot;
            slot: (slotsKey: slotKey) => string;
            props: Record<Extract<keyof Props, string>, Let<string>>;
            onDisconnected: (disconnectedCallback: () => Promise<void>) => void;
            onAdopted: (adoptedCallback: () => Promise<void>) => void;
            newLifecycle: (onConnected: (options: import("../lifecycle/lifecycleHandler.type.mjs").lifecycleHandler) => void) => Lifecycle;
            onViewPort: (onViewCallbackOptions: import("../lifecycle/onViewPortHandler.type.mjs").onViewPortHandler["onViewPort"]) => import("../lifecycle/onViewPort.export.mjs").onViewPort;
            onAttributeChange: (attributeChangedCallback: (options: {
                propName: propKey;
                newValue: string;
                oldValue: string;
            }) => Promise<void>) => void;
        }) => Promise<void>;
    });
    /**
     * @typedef {Object} elementOptions
     * @property {Record<Extract<keyof Props, string>, string>} [props]
     * @property {Record<Extract<keyof Slots, string>, HTMLElement>} [slots]
     * @property {(options:Omit<onConnectedOptions, 'html'|'props'|'slot'|'shadowRoot'>)=>Promise<void>} [onConnected]
     * @param {elementOptions} options
     * @returns {HTMLElement}
     */
    element: ({ props, slots, onConnected }: {
        props?: Record<Extract<keyof Props, string>, string>;
        slots?: Record<Extract<keyof Slots, string>, HTMLElement>;
        onConnected?: (options: Omit<{
            element: HTMLElement;
            html: import("../lifecycle/lifecycleHandler.type.mjs").lifecycleHandler["html"];
            css: (strings: TemplateStringsArray, ...values: string[]) => void;
            shadowRoot: ShadowRoot;
            slot: (slotsKey: slotKey) => string;
            props: Record<Extract<keyof Props, string>, Let<string>>;
            onDisconnected: (disconnectedCallback: () => Promise<void>) => void;
            onAdopted: (adoptedCallback: () => Promise<void>) => void;
            newLifecycle: (onConnected: (options: import("../lifecycle/lifecycleHandler.type.mjs").lifecycleHandler) => void) => Lifecycle;
            onViewPort: (onViewCallbackOptions: import("../lifecycle/onViewPortHandler.type.mjs").onViewPortHandler["onViewPort"]) => import("../lifecycle/onViewPort.export.mjs").onViewPort;
            onAttributeChange: (attributeChangedCallback: (options: {
                propName: propKey;
                newValue: string;
                oldValue: string;
            }) => Promise<void>) => void;
        }, "html" | "props" | "slot" | "shadowRoot">) => Promise<void>;
    }) => HTMLElement;
    /**
     * @param {elementOptions} options
     * @returns {string}
     */
    string: (options: {
        props?: Record<Extract<keyof Props, string>, string>;
        slots?: Record<Extract<keyof Slots, string>, HTMLElement>;
        onConnected?: (options: Omit<{
            element: HTMLElement;
            html: import("../lifecycle/lifecycleHandler.type.mjs").lifecycleHandler["html"];
            css: (strings: TemplateStringsArray, ...values: string[]) => void;
            shadowRoot: ShadowRoot;
            slot: (slotsKey: slotKey) => string;
            props: Record<Extract<keyof Props, string>, Let<string>>;
            onDisconnected: (disconnectedCallback: () => Promise<void>) => void;
            onAdopted: (adoptedCallback: () => Promise<void>) => void;
            newLifecycle: (onConnected: (options: import("../lifecycle/lifecycleHandler.type.mjs").lifecycleHandler) => void) => Lifecycle;
            onViewPort: (onViewCallbackOptions: import("../lifecycle/onViewPortHandler.type.mjs").onViewPortHandler["onViewPort"]) => import("../lifecycle/onViewPort.export.mjs").onViewPort;
            onAttributeChange: (attributeChangedCallback: (options: {
                propName: propKey;
                newValue: string;
                oldValue: string;
            }) => Promise<void>) => void;
        }, "html" | "props" | "slot" | "shadowRoot">) => Promise<void>;
    }) => string;
    /**
     * @private
     * @type {((options:onConnectedOptions)=>Promise<void>)[]}
     */
    private onConnected__;
    /**
     * @private
     * @type {(()=>Promise<void>)[]}
     */
    private onAdopted__;
    /**
     * @private
     * @type {(()=>Promise<void>)[]}
     */
    private onDisconnected__;
    /**
     * @private
     * @type {((options:{propName:propKey,newValue:string,oldValue:string})=>Promise<void>)[]}
     */
    private onAttributeChanged__;
    /**
     * @type {string}
     */
    tagName: string;
}
import { Let } from '../signals/Let.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
