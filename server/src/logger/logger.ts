import * as LibPath from "path";
import {Config, Logger as CommonLogger} from "common";

export class Logger {
    public static get() {
        if (!Logger.instance) {
            Logger.instance = CommonLogger.Factory.createLoggerCommon();
            CommonLogger.Factory.addTransport(Logger.instance, {
                filename: LibPath.join(__dirname, "../../../logs", "server.%DATE%.log"),
                datePattern: "YYYY-MM",
                zippedArchive: true,
                maxSize: "30m",
                maxFiles: "14d",
                level: Config.get().getRaw().log.level,
            } as CommonLogger.TransportOptions);
        }

        return Logger.instance;
    }

    public static createDbLogger(): CommonLogger.TypeOrmLogger {
        const instance = CommonLogger.Factory.createLoggerCommon();
        CommonLogger.Factory.addTransport(instance, {
            filename: LibPath.join(__dirname, "../../../logs", "server.typeorm.%DATE%.log"),
            datePattern: "YYYY-MM",
            zippedArchive: true,
            maxSize: "30m",
            maxFiles: "14d",
            level: Config.get().getRaw().log.level,
        } as CommonLogger.TransportOptions);

        return new CommonLogger.TypeOrmLogger(instance);
    }

    private static instance: CommonLogger.Logger;
}
