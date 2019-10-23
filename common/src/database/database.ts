import {ConnectionOptions} from "typeorm";
import * as LibPath from "path";
import {Config} from "..";

export class Database {
    public static getConnectionOptions(): ConnectionOptions {
        return Object.assign({
            entities: [
                LibPath.join(__dirname, "..", "model", "**", "*.js"),
            ],
        }, Config.get().getRaw().database) as ConnectionOptions;
    }
}
