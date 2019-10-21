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
export declare class Id {
    id: number;
}
export interface IId {
    id: number;
}
