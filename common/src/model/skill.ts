import {Id, IdSchema, IId} from "./id";
import {Column, Entity, ManyToOne} from "typeorm";
import {User} from "./user";
import * as Joi from "@hapi/joi";

/**
 * @swagger
 * definitions:
 *   Skill:
 *     allOf:
 *       - $ref: "#/definitions/IdObj"
 *       - type: object
 *         description: Skill info
 *         required:
 *           - name
 *         properties:
 *           name:
 *             type: string
 *             description: Skill name
 *             example: "programming"
 */
@Entity()
export class Skill extends Id {
    @Column({type: "varchar", length: 255})
    public name: string;
    @ManyToOne(() => User, (user) => user.skills)
    public user?: User;
}

export interface ISkill extends IId {
    name: string;
}

const schema = {name: Joi.string().required()};
export const SkillSchemaNonId = Joi.object().keys(schema);
export const SkillSchema = IdSchema.keys(schema);
