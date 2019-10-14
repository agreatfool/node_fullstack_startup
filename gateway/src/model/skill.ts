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
 */
export interface ISkill {
    id: number;
    name: string;
}
