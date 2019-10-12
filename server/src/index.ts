#!/usr/bin/env node

import * as grpc from "grpc";

import {UserServiceService, IUserServiceServer} from "./proto/api_grpc_pb";
import {GetUserReq, Skill, User} from "./proto/api_pb";

class ServerImpl implements IUserServiceServer {
    public getUser(call: grpc.ServerUnaryCall<GetUserReq>, callback: grpc.sendUnaryData<User>) {
        const id = call.request.getId();

        const user = this.generateUser(id, `getUser name: ${id}`, 32, "male", [
            this.generateSkill(172, `getUser skill1`),
            this.generateSkill(173, `getUser skill2`),
        ]);

        callback(null, user);
    }

    public createUser(call: grpc.ServerUnaryCall<User>, callback: grpc.sendUnaryData<User>) {
        const req: User = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
    }

    public updateUser(call: grpc.ServerUnaryCall<User>, callback: grpc.sendUnaryData<User>) {
        const req: User = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
    }

    private generateUser(id: number, name: string, age: number, gener: string, skills: Skill[]): User {
        const user = new User();

        user.setId(id);
        user.setName(name);
        user.setAge(age);
        user.setGender(gener);
        user.setSkillsList(skills);

        return user;
    }

    private generateSkill(id: number, name: string): Skill {
        const skill = new Skill();

        skill.setId(id);
        skill.setName(name);

        return skill;
    }
}

function startServer() {
    const server = new grpc.Server();

    server.addService(UserServiceService, new ServerImpl());
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
