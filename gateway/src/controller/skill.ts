import * as Koa from "koa";

import {IdModel, Joi, Logger as CommonLogger, SkillModel} from "common";

import {ApiService} from "../service/api";
import {buildResponse, handleReconnecting, validateWithJoi} from "../utility/utility";
import {Logger} from "../logger/logger";

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skill management
 */

/**
 * @swagger
 * definitions:
 *   SkillResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *         example: 200
 *       data:
 *         $ref: '#/definitions/Skill'
 *   SkillsResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *         example: 200
 *       data:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Skill'
 */

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     tags:
 *       - Skills
 *     description: Get skill info
 *     operationId: getSkill
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Skill Id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Skill info
 *         schema:
 *           $ref: '#/definitions/SkillResponse'
 */
export const getSkill = async (ctx: Koa.Context) => {
    const {error} = await validateWithJoi(IdModel.IdSchema, ctx.params);
    if (error) {
        ctx.body = buildResponse(-1, error);
        return;
    }

    Logger.get().info({
        app: "gateway",
        module: "SkillController",
        action: "getSkill",
        data: {id: ctx.params.id},
    } as CommonLogger.ILogInfo);

    try {
        let res = await ApiService.get().getSkill(ctx.params.id) as SkillModel.ISkill;
        if (res.id === 0) {
            res = {} as SkillModel.ISkill;
        }
        ctx.body = buildResponse(200, res);
    } catch (err) {
        handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = buildResponse(-1, err.stack);
    }
};

/**
 * @swagger
 * /skills/users/{id}:
 *   get:
 *     tags:
 *       - Skills
 *     description: Get user skills info by user id
 *     operationId: getSkills
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
 *         description: Skills info
 *         schema:
 *           $ref: '#/definitions/SkillsResponse'
 */
export const getSkills = async (ctx: Koa.Context) => {
    const {error} = await validateWithJoi(IdModel.IdSchema, ctx.params);
    if (error) {
        ctx.body = buildResponse(-1, error);
        return;
    }

    Logger.get().info({
        app: "gateway",
        module: "SkillController",
        action: "getSkills",
        data: {id: ctx.params.id},
    } as CommonLogger.ILogInfo);

    try {
        ctx.body = buildResponse(200, await ApiService.get().getSkills(ctx.params.id));
    } catch (err) {
        handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = buildResponse(-1, err.stack);
    }
};

/**
 * @swagger
 * /skills:
 *   put:
 *     tags:
 *       - Skills
 *     description: Update skill
 *     operationId: updateSkill
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
 *             id:
 *               type: integer
 *               format: int64
 *               description: User id
 *             skill:
 *               $ref: '#/definitions/Skill'
 *     responses:
 *       200:
 *         description: Skill info
 *         schema:
 *           $ref: '#/definitions/SkillResponse'
 */
export const updateSkill = async (ctx: Koa.Context) => {
    const {error} = await validateWithJoi(Joi.object({
        id: Joi.number().integer().required(),
        skill: SkillModel.SkillSchema,
    }), (ctx.request as any).body);
    if (error) {
        ctx.body = buildResponse(-1, error);
        return;
    }

    Logger.get().info({
        app: "gateway",
        module: "SkillController",
        action: "updateSkill",
        data: {
            id: (ctx.request as any).body.id,
            skill: (ctx.request as any).body.skill,
        },
    } as CommonLogger.ILogInfo);

    const reqBody = (ctx.request as any).body;

    try {
        let res = await ApiService.get().updateSkill(reqBody.id, reqBody.skill) as SkillModel.ISkill;
        if (res.id === 0) {
            res = {} as SkillModel.ISkill;
        }
        ctx.body = buildResponse(200, res);
    } catch (err) {
        handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = buildResponse(-1, err.stack);
    }
};
