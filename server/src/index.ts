#!/usr/bin/env node

import "reflect-metadata";
import * as LibPath from "path";
import {Config, Consul, Database, exitHook, grpc, GrpcPb, typeorm, uniqid} from "common";
import {ApiServiceImpl} from "./service/api";
import {Logger} from "./logger/logger";
import * as Koa from "koa";

const serviceId: string = uniqid();
const consul = new Consul({
    host: Config.get().getRaw().consul.client.host,
    port: Config.get().getRaw().consul.client.port.toString(),
    promisify: true,
});

const startServer = async () => {
    // init system
    Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    await typeorm.createConnection(Object.assign({
        logger: Logger.createDbLogger(),
    }, Database.getConnectionOptions()));
    Logger.get();

    // start server
    const server = new grpc.Server();

    const host = Config.get().getRaw().server.listeningHost;
    const port = Config.get().getRaw().server.listeningPort;

    server.addService(GrpcPb.ApiService, new ApiServiceImpl());
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();

    console.log(`Server started, listening: ${host}:${port}`);
};

const startWeb = async () => {
    const app = new Koa();
    const host = Config.get().getRaw().server.listeningHost;
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

const register = async () => {
    const serverConf = Config.get().getRaw().server;
    await consul.agent.service.register({
        name: serverConf.serviceName,
        id: serviceId,
        address: serverConf.serviceHost,
        port: serverConf.servicePort,
        check: {
            http: `http://${serverConf.serviceHost}:${serverConf.webPort}/health`,
            interval: "10s",
            ttl: "15s",
        },
    });
};

const cleanup = (done: () => void) => {
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

process.on("uncaughtException", (err: Error) => {
    console.log("process on unhandledRejection error:", err);
});
process.on("unhandledRejection", (reason, p) => {
    console.log("process on unhandledRejection:", reason, "promise:", p);
});

// exit
exitHook.forceExitTimeout(500); // wait 0.5s before force exit
exitHook((done: () => void) => {
    console.log("Process::exitHook - Got exit signal");
    cleanup(done);
});

startServer().then(() => startWeb()).then(() => register()).catch((err) => console.log(err));
