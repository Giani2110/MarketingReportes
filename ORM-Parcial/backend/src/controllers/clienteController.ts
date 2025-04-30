import { Request, Response } from "express";
import { ClienteService } from "../service/clienteService";
import { Cliente } from "@prisma/client";

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener clientes con filtros
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         description: Filtro por nombre del cliente
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         description: Filtro por email del cliente
 *         schema:
 *           type: string
 *       - in: query
 *         name: telefono
 *         description: Filtro por teléfono del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de clientes filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cliente_id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   fecha_registro:
 *                     type: string
 *                     format: date-time
 *                 example:
 *                   cliente_id: 1
 *                   nombre: "Juan Pérez"
 *                   email: "juan.perez@gmail.com"
 *                   telefono: "+123456789"
 *                   direccion: "Calle 123"
 *                   fecha_registro: "2024-01-04:00:00"
 */
export class ClienteController {
  private clienteService: ClienteService;

  constructor() {
    this.clienteService = ClienteService.getInstance();
  }

  async getClientes(req: Request, res: Response): Promise<Response<Cliente[]>> {
    const { nombre, email, telefono } = req.query;
    const clientes = await this.clienteService.getClientes({
      nombre: nombre as string,
      email: email as string,
      telefono: telefono as string,
    });
    return res.status(200).json(clientes);
  }
}