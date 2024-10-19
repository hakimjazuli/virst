// @ts-check

import { Let } from './Let.mjs';

/**
 * @description
 * - helper class to create list that satisfy
 * `Array<Record<string, string>>`
 * ```js
 * const listExample = new List([
 *      {key1: "test", ...keys},
 *      {key1: "test3", ...keys},
 * ])
 * ```
 * - usefull for `loops`;
 */
/**
 * @typedef {Record<string, string>} ListArg
 * @typedef {'push'|'unshift'|'splice'|'swap'|'modify'|'shift'} mutationType
 */
/**
 * @template {ListArg} ListArg_
 * @extends {Let<ListArg_[]>}
 */
export class List extends Let {
	/**
	 * @param {ListArg_[]} value
	 */
	constructor(value) {
		super(value);
	}
	/**
	 * @private
	 * @param {mutationType} mode
	 * @param {number} end
	 * @returns {boolean}
	 */
	checkLength = (mode, end) => {
		const dataLength = this.value.length;
		if (end >= dataLength) {
			console.error({
				mode,
				end,
				dataLength,
				message: 'list modifier, end is out of dataLength',
			});
			return false;
		}
		return true;
	};
	/**
	 * Appends new data to the end;
	 * @param {...ListArg_} listArg
	 */
	push = (...listArg) => {
		this.value.push(...listArg);
		this.call$();
	};
	/**
	 * Removes the first data;
	 */
	shift = () => {
		this.value.shift();
		this.call$();
	};
	/**
	 * Inserts new data at the start;
	 * @param  {...ListArg_} listArg
	 */
	unshift = (...listArg) => {
		this.value.unshift(...listArg);
		this.call$();
	};
	/**
	 * For both start and end, a negative index can be used to indicate an offset from the end of the data. For example, -2 refers to the second to last element of the data;
	 * @param {number} [start]
	 * The beginning index of the specified portion of the data. If start is undefined, then the slice begins at index 0.
	 * @param {number} [end]
	 * The end index of the specified portion of the data. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the data.
	 */
	slice = (start = undefined, end = undefined) => {
		const deleteCount = end - start + 1;
		this.splice(start, deleteCount);
	};
	/**
	 * Replace whole `List` data with new array.
	 * @param {ListArg_[]} listArgs
	 * - new array in place of the deleted array.
	 */
	replace = (listArgs) => {
		this.splice(0, this.value.length, ...listArgs);
	};
	/**
	 * Removes elements from an data and, if necessary, inserts new elements in their place;
	 * @param {number} start
	 * - The zero-based location in the data from which to start removing elements.
	 * @param {number} deleteCount
	 * -The number of elements to remove.
	 * @param {...ListArg_} listArg
	 * - new data in place of the deleted data.
	 */
	splice = (start, deleteCount, ...listArg) => {
		const end = start + deleteCount - 1;
		if (!this.checkLength('splice', end)) {
			return;
		}
		this.value.splice(start, deleteCount, ...listArg);
		this.call$();
	};
	/**
	 * Swap `List` data between two indexes;
	 * @param {number} indexA
	 * @param {number} indexB
	 */
	swap = (indexA, indexB) => {
		if (!this.checkLength('swap', indexA) || !this.checkLength('swap', indexB)) {
			return;
		}
		[this.value[indexA], this.value[indexB]] = [this.value[indexB], this.value[indexA]];
		this.call$();
	};
	/**
	 * Modify `List` data at specific index;
	 * @param {number} index
	 * @param {Partial<ListArg_>} listArg
	 */
	modify = (index, listArg) => {
		if (!this.checkLength('modify', index)) {
			return;
		}
		for (const key in listArg) {
			this.value[index][key] = listArg[key];
		}
		this.call$();
	};
}
