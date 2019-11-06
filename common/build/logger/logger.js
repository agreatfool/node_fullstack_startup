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
    static createLogger() {
        return winston.createLogger({
            levels: winston.config.syslog.levels,
            level: "debug",
            format: winston.format.combine(winston.format.splat(), winston.format.timestamp(), winston.format.prettyPrint(), selfDefinedFormat),
            defaultMeta: {},
        });
    }
    static addTransport(logger, options) {
        return logger.add(new DailyRotateFile(options));
    }
}
exports.Factory = Factory;
//# sourceMappingURL=logger.js.map