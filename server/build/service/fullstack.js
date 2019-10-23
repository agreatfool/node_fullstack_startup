"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const UserDao = require("../dao/user");
const Transformer = require("common/build/utility/transformer");
const SkillDao = require("../dao/skill");
class ApiServiceImpl {
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
        UserDao.createUserWithSkills(Transformer.User.P2I(req), req.getSkillsList().map((skillPb) => {
            return Transformer.Skill.P2I(skillPb);
        }))
            .then((result) => {
            callback(null, Transformer.User.M2P(result));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    updateUser(call, callback) {
        const req = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
    }
    getUserSkills(call, callback) {
        const id = call.request.getId();
        SkillDao.fetchUserSkills(id)
            .then((skills) => {
            console.log(skills);
            const res = new common_1.Pb.GetUserSkillsRes();
            res.setSkillsList(skills.map((skill) => {
                return Transformer.Skill.M2P(skill);
            }));
            callback(null, res);
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    generateUser(id, name, age, gener, skills) {
        const user = new common_1.Pb.User();
        user.setId(id);
        user.setName(name);
        user.setAge(age);
        user.setGender(gener);
        user.setSkillsList(skills);
        return user;
    }
    generateSkill(id, name) {
        const skill = new common_1.Pb.Skill();
        skill.setId(id);
        skill.setName(name);
        return skill;
    }
}
exports.ApiServiceImpl = ApiServiceImpl;
//# sourceMappingURL=fullstack.js.map