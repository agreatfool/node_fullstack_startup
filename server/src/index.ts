#!/usr/bin/env node

import "reflect-metadata";
import * as LibPath from "path";
import {Config, Database, grpc, GrpcPb, typeorm} from "common";
import {ApiServiceImpl} from "./service/api";
import {Logger} from "./logger/logger";
import * as Koa from "koa";

const startServer = async () => {
    // init system
    Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    await typeorm.createConnection(Object.assign({
        logger: Logger.createDbLogger(),
    }, Database.getConnectionOptions()));
    Logger.get();

    // start server
    const server = new grpc.Server();

    const host = Config.get().getRaw().server.httpHost;
    const port = Config.get().getRaw().server.httpPort;

    server.addService(GrpcPb.ApiService, new ApiServiceImpl());
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();

    console.log(`Server started, listening: ${host}:${port}`);
};

const startWeb = async () => {
    const app = new Koa();
    const host = Config.get().getRaw().server.httpHost;
    const port = Config.get().getRaw().server.webPort;

    app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.get("X-Response-Time");
        const code = ctx.response.status;
        console.log(`${ctx.method} ${ctx.url} - ${code} - ${rt}`);
    });
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set("X-Response-Time", `${ms}ms`);
    });

    app.use(async (ctx: Koa.Context, next) => {
        if (ctx.path === "/health") {
            ctx.status = 200;
            ctx.body = "OK";
        } else {
            ctx.status = 200;
            ctx.body = {
                code: 404,
                data: "Resource not found",
            };
        }
        return next();
    });

    console.log(`Web started, listening: ${host}:${port}`);
    app.listen(port, host);
};

startServer().then(() => startWeb()).then((_) => _).catch();

process.on("uncaughtException", (err: Error) => {
    console.log(`process on uncaughtException error: ${err}`);
});

process.on("unhandledRejection", (err: Error) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
