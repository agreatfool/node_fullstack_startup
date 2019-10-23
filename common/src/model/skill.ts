import {Id, IId} from "./id";
import {Column, Entity, ManyToOne} from "typeorm";
import {IUser, User} from "./user";

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
@Entity()
export class Skill extends Id {
    @Column({type: "varchar", length: 255})
    public name: string;
    @ManyToOne(() => User, (user) => user.skills)
    public user?: User;
}

export interface ISkill extends IId {
    name: string;
    user?: IUser;
}
