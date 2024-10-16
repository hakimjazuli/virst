// @ts-check

/**
 * @description
 * error handling helper;
 * method(s):
 * - async;
 * - sync;
 */
export class Try_ {
	/**
	 * @template Ret;
	 * @param {()=>Ret} callback
	 * @returns {[data:Ret|undefined,error:undefined|Error]}
	 */
	static sync = (callback) => {
		try {
			const data = callback();
			return [data, undefined];
		} catch (error) {
			return [undefined, error];
		}
	};
	/**
	 * @template Ret;
	 * @param {()=>Promise<Ret>} asyncCallback
	 * @returns {Promise<[data:Ret|undefined,error:undefined|Error]>}
	 */
	static async = async (asyncCallback) => {
		try {
			const data = await asyncCallback();
			return [data, undefined];
		} catch (error) {
			return [undefined, error];
		}
	};
}
