"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_pb_1 = require("../proto/api_pb");
const user_1 = require("../model/user");
const skill_1 = require("../model/skill");
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* USER
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const userP2I = (user) => {
    return {
        id: user.getId(),
        name: user.getName(),
        age: user.getAge(),
        gender: user.getGender(),
    };
};
const userP2M = (user) => {
    const result = new user_1.User();
    result.id = user.getId();
    result.name = user.getName();
    result.age = user.getAge();
    result.gender = user.getGender();
    return result;
};
const userM2P = (user) => {
    const result = new api_pb_1.User();
    result.setId(user.id);
    result.setName(user.name);
    result.setAge(user.age);
    result.setGender(user.gender);
    return result;
};
const userI2M = (user) => {
    const result = new user_1.User();
    result.id = user.id;
    result.name = user.name;
    result.age = user.age;
    result.gender = user.gender;
    return result;
};
const userI2P = (user) => {
    const result = new api_pb_1.User();
    result.setId(user.id);
    result.setName(user.name);
    result.setAge(user.age);
    result.setGender(user.gender);
    return result;
};
const User = {
    P2I: userP2I,
    P2M: userP2M,
    M2P: userM2P,
    I2M: userI2M,
    I2P: userI2P,
};
exports.User = User;
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* SKILL
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const skillP2I = (skill) => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    };
};
const skillP2M = (skill) => {
    const result = new skill_1.Skill();
    result.id = skill.getId();
    result.name = skill.getName();
    return result;
};
const skillM2P = (skill) => {
    const result = new api_pb_1.Skill();
    result.setId(skill.id);
    result.setName(skill.name);
    return result;
};
const skillI2M = (skill) => {
    const result = new skill_1.Skill();
    result.id = skill.id;
    result.name = skill.name;
    return result;
};
const skillI2P = (skill) => {
    const result = new api_pb_1.Skill();
    result.setId(skill.id);
    result.setName(skill.name);
    return result;
};
const Skill = {
    P2I: skillP2I,
    P2M: skillP2M,
    M2P: skillM2P,
    I2M: skillI2M,
    I2P: skillI2P,
};
exports.Skill = Skill;
//# sourceMappingURL=transformer.js.map