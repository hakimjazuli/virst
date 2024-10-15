/**
 * @description
 * error handling helper;
 * method(s):
 * - `asValue<Ret>(promise:Promise<Ret>)=>Promise<[data:Ret|undefined,error:undefined|Error]>`
 *
 */
export class Error_ {
    /**
     * @template Ret;
     * @param {Promise<Ret>} promise
     * @returns {Promise<[data:Ret|undefined,error:undefined|Error]>}
     */
    static asValue: <Ret>(promise: Promise<Ret>) => Promise<[data: Ret | undefined, error: undefined | Error]>;
}
