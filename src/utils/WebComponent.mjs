// @ts-check

import { helper } from './helper.export.mjs';
import { Let } from '../signals/Let.mjs';
import { Lifecycle } from '../lifecycle/Lifecycle.mjs';
import { onViewPort } from '../lifecycle/onViewPort.export.mjs';

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
export class WebComponent {
	/**
	 * @typedef {Object} elementOptions
	 * @property {Record<Extract<keyof Props, string>, string>} [props]
	 * @property {Record<Extract<keyof Slots, string>, HTMLElement>} [slots]
	 * @property {(options:Omit<onConnectedOptions, 'html'|'props'|'slot'|'shadowRoot'>)=>Promise<void>} [onConnected]
	 * @param {elementOptions} options
	 * @returns {HTMLElement}
	 */
	element = ({ props = undefined, slots = undefined, onConnected = undefined }) => {
		if (onConnected) {
			this.onConnected__.push(onConnected);
		}
		const element = document.createElement(this.tagName);
		if (props) {
			for (const propName in props) {
				element.setAttribute(propName, props[propName]);
			}
		}
		if (slots) {
			for (const slotName in slots) {
				const element_ = slots[slotName];
				element_.setAttribute('slot', slotName);
				element.append(element_);
			}
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
	 * @private
	 * @type {((options:onConnectedOptions)=>Promise<void>)[]}
	 */
	onConnected__;
	/**
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	onAdopted__;
	/**
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	onDisconnected__;
	/**
	 * @private
	 * @type {((options:{propName:propKey,newValue:string,oldValue:string})=>Promise<void>)[]}
	 */
	onAttributeChanged__;
	/**
	 * @type {string}
	 */
	tagName;
	/**
	 * @typedef {Object} onConnectedOptions
	 * @property {HTMLElement} element
	 * @property {import('../lifecycle/lifecycleHandler.type.mjs').lifecycleHandler["html"]} html
	 * @property {()=>void} css
	 * @property {ShadowRoot} shadowRoot
	 * @property {(slotsKey:slotKey)=>string} slot
	 * @property {Record<Extract<keyof Props, string>, Let<string>>} props
	 * @property {(disconnectedCallback:()=>Promise<void>)=>void} onDisconnected
	 * @property {(adoptedCallback:()=>Promise<void>)=>void} onAdopted
	 * @property {(onConnected:(options:import('../lifecycle/lifecycleHandler.type.mjs').lifecycleHandler)=>void)=>Lifecycle} newLifecycle
	 * @property {(options:Omit<import('../lifecycle/onViewPortHandler.type.mjs').elementsLCCallbacks,'lifecyclesOnDisconnected'|'element'>)=>void} lifecycleHandler.onViewPort
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
	constructor({
		tagName = helper.attributeIndexGenerator(true),
		// @ts-ignore
		props = {},
		// @ts-ignore
		slots = {},
		onConnected,
	}) {
		this.element({
			onConnected: async ({}) => {},
		});
		this.tagName = tagName;
		const props_ = [];
		for (const prop in props) {
			props_.push(prop);
		}
		const this_ = this;
		this_.onConnected__.push(onConnected);
		window.customElements.define(
			tagName,
			class CustomTag extends HTMLElement {
				static sheet = new CSSStyleSheet();
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
					const sheet = CustomTag.sheet;
					const globalStyles = helper.webComponentGlobalStyles;
					for (let i = 0; i < globalStyles.length; i++) {
						sheet.insertRule(`@import url("${globalStyles[i]}");`, 0);
					}
					this.shadowRoot = this.attachShadow({ mode: 'closed' });
					const template = document.createElement('template');
					template.innerHTML = '';
					this.shadowRoot.appendChild(template.content.cloneNode(true));
					this.scoped(async () => {
						for (const propName in props) {
							this.props[propName] = new Let(
								this.getAttribute(propName) ?? props[propName],
								propName,
								{
									documentScope: this.shadowRoot,
								}
							);
						}
						/**
						 * @type {onConnectedOptions}
						 */
						const options = {
							newLifecycle: (onConnected) =>
								new Lifecycle({
									onConnected,
									documentScope: this,
								}),
							element: this,
							onViewPort: (options) => {
								this_.onDisconnected__.push(
									// @ts-ignore
									new onViewPort({
										element: this,
										...options,
									}).disconnect
								);
							},
							shadowRoot: this.shadowRoot,
							onAdopted: (adoptedCallback_) => {
								this_.onAdopted__.push(adoptedCallback_);
							},
							onDisconnected: (disconnectedCallback_) => {
								this_.onDisconnected__.push(disconnectedCallback_);
							},
							onAttributeChange: (attributeChangedCallback_) => {
								this_.onAttributeChanged__.push(attributeChangedCallback_);
							},
							css: (strings, ...values) => {
								sheet.insertRule(helper.literal(strings, ...values), sheet.cssRules.length);
							},
							html: (strings, ...values) => {
								const string = helper.literal(strings, ...values);
								return {
									inner: () => {
										this.shadowRoot.innerHTML = string;
									},
									string,
								};
							},
							slot: (slotsKey) => {
								return `<slot name="${slotsKey}"><slot>`;
							},
							props: this.props,
						};
						const onConnecteds = this_.onConnected__;
						for (let i = 0; i < onConnecteds.length; i++) {
							await onConnecteds[i](options);
						}
					});
				}
				disconnectedCallback() {
					if (this_.onDisconnected__.length) {
						return;
					}
					this.scoped(async () => {
						const props_ = this.props;
						await helper.handlePromiseAll(this, this_.onDisconnected__);
						for (const propName in props_) {
							props_[propName].removeAll$();
						}
					});
				}
				/**
				 * @param {propKey} propName
				 * @param {string} oldValue
				 * @param {string} newValue
				 */
				attributeChangedCallback(propName, oldValue, newValue) {
					if (oldValue === newValue || !this_.onAttributeChanged__ || !(propName in props_)) {
						return;
					}
					this.scoped(async () => {
						this.props[propName].value = newValue;
						await helper.handlePromiseAll(this, this_.onAttributeChanged__, {
							propName,
							oldValue,
							newValue,
						});
					});
				}
				adoptedCallback() {
					if (!this_.onAdopted__.length) {
						return;
					}
					this.scoped(async () => {
						await helper.handlePromiseAll(this, this_.onAdopted__);
					});
				}
			}
		);
	}
}
