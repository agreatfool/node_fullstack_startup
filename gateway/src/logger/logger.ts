import * as LibPath from "path";
import {Config, Logger as CommonLogger} from "common";

export class Logger {
    public static get() {
        if (!Logger.instance) {
            const logPath = Config.get().getRaw().gateway.logPath;
            const logFile = LibPath.isAbsolute(logPath)
                ? LibPath.join(logPath, "gateway.%DATE%.log")
                : LibPath.join(__dirname, logPath, "gateway.%DATE%.log");

            Logger.instance = CommonLogger.Factory.createLoggerCommon();
            CommonLogger.Factory.addTransport(Logger.instance, {
                filename: logFile,
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
