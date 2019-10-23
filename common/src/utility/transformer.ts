import {Skill as SkillPb, User as UserPb} from "../proto/api_pb";
import {IUser as UserInterface, User as UserModel, UserGender} from "../model/user";
import {ISkill as SkillInterface, Skill as SkillModel} from "../model/skill";

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* USER
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const userP2I = (user: UserPb): UserInterface => {
    return {
        id: user.getId(),
        name: user.getName(),
        age: user.getAge(),
        gender: user.getGender(),
    } as UserInterface;
};

const userP2M = (user: UserPb): UserModel => {
    const result = new UserModel();

    result.id = user.getId();
    result.name = user.getName();
    result.age = user.getAge();
    result.gender = user.getGender() as UserGender;

    return result;
};

const userM2P = (user: UserModel): UserPb => {
    const result = new UserPb();

    result.setId(user.id);
    result.setName(user.name);
    result.setAge(user.age);
    result.setGender(user.gender);

    return result;
};

const userI2M = (user: UserInterface): UserModel => {
    const result = new UserModel();

    result.id = user.id;
    result.name = user.name;
    result.age = user.age;
    result.gender = user.gender;

    return result;
};

const userI2P = (user: UserInterface): UserPb => {
    const result = new UserPb();

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

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* SKILL
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const skillP2I = (skill: SkillPb): SkillInterface => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    } as SkillInterface;
};

const skillP2M = (skill: SkillPb): SkillModel => {
    const result = new SkillModel();

    result.id = skill.getId();
    result.name = skill.getName();

    return result;
};

const skillM2P = (skill: SkillModel): SkillPb => {
    const result = new SkillPb();

    result.setId(skill.id);
    result.setName(skill.name);

    return result;
};

const skillI2M = (skill: SkillInterface): SkillModel => {
    const result = new SkillModel();

    result.id = skill.id;
    result.name = skill.name;

    return result;
};

const skillI2P = (skill: SkillInterface): SkillPb => {
    const result = new SkillPb();

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

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* EXPORTS
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export {
    User,
    Skill,
};
