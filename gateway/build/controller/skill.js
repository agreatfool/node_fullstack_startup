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
const ApiService = require("../service/api");
const utility_1 = require("../utility/utility");
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
exports.getSkills = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateSkill = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield ApiService.updateSkill({
        id: ctx.request.body.id,
        name: ctx.request.body.name,
    });
    if (res.id === 0) {
        res = {};
    }
    ctx.body = utility_1.buildResponse(200, res);
});
//# sourceMappingURL=skill.js.map