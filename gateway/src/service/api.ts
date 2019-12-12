import * as LibPath from "path";
import {Config, Consul, grpc, GrpcPb, Pb, SkillModel, Transformer, UserModel} from "common";
import {IResHealthService, IResService} from "common/build/consul/consul";
import {getRandomIntInclusive} from "../utility/utility";

const CONFIG = Config.get(LibPath.join(__dirname, "..", "..", "..", "fullstack.yml"));
const CONSUL_HOST = CONFIG.getEnv("CONSUL_HOST");
const CONSUL_PORT = CONFIG.getEnv("CONSUL_PORT");

const MAX_RETRIES = 5; // FIXME magic number
let RETRIES = 0;

export class ApiService {
    public static get() {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }

        return ApiService.instance;
    }

    public static async connect() {
        ApiService.get(); // ensure instance existing

        const consul = new Consul({
            host: CONSUL_HOST,
            port: CONSUL_PORT,
            promisify: true,
        });

        const servers = await consul.health.service({
            service: CONFIG.getRaw().server.serviceName,
            passing: true,
        }) as IResHealthService[];

        if (servers.length === 0) {
            // no available servers instance, start retry process
            if (RETRIES < MAX_RETRIES) {
                RETRIES++;
            } else {
                throw new Error(`Gateway::ApiService::connect, max retries exceeded ...`);
            }
            console.log(`Gateway::ApiService::connect, Consul gRPC servers info not found, retry ${RETRIES} ...`);
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await ApiService.connect();
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }, 10 * 1000); // retry 10s later // FIXME magic number
            });
        } else {
            // got available servers
            RETRIES = 0;
            const randIndex = getRandomIntInclusive(1, servers.length) - 1; // not a good strategy, just for test
            const service = servers[randIndex].Service as IResService;
            const address = service.Address === "host.docker.internal" ? "127.0.0.1" : service.Address;
            const port = service.Port;
            console.log(`Gateway::ApiService::connect, Connected to server: "${address}:${port}"`);
            ApiService.instance.client = new GrpcPb.ApiClient(
                `${address}:${port}`, grpc.credentials.createInsecure(),
            );
        }
    }

    private static instance: ApiService;

    private client: GrpcPb.ApiClient;

    public getUser(id: number): Promise<UserModel.IUser> {
        return new Promise((resolve, reject) => {
            const request = new Pb.GetUserReq();
            request.setId(id);

            this.client.getUser(request, (err, user: Pb.User) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.User.P2I(user));
            });
        });
    }

    public getUserWithSkills(id: number): Promise<{ user: UserModel.IUser, skills: SkillModel.ISkill[] }> {
        return new Promise((resolve, reject) => {
            const request = new Pb.GetUserReq();
            request.setId(id);

            this.client.getUserWithSkills(request, (err, res: Pb.GetUserWithSkillsRes) => {
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
    }

    public createUser(user: UserModel.IUser): Promise<UserModel.IUser> {
        return new Promise((resolve, reject) => {
            this.client.createUser(Transformer.User.I2P(user), (err, res: Pb.User) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.User.P2I(res));
            });
        });
    }

    public createUserWithSkills(user: UserModel.IUser, skills: SkillModel.ISkill[]): Promise<UserModel.IUser> {
        return new Promise((resolve, reject) => {
            const req = new Pb.CreateUserReq();
            req.setUser(Transformer.User.I2P(user));
            req.setSkillsList(skills.map((skill: SkillModel.ISkill) => {
                return Transformer.Skill.I2P(skill);
            }));

            this.client.createUserWithSkills(req, (err, res: Pb.User) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.User.P2I(res));
            });
        });
    }

    public updateUser(user: UserModel.IUser): Promise<UserModel.IUser> {
        return new Promise((resolve, reject) => {
            this.client.updateUser(Transformer.User.I2P(user), (err, res: Pb.User) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.User.P2I(res));
            });
        });
    }

    public getSkill(id: number): Promise<SkillModel.ISkill> {
        return new Promise((resolve, reject) => {
            const req = new Pb.GetSkillReq();
            req.setId(id);

            this.client.getSkill(req, (err, res: Pb.Skill) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.Skill.P2I(res));
            });
        });
    }

    public getSkills(id: number): Promise<SkillModel.ISkill[]> {
        return new Promise((resolve, reject) => {
            const req = new Pb.GetSkillsReq();
            req.setId(id);

            this.client.getSkills(req, (err, res: Pb.GetSkillsRes) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(res.getSkillsList().map((skill: Pb.Skill) => {
                    return Transformer.Skill.P2I(skill);
                }));
            });
        });
    }

    public updateSkill(userId: number, skill: SkillModel.ISkill): Promise<SkillModel.ISkill> {
        return new Promise((resolve, reject) => {
            const req = new Pb.UpdateSkillReq();
            req.setUserid(userId);
            req.setSkill(Transformer.Skill.I2P(skill));

            this.client.updateSkill(req, (err, res: Pb.Skill) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(Transformer.Skill.P2I(res));
            });
        });
    }
}
