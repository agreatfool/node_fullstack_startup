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
const id_1 = require("./id");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const Joi = require("@hapi/joi");
/**
 * @swagger
 * definitions:
 *   Skill:
 *     description: Skill info
 *     allOf:
 *       - $ref: "#/definitions/IdObj"
 *       - type: object
 *         required:
 *           - name
 *         properties:
 *           name:
 *             type: string
 *             description: Skill name
 *             example: "programming"
 */
let Skill = class Skill extends id_1.Id {
};
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Skill.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Skill.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.User, (user) => user.skills),
    __metadata("design:type", user_1.User)
], Skill.prototype, "user", void 0);
Skill = __decorate([
    typeorm_1.Entity()
], Skill);
exports.Skill = Skill;
const schema = { name: Joi.string().required() };
exports.SkillSchemaNonId = Joi.object().keys(schema);
exports.SkillSchema = id_1.IdSchema.keys(schema);
//# sourceMappingURL=skill.js.map