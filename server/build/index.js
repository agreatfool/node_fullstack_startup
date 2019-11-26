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
const SERVICE_HOST = process.env.hasOwnProperty("SERVICE_HOST") ? process.env.SERVICE_HOST : "";
const CONSUL_HOST = process.env.hasOwnProperty("CONSUL_HOST") ? process.env.CONSUL_HOST : "";
const CONSUL_PORT = process.env.hasOwnProperty("CONSUL_PORT") ? process.env.CONSUL_PORT : "";
if (!SERVICE_HOST || !CONSUL_HOST || !CONSUL_PORT) {
    throw new Error("server: env variable missing ...");
}
const serviceId = common_1.uniqid();
const consul = new common_1.Consul({
    host: CONSUL_HOST,
    port: CONSUL_PORT,
    promisify: true,
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // init system
    common_1.Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    yield common_1.typeorm.createConnection(Object.assign({
        logger: logger_1.Logger.createDbLogger(),
    }, common_1.Database.getConnectionOptions()));
    logger_1.Logger.get();
    // start server
    const server = new common_1.grpc.Server();
    const host = common_1.Config.get().getRaw().server.listeningHost;
    const port = common_1.Config.get().getRaw().server.listeningPort;
    server.addService(common_1.GrpcPb.ApiService, new api_1.ApiServiceImpl());
    server.bind(`${host}:${port}`, common_1.grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server started, listening: ${host}:${port}`);
});
const startWeb = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new Koa();
    const host = common_1.Config.get().getRaw().server.listeningHost;
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
const register = () => __awaiter(void 0, void 0, void 0, function* () {
    const serverConf = common_1.Config.get().getRaw().server;
    yield consul.agent.service.register({
        name: serverConf.serviceName,
        id: serviceId,
        address: SERVICE_HOST,
        port: serverConf.servicePort,
        check: {
            http: `http://${SERVICE_HOST}:${serverConf.webPort}/health`,
            interval: "10s",
            ttl: "15s",
        },
    });
});
const cleanup = (done) => {
    consul.agent.service.deregister(serviceId)
        .then(() => {
        console.log("cleanup done");
        done();
    })
        .catch((err) => {
        console.log(err);
        done();
    });
};
process.on("uncaughtException", (err) => {
    console.log("process on unhandledRejection error:", err);
});
process.on("unhandledRejection", (reason, p) => {
    console.log("process on unhandledRejection:", reason, "promise:", p);
});
// exit
common_1.exitHook.forceExitTimeout(500); // wait 0.5s before force exit
common_1.exitHook((done) => {
    console.log("Process::exitHook - Got exit signal");
    cleanup(done);
});
startServer().then(() => startWeb()).then(() => register()).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map