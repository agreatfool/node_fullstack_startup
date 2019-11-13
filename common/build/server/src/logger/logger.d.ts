import { Logger as CommonLogger } from "common";
export declare class Logger {
    static get(): CommonLogger.Logger;
    private static instance;
}
