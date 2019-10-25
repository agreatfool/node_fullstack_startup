import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { DailyRotateFileTransportOptions as TransportOptions } from "winston-daily-rotate-file";
export { Logger } from "winston";
export { DailyRotateFileTransportOptions as TransportOptions } from "winston-daily-rotate-file";
export { DailyRotateFile };
export declare class Factory {
    static createLogger(): winston.Logger;
    static addTransport(logger: winston.Logger, options: TransportOptions): winston.Logger;
}
