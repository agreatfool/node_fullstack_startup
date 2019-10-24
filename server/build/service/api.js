"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const UserDao = require("../dao/user");
const SkillDao = require("../dao/skill");
class ApiServiceImpl {
    getUser(call, callback) {
        const id = call.request.getId();
        UserDao.fetchUser(id)
            .then((user) => {
            if (!user) {
                return callback(null, new common_1.Pb.User()); // empty
            }
            callback(null, common_1.Transformer.User.M2P(user));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    getUserWithSkills(call, callback) {
        const id = call.request.getId();
        UserDao.fetchUserWithSkills(id)
            .then((user) => {
            if (!user) {
                return callback(null, new common_1.Pb.GetUserWithSkillsRes());
            }
            const res = new common_1.Pb.GetUserWithSkillsRes();
            res.setSkillsList(user.skills.map((skill) => {
                return common_1.Transformer.Skill.M2P(skill);
            }));
            res.setUser(common_1.Transformer.User.M2P(user));
            callback(null, res);
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    createUser(call, callback) {
        const req = call.request;
        UserDao.createUser(common_1.Transformer.User.P2I(req))
            .then((user) => {
            callback(null, common_1.Transformer.User.M2P(user));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    createUserWithSkills(call, callback) {
        const user = call.request.getUser();
        const skills = call.request.getSkillsList();
        UserDao.createUserWithSkills(common_1.Transformer.User.P2I(user), skills.map((skillPb) => {
            return common_1.Transformer.Skill.P2I(skillPb);
        }))
            .then((result) => {
            callback(null, common_1.Transformer.User.M2P(result));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    updateUser(call, callback) {
        const req = call.request;
        UserDao.updateUser(common_1.Transformer.User.P2I(req))
            .then(() => UserDao.fetchUser(req.getId()))
            .then((user) => {
            if (!user) {
                callback(null, new common_1.Pb.User());
            }
            callback(null, common_1.Transformer.User.M2P(user));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    getSkill(call, callback) {
        const id = call.request.getId();
        SkillDao.fetchSkill(id)
            .then((skill) => {
            if (!skill) {
                return callback(null, new common_1.Pb.Skill());
            }
            callback(null, common_1.Transformer.Skill.M2P(skill));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    getSkills(call, callback) {
        const id = call.request.getId();
        SkillDao.fetchUserSkills(id)
            .then((skills) => {
            const res = new common_1.Pb.GetSkillsRes();
            res.setSkillsList(skills.map((skill) => {
                return common_1.Transformer.Skill.M2P(skill);
            }));
            callback(null, res);
        })
            .catch((err) => {
            callback(err, null);
        });
    }
    updateSkill(call, callback) {
        const req = call.request;
        SkillDao.updateSkill(req.getUserid(), common_1.Transformer.Skill.P2I(req.getSkill()))
            .then(() => SkillDao.fetchSkill(req.getSkill().getId()))
            .then((skill) => {
            if (!skill) {
                return callback(null, new common_1.Pb.Skill());
            }
            callback(null, common_1.Transformer.Skill.M2P(skill));
        })
            .catch((err) => {
            callback(err, null);
        });
    }
}
exports.ApiServiceImpl = ApiServiceImpl;
//# sourceMappingURL=api.js.map