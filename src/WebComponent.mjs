// @ts-check

import { helper } from './helper.export.mjs';
import { Let } from './Let.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * native web component creation helper;
 */
/**
 * @template {{[key:string]:""}} Props
 * @template {Extract<keyof Props, string>} propKey
 * @template {{[key:string]:""}} Slots
 * @template {Extract<keyof Slots, string>} slotKey
 */
export class WebComponent {
	/**
	 * @typedef {Object} elementOptions
	 * @property {Record<Extract<keyof Props, string>, string>} props
	 * @property {Record<Extract<keyof Slots, string>, HTMLElement>} slots
	 * @param {elementOptions} options
	 * @returns {HTMLElement}
	 */
	element = ({ props, slots }) => {
		const element = document.createElement(this.tagName);
		for (const propName in props) {
			element.setAttribute(propName, props[propName]);
		}
		for (const slotName in slots) {
			const element_ = slots[slotName];
			element_.setAttribute('slot', slotName);
			element.append(element_);
		}
		return element;
	};
	/**
	 * @param {elementOptions} options
	 * @returns {string}
	 */
	string = (options) => {
		return this.element(options).outerHTML;
	};
	/**
	 * @type {string}
	 */
	tagName;
	/**
	 * @typedef {Object} onConnectedOptions
	 * @property {import('./lifecycleHandler.type.mjs').lifecycleHandler["html"]} html
	 * @property {HTMLElement} element
	 * @property {ShadowRoot} shadowRoot
	 * @property {(slotsKey:slotKey)=>string} createSlot
	 * @property {Record<Extract<keyof Props, string>, Let<string>>} props
	 * @property {(disconnectedCallback:()=>Promise<void>)=>void} onDisconnected
	 * @property {(adoptedCallback:()=>Promise<void>)=>void} onAdopted
	 * @property {(attributeChangedCallback:(options:{attributeName:propKey,newValue:string,oldValue:string})=>Promise<void>)=>void} onAttributeChange
	 * @param {Object} a0
	 * @param {string} [a0.tagName]
	 * use valid/recomended custom HTML web component;
	 * - at least one dash `-`;
	 * - starts with alphabet;
	 * - at least 1 character before and after dash `-`;
	 * - all lowerCase;
	 * @param {Props} [a0.props]
	 * @param {Slots} [a0.slots]
	 * @param {(options:onConnectedOptions)=>Promise<void>} [a0.connectedCallback]
	 */
	constructor({
		tagName = helper.attributeIndexGenerator(true),
		// @ts-ignore
		props = {},
		// @ts-ignore
		slots = {},
		connectedCallback,
	}) {
		this.tagName = tagName;
		const props_ = [];
		for (const prop in props) {
			props_.push(prop);
		}
		/**
		 * @type {()=>Promise<void>}
		 */
		let adoptedCallback__;
		/**
		 * @type {()=>Promise<void>}
		 */
		let disconnectedCallback__;
		/**
		 * @type {(options:{attributeName:propKey,newValue:string,oldValue:string})=>Promise<void>}
		 */
		let attributeChangedCallback__;
		window.customElements.define(
			tagName,
			class extends HTMLElement {
				/**
				 * @type {ShadowRoot}
				 */
				shadowRoot;
				/**
				 * @param {()=>Promise<void>} scopedCallback
				 * @returns {any}
				 */
				scoped = (scopedCallback) => {
					Lifecycle.scopedPing({
						documentScope: this.shadowRoot,
						runCheckAtFirst: true,
						scopedCallback,
					});
				};
				constructor() {
					super();
				}
				static get props() {
					return props_;
				}
				/**
				 * @type {onConnectedOptions["props"]}
				 */
				// @ts-ignore
				props = {};
				connectedCallback() {
					this.shadowRoot = this.attachShadow({ mode: 'open' });
					const template = document.createElement('template');
					template.innerHTML = '';
					this.shadowRoot.appendChild(template.content.cloneNode(true));
					if (!connectedCallback) {
						return;
					}
					this.scoped(async () => {
						for (const propName in props) {
							this.props[propName] = new Let(props[propName], propName, {
								documentScope: this.shadowRoot,
							});
						}
						connectedCallback({
							element: this,
							shadowRoot: this.shadowRoot,
							onAdopted: (adoptedCallback_) => {
								adoptedCallback__ = adoptedCallback_;
							},
							onDisconnected: (disconnectedCallback_) => {
								disconnectedCallback__ = disconnectedCallback_;
							},
							onAttributeChange: (attributeChangedCallback_) => {
								attributeChangedCallback__ = attributeChangedCallback_;
							},
							html: (strings, ...values) => {
								// @ts-ignore
								Lifecycle.html(this.shadowRoot, strings, ...values);
							},
							createSlot: (slotsKey) => {
								return `<slot name="${slotsKey}"><slot>`;
							},
							props: this.props,
						});
					});
				}
				disconnectedCallback() {
					if (disconnectedCallback__) {
						return;
					}
					this.scoped(disconnectedCallback__);
				}
				/**
				 * @param {propKey} propName
				 * @param {string} oldValue
				 * @param {string} newValue
				 */
				attributeChangedCallback(propName, oldValue, newValue) {
					if (
						oldValue === newValue ||
						!attributeChangedCallback__ ||
						!(propName in props_)
					) {
						return;
					}
					this.scoped(async () => {
						this.props[propName].value = newValue;
						await attributeChangedCallback__({
							attributeName: propName,
							newValue,
							oldValue,
						});
					});
				}
				adoptedCallback() {
					if (!adoptedCallback__) {
						return;
					}
					this.scoped(adoptedCallback__);
				}
			}
		);
	}
}
