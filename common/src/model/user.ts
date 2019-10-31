import {Skill} from "./skill";
import {Id, IdSchema, IId} from "./id";
import {Column, Entity, OneToMany} from "typeorm";
import * as Joi from "@hapi/joi";

export enum UserGender {
    MALE = "male",
    FEMALE = "female",
}

/**
 * @swagger
 * definitions:
 *   User:
 *     description: User info
 *     allOf:
 *       - $ref: "#/definitions/IdObj"
 *       - type: object
 *         required:
 *           - name
 *           - age
 *           - gender
 *         properties:
 *           name:
 *             type: string
 *             description: User name
 *             example: "david"
 *           age:
 *             type: integer
 *             format: int32
 *             description: User age
 *             example: 32
 *           gender:
 *             type: string
 *             enum:
 *               - male
 *               - female
 *             description: User gender
 */
@Entity()
export class User extends Id {
    @Column({type: "varchar", length: 255})
    public name: string;
    @Column("tinyint")
    public age: number;
    @Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.MALE,
    })
    public gender: UserGender;
    @OneToMany(() => Skill, (skill) => skill.user)
    public skills?: Skill[];
}

export interface IUser extends IId {
    name: string;
    age: number;
    gender: UserGender;
}

const schema = {
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).max(130).required(),
    gender: Joi.string().valid(UserGender.MALE, UserGender.FEMALE).required(),
};
export const UserSchemaNonId = Joi.object().keys(schema);
export const UserSchema = IdSchema.keys(schema);
