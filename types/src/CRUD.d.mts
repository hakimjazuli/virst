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
export class CRUD<V> {
    /**
     * @typedef {{asyncCallback:()=>Promise<void>,refreshSignalWithRead:boolean}} asyncCallback
     * @param {Object} options
     * @param {Let<V>} options.signal
     * @param {()=>Promise<V>} options.read
     * @param {asyncCallback} [options.create]
     * @param {asyncCallback} [options.update]
     * @param {asyncCallback} [options.delete_]
     * - uses `delete_`, `delete` is reserved on `destructured` `object`
     */
    constructor({ signal, read, create, update, delete_ }: {
        signal: Let<V>;
        read: () => Promise<V>;
        create?: {
            asyncCallback: () => Promise<void>;
            refreshSignalWithRead: boolean;
        };
        update?: {
            asyncCallback: () => Promise<void>;
            refreshSignalWithRead: boolean;
        };
        delete_?: {
            asyncCallback: () => Promise<void>;
            refreshSignalWithRead: boolean;
        };
    });
    /**
     * @type {Ping["ping"]}
     */
    read: Ping["ping"];
    /**
     * @type {Ping["ping"]}
     */
    create: Ping["ping"];
    /**
     * @type {Ping["ping"]}
     */
    update: Ping["ping"];
    /**
     * @type {Ping["ping"]}
     */
    delete: Ping["ping"];
}
import { Ping } from './Ping.mjs';
import { Let } from './Let.mjs';
