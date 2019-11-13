"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LibPath = require("path");
const common_1 = require("common");
class Logger {
    static get() {
        if (!Logger.instance) {
            Logger.instance = common_1.Logger.Factory.createLoggerCommon();
            common_1.Logger.Factory.addTransport(Logger.instance, {
                filename: LibPath.join(__dirname, "../../../logs", "server.%DATE%.log"),
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
        const instance = common_1.Logger.Factory.createLoggerCommon();
        common_1.Logger.Factory.addTransport(instance, {
            filename: LibPath.join(__dirname, "../../../logs", "server.typeorm.%DATE%.log"),
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