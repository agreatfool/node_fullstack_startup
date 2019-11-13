import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import {DailyRotateFileTransportOptions as TransportOptions} from "winston-daily-rotate-file";
import * as moment from "moment";
import {Logger as OrmLogger, QueryRunner} from "typeorm";

export {Logger, LoggerOptions} from "winston";
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
    public static createLoggerCommon(): winston.Logger {
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

    public static createLoggerRaw(options: winston.LoggerOptions): winston.Logger {
        return winston.createLogger(options);
    }

    public static addTransport(logger: winston.Logger, options: TransportOptions): winston.Logger {
        return logger.add(new DailyRotateFile(options));
    }
}

export class TypeOrmLogger implements OrmLogger {
    protected logger: winston.Logger;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logQuery",
            data: {query, parameters},
        } as ILogInfo);
    }

    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logQueryError",
            data: {error, query, parameters},
        } as ILogInfo);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logQuerySlow",
            data: {time, query, parameters},
        } as ILogInfo);
    }

    public logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logSchemaBuild",
            data: {message},
        } as ILogInfo);
    }

    public logMigration(message: string, queryRunner?: QueryRunner): any {
        this.logger.info({
            app: "server",
            module: "TypeOrmLogger",
            action: "logMigration",
            data: {message},
        } as ILogInfo);
    }

    public log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        console.log(message);
        this.logger.log({
            level,
            message: message.toString(),
        });
    }
}
