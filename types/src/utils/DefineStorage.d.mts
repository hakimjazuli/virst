/**
 * @description
 * create named storage (`localStorage` or `sessionStorage`) through class instantiation;
 * - register by putting import this instance on your js `main file`
 */
/**
 * @template {{[localName:string]:string}} Local
 * @template {Extract<keyof Local,string>} LocalKey
 * @template {{[localName:string]:string}} Session
 * @template {Extract<keyof Session,string>} SessionKey
 */
export class DefineStorage<Local extends {
    [localName: string]: string;
}, LocalKey extends Extract<keyof Local, string>, Session extends {
    [localName: string]: string;
}, SessionKey extends Extract<keyof Session, string>> {
    /**
     * @type {DefineStorage}
     */
    static __: DefineStorage<any, any, any, any>;
    /**
     * @private
     * @param {string} name
     * @returns {string}
     */
    private static nameSpace;
    /**
     * @param {Object} data
     * @param {Local} [data.local]
     * @param {Session} [data.session]
     */
    constructor({ local, session }: {
        local?: Local;
        session?: Session;
    });
    /**
     * @private
     * @type { Record<LocalKey,string> }
     */
    private defaultLocal;
    /**
     * @private
     * @type { Record<SessionKey,string> }
     */
    private defaultSession;
    /**
     * @typedef {Record<LocalKey,Let<string>>} letLocal
     * @typedef {Record<SessionKey,Let<string>>} letSession
     * @type {{local:letLocal,session:letSession}}
     */
    data: {
        local: { [P in LocalKey]: Let<string>; };
        session: { [P_1 in SessionKey]: Let<string>; };
    };
    /**
     * @private
     * @param {"session"|"local"} storage
     * @param {string} name
     * @param {string} defaultValue
     */
    private resolve;
    refreshLocal: () => void;
    refreshSession: () => void;
    refreshBoth: () => void;
    /**
     * @private
     * delete previously set by app, but no longer on the list;
     */
    private autoDeprecate;
}
import { Let } from '../signals/Let.mjs';
