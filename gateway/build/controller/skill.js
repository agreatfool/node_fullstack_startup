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
const api_1 = require("../service/api");
const utility_1 = require("../utility/utility");
const logger_1 = require("../logger/logger");
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
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "SkillController",
        action: "getSkill",
        data: { id: ctx.params.id },
    });
    try {
        let res = yield api_1.ApiService.get().getSkill(ctx.params.id);
        if (res.id === 0) {
            res = {};
        }
        ctx.body = utility_1.buildResponse(200, res);
    }
    catch (err) {
        utility_1.handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = utility_1.buildResponse(-1, err.stack);
    }
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
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "SkillController",
        action: "getSkills",
        data: { id: ctx.params.id },
    });
    try {
        ctx.body = utility_1.buildResponse(200, yield api_1.ApiService.get().getSkills(ctx.params.id));
    }
    catch (err) {
        utility_1.handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = utility_1.buildResponse(-1, err.stack);
    }
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
 *             - id
 *             - skill
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
    const { error } = yield utility_1.validateWithJoi(common_1.Joi.object({
        id: common_1.Joi.number().integer().required(),
        skill: common_1.SkillModel.SkillSchema,
    }), ctx.request.body);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "SkillController",
        action: "updateSkill",
        data: {
            id: ctx.request.body.id,
            skill: ctx.request.body.skill,
        },
    });
    const reqBody = ctx.request.body;
    try {
        let res = yield api_1.ApiService.get().updateSkill(reqBody.id, reqBody.skill);
        if (res.id === 0) {
            res = {};
        }
        ctx.body = utility_1.buildResponse(200, res);
    }
    catch (err) {
        utility_1.handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = utility_1.buildResponse(-1, err.stack);
    }
});
//# sourceMappingURL=skill.js.map