import * as Koa from "koa";

import {SkillModel} from "common";

import * as ApiService from "../service/api";
import {buildResponse} from "../utility/utility";

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
 *       - name: skill
 *         description: Skill info
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Skill'
 *     responses:
 *       200:
 *         description: Skill info
 *         schema:
 *           $ref: '#/definitions/SkillResponse'
 */
export const updateSkill = async (ctx: Koa.Context) => {
    let res = await ApiService.updateSkill({
        id: (ctx.request as any).body.id,
        name: (ctx.request as any).body.name,
    }) as SkillModel.ISkill;
    if (res.id === 0) {
        res = {} as SkillModel.ISkill;
    }
    ctx.body = buildResponse(200, res);
};
