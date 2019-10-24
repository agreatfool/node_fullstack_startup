"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genCacheKey = (pattern, values) => {
    let result = pattern;
    for (const [key, value] of Object.entries(values)) {
        result = result.replace(key, value);
    }
    return result;
};
//# sourceMappingURL=utility.js.map