import {PrimaryGeneratedColumn} from "typeorm";

/**
 * @swagger
 * definitions:
 *   IdObj:
 *     type: object
 *     description: Extendable id object
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: integer
 *         format: int32
 *         description: Object id
 *         example: 1
 */
export class Id {
    @PrimaryGeneratedColumn("increment", {type: "int"})
    public id: number;
}
export interface IId {
    id: number;
}
