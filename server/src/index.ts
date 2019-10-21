#!/usr/bin/env node

import {Pb, GrpcPb, grpc} from "common";

class ServerImpl implements GrpcPb.IUserServiceServer {
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
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
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

function startServer() {
    const server = new grpc.Server();

    server.addService(GrpcPb.UserServiceService, new ServerImpl());
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log("Server started, listening: 127.0.0.1:50051");
}

startServer();

process.on("uncaughtException", (err: Error) => {
    console.log(`process on uncaughtException error: ${err}`);
});

process.on("unhandledRejection", (err: Error) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
