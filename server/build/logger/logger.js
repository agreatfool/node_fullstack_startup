"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
class Logger {
    static get() {
        if (!Logger.instance) {
            Logger.instance = common_1.Logger.Factory.createLogger();
            common_1.Logger.Factory.addTransport(Logger.instance, {});
        }
        return Logger.instance;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map