import * as Koa from "koa";

import {UserModel} from "common";

import * as UserService from "../service/user";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * definitions:
 *   UserResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *         example: 200
 *       data:
 *         $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get user info by id
 *     operationId: getUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User Id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: User info
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 */
export const getUser = async (ctx: Koa.Context) => {
    ctx.body = await UserService.getUser(ctx.params.id);
};

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     description: Create user
 *     operationId: createUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User info
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User info
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 */
export const createUser = async (ctx: Koa.Context) => {
    ctx.body = await UserService.createUser({
        id: (ctx.request as any).body.id,
        name: (ctx.request as any).body.name,
        age: (ctx.request as any).body.age,
        gender: (ctx.request as any).body.gender,
        skills: (ctx.request as any).body.skills,
    } as UserModel.IUser);
};

/**
 * @swagger
 * /users:
 *   put:
 *     tags:
 *       - Users
 *     description: Update user
 *     operationId: updateUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User info
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User info
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 */
export const updateUser = async (ctx: Koa.Context) => {
    ctx.body = await UserService.updateUser({
        id: (ctx.request as any).body.id,
        name: (ctx.request as any).body.name,
        age: (ctx.request as any).body.age,
        gender: (ctx.request as any).body.gender,
        skills: (ctx.request as any).body.skills,
    } as UserModel.IUser);
};
