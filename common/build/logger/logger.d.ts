import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { DailyRotateFileTransportOptions as TransportOptions } from "winston-daily-rotate-file";
import { Logger as OrmLogger, QueryRunner } from "typeorm";
export { Logger, LoggerOptions } from "winston";
export { DailyRotateFileTransportOptions as TransportOptions } from "winston-daily-rotate-file";
export { DailyRotateFile };
export interface ILogInfo {
    app: string;
    host: string;
    module: string;
    action: string;
    data: any;
    [key: string]: any;
}
export declare class Factory {
    static createLoggerCommon(): winston.Logger;
    static createLoggerRaw(options: winston.LoggerOptions): winston.Logger;
    static addTransport(logger: winston.Logger, options: TransportOptions): winston.Logger;
}
export declare class TypeOrmLogger implements OrmLogger {
    protected logger: winston.Logger;
    constructor(logger: winston.Logger);
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logSchemaBuild(message: string, queryRunner?: QueryRunner): any;
    logMigration(message: string, queryRunner?: QueryRunner): any;
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any;
}
