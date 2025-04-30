// src/controllers/productoController.ts
import { Request, Response } from "express";
import { ProductoService } from "../service/productoService";
import { Producto } from "@prisma/client";

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   stock:
 *                     type: integer
 *                 example:
 *                   id: 1
 *                   nombre: "Ketchup"
 *                   descripcion: "Aderezo"
 *                   precio: 120.5
 *                   stock: 30
 */
export class ProductoController {
  private productoService: ProductoService;

  constructor() {
    this.productoService = ProductoService.getInstance();
  }

  async getProductos(req: Request, res: Response): Promise<Response<Producto[]>> {
    const productos = await this.productoService.getProductos();
    return res.status(200).json(productos);
  }
  
}