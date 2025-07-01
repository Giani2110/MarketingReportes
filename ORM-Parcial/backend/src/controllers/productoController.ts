import { Request, Response } from 'express';
import { ImportarProductosService } from '../domain/ImportProductoService';

const service = new ImportarProductosService();

export class ProductoController {
  async importarProductos(req: Request, res: Response) {
    importarProductos(req, res);
  }
}

const importarProductos = async (req: Request, res: Response) => {
  const { tipo, filePath } = req.body;

  if (!['csv', 'json'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de archivo inválido' });
  }

  try {
    const cantidad = await service.ejecutar(tipo as 'csv' | 'json', filePath);
    res.json({ mensaje: `Se importaron ${cantidad} productos` });
  } catch (err) {
    res.status(500).json({ error: 'Error al importar', detalles: (err as Error).message });
  }
};