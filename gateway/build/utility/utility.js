"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = (code, data) => {
    return {
        code,
        data,
    };
};
exports.validateWithJoi = (schema, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            error: null,
            value: yield schema.validateAsync(data),
        };
    }
    catch (err) {
        return {
            error: err,
            value: null,
        };
    }
});
exports.validateWithJoiMulti = (data) => __awaiter(void 0, void 0, void 0, function* () {
    for (const pattern of data) {
        const { error } = yield exports.validateWithJoi(pattern.schema, pattern.data);
        if (error) {
            return error;
        }
    }
    return null;
});
//# sourceMappingURL=utility.js.map