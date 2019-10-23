"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yaml");
const LibFs = require("fs");
class Config {
    constructor(configPath) {
        try {
            this.config = YAML.parse(LibFs.readFileSync(configPath).toString());
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
}
exports.Config = Config;
//# sourceMappingURL=config.js.map