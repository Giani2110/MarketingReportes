import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { enviarReportePorEmail } from '../utils/emailService';

const router = Router();
const prisma = new PrismaClient();

router.get('/reporte/forzar', async (_req, res) => {
  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const productos = await prisma.producto.findMany({
    where: {
      ultima_actualizacion: {
        gte: desde,
      },
    },
  });

  if (productos.length === 0) {
    res.status(200).json({ mensaje: 'No hay productos recientes para generar reporte.' });
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Productos recientes');

  worksheet.columns = [
    { header: 'ID', key: 'producto_id' },
    { header: 'Nombre', key: 'nombre' },
    { header: 'Descripción', key: 'descripcion' },
    { header: 'Precio Base', key: 'precio_base' },
    { header: 'Categoría ID', key: 'categoria_id' },
    { header: 'Actualizado', key: 'ultima_actualizacion' },
  ];

  worksheet.addRows(productos);

  const reportDir = path.join(__dirname, '../../Reportes');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
  const fileName = `reporte_manual_productos_${timestamp}.xlsx`;
  const fullPath = path.join(reportDir, fileName);

  await workbook.xlsx.writeFile(fullPath);
  await enviarReportePorEmail(fullPath);

  res.json({ mensaje: `Reporte generado y enviado con ${productos.length} productos.` });
});

export default router;
