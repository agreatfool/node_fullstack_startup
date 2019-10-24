import {getConnection, UpdateResult} from "typeorm";
import {SkillModel, Transformer} from "common";
import {Cache} from "../cache/cache";
import {genCacheKey} from "../utility/utility";
import {CACHE_USER_WITH_SKILLS} from "./user";

const CACHE_SKILLS = "Skills:%USER_ID%";
const CACHE_SKILLS_TTL = 3600; // seconds, 1 hour
const CACHE_SKILL = "Skill:%SKILL_ID%";
const CACHE_SKILL_TTL = 3600; // seconds, 1 hour

export const fetchUserSkills = async (userId: number): Promise<SkillModel.Skill[]> => {
    let result = [] as SkillModel.Skill[];

    const cached = await getSkillsCache(userId);
    if (cached.length > 0) {
        result = cached;
    } else {
        result = await getConnection()
            .getRepository(SkillModel.Skill)
            .find({
                where: {userId},
            });
        await setSkillsCache(result);
    }

    return result;
};

export const fetchSkill = async (skillId: number): Promise<SkillModel.Skill> => {
    return await getConnection()
        .getRepository(SkillModel.Skill)
        .findOne({
            where: {id: skillId},
            cache: {
                id: genCacheKey(CACHE_SKILL, {"%SKILL_ID%": skillId}),
                milliseconds: CACHE_SKILL_TTL,
            },
        });
};

export const updateSkill = async (userId: number, skill: SkillModel.ISkill): Promise<UpdateResult> => {
    const skillModel = Transformer.Skill.I2M(skill);

    const result = await getConnection()
        .getRepository(SkillModel.Skill)
        .update({id: skillModel.id}, skillModel);
    if (result.raw.hasOwnProperty("affectedRows") && result.raw.affectedRows > 0) {
        await getConnection().queryResultCache.remove([
            genCacheKey(CACHE_SKILLS, {"%USER_ID%": userId}),
            genCacheKey(CACHE_USER_WITH_SKILLS, {"%USER_ID%": userId}),
            genCacheKey(CACHE_SKILL, {"%SKILL_ID%": skill.id}),
        ]);
    }

    return result;
};

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -* Tools
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const setSkillsCache = async (skills: SkillModel.Skill[]): Promise<string> => {
    if (!skills || !skills.hasOwnProperty("length") || skills.length === 0) {
        return;
    }

    const userId = skills[0].userId;

    return new Promise((resolve, reject) => {
        Cache.get().setex(
            genCacheKey(CACHE_SKILLS, {"%USER_ID%": userId}),
            CACHE_SKILLS_TTL,
            JSON.stringify(skills),
            (err: Error, value: string) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            });
    });
};

const getSkillsCache = async (userId: number): Promise<SkillModel.Skill[]> => {
    return new Promise((resolve, reject) => {
        Cache.get().get(genCacheKey(CACHE_SKILLS, {"%USER_ID%": userId}), (err: Error, value: string) => {
            if (err) {
                return reject(err);
            }
            let result = [] as SkillModel.Skill[];
            if (!value) {
                return resolve(result);
            }
            try {
                result = JSON.parse(value);
            } catch (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};
