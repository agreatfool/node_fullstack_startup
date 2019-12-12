"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LibPath = require("path");
const common_1 = require("common");
class Logger {
    static get() {
        if (!Logger.instance) {
            const logPath = common_1.Config.get().getRaw().server.logPath;
            const logFile = LibPath.isAbsolute(logPath)
                ? LibPath.join(logPath, "server.%DATE%.log")
                : LibPath.join(__dirname, logPath, "server.%DATE%.log");
            Logger.instance = common_1.Logger.Factory.createLoggerCommon();
            common_1.Logger.Factory.addTransport(Logger.instance, {
                filename: logFile,
                datePattern: "YYYY-MM",
                zippedArchive: true,
                maxSize: "30m",
                maxFiles: "14d",
                level: common_1.Config.get().getRaw().log.level,
            });
        }
        return Logger.instance;
    }
    static createDbLogger() {
        const logPath = common_1.Config.get().getRaw().server.logPath;
        const logFile = LibPath.isAbsolute(logPath)
            ? LibPath.join(logPath, "server.typeorm.%DATE%.log")
            : LibPath.join(__dirname, logPath, "server.typeorm.%DATE%.log");
        const instance = common_1.Logger.Factory.createLoggerCommon();
        common_1.Logger.Factory.addTransport(instance, {
            filename: logFile,
            datePattern: "YYYY-MM",
            zippedArchive: true,
            maxSize: "30m",
            maxFiles: "14d",
            level: common_1.Config.get().getRaw().log.level,
        });
        return new common_1.Logger.TypeOrmLogger(instance);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map