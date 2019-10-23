import { Id, IId } from "./id";
import { IUser, User } from "./user";
/**
 * @swagger
 * definitions:
 *   Skill:
 *     type: object
 *     description: Skill info
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         description: Skill Id
 *         example: 172
 *       name:
 *         type: string
 *         description: Skill name
 *         example: "programming"
 *       user:
 *         $ref: '#/definitions/User'
 *
 */
export declare class Skill extends Id {
    name: string;
    user?: User;
}
export interface ISkill extends IId {
    name: string;
    user?: IUser;
}
