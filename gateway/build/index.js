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
const LibPath = require("path");
const logger_1 = require("./logger/logger");
const common_1 = require("common");
const pkg = require("../package.json");
const koaSwagger = require("koa2-swagger-ui");
common_1.Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
logger_1.Logger.get();
const app = new Koa();
const host = common_1.Config.get().getRaw().gateway.httpHost;
const port = common_1.Config.get().getRaw().gateway.httpPort;
const apiVersion = `v${pkg.version}`;
const apiBaseUrl = `/api/${apiVersion}`;
const swaggerSpec = swaggerJSDoc({
    apis: ["**/*.ts"],
    explorer: true,
    swaggerDefinition: {
        basePath: apiBaseUrl,
        host: `${common_1.Config.get().getRaw().gateway.publicHost}:${common_1.Config.get().getRaw().gateway.publicPort}`,
        info: {
            description: "Fullstack app Api",
            title: "Fullstack app Api",
            version: pkg.version,
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
        ctx.status = 200;
        ctx.body = {
            code: 404,
            data: "Resource not found",
        };
    }
    return next();
}));
console.log(`Listening: ${host}:${port}`);
// @ts-ignore
app.listen(port, host);
process.on("uncaughtException", (err) => {
    console.log(`process on uncaughtException error: ${err}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
//# sourceMappingURL=index.js.map