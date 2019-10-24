import * as Koa from "koa";

import {IdModel, SkillModel} from "common";

import * as ApiService from "../service/api";
import {buildResponse, validateWithJoi} from "../utility/utility";
import * as Joi from "@hapi/joi";

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

    ctx.body = buildResponse(200, await ApiService.getSkill(ctx.params.id));
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

    ctx.body = buildResponse(200, await ApiService.getSkills(ctx.params.id));
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

    let res = await ApiService.updateSkill(
        (ctx.request as any).body.id, (ctx.request as any).body.skill,
    ) as SkillModel.ISkill;
    if (res.id === 0) {
        res = {} as SkillModel.ISkill;
    }
    ctx.body = buildResponse(200, res);
};
