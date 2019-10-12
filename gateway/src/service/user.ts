import * as Koa from "koa";

import {IResponse} from "../model/response";
import {ISkill} from "../model/skill";
import {IUser} from "../model/user";

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
    ctx.body = {
        code: 200,
        data: {
            id: ctx.params.id,
            name: `name of ${ctx.params.id}`,
            age: ctx.params.id,
            gender: "male",
            skills: [
                {
                    id: 173,
                    name: "skill1",
                }, {
                    id: 174,
                    name: "skill2",
                },
            ] as ISkill[],
        } as IUser,
    } as IResponse<IUser>;
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
    ctx.body = {
        code: 200,
        data: {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
            skills: ctx.request.body.skills,
        } as IUser,
    } as IResponse<IUser>;
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
    ctx.body = {
        code: 200,
        data: {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
            skills: ctx.request.body.skills,
        } as IUser,
    } as IResponse<IUser>;
};
