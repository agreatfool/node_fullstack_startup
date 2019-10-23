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
const Koa = require("koa");
const swaggerJSDoc = require("swagger-jsdoc");
const bodyParser = require("koa-bodyparser");
const router_1 = require("./controller/router");
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
    },
});
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
app.use(koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
        spec: swaggerSpec,
    },
}));
app.use(bodyParser());
router_1.router.prefix(apiBaseUrl);
app.use(router_1.router.routes());
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.path === "/swagger.json") {
        ctx.status = 200;
        ctx.set("Content-Disposition", "attachment; filename=swagger.json");
        ctx.body = JSON.stringify(swaggerSpec, null, 4);
    }
    else {
        ctx.res.statusCode = 404;
        ctx.body = "404 page";
    }
    return next();
}));
console.log(`Listening: ${host}:${port}`);
// @ts-ignore
app.listen(port, host);
//# sourceMappingURL=index.js.map