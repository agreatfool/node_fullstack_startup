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
const utility_1 = require("../utility/utility");
const CACHE_USER = "User:%USER_ID%";
const CACHE_USER_TTL = 3600000; // milliseconds, 1 hour
exports.CACHE_USER_WITH_SKILLS = "UserWithSkills:%USER_ID%";
const CACHE_USER_WITH_SKILLS_TTL = 3600000; // milliseconds, 1 hour
exports.fetchUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield common_1.typeorm
        .getConnection()
        .getRepository(common_1.UserModel.User)
        .findOne({
        where: { id: userId },
        cache: {
            id: utility_1.genCacheKey(CACHE_USER, { "%USER_ID%": userId }),
            milliseconds: CACHE_USER_TTL,
        },
    });
});
exports.fetchUserWithSkills = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield common_1.typeorm
        .getConnection()
        .getRepository(common_1.UserModel.User)
        .createQueryBuilder("user")
        .where({ id: userId })
        .leftJoinAndSelect("user.skills", "skill")
        .cache(utility_1.genCacheKey(exports.CACHE_USER_WITH_SKILLS, { "%USER_ID%": userId }), CACHE_USER_WITH_SKILLS_TTL)
        .getOne();
});
exports.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userModel = common_1.Transformer.User.I2M(user);
    userModel.id = undefined; // use auto id
    return yield common_1.typeorm
        .getConnection()
        .getRepository(common_1.UserModel.User)
        .save(userModel);
});
exports.updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userModel = common_1.Transformer.User.I2M(user);
    const result = yield common_1.typeorm
        .getConnection()
        .getRepository(common_1.UserModel.User)
        .update({ id: userModel.id }, userModel);
    if (result.raw.hasOwnProperty("affectedRows") && result.raw.affectedRows > 0) {
        yield common_1.typeorm.getConnection().queryResultCache.remove([
            utility_1.genCacheKey(CACHE_USER, { "%USER_ID%": user.id }),
            utility_1.genCacheKey(exports.CACHE_USER_WITH_SKILLS, { "%USER_ID%": user.id }),
        ]);
    }
    return result;
});
exports.createUserWithSkills = (user, skills) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    const connection = common_1.typeorm.getConnection();
    const queryRunner = connection.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const userModel = common_1.Transformer.User.I2M(user);
        userModel.id = undefined; // use auto id
        result = yield queryRunner.manager.save(userModel);
        for (const skill of skills) {
            const skillModel = common_1.Transformer.Skill.I2M(skill);
            skillModel.user = result;
            yield queryRunner.manager.save(skillModel);
        }
        yield queryRunner.commitTransaction();
    }
    catch (err) {
        yield queryRunner.rollbackTransaction();
        throw err;
    }
    finally {
        yield queryRunner.release();
    }
    return result;
});
//# sourceMappingURL=user.js.map