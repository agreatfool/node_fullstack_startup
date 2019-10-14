import {ISkill} from "./skill";

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     description: User info
 *     required:
 *       - name
 *       - age
 *       - gender
 *       - skills
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         description: User id
 *         example: 1453
 *       name:
 *         type: string
 *         description: User name
 *         example: "david"
 *       age:
 *         type: integer
 *         format: int32
 *         description: User age
 *         example: 32
 *       gender:
 *         type: string
 *         enum:
 *           - male
 *           - femal
 *         description: User gender
 *       skills:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Skill'
 *         description: User skills
 *         example:
 *           - id: 1234
 *             name: "Hiring"
 *           - id: 1273
 *             name: "Programming"
 */
export interface IUser {
    id: number;
    name: string;
    age: number;
    gender: string;
    skills: ISkill[];
}
