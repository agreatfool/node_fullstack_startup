"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("grpc");
const common_1 = require("common");
const client = new common_1.GrpcPb.UserServiceClient("127.0.0.1:50051", grpc.credentials.createInsecure());
exports.getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const request = new common_1.Pb.GetUserReq();
        request.setId(id);
        client.getUser(request, (err, user) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(user));
        });
    });
});
exports.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.createUser(transformUser(user), (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(res));
        });
    });
});
exports.updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.createUser(transformUser(user), (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(transformIUser(res));
        });
    });
});
const transformUser = (user) => {
    const res = new common_1.Pb.User();
    res.setId(user.id);
    res.setName(user.name);
    res.setAge(user.age);
    res.setGender(user.gender);
    for (const skill of user.skills) {
        res.addSkills(transformSkill(skill));
    }
    return res;
};
const transformSkill = (skill) => {
    const res = new common_1.Pb.Skill();
    res.setId(skill.id);
    res.setName(skill.name);
    return res;
};
const transformIUser = (user) => {
    return {
        id: user.getId(),
        name: user.getName(),
        age: user.getAge(),
        gender: user.getGender(),
        skills: transformISkills(user.getSkillsList()),
    };
};
const transformISkill = (skill) => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    };
};
const transformISkills = (skills) => {
    const res = [];
    for (const skill of skills) {
        res.push(transformISkill(skill));
    }
    return res;
};
//# sourceMappingURL=user.js.map