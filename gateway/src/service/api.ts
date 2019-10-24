import {grpc, GrpcPb, Pb, SkillModel, Transformer, UserModel} from "common";

const client = new GrpcPb.ApiClient("127.0.0.1:50051", grpc.credentials.createInsecure());

export const getUser = async (id: number): Promise<UserModel.IUser> => {
    return new Promise((resolve, reject) => {
        const request = new Pb.GetUserReq();
        request.setId(id);

        client.getUser(request, (err, user: Pb.User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(Transformer.User.P2I(user));
        });
    });
};

export const getUserWithSkills =
    async (id: number): Promise<{ user: UserModel.IUser, skills: SkillModel.ISkill[] }> => {
        return new Promise((resolve, reject) => {
            const request = new Pb.GetUserReq();
            request.setId(id);

            client.getUserWithSkills(request, (err, res: Pb.GetUserWithSkillsRes) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                if (!res.getUser()) {
                    resolve({user: {} as UserModel.IUser, skills: [] as SkillModel.ISkill[]});
                } else {
                    resolve({
                        user: Transformer.User.P2I(res.getUser()),
                        skills: res.getSkillsList().map((skill: Pb.Skill) => {
                            return Transformer.Skill.P2I(skill);
                        }),
                    });
                }
            });
        });
    };

export const createUser = async (user: UserModel.IUser): Promise<UserModel.IUser> => {
    return new Promise((resolve, reject) => {
        client.createUser(Transformer.User.I2P(user), (err, res: Pb.User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(Transformer.User.P2I(res));
        });
    });
};

export const createUserWithSkills =
    async (user: UserModel.IUser, skills: SkillModel.ISkill[]): Promise<UserModel.IUser> => {
        return new Promise((resolve, reject) => {
            const req = new Pb.CreateUserReq();
            req.setUser(Transformer.User.I2P(user));
            req.setSkillsList(skills.map((skill: SkillModel.ISkill) => {
                return Transformer.Skill.I2P(skill);
            }));

            client.createUserWithSkills(req, (err, res: Pb.User) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.User.P2I(res));
            });
        });
    };

export const updateUser = async (user: UserModel.IUser): Promise<UserModel.IUser> => {
    return new Promise((resolve, reject) => {
        client.updateUser(Transformer.User.I2P(user), (err, res: Pb.User) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(Transformer.User.P2I(res));
        });
    });
};

export const getSkill = async (id: number): Promise<SkillModel.ISkill> => {
    return new Promise((resolve, reject) => {
        const req = new Pb.GetSkillReq();
        req.setId(id);

        client.getSkill(req, (err, res: Pb.Skill) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(Transformer.Skill.P2I(res));
        });
    });
};

export const getSkills = async (id: number): Promise<SkillModel.ISkill[]> => {
    return new Promise((resolve, reject) => {
        const req = new Pb.GetSkillsReq();
        req.setId(id);

        client.getSkills(req, (err, res: Pb.GetSkillsRes) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(res.getSkillsList().map((skill: Pb.Skill) => {
                return Transformer.Skill.P2I(skill);
            }));
        });
    });
};

export const updateSkill = async (userId: number, skill: SkillModel.ISkill): Promise<SkillModel.ISkill> => {
    return new Promise((resolve, reject) => {
        const req = new Pb.UpdateSkillReq();
        req.setUserid(userId);
        req.setSkill(Transformer.Skill.I2P(skill));

        client.updateSkill(req, (err, res: Pb.Skill) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(Transformer.Skill.P2I(res));
        });
    });
};
