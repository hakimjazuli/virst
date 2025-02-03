// @ts-check

import { uniqueVirstQueue } from './Q.mjs';

/**
 * @description
 * function wrapper that turns callback into queued calls
 */
/**
 * @template {Function} F
 * Wraps an async function so calls with the same arguments are queued.
 * @param {F} asyncFn - The async function to be wrapped.
 * @returns {F} - A wrapped function that ensures sequential execution per unique arguments.
 */
export const QueuedBlock =
	(asyncFn) =>
	// @ts-ignore
	async (...args) => {
		const key = JSON.stringify([asyncFn.toString(), args]); // Generate a unique key for the arguments

		// Ensure resolveFn is properly initialized as undefined initially
		/**
		 * @type {(value: any) => void}
		 */
		let resolveFn;

		const next = new Promise((resolve) => {
			resolveFn = resolve; // Assign resolveFn to be called later
		});

		// Get the previous promise in the queue (if any)
		const prev = uniqueVirstQueue.get(key) || Promise.resolve();

		// Set the new promise to the queue
		uniqueVirstQueue.set(key, next);

		try {
			await prev; // Wait for the previous execution with the same arguments
			// @ts-ignore
			return await asyncFn(...args); // Execute the async function
		} finally {
			resolveFn(); // Resolve the current task (ensuring resolveFn is defined)
			uniqueVirstQueue.delete(key); // Cleanup
		}
	};
