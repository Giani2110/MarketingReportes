import { Router, Request, Response } from "express";
import { CategoriaController } from "../controllers/categoriaController";

const router = Router();
const categoriaController = new CategoriaController();

router.post("/categorias", async (req: Request, res: Response) => {
    await categoriaController.crearCategoria(req, res);
});

export default router;