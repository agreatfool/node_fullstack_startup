import {getConnection, UpdateResult} from "typeorm";
import {SkillModel, Transformer} from "common";

export const fetchUserSkills = async (id: number): Promise<SkillModel.Skill[]> => {
    return await getConnection()
        .getRepository(SkillModel.Skill)
        .find({
            where: {user: id},
        });
};

export const fetchSkill = async (id: number): Promise<SkillModel.Skill> => {
    return await getConnection()
        .getRepository(SkillModel.Skill)
        .findOne({
            where: {id},
        });
};

export const updateSkill = async (skill: SkillModel.ISkill): Promise<UpdateResult> => {
    const skillModel = Transformer.Skill.I2M(skill);

    return await getConnection()
        .getRepository(SkillModel.Skill)
        .update({id: skillModel.id}, skillModel);
};
