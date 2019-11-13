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
const Koa = require("koa");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // init system
    common_1.Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    yield common_1.typeorm.createConnection(Object.assign({
        logger: logger_1.Logger.createDbLogger(),
    }, common_1.Database.getConnectionOptions()));
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
const startWeb = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new Koa();
    const host = common_1.Config.get().getRaw().server.httpHost;
    const port = common_1.Config.get().getRaw().server.webPort;
    app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield next();
        const rt = ctx.response.get("X-Response-Time");
        const code = ctx.response.status;
        console.log(`${ctx.method} ${ctx.url} - ${code} - ${rt}`);
    }));
    app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        yield next();
        const ms = Date.now() - start;
        ctx.set("X-Response-Time", `${ms}ms`);
    }));
    app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.path === "/health") {
            ctx.status = 200;
            ctx.body = "OK";
        }
        else {
            ctx.status = 200;
            ctx.body = {
                code: 404,
                data: "Resource not found",
            };
        }
        return next();
    }));
    console.log(`Web started, listening: ${host}:${port}`);
    app.listen(port, host);
});
startServer().then(() => startWeb()).then((_) => _).catch();
process.on("uncaughtException", (err) => {
    console.log(`process on uncaughtException error: ${err}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
//# sourceMappingURL=index.js.map