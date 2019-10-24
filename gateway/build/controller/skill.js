"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const ApiService = require("../service/api");
const utility_1 = require("../utility/utility");
const Joi = require("@hapi/joi");
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
exports.getSkill = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(common_1.IdModel.IdSchema, ctx.params);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    ctx.body = utility_1.buildResponse(200, yield ApiService.getSkill(ctx.params.id));
});
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
exports.getSkills = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(common_1.IdModel.IdSchema, ctx.params);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    ctx.body = utility_1.buildResponse(200, yield ApiService.getSkills(ctx.params.id));
});
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
exports.updateSkill = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(Joi.object({
        id: Joi.number().integer().required(),
        skill: common_1.SkillModel.SkillSchema,
    }), ctx.request.body);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    let res = yield ApiService.updateSkill(ctx.request.body.id, ctx.request.body.skill);
    if (res.id === 0) {
        res = {};
    }
    ctx.body = utility_1.buildResponse(200, res);
});
//# sourceMappingURL=skill.js.map