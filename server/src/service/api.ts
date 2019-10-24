import {grpc, GrpcPb, Pb, Transformer, UserModel, SkillModel} from "common";
import * as UserDao from "../dao/user";
import {User} from "common/build/model/user";
import * as SkillDao from "../dao/skill";
import {Skill} from "common/build/model/skill";

export class ApiServiceImpl implements GrpcPb.IApiServer {
    public getUser(call: grpc.ServerUnaryCall<Pb.GetUserReq>, callback: grpc.sendUnaryData<Pb.User>) {
        const id = call.request.getId();

        UserDao.fetchUser(id)
            .then((user: UserModel.User) => {
                if (!user) {
                    return callback(null, new Pb.User()); // empty
                }
                callback(null, Transformer.User.M2P(user));
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public getUserWithSkills(
        call: grpc.ServerUnaryCall<Pb.GetUserReq>, callback: grpc.sendUnaryData<Pb.GetUserWithSkillsRes>,
    ) {
        const id = call.request.getId();

        UserDao.fetchUserWithSkills(id)
            .then((user: UserModel.User) => {
                if (!user) {
                    return callback(null, new Pb.GetUserWithSkillsRes());
                }
                const res = new Pb.GetUserWithSkillsRes();
                res.setSkillsList(user.skills.map((skill: SkillModel.Skill) => {
                    return Transformer.Skill.M2P(skill);
                }));
                res.setUser(Transformer.User.M2P(user));
                callback(null, res);
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public createUser(call: grpc.ServerUnaryCall<Pb.User>, callback: grpc.sendUnaryData<Pb.User>) {
        const req: Pb.User = call.request;

        UserDao.createUser(Transformer.User.P2I(req))
            .then((user: UserModel.User) => {
                callback(null, Transformer.User.M2P(user));
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public createUserWithSkills(call: grpc.ServerUnaryCall<Pb.CreateUserReq>, callback: grpc.sendUnaryData<Pb.User>) {
        const user: Pb.User = call.request.getUser();
        const skills: Pb.Skill[] = call.request.getSkillsList();

        UserDao.createUserWithSkills(Transformer.User.P2I(user),
            skills.map((skillPb: Pb.Skill) => {
                return Transformer.Skill.P2I(skillPb);
            }))
            .then((result: User) => {
                callback(null, Transformer.User.M2P(result));
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public updateUser(call: grpc.ServerUnaryCall<Pb.User>, callback: grpc.sendUnaryData<Pb.User>) {
        const req: Pb.User = call.request;

        UserDao.updateUser(Transformer.User.P2I(req))
            .then(() => UserDao.fetchUser(req.getId()))
            .then((user: UserModel.User) => {
                if (!user) {
                    callback(null, new Pb.User());
                }
                callback(null, Transformer.User.M2P(user));
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public getSkill(call: grpc.ServerUnaryCall<Pb.GetSkillReq>, callback: grpc.sendUnaryData<Pb.Skill>) {
        const id = call.request.getId();

        SkillDao.fetchSkill(id)
            .then((skill: SkillModel.Skill) => {
                if (!skill) {
                    return callback(null, new Pb.Skill());
                }
                callback(null, Transformer.Skill.M2P(skill));
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public getSkills(call: grpc.ServerUnaryCall<Pb.GetSkillsReq>, callback: grpc.sendUnaryData<Pb.GetSkillsRes>) {
        const id = call.request.getId();

        SkillDao.fetchUserSkills(id)
            .then((skills: Skill[]) => {
                const res = new Pb.GetSkillsRes();
                res.setSkillsList(skills.map((skill: Skill) => {
                    return Transformer.Skill.M2P(skill);
                }));
                callback(null, res);
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }

    public updateSkill(call: grpc.ServerUnaryCall<Pb.UpdateSkillReq>, callback: grpc.sendUnaryData<Pb.Skill>) {
        const req: Pb.UpdateSkillReq = call.request;

        SkillDao.updateSkill(req.getUserid(), Transformer.Skill.P2I(req.getSkill()))
            .then(() => SkillDao.fetchSkill(req.getSkill().getId()))
            .then((skill: SkillModel.Skill) => {
                if (!skill) {
                    return callback(null, new Pb.Skill());
                }
                callback(null, Transformer.Skill.M2P(skill));
            })
            .catch((err: Error) => {
                callback(err, null);
            });
    }
}
