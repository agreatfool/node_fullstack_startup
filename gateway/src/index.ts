import * as Koa from "koa";
import * as swaggerJSDoc from "swagger-jsdoc";
import {SwaggerDefinition} from "swagger-jsdoc";
import * as bodyParser from "koa-bodyparser";

import {router} from "./controller/router";

const koaSwagger = require("koa2-swagger-ui");

const app = new Koa();
const host = process.env.HTTP_HOST;
const port = process.env.HTTP_PORT;
const apiVersion = "v1.0";
const apiBaseUrl = `/api/${apiVersion}`;

const swaggerSpec = swaggerJSDoc({
    apis: ["**/*.ts"],
    explorer: true,
    swaggerDefinition: {
        basePath: apiBaseUrl,
        host: `${process.env.TEST_HOST}:${port}`,
        info: {
            description: "REST API demo",
            title: "REST API demo",
            version: "1.0.0",
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
    } else {
        ctx.res.statusCode = 404;
        ctx.body = "404 page";
    }
    return next();
});

console.log(`Listening: ${host}:${port}`);
// @ts-ignore
app.listen(port, host);
