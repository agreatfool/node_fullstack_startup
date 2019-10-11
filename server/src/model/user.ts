import {ISkill} from "./skill";

export interface IUser {
    id: number;
    name: string;
    age: number;
    gender: string;
    skills: ISkill[];
}
