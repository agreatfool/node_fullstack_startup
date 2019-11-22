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
const api_1 = require("../service/api");
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
exports.getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.handleReconnecting = (err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err.message.indexOf("14 UNAVAILABLE: failed to connect to all addresses") !== -1) {
        console.log("Gateway::handleReconnect, gRPC connection failed, start reconnecting ...");
        try {
            yield api_1.ApiService.connect();
            return true;
        }
        catch (err) {
            return false;
        }
    }
    else {
        return false;
    }
});
//# sourceMappingURL=utility.js.map