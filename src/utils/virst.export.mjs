// @ts-check

import { helper } from './helper.export.mjs';

/**
 * @description
 * centralized virst object for lib making
 */
export class virst {
	static get shared() {
		if (!('virst' in window)) {
			helper.createImmutable({ name: 'virst', parent: window });
		}
		return window['virst'];
	}
}
