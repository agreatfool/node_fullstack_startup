"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const redis = require("redis");
class Cache {
    static get() {
        if (!Cache.client) {
            Cache.client = redis.createClient(common_1.Config.get().getRaw().database.cache.options);
        }
        return Cache.client;
    }
}
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map