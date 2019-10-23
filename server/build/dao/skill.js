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
const typeorm_1 = require("typeorm");
const common_1 = require("common");
exports.fetchUserSkills = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getConnection()
        .getRepository(common_1.SkillModel.Skill)
        .find({
        where: { user: id },
    });
});
exports.fetchSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getConnection()
        .getRepository(common_1.SkillModel.Skill)
        .findOne({
        where: { id },
    });
});
exports.updateSkill = (skill) => __awaiter(void 0, void 0, void 0, function* () {
    const skillModel = common_1.Transformer.Skill.I2M(skill);
    return yield typeorm_1.getConnection()
        .getRepository(common_1.SkillModel.Skill)
        .update({ id: skillModel.id }, skillModel);
});
//# sourceMappingURL=skill.js.map