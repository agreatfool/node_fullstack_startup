import {Entity, PrimaryGeneratedColumn} from "typeorm";
import * as Joi from "@hapi/joi";

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
@Entity({synchronize: false})
export class Id {
    @PrimaryGeneratedColumn("increment", {type: "int"})
    public id?: number;
}

export interface IId {
    id?: number;
}

export const IdSchema = Joi.object().keys({id: Joi.number().integer().required()});
