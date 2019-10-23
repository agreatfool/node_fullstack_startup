import {Skill as SkillPb, User as UserPb} from "../proto/api_pb";
import {IUser, User as UserModel} from "../model/user";
import {ISkill, Skill as SkillModel} from "../model/skill";

export const userP2I = (user: UserPb): IUser => {
    return {
        id: user.getId(),
        name: user.getName(),
        gender: user.getGender(),
    } as IUser;
};

export const skillP2I = (skill: SkillPb): ISkill => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    } as ISkill;
};

export const userI2M = (user: IUser): UserModel => {
    const result = new UserModel();

    result.id = user.id;
    result.name = user.name;
    result.age = user.age;
    result.gender = user.gender;
    result.skills = user.skills;

    return result;
};

export const skillI2M = (skill: ISkill): SkillModel => {
    const result = new SkillModel();

    result.id = skill.id;
    result.name = skill.name;
    result.user = skill.user;

    return result;
};
