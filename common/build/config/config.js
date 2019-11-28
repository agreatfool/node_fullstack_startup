"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yaml");
const LibFs = require("fs");
class Config {
    constructor(configPath) {
        try {
            this.config = YAML.parse(LibFs.readFileSync(configPath).toString());
            this.env = {};
        }
        catch (err) {
            throw err;
        }
    }
    static get(configPath) {
        if (!Config.instance) {
            if (!configPath) {
                throw new Error("No config path provided");
            }
            Config.instance = new Config(configPath);
        }
        return Config.instance;
    }
    getRaw() {
        return this.config;
    }
    getEnv(key, defaultVal = "") {
        if (this.env.hasOwnProperty(key)) {
            return this.env[key];
        }
        else {
            const val = process.env.hasOwnProperty(key) ? process.env[key] : defaultVal;
            this.env[key] = val;
            return val;
        }
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map