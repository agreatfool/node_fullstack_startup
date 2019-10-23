import { Skill as SkillPb, User as UserPb } from "../proto/api_pb";
import { IUser, User as UserModel } from "../model/user";
import { ISkill, Skill as SkillModel } from "../model/skill";
export declare const userP2I: (user: UserPb) => IUser;
export declare const skillP2I: (skill: SkillPb) => ISkill;
export declare const userI2M: (user: IUser) => UserModel;
export declare const skillI2M: (skill: ISkill) => SkillModel;
