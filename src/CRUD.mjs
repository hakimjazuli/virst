// @ts-check

import { Let } from './Let.mjs';
import { List } from './List.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * CRUD wrapper class;
 * - `signal` will be updated from returned value of `read`;
 * - `read` will be called after calling `thisInstance`.`create`/`update`/`delete_`,
 *    that have `true` `refreshSignal`;
 *
/**
 * @template V
 */
export class CRUD {
	/**
	 * @typedef {{asyncCallback:()=>Promise<void>,refreshSignal:boolean}} asyncCallback
	 * @param {Object} options
	 * @param {Let<V>} options.signal
	 * @param {()=>Promise<V>} options.read
	 * @param {asyncCallback} [options.create]
	 * @param {asyncCallback} [options.update]
	 * @param {asyncCallback} [options.delete_]
	 */
	constructor({ signal, read, create = undefined, update = undefined, delete_ = undefined }) {
		if (signal instanceof List) {
			this.read = new Ping(false, async () => {
				// @ts-ignore
				signal.replace(await read());
			}).ping;
		} else if (signal instanceof Let) {
			this.read = new Ping(false, async () => {
				signal.value = await read();
			}).ping;
		} else {
			return;
		}
		/**
		 * @type {Record<string, asyncCallback>}
		 */
		const mapped = {
			create: create,
			update: update,
			delete: delete_,
		};
		for (const name in mapped) {
			if (mapped[name]) {
				this[name] = new Ping(false, async () => {
					const source = mapped[name];
					await source.asyncCallback();
					if (source.refreshSignal) {
						this.read();
					}
				}).ping;
			} else {
				this[name] = () => {
					console.warn({
						message: `this CRUD.intstance has no defined "${name}" method`,
					});
				};
			}
		}
	}
	/**
	 * @type {Ping["ping"]}
	 */
	read;
	/**
	 * @type {Ping["ping"]}
	 */
	create;
	/**
	 * @type {Ping["ping"]}
	 */
	update;
	/**
	 * @type {Ping["ping"]}
	 */
	delete;
}
