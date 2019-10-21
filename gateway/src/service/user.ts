import {Pb, GrpcPb, UserModel, SkillModel, grpc} from "common";

const client = new GrpcPb.UserServiceClient("127.0.0.1:50051", grpc.credentials.createInsecure());

export const getUser = async (id: number): Promise<UserModel.IUser> => {
    return new Promise((resolve, reject) => {
        const request = new Pb.GetUserReq();
        request.setId(id);

        client.getUser(request, (err, user: Pb.User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(user));
        });
    });
};

export const createUser = async (user: UserModel.IUser): Promise<UserModel.IUser> => {
    return new Promise((resolve, reject) => {
        client.createUser(transformUser(user), (err, res: Pb.User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(res));
        });
    });
};

export const updateUser = async (user: UserModel.IUser): Promise<UserModel.IUser> => {
    return new Promise((resolve, reject) => {
        client.createUser(transformUser(user), (err, res: Pb.User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(res));
        });
    });
};

const transformUser = (user: UserModel.IUser): Pb.User => {
    const res = new Pb.User();

    res.setId(user.id);
    res.setName(user.name);
    res.setAge(user.age);
    res.setGender(user.gender);

    for (const skill of user.skills) {
        res.addSkills(transformSkill(skill));
    }

    return res;
};

const transformSkill = (skill: SkillModel.ISkill): Pb.Skill => {
    const res = new Pb.Skill();

    res.setId(skill.id);
    res.setName(skill.name);

    return res;
};

const transformIUser = (user: Pb.User): UserModel.IUser => {
    return {
        id: user.getId(),
        name: user.getName(),
        age: user.getAge(),
        gender: user.getGender(),
        skills: transformISkills(user.getSkillsList()),
    } as UserModel.IUser;
};

const transformISkill = (skill: Pb.Skill): SkillModel.ISkill => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    } as SkillModel.ISkill;
};

const transformISkills = (skills: Pb.Skill[]): SkillModel.ISkill[] => {
    const res = [] as SkillModel.ISkill[];

    for (const skill of skills) {
        res.push(transformISkill(skill));
    }

    return res;
};
