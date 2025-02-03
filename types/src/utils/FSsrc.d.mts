/**
 * @description
 * - use custom encoding(eg. base64) to replace original file's source path;
 * - usefull when using `web-app` as `View` stack for `desktop-app`, `mobile-app` or other bundle target, removing the need to setup http server to display the file on the `browser`;
 * - register by `App.constructorOptions.defineFSSourceMapper`
 */
export class FSsrc {
    /**
     * @private
     * @type {FSsrc}
     */
    private static __;
    /**
     * @param {(url:string)=>Promise<string>} sourceMapper
     */
    constructor(sourceMapper: (url: string) => Promise<string>);
    sourceMapper: (url: string) => Promise<string>;
    /**
     * @private
     */
    private handleFSCsrc;
    /**
     * @private
     * @param {string} attributeName
     */
    private FSSrcLifecycle;
    /**
     * @private
     * @param {string} path_
     * @returns {boolean}
     */
    private isFSPath;
}
