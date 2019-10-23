import { Skill, User } from "../proto/api_pb";
import { IUser } from "./user";
import { ISkill } from "./skill";
export declare const userPb2If: (user: User) => IUser;
export declare const skillPb2If: (skill: Skill) => ISkill;
