import { Router } from 'express';
import { ProductoController } from '../controllers/productoController';

const router = Router();

const productoController = new ProductoController();

router.post('/productos/importar', productoController.importarProductos);

export default router;