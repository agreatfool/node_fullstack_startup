import * as LibPath from "path";
import {Logger as CommonLogger} from "common";

export class Logger {
    public static get() {
        if (!Logger.instance) {
            Logger.instance = CommonLogger.Factory.createLogger();
            CommonLogger.Factory.addTransport(Logger.instance, {

            } as CommonLogger.TransportOptions);
        }

        return Logger.instance;
    }

    private static instance: CommonLogger.Logger;
}
