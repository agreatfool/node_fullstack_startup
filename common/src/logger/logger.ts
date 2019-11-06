import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import {DailyRotateFileTransportOptions as TransportOptions} from "winston-daily-rotate-file";
import * as moment from "moment";

export {Logger} from "winston";
export {DailyRotateFileTransportOptions as TransportOptions} from "winston-daily-rotate-file";
export {DailyRotateFile};

export interface ILogInfo {
    app: string;
    module: string;
    action: string;
    data: any;

    [key: string]: any;
}

const selfDefinedFormat = winston.format.printf(({level, message, label, timestamp}) => {
    const data = Object.assign({
        level,
        time: moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
    }, message);
    return JSON.stringify(data);
});

export class Factory {
    public static createLogger(): winston.Logger {
        return winston.createLogger({
            levels: winston.config.syslog.levels,
            level: "debug",
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                selfDefinedFormat,
            ),
            defaultMeta: {},
        });
    }

    public static addTransport(logger: winston.Logger, options: TransportOptions): winston.Logger {
        return logger.add(new DailyRotateFile(options));
    }
}
