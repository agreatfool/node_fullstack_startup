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
const skill_1 = require("./skill");
const id_1 = require("./id");
const typeorm_1 = require("typeorm");
const Joi = require("@hapi/joi");
var UserGender;
(function (UserGender) {
    UserGender["MALE"] = "male";
    UserGender["FEMALE"] = "female";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
/**
 * @swagger
 * definitions:
 *   User:
 *     description: User info
 *     allOf:
 *       - $ref: "#/definitions/IdObj"
 *       - type: object
 *         required:
 *           - name
 *           - age
 *           - gender
 *         properties:
 *           name:
 *             type: string
 *             description: User name
 *             example: "david"
 *           age:
 *             type: integer
 *             format: int32
 *             description: User age
 *             example: 32
 *           gender:
 *             type: string
 *             enum:
 *               - male
 *               - female
 *             description: User gender
 */
let User = class User extends id_1.Id {
};
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("tinyint"),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.MALE,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    typeorm_1.OneToMany(() => skill_1.Skill, (skill) => skill.user),
    __metadata("design:type", Array)
], User.prototype, "skills", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
const schema = {
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).max(130).required(),
    gender: Joi.string().valid(UserGender.MALE, UserGender.FEMALE).required(),
};
exports.UserSchemaNonId = Joi.object().keys(schema);
exports.UserSchema = id_1.IdSchema.keys(schema);
//# sourceMappingURL=user.js.map