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
const cache_1 = require("../cache/cache");
const utility_1 = require("../utility/utility");
const user_1 = require("./user");
const CACHE_SKILLS = "Skills:%USER_ID%";
const CACHE_SKILLS_TTL = 3600; // seconds, 1 hour
const CACHE_SKILL = "Skill:%SKILL_ID%";
const CACHE_SKILL_TTL = 3600; // seconds, 1 hour
exports.fetchUserSkills = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const cached = yield getSkillsCache(userId);
    if (cached.length > 0) {
        result = cached;
    }
    else {
        result = yield common_1.typeorm
            .getConnection()
            .getRepository(common_1.SkillModel.Skill)
            .find({
            where: { userId },
        });
        yield setSkillsCache(result);
    }
    return result;
});
exports.fetchSkill = (skillId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield common_1.typeorm
        .getConnection()
        .getRepository(common_1.SkillModel.Skill)
        .findOne({
        where: { id: skillId },
        cache: {
            id: utility_1.genCacheKey(CACHE_SKILL, { "%SKILL_ID%": skillId }),
            milliseconds: CACHE_SKILL_TTL,
        },
    });
});
exports.updateSkill = (userId, skill) => __awaiter(void 0, void 0, void 0, function* () {
    const skillModel = common_1.Transformer.Skill.I2M(skill);
    const result = yield common_1.typeorm
        .getConnection()
        .getRepository(common_1.SkillModel.Skill)
        .update({ id: skillModel.id }, skillModel);
    if (result.raw.hasOwnProperty("affectedRows") && result.raw.affectedRows > 0) {
        yield common_1.typeorm.getConnection().queryResultCache.remove([
            utility_1.genCacheKey(CACHE_SKILLS, { "%USER_ID%": userId }),
            utility_1.genCacheKey(user_1.CACHE_USER_WITH_SKILLS, { "%USER_ID%": userId }),
            utility_1.genCacheKey(CACHE_SKILL, { "%SKILL_ID%": skill.id }),
        ]);
    }
    return result;
});
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* Tools
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const setSkillsCache = (skills) => __awaiter(void 0, void 0, void 0, function* () {
    if (!skills || !skills.hasOwnProperty("length") || skills.length === 0) {
        return;
    }
    const userId = skills[0].userId;
    return new Promise((resolve, reject) => {
        cache_1.Cache.get().setex(utility_1.genCacheKey(CACHE_SKILLS, { "%USER_ID%": userId }), CACHE_SKILLS_TTL, JSON.stringify(skills), (err, value) => {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
});
const getSkillsCache = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cache_1.Cache.get().get(utility_1.genCacheKey(CACHE_SKILLS, { "%USER_ID%": userId }), (err, value) => {
            if (err) {
                return reject(err);
            }
            let result = [];
            if (!value) {
                return resolve(result);
            }
            try {
                result = JSON.parse(value);
            }
            catch (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
});
//# sourceMappingURL=skill.js.map