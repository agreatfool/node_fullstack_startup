"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPb2If = (user) => {
    return {
        id: user.getId(),
        name: user.getName(),
        gender: user.getGender(),
    };
};
exports.skillPb2If = (skill) => {
    return {
        id: skill.getId(),
        name: skill.getName(),
    };
};
//# sourceMappingURL=transformer.js.map