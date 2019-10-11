import * as Router from "koa-router";

import {createUser, getUser, updateUser} from "./service/user";

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

export const router = new Router();

router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users", updateUser);
