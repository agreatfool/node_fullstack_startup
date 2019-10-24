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
    // If this column not defined here, there still would be a column "userId" in db,
    // since foreign key "user" defined below.
    // And if this column is not defined, object fetched would be like: "Skill { id: 6, name: 'programming' }",
    // no "userId" variable, thus impossible to get the userId info, so this column is necessary.
    @Column("int")
    public userId: number;
    @ManyToOne(() => User, (user) => user.skills)
    public user?: User; // this column is not visible outside
}

export interface ISkill extends IId {
    name: string;
    userId?: number; // this column could be empty
}

const schema = {name: Joi.string().required()};
export const SkillSchemaNonId = Joi.object().keys(schema);
export const SkillSchema = IdSchema.keys(schema);
