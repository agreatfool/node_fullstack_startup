import {getConnection, UpdateResult} from "typeorm";
import {SkillModel, Transformer, UserModel} from "common";
import {genCacheKey} from "../utility/utility";

const CACHE_USER = "User:%USER_ID%";
const CACHE_USER_TTL = 3600000; // milliseconds, 1 hour
export const CACHE_USER_WITH_SKILLS = "UserWithSkills:%USER_ID%";
const CACHE_USER_WITH_SKILLS_TTL = 3600000; // milliseconds, 1 hour

export const fetchUser = async (userId: number): Promise<UserModel.User> => {
    return await getConnection()
        .getRepository(UserModel.User)
        .findOne({
            where: {id: userId},
            cache: {
                id: genCacheKey(CACHE_USER, {"%USER_ID%": userId}),
                milliseconds: CACHE_USER_TTL,
            },
        });
};

export const fetchUserWithSkills = async (userId: number) => {
    return await getConnection()
        .getRepository(UserModel.User)
        .createQueryBuilder("user")
        .where({id: userId})
        .leftJoinAndSelect("user.skills", "skill")
        .cache(genCacheKey(CACHE_USER_WITH_SKILLS, {"%USER_ID%": userId}), CACHE_USER_WITH_SKILLS_TTL)
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

    const result = await getConnection()
        .getRepository(UserModel.User)
        .update({id: userModel.id}, userModel);
    if (result.raw.hasOwnProperty("affectedRows") && result.raw.affectedRows > 0) {
        await getConnection().queryResultCache.remove([
            genCacheKey(CACHE_USER, {"%USER_ID%": user.id}),
            genCacheKey(CACHE_USER_WITH_SKILLS, {"%USER_ID%": user.id}),
        ]);
    }

    return result;
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
