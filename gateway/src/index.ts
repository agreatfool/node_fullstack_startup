import * as Koa from "koa";
import * as swaggerJSDoc from "swagger-jsdoc";
import {SwaggerDefinition} from "swagger-jsdoc";
import * as bodyParser from "koa-bodyparser";

import {router} from "./controller/router";
import * as LibPath from "path";
import {Logger} from "./logger/logger";
import {Config, Consul, exitHook, uniqid} from "common";
import {ApiService} from "./service/api";

const pkg = require("../package.json");

const koaSwagger = require("koa2-swagger-ui");

const serviceId: string = uniqid();
const consul = new Consul({
    host: Config.get().getRaw().consul.client.host,
    port: Config.get().getRaw().consul.client.port.toString(),
    promisify: true,
});

const startWeb = async () => {
    Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    Logger.get();

    const app = new Koa();
    const host = Config.get().getRaw().gateway.listeningHost;
    const port = Config.get().getRaw().gateway.listeningPort;
    const apiVersion = `v${pkg.version}`;
    const apiBaseUrl = `/api/${apiVersion}`;

    const swaggerSpec = swaggerJSDoc({
        apis: ["**/*.ts"],
        explorer: true,
        swaggerDefinition: {
            basePath: apiBaseUrl,
            host: `${Config.get().getRaw().gateway.uiHost}:${Config.get().getRaw().gateway.uiPort}`,
            info: {
                description: "Fullstack app Api",
                title: "Fullstack app Api",
                version: pkg.version,
            },
        } as SwaggerDefinition,
    });

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
    app.use(
        koaSwagger({
            routePrefix: "/swagger",
            swaggerOptions: {
                spec: swaggerSpec,
            },
        }),
    );

    app.use(bodyParser());

    router.prefix(apiBaseUrl);
    app.use(router.routes());
    app.use(async (ctx: Koa.Context, next) => {
        if (ctx.path === "/swagger.json") {
            ctx.status = 200;
            ctx.set("Content-Disposition", "attachment; filename=swagger.json");
            ctx.body = JSON.stringify(swaggerSpec, null, 4);
        } else if (ctx.path === "/health") {
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

    console.log(`Listening: ${host}:${port}`);
    // @ts-ignore
    app.listen(port, host);
};

const register = async () => {
    const gatewayConf = Config.get().getRaw().gateway;
    await consul.agent.service.register({
        name: gatewayConf.serviceName,
        id: serviceId,
        address: gatewayConf.serviceHost,
        port: gatewayConf.servicePort,
        check: {
            http: `http://${gatewayConf.serviceHost}:${gatewayConf.servicePort}/health`,
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

ApiService.connect().then(() => startWeb()).then(() => register()).catch((err) => console.log(err));
