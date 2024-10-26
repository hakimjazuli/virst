/**
 * @description
 * CRUD wrapper class;
 * - `signal` will be updated from returned value of `read`;
 * - `read` will be called after calling `thisInstance`.`create`/`update`/`delete_` that have `true` `updateRead`;
/**
 * @template V
 */
export class CRUD<V> {
    /**
     * @typedef {{asyncCallback:()=>Promise<void>,updateRead:boolean}} asyncCallback
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
            updateRead: boolean;
        };
        update?: {
            asyncCallback: () => Promise<void>;
            updateRead: boolean;
        };
        delete_?: {
            asyncCallback: () => Promise<void>;
            updateRead: boolean;
        };
    });
    /**
     * @type {Ping["fifo"]}
     */
    read: Ping["fifo"];
    /**
     * @type {Ping["fifo"]}
     */
    create: Ping["fifo"];
    /**
     * @type {Ping["fifo"]}
     */
    update: Ping["fifo"];
    /**
     * @type {Ping["fifo"]}
     */
    delete: Ping["fifo"];
}
import { Ping } from './Ping.mjs';
import { Let } from './Let.mjs';
