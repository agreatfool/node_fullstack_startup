"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const UserDao = require("../dao/user");
const user_1 = require("common/build/model/user");
class UserServiceImpl {
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
        const user = this.generateUser(1, `getUser name: ${1}`, 32, "male", [
            this.generateSkill(172, `getUser skill1`),
            this.generateSkill(173, `getUser skill2`),
        ]);
        UserDao.createUserWithSkills({
            name: "david",
            age: 32,
            gender: user_1.UserGender.MALE,
        }, [
            {
                name: "Programming",
            },
            {
                name: "Speech",
            },
        ])
            .then((result) => {
            console.log(result);
            callback(null, user);
        })
            .catch((err) => {
            console.log(err);
            callback(null, user);
        });
        // FIXME 创建出来的数据不正确，关联字段没有内容；ID模型不应该同步到数据库
    }
    updateUser(call, callback) {
        const req = call.request;
        const user = this.generateUser(req.getId(), req.getName(), req.getAge(), req.getGender(), req.getSkillsList());
        callback(null, user);
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
exports.UserServiceImpl = UserServiceImpl;
//# sourceMappingURL=user.js.map