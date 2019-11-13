"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
exports.DailyRotateFile = DailyRotateFile;
const moment = require("moment");
const selfDefinedFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    const data = Object.assign({
        level,
        time: moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
    }, message);
    return JSON.stringify(data);
});
class Factory {
    static createLoggerCommon() {
        return winston.createLogger({
            levels: winston.config.syslog.levels,
            level: "debug",
            format: winston.format.combine(winston.format.splat(), winston.format.timestamp(), winston.format.prettyPrint(), selfDefinedFormat),
            defaultMeta: {},
        });
    }
    static createLoggerRaw(options) {
        return winston.createLogger(options);
    }
    static addTransport(logger, options) {
        return logger.add(new DailyRotateFile(options));
    }
}
exports.Factory = Factory;
class TypeOrmLogger {
    constructor(logger) {
        this.logger = logger;
    }
    logQuery(query, parameters, queryRunner) {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logQuery",
            data: { query, parameters },
        });
    }
    logQueryError(error, query, parameters, queryRunner) {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logQueryError",
            data: { error, query, parameters },
        });
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logQuerySlow",
            data: { time, query, parameters },
        });
    }
    logSchemaBuild(message, queryRunner) {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logSchemaBuild",
            data: { message },
        });
    }
    logMigration(message, queryRunner) {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logMigration",
            data: { message },
        });
    }
    log(level, message, queryRunner) {
    }
}
exports.TypeOrmLogger = TypeOrmLogger;
//# sourceMappingURL=logger.js.map