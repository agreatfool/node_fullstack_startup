export interface IConfig {
    test: boolean;
    log: {
        level: string;
    };
    gateway: {
        listeningHost: string;
        listeningPort: number;
        uiHost: string;
        uiPort: number;
        serviceHost: string;
        servicePort: number;
        serviceName: string;
    };
    server: {
        listeningHost: string;
        listeningPort: number;
        webPort: number;
        serviceHost: string;
        servicePort: number;
        serviceName: string;
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
