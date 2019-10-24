import {getConnection, UpdateResult} from "typeorm";
import {SkillModel, Transformer, UserModel} from "common";

export const fetchUser = async (userId: number): Promise<UserModel.User> => {
    return await getConnection()
        .getRepository(UserModel.User)
        .findOne({
            where: {id: userId},
        });
};

export const fetchUserWithSkills = async (userId: number) => {
    return await getConnection()
        .getRepository(UserModel.User)
        .createQueryBuilder("user")
        .where({id: userId})
        .leftJoinAndSelect("user.skills", "skill")
        .getOne();
};

export const createUser = async (user: UserModel.IUser): Promise<UserModel.User> => {
    const userModel = Transformer.User.I2M(user);
    userModel.id = undefined; // use auto id

    return await getConnection()
        .getRepository(UserModel.User)
        .save(userModel);
};

export const updateUser = async (user: UserModel.IUser): Promise<UpdateResult> => {
    const userModel = Transformer.User.I2M(user);

    return await getConnection()
        .getRepository(UserModel.User)
        .update({id: userModel.id}, userModel);
};

export const createUserWithSkills = async (
    user: UserModel.IUser, skills: SkillModel.ISkill[],
): Promise<UserModel.User> => {
    let result: UserModel.User;

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const userModel = Transformer.User.I2M(user);
        userModel.id = undefined; // use auto id

        result = await queryRunner.manager.save(userModel);
        for (const skill of skills) {
            const skillModel = Transformer.Skill.I2M(skill);
            skillModel.user = result;
            await queryRunner.manager.save(skillModel);
        }
        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }

    return result;
};
