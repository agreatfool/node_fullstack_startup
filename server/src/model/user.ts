import {ISkill} from "./skill";

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - name
 *       - age
 *       - gender
 *       - skills
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         example: 1453
 *       name:
 *         type: string
 *         example: "david"
 *       age:
 *         type: integer
 *         format: int32
 *         example: 32
 *       gender:
 *         type: string
 *         enum:
 *           - male
 *           - female
 */
export interface IUser {
    id: number;
    name: string;
    age: number;
    gender: string;
    skills: ISkill[];
}
