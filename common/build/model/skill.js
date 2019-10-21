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
/**
 * @swagger
 * definitions:
 *   Skill:
 *     type: object
 *     description: Skill info
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         description: Skill Id
 *         example: 172
 *       name:
 *         type: string
 *         description: Skill name
 *         example: "programming"
 *       user:
 *         $ref: '#/definitions/User'
 *
 */
class Skill extends id_1.Id {
}
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Skill.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.User, (user) => user.skills),
    __metadata("design:type", user_1.User)
], Skill.prototype, "user", void 0);
exports.Skill = Skill;
//# sourceMappingURL=skill.js.map