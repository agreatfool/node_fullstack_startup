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
exports.getUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(common_1.IdModel.IdSchema, ctx.params);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "UserController",
        action: "getUser",
        data: { id: ctx.params.id },
    });
    try {
        let res = yield api_1.ApiService.get().getUser(ctx.params.id);
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
exports.getUserWithSkills = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(common_1.IdModel.IdSchema, ctx.params);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "UserController",
        action: "getUserWithSkills",
        data: { id: ctx.params.id },
    });
    try {
        const res = yield api_1.ApiService.get().getUserWithSkills(ctx.params.id);
        if (res.user.id === 0) {
            res.user = {};
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
exports.createUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(common_1.UserModel.UserSchemaNonId, ctx.request.body);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "UserController",
        action: "createUser",
        data: {
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
        },
    });
    try {
        ctx.body = utility_1.buildResponse(200, yield api_1.ApiService.get().createUser({
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
        }));
    }
    catch (err) {
        utility_1.handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = utility_1.buildResponse(-1, err.stack);
    }
});
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
exports.createUserWithSkills = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [];
    validations.push({
        schema: common_1.Joi.object({
            user: common_1.UserModel.UserSchemaNonId,
            skills: common_1.Joi.array(),
        }), data: ctx.request.body,
    });
    if (ctx.request.body.hasOwnProperty("skills")
        && ctx.request.body.skills.hasOwnProperty("length")) {
        // {skills: Joi.array().items(SkillModel.SkillSchemaNonId)} not working, shall be fixed later
        for (const skill of ctx.request.body.skills) {
            validations.push({ schema: common_1.SkillModel.SkillSchemaNonId, data: skill });
        }
    }
    const error = yield utility_1.validateWithJoiMulti(validations);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "UserController",
        action: "createUserWithSkills",
        data: {
            user: ctx.request.body.user,
            skills: ctx.request.body.skills,
        },
    });
    try {
        ctx.body = utility_1.buildResponse(200, yield api_1.ApiService.get().createUserWithSkills(ctx.request.body.user, ctx.request.body.skills));
    }
    catch (err) {
        utility_1.handleReconnecting(err).catch((_) => _); // dismiss reconnection result
        ctx.body = utility_1.buildResponse(-1, err.stack);
    }
});
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
exports.updateUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield utility_1.validateWithJoi(common_1.UserModel.UserSchema, ctx.request.body);
    if (error) {
        ctx.body = utility_1.buildResponse(-1, error);
        return;
    }
    logger_1.Logger.get().info({
        app: "gateway",
        host: common_1.Config.get().getEnv("SERVICE_HOST"),
        module: "UserController",
        action: "updateUser",
        data: {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
        },
    });
    try {
        let res = yield api_1.ApiService.get().updateUser({
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
        });
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
//# sourceMappingURL=user.js.map