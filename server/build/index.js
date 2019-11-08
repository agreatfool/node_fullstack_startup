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
require("reflect-metadata");
const LibPath = require("path");
const common_1 = require("common");
const api_1 = require("./service/api");
const logger_1 = require("./logger/logger");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // init system
    common_1.Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    yield common_1.typeorm.createConnection(common_1.Database.getConnectionOptions());
    logger_1.Logger.get();
    // start server
    const server = new common_1.grpc.Server();
    const host = common_1.Config.get().getRaw().server.httpHost;
    const port = common_1.Config.get().getRaw().server.httpPort;
    server.addService(common_1.GrpcPb.ApiService, new api_1.ApiServiceImpl());
    server.bind(`${host}:${port}`, common_1.grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server started, listening: ${host}:${port}`);
});
startServer().then((_) => _).catch();
process.on("uncaughtException", (err) => {
    console.log(`process on uncaughtException error: ${err}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
//# sourceMappingURL=index.js.map