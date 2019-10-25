import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import {DailyRotateFileTransportOptions as TransportOptions} from "winston-daily-rotate-file";

export {Logger} from "winston";
export {DailyRotateFileTransportOptions as TransportOptions} from "winston-daily-rotate-file";
export {DailyRotateFile};

export class Factory {
    public static createLogger(): winston.Logger {
        return winston.createLogger({
            levels: winston.config.syslog.levels,
            level: "debug",
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
            ),
            defaultMeta: {},
        });
    }

    public static addTransport(logger: winston.Logger, options: TransportOptions): winston.Logger {
        return logger.add(new DailyRotateFile(options));
    }
}
