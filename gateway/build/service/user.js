"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.getUser = (ctx) => __awaiter(this, void 0, void 0, function* () {
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
            ],
        },
    };
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
exports.createUser = (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        code: 200,
        data: {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
            skills: ctx.request.body.skills,
        },
    };
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
exports.updateUser = (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        code: 200,
        data: {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            age: ctx.request.body.age,
            gender: ctx.request.body.gender,
            skills: ctx.request.body.skills,
        },
    };
});
//# sourceMappingURL=user.js.map