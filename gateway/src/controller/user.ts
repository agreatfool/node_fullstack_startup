import * as Koa from "koa";

import {UserModel} from "common";

import * as ApiService from "../service/api";
import {buildResponse} from "../utility/utility";

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
 *   UserWithSkillsResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *         example: 200
 *       data:
 *         type: object
 *         properties:
 *           user:
 *             $ref: '#/definitions/User'
 *           skills:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Skill'
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
    let res = await ApiService.getUser(ctx.params.id);
    if (res.id === 0) {
        res = {} as UserModel.IUser;
    }
    ctx.body = buildResponse(200, res);
};

/**
 * @swagger
 * /users/skills/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get user info & skills info by user id
 *     operationId: getUserWithSkills
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
 *         description: User info & skills info
 *         schema:
 *           $ref: '#/definitions/UserWithSkillsResponse'
 */
export const getUserWithSkills = async (ctx: Koa.Context) => {
    const res = await ApiService.getUserWithSkills(ctx.params.id);
    if (res.user.id === 0) {
        res.user = {} as UserModel.IUser;
    }
    ctx.body = buildResponse(200, res);
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
    ctx.body = buildResponse(200, await ApiService.createUser({
        name: (ctx.request as any).body.name,
        age: (ctx.request as any).body.age,
        gender: (ctx.request as any).body.gender,
    } as UserModel.IUser));
};

/**
 * @swagger
 * /users/skills:
 *   post:
 *     tags:
 *       - Users
 *     description: Create user with skills
 *     operationId: createUserWithSkills
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Request body data
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - user
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *             skills:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Skill'
 *     responses:
 *       200:
 *         description: User info
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 */
export const createUserWithSkills = async (ctx: Koa.Context) => {
    ctx.body = buildResponse(200, await ApiService.createUserWithSkills(
        (ctx.request as any).body.user,
        (ctx.request as any).body.skills,
    ));
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
    let res = await ApiService.updateUser({
        id: (ctx.request as any).body.id,
        name: (ctx.request as any).body.name,
        age: (ctx.request as any).body.age,
        gender: (ctx.request as any).body.gender,
    } as UserModel.IUser);
    if (res.id === 0) {
        res = {} as UserModel.IUser;
    }
    ctx.body = buildResponse(200, res);
};
