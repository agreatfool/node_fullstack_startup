/// <reference types="hapi__joi" />
import { Id, IId } from "./id";
import { User } from "./user";
import * as Joi from "@hapi/joi";
/**
 * @swagger
 * definitions:
 *   Skill:
 *     description: Skill info
 *     allOf:
 *       - $ref: "#/definitions/IdObj"
 *       - type: object
 *         required:
 *           - name
 *         properties:
 *           name:
 *             type: string
 *             description: Skill name
 *             example: "programming"
 */
export declare class Skill extends Id {
    name: string;
    userId: number;
    user?: User;
}
export interface ISkill extends IId {
    name: string;
    userId?: number;
}
export declare const SkillSchemaNonId: Joi.ObjectSchema;
export declare const SkillSchema: Joi.ObjectSchema;
