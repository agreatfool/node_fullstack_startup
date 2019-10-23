#!/usr/bin/env node
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
const LibPath = require("path");
require("reflect-metadata");
const common_1 = require("common");
const api_1 = require("./service/api");
const typeorm_1 = require("typeorm");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // init system
    common_1.Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    yield typeorm_1.createConnection(common_1.Database.getConnectionOptions());
    // start server
    const server = new common_1.grpc.Server();
    server.addService(common_1.GrpcPb.ApiService, new api_1.ApiServiceImpl());
    server.bind("127.0.0.1:50051", common_1.grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("Server started, listening: 127.0.0.1:50051");
});
startServer().then((_) => _).catch();
process.on("uncaughtException", (err) => {
    console.log(`process on uncaughtException error: ${err}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
//# sourceMappingURL=index.js.map