/// <reference types="hapi__joi" />
import { Skill } from "./skill";
import { Id, IId } from "./id";
import * as Joi from "@hapi/joi";
export declare enum UserGender {
    MALE = "male",
    FEMALE = "female"
}
/**
 * @swagger
 * definitions:
 *   User:
 *     allOf:
 *       - $ref: "#/definitions/IdObj"
 *       - type: object
 *         description: User info
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
export declare class User extends Id {
    name: string;
    age: number;
    gender: UserGender;
    skills?: Skill[];
}
export interface IUser extends IId {
    name: string;
    age: number;
    gender: UserGender;
}
export declare const UserSchemaNonId: Joi.ObjectSchema;
export declare const UserSchema: Joi.ObjectSchema;
