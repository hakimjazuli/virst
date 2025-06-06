// @ts-check

import { $ } from '../signals/$.mjs';
import { helper } from './helper.export.mjs';
import { Let } from '../signals/Let.mjs';

/**
 * @description
 * create named storage (`localStorage` or `sessionStorage`) through class instantiation;
 * - register by putting import this instance on your js `main file`
 */
/**
 * @template {{[localName:string]:string}} Local
 * @template {Extract<keyof Local,string>} LocalKey
 * @template {{[localName:string]:string}} Session
 * @template {Extract<keyof Session,string>} SessionKey
 */
export class DefineStorage {
	/**
	 * @type {DefineStorage}
	 */
	static __;
	/**
	 * @param {Object} data
	 * @param {Local} [data.local]
	 * @param {Session} [data.session]
	 */
	constructor({ local, session }) {
		if (DefineStorage.__ instanceof DefineStorage) {
			helper.warningSingleton(DefineStorage);
			return;
		}
		DefineStorage.__ = this;
		if (local) {
			this.defaultLocal = local;
		}
		if (session) {
			this.defaultSession = session;
		}
		for (const key in local) {
			this.resolve('local', key, local[key]);
		}
		for (const key in session) {
			this.resolve('session', key, session[key]);
		}
		this.autoDeprecate();
	}
	/**
	 * @private
	 * @type { Record<LocalKey,string> }
	 */
	defaultLocal;
	/**
	 * @private
	 * @type { Record<SessionKey,string> }
	 */
	defaultSession;
	/**
	 * @private
	 * @param {string} name
	 * @returns {string}
	 */
	static nameSpace = (name) => {
		return `${helper.storageIdentifier}-${name}`;
	};
	/**
	 * @typedef {Record<LocalKey,Let<string>>} letLocal
	 * @typedef {Record<SessionKey,Let<string>>} letSession
	 * @type {{local:letLocal,session:letSession}}
	 */
	// @ts-ignore
	data = { local: {}, session: {} };
	/**
	 * @private
	 * @param {"session"|"local"} storage
	 * @param {string} name
	 * @param {string} defaultValue
	 */
	resolve = (storage, name, defaultValue) => {
		const name_ = DefineStorage.nameSpace(name);
		let storageMode;
		switch (storage) {
			case 'local':
				storageMode = localStorage;
				break;
			case 'session':
				storageMode = sessionStorage;
				break;
		}
		const keyIsExist = storageMode.getItem(name_);
		const storage_ = storage.toString();
		let store;
		if (keyIsExist) {
			store = this.data[storage_][name] = Let.dataOnly(keyIsExist);
		} else {
			store = this.data[storage_][name] = Let.dataOnly(defaultValue);
		}
		new $(async () => {
			storageMode.setItem(name_, store.value);
		});
	};
	refreshLocal = () => {
		const localKeys = Object.keys(localStorage);
		for (const key of localKeys) {
			if (!key.startsWith(helper.storageIdentifier)) {
				continue;
			}
			localStorage.removeItem(key);
			this.resolve('local', key, this.defaultLocal[key]);
		}
	};
	refreshSession = () => {
		const sessionKeys = Object.keys(sessionStorage);
		for (const key of sessionKeys) {
			if (!key.startsWith(helper.storageIdentifier)) {
				continue;
			}
			sessionStorage.removeItem(key);
			this.resolve('session', key, this.defaultSession[key]);
		}
	};
	refreshBoth = () => {
		this.refreshLocal();
		this.refreshSession();
		this.autoDeprecate();
	};
	/**
	 * @private
	 * delete previously set by app, but no longer on the list;
	 */
	autoDeprecate = () => {
		const sessionKeys = Object.keys(sessionStorage);
		const sessionCompare = Object.keys(this.data.session);
		for (const key of sessionKeys) {
			if (key.startsWith(helper.storageIdentifier) && !sessionCompare.includes(key)) {
				sessionStorage.removeItem(key);
			}
		}
		const localKeys = Object.keys(localStorage);
		const localComapare = Object.keys(this.data.local);
		for (const key of localKeys) {
			if (key.startsWith(helper.storageIdentifier) && !localComapare.includes(key)) {
				localStorage.removeItem(key);
			}
		}
	};
}
