import * as express from "express";
import OutlayController from "../controllers/outlayController";

/**
 * @swagger
 * /api/v1/outlays:
 *   get:
 *     tags: [Outlays]
 *     summary: Retorna uma lista de despesas
 *     description: Retorna uma lista de todos os despesas registrados no sistema
 *     responses:
 *       200:
 *         description: Lista de despesas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Outlay'
 *   post:
 *     tags: [Outlays]
 *     summary: Cria uma despesa pelo identificador (ID)
 *     description: Cria uma despesa pelo identificador (ID)
 *     requestBody:
 *        description: Criar uma despesa nova
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OutlayCreateOrUpdate'
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 * /api/v1/outlays/{id}:
 *   get:
 *     tags: [Outlays]
 *     summary: Retorna um despesa pelo identificador (ID)
 *     description: Retorna uma despesa pelo identificador (ID)
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Identificador (ID) da despesa
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Despesas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Outlay'
 *   delete:
 *     tags: [Outlays]
 *     summary: Deleta uma despesa pelo identificador (ID)
 *     description: Retorna uma despesa pelo identificador (ID)
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Identificador (ID) da despesa
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Despesa deletada com sucesso
 *   put:
 *     tags: [Outlays]
 *     summary: Atualiza uma despesa pelo identificador (ID)
 *     description: Atualiza uma despesa pelo identificador (ID)
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Identificador (ID) da despesa
 *          required: true
 *          schema:
 *            type: string
 *     requestBody:
 *        description: Atualizar uma despesa existente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OutlayCreateOrUpdate'
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso
 *
 * components:
 *  schemas:
 *      Outlay:
 *          type: object
 *          properties:
 *              id:
 *                type: integer
 *                example: 1
 *              description:
 *                type: string
 *                example: Bolsa
 *              price:
 *                type: integer
 *                example: 350
 *              month_year:
 *                type: string
 *                example: 08/2022
 *      OutlayCreateOrUpdate:
 *          type: object
 *          properties:
 *              description:
 *                type: string
 *                example: Bolsa
 *              price:
 *                type: integer
 *                example: 350
 *              month_year:
 *                type: string
 *                example: 08/2022
 */

const outlayRouter = express.Router();

outlayRouter.route("/api/v1/outlays").get(OutlayController.get);
outlayRouter.route("/api/v1/outlays/:id").get(OutlayController.getById);
outlayRouter.route("/api/v1/outlays").post(OutlayController.create);
outlayRouter.route("/api/v1/outlays/:id").put(OutlayController.update);
outlayRouter.route("/api/v1/outlays/:id").delete(OutlayController.delete);

export default outlayRouter;
