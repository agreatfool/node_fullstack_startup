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
const LibPath = require("path");
const common_1 = require("common");
const utility_1 = require("../utility/utility");
const CONFIG = common_1.Config.get(LibPath.join(__dirname, "..", "..", "..", "fullstack.yml"));
const CONSUL_HOST = CONFIG.getEnv("CONSUL_HOST");
const CONSUL_PORT = CONFIG.getEnv("CONSUL_PORT");
const MAX_RETRIES = 5; // FIXME magic number
let RETRIES = 0;
class ApiService {
    static get() {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            ApiService.get(); // ensure instance existing
            const consul = new common_1.Consul({
                host: CONSUL_HOST,
                port: CONSUL_PORT,
                promisify: true,
            });
            const servers = yield consul.health.service({
                service: CONFIG.getRaw().server.serviceName,
                passing: true,
            });
            if (servers.length === 0) {
                // no available servers instance, start retry process
                if (RETRIES < MAX_RETRIES) {
                    RETRIES++;
                }
                else {
                    throw new Error(`Gateway::ApiService::connect, max retries exceeded ...`);
                }
                console.log(`Gateway::ApiService::connect, Consul gRPC servers info not found, retry ${RETRIES} ...`);
                return new Promise((resolve, reject) => {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield ApiService.connect();
                            resolve();
                        }
                        catch (err) {
                            reject(err);
                        }
                    }), 10 * 1000); // retry 10s later // FIXME magic number
                });
            }
            else {
                // got available servers
                RETRIES = 0;
                const randIndex = utility_1.getRandomIntInclusive(1, servers.length) - 1; // not a good strategy, just for test
                const service = servers[randIndex].Service;
                console.log(`Gateway::ApiService::connect, Connected to server: "${service.Address}:${service.Port}"`);
                ApiService.instance.client = new common_1.GrpcPb.ApiClient(`${service.Address}:${service.Port}`, common_1.grpc.credentials.createInsecure());
            }
        });
    }
    getUser(id) {
        return new Promise((resolve, reject) => {
            const request = new common_1.Pb.GetUserReq();
            request.setId(id);
            this.client.getUser(request, (err, user) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(common_1.Transformer.User.P2I(user));
            });
        });
    }
    getUserWithSkills(id) {
        return new Promise((resolve, reject) => {
            const request = new common_1.Pb.GetUserReq();
            request.setId(id);
            this.client.getUserWithSkills(request, (err, res) => {
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
    }
    createUser(user) {
        return new Promise((resolve, reject) => {
            this.client.createUser(common_1.Transformer.User.I2P(user), (err, res) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(common_1.Transformer.User.P2I(res));
            });
        });
    }
    createUserWithSkills(user, skills) {
        return new Promise((resolve, reject) => {
            const req = new common_1.Pb.CreateUserReq();
            req.setUser(common_1.Transformer.User.I2P(user));
            req.setSkillsList(skills.map((skill) => {
                return common_1.Transformer.Skill.I2P(skill);
            }));
            this.client.createUserWithSkills(req, (err, res) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(common_1.Transformer.User.P2I(res));
            });
        });
    }
    updateUser(user) {
        return new Promise((resolve, reject) => {
            this.client.updateUser(common_1.Transformer.User.I2P(user), (err, res) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(common_1.Transformer.User.P2I(res));
            });
        });
    }
    getSkill(id) {
        return new Promise((resolve, reject) => {
            const req = new common_1.Pb.GetSkillReq();
            req.setId(id);
            this.client.getSkill(req, (err, res) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(common_1.Transformer.Skill.P2I(res));
            });
        });
    }
    getSkills(id) {
        return new Promise((resolve, reject) => {
            const req = new common_1.Pb.GetSkillsReq();
            req.setId(id);
            this.client.getSkills(req, (err, res) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(res.getSkillsList().map((skill) => {
                    return common_1.Transformer.Skill.P2I(skill);
                }));
            });
        });
    }
    updateSkill(userId, skill) {
        return new Promise((resolve, reject) => {
            const req = new common_1.Pb.UpdateSkillReq();
            req.setUserid(userId);
            req.setSkill(common_1.Transformer.Skill.I2P(skill));
            this.client.updateSkill(req, (err, res) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(common_1.Transformer.Skill.P2I(res));
            });
        });
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=api.js.map