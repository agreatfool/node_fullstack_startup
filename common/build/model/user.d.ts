import { ISkill, Skill } from "./skill";
import { Id, IId } from "./id";
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
 *           - skills
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
 *           skills:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Skill'
 *             description: User skills
 */
export declare class User extends Id {
    name: string;
    age: number;
    gender: UserGender;
    skills: Skill[];
}
export interface IUser extends IId {
    name: string;
    age: number;
    gender: string;
    skills: ISkill[];
}
