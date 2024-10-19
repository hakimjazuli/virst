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
export class List<ListArg_ extends ListArg> extends Let<ListArg_[]> {
    /**
     * @param {ListArg_[]} value
     */
    constructor(value: ListArg_[]);
    /**
     * @private
     * @param {mutationType} mode
     * @param {number} end
     * @returns {boolean}
     */
    private checkLength;
    /**
     * Appends new data to the end;
     * @param {...ListArg_} listArg
     */
    push: (...listArg: ListArg_[]) => void;
    /**
     * Removes the first data;
     */
    shift: () => void;
    /**
     * Inserts new data at the start;
     * @param  {...ListArg_} listArg
     */
    unshift: (...listArg: ListArg_[]) => void;
    /**
     * For both start and end, a negative index can be used to indicate an offset from the end of the data. For example, -2 refers to the second to last element of the data;
     * @param {number} [start]
     * The beginning index of the specified portion of the data. If start is undefined, then the slice begins at index 0.
     * @param {number} [end]
     * The end index of the specified portion of the data. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the data.
     */
    slice: (start?: number, end?: number) => void;
    /**
     * Replace whole `List` data with new array.
     * @param {ListArg_[]} listArgs
     * - new array in place of the deleted array.
     */
    replace: (listArgs: ListArg_[]) => void;
    /**
     * Removes elements from an data and, if necessary, inserts new elements in their place;
     * @param {number} start
     * - The zero-based location in the data from which to start removing elements.
     * @param {number} deleteCount
     * -The number of elements to remove.
     * @param {...ListArg_} listArg
     * - new data in place of the deleted data.
     */
    splice: (start: number, deleteCount: number, ...listArg: ListArg_[]) => void;
    /**
     * Swap `List` data between two indexes;
     * @param {number} indexA
     * @param {number} indexB
     */
    swap: (indexA: number, indexB: number) => void;
    /**
     * Modify `List` data at specific index;
     * @param {number} index
     * @param {Partial<ListArg_>} listArg
     */
    modify: (index: number, listArg: Partial<ListArg_>) => void;
}
export type ListArg = Record<string, string>;
export type mutationType = "push" | "unshift" | "splice" | "swap" | "modify" | "shift";
import { Let } from './Let.mjs';
