import {RedisClient} from "redis";
import {Config} from "common";

const redis = require("redis");

export class Cache {
    public static get(): RedisClient {
        if (!Cache.client) {
            Cache.client = redis.createClient(Config.get().getRaw().database.cache.options);
        }
        return Cache.client;
    }

    private static client: RedisClient;
}
