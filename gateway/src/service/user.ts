import * as grpc from "grpc";

import {UserServiceClient} from "../proto/api_grpc_pb";
import {GetUserReq, Skill, User} from "../proto/api_pb";

import {IUser} from "../model/user";
import {ISkill} from "../model/skill";

const client = new UserServiceClient("127.0.0.1:50051", grpc.credentials.createInsecure());

export const getUser = async (id: number): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const request = new GetUserReq();
        request.setId(id);

        client.getUser(request, (err, user: User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(user));
        });
    });
};

export const createUser = async (user: IUser): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        client.createUser(transformUser(user), (err, res: User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(res));
        });
    });
};

export const updateUser = async (user: IUser): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        client.createUser(transformUser(user), (err, res: User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(res));
        });
    });
};

const transformUser = (user: IUser): User => {
    const res = new User();

    res.setId(user.id);
    res.setName(user.name);
    res.setAge(user.age);
    res.setGender(user.gender);

    for (const skill of user.skills) {
        res.addSkills(transformSkill(skill));
    }

    return res;
};

const transformSkill = (skill: ISkill): Skill => {
    const res = new Skill();

    res.setId(skill.id);
    res.setName(skill.name);

    return res;
};

const transformIUser = (user: User): IUser => {
    return {
        id: user.getId(),
        name: user.getName(),
        age: user.getAge(),
        gender: user.getGender(),
        skills: transformISkills(user.getSkillsList()),
    } as IUser;
};

const transformISkill = (skill: Skill): ISkill => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    } as ISkill;
};

const transformISkills = (skills: Skill[]): ISkill[] => {
    const res = [] as ISkill[];

    for (const skill of skills) {
        res.push(transformISkill(skill));
    }

    return res;
};
