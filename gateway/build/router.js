"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_1 = require("./service/user");
exports.router = new Router();
exports.router.get("/users/:id", user_1.getUser);
exports.router.post("/users", user_1.createUser);
exports.router.put("/users", user_1.updateUser);
//# sourceMappingURL=router.js.map