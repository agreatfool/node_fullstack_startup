export interface IConfig {
    test: boolean;
    log: {
        level: string;
    };
    gateway: {
        httpHost: string;
        httpPort: number;
        publicHost: string;
        publicPort: number;
    };
    server: {
        httpHost: string;
        httpPort: number;
        publicHost: string;
        publicPort: number;
        webPort: number;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        charset: string;
        synchronize: boolean;
        cache: {
            type: string;
            options: {
                host: string;
                port: number;
            };
            duration: number;
        };
    };
    consul: {
        client: {
            host: string;
            port: number;
        };
    };
}
export declare class Config {
    static get(configPath?: string): Config;
    private static instance;
    private readonly config;
    constructor(configPath: string);
    getRaw(): IConfig;
}
