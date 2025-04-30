import { Router, Request, Response } from "express";
import { ClienteController } from "../controllers/clienteController";

const router = Router();
const clienteController = new ClienteController();

router.get("/clientes", async (req: Request, res: Response) => {
    await clienteController.getClientes(req, res);
});

export default router;
