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
const transformer_1 = require("common/build/utility/transformer");
exports.fetchUserWithSkills = (userId) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.createUserWithSkills = (user, skills) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    user.skills = skills;
    const connection = typeorm_1.getConnection();
    const queryRunner = connection.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        result = yield queryRunner.manager.save(transformer_1.userI2M(user));
        for (const skill of skills) {
            const skillModel = transformer_1.skillI2M(skill);
            skillModel.user = result;
            yield queryRunner.manager.save(skillModel);
        }
        yield queryRunner.commitTransaction();
    }
    catch (err) {
        yield queryRunner.rollbackTransaction();
    }
    finally {
        yield queryRunner.release();
    }
    return result;
});
//# sourceMappingURL=user.js.map