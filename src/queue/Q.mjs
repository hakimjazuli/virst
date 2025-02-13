// @ts-check

import { virst } from '../utils/virst.export.mjs';

/**
 * @type {Map<any, Promise<any>>}
 */
export const uniqueVirstQueue = (virst['uniqueVirstQueue'] =
	virst['uniqueVirstQueue'] ?? new Map());

/**
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
 */

/**
 * @description
 * helper methods for creating Promise to block execution code that return { resume } to allow subsequent calls to proceed;
 * ```js
 * const { resume } = await Q.fifo(); // or Q.unique(id)
 * // code
 *  resume(); // before return
 * ```
 */
export class Q {
	/**
	 * @private
	 * @type {Promise<void>}
	 */
	static fifo_ = Promise.resolve();
	/**
	 * Blocks execution for subsequent calls until the current one finishes.
	 * @returns {Promise<{resume:()=>void}>} Resolves when it's safe to proceed, returning a cleanup function
	 */
	static fifo = async () => {
		let resolveFn;
		const next = new Promise((resolve) => {
			resolveFn = resolve;
		});
		const prev = Q.fifo_;
		Q.fifo_ = next;
		await prev;
		return {
			resume: () => {
				resolveFn(); // Resolve the current task
			},
		};
	};
	/**
	 * Ensures that each id has only one task running at a time.
	 * Calls with the same id will wait for the previous call to finish.
	 * @param {anyButUndefined} id
	 * @returns {Promise<{resume:()=>void}>} Resolves when it's safe to proceed for the given id, returning a cleanup function
	 */
	static unique = async (id) => {
		if (!uniqueVirstQueue.has(id)) {
			uniqueVirstQueue.set(id, Promise.resolve());
			let resolveFn;
			const next = new Promise((resolve) => {
				resolveFn = resolve;
			});
			const prev = uniqueVirstQueue.get(id);
			uniqueVirstQueue.set(id, next);
			await prev;
			return {
				resume: () => {
					resolveFn();
					uniqueVirstQueue.delete(id);
				},
			};
		} else {
			const prev = uniqueVirstQueue.get(id);
			await prev;
			return await Q.unique(id);
		}
	};
}
