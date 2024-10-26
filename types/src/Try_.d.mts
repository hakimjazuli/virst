/**
 * @description
 * error as value helper;
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
    static sync: <Ret>(callback: () => Ret) => [data: Ret | undefined, error: undefined | Error];
    /**
     * @template Ret;
     * @param {()=>Promise<Ret>} asyncCallback
     * @returns {Promise<[data:Ret|undefined,error:undefined|Error]>}
     */
    static async: <Ret>(asyncCallback: () => Promise<Ret>) => Promise<[data: Ret | undefined, error: undefined | Error]>;
}
