import * as LibPath from "path";
import {Config, Logger as CommonLogger} from "common";

export class Logger {
    public static get() {
        if (!Logger.instance) {
            Logger.instance = CommonLogger.Factory.createLoggerCommon();
            CommonLogger.Factory.addTransport(Logger.instance, {
                filename: LibPath.join(__dirname, "../../../logs", "gateway.%DATE%.log"),
                datePattern: "YYYY-MM",
                zippedArchive: true,
                maxSize: "30m",
                maxFiles: "14d",
                level: Config.get().getRaw().log.level,
            } as CommonLogger.TransportOptions);
        }

        return Logger.instance;
    }

    private static instance: CommonLogger.Logger;
}
