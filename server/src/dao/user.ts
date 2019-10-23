import {IUser, User} from "common/build/model/user";
import {ISkill} from "common/build/model/skill";
import {getConnection} from "typeorm";
import {skillI2M, userI2M} from "common/build/utility/transformer";

export const fetchUserWithSkills = async (userId: number) => {

};

export const createUserWithSkills = async (user: IUser, skills: ISkill[]): Promise<User> => {
    let result: User;
    user.skills = skills;

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        result = await queryRunner.manager.save(userI2M(user));
        for (const skill of skills) {
            const skillModel = skillI2M(skill);
            skillModel.user = result;
            await queryRunner.manager.save(skillModel);
        }
        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }

    return result;
};
