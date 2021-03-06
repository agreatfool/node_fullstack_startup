import * as YAML from "yaml";
import * as LibFs from "fs";

export interface IConfig {
    test: boolean;
    log: {
        level: string,
    };
    gateway: {
        listeningHost: string,
        listeningPort: number,
        uiHost: string,
        uiPort: number,
        servicePort: number,
        serviceName: string,
        logPath: string,
    };
    server: {
        listeningHost: string,
        listeningPort: number,
        webPort: number,
        servicePort: number,
        serviceName: string,
        logPath: string,
    };
    database: {
        type: string,
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
        charset: string,
        synchronize: boolean,
        cache: {
            type: string,
            options: {
                host: string,
                port: number,
            },
            duration: number,
        },
    };
}

export class Config {
    public static get(configPath?: string): Config {
        if (!Config.instance) {
            if (!configPath) {
                throw new Error("No config path provided");
            }
            Config.instance = new Config(configPath);
        }

        return Config.instance;
    }

    private static instance: Config;
    private readonly config: IConfig;
    private readonly env: { [key: string]: any };

    constructor(configPath: string) {
        try {
            this.config = YAML.parse(LibFs.readFileSync(configPath).toString());
            this.env = {};
        } catch (err) {
            throw err;
        }
    }

    public getRaw(): IConfig {
        return this.config;
    }

    public getEnv(key: string, defaultVal: any = ""): any {
        if (this.env.hasOwnProperty(key)) {
            return this.env[key];
        } else {
            const val = process.env.hasOwnProperty(key) ? process.env[key] : defaultVal;
            this.env[key] = val;
            return val;
        }
    }
}
