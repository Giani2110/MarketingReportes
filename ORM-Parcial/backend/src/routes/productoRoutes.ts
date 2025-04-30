import { Router, Request, Response } from "express";
import { ProductoController } from "../controllers/productoController";

const router = Router();
const productoController = new ProductoController();

router.get("/productos", async (req: Request, res: Response) => {
    await productoController.getProductos(req, res);
});

export default router;
