/**
 * @swagger
 * definitions:
 *   Skill:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         example: 172
 *       name:
 *         type: string
 *         example: "programming"
 */
export interface ISkill {
    id: number;
    name: string;
}
