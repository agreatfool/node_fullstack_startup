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
const common_1 = require("common");
const client = new common_1.GrpcPb.ApiClient("127.0.0.1:50051", common_1.grpc.credentials.createInsecure());
exports.getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const request = new common_1.Pb.GetUserReq();
        request.setId(id);
        client.getUser(request, (err, user) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(common_1.Transformer.User.P2I(user));
        });
    });
});
exports.getUserWithSkills = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const request = new common_1.Pb.GetUserReq();
        request.setId(id);
        client.getUserWithSkills(request, (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            if (!res.getUser()) {
                resolve({ user: {}, skills: [] });
            }
            else {
                resolve({
                    user: common_1.Transformer.User.P2I(res.getUser()),
                    skills: res.getSkillsList().map((skill) => {
                        return common_1.Transformer.Skill.P2I(skill);
                    }),
                });
            }
        });
    });
});
exports.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.createUser(common_1.Transformer.User.I2P(user), (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(common_1.Transformer.User.P2I(res));
        });
    });
});
exports.createUserWithSkills = (user, skills) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const req = new common_1.Pb.CreateUserReq();
        req.setUser(common_1.Transformer.User.I2P(user));
        req.setSkillsList(skills.map((skill) => {
            return common_1.Transformer.Skill.I2P(skill);
        }));
        client.createUserWithSkills(req, (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(common_1.Transformer.User.P2I(res));
        });
    });
});
exports.updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.updateUser(common_1.Transformer.User.I2P(user), (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(common_1.Transformer.User.P2I(res));
        });
    });
});
exports.getSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const req = new common_1.Pb.GetSkillReq();
        req.setId(id);
        client.getSkill(req, (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(common_1.Transformer.Skill.P2I(res));
        });
    });
});
exports.getSkills = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const req = new common_1.Pb.GetSkillsReq();
        req.setId(id);
        client.getSkills(req, (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(res.getSkillsList().map((skill) => {
                return common_1.Transformer.Skill.P2I(skill);
            }));
        });
    });
});
exports.updateSkill = (userId, skill) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const req = new common_1.Pb.UpdateSkillReq();
        req.setUserid(userId);
        req.setSkill(common_1.Transformer.Skill.I2P(skill));
        client.updateSkill(req, (err, res) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(common_1.Transformer.Skill.P2I(res));
        });
    });
});
//# sourceMappingURL=api.js.map