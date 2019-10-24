"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_1 = require("./user");
const skill_1 = require("./skill");
exports.router = new Router();
exports.router.get("/users/:id", user_1.getUser);
exports.router.get("/users/skills/:id", user_1.getUserWithSkills);
exports.router.post("/users", user_1.createUser);
exports.router.post("/users/skills", user_1.createUserWithSkills);
exports.router.put("/users", user_1.updateUser);
exports.router.get("/skills/:id", skill_1.getSkill);
exports.router.get("/skills/users/:id", skill_1.getSkills);
exports.router.put("/skills", skill_1.updateSkill);
//# sourceMappingURL=router.js.map