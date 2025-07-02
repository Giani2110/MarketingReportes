import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ImportarProductosService } from '../domain/ImportProductoService';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal

const service = new ImportarProductosService();

router.post('/upload', upload.single('archivo'), async (req, res) => {
    const tipo = req.body.tipo; 
    const file = req.file;
  
    if (!file) {
      res.status(400).json({ error: 'No se subió ningún archivo' });
      return;
    }
  
    if (!['csv', 'json'].includes(tipo)) {
      res.status(400).json({ error: 'Tipo de archivo inválido' });
      return;
    }
  
    const filePath = path.resolve(file.path);
  
    try {
      const cantidad = await service.ejecutar(tipo as 'csv' | 'json', filePath);
  
      fs.unlinkSync(filePath); // eliminar archivo temporal
  
      res.json({ mensaje: `Se importaron ${cantidad} productos` });
    } catch (err) {
      res.status(500).json({ error: 'Error al importar', detalles: (err as Error).message });
    }
  });

export default router;
