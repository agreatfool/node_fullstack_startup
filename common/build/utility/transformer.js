"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const skill_1 = require("../model/skill");
exports.userP2I = (user) => {
    return {
        id: user.getId(),
        name: user.getName(),
        gender: user.getGender(),
    };
};
exports.skillP2I = (skill) => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    };
};
exports.userI2M = (user) => {
    const result = new user_1.User();
    result.id = user.id;
    result.name = user.name;
    result.age = user.age;
    result.gender = user.gender;
    result.skills = user.skills;
    return result;
};
exports.skillI2M = (skill) => {
    const result = new skill_1.Skill();
    result.id = skill.id;
    result.name = skill.name;
    result.user = skill.user;
    return result;
};
//# sourceMappingURL=transformer.js.map