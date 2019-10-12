#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("grpc");
const api_grpc_pb_1 = require("./proto/api_grpc_pb");
const api_pb_1 = require("./proto/api_pb");
class ServerImpl {
    getUser(call, callback) {
        const id = call.request.getId();
        const user = this.generateUser(id, `getUser name: ${id}`, 32, "male", [
            this.generateSkill(172, `getUser skill1`),
            this.generateSkill(173, `getUser skill2`),
        ]);
        callback(null, user);
    }
    createUser(call, callback) {
        const req = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
    }
    updateUser(call, callback) {
        const req = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
    }
    generateUser(id, name, age, gener, skills) {
        const user = new api_pb_1.User();
        user.setId(id);
        user.setName(name);
        user.setAge(age);
        user.setGender(gener);
        user.setSkillsList(skills);
        return user;
    }
    generateSkill(id, name) {
        const skill = new api_pb_1.Skill();
        skill.setId(id);
        skill.setName(name);
        return skill;
    }
}
function startServer() {
    const server = new grpc.Server();
    server.addService(api_grpc_pb_1.UserServiceService, new ServerImpl());
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("Server started, listening: 127.0.0.1:50051");
}
startServer();
process.on("uncaughtException", (err) => {
    console.log(`process on uncaughtException error: ${err}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
//# sourceMappingURL=index.js.map