"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LibPath = require("path");
const __1 = require("..");
class Database {
    static getConnectionOptions() {
        return Object.assign({
            entities: [
                LibPath.join(__dirname, "..", "model", "**", "*.js"),
            ],
        }, __1.Config.get().getRaw().database);
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map