"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_1 = require("./service/user");
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - name
 *       - age
 *       - gender
 *       - skills
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         example: 1453
 *       name:
 *         type: string
 *         example: "david"
 *       age:
 *         type: integer
 *         format: int32
 *         example: 32
 *       gender:
 *         type: string
 *         enum:
 *           - male
 *           - female
 *       skills:
 *         type: array
 *         items:
 *           $ref: '#/definitions/UserResponse'
 *         example:
 *           - id: 173
 *             name: "gaming"
 *           - id: 1687
 *             name: "programming"
 *   Skill:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         example: 172
 *       name:
 *         type: string
 *         example: "programming"
 */
exports.router = new Router();
exports.router.get("/users/:id", user_1.getUser);
exports.router.post("/users", user_1.createUser);
exports.router.put("/users", user_1.updateUser);
//# sourceMappingURL=router.js.map