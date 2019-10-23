import { Skill as SkillPb, User as UserPb } from "../proto/api_pb";
import { IUser as UserInterface, User as UserModel } from "../model/user";
import { ISkill as SkillInterface, Skill as SkillModel } from "../model/skill";
declare const User: {
    P2I: (user: UserPb) => UserInterface;
    P2M: (user: UserPb) => UserModel;
    M2P: (user: UserModel) => UserPb;
    I2M: (user: UserInterface) => UserModel;
    I2P: (user: UserInterface) => UserPb;
};
declare const Skill: {
    P2I: (skill: SkillPb) => SkillInterface;
    P2M: (skill: SkillPb) => SkillModel;
    M2P: (skill: SkillModel) => SkillPb;
    I2M: (skill: SkillInterface) => SkillModel;
    I2P: (skill: SkillInterface) => SkillPb;
};
export { User, Skill, };
