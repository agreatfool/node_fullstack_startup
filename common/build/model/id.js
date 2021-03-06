"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Joi = require("@hapi/joi");
/**
 * @swagger
 * definitions:
 *   IdObj:
 *     type: object
 *     description: Extendable id object
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: integer
 *         format: int32
 *         description: Object id
 *         example: 1
 */
let Id = class Id {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment", { type: "int" }),
    __metadata("design:type", Number)
], Id.prototype, "id", void 0);
Id = __decorate([
    typeorm_1.Entity({ synchronize: false })
], Id);
exports.Id = Id;
exports.IdSchema = Joi.object().keys({ id: Joi.number().integer().required() });
//# sourceMappingURL=id.js.map