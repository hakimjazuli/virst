/**
 * @description
 * helper class for registering and postMessage to webWorker
 * ```js
 * const worker = new WorkerMainThread(options);
 * worker.postMessage(message);
 * ```
 */
export class WorkerMainThread {
    /**
     * Initializes a Web Worker from a script path and sets up message handlers.
     * @param {Object} options - Configuration options for the main thread.
     * @param {string} options.workerPath - The path to the worker script file.
     * @param {Object} options.onMessage - An object containing success and error handlers for messages.
     * @param {(event:MessageEvent)=>void} options.onMessage.success - A callback function to handle successful messages from the worker.
     * @param {(event:MessageEvent)=>void} options.onMessage.error - A callback function to handle errors from the worker.
     */
    constructor({ workerPath, onMessage }: {
        workerPath: string;
        onMessage: {
            success: (event: MessageEvent) => void;
            error: (event: MessageEvent) => void;
        };
    });
    /**
     * @type {Worker}
     */
    worker: Worker;
    /**
     * @type {(message: any, options?: StructuredSerializeOptions)=>void}
     */
    postMessage: (message: any, options?: StructuredSerializeOptions) => void;
}
