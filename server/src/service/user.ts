import {grpc, GrpcPb, Pb} from "common";
import * as UserDao from "../dao/user";
import {IUser, User, UserGender} from "common/build/model/user";
import {ISkill} from "common/build/model/skill";
import {InsertResult} from "typeorm";

export class UserServiceImpl implements GrpcPb.IUserServiceServer {
    public getUser(call: grpc.ServerUnaryCall<Pb.GetUserReq>, callback: grpc.sendUnaryData<Pb.User>) {
        const id = call.request.getId();

        const user = this.generateUser(id, `getUser name: ${id}`, 32, "male", [
            this.generateSkill(172, `getUser skill1`),
            this.generateSkill(173, `getUser skill2`),
        ]);

        callback(null, user);
    }

    public createUser(call: grpc.ServerUnaryCall<Pb.User>, callback: grpc.sendUnaryData<Pb.User>) {
        const req: Pb.User = call.request;

        const user = this.generateUser(1, `getUser name: ${1}`, 32, "male", [
            this.generateSkill(172, `getUser skill1`),
            this.generateSkill(173, `getUser skill2`),
        ]);

        UserDao.createUserWithSkills({
            name: "david",
            age: 32,
            gender: UserGender.MALE,
        } as IUser, [
            {
                name: "Programming",
            },
            {
                name: "Speech",
            },
        ] as ISkill[])
            .then((result: User) => {
                console.log(result);
                callback(null, user as Pb.User);
            })
            .catch((err: Error) => {
                console.log(err);
                callback(null, user as Pb.User);
            });
        // FIXME 创建出来的数据不正确，关联字段没有内容；ID模型不应该同步到数据库
    }

    public updateUser(call: grpc.ServerUnaryCall<Pb.User>, callback: grpc.sendUnaryData<Pb.User>) {
        const req: Pb.User = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
    }

    private generateUser(id: number, name: string, age: number, gener: string, skills: Pb.Skill[]): Pb.User {
        const user = new Pb.User();

        user.setId(id);
        user.setName(name);
        user.setAge(age);
        user.setGender(gener);
        user.setSkillsList(skills);

        return user;
    }

    private generateSkill(id: number, name: string): Pb.Skill {
        const skill = new Pb.Skill();

        skill.setId(id);
        skill.setName(name);

        return skill;
    }
}
