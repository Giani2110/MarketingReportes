import { Request, Response } from "express";
import { CategoriaService } from "../service/categoriaService";
import { Categoria } from "@prisma/client";

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Gestión de categorías de productos
 */

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *             example:
 *               nombre: "Bebidas"
 *               descripcion: "Categoría para bebidas"
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoria_id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 fecha_creacion:
 *                   type: string
 *                   format: date-time
 *               example:
 *                 categoria_id: 1
 *                 nombre: "Bebidas"
 *                 descripcion: "Categoría para bebidas"
 *                 fecha_creacion: "2023-04-30T12:00:00Z"
 */
export class CategoriaController {
  private categoriaService: CategoriaService;

  constructor() {
    this.categoriaService = CategoriaService.getInstance();
  }

  async crearCategoria(req: Request, res: Response): Promise<Response<Categoria>> {
    const { nombre, descripcion } = req.body;
    const categoria = await this.categoriaService.crearCategoria({ nombre, descripcion });
    return res.status(201).json(categoria);
  }
}
